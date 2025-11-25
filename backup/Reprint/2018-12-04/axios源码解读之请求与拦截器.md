---
title: 'axios源码解读之请求与拦截器' 
date: 2018-12-04 2:30:05
hidden: true
slug: mp1naz3t8ah
categories: [reprint]
---

{{< raw >}}

                    
<h2>前言</h2>
<p><code>axios</code> 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。这里将会从功能出发，分析源码，深入了解 axios 是怎么实现这些功能的。</p>
<h3>准备</h3>
<p><strong>IDE:</strong> WebStorm<br><strong>Git地址:</strong>  <a href="https://github.com/cookhot/axios/tree/analysis" rel="nofollow noreferrer">https://github.com/cookhot/ax...</a>    注意<code>analysis</code>分支<br><strong>中文文档:</strong>  <a href="https://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer">https://www.kancloud.cn/yunye...</a></p>
<h2>axios 请求</h2>
<p>项目的入口是<code>axios.js</code>, 当<code>axios</code>在被引入项目中的时候，导入的其实是一个方法，可以直接调用此方法发起请求。</p>
<h4>例子如下:</h4>
<pre><code class="js">import axios from './axios'
console.log(typeof axios); // function
axios({
  url: 'http://localhost:8088/index'
}).then((res) =&gt; {
  console.log(res)
})</code></pre>
<h4>源码如下:</h4>
<p><strong>axios.js</strong></p>
<pre><code class="js">'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');

/**
 * 创建 Axios 的一个实例
 * Create an instance of Axios
 * 
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);

  // instance 是一个方法, 实际上就是 Axios.prorotype.request， 方法的 this =&gt; context
  var instance = bind(Axios.prototype.request, context);

  // 把 Axios 原型上面的属性(方法)复制到 instance 上面，保证被复制的方法中 this =&gt; context
  // 注意 utils.extend 和 utils.merge的区别，两者是不同的
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  // context 上面的属性都复制到 instance，context.defaults 和 context.interceptors 通过instance能够访问
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
// 创建 Axios 实例
axios.create = function create(instanceConfig) {
  // instanceConfig 是开发者提供的配置属性，将会和 Axios 提供的默认配置属性合并，
  // 形成的新的配置属性将会是实例请求的默认属性 (很常用的设计方法)
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel &amp; CancelToken
// 请求取消
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// 输出Axios
module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;</code></pre>
<p>从上面的源码中，能够看到<code>axios</code>其实就是调用的<code>Axios.prototype.request</code>方法，为了防止在运行时候this指向异常，显示的绑定上了context。</p>
<pre><code class="js">// ...... bind 的实现
module.exports = function bind(fn, thisArg) {
   // 使用闭包 和 apply 改变 fn 的 this 指向
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i &lt; args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};</code></pre>
<p>为了能够让开发人员更好的调用get、post、...... 等等方法， 于是把<code>Axios.prototype</code>上面的方法都复制到axios上面。 相应的为了防止这些<strong>方法</strong>中this指向异常，也显示的绑定context, 具体的实现逻辑请看下面 ⤵️ <strong>对象的复制</strong>。 后面的 <code>utils.extend(instance, context)</code> 这行代码是为了帮助我们能够通过axios 访问到 context 上面的属性， context里面包含拦截器(interceptors)以及配置属性值(defaults)。</p>
<h4>对象的复制</h4>
<p>axios提供了两种的方式来处理对象的合并, 分别是 merge 与 extend。代码被放在utils.js</p>
<pre><code class="js">// utils.js
// .......
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i &lt; l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  // 使用新的对象，这样就能防止传入的对象在合并的时候被改变
  var result = {};
  function assignValue(val, key) {
   // 对象的属性复制的时候，当两个属性都是都是对象的时候，就对此属性对象中子属性再进行在复制。
    // 作用应该是为了防止前属性对象的属性全被覆盖掉
    if (typeof result[key] === 'object' &amp;&amp; typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i &lt; l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * 这里考虑了复制函数时候的 this 指向问题，设计的很好，以后可以借鉴
 * @param {Object} a The object to be extended    
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg &amp;&amp; typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}</code></pre>
<p><code>merge</code> 类似于我们经常使用的对象浅拷贝，但是又不全是浅拷贝。在拷贝的时候，发现进行拷贝的两个属性都是都是对象的时候，就对此属性对象中子属性再进行在复制。用于防止前面一个属性对象中的子属性值被全覆盖掉。<br><code>extend</code> 也是对象的浅拷贝，不过在拷贝方法的时候，会显示指定方法的<strong>this</strong>，用于防止this指向异常。</p>
<h4>all以及cancel</h4>
<p>axios创建请求后会返回一个Promise的实例，<code>Promise.all</code>所返回的promise实例会在传入的promise实例状态都发生变化，才变更状态。所以 <code>axios.all</code>其实就是调用<code>Promise.all</code>。</p>
<pre><code class="js">axios.all = function all(promises) {
  return Promise.all(promises);
};</code></pre>
<p><strong>cancel</strong> 这里暂时不讨论，后面通过结合 XMLHttpRequest 与 node 的 http 会说的明白的更加清楚。</p>
<h2>请求复用与拦截器</h2>
<p>在看完<code>axios.js</code>以后，就需要开始了解<code>Axios</code>构造函数的实现了。</p>
<h4>源码如下:</h4>
<p><strong>Axios.js</strong></p>
<pre><code class="js">'use strict';

var defaults = require('./../defaults');
var utils = require('./../utils');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // instanceConfig =&gt; 创建对象的设置的默认值
  // Axios 中 defaults 分为三个层次, Axios 默认的defaults &lt; 创建实例传入的defaults &lt; 调用方法时候传入的defaults
  // 个人感觉使用 this.defaults = utils.merge(defaults, instanceConfig) 会更好，当后面使用request发起请求的时候，代码变化如下:
 /*
    config = utils.merge(defaults, this.defaults, config); 老代码
    config = utils.merge(this.defaults, config); // 新代码
  */
  this.defaults = instanceConfig;
  // 拦截器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  // 重载 request(url, config)
  // 可以支持request (config) 也可以支持 request(url, config)
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  // 拦截器设计处理
  // chain 是一个数组
  var chain = [dispatchRequest, undefined];
  // promise 是调用头，状态已经改变为 resolved
  var promise = Promise.resolve(config);

  // 使用 use 添加 fulfilled 与 rejected 添加到队列中
  // 添加 request 拦截函数的时候使用的是unshift， 这样会导致 use 后添加的先执行，先添加的后执行
  /*
  axios.interceptors.request.use(function resolve(config) {
    console.log("1");
  });

  axios.interceptors.request.use(function resolve(config) {
    console.log("2")
  })
  // 结果 2 1
   */

  // 考虑到后面 是使用 promise的链式调用， 所以在 拦截器的回调方法中 必须要返回一个 config 对象
  // 如果不返回 config， 会导致后续请求执行异常

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  // response 使用的push 添加 拦截函数，这里是添加先执行，后添加后执行
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // promise 的初始化状态就是 resolved，这里形成了promise调用链，执行流程过程如下

  // chain  [fulfilled, rejected, ... dispatchRequest, undefined ....,fulfilled, rejected]
  // 这里补充一下 fulfilled, rejected 都是肯定是成对出现的， 具体原因可看 InterceptorManager.prototype.use
  // promise.then(undefined, undefined) 中当传递的不是function时，会发生值穿。也就是说 use 中可以传入非function，
  // 或者传入单个function
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
// 复用request 实现了 delete， get, head, options
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

// 复用request 实现了 post， put, patch
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;</code></pre>
<p><code>Axios.js</code>主要处理了两个部分，复用请求方法、实现拦截器。</p>
<p>当我们使用 Axios 的实例去发送请求，使用的方法get、post等都是复用了request方法，在request方法中通过 arguments 获取传入的参数，实现了传入参数的重载。</p>
<p>拦截器是axios的一大特色，它的实现原理其实不复杂，核心就是promise的链式调用。 <br>原理可以参考下图:<br><span class="img-wrap"><img data-src="/img/bV9dFQ?w=1085&amp;h=514" src="https://static.alili.tech/img/bV9dFQ?w=1085&amp;h=514" alt="clipboard.png" title="clipboard.png"></span><br>然后附上<code>InterceptorManager.js</code>的源码，但是个人觉得这里没有什么好说的，其实就是对一个数组的操作。</p>
<pre><code class="js">'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  // fulfilled =&gt; 成功方法
  // rejected =&gt; 失败方法
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
// 把数组中 对象设置为 null
InterceptorManager.prototype.reject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  // 遍历运行数组
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;</code></pre>
<p>如果你看完上面的源码解读，能够清楚的明白下面这段代码执行顺序，那么就说明你掌握axios拦截器的实现了</p>
<pre><code class="js">  // 拦截器的执行顺序
  /*
  axios.interceptors.request.use(function resolve(config) {
    console.log("request");
    return config;
  });

  axios.interceptors.response.use(function resolve(res) {
    console.log('response')
    return res
  });

  axios.get('http://localhost:3000/index').then(function resolve(res) {
      console.log('ajax');
      return res
  }).then(function(){
    console.log('end')
  })
   */</code></pre>
<p><strong>第一篇总算是写完了，后续还有关于<code>axios</code>3篇的源码解读，如果大家觉得写的还行的话，麻烦给一个赞?，鼓励鼓励，谢谢了</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios源码解读之请求与拦截器

## 原文链接
[https://segmentfault.com/a/1190000014551905](https://segmentfault.com/a/1190000014551905)


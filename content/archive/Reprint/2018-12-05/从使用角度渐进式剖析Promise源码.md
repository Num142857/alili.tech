---
title: '从使用角度渐进式剖析Promise源码' 
date: 2018-12-05 2:30:09
hidden: true
slug: ocn3waj3cqe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">开篇</h2>
<p>最近在 github 上看到了一个 extremely lightweight Promise polyfill 实现，打开源码发现只有240行，果然极其轻量级，于是带着惊叹和好奇的心理去了解了下其具体实现。<br>源码的 github 地址：<a href="https://github.com/taylorhakes/promise-polyfill" rel="nofollow noreferrer" target="_blank">promise-polyfill</a></p>
<p>Promise 对于前端来说，是个老生常谈的话题，Promise 的出现解决了 js 回调地域的问题。目前市面上有很多 Promise 库，但其最终实现都要遵从 Promise/A+ 规范,这里对规范不做解读，有兴趣的可以查看链接内容。<br><a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">Promise/A+规范链接</a><br><a href="https://segmentfault.com/a/1190000002452115">Promise/A+规范中文链接</a></p>
<p>本篇文章将从 Promise 的使用角度来剖析源码具体实现。</p>
<h2 id="articleHeader1">API 列表</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise  // 构造函数
Promise.prototype.then
Promise.prototype.catch
Promise.prototype.finally

// 静态方法
Promise.resolve
Promise.reject
Promise.race
Promise.all" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Promise  <span class="hljs-comment">// 构造函数</span>
Promise<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.then</span>
Promise<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.catch</span>
Promise<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.finally</span>

<span class="hljs-comment">// 静态方法</span>
Promise<span class="hljs-selector-class">.resolve</span>
Promise<span class="hljs-selector-class">.reject</span>
Promise<span class="hljs-selector-class">.race</span>
Promise.all</code></pre>
<h2 id="articleHeader2">源码解析</h2>
<h3 id="articleHeader3">构造函数</h3>
<p>使用<br>Promise 使用第一步，构造实例，传入 Function 形参，形参接收两个 Function 类型参数resolve, reject</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const asyncTask = () => {};
const pro = new Promise((resolve, reject) => {
  asyncTask((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const asyncTask = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};
const pro = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  asyncTask(<span class="hljs-function"><span class="hljs-params">(err, data)</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) {
        reject(err);
      } <span class="hljs-keyword">else</span> {
        resolve(data);
      }
    });
});</code></pre>
<p>源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];
  doResolve(fn, this);
}

function doResolve(fn, self) {
  // done变量保护 resolve 和 reject 只执行一次
  // 这个done在 Promise.race()函数中有用
  var done = false;
  try {
    // 立即执行 Promise 传入的 fn(resolve,reject)
    fn(
      function(value) {
        // resolve 回调
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        // reject 回调
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>))
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Promises must be constructed via new'</span>);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'not a function'</span>);
  <span class="hljs-keyword">this</span>._state = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>._handled = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">this</span>._value = <span class="hljs-literal">undefined</span>;
  <span class="hljs-keyword">this</span>._deferreds = [];
  doResolve(fn, <span class="hljs-keyword">this</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doResolve</span>(<span class="hljs-params">fn, self</span>) </span>{
  <span class="hljs-comment">// done变量保护 resolve 和 reject 只执行一次</span>
  <span class="hljs-comment">// 这个done在 Promise.race()函数中有用</span>
  <span class="hljs-keyword">var</span> done = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 立即执行 Promise 传入的 fn(resolve,reject)</span>
    fn(
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-comment">// resolve 回调</span>
        <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;
        done = <span class="hljs-literal">true</span>;
        resolve(self, value);
      },
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
        <span class="hljs-comment">// reject 回调</span>
        <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;
        done = <span class="hljs-literal">true</span>;
        reject(self, reason);
      }
    );
  } <span class="hljs-keyword">catch</span> (ex) {
    <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;
    done = <span class="hljs-literal">true</span>;
    reject(self, ex);
  }
}</code></pre>
<p>Promise必须通过构造函数实例化来使用，传入 Promise 构造函数的形参 fn 在doResolve方法内是 <strong>立即调用执行</strong> 的，并没有异步(指放入事件循环队列)处理。doResolve内部针对 fn 函数的回调参数做了封装处理，done变量保证了 resolve reject 方法只执行一次，这在后面说到的Promise.race()函数实现有很大用处。</p>
<h4>Promise 实例的内部变量介绍</h4>
<table>
<thead><tr>
<th align="left">名称</th>
<th align="left">类型</th>
<th align="left">默认值</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">_state</td>
<td align="left">Number</td>
<td align="left">0</td>
<td align="left">Promise内部状态码</td>
</tr>
<tr>
<td align="left">_handled</td>
<td align="left">Boolean</td>
<td align="left">false</td>
<td align="left">onFulfilled,onRejected是否被处理过</td>
</tr>
<tr>
<td align="left">_value</td>
<td align="left">Any</td>
<td align="left">undefined</td>
<td align="left">Promise 内部值，resolve 或者 reject返回的值</td>
</tr>
<tr>
<td align="left">_deferreds</td>
<td align="left">Array</td>
<td align="left">[]</td>
<td align="left">存放 Handle 实例对象的数组，缓存 then 方法传入的回调</td>
</tr>
</tbody>
</table>
<p>_state枚举值类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_state === 0  // pending
_state === 1  // fulfilled,执行了resolve函数，并且_value instanceof Promise === true
_state === 2  // rejected,执行了reject函数
_state === 3  // fulfilled,执行了resolve函数，并且_value instanceof Promise === false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">_state</span> === <span class="hljs-number">0</span>  // pending
<span class="hljs-attr">_state</span> === <span class="hljs-number">1</span>  // fulfilled,执行了resolve函数，并且_value instanceof Promise === <span class="hljs-literal">true</span>
<span class="hljs-attr">_state</span> === <span class="hljs-number">2</span>  // rejected,执行了reject函数
<span class="hljs-attr">_state</span> === <span class="hljs-number">3</span>  // fulfilled,执行了resolve函数，并且_value instanceof Promise === <span class="hljs-literal">false</span></code></pre>
<p><strong>注意</strong>：这里_state区分了1 和 3 两种状态，下面会解释原因</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Handle 构造函数
 * @param onFulfilled resolve 回调函数
 * @param onRejected reject 回调函数
 * @param promise 下一个 promise 实例对象
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * Handle 构造函数
 * <span class="hljs-doctag">@param</span> onFulfilled resolve 回调函数
 * <span class="hljs-doctag">@param</span> onRejected reject 回调函数
 * <span class="hljs-doctag">@param</span> promise 下一个 promise 实例对象
 * <span class="hljs-doctag">@constructor</span>
 */</span>
function Handler(onFulfilled, onRejected, promise) {
  <span class="hljs-keyword">this</span>.onFulfilled = typeof onFulfilled === <span class="hljs-string">'function'</span> ? onFulfilled : <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.onRejected = typeof onRejected === <span class="hljs-string">'function'</span> ? onRejected : <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">this</span>.promise = promise;
}</code></pre>
<p>_deferreds数组的意义：当在 Promise 内部调用了异步处理任务时，pro.then(onFulfilled,onRejected)传入的两个函数不会立即执行，所以此时会把当前的回调和下一个 pro 对象关联缓存起来，待到 resolve 或者 reject触发调用时，会去 forEach 这个_deferreds数组中的每个 Handle 实例去处理对应的 onFulfilled,onRejected 方法。</p>
<h3 id="articleHeader4">Promise 内部 resolve reject finale 方法</h3>
<p>上面说到，doResolve 内部做了 fn 的立即执行，并保证 resolve 和 reject 方法只执行一次，接下来说说resolve 和 reject 内部具体做了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(self, newValue) {
  try {
    // resolve 的值不能为本身 this 对象
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    // 针对 resolve 值为 Promise 对象的情况处理
    if (
      newValue &amp;&amp;
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        // 兼容类 Promise 对象的处理方式，对其 then 方法继续执行 doResolve
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    //  resolve 正常值的流程，_state = 1
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  //  Promise reject 情况，但是 then 方法未提供 reject 回调函数参数 或者 未实现 catch 函数
  if (self._state === 2 &amp;&amp; self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    // 这里调用之前 then 方法传入的onFulfilled, onRejected函数
    // self._deferreds[i] => Handler 实例对象
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span></span>(self, <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// resolve 的值不能为本身 this 对象</span>
    <span class="hljs-comment">// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Value</span> === self)
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">TypeError</span>(<span class="hljs-string">'A promise cannot be resolved with itself.'</span>);
    <span class="hljs-comment">// 针对 resolve 值为 Promise 对象的情况处理</span>
    <span class="hljs-keyword">if</span> (
      <span class="hljs-keyword">new</span><span class="hljs-type">Value</span> &amp;&amp;
      (typeof <span class="hljs-keyword">new</span><span class="hljs-type">Value</span> === <span class="hljs-string">'object'</span> || typeof <span class="hljs-keyword">new</span><span class="hljs-type">Value</span> === <span class="hljs-string">'function'</span>)
    ) {
      <span class="hljs-keyword">var</span> then = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>.then;
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Value</span> instanceof Promise) {
        self._state = <span class="hljs-number">3</span>;
        self._value = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>;
        finale(self);
        <span class="hljs-keyword">return</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (typeof then === <span class="hljs-string">'function'</span>) {
        <span class="hljs-comment">// 兼容类 Promise 对象的处理方式，对其 then 方法继续执行 doResolve</span>
        doResolve(bind(then, <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>), self);
        <span class="hljs-keyword">return</span>;
      }
    }
    <span class="hljs-comment">//  resolve 正常值的流程，_state = 1</span>
    self._state = <span class="hljs-number">1</span>;
    self._value = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>;
    finale(self);
  } <span class="hljs-keyword">catch</span> (e) {
    reject(self, e);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span></span>(self, <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>) {
  self._state = <span class="hljs-number">2</span>;
  self._value = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>;
  finale(self);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">finale</span></span>(self) {
  <span class="hljs-comment">//  Promise reject 情况，但是 then 方法未提供 reject 回调函数参数 或者 未实现 catch 函数</span>
  <span class="hljs-keyword">if</span> (self._state === <span class="hljs-number">2</span> &amp;&amp; self._deferreds.length === <span class="hljs-number">0</span>) {
    Promise._immediateFn(<span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
      <span class="hljs-keyword">if</span> (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = self._deferreds.length; i &lt; len; i++) {
    <span class="hljs-comment">// 这里调用之前 then 方法传入的onFulfilled, onRejected函数</span>
    <span class="hljs-comment">// self._deferreds[i] =&gt; Handler 实例对象</span>
    handle(self, self._deferreds[i]);
  }
  self._deferreds = <span class="hljs-literal">null</span>;
}</code></pre>
<p>resolve,reject 是由用户在异步任务里面触发的回调函数<br>调用 resolve reject 方法的注意点<br>1、<strong>newValue不能为当前的 this 对象</strong>，即下面的这样写法是错误的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pro = new Promise((resolve)=>{setTimeout(function () {
  resolve(pro);
},1000)});
pro.then(data => console.log(data)).catch(err => {console.log(err)});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> pro = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span>{setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  resolve(pro);
},<span class="hljs-number">1000</span>)});
pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data)).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(err)});</code></pre>
<p>因为resolve做了 try catch 的操作，直接会进入 reject 流程。</p>
<p>2、<strong>newValue可以为另一个Promise 对象类型实例</strong>， resolve 的值返回的是另一个 Promise 对象实例的内部的_value,而不是其本身 Promise 对象。即可以这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pro1 = new Promise((resolve)=>{setTimeout(function () {
  resolve(100);
},2000)});
const pro = new Promise((resolve)=>{setTimeout(function () {
  resolve(pro1);
},1000)});
pro.then(data => console.log('resolve' + data)).catch(err => {console.log('reject' + err)});
// 输出结果：resolve 100
// data 并不是pro1对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> pro1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span>{setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  resolve(<span class="hljs-number">100</span>);
},<span class="hljs-number">2000</span>)});
<span class="hljs-keyword">const</span> pro = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span>{setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  resolve(pro1);
},<span class="hljs-number">1000</span>)});
pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolve'</span> + data)).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span> + err)});
<span class="hljs-comment">// 输出结果：resolve 100</span>
<span class="hljs-comment">// data 并不是pro1对象</span></code></pre>
<p>具体原因就在 resolve 方法体内部做了newValue instanceof Promise的判断，并将当前的_state=3,self._value = newValue,然后进入 finale 方法体，在 handle 方法做了核心处理，这个下面介绍 handle 方法会说到；</p>
<p>这里有一个注意点，resolve 的 value 可能是其他框架的 Promise(比如：global.Promise，nodejs 内部的 Promise 实现) 构造实例，所以在typeof then === 'function'条件下做了doResolve(bind(then, newValue), self);的重新调用，继续执行当前类型的 Promise then 方法，即又重新回到了doResolve流程。</p>
<p>如果这里的实现方式稍微调整下，即不管newValue是自身的 Promise 实例还是其他框架实现的 Promise实例，都执行doResolve(bind(then, newValue), self)也能行得通,只不过会多执行 then 方式一次，从代码性能上说，上面的实现方式会更好。参照代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &amp;&amp;
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      // 这里简单粗暴处理，无论是 Promise 还是 global.Promise
      // 都直接调用doResolve
      var then = newValue.then;
      if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    //  resolve 正常值的流程，_state = 1
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span></span>(self, <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Value</span> === self)
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">TypeError</span>(<span class="hljs-string">'A promise cannot be resolved with itself.'</span>);
    <span class="hljs-keyword">if</span> (
      <span class="hljs-keyword">new</span><span class="hljs-type">Value</span> &amp;&amp;
      (typeof <span class="hljs-keyword">new</span><span class="hljs-type">Value</span> === <span class="hljs-string">'object'</span> || typeof <span class="hljs-keyword">new</span><span class="hljs-type">Value</span> === <span class="hljs-string">'function'</span>)
    ) {
      <span class="hljs-comment">// 这里简单粗暴处理，无论是 Promise 还是 global.Promise</span>
      <span class="hljs-comment">// 都直接调用doResolve</span>
      <span class="hljs-keyword">var</span> then = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>.then;
      <span class="hljs-keyword">if</span> (typeof then === <span class="hljs-string">'function'</span>) {
        doResolve(bind(then, <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>), self);
        <span class="hljs-keyword">return</span>;
      }
    }
    <span class="hljs-comment">//  resolve 正常值的流程，_state = 1</span>
    self._state = <span class="hljs-number">1</span>;
    self._value = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>;
    finale(self);
  } <span class="hljs-keyword">catch</span> (e) {
    reject(self, e);
  }
}</code></pre>
<p>所有 resolve 和 reject 的值最终都会去到finale函数中去处理,只不过在这里的_state状态会有所不同；当Promise 出现reject的情况时，而没有提供 onRejected 函数时，内部会打印一个错误出来，提示要捕获错误。代码实现即</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pro = new Promise((resolve,reject)=>{setTimeout(function () {
  reject(100);
},1000)});
pro.then(data => console.log(data));  // 会报错
pro.then(data => console.log(data)).catch();  // 会报错
pro.then(data => console.log(data)).catch(()=>{});  // 不会报错
pro.then(data => console.log(data),()=>{})  // 不会报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> pro = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  reject(<span class="hljs-number">100</span>);
},<span class="hljs-number">1000</span>)});
pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data));  <span class="hljs-comment">// 会报错</span>
pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data)).catch();  <span class="hljs-comment">// 会报错</span>
pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data)).catch(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{});  <span class="hljs-comment">// 不会报错</span>
pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data),<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{})  <span class="hljs-comment">// 不会报错</span></code></pre>
<h3 id="articleHeader5">then、catch、finally 方法</h3>
<p>第二步，调用 then 方法来处理回调,支持无限链式调用，then 方法第一个参数成功回调，第二个参数失败或者异常回调</p>
<p>源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function noop() {}

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);
  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">noop</span><span class="hljs-params">()</span> </span>{}

Promise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(onFulfilled, onRejected)</span> </span>{
  <span class="hljs-keyword">var</span> prom = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.constructor(noop);
  handle(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">new</span> Handler(onFulfilled, onRejected, prom));
  <span class="hljs-keyword">return</span> prom;
};

Promise.prototype[<span class="hljs-string">'catch'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(onRejected)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(<span class="hljs-literal">null</span>, onRejected);
};

Promise.prototype[<span class="hljs-string">'finally'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(callback)</span> </span>{
  <span class="hljs-keyword">var</span> constructor = <span class="hljs-keyword">this</span>.constructor;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(
    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> </span>{
      <span class="hljs-keyword">return</span> constructor.resolve(callback()).then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> value;
      });
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(reason)</span> </span>{
      <span class="hljs-keyword">return</span> constructor.resolve(callback()).then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> constructor.reject(reason);
      });
    }
  );
};</code></pre>
<p>Promise.prototype.then方法内部构造了一个新的Promsie 实例并返回，这样从 api 角度解决了 Promise 链式调用的问题，而且值得注意的是，<strong>每个 then 方法返回的都是一个新的 Promise 对象，并不是当前的 this链接调用方式</strong>。最终的处理都会调用 handle 方法。</p>
<p>catch方法在 then 方法上做了一个简单的封装，所以从这里也可以看出，then 方法的形参并不是必传的，catch 只接收onRejected。</p>
<p>finally方法不管是调用了 then 还是 catch，最终都会执行到finally的 callback</p>
<h3 id="articleHeader6">核心逻辑：handle方法内部实现</h3>
<p>上面说了这么多，最终的 resolve reject 回调处理都会进入到 handle 方法中，来处理onFulfilled 和 onRejected，先看源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise._immediateFn =
  (typeof setImmediate === 'function' &amp;&amp;
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };
  
function handle(self, deferred) {
  // 如果当前的self._value instanceof Promise
  // 将self._value => self，接下来处理新 Promise
  while (self._state === 3) {
    self = self._value;
  }
  // self._state=== 0 说明还没有执行 resolve || reject 方法
  // 此处将 handle 挂起
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  // 通过事件循环异步来做回调的处理
  Promise._immediateFn(function() {
    // deferred.promise ：第一个 Promise then 方法 返回的新 Promise 对象
    // 这里调用下一个 Promise 对象的 then 方法的回调函数
    // 如果当前 Promise resolve 了，则调用下一个 Promise 的 resolve方法，反之，则调用下一个 Promise 的 reject 回调
    // 如果当前 Promise resolve 了，则调用下一个 Promise 的 resolve方法
    // cb回调方法：如果自己有onFulfilled||onRejected方法，则执行自己的方法；如果没有，则调用下一个 Promise 对象的onFulfilled||onRejected
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    // 自己没有回调函数，进入下一个 Promise 对象的回调
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    // 自己有回调函数，进入自己的回调函数
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    // 处理下一个 Promise 的 then 回调方法
    // ret 作为上一个Promise then 回调 return的值 => 返回给下一个Promise then 作为输入值
    resolve(deferred.promise, ret);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>Promise._immediateFn =
  (typeof setImmediate === <span class="hljs-string">'function'</span> &amp;&amp;
    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
      setImmediate(fn);
    }) ||
  <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
    setTimeoutFunc(fn, <span class="hljs-number">0</span>);
  };
  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span><span class="hljs-params">(self, deferred)</span> </span>{
  <span class="hljs-comment">// 如果当前的self._value instanceof Promise</span>
  <span class="hljs-comment">// 将self._value =&gt; self，接下来处理新 Promise</span>
  <span class="hljs-keyword">while</span> (<span class="hljs-keyword">self</span>._state === <span class="hljs-number">3</span>) {
    <span class="hljs-keyword">self</span> = <span class="hljs-keyword">self</span>._value;
  }
  <span class="hljs-comment">// self._state=== 0 说明还没有执行 resolve || reject 方法</span>
  <span class="hljs-comment">// 此处将 handle 挂起</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>._state === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">self</span>._deferreds.push(deferred);
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">self</span>._handled = <span class="hljs-keyword">true</span>;
  <span class="hljs-comment">// 通过事件循环异步来做回调的处理</span>
  Promise._immediateFn(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// deferred.promise ：第一个 Promise then 方法 返回的新 Promise 对象</span>
    <span class="hljs-comment">// 这里调用下一个 Promise 对象的 then 方法的回调函数</span>
    <span class="hljs-comment">// 如果当前 Promise resolve 了，则调用下一个 Promise 的 resolve方法，反之，则调用下一个 Promise 的 reject 回调</span>
    <span class="hljs-comment">// 如果当前 Promise resolve 了，则调用下一个 Promise 的 resolve方法</span>
    <span class="hljs-comment">// cb回调方法：如果自己有onFulfilled||onRejected方法，则执行自己的方法；如果没有，则调用下一个 Promise 对象的onFulfilled||onRejected</span>
    <span class="hljs-keyword">var</span> cb = <span class="hljs-keyword">self</span>._state === <span class="hljs-number">1</span> ? deferred.onFulfilled : deferred.onRejected;
    <span class="hljs-comment">// 自己没有回调函数，进入下一个 Promise 对象的回调</span>
    <span class="hljs-keyword">if</span> (cb === <span class="hljs-keyword">null</span>) {
      (<span class="hljs-keyword">self</span>._state === <span class="hljs-number">1</span> ? resolve : reject)(deferred.promise, <span class="hljs-keyword">self</span>._value);
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">// 自己有回调函数，进入自己的回调函数</span>
    <span class="hljs-keyword">var</span> ret;
    <span class="hljs-keyword">try</span> {
      ret = cb(<span class="hljs-keyword">self</span>._value);
    } <span class="hljs-keyword">catch</span> (e) {
      reject(deferred.promise, e);
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">// 处理下一个 Promise 的 then 回调方法</span>
    <span class="hljs-comment">// ret 作为上一个Promise then 回调 return的值 =&gt; 返回给下一个Promise then 作为输入值</span>
    resolve(deferred.promise, ret);
  });
}</code></pre>
<p>self._state === 3，说明当前 resolve(promise)方法回传的值类型为 Promise 对象,<br>即 self._value instanceOf Promise === true， <strong>将 self=self._value,即当前处理变更到了新的 Promise 对象上</strong> ，如果当前 promise对象内部状态是fulfilled或者 rejected，则直接处理onFulfilled 或者 onRejected回调；如果仍然是 padding 状态，则继续等待。这就很好的解释了为什么resolve(pro1),pro.then的回调取的值却是 pro1._value.<br>从使用角度来看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pro1 = new Promise(resolve=>{setTimeout(()=>{resolve(100)},1000)})  // 执行耗时1s 的异步任务
pro.then(()=>pro1).then(data => console.log(data)).catch(err => {});
// 输出结果: 正常打印了100，data并不是当前的pro1对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> pro1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>{setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{resolve(<span class="hljs-number">100</span>)},<span class="hljs-number">1000</span>)})  <span class="hljs-comment">// 执行耗时1s 的异步任务</span>
pro.then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>pro1).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data)).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {});
<span class="hljs-comment">// 输出结果: 正常打印了100，data并不是当前的pro1对象</span></code></pre>
<p>pro1内部是耗时1s 的异步任务，此时self._state === 0，即内部是 Padding 状态，则将deferred对象 push 到_deferreds数组里面,然后等待 pro1内部调用resolve(100)时，继续上面resolve方法体执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pro1 = new Promise(resolve=>resolve(100)}) // 执行同步任务
pro.then(()=>pro1).then(data => console.log(data)).catch(err => {});
// 输出结果: 正常打印了100，data并不是当前的pro1对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> pro1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>resolve(<span class="hljs-number">100</span>)}) <span class="hljs-comment">// 执行同步任务</span>
pro.then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>pro1).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data)).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {});
<span class="hljs-comment">// 输出结果: 正常打印了100，data并不是当前的pro1对象</span></code></pre>
<p>但是如果pro1内部是同步任务，立即执行的话，当前的self._state === 1，即调过 push 到_deferreds数组的操作，执行最后的onFulfilled, onRejected回调,<strong>onFulfilled, onRejected会被放入到事件循环队列里面执行</strong>，即执行到了Promise._immediateFn</p>
<p>Promise._immediateFn回调函数放到了事件循环队列里面来执行<br>这里的deferred对象存放了当前的onFulfilled和onRejected回调函数和下一个 promise 对象。<br>当前对象的onFulfilled和onRejected如果存在时，则执行自己的回调；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro.then(data => data}).then(data => data).catch(err => {});
// 正确写法: 输出两次  data " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">pro</span>.<span class="hljs-keyword">then</span>(<span class="hljs-class"><span class="hljs-keyword">data</span> =&gt; <span class="hljs-keyword">data</span>}).then(<span class="hljs-title">data</span> =&gt; <span class="hljs-title">data</span>).catch(<span class="hljs-title">err</span> =&gt; {});</span>
// 正确写法: 输出两次  <span class="hljs-class"><span class="hljs-keyword">data</span> </span></code></pre>
<p><strong>注意</strong>：then 方法一定要做 return 下一个值的操作，因为当前的 ret 值会被带入到下一个 Promise 对象,即 resolve(deferred.promise, ret)。如果不提供返回值，则第二个 then 的 data 会变成 undefined，即这样的错误写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro.then(data => {"}}").then(data => data).catch(err => {});
// 错误写法: 第二个 then 方法的 data 为 undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">pro</span>.<span class="hljs-keyword">then</span>(<span class="hljs-class"><span class="hljs-keyword">data</span> =&gt; {"}}").then(<span class="hljs-title">data</span> =&gt; <span class="hljs-title">data</span>).catch(<span class="hljs-title">err</span> =&gt; {});</span>
// 错误写法: 第二个 <span class="hljs-keyword">then</span> 方法的 <span class="hljs-class"><span class="hljs-keyword">data</span> 为 undefined</span></code></pre>
<p>如果onFulfilled和onRejected回调不存在，则执行下一个 promise 的回调并携带当前的_value 值。即可以这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro.then().then().then().then(data => {}).catch(err => {});
// 正确写法: 第四个 then 方法仍然能取到第一个pro 的内部_value 值
// 当然前面的三个 then 写起来毫无用处
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">pro</span>.<span class="hljs-keyword">then</span>().<span class="hljs-keyword">then</span>().<span class="hljs-keyword">then</span>().<span class="hljs-keyword">then</span>(<span class="hljs-class"><span class="hljs-keyword">data</span> =&gt; {}).catch(<span class="hljs-title">err</span> =&gt; {});</span>
// 正确写法: 第四个 <span class="hljs-keyword">then</span> 方法仍然能取到第一个pro 的内部_value 值
// 当然前面的三个 <span class="hljs-keyword">then</span> 写起来毫无用处
</code></pre>
<p>所以针对下面的情况：当第一个 then 提供了 reject 回调，后面又跟了个 catch 方法。<br>当 reject 时，会优先执行第一个 Promise 的onRejected回调函数，catch 是在下一个 Promise 对象上的捕获错误方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro.then(data => data,err => err).catch(err => err);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code style="word-break: break-word; white-space: initial;">pro.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> data,<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> err).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> err);</code></pre>
<p>最终总结:<strong>resolve 要么提供带返回值的回调，要么不提供回调函数</strong></p>
<h3 id="articleHeader7">静态方法：race</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      // 因为doResolve方法内部 done 变量控制了对 resolve reject 方法只执行一次的处理
      // 所以这里实现很简单，清晰明了，最快的 Promise 执行了  resolve||reject，后面相对慢的 // Promise都不执行
      values[i].then(resolve, reject);
    }
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.race = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">values</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = values.length; i &lt; len; i++) {
      <span class="hljs-comment">// 因为doResolve方法内部 done 变量控制了对 resolve reject 方法只执行一次的处理</span>
      <span class="hljs-comment">// 所以这里实现很简单，清晰明了，最快的 Promise 执行了  resolve||reject，后面相对慢的 // Promise都不执行</span>
      values[i].then(resolve, reject);
    }
  });
};</code></pre>
<p>用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race([pro1,pro2,pro3]).then()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Promise</span><span class="hljs-selector-class">.race</span>(<span class="hljs-selector-attr">[pro1,pro2,pro3]</span>)<span class="hljs-selector-class">.then</span>()</code></pre>
<p>race的实现非常巧妙，对当前的 values(必须是 Promise 数组) for 循环执行每个 Promise 的 then 方法，resolve, reject方法对于所有race中 promise 对象都是公用的，从而利用doResolve内部的 done变量，保证了最快执行的 Promise 能做 resolve reject 的回调，从而达到了多个Promise race 竞赛的机制，谁跑的快执行谁。</p>
<h3 id="articleHeader8">静态方法：all</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        // 如果 val 是 Promise 对象的话，则执行 Promise,直到 resolve 了一个非 Promise 对象
        if (val &amp;&amp; (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        // 用当前resolve||reject 的值重写 args[i]{Promise} 对象
        args[i] = val;
        // 直到所有的 Promise 都执行完毕，则 resolve all 的 Promise 对象，返回args数组结果
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        // 只要其中一个 Promise 出现异常，则全部的 Promise 执行退出，进入 catch异常处理
        // 因为 resolve 和 reject 回调有 done 变量的保证只能执行一次，所以其他的 Promise 都不执行
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">if</span> (!arr || <span class="hljs-keyword">typeof</span> arr.length === <span class="hljs-string">'undefined'</span>)
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Promise.all accepts an array'</span>);
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(arr);
    <span class="hljs-keyword">if</span> (args.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> resolve([]);
    <span class="hljs-keyword">var</span> remaining = args.length;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">res</span>(<span class="hljs-params">i, val</span>) </span>{
      <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">// 如果 val 是 Promise 对象的话，则执行 Promise,直到 resolve 了一个非 Promise 对象</span>
        <span class="hljs-keyword">if</span> (val &amp;&amp; (<span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span>)) {
          <span class="hljs-keyword">var</span> then = val.then;
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">'function'</span>) {
            then.call(
              val,
              <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
                res(i, val);
              },
              reject
            );
            <span class="hljs-keyword">return</span>;
          }
        }
        <span class="hljs-comment">// 用当前resolve||reject 的值重写 args[i]{Promise} 对象</span>
        args[i] = val;
        <span class="hljs-comment">// 直到所有的 Promise 都执行完毕，则 resolve all 的 Promise 对象，返回args数组结果</span>
        <span class="hljs-keyword">if</span> (--remaining === <span class="hljs-number">0</span>) {
          resolve(args);
        }
      } <span class="hljs-keyword">catch</span> (ex) {
        <span class="hljs-comment">// 只要其中一个 Promise 出现异常，则全部的 Promise 执行退出，进入 catch异常处理</span>
        <span class="hljs-comment">// 因为 resolve 和 reject 回调有 done 变量的保证只能执行一次，所以其他的 Promise 都不执行</span>
        reject(ex);
      }
    }

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; args.length; i++) {
      res(i, args[i]);
    }
  });
};</code></pre>
<p>用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([pro1,pro2,pro3]).then()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Promise</span><span class="hljs-selector-class">.all</span>(<span class="hljs-selector-attr">[pro1,pro2,pro3]</span>)<span class="hljs-selector-class">.then</span>()</code></pre>
<p>all 等待所有的 Promise 都执行完毕，才会执行 Promise.all().then()回调，只要其中一个出错，则直接进入错误回调，因为对于所有 all 中 promise 对象 reject 回调是公用的，利用doResolve内部的 done变量,保证一次错误终止所有操作。</p>
<p>但是对于 resolve 则不一样， resolve 回调函数通过 res 递归调用自己,从而保证其值_value不为 Promise 类型才结束，并将_value 赋值到 args 数组，最后直到所有的数组Promise都处理完毕由统一的 resolve 方法结束当前的 all 操作，进入 then 处理流程。</p>
<h2 id="articleHeader9">结束语</h2>
<p>本篇针对 Promise 的所有 api 做了详细的代码解释和使用场景，篇幅可能过长，看起来比较费力，如果有写的不对的地方欢迎指正。</p>
<p>最后附上我的 github 源码注释版链接  <a href="https://github.com/frontMoment/promise-polyfill-analyze" rel="nofollow noreferrer" target="_blank">promise源码注释版</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从使用角度渐进式剖析Promise源码

## 原文链接
[https://segmentfault.com/a/1190000014368256](https://segmentfault.com/a/1190000014368256)


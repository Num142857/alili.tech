---
title: '[译] 实例解析 ES6 Proxy 使用场景' 
date: 2019-02-06 2:30:09
hidden: true
slug: b8towiasbuk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章永久链接地址：<a href="http://pinggod.com/2016/%E5%AE%9E%E4%BE%8B%E8%A7%A3%E6%9E%90-ES6-Proxy-%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF/" rel="nofollow noreferrer" target="_blank">http://pinggod.com/2016/%E5%AE%9E%E4%BE%8B%E8%A7%A3%E6%9E%90-ES6-Proxy-%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF/</a></p></blockquote>
<p>ES6 中的箭头函数、数组解构、rest 参数等特性一经实现就广为流传，但类似 Proxy 这样的特性却很少见到有开发者在使用，一方面在于浏览器的兼容性，另一方面也在于要想发挥这些特性的优势需要开发者深入地理解其使用场景。就我个人而言是非常喜欢 ES6 的 Proxy，因为它让我们以简洁易懂的方式控制了外部对对象的访问。在下文中，首先我会介绍 Proxy 的使用方式，然后列举具体实例解释 Proxy 的使用场景。</p>
<p>Proxy，见名知意，其功能非常类似于设计模式中的代理模式，该模式常用于三个方面：</p>
<ul>
<li><p>拦截和监视外部对对象的访问</p></li>
<li><p>降低函数或类的复杂度</p></li>
<li><p>在复杂操作前对操作进行校验或对所需资源进行管理</p></li>
</ul>
<p>在支持 Proxy 的浏览器环境中，Proxy 是一个全局对象，可以直接使用。<code>Proxy(target, handler)</code> 是一个构造函数，<code>target</code> 是被代理的对象，<code>handlder</code> 是声明了各类代理操作的对象，最终返回一个代理对象。外界每次通过代理对象访问 <code>target</code> 对象的属性时，就会经过 <code>handler</code> 对象，从这个流程来看，代理对象很类似 middleware（中间件）。那么 Proxy 可以拦截什么操作呢？最常见的就是 get（读取）、set（修改）对象属性等操作，完整的可拦截操作列表请点击<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots" rel="nofollow noreferrer" target="_blank">这里</a>。此外，Proxy 对象还提供了一个 <code>revoke</code> 方法，可以随时注销所有的代理操作。在我们正式介绍 Proxy 之前，建议你对 Reflect 有一定的了解，它也是一个 ES6 新增的全局对象，详细信息请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect" rel="nofollow noreferrer" target="_blank">MDN Reflect</a>。</p>
<h2 id="articleHeader0">Basic</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const target = {  
    name: 'Billy Bob',
    age: 15
};

const handler = {  
    get(target, key, proxy) {
        const today = new Date();
        console.log(`GET request made for ${key} at ${today}`);

        return Reflect.get(target, key, proxy);
    }
};

const proxy = new Proxy(target, handler);
proxy.name;
// => &quot;GET request made for name at Thu Jul 21 2016 15:26:20 GMT+0800 (CST)&quot;
// => &quot;Billy Bob&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> target = {  
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Billy Bob'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">15</span>
};

<span class="hljs-keyword">const</span> handler = {  
    get(target, key, proxy) {
        <span class="hljs-keyword">const</span> today = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`GET request made for <span class="hljs-subst">${key}</span> at <span class="hljs-subst">${today}</span>`</span>);

        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, key, proxy);
    }
};

<span class="hljs-keyword">const</span> proxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handler);
proxy.name;
<span class="hljs-comment">// =&gt; "GET request made for name at Thu Jul 21 2016 15:26:20 GMT+0800 (CST)"</span>
<span class="hljs-comment">// =&gt; "Billy Bob"</span></code></pre>
<p>在上面的代码中，我们首先定义了一个被代理的目标对象 <code>target</code>，然后声明了包含所有代理操作的 <code>handler</code> 对象，接下来使用 <code>Proxy(target, handler)</code> 创建代理对象 <code>proxy</code>，此后所有使用 <code>proxy</code> 对 <code>target</code> 属性的访问都会经过 <code>handler</code> 的处理。</p>
<h2 id="articleHeader1">1. 抽离校验模块</h2>
<p>让我们从一个简单的类型校验开始做起，这个示例演示了如何使用 Proxy 保障数据类型的准确性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numericDataStore = {  
    count: 0,
    amount: 1234,
    total: 14
};

numericDataStore = new Proxy(numericDataStore, {  
    set(target, key, value, proxy) {
        if (typeof value !== 'number') {
            throw Error(&quot;Properties in numericDataStore can only be numbers&quot;);
        }
        return Reflect.set(target, key, value, proxy);
    }
});

// 抛出错误，因为 &quot;foo&quot; 不是数值
numericDataStore.count = &quot;foo&quot;;

// 赋值成功
numericDataStore.count = 333;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> numericDataStore = {  
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">amount</span>: <span class="hljs-number">1234</span>,
    <span class="hljs-attr">total</span>: <span class="hljs-number">14</span>
};

numericDataStore = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(numericDataStore, {  
    set(target, key, value, proxy) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">'number'</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Properties in numericDataStore can only be numbers"</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, key, value, proxy);
    }
});

<span class="hljs-comment">// 抛出错误，因为 "foo" 不是数值</span>
numericDataStore.count = <span class="hljs-string">"foo"</span>;

<span class="hljs-comment">// 赋值成功</span>
numericDataStore.count = <span class="hljs-number">333</span>;</code></pre>
<p>如果要直接为对象的所有属性开发一个校验器可能很快就会让代码结构变得臃肿，使用 Proxy 则可以将校验器从核心逻辑分离出来自成一体：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createValidator(target, validator) {  
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                let validator = this._validator[key];
                if (!!validator(value)) {
                    return Reflect.set(target, key, value, proxy);
                } else {
                    throw Error(`Cannot set ${key} to ${value}. Invalid.`);
                }
            } else {
                throw Error(`${key} is not a valid property`)
            }
        }
    });
}

const personValidators = {  
    name(val) {
        return typeof val === 'string';
    },
    age(val) {
        return typeof age === 'number' &amp;&amp; age > 18;
    }
}
class Person {  
    constructor(name, age) {
        this.name = name;
        this.age = age;
        return createValidator(this, personValidators);
    }
}

const bill = new Person('Bill', 25);

// 以下操作都会报错
bill.name = 0;  
bill.age = 'Bill';  
bill.age = 15;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createValidator</span>(<span class="hljs-params">target, validator</span>) </span>{  
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, {
        <span class="hljs-attr">_validator</span>: validator,
        set(target, key, value, proxy) {
            <span class="hljs-keyword">if</span> (target.hasOwnProperty(key)) {
                <span class="hljs-keyword">let</span> validator = <span class="hljs-keyword">this</span>._validator[key];
                <span class="hljs-keyword">if</span> (!!validator(value)) {
                    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, key, value, proxy);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Cannot set <span class="hljs-subst">${key}</span> to <span class="hljs-subst">${value}</span>. Invalid.`</span>);
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`<span class="hljs-subst">${key}</span> is not a valid property`</span>)
            }
        }
    });
}

<span class="hljs-keyword">const</span> personValidators = {  
    name(val) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'string'</span>;
    },
    age(val) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> age === <span class="hljs-string">'number'</span> &amp;&amp; age &gt; <span class="hljs-number">18</span>;
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{  
    <span class="hljs-keyword">constructor</span>(name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
        <span class="hljs-keyword">return</span> createValidator(<span class="hljs-keyword">this</span>, personValidators);
    }
}

<span class="hljs-keyword">const</span> bill = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Bill'</span>, <span class="hljs-number">25</span>);

<span class="hljs-comment">// 以下操作都会报错</span>
bill.name = <span class="hljs-number">0</span>;  
bill.age = <span class="hljs-string">'Bill'</span>;  
bill.age = <span class="hljs-number">15</span>;  </code></pre>
<p>通过校验器和主逻辑的分离，你可以无限扩展 <code>personValidators</code> 校验器的内容，而不会对相关的类或函数造成直接破坏。更复杂一点，我们还可以使用 Proxy 模拟类型检查，检查函数是否接收了类型和数量都正确的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {  
    pickyMethodOne: function(obj, str, num) { /* ... */ },
    pickyMethodTwo: function(num, obj) { /*... */ }
};

const argTypes = {  
    pickyMethodOne: [&quot;object&quot;, &quot;string&quot;, &quot;number&quot;],
    pickyMethodTwo: [&quot;number&quot;, &quot;object&quot;]
};

obj = new Proxy(obj, {  
    get: function(target, key, proxy) {
        var value = target[key];
        return function(...args) {
            var checkArgs = argChecker(key, args, argTypes[key]);
            return Reflect.apply(value, target, args);
        };
    }
});

function argChecker(name, args, checkers) {  
    for (var idx = 0; idx < args.length; idx++) {
        var arg = args[idx];
        var type = checkers[idx];
        if (!arg || typeof arg !== type) {
            console.warn(`You are incorrectly implementing the signature of ${name}. Check param ${idx + 1}`);
        }
    }
}

obj.pickyMethodOne();  
// > You are incorrectly implementing the signature of pickyMethodOne. Check param 1
// > You are incorrectly implementing the signature of pickyMethodOne. Check param 2
// > You are incorrectly implementing the signature of pickyMethodOne. Check param 3

obj.pickyMethodTwo(&quot;wopdopadoo&quot;, {});  
// > You are incorrectly implementing the signature of pickyMethodTwo. Check param 1

// No warnings logged
obj.pickyMethodOne({}, &quot;a little string&quot;, 123);  
obj.pickyMethodOne(123, {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {  
    <span class="hljs-attr">pickyMethodOne</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, str, num</span>) </span>{ <span class="hljs-comment">/* ... */</span> },
    <span class="hljs-attr">pickyMethodTwo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num, obj</span>) </span>{ <span class="hljs-comment">/*... */</span> }
};

<span class="hljs-keyword">const</span> argTypes = {  
    <span class="hljs-attr">pickyMethodOne</span>: [<span class="hljs-string">"object"</span>, <span class="hljs-string">"string"</span>, <span class="hljs-string">"number"</span>],
    <span class="hljs-attr">pickyMethodTwo</span>: [<span class="hljs-string">"number"</span>, <span class="hljs-string">"object"</span>]
};

obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {  
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key, proxy</span>) </span>{
        <span class="hljs-keyword">var</span> value = target[key];
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) </span>{
            <span class="hljs-keyword">var</span> checkArgs = argChecker(key, args, argTypes[key]);
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.apply(value, target, args);
        };
    }
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">argChecker</span>(<span class="hljs-params">name, args, checkers</span>) </span>{  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> idx = <span class="hljs-number">0</span>; idx &lt; args.length; idx++) {
        <span class="hljs-keyword">var</span> arg = args[idx];
        <span class="hljs-keyword">var</span> type = checkers[idx];
        <span class="hljs-keyword">if</span> (!arg || <span class="hljs-keyword">typeof</span> arg !== type) {
            <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">`You are incorrectly implementing the signature of <span class="hljs-subst">${name}</span>. Check param <span class="hljs-subst">${idx + <span class="hljs-number">1</span>}</span>`</span>);
        }
    }
}

obj.pickyMethodOne();  
<span class="hljs-comment">// &gt; You are incorrectly implementing the signature of pickyMethodOne. Check param 1</span>
<span class="hljs-comment">// &gt; You are incorrectly implementing the signature of pickyMethodOne. Check param 2</span>
<span class="hljs-comment">// &gt; You are incorrectly implementing the signature of pickyMethodOne. Check param 3</span>

obj.pickyMethodTwo(<span class="hljs-string">"wopdopadoo"</span>, {});  
<span class="hljs-comment">// &gt; You are incorrectly implementing the signature of pickyMethodTwo. Check param 1</span>

<span class="hljs-comment">// No warnings logged</span>
obj.pickyMethodOne({}, <span class="hljs-string">"a little string"</span>, <span class="hljs-number">123</span>);  
obj.pickyMethodOne(<span class="hljs-number">123</span>, {});</code></pre>
<h2 id="articleHeader2">2. 私有属性</h2>
<p>在 JavaScript 或其他语言中，大家会约定俗成地在变量名之前添加下划线 <code>_</code> 来表明这是一个私有属性（并不是真正的私有），但我们无法保证真的没人会去访问或修改它。在下面的代码中，我们声明了一个私有的 <code>apiKey</code>，便于 <code>api</code> 这个对象内部的方法调用，但不希望从外部也能够访问 <code>api._apiKey</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var api = {  
    _apiKey: '123abc456def',
    /* mock methods that use this._apiKey */
    getUsers: function(){}, 
    getUser: function(userId){}, 
    setUser: function(userId, config){}
};

// logs '123abc456def';
console.log(&quot;An apiKey we want to keep private&quot;, api._apiKey);

// get and mutate _apiKeys as desired
var apiKey = api._apiKey;  
api._apiKey = '987654321';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> api = {  
    <span class="hljs-attr">_apiKey</span>: <span class="hljs-string">'123abc456def'</span>,
    <span class="hljs-comment">/* mock methods that use this._apiKey */</span>
    getUsers: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, 
    <span class="hljs-attr">getUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId</span>)</span>{}, 
    <span class="hljs-attr">setUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId, config</span>)</span>{}
};

<span class="hljs-comment">// logs '123abc456def';</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"An apiKey we want to keep private"</span>, api._apiKey);

<span class="hljs-comment">// get and mutate _apiKeys as desired</span>
<span class="hljs-keyword">var</span> apiKey = api._apiKey;  
api._apiKey = <span class="hljs-string">'987654321'</span>;</code></pre>
<p>很显然，约定俗成是没有束缚力的。使用 ES6 Proxy 我们就可以实现真实的私有变量了，下面针对不同的读取方式演示两个不同的私有化方法。第一种方法是使用 set / get 拦截读写请求并返回 <code>undefined</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let api = {  
    _apiKey: '123abc456def',
    getUsers: function(){ }, 
    getUser: function(userId){ }, 
    setUser: function(userId, config){ }
};

const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {  
    get(target, key, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, value, proxy);
    }
});

// 以下操作都会抛出错误
console.log(api._apiKey);
api._apiKey = '987654321';  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> api = {  
    <span class="hljs-attr">_apiKey</span>: <span class="hljs-string">'123abc456def'</span>,
    <span class="hljs-attr">getUsers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ }, 
    <span class="hljs-attr">getUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId</span>)</span>{ }, 
    <span class="hljs-attr">setUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId, config</span>)</span>{ }
};

<span class="hljs-keyword">const</span> RESTRICTED = [<span class="hljs-string">'_apiKey'</span>];
api = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(api, {  
    get(target, key, proxy) {
        <span class="hljs-keyword">if</span>(RESTRICTED.indexOf(key) &gt; <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`<span class="hljs-subst">${key}</span> is restricted. Please see api documentation for further info.`</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        <span class="hljs-keyword">if</span>(RESTRICTED.indexOf(key) &gt; <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`<span class="hljs-subst">${key}</span> is restricted. Please see api documentation for further info.`</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, key, value, proxy);
    }
});

<span class="hljs-comment">// 以下操作都会抛出错误</span>
<span class="hljs-built_in">console</span>.log(api._apiKey);
api._apiKey = <span class="hljs-string">'987654321'</span>;  </code></pre>
<p>第二种方法是使用 has 拦截 in 操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var api = {  
    _apiKey: '123abc456def',
    getUsers: function(){ }, 
    getUser: function(userId){ }, 
    setUser: function(userId, config){ }
};

const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {  
    has(target, key) {
        return (RESTRICTED.indexOf(key) > -1) ?
            false :
            Reflect.has(target, key);
    }
});

// these log false, and `for in` iterators will ignore _apiKey
console.log(&quot;_apiKey&quot; in api);

for (var key in api) {  
    if (api.hasOwnProperty(key) &amp;&amp; key === &quot;_apiKey&quot;) {
        console.log(&quot;This will never be logged because the proxy obscures _apiKey...&quot;)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> api = {  
    <span class="hljs-attr">_apiKey</span>: <span class="hljs-string">'123abc456def'</span>,
    <span class="hljs-attr">getUsers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ }, 
    <span class="hljs-attr">getUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId</span>)</span>{ }, 
    <span class="hljs-attr">setUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId, config</span>)</span>{ }
};

<span class="hljs-keyword">const</span> RESTRICTED = [<span class="hljs-string">'_apiKey'</span>];
api = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(api, {  
    has(target, key) {
        <span class="hljs-keyword">return</span> (RESTRICTED.indexOf(key) &gt; <span class="hljs-number">-1</span>) ?
            <span class="hljs-literal">false</span> :
            <span class="hljs-built_in">Reflect</span>.has(target, key);
    }
});

<span class="hljs-comment">// these log false, and `for in` iterators will ignore _apiKey</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"_apiKey"</span> <span class="hljs-keyword">in</span> api);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> api) {  
    <span class="hljs-keyword">if</span> (api.hasOwnProperty(key) &amp;&amp; key === <span class="hljs-string">"_apiKey"</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"This will never be logged because the proxy obscures _apiKey..."</span>)
    }
}</code></pre>
<h2 id="articleHeader3">3. 访问日志</h2>
<p>对于那些调用频繁、运行缓慢或占用执行环境资源较多的属性或接口，开发者会希望记录它们的使用情况或性能表现，这个时候就可以使用 Proxy 充当中间件的角色，轻而易举实现日志功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let api = {  
    _apiKey: '123abc456def',
    getUsers: function() { /* ... */ },
    getUser: function(userId) { /* ... */ },
    setUser: function(userId, config) { /* ... */ }
};

function logMethodAsync(timestamp, method) {  
    setTimeout(function() {
        console.log(`${timestamp} - Logging ${method} request asynchronously.`);
    }, 0)
}

api = new Proxy(api, {  
    get: function(target, key, proxy) {
        var value = target[key];
        return function(...arguments) {
            logMethodAsync(new Date(), key);
            return Reflect.apply(value, target, arguments);
        };
    }
});

api.getUsers();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> api = {  
    <span class="hljs-attr">_apiKey</span>: <span class="hljs-string">'123abc456def'</span>,
    <span class="hljs-attr">getUsers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* ... */</span> },
    <span class="hljs-attr">getUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId</span>) </span>{ <span class="hljs-comment">/* ... */</span> },
    <span class="hljs-attr">setUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userId, config</span>) </span>{ <span class="hljs-comment">/* ... */</span> }
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logMethodAsync</span>(<span class="hljs-params">timestamp, method</span>) </span>{  
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${timestamp}</span> - Logging <span class="hljs-subst">${method}</span> request asynchronously.`</span>);
    }, <span class="hljs-number">0</span>)
}

api = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(api, {  
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key, proxy</span>) </span>{
        <span class="hljs-keyword">var</span> value = target[key];
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...arguments</span>) </span>{
            logMethodAsync(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), key);
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.apply(value, target, <span class="hljs-built_in">arguments</span>);
        };
    }
});

api.getUsers();</code></pre>
<h2 id="articleHeader4">4. 预警和拦截</h2>
<p>假设你不想让其他开发者删除 <code>noDelete</code> 属性，还想让调用 <code>oldMethod</code> 的开发者了解到这个方法已经被废弃了，或者告诉开发者不要修改 <code>doNotChange</code> 属性，那么就可以使用 Proxy 来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let dataStore = {  
    noDelete: 1235,
    oldMethod: function() {/*...*/ },
    doNotChange: &quot;tried and true&quot;
};

const NODELETE = ['noDelete'];  
const NOCHANGE = ['doNotChange'];
const DEPRECATED = ['oldMethod'];  

dataStore = new Proxy(dataStore, {  
    set(target, key, value, proxy) {
        if (NOCHANGE.includes(key)) {
            throw Error(`Error! ${key} is immutable.`);
        }
        return Reflect.set(target, key, value, proxy);
    },
    deleteProperty(target, key) {
        if (NODELETE.includes(key)) {
            throw Error(`Error! ${key} cannot be deleted.`);
        }
        return Reflect.deleteProperty(target, key);

    },
    get(target, key, proxy) {
        if (DEPRECATED.includes(key)) {
            console.warn(`Warning! ${key} is deprecated.`);
        }
        var val = target[key];

        return typeof val === 'function' ?
            function(...args) {
                Reflect.apply(target[key], target, args);
            } :
            val;
    }
});

// these will throw errors or log warnings, respectively
dataStore.doNotChange = &quot;foo&quot;;  
delete dataStore.noDelete;  
dataStore.oldMethod();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> dataStore = {  
    <span class="hljs-attr">noDelete</span>: <span class="hljs-number">1235</span>,
    <span class="hljs-attr">oldMethod</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-comment">/*...*/</span> },
    <span class="hljs-attr">doNotChange</span>: <span class="hljs-string">"tried and true"</span>
};

<span class="hljs-keyword">const</span> NODELETE = [<span class="hljs-string">'noDelete'</span>];  
<span class="hljs-keyword">const</span> NOCHANGE = [<span class="hljs-string">'doNotChange'</span>];
<span class="hljs-keyword">const</span> DEPRECATED = [<span class="hljs-string">'oldMethod'</span>];  

dataStore = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(dataStore, {  
    set(target, key, value, proxy) {
        <span class="hljs-keyword">if</span> (NOCHANGE.includes(key)) {
            <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Error! <span class="hljs-subst">${key}</span> is immutable.`</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, key, value, proxy);
    },
    deleteProperty(target, key) {
        <span class="hljs-keyword">if</span> (NODELETE.includes(key)) {
            <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Error! <span class="hljs-subst">${key}</span> cannot be deleted.`</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.deleteProperty(target, key);

    },
    get(target, key, proxy) {
        <span class="hljs-keyword">if</span> (DEPRECATED.includes(key)) {
            <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">`Warning! <span class="hljs-subst">${key}</span> is deprecated.`</span>);
        }
        <span class="hljs-keyword">var</span> val = target[key];

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span> ?
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) </span>{
                <span class="hljs-built_in">Reflect</span>.apply(target[key], target, args);
            } :
            val;
    }
});

<span class="hljs-comment">// these will throw errors or log warnings, respectively</span>
dataStore.doNotChange = <span class="hljs-string">"foo"</span>;  
<span class="hljs-keyword">delete</span> dataStore.noDelete;  
dataStore.oldMethod();</code></pre>
<h2 id="articleHeader5">5. 过滤操作</h2>
<p>某些操作会非常占用资源，比如传输大文件，这个时候如果文件已经在分块发送了，就不需要在对新的请求作出相应（非绝对），这个时候就可以使用 Proxy 对当请求进行特征检测，并根据特征过滤出哪些是不需要响应的，哪些是需要响应的。下面的代码简单演示了过滤特征的方式，并不是完整代码，相信大家会理解其中的妙处：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {  
    getGiantFile: function(fileId) {/*...*/ }
};

obj = new Proxy(obj, {  
    get(target, key, proxy) {
        return function(...args) {
            const id = args[0];
            let isEnroute = checkEnroute(id);
            let isDownloading = checkStatus(id);      
            let cached = getCached(id);

            if (isEnroute || isDownloading) {
                return false;
            }
            if (cached) {
                return cached;
            }
            return Reflect.apply(target[key], target, args);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {  
    <span class="hljs-attr">getGiantFile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileId</span>) </span>{<span class="hljs-comment">/*...*/</span> }
};

obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {  
    get(target, key, proxy) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) </span>{
            <span class="hljs-keyword">const</span> id = args[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">let</span> isEnroute = checkEnroute(id);
            <span class="hljs-keyword">let</span> isDownloading = checkStatus(id);      
            <span class="hljs-keyword">let</span> cached = getCached(id);

            <span class="hljs-keyword">if</span> (isEnroute || isDownloading) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }
            <span class="hljs-keyword">if</span> (cached) {
                <span class="hljs-keyword">return</span> cached;
            }
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.apply(target[key], target, args);
        }
    }
});</code></pre>
<h2 id="articleHeader6">6. 中断代理</h2>
<p>Proxy 支持随时取消对 <code>target</code> 的代理，这一操作常用于完全封闭对数据或接口的访问。在下面的示例中，我们使用了 <code>Proxy.revocable</code> 方法创建了可撤销代理的代理对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let sensitiveData = { username: 'devbryce' };
const {sensitiveData, revokeAccess} = Proxy.revocable(sensitiveData, handler);
function handleSuspectedHack(){  
    revokeAccess();
}

// logs 'devbryce'
console.log(sensitiveData.username);
handleSuspectedHack();
// TypeError: Revoked
console.log(sensitiveData.username);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> sensitiveData = { <span class="hljs-attr">username</span>: <span class="hljs-string">'devbryce'</span> };
<span class="hljs-keyword">const</span> {sensitiveData, revokeAccess} = <span class="hljs-built_in">Proxy</span>.revocable(sensitiveData, handler);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleSuspectedHack</span>(<span class="hljs-params"></span>)</span>{  
    revokeAccess();
}

<span class="hljs-comment">// logs 'devbryce'</span>
<span class="hljs-built_in">console</span>.log(sensitiveData.username);
handleSuspectedHack();
<span class="hljs-comment">// TypeError: Revoked</span>
<span class="hljs-built_in">console</span>.log(sensitiveData.username);</code></pre>
<h2 id="articleHeader7">Decorator</h2>
<p>ES7 中实现的 Decorator，相当于设计模式中的装饰器模式。如果简单地区分 Proxy 和 Decorator 的使用场景，可以概括为：Proxy 的核心作用是控制外界对被代理者内部的访问，Decorator 的核心作用是增强被装饰者的功能。只要在它们核心的使用场景上做好区别，那么像是访问日志这样的功能，虽然本文使用了 Proxy 实现，但也可以使用 Decorator 实现，开发者可以根据项目的需求、团队的规范、自己的偏好自由选择。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 实例解析 ES6 Proxy 使用场景

## 原文链接
[https://segmentfault.com/a/1190000006035363](https://segmentfault.com/a/1190000006035363)


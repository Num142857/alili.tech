---
title: 'underscore 系列之如何写自己的 underscore' 
date: 2018-12-25 2:30:11
hidden: true
slug: ywxyfjgumg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在 <a href="https://github.com/mqyqingfeng/Blog/issues/53" rel="nofollow noreferrer" target="_blank">《JavaScript 专题系列》</a> 中，我们写了很多的功能函数，比如防抖、节流、去重、类型判断、扁平数组、深浅拷贝、查找数组元素、通用遍历、柯里化、函数组合、函数记忆、乱序等，可以我们该如何组织这些函数，形成自己的一个工具函数库呢？这个时候，我们就要借鉴 underscore 是怎么做的了。</p>
<h2 id="articleHeader1">自己实现</h2>
<p>如果是我们自己去组织这些函数，我们该怎么做呢？我想我会这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var root = this;

    var _ = {};

    root._ = _;

    // 在这里添加自己的方法
    _.reverse = function(string){
        return string.split('').reverse().join('');
    }

})()

_.reverse('hello');
=> 'olleh'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> root = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> _ = {};

    root._ = _;

    <span class="hljs-comment">// 在这里添加自己的方法</span>
    _.reverse = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>)</span>{
        <span class="hljs-keyword">return</span> string.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>);
    }

})()

_.reverse(<span class="hljs-string">'hello'</span>);
=&gt; <span class="hljs-string">'olleh'</span></code></pre>
<p>我们将所有的方法添加到一个名为 <code>_</code> 的对象上，然后将该对象挂载到全局对象上。</p>
<p>之所以不直接 <code>window._ = _</code> 是因为我们写的是一个工具函数库，不仅要求可以运行在浏览器端，还可以运行在诸如 Node 等环境中。</p>
<h2 id="articleHeader2">root</h2>
<p>然而 underscore 可不会写得如此简单，我们从 <code>var root = this</code> 开始说起。</p>
<p>之所以写这一句，是因为我们要通过 this 获得全局对象，然后将 <code>_</code> 对象，挂载上去。</p>
<p>然而在严格模式下，this 返回 undefined，而不是指向 Window，幸运的是 underscore 并没有采用严格模式，可是即便如此，也不能避免，因为在 ES6 中模块脚本自动采用严格模式，不管有没有声明 <code>use strict</code>。</p>
<p>如果 this 返回 undefined，代码就会报错，所以我们的思路是对环境进行检测，然后挂载到正确的对象上。我们修改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var root = (typeof window == 'object' &amp;&amp; window.window == window &amp;&amp; window) ||
           (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> == <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-built_in">window</span>.window == <span class="hljs-built_in">window</span> &amp;&amp; <span class="hljs-built_in">window</span>) ||
           (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global);</code></pre>
<p>在这段代码中，我们判断了浏览器和 Node 环境，可是只有这两个环境吗？那我们来看看 Web Worker。</p>
<h2 id="articleHeader3">Web Worker</h2>
<p>Web Worker 属于 HTML5 中的内容，引用《JavaScript权威指南》中的话就是：</p>
<blockquote><p>在 Web Worker 标准中，定义了解决客户端 JavaScript 无法多线程的问题。其中定义的 “worker” 是指执行代码的并行过程。不过，Web Worker 处在一个自包含的执行环境中，无法访问 Window 对象和 Document 对象，和主线程之间的通信业只能通过异步消息传递机制来实现。</p></blockquote>
<p>为了演示 Web Worker 的效果，我写了一个 demo，<a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/web-worker" rel="nofollow noreferrer" target="_blank">查看代码</a>。</p>
<p>在 Web Worker 中，是无法访问 Window 对象的，所以 <code>typeof window</code> 和 <code>typeof global</code> 的结果都是 <code>undefined</code>，所以最终 root 的值为 false，将一个基本类型的值像对象一样添加属性和方法，自然是会报错的。</p>
<p>那么我们该怎么办呢？</p>
<p>虽然在 Web Worker 中不能访问到 Window 对象，但是我们却能通过 self 访问到 Worker 环境中的全局对象。我们只是要找全局变量挂载而已，所以完全可以挂到 self 中嘛。</p>
<p>而且在浏览器中，除了 window 属性，我们也可以通过 self 属性直接访问到 Winow 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(window.window === window); // true
console.log(window.self === window); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.window === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.self === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span></code></pre>
<p>考虑到使用 self 还可以额外支持 Web Worker，我们直接将代码改成 self：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var root = (typeof self == 'object' &amp;&amp; self.self == self &amp;&amp; self) ||
           (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> self == <span class="hljs-string">'object'</span> &amp;&amp; self.self == self &amp;&amp; self) ||
           (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global);</code></pre>
<h2 id="articleHeader4">node vm</h2>
<p>到了这里，依然没完，让你想不到的是，在 node 的 vm 模块中，也就是沙盒模块，runInContext 方法中，是不存在 window，也不存在 global 变量的，<a href="https://github.com/mqyqingfeng/Blog/blob/master/demos/node-vm/index.js" rel="nofollow noreferrer" target="_blank">查看代码</a>。</p>
<p>但是我们却可以通过 this 访问到全局对象，所以就有人发起了一个 PR，代码改成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var root = (typeof self == 'object' &amp;&amp; self.self == self &amp;&amp; self) ||
           (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global) ||
           this;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> self == <span class="hljs-string">'object'</span> &amp;&amp; self.self == self &amp;&amp; self) ||
           (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global) ||
           <span class="hljs-keyword">this</span>;</code></pre>
<h2 id="articleHeader5">微信小程序</h2>
<p>到了这里，还是没完，轮到微信小程序登场了。</p>
<p>因为在微信小程序中，window 和 global 都是 undefined，加上又强制使用严格模式，this 为 undefined，挂载就会发生错误，所以就有人又发了一个 PR，代码变成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var root = (typeof self == 'object' &amp;&amp; self.self == self &amp;&amp; self) ||
           (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global) ||
           this ||
           {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> self == <span class="hljs-string">'object'</span> &amp;&amp; self.self == self &amp;&amp; self) ||
           (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global) ||
           <span class="hljs-keyword">this</span> ||
           {};</code></pre>
<p>这就是现在 v1.8.3 的样子。</p>
<p>虽然作者可以直接讲解最终的代码，但是作者更希望带着大家看看这看似普通的代码是如何一步步演变成这样的，也希望告诉大家，代码的健壮性，并非一蹴而就，而是汇集了很多人的经验，考虑到了很多我们意想不到的地方，这也是开源项目的好处吧。</p>
<h2 id="articleHeader6">函数对象</h2>
<p>现在我们讲第二句 <code>var _ = {};</code>。</p>
<p>如果仅仅设置 _ 为一个空对象，我们调用方法的时候，只能使用 <code>_.reverse('hello')</code> 的方式，实际上，underscore 也支持类似面向对象的方式调用，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_('hello').reverse(); // 'olleh'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">_(<span class="hljs-string">'hello'</span>).reverse(); <span class="hljs-comment">// 'olleh'</span></code></pre>
<p>再举个例子比较下两种调用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 函数式风格
_.each([1, 2, 3], function(item){
    console.log(item)
});

// 面向对象风格
_([1, 2, 3]).each(function(item){
    console.log(item)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 函数式风格</span>
_.each([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
    <span class="hljs-built_in">console</span>.log(item)
});

<span class="hljs-comment">// 面向对象风格</span>
_([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
    <span class="hljs-built_in">console</span>.log(item)
});</code></pre>
<p>可是该如何实现呢？</p>
<p>既然以 <code>_([1, 2, 3])</code> 的形式可以执行，就表明 <code>_</code> 不是一个字面量对象，而是一个函数！</p>
<p>幸运的是，在 JavaScript 中，函数也是一种对象，我们举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = function() {};
_.value = 1;
_.log = function() { return this.value + 1 };

console.log(_.value); // 1
console.log(_.log()); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
_.value = <span class="hljs-number">1</span>;
_.log = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value + <span class="hljs-number">1</span> };

<span class="hljs-built_in">console</span>.log(_.value); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(_.log()); <span class="hljs-comment">// 2</span></code></pre>
<p>我们完全可以将自定义的函数定义在 <code>_</code> 函数上！</p>
<p>目前的写法为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var root = (typeof self == 'object' &amp;&amp; self.self == self &amp;&amp; self) ||
           (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global) ||
           this ||
           {};

var _ = function() {}

root._ = _;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> self == <span class="hljs-string">'object'</span> &amp;&amp; self.self == self &amp;&amp; self) ||
           (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global) ||
           <span class="hljs-keyword">this</span> ||
           {};

<span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}

root._ = _;</code></pre>
<p>如何做到 <code>_([1, 2, 3]).each(...)</code>呢？即 <em> 函数返回一个对象，这个对象，如何调用挂在 </em> 函数上的方法呢？ </p>
<p>我们看看 underscore 是如何实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = function(obj) {
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
};

_([1, 2, 3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> _)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _(obj);
    <span class="hljs-keyword">this</span>._wrapped = obj;
};

_([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);</code></pre>
<p>我们分析下 <code>_([1, 2, 3])</code> 的执行过程：</p>
<ol>
<li><p>执行 <code>this instanceof _</code>，this 指向 window ，<code>window instanceof _</code> 为 false，<code>!</code>操作符取反，所以执行 <code>new _(obj)</code>。</p></li>
<li><p><code>new _(obj)</code> 中，this 指向实例对象，<code>this instanceof _</code> 为 true，取反后，代码接着执行</p></li>
<li><p>执行 <code>this._wrapped = obj</code>， 函数执行结束</p></li>
<li><p>总结，<code>_([1, 2, 3])</code> 返回一个对象，为 <code>{_wrapped: [1, 2, 3]}</code>，该对象的原型指向 _.prototype</p></li>
</ol>
<p>示意图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014189?w=1234&amp;h=554" src="https://static.alili.tech/img/remote/1460000012014189?w=1234&amp;h=554" alt="_()示意图" title="_()示意图" style="cursor: pointer;"></span></p>
<p>然后问题来了，我们是将方法挂载到 <em> 函数对象上，并没有挂到函数的原型上呐，所以返回了的实例，其实是无法调用 </em> 函数对象上的方法的！</p>
<p>我们写个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var root = (typeof self == 'object' &amp;&amp; self.self == self &amp;&amp; self) ||
               (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global) ||
               this ||
               {};

    var _ = function(obj) {
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    root._ = _;

    _.log = function(){
        console.log(1)
    }

})()

_().log(); // _(...).log is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> self == <span class="hljs-string">'object'</span> &amp;&amp; self.self == self &amp;&amp; self) ||
               (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global) ||
               <span class="hljs-keyword">this</span> ||
               {};

    <span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> _)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _(obj);
        <span class="hljs-keyword">this</span>._wrapped = obj;
    }

    root._ = _;

    _.log = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    }

})()

_().log(); <span class="hljs-comment">// _(...).log is not a function</span></code></pre>
<p>确实有这个问题，所以我们还需要一个方法将 _ 上的方法复制到 <code>_.prototype</code> 上，这个方法就是 <code>_.mixin</code>。</p>
<h2 id="articleHeader7">_.functions</h2>
<p>为了将 <em> 上的方法复制到原型上，首先我们要获得 </em> 上的方法，所以我们先写个 <code>_.functions</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.functions = function(obj) {
    var names = [];
    for (var key in obj) {
        if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.functions = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> names = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (_.isFunction(obj[key])) names.push(key);
    }
    <span class="hljs-keyword">return</span> names.sort();
};</code></pre>
<p>isFunction 函数可以参考 <a href="https://github.com/mqyqingfeng/Blog/issues/28" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断(下)》</a></p>
<h2 id="articleHeader8">mixin</h2>
<p>现在我们可以写 mixin 方法了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ArrayProto = Array.prototype;
var push = ArrayProto.push;

_.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function() {
            var args = [this._wrapped];
            push.apply(args, arguments);
            return func.apply(_, args);
        };
    });
    return _;
};

_.mixin(_);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ArrayProto = <span class="hljs-built_in">Array</span>.prototype;
<span class="hljs-keyword">var</span> push = ArrayProto.push;

_.mixin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    _.each(_.functions(obj), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">var</span> func = _[name] = obj[name];
        _.prototype[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> args = [<span class="hljs-keyword">this</span>._wrapped];
            push.apply(args, <span class="hljs-built_in">arguments</span>);
            <span class="hljs-keyword">return</span> func.apply(_, args);
        };
    });
    <span class="hljs-keyword">return</span> _;
};

_.mixin(_);</code></pre>
<p>each 方法可以参考 <a href="https://github.com/mqyqingfeng/Blog/issues/40" rel="nofollow noreferrer" target="_blank">《JavaScript专题jQuery通用遍历方法each的实现》</a></p>
<p>值得注意的是：因为 <code>_[name] = obj[name]</code> 的缘故，我们可以给 underscore 拓展自定义的方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.mixin({
  addOne: function(num) {
    return num + 1;
  }
});

_(2).addOne(); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.mixin({
  <span class="hljs-attr">addOne</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>;
  }
});

_(<span class="hljs-number">2</span>).addOne(); <span class="hljs-comment">// 3</span></code></pre>
<p>至此，我们算是实现了同时支持面向对象风格和函数风格。</p>
<h2 id="articleHeader9">导出</h2>
<p>终于到了讲最后一步 <code>root._ = _</code>，我们直接看源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof exports != 'undefined' &amp;&amp; !exports.nodeType) {
    if (typeof module != 'undefined' &amp;&amp; !module.nodeType &amp;&amp; module.exports) {
        exports = module.exports = _;
    }
    exports._ = _;
} else {
    root._ = _;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports != <span class="hljs-string">'undefined'</span> &amp;&amp; !exports.nodeType) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> != <span class="hljs-string">'undefined'</span> &amp;&amp; !<span class="hljs-built_in">module</span>.nodeType &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
        exports = <span class="hljs-built_in">module</span>.exports = _;
    }
    exports._ = _;
} <span class="hljs-keyword">else</span> {
    root._ = _;
}</code></pre>
<p>为了支持模块化，我们需要将 _ 在合适的环境中作为模块导出，但是 nodejs 模块的 API 曾经发生过改变，比如在早期版本中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// add.js
exports.addOne = function(num) {
  return num + 1
}

// index.js
var add = require('./add');
add.addOne(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// add.js</span>
exports.addOne = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>
}

<span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./add'</span>);
add.addOne(<span class="hljs-number">2</span>);</code></pre>
<p>在新版本中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// add.js
module.exports = function(1){
    return num + 1
}

// index.js
var addOne = require('./add.js')
addOne(2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// add.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-number">1</span></span>)</span>{
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>
}

<span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">var</span> addOne = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./add.js'</span>)
addOne(<span class="hljs-number">2</span>)</code></pre>
<p>所以我们根据 exports 和 module 是否存在来选择不同的导出方式，那为什么在新版本中，我们还要使用 <code>exports = module.exports = _</code> 呢？</p>
<p>这是因为在 nodejs 中，exports 是 module.exports 的一个引用，当你使用了 module.exports = function(){}，实际上覆盖了 module.exports，但是 exports 并未发生改变，为了避免后面再修改 exports 而导致不能正确输出，就写成这样，将两者保持统一。</p>
<p>写个 demo 吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// exports 是 module.exports 的一个引用
module.exports.num = '1'

console.log(exports.num) // 1

exports.num = '2'

console.log(module.exports.num) // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// exports 是 module.exports 的一个引用</span>
<span class="hljs-built_in">module</span>.exports.num = <span class="hljs-string">'1'</span>

<span class="hljs-built_in">console</span>.log(exports.num) <span class="hljs-comment">// 1</span>

exports.num = <span class="hljs-string">'2'</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.exports.num) <span class="hljs-comment">// 2</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// addOne.js
module.exports = function(num){
    return num + 1
}

exports.num = '3'

// result.js 中引入 addOne.js
var addOne = require('./addOne.js');

console.log(addOne(1)) // 2
console.log(addOne.num) // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// addOne.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>)</span>{
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>
}

exports.num = <span class="hljs-string">'3'</span>

<span class="hljs-comment">// result.js 中引入 addOne.js</span>
<span class="hljs-keyword">var</span> addOne = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./addOne.js'</span>);

<span class="hljs-built_in">console</span>.log(addOne(<span class="hljs-number">1</span>)) <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(addOne.num) <span class="hljs-comment">// undefined</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// addOne.js
exports = module.exports = function(num){
    return num + 1
}

exports.num = '3'

// result.js 中引入 addOne.js
var addOne = require('./addOne.js');

console.log(addOne(1)) // 2
console.log(addOne.num) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// addOne.js</span>
exports = <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>)</span>{
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>
}

exports.num = <span class="hljs-string">'3'</span>

<span class="hljs-comment">// result.js 中引入 addOne.js</span>
<span class="hljs-keyword">var</span> addOne = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./addOne.js'</span>);

<span class="hljs-built_in">console</span>.log(addOne(<span class="hljs-number">1</span>)) <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(addOne.num) <span class="hljs-comment">// 3</span></code></pre>
<p>最后为什么要进行一个 exports.nodeType 判断呢？这是因为如果你在 HTML 页面中加入一个 id 为 exports 的元素，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;exports&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"exports"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>就会生成一个 window.exports 全局变量，你可以直接在浏览器命令行中打印该变量。</p>
<p>此时在浏览器中，<code>typeof exports != 'undefined'</code> 的判断就会生效，然后 <code>exports._ = _</code>，然而在浏览器中，我们需要将 _ 挂载到全局变量上呐，所以在这里，我们还需要进行一个是否是 DOM 节点的判断。</p>
<h2 id="articleHeader10">源码</h2>
<p>最终的代码如下，有了这个基本结构，你可以自由添加你需要使用到的函数了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {

    var root = (typeof self == 'object' &amp;&amp; self.self == self &amp;&amp; self) ||
        (typeof global == 'object' &amp;&amp; global.global == global &amp;&amp; global) ||
        this || {};

    var ArrayProto = Array.prototype;

    var push = ArrayProto.push;

    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    if (typeof exports != 'undefined' &amp;&amp; !exports.nodeType) {
        if (typeof module != 'undefined' &amp;&amp; !module.nodeType &amp;&amp; module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.VERSION = '0.1';

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    var isArrayLike = function(collection) {
        var length = collection.length;
        return typeof length == 'number' &amp;&amp; length >= 0 &amp;&amp; length <= MAX_ARRAY_INDEX;
    };

    _.each = function(obj, callback) {
        var length, i = 0;

        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        }

        return obj;
    }

    _.isFunction = function(obj) {
        return typeof obj == 'function' || false;
    };

    _.functions = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    /**
     * 在 _.mixin(_) 前添加自己定义的方法
     */
    _.reverse = function(string){
        return string.split('').reverse().join('');
    }

    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];

                push.apply(args, arguments);

                return func.apply(_, args);
            };
        });
        return _;
    };

    _.mixin(_);

})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> root = (<span class="hljs-keyword">typeof</span> self == <span class="hljs-string">'object'</span> &amp;&amp; self.self == self &amp;&amp; self) ||
        (<span class="hljs-keyword">typeof</span> global == <span class="hljs-string">'object'</span> &amp;&amp; global.global == global &amp;&amp; global) ||
        <span class="hljs-keyword">this</span> || {};

    <span class="hljs-keyword">var</span> ArrayProto = <span class="hljs-built_in">Array</span>.prototype;

    <span class="hljs-keyword">var</span> push = ArrayProto.push;

    <span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> _) <span class="hljs-keyword">return</span> obj;
        <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> _)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _(obj);
        <span class="hljs-keyword">this</span>._wrapped = obj;
    };

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports != <span class="hljs-string">'undefined'</span> &amp;&amp; !exports.nodeType) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> != <span class="hljs-string">'undefined'</span> &amp;&amp; !<span class="hljs-built_in">module</span>.nodeType &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
            exports = <span class="hljs-built_in">module</span>.exports = _;
        }
        exports._ = _;
    } <span class="hljs-keyword">else</span> {
        root._ = _;
    }

    _.VERSION = <span class="hljs-string">'0.1'</span>;

    <span class="hljs-keyword">var</span> MAX_ARRAY_INDEX = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span>;

    <span class="hljs-keyword">var</span> isArrayLike = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">collection</span>) </span>{
        <span class="hljs-keyword">var</span> length = collection.length;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> length == <span class="hljs-string">'number'</span> &amp;&amp; length &gt;= <span class="hljs-number">0</span> &amp;&amp; length &lt;= MAX_ARRAY_INDEX;
    };

    _.each = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, callback</span>) </span>{
        <span class="hljs-keyword">var</span> length, i = <span class="hljs-number">0</span>;

        <span class="hljs-keyword">if</span> (isArrayLike(obj)) {
            length = obj.length;
            <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
                <span class="hljs-keyword">if</span> (callback.call(obj[i], obj[i], i) === <span class="hljs-literal">false</span>) {
                    <span class="hljs-keyword">break</span>;
                }
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">for</span> (i <span class="hljs-keyword">in</span> obj) {
                <span class="hljs-keyword">if</span> (callback.call(obj[i], obj[i], i) === <span class="hljs-literal">false</span>) {
                    <span class="hljs-keyword">break</span>;
                }
            }
        }

        <span class="hljs-keyword">return</span> obj;
    }

    _.isFunction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> obj == <span class="hljs-string">'function'</span> || <span class="hljs-literal">false</span>;
    };

    _.functions = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> names = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span> (_.isFunction(obj[key])) names.push(key);
        }
        <span class="hljs-keyword">return</span> names.sort();
    };

    <span class="hljs-comment">/**
     * 在 _.mixin(_) 前添加自己定义的方法
     */</span>
    _.reverse = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>)</span>{
        <span class="hljs-keyword">return</span> string.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>);
    }

    _.mixin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        _.each(_.functions(obj), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">var</span> func = _[name] = obj[name];
            _.prototype[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> args = [<span class="hljs-keyword">this</span>._wrapped];

                push.apply(args, <span class="hljs-built_in">arguments</span>);

                <span class="hljs-keyword">return</span> func.apply(_, args);
            };
        });
        <span class="hljs-keyword">return</span> _;
    };

    _.mixin(_);

})()</code></pre>
<h2 id="articleHeader11">相关链接</h2>
<ol>
<li><p><a href="https://github.com/mqyqingfeng/Blog/issues/28" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断(下)》</a></p></li>
<li><p><a href="https://github.com/mqyqingfeng/Blog/issues/40" rel="nofollow noreferrer" target="_blank">《JavaScript专题jQuery通用遍历方法each的实现》</a></p></li>
</ol>
<h2 id="articleHeader12">underscore 系列</h2>
<p>underscore 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>underscore 系列预计写八篇左右，重点介绍 underscore 中的代码架构、链式调用、内部函数、模板引擎等内容，旨在帮助大家阅读源码，以及写出自己的 undercore。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
underscore 系列之如何写自己的 underscore

## 原文链接
[https://segmentfault.com/a/1190000012014184](https://segmentfault.com/a/1190000012014184)


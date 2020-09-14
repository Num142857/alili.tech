---
title: 'JavaScript深入之bind的模拟实现' 
date: 2019-01-15 2:30:12
hidden: true
slug: e07coyclyr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第十一篇，通过bind函数的模拟实现，带大家真正了解bind的特性</p></blockquote>
<h2 id="articleHeader0">bind</h2>
<p>一句话介绍 bind:</p>
<blockquote><p>bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )</p></blockquote>
<p>由此我们可以首先得出 bind 函数的两个特点：</p>
<ol>
<li><p>返回一个函数</p></li>
<li><p>可以传入参数</p></li>
</ol>
<h2 id="articleHeader1">返回函数的模拟实现</h2>
<p>从第一个特点开始，我们举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind(foo); 

bindFoo(); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

<span class="hljs-comment">// 返回了一个函数</span>
<span class="hljs-keyword">var</span> bindFoo = bar.bind(foo); 

bindFoo(); <span class="hljs-comment">// 1</span></code></pre>
<p>关于指定 this 的指向，我们可以使用 call 或者 apply 实现，关于 call 和 apply 的模拟实现，可以查看<a href="https://github.com/mqyqingfeng/Blog/issues/11" rel="nofollow noreferrer" target="_blank">《JavaScript深入之call和apply的模拟实现》</a>。我们来写第一版的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
        self.apply(context);
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-built_in">Function</span>.prototype.bind2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        self.apply(context);
    }

}</code></pre>
<h2 id="articleHeader2">传参的模拟实现</h2>
<p>接下来看第二点，可以传入参数。这个就有点让人费解了，我在 bind 的时候，是否可以传参呢？我在执行 bind 返回的函数的时候，可不可以传参呢？让我们看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
    <span class="hljs-built_in">console</span>.log(name);
    <span class="hljs-built_in">console</span>.log(age);

}

<span class="hljs-keyword">var</span> bindFoo = bar.bind(foo, <span class="hljs-string">'daisy'</span>);
bindFoo(<span class="hljs-string">'18'</span>);
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// daisy</span>
<span class="hljs-comment">// 18</span></code></pre>
<p>函数需要传 name 和 age 两个参数，竟然还可以在 bind 的时候，只传一个 name，在执行返回的函数的时候，再传另一个参数 age!</p>
<p>这可咋办？不急，我们用 arguments 进行处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
Function.prototype.bind2 = function (context) {

    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-built_in">Function</span>.prototype.bind2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{

    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// 获取bind2函数从第二个参数到最后一个参数</span>
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 这个时候的arguments是指bind返回的函数传入的参数</span>
        <span class="hljs-keyword">var</span> bindArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        self.apply(context, args.concat(bindArgs));
    }

}</code></pre>
<h2 id="articleHeader3">构造函数效果的模拟实现</h2>
<p>完成了这两点，最难的部分到啦！因为 bind 还有一个特点，就是</p>
<blockquote><p>一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。</p></blockquote>
<p>也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">2</span>;

<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.habit = <span class="hljs-string">'shopping'</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
    <span class="hljs-built_in">console</span>.log(name);
    <span class="hljs-built_in">console</span>.log(age);
}

bar.prototype.friend = <span class="hljs-string">'kevin'</span>;

<span class="hljs-keyword">var</span> bindFoo = bar.bind(foo, <span class="hljs-string">'daisy'</span>);

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> bindFoo(<span class="hljs-string">'18'</span>);
<span class="hljs-comment">// undefined</span>
<span class="hljs-comment">// daisy</span>
<span class="hljs-comment">// 18</span>
<span class="hljs-built_in">console</span>.log(obj.habit);
<span class="hljs-built_in">console</span>.log(obj.friend);
<span class="hljs-comment">// shopping</span>
<span class="hljs-comment">// kevin</span></code></pre>
<p>注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。</p>
<p>(哈哈，我这是为我的下一篇文章<a href="https://github.com/mqyqingfeng/Blog/issues/13" rel="nofollow noreferrer" target="_blank">《JavaScript深入系列之new的模拟实现》</a>打广告)。</p>
<p>所以我们可以通过修改返回的函数的原型来实现，让我们写一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {

        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fbound.prototype = this.prototype;
    return fbound;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-built_in">Function</span>.prototype.bind2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);

    <span class="hljs-keyword">var</span> fbound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

        <span class="hljs-keyword">var</span> bindArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-comment">// 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。</span>
        <span class="hljs-comment">// 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。</span>
        self.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> self ? <span class="hljs-keyword">this</span> : context, args.concat(bindArgs));
    }
    <span class="hljs-comment">// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值</span>
    fbound.prototype = <span class="hljs-keyword">this</span>.prototype;
    <span class="hljs-keyword">return</span> fbound;
}
</code></pre>
<p>如果对原型链稍有困惑，可以查看<a href="https://github.com/mqyqingfeng/Blog/issues/2" rel="nofollow noreferrer" target="_blank">《JavaScript深入之从原型到原型链》</a>。</p>
<h2 id="articleHeader4">构造函数效果的优化实现</h2>
<p>但是在这个写法中，我们直接将 fbound.prototype = this.prototype，我们直接修改 fbound.prototype 的时候，也会直接修改函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第四版
Function.prototype.bind2 = function (context) {

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    return fbound;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第四版</span>
<span class="hljs-built_in">Function</span>.prototype.bind2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{

    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);

    <span class="hljs-keyword">var</span> fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};

    <span class="hljs-keyword">var</span> fbound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> bindArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        self.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> self ? <span class="hljs-keyword">this</span> : context, args.concat(bindArgs));
    }
    fNOP.prototype = <span class="hljs-keyword">this</span>.prototype;
    fbound.prototype = <span class="hljs-keyword">new</span> fNOP();
    <span class="hljs-keyword">return</span> fbound;

}</code></pre>
<p>到此为止，大的问题都已经解决，给自己一个赞！o(￣▽￣)ｄ</p>
<h2 id="articleHeader5">三个小问题</h2>
<p>接下来处理些小问题:</p>
<p><strong>1.apply 这段代码跟 MDN 上的稍有不同</strong></p>
<p>在 MDN 中文版讲 bind 的模拟实现时，apply 这里的代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
self.apply(this instanceof self ? this : context || this, args.concat(bindArgs))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
self.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> self ? <span class="hljs-keyword">this</span> : context || <span class="hljs-keyword">this</span>, args.concat(bindArgs))
</code></pre>
<p>多了一个关于 context 是否存在的判断，然而这个是错误的！</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 2;
var foo = {
    value: 1,
    bar: bar.bind(null)
};

function bar() {
    console.log(this.value);
}

foo.bar() // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">bar</span>: bar.bind(<span class="hljs-literal">null</span>)
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}

foo.bar() <span class="hljs-comment">// 2</span></code></pre>
<p>以上代码正常情况下会打印 2，如果换成了 context || this，这段代码就会打印 1！</p>
<p>所以这里不应该进行 context 的判断，大家查看 MDN 同样内容的英文版，就不存在这个判断！</p>
<p><strong>2.调用 bind 的不是函数咋办？</strong></p>
<p>不行，我们要报错！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof this !== &quot;function&quot;) {
  throw new Error(&quot;Function.prototype.bind - what is trying to be bound is not callable&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span> !== <span class="hljs-string">"function"</span>) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Function.prototype.bind - what is trying to be bound is not callable"</span>);
}</code></pre>
<p><strong>3.我要在线上用</strong></p>
<p>那别忘了做个兼容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.bind = Function.prototype.bind || function () {
    ……
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-built_in">Function</span>.prototype.bind || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ……
};</code></pre>
<p>当然最好是用<a href="https://github.com/es-shims/es5-shim" rel="nofollow noreferrer" target="_blank">es5-shim</a>啦。</p>
<h2 id="articleHeader6">最终代码</h2>
<p>所以最最后的代码就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.bind2 = function (context) {

    if (typeof this !== &quot;function&quot;) {
      throw new Error(&quot;Function.prototype.bind - what is trying to be bound is not callable&quot;);
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};

    var fbound = function () {
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }

    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();

    return fbound;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Function</span>.prototype.bind2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span> !== <span class="hljs-string">"function"</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Function.prototype.bind - what is trying to be bound is not callable"</span>);
    }

    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};

    <span class="hljs-keyword">var</span> fbound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        self.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> self ? <span class="hljs-keyword">this</span> : context, args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)));
    }

    fNOP.prototype = <span class="hljs-keyword">this</span>.prototype;
    fbound.prototype = <span class="hljs-keyword">new</span> fNOP();

    <span class="hljs-keyword">return</span> fbound;

}</code></pre>
<h2 id="articleHeader7">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/13" rel="nofollow noreferrer" target="_blank">《JavaScript深入系列之new的模拟实现》</a></p>
<h2 id="articleHeader8">相关链接</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/2" rel="nofollow noreferrer" target="_blank">《JavaScript深入之从原型到原型链》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/11" rel="nofollow noreferrer" target="_blank">《JavaScript深入之call和apply的模拟实现》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/13" rel="nofollow noreferrer" target="_blank">《JavaScript深入系列之new的模拟实现》</a></p>
<h2 id="articleHeader9">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之bind的模拟实现

## 原文链接
[https://segmentfault.com/a/1190000009271416](https://segmentfault.com/a/1190000009271416)


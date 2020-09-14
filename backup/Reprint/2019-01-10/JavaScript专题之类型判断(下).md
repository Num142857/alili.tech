---
title: 'JavaScript专题之类型判断(下)' 
date: 2019-01-10 2:30:08
hidden: true
slug: vy4qb5xswe
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript专题系列第五篇，讲解更加复杂的类型判断，比如 plainObject、空对象、类数组对象、Window对象、DOM 元素等</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在上篇<a href="https://github.com/mqyqingfeng/Blog/issues/28" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断(上)》</a>中，我们抄袭 jQuery 写了一个 type 函数，可以检测出常见的数据类型，然而在开发中还有更加复杂的判断，比如 plainObject、空对象、Window 对象等，这一篇就让我们接着抄袭 jQuery 去看一下这些类型的判断。</p>
<h2 id="articleHeader1">plainObject</h2>
<p>plainObject 来自于 jQuery，可以翻译成纯粹的对象，所谓"纯粹的对象"，就是该对象是通过 "{}" 或 "new Object" 创建的，该对象含有零个或者多个键值对。</p>
<p>之所以要判断是不是 plainObject，是为了跟其他的 JavaScript对象如 null，数组，宿主对象（documents）等作区分，因为这些用 typeof 都会返回object。</p>
<p>jQuery提供了 isPlainObject 方法进行判断，先让我们看看使用的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name;
}

console.log($.isPlainObject({})) // true

console.log($.isPlainObject(new Object)) // true

console.log($.isPlainObject(Object.create(null))); // true

console.log($.isPlainObject(Object.assign({a: 1}, {b: 2}))); // true

console.log($.isPlainObject(new Person('yayu'))); // false

console.log($.isPlainObject(Object.create({}))); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-built_in">console</span>.log($.isPlainObject({})) <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log($.isPlainObject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>)) <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log($.isPlainObject(<span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>))); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log($.isPlainObject(<span class="hljs-built_in">Object</span>.assign({<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}, {<span class="hljs-attr">b</span>: <span class="hljs-number">2</span>}))); <span class="hljs-comment">// true</span>

<span class="hljs-built_in">console</span>.log($.isPlainObject(<span class="hljs-keyword">new</span> Person(<span class="hljs-string">'yayu'</span>))); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log($.isPlainObject(<span class="hljs-built_in">Object</span>.create({}))); <span class="hljs-comment">// false</span></code></pre>
<p>由此我们可以看到，除了 {} 和 new Object 创建的之外，jQuery 认为一个没有原型的对象也是一个纯粹的对象。</p>
<p>实际上随着 jQuery 版本的提升，isPlainObject 的实现也在变化，我们今天讲的是 3.0 版本下的 isPlainObject，我们直接看源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 上节中写 type 函数时，用来存放 toString 映射结果的对象
var class2type = {};

// 相当于 Object.prototype.toString
var toString = class2type.toString;

// 相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
    var proto, Ctor;

    // 排除掉明显不是obj的以及一些宿主对象如Window
    if (!obj || toString.call(obj) !== &quot;[object Object]&quot;) {
        return false;
    }

    /**
     * getPrototypeOf es5 方法，获取 obj 的原型
     * 以 new Object 创建的对象为例的话
     * obj.__proto__ === Object.prototype
     */
    proto = Object.getPrototypeOf(obj);

    // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
    if (!proto) {
        return true;
    }

    /**
     * 以下判断通过 new Object 方式创建的对象
     * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
     * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
     */
    Ctor = hasOwn.call(proto, &quot;constructor&quot;) &amp;&amp; proto.constructor;

    // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
    return typeof Ctor === &quot;function&quot; &amp;&amp; hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 上节中写 type 函数时，用来存放 toString 映射结果的对象</span>
<span class="hljs-keyword">var</span> class2type = {};

<span class="hljs-comment">// 相当于 Object.prototype.toString</span>
<span class="hljs-keyword">var</span> toString = class2type.toString;

<span class="hljs-comment">// 相当于 Object.prototype.hasOwnProperty</span>
<span class="hljs-keyword">var</span> hasOwn = class2type.hasOwnProperty;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPlainObject</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> proto, Ctor;

    <span class="hljs-comment">// 排除掉明显不是obj的以及一些宿主对象如Window</span>
    <span class="hljs-keyword">if</span> (!obj || toString.call(obj) !== <span class="hljs-string">"[object Object]"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-comment">/**
     * getPrototypeOf es5 方法，获取 obj 的原型
     * 以 new Object 创建的对象为例的话
     * obj.__proto__ === Object.prototype
     */</span>
    proto = <span class="hljs-built_in">Object</span>.getPrototypeOf(obj);

    <span class="hljs-comment">// 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true</span>
    <span class="hljs-keyword">if</span> (!proto) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-comment">/**
     * 以下判断通过 new Object 方式创建的对象
     * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
     * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
     */</span>
    Ctor = hasOwn.call(proto, <span class="hljs-string">"constructor"</span>) &amp;&amp; proto.constructor;

    <span class="hljs-comment">// 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> Ctor === <span class="hljs-string">"function"</span> &amp;&amp; hasOwn.toString.call(Ctor) === hasOwn.toString.call(<span class="hljs-built_in">Object</span>);
}</code></pre>
<p>注意：我们判断 Ctor 构造函数是不是 Object 构造函数，用的是 hasOwn.toString.call(Ctor)，这个方法可不是 Object.prototype.toString，不信我们在函数里加上下面这两句话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(hasOwn.toString.call(Ctor)); // function Object() { [native code] }
console.log(Object.prototype.toString.call(Ctor)); // [object Function]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(hasOwn.toString.call(Ctor)); <span class="hljs-comment">// function Object() { [native code] }</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(Ctor)); <span class="hljs-comment">// [object Function]</span></code></pre>
<p>发现返回的值并不一样，这是因为 hasOwn.toString 调用的其实是 Function.prototype.toString，毕竟 hasOwnProperty 可是一个函数！</p>
<p>而且 Function 对象覆盖了从 Object 继承来的 Object.prototype.toString 方法。函数的 toString 方法会返回一个表示函数源代码的字符串。具体来说，包括 function关键字，形参列表，大括号，以及函数体中的内容。</p>
<h2 id="articleHeader2">EmptyObject</h2>
<p>jQuery提供了 isEmptyObject 方法来判断是否是空对象，代码简单，我们直接看源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isEmptyObject( obj ) {

        var name;

        for ( name in obj ) {
            return false;
        }

        return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject</span>(<span class="hljs-params"> obj </span>) </span>{

        <span class="hljs-keyword">var</span> name;

        <span class="hljs-keyword">for</span> ( name <span class="hljs-keyword">in</span> obj ) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }

        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>其实所谓的 isEmptyObject 就是判断是否有属性，for 循环一旦执行，就说明有属性，有属性就会返回 false。</p>
<p>但是根据这个源码我们可以看出isEmptyObject实际上判断的并不仅仅是空对象。</p>
<p>举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(isEmptyObject({})); // true
console.log(isEmptyObject([])); // true
console.log(isEmptyObject(null)); // true
console.log(isEmptyObject(undefined)); // true
console.log(isEmptyObject(1)); // true
console.log(isEmptyObject('')); // true
console.log(isEmptyObject(true)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(isEmptyObject({})); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isEmptyObject([])); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isEmptyObject(<span class="hljs-literal">null</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isEmptyObject(<span class="hljs-literal">undefined</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isEmptyObject(<span class="hljs-number">1</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isEmptyObject(<span class="hljs-string">''</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isEmptyObject(<span class="hljs-literal">true</span>)); <span class="hljs-comment">// true</span></code></pre>
<p>以上都会返回 true。</p>
<p>但是既然 jQuery 是这样写，可能是因为考虑到实际开发中 isEmptyObject 用来判断 {} 和 {a: 1} 是足够的吧。如果真的是只判断 {}，完全可以结合上篇写的 type 函数筛选掉不适合的情况。</p>
<h2 id="articleHeader3">Window对象</h2>
<p>Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身，这点在<a href="https://github.com/mqyqingfeng/Blog/issues/5" rel="nofollow noreferrer" target="_blank">《JavaScript深入之变量对象》</a>中讲到过。我们可以利用这个特性判断是否是 Window 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isWindow( obj ) {
    return obj != null &amp;&amp; obj === obj.window;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isWindow</span>(<span class="hljs-params"> obj </span>) </span>{
    <span class="hljs-keyword">return</span> obj != <span class="hljs-literal">null</span> &amp;&amp; obj === obj.window;
}</code></pre>
<h2 id="articleHeader4">isArrayLike</h2>
<p>isArrayLike，看名字可能会让我们觉得这是判断类数组对象的，其实不仅仅是这样，jQuery 实现的 isArrayLike，数组和类数组都会返回 true。</p>
<p>因为源码比较简单，我们直接看源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArrayLike(obj) {

    // obj 必须有 length属性
    var length = !!obj &amp;&amp; &quot;length&quot; in obj &amp;&amp; obj.length;
    var typeRes = type(obj);

    // 排除掉函数和 Window 对象
    if (typeRes === &quot;function&quot; || isWindow(obj)) {
        return false;
    }

    return typeRes === &quot;array&quot; || length === 0 ||
        typeof length === &quot;number&quot; &amp;&amp; length > 0 &amp;&amp; (length - 1) in obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArrayLike</span>(<span class="hljs-params">obj</span>) </span>{

    <span class="hljs-comment">// obj 必须有 length属性</span>
    <span class="hljs-keyword">var</span> length = !!obj &amp;&amp; <span class="hljs-string">"length"</span> <span class="hljs-keyword">in</span> obj &amp;&amp; obj.length;
    <span class="hljs-keyword">var</span> typeRes = type(obj);

    <span class="hljs-comment">// 排除掉函数和 Window 对象</span>
    <span class="hljs-keyword">if</span> (typeRes === <span class="hljs-string">"function"</span> || isWindow(obj)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-keyword">return</span> typeRes === <span class="hljs-string">"array"</span> || length === <span class="hljs-number">0</span> ||
        <span class="hljs-keyword">typeof</span> length === <span class="hljs-string">"number"</span> &amp;&amp; length &gt; <span class="hljs-number">0</span> &amp;&amp; (length - <span class="hljs-number">1</span>) <span class="hljs-keyword">in</span> obj;
}</code></pre>
<p>重点分析 return 这一行，使用了或语句，只要一个为 true，结果就返回 true。</p>
<p>所以如果 isArrayLike 返回true，至少要满足三个条件之一：</p>
<ol>
<li><p>是数组</p></li>
<li><p>长度为 0</p></li>
<li><p>lengths 属性是大于 0 的数组，并且obj[length - 1]必须存在</p></li>
</ol>
<p>第一个就不说了，看第二个，为什么长度为 0 就可以直接判断为 true 呢？</p>
<p>那我们写个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a: 1, b: 2, length: 0}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">length</span>: <span class="hljs-number">0</span>}</code></pre>
<p>isArrayLike 函数就会返回 true，那这个合理吗？</p>
<p>回答合不合理之前，我们先看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(){
    console.log(isArrayLike(arguments))
}
a();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(isArrayLike(<span class="hljs-built_in">arguments</span>))
}
a();</code></pre>
<p>如果我们去掉length === 0 这个判断，就会打印 false，然而我们都知道 arguments 是一个类数组对象，这里是应该返回 true 的。</p>
<p>所以是不是为了放过空的 arguments 时也放过了一些存在争议的对象呢？</p>
<p>第三个条件：length 是数字，并且 length &gt; 0 且最后一个元素存在。</p>
<p>为什么仅仅要求最后一个元素存在呢？</p>
<p>让我们先想下数组是不是可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [,,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> arr = [,,<span class="hljs-number">3</span>]</code></pre>
<p>当我们写一个对应的类数组对象就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrLike = {
    2: 3,
    length: 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arrLike = {
    <span class="hljs-number">2</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">length</span>: <span class="hljs-number">3</span>
}</code></pre>
<p>也就是说当我们在数组中用逗号直接跳过的时候，我们认为该元素是不存在的，类数组对象中也就不用写这个元素，但是最后一个元素是一定要写的，要不然 length 的长度就不会是最后一个元素的 key 值加 1。比如数组可以这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,,];
console.log(arr.length) // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,,];
<span class="hljs-built_in">console</span>.log(arr.length) <span class="hljs-comment">// 2</span></code></pre>
<p>但是类数组对象就只能写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrLike = {
    0: 1,
    length: 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arrLike = {
    <span class="hljs-number">0</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>
}</code></pre>
<p>所以符合条件的类数组对象是一定存在最后一个元素的！</p>
<p>这就是满足 isArrayLike 的三个条件，其实除了 jQuery 之外，很多库都有对 isArrayLike 的实现，比如 underscore:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' &amp;&amp; length >= 0 &amp;&amp; length <= MAX_ARRAY_INDEX;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> MAX_ARRAY_INDEX = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> isArrayLike = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">collection</span>) </span>{
    <span class="hljs-keyword">var</span> length = getLength(collection);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> length == <span class="hljs-string">'number'</span> &amp;&amp; length &gt;= <span class="hljs-number">0</span> &amp;&amp; length &lt;= MAX_ARRAY_INDEX;
};</code></pre>
<h2 id="articleHeader5">isElement</h2>
<p>isElement 判断是不是 DOM 元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isElement = function(obj) {
    return !!(obj &amp;&amp; obj.nodeType === 1);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">isElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> !!(obj &amp;&amp; obj.nodeType === <span class="hljs-number">1</span>);
};</code></pre>
<h2 id="articleHeader6">结语</h2>
<p>这一篇我们介绍了 jQuery 的 isPlainObject、isEmptyObject、isWindow、isArrayLike、以及 underscore 的 isElement 实现。我们可以看到，即使是 jQuery 这样优秀的库，一些方法的实现也并不是非常完美和严密的，但是最后为什么这么做，其实也是一种权衡，权衡所失与所得，正如玉伯在《从 JavaScript 数组去重谈性能优化》中讲到：</p>
<p><strong>所有这些点，都必须脚踏实地在具体应用场景下去分析、去选择，要让场景说话。</strong></p>
<h2 id="articleHeader7">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之类型判断(下)

## 原文链接
[https://segmentfault.com/a/1190000010054116](https://segmentfault.com/a/1190000010054116)


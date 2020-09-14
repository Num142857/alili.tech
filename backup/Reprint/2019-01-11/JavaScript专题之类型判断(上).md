---
title: 'JavaScript专题之类型判断(上)' 
date: 2019-01-11 2:30:07
hidden: true
slug: 9y65h18bwyn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript专题系列第四篇，讲解类型判断的各种方法，并且跟着 jQuery 写一个 type 函数。</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>类型判断在 web 开发中有非常广泛的应用，简单的有判断数字还是字符串，进阶一点的有判断数组还是对象，再进阶一点的有判断日期、正则、错误类型，再再进阶一点还有比如判断 plainObject、空对象、Window 对象等等。</p>
<p>以上都会讲，今天是上半场。</p>
<h2 id="articleHeader1">typeof</h2>
<p>我们最最常用的莫过于 typeof，注意，尽管我们会看到诸如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof('yayu')) // string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-string">'yayu'</span>)) <span class="hljs-comment">// string</span></code></pre>
<p>的写法，但是 typeof 可是一个正宗的运算符，就跟加减乘除一样！这就能解释为什么下面这种写法也是可行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof 'yayu') // string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-string">'yayu'</span>) <span class="hljs-comment">// string</span></code></pre>
<p>引用《JavaScript权威指南》中对 typeof 的介绍：</p>
<blockquote><p>typeof 是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。</p></blockquote>
<p>那我们都知道，在 ES6 前，JavaScript 共六种数据类型，分别是：</p>
<p>Undefined、Null、Boolean、Number、String、Object </p>
<p>然而当我们使用 typeof 对这些数据类型的值进行操作的时候，返回的结果却不是一一对应，分别是：</p>
<p>undefined、object、boolean、number、string、object </p>
<p>注意以上都是小写的字符串。Null 和 Object 类型都返回了 object 字符串。</p>
<p>尽管不能一一对应，但是 typeof 却能检测出函数类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {}

console.log(typeof a); // function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> a); <span class="hljs-comment">// function</span></code></pre>
<p>所以 typeof 能检测出六种类型的值，但是，除此之外 Object 下还有很多细分的类型呐，如 Array、Function、Date、RegExp、Error 等。</p>
<p>如果用 typeof 去检测这些类型，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
var error = new Error();
console.log(typeof date); // object
console.log(typeof error); // object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">var</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> date); <span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> error); <span class="hljs-comment">// object</span></code></pre>
<p>返回的都是 object 呐，这可怎么区分~ 所以有没有更好的方法呢？</p>
<h2 id="articleHeader2">Obejct.prototype.toString</h2>
<p>是的，当然有！这就是 Object.prototype.toString！</p>
<p>那 Object.protototype.toString 究竟是一个什么样的方法呢？</p>
<p>为了更加细致的讲解这个函数，让我先献上 ES5 规范地址：<a href="https://es5.github.io/#x15.2.4.2" rel="nofollow noreferrer" target="_blank">https://es5.github.io/#x15.2.4.2</a>。</p>
<p>在第 15.2.4.2 节讲的就是 Object.prototype.toString()，为了不误导大家，我先奉上英文版：</p>
<blockquote>
<p>When the toString method is called, the following steps are taken:</p>
<ol>
<li><p>If the <strong>this</strong> value is <strong>undefined</strong>, return "<strong>[object Undefined]</strong>".</p></li>
<li><p>If the <strong>this</strong> value is <strong>null</strong>, return "<strong>[object Null]</strong>".</p></li>
<li><p>Let <em>O</em> be the result of calling ToObject passing the <strong>this</strong> value as the argument.</p></li>
<li><p>Let <em>class</em> be the value of the [[Class]] internal property of <em>O</em>.</p></li>
<li><p>Return the String value that is the result of concatenating the three Strings "<strong>[object</strong> ", <em>class</em>, and "<strong>]</strong>".</p></li>
</ol>
</blockquote>
<p>凡是规范上加粗或者斜体的，在这里我也加粗或者斜体了，就是要让大家感受原汁原味的规范！</p>
<p>如果没有看懂，就不妨看看我理解的：</p>
<p>当 toString 方法被调用的时候，下面的步骤会被执行：</p>
<ol>
<li><p>如果 this 值是 undefined，就返回 [object Undefined]</p></li>
<li><p>如果 this 的值是 null，就返回 [object Null]</p></li>
<li><p>让 O 成为 ToObject(this) 的结果</p></li>
<li><p>让 class 成为 O 的内部属性 [[Class]] 的值</p></li>
<li><p>最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串</p></li>
</ol>
<p>通过规范，我们至少知道了调用 Object.prototype.toString 会返回一个由 "[object " 和 class 和 "]" 组成的字符串，而 class 是要判断的对象的内部属性。</p>
<p>让我们写个 demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-literal">undefined</span>)) <span class="hljs-comment">// [object Undefined]</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-literal">null</span>)) <span class="hljs-comment">// [object Null]</span>

<span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(date)) <span class="hljs-comment">// [object Date]</span></code></pre>
<p>由此我们可以看到这个 class 值就是识别对象类型的关键！</p>
<p>正是因为这种特性，我们可以用 Object.prototype.toString 方法识别出更多类型！</p>
<p>那到底能识别多少种类型呢？</p>
<p>至少 12 种！</p>
<p>你咋知道的？</p>
<p>我数的！</p>
<p>……</p>
<p>让我们看个 demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 以下是11种：</span>
<span class="hljs-keyword">var</span> number = <span class="hljs-number">1</span>;          <span class="hljs-comment">// [object Number]</span>
<span class="hljs-keyword">var</span> string = <span class="hljs-string">'123'</span>;      <span class="hljs-comment">// [object String]</span>
<span class="hljs-keyword">var</span> boolean = <span class="hljs-literal">true</span>;      <span class="hljs-comment">// [object Boolean]</span>
<span class="hljs-keyword">var</span> und = <span class="hljs-literal">undefined</span>;     <span class="hljs-comment">// [object Undefined]</span>
<span class="hljs-keyword">var</span> nul = <span class="hljs-literal">null</span>;          <span class="hljs-comment">// [object Null]</span>
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}         <span class="hljs-comment">// [object Object]</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];   <span class="hljs-comment">// [object Array]</span>
<span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();   <span class="hljs-comment">// [object Date]</span>
<span class="hljs-keyword">var</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(); <span class="hljs-comment">// [object Error]</span>
<span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/a/g</span>;          <span class="hljs-comment">// [object RegExp]</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{}; <span class="hljs-comment">// [object Function]</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkType</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-built_in">arguments</span>[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
</code></pre>
<p>除了以上 11 种之外，还有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-built_in">Math</span>)); <span class="hljs-comment">// [object Math]</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-built_in">JSON</span>)); <span class="hljs-comment">// [object JSON]</span></code></pre>
<p>除了以上 13 种之外，还有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-built_in">arguments</span>)); <span class="hljs-comment">// [object Arguments]</span>
}
a();</code></pre>
<p>所以我们可以识别至少 14 种类型，当然我们也可以算出来，[[class]] 属性至少有 12 个。</p>
<h2 id="articleHeader3">type API</h2>
<p>既然有了 Object.prototype.toString 这个神器！那就让我们写个 type 函数帮助我们以后识别各种类型的值吧！</p>
<p>我的设想：</p>
<p>写一个 type 函数能检测各种类型的值，如果是基本类型，就使用 typeof，引用类型就使用 toString。此外鉴于 typeof 的结果是小写，我也希望所有的结果都是小写。</p>
<p>考虑到实际情况下并不会检测 Math 和 JSON，所以去掉这两个类型的检测。</p>
<p>我们来写一版代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
var class2type = {};

// 生成class2type映射
&quot;Boolean Number String Function Array Date RegExp Object Error Null Undefined&quot;.split(&quot; &quot;).map(function(item, index) {
    class2type[&quot;[object &quot; + item + &quot;]&quot;] = item.toLowerCase();
})

function type(obj) {
    return typeof obj === &quot;object&quot; || typeof obj === &quot;function&quot; ?
        class2type[Object.prototype.toString.call(obj)] || &quot;object&quot; :
        typeof obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-keyword">var</span> class2type = {};

<span class="hljs-comment">// 生成class2type映射</span>
<span class="hljs-string">"Boolean Number String Function Array Date RegExp Object Error Null Undefined"</span>.split(<span class="hljs-string">" "</span>).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    class2type[<span class="hljs-string">"[object "</span> + item + <span class="hljs-string">"]"</span>] = item.toLowerCase();
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">type</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"function"</span> ?
        class2type[<span class="hljs-built_in">Object</span>.prototype.toString.call(obj)] || <span class="hljs-string">"object"</span> :
        <span class="hljs-keyword">typeof</span> obj;
}</code></pre>
<p>嗯，看起来很完美的样子~~ 但是注意，在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！</p>
<p>我去，竟然还有这个兼容性！有什么简单的方法可以解决吗？那我们再改写一版，绝对让你惊艳！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
var class2type = {};

// 生成class2type映射
&quot;Boolean Number String Function Array Date RegExp Object Error&quot;.split(&quot; &quot;).map(function(item, index) {
    class2type[&quot;[object &quot; + item + &quot;]&quot;] = item.toLowerCase();
})

function type(obj) {
    // 一箭双雕
    if (obj == null) {
        return obj + &quot;&quot;;
    }
    return typeof obj === &quot;object&quot; || typeof obj === &quot;function&quot; ?
        class2type[Object.prototype.toString.call(obj)] || &quot;object&quot; :
        typeof obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-keyword">var</span> class2type = {};

<span class="hljs-comment">// 生成class2type映射</span>
<span class="hljs-string">"Boolean Number String Function Array Date RegExp Object Error"</span>.split(<span class="hljs-string">" "</span>).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    class2type[<span class="hljs-string">"[object "</span> + item + <span class="hljs-string">"]"</span>] = item.toLowerCase();
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">type</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// 一箭双雕</span>
    <span class="hljs-keyword">if</span> (obj == <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> obj + <span class="hljs-string">""</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"function"</span> ?
        class2type[<span class="hljs-built_in">Object</span>.prototype.toString.call(obj)] || <span class="hljs-string">"object"</span> :
        <span class="hljs-keyword">typeof</span> obj;
}</code></pre>
<h2 id="articleHeader4">isFunction</h2>
<p>有了 type 函数后，我们可以对常用的判断直接封装，比如 isFunction:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isFunction(obj) {
    return type(obj) === &quot;function&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> type(obj) === <span class="hljs-string">"function"</span>;
}</code></pre>
<h2 id="articleHeader5">数组</h2>
<p>jQuery 判断数组类型，旧版本是通过判断 Array.isArray 方法是否存在，如果存在就使用该方法，不存在就使用 type 函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isArray = Array.isArray || function( obj ) {
    return type(obj) === &quot;array&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> isArray = <span class="hljs-built_in">Array</span>.isArray || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> obj </span>) </span>{
    <span class="hljs-keyword">return</span> type(obj) === <span class="hljs-string">"array"</span>;
}</code></pre>
<p>但是在 jQuery v3.0 中已经完全采用了 Array.isArray。</p>
<h2 id="articleHeader6">结语</h2>
<p>到此，类型判断的上篇就结束了，我们已经可以判断日期、正则、错误类型啦，但是还有更复杂的判断比如 plainObject、空对象、Window对象、类数组对象等，路漫漫其修远兮，吾将上下而求索。</p>
<p>哦， 对了，这个 type 函数抄的 jQuery，<a href="https://github.com/jquery/jquery/blob/ac9e3016645078e1e42120822cfb2076151c8cbe/src/core.js#L269" rel="nofollow noreferrer" target="_blank">点击查看 type 源码</a>。</p>
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
JavaScript专题之类型判断(上)

## 原文链接
[https://segmentfault.com/a/1190000009943534](https://segmentfault.com/a/1190000009943534)


---
title: 'JavaScript检测原始值、引用值、属性' 
date: 2019-02-08 2:30:41
hidden: true
slug: g41h7crm6v5
categories: [reprint]
---

{{< raw >}}

                    
<p>上周写过一篇读书笔记<a href="http://shijiajie.com/2016/06/12/javascript-maintainable-javascript-practice/" rel="nofollow noreferrer" target="_blank">《编写可维护的JavaScript》之编程实践</a>，其中 <strong>第8章 避免『空比较』</strong>是博主在工作中遇坑较多的雷区，所以特此把该章节重新整理分享，希望大家不再坑队友(＞﹏＜)。</p>
<p>在 JavaScript 中，我们常常会看到这样的代码：变量与<code>null</code>的比较（这种用法很有问题），用来判断变量是否被赋予了一个合理的值。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Controller = {
    process: function(items) {
        if (items !== null) { // 不好的写法
            items.sort();
            items.forEach(function(item) {
                // 执行一些逻辑
            });
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Controller = {
    <span class="hljs-attr">process</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">items</span>) </span>{
        <span class="hljs-keyword">if</span> (items !== <span class="hljs-literal">null</span>) { <span class="hljs-comment">// 不好的写法</span>
            items.sort();
            items.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
                <span class="hljs-comment">// 执行一些逻辑</span>
            });
        }
    }
}</code></pre>
<p>在这段代码中，<code>process()</code>方法显然希望<code>items</code>是一个数组，因为我们看到<code>items</code>拥有<code>sort()</code>和<code>forEach()</code>。这段代码的意图非常明显：如果参数<code>items</code>不是一个组数，则停止接下来的操作。这种写法的问题在于，和<code>null</code>的比较并不能真正避免错误的发生。<code>items</code>的值可以是1，也可以是是字符串，甚至可以是任意对象。这些值都和<code>null</code>不相等，进而会导致<code>process()</code>方法一旦执行到<code>sort()</code>时就会出错。</p>
<p>仅仅和<code>null</code>比较并不能提供足够的信息来判断后续代码的执行是否真的安全。好在 JavaScript 为我们提供了很多种方法来检测变量的真实值。</p>
<h2 id="articleHeader0">检测原始值</h2>
<p>在 JavaScript 中有5种原始类型（也称为简单数据类型）： <code>String</code>、<code>Number</code>、<code>Boolean</code>、<code>Undefined</code>和<code>Null</code>。如果你希望一个值是<code>String</code>、<code>Number</code>、<code>Boolean</code>或<code>Undefined</code>，最佳选择是使用<code>typeof</code>运算符，它会返回一个表示类型的字符串。</p>
<ul>
<li><p>对于字符串，<code>typeof</code>返回<code>"string"</code>。</p></li>
<li><p>对于数字，<code>typeof</code>返回<code>"number"</code>。</p></li>
<li><p>对于布尔值，<code>typeof</code>返回<code>"boolean"</code>。</p></li>
<li><p>对于undefined，<code>typeof</code>返回<code>"undefined"</code>。</p></li>
</ul>
<p><code>typeof</code>的基本语法是：<code>typeof variable</code>，你还可以这样用：<code>typeof(variable)</code>，尽管这是合法的 JavaScript 语法，这种用法让<code>typeof</code>看起来像一个函数而非运算符。鉴于此，我们更推荐无括号的写法。</p>
<p>使用<code>typeof</code>来检测这4种原始类型是非常安全的做法。来看下面这些例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检测&quot;String&quot;
if (typeof name === &quot;string&quot;) {
    anotherName = name.substring(3);
}

// 检测&quot;Number&quot;
if (typeof count === &quot;number&quot;) {
    updateCount(count);
}

// 检测&quot;Boolean&quot;
if (typeof found === &quot;boolean&quot; &amp;&amp; found) {
    message(&quot;Found!&quot;);
}

// 检测&quot;Undefined&quot;
if (typeof MyApp === &quot;undefined&quot;) {
    MyApp = {
        // 其他代码
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 检测"String"</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> name === <span class="hljs-string">"string"</span>) {
    anotherName = name.substring(<span class="hljs-number">3</span>);
}

<span class="hljs-comment">// 检测"Number"</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> count === <span class="hljs-string">"number"</span>) {
    updateCount(count);
}

<span class="hljs-comment">// 检测"Boolean"</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> found === <span class="hljs-string">"boolean"</span> &amp;&amp; found) {
    message(<span class="hljs-string">"Found!"</span>);
}

<span class="hljs-comment">// 检测"Undefined"</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> MyApp === <span class="hljs-string">"undefined"</span>) {
    MyApp = {
        <span class="hljs-comment">// 其他代码</span>
    };
}</code></pre>
<p><code>typeof</code>运算符的独特之处在于，将其用于一个未声明的变量也不会报错。未定义的变量和值为<code>undefined</code>的变量通过<code>typeof</code>都将返回<code>"undefined"</code>。</p>
<p>最后一个原始类型<code>null</code>，通过<code>typeof</code>将返回<code>"object"</code>，这看上去很怪异，被认为是标准规范的严重 bug，因此在编程时要 <strong>杜绝使用<code>typeof</code>来检测<code>null</code>的类型</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof null);   // &quot;object&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>);   <span class="hljs-comment">// "object"</span></code></pre>
<p>简单地和<code>null</code>进行比较通常不会包含足够的信息以判断值的类型是否合法，所以<code>null</code>一般不应用于检测语句。</p>
<p>但有一个例外，如果所期望的值真的是<code>null</code>，则可以直接和<code>null</code>进行比较。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果你需要检测 null，则使用这种方法
var element = document.getElementById(&quot;my-div&quot;);
if (element !== null) {
    element.className = &quot;found&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 如果你需要检测 null，则使用这种方法</span>
<span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"my-div"</span>);
<span class="hljs-keyword">if</span> (element !== <span class="hljs-literal">null</span>) {
    element.className = <span class="hljs-string">"found"</span>;
}</code></pre>
<p>如果 DOM 元素不存在，则通过<code>document.getElementById()</code>得到的值为<code>null</code>。这个方法要么返回一个节点，要么返回<code>null</code>。由于这时<code>null</code>是可预见的一种输出，则可以用恒等运算符<code>===</code>或非恒等运算符<code>!==</code>来检测返回结果。</p>
<blockquote><p><code>typeof</code>运算符的返回值除了上述提到的<code>string</code>、<code>number</code>、<code>boolean</code>、<code>undefined</code>和<code>object</code>之外，还有<code>function</code>。从技术的角度来讲，函数在 JavaScript 中也是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过<code>typeof</code>运算符来区分函数和其他对象是有必要的。这一特性将在后面 <strong>检测函数</strong> 中用到。</p></blockquote>
<h2 id="articleHeader1">检测引用值</h2>
<p>在 JavaScript 中除了原始值之外的都是引用值（也称为对象），常用的引用类型有：<code>Object</code>、<code>Array</code>、<code>Date</code>和<code>RegExp</code>，这些引用类型都是 JavaScript 的内置对象。<code>typeof</code>运算符在判断这些引用类型时全都返回<code>"object"</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof {});             // &quot;object&quot;
console.log(typeof []);             // &quot;object&quot;
console.log(typeof new Date());     // &quot;object&quot;
console.log(typeof new RegExp());   // &quot;object&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> {});             <span class="hljs-comment">// "object"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> []);             <span class="hljs-comment">// "object"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());     <span class="hljs-comment">// "object"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>());   <span class="hljs-comment">// "object"</span></code></pre>
<p>检测某个引用值类型的最好方法是使用<code>instanceof</code>运算符，<code>instanceof</code>的基本语法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="value instanceof constructor

// 检测日期
if (value instanceof Date) {
    console.log(value.getFullYear);
}

// 检测 Error
if (value instanceof Error) {
    throw value;
}

// 检测正则表达式
if (value instanceof RegExp) {
    if (value.test(anotherValue)) {
        console.log(&quot;Matches&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">value <span class="hljs-keyword">instanceof</span> <span class="hljs-keyword">constructor</span>

// 检测日期
if (value instanceof Date) {
    <span class="hljs-built_in">console</span>.log(value.getFullYear);
}

<span class="hljs-comment">// 检测 Error</span>
<span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Error</span>) {
    <span class="hljs-keyword">throw</span> value;
}

<span class="hljs-comment">// 检测正则表达式</span>
<span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">RegExp</span>) {
    <span class="hljs-keyword">if</span> (value.test(anotherValue)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Matches"</span>);
    }
}</code></pre>
<p><code>instanceof</code>的一个有意思的特性是它不仅检测构造这个对象的构造器，还检测原型链。原型链包含了很多信息，包括定义对象所采用的继承模式。比如，默认情况下，每个对象都继承自<code>Object</code>，因此每个对象的<code>value instanceof Object</code>都会返回<code>ture</code>。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var now = new Date();
console.log(now instanceof Object); // ture
console.log(now instanceof Date);   // ture" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(now <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>); <span class="hljs-comment">// ture</span>
<span class="hljs-built_in">console</span>.log(now <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>);   <span class="hljs-comment">// ture</span></code></pre>
<p><code>instanceof</code>运算符也可以检测自定义的类型，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
    this.name = name;
}
var me = new Person(&quot;Nicholas&quot;);
console.log(me instanceof Object);  // ture
console.log(me instanceof Person);  // ture" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
}
<span class="hljs-keyword">var</span> me = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"Nicholas"</span>);
<span class="hljs-built_in">console</span>.log(me <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);  <span class="hljs-comment">// ture</span>
<span class="hljs-built_in">console</span>.log(me <span class="hljs-keyword">instanceof</span> Person);  <span class="hljs-comment">// ture</span></code></pre>
<p>这段示例代码中创建了<code>Person</code>类型。变量<code>me</code>是<code>Person</code>的实例，因此<code>me instanceof Person</code>是<code>true</code>。上文也提到，所有的对象都被认为是<code>Object</code>的实例，因此<code>me instanceof Object</code>也是<code>ture</code>。</p>
<p>在 JavaScript 中检测 <strong>内置类型</strong> 和 <strong>自定义类型</strong> 时，最好的做法就是使用<code>instanceof</code>运算符，这也是唯一的方法。</p>
<p>但有一个严重的限制，假设两个浏览器帧（frame）里都有构造函数<code>Person</code>，帧A中的<code>Person</code>实例<code>frameAPersonInstance</code>传入到帧B中，则会有如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(frameAPersonInstance instanceof frameAPerson)    // ture
console.log(frameAPersonInstance instanceof frameBPerson)    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(frameAPersonInstance <span class="hljs-keyword">instanceof</span> frameAPerson)    <span class="hljs-comment">// ture</span>
<span class="hljs-built_in">console</span>.log(frameAPersonInstance <span class="hljs-keyword">instanceof</span> frameBPerson)    <span class="hljs-comment">// false</span></code></pre>
<p>尽管两个<code>Person</code>的定义是完全一样的，但在不同帧（frame）里，他们被认为是不同类型。有两个非常重要的内置类型也有这个问题：<code>Array</code>和<code>Function</code>，所以检测它们一般不使用<code>instanceof</code>。</p>
<h3 id="articleHeader2">检测函数</h3>
<p>从技术上讲，JavaScript 中的函数是引用类型，同样存在<code>Function</code>构造函数，每个函数都是其实例，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunc() {}

// 不好的写法
console.log(myFunc instanceof Function); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunc</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// 不好的写法</span>
<span class="hljs-built_in">console</span>.log(myFunc <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>); <span class="hljs-comment">// true</span></code></pre>
<p>然而，这个方法亦不能跨帧（frame）使用，因为每个帧都有各自的<code>Function</code>构造函数，好在<code>typeof</code>运算符也是可以用于函数的，返回<code>"function"</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunc() {}

// 好的写法
console.log(typeof myFunc === &quot;function&quot;); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunc</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// 好的写法</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> myFunc === <span class="hljs-string">"function"</span>); <span class="hljs-comment">// true</span></code></pre>
<p>检测函数最好的方法是使用<code>typeof</code>，因为他可以跨帧（frame）使用。</p>
<p>用<code>typeof</code>来检测函数有一个限制。在 IE 8 和更早版本的 IE 浏览器中，使用<code>typeof</code>来检测 DOM 节点中的函数都返回<code>"object"</code>而不是<code>"function"</code>。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// IE8 及更早版本的IE
console.log(typeof document.createElement);         // &quot;object&quot;
console.log(typeof document.getElementById);        // &quot;object&quot;
console.log(typeof document.getElementByTagName);   // &quot;object&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// IE8 及更早版本的IE</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">document</span>.createElement);         <span class="hljs-comment">// "object"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">document</span>.getElementById);        <span class="hljs-comment">// "object"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">document</span>.getElementByTagName);   <span class="hljs-comment">// "object"</span></code></pre>
<p>之所以出现这种怪异的现象是因为浏览器对 DOM 的实现有差异。简言之，这些早版本的 IE 并没有将 DOM 实现为内置的 JavaScript 方法，导致内置<code>typeof</code>运算符将这些函数识别为对象。因为 DOM 是有明确定义的，了解到对象成员如果存在则意味着它是一个方法，开发者往往通过<code>in</code>运算符来检测 DOM 的方法，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检测 DOM 方法
if (&quot;querySelectorAll&quot; in document) {
    var images = document.querySelectorAll(&quot;img&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 检测 DOM 方法</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">"querySelectorAll"</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span>) {
    <span class="hljs-keyword">var</span> images = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">"img"</span>);
}</code></pre>
<p>这段代码检查<code>querySelectorAll</code>是否定义在<code>document</code>中，如果是，则使用这个方法。尽管不是最理想的方法，如果想在 IE 8 及更早浏览器中检测 DOM 方法是否存在，这是最安全的做法。在其他所有的情形中，<code>typeof</code>运算符是检测 JavaScript 函数的最佳选择。</p>
<h3 id="articleHeader3">检测数组</h3>
<p>JavaScript 中最古老的跨域问题之一就是在帧（frame）之间来回传递数组。开发者很快发现<code>instanceof Array</code>在此场景中不能返回正确的结果。正如上文提到的，每个帧都有各自的<code>Array</code>构造函数，因此一个帧中的实例在另外一个帧里不会被识别。</p>
<p>关于如何在 JavaScript 中检测数组类型已经有狠多研究了，最终 Kangax 给出了一种优雅的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(value) {
    return Object.prototype.toString.call(value) === &quot;[object Array]&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">"[object Array]"</span>;
}</code></pre>
<p>Kangax 发现调用某个值的内置<code>toString()</code>方法在所有浏览器中都会返回标准的字符串结果。对于数组来说，返回的字符串为<code>"[object Array]"</code>，也不用考虑数组实例实在哪个帧（frame）中被构造出来的。这种方法在识别内置对象时往往十分有用，但对于自定义对象请不要用这种方法。</p>
<p>ECMAScript5 将<code>Array.isArray()</code>正式引入 JavaScript。唯一的目的就是准确地检测一个值是否为数组。同 Kangax 的函数一样，<code>Array.isArray()</code>也可以检测跨帧（frame）传递的值，因此很多 JavaScript 类库目前都类似地实现了这个方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(value) {
    if (typeof Array.isArray === &quot;function&quot;) {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === &quot;[object Array]&quot;;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Array</span>.isArray === <span class="hljs-string">"function"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.isArray(value);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">"[object Array]"</span>;
    }
}</code></pre>
<blockquote><p>IE 9+、FireFox 4+、Safari 5+、Opera 10.5+、Chrome 都实现了<code>Array.isArray()</code>方法。</p></blockquote>
<h2 id="articleHeader4">检测属性</h2>
<p>另外一种用到<code>null</code>（以及<code>undefined</code>）的场景是当检测一个属性是否在对象中存在时，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不好的写法：检测假值
if (object[propertyName]) {
    // 一些代码
}

// 不好的写法：和null相比较
if (object[propertyName] != null) {
    // 一些代码
}

// 不好的写法：和undefined相比较
if (object[propertyName] != undefined) {
    // 一些代码
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 不好的写法：检测假值</span>
<span class="hljs-keyword">if</span> (object[propertyName]) {
    <span class="hljs-comment">// 一些代码</span>
}

<span class="hljs-comment">// 不好的写法：和null相比较</span>
<span class="hljs-keyword">if</span> (object[propertyName] != <span class="hljs-literal">null</span>) {
    <span class="hljs-comment">// 一些代码</span>
}

<span class="hljs-comment">// 不好的写法：和undefined相比较</span>
<span class="hljs-keyword">if</span> (object[propertyName] != <span class="hljs-literal">undefined</span>) {
    <span class="hljs-comment">// 一些代码</span>
}</code></pre>
<p>上面这段代码里的每个判断，实际上是通过给定的名字来检查属性的值，而并非判断给定的名字所指的属性是否存在。在第一个判断中，当属性值为假值时结果会出错，比如：<code>0</code>、<code>""（空字符串）</code>、<code>false</code>、<code>null</code>和<code>undefined</code>，毕竟这些都是属性的合法值。</p>
<p>判断属性是否存在的最好的方法是使用<code>in</code>运算符。<code>in</code>运算符仅仅会简单地判断属性是否存在，而不去读属性的值，如果实例对象的属性存在、或者继承自对象的原型，<code>in</code>运算符都会返回<code>true</code>。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var object = {
    count: 0,
    related: null
};

// 好的写法
if (&quot;count&quot; in object) {
    // 这里的代码会执行
}

// 不好的写法：检测假值
if (object[&quot;count&quot;]) {
    // 这里的代码不会执行
}

// 好的写法
if (&quot;related&quot; in object) {
    // 这里的代码会执行
}

// 不好的写法，检测是否为
if (object[&quot;related&quot;] != null) {
    // 这里的代码不会执行
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> object = {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">related</span>: <span class="hljs-literal">null</span>
};

<span class="hljs-comment">// 好的写法</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">"count"</span> <span class="hljs-keyword">in</span> object) {
    <span class="hljs-comment">// 这里的代码会执行</span>
}

<span class="hljs-comment">// 不好的写法：检测假值</span>
<span class="hljs-keyword">if</span> (object[<span class="hljs-string">"count"</span>]) {
    <span class="hljs-comment">// 这里的代码不会执行</span>
}

<span class="hljs-comment">// 好的写法</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">"related"</span> <span class="hljs-keyword">in</span> object) {
    <span class="hljs-comment">// 这里的代码会执行</span>
}

<span class="hljs-comment">// 不好的写法，检测是否为</span>
<span class="hljs-keyword">if</span> (object[<span class="hljs-string">"related"</span>] != <span class="hljs-literal">null</span>) {
    <span class="hljs-comment">// 这里的代码不会执行</span>
}</code></pre>
<p>如果你只想检查实例对象的某个属性是否存在，则使用<code>hasOwnProperty()</code>方法。所有继承自<code>Object</code>的 JavaScript 对象都有这个方法，如果实例中存在这个属性则返回<code>true</code>（如果这个属性只存在于原型里，则返回<code>false</code>）。需要注意的是，在 IE 8 以及更早版本的 IE 中，DOM 对象并非继承自 Object，因此也不包含这个方法。也就是说，你在调用 DOM 对象的<code>hasOwnProperty()</code>方法之前应当先检测其是否存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对于所有非 DOM 对象来说，这是好的写法
if (object.hasOwnProperty(&quot;related&quot;)) {
    // 执行这里的代码会
}

// 如果你不确定是否为 DOM 对象，则这样来写
if (&quot;hasOwnProperty&quot; in object &amp;&amp; object.hasOwnProperty(&quot;related&quot;)) {
    // 执行这里的代码会
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 对于所有非 DOM 对象来说，这是好的写法</span>
<span class="hljs-keyword">if</span> (object.hasOwnProperty(<span class="hljs-string">"related"</span>)) {
    <span class="hljs-comment">// 执行这里的代码会</span>
}

<span class="hljs-comment">// 如果你不确定是否为 DOM 对象，则这样来写</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">"hasOwnProperty"</span> <span class="hljs-keyword">in</span> object &amp;&amp; object.hasOwnProperty(<span class="hljs-string">"related"</span>)) {
    <span class="hljs-comment">// 执行这里的代码会</span>
}</code></pre>
<p>因为存在 IE 8 以及更早版本的 IE 的情形，在判断实例对象的属性是否存在时，我更倾向于使用<code>in</code>运算符，只有在需要判断实例属性时才会用到<code>hasOwnProperty()</code>。</p>
<blockquote><p>不管你什么时候需要检测属性的存在性，请使用<code>in</code>运算符或者<code>hasOwnProperty()</code>。这样做可以避免很多 bug。</p></blockquote>
<h2 id="articleHeader5">扩展阅读</h2>
<ul>
<li><p><a href="https://book.douban.com/subject/21792530/" rel="nofollow noreferrer" target="_blank">《编写可维护的JavaScript》</a></p></li>
<li><p><a href="https://book.douban.com/subject/10549733/" rel="nofollow noreferrer" target="_blank">《JavaScript权威指南(第6版)》</a></p></li>
<li><p><a href="https://book.douban.com/subject/10546125/" rel="nofollow noreferrer" target="_blank">《JavaScript高级程序设计(第3版)》</a></p></li>
</ul>
<p>欢迎来到 <a href="http://shijiajie.com" rel="nofollow noreferrer" target="_blank">石佳劼的博客</a>，如有疑问，请在<a href="http://shijiajie.com/2016/06/20/javascript-maintainable-javascript-validate1/#ds-thread" rel="nofollow noreferrer" target="_blank">「原文」评论区</a> 留言，我会尽量为您解答。</p>
<hr>
<p><span class="img-wrap"><img data-src="http://7xkhp9.com1.z0.glb.clouddn.com/blog/other/blog_statement_20160618_01.png?imageView2/2/w/650/interlace/1/q/100" src="https://static.alili.techhttp://7xkhp9.com1.z0.glb.clouddn.com/blog/other/blog_statement_20160618_01.png?imageView2/2/w/650/interlace/1/q/100" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript检测原始值、引用值、属性

## 原文链接
[https://segmentfault.com/a/1190000005755082](https://segmentfault.com/a/1190000005755082)


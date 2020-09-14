---
title: '也谈JavaScript数组去重' 
date: 2019-01-28 2:30:09
hidden: true
slug: vda4333rfwn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文同时发布于个人博客<a href="https://www.toobug.net/article/array_unique_in_javascript.html" rel="nofollow noreferrer" target="_blank">https://www.toobug.net/articl...</a></p></blockquote>
<p>JavaScript的数组去重是一个老生常谈的话题了。随便搜一搜就能找到非常多不同版本的解法。</p>
<p>昨天在微博上看到一篇文章，也写数组去重，主要推崇的方法是将利用数组元素当作对象key来去重。我在微博转发了“用对象key去重不是个好办法…”然后作者问什么才是推荐的方法。</p>
<p>细想一下，这样一个看似简单的需求，如果要做到完备，涉及的知识和需要注意的地方着实不少，于是诞生此文。</p>
<h2 id="articleHeader0">定义重复（相等）</h2>
<p>要去重，首先得定义，什么叫作“重复”，即具体到代码而言，两个数据在什么情况下可以算是相等的。这并不是一个很容易的问题。</p>
<p>对于原始值而言，我们很容易想到<code>1</code>和<code>1</code>是相等的，<code>'1'</code>和<code>'1'</code>也是相等的。那么，<code>1</code>和<code>'1'</code>是相等的么？</p>
<p>如果这个问题还好说，只要回答“是”或者“不是”即可。那么下面这些情况就没那么容易了。</p>
<h3 id="articleHeader1">NaN</h3>
<p>初看<code>NaN</code>时，很容易把它当成和<code>null</code>、<code>undefined</code>一样的独立数据类型。但其实，它是数字类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// number
console.log(typeof NaN);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// number</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">NaN</span>);</code></pre>
<p>根据规范，比较运算中只要有一个值为NaN，则比较结果为<code>false</code>，所以会有下面这些看起来略蛋疼的结论：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全都是false
0 < NaN;
0 > NaN;
0 == NaN;
0 === NaN;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 全都是false</span>
<span class="hljs-number">0</span> &lt; <span class="hljs-literal">NaN</span>;
<span class="hljs-number">0</span> &gt; <span class="hljs-literal">NaN</span>;
<span class="hljs-number">0</span> == <span class="hljs-literal">NaN</span>;
<span class="hljs-number">0</span> === <span class="hljs-literal">NaN</span>;</code></pre>
<p>以最后一个表达式<code>0 === NaN</code>为例，在规范中有明确规定（<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-strict-equality-comparison" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a>）：</p>
<blockquote><ol><li>
<p>If Type(x) is Number, then</p>
<ol>
<li><p>If x is NaN, return false.</p></li>
<li><p>If y is NaN, return false.</p></li>
<li><p>If x is the same Number value as y, return true.</p></li>
<li><p>If x is +0 and y is −0, return true.</p></li>
<li><p>If x is −0 and y is +0, return true.</p></li>
<li><p>Return false.</p></li>
</ol>
</li></ol></blockquote>
<p>这意味着任何涉及到<code>NaN</code>的情况都不能简单地使用比较运算来判定是否相等。比较科学的方法只能是使用<code>isNaN()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = NaN;
var b = NaN;

// true
console.log(isNaN(a) &amp;&amp; isNaN(b));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-literal">NaN</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-literal">NaN</span>;

<span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">isNaN</span>(a) &amp;&amp; <span class="hljs-built_in">isNaN</span>(b));</code></pre>
<h3 id="articleHeader2">原始值和包装对象</h3>
<p>看完<code>NaN</code>是不是头都大了。好了，我们来轻松一下，看一看原始值和包装对象这一对冤家。</p>
<p>如果你研究过<code>'a'.trim()</code>这样的代码的话，不知道是否产生过这样的疑问：<code>'a'</code>明明是一个原始值（字符串），它为什么可以直接调用<code>.trim()</code>方法呢？当然，很可能你已经知道答案：因为JS在执行这样的代码的时候会对原始值做一次包装，让<code>'a'</code>变成一个字符串对象，然后执行这个对象的方法，执行完之后再把这个包装对象脱掉。可以用下面的代码来理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 'a'.trim();
var tmp = new String('a');
tmp.trim();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 'a'.trim();</span>
<span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'a'</span>);
tmp.trim();</code></pre>
<p>这段代码只是辅助我们理解的。但包装对象这个概念在JS中却是真实存在的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new String('a');
var b = 'b';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'a'</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'b'</span>;</code></pre>
<p><code>a</code>即是一个包装对象，它和<code>b</code>一样，代表一个字符串。它们都可以使用字符串的各种方法（比如<code>trim()</code>），也可以参与字符串运算（<code>+</code>号连接等）。</p>
<p>但他们有一个关键的区别：类型不同！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof a; // object
typeof b; // string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">typeof</span> a; <span class="hljs-comment">// object</span>
<span class="hljs-keyword">typeof</span> b; <span class="hljs-comment">// string</span></code></pre>
<p>在做字符串比较的时候，类型的不同会导致结果有一些出乎意料：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a1 = 'a';
var a2 = new String('a');
var a3 = new String('a');

a1 == a2; // true
a1 == a3; // true
a2 == a3; // false
a1 === a2; // false
a1 === a3; // false
a2 === a3; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a1 = <span class="hljs-string">'a'</span>;
<span class="hljs-keyword">var</span> a2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'a'</span>);
<span class="hljs-keyword">var</span> a3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'a'</span>);

a1 == a2; <span class="hljs-comment">// true</span>
a1 == a3; <span class="hljs-comment">// true</span>
a2 == a3; <span class="hljs-comment">// false</span>
a1 === a2; <span class="hljs-comment">// false</span>
a1 === a3; <span class="hljs-comment">// false</span>
a2 === a3; <span class="hljs-comment">// false</span></code></pre>
<p>同样是表示字符串<code>a</code>的变量，在使用严格比较时竟然不是相等的，在直觉上这是一件比较难接受的事情，在各种开发场景下，也非常容易忽略这些细节。</p>
<h3 id="articleHeader3">对象和对象</h3>
<p>在涉及比较的时候，还会碰到对象。具体而言，大致可以分为三种情况：纯对象、实例对象、其它类型的对象。</p>
<p><strong>纯对象</strong></p>
<blockquote><p>纯对象（plain object）具体指什么并不是非常明确，为减少不必要的争议，下文中使用纯对象指代由字面量生成的、成员中不含函数和日期、正则表达式等类型的对象。</p></blockquote>
<p>如果直接拿两个对象进行比较，不管是<code>==</code>还是<code>===</code>，毫无疑问都是不相等的。但是在实际使用时，这样的规则是否一定满足我们的需求？举个例子，我们的应用中有两个配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原来有两个属性
// var prop1 = 1;
// var prop2 = 2;

// 重构代码时两个属性被放到同一个对象中

var config = {
    prop1: 1,
    prop2: 2
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 原来有两个属性</span>
<span class="hljs-comment">// var prop1 = 1;</span>
<span class="hljs-comment">// var prop2 = 2;</span>

<span class="hljs-comment">// 重构代码时两个属性被放到同一个对象中</span>

<span class="hljs-keyword">var</span> config = {
    <span class="hljs-attr">prop1</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">prop2</span>: <span class="hljs-number">2</span>
};</code></pre>
<p>假设在某些场景下，我们需要比较两次运行的配置项是否相同。在重构前，我们分别比较两次运行的<code>prop1</code>和<code>prop2</code>即可。而在重构后，我们可能需要比较<code>config</code>对象所代表的配置项是否一致。在这样的场景下，直接用<code>==</code>或者<code>===</code>来比较对象，得到的并不是我们期望的结果。</p>
<p>在这样的场景下，我们可能需要自定义一些方法来处理对象的比较。常见的可能是通过<code>JSON.stringify()</code>对对象进行序列化之后再比较字符串，当然这个过程并非完全可靠，只是一个思路。</p>
<blockquote><p>如果你觉得这个场景是无中生有的话，可以再回想一下断言库，同样是基于对象成员，判断结果是否和预期相符。</p></blockquote>
<p><strong>实例对象</strong></p>
<p>实例对象主要指通过构造函数（类）生成的对象。这样的对象和纯对象一样，直接比较都是不等的，但也会碰到需要判断是否是同一对象的情况。一般而言，因为这种对象有比较复杂的内部结构（甚至有一部分数据在原型上），无法直接从外部比较是否相等。比较靠谱的判断方法是由构造函数（类）来提供静态方法或者实例方法来判断是否相等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = Klass();
var b = Klass();

Klass.isEqual(a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = Klass();
<span class="hljs-keyword">var</span> b = Klass();

Klass.isEqual(a, b);</code></pre>
<p><strong>其它对象</strong></p>
<p>其它对象主要指数组、日期、正则表达式等这类在<code>Object</code>基础上派生出来的对象。这类对象各有各的特殊性，一般需要根据场景来构造判断方法，决定两个对象是否相等。</p>
<p>比如，日期对象，可能需要通过<code>Date.prototype.getTime()</code>方法获取时间戳来判断是否表示同一时刻。正则表达式可能需要通过<code>toString()</code>方法获取到原始字面量来判断是否是相同的正则表达式。</p>
<h3 id="articleHeader4">==和===</h3>
<p>在一些文章中，看到某一些数组去重的方法，在判断元素是否相等时，使用的是<code>==</code>比较运算符。众所周知，这个运算符在比较前会先查看元素类型，当类型不一致时会做隐式类型转换。这其实是一种非常不严谨的做法。因为无法区分在做隐匿类型转换后值一样的元素，例如<code>0</code>、<code>''</code>、<code>false</code>、<code>null</code>、<code>undefined</code>等。</p>
<p>同时，还有可能出现一些只能黑人问号的结果，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[] == ![]; //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[] == ![]; <span class="hljs-comment">//true</span></code></pre>
<h3 id="articleHeader5">Array.prototype.indexOf()</h3>
<p>在一些版本的去重中，用到了<code>Array.prototype.indexOf()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    return arr.filter(function(item, index){
        // indexOf返回第一个索引值，
        // 如果当前索引不是第一个索引，说明是重复值
        return arr.indexOf(item) === index;
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>)</span>{
        <span class="hljs-comment">// indexOf返回第一个索引值，</span>
        <span class="hljs-comment">// 如果当前索引不是第一个索引，说明是重复值</span>
        <span class="hljs-keyword">return</span> arr.indexOf(item) === index;
    });
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    arr.forEach(function(item){
        if(ret.indexOf(item) === -1){
            ret.push(item);
        }
    });
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
        <span class="hljs-keyword">if</span>(ret.indexOf(item) === <span class="hljs-number">-1</span>){
            ret.push(item);
        }
    });
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>既然<code>==</code>和<code>===</code>在元素相等的比较中是有巨大差别的，那么<code>indexOf</code>的情况又如何呢？大部分的文章都没有提及这点，于是只好求助规范。通过规范（<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.indexof" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a>），我们知道了<code>indexOf()</code>使用的是严格比较，也就是<code>===</code>。</p>
<blockquote><p>再次强调：按照前文所述，<code>===</code>不能处理<code>NaN</code>的相等性判断。</p></blockquote>
<h3 id="articleHeader6">Array.prototype.includes()</h3>
<p><code>Array.prototype.includes()</code>是ES2016中新增的方法，用于判断数组中是否包含某个元素，所以上面使用<code>indexOf()</code>方法的第二个版本可以改写成如下版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    arr.forEach(function(item){
        if(!ret.includes(item)){
            ret.push(item);
        }
    });
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
        <span class="hljs-keyword">if</span>(!ret.includes(item)){
            ret.push(item);
        }
    });
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>那么，你猜猜，<code>includes()</code>又是用什么方法来比较的呢？如果想当然的话，会觉得肯定跟<code>indexOf()</code>一样喽。但是，程序员的世界里最怕想当然。翻一翻规范，发现它其实是使用的另一种比较方法，叫作“SameValueZero”比较（<a href="https://tc39.github.io/ecma262/2016/#sec-samevaluezero" rel="nofollow noreferrer" target="_blank">https://tc39.github.io/ecma26...</a>）。</p>
<blockquote><ol>
<li><p>If Type(x) is different from Type(y), return false.</p></li>
<li>
<p>If Type(x) is Number, then</p>
<ol>
<li><p>If x is NaN and y is NaN, return true.</p></li>
<li><p>If x is +0 and y is -0, return true.</p></li>
<li><p>If x is -0 and y is +0, return true.</p></li>
<li><p>If x is the same Number value as y, return true.</p></li>
<li><p>Return false.</p></li>
</ol>
</li>
<li><p>Return SameValueNonNumber(x, y).</p></li>
</ol></blockquote>
<p>注意<code>2.a</code>，如果<code>x</code>和<code>y</code>都是<code>NaN</code>，则返回<code>true</code>！也就是<code>includes()</code>是可以正确判断是否包含了<code>NaN</code>的。我们写一段代码验证一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1
arr.includes(NaN); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-literal">NaN</span>];
arr.indexOf(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// -1</span>
arr.includes(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span></code></pre>
<p>可以看到<code>indexOf()</code>和<code>includes()</code>对待<code>NaN</code>的行为是完全不一样的。</p>
<h2 id="articleHeader7">一些方案</h2>
<p>从上面的一大段文字中，我们可以看到，要判断两个元素是否相等（重复）并不是一件简单的事情。在了解了这个背景后，我们来看一些前面没有涉及到的去重方案。</p>
<h3 id="articleHeader8">遍历</h3>
<p>双重遍历是最容易想到的去重方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    var len = arr.length;
    var isRepeat;
    for(var i=0; i<len; i++) {
        isRepeat = false;
        for(var j=i+1; j<len; j++) {
            if(arr[i] === arr[j]){
                isRepeat = true;
                break;
            }
        }
        if(!isRepeat){
            ret.push(arr[i]);
        }
    }
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> isRepeat;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++) {
        isRepeat = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=i+<span class="hljs-number">1</span>; j&lt;len; j++) {
            <span class="hljs-keyword">if</span>(arr[i] === arr[j]){
                isRepeat = <span class="hljs-literal">true</span>;
                <span class="hljs-keyword">break</span>;
            }
        }
        <span class="hljs-keyword">if</span>(!isRepeat){
            ret.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>双重遍历还有一个优化版本，但是原理和复杂度几乎完全一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    var len = arr.length;
    for(var i=0; i<len; i++){
        for(var j=i+1; j<len; j++){
            if(arr[i] === arr[j]){
                j = ++i;
            }
        }
        ret.push(arr[i]);
    }
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=i+<span class="hljs-number">1</span>; j&lt;len; j++){
            <span class="hljs-keyword">if</span>(arr[i] === arr[j]){
                j = ++i;
            }
        }
        ret.push(arr[i]);
    }
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>这种方案没什么大问题，用于去重的比较部分也是自己编写实现（<code>arr[i] === arr[j]</code>），所以相等性可以自己针对上文说到的各种情况加以特殊处理。唯一比较受诟病的是使用了双重循环，时间复杂度比较高，性能一般。</p>
<h3 id="articleHeader9">使用对象key来去重</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    var len = arr.length;
    var tmp = {};
    for(var i=0; i<len; i++){
        if(!tmp[arr[i]]){
            tmp[arr[i]] = 1;
            ret.push(arr[i]);
        }
    }
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> tmp = {};
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){
        <span class="hljs-keyword">if</span>(!tmp[arr[i]]){
            tmp[arr[i]] = <span class="hljs-number">1</span>;
            ret.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>这种方法是利用了对象（<code>tmp</code>）的key不可以重复的特性来进行去重。但由于对象key只能为字符串，因此这种去重方法有许多局限性：</p>
<ol>
<li><p>无法区分隐式类型转换成字符串后一样的值，比如<code>1</code>和<code>'1'</code></p></li>
<li><p>无法处理复杂数据类型，比如对象（因为对象作为key会变成<code>[object Object]</code>）</p></li>
<li><p>特殊数据，比如<code>'__proto__'</code>会挂掉，因为<code>tmp</code>对象的<code>__proto__</code>属性无法被重写</p></li>
</ol>
<p>对于第一点，有人提出可以为对象的key增加一个类型，或者将类型放到对象的value中来解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    var len = arr.length;
    var tmp = {};
    var tmpKey;
    for(var i=0; i<len; i++){
        tmpKey = typeof arr[i] + arr[i];
        if(!tmp[tmpKey]){
            tmp[tmpKey] = 1;
            ret.push(arr[i]);
        }
    }
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> tmp = {};
    <span class="hljs-keyword">var</span> tmpKey;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){
        tmpKey = <span class="hljs-keyword">typeof</span> arr[i] + arr[i];
        <span class="hljs-keyword">if</span>(!tmp[tmpKey]){
            tmp[tmpKey] = <span class="hljs-number">1</span>;
            ret.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>该方案也同时解决第三个问题。</p>
<p>而第二个问题，如果像上文所说，在允许对对象进行自定义的比较规则，也可以将对象序列化之后作为key来使用。这里为简单起见，使用<code>JSON.stringify()</code>进行序列化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    var len = arr.length;
    var tmp = {};
    var tmpKey;
    for(var i=0; i<len; i++){
        tmpKey = typeof arr[i] + JSON.stringify(arr[i]);
        if(!tmp[tmpKey]){
            tmp[tmpKey] = 1;
            ret.push(arr[i]);
        }
    }
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> tmp = {};
    <span class="hljs-keyword">var</span> tmpKey;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){
        tmpKey = <span class="hljs-keyword">typeof</span> arr[i] + <span class="hljs-built_in">JSON</span>.stringify(arr[i]);
        <span class="hljs-keyword">if</span>(!tmp[tmpKey]){
            tmp[tmpKey] = <span class="hljs-number">1</span>;
            ret.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<h3 id="articleHeader10">Map Key</h3>
<p>可以看到，使用对象key来处理数组去重的问题，其实是一件比较麻烦的事情，处理不好很容易导致结果不正确。而这些问题的根本原因就是因为key在使用时有限制。</p>
<p>那么，能不能有一种key使用没有限制的对象呢？答案是——真的有！那就是ES2015中的<code>Map</code>。</p>
<blockquote><p><code>Map</code>是一种新的数据类型，可以把它想象成key类型没有限制的对象。此外，它的存取使用单独的<code>get()</code>、<code>set()</code>接口。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tmp = new Map();
tmp.set(1, 1);
tmp.get(1); // 1

tmp.set('2', 2);
tmp.get('2'); // 2

tmp.set(true, 3);
tmp.get(true); // 3

tmp.set(undefined, 4);
tmp.get(undefined); // 4

tmp.set(NaN, 5);
tmp.get(NaN); // 5

var arr = [], obj = {};

tmp.set(arr, 6);
tmp.get(arr); // 6

tmp.set(obj, 7);
tmp.get(obj); // 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
tmp.set(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
tmp.get(<span class="hljs-number">1</span>); <span class="hljs-comment">// 1</span>

tmp.set(<span class="hljs-string">'2'</span>, <span class="hljs-number">2</span>);
tmp.get(<span class="hljs-string">'2'</span>); <span class="hljs-comment">// 2</span>

tmp.set(<span class="hljs-literal">true</span>, <span class="hljs-number">3</span>);
tmp.get(<span class="hljs-literal">true</span>); <span class="hljs-comment">// 3</span>

tmp.set(<span class="hljs-literal">undefined</span>, <span class="hljs-number">4</span>);
tmp.get(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// 4</span>

tmp.set(<span class="hljs-literal">NaN</span>, <span class="hljs-number">5</span>);
tmp.get(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// 5</span>

<span class="hljs-keyword">var</span> arr = [], obj = {};

tmp.set(arr, <span class="hljs-number">6</span>);
tmp.get(arr); <span class="hljs-comment">// 6</span>

tmp.set(obj, <span class="hljs-number">7</span>);
tmp.get(obj); <span class="hljs-comment">// 7</span></code></pre>
<p>由于Map使用单独的接口来存取数据，所以不用担心key会和内置属性重名（如上文提到的<code>__proto__</code>）。使用<code>Map</code>改写一下我们的去重方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var ret = [];
    var len = arr.length;
    var tmp = new Map();
    for(var i=0; i<len; i++){
        if(!tmp.get(arr[i])){
            tmp.set(arr[i], 1);
            ret.push(arr[i]);
        }
    }
    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> ret = [];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){
        <span class="hljs-keyword">if</span>(!tmp.get(arr[i])){
            tmp.set(arr[i], <span class="hljs-number">1</span>);
            ret.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<h3 id="articleHeader11">Set</h3>
<p>既然都用到了ES2015，数组这件事情不能再简单一点么？当然可以。</p>
<p>除了<code>Map</code>以外，ES2015还引入了一种叫作<code>Set</code>的数据类型。顾名思义，<code>Set</code>就是集合的意思，它不允许重复元素出现，这一点和数学中对集合的定义还是比较像的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = new Set();
s.add(1);
s.add('1');
s.add(null);
s.add(undefined);
s.add(NaN);
s.add(true);
s.add([]);
s.add({});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
s.add(<span class="hljs-number">1</span>);
s.add(<span class="hljs-string">'1'</span>);
s.add(<span class="hljs-literal">null</span>);
s.add(<span class="hljs-literal">undefined</span>);
s.add(<span class="hljs-literal">NaN</span>);
s.add(<span class="hljs-literal">true</span>);
s.add([]);
s.add({});</code></pre>
<p>如果你重复添加同一个元素的话，<code>Set</code>中只会存在一个。包括<code>NaN</code>也是这样。于是我们想到，这么好的特性，要是能和数组互相转换，不就可以去重了吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr){
    var set = new Set(arr);
    return Array.from(set);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">var</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(set);
}</code></pre>
<p>我们讨论了这么久的事情，居然两行代码搞定了，简直不可思议。</p>
<p>然而，不要只顾着高兴了。有一句话是这么说的“不要因为走得太远而忘了为什么出发”。我们为什么要为数组去重呢？因为我们想得到不重复的元素列表。而既然已经有<code>Set</code>了，我们为什么还要舍近求远，使用数组呢？是不是在需要去重的情况下，直接使用<code>Set</code>就解决问题了？这个问题值得思考。</p>
<h2 id="articleHeader12">小结</h2>
<p>最后，用一个测试用例总结一下文中出现的各种去重方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,1,'1','1',0,0,'0','0',undefined,undefined,null,null,NaN,NaN,{},{},[],[],/a/,/a/]
console.log(unique(arr));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'1'</span>,<span class="hljs-string">'1'</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-string">'0'</span>,<span class="hljs-string">'0'</span>,<span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>,<span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>,<span class="hljs-literal">NaN</span>,<span class="hljs-literal">NaN</span>,{},{},[],[],/a/,/a/]
<span class="hljs-built_in">console</span>.log(unique(arr));</code></pre>
<blockquote><p>测试中没有定义对象的比较方法，因此默认情况下，对象不去重是正确的结果，去重是不正确的结果。</p></blockquote>
<table>
<thead><tr>
<th>方法</th>
<th>结果</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>indexOf#1</td>
<td>NaN被去掉</td>
<td> </td>
</tr>
<tr>
<td>indexOf#2</td>
<td>NaN重复</td>
<td> </td>
</tr>
<tr>
<td>includes</td>
<td>正确</td>
<td> </td>
</tr>
<tr>
<td>双重循环#1</td>
<td>NaN重复</td>
<td> </td>
</tr>
<tr>
<td>双重循环#2</td>
<td>NaN重复</td>
<td> </td>
</tr>
<tr>
<td>对象#1</td>
<td>字符串和数字无法区分，对象、数组、正则表达式被去重</td>
<td> </td>
</tr>
<tr>
<td>对象#2</td>
<td>对象、数组、正则表达式被去重</td>
<td> </td>
</tr>
<tr>
<td>对象#3</td>
<td>对象、数组被去重，正则表达式被消失</td>
<td>JSON.stringify(/a/)结果为{}，和空对象一样</td>
</tr>
<tr>
<td>Map</td>
<td>正确</td>
<td>　</td>
</tr>
<tr>
<td>Set</td>
<td>正确</td>
<td>　</td>
</tr>
</tbody>
</table>
<p>最后的最后：任何脱离场景谈技术都是妄谈，本文也一样。去重这道题，没有正确答案，请根据场景选择合适的去重方法。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
也谈JavaScript数组去重

## 原文链接
[https://segmentfault.com/a/1190000008031081](https://segmentfault.com/a/1190000008031081)


---
title: '你还认为JS中万物皆对象？' 
date: 2018-12-25 2:30:11
hidden: true
slug: 889136lpu4b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>经常在国内的各大网站博客上看到一句话，叫做JS中<strong>万物皆对象</strong>，那是否真是如此？</p></blockquote>
<p>那么，我们先来捋一捋JS中的数据类型，JS中的数据类型有下面几种</p>
<ul>
<li><p>Undefined</p></li>
<li><p>Null</p></li>
<li><p>Boolean</p></li>
<li><p>Number</p></li>
<li><p>String</p></li>
<li><p>Symbol （ES6中新增）</p></li>
<li><p>Object</p></li>
</ul>
<h2 id="articleHeader0">所以本质上真的都是Object？ -- NO</h2>
<h4>1.数据类型</h4>
<p>在JS中我们把前面六种类型称为为基本数据类型，最后一种则是复杂数据类型，也就是对象类型。其实从这里看貌似已经区分了对象以及其他。</p>
<h4>2.对象类型与其他类型的区别</h4>
<p>对象可以动态的添加属性和方法，而基本类型不行。<br>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基本类型 Number
var num1 = 1000;
num1.length = 10;
console.log(num1.length); //undefinded 

// 对象类型 Array
var arr1 = [];
arr1.length = 10;
console.log(arr1.length); //10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 基本类型 Number</span>
<span class="hljs-keyword">var</span> num1 = <span class="hljs-number">1000</span>;
num1.length = <span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(num1.length); <span class="hljs-comment">//undefinded </span>

<span class="hljs-comment">// 对象类型 Array</span>
<span class="hljs-keyword">var</span> arr1 = [];
arr1.length = <span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(arr1.length); <span class="hljs-comment">//10</span></code></pre>
<h4>3.值类型与引用类型</h4>
<p>再进一步看，JS中的数据类型有值类型（基本类型）和引用类型（对象类型）之分（其实其他很多语言中也有这么个区别），所谓值类型和引用类型，无非只是实例对象中保存了值或者保存了对象的引用。</p>
<ol>
<li><p>值类型：初始化一个值类型实例的时候，实际上是给这个值分配了一个内存空间来保存，当进行赋值操作的时候，新的实例会开辟一块新的内存空间，然后将原来的值<code>copy</code> 到了这个新的内存空间中；</p></li>
<li><p>引用类型：初始化一个引用类型实例的时候，仅仅是把这个实例的值所在内存空间的引用赋给这个实例，当<code>copy</code> 给了新的实例对象使，实际上是<code>copy</code> 了对这块内存空间的引用，两个实例对象本质上共用一块内存空间。</p></li>
</ol>
<p>举个?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 值类型 Number
var num1 = 1;
var num2 = num1;
num2 = num2 + 1
console.log(num1);  // 1

// 引用类型 Array
var arr1 = [];
var arr2 = arr1;
arr2.push('oujm')
console.log(arr1);  // [&quot;oujm&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 值类型 Number</span>
<span class="hljs-keyword">var</span> num1 = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> num2 = num1;
num2 = num2 + <span class="hljs-number">1</span>
<span class="hljs-built_in">console</span>.log(num1);  <span class="hljs-comment">// 1</span>

<span class="hljs-comment">// 引用类型 Array</span>
<span class="hljs-keyword">var</span> arr1 = [];
<span class="hljs-keyword">var</span> arr2 = arr1;
arr2.push(<span class="hljs-string">'oujm'</span>)
<span class="hljs-built_in">console</span>.log(arr1);  <span class="hljs-comment">// ["oujm"]</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYFU4?w=1096&amp;h=762" src="https://static.alili.tech/img/bVYFU4?w=1096&amp;h=762" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>目前的结论</h4>
<p>其实从上面看，很明显的能得出JS中并非<strong>万物皆对象</strong>，可为什么还是有这么多的人认为并相信这个观点是正确的呢？（包括当初懵懂无知的我?）</p>
<h2 id="articleHeader1">为什么呢？</h2>
<h4>1. typeof null</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof null); // object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>); <span class="hljs-comment">// object</span></code></pre>
<p>很多人（可能不多，我瞎猜）都说，连<code>null</code> 都是对象类型，其他的能不是对象吗？讲道理我之前也很疑惑。直到在看书的时候看到<code>null</code> 只不过是一个空对象引用，这么说来，它的类型是<code>object</code> 也就没有那么奇怪了。</p>
<blockquote><p>还有些人说这个是JS中的一个<code>bug</code> ，不同的对象在底层都表示为二进制，在 <code>JavaScript</code> 中二进制前三位都为 0 的话会被判 断为 <code>object</code> 类型，<code>null</code> 的二进制表示是全 0，自然前三位也是 0，所以执行 <code>typeof</code> 时会返回<code>"object"</code> 。是真也好，假也罢。但说这是个<code>bug</code> 其实没必要，我不知道底层是怎么实现，可仅仅是因为<code>null</code> 在底层全是0就返回<code>object</code> ，这种<code>bug</code> 未免显的太低级了点把... 我更愿意相信，JS的设计者就是想把<code>null</code> 表示为空对象引用</p></blockquote>
<h4>2. 基本数据类型的实例对象有 <code>__proto__</code>
</h4>
<p>如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;oujm&quot;;
console.log(str.__proto__);

/* String {
anchor：ƒ anchor()
at: ƒ at()
big: ƒ big()
blink: ƒ blink()
bold: ƒ bold()
charAt: ƒ charAt()
charCodeAt: ƒ charCodeAt()
codePointAt: ƒ codePointAt()
concat: ƒ concat()
constructor: ƒ String()
... 
} */

// Boolean Number 等基本类型打印出来的结论类似" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"oujm"</span>;
<span class="hljs-built_in">console</span>.log(str.__proto__);

<span class="hljs-comment">/* String {
anchor：ƒ anchor()
at: ƒ at()
big: ƒ big()
blink: ƒ blink()
bold: ƒ bold()
charAt: ƒ charAt()
charCodeAt: ƒ charCodeAt()
codePointAt: ƒ codePointAt()
concat: ƒ concat()
constructor: ƒ String()
... 
} */</span>

<span class="hljs-comment">// Boolean Number 等基本类型打印出来的结论类似</span></code></pre>
<p>从我们之前的学习中能知道<code>str</code> 是个基本类型，基本类型怎么会有属性呢。可是这里不但看到了这个基本类型的实例对象有属性<code>__proto__</code>，而且很明显它的构造函数就是<code>String()</code> ，这个时候有些人就会觉得既然有属性，有构造函数，那说明<code>str</code> 本质上就是个对象。这在表面上看起来好像是没什么问题。</p>
<p>那让我们再来看一个更直白的?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str1 = &quot;oujm&quot;;
var str2 = str1.substring(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str1 = <span class="hljs-string">"oujm"</span>;
<span class="hljs-keyword">var</span> str2 = str1.substring(<span class="hljs-number">2</span>);</code></pre>
<p>从上面能看出来<code>str1</code> 是有方法的。</p>
<p>OK，宗上所得：<strong>基本类型也是对象类型，即万物皆对象</strong></p>
<p>我觉得大部分人能得出这个结论都基于此。但是他们忽略了，在JS的世界中有一种对象类型叫<strong>包装对象</strong>。</p>
<h5>包装对象（String，Number，Boolean）</h5>
<p>咦？，<code>String</code> ，<code>Number</code> ，<code>Boolean</code> ，这三个不是基本类型吗。其实不然，ECMAScript提供了这三个特殊的引用类型，这三个引用类型和其他的引用类型相似，但同时也具有于各自的基本类型相应的特殊行为，实际上，每当读取一个基本类型的时候，后台就会创建一个对应的基本包装类型的对象。</p>
<p>再来看上面那个?，<code>str1</code> 很明显是一个基本类型实例，问题就出在 <code>str1.substring(2)</code> 字符串怎么会有方法。其实，为了让我们更好的操作基本类型的实例对象，后台进行了一系列的操作：</p>
<ol>
<li><p>创建String的实例</p></li>
<li><p>在实例上调用指定的方法</p></li>
<li><p>销毁这个实例</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var str2 = str1.substring(2) 动作拆解：

var tempStr = new String(&quot;oujm&quot;);
var str2 = tempStr.substring(2);
tempStr = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// var str2 = str1.substring(2) 动作拆解：</span>

<span class="hljs-keyword">var</span> tempStr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">"oujm"</span>);
<span class="hljs-keyword">var</span> str2 = tempStr.substring(<span class="hljs-number">2</span>);
tempStr = <span class="hljs-literal">null</span>;</code></pre>
<p>从这里能够看到，一般的引用类型和包装类型唯一的区别就在于对象的生命周期。包装类型的对象生命周期很短，只有代码执行的一瞬间，然后就被销毁了，所以这也就是为什么我们不能在运行的时候为基本类型的值添加属性和方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str1 = &quot;oujm&quot;;
var str1.bf = &quot;ethan&quot;;
console.log(str1.bf); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str1 = <span class="hljs-string">"oujm"</span>;
<span class="hljs-keyword">var</span> str1.bf = <span class="hljs-string">"ethan"</span>;
<span class="hljs-built_in">console</span>.log(str1.bf); <span class="hljs-comment">// undefined</span></code></pre>
<p>这也解答了我曾经的一个疑问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str1 = &quot;oujm&quot;;
var str2 = new String(&quot;ethan&quot;);

console.log(str1.__proto__ === str2.__proto__); // true
console.log(str1 instanceof String); // false 
console.log(str2 instanceof String); // true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str1 = <span class="hljs-string">"oujm"</span>;
<span class="hljs-keyword">var</span> str2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">"ethan"</span>);

<span class="hljs-built_in">console</span>.log(str1.__proto__ === str2.__proto__); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(str1 <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>); <span class="hljs-comment">// false </span>
<span class="hljs-built_in">console</span>.log(str2 <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>); <span class="hljs-comment">// true </span></code></pre>
<p>同样的道理，在调用<code>__proto__</code> 属性的瞬间，也是使用<code>new String()</code> 先来实例化一个对象，所以那一瞬间他们的构造函数以及原型对象是相同的，但也仅仅是那一瞬间。</p>
<h3 id="articleHeader2">综上</h3>
<p><strong>别再?到有些文章说的，JS的世界很大，并不只有对象</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你还认为JS中万物皆对象？

## 原文链接
[https://segmentfault.com/a/1190000012037062](https://segmentfault.com/a/1190000012037062)


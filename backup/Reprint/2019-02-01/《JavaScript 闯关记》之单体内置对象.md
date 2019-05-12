---
title: '《JavaScript 闯关记》之单体内置对象' 
date: 2019-02-01 2:30:10
hidden: true
slug: qppmus2jb9l
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">单体内置对象</h1>
<p>ECMA-262 对内置对象的定义是「由 JavaScript 实现提供的、不依赖于宿主环境的对象，这些对象在 JavaScript 程序执行之前就已经存在了」。意思就是说，开发人员不必显式地实例化内置对象，因为它们已经实例化了。前面我们已经介绍了大多数内置对象，例如 <code>Object</code>、<code>Array</code> 和 <code>String</code>。ECMA-262 还定义了两个单体内置对象：<code>Global</code> 和 <code>Math</code>。</p>
<h2 id="articleHeader1">
<code>Global</code> 对象</h2>
<p><code>Global</code> 对象可以说是 JavaScript 中最特别的一个对象了，因为不管你从什么角度上看，这个对象都是不存在的。<code>Global</code> 对象在某种意义上是作为一个终极的「兜底儿对象」来定义的。换句话说，不属于任何其他对象的属性和方法，最终都是它的属性和方法。所有在全局作用域中定义的属性和函数，都是 <code>Global</code> 对象的属性。本书前面介绍过的那些函数，诸如 <code>isNaN()</code>、<code>isFinite()</code>、<code>parseInt()</code> 以及 <code>parseFloat()</code>，实际上全都是 <code>Global</code> 对象的方法。除此之外，<code>Global</code> 对象还包含其他一些方法。</p>
<h3 id="articleHeader2">URI 编码方法</h3>
<p><code>Global</code> 对象的 <code>encodeURI()</code> 和 <code>encodeURIComponent()</code> 方法可以对 URI（Uniform Resource Identifiers，通用资源标识符）进行编码，以便发送给浏览器。有效的 URI 中不能包含某些字符，例如空格。而这两个 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字符，从而让浏览器能够接受和理解。</p>
<p>其中，<code>encodeURI()</code> 主要用于整个 URI，而 <code>encodeURIComponent()</code> 主要用于对 URI 中的某一段进行编码。它们的主要区别在于，<code>encodeURI()</code> 不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 <code>encodeURIComponent()</code> 则会对它发现的任何非标准字符进行编码。来看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var uri = &quot;http://shijiajie.com/illegal value.htm#start&quot;;

console.log(encodeURI(uri));
// &quot;http://shijiajie.com/illegal%20value.htm#start&quot;

console.log(encodeURIComponent(uri));
// &quot;http%3A%2F%2Fshijiajie.com%2Fillegal%20value.htm%23start&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> uri = <span class="hljs-string">"http://shijiajie.com/illegal value.htm#start"</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">encodeURI</span>(uri));
<span class="hljs-comment">// "http://shijiajie.com/illegal%20value.htm#start"</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">encodeURIComponent</span>(uri));
<span class="hljs-comment">// "http%3A%2F%2Fshijiajie.com%2Fillegal%20value.htm%23start"</span></code></pre>
<p>使用 <code>encodeURI()</code> 编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了 <code>%20</code>。而 <code>encodeURIComponent()</code> 方法则会使用对应的编码替换所有非字母数字字符。这也正是可以对整个 URI 使用 <code>encodeURI()</code>，而只能对附加在现有 URI 后面的字符串使用 <code>encodeURIComponent()</code> 的原因所在。</p>
<p>一般来说，我们使用 <code>encodeURIComponent()</code> 方法的时候要比使用 <code>encodeURI()</code> 更多，因为在实践中更常见的是对查询字符串参数而不是对基础 URI 进行编码。</p>
<p>与 <code>encodeURI()</code> 和 <code>encodeURIComponent()</code> 方法对应的两个方法分别是 <code>decodeURI()</code> 和 <code>decodeURIComponent()</code>。其中，<code>decodeURI()</code> 只能对使用 <code>encodeURI()</code> 替换的字符进行解码。例如，它可将 <code>%20</code> 替换成一个空格，但不会对 <code>%23</code> 作任何处理，因为 <code>%23</code> 表示井字号 <code>#</code>，而井字号不是使用 <code>encodeURI()</code> 替换的。同样地，<code>decodeURIComponent()</code> 能够解码使用 <code>encodeURIComponent()</code> 编码的所有字符，即它可以解码任何特殊字符的编码。来看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var uri = &quot;http%3A%2F%2Fshijiajie.com%2Fillegal%20value.htm%23start&quot;;

console.log(decodeURI(uri));
// http%3A%2F%2Fshijiajie.com%2Fillegal value.htm%23start

console.log(decodeURIComponent(uri));
// http://shijiajie.com/illegal value.htm#start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> uri = <span class="hljs-string">"http%3A%2F%2Fshijiajie.com%2Fillegal%20value.htm%23start"</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">decodeURI</span>(uri));
<span class="hljs-comment">// http%3A%2F%2Fshijiajie.com%2Fillegal value.htm%23start</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">decodeURIComponent</span>(uri));
<span class="hljs-comment">// http://shijiajie.com/illegal value.htm#start</span></code></pre>
<p>这里，变量 <code>uri</code> 包含着一个由 <code>encodeURIComponent()</code> 编码的字符串。在第一次调用 <code>decodeURI()</code> 输出的结果中，只有 <code>%20</code> 被替换成了空格。而在第二次调用 <code>decodeURIComponent()</code> 输出的结果中，所有特殊字符的编码都被替换成了原来的字符，得到了一个未经转义的字符串（但这个字符串并不是一个有效的 URI）。</p>
<h3 id="articleHeader3">
<code>eval()</code> 方法</h3>
<p><code>eval()</code> 方法就像是一个完整的 JavaScript 解析器，它只接受一个参数，即要执行的 JavaScript 字符串。看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eval(&quot;console.log('hi')&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">eval</span>(<span class="hljs-string">"console.log('hi')"</span>);</code></pre>
<p>这行代码的作用等价于下面这行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;hi&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>);</code></pre>
<p>当解析器发现代码中调用 <code>eval()</code> 方法时，它会将传入的参数当作实际的 JavaScript 语句来解析，然后把执行结果插入到原位置。通过 <code>eval()</code> 执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。这意味着通过 <code>eval()</code> 执行的代码可以引用在包含环境中定义的变量，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var msg = &quot;hello world&quot;;
eval(&quot;console.log(msg)&quot;);    // &quot;hello world&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> msg = <span class="hljs-string">"hello world"</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">"console.log(msg)"</span>);    <span class="hljs-comment">// "hello world"</span></code></pre>
<p>可见，变量 <code>msg</code> 是在 <code>eval()</code> 调用的环境之外定义的，但其中调用的 <code>console.log()</code> 仍然能够显示 <code>"hello world"</code>。这是因为上面第二行代码最终被替换成了一行真正的代码。同样地，我们也可以在 <code>eval()</code> 调用中定义一个函数，然后再在该调用的外部代码中引用这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eval(&quot;function sayHi() { console.log('hi'); }&quot;);
sayHi();    // &quot;hi&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">eval</span>(<span class="hljs-string">"function sayHi() { console.log('hi'); }"</span>);
sayHi();    <span class="hljs-comment">// "hi"</span></code></pre>
<p>显然，函数 <code>sayHi()</code> 是在 <code>eval()</code> 内部定义的。但由于对 <code>eval()</code> 的调用最终会被替换成定义函数的实际代码，因此可以在下一行调用 <code>sayHi()</code> 。对于变量也一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eval(&quot;var msg = 'hello world';&quot;);
console.log(msg);     // &quot;hello world&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">eval</span>(<span class="hljs-string">"var msg = 'hello world';"</span>);
<span class="hljs-built_in">console</span>.log(msg);     <span class="hljs-comment">// "hello world"</span></code></pre>
<p>在 <code>eval()</code> 中创建的任何变量或函数都不会被提升，因为在解析代码的时候，它们被包含在一个字符串中；它们只在 <code>eval()</code> 执行的时候创建。</p>
<p>严格模式下，在外部访问不到 <code>eval()</code> 中创建的任何变量或函数，因此前面两个例子都会导致错误。同样，在严格模式下，为 <code>eval</code> 赋值也会导致错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
eval = &quot;hi&quot;;   // causes error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">"use strict"</span>;
<span class="hljs-built_in">eval</span> = <span class="hljs-string">"hi"</span>;   <span class="hljs-comment">// causes error</span></code></pre>
<p>能够解释代码字符串的能力非常强大，但也非常危险。因此在使用 <code>eval()</code> 时必须极为谨慎，特别是在用它执行用户输入数据的情况下。否则，可能会有恶意用户输入威胁你的站点或应用程序安全的代码（即所谓的代码注入）。</p>
<h3 id="articleHeader4">
<code>Global</code> 对象的属性</h3>
<p><code>Global</code> 对象还包含一些属性，其中一部分属性已经在本书前面介绍过了。例如，特殊的值 <code>undefined</code>、<code>NaN</code> 以及 <code>Infinity</code> 都是 <code>Global</code> 对象的属性。此外，所有原生引用类型的构造函数，像 <code>Object</code> 和 <code>Function</code>，也都是 <code>Global</code> 对象的属性。下表列出了 <code>Global</code> 对象的所有属性。</p>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
<th>属性</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>undefined</td>
<td>特殊值undefined</td>
<td>Date</td>
<td>构造函数Date</td>
</tr>
<tr>
<td>NaN</td>
<td>特殊值NaN</td>
<td>RegExp</td>
<td>构造函数RegExp</td>
</tr>
<tr>
<td>Infinity</td>
<td>特殊值Infinity</td>
<td>Error</td>
<td>构造函数Error</td>
</tr>
<tr>
<td>Object</td>
<td>构造函数Object</td>
<td>EvalError</td>
<td>构造函数EvalError</td>
</tr>
<tr>
<td>Array</td>
<td>构造函数Array</td>
<td>RangeError</td>
<td>构造函数RangeError</td>
</tr>
<tr>
<td>Function</td>
<td>构造函数Function</td>
<td>ReferenceError</td>
<td>构造函数ReferenceError</td>
</tr>
<tr>
<td>Boolean</td>
<td>构造函数Boolean</td>
<td>SyntaxError</td>
<td>构造函数SyntaxError</td>
</tr>
<tr>
<td>String</td>
<td>构造函数String</td>
<td>TypeError</td>
<td>构造函数TypeError</td>
</tr>
<tr>
<td>Number</td>
<td>构造函数Number</td>
<td>URIError</td>
<td>构造函数URIError</td>
</tr>
</tbody>
</table>
<p>ECMAScript 5 明确禁止给 <code>undefined</code>、<code>NaN</code> 和 <code>Infinity</code> 赋值，这样做即使在非严格模式下也会导致错误。</p>
<h3 id="articleHeader5">
<code>window</code> 对象</h3>
<p>JavaScript 虽然没有指出如何直接访问 <code>Global</code> 对象，但 Web 浏览器都是将这个全局对象作为 <code>window</code> 对象的一部分加以实现的。因此，在全局作用域中声明的所有变量和函数，就都成为了 <code>window</code> 对象的属性。来看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color = &quot;red&quot;;

function sayColor(){
    console.log(window.color);
}

window.sayColor();  // &quot;red&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> color = <span class="hljs-string">"red"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayColor</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.color);
}

<span class="hljs-built_in">window</span>.sayColor();  <span class="hljs-comment">// "red"</span></code></pre>
<p>JavaScript 中的 <code>window</code> 对象除了扮演规定的 <code>Global</code> 对象的角色外，还承担了很多别的任务。</p>
<h2 id="articleHeader6">　<code>Math</code> 对象</h2>
<p>JavaScript 还为保存数学公式和信息提供了一个公共位置，即 <code>Math</code> 对象。与我们在 <code>JavaScript</code> 直接编写的计算功能相比，<code>Math</code> 对象提供的计算功能执行起来要快得多。<code>Math</code> 对象中还提供了辅助完成这些计算的属性和方法。</p>
<h3 id="articleHeader7">
<code>Math</code> 对象的属性</h3>
<p><code>Math</code> 对象包含的属性大都是数学计算中可能会用到的一些特殊值。下表列出了这些属性。</p>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>Math.E</td>
<td>自然对数的底数，即常量e的值</td>
</tr>
<tr>
<td>Math.LN10</td>
<td>10的自然对数</td>
</tr>
<tr>
<td>Math.LN2</td>
<td>2的自然对数</td>
</tr>
<tr>
<td>Math.LOG2E</td>
<td>以2为底e的对数</td>
</tr>
<tr>
<td>Math.LOG10E</td>
<td>以10为底e的对数</td>
</tr>
<tr>
<td>Math.PI</td>
<td>π的值</td>
</tr>
<tr>
<td>Math.SQRT1_2</td>
<td>1/2的平方根（即2的平方根的倒数）</td>
</tr>
<tr>
<td>Math.SQRT2</td>
<td>2的平方根</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader8">
<code>min()</code> 和 <code>max()</code> 方法</h3>
<p><code>Math</code> 对象还包含许多方法，用于辅助完成简单和复杂的数学计算。其中，<code>min()</code> 和 <code>max()</code> 方法用于确定一组数值中的最小值和最大值。这两个方法都可以接收任意多个数值参数，如下面的例子所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var max = Math.max(3, 54, 32, 16);
console.log(max);    // 54

var min = Math.min(3, 54, 32, 16);
console.log(min);    // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> max = <span class="hljs-built_in">Math</span>.max(<span class="hljs-number">3</span>, <span class="hljs-number">54</span>, <span class="hljs-number">32</span>, <span class="hljs-number">16</span>);
<span class="hljs-built_in">console</span>.log(max);    <span class="hljs-comment">// 54</span>

<span class="hljs-keyword">var</span> min = <span class="hljs-built_in">Math</span>.min(<span class="hljs-number">3</span>, <span class="hljs-number">54</span>, <span class="hljs-number">32</span>, <span class="hljs-number">16</span>);
<span class="hljs-built_in">console</span>.log(min);    <span class="hljs-comment">// 3</span></code></pre>
<p>要找到数组中的最大或最小值，可以像下面这样使用 <code>apply()</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values);
console.log(max);   // 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> values = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>];
<span class="hljs-keyword">var</span> max = <span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-built_in">Math</span>, values);
<span class="hljs-built_in">console</span>.log(max);   <span class="hljs-comment">// 8</span></code></pre>
<p>这个技巧的关键是把 <code>Math</code> 对象作为 <code>apply()</code> 的第一个参数，从而正确地设置 <code>this</code> 值。然后，可以将任何数组作为第二个参数。</p>
<h3 id="articleHeader9">舍入方法</h3>
<p>下面来介绍将小数值舍入为整数的几个方法：<code>Math.ceil()</code>、<code>Math.floor()</code> 和 <code>Math.round()</code>。这三个方法分别遵循下列舍入规则：</p>
<ul>
<li><p><code>Math.ceil()</code> 执行向上舍入，即它总是将数值向上舍入为最接近的整数；</p></li>
<li><p><code>Math.floor()</code> 执行向下舍入，即它总是将数值向下舍入为最接近的整数；</p></li>
<li><p><code>Math.round()</code> 执行标准舍入，即它总是将数值四舍五入为最接近的整数。</p></li>
</ul>
<p>下面是使用这些方法的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.ceil(25.9));     // 26
console.log(Math.ceil(25.5));     // 26
console.log(Math.ceil(25.1));     // 26

console.log(Math.round(25.9));    // 26
console.log(Math.round(25.5));    // 26
console.log(Math.round(25.1));    // 25

console.log(Math.floor(25.9));    // 25
console.log(Math.floor(25.5));    // 25
console.log(Math.floor(25.1));    // 25" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">25.9</span>));     <span class="hljs-comment">// 26</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">25.5</span>));     <span class="hljs-comment">// 26</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">25.1</span>));     <span class="hljs-comment">// 26</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">25.9</span>));    <span class="hljs-comment">// 26</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">25.5</span>));    <span class="hljs-comment">// 26</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">25.1</span>));    <span class="hljs-comment">// 25</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">25.9</span>));    <span class="hljs-comment">// 25</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">25.5</span>));    <span class="hljs-comment">// 25</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">25.1</span>));    <span class="hljs-comment">// 25</span></code></pre>
<h3 id="articleHeader10">
<code>random()</code> 方法</h3>
<p><code>Math.random()</code> 方法返回介于0和1之间一个随机数，包括0而不包括1。对于某些站点来说，这个方法非常实用，因为可以利用它来随机显示一些名人名言和新闻事件。套用下面的公式，就可以利用 <code>Math.random()</code> 从某个整数范围内随机选择一个值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">值 = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * 可能值的总数 + 第一个可能的值)</code></pre>
<p>公式中用到了 <code>Math.floor()</code> 方法，这是因为 <code>Math.random()</code> 总返回一个小数值。而用这个小数值乘以一个整数，然后再加上一个整数，最终结果仍然还是一个小数。举例来说，如果你想选择一个1到10之间的数值，可以像下面这样编写代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = Math.floor(Math.random() * 10 + 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> num = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">10</span> + <span class="hljs-number">1</span>);</code></pre>
<p>总共有10个可能的值（1到10），而第一个可能的值是1。而如果想要选择一个介于2到10之间的值，就应该将上面的代码改成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = Math.floor(Math.random() * 9 + 2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> num = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">9</span> + <span class="hljs-number">2</span>);</code></pre>
<p>从2数到10要数9个数，因此可能值的总数就是9，而第一个可能的值就是2。多数情况下，其实都可以通过一个函数来计算可能值的总数和第一个可能的值，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function selectFrom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}

var num = selectFrom(2, 10);
console.log(num);   // 介于2和10之间（包括2和10）的一个数值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectFrom</span>(<span class="hljs-params">lowerValue, upperValue</span>) </span>{
    <span class="hljs-keyword">var</span> choices = upperValue - lowerValue + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * choices + lowerValue);
}

<span class="hljs-keyword">var</span> num = selectFrom(<span class="hljs-number">2</span>, <span class="hljs-number">10</span>);
<span class="hljs-built_in">console</span>.log(num);   <span class="hljs-comment">// 介于2和10之间（包括2和10）的一个数值</span></code></pre>
<p>函数 <code>selectFrom()</code> 接受两个参数：应该返回的最小值和最大值。而用最大值减最小值再加1得到了可能值的总数，然后它又把这些数值套用到了前面的公式中。这样，通过调用 <code>selectFrom(2,10)</code> 就可以得到一个介于2和10之间（包括2和10）的数值了。利用这个函数，可以方便地从数组中随机取出一项，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;, &quot;yellow&quot;, &quot;black&quot;, &quot;purple&quot;, &quot;brown&quot;];
var color = colors[selectFrom(0, colors.length-1)];
console.log(color);  // 可能是数组中包含的任何一个字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>, <span class="hljs-string">"yellow"</span>, <span class="hljs-string">"black"</span>, <span class="hljs-string">"purple"</span>, <span class="hljs-string">"brown"</span>];
<span class="hljs-keyword">var</span> color = colors[selectFrom(<span class="hljs-number">0</span>, colors.length<span class="hljs-number">-1</span>)];
<span class="hljs-built_in">console</span>.log(color);  <span class="hljs-comment">// 可能是数组中包含的任何一个字符串</span></code></pre>
<h3 id="articleHeader11">其他方法</h3>
<p><code>Math</code> 对象中还包含其他一些与完成各种简单或复杂计算有关的方法，但详细讨论其中每一个方法的细节及适用情形超出了本书的范围。下面我们就给出一个表格，其中列出了这些没有介绍到的 <code>Math</code> 对象的方法。</p>
<table>
<thead><tr>
<th>方法</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>Math.abs(num)</td>
<td>返回num的绝对值</td>
</tr>
<tr>
<td>Math.asin(x)</td>
<td>返回x的反正弦值</td>
</tr>
<tr>
<td>Math.exp(num)</td>
<td>返回Math.E的num次幂</td>
</tr>
<tr>
<td>Math.atan(x)</td>
<td>返回x的反正切值</td>
</tr>
<tr>
<td>Math.log(num)</td>
<td>返回num的自然对数</td>
</tr>
<tr>
<td>Math.atan2(y,x)</td>
<td>返回y/x的反正切值</td>
</tr>
<tr>
<td>Math.pow(num,power)</td>
<td>返回num的power次幂</td>
</tr>
<tr>
<td>Math.cos(x)</td>
<td>返回x的余弦值</td>
</tr>
<tr>
<td>Math.sqrt(num)</td>
<td>返回num的平方根</td>
</tr>
<tr>
<td>Math.sin(x)</td>
<td>返回x的正弦值</td>
</tr>
<tr>
<td>Math.acos(x)</td>
<td>返回x的反余弦值</td>
</tr>
<tr>
<td>Math.tan(x)</td>
<td>返回x的正切值</td>
</tr>
</tbody>
</table>
<p>虽然 ECMA-262 规定了这些方法，但不同实现可能会对这些方法采用不同的算法。毕竟，计算某个值的正弦、余弦和正切的方式多种多样。也正因为如此，这些方法在不同的实现中可能会有不同的精度。</p>
<h2 id="articleHeader12">关卡</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如何高效产生m个n范围内的不重复随机数（m<=n)
var getRandomNumber = function(n, m){
    // 待实现方法体
}
console.log(getRandomNumber(20, 3));  // 8,4,19" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 如何高效产生m个n范围内的不重复随机数（m&lt;=n)</span>
<span class="hljs-keyword">var</span> getRandomNumber = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n, m</span>)</span>{
    <span class="hljs-comment">// 待实现方法体</span>
}
<span class="hljs-built_in">console</span>.log(getRandomNumber(<span class="hljs-number">20</span>, <span class="hljs-number">3</span>));  <span class="hljs-comment">// 8,4,19</span></code></pre>
<h2 id="articleHeader13">更多</h2>
<blockquote><p>关注微信公众号「劼哥舍」回复「答案」，获取关卡详解。  <br>关注 <a href="https://github.com/stone0090/javascript-lessons" rel="nofollow noreferrer" target="_blank">https://github.com/stone0090/javascript-lessons</a>，获取最新动态。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《JavaScript 闯关记》之单体内置对象

## 原文链接
[https://segmentfault.com/a/1190000007349910](https://segmentfault.com/a/1190000007349910)


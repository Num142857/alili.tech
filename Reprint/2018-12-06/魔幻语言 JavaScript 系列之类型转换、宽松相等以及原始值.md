---
title: '魔幻语言 JavaScript 系列之类型转换、宽松相等以及原始值' 
date: 2018-12-06 2:30:09
hidden: true
slug: 6hlpbxi8yi5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>编译自：<a href="https://wanago.io/2018/04/02/1-2-3-9-looking-into-assembly-code-of-coercion/" rel="nofollow noreferrer" target="_blank"><code>[1] + [2] – [3] === 9</code>!? Looking into assembly code of coercion.</a><p>全文从两个题目来介绍类型转换、宽松相等以及原始值的概念:</p>
<p>[1] + [2] – [3] === 9</p>
<p>如果让 a == true &amp;&amp; a == false 的值为 true</p>
<p>第二道题目是译者加的，因为这其实是个很好的例子，体现出 JavaScript 的魔幻之处</p>
</blockquote>
<p>变量值都具有类型，但仍然可以将一种类型的值赋值给另一种类型，如果是由开发者进行这些操作，就是<strong>类型转换</strong>（显式转换）。如果是发生在后台，比如在尝试对不一致的类型执行操作时，就是<strong>隐式转换</strong>（强制转换）。</p>
<h2 id="articleHeader0">类型转换（Type casting）</h2>
<h3 id="articleHeader1">基本包装类型（Primitive types wrappers）</h3>
<p>在 JavaScript 中除了 <code>null</code> 和 <code>undefined</code> 之外的所有基本类型都有一个对应的基本包装类型。通过使用其构造函数，可以将一个值的类型转换为另一种类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String(123); // '123'
Boolean(123); // true
Number('123'); // 123
Number(true); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">String</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// '123'</span>
<span class="hljs-built_in">Boolean</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-string">'123'</span>); <span class="hljs-comment">// 123</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// 1</span></code></pre>
<blockquote>基本类型的包装器不会保存很长时间，一旦完成相应工作，就会消失</blockquote>
<p>需要注意的是，如果在构造函数前使用 <code>new</code> 关键字，结果就完全不同，比如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bool = new Boolean(false);
bool.propertyName = 'propertyValue';
bool.valueOf(); // false

if (bool) {
  console.log(bool.propertyName); // 'propertyValue'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> bool = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">false</span>);
bool.propertyName = <span class="hljs-string">'propertyValue'</span>;
bool.valueOf(); <span class="hljs-comment">// false</span>

<span class="hljs-keyword">if</span> (bool) {
  <span class="hljs-built_in">console</span>.log(bool.propertyName); <span class="hljs-comment">// 'propertyValue'</span>
}</code></pre>
<p>由于 <code>bool</code> 在这里是一个新的对象，已经不再是基本类型值，它的计算结果为 <code>true</code>。</p>
<p>上述例子，因为在 if 语句中，括号间的表达式将会装换成布尔值，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (1) {
    console.log(true);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-number">1</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span>);
}</code></pre>
<p>其实，上面这段代码跟下面一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ( Boolean(1) ) {
    console.log(true);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> ( <span class="hljs-built_in">Boolean</span>(<span class="hljs-number">1</span>) ) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span>);
}</code></pre>
<h3 id="articleHeader2">parseFloat</h3>
<p><code>parseFloat</code> 函数的功能跟 <code>Number</code> 构造函数类似，但对于传参并没有那么严格。当它遇到不能转换成数字的字符，将返回一个到该点的值并忽略其余字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number('123a45'); // NaN
parseFloat('123a45'); // 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Number</span>(<span class="hljs-string">'123a45'</span>); <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">'123a45'</span>); <span class="hljs-comment">// 123</span></code></pre>
<h3 id="articleHeader3">parseInt</h3>
<p><code>parseInt</code> 函数在解析时将会对数字进行向下取整，并且可以使用不同的进制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('1111', 2); // 15
parseInt('0xF'); // 15
 
parseFloat('0xF'); // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'1111'</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 15</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'0xF'</span>); <span class="hljs-comment">// 15</span>
 
<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">'0xF'</span>); <span class="hljs-comment">// 0</span></code></pre>
<p><code>parseInt</code> 函数可以猜测进制，或着你可以显式地通过第二个参数传入进制，参考 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt" rel="nofollow noreferrer" target="_blank">MDN web docs</a>。</p>
<p>而且不能正常处理大数，所以不应该成为 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor" rel="nofollow noreferrer" target="_blank"><strong>Math.floor</strong></a> 的替代品，是的，<code>Math.floor</code> 也会进行类型转换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('1.261e7'); // 1
Number('1.261e7'); // 12610000
Math.floor('1.261e7') // 12610000
 
Math.floor(true) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'1.261e7'</span>); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-string">'1.261e7'</span>); <span class="hljs-comment">// 12610000</span>
<span class="hljs-built_in">Math</span>.floor(<span class="hljs-string">'1.261e7'</span>) <span class="hljs-comment">// 12610000</span>
 
<span class="hljs-built_in">Math</span>.floor(<span class="hljs-literal">true</span>) <span class="hljs-comment">// 1</span></code></pre>
<h3 id="articleHeader4">toString</h3>
<p>可以使用 <strong>toString</strong> 函数将值转换为字符串，但是在不同原型之间的实现有所不同。</p>
<p><strong>String.prototype.toString</strong></p>
<p>返回字符串的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dogName = 'Fluffy';
 
dogName.toString() // 'Fluffy'
String.prototype.toString.call('Fluffy') // 'Fluffy'
 
String.prototype.toString.call({}) // Uncaught TypeError: String.prototype.toString requires that 'this' be a String" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dogName = <span class="hljs-string">'Fluffy'</span>;
 
dogName.toString() <span class="hljs-comment">// 'Fluffy'</span>
<span class="hljs-built_in">String</span>.prototype.toString.call(<span class="hljs-string">'Fluffy'</span>) <span class="hljs-comment">// 'Fluffy'</span>
 
<span class="hljs-built_in">String</span>.prototype.toString.call({}) <span class="hljs-comment">// Uncaught TypeError: String.prototype.toString requires that 'this' be a String</span></code></pre>
<p><strong>Number.prototype.toString</strong></p>
<p>返回将数字的字符串表示形式，可以指定进制作为第一个参数传入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(15).toString(); // &quot;15&quot;
(15).toString(2); // &quot;1111&quot;
(-15).toString(2); // &quot;-1111&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-number">15</span>).toString(); <span class="hljs-comment">// "15"</span>
(<span class="hljs-number">15</span>).toString(<span class="hljs-number">2</span>); <span class="hljs-comment">// "1111"</span>
(<span class="hljs-number">-15</span>).toString(<span class="hljs-number">2</span>); <span class="hljs-comment">// "-1111"</span></code></pre>
<p><strong>Symbol .prototype.toString</strong></p>
<p>返回  <code>Symbol（${description}）</code></p>
<p><strong>Boolean.prototype.toString</strong></p>
<p>返回 <code>“true”</code> 或 <code>“false”</code></p>
<p><strong>Object.prototype.toString</strong></p>
<p>返回一个字符串 <code>[ object $ { tag } ] </code> ，其中 tag 可以是内置类型比如 “Array”，“String”，“Object”，“Date”，也可以是自定义 tag。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dogName = 'Fluffy';
 
dogName.toString(); // 'Fluffy' (String.prototype.toString called here)
Object.prototype.toString.call(dogName); // '[object String]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dogName = <span class="hljs-string">'Fluffy'</span>;
 
dogName.toString(); <span class="hljs-comment">// 'Fluffy' (String.prototype.toString called here)</span>
<span class="hljs-built_in">Object</span>.prototype.toString.call(dogName); <span class="hljs-comment">// '[object String]'</span></code></pre>
<p>随着 ES6 的推出，还可以使用 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" rel="nofollow noreferrer" target="_blank"><strong>Symbol</strong></a> 进行自定义 tag。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dog = { name: 'Fluffy' }
console.log( dog.toString() ) // '[object Object]'
 
dog[Symbol.toStringTag] = 'Dog';
console.log( dog.toString() ) // '[object Dog]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dog = { <span class="hljs-attr">name</span>: <span class="hljs-string">'Fluffy'</span> }
<span class="hljs-built_in">console</span>.log( dog.toString() ) <span class="hljs-comment">// '[object Object]'</span>
 
dog[<span class="hljs-built_in">Symbol</span>.toStringTag] = <span class="hljs-string">'Dog'</span>;
<span class="hljs-built_in">console</span>.log( dog.toString() ) <span class="hljs-comment">// '[object Dog]'</span></code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Dog = function(name) {
  this.name = name;
}
Dog.prototype[Symbol.toStringTag] = 'Dog';
 
const dog = new Dog('Fluffy');
dog.toString(); // '[object Dog]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Dog = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Dog.prototype[<span class="hljs-built_in">Symbol</span>.toStringTag] = <span class="hljs-string">'Dog'</span>;
 
<span class="hljs-keyword">const</span> dog = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'Fluffy'</span>);
dog.toString(); <span class="hljs-comment">// '[object Dog]'</span></code></pre>
<p>还可以结合使用 ES6 class 和 getter：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog {
  constructor(name) {
    this.name = name;
  }
  get [Symbol.toStringTag]() {
    return 'Dog';
  }
}
 
const dog = new Dog('Fluffy');
dog.toString(); // '[object Dog]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }
  get [<span class="hljs-built_in">Symbol</span>.toStringTag]() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Dog'</span>;
  }
}
 
<span class="hljs-keyword">const</span> dog = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'Fluffy'</span>);
dog.toString(); <span class="hljs-comment">// '[object Dog]'</span></code></pre>
<p><strong>Array.prototype.toString</strong></p>
<p>在每个元素上调用 <code>toString</code>，并返回一个字符串，并且以逗号分隔。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [
  {},
  2,
  3
]
 
arr.toString() // &quot;[object Object],2,3&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [
  {},
  <span class="hljs-number">2</span>,
  <span class="hljs-number">3</span>
]
 
arr.toString() <span class="hljs-comment">// "[object Object],2,3"</span></code></pre>
<h2 id="articleHeader5">强制转换</h2>
<p>如果了解类型转换的工作原理，那么理解强制转换就会容易很多。</p>
<h3 id="articleHeader6">数学运算符</h3>
<p><strong>加号运算符</strong></p>
<p>在作为二元运算符的 <code>+</code> 如果两边的表达式存在字符串，最后将会返回一个字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'2' + 2 // '22'
15 + '' // '15'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'2'</span> + <span class="hljs-number">2</span> <span class="hljs-comment">// '22'</span>
<span class="hljs-number">15</span> + <span class="hljs-string">''</span> <span class="hljs-comment">// '15'</span></code></pre>
<p>可以使用一元运算符将其转换为数字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+'12' // 12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">+<span class="hljs-string">'12'</span> <span class="hljs-comment">// 12</span></code></pre>
<p><strong>其他数学运算符</strong></p>
<p>其他数学运算符（如 <code>-</code>或 <code>/</code>）将始终转换为数字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date('04-02-2018') - '1' // 1522619999999
'12' / '6' // 2
-'1' // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'04-02-2018'</span>) - <span class="hljs-string">'1'</span> <span class="hljs-comment">// 1522619999999</span>
<span class="hljs-string">'12'</span> / <span class="hljs-string">'6'</span> <span class="hljs-comment">// 2</span>
-<span class="hljs-string">'1'</span> <span class="hljs-comment">// -1</span></code></pre>
<p>上述例子中，Date 类型将转换为数字，即 <a href="https://en.wikipedia.org/wiki/Unix_time" rel="nofollow noreferrer" target="_blank">Unix 时间戳</a>。</p>
<h3 id="articleHeader7">逻辑非</h3>
<p>如果原始值是 <em>假</em>，则使用逻辑非将输出 <em>真</em>，如果 <em>真</em>，则输出为 <em>假</em>。 如果使用两次，可用于将该值转换为相应的布尔值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!1 // false
!!({}) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">!<span class="hljs-number">1</span> <span class="hljs-comment">// false</span>
!!({}) <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader8">位或</h3>
<p>值得一提的是，即使 ToInt32 实际上是一个抽象操作（仅限内部，不可调用），将一个值转换为一个<a href="https://en.wikipedia.org/wiki/32-bit" rel="nofollow noreferrer" target="_blank">有符号的 32 位整数</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0 | true          // 1
0 | '123'         // 123
0 | '2147483647'  // 2147483647
0 | '2147483648'  // -2147483648 (too big)
0 | '-2147483648' // -2147483648
0 | '-2147483649' // 2147483647 (too small)
0 | Infinity      // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0</span> | <span class="hljs-literal">true</span>          <span class="hljs-comment">// 1</span>
<span class="hljs-number">0</span> | <span class="hljs-string">'123'</span>         <span class="hljs-comment">// 123</span>
<span class="hljs-number">0</span> | <span class="hljs-string">'2147483647'</span>  <span class="hljs-comment">// 2147483647</span>
<span class="hljs-number">0</span> | <span class="hljs-string">'2147483648'</span>  <span class="hljs-comment">// -2147483648 (too big)</span>
<span class="hljs-number">0</span> | <span class="hljs-string">'-2147483648'</span> <span class="hljs-comment">// -2147483648</span>
<span class="hljs-number">0</span> | <span class="hljs-string">'-2147483649'</span> <span class="hljs-comment">// 2147483647 (too small)</span>
<span class="hljs-number">0</span> | <span class="hljs-literal">Infinity</span>      <span class="hljs-comment">// 0</span></code></pre>
<p>当其中一个操作数为 0 时执行按位或操作将不改变另一个操作数的值。</p>
<h3 id="articleHeader9">其他情况下的强制转换</h3>
<p>在编码时，可能会遇到更多强制转换的情况，比如这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = {};
const bar = {};
const x = {};
 
x[foo] = 'foo';
x[bar] = 'bar';
 
console.log(x[foo]); // &quot;bar&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> foo = {};
<span class="hljs-keyword">const</span> bar = {};
<span class="hljs-keyword">const</span> x = {};
 
x[foo] = <span class="hljs-string">'foo'</span>;
x[bar] = <span class="hljs-string">'bar'</span>;
 
<span class="hljs-built_in">console</span>.log(x[foo]); <span class="hljs-comment">// "bar"</span></code></pre>
<p>发生这种情况是因为 <code>foo</code> 和 <code>bar</code> 在转换为字符串的结果均为 <code>“[object Object]”</code>。就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x[bar.toString()] = 'bar';
x[&quot;[object Object]&quot;]; // &quot;bar&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">x[bar.toString()] = <span class="hljs-string">'bar'</span>;
x[<span class="hljs-string">"[object Object]"</span>]; <span class="hljs-comment">// "bar"</span></code></pre>
<p>使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" rel="nofollow noreferrer" target="_blank">模板字符串</a>的时候也会发生强制转换，在下面例子中重写 <code>toString</code> 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Dog = function(name) {
  this.name = name;
}
Dog.prototype.toString = function() {
  return this.name;
}
 
const dog = new Dog('Fluffy');
console.log(`${dog} is a good dog!`); // &quot;Fluffy is a good dog!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Dog = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Dog.prototype.toString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
 
<span class="hljs-keyword">const</span> dog = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'Fluffy'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${dog}</span> is a good dog!`</span>); <span class="hljs-comment">// "Fluffy is a good dog!"</span></code></pre>
<p>正因为如此，<strong>宽松相等</strong>（==）被认为是一种不好的做法，如果两边类型不一致，就会试图进行强制隐式转换。</p>
<p>看下面这个有趣的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = new String('foo');
const foo2 = new String('foo');
 
foo === foo2 // false
foo >= foo2 // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'foo'</span>);
<span class="hljs-keyword">const</span> foo2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'foo'</span>);
 
foo === foo2 <span class="hljs-comment">// false</span>
foo &gt;= foo2 <span class="hljs-comment">// true</span></code></pre>
<p>在这里我们使用了 <code>new</code> 关键字，所以 <code>foo</code> 和 <code>foo2</code> 都是字符串包装类型，原始值都是 <code>foo</code> 。但是，它们现在引用了两个不同的对象，所以 <code>foo === foo2</code> 将返回 <code>false</code>。这里的关系运算符 <code>&gt;=</code> 会在两个操作数上调用 <code>valueOf</code> 函数，因此比较的是它们的原始值，<code>'foo' &gt; = 'foo'</code> 的结果为 <code>true</code>。</p>
<h2 id="articleHeader10">[1] + [2] - [3] === 9</h2>
<p>希望这些知识都能帮助揭开这个题目的神秘面纱</p>
<ol>
<li>
<p><code>[1] + [2]</code> 将调用 <code>Array.prototype.toString</code> 转换为字符串，然后进行字符串拼接。结果将是 <code>“12”</code></p>
<ul><li>
<code>[1,2] + [3,4]</code> 的值讲师 <code>“1,23,4”</code>
</li></ul>
</li>
<li>
<p><code>12 - [3]</code>，减号运算符会将值转换为 Number 类型，所以等于 <code>12-3</code>，结果为 <code>9</code></p>
<ul><li>12 - [3,4] 的值是 <code>NaN</code>，因为<code>"3,4"</code> 不能被转换为 Number</li></ul>
</li>
</ol>
<h2 id="articleHeader11">总结</h2>
<p>尽管很多人会建议尽量避免强制隐式转换，但了解它的工作原理非常重要，在调试代码和避免错误方面大有帮助。</p>
<p>【译文完】</p>
<h2 id="articleHeader12">再谈点，关于宽松相等和原始值</h2>
<p>这里看另一道题目，在 JavaScript 环境下，能否让表达式 <code>a == true &amp;&amp; a == false</code> 为 <code>true</code>。</p>
<p>就像下面这样，在控制台打印出 <code>’yeah'</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// code here
if (a == true &amp;&amp; a == false) {
    console.log('yeah');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// code here</span>
<span class="hljs-keyword">if</span> (a == <span class="hljs-literal">true</span> &amp;&amp; a == <span class="hljs-literal">false</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'yeah'</span>);
}</code></pre>
<p>关于宽松相等（==），先看看 ECMA 5.1 的规范，包含 <code>toPrimitive</code>:</p>
<ul>
<li>
<a href="http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3" rel="nofollow noreferrer" target="_blank">11.9.3</a> The Abstract Equality Comparison Algorithm</li>
<li>
<a href="http://www.ecma-international.org/ecma-262/5.1/#sec-9.1" rel="nofollow noreferrer" target="_blank">9.1</a> ToPrimitive</li>
</ul>
<h3 id="articleHeader13">稍作总结</h3>
<p>规范很长很详细，简单总结就是，对于下述表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x == y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">x == y</code></pre>
<ul>
<li>类型相同，判断的就是 x === y</li>
<li>
<p>类型不同</p>
<ul>
<li>如果 x，y 其中一个是布尔值，将这个布尔值进行 ToNumber 操作</li>
<li>如果 x，y 其中一个是字符串，将这个字符串进行 ToNumber 操作</li>
<li>若果 x，y 一方为对象，将这个对象进行 ToPrimitive 操作</li>
</ul>
</li>
</ul>
<p>至于 <code>ToPrimitive</code>，即求原始值，可以简单理解为进行 <code>valueOf()</code> 和 <code>toString()</code> 操作。</p>
<p>稍后我们再详细剖析，接下来先看一个问题。</p>
<h3 id="articleHeader14">Question：是否存在这样一个变量，满足 x == !x</h3>
<p>就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// code here
if (x == !x) {
    console.log('yeah');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// code here</span>
<span class="hljs-keyword">if</span> (x == !x) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'yeah'</span>);
}</code></pre>
<p>可能很多人会想到下面这个，毕竟我们也曾热衷于各种奇技淫巧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[] == ![] // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[] == ![] <span class="hljs-comment">// true</span></code></pre>
<p>但答案绝不仅仅局限于此，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = new Boolean(false);

if (x == !x) {
    console.log('yeah');
}
// x.valueOf() -> false
// x is a object, so: !x -> false


var y = new Number(0);
y == !y // true
// y.valueOf() -> 0
// !y -> false
// 0 === Number(false) // true
// 0 == false // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">false</span>);

<span class="hljs-keyword">if</span> (x == !x) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'yeah'</span>);
}
<span class="hljs-comment">// x.valueOf() -&gt; false</span>
<span class="hljs-comment">// x is a object, so: !x -&gt; false</span>


<span class="hljs-keyword">var</span> y = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">0</span>);
y == !y <span class="hljs-comment">// true</span>
<span class="hljs-comment">// y.valueOf() -&gt; 0</span>
<span class="hljs-comment">// !y -&gt; false</span>
<span class="hljs-comment">// 0 === Number(false) // true</span>
<span class="hljs-comment">// 0 == false // true</span></code></pre>
<p>理解这个问题，那下面的这些例子都不是问题了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[] == ![]
[] == {}
[] == !{}
{} == ![]
{} == !{}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[] == ![]
[] == {}
[] == !{}
{} == ![]
{} == !{}</code></pre>
<p>在来看看什么是 <code>ToPrimitive</code></p>
<h3 id="articleHeader15">ToPrimitive</h3>
<p>看规范：<a href="http://www.ecma-international.org/ecma-262/5.1/#sec-8.12.8" rel="nofollow noreferrer" target="_blank">8.12.8</a> <code>[[DefaultValue]] (hint)</code></p>
<p>如果是 <code>Date</code> 求原始值，则 hint 是 <code>String</code>，其他均为 <code>Number</code>，即先调用 <code>valueOf()</code> 再调用 <code>toString()</code>。</p>
<p>如果 hint 为 <code>Number</code>，具体过程如下：</p>
<ol>
<li>调用对象的 <code>valueOf()</code> 方法，如果值是原值则返回</li>
<li>否则，调用对象的 <code>toString()</code> 方法，如果值是原值则返回</li>
<li>否则，抛出 TypeError 错误</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// valueOf 和 toString 的调用顺序
var a = {
    valueOf() {
        console.log('valueof')
        return []
    },
    toString() {
        console.log('toString')
        return {}
    }
}

a == 0
// valueof
// toString
// Uncaught TypeError: Cannot convert object to primitive value


// Date 类型先 toString，后 valueOf
var t = new Date('2018/04/01');
t.valueOf = function() {
    console.log('valueof')
    return []
}
t.toString = function() {
    console.log('toString')
    return {}
}
t == 0
// toString
// valueof
// Uncaught TypeError: Cannot convert object to primitive value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// valueOf 和 toString 的调用顺序</span>
<span class="hljs-keyword">var</span> a = {
    valueOf() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'valueof'</span>)
        <span class="hljs-keyword">return</span> []
    },
    toString() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'toString'</span>)
        <span class="hljs-keyword">return</span> {}
    }
}

a == <span class="hljs-number">0</span>
<span class="hljs-comment">// valueof</span>
<span class="hljs-comment">// toString</span>
<span class="hljs-comment">// Uncaught TypeError: Cannot convert object to primitive value</span>


<span class="hljs-comment">// Date 类型先 toString，后 valueOf</span>
<span class="hljs-keyword">var</span> t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2018/04/01'</span>);
t.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'valueof'</span>)
    <span class="hljs-keyword">return</span> []
}
t.toString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'toString'</span>)
    <span class="hljs-keyword">return</span> {}
}
t == <span class="hljs-number">0</span>
<span class="hljs-comment">// toString</span>
<span class="hljs-comment">// valueof</span>
<span class="hljs-comment">// Uncaught TypeError: Cannot convert object to primitive value</span></code></pre>
<p>到目前为止，上面的都是 ES5 的规范，那么在 ES6 中，有什么变化呢</p>
<h3 id="articleHeader16">ES6 中 ToPrimitive</h3>
<p><a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-toprimitive" rel="nofollow noreferrer" target="_blank">7.1.1</a>ToPrimitive ( input [, PreferredType] )</p>
<p>在 ES6 中吗，是可以自定义 <code>@@toPrimitive</code> 方法的，这是 Well-Known Symbols(<a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-well-known-symbols" rel="nofollow noreferrer" target="_blank">§6.1.5.1</a>)中的一个。JavaScript 内建了一些在 ECMAScript 5 之前没有暴露给开发者的 symbol，它们代表了内部语言行为。</p>
<p>来自 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive" rel="nofollow noreferrer" target="_blank">MDN</a> 的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 没有 Symbol.toPrimitive 属性的对象
var obj1 = {};
console.log(+obj1); // NaN
console.log(`${obj1}`); // '[object Object]'
console.log(obj1 + ''); // '[object Object]'

// 拥有 Symbol.toPrimitive 属性的对象
var obj2 = {
    [Symbol.toPrimitive](hint) {
        if (hint == 'number') {
            return 10;
        }
        if (hint == 'string') {
            return 'hello';
        }
        return true;
    }
};
console.log(+obj2); // 10 -- hint is 'number'
console.log(`${obj2}`); // 'hello' -- hint is 'string'
console.log(obj2 + ''); // 'true' -- hint is 'default'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 没有 Symbol.toPrimitive 属性的对象</span>
<span class="hljs-keyword">var</span> obj1 = {};
<span class="hljs-built_in">console</span>.log(+obj1); <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${obj1}</span>`</span>); <span class="hljs-comment">// '[object Object]'</span>
<span class="hljs-built_in">console</span>.log(obj1 + <span class="hljs-string">''</span>); <span class="hljs-comment">// '[object Object]'</span>

<span class="hljs-comment">// 拥有 Symbol.toPrimitive 属性的对象</span>
<span class="hljs-keyword">var</span> obj2 = {
    [<span class="hljs-built_in">Symbol</span>.toPrimitive](hint) {
        <span class="hljs-keyword">if</span> (hint == <span class="hljs-string">'number'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
        }
        <span class="hljs-keyword">if</span> (hint == <span class="hljs-string">'string'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
};
<span class="hljs-built_in">console</span>.log(+obj2); <span class="hljs-comment">// 10 -- hint is 'number'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${obj2}</span>`</span>); <span class="hljs-comment">// 'hello' -- hint is 'string'</span>
<span class="hljs-built_in">console</span>.log(obj2 + <span class="hljs-string">''</span>); <span class="hljs-comment">// 'true' -- hint is 'default'</span></code></pre>
<p>有了上述铺垫，答案就呼之欲出了</p>
<h3 id="articleHeader17">
<code>a == true &amp;&amp; a == false</code> 为 <code>true</code> 的答案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    flag: false,
    toString() {
        return this.flag = !this.flag;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">flag</span>: <span class="hljs-literal">false</span>,
    toString() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.flag = !<span class="hljs-keyword">this</span>.flag;
    }
}</code></pre>
<p>或者使用 <code>valueOf()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    flag: false,
    valueOf() {
        return this.flag = !this.flag;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">flag</span>: <span class="hljs-literal">false</span>,
    valueOf() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.flag = !<span class="hljs-keyword">this</span>.flag;
    }
}</code></pre>
<p>或者是直接改变 ToPrimitive 行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 其实只需设置 default 即可
var a = {
    flag: false,
    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return 10
        }
        if (hint === 'string') {
            return 'hello'
        }
        return this.flag = !this.flag
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 其实只需设置 default 即可</span>
<span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">flag</span>: <span class="hljs-literal">false</span>,
    [<span class="hljs-built_in">Symbol</span>.toPrimitive](hint) {
        <span class="hljs-keyword">if</span> (hint === <span class="hljs-string">'number'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>
        }
        <span class="hljs-keyword">if</span> (hint === <span class="hljs-string">'string'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.flag = !<span class="hljs-keyword">this</span>.flag
    }
}</code></pre>
<h3 id="articleHeader18">如果是严格相等呢</h3>
<p>这个问题在严格相等的情况下，也是能够成立的，这又是另外的知识点了，使用 <code>defineProperty</code> 就能实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let flag = false
Object.defineProperty(window, 'a', {
    get() {
        return (flag = !flag)
    }
})

if (a === true &amp;&amp; a === false) {
    console.log('yeah');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> flag = <span class="hljs-literal">false</span>
<span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">window</span>, <span class="hljs-string">'a'</span>, {
    get() {
        <span class="hljs-keyword">return</span> (flag = !flag)
    }
})

<span class="hljs-keyword">if</span> (a === <span class="hljs-literal">true</span> &amp;&amp; a === <span class="hljs-literal">false</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'yeah'</span>);
}</code></pre>
<h3 id="articleHeader19">阅读更多</h3>
<ul><li><a href="https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true" rel="nofollow noreferrer" target="_blank">Can (a== 1 &amp;&amp; a ==2 &amp;&amp; a==3) ever evaluate to true?</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
魔幻语言 JavaScript 系列之类型转换、宽松相等以及原始值

## 原文链接
[https://segmentfault.com/a/1190000014324580](https://segmentfault.com/a/1190000014324580)


---
title: '译：用let 和 const 来指导JavaScript 的变量提升' 
date: 2018-12-21 2:30:11
hidden: true
slug: 2mpfdcy0nud
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV0Nsd?w=800&amp;h=450" src="https://static.alili.tech/img/bV0Nsd?w=800&amp;h=450" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>最近在<a href="https://medium.com/" rel="nofollow noreferrer" target="_blank">Medium</a>上看到一篇关于“变量提升”的文章，原文在此：<a href="https://medium.freecodecamp.org/what-is-variable-hoisting-differentiating-between-var-let-and-const-in-es6-f1a70bb43d" rel="nofollow noreferrer" target="_blank">《A guide to JavaScript variable hoisting with let and const》</a>。为了培养自己看英文文档习惯且看懂的需要，就翻译一下。谈不上精确，欢迎指正。</p>
<p>对于刚入门的JavaScript开发者时常难以理解“变量/方法”提升（hoisting）的独特行为。<br>接下来我们要谈论var，let，const声明，那么先了解变量提升就显得更为重要了。那就开始吧。</p>
<p><span class="img-wrap"><img data-src="/img/bV0Ntq?w=245&amp;h=225" src="https://static.alili.tech/img/bV0Ntq?w=245&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">什么是变量提升？</h2>
<p>JavaScript引擎用“var”处理所有变量声明，不管在哪里声明，最后都会在函数作用域顶端（如果在函数内部声明）或则在全局作用域顶端（在函数外部声明）。这就是“提升”。<br>因此变量实际上可能在声明它之前就已经被引擎获得了。<br><span class="img-wrap"><img data-src="/img/bV0Nur?w=460&amp;h=196" src="https://static.alili.tech/img/bV0Nur?w=460&amp;h=196" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在实际操作中看看效果..</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// OUTPUT : undefined
console.log(shape);
var shape = square;
// OUTPUT : square
console.log(shape);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// OUTPUT : undefined</span>
<span class="hljs-built_in">console</span>.log(shape);
<span class="hljs-keyword">var</span> shape = square;
<span class="hljs-comment">// OUTPUT : square</span>
<span class="hljs-built_in">console</span>.log(shape);</code></pre>
<p>如果你来自C语言，你认为在第一个console.log那里就会抛出变量未定义的错误。但JavaScript解释器预感和“提升”所有变量声明到作用域顶端，并且在那进行初始化。<br>下面演示实际发生了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//declaration getting hoisted at the top
var shape;
// OUTPUT : undefined
console.log(shape);
shape = square;
// OUTPUT : square
console.log(shape);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//declaration getting hoisted at the top</span>
<span class="hljs-keyword">var</span> shape;
<span class="hljs-comment">// OUTPUT : undefined</span>
<span class="hljs-built_in">console</span>.log(shape);
shape = square;
<span class="hljs-comment">// OUTPUT : square</span>
<span class="hljs-built_in">console</span>.log(shape);</code></pre>
<p>另一个例子是用函数作用域来更清楚的展示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function getShape(condition) {
    // shape exists here with a value of undefined
    // OUTPUT : undefined
    console.log(shape);
    if (condition) {
        var shape = square;
        // some other code
        return shape;
    } else {
        // shape exists here with a value of undefined
        return false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getShape</span>(<span class="hljs-params">condition</span>) </span>{
    <span class="hljs-comment">// shape exists here with a value of undefined</span>
    <span class="hljs-comment">// OUTPUT : undefined</span>
    <span class="hljs-built_in">console</span>.log(shape);
    <span class="hljs-keyword">if</span> (condition) {
        <span class="hljs-keyword">var</span> shape = square;
        <span class="hljs-comment">// some other code</span>
        <span class="hljs-keyword">return</span> shape;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// shape exists here with a value of undefined</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
}</code></pre>
<p>上面的例子可以看出shape声明被提升到了“getShape”函数作用域的顶端。这是因为“if/else” 不能像其他语言那样，创建局部作用域。在JavaScript里，函数作用域实际上就是局部作用域了。因此，“shape”可以在if块之外，函数作用域内任意访问，且值为“undefined”。</p>
<p>JavaScript的这个默认行为，既是优点，又是缺点。没有完全掌握的话，会给我们的代码带来细微且危险的bugs。</p>
<h2 id="articleHeader1">进入块级作用域！</h2>
<p><span class="img-wrap"><img data-src="/img/bV0Nvp?w=456&amp;h=308" src="https://static.alili.tech/img/bV0Nvp?w=456&amp;h=308" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>ES6 引入了块级作用域，这让开发者对变量有了更多的控制，且让变量有灵活的生命周期。<br>块级声明在块级/词法作用域里面声明，他们在“{}”中被创建。</p>
<h2 id="articleHeader2">let声明</h2>
<p>“let”语法跟“var”相似，只是用“let”标识符来替换“var”标识符进行变量声明，其作用域范围仅仅在声明的那个代码块。<br>let声明放在块的顶端，因此只能在那个块级作用域中访问。<br>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getShape(condition) {
  // shape doesn't exist here
  // console.log(shape); ReferenceError: shape is not defined
  if (condition) {
    let shape = square;
    // some other code
    return shape;
  } else {
    // shape doesn't exist here as well
    return false;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getShape</span>(<span class="hljs-params">condition</span>) </span>{
  <span class="hljs-comment">// shape doesn't exist here</span>
  <span class="hljs-comment">// console.log(shape); ReferenceError: shape is not defined</span>
  <span class="hljs-keyword">if</span> (condition) {
    <span class="hljs-keyword">let</span> shape = square;
    <span class="hljs-comment">// some other code</span>
    <span class="hljs-keyword">return</span> shape;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// shape doesn't exist here as well</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}</code></pre>
<p>注意shape只存在if块中，当在if块外面访问时会抛出一个错误，而不是象我们之前用var声明那样输出“undefined”。<br>提示：在同一个作用域内，如果已经使用var标识符声明了变量，同时又用let标识符声明同名变量时会抛出错误。<br>但是，如果在let声明的变量作用域外，声明同名变量是不会报错的。（这种情况也同样适用于我们即将谈论的const声明。）<br>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shape = square;

let shape = rectangle;
// SyntaxError: Identifier 'shape' has already been declared" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> shape = square;

<span class="hljs-keyword">let</span> shape = rectangle;
<span class="hljs-comment">// SyntaxError: Identifier 'shape' has already been declared</span></code></pre>
<p>和</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shape = square;
if (condition) {
  // doesn't throw an error
  let shape = rectangle;
  // more code 
}
// No error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> shape = square;
<span class="hljs-keyword">if</span> (condition) {
  <span class="hljs-comment">// doesn't throw an error</span>
  <span class="hljs-keyword">let</span> shape = rectangle;
  <span class="hljs-comment">// more code </span>
}
<span class="hljs-comment">// No error</span></code></pre>
<h2 id="articleHeader3">const声明</h2>
<p>const声明语法与let和var相似，生命周期与let相同，但你还要注意一些规则。<br>用const声明的变量将像<strong>常量</strong>看待，因此<strong>它们的值在定义后是不可以修改的</strong>。由于这样，每个const变量都<strong>必须在声明的同时进行初始化</strong>。<br>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// valid 
const shape = triangle;
// syntax error: missing initialization
const color;
// TypeError: Assignment to constant variable
shape = square;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// valid </span>
<span class="hljs-keyword">const</span> shape = triangle;
<span class="hljs-comment">// syntax error: missing initialization</span>
<span class="hljs-keyword">const</span> color;
<span class="hljs-comment">// TypeError: Assignment to constant variable</span>
shape = square;</code></pre>
<p><strong>然而</strong>，这个规则在声明对象时有点不同。对象属性的值可以被修改！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const shape = {
    name: triangle,
    sides: 3
}
// WORKS
shape.name = square;
shape.sides = 4;
// SyntaxError: Invalid shorthand property initializer
shape = {
    name: hexagon,
    sides: 6
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">const</span> shape = {
    <span class="hljs-attr">name</span>: triangle,
    <span class="hljs-attr">sides</span>: <span class="hljs-number">3</span>
}
<span class="hljs-comment">// WORKS</span>
shape.name = square;
shape.sides = <span class="hljs-number">4</span>;
<span class="hljs-comment">// SyntaxError: Invalid shorthand property initializer</span>
shape = {
    <span class="hljs-attr">name</span>: hexagon,
    <span class="hljs-attr">sides</span>: <span class="hljs-number">6</span>
}</code></pre>
<p>在上面的例子中，我们可以看到shape对象属性的值可以被修改，因为我们只改变shape包含的,而不是它本身。<br>我们可以总结说，const可以防止整个绑定的修改，而不是绑定的值。<br>提示：属性可以改变。所以对于真正不可变的，请使用<em>Immutable.js</em>或<em>Mori</em>。</p>
<h2 id="articleHeader4">暂时性死区</h2>
<p>我们都知道，如果我们在使用let，const声明定义的变量之前就使用这些变量，会抛出ReferenceError错误。 在进入作用域和不能访问的这段时间，我们称为暂时性死区。<br>提示：“暂时性死区”不是ECMAScript规范里的正式定义，它只是在程序员中广为流行而已。<br><span class="img-wrap"><img data-src="/img/bV0Nxg?w=245&amp;h=245" src="https://static.alili.tech/img/bV0Nxg?w=245&amp;h=245" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我个人推荐总是使用const，因为它不容易出错。我还没遇到需要使用var的情况。<br>作为基本规则，只在循环计数器中，或则你真的需要给变量从新赋值时用let。其他地方，用const。我已经放弃使用循环，转而选择使用filter,map,reduce等方法。你也应该如此。</p>
<p>后记，此作者还有一篇关于方法提升的文章，到时候在搬来。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
译：用let 和 const 来指导JavaScript 的变量提升

## 原文链接
[https://segmentfault.com/a/1190000012544497](https://segmentfault.com/a/1190000012544497)


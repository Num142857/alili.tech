---
title: '理解ES6中的暂时死区(TDZ)' 
date: 2019-01-27 2:30:59
hidden: true
slug: b5ayrtvdtpe
categories: [reprint]
---

{{< raw >}}

                    
<p>Temporal Dead Zone(TDZ)是ES6(ES2015)中对作用域新的专用语义。TDZ名词并没有明确地写在ES6的标准文件中，一开始是出现在<a href="https://esdiscuss.org/" rel="nofollow noreferrer" target="_blank">ES Discussion</a>讨论区中，是对于某些遇到在区块作用域绑定早于声明语句时的状况时，所使用的专用术语。</p>
<p>以英文名词来说明，Temporal是"时间的、暂时的"意义，Dead Zone则是"死区"，意指"电波达不到的区域"。所以TDZ可以翻为"时间上暂时的无法达到的区域"，简称为"时间死区"或"暂时死区"。</p>
<h2 id="articleHeader0">let/const与var</h2>
<p>在ES6的新特性中，最容易看到TDZ作用就是在let/const的使用上，let/const与var的主要不同有两个地方:</p>
<ul>
<li><p>let/const是使用区块作用域；var是使用函数作用域</p></li>
<li><p>在let/const声明之前就访问对应的变量与常量，会抛出<code>ReferenceError</code>错误；但在var声明之前就访问对应的变量，则会得到<code>undefined</code></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(aVar) // undefined
console.log(aLet) // causes ReferenceError: aLet is not defined
var aVar = 1
let aLet = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(aVar) <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(aLet) <span class="hljs-comment">// causes ReferenceError: aLet is not defined</span>
<span class="hljs-keyword">var</span> aVar = <span class="hljs-number">1</span>
<span class="hljs-keyword">let</span> aLet = <span class="hljs-number">2</span></code></pre>
<p>根据ES6标准中对于let/const声明的章节<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations" rel="nofollow noreferrer" target="_blank">13.3.1</a>，有以下的文字说明:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable’s LexicalBinding is evaluated." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;">The variables are created <span class="hljs-keyword">when</span> their containing Lexical Environment <span class="hljs-keyword">is</span> instantiated but may <span class="hljs-keyword">not</span> be accessed <span class="hljs-keyword">in</span> any way <span class="hljs-keyword">until</span> the <span class="hljs-keyword">variable</span>’s LexicalBinding <span class="hljs-keyword">is</span> evaluated.</code></pre>
<p>意思是说由let/const声明的变量，当它们包含的词法环境(Lexical Environment)被实例化时会被创建，但只有在变量的词法绑定(LexicalBinding)已经被求值运算后，才能够被访问。</p>
<blockquote><p>注: 这里指的"变量"是let/const两者，const在ES6定义中是constant variable(固定的变量)的意思。</p></blockquote>
<p>说得更明白些，当程序的控制流程在新的作用域(module, function或block作用域)进行实例化时，在此作用域中的用let/const声明的变量会先在作用域中被创建出来，但因此时还未进行词法绑定，也就是对声明语句进行求值运算，所以是不能被访问的，访问就会抛出错误。所以在这运行流程一进入作用域创建变量，到变量开始可被访问之间的一段时间，就称之为TDZ(暂时死区)。</p>
<p>以上面解说来看，以let/const声明的变量，的确也是有提升(hoist)的作用。这个是很容易被误解的地方，实际上以let/const声明的变量也是会有提升(hoist)的作用。提升是JS语言中对于变量声明的基本特性，只是因为TDZ的作用，并不会像使用var来声明变量，只是会得到<code>undefined</code>而已，现在则是会直接抛出<code>ReferenceError</code>错误，而且很明显的这是一个在运行期间才会出现的错误。</p>
<p>用一个简单的例子来说明let声明的变量会在作用域中被提升，就像下面这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = 'outer value'

(function() {
  // 这里会产生 TDZ for x
  console.log(x) // TDZ期间访问，产生ReferenceError错误
  let x = 'inner value' // 对x的声明语句，这里结束 TDZ for x
}())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x = <span class="hljs-string">'outer value'</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 这里会产生 TDZ for x</span>
  <span class="hljs-built_in">console</span>.log(x) <span class="hljs-comment">// TDZ期间访问，产生ReferenceError错误</span>
  <span class="hljs-keyword">let</span> x = <span class="hljs-string">'inner value'</span> <span class="hljs-comment">// 对x的声明语句，这里结束 TDZ for x</span>
}())</code></pre>
<p>在例子中的IIFE里的函数作用域，变量x在作用域中会先被提升到函数区域中的最上面，但这时会产生TDZ，如果在程序流程还未运行到x的声明语句时，算是在TDZ作用的期间，这时候访问x的值，就会抛出<code>ReferenceError</code>错误。</p>
<p>在let与const声明的章节<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations" rel="nofollow noreferrer" target="_blank">13.3.1</a>接着的几句，说明有关变量是如何进行初始化的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer’s AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">A <span class="hljs-built_in">variable</span> defined <span class="hljs-keyword">by</span> <span class="hljs-keyword">a</span> LexicalBinding <span class="hljs-keyword">with</span> <span class="hljs-keyword">an</span> Initializer is assigned <span class="hljs-keyword">the</span> <span class="hljs-built_in">value</span> <span class="hljs-keyword">of</span> its Initializer’s AssignmentExpression when <span class="hljs-keyword">the</span> LexicalBinding is evaluated, <span class="hljs-keyword">not</span> when <span class="hljs-keyword">the</span> <span class="hljs-built_in">variable</span> is created. If <span class="hljs-keyword">a</span> LexicalBinding <span class="hljs-keyword">in</span> <span class="hljs-keyword">a</span> let declaration does <span class="hljs-keyword">not</span> have <span class="hljs-keyword">an</span> Initializer <span class="hljs-keyword">the</span> <span class="hljs-built_in">variable</span> is assigned <span class="hljs-keyword">the</span> <span class="hljs-built_in">value</span> undefined when <span class="hljs-keyword">the</span> LexicalBinding is evaluated.</code></pre>
<p>这几句比较重点的部份是关于初始化的过程。以let/const声明的变量或常量，必需是经过对声明的赋值语句的求值后，才算初始化完成，创建时并不算初始化。如果以let声明的变量没有赋给初始值，那么就赋值给它<code>undefined</code>值。也就是经过初始化的完成，才代表着TDZ期间的真正结束，这些在作用域中的被声明的变量才能够正常地被访问。</p>
<p>下面这个例子是一个未初始化完成的结果，它一样是在TDZ中，也是会抛出<code>ReferenceError</code>错误:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = x" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> x = x</code></pre>
<p>因为右值(要被赋的值)，它在此时是一个还未被初始化完成的变量，实际上我们就在这一个同一表达式中要初始化它。</p>
<blockquote>
<p>注: TDZ最一开始是为了const所设计的，但后来的对let的设计也是一致的，例子中都用let来说明会比较容易。</p>
<p>注: 在ES6标准中，对于const所声明的识别子仍然也经常为variable(变量)，称为constant variable(固定的变量)。以const声明所创建出来的常量，在JS中只是不能再被赋(can't re-assignment)，并不是不可被改变(immutable)的，这两种概念仍然有很大的差异。</p>
</blockquote>
<h2 id="articleHeader1">函数的传参预设值</h2>
<p>TDZ作用在ES6中，很明确的就是与区块作用域(block scope)，以及变量/常量的要如何被初始化有关。实际上在许多ES6新特性中都有出现TDZ作用，而另一个常会被提及的是函数的传参预设值中的TDZ作用。</p>
<p>下面的例子可以看到在传参预设值的识别名称，在未经初始化(有赋到值)时，它会进入TDZ而产生错误，而这个错误是只有在函数调用时，要使用到传参预设值时才会出现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(x = y, y = 1) {
  console.log(y)
}

foo(1) // 这不会有错误
foo(undefined, 1) // 错误 ReferenceError: y is not defined
foo() // 错误 ReferenceError: y is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x = y, y = <span class="hljs-number">1</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(y)
}

foo(<span class="hljs-number">1</span>) <span class="hljs-comment">// 这不会有错误</span>
foo(<span class="hljs-literal">undefined</span>, <span class="hljs-number">1</span>) <span class="hljs-comment">// 错误 ReferenceError: y is not defined</span>
foo() <span class="hljs-comment">// 错误 ReferenceError: y is not defined</span></code></pre>
<p>从这个例子可以知道TDZ的作用，实际上在ES6中到处都有类似的作用。</p>
<p>传参预设值有另一个作用域的议题会被讨论，就是对于传参预设值的作用域，到底是属于"全局作用域"还是"函数中的作用域"的议题，目前看到比较常见的说法是，它是处于"中介的作用域"，夹在这两者之间，但仍然会互相影响。中介的作用域的一个例子，是使用其他函数作为传参的预设值，这通常会是一个callback(回调、回呼)函数，一般的情况没什么特别，但涉及作用域时互相影响的情况下会不易理解。下面这个例子<a href="http://dmitrysoshnikov.com/ecmascript/es6-notes-default-values-of-parameters/#conditional-intermediate-scope-for-parameters" rel="nofollow noreferrer" target="_blank">来自这里</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = 1

function foo(a = 1, b = function(){ x = 2 }){
  let x = 3
  b()
  console.log(x)
}

foo()

console.log(x)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a = <span class="hljs-number">1</span>, b = function(</span>)</span>{ x = <span class="hljs-number">2</span> }){
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">3</span>
  b()
  <span class="hljs-built_in">console</span>.log(x)
}

foo()

<span class="hljs-built_in">console</span>.log(x)</code></pre>
<p>这个例子中的最后结果，在函数foo中输出的x值到底是1、2还是3？另外，在最外围作用域的x最后会被改变吗？</p>
<p>函数中的x输出结果不可能是1，这是很明确的，因为函数区块中有另一个x的声明与赋值<code>let x = 3</code>语句，这两个都有可能被运行产生作用。剩下的是传参预设值中的那个函数，是不是会变量到函数区块中的x值的问题。另一个是，在全局中的那个x变量，会不会被改变，这也是一个问题。</p>
<p>按照这个例子的出处文档的说明，作者认为答案是3与1。但是根据我的实验，下面的几个浏览器与编译器并不是这样认为:</p>
<ul>
<li><p>babel编译器: 2与1</p></li>
<li><p>Closure Compiler: 3与2</p></li>
<li><p>Google Chrome(v55): 3与2</p></li>
<li><p>Firefox(v50): 2与1</p></li>
<li><p>Edge(v38): 3与2</p></li>
</ul>
<p>实际测试的结果，怎么都不会有3与1的答案，要不就3与2，要不就2与1。</p>
<p>3与2的答案是让b传参的<code>x = 2</code>运行出来，但因为受到中介作用域的影响，因此干扰不到函数中的原本区块中的作用域，但会影响到全局中的x变量。也就是基本上认定函数预设值中的那个callback中的作用域与全局(或外层)有关系。</p>
<p>2与1的答案则是倒过来，只会影响到函数中的区块，对全局(或外层)没有影响。</p>
<p>所以除非中介作用域，有自己独立的作用域，完全与函数区块中的作用域与全局都不相干，才有可能产生3与1的结果，这是这篇文档的作者所认为的。</p>
<p>这个函数预设值的作用域因为实作不同，造成两种不同的结果，但如果以Chrome(v55)与Firefox(v50)来实验，在TDZ期间的抛出错误的行为基本上会一致，但Firefox有两种不同的错误消息，例如下面的几个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Chrome: ReferenceError: x is not defined
// Firefox: ReferenceError: x is not defined
function foo(a = 1, b = function(){ let x = 2 }){
  b()
  console.log(x)
}
foo()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Chrome: ReferenceError: x is not defined</span>
<span class="hljs-comment">// Firefox: ReferenceError: x is not defined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a = <span class="hljs-number">1</span>, b = function(</span>)</span>{ <span class="hljs-keyword">let</span> x = <span class="hljs-number">2</span> }){
  b()
  <span class="hljs-built_in">console</span>.log(x)
}
foo()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Chrome: ReferenceError: x is not defined
// Firefox: ReferenceError: can't access lexical declaration `x' before initialization
function foo(a = 1, b = function(){ x = 2 }){
  b()
  console.log(x)
}
foo()
let x = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Chrome: ReferenceError: x is not defined</span>
<span class="hljs-comment">// Firefox: ReferenceError: can't access lexical declaration `x' before initialization</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a = <span class="hljs-number">1</span>, b = function(</span>)</span>{ x = <span class="hljs-number">2</span> }){
  b()
  <span class="hljs-built_in">console</span>.log(x)
}
foo()
<span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Chrome: ReferenceError: x is not defined
// Firefox: ReferenceError: can't access lexical declaration `x' before initialization
function foo(a = 1, b = function(){ x = 2 }){
  b()
  console.log(x)
  let x = 3
}
foo()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Chrome: ReferenceError: x is not defined</span>
<span class="hljs-comment">// Firefox: ReferenceError: can't access lexical declaration `x' before initialization</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a = <span class="hljs-number">1</span>, b = function(</span>)</span>{ x = <span class="hljs-number">2</span> }){
  b()
  <span class="hljs-built_in">console</span>.log(x)
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">3</span>
}
foo()</code></pre>
<p>不管如何，这个作用域的影响仍然是有争议的，目前并没有统一的答案。这代表ES6虽然标准定好了，但里面的一些新特性仍然有实作细节的差异，未来有可能这些差异才会慢慢一致。但对一般的开发者来说，因为知道了有这些情况，所以要尽量避免，以免产生不兼容的情况。</p>
<p>要如何避免这种情况？最重要的就是，"不要在传参预设值中作有副作用的运算"，上面的<code>function(){ x = 2 }</code>是有副作用的，它有可能会改变函数区块中，或是全局中的同名称变量，而在整个代码中，可能会互相影响的作用域彼此间，避免使用同样识别名称的变量，这也是一个很基本的撰写规则。</p>
<blockquote><p>注: 本节的内容可以参考这几篇文档<a href="http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/" rel="nofollow noreferrer" target="_blank">TEMPORAL DEAD ZONE (TDZ) DEMYSTIFIED</a>、<a href="http://dmitrysoshnikov.com/ecmascript/es6-notes-default-values-of-parameters/#tdz-temporal-dead-zone-for-parameters" rel="nofollow noreferrer" target="_blank">ES6 Notes: Default values of parameters</a>与这个<a href="https://github.com/google/traceur-compiler/issues/1376" rel="nofollow noreferrer" target="_blank">Default parameters intermediate scope</a>讨论文。</p></blockquote>
<h2 id="articleHeader2">TDZ的其它议题(陷阱)</h2>
<h3 id="articleHeader3">typeof语句</h3>
<p>对TDZ期间中的变量/常量作任何的访问动作，一律会抛出错误，使用<code>typeof</code>的语句也一样。如下面的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof x // &quot;undefined&quot;

{
  // TDZ
  typeof x // ReferenceError
  let x = 42
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span> x <span class="hljs-comment">// "undefined"</span>

{
  <span class="hljs-comment">// TDZ</span>
  <span class="hljs-keyword">typeof</span> x <span class="hljs-comment">// ReferenceError</span>
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">42</span>
}</code></pre>
<p>但有些开发者会认为像<code>typeof</code>这样的语句，需要被用来判断变量是否存在，不应该是导致抛出错误，所以有部份反对的声音，认为它让<code>typeof</code>语句变得不安全，会造成使用上的陷阱。实际上这原本就是TDZ的设计，变量本来就不该在没声明完成前访问，这是为了让JS运行更为合理的改善设计，只是之前JS在这一部份是有缺陷的作法，实际上会用<code>typeof</code>与undefined来判别变量/常量存在与否的方式，通常是对于全局变量的才会作的事情。</p>
<h3 id="articleHeader4">TDZ期间抛出的错误是运行阶段的错误</h3>
<p>TDZ期间所抛出的错误，是一种运行阶段的错误，因为TDZ除了作用域的绑定过程外，还需要有变量/常量初始化的过程，才会创建出TDZ的期间。下面两个例子就可以看到TDZ的错误需要真正运行到才会出现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个例子会有因TDZ抛出的错误
function f() { return x }
f() // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 这个例子会有因TDZ抛出的错误</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> x }
f() <span class="hljs-comment">// ReferenceError</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个例子不会有错误
function f() { return x }
let x = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 这个例子不会有错误</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> x }
<span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span></code></pre>
<p>那这会有什么问题出现？因为要能侦测出代码中的因TDZ造成的错误，唯有透过静态的代码分析工具，或是要真正调用到函数运行里面的代码，才会产生错误，这将会让TDZ在编译工具中实作变得困难。</p>
<p>不过只要你理解TDZ的设计，就知道只能这样设计，初始化过程原本就只会在调用运行阶段作这事，这部份还是只能靠其它工具来补强。</p>
<h3 id="articleHeader5">支持ES6的浏览器上的运行效能</h3>
<p>在<a href="https://esdiscuss.org/topic/performance-concern-with-let-const" rel="nofollow noreferrer" target="_blank">ES Discussion</a>上对于let/const的效能很早以前就已经有些批评的，认为在浏览器上实作的结果，由于TDZ的设计，会让let相较于var的效能至少要慢5%。</p>
<p>上面这篇贴文是在4年前所发表，就算是当时的实验性质的实作在JS引擎上，没有经过优化，实际上真的效能有差这么大也不得而知。加上let本身在for回圈上有另外的花费，与var的设计不同，这两个比较当然会有所不同，是不是都是TDZ影响的也不知道。</p>
<p>以最近在讨论区中的<a href="http://stackoverflow.com/questions/21467642/is-there-a-performance-difference-between-let-and-var" rel="nofollow noreferrer" target="_blank">let与var的效能</a>比较议题来看，let的运行效率只有在某些情况下(for回圈中)会慢var很多，在基本的内部作用域测试反而是快过var的，当然这也是要视不同的浏览器与版本而定。</p>
<p>题外话是，在其它的回答中就有明确的指出，会促使加入TDZ的主因是针对const，而不是let。但最后TC39的决议是让let与const都有一致的TDZ设计。</p>
<h3 id="articleHeader6">ES6到ES5的编译</h3>
<p>ES6中的许多新式的设计仍然是很新的JS语言特性，目前ES6仍然需要依赖如babel之类的编译器，将ES6语法编译到ES5，来进行在浏览器上运行前的最后编译。</p>
<blockquote><p>这些编译器对于TDZ是会如何编译？答案是目前"并不会直接编译"。</p></blockquote>
<p>以babel来说，它预设不会编译出具有TDZ的代码，它需要额外使用<a href="https://babeljs.io/docs/plugins/transform-es2015-block-scoping/" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-es2015-block-scoping</a>或编译时的选项<code>es6.blockScopingTDZ</code>，才会将TDZ与区域作用域的功能编译出来。基本上这应该属于实验性质的，而且现在在使用上还有满多问题的。ES5标准中原本就没这种设计，所以说实在硬要使用也是麻烦，TDZ会造成的错误是运行期间的错误，对于编译器来说，在实作上也有一定的难度。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解ES6中的暂时死区(TDZ)

## 原文链接
[https://segmentfault.com/a/1190000008213835](https://segmentfault.com/a/1190000008213835)


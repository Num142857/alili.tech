---
title: '对javascript中闭包的理解' 
date: 2019-01-09 2:30:12
hidden: true
slug: 25rnu0grq2e
categories: [reprint]
---

{{< raw >}}

                    
<p>在前端开发中闭包是一个很重要的知识点，是面试中一定会被问到的内容。之前我对闭包的理解主要是"通过闭包可以在函数外部能访问到函数内部的变量"，对闭包运用的也很少，甚至自己写过闭包自己都不太清楚，只知道这样写可以解决问题。最近在梳理自己的js知识点，发现自己对js闭包理解的很不透彻，于是想全面的分析一下闭包，特别是闭包的形成原因和闭包的使用场景。</p>
<h3 id="articleHeader0">闭包的定义</h3>
<p>闭包是指有权访问另一个函数作用域中的变量的函数  --《JavaScript高级程序设计》</p>
<p>函数对象可以通过作用域关联起来，函数体内的变量都可以保存在函数作用域内，这在计算机科学文献中称为“闭包”,所有的javascirpt函数都是闭包 --《Javascript权威指南》</p>
<p>看完这些专业的定义是不是感觉一头雾水，没关系，我和一样也没明白这些定义说的是啥，咱接着往下分析。  </p>
<p>在认识闭包原理之前我们先必须对作用域、执行上下文、执行上下文堆栈、变量对象、活动对象、作用域链有着全面的认识</p>
<h4>作用域 Scope</h4>
<p>作用域是一套规则，用于确定在何处以及如何查找变量(标识符)  <br>作用域共有两种主要的工作模型：</p>
<ul>
<li><p>词法作用域：作用域是在编写代码的时候确定的</p></li>
<li><p>动态作用域：作用域是在代码运行的时候确定的</p></li>
</ul>
<p>我们知道javascript使用的是词法作用域</p>
<h4>执行上下文 Execution Contexts</h4>
<p>Javascript中代码的执行上下文分为以下三种：</p>
<ul>
<li><p>全局级别的代码 – 这个是默认的代码运行环境，一旦代码被载入，引擎最先进入的就是这个环境。</p></li>
<li><p>函数级别的代码 – 当执行一个函数时，运行函数体中的代码。</p></li>
<li><p>Eval的代码 – 在Eval函数内运行的代码。</p></li>
</ul>
<p>一个执行的上下文可以抽象的理解为一个对象。每一个执行的上下文都有一系列的属性(变量对象(variable object)，this指针(this value)，作用域链(scope chain) )</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Execution Contexts = {
    variable object：变量对象;
    this value: this指针;
    scope chain：作用域链;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>Execution Contexts = {
    <span class="hljs-keyword">variable</span> <span class="hljs-keyword">object</span>：变量对象;
    <span class="hljs-keyword">this</span> <span class="hljs-keyword">value</span>: <span class="hljs-keyword">this</span>指针;
    scope chain：作用域链;
}</code></pre>
<h4>执行上下文堆栈 Execution Contexts Stack</h4>
<p>活动的执行上下文组在逻辑上组成一个堆栈。堆栈底部永远都是全局上下文(globalContext)，而顶部就是当前(活动的)执行上下文。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
function add(num){
    var sum = 5;
    return sum + num;
}
var sum = add(4);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(num)</span></span>{
    <span class="hljs-keyword">var</span> sum = <span class="hljs-number">5</span>;
    <span class="hljs-keyword">return</span> sum + num;
}
<span class="hljs-keyword">var</span> sum = add(<span class="hljs-number">4</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当add函数被调用时，add函数执行上下文被压入执行上下文堆栈的顶端，此时执行上下文堆栈可表示为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EC Stack = [
  <add> functionContext
  globalContext
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>EC Stack = [
  &lt;<span class="hljs-keyword">add</span><span class="bash">&gt; <span class="hljs-keyword">function</span>Context
</span>  globalContext
];</code></pre>
<p>add函数执行完毕后，其执行上下文将会从执行上下文堆栈顶端弹出并被销毁。全局执行上下文只有在浏览器关闭时才会从执行上下文堆栈中销毁</p>
<h4>变量对象 Variable Object</h4>
<p>如果变量与执行上下文相关，那变量自己应该知道它的数据存储在哪里，并且知道如何访问。这种机制称为变量对象(variable object)。  <br>可以说变量对象是与执行上下文相关的数据作用域(scope of data) 。它是与执行上下文关联的特殊对象，用于存储被定义在执行上下文中的变量(variables)、函数声明(function declarations) 。  <br>当进入全局上下文时，全局上下文的变量对象可表示为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VO = {
    add: <reference to function>,
    sum: undefined,
    Math: <...>,
    String: <...>
    ...
    window: global //引用自身
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>VO = {
<span class="hljs-symbol">    add:</span> <span class="hljs-params">&lt;reference to function&gt;</span>,
<span class="hljs-symbol">    sum:</span> undefined,
<span class="hljs-symbol">    Math:</span> <span class="hljs-params">&lt;...&gt;</span>,
<span class="hljs-symbol">    String:</span> <span class="hljs-params">&lt;...&gt;</span>
    ...
<span class="hljs-symbol">    window:</span> global <span class="hljs-comment">//引用自身</span>
}</code></pre>
<h4>活动对象 Activation Object</h4>
<p>当函数被调用者激活时，这个特殊的活动对象(activation object) 就被创建了。它包含普通参数(formal parameters) 与特殊参数(arguments)对象(具有索引属性的参数映射表)。活动对象在函数上下文中作为变量对象使用。  <br>当add函数被调用时，add函数执行上下文被压入执行上下文堆栈的顶端，add函数执行上下文中活动对象可表示为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AO = {
    num: 4,
    sum :5,
    arguments:{0:4}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>AO = {
<span class="hljs-symbol">    num:</span> <span class="hljs-number">4</span>,
    sum :<span class="hljs-number">5</span>,
<span class="hljs-symbol">    arguments:</span>{<span class="hljs-number">0</span>:<span class="hljs-number">4</span>}
}</code></pre>
<h4>作用域链 Scope Chain</h4>
<p>函数上下文的作用域链在函数调用时创建的，包含活动对象AO和这个函数内部的[[scope]]属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
function foo() {
  var y = 20;
  function bar() {
    var z = 30;
    alert(x +  y + z);
  }
  bar();
}
foo(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> y = <span class="hljs-number">20</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> z = <span class="hljs-number">30</span>;
    alert(x +  y + z);
  }
  bar();
}
foo(); </code></pre>
<p>在这段代码中我们看到变量"y"在函数"foo"中定义（意味着它在foo上下文的AO中）"z"在函数"bar"中定义，但是变量"x"并未在"bar"上下文中定义，相应地，它也不会添加到"bar"的AO中。乍一看，变量"x"相对于函数"bar"根本就不存在；  <br>函数"bar"如何访问到变量"x"？理论上函数应该能访问一个更高一层上下文的变量对象。实际上它正是这样，这种机制是通过函数内部的[[scope]]属性来实现的。  <br>[[scope]]是所有父级变量对象的层级链，处于当前函数上下文之上，在函数创建时存于其中。</p>
<p><strong>注意: </strong>[[scope]]在函数创建时被存储是静态的（不变的），直至函数销毁。即：函数可以永不调用，但[[scope]]属性已经写入，并存储在函数对象中。  <br>在这里我们逐步分析下     <br>全局上下文的变量对象是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globalContext.VO === Global = {
  x: 10
  foo: <reference to function>
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code>globalContext.VO === <span class="hljs-keyword">Global</span> = {
  x: <span class="hljs-number">10</span>
  foo: &lt;reference <span class="hljs-keyword">to</span> <span class="hljs-function"><span class="hljs-keyword">function</span>&gt;</span>
};</code></pre>
<p>在"foo"创建时，"foo"的[[scope]]属性是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.[[Scope]] = [
  globalContext.VO
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>foo.<span class="hljs-string">[[Scope]]</span> = [
  globalContext.VO
];</code></pre>
<p>在"foo"激活时（进入上下文），"foo"上下文的活动对象是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fooContext.AO = {
  y: 20,
  bar: <reference to function>
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>fooContext.AO = {
<span class="hljs-symbol">  y:</span> <span class="hljs-number">20</span>,
<span class="hljs-symbol">  bar:</span> <span class="hljs-params">&lt;reference to function&gt;</span>
};</code></pre>
<p>"foo"上下文的作用域链为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>fooContext.<span class="hljs-keyword">Scope </span>= [
  fooContext.AO,
  globalContext.VO
]<span class="hljs-comment">;</span></code></pre>
<p>内部函数"bar"创建时，其[[scope]]为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bar.[[Scope]] = [
  fooContext.AO,
  globalContext.VO
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>bar.<span class="hljs-string">[[Scope]]</span> = [
  fooContext.AO,
  globalContext.VO
];</code></pre>
<p>在"bar"激活时，"bar"上下文的活动对象为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="barContext.AO = {
  z: 30
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">barContext.AO </span>= {
  z: <span class="hljs-number">30</span>
}<span class="hljs-comment">;</span></code></pre>
<p>"bar"上下文的作用域链为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bar.Scope= [
  barContext.AO,
  fooContext.AO,
  globalContext.VO
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">bar.Scope= </span>[
  <span class="hljs-keyword">barContext.AO,
</span>  fooContext.AO,
  globalContext.VO
]<span class="hljs-comment">;</span></code></pre>
<p>介绍了一大堆内容，是不是有点晕忽忽的？坚持一下，下面是重点</p>
<h3 id="articleHeader1">闭包的原理</h3>
<p>我们通过一个闭包的例子来分析一下闭包的形成原理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(){
    var sum =5;
    var func = function () {
        console.log(sum);
    }
    return func;
}
var addFunc = add();
addFunc(); //5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> sum =<span class="hljs-number">5</span>;
    <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(sum);
    }
    <span class="hljs-keyword">return</span> func;
}
<span class="hljs-keyword">var</span> addFunc = add();
addFunc(); <span class="hljs-comment">//5</span></code></pre>
<p>js执行流进入全局执行上下文环境时,全局执行上下文可表示为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globalContext = {
    VO: {
        add: <reference to function>,
        addFunc: undefined
    },
    this: window,
    scope chain: window 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>globalContext = {
<span class="hljs-symbol">    VO:</span> {
<span class="hljs-symbol">        add:</span> <span class="hljs-params">&lt;reference to function&gt;</span>,
<span class="hljs-symbol">        addFunc:</span> undefined
    },
<span class="hljs-symbol">    this:</span> window,
    scope chain: window 
}</code></pre>
<p>当add函数被调用时，add函数执行上下文可表示为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addContext = {
    AO: {
        sum: undefined //代码进入执行阶段时此处被赋值为5
        func: undefined //代码进入执行阶段时此处被赋值为function (){console.log(sum);}
    },
    this: window,
    scope chain: addContext.AO + globalContext.VO 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>addContext = {
<span class="hljs-symbol">    AO:</span> {
<span class="hljs-symbol">        sum:</span> undefined <span class="hljs-comment">//代码进入执行阶段时此处被赋值为5</span>
<span class="hljs-symbol">        func:</span> undefined <span class="hljs-comment">//代码进入执行阶段时此处被赋值为function (){console.log(sum);}</span>
    },
<span class="hljs-symbol">    this:</span> window,
    scope chain: addContext.AO + globalContext.VO 
}</code></pre>
<p>add函数执行完毕后，js执行流回到全局上下文环境中，将add函数的返回值赋值给addFunc。</p>
<p><strong>由于addFunc仍保存着func函数的引用，所以add函数执行上下文从执行上下文堆栈顶端弹出后并未被销毁而是保存在内存中。</strong></p>
<p>当addFunc()执行时，func函数被调用，此时func函数执行上下文可表示为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="funcContext = {
    this: window,
    scope chain: addContext.AO + globalContext.VO 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>funcContext = {
    this: window,
    scope chain: addContext<span class="hljs-selector-class">.AO</span> + globalContext<span class="hljs-selector-class">.VO</span> 
}</code></pre>
<p>当要访问变量sum时，func的活动对象中未能找到，则会沿着作用域链查找，由于js遵循词法作用域，作用域在函数创建阶段就被确定，在add函数的活动对象中找到sum = 5;  </p>
<p>介绍到这里你明白形成闭包的原因了吗？  <br><strong>Javascript允许使用内部函数---即函数定义和函数表达式位于另一个函数的函数体内。而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。</strong></p>
<h3 id="articleHeader2">闭包的用途</h3>
<p>闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。</p>
<h4>1. 保护变量的安全实现JS私有属性和私有方法</h4>
<p>利用闭包可以读取函数内部的变量，变量在函数外部不能直接读取到，从而达到保护变量安全的作用。因为私有方法在函数内部都能被访问到，从而实现了私有属性和方法的共享。  <br>常见的模块模式就是利用闭包的这种特性建立的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Counter = (function() {
  //私有属性
  var privateCounter = 0; 
  //私有方法
  function changeBy(val) { 
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();
console.log(privateCounter); //privateCounter is not defined 
console.log(Counter.value()); // 0
Counter.increment();
Counter.increment();
console.log(Counter.value()); // 2
Counter.decrement();
console.log(Counter.value()); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Counter = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">//私有属性</span>
  <span class="hljs-keyword">var</span> privateCounter = <span class="hljs-number">0</span>; 
  <span class="hljs-comment">//私有方法</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBy</span>(<span class="hljs-params">val</span>) </span>{ 
    privateCounter += val;
  }
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      changeBy(<span class="hljs-number">1</span>);
    },
    <span class="hljs-attr">decrement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      changeBy(<span class="hljs-number">-1</span>);
    },
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> privateCounter;
    }
  }   
})();
<span class="hljs-built_in">console</span>.log(privateCounter); <span class="hljs-comment">//privateCounter is not defined </span>
<span class="hljs-built_in">console</span>.log(Counter.value()); <span class="hljs-comment">// 0</span>
Counter.increment();
Counter.increment();
<span class="hljs-built_in">console</span>.log(Counter.value()); <span class="hljs-comment">// 2</span>
Counter.decrement();
<span class="hljs-built_in">console</span>.log(Counter.value()); <span class="hljs-comment">// 1</span></code></pre>
<p>在jQuery框架的私有方法和变量也是这么设计的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = jQuery = function(){
    return jQuery.fn.init();
}
jQuery.fn = jQuery.prototype = {
    init:function(){
        return this;  //this指向jQuery.prototype
    },
    length: 1,
    size: function(){
        return this.length;
    }
}
console.log($().size()); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $ = jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> jQuery.fn.init();
}
jQuery.fn = jQuery.prototype = {
    <span class="hljs-attr">init</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;  <span class="hljs-comment">//this指向jQuery.prototype</span>
    },
    <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length;
    }
}
<span class="hljs-built_in">console</span>.log($().size()); <span class="hljs-comment">// 1</span></code></pre>
<h4>2. 将处理结果缓存</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CachedSearchBox = (function(){    
    var cache = {},count = [];    
    return {    
       attachSearchBox : function(dsid){    
           if(dsid in cache){//如果结果在缓存中    
              return cache[dsid];//直接返回缓存中的对象    
           }    
           var fsb = new uikit.webctrl.SearchBox(dsid);//新建    
           cache[dsid] = fsb;//更新缓存    
           if(count.length > 100){//保正缓存的大小<=100    
              delete cache[count.shift()];    
           }    
           return fsb;          
       }
    };    
})();    
     
CachedSearchBox.attachSearchBox(&quot;input&quot;);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> CachedSearchBox = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
    <span class="hljs-keyword">var</span> cache = {},count = [];    
    <span class="hljs-keyword">return</span> {    
       <span class="hljs-attr">attachSearchBox</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dsid</span>)</span>{    
           <span class="hljs-keyword">if</span>(dsid <span class="hljs-keyword">in</span> cache){<span class="hljs-comment">//如果结果在缓存中    </span>
              <span class="hljs-keyword">return</span> cache[dsid];<span class="hljs-comment">//直接返回缓存中的对象    </span>
           }    
           <span class="hljs-keyword">var</span> fsb = <span class="hljs-keyword">new</span> uikit.webctrl.SearchBox(dsid);<span class="hljs-comment">//新建    </span>
           cache[dsid] = fsb;<span class="hljs-comment">//更新缓存    </span>
           <span class="hljs-keyword">if</span>(count.length &gt; <span class="hljs-number">100</span>){<span class="hljs-comment">//保正缓存的大小&lt;=100    </span>
              <span class="hljs-keyword">delete</span> cache[count.shift()];    
           }    
           <span class="hljs-keyword">return</span> fsb;          
       }
    };    
})();    
     
CachedSearchBox.attachSearchBox(<span class="hljs-string">"input"</span>);  </code></pre>
<p>这样我们在第二次调用的时候，就会从缓存中读取到该对象。  </p>
<p>理解了闭包的原理我们发现闭包的这些用途都是利用了闭包保存了当前函数的活动对象的特点，这样闭包函数在作用域之外被调用时依然能够访问其创建时的作用域</p>
<h3 id="articleHeader3">闭包的缺点</h3>
<ul>
<li><p>闭包将函数的活动对象维持在内存中，过度使用闭包会导致内存占用过多，所以在使用完后需要将保存在内存中的活动对象解除引用；</p></li>
<li><p>闭包只能取得外部函数中任何变量的最后一个值，在使用循环且返回的函数中带有循环变量时会得到错误结果；</p></li>
<li><p>当返回的函数为匿名函数时，注意匿名函数中的this指的是window对象。</p></li>
</ul>
<p>这里仅仅是我对闭包的一些见解，若有错误的地方，还望大家提出，一起交流共同进步！  <br><strong>参考文献</strong></p>
<ul>
<li><p>《你不知道的JavaScript》上卷</p></li>
<li><p><a href="http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html" rel="nofollow noreferrer" target="_blank">深入理解JavaScript系列</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
对javascript中闭包的理解

## 原文链接
[https://segmentfault.com/a/1190000010107111](https://segmentfault.com/a/1190000010107111)


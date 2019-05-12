---
title: '理解Javascript之执行上下文(Execution Context)' 
date: 2019-01-11 2:30:08
hidden: true
slug: 383eptildsh
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>1&gt;什么是执行上下文</strong></p>
<p>Javascript中代码的运行环境分为以下三种：<br>全局级别的代码 - 这个是默认的代码运行环境，一旦代码被载入，引擎最先进入的就是这个环境。<br>函数级别的代码 - 当执行一个函数时，运行函数体中的代码。<br>Eval的代码 - 在Eval函数内运行的代码。<br>javascript是一个单线程语言，这意味着在浏览器中同时只能做一件事情。当javascript解释器初始执行代码，它首先默认进入全局上下文。每次调用一个函数将会创建一个新的执行上下文。 <br>每次新创建的一个执行上下文会被添加到作用域链的顶部，有时也称为执行或调用栈。浏览器总是运行位于作用域链顶部的当前执行上下文。一旦完成，当前执行上下文将从栈顶被移除并且将控制权归还给之前的执行上下文。</p>
<p>不同执行上下文之间的变量命名冲突通过攀爬作用域链解决，从局部直到全局。这意味着具有相同名称的局部变量在作用域链中有更高的优先级。 <br>简单的说，每次你试图访问函数执行上下文中的变量时，查找进程总是从自己的变量对象开始。如果在自己的变量对象中没发现要查找的变量，继续搜索作用域链。它将攀爬作用域链检查每一个执行上下文的变量对象，寻找和变量名称匹配的值。</p>
<p><strong>2&gt;执行上下文的建立过程</strong></p>
<p>我们现在已经知道，每当调用一个函数时，一个新的执行上下文就会被创建出来。然而，在javascript引擎内部，这个上下文的创建过程具体分为两个阶段:<br>建立阶段(发生在当调用一个函数时，但是在执行函数体内的具体代码以前)<br>建立变量，函数，arguments对象，参数<br>建立作用域链<br>确定this的值<br>代码执行阶段:<br>变量赋值，函数引用，执行其它代码<br>实际上，可以把执行上下文看做一个对象，其下包含了以上3个属性：</p>
<blockquote><p>executionContextObj = {    variableObject: { /* 函数中的arguments对象, 参数,<br>内部的变量以及函数声明 <em>/ },    scopeChain: { /</em> variableObject<br>以及所有父执行上下文中的variableObject */ },    this: {}  }</p></blockquote>
<p><strong>3&gt;建立阶段以及代码执行阶段的详细分析</strong><br>确 切地说，执行上下文对象（上述的executionContextObj）是在函数被调用时，但是在函数体被真正执行以前所创建的。函数被调用时，就是我 上述所描述的两个阶段中的第一个阶段 - 建立阶段。这个时刻，引擎会检查函数中的参数，声明的变量以及内部函数，然后基于这些信息建立执行上下文对象 （executionContextObj）。在这个阶段，variableObject对象，作用域链，以及this所指向的对象都会被确定。<br>上述第一个阶段的具体过程如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.找到当前上下文中的调用函数的代码
2.在执行被调用的函数体中的代码以前，开始创建执行上下文
3.进入第一个阶段-建立阶段:
    建立variableObject对象:
        建立arguments对象，检查当前上下文中的参数，建立该对象下的属性以及属性值
        检查当前上下文中的函数声明：
        每找到一个函数声明，就在variableObject下面用函数名建立一个属性，属性值就是指向该函数在内存中的地址的一个引用
        如果上述函数名已经存在于variableObject下，那么对应的属性值会被新的引用所覆盖。
        检查当前上下文中的变量声明：
        每找到一个变量的声明，就在variableObject下，用变量名建立一个属性，属性值为undefined。
        如果该变量名已经存在于variableObject属性中，直接跳过(防止指向函数的属性的值被变量属性覆盖为undefined)，原属性值不会被修改。
    初始化作用域链
    确定上下文中this的指向对象
4.代码执行阶段:
    执行函数体中的代码，一行一行地运行代码，给variableObject中的变量属性赋值。
    下面来看个具体的代码示例:
    function foo(i) {
       var a = 'hello';
       var b = function privateB() {
    
       };
       function c() {
    
       }
    }
    
    foo(22);
    在调用foo(22)的时候，建立阶段如下:
            fooExecutionContext = {
       variableObject: {
           arguments: {
               0: 22,
               length: 1
           },
           i: 22,
           c: pointer to function c()
           a: undefined,
           b: undefined
       },
       scopeChain: { ... },
       this: { ... }
    }
    由此可见，在建立阶段，除了arguments，函数的声明，以及参数被赋予了具体的属性值，其它的变量属性默认的都是undefined。一旦上述建立阶段结束，引擎就会进入代码执行阶段，这个阶段完成后，上述执行上下文对象如下:
        fooExecutionContext = {
   variableObject: {
       arguments: {
           0: 22,
           length: 1
       },
       i: 22,
       c: pointer to function c()
       a: 'hello',
       b: pointer to function privateB()
   },
   scopeChain: { ... },
   this: { ... }
}
我们看到，只有在代码执行阶段，变量属性才会被赋予具体的值。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>找到当前上下文中的调用函数的代码
<span class="hljs-number">2.</span>在执行被调用的函数体中的代码以前，开始创建执行上下文
<span class="hljs-number">3.</span>进入第一个阶段-建立阶段:
    建立variableObject对象:
        建立<span class="hljs-built_in">arguments</span>对象，检查当前上下文中的参数，建立该对象下的属性以及属性值
        检查当前上下文中的函数声明：
        每找到一个函数声明，就在variableObject下面用函数名建立一个属性，属性值就是指向该函数在内存中的地址的一个引用
        如果上述函数名已经存在于variableObject下，那么对应的属性值会被新的引用所覆盖。
        检查当前上下文中的变量声明：
        每找到一个变量的声明，就在variableObject下，用变量名建立一个属性，属性值为<span class="hljs-literal">undefined</span>。
        如果该变量名已经存在于variableObject属性中，直接跳过(防止指向函数的属性的值被变量属性覆盖为<span class="hljs-literal">undefined</span>)，原属性值不会被修改。
    初始化作用域链
    确定上下文中<span class="hljs-keyword">this</span>的指向对象
<span class="hljs-number">4.</span>代码执行阶段:
    执行函数体中的代码，一行一行地运行代码，给variableObject中的变量属性赋值。
    下面来看个具体的代码示例:
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">i</span>) </span>{
       <span class="hljs-keyword">var</span> a = <span class="hljs-string">'hello'</span>;
       <span class="hljs-keyword">var</span> b = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">privateB</span>(<span class="hljs-params"></span>) </span>{
    
       };
       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{
    
       }
    }
    
    foo(<span class="hljs-number">22</span>);
    在调用foo(<span class="hljs-number">22</span>)的时候，建立阶段如下:
            fooExecutionContext = {
       <span class="hljs-attr">variableObject</span>: {
           <span class="hljs-attr">arguments</span>: {
               <span class="hljs-number">0</span>: <span class="hljs-number">22</span>,
               <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>
           },
           <span class="hljs-attr">i</span>: <span class="hljs-number">22</span>,
           <span class="hljs-attr">c</span>: pointer to <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>)
           <span class="hljs-title">a</span>: <span class="hljs-title">undefined</span>,
           <span class="hljs-title">b</span>: <span class="hljs-title">undefined</span>
       },
       <span class="hljs-title">scopeChain</span>: </span>{ ... },
       <span class="hljs-attr">this</span>: { ... }
    }
    由此可见，在建立阶段，除了<span class="hljs-built_in">arguments</span>，函数的声明，以及参数被赋予了具体的属性值，其它的变量属性默认的都是<span class="hljs-literal">undefined</span>。一旦上述建立阶段结束，引擎就会进入代码执行阶段，这个阶段完成后，上述执行上下文对象如下:
        fooExecutionContext = {
   <span class="hljs-attr">variableObject</span>: {
       <span class="hljs-attr">arguments</span>: {
           <span class="hljs-number">0</span>: <span class="hljs-number">22</span>,
           <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>
       },
       <span class="hljs-attr">i</span>: <span class="hljs-number">22</span>,
       <span class="hljs-attr">c</span>: pointer to <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>)
       <span class="hljs-title">a</span>: '<span class="hljs-title">hello</span>',
       <span class="hljs-title">b</span>: <span class="hljs-title">pointer</span> <span class="hljs-title">to</span> <span class="hljs-title">function</span> <span class="hljs-title">privateB</span>(<span class="hljs-params"></span>)
   },
   <span class="hljs-title">scopeChain</span>: </span>{ ... },
   <span class="hljs-attr">this</span>: { ... }
}
我们看到，只有在代码执行阶段，变量属性才会被赋予具体的值。
</code></pre>
<p><strong>4&gt;局部变量作用域提升的缘由</strong><br>在网上一直看到这样的总结： 在函数中声明的变量以及函数，其作用域提升到函数顶部，换句话说，就是一进入函数体，就可以访问到其中声明的变量以及函数。这是对的，但是知道其中的缘由吗？相信你通过上述的解释应该也有所明白了。不过在这边再分析一下。看下面一段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function() {

   console.log(typeof foo); // function pointer
   console.log(typeof bar); // undefined

   var foo = 'hello',
       bar = function() {
           return 'world';
       };

   function foo() {
       return 'hello';
   }

}());
上述代码定义了一个匿名函数，并且通过()运算符强制理解执行。那么我们知道这个时候就会有个执行上下文被创建，我们看到例子中马上可以访问foo以及bar变量，并且通过typeof输出foo为一个函数引用，bar为undefined。
为什么我们可以在声明foo变量以前就可以访问到foo呢？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> foo); <span class="hljs-comment">// function pointer</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> bar); <span class="hljs-comment">// undefined</span>

   <span class="hljs-keyword">var</span> foo = <span class="hljs-string">'hello'</span>,
       bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
           <span class="hljs-keyword">return</span> <span class="hljs-string">'world'</span>;
       };

   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span>;
   }

}());
上述代码定义了一个匿名函数，并且通过()运算符强制理解执行。那么我们知道这个时候就会有个执行上下文被创建，我们看到例子中马上可以访问foo以及bar变量，并且通过<span class="hljs-keyword">typeof</span>输出foo为一个函数引用，bar为<span class="hljs-literal">undefined</span>。
为什么我们可以在声明foo变量以前就可以访问到foo呢？</code></pre>
<p>因 为在上下文的建立阶段，先是处理arguments, 参数，接着是函数的声明，最后是变量的声明。那么，发现foo函数的声明后，就会在variableObject下面建立一个foo属性，其值是一个指向 函数的引用。当处理变量声明的时候，发现有var foo的声明，但是variableObject已经具有了foo属性，所以直接跳过。当进入代码执行阶段的时候，就可以通过访问到foo属性了，因为它 已经就存在，并且是一个函数引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="为什么bar是undefined呢？   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">为什么bar是<span class="hljs-literal">undefined</span>呢？   </code></pre>
<p>因为bar是变量的声明，在建立阶段的时候，被赋予的默认的值为undefined。由于它只要在代码执行阶段才会被赋予具体的值，所以，当调用typeof(bar)的时候输出的值为undefined。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解Javascript之执行上下文(Execution Context)

## 原文链接
[https://segmentfault.com/a/1190000009919936](https://segmentfault.com/a/1190000009919936)


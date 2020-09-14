---
title: '深入理解JavaScript执行上下文、函数堆栈、提升的概念' 
date: 2019-01-17 2:30:25
hidden: true
slug: brbah5n9jpp
categories: [reprint]
---

{{< raw >}}

                    
<p>首先明确几个概念：</p>
<ul>
<li><p><code>EC</code>：函数执行环境（或执行上下文），Execution Context</p></li>
<li><p><code>ECS</code>：执行环境栈，Execution Context Stack</p></li>
<li><p><code>VO</code>：变量对象，Variable Object</p></li>
<li><p><code>AO</code>：活动对象，Active Object</p></li>
<li><p><code>scope chain</code>：作用域链</p></li>
</ul>
<p>想当初自己看到这几个概念的时候是一(m)脸(d)懵(z)逼(z)，但是不得不说这几个概念对以后深入学习JS有很大的帮助。来不及解释了，赶紧上车~</p>
<h3 id="articleHeader0">EC（执行上下文）</h3>
<blockquote><p>每次当控制器转到ECMAScript可执行代码的时候，就会进入到一个执行上下文。</p></blockquote>
<p>那什么是可执行代码呢？</p>
<h4>可执行代码的类型</h4>
<h5>全局代码（<code>Global code</code>）</h5>
<ul><li><p>这种类型的代码是在"程序"级处理的：例如加载外部的js文件或者本地<code>&lt;script&gt;&lt;/script&gt;</code>标签内的代码。<strong>全局代码不包括任何function体内的代码</strong>。 这个是默认的代码运行环境，一旦代码被载入，引擎最先进入的就是这个环境。</p></li></ul>
<h5>函数代码（<code>Function code</code>）</h5>
<ul><li><p>任何一个函数体内的代码，但是需要注意的是，<strong>具体的函数体内的代码是不包括内部函数的代码</strong>。</p></li></ul>
<h5>Eval代码（<code>Eval code</code>）</h5>
<ul><li><p>eval内部的代码</p></li></ul>
<p>这里仅仅引入EC这个概念，后面还有关于EC建立细节的介绍。</p>
<h3 id="articleHeader1">ECS（执行环境栈）</h3>
<p>我们用MDN上的一个例子来引入函数执行栈的概念</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(i) {
  if (i < 0) return;
  console.log('begin:' + i);
  foo(i - 1);
  console.log('end:' + i);
}
foo(2);

// 输出:

// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">i</span>) </span>{
  <span class="hljs-keyword">if</span> (i &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'begin:'</span> + i);
  foo(i - <span class="hljs-number">1</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end:'</span> + i);
}
foo(<span class="hljs-number">2</span>);

<span class="hljs-comment">// 输出:</span>

<span class="hljs-comment">// begin:2</span>
<span class="hljs-comment">// begin:1</span>
<span class="hljs-comment">// begin:0</span>
<span class="hljs-comment">// end:0</span>
<span class="hljs-comment">// end:1</span>
<span class="hljs-comment">// end:2</span>
</code></pre>
<p>这里先不关心执行结果。磨刀不误砍柴功，先了解一下函数执行上下文堆栈的概念。相信弄明白了下面的概念，一切也就水落石出了</p>
<p>我们都知道，浏览器中的JS解释器被实现为单线程，这也就意味着同一时间只能发生一件事情，其他的行为或事件将会被放在叫做执行栈里面排队。下面的图是单线程栈的抽象视图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009041011" src="https://static.alili.tech/img/remote/1460000009041011" alt="执行堆栈" title="执行堆栈" style="cursor: pointer;"></span></p>
<blockquote>
<p>当浏览器首次载入你的脚本，它将<strong>默认进入全局执行上下文</strong>。如果，你在你的全局代码中调用一个函数，你程序的时序将进入被调用的函数，并创建一个新的执行上下文，并将新创建的上下文压入执行栈的顶部。</p>
<p>如果你调用当前函数内部的其他函数，相同的事情会在此上演。<strong>代码的执行流程进入内部函数，创建一个新的执行上下文并把它压入执行栈的顶部。浏览器总会执行位于栈顶的执行上下文，一旦当前上下文函数执行结束，它将被从栈顶弹出，并将上下文控制权交给当前的栈</strong>。这样，堆栈中的上下文就会被依次执行并且弹出堆栈，直到回到全局的上下文。</p>
</blockquote>
<p>看到这里，想必大家都已经深谙上述例子输出结果的原因了，这里我大概绘了一个流程图来帮助理解。</p>
<p><span class="img-wrap"><img data-src="/img/bVL57j?w=2118&amp;h=1336" src="https://static.alili.tech/img/bVL57j?w=2118&amp;h=1336" alt="![Alt text](./屏幕快照 2017-04-11 下午7.29.55.png)" title="![Alt text](./屏幕快照 2017-04-11 下午7.29.55.png)" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">VO（变量对象）/AO（活动对象）</h3>
<p>这里为什么要用一个<code>/</code>呢？按照字面理解，AO其实就是被激活的VO，两个其实是一个东西。下面引用知乎上的一段话，帮助理解一下。<a href="https://www.zhihu.com/question/36393048/answer/71869653" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<blockquote>
<p><strong>变量对象</strong><code>（Variable object）</code>是说JS的执行上下文中都有个对象用来存放执行上下文中可被访问但是不能被<code>delete</code>的<em>函数标示符</em>、<em>形参</em>、<em>变量声明</em>等。它们会被挂在这个对象上，对象的属性对应它们的名字对象属性的值对应它们的值但这个对象是规范上或者说是引擎实现上的不可在JS环境中访问到活动对象</p>
<p><strong>激活对象</strong><code>（Activation object）</code>有了变量对象存每个上下文中的东西，但是它什么时候能被访问到呢？就是每进入一个执行上下文时，这个执行上下文儿中的变量对象就被激活，也就是该上下文中的函数标示符、形参、变量声明等就可以被访问到了</p>
</blockquote>
<h4>
<code>EC</code>建立的细节</h4>
<h5>1、创建阶段【当函数被调用，但未执行任何其内部代码之前】</h5>
<ul>
<li><p>创建作用域链（Scope Chain）</p></li>
<li><p>创建变量，函数和参数。</p></li>
<li><p>求”this“的值</p></li>
</ul>
<h5>2、执行阶段</h5>
<ul><li><p>初始化变量的值和函数的引用，解释/执行代码。</p></li></ul>
<p><strong>我们可以将每个执行上下文抽象为一个对象，这个对象具有三个属性</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECObj: {
    scopeChain: { /* 变量对象（variableObject）+ 所有父级执行上下文的变量对象*/ }, 
    variableObject: { /*函数 arguments/参数，内部变量和函数声明 */ }, 
    this: {} 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ECObj</span>: {
    <span class="hljs-attribute">scopeChain</span>: { <span class="hljs-comment">/* 变量对象（variableObject）+ 所有父级执行上下文的变量对象*/</span> }, 
    <span class="hljs-selector-tag">variableObject</span>: { <span class="hljs-comment">/*函数 arguments/参数，内部变量和函数声明 */</span> }, 
    <span class="hljs-selector-tag">this</span>: {} 
}
</code></pre>
<h4>解释器执行代码的伪逻辑</h4>
<p>1、查找调用函数的代码。</p>
<p>2、执行代码之前，先进入创建上下文阶段：</p>
<ul>
<li><p>初始化作用域链</p></li>
<li>
<p>创建变量对象：</p>
<ul>
<li><p><strong>创建arguments对象</strong>，检查上下文，初始化参数名称和值并创建引用的复制。</p></li>
<li>
<p><strong>扫描上下文的函数声明（而非函数表达式）</strong>：</p>
<ul>
<li><p>为发现的每一个函数，在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用。</p></li>
<li><p>如果函数的名字已经存在，引用指针将被重写。</p></li>
</ul>
</li>
<li>
<p><strong>扫描上下文的变量声明</strong>：</p>
<ul>
<li><p>为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为undefined</p></li>
<li><p>如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。</p></li>
</ul>
</li>
<li><p><strong>求出上下文内部“this”的值</strong>。</p></li>
</ul>
</li>
</ul>
<p>3、激活/代码执行阶段：</p>
<ul><li><p>在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。</p></li></ul>
<h5><strong>VO --- 对应上述第二个阶段</strong></h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
        function foo(i){
            var a = 'hello'
            var b = function(){}
            function c(){}
        }
        foo(22)
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(i)</span></span>{
            <span class="hljs-keyword">var</span> a = <span class="hljs-string">'hello'</span>
            <span class="hljs-keyword">var</span> b = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span><span class="hljs-params">()</span></span>{}
        }
        foo(<span class="hljs-number">22</span>)
        </code></pre>
<p>当我们调用<code>foo(22)</code>时，整个创建阶段是下面这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ECObj = {
        scopChain： {...},
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
        this: { ... }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>    <span class="hljs-type">ECObj</span> = {
        scopChain： <span class="hljs-meta">{...}</span>,
         variableObject: {
            arguments: {
                <span class="hljs-number">0</span>: <span class="hljs-number">22</span>,
                length: <span class="hljs-number">1</span>
            },
            i: <span class="hljs-number">22</span>,
            c: <span class="hljs-built_in">pointer</span> to function c()
            a: undefined,
            b: undefined
        },
        this: { ... }
    }</code></pre>
<p>正如我们看到的，在上下文创建阶段，VO的初始化过程如下（<strong>该过程是有先后顺序的：函数的形参==&gt;&gt;函数声明==&gt;&gt;变量声明</strong>）：</p>
<ul>
<li><p><strong>函数的形参</strong>（当进入函数执行上下文时） —— 变量对象的一个属性，其属性名就是形参的名字，其值就是实参的值；对于没有传递的参数，其值为undefined</p></li>
<li><p><strong>函数声明</strong>（FunctionDeclaration, FD） —— 变量对象的一个属性，其属性名和值都是函数对象创建出来的；<em>如果变量对象已经包含了相同名字的属性，则替换它的值</em></p></li>
<li><p><strong>变量声明</strong>（var，VariableDeclaration） —— 变量对象的一个属性，其属性名即为变量名，其值为undefined;<em>如果变量名和已经声明的函数名或者函数的参数名相同，则不会影响已经存在的属性。</em></p></li>
</ul>
<p>对于函数的形参没有什么可说的，主要看一下函数的声明以及变量的声明两个部分。</p>
<p><strong>1、如何理解函数声明过程中<code>如果变量对象已经包含了相同名字的属性，则替换它的值</code>这句话？</strong></p>
<p>看如下这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
function foo1(a){
    console.log(a)
    function a(){} 
}
foo1(20)//'function a(){}'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo1</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-built_in">console</span>.log(a)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{} 
}
foo1(<span class="hljs-number">20</span>)<span class="hljs-comment">//'function a(){}'</span>
</code></pre>
<p>根据上面的介绍，我们知道VO创建过程中，函数形参的优先级是高于函数的声明的，结果是函数体内部声明的<code>function a(){}</code>覆盖了函数形参<code>a</code>的声明，因此最后输出<code>a</code>是一个<code>function</code></p>
<p><strong>2、如何理解变量声明过程中<code>如果变量名和已经声明的函数名或者函数的参数名相同，则不会影响已经存在的属性</code>这句话？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//情景一：与参数名相同
function foo2(a){
    console.log(a)
    var a = 10
}
foo2(20) //'20'

//情景二：与函数名相同

function foo2(){
    console.log(a)
    var a = 10
    function a(){}
}
foo2() //'function a(){}'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//情景一：与参数名相同</span>
function foo2(a){
    console.log(a)
    <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">10</span>
}
<span class="hljs-function"><span class="hljs-title">foo2</span><span class="hljs-params">(<span class="hljs-number">20</span>)</span></span> <span class="hljs-comment">//'20'</span>

<span class="hljs-comment">//情景二：与函数名相同</span>

function foo2(){
    console.log(a)
    <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">10</span>
    function a(){}
}
<span class="hljs-function"><span class="hljs-title">foo2</span><span class="hljs-params">()</span></span> <span class="hljs-comment">//'function a(){}'</span>
</code></pre>
<p>下面是几个比较有趣的例子，当做加餐小菜，大家细细品味。这里给出一句话当做参考：</p>
<blockquote>
<p><strong>函数的声明比变量优先级要高，并且定义过程不会被变量覆盖，除非是赋值</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo3(a){
    var a = 10
    function a(){}
    console.log(a)
}
foo3(20) //'10'

function foo3(a){
    var a 
    function a(){}
    console.log(a)
}
foo3(20) //'function a(){}'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo3</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{}
    <span class="hljs-built_in">console</span>.log(a)
}
foo3(<span class="hljs-number">20</span>) <span class="hljs-comment">//'10'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo3</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">var</span> a 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{}
    <span class="hljs-built_in">console</span>.log(a)
}
foo3(<span class="hljs-number">20</span>) <span class="hljs-comment">//'function a(){}'</span>
</code></pre>
</blockquote>
<h5><strong>AO --- 对应第三个阶段</strong></h5>
<p>正如我们看到的，创建的过程仅负责处理定义属性的名字，而并不为他们指派具体的值，当然还有对形参/实参的处理。一旦创建阶段完成，执行流进入函数并且激活/代码执行阶段，看下函数执行完成后的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECObj = {
    scopeChain: { ... },
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
    this: { ... }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>ECObj = {
    scopeChain: { ... },
    variableObjec<span class="hljs-variable">t:</span> {
        <span class="hljs-keyword">argument</span><span class="hljs-variable">s:</span> {
            <span class="hljs-number">0</span>: <span class="hljs-number">22</span>,
            length: <span class="hljs-number">1</span>
        },
        i: <span class="hljs-number">22</span>,
        <span class="hljs-keyword">c</span>: pointer <span class="hljs-keyword">to</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span><span class="hljs-params">()</span></span>
        <span class="hljs-variable">a:</span> <span class="hljs-string">'hello'</span>,
        <span class="hljs-variable">b:</span> pointer <span class="hljs-keyword">to</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">privateB</span><span class="hljs-params">()</span></span>
    },
    thi<span class="hljs-variable">s:</span> { ... }
}
</code></pre>
<h3 id="articleHeader3">提升（Hoisting）</h3>
<p>对于下面的代码，相信很多人都能一眼看出输出结果，但是却很少有人能给出为什么会产生这种输出结果的解释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    console.log(typeof foo); // 函数指针
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };
        
    function foo() {
        return 'hello';
    }
}());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> foo); <span class="hljs-comment">// 函数指针</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> bar); <span class="hljs-comment">// undefined</span>

    <span class="hljs-keyword">var</span> foo = <span class="hljs-string">'hello'</span>,
        bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-string">'world'</span>;
        };
        
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'hello'</span>;
    }
}());
</code></pre>
<p><strong>1、为什么我们能在foo声明之前访问它？</strong><br>回想在<code>VO</code>的创建阶段，我们知道函数在该阶段就已经被创建在变量对象中。所以在函数开始执行之前，foo已经被定义了。</p>
<p><strong>2、Foo被声明了两次，为什么foo显示为函数而不是undefined或字符串？</strong><br>我们知道，在创建阶段，函数声明是优先于变量被创建的。而且在变量的创建过程中，如果发现<code>VO</code>中已经存在相同名称的属性，则不会影响已经存在的属性。<br>因此，对<code>foo()</code>函数的引用首先被创建在活动对象里，并且当我们解释到var foo时，我们看见<code>foo</code>属性名已经存在，所以代码什么都不做并继续执行。</p>
<p><strong>3、为什么bar的值是undefined？</strong><br><code>bar</code>采用的是函数表达式的方式来定义的，所以<code>bar</code>实际上是一个变量，但变量的值是函数，并且我们知道变量在创建阶段被创建但他们被初始化为<code>undefined</code>，这也是为什么函数表达式不会被提升的原因。</p>
<h4>总结：</h4>
<p>1、<code>EC</code>分为两个阶段，创建执行上下文和执行代码。<br>2、每个<code>EC</code>可以抽象为一个对象，这个对象具有三个属性，分别为：作用域链<code>Scope</code>，<code>VO|AO</code>（<code>AO</code>，<code>VO</code>只能有一个）以及<code>this</code>。<br>3、函数<code>EC</code>中的<code>AO</code>在进入函数<code>EC</code>时，确定了Arguments对象的属性；在执行函数<code>EC</code>时，其它变量属性具体化。<br>4、<code>EC</code>创建的过程是由先后顺序的：参数声明 <code>&gt;</code> 函数声明 <code>&gt;</code> 变量声明</p>
<h4>参考</h4>
<p><a href="https://segmentfault.com/a/1190000000533094">javascript 执行环境，变量对象，作用域链</a><br><a href="http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/" rel="nofollow noreferrer" target="_blank">What is the Execution Context &amp; Stack in JavaScript?</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E9%97%AD%E5%8C%85%28Closures%29" rel="nofollow noreferrer" target="_blank">函数MDN</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解JavaScript执行上下文、函数堆栈、提升的概念

## 原文链接
[https://segmentfault.com/a/1190000009041008](https://segmentfault.com/a/1190000009041008)


---
title: '浅谈对JavaScript闭包的理解' 
date: 2019-02-03 2:30:40
hidden: true
slug: 6yow8y6qofn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在谈闭包之前，我们首先要了解几个概念：</p></blockquote>
<ul>
<li><p>什么是函数表达式？ 与函数声明有何不同？</p></li>
<li><p>JavaScript查找标识符的机制</p></li>
<li><p>JavaScript的作用域是词法作用域</p></li>
<li><p>JavaScript的垃圾回收机制</p></li>
</ul>
<blockquote><p>先来说说函数表达式</p></blockquote>
<p>什么是函数表达式？  <strong>如果function是声明中的第一个词，那么就是函数声明，否则就是函数表达式</strong><br>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function(){}; //匿名函数表达式

（function foo(){}）() //函数表达式,因为function不是声明中的第一个词，前面还有一个“（”

function foo(){} //函数声明" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}; <span class="hljs-comment">//匿名函数表达式</span>

（<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{}）() <span class="hljs-comment">//函数表达式,因为function不是声明中的第一个词，前面还有一个“（”</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{} <span class="hljs-comment">//函数声明</span></code></pre>
<p>函数表达式也分匿名函数表达式和具名函数表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function(){} //匿名函数表达式

var foo = function bar(){} //具名函数表达式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{} <span class="hljs-comment">//匿名函数表达式</span>

<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span></span>{} <span class="hljs-comment">//具名函数表达式</span></code></pre>
<p>具名函数表达式要注意一点：上例中的bar标识符 只在当前的函数作用域中存在，在全局作用域中是不存在的</p>
<p>函数声明与函数表达式的重要区别有：</p>
<ul>
<li><p>函数声明具有<strong>函数声明提升</strong>，函数表达式不会被提升</p></li>
<li><p>函数表达式可以在表达式后跟个括号来立即执行，函数声明不行</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（function (){})() //匿名函数表达式，且立即执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">（<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{})() <span class="hljs-comment">//匿名函数表达式，且立即执行</span></code></pre>
<p>这种模式的函数，通常称为<strong>IIFE</strong>（Immediately Invoked Function Expresstion）代表立即执行函数表达式。<br>关于函数、变量声明的提升这里就不再多说了， 想了解的同学可以查阅一下相关资料</p>
<blockquote><p>关于JavaScript执行函数时查找标识符的机制</p></blockquote>
<p>不了解作用域链及变量对象的同学可以先查阅相关资料后再来看。</p>
<p><strong>作用域链本质上是一个由指向变量对象的指针列表，它只引用但不实际包含变量对象</strong>，变量，函数等等都存在各自作用域的变量对象中，通过访问变量对象来访问它们。</p>
<p><strong>只有在函数调用的时候，才会创建执行环境和作用域链，同时每个环境都只能逐级向上搜索作用域链，来查询变量和函数名等标识符</strong></p>
<blockquote><p>JavaScript的作用域</p></blockquote>
<p><strong>JavaScript的作用域就是词法作用域而不是动态作用域</strong><br>词法作用域最重要的特征是它的定义过程发生在<code>代码的书写阶段</code><br>动态作用域的作用域链是基于<code>调用栈的</code>   词法作用域的作用域链是基于<code>代码中的作用域嵌套</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    console.log(num)
}
   
function bar(){
    var num = 2;
    foo(); // 1
}
    
var num = 1;
bar();    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(num)
}
   
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">2</span>;
    foo(); <span class="hljs-comment">// 1</span>
}
    
<span class="hljs-keyword">var</span> num = <span class="hljs-number">1</span>;
bar();    </code></pre>
<p>bar函数执行时，会执行foo函数，因为JavaScript是词法作用域，所以函数执行时，会沿着定义时的作用域链查找变量，而不是执行时，foo函数定义在全局中，所以查找到了全局的num，输出了1而不是2。</p>
<blockquote><p>下面来说闭包</p></blockquote>
<p>关于什么是闭包，其实有很多种说法，这取决于各自的理解，最主要的有两种：</p>
<ul>
<li><p>Nicolas C.Zakas：<strong>闭包是指有权访问另一个函数作用域中的变量的<code>函数</code></strong></p></li>
<li><p>KYLE SIMPSON：<strong>当函数可以记住并访问所在的词法作用域时，就产生了闭包，这个函数持有对该词法作用域的引用，这个<code>引用</code>就叫做<code>闭包</code></strong></p></li>
</ul>
<p>我个人更倾向于后者对于闭包的定义，即闭包是一个引用。<br>下面来看一些代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    var a = 5;
    return function() {
    console.log(a);
    }
 }

var bar = foo();
bar();       // 5
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(a);
    }
 }

<span class="hljs-keyword">var</span> bar = foo();
bar();       <span class="hljs-comment">// 5</span>
    </code></pre>
<p>这段代码里 foo执行时会返回一个匿名函数表达式，这个函数能够访问foo（）的作用域，并且引用能引用它，然后将这个匿名函数赋值给了变量bar，让bar能引用这个匿名函数并且可以调用它。<br>这个例子，匿名函数在<strong>自己定义的词法作用域以外的地方成功执行</strong>。<br>这正是闭包强大的地方，比如通过闭包实现模块模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function aModule() {

    var sometext = &quot;module&quot;;
    
    function doSomething() {
        console.log(sometext);
    }
    
    return {
        doSomething: doSomething
        };
}

var obj = aModule();
obj.doSomething()   //module" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aModule</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> sometext = <span class="hljs-string">"module"</span>;
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(sometext);
    }
    
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">doSomething</span>: doSomething
        };
}

<span class="hljs-keyword">var</span> obj = aModule();
obj.doSomething()   <span class="hljs-comment">//module</span></code></pre>
<p>我们通过调用aModule函数创建了一个模块实例，函数返回的这个对象，实质上可以看做是这个模块的公告API，是不是有些像其它面向对象语言中的class？</p>
<p>再来通过闭包实现一个单例模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var application = function() {
    
    var components = [];
    /*
    一些初始化操作
    */
    return {              //公共API
        getComponentCount: function() {
        return components.length;
        },
        registerComponent: function(component) {
        components.push(component);
        }
    };
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> application = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    
    <span class="hljs-keyword">var</span> components = [];
    <span class="hljs-comment">/*
    一些初始化操作
    */</span>
    <span class="hljs-keyword">return</span> {              <span class="hljs-comment">//公共API</span>
        getComponentCount: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> components.length;
        },
        registerComponent: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(component)</span> </span>{
        components.push(component);
        }
    };
}();</code></pre>
<p>这个例子通过IIFE创建了一个单例对象，函数里返回的对象字面量是这个单例模式的公共接口。<br>通过闭包实现模块模式，可以做到很多强大的事情，模块模式能成功实现，最关键的是返回的API还能继续引用定义时所在的作用域，从而进行一些操作，也就是说，<strong>作用域并没有因为函数执行后被销毁，也就是没有被内存回收</strong>，之所以没有被回收是因为闭包的存在和JavaScript的垃圾回收机制。</p>
<blockquote><p>JavaScript的垃圾回收机制</p></blockquote>
<p>JavaScript最常用的垃圾收集方式是标记清除，垃圾收集器会给存储在内存中的所有变量都加上标记，然后去除环境中的变量，以及被环境中的变量引用的变量的标记，说明这些变量还有作用，暂时不能被删除，然后在此之后被加上标记的变量就是要删除的变量了，等待垃圾收集器对他们完成清除工作。</p>
<p>对函数来说，函数执行完毕后，会自动释放掉里面的变量，可是如果函数内部存在闭包，它们就不会被删除，因为这个函数还在被内部的函数所引用，所以他不会被加上标记，不会被清除，而是会<code>一直存在内存中得不到释放！</code>除非使用闭包的那个内部函数被销毁，外部函数才能得到释放</p>
<p>所以，虽然闭包强大，但是我们不能滥用它，且在没有必要的情况下尽量不要创建闭包，不然将会有大量的变量对象得不到释放，过度占用内存。</p>
<blockquote><p>关于循环和闭包</p></blockquote>
<p>当循环和闭包结合在一起时，经常会产生让初学者觉得匪夷所思的问题。<br>来看一段Nicolas C.Zakas 在《JavaScript高级程序设计》中的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        };
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> i;
        };
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>这个函数执行后，会创建一个<code>由十个函数组成的数组</code>，<code>并且产生十个互不相干的函数作用域</code>，表面上看调用第几个函数就会输出几，但是结果并不是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = createFunction();
result[0]();  // 10
result[9]();  // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>var result = createFunction();
result[<span class="hljs-string">0</span>](<span class="hljs-link"></span>);  // 10
result[<span class="hljs-string">9</span>](<span class="hljs-link"></span>);  // 10</code></pre>
<p>产生这种奇怪的现象的原因就是之前说的，createFunction的变量对象因为闭包的存在没有被释放，注意<code>闭包保存的是整个变量对象，而不是只保存只被引用的变量</code>，在createFunction执行后，创建了十个函数，同时变量 i 没有被释放，依然保存在内存中，所以此时它的值保留为停止循环后的10。</p>
<p>当我们在外部调用函数时，函数沿着它的作用域链开始搜索所需要的变量，前面说过，JavaScript的作用域链是基于定义时的作用域嵌套，所以当我们调用某个函数比如 <code>result[0]</code> 它就会首先在自己的作用域里通过RSH搜索 i ，显然 i 不存在这个作用域中，于是它又沿着作用域链向上一级作用域中搜索 i ，然后找到了 i ，但是此时createFunction函数已经执行，循环也已经执行完毕了， i 的值为10，所以获取到的i，值就为10，同理，其他的函数执行时，查找的i 也会是10， 所以每个函数执行结果都是输出10。<br>关键所在就是<strong>尽管循环中的十个函数是在各自的迭代中分别定义的，但是它们都处于一个共享的上一级作用域中，所以它们获取到的都是一个 i </strong></p>
<p>所以解决此类问题的关键就是让<strong>函数查找i时，不找到createFunction的变量对象那一级</strong> ，因为一旦向上搜索到createFunction那里，得到的就是10。所以我们可以通过一些方法在中间来截断本该搜索到createFunction变量对象的一次查找。</p>
<p>首先我们可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction() {
    var result = [];
    for (var i = 0; i < 10; i++) {
    (function (){
        result[i] = function() {
            return i;
        };})();
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> i;
        };})();
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>我们通过定义一个立即执行函数表达式，在result[i]函数上一级创建了一个块级作用域，如果我们把这个块级作用域叫做<code>a</code>，那么它查找i时是这样一条链 <code>result[i]-&gt;a-&gt;createFunction</code>，之所以还会查找到createFunction中，是因为<code>a</code>中没有<code>i</code>这个变量，所以我们需要做些什么，让它搜索到<code>a</code>时就停下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        (function(i){
        result[i] = function() {
            return i;
        };})(i);
        }
    
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunctions</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> i;
        };})(i);
        }
    
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>现在a这个块级作用域里定义了一个变量 i ，这个 i 与上级的 i 不会互相影响，因为它们存在各自的作用域里， 同时我们将该次迭代时的 i 值赋给了 a这个块级作用域里的 i ，即a中的 i 保存了当次迭代的 i ，result[i]在外部执行时，是这样的调用链<code>result i -&gt; a</code>在a中就能找到需要的变量，不需要再向上搜索，也不会查找到值为10的 i ，所以调用哪个result[i]函数，就会输出哪个 i 。</p>
<p>在 <code>ES6</code> 中我们还可以使用 <code>let</code> 来解决此类问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        let j = i;
        result[i] = function() {
            return j;
        };
    }
    return result;
}
//输出一下
console.log(createFunction()[2]());  //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        <span class="hljs-keyword">let</span> j = i;
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> j;
        };
    }
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-comment">//输出一下</span>
<span class="hljs-built_in">console</span>.log(createFunction()[<span class="hljs-number">2</span>]());  <span class="hljs-comment">//2</span></code></pre>
<p>let会创建一个块级作用域，并在这个作用域中声明一个变量。所以我们相当于在result[i]上套了一层块级作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        //块的开始
        let j = i;
        result[i] = function() {
            return j;
        };
        //块的结束
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        <span class="hljs-comment">//块的开始</span>
        <span class="hljs-keyword">let</span> j = i;
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> j;
        };
        <span class="hljs-comment">//块的结束</span>
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>这种方式解决此类问题，与前面没有多大分别，总之就是为了不让函数调用时去查找到最上级的那个 i 。</p>
<p>其实，如果在for循环头部来进行<code>let</code>声明还会有一个有趣的行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createFunction() {
    var result = [];
    for (let i = 0; i < 10; i++) {    //每次迭代，都会声明一次i，总共声明10次
        result[i] = function() {
            return i;
        };
    }
    return result;
}
console.log(createFunction()[2]());  //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFunction</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {    <span class="hljs-comment">//每次迭代，都会声明一次i，总共声明10次</span>
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> i;
        };
    }
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-built_in">console</span>.log(createFunction()[<span class="hljs-number">2</span>]());  <span class="hljs-comment">//2</span></code></pre>
<p>这样在for头部使用<code>let</code>声明， 每次迭代都会进行声明，随后每次迭代都会使用上一个迭代结束时的值来初始化这个变量。</p>
<p>事实上当函数当做值类型并到处传递时， 基本都会使用闭包，如<strong>定时器，跨窗口通信，事件监听，ajax等等</strong> 基本只要使用了<code>回调函数</code>， 实际上就是在使用闭包。</p>
<p>闭包是一把双刃剑 是JavaScript比较难以理解和掌握的部分， 它十分强大，却也有很大的缺陷，如何使用它完全取决于你自己。</p>
<p><strong>以上皆为个人观点 如若有误 还望指正</strong></p>
<h2 id="articleHeader0">参考书籍</h2>
<ol>
<li><p>《JavaScript高级程序设计》</p></li>
<li><p>《你不知道的JavaScript 上卷》</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈对JavaScript闭包的理解

## 原文链接
[https://segmentfault.com/a/1190000006918275](https://segmentfault.com/a/1190000006918275)


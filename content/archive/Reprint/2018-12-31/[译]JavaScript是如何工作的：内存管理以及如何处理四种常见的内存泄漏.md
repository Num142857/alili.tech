---
title: '[译]JavaScript是如何工作的：内存管理以及如何处理四种常见的内存泄漏' 
date: 2018-12-31 2:30:29
hidden: true
slug: aa4mycncodf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript是如何工作的：内存管理以及如何处理四种常见的内存泄漏</h2>
<blockquote>
<p>原文：<a href="https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec" rel="nofollow noreferrer" target="_blank">How JavaScript works: memory management + how to handle 4 common memory leaks</a></p>
<p>译者：<a href="https://github.com/neal1991" rel="nofollow noreferrer" target="_blank">neal1991</a></p>
<p>welcome to star my <a href="https://github.com/neal1991" rel="nofollow noreferrer" target="_blank">articles-translator </a>, providing you advanced articles translation. Any suggestion, please issue or contact <a href="mailto:bing@stu.ecnu.edu.cn">me</a></p>
<p>LICENSE: <a href="https://opensource.org/licenses/MIT" rel="nofollow noreferrer" target="_blank">MIT</a></p>
</blockquote>
<p>几个礼拜之前我们开始一系列对于JavaScript以及其本质工作原理的深入挖掘：我们认为通过了解JavaScript的构建方式以及它们是如何共同合作的，你就能够写出更好的代码以及应用。</p>
<p>这个系列的第一篇博客专注于介绍<a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf" rel="nofollow noreferrer" target="_blank">对于引擎，运行时以及调用栈的概述</a>（译者注：<a href="https://github.com/neal1991/articles-translator/blob/master/JavaScript%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%EF%BC%9A%E7%B3%BB%E5%88%97%E4%B8%80.md" rel="nofollow noreferrer" target="_blank">第一篇博客翻译版</a>）。<a href="https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12" rel="nofollow noreferrer" target="_blank">第二篇博客近距离地检测了Google V8 引擎的内部</a>并且提供了一些如何写出更好的JavaScript代码的建议。</p>
<p>在第三篇博客中，我们将会讨论另外一个关键的话题。这个话题由于随着编程语言的逐渐成熟和复杂化，越来越被开发者所忽视，这个话题就是在日常工作中使用到的——内存管理。我们还将提供一些有关如何处理我们在<a href="https://www.sessionstack.com/" rel="nofollow noreferrer" target="_blank">SessionStack</a>中的JavaScript中的内存泄漏的建议，因为我们需要确保SessionStack不会导致内存泄漏或者增加我们集成的Web应用程序的内存消耗。</p>
<h3 id="articleHeader1">概述</h3>
<p>语言，比如C，具有低层次的内存管理方法，比如<code>malloc()</code>以及<code>free()</code>。开发者利用这些方法精确地为操作系统分配以及释放内存。</p>
<p>同时，JavaScript会在创建一些变量（对象，字符串等等）的时候分配内存，并且会在这些不被使用之后“自动地”释放这些内存，这个过程被称为<em>垃圾收集</em>。这个看起来“自动化的”特性其实就是产生误解的原因，并且给JavaScript（以及其他高层次语言）开发者一个假象，他们不需要关心内存管理。<strong>大错特错。</strong></p>
<p>即使是使用高层次语言，开发者应该对于内存管理有一定的理解（或者最基本的理解）。有时候自动的内存管理会存在一些问题（比如一些bug或者垃圾收集器的一些限制等等），对于这些开发者必须能够理解从而能够合适地处理（或者使用最小的代价以及代码债务去绕过这个问题）。</p>
<h3 id="articleHeader2">内存生命周期</h3>
<p>不管你在使用什么编程语言，内存的生命周期基本上都是一样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVVjHI?w=1024&amp;h=768" src="https://static.alili.tech/img/bVVjHI?w=1024&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面是对于周期中每一步所发生的情况的概述：</p>
<ul>
<li>
<strong>分配内存</strong>——操作系统为你的程序分配内存并且允许其使用。在低层次语言中（比如C），这正是开发者应该处理的操作。在高层次的语言，然而，就由语言帮你实现了。</li>
<li>
<strong>使用内存</strong>——当你的程序确实在使用之前分配的内存的阶段。当你在使用你代码里面分配的变量的时候会发生<strong>读</strong>以及<strong>写</strong>操作。</li>
<li>
<strong>释放内存</strong>——这个阶段就是释放你不再需要的内存，从而这些内存被释放并且能够再次被使用。和<strong>分配内存</strong>操作一样，这在低层次的语言也是开发者需要明确的操作。</li>
</ul>
<p>对于调用栈以及内存堆有一个快速的概念认识，你可以阅读我们<a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf" rel="nofollow noreferrer" target="_blank">关于这个话题的第一篇博客</a>。</p>
<h3 id="articleHeader3">什么是内存？</h3>
<p>在我们讲述JavaScript内存之前，我们将简要地讨论一下内存是什么以及它们是如何在 nutshell 中工作的。</p>
<p>在硬件层次上，计算机内存由大量的 <a href="https://en.wikipedia.org/wiki/Flip-flop_%28electronics%29" rel="nofollow noreferrer" target="_blank">寄存器</a> 组成。每一个寄存器都包含一些晶体管并且能够存储一比特。单独的寄存器可以通过<strong>独特的标识符</strong>去访问，因此我们能够读取以及重写它们。因此，从概念上来说，我们可以认为我们的整个计算机内存就是一个我们能够读写的大型比特数组。</p>
<p>因为作为人类，我们不擅长直接基于比特进行思考以及算术，我们将它们组织成大规模群组，它们在一起可以代表一个数字。8个比特称为一个字节。除了字节，还有词（有时候是16比特，有时候是32比特）。</p>
<p>内存中存储了很多东西：</p>
<ol>
<li>所有程序使用的变量和其他数据</li>
<li>程序的代码，包括操作系统的代码。</li>
</ol>
<p>编译器和操作系统共同合作为你处理大部分的内存管理，但是我们建议你应该了解其内部的运行原理。</p>
<p>当你编译你的代码的时候，编译器将会检查原始数据类型并且提前计算好它们需要多少内存。需要的内存被分配给程序，这被称为<strong>栈空间</strong>。这些被分配给变量的空间被称为栈空间，因为一旦函数被调用，它们的内存就会增加到现有内存的上面。当它们终止的时候，它们就会以后进先出(LIFO)的顺序移除。比如，考虑下面的声明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    int n; // 4 bytes
    int x[4]; // array of 4 elements, each 4 bytes
    double m; // 8 bytes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code class="c">   <span class="hljs-built_in"> int </span>n; // 4 bytes
   <span class="hljs-built_in"> int </span>x[4]; //<span class="hljs-built_in"> array </span>of 4 elements, each 4 bytes
   <span class="hljs-built_in"> double </span>m; // 8 bytes</code></pre>
<p>编译器能够立即计算出代码需要</p>
<p>4 + 4 × 4 + 8 = 28 字节</p>
<blockquote><p>那就是它如何对于现有的整形以及双浮点型工作。大约20年前，整形典型都是2个字节，双浮点型是4个字节。你的代码不应该取决于当下基本数据类型的大小。</p></blockquote>
<p>编译器将会插入能够与操作系统交互的代码，从而在栈上获取你需要存储变量需要的字节数。</p>
<p>在上述的例子中，编译器知道每一个变量的准确的内存地址。事实上，无论我们何时写变量 n ，这都会在内部转化为类似于“内存地址 4127963”的东西。</p>
<p>注意如果我们希望在这访问 x[4] 我们将会需要访问和 m 相关联的数据。这是因为我们在访问数组里面并不存在的元素——它比数组实际分配的最后一个元素 x[3] 要多4个字节，并且最后可能是阅读（或者重写）一些 m 的比特。这将很可能给程序的其他部分带来一些不良的后果。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjHL?w=1024&amp;h=353" src="https://static.alili.tech/img/bVVjHL?w=1024&amp;h=353" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当函数调用其它函数的时候，当它被调用的时候都会获取它自己的堆栈块。它在那保存了它所有的局部变量，但是还会有一个程序计数器记录它执行的位置。当这个函数执行完毕，它的内存块就可以再次用于其他目的。</p>
<h3 id="articleHeader4">动态分配</h3>
<p>不幸的是，当我们在编译的时候不知道变量需要多少内存的话事情可能就不那么简单。假设我们想做下面的事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    int n = readInput(); // reads input from the user

    ...

    // create an array with &quot;n&quot; elements" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code class="c">
   <span class="hljs-built_in"> int </span>n = readInput(); // reads input from the user

<span class="hljs-keyword">    .</span>..

    // create an<span class="hljs-built_in"> array </span>with <span class="hljs-string">"n"</span> elements</code></pre>
<p>在此，在编译阶段中，编译器就没有办法知道数组需要多少内存，因为它取决于用户的输入。</p>
<p>因此，它就不能够为栈上的变量分配空间。相反，我们的程序需要明确地询问操作运行时需要的空间数量。这个内存是从<strong>堆空间</strong>中分配出来的。动态内存和静态内存分配的区别总结如下表格：</p>
<p><span class="img-wrap"><img data-src="/img/bVVjHR?w=1024&amp;h=431" src="https://static.alili.tech/img/bVVjHR?w=1024&amp;h=431" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>为了深入地理解动态内存分配是如何工作的，我们需要花费更多的时间在<strong>指针</strong>，这个可能有点偏离这篇博客的话题。如果你感兴趣了解更多，在评论里面告诉我，我将会在后续的博客中挖掘更多的细节。</p>
<h3 id="articleHeader5">JavaScript中的分配</h3>
<p>现在我们将解释JavaScript中的第一步（分配内存）。</p>
<p>JavaScript 将开发者从内存分配的处理中解放出来——JavaScript自身可以利用声明变量来完成这些任务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var n = 374; // allocates memory for a number
    var s = 'sessionstack'; // allocates memory for a string 
    
    var o = {
      a: 1,
      b: null
    }; // allocates memory for an object and its contained values
    
    var a = [1, null, 'str'];  // (like object) allocates memory for the
                               // array and its contained values
    
    function f(a) {
      return a + 3;
    } // allocates a function (which is a callable object)
    
    // function expressions also allocate an object
    someElement.addEventListener('click', function() {
      someElement.style.backgroundColor = 'blue';
    }, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> n = <span class="hljs-number">374</span>; <span class="hljs-comment">// allocates memory for a number</span>
    <span class="hljs-keyword">var</span> s = <span class="hljs-string">'sessionstack'</span>; <span class="hljs-comment">// allocates memory for a string </span>
    
    <span class="hljs-keyword">var</span> o = {
      <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">b</span>: <span class="hljs-literal">null</span>
    }; <span class="hljs-comment">// allocates memory for an object and its contained values</span>
    
    <span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'str'</span>];  <span class="hljs-comment">// (like object) allocates memory for the</span>
                               <span class="hljs-comment">// array and its contained values</span>
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">a</span>) </span>{
      <span class="hljs-keyword">return</span> a + <span class="hljs-number">3</span>;
    } <span class="hljs-comment">// allocates a function (which is a callable object)</span>
    
    <span class="hljs-comment">// function expressions also allocate an object</span>
    someElement.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      someElement.style.backgroundColor = <span class="hljs-string">'blue'</span>;
    }, <span class="hljs-literal">false</span>);</code></pre>
<p>一些函数调用也会导致一些对象的分配：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    var d = new Date(); // allocates a Date object

    var e = document.createElement('div'); // allocates a DOM element" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    <span class="hljs-keyword">var</span> d = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">// allocates a Date object</span>

    <span class="hljs-keyword">var</span> e = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>); <span class="hljs-comment">// allocates a DOM element</span></code></pre>
<p>能够分配新的值或者对象的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var s1 = 'sessionstack';
    var s2 = s1.substr(0, 3); // s2 is a new string
    // Since strings are immutable, 
    // JavaScript may decide to not allocate memory, 
    // but just store the [0, 3] range.
    
    var a1 = ['str1', 'str2'];
    var a2 = ['str3', 'str4'];
    var a3 = a1.concat(a2); 
    // new array with 4 elements being
    // the concatenation of a1 and a2 elements" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> s1 = <span class="hljs-string">'sessionstack'</span>;
    <span class="hljs-keyword">var</span> s2 = s1.substr(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// s2 is a new string</span>
    <span class="hljs-comment">// Since strings are immutable, </span>
    <span class="hljs-comment">// JavaScript may decide to not allocate memory, </span>
    <span class="hljs-comment">// but just store the [0, 3] range.</span>
    
    <span class="hljs-keyword">var</span> a1 = [<span class="hljs-string">'str1'</span>, <span class="hljs-string">'str2'</span>];
    <span class="hljs-keyword">var</span> a2 = [<span class="hljs-string">'str3'</span>, <span class="hljs-string">'str4'</span>];
    <span class="hljs-keyword">var</span> a3 = a1.concat(a2); 
    <span class="hljs-comment">// new array with 4 elements being</span>
    <span class="hljs-comment">// the concatenation of a1 and a2 elements</span></code></pre>
<h3 id="articleHeader6">在JavaScript中使用内存</h3>
<p>基本上在JavaScript中分配内存，就意味着在其中读写。</p>
<p>这可以通过对一个变量或者一个对象的属性甚至是向函数传递一个参数来完成。</p>
<h3 id="articleHeader7">当内存不再需要的时候释放它</h3>
<p>大多数的内存管理的问题就来自于这个阶段。</p>
<p>最困难的任务就是如何知道何时被分配的不再需要了。它经常需要开发者决定在程序的什么地方某段内存不再需要了并且对其进行释放。</p>
<p>高层次语言内嵌了一个称为<strong>垃圾收集器</strong>的软件，他的任务就是跟踪内存分配并且用于需找不再需要的分配过的内存，并且自动地对其进行释放。</p>
<p>不幸的是，这个过程是一个近似，因为知道是否某块内存是需要的问题是<a href="http://en.wikipedia.org/wiki/Decidability_%28logic%29" rel="nofollow noreferrer" target="_blank">不可决定的</a>（无法通过算法解决）</p>
<p>大多数的垃圾收集器通过收集再也无法访问的内存工作，比如：指向它的所有变量都超出了作用域。然而，这依然是对于可以收集的内存空间的预估，因为在任何位置仍可能一些变量在作用域内指向这个内存，然而它再也不能被访问了。</p>
<h3 id="articleHeader8">垃圾收集器</h3>
<p>由于找到一些是“不再需要的”是不可决定的事实，垃圾收集实现了对一般问题的解决方案的限制。这一节将会解释理解主要的垃圾收集算法以及它们的限制的需要注意的事项。</p>
<h3 id="articleHeader9">内存引用</h3>
<p>垃圾收集算法依赖的主要概念之一就是<strong>引用</strong>。</p>
<p>在内存管理的上下文中，一个对象被称为是对于另外一个对象的引用，如果前者可以访问后者（隐含或明确的）。例如，一个JavaScript对象都有一个指向其<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">原型</a>的引用（<strong>隐含的引用</strong>）</p>
<p>在这个上下文中，“对象”的概念扩展到比普通的JavaScript对象要广并且包括函数作用域（或者全局<strong>词法作用域</strong>）。</p>
<blockquote><p>词法作用域定义了变量名称是如何在嵌套函数中解析的：内部函数包含了父函数的作用域即使父函数已经返回了。</p></blockquote>
<h3 id="articleHeader10">基于引用计数的垃圾收集器</h3>
<p>这是最简单的垃圾收集器算法。如果没有引用指向这个对象的时候，这个对象就被认为是“可以作为垃圾收集”。</p>
<p>请看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = {
  o2: {
    x: 1
  }
};

// 2 objects are created. 
// 'o2' is referenced by 'o1' object as one of its properties.
// None can be garbage-collected
var o3 = o1; // the 'o3' variable is the second thing that 
            // has a reference to the object pointed by 'o1'. 
o1 = 1;      // now, the object that was originally in 'o1' has a         
            // single reference, embodied by the 'o3' variable

var o4 = o3.o2; // reference to 'o2' property of the object.
                // This object has now 2 references: one as
                // a property. 
                // The other as the 'o4' variable

o3 = '374'; // The object that was originally in 'o1' has now zero
            // references to it. 
            // It can be garbage-collected.
            // However, what was its 'o2' property is still
            // referenced by the 'o4' variable, so it cannot be
            // freed.

o4 = null; // what was the 'o2' property of the object originally in
           // 'o1' has zero references to it. 
           // It can be garbage collected." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> o1 = {
  <span class="hljs-attr">o2</span>: {
    <span class="hljs-attr">x</span>: <span class="hljs-number">1</span>
  }
};

<span class="hljs-comment">// 2 objects are created. </span>
<span class="hljs-comment">// 'o2' is referenced by 'o1' object as one of its properties.</span>
<span class="hljs-comment">// None can be garbage-collected</span>
<span class="hljs-keyword">var</span> o3 = o1; <span class="hljs-comment">// the 'o3' variable is the second thing that </span>
            <span class="hljs-comment">// has a reference to the object pointed by 'o1'. </span>
o1 = <span class="hljs-number">1</span>;      <span class="hljs-comment">// now, the object that was originally in 'o1' has a         </span>
            <span class="hljs-comment">// single reference, embodied by the 'o3' variable</span>

<span class="hljs-keyword">var</span> o4 = o3.o2; <span class="hljs-comment">// reference to 'o2' property of the object.</span>
                <span class="hljs-comment">// This object has now 2 references: one as</span>
                <span class="hljs-comment">// a property. </span>
                <span class="hljs-comment">// The other as the 'o4' variable</span>

o3 = <span class="hljs-string">'374'</span>; <span class="hljs-comment">// The object that was originally in 'o1' has now zero</span>
            <span class="hljs-comment">// references to it. </span>
            <span class="hljs-comment">// It can be garbage-collected.</span>
            <span class="hljs-comment">// However, what was its 'o2' property is still</span>
            <span class="hljs-comment">// referenced by the 'o4' variable, so it cannot be</span>
            <span class="hljs-comment">// freed.</span>

o4 = <span class="hljs-literal">null</span>; <span class="hljs-comment">// what was the 'o2' property of the object originally in</span>
           <span class="hljs-comment">// 'o1' has zero references to it. </span>
           <span class="hljs-comment">// It can be garbage collected.</span></code></pre>
<h3 id="articleHeader11">循环在产生问题</h3>
<p>当遇到循环的时候就会有一个限制。在下面的实例之中，创建两个对象，并且互相引用，因此就会产生一个循环。当函数调用结束之后它们会走出作用域之外，因此它们就没什么用并且可以被释放。但是，基于引用计数的算法认为这两个对象都会被至少引用一次，所以它俩都不会被垃圾收集器收集。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 references o2
  o2.p = o1; // o2 references o1. This creates a cycle.
}

f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> o1 = {};
  <span class="hljs-keyword">var</span> o2 = {};
  o1.p = o2; <span class="hljs-comment">// o1 references o2</span>
  o2.p = o1; <span class="hljs-comment">// o2 references o1. This creates a cycle.</span>
}

f();</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVjHY?w=386&amp;h=209" src="https://static.alili.tech/img/bVVjHY?w=386&amp;h=209" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">标记-清除算法</h3>
<p>为了决定哪个对象是需要的，算法会决定是否这个对象是可访问的。</p>
<p>这个算法由以下步骤组成：</p>
<ol>
<li>这个垃圾收集器构建一个“roots”列表。Root是全局变量，被代码中的引用所保存。在 JavaScript中，“window”就是这样的作为root的全局变量的例子。</li>
<li>所有的root都会被监测并且被标志成活跃的（比如不是垃圾）。所有的子代也会递归地被监测。所有能够由root访问的一切都不会被认为是垃圾。</li>
<li>所有不再被标志成活跃的内存块都被认为是垃圾。这个收集器现在就可以释放这些内存并将它们返还给操作系统。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVVjH2?w=972&amp;h=514" src="https://static.alili.tech/img/bVVjH2?w=972&amp;h=514" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个算法要优于之前的因为“一个具有0引用的对象”可以让一个对象不能够再被访问。但是相反的却不一定成立，比如我们遇到循环的时候。</p>
<p>在2012年，所有的现代浏览器都使用标记-清除垃圾收集器。过去几年，JavaScript垃圾收集（代数/增量/并行/并行垃圾收集）领域的所有改进都是对该算法（标记和扫描）的实现进行了改进，但并没有对垃圾收集算法本身的改进， 其目标是确定一个对象是否可达。</p>
<p><a href="https://en.wikipedia.org/wiki/Tracing_garbage_collection" rel="nofollow noreferrer" target="_blank">在这篇文章中</a>，你可以得到更多关于垃圾收集追踪并且也覆盖到了关于标记-清除算法的优化。</p>
<h3 id="articleHeader13">循环不再是一个问题</h3>
<p>在上述的第一个例子中，在函数调用返回之后，这两个对象不能够被全局对象所访问。因此，垃圾收集器就会发现它们不能够被访问了。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjH5?w=1024&amp;h=768" src="https://static.alili.tech/img/bVVjH5?w=1024&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>即使在这两个对象之间存在着引用，它们再也不能从root访问了。</p>
<h3 id="articleHeader14">列举垃圾收集器的直观行为</h3>
<p>虽然垃圾收集器很方便，但它们自己也有自己的代价。 其中一个是非确定论。 换句话说，GC是不可预测的。 你不能真正地告诉你什么时候会收集。 这意味着在某些情况下，程序会使用实际需要的更多内存。 在其他情况下，特别敏感的应用程序可能会引起短暂暂停。 虽然非确定性意味着在执行集合时无法确定，但大多数GC实现共享在分配期间执行收集遍历的常见模式。 如果没有执行分配，大多数GC保持空闲状态。 考虑以下情况：</p>
<ol>
<li>执行相当大的一组分配。</li>
<li>这些元素中的大多数（或全部）被标记为不可访问（假设我们将指向我们不再需要的缓存的引用置空）。</li>
<li>不再执行分配。</li>
</ol>
<p>在这种情况下，大多数GC不会再运行收集处理。换句话说，即使存在对于收集器来说不可访问的引用，它们也不会被收集器所认领。严格意义来说这并不是泄露，但是依然会导致比平常更多的内存使用。</p>
<h3 id="articleHeader15">什么是内存泄露？</h3>
<p>实质上，内存泄漏可以被定义为应用程序不再需要的内存，但是由于某些原因不会返回到操作系统或可用内存池。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjIb?w=450&amp;h=437" src="https://static.alili.tech/img/bVVjIb?w=450&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>编程语言有支持管理内存的不同方法。 然而，某块内存是否被使用实际上是一个<a>不可判定的问题</a>。 换句话说，只有开发人员可以清楚一个内存是否可以返回到操作系统。</p>
<p>某些编程语言提供了帮助开发者执行此操作的功能。其他的则期望开发人员能够完全明确何时使用一块内存。 维基百科有关于<a href="https://en.wikipedia.org/wiki/Manual_memory_management" rel="nofollow noreferrer" target="_blank">手动</a>和<a href="https://en.wikipedia.org/wiki/Manual_memory_management" rel="nofollow noreferrer" target="_blank">自动</a>内存管理的好文章。</p>
<h3 id="articleHeader16">四种常见的JavaScript泄露</h3>
<h3 id="articleHeader17">1: 全局变量</h3>
<p>JavaScript 使用一种有趣的方式处理未声明的变量：一个未声明变量的引用会在<em>全局</em>对象内部产生一个新的变量。在浏览器的情况，这个全局变量就会是window。换句话说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    bar = &quot;some text&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    bar = <span class="hljs-string">"some text"</span>;
}</code></pre>
<p>等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    window.bar = &quot;some text&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-built_in">window</span>.bar = <span class="hljs-string">"some text"</span>;
}</code></pre>
<p>如果bar被期望仅仅在foo函数作用域内保持对变量的引用，并且你忘记使用var去声明它，一个意想不到的全局变量就产生了。</p>
<p>在这个例子中，泄露就仅仅是一个字符串并不会带来太多危害，但是它可能会变得更糟。</p>
<p>另外一种可能产生意外的全局变量的方式是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    this.var1 = &quot;potential accidental global&quot;;
}

// Foo called on its own, this points to the global object (window)
// rather than being undefined.
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.var1 = <span class="hljs-string">"potential accidental global"</span>;
}

<span class="hljs-comment">// Foo called on its own, this points to the global object (window)</span>
<span class="hljs-comment">// rather than being undefined.</span>
foo();</code></pre>
<blockquote><p>为了阻止这些错误的发生，可以在js文件头部添加'use strict'。这将会使用严格模式来解析 JavaScript 从而阻止意外的全局变量。<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode" rel="nofollow noreferrer" target="_blank">了解更多</a>关于JavaScript执行的模式。</p></blockquote>
<p>即使我们讨论了未预期的全局变量，但仍然有很多代码用显式的全局变量填充。 这些定义是不可收集的（除非分配为null或重新分配）。 特别是，用于临时存储和处理大量信息的全局变量值得关注。 如果你必须使用全局变量来存储大量数据，请确保在完成之后<strong>将其分配为null或重新分配</strong>。</p>
<h3 id="articleHeader18">2: 被遗忘的计时器和回调</h3>
<p><code>setInterval</code> 在 JavaScript 中是经常被使用的。</p>
<p>大多数提供观察者和其他模式的回调函数库都会在调用自己的实例变得无法访问之后对其任何引用也设置为不可访问。 但是在<code>setInterval</code>的情况下，这样的代码很常见：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //This will be executed every ~5 seconds." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> serverData = loadData();
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> renderer = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'renderer'</span>);
    <span class="hljs-keyword">if</span>(renderer) {
        renderer.innerHTML = <span class="hljs-built_in">JSON</span>.stringify(serverData);
    }
}, <span class="hljs-number">5000</span>); <span class="hljs-comment">//This will be executed every ~5 seconds.</span></code></pre>
<p>这个例子说明了计时器可能发生的情况：计时器可能会产生再也不被需要的节点或者数据的引用。</p>
<p><code>renderer</code>所代表的对象在未来可能被移除，让部分interval 处理器中代码变得不再被需要。然而，这个处理器不能够被收集因为interval依然活跃的（这个interval需要被停止从而表面这种情况）。如果这个interval处理器不能够被收集，那么它的依赖也不能够被收集。这意味这存储大量数据的<code>severData</code>也不能够被收集。</p>
<p>在这种观察者的情况下，做出准确的调用从而在不需要它们的时候立即将其移除是非常重要的（或者相关的对象被置为不可访问的）。</p>
<p>过去，以前特别重要的是某些浏览器（好的老IE 6）无法管理好循环引用（有关更多信息，请参见下文）。 如今，大多数浏览器一旦观察到的对象变得无法访问，就能收集观察者处理器，即使侦听器没有被明确删除。 但是，在处理对象之前，明确删除这些观察者仍然是一个很好的做法。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.getElementById('launch-button');
var counter = 0;

function onClick(event) {
   counter++;
   element.innerHtml = 'text ' + counter;
}

element.addEventListener('click', onClick);

// Do stuff

element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);

// Now when element goes out of scope,
// both element and onClick will be collected even in old browsers // that don't handle cycles well." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'launch-button'</span>);
<span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params">event</span>) </span>{
   counter++;
   element.innerHtml = <span class="hljs-string">'text '</span> + counter;
}

element.addEventListener(<span class="hljs-string">'click'</span>, onClick);

<span class="hljs-comment">// Do stuff</span>

element.removeEventListener(<span class="hljs-string">'click'</span>, onClick);
element.parentNode.removeChild(element);

<span class="hljs-comment">// Now when element goes out of scope,</span>
<span class="hljs-comment">// both element and onClick will be collected even in old browsers // that don't handle cycles well.</span></code></pre>
<p>当今，现在浏览器（报错IE和Edge）都使用了现代的垃圾收集算法，其能够检测到这些循环并且进行适宜的处理。换句话说，再也不是严格需要在将节点置为不可访问之前调用removeEventListener 。</p>
<p>框架和库（如jQuery）在处理节点之前（在为其使用特定的API时）会删除侦听器。 这是由库内部处理的，这也确保没有泄漏，即使在有问题的浏览器下运行，如...是的，IE 6。</p>
<h3 id="articleHeader19">3: 闭包</h3>
<p>JavaScript 开发的一个关键方面是闭包：一个可以访问外部（封闭）函数变量的内部函数。 由于JavaScript运行时的实现细节，可以通过以下方式泄漏内存：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var theThing = null;
 var replaceThing = function () {
     var originalThing = theThing;
     var unused = function () {
        if (originalThing) // a reference to 'originalThing'
              console.log(&quot;hi&quot;);
      };

      theThing = {
        longStr: new Array(1000000).join('*'),
        someMethod: function () {
              console.log(&quot;message&quot;);
        }
  };
};

setInterval(replaceThing, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">var</span> theThing = <span class="hljs-literal">null</span>;
 <span class="hljs-keyword">var</span> replaceThing = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">var</span> originalThing = theThing;
     <span class="hljs-keyword">var</span> unused = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (originalThing) <span class="hljs-comment">// a reference to 'originalThing'</span>
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>);
      };

      theThing = {
        <span class="hljs-attr">longStr</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000000</span>).join(<span class="hljs-string">'*'</span>),
        <span class="hljs-attr">someMethod</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"message"</span>);
        }
  };
};

setInterval(replaceThing, <span class="hljs-number">1000</span>);</code></pre>
<p>这个代码段会做一件事情：每次 <code>replaceThing</code> 被调用时，<code>theThing</code> 都会获取一个一个包含一个大数组的以及一个新的闭包（<code>someMethod</code>）。同时，<code>unused</code> 会保持一个指向<code>originalThing</code>引用的闭包（从上一个调用的<code>theThing</code>到<code>replaceThing</code>）。可能已经很迷惑了，是不是？重要的事情是<strong>一旦在相同的父级作用域为闭包产生作用域，这个作用域就会被共享</strong>。</p>
<p>在这种情况下，为<code>someMethod</code>闭包产生的作用域就会被<code>unused</code> 所共享。<code>unused</code> 具有对于<code>originaThing</code>的引用。即使 <code>unused</code>  不再被使用，<code>someMethod</code>依然可以通过<code>replaceThing</code>作用域之外的<code>theThing</code>来使用。并且由于<code>somethod</code>和<code>unused</code> 共享闭包作用域，unused指向originalThing的引用强迫其保持活跃（两个闭包之间的整个共享作用域）。这将会阻止垃圾手机。</p>
<p>当这个代码段重复运行时，可以观察到内存使用量的稳定增长。 当GC运行时，这不会变小。 实质上，创建了一个关闭的链接列表（其root以TheThing变量的形式），并且这些闭包的范围中的每一个都对大数组进行间接引用，导致相当大的泄漏。</p>
<p>这个问题由Meteor团队发现，他们有<a href="https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156" rel="nofollow noreferrer" target="_blank">一篇很好的文章</a>，详细描述了这个问题。</p>
<h3 id="articleHeader20">4: DOM 之外的引用</h3>
<p>有时将DOM节点存储在数据结构中可能是有用的。 假设要快速更新表中的几行内容。 存储对字典或数组中每个DOM行的引用可能是有意义的。 当发生这种情况时，会保留对同一DOM元素的两个引用：一个在DOM树中，另一个在字典中。 如果将来某个时候您决定删除这些行，则需要使两个引用置为不可访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};

function doStuff() {
    image.src = 'http://example.com/image_name.png';
}

function removeImage() {
    // The image is a direct child of the body element.
    document.body.removeChild(document.getElementById('image'));

    // At this point, we still have a reference to #button in the
    //global elements object. In other words, the button element is
    //still in memory and cannot be collected by the GC.
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elements = {
    <span class="hljs-attr">button</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>),
    <span class="hljs-attr">image</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'image'</span>)
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStuff</span>(<span class="hljs-params"></span>) </span>{
    image.src = <span class="hljs-string">'http://example.com/image_name.png'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeImage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// The image is a direct child of the body element.</span>
    <span class="hljs-built_in">document</span>.body.removeChild(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'image'</span>));

    <span class="hljs-comment">// At this point, we still have a reference to #button in the</span>
    <span class="hljs-comment">//global elements object. In other words, the button element is</span>
    <span class="hljs-comment">//still in memory and cannot be collected by the GC.</span>
}</code></pre>
<p>还有一个额外的考虑，当涉及对DOM树内部的内部或叶节点的引用时，必须考虑这一点。 假设你在JavaScript代码中保留对表格特定单元格（&lt;td&gt;标记）的引用。 有一天，你决定从DOM中删除该表，但保留对该单元格的引用。 直观地，可以假设GC将收集除了该单元格之外的所有内容。 实际上，这不会发生：该单元格是该表的子节点，并且孩子们保持对父代的引用。 也就是说，从JavaScript代码引用表格单元会导致整个表保留在内存中。 保持对DOM元素的引用时需要仔细考虑。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]JavaScript是如何工作的：内存管理以及如何处理四种常见的内存泄漏

## 原文链接
[https://segmentfault.com/a/1190000011229300](https://segmentfault.com/a/1190000011229300)


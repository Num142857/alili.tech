---
title: '【译】JavaScript是如何工作的：内存管理 + 如何处理4个常见的内存泄露' 
date: 2018-12-30 2:30:10
hidden: true
slug: mjvceau912g
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@NewNewKing" rel="nofollow noreferrer" target="_blank">Leslie Wang</a><br>审校: <a href="http://www.zcfy.cc/@cncuckoo" rel="nofollow noreferrer" target="_blank">为之漫笔</a><br>链接：<a href="http://www.zcfy.cc/article/4211" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/4211</a><br>原文：<a href="https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec" rel="nofollow noreferrer" target="_blank">https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec</a></p></blockquote>
<p>几周前，我们开始写一个系列，深入探讨JavaScript和它的工作原理。我们认为了解JavaScript的构成以及它们如何协作，有助于编写出更好的代码和应用程序。</p>
<p>本系列第一篇重点介绍了<a href="https://segmentfault.com/a/1190000010818776">引擎、运行时、调用栈</a>。第二篇揭示了谷歌V8 JavaScript引擎的内部机制，并且提供了一些关于如何写出更好的JavaScript代码的建议。</p>
<p>本文作为第三篇，将会讨论另一个开发者容易忽视的重要主题 ：内存管理。我们也会提供一些关于如何处理JavaScript内存泄露的技巧。在SessionStack，我们需要确保不会造成内存泄露或者不会增加我们集成的Web应用的内存消耗。</p>
<h3 id="articleHeader0">概述</h3>
<p>某些语言，比如C有低级的原生内存管理原语，像<code>malloc()</code>和<code>free()</code>。开发人员使用这些原语可以显式分配和释放操作系统的内存。</p>
<p>相对地，JavaScript会在创建变量（对象、字符串）时自动分配内存，并在这些变量不被使用时自动释放内存，这个过程被称为<strong>垃圾回收</strong>。这个“自动”释放资源的特性带来了很多困惑，让JavaScript（和其他高级级语言）开发者误以为可以不关心内存管理。<strong>这是一个很大的错误</strong></p>
<p>即使使用高级级语言，开发者也应该对于内存管理有一定的理解（至少有基本的理解）。有时自动内存管理存在一些问题（例如垃圾回收实现可能存在缺陷或者不足），开发者必须弄明白这些问题，以便找一个合适解决方法。</p>
<h3 id="articleHeader1">内存生命周期</h3>
<p>无论你用哪一种编程语言，内存生命周期几乎总是一样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411126" src="https://static.alili.tech/img/remote/1460000011411126" alt="" title="" style="cursor: pointer;"></span></p>
<p>Here is an overview of what happens at each step of the cycle:<br>这是对生命周期中的每一步大概的说明：</p>
<ul>
<li>
<strong>分配内存</strong>— 内存是被操作系统分配，这允许程序使用它。在低级语言中（例如C），这是一个作为开发者需要处理的显式操作。在高级语言中，然而，这些操作都代替开发者进行了处理。</li>
<li>
<strong>使用内存。</strong>实际使用之前分配的内存，通过在代码操作变量对内在进行读和写。</li>
<li>
<strong>释放内存</strong> 。不用的时候，就可以释放内存，以便重新分配。与分配内存操作一样，释放内存在低级语言中也需要显式操作。</li>
</ul>
<p>想要快速的了解堆栈和内存的概念，可以阅读本系列第一篇文章。</p>
<h4>什么是内存</h4>
<p>在直接探讨Javascript中的内存之前，我们先简要的讨论一下什么是内存、内存大概是怎么样工作的。</p>
<p>在硬件中，电脑的内存包含了大量的触发电路，每一个触发电路都包含一些&lt;span style="font-size: 1rem;"&gt;能够储存1位数据的&lt;/span&gt;晶体管。触发器通过<strong>唯一标识符</strong>来寻址，从而可以读取和覆盖它们。因此，从概念上来讲，可以认为电脑内存是一个巨大的可读写阵列。</p>
<p>人类不善于把我们所有的思想和算术用位运算来表示，我们把这些小东西组织成一个大家伙，这些大家伙可以用来表现数字：8位是一个字节。字节之上是字（16位、32位）。</p>
<p>许多东西被存储在内存中：</p>
<ol>
<li>所有的变量和程序中用到的数据；</li>
<li>程序的代码，包括操作系统的代码。</li>
</ol>
<p>编译器和操作系统共同工作帮助开发者完成大部分的内存管理，但是我们推荐你了解一下底层到底发生了什么。</p>
<p>编译代码的时候，编译器会解析原始数据类型，提前计算出它们需要多大的内存空间。然后将所需的数量分配在<strong>栈空间</strong>中。之所以称为栈空间，是因在函数被调用的时候，他们的内存被添加在现有内存之上（就是会在栈的最上面添加一个栈帧来指向存储函数内部变量的空间）。终止的时候，以LIFO（后进先出）的顺序移除这些调用。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int n; // 4字节
int x[4]; // 4个元素的数组，每个元素4字节
double m; // 8字节
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">int</span> n; <span class="hljs-comment">// 4字节</span>
<span class="hljs-keyword">int</span> x[<span class="hljs-number">4</span>]; <span class="hljs-comment">// 4个元素的数组，每个元素4字节</span>
<span class="hljs-keyword">double</span> m; <span class="hljs-comment">// 8字节</span>
</code></pre>
<p>编译器马上知道需要内存<br>4 + 4 × 4 + 8 = 28字节。</p>
<blockquote><p>这是当前整型和双精度的大小。大约20年以前，整型通常只需要2个字节，双精度需要4个字节，你的代码不受基础数据类型大小的限制。</p></blockquote>
<p>编译器会插入与操作系统交互的代码，来请求栈中必要大小的字节来储存变量。</p>
<p>在上面的例子中，编辑器知道每个变量准确的地址。事实上，无论什么时候我们写变量<code>n</code>，将会在内部被翻译成类似“memory address 4127963”的语句。</p>
<p>注意，如果我们尝试访问<code>x[4]</code>的内存（开始声明的x[4]是长度为4的数组，<code>x[4]</code>表示第五个元素），我们会访问m的数据。那是因为我们正在访问一个数组里不存在的元素，m比数组中实际分配内存的最后一个元素<code>x[3]</code>要远4个字节，可能最后的结果是读取（或者覆盖）了<code>m</code>的一些位。这肯定会对其他程序产生不希望产生的结果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411127" src="https://static.alili.tech/img/remote/1460000011411127" alt="" title="" style="cursor: pointer;"></span></p>
<p>当函数调用其他函数的时候，每一个函数被调用的时候都会获得自己的栈块。在自己的栈块里会保存函数内所有的变量，还有一个程序计数器会记录变量执行时所在的位置。当函数执行完之后，会释放它的内存以作他用。</p>
<h4>动态分配</h4>
<p>不幸的是，事情并不是那么简单，因为在编译的时候我们并不知道一个变量将会需要多少内存。假设我们做了下面这样的事：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int n = readInput(); //读取用户的输入

...

//创建一个有n个元素的数组
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">int</span> n = readInput(); <span class="hljs-comment">//读取用户的输入</span>

...

<span class="hljs-comment">//创建一个有n个元素的数组</span>
</code></pre>
<p>编译器不知道这个数组需要多少内存，因为数组大小取决于用户提供的值。</p>
<p>因此，此时不能在栈上分配空间。程序必须在运行时向操作系统请求够用的空间。此时内存从<strong>堆空间</strong>中被分配。静态与动态分配内存之间的不同在下面的表格中被总结出来：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411128" src="https://static.alili.tech/img/remote/1460000011411128" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>静态分配内存与动态分配内存的区别。</p>
<p>为了完全理解动态内存是如何分配的，我们需要花更多的时间在<strong>指针</strong>上，这个可能很大程度上偏离了这篇文章的主题。如果你有兴趣学习更多的知识，那就在评论中让我知道，我就可以在之后的文章中写更多关于指针的细节。</p>
<h4>JavaScript中的内存分配</h4>
<p>现在我们来解释JavaScript中的第一步(<strong>分配内存</strong>)是如何工作的。</p>
<p>JavaScript在开发者声明值的时候自动分配内存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = 374; // 为数值分配内存
var s = 'sessionstack'; //为字符串分配内存

var o = {
  a: 1,
  b: null
};  //为对象和它包含的值分配内存

var a = [1, null, 'str']; //为数组和它包含的值分配内存

function f(a) {
  return a + 3;
} //为函数(可调用的对象)分配内存

//函数表达式也会分配一个对象
someElement.addEventListener('click', function() {
  someElement.style.backgroundColor = 'blue';
}, false);

 //一些函数调用也会导致对象分配
`var d = new Date(); // allocates a Date object`   //分配一个Date对象的内存

`var e = document.createElement('div');  //分配一个DOM元素的内存

//方法可以分配新的值或者对象

var s1 = 'sessionstack';
var s2 = s1.substr(0, 3);  //s2是一个新的字符串
// 因为字符串是不可变的
// JavaScript可能决定不分配内存
// 而仅仅存储 0-3的范围

var a1 = ['str1', 'str2'];
var a2 = ['str3', 'str4'];
var a3 = a1.concat(a2); 
//新的数组有4个元素是a1和a2连接起来的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> n = <span class="hljs-number">374</span>; <span class="hljs-comment">// 为数值分配内存</span>
<span class="hljs-keyword">var</span> s = <span class="hljs-string">'sessionstack'</span>; <span class="hljs-comment">//为字符串分配内存</span>

<span class="hljs-keyword">var</span> o = {
  a: <span class="hljs-number">1</span>,
  b: <span class="hljs-literal">null</span>
};  <span class="hljs-comment">//为对象和它包含的值分配内存</span>

<span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'str'</span>]; <span class="hljs-comment">//为数组和它包含的值分配内存</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">(a)</span> </span>{
  <span class="hljs-keyword">return</span> a + <span class="hljs-number">3</span>;
} <span class="hljs-comment">//为函数(可调用的对象)分配内存</span>

<span class="hljs-comment">//函数表达式也会分配一个对象</span>
someElement.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  someElement.style.backgroundColor = <span class="hljs-string">'blue'</span>;
}, <span class="hljs-literal">false</span>);

 <span class="hljs-comment">//一些函数调用也会导致对象分配</span>
`<span class="hljs-keyword">var</span> d = <span class="hljs-keyword">new</span> Date(); <span class="hljs-comment">// allocates a Date object`   //分配一个Date对象的内存</span>

`<span class="hljs-keyword">var</span> e = document.createElement(<span class="hljs-string">'div'</span>);  <span class="hljs-comment">//分配一个DOM元素的内存</span>

<span class="hljs-comment">//方法可以分配新的值或者对象</span>

<span class="hljs-keyword">var</span> s1 = <span class="hljs-string">'sessionstack'</span>;
<span class="hljs-keyword">var</span> s2 = s1.substr(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">//s2是一个新的字符串</span>
<span class="hljs-comment">// 因为字符串是不可变的</span>
<span class="hljs-comment">// JavaScript可能决定不分配内存</span>
<span class="hljs-comment">// 而仅仅存储 0-3的范围</span>

<span class="hljs-keyword">var</span> a1 = [<span class="hljs-string">'str1'</span>, <span class="hljs-string">'str2'</span>];
<span class="hljs-keyword">var</span> a2 = [<span class="hljs-string">'str3'</span>, <span class="hljs-string">'str4'</span>];
<span class="hljs-keyword">var</span> a3 = a1.concat(a2); 
<span class="hljs-comment">//新的数组有4个元素是a1和a2连接起来的。</span>
</code></pre>
<h4>在JavaScript中使用内存</h4>
<p>在JavaScript中使用被分配的内存，本质上就是对内在的读和写。</p>
<p>比如，读、写变量的值或者对象的属性，抑或向一个函数传递参数。</p>
<h4>内存不在被需要时释放内存</h4>
<p>大部分的内存管理问题都在这个阶段出现。</p>
<p>这里最难的任务是找出这些被分配的内存什么时候不再被需要。这常常要求开发者去决定程序中的一段内存不在被需要而且释放它。</p>
<p>高级语言嵌入了一个叫<strong>垃圾回收</strong>的软件，它的工作是跟踪内存的分配和使用，以便于发现一些内存在一些情况下不再被需要，它将会自动地释放这些内存。</p>
<p>不幸的是，这个过程是一个近似的过程，因为一般关于知道内存是否是被需要的问题是不可判断的（不能用一个算法解决）。</p>
<p>大部分的垃圾回收器会收集不再被访问的内存，例如指向它的所有变量都在作用域之外。然而，这是一组可以收集的内存空间的近似值。因为在任何时候，一个内存地址可能还有一个在作用域里的变量指向它，但是它将不会被再次访问。</p>
<h4>垃圾收集</h4>
<p>由于找到一些内存是否是“不再被需要的”这个事实是不可判定的，垃圾回收的实现存在局限性。本节解释必要的概念去理解主要的垃圾回收算法和它们的局限性。</p>
<h4>内存引用</h4>
<p>垃圾回收算法依赖的主要概念是<strong>引用。</strong></p>
<p>在内存管理的语境下，一个对象只要显式或隐式访问另一个对象，就可以说它引用了另一个对象。例如，JavaScript对象引用其Prototype（<strong>隐式引用</strong>），或者引用prototype对象的属性值（<strong>显式引用</strong>）。</p>
<p>在这种情况下，“对象”的概念扩展到比普通JavaScript对象更广的范围，并且还包含函数作用域。（或者global<strong>词法作用域</strong>）</p>
<blockquote><p>词法作用域定义变量的名字在嵌套的函数中如何被解析：内部的函数包含了父级函数的作用域，即使父级函数已经返回。</p></blockquote>
<h4>引用计数垃圾回收</h4>
<p>这是最简单的垃圾回收算法。 一个对象在没有其他的引用指向它的时候就被认为“可被回收的”。</p>
<p>看一下下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = {
  o2: {
    x: 1
  }
};

//2个对象被创建
/'o2'被'o1'作为属性引用
//谁也不能被回收

var o3 = o1; //'o3'是第二个引用'o1'指向对象的变量

o1 = 1;      //现在，'o1'只有一个引用了，就是'o3'
var o4 = o3.o2; // 引用'o3'对象的'o2'属性
                //'o2'对象这时有2个引用： 一个是作为对象的属性
                //另一个是'o4'

o3 = '374'; //'o1'原来的对象现在有0个对它的引用
             //'o1'可以被垃圾回收了。
            //然而它的'o2'属性依然被'o4'变量引用，所以'o2'不能被释放。

o4 = null;  //最初'o1'中的'o2'属性没有被其他的引用了
           //'o2'可以被垃圾回收了
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cal"><code><span class="hljs-keyword">var</span> o1 = {
  o2: {
    x: <span class="hljs-number">1</span>
  }
};

//<span class="hljs-number">2</span>个对象被创建
/<span class="hljs-string">'o2'</span>被<span class="hljs-string">'o1'</span>作为属性引用
//谁也不能被回收

<span class="hljs-keyword">var</span> o3 = o1; //<span class="hljs-string">'o3'</span>是第二个引用<span class="hljs-string">'o1'</span>指向对象的变量

o1 = <span class="hljs-number">1</span>;      //现在，<span class="hljs-string">'o1'</span>只有一个引用了，就是<span class="hljs-string">'o3'</span>
<span class="hljs-keyword">var</span> o4 = o3.o2; // 引用<span class="hljs-string">'o3'</span>对象的<span class="hljs-string">'o2'</span>属性
                //<span class="hljs-string">'o2'</span>对象这时有<span class="hljs-number">2</span>个引用： 一个是作为对象的属性
                //另一个是<span class="hljs-string">'o4'</span>

o3 = <span class="hljs-string">'374'</span>; //<span class="hljs-string">'o1'</span>原来的对象现在有<span class="hljs-number">0</span>个对它的引用
             //<span class="hljs-string">'o1'</span>可以被垃圾回收了。
            //然而它的<span class="hljs-string">'o2'</span>属性依然被<span class="hljs-string">'o4'</span>变量引用，所以<span class="hljs-string">'o2'</span>不能被释放。

o4 = null;  //最初<span class="hljs-string">'o1'</span>中的<span class="hljs-string">'o2'</span>属性没有被其他的引用了
           //<span class="hljs-string">'o2'</span>可以被垃圾回收了
</code></pre>
<h4>循环引用创造麻烦</h4>
<p>在涉及循环引用的时候有一个限制。在下面的例子中，两个对象被创建了，而且相互引用，这样创建了一个循环引用。它们会在函数调用后超出作用域，应该可以释放。然而引用计数算法考虑到2个对象中的每一个至少被引用了一次，因此都不可以被回收。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 引用 o2
  o2.p = o1; // o2 引用 o1\. 形成循环引用
}

f();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> o1 = {};
  <span class="hljs-keyword">var</span> o2 = {};
  o1.p = o2; <span class="hljs-comment">// o1 引用 o2</span>
  o2.p = o1; <span class="hljs-comment">// o2 引用 o1\. 形成循环引用</span>
}

f();
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411129" src="https://static.alili.tech/img/remote/1460000011411129" alt="" title="" style="cursor: pointer;"></span></p>
<h4>标记清除算法</h4>
<p>为了决定一个对象是否被需要，这个算法用于确定是否可以找到某个对象。</p>
<p>这个算法包含以下步骤。</p>
<ol>
<li>垃圾回收器生成一个根列表。根通常是将引用保存在代码中的全局变量。在JavaScript中，window对象是一个可以作为根的全局变量。</li>
<li>所有的根都被检查和标记成活跃的（不是垃圾），所有的子变量也被递归检查。所有可能从根元素到达的都不被认为是垃圾。</li>
<li>所有没有被标记成活跃的内存都被认为是垃圾。垃圾回收器就可以释放内存并且把内存还给操作系统。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411130" src="https://static.alili.tech/img/remote/1460000011411130" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图就是标记清除示意。</p>
<p>这个算法就比之前的（引用计算）要好些，因为“一个对象没有被引用”导致这个对象不能被访问。相反，正如我们在循环引用的示例中看到的，对象不能被访问到，不一定不存在引用。</p>
<p>2012年起，所有浏览器都内置了标记清除垃圾回收器。在过去几年中，JavaScript垃圾回收领域中的所有改进（代/增量/并行/并行垃圾收集）都是由这个算法（标记清除法）改进实现的，但并不是对垃圾收集算法本身的改进，也没有改变它确定对象是否可达这个目标。</p>
<p>推荐<a href="https://en.wikipedia.org/wiki/Tracing_garbage_collection" rel="nofollow noreferrer" target="_blank">一篇文章</a>，其中有关于跟踪垃圾回收的细节，包括了标记清除法和它的优化算法。</p>
<h4>循环引用不再是问题</h4>
<p>在上面的例子中（循环引用的那个），在函数执行完之后，这个2个对象没有被任何可以到达的全局对象所引用。因此，他们将会被垃圾回收器发现为不可到达的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411131" src="https://static.alili.tech/img/remote/1460000011411131" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>尽管在这两个对象之间有相互引用，但是他们不能从全局对象上到达。</p>
<h4>垃圾回收器的反常行为</h4>
<p>尽管垃圾回收器很方便，但是他们有一套自己的方案。其中之一就是不确定性。换句话说，GC是不可预测的。你不可能知道一个回收器什么时候会被执行。这意味着程序在某些情况下会使用比实际需求还要多的内存。在其他情况下，在特别敏感的应用程序中，可能会出现短停顿。尽管不确定意味着不能确定回收工作何时执行，但大多数GC实现都会在分配内存的期间启动收集例程。如果没有内存分配，大部分垃圾回收就保持空闲。参考下面的情况。</p>
<ol>
<li>执行相当大的一组分配。</li>
<li>这些元素中的大部分（或者所有的）都被标记为不可到达的(假设我们清空了一个指向我们不再需要的缓存的引用。)</li>
<li>没有更多的分配被执行。</li>
</ol>
<p>在这种情况下，大多数垃圾回收实现都不会做进一步的回收。换句话说，尽管这里有不可达的引用变量可供回收，回收器也不会管。严格讲，这不是泄露，但结果却会占用比通常情况下更多的内存。</p>
<h4>什么是内存泄漏</h4>
<p>内存泄漏基本上就是不再被应用需要的内存，由于某种原因，没有被归还给操作系统或者进入可用内存池。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411132" src="https://static.alili.tech/img/remote/1460000011411132" alt="" title="" style="cursor: pointer;"></span></p>
<p>编程语言喜欢不同的管理内存方式。然而，一段确定的内存是否被使用是一个不可判断的问题。换句话说，只有开发者才能弄清楚，是否一段内存可以被还给操作系统。</p>
<p>某些编程语言为开发者提供了释放内存功能。另一些则期待开发者清楚的知道一段内存什么时候是没用的。Wikipedia有一篇非常好的关于内存管理的文章。</p>
<h4>4种常见的JavaScript内存泄漏</h4>
<h4>1：全局变量</h4>
<p>JavaScript用一个有趣的方式管理未被声明的变量：对未声明的变量的引用在全局对象里创建一个新的变量。在浏览器的情况下，这个全局对象是<code>window</code>。换句话说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    bar = &quot;some text&quot;;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(arg)</span> </span>{
    bar = <span class="hljs-string">"some text"</span>;
}
</code></pre>
<p>等同于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    window.bar = &quot;some text&quot;;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-built_in">window</span>.bar = <span class="hljs-string">"some text"</span>;
}
</code></pre>
<p>如果<code>bar</code>被假定只在<code>foo</code>函数的作用域里引用变量，但是你忘记了使用<code>var</code>去声明它，一个意外的全局变量就被声明了。</p>
<p>在这个例子里，泄漏一个简单的字符串不会造成很大的伤害，但是它确实有可能变得更糟。</p>
<p>另外一个意外创建全局变量的方法是通过<code>this</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    this.var1 = &quot;potential accidental global&quot;;
}

// Foo作为函数调用，this指向全局变量(window)
// 而不是undefined
foo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.var1 = <span class="hljs-string">"potential accidental global"</span>;
}

<span class="hljs-comment">// Foo作为函数调用，this指向全局变量(window)</span>
<span class="hljs-comment">// 而不是undefined</span>
foo();
</code></pre>
<blockquote><p>为了防止这些问题发生，可以在你的JaveScript文件开头使用<code>'use strict'；</code>。这个可以使用一种严格的模式解析JavaScript来阻止意外的全局变量。</p></blockquote>
<p>除了意外创建的全局变量，明确创建的全局变量同样也很多。这些当然属于不能被回收的（除非被指定为null或者重新分配）。特别那些用于暂时存储数据的全局变量，是非常重要的。如果你必须要使用全局变量来存储大量数据，确保在是使用完成之后为其赋值<strong>null或者重新赋其他值。</strong></p>
<h4>2: 被遗忘的定时器或者回调</h4>
<p>在JavaScript中使用<code>setInterval</code>是十分常见的。</p>
<p>大多数库，特别是提供观察器或其他接收回调的实用函数的，都会在自己的实例无法访问前把这些回调也设置为无法访问。但涉及<code>setInterval</code>时，下面这样的代码十分常见：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //每5秒执行一次
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> serverData = loadData();
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> renderer = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'renderer'</span>);
    <span class="hljs-keyword">if</span>(renderer) {
        renderer.innerHTML = <span class="hljs-built_in">JSON</span>.stringify(serverData);
    }
}, <span class="hljs-number">5000</span>); <span class="hljs-comment">//每5秒执行一次</span>
</code></pre>
<p>定时器可能会导致对不需要的节点或者数据的引用。</p>
<p><code>renderer</code>对象在将来有可能被移除，让interval处理器内部的整个块都变得没有用。但由于interval仍然起作用，处理程序并不能被回收（除非interval停止）。如果interval不能被回收，它的依赖也不可能被回收。这就意味着<code>serverData</code>，大概保存了大量的数据，也不可能被回收。</p>
<p>在观察者的情况下，在他们不再被需要（或相关对象需要设置成不能到达）的时候明确的调用移除是非常重要的。</p>
<p>在过去，这一点尤其重要，因为某些浏览器（旧的IE6）不能很好的管理循环引用（更多信息见下文）。如今，大部分的浏览器都能而且会在对象变得不可到达的时候回收观察处理器，即使监听器没有被明确的移除掉。然而，在对象被处理之前，要显式地删除这些观察者仍然是值得提倡的做法。例如：</p>
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

// 做点事

element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);

// 当元素被销毁
//元素和事件都会即使在老的浏览器里也会被回收
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'launch-button'</span>);
<span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params">event</span>) </span>{
   counter++;
   element.innerHtml = <span class="hljs-string">'text '</span> + counter;
}

element.addEventListener(<span class="hljs-string">'click'</span>, onClick);

<span class="hljs-comment">// 做点事</span>

element.removeEventListener(<span class="hljs-string">'click'</span>, onClick);
element.parentNode.removeChild(element);

<span class="hljs-comment">// 当元素被销毁</span>
<span class="hljs-comment">//元素和事件都会即使在老的浏览器里也会被回收</span>
</code></pre>
<p>如今的浏览器（包括IE和Edge）使用现代的垃圾回收算法，可以立即发现并处理这些循环引用。换句话说，先调用<code>removeEventListener</code>再删节点并非严格必要。</p>
<p>jQuery等框架和插件会在丢弃节点前删除监听器。这都是它们内部处理，以保证不会产生内存泄漏，甚至是在有问题的浏览器（没错，IE6）上也不会。</p>
<h4>3: 闭包</h4>
<p>闭包是JavaScript开发的一个关键方面：一个内部函数使用了外部（封闭）函数的变量。由于JavaScript运行时实现的不同，它可能以下面的方式造成内存泄漏：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var theThing = null;

var replaceThing = function () {

  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // 引用'originalThing'
      console.log(&quot;hi&quot;);
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(&quot;message&quot;);
    }
  };
};

setInterval(replaceThing, 1000);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> theThing = <span class="hljs-literal">null</span>;

<span class="hljs-keyword">var</span> replaceThing = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">var</span> originalThing = theThing;
  <span class="hljs-keyword">var</span> unused = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (originalThing) <span class="hljs-comment">// 引用'originalThing'</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>);
  };

  theThing = {
    <span class="hljs-attr">longStr</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000000</span>).join(<span class="hljs-string">'*'</span>),
    <span class="hljs-attr">someMethod</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"message"</span>);
    }
  };
};

setInterval(replaceThing, <span class="hljs-number">1000</span>);
</code></pre>
<p>这段代码做了一件事：每次<code>ReplaceThing</code>被调用，<code>theThing</code>获得一个包含大数组和新的闭包(<code>someMethod</code>)的对象。同时，变量<code>unused</code>保持了一个引用<code>originalThing</code>(<code>theThing</code>是上次调用<code>replaceThing</code>生成的值)的闭包。已经有点困惑了吧？最重要的事情是<strong>一旦为同一父域中的作用域产生闭包，则该作用域是共享的。</strong></p>
<p>这里，作用域产生了闭包，<code>someMethod</code>和<code>unused</code>共享这个闭包中的内存。<code>unused</code>引用了<code>originalThing</code>。尽管<code>unused</code>不会被使用，<code>someMethod</code>可以通过<code>theThing</code>来使用<code>replaceThing</code>作用域外的变量（例如某些全局的）。而且<code>someMethod</code>和<code>unused</code>有共同的闭包作用域，<code>unused</code>对<code>originalThing</code>的引用强制<code>oriiginalThing</code>保持激活状态(两个闭包共享整个作用域)。这阻止了它的回收。</p>
<p>当这段代码重复执行，可以观察到被使用的内存在持续增加。垃圾回收运行的时候也不会变小。从本质上来说，闭包的连接列表已经创建了(以<code>theThing</code>变量为根)，这些闭包每个作用域都间接引用了大数组，导致大量的内存泄漏。</p>
<p>这个问题被Meteor团队发现，他们有<a href="#">一篇非常好的文章</a>描述了闭包大量的细节。</p>
<h4>4: DOM外引用</h4>
<p>有的时候在数据结构里存储DOM节点是非常有用的，比如你想要快速更新一个表格几行的内容。此时存储每一行的DOM节点的引用在一个字典或者数组里是有意义的。此时一个DOM节点有两个引用：一个在dom树中，另外一个在字典中。如果在未来的某个时候你想要去移除这些排，你需要确保两个引用都不可到达。</p>
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
    //image是body元素的子节点
    document.body.removeChild(document.getElementById('image'));

    //这个时候我们在全局的elements对象里仍然有一个对#button的引用。
    //换句话说，buttom元素仍然在内存中而且不能被回收。
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> elements = {
    <span class="hljs-attr">button</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>),
    <span class="hljs-attr">image</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'image'</span>)
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStuff</span>(<span class="hljs-params"></span>) </span>{
    image.src = <span class="hljs-string">'http://example.com/image_name.png'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeImage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//image是body元素的子节点</span>
    <span class="hljs-built_in">document</span>.body.removeChild(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'image'</span>));

    <span class="hljs-comment">//这个时候我们在全局的elements对象里仍然有一个对#button的引用。</span>
    <span class="hljs-comment">//换句话说，buttom元素仍然在内存中而且不能被回收。</span>
}
</code></pre>
<p>当涉及DOM树内部或子节点时，需要考虑额外的考虑因素。例如，你在JavaScript中保持对某个表的特定单元格的引用。有一天你决定从DOM中移除表格但是保留了对单元格的引用。人们也许会认为除了单元格其他的都会被回收。实际并不是这样的：单元格是表格的一个子节点，子节点保持了对父节点的引用。确切的说，JS代码中对单元格的引用造成了<strong>整个表格被留在内存中了</strong>，所以在移除有被引用的节点时候要当心。</p>
<p>我们在SessionStack努力遵循这些最佳实践，因为：</p>
<p>一旦你整合essionStack到你的生产应用中，它就开始记录所有的事情：DOM变化、用户交互、JS异常、堆栈跟踪、失败的网络请求、调试信息，等等。</p>
<p>通过SessionStack，你可以回放应用中的问题，看到问题对用户的影响。所有这些都不会对你的应用产生性能的影响。因为用户可以重新加载页面或者在应用中跳转，所有的观察者、拦截器、变量分配都必须合理处置。以免造成内存泄漏，也预防增加整个应用的内存占用。</p>
<p>这是一个免费的计划，你现在可以尝试一下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011411133" src="https://static.alili.tech/img/remote/1460000011411133" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>欢迎关注我的公众号，关注前端文章：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004841853" src="https://static.alili.tech/img/remote/1460000004841853" alt="justjavac微信公众号" title="justjavac微信公众号" style="cursor: pointer;"></span></p>
<h4>参考资料</h4>
<ul>
<li><a href="http://www-bcf.usc.edu/~dkempe/CS104/08-29.pdf" rel="nofollow noreferrer" target="_blank">http://www-bcf.usc.edu/~dkempe/CS104/08-29.pdf</a></li>
<li><a href="https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156" rel="nofollow noreferrer" target="_blank">https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156</a></li>
<li><a href="http://www.nodesimplified.com/2017/08/javascript-memory-management-and.html" rel="nofollow noreferrer" target="_blank">http://www.nodesimplified.com/2017/08/javascript-memory-management-and.html</a></li>
<li><a href="https://blog.sessionstack.com/tagged/programming?source=post" rel="nofollow noreferrer" target="_blank">Programming</a></li>
<li><a href="https://blog.sessionstack.com/tagged/javascript?source=post" rel="nofollow noreferrer" target="_blank">JavaScript</a></li>
<li><a href="https://blog.sessionstack.com/tagged/web-development?source=post" rel="nofollow noreferrer" target="_blank">Web Development</a></li>
<li><a href="https://blog.sessionstack.com/tagged/tutorial?source=post" rel="nofollow noreferrer" target="_blank">Tutorial</a></li>
<li><a href="https://blog.sessionstack.com/tagged/memory-leak?source=post" rel="nofollow noreferrer" target="_blank">Memory Leak</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript是如何工作的：内存管理 + 如何处理4个常见的内存泄露

## 原文链接
[https://segmentfault.com/a/1190000011411121](https://segmentfault.com/a/1190000011411121)


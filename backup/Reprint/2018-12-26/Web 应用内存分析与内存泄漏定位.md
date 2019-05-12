---
title: 'Web 应用内存分析与内存泄漏定位' 
date: 2018-12-26 2:30:14
hidden: true
slug: m0c5wjedr0p
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://parg.co/Ucw" rel="nofollow noreferrer" target="_blank">内存分析与内存泄漏定位</a>是笔者<a href="https://parg.co/Ubt" rel="nofollow noreferrer" target="_blank">现代 Web 开发工程化实践之调试技巧</a>的一部分，主要介绍 Web 开发中需要了解的内存分析与内存泄露定位手段，本部分涉及的参考资料统一声明在<a href="https://parg.co/UUl" rel="nofollow noreferrer" target="_blank">Web 开发界面调试资料索引</a>。</p></blockquote>
<p>无论是分布式计算系统、服务端应用程序还是 iOS、Android 原生应用都会存在内存泄漏问题，Web 应用自然也不可避免地存在着类似的问题。虽然因为网页往往都是即用即走，较少地存在某个网页长期运行的问题，即使存在内存泄漏可能表现地也不明显；但是在某些数据展示型的，需要长期运行的页面上，如果不及时解决内存泄漏可能会导致网页占据过大地内存，不仅影响页面性能，还可能导致整个系统的崩溃。<a href="https://parg.co/UHG" rel="nofollow noreferrer" target="_blank">前端每周清单</a>推荐过的 <a href="https://parg.co/bnw" rel="nofollow noreferrer" target="_blank">How JavaScript works</a> 就是非常不错地介绍 JavaScript 运行机制的系列文章，其也对内存管理与内存泄漏有过分析，本文部分图片与示例代码即来自此系列。</p>
<p>类似于 C 这样的语言提供了 <code>malloc()</code> 与 <code>free()</code> 这样的底层内存管理原子操作，开发者需要显式手动地进行内存的申请与释放；而 Java 这样的语言则是提供了自动化的内存回收机制，笔者在<a href="https://parg.co/UcF" rel="nofollow noreferrer" target="_blank">垃圾回收算法与 JVM 垃圾回收器综述</a>一文中有过介绍。JavaScript 也是采用的自动化内存回收机制，无论是 Object、String 等都是由垃圾回收进程自动回收处理。自动化内存回收并不意味着我们就可以忽略内存管理的相关操作，反而可能会导致更不易发现的内存泄漏出现。</p>
<h1 id="articleHeader0">内存分配与回收</h1>
<p>笔者在 <a href="https://parg.co/Ucj" rel="nofollow noreferrer" target="_blank">JavaScript Event Loop 机制详解与 Vue.js 中实践应用</a>一文中介绍过 JavaScript 的内存模型，其主要也是由堆、栈、队列三方面组成：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842985?w=299&amp;h=275" src="https://static.alili.tech/img/remote/1460000011842985?w=299&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<p>其中队列指的是消息队列、栈就是函数执行栈，其基本结构如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842986?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000011842986?w=800&amp;h=600" alt="JavaScript 栈模型" title="JavaScript 栈模型" style="cursor: pointer; display: inline;"></span></p>
<p>而主要的用户创建的对象就存放在堆中，这也是我们内存分析与内存泄漏定位所需要关注的主要的区域。所谓内存，从硬件的角度来看，就是无数触发器的组合；每个触发器能够存放 1 bit 位的数据，不同的触发器由唯一的标识符定位，开发者可以根据该标识符读写该触发器。抽象来看，我们可以将内存当做比特数组，而数据就是在内存中顺序排布：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842987?w=800&amp;h=275" src="https://static.alili.tech/img/remote/1460000011842987?w=800&amp;h=275" alt="1*W7L7JN5q4p7w2E7HbBYS3g" title="1*W7L7JN5q4p7w2E7HbBYS3g" style="cursor: pointer; display: inline;"></span></p>
<p>JavaScript 中开发者并不需要手动地为对象申请内存，只需要声明变量，JavaScript Runtime 即可以自动地分配内存：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = 374; // allocates memory for a number
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> n = <span class="hljs-number">374</span>; <span class="hljs-comment">// allocates memory for a number</span>
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
<p>某个对象的内存生命周期分为了内存分配、内存使用与内存回收这三个步骤，当某个对象不再被需要时，它就应该被清除回收；所谓的垃圾回收器，Garbage Collector 即是负责追踪内存分配情况、判断某个被分配的内存是否有用，并且自动回收无用的内存。大部分的垃圾回收器是根据引用（Reference）来判断某个对象是否存活，所谓的引用即是某个对象是否依赖于其他对象，如果存在依赖关系即存在引用；譬如某个 JavaScript 对象引用了它的原型对象。最简单的垃圾回收算法即是引用计数（Reference Counting），即清除所有零引用的对象：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> o1 = {
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
<p>不过这种算法往往受制于循环引用问题，即两个无用的对象相互引用：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> o1 = {};
  <span class="hljs-keyword">var</span> o2 = {};
  o1.p = o2; <span class="hljs-comment">// o1 references o2</span>
  o2.p = o1; <span class="hljs-comment">// o2 references o1. This creates a cycle.</span>
}

f();</code></pre>
<p>稍为复杂的算法即是所谓的标记-清除（Mark-Sweep）算法，其根据某个对象是否可达来判断某个对象是否可用。标记-清除算法会从某个根元素开始，譬如 window 对象开始，沿着引用树向下遍历，标记所有可达的对象为可用，并且清除其他未被标记的对象。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842988?w=800&amp;h=423" src="https://static.alili.tech/img/remote/1460000011842988?w=800&amp;h=423" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>2012 年之后，几乎所有的主流浏览器都实践了基于标记-清除算法的垃圾回收器，并且各自也进行有针对性地优化。</p>
<h1 id="articleHeader1">内存泄漏</h1>
<p>所谓的内存泄漏，即是指某个对象被无意间添加了某条引用，导致虽然实际上并不需要了，但还是能一直被遍历可达，以致其内存始终无法回收。本部分我们简要讨论下 JavaScript 中常见的内存泄漏情境与处理方法。在新版本的 Chrome 中我们可以使用 Performance Monitor 来动态监测网页性能的变化：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842989?w=800&amp;h=460" src="https://static.alili.tech/img/remote/1460000011842989?w=800&amp;h=460" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图中各项指标的含义为：</p>
<ul>
<li>
<strong>CPU usage -</strong> 当前站点的 CPU 使用量；</li>
<li>
<strong>JS heap size -</strong> 应用的内存占用量；</li>
<li>
<strong>DOM Nodes -</strong> 内存中 DOM 节点数目；</li>
<li>
<strong>JS event listeners-</strong> 当前页面上注册的 JavaScript 时间监听器数目;</li>
<li>
<strong>Documents -</strong> 当前页面中使用的样式或者脚本文件数目；</li>
<li>
<strong>Frames -</strong> 当前页面上的 Frames 数目，包括 iframe 与 workers；</li>
<li>
<strong>Layouts / sec -</strong> 每秒的 DOM 重布局数目；</li>
<li>
<strong>Style recalcs / sec -</strong> 浏览器需要重新计算样式的频次；</li>
</ul>
<p>当发现某个时间点可能存在内存泄漏时，我们可以使用 Memory 标签页将此时的堆分配情况打印下来：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842990?w=1070&amp;h=648" src="https://static.alili.tech/img/remote/1460000011842990?w=1070&amp;h=648" alt="Memory Snapshot Take heap snapshot" title="Memory Snapshot Take heap snapshot" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011842991?w=1924&amp;h=1210" src="https://static.alili.tech/img/remote/1460000011842991?w=1924&amp;h=1210" alt="Memory Snapshot 结果" title="Memory Snapshot 结果" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">全局变量</h2>
<p>JavaScript 会将所有的为声明的变量当做全局变量进行处理，即将其挂载到 global 对象上；浏览器中这里的 global 对象就是 window:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    bar = &quot;some text&quot;;
}

// 等价于

function foo(arg) {
    window.bar = &quot;some text&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    bar = <span class="hljs-string">"some text"</span>;
}

<span class="hljs-comment">// 等价于</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-built_in">window</span>.bar = <span class="hljs-string">"some text"</span>;
}</code></pre>
<p>另一种常见的创建全局变量的方式就是误用 <code>this</code> 指针：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.var1 = <span class="hljs-string">"potential accidental global"</span>;
}
<span class="hljs-comment">// Foo called on its own, this points to the global object (window)</span>
<span class="hljs-comment">// rather than being undefined.</span>
foo();</code></pre>
<p>一旦某个变量被挂载到了 window 对象，就意味着它永远是可达的。为了避免这种情况，我们应该尽可能地添加 <code>use strict</code> 或者进行模块化编码（参考 <a href="https://parg.co/Uc2" rel="nofollow noreferrer" target="_blank">JavaScript 模块演化简史</a>）。我们也可以扩展类似于下文的扫描函数，来检测出 window 对象的非原生属性，并加以判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function scan(o) {
  Object.keys(o).forEach(function(key) {
    var val = o[key];

    // Stop if object was created in another window
    if (
      typeof val !== &quot;string&quot; &amp;&amp;
      typeof val !== &quot;number&quot; &amp;&amp;
      typeof val !== &quot;boolean&quot; &amp;&amp;
      !(val instanceof Object)
    ) {
      debugger;
      console.log(key);
    }

    // Traverse the nested object hierarchy
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scan</span>(<span class="hljs-params">o</span>) </span>{
  <span class="hljs-built_in">Object</span>.keys(o).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">var</span> val = o[key];

    <span class="hljs-comment">// Stop if object was created in another window</span>
    <span class="hljs-keyword">if</span> (
      <span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">"string"</span> &amp;&amp;
      <span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">"number"</span> &amp;&amp;
      <span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">"boolean"</span> &amp;&amp;
      !(val <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>)
    ) {
      <span class="hljs-keyword">debugger</span>;
      <span class="hljs-built_in">console</span>.log(key);
    }

    <span class="hljs-comment">// Traverse the nested object hierarchy</span>
  });
}</code></pre>
<h2 id="articleHeader3">定时器与闭包</h2>
<p>我们经常会使用 <code>setInterval</code> 来执行定时任务，很多的框架也提供了基于回调的异步执行机制；这可能会导致回调中声明了对于某个变量的依赖，譬如：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> serverData = loadData();
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> renderer = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'renderer'</span>);
    <span class="hljs-keyword">if</span>(renderer) {
        renderer.innerHTML = <span class="hljs-built_in">JSON</span>.stringify(serverData);
    }
}, <span class="hljs-number">5000</span>); <span class="hljs-comment">//This will be executed every ~5 seconds.</span></code></pre>
<p>定时器保有对于 serverData 变量的引用，如果我们不手动清除定时器话，那么该变量也就会一直可达，不被回收。而这里的 serverData 也是闭包形式被引入到 setInterval 的回调作用域中；闭包也是常见的可能导致内存泄漏的元凶之一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var theThing = null;
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> theThing = <span class="hljs-literal">null</span>;
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
<p>上述代码中 replaceThing 会定期执行，并且创建大的数组与 someMethod 闭包赋值给 theThing。someMethod 作用域是与 unused 共享的，unused 又有一个指向 originalThing 的引用。尽管 unused 并未被实际使用，theThing 的 someMethod 方法却有可能会被外部使用，也就导致了 unused 始终处于可达状态。unused 又会反向依赖于 theThing，最终导致大数组始终无法被清除。</p>
<h2 id="articleHeader4">DOM 引用与监听器</h2>
<p>有时候我们可能会将 DOM 元素存放到数据结构中，譬如当我们需要频繁更新某个数据列表时，可能会将用到的数据列表存放在 JavaScript 数组中；这也就导致了每个 DOM 元素存在了两个引用，分别在 DOM 树与 JavaScript 数组中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> elements = {
    <span class="hljs-attr">button</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>),
    <span class="hljs-attr">image</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'image'</span>)
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStuff</span>(<span class="hljs-params"></span>) </span>{
    elements.image.src = <span class="hljs-string">'http://example.com/image_name.png'</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeImage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// The image is a direct child of the body element.</span>
    <span class="hljs-built_in">document</span>.body.removeChild(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'image'</span>));
    <span class="hljs-comment">// At this point, we still have a reference to #button in the</span>
    <span class="hljs-comment">//global elements object. In other words, the button element is</span>
    <span class="hljs-comment">//still in memory and cannot be collected by the GC.</span>
}</code></pre>
<p>此时我们就需要将 DOM 树与 JavaScript 数组中的引用皆删除，才能真实地清除该对象。类似的，在老版本的浏览器中，如果我们清除某个 DOM 元素，我们需要首先移除其监听器，否则浏览器并不会自动地帮我们清除该监听器，或者回收该监听器引用的对象：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'launch-button'</span>);
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
<p>现代浏览器使用的现代垃圾回收器则会帮我们自动地检测这种循环依赖，并且予以清除；jQuery 等第三方库也会在清除元素之前首先移除其监听事件。</p>
<h2 id="articleHeader5">iframe</h2>
<p>iframe 是常见的界面共享方式，不过如果我们在父界面或者子界面中添加了对于父界面某对象的引用，譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 子页面内
window.top.innerObject = someInsideObject
window.top.document.addEventLister(‘click’, function() { … });

// 外部页面
 innerObject = iframeEl.contentWindow.someInsideObject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 子页面内</span>
<span class="hljs-built_in">window</span>.top.innerObject = someInsideObject
<span class="hljs-built_in">window</span>.top.document.addEventLister(‘click’, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ … });

<span class="hljs-comment">// 外部页面</span>
 innerObject = iframeEl.contentWindow.someInsideObject</code></pre>
<p>就有可能导致 iframe 卸载（移除元素）之后仍然有部分对象保留下来，我们可以在移除 iframe 之前执行强制的页面重载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#&quot;>Remove</a>
<iframe src=&quot;url&quot; />​

$('a').click(function(){
    $('iframe')[0].contentWindow.location.reload();
    // 线上环境实测重置 src 效果会更好
    // $('iframe')[0].src = &quot;javascript:false&quot;;
    setTimeout(function(){
       $('iframe').remove();
    }, 1000);
});​" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;a href=<span class="hljs-string">"#"</span>&gt;Remove&lt;<span class="hljs-regexp">/a&gt;
&lt;iframe src="url" /</span>&gt;​

$(<span class="hljs-string">'a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">'iframe'</span>)[<span class="hljs-number">0</span>].contentWindow.location.reload();
    <span class="hljs-comment">// 线上环境实测重置 src 效果会更好</span>
    <span class="hljs-comment">// $('iframe')[0].src = "javascript:false";</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       $(<span class="hljs-string">'iframe'</span>).remove();
    }, <span class="hljs-number">1000</span>);
});​</code></pre>
<p>或者手动地执行页面清除操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onbeforeunload = function(){
    $(document).unbind().die();    //remove listeners on document
    $(document).find('*').unbind().die(); //remove listeners on all nodes
    //clean up cookies
    /remove items from localStorage
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.onbeforeunload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-built_in">document</span>).unbind().die();    <span class="hljs-comment">//remove listeners on document</span>
    $(<span class="hljs-built_in">document</span>).find(<span class="hljs-string">'*'</span>).unbind().die(); <span class="hljs-comment">//remove listeners on all nodes</span>
    <span class="hljs-comment">//clean up cookies</span>
    /remove items <span class="hljs-keyword">from</span> localStorage
}</code></pre>
<h2 id="articleHeader6">Web Worker</h2>
<p>现代浏览器中我们经常使用 Web Worker 来运行后台任务，不过有时候如果我们过于频繁且不加容错地在主线程与工作线程之间传递数据，可能会导致内存泄漏：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function send() {
 setInterval(function() { 
    const data = {
     array1: get100Arrays(),
     array2: get500Arrays()
    };

    let json = JSON.stringify( data );
    let arbfr = str2ab (json);
    worker.postMessage(arbfr, [arbfr]);
  }, 10);
}


function str2ab(str) {
   var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
   var bufView = new Uint16Array(buf);
   for (var i=0, strLen=str.length; i<strLen; i++) {
     bufView[i] = str.charCodeAt(i);
   }
   return buf;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">send</span>(<span class="hljs-params"></span>) </span>{
 setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">const</span> data = {
     <span class="hljs-attr">array1</span>: get100Arrays(),
     <span class="hljs-attr">array2</span>: get500Arrays()
    };

    <span class="hljs-keyword">let</span> json = <span class="hljs-built_in">JSON</span>.stringify( data );
    <span class="hljs-keyword">let</span> arbfr = str2ab (json);
    worker.postMessage(arbfr, [arbfr]);
  }, <span class="hljs-number">10</span>);
}


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">str2ab</span>(<span class="hljs-params">str</span>) </span>{
   <span class="hljs-keyword">var</span> buf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(str.length*<span class="hljs-number">2</span>); <span class="hljs-comment">// 2 bytes for each char</span>
   <span class="hljs-keyword">var</span> bufView = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint16Array</span>(buf);
   <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>, strLen=str.length; i&lt;strLen; i++) {
     bufView[i] = str.charCodeAt(i);
   }
   <span class="hljs-keyword">return</span> buf;
 }</code></pre>
<p>在实际的代码中我们应该检测 Transferable Objects 是否正常工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ab = new ArrayBuffer(1);

try {
   worker.postMessage(ab, [ab]);

   if (ab.byteLength) {
      console.log('TRANSFERABLE OBJECTS are not supported in your browser!');
   } 
   else {
     console.log('USING TRANSFERABLE OBJECTS');
   }
} 
catch(e) {
  console.log('TRANSFERABLE OBJECTS are not supported in your browser!');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> ab = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">1</span>);

<span class="hljs-keyword">try</span> {
   worker.postMessage(ab, [ab]);

   <span class="hljs-keyword">if</span> (ab.byteLength) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'TRANSFERABLE OBJECTS are not supported in your browser!'</span>);
   } 
   <span class="hljs-keyword">else</span> {
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'USING TRANSFERABLE OBJECTS'</span>);
   }
} 
<span class="hljs-keyword">catch</span>(e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'TRANSFERABLE OBJECTS are not supported in your browser!'</span>);
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web 应用内存分析与内存泄漏定位

## 原文链接
[https://segmentfault.com/a/1190000011842980](https://segmentfault.com/a/1190000011842980)


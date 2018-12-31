---
title: 'V8 中的垃圾收集（GC），图文指南' 
date: 2019-01-01 2:30:07
hidden: true
slug: xkwl6mdq15
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文标题：Garbage collection in V8, an illustrated guide<br>原文链接：<a href="https://medium.com/@_lrlna/garbage-collection-in-v8-an-illustrated-guide-d24a952ee3b8" rel="nofollow noreferrer" target="_blank">https://medium.com/@_lrlna/ga...</a>  <br>译者：<a href="https://github.com/justjavac" rel="nofollow noreferrer" target="_blank">@justjavac</a></p></blockquote>
<p>本指南与我迄今为止所写的其他指南都不同，我在里面添加了一些草图。我用草图描绘了垃圾收集（GC）的整个概念以及它是如何在 javascript 中被处理的，更确切地说是在运行 javascript 的引擎中。顺便提一下，这个指南是面向初学者的，不包括 V8 内存管理的各个方面以及 V8 的内部原理。我添加了一些<a href="https://github.com/lrlna/sketchin/blob/master/guides/garbage-collection-in-v8.md#-sourcesjs" rel="nofollow noreferrer" target="_blank">资源</a>，可以帮助你更深入地了解。本指南重点介绍✨javascript✨，对于某些语言而言，垃圾收集是完全不一样的，比如 C 语言.</p>
<p>好的，我们开始吧。</p>
<h2 id="articleHeader0">什么是v8？</h2>
<p>V8，是一个 JavaScript 的运行时引擎，不要与你最喜爱的番茄汁?混淆了，它负责编译并执行你精美的javascript。V8 带有分代垃圾收集器，我将在后文解释。它与 Chrome 一起，而 SpiderMonkey 是 Mozilla 的引擎 Chakra 是微软的。基本上当运行 javascript 时，您需要一个引擎来处理它，而且 V8 是您的选择之一，无论是在浏览器还是在 node.js 环境中。（P.S. V8 是✨ <a href="https://github.com/v8/v8" rel="nofollow noreferrer" target="_blank">开源</a>的 ✨。）</p>
<h2 id="articleHeader1">什么是垃圾收集？</h2>
<p>垃圾收集的重点是通过使用特定的程序来管理内存的使用。诸如 C 之类的语言通常可以直接操作程序中的内存，并在程序的上下文中分配和释放对象。另一方面，ECMAScript 缺少访问内存管理的特定接口（是的，这意味着没有API）。这基本上意味着程序中的所有内存管理权限都被转移到了 V8。</p>
<p>由于我们无法访问无限量的内存，因此垃圾收集器的工作是通过内存中分配的对象来确定它们是否死亡或是活动。那些活着的对象会留在内存中，那些死亡的对象被删除，内存被分配回堆。</p>
<p>什么是堆？堆是非结构化区域，堆中的对象占用分配的内存。这种分配是动态的，因为对象的大小/寿命/数量是未知的，所以需要在运行时分配和释放。</p>
<p>如果我们看一下并发模型，堆直接与调用栈一起工作，因为堆栈中的对象需要进行内存分配。它看起来像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVUR8h?w=1000&amp;h=750" src="https://static.alili.tech/img/bVUR8h?w=1000&amp;h=750" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">Dead or alive?</h2>
<p>如何检查对象的生死，是通过客户机或者程序代码是否可以到达此对象。您可以想到的最容易达到的对象可能是根范围中定义的对象。</p>
<p>一些 C++ 绑定（或客户端上的 Web API）也是根的一部分，因此您可以通过例如 <code>setInterval</code> 直接访问。</p>
<p>可达性(Reachability)还可以这么理解：另一个对象或根是否可以获得它，如果可以的话，该对象所需的内存被保留。</p>
<h2 id="articleHeader3">那么我们怎么可以做到垃圾收集呢？（告诉我！告诉我！）</h2>
<p>创建新对象或新的“指针”时，V8 会在堆中分配内存。（javascript 没有真正的指针，所以'指针'在技术上只是复制对原始对象的引用）。堆中的不同类型的对象会占用不同的空间，它将被组织成如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVUR8G?w=1000&amp;h=749" src="https://static.alili.tech/img/bVUR8G?w=1000&amp;h=749" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>为了垃圾回收的目的，V8 将堆分为两部分：新生区和老生区。当您执行需要 V8 分配内存的操作时，V8 将在新生区中分配空间。当你继续添加到堆，你最终会耗尽内存，所以 V8 将不得不运行一个 GC 来清理。新创建的对象被分配得很快，并且当对象死亡时被清理（更短和更快的收集）。一旦对象“生存”了一些（确切的说是2个周期）回收扫描周期时，它们被提升到老生区，在一个单独的循环中收集垃圾。</p>
<p><span class="img-wrap"><img data-src="/img/bVUR8N?w=600&amp;h=450" src="https://static.alili.tech/img/bVUR8N?w=600&amp;h=450" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>较旧的对象是幸存多于一个垃圾收集扫描的对象，这意味着它们仍然被其他对象引用，并且仍然需要占用该内存。他们通常不引用较年轻的对象，只是引用较旧的对象。大周期进行的并不频繁。一次大周期通常是在移动足够多的对象至老生区后才会发生。</p>
<h2 id="articleHeader4">? sources.js</h2>
<ul>
<li><p><a href="http://www.memorymanagement.org/" rel="nofollow noreferrer" target="_blank">内存管理</a>; 我喜欢阅读 <a href="http://www.memorymanagement.org/glossary/" rel="nofollow noreferrer" target="_blank">glossary</a> 章节，你会发现很多 GC 的概念.</p></li>
<li><p>this is a really good and <a href="https://github.com/thlorenz/v8-perf" rel="nofollow noreferrer" target="_blank">v detailed repo</a> on v8’s perf.</p></li>
<li><p>您可以查看 <a href="https://github.com/v8/v8/wiki" rel="nofollow noreferrer" target="_blank">v8 repo 的 wiki</a>，了解更多内部信息，以及如何使用 v8 调试项目</p></li>
<li><p>on frame rates from <a href="https://developer.mozilla.org/en-US/docs/Tools/Performance/Frame_rate" rel="nofollow noreferrer" target="_blank">firefox dev tools</a></p></li>
<li><p>另一个很好的指南 <a href="http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection" rel="nofollow noreferrer" target="_blank">V8 &amp;&amp; garbage collection</a></p></li>
</ul>
<p>This guide is crossposted from <a href="https://github.com/lrlna/sketchin/blob/master/guides/garbage-collection-in-v8.md" rel="nofollow noreferrer" target="_blank">lrlna’s sketchin guide on github</a> ✨ ?.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
V8 中的垃圾收集（GC），图文指南

## 原文链接
[https://segmentfault.com/a/1190000011133857](https://segmentfault.com/a/1190000011133857)


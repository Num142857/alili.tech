---
title: 'JavaScript 开发者所需要知道的 V8（一）：V8 In NodeJS' 
date: 2019-01-31 2:31:16
hidden: true
slug: 41pgo3a2iyp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>欢迎来我的博客阅读：<a href="http://huang-jerryc.com/2016/11/08/the-v8-what-javascripter-should-konw-of-v8-in-nodejs/" rel="nofollow noreferrer" target="_blank">「JavaScript 开发者所需要知道的 V8（一）：V8 In NodeJS」</a></p></blockquote>
<h1 id="articleHeader0">Motivation</h1>
<p>JavaScript 是一款拥有「自动垃圾回收」功能的编程语言。<br>市面上具有这样功能的语言，一般都是拥有相对应的虚拟机的，像 Java的JVM ，C#的CLR ，PHP的Zend。<br>虚拟机一般实现了代码解析，内存的管理、布局、垃圾回收等功能。<br>不像C/C++这种没有虚拟机的语言，它们需要手动管理内存。<br>C/C++语言编译后的文件，是可以直接运行的。</p>
<p>我认为学习一门开发语言，除了知道一些语法上的使用，各种API的调用以外。学习相应的虚拟机也是很有必要的。而 JavaScript 由于其特殊的历史原因，并不是只有 V8 一个引擎。但是目前 V8 它是业界最优秀的 JavaScript 引擎，也就成为了一个学习样本。</p>
<p>如今的 JavaScript 不仅仅是用在浏览器端了，也因为 NodeJS 的关系得以在服务器端运行。和浏览器端不同的地方在于服务器端对资源的敏感性是很高的。当业务规模大了，并发量上来了，一些很细小的问题会放大。这时候一些小小的内存泄漏，都会酿造灾难。</p>
<p>所以作为一个 JavaScript 开发者，搞清楚从敲入 <code>console.log('hello   world')</code>，直到后面交由CPU执行的中间过程是很重要的。<br>这也对如何用 JavaScript 这门松散的语言编写出高质量的代码是具有指导作用的。</p>
<p>想真正做到 JavaScript 全栈，路漫漫其修远兮。</p>
<h1 id="articleHeader1">V8 概述</h1>
<p>V8 作为一个 JavaScript 引擎，最初是服役于 Google Chrome 浏览器的。它随着 Chrome 的第一版发布而发布以及开源。现在它除了 Chrome 浏览器，已经有很多其他的使用者了。诸如 NodeJS、MongoDB、CouchDB 等。</p>
<p>JavaScript 作为 Prototype-Based Language , 基于它使用 Prototype 继承的特征，V8 使用了直译的方式，即把 JavaScript 代码直接编译成机器码( Machine Code, 有些地方也叫 Native Code )，然后直接交由硬件执行。<br>与传统的「编译-解析-执行」的流程不同，V8 处理 JavaScript，并没有二进制码或其他的中间码。</p>
<p><strong> 简单来说，V8主要工作就是：「把 JavaScript 直译成机器码，然后运行」</strong><br>但这中间，往往是一个复杂的过程，它需要处理很多的难题，诸如：</p>
<ol>
<li><p>编译优化</p></li>
<li><p>内存管理</p></li>
<li><p>垃圾回收</p></li>
</ol>
<p>我写的这一系列文章，也是从这三个大点来出发，解读V8针对这些内容的处理。</p>
<h1 id="articleHeader2">V8 In NodeJS</h1>
<h2 id="articleHeader3">NodeJS源码小览</h2>
<p>NodeJS，是怎么引入V8的？<br>我们关注<a href="https://github.com/nodejs/node" rel="nofollow noreferrer" target="_blank">Node的源码</a>目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── ...
├── deps
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── v8
│&nbsp;&nbsp; ├── ...
├── ...
├── lib
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── buffer.js
│&nbsp;&nbsp; ├── child_process.js
│&nbsp;&nbsp; ├── console.js
│&nbsp;&nbsp; ├── ...
├── node -> out/Release/node
├── ...
├── out
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── Release
|         ├── node
|         ├── node.d
|         ├── obj
|          &nbsp;&nbsp; └── gen
|          &nbsp;&nbsp;     ├── ...
|          &nbsp;&nbsp;     ├── node_natives.h
|          &nbsp;&nbsp;     ├── ...
│&nbsp;&nbsp; ├── ...
├── src
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── debug-agent.cc
│&nbsp;&nbsp; ├── debug-agent.h
│&nbsp;&nbsp; ├── env-inl.h
│&nbsp;&nbsp; ├── env.cc
│&nbsp;&nbsp; ├── ...
├── 
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>.
├── ...
├── deps
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── v8
│&nbsp;&nbsp; ├── ...
├── ...
├── lib
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── buffer.js
│&nbsp;&nbsp; ├── child_process.js
│&nbsp;&nbsp; ├── console.js
│&nbsp;&nbsp; ├── ...
├── node -&gt; out/Release/node
├── ...
├── out
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── Release
|         ├── node
|         ├── node.d
|         ├── obj
|          &nbsp;&nbsp; └── gen
|          &nbsp;&nbsp;     ├── ...
|          &nbsp;&nbsp;     ├── node_natives.h
|          &nbsp;&nbsp;     ├── ...
│&nbsp;&nbsp; ├── ...
├── src
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; ├── debug-agent.cc
│&nbsp;&nbsp; ├── debug-agent.h
│&nbsp;&nbsp; ├── env-inl.h
│&nbsp;&nbsp; ├── env.cc
│&nbsp;&nbsp; ├── ...
├── 
...</code></pre>
<p>需要关注的几个目录和文件：</p>
<p><strong><code>/deps/v8</code></strong>：这里是V8源码所在文件夹，你会发现里面的目录结构跟<a href="https://github.com/v8/v8" rel="nofollow noreferrer" target="_blank">V8源码</a>十分相似。NodeJS除了移植V8源码，还在增添了一些内容。</p>
<p><strong><code>/src</code></strong>：由C/C++编写的核心模块所在文件夹，由C/C++编写的这部分模块被称为「Builtin Module」</p>
<p><strong><code>/lib</code></strong>：由JavaScript编写的核心模块所在文件夹，这部分被称为「Native Code」，在编译Node源码的时候，会采用V8附带的<code>js2c.py</code>工具，把所有内置的JavaScript代码转换成C++里面的数组，生成<code>out/Release/obj/gen/node_natives.h</code>文件。有些 Native Module 需要借助于 Builtin Module 实现背后的功能。</p>
<p><strong><code>/out</code></strong>：该目录是Node源码编译(命令行运行<code>make</code>)后生成的目录，里面包含了Node的可执行文件。当在命令行中键入<code>node xxx.js</code>，实际就是运行了<code>out/Release/node</code>文件。</p>
<p>来张图说明一下V8在Node运行时的整体过程。</p>
<p><span class="img-wrap"><img data-src="/img/bVFzaR?w=511&amp;h=645" src="https://static.alili.tech/img/bVFzaR?w=511&amp;h=645" alt="v8 in nodejs.png" title="v8 in nodejs.png" style="cursor: pointer;"></span></p>
<p>Node在启动的时候，就已经把 Native Module，Builtin Module 加载到内存里面了。后来的 JavaScript 代码，就需要通过 V8 进行动态编译解析运行。</p>
<h2 id="articleHeader4">查看V8版本号</h2>
<p>NodeJS的进步与V8息息相关，关注每个NodeJS版本所对应的V8版本，可以加强该版本新功能的理解和由来。</p>
<p>在NodeJS中，通过<code>process.versions</code>可以查看NodeJS依赖模块的版本号，V8就包含其中。</p>
<p>例如，我运行的 <code>v7.0.0</code>的NodeJS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node
> process.versions
{ http_parser: '2.7.0',
  node: '8.0.0-pre',
  v8: '5.4.500.36',
  uv: '1.10.0',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  modules: '51',
  openssl: '1.0.2j',
  icu: '58.1',
  unicode: '9.0',
  cldr: '30.0.2',
  tz: '2016g' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>$ node
&gt; process.versions
{ http_parser: <span class="hljs-string">'2.7.0'</span>,
  node: <span class="hljs-string">'8.0.0-pre'</span>,
  v8: <span class="hljs-string">'5.4.500.36'</span>,
  <span class="hljs-keyword">u</span><span class="hljs-variable">v:</span> <span class="hljs-string">'1.10.0'</span>,
  zli<span class="hljs-variable">b:</span> <span class="hljs-string">'1.2.8'</span>,
  are<span class="hljs-variable">s:</span> <span class="hljs-string">'1.10.1-DEV'</span>,
  module<span class="hljs-variable">s:</span> <span class="hljs-string">'51'</span>,
  openss<span class="hljs-variable">l:</span> <span class="hljs-string">'1.0.2j'</span>,
  icu: <span class="hljs-string">'58.1'</span>,
  unicode: <span class="hljs-string">'9.0'</span>,
  cldr: <span class="hljs-string">'30.0.2'</span>,
  tz: <span class="hljs-string">'2016g'</span> }</code></pre>
<h1 id="articleHeader5">NodeJS与V8的缠绵</h1>
<ul>
<li><p>2008年9月，V8 的第一个版本随着 Chrome 的第一版本发布。</p></li>
<li><p>2009年5月，NodeJS 的第一个版本由 Ryan Dahl 在 GitHub 上发布。</p></li>
<li><p>2010年12月，<a href="https://blog.chromium.org/2010/12/new-crankshaft-for-v8.html" rel="nofollow noreferrer" target="_blank">官方公布</a> V8 的名为 Crankshaft 的优化编译器，与原来的 Full Compiler 一起工作，声称较2008年版本提高50%性能。</p></li>
<li><p>2014年12月， io.js 从久久不更新的 NodeJS 分出来支，并且引入最新的 V8 ，这时候 NodeJS 处于<code>0.12.17</code>版本。</p></li>
<li><p>2015年2月，NodeJS基金宣布NodeJS(<code>v0.12</code>)和io.js(<code>v3.3</code>)合并，合并版本在未来发布。</p></li>
<li><p>2015年7月7日，<a href="https://blog.chromium.org/2015/07/revving-up-javascript-performance-with.html" rel="nofollow noreferrer" target="_blank">官方公布</a>又一个新的名为TurBoFan的优化编译器，主要提供ES6的新语法，以及提高性能。并表明该编译器最终目标是全部替代Crankshaft编译器</p></li>
<li><p>2015年7月17日，<a href="http://v8project.blogspot.com/2015/07/v8-45-release.html" rel="nofollow noreferrer" target="_blank">官方发布</a>集成TurboFan的V8版本(<code>v4.5</code>)</p></li>
<li><p>2015年9月08日，NodeJS紧跟着<a href="https://nodejs.org/en/blog/release/v4.0.0/" rel="nofollow noreferrer" target="_blank">发布</a>了与io.js的合并版本(<code>V4.0</code>)，引入最新的V8，给开发者们带来了最新的ES6语法，以及性能上的提高。</p></li>
<li><p>2015年8月28日，V8<a href="http://v8project.blogspot.com/2015/08/v8-release-46.html" rel="nofollow noreferrer" target="_blank">发布</a><code>v4.6</code>版本</p></li>
<li><p>2015年10月29日，NodeJS<a href="https://nodejs.org/en/blog/release/v5.0.0/" rel="nofollow noreferrer" target="_blank">发布</a><code>V5.0.0</code>版本</p></li>
<li><p>2016年3月15日，V8<a href="http://v8project.blogspot.com/2016/03/v8-release-50.html" rel="nofollow noreferrer" target="_blank">发布</a><code>v5.0</code>版本</p></li>
<li><p>2016年4月26日，NodeJS<a href="https://nodejs.org/en/blog/release/v6.0.0/" rel="nofollow noreferrer" target="_blank">发布</a><code>V6.0.0</code>版本</p></li>
<li><p>2016年7月18日，V8<a href="http://v8project.blogspot.com/2016/07/v8-release-53.html" rel="nofollow noreferrer" target="_blank">发布</a><code>v5.3</code>版本，新增名为Ignition的解析器(Interpreter)，跟原有的优化编译器(Crankshaft and TurboFan)进行串联工作，提供了更加优化的内存使用方案，主要针对于低内存的Android设备，并称在未来会普及到全平台。</p></li>
<li><p>2016年10月25日，NodeJS<a href="https://nodejs.org/en/blog/release/v7.0.0/" rel="nofollow noreferrer" target="_blank">发布</a><code>v7.0.0</code>版本</p></li>
<li><p>截止到今天(2016年11月)，NodeJS版本<code>v7.0.0</code>，搭配了<code>v5.4</code>的v8，而官方发布的最新v8版本是<code>v5.5</code>。</p></li>
</ul>
<p>回顾整个历程，由于NodeJS是搭建在V8之上的，所以NodeJS很多「新增语言特性」和「提高性能」等更新都需要依赖V8的发布日程。</p>
<p>就像NodeJS和io.js宣布合并，和真正发布<code>V4.0</code>版本的中间，还隔了V8的生命历程一个重大的更新(发布 TurboFan 编译器，该编译器引入了大量的ES6语法支持。)。这个更新直接提供了相当一部分的ES6语法，以及性能上的提高。</p>
<h1 id="articleHeader6">总结</h1>
<p>本篇主要描述了下面几点：</p>
<ol>
<li><p>我的写作动机，理解NodeJS底层，给写出高质量JavaScript代码提供指导。</p></li>
<li><p>简单描述V8的角色，以及主要职责：编译优化、内存管理、垃圾回收。</p></li>
<li><p>通过NodeJS源码目录，以及NodeJS代码加载过程，来认识V8在这之中的位置。</p></li>
<li><p>罗列NodeJS与V8的历代迭代版本以及联系，强调V8在NodeJS中的地位。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 开发者所需要知道的 V8（一）：V8 In NodeJS

## 原文链接
[https://segmentfault.com/a/1190000007484357](https://segmentfault.com/a/1190000007484357)


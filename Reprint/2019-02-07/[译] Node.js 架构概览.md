---
title: '[译] Node.js 架构概览' 
date: 2019-02-07 2:30:16
hidden: true
slug: bw52r5xz8kr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>译者按：<br>在 Medium 上看到这篇文章，行文脉络清晰，阐述简明利落，果断点下翻译按钮。<br>第一小节背景铺陈略啰嗦，可以略过。刚开始我给这部分留了个 blah blah blah 直接翻后面的，翻完之后回头看，考虑完整性才把第一节给补上。接下来的内容干货满满，相信对 Node.js 运行机制有兴趣的读者一定会有所收获。</p></blockquote>
<p>原文：<a href="https://medium.com/yet-another-node-js-blog/architecture-of-node-js-internal-codebase-57cd8376b71f" rel="nofollow noreferrer" target="_blank">Architecture of Node.js’ Internal Codebase</a><br>作者：<a href="https://medium.com/@arenli" rel="nofollow noreferrer" target="_blank">Aren Li</a></p>
<hr>
<p>首先，说点儿 JavaScript……</p>
<p>StackOverflow 的联合创始人 Jeff Atwood 在他著名的编程博客 <a href="https://blog.codinghorror.com/" rel="nofollow noreferrer" target="_blank">Coding Horror</a> 上说：</p>
<blockquote><p>any application that can be written in JavaScript, will eventually be written in JavaScript.<br>任何可以用 JavaScript 写就的应用程序，最终都会以 JavaScript 写出来。</p></blockquote>
<p>JavaScrit 的边界和影响力在过去几年里迅猛发展，现在已经是最流行的编程语言之一。2016 年爆栈网的开发者调查中，JavaScript 在<a href="http://stackoverflow.com/research/developer-survey-2016#technology-most-popular-technologies" rel="nofollow noreferrer" target="_blank">最流行技术</a>和<a href="http://stackoverflow.com/research/developer-survey-2016#technology-top-tech-on-stack-overflow" rel="nofollow noreferrer" target="_blank">最热门问答</a>两项排名第一，其他方面也名列前茅。</p>
<p>Node.js 是一个服务器端 JavaScript 执行环境，提供了底层服务器功能环境，包括二进制数据操作、文件系统 I/O、数据库访问、网络访问等。它独一无二的特性使其在现存的多种成熟服务器语言中脱颖而出，并且经过了业界领先的科技公司如 Paypal、Tinder、Medium（是的，本文原文的那个博客系统）、LinkedIn 和 Netflex 的实战应用，甚至这些都发生在 Node.js 发布 1.0 之前。</p>
<p>我最近在 StackOverflow 上回答一个<a href="http://stackoverflow.com/questions/36766696/which-is-correct-node-js-architecture/37512766#37512766" rel="nofollow noreferrer" target="_blank">关于 Node.js 内部代码结构</a>的问题，因此而萌生了写作本文的念头。</p>
<hr>
<p>Node.js 的官方文档其实讲得并不清楚它是什么：</p>
<blockquote><p>一个基于 Chrome V8 引擎的 JavaScript 运行时。Node.js 采用事件驱动、非阻塞 I/O 模型……</p></blockquote>
<p>要理解这段话和它背后的真正力量，我们需要把 Node.js 拆分到组件，了解它们的关键技术，如何交互协作，最终构成了 Node.js 这个强大的运行时环境：</p>
<p><span class="img-wrap"><img data-src="/img/bVyNKc" src="https://static.alili.tech/img/bVyNKc" alt="Node.js Architecture (High-Level to Low-Level)" title="Node.js Architecture (High-Level to Low-Level)" style="cursor: pointer;"></span></p>
<h3 id="articleHeader0">组件和第三方依赖</h3>
<p><a href="https://developers.google.com/v8/" rel="nofollow noreferrer" target="_blank"><strong>V8</strong></a>：Google 开源的高性能 JavaScript 引擎，以 C++ 实现。这也是集成在 Chrome 中的 JS 引擎。V8 将你写的 JavaScript 代码编译为机器码（所以它超级快）然后执行。V8 有多快？看看<a href="http://stackoverflow.com/a/41932/4603550" rel="nofollow noreferrer" target="_blank">这个爆栈网的回答</a>。</p>
<p><a href="https://github.com/libuv/libuv" rel="nofollow noreferrer" target="_blank"><strong>libuv</strong></a>：提供异步功能的 C 库。它在运行时负责一个事件循环（Event Loop）、一个线程池、文件系统 I/O、DNS 相关和网络 I/O，以及一些其他重要功能。</p>
<p><a href="https://nodejs.org/en/docs/meta/topics/dependencies/" rel="nofollow noreferrer" target="_blank"><strong>其他 C/C++ 组件和库</strong></a>：如 <a href="http://c-ares.haxx.se/" rel="nofollow noreferrer" target="_blank">c-ares</a>、<a href="https://www.openssl.org/" rel="nofollow noreferrer" target="_blank">crypto (OpenSSL)</a>、<a href="https://github.com/nodejs/http-parser" rel="nofollow noreferrer" target="_blank">http-parser</a> 以及 <a href="http://zlib.net/" rel="nofollow noreferrer" target="_blank">zlib</a>。这些依赖提供了对系统底层功能的访问，包括网络、压缩、加密等。</p>
<p><strong>应用/模块（Application/Modules）</strong>：这部分就是所有的 JavaScript 代码：你的应用程序、Node.js 核心模块、任何 npm install 的模块，以及你写的所有模块代码。你花费的主要精力都在这部分。</p>
<p><strong>绑定（Bindings）</strong>：Node.js 用了这么多 C/C++ 的代码和库，简单来说，它们性能很好。不过，JavaScript 代码最后是怎么跟这些 C/C++ 代码互相调用的呢？这不是三种不同的语言吗？确实如此，而且通常不同语言写出来的代码也不能互相沟通，没有 binding 就不行。Binding 是一些胶水代码，能够把不同语言绑定在一起使其能够互相沟通。在 Node.js 中，binding 所做的就是把 Node.js 那些用 C/C++ 写的库接口暴露给 JS 环境。这么做的目的之一是代码重用：这些功能已经有现存的成熟实现，没必要只是因为换个语言环境就重写一遍，如果桥接调用一下就足够的话。另一个原因是性能：C/C++ 这样的系统编程语言通常都比其他高阶语言（Python、JavaScript、Ruby 等等）性能更高，所以把主要消耗 CPU 的操作以 C/C++ 代码来执行更加明智。</p>
<p><strong>C/C++ Addons</strong>：Binding 仅桥接 Node.js 核心库的一些依赖，zlib、OpenSSL、c-ares、http-parser 等。如果你想在应用程序中包含其他第三方或者你自己的 C/C++ 库的话，需要自己完成这部分胶水代码。你写的这部分胶水代码就称为 Addon。可以把 Binding 和 Addon 视为连接 JavaScript 代码和 C/C++ 代码的桥梁。</p>
<h3 id="articleHeader1">术语</h3>
<p><strong>I/O</strong>：输入/输出（Input/Output）的缩写，基本上代指那些主要由计算机 I/O 子系统处理的操作。重 I/O 操作（I/O-bound operations）通常会牵涉到磁盘或驱动器访问，例如数据库访问或文件系统相关操作。类似的概念还有重 CPU 操作（CPU-bound）、重内存操作（Memory-bound）等等。它们的区分是根据系统哪部分性能对这个操作有最大的影响。比如对于某项操作而言，CPU 运算能力提高可以带来最大的提升，这项操作就属于重 CPU 操作。</p>
<p><strong>非阻塞/异步</strong>：当一项请求发来，应用程序会处理这个请求，其他操作需要等这个请求处理完成才能执行。这个流程的问题是：当大量请求并发时每个请求都需要等待前一个完成，也就是说每个请求都会阻塞后面的所有请求，最糟糕的是如果前一个请求花了很长时间（比如从数据库读取 3GB 的数据）后面所有请求都跟着悲剧了。解决办法可以是引入多处理器和（或）多线程架构，这些办法各有优劣。Node.js 采用了另一种方式，不再为每个请求开启一个新的线程，而是所有请求都在单一的主线程中处理，也只做这么一件事情：处理请求——请求中包含的 I/O 操作如文件系统访问、数据库读写等，都会转发给由 libuv 管理的工作线程去执行。也就是说，请求中的 I/O 操作是异步处理的，而非在主线程上进行。这个办法就使得主线程从不会阻塞，因为所有耗时的任务都分配到了别处。你需要面对的只有唯一的主线程，所有 libuv 管理的工作线程都与你隔离开来，无需操心，Node.js 会处理好那部分。在这个架构之上重 I/O 操作变得格外高效，那些重 CPU、重内存的也一样。Node.js 提供了开箱即用的异步 I/O 调度，还有一些针对重 CPU 执行的处理，不过这已经超出本文话题范畴了。</p>
<p><strong>事件驱动</strong>：基本上，所有现代系统都是主程序启动完毕之后，对每个收到的请求开启一个进程，接下来根据不同技术有不同的处理方式，有时差异会大相径庭。典型的实现是：针对一个请求开启一个线程，一步接一步执行任务操作，如果某个操作执行缓慢，这个线程上的后续操作都会随之挂起，直到所有操作完成，返回结果。而在 Node.js 中，所有的操作都注册为一个事件，等待主程序或者外部请求来触发。</p>
<p><strong>（系统）运行时</strong>：Node.js 运行时是指所有这些代码（上述所有组件，包括底层和上层）提供给 Node.js 应用程序执行的环境。</p>
<h3 id="articleHeader2">合体</h3>
<p>我们已经了解 Node.js 顶层组件各自的概貌，现在看看它们组合在一起的工作流程，可以更透彻地理解整体架构以及各部分如何协作交互。</p>
<p>一个 Node.js 应用启动时，V8 引擎会执行你写的应用代码，保持一份观察者（注册在事件上的处理函数）列表。当事件发生时，它的处理函数会被加进一个<strong>事件队列</strong>。只要这个队列还有等待执行的事件，<strong>事件循环</strong>就会持续把事件从队列中拿出，放进<strong>调用堆栈</strong>。需要注意的是，只有当前一个事件处理完毕（调用堆栈也已经清空），事件循环才会把下一个事件放进调用堆栈。</p>
<p>在调用堆栈中，所有的 I/O 请求都会转发给 libuv 处理。libuv 会维持一个线程池，包含四个工作线程（这是默认数量，也可以修改配置增加更多工作线程）。文件系统 I/O 请求和 DNS 相关请求都会放进这个线程池处理；其他的请求，如网络、平台特性相关的请求会分发给相应的系统处理单元（参见 <a href="http://docs.libuv.org/en/v1.x/design.html" rel="nofollow noreferrer" target="_blank">libuv 设计概览</a>）。</p>
<p>安排给线程池的这些 I/O 操作由 Node.js 的底层库执行，完成之后 libuv 把此事件放回事件队列，等待主线程执行后续操作。在 libuv 处理这些异步 I/O 操作期间，主线程不会等待处理结果，而是继续忙其他事情，只有当事件循环把 libuv 返回的事件放进调用堆栈之后，主线程才会继续处理这个事件的后续操作。这就是一个事件在 Node.js 中执行的整个生命周期。</p>
<p><a href="http://stackoverflow.com/users/370756/mbq" rel="nofollow noreferrer" target="_blank">mbp</a> 曾经做过一个<a href="http://stackoverflow.com/a/3491931/4603550" rel="nofollow noreferrer" target="_blank">巧妙的比喻</a>，把 Node.js 看成一家餐厅。我在此借用下他的例子，稍作修改来阐述下 Node.js 的执行情况：</p>
<p>把 Node.js 应用程序想象成一家星巴克，一个训练有素的前台服务生（唯一的主线程）在柜台前接受订单。当很多顾客同时光临的时候，他们排队（进入事件队列）等候接待；每当服务生接待一位顾客，服务生会把订单告知给经理（libuv），经理安排相应的专职人员去烹制咖啡（工作线程或者系统特性）。这个专职人员会使用不同的原料和咖啡机（底层 C/C++ 组件）按订单要求制作咖啡或甜点，通常会有四个这样的专职人员保持在岗待命（线程池），高峰期的时候也可以安排更多（不过需要在一早就安排人员来上班，而不能中午临时通知）。服务生把订单转交给经理之后不需要等着咖啡制作完成，而是直接开始接待下一位顾客（事件循环放进调用堆栈的另一个事件），你可以把当前调用堆栈里的事件看成是站在柜台前正在接受服务的顾客。</p>
<p>当咖啡完成时，会被发送到顾客队列的最后位置，等它移动到柜台前服务生会叫相应顾客的名字，顾客就来取走咖啡（最后这部分在真实生活中听起来有点怪，不过你从程序执行的角度理解就比较合乎情理了）。</p>
<hr>
<p>以上就是 Node.js 的内部顶层组件架构概览，以及它的事件循环机制。本文依然是非常精简概括，还有很多问题和细节没有展开，如重 CPU 操作的处理、Node.js 设计模式等，未来会有更多文章阐述这些内容（译注：在 Aren Li 的 Medium 专栏 <a href="https://medium.com/yet-another-node-js-blog" rel="nofollow noreferrer" target="_blank">Yet Another Node.js Blog</a> 里）。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Node.js 架构概览

## 原文链接
[https://segmentfault.com/a/1190000005892501](https://segmentfault.com/a/1190000005892501)


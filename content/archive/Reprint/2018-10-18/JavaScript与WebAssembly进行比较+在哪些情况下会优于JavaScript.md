---
title: JavaScript与WebAssembly进行比较+在哪些情况下会优于JavaScript
reprint: true
categories: reprint
abbrlink: 86189f01
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>这是专门探索JavaScript及其构建组件的系列的第6期。在识别和描述核心元素的过程中，我们还分享了构建<a href="https://www.sessionstack.com/?utm_source=medium&amp;utm_medium=blog&amp;utm_content=Post-6-webassembly-intro">SessionStack</a>时使用的一些经验法则，这是一个轻量级但健壮且高性能的JavaScript应用程序，以帮助用户实时查看和重现其Web应用程序的缺陷。</p>
<p>如果你错过了前面的章节，你可以在这里找到它们：</p>
<ul>
<li><a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf?source=collection_home---2------1----------------">关于引擎，运行时和调用堆栈的概述</a></li>
<li><a href="https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e?source=collection_home---2------2----------------">Google的V8引擎+ 5个关于如何编写优化代码的技巧</a></li>
<li><a href="https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec?source=collection_home---2------0----------------">内存管理+如何处理4个常见的内存泄漏</a></li>
<li><a href="https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5">事件循环和Async编程的兴起+使用async / await更好编码的5种方法</a></li>
<li><a href="https://blog.sessionstack.com/how-javascript-works-deep-dive-into-websockets-and-http-2-with-sse-how-to-pick-the-right-path-584e6b8e3bf7?source=collection_home---4------0----------------">通过SSE +深入研究WebSockets和HTTP / 2如何选择正确的路径</a></li>
</ul>
<p>这次我们来分析WebAssembly的工作原理，以及在如下几个方面和JavaScript进行比较：加载时间，执行速度，垃圾回收，内存使用情况，平台API访问，调试，多线程和可移植性。</p>
<h4>首先，让我们看看WebAssembly的功能。</h4>
<p>WebAssembly（又名wasm）是一种高效的，低级别的编程语言。
它让我们能够使用JavaScript以外的语言（例如C，C ++，Rust或其他）编写程序，然后将其编译成WebAssembly，进而生成一个加载和执行速度非常快的Web应用程序。</p>
<h4>加载时间</h4>
<p>为了加载JavaScript，浏览器必须加载所有.js文本文件。
WebAssembly在浏览器中加载速度更快，因为只有已编译的wasm文件才通过互联网传输。并且wasm是一种非常简洁的二进制格式的低级汇编语言，文件更小。</p>
<h4>执行</h4>
<p>目前Wasm 比<strong>本地代码执行</strong>速度慢20％。这倒是一个令人吃惊的结果，不过，这是一种编译到沙盒环境中的格式并且在很多约束条件下运行，以确保它没有安全漏洞或者很难攻防这个漏洞。与真实的本地代码相比，其实速度下降很小。但是，未来它会更快。</p>
<p>更好的是，它与浏览器无关 - 所有主要引擎都增加了对WebAssembly的支持，并且现在提供类似的执行时间。
为了理解WebAssembly与JavaScript相比执行得有多快，您应该先阅读我们关于 <a href="">JavaScript引擎如何工作</a> )的文章。
我们来看看简单看看V8中发生了什么：</p>
<p><img src="https://p0.ssl.qhimg.com/t01f0dee6044873abf8.png" alt="">         </p>
<p>V8 Approach: lazy compilation</p>
<p>在左边，我们有一些JavaScript源代码，包含JavaScript函数。它首先需要进行分析，以便将所有字符串转换为标记并生成<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree">抽象语法树（AST）</a>。AST是JavaScript程序逻辑的内存表示。一旦生成这种表示，V8直接转到机器码。一般来说，只需要遍历树，生成机器代码，便生成了编译好的函数。从这个过程可以看出，这个阶段并没有编译速度的优势。
现在，我们来看看V8管道在下一阶段的功能：</p>
<p><img src="https://p0.ssl.qhimg.com/t0129c2f13b87038b58.png" alt="">        </p>
<p>V8管道设计</p>
<p>这次我们有<a href="https://github.com/v8/v8/wiki/TurboFan">TurboFan</a>，V8的优化编译器之一。当您的JavaScript应用程序正在运行时，很多代码在V8中运行。TurboFan可以监控运行缓慢的内容，是否存在瓶颈和热点以优化它们。它将它们推送到后端，这是一个优化的<a href="https://en.wikipedia.org/wiki/Just-in-time_compilation">JIT</a>，它可以优化那些非常耗cpu的代码。
虽然它解决了上述问题，但是新的问题在于：分析代码并决定优化哪些内容的过程也会消耗CPU。这反过来又意味着更高的电池消耗，特别是在移动设备上。
然而，wasm不一样在于，它会被插入工作流程中，如下所示：</p>
<p><img src="https://p0.ssl.qhimg.com/t01d705e2e767a3a4d9.png" alt="">     </p>
<p>V8管道设计+ WASM</p>
<p>在汇编阶段，wasm已经优化过了。最重要的是，解析也不是必需的。你有一个优化的二进制文件，可以直接hook到可以生成机器码的后端。所有优化都由编译器在前端完成。
这使得执行wasm更有效率，因为流程中的很多步骤都可以简单地跳过。</p>
<h4>内存模型</h4>
<p><img src="https://p0.ssl.qhimg.com/t0107ee54e6d108456b.png" alt="">     </p>
<p>WebAssembly可信和不可信状态
例如，编译成WebAssembly的C ++程序的内存是连续的内存块，其中没有“漏洞”。有助于提高安全性的wasm的特性之一是执行堆栈与线性内存分离的概念。在一个C ++程序中，你有一个内存堆，你从堆的底部分配，然后从堆顶增涨堆大小。这便产生一个很多恶意软件利用的漏洞：用一个指针就可以在堆栈内存中查找数据从而更改变量，而这些数据本是你不应该访问到的。</p>
<p>WebAssembly采用完全不同的模型。执行堆栈与WebAssembly程序本身是分开的，因此您无法在其中修改并更改变量等内容。而且，这些函数使用整数偏移而不是指针。函数指向一个间接函数表。然后这些直接计算的数字跳转到模块内部的函数中。它是以这种方式构建的，以便您可以同时加载多个wasm模块，形成多个索引列表，并且一切正常。
有关JavaScript中内存模型和管理的更多信息，可以查看关于该主题的非常详细的<a href="https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec">帖子</a>。</p>
<h4>垃圾回收</h4>
<p>您已经知道JavaScript的内存管理是使用垃圾回收器处理的。</p>
<p>WebAssembly的情况有点不同。它支持手动管理内存的语言。您可以自定义在WASM上的垃圾回收模块，但是这个比较复杂。</p>
<p>目前，WebAssembly是围绕C ++和RUST用例设计的。由于wasm是非常低级的，因此只有汇编语言上一步的编程语言才易于编译。C可以使用普通的malloc，C ++可以使用智能指针，Rust使用完全不同的模式（完全不同的主题）。这些语言不使用GC，因此它们不需要所有复杂的运行时内容来跟踪内存。WebAssembly对他们来说是天作之合。</p>
<p>另外，这些语言并不是100％设计用于调用复杂的JavaScript事物，如DOM。在C ++中编写整个HTML应用程序是没有意义的，因为C ++不是为它设计的。在大多数情况下，当工程师编写C ++或Rust时，他们的目标是WebGL或高度优化的库（例如重数学计算）。</p>
<p>但是，将来WebAssembly将支持不附带GC的语言。</p>
<h4>平台API访问</h4>
<p>取决于执行JavaScript的运行时，可以通过你的JavaScript应用程序来访问平台相关的API。例如，如果您在浏览器中运行JavaScript，则您有一组<a href="https://developer.mozilla.org/en-US/docs/Web/API">Web APIs</a>，Web应用程序可以调用它来控制Web浏览器/设备功能并访问<a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model">DOM</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model">CSSOM</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API">WebGL</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio API</a>等。</p>
<p>然而，WebAssembly模块无法访问任何平台API。一切都是由JavaScript调用的。如果您想访问WebAssembly模块中的某些平台特定的API，则必须通过JavaScript调用它。</p>
<p>例如，如果你想console.log，你必须通过JavaScript来调用它，而不是你的C ++代码。这些JavaScript调用的成本有所降低。</p>
<p>这并不总是如此。该规范将在未来为平台API提供wasm，并且您将能够在没有JavaScript的情况下发布您的应用程序。</p>
<h4>Source maps</h4>
<p>当您精简JavaScript源代码时，您需要一种正确方式调试它。这就需要Source Maps。基本上， <a href="https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/">Source Maps</a> 是一种将组合/缩小文件映射回未建立状态的方法。当您为生产而构建时，同时缩小和组合您的JavaScript文件，您将生成一个包含原始文件信息的源映射。当您在生成的JavaScript中查询某一行和列号时，可以在返回原始位置的源地图中执行查找。</p>
<p>WebAssembly目前不支持source maps，因为没有规范，但最终会支持（可能很快）。
当您在C ++代码中设置断点时，您将看到C ++代码而不是WebAssembly。</p>
<h4>多线程</h4>
<p>JavaScript在单个线程上运行。有很多方法可以利用Event Loop并利用异步编程，如我们<a href="https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5">关于该主题的文章中详细描述的那样</a>。</p>
<p>JavaScript也使用Web Workers，但他们有一个非常具体的用例 - 基本上，可能阻塞主UI线程的任何CPU密集计算都可以进入到Web Worker中来提高性能。但是，Web Workers无法访问DOM。</p>
<p>WebAssembly目前不支持多线程。但是，这可能是未来的事情。Wasm将更接近本地线程（例如C ++样式线程）。拥有“真实”的线程将在浏览器中创造出许多新的机会。当然，这将打开更多滥用可能性的大门。
可移植性</p>
<h4>可移植性</h4>
<p>如今，JavaScript几乎可以在任何地方运行，从浏览器到服务器端甚至嵌入式系统。</p>
<p>WebAssembly被设计为安全和便携。就像JavaScript一样。它将运行在支持主机的每个环境中（例如每个浏览器）。就像当年的Java的Applets，WebAssembly有相同的可移植性的愿景。</p>
<h4>在JavaScript上使用WebAssembly，哪些场景更合适？</h4>
<p>在WebAssembly的第一个版本中，主要关注CPU占用大的计算（例如处理数学）。想到的最主流的用途是游戏 - 那里有大量的像素操作。您可以使用您习惯的OpenGL在C ++ / Rust中编写您的应用程序，并将其编译为wasm。它会在浏览器中运行。
看看这个（在Firefox中运行） -  <a href="http://s3.amazonaws.com/mozilla-games/tmp/2017-02-21-SunTemple/SunTemple.html。这是">http://s3.amazonaws.com/mozilla-games/tmp/2017-02-21-SunTemple/SunTemple.html。这是</a> <a href="https://www.unrealengine.com/en-US/what-is-unreal-engine-4">Unreal engine</a>.。</p>
<p>另一种使用WebAssembly（性能方面）可能有意义的情况是实现一些库，这是一个CPU密集型工作。例如，一些图像处理。</p>
<p>如前所述，由于大多数处理步骤都是在编译期间提前完成的，因此wasm可以减少移动设备上的电池消耗（取决于引擎）。</p>
<p>将来，即使您实际上没有编写编译代码，您也可以使用WASM二进制文件。您可以在NPM中找到开始使用此方法的项目。</p>
<p>对于DOM操作和沉重的平台API使用，使用JavaScript确实很有意义，因为它不会增加额外的开销，并且具有本地提供的API。</p>
<p>在<a href="https://www.sessionstack.com/?utm_source=medium&amp;utm_medium=blog&amp;utm_content=Post-6-webassembly-outro">SessionStack</a>中，我们不断增强JavaScript的性能，以编写高度优化且高效的代码。我们的解决方案需要提供超快的性能，因为我们不能阻碍客户应用的性能。将SessionStack集成到生产Web应用程序或网站后，它会开始记录所有内容：所有DOM更改，用户交互，JavaScript异常，堆栈跟踪，失败的网络请求和调试数据。所有这些都在您的生产环境中进行，而不会影响产品的任何UX和性能。我们需要大量优化我们的代码并尽可能使其异步。</p>
<p>不仅仅是库文件，当在SessionStack中重放用户回话时，我们会渲染用户浏览器中发生的所有事件，并且我们必须重构整个状态，允许您在会话时间线中来回跳转。因为没有更好的选择，为了做到这一点，我们大量使用了JavaScript提供的异步机会。</p>
<p>借助WebAssembly，我们将能够将一些最繁重的处理和渲染转换为更适合作业的语言，并将数据收集和DOM操作保留为JavaScript。</p>
<p>如果你想尝试下SessionStack，你可以免费开始。<a href="">有一个免费的计划</a>)，每月提供1000个会话。</p>
<p><img src="https://p0.ssl.qhimg.com/t017273cb471e1d3049.png" alt=""></p>
<p>参考:</p>
<ul>
<li><a href="https://www.youtube.com/watch?v=6v4E6oksar0&amp;t=1143s">https://www.youtube.com/watch?v=6v4E6oksar0</a></li>
<li><a href="https://www.youtube.com/watch?v=6Y3W94_8scw">https://www.youtube.com/watch?v=6Y3W94_8scw</a></li>
</ul>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-javascript-works-a-comparison-with-webassembly-why-in-certain-cases-it-s-better-to-use-it-over-javascript](https://www.zcfy.cc/article/how-javascript-works-a-comparison-with-webassembly-why-in-certain-cases-it-s-better-to-use-it-over-javascript)
原文标题: JavaScript与WebAssembly进行比较+在哪些情况下会优于JavaScript
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

---
title: 了解node.js事件循环
hidden: true
categories: [reprint]
slug: 617ff6e6
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>node.js的第一个基本论点是I / O的性能消耗是很昂贵：</p>
<p>﻿<a href="http://blog.mixu.net/files/2011/01/io-cost.png"><img src="https://p0.ssl.qhimg.com/t012a94409121d21cfb.png" alt="" title="io-cost"></a></p>
<p>因此，使用当前编程技术的最大浪费来自于等待I / O完成。有几种方法可以处理性能影响（来自<a href="http://www.nightmare.com/medusa/async_sockets.html">Sam Rushing</a>)）：</p>
<ul>
<li><p>同步：您一次处理一个请求，每个请求依次处理。优点：简单。缺点：任何一个请求都需要等待上一个请求的完成后才执行。</p>
</li>
<li><p>启动一个新的进程：你使用一个新的进程来处理每个请求。优点：容易。缺点：不能很好地扩展，数百个连接意味着数百个进程。 fork（）是Unix程序员的锤子。因为它是可用的，所以每个问题看起来都像一个钉子。这通常是矫枉过正</p>
</li>
<li><p>线程：启动一个新线程来处理每个请求。优点：简单，并且比使用fork更亲切，因为线程通常具有更少的开销。 缺点：您的机器可能没有线程，并且线程化编程可能会变得非常复杂，并且担心控制对共享资源的访问。</p>
</li>
</ul>
<p>第二个基础论点是线程每连接的内存很贵：[例如该图表显示了与Nginx相比，Apache吸收内存的每个人都清楚]</p>
<p>Apache是​​多线程的：它为<a href="http://httpd.apache.org/docs/2.0/mod/worker.html">每个请求产生一个线程</a>（或<a href="http://httpd.apache.org/docs/2.0/mod/prefork.html">进程</a>，它依赖于conf）。随着并发连接数量的增加以及需要更多线程来为多个同时的客户端服务，您可以看到这种开销如何消耗内存。 Nginx和Node.js不是多线程的，因为线程和进程会带来沉重的内存成本。它们是单线程的，但是基于事件。这消除了数千个线程/进程通过处理单个线程中的多个连接而产生的开销。</p>
<h2><strong>Node.js为您的代码保留单个线程...</strong></h2>
<p>它确实是一个单线程运行：你不能执行任何并行代码;例如做一个“sleep”会阻塞服务器一秒钟：js while（new Date（）.getTime（）&lt; now + 1000）{// do nothing}所以当这段代码运行时，node.js不会响应来自客户端的任何其他请求，因为它只有一个执行代码的线程。或者如果你有一些CPU密集的代码，比如说调整图像大小，那么它仍然会阻止所有其他的请求。</p>
<h2><strong>..然而，除了你的代码，所有东西都是并行运行</strong></h2>
<p>在单个请求中没有办法让代码并行运行。但是，所有的I / O都是偶数并且是异步的，所以下面不会阻塞服务器：[codesyntax lang =“javascript”]</p>
<pre><code class="hljs xml"> c.query(
   'SELECT SLEEP(20);',
   function (err, results, fields) {
     if (err) {
       throw err;
     }
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end('<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Return from async DB query<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>');
     c.end();
    }
);
</code></pre><p>如果你在一个请求中这样做，其他请求可以在数据库运行时进行处理。</p>
<h2>为什么要这样处理？我们什么时候从同步到异步/并行执行？</h2>
<p>同步执行很好，因为它简化了编写代码（与线程相比，并发问题有导致WTF的倾向）。</p>
<p>在node.js中，你不应该担心后端会发生什么情况：只要在做I / O时使用回调;并确保您的代码永远不会中断，并且执行I / O不会阻止其他请求，而不会导致每个请求的线程/进程成本（例如Apache中的内存开销）。</p>
<p>拥有异步I / O是很好的，因为I / O的更高效，我们应该做更好的事情，而不仅仅是等待I / O。</p>
<p><a href="http://blog.mixu.net/files/2011/01/bucket_3.gif"><img src="https://p0.ssl.qhimg.com/t01528d5247e98a5f59.gif" alt="" title="bucket_3"></a></p>
<p>事件循环是“处理和处理外部事件并将其转换为回调调用的实体”。因此，I / O调用是Node.js可以从一个请求切换到另一个请求的点。在I / O调用中，您的代码会保存回调并将控制权返回给node.js运行时环境。当数据实际可用时，稍后调用回调。</p>
<p>当然，在后端，<a href="http://stackoverflow.com/questions/3629784/how-is-node-js-inherently-faster-when-it-still-relies-on-threads-internally">有数据库访问和流程执行的线程和进程</a>。然而，这些并没有明确暴露给你的代码，所以除了知道I / O交互例如与数据库或与其他进程的异步从每个请求的角度来看，因为这些线程的结果通过事件循环返回到您的代码。与Apache模型相比，线程和线程开销较少，因为每个连接都不需要线程;当你绝对肯定必须有别的东西并行运行时，即使这样管理也是由Node.js来处理的。</p>
<p>除I / O调用外，Node.js预计所有请求都会很快返回;例如应将<a href="http://stackoverflow.com/questions/3491811/node-js-and-cpu-intensive-requests">CPU密集型工作分解</a>到另一个可与事件交互的进程，或使用<a href="http://blog.std.in/2010/07/08/nodejs-webworker-design/">WebWorkers</a>之类的抽象。这（显然）意味着如果没有另一个线程与您通过事件交互的背景进行交互，则无法并行化代码。基本上，所有发出事件的对象（例如，EventEmitter的实例）都支持异步的偶数交互，并且你可以用这种方式与阻止代码进行交互，例如，使用所有这些都是Node.js中的EventEmitter的文件，套接字或子进程。<a href="http://developer.yahoo.com/blogs/ydn/posts/2010/07/multicore_http_server_with_nodejs/">多核可以使用这种方法完成</a>;另请参阅：node-http-proxy。</p>
<p><strong>内部实施</strong></p>
<p><a href="https://github.com/ry/node/tree/master/deps">在内部</a>，node.js依靠<a href="http://software.schmorp.de/pkg/libev.html">libev</a>来提供事件循环，这是libeio的补充，它使用池化线程来提供异步I / O。要了解更多信息，请查看<a href="http://pod.tst.eu/http://cvs.schmorp.de/libev/ev.pod">libev文档</a>。</p>
<h2>那么我们如何在Node.js中进行异步？</h2>
<p>Tim Caswell在他精彩的<a href="http://creationix.com/jsconf.pdf">演讲</a>中描述了这些模式：</p>
<ul>
<li>一流的功能。例如。我们将函数作为数据传递，随机播放并在需要时执行它们。</li>
<li>功能组成。也称为具有匿名函数或闭包，在事件发生在偶数I / O之后执行。</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/understanding-the-node-js-event-loop](https://www.zcfy.cc/article/understanding-the-node-js-event-loop)
原文标题: 了解node.js事件循环
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

---
title: '理解Node.js的事件轮询' 
date: 2019-01-27 2:30:59
hidden: true
slug: x8lg3ujvtlq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><strong>总括</strong> ：</p>
<ul>
<li><p>原文地址：<a href="https://damonare.github.io/2017/02/08/%E7%90%86%E8%A7%A3Node.js%E7%9A%84%E4%BA%8B%E4%BB%B6%E8%BD%AE%E8%AF%A2/#more" rel="nofollow noreferrer" target="_blank">理解Node.js的事件轮询</a></p></li>
<li><p>Node小应用：<a href="https://github.com/damonare/node-sample" rel="nofollow noreferrer" target="_blank">Node-sample</a></p></li>
</ul>
<p><strong>智者阅读群书，亦阅历人生</strong></p>
<h2 id="articleHeader1">正文</h2>
<h4>Node.js的两个基本概念</h4>
<p>Node.js的第一个基本概念就是I/O操作开销是巨大的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008296045?w=509&amp;h=362" src="https://static.alili.tech/img/remote/1460000008296045?w=509&amp;h=362" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>所以，当前变成技术中最大的浪费来自于等待I/O操作的完成。有几种方法可以解决性能的影响：</p>
<ul>
<li><p><strong>同步方式</strong>：按次序一个一个的处理请求。<em>利</em>：简单；<em>弊</em>：任何一个请求都可以阻塞其他所有请求。</p></li>
<li><p><strong>开启新进程</strong>：每个请求都开启一个新进程。<em>利</em>：简单；<em>弊</em>：大量的链接意味着大量的进程。</p></li>
<li><p><strong>开启新线程</strong>：每个请求都开启一个新线程。<em>利</em>：简单，而且跟进程比，对系统内核更加友好，因为线程比进程轻的多;<em>弊</em>:不是所有的机器都支持线程，而且对于要处理共享资源的情况，多线程编程会很快变得太过于复杂。</p></li>
</ul>
<p>第二个基本概念是每个连接都创建一个新线程是很消耗内存的（例如：你可以对比Nginx回想一下Apache内存耗尽的情景）。</p>
<p>Apache是多线程的：它为每个请求开启一个新的线程（或者是进程，这取决于你的配置），当并发连接增多时，你可以看看它是怎么一点一点耗尽内存的。Nginx和Node.js不是多线程的，因为线程的消耗太“重”了。它们两个是单线程、基于事件的，这就把处理众多连接所产生的线程/进程消耗给消除了。</p>
<h4>单线程</h4>
<p>确实只有一个线程：你不能并行执行任何代码，比如：下面的“sleep”将会阻塞sever1秒钟：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep() {
   var now = new Data().getTime();
   while (new Date().getTime() < now + 1000) {
         // do nothing
   }
}
sleep();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> Data().getTime();
   <span class="hljs-keyword">while</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() &lt; now + <span class="hljs-number">1000</span>) {
         <span class="hljs-comment">// do nothing</span>
   }
}
sleep();</code></pre>
<p>但就我目前学习阶段而言，我觉得好多人对于所谓的node单线程是有误解的。实际上官方给出的“单线程”是具有误导性的。所谓的单线程是指你的代码只运行在一个线程上(好多地方都叫它主线程，实际上Javascript的浏览器运行环境不也是这么处理我们写的Javascript代码的嘛)，而诸多任务的并行处理，就需要多线程了，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008296046?w=380&amp;h=385" src="https://static.alili.tech/img/remote/1460000008296046?w=380&amp;h=385" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如上图，Node.js中的单线程之说指的就是这个主线程，这个主线程有一个循环结构，保持着整个程序(你写的代码)的运转。</p>
<h4>事件轮询</h4>
<p>其实上面我们所说的<strong>维持主线程运行的循环</strong>这部分就是"事件轮询"，它存在于主线程中，负责不停地调用开发者编写的代码。但对开发者是不可见的。so...开发者编写的代码是怎样被调用的呢？看下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008296047?w=394&amp;h=349" src="https://static.alili.tech/img/remote/1460000008296047?w=394&amp;h=349" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如上图，异步函数在执行结束后，会在事件队列中添加一个事件(遵循先进先出原则)，主线程中的代码执行完毕后(即一次循环结束)，下一次循环开始就在事件队列中"读取"事件，然后调用它所对应的回调函数(所以回调函数的执行顺序是不一定的)。如果开发者在回调函数中调用了阻塞方法(比如上文中的sleep函数)，那么整个事件轮询就会阻塞，事件队列中的事件得不到及时处理。正因为这样，nodejs中的一些库方法均是异步的，也提倡用户调用异步方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
fs.readFile('hello.txt', function (err, data) {  //异步读取文件
　　console.log(&quot;read file end&quot;);
});
while(1)
{
    console.log(&quot;call readFile over&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
fs.readFile(<span class="hljs-string">'hello.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{  <span class="hljs-comment">//异步读取文件</span>
　　<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"read file end"</span>);
});
<span class="hljs-keyword">while</span>(<span class="hljs-number">1</span>)
{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"call readFile over"</span>);
}</code></pre>
<p>如上代码，我们虽然使用了异步方法readfile读取文件，但<code>read file end</code>永远不会输出，因为代码始终在while循环中，下一次事件轮询始终没法开始，也就没法'读取'事件队列调用相应的回调函数了。</p>
<p>最后有一个<a href="https://github.com/damonare/node-sample" rel="nofollow noreferrer" target="_blank">Node-sample</a>是博主平时积累的一些代码，包含注释，汇总成了一个小应用，还是可以看到学习的蛛丝马迹的。感兴趣的您可以看看。</p>
<h2 id="articleHeader2">后记</h2>
<p>参考文章：</p>
<ul>
<li><p><a href="http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop" rel="nofollow noreferrer" target="_blank">Understanding the node.js event loop</a></p></li>
<li><p><a href="http://www.cnblogs.com/xiaozhi_5638/p/4816265.html" rel="nofollow noreferrer" target="_blank">nodejs事件轮询详述</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解Node.js的事件轮询

## 原文链接
[https://segmentfault.com/a/1190000008296042](https://segmentfault.com/a/1190000008296042)


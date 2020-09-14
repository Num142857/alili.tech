---
title: 'nodejs 异步I/O和事件驱动' 
date: 2019-02-10 2:30:42
hidden: true
slug: zugqhvdlz7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">nodejs 异步I/O和事件驱动</h1>
<blockquote><p>注：本文是对众多博客的学习和总结，可能存在理解错误。请带着怀疑的眼光，同时如果有错误希望能指出。</p></blockquote>
<p>接触<code>nodejs</code>有两个月，对<code>nodejs</code>的两大特性一直有点模糊，即<code>异步IO</code>和<code>事件驱动</code>。通过对<strong><em>《深入浅出nodejs》</em></strong>和几篇博客的阅读以后，有了大致的了解，总结一下。</p>
<h2 id="articleHeader1">几个例子</h2>
<p>在开始之前，先来看几个简单例子，这也是我在使用<code>nodejs</code>时候遇到的几个比较困惑的例子。</p>
<hr>
<h3 id="articleHeader2">example 1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);
var debug = require('debug')('example1');

debug(&quot;begin&quot;);

setTimeout(function(){
    debug(&quot;timeout1&quot;);
});

setTimeout(function(){
    debug(&quot;timeout2&quot;);
});

debug('end');
/** 运行结果
Sat, 21 May 2016 08:41:09 GMT example1 begin
Sat, 21 May 2016 08:41:09 GMT example1 end
Sat, 21 May 2016 08:41:09 GMT example1 timeout1
Sat, 21 May 2016 08:41:09 GMT example1 timeout2
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'example1'</span>);

debug(<span class="hljs-string">"begin"</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout1"</span>);
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout2"</span>);
});

debug(<span class="hljs-string">'end'</span>);
<span class="hljs-comment">/** 运行结果
Sat, 21 May 2016 08:41:09 GMT example1 begin
Sat, 21 May 2016 08:41:09 GMT example1 end
Sat, 21 May 2016 08:41:09 GMT example1 timeout1
Sat, 21 May 2016 08:41:09 GMT example1 timeout2
*/</span></code></pre>
<p><strong>question 1</strong></p>
<blockquote><p>为何<code>timeout1</code>和<code>timeout2</code>的结果会在<code>end</code>后面？</p></blockquote>
<hr>
<h3 id="articleHeader3">example 2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);
var debug = require('debug')('example2');

debug(&quot;begin&quot;);

setTimeout(function(){
    debug(&quot;timeout1&quot;);
});

setTimeout(function(){
    debug(&quot;timeout2&quot;);
});

debug('end');

while(true);
/**  运行结果
Sat, 21 May 2016 08:45:47 GMT example2 begin
Sat, 21 May 2016 08:45:47 GMT example2 end
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'example2'</span>);

debug(<span class="hljs-string">"begin"</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout1"</span>);
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout2"</span>);
});

debug(<span class="hljs-string">'end'</span>);

<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>);
<span class="hljs-comment">/**  运行结果
Sat, 21 May 2016 08:45:47 GMT example2 begin
Sat, 21 May 2016 08:45:47 GMT example2 end
*/</span></code></pre>
<p><strong>question 2</strong></p>
<blockquote><p>为何<code>timeout1</code>和<code>timeout2</code>没有输出到终端？<code>while(true)</code>到底阻塞了什么？</p></blockquote>
<hr>
<h3 id="articleHeader4">example 3</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);
var debug = require('debug')('example3');

debug(&quot;begin&quot;);

setTimeout(function(){
    debug(&quot;timeout1&quot;);
    while (true);
});

setTimeout(function(){
    debug(&quot;timeout2&quot;);
});

debug('end');
/**  运行结果
Sat, 21 May 2016 08:49:12 GMT example3 begin
Sat, 21 May 2016 08:49:12 GMT example3 end
Sat, 21 May 2016 08:49:12 GMT example3 timeout1
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'example3'</span>);

debug(<span class="hljs-string">"begin"</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout1"</span>);
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>);
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout2"</span>);
});

debug(<span class="hljs-string">'end'</span>);
<span class="hljs-comment">/**  运行结果
Sat, 21 May 2016 08:49:12 GMT example3 begin
Sat, 21 May 2016 08:49:12 GMT example3 end
Sat, 21 May 2016 08:49:12 GMT example3 timeout1
*/</span></code></pre>
<p><strong>question 3</strong></p>
<blockquote><p>为什么<code>timeout1</code>中回调函数会阻塞<code>timeout2</code>中的回调函数的执行？</p></blockquote>
<hr>
<h3 id="articleHeader5">example 4</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);
var debug = require('debug')('example4');

debug(&quot;begin&quot;);

setTimeout(function(){
    debug(&quot;timeout1&quot;);
    /**
     * 模拟计算密集
     */
    for(var i = 0 ; i < 1000000 ; ++i){
        for(var j = 0 ; j < 100000 ; ++j);
    }
});

setTimeout(function(){
    debug(&quot;timeout2&quot;);
});

debug('end');
/**
Sat, 21 May 2016 08:53:27 GMT example4 begin
Sat, 21 May 2016 08:53:27 GMT example4 end
Sat, 21 May 2016 08:53:27 GMT example4 timeout1
Sat, 21 May 2016 08:54:09 GMT example4 timeout2  //注意这里的时间晚了好久
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'example4'</span>);

debug(<span class="hljs-string">"begin"</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout1"</span>);
    <span class="hljs-comment">/**
     * 模拟计算密集
     */</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; <span class="hljs-number">1000000</span> ; ++i){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span> ; j &lt; <span class="hljs-number">100000</span> ; ++j);
    }
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout2"</span>);
});

debug(<span class="hljs-string">'end'</span>);
<span class="hljs-comment">/**
Sat, 21 May 2016 08:53:27 GMT example4 begin
Sat, 21 May 2016 08:53:27 GMT example4 end
Sat, 21 May 2016 08:53:27 GMT example4 timeout1
Sat, 21 May 2016 08:54:09 GMT example4 timeout2  //注意这里的时间晚了好久
*/</span></code></pre>
<p><strong>question 4</strong></p>
<blockquote><p>和上面的问题一样，为何<code>timeout1</code>的计算密集型工作将会阻塞<code>timeout2</code>的回调函数的执行？</p></blockquote>
<hr>
<h3 id="articleHeader6">example 5</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);
var debug = require('debug')('example5');

debug(&quot;begin&quot;);

fs.readFile('package.json','utf-8',function(err,data){
    if(err)  
        debug(err);
    else
        debug(&quot;get file content&quot;);
});

setTimeout(function(){
    debug(&quot;timeout2&quot;);
});

debug('end');
/** 运行结果
Sat, 21 May 2016 08:59:14 GMT example5 begin
Sat, 21 May 2016 08:59:14 GMT example5 end
Sat, 21 May 2016 08:59:14 GMT example5 timeout2
Sat, 21 May 2016 08:59:14 GMT example5 get file content
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'example5'</span>);

debug(<span class="hljs-string">"begin"</span>);

fs.readFile(<span class="hljs-string">'package.json'</span>,<span class="hljs-string">'utf-8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>)</span>{
    <span class="hljs-keyword">if</span>(err)  
        debug(err);
    <span class="hljs-keyword">else</span>
        debug(<span class="hljs-string">"get file content"</span>);
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout2"</span>);
});

debug(<span class="hljs-string">'end'</span>);
<span class="hljs-comment">/** 运行结果
Sat, 21 May 2016 08:59:14 GMT example5 begin
Sat, 21 May 2016 08:59:14 GMT example5 end
Sat, 21 May 2016 08:59:14 GMT example5 timeout2
Sat, 21 May 2016 08:59:14 GMT example5 get file content
*/</span></code></pre>
<p><strong>question 5</strong></p>
<blockquote><p>为何读取文件的<code>IO</code>操作不会阻塞<code>timeout2</code>的执行？</p></blockquote>
<hr>
<p>接下来我们就带着上面几个疑惑去理解<code>nodejs</code>中的<code>异步IO</code>和<code>事件驱动</code>是如何工作的。</p>
<h2 id="articleHeader7">异步IO(asynchronous I/O)</h2>
<p>首先来理解几个容易混淆的概念，<code>阻塞IO(blocking I/O)</code>和<code>非阻塞IO(non-blocking I/O)</code>，<code>同步IO(synchronous I/O)和异步IO(synchronous I/O)</code>。</p>
<p>博主一直天真的以为<code>非阻塞I/O</code>就是<code>异步I/O</code> T_T，<code>apue</code>一直没有读懂。</p>
<h3 id="articleHeader8">阻塞I/O 和 非阻塞I/O</h3>
<p>简单来说，<strong>阻塞I/O</strong>就是当用户发一个读取文件描述符的操作的时候，进程就会被阻塞，直到要读取的数据全部准备好返回给用户，这时候进程才会解除<code>block</code>的状态。</p>
<p>那<strong>非阻塞I/O</strong>呢，就与上面的情况相反，用户发起一个读取文件描述符操作的时，函数立即返回，不作任何等待，进程继续执行。但是程序如何知道要读取的数据已经准备好了呢？最简单的方法就是轮询。</p>
<p>除此之外，还有一种叫做<code>IO多路复用</code>的模式，就是用一个阻塞函数同时监听多个文件描述符，当其中有一个文件描述符准备好了，就马上返回，在<code>linux</code>下，<code>select</code>,<code>poll</code>,<code>epoll</code>都提供了<code>IO多路复用</code>的功能。</p>
<h3 id="articleHeader9">同步I/O 和 异步I/O</h3>
<p>那么<code>同步I/O</code>和<code>异步I/O</code>又有什么区别么？是不是只要做到<code>非阻塞IO</code>就可以实现<code>异步I/O</code>呢？</p>
<p>其实不然。</p>
<ul>
<li><p><code>同步I/O(synchronous I/O)</code>做<code>I/O operation</code>的时候会将process阻塞,所以<code>阻塞I/O</code>，<code>非阻塞I/O</code>，<code>IO多路复用I/O</code>都是<code>同步I/O</code>。</p></li>
<li><p><code>异步I/O(asynchronous I/O)</code>做<code>I/O opertaion</code>的时候将不会造成任何的阻塞。</p></li>
</ul>
<p><code>非阻塞I/O</code>都不阻塞了为什么不是<code>异步I/O</code>呢？其实当<code>非阻塞I/O</code>准备好数据以后还是要阻塞住进程去内核拿数据的。所以算不上<code>异步I/O</code>。</p>
<p>这里借一张图(图来自<a href="https://segmentfault.com/a/1190000003063859?utm_source=Weibo&amp;utm_medium=shareLink&amp;utm_campaign=socialShare">这里</a>)来说明他们之间的区别</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005173228" src="https://static.alili.tech/img/remote/1460000005173228" alt="![Alt text\" title="![Alt text\" style="cursor: pointer;"></span>][1]</p>
<p>更多IO更多的详细内容可以在这里找到:</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000003063859?utm_source=Weibo&amp;utm_medium=shareLink&amp;utm_campaign=socialShare#articleHeader0" target="_blank">Linux IO模式及 select、poll、epoll详解</a></p></li>
<li><p><a href="http://www.ulduzsoft.com/2014/01/select-poll-epoll-practical-difference-for-system-architects/" rel="nofollow noreferrer" target="_blank">select / poll / epoll: practical difference for system architects</a></p></li>
</ul>
<h2 id="articleHeader10">事件驱动</h2>
<p><code>事件驱动(event-driven)</code>是<code>nodejs</code>中的第二大特性。何为<code>事件驱动</code>呢？简单来说，就是通过监听事件的状态变化来做出相应的操作。比如读取一个文件，文件读取完毕，或者文件读取错误，那么就触发对应的状态，然后调用对应的回掉函数来进行处理。</p>
<h3 id="articleHeader11">线程驱动和事件驱动</h3>
<p>那么<code>线程驱动</code>编程和<code>事件驱动</code>编程之间的区别是什么呢？</p>
<ul>
<li><p><code>线程驱动</code>就是当收到一个请求的时候，将会为该请求开一个新的线程来处理请求。一般存在一个线程池，线程池中有空闲的线程，会从线程池中拿取线程来进行处理，如果线程池中没有空闲的线程，新来的请求将会进入队列排队，直到线程池中空闲线程。</p></li>
<li><p><code>事件驱动</code>就是当进来一个新的请求的时，请求将会被压入队列中，然后通过一个循环来检测队列中的事件状态变化，如果检测到有状态变化的事件，那么就执行该事件对应的处理代码，一般都是回调函数。</p></li>
</ul>
<p>对于<code>事件驱动</code>编程来说，如果某个时间的回调函数是<code>计算密集型</code>，或者是<code>阻塞I/O</code>,那么这个回调函数将会阻塞后面所有事件回调函数的执行。这一点尤为重要。</p>
<h2 id="articleHeader12">nodejs的事件驱动和异步I/O</h2>
<h3 id="articleHeader13">事件驱动模型</h3>
<p>上面介绍了那么多的概念，现在我们来看看<code>nodejs</code>中的<code>事件驱动</code>和<code>异步I/O</code>是如何实现的.</p>
<p><code>nodejs</code>是<strong>单线程(single thread)</strong>运行的，通过一个<strong>事件循环(event-loop)</strong>来循环取出<strong>消息队列(event-queue)</strong>中的消息进行处理,处理过程基本上就是去调用该<strong>消息</strong>对应的回调函数。<strong>消息队列</strong>就是当一个事件状态发生变化时，就将一个消息压入队列中。</p>
<p><code>nodejs</code>的时间驱动模型一般要注意下面几个点：</p>
<ul>
<li><p>因为是<strong>单线程</strong>的，所以当顺序执行<code>js</code>文件中的代码的时候，<strong>事件循环</strong>是被暂停的。</p></li>
<li><p>当<code>js</code>文件执行完以后，<strong>事件循环</strong>开始运行，并从<strong>消息队列</strong>中取出消息，开始执行回调函数</p></li>
<li><p>因为是<strong>单线程</strong>的，所以当回调函数被执行的时候，<strong>事件循环</strong>是被暂停的</p></li>
<li><p>当涉及到I/O操作的时候，<code>nodejs</code>会开一个独立的线程来进行<code>异步I/O</code>操作，操作结束以后将消息压入<strong>消息队列</strong>。</p></li>
</ul>
<p>下面我们从一个简单的<code>js</code>文件入手，来看看    <code>nodejs</code>是如何执行的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);
var debug = require('debug')('example1');

debug(&quot;begin&quot;);

fs.readFile('package.json','utf-8',function(err,data){
    if(err)  
        debug(err);
    else
        debug(&quot;get file content&quot;);
});

setTimeout(function(){
    debug(&quot;timeout2&quot;);
});

debug('end'); // 运行到这里之前，事件循环是暂停的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'example1'</span>);

debug(<span class="hljs-string">"begin"</span>);

fs.readFile(<span class="hljs-string">'package.json'</span>,<span class="hljs-string">'utf-8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>)</span>{
    <span class="hljs-keyword">if</span>(err)  
        debug(err);
    <span class="hljs-keyword">else</span>
        debug(<span class="hljs-string">"get file content"</span>);
});

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    debug(<span class="hljs-string">"timeout2"</span>);
});

debug(<span class="hljs-string">'end'</span>); <span class="hljs-comment">// 运行到这里之前，事件循环是暂停的</span></code></pre>
<ol>
<li><p>同步执行<code>debug("begin")</code></p></li>
<li><p>异步调用<code>fs.readFile()</code>，此时会开一个新的线程去进行<code>异步I/O</code>操作</p></li>
<li><p>异步调用<code>setTimeout()</code>，马上将超时信息压入到<strong>消息队列</strong>中</p></li>
<li><p>同步调用<code>debug("end")</code></p></li>
<li><p>开启<strong>事件循环</strong>，弹出<strong>消息队列</strong>中的信息(目前是超时信息)</p></li>
<li><p>然后执行信息对应的回调函数(<strong>事件循环</strong>又被暂停)</p></li>
<li><p><strong>回调函数</strong>执行结束后，开始<strong>事件循环</strong>(目前<strong>消息队列</strong>中没有任何东西，文件还没读完)</p></li>
<li><p><code>异步I/O</code>读取文件完毕，将消息压入<strong>消息队列(</strong>消息中含有文件内容或者是出错信息)</p></li>
<li><p><strong>事件循环</strong>取得消息，执行回调</p></li>
<li><p>程序退出。</p></li>
</ol>
<p>这里借一张图来说明<code>nodejs</code>的事件驱动模型（图来自<a href="http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/" rel="nofollow noreferrer" target="_blank">这里</a>）<br><span class="img-wrap"><img data-src="/img/remote/1460000006792647" src="https://static.alili.tech/img/remote/1460000006792647" alt="![这里写图片描述\" title="![这里写图片描述\" style="cursor: pointer;"></span>][2]</p>
<p>这里最后要说的一点就是如何手动将一个函数推入队列,<code>nodejs</code>为我们提供了几个比较方便的方法:</p>
<ul>
<li><p>setTimeout()</p></li>
<li><p>process.nextTick()</p></li>
<li><p>setImmediate()</p></li>
</ul>
<h3 id="articleHeader14">异步I/O</h3>
<p><code>nodejs</code>中的<code>异步I/O</code>的操作是通过<code>libuv</code>这个库来实现的，包含了<code>window</code>和<code>linux</code>下面的<code>异步I/O</code>实现，博主也没有研究过这个库，感兴趣的读者可以移步到<a href="https://github.com/libuv/libuv" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h3 id="articleHeader15">问题答案</h3>
<p>好，到目前为止，已经可以回答上面的问题了</p>
<hr>
<p><strong>question 1</strong></p>
<blockquote><p>为何<code>timeout1</code>和<code>timeout2</code>的结果会在end后面？</p></blockquote>
<p><strong>answer 1</strong></p>
<blockquote><p>因为此时<code>timeout1</code>和<code>timeout2</code>只是被异步函数推入到了队列中，<strong>事件循环</strong>还是暂停状态</p></blockquote>
<hr>
<p><strong>question 2</strong></p>
<blockquote><p>为何<code>timeout1</code>和<code>timeout2</code>没有输出到终端？<code>while(true)</code>到底阻塞了什么？</p></blockquote>
<p><strong>answer 2</strong></p>
<blockquote><p>因为此处直接阻塞了<strong>事件循环</strong>，还没开始，就已经被阻塞了</p></blockquote>
<hr>
<p><strong>question 3,4</strong></p>
<blockquote><ol>
<li><p>为什么<code>timeout1</code>中回调函数会阻塞<code>timeout2</code>中的回调函数的执行？</p></li>
<li><p>为何<code>timeout1</code>的计算密集型工作将会阻塞<code>timeout2</code>的回调函数的执行？</p></li>
</ol></blockquote>
<p><strong>answer 3,4</strong></p>
<blockquote><p>因为该回调函数执行返回<strong>事件循环</strong>才会继续执行，回调函数将会阻塞事件循环的运行</p></blockquote>
<hr>
<p><strong>question 5</strong></p>
<blockquote><p>为何读取文件的IO操作不会阻塞<code>timeout2</code>的执行？</p></blockquote>
<p><strong>answer 5</strong></p>
<blockquote><p>因为<code>IO</code>操作是异步的，会开启一个新的线程，不会阻塞到<strong>事件循环</strong></p></blockquote>
<hr>
<p>参考文献：</p>
<ul>
<li><p><a href="http://stackoverflow.com/questions/19822668/what-exactly-is-a-node-js-event-loop-tick" rel="nofollow noreferrer" target="_blank">What exactly is a Node.js event loop tick?</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/15599966/what-is-the-difference-between-a-thread-based-server-and-an-event-based-server/15600044#15600044" rel="nofollow noreferrer" target="_blank">What is the difference between a thread-based server and an event-based server?</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/37316728/some-confusion-about-nodejs-threads/37316928#37316928" rel="nofollow noreferrer" target="_blank">Some confusion about nodejs threads</a></p></li>
<li><p><a href="http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/" rel="nofollow noreferrer" target="_blank">The JavaScript Event Loop: Explained</a></p></li>
<li><p><a href="https://daniel.haxx.se/docs/poll-vs-select.html" rel="nofollow noreferrer" target="_blank">poll vs select vs event-based</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003063859?utm_source=Weibo&amp;utm_medium=shareLink&amp;utm_campaign=socialShare#articleHeader0">Linux IO模式及 select、poll、epoll详解</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodejs 异步I/O和事件驱动

## 原文链接
[https://segmentfault.com/a/1190000005173218](https://segmentfault.com/a/1190000005173218)


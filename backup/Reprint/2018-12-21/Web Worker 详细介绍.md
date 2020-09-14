---
title: 'Web Worker 详细介绍' 
date: 2018-12-21 2:30:11
hidden: true
slug: mf22y6zyunk
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">原文链接</h3>
<p><a href="http://xiangzongliang.com/blogContent?b=82" rel="nofollow noreferrer" target="_blank">Web Worker 详细介绍 - 原文链接</a></p>
<p>[TOC]</p>
<h4>1、简介</h4>
<p>我们都知道<code>JavaScript</code>这个语言在执行的时候是采用单线程进行执行的，也就是说在同一时间只能做一件事，这也和这门语言有很大的关系，采用同步执行的方式进行运行，如果出现阻塞，那么后面的代码将不会执行，HTML5则提出了web Worker标准，表示<code>JavaScript</code>允许有多个线程，但是子线程完全受主线程的控制，切子线程不能操作DOM，只有主线程可以操作DOM，所以以主线程为主的单线程执行原理成了<code>JavaScript</code>这门语言的核心。关于<code>JavaScript</code>的运行机制可以参考阮一峰的文章<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop</a></p>
<h4>2、Web Worker</h4>
<p>下面我们来说说<code>web worker</code>到底是什么，简单明了的一句话其实就是在<code>Javascript</code>单线程执行的基础上，开启一个子线程，进行程序处理，而不影响主线程的执行，当子线程执行完毕之后再回到主线程上，在这个过程中并不影响主线程的执行过程。<br>举个例子：<br>传统情况下，执行下面的代码后，整个页面都会被冻结，由于<code>javascript</code>是单线程处理，如下代码已经完全组塞了后续的执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while(true){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){}</code></pre>
<p>如果换一种方式，我们通过开启一个新的线程来执行这段代码，将他放在一个单独的<code>worker.js</code>文件中,在主线程执行以下代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var worker = new Worker(&quot;worker.js&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-type">Worker</span>(<span class="hljs-string">"worker.js"</span>)</code></pre>
<h5>创建线程</h5>
<p>在创建线程的时候需要给实例化的<code>Worker</code>传入唯一一个参数，指向一个<code>javascript</code>文件资源的url或者Blob对象（Blob对象就是一个包含有只读原始数据类文件对象），调用这个构造函数之后，一个线程就被创建了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var worker = new Worker(&quot;worker.js&quot;);
var worker = new Worker(blob);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-type">Worker</span>(<span class="hljs-string">"worker.js"</span>);
<span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-type">Worker</span>(blob);</code></pre>
<h5>线程通信</h5>
<p><code>Web Worker</code>的基本原理就是在当前的主线程中加载一个只读文件来创建一个新的线程，两个线程同时存在，且互不阻塞，并且在子线程与主线程之间提供了数据交换的接口<code>postMessage</code>和<code>onmessage</code>。来进行发送数据和接收数据。其数据格式可以为结构化数据（<code>JSON</code>等）；<br>当我们创建了一个worker实例之后，我们可以通过如下两种方式来发送数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var worker = new Worker(&quot;worker.js&quot;);  //实例化对象

//第一种传递方式
worker.postMessage(message,taransferList);

//第二种传递方式
worker.postMessage({ 
     operation: &quot;list_all_users&quot;, 
     //ArrayBuffer object 
     input: buffer, 
     threshold: 0.8, 
}, [buffer]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>var worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">"worker.js"</span>);  <span class="hljs-comment">//实例化对象</span>

<span class="hljs-comment">//第一种传递方式</span>
worker.postMessage(message,taransferList);

<span class="hljs-comment">//第二种传递方式</span>
worker.postMessage({ 
     operation: <span class="hljs-string">"list_all_users"</span>, 
     <span class="hljs-comment">//ArrayBuffer object </span>
     input: <span class="hljs-built_in">buffer</span>, 
     threshold: <span class="hljs-number">0.8</span>, 
}, [<span class="hljs-built_in">buffer</span>]);</code></pre>
<blockquote>如果要想一个专用线程发送数据，那么我们需要使用线程中的 postMessage 方法。专用线程不仅仅支持传输二进制数据，也支持结构化的 JavaScript 数据格式。在这里有一点需要注意，为了高效地传输 ArrayBuffer 对象数据，需要在 postMessage 方法中的第二个参数中指定它。</blockquote>
<p>同时我们如果需要接收某个线程传来的数据可以使用<code>onmessage</code>来进行接收，方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//方法一
worker.onmessage = function(event){
    var data = event.data;        //通过event.data来获取传入的参数
}

//方法二
worker.addEventListener(&quot;message&quot;,target);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//方法一</span>
worker.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
    <span class="hljs-keyword">var</span> data = event.data;        <span class="hljs-comment">//通过event.data来获取传入的参数</span>
}

<span class="hljs-comment">//方法二</span>
worker.addEventListener(<span class="hljs-string">"message"</span>,target);</code></pre>
<p>下面是一段运行在chrome中的参数传递方式：</p>
<p><strong> index.html </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>webWorker</title>
</head>
<body>
    <script>
        var worker = new Worker(&quot;worker.js&quot;);
        worker.postMessage(&quot;123456&quot;);

        worker.onmessage = function (e) {
            console.log(e.data)
        };
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webWorker<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">"worker.js"</span>);
        worker.postMessage(<span class="hljs-string">"123456"</span>);

        worker.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-built_in">console</span>.log(e.data)
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong> worker.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onmessage = function (e) {
    console.log(e.data);
    postMessage(&quot;2222&quot;)
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e.data);
    postMessage(<span class="hljs-string">"2222"</span>)
};</code></pre>
<p>此时我们的浏览器打印出的log是如下：<br><span class="img-wrap"><img data-src="http://7xqb1s.com1.z0.glb.clouddn.com/FvL2XzRalJeJHWqhuHWuR1iDC53h" src="https://static.alili.techhttp://7xqb1s.com1.z0.glb.clouddn.com/FvL2XzRalJeJHWqhuHWuR1iDC53h" alt="" title="" style="cursor: pointer;"></span></p>
<h4>3、Worker基本使用</h4>
<p>上面我们已经说了创建一个新的线程、传递数据、接收数据的方法，下面再次做一个精简的回顾。</p>
<h5>创建新的Worker</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var worker = new Worker(&quot;worker.js&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-type">Worker</span>(<span class="hljs-string">"worker.js"</span>)</code></pre>
<h5>传递参数</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.postMessage(&quot;text&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">worker.postMessage(<span class="hljs-string">"text"</span>)<span class="hljs-comment">;</span></code></pre>
<h5>接收消息</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.onmessage = function (e) {
        var message = e.data;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>worker.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> </span>{
        <span class="hljs-keyword">var</span> message = e.data;
};</code></pre>
<h5>异常处理</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.onerror = function(e){
    console.log(&quot;error at &quot;+e.filename &quot;:&quot; + e.lineno + e.message)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>worker<span class="hljs-selector-class">.onerror</span> = function(e){
    console.log(<span class="hljs-string">"error at "</span>+e<span class="hljs-selector-class">.filename</span> <span class="hljs-string">":"</span> + e<span class="hljs-selector-class">.lineno</span> + e.message)
}</code></pre>
<h5>结束worker</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.terminate();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">worker.terminate()<span class="hljs-comment">;</span></code></pre>
<h5>载入工具类函数</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="importScripts(&quot;./utils/base64.js&quot;,&quot;./utils/map.js&quot;...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">importScripts</span><span class="hljs-params">(<span class="hljs-string">"./utils/base64.js"</span>,<span class="hljs-string">"./utils/map.js"</span>...)</span></span></code></pre>
<blockquote>需要注意的是<code>importScripts</code>是同步方法，一旦<code>importScripts</code>方法返回就可以开始使用载入的脚本，而不需要回调函数。</blockquote>
<h4>4、Worker作用域</h4>
<p>当我们创建一个新的worker时，改代码会运行在一个全新的javascript的环境中（WorkerGlobalScope）运行,是完全和创建worker的脚本隔离，这时我们可以吧创建新worker的脚本叫做主线程，而被创建的新的worker叫做子线程。</p>
<p>WorkerGlobalScope是worker的全局对象，所以它包含所有核心javascript全局对象拥有的属性如JSON等，window的一些属性，也拥有类似于XMLHttpRequest()等。</p>
<p>但是我们所开启的新的worker也就是子线程，并不支持操作页面的DOM。</p>
<h4>5、共享线程 SharedWorker</h4>
<p>共享线程是为了避免线程的重复创建和销毁过程，降低了系统性能的消耗，共享线程<code>SharedWorker</code>可以同时有多个页面的线程链接。</p>
<p>使用<code>SharedWorker</code>创建共享线程，也需要提供一个javascript脚本文件的URL地址或Blob,该脚本文件中包含了我们在线程中需要执行的代码，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var worker = new SharedWorker(&quot;sharedworker.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-type">SharedWorker</span>(<span class="hljs-string">"sharedworker.js"</span>);</code></pre>
<p>共享线程也使用了<code>message</code>事件监听线程消息，但使用SharedWorker对象的port属性与线程通信如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.port.onmessage = function(e){
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>worker.port.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    ...
}</code></pre>
<p>同时我们也可以使用SharedWorker对象的port属性向共享线程发送消息如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.port.postMessage(&quot;message&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">worker.port.postMessage(<span class="hljs-string">"message"</span>)<span class="hljs-comment">;</span></code></pre>
<h4>摘录</h4>
<blockquote>文章大部分类容摘自《指尖上行》一书</blockquote>
<p><strong> 参考文献 </strong><br>1、<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop  ——  阮一峰</a><br>2、<a href="https://www.ibm.com/developerworks/cn/web/1112_sunch_webworker/" rel="nofollow noreferrer" target="_blank">深入 HTML5 Web Worker 应用实践：多线程编程</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web Worker 详细介绍

## 原文链接
[https://segmentfault.com/a/1190000012528806](https://segmentfault.com/a/1190000012528806)


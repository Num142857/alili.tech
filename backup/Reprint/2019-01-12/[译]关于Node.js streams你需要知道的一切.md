---
title: '[译]关于Node.js streams你需要知道的一切' 
date: 2019-01-12 2:30:24
hidden: true
slug: k10d0an1g0d
categories: [reprint]
---

{{< raw >}}

                    
<p>Node.js的stream模块是有名的应用困难，更别说理解了。那现在可以告诉你，这些都不是问题了。</p>
<p>多年来，开发人员在那里创建了大量的软件包，其唯一目的就是使用stream使用起来更简单，但是在这篇文章里，我们专注于介绍原生的Node.js Steam Api。</p>
<p>"Stream 是Node.js中最好的却最容易被误解的部分" ----- Dominic Tarr</p>
<h1 id="articleHeader0">Streams到底是什么</h1>
<p>Streams是数据的集合，就跟数组和字符串一样。不同点就在于Streams可能不是立刻就全部可用，并且不会全部载入内存。这使得他非常适合处理大量数据，或者处理每隔一段时间有一个数据片段传入的情况。</p>
<p>但是，Stream并不仅仅适用于处理大数据(大块的数据。。。)。使用它，同样也有利于组织我们大代码。就像我们使用管道去和合并强大的Linux命令。在Node.js中，我们也可以做同样的事情。</p>
<p><span class="img-wrap"><img data-src="/img/bVO90e?w=800&amp;h=102" src="https://static.alili.tech/img/bVO90e?w=800&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const grep = ... // A stream for the grep output
const wc = ... // A stream for the wc input
grep.pipe(wc)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> grep = ... <span class="hljs-comment">// A stream for the grep output</span>
<span class="hljs-keyword">const</span> wc = ... <span class="hljs-comment">// A stream for the wc input</span>
grep.pipe(wc)</code></pre>
<p>Node.js的很多内置模块都实现了Stream接口</p>
<p><span class="img-wrap"><img data-src="/img/bVO90l?w=800&amp;h=473" src="https://static.alili.tech/img/bVO90l?w=800&amp;h=473" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上面例子里面的Node.js对象列表包括了可读流和可写流，有一些对象既是可读流也是可写流，像TCP sockets, zlib 和 crypto streams。</p>
<p>注意这些对象是有很密切的关联的。当一个客户端的HTTP 响应对象是一个可读流，那么在服务器端这就是一个可写流。因为在HTTP例子中，我们通常是从一个对象(<code>http.IncomingMessage</code>)读取再写入到另外一个对象(<code>http.ServerResponse</code>)中去。</p>
<p>还要注意，当涉及到子进程时，<code>stdio</code>流（<code>stdin</code>，<code>stdout</code>，<code>stderr</code>）具有逆流类型。这就允许我们非常方便的使用管道从主进程连接子进程的<code>Streams</code>。</p>
<h1 id="articleHeader1">一些实例的Streams例子</h1>
<p>理论都是很好的，但事实到底是怎么样子的呢？让我们看一些例子示范代码<code>Streams</code>在内存使用方面的比较。</p>
<p>我们先创建一个大文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const file = fs.createWriteStream('./big.file');

for(let i=0; i<= 1e6; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}

file.end();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> fs = require('fs');
<span class="hljs-keyword">const</span> <span class="hljs-keyword">file</span> = fs.createWriteStream('./big.<span class="hljs-keyword">file</span>');

<span class="hljs-keyword">for</span>(let i=0; i&lt;= 1e6; i++) {
  <span class="hljs-keyword">file</span>.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed <span class="hljs-keyword">do</span> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip <span class="hljs-keyword">ex</span> ea commodo consequat. Duis aute irure dolor <span class="hljs-keyword">in</span> reprehenderit <span class="hljs-keyword">in</span> voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt <span class="hljs-keyword">in</span> culpa <span class="hljs-keyword">qui</span> officia deserunt mollit anim id <span class="hljs-keyword">est</span> laborum.\<span class="hljs-keyword">n</span>');
}

<span class="hljs-keyword">file</span>.end();</code></pre>
<p>看看我使用什么创建文件的？一个可写流嘛</p>
<p><code>fs</code>模块可以通过<code>Stream</code>接口来读取和写入文件。在上面的例子中，我们在循环中通过可写流向<code>big.file</code>写入了1百万行数据。</p>
<p>运行上面的代码会生成一个大概400M的文件</p>
<p>这是一个简单的Node web服务器，专门为<code>big.file</code>提供服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;
  
    res.end(data);
  });
});

server.listen(8000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
const server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer();

server.<span class="hljs-literal">on</span>(<span class="hljs-string">'request'</span>, <span class="hljs-function"><span class="hljs-params">(req, res)</span> =&gt;</span> {
  fs.readFile(<span class="hljs-string">'./big.file'</span>, <span class="hljs-function"><span class="hljs-params">(err, data)</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  
    res.end(data);
  });
});

server.listen(<span class="hljs-number">8000</span>);</code></pre>
<p>当<code>server</code>收到请求，它会使用异步方法<code>fs.readFile</code>处理这个<code>big file</code>。但是这并不代表我们会打断事件循环机制。一切都是正确的吗？？</p>
<p>那现在当我们启动<code>server</code>，看看内存监视器都发生了什么。</p>
<p><span class="img-wrap"><img data-src="/img/bVO925?w=800&amp;h=422" src="https://static.alili.tech/img/bVO925?w=800&amp;h=422" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在访问这个服务器，看看内存的使用情况。</p>
<p><span class="img-wrap"><img data-src="/img/bVPfUo?w=800&amp;h=614" src="https://static.alili.tech/img/bVPfUo?w=800&amp;h=614" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>内存占用立刻飙升到434.8 MB。</p>
<p>在我们把文件内容输出到客户端之前，我们就把整个文件读入了内存。这是很低效的。</p>
<p>HTTP response对象(上文中的<code>res</code>对象)也是一个可写流，这就意味着如果我们有一个代表着<code>big file</code>的可读流，我们可以通过管道把他们俩连接起来实现同样的功能，而不需要使用400M内存。</p>
<p>Node的<code>fs</code>模块给我们提供了一个可以操作任何文件的可读流,通过<code>createReadStream</code>方法创建。我们可以把它和response对象连接起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer();

server.on(<span class="hljs-string">'request'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> src = fs.createReadStream(<span class="hljs-string">'./big.file'</span>);
  src.pipe(res);
});

server.listen(<span class="hljs-number">8000</span>);</code></pre>
<p>现在再去访问server的时候，令人惊讶的事情发生了(看内存监视器)</p>
<p><span class="img-wrap"><img data-src="/img/bVPaMa?w=800&amp;h=615" src="https://static.alili.tech/img/bVPaMa?w=800&amp;h=615" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>发生了什么？</p>
<p>当我们访问服务器的时候，我们通过流每次使用一段数据，这意味着我们不是把全部的数据都加载到内存中。内存使用量只上升了不到25M。</p>
<p>可以把上面的例子用到极致，生成5百万行数据而不是1百万行。这样子的话，这个文件的大小会超过2GB，这实际上大于Node中的默认缓冲区限制。</p>
<p>如果你想在server上使用<code>fs.readFile</code>,这在默认情况下是行不通的，除非你改了Node.js的默认缓冲区限制。但是使用<code>fs.createReadStream</code>，把2 GB的数据返回给客户端根本不存在问题，甚至内存使用量都没有任何变化。</p>
<p>准备好学习Steam了吗？</p>
<h1 id="articleHeader2">Streams 101</h1>
<p>在Node.js中有4中基本的流类型：Readable, Writable, Duplex, and Transform streams。</p>
<ul>
<li><p>Readable 可读流是可以从中消耗数据的源的抽象，一个例子就是<code>fs.createReadStream</code>方法</p></li>
<li><p>Writable 可写流是可以写入数据的目标的抽象，一个例子就是<code>fs.createWriteStream</code>方法</p></li>
<li><p>duplex Steam是一个同时具有读写功能的流，一个例子就是TCP socket</p></li>
<li><p>Transform 是一个双工流，它可以在交换数据的时候做转换。一个例子就是<code>zlib.createGzip</code>使用gzip压缩数据。你可以把Transform streams当成是一个传入可读流，返回一个可写流的函数。它还有一个别名<code>through streams</code></p></li>
</ul>
<p>所有的Stream都是<code>EventEmitter</code>的实例对象。当流读和写的时候都会触发相应的事件。但是还有一个更简单的使用方法，那就是使用<code>pipe</code>。</p>
<h2 id="articleHeader3">The pipe method</h2>
<p>要记住下面这个魔幻方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="readableSrc.pipe(writableDest)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">readableSrc</span><span class="hljs-selector-class">.pipe</span>(<span class="hljs-selector-tag">writableDest</span>)</code></pre>
<p>在这一行里面，我们通过管道把可读流(源)输出到一个可写流里面去(目标)，源必须是一个可写流，目标必须是可写流。当然，他们也都可以是duplex/Transform。事实上，当我们使用管道连接流的时候，我们可以像在linux中一样使用链式连接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="readableSrc
  .pipe(transformStream1)
  .pipe(transformStream2)
  .pipe(finalWrtitableDest)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">readableSrc</span>
  <span class="hljs-selector-class">.pipe</span>(<span class="hljs-selector-tag">transformStream1</span>)
  <span class="hljs-selector-class">.pipe</span>(<span class="hljs-selector-tag">transformStream2</span>)
  <span class="hljs-selector-class">.pipe</span>(<span class="hljs-selector-tag">finalWrtitableDest</span>)</code></pre>
<p><code>pipe</code>方法返回目标流，这保证了我们可以使用链式调用。对于streams a(可读流)，b,c(可读可写流)，d可写流，我们可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.pipe(b).pipe(c).pipe(d)
# Which is equivalent to:
a.pipe(b)
b.pipe(c)
c.pipe(d)
# Which, in Linux, is equivalent to:
$ a | b | c | d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>a.pipe(b).pipe(<span class="hljs-built_in">c</span>).pipe(d)
# <span class="hljs-type">Which</span> <span class="hljs-keyword">is</span> equivalent to:
a.pipe(b)
b.pipe(<span class="hljs-built_in">c</span>)
<span class="hljs-built_in">c</span>.pipe(d)
# <span class="hljs-type">Which</span>, <span class="hljs-keyword">in</span> <span class="hljs-type">Linux</span>, <span class="hljs-keyword">is</span> equivalent to:
$ a | b | <span class="hljs-built_in">c</span> | d</code></pre>
<p><code>pipe</code>方法是使用流最简便的方法。通常通过管道和事件的方法使用流，但是要尽量避免两者混用。通常当你使用<code>pipe</code>方法就不需要使用事件了。但是当你需要更多定制的操作的话，使用事件的方式会更好。</p>
<h2 id="articleHeader4">Stream events</h2>
<p>除了从可读流读取数据传输到可写流，<code>pipe</code>方法还自动处理一些其他事情。比如处理错误，处理文件结束操作，流之间速度快慢问题。</p>
<p>同时，流也可以直接使用事件操作。以下是和管道相等的通过事件操作流的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# readable.pipe(writable)

readable.on('data', (chunk) => {
  writable.write(chunk);
});

readable.on('end', () => {
  writable.end();
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># readable.pipe(writable)</span>

readable.<span class="hljs-literal">on</span>(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-params">(chunk)</span> =&gt;</span> {
  writable.write(chunk);
});

readable.<span class="hljs-literal">on</span>(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  writable.end();
});
</code></pre>
<p>下面是一些重要流的事件和方法。</p>
<p><span class="img-wrap"><img data-src="/img/bVPdu7?w=800&amp;h=459" src="https://static.alili.tech/img/bVPdu7?w=800&amp;h=459" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这些事件和方法在某种程度上是相关的，因为它们通常被一起使用。</p>
<p>可读流上的最重要的事件是</p>
<ul>
<li><p><code>data</code>事件，当可读流传输了一段数据的时候会触发</p></li>
<li><p><code>end</code>事件，当没有数据被传输时触发</p></li>
</ul>
<p>可写流上的最重要的事件是</p>
<ul>
<li><p><code>drain</code>事件，当可写流可以接收事件的时候被触发</p></li>
<li><p><code>finish</code>事件，当所有数据被接收时被触发</p></li>
</ul>
<p>事件和方法可以结合起来，以便定制和优化流的使用。读取可读流，我们可以使用<code>pipe/unpipe</code>方法，或者<code>read/unshift/resume</code>方法。使用可写流，我们可以可写流作为<code>pipe/unpipe</code>方法的参数，或者使用<code>write</code>方法写入，使用<code>end</code>方法关闭。</p>
<h2 id="articleHeader5">可读流的暂停和流动</h2>
<p>可读流有两个很重要的模式影响了我们使用的方式。</p>
<ul>
<li><p>暂停模式</p></li>
<li><p>流动模式</p></li>
</ul>
<p>这些模式有时候被称为拉和推模式</p>
<p>所有的可读流开始的时候都是默认暂停模式，但是它们可以轻易的被切换成流动模式，当我们需要的时候又可以切换成暂停模式。有时候这个切换是自动的。</p>
<p>当一个可读流是暂停模式的时候，我们可以使用<code>read</code>方法从流中读取。但是当一个流是流动模式的时候，数据是持续的流动，我们需要使用事件去监听数据的变化。</p>
<p>在流动模式中，如果可读流没有监听者，可读流的数据会丢失。这就是为什么当可读流逝流动模式的时候，我们必须使用<code>data</code>事件去监听数据的变化。事实上，只需添加一个数据事件处理程序即可将暂停的流转换为流模式，删除数据事件处理程序将流切换回暂停模式。 其中一些是为了与旧的Node Stream接口进行向后兼容。</p>
<p>可以使用<code>resume()</code>和<code>pause()</code>方法在这两种模式之间切换。</p>
<p><span class="img-wrap"><img data-src="/img/bVPea7?w=800&amp;h=445" src="https://static.alili.tech/img/bVPea7?w=800&amp;h=445" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当我们使用<code>pipe</code>方法操作可读流的时候是不需要担心上面的这些操作的，因为<code>pipe</code>方法会自动帮我们处理这些问题。</p>
<h1 id="articleHeader6">流的创建</h1>
<p>当我们讨论Node.js中的流时，有两项重要的任务：</p>
<ul>
<li><p>流的创建</p></li>
<li><p>流的使用</p></li>
</ul>
<p>我们到现在为止讨论的都是如何使用流，那下面来看看如何创建吧！</p>
<p>Streams的创建通常使用<code>stream</code>模块。</p>
<h2 id="articleHeader7">创建一个可写流</h2>
<p>为了创建一个可写流，我们需要使用<code>stream</code>模块里面的<code>Writable</code>类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Writable } = require('stream');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> { Writable } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'stream'</span>);</code></pre>
<p>我们可以有很多种方式实现一个可写流。例如，我们可以继承<code>Writable</code>类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class myWritableStream extends Writable {

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">myWritableStream</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Writable</span> </span>{

}</code></pre>
<p>但是我更喜欢使用构造函数的方式创建。通过给<code>Writable</code>传递一些参数来创建一个对象。唯一必须要传的选项时<code>write</code>方法，它需要暴漏需要写入的数据块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Writable } = require('stream');
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> { Writable } = require(<span class="hljs-string">'stream'</span>);
<span class="hljs-keyword">const</span> outStream = <span class="hljs-keyword">new</span> Writable({
  <span class="hljs-built_in">write</span>(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

<span class="hljs-built_in">process</span>.stdin.pipe(outStream);</code></pre>
<p><code>write</code>方法接收3个参数</p>
<ul>
<li><p><code>chunk</code>通常是一个buffer对象，我们可以通过配置修改</p></li>
<li><p><code>encoding</code>在这种情况下就需要了，不过通常情况是可以忽略的</p></li>
<li><p><code>callback</code>是当我们处理完这个数据块的时候需要调用的函数。这是一个写入是否成功的信号。如果失败了，给这个回调传递一个<code>Error</code>对象</p></li>
</ul>
<p>在<code>outStream</code>中，我们简单的把<code>chunk</code>打印出来，因为并没有发生错误，我们直接调用了<code>callback</code>方法。这是这是简单并不实用的<code>打印</code>流。它会打印接收到的所有值。</p>
<p>为了使用这个流，我们可以简单的<code>process.stdin</code>这个可读流。通过<code>pipe</code>方法连接起来。</p>
<p>当我们运行上面的例子，任何我们在控制台输入的内容都会被<code>console.log</code>打印出来。</p>
<p>这不是一个非常实用的流的实现，但是它已经被Node.js内置实现了。<code>outStream</code>功能和<code>process.stdout</code>基本类似。我们也可以通过<code>pipe</code>方法把<code>stdin</code>和<code>stdout</code>连接起来并实现同样的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.stdin.pipe(process.stdout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.stdin</span><span class="hljs-selector-class">.pipe</span>(<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.stdout</span>);</code></pre>
<h2 id="articleHeader8">创建一个可读流</h2>
<p>创建可读流，我们需要<code>Readable</code>类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Readable } = require('stream');
const inStream = new Readable({});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> { Readable } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'stream'</span>);
<span class="hljs-keyword">const</span> inStream = <span class="hljs-keyword">new</span> Readable({});</code></pre>
<p>创建一个可读流非常简单。可以使用<code>push</code>方法推入数据给其他流使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Readable } = require('stream'); 
const inStream = new Readable();
inStream.push('ABCDEFGHIJKLM');
inStream.push('NOPQRSTUVWXYZ');
inStream.push(null); // No more data
inStream.pipe(process.stdout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>const { Readable } = require(<span class="hljs-string">'stream'</span>); 
const inStream = <span class="hljs-keyword">new</span> Readable();
inStream.<span class="hljs-keyword">push</span>(<span class="hljs-string">'ABCDEFGHIJKLM'</span>);
inStream.<span class="hljs-keyword">push</span>(<span class="hljs-string">'NOPQRSTUVWXYZ'</span>);
inStream.<span class="hljs-keyword">push</span>(<span class="hljs-keyword">null</span>); <span class="hljs-comment">// No more data</span>
inStream.pipe(process.stdout);</code></pre>
<p>当我们<code>push</code>一个<code>null</code>对象进去的时候，这就标志着我们要终止传输了。</p>
<p>我们可以简单的把这个流通过<code>pipe</code>方法连接到一个可写流<code>process.stdout</code></p>
<p>运行上面的代码，会获取所有的<code>inStream</code>的数据并打印出来。非常简单但有效。</p>
<p>我们在通过<code>pipe</code>连接之前，就会把所有的数据推送到流里面。更好的方法是在消费者要求时按需推送数据。可以通过修改可读流配置里面的<code>read()</code>方法实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const inStream = new Readable({
  read(size) {
    // there is a demand on the data... Someone wants to read it.
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> inStream = <span class="hljs-keyword">new</span> Readable({
  <span class="hljs-built_in">read</span>(<span class="hljs-built_in">size</span>) {
    <span class="hljs-comment">// there is a demand on the data... Someone wants to read it.</span>
  }
});</code></pre>
<p>当读取方法在可读流上被调用时，该实现可以将部分数据推送到队列。 例如，我们可以一次推一个字母，从字符代码65（表示A）开始，并在每次推送时递增：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const inStream = new Readable({
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});
inStream.currentCharCode = 65;
inStream.pipe(process.stdout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> inStream = <span class="hljs-keyword">new</span> Readable({
  <span class="hljs-built_in">read</span>(<span class="hljs-built_in">size</span>) {
    <span class="hljs-keyword">this</span>.push(<span class="hljs-keyword">String</span>.fromCharCode(<span class="hljs-keyword">this</span>.currentCharCode++));
    <span class="hljs-built_in">if</span> (<span class="hljs-keyword">this</span>.currentCharCode &gt; <span class="hljs-number">90</span>) {
      <span class="hljs-keyword">this</span>.push(null);
    }
  }
});
inStream.currentCharCode = <span class="hljs-number">65</span>;
inStream.pipe(<span class="hljs-built_in">process</span>.stdout);</code></pre>
<p>当有流在读取可读流的数据的时候，<code>read</code>方法会持续执行，这样就会一直推出更多的字符。我们需要在某个时刻终止它，这就是为什么我们设置了一个终止条件推入了<code>null</code>。</p>
<p>我们应该始终按需推送数据。</p>
<h2 id="articleHeader9">Duplex/Transform 流的实现</h2>
<p>使用Duplex流，我们通过同一个对象实现可读流和可写流。这类似同时实现了两个接口。</p>
<p>下面这个例子就结合了上面两个可读流和可写流的综合例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Duplex } = require('stream');

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inoutStream.currentCharCode = 65;
process.stdin.pipe(inoutStream).pipe(process.stdout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> { Duplex } = require(<span class="hljs-string">'stream'</span>);

<span class="hljs-keyword">const</span> inoutStream = <span class="hljs-keyword">new</span> Duplex({
  <span class="hljs-built_in">write</span>(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  <span class="hljs-built_in">read</span>(<span class="hljs-built_in">size</span>) {
    <span class="hljs-keyword">this</span>.push(<span class="hljs-keyword">String</span>.fromCharCode(<span class="hljs-keyword">this</span>.currentCharCode++));
    <span class="hljs-built_in">if</span> (<span class="hljs-keyword">this</span>.currentCharCode &gt; <span class="hljs-number">90</span>) {
      <span class="hljs-keyword">this</span>.push(null);
    }
  }
});

inoutStream.currentCharCode = <span class="hljs-number">65</span>;
<span class="hljs-built_in">process</span>.stdin.pipe(inoutStream).pipe(<span class="hljs-built_in">process</span>.stdout);</code></pre>
<p>通过合并这些方法，我们可以使用这个<code>duplex</code>流读取从A-Z的字母也同样可以使用它的打印功能。我们把<code>stdin</code>流连接到这个<code>duplex</code>上去使用它的打印功能，再把这个<code>duplex</code>流本身连接到<code>stdout</code>上去就在控制台看到了A-Z。</p>
<p>双工流的可读写的两侧完全独立运行。就像一个对象上两种独立的功能。</p>
<p><code>transform</code>流是一种更有趣的<code>duplex</code>流。因为它的输出来源于她的输入。</p>
<p>对于一个<code>transform</code>流，我们不需要实现<code>read</code>和<code>write</code>方法，我们仅仅需要实现<code>transform</code>方法，这个方法合并了它们两个。它具有写入方法的功能，也可以用它推送数据。</p>
<p>这是一个简单的<code>transform</code>例子，把任何输入转换成大写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Transform } = require('stream');

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> { Transform } = require(<span class="hljs-string">'stream'</span>);

<span class="hljs-keyword">const</span> upperCaseTr = <span class="hljs-keyword">new</span> Transform({
  transform(chunk, encoding, callback) {
    <span class="hljs-keyword">this</span>.push(chunk.toString().toUpperCase());
    callback();
  }
});

<span class="hljs-built_in">process</span>.stdin.pipe(upperCaseTr).pipe(<span class="hljs-built_in">process</span>.stdout);</code></pre>
<p>在这个<code>transform</code>stream里面，像上个例子中双工流一样。但是我们只实现了<code>transform()</code>方法。我们把<code>chunk</code>转换成大写，再把大写字母作为可读流的输入。</p>
<h2 id="articleHeader10">Streams Object Mode</h2>
<p>默认，流会接收 Buffer/String 类型的数据。还有个字段 <code>objectMode</code> 设置，可以让stream 接收任意类型的对象。</p>
<p>下面是一个这种类型的例子。以下变换流的组合使得将逗号分隔值的字符串映射为JavaScript对象的功能。 所以“a，b，c，d”成为{a：b，c：d}。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Transform } = require('stream');

const commaSplitter = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim().split(','));
    callback();
  }
});

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const obj = {};
    for(let i=0; i < chunk.length; i+=2) {
      obj[chunk[i]] = chunk[i+1];
    }
    this.push(obj);
    callback();
  }
});

const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n');
    callback();
  }
});

process.stdin
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> { Transform } = require(<span class="hljs-string">'stream'</span>);

<span class="hljs-keyword">const</span> commaSplitter = <span class="hljs-keyword">new</span> Transform({
  readableObjectMode: <span class="hljs-keyword">true</span>,
  transform(chunk, encoding, callback) {
    <span class="hljs-keyword">this</span>.push(chunk.toString().trim().split(<span class="hljs-string">','</span>));
    callback();
  }
});

<span class="hljs-keyword">const</span> arrayToObject = <span class="hljs-keyword">new</span> Transform({
  readableObjectMode: <span class="hljs-keyword">true</span>,
  writableObjectMode: <span class="hljs-keyword">true</span>,
  transform(chunk, encoding, callback) {
    <span class="hljs-keyword">const</span> obj = {};
    <span class="hljs-keyword">for</span>(let i=<span class="hljs-number">0</span>; i &lt; chunk.length; i+=<span class="hljs-number">2</span>) {
      obj[chunk[i]] = chunk[i+<span class="hljs-number">1</span>];
    }
    <span class="hljs-keyword">this</span>.push(obj);
    callback();
  }
});

<span class="hljs-keyword">const</span> objectToString = <span class="hljs-keyword">new</span> Transform({
  writableObjectMode: <span class="hljs-keyword">true</span>,
  transform(chunk, encoding, callback) {
    <span class="hljs-keyword">this</span>.push(JSON.stringify(chunk) + <span class="hljs-string">'\n'</span>);
    callback();
  }
});

process.stdin
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout)</code></pre>
<p>我们通过commasplitter传递输入字符串（例如，<code>“a，b，c，d”</code>），它将数组作为其可读数据（<code>[“a”，“b”，“c”，“d”]</code>））。 在该流上添加可读的<code>ObjectMode</code>标志是必要的，因为我们正在将对象推送到其上，而不是字符串。</p>
<p>然后我们把数组导入到<code>arrayToObject</code>数据流中，我们需要把<code>writableObjectMode</code>设置为 <code>true</code>，以表示<code>arrayToObject</code>会接收一个对象。另外它还会推送一个对象出去，所以还要把他的<code>readableObjectMode</code>为<code>true</code>。最后一个<code>objectToString</code>接收一个对象但是输出字符串，所以就只需要设置一个<code>writableObjectMode</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVPfDe?w=482&amp;h=210" src="https://static.alili.tech/img/bVPfDe?w=482&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">Node.js内置transform streams对象</h2>
<p>Node有一些非常有用的内置transform streams对象。这包括<code>zlib</code>和<code>crypto</code>。</p>
<p>下面这个例子使用了<code>zlib.createGzip()</code>结合了额<code>fs</code> readable/writable streams实现了文件压缩。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + '.gz'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> fs = require(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> zlib = require(<span class="hljs-string">'zlib'</span>);
<span class="hljs-keyword">const</span> <span class="hljs-keyword">file</span> = process.argv[<span class="hljs-number">2</span>];

fs.createReadStream(<span class="hljs-keyword">file</span>)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(<span class="hljs-keyword">file</span> + <span class="hljs-string">'.gz'</span>));</code></pre>
<p>你可以使用上面的脚本压缩任何你传入的参数文件。我们把文件的可读流传入了<code>zlib</code>的内置转换流。再写入到新的.gz文件中。</p>
<p>使用管道还有一个很酷的事情，就是可以和事件结合起来。比如我想用户看到进度，并在结束的时候发个消息。因为<code>pipe</code>方法会返回目标流，我们也可以通过链式注册事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .on('data', () => process.stdout.write('.'))
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
const zlib = <span class="hljs-built_in">require</span>(<span class="hljs-string">'zlib'</span>);
const file = process.argv[<span class="hljs-number">2</span>];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .<span class="hljs-literal">on</span>(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> process.stdout.write(<span class="hljs-string">'.'</span>))
  .pipe(fs.createWriteStream(file + <span class="hljs-string">'.zz'</span>))
  .<span class="hljs-literal">on</span>(<span class="hljs-string">'finish'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Done'</span>));</code></pre>
<p>所以使用管道方法，我们可以轻松地操作流，但是我们还可以使用需要的事件进一步定制与这些流的交互。</p>
<p>管道方法的好处是，我们可以用它来以一种可读的方式逐一构成我们的程序。 例如，我们可以简单地创建一个变换流来报告进度，而不用监听上面的数据事件，并用另一个<code>.pipe()</code>调用替换 <code>.on()</code> 调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

const { Transform } = require('stream');

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> zlib = <span class="hljs-built_in">require</span>(<span class="hljs-string">'zlib'</span>);
<span class="hljs-keyword">const</span> file = process.argv[<span class="hljs-number">2</span>];

<span class="hljs-keyword">const</span> { Transform } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'stream'</span>);

<span class="hljs-keyword">const</span> reportProgress = <span class="hljs-keyword">new</span> Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(<span class="hljs-string">'.'</span>);
    callback(<span class="hljs-literal">null</span>, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + <span class="hljs-string">'.zz'</span>))
  .on(<span class="hljs-string">'finish'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Done'</span>));</code></pre>
<p><code>reportProgress</code>流是一个简单的<code>pass-through</code>流，但是也跟标准事件一样报告进度。注意<code>callback()</code>函数的第二个参数，这相当于把数据推送出去。</p>
<p>结合流的应用是无止境的。例如，如果我们需要在我们gzip之前或之后加密文件，我们需要做的就是按照我们需要的确切顺序来管理另一个转换流。使用Node的<code>crypto</code>模块处理这个事情。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const crypto = require('crypto');
// ...

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher('aes192', 'a_secret'))
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>);
<span class="hljs-regexp">//</span> ...

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher(<span class="hljs-string">'aes192'</span>, <span class="hljs-string">'a_secret'</span>))
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + <span class="hljs-string">'.zz'</span>))
  .<span class="hljs-literal">on</span>(<span class="hljs-string">'finish'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Done'</span>));</code></pre>
<p>上面的脚本压缩然后加密传递的文件，只有具有密码的人才可以使用文件。 我们无法使用正常的解压缩实用程序解压缩此文件，因为它已被加密。</p>
<p>为了能够解压缩文件，我们需要使用完全相反的操作，这也很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.createReadStream(file)
  .pipe(crypto.createDecipher('aes192', 'a_secret'))
  .pipe(zlib.createGunzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on('finish', () => console.log('Done'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">fs</span><span class="hljs-selector-class">.createReadStream</span>(file)
  <span class="hljs-selector-class">.pipe</span>(crypto.createDecipher(<span class="hljs-string">'aes192'</span>, <span class="hljs-string">'a_secret'</span>))
  <span class="hljs-selector-class">.pipe</span>(zlib.createGunzip())
  <span class="hljs-selector-class">.pipe</span>(reportProgress)
  <span class="hljs-selector-class">.pipe</span>(fs.createWriteStream(file.slice(<span class="hljs-number">0</span>, -<span class="hljs-number">3</span>)))
  <span class="hljs-selector-class">.on</span>(<span class="hljs-string">'finish'</span>, () =&gt; console.log(<span class="hljs-string">'Done'</span>));</code></pre>
<p>假设传递的文件是压缩版本，上面的代码将创建一个读取流，将其传输到crypto createDecipher（）流中（使用相同的秘密），将其输出管道输入到zlib createGunzip（）流中， 然后将文件写回到没有扩展名的文件中。</p>
<p>以上就是全部了，谢谢阅读！！</p>
<p>翻译自<a href="https://medium.freecodecamp.com/node-js-streams-everything-you-need-to-know-c9141306be93" rel="nofollow noreferrer" target="_blank">Node.js Streams: Everything you need to know</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]关于Node.js streams你需要知道的一切

## 原文链接
[https://segmentfault.com/a/1190000009793488](https://segmentfault.com/a/1190000009793488)


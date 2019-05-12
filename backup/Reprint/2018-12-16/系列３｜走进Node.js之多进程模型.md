---
title: '系列３｜走进Node.js之多进程模型' 
date: 2018-12-16 2:30:10
hidden: true
slug: 8ybwecsg7b3
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>文：正龙（沪江网校Web前端工程师）<p>本文原创，转载请注明作者及出处</p>
</blockquote>
<p>之前的文章“<a href="http://mp.weixin.qq.com/s?__biz=MzI1MTE2NTE1Ng==&amp;mid=2649516579&amp;idx=1&amp;sn=cb3ef197a637429774d3eb297e01828f&amp;chksm=f1efeaa8c69863bedfd102bca2abb67de44b92cfee99feb4825a73386617517856a2b64a8a87&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">走进Node.js之HTTP实现分析</a>”中，大家已经了解 Node.js 是如何处理 HTTP 请求的，在整个处理过程，它仅仅用到单进程模型。那么如何让 Web 应用扩展到多进程模型，以便充分利用CPU资源呢？答案就是 Cluster。本篇文章将带着大家一起分析Node.js的多进程模型。</p>
<p>首先，来一段经典的 Node.js 主从服务模型代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  require('http').createServer((req, res) => {
    res.end('hello world');
  }).listen(3333);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> cluster = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cluster'</span>);
<span class="hljs-keyword">const</span> numCPUs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>).cpus().length;

<span class="hljs-keyword">if</span> (cluster.isMaster) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; numCPUs; i++) {
    cluster.fork();
  }
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    res.end(<span class="hljs-string">'hello world'</span>);
  }).listen(<span class="hljs-number">3333</span>);
}</code></pre>
<p>通常，主从模型包含一个主进程（master）和多个从进程（worker），主进程负责接收连接请求，以及把单个的请求任务分发给从进程处理；从进程的职责就是不断响应客户端请求，直至进入等待状态。如图 3-1 所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030639?w=1090&amp;h=360" src="https://static.alili.tech/img/remote/1460000013030639?w=1090&amp;h=360" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>围绕这段代码，本文希望讲述清楚几个关键问题：</p>
<ol>
<li>从进程的创建过程；</li>
<li>在使用同一主机地址的前提下，如果指定端口已经被监听，其它进程尝试监听同一端口时本应该会报错（EADDRINUSE，即端口已被占用）；那么，Node.js 如何能够在主从进程上对同一端口执行 listen 方法？</li>
</ol>
<h1 id="articleHeader0">进程 fork 是如何完成的？</h1>
<p>在 Node.js 中，<a href="https://nodejs.org/dist/latest-v8.x/docs/api/cluster.html#cluster_cluster_fork_env" rel="nofollow noreferrer" target="_blank">cluster.fork</a> 与 POSIX 的 <a href="https://linux.die.net/man/3/fork" rel="nofollow noreferrer" target="_blank">fork</a> 略有不同：虽然从进程仍旧是 fork 创建，但是并不会直接使用主进程的进程映像，而是调用系统函数 <a href="https://linux.die.net/man/3/execvp" rel="nofollow noreferrer" target="_blank">execvp</a> 让从进程使用新的进程映像。另外，每个从进程对应一个 Worker 对象，它有如下状态：none、online、listening、dead和disconnected。</p>
<p>ChildProcess 对象主要提供进程的创建（spawn）、销毁（kill）以及进程句柄引用计数管理（ref 与 unref）。在对Process对象（process_wrap.cc）进行封装之外，它自身也处理了一些细节问题。例如，在方法 spawn 中，如果需要主从进程之间建立 IPC 管道，则通过环境变量 NODE_CHANNEL_FD 来告知从进程应该绑定的 IPC 相关的文件描述符（fd），这个特殊的环境变量后面会被再次涉及到。</p>
<p>以上提到的三个对象引用关系如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030640?w=950&amp;h=371" src="https://static.alili.tech/img/remote/1460000013030640?w=950&amp;h=371" alt="" title="" style="cursor: pointer;"></span></p>
<p>cluster.fork 的主要执行流程：</p>
<ol>
<li>调用 child_process.spawn；</li>
<li>
<p>创建 ChildProcess 对象，并初始化其 _handle 属性为 Process 对象；Process 是 process_wrap.cc 中公布给 JavaScript 的对象，它封装了 libuv 的进程操纵功能。附上 Process 对象的 C++ 定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Process {
  construtor(const FunctionCallbackInfo<Value>&amp; args);
  void close(const FunctionCallbackInfo<Value>&amp; args);
  void spawn(const FunctionCallbackInfo<Value>&amp; args);
  void kill(const FunctionCallbackInfo<Value>&amp; args);
  void ref(const FunctionCallbackInfo<Value>&amp; args);
  void unref(const FunctionCallbackInfo<Value>&amp; args);
  void hasRef(const FunctionCallbackInfo<Value>&amp; args);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code class="c++"><span class="hljs-keyword">interface</span> <span class="hljs-title">Process</span> {
  construtor(<span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args);
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">close</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args</span>)</span>;
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">spawn</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args</span>)</span>;
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">kill</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args</span>)</span>;
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">ref</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args</span>)</span>;
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">unref</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args</span>)</span>;
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">hasRef</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> FunctionCallbackInfo&lt;Value&gt;&amp; args</span>)</span>;
}</code></pre>
</li>
<li>调用 ChildProcess._handle 的方法 spawn，并会最终调用 libuv 库中 <a href="http://docs.libuv.org/en/v1.x/process.html" rel="nofollow noreferrer" target="_blank">uv_spawn</a>。</li>
</ol>
<p>主进程在执行 cluster.fork 时，会指定两个特殊的环境变量 NODE_CHANNEL_FD 和 NODE_UNIQUE_ID，所以从进程的初始化过程跟一般 Node.js 进程略有不同：</p>
<ol>
<li>bootstrap_node.js 是运行时包含的 JavaScript 入口文件，其中调用 internal\process.setupChannel；</li>
<li>如果环境变量包含 NODE_CHANNEL_FD，则调用 child_process._forkChild，然后移除该值；</li>
<li>调用 internal\child_process.setupChannel，在子进程的全局 process 对象上监听消息 internalMessage，并且添加方法 send 和 _send。其中 send 只是对 _send 的封装；通常，_send 只是把消息 JSON 序列化之后写入管道，并最终投递到接收端。</li>
<li>如果环境变量包含 NODE_UNIQUE_ID，则当前进程是 worker 模式，加载 cluster 模块时会执行 workerInit；另外，它也会影响到 net.Server 的 listen 方法，worker 模式下 listen 方法会调用 cluster._getServer，该方法实质上向主进程发起消息 {"act" : "queryServer"}，而不是真正监听端口。</li>
</ol>
<h1 id="articleHeader1">IPC实现细节</h1>
<p>上文提到了 Node.js 主从进程仅仅通过 IPC 维持联络，那这一节就来深入分析下 IPC 的实现细节。首先，让我们看一段示例代码:</p>
<p><strong>1-master.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {spawn} = require('child_process');
let child = spawn(process.execPath, [`${__dirname}/1-slave.js`], {
  stdio: [0, 1, 2, 'ipc']
});

child.on('message', function(data) {
  console.log('received in master:');
  console.log(data);
});

child.send({
  msg: 'msg from master'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> {spawn} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
<span class="hljs-keyword">let</span> child = spawn(process.execPath, [<span class="hljs-string">`<span class="hljs-subst">${__dirname}</span>/1-slave.js`</span>], {
  <span class="hljs-attr">stdio</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">'ipc'</span>]
});

child.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'received in master:'</span>);
  <span class="hljs-built_in">console</span>.log(data);
});

child.send({
  <span class="hljs-attr">msg</span>: <span class="hljs-string">'msg from master'</span>
});</code></pre>
<p><strong>1-slave.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.on('message', function(data) {
  console.log('received in slave:');
  console.log(data);
});
process.send({
  'msg': 'message from slave'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">process.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'received in slave:'</span>);
  <span class="hljs-built_in">console</span>.log(data);
});
process.send({
  <span class="hljs-string">'msg'</span>: <span class="hljs-string">'message from slave'</span>
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node 1-master.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">1-master</span>.js</code></pre>
<p>运行结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030641?w=633&amp;h=146" src="https://static.alili.tech/img/remote/1460000013030641?w=633&amp;h=146" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>细心的同学可能发现控制台输出并不是连续的，master和slave的日志交错打印，这是由于并行进程执行顺序不可预知造成的。</p>
<h2 id="articleHeader2">socketpair</h2>
<p>前文提到从进程实际上通过系统调用 execvp 启动新的 Node.js 实例；也就是说默认情况下，Node.js 主从进程不会共享文件描述符表，那它们到底是如何互发消息的呢？</p>
<p>原来，可以利用 <a href="https://linux.die.net/man/2/socketpair" rel="nofollow noreferrer" target="_blank">socketpair</a> 创建一对全双工匿名 socket，用于在进程间互发消息；其函数签名如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int socketpair(int domain, int type, int protocol, int sv[2]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="c" style="word-break: break-word; white-space: initial;"><span class="hljs-type">int</span> socketpair(<span class="hljs-type">int</span> domain, <span class="hljs-type">int</span> <span class="hljs-built_in">type</span>, <span class="hljs-type">int</span> protocol, <span class="hljs-type">int</span> <span class="hljs-built_in">sv</span>[<span class="hljs-number">2</span>]);</code></pre>
<p>通常情况下，我们是无法通过 socket 来传递文件描述符的；当主进程与客户端建立了连接，需要把连接描述符告知从进程处理，怎么办？其实，通过指定 socketpair 的第一个参数为 AF_UNIX，表示创建匿名 UNIX 域套接字（UNIX domain socket），这样就可以使用系统函数 <a href="https://linux.die.net/man/2/sendmsg" rel="nofollow noreferrer" target="_blank">sendmsg</a> 和 <a href="https://linux.die.net/man/2/recvmsg" rel="nofollow noreferrer" target="_blank">recvmsg</a> 来传递/接收文件描述符了。</p>
<p>主进程在调用 cluster.fork 时，相关流程如下：</p>
<ol>
<li>创建 Pipe（pipe_wrap.cc）对象，并且指定参数 ipc 为 true；</li>
<li>调用 uv_spawn，options 参数为 uv_process_options_s 结构体，把 Pipe 对象存储在结构体的属性 stdio 中；</li>
<li>调用 uv__process_init_stdio，通过 socketpair 创建全双工 socket；</li>
<li>调用 uv__process_open_stream，设置 Pipe 对象的 iowatcher.fd 值为全双工 socket 之一。</li>
</ol>
<p>至此，主从进程就可以进行双向通信了。流程图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030642?w=1201&amp;h=899" src="https://static.alili.tech/img/remote/1460000013030642?w=1201&amp;h=899" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们再回看一下环境变量 NODE_CHANNEL_FD，令人疑惑的是，它的值始终为3。进程级文件描述符表中，0-2分别是标准输入stdin、标准输出stdout和标准错误输出stderr，那么可用的第一个文件描述符就是3，socketpair 显然会占用从进程的第一个可用文件描述符。这样，当从进程往 fd=3 的流中写入数据时，主进程就可以收到消息；反之，亦类似。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030643?w=805&amp;h=602" src="https://static.alili.tech/img/remote/1460000013030643?w=805&amp;h=602" alt="" title="" style="cursor: pointer;"></span></p>
<p>从 IPC 读取消息主要是流操作，以后有机会详解，下面列出主要流程：</p>
<ol>
<li>StreamBase::EditData 回调 onread；</li>
<li>StreamWrap::OnReadImpl 调用 StreamWrap::EditData；</li>
<li>StreamWrap 的构造函数会调用 set_read_cb 设置 OnReadImpl；</li>
<li>StreamWrap::set_read_cb 设置属性 StreamWrap::read_cb_；</li>
<li>StreamWrap::OnRead 中引用属性 read_cb_；</li>
<li>StreamWrap::ReadStart 调用 uv_read_start 时传递 Streamwrap::OnRead 作为第3个参数：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int uv_read_start(uv_stream_t* stream, uv_alloc_cb alloc_cb, uv_read_cb read_cb)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code class="c" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">uv_read_start</span><span class="hljs-params">(<span class="hljs-keyword">uv_stream_t</span>* stream, uv_alloc_cb alloc_cb, uv_read_cb read_cb)</span></span></code></pre>
<p>涉及到的类图关系如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030644?w=505&amp;h=570" src="https://static.alili.tech/img/remote/1460000013030644?w=505&amp;h=570" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">服务器主从模型</h1>
<p>以上大概分析了从进程的创建过程及其特殊性；如果要实现主从服务模型的话，还需要解决一个基本问题：从进程怎么获取到与客户端间的连接描述符？我们打算从 process.send（只有在从进程的全局 process 对象上才有 send 方法，主进程可以通过 worker.process 或 worker 访问该方法）的函数签名着手：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void send(message, sendHandle, callback)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">void</span> send(message, sendHandle, callback)</code></pre>
<p>其参数 message 和 callback 含义也许显而易见，分别指待发送的消息对象和操作结束之后的回调函数。那它的第二个参数 sendHandle 用途是什么？</p>
<p>前文提到系统函数 socketpair 可以创建一对双向 socket，能够用来发送 JSON 消息，这一块主要涉及到流操作；另外，当 sendHandle 有值时，它们还可以用于传递文件描述符，其过程要相对复杂一些，但是最终会调用系统函数 sendmsg 以及 recvmsg。</p>
<h2 id="articleHeader4">传递与客户端的连接描述符</h2>
<p>在主从服务模型下，主进程负责跟客户端建立连接，然后把连接描述符通过 <a href="https://linux.die.net/man/2/sendmsg" rel="nofollow noreferrer" target="_blank">sendmsg</a> 传递给从进程。我们来看看这一过程：</p>
<p><strong>从进程</strong></p>
<ol>
<li>调用 http.Server.listen 方法（继承至 net.Server）；</li>
<li>
<p>调用 cluster._getServer，向主进程发起消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;cmd&quot;: &quot;NODE_HANDLE&quot;,
  &quot;msg&quot;: {
    &quot;act&quot;: &quot;queryServer&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"cmd"</span>: <span class="hljs-string">"NODE_HANDLE"</span>,
  <span class="hljs-attr">"msg"</span>: {
    <span class="hljs-attr">"act"</span>: <span class="hljs-string">"queryServer"</span>
  }
}</code></pre>
</li>
</ol>
<p><strong>主进程</strong></p>
<ol>
<li>
<p>接收处理这个消息时，会新建一个 RoundRobinHandle 对象，为变量 handle。每个 handle 与一个连接端点对应，并且对应多个从进程实例；同时，它会开启与连接端点相应的 TCP 服务 socket。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class RoundRobinHandle {
  construtor(key, address, port, addressType, fd) {
    // 监听同一端点的从进程集合
    this.all = [];

    // 可用的从进程集合
    this.free = [];

    // 当前等待处理的客户端连接描述符集合
    this.handles = [];

    // 指定端点的TCP服务socket
    this.server = null;
  }
  add(worker, send) {
    // 把从进程实例加入this.all
  }
  remove(worker) {
    // 移除指定从进程
  }
  distribute(err, handle) {
    // 把连接描述符handle存入this.handles，并指派一个可用的从进程实例开始处理连接请求
  }
  handoff(worker) {
    // 从this.handles中取出一个待处理的连接描述符，并向从进程发起消息
    // {
    //  &quot;type&quot;: &quot;NODE_HANDLE&quot;,
    //  &quot;msg&quot;: {
    //    &quot;act&quot;: &quot;newconn&quot;,
    //  }
    // }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RoundRobinHandle</span> </span>{
  construtor(key, address, port, addressType, fd) {
    <span class="hljs-comment">// 监听同一端点的从进程集合</span>
    <span class="hljs-keyword">this</span>.all = [];

    <span class="hljs-comment">// 可用的从进程集合</span>
    <span class="hljs-keyword">this</span>.free = [];

    <span class="hljs-comment">// 当前等待处理的客户端连接描述符集合</span>
    <span class="hljs-keyword">this</span>.handles = [];

    <span class="hljs-comment">// 指定端点的TCP服务socket</span>
    <span class="hljs-keyword">this</span>.server = <span class="hljs-literal">null</span>;
  }
  add(worker, send) {
    <span class="hljs-comment">// 把从进程实例加入this.all</span>
  }
  remove(worker) {
    <span class="hljs-comment">// 移除指定从进程</span>
  }
  distribute(err, handle) {
    <span class="hljs-comment">// 把连接描述符handle存入this.handles，并指派一个可用的从进程实例开始处理连接请求</span>
  }
  handoff(worker) {
    <span class="hljs-comment">// 从this.handles中取出一个待处理的连接描述符，并向从进程发起消息</span>
    <span class="hljs-comment">// {</span>
    <span class="hljs-comment">//  "type": "NODE_HANDLE",</span>
    <span class="hljs-comment">//  "msg": {</span>
    <span class="hljs-comment">//    "act": "newconn",</span>
    <span class="hljs-comment">//  }</span>
    <span class="hljs-comment">// }</span>
  }
}</code></pre>
</li>
<li>调用 handle.add 方法，把 worker 对象添加到 handle.all 集合中；</li>
<li>当 handle.server 开始监听客户端请求之后，重置其 onconnection 回调函数为 RoundRobinHandle.distribute，这样的话主进程就不用实际处理客户端连接，只要分发连接给从进程处理即可。它会把连接描述符存入 handle.handles 集合，当有可用 worker 时，则向其发送消息 { "act": "newconn" }。如果被指派的 worker 没有回复确认消息 { "ack": message.seq, accepted: true }，则会尝试把该连接分配给其他 worker。</li>
</ol>
<p>流程图如下：</p>
<p><em>从进程上调用listen</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030645?w=987&amp;h=705" src="https://static.alili.tech/img/remote/1460000013030645?w=987&amp;h=705" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><em>客户端连接处理</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030646?w=981&amp;h=392" src="https://static.alili.tech/img/remote/1460000013030646?w=981&amp;h=392" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">从进程如何与主进程监听同一端口？</h2>
<p>原因主要有两点：</p>
<p><strong> I. 从进程中 Node.js 运行时的初始化略有不同</strong></p>
<ol>
<li>因为从进程存在环境变量 NODE_UNIQUE_ID，所以在 bootstrap_node.js 中，加载 cluster 模块时执行 workerInit 方法。这个地方与主进程执行的 masterInit 方法不同点在于：其一，从进程上没有 cluster.fork 方法，所以不能在从进程继续创建子孙进程；其二，Worker 对象上的方法 disconnect 和  destroy 实现也有所差异：我们以调用 worker.destroy 为例，在主进程上时，不能直接把从进程杀掉，而是通知从进程退出，然后再把它从集合里删除；当在从进程上时，从进程通知完主进程然后退出就可以了；其三，从进程上 cluster 模块新增了方法 _getServer，用于向主进程发起消息 {"act": "queryServer"}，通知主进程创建 RoundRobinHandle 对象，并实际监听指定端口地址；然后自身用一个模拟的 TCP 描述符继续执行；</li>
<li>调用 cluster._setupWorker 方法，主要是初始化 cluster.worker 属性，并监听消息 <strong>internalMessage</strong>，处理两种消息类型：newconn 和 disconnect；</li>
<li>向主进程发起消息 { "act": "online" }；</li>
<li>因为从进程额环境变量中有 NODE_CHANNEL_FD，调用 internal\process.setupChannel时，会连接到系统函数 socketpair 创建的双向 socket ，并监听 <strong>internalMessage</strong> ，处理消息类型：NODE_HANDLE_ACK和NODE_HANDLE。</li>
</ol>
<p><strong> II. listen 方法在主从进程中执行的代码略有不同。</strong></p>
<p>在 net.Server（net.js）的方法 listen 中，如果是主进程，则执行标准的端口绑定流程；如果是从进程，则会调用 cluster._getServer，参见上面对该方法的描述。</p>
<p>最后，附上基于libuv实现的一个 C 版 Master-Slave 服务模型，<a href="https://github.com/Hujiang-FE/simple-http-server/tree/master/v2" rel="nofollow noreferrer" target="_blank">GitHub地址</a>。</p>
<p>启动服务器之后，访问 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3333 的运行结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013030647?w=825&amp;h=363" src="https://static.alili.tech/img/remote/1460000013030647?w=825&amp;h=363" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>相信通过本篇文章的介绍，大家已经对Node.js的Cluster有了一个全面的了解。下一次作者会跟大家一起深入分析Node.js进程管理在生产环境下的可用性问题，敬请期待。</p>
<h2 id="articleHeader6">相关文章</h2>
<p><a href="https://juejin.im/post/58d4f5f144d90400692d1064" rel="nofollow noreferrer" target="_blank">系列１｜走进Node.js之启动过程剖析</a></p>
<p><a href="https://juejin.im/post/5965bb26f265da6c204195b3" rel="nofollow noreferrer" target="_blank">系列２｜走进Node.js 之 HTTP实现分析</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012423305?w=1426&amp;h=778" src="https://static.alili.tech/img/remote/1460000012423305?w=1426&amp;h=778" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">推荐： 翻译项目Master的自述：</h2>
<h3 id="articleHeader8">1. <a href="https://juejin.im/post/59e87bef5188255ea95b1077" rel="nofollow noreferrer" target="_blank">干货｜人人都是翻译项目的Master</a>
</h3>
<h3 id="articleHeader9">2. <a>iKcamp出品微信小程序教学共5章16小节汇总(含视频)</a>
</h3>
<h3 id="articleHeader10">3. <a href="https://juejin.im/post/5a31eb2f6fb9a04528468046" rel="nofollow noreferrer" target="_blank">开始免费连载啦～每周２更共11堂iKcamp课｜基于Koa2搭建Node.js实战项目教学（含视频）| 课程大纲介绍</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
系列３｜走进Node.js之多进程模型

## 原文链接
[https://segmentfault.com/a/1190000013030634](https://segmentfault.com/a/1190000013030634)


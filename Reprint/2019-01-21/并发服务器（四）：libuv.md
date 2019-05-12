---
title: '并发服务器（四）：libuv' 
date: 2019-01-21 2:30:06
hidden: true
slug: vu5d363lynh
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#并发服务器四libuv"></a>并发服务器（四）：libuv</h1>
<p>这是并发网络服务器系列文章的第四部分。在这一部分中，我们将使用 libuv 再次重写我们的服务器，并且也会讨论关于使用一个线程池在回调中去处理耗时任务。最终，我们去看一下底层的 libuv，花一点时间去学习如何用异步 API 对文件系统阻塞操作进行封装。</p>
<p>本系列的所有文章：</p>
<ul>
<li><a href="https://linux.cn/article-8993-1.html">第一节 - 简介</a></li>
<li><a href="https://linux.cn/article-9002-1.html">第二节 - 线程</a></li>
<li><a href="https://linux.cn/article-9117-1.html">第三节 - 事件驱动</a></li>
<li><a href="http://eli.thegreenplace.net/2017/concurrent-servers-part-4-libuv/">第四节 - libuv</a></li>
</ul>
<h3><a href="#使用-libuv-抽象出事件驱动循环"></a>使用 libuv 抽象出事件驱动循环</h3>
<p>在 <a href="https://linux.cn/article-9117-1.html">第三节</a> 中，我们看到了基于 <code>select</code> 和 <code>epoll</code> 的服务器的相似之处，并且，我说过，在它们之间抽象出细微的差别是件很有吸引力的事。许多库已经做到了这些，所以在这一部分中我将去选一个并使用它。我选的这个库是 <a href="http://libuv.org/">libuv</a>，它最初设计用于 Node.js 底层的可移植平台层，并且，后来发现在其它的项目中也有使用。libuv 是用 C 写的，因此，它具有很高的可移植性，非常适用嵌入到像 JavaScript 和 Python 这样的高级语言中。</p>
<p>虽然 libuv 为了抽象出底层平台细节已经变成了一个相当大的框架，但它仍然是以 <em>事件循环</em> 思想为中心的。在我们第三部分的事件驱动服务器中，事件循环是显式定义在 <code>main</code> 函数中的；当使用 libuv 时，该循环通常隐藏在库自身中，而用户代码仅需要注册事件句柄（作为一个回调函数）和运行这个循环。此外，libuv 会在给定的平台上使用更快的事件循环实现，对于 Linux 它是 <code>epoll</code>，等等。</p>
<p><a href="https://camo.githubusercontent.com/93541ce88666ad9ceb4d8bcd0529c37000dbfd8d/68747470733a2f2f656c692e746865677265656e706c6163652e6e65742f696d616765732f323031372f6c696275766c6f6f702e706e67"><img src="https://p0.ssl.qhimg.com/t01aa01812b505286b6.png" alt="libuv loop"></a></p>
<p>libuv 支持多路事件循环，因此事件循环在库中是非常重要的；它有一个句柄 —— <code>uv_loop_t</code>，以及创建/杀死/启动/停止循环的函数。也就是说，在这篇文章中，我将仅需要使用 “默认的” 循环，libuv 可通过 <code>uv_default_loop()</code> 提供它；多路循环大多用于多线程事件驱动的服务器，这是一个更高级别的话题，我将留在这一系列文章的以后部分。</p>
<h3><a href="#使用-libuv-的并发服务器"></a>使用 libuv 的并发服务器</h3>
<p>为了对 libuv 有一个更深的印象，让我们跳转到我们的可靠协议的服务器，它通过我们的这个系列已经有了一个强大的重新实现。这个服务器的结构与第三部分中的基于 <code>select</code> 和 <code>epoll</code> 的服务器有一些相似之处，因为，它也依赖回调。完整的 <a href="https://github.com/eliben/code-for-blog/blob/master/2017/async-socket-server/uv-server.c">示例代码在这里</a>；我们开始设置这个服务器的套接字绑定到一个本地端口：</p>
<pre><code class="hljs perl"><span class="hljs-keyword">int</span> portnum = <span class="hljs-number">9090</span>;
<span class="hljs-keyword">if</span> (argc &gt;= <span class="hljs-number">2</span>) {
  portnum = atoi(argv[<span class="hljs-number">1</span>]);
}
<span class="hljs-keyword">printf</span>(<span class="hljs-string">"Serving on port %d\n"</span>, portnum);

<span class="hljs-keyword">int</span> rc;
uv_tcp_t server_stream;
<span class="hljs-keyword">if</span> ((rc = uv_tcp_init(uv_default_loop(), &amp;server_stream)) &lt; <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">die</span>(<span class="hljs-string">"uv_tcp_init failed: %s"</span>, uv_strerror(rc));
}

struct sockaddr_in server_address;
<span class="hljs-keyword">if</span> ((rc = uv_ip4_addr(<span class="hljs-string">"0.0.0.0"</span>, portnum, &amp;server_address)) &lt; <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">die</span>(<span class="hljs-string">"uv_ip4_addr failed: %s"</span>, uv_strerror(rc));
}

<span class="hljs-keyword">if</span> ((rc = uv_tcp_bind(&amp;server_stream, (const struct sockaddr*)&amp;server_address, <span class="hljs-number">0</span>)) &lt; <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">die</span>(<span class="hljs-string">"uv_tcp_bind failed: %s"</span>, uv_strerror(rc));
}

</code></pre><p>除了它被封装进 libuv API 中之外，你看到的是一个相当标准的套接字。在它的返回中，我们取得了一个可工作于任何 libuv 支持的平台上的可移植接口。</p>
<p>这些代码也展示了很认真负责的错误处理；多数的 libuv 函数返回一个整数状态，返回一个负数意味着出现了一个错误。在我们的服务器中，我们把这些错误看做致命问题进行处理，但也可以设想一个更优雅的错误恢复。</p>
<p>现在，那个套接字已经绑定，是时候去监听它了。这里我们运行首个回调注册：</p>
<pre><code class="hljs cpp"><span class="hljs-comment">// Listen on the socket for new peers to connect. When a new peer connects,</span>
<span class="hljs-comment">// the on_peer_connected callback will be invoked.</span>
<span class="hljs-keyword">if</span> ((rc = uv_listen((<span class="hljs-keyword">uv_stream_t</span>*)&amp;server_stream, N_BACKLOG, on_peer_connected)) &lt; <span class="hljs-number">0</span>) {
  die(<span class="hljs-string">"uv_listen failed: %s"</span>, uv_strerror(rc));
}

</code></pre><p><code>uv_listen</code> 注册一个事件回调，当新的对端连接到这个套接字时将会调用事件循环。我们的回调在这里被称为 <code>on_peer_connected</code>，我们一会儿将去查看它。</p>
<p>最终，<code>main</code> 运行这个 libuv 循环，直到它被停止（<code>uv_run</code> 仅在循环被停止或者发生错误时返回）。</p>
<pre><code class="hljs ceylon"><span class="hljs-comment">// Run the libuv event loop.</span>
uv<span class="hljs-number">_</span>run(uv<span class="hljs-number">_</span><span class="hljs-keyword">default</span><span class="hljs-number">_</span>loop(), UV<span class="hljs-number">_</span>RUN<span class="hljs-number">_</span>DEFAULT);

<span class="hljs-comment">// If uv_run returned, close the default loop before exiting.</span>
<span class="hljs-keyword">return</span> uv<span class="hljs-number">_</span>loop<span class="hljs-number">_</span>close(uv<span class="hljs-number">_</span><span class="hljs-keyword">default</span><span class="hljs-number">_</span>loop());

</code></pre><p>注意，在运行事件循环之前，只有一个回调是通过 <code>main</code> 注册的；我们稍后将看到怎么去添加更多的回调。在事件循环的整个运行过程中，添加和删除回调并不是一个问题 —— 事实上，大多数服务器就是这么写的。</p>
<p>这是一个 <code>on_peer_connected</code>，它处理到服务器的新的客户端连接：</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">on_peer_connected</span><span class="hljs-params">(<span class="hljs-keyword">uv_stream_t</span>* server_stream, <span class="hljs-keyword">int</span> status)</span> </span>{
  <span class="hljs-keyword">if</span> (status &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">fprintf</span>(<span class="hljs-built_in">stderr</span>, <span class="hljs-string">"Peer connection error: %s\n"</span>, uv_strerror(status));
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// client will represent this peer; it's allocated on the heap and only</span>
  <span class="hljs-comment">// released when the client disconnects. The client holds a pointer to</span>
  <span class="hljs-comment">// peer_state_t in its data field; this peer state tracks the protocol state</span>
  <span class="hljs-comment">// with this client throughout interaction.</span>
  <span class="hljs-keyword">uv_tcp_t</span>* client = (<span class="hljs-keyword">uv_tcp_t</span>*)xmalloc(<span class="hljs-keyword">sizeof</span>(*client));
  <span class="hljs-keyword">int</span> rc;
  <span class="hljs-keyword">if</span> ((rc = uv_tcp_init(uv_default_loop(), client)) &lt; <span class="hljs-number">0</span>) {
    die(<span class="hljs-string">"uv_tcp_init failed: %s"</span>, uv_strerror(rc));
  }
  client-&gt;data = <span class="hljs-literal">NULL</span>;

  <span class="hljs-keyword">if</span> (uv_accept(server_stream, (<span class="hljs-keyword">uv_stream_t</span>*)client) == <span class="hljs-number">0</span>) {
    <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">sockaddr_storage</span> <span class="hljs-title">peername</span>;</span>
    <span class="hljs-keyword">int</span> namelen = <span class="hljs-keyword">sizeof</span>(peername);
    <span class="hljs-keyword">if</span> ((rc = uv_tcp_getpeername(client, (struct sockaddr*)&amp;peername,
                                 &amp;namelen)) &lt; <span class="hljs-number">0</span>) {
      die(<span class="hljs-string">"uv_tcp_getpeername failed: %s"</span>, uv_strerror(rc));
    }
    report_peer_connected((<span class="hljs-keyword">const</span> struct sockaddr_in*)&amp;peername, namelen);

    <span class="hljs-comment">// Initialize the peer state for a new client: we start by sending the peer</span>
    <span class="hljs-comment">// the initial '*' ack.</span>
    <span class="hljs-keyword">peer_state_t</span>* peerstate = (<span class="hljs-keyword">peer_state_t</span>*)xmalloc(<span class="hljs-keyword">sizeof</span>(*peerstate));
    peerstate-&gt;state = INITIAL_ACK;
    peerstate-&gt;sendbuf[<span class="hljs-number">0</span>] = <span class="hljs-string">'*'</span>;
    peerstate-&gt;sendbuf_end = <span class="hljs-number">1</span>;
    peerstate-&gt;client = client;
    client-&gt;data = peerstate;

    <span class="hljs-comment">// Enqueue the write request to send the ack; when it's done,</span>
    <span class="hljs-comment">// on_wrote_init_ack will be called. The peer state is passed to the write</span>
    <span class="hljs-comment">// request via the data pointer; the write request does not own this peer</span>
    <span class="hljs-comment">// state - it's owned by the client handle.</span>
    <span class="hljs-keyword">uv_buf_t</span> writebuf = uv_buf_init(peerstate-&gt;sendbuf, peerstate-&gt;sendbuf_end);
    <span class="hljs-keyword">uv_write_t</span>* req = (<span class="hljs-keyword">uv_write_t</span>*)xmalloc(<span class="hljs-keyword">sizeof</span>(*req));
    req-&gt;data = peerstate;
    <span class="hljs-keyword">if</span> ((rc = uv_write(req, (<span class="hljs-keyword">uv_stream_t</span>*)client, &amp;writebuf, <span class="hljs-number">1</span>,
                       on_wrote_init_ack)) &lt; <span class="hljs-number">0</span>) {
      die(<span class="hljs-string">"uv_write failed: %s"</span>, uv_strerror(rc));
    }
  } <span class="hljs-keyword">else</span> {
    uv_close((<span class="hljs-keyword">uv_handle_t</span>*)client, on_client_closed);
  }
}

</code></pre><p>这些代码都有很好的注释，但是，这里有一些重要的 libuv 语法我想去强调一下：</p>
<ul>
<li>传入自定义数据到回调中：因为 C 语言还没有闭包，这可能是个挑战，libuv 在它的所有的处理类型中有一个 <code>void* data</code> 字段；这些字段可以被用于传递用户数据。例如，注意 <code>client-&gt;data</code> 是如何指向到一个 <code>peer_state_t</code> 结构上，以便于 <code>uv_write</code> 和 <code>uv_read_start</code> 注册的回调可以知道它们正在处理的是哪个客户端的数据。</li>
<li>内存管理：在带有垃圾回收的语言中进行事件驱动编程是非常容易的，因为，回调通常运行在一个与它们注册的地方完全不同的栈帧中，使得基于栈的内存管理很困难。它总是需要传递堆分配的数据到 libuv 回调中（当所有回调运行时，除了 <code>main</code>，其它的都运行在栈上），并且，为了避免泄漏，许多情况下都要求这些数据去安全释放（<code>free()</code>）。这些都是些需要实践的内容 ^注1 。</li>
</ul>
<p>这个服务器上对端的状态如下：</p>
<pre><code class="hljs routeros">typedef struct {
  ProcessingState state;
  char sendbuf[SENDBUF_SIZE];
  int sendbuf_end;
  uv_tcp_t*<span class="hljs-built_in"> client;
</span>} peer_state_t;

</code></pre><p>它与第三部分中的状态非常类似；我们不再需要 <code>sendptr</code>，因为，在调用 “done writing” 回调之前，<code>uv_write</code> 将确保发送它提供的整个缓冲。我们也为其它的回调使用保持了一个到客户端的指针。这里是 <code>on_wrote_init_ack</code>：</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">on_wrote_init_ack</span><span class="hljs-params">(<span class="hljs-keyword">uv_write_t</span>* req, <span class="hljs-keyword">int</span> status)</span> </span>{
  <span class="hljs-keyword">if</span> (status) {
    die(<span class="hljs-string">"Write error: %s\n"</span>, uv_strerror(status));
  }
  <span class="hljs-keyword">peer_state_t</span>* peerstate = (<span class="hljs-keyword">peer_state_t</span>*)req-&gt;data;
  <span class="hljs-comment">// Flip the peer state to WAIT_FOR_MSG, and start listening for incoming data</span>
  <span class="hljs-comment">// from this peer.</span>
  peerstate-&gt;state = WAIT_FOR_MSG;
  peerstate-&gt;sendbuf_end = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">int</span> rc;
  <span class="hljs-keyword">if</span> ((rc = uv_read_start((<span class="hljs-keyword">uv_stream_t</span>*)peerstate-&gt;client, on_alloc_buffer,
                          on_peer_read)) &lt; <span class="hljs-number">0</span>) {
    die(<span class="hljs-string">"uv_read_start failed: %s"</span>, uv_strerror(rc));
  }

  <span class="hljs-comment">// Note: the write request doesn't own the peer state, hence we only free the</span>
  <span class="hljs-comment">// request itself, not the state.</span>
  <span class="hljs-built_in">free</span>(req);
}

</code></pre><p>然后，我们确信知道了这个初始的 <code>'*'</code> 已经被发送到对端，我们通过调用 <code>uv_read_start</code> 去监听从这个对端来的入站数据，它注册一个将被事件循环调用的回调（<code>on_peer_read</code>），不论什么时候，事件循环都在套接字上接收来自客户端的调用：</p>
<pre><code class="hljs xl">void on_peer_read(uv_stream_t* client, ssize_t nread, const uv_buf_t* buf) {
  <span class="hljs-keyword">if</span> (nread &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">if</span> (nread != uv_eof) {
      fprintf(stderr, <span class="hljs-string">"read error: %s\n"</span>, uv_strerror(nread));
    }
    uv_close((uv_handle_t*)client, on_client_closed);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nread == <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// from the documentation of uv_read_cb: nread might be 0, which does not</span>
    <span class="hljs-comment">// indicate an error or eof. this is equivalent to eagain or ewouldblock</span>
    <span class="hljs-comment">// under read(2).</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// nread &gt; 0</span>
    <span class="hljs-function"><span class="hljs-title">assert</span>(buf-&gt;</span>len &gt;= nread);

    <span class="hljs-function"><span class="hljs-title">peer_state_t</span>* peerstate = (peer_state_t*)client-&gt;</span><span class="hljs-keyword">data</span>;
    <span class="hljs-function"><span class="hljs-title">if</span> (peerstate-&gt;</span>state == initial_ack) {
      <span class="hljs-comment">// if the initial ack hasn't been sent for some reason, ignore whatever</span>
      <span class="hljs-comment">// the client sends in.</span>
      <span class="hljs-function"><span class="hljs-title">free</span>(buf-&gt;</span>base);
      return;
    }

    <span class="hljs-comment">// run the protocol state machine.</span>
    <span class="hljs-keyword">for</span> (int i = <span class="hljs-number">0</span>; i &lt; nread; ++i) {
      <span class="hljs-function"><span class="hljs-title">switch</span> (peerstate-&gt;</span>state) {
      case initial_ack:
        assert(<span class="hljs-number">0</span> &amp;&amp; <span class="hljs-string">"can't reach here"</span>);
        break;
      case wait_for_msg:
        <span class="hljs-function"><span class="hljs-title">if</span> (buf-&gt;</span>base[i] == <span class="hljs-string">'^'</span>) {
          <span class="hljs-function"><span class="hljs-title">peerstate</span>-&gt;</span>state = in_msg;
        }
        break;
      case in_msg:
        <span class="hljs-function"><span class="hljs-title">if</span> (buf-&gt;</span>base[i] == <span class="hljs-string">'$'</span>) {
          <span class="hljs-function"><span class="hljs-title">peerstate</span>-&gt;</span>state = wait_for_msg;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-function"><span class="hljs-title">assert</span>(peerstate-&gt;</span>sendbuf_end &lt; sendbuf_size);
          <span class="hljs-function"><span class="hljs-title">peerstate</span>-&gt;</span><span class="hljs-function"><span class="hljs-title">sendbuf</span>[peerstate-&gt;</span><span class="hljs-function"><span class="hljs-title">sendbuf_end</span>++] = buf-&gt;</span>base[i] + <span class="hljs-number">1</span>;
        }
        break;
      }
    }

    <span class="hljs-function"><span class="hljs-title">if</span> (peerstate-&gt;</span>sendbuf_end &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// we have data to send. the write buffer will point to the buffer stored</span>
      <span class="hljs-comment">// in the peer state for this client.</span>
      uv_buf_t writebuf =
          <span class="hljs-function"><span class="hljs-title">uv_buf_init</span>(peerstate-&gt;</span><span class="hljs-function"><span class="hljs-title">sendbuf</span>, peerstate-&gt;</span>sendbuf_end);
      uv_write_t* writereq = (uv_write_t*)xmalloc(sizeof(*writereq));
      <span class="hljs-function"><span class="hljs-title">writereq</span>-&gt;</span><span class="hljs-keyword">data</span> = peerstate;
      int rc;
      <span class="hljs-keyword">if</span> ((rc = uv_write(writereq, (uv_stream_t*)client, &amp;writebuf, <span class="hljs-number">1</span>,
                         on_wrote_buf)) &lt; <span class="hljs-number">0</span>) {
        die(<span class="hljs-string">"uv_write failed: %s"</span>, uv_strerror(rc));
      }
    }
  }
  <span class="hljs-function"><span class="hljs-title">free</span>(buf-&gt;</span>base);
}

</code></pre><p>这个服务器的运行时行为非常类似于第三部分的事件驱动服务器：所有的客户端都在一个单个的线程中并发处理。并且类似的，一些特定的行为必须在服务器代码中维护：服务器的逻辑实现为一个集成的回调，并且长周期运行是禁止的，因为它会阻塞事件循环。这一点也很类似。让我们进一步探索这个问题。</p>
<h3><a href="#在事件驱动循环中的长周期运行的操作"></a>在事件驱动循环中的长周期运行的操作</h3>
<p>单线程的事件驱动代码使它先天就容易受到一些常见问题的影响：长周期运行的代码会阻塞整个循环。参见如下的程序：</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">on_timer</span><span class="hljs-params">(<span class="hljs-keyword">uv_timer_t</span>* timer)</span> </span>{
  <span class="hljs-keyword">uint64_t</span> timestamp = uv_hrtime();
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">"on_timer [%"</span> PRIu64 <span class="hljs-string">" ms]\n"</span>, (timestamp / <span class="hljs-number">1000000</span>) % <span class="hljs-number">100000</span>);

  <span class="hljs-comment">// "Work"</span>
  <span class="hljs-keyword">if</span> (random() % <span class="hljs-number">5</span> == <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">"Sleeping...\n"</span>);
    sleep(<span class="hljs-number">3</span>);
  }
}

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>** argv)</span> </span>{
  <span class="hljs-keyword">uv_timer_t</span> timer;
  uv_timer_init(uv_default_loop(), &amp;timer);
  uv_timer_start(&amp;timer, on_timer, <span class="hljs-number">0</span>, <span class="hljs-number">1000</span>);
  <span class="hljs-keyword">return</span> uv_run(uv_default_loop(), UV_RUN_DEFAULT);
}

</code></pre><p>它用一个单个注册的回调运行一个 libuv 事件循环：<code>on_timer</code>，它被每秒钟循环调用一次。回调报告一个时间戳，并且，偶尔通过睡眠 3 秒去模拟一个长周期运行。这是运行示例：</p>
<pre><code class="hljs prolog">$ ./uv-timer-sleep-demo
on_timer [<span class="hljs-number">4840</span> ms]
on_timer [<span class="hljs-number">5842</span> ms]
on_timer [<span class="hljs-number">6843</span> ms]
on_timer [<span class="hljs-number">7844</span> ms]
<span class="hljs-symbol">Sleeping</span>...
on_timer [<span class="hljs-number">11845</span> ms]
on_timer [<span class="hljs-number">12846</span> ms]
<span class="hljs-symbol">Sleeping</span>...
on_timer [<span class="hljs-number">16847</span> ms]
on_timer [<span class="hljs-number">17849</span> ms]
on_timer [<span class="hljs-number">18850</span> ms]
...

</code></pre><p><code>on_timer</code> 忠实地每秒执行一次，直到随机出现的睡眠为止。在那个时间点，<code>on_timer</code> 不再被调用，直到睡眠时间结束；事实上，<em>没有其它的回调</em>  会在这个时间帧中被调用。这个睡眠调用阻塞了当前线程，它正是被调用的线程，并且也是事件循环使用的线程。当这个线程被阻塞后，事件循环也被阻塞。</p>
<p>这个示例演示了在事件驱动的调用中为什么回调不能被阻塞是多少的重要。并且，同样适用于 Node.js 服务器、客户端侧的 Javascript、大多数的 GUI 编程框架、以及许多其它的异步编程模型。</p>
<p>但是，有时候运行耗时的任务是不可避免的。并不是所有任务都有一个异步 API；例如，我们可能使用一些仅有同步 API 的库去处理，或者，正在执行一个可能的长周期计算。我们如何用事件驱动编程去结合这些代码？线程可以帮到你！</p>
<h3><a href="#转换-阻塞调用为异步调用的线程"></a>“转换” 阻塞调用为异步调用的线程</h3>
<p>一个线程池可以用于转换阻塞调用为异步调用，通过与事件循环并行运行，并且当任务完成时去由它去公布事件。以阻塞函数 <code>do_work()</code> 为例，这里介绍了它是怎么运行的：</p>
<ol>
<li>不在一个回调中直接调用 <code>do_work()</code> ，而是将它打包进一个 “任务”，让线程池去运行这个任务。当任务完成时，我们也为循环去调用它注册一个回调；我们称它为 <code>on_work_done()</code>。</li>
<li>在这个时间点，我们的回调就可以返回了，而事件循环保持运行；在同一时间点，线程池中的有一个线程运行这个任务。</li>
<li>一旦任务运行完成，通知主线程（指正在运行事件循环的线程），并且事件循环调用 <code>on_work_done()</code>。</li>
</ol>
<p>让我们看一下，使用 libuv 的工作调度 API，是怎么去解决我们前面的计时器/睡眠示例中展示的问题的：</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">on_after_work</span><span class="hljs-params">(<span class="hljs-keyword">uv_work_t</span>* req, <span class="hljs-keyword">int</span> status)</span> </span>{
  <span class="hljs-built_in">free</span>(req);
}

<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">on_work</span><span class="hljs-params">(<span class="hljs-keyword">uv_work_t</span>* req)</span> </span>{
  <span class="hljs-comment">// "Work"</span>
  <span class="hljs-keyword">if</span> (random() % <span class="hljs-number">5</span> == <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">"Sleeping...\n"</span>);
    sleep(<span class="hljs-number">3</span>);
  }
}

<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">on_timer</span><span class="hljs-params">(<span class="hljs-keyword">uv_timer_t</span>* timer)</span> </span>{
  <span class="hljs-keyword">uint64_t</span> timestamp = uv_hrtime();
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">"on_timer [%"</span> PRIu64 <span class="hljs-string">" ms]\n"</span>, (timestamp / <span class="hljs-number">1000000</span>) % <span class="hljs-number">100000</span>);

  <span class="hljs-keyword">uv_work_t</span>* work_req = (<span class="hljs-keyword">uv_work_t</span>*)<span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(*work_req));
  uv_queue_work(uv_default_loop(), work_req, on_work, on_after_work);
}

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>** argv)</span> </span>{
  <span class="hljs-keyword">uv_timer_t</span> timer;
  uv_timer_init(uv_default_loop(), &amp;timer);
  uv_timer_start(&amp;timer, on_timer, <span class="hljs-number">0</span>, <span class="hljs-number">1000</span>);
  <span class="hljs-keyword">return</span> uv_run(uv_default_loop(), UV_RUN_DEFAULT);
}

</code></pre><p>通过一个 <code>work_req</code> ^注2 类型的句柄，我们进入一个任务队列，代替在 <code>on_timer</code> 上直接调用 sleep，这个函数在任务中（<code>on_work</code>）运行，并且，一旦任务完成（<code>on_after_work</code>），这个函数被调用一次。<code>on_work</code> 是指 “work”（阻塞中的/耗时的操作）进行的地方。注意在这两个回调传递到 <code>uv_queue_work</code> 时的一个关键区别：<code>on_work</code> 运行在线程池中，而 <code>on_after_work</code> 运行在事件循环中的主线程上 —— 就好像是其它的回调一样。</p>
<p>让我们看一下这种方式的运行：</p>
<pre><code class="hljs prolog">$ ./uv-timer-work-demo
on_timer [<span class="hljs-number">89571</span> ms]
on_timer [<span class="hljs-number">90572</span> ms]
on_timer [<span class="hljs-number">91573</span> ms]
on_timer [<span class="hljs-number">92575</span> ms]
<span class="hljs-symbol">Sleeping</span>...
on_timer [<span class="hljs-number">93576</span> ms]
on_timer [<span class="hljs-number">94577</span> ms]
<span class="hljs-symbol">Sleeping</span>...
on_timer [<span class="hljs-number">95577</span> ms]
on_timer [<span class="hljs-number">96578</span> ms]
on_timer [<span class="hljs-number">97578</span> ms]
...

</code></pre><p>即便在 sleep 函数被调用时，定时器也每秒钟滴答一下，睡眠现在运行在一个单独的线程中，并且不会阻塞事件循环。</p>
<h3><a href="#一个用于练习的素数测试服务器"></a>一个用于练习的素数测试服务器</h3>
<p>因为通过睡眠去模拟工作并不是件让人兴奋的事，我有一个事先准备好的更综合的一个示例 —— 一个基于套接字接受来自客户端的数字的服务器，检查这个数字是否是素数，然后去返回一个 “prime" 或者 “composite”。完整的 <a href="https://github.com/eliben/code-for-blog/blob/master/2017/async-socket-server/uv-isprime-server.c">服务器代码在这里</a> —— 我不在这里粘贴了，因为它太长了，更希望读者在一些自己的练习中去体会它。</p>
<p>这个服务器使用了一个原生的素数测试算法，因此，对于大的素数可能花很长时间才返回一个回答。在我的机器中，对于 2305843009213693951，它花了 ~5 秒钟去计算，但是，你的方法可能不同。</p>
<p>练习 1：服务器有一个设置（通过一个名为 <code>MODE</code> 的环境变量）要么在套接字回调（意味着在主线程上）中运行素数测试，要么在 libuv 工作队列中。当多个客户端同时连接时，使用这个设置来观察服务器的行为。当它计算一个大的任务时，在阻塞模式中，服务器将不回复其它客户端，而在非阻塞模式中，它会回复。</p>
<p>练习 2：libuv 有一个缺省大小的线程池，并且线程池的大小可以通过环境变量配置。你可以通过使用多个客户端去实验找出它的缺省值是多少？找到线程池缺省值后，使用不同的设置去看一下，在重负载下怎么去影响服务器的响应能力。</p>
<h3><a href="#在非阻塞文件系统中使用工作队列"></a>在非阻塞文件系统中使用工作队列</h3>
<p>对于只是呆板的演示和 CPU 密集型的计算来说，将可能的阻塞操作委托给一个线程池并不是明智的；libuv 在它的文件系统 API 中本身就大量使用了这种能力。通过这种方式，libuv 使用一个异步 API，以一个轻便的方式显示出它强大的文件系统的处理能力。</p>
<p>让我们使用 <code>uv_fs_read()</code>，例如，这个函数从一个文件中（表示为一个 <code>uv_fs_t</code> 句柄）读取一个文件到一个缓冲中 ^注3，并且当读取完成后调用一个回调。换句话说，<code>uv_fs_read()</code> 总是立即返回，即使是文件在一个类似 NFS 的系统上，而数据到达缓冲区可能需要一些时间。换句话说，这个 API 与这种方式中其它的 libuv API 是异步的。这是怎么工作的呢？</p>
<p>在这一点上，我们看一下 libuv 的底层；内部实际上非常简单，并且它是一个很好的练习。作为一个可移植的库，libuv 对于 Windows 和 Unix 系统在它的许多函数上有不同的实现。我们去看一下在 libuv 源树中的 <code>src/unix/fs.c</code>。</p>
<p>这是 <code>uv_fs_read</code> 的代码：</p>
<pre><code class="hljs xl">int uv_fs_read(uv_loop_t* <span class="hljs-keyword">loop</span>, uv_fs_t* req,
               uv_file file,
               const uv_buf_t bufs[],
               unsigned int nbufs,
               int64_t off,
               uv_fs_cb cb) {
  <span class="hljs-keyword">if</span> (bufs == NULL || nbufs == <span class="hljs-number">0</span>)
    return -EINVAL;

  INIT(READ);
  <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>file = file;

  <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>nbufs = nbufs;
  <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span><span class="hljs-function"><span class="hljs-title">bufs</span> = req-&gt;</span>bufsml;
  <span class="hljs-function"><span class="hljs-title">if</span> (nbufs &gt; ARRAY_SIZE(req-&gt;</span>bufsml))
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>bufs = uv__malloc(nbufs * sizeof(*bufs));

  <span class="hljs-function"><span class="hljs-title">if</span> (req-&gt;</span>bufs == NULL) {
    <span class="hljs-keyword">if</span> (cb != NULL)
      uv__req_unregister(<span class="hljs-keyword">loop</span>, req);
    return -ENOMEM;
  }

  <span class="hljs-function"><span class="hljs-title">memcpy</span>(req-&gt;</span>bufs, bufs, nbufs * sizeof(*bufs));

  <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>off = off;
  POST;
}

</code></pre><p>第一次看可能觉得很困难，因为它延缓真实的工作到 <code>INIT</code> 和 <code>POST</code> 宏中，以及为 <code>POST</code> 设置了一些本地变量。这样做可以避免了文件中的许多重复代码。</p>
<p>这是 <code>INIT</code> 宏：</p>
<pre><code class="hljs xl">#define INIT(subtype)                                                         \
  <span class="hljs-keyword">do</span> {                                                                        \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>type = UV_FS;                                                        \
    <span class="hljs-keyword">if</span> (cb != NULL)                                                           \
      uv__req_init(<span class="hljs-keyword">loop</span>, req, UV_FS);                                         \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>fs_type = UV_FS_ ## subtype;                                         \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>result = <span class="hljs-number">0</span>;                                                          \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>ptr = NULL;                                                          \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span><span class="hljs-keyword">loop</span> = <span class="hljs-keyword">loop</span>;                                                         \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span><span class="hljs-built_in">path</span> = NULL;                                                         \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>new_path = NULL;                                                     \
    <span class="hljs-function"><span class="hljs-title">req</span>-&gt;</span>cb = cb;                                                             \
  }                                                                           \
  <span class="hljs-keyword">while</span> (<span class="hljs-number">0</span>)

</code></pre><p>它设置了请求，并且更重要的是，设置 <code>req-&gt;fs_type</code> 域为真实的 FS 请求类型。因为 <code>uv_fs_read</code> 调用 <code>INIT(READ)</code>，它意味着 <code>req-&gt;fs_type</code> 被分配一个常数 <code>UV_FS_READ</code>。</p>
<p>这是 <code>POST</code> 宏：</p>
<pre><code class="hljs livescript"><span class="hljs-comment">#define POST                                                                  \</span>
  <span class="hljs-keyword">do</span> {                                                                        <span class="hljs-string">\</span>
    <span class="hljs-keyword">if</span> (cb != NULL) {                                                         <span class="hljs-string">\</span>
      uv__work_submit(<span class="hljs-keyword">loop</span>, &amp;req-&gt;work_req, uv__fs_work, uv__fs_done);        <span class="hljs-string">\</span>
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;                                                               <span class="hljs-string">\</span>
    }                                                                         <span class="hljs-string">\</span>
    <span class="hljs-keyword">else</span> {                                                                    <span class="hljs-string">\</span>
      uv__fs_work(&amp;req-&gt;work_req);                                            <span class="hljs-string">\</span>
      <span class="hljs-keyword">return</span> req-&gt;result;                                                     <span class="hljs-string">\</span>
    }                                                                         <span class="hljs-string">\</span>
  }                                                                           <span class="hljs-string">\</span>
  <span class="hljs-keyword">while</span> (<span class="hljs-number">0</span>)

</code></pre><p>它做什么取决于回调是否为 <code>NULL</code>。在 libuv 文件系统 API 中，一个 <code>NULL</code> 回调意味着我们真实地希望去执行一个 _同步_ 操作。在这种情况下，<code>POST</code> 直接调用 <code>uv__fs_work</code>（我们需要了解一下这个函数的功能），而对于一个非 <code>NULL</code> 回调，它把 <code>uv__fs_work</code> 作为一个工作项提交到工作队列（指的是线程池），然后，注册 <code>uv__fs_done</code> 作为回调；该函数执行一些登记并调用用户提供的回调。</p>
<p>如果我们去看 <code>uv__fs_work</code> 的代码，我们将看到它使用很多宏按照需求将工作分发到实际的文件系统调用。在我们的案例中，对于 <code>UV_FS_READ</code> 这个调用将被 <code>uv__fs_read</code> 生成，它（最终）使用普通的 POSIX API 去读取。这个函数可以在一个 _阻塞_ 方式中很安全地实现。因为，它通过异步 API 调用时被置于一个线程池中。</p>
<p>在 Node.js 中，<code>fs.readFile</code> 函数是映射到 <code>uv_fs_read</code> 上。因此，可以在一个非阻塞模式中读取文件，甚至是当底层文件系统 API 是阻塞方式时。</p>
<hr>
<ul>
<li>注1： 为确保服务器不泄露内存，我在一个启用泄露检查的 Valgrind 中运行它。因为服务器经常是被设计为永久运行，这是一个挑战；为克服这个问题，我在服务器上添加了一个 “kill 开关” —— 一个从客户端接收的特定序列，以使它可以停止事件循环并退出。这个代码在 <code>theon_wrote_buf</code> 句柄中。</li>
<li>注2： 在这里我们不过多地使用 <code>work_req</code>；讨论的素数测试服务器接下来将展示怎么被用于去传递上下文信息到回调中。</li>
<li>注3： <code>uv_fs_read()</code> 提供了一个类似于 <code>preadv</code> Linux 系统调用的通用 API：它使用多缓冲区用于排序，并且支持一个到文件中的偏移。基于我们讨论的目的可以忽略这些特性。</li>
</ul>
<hr>
<p>via: <a href="https://eli.thegreenplace.net/2017/concurrent-servers-part-4-libuv/">https://eli.thegreenplace.net/2017/concurrent-servers-part-4-libuv/</a></p>
<p>作者：<a href="https://eli.thegreenplace.net/">Eli Bendersky</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
并发服务器（四）：libuv

## 原文链接
[https://www.zcfy.cc/article/concurrent-servers-part-4-libuv](https://www.zcfy.cc/article/concurrent-servers-part-4-libuv)


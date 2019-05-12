---
title: '通过源码解析 Node.js 中进程间通信中的 socket 句柄传递' 
date: 2019-02-10 2:30:42
hidden: true
slug: ow2s4ieow6
categories: [reprint]
---

{{< raw >}}

                    
<p>在 Node.js 中，当我们使用 <code>child_process</code> 模块创建子进程后，会返回一个 <code>ChildProcess</code> 类的实例，通过调用 <code>ChildProcess#send(message[, sendHandle[, options]][, callback])</code> 方法，我们可以实现与子进程的通信，其中的 <code>sendHandle</code> 参数支持传递 <code>net.Server</code> ，<code>net.Socket</code> 等多种句柄，使用它，我们可以很轻松的实现在进程间转发 TCP socket：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parent.js
'use stirct'
const { createServer } = require('net')
const { fork } = require('child_process')

const server = createServer()
const child = fork('./child.js')

server.on('connection', function (socket) {
  child.send('socket', socket)
})
.listen(1337)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// parent.js</span>
<span class="hljs-string">'use stirct'</span>
<span class="hljs-keyword">const</span> { createServer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>)
<span class="hljs-keyword">const</span> { fork } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>)

<span class="hljs-keyword">const</span> server = createServer()
<span class="hljs-keyword">const</span> child = fork(<span class="hljs-string">'./child.js'</span>)

server.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">socket</span>) </span>{
  child.send(<span class="hljs-string">'socket'</span>, socket)
})
.listen(<span class="hljs-number">1337</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// child.js
'use strict'

process.on('message', function (message, socket) {
  if (message === 'socket') socket.end('Child handled it.')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// child.js</span>
<span class="hljs-meta">'use strict'</span>

process.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">message, socket</span>) </span>{
  <span class="hljs-keyword">if</span> (message === <span class="hljs-string">'socket'</span>) socket.end(<span class="hljs-string">'Child handled it.'</span>)
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ curl 127.0.0.1:1337
Child handled it." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>$ curl <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">1337</span>
Child handled it.</code></pre>
<p>这时你可能就会疑问，此时 socket 已经处在了另一个进程中，那么像 <code>net.Server#getConnections</code>，<code>net.Server#close</code> 等等这些方法，该怎么实现其功能呢？传递的句柄都是 JavaScript 对象，它们在传递时，序列化和反序列化的机制，又是怎么样的呢？</p>
<p>让我们跟着 Node.js 项目中的 <code>lib/child_process.js</code>，<code>lib/internal/child_process.js</code>，<code>lib/internal/process.js</code> 等文件中的代码，来一探究竟。</p>
<h2 id="articleHeader0">序列化与反序列化</h2>
<p>当使用 <code>child_process</code> 模块中的 <code>fork</code> 函数创建 <code>ChildProcess</code> 类的实例时，会在建立 IPC channel 时，初始化 <code>ChildProcess#send</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/internal/child_process.js
// ...

function setupChannel(target, channel) { 
  // 此处的 target，即为正在创建的 ChildProcess 类实例
  target._channel = channel;
  target._handleQueue = null;
  // ...
  
  target.send = function(message, handle, options, callback) {
    // ...
    if (this.connected) {
      return this._send(message, handle, options, callback);
    }
    // ...
  };
  
  target._send = function(message, handle, options, callback) {
    assert(this.connected || this._channel);
    // ...
    if (handle) {
      message = {
        cmd: 'NODE_HANDLE',
        type: null,
        msg: message
      };

      if (handle instanceof net.Socket) {
        message.type = 'net.Socket';
      } else if (handle instanceof net.Server) {
        message.type = 'net.Server';
      } else if (handle instanceof TCP || handle instanceof Pipe) {
        message.type = 'net.Native';
      } else if (handle instanceof dgram.Socket) {
        message.type = 'dgram.Socket';
      } else if (handle instanceof UDP) {
        message.type = 'dgram.Native';
      } else {
        throw new TypeError('This handle type can\'t be sent');
      }

      var obj = handleConversion[message.type];
      handle = handleConversion[message.type].send.call(target,
                                                        message,
                                                        handle,
                                                        options);
    // ...
    var req = new WriteWrap();
    req.async = false;

    var string = JSON.stringify(message) + '\n';
    var err = channel.writeUtf8String(req, string, handle);
    // ...
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/internal/child_process.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setupChannel</span>(<span class="hljs-params">target, channel</span>) </span>{ 
  <span class="hljs-comment">// 此处的 target，即为正在创建的 ChildProcess 类实例</span>
  target._channel = channel;
  target._handleQueue = <span class="hljs-literal">null</span>;
  <span class="hljs-comment">// ...</span>
  
  target.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle, options, callback</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.connected) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._send(message, handle, options, callback);
    }
    <span class="hljs-comment">// ...</span>
  };
  
  target._send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle, options, callback</span>) </span>{
    assert(<span class="hljs-keyword">this</span>.connected || <span class="hljs-keyword">this</span>._channel);
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (handle) {
      message = {
        <span class="hljs-attr">cmd</span>: <span class="hljs-string">'NODE_HANDLE'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">msg</span>: message
      };

      <span class="hljs-keyword">if</span> (handle <span class="hljs-keyword">instanceof</span> net.Socket) {
        message.type = <span class="hljs-string">'net.Socket'</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (handle <span class="hljs-keyword">instanceof</span> net.Server) {
        message.type = <span class="hljs-string">'net.Server'</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (handle <span class="hljs-keyword">instanceof</span> TCP || handle <span class="hljs-keyword">instanceof</span> Pipe) {
        message.type = <span class="hljs-string">'net.Native'</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (handle <span class="hljs-keyword">instanceof</span> dgram.Socket) {
        message.type = <span class="hljs-string">'dgram.Socket'</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (handle <span class="hljs-keyword">instanceof</span> UDP) {
        message.type = <span class="hljs-string">'dgram.Native'</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'This handle type can\'t be sent'</span>);
      }

      <span class="hljs-keyword">var</span> obj = handleConversion[message.type];
      handle = handleConversion[message.type].send.call(target,
                                                        message,
                                                        handle,
                                                        options);
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">var</span> req = <span class="hljs-keyword">new</span> WriteWrap();
    req.async = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">var</span> string = <span class="hljs-built_in">JSON</span>.stringify(message) + <span class="hljs-string">'\n'</span>;
    <span class="hljs-keyword">var</span> err = channel.writeUtf8String(req, string, handle);
    <span class="hljs-comment">// ...</span>
  };
}</code></pre>
<p>从代码我们可以看到，当我们带着句柄调用 <code>ChildProcess#send</code> 方法发送消息时，Node.js 会替我们先将该消息封装成它的内部消息（将消息包在对象中，且对象拥有一个 <code>cmd</code> 属性）。句柄的序列化，使用到的是 <code>handleConversion[message.type].send</code> 方法，在传递的是 socket 时，即为 <code>handleConversion['net.Socket'].send</code>。</p>
<p>所以关键一定就是在 <code>handleConversion</code> 这个对象上了，我们先不着急看它的如山真面如。让我们先来看看子进程反序列化时的关键步骤代码。</p>
<p>在子进程启动时，若发现自己是通过 <code>child_process</code> 模块创建的进程（环境变量中带有 <code>NODE_CHANNEL_FD</code>），则最后也会执行上述的 <code>lib/internal/child_process.js</code> 文件中的 <code>setupChannel</code> 初始化函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/internal/process.js
// ...
function setupChannel() {
  if (process.env.NODE_CHANNEL_FD) {
    var fd = parseInt(process.env.NODE_CHANNEL_FD, 10);
    delete process.env.NODE_CHANNEL_FD;

    var cp = require('child_process');
    // ...
    cp._forkChild(fd);
    assert(process.send);
  }
}

// lib/child_process.js
// ...
const child_process = require('internal/child_process');
const setupChannel = child_process.setupChannel;

exports._forkChild = function(fd) {
  // ...
  const control = setupChannel(process, p);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/internal/process.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setupChannel</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (process.env.NODE_CHANNEL_FD) {
    <span class="hljs-keyword">var</span> fd = <span class="hljs-built_in">parseInt</span>(process.env.NODE_CHANNEL_FD, <span class="hljs-number">10</span>);
    <span class="hljs-keyword">delete</span> process.env.NODE_CHANNEL_FD;

    <span class="hljs-keyword">var</span> cp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
    <span class="hljs-comment">// ...</span>
    cp._forkChild(fd);
    assert(process.send);
  }
}

<span class="hljs-comment">// lib/child_process.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'internal/child_process'</span>);
<span class="hljs-keyword">const</span> setupChannel = child_process.setupChannel;

exports._forkChild = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fd</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">const</span> control = setupChannel(process, p);
};</code></pre>
<p>以下函数与上上个例子的中函数为同一个，只不过于子进程中执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/internal/child_process.js
// ...
function setupChannel(target, channel) {
  target._channel = channel;
  target._handleQueue = null;
  // ...
  target.on('internalMessage', function(message, handle) {
    // ...
    if (message.cmd !== 'NODE_HANDLE') return;
    var obj = handleConversion[message.type];
    
    obj.got.call(this, message, handle, function(handle) {
      handleMessage(target, message.msg, handle);
    });
  });
}

function handleMessage(target, message, handle) {
  if (!target._channel)
    return;

  var eventName = 'message';
  if (message !== null &amp;&amp;
      typeof message === 'object' &amp;&amp;
      typeof message.cmd === 'string' &amp;&amp;
      message.cmd.length > INTERNAL_PREFIX.length &amp;&amp;
      message.cmd.slice(0, INTERNAL_PREFIX.length) === INTERNAL_PREFIX) {
    eventName = 'internalMessage';
  }
  target.emit(eventName, message, handle);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/internal/child_process.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setupChannel</span>(<span class="hljs-params">target, channel</span>) </span>{
  target._channel = channel;
  target._handleQueue = <span class="hljs-literal">null</span>;
  <span class="hljs-comment">// ...</span>
  target.on(<span class="hljs-string">'internalMessage'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (message.cmd !== <span class="hljs-string">'NODE_HANDLE'</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> obj = handleConversion[message.type];
    
    obj.got.call(<span class="hljs-keyword">this</span>, message, handle, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">handle</span>) </span>{
      handleMessage(target, message.msg, handle);
    });
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleMessage</span>(<span class="hljs-params">target, message, handle</span>) </span>{
  <span class="hljs-keyword">if</span> (!target._channel)
    <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">var</span> eventName = <span class="hljs-string">'message'</span>;
  <span class="hljs-keyword">if</span> (message !== <span class="hljs-literal">null</span> &amp;&amp;
      <span class="hljs-keyword">typeof</span> message === <span class="hljs-string">'object'</span> &amp;&amp;
      <span class="hljs-keyword">typeof</span> message.cmd === <span class="hljs-string">'string'</span> &amp;&amp;
      message.cmd.length &gt; INTERNAL_PREFIX.length &amp;&amp;
      message.cmd.slice(<span class="hljs-number">0</span>, INTERNAL_PREFIX.length) === INTERNAL_PREFIX) {
    eventName = <span class="hljs-string">'internalMessage'</span>;
  }
  target.emit(eventName, message, handle);
}</code></pre>
<p>显而易见，使用了 <code>handleConversion[message.type].got</code> 来进行句柄的反序列化，使之构建成 JavaScript 对象。所以我们不难想到，句柄序列化 &amp; 反序列化运用的就是，各个 <code>handleConversion[message.type]</code> 对象中提供的同一方法 <code>send</code> 和 <code>got</code> 。打个比方就像 Java 中的这些 <code>class</code> 都实现了同一个 <code>interface</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/internal/child_process.js
// ...

const handleConversion = {
  // ...
  'net.Server': {
    // ...
    send: function(message, server, options) {
      return server._handle;
    },
    got: function(message, handle, emit) {
      var server = new net.Server();
      server.listen(handle, function() {
        emit(server);
      });
    }
  },

  'net.Socket': {
    send: function(message, socket, options) {
      // ...
    },

    got: function(message, handle, emit) {
      // ...
    }
  },
  'dgram.Socket': {
    send: function(message, socket, options) {
      // ...
    },
    got: function(message, handle, emit) {
      // ...
    }
  }
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/internal/child_process.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> handleConversion = {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-string">'net.Server'</span>: {
    <span class="hljs-comment">// ...</span>
    send: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, server, options</span>) </span>{
      <span class="hljs-keyword">return</span> server._handle;
    },
    <span class="hljs-attr">got</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle, emit</span>) </span>{
      <span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> net.Server();
      server.listen(handle, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        emit(server);
      });
    }
  },

  <span class="hljs-string">'net.Socket'</span>: {
    <span class="hljs-attr">send</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, socket, options</span>) </span>{
      <span class="hljs-comment">// ...</span>
    },

    <span class="hljs-attr">got</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle, emit</span>) </span>{
      <span class="hljs-comment">// ...</span>
    }
  },
  <span class="hljs-string">'dgram.Socket'</span>: {
    <span class="hljs-attr">send</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, socket, options</span>) </span>{
      <span class="hljs-comment">// ...</span>
    },
    <span class="hljs-attr">got</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle, emit</span>) </span>{
      <span class="hljs-comment">// ...</span>
    }
  }
  <span class="hljs-comment">// ...</span>
};</code></pre>
<p>所以传递的过程：</p>
<p>主进程：</p>
<ul>
<li><p>传递消息和句柄。</p></li>
<li><p>将消息包装成内部消息，使用 <code>JSON.stringify</code> 序列化为字符串。</p></li>
<li><p>通过对应的 <code>handleConversion[message.type].send</code> 方法序列化句柄。</p></li>
<li><p>将序列化后的字符串和句柄发入 IPC channel 。</p></li>
</ul>
<p>子进程</p>
<ul>
<li><p>使用 <code>JSON.parse</code> 反序列化消息字符串为消息对象。</p></li>
<li><p>触发内部消息事件（<code>internalMessage</code>）监听器。</p></li>
<li><p>将传递来的句柄使用 <code>handleConversion[message.type].got</code> 方法反序列化为 JavaScript 对象。</p></li>
<li><p>带着消息对象中的具体消息内容和反序列化后的句柄对象，触发用户级别事件。</p></li>
</ul>
<h2 id="articleHeader1">
<code>net.Server#getConnections</code> 等方法的功能实现</h2>
<p>由于将 socket 传递给了子进程之后，<code>net.Server#getConnections</code>，<code>net.Server#close</code> 等等方法，原来的实现已经无效了，为了保证功能，Node.js 又是怎么办的呢？答案可以大致概括为，父子进程之间，在同一地址下的 socket 传递时，各自都额外维护一个关联列表存储这些 socket 信息和 <code>ChildProcess</code> 实例，并且父进程中的 <code>net#Server</code> 类实例自己保存下所有父进程关联列表。在调用 <code>net.Server#getConnections</code> 这类方法时，遍历列表中的 <code>ChildPorcess</code> 实例发送内部消息，子进程列表中的对应项收到内部消息并处理返回，父进程中再结合返回结果和对应着这个 <code>ChildProcess</code> 类实例维护的 socket 信息，保证功能的正确性。</p>
<p><code>lib/internal/socket_list.js</code> 这个文件中，分别定义了这两个列表类，分别名为 <code>SocketListSend</code> 和 <code>SocketListReceive</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/internal/socket_list.js
// ...
function SocketListSend(slave, key) {
  EventEmitter.call(this);

  this.key = key;
  this.slave = slave;
}
util.inherits(SocketListSend, EventEmitter);

// ...
function SocketListReceive(slave, key) {
  EventEmitter.call(this);

  this.connections = 0;
  this.key = key;
  this.slave = slave;
  // ...
}
util.inherits(SocketListReceive, EventEmitter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/internal/socket_list.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SocketListSend</span>(<span class="hljs-params">slave, key</span>) </span>{
  EventEmitter.call(<span class="hljs-keyword">this</span>);

  <span class="hljs-keyword">this</span>.key = key;
  <span class="hljs-keyword">this</span>.slave = slave;
}
util.inherits(SocketListSend, EventEmitter);

<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SocketListReceive</span>(<span class="hljs-params">slave, key</span>) </span>{
  EventEmitter.call(<span class="hljs-keyword">this</span>);

  <span class="hljs-keyword">this</span>.connections = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.key = key;
  <span class="hljs-keyword">this</span>.slave = slave;
  <span class="hljs-comment">// ...</span>
}
util.inherits(SocketListReceive, EventEmitter);</code></pre>
<p>然后在 <code>net.Socket</code> 句柄的序列化和反序列化过程中，将句柄和进程推入列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/internal/child_process.js
// ...

const handleConversion = {
  // ...
  send: function(message, socket, options) {
    // ...
    if (socket.server) {
      // ...
      var firstTime = !this._channel.sockets.send[message.key];
      var socketList = getSocketList('send', this, message.key);

      if (firstTime) socket.server._setupSlave(socketList);
    }
    // ...
    return handle;
  },
  
  got: function(message, handle, emit) {
    var socket = new net.Socket({handle: handle});
    socket.readable = socket.writable = true;
    if (message.key) {
      var socketList = getSocketList('got', this, message.key);
      socketList.add({
        socket: socket
      });
    }

    emit(socket);
  }
}

function getSocketList(type, slave, key) {
  // slave 对象即为当前正在创建的 ChildProcess 类实例
  var sockets = slave._channel.sockets[type];
  var socketList = sockets[key];
  if (!socketList) {
    var Construct = type === 'send' ? SocketListSend : SocketListReceive;
    socketList = sockets[key] = new Construct(slave, key);
  }
  return socketList;
}

// lib/net.js
// ...
Server.prototype._setupSlave = function(socketList) {
  this._usingSlaves = true;
  this._slaves.push(socketList);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/internal/child_process.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> handleConversion = {
  <span class="hljs-comment">// ...</span>
  send: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, socket, options</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (socket.server) {
      <span class="hljs-comment">// ...</span>
      <span class="hljs-keyword">var</span> firstTime = !<span class="hljs-keyword">this</span>._channel.sockets.send[message.key];
      <span class="hljs-keyword">var</span> socketList = getSocketList(<span class="hljs-string">'send'</span>, <span class="hljs-keyword">this</span>, message.key);

      <span class="hljs-keyword">if</span> (firstTime) socket.server._setupSlave(socketList);
    }
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> handle;
  },
  
  <span class="hljs-attr">got</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, handle, emit</span>) </span>{
    <span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> net.Socket({<span class="hljs-attr">handle</span>: handle});
    socket.readable = socket.writable = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (message.key) {
      <span class="hljs-keyword">var</span> socketList = getSocketList(<span class="hljs-string">'got'</span>, <span class="hljs-keyword">this</span>, message.key);
      socketList.add({
        <span class="hljs-attr">socket</span>: socket
      });
    }

    emit(socket);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSocketList</span>(<span class="hljs-params">type, slave, key</span>) </span>{
  <span class="hljs-comment">// slave 对象即为当前正在创建的 ChildProcess 类实例</span>
  <span class="hljs-keyword">var</span> sockets = slave._channel.sockets[type];
  <span class="hljs-keyword">var</span> socketList = sockets[key];
  <span class="hljs-keyword">if</span> (!socketList) {
    <span class="hljs-keyword">var</span> Construct = type === <span class="hljs-string">'send'</span> ? SocketListSend : SocketListReceive;
    socketList = sockets[key] = <span class="hljs-keyword">new</span> Construct(slave, key);
  }
  <span class="hljs-keyword">return</span> socketList;
}

<span class="hljs-comment">// lib/net.js</span>
<span class="hljs-comment">// ...</span>
Server.prototype._setupSlave = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socketList</span>) </span>{
  <span class="hljs-keyword">this</span>._usingSlaves = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">this</span>._slaves.push(socketList);
};</code></pre>
<p>然后在调用具体方法时，遍历列表，结合通信来的结果，再返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/net.js
// ...

Server.prototype.getConnections = function(cb) {
  // ...
  if (!this._usingSlaves) {
    return end(null, this._connections);
  }
  var left = this._slaves.length;
  var total = this._connections;

  function oncount(err, count) {
    if (err) {
      left = -1;
      return end(err);
    }

    total += count;
    if (--left === 0) return end(null, total);
  }

  this._slaves.forEach(function(slave) {
    slave.getConnections(oncount);
  }); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/net.js</span>
<span class="hljs-comment">// ...</span>

Server.prototype.getConnections = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._usingSlaves) {
    <span class="hljs-keyword">return</span> end(<span class="hljs-literal">null</span>, <span class="hljs-keyword">this</span>._connections);
  }
  <span class="hljs-keyword">var</span> left = <span class="hljs-keyword">this</span>._slaves.length;
  <span class="hljs-keyword">var</span> total = <span class="hljs-keyword">this</span>._connections;

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">oncount</span>(<span class="hljs-params">err, count</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
      left = <span class="hljs-number">-1</span>;
      <span class="hljs-keyword">return</span> end(err);
    }

    total += count;
    <span class="hljs-keyword">if</span> (--left === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> end(<span class="hljs-literal">null</span>, total);
  }

  <span class="hljs-keyword">this</span>._slaves.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">slave</span>) </span>{
    slave.getConnections(oncount);
  }); 
}</code></pre>
<p>即遍历了 <code>_salves&lt;SocketListSend&gt;</code> 列表调用各项其上的 <code>getConnections</code> 方法（封装了 IPC 通信和内部事件逻辑）。</p>
<p>当我们解析好了 <code>net.Server#getConnections</code> 方法后，其他类似需求方法的解决方案，其实也大同小异，思路是一致的。涉及的东西有点多，上一个简单的图示（顺序为黑，蓝，红）：</p>
<p><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/FmEBE6PkrYsVP28m-Jgu1kuUngkT" src="https://static.alili.tech//dn-cnode.qbox.me/FmEBE6PkrYsVP28m-Jgu1kuUngkT" alt="2.pic_hd.jpg" title="2.pic_hd.jpg" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">最后</h2>
<p>参考：</p>
<ul>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/child_process.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/child_process.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/net.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/net.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/internal/process.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/internal/process.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/internal/child_process.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/internal/child_process.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/internal/socket_list.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/internal/socket_list.js</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过源码解析 Node.js 中进程间通信中的 socket 句柄传递

## 原文链接
[https://segmentfault.com/a/1190000005069010](https://segmentfault.com/a/1190000005069010)


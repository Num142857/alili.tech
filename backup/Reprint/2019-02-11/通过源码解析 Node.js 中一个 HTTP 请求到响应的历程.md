---
title: '通过源码解析 Node.js 中一个 HTTP 请求到响应的历程' 
date: 2019-02-11 2:30:49
hidden: true
slug: a0dlgupkmfb
categories: [reprint]
---

{{< raw >}}

                    
<p>如果大家使用 Node.js 写过 web 应用，那么你一定使用过 <code>http</code> 模块。在 Node.js 中，起一个 HTTP server 十分简单，短短数行即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use stirct'
const { createServer } = require('http')

createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World\n')
})
.listen(3000, function () { console.log('Listening on port 3000') })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'use stirct'</span>
<span class="hljs-keyword">const</span> { createServer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)

createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span> })
  res.end(<span class="hljs-string">'Hello World\n'</span>)
})
.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening on port 3000'</span>) })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ curl localhost:3000
Hello World" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>curl <span class="hljs-symbol">localhost:</span><span class="hljs-number">3000</span>
Hello World</code></pre>
<p>就这么简单，因为 Node.js 把许多细节都已在源码中封装好了，主要代码在 <code>lib/_http_*.js</code> 这些文件中，现在就让我们照着上述代码，看看从一个 HTTP 请求的到来直到响应，Node.js 都为我们在源码层做了些什么。</p>
<h2 id="articleHeader0">HTTP 请求的来到</h2>
<p>在 Node.js 中，若要收到一个 HTTP 请求，首先需要创建一个 <code>http.Server</code> 类的实例，然后监听它的 <code>request</code> 事件。由于 HTTP 协议属于应用层，在下层的传输层通常使用的是 TCP 协议，所以 <code>net.Server</code> 类正是 <code>http.Server</code> 类的父类。具体的 HTTP 相关的部分，是通过监听 <code>net.Server</code> 类实例的 <code>connection</code> 事件封装的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/_http_server.js
// ...

function Server(requestListener) {
  if (!(this instanceof Server)) return new Server(requestListener);
  net.Server.call(this, { allowHalfOpen: true });

  if (requestListener) {
    this.addListener('request', requestListener);
  }

  // ...
  this.addListener('connection', connectionListener);

  // ...
}
util.inherits(Server, net.Server);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/_http_server.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Server</span>(<span class="hljs-params">requestListener</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Server)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Server(requestListener);
  net.Server.call(<span class="hljs-keyword">this</span>, { <span class="hljs-attr">allowHalfOpen</span>: <span class="hljs-literal">true</span> });

  <span class="hljs-keyword">if</span> (requestListener) {
    <span class="hljs-keyword">this</span>.addListener(<span class="hljs-string">'request'</span>, requestListener);
  }

  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">this</span>.addListener(<span class="hljs-string">'connection'</span>, connectionListener);

  <span class="hljs-comment">// ...</span>
}
util.inherits(Server, net.Server);</code></pre>
<p>这时，则需要一个 HTTP parser 来解析通过 TCP 传输过来的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/_http_server.js
const parsers = common.parsers;
// ...

function connectionListener(socket) {
  // ...
  var parser = parsers.alloc();
  parser.reinitialize(HTTPParser.REQUEST);
  parser.socket = socket;
  socket.parser = parser;
  parser.incoming = null;
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/_http_server.js</span>
<span class="hljs-keyword">const</span> parsers = common.parsers;
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connectionListener</span>(<span class="hljs-params">socket</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> parser = parsers.alloc();
  parser.reinitialize(HTTPParser.REQUEST);
  parser.socket = socket;
  socket.parser = parser;
  parser.incoming = <span class="hljs-literal">null</span>;
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>值得一提的是，parser 是从一个“池”中获取的，这个“池”使用了一种叫做 <em>free list</em>（<a href="https://en.wikipedia.org/wiki/Free_list" rel="nofollow noreferrer" target="_blank">wiki</a>）的数据结构，实现很简单，个人觉得是为了尽可能的对 parser 进行重用，并避免了不断调用构造函数的消耗，且设有数量上限（<code>http</code> 模块中为 <code>1000</code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/freelist.js
'use strict';

exports.FreeList = function(name, max, constructor) {
  this.name = name;
  this.constructor = constructor;
  this.max = max;
  this.list = [];
};


exports.FreeList.prototype.alloc = function() {
  return this.list.length ? this.list.pop() :
                            this.constructor.apply(this, arguments);
};


exports.FreeList.prototype.free = function(obj) {
  if (this.list.length < this.max) {
    this.list.push(obj);
    return true;
  }
  return false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/freelist.js</span>
<span class="hljs-meta">'use strict'</span>;

exports.FreeList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, max, constructor</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.constructor = <span class="hljs-keyword">constructor</span>;
  this.max = max;
  this.list = [];
};


exports.FreeList.prototype.alloc = function() {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.list.length ? <span class="hljs-keyword">this</span>.list.pop() :
                            <span class="hljs-keyword">this</span>.constructor.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
};


exports.FreeList.prototype.free = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.list.length &lt; <span class="hljs-keyword">this</span>.max) {
    <span class="hljs-keyword">this</span>.list.push(obj);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};</code></pre>
<p>由于数据是从 TCP 不断推入的，所以这里的 parser 也是基于事件的，很符合 Node.js 的核心思想。使用的是 <a href="https://github.com/nodejs/http-parser" rel="nofollow noreferrer" target="_blank">http-parser</a> 这个库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/_http_common.js
// ...
const binding = process.binding('http_parser');
const HTTPParser = binding.HTTPParser;
const FreeList = require('internal/freelist').FreeList;
// ...

var parsers = new FreeList('parsers', 1000, function() {
  var parser = new HTTPParser(HTTPParser.REQUEST);
  // ...
  parser[kOnHeaders] = parserOnHeaders;
  parser[kOnHeadersComplete] = parserOnHeadersComplete; 
  parser[kOnBody] = parserOnBody; 
  parser[kOnMessageComplete] = parserOnMessageComplete;
  parser[kOnExecute] = null; 

  return parser;
});
exports.parsers = parsers;

// lib/_http_server.js
// ...

function connectionListener(socket) {
  parser.onIncoming = parserOnIncoming;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/_http_common.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> binding = process.binding(<span class="hljs-string">'http_parser'</span>);
<span class="hljs-keyword">const</span> HTTPParser = binding.HTTPParser;
<span class="hljs-keyword">const</span> FreeList = <span class="hljs-built_in">require</span>(<span class="hljs-string">'internal/freelist'</span>).FreeList;
<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">var</span> parsers = <span class="hljs-keyword">new</span> FreeList(<span class="hljs-string">'parsers'</span>, <span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> parser = <span class="hljs-keyword">new</span> HTTPParser(HTTPParser.REQUEST);
  <span class="hljs-comment">// ...</span>
  parser[kOnHeaders] = parserOnHeaders;
  parser[kOnHeadersComplete] = parserOnHeadersComplete; 
  parser[kOnBody] = parserOnBody; 
  parser[kOnMessageComplete] = parserOnMessageComplete;
  parser[kOnExecute] = <span class="hljs-literal">null</span>; 

  <span class="hljs-keyword">return</span> parser;
});
exports.parsers = parsers;

<span class="hljs-comment">// lib/_http_server.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connectionListener</span>(<span class="hljs-params">socket</span>) </span>{
  parser.onIncoming = parserOnIncoming;
}</code></pre>
<p>所以一个完整的 HTTP 请求从接收到完全解析，会挨个经历 parser 上的如下事件监听器：</p>
<ol>
<li><p><code>parserOnHeaders</code>：不断解析推入的请求头数据。</p></li>
<li><p><code>parserOnHeadersComplete</code>：请求头解析完毕，构造 header 对象，为请求体创建 <code>http.IncomingMessage</code> 实例。</p></li>
<li><p><code>parserOnBody</code>：不断解析推入的请求体数据。</p></li>
<li><p><code>parserOnExecute</code>：请求体解析完毕，检查解析是否报错，若报错，直接触发 <code>clientError</code> 事件。若请求为 CONNECT 方法，或带有 Upgrade 头，则直接触发 <code>connect</code> 或 <code>upgrade</code> 事件。</p></li>
<li><p><code>parserOnIncoming</code>：处理具体解析完毕的请求。</p></li>
</ol>
<p>所以接下来，我们的关注点自然是 <code>parserOnIncoming</code> 这个监听器，正是这里完成了最终 <code>request</code> 事件的触发，关键步骤代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/_http_server.js
// ...

function connectionListener(socket) {
  var outgoing = [];
  var incoming = [];
  // ...
  
  function parserOnIncoming(req, shouldKeepAlive) {
    incoming.push(req);
    // ...
    var res = new ServerResponse(req);
    
    if (socket._httpMessage) { // 这里判断若为真，则说明 socket 正在被队列中之前的 ServerResponse 实例占用
      outgoing.push(res);
    } else {
      res.assignSocket(socket);
    }
    
    res.on('finish', resOnFinish);
    function resOnFinish() {
      incoming.shift();
      // ...
      var m = outgoing.shift();
      if (m) {
        m.assignSocket(socket);
      }
    }
    // ...
    self.emit('request', req, res);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/_http_server.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connectionListener</span>(<span class="hljs-params">socket</span>) </span>{
  <span class="hljs-keyword">var</span> outgoing = [];
  <span class="hljs-keyword">var</span> incoming = [];
  <span class="hljs-comment">// ...</span>
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parserOnIncoming</span>(<span class="hljs-params">req, shouldKeepAlive</span>) </span>{
    incoming.push(req);
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">var</span> res = <span class="hljs-keyword">new</span> ServerResponse(req);
    
    <span class="hljs-keyword">if</span> (socket._httpMessage) { <span class="hljs-comment">// 这里判断若为真，则说明 socket 正在被队列中之前的 ServerResponse 实例占用</span>
      outgoing.push(res);
    } <span class="hljs-keyword">else</span> {
      res.assignSocket(socket);
    }
    
    res.on(<span class="hljs-string">'finish'</span>, resOnFinish);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resOnFinish</span>(<span class="hljs-params"></span>) </span>{
      incoming.shift();
      <span class="hljs-comment">// ...</span>
      <span class="hljs-keyword">var</span> m = outgoing.shift();
      <span class="hljs-keyword">if</span> (m) {
        m.assignSocket(socket);
      }
    }
    <span class="hljs-comment">// ...</span>
    self.emit(<span class="hljs-string">'request'</span>, req, res);
  }
}</code></pre>
<p>可以看出，对于同一个 socket 发来的请求，源码中分别维护了两个队列，用于缓冲 <code>IncomingMessage</code> 实例和对应的 <code>ServerResponse</code> 实例。先来的 <code>ServerResponse</code> 实例先占用 socket ，监听其 <code>finish</code> 事件，从各自队列中释放该 <code>ServerResponse</code> 实例和对应的 <code>IncomingMessage</code> 实例。</p>
<p>比较绕，以一个简化的图示来总结这部分逻辑：<br><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/FjJ05SxuHUVoW1hY6bBFA0i9kRUx" src="https://static.alili.tech//dn-cnode.qbox.me/FjJ05SxuHUVoW1hY6bBFA0i9kRUx" alt="3.pic_hd.jpg" title="3.pic_hd.jpg" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">响应该 HTTP 请求</h2>
<p>到了响应时，事情已经简单许多了，传入的 <code>ServerResponse</code> 已经获取到了 socket。<code>http.ServerResponse</code> 继承于一个内部类 <code>http.OutgoingMessage</code>，当我们调用 <code>ServerResponse#writeHead</code> 时，Node.js 为我们拼凑好了头字符串，并缓存在 <code>ServerResponse</code> 实例内部的 <code>_header</code> 属性中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/_http_outgoing.js
// ...

OutgoingMessage.prototype._storeHeader = function(firstLine, headers) {
  // ...
  if (headers) {
    var keys = Object.keys(headers);
    var isArray = Array.isArray(headers);
    var field, value;

    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      if (isArray) {
        field = headers[key][0];
        value = headers[key][1];
      } else {
        field = key;
        value = headers[key];
      }

      if (Array.isArray(value)) {
        for (var j = 0; j < value.length; j++) {
          storeHeader(this, state, field, value[j]);
        }
      } else {
        storeHeader(this, state, field, value);
      }
    }
  }
  // ...
  this._header = state.messageHeader + CRLF; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/_http_outgoing.js</span>
<span class="hljs-comment">// ...</span>

OutgoingMessage.prototype._storeHeader = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">firstLine, headers</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">if</span> (headers) {
    <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(headers);
    <span class="hljs-keyword">var</span> isArray = <span class="hljs-built_in">Array</span>.isArray(headers);
    <span class="hljs-keyword">var</span> field, value;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = keys.length; i &lt; l; i++) {
      <span class="hljs-keyword">var</span> key = keys[i];
      <span class="hljs-keyword">if</span> (isArray) {
        field = headers[key][<span class="hljs-number">0</span>];
        value = headers[key][<span class="hljs-number">1</span>];
      } <span class="hljs-keyword">else</span> {
        field = key;
        value = headers[key];
      }

      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; value.length; j++) {
          storeHeader(<span class="hljs-keyword">this</span>, state, field, value[j]);
        }
      } <span class="hljs-keyword">else</span> {
        storeHeader(<span class="hljs-keyword">this</span>, state, field, value);
      }
    }
  }
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">this</span>._header = state.messageHeader + CRLF; 
}</code></pre>
<p>紧接着在调用 <code>ServerResponse#end</code> 时，将数据拼凑在头字符串后，添加对应的尾部，推入 TCP ，具体的写入操作在内部方法 <code>ServerResponse#_writeRaw</code> 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/_http_outgoing.js
// ...

OutgoingMessage.prototype.end = function(data, encoding, callback) {
  // ...
  if (this.connection &amp;&amp; data)
    this.connection.cork();
    
  var ret;
  if (data) {
    this.write(data, encoding);
  }
  
  if (this._hasBody &amp;&amp; this.chunkedEncoding) {
    ret = this._send('0\r\n' + this._trailer + '\r\n', 'binary', finish);
  } else {
    ret = this._send('', 'binary', finish);
  }
  
  if (this.connection &amp;&amp; data)
    this.connection.uncork();
    
  // ...
  return ret;
}

OutgoingMessage.prototype._writeRaw = function(data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding;
    encoding = null;
  }

  var connection = this.connection;
  // ...
  return connection.write(data, encoding, callback);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/_http_outgoing.js</span>
<span class="hljs-comment">// ...</span>

OutgoingMessage.prototype.end = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, encoding, callback</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.connection &amp;&amp; data)
    <span class="hljs-keyword">this</span>.connection.cork();
    
  <span class="hljs-keyword">var</span> ret;
  <span class="hljs-keyword">if</span> (data) {
    <span class="hljs-keyword">this</span>.write(data, encoding);
  }
  
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._hasBody &amp;&amp; <span class="hljs-keyword">this</span>.chunkedEncoding) {
    ret = <span class="hljs-keyword">this</span>._send(<span class="hljs-string">'0\r\n'</span> + <span class="hljs-keyword">this</span>._trailer + <span class="hljs-string">'\r\n'</span>, <span class="hljs-string">'binary'</span>, finish);
  } <span class="hljs-keyword">else</span> {
    ret = <span class="hljs-keyword">this</span>._send(<span class="hljs-string">''</span>, <span class="hljs-string">'binary'</span>, finish);
  }
  
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.connection &amp;&amp; data)
    <span class="hljs-keyword">this</span>.connection.uncork();
    
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> ret;
}

OutgoingMessage.prototype._writeRaw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, encoding, callback</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> encoding === <span class="hljs-string">'function'</span>) {
    callback = encoding;
    encoding = <span class="hljs-literal">null</span>;
  }

  <span class="hljs-keyword">var</span> connection = <span class="hljs-keyword">this</span>.connection;
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> connection.write(data, encoding, callback);
};</code></pre>
<h2 id="articleHeader2">最后</h2>
<p>到这，一个请求就已经通过 TCP ，发回给客户端了。其实本文中，只涉及到了一条主线进行解析，源码中还考虑了更多的情况，如超时，socket 被占用时的缓存，特殊头，上游突然出现问题，更高效的已写头的查询等等。非常值得一读。</p>
<p>参考：</p>
<ul>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/_http_common.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/_http_common.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/master/lib/_http_server.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/master/lib/_http_server.js</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过源码解析 Node.js 中一个 HTTP 请求到响应的历程

## 原文链接
[https://segmentfault.com/a/1190000005040939](https://segmentfault.com/a/1190000005040939)


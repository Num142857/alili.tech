---
title: 'socket.io + vue.js 简易聊天室' 
date: 2019-01-07 2:30:10
hidden: true
slug: llb39l7oq9
categories: [reprint]
---

{{< raw >}}

                    
<p>本文主要分享一个简易版的聊天室</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="项目地址
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>项目地址
</code></pre>
<p><a href="https://github.com/zuank/socket" rel="nofollow noreferrer" target="_blank">https://github.com/zuank/socket</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="测试地址 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">测试地址 </code></pre>
<p><a href="http://yuehao.duapp.com/chat/" rel="nofollow noreferrer" target="_blank">http://yuehao.duapp.com/chat/</a></p>
<p><strong>服务端配置</strong></p>
<blockquote><p>开启服务</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const server = app.listen(port, () => {
  console.log(`technode is on port ${port} |`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> server = app.listen(port, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`technode is on port <span class="hljs-subst">${port}</span> |`</span>);
});</code></pre>
<blockquote><p>接入socket.io</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const io = require('socket.io').listen(server);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> io = require(<span class="hljs-string">'socket.io'</span>).<span class="hljs-built_in">listen</span>(server);</code></pre>
<blockquote><p>socket配置</p></blockquote>
<p><code>socket.emit</code> 为广播</p>
<p><code>socket.broadcast.emit</code> 为广播给其他用户</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.sockets.on('connection', (socket) => {
  socket.on('set nickname', (name) => {
    socket.nickname = name;
    socket.broadcast.emit('new user', {
      nickname: name,
      type: 'user',
    });
    socket.emit('login', {
      nickname: name,
      id: socket.id,
    });
  });
  socket.on('new dialog', (str) => {
    io.emit('new dialog', {
      value: str,
      nickname: socket.nickname,
      type: 'dialog',
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>io.sockets.<span class="hljs-literal">on</span>(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-params">(socket)</span> =&gt;</span> {
  socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'set nickname'</span>, <span class="hljs-function"><span class="hljs-params">(name)</span> =&gt;</span> {
    socket.nickname = name;
    socket.broadcast.emit(<span class="hljs-string">'new user'</span>, {
      nickname: name,
      type: <span class="hljs-string">'user'</span>,
    });
    socket.emit(<span class="hljs-string">'login'</span>, {
      nickname: name,
      id: socket.id,
    });
  });
  socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'new dialog'</span>, <span class="hljs-function"><span class="hljs-params">(str)</span> =&gt;</span> {
    io.emit(<span class="hljs-string">'new dialog'</span>, {
      value: str,
      nickname: socket.nickname,
      type: <span class="hljs-string">'dialog'</span>,
    });
  });
});</code></pre>
<p><strong>前端配置</strong></p>
<blockquote><p>连接服务端</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var socket = io.connect('/')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">var</span> socket = io.connect(<span class="hljs-string">'/'</span>)</code></pre>
<blockquote><p>向服务端发送信息</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.emit('set nickname', this.username)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">socket.emit(<span class="hljs-string">'set nickname'</span>, <span class="hljs-keyword">this</span>.username)</code></pre>
<blockquote><p>接收来自服务端的信息</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.on('new user', function(data) {
  console.log(data)
  app.messagelist.push(data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>socket.on(<span class="hljs-string">'new user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span> {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>)
  app.messagelist.push(<span class="hljs-keyword">data</span>)
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
socket.io + vue.js 简易聊天室

## 原文链接
[https://segmentfault.com/a/1190000010350918](https://segmentfault.com/a/1190000010350918)


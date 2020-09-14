---
title: 'Vue-Socket.io的使用' 
date: 2019-01-08 2:30:11
hidden: true
slug: uo86livcipr
categories: [reprint]
---

{{< raw >}}

                    
<p>简单介绍Vue-Socket.io的使用</p>
<p>第一步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-socket.io --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm install vue-<span class="hljs-built_in">socket</span>.io <span class="hljs-comment">--save</span>
</code></pre>
<p>vue中的使用可以参考作者的demo<br><a href="http://metinseylan.com/vuesocketio/" rel="nofollow noreferrer" target="_blank">http://metinseylan.com/vuesoc...</a></p>
<p>vuex中简单介绍一下接入</p>
<p>建立socket连接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.use(VueSocketio, socketio('http://172.16.20.148:3000/'), store);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueSocketio <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-socket.io'</span>;
<span class="hljs-keyword">import</span> socketio <span class="hljs-keyword">from</span> <span class="hljs-string">'socket.io-client'</span>;

Vue.use(VueSocketio, socketio(<span class="hljs-string">'http://172.16.20.148:3000/'</span>), store);
</code></pre>
<p>服务端配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.sockets.on('connection', (socket) => {
    ...
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>io.sockets.<span class="hljs-literal">on</span>(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-params">(socket)</span> =&gt;</span> {
    ...
  });</code></pre>
<p>服务端接收到消息后会返回一个消息。</p>
<p>VueSocketio 对这个消息做了三个接受的地方<br>在.vue文件中配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sockets: {
      connect() {
        console.log('socket connected');
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>sockets: {
      connect() {
        console.log(<span class="hljs-string">'socket connected'</span>);
      }
    }</code></pre>
<p>这边可以配置一些相应的事件处理</p>
<p>其次 action中也做了接受 但是规定了Function的格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function socketConnect(context, value) {
  console.log('连接成功');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">socketConnect</span>(<span class="hljs-params">context, value</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'连接成功'</span>);
}</code></pre>
<p>最后就是mutations 也有格式要求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'SOCKET_CONNECT' (state) {
      state.connect = true;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>'SOCKET_CONNECT' (<span class="hljs-keyword">state</span>) {
      <span class="hljs-keyword">state</span>.connect = true;
    }</code></pre>
<p>最后 往服务端发消息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$socket.emit('test', '123');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$socket.emit(<span class="hljs-string">'test'</span>, <span class="hljs-string">'123'</span>);</code></pre>
<p>服务端接受</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.sockets.on('connection', (socket) => {
 socket.on('test', (name) => {
  socket.emit('login', {
    nickname: name,
    id: socket.id,
   });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>io.sockets.<span class="hljs-literal">on</span>(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-params">(socket)</span> =&gt;</span> {
 socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'test'</span>, <span class="hljs-function"><span class="hljs-params">(name)</span> =&gt;</span> {
  socket.emit(<span class="hljs-string">'login'</span>, {
    nickname: name,
    id: socket.id,
   });
  });
});</code></pre>
<p>同样的 客户端就这样做接受</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sockets: {
  connect() {
    console.log('socket connected');
  },
  login(value) {
    console.log(value);
  },
}

.........

export function socketLogin(context, value) {
  console.log(value);
}

.........

'SOCKET_LOGIN' (state, info) {
  state.info = info;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>sockets: {
  connect() {
    console.<span class="hljs-keyword">log</span>('socket connected');
  },
  login(value) {
    console.<span class="hljs-keyword">log</span>(value);
  },
}

.........

export function socketLogin(context, value) {
  console.<span class="hljs-keyword">log</span>(value);
}

.........

'SOCKET_LOGIN' (<span class="hljs-keyword">state</span>, info) {
  <span class="hljs-keyword">state</span>.info = info;
}
</code></pre>
<p>我写了第一篇文章。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-Socket.io的使用

## 原文链接
[https://segmentfault.com/a/1190000010178998](https://segmentfault.com/a/1190000010178998)


---
title: 'Electron 渲染进程之间的通信' 
date: 2019-01-15 2:30:12
hidden: true
slug: gs5ja2ywxkw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>菜鸟的 Electron 踩坑集锦。</p></blockquote>
<p>对于 主进程和渲染进程之间的通信，使用 IPC 是很方便的。但是渲染进程之间呢？ 哈哈，我这个码农看来又踩到一个坑了。</p>
<h3 id="articleHeader0">方案一：</h3>
<p>使用全局共享属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// In the main process.</span>
global.sharedObject = {
  <span class="hljs-attr">someProperty</span>: <span class="hljs-string">'default value'</span>
}
<span class="hljs-comment">// In page 1.</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote.getGlobal(<span class="hljs-string">'sharedObject'</span>).someProperty = <span class="hljs-string">'new value'</span>
<span class="hljs-comment">// In page 2.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote.getGlobal(<span class="hljs-string">'sharedObject'</span>).someProperty)</code></pre>
<p>但不具备事件机制，没有实质的通信功能。 当然说到这里就想起了 Node 中的<a href="https://nodejs.org/api/globals.html" rel="nofollow noreferrer" target="_blank">全局对象</a>了。</p>
<ul><li><p><a href="https://electron.atom.io/docs/faq/#how-to-share-data-between-web-pages" rel="nofollow noreferrer" target="_blank">https://electron.atom.io/docs...</a></p></li></ul>
<h3 id="articleHeader1">方案二</h3>
<p>利用主进程做消息中转： 此方案还是很好的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// In the main process.
ipcMain.on('ping-event', (event, arg) => {
  yourWindow.webContents.send('pong-event', 'something');
}

// In renderer process
// 1
ipcRenderer.send('ping-event', (event, arg) => {
    // do something
  }
)

// 2
ipcRenderer.on('pong-event', (event, arg) => {
    // do something
  }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// In the main process.</span>
ipcMain.on(<span class="hljs-string">'ping-event'</span>, (event, arg) =&gt; {
  yourWindow.webContents.send(<span class="hljs-string">'pong-event'</span>, <span class="hljs-string">'something'</span>);
}

<span class="hljs-comment">// In renderer process</span>
<span class="hljs-comment">// 1</span>
ipcRenderer.send(<span class="hljs-string">'ping-event'</span>, (event, arg) =&gt; {
    <span class="hljs-comment">// do something</span>
  }
)

<span class="hljs-comment">// 2</span>
ipcRenderer.on(<span class="hljs-string">'pong-event'</span>, (event, arg) =&gt; {
    <span class="hljs-comment">// do something</span>
  }
)</code></pre>
<h3 id="articleHeader2">方案三</h3>
<p>利用 remote 接口直接获取渲染进程发送消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// renderer process
// get Window by ID
remote.BrowserWindow.fromId(winId).webContents.send('ping', 'someThing');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// renderer process</span>
<span class="hljs-comment">// get Window by ID</span>
remote.BrowserWindow.fromId(winId).webContents.send(<span class="hljs-string">'ping'</span>, <span class="hljs-string">'someThing'</span>);</code></pre>
<p>渲染进程获取 ID 就有多种方法了：</p>
<p>第一种： 通过 global 设置和获取<br>第一种是： 主进程创建事件，发送信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main process
win1.webContents.send('distributeIds',{
    win2Id : win2.id
});
win2.webContents.send('distributeIds',{
    win1Id : win1.id
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// main process</span>
win1.webContents.send(<span class="hljs-string">'distributeIds'</span>,{
    <span class="hljs-string">win2Id :</span> win2.id
});
win2.webContents.send(<span class="hljs-string">'distributeIds'</span>,{
    <span class="hljs-string">win1Id :</span> win1.id
});</code></pre>
<p>第三种： 写个文件什么的都可以，方法还是多种多样的。</p>
<p>参考：</p>
<ul>
<li><p><a href="https://github.com/electron/electron/issues/7193" rel="nofollow noreferrer" target="_blank">https://github.com/electron/e...</a></p></li>
<li><p><a href="https://github.com/electron/electron/issues/4790" rel="nofollow noreferrer" target="_blank">https://github.com/electron/e...</a></p></li>
<li><p><a href="https://juejin.im/entry/58869b3f8d6d810058d46135" rel="nofollow noreferrer" target="_blank">https://juejin.im/entry/58869...</a></p></li>
</ul>
<p>需要了解的 API:</p>
<ul>
<li><p><a href="https://electron.atom.io/docs/api/ipc-main/" rel="nofollow noreferrer" target="_blank">https://electron.atom.io/docs...</a></p></li>
<li><p><a href="https://electron.atom.io/docs/api/web-contents/" rel="nofollow noreferrer" target="_blank">https://electron.atom.io/docs...</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron 渲染进程之间的通信

## 原文链接
[https://segmentfault.com/a/1190000009253100](https://segmentfault.com/a/1190000009253100)


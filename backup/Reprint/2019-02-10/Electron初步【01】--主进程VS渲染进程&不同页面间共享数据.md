---
title: 'Electron初步【01】--主进程VS渲染进程&不同页面间共享数据' 
date: 2019-02-10 2:30:42
hidden: true
slug: 80j2rulws5t
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>Electron使用了网页页面作为App的GUI，因此你可以将它看做是一个由JavaScript控制的一个小型的Chrome内核浏览器。</p></blockquote>
<h3 id="articleHeader0">主进程VS渲染进程</h3>
<h4>主进程</h4>
<p>在Electron中，跑<code>package.json</code>里的主脚本的进程叫作主进程。在主进程里跑的脚本可以通过创建web页面的窗口来扮演GUI角色。</p>
<p>主进程看起来就是一段脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var window = null;

app.on('ready', function() {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadURL('https://github.com');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-keyword">const</span> app = electron.app;
<span class="hljs-keyword">const</span> BrowserWindow = electron.BrowserWindow;

<span class="hljs-keyword">var</span> <span class="hljs-built_in">window</span> = <span class="hljs-literal">null</span>;

app.on(<span class="hljs-string">'ready'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">window</span> = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});
  <span class="hljs-built_in">window</span>.loadURL(<span class="hljs-string">'https://github.com'</span>);
});</code></pre>
<h4>渲染进程</h4>
<p>正因为Electron使用了chrome内核，才使得它多进程的结构也可以被我们使用。在Electron里的每个页面都有它自己的进程，叫作渲染进程。</p>
<p>在普通的浏览器里，网页页面跑在一个沙盒环境下，不能接触到native源码。而Electron则允许你在页面中使用Node.js的API，较低程度上的和操作系统进行交互。</p>
<p>渲染进程如同传统的HTML，但它可以直接使用Node模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <body>
  <script>
    const remote = require('electron').remote;
    console.log(remote.app.getVersion());
  </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">const</span> remote = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote;
    <span class="hljs-built_in">console</span>.log(remote.app.getVersion());
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h4>主进程和渲染进程的不同</h4>
<p>主进程通过实例化<code>BrowserWindow</code>，每个<code>BrowserWindow</code>实例都在它自己的渲染进程内返回一个web页面。当<code>BrowserWindow</code>实例销毁时，相应的渲染进程也会终止。</p>
<p>主进程负责掌管所有的web页面和它们相应的渲染进程。每个渲染进程都是相互独立的，它们只关心自己所运行的web页面。</p>
<p>在页面（渲染进程）中不允许调用原生GUI相关的API，那是因为在网页（渲染进程）中中掌管原生GUI很危险，易造成内存泄露。如果你想在网页中进行GUI的操作，渲染进程必须向主进程传达请求，然后在主进程中完成操作。</p>
<p>在Electron中，我们有几种连接主进程和渲染进程的方法，例如用于传送消息的<a href="https://github.com/heyunjiang/electron/blob/master/docs/api/ipc-renderer.md" rel="nofollow noreferrer" target="_blank"><code>ipcRenderer</code></a>和<a href="https://github.com/heyunjiang/electron/blob/master/docs/api/ipc-main.md" rel="nofollow noreferrer" target="_blank"><code>ipcMain</code></a>模块，以及用于RPC的<a href="https://github.com/heyunjiang/electron/blob/master/docs/api/remote.md" rel="nofollow noreferrer" target="_blank"><code>remote</code></a>模块。</p>
<h3 id="articleHeader1">不同页面间共享数据</h3>
<p>非常简单，使用HTML5 API就能完成。</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage" rel="nofollow noreferrer" target="_blank"><code>Storage API</code></a>，<a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" rel="nofollow noreferrer" target="_blank"><code>IndexedDB</code></a>都是很好的选择。</p>
<p>你还可以使用Electron中提供的<code>IPC</code>系统。它在主进程中将一个对象储存为全局变量，然后可以通过<code>remote</code>模块操作它们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在主进程里
global.sharedObject = {
  someProperty: 'default value'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在主进程里</span>
global.sharedObject = {
  <span class="hljs-attr">someProperty</span>: <span class="hljs-string">'default value'</span>
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// In page 1.
require('remote').getGlobal('sharedObject').someProperty = 'new value';

// In page 2.
console.log(require('remote').getGlobal('sharedObject').someProperty);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// In page 1.</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'remote'</span>).getGlobal(<span class="hljs-string">'sharedObject'</span>).someProperty = <span class="hljs-string">'new value'</span>;

<span class="hljs-comment">// In page 2.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">require</span>(<span class="hljs-string">'remote'</span>).getGlobal(<span class="hljs-string">'sharedObject'</span>).someProperty);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron初步【01】--主进程VS渲染进程&不同页面间共享数据

## 原文链接
[https://segmentfault.com/a/1190000005126719](https://segmentfault.com/a/1190000005126719)


---
title: '使用 Electron 创建和管理窗体' 
date: 2019-01-26 2:30:18
hidden: true
slug: o6c0kt8yuf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用 Electron 创建和管理窗体</h1>
<blockquote><p>此系列文章的应用示例已发布于 <a href="https://github.com/demopark/electron-api-demos-Zh_CN" rel="nofollow noreferrer" target="_blank">GitHub: electron-api-demos-Zh_CN</a>. 可以 Clone 或下载后运行查看. 欢迎 Star .</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJERO?w=1080&amp;h=840" src="https://static.alili.tech/img/bVJERO?w=1080&amp;h=840" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Electron 中的 <code>BrowserWindow</code> 模块允许您创建新的浏览器窗口或管理现有的浏览器窗口.</p>
<p>每个浏览器窗口都是一个单独的进程, 称为渲染器进程. 这个进程, 像控制应用程序生命周期的主进程一样，可以完全访问 Node.js API.</p>
<p>查看 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/browser-window.md" rel="nofollow noreferrer" target="_blank">完整的 API 文档</a> .</p>
<h2 id="articleHeader1">创建一个新窗体</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJERV?w=1079&amp;h=839" src="https://static.alili.tech/img/bVJERV?w=1079&amp;h=839" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>通过 <code>BrowserWindow</code> 模块可以在应用程序中创建新窗口. 这个主进程模块可以和渲染器进程与 <code>remote</code> 模块一起使用, 如本示例中所示.</p>
<p>创建新窗口时有很多参数. 示例中用了一部分, 完整的列表请查看 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/browser-window.md" rel="nofollow noreferrer" target="_blank">API 文档</a>.</p>
<p><em>渲染器进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> BrowserWindow = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote.BrowserWindow
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> newWindowBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'new-window'</span>)

newWindowBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> modalPath = path.join(<span class="hljs-string">'file://'</span>, __dirname, <span class="hljs-string">'../../sections/windows/modal.html'</span>)
  <span class="hljs-keyword">let</span> win = <span class="hljs-keyword">new</span> BrowserWindow({ <span class="hljs-attr">width</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">320</span> })
  win.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ win = <span class="hljs-literal">null</span> })
  win.loadURL(modalPath)
  win.show()
})</code></pre>
<h3 id="articleHeader2">高级技巧</h3>
<p><strong>使用不可见的浏览器窗口来运行后台任务.</strong></p>
<p>您可以将新的浏览器窗口设置为不显示 (即不可见), 以便将该渲染器进程作为 JavaScript 的一种新线程附加在应用程序后台运行. 您可以通过在定义新窗口时将 <code>show</code> 属性设置为 <code>false</code> 来执行此操作.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var win = new BrowserWindow({
  width: 400, height: 225, show: false
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> win = <span class="hljs-keyword">new</span> BrowserWindow({
  <span class="hljs-attr">width</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">225</span>, <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
})</code></pre>
<h2 id="articleHeader3">管理窗体状态</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJER1?w=1079&amp;h=839" src="https://static.alili.tech/img/bVJER1?w=1079&amp;h=839" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在这个示例中, 我们创建一个新窗口, 并监听 <code>move</code> 和 <code>resize</code> 事件. 点击示例按钮, 并更改新窗口大小和位置, 然后在上方查看输出的大小和位置信息.</p>
<p>有很多方法用于控制窗口的状态, 如大小, 位置和焦点状态以及监听窗口更改的事件. 完整的列表请查看 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/browser-window.md" rel="nofollow noreferrer" target="_blank">API 文档</a>.</p>
<p><em>渲染器进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const manageWindowBtn = document.getElementById('manage-window')
let win

manageWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/manage-modal.html')
  win = new BrowserWindow({ width: 400, height: 275 })
  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
  function updateReply () {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `大小: ${win.getSize()} - 位置: ${win.getPosition()}`
    manageWindowReply.innerText = message
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> BrowserWindow = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote.BrowserWindow
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> manageWindowBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'manage-window'</span>)
<span class="hljs-keyword">let</span> win

manageWindowBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> modalPath = path.join(<span class="hljs-string">'file://'</span>, __dirname, <span class="hljs-string">'../../sections/windows/manage-modal.html'</span>)
  win = <span class="hljs-keyword">new</span> BrowserWindow({ <span class="hljs-attr">width</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">275</span> })
  win.on(<span class="hljs-string">'resize'</span>, updateReply)
  win.on(<span class="hljs-string">'move'</span>, updateReply)
  win.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ win = <span class="hljs-literal">null</span> })
  win.loadURL(modalPath)
  win.show()
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateReply</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> manageWindowReply = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'manage-window-reply'</span>)
    <span class="hljs-keyword">const</span> message = <span class="hljs-string">`大小: <span class="hljs-subst">${win.getSize()}</span> - 位置: <span class="hljs-subst">${win.getPosition()}</span>`</span>
    manageWindowReply.innerText = message
  }
})</code></pre>
<h2 id="articleHeader4">窗体事件: 获取和失去焦点</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJESa?w=1078&amp;h=839" src="https://static.alili.tech/img/bVJESa?w=1078&amp;h=839" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在这个示例中, 我们创建一个新窗体并监听它的 <code>blur</code> 事件. 点击示例按钮创建一个新的模态窗体, 然后点击父级窗体来切换焦点. 你可以通过点击 示例获取焦点 按钮来让示例窗体再次获得焦点.</p>
<p><em>渲染器进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const manageWindowBtn = document.getElementById('listen-to-window')
const focusModalBtn = document.getElementById('focus-on-modal-window')
let win

manageWindowBtn.addEventListener('click', function () {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal-toggle-visibility.html')
  win = new BrowserWindow({ width: 600, height: 400 })
  win.on('focus', hideFocusBtn)
  win.on('blur', showFocusBtn)
  win.on('close', function () {
    hideFocusBtn()
    win = null
  })
  win.loadURL(modalPath)
  win.show()
  function showFocusBtn (btn) {
    if (!win) return
    focusModalBtn.classList.add('smooth-appear')
    focusModalBtn.classList.remove('disappear')
    focusModalBtn.addEventListener('click', function () { win.focus() })
  }
  function hideFocusBtn () {
    focusModalBtn.classList.add('disappear')
    focusModalBtn.classList.remove('smooth-appear')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> BrowserWindow = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote.BrowserWindow
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> manageWindowBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'listen-to-window'</span>)
<span class="hljs-keyword">const</span> focusModalBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'focus-on-modal-window'</span>)
<span class="hljs-keyword">let</span> win

manageWindowBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> modalPath = path.join(<span class="hljs-string">'file://'</span>, __dirname, <span class="hljs-string">'../../sections/windows/modal-toggle-visibility.html'</span>)
  win = <span class="hljs-keyword">new</span> BrowserWindow({ <span class="hljs-attr">width</span>: <span class="hljs-number">600</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">400</span> })
  win.on(<span class="hljs-string">'focus'</span>, hideFocusBtn)
  win.on(<span class="hljs-string">'blur'</span>, showFocusBtn)
  win.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    hideFocusBtn()
    win = <span class="hljs-literal">null</span>
  })
  win.loadURL(modalPath)
  win.show()
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showFocusBtn</span> (<span class="hljs-params">btn</span>) </span>{
    <span class="hljs-keyword">if</span> (!win) <span class="hljs-keyword">return</span>
    focusModalBtn.classList.add(<span class="hljs-string">'smooth-appear'</span>)
    focusModalBtn.classList.remove(<span class="hljs-string">'disappear'</span>)
    focusModalBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ win.focus() })
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hideFocusBtn</span> (<span class="hljs-params"></span>) </span>{
    focusModalBtn.classList.add(<span class="hljs-string">'disappear'</span>)
    focusModalBtn.classList.remove(<span class="hljs-string">'smooth-appear'</span>)
  }
})</code></pre>
<h2 id="articleHeader5">创建一个无框窗体</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJESg?w=1078&amp;h=839" src="https://static.alili.tech/img/bVJESg?w=1078&amp;h=839" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>无框窗口就是一个没有 <a href="https://developer.mozilla.org/en-US/docs/Glossary/Chrome" rel="nofollow noreferrer" target="_blank">"chrome"</a> 的窗口, 比如工具栏，标题栏，状态栏，边框等. 你可以在创建窗体时通过设置 <code>frame</code> 为 <code>false</code> 来创建一个无框的窗体.</p>
<p><em>渲染器进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BrowserWindow = require('electron').remote.BrowserWindow
const newWindowBtn = document.getElementById('frameless-window')

const path = require('path')

newWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  let win = new BrowserWindow({ frame: false })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> BrowserWindow = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote.BrowserWindow
<span class="hljs-keyword">const</span> newWindowBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'frameless-window'</span>)

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

newWindowBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> modalPath = path.join(<span class="hljs-string">'file://'</span>, __dirname, <span class="hljs-string">'../../sections/windows/modal.html'</span>)
  <span class="hljs-keyword">let</span> win = <span class="hljs-keyword">new</span> BrowserWindow({ <span class="hljs-attr">frame</span>: <span class="hljs-literal">false</span> })
  win.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ win = <span class="hljs-literal">null</span> })
  win.loadURL(modalPath)
  win.show()
})</code></pre>
<p>窗体也可以有一个透明的背景. 通过设置 <code>transparent</code> 参数为 <code>true</code>, 你也可以让你的无框窗口透明:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var win = new BrowserWindow({
  transparent: true,
  frame: false
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> win = <span class="hljs-keyword">new</span> BrowserWindow({
  <span class="hljs-attr">transparent</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">frame</span>: <span class="hljs-literal">false</span>
})</code></pre>
<p>更多内容, 请查阅 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/frameless-window.md" rel="nofollow noreferrer" target="_blank">无框窗体文档</a> .</p>
<blockquote><p>如果这边文章对您有帮助, 感谢 下方点赞 或 Star  <a href="https://github.com/demopark/electron-api-demos-Zh_CN" rel="nofollow noreferrer" target="_blank">GitHub: electron-api-demos-Zh_CN</a> 支持, 谢谢.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Electron 创建和管理窗体

## 原文链接
[https://segmentfault.com/a/1190000008459541](https://segmentfault.com/a/1190000008459541)


---
title: '使用 Electron 将应用程序放入托盘' 
date: 2019-01-25 2:30:23
hidden: true
slug: qk95jl4uq4h
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用 Electron 将应用程序放入托盘</h1>
<blockquote><p>此系列文章的应用示例已发布于 <a href="https://github.com/demopark/electron-api-demos-Zh_CN" rel="nofollow noreferrer" target="_blank">GitHub: electron-api-demos-Zh_CN</a>. 可以 Clone 或下载后运行查看. 欢迎 Star .</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJXgT?w=1080&amp;h=839" src="https://static.alili.tech/img/bVJXgT?w=1080&amp;h=839" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>使用 <code>tray</code> 模块允许您在操作系统的通知区域中创建图标.</p>
<p>此图标还可以附加上下文菜单.</p>
<p>在浏览器中查看 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/tray.md" rel="nofollow noreferrer" target="_blank">完整 API 文档</a> .</p>
<h2 id="articleHeader1">托盘</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJXg1?w=1079&amp;h=861" src="https://static.alili.tech/img/bVJXg1?w=1079&amp;h=861" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>示例按钮使用 <code>ipc</code> 模块向主进程发送消息. 在主进程中, 应用程序会被告知在托盘中放置一个带有上下文菜单的图标.</p>
<p>在此示例中, 可以通过单击托盘图标上下文菜单中的 "移除" 或再次点击示例按钮来删除托盘图标.</p>
<p><em>主进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray

let appIcon = null

ipc.on('put-in-tray', function (event) {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: '移除',
    click: function () {
      event.sender.send('tray-removed')
    }
  }])
  appIcon.setToolTip('在托盘中的 Electron 示例.')
  appIcon.setContextMenu(contextMenu)
})

ipc.on('remove-tray', function () {
  appIcon.destroy()
})

app.on('window-all-closed', function () {
  if (appIcon) appIcon.destroy()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-keyword">const</span> ipc = electron.ipcMain
<span class="hljs-keyword">const</span> app = electron.app
<span class="hljs-keyword">const</span> Menu = electron.Menu
<span class="hljs-keyword">const</span> Tray = electron.Tray

<span class="hljs-keyword">let</span> appIcon = <span class="hljs-literal">null</span>

ipc.on(<span class="hljs-string">'put-in-tray'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> iconName = process.platform === <span class="hljs-string">'win32'</span> ? <span class="hljs-string">'windows-icon.png'</span> : <span class="hljs-string">'iconTemplate.png'</span>
  <span class="hljs-keyword">const</span> iconPath = path.join(__dirname, iconName)
  appIcon = <span class="hljs-keyword">new</span> Tray(iconPath)
  <span class="hljs-keyword">const</span> contextMenu = Menu.buildFromTemplate([{
    <span class="hljs-attr">label</span>: <span class="hljs-string">'移除'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      event.sender.send(<span class="hljs-string">'tray-removed'</span>)
    }
  }])
  appIcon.setToolTip(<span class="hljs-string">'在托盘中的 Electron 示例.'</span>)
  appIcon.setContextMenu(contextMenu)
})

ipc.on(<span class="hljs-string">'remove-tray'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  appIcon.destroy()
})

app.on(<span class="hljs-string">'window-all-closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (appIcon) appIcon.destroy()
})</code></pre>
<p><em>渲染器进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ipc = require('electron').ipcRenderer

const trayBtn = document.getElementById('put-in-tray')
let trayOn = false

trayBtn.addEventListener('click', function (event) {
  if (trayOn) {
    trayOn = false
    document.getElementById('tray-countdown').innerHTML = ''
    ipc.send('remove-tray')
  } else {
    trayOn = true
    const message = '再次点击示例按钮移除托盘.'
    document.getElementById('tray-countdown').innerHTML = message
    ipc.send('put-in-tray')
  }
})
// 从图标上下文菜单中删除托盘
ipc.on('tray-removed', function () {
  ipc.send('remove-tray')
  trayOn = false
  document.getElementById('tray-countdown').innerHTML = ''
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ipc = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).ipcRenderer

<span class="hljs-keyword">const</span> trayBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'put-in-tray'</span>)
<span class="hljs-keyword">let</span> trayOn = <span class="hljs-literal">false</span>

trayBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">if</span> (trayOn) {
    trayOn = <span class="hljs-literal">false</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'tray-countdown'</span>).innerHTML = <span class="hljs-string">''</span>
    ipc.send(<span class="hljs-string">'remove-tray'</span>)
  } <span class="hljs-keyword">else</span> {
    trayOn = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">const</span> message = <span class="hljs-string">'再次点击示例按钮移除托盘.'</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'tray-countdown'</span>).innerHTML = message
    ipc.send(<span class="hljs-string">'put-in-tray'</span>)
  }
})
<span class="hljs-comment">// 从图标上下文菜单中删除托盘</span>
ipc.on(<span class="hljs-string">'tray-removed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  ipc.send(<span class="hljs-string">'remove-tray'</span>)
  trayOn = <span class="hljs-literal">false</span>
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'tray-countdown'</span>).innerHTML = <span class="hljs-string">''</span>
})</code></pre>
<h3 id="articleHeader2">高级技巧</h3>
<p><strong>Linux中的托盘支持.</strong></p>
<p>在只有应用程序指示器支持的 Linux 发行版上，用户需要安装 <code>libappindicator1</code> 来使托盘图标正常工作. 有关在 Linux 上使用托盘的更多详细信息请查看 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/tray.md" rel="nofollow noreferrer" target="_blank">完整 API 文档</a> .</p>
<blockquote><p>如果这边文章对您有帮助, 感谢 下方点赞 或 Star  <a href="https://github.com/demopark/electron-api-demos-Zh_CN" rel="nofollow noreferrer" target="_blank">GitHub: electron-api-demos-Zh_CN</a> 支持, 谢谢.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Electron 将应用程序放入托盘

## 原文链接
[https://segmentfault.com/a/1190000008530265](https://segmentfault.com/a/1190000008530265)


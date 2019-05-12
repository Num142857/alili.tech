---
title: 'Electron开发初体验' 
date: 2018-12-10 2:30:08
hidden: true
slug: 2vknppsxd7d
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">需求背景</h2>
<p>平时总会写markdown，markdown整体语法用起来很方便，但依然有晦涩的地方，比如表格。markdown的表格语法写起来很容易出错，而且每行每列单元格里的内容长短不一编辑器里就很容易乱掉，所以我在写表格时候都是借助<a href="https://www.tablesgenerator.com/markdown_tables" rel="nofollow noreferrer" target="_blank">Tables Generator</a>来写的，但是这个网站不能保存多个模板，每次写不同的表格都要把列数，表头信息来回改，很麻烦，于是打算自己照着Table Generator写一个简单的，能保存表头信息的东西出来。先看一哈大致的样子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013685325?w=2000&amp;h=1120" src="https://static.alili.tech/img/remote/1460000013685325?w=2000&amp;h=1120" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">动手前的思考</h2>
<p>最初在考虑的是要不要写一个差不多的简单的页面，但是我个人不太喜欢总开新的tab来回切换，所以突然想到可以做成一个简单的桌面应用，想用的时候可以直接从Dock启动，而且Electron有了解过但没实际用过，也可以尝尝鲜，就决定用Electron直接做成一个小应用了。</p>
<h2 id="articleHeader2">工程搭建</h2>
<p>在这个"不用脚手架不舒服" + "不用框架不舒服"的时代，搭建工程当然是选择一款靠谱的脚手架了，开发环境 + 打包构建都能通过命令行搞定，极大程度地节省了时间，感谢开源贡献者吧~这里我选择了<a href="https://github.com/SimulatedGREG/electron-vue" rel="nofollow noreferrer" target="_blank">electron-vue</a>这个模板，基于vue-cli的，初始化项目很简单，直接执行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init simulatedgreg/electron-vue my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">vue init simulatedgreg/electron-vue <span class="hljs-keyword">my</span>-project</code></pre>
<p>然后根据提示输入完项目名，项目描述，依赖和构建工具(<code>electron-builder</code>或者<code>electron-packager</code>)后，一个项目就搭建完成了，进入目录执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn &amp;&amp; yarn dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">yarn</span> &amp;&amp; yarn dev</code></pre>
<p>然后项目就以开发模式运行起来了</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013685326?w=2000&amp;h=1170" src="https://static.alili.tech/img/remote/1460000013685326?w=2000&amp;h=1170" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>后续的开发工作，如果你的应用对于系统级别的API需求不大，事实上和开发网页的体验并没有什么区别。比如我要完成的这个小工具就和开发网页的体验差不多。</p>
<h2 id="articleHeader3">核心概念</h2>
<p>实现的思路比较简单：为表格的每一个单元格设置<code>contenteditable</code>，这样整个表格的内容都是可以随意编辑的，然后再通过<a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver" rel="nofollow noreferrer" target="_blank">MutationObserver</a>监听表格内容的变化，构造出正确的数据结构即可。</p>
<p>为th和td添加 contenteditable 使其内容可以编辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table id=&quot;table&quot;>
    <tbody>
      <tr>
        <th class=&quot;col-mark&quot;></th>
        <th data-row=&quot;0&quot; :data-col=&quot;index&quot; v-title=&quot;item.text&quot;
          v-for=&quot;(item, index) in columns&quot; :key=&quot;item.key&quot; contenteditable
          :class=&quot;{'active': index === acCol}&quot;
        ></th>
      </tr>
    </tbody>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"table"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-mark"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">data-row</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">:data-col</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">v-title</span>=<span class="hljs-string">"item.text"</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in columns"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.key"</span> <span class="hljs-attr">contenteditable</span>
          <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'active': index === acCol}"</span>
        &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>然后在渲染完成后使用MutationObserver监听变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted () {
    this.targetNode = document.getElementById('table')
    // this.handleMutation是具体处理回调
    this.observer = new MutationObserver(this.handleMutation)
    this.observer.observe(this.targetNode, this.config)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mounted () {
    <span class="hljs-keyword">this</span>.targetNode = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'table'</span>)
    <span class="hljs-comment">// this.handleMutation是具体处理回调</span>
    <span class="hljs-keyword">this</span>.observer = <span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-keyword">this</span>.handleMutation)
    <span class="hljs-keyword">this</span>.observer.observe(<span class="hljs-keyword">this</span>.targetNode, <span class="hljs-keyword">this</span>.config)
}</code></pre>
<p>这里的MutationObserver的配置是<code>{ subtree: true, characterData: true, childList: true }</code>作用分别是：</p>
<ul>
<li>characterData: 目标的数据被修改时触发，比如直接编辑td,th里的内容时，就是对其<code>textContent</code>的修改。</li>
<li>subtree: 使MutationObserver也能响应后代元素内容的变化，因为我们只在table上绑定一个MutationObserver，所以使用这个属性。</li>
<li>childList: 目标(包括后代节点)的子元素(包括文本元素)添加或者被删除时触发。比如单元格中的内容从无到有和从有到无的两种边界情况。</li>
</ul>
<p>核心概念主要就用到了这两个概念，样式上选择了<a href="https://github.com/papercss/papercss" rel="nofollow noreferrer" target="_blank">papercss</a>，简单的功能搭配简洁的风格。</p>
<h2 id="articleHeader4">复制到剪贴板</h2>
<p>表格信息写好之后，最后的功能就是生成对应的markdown内容然后复制到粘贴板了。Electron提供了<code>clipboard API</code>，直接调用<code>clipboard.writeText</code>就能把内容写入粘贴板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { clipboard } from 'electron'

let text = 'xxx'
clipboard.writeText(text)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { clipboard } <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>

<span class="hljs-keyword">let</span> text = <span class="hljs-string">'xxx'</span>
clipboard.writeText(text)</code></pre>
<p>这里复制成功后可以给出一个提示信息，我们在Electron开发的内容一般是在render进程的，在render进程中可以直接使用HTML5 Notification API来实现提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myNotification = new Notification('Table Generator', {
    body: 'Copy successfully~'
})
setTimeout(() => {
    myNotification.close()
}, 2000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> myNotification = <span class="hljs-keyword">new</span> Notification(<span class="hljs-string">'Table Generator'</span>, {
    <span class="hljs-attr">body</span>: <span class="hljs-string">'Copy successfully~'</span>
})
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    myNotification.close()
}, <span class="hljs-number">2000</span>)</code></pre>
<p>实际效果为一个两秒后自动消失的提示框：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013685327?w=1442&amp;h=696" src="https://static.alili.tech/img/remote/1460000013685327?w=1442&amp;h=696" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">主进程与渲染进程的通信</h2>
<p>这里要实现的效果是通过自定义的快捷键删除左侧模板列表中的模板，但是快捷键注册只能在主进程通过<code>globalShortcut</code>注册，而对于删除行为的响应(二次确认的弹窗)是在渲染进程，所以设计到了主进程和渲染进程的通信。</p>
<p>渲染进程是主进程中创建的一个<code>BrowserWindow</code>实例，实例的<code>webContents</code>属性是对渲染进程的引用，所以主进程可以直接通过<code>webContents</code>发送事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建的渲染进程
mainWindow = new BrowserWindow({
    height: 560,
    minHeight: 450,
    width: 1000,
    minWidth: 760,
    titleBarStyle: 'hiddenInset',
    show: false,
    backgroundColor: '#fff'
})
// 注册快捷键
globalShortcut.register('Cmd+D', () => {
    // 直接通过mainWindow.webContents发送事件
    mainWindow.webContents.send('del-tpl')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建的渲染进程</span>
mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({
    <span class="hljs-attr">height</span>: <span class="hljs-number">560</span>,
    <span class="hljs-attr">minHeight</span>: <span class="hljs-number">450</span>,
    <span class="hljs-attr">width</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">minWidth</span>: <span class="hljs-number">760</span>,
    <span class="hljs-attr">titleBarStyle</span>: <span class="hljs-string">'hiddenInset'</span>,
    <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#fff'</span>
})
<span class="hljs-comment">// 注册快捷键</span>
globalShortcut.register(<span class="hljs-string">'Cmd+D'</span>, () =&gt; {
    <span class="hljs-comment">// 直接通过mainWindow.webContents发送事件</span>
    mainWindow.webContents.send(<span class="hljs-string">'del-tpl'</span>)
})</code></pre>
<p>而在对应的render进程，可以通过<code>ipcRenderer</code>监听消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ipcRenderer.on('del-tpl', () => {
  // 触发modal弹出
  this.$refs['del-btn'].click()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ipcRenderer.on(<span class="hljs-string">'del-tpl'</span>, () =&gt; {
  <span class="hljs-comment">// 触发modal弹出</span>
  <span class="hljs-keyword">this</span>.$refs[<span class="hljs-string">'del-btn'</span>].click()
})</code></pre>
<h2 id="articleHeader6">一些简单的优化</h2>
<p>事实上通过一些简单的配置，就可以让你的应用体验更好：</p>
<ul>
<li>创建无边框窗口：无边框窗口会让应用整体变得更美观，在创建BrowserWindow时通过<code>titleBarStyle: 'hiddenInset'</code>实现(针对Mac系统)</li>
<li>在创建BrowserWindow时通过<code>show: false</code>隐藏窗口,在<code>'ready-to-show'</code>事件触发时手动调用窗口实例的<code>show()</code>方法，保证窗口渲染完再展示。</li>
<li>通过将窗口背景颜色设置成渲染进程背景一样的颜色，让应用显得更快。</li>
</ul>
<h2 id="articleHeader7">总结</h2>
<p>本次初步的尝试并没有用到太多系统级别的API，基本和开发Web页面体验一样，文中提到的API和优化点都是文档上可以找到的，本次实践只是对Electron的一次涉猎，后续可以考虑将各种操作和提示都迁移到原生的API，或者再加入其它功能，不过用来生成markdown内容“初心”已经达到了~</p>
<p>源码在<a href="https://github.com/showonne/md-table-generator" rel="nofollow noreferrer" target="_blank">GayHub</a>上，有兴趣的同学也可以自己安装依赖构建体验一哈，顺便点个star~最后，我们在招前端开发，欢迎投递简历至<a href="mailto:hzchenjinghui@corp.netease.com">hzchenjinghui@corp.netease.com</a>!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron开发初体验

## 原文链接
[https://segmentfault.com/a/1190000013685320](https://segmentfault.com/a/1190000013685320)


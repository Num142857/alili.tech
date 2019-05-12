---
title: 'Chrome浏览器63版开发者工具(DevTools)新功能' 
date: 2019-01-25 2:30:23
hidden: true
slug: ssf4hln9unm
categories: [reprint]
---

{{< raw >}}

            <h1>Chrome浏览器63版开发者工具(DevTools)新功能</h1>
<p><img src="http://p0.qhimg.com/t011a1fe2c917f7f7be.jpg" alt="Kayce Basques"></p>
<p><strong>作者</strong> <a href="https://developers.google.com/web/resources/contributors/kaycebasques">Kayce Basques</a></p>
<p>Google公司技术撰稿人</p>
<p>欢迎回来！Chrome浏览器63版又有了新功能，包括：</p>
<ul>
<li><a href="https://developers.google.com/web/updates/2017/10/devtools-release-notes#multi-client">支持多客户端远程调试</a>.</li>
<li><a href="https://developers.google.com/web/updates/2017/10/devtools-release-notes#workspaces">工作存储器(Workspaces)2.0版</a>.</li>
<li><a href="https://developers.google.com/web/updates/2017/10/devtools-release-notes#audits">四种新的监听项目</a>.</li>
<li><a href="https://developers.google.com/web/updates/2017/10/devtools-release-notes#push">模拟自定义数据推送通知</a>.</li>
<li><a href="https://developers.google.com/web/updates/2017/10/devtools-release-notes#sync">用自定义标签触发后台同步事件</a>.</li>
</ul>
<p><strong>注：</strong> 可以在<code>chrome://version</code>地址查看目前运行的Chrome浏览器版本。Chrome浏览器每六个星期会自动更新到最新的主要版本。</p>
<p>观看下面视频，了解更多信息！</p>
<p><a href="https://www.youtube.com/embed/Eyw_mwbABIQ?autohide=1&amp;showinfo=0&amp;enablejsapi=1">https://www.youtube.com/embed/Eyw_mwbABIQ?autohide=1&amp;showinfo=0&amp;enablejsapi=1</a></p>
<h2>支持多客户端远程调试</h2>
<p>用VS Code或WebStorm之类的IDE编辑器试过调试程序的人可能都碰到过这种情况，开发者工具(DevTools)一打开调试操作就全乱了。这个问题也使得用WebDriver做测试时无法使用开发者工具(DevTools)进行调试。</p>
<p>现在，在Chrome浏览器63版里不需要设置，开发者工具(DevTools)默认即支持同时运行多个远程调试的客户端程序。</p>
<p>多客户端远程调试是<a href="https://crbug.com/129539">crbug.com上受关注度第一的问题</a>，在整个Chromium项目里关注度排第三。支持多客户端也为其它工具与开发者工具(DevTools)之间的整合带来新思路，还给那些工具创造了新用法，很令人关注。比如：</p>
<ul>
<li>像ChromeDriver，VS Code编辑器，Webstorm编辑器的Chrome调试扩展程序等协议客户端，还有像Puppeteer那样的WebSocket客户端，现在都可以与开发者工具(DevTools)同时运行。</li>
<li>两个独立的WebSocket协议客户端，如<a href="https://github.com/GoogleChrome/puppeteer">Puppeteer</a>或<a href="https://github.com/cyrus-and/chrome-remote-interface">chrome-remote-interface</a>现在可以同时连接到同一个网页标签上去。</li>
<li>用<code>chrome.debugger</code> API接口的Chrome扩展程序现在可以与开发者工具(DevTools)同时运行。</li>
<li>多个不同的Chrome扩展程序现在可以在同一时间、同一网页标签上使用<code>chrome.debugger</code> API接口。</li>
</ul>
<h2>工作存储空间(Workspaces)2.0版</h2>
<p>工作存储空间(Workspaces)在开发者工具(DevTools)里已经有一段时间了。这个功能使用户能把开发者工具(DevTools)当作IDE编辑器来用。可以在开发者工具(DevTools)里修改源代码，所做的修改能存储在文件系统里，保存在项目的本地版本中。</p>
<p>工作存储空间(Workspaces)2.0版从1.0版脱胎而来，给用户加入了更贴心的使用体验，改进了转编译代码的自动映射功能。这个功能原本计划要在2016年Chrome开发者峰会(CDS)后不久发布的，但开发小组要解决一些问题，所以推迟了。</p>
<p>请看2016年峰会(CDS)上关于开发者工具(DevTools)的发言。其中的“创建(Authoring)”部分大约在14分28秒左右，可以认识一下2.0版的实际应用。</p>
<p><a href="https://www.youtube.com/embed/HF1luRD4Qmk?autohide=1&amp;showinfo=0&amp;start=868&amp;enablejsapi=1">https://www.youtube.com/embed/HF1luRD4Qmk?autohide=1&amp;showinfo=0&amp;start=868&amp;enablejsapi=1</a></p>
<h2>四种新的监听项目</h2>
<p>Chrome浏览器63版<strong>监听(Audits)</strong>面板有四种新的项目：</p>
<ul>
<li>能否以WebP图片格式显示图片。</li>
<li>能否以合适的纵横比例处理图片。</li>
<li>是否避免使用已知有安全漏洞的前台JavaScrip库。</li>
<li>浏览器错误是否记录到控制台终端上。</li>
</ul>
<p>看<a href="https://developers.google.com/web/tools/lighthouse/#devtools">Chrome开发者工具(DevTools)里运行灯塔(Lighthouse)自动化工具</a>，了解如何使用<strong>监听(Audits)</strong>面板来改善页面质量。</p>
<p>看<a href="https://developers.google.com/web/tools/lighthouse/">灯塔(Lighthouse)自动化工具</a>，了解更多关于这个项目是如何推动<strong>监听(Audits)</strong>面板功能的。</p>
<h2>模拟自定义数据推送通知</h2>
<p>模拟推送通知功能在开发者工具(DevTools)里已经有一段时间了，却有一个局限：不能发送定义数据。但现在Chrome浏览器63版在<strong>服务工作器(Service Workers)</strong>面板里加了新的<strong>推送(Push)</strong>文本输入框，就可以发送了。</p>
<ol>
<li>去<a href="https://gauntface.github.io/simple-push-demo/">简单推送演示</a>网页。</li>
<li>点击<strong>开启推送通知(Enable Push Notifications)</strong>。</li>
<li>Chrome浏览器提示时，点击<strong>允许(Allow)</strong>，允许通知发送。</li>
<li>启动开发者工具(DevTools)。</li>
<li>去<strong>服务工作器(Service Workers)</strong>面板。</li>
<li>在<strong>推送(Push)</strong>文本输入框里写点什么东西。</li>
</ol>
<p><img src="http://p0.qhimg.com/t017c577e79fc6fa824.png" alt="模拟自定义数据推送通知。">
<strong>图1</strong> 通过<strong>服务工作器(Service Workers)</strong>面板里的<strong>推送(Push)</strong>文本输入框，模拟自定义数据推送通知。</p>
<ol>
<li>点击<strong>推送(Push)</strong>按钮，发送通知。</li>
</ol>
<p><img src="http://p0.qhimg.com/t0174ac42718c6ba046.png" alt="模拟出来的推送通知">
<strong>图2</strong> 模拟出来的推送通知</p>
<h2>用自定义标签触发后台同步事件</h2>
<p>触发后台同步事件功能也已经在<strong>服务工作器(Service Workers)</strong>面板里有一段时间了，但现在可以发送自定义标签了：</p>
<ol>
<li>打开开发者工具(DevTools)。</li>
<li>去<strong>服务工作器(Service Workers)</strong>面板。</li>
<li>在<strong>同步(Sync)</strong>文本框里输入一些文字。</li>
<li>点击<strong>同步(Sync)</strong>按钮。</li>
</ol>
<p><img src="http://p0.qhimg.com/t0186ce3b4c598dfa32.png" alt="触发自定义后台同步事件"></p>
<p><strong>图3</strong> 点击<strong>同步(Sync)</strong>后，开发者工具(DevTools)会以自定义标签<code>更新内容(update-content)</code>来发送一个后台同步事件给服务工作器。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome浏览器63版开发者工具(DevTools)新功能

## 原文链接
[https://www.zcfy.cc/article/whats-new-in-devtools-chrome-63-nbsp-nbsp-web-nbsp-nbsp-google-developers](https://www.zcfy.cc/article/whats-new-in-devtools-chrome-63-nbsp-nbsp-web-nbsp-nbsp-google-developers)


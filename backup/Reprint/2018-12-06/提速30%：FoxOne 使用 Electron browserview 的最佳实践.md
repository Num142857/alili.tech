---
title: '提速30%：FoxOne 使用 Electron browserview 的最佳实践' 
date: 2018-12-06 2:30:09
hidden: true
slug: rwax833q1h
categories: [reprint]
---

{{< raw >}}

                    
<p>在 FoxOne 1.5.1 版更新中，打开各个交易所网页的速度得到了巨大提升。</p>
<p>我们分别在不同的网络环境下，测算了新版 FoxOne 在 Dom 加载和页面加载条件下的所需时间：</p>
<p><span class="img-wrap"><img data-src="/img/bV76Xf?w=1451&amp;h=1266" src="https://static.alili.tech/img/bV76Xf?w=1451&amp;h=1266" alt="DOM Loaded" title="DOM Loaded" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV76X9?w=1461&amp;h=1137" src="https://static.alili.tech/img/bV76X9?w=1461&amp;h=1137" alt="Page Loaded" title="Page Loaded" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，无论是 DOM 加载速度还是 Page 加载速度，新方案都有不同程度的提升（从 9% ~ 31%）。我们是怎么做到的呢？</p>
<h2 id="articleHeader0">
<code>Webview</code>的问题</h2>
<p>FoxOne 的桌面版本使用了 Electron + Electron Builder + Vue 作为技术栈。Electron 是使用 Web 技术构建桌面 App 的框架，而 Electron Builder 则为 Electron 提供了打包、签名、跨平台 CI、自动更新的全家桶方案。</p>
<p>我们当初选择 Electron，是因为 Web 技术会为 FoxOne 开发提供了很多便利，但由于 Electron 项目对 Chromuim 的依赖，在 Chromuim 上游的一些问题也就无缝平移到了 Electron。其中的典型就是 <code>&lt;webview&gt;</code></p>
<p><code>webview</code> 可以看作一个跑在独立进程中的更安全的 iframe。如果我们需要在 Electron App 中嵌入一个网页（而不是在新窗口中打开），把它放在 <code>webview</code> 中是官方建议的标准做法，很多著名桌面软件也在使用它。</p>
<p>最初，FoxOne 也在使用 <code>webview</code>，并且最初看来功能安好。但是很快我们就发现了问题：</p>
<p>一、虽然 <code>webview</code> 跑在独立进程中，但是在 DOM 结构上与 Renderer 进程同源，因此渲染 <code>webview</code> 时会拖累整个 Renderer 进程的 DOM；</p>
<p>二、<code>webview</code> 中存在一些 issues (<a href="https://github.com/electron/electron/issues/6139" rel="nofollow noreferrer" target="_blank">1</a>,<a href="https://github.com/electron/electron/issues/5110" rel="nofollow noreferrer" target="_blank">2</a>,<a href="https://github.com/electron/electron/issues/8505" rel="nofollow noreferrer" target="_blank">3</a>)，这些问题我们不能解决，Electron 团队也不能解决——甚至，考虑到 <code>webview</code> 在 Chromuim 中狭窄的应用范围，可能 Chromuim 团队也没打算解决。</p>
<p>针对以上问题，我们决定使用<a href="https://electronjs.org/docs/api/browser-view" rel="nofollow noreferrer" target="_blank">browserview</a> 来代替 <a href="https://electronjs.org/docs/api/webview-tag" rel="nofollow noreferrer" target="_blank">webview</a>。</p>
<h2 id="articleHeader1">
<code>browserview</code> 和 <code>webview</code> 的区别</h2>
<p>最大的区别在于 <code>browserview</code> 托管于 main process 而不是 renderer。这非常类似于 Chrome 中对页面的处理方式，因此可以获得很高的页面响应速度。</p>
<p>当然，因为从此 GUI 分属于两个 process，所以代价是我们必须在处理 GUI 布局时对 <code>browserview</code> 单独处理。</p>
<p><span class="img-wrap"><img data-src="/img/bV76Yj?w=1024&amp;h=768" src="https://static.alili.tech/img/bV76Yj?w=1024&amp;h=768" alt="compare" title="compare" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">
<code>browserview</code> 存在的问题</h2>
<p>在使用中，我们发现 <code>browserview</code> 存在的问题主要表现在两方面。</p>
<ol>
<li>
<code>browserview</code> 缺少 <code>webview</code> 丰富的 API。使用 <code>browserview</code>，你将无法使用插件，预加载脚本，截图等能力</li>
<li>
<code>browserview</code> 不活动在 renderer 进程，因此无法使用舒服的 CSS 来控制布局。</li>
</ol>
<p>对于第一点，我们在实现中选择直接操作 <code>webContents</code>，来获取失去的方法和属性。对于第二点，我们设计了专门的 <code>browserview manager</code> 来控制 <code>browserview</code> 的布局外在表现。</p>
<h2 id="articleHeader3">使用 <code>browserview</code>
</h2>
<p>考虑到 <code>browserview</code> 的独立性，我们设计了一个 browserview manager 来管理所有 <code>browserviews</code>，并使用 ipcMain 和 ipcRenderer 建立通讯。</p>
<p>当用户在客户端进行操作（如前进、后退、刷新、切换页等）时，对应的指令通过 Electron event 机制传达到 browserview manager，然后让 <code>browserview manager</code> 操作 <code>browserview</code> 和其中的 <code>webcontents</code> 执行指令。</p>
<p><span class="img-wrap"><img data-src="/img/bV76Y6?w=1024&amp;h=768" src="https://static.alili.tech/img/bV76Y6?w=1024&amp;h=768" alt="Architecture" title="Architecture" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">结语</h2>
<p>虽然 <code>browserview</code> 在 Electron 中依然是一个实验性功能，API 也不完备，缺乏 script preload 等 <code>webview</code> 拥有的机制。但如果你需要在 App 中嵌入外部网页，在合适的 trade-off 下，使用 <code>browserview</code> 不失一个好选择。</p>
<h3 id="articleHeader5">招聘时间～</h3>
<p>FoxOne 是一个技术导向的创新团队。我们正在围绕基础研究和产品化，寻觅正确的区块链技术应用方向。而现在，改变世界需要有你同行。</p>
<p>我们正在招聘前端工程师、移动端工程师、爬虫工程师、Golang 研发工程师、社群产品运营。欢迎青睐 FoxOne 的优秀人才加入我们。</p>
<p>请留意我们的招聘邮箱为 <code>jobs@fox.one</code>。谢谢大家阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
提速30%：FoxOne 使用 Electron browserview 的最佳实践

## 原文链接
[https://segmentfault.com/a/1190000014287834](https://segmentfault.com/a/1190000014287834)


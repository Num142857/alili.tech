---
title: '使用 electron-vue 构建你的桌面应用' 
date: 2018-12-27 2:30:12
hidden: true
slug: z4npqsk2bth
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是 electron</h2>
<p>官网里这么说：Electron提供了一个Nodejs的运行时，专注于构建桌面应用，同时使用web页面来作为应用的GUI，你可以将其看作是一个由JavaScript控制的迷你版的Chromium浏览器。</p>
<p>翻译一下：它是一个运行时，可以像 node 一样这样执行：electron app.js；也是一个使用 html + css + javascript 构建跨平台原生桌面应用的框架。</p>
<p>本质上，electron 就是一个带了 Chrome 浏览器的壳子（无需考虑兼容性的问题）。</p>
<p>Electron用 web 页面作为它的 GUI，而不是绑定了 GUI 库的 JavaScript。它结合了 Chromium、Node.js 和用于调用操作系统本地功能的 APIs（如打开文件窗口、通知、图标等）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011798694?w=600&amp;h=338" src="https://static.alili.tech/img/remote/1460000011798694?w=600&amp;h=338" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>具有两个进程，分别是主进程，以及渲染进程。</p>
<ul>
<li>主进程：运行 package.json 里面 main 脚本的进程成为主进程。</li>
<li>渲染进程： 每个 electron 的页面都运行着自己的进程，称为渲染进程。</li>
</ul>
<p>主进程也就是 npm run start 出来的窗口，我们关心的，还是窗口里面的内容，即是渲染进程。</p>
<h2 id="articleHeader1">electron-vue</h2>
<p>electron-vue 是一个结合 vue-cli 与 electron 的项目，主要避免了使用 vue 手动建立起 electron 应用程序，很方便。</p>
<p>我们需要做的仅仅是像平常初始化一个 vue-cli 项目一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init simulatedgreg/electron-vue my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">vue init simulatedgreg/electron-vue <span class="hljs-keyword">my</span>-project</code></pre>
<p>就可以拥有一个 vue-loader 的 webpack、electron-packager 或是 electron-builder，以及一些最常用的插件，如vue-router、vuex 等等的脚手架。</p>
<p>下图是我的 blog 结合 electron-vue 的目录：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011798695?w=506&amp;h=1510" src="https://static.alili.tech/img/remote/1460000011798695?w=506&amp;h=1510" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>src 里的 main，即是主进程，而我们需要关心的则仅有 renderer 渲染进程。（ main 进程里，添加了常用菜单栏的功能）。</p>
<h2 id="articleHeader2">打包发布</h2>
<p>打包发布有两种方式：</p>
<ul><li>electron-packager，打包方式比较简单，想为哪个平台打包，执行相应命令即可。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011798696?w=1342&amp;h=408" src="https://static.alili.tech/img/remote/1460000011798696?w=1342&amp;h=408" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li>electron-builder，自动化部署，持续集成，只要监测到 github 上绑定的代码仓库发生了变化，即可打包发布。挺高大上的。配置有一点麻烦，感兴趣的同学，可以参考这个 <a href="https://simulatedgreg.gitbooks.io/electron-vue/content/cn/using-electron-builder.html" rel="nofollow noreferrer" target="_blank">https://simulatedgreg.gitbook...</a> ；</li></ul>
<h2 id="articleHeader3">结语</h2>
<p>上手很愉快的。</p>
<p>electron 中文文档： <a href="https://github.com/electron/electron/tree/master/docs-translations/zh-CN" rel="nofollow noreferrer" target="_blank">https://github.com/electron/e...</a></p>
<p>这有一个栗子：<a href="https://github.com/jkchao/vue-electron" rel="nofollow noreferrer" target="_blank">https://github.com/jkchao/vue...</a>  。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 electron-vue 构建你的桌面应用

## 原文链接
[https://segmentfault.com/a/1190000011798689](https://segmentfault.com/a/1190000011798689)


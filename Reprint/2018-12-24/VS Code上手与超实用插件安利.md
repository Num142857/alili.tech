---
title: 'VS Code上手与超实用插件安利' 
date: 2018-12-24 2:30:07
hidden: true
slug: n329lmiz0rh
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="http://dwz.cn/6V2UZg" rel="nofollow noreferrer" target="_blank">VS Code上手与超实用插件安利</a></p>
<p><strong>工欲善其事必先利其器</strong></p>
<blockquote>Visual Studio Code (简称 VS Code / VSC) 是一款免费开源的现代化轻量级代码编辑器，支持几乎所有主流的开发语言的语法高亮、智能代码补全、自定义热键、括号匹配、代码片段、代码对比 Diff、GIT 等特性，支持插件扩展，并针对网页开发和云端应用开发做了优化。软件跨平台支持 Win、Mac 以及 Linux，运行流畅，可谓是微软的良心之作</blockquote>
<p><strong>微软有 Visual Studio这个宇宙最强IDE，Visual Studio Code 自然也不会弱<em>(宇宙最强编辑器)</em></strong></p>
<p>说到代码编辑器，我们有必要提一提<a href="https://www.sublimetext.com/" rel="nofollow noreferrer" target="_blank">Sublime Text</a>还有<a href="https://atom.io/" rel="nofollow noreferrer" target="_blank">Atom</a>。在开始使用VS Code之前Sublime Text一直是我的主力编辑器，和<a href="https://www.jetbrains.com/webstorm/" rel="nofollow noreferrer" target="_blank">WebStorm</a> <em>（最强端前端开发工具）</em> 一起用。由于这篇文章主要介绍VS Code下面就简单概括下这几个：</p>
<p>Sublime Text：在我的日常使用中都挺满意，快速，稳定。唯一不爽是证书购买(虽然可以一直无限制使用)，没有开源</p>
<p>Atom：你们用着真不卡吗？还是我电脑配置太差，不过UI真的好看</p>
<p>VS code：微软开源，比sublime开源，比atom更快，比webstorm更轻，值得一提的是它用的壳是GitHub开源的Electron。</p>
<h2 id="articleHeader0">主要功能</h2>
<p>Visual Studio Code首先是一个编辑器，它包含了高效的源代码编辑所需的功能<em>(最为一个编辑器，主要功能当然是代码编辑了)</em> 我们主要还是看看特色功能。</p>
<h3 id="articleHeader1">智能感知 Intellisense</h3>
<p>智能感知是各种代码编辑功能的总称，包括代码完成，参数信息，快速信息和成员列表。智能感知功能也被称为“代码补全”，“内容帮助”和“代码提示”，这是一个现代编辑器最基本的自我修养了。</p>
<p>VS Code原生就支持JavaScript，TypeScript，JSON，HTML，CSS，Less和Sass的Intellisense，真正的强大之处在于，可以安装语言扩展来配置更丰富的IntelliSense<em>（几乎包括所有主流语言）</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155954?w=777&amp;h=305" src="https://static.alili.tech/img/remote/1460000012155954?w=777&amp;h=305" alt="intellisense" title="intellisense" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">内置 Git</h3>
<p>VS Code 内置了一个 Git GUI，支持最常用 Git 命令，这使得您可以很容易地看到您在项目中所做的更改。当然了，你可以通过扩展 让他更强大。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155955?w=768&amp;h=267" src="https://static.alili.tech/img/remote/1460000012155955?w=768&amp;h=267" alt="scm" title="scm" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">调试 Debugging</h3>
<p>VS Code对<a href="https://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a>运行时提供了内置的调试支持，并且可以调试JavaScript，TypeScript和任何其他被转换为JavaScript的语言。对于调试其他语言和运行环境时，我们也可以通过扩展来解决。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155956?w=750&amp;h=421" src="https://static.alili.tech/img/remote/1460000012155956?w=750&amp;h=421" alt="debug" title="debug" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">终端命令行工具 Terminal</h3>
<p>在VS Code中提供了一个功能齐全的集成终端，这非常方便，因为您不必切换窗口或更改现有终端的状态就可以快速执行命令</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155957?w=619&amp;h=389" src="https://static.alili.tech/img/remote/1460000012155957?w=619&amp;h=389" alt="integrated-terminal" title="integrated-terminal" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">扩展市场 Extensio</h3>
<p>对于强大的插件市场来说，它自带的功能只是和开始而已。随着VS Code的流行，基本上你能找到所有你想要的插件<em>(实在找不到你还可以自己开发)</em>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155958?w=1482&amp;h=791" src="https://static.alili.tech/img/remote/1460000012155958?w=1482&amp;h=791" alt="extensions" title="extensions" style="cursor: pointer;"></span></p>
<p>更多请查阅<a href="https://code.visualstudio.com/docs" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com/docs</a></p>
<h2 id="articleHeader6">开始上手</h2>
<p>关于VS Code的使用也很简单</p>
<ul>
<li>下载安装：去到它的官网<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com/</a>，下载对应版本，然后按照提示一直下一步就好</li>
<li>基本使用：在你安装好后，就可以看到有用的用户欢迎指引界面</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVZatg?w=2560&amp;h=1600" src="https://static.alili.tech/img/bVZatg?w=2560&amp;h=1600" alt="vscode" title="vscode" style="cursor: pointer;"></span></p>
<p>你可以在学习栏点击各项，迅速上手这个编辑器÷。下面主要就是推荐一些好用插件了，</p>
<h3 id="articleHeader7">插件安装方式</h3>
<p>关于插件的安装，在看了<code>界面概述</code>后也应该是知道怎么安装了：</p>
<ul>
<li>直接在扩展管理中键入你要下载的扩展名称或者关键字搜索下载</li>
<li>使用快捷键<code>⇧+⌘+P</code>，打开命令面板，输入如下命令即可</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ext install 扩展名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ext install 扩展名</code></pre>
<ul><li>还可以从插件主页直接点击下载，他会唤起VS Code自动下载</li></ul>
<h2 id="articleHeader8">基本配置</h2>
<p>关于VS Code的各项设置，都在一个JSON文件中，左边是默认设置，右边是我们自己的设置，分为用户设置和工作区设置，我们只需要在右边我们编辑设置并保存即可。工作区设置后各项设置会保存在<code>.vscode</code>文件夹下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155959" src="https://static.alili.tech/img/remote/1460000012155959" alt="default-settings" title="default-settings" style="cursor: pointer;"></span></p>
<p>新安装一个编辑/IDE，最先干的就是调字体<em>(vscode 中可以直接按⌘加加号/减号调节字体)</em>，调颜色等外观配置了吧。</p>
<h3 id="articleHeader9">主题推荐</h3>
<p>VS Code已经自带了很多个好看的主题，比如说我一直用的<a href="http://ethanschoonover.com/solarized" rel="nofollow noreferrer" target="_blank">Solarized Dark</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155960?w=700&amp;h=305" src="https://static.alili.tech/img/remote/1460000012155960?w=700&amp;h=305" alt="themes" title="themes" style="cursor: pointer;"></span></p>
<p>这里我再推荐几个不错的，</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme" rel="nofollow noreferrer" target="_blank"><strong>One Dark Pro</strong></a>：  Atom 标志性的主题</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155961?w=2272&amp;h=1760" src="https://static.alili.tech/img/remote/1460000012155961?w=2272&amp;h=1760" alt="One Dark Pro" title="One Dark Pro" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onedark" rel="nofollow noreferrer" target="_blank"><strong>Atom One Dark Theme</strong></a>： 另一个基于 <a href="https://github.com/atom/one-dark-syntax" rel="nofollow noreferrer" target="_blank">One Dark</a> 的主题</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155962?w=1078&amp;h=650" src="https://static.alili.tech/img/remote/1460000012155962?w=1078&amp;h=650" alt="Atom One Dark Theme" title="Atom One Dark Theme" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula" rel="nofollow noreferrer" target="_blank"><strong>Dracula Official</strong></a>：超好看</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155963?w=1718&amp;h=1166" src="https://static.alili.tech/img/remote/1460000012155963?w=1718&amp;h=1166" alt="Dracula Official" title="Dracula Official" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme" rel="nofollow noreferrer" target="_blank"><strong>Material Theme</strong></a> 一个简单而又干净的主题，有很多配置选项用于颜色配置<br><span class="img-wrap"><img data-src="/img/remote/1460000012155964?w=1300&amp;h=956" src="https://static.alili.tech/img/remote/1460000012155964?w=1300&amp;h=956" alt="Material Theme" title="Material Theme" style="cursor: pointer;"></span></p>
<p>单单安装了主题还不够，我们还要好看的图标来足视觉体验：</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons#overview" rel="nofollow noreferrer" target="_blank"><strong>vscode icons</strong></a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155965?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000012155965?w=800&amp;h=600" alt="vscode icons" title="vscode icons" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme" rel="nofollow noreferrer" target="_blank"><strong>Material Icon Theme</strong></a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155966?w=1125&amp;h=1867" src="https://static.alili.tech/img/remote/1460000012155966?w=1125&amp;h=1867" alt="Material Icon Theme" title="Material Icon Theme" style="cursor: pointer;"></span></p>
<p>更多好看主题请浏览<a href="https://marketplace.visualstudio.com/search?target=VSCode&amp;category=Themes&amp;sortBy=Downloads" rel="nofollow noreferrer" target="_blank">https://marketplace.visualstudio.com/search?target=VSCode&amp;category=Themes</a></p>
<h2 id="articleHeader10">实用插件</h2>
<p><a href="https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize" rel="nofollow noreferrer" target="_blank"><strong>filesize</strong></a>：在底部状态栏显示当前文件大小，点击后还可以看到详细创建、修改时间</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense" rel="nofollow noreferrer" target="_blank"><strong>Path Intellisense</strong></a>：文件路径补全，在你用任何方式引入文件系统中的路径时提供智能提示和自动完成</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155967" src="https://static.alili.tech/img/remote/1460000012155967" alt="Path Intellisense" title="Path Intellisense" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=mikey.vscode-fileheader" rel="nofollow noreferrer" target="_blank"><strong>vscode-fileheader</strong></a>：顶部注释模板，可定义作者、时间等信息，并会自动更新最后修改时间<br><span class="img-wrap"><img data-src="/img/remote/1460000012155968?w=921&amp;h=510" src="https://static.alili.tech/img/remote/1460000012155968?w=921&amp;h=510" alt="fileheader" title="fileheader" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" rel="nofollow noreferrer" target="_blank"><strong>Git Lens</strong></a>：查看详细的git记录,内置功能很多<br><span class="img-wrap"><img data-src="/img/remote/1460000012155969" src="https://static.alili.tech/img/remote/1460000012155969" alt="Git Lens " title="Git Lens " style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory" rel="nofollow noreferrer" target="_blank"><strong>Git History (git log)</strong></a>：一个好用的Git 历史查看工具<br><span class="img-wrap"><img data-src="/img/remote/1460000012155970?w=859&amp;h=795" src="https://static.alili.tech/img/remote/1460000012155970?w=859&amp;h=795" alt="**Git History**" title="**Git History**" style="cursor: pointer;"></span><br><a href="https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script" rel="nofollow noreferrer" target="_blank"><strong>npm</strong></a>: 可以直接在vscode执行npm的一些命令</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155971?w=600&amp;h=142" src="https://static.alili.tech/img/remote/1460000012155971?w=600&amp;h=142" alt="**npm**" title="**npm**" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense" rel="nofollow noreferrer" target="_blank"><strong>Npm Intellisense</strong></a>：NPM 依赖补全，在你引入任何 node_modules 里面的依赖包时提供智能提示和自动完成</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012155972?w=931&amp;h=281" src="https://static.alili.tech/img/remote/1460000012155972?w=931&amp;h=281" alt="**Npm Intellisense**" title="**Npm Intellisense**" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome" rel="nofollow noreferrer" target="_blank"><strong>Debugger for Chrome</strong></a>：让 vscode 映射 chrome 的 debug功能，静态页面都可以用 vscode 来打断点调试<br><span class="img-wrap"><img data-src="/img/remote/1460000012155973?w=1458&amp;h=890" src="https://static.alili.tech/img/remote/1460000012155973?w=1458&amp;h=890" alt="**Debugger for Chrome**" title="**Debugger for Chrome**" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets" rel="nofollow noreferrer" target="_blank"><strong>JavaScript (ES6) code snippets</strong></a>：常用的类声明、ES 模块声明、CMD 模块导入等</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" rel="nofollow noreferrer" target="_blank"><strong>ESLint</strong></a>：代码语法检查</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify" rel="nofollow noreferrer" target="_blank"><strong>Beautify</strong></a>：格式化代码的工具</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=coderfee.open-html-in-browser" rel="nofollow noreferrer" target="_blank"><strong>open-in-browser</strong></a>： 在浏览器中预览HTM文件</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets" rel="nofollow noreferrer" target="_blank"><strong>HTML Snippets</strong></a>：各种 HTML 标签片段</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion" rel="nofollow noreferrer" target="_blank"><strong>IntelliSense for CSS class names</strong></a>：CSS 类名补全，会自动扫描整个项目里面的 CSS 类名并在你输入类名时做智能提示</p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=joelday.docthis" rel="nofollow noreferrer" target="_blank"><strong>Document This</strong></a>： js 的注释模板<span class="img-wrap"><img data-src="/img/remote/1460000012155974?w=1422&amp;h=1078" src="https://static.alili.tech/img/remote/1460000012155974?w=1422&amp;h=1078" alt="Document This" title="Document This" style="cursor: pointer;"></span></p>
<p><a href="https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync" rel="nofollow noreferrer" target="_blank"><strong>Settings Sync</strong></a>：同步你得设置和插件</p>
<h2 id="articleHeader11">结语</h2>
<p>我们从外观配置开始到插件推荐结束，到此基本上你就能打造出一个有自己风格强大编辑器，开发效率自然也是很高。你有什么好用的插件？欢迎留言交流！让更多的人知道。</p>
<p>同时，建议移步官网看看<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com/</a>，那儿有更全更细的文档，有助于我们更好的使用它。</p>
<p>欢迎关注微信公众号：<br><span class="img-wrap"><img data-src="/img/bVZatm?w=615&amp;h=345" src="https://static.alili.tech/img/bVZatm?w=615&amp;h=345" alt="15fed02d4c85462d" title="15fed02d4c85462d" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VS Code上手与超实用插件安利

## 原文链接
[https://segmentfault.com/a/1190000012155949](https://segmentfault.com/a/1190000012155949)


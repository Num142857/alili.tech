---
title: 'Sublime Text 中配置 Eslint 代码检查和自动修复' 
date: 2018-12-29 2:30:10
hidden: true
slug: h6s39eunbrg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>第一次运行 Vue 项目时被浏览器中满屏的 ESLint 报错给吓到了，果断禁用了该功能！</p>
<p>再之后找了个时间认真的了解了一下 ESLint，终于有了一些概念。简单来说，ESLint 就是一个整合了编码规范和检测功能的工具。以前说的那些规范（html，css，js 等规范）都是让你自己主动去学习，去遵守，现在 ESLint 帮助你检测你的代码是否符合你自己设定好的规范。</p>
<p>官网上的说明：</p>
<blockquote><p>ESLint 最初是由 Nicholas C. Zakas 于2013年6月创建的开源项目。它的目标是提供一个插件化的 javascript 代码检测工具。</p></blockquote>
<p>关于 ESLint 的入门学习大家可以查看这篇文章：<a href="http://morning.work/page/maintainable-nodejs/getting-started-with-eslint.html" rel="nofollow noreferrer" target="_blank">利用ESLint检查代码质量</a>，写得挺易懂的~</p>
<h1 id="articleHeader1">ESLint 使用</h1>
<p>使用 ESLint 的方式有很多种，参考该 <a href="http://eslint.cn/docs/user-guide/integrations" rel="nofollow noreferrer" target="_blank">页面</a>，有编辑器，构建工具，命令行，源代码管理等。我个人目前的阶段适合直接使用编辑器来实时检测代码并提示错误，如果使用 webpack 的话，需要保存修改后才会提示，还有其他种种不便（可能是因为我笨吧）。</p>
<h2 id="articleHeader2">ESLint 安装和配置</h2>
<p>一个项目中想要使用 ESLint，首先需要安装 ESLint。全局安装的话就不用每个项目独立安装了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install eslint -g</code></pre>
<p>如果你首次使用 ESLint，那么你需要先设置一个配置文件，你可以在项目根目录下使用 --init 选项来生成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eslint --init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">eslint --init</code></pre>
<p>But, 如果你真的是初次使用的话，肯定对 ESLint 的一切配置都一头雾水，这里有一份某大牛使用的 ESLint 配置：<a href="https://github.com/SuperAL/vueAdmin-template/blob/master/.eslintrc.js" rel="nofollow noreferrer" target="_blank">.eslintrc.js</a>，原项目的该文件将注释删去了，我给的是我之前将项目 fork 过来的文件地址，有注释，如果看不懂注释，就直接 <a href="http://eslint.cn/docs/rules/" rel="nofollow noreferrer" target="_blank">中文官网</a> 上查。</p>
<p>Ok，有了 <strong>全局的 ESLint</strong> 和 <strong>当前项目根目录下的规则配置文件</strong>，我们开始装插件并测试功能吧！</p>
<h2 id="articleHeader3">代码检查</h2>
<p>这个功能需要的插件为 <a href="https://packagecontrol.io/packages/SublimeLinter" rel="nofollow noreferrer" target="_blank">Sublime​Linter</a> 和 <a href="https://packagecontrol.io/packages/SublimeLinter-contrib-eslint" rel="nofollow noreferrer" target="_blank">SublimeLinter-contrib-eslint</a>。</p>
<blockquote><p>Sublime​Linter 是一个代码检查框架插件，功能非常强大，支持各种语言的检查。但是它本身并没有代码检查的功能，需要借助 ESLint 这样的特定语言检查支持。我们只需要使用对应的 Sublime​Linter-contrib-eslint 插件即可。（参考文章：<a href="https://keelii.github.io/2017/04/29/sublime-text-3-configure-eslint/" rel="nofollow noreferrer" target="_blank">Sublime Text 3 配置 ESLint 代码检查</a>）</p></blockquote>
<p>装完这两个插件后，就可以右键 <code>SublimeLinter &gt; Lint this view</code> 检查当前打开的 JS 文件了，不过我设置了（右键） <code>SublimeLinter &gt; Lint Mode &gt; Background</code>，让插件在后台自动执行代码检查功能，因此当前项目所有打开的 JS 文件都冒出了各种红框框、红点点……把光标置于错误处会在编辑器底部看到相应的错误信息。</p>
<p>那如何让代码检查在 <code>.vue</code> 文件中也生效呢？在前面给出的 <a href="https://github.com/SuperAL/vueAdmin-template/blob/master/.eslintrc.js" rel="nofollow noreferrer" target="_blank">.eslintrc.js</a> 中，有以下这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用非默认的 babel-eslint 作为代码解析器
// 这样 eslint 就能识别 babel 语法的代码
parser: 'babel-eslint',
// required to lint *.vue files
// 用于检查 *.vue 文件的代码
plugins: [
    'html'
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用非默认的 babel-eslint 作为代码解析器</span>
<span class="hljs-comment">// 这样 eslint 就能识别 babel 语法的代码</span>
parser: <span class="hljs-string">'babel-eslint'</span>,
<span class="hljs-comment">// required to lint *.vue files</span>
<span class="hljs-comment">// 用于检查 *.vue 文件的代码</span>
plugins: [
    <span class="hljs-string">'html'</span>
]</code></pre>
<p>需要安装插件才能使其检查 <code>.vue</code> 文件的代码，你需要全局安装 <code>eslint-plugin-html</code>（就是上面代码中的 'html' 插件） 和 <code>babel-eslint</code>（用于识别 babel 语法的代码）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint-plugin-html -g
npm install babel-eslint -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install eslint-plugin-html -g
npm install babel-eslint -g</code></pre>
<blockquote><p><a href="https://github.com/babel/babel-eslint" rel="nofollow noreferrer" target="_blank">babel-eslint</a></p></blockquote>
<p>Why Use babel-eslint?<br>You only need to use babel-eslint if you are using types (Flow) or experimental features not supported in ESLint itself yet. Otherwise try the default parser (you don't have to use it just because you are using Babel).<br>乍一看上面的说明，也许我们并不需要 babel-eslint 插件的，但是我也不懂，所以就不管了~</p>
<p>到此暂告一段落，有了代码的实时检查功能，你可以随时修改代码并看到反馈，有些报错代码的写法是你刻意为之的，不影响代码运行，你也可以就放在那里不管它，反正又不影响项目的运行（如果集成到构建工具中使用，说不定就影响了哦~）。</p>
<h2 id="articleHeader4">自动修复</h2>
<blockquote><p>ESLint <a href="http://eslint.cn/docs/user-guide/command-line-interface#fix" rel="nofollow noreferrer" target="_blank">命令行</a>的 <code>--fix</code> 选项用来自动修复规则所报告的问题（目前，大部分是对空白的修复），规则名前面有扳手图标的说明该问题可被自动修复。（具体请查看 <a href="http://eslint.cn/docs/rules/" rel="nofollow noreferrer" target="_blank">Rules</a> 页面）</p></blockquote>
<p>我测试使用了两个 Sublime 插件：<a href="https://github.com/alex-mm/eslintAutoFix" rel="nofollow noreferrer" target="_blank">ESLintAutoFix</a> 和 <a href="https://github.com/TheSavior/ESLint-Formatter" rel="nofollow noreferrer" target="_blank">ESLint-Formatter</a>。</p>
<p>第一个插件 <code>ESLintAutoFix</code> 我用了之后，总是会报错 <code>[WinError 2] 系统找不到指定的文件</code>，修改了配置项也没反应，多次尝试后我放弃了。</p>
<p>第二个插件 <code>ESLint-Formatter</code> 在 <code>js</code> 文件上使用是 ok 的，右键 <code>ESLint Formatter &gt; Format This File</code> 或者直接使用快捷键 <code>ctrl+shift+h</code>。如果快捷键冲突了，可以在菜单栏找到 <code>Preferences &gt; Package Settings &gt; ESLint Formatter &gt; Key Binding - User</code>，打开 <code>Key Binding - User</code> 文件，新增快捷键绑定，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;keys&quot;: [&quot;ctrl+alt+h&quot;],
    &quot;command&quot;: &quot;format_eslint&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"keys"</span>: [<span class="hljs-string">"ctrl+alt+h"</span>],
    <span class="hljs-string">"command"</span>: <span class="hljs-string">"format_eslint"</span>
}</code></pre>
<h3 id="articleHeader5">vue 文件自动修复</h3>
<p><strong>但是</strong>，如果在 <code>.vue</code> 文件上使用 <code>ESLint-Formatter</code> 插件，就会出现问题，页面上会出现重复的 <code>template</code> 部分（反正我使用的话会有问题，都查不到解决方案……）。</p>
<p>由于我最近主要使用 Vue 进行开发，因此这个问题必须解决（当你发现页面上的红点点超过你的承受能力范围的时候，是非常需要一键自动修复功能的~）！</p>
<blockquote><p>考虑过使用 webpack 来修复的，就是文件保存修改后自动修复，但是官网上看到：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011497815?w=975&amp;h=273" src="https://static.alili.tech/img/remote/1460000011497815?w=975&amp;h=273" alt="use webpack to fix code" title="use webpack to fix code" style="cursor: pointer;"></span><br>我就打消念头了~</p>
<p>经过我百般折腾和搜索，发现了这个  <a href="https://github.com/roadhump/SublimeLinter-eslint/issues/104" rel="nofollow noreferrer" target="_blank">Fix the code using --fix</a>，并得到了一个解决方案：<br>菜单栏找到 <code>Tools &gt; Build System &gt; New Build System</code>，新建一个 <code>eslint-fix.sublime-build</code> 文件，文件名随便起都可以的，然后里面内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;shell_cmd&quot;: &quot;eslint --fix $file&quot; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"shell_cmd"</span>: <span class="hljs-string">"eslint --fix $file"</span> 
}</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;cmd&quot;: &quot;D:\\dev\\nvm\\npm\\eslint.cmd --fix $file&quot; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"cmd"</span>: <span class="hljs-string">"D:\\dev\\nvm\\npm\\eslint.cmd --fix $file"</span> 
}</code></pre>
<blockquote><p>（确保全局安装 eslint）如果你想要修复的文件可以通过命令行工具运行命令 <code>eslint --fix</code> 成功自动修复的话，我这个方法就能成功。</p></blockquote>
<p>使用方式为：选择菜单栏 <code>Tools &gt; Build System &gt; eslint-fix</code> 或者 使用快捷键 <code>ctrl+b</code> 运行刚刚创建的 build 文件。（当然选择快捷键方式~）运行成功会将信息显示在面板（Panel）上，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011497816?w=868&amp;h=275" src="https://static.alili.tech/img/remote/1460000011497816?w=868&amp;h=275" alt="panel" title="panel" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>如果你有过这种疑问：通过一个快捷键对编辑器当前打开文件执行一句命令，如何实现？答案就是，按照上面的例子就可以实现！</p></blockquote>
<h1 id="articleHeader6">总结</h1>
<p>在编辑器里实时检查代码可以给你最直接的代码编写反馈，看到哪里标红了就会想说犯了什么错误，错误改正多了编码习惯也就会慢慢变好了（同时也能避免你犯一些很傻逼的错误）~<br>反正代码检查工具还是很实用的，可以的话就从今天开始用起来吧！</p>
<h1 id="articleHeader7">参考资料</h1>
<ul>
<li><a href="https://keelii.github.io/2017/04/29/sublime-text-3-configure-eslint/" rel="nofollow noreferrer" target="_blank">Sublime Text 3 配置 ESLint 代码检查</a></li>
<li><a href="http://www.jianshu.com/p/e826e13c67ec" rel="nofollow noreferrer" target="_blank">Sublime Text 中配置 ESLint</a></li>
<li><a href="https://zhenyong.github.io/2016/07/05/ESLint-in-Vue/" rel="nofollow noreferrer" target="_blank">ESLint in Vue</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Sublime Text 中配置 Eslint 代码检查和自动修复

## 原文链接
[https://segmentfault.com/a/1190000011497812](https://segmentfault.com/a/1190000011497812)


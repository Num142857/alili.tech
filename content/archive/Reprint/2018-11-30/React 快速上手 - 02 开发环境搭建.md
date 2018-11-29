---
title: 'React 快速上手 - 02 开发环境搭建' 
date: 2018-11-30 2:30:11
hidden: true
slug: 8edtu2rpt6b
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900736?w=922&amp;h=354" src="https://static.alili.tech/img/remote/1460000014900736?w=922&amp;h=354" alt="react" title="react" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">目录</h1>
<blockquote><ul>
<li><a href="https://segmentfault.com/a/1190000014900731">01 前言</a></li>
<li><a href="https://segmentfault.com/a/1190000014900826" target="_blank">02 开发环境搭建</a></li>
<li><a href="https://segmentfault.com/a/1190000014922557">03 脚手架创建项目 一切都是组件</a></li>
<li><a href="https://segmentfault.com/a/1190000014954844" target="_blank">04 基础特性 JSX、Props、State、Lifecycle、Event、Style</a></li>
<li><a href="https://segmentfault.com/a/1190000014968360">05 组件渲染控制</a></li>
<li><a href="https://segmentfault.com/a/1190000014994702" target="_blank">06 容器组件、展示组件</a></li>
<li><a href="https://segmentfault.com/a/1190000015013230">07 前端路由 react-router</a></li>
<li><a href="https://segmentfault.com/a/1190000015029934" target="_blank">08 状态管理 react-redux</a></li>
<li><a href="https://segmentfault.com/a/1190000015049343">09 数据请求 fetch</a></li>
<li><a href="https://segmentfault.com/a/1190000015071373" target="_blank">10 属性类型检查 prop-types</a></li>
</ul></blockquote>
<h1 id="articleHeader1">React 快速上手 - 02 开发环境搭建</h1>
<h2 id="articleHeader2">目标</h2>
<ul>
<li>安装 git 软件</li>
<li>安装 node npm 环境</li>
<li>配置 node npm 常用工具</li>
<li>安装 vscode 作为 IDE 开发工具</li>
<li>安装 vscode 常用开发插件 为 react 开发做准备</li>
</ul>
<h2 id="articleHeader3">安装 git</h2>
<p>这个必要性，就不多说了，进入开源的世界，没有 git 寸步难行</p>
<p>进入 <a href="https://git-scm.com" rel="nofollow noreferrer" target="_blank">官网</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900831?w=1105&amp;h=656" src="https://static.alili.tech/img/remote/1460000014900831?w=1105&amp;h=656" alt="git" title="git" style="cursor: pointer;"></span></p>
<p>下载后是一个安装包，一路 <code>下一步</code> 安装直到完成</p>
<h2 id="articleHeader4">安装 node npm</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900832?w=809&amp;h=637" src="https://static.alili.tech/img/remote/1460000014900832?w=809&amp;h=637" alt="nodejs" title="nodejs" style="cursor: pointer;"></span></p>
<p>打开网站 <a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/</a> 选择下载 LTS 版本。</p>
<p>下载后是一个安装包，一路 <code>下一步</code> 安装直到完成</p>
<p>测试安装结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -v
npm -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">node -v
npm -v</code></pre>
<h2 id="articleHeader5">使用淘宝镜像</h2>
<p>为了加速 npm 的安装速度，我们用淘宝提供的源，这个问题在其它包管理软件也会遇到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm config <span class="hljs-built_in">set</span> registry https://registry.npm.taobao.org</code></pre>
<p>验证配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config get registry" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm config get registry</code></pre>
<p>这样就完成了加速</p>
<h2 id="articleHeader6">安装 cnpm</h2>
<p>其实现在的 cnpm 版本已经很稳定了，早先会有下载包错误问题，毕竟产品成熟需要时间，<a href="http://npm.taobao.org" rel="nofollow noreferrer" target="_blank">cnpm官网</a></p>
<p>全局安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g cnpm
如果你没有配置淘宝镜像可以参数传入加速
npm install -g cnpm --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -g cnpm
如果你没有配置淘宝镜像可以参数传入加速
npm install -g cnpm --registry=https://registry.npm.taobao.org</code></pre>
<h2 id="articleHeader7">安装 yarn</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900833?w=998&amp;h=832" src="https://static.alili.tech/img/remote/1460000014900833?w=998&amp;h=832" alt="yarn" title="yarn" style="cursor: pointer; display: inline;"></span></p>
<p>yarn 是个很优秀的包管理程序， react 官方示例都是推荐 yarn 安装，特点就是快，相信不久 npm 也会赶上的，比如已经下载过的包本地做缓存，下次就秒安装了</p>
<p><a href="https://yarnpkg.com" rel="nofollow noreferrer" target="_blank">yarn官网</a></p>
<h3 id="articleHeader8">mac 安装</h3>
<p>homebrew 方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew install yarn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">brew install yarn</code></pre>
<p>如果没有安装 <a href="https://brew.sh" rel="nofollow noreferrer" target="_blank">homebrew</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/usr/bin/ruby -e &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">/usr/bin/ruby <span class="hljs-_">-e</span> <span class="hljs-string">"<span class="hljs-variable">$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)</span>"</span></code></pre>
<h3 id="articleHeader9">windows 安装</h3>
<p>直接下载安装包 <a href="https://yarnpkg.com/latest.msi" rel="nofollow noreferrer" target="_blank">Yarn Setup</a></p>
<p>一路 <code>下一步</code> 安装直到完成</p>
<h2 id="articleHeader10">安装 nrm 包源管理工具</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900834?w=1025&amp;h=208" src="https://static.alili.tech/img/remote/1460000014900834?w=1025&amp;h=208" alt="nrm -- NPM registry manager" title="nrm -- NPM registry manager" style="cursor: pointer; display: inline;"></span></p>
<ul><li>安装</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install -g nrm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">cnpm install -g nrm</code></pre>
<ul><li>显示可用源</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> nrm ls

npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
rednpm - http://registry.mirror.cqupt.edu.cn/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; nrm ls

npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
rednpm - http://registry.mirror.cqupt.edu.cn/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/</code></pre>
<ul><li>切换源</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> nrm use npm

  verb config Skipping project config: /Users/hans/.npmrc. (matches userconfig)

  Registry has been set to: https://registry.npmjs.org/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; nrm use npm

  verb config Skipping project config: /Users/hans/.npmrc. (matches userconfig)

  Registry has been <span class="hljs-built_in">set</span> to: https://registry.npmjs.org/</code></pre>
<p>个人喜欢 npm 用官方源，cnpm 用来安装淘宝镜像，这样遇到包问题，可以手动调整，比较灵活。</p>
<h2 id="articleHeader11">安装 n node 版本切换工具</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900835?w=1020&amp;h=211" src="https://static.alili.tech/img/remote/1460000014900835?w=1020&amp;h=211" alt="n – Interactively Manage Your Node.js Versions" title="n – Interactively Manage Your Node.js Versions" style="cursor: pointer;"></span></p>
<ul><li>安装</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install -g n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">cnpm install -g n</code></pre>
<ul><li>本地版本列表</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> n

  node/8.8.1
  node/8.9.4
  node/8.10.0
  node/8.11.1
  node/9.4.0
  node/9.9.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; n

  node/8.8.1
  node/8.9.4
  node/8.10.0
  node/8.11.1
  node/9.4.0
  node/9.9.0</code></pre>
<ul><li>安装、切换 版本</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> n 8.11.2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; n 8.11.2</code></pre>
<ul><li>切换 最新版本</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> n latest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; n latest</code></pre>
<ul><li>切换 最新稳定版本</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> n stable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; n stable</code></pre>
<ul><li>切换 长期支持版本</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> n lts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; n lts</code></pre>
<ul><li>删除本地版本</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> n rm 8.8.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; n rm 8.8.1</code></pre>
<h2 id="articleHeader12">安装 vscode</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900836?w=985&amp;h=592" src="https://static.alili.tech/img/remote/1460000014900836?w=985&amp;h=592" alt="vscode" title="vscode" style="cursor: pointer; display: inline;"></span></p>
<p>推荐理由 微软出品、免费、开源、速度快、轻量级、程序稳定、不卡、不卡、大文件秒开、语法高亮、升级频繁、配置方便</p>
<p>下载后是一个安装包，一路 <code>下一步</code> 安装直到完成</p>
<h2 id="articleHeader13">配置 vscode 格式文件 <code>.editorconfig</code>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
tab_width = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">root = <span class="hljs-literal">true</span>

[*]
charset = utf<span class="hljs-number">-8</span>
indent_style = space
indent_size = <span class="hljs-number">2</span>
end_of_line = lf
insert_final_newline = <span class="hljs-literal">true</span>
trim_trailing_whitespace = <span class="hljs-literal">true</span>
tab_width = <span class="hljs-number">1</span></code></pre>
<p>没有请创建文件</p>
<h2 id="articleHeader14">安装 vscode 插件 eslint</h2>
<ul><li>全局安装</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install -g eslint" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">cnpm install -g eslint</code></pre>
<ul>
<li>我们后面用 <code>脚手架</code> 创建项目，默认生成有 <code>.eslintrc.js</code> 配置文件</li>
<li>安装 vscode 插件, <code>侧栏 &gt; 扩展 &gt; 搜索 eslint</code>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900837?w=1978&amp;h=824" src="https://static.alili.tech/img/remote/1460000014900837?w=1978&amp;h=824" alt="eslint" title="eslint" style="cursor: pointer;"></span></p>
<ul><li>配置 <code>vscode</code> , 打开菜单 <code>文件 &gt; 首选项 &gt; 设置</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;eslint.alwaysShowStatus&quot;: true,
  &quot;eslint.autoFixOnSave&quot;: &quot;off&quot;,
  &quot;eslint.validate&quot;: [
    &quot;javascript&quot;,
    {
      &quot;language&quot;: &quot;html&quot;,
      &quot;autoFix&quot;: true
    },
    {
      &quot;language&quot;: &quot;vue&quot;,
      &quot;autoFix&quot;: true
    },
    &quot;javascriptreact&quot;,
    &quot;html&quot;,
    &quot;vue&quot;
  ],
  &quot;eslint.options&quot;: { &quot;plugins&quot;: [&quot;html&quot;] }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-string">"eslint.alwaysShowStatus"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"eslint.autoFixOnSave"</span>: <span class="hljs-string">"off"</span>,
  <span class="hljs-string">"eslint.validate"</span>: [
    <span class="hljs-string">"javascript"</span>,
    {
      <span class="hljs-string">"language"</span>: <span class="hljs-string">"html"</span>,
      <span class="hljs-string">"autoFix"</span>: <span class="hljs-literal">true</span>
    },
    {
      <span class="hljs-string">"language"</span>: <span class="hljs-string">"vue"</span>,
      <span class="hljs-string">"autoFix"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-string">"javascriptreact"</span>,
    <span class="hljs-string">"html"</span>,
    <span class="hljs-string">"vue"</span>
  ],
  <span class="hljs-string">"eslint.options"</span>: { <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"html"</span>] },</code></pre>
<h2 id="articleHeader15">安装 vscode 插件 prettier - Code formatter</h2>
<p>代码格式化插件</p>
<ul><li>安装 vscode 插件, <code>侧栏 &gt; 扩展 &gt; 搜索 prettier</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900838?w=2050&amp;h=852" src="https://static.alili.tech/img/remote/1460000014900838?w=2050&amp;h=852" alt="prettier" title="prettier" style="cursor: pointer; display: inline;"></span></p>
<ul><li>配置 <code>vscode</code> , 打开菜单 <code>文件 &gt; 首选项 &gt; 设置</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;prettier.singleQuote&quot;: true,
  &quot;prettier.semi&quot;: false,
  &quot;prettier.bracketSpacing&quot;: false,
  &quot;prettier.useTabs&quot;: false,
  &quot;prettier.tabWidth&quot;: 2," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-string">"prettier.singleQuote"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"prettier.semi"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"prettier.bracketSpacing"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"prettier.useTabs"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"prettier.tabWidth"</span>: <span class="hljs-number">2</span>,</code></pre>
<ul><li>使用，鼠标右键点击 <code>格式化文件</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900839?w=759&amp;h=310" src="https://static.alili.tech/img/remote/1460000014900839?w=759&amp;h=310" alt="prettier-format-file" title="prettier-format-file" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader16">安装 vscode 插件 reactjs code snippets</h2>
<p>代码片段工具</p>
<ul><li>安装 vscode 插件, <code>侧栏 &gt; 扩展 &gt; 搜索 reactjs code snippets</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900840?w=2032&amp;h=726" src="https://static.alili.tech/img/remote/1460000014900840?w=2032&amp;h=726" alt="reactjs code snippets" title="reactjs code snippets" style="cursor: pointer;"></span></p>
<ul><li>使用，新建文件 <code>MyApp.js</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900841?w=853&amp;h=494" src="https://static.alili.tech/img/remote/1460000014900841?w=853&amp;h=494" alt="reactjs-snippets-rcc" title="reactjs-snippets-rcc" style="cursor: pointer;"></span></p>
<h2 id="articleHeader17">安装 vscode 插件 Auto Close Tag</h2>
<p>html 标签自动补完插件</p>
<ul><li>安装 vscode 插件, <code>侧栏 &gt; 扩展 &gt; 搜索 Auto Close Tag</code>
</li></ul>
<h2 id="articleHeader18">安装 vscode 插件 Auto Rename Tag</h2>
<p>html 标签改名自动同步插件</p>
<ul><li>安装 vscode 插件, <code>侧栏 &gt; 扩展 &gt; 搜索 Auto Rename Tag</code>
</li></ul>
<h2 id="articleHeader19">安装 vscode 插件 Debugger for Chrome</h2>
<p>vscode chrome 调试工具</p>
<ul><li>安装 vscode 插件, <code>侧栏 &gt; 扩展 &gt; 搜索 Debugger for Chrome</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900842?w=1006&amp;h=266" src="https://static.alili.tech/img/remote/1460000014900842?w=1006&amp;h=266" alt="Debugger for Chrome" title="Debugger for Chrome" style="cursor: pointer; display: inline;"></span></p>
<ul><li>调试配置文件 <code>launch.json</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  &quot;version&quot;: &quot;0.2.0&quot;,
  &quot;configurations&quot;: [
    {
      &quot;name&quot;: &quot;Chrome&quot;,
      &quot;type&quot;: &quot;chrome&quot;,
      &quot;request&quot;: &quot;launch&quot;,
      &quot;url&quot;: &quot;http://localhost:3000&quot;,
      &quot;webRoot&quot;: &quot;${workspaceRoot}/src&quot;,
      &quot;userDataDir&quot;: &quot;${workspaceRoot}/.vscode/chrome&quot;,
      &quot;sourceMapPathOverrides&quot;: {
        &quot;webpack:///src/*&quot;: &quot;${webRoot}/*&quot;
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">// 使用 IntelliSense 了解相关属性。</span>
  <span class="hljs-comment">// 悬停以查看现有属性的描述。</span>
  <span class="hljs-comment">// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387</span>
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
  <span class="hljs-string">"configurations"</span>: [
    {
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"Chrome"</span>,
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"chrome"</span>,
      <span class="hljs-string">"request"</span>: <span class="hljs-string">"launch"</span>,
      <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost:3000"</span>,
      <span class="hljs-string">"webRoot"</span>: <span class="hljs-string">"${workspaceRoot}/src"</span>,
      <span class="hljs-string">"userDataDir"</span>: <span class="hljs-string">"${workspaceRoot}/.vscode/chrome"</span>,
      <span class="hljs-string">"sourceMapPathOverrides"</span>: {
        <span class="hljs-string">"webpack:///src/*"</span>: <span class="hljs-string">"${webRoot}/*"</span>
      }
    }
  ]
}</code></pre>
<ul><li>使用录像</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014900843?w=923&amp;h=634" src="https://static.alili.tech/img/remote/1460000014900843?w=923&amp;h=634" alt="use-debugger-for-chrome" title="use-debugger-for-chrome" style="cursor: pointer;"></span></p>
<blockquote>
<code>http://localhost:3000</code> 服务需要已开启<p>安装完插件都需要重启 <code>vscode</code> 才能生效</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 快速上手 - 02 开发环境搭建

## 原文链接
[https://segmentfault.com/a/1190000014900826](https://segmentfault.com/a/1190000014900826)


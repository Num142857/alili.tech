---
title: 'docsify - 无需构建快速生成文档网站' 
date: 2019-01-30 2:30:23
hidden: true
slug: 60d9a389h5i
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVGh1i?w=2562&amp;h=1972" src="https://static.alili.tech/img/bVGh1i?w=2562&amp;h=1972" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">docsify</h1>
<blockquote><p>无需构建快速生成文档页</p></blockquote>
<p>网站：<a href="https://github.com/qingwei-li/docsify" rel="nofollow noreferrer" target="_blank">https://github.com/qingwei-li...</a><br>文档：<a href="https://docsify.js.org/zh-cn" rel="nofollow noreferrer" target="_blank">https://docsify.js.org/zh-cn</a></p>
<h2 id="articleHeader1">特性</h2>
<ul>
<li><p>无需构建，写完 markdown 直接发布</p></li>
<li><p>支持自定义主题</p></li>
<li><p>容易使用并且轻量</p></li>
</ul>
<h2 id="articleHeader2">快速上手</h2>
<h3 id="articleHeader3">创建项目</h3>
<p>新建一个空项目，接着创建一个 <code>docs</code> 目录并进入到 docs 目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir my-project &amp;&amp; cd my-project
mkdir docs &amp;&amp; cd docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code class="shell"><span class="hljs-built_in">mkdir</span> my-project &amp;&amp; <span class="hljs-built_in">cd</span> my-project
<span class="hljs-built_in">mkdir</span> docs &amp;&amp; <span class="hljs-built_in">cd</span> docs</code></pre>
<h3 id="articleHeader4">创建入口文件</h3>
<p>创建一个 <code>404.html</code> 文件，内容为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <link rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/docsify/themes/vue.css&quot;>
</head>
<body>
  <div id=&quot;app&quot;></div>
</body>
<script src=&quot;//unpkg.com/docsify&quot;></script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//unpkg.com/docsify/themes/vue.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//unpkg.com/docsify"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>新建 <code>README.md</code> 文件，作为主页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Title

## balabala" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># Title</span>

<span class="hljs-meta">## balabala</span></code></pre>
<h3 id="articleHeader5">部署！</h3>
<p>将项目 <code>push</code> 到 GitHub 仓库后到设置页面开启 <strong>GitHub Pages</strong> 功能，选择 <code>docs/</code> 选项<br><span class="img-wrap"><img data-src="/img/remote/1460000007656682?w=792&amp;h=453" src="https://static.alili.tech/img/remote/1460000007656682?w=792&amp;h=453" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">命令行工具</h2>
<p>方便快速创建文档目录，会读取项目的 <code>package.json</code> 里的选项作为 docsify 的配置，支持本地预览。</p>
<h3 id="articleHeader7">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i docsify-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> docsify-cli -g</code></pre>
<h3 id="articleHeader8">初始化文档</h3>
<p>默认初始化在当前目录，推荐将文档放在 <code>docs</code> 目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="docsify init docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">docsify init docs</span></code></pre>
<h3 id="articleHeader9">启动本地服务</h3>
<p>启动一个 server 方便预览，打开 <a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="docsify serve docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">docsify serve docs</span></code></pre>
<p>更多选项参考 <a href="https://github.com/QingWei-Li/docsify-cli" rel="nofollow noreferrer" target="_blank">docsify-cli</a></p>
<h2 id="articleHeader10">主题</h2>
<p>目前提供 vue.css 和 buble.css，直接修改 <code>404.html</code> 里的 cdn 地址即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/docsify/themes/vue.css&quot;>
<link rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/docsify/themes/buble.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//unpkg.com/docsify/themes/vue.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//unpkg.com/docsify/themes/buble.css"</span>&gt;</span></code></pre>
<p>压缩版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/docsify/lib/themes/vue.css&quot;>
<link rel=&quot;stylesheet&quot; href=&quot;//unpkg.com/docsify/lib/themes/buble.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//unpkg.com/docsify/lib/themes/vue.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//unpkg.com/docsify/lib/themes/buble.css"</span>&gt;</span></code></pre>
<h2 id="articleHeader11">更多功能</h2>
<h3 id="articleHeader12">多页面</h3>
<p><code>README.md</code> 作为主页面，如果需要其他页面，直接在文档目录下创建对应的 <code>*.md</code> 文件，例如创建一个 <code>guide.md</code> 那么对应的路由就是 <code>/guide</code>。</p>
<h3 id="articleHeader13">导航</h3>
<p>导航需要自己写在 <code>404.html</code> 文件里，效果参考本文档</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav>
  <a href=&quot;/docsify/&quot;>En</a>
  <a href=&quot;/docsify/zh-cn&quot;>中文</a>
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/docsify/"</span>&gt;</span>En<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/docsify/zh-cn"</span>&gt;</span>中文<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<h3 id="articleHeader14">配置参数</h3>
<h4>repo</h4>
<p>参考本文档的右上角的 GitHub 图标，如果要开启的话，将 <code>404.html</code> 里的 script 改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//unpkg.com/docsify&quot; data-repo=&quot;your/repo&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//unpkg.com/docsify"</span> <span class="hljs-attr">data-repo</span>=<span class="hljs-string">"your/repo"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>max-level</h4>
<p>目录最大展开层级，默认值为 6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//unpkg.com/docsify&quot; data-max-level=&quot;6&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//unpkg.com/docsify"</span> <span class="hljs-attr">data-max-level</span>=<span class="hljs-string">"6"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>el</h4>
<p>替换节点元素，默认为 <code>#app</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//unpkg.com/docsify&quot; data-el=&quot;#app&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//unpkg.com/docsify"</span> <span class="hljs-attr">data-el</span>=<span class="hljs-string">"#app"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>sidebar-toggle</h4>
<p>Sidebar 开关按钮</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//unpkg.com/docsify&quot; data-sidebar-toggle></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//unpkg.com/docsify"</span> <span class="hljs-attr">data-sidebar-toggle</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>sidebar</h4>
<p>设置后 TOC 功能将不可用，适合导航较多的文档，<code>data-sidebar</code> 传入全局变量名。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007656683?w=297&amp;h=174" src="https://static.alili.tech/img/remote/1460000007656683?w=297&amp;h=174" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  window.sidebar = [
    { slug: '/', title: 'Home' },
    {
      slug: '/pageA',
      title: 'page A',
      children: [
        { slug: '/pageA/childrenB', title: 'children B' }
      ]
    },
    { slug: '/PageC', title: 'Page C' }
  ]
</script>
<script src=&quot;/lib/docsify.js&quot; data-sidebar=&quot;sidebar&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-built_in">window</span>.sidebar = [
    { <span class="hljs-attr">slug</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Home'</span> },
    {
      <span class="hljs-attr">slug</span>: <span class="hljs-string">'/pageA'</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'page A'</span>,
      <span class="hljs-attr">children</span>: [
        { <span class="hljs-attr">slug</span>: <span class="hljs-string">'/pageA/childrenB'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'children B'</span> }
      ]
    },
    { <span class="hljs-attr">slug</span>: <span class="hljs-string">'/PageC'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Page C'</span> }
  ]
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/lib/docsify.js"</span> <span class="hljs-attr">data-sidebar</span>=<span class="hljs-string">"sidebar"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>load-sidebar</h4>
<p>读取侧边栏配置文件，如果配置，默认加载当前目录下的 <code>_sidebar.md</code>。如果文件不存在，会显示 TOC 作为侧边栏内容。如果你有二级目录，也应该放置一份配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/lib/docsify.js&quot; data-load-sidebar></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/lib/docsify.js"</span> <span class="hljs-attr">data-load-sidebar</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>你可以指定侧边栏文件名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/lib/docsify.js&quot; data-load-sidebar=&quot;_sidebar.md&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/lib/docsify.js"</span> <span class="hljs-attr">data-load-sidebar</span>=<span class="hljs-string">"_sidebar.md"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><code>_sidebar.md</code> 的内容可以是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- [Home](/)
- [Installation](/installation)
- Essentials
  - [Getting Started](/getting-started)
  - [Dynamic Route Matching](/dynamic-matching)
  - [Nested Routes](/nested-routes)
  - [Programmatic Navigation](/navigation)
  - [Named Routes](/named-routes)
  - [Named Views](/named-views)
  - [Redirect and Alias](/redirect-and-alias)
  - [HTML5 History Mode](/history-mode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown"><span class="hljs-bullet">- </span>[<span class="hljs-string">Home</span>](<span class="hljs-link">/</span>)
<span class="hljs-bullet">- </span>[<span class="hljs-string">Installation</span>](<span class="hljs-link">/installation</span>)
<span class="hljs-bullet">- </span>Essentials
  - [<span class="hljs-string">Getting Started</span>](<span class="hljs-link">/getting-started</span>)
  - [<span class="hljs-string">Dynamic Route Matching</span>](<span class="hljs-link">/dynamic-matching</span>)
  - [<span class="hljs-string">Nested Routes</span>](<span class="hljs-link">/nested-routes</span>)
  - [<span class="hljs-string">Programmatic Navigation</span>](<span class="hljs-link">/navigation</span>)
  - [<span class="hljs-string">Named Routes</span>](<span class="hljs-link">/named-routes</span>)
  - [<span class="hljs-string">Named Views</span>](<span class="hljs-link">/named-views</span>)
  - [<span class="hljs-string">Redirect and Alias</span>](<span class="hljs-link">/redirect-and-alias</span>)
  - [<span class="hljs-string">HTML5 History Mode</span>](<span class="hljs-link">/history-mode</span>)</code></pre>
<h4>load-navbar</h4>
<p>读取导航配置文件，如果配置，默认加载当前目录下的 <code>_navbar.md</code>。如果文件不存在，会显示 html 里定义的导航栏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/lib/docsify.js&quot; data-load-navbar></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/lib/docsify.js"</span> <span class="hljs-attr">data-load-navbar</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>你可以指定导航栏文件名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/lib/docsify.js&quot; data-load-navbar=&quot;_navbar.md&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/lib/docsify.js"</span> <span class="hljs-attr">data-load-navbar</span>=<span class="hljs-string">"_navbar.md"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><code>_navbar.md</code> 的内容可以是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- [en](/)
- [中文](/zh-cn)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown"><span class="hljs-bullet">- </span>[<span class="hljs-string">en</span>](<span class="hljs-link">/</span>)
<span class="hljs-bullet">- </span>[<span class="hljs-string">中文</span>](<span class="hljs-link">/zh-cn</span>)</code></pre>
<p>当然也支持二级列表，将生成一个下拉列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- [download](/download)
- language
  - [en](/)
  - [中文](/zh-cn)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown"><span class="hljs-bullet">- </span>[<span class="hljs-string">download</span>](<span class="hljs-link">/download</span>)
<span class="hljs-bullet">- </span>language
  - [<span class="hljs-string">en</span>](<span class="hljs-link">/</span>)
  - [<span class="hljs-string">中文</span>](<span class="hljs-link">/zh-cn</span>)</code></pre>
<h2 id="articleHeader15">FAQ</h2>
<h3 id="articleHeader16">为什么是 <code>404.html</code> 而不用 <code>index.html</code>
</h3>
<p>docsify 想要实现的是用最简单的方式 <strong>动态渲染内容</strong>。</p>
<p>例如我有两个文档分别为 <code>README.md</code> 和 <code>guide.md</code>，如果我用 <code>index.html</code> 作为文件名，<code>README.md</code> 可以被正确的渲染因为我们已经规定它为首页文件，但是如果我们访问 <code>my-domain.com/guide</code> 想要得到的结果是 <code>guide.md</code> 的内容，它将无法工作，因为目录下并不存在一个 <code>guide.html</code> 的文件。</p>
<p>但是 GitHub Pages 服务器找不到资源， 就会回退并渲染 <code>404.html</code> 文件。?</p>
<hr>
<p>网站：<a href="https://github.com/qingwei-li/docsify" rel="nofollow noreferrer" target="_blank">https://github.com/qingwei-li...</a><br>文档：<a href="https://docsify.js.org/zh-cn" rel="nofollow noreferrer" target="_blank">https://docsify.js.org/zh-cn</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
docsify - 无需构建快速生成文档网站

## 原文链接
[https://segmentfault.com/a/1190000007656679](https://segmentfault.com/a/1190000007656679)


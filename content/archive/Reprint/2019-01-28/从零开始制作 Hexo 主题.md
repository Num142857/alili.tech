---
title: '从零开始制作 Hexo 主题' 
date: 2019-01-28 2:30:09
hidden: true
slug: l1443vraki8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文地址：<a href="http://www.ahonn.me/2016/12/15/create-a-hexo-theme-from-scratch/" rel="nofollow noreferrer" target="_blank"> 从零开始制作 Hexo 主题 · Ahonn </a></p></blockquote>
<h2 id="articleHeader0">写在前面</h2>
<p>本文将会从零开始开发一个简单的博客主题。样式主要参考 <a href="https://hexo.io/themes/" rel="nofollow noreferrer" target="_blank">Hexo theme</a> 中的 <a href="https://github.com/lotabout/hexo-theme-noise" rel="nofollow noreferrer" target="_blank">Noise</a> 主题。 </p>
<p>开始之前你需要了解：</p>
<ul>
<li><p>模板引擎</p></li>
<li><p>CSS预处理器</p></li>
<li><p>Hexo 文档</p></li>
</ul>
<p>本文使用的模板引擎为 <a href="http://www.embeddedjs.com/" rel="nofollow noreferrer" target="_blank">ejs</a>，使用的 CSS 预处理器为 <a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">stylus</a>。这也是 hexo 项目预装了的 render 插件，如果想使用其他模板引擎或者其他 CSS 预处理器，可以安装相对应的 render 插件。例如我的 <a href="https://github.com/ahonn/hexo-theme-even" rel="nofollow noreferrer" target="_blank">Even</a> 主题使用的是 Swig 与 SCSS。</p>
<p>本文的代码： <a href="https://github.com/ahonn/theme-example" rel="nofollow noreferrer" target="_blank">theme-example</a> 。</p>
<h2 id="articleHeader1">目录结构</h2>
<p>主题目录结构以自带的 <a href="https://github.com/hexojs/hexo-theme-landscape" rel="nofollow noreferrer" target="_blank">landscape</a> 主题为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── languages  语言文件，用于国际化
├── layout     页面模板文件
├── scripts    Hexo 脚本
└── source     主题资源文件，包括页面样式，脚本，字体等" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>.
├── languages  语言文件，用于国际化
├── <span class="hljs-keyword">layout</span>     页面模板文件
├── scripts    Hexo 脚本
└── <span class="hljs-keyword">source</span>     主题资源文件，包括页面样式，脚本，字体等</code></pre>
<p>我们在 <code>themes</code> 中新建 <code>theme-example</code> 文件夹，然后在 <code>theme-demo</code> 中按照 landscape 主题的目录结构新建 <code>languages</code>，<code>layout</code>，<code>scripts</code> 与 <code>source</code> 文件夹。</p>
<h2 id="articleHeader2">创建布局模板</h2>
<p>在 <code>layout</code> 中创建 <code>index.ejs</code> 文件，首页将会使用该布局模板生成 HTML 文件。</p>
<p><code>layout/index.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <head>
    <meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=utf-8&quot;>
    <meta content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0&quot; name=&quot;viewport&quot;>
    <title>Home</title>
  </head>
  <body>
    <h1>Hello Word</h1>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"content-type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Word<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>修改站点配置文件中的主题配置，使用我们刚刚创建的 <code>theme-example</code> 主题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: theme-example" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code class="yml"># Extensions
## Plugins: https:<span class="hljs-comment">//hexo.io/plugins/</span>
## Themes: https:<span class="hljs-comment">//hexo.io/themes/</span>
theme: theme-example</code></pre>
<p>运行 <code>hexo server --debug</code> 以 debug 模式开启 Hexo 本地服务器预览，访问 <a href="http://localhost:4000/" rel="nofollow noreferrer" target="_blank">http://localhost:4000/</a>。</p>
<p><span class="img-wrap"><img data-src="http://ww2.sinaimg.cn/large/006tNc79gw1farp8irho3j30dq058t8s.jpg" src="https://static.alili.techhttp://ww2.sinaimg.cn/large/006tNc79gw1farp8irho3j30dq058t8s.jpg" alt="Hello World" title="Hello World" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">添加页面导航</h2>
<p>现在我们需要在页面中添加导航，由于导航不单单会在首页出现，所以我们在 <code>layout</code> 中创建共用的布局文件 <code>layout.ejs</code>， 同时创建 <code>_partial/head.ejs</code> 保存 HTML 的 head 以及创建 <code>_partial/header.ejs</code> 文件，编写页面导航部分。</p>
<p><code>layout/layout.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <%- partial('_partial/head') %>
  <body>
    <%- partial('_partial/header') %>
    <main class=&quot;main&quot;>
      <%- body %>
    </main>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">partial</span>('<span class="hljs-attr">_partial</span>/<span class="hljs-attr">head</span>') %&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">partial</span>('<span class="hljs-attr">_partial</span>/<span class="hljs-attr">header</span>') %&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">body</span> %&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>layout.ejs</code> 文件通过 <code>partial()</code> 函数来包含其他文件，使得我们能够更好的组织代码。详见 <a href="https://hexo.io/docs/templates.html#Partials" rel="nofollow noreferrer" target="_blank">Templates | Hexo</a>。</p>
<p><code>layout/_partial/head.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=utf-8&quot;>
  <meta content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0&quot; name=&quot;viewport&quot;>
  <title><%= config.title %></title>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"content-type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">config.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p>这里使用了 <code>config</code> 变量，该变量包含的是站点配置（即站点根目录下 <code>_config.yml</code> 中的配置）。除此之外，Hexo 还提供了许多变量可在模板中使用，详见 <a href="https://hexo.io/docs/variables.html" rel="nofollow noreferrer" target="_blank">Variables | Hexo</a>。</p>
<p><code>layout/_partial/header.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header class=&quot;header&quot;>
  <div class=&quot;blog-title&quot;>
    <a href=&quot;<%- url_for() %>&quot; class=&quot;logo&quot;><%= config.title %></a>
  </div>
  <nav class=&quot;navbar&quot;>
    <ul class=&quot;menu&quot;>
      <li class=&quot;menu-item&quot;>
        <a href=&quot;/&quot; class=&quot;menu-item-link&quot;>Home</a>
      </li>
      <li class=&quot;menu-item&quot;>
        <a href=&quot;/archives&quot; class=&quot;menu-item-link&quot;>Archive</a>
      </li>
    </ul>
  </nav>
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for() %&gt;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">config.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item-link"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/archives"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item-link"</span>&gt;</span>Archive<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<p>接着我们清空 <code>index.ejs</code> 中的内容，并添加 <code>&lt;h2&gt;Hello World&lt;/h2&gt;</code>。在 <code>layout</code> 目录下的 <code>index.ejs</code> 会自动继承 <code>layout.ejs</code>，并将其中的内容填入 <code>&lt;%- body %&gt;</code> 的位置。我们将得到一个有导航菜单的 Hello World 页面。</p>
<p><span class="img-wrap"><img data-src="http://ww3.sinaimg.cn/large/006tNc79gw1farv6wgpe1j308t05tjrk.jpg" src="https://static.alili.techhttp://ww3.sinaimg.cn/large/006tNc79gw1farv6wgpe1j308t05tjrk.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">添加主题配置文件</h2>
<p>实际上我们需要让导航菜单根据我们的需要显示不同的项，上面这种写法不方便修改。所以我们会在主题的配置文件中添加导航菜单的配置。在 <code>thmem-demo</code> 下新建主题的配置文件 <code>_config.yml</code>，在其中添加需要配置的字段。然后可以通过 <code>theme</code> 这个变量来拿到该配置文件中的配置。</p>
<p><code>theme-demo/_config.yml</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="menu:
  Home: /
  Archives: /archives" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="yml"><span class="hljs-symbol">menu:</span>
<span class="hljs-symbol">  Home:</span> /
<span class="hljs-symbol">  Archives:</span> /archives</code></pre>
<p>这样我们就可以在 <code>header.ejs</code> 中使用 <code>theme.menu</code> 获取到导航菜单的设置。将 <code>header.ejs</code> 修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header class=&quot;header&quot;>
  <div class=&quot;blog-title&quot;>
    <a href=&quot;<%- url_for() %>&quot; class=&quot;logo&quot;><%= config.title %></a>
  </div>
  <nav class=&quot;navbar&quot;>
    <ul class=&quot;menu&quot;>
      <% for (name in theme.menu) { %>
        <li class=&quot;menu-item&quot;>
          <a href=&quot;<%- url_for(theme.menu[name]) %>&quot; class=&quot;menu-item-link&quot;><%= name %></a>
        </li>
      <% } %>
    </ul>
  </nav>
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for() %&gt;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">config.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span> (<span class="hljs-attr">name</span> <span class="hljs-attr">in</span> <span class="hljs-attr">theme.menu</span>) { %&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for(theme.menu[name]) %&gt;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item-link"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">name</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<p>当需要在导航中添加链接的时候就可以在配置文件中直接添加，例如添加 Github 的链接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="menu:
  Home: /
  Archives: /archives
  Github: https://github.com/ahonn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code class="yml"><span class="hljs-attribute">menu</span>:
  <span class="hljs-attribute">Home</span>: /
  <span class="hljs-attribute">Archives</span>: /archives
  <span class="hljs-attribute">Github</span>: <span class="hljs-attribute">https</span>:<span class="hljs-comment">//github.com/ahonn</span></code></pre>
<p>除此之外还可以添加其他需要的配置，例如 RSS，评论等等。</p>
<h2 id="articleHeader5">添加首页文章列表</h2>
<p>接着我们完善首页的模板，使其能够显示文章列表。前面已经说过 Hexo 提供了各种有用的变量，在这里将会使用到 <code>page</code> 这个变量。<code>page</code> 会根据不同的页面拥有不同的属性。具体有什么属性，可以获取到哪些数据可以查看<a href="https://hexo.io/docs/variables.html#Page-Variables" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>那么这里我们会使用 <code>page</code> 变量的 <code>posts</code> 属性拿到文章数据的集合。编辑 <code>index.ejs</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;posts&quot;>
  <% page.posts.each(function (post) { %>
    <article class=&quot;post&quot;>
      <div class=&quot;post-title&quot;>
        <a class=&quot;post-title-link&quot; href=&quot;<%- url_for(post.path) %>&quot;><%= post.title %></a>
      </div>
      <div class=&quot;post-content&quot;>
        <%- post.content %>
      </div>
      <div class=&quot;post-meta&quot;>
        <span class=&quot;post-time&quot;><%- date(post.date, &quot;YYYY-MM-DD&quot;) %></span>
      </div>
    </article>
  <% }) %>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"posts"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">page.posts.each</span>(<span class="hljs-attr">function</span> (<span class="hljs-attr">post</span>) { %&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-title"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-title-link"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for(post.path) %&gt;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">post.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">post.content</span> %&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-meta"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-time"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">date</span>(<span class="hljs-attr">post.date</span>, "<span class="hljs-attr">YYYY-MM-DD</span>") %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%</span> }) %&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<p>从 <code>page.posts</code> 中获取单篇文章的数据，并获取文章的标题，内容等数据填充到模板中。处理文章创建时间的时候使用了 <code>date()</code> 函数，这是 Hexo 提供的时间处理的<a href="https://hexo.io/docs/helpers.html#date" rel="nofollow noreferrer" target="_blank">辅助函数</a>。本文中使用到的函数如无特别说明，即为 Hexo 的辅助函数。</p>
<h3 id="articleHeader6">文章摘录</h3>
<p>由于首页显示文章内容时使用的是 <code>post.content</code>，即文章的全部内容。所以首页会显示每一篇文章的内容，实际上我们并不想在首页显示那么多内容，只想显示文章的摘录。</p>
<p>Hexo 提供了 <code>excerpt</code> 属性来获取文章的摘录部分，不过这里需要在文章中添加一个 <code>&lt;!-- more --&gt;</code> 标记。添加了这个标记之后，<code>post.excerpt</code> 将会获取到标记之前的内容。如果没有这个标记，那么 <code>post.excerpt</code> 会是空的。所以我们可以把首页文章内容部分的 <code>post.content</code> 替换成 <code>post.excerpt</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;post-content&quot;>
  <%- post.excerpt %>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">post.excerpt</span> %&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader7">添加页面样式</h2>
<p>到目前为止，我们完成了首页的页面结构，但是并没有添加样式，所以看起来很丑。我们在 <code>source</code> 文件中创建一个 <code>css</code> 文件夹来存放样式文件。</p>
<p>由于 Hexo 在新建项目的时候会安装 <code>hexo-renderer-stylus</code> 这个插件，所以我们无需其他步骤，只需要将样式文件放到 <code>css</code> 文件夹中。Hexo 在生成页面的时候会将 <code>source</code> 中的所有文件复制到生成的 <code>public</code> 文件中，并且在此之前会编译 styl 为 css 文件。</p>
<p>在 <code>css</code> 文件夹中创建 <code>style.styl</code>，编写一些基础的样式，并把所有样式 <code>import</code> 到这个文件。所以最终编译之后只会有 <code>style.css</code> 一个文件。创建 <code>_partial/header.styl</code> 与 <code>_partial/post.style</code> 存放页面导航以及文章的样式，并且在 <code>style.styl</code> 中 <code>import</code> 这两个文件。 </p>
<p><code>_partial/header.styl</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".header {
  margin-top: 2em
  display: flex
  align-items: baseline
  justify-content: space-between

  .blog-title .logo {
    color: #AAA;
    font-size: 2em;
    font-family: &quot;Comic Sans MS&quot;,cursive,LiSu,sans-serif;
    text-decoration: none;
  }

  .menu {
    margin: 0;
    padding: 0;

    .menu-item {
      display: inline-block;
      margin-right: 10px;
    }

    .menu-item-link {
      color: #AAA;
      text-decoration: none;

      &amp;:hover {
        color: #368CCB;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">2em</span>
  <span class="hljs-attribute">display</span>: flex
  <span class="hljs-attribute">align-items</span>: baseline
  <span class="hljs-attribute">justify-content</span>: space-between

  <span class="hljs-selector-class">.blog-title</span> <span class="hljs-selector-class">.logo</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#AAA</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Comic Sans MS"</span>,cursive,LiSu,sans-serif;
    <span class="hljs-attribute">text-decoration</span>: none;
  }

  <span class="hljs-selector-class">.menu</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;

    <span class="hljs-selector-class">.menu-item</span> {
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
    }

    <span class="hljs-selector-class">.menu-item-link</span> {
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#AAA</span>;
      <span class="hljs-attribute">text-decoration</span>: none;

      &amp;:hover {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#368CCB</span>;
      }
    }
  }
}</code></pre>
<p><code>_partial/post.style</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".post {
  margin: 1em auto;
  padding: 30px 50px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 2px #ddd;
}

.posts  {
  .post:first-child {
    margin-top: 0;
  }

  .post-title {
    font-size: 1.5em;

    .post-title-link {
      color: #368CCB;
      text-decoration: none;
    }
  }

  .post-content {
    a {
      color: #368CCB;
      text-decoration: none;
    }
  }

  .post-meta {
    color: #BABABA;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-class">.post</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> auto;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span> <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">#ddd</span>;
}

<span class="hljs-selector-class">.posts</span>  {
  <span class="hljs-selector-class">.post</span>:first-child {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;
  }

  <span class="hljs-selector-class">.post-title</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5em</span>;

    <span class="hljs-selector-class">.post-title-link</span> {
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#368CCB</span>;
      <span class="hljs-attribute">text-decoration</span>: none;
    }
  }

  <span class="hljs-selector-class">.post-content</span> {
    <span class="hljs-selector-tag">a</span> {
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#368CCB</span>;
      <span class="hljs-attribute">text-decoration</span>: none;
    }
  }

  <span class="hljs-selector-class">.post-meta</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#BABABA</span>;
  }
}</code></pre>
<p><code>style.styl</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  background-color: #F2F2F2;
  font-size: 1.25rem;
  line-height: 1.5;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

@import &quot;_partial/header&quot;;
@import &quot;_partial/post&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F2F2F2</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.25rem</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5</span>;
}

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">960px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}

@import <span class="hljs-string">"_partial/header"</span>;
@import <span class="hljs-string">"_partial/post"</span>;</code></pre>
<p>最后，我们需要把样式添加到页面中，这里使用了另外一个辅助函数 <a href="https://hexo.io/docs/helpers.html#css" rel="nofollow noreferrer" target="_blank"><code>css()</code></a>:</p>
<p><code>layout/_partial/head.ejs</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=utf-8&quot;>
  <meta content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0&quot; name=&quot;viewport&quot;>
  <title><%= config.title %></title>
  <%- css('css/style.css') %>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"content-type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">config.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">css</span>('<span class="hljs-attr">css</span>/<span class="hljs-attr">style.css</span>') %&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p>至此，我们会看到站点的首页是这个样子的：</p>
<p><span class="img-wrap"><img data-src="http://ww3.sinaimg.cn/large/006tNc79gw1fasg7y42bqj314h0i6jv1.jpg" src="https://static.alili.techhttp://ww3.sinaimg.cn/large/006tNc79gw1fasg7y42bqj314h0i6jv1.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">添加分页</h2>
<p>在站点的 <code>source/_post/</code> 目录下存放的是我们的文章，现在我们把原本的 <code>hello-world.md</code> 复制黏贴 10+ 次，再查看站点首页。会发现，首页只显示了 10 篇文章。</p>
<p>首页显示的文章数量我们可以通过站点配置文件中的 <code>per_page</code> 字段来修改，但是我们不可能把所有文章都放在一页，所以我们现在来添加文章列表的分页。</p>
<p>新建 <code>_partial/paginator.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% if (page.total > 1){ %>
  <nav class=&quot;page-nav&quot;>
    <%- paginator({
      prev_text: &quot;&amp;laquo; Prev&quot;,
      next_text: &quot;Next &amp;raquo;&quot;
    }) %>
  </nav>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">page.total</span> &gt;</span> 1){ %&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">paginator</span>({
      <span class="hljs-attr">prev_text:</span> "&amp;<span class="hljs-attr">laquo</span>; <span class="hljs-attr">Prev</span>",
      <span class="hljs-attr">next_text:</span> "<span class="hljs-attr">Next</span> &amp;<span class="hljs-attr">raquo</span>;"
    }) %&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span></code></pre>
<p>在 <code>index.ejs</code> 中添加这个文件的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
</section>
<%- partial('_partial/paginator') %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">...
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">partial</span>('<span class="hljs-attr">_partial</span>/<span class="hljs-attr">paginator</span>') %&gt;</span></code></pre>
<p>这里我们使用到了另外的一个辅助函数 <a href="https://hexo.io/docs/helpers.html#paginator" rel="nofollow noreferrer" target="_blank"><code>paginator</code></a>，它能够帮助我们插入分页链接。</p>
<h2 id="articleHeader9">添加文章详情页</h2>
<p>文章详情页对应的布局文件是 <code>post.ejs</code>，新建 <code>post.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<article class=&quot;post&quot;>
  <div class=&quot;post-title&quot;>
    <h2 class=&quot;title&quot;><%= page.title %></h2>
  </div>
   <div class=&quot;post-meta&quot;>
    <span class=&quot;post-time&quot;><%- date(page.date, &quot;YYYY-MM-DD&quot;) %></span>
  </div>
  <div class=&quot;post-content&quot;>
    <%- page.content %>
  </div>
</article>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">page.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-meta"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-time"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">date</span>(<span class="hljs-attr">page.date</span>, "<span class="hljs-attr">YYYY-MM-DD</span>") %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">page.content</span> %&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></code></pre>
<p>由于这里是文章的模板，所以变量 <code>page</code> 表示的是文章的数据，而不是首页的文章数据集合。</p>
<h2 id="articleHeader10">添加归档页</h2>
<p>创建归档页使用的模板文件 <code>archive.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;archive&quot;>
  <ul class=&quot;post-archive&quot;>
    <% page.posts.each(function (post) { %>
      <li class=&quot;post-item&quot;>
        <span class=&quot;post-date&quot;><%= date(post.date, &quot;YYYY-MM-DD&quot;) %></span>
        <a class=&quot;post-title&quot; href=&quot;<%- url_for(post.path) %>&quot;><%= post.title %></a>
      </li>
    <% }) %>
  </ul>
</section>
<%- partial('_partial/paginator') %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"archive"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-archive"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">page.posts.each</span>(<span class="hljs-attr">function</span> (<span class="hljs-attr">post</span>) { %&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-item"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-date"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">date</span>(<span class="hljs-attr">post.date</span>, "<span class="hljs-attr">YYYY-MM-DD</span>") %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post-title"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for(post.path) %&gt;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">post.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> }) %&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">partial</span>('<span class="hljs-attr">_partial</span>/<span class="hljs-attr">paginator</span>') %&gt;</span></code></pre>
<p>其实结构跟首页差不多，只是不显示文章内容而已。添加归档页的样式：</p>
<p><code>css/_partial/archive.styl</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".archive {
  margin: 1em auto;
  padding: 30px 50px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 2px #ddd;

  .post-archive {
    list-style: none;
    padding: 0;

    .post-item {
      margin: 5px 0;

      .post-date {
        display: inline-block;
        margin-right: 10px;
        color: #BABABA;
      }

      .post-title {
        color: #368CCB;
        text-decoration: none;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-class">.archive</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> auto;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span> <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">#ddd</span>;

  <span class="hljs-selector-class">.post-archive</span> {
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;

    <span class="hljs-selector-class">.post-item</span> {
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span> <span class="hljs-number">0</span>;

      <span class="hljs-selector-class">.post-date</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#BABABA</span>;
      }

      <span class="hljs-selector-class">.post-title</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#368CCB</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
      }
    }
  }
}</code></pre>
<h2 id="articleHeader11">国际化</h2>
<p>还记得我们一开始创建的 <code>languages</code> 文件夹吗？没错，它是用来添加多种语言，用于 i18n 的。站点的语言设置为站点配置文件中的 <code>language</code>。</p>
<p>当该字段为空时，默认使用的是 <code>languages/default.yml</code> 这个文件。那么现在我们来添加这个文件，我们决定主题的默认语言是英文：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Menu:
  Home: Home
  Archives: Archives
  Github: Github

Paginator:
  Prev: Prev
  Next: Next" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="yml"><span class="hljs-symbol">Menu:</span>
<span class="hljs-symbol">  Home:</span> Home
<span class="hljs-symbol">  Archives:</span> Archives
<span class="hljs-symbol">  Github:</span> Github
<span class="hljs-symbol">
Paginator:</span>
<span class="hljs-symbol">  Prev:</span> Prev
<span class="hljs-symbol">  Next:</span> Next</code></pre>
<p>目前我们需要主题根据选择的语言自动修改的有上面这些，接着我们需要修改 <code>header.ejs</code> 与 <code>paginator.ejs</code> 这两个文件：</p>
<p><code>_partial/header.ejs</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header class=&quot;header&quot;>
  <div class=&quot;blog-title&quot;>
    <a href=&quot;<%- url_for() %>&quot; class=&quot;logo&quot;><%= config.title %></a>
  </div>
  <nav class=&quot;navbar&quot;>
    <ul class=&quot;menu&quot;>
      <% for (name in theme.menu) { %>
        <li class=&quot;menu-item&quot;>
          <a href=&quot;<%- url_for(theme.menu[name]) %>&quot; class=&quot;menu-item-link&quot;><%- __('Menu.' + name) %></a>
        </li>
      <% } %>
    </ul>
  </nav>
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for() %&gt;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">config.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span> (<span class="hljs-attr">name</span> <span class="hljs-attr">in</span> <span class="hljs-attr">theme.menu</span>) { %&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%- url_for(theme.menu[name]) %&gt;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item-link"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">__</span>('<span class="hljs-attr">Menu.</span>' + <span class="hljs-attr">name</span>) %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<p><code>_partial/paginator.ejs</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% if (page.total > 1){ %>
  <nav class=&quot;page-nav&quot;>
    <%- paginator({
      prev_text: &quot;&amp;laquo;&quot; + __('Paginator.Prev'),
      next_text: __('Paginator.Next') + &quot;&amp;raquo;&quot;
    }) %>
  </nav>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">page.total</span> &gt;</span> 1){ %&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%-</span> <span class="hljs-attr">paginator</span>({
      <span class="hljs-attr">prev_text:</span> "&amp;<span class="hljs-attr">laquo</span>;" + <span class="hljs-attr">__</span>('<span class="hljs-attr">Paginator.Prev</span>'),
      <span class="hljs-attr">next_text:</span> <span class="hljs-attr">__</span>('<span class="hljs-attr">Paginator.Next</span>') + "&amp;<span class="hljs-attr">raquo</span>;"
    }) %&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span></code></pre>
<p>修改之后其实与之前相比没有什么变化，起码看起来是。现在我们添加一个中文的文件：</p>
<p><code>languages/zh-CN.yml</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Menu:
  Home: 首页
  Archives: 归档
  Github: 交友

Paginator:
  Prev: 上一页
  Next: 下一页" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="yml"><span class="hljs-symbol">Menu:</span>
<span class="hljs-symbol">  Home:</span> 首页
<span class="hljs-symbol">  Archives:</span> 归档
<span class="hljs-symbol">  Github:</span> 交友
<span class="hljs-symbol">
Paginator:</span>
<span class="hljs-symbol">  Prev:</span> 上一页
<span class="hljs-symbol">  Next:</span> 下一页</code></pre>
<p>然后我们将站点配置文件中的 <code>language</code> 字段修改为 <code>zh-CN</code>（与 <code>zh-CN.yml</code> 文件名相同）。再次访问站点之后就会发现导航与分页部分的文字变成了中文。</p>
<h2 id="articleHeader12">最后总结</h2>
<p>如果你有耐心看我废话了这么多的话，恭喜你，你应该对怎么去写一个 Hexo 主题有了一定的了解。其实说白了，Hexo 就是把那些 Markdown 文件按照不同的布局模板，填上对应的数据生成 HTML 页面，复制 <code>source</code> 中的到生成的 <code>public</code> 文件夹中，中间过程会把需要编译的 stylus/less/sass 等文件编译。</p>
<p>本文并没有提及有关页面 JavaScript 的部分，实际上与写 CSS 样式相同。在 <code>source/js</code> 中写 JavaScript 脚本，然后在模板中引入即可。</p>
<p>感谢阅读，希望对你有所帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始制作 Hexo 主题

## 原文链接
[https://segmentfault.com/a/1190000008040387](https://segmentfault.com/a/1190000008040387)


---
title: 'Vue 基于 NUXT 的 SSR' 
date: 2019-01-29 2:30:10
hidden: true
slug: 4yk3gd730j
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000007933352?w=1295&amp;h=616" src="https://static.alili.tech/img/remote/1460000007933352?w=1295&amp;h=616" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">SSR</h2>
<p>首先说下 SSR，最近很热的词，意为 Server Side Rendering（服务端渲染），目的是为了解决单页面应用的 SEO 的问题，对于一般网站影响不大，但是对于论坛类，内容类网站来说是致命的，搜索引擎无法抓取页面相关内容，也就是用户搜不到此网站的相关信息。</p>
<p>抓取页面的前提是 html 含有被抓取内容，我们不妨看看基于 vue 的线上 SPA 页面请求时返回了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>iDareX敢玩</title>
    <meta name=keywords content=&quot;敢玩, iDareX, 敢玩TV, 敢玩活动, 敢玩自频道, 敢玩主题, 户外, 极限运动, 周边游, 探险, 时尚, 新潮, 运动视频, 体育, 新奇, 生活方式, 刺激, 惊险, 户外装备, 达人, 90后&quot;>
    <meta name=description content=自2014年10月创办以来，敢玩专注于极限户外和娱乐体育。从顽童、玩具、玩法三个方面，产出更专注于‘玩’的内容，已打造了一系列深受喜爱的娱乐体育真人秀和引爆网络的运动视频。!>
    <meta name=renderer content=webkit>
    <meta name=force-rendering content=webkit>
    <meta name=viewport content=&quot;width=1140&quot;>
    <meta http-equiv=X-UA-Compatible content=&quot;IE=edge,chrome=1&quot;>
    <link rel=&quot;shortcut icon&quot; href=static/favicon.ico type=image/x-icon>
    <link href=/static/css/app.eef5b81a3d1bee5054a791f452a34147.css rel=stylesheet>
  </head>
  <body>
    <div id=app></div>
    <script type=text/javascript src=/static/js/manifest.6d0adb8f2d8884be1c03.js></script>
    <script type=text/javascript src=/static/js/vendor.ec1cc90c9847c434ba7d.js></script>
    <script type=text/javascript src=/static/js/app.d7fd10ae7e4a68598037.js></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">utf-8</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>iDareX敢玩<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">keywords</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"敢玩, iDareX, 敢玩TV, 敢玩活动, 敢玩自频道, 敢玩主题, 户外, 极限运动, 周边游, 探险, 时尚, 新潮, 运动视频, 体育, 新奇, 生活方式, 刺激, 惊险, 户外装备, 达人, 90后"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">description</span> <span class="hljs-attr">content</span>=<span class="hljs-string">自2014年10月创办以来，敢玩专注于极限户外和娱乐体育。从顽童、玩具、玩法三个方面，产出更专注于‘玩’的内容，已打造了一系列深受喜爱的娱乐体育真人秀和引爆网络的运动视频。!</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">renderer</span> <span class="hljs-attr">content</span>=<span class="hljs-string">webkit</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">force-rendering</span> <span class="hljs-attr">content</span>=<span class="hljs-string">webkit</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">viewport</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=1140"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">X-UA-Compatible</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortcut icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">static/favicon.ico</span> <span class="hljs-attr">type</span>=<span class="hljs-string">image/x-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">/static/css/app.eef5b81a3d1bee5054a791f452a34147.css</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">stylesheet</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">/static/js/manifest.6d0adb8f2d8884be1c03.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">/static/js/vendor.ec1cc90c9847c434ba7d.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">text/javascript</span> <span class="hljs-attr">src</span>=<span class="hljs-string">/static/js/app.d7fd10ae7e4a68598037.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我们的组件都是这个 html 文件返回后再渲染到 <code>&lt;div id=app&gt;&lt;/div&gt;</code> 里的。这就合理的解释了 SEO 缺陷的原因。</p>
<p>既然说到 SSR 可以解决 SEO 的问题，不难想到原理就是将我们的 html 在服务端渲染，合成完整的 html 文件再输出到浏览器。</p>
<p>另外 SSR 还适用以下场景</p>
<ul>
<li><p>客户端的网络比较慢</p></li>
<li><p>客户端运行在老的或者直接没有 JavaScript 引擎上</p></li>
</ul>
<p>vue 官网给出了 SSR 原理图片</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007933353?w=1295&amp;h=669" src="https://static.alili.tech/img/remote/1460000007933353?w=1295&amp;h=669" alt="" title="" style="cursor: pointer;"></span></p>
<p>对于这幅图的原理官网有详细解释，此类文章也很多，这里不赘述。</p>
<h2 id="articleHeader1">NUXT</h2>
<p>我们进入正题说下 NUXT</p>
<blockquote><p>Nuxt.js is a minimalistic framework for server-rendered Vue applications (inspired by Next.js)</p></blockquote>
<p>作用就是在 node.js 上进一步封装，然后省去我们搭建服务端环境的步骤，只需要遵循这个库的一些规则就能轻松实现 SSR</p>
<h3 id="articleHeader2">安装流程</h3>
<p>Nuxt.js 团队提供了 vue-cli 的初始化模板。前提安装 vue-cli，安装过的忽略此步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g vue-cli</code></pre>
<p>完成后在需要创建的目录下执行以下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init nuxt/starter <project-name>
cd <project-name>
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">vue init nuxt/starter &lt;project-name&gt;
<span class="hljs-built_in">cd</span> &lt;project-name&gt;
npm install</code></pre>
<p>依赖安装完成后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run dev</code></pre>
<p>打开浏览器 <a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a></p>
<blockquote><p>说明：Nuxt.js 会监听 <code>pages</code> 目录下的改变，添加新 page 的时候不需要重启服务</p></blockquote>
<h3 id="articleHeader3">目录结构</h3>
<p>完成上面命令后你的目录结构会如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007933354?w=458&amp;h=1180" src="https://static.alili.tech/img/remote/1460000007933354?w=458&amp;h=1180" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Nuxt.js 给出了最简单的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- pages
    |-- index.vue
|-- package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-- pages</span>
    <span class="hljs-string">|-- index.vue</span>
<span class="hljs-string">|-- package.json</span></code></pre>
<p>也就是说，至少需要一个 page 来作为展示页。</p>
<p>文件的路径建议都采用绝对路径，表格如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007933355?w=1502&amp;h=738" src="https://static.alili.tech/img/remote/1460000007933355?w=1502&amp;h=738" alt="" title="" style="cursor: pointer;"></span></p>
<p>例：怎么在 <code>/pages/user/me.vue</code> 引入一个 <code>static</code> 文件夹里的图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;~static/img/logo.png&quot; alt=&quot;Logo&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"~static/img/logo.png"</span> alt=<span class="hljs-string">"Logo"</span>/&gt;</code></pre>
<h3 id="articleHeader4">路由</h3>
<p>Nuxt.js 根据 pages 目录结构去生成 vue-router 配置，也就是说 pages 目录的结构直接影响路由结构</p>
<p>例1:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- pages
    |-- posts
        |-- index.vue
        |-- welcome.vue
    |-- about.vue
    |-- index.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-- pages</span>
    <span class="hljs-string">|-- posts</span>
        <span class="hljs-string">|-- index.vue</span>
        <span class="hljs-string">|-- welcome.vue</span>
    <span class="hljs-string">|-- about.vue</span>
    <span class="hljs-string">|-- index.vue</span></code></pre>
<p>会生成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes: [
  {
    path: '/posts',
    component: '~pages/posts/index.vue'
  }, {
    path: '/posts/welcome',
    component: '~pages/posts/welcome.vue'
  }, {
    path: '/about',
    component: '~pages/about.vue'
  }, {
    path: '/',
    component: '~pages/index.vue'
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">routes: [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/posts'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-string">'~pages/posts/index.vue'</span>
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/posts/welcome'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-string">'~pages/posts/welcome.vue'</span>
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-string">'~pages/about.vue'</span>
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-string">'~pages/index.vue'</span>
  }
]</code></pre>
<p>例2:隐藏路由</p>
<p>在文件名前加 <code>_</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- pages
    |-- _about.vue
    |-- index.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-- pages</span>
    <span class="hljs-string">|-- _about.vue</span>
    <span class="hljs-string">|-- index.vue</span></code></pre>
<p>会生成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes: [
  {
    path: '/',
    component: '~pages/index.vue'
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">routes</span>: [
  {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attribute">component</span>: <span class="hljs-string">'~pages/index.vue'</span>
  }
]</code></pre>
<h3 id="articleHeader5">配置文件</h3>
<p>目录下的 <code>nuxt.config.js</code> 是我们唯一的配置入口，这里不建议修改 <code>.nuxt</code> 目录，除非特殊需求</p>
<p>默认的给力我们三个配置 ·head·css·loading· 分别是头部设置，全局css，loading进度条</p>
<p>nuxt.config.js 的全部的配置如下,点击查看具体例子</p>
<ol>
<li><p><a href="https://nuxtjs.org/examples/cached-components" rel="nofollow noreferrer" target="_blank">cache</a></p></li>
<li><p><a href="https://nuxtjs.org/examples/custom-loading" rel="nofollow noreferrer" target="_blank">loading</a></p></li>
<li><p><a href="https://nuxtjs.org/examples/custom-routes" rel="nofollow noreferrer" target="_blank">router</a></p></li>
<li><p><a href="https://nuxtjs.org/examples/global-css" rel="nofollow noreferrer" target="_blank">css</a></p></li>
<li><p><a href="https://nuxtjs.org/examples/plugins" rel="nofollow noreferrer" target="_blank">plugins</a></p></li>
<li><p><a href="https://nuxtjs.org/examples/seo-html-head" rel="nofollow noreferrer" target="_blank">head</a></p></li>
</ol>
<p>另外还提供了 vuex 等配置，感兴趣可以去 github 和官网。</p>
<h2 id="articleHeader6">NUXT 能为我们做什么</h2>
<p>对于使用就说上面这么多（官网上都有，这里给大家一个概览），说下为什么选择 NUXT 来做 SSR</p>
<p>问题1：就是我们无需为了路由划分而烦恼，你只需要按照对应的文件夹层级创建 .vue 文件就行<br>问题2：无需考虑数据传输问题，nuxt 会在模板输出之前异步请求数据（需要引入 axios 库），而且对 vuex 有进一步的封装<br>问题3：内置了 webpack，省去了配置 webpack 的步骤，nuxt 会根据配置打包对应的文件</p>
<p>还有很多便捷之处，可以尝试去写一写，读读源码</p>
<h2 id="articleHeader7">总结</h2>
<p>本篇主要介绍 nuxt 的便捷之处，在使用上目前不推荐使用，几个原因：</p>
<ul>
<li><p>文档不完善还有许多是空的，不是说我们什么信息都得不到，可以看文档的 examples，里面列举的比较全面。</p></li>
<li><p>目前是 0.8.0 版本，而且 README 里介绍 1.0 即将到来，可能会添加新功能，文档也会完善，待到版本稳定后再部署也不迟。</p></li>
</ul>
<blockquote><p>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 基于 NUXT 的 SSR

## 原文链接
[https://segmentfault.com/a/1190000007933349](https://segmentfault.com/a/1190000007933349)


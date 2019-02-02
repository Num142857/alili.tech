---
title: '用 cooking 搭建一个多页面易配置的 Vue 2 项目（进阶篇）' 
date: 2019-02-03 2:30:39
hidden: true
slug: 4syp1u3dfnc
categories: [reprint]
---

{{< raw >}}

                    
<p>通过 <a href="https://segmentfault.com/a/1190000006867999">上一篇文章</a> 的介绍，相信大家已经能用 cooking 配置一个较为完整的 Vue 项目。今天将通过配置一个多页面的例子为大家介绍 cooking 的命令行工具 —— cooking-cli，同样所需要的开发环境依旧是 <code>Node 4+, npm 3+</code>，同时我是在 macOS 下操作的。</p>
<h2 id="articleHeader0">搭建基础项目</h2>
<p>现在我们需要在上一篇文章配置的项目的基础上，将它改造成支持多页面的项目，其实我们可以直接通过 cooking 的命令行工具直接生成一个 Vue 项目。首先需要全局安装 <code>cooking-cli</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i cooking-cli -g --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> cooking-cli -g --registry=https:<span class="hljs-comment">//registry.npm.taobao.org</span></code></pre>
<p>先检查下是不是使用的 <code>npm 3+</code>，如果不是先升级 npm 再安装。完成后可以到你的项目目录下执行下面指令创建一个目录名 <code>multiple-pages</code> 的 Vue 项目，第一次执行需要安装脚手架的依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cooking create multiple-pages vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">cooking</span> create <span class="hljs-keyword">multiple-pages </span>vue</code></pre>
<p>如果没有访问较慢的话可以先配置下 npm 镜像，然后再创建项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cooking config registry https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code class="shell" style="word-break: break-word; white-space: initial;">cooking <span class="hljs-built_in">config</span> registry https:<span class="hljs-comment">//registry.npm.taobao.org</span></code></pre>
<p>接下来会让你选择一些选项，我们这次选择 Vue2 + bublé + 全局 cooking 的配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[20:01:54] Starting 'cooking-vue:default'...
[?] Give your app a name: multiple-pages
[?] Give your app a description: A vue project.
[?] Private? Yes
[?] What Vue version do you what? Vue 2
[?] What ES2015+ compiler do you what to use? bublé (only use wepback 2)
[?] What way use cooking do you want? Global cooking (webpack 2)
[?] Need dev server? Yes
[?] What CSS preprocessor do you want to use? Only CSS
[?] Setup unit tests with Karma + Mocha? No
[?] git repository:
[?] author:
[?] license: ISC
[?] Continue? Yes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code class="shell">[<span class="hljs-number">20</span>:<span class="hljs-number">01</span>:<span class="hljs-number">54</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'cooking-vue:default'</span>...
[?] <span class="hljs-symbol">Give</span> your app a name: multiple-pages
[?] <span class="hljs-symbol">Give</span> your app a description: <span class="hljs-symbol">A</span> vue project.
[?] <span class="hljs-symbol">Private</span>? <span class="hljs-symbol">Yes</span>
[?] <span class="hljs-symbol">What</span> <span class="hljs-symbol">Vue</span> version do you what? <span class="hljs-symbol">Vue</span> <span class="hljs-number">2</span>
[?] <span class="hljs-symbol">What</span> <span class="hljs-symbol">ES2015</span>+ compiler do you what to use? bublé (only use wepback <span class="hljs-number">2</span>)
[?] <span class="hljs-symbol">What</span> way use cooking do you want? <span class="hljs-symbol">Global</span> cooking (webpack <span class="hljs-number">2</span>)
[?] <span class="hljs-symbol">Need</span> dev server? <span class="hljs-symbol">Yes</span>
[?] <span class="hljs-symbol">What</span> <span class="hljs-symbol">CSS</span> preprocessor do you want to use? <span class="hljs-symbol">Only</span> <span class="hljs-symbol">CSS</span>
[?] <span class="hljs-symbol">Setup</span> unit tests with <span class="hljs-symbol">Karma</span> + <span class="hljs-symbol">Mocha</span>? <span class="hljs-symbol">No</span>
[?] git repository:
[?] author:
[?] license: <span class="hljs-symbol">ISC</span>
[?] <span class="hljs-symbol">Continue</span>? <span class="hljs-symbol">Yes</span></code></pre>
<p>最后可以试试直接运行 <code>npm run dev</code> 看看能不能正常启动。使用全局 cooking 的好处是可以减少项目的依赖，</p>
<h2 id="articleHeader1">多页面项目分析</h2>
<p>如果用 webpack 做 SPA 项目，通常是一个入口文件，第三方库单独打包，或者一些文件可以抽离出去通过 CDN 加载。如果换成多页面，就需要多个入口文件，同时每个页面用到的第三方库也不相同，CDN 的配置也可能不一样。那么为了方便管理，我们可以将它们写在一个配置文件里。</p>
<p>webpack 虽然支持配置多个 chunk，但是哪些页面引入了哪些 common chunk 都需要手动维护，而且对于新手很容易犯错。所以我打算依旧只配置一个 vendor，同时将第三方库尽可能通过 CDN 的方式加载。这样手动维护 CDN 列表比维护 chunk 清晰且容易许多。</p>
<p>这里的 chunk 配置我使用 cooking 默认的，它会将 node_modules 内引用到的依赖都打包到 <code>vendor</code> 内，同时还有一个 <code>manifest</code> 用来保存 webpack 的 runtime，参考 <a href="https://github.com/vuejs-templates/webpack/blob/dist/template/build/webpack.prod.conf.js#L62-L82" rel="nofollow noreferrer" target="_blank">vue webapck 模板</a>。</p>
<h2 id="articleHeader2">设计配置文件</h2>
<p>写一个名叫 <code>app.json</code> 的配置文件，每个入口共享公共的 CDN 也可以配置私有的 CDN，还可以配置其他基本信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;pages&quot;: [
    {
      &quot;entry&quot;: &quot;home&quot;,
      &quot;title&quot;: &quot;首页&quot;,
      &quot;cdn&quot;: {}
    },
    {
      &quot;entry&quot;: &quot;admin&quot;,
      &quot;title&quot;: &quot;后台&quot;,
      &quot;cdn&quot;: {}
    }
  ],
  &quot;basePath&quot;: &quot;./src/pages/&quot;,
  &quot;cdn&quot;: {
    &quot;js&quot;: [
      &quot;//cdn.jsdelivr.net/vue/2.0.0-rc.7/vue.min.js&quot;,
      &quot;//cdn.jsdelivr.net/vuex/2.0.0-rc.5/vuex.min.js&quot;
    ],
    &quot;css&quot;: []
  },
  &quot;externals&quot;: {
    &quot;vue&quot;: &quot;Vue&quot;,
    &quot;vuex&quot;: &quot;Vuex&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"pages"</span>: [
    {
      <span class="hljs-attr">"entry"</span>: <span class="hljs-string">"home"</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"首页"</span>,
      <span class="hljs-attr">"cdn"</span>: {}
    },
    {
      <span class="hljs-attr">"entry"</span>: <span class="hljs-string">"admin"</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"后台"</span>,
      <span class="hljs-attr">"cdn"</span>: {}
    }
  ],
  <span class="hljs-attr">"basePath"</span>: <span class="hljs-string">"./src/pages/"</span>,
  <span class="hljs-attr">"cdn"</span>: {
    <span class="hljs-attr">"js"</span>: [
      <span class="hljs-string">"//cdn.jsdelivr.net/vue/2.0.0-rc.7/vue.min.js"</span>,
      <span class="hljs-string">"//cdn.jsdelivr.net/vuex/2.0.0-rc.5/vuex.min.js"</span>
    ],
    <span class="hljs-attr">"css"</span>: []
  },
  <span class="hljs-attr">"externals"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"Vue"</span>,
    <span class="hljs-attr">"vuex"</span>: <span class="hljs-string">"Vuex"</span>
  }
}</code></pre>
<p>同时我们在 <code>src/pages</code> 目录下创建 <code>home</code> 和 <code>admin</code> 目录。每个目录下创建一个 <code>index.js</code> 和 <code>app.vue</code> 文件。</p>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './app'

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">new</span> Vue({ <span class="hljs-comment">// eslint-disable-line</span>
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})</code></pre>
<p>app.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>后台</h1>
    <p>A vue project.</p>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>后台<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>A vue project.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
  export default {
    name: 'app'
  }
&lt;/</span>script&gt;</code></pre>
<h2 id="articleHeader3">配置 cooking</h2>
<h3 id="articleHeader4">入口文件</h3>
<p>接下来我们在生成的 cooking 配置文件上加工下，这里我们要传入多入口的配置，从 <code>app.json</code> 里读取 entry 的信息，通过 <code>basePath</code> 拼接成文件路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var App = require('./app.json')
var path = require('path')

var entries = function() {
  var result = {}
  App.pages.forEach(p => {
    result[p.entry] = path.resolve(App.basePath, p.entry)
  })
  return result
}

cooking.set({
  entry: entries()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> App = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app.json'</span>)
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">var</span> entries = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> result = {}
  App.pages.forEach(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> {
    result[p.entry] = path.resolve(App.basePath, p.entry)
  })
  <span class="hljs-keyword">return</span> result
}

cooking.set({
  <span class="hljs-attr">entry</span>: entries()
})</code></pre>
<h3 id="articleHeader5">模板文件</h3>
<p>所有入口的页面我们都是通过 <code>index.tpl</code> 模板配置，只需要将公用 CDN 和私有 CDN 合并后拼接成 HTML 插入到模板内，同时引入入口文件和 vendor，通过 <a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a> 的配置选项，可以很方便的实现我们的需求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var App = require('./app.json')
var path = require('path')

var merge = function(a, b) {
  return {
    css: (a.css || []).concat(b.css || []),
    js: (a.js || []).concat(b.js || [])
  }
}

var templates = function() {
  return App.pages.map(p => {
    return {
      title: p.title,
      filename: p.entry + '.html',
      template: path.resolve(__dirname, 'index.tpl'),
      cdn: merge(App.cdn, p.cdn),
      chunks: ['vendor', 'manifest', p.entry]
    }
  })
}

cooking.set({
  template: templates()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> App = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app.json'</span>)
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">var</span> merge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: (a.css || []).concat(b.css || []),
    <span class="hljs-attr">js</span>: (a.js || []).concat(b.js || [])
  }
}

<span class="hljs-keyword">var</span> templates = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> App.pages.map(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">title</span>: p.title,
      <span class="hljs-attr">filename</span>: p.entry + <span class="hljs-string">'.html'</span>,
      <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">'index.tpl'</span>),
      <span class="hljs-attr">cdn</span>: merge(App.cdn, p.cdn),
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'manifest'</span>, p.entry]
    }
  })
}

cooking.set({
  <span class="hljs-attr">template</span>: templates()
})</code></pre>
<p>模板文件也要改造一下,支持生成我们指定的 CDN 的 HTML 以及其他配置项。具体语法参考插件文档。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <% for (var i in htmlWebpackPlugin.options.cdn.css) { %>
    <link rel=&quot;stylesheet&quot; href=&quot;<%= htmlWebpackPlugin.options.cdn.css[i] %>&quot;><% } %>
  </head>
  <body>
    <div id=&quot;app&quot;></div>
    <% for (var i in htmlWebpackPlugin.options.cdn.js) { %>
    <script src=&quot;<%= htmlWebpackPlugin.options.cdn.js[i] %>&quot;></script><% } %>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">htmlWebpackPlugin.options.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span> (<span class="hljs-attr">var</span> <span class="hljs-attr">i</span> <span class="hljs-attr">in</span> <span class="hljs-attr">htmlWebpackPlugin.options.cdn.css</span>) { %&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%= htmlWebpackPlugin.options.cdn.css[i] %&gt;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span> (<span class="hljs-attr">var</span> <span class="hljs-attr">i</span> <span class="hljs-attr">in</span> <span class="hljs-attr">htmlWebpackPlugin.options.cdn.js</span>) { %&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;%= htmlWebpackPlugin.options.cdn.js[i] %&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader6">最终配置</h3>
<p>最后我们可以优化一下配置，将生成配置的函数提取到另一个文件内，让配置信息更清晰。那么最终的配置内容如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var cooking = require('cooking')
var build = require('./build')

cooking.set({
  entry: build.entries(),
  dist: './dist',
  template: build.templates(),
  devServer: {
    port: 8081,
    publicPath: '/',
  },
  clean: true,
  hash: true,
  sourceMap: true,
  chunk: true,
  publicPath: '/dist/',
  extractCSS: true,
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'buble', 'lint', 'autoprefixer'],
  externals: build.externals()
})

module.exports = cooking.resolve()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> cooking = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cooking'</span>)
<span class="hljs-keyword">var</span> build = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./build'</span>)

cooking.set({
  <span class="hljs-attr">entry</span>: build.entries(),
  <span class="hljs-attr">dist</span>: <span class="hljs-string">'./dist'</span>,
  <span class="hljs-attr">template</span>: build.templates(),
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">8081</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/'</span>,
  },
  <span class="hljs-attr">clean</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">chunk</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>,
  <span class="hljs-attr">extractCSS</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-string">'src'</span>: path.join(__dirname, <span class="hljs-string">'src'</span>)
  },
  <span class="hljs-attr">extends</span>: [<span class="hljs-string">'vue2'</span>, <span class="hljs-string">'buble'</span>, <span class="hljs-string">'lint'</span>, <span class="hljs-string">'autoprefixer'</span>],
  <span class="hljs-attr">externals</span>: build.externals()
})

<span class="hljs-built_in">module</span>.exports = cooking.resolve()</code></pre>
<h2 id="articleHeader7">运行项目</h2>
<p>我们直接通过 cooking 命令行启动项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cooking watch -p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cooking watch -p</span></code></pre>
<p>访问 <a href="http://localhost:8081/home.html" rel="nofollow noreferrer" target="_blank">http://localhost:8081/home.html</a> 或者 <a href="http://localhost:8081/admin.html" rel="nofollow noreferrer" target="_blank">http://localhost:8081/admin.html</a> 看效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVDwPl?w=964&amp;h=1162" src="https://static.alili.tech/img/bVDwPl?w=964&amp;h=1162" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>最后我们通过 build 构建项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cooking build -p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">cooking</span> <span class="hljs-keyword">build </span>-p</code></pre>
<h2 id="articleHeader8">总结</h2>
<p>我会把上面的配置做成脚手架，可以直接通过 <code>cooking init pages-vue</code> 创建项目，当然只是做了最基础的版本，还可以扩展许多内容：</p>
<ul>
<li><p>比如配置某些页面可以忽略全局的 CDN 文件</p></li>
<li><p>如果熟悉 chunk，那么把 chunk 也抽离到配置文件里</p></li>
<li><p>给入口文件加开关，不一定每次启动都打包所有入口文件</p></li>
<li><p>开发模式不使用 CDN，只有生产环境下才使用</p></li>
</ul>
<p>如果感兴趣的话欢迎来一起维护，加入更多新功能。</p>
<p>这里只是介绍了 cooking 的命令行工具最基础的用法，还有许多实用的指令以及技巧还没介绍，所以下一篇见。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 cooking 搭建一个多页面易配置的 Vue 2 项目（进阶篇）

## 原文链接
[https://segmentfault.com/a/1190000006998637](https://segmentfault.com/a/1190000006998637)


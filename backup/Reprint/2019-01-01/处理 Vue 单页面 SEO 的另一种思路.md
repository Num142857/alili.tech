---
title: '处理 Vue 单页面 SEO 的另一种思路' 
date: 2019-01-01 2:30:07
hidden: true
slug: 2o5z3qiuunh
categories: [reprint]
---

{{< raw >}}

                    
<p>vue-meta-info 官方地址： <a href="https://github.com/monkeyWangs/vue-meta-info" rel="nofollow noreferrer" target="_blank">https://github.com/monkeyWang...</a></p>
<p>（设置vue 单页面meta info信息，如果需要单页面SEO，可以和 <a href="https://github.com/chrisvfritz/prerender-spa-plugin" rel="nofollow noreferrer" target="_blank">prerender-spa-plugin</a>形成更优的配合）</p>
<p>单页面应用在前端正大放光彩。三大框架 Angular、Vue、React，可谓妇孺皆知。随着单页面应用的普及，人们在感受其带来的完美的用户体验，极强的开发效率的同时，也似乎不可避免的要去处理 SEO 的需求。</p>
<p>本文主要针对 vue 2.0 单页面 Meta SEO 优化展开介绍：</p>
<p>其实解决SEO问题不一定非得用服务端渲染来处理，服务端渲染对于刚接触 vue 的新手来说，并不是那么友好，虽然已有官方 <a href="https://ssr.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">SSR</a> 中文文档。但是对于一个已经开发完毕的 vue 项目去接 SSR 无论是从工作量还是技术角度来说，都是一种挑战。不过这些怎么能难得到伟大的前端程序员！</p>
<blockquote><p>如果您调研服务器端渲染(SSR)只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么您可能需要预渲染。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将您的前端作为一个完全静态的站点。<br>如果您使用 webpack，您可以使用 <a href="https://github.com/chrisvfritz/prerender-spa-plugin" rel="nofollow noreferrer" target="_blank">prerender-spa-plugin</a> 轻松地添加预渲染。它已经被 Vue 应用程序广泛测试。</p></blockquote>
<p>预渲染为SEO提供了另一种可能，简单的来说，预渲染就是当vue-cli构建的项目进行npm run build 的时候，会按照路由的层级进行动态渲染出对应的html文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.conf.js
var path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  // ...
  plugins: [
    new PrerenderSpaPlugin(
      // 编译后的html需要存放的路径
      path.join(__dirname, '../dist'),
      // 列出哪些路由需要预渲染
      [ '/', '/about', '/contact' ]
    )
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.conf.js</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> PrerenderSpaPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prerender-spa-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ...</span>
  plugins: [
    <span class="hljs-keyword">new</span> PrerenderSpaPlugin(
      <span class="hljs-comment">// 编译后的html需要存放的路径</span>
      path.join(__dirname, <span class="hljs-string">'../dist'</span>),
      <span class="hljs-comment">// 列出哪些路由需要预渲染</span>
      [ <span class="hljs-string">'/'</span>, <span class="hljs-string">'/about'</span>, <span class="hljs-string">'/contact'</span> ]
    )
  ]
}</code></pre>
<p>最终会生成类似于这样的目录结构</p>
<p><span class="img-wrap"><img data-src="/img/bVUCj5?w=314&amp;h=159" src="https://static.alili.tech/img/bVUCj5?w=314&amp;h=159" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而里面的内容都会被渲染成了静态的 html 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>tangeche-pc</title>
  </head>
  <body>
    <div id=&quot;app&quot;></div>
    <!-- built files will be auto injected -->
  <script type=&quot;text/javascript&quot; src=&quot;/app.js&quot;></script></body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>tangeche-pc<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>可以直观的发现，预渲染的作用。</p>
<p>有了预渲染，我们可以解决很多方面的SEO的问题，但是有时候我们也会需要Meta信息的变化，比如 title 比如 Meta keyWords 或者是 link...</p>
<p>这里安利一下 <a href="https://github.com/monkeyWangs/vue-meta-info" rel="nofollow noreferrer" target="_blank">vue-meta-info</a> 一个可以动态设置meta 信息的vue插件如果需要单页面SEO，可以和 prerender-spa-plugin形成更优的配合。</p>
<p>vue-meta-info 是一个基于 vue 2.0 的插件，它会让你更好的管理你的 app 里面的 meta 信息。你可以直接 在组件内设置 metaInfo 便可以自动挂载到你的页面中。如果你需要随着数据的变化，自动更新你的 title、meta 等信息，那么用此 插件也是再合适不过了。 当然，有时候我们也可能会遇到让人头疼的 SEO 问题，那么使用此插件配合 prerender-spa-plugin 也是再合适不过了</p>
<h2 id="articleHeader0">1.安装</h2>
<p>yarn:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add vue-meta-info
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">add</span><span class="bash"> vue-meta-info
</span></code></pre>
<p>npm:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-meta-info --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">npm</span> install vue-meta-<span class="hljs-literal">info</span> --save
</code></pre>
<h2 id="articleHeader1">2.全局引入 vue-meta-info</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> MetaInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-meta-info'</span>

Vue.use(MetaInfo)
</code></pre>
<h2 id="articleHeader2">3.组件内静态使用 metaInfo</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  ...
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">metaInfo</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'My Example App'</span>, <span class="hljs-comment">// set a title</span>
      meta: [{                 <span class="hljs-comment">// set meta</span>
        name: <span class="hljs-string">'keyWords'</span>,
        <span class="hljs-attr">content</span>: <span class="hljs-string">'My Example App'</span>
      }]
      link: [{                 <span class="hljs-comment">// set link</span>
        rel: <span class="hljs-string">'asstes'</span>,
        <span class="hljs-attr">href</span>: <span class="hljs-string">'https://assets-cdn.github.com/'</span>
      }]
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader3">4.如果你的 title 或者 meta 是异步加载的，那么你可能需要这样使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  ...
</template>

<script>
  export default {
    name: 'async',
    metaInfo () {
      return {
        title: this.pageName
      }
    },
    data () {
      return {
        pageName: 'loading'
      }
    },
    mounted () {
      setTimeout(() => {
        this.pageName = 'async'
      }, 2000)
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'async'</span>,
    metaInfo () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">title</span>: <span class="hljs-keyword">this</span>.pageName
      }
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">pageName</span>: <span class="hljs-string">'loading'</span>
      }
    },
    mounted () {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.pageName = <span class="hljs-string">'async'</span>
      }, <span class="hljs-number">2000</span>)
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>写到这里，大家应该都明白了我所说的 SEO 的另一种思路是什么了，preRender + metaInfo</p>
<p>可以才一定层次上去解决 SEO 问题，这种方式优点就是代码侵入性最低，开发成本最少。但是也是有弊端的：</p>
<ul><li>不能很好地处理用户独特性路由: 比如有个路由是 /my-profile, 预渲染可能不会很好用,<br>  因为这个内容页是根据用户信息变化的，所以页面内容也不是唯一确定的. 你可能会使用类似于这样的路由路径</li></ul>
<p>/users/:username/profile,但是这样也是不合适的.</p>
<ul>
<li>经常变动的文件</li>
<li>需要预渲染成千上万的路由文件: 这个可能会导致你编译时间.....额，可能你会编译很长时间</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
处理 Vue 单页面 SEO 的另一种思路

## 原文链接
[https://segmentfault.com/a/1190000011072893](https://segmentfault.com/a/1190000011072893)


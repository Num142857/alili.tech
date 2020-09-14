---
title: 'vue-meta让你更优雅的管理头部标签' 
date: 2018-12-17 2:30:07
hidden: true
slug: mn1d1mws84
categories: [reprint]
---

{{< raw >}}

                    
<p>在 Vue SPA 应用中，如果想要修改HTML的头部标签，或许，你会在代码里，直接这么做:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 改下title
document.title = 'what?'
// 引入一段script
let s = document.createElement('script')
s.setAttribute('src', './vconsole.js')
document.head.appendChild(s)
// 修改meta信息，或者给html标签添加属性...
// 此处省略一大坨代码..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 改下title</span>
document<span class="hljs-selector-class">.title</span> = <span class="hljs-string">'what?'</span>
<span class="hljs-comment">// 引入一段script</span>
let s = document.createElement(<span class="hljs-string">'script'</span>)
s.setAttribute(<span class="hljs-string">'src'</span>, <span class="hljs-string">'./vconsole.js'</span>)
document<span class="hljs-selector-class">.head</span><span class="hljs-selector-class">.appendChild</span>(s)
<span class="hljs-comment">// 修改meta信息，或者给html标签添加属性...</span>
<span class="hljs-comment">// 此处省略一大坨代码...</span></code></pre>
<p>今天给大家介绍一种更优雅的方式，去管理头部标签 <code>vue-meta</code></p>
<h1 id="articleHeader0">vue-meta介绍</h1>
<blockquote>Manage page meta info in Vue 2.0 components. SSR + Streaming supported. Inspired by <a href="https://github.com/nfl/react-helmet" rel="nofollow noreferrer" target="_blank">react-helmet</a>.</blockquote>
<p>借用 <a href="https://github.com/declandewet/vue-meta" rel="nofollow noreferrer" target="_blank">vue-meta github</a> 上的介绍，基于Vue 2.0 的 vue-meta 插件，主要用于管理HMTL头部标签，同时也支持SSR。</p>
<p>vue-meta有以下特点：</p>
<ul>
<li>在组件内设置 <code>metaInfo</code>，便可轻松实现头部标签的管理</li>
<li>
<code>metaInfo</code> 的数据都是响应的，如果数据变化，头部信息会自动更新</li>
<li>支持 SSR</li>
</ul>
<h1 id="articleHeader1">如何使用</h1>
<p>在介绍如何使用之前，先和大家普及一个最近很火的名词 <strong>服务端渲染（SSR, Server Side Render）</strong>，简单来讲，就是在访问某个页面时，服务端会把渲染好的页面，直接返回给浏览器。</p>
<p>我们知道 vue-meta 是支持SSR的，下面的介绍分成两部分：</p>
<h2 id="articleHeader2">Client 客户端</h2>
<p>在入口文件中，install vue-meta plugin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> VueMeta <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-meta'</span>

Vue.use(VueRouter)
Vue.use(VueMeta)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>然后就可以在组件中使用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data () {
    return {
      myTitle: '标题'
    }
  },
  metaInfo: {
    title: this.myTitle,
    titleTemplate: '%s - by vue-meta',
    htmlAttrs: {
      lang: 'zh'
    },
    script: [{innerHTML: 'console.log(&quot;hello hello!&quot;)', type: 'text/javascript'}],
    __dangerouslyDisableSanitizers: ['script']
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-selector-tag">data</span> () {
    <span class="hljs-selector-tag">return</span> {
      <span class="hljs-attribute">myTitle</span>: <span class="hljs-string">'标题'</span>
    }
  },
  <span class="hljs-attribute">metaInfo</span>: {
    <span class="hljs-attribute">title</span>: this.myTitle,
    <span class="hljs-attribute">titleTemplate</span>: <span class="hljs-string">'%s - by vue-meta'</span>,
    <span class="hljs-attribute">htmlAttrs</span>: {
      <span class="hljs-attribute">lang</span>: <span class="hljs-string">'zh'</span>
    },
    <span class="hljs-attribute">script</span>: [{<span class="hljs-attribute">innerHTML</span>: <span class="hljs-string">'console.log("hello hello!")'</span>, <span class="hljs-attribute">type</span>: <span class="hljs-string">'text/javascript'</span>}],
    <span class="hljs-attribute">__dangerouslyDisableSanitizers</span>: [<span class="hljs-string">'script'</span>]
  },
  ...
}</code></pre>
<p>可以看一下页面显示</p>
<p><span class="img-wrap"><img data-src="/img/bV14PG?w=1392&amp;h=962" src="https://static.alili.tech/img/bV14PG?w=1392&amp;h=962" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>熟悉 Nuxt.js 的同学，会发现配置 meta info 的 keyName 不一致。可以通过下面的配置方法来修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vue-meta configuration  
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// vue-meta configuration  </span>
<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.use</span>(Meta, {
  <span class="hljs-attribute">keyName</span>: <span class="hljs-string">'head'</span>, <span class="hljs-comment">// the component option name that vue-meta looks for meta info on.</span>
  <span class="hljs-attribute">attribute</span>: <span class="hljs-string">'data-n-head'</span>, <span class="hljs-comment">// the attribute name vue-meta adds to the tags it observes</span>
  <span class="hljs-attribute">ssrAttribute</span>: <span class="hljs-string">'data-n-head-ssr'</span>, <span class="hljs-comment">// the attribute name that lets vue-meta know that meta info has already been server-rendered</span>
  <span class="hljs-attribute">tagIDKeyName</span>: <span class="hljs-string">'hid'</span> <span class="hljs-comment">// the property name that vue-meta uses to determine whether to overwrite or append a tag</span>
})</code></pre>
<p>更加全面详细的api，可以参考 <a href="https://github.com/declandewet/vue-meta" rel="nofollow noreferrer" target="_blank">vue-meta github</a></p>
<h2 id="articleHeader3">Server 服务端</h2>
<h3 id="articleHeader4">Step 1. 将 $meta 对象注入到上下文中</h3>
<p>server-entry.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import app from './app'

const router = app.$router
const meta = app.$meta() // here

export default (context) => {
  router.push(context.url)
  context.meta = meta // and here
  return app
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>import <span class="hljs-keyword">app</span> from './<span class="hljs-keyword">app</span>'

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">app</span>.<span class="hljs-variable">$router</span>
<span class="hljs-keyword">const</span> meta = <span class="hljs-keyword">app</span>.<span class="hljs-variable">$meta</span>() <span class="hljs-comment">// here</span>

export default (context) =&gt; {
  router.push(context.url)
  context.meta = meta <span class="hljs-comment">// and here</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">app</span>
}</code></pre>
<p><code>$meta</code> 主要提供了，<code>inject</code> 和 <code>refresh</code> 方法。<code>inject</code> 方法，用在服务端，返回设置的metaInfo ；<code>refresh</code> 方法，用在客户端，作用是更新meta信息。</p>
<h3 id="articleHeader5">Step 2. 使用 <code>inject()</code> 方法 输出页面</h3>
<p>server.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('*', (req, res) => {
  const context = { url: req.url }
  renderer.renderToString(context, (error, html) => {
    if (error) return res.send(error.stack)
    const bodyOpt = { body: true }
    const {
      title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta
    } = context.meta.inject()
    return res.send(`
      <!doctype html>
      <html data-vue-meta-server-rendered ${htmlAttrs.text()}>
        <head>
          ${meta.text()}
          ${title.text()}
          ${link.text()}
          ${style.text()}
          ${script.text()}
          ${noscript.text()}
        </head>
        <body ${bodyAttrs.text()}>
          ${html}
          <script src=&quot;/assets/vendor.bundle.js&quot;></script>
          <script src=&quot;/assets/client.bundle.js&quot;></script>
          ${script.text(bodyOpt)}
        </body>
      </html>
    `)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">app.get('*', (req, res) =&gt; </span><span class="hljs-template-variable">{
  const context = { url: req.url }</span><span class="xml">
  renderer.renderToString(context, (error, html) =&gt; </span><span class="hljs-template-variable">{
    <span class="hljs-keyword">if</span> (error) return res.send(error.stack)
    const bodyOpt = { body: true }</span><span class="xml">
    const </span><span class="hljs-template-variable">{
      title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta
    }</span><span class="xml"> = context.meta.inject()
    return res.send(`
      <span class="hljs-meta">&lt;!doctype html&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">data-vue-meta-server-rendered</span> $</span></span><span class="hljs-template-variable">{htmlAttrs.text()}</span><span class="xml"><span class="hljs-tag">&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
          $</span><span class="hljs-template-variable">{meta.text()}</span><span class="xml">
          $</span><span class="hljs-template-variable">{title.text()}</span><span class="xml">
          $</span><span class="hljs-template-variable">{link.text()}</span><span class="xml">
          $</span><span class="hljs-template-variable">{style.text()}</span><span class="xml">
          $</span><span class="hljs-template-variable">{script.text()}</span><span class="xml">
          $</span><span class="hljs-template-variable">{noscript.text()}</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">body</span> $</span></span><span class="hljs-template-variable">{bodyAttrs.text()}</span><span class="xml"><span class="hljs-tag">&gt;</span>
          $</span><span class="hljs-template-variable">{html}</span><span class="xml">
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/assets/vendor.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/assets/client.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          $</span><span class="hljs-template-variable">{script.text(bodyOpt)}</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
    `)
  })
})</span></code></pre>
<h1 id="articleHeader6">源码分析</h1>
<p>前面说了 vue-meta 的使用方法，或许大家会想这些功能是怎么实现的，那下面就和大家分享一下源码。</p>
<h2 id="articleHeader7">怎么区分 client 和 server渲染？</h2>
<p>vue-meta 会在 <code>beforeCreate()</code> 钩子函数中，将组件中设置的 metaInfo ，放在 this.$metaInfo 中。我们可以在其他生命周期中，访问 this.$metaInfo 下的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof this.$options[options.keyName] === 'function') {
  if (typeof this.$options.computed === 'undefined') {
    this.$options.computed = {}
  }
  this.$options.computed.$metaInfo = this.$options[options.keyName]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span>[<span class="hljs-keyword">options</span>.keyName] === <span class="hljs-string">'function'</span>) {
  <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span>.computed === <span class="hljs-string">'undefined'</span>) {
    <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span>.computed = {}
  }
  <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span>.computed.$metaInfo = <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span>[<span class="hljs-keyword">options</span>.keyName]
}</code></pre>
<p>vue-meta 会在created等生命周期的钩子函数中，监听 <code>$metaInfo</code> 的变化，如果发生改变，就调用 <code>$meta</code> 下的 <code>refresh</code> 方法。这也是 <code>metaInfo</code> 做到响应的原因。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created () {
  if (!this.$isServer &amp;&amp; this.$metaInfo) {
    this.$watch('$metaInfo', () => {
      batchID = batchUpdate(batchID, () => this.$meta().refresh())
    })
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>created () {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$isServer &amp;&amp; <span class="hljs-keyword">this</span>.$metaInfo) {
    <span class="hljs-keyword">this</span>.$watch(<span class="hljs-string">'$metaInfo'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      batchID = batchUpdate(batchID, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.$meta().refresh())
    })
  }
},</code></pre>
<p>Server端，主要是暴露 <code>$meta</code> 下的 <code>inject</code> 方法，调用 <code>inject</code> 方法，会返回对应的信息。</p>
<h2 id="articleHeader8">client 和 server端 是如何修改标签的？</h2>
<p>client端 修改标签，就是本文开头提到的 通过原生js，直接修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function updateTitle (title = document.title) {
  document.title = title
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">return</span> function updateTitle (<span class="hljs-built_in">title</span> = document.<span class="hljs-built_in">title</span>) {
  document.<span class="hljs-built_in">title</span> = <span class="hljs-built_in">title</span>
}</code></pre>
<p>server端，就是通过 text方法，返回string格式的标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function titleGenerator (type, data) {
  return {
    text () {
      return `<${type} ${attribute}=&quot;true&quot;>${data}</${type}>`
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> titleGenerator (<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">data</span>) {</span>
  <span class="hljs-keyword">return</span> {
    text () {
      <span class="hljs-keyword">return</span> `&lt;${<span class="hljs-class"><span class="hljs-keyword">type</span>} ${<span class="hljs-title">attribute</span>}</span>=<span class="hljs-string">"true"</span>&gt;${data}&lt;/${<span class="hljs-class"><span class="hljs-keyword">type</span>}&gt;`</span>
    }
  }
}</code></pre>
<h2 id="articleHeader9">
<code>__dangerouslyDisableSanitizers</code> 做了什么？</h2>
<p>vue-meta 默认会对特殊字符串进行转义，如果设置了 <code>__dangerouslyDisableSanitizers</code>，就不会对再做转义处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const escapeHTML = (str) => typeof window === 'undefined'
  // server-side escape sequence
  ? String(str)
    .replace(/&amp;/g, '&amp;amp;')
    .replace(/</g, '&amp;lt;')
    .replace(/>/g, '&amp;gt;')
    .replace(/&quot;/g, '&amp;quot;')
    .replace(/'/g, '&amp;#x27;')
  // client-side escape sequence
  : String(str)
    .replace(/&amp;/g, '\u0026')
    .replace(/</g, '\u003c')
    .replace(/>/g, '\u003e')
    .replace(/&quot;/g, '\u0022')
    .replace(/'/g, '\u0027')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> escapeHTML = <span class="hljs-function">(<span class="hljs-params">str</span>) =&gt;</span> <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">'undefined'</span>
  <span class="hljs-comment">// server-side escape sequence</span>
  ? <span class="hljs-built_in">String</span>(str)
    .replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">'&amp;amp;'</span>)
    .replace(<span class="hljs-regexp">/&lt;/g</span>, <span class="hljs-string">'&amp;lt;'</span>)
    .replace(<span class="hljs-regexp">/&gt;/g</span>, <span class="hljs-string">'&amp;gt;'</span>)
    .replace(<span class="hljs-regexp">/"/g</span>, <span class="hljs-string">'&amp;quot;'</span>)
    .replace(<span class="hljs-regexp">/'/g</span>, <span class="hljs-string">'&amp;#x27;'</span>)
  <span class="hljs-comment">// client-side escape sequence</span>
  : <span class="hljs-built_in">String</span>(str)
    .replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">'\u0026'</span>)
    .replace(<span class="hljs-regexp">/&lt;/g</span>, <span class="hljs-string">'\u003c'</span>)
    .replace(<span class="hljs-regexp">/&gt;/g</span>, <span class="hljs-string">'\u003e'</span>)
    .replace(<span class="hljs-regexp">/"/g</span>, <span class="hljs-string">'\u0022'</span>)
    .replace(<span class="hljs-regexp">/'/g</span>, <span class="hljs-string">'\u0027'</span>)</code></pre>
<h1 id="articleHeader10">最后</h1>
<p>最开始接触 vue-meta 是在 Nuxt.js 中。如果想了解 Nuxt.js，欢迎大家阅读 <a href="https://segmentfault.com/a/1190000012802572">Nuxt.js实战</a> 和 <a href="https://segmentfault.com/a/1190000012806871" target="_blank">Nuxt.js踩坑分享</a>。文中有任何表述不清或不当的地方，欢迎大家批评指正。<br>给大家推荐我们的公众号 前端新视野 ，一个很认真的日刊公众号，欢迎扫描下方二维码关注！<br><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/216/096/2160964902-5a5726d53e159_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/216/096/2160964902-5a5726d53e159_articlex" alt="前端新视野" title="前端新视野" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-meta让你更优雅的管理头部标签

## 原文链接
[https://segmentfault.com/a/1190000012849210](https://segmentfault.com/a/1190000012849210)


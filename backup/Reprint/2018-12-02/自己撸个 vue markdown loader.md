---
title: '自己撸个 vue markdown loader' 
date: 2018-12-02 2:30:16
hidden: true
slug: gb41upo7kq8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">自己撸个 vue markdown loader</h1>
<p>最近，当我把 vue-loader 升级到 v15 后发现，自己项目中所使用的一个 vue-markdown-loader 因为兼容问题而没法用了，正当我一筹莫展的时候，无意间看到 vuepress 中使用了当时还处于 v15.0.0 rc 版本的 vue-loader,仔细研究其源码后发现，vuepress 对于 markdown 的支持相当完善，而且代码也规范易懂。于是心生一计，把里面部分相关的代码拿出来魔改一番，做成一个新的 loader 用到自己的项目……</p>
<h2 id="articleHeader1">关于 webpack loader</h2>
<p>为了干这个，首先得理解 webpack 的 loader 的功能和原理。</p>
<blockquote>loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！（摘自 webpack 官方中文文档）</blockquote>
<p>由此可见，loader 就像是一个“处理器”，输入特定的内容，处理后进行输出。当必要时，可以把一些合适的 loader 串起来使用，使前一个 loader 的输出变成后一个 loader 的输入，最终得到自己想要的结果。</p>
<p>对于本文要提到的 markdown-loader 来说，它需要进行的处理就是，将 markdown 文件内容解析并包装成一个与 vue 单文件组件内容相似的，然后传给它后面的 vue-loader, 所以一个最简单的 vue markdown-loader 可以长这德性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (src) {
  const res = (
    `<template>\n` +
    `<h1>hello world</h1>\n` +
    `</template>`
  )
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">src</span>) </span>{
  <span class="hljs-keyword">const</span> res = (
    <span class="hljs-string">`&lt;template&gt;\n`</span> +
    <span class="hljs-string">`&lt;h1&gt;hello world&lt;/h1&gt;\n`</span> +
    <span class="hljs-string">`&lt;/template&gt;`</span>
  )
  <span class="hljs-keyword">return</span> res
}</code></pre>
<p>当然，这个 loader 看起来有点儿智障，因为不管传给它什么，最后输出来的都一样的玩意儿。但它确实做一个 loader 通常做的事…… <img src="https://static.alili.techundefined" class="emoji" alt="smile" title="smile"></p>
<p>下面进入正题，要做一个处理 markdown 的 loader 其逻辑要复杂得多，但实质与上面的差不多，首先我们需要安装一些必要的包。</p>
<h2 id="articleHeader2">安装需要的包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add -D markdown-it markdown-it-anchor markdown-it-container markdown-it-emoji markdown-it-table-of-contents" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add -D markdown-it markdown-it-anchor markdown-it-container markdown-it-emoji markdown-it-table-of-contents</code></pre>
<table>
<thead><tr>
<th>包名称</th>
<th>功能说明</th>
</tr></thead>
<tbody>
<tr>
<td>markdown-it</td>
<td>渲染 markdown 基本语法</td>
</tr>
<tr>
<td>markdown-it-anchor</td>
<td>为各级标题添加锚点</td>
</tr>
<tr>
<td>markdown-it-container</td>
<td>用于创建自定义的块级容器</td>
</tr>
<tr>
<td>markdown-it-emoji</td>
<td>渲染 emoji</td>
</tr>
<tr>
<td>markdown-it-table-of-contents</td>
<td>自动生成目录</td>
</tr>
<tr>
<td>highlight.js</td>
<td>代码高亮</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader3">编写 loader</h2>
<p>在这个 loader 里，传入的是 markdown 文件的源文件，也就是没作任何解析的内容，我们需要对它进行一些处理，包括解析基本语法、渲染 emoji、添加锚点等处理，并定义一些自定义的块，比较关键的就是，最后要把这些内容包裹到 <code>&lt;template&gt;</code> 标签中，不然接下来处理它们的 vue-loader 处理不了。</p>
<p>贴上 loader 的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const hljs = require('highlight.js')

// markdown-it 插件
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')

// 自定义块
const containers = require('./containers')

const md = require('markdown-it')({
  html: true,
  // 代码高亮
  highlight: function (str, lang) {
    if (lang &amp;&amp; hljs.getLanguage(lang)) {
      try {
        return '<pre class=&quot;hljs&quot;><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) {}
    }

    return '<pre v-pre class=&quot;hljs&quot;><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
  // 使用 emoji 插件渲染 emoji
  .use(emoji)
  // 使用 anchor 插件为标题元素添加锚点
  .use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  })
  // 使用 table-of-contents 插件实现自动生成目录
  .use(toc, {
    includeLevel: [2, 3]
  })
  // 定义自定义的块容器
  .use(containers)

const cache = LRU({ max: 1000 })

module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production'

  const file = this.resourcePath
  const key = hash(file + src)
  const cached = cache.get(key)

  // 重新模式下构建时使用缓存以提高性能
  if (cached &amp;&amp; (isProd || /\?vue/.test(this.resourceQuery))) {
    return cached
  }

  const html = md.render(src)

  const res = (
    `<template>\n` +
    `<div class=&quot;content&quot;>${html}</div>\n` +
    `</template>\n`
  )
  cache.set(key, res)
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> hash = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hash-sum'</span>)
<span class="hljs-keyword">const</span> LRU = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lru-cache'</span>)
<span class="hljs-keyword">const</span> hljs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'highlight.js'</span>)

<span class="hljs-comment">// markdown-it 插件</span>
<span class="hljs-keyword">const</span> emoji = <span class="hljs-built_in">require</span>(<span class="hljs-string">'markdown-it-emoji'</span>)
<span class="hljs-keyword">const</span> anchor = <span class="hljs-built_in">require</span>(<span class="hljs-string">'markdown-it-anchor'</span>)
<span class="hljs-keyword">const</span> toc = <span class="hljs-built_in">require</span>(<span class="hljs-string">'markdown-it-table-of-contents'</span>)

<span class="hljs-comment">// 自定义块</span>
<span class="hljs-keyword">const</span> containers = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./containers'</span>)

<span class="hljs-keyword">const</span> md = <span class="hljs-built_in">require</span>(<span class="hljs-string">'markdown-it'</span>)({
  <span class="hljs-attr">html</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// 代码高亮</span>
  highlight: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str, lang</span>) </span>{
    <span class="hljs-keyword">if</span> (lang &amp;&amp; hljs.getLanguage(lang)) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;pre class="hljs"&gt;&lt;code&gt;'</span> +
          hljs.highlight(lang, str, <span class="hljs-literal">true</span>).value +
          <span class="hljs-string">'&lt;/code&gt;&lt;/pre&gt;'</span>
      } <span class="hljs-keyword">catch</span> (__) {}
    }

    <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;pre v-pre class="hljs"&gt;&lt;code&gt;'</span> + md.utils.escapeHtml(str) + <span class="hljs-string">'&lt;/code&gt;&lt;/pre&gt;'</span>
  }
})
  <span class="hljs-comment">// 使用 emoji 插件渲染 emoji</span>
  .use(emoji)
  <span class="hljs-comment">// 使用 anchor 插件为标题元素添加锚点</span>
  .use(anchor, {
    <span class="hljs-attr">permalink</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">permalinkBefore</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">permalinkSymbol</span>: <span class="hljs-string">'#'</span>
  })
  <span class="hljs-comment">// 使用 table-of-contents 插件实现自动生成目录</span>
  .use(toc, {
    <span class="hljs-attr">includeLevel</span>: [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
  })
  <span class="hljs-comment">// 定义自定义的块容器</span>
  .use(containers)

<span class="hljs-keyword">const</span> cache = LRU({ <span class="hljs-attr">max</span>: <span class="hljs-number">1000</span> })

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">src</span>) </span>{
  <span class="hljs-keyword">const</span> isProd = process.env.NODE_ENV === <span class="hljs-string">'production'</span>

  <span class="hljs-keyword">const</span> file = <span class="hljs-keyword">this</span>.resourcePath
  <span class="hljs-keyword">const</span> key = hash(file + src)
  <span class="hljs-keyword">const</span> cached = cache.get(key)

  <span class="hljs-comment">// 重新模式下构建时使用缓存以提高性能</span>
  <span class="hljs-keyword">if</span> (cached &amp;&amp; (isProd || <span class="hljs-regexp">/\?vue/</span>.test(<span class="hljs-keyword">this</span>.resourceQuery))) {
    <span class="hljs-keyword">return</span> cached
  }

  <span class="hljs-keyword">const</span> html = md.render(src)

  <span class="hljs-keyword">const</span> res = (
    <span class="hljs-string">`&lt;template&gt;\n`</span> +
    <span class="hljs-string">`&lt;div class="content"&gt;<span class="hljs-subst">${html}</span>&lt;/div&gt;\n`</span> +
    <span class="hljs-string">`&lt;/template&gt;\n`</span>
  )
  cache.set(key, res)
  <span class="hljs-keyword">return</span> res
}</code></pre>
<blockquote>以下为上面代码中引用到的 containers.js 中代码</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const container = require('markdown-it-container')

module.exports = md => {
  md
    .use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })
}

function createContainer (klass, defaultTitle) {
  return [container, klass, {
    render (tokens, idx) {
      const token = tokens[idx]
      const info = token.info.trim().slice(klass.length).trim()
      if (token.nesting === 1) {
        return `<div class=&quot;${klass} custom-block&quot;><p class=&quot;custom-block-title&quot;>${info || defaultTitle}</p>\n`
      } else {
        return `</div>\n`
      }
    }
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> container = <span class="hljs-built_in">require</span>(<span class="hljs-string">'markdown-it-container'</span>)

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">md</span> =&gt;</span> {
  md
    .use(...createContainer(<span class="hljs-string">'tip'</span>, <span class="hljs-string">'TIP'</span>))
    .use(...createContainer(<span class="hljs-string">'warning'</span>, <span class="hljs-string">'WARNING'</span>))
    .use(...createContainer(<span class="hljs-string">'danger'</span>, <span class="hljs-string">'WARNING'</span>))
    <span class="hljs-comment">// explicitly escape Vue syntax</span>
    .use(container, <span class="hljs-string">'v-pre'</span>, {
      <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params">tokens, idx</span>) =&gt;</span> tokens[idx].nesting === <span class="hljs-number">1</span>
        ? <span class="hljs-string">`&lt;div v-pre&gt;\n`</span>
        : <span class="hljs-string">`&lt;/div&gt;\n`</span>
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createContainer</span> (<span class="hljs-params">klass, defaultTitle</span>) </span>{
  <span class="hljs-keyword">return</span> [container, klass, {
    render (tokens, idx) {
      <span class="hljs-keyword">const</span> token = tokens[idx]
      <span class="hljs-keyword">const</span> info = token.info.trim().slice(klass.length).trim()
      <span class="hljs-keyword">if</span> (token.nesting === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`&lt;div class="<span class="hljs-subst">${klass}</span> custom-block"&gt;&lt;p class="custom-block-title"&gt;<span class="hljs-subst">${info || defaultTitle}</span>&lt;/p&gt;\n`</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`&lt;/div&gt;\n`</span>
      }
    }
  }]
}</code></pre>
<h2 id="articleHeader4">使用</h2>
<p>写好了 loader，就可以在 webpack 里使用了，在配置的  <code>module.rules</code> 数组中加入如下规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.md$/,
  use: [
    {
      loader: 'vue-loader', // 这里的使用的最新的 v15 版本
      options: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    },
    {
      // 这里用到的就是刚写的那个 loader
      loader: require.resolve('./markdownLoader')
    }
  ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.md$/</span>,
  <span class="hljs-attr">use</span>: [
    {
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>, <span class="hljs-comment">// 这里的使用的最新的 v15 版本</span>
      options: {
        <span class="hljs-attr">compilerOptions</span>: {
          <span class="hljs-attr">preserveWhitespace</span>: <span class="hljs-literal">false</span>
        }
      }
    },
    {
      <span class="hljs-comment">// 这里用到的就是刚写的那个 loader</span>
      loader: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'./markdownLoader'</span>)
    }
  ]
},</code></pre>
<p>然后，就可以在自己的组件中引入 markdown 文件了。假如你有一个名叫 something-cool.md 的文件里有下面这样的内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# hello world

[[toc]]

## 二级标题1

有钱就是可以为所欲为！ :+1:

## 二级标题2

但我特么真的没钱 :cry:

## 二级标题3

### 三级标题1

### 三级标题2

:::tip
友情提示
:::

:::danger
卧槽，粗大事了……
:::
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="md"><span class="hljs-section"># hello world</span>

[[toc]]

<span class="hljs-section">## 二级标题1</span>

有钱就是可以为所欲为！ :+1:

<span class="hljs-section">## 二级标题2</span>

但我特么真的没钱 :cry:

<span class="hljs-section">## 二级标题3</span>

<span class="hljs-section">### 三级标题1</span>

<span class="hljs-section">### 三级标题2</span>

:::tip
友情提示
:::

:::danger
卧槽，粗大事了……
:::
</code></pre>
<p>在你的 vue 项目中就可以有如下姿势：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <my-markdown/>
</template>

<script>
export default {
  components: {
    'my-markdown': () => import('./something-cool.ms')
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-markdown</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'my-markdown'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./something-cool.ms'</span>)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014666190" src="https://static.alili.tech/img/remote/1460000014666190" alt="result" title="result" style="cursor: pointer;"></span></p>
<blockquote>说明：上图的渲染结果，涉及到一些 css 样式，本文就不一一列出了，因为很长……</blockquote>
<h2 id="articleHeader5">其它</h2>
<p>可以看到，写个 loader 其实也是蛮简单的，了解其中原理之后，你甚至可以创建自创格式的文件和扩展名，然后写个 loader 处理/加载这类文件，是不是很骚？！<img src="https://static.alili.techundefined" class="emoji" alt="smile" title="smile"></p>
<p>正如开头提到的，loader 中的代码，借鉴自 vuepress,感谢其开发组人员并尊重其版权，如果大家有兴趣可自己前往查看该项目，本人也并不打算装这个 loader 封装成包并发布，它仅仅是为了自己项目需要折腾的，十分粗陋。</p>
<p>最后，放出自己用到这个 <code>loader</code> 的项目地址，算是广告一波。</p>
<p><a href="https://github.com/tianyong90/we-vue" rel="nofollow noreferrer" target="_blank">we-vue GitHub 地址</a></p>
<p><a href="https://wevue.org" rel="nofollow noreferrer" target="_blank">we-vue 在线文档</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
自己撸个 vue markdown loader

## 原文链接
[https://segmentfault.com/a/1190000014666185](https://segmentfault.com/a/1190000014666185)


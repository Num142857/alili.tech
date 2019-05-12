---
title: 'Nuxt.js踩坑分享' 
date: 2018-12-18 2:30:10
hidden: true
slug: zklxv13b32
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">构建问题</h2>
<h3 id="articleHeader1">1. 如何在 head 里面引入js文件?</h3>
<blockquote>背景: 在<code>&lt;head&gt;</code>标签中，以inline的形式引入<code>flexible.js</code>文件。本项目主要为移动端项目，引入<code>flexible.js</code> 实现移动端适配问题。</blockquote>
<p>Nuxt.js 通过 <code>vue-meta</code> 实现头部标签管理，通过查看文档发现，可以按照如下方式配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// nuxt.config.js
head: {
  script: [
    { innerHTML: 'console.log(&quot;hello&quot;)', type: 'text/javascript', charset: 'utf-8'}
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// nuxt.config.js</span>
<span class="hljs-attribute">head</span>: {
  <span class="hljs-attribute">script</span>: [
    { <span class="hljs-attribute">innerHTML</span>: <span class="hljs-string">'console.log("hello")'</span>, <span class="hljs-attribute">type</span>: <span class="hljs-string">'text/javascript'</span>, <span class="hljs-attribute">charset</span>: <span class="hljs-string">'utf-8'</span>}
  ]
}</code></pre>
<p>结果，生成 html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script data-n-head=&quot;true&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;>console.log(&amp;quot;hello&amp;quot;)</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">data-n-head</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="javascript"><span class="hljs-built_in">console</span>.log(&amp;quot;hello&amp;quot;)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我们发现 <code>vue-meta</code> 把引号做了转义处理，加入 <code>__dangerouslyDisableSanitizers: ['script']</code> 后，就不会再对这些字符做转义了，该字段使用需慎重！</p>
<p>接下来，要把 <code>console.log("hello")</code> 的内容替换成 <code>flexible.js</code>，配置升级之后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="head: {
  script: [{ innerHTML: require('./assets/js/flexible'), type: 'text/javascript', charset: 'utf-8'}],
  __dangerouslyDisableSanitizers: ['script']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">head</span>: {
  <span class="hljs-attribute">script</span>: [{ innerHTML: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./assets/js/flexible'</span>), type: <span class="hljs-string">'text/javascript'</span>, charset: <span class="hljs-string">'utf-8'</span>}],
  __<span class="hljs-selector-tag">dangerouslyDisableSanitizers</span>: <span class="hljs-selector-attr">['script']</span>
}</code></pre>
<p>踩坑成功，下一个坑...</p>
<h3 id="articleHeader2">2. 如何使用预处理器</h3>
<blockquote>背景：在组件中的<code>&lt;template&gt;</code>， <code>&lt;script&gt;</code> 或 <code>&lt;style&gt;</code> 上使用各种预处理器，加上处理器后，控制台报错。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot;>
.red
  color: red
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.red</span>
  <span class="hljs-selector-tag">color</span>: <span class="hljs-selector-tag">red</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这个问题解决方法非常简单，只需要安装这些依赖就好。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev node-sass sass-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install --save-dev <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> sass-loader</code></pre>
<p>但是解决过程并不是很顺利的，在阅读中文文档时，忽略版本号，按照上面的提示进行操作，发现不能成功，后来各种debug，最后发现了该解决方案。后知后觉的发现了中文文档的版本号过低，如果需要查看文档，一定要看最新版本的英文文档！</p>
<h3 id="articleHeader3">3. 如何使用px2rem</h3>
<blockquote>背景：在css中，写入px，通过<code>px2rem loader</code>，将px转换成rem</blockquote>
<p>在以前的项目中，是通过 <code>px2rem loader</code>实现的，但是在Nuxt.js项目下，添加 css loader 还是很费力的，因为涉及到<code>vue-loader</code>。</p>
<p>想到了一个其他方案，可以使用 <code>postcss</code> 处理。可以在 <code>nuxt.config.js</code> 文件中添加配置，也可以在<code>postcss.conf.js</code>文件中添加。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build: {
  postcss: [
    require('postcss-px2rem')({
      remUnit: 75 // 转换基本单位
    })
  ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">build</span>: {
  <span class="hljs-attribute">postcss</span>: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-px2rem'</span>)({
      remUnit: 75 // 转换基本单位
    })
  ]
},</code></pre>
<h3 id="articleHeader4">4. 如何拓展 webpack 配置</h3>
<blockquote>背景：给 utils 目录添加别名</blockquote>
<p>刚刚说到，Nuxt.js内置了 <code>webpack</code> 配置，如果想要拓展配置，可以在 <code>nuxt.config.js</code> 文件中添加。同时也可以在该文件中，将配置信息打印出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extend (config, ctx) {
  console.log('webpack config:', config)
  if (ctx.isClient) {
    // 添加 alias 配置
    Object.assign(config.resolve.alias, {
      'utils': path.resolve(__dirname, 'utils')
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>extend (<span class="hljs-built_in">config</span>, ctx) {
  console.log(<span class="hljs-string">'webpack config:'</span>, <span class="hljs-built_in">config</span>)
  <span class="hljs-built_in">if</span> (ctx.isClient) {
    <span class="hljs-comment">// 添加 alias 配置</span>
    Object.assign(<span class="hljs-built_in">config</span>.resolve.alias, {
      <span class="hljs-string">'utils'</span>: path.resolve(__dirname, <span class="hljs-string">'utils'</span>)
    })
  }
}</code></pre>
<h3 id="articleHeader5">5. 如何添加 vue plugin</h3>
<blockquote>背景：自己封装了一个 toast vue plugin，由于 vue 实例化的过程没有暴露出来，不知道在哪个时机注入进去。</blockquote>
<p>可以在 <code>nuxt.config.js</code> 中添加 plugins 配置，这样插件就会在 Nuxt.js 应用初始化之前被加载导入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: ['~plugins/toast']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [<span class="hljs-string">'~plugins/toast'</span>]
}</code></pre>
<p>~plugins/toast.js 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import toast from '../utils/toast'
import '../assets/css/toast.css'

Vue.use(toast)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> toast <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/toast'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../assets/css/toast.css'</span>

Vue.use(toast)</code></pre>
<h3 id="articleHeader6">6.如何修改环境变量 NODE_ENV</h3>
<blockquote>背景：在项目中，设置 3个 <code>NODE_ENV</code> 的值，来对应不同的版本。development，本地开发；release，预发布版本；production，线上版本。其中，预发布版本比production版本，多出vconsole。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
&quot;scripts&quot;: {
  &quot;buildDev&quot;: &quot;cross-env NODE_ENV=release nuxt build &amp;&amp; backpack build&quot;,
  &quot;startDev&quot;: &quot;cross-env NODE_ENV=release PORT=3000 node build/main.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// package.json</span>
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"buildDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=release nuxt build &amp;&amp; backpack build"</span>,
  <span class="hljs-string">"startDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=release PORT=3000 node build/main.js"</span>
  },</code></pre>
<p>打印 <code>process.env.NODE_ENV</code> 依旧是，<code>production</code>。</p>
<p>在 backpack 的源码中，找到了答案，在 执行 <code>backpack build</code> 命令时，会把 <code>process.env.NODE_ENV</code> 修改为 <code>production</code>，并且是写死的不可配置的......</p>
<p>无奈下，只能在 <code>process.env</code> 下，添加 <code>__ENV</code> 属性，代表 <code>NODE_ENV</code></p>
<p><span class="img-wrap"><img data-src="/img/bV1TSX?w=2152&amp;h=822" src="https://static.alili.tech/img/bV1TSX?w=2152&amp;h=822" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这时，在页面中打印出来的信息 <code>process.env.__ENV undefined</code>，但是可以打印出 <code>process.env.NODE_ENV</code>。</p>
<p>可以通过配置 <code>nuxt.config.js</code> 中的，<code>env</code>属性，解决该问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="env: {
  __ENV: process.env.__ENV
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">env</span>: {
  <span class="hljs-attribute">__ENV</span>: process.env.__ENV
}</code></pre>
<h2 id="articleHeader7">开发问题</h2>
<h3 id="articleHeader8">1. Window 或 Document 对象未定义？</h3>
<blockquote>背景: 在引入第三方插件，或者直接在代码中写 <code>window</code> 时，控制台会给出警告，<code>window</code> 未定义。</blockquote>
<p>发生在这个问题的原因时，node服务端并没有<code>window</code> 或 <code>document</code> 对象。解决方法，通过 <code>process.browser</code> 来区分环境。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.browser) {
  // 引入第三方插件
  require('***')
  // 或者修改window对象下某一属性
  window.mbk = {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (process.browser) {
  <span class="hljs-comment">// 引入第三方插件</span>
  <span class="hljs-built_in">require</span>(<span class="hljs-string">'***'</span>)
  <span class="hljs-comment">// 或者修改window对象下某一属性</span>
  <span class="hljs-built_in">window</span>.mbk = {}
}</code></pre>
<h2 id="articleHeader9">最后</h2>
<p>本文主要在项目中遇到的各种问题，文中有任何表述不清或不当的地方，欢迎大家批评指正。给大家推荐我们的公众号 前端新视野 ，一个很认真的日刊公众号，欢迎扫描下方二维码关注！</p>
<p><span class="img-wrap"><img data-src="/img/bV1SGS?w=344&amp;h=344" src="https://static.alili.tech/img/bV1SGS?w=344&amp;h=344" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nuxt.js踩坑分享

## 原文链接
[https://segmentfault.com/a/1190000012806871](https://segmentfault.com/a/1190000012806871)


---
title: 'Vue2 模板中的图片地址如何使用 webpack 定义的别名?' 
date: 2019-01-28 2:30:09
hidden: true
slug: ci9pq4ebac
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack 的别名好处大家也都了解, 但是 vue 的模板中, 对图片地址使用别名时总出现问题, 很久时间的时间都没找到解决办法, 一度认为是 webpack 的原因...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>alia<span class="hljs-variable">s:</span> {
  <span class="hljs-string">'src'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src'</span>),
  <span class="hljs-string">'assets'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src/assets'</span>),
  <span class="hljs-string">'components'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src/components'</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <img src=&quot;assets/images/logo.jpg&quot; />
</template>
<script>
import 'assets/css/style.css'
</script>
<style>
.logo {
  background: url(asset/images/bg.jpg)
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"assets/images/logo.jpg"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> <span class="hljs-string">'assets/css/style.css'</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.logo</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(asset/images/bg.jpg)
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>上面的代码, 你会发现只有引入<code>style.css</code>是成功的, 图片地址和背景图片地址都会解析失败...</p>
<p>经过各种搜索找原因(这时候, 你会发现百度搜索这些技术型的内容, 真是垃圾中的战斗机), 最终还是找到原因了...<br><code>vue-html-loader and css-loader translates non-root URLs to relative paths. In order to treat it like a module path, prefix it with ~</code><br>就是要在别名前面加一个<code>~</code></p>
<p>最终代码写成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>alia<span class="hljs-variable">s:</span> {
  <span class="hljs-string">'src'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src'</span>),
  <span class="hljs-string">'assets'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src/assets'</span>),
  <span class="hljs-string">'components'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src/components'</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <img src=&quot;~assets/images/logo.jpg&quot; />
</template>
<script>
import 'assets/css/style.css'
</script>
<style>
.logo {
    background: url(~asset/images/bg.jpg)
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"~assets/images/logo.jpg"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> <span class="hljs-string">'assets/css/style.css'</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.logo</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(~asset/images/bg.jpg)
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>意思就是: 告诉加载器它是一个模块，而不是相对路径<br>注意: 只有在<code>template</code>中的静态文件地址和<code>style</code>中的静态文件地址需要加<code>~</code>, 在<code>script</code>里的, 别名定义成什么就写什么.<br>简单吧, 然而没找到原因前, 你压根就没办法...<br>到此, 纠结了几个月时间的问题, 终于解决了...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 模板中的图片地址如何使用 webpack 定义的别名?

## 原文链接
[https://segmentfault.com/a/1190000008107976](https://segmentfault.com/a/1190000008107976)


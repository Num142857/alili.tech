---
title: 'Vue style里面使用@import引入外部css, 作用域是全局的解决方案' 
date: 2018-12-18 2:30:11
hidden: true
slug: 4g7dqt8cj4b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题描述</h2>
<p>使用@import引入外部css，作用域却是全局的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>

</template>

<script>
    export default {
        name: &quot;user&quot;
    };
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
@import &quot;../static/css/user.css&quot;;
.user-content{
  background-color: #3982e5;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue.js"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"user"</span>
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> <span class="hljs-string">"../static/css/user.css"</span>;
<span class="hljs-selector-class">.user-content</span>{
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3982e5</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<blockquote>Add "scoped" attribute to limit CSS to this component only</blockquote>
<p>这句话大家应该是见多了, 我也使用scoped, 但是使用@import引入外部样式表作用域依然是全局的，看了一遍@import的规则后, 进行初步猜测，难道是@import引入外部样式表错过了scoped style?</p>
<p>又回想到此前看过的前端性能优化文章里面都有提到，在生产环境中不要使用@import引入css，因为在请求到的css中含有@import引入css的话，会发起请求把@import的css引进来，多次请求浪费不必要的资源。</p>
<p>@import并不是引入代码到&lt;style&gt;&lt;/style&gt;里面，而是发起新的请求获得样式资源，并且没有加scoped</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
@import &quot;../static/css/user.css&quot;;
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> <span class="hljs-string">"../static/css/user.css"</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>我们只需把@import改成&lt;style src=""&gt;&lt;/style&gt;引入外部样式，就可以解决样式是全局的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped src=&quot;../static/css/user.css&quot;>
<style scoped>
.user-content{
  background-color: #3982e5;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../static/css/user.css"</span>&gt;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.user-content</span>{
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3982e5</span>;
}
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>整体代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>

</template>

<script>
    export default {
        name: &quot;user&quot;
    };
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped src=&quot;../static/css/user.css&quot;>
<style scoped>
.user-content{
  background-color: #3982e5;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"user"</span>
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../static/css/user.css"</span>&gt;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.user-content</span>{
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3982e5</span>;
}
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader1">参考链接</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import" rel="nofollow noreferrer" target="_blank">MDN Web技术文档 @import</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue style里面使用@import引入外部css, 作用域是全局的解决方案

## 原文链接
[https://segmentfault.com/a/1190000012728854](https://segmentfault.com/a/1190000012728854)


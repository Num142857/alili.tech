---
title: 'Vue.js2.0 后台系统实战' 
date: 2019-01-30 2:30:23
hidden: true
slug: 5dnxbgly144
categories: [reprint]
---

{{< raw >}}

                    
<p>朋友最近要做个自己用的OA来练练手（PS，那逼一直想创业），找我和他一起做，由于最近时间有限，就帮他写个框架自己用吧。</p>
<blockquote><p>我使用yarn管理的项目（真的不是跟风），当然也可以使用Npm管理</p></blockquote>
<p>首先使用<code>vue-cli</code>初始化项目，然后安装<code>Vue-router Vuex element</code>,由于朋友没有做过前端所以我选择了<code>element</code>快速开发页面。安装好所有依赖后目录结构是这样的</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007664059" src="https://static.alili.tech/img/remote/1460000007664059" alt="目录结构" title="目录结构" style="cursor: pointer; display: inline;"></span></p>
<p>这里需要注意的是我每个组件都是一个文件夹由<code>index.vue script.js style.sass template.jade</code>文件组成，这样可以方便的在编辑器中格式化，引用的时候只需引用文件夹就可</p>
<h3 id="articleHeader0">e.g.</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import NotFound from './views/404';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/404'</span>;</code></pre>
<h3 id="articleHeader1">index.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot; scoped src=&quot;./style.sass&quot;>
</style>

<template lang=&quot;jade&quot; src=&quot;./template.pug&quot;>
</template>

<script src=&quot;./script.js&quot;>
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./style.sass"</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"jade"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./template.pug"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./script.js"</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader2">script.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data() {
    return {

    }
  },
  components: {

  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {

    }
  },
  <span class="hljs-attr">components</span>: {

  }
}
</code></pre>
<h3 id="articleHeader3">sass</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".red
  color: red
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code class="sass">.<span class="hljs-built_in">red</span>
  <span class="hljs-built_in">color</span>: <span class="hljs-built_in">red</span>
</code></pre>
<p>因为<code>vue-cli webpack</code> 生成的项目没有使用<code>jade</code>所以需要自己添加<code>webpack</code>的<code>jade-loader</code></p>
<blockquote><p>注意这时候需要安装<code>pug-html-loader</code> <code>jade</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
     {
        test: /\.pug$/,
        loader: 'vue-html!pug-html'
      },
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
     {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.pug$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-html!pug-html'</span>
      },
...</code></pre>
<h3 id="articleHeader4">Sass 支持</h3>
<p>为了支持<code>Sass</code>需要安装<code>sass-loader node-sass</code> </p>
<p><code>Vue-resource</code>我安装了还没决定使用，可能使用<code>Ajax</code>如果使用<code>Ajax</code>我会使用<a href="https://github.com/ded/reqwest" rel="nofollow noreferrer" target="_blank">reqwest</a>库</p>
<p>这里的项目是参考了<a href="https://segmentfault.com/a/1190000007630677">vue2.0构建单页应用最佳实战</a>的过程，所以例子的功能一样~</p>
<p>求Star <a href="https://github.com/ycr6708536/vue-stage" rel="nofollow noreferrer" target="_blank">github</a></p>
<p><a href="http://www.jianshu.com/p/30bceb939bec" rel="nofollow noreferrer" target="_blank">原文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js2.0 后台系统实战

## 原文链接
[https://segmentfault.com/a/1190000007664056](https://segmentfault.com/a/1190000007664056)


---
title: 实现一个vue的图片预览插件
hidden: true
categories: [reprint]
slug: bfae2f17
date: 2018-11-09 02:30:06
---

{{< raw >}}
<h1 id="articleHeader0">vue-image-swipe</h1><p>&#x57FA;&#x4E8E;photoswipe&#x5B9E;&#x73B0;&#x7684;vue&#x56FE;&#x7247;&#x9884;&#x89C8;&#x7EC4;&#x4EF6;</p><h3 id="articleHeader1">&#x5B89;&#x88C5;</h3><p>1 &#x7B2C;&#x4E00;&#x6B65;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-image-swipe -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install </span>vue-image-<span class="hljs-keyword">swipe </span>-D</code></pre><p>2 &#x7B2C;&#x4E8C;&#x6B65;</p><p>vue &#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import VueImageSwipe from &apos;vue-image-swipe&apos;
import &apos;vue-image-swipe/dist/vue-image-swipe.css&apos;
Vue.use(VueImageSwipe)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> VueImageSwipe <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-image-swipe&apos;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;vue-image-swipe/dist/vue-image-swipe.css&apos;</span>
Vue.use(VueImageSwipe)</code></pre><h3 id="articleHeader2">&#x4F7F;&#x7528;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
&lt;div&gt;
  hello world
  &lt;div&gt;
    &lt;ul&gt;
      &lt;li
        :key=&quot;index&quot;
        @click=&quot;preview(index)&quot;
        v-for=&quot;(l, index) in images&quot;&gt;
         &lt;img :src=&quot;l&quot; alt=&quot;&quot;&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name: &apos;app&apos;,
  data() {
    return {
      images: [
        &apos;http://oayhezji6.bkt.clouddn.com/preview1.jpg&apos;,
        &apos;http://oayhezji6.bkt.clouddn.com/preview2.jpg&apos;,
        &apos;http://oayhezji6.bkt.clouddn.com/preview3.jpg&apos;,
        &apos;http://oayhezji6.bkt.clouddn.com/preview9.jpg&apos;,
        &apos;http://oayhezji6.bkt.clouddn.com/preview10.jpg&apos;,
        &apos;http://oayhezji6.bkt.clouddn.com/preview6.jpg&apos;
      ]
    }
  },
  created() {
  },
  methods: {
    preview(index) {
      this.$imagePreview({
        images: this.images,
        index: index,
      })
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  hello world
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;preview(index)&quot;</span>
        <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(l, index) in images&quot;</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;l&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;app&apos;</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">images</span>: [
        <span class="hljs-string">&apos;http://oayhezji6.bkt.clouddn.com/preview1.jpg&apos;</span>,
        <span class="hljs-string">&apos;http://oayhezji6.bkt.clouddn.com/preview2.jpg&apos;</span>,
        <span class="hljs-string">&apos;http://oayhezji6.bkt.clouddn.com/preview3.jpg&apos;</span>,
        <span class="hljs-string">&apos;http://oayhezji6.bkt.clouddn.com/preview9.jpg&apos;</span>,
        <span class="hljs-string">&apos;http://oayhezji6.bkt.clouddn.com/preview10.jpg&apos;</span>,
        <span class="hljs-string">&apos;http://oayhezji6.bkt.clouddn.com/preview6.jpg&apos;</span>
      ]
    }
  },
  created() {
  },
  <span class="hljs-attr">methods</span>: {
    preview(index) {
      <span class="hljs-keyword">this</span>.$imagePreview({
        <span class="hljs-attr">images</span>: <span class="hljs-keyword">this</span>.images,
        <span class="hljs-attr">index</span>: index,
      })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader3">methods</h3><p>&#x53EA;&#x66B4;&#x9732;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;<strong>this.$imagePreview</strong>&#xFF0C;&#x5E76;&#x7ED1;&#x5B9A;&#x5230;vue&#x7684;&#x539F;&#x578B;&#x4E0A;<br>&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$imagePreview(options = {})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">this</span>.$imagePreview(<span class="hljs-keyword">options</span> = {})</code></pre><p>options&#x6709;&#x4E09;&#x4E2A;&#x53C2;&#x6570;</p><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x9ED8;&#x8BA4;&#x503C;</th><th>&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td>images</td><td>&#x7A7A;&#x6570;&#x7EC4;</td><td>&#x56FE;&#x7247;&#x7684;url&#x6570;&#x7EC4;</td></tr><tr><td>index</td><td>0</td><td>&#x9884;&#x89C8;&#x56FE;&#x7247;&#x7684;&#x7D22;&#x5F15;&#x503C;, &#x9ED8;&#x8BA4;&#x662F;0</td></tr><tr><td>defaultOpt</td><td>{}</td><td>&#x914D;&#x7F6E;&#x9879;</td></tr></tbody></table><p>defaultOpt &#x7684;&#x914D;&#x7F6E;&#x9879;&#x8BF7;&#x53C2;&#x8003;<a href="http://photoswipe.com/documentation/options.html" rel="nofollow noreferrer" target="_blank">photoswipe&#x914D;&#x7F6E;&#x9879;</a>&#xFF0C;<br><strong>&#x6CE8;&#x610F;&#xFF1A;&#x4E0D;&#x80FD;&#x4FDD;&#x8BC1;&#x6240;&#x6709;&#x914D;&#x7F6E;&#x9879;&#x90FD;&#x662F;&#x53EF;&#x7528;&#x7684;</strong></p><p>&#x5217;&#x4E3E;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="defaultOpt: {
  fullscreenEl: true,
  shareEl: false,
  arrowEl: true,
  preloaderEl: true,
  loop: false,
  bgOpacity: 0.85,
  showHideOpacity: true,
  errorMsg: &apos;&lt;div class=&quot;pswp__error-msg&quot;&gt;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&lt;/div&gt;&apos;,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-attr">defaultOpt:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  fullscreenEl:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shareEl:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  arrowEl:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  preloaderEl:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  loop:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  bgOpacity:</span> <span class="hljs-number">0.85</span><span class="hljs-string">,</span>
<span class="hljs-attr">  showHideOpacity:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  errorMsg:</span> <span class="hljs-string">&apos;&lt;div class=&quot;pswp__error-msg&quot;&gt;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&lt;/div&gt;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-string">}</span></code></pre><h3 id="articleHeader4">demo</h3><p><a href="https://zhhshen.github.io/vue-image-swipe/example/index.html" rel="nofollow noreferrer" target="_blank">demo</a></p><p><a href="https://github.com/zhhshen/vue-image-swipe" rel="nofollow noreferrer" target="_blank">&#x67E5;&#x770B;&#x6E90;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现一个vue的图片预览插件

## 原文链接
[https://segmentfault.com/a/1190000016409430](https://segmentfault.com/a/1190000016409430)


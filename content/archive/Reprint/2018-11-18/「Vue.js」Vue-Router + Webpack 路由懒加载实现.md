---
title: '「Vue.js」Vue-Router + Webpack 路由懒加载实现' 
date: 2018-11-18 2:30:10
hidden: true
slug: zhe1p91iwz
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x4E00;.&#x524D;&#x8A00;</h3><p>&#x5F53;&#x6253;&#x5305;&#x6784;&#x5EFA;&#x5E94;&#x7528;&#x65F6;&#xFF0C;Javascript &#x5305;&#x4F1A;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x5927;&#xFF0C;&#x5F71;&#x54CD;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x80FD;&#x628A;&#x4E0D;&#x540C;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x5206;&#x5272;&#x6210;&#x4E0D;&#x540C;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x8DEF;&#x7531;&#x88AB;&#x8BBF;&#x95EE;&#x7684;&#x65F6;&#x5019;&#x624D;&#x52A0;&#x8F7D;&#x5BF9;&#x5E94;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x66F4;&#x52A0;&#x9AD8;&#x6548;&#x4E86;&#x3002;&#x7ED3;&#x5408; <strong>Vue &#x7684;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;</strong>&#x548C; <strong>Webpack &#x7684;&#x4EE3;&#x7801;&#x5206;&#x5272;</strong>&#x529F;&#x80FD;&#xFF0C;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;&#x61D2;&#x52A0;&#x8F7D;.</p><ol><li><a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">Vue &#x7684;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;</a></li><li><a href="https://webpack.docschina.org/guides/code-splitting" rel="nofollow noreferrer" target="_blank">webpack&#x4EE3;&#x7801;&#x5206;&#x5272;</a></li></ol><p>&#x5EFA;&#x8BAE;&#x9996;&#x5148;&#x719F;&#x8BFB;&#x8FD9;&#x4E24;&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x4F1A;&#x66F4;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x539F;&#x7406;&#x3002;&#x672C;&#x6587;&#x7684;&#x6E90;&#x7801;&#x5730;&#x5740;&#x5728;--&gt;<a href="https://github.com/JChermy/code-snippets/tree/master/lazyLoad" rel="nofollow noreferrer" target="_blank">lazyLoad</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;<strong>star</strong>(&#x30FB;&#x3B5;&#x30FB;&#x25CF;)</p><h3 id="articleHeader1">&#x4E8C;.&#x5B9E;&#x6218;</h3><p>&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x6B65;&#x6B65;&#x5B9E;&#x8DF5;&#x4E00;&#x4E0B;&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x8FC7;&#x7A0B;<br>1.&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5927;&#x81F4;&#x5982;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/bVbeTzU?w=317&amp;h=450" src="https://static.alili.tech/img/bVbeTzU?w=317&amp;h=450" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>2.&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F5C;&#x4E3A;&#x5207;&#x6362;&#x7EC4;&#x4EF6;&#x65F6;&#x5C55;&#x793A;&#xFF0C;&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div&gt;
        &lt;h4&gt;This is About Page&lt;/h4&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
    name:  &apos;about&apos;
}
&lt;/script&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>This is About Page<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>:  <span class="hljs-string">&apos;about&apos;</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>3.&#x91CD;&#x70B9;&#x662F;route&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x662F;&#x8FD9;&#x6837;&#x914D;&#x7F6E;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;
import Home from &apos;./views/Home.vue&apos;
import About from &apos;./views/About.vue&apos;

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: &apos;/home&apos;,
      name: &apos;home&apos;,
      component: Home
    },
    {
      path: &apos;/about&apos;,
      name: &apos;about&apos;,
      component: About
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/Home.vue&apos;</span>
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/About.vue&apos;</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">&apos;/home&apos;</span>,
      name: <span class="hljs-string">&apos;home&apos;</span>,
      component: Home
    },
    {
      path: <span class="hljs-string">&apos;/about&apos;</span>,
      name: <span class="hljs-string">&apos;about&apos;</span>,
      component: About
    }
  ]
})</code></pre><p>&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;&#x4E2D;&#x6211;&#x4EEC;&#x8981;&#x7528;&#x5230;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x6539;&#x4E3A;&#x8FD9;&#x6837;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;

Vue.use(Router)

function loadView(view) {
  return () =&gt; import(/* webpackChunkName: &quot;view-[request]&quot; */ `@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: &apos;/home&apos;,
      name: &apos;home&apos;,
      component: loadView(&apos;Home&apos;)
    },
    {
      path: &apos;/about&apos;,
      name: &apos;about&apos;,
      component: loadView(&apos;About&apos;)
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>

Vue.use(Router)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadView</span>(<span class="hljs-params">view</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;view-[request]&quot; */</span> <span class="hljs-string">`@/views/<span class="hljs-subst">${view}</span>.vue`</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/home&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;home&apos;</span>,
      <span class="hljs-attr">component</span>: loadView(<span class="hljs-string">&apos;Home&apos;</span>)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/about&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;about&apos;</span>,
      <span class="hljs-attr">component</span>: loadView(<span class="hljs-string">&apos;About&apos;</span>)
    }
  ]
})</code></pre><p>&#x9664;&#x4E86;&#x4E0A;&#x9762;&#x7528;&#x5230;&#x7684;import()&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;webpack&#x7279;&#x6709;&#x7684;require.ensure()</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Baz = r =&gt; require.ensure([], ()=&gt;r(require(&apos;./Baz.vue&apos;)), &apos;/baz&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> Baz = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>r(<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./Baz.vue&apos;</span>)), <span class="hljs-string">&apos;/baz&apos;</span>)</code></pre><p>&#x5C06;&#x5176;&#x4ED6;&#x7684;&#x6587;&#x4EF6;&#x914D;&#x7F6E;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x770B;&#x5230;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x6548;&#x679C;&#x4E86;&#xFF0C;&#x5373;&#x53EA;&#x6709;&#x5F53;&#x8DEF;&#x7531;&#x5339;&#x914D;&#x6210;&#x529F;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x52A0;&#x8F7D;&#x76F8;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x4E14;&#x52A0;&#x8F7D;&#x4E00;&#x6B21;&#x540E;&#x4F1A;&#x5C06;&#x5B83;&#x7F13;&#x5B58;&#xFF0C;&#x4E0B;&#x6B21;&#x518D;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#xFF0C;&#x4E0D;&#x4F1A;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbeTEX?w=1002&amp;h=509" src="https://static.alili.tech/img/bVbeTEX?w=1002&amp;h=509" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader2">&#x4E09;&#x3001;&#x7ED3;&#x8BED;</h3><p>&#x611F;&#x8C22;&#x4F60;&#x9605;&#x8BFB;&#x6211;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x5982;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x8D5E;&#x6536;&#x85CF;&#x3002;&#x5982;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x6B63;&#x3002;&#x6700;&#x540E;&#xFF0C;&#x5341;&#x5206;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x8DDF;&#x7740;&#x5B9E;&#x73B0;&#x4E00;&#x904D;&#xFF0C;&#x6E90;&#x7801;&#x5730;&#x5740;&#x5728;<a href="https://github.com/JChermy/code-snippets/tree/master/lazyLoad" rel="nofollow noreferrer" target="_blank">lazyLoad</a>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「Vue.js」Vue-Router + Webpack 路由懒加载实现

## 原文链接
[https://segmentfault.com/a/1190000015904599](https://segmentfault.com/a/1190000015904599)


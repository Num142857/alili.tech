---
title: '如何用vue-router为每个路由配置各自的title' 
date: 2018-11-19 2:32:04
hidden: true
slug: 4t3ov54inmb
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4F20;&#x7EDF;&#x65B9;&#x6CD5;</h1><p>&#x4EE5;&#x524D;&#x5728;&#x5355;&#x9875;&#x9762;&#x8DEF;&#x7531;&#x4E2D;&#xFF0C;&#x5C31;&#x53EA;&#x80FD;&#x5728;html&#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x7F51;&#x7AD9;&#x7684;title&#x3002;&#x5982;&#x679C;&#x60F3;&#x8981;&#x52A8;&#x6001;&#x7684;&#x53BB;&#x4FEE;&#x6539;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.title = &apos;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6807;&#x9898;&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">document</span>.title = <span class="hljs-string">&apos;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6807;&#x9898;&apos;</span>;</code></pre><p>&#x8FD9;&#x6837;&#x4F1A;&#x8BA9;&#x6211;&#x4EEC;&#x505A;&#x5F88;&#x591A;&#x65E0;&#x7528;&#x529F;&#x3002;&#x663E;&#x5F97;&#x5341;&#x5206;&#x8822;&#x3002;</p><h1 id="articleHeader1">&#x4F7F;&#x7528;Vue-Router&#x7684;&#x65B9;&#x6CD5;</h1><p>&#x9996;&#x5148;&#x6253;&#x5F00;/src/router/index.js&#x6587;&#x4EF6;&#x3002;<br>&#x627E;&#x5230;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vueRouter = new Router({
    routes,
    mode: &apos;history&apos;,
    linkActiveClass: &apos;active-link&apos;,
    linkExactActiveClass: &apos;exact-active-link&apos;,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> vueRouter = <span class="hljs-keyword">new</span> Router({
    routes,
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;history&apos;</span>,
    <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">&apos;active-link&apos;</span>,
    <span class="hljs-attr">linkExactActiveClass</span>: <span class="hljs-string">&apos;exact-active-link&apos;</span>,
    scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
      <span class="hljs-keyword">if</span> (savedPosition) {
        <span class="hljs-keyword">return</span> savedPosition;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> };
      }
    },
  });</code></pre><p>vueRouter&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x540D;&#x3002;&#x53EB;&#x4EC0;&#x4E48;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4F60;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x7684;&#x547D;&#x540D;&#x6765;&#x627E;&#xFF0C;&#x53EA;&#x8981;&#x662F;Router&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5C31;OK&#x3002;&#x7136;&#x540E;&#x5C06;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x66FF;&#x6362;&#x6210;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vueRouter = new Router({
    routes,
    mode: &apos;history&apos;,
    linkActiveClass: &apos;active-link&apos;,
    linkExactActiveClass: &apos;exact-active-link&apos;,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
  });
  vueRouter.beforeEach((to, from, next) =&gt; {
    /* &#x8DEF;&#x7531;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4FEE;&#x6539;&#x9875;&#x9762;title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> vueRouter = <span class="hljs-keyword">new</span> Router({
    routes,
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;history&apos;</span>,
    <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">&apos;active-link&apos;</span>,
    <span class="hljs-attr">linkExactActiveClass</span>: <span class="hljs-string">&apos;exact-active-link&apos;</span>,
    scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
      <span class="hljs-keyword">if</span> (savedPosition) {
        <span class="hljs-keyword">return</span> savedPosition;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> };
      }
    },
  });
  vueRouter.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    <span class="hljs-comment">/* &#x8DEF;&#x7531;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4FEE;&#x6539;&#x9875;&#x9762;title */</span>
    <span class="hljs-keyword">if</span> (to.meta.title) {
      <span class="hljs-built_in">document</span>.title = to.meta.title;
    }
    next();
  });</code></pre><p>&#x4EE3;&#x7801;&#x7684;&#x903B;&#x8F91;&#x5C31;&#x662F;&#x5728;&#x8DEF;&#x7531;&#x5C06;&#x8981;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7528;&#x4F20;&#x7EDF;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5BF9;&#x6BCF;&#x4E2A;&#x5C06;&#x8981;&#x8DF3;&#x8F6C;&#x5230;&#x7684;&#x8DEF;&#x7531;&#x7684;title&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x3002;</p><h1 id="articleHeader2">&#x914D;&#x7F6E;&#x8DEF;&#x7531;</h1><p>&#x914D;&#x7F6E;&#x597D;&#x4E86;index.js&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x53BB;&#x7ED9;&#x6BCF;&#x4E2A;router&#x914D;&#x7F6E;&#x81EA;&#x5DF1;&#x7684;title&#x4E86;&#x3002;&#x4F8B;&#x5982;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path: &apos;/&apos;,
  name: &apos;Home&apos;,
  component: () =&gt; import(&apos;@/views/Home/Home&apos;),
  meta: {
    title: &apos;&#x9996;&#x9875;&apos;,
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Home&apos;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;@/views/Home/Home&apos;</span>),
  <span class="hljs-attr">meta</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
  },
}</code></pre><p>&#x7ED9;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x52A0;&#x4E0A;&#x4E00;&#x4E2A;&#x53EB;meta&#x7684;&#x5C5E;&#x6027;&#x3002;meta&#x5C5E;&#x6027;&#x91CC;&#x7684;&#x5C5E;&#x6027;&#x53EB;title&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x72EC;&#x7279;&#x7684;title&#x4E86;&#x3002;&#x52A0;&#x4E0A;&#x4E4B;&#x540E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x90FD;&#x4F1A;&#x6709;&#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;&#x597D;&#x7684;title&#x4E86;&#x3002;</p><p>&#x6B22;&#x8FCE;&#x5149;&#x4E34; <a href="https://detectivehlh.github.io./" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用vue-router为每个路由配置各自的title

## 原文链接
[https://segmentfault.com/a/1190000015811628](https://segmentfault.com/a/1190000015811628)


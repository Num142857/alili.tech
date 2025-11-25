---
title: '极简Vue的异步组件函数' 
date: 2018-11-22 11:48:10
hidden: true
slug: gnplrtx9vu5
categories: [reprint]
---

{{< raw >}}
<div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
  routes: [
    {
      path: &apos;/live&apos;,
      name: &apos;live&apos;,
      component: () =&gt; import(&apos;@/view/live/live.vue&apos;)
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">&apos;/live&apos;</span>,
      name: <span class="hljs-string">&apos;live&apos;</span>,
      component: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;@/view/live/live.vue&apos;</span>)
    }
  ]
})</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x5F88;&#x5E38;&#x89C1;&#x7684;router&#x4EE3;&#x7801;&#x5206;&#x5272;,&#x53EA;&#x5728;&#x4EE3;&#x7801;&#x8DEF;&#x7531;&#x4E3A;live&#x624D;&#x4F1A;&#x53BB;&#x52A0;&#x8F7D;live.vue<br>&#x4F46;&#x8FD9;&#x6837;&#x5728;live.vue&#x83B7;&#x53D6;&#x7684;&#x8FC7;&#x7A0B;&#x5C06;&#x662F;&#x4E00;&#x7247;&#x7A7A;&#x767D;,&#x4EC0;&#x4E48;&#x4E5F;&#x6CA1;&#x6709;,&#x4F53;&#x9A8C;&#x4E0D;&#x597D;, &#x5229;&#x7528;vue&#x63D0;&#x4F9B;&#x7684;&#x5F02;&#x6B65;&#x7EC4;&#x5EFA;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; loadable.vue

&lt;template&gt;
    &lt;index&gt;&lt;/index&gt;
&lt;/template&gt;

&lt;script&gt;
    import LoadingComponent from &apos;./load.vue&apos; // LoadingComponents&#x662F; live.vue&#x4E3A;&#x83B7;&#x53D6;&#x524D;&#x5C55;&#x793A;&#x7684;&#x5185;&#x5BB9;
    export default {
        components: {
            index: () =&gt; ({
                component: import(&apos;@/view/live/live.vue&apos;),
                // &#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;
                loading: LoadingComponent,
                // &#x5C55;&#x793A;&#x52A0;&#x8F7D;&#x65F6;&#x7EC4;&#x4EF6;&#x7684;&#x5EF6;&#x65F6;&#x65F6;&#x95F4;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 200 (&#x6BEB;&#x79D2;)
                delay: 200,
                // &#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#x4E14;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x4E5F;&#x8D85;&#x65F6;&#x4E86;&#xFF0C;
                // &#x5219;&#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#xFF1A;`Infinity`
                timeout: 3000
            })
        }
    }
&lt;/script&gt;

&#x7136;&#x540E;&#x4FEE;&#x6539;router.js

export default new Router({
  routes: [
    {
      path: &apos;/live&apos;,
      name: &apos;live&apos;,
      component: import(&apos;loadable.vue&apos;)
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; loadable.vue

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">index</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">index</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> LoadingComponent <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./load.vue&apos;</span> <span class="hljs-comment">// LoadingComponents&#x662F; live.vue&#x4E3A;&#x83B7;&#x53D6;&#x524D;&#x5C55;&#x793A;&#x7684;&#x5185;&#x5BB9;</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            <span class="hljs-attr">index</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
                <span class="hljs-attr">component</span>: <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;@/view/live/live.vue&apos;</span>),
                <span class="hljs-comment">// &#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;</span>
                loading: LoadingComponent,
                <span class="hljs-comment">// &#x5C55;&#x793A;&#x52A0;&#x8F7D;&#x65F6;&#x7EC4;&#x4EF6;&#x7684;&#x5EF6;&#x65F6;&#x65F6;&#x95F4;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 200 (&#x6BEB;&#x79D2;)</span>
                delay: <span class="hljs-number">200</span>,
                <span class="hljs-comment">// &#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#x4E14;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x4E5F;&#x8D85;&#x65F6;&#x4E86;&#xFF0C;</span>
                <span class="hljs-comment">// &#x5219;&#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#xFF1A;`Infinity`</span>
                timeout: <span class="hljs-number">3000</span>
            })
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

&#x7136;&#x540E;&#x4FEE;&#x6539;router.js

export default new Router({
  routes: [
    {
      path: &apos;/live&apos;,
      name: &apos;live&apos;,
      component: import(&apos;loadable.vue&apos;)
    }
  ]
})</code></pre><p>&#x8FD9;&#x6837;&#x5728;&#x83B7;&#x53D6;&#x5230;live.vue&#x4E4B;&#x524D;&#x5C31;&#x4F1A;&#x6709;&#x81EA;&#x5B9A;&#x4E49;&#x7684;loading&#x5C55;&#x793A;&#x4E86;<br>&#x4F46;&#x662F;&#x8DEF;&#x7531;&#x5F88;&#x591A;, &#x6211;&#x4EEC;&#x4E0D;&#x53EF;&#x80FD;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x90FD;&#x5199;&#x4E00;&#x4E2A; loadable.vue, &#x6240;&#x4EE5;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x89E3;&#x51B3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; loadable.js

import LoadingComponent from &apos;./load.vue&apos;

export default (asyncComponent) =&gt; {
    const Com= () =&gt; ({
        // &#x8FD9;&#x91CC;vue&#x5B98;&#x7F51;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x5177;&#x4F53;&#x6709;&#x54EA;&#x4E9B;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;
        // https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%A4%84%E7%90%86%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81
        component: asyncComponent(),
        loading: LoadingComponent
    })
    return {
        render (h) {
          return h(Com, {})
        }
    }
}

&#x7136;&#x540E;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;router.js

import loadable from &apos;loadable.js&apos;
export default new Router({
  routes: [
    {
      path: &apos;/live&apos;,
      name: &apos;live&apos;,
      component: loadable (() =&gt; import(&apos;@/view/live/live.vue&apos;))
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; loadable.js

<span class="hljs-keyword">import</span> LoadingComponent from <span class="hljs-string">&apos;./load.vue&apos;</span>

export <span class="hljs-keyword">default</span> (asyncComponent) =&gt; {
    const Com= () =&gt; ({
        // &#x8FD9;&#x91CC;vue&#x5B98;&#x7F51;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x5177;&#x4F53;&#x6709;&#x54EA;&#x4E9B;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;
        // https://cn.vuejs.org/v2/guide/components-dynamic-async.html#<span class="hljs-meta">%E5</span><span class="hljs-meta">%A4</span><span class="hljs-meta">%84</span><span class="hljs-meta">%E7</span><span class="hljs-meta">%90</span><span class="hljs-meta">%86</span><span class="hljs-meta">%E5</span><span class="hljs-meta">%8A</span><span class="hljs-meta">%A0</span><span class="hljs-meta">%E8</span><span class="hljs-meta">%BD</span><span class="hljs-meta">%BD</span><span class="hljs-meta">%E7</span><span class="hljs-meta">%8A</span><span class="hljs-meta">%B6</span><span class="hljs-meta">%E6</span><span class="hljs-meta">%80</span><span class="hljs-meta">%81</span>
        component: asyncComponent(),
        loading: LoadingComponent
    })
    return {
        render (h) {
          return h(Com, {})
        }
    }
}

&#x7136;&#x540E;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;router.js

<span class="hljs-keyword">import</span> loadable from <span class="hljs-string">&apos;loadable.js&apos;</span>
export <span class="hljs-keyword">default</span> new Router({
  routes: [
    {
      path: <span class="hljs-string">&apos;/live&apos;</span>,
      name: <span class="hljs-string">&apos;live&apos;</span>,
      component: loadable (() =&gt; import(<span class="hljs-string">&apos;@/view/live/live.vue&apos;</span>))
    }
  ]
})</code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x6781;&#x7B80;&#x7684;vue&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x5C31;&#x5B8C;&#x6210;&#x4E86;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
极简Vue的异步组件函数

## 原文链接
[https://segmentfault.com/a/1190000015695910](https://segmentfault.com/a/1190000015695910)


---
title: 'Vue项目添加动态浏览器头部title' 
date: 2018-11-24 2:30:09
hidden: true
slug: xibad36wdyp
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">0. &#x76F4;&#x63A5;&#x4E0A; &#x9884;&#x89C8;&#x94FE;&#x63A5; + &#x6548;&#x679C;&#x56FE;</h3><p><a href="https://mgbq.github.io/vue-permission/#/login" rel="nofollow noreferrer" target="_blank">Vue&#x9879;&#x76EE;&#x6DFB;&#x52A0;&#x52A8;&#x6001;&#x6D4F;&#x89C8;&#x5668;&#x5934;&#x90E8;title</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015588918" src="https://static.alili.tech/img/remote/1460000015588918" alt="login.png" title="login.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015588919?w=1883&amp;h=879" src="https://static.alili.tech/img/remote/1460000015588919?w=1883&amp;h=879" alt="dashboard" title="dashboard" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader1">1. &#x5B9E;&#x73B0;&#x601D;&#x8DEF;</h3><ul><li>( 1 ) &#x4ECE;&#x8DEF;&#x7531;router&#x91CC;&#x9762;&#x5F97;&#x5230;&#x7EC4;&#x4EF6;&#x7684;title</li><li>( 2 ) title&#x5B58;vuex &#xFF08;&#x672C;&#x9879;&#x76EE;&#x5DF2;&#x7ECF;&#x5C01;&#x88C5;h5&#x7684;sessionStorage&#x548C;localStorage&#x4E5F;&#x53EF;&#x4EE5;&#x5B58;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#xFF09;</li><li>( 3 ) &#x8BBE;&#x7F6E; title</li></ul><h4>&#xFF08;1&#xFF09;&#x4ECE;&#x8DEF;&#x7531;router&#x91CC;&#x9762;&#x5F97;&#x5230;&#x7EC4;&#x4EF6;&#x7684;title</h4><p>&#x5728; <code>router.beforeEach((to, from, next) =&gt; {}</code> &#x91CC;&#x9762;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const browserHeaderTitle = to.name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> browserHeaderTitle = <span class="hljs-keyword">to</span>.<span class="hljs-keyword">name</span></code></pre><h4>&#xFF08; 2 ) title&#x5B58;vuex</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" SET_BROWSERHEADERTITLE: (state, action) =&gt; {
      state.browserHeaderTitle = action.browserHeaderTitle
    }

 store.commit(&apos;SET_BROWSERHEADERTITLE&apos;, {
      browserHeaderTitle: browserHeaderTitle
    })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code> SET_BROWSERHEADERTITLE: (<span class="hljs-keyword">state</span>, action) =&gt; {
      <span class="hljs-keyword">state</span>.browserHeaderTitle = action.browserHeaderTitle
    }

 store.commit(&apos;SET_BROWSERHEADERTITLE&apos;, {
      browserHeaderTitle: browserHeaderTitle
    })
</code></pre><h4>( 3 ) &#x8BBE;&#x7F6E; title</h4><p>&#x6211;&#x4EEC;&#x5728;&#x8DEF;&#x7531;after&#x540E;&#x8BBE;&#x7F6E;title</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * &#x8BBE;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x5934;&#x90E8;&#x6807;&#x9898;
 */
export const setTitle = function(title) {
  title = title ? `${title}` : &apos;NxAdmin&apos;
  window.document.title = title
}

router.afterEach(() =&gt; {
  NProgress.done() // &#x7ED3;&#x675F;Progress
  setTimeout(() =&gt; {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-comment">/**
 * &#x8BBE;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x5934;&#x90E8;&#x6807;&#x9898;
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setTitle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">title</span>) </span>{
  title = title ? <span class="hljs-string">`<span class="hljs-subst">${title}</span>`</span> : <span class="hljs-string">&apos;NxAdmin&apos;</span>
  <span class="hljs-built_in">window</span>.document.title = title
}

router.afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  NProgress.done() <span class="hljs-comment">// &#x7ED3;&#x675F;Progress</span>
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, <span class="hljs-number">0</span>)
})

</code></pre><h4><a href="https://github.com/mgbq/nx-admin" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x5730;&#x5740;</a></h4><h2 id="articleHeader2">&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x4EA4;&#x6D41;&#x7FA4;493671066&#xFF0C;&#x7F8E;&#x5973;&#x591A;&#x591A;&#x3002;&#x8001;&#x53F8;&#x673A;&#x5FEB;&#x4E0A;&#x8F66;&#xFF0C;&#x6765;&#x4E0D;&#x53CA;&#x89E3;&#x91CA;&#x4E86;&#x3002;</h2><h4>&#x4F5C;&#x8005;&#x76F8;&#x5173;Vue&#x6587;&#x7AE0;</h4><p><a href="https://github.com/mgbq/vue-permission" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;Vue2.0&#x5B9E;&#x73B0;&#x540E;&#x53F0;&#x7CFB;&#x7EDF;&#x6743;&#x9650;&#x63A7;&#x5236;</a></p><p><a href="https://github.com/mgbq/front-end-Doc" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x6587;&#x6863;&#x6C47;&#x603B;</a></p><p><a href="https://github.com/mgbq/Vue-admin" rel="nofollow noreferrer" target="_blank">VUE2.0&#x589E;&#x5220;&#x6539;&#x67E5;&#x9644;&#x7F16;&#x8F91;&#x6DFB;&#x52A0;model(&#x5F39;&#x6846;)&#x7EC4;&#x4EF6;&#x5171;&#x7528;</a></p><h2 id="articleHeader3">&#x6253;&#x8D4F; &#x8877;&#x5FC3;&#x7684;&#x8868;&#x793A;&#x611F;&#x8C22;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000013472321?w=425&amp;h=425" src="https://static.alili.tech/img/remote/1460000013472321?w=425&amp;h=425" alt="&#x6253;&#x8D4F;" title="&#x6253;&#x8D4F;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue项目添加动态浏览器头部title

## 原文链接
[https://segmentfault.com/a/1190000015588915](https://segmentfault.com/a/1190000015588915)


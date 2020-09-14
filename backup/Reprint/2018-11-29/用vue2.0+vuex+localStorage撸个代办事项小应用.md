---
title: '用vue2.0+vuex+localStorage撸个代办事项小应用' 
date: 2018-11-29 9:33:05
hidden: true
slug: ayznu5wrvfc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h1>
<blockquote>&#x8FD9;&#x4E2A;demo&#x867D;&#x7136;&#x529F;&#x80FD;&#x5C11;&#xFF0C;&#x4F46;&#x662F;vuex&#x77E5;&#x8BC6;&#x70B9;&#x5927;&#x90E8;&#x5206;&#x90FD;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x4E86;&#xFF0C;&#x9EBB;&#x96C0;&#x867D;&#x5C0F; &#x4E94;&#x810F;&#x5185;&#x5168;<p>&#x5E94;&#x7528;&#x9879;&#x76EE;&#x5730;&#x5740; &#x4F20;&#x9001;&#x95E8; <a href="https://github.com/Mynameisfwk/vue-Todo-list" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x529E;&#x4E8B;&#x9879;&#x5730;&#x5740;&#x5728;&#x8FD9;&#x91CC;</a></p>
<p>&#x8FD9;&#x662F;&#x7528;vue2.0&#x5199;&#x7684;&#x5546;&#x57CE; &#x9AD8;&#x4EFF;vivo&#x5546;&#x57CE; <a href="https://github.com/Mynameisfwk/vivo-shop" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;&#x5728;&#x8FD9;&#x91CC;</a></p>
<p>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x7684;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x5E2E;&#x5FD9;&#x70B9;&#x4E2A;star&#x8C22;&#x8C22; &#x611F;&#x8C22;&#x5927;&#x4F6C;&#xFF01;</p>
<p>&#x524D;&#x7AEF;&#x4EA4;&#x6D41;&#x7FA4;740625675 &#x5FD7;&#x540C;&#x9053;&#x5408;&#x7684;&#x53EF;&#x4EE5;&#x52A0;&#x4E0B;&#x4E00;&#x8D77;&#x5B66;&#x4E60;&#xFF01;</p>
</blockquote>
<h1 id="articleHeader1">&#x4EE3;&#x7801;&#x9884;&#x89C8;</h1>
<blockquote>vuex&#x5B98;&#x65B9;&#x6587;&#x6863; <a href="https://vuex.vuejs.org/" rel="nofollow noreferrer" target="_blank">https://vuex.vuejs.org/</a> &#x6211;&#x89C9;&#x7684;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x8BF4;&#x660E;&#x5F88;&#x8BE6;&#x7EC6;<p>localStorage &#x7528;&#x6765;&#x672C;&#x5730;&#x50A8;&#x5B58;&#x6570;&#x636E;</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state={
    home:localStorage[&quot;home&quot;]?JSON.parse(localStorage[&quot;home&quot;]): [],
    item:localStorage[&quot;item&quot;]?JSON.parse(localStorage[&quot;item&quot;]): [],
}

export default state
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs pf"><code>const <span class="hljs-keyword">state</span>={
    home:localStorage[<span class="hljs-string">&quot;home&quot;</span>]?JSON.parse(localStorage[<span class="hljs-string">&quot;home&quot;</span>]): [],
    item:localStorage[<span class="hljs-string">&quot;item&quot;</span>]?JSON.parse(localStorage[<span class="hljs-string">&quot;item&quot;</span>]): [],
}

export <span class="hljs-keyword">default</span> <span class="hljs-keyword">state</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mutations={
    
    [types.SET_SHIXIANG](state,data){
        state.home.push(data)
        localStorage.setItem(&quot;home&quot;,JSON.stringify(state.home));
    },
   
    [types.SET_YES](state,data){
        state.item.push(data)
        localStorage.setItem(&quot;item&quot;,JSON.stringify(state.item));
    }
}

export default mutations
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs pf"><code>const mutations={
    
    [types.SET_SHIXIANG](<span class="hljs-keyword">state</span>,data){
        <span class="hljs-keyword">state</span>.home.push(data)
        localStorage.<span class="hljs-built_in">set</span>Item(<span class="hljs-string">&quot;home&quot;</span>,JSON.stringify(<span class="hljs-keyword">state</span>.home));
    },
   
    [types.SET_YES](<span class="hljs-keyword">state</span>,data){
        <span class="hljs-keyword">state</span>.item.push(data)
        localStorage.<span class="hljs-built_in">set</span>Item(<span class="hljs-string">&quot;item&quot;</span>,JSON.stringify(<span class="hljs-keyword">state</span>.item));
    }
}

export <span class="hljs-keyword">default</span> mutations
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions={
    setOrder ({commit}, data) {
        commit(&apos;SET_SHIXIANG&apos;, data);
    },
    setYes({commit},data){
        commit(&apos;SET_YES&apos;,data)
    }
}
export default actions
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">const</span> actions={
    setOrder ({commit}, <span class="hljs-class"><span class="hljs-keyword">data</span>) {
        <span class="hljs-title">commit</span>(&apos;<span class="hljs-type">SET_SHIXIANG</span>&apos;, <span class="hljs-title">data</span>);
    },</span>
    setYes({commit},<span class="hljs-class"><span class="hljs-keyword">data</span>){
        <span class="hljs-title">commit</span>(&apos;<span class="hljs-type">SET_YES</span>&apos;,<span class="hljs-title">data</span>)
    }</span>
}
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> actions
</code></pre>
<h2 id="articleHeader2">&#x9879;&#x76EE;&#x622A;&#x56FE;</h2>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/30/163aec35481bb6f5?w=361&amp;h=640&amp;f=png&amp;s=20853" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/30/163aec35481bb6f5?w=361&amp;h=640&amp;f=png&amp;s=20853" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/30/163aec3a4883a6a6?w=361&amp;h=640&amp;f=png&amp;s=21366" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/30/163aec3a4883a6a6?w=361&amp;h=640&amp;f=png&amp;s=21366" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">&#x9879;&#x76EE;&#x8FD0;&#x884C;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build</code></pre>
<h2 id="articleHeader4">&#x5199;&#x5728;&#x6700;&#x540E;</h2>
<p>&#x524D;&#x7AEF;&#x5B9E;&#x4E60;&#x751F;&#x4E00;&#x679A;&#xFF0C;&#x505A;&#x7684;&#x4E0D;&#x597D;&#xFF0C;&#x8FD8;&#x671B;&#x5927;&#x4F6C;&#x5634;&#x4E0B;&#x7559;&#x60C5; &#x8F7B;&#x55B7; &#x5927;&#x4F6C;&#x6211;&#x60F3;&#x8981;&#x4E2A;star<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/17/1636bde1d014d991?w=198&amp;h=198&amp;f=jpeg&amp;s=3630" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/17/1636bde1d014d991?w=198&amp;h=198&amp;f=jpeg&amp;s=3630" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue2.0+vuex+localStorage撸个代办事项小应用

## 原文链接
[https://segmentfault.com/a/1190000015096070](https://segmentfault.com/a/1190000015096070)


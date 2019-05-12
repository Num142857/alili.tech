---
title: 'Vue项目中添加锁屏功能' 
date: 2018-11-25 2:30:08
hidden: true
slug: dsljhf8c52n
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">0. &#x76F4;&#x63A5;&#x4E0A; &#x9884;&#x89C8;&#x94FE;&#x63A5;</h3><p><a href="https://mgbq.github.io/vue-permission/#/login" rel="nofollow noreferrer" target="_blank">Vue&#x9879;&#x76EE;&#x4E2D;&#x6DFB;&#x52A0;&#x9501;&#x5C4F;&#x529F;&#x80FD;</a></p><h3 id="articleHeader1">1. &#x5B9E;&#x73B0;&#x601D;&#x8DEF;</h3><ul><li>( 1 ) &#x8BBE;&#x7F6E;&#x9501;&#x5C4F;&#x5BC6;&#x7801;</li><li>( 2 ) &#x5BC6;&#x7801;&#x5B58;localStorage &#xFF08;&#x672C;&#x9879;&#x76EE;&#x5DF2;&#x7ECF;&#x5C01;&#x88C5;h5&#x7684;sessionStorage&#x548C;localStorage&#xFF09;</li><li>( 3 ) vuex&#x8BBE;&#x7F6E; <code>SET_LOCK state.isLock = true</code> (&#x4E3A;true&#x662F;&#x9501;&#x5C4F;&#x72B6;&#x6001;)</li><li>( 4 ) &#x5728;&#x8DEF;&#x7531;&#x91CC;&#x9762;&#x5224;&#x65AD;vuex&#x91CC;&#x9762;&#x7684;isLock&#xFF08;&#x4E3A;true&#x9501;&#x5C4F;&#x72B6;&#x6001;&#x4E0D;&#x80FD;&#x8BA9;&#x7528;&#x6237;&#x540E;&#x9000;url&#x548C;&#x81EA;&#x884C;&#x4FEE;&#x6539;url&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#x5426;&#x5219;&#x53EF;&#x4EE5;&#xFF09;</li></ul><h4>&#xFF08;1&#xFF09;&#x8BBE;&#x7F6E;&#x9501;&#x5C4F;&#x5BC6;&#x7801;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  handleSetLock() {
      this.$refs[&apos;form&apos;].validate(valid =&gt; {
        if (valid) {
          this.$store.commit(&apos;SET_LOCK_PASSWD&apos;, this.form.passwd)
          this.handleLock()
        }
      })
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>  handleSetLock() {
      <span class="hljs-keyword">this</span>.$refs[<span class="hljs-string">&apos;form&apos;</span>].validate(valid =&gt; {
        <span class="hljs-keyword">if</span> (valid) {
          <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;SET_LOCK_PASSWD&apos;</span>, <span class="hljs-keyword">this</span>.form.passwd)
          <span class="hljs-keyword">this</span>.handleLock()
        }
      })
    },</code></pre><h4>&#xFF08; 2 ) &#x5BC6;&#x7801;&#x5B58;localStorage <code>setStore</code>&#x662F;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7684;&#x65B9;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  SET_LOCK_PASSWD: (state, lockPasswd) =&gt; {
      state.lockPasswd = lockPasswd
      setStore({
        name: &apos;lockPasswd&apos;,
        content: state.lockPasswd,
        type: &apos;session&apos;
      })
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>  SET_LOCK_PASSWD: (<span class="hljs-keyword">state</span>, lockPasswd) =&gt; {
      <span class="hljs-keyword">state</span>.lockPasswd = lockPasswd
      <span class="hljs-built_in">set</span>Store({
        name: &apos;lockPasswd&apos;,
        content: <span class="hljs-keyword">state</span>.lockPasswd,
        type: &apos;session&apos;
      })
    },</code></pre><h4>( 3 ) vuex&#x8BBE;&#x7F6E; <code>SET_LOCK state.isLock = true</code> &#x540C;&#x65F6;&#x5B58;&#x5728;store&#x91CC;&#x9762;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  SET_LOCK: (state, action) =&gt; {
      state.isLock = true
      setStore({
        name: &apos;isLock&apos;,
        content: state.isLock,
        type: &apos;session&apos;
      })
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>  SET_LOCK: (<span class="hljs-keyword">state</span>, action) =&gt; {
      <span class="hljs-keyword">state</span>.isLock = true
      <span class="hljs-built_in">set</span>Store({
        name: &apos;isLock&apos;,
        content: <span class="hljs-keyword">state</span>.isLock,
        type: &apos;session&apos;
      })
    },</code></pre><h4>( 4 ) &#x5728;&#x8DEF;&#x7531;&#x91CC;&#x9762;&#x5224;&#x65AD;vuex&#x91CC;&#x9762;&#x7684;isLock</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (store.getters.isLock &amp;&amp; to.path !== lockPage) {
      next({
        path: lockPage
      })
      NProgress.done()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code> <span class="hljs-keyword">if</span> (store<span class="hljs-selector-class">.getters</span><span class="hljs-selector-class">.isLock</span> &amp;&amp; to<span class="hljs-selector-class">.path</span> !== lockPage) {
      next({
        path: lockPage
      })
      NProgress.done()</code></pre><h4><a href="https://github.com/mgbq/nx-admin" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x5730;&#x5740;</a></h4><h2 id="articleHeader2">&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x4EA4;&#x6D41;&#x7FA4;493671066&#xFF0C;&#x7F8E;&#x5973;&#x591A;&#x591A;&#x3002;&#x8001;&#x53F8;&#x673A;&#x5FEB;&#x4E0A;&#x8F66;&#xFF0C;&#x6765;&#x4E0D;&#x53CA;&#x89E3;&#x91CA;&#x4E86;&#x3002;</h2><h4>&#x4F5C;&#x8005;&#x76F8;&#x5173;Vue&#x6587;&#x7AE0;</h4><p><a href="https://github.com/mgbq/vue-permission" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;Vue2.0&#x5B9E;&#x73B0;&#x540E;&#x53F0;&#x7CFB;&#x7EDF;&#x6743;&#x9650;&#x63A7;&#x5236;</a></p><p><a href="https://github.com/mgbq/front-end-Doc" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x6587;&#x6863;&#x6C47;&#x603B;</a></p><p><a href="https://github.com/mgbq/Vue-admin" rel="nofollow noreferrer" target="_blank">VUE2.0&#x589E;&#x5220;&#x6539;&#x67E5;&#x9644;&#x7F16;&#x8F91;&#x6DFB;&#x52A0;model(&#x5F39;&#x6846;)&#x7EC4;&#x4EF6;&#x5171;&#x7528;</a></p><h2 id="articleHeader3">&#x6253;&#x8D4F; &#x8877;&#x5FC3;&#x7684;&#x8868;&#x793A;&#x611F;&#x8C22;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000013472321?w=425&amp;h=425" src="https://static.alili.tech/img/remote/1460000013472321?w=425&amp;h=425" alt="&#x6253;&#x8D4F;" title="&#x6253;&#x8D4F;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue项目中添加锁屏功能

## 原文链接
[https://segmentfault.com/a/1190000015429733](https://segmentfault.com/a/1190000015429733)


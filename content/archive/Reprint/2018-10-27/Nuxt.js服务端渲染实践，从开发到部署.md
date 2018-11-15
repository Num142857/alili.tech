---
title: Nuxt.js服务端渲染实践，从开发到部署
hidden: true
categories: reprint
slug: ddfc0f74
date: 2018-10-27 02:30:17
---

{{< raw >}}
<h2 id="articleHeader0">&#x611F;&#x609F;</h2><p>&#x7ECF;&#x8FC7;&#x51E0;&#x4E2A;&#x5468;&#x516D;&#x5468;&#x65E5;&#x7684;&#x5C1D;&#x8BD5;&#xFF0C;&#x7EC8;&#x4E8E;&#x89E3;&#x51B3;&#x4E86;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x4E2D;&#x7684;&#x5E38;&#x89C1;&#x95EE;&#x9898;&#xFF0C;&#x5F53;SEO&#x4E0D;&#x5728;&#x662F;&#x95EE;&#x9898;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6216;&#x8BB8;&#x624D;&#x662F;&#x6211;&#x4EEC;&#x641E;&#x524D;&#x7AEF;&#x7684;&#x771F;&#x6B63;&#x7684;&#x6625;&#x5929;&#xFF0C;&#x5176;&#x4E2D;&#x4E5F;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x5C0F;&#x5751;&#xFF0C;Nuxt.js&#x5B98;&#x65B9;&#x8FD8;&#x662F;&#x5F88;&#x7ED9;&#x529B;&#x7684;&#xFF0C;&#x63D0;issue&#x540E;&#x5F88;&#x79EF;&#x6781;&#x7684;&#x7ED9;&#x4E88;&#x5E2E;&#x52A9;&#xFF0C;&#x518D;&#x6B21;&#x611F;&#x8C22;Nuxt.js&#x7684;&#x5F00;&#x53D1;&#x56E2;&#x961F;&#x3002;</p><p><a href="https://github.com/wmui/vueblog" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a><br><a href="https://www.86886.wang" rel="nofollow noreferrer" target="_blank">&#x6F14;&#x793A;&#x5730;&#x5740;</a></p><h2 id="articleHeader1">&#x8DEF;&#x7531;&#x9274;&#x6743;</h2><p>&#x7B2C;&#x4E00;&#x4E2A;&#x62E6;&#x8DEF;&#x864E;&#x5C31;&#x662F;&#x767B;&#x9646;&#x65F6;&#x5019;&#x7684;&#x9274;&#x6743;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x4F55;&#x628A;token&#x4FDD;&#x5B58;&#x5230;&#x672C;&#x5730;&#x3002;&#x5B98;&#x65B9;&#x4F7F;&#x7528;express-session&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x505A;&#x540E;&#x7AEF;&#x4E5F;&#x9700;&#x8981;&#x4F7F;&#x7528;nodejs,&#x800C;&#x6211;&#x4EEC;&#x516C;&#x53F8;&#x4F7F;&#x7528;&#x7684;PHP&#x3002;&#x8F6C;&#x5FF5;&#x4E00;&#x60F3;&#x6216;&#x8BB8;cookie&#x53EF;&#x4EE5;&#x4E00;&#x8BD5;&#xFF0C;&#x4E8E;&#x662F;&#x6211;&#x662F;&#x8FD9;&#x6837;&#x505A;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.post(&apos;/api/login&apos;, function (req, res) {
  // &#x540E;&#x53F0;&#x9A8C;&#x8BC1;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;token
  async function login () {
    const { data } = await axiosServer.post(&apos;/login&apos;, req.body)
    return data
  }

  login().then(function (data) {
    // &#x628A;token&#x5B58;&#x50A8;&#x5230;cookie&#x4E2D;
    const { token } = data
    if (token) {
      res.cookie(&apos;token&apos;, token, {
        maxAge: 60000 * 60 * 24
      })
    }
    // &#x539F;&#x5C01;&#x4E0D;&#x52A8;&#x8FD4;&#x56DE;
    return res.json(data)
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.post(<span class="hljs-string">&apos;/api/login&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-comment">// &#x540E;&#x53F0;&#x9A8C;&#x8BC1;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;token</span>
  <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">login</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> { data } = <span class="hljs-keyword">await</span> axiosServer.post(<span class="hljs-string">&apos;/login&apos;</span>, req.body)
    <span class="hljs-keyword">return</span> data
  }

  login().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// &#x628A;token&#x5B58;&#x50A8;&#x5230;cookie&#x4E2D;</span>
    <span class="hljs-keyword">const</span> { token } = data
    <span class="hljs-keyword">if</span> (token) {
      res.cookie(<span class="hljs-string">&apos;token&apos;</span>, token, {
        <span class="hljs-attr">maxAge</span>: <span class="hljs-number">60000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span>
      })
    }
    <span class="hljs-comment">// &#x539F;&#x5C01;&#x4E0D;&#x52A8;&#x8FD4;&#x56DE;</span>
    <span class="hljs-keyword">return</span> res.json(data)
  })
})</code></pre><p>&#x6211;&#x628A;&#x767B;&#x5F55;&#x8BF7;&#x6C42;&#x7528;nodejs&#x505A;&#x4E86;&#x4E00;&#x6B21;&#x8F6C;&#x53D1;&#xFF0C;&#x628A;&#x7528;&#x6237;&#x63D0;&#x4EA4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x7ED9;&#x540E;&#x7AEF;&#xFF0C;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;token&#x8BBE;&#x7F6E;&#x5230;cookie&#x91CC;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x6570;&#x636E;&#x8FD4;&#x4F1A;&#x7ED9;&#x524D;&#x7AEF;&#xFF0C;&#x524D;&#x7AEF;&#x518D;&#x7528;vuex&#x4FDD;&#x5B58;token&#x72B6;&#x6001;&#xFF0C;&#x8FD9;&#x6837;token&#x540C;&#x65F6;&#x5B58;&#x5728;&#x4E8E;cookie&#x548C;&#x5185;&#x5B58;&#x91CC;&#xFF0C;&#x5237;&#x65B0;&#x9875;&#x9762;&#x4E5F;&#x662F;&#x6B63;&#x5E38;&#x7684;<br>&#x524D;&#x7AEF;&#x5B58;&#x50A8;token:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async nuxtServerInit ({ dispatch, commit }, { req, res }) {
    if (req.cookies &amp;&amp; req.cookies.token) {
      // &#x5B58;&#x50A8;token
      commit(&apos;SET_USER&apos;, req.cookies.token)
    }
  },
  // SET_USER
  SET_USER (state, token) {
    state.token = token
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  async nuxtServerInit ({ dispatch, commit }, { req, res }) {
    <span class="hljs-keyword">if</span> (req<span class="hljs-selector-class">.cookies</span> &amp;&amp; req<span class="hljs-selector-class">.cookies</span><span class="hljs-selector-class">.token</span>) {
      <span class="hljs-comment">// &#x5B58;&#x50A8;token</span>
      commit(<span class="hljs-string">&apos;SET_USER&apos;</span>, req<span class="hljs-selector-class">.cookies</span><span class="hljs-selector-class">.token</span>)
    }
  },
  <span class="hljs-comment">// SET_USER</span>
  SET_USER (state, token) {
    state<span class="hljs-selector-class">.token</span> = token
  },</code></pre><p>&#x4E8E;&#x662F;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5C31;&#x8FD9;&#x6837;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;&#x6240;&#x6709;&#x9700;&#x8981;&#x5B58;&#x50A8;&#x5230;&#x672C;&#x5730;&#x7684;&#x6570;&#x636E;&#x90FD;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x505A;&#x6765;&#x89E3;&#x51B3;</p><h2 id="articleHeader2">&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x6570;&#x636E;</h2><p>&#x53E6;&#x4E00;&#x4E2A;&#x5C0F;&#x95EE;&#x9898;&#x662F;components&#x91CC;&#x6570;&#x636E;&#x5982;&#x4F55;&#x6E32;&#x67D3;&#x3002;&#x5728;Nuxt.js&#x4E2D;&#x53EA;&#x6709;page&#x91CC;&#x7684;&#x7EC4;&#x4EF6;&#x6709;<code>fetch</code>&#x548C;<code>asyncData</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;layout&#x5E03;&#x5C40;&#x9875;&#x9762;&#x65F6;&#x5982;&#x679C;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x5C31;&#x65E0;&#x6CD5;&#x6E32;&#x67D3;&#x4E86;&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x662F;&#x5728;<code>nuxtServerInit</code>&#x65B9;&#x6CD5;&#x91CC;&#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async nuxtServerInit ({ dispatch, commit }, { req, res }) {
    // &#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x6570;&#x636E;
    await dispatch(&apos;ADMIN_INFO&apos;)
    await dispatch(&apos;TAGS&apos;)
    await dispatch(&apos;ARCHIVES&apos;)
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>  <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">nuxtServerInit</span> (<span class="hljs-params">{ dispatch, commit }, { req, res }</span>) </span>{
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">await</span> dispatch(<span class="hljs-string">&apos;ADMIN_INFO&apos;</span>)
    <span class="hljs-keyword">await</span> dispatch(<span class="hljs-string">&apos;TAGS&apos;</span>)
    <span class="hljs-keyword">await</span> dispatch(<span class="hljs-string">&apos;ARCHIVES&apos;</span>)
  }</code></pre><p>&#x8FD9;&#x6837;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x53EF;&#x6E32;&#x67D3;&#x6210;&#x529F;&#x4E86;</p><h2 id="articleHeader3">&#x8FC7;&#x6EE4;&#x5668;&#x7684;&#x4F7F;&#x7528;</h2><p>Nuxt.js&#x7684;plugins&#x8BBE;&#x8BA1;&#x7684;&#x4E2A;&#x4EBA;&#x611F;&#x89C9;&#x8FD8;&#x662F;&#x5F88;&#x4EBA;&#x6027;&#x5316;&#x7684;&#xFF0C;&#x7528;&#x8D77;&#x6765;&#x7B80;&#x76F4;&#x662F;&#x4E0D;&#x80FD;&#x518D;&#x7B80;&#x5355;&#x3002;&#x5728;plugins&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;filters.js&#xFF0C;&#x8FC7;&#x6EE4;&#x5668;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x73A9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
// &#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x5316;
export function formatDate (date, fmt) {
  let newDate = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + &apos;&apos;).substr(4 - RegExp.$1.length))
  }
  let o = {
    &apos;M+&apos;: newDate.getMonth() + 1,
    &apos;d+&apos;: newDate.getDate(),
    &apos;h+&apos;: newDate.getHours(),
    &apos;m+&apos;: newDate.getMinutes(),
    &apos;s+&apos;: newDate.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + &apos;&apos;
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
let filters = {
  formatDate
}

Object.keys(filters).forEach(key =&gt; {
  Vue.filter(key, filters[key])
})
export default filters" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-comment">// &#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x5316;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span> (<span class="hljs-params">date, fmt</span>) </span>{
  <span class="hljs-keyword">let</span> newDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(date)
  <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/(y+)/</span>.test(fmt)) {
    fmt = fmt.replace(<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>, (newDate.getFullYear() + <span class="hljs-string">&apos;&apos;</span>).substr(<span class="hljs-number">4</span> - <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1.</span>length))
  }
  <span class="hljs-keyword">let</span> o = {
    <span class="hljs-string">&apos;M+&apos;</span>: newDate.getMonth() + <span class="hljs-number">1</span>,
    <span class="hljs-string">&apos;d+&apos;</span>: newDate.getDate(),
    <span class="hljs-string">&apos;h+&apos;</span>: newDate.getHours(),
    <span class="hljs-string">&apos;m+&apos;</span>: newDate.getMinutes(),
    <span class="hljs-string">&apos;s+&apos;</span>: newDate.getSeconds()
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> o) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">`(<span class="hljs-subst">${k}</span>)`</span>).test(fmt)) {
      <span class="hljs-keyword">let</span> str = o[k] + <span class="hljs-string">&apos;&apos;</span>
      fmt = fmt.replace(<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>, (<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1.</span>length === <span class="hljs-number">1</span>) ? str : padLeftZero(str))
    }
  }
  <span class="hljs-keyword">return</span> fmt
}
<span class="hljs-keyword">let</span> filters = {
  formatDate
}

<span class="hljs-built_in">Object</span>.keys(filters).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
  Vue.filter(key, filters[key])
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> filters</code></pre><p>&#x7136;&#x540E;&#x5728;nuxt.config.js&#x4E2D;&#x6CE8;&#x518C;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
    &apos;~plugins/filters.js&apos;
  ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">plugins</span>: [
    <span class="hljs-string">&apos;~plugins/filters.js&apos;</span>
  ]</code></pre><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;happy&#x7684;&#x7528;&#x8D77;&#x6765;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x5316; --&gt;
&lt;div&gt;
 &lt;span&gt;{{date | formatDate(&apos;yyyy-MM-dd&apos;)}}&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs twig"><code><span class="xml"><span class="hljs-comment">&lt;!-- &#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x5316; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"<span class="hljs-name">date</span> | formatDate(&apos;yyyy-MM-dd&apos;)"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><h2 id="articleHeader4">&#x4E2D;&#x95F4;&#x4EF6;</h2><p>&#x6BD4;&#x5982;&#x8BF4;&#x7528;&#x6237;&#x672A;&#x767B;&#x5F55;&#x72B6;&#x6001;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x95EF;&#x5165;&#x4E86;&#x9700;&#x8981;&#x9274;&#x6743;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// auth.js
export default function ({ store, error }) {
// &#x53EF;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x7684;props&#x63A5;&#x6536;error&#x4FE1;&#x606F;
  if (!store.state.token) {
    error({
      message: &apos;cookie&#x5931;&#x6548;&#x6216;&#x672A;&#x767B;&#x5F55;&#xFF0C;&#x8BF7;&#x767B;&#x5F55;&#x540E;&#x64CD;&#x4F5C;&apos;,
      statusCode: 403
    })
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// auth.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{ store, error }</span>) </span>{
<span class="hljs-comment">// &#x53EF;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x7684;props&#x63A5;&#x6536;error&#x4FE1;&#x606F;</span>
  <span class="hljs-keyword">if</span> (!store.state.token) {
    error({
      <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;cookie&#x5931;&#x6548;&#x6216;&#x672A;&#x767B;&#x5F55;&#xFF0C;&#x8BF7;&#x767B;&#x5F55;&#x540E;&#x64CD;&#x4F5C;&apos;</span>,
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">403</span>
    })
  }
}
</code></pre><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x8BE5;&#x4E2D;&#x95F4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  middleware: &apos;auth&apos;,
  // &#x8FD8;&#x53EF;&#x4EE5;&#x628A;&#x7528;&#x6237;&#x91CD;&#x5B9A;&#x4F4D;&#x5230;&#x767B;&#x5F55;&#x9875;
  fetch ({redirect, store}) {
    if (!store.state.token) {
      redirect(&apos;/login&apos;)
    }
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>export default {
  middleware: <span class="hljs-string">&apos;auth&apos;</span>,
  <span class="hljs-comment">// &#x8FD8;&#x53EF;&#x4EE5;&#x628A;&#x7528;&#x6237;&#x91CD;&#x5B9A;&#x4F4D;&#x5230;&#x767B;&#x5F55;&#x9875;</span>
  fetch ({redirect, store}) {
    <span class="hljs-keyword">if</span> (!store<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.token</span>) {
      redirect(<span class="hljs-string">&apos;/login&apos;</span>)
    }
  },
}</code></pre><h2 id="articleHeader5">&#x591A;&#x7EA7;&#x8DEF;&#x7531;&#x5D4C;&#x5957;</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7528;&#x7684;&#x8F83;&#x5C11;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x53D1;&#x73B0;&#x7528;&#x7684;&#x633A;&#x591A;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x4E0D;&#x540C;&#x5206;&#x7C7B;&#x53C8;&#x6709;&#x4E0D;&#x540C;&#x5206;&#x9875;&#xFF0C;&#x8FD9;&#x6837;&#x5206;&#x7C7B;&#x548C;&#x5206;&#x9875;&#x90FD;&#x8981;&#x662F;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#xFF0C;&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVZGXs?w=266&amp;h=291" src="https://static.alili.tech/img/bVZGXs?w=266&amp;h=291" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br>&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVZGXx?w=381&amp;h=292" src="https://static.alili.tech/img/bVZGXx?w=381&amp;h=292" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader6">&#x9879;&#x76EE;&#x90E8;&#x7F72;</h2><p>&#x5927;&#x6982;&#x5728;8&#x6708;&#x4EFD;&#x65F6;&#x5019;&#xFF0C;&#x5199;&#x4E86;&#x51E0;&#x7BC7;&#x5173;&#x4E8E;&#x5982;&#x4F55;<a href="https://segmentfault.com/a/1190000010098126">&#x90E8;&#x7F72;nodejs&#x9879;&#x76EE;</a>&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x56DE;&#x5934;&#x770B;&#x5199;&#x7684;&#x679C;&#x7136;&#x6BD4;&#x8F83;&#x83DC;&#xFF0C;&#x968F;&#x7740;&#x65F6;&#x95F4;&#x63A8;&#x79FB;&#xFF0C;&#x4FEE;&#x590D;&#x4E86;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#xFF0C;&#x53D1;&#x73B0;&#x4E86;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#xFF0C;&#x6574;&#x4F53;&#x5199;&#x7684;&#x592A;&#x4E71;&#x3002;&#x4E8E;&#x662F;&#x62BD;&#x4E86;&#x4E00;&#x5929;&#x65F6;&#x95F4;&#xFF0C;&#x5728;&#x65B0;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x4E00;&#x8FB9;&#x5B9E;&#x8DF5;&#x4E00;&#x8FB9;&#x8BB0;&#x5F55;&#xFF0C;&#x628A;&#x4E0A;&#x9762;&#x51E0;&#x7BC7;&#x6587;&#x7AE0;&#x7528;<a href="https://github.com/wmui/web-deploy" rel="nofollow noreferrer" target="_blank">gitbook</a>&#x6C47;&#x603B;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x4E0D;&#x5728;&#x8FD9;&#x91CC;&#x5C55;&#x5F00;&#x4E86;&#xFF0C;&#x592A;&#x957F;&#x4E86;&#xFF0C;&#x589E;&#x52A0;&#x4E86;&#x81EA;&#x52A8;&#x90E8;&#x7F72;&#x7684;&#x76F8;&#x5173;&#x5185;&#x5BB9;</p><h2 id="articleHeader7">&#x7ED3;&#x8BED;</h2><p>&#x4EE5;&#x4E0A;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x8DF5;&#x4EE3;&#x7801;&#x90FD;&#x5728;<a href="https://github.com/wmui/vueblog" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#xFF0C;&#x8FD9;&#x4E2A;&#x5C0F;&#x9879;&#x76EE;&#x662F;&#x6211;&#x5728;&#x51E0;&#x6708;&#x524D;&#x5199;&#x7684;&#xFF0C;&#x540E;&#x6765;&#x7528;Nuxt.js&#x8FDB;&#x884C;&#x4E86;&#x91CD;&#x6784;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nuxt.js服务端渲染实践，从开发到部署

## 原文链接
[https://segmentfault.com/a/1190000012280812](https://segmentfault.com/a/1190000012280812)


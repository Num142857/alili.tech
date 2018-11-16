---
title: 'Vue.js路由管理器 Vue Router' 
date: 2018-11-17 2:30:13
hidden: true
slug: n176o2j265q
categories: reprint
---

{{< raw >}}
<h1 id="articleHeader0">&#x8D77;&#x6B65;</h1><ul><li>HTML</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;&gt;&lt;/script&gt;

&lt;div id=&quot;app&quot;&gt;
  &lt;h1&gt;Hello App!&lt;/h1&gt;
  &lt;p&gt;
    &lt;!-- &#x4F7F;&#x7528; router-link &#x7EC4;&#x4EF6;&#x6765;&#x5BFC;&#x822A;. --&gt;
    &lt;!-- &#x901A;&#x8FC7;&#x4F20;&#x5165; `to` &#x5C5E;&#x6027;&#x6307;&#x5B9A;&#x94FE;&#x63A5;. --&gt;
    &lt;!-- &lt;router-link&gt; &#x9ED8;&#x8BA4;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E00;&#x4E2A; `&lt;a&gt;` &#x6807;&#x7B7E; --&gt;
    &lt;router-link to=&quot;/foo&quot;&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link to=&quot;/bar&quot;&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
  &lt;!-- &#x8DEF;&#x7531;&#x51FA;&#x53E3; --&gt;
  &lt;!-- &#x8DEF;&#x7531;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x6E32;&#x67D3;&#x5728;&#x8FD9;&#x91CC; n&#x5185;&#x7F6E;&#x7EC4;&#x4EF6;--&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/vue/dist/vue.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello App!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x4F7F;&#x7528; router-link &#x7EC4;&#x4EF6;&#x6765;&#x5BFC;&#x822A;. --&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x901A;&#x8FC7;&#x4F20;&#x5165; `to` &#x5C5E;&#x6027;&#x6307;&#x5B9A;&#x94FE;&#x63A5;. --&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;router-link&gt; &#x9ED8;&#x8BA4;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E00;&#x4E2A; `&lt;a&gt;` &#x6807;&#x7B7E; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/foo&quot;</span>&gt;</span>Go to Foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/bar&quot;</span>&gt;</span>Go to Bar<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- &#x8DEF;&#x7531;&#x51FA;&#x53E3; --&gt;</span>
  <span class="hljs-comment">&lt;!-- &#x8DEF;&#x7531;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x6E32;&#x67D3;&#x5728;&#x8FD9;&#x91CC; n&#x5185;&#x7F6E;&#x7EC4;&#x4EF6;--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><ul><li>JavaScript</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 0. &#x5982;&#x679C;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x5316;&#x673A;&#x5236;&#x7F16;&#x7A0B;&#xFF0C;&#x5BFC;&#x5165;Vue&#x548C;VueRouter&#xFF0C;&#x8981;&#x8C03;&#x7528; Vue.use(VueRouter)

// 1. &#x5B9A;&#x4E49; (&#x8DEF;&#x7531;) &#x7EC4;&#x4EF6;&#x3002;
// &#x53EF;&#x4EE5;&#x4ECE;&#x5176;&#x4ED6;&#x6587;&#x4EF6; import &#x8FDB;&#x6765;
const Foo = { template: &apos;&lt;div&gt;foo&lt;/div&gt;&apos; }
const Bar = { template: &apos;&lt;div&gt;bar&lt;/div&gt;&apos; }

// 2. &#x5B9A;&#x4E49;&#x8DEF;&#x7531;
// &#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x5E94;&#x8BE5;&#x6620;&#x5C04;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002; &#x5176;&#x4E2D;&quot;component&quot; &#x53EF;&#x4EE5;&#x662F;
// &#x901A;&#x8FC7; Vue.extend() &#x521B;&#x5EFA;&#x7684;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;&#xFF0C;
// &#x6216;&#x8005;&#xFF0C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x3002;
// &#x6211;&#x4EEC;&#x665A;&#x70B9;&#x518D;&#x8BA8;&#x8BBA;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#x3002;
const routes = [
  { path: &apos;/foo&apos;, component: Foo },
  { path: &apos;/bar&apos;, component: Bar }
]

// 3. &#x521B;&#x5EFA; router &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x4F20; `routes` &#x914D;&#x7F6E;
// &#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x522B;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;, &#x4E0D;&#x8FC7;&#x5148;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7740;&#x5427;&#x3002;
const router = new VueRouter({
  routes // (&#x7F29;&#x5199;) &#x76F8;&#x5F53;&#x4E8E; routes: routes
})

// 4. &#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;
// &#x8BB0;&#x5F97;&#x8981;&#x901A;&#x8FC7; router &#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#xFF0C;
// &#x4ECE;&#x800C;&#x8BA9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x90FD;&#x6709;&#x8DEF;&#x7531;&#x529F;&#x80FD;
const app = new Vue({
  router
}).$mount(&apos;#app&apos;)

// &#x73B0;&#x5728;&#xFF0C;&#x5E94;&#x7528;&#x5DF2;&#x7ECF;&#x542F;&#x52A8;&#x4E86;&#xFF01;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-comment">// 0. &#x5982;&#x679C;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x5316;&#x673A;&#x5236;&#x7F16;&#x7A0B;&#xFF0C;&#x5BFC;&#x5165;Vue&#x548C;VueRouter&#xFF0C;&#x8981;&#x8C03;&#x7528; Vue.use(VueRouter)</span>

<span class="hljs-comment">// 1. &#x5B9A;&#x4E49; (&#x8DEF;&#x7531;) &#x7EC4;&#x4EF6;&#x3002;</span>
<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x4ECE;&#x5176;&#x4ED6;&#x6587;&#x4EF6; import &#x8FDB;&#x6765;</span>
<span class="hljs-keyword">const</span> Foo = { <span class="hljs-keyword">template</span>: <span class="hljs-string">&apos;&lt;div&gt;foo&lt;/div&gt;&apos;</span> }
<span class="hljs-keyword">const</span> Bar = { <span class="hljs-keyword">template</span>: <span class="hljs-string">&apos;&lt;div&gt;bar&lt;/div&gt;&apos;</span> }

<span class="hljs-comment">// 2. &#x5B9A;&#x4E49;&#x8DEF;&#x7531;</span>
<span class="hljs-comment">// &#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x5E94;&#x8BE5;&#x6620;&#x5C04;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002; &#x5176;&#x4E2D;&quot;component&quot; &#x53EF;&#x4EE5;&#x662F;</span>
<span class="hljs-comment">// &#x901A;&#x8FC7; Vue.extend() &#x521B;&#x5EFA;&#x7684;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;&#xFF0C;</span>
<span class="hljs-comment">// &#x6216;&#x8005;&#xFF0C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x3002;</span>
<span class="hljs-comment">// &#x6211;&#x4EEC;&#x665A;&#x70B9;&#x518D;&#x8BA8;&#x8BBA;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#x3002;</span>
<span class="hljs-keyword">const</span> routes = [
  { path: <span class="hljs-string">&apos;/foo&apos;</span>, component: Foo },
  { path: <span class="hljs-string">&apos;/bar&apos;</span>, component: Bar }
]

<span class="hljs-comment">// 3. &#x521B;&#x5EFA; router &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x4F20; `routes` &#x914D;&#x7F6E;</span>
<span class="hljs-comment">// &#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x522B;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;, &#x4E0D;&#x8FC7;&#x5148;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7740;&#x5427;&#x3002;</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes <span class="hljs-comment">// (&#x7F29;&#x5199;) &#x76F8;&#x5F53;&#x4E8E; routes: routes</span>
})

<span class="hljs-comment">// 4. &#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;</span>
<span class="hljs-comment">// &#x8BB0;&#x5F97;&#x8981;&#x901A;&#x8FC7; router &#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#xFF0C;</span>
<span class="hljs-comment">// &#x4ECE;&#x800C;&#x8BA9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x90FD;&#x6709;&#x8DEF;&#x7531;&#x529F;&#x80FD;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  router
}).$mount(<span class="hljs-string">&apos;#app&apos;</span>)

<span class="hljs-comment">// &#x73B0;&#x5728;&#xFF0C;&#x5E94;&#x7528;&#x5DF2;&#x7ECF;&#x542F;&#x52A8;&#x4E86;&#xFF01;</span></code></pre><p>&#x901A;&#x8FC7;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#x5668;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x5185;&#x901A;&#x8FC7; this.$router &#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x5668;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; this.$route &#x8BBF;&#x95EE;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  computed: {
    username () {
      // &#x6211;&#x4EEC;&#x5F88;&#x5FEB;&#x5C31;&#x4F1A;&#x770B;&#x5230; `params` &#x662F;&#x4EC0;&#x4E48;
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length &gt; 1
        ? this.$router.go(-1)
        : this.$router.push(&apos;/&apos;)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {
  computed: {
    username () {
      <span class="hljs-comment">// &#x6211;&#x4EEC;&#x5F88;&#x5FEB;&#x5C31;&#x4F1A;&#x770B;&#x5230; `params` &#x662F;&#x4EC0;&#x4E48;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length &gt; <span class="hljs-number">1</span>
        ? <span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">-1</span>)
        : <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">&apos;/&apos;</span>)
    }
  }
}</code></pre><h1 id="articleHeader1">routes &#x9009;&#x9879; (Array)</h1><h2 id="articleHeader2">redirect&#xFF08;&#x91CD;&#x5B9A;&#x5411; &#xFF09;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6B64;&#x65F6;&#x8BBF;&#x95EE;/a&#x4F1A;&#x8DF3;&#x8F6C;&#x5230;/b
const router = new VueRouter({
  routes: [
    { path: &apos;/a&apos;, redirect: &apos;/b&apos; }
  ]
})
//&#x91CD;&#x5B9A;&#x5411;&#x7684;&#x76EE;&#x6807;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x547D;&#x540D;&#x7684;&#x8DEF;&#x7531;&#xFF1A;
const router = new VueRouter({
  routes: [
    { path: &apos;/a&apos;, redirect: { name: &apos;foo&apos; "}}"
  ]
})
//&#x751A;&#x81F3;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x52A8;&#x6001;&#x8FD4;&#x56DE;&#x91CD;&#x5B9A;&#x5411;&#x76EE;&#x6807;&#xFF1A;
const router = new VueRouter({
  routes: [
    { path: &apos;/a&apos;, redirect: to =&gt; {
      // &#x65B9;&#x6CD5;&#x63A5;&#x6536; &#x76EE;&#x6807;&#x8DEF;&#x7531; &#x4F5C;&#x4E3A;&#x53C2;&#x6570;
      // return &#x91CD;&#x5B9A;&#x5411;&#x7684; &#x5B57;&#x7B26;&#x4E32;&#x8DEF;&#x5F84;/&#x8DEF;&#x5F84;&#x5BF9;&#x8C61;
    "}}"
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">//&#x6B64;&#x65F6;&#x8BBF;&#x95EE;/a&#x4F1A;&#x8DF3;&#x8F6C;&#x5230;/b</span>
const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/a&apos;</span>, <span class="hljs-string">redirect:</span> <span class="hljs-string">&apos;/b&apos;</span> }
  ]
})
<span class="hljs-comment">//&#x91CD;&#x5B9A;&#x5411;&#x7684;&#x76EE;&#x6807;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x547D;&#x540D;&#x7684;&#x8DEF;&#x7531;&#xFF1A;</span>
const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/a&apos;</span>, <span class="hljs-string">redirect:</span> { <span class="hljs-string">name:</span> <span class="hljs-string">&apos;foo&apos;</span> "}}"
  ]
})
<span class="hljs-comment">//&#x751A;&#x81F3;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x52A8;&#x6001;&#x8FD4;&#x56DE;&#x91CD;&#x5B9A;&#x5411;&#x76EE;&#x6807;&#xFF1A;</span>
const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/a&apos;</span>, <span class="hljs-string">redirect:</span> to =&gt; {
      <span class="hljs-comment">// &#x65B9;&#x6CD5;&#x63A5;&#x6536; &#x76EE;&#x6807;&#x8DEF;&#x7531; &#x4F5C;&#x4E3A;&#x53C2;&#x6570;</span>
      <span class="hljs-comment">// return &#x91CD;&#x5B9A;&#x5411;&#x7684; &#x5B57;&#x7B26;&#x4E32;&#x8DEF;&#x5F84;/&#x8DEF;&#x5F84;&#x5BF9;&#x8C61;</span>
    "}}"
  ]
})</code></pre><h2 id="articleHeader3">&#x547D;&#x540D;&#x8DEF;&#x7531;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [
    {
        path:&apos;/&apos;,
        redirect:&apos;/app&apos; //&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
    },
    {
        path: &apos;/app&apos;,
        //&#x8DEF;&#x7531;&#x547D;&#x540D;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x8DF3;&#x8F6C;
        name: &apos;app&apos;,
    }
]

//&#x53EF;&#x7528;&#x4E8E;&#x8DF3;&#x8F6C;
&lt;router-link :to=&quot;{name:&apos;app&apos;}&quot;&gt;app&lt;/router-link&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>export <span class="hljs-keyword">default</span> [
    {
        path:<span class="hljs-string">&apos;/&apos;</span>,
        redirect:<span class="hljs-string">&apos;/app&apos;</span> <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;</span>
    },
    {
        path: <span class="hljs-string">&apos;/app&apos;</span>,
        <span class="hljs-comment">//&#x8DEF;&#x7531;&#x547D;&#x540D;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x8DF3;&#x8F6C;</span>
        <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;app&apos;</span>,
    }
]

<span class="hljs-comment">//&#x53EF;&#x7528;&#x4E8E;&#x8DF3;&#x8F6C;</span>
&lt;router-link :<span class="hljs-keyword">to</span>=<span class="hljs-string">&quot;{name:&apos;app&apos;}&quot;</span>&gt;app&lt;/router-link&gt;
</code></pre><h2 id="articleHeader4">&#x8DEF;&#x7531;&#x5143;&#x4FE1;&#x606F;</h2><p>&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x914D;&#x7F6E; meta &#x5B57;&#x6BB5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [
    {
        path:&apos;/&apos;,
        redirect:&apos;/app&apos; //&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
    },
    {
        path: &apos;/app&apos;,
        //**&#x76F8;&#x5F53;&#x4E8E;HTML&#x7684;meta&#x6807;&#x7B7E;**
        meta: {
            title: &apos;this is app&apos;,
            description: &apos;asdasd&apos;
        },
    }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>export default [
    {
        <span class="hljs-built_in">path</span>:<span class="hljs-string">&apos;/&apos;</span>,
        redirect:<span class="hljs-string">&apos;/app&apos;</span> <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;</span>
    },
    {
        <span class="hljs-built_in">path</span>: <span class="hljs-string">&apos;/app&apos;</span>,
        <span class="hljs-comment">//**&#x76F8;&#x5F53;&#x4E8E;HTML&#x7684;meta&#x6807;&#x7B7E;**</span>
        meta: {
            <span class="hljs-built_in">title</span>: <span class="hljs-string">&apos;this is app&apos;</span>,
            description: <span class="hljs-string">&apos;asdasd&apos;</span>
        },
    }
]</code></pre><h2 id="articleHeader5">&#x5D4C;&#x5957;&#x8DEF;&#x7531;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [
    {
        path:&apos;/&apos;,
        redirect:&apos;/app&apos; //&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
    },
    {
        path: &apos;/app&apos;,
        //&#x5B50;&#x8DEF;&#x7531; &#x5339;&#x914D; /app/test
         children: [
           {
             path: &apos;test&apos;,
             component: Login
           }
         ]
    }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>export default [
    {
        <span class="hljs-built_in">path</span>:<span class="hljs-string">&apos;/&apos;</span>,
        redirect:<span class="hljs-string">&apos;/app&apos;</span> <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;</span>
    },
    {
        <span class="hljs-built_in">path</span>: <span class="hljs-string">&apos;/app&apos;</span>,
        <span class="hljs-comment">//&#x5B50;&#x8DEF;&#x7531; &#x5339;&#x914D; /app/test</span>
         children: [
           {
             <span class="hljs-built_in">path</span>: <span class="hljs-string">&apos;test&apos;</span>,
             component: Login
           }
         ]
    }
]</code></pre><h2 id="articleHeader6">&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x4F20;&#x53C2;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [
    {
        path:&apos;/&apos;,
        redirect:&apos;/app&apos; //&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
    },
    {
        path: &apos;/app/:id&apos;, // /app/xxx ,&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;$route.params.id&#x62FF;&#x5230;&#x8FD9;&#x4E2A;&#x503C;
        // &#x4F1A;&#x628A;&#xFF1A;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;&#x901A;&#x8FC7;props&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;Todozhong &#x4E2D;
        //&#x5E03;&#x5C14;&#x6A21;&#x5F0F;
        props: true,
        //&#x5BF9;&#x8C61;&#x6A21;&#x5F0F;
        props&#xFF1A;{id:456}
        //&#x51FD;&#x6570;&#x6A21;&#x5F0F;
        props: (route) =&gt; ({ id: route.query.b }),
        component: Todo,

    }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
    {
        <span class="hljs-attribute">path</span>:<span class="hljs-string">&apos;/&apos;</span>,
        <span class="hljs-attribute">redirect</span>:<span class="hljs-string">&apos;/app&apos;</span> <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;</span>
    },
    {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">&apos;/app/:id&apos;</span>, <span class="hljs-comment">// /app/xxx ,&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;$route.params.id&#x62FF;&#x5230;&#x8FD9;&#x4E2A;&#x503C;</span>
        <span class="hljs-comment">// &#x4F1A;&#x628A;&#xFF1A;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;&#x901A;&#x8FC7;props&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;Todozhong &#x4E2D;</span>
        <span class="hljs-comment">//&#x5E03;&#x5C14;&#x6A21;&#x5F0F;</span>
        <span class="hljs-attribute">props</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//&#x5BF9;&#x8C61;&#x6A21;&#x5F0F;</span>
        props&#xFF1A;{<span class="hljs-attribute">id:</span><span class="hljs-string">456}
        //&#x51FD;&#x6570;&#x6A21;&#x5F0F;
        props</span>: (route) =&gt; ({ <span class="hljs-attribute">id:</span><span class="hljs-string"> route.query.b</span> }),
        <span class="hljs-attribute">component</span>: Todo,

    }
]</code></pre><h1 id="articleHeader7">mode&#x9009;&#x9879;(string)</h1><p>vue-router &#x9ED8;&#x8BA4; hash &#x6A21;&#x5F0F; &#x2014;&#x2014; &#x4F7F;&#x7528; URL &#x7684; hash &#x6765;&#x6A21;&#x62DF;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684; URL&#xFF0C;&#x4E8E;&#x662F;&#x5F53; URL &#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x4E0D;&#x4F1A;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x5982;&#x679C;&#x4E0D;&#x60F3;&#x8981;&#x5F88;&#x4E11;&#x7684; hash&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;&#x8DEF;&#x7531;&#x7684; history &#x6A21;&#x5F0F;&#xFF0C;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x5145;&#x5206;&#x5229;&#x7528; history.pushState API &#x6765;&#x5B8C;&#x6210; URL &#x8DF3;&#x8F6C;&#x800C;&#x65E0;&#x987B;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  mode: &apos;history&apos;,
  routes: [...]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-keyword">mode</span>: <span class="hljs-string">&apos;history&apos;</span>,
  route<span class="hljs-variable">s:</span> [...]
})</code></pre><p>&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x8981;&#x73A9;&#x597D;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x540E;&#x53F0;&#x914D;&#x7F6E;&#x652F;&#x6301;&#x3002;</p><h1 id="articleHeader8">base(string)</h1><p>&#x5E94;&#x7528;&#x7684;&#x57FA;&#x8DEF;&#x5F84;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x6574;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528;&#x670D;&#x52A1;&#x5728; /app/ &#x4E0B;&#xFF0C;&#x7136;&#x540E; base &#x5C31;&#x5E94;&#x8BE5;&#x8BBE;&#x4E3A; &quot;/app/&quot;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return new Router({
    routes,
    mode: &apos;history&apos;,//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#
    base: &apos;/base/&apos;, //&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router({
    routes,
    mode: <span class="hljs-string">&apos;history&apos;</span>,<span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#</span>
    <span class="hljs-keyword">base</span>: <span class="hljs-string">&apos;/base/&apos;</span>, <span class="hljs-comment">//&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;</span>
  })</code></pre><h1 id="articleHeader9">linkActiveClass(string)</h1><p>&#x9ED8;&#x8BA4;&#x503C;: &quot;router-link-active&quot;</p><p>&#x5168;&#x5C40;&#x914D;&#x7F6E; &lt;router-link&gt; &#x7684;&#x9ED8;&#x8BA4;&#x201C;&#x6FC0;&#x6D3B; class &#x7C7B;&#x540D;&#x201D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return new Router({
    routes,
    mode: &apos;history&apos;,//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#
    base: &apos;/base/&apos;, //&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;
    // &#x70B9;&#x51FB;calss&#x540D;&#x5B57;
    linkActiveClass: &apos;active-link&apos;, //&#x5339;&#x914D;&#x5230;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5B50;&#x96C6;
    linkExactActiveClass: &apos;exact-active-link&apos;,//&#x5B8C;&#x5168;&#x5339;&#x914D;
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router({
    routes,
    mode: <span class="hljs-string">&apos;history&apos;</span>,<span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#</span>
    <span class="hljs-keyword">base</span>: <span class="hljs-string">&apos;/base/&apos;</span>, <span class="hljs-comment">//&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;</span>
    <span class="hljs-comment">// &#x70B9;&#x51FB;calss&#x540D;&#x5B57;</span>
    linkActiveClass: <span class="hljs-string">&apos;active-link&apos;</span>, <span class="hljs-comment">//&#x5339;&#x914D;&#x5230;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5B50;&#x96C6;</span>
    linkExactActiveClass: <span class="hljs-string">&apos;exact-active-link&apos;</span>,<span class="hljs-comment">//&#x5B8C;&#x5168;&#x5339;&#x914D;</span>
  })</code></pre><h1 id="articleHeader10">linkExactActiveClass(string)</h1><p>&#x9ED8;&#x8BA4;&#x503C;: &quot;router-link-exact-active&quot;</p><p>&#x5168;&#x5C40;&#x914D;&#x7F6E; &lt;router-link&gt; &#x7CBE;&#x786E;&#x6FC0;&#x6D3B;&#x7684;&#x9ED8;&#x8BA4;&#x7684; class&#x3002;</p><h1 id="articleHeader11">scrollBehavior(Function)</h1><p>&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x540E;&#x662F;&#x5426;&#x6EDA;&#x52A8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default () =&gt; {
  return new Router({
    routes,
    mode: &apos;history&apos;,//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#
    base: &apos;/base/&apos;, //&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;
    //&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x662F;&#x5426;&#x9700;&#x8981;&#x6EDA;&#x52A8;
    /*
        to:&#x53BB;&#x5411;&#x8DEF;&#x7531;,&#x5B8C;&#x6574;&#x8DEF;&#x7531;&#x5BF9;&#x8C61;
        from:&#x6765;&#x6E90;&#x8DEF;&#x7531;
        savedPosition:&#x4FDD;&#x5B58;&#x7684;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;
    */
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-function">export <span class="hljs-title">default</span> (<span class="hljs-params"></span>) </span>=&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router({
    routes,
    mode: <span class="hljs-string">&apos;history&apos;</span>,<span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#</span>
    <span class="hljs-keyword">base</span>: <span class="hljs-string">&apos;/base/&apos;</span>, <span class="hljs-comment">//&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;</span>
    <span class="hljs-comment">//&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x662F;&#x5426;&#x9700;&#x8981;&#x6EDA;&#x52A8;</span>
    <span class="hljs-comment">/*
        to:&#x53BB;&#x5411;&#x8DEF;&#x7531;,&#x5B8C;&#x6574;&#x8DEF;&#x7531;&#x5BF9;&#x8C61;
        from:&#x6765;&#x6E90;&#x8DEF;&#x7531;
        savedPosition:&#x4FDD;&#x5B58;&#x7684;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;
    */</span>
    scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
      <span class="hljs-keyword">if</span> (savedPosition) {
        <span class="hljs-keyword">return</span> savedPosition
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
      }
    },
  })
}</code></pre><h1 id="articleHeader12">parseQuery / stringifyQuery (Function)</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/&#x6BCF;&#x6B21;import&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;router&#xFF0C;&#x907F;&#x514D;&#x6BCF;&#x6B21;&#x90FD;&#x662F;&#x540C;&#x4E00;&#x4E2A;router
export default () =&gt; {
  return new Router({
    routes,
    mode: &apos;history&apos;,//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#
    base: &apos;/base/&apos;, //&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;
    // &#x8DEF;&#x7531;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;?a=2&amp;b=3,string-&gt;object
     parseQuery (query) {

     },
      //object-&gt;string
    stringifyQuery (obj) {

     }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>/&#x6BCF;&#x6B21;<span class="hljs-keyword">import</span>&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;router&#xFF0C;&#x907F;&#x514D;&#x6BCF;&#x6B21;&#x90FD;&#x662F;&#x540C;&#x4E00;&#x4E2A;router
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router({
    routes,
    mode: <span class="hljs-string">&apos;history&apos;</span>,<span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;hash#</span>
    base: <span class="hljs-string">&apos;/base/&apos;</span>, <span class="hljs-comment">//&#x5728;path&#x524D;&#x9762;&#x90FD;&#x4F1A;&#x52A0;&#x4E0A;/base/,&#x57FA;&#x8DEF;&#x5F84;</span>
    <span class="hljs-comment">// &#x8DEF;&#x7531;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;?a=2&amp;b=3,string-&gt;object</span>
     parseQuery (query) {

     },
      <span class="hljs-comment">//object-&gt;string</span>
    stringifyQuery (obj) {

     }
  })
}</code></pre><h1 id="articleHeader13">fallback(boolean)</h1><p>&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301; history.pushState &#x63A7;&#x5236;&#x8DEF;&#x7531;&#x662F;&#x5426;&#x5E94;&#x8BE5;&#x56DE;&#x9000;&#x5230; hash &#x6A21;&#x5F0F;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A; true&#x3002;<br>&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;false,&#x5219;&#x8DF3;&#x8F6C;&#x540E;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x591A;&#x9875;&#x5E94;&#x7528;</p><h1 id="articleHeader14">&lt;router-link&gt;</h1><h2 id="articleHeader15">&#x8FC7;&#x6E21;&#x52A8;&#x6548;</h2><p>&lt;router-view&gt; &#x662F;&#x57FA;&#x672C;&#x7684;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; &lt;transition&gt; &#x7EC4;&#x4EF6;&#x7ED9;&#x5B83;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x8FC7;&#x6E21;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/transition&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs apache"><code><span class="hljs-section">&lt;transition&gt;</span>
  <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
<span class="hljs-section">&lt;/transition&gt;</span></code></pre><h1 id="articleHeader16">&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;</h1><h2 id="articleHeader17">&#x547D;&#x540D;&#x89C6;&#x56FE;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;router-view class=&quot;view one&quot;&gt;&lt;/router-view&gt;
&lt;router-view class=&quot;view two&quot; name=&quot;a&quot;&gt;&lt;/router-view&gt;
&lt;router-view class=&quot;view three&quot; name=&quot;b&quot;&gt;&lt;/router-view&gt;

const router = new VueRouter({
  routes: [
    {
      path: &apos;/&apos;,
      components: {
      //&#x9ED8;&#x8BA4;&#x7EC4;&#x4EF6;
        default: Foo,
        //&#x547D;&#x540D;&#x7EC4;&#x4EF6;
        a: Bar,
        b: Baz
      }
    }
  ]
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>&lt;router-<span class="hljs-keyword">view</span> class=<span class="hljs-string">&quot;view one&quot;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;router-<span class="hljs-keyword">view</span> class=<span class="hljs-string">&quot;view two&quot;</span> name=<span class="hljs-string">&quot;a&quot;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;router-<span class="hljs-keyword">view</span> class=<span class="hljs-string">&quot;view three&quot;</span> name=<span class="hljs-string">&quot;b&quot;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;

const router = <span class="hljs-keyword">new</span> VueRouter({
  route<span class="hljs-variable">s:</span> [
    {
      path: <span class="hljs-string">&apos;/&apos;</span>,
      component<span class="hljs-variable">s:</span> {
      //&#x9ED8;&#x8BA4;&#x7EC4;&#x4EF6;
        defaul<span class="hljs-variable">t:</span> Foo,
        //&#x547D;&#x540D;&#x7EC4;&#x4EF6;
        <span class="hljs-variable">a:</span> Bar,
        <span class="hljs-variable">b:</span> Baz
      }
    }
  ]
})
</code></pre><h2 id="articleHeader18">&#x5BFC;&#x822A;&#x5B88;&#x536B;</h2><ul><li>&#x5168;&#x5C40;&#x5B88;&#x536B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import VueRouter from &apos;vue-router&apos;

import App from &apos;./app.vue&apos;

import &apos;./assets/styles/global.styl&apos;
// const root = document.createElement(&apos;div&apos;)
// document.body.appendChild(root)
import createRouter from &apos;./config/router&apos;
Vue.use(VueRouter)

const router = createRouter()

// &#x5168;&#x5C40;&#x5BFC;&#x822A;&#x5B88;&#x536B;&#xFF08;&#x94A9;&#x5B50;&#xFF09;

// &#x9A8C;&#x8BC1;&#x4E00;&#x4E9B;&#x7528;&#x6237;&#x662F;&#x5426;&#x767B;&#x5F55;
router.beforeEach((to, from, next) =&gt; {
    console.log(&apos;before each invoked&apos;)
    next()
//   if (to.fullPath === &apos;/app&apos;) {
//     next({ path: &apos;/login&apos; })
//     console.log(&apos;to.fullPath :&apos;+to.fullPath )

//   } else {
//     next()
//   }
})

router.beforeResolve((to, from, next) =&gt; {
    console.log(&apos;before resolve invoked&apos;)
    next()
})

// &#x6BCF;&#x6B21;&#x8DF3;&#x8F6C;&#x540E;&#x89E6;&#x53D1;
router.afterEach((to, from) =&gt; {
    console.log(&apos;after each invoked&apos;)
})

new Vue({
    router,
    render: (h) =&gt; h(App)
}).$mount(&quot;#root&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.vue&apos;</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./assets/styles/global.styl&apos;</span>
<span class="hljs-regexp">//</span> const root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
<span class="hljs-regexp">//</span> <span class="hljs-built_in">document</span>.body.appendChild(root)
<span class="hljs-keyword">import</span> createRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./config/router&apos;</span>
Vue.use(VueRouter)

const router = createRouter()

<span class="hljs-regexp">//</span> &#x5168;&#x5C40;&#x5BFC;&#x822A;&#x5B88;&#x536B;&#xFF08;&#x94A9;&#x5B50;&#xFF09;

<span class="hljs-regexp">//</span> &#x9A8C;&#x8BC1;&#x4E00;&#x4E9B;&#x7528;&#x6237;&#x662F;&#x5426;&#x767B;&#x5F55;
router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, next)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before each invoked&apos;</span>)
    next()
<span class="hljs-regexp">//</span>   <span class="hljs-keyword">if</span> (to.fullPath === <span class="hljs-string">&apos;/app&apos;</span>) {
<span class="hljs-regexp">//</span>     next({ path: <span class="hljs-string">&apos;/login&apos;</span> })
<span class="hljs-regexp">//</span>     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;to.fullPath :&apos;</span>+to.fullPath )

<span class="hljs-regexp">//</span>   } <span class="hljs-keyword">else</span> {
<span class="hljs-regexp">//</span>     next()
<span class="hljs-regexp">//</span>   }
})

router.beforeResolve(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, next)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before resolve invoked&apos;</span>)
    next()
})

<span class="hljs-regexp">//</span> &#x6BCF;&#x6B21;&#x8DF3;&#x8F6C;&#x540E;&#x89E6;&#x53D1;
router.afterEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;after each invoked&apos;</span>)
})

<span class="hljs-keyword">new</span> Vue({
    router,
    render: <span class="hljs-function"><span class="hljs-params">(h)</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">&quot;#root&quot;</span>)</code></pre><ul><li>&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x7684;&#x5B88;&#x536B;</li></ul><p>&#x53EF;&#x4EE5;&#x5728;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x4E0A;&#x76F4;&#x63A5;&#x5B9A;&#x4E49; beforeEnter &#x5B88;&#x536B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [
    {
        path:&apos;/&apos;,
        redirect:&apos;/app&apos; //&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
    },
    {
  
        path: &apos;/app&apos;,
        // &#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x7684;&#x5B88;&#x536B;&#x94A9;&#x5B50;
        beforeEnter(to, from, next) {
            console.log(&apos;app route before enter&apos;)
            next()
        }
        component: Todo,
    }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>export <span class="hljs-keyword">default</span> [
    {
        path:<span class="hljs-string">&apos;/&apos;</span>,
        redirect:<span class="hljs-string">&apos;/app&apos;</span> <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;</span>
    },
    {
  
        path: <span class="hljs-string">&apos;/app&apos;</span>,
        <span class="hljs-comment">// &#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x7684;&#x5B88;&#x536B;&#x94A9;&#x5B50;</span>
        beforeEnter(to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) {
            console.log(<span class="hljs-string">&apos;app route before enter&apos;</span>)
            <span class="hljs-keyword">next</span>()
        }
        component: Todo,
    }
]</code></pre><ul><li>&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x5B88;&#x536B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  //&#x8FDB;&#x6765;&#x4E4B;&#x524D;
  beforeRouteEnter(to, from, next) {
    // &#x4E0D;&#xFF01;&#x80FD;&#xFF01;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`
    // &#x56E0;&#x4E3A;&#x5F53;&#x5B88;&#x536B;&#x6267;&#x884C;&#x524D;&#xFF0C;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x8FD8;&#x6CA1;&#x88AB;&#x521B;&#x5EFA;
    console.log(&quot;todo before enter&quot;, this); //todo before enter undefined
    //&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F20;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x7ED9; next&#x6765;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x3002;&#x5728;&#x5BFC;&#x822A;&#x88AB;&#x786E;&#x8BA4;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x56DE;&#x8C03;&#xFF0C;&#x5E76;&#x4E14;&#x628A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x3002;
    next(vm =&gt; {
        // &#x901A;&#x8FC7; `vm` &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;
      console.log(&quot;after enter vm.id is &quot;, vm.id);
    });
  },
  //&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;
  beforeRouteUpdate(to, from, next) {
    console.log(&quot;todo update enter&quot;);
    next();
  },
  // &#x8DEF;&#x7531;&#x79BB;&#x5F00;
  beforeRouteLeave(to, from, next) {
    console.log(&quot;todo leave enter&quot;);
    const answer = window.confirm(&apos;Do you really want to leave? you have unsaved changes!&apos;)
      if (answer) {
        next()
      } else {
        //&#x4EE5;&#x901A;&#x8FC7; next(false) &#x6765;&#x53D6;&#x6D88;&#x3002;
        next(false)
      }
  },
  props:[&apos;id&apos;],
  components: {
    Item,
    Tabs
  },
  mounted() {
    console.log(this.id)
  },
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//&#x8FDB;&#x6765;&#x4E4B;&#x524D;</span>
  beforeRouteEnter(to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-comment">// &#x4E0D;&#xFF01;&#x80FD;&#xFF01;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`</span>
    <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x5F53;&#x5B88;&#x536B;&#x6267;&#x884C;&#x524D;&#xFF0C;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x8FD8;&#x6CA1;&#x88AB;&#x521B;&#x5EFA;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;todo before enter&quot;</span>, <span class="hljs-keyword">this</span>); <span class="hljs-comment">//todo before enter undefined</span>
    <span class="hljs-comment">//&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F20;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x7ED9; next&#x6765;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x3002;&#x5728;&#x5BFC;&#x822A;&#x88AB;&#x786E;&#x8BA4;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x56DE;&#x8C03;&#xFF0C;&#x5E76;&#x4E14;&#x628A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x3002;</span>
    next(<span class="hljs-function"><span class="hljs-params">vm</span> =&gt;</span> {
        <span class="hljs-comment">// &#x901A;&#x8FC7; `vm` &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;after enter vm.id is &quot;</span>, vm.id);
    });
  },
  <span class="hljs-comment">//&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;</span>
  beforeRouteUpdate(to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;todo update enter&quot;</span>);
    next();
  },
  <span class="hljs-comment">// &#x8DEF;&#x7531;&#x79BB;&#x5F00;</span>
  beforeRouteLeave(to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;todo leave enter&quot;</span>);
    <span class="hljs-keyword">const</span> answer = <span class="hljs-built_in">window</span>.confirm(<span class="hljs-string">&apos;Do you really want to leave? you have unsaved changes!&apos;</span>)
      <span class="hljs-keyword">if</span> (answer) {
        next()
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//&#x4EE5;&#x901A;&#x8FC7; next(false) &#x6765;&#x53D6;&#x6D88;&#x3002;</span>
        next(<span class="hljs-literal">false</span>)
      }
  },
  <span class="hljs-attr">props</span>:[<span class="hljs-string">&apos;id&apos;</span>],
  <span class="hljs-attr">components</span>: {
    Item,
    Tabs
  },
  mounted() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id)
  },
};</code></pre><h2 id="articleHeader19">&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;</h2><p>&#x53C2;&#x8003;:<a href="https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97" rel="nofollow noreferrer" target="_blank">&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js路由管理器 Vue Router

## 原文链接
[https://segmentfault.com/a/1190000015976735](https://segmentfault.com/a/1190000015976735)


---
title: 'Vue 生命周期浅析' 
date: 2018-11-29 9:33:05
hidden: true
slug: 749ldyvhv6b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue &#x751F;&#x547D;&#x5468;&#x671F;</h1>
<p>&#x4E0B;&#x9762;&#x662F; <code>index.html</code> &#x7684;&#x6A21;&#x677F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h2 id="articleHeader1">Vue &#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x7684;&#x8C03;&#x7528;&#x987A;&#x5E8F; / &#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x5728;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B;&#x88AB;&#x89E6;&#x53D1;</h2>
<p>&#x6211;&#x4EEC;&#x5728; <code>new</code> &#x4E00;&#x4E2A; Vue &#x5B9E;&#x4F8B;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x4F1A;&#x4EE5;&#x4E00;&#x5B9A;&#x7684;&#x987A;&#x5E8F;&#x76F8;&#x7EE7;&#x6267;&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x89C2;&#x5BDF;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x3002;</p>
<p><strong><em>&#x6CE8;&#x610F;&#xFF1A;</em></strong>&#x8BE5; Vue &#x5B9E;&#x4F8B;&#x5E76;&#x672A;&#x8BBE;&#x7F6E; <code>el</code> &#x5C5E;&#x6027;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        message: 0
    },
    template: &apos;&lt;div&gt;"{{" message "}}"&lt;/div&gt;&apos;,
    beforeCreate() {
        console.log(this.$el, &apos;beforeCreate&apos;);
    },
    created() {
        console.log(this.$el, &apos;created&apos;);
    },
    beforeMount() {
        console.log(this.$el, &apos;beforeMount&apos;);
    },
    mounted() {
        console.log(this.$el, &apos;mounted&apos;);
    },
    beforeUpdate() {
        console.log(this.$el, &apos;beforeUpdate&apos;);
    },
    updated() {
        console.log(this.$el, &apos;updated&apos;);
    },
    activated() {
        console.log(this.$el, &apos;activated&apos;);
    },
    deactivated() {
        console.log(this.$el, &apos;deactivated&apos;);
    },
    beforeDestroy() {
        console.log(this.$el, &apos;beforeDestroy&apos;);
    },
    destroyed() {
        console.log(this.$el, &apos;destroyed&apos;);
    },
    errorCaptured() {
        console.log(this.$el, &apos;errorCaptured&apos;);
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;"{{" message "}}"&lt;/div&gt;&apos;</span>,
    beforeCreate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;beforeCreate&apos;</span>);
    },
    created() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;created&apos;</span>);
    },
    beforeMount() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;beforeMount&apos;</span>);
    },
    mounted() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;mounted&apos;</span>);
    },
    beforeUpdate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;beforeUpdate&apos;</span>);
    },
    updated() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;updated&apos;</span>);
    },
    activated() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;activated&apos;</span>);
    },
    deactivated() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;deactivated&apos;</span>);
    },
    beforeDestroy() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;beforeDestroy&apos;</span>);
    },
    destroyed() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;destroyed&apos;</span>);
    },
    errorCaptured() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el, <span class="hljs-string">&apos;errorCaptured&apos;</span>);
    }
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbg1d?w=167&amp;h=44" src="https://static.alili.tech/img/bVbbg1d?w=167&amp;h=44" alt="&#x5B9E;&#x4F8B;&#x5316; Vue &#x65F6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF08;&#x672A;&#x8BBE;&#x7F6E; el &#x5C5E;&#x6027;&#xFF09;" title="&#x5B9E;&#x4F8B;&#x5316; Vue &#x65F6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF08;&#x672A;&#x8BBE;&#x7F6E; el &#x5C5E;&#x6027;&#xFF09;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230; <code>beforeCreate()</code>&#x3001;<code>created()</code> &#x4E24;&#x4E2A;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x88AB;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x5E76;&#x6CA1;&#x6709;&#x88AB;&#x89E6;&#x53D1;&#x6267;&#x884C;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x52A0;&#x4E0A; <code>el</code> &#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x8C03;&#x7528; <code>vm.$mount()</code>&#x65B9;&#x6CD5;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &apos;#app&apos;, // &#x8BBE;&#x7F6E; el &#x5C5E;&#x6027;
    // ...
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E; el &#x5C5E;&#x6027;</span>
    <span class="hljs-comment">// ...</span>
});</code></pre>
<p>&#x6216;&#x8005;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    // ...
});

app.$mount(&apos;#root&apos;); // &#x8C03;&#x7528; Vue &#x5B9E;&#x4F8B;&#x7684; $mount() &#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// ...</span>
});

app.$mount(<span class="hljs-string">&apos;#root&apos;</span>); <span class="hljs-comment">// &#x8C03;&#x7528; Vue &#x5B9E;&#x4F8B;&#x7684; $mount() &#x65B9;&#x6CD5;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbg1f?w=250&amp;h=84" src="https://static.alili.tech/img/bVbbg1f?w=250&amp;h=84" alt="&#x5B9E;&#x4F8B;&#x5316; Vue &#x65F6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;" title="&#x5B9E;&#x4F8B;&#x5316; Vue &#x65F6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x53EF;&#x4EE5;&#x770B;&#x5230; <code>beforeCreate()</code>&#x3001;<code>created()</code>&#x3001;<code>beforeMount()</code> &#x548C; <code>mounted()</code> &#x56DB;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x88AB;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#x3002;</p>
<p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;&#x5728; <code>new</code> &#x4E00;&#x4E2A; Vue &#x5B9E;&#x4F8B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E; <code>el</code> &#x5C5E;&#x6027;&#x6216;&#x8005;&#x8C03;&#x7528; Vue &#x5B9E;&#x4F8B;&#x7684; <code>$mount()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x53EA;&#x4F1A;&#x6267;&#x884C; <code>beforeCreate()</code> &#x548C; <code>created()</code> &#x65B9;&#x6CD5;&#x3002;&#x539F;&#x56E0;&#x5728;&#x4E8E;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x7684; <code>mountd()</code> &#x65B9;&#x6CD5;&#x5176;&#x5B9E;&#x662F;&#x628A; Vue &#x5B9E;&#x4F8B;&#x4E2D;&#x7684; <code>template</code>&#x5C5E;&#x6027;&#x91CC;&#x7684; <code>html</code> &#x6302;&#x8F7D;&#x5230; <code>el</code> &#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7684; <code>dom</code> &#x8282;&#x70B9;&#x4E0A;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5B9A;&#x4E49; <code>el</code> &#x5C5E;&#x6027;&#x6216;&#x8005;&#x6CA1;&#x6709;&#x8C03;&#x7528; Vue &#x5B9E;&#x4F8B;&#x7684; <code>$mount()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x65E0;&#x6CD5;&#x6267;&#x884C;&#x6302;&#x8F7D;&#x7684;&#x52A8;&#x4F5C;&#xFF0C;&#x56E0;&#x4E3A;&#x6839;&#x672C;&#x4E0D;&#x77E5;&#x9053;&#x8981;&#x6302;&#x8F7D;&#x5230;&#x54EA;&#x513F;&#x53BB;&#x3002; </p>
<p><code>beforeCreate()</code>&#x3001;<code>created()</code>&#x3001;<code>beforeMount()</code> &#x548C; <code>mounted()</code> &#x56DB;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x4E00;&#x6B21;&#x6027;&#x5730;&#xFF0C;&#x5728; Vue &#x5B9E;&#x4F8B;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x5B83;&#x4EEC;&#x53EA;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x3002;&#x5E76;&#x4E14;&#xFF0C;<code>beforeMount()</code> &#x548C; <code>mounted()</code> &#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x4E0E; <code>dom</code> &#x7684;&#x64CD;&#x4F5C;&#x6709;&#x4E00;&#x5B9A;&#x5173;&#x7CFB;&#xFF0C;&#x800C;&#x670D;&#x52A1;&#x7AEF;&#x4E2D;&#x6CA1;&#x6709; <code>dom</code> &#x6267;&#x884C;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x5C31;&#x4E0D;&#x4F1A;&#x6709;<code>beforeMount()</code> &#x548C; <code>mounted()</code> &#x4E86;&#x3002;</p>
<p>&#x540C;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230; <code>vm.$el</code> &#x5728;&#x5404;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x540C;&#x7684;&#xFF0C;&#x5728; <code>beforeCreate()</code> &#x548C; <code>created()</code> &#x4E2D;&#x662F; <code>undefined</code>&#xFF0C;&#x5728; <code>beforeMount()</code> &#x4E2D;&#x53D8;&#x6210;&#x4E86; <code>index.html</code> &#x91CC;&#x7684; <code>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</code>&#xFF0C;&#x7B49;&#x5230;&#x6267;&#x884C; <code>mounted()</code> &#x65B9;&#x6CD5;&#x65F6;&#x5219;&#x53C8;&#x53D8;&#x6210;&#x4E86;&#x6E32;&#x67D3;&#x4E4B;&#x540E; <code>&lt;div&gt;0&lt;/div&gt;</code>&#x3002;&#x5728; <code>mounted()</code> &#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x8C03;&#x7528;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x65B9;&#x6CD5;&#x62FF;&#x5230;&#x7684; <code>vm.$el</code> &#x90FD;&#x662F;&#x8DDF; <code>mounted()</code> &#x65B9;&#x6CD5;&#x4E2D;&#x4E00;&#x6837;&#x7684;&#x3002;</p>
<p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x65E0;&#x6CD5;&#x5728; <code>beforeCreate()</code> &#x548C; <code>created()</code> &#x8FD9;&#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x5BF9; <code>dom</code> &#x505A;&#x64CD;&#x4F5C;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x6839;&#x672C;&#x5C31;&#x62FF;&#x4E0D;&#x5230; Vue &#x5B9E;&#x4F8B;&#x5BF9;&#x5E94;&#x7684;&#x90A3;&#x4E2A; <code>dom</code> &#x8282;&#x70B9;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x662F;&#x4F1A;&#x5728; <code>mounted()</code> &#x4E2D;&#x505A;&#x4E00;&#x4E9B;&#x4E0E; <code>dom</code> &#x6709;&#x5173;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p>
<p>&#x5269;&#x4E0B;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x4E3A;&#x4EC0;&#x4E48;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x5462;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#x5C06;&#x4ECB;&#x7ECD;&#x4ED6;&#x4EEC;&#x3002;</p>
<h3 id="articleHeader2">beforeUpdate() &#x548C; updated()</h3>
<p>&#x8FD9;&#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x53EA;&#x6709;&#x5728;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x89E6;&#x53D1;&#x6267;&#x884C;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() =&gt; {
    app.message += 1;
}, 1000);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    app.message += <span class="hljs-number">1</span>;
}, <span class="hljs-number">1000</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbg1g?w=245&amp;h=124" src="https://static.alili.tech/img/bVbbg1g?w=245&amp;h=124" alt="&#x6570;&#x636E;&#x66F4;&#x65B0;&#x65F6;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;" title="&#x6570;&#x636E;&#x66F4;&#x65B0;&#x65F6;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">activated() &#x548C; deactivated()</h3>
<p>TODO...</p>
<h3 id="articleHeader4">beforeDestroy() &#x548C; destroyed()</h3>
<p>&#x8FD9;&#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x4F1A;&#x5728; Vue &#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x6267;&#x884C;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() =&gt; {
    app.$destroy(); // &#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x9500;&#x6BC1; Vue &#x5B9E;&#x4F8B;
}, 2000);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    app.$destroy(); <span class="hljs-comment">// &#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x9500;&#x6BC1; Vue &#x5B9E;&#x4F8B;</span>
}, <span class="hljs-number">2000</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbg1i?w=243&amp;h=165" src="https://static.alili.tech/img/bVbbg1i?w=243&amp;h=165" alt="&#x9500;&#x6BC1; Vue &#x5B9E;&#x4F8B;&#x65F6;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;" title="&#x9500;&#x6BC1; Vue &#x5B9E;&#x4F8B;&#x65F6;&#x751F;&#x547D;&#x5468;&#x671F;&#x6267;&#x884C;&#x7ED3;&#x679C;" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">renderError()</h3>
<p>&#x8BE5;&#x65B9;&#x6CD5;&#x53EA;&#x6709;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#x624D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5728;&#x6B63;&#x5F0F;&#x6253;&#x5305;&#x4E0A;&#x7EBF;&#x65F6;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5B83;&#x7684;&#x76EE;&#x7684;&#x662F;&#x5E2E;&#x6211;&#x4EEC;&#x66F4;&#x5BB9;&#x6613;&#x5730;&#x8C03;&#x8BD5;&#x4E00;&#x4E9B; <code>render()</code> &#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    // ...
    render(h) {
        throw new TypeError(&apos;render error&apos;);
    },
    renderError(h, err) {
        return h(&apos;div&apos;, {}, err.stack);
    }    
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// ...</span>
    render(h) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;render error&apos;</span>);
    },
    renderError(h, err) {
        <span class="hljs-keyword">return</span> h(<span class="hljs-string">&apos;div&apos;</span>, {}, err.stack);
    }    
});</code></pre>
<p><code>renderError()</code> &#x65B9;&#x6CD5;&#x4F1A;&#x5728; <code>render()</code> &#x65B9;&#x6CD5;&#x62A5;&#x9519;&#x7684;&#x65F6;&#x5019;&#x88AB;&#x89E6;&#x53D1;&#x6267;&#x884C;&#xFF0C;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x5185;&#x5BB9;&#x5C31;&#x662F;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x53EA;&#x6709;&#x5728;&#x5F53;&#x524D; Vue &#x5B9E;&#x4F8B;&#x7684; <code>render()</code> &#x65B9;&#x6CD5;&#x4E2D;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x62A5;&#x9519;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;&#x5F53;&#x524D; Vue &#x5B9E;&#x4F8B;&#x6355;&#x83B7;&#x5230;&#x7684;&#x3002;</p>
<h3 id="articleHeader6">errorCaptured()</h3>
<p>&#x8BE5;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7528;&#x5230;&#x6B63;&#x5F0F;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x6536;&#x96C6;&#x4E00;&#x4E9B;&#x7EBF;&#x4E0A;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x5E76;&#x4E14;&#x5176;&#x53EF;&#x4EE5;&#x6355;&#x83B7;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x62A5;&#x9519;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    // ...
    errorCaptured(h, err) {
        // ...
    }    
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// ...</span>
    errorCaptured(h, err) {
        <span class="hljs-comment">// ...</span>
    }    
});</code></pre>
<h3 id="articleHeader7">&#x751F;&#x547D;&#x5468;&#x671F;&#x56FE;&#x793A;&#x89E3;&#x6790;</h3>
<p>&#x4E0B;&#x9762;&#x662F; Vue &#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x56FE;&#x793A;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C06;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x7684;&#x89E3;&#x6790;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bV4xju?w=1200&amp;h=3039" src="https://static.alili.tech/img/bV4xju?w=1200&amp;h=3039" alt="&#x751F;&#x547D;&#x5468;&#x671F;&#x56FE;&#x793A;" title="&#x751F;&#x547D;&#x5468;&#x671F;&#x56FE;&#x793A;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5728; <code>new</code> &#x4E00;&#x4E2A; Vue &#x5B9E;&#x4F8B;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x9996;&#x5148;&#x6267;&#x884C;&#x4E86; <code>init()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5728; <code>init()</code> &#x65B9;&#x6CD5;&#x7684; <code>Events &amp; LifeCycle</code> &#x4E4B;&#x540E; &#x6267;&#x884C; <code>beforeCreate()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5728; <code>init()</code> &#x65B9;&#x6CD5;&#x7684; <code>injections &amp; reactivity</code> &#x4E4B;&#x540E;&#x6267;&#x884C; <code>created</code> &#x65B9;&#x6CD5;&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5728;&#x6267;&#x884C; <code>beforeCreate()</code> &#x7684;&#x65F6;&#x5019;&#xFF0C;Vue &#x5B9E;&#x4F8B;&#x7684;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x662F;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x7684;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x8FD8;&#x6CA1;&#x6709;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E0D;&#x5728; <code>beforeCreate()</code> &#x4E2D;&#x53BB;&#x4FEE;&#x6539; <code>data</code> &#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x8981;&#x505A;&#x4E00;&#x4E9B; <code>ajax</code> &#x8BF7;&#x6C42;&#xFF0C;&#x7136;&#x540E;&#x7ED9; Vue &#x5B9E;&#x4F8B;&#x7684; <code>data</code> &#x8D4B;&#x65B0;&#x503C;&#xFF0C;&#x6700;&#x65E9;&#x4E5F;&#x8981;&#x653E;&#x5728; <code>created()</code> &#x4E2D;&#x6765;&#x505A;&#x3002;</p>
<p>&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x4F1A;&#x5224;&#x65AD;&#x662F;&#x5426;&#x8BBE;&#x7F6E;&#x4E86; <code>el</code> &#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x5219;&#x4F1A;&#x53BB;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709; <code>template</code> &#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#xFF0C;&#x5219;&#x4F1A;&#x7B49;&#x5230;&#x8C03;&#x7528;&#x4E86; <code>vm.$mount()</code> &#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x518D;&#x53BB;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709; <code>template</code> &#x5C5E;&#x6027;&#x3002;</p>
<p>&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86; <code>template</code> &#x5C5E;&#x6027;&#xFF0C;&#x4F1A;&#x5C06; <code>template</code> &#x89E3;&#x6790;&#x4E3A;&#x4E00;&#x4E2A; <code>render()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#xFF0C;&#x4F1A;&#x5C06; <code>el</code> &#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7684; <code>html</code> &#x89E3;&#x6790;&#x4E3A; <code>template</code>&#x3002;&#x8FD9;&#x4E00;&#x6B65;&#x53EF;&#x4EE5;&#x4E0D;&#x8BBE;&#x7F6E; <code>template</code> &#x5C5E;&#x6027;&#xFF0C;&#x901A;&#x8FC7;&#x624B;&#x52A8;&#x8C03;&#x7528; <code>render()</code> &#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    // ...
    render(h) {
        return h(&apos;div&apos;, {}, this.message);
    }    
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// ...</span>
    render(h) {
        <span class="hljs-keyword">return</span> h(<span class="hljs-string">&apos;div&apos;</span>, {}, <span class="hljs-keyword">this</span>.message);
    }    
});</code></pre>
<p><code>render()</code> &#x65B9;&#x6CD5;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x5165;&#x53C2;&#xFF0C;&#x8BE5;&#x5165;&#x53C2;&#x662F;&#x4E00;&#x4E2A;&#x521B;&#x5EFA;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;<code>render()</code> &#x65B9;&#x6CD5;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x3002;<code>render()</code> &#x65B9;&#x6CD5;&#x4F1A;&#x5728; <code>beforeMount()</code> &#x4E0E; <code>mounted()</code> &#x4E4B;&#x95F4;&#x6267;&#x884C;&#xFF0C;&#x521B;&#x5EFA; <code>vm.$el</code> &#x5C5E;&#x6027;&#x5E76;&#x4E14;&#x66FF;&#x6362;&#x6389; <code>el</code> &#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7684; <code>html</code> &#x8282;&#x70B9;&#xFF0C;&#x8FD9;&#x5C31;&#x89E3;&#x91CA;&#x4E86;&#x524D;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5728; <code>beforeMount()</code> &#x4E2D; <code>vm.$el</code> &#x4E3A; <code>index.html</code> &#x4E2D;&#x7684; <code>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</code>&#xFF0C;&#x5728; <code>mounted()</code> &#x4E2D; <code>vm.$el</code> &#x53D8;&#x6210;&#x4E86;&#x6E32;&#x67D3; <code>template</code> &#x540E;&#x7684; <code>&lt;div&gt;0&lt;/div&gt;</code>&#xFF0C;&#x8FD9;&#x4E2D;&#x95F4;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x4E86; <code>render()</code> &#x65B9;&#x6CD5;&#x3002;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x6765;&#x505A;&#xFF0C;&#x4E0E;&#x8BBE;&#x7F6E; <code>template</code> &#x5C5E;&#x6027;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;</p>
<p>&#x5728;&#x7528; <code>.vue</code> &#x6587;&#x4EF6;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x5728; Vue &#x5B9E;&#x4F8B;&#x4E2D;&#x8BBE;&#x7F6E; <code>template</code> &#x5C5E;&#x6027;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x5728; <code>.vue</code> &#x6587;&#x4EF6;&#x4E2D;&#x7F16;&#x5199;&#x4E86; <code>&lt;template&gt;&lt;/template&gt;</code> &#x6807;&#x7B7E;&#xFF0C;&#x518D;&#x7ECF;&#x8FC7; vue-loader &#x5904;&#x7406;&#xFF0C;&#x76F4;&#x63A5;&#x89E3;&#x6790;&#x4E3A; <code>render()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x5F0F;&#x6709;&#x4E00;&#x4E2A;&#x597D;&#x5904;&#x3002;&#x56E0;&#x4E3A;&#x89E3;&#x6790; Vue &#x5B9E;&#x4F8B;&#x4E2D;&#x7684; <code>template</code> &#x5C5E;&#x6027;&#x4E3A; <code>render()</code> &#x65B9;&#x6CD5;&#x662F;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x8017;&#x65F6;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x4F7F;&#x7528; vue-loader &#x6765;&#x5E2E;&#x6211;&#x4EEC;&#x5904;&#x7406;&#xFF0C;&#x4F1A;&#x4F7F;&#x5F97;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x6267;&#x884C; vue &#x4EE3;&#x7801;&#x7684;&#x6548;&#x7387;&#x66F4;&#x9AD8;&#x3002;</p>
<p>&#x5728; <code>mounted()</code> &#x6267;&#x884C;&#x4E4B;&#x540E;&#xFF0C;&#x8FD9;&#x4E2A; Vue &#x5B9E;&#x4F8B;&#x5176;&#x5B9E;&#x5C31;&#x5DF2;&#x7ECF;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#x4E86;&#x3002;&#x540E;&#x7EED;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x90FD;&#x662F;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x5916;&#x90E8;&#x7684;&#x89E6;&#x53D1;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x6709;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x65F6;&#x4F1A;&#x8C03;&#x7528; <code>beforeUpdate()</code> &#x548C; <code>updated()</code>&#xFF0C;Vue &#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1;&#x65F6;&#x4F1A;&#x8C03;&#x7528; <code>beforeDestroy()</code> &#x548C; <code>destroyed()</code>&#x3002;</p>
<p>&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A; Vue &#x5B9E;&#x4F8B;&#x4ECE;&#x65B0;&#x5EFA;&#x5230;&#x9500;&#x6BC1;&#x7684;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x3002;</p>
<p><strong><em>&#x4EE5;&#x4E0A;&#x662F;&#x6211;&#x5BF9; Vue &#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x4E00;&#x70B9;&#x89C1;&#x89E3;&#xFF0C;&#x82E5;&#x6709;&#x8BA4;&#x4E3A;&#x4E0D;&#x6B63;&#x786E;&#x6216;&#x4E0D;&#x59A5;&#x5F53;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x6B63;&#xFF01;</em></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 生命周期浅析

## 原文链接
[https://segmentfault.com/a/1190000015047168](https://segmentfault.com/a/1190000015047168)


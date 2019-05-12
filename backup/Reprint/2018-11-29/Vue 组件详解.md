---
title: 'Vue 组件详解' 
date: 2018-11-29 9:27:39
hidden: true
slug: q4wfin96srb
categories: [reprint]
---

{{< raw >}}

                    
<p><strong><em>&#x53C2;&#x8003;&#x4E66;&#x7C4D;&#xFF1A;&#x300A;Vue.js &#x5B9E;&#x6218;&#x300B;</em></strong></p>
<h1 id="articleHeader0">&#x7EC4;&#x4EF6;&#x4E0E;&#x590D;&#x7528;</h1>
<h2 id="articleHeader1">&#x4E3A;&#x4EC0;&#x4E48;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;</h2>
<p>Vue &#x7684;&#x7EC4;&#x4EF6;&#x5C31;&#x662F;&#x63D0;&#x9AD8;&#x590D;&#x7528;&#x6027;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x53EF;&#x590D;&#x7528;&#x3002;</p>
<h2 id="articleHeader2">&#x7EC4;&#x4EF6;&#x7528;&#x6CD5;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x6CE8;&#x518C;&#x540E;&#x624D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF0C;&#x6CE8;&#x518C;&#x6709;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x548C;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p>
<ol>
<li>
<p>&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x540E;&#xFF0C;&#x4EFB;&#x4F55; Vue &#x5B9E;&#x4F8B;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8981;&#x5728;&#x7236;&#x5B9E;&#x4F8B;&#x4E2D;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5728;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x524D;&#x6CE8;&#x518C;&#x3002;
Vue.component(&apos;my-component&apos;, {
    template: &apos;&lt;div&gt;my component&lt;/div&gt;&apos;
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// &#x8981;&#x5728;&#x7236;&#x5B9E;&#x4F8B;&#x4E2D;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5728;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x524D;&#x6CE8;&#x518C;&#x3002;</span>
Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;my component&lt;/div&gt;&apos;</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
</li>
<li>
<p>&#x5728; Vue &#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528; <code>components</code> &#x9009;&#x9879;&#x53EF;&#x4EE5;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x6CE8;&#x518C;&#x540E;&#x7684;&#x7EC4;&#x4EF6;&#x53EA;&#x6709;&#x5728;&#x8BE5;&#x5B9E;&#x4F8B;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x6709;&#x6548;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Child = {
    template: &apos;&lt;div&gt;my component&lt;/div&gt;&apos;
};

var app = new Vue({
    el: &apos;#app&apos;,
    components: {
        &apos;my-component&apos;: Child
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> Child = {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;my component&lt;/div&gt;&apos;</span>
};

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">components</span>: {
        <span class="hljs-string">&apos;my-component&apos;</span>: Child
    }
});</code></pre>
</li>
</ol>
<p>&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div&gt;my component&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>my component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>Vue &#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x6536;&#x5230; <code>HTML</code> &#x7684;&#x9650;&#x5236;&#xFF0C;&#x6BD4;&#x5982; <code>&lt;table&gt;</code> &#x5185;&#x89C4;&#x5B9A;&#x53EA;&#x5141;&#x8BB8;&#x662F; <code>&lt;tr&gt;</code>&#x3001;<code>&lt;td&gt;</code> &#x7B49;&#x8FD9;&#x4E9B;&#x8868;&#x683C;&#x5143;&#x7D20;&#xFF0C;&#x6240;&#x4EE5;&#x5728; <code>&lt;table&gt;</code> &#x5185;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x662F;&#x65E0;&#x6548;&#x7684;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7279;&#x6B8A;&#x7684;<br><code>is</code> &#x5C5E;&#x6027;&#x6765;&#x6302;&#x8F7D;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;table&gt;
        &lt;tbody is=&quot;my-component&quot;&gt;&lt;/tbody&gt;
    &lt;/table&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span> <span class="hljs-attr">is</span>=<span class="hljs-string">&quot;my-component&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    template: &apos;&lt;div&gt;my component&lt;/div&gt;&apos;
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;my component&lt;/div&gt;&apos;</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;table&gt;
        &lt;div&gt;my component&lt;/div&gt;
    &lt;/table&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>my component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; <code>data</code> &#x65F6;&#xFF0C;&#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x6570;&#x636E; return &#x51FA;&#x53BB;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    template: &apos;&lt;div&gt;my component&lt;/div&gt;&apos;,
    data() {
        return {
            message: &apos;message&apos;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;my component&lt;/div&gt;&apos;</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;message&apos;</span>
        }
    }
});</code></pre>
<h1 id="articleHeader3">&#x4F7F;&#x7528; <code>props</code> &#x4F20;&#x9012;&#x6570;&#x636E;</h1>
<h2 id="articleHeader4">&#x57FA;&#x672C;&#x7528;&#x6CD5;</h2>
<p>&#x7EC4;&#x4EF6;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x8981;&#x628A;&#x6A21;&#x677F;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x590D;&#x7528;&#xFF0C;&#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#x7EC4;&#x4EF6;&#x95F4;&#x8981;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#x3002;&#x901A;&#x5E38;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x5305;&#x542B;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x8981;&#x6B63;&#x5411;&#x5730;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x6216;&#x53C2;&#x6570;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x5230;&#x540E;&#x6839;&#x636E;&#x53C2;&#x6570;&#x7684;&#x4E0D;&#x540C;&#x6765;&#x6E32;&#x67D3;&#x4E0D;&#x540C;&#x7684;&#x5185;&#x5BB9;&#x6216;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x8FD9;&#x4E2A;&#x6B63;&#x5411;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x901A;&#x8FC7; <code>props</code> &#x6765;&#x5B9E;&#x73B0;&#x7684;&#x3002;</p>
<p><code>props</code> &#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;&#x4E0E;&#x7EC4;&#x4EF6; <code>data</code> &#x51FD;&#x6570;&#x5185;&#x7684;&#x6570;&#x636E;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5C31;&#x662F; <code>props</code> &#x7684;&#x6570;&#x636E;&#x6765;&#x81EA;&#x7236;&#x7EA7;&#xFF0C;&#x800C; <code>data</code> &#x7684;&#x6570;&#x636E;&#x662F;&#x7EC4;&#x4EF6;&#x81EA;&#x5DF1;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x4E24;&#x79CD;&#x6570;&#x636E;&#x90FD;&#x53EF;&#x4EE5;&#x5728;&#x6A21;&#x677F; <code>template</code> &#x3001;&#x8BA1;&#x7B97;&#x5C5E;&#x6027; <code>computed</code> &#x548C;&#x65B9;&#x6CD5; <code>methods</code> &#x4E2D;&#x4F7F;&#x7528;&#x3002; </p>
<p>&#x901A;&#x5E38;&#xFF0C;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x5199;&#x6B7B;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x6765;&#x81EA;&#x7236;&#x7EA7;&#x7684;&#x52A8;&#x6001;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6307;&#x4EE4; <code>v-bind</code> &#x6765;&#x52A8;&#x6001;&#x7ED1;&#x5B9A; <code>props</code> &#x7684;&#x503C;&#xFF0C;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x4E5F;&#x4F1A;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</p>
<p>&#x7531;&#x4E8E; <code>HTML</code> &#x7279;&#x6027;&#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5F53;&#x65F6;&#x7528; <code>DOM</code> &#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x9A7C;&#x5CF0;&#x547D;&#x540D;&#xFF08;camelCase&#xFF09;&#x7684; <code>props</code> &#x540D;&#x79F0;&#x8981;&#x8F6C;&#x4E3A;&#x77ED;&#x6A2A;&#x5206;&#x9694;&#x547D;&#x540D;&#xFF08;kebab-case&#xFF09;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;input type=&quot;text&quot; v-model=&quot;parentMessage&quot; /&gt;
    &lt;my-component :my-message=&quot;parentMessage&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;parentMessage&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">:my-message</span>=<span class="hljs-string">&quot;parentMessage&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    props: [&apos;myMessage&apos;],
    template: &apos;&lt;div&gt;"{{" myMessage"}}"&lt;/div&gt;&apos;
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        parentMessage: &apos;&apos;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;myMessage&apos;</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;"{{" myMessage"}}"&lt;/div&gt;&apos;</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">parentMessage</span>: <span class="hljs-string">&apos;&apos;</span>
    }
});</code></pre>
<p>&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div&gt;dataMes&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>dataMes<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x8FD9;&#x91CC;&#x7528; <code>v-model</code> &#x7ED1;&#x5B9A;&#x4E86;&#x7236;&#x7EA7;&#x7684;&#x6570;&#x636E; <code>parentMessage</code>&#xFF0C;&#x5F53;&#x901A;&#x8FC7;&#x8F93;&#x5165;&#x6846;&#x4EFB;&#x610F;&#x8F93;&#x5165;&#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x5230;&#x7684; <code>props</code> &#x4E5F;&#x4F1A;&#x5B9E;&#x65F6;&#x54CD;&#x5E94;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x3002;</p>
<h2 id="articleHeader5">&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</h2>
<p>Vue &#x901A;&#x8FC7; <code>props</code> &#x4F20;&#x9012;&#x6570;&#x636E;&#x662F;&#x5355;&#x5411;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x4F1A;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;&#x53CD;&#x8FC7;&#x6765;&#x4E0D;&#x884C;&#x3002;&#x4E4B;&#x6240;&#x4EE5;&#x8FD9;&#x6837;&#x8BBE;&#x8BA1;&#xFF0C;&#x662F;&#x5C3D;&#x53EF;&#x80FD;&#x5C06;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x89E3;&#x8026;&#xFF0C;&#x907F;&#x514D;&#x5B50;&#x7EC4;&#x4EF6;&#x65E0;&#x610F;&#x4E2D;&#x4FEE;&#x6539;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x3002;</p>
<p>&#x4E1A;&#x52A1;&#x4E2D;&#x4F1A;&#x7ECF;&#x5E38;&#x9047;&#x5230;&#x4E24;&#x79CD;&#x9700;&#x8981;&#x6539;&#x53D8; <code>prop</code> &#x7684;&#x60C5;&#x51B5;&#x3002;</p>
<ol>
<li>
<p>&#x4E00;&#x79CD;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x521D;&#x59CB;&#x503C;&#x8FDB;&#x6765;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x5C06;&#x5B83;&#x4F5C;&#x4E3A;&#x521D;&#x59CB;&#x503C;&#x4FDD;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x4F7F;&#x7528;&#x548C;&#x4FEE;&#x6539;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component :init-count=&quot;1&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">:init-count</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    props: [&apos;initCount&apos;],
    template: &apos;&lt;div&gt;"{{" count "}}"&lt;/div&gt;&apos;,
    data() {
        return {
            count: this.initCount
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;initCount&apos;</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;"{{" count "}}"&lt;/div&gt;&apos;</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.initCount
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x4E86;&#x6570;&#x636E; <code>count</code>&#xFF0C;&#x5B83;&#x5728;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x4F1A;&#x83B7;&#x53D6;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684; <code>initCount</code>&#xFF0C;&#x4E4B;&#x540E;&#x5C31;&#x4E0E;&#x4E4B;&#x65E0;&#x5173;&#x4E86;&#xFF0C;&#x53EA;&#x7528;&#x7EF4;&#x62A4; <code>count</code>&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x64CD;&#x4F5C; <code>initCount</code>&#x3002;</p>
</li>
<li>
<p>&#x53E6;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x5C31;&#x662F; <code>prop</code> &#x4F5C;&#x4E3A;&#x9700;&#x8981;&#x88AB;&#x8F6C;&#x53D8;&#x7684;&#x539F;&#x59CB;&#x503C;&#x4F20;&#x5165;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component :width=&quot;100&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;100&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    props: [&apos;width&apos;],
    template: &apos;&lt;div :style=&quot;style&quot;&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;&apos;,
    computed: {
        style() {
            return {
                width: this.width + &apos;px&apos;
            }
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;width&apos;</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div :style=&quot;style&quot;&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;&apos;</span>,
    <span class="hljs-attr">computed</span>: {
        style() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">width</span>: <span class="hljs-keyword">this</span>.width + <span class="hljs-string">&apos;px&apos;</span>
            }
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x56E0;&#x4E3A;&#x7528; <code>CSS</code> &#x4F20;&#x9012;&#x5BBD;&#x5EA6;&#x8981;&#x5E26;&#x5355;&#x4F4D;&#xFF08;px&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x6BCF;&#x6B21;&#x90FD;&#x5199;&#x592A;&#x9EBB;&#x70E6;&#x4E86;&#xFF0C;&#x800C;&#x4E14;&#x6570;&#x503C;&#x8BA1;&#x7B97;&#x4E00;&#x822C;&#x662F;&#x4E0D;&#x5E26;&#x5355;&#x4F4D;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x7EDF;&#x4E00;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p>
</li>
</ol>
<h2 id="articleHeader6">&#x6570;&#x636E;&#x9A8C;&#x8BC1;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    props: {
        propA: Number,
        propB: [String, Number],
        propC: {
            type: Boolean,
            default: true
        },
        propD: {
            type: Number,
            required: true
        },
        // &#x5982;&#x679C;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8FD4;&#x56DE;
        propE: {
            type: Array,
            default() {
                return [];
            }
        },
        propF: {
            validator(value) {
                return value &gt; 10;
            }
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">propA</span>: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">propB</span>: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
        <span class="hljs-attr">propC</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
            <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-attr">propD</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8FD4;&#x56DE;</span>
        propE: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
            <span class="hljs-keyword">default</span>() {
                <span class="hljs-keyword">return</span> [];
            }
        },
        <span class="hljs-attr">propF</span>: {
            validator(value) {
                <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">10</span>;
            }
        }
    }
});</code></pre>
<h1 id="articleHeader7">&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h1>
<p>&#x7EC4;&#x4EF6;&#x5173;&#x7CFB;&#x53EF;&#x5206;&#x4E3A;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x3001;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x548C;&#x8DE8;&#x7EA7;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x3002;</p>
<h2 id="articleHeader8">&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</h2>
<p>&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x5C31;&#x8981;&#x7528;&#x5230;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x3002;</p>
<p>&#x5B50;&#x7EC4;&#x4EF6;&#x7528; <code>$emit()</code> &#x6765;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x7528; <code>$on</code> &#x6765;&#x76D1;&#x542C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x4E8B;&#x4EF6;&#x3002;</p>
<p>&#x7236;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x4E0A;&#x4F7F;&#x7528; <code>v-on</code> &#x6765;&#x76D1;&#x542C;&#x5B50;&#x7EC4;&#x4EF6;&#x89E6;&#x53D1;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;&#x603B;&#x6570;&#xFF1A;"{{" total "}}"&lt;/p&gt;
    &lt;my-component
        @increase=&quot;handleGetTotal&quot;
        @reduce=&quot;handleGetTotal&quot;&gt;
    &lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x603B;&#x6570;&#xFF1A;"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>
        @<span class="hljs-attr">increase</span>=<span class="hljs-string">&quot;handleGetTotal&quot;</span>
        @<span class="hljs-attr">reduce</span>=<span class="hljs-string">&quot;handleGetTotal&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    template: `
        &lt;div&gt;
            &lt;button @click=&quot;handleIncrease&quot;&gt;+1&lt;/button&gt;
            &lt;button @click=&quot;handleReduce&quot;&gt;-1&lt;/button&gt;
        &lt;/div&gt;
    `,
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        handleIncrease() {
            this.counter++;
            this.$emit(&apos;increase&apos;, this.counter);
        },
        handleReduce() {
            this.counter--;
            this.$emit(&apos;reduce&apos;, this.counter);
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        total: 0
    },
    methods: {
        handleGetTotal(total) {
            this.total = total;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div&gt;
            &lt;button @click=&quot;handleIncrease&quot;&gt;+1&lt;/button&gt;
            &lt;button @click=&quot;handleReduce&quot;&gt;-1&lt;/button&gt;
        &lt;/div&gt;
    `</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        handleIncrease() {
            <span class="hljs-keyword">this</span>.counter++;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;increase&apos;</span>, <span class="hljs-keyword">this</span>.counter);
        },
        handleReduce() {
            <span class="hljs-keyword">this</span>.counter--;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;reduce&apos;</span>, <span class="hljs-keyword">this</span>.counter);
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">methods</span>: {
        handleGetTotal(total) {
            <span class="hljs-keyword">this</span>.total = total;
        }
    }
});</code></pre>
<p>&#x4E0A;&#x9762;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x5728;&#x6539;&#x53D8;&#x7EC4;&#x4EF6;&#x7684; <code>counter</code> &#x540E;&#xFF0C;&#x901A;&#x8FC7; <code>$emit()</code> &#x518D;&#x628A;&#x5B83;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#x3002;<code>$emit()</code> &#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;&#x662F;&#x8981;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x586B;&#x6216;&#x586B;&#x5199;&#x591A;&#x4E2A;&#x3002;</p>
<p>&#x9664;&#x4E86;&#x7528; <code>v-on</code> &#x5728;&#x7EC4;&#x4EF6;&#x4E0A;&#x76D1;&#x542C;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5916;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76D1;&#x542C; <code>DOM</code> &#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x7528; <code>.native</code> &#x4FEE;&#x9970;&#x7B26;&#x8868;&#x793A;&#x76D1;&#x542C;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#xFF0C;&#x76D1;&#x542C;&#x7684;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x6839;&#x5143;&#x7D20;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;my-component v-on:click.native=&quot;handleClick&quot;&gt;&lt;/my-component&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-on:click.native</span>=<span class="hljs-string">&quot;handleClick&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></code></pre>
<h2 id="articleHeader9">&#x4F7F;&#x7528; <code>v-model</code>
</h2>
<p>Vue &#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x4E0A;&#x4F7F;&#x7528; <code>v-model</code> &#x6307;&#x4EE4;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;&#x603B;&#x6570;&#xFF1A;"{{" total "}}"&lt;/p&gt;
    &lt;my-component v-model=&quot;total&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x603B;&#x6570;&#xFF1A;"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;total&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    template: &apos;&lt;button @click=&quot;handleIncrease&quot;&gt;+1&lt;/button&gt;&apos;,
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        handleClick() {
            this.counter++;
            this.$emit(&apos;input&apos;, this.counter);
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        total: 0
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;button @click=&quot;handleIncrease&quot;&gt;+1&lt;/button&gt;&apos;</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        handleClick() {
            <span class="hljs-keyword">this</span>.counter++;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;input&apos;</span>, <span class="hljs-keyword">this</span>.counter);
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
    }
});</code></pre>
<p>&#x5728;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x7236;&#x7EA7;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5728; <code>&lt;my-component&gt;</code> &#x4F7F;&#x7528; <code>@input=&quot;handler&quot;</code>&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x7528;&#x4E86; <code>v-model</code> &#x7ED1;&#x5B9A;&#x7684;&#x4E00;&#x4E2A;&#x6570;&#x636E; <code>total</code>&#x3002;&#x8FD9;&#x4E5F;&#x53EF;&#x4EE5;&#x79F0;&#x4F5C;&#x662F;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x53EF;&#x4EE5;&#x95F4;&#x63A5;&#x5730;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;&#x603B;&#x6570;&#xFF1A;"{{" total "}}"&lt;/p&gt;
    &lt;my-component @input=&quot;handleGetTotal&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x603B;&#x6570;&#xFF1A;"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> @<span class="hljs-attr">input</span>=<span class="hljs-string">&quot;handleGetTotal&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7701;&#x7565;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        total: 0
    },
    methods: {
        handleGetTotal() {
            this.total = total;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// &#x7701;&#x7565;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;</span>

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">methods</span>: {
        handleGetTotal() {
            <span class="hljs-keyword">this</span>.total = total;
        }
    }
});</code></pre>
<p><code>v-model</code> &#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x8868;&#x5355;&#x8F93;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;&#x603B;&#x6570;&#xFF1A;"{{" total "}}"&lt;/p&gt;
    &lt;my-component v-model=&quot;total&quot;&gt;&lt;/my-component&gt;
    &lt;button @click=&quot;handleReduce&quot;&gt;-1&lt;/button&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x603B;&#x6570;&#xFF1A;"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;total&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleReduce&quot;</span>&gt;</span>-1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    props: [&apos;value&apos;],
    template: &apos;&lt;input :value=&quot;value&quot; @input=&quot;updateValue&quot; /&gt;&apos;,
    methods: {
        updateValue(event) {
            this.$emit(&apos;input&apos;, event.target.value);
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        total: 0
    },
    methods: {
        handleReduce() {
            this.total--;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;value&apos;</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;input :value=&quot;value&quot; @input=&quot;updateValue&quot; /&gt;&apos;</span>,
    <span class="hljs-attr">methods</span>: {
        updateValue(event) {
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;input&apos;</span>, event.target.value);
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">methods</span>: {
        handleReduce() {
            <span class="hljs-keyword">this</span>.total--;
        }
    }
});</code></pre>
<p>&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x5177;&#x6709;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684; <code>v-model</code> &#x7EC4;&#x4EF6;&#x8981;&#x6EE1;&#x8DB3;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#xFF1A;</p>
<ol>
<li>&#x63A5;&#x6536;&#x4E00;&#x4E2A; <code>value</code> &#x5C5E;&#x6027;&#x3002;</li>
<li>&#x5728;&#x6709;&#x65B0;&#x7684; <code>value</code> &#x65F6;&#x89E6;&#x53D1; <code>input</code> &#x4E8B;&#x4EF6;&#x3002;</li>
</ol>
<h2 id="articleHeader10">&#x975E;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2>
<p>&#x975E;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E00;&#x822C;&#x6709;&#x4E24;&#x79CD;&#xFF0C;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x548C;&#x8DE8;&#x591A;&#x7EA7;&#x7EC4;&#x4EF6;&#x3002;</p>
<p>&#x5728; Vue &#x4E2D;&#xFF0C;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7A7A;&#x7684; Vue &#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x4E2D;&#x592E;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#xFF08;bus&#xFF09;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x4E2D;&#x4ECB;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    "{{" message "}}"
    &lt;component-a&gt;&lt;/component-a&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    "{{" message "}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">component-a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component-a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue();

Vue.component(&apos;component-a&apos;, {
    template: &apos;&lt;button @click=&quot;handleEvent&quot;&gt;&#x4F20;&#x9012;&#x4E8B;&#x4EF6;&lt;/button&gt;&apos;,
    methods: {
        handleEvent() {
            bus.$emit(&apos;on-message&apos;, &apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6; component-a &#x7684;&#x5185;&#x5BB9;&apos;);
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        message: &apos;&apos;
    },
    mounted() {
        var _this = this;
        
        // &#x5728;&#x5B9E;&#x4F8B;&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x76D1;&#x542C;&#x6765;&#x81EA; bus &#x5B9E;&#x4F8B;&#x7684;&#x4E8B;&#x4EF6;
        bus.$on(&apos;on-message&apos;, function(msg) {
            _this.message = msg;
        });
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue();

Vue.component(<span class="hljs-string">&apos;component-a&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;button @click=&quot;handleEvent&quot;&gt;&#x4F20;&#x9012;&#x4E8B;&#x4EF6;&lt;/button&gt;&apos;</span>,
    <span class="hljs-attr">methods</span>: {
        handleEvent() {
            bus.$emit(<span class="hljs-string">&apos;on-message&apos;</span>, <span class="hljs-string">&apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6; component-a &#x7684;&#x5185;&#x5BB9;&apos;</span>);
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&apos;</span>
    },
    mounted() {
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        
        <span class="hljs-comment">// &#x5728;&#x5B9E;&#x4F8B;&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x76D1;&#x542C;&#x6765;&#x81EA; bus &#x5B9E;&#x4F8B;&#x7684;&#x4E8B;&#x4EF6;</span>
        bus.$on(<span class="hljs-string">&apos;on-message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
            _this.message = msg;
        });
    }
});</code></pre>
<p>&#x9996;&#x5148;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; <code>bus</code> &#x7684;&#x7A7A; Vue &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x7EC4;&#x4EF6; <code>component-a</code>&#xFF0C;&#x6700;&#x540E;&#x521B;&#x5EFA; Vue &#x5B9E;&#x4F8B; <code>app</code>&#x3002;&#x5728; <code>app</code> &#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x76D1;&#x542C;&#x4E86;&#x6765;&#x81EA; <code>bus</code> &#x7684;&#x4E8B;&#x4EF6; <code>on-message</code>&#xFF0C;&#x800C;&#x5728;&#x7EC4;&#x4EF6; <code>component-a</code> &#x4E2D;&#xFF0C;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x4F1A;&#x901A;&#x8FC7; <code>bus</code> &#x628A;&#x4E8B;&#x4EF6; <code>on-message</code> &#x53D1;&#x51FA;&#x53BB;&#xFF0C;&#x6B64;&#x65F6; <code>app</code> &#x5C31;&#x4F1A;&#x63A5;&#x6536;&#x5230;&#x6765;&#x81EA; <code>bus</code> &#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FDB;&#x800C;&#x5728;&#x56DE;&#x8C03;&#x91CC;&#x5B8C;&#x6210;&#x81EA;&#x5DF1;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x3002; </p>
<p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x5DE7;&#x5999;&#x800C;&#x8F7B;&#x91CF;&#x5730;&#x5B9E;&#x73B0;&#x4E86;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x5305;&#x62EC;&#x7236;&#x5B50;&#x3001;&#x5144;&#x5F1F;&#x548C;&#x8DE8;&#x7EA7;&#x3002;&#x5982;&#x679C;&#x6DF1;&#x5165;&#x4F7F;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x6269;&#x5C55; <code>bus</code> &#x5B9E;&#x4F8B;&#xFF0C;&#x7ED9;&#x5B83;&#x6DFB;&#x52A0; <code>data</code>&#x3001;<code>methods</code> &#x548C; <code>computed</code> &#x7B49;&#x9009;&#x9879;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x5171;&#x7528;&#x7684;&#xFF0C;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x534F;&#x540C;&#x5F00;&#x53D1;&#x65F6;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x7ECF;&#x5E38;&#x9700;&#x8981;&#x5171;&#x4EAB;&#x4E00;&#x4E9B;&#x901A;&#x7528;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6BD4;&#x5982;&#x7528;&#x6237;&#x767B;&#x5F55;&#x7684;&#x6635;&#x79F0;&#x3001;&#x6027;&#x522B;&#x3001;&#x90AE;&#x7BB1;&#x548C;&#x6388;&#x6743;&#x7B49;&#x3002;&#x53EA;&#x9700;&#x5B50;&#x5B89;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x8BA9; <code>bus</code> &#x83B7;&#x53D6;&#x4E00;&#x6B21;&#xFF0C;&#x4EFB;&#x4F55;&#x65F6;&#x95F4;&#x3001;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x4ECE;&#x4E2D;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x5355;&#x9875;&#x9762;&#x5BCC;&#x5E94;&#x7528;&#xFF08;SPA&#xFF09;&#x4E2D;&#x4F1A;&#x5F88;&#x5B9E;&#x7528;&#x3002;</p>
<p>&#x9664;&#x4E86;&#x4E2D;&#x592E;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF; <code>bus</code> &#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#xFF1A;&#x7236;&#x94FE;&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x7D22;&#x5F15;&#x3002;</p>
<h3 id="articleHeader11">&#x7236;&#x94FE;</h3>
<p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528; <code>this.$parent</code> &#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x7236;&#x5B9E;&#x4F8B;&#x6216;&#x7EC4;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>this.$children</code> &#x8BBF;&#x95EE;&#x5B83;&#x6240;&#x6709;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x9012;&#x5F52;&#x5411;&#x4E0A;&#x6216;&#x5411;&#x4E0B;&#x65E0;&#x9650;&#x8BBF;&#x95EE;&#xFF0C;&#x76F4;&#x5230;&#x6839;&#x5B9E;&#x4F8B;&#x6216;&#x6700;&#x5185;&#x5C42;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    "{{" message "}}"
    &lt;component-a&gt;&lt;/component-a&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    "{{" message "}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">component-a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component-a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;component-a&apos;, {
    template: &apos;&lt;button @click=&quot;handleEvent&quot;&gt;&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;&lt;/button&gt;&apos;,
    methods: {
        handleEvent() {
            // &#x8BBF;&#x95EE;&#x5230;&#x7236;&#x94FE;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x4EFB;&#x4F55;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;
            this.$parent.message = &apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6; component-a &#x7684;&#x5185;&#x5BB9;&apos;
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        message: &apos;&apos;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;component-a&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;button @click=&quot;handleEvent&quot;&gt;&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;&lt;/button&gt;&apos;</span>,
    <span class="hljs-attr">methods</span>: {
        handleEvent() {
            <span class="hljs-comment">// &#x8BBF;&#x95EE;&#x5230;&#x7236;&#x94FE;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x4EFB;&#x4F55;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;</span>
            <span class="hljs-keyword">this</span>.$parent.message = <span class="hljs-string">&apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6; component-a &#x7684;&#x5185;&#x5BB9;&apos;</span>
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&apos;</span>
    }
});</code></pre>
<p>&#x5C3D;&#x7BA1; Vue &#x5141;&#x8BB8;&#x8FD9;&#x6837;&#x64CD;&#x4F5C;&#xFF0C;&#x4F46;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;<strong>&#x5B50;&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x5C3D;&#x53EF;&#x80FD;&#x907F;&#x514D;&#x4F9D;&#x8D56;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x66F4;&#x4E0D;&#x5E94;&#x8BE5;&#x53BB;&#x4E3B;&#x52A8;&#x4FEE;&#x6539;&#x5B83;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x4F7F;&#x5F97;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x8026;&#x5408;</strong>&#xFF0C;&#x53EA;&#x770B;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x5F88;&#x96BE;&#x7406;&#x89E3;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x53EF;&#x80FD;&#x88AB;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x4FEE;&#x6539;&#xFF0C;&#x7406;&#x60F3;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x53EA;&#x6709;&#x7EC4;&#x4EF6;&#x81EA;&#x5DF1;&#x80FD;&#x4FEE;&#x6539;&#x5B83;&#x7684;&#x72B6;&#x6001;&#x3002;<strong>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x6700;&#x597D;&#x8FD8;&#x662F;&#x901A;&#x8FC7; <code>props</code> &#x548C; <code>$emit()</code> &#x6765;&#x901A;&#x4FE1;</strong>&#x3002;</p>
<h3 id="articleHeader12">&#x5B50;&#x7EC4;&#x4EF6;&#x7D22;&#x5F15;</h3>
<p>&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x8F83;&#x591A;&#x65F6;&#xFF0C;&#x901A;&#x8FC7; <code>this.$children</code> &#x6765;&#x4E00;&#x4E00;&#x904D;&#x5386;&#x51FA;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x65F6;&#x6BD4;&#x8F83;&#x56F0;&#x96BE;&#x7684;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x7EC4;&#x4EF6;&#x52A8;&#x6001;&#x6E32;&#x67D3;&#x65F6;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x5E8F;&#x5217;&#x662F;&#x4E0D;&#x56FA;&#x5B9A;&#x7684;&#x3002;Vue &#x63D0;&#x4F9B;&#x4E86;&#x5B50;&#x7EC4;&#x4EF6;&#x7D22;&#x5F15;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027; <code>ref</code> &#x6765;&#x4E3A;&#x5B50;&#x7EC4;&#x4EF6;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;&#x540D;&#x79F0;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;button @click=&quot;handleRef&quot;&gt;&#x901A;&#x8FC7; ref &#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&lt;/button&gt;
    &lt;component-a ref=&quot;comA&quot;&gt;&lt;/component-a&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleRef&quot;</span>&gt;</span>&#x901A;&#x8FC7; ref &#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component-a</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;comA&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component-a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;component-a&apos;, {
    template: &apos;&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;&apos;,
    data() {
        return {
            message: &apos;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&apos;
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;,
    methods: {
        handleRef() {
            // &#x901A;&#x8FC7; $refs &#x6765;&#x8BBF;&#x95EE;&#x6307;&#x5B9A;&#x7684;&#x5B9E;&#x4F8B;
            var msg = this.$refs.comA.message;
            console.log(msg);
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;component-a&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;&apos;</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&apos;</span>
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">methods</span>: {
        handleRef() {
            <span class="hljs-comment">// &#x901A;&#x8FC7; $refs &#x6765;&#x8BBF;&#x95EE;&#x6307;&#x5B9A;&#x7684;&#x5B9E;&#x4F8B;</span>
            <span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">this</span>.$refs.comA.message;
            <span class="hljs-built_in">console</span>.log(msg);
        }
    }
});</code></pre>
<p>&#x63D0;&#x793A;&#xFF1A;<code>$refs</code> &#x53EA;&#x5728;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5B8C;&#x6210;&#x540E;&#x624D;&#x586B;&#x5145;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x662F;&#x975E;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x3002;<strong>&#x5B83;&#x4EC5;&#x4EC5;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5E94;&#x6025;&#x65B9;&#x6848;&#xFF0C;&#x5E94;&#x5F53;&#x907F;&#x514D;&#x5728;&#x6A21;&#x677F;&#x6216;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#x4F7F;&#x7528; <code>$refs</code></strong>&#x3002;</p>
<h1 id="articleHeader13">&#x4F7F;&#x7528; <code>slot</code> &#x5206;&#x53D1;&#x5185;&#x5BB9;</h1>
<h2 id="articleHeader14">&#x4EC0;&#x4E48;&#x662F; <code>slot</code>
</h2>
<p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x5E38;&#x89C4;&#x7684;&#x7F51;&#x7AD9;&#x5E03;&#x5C40;&#x7EC4;&#x4EF6;&#x5316;&#x540E;&#x7684;&#x673A;&#x6784;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;app&gt;
    &lt;menu-main&gt;&lt;/menu-main&gt;
    &lt;menu-sub&gt;&lt;/menu-sub&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;menu-left&gt;&lt;/menu-left&gt;
        &lt;container&gt;&lt;/container&gt;
    &lt;/div&gt;
    &lt;app-footer&gt;&lt;app-footer&gt;
&lt;/app&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">menu-main</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">menu-main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">menu-sub</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">menu-sub</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">menu-left</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">menu-left</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">container</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">container</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app-footer</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">app-footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span></code></pre>
<p>&#x5F53;&#x9700;&#x8981;&#x8BA9;&#x7EC4;&#x4EF6;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x6DF7;&#x5408;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#x4E0E;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x7528;&#x5230; <code>slot</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x53EB;&#x505A;&#x5185;&#x5BB9;&#x5206;&#x53D1;&#xFF08;transclusion&#xFF09;&#x3002;&#x4EE5; <code>&lt;app&gt;</code> &#x4E3A;&#x4F8B;&#xFF0C;&#x5B83;&#x6709;&#x4E24;&#x4E2A;&#x7279;&#x70B9;&#xFF1A;</p>
<ol>
<li>
<code>&lt;app&gt;</code> &#x7EC4;&#x4EF6;&#x4E0D;&#x77E5;&#x9053;&#x5B83;&#x7684;&#x6302;&#x8F7D;&#x70B9;&#x4F1A;&#x6709;&#x4EC0;&#x4E48;&#x5185;&#x5BB9;&#x3002;&#x6302;&#x8F7D;&#x70B9;&#x7684;&#x5185;&#x5BB9;&#x7531; <code>&lt;app&gt;</code> &#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x51B3;&#x5B9A;&#x3002;</li>
<li>
<code>&lt;app&gt;</code> &#x7EC4;&#x4EF6;&#x5F88;&#x53EF;&#x80FD;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x6A21;&#x677F;&#x3002;</li>
</ol>
<p><code>props</code> &#x4F20;&#x9012;&#x6570;&#x636E;&#x3001;<code>events</code> &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x548C; <code>slot</code> &#x5185;&#x5BB9;&#x5206;&#x53D1;&#x5C31;&#x6784;&#x6210;&#x4E86; Vue &#x7EC4;&#x4EF6;&#x7684; 3 &#x4E2A; API&#x6765;&#x6E90;&#xFF0C;&#x518D;&#x590D;&#x6742;&#x7684;&#x7EC4;&#x4EF6;&#x4E5F;&#x662F;&#x7531;&#x8FD9; 3 &#x90E8;&#x5206;&#x6784;&#x6210;&#x7684;&#x3002;</p>
<h2 id="articleHeader15">&#x4F5C;&#x7528;&#x57DF;</h2>
<p>&#x7236;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7F16;&#x8BD1;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7F16;&#x8BD1;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component v-show=&quot;showChild&quot;&gt;&lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;showChild&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child-component&apos;, {
    template: &apos;&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;&apos;
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        showChild: true
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;&apos;</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">showChild</span>: <span class="hljs-literal">true</span>
    }
});</code></pre>
<p>&#x8FD9;&#x91CC;&#x7684;&#x72B6;&#x6001; <code>showChild</code> &#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0A;&#x7ED1;&#x5B9A;&#xFF0C;&#x5E94;&#x8BE5;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;&lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child-component&apos;, {
    template: &apos;&lt;div v-show=&quot;showChild&quot;&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;&apos;,
    data() {
        return {
            showChild: true
        }
    }
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div v-show=&quot;showChild&quot;&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;&apos;</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">showChild</span>: <span class="hljs-literal">true</span>
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x56E0;&#x6B64;&#xFF0C;<code>slot</code> &#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;&#x3002;</p>
<h2 id="articleHeader16">
<code>slot</code> &#x7528;&#x6CD5;</h2>
<h3 id="articleHeader17">&#x5355;&#x4E2A; <code>slot</code>
</h3>
<p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x4F7F;&#x7528;&#x7279;&#x6B8A;&#x7684; <code>&lt;slot&gt;</code> &#x5143;&#x7D20;&#x5C31;&#x53EF;&#x4EE5;&#x4E3A;&#x8FD9;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x5F00;&#x542F;&#x4E00;&#x4E2A; <code>slot</code>&#xFF08;&#x63D2;&#x69FD;&#xFF09;&#xFF0C;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x91CC;&#xFF0C;&#x63D2;&#x5165;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x5185;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x5C06;&#x66FF;&#x4EE3;&#x5B50;&#x7EC4;&#x4EF6;&#x7684; <code>&lt;slot&gt;</code> &#x6807;&#x7B7E;&#x53CA;&#x5B83;&#x7684;&#x5185;&#x5BB9;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;p&gt;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
    &lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child-component&apos;, {
    template: `
        &lt;div&gt;
            &lt;slot&gt;
                &lt;p&gt;&#x5982;&#x679C;&#x7236;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x63D2;&#x5165;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x5C06;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x51FA;&#x73B0;&lt;/p&gt;
            &lt;/slot&gt;
        &lt;/div&gt;
    `
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div&gt;
            &lt;slot&gt;
                &lt;p&gt;&#x5982;&#x679C;&#x7236;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x63D2;&#x5165;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x5C06;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x51FA;&#x73B0;&lt;/p&gt;
            &lt;/slot&gt;
        &lt;/div&gt;
    `</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x4E0A;&#x4F8B;&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div&gt;
        &lt;p&gt;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x6CE8;&#x610F;&#xFF1A;&#x5B50;&#x7EC4;&#x4EF6; <code>&lt;slot&gt;</code> &#x5185;&#x7684;&#x5907;&#x7528;&#x5185;&#x5BB9;&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x3002;</p>
<h3 id="articleHeader18">&#x5177;&#x540D; <code>slot</code>
</h3>
<p>&#x7ED9; <code>&lt;slot&gt;</code> &#x5143;&#x7D20;&#x6307;&#x5B9A;&#x4E00;&#x4E2A; <code>name</code> &#x540E;&#x53EF;&#x4EE5;&#x5206;&#x53D1;&#x591A;&#x4E2A;&#x5185;&#x5BB9;&#xFF0C;&#x5177;&#x540D; <code>slot</code> &#x53EF;&#x4EE5;&#x4E0E;&#x5355;&#x4E2A; <code>slot</code> &#x5171;&#x5B58;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;h2 slot=&quot;header&quot;&gt;&#x6807;&#x9898;&lt;/h2&gt;
        &lt;p&gt;&#x6B63;&#x6587;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x7684;&#x6B63;&#x6587;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;div slot=&quot;footer&quot;&gt;&#x5E95;&#x90E8;&#x4FE1;&#x606F;&lt;/div&gt;
    &lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>&#x6807;&#x9898;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6B63;&#x6587;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x7684;&#x6B63;&#x6587;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>&#x5E95;&#x90E8;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child-component&apos;, {
    template: `
        &lt;div class=&quot;container&quot;&gt;
            &lt;div class=&quot;header&quot;&gt;
                &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;main&quot;&gt;
                &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;footer&quot;&gt;
                &lt;slot name=&quot;footer&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    `
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div class=&quot;container&quot;&gt;
            &lt;div class=&quot;header&quot;&gt;
                &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;main&quot;&gt;
                &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;footer&quot;&gt;
                &lt;slot name=&quot;footer&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    `</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x4E0A;&#x4F8B;&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;div class=&quot;header&quot;&gt;
            &lt;h2&gt;&#x6807;&#x9898;&lt;/h2&gt;
        &lt;/div&gt;
        &lt;div class=&quot;main&quot;&gt;
            &lt;p&gt;&#x6B63;&#x6587;&#x5185;&#x5BB9;&lt;/p&gt;
            &lt;p&gt;&#x66F4;&#x591A;&#x7684;&#x6B63;&#x6587;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class=&quot;footer&quot;&gt;
            &lt;div&gt;&#x5E95;&#x90E8;&#x4FE1;&#x606F;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x6807;&#x9898;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6B63;&#x6587;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x7684;&#x6B63;&#x6587;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x5E95;&#x90E8;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x7684;&#x533F;&#x540D; <code>slot</code>&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x5185;&#x591A;&#x4F59;&#x7684;&#x5185;&#x5BB9;&#x7247;&#x6BB5;&#x90FD;&#x5C06;&#x88AB;&#x629B;&#x5F03;&#x3002;</p>
<h2 id="articleHeader19">&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;</h2>
<p>&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x662F;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7684; <code>slot</code>&#xFF0C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x590D;&#x7528;&#x7684;&#x6A21;&#x677F;&#x66FF;&#x6362;&#x5DF2;&#x6E32;&#x67D3;&#x5143;&#x7D20;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;template scope=&quot;props&quot;&gt;
            &lt;p&gt;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
            &lt;p&gt;"{{" props.msg "}}"&lt;/p&gt;
        &lt;/template&gt;
    &lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">&quot;props&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" props.msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child-component&apos;, {
    template: `
        &lt;div class=&quot;container&quot;&gt;
            &lt;slot msg=&quot;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&quot;&gt;&lt;slot&gt;
        &lt;/div&gt;
    `
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div class=&quot;container&quot;&gt;
            &lt;slot msg=&quot;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&quot;&gt;&lt;slot&gt;
        &lt;/div&gt;
    `</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x89C2;&#x5BDF;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x5728; <code>&lt;slot&gt;</code> &#x5143;&#x7D20;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C; <code>props</code> &#x4F20;&#x9012;&#x6570;&#x636E;&#x7ED9;&#x7EC4;&#x4EF6;&#x7684;&#x5199;&#x6CD5; <code>msg=&quot;xxx&quot;</code>&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x4F20;&#x5230;&#x4E86;&#x63D2;&#x69FD;&#x3002;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x4E86; <code>&lt;template&gt;</code> &#x5143;&#x7D20;&#xFF0C;&#x800C;&#x4E14;&#x62E5;&#x6709;&#x4E00;&#x4E2A; <code>scope=&quot;props&quot;</code> &#x7684;&#x7279;&#x6027;&#xFF0C;&#x8FD9;&#x91CC;&#x7684; <code>props</code> &#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x53D8;&#x91CF;&#xFF0C;&#x5C31;&#x50CF; <code>v-for=&quot;item in items&quot;</code> &#x91CC;&#x9762;&#x7684; <code>item</code> &#x4E00;&#x6837;&#x3002;<code>template</code> &#x5185;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E34;&#x65F6;&#x53D8;&#x91CF; <code>props</code> &#x8BBF;&#x95EE;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x63D2;&#x69FD;&#x7684;&#x6570;&#x636E; <code>msg</code>&#x3002;</p>
<p>&#x4E0A;&#x4F8B;&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;p&gt;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
    &lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x66F4;&#x5177;&#x4EE3;&#x8868;&#x6027;&#x7684;&#x7528;&#x4F8B;&#x662F;&#x5217;&#x8868;&#x7EC4;&#x4EF6;&#xFF0C;&#x5141;&#x8BB8;&#x7EC4;&#x4EF6;&#x81EA;&#x5B9A;&#x4E49;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x6E32;&#x67D3;&#x5217;&#x8868;&#x6BCF;&#x4E00;&#x9879;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-list :books=&quot;books&quot;&gt;
        &lt;!-- &#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x540D;&#x7684; slot --&gt;
        &lt;template slot=&quot;book&quot; scope=&quot;props&quot;&gt;
            &lt;li&gt;"{{" props.bookName "}}"&lt;/li&gt;
        &lt;/template&gt;
    &lt;/my-list&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-list</span> <span class="hljs-attr">:books</span>=<span class="hljs-string">&quot;books&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x540D;&#x7684; slot --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;book&quot;</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">&quot;props&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>"{{" props.bookName "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">my-list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-list&apos;, {
    props: {
        books: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    template: `
        &lt;ul&gt;
            &lt;slot name=&quot;book&quot;
                v-for=&quot;book in books&quot;
                :book-name=&quot;book.name&quot;
            &gt;&lt;/slot&gt;
        &lt;/ul&gt;
    `
});

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        books: [
            { name: &apos;&#x300A;book1&#x300B;&apos; },
            { name: &apos;&#x300A;book2&#x300B;&apos; },
            { name: &apos;&#x300A;book3&#x300B;&apos; }
        ]
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;my-list&apos;</span>, {
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">books</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
            <span class="hljs-keyword">default</span>() {
                <span class="hljs-keyword">return</span> [];
            }
        }
    },
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;ul&gt;
            &lt;slot name=&quot;book&quot;
                v-for=&quot;book in books&quot;
                :book-name=&quot;book.name&quot;
            &gt;&lt;/slot&gt;
        &lt;/ul&gt;
    `</span>
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">books</span>: [
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x300A;book1&#x300B;&apos;</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x300A;book2&#x300B;&apos;</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x300A;book3&#x300B;&apos;</span> }
        ]
    }
});</code></pre>
<p>&#x5B50;&#x7EC4;&#x4EF6; <code>my-list</code> &#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x6765;&#x81EA;&#x7236;&#x7EA7;&#x7684; <code>prop</code> &#x6570;&#x7EC4; <code>books</code>&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x5B83;&#x5728; <code>name</code> &#x4E3A; <code>book</code> &#x7684; <code>slot</code> &#x4E0A;&#x4F7F;&#x7528; <code>v-for</code> &#x6307;&#x4EE4;&#x5FAA;&#x73AF;&#xFF0C;&#x540C;&#x65F6;&#x66B4;&#x9732;&#x4E00;&#x4E2A;&#x53D8;&#x91CF; <code>bookName</code>&#x3002;</p>
<p>&#x6B64;&#x4F8B;&#x7684;&#x7528;&#x610F;&#x4E3B;&#x8981;&#x662F;&#x4ECB;&#x7ECD;&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x52A0;&#x5165;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x800C;&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x65E2;&#x53EF;&#x4EE5;&#x590D;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684; <code>slot</code>&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x662F; <code>slot</code> &#x5185;&#x5BB9;&#x4E0D;&#x4E00;&#x81F4;&#x3002;&#x5982;&#x679C;&#x6B64;&#x4F8B;&#x8FD8;&#x5728;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x5185;&#x4F7F;&#x7528;&#xFF0C;<code>&lt;li&gt;</code> &#x7684;&#x5185;&#x5BB9;&#x6E32;&#x67D3;&#x6743;&#x662F;&#x7531;&#x4F7F;&#x7528;&#x8005;&#x638C;&#x63E1;&#x7684;&#xFF0C;&#x800C;&#x6570;&#x636E;&#x5374;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E34;&#x65F6;&#x53D8;&#x91CF;&#xFF08;&#x6BD4;&#x5982; <code>props</code>&#xFF09;&#x4ECE;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x83B7;&#x53D6;&#x3002;</p>
<h2 id="articleHeader20">&#x8BBF;&#x95EE; <code>slot</code>
</h2>
<p>Vue &#x63D0;&#x4F9B;&#x4E86;&#x7528;&#x6765;&#x8BBF;&#x95EE;&#x88AB; <code>slot</code> &#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&#x7684;&#x65B9;&#x6CD5; <code>$slots</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;h2 slot=&quot;header&quot;&gt;&#x6807;&#x9898;&lt;/h2&gt;
        &lt;p&gt;&#x6B63;&#x6587;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x7684;&#x6B63;&#x6587;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;div slot=&quot;footer&quot;&gt;&#x5E95;&#x90E8;&#x4FE1;&#x606F;&lt;/div&gt;
    &lt;/child-component&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>&#x6807;&#x9898;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6B63;&#x6587;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x7684;&#x6B63;&#x6587;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>&#x5E95;&#x90E8;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child-component&apos;, {
    template: `
        &lt;div class=&quot;container&quot;&gt;
            &lt;div class=&quot;header&quot;&gt;
                &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;main&quot;&gt;
                &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;footer&quot;&gt;
                &lt;slot name=&quot;footer&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    `,
    mounted() {
        var header = this.$slots.header,
            main = this.$slots.default,
            footer = this.$slots.footer;
            
        console.log(footer);
        console.log(footer[0].elm.innerHTML);
    }
});

var app = new Vue({
    el: &apos;#app&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div class=&quot;container&quot;&gt;
            &lt;div class=&quot;header&quot;&gt;
                &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;main&quot;&gt;
                &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
            &lt;div class=&quot;footer&quot;&gt;
                &lt;slot name=&quot;footer&quot;&gt;&lt;/slot&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    `</span>,
    mounted() {
        <span class="hljs-keyword">var</span> header = <span class="hljs-keyword">this</span>.$slots.header,
            main = <span class="hljs-keyword">this</span>.$slots.default,
            footer = <span class="hljs-keyword">this</span>.$slots.footer;
            
        <span class="hljs-built_in">console</span>.log(footer);
        <span class="hljs-built_in">console</span>.log(footer[<span class="hljs-number">0</span>].elm.innerHTML);
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
});</code></pre>
<p>&#x901A;&#x8FC7; <code>$slots</code> &#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x67D0;&#x4E2A;&#x5177;&#x540D; <code>slot</code>&#xFF0C;<code>this.$slots.default</code> &#x5305;&#x62EC;&#x4E86;&#x6240;&#x6709;&#x6CA1;&#x6709;&#x88AB;&#x5305;&#x542B;&#x5728;&#x5177;&#x540D; <code>slot</code> &#x4E2D;&#x7684;&#x8282;&#x70B9;&#x3002;</p>
<p><code>$slots</code> &#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x51E0;&#x4E4E;&#x7528;&#x4E0D;&#x5230;&#xFF0C;&#x5728;&#x7528; <code>render</code> &#x51FD;&#x6570;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x65F6;&#x4F1A;&#x6BD4;&#x8F83;&#x6709;&#x7528;&#xFF0C;&#x4F46;&#x4E3B;&#x8981;&#x8FD8;&#x662F;&#x7528;&#x4E8E;&#x72EC;&#x7ACB;&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;&#x4E2D;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 组件详解

## 原文链接
[https://segmentfault.com/a/1190000015155212](https://segmentfault.com/a/1190000015155212)


---
title: 'Vue-组件详解' 
date: 2018-11-29 9:27:38
hidden: true
slug: 741hkc6ntur
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>&#x67E5;&#x770B;<a href="https://whjin.github.io/full-stack-development/" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x7AD9;&#x70B9;</a>&#xFF0C;&#x66F4;&#x591A;&#x6269;&#x5C55;&#x5185;&#x5BB9;&#x53CA;&#x66F4;&#x4F73;&#x9605;&#x8BFB;&#x4F53;&#x9A8C;&#xFF01;</blockquote>
<h1 id="articleHeader0">&#x7EC4;&#x4EF6;&#x8BE6;&#x89E3;</h1>
<h2 id="articleHeader1">&#x7EC4;&#x4EF6;&#x4E0E;&#x590D;&#x7528;</h2>
<p>Vue&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x6CE8;&#x518C;&#x540E;&#x624D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;&#x6CE8;&#x518C;&#x6709;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x548C;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p>
<p><strong>&#x5168;&#x5C40;&#x6CE8;&#x518C;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">&apos;my-component&apos;</span>, {});
</code></pre>
<p>&#x8981;&#x5728;&#x7236;&#x5B9E;&#x4F8B;&#x4E2D;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5728;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x524D;&#x6CE8;&#x518C;&#xFF0C;&#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x7528;<code>&lt;my-component&gt;&lt;/my-component&gt;</code>&#x7684;&#x5F62;&#x5F0F;&#x6765;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    template: `&lt;div&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&lt;/div&gt;`
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>Vue.component(&apos;<span class="hljs-keyword">my</span>-component&apos;, {
    template: `&lt;<span class="hljs-keyword">div</span>&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&lt;/<span class="hljs-keyword">div</span>&gt;`
});
</code></pre>
<p><code>template</code>&#x7684;DOM&#x7ED3;&#x6784;&#x5FC5;&#x987B;&#x88AB;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5305;&#x542B;&#xFF0C;&#x7F3A;&#x5C11;<code>&lt;div&gt;&lt;/div&gt;</code>&#x4F1A;&#x65E0;&#x6CD5;&#x6E32;&#x67D3;&#x5E76;&#x62A5;&#x9519;&#x3002;</p>
<p>&#x5728;Vue&#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;<code>components</code>&#x9009;&#x9879;&#x53EF;&#x4EE5;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x6CE8;&#x518C;&#x540E;&#x7684;&#x7EC4;&#x4EF6;&#x53EA;&#x5728;&#x8BE5;&#x5B9E;&#x4F8B;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x6709;&#x6548;&#x3002;</p>
<p>&#x7EC4;&#x4EF6;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>components</code>&#x9009;&#x9879;&#x6765;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x5D4C;&#x5957;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Child = {
    template: `&lt;div&gt;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/div&gt;`
};

new Vue({
    el: &apos;#app&apos;,
    components: {
        &apos;my-component&apos;: Child
    },
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs axapta"><code>var Child = {
    template: `&lt;<span class="hljs-keyword">div</span>&gt;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/<span class="hljs-keyword">div</span>&gt;`
};

<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&apos;#app&apos;</span>,
    components: {
        <span class="hljs-string">&apos;my-component&apos;</span>: Child
    },
});
</code></pre>
<p>Vue&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x53D7;&#x5230;HTML&#x7684;&#x9650;&#x5236;&#xFF0C;&#x6BD4;&#x5982;<code>&lt;table&gt;</code>&#x5185;&#x89C4;&#x5B9A;&#x53EA;&#x5141;&#x8BB8;&#x662F;<code>&lt;tr&gt;</code>&#x3001;<code>&lt;td&gt;</code>&#x3001;<code>&lt;th&gt;</code>&#x7B49;&#x8FD9;&#x4E9B;&#x8868;&#x683C;&#x5143;&#x7D20;&#xFF0C;&#x6240;&#x4EE5;&#x5728;<code>&lt;table&gt;</code>&#x5185;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x65F6;&#x65E0;&#x6548;&#x7684;&#x3002;<strong>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7279;&#x6B8A;&#x7684;<code>is</code>&#x5C5E;&#x6027;&#x6765;&#x6302;&#x8F7D;&#x7EC4;&#x4EF6;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;table&gt;
        &lt;tbody is=&quot;my-component&quot;&gt;&lt;/tbody&gt;
    &lt;/table&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    template: `&lt;div&gt;&#x8FD9;&#x91CC;&#x662F;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;`
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span> <span class="hljs-attr">is</span>=<span class="hljs-string">&quot;my-component&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Vue.component(&apos;my-component&apos;, {
    template: `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x8FD9;&#x91CC;&#x662F;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`
});
</code></pre>
<p>&#x5E38;&#x89C1;&#x7684;&#x9650;&#x5236;&#x5143;&#x7D20;&#x8FD8;&#x6709;<code>&lt;ul&gt;</code>&#x3001;<code>&lt;ol&gt;</code>&#x3001;<code>&lt;select&gt;</code>&#x3002;</p>
<p>&#x9664;&#x4E86;<code>template</code>&#x9009;&#x9879;&#x5916;&#xFF0C;&#x7EC4;&#x4EF6;&#x4E2D;&#x8FD8;&#x53EF;&#x4EE5;&#x50CF;Vue&#x5B9E;&#x4F8B;&#x90A3;&#x6837;&#x4F7F;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x6BD4;&#x5982;<code>data</code>&#x3001;<code>computed</code>&#x3001;<code>methods</code>&#x7B49;&#x3002;</p>
<p><strong>&#x4F46;&#x662F;&#x5728;&#x4F7F;&#x7528;<code>data</code>&#x65F6;&#xFF0C;<code>data</code>&#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x6570;&#x636E;<code>return</code>&#x51FA;&#x53BB;</strong>&#x3002;</p>
<p>JavaScript&#x5BF9;&#x8C61;&#x662F;&#x5F15;&#x7528;&#x5173;&#x7CFB;&#xFF0C;&#x5982;&#x679C;<code>return</code>&#x7684;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x4E86;&#x5916;&#x90E8;&#x7684;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x5171;&#x4EAB;&#x7684;&#xFF0C;&#x4EFB;&#x4F55;&#x4E00;&#x65B9;&#x4FEE;&#x6539;&#x90FD;&#x4F1A;&#x540C;&#x6B65;&#x3002;</p>
<h2 id="articleHeader2">&#x4F7F;&#x7528;<code>props</code>&#x4F20;&#x9012;&#x6570;&#x636E;</h2>
<p>&#x7EC4;&#x4EF6;&#x4E0D;&#x4EC5;&#x8981;&#x628A;&#x6A21;&#x677F;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x590D;&#x7528;&#xFF0C;&#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#x7EC4;&#x4EF6;&#x95F4;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#x3002;</p>
<p>&#x901A;&#x5E38;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x5305;&#x542B;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x8981;&#x6B63;&#x5411;&#x5730;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x6216;&#x53C2;&#x6570;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x540E;&#x6839;&#x636E;&#x53C2;&#x6570;&#x7684;&#x4E0D;&#x540C;&#x6E32;&#x67D3;&#x4E0D;&#x540C;&#x7684;&#x5185;&#x5BB9;&#x6216;&#x8005;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x8FD9;&#x4E2A;&#x6B63;&#x5411;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x8FC7;&#x7A0B;&#x901A;&#x8FC7;<code>props</code>&#x6765;&#x5B9E;&#x73B0;&#x3002;</p>
<p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x9009;&#x9879;<code>props</code>&#x58F0;&#x660E;&#x9700;&#x8981;&#x4ECE;&#x7236;&#x7EA7;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;&#xFF0C;<code>props</code>&#x7684;&#x503C;&#x53EF;&#x4EE5;&#x662F;&#x4E24;&#x79CD;&#xFF0C;&#x4E00;&#x79CD;&#x662F;<strong>&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;</strong>&#xFF0C;&#x4E00;&#x79CD;&#x662F;<strong>&#x5BF9;&#x8C61;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;my-component message=&quot;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&quot;&gt;&lt;/my-component&gt;

props: [&apos;message&apos;],
template: `&lt;div&gt;"{{"message"}}"&lt;/div&gt;`,
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">message</span>=<span class="hljs-string">&quot;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>

props: [&apos;message&apos;],
template: `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`,
</span></code></pre>
<p><code>props</code>&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;&#x4E0E;&#x7EC4;&#x4EF6;<code>data</code>&#x51FD;&#x6570;&#x4E2D;<code>return</code>&#x7684;&#x6570;&#x636E;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5C31;&#x662F;<code>props</code>&#x7684;&#x6570;&#x636E;&#x6765;&#x81EA;&#x7236;&#x7EA7;&#xFF0C;&#x800C;<code>data</code>&#x4E2D;&#x7684;&#x662F;&#x7EC4;&#x4EF6;&#x81EA;&#x5DF1;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#xFF0C;&#x8FD9;&#x4E24;&#x79CD;&#x6570;&#x636E;&#x90FD;&#x53EF;&#x4EE5;&#x5728;&#x6A21;&#x677F;<code>template</code>&#x53CA;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;<code>computed</code>&#x548C;&#x65B9;&#x6CD5;<code>methods</code>&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p>
<p>&#x7531;&#x4E8E;HTML&#x7279;&#x6027;&#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;DOM&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x9A7C;&#x5CF0;&#x547D;&#x540D;&#x7684;<code>props</code>&#x540D;&#x79F0;&#x8981;&#x8F6C;&#x4E3A;&#x77ED;&#x6A2A;&#x7EBF;&#x5206;&#x5272;&#x547D;&#x540D;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;my-component warning-text=&quot;&#x63D0;&#x793A;&#x4FE1;&#x606F;&quot;&gt;&lt;/my-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vhdl"><code>&lt;my-<span class="hljs-keyword">component</span> <span class="hljs-literal">warning</span>-<span class="hljs-literal">text</span>=<span class="hljs-string">&quot;&#x63D0;&#x793A;&#x4FE1;&#x606F;&quot;</span>&gt;&lt;/my-<span class="hljs-keyword">component</span>&gt;
</code></pre>
<p>&#x6709;&#x65F6;&#x5019;&#xFF0C;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x5199;&#x6B7B;&#xFF0C;&#x800C;&#x662F;&#x6765;&#x81EA;&#x7236;&#x7EA7;&#x7684;&#x52A8;&#x6001;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6307;&#x4EE4;<code>v-bind</code>&#x52A8;&#x6001;&#x7ED1;&#x5B9A;<code>props</code>&#x7684;&#x503C;&#xFF0C;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x4E5F;&#x4F1A;&#x4F20;&#x9012;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;input type=&quot;text&quot; v-model=&quot;parentMessage&quot;&gt;
    &lt;my-component :message=&quot;parentMessage&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;

props: [&apos;message&apos;],
template: `&lt;div&gt;"{{"message"}}"&lt;/div&gt;`,

data: {
    parentMessage: &apos;&apos;
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;parentMessage&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">:message</span>=<span class="hljs-string">&quot;parentMessage&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

props: [&apos;message&apos;],
template: `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"message}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`,

data: </span><span class="hljs-template-variable">{
    parentMessage: &apos;&apos;
}</span><span class="xml">
</span></code></pre>
<p>&#x8FD9;&#x91CC;&#x7528;<code>v-model</code>&#x7ED1;&#x5B9A;&#x4E86;&#x7236;&#x7EA7;&#x7684;&#x6570;&#x636E;<code>parentMessage</code>&#xFF0C;&#x5F53;&#x901A;&#x8FC7;&#x8F93;&#x5165;&#x6846;&#x4EFB;&#x610F;&#x8F93;&#x5165;&#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x5230;&#x7684;<code>props[&quot;message&quot;]</code>&#x4E5F;&#x4F1A;&#x5B9E;&#x65F6;&#x54CD;&#x5E94;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x3002;</p>
<h2 id="articleHeader3">&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</h2>
<p>&#x4E1A;&#x52A1;&#x4E2D;&#x4F1A;&#x7ECF;&#x5E38;&#x9047;&#x5230;&#x4E24;&#x79CD;&#x9700;&#x8981;&#x6539;&#x53D8;<code>prop</code>&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x521D;&#x59CB;&#x503C;&#x8FDB;&#x6765;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x5C06;&#x5B83;&#x4F5C;&#x4E3A;&#x521D;&#x59CB;&#x503C;&#x4FDD;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x4F7F;&#x7528;&#x548C;&#x4FEE;&#x6539;&#x3002;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x53EF;&#x4EE5;&#x5728;&#x7EC4;&#x4EF6;<code>data</code>&#x5185;&#x518D;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x5F15;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x7684;<code>prop</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component :init-count=&quot;1&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    props: [&apos;initCount&apos;],
    template: `&lt;div&gt;"{{"count"}}"&lt;/div&gt;`,
    data() {
        return {
            count:this.initCount
        }
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-keyword">my</span>-component :init-<span class="hljs-built_in">count</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

Vue.component(&apos;<span class="hljs-keyword">my</span>-component&apos;, {
    props: [&apos;initCount&apos;],
    template: `&lt;<span class="hljs-keyword">div</span>&gt;"{{"<span class="hljs-built_in">count</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;`,
    data() {
<span class="hljs-built_in">        return</span> {
            <span class="hljs-built_in">count</span>:this.initCount
        }
    }
});
</code></pre>
<p>&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x4E86;&#x6570;&#x636E;<code>count</code>&#xFF0C;&#x5B83;&#x5728;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x4F1A;&#x83B7;&#x53D6;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;<code>initCount</code>&#xFF0C;&#x4E4B;&#x540E;&#x5C31;&#x4E0E;&#x4E4B;&#x65E0;&#x5173;&#x4E86;&#xFF0C;&#x53EA;&#x7528;&#x7EF4;&#x62A4;<code>count</code>&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;<code>initCount</code>&#x3002;</p>
<p>&#x53E6;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x5C31;&#x662F;<code>prop</code>&#x4F5C;&#x4E3A;&#x9700;&#x8981;&#x88AB;&#x8F6C;&#x53D8;&#x7684;&#x539F;&#x59CB;&#x503C;&#x4F20;&#x5165;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x5C31;&#x53EF;&#x4EE5;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component :width=&quot;100&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    props: [&apos;width&apos;],
    template: `&lt;div :style=&quot;style&quot;&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;`,
    computed: {
        style: function () {
            return {
                width: this.width + &apos;px&apos;
            }
        }
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;100&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;width&apos;</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div :style=&quot;style&quot;&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;`</span>,
    <span class="hljs-attr">computed</span>: {
        <span class="hljs-attr">style</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">width</span>: <span class="hljs-keyword">this</span>.width + <span class="hljs-string">&apos;px&apos;</span>
            }
        }
    }
});
</code></pre>
<p>&#x56E0;&#x4E3A;&#x7528;CSS&#x4F20;&#x9012;&#x5BBD;&#x5EA6;&#x8981;&#x5E26;&#x5355;&#x4F4D;&#xFF08;px&#xFF09;&#xFF0C;&#x6570;&#x503C;&#x8BA1;&#x7B97;&#x4E00;&#x822C;&#x4E0D;&#x5E26;&#x5355;&#x4F4D;&#xFF0C;&#x6240;&#x4EE5;&#x7EDF;&#x4E00;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;</p>
<blockquote>&#x5728;JavaScript&#x4E2D;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#x65F6;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#xFF0C;&#x6240;&#x4EE5;<code>props</code>&#x662F;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#x65F6;&#xFF0C;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x6539;&#x53D8;&#x662F;&#x4F1A;&#x5F71;&#x54CD;&#x7236;&#x7EC4;&#x4EF6;&#x3002;</blockquote>
<h2 id="articleHeader4">&#x6570;&#x7EC4;&#x9A8C;&#x8BC1;</h2>
<p>&#x5F53;<code>prop</code>&#x9700;&#x8981;&#x9A8C;&#x8BC1;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x8C61;&#x5199;&#x6CD5;&#x3002;</p>
<p>&#x4E00;&#x822C;&#x5F53;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x7ED9;&#x522B;&#x4EBA;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x63A8;&#x8350;&#x90FD;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x9A8C;&#x8BC1;&#x3002;&#x6BD4;&#x5982;&#x67D0;&#x4E2A;&#x6570;&#x636E;&#x5FC5;&#x987B;&#x662F;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5C31;&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x5F39;&#x51FA;&#x8B66;&#x544A;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;, {
    props: {
        // &#x5FC5;&#x987B;&#x662F;&#x6570;&#x5B57;
        propA: Number,
        // &#x5FC5;&#x987B;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x6570;&#x5B57;&#x7C7B;&#x578B;
        propB: [String, Number],
        // &#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x662F;true
        propC: {
            type: Boolean,
            default: true
        },
        // &#x6570;&#x5B57;&#xFF0C;&#x800C;&#x4E14;&#x662F;&#x5FC5;&#x4F20;
        propD: {
            type: Number,
            default: true
        },
        // &#x5982;&#x679C;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8FD4;&#x56DE;
        propE: {
            type: Array,
            default: function () {
                return []
            }
        },
        // &#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x9A8C;&#x8BC1;&#x51FD;&#x6570;
        propF: {
            validator: function (value) {
                return value &gt; 10
            }
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code>Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    props: {
        <span class="hljs-comment">// &#x5FC5;&#x987B;&#x662F;&#x6570;&#x5B57;</span>
        propA: <span class="hljs-built_in">Number</span>,
        <span class="hljs-comment">// &#x5FC5;&#x987B;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x6570;&#x5B57;&#x7C7B;&#x578B;</span>
        propB: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
        <span class="hljs-comment">// &#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x662F;true</span>
        propC: {
            <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Boolean</span>,
            <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-comment">// &#x6570;&#x5B57;&#xFF0C;&#x800C;&#x4E14;&#x662F;&#x5FC5;&#x4F20;</span>
        propD: {
            <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Number</span>,
            <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8FD4;&#x56DE;</span>
        propE: {
            <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Array</span>,
            <span class="hljs-keyword">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> []
            }
        },
        <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x9A8C;&#x8BC1;&#x51FD;&#x6570;</span>
        propF: {
            validator: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
                <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">10</span>
            }
        }
    }
});</code></pre>
<p>&#x9A8C;&#x8BC1;&#x7684;<code>type</code>&#x7C7B;&#x578B;&#x53EF;&#x4EE5;&#x662F;&#xFF1A;</p>
<ul>
<li><code>String</code></li>
<li><code>Number</code></li>
<li><code>Boolean</code></li>
<li><code>Object</code></li>
<li><code>Array</code></li>
<li><code>Function</code></li>
</ul>
<p><code>type</code>&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x6784;&#x9020;&#x5668;&#xFF0C;&#x4F7F;&#x7528;<code>instanceof</code>&#x68C0;&#x6D4B;&#x3002;</p>
<h2 id="articleHeader5">&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2>
<p>&#x7EC4;&#x4EF6;&#x5173;&#x7CFB;&#x53EF;&#x5206;&#x4E3A;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x3001;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x3001;&#x8DE8;&#x7EA7;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x3002;</p>
<h3 id="articleHeader6">&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</h3>
<p>&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x5C31;&#x8981;&#x7528;&#x5230;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x3002;</p>
<p><code>v-on</code>&#x9664;&#x4E86;&#x76D1;&#x542C;DOM&#x4E8B;&#x4EF6;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x3002;</p>
<p>JavaScript&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x2014;&#x2014;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x65B9;&#x6CD5;&#xFF1A;</p>
<ul>
<li><code>dispatchEvent</code></li>
<li><code>addEventListener</code></li>
</ul>
<p>Vue&#x7EC4;&#x4EF6;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x7528;<code>$emit()</code>&#x6765;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x7528;<code>$on()</code>&#x6765;&#x76D1;&#x542C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x4E8B;&#x4EF6;&#x3002;</p>
<p>&#x7236;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x4E0A;&#x4F7F;&#x7528;<code>v-on</code>&#x6765;&#x76D1;&#x542C;&#x5B50;&#x7EC4;&#x4EF6;&#x89E6;&#x53D1;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;&#x603B;&#x6570;:"{{"total"}}"&lt;/p&gt;
    &lt;my-component
            @increase=&quot;handleGetTotal&quot; @reduce=&quot;handleGetTotal&quot;&gt;&lt;/my-component&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    template: `
        &lt;div&gt;
            &lt;button @click=&quot;handleIncrease&quot;&gt;+&lt;/button&gt;
            &lt;button @click=&quot;handlereduce&quot;&gt;-&lt;/button&gt;
        &lt;/div&gt;
        `,
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        handleIncrease: function () {
            this.counter++;
            this.$emit(&apos;increase&apos;, this.counter);
        },
        handlereduce: function () {
            this.counter--;
            this.$emit(&apos;reduce&apos;, this.counter)
        }
    }
});

new Vue({
    el: &apos;#app&apos;,
    data: {
        total: 0
    },
    methods: {
        handleGetTotal: function (total) {
            this.total = total;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x603B;&#x6570;:"{{"total"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;my-component
            @increase=<span class="hljs-string">&quot;handleGetTotal&quot;</span> @reduce=<span class="hljs-string">&quot;handleGetTotal&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div&gt;
            &lt;button @click=&quot;handleIncrease&quot;&gt;+&lt;/button&gt;
            &lt;button @click=&quot;handlereduce&quot;&gt;-&lt;/button&gt;
        &lt;/div&gt;
        `</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleIncrease</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.counter++;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;increase&apos;</span>, <span class="hljs-keyword">this</span>.counter);
        },
        <span class="hljs-attr">handlereduce</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.counter--;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;reduce&apos;</span>, <span class="hljs-keyword">this</span>.counter)
        }
    }
});

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleGetTotal</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">total</span>) </span>{
            <span class="hljs-keyword">this</span>.total = total;
        }
    }
});</code></pre>
<p>&#x5728;&#x6539;&#x53D8;&#x7EC4;&#x4EF6;&#x7684;<code>data &quot;counter&quot;</code>&#x540E;&#xFF0C;&#x901A;&#x8FC7;<code>$emit()</code>&#x518D;&#x628A;&#x5B83;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x7528;<code>@increase</code>&#x548C;<code>@reduce</code>&#x3002;<code>$emit()</code>&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x7684;&#x540D;&#x79F0;&#x3002;</p>
<p>&#x9664;&#x4E86;&#x7528;<code>v-on</code>&#x5728;&#x7EC4;&#x4EF6;&#x4E0A;&#x76D1;&#x542C;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5916;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76D1;&#x542C;DOM&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x7528;<code>.native</code>&#x4FEE;&#x9970;&#x7B26;&#x8868;&#x793A;&#x76D1;&#x542C;&#x65F6;&#x4E00;&#x4E2A;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#xFF0C;&#x76D1;&#x542C;&#x7684;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x6839;&#x5143;&#x7D20;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;my-component @click:native=&quot;handleClick&quot;&gt;&lt;/my-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;my-component <span class="hljs-variable">@click</span><span class="hljs-symbol">:native=<span class="hljs-string">&quot;handleClick&quot;</span>&gt;&lt;/my-component&gt;</span>
</code></pre>
<h3 id="articleHeader7">&#x4F7F;&#x7528;<code>v-model</code>
</h3>
<p>Vue&#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x4E0A;&#x4F7F;&#x7528;<code>v-model</code>&#x6307;&#x4EE4;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;my-component v-model=&quot;total&quot;&gt;&lt;/my-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">my</span>-component v-model=<span class="hljs-string">&quot;total&quot;</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;
</code></pre>
<p>&#x7EC4;&#x4EF6;<code>$emit()</code>&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#x65F6;&#x7279;&#x6B8A;&#x7684;<code>input</code>&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x7236;&#x7EA7;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5728;<code>&lt;my-component&gt;</code>&#x4E0A;&#x4F7F;&#x7528;<code>@input=&quot;handler&quot;</code>&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x7528;&#x4E86;<code>v-model</code>&#x7ED1;&#x5B9A;&#x7684;&#x4E00;&#x4E2A;&#x6570;&#x636E;<code>total</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;my-component @input=&quot;handleGetTotal&quot;&gt;&lt;/my-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;<span class="hljs-selector-tag">my-component</span> @<span class="hljs-keyword">input</span>=&quot;<span class="hljs-keyword">handleGetTotal</span>&quot;&gt;&lt;/<span class="hljs-keyword">my</span>-<span class="hljs-keyword">component</span>&gt;
</code></pre>
<p><code>v-model</code>&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x8868;&#x5355;&#x8F93;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;&#x603B;&#x6570;&#xFF1A;"{{"total"}}"&lt;/p&gt;
    &lt;my-component v-model=&quot;total&quot;&gt;&lt;/my-component&gt;
    &lt;button @click=&quot;handleReduce&quot;&gt;-&lt;/button&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    props: [&apos;value&apos;],
    template: `&lt;input :value=&quot;value&quot; @input=&quot;updateValue&quot;&gt;`,
    methods: {
        updateValue: function () {
            this.$emit(&apos;input&apos;, event.target.value)
        }
    }
});

new Vue({
    el: &apos;#app&apos;,
    data: {
        total: 10
    },
    methods: {
        handleReduce: function () {
            this.total--;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x603B;&#x6570;&#xFF1A;"{{"total"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;my-component v-model=<span class="hljs-string">&quot;total&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleReduce&quot;</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;value&apos;</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;input :value=&quot;value&quot; @input=&quot;updateValue&quot;&gt;`</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">updateValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;input&apos;</span>, event.target.value)
        }
    }
});

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">total</span>: <span class="hljs-number">10</span>
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleReduce</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.total--;
        }
    }
});</code></pre>
<p>&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x5177;&#x6709;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;<code>v-model</code>&#x7EC4;&#x4EF6;&#x8981;&#x6EE1;&#x8DB3;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#x8981;&#x6C42;&#xFF1A;</p>
<ol>
<li>&#x63A5;&#x6536;&#x4E00;&#x4E2A;<code>value</code>&#x5C5E;&#x6027;</li>
<li>&#x5728;&#x6709;&#x65B0;&#x7684;<code>value</code>&#x65F6;&#x89E6;&#x53D1;<code>input</code>&#x4E8B;&#x4EF6;</li>
</ol>
<h3 id="articleHeader8">&#x975E;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h3>
<p>&#x5728;&#x5B9E;&#x9645;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;&#x9664;&#x4E86;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x975E;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x975E;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E00;&#x822C;&#x6709;&#x4E24;&#x79CD;&#xFF0C;<strong>&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;</strong>&#x548C;<strong>&#x8DE8;&#x591A;&#x7EA7;&#x7EC4;&#x4EF6;</strong>&#x3002;</p>
<p>&#x5728;<strong>Vue 1.x</strong>&#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x9664;&#x4E86;<code>$emit()</code>&#x65B9;&#x6CD5;&#x5916;&#xFF0C;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;<code>&#xFFE5;dispatch()</code>&#x548C;<code>$broadcast()</code>&#x3002;</p>
<p><code>$dispatch()</code>&#x7528;&#x4E8E;&#x5411;&#x4E0A;&#x7EA7;&#x6D3E;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EA;&#x8981;&#x662F;&#x5B83;&#x7684;&#x7236;&#x7EA7;&#xFF08;&#x4E00;&#x7EA7;&#x6216;&#x591A;&#x7EA7;&#x4EE5;&#x4E0A;&#xFF09;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x5728;Vue&#x5B9E;&#x4F8B;&#x7684;<code>events</code>&#x9009;&#x9879;&#x5185;&#x63A5;&#x6536;&#x3002;</p>
<p>&#x6B64;&#x5B9E;&#x4F8B;&#x53EA;&#x5728;Vue 1.x&#x7248;&#x672C;&#x4E2D;&#x6709;&#x6548;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;"{{"message"}}"&lt;/p&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    template: `&lt;button @click=&quot;handleDispatch&quot;&gt;&#x6D3E;&#x53D1;&#x4E8B;&#x4EF6;&lt;/button&gt;`,
    methods: {
        handleDispatch: function () {
            this.$dispatch(&apos;on-message&apos;, &apos;&#x6765;&#x81EA;&#x5185;&#x90E8;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&apos;)
        }
    }
});
new Vue({
    el: &apos;#app&apos;,
    data: {
        message: &apos;&apos;
    },
    events: {
        &apos;on-message&apos;: function (msg) {
            this.message = msg;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;my-component&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button @click=&quot;handleDispatch&quot;&gt;&#x6D3E;&#x53D1;&#x4E8B;&#x4EF6;&lt;/button&gt;`</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleDispatch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">&apos;on-message&apos;</span>, <span class="hljs-string">&apos;&#x6765;&#x81EA;&#x5185;&#x90E8;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&apos;</span>)
        }
    }
});
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&apos;</span>
    },
    <span class="hljs-attr">events</span>: {
        <span class="hljs-string">&apos;on-message&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg</span>) </span>{
            <span class="hljs-keyword">this</span>.message = msg;
        }
    }
});</code></pre>
<p><code>$broadcast()</code>&#x662F;&#x7531;&#x4E0A;&#x7EA7;&#x5411;&#x4E0B;&#x7EA7;&#x5E7F;&#x64AD;&#x4E8B;&#x4EF6;&#xFF0C;&#x7528;&#x6CD5;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#xFF0C;&#x65B9;&#x5411;&#x76F8;&#x53CD;&#x3002;</p>
<p>&#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x4E00;&#x65E6;&#x53D1;&#x51FA;&#x4E8B;&#x4EF6;&#x540E;&#xFF0C;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x90FD;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x5230;&#xFF0C;&#x5C31;&#x8FD1;&#x539F;&#x5219;&#xFF0C;&#x800C;&#x4E14;&#x4F1A;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x63A5;&#x6536;&#x5230;&#x540E;&#x505C;&#x6B62;&#x5192;&#x6CE1;&#xFF0C;&#x9664;&#x975E;&#x8FD4;&#x56DE;<code>true</code>&#x3002;</p>
<p><strong>&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x5728;Vue 2.x&#x7248;&#x672C;&#x4E2D;&#x5DF2;&#x5E9F;&#x5F03;&#x3002;</strong></p>
<p>&#x5728;Vue 2.x&#x4E2D;&#xFF0C;&#x63A8;&#x8350;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;Vue&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x4E2D;&#x592E;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#xFF08;<code>bus</code>&#xFF09;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x4E2D;&#x4ECB;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;"{{"message"}}"&lt;/p&gt;
    &lt;component-a&gt;&lt;/component-a&gt;
&lt;/div&gt;

var bus = new Vue();

Vue.component(&apos;component-a&apos;, {
    template: `&lt;button @click=&quot;handleEvent&quot;&gt;&#x4F20;&#x9012;&#x4E8B;&#x4EF6;&lt;/button&gt;`,
    methods: {
        handleEvent: function () {
            bus.$emit(&apos;on-message&apos;, &apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6;component-a&#x7684;&#x5185;&#x5BB9;&apos;)
        }
    }
});
var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        message: &apos;&apos;
    },
    mounted: function () {
        var _this = this;
        // &#x5728;&#x5B9E;&#x4F8B;&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x76D1;&#x542C;&#x6765;&#x81EA;bus&#x5B9E;&#x4F8B;&#x7684;&#x4E8B;&#x4EF6;
        bus.$on(&apos;on-message&apos;, function (msg) {
            _this.message = msg;
        })
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;component-a&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component-a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue();

Vue.component(<span class="hljs-string">&apos;component-a&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button @click=&quot;handleEvent&quot;&gt;&#x4F20;&#x9012;&#x4E8B;&#x4EF6;&lt;/button&gt;`</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            bus.$emit(<span class="hljs-string">&apos;on-message&apos;</span>, <span class="hljs-string">&apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6;component-a&#x7684;&#x5185;&#x5BB9;&apos;</span>)
        }
    }
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&apos;</span>
    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-comment">// &#x5728;&#x5B9E;&#x4F8B;&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x76D1;&#x542C;&#x6765;&#x81EA;bus&#x5B9E;&#x4F8B;&#x7684;&#x4E8B;&#x4EF6;</span>
        bus.$on(<span class="hljs-string">&apos;on-message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg</span>) </span>{
            _this.message = msg;
        })
    }
});</code></pre>
<p>&#x9996;&#x5148;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;<code>bus</code>&#x7684;&#x7A7A;&#x7684;Vue&#x5B9E;&#x4F8B;&#xFF1B;&#x7136;&#x540E;&#x5168;&#x5C40;&#x5B9A;&#x4E49;&#x4E86;&#x7EC4;&#x4EF6;<code>component-a</code>&#xFF1B;&#x6700;&#x540E;&#x521B;&#x5EFA;&#x4E86;Vue&#x5B9E;&#x4F8B;<code>app</code>&#x3002;</p>
<p>&#x5728;<code>app</code>&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5728;&#x751F;&#x547D;&#x5468;&#x671F;<code>mounted</code>&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x91CC;&#x76D1;&#x542C;&#x4E86;&#x6765;&#x81EA;<code>bus</code>&#x7684;&#x4E8B;&#x4EF6;<code>on-message</code>&#xFF0C;&#x800C;&#x5728;&#x7EC4;&#x4EF6;<code>component-a</code>&#x4E2D;&#xFF0C;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x540E;&#x4F1A;&#x901A;&#x8FC7;<code>bus</code>&#x628A;&#x4E8B;&#x4EF6;<code>on-message</code>&#x53D1;&#x51FA;&#x53BB;&#x3002;&#x6B64;&#x65F6;<code>app</code>&#x5C31;&#x4F1A;&#x63A5;&#x6536;&#x5230;&#x6765;&#x81EA;<code>bus</code>&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FDB;&#x800C;&#x5728;&#x56DE;&#x8C03;&#x91CC;&#x5B8C;&#x6210;&#x81EA;&#x5DF1;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x3002;</p>
<p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x5DE7;&#x5999;&#x800C;&#x8F7B;&#x91CF;&#x5730;&#x5B9E;&#x73B0;&#x4E86;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x5305;&#x62EC;&#x7236;&#x5B50;&#x3001;&#x5144;&#x5F1F;&#x3001;&#x8DE8;&#x7EA7;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6DF1;&#x5165;&#x4F7F;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x6269;&#x5C55;<code>bus</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x7ED9;&#x5B83;&#x6DFB;&#x52A0;<code>data</code>&#x3001;<code>methods</code>&#x3001;<code>computed</code>&#x7B49;&#x9009;&#x9879;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x516C;&#x7528;&#x7684;&#x3002;</p>
<p>&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x534F;&#x540C;&#x5F00;&#x53D1;&#x65F6;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x7ECF;&#x5E38;&#x9700;&#x8981;&#x5171;&#x4EAB;&#x4E00;&#x4E9B;&#x901A;&#x7528;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6BD4;&#x5982;&#x7528;&#x6237;&#x767B;&#x5F55;&#x7684;&#x6635;&#x79F0;&#x3001;&#x6027;&#x522B;&#x3001;&#x90AE;&#x7BB1;&#x7B49;&#xFF0C;&#x8FD8;&#x6709;&#x7528;&#x6237;&#x7684;&#x6388;&#x6743;<code>token</code>&#x7B49;&#x3002;</p>
<p>&#x53EA;&#x9700;&#x5728;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x8BA9;<code>bus</code>&#x83B7;&#x53D6;&#x4E00;&#x6B21;&#xFF0C;&#x4EFB;&#x4F55;&#x65F6;&#x95F4;&#x3001;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x4ECE;&#x4E2D;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x5355;&#x9875;&#x9762;&#x5BCC;&#x5E94;&#x7528;&#xFF08;SPA&#xFF09;&#x4E2D;&#x4F1A;&#x5F88;&#x5B9E;&#x7528;&#x3002;</p>
<p>&#x9664;&#x4E86;&#x4E2D;&#x592E;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;<code>bus</code>&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#xFF1A;&#x7236;&#x94FE;&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x7D22;&#x5F15;&#x3002;</p>
<h3 id="articleHeader9">&#x7236;&#x94FE;</h3>
<p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;<code>this.$parent</code>&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x7236;&#x5B9E;&#x4F8B;&#x6216;&#x7EC4;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this.$children</code>&#x8BBF;&#x95EE;&#x5B83;&#x6240;&#x6709;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x9012;&#x5F52;&#x5411;&#x4E0A;&#x6216;&#x5411;&#x4E0B;&#x65E0;&#x9650;&#x8BBF;&#x95EE;&#xFF0C;&#x76F4;&#x5230;&#x6839;&#x5B9E;&#x4F8B;&#x6216;&#x6700;&#x5185;&#x5C42;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;"{{"message"}}"&lt;/p&gt;
    &lt;component-a&gt;&lt;/component-a&gt;
&lt;/div&gt;

Vue.component(&apos;component-a&apos;, {
    template: `&lt;button @click=&quot;handleEvent&quot;&gt;&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;&lt;/button&gt;`,
    methods: {
        handleEvent: function () {
            this.$parent.message = &apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6;component-a&#x7684;&#x5185;&#x5BB9;&apos;
        }
    }
});
var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        message: &apos;&apos;
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;component-a&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component-a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;component-a&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button @click=&quot;handleEvent&quot;&gt;&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;&lt;/button&gt;`</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.$parent.message = <span class="hljs-string">&apos;&#x6765;&#x81EA;&#x7EC4;&#x4EF6;component-a&#x7684;&#x5185;&#x5BB9;&apos;</span>
        }
    }
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&apos;</span>
    }
});
</code></pre>
<p>&#x5C3D;&#x7BA1;Vue&#x5141;&#x8BB8;&#x8FD9;&#x6837;&#x64CD;&#x4F5C;&#xFF0C;&#x4F46;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x5C3D;&#x53EF;&#x80FD;&#x5730;&#x907F;&#x514D;&#x4F9D;&#x8D56;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x66F4;&#x4E0D;&#x5E94;&#x8BE5;&#x53BB;&#x4E3B;&#x52A8;&#x4FEE;&#x6539;&#x5B83;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x4F7F;&#x5F97;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x7D27;&#x8026;&#x5408;&#xFF0C;&#x53EA;&#x770B;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x5F88;&#x96BE;&#x7406;&#x89E3;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x53EF;&#x80FD;&#x88AB;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x4FEE;&#x6539;&#xFF0C;&#x7406;&#x60F3;&#x72B6;&#x6001;&#x4E0B;&#xFF0C;&#x53EA;&#x6709;&#x7EC4;&#x4EF6;&#x81EA;&#x5DF1;&#x80FD;&#x4FEE;&#x6539;&#x5B83;&#x7684;&#x72B6;&#x6001;&#x3002;</p>
<p><strong>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x6700;&#x597D;&#x8FD8;&#x662F;&#x901A;&#x8FC7;<code>props</code>&#x548C;<code>$emit()</code>&#x6765;&#x901A;&#x4FE1;&#x3002;</strong></p>
<h3 id="articleHeader10">&#x5B50;&#x7EC4;&#x4EF6;&#x7D22;&#x5F15;</h3>
<p>&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x8F83;&#x591A;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;<code>this.$children</code>&#x6765;&#x904D;&#x5386;&#x51FA;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x662F;&#x6BD4;&#x8F83;&#x56F0;&#x96BE;&#x7684;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x7EC4;&#x4EF6;&#x52A8;&#x6001;&#x6E32;&#x67D3;&#x65F6;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x5E8F;&#x5217;&#x662F;&#x4E0D;&#x56FA;&#x5B9A;&#x7684;&#x3002;</p>
<p>Vue&#x63D0;&#x4F9B;&#x4E86;&#x5B50;&#x7EC4;&#x4EF6;&#x7D22;&#x5F15;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027;<code>ref</code>&#x6765;&#x4E3A;&#x5B50;&#x7EC4;&#x4EF6;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;&#x540D;&#x79F0;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;button @click=&quot;handleRef&quot;&gt;&#x901A;&#x8FC7;ref&#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&lt;/button&gt;
    &lt;component-a ref=&quot;comA&quot;&gt;&lt;/component-a&gt;
&lt;/div&gt;

Vue.component(&apos;component-a&apos;, {
    template: `&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;`,
    data() {
        return {
            message: &apos;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&apos;
        }
    },
});
var app = new Vue({
    el: &apos;#app&apos;,
    methods: {
        handleRef: function () {
            // &#x901A;&#x8FC7;$refs&#x6765;&#x8BBF;&#x95EE;&#x6307;&#x5B9A;&#x7684;&#x5B9E;&#x4F8B;
            var msg = this.$refs.comA.message;
            console.log(msg);
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleRef&quot;</span>&gt;</span>&#x901A;&#x8FC7;ref&#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    &lt;component-a ref=<span class="hljs-string">&quot;comA&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component-a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;component-a&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;`</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&apos;</span>
        }
    },
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleRef</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// &#x901A;&#x8FC7;$refs&#x6765;&#x8BBF;&#x95EE;&#x6307;&#x5B9A;&#x7684;&#x5B9E;&#x4F8B;</span>
            <span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">this</span>.$refs.comA.message;
            <span class="hljs-built_in">console</span>.log(msg);
        }
    }
});</code></pre>
<p>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x4E2D;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x4E0A;&#x4F7F;&#x7528;<code>ref</code>&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x540D;&#x79F0;&#xFF0C;&#x5E76;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x5185;&#x901A;&#x8FC7;<code>this.$refs</code>&#x6765;&#x8BBF;&#x95EE;&#x6307;&#x5B9A;&#x540D;&#x79F0;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</p>
<blockquote>
<code>$refs</code>&#x53EA;&#x5728;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5B8C;&#x6210;&#x540E;&#x624D;&#x586B;&#x5145;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x662F;&#x975E;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x3002;&#x5B83;&#x4EC5;&#x4EC5;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5E94;&#x6025;&#x65B9;&#x6848;&#xFF0C;&#x5E94;&#x5F53;&#x907F;&#x514D;&#x5728;&#x6A21;&#x677F;&#x6216;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#x4F7F;&#x7528;<code>$refs</code>&#x3002;</blockquote>
<p>Vue 2.x&#x5C06;<code>v-el</code>&#x548C;<code>v-ref</code>&#x5408;&#x5E76;&#x6210;<code>ref</code>&#xFF0C;Vue&#x4F1A;&#x81EA;&#x52A8;&#x53BB;&#x5224;&#x65AD;&#x662F;&#x666E;&#x901A;&#x6807;&#x7B7E;&#x8FD8;&#x662F;&#x7EC4;&#x4EF6;&#x3002;</p>
<h1 id="articleHeader11">&#x4F7F;&#x7528;<code>slot</code>&#x5206;&#x53D1;&#x5185;&#x5BB9;</h1>
<p>&#x5F53;&#x9700;&#x8981;&#x8BA9;&#x7EC4;&#x4EF6;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x6DF7;&#x5408;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#x4E0E;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x7528;&#x5230;<code>slot</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x53EB;&#x505A;<strong>&#x5185;&#x5BB9;&#x5206;&#x53D1;</strong>&#x3002;</p>
<ul>
<li>
<code>&lt;app&gt;</code>&#x7EC4;&#x4EF6;&#x4E0D;&#x77E5;&#x9053;&#x5B83;&#x7684;&#x6302;&#x8F7D;&#x70B9;&#x4F1A;&#x6709;&#x4EC0;&#x4E48;&#x5185;&#x5BB9;&#x3002;&#x6302;&#x8F7D;&#x70B9;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x7531;<code>&lt;app&gt;</code>&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x51B3;&#x5B9A;&#x7684;&#x3002;</li>
<li>
<code>&lt;app&gt;</code>&#x7EC4;&#x4EF6;&#x5F88;&#x53EF;&#x80FD;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x6A21;&#x677F;&#x3002;</li>
</ul>
<p><code>props</code>&#x4F20;&#x9012;&#x6570;&#x636E;&#x3001;<code>events</code>&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x548C;<code>slot</code>&#x5185;&#x5BB9;&#x5206;&#x53D1;&#x5C31;&#x6784;&#x6210;&#x4E86;Vue&#x7EC4;&#x4EF6;&#x7684;3&#x4E2A;API&#x6765;&#x6E90;&#xFF0C;&#x518D;&#x590D;&#x6742;&#x7684;&#x7EC4;&#x4EF6;&#x4E5F;&#x662F;&#x7531;&#x8FD9;3&#x90E8;&#x5206;&#x6784;&#x6210;&#x3002;</p>
<h2 id="articleHeader12">&#x4F5C;&#x7528;&#x57DF;</h2>
<p>&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x6A21;&#x677F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;child-component&gt;
    "{{"message"}}"
&lt;/child-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
</span></code></pre>
<p>&#x8FD9;&#x91CC;&#x7684;<code>message</code>&#x5C31;&#x662F;&#x4E00;&#x4E2A;<code>slot</code>&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7EC4;&#x4EF6;<code>&lt;child-component&gt;</code>&#x7684;&#x6570;&#x636E;&#x3002;</p>
<p>&#x7236;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7F16;&#x8BD1;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7F16;&#x8BD1;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component v-modle=&quot;showChild&quot;&gt;&lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
    template: `&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;1&lt;/div&gt;`,
});
var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        showChild: true
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">v-modle</span>=<span class="hljs-string">&quot;showChild&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;&#x5B50;&#x7EC4;&#x4EF6;1&lt;/div&gt;`</span>,
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">showChild</span>: <span class="hljs-literal">true</span>
    }
});
</code></pre>
<p>&#x8FD9;&#x91CC;&#x7684;&#x72B6;&#x6001;<code>showChild</code>&#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x3002;</p>
<p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0A;&#x7ED1;&#x5B9A;&#x6570;&#x636E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;&lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
    template: `&lt;div v-model=&quot;showChild&quot;&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;`,
    data() {
        return {
            showChild: true
        }
    }
});
var app = new Vue({
    el: &apos;#app&apos;,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div v-model=&quot;showChild&quot;&gt;&#x5B50;&#x7EC4;&#x4EF6;&lt;/div&gt;`</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">showChild</span>: <span class="hljs-literal">true</span>
        }
    }
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
});
</code></pre>
<p>&#x56E0;&#x6B64;&#xFF0C;<strong><code>slot</code>&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;</strong>&#x3002;</p>
<h2 id="articleHeader13">&#x5355;&#x4E2A;<code>slot</code>
</h2>
<p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x4F7F;&#x7528;&#x7279;&#x6B8A;&#x7684;<code>&lt;slot&gt;</code>&#x5143;&#x7D20;&#x5C31;&#x53EF;&#x4EE5;&#x4E3A;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x5F00;&#x542F;&#x4E00;&#x4E2A;<code>slot</code>&#xFF08;&#x63D2;&#x69FD;&#xFF09;&#xFF0C;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x91CC;&#xFF0C;&#x63D2;&#x5165;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x5185;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x5C06;&#x66FF;&#x4EE3;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;<code>&lt;slot&gt;</code>&#x6807;&#x7B7E;&#x53CA;&#x5B83;&#x7684;&#x5185;&#x5BB9;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;p&gt;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
    &lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
    template: `
    &lt;div&gt;
        &lt;slot&gt;
           &lt;p&gt;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7236;&#x7EC4;&#x4EF6;&#x63D2;&#x5165;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x5C06;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x51FA;&#x73B0;&#x3002;&lt;/p&gt;
        &lt;/slot&gt;
    &lt;/div&gt;
            `,
});
var app = new Vue({
    el: &apos;#app&apos;,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Vue.component(&apos;child-component&apos;, {
    template: `
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7236;&#x7EC4;&#x4EF6;&#x63D2;&#x5165;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x5C06;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x51FA;&#x73B0;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            `,
});
var app = new Vue({
    el: &apos;#app&apos;,
});
</code></pre>
<p>&#x5B50;&#x7EC4;&#x4EF6;<code>child-component</code>&#x7684;&#x6A21;&#x677F;&#x5185;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;<code>&lt;slot&gt;</code>&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x7528;&#x4E00;&#x4E2A;<code>&lt;p&gt;</code>&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x4F7F;&#x7528;<code>slot</code>&#x65F6;&#xFF0C;&#x4F1A;&#x6E32;&#x67D3;&#x8FD9;&#x6BB5;&#x9ED8;&#x8BA4;&#x7684;&#x6587;&#x672C;&#xFF1B;&#x5982;&#x679C;&#x5199;&#x5165;&#x4E86;<code>slot</code>&#xFF0C;&#x5C31;&#x4F1A;&#x66FF;&#x6362;&#x6574;&#x4E2A;<code>&lt;slot&gt;</code>&#x3002;</p>
<blockquote>&#x5B50;&#x7EC4;&#x4EF6;<code>&lt;slot&gt;</code>&#x5185;&#x7684;&#x5907;&#x7528;&#x5185;&#x5BB9;&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x3002;</blockquote>
<h2 id="articleHeader14">&#x5177;&#x540D;<code>Slot</code>
</h2>
<p>&#x7ED9;<code>&lt;slot&gt;</code>&#x5143;&#x7D20;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;<code>name</code>&#x540E;&#x53EF;&#x4EE5;&#x5206;&#x53D1;&#x591A;&#x4E2A;&#x5185;&#x5BB9;&#xFF0C;&#x5177;&#x540D;<code>slot</code>&#x53EF;&#x4EE5;&#x4E0E;&#x5355;&#x4E2A;<code>slot</code>&#x5171;&#x5B58;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;h2 slot=&quot;header&quot;&gt;&#x6807;&#x9898;&lt;/h2&gt;
        &lt;p&gt;&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;div slot=&quot;footer&quot;&gt;&#x5E95;&#x90E8;&#x4FE1;&#x606F;&lt;/div&gt;
    &lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
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
});
var app = new Vue({
    el: &apos;#app&apos;,
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>&#x6807;&#x9898;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>&#x5E95;&#x90E8;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Vue.component(&apos;child-component&apos;, {
    template: `
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
    `,
});
var app = new Vue({
    el: &apos;#app&apos;,
});</code></pre>
<p>&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x58F0;&#x660E;&#x4E86;3&#x4E2A;<code>&lt;slot&gt;</code>&#x5143;&#x7D20;&#xFF0C;&#x5176;&#x4E2D;&#x5728;<code>&lt;div class=&quot;main&quot;&gt;</code>&#x5185;&#x7684;<code>&lt;slot&gt;</code>&#x6CA1;&#x6709;&#x4F7F;&#x7528;<code>name</code>&#x7279;&#x6027;&#xFF0C;&#x5B83;&#x5C06;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;<code>slot</code>&#x51FA;&#x73B0;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x4F7F;&#x7528;<code>slot</code>&#x7279;&#x6027;&#x7684;&#x5143;&#x7D20;&#x4E0E;&#x5185;&#x5BB9;&#x90FD;&#x5C06;&#x51FA;&#x73B0;&#x5728;&#x8FD9;&#x91CC;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x7684;&#x533F;&#x540D;<code>slot</code>&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x5185;&#x591A;&#x4F59;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x5C06;&#x88AB;&#x629B;&#x5F03;&#x3002;</p>
<p><strong>&#x5728;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x5185;&#x5BB9;&#x5206;&#x53D1;API&#x81F3;&#x5173;&#x91CD;&#x8981;&#x3002;</strong></p>
<h2 id="articleHeader15">&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;</h2>
<p>&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x662F;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7684;<code>slot</code>&#xFF0C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x590D;&#x7528;&#x7684;&#x6A21;&#x677F;&#x66FF;&#x6362;&#x5DF2;&#x6E32;&#x67D3;&#x5143;&#x7D20;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;template scope=&quot;props&quot;&gt;
            &lt;p&gt;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
            &lt;p&gt;"{{"props.msg"}}"&lt;/p&gt;
        &lt;/template&gt;
    &lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
    template: `
&lt;div class=&quot;container&quot;&gt;
    &lt;slot msg=&quot;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&quot;&gt;&lt;/slot&gt;
&lt;/div&gt; 
    `,
});
var app = new Vue({
    el: &apos;#app&apos;,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">&quot;props&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"props.msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Vue.component(&apos;child-component&apos;, {
    template: `
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">&quot;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
    `,
});
var app = new Vue({
    el: &apos;#app&apos;,
});
</span></code></pre>
<p>&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x5728;<code>&lt;slot&gt;</code>&#x5143;&#x7D20;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;<code>props</code>&#x4F20;&#x9012;&#x6570;&#x636E;&#x7ED9;&#x7EC4;&#x4EF6;&#x7684;&#x5199;&#x6CD5;<code>msg=&quot;xxx&quot;</code>&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x4F20;&#x9012;&#x5230;&#x63D2;&#x69FD;&#x3002;</p>
<p>&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;<code>&lt;template&gt;</code>&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x4E14;&#x62E5;&#x6709;&#x4E00;&#x4E2A;<code>scope=&quot;props&quot;</code>&#x7684;&#x7279;&#x6027;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;<code>props</code>&#x662F;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x53D8;&#x91CF;&#x3002;</p>
<p><code>template</code>&#x5185;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E34;&#x65F6;&#x53D8;&#x91CF;<code>props</code>&#x8BBF;&#x95EE;&#x6765;&#x81EA;&#x5B50;&#x7EC4;&#x4EF6;&#x63D2;&#x69FD;&#x7684;&#x6570;&#x636E;<code>msg</code>&#x3002;</p>
<p><strong>&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x66F4;&#x5177;&#x4EE3;&#x8868;&#x6027;&#x7684;&#x7528;&#x4F8B;&#x662F;&#x5217;&#x8868;&#x7EC4;&#x4EF6;&#xFF0C;&#x5141;&#x8BB8;&#x7EC4;&#x4EF6;&#x81EA;&#x5B9A;&#x4E49;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x6E32;&#x67D3;&#x5217;&#x8868;&#x6BCF;&#x4E00;&#x9879;&#x3002;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-list :book=&quot;books&quot;&gt;
        &lt;!--&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x540D;&#x7684;Slot--&gt;
        &lt;template slot=&quot;book&quot; scope=&quot;props&quot;&gt;
            &lt;li&gt;"{{"props.bookName"}}"&lt;/li&gt;
        &lt;/template&gt;
    &lt;/my-list&gt;
&lt;/div&gt;

Vue.component(&apos;my-list&apos;, {
    props: {
        books: {
            type: Array,
            default: function () {
                return [];

            }
        }
    },
    template: `
&lt;ul&gt;
    &lt;slot name=&quot;book&quot; v-for=&quot;book in books&quot; :book-name=&quot;book.name&quot;&gt;&lt;/slot&gt;
&lt;/ul&gt;
    `,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-list</span> <span class="hljs-attr">:book</span>=<span class="hljs-string">&quot;books&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x540D;&#x7684;Slot--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;book&quot;</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">&quot;props&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"props.bookName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">my-list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Vue.component(&apos;my-list&apos;, {
    props: {
        books: {
            type: Array,
            default: function () {
                return [];

            }
        }
    },
    template: `
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;book&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;book in books&quot;</span> <span class="hljs-attr">:book-name</span>=<span class="hljs-string">&quot;book.name&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    `,
});
</span></code></pre>
<p>&#x5B50;&#x7EC4;&#x4EF6;<code>my-list</code>&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x6765;&#x81EA;&#x7236;&#x7EA7;&#x7684;<code>prop</code>&#x6570;&#x7EC4;<code>books</code>&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x5B83;&#x5728;<code>name</code>&#x4E3A;<code>book</code>&#x7684;<code>slot</code>&#x4E0A;&#x4F7F;&#x7528;<code>v-for</code>&#x6307;&#x4EE4;&#x5FAA;&#x73AF;&#xFF0C;&#x540C;&#x65F6;&#x66B4;&#x9732;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;<code>bookName</code>&#x3002;</p>
<p><strong>&#x4F5C;&#x7528;&#x57DF;&#x63D2;&#x69FD;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x662F;&#x65E2;&#x53EF;&#x4EE5;&#x590D;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;<code>slot</code>&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x4F7F;<code>slot</code>&#x5185;&#x5BB9;&#x4E0D;&#x4E00;&#x81F4;&#x3002;</strong></p>
<h2 id="articleHeader16">&#x8BBF;&#x95EE;<code>slot</code>
</h2>
<p>Vue 2.x&#x63D0;&#x4F9B;&#x4E86;&#x7528;&#x6765;&#x8BBF;&#x95EE;&#x88AB;<code>slot</code>&#x5206;&#x53D1;&#x7684;&#x5185;&#x5BB9;&#x7684;&#x65B9;&#x6CD5;<code>$slots</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;
        &lt;h2 slot=&quot;header&quot;&gt;&#x6807;&#x9898;&lt;/h2&gt;
        &lt;p&gt;&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;p&gt;&#x66F4;&#x591A;&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;&lt;/p&gt;
        &lt;div slot=&quot;footer&quot;&gt;&#x5E95;&#x90E8;&#x4FE1;&#x606F;&lt;/div&gt;
    &lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
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
    mounted: function () {
        var header = this.$slots.header;
        var main = this.$slots.default;
        var footer = this.$slots.footer;
        console.log(footer);
        console.log(footer[0].elm.innerHTML);
    }
});
var app = new Vue({
    el: &apos;#app&apos;,
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>&#x6807;&#x9898;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x66F4;&#x591A;&#x6B63;&#x6587;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>&#x5E95;&#x90E8;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Vue.component(&apos;child-component&apos;, {
    template: `
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
    `,
    mounted: function () {
        var header = this.$slots.header;
        var main = this.$slots.default;
        var footer = this.$slots.footer;
        console.log(footer);
        console.log(footer[0].elm.innerHTML);
    }
});
var app = new Vue({
    el: &apos;#app&apos;,
});</code></pre>
<p>&#x901A;&#x8FC7;<code>$slots</code>&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x67D0;&#x4E2A;&#x5177;&#x540D;<code>slot</code>,<code>this.$slots.default</code>&#x5305;&#x62EC;&#x4E86;&#x6240;&#x6709;&#x6CA1;&#x6709;&#x88AB;&#x5305;&#x542B;&#x5728;&#x5177;&#x540D;<code>slot</code>&#x4E2D;&#x7684;&#x8282;&#x70B9;&#x3002;</p>
<h1 id="articleHeader17">&#x7EC4;&#x4EF6;&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;</h1>
<h2 id="articleHeader18">&#x9012;&#x5F52;&#x7EC4;&#x4EF6;</h2>
<p>&#x7ED9;&#x7EC4;&#x4EF6;&#x8BBE;&#x7F6E;<code>name</code>&#x9009;&#x9879;&#xFF0C;&#x7EC4;&#x4EF6;&#x5728;&#x5B83;&#x7684;&#x6A21;&#x677F;&#x5185;&#x53EF;&#x4EE5;&#x9012;&#x5F52;&#x5730;&#x8C03;&#x7528;&#x81EA;&#x5DF1;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component :count=&quot;1&quot;&gt;&lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
    name: &apos;child-component&apos;,
    props: {
        count: {
            type: Number,
            default: 1
        }
    },
    template: `
&lt;div class=&quot;child&quot;&gt;
    &lt;child-component :count=&quot;count+1&quot; v-if=&quot;count&lt;3&quot;&gt;&lt;/child-component&gt;
&lt;/div&gt;
    `,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;child-component :<span class="hljs-built_in">count</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;&lt;/child-component&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

Vue.component(&apos;child-component&apos;, {
    <span class="hljs-built_in">name</span>: &apos;child-component&apos;,
    props: {
        <span class="hljs-built_in">count</span>: {
            type: Number,
            default: <span class="hljs-number">1</span>
        }
    },
    template: `
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;
    &lt;child-component :<span class="hljs-built_in">count</span>=<span class="hljs-string">&quot;count+1&quot;</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;count&lt;3&quot;</span>&gt;&lt;/child-component&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
    `,
});
</code></pre>
<p>&#x7EC4;&#x4EF6;&#x9012;&#x5F52;&#x4F7F;&#x7528;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5F00;&#x53D1;&#x4E00;&#x4E9B;&#x5177;&#x6709;&#x672A;&#x77E5;&#x5C42;&#x7EA7;&#x5173;&#x673A;&#x7684;&#x72EC;&#x7ACB;&#x7EC4;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#x7EA7;&#x8054;&#x9009;&#x62E9;&#x5668;&#x548C;&#x6811;&#x5F62;&#x63A7;&#x4EF6;&#x7B49;&#x3002;</p>
<h2 id="articleHeader19">&#x5185;&#x8054;&#x6A21;&#x677F;</h2>
<p>&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x5728;<code>template</code>&#x9009;&#x9879;&#x5185;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;Vue&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5185;&#x8054;&#x6A21;&#x677F;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x7ED9;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x4F7F;&#x7528;<code>inline-template</code>&#x7279;&#x6027;&#xFF0C;&#x7EC4;&#x4EF6;&#x5C31;&#x4F1A;&#x628A;&#x5B83;&#x7684;&#x5185;&#x5BB9;&#x5F53;&#x505A;&#x6A21;&#x677F;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x628A;&#x5B83;&#x5F53;&#x5185;&#x5BB9;&#x5206;&#x53D1;&#xFF0C;&#x8FD9;&#x8BA9;&#x6A21;&#x677F;&#x66F4;&#x7075;&#x6D3B;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component inline-template&gt;
        &lt;div&gt;
            &lt;h2&gt;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&lt;/h2&gt;
            &lt;p&gt;"{{"message"}}"&lt;/p&gt;
            &lt;p&gt;"{{"msg"}}"&lt;/p&gt;
        &lt;/div&gt;
    &lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, {
    data() {
        return {
            msg: &apos;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;&apos;
        }
    }
});
var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        message: &apos;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;&apos;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">inline-template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"msg"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, {
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;&apos;</span>
        }
    }
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;&apos;</span>
    }
});</code></pre>
<p>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;<code>message</code>&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x6570;&#x636E;<code>msg</code>&#xFF0C;&#x4E24;&#x4E2A;&#x90FD;&#x53EF;&#x4EE5;&#x6E32;&#x67D3;&#xFF08;&#x5982;&#x679C;&#x540C;&#x540D;&#xFF0C;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF09;&#x3002;<strong>&#x8FD9;&#x662F;&#x5185;&#x8054;&#x6A21;&#x677F;&#x7684;&#x7F3A;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x4F5C;&#x7528;&#x57DF;&#x6BD4;&#x8F83;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x975E;&#x5E38;&#x7279;&#x6B8A;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x5EFA;&#x8BAE;&#x4E0D;&#x8981;&#x8F7B;&#x6613;&#x4F7F;&#x7528;&#x5185;&#x8054;&#x6A21;&#x677F;</strong>&#x3002;</p>
<h2 id="articleHeader20">&#x52A8;&#x6001;&#x7EC4;&#x4EF6;</h2>
<p>Vue.js&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x5143;&#x7D20;<code>&lt;component&gt;</code>&#x7528;&#x6765;&#x52A8;&#x6001;&#x5730;&#x6302;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;<code>is</code>&#x7279;&#x6027;&#x6765;&#x9009;&#x62E9;&#x8981;&#x6302;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;button @click=&quot;handleChangeView(&apos;A&apos;)&quot;&gt;&#x5207;&#x6362;&#x5230;A&lt;/button&gt;
    &lt;button @click=&quot;handleChangeView(&apos;B&apos;)&quot;&gt;&#x5207;&#x6362;&#x5230;B&lt;/button&gt;
    &lt;button @click=&quot;handleChangeView(&apos;C&apos;)&quot;&gt;&#x5207;&#x6362;&#x5230;C&lt;/button&gt;
    &lt;component :is=&quot;currentView&quot;&gt;&lt;/component&gt;
&lt;/div&gt;

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        currentView: &apos;comA&apos;
    },
    components: {
        comA: {
            template: `&lt;div&gt;&#x7EC4;&#x4EF6;A&lt;/div&gt;`
        },
        comB: {
            template: `&lt;div&gt;&#x7EC4;&#x4EF6;B&lt;/div&gt;`
        },
        comC: {
            template: `&lt;div&gt;&#x7EC4;&#x4EF6;C&lt;/div&gt;`
        },
    },
    methods: {
        handleChangeView: function (component) {
            this.currentView = &apos;com&apos; + component
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleChangeView(&apos;A&apos;)&quot;</span>&gt;</span>&#x5207;&#x6362;&#x5230;A<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleChangeView(&apos;B&apos;)&quot;</span>&gt;</span>&#x5207;&#x6362;&#x5230;B<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleChangeView(&apos;C&apos;)&quot;</span>&gt;</span>&#x5207;&#x6362;&#x5230;C<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;currentView&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        currentView: &apos;comA&apos;
    },
    components: {
        comA: {
            template: `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x7EC4;&#x4EF6;A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`
        },
        comB: {
            template: `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x7EC4;&#x4EF6;B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`
        },
        comC: {
            template: `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x7EC4;&#x4EF6;C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`
        },
    },
    methods: {
        handleChangeView: function (component) {
            this.currentView = &apos;com&apos; + component
        }
    }
});</code></pre>
<p>&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7ED1;&#x5B9A;&#x5728;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;&#x4E0A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;component :is=&quot;currentView&quot;&gt;&lt;/component&gt;
&lt;/div&gt;

var Home = {
    template: `&lt;p&gt;Welcome home!&lt;/p&gt;`
};

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        currentView: Home
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs nimrod"><code>&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;component :<span class="hljs-keyword">is</span>=<span class="hljs-string">&quot;currentView&quot;</span>&gt;&lt;/component&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

<span class="hljs-keyword">var</span> <span class="hljs-type">Home</span> = {
    <span class="hljs-keyword">template</span>: `&lt;p&gt;<span class="hljs-type">Welcome</span> home!&lt;/p&gt;`
};

<span class="hljs-keyword">var</span> app = new <span class="hljs-type">Vue</span>({
    el: &apos;<span class="hljs-comment">#app&apos;,</span>
    data: {
        currentView: <span class="hljs-type">Home</span>
    }
});
</code></pre>
<h2 id="articleHeader21">&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;</h2>
<p>Vue.js&#x5141;&#x8BB8;&#x5C06;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x4E3A;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x52A8;&#x6001;&#x5730;&#x89E3;&#x6790;&#x7EC4;&#x4EF6;&#x3002;</p>
<p>Vue.js&#x53EA;&#x5728;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x6E32;&#x67D3;&#x65F6;&#x89E6;&#x53D1;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x628A;&#x7ED3;&#x679C;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x7528;&#x4E8E;&#x540E;&#x9762;&#x7684;&#x518D;&#x6B21;&#x6E32;&#x67D3;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child-component&gt;&lt;/child-component&gt;
&lt;/div&gt;

Vue.component(&apos;child-component&apos;, function (resolve, reject) {
    window.setTimeout(function () {
        resolve({
            template: `&lt;div&gt;&#x6211;&#x662F;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#x7684;&#xFF01;&lt;/div&gt;`
        })
    }, 1000)
});

var app = new Vue({
    el: &apos;#app&apos;,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;child-component&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        resolve({
            <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;&#x6211;&#x662F;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#x7684;&#xFF01;&lt;/div&gt;`</span>
        })
    }, <span class="hljs-number">1000</span>)
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
});
</code></pre>
<p>&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A;<code>resolve</code>&#x56DE;&#x8C03;&#xFF0C;&#x5728;&#x6536;&#x5230;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x65F6;&#x8C03;&#x7528;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x8C03;&#x7528;<code>reject(reason)</code>&#x6307;&#x793A;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x3002;</p>
<h1 id="articleHeader22">&#x5176;&#x4ED6;</h1>
<h2 id="articleHeader23"><code>$nextTick</code></h2>
<p><strong>&#x5F02;&#x6B65;&#x66F4;&#x65B0;&#x961F;&#x5217;</strong></p>
<p>Vue&#x5728;&#x89C2;&#x5BDF;&#x5230;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x66F4;&#x65B0;DOM&#xFF0C;&#x800C;&#x662F;&#x5F00;&#x542F;&#x4E00;&#x4E2A;&#x961F;&#x5217;&#xFF0C;&#x5E76;&#x7F13;&#x51B2;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x4E2D;&#x53D1;&#x751F;&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;&#x53D8;&#x5316;&#x3002;&#x5728;&#x7F13;&#x51B2;&#x65F6;&#x4F1A;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x6570;&#x636E;&#xFF0C;&#x4ECE;&#x800C;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x8BA1;&#x7B97;&#x548C;DOM&#x64CD;&#x4F5C;&#x3002;&#x7136;&#x540E;&#xFF0C;&#x5728;&#x4E00;&#x4E0B;&#x4E2A;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;<code>tick</code>&#x4E2D;&#xFF0C;Vue&#x5237;&#x65B0;&#x961F;&#x5217;&#x5E76;&#x6267;&#x884C;&#x5B9E;&#x9645;&#xFF08;&#x5DF2;&#x53BB;&#x91CD;&#x7684;&#xFF09;&#x5DE5;&#x4F5C;&#x3002;</p>
<p>Vue&#x4F1A;&#x6839;&#x636E;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684;<code>Promise.then</code>&#x548C;<code>MutationObserver</code>&#xFF0C;&#x5982;&#x679C;&#x90FD;&#x4E0D;&#x652F;&#x6301;&#xFF0C;&#x5C31;&#x4F1A;&#x91C7;&#x7528;<code>setTimeout</code>&#x4EE3;&#x66FF;&#x3002;</p>
<p><strong><code>$nextTick</code>&#x5C31;&#x662F;&#x7528;&#x6765;&#x786E;&#x5B9A;&#x4EC0;&#x4E48;&#x65F6;&#x5019;DOM&#x66F4;&#x65B0;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div id=&quot;div&quot; v-if=&quot;showDiv&quot;&gt;&#x8FD9;&#x662F;&#x4E00;&#x6BB5;&#x6587;&#x672C;&lt;/div&gt;
    &lt;button @click=&quot;getText&quot;&gt;&#x83B7;&#x53D6;div&#x5185;&#x5BB9;&lt;/button&gt;
&lt;/div&gt;

var app = new Vue({
    el: &apos;#app&apos;,
    data: {
        showDiv: false
    },
    methods: {
        getText: function () {
            this.showDiv = true;
            this.$nextTick(function () {
                var text = document.getElementById(&apos;div&apos;);
                console.log(text.innerHTML);
            })
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;div id=<span class="hljs-string">&quot;div&quot;</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;showDiv&quot;</span>&gt;&#x8FD9;&#x662F;&#x4E00;&#x6BB5;&#x6587;&#x672C;&lt;/div&gt;
    &lt;button @click=<span class="hljs-string">&quot;getText&quot;</span>&gt;&#x83B7;&#x53D6;div&#x5185;&#x5BB9;&lt;/button&gt;
&lt;/div&gt;

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&apos;#app&apos;</span>,
    data: {
        showDiv: <span class="hljs-literal">false</span>
    },
    methods: {
        getText: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.showDiv = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">var</span> text = document.getElementById(<span class="hljs-string">&apos;div&apos;</span>);
                console.log(text.innerHTML);
            })
        }
    }
});</code></pre>
<h2 id="articleHeader24"><code>X-Templates</code></h2>
<p>Vue&#x63D0;&#x4F9B;&#x4E86;&#x53E6;&#x4E00;&#x79CD;&#x5B9A;&#x4E49;&#x6A21;&#x677F;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5728;<code>&lt;script&gt;</code>&#x6807;&#x7B7E;&#x4E2D;&#x4F7F;&#x7528;<code>text/x-template</code>&#x7C7B;&#x578B;&#xFF0C;&#x5E76;&#x4E14;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;<code>id</code>&#xFF0C;&#x5C06;&#x8FD9;&#x4E2A;<code>id</code>&#x8D4B;&#x7ED9;<code>template</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
    &lt;script type=&quot;text/x-template&quot; id=&quot;my-component&quot;&gt;
        &lt;div&gt;&#x8FD9;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&lt;/div&gt;
    &lt;/script&gt;
&lt;/div&gt;

Vue.component(&apos;my-component&apos;, {
    template: `#my-component`,
});
var app = new Vue({
    el: &apos;#app&apos;,
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/x-template&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;my-component&quot;</span>&gt;</span><span class="handlebars"><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x8FD9;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`#my-component`</span>,
});
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
});
</code></pre>
<h2 id="articleHeader25">&#x624B;&#x52A8;&#x6302;&#x8F7D;&#x5B9E;&#x4F8B;</h2>
<p>&#x5728;&#x4E00;&#x4E9B;&#x975E;&#x5E38;&#x7279;&#x6B8A;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x9700;&#x8981;&#x52A8;&#x6001;&#x5730;&#x521B;&#x5EFA;Vue&#x5B9E;&#x4F8B;&#xFF0C;Vue&#x63D0;&#x4F9B;&#x4E86;<code>Vue.extend</code>&#x548C;<code>$mount</code>&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x624B;&#x52A8;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;</p>
<p><code>Vue.extend</code>&#x662F;&#x57FA;&#x7840;Vue&#x6784;&#x9020;&#x5668;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x201C;&#x5B50;&#x7C7B;&#x201D;&#xFF0C;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x9009;&#x9879;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p>
<p>&#x5982;&#x679C;Vue&#x5B9E;&#x4F8B;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x6CA1;&#x6709;&#x6536;&#x5230;<code>el</code>&#x9009;&#x9879;&#xFF0C;&#x5B83;&#x5C31;&#x5904;&#x4E8E;&#x201C;&#x672A;&#x6302;&#x8F7D;&#x201D;&#x72B6;&#x6001;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x8054;&#x7684;DOM&#x5143;&#x7D20;&#x3002;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>$mount</code>&#x624B;&#x52A8;&#x5730;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;&#x672A;&#x6302;&#x8F7D;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;&#x81EA;&#x8EAB;&#xFF0C;&#x56E0;&#x800C;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x5176;&#x4ED6;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;

var MyComponent = Vue.extend({
    template: `&lt;div&gt;Hello "{{"name"}}"&lt;/div&gt;`,
    data() {
        return {
            name: &apos;Andy&apos;
        }
    }
});
new MyComponent().$mount(&apos;#app&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;

var MyComponent = Vue.extend({
    template: `&lt;<span class="hljs-keyword">div</span>&gt;Hello "{{"<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;`,
    data() {
<span class="hljs-built_in">        return</span> {
            <span class="hljs-built_in">name</span>: &apos;Andy&apos;
        }
    }
});
new MyComponent().$mount(&apos;<span class="hljs-comment">#app&apos;);</span></code></pre>
<p>&#x9664;&#x4E86;&#x4EE5;&#x4E0A;&#x5199;&#x6CD5;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new MyComponent().$mount(&quot;#app&quot;);

new MyComponent({
    el: &apos;#app&apos;
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">MyComponent</span>().$mount(<span class="hljs-string">&quot;#app&quot;</span>);

<span class="hljs-keyword">new</span> <span class="hljs-type">MyComponent</span>({
    el: <span class="hljs-type"></span>&apos;<span class="hljs-meta">#app&apos;</span>
})
</code></pre>
<p><strong>&#x624B;&#x52A8;&#x6302;&#x8F7D;&#x5B9E;&#x4F8B;&#xFF08;&#x7EC4;&#x4EF6;&#xFF09;&#x662F;&#x4E00;&#x79CD;&#x6BD4;&#x8F83;&#x6781;&#x7AEF;&#x7684;&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;&#xFF0C;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x51E0;&#x4E4E;&#x7528;&#x4E0D;&#x5230;&#xFF0C;&#x53EA;&#x5728;&#x5F00;&#x53D1;&#x4E00;&#x4E9B;&#x590D;&#x6742;&#x7684;&#x72EC;&#x7ACB;&#x7EC4;&#x4EF6;&#x65F6;&#x53EF;&#x80FD;&#x4F1A;&#x4F7F;&#x7528;&#x3002;   </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-组件详解

## 原文链接
[https://segmentfault.com/a/1190000015199363](https://segmentfault.com/a/1190000015199363)


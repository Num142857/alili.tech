---
title: 'Vue.js入门教程-组件注册' 
date: 2018-11-29 9:27:39
hidden: true
slug: 35esz0ofrk2
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;</h2>
<h3 id="articleHeader1">1.1 &#x521B;&#x5EFA;&#x6B65;&#x9AA4;</h3>
<p>&#x521B;&#x5EFA;Vue&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x6709;&#x4E09;&#x4E2A;&#x57FA;&#x672C;&#x6B65;&#x9AA4;&#x662F; &#x3010;&#x2460;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;&#x3001;&#x2461;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x548C;&#x2462;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x3011;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bV4jY4?w=388&amp;h=639" src="https://static.alili.tech/img/bV4jY4?w=388&amp;h=639" alt="&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;" title="&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">1.2 &#x57FA;&#x672C;&#x793A;&#x4F8B;</h3>
<p>&#x6BD4;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Button&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668; 
let myButton = Vue.extend({ 
    // &#x6A21;&#x677F;&#x9009;&#x9879;
    template: `&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;` 
}) 

// 2. &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x6307;&#x5B9A;&#x7EC4;&#x4EF6;&#x7684;&#x6807;&#x7B7E;&#xFF0C;&#x7EC4;&#x4EF6;&#x7684;HTML&#x6807;&#x7B7E;&#x4E3A;&lt;my-button&gt; 
Vue.component(&apos;my-button&apos;, myButton) // &#x7EC4;&#x4EF6;&#x540D; &#x6784;&#x9020;&#x5668;

// &#x521B;&#x5EFA;Vue&#x5B9E;&#x4F8B; 
let app = new Vue({ 
    el: &apos;#app&apos; 
}) " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 1. &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668; </span>
<span class="hljs-keyword">let</span> myButton = Vue.extend({ 
    <span class="hljs-comment">// &#x6A21;&#x677F;&#x9009;&#x9879;</span>
    template: <span class="hljs-string">`&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;`</span> 
}) 

<span class="hljs-comment">// 2. &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x6307;&#x5B9A;&#x7EC4;&#x4EF6;&#x7684;&#x6807;&#x7B7E;&#xFF0C;&#x7EC4;&#x4EF6;&#x7684;HTML&#x6807;&#x7B7E;&#x4E3A;&lt;my-button&gt; </span>
Vue.component(<span class="hljs-string">&apos;my-button&apos;</span>, myButton) <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x540D; &#x6784;&#x9020;&#x5668;</span>

<span class="hljs-comment">// &#x521B;&#x5EFA;Vue&#x5B9E;&#x4F8B; </span>
<span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({ 
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span> 
}) </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- 3. #app&#x662F;Vue&#x5B9E;&#x4F8B;&#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20; --&gt; 
&lt;div id=&quot;app&quot;&gt; 
    &lt;my-button /&gt; 
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 3. #app&#x662F;Vue&#x5B9E;&#x4F8B;&#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20; --&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">my-button</span> /&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4jY7?w=919&amp;h=379" src="https://static.alili.tech/img/bV4jY7?w=919&amp;h=379" alt="Button&#x7EC4;&#x4EF6;" title="Button&#x7EC4;&#x4EF6;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">1.3 &#x8BF4;&#x660E;</h3>
<p>&#xFF08;1&#xFF09;Vue.extend() &#x662F;Vue&#x6784;&#x9020;&#x5668;&#x7684;&#x6269;&#x5C55;&#xFF0C;&#x8C03;&#x7528; <strong>Vue.extend()</strong> &#x521B;&#x5EFA;&#x7684;&#x662F;&#x4E00;&#x4E2A;<strong>&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;</strong>&#xFF1B;</p>
<p>&#xFF08;2&#xFF09;Vue.extend() &#x6784;&#x9020;&#x5668;&#x6709;&#x4E00;&#x4E2A;<strong>&#x9009;&#x9879;&#x5BF9;&#x8C61;</strong>&#xFF0C;&#x9009;&#x9879;&#x5BF9;&#x8C61;&#x7684; <strong>template</strong> &#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x5B9A;&#x4E49;<strong>&#x7EC4;&#x4EF6;&#x8981;&#x6E32;&#x67D3;&#x7684;HTML</strong>&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7528;&#x6765;&#x5B9A;&#x4E49;<strong>&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;</strong>&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x7684;HTML&#x7ED3;&#x6784;&#xFF09;&#xFF1B;</p>
<p>&#xFF08;3&#xFF09;&#x4F7F;&#x7528; <strong>Vue.component() &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;</strong>&#xFF0C;&#x5728;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x65F6;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<strong>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x6807;&#x7B7E;</strong>&#xFF08;my-button&#xFF09;&#xFF0C;<strong>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;</strong>&#xFF08;myButton&#xFF09;&#xFF1B;</p>
<p>&#xFF08;4&#xFF09;<strong>&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x6302;&#x8F7D;&#x5230;Vue&#x5B9E;&#x4F8B;</strong>&#xFF0C;&#x5426;&#x5219;&#x4E0D;&#x4F1A;&#x751F;&#x6548;&#x3002;&#x8FD9;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x7279;&#x522B;&#x7684;&#x6CE8;&#x610F;&#x3002;&#x53E6;&#x5916;&#x540C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x6302;&#x8F7D;&#x5230;&#x591A;&#x4E2A;Vue&#x5B9E;&#x4F8B;&#x3002;</p>
<h2 id="articleHeader4">&#x4E8C;&#x3001;&#x5168;&#x5C40;&#x6CE8;&#x518C;</h2>
<p>&#xFF08;1&#xFF09;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <strong>Vue.component(tagName, options)</strong> &#x53EF;&#x4EE5;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;<strong>&#x5168;&#x5C40;&#x7684;&#x7EC4;&#x4EF6;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5B83;&#x4EEC;&#x5728;&#x6CE8;&#x518C;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x4EFB;&#x4F55;&#x65B0;&#x521B;&#x5EFA;&#x7684; Vue &#x6839;&#x5B9E;&#x4F8B; (new Vue) &#x7684;&#x6A21;&#x677F;&#x4E2D;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myButton = Vue.extend({ 
    template: `&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;` 
}) 

Vue.component(&apos;my-button&apos;, myButton) " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> myButton = Vue.extend({ 
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;`</span> 
}) 

Vue.component(<span class="hljs-string">&apos;my-button&apos;</span>, myButton) </code></pre>
<p>&#xFF08;2&#xFF09;&#x5982;&#x4E0A;&#x5199;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x7B80;&#x5199;&#x4E3A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-button&apos;, { 
    template: `&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;` 
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">&apos;my-button&apos;</span>, { 
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;`</span> 
})</code></pre>
<p>&#xFF08;3&#xFF09;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x4E4B;&#x540E;&#xFF0C;&#x4FBF;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;<strong>&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;</strong> &lt;my-button /&gt;&#xFF0C;&#x5728;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x4F7F;&#x7528;&#x3002;&#x3010;&#x6CE8;&#x610F;&#x3011;<strong>&#x5728;&#x521D;&#x59CB;&#x5316;&#x6839;&#x5B9E;&#x4F8B;&#x4E4B;&#x524D;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt; 
    &lt;my-button /&gt; 
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">my-button</span> /&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#xFF08;4&#xFF09;&#x3010;&#x6CE8;&#x610F;&#x3011;&#x5BF9;&#x4E8E;<strong>&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x7684;&#x547D;&#x540D;</strong>&#xFF0C;Vue&#x4E0D;&#x5F3A;&#x5236;&#x9075;&#x5FAA;W3C&#x89C4;&#x5219;&#xFF08;&#x5C0F;&#x5199;&#xFF0C;&#x5E76;&#x4E14;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x77ED;&#x6760;&#xFF09;&#xFF0C;&#x5C3D;&#x7BA1;&#x8FD9;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#x3002;</p>
<h2 id="articleHeader5">&#x4E09;&#x3001;&#x5C40;&#x90E8;&#x6CE8;&#x518C;</h2>
<p>&#xFF08;1&#xFF09;&#x901A;&#x8FC7;&#x67D0;&#x4E2A;Vue&#x5B9E;&#x4F8B;/&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x9009;&#x9879; <strong>components</strong> &#x6CE8;&#x518C;&#xFF0C;&#x4F7F;&#x7528;&#x8BE5;&#x9009;&#x9879;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&#x88AB;&#x79F0;&#x4E3A;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myButton = Vue.extend({ 
    template: `&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;` 
})

let app = new Vue({ 
    el: &apos;#app&apos;,
    components: {
        &apos;my-button&apos;:myButton
    }
}) " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> myButton = Vue.extend({ 
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;`</span> 
})

<span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({ 
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">components</span>: {
        <span class="hljs-string">&apos;my-button&apos;</span>:myButton
    }
}) </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt; 
    &lt;my-button /&gt; 
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">my-button</span> /&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#xFF08;2&#xFF09;&#x5F97;&#x5230;&#x7684;&#x6548;&#x679C;&#x548C;&#x6CE8;&#x518C;&#x5168;&#x5C40;&#x7EC4;&#x4EF6;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5728;<strong>&#x53E6;&#x4E00;&#x4E2A;</strong>Vue&#x5B9E;&#x4F8B;&#x4E2D;&#x8C03;&#x7528;&#x6CE8;&#x518C;&#x7684;&#x5C40;&#x90E8;&#x7EC4;&#x4EF6;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;<strong>&#x4E0D;&#x4F1A;&#x751F;&#x6548;</strong>&#x3002;&#x6BD4;&#x5982;&#x5728;app2&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E2D;&#x8C03;&#x7528;app&#x4E2D;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;my-button&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x751F;&#x6548;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app2&quot;&gt; 
    &lt;my-button /&gt; 
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app2&quot;</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">my-button</span> /&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4jY3?w=832&amp;h=351" src="https://static.alili.tech/img/bV4jY3?w=832&amp;h=351" alt="&#x5C40;&#x90E8;&#x6CE8;&#x518C;" title="&#x5C40;&#x90E8;&#x6CE8;&#x518C;" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">&#x56DB;&#x3001;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x8BED;&#x6CD5;&#x7CD6;</h2>
<h3 id="articleHeader7">4.1 &#x4F5C;&#x7528;</h3>
<blockquote>&#x4EE5;&#x4E0A;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x4E9B;&#x7E41;&#x9501;&#xFF0C;Vue&#x4E3A;&#x4E86;<strong>&#x7B80;&#x5316;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x7684;&#x8FC7;&#x7A0B;</strong>&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x6CE8;&#x518C;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;</blockquote>
<h3 id="articleHeader8">4.2 &#x5168;&#x5C40;&#x6CE8;&#x518C;&#x5199;&#x6CD5;</h3>
<p>&#xFF08;1&#xFF09;&#x4F7F;&#x7528; Vue.component() <strong>&#x76F4;&#x63A5;&#x521B;&#x5EFA;&#x548C;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6CE8;&#x518C;&#x5168;&#x5C40;&#x7EC4;&#x4EF6; my-button
Vue.component(&apos;my-button&apos;, { 
    template: `&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;` 
})

let app = new Vue({ 
    el: &apos;#app&apos; 
}) " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6CE8;&#x518C;&#x5168;&#x5C40;&#x7EC4;&#x4EF6; my-button</span>
Vue.component(<span class="hljs-string">&apos;my-button&apos;</span>, { 
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;`</span> 
})

<span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({ 
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span> 
}) </code></pre>
<p>&#xFF08;2&#xFF09;Vue.component() &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x7EC4;&#x4EF6;<strong>&#x6807;&#x7B7E;&#x540D;&#x79F0;</strong>&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;<strong>&#x9009;&#x9879;&#x5BF9;&#x8C61;</strong>&#xFF0C;&#x4F7F;&#x7528;&#x9009;&#x5BF9;&#x8C61;&#x7684; template &#x5C5E;&#x6027;&#x5B9A;&#x4E49;<strong>&#x7EC4;&#x4EF6;&#x6A21;&#x677F;</strong>&#x3002;</p>
<p>&#xFF08;3&#xFF09;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;Vue&#x5728;&#x80CC;&#x540E;&#x4F1A;<strong>&#x81EA;&#x52A8;&#x8C03;&#x7528;</strong> Vue.extend()&#x6765;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;&#x3002;</p>
<h3 id="articleHeader9">4.3 &#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x5199;&#x6CD5;</h3>
<p>&#xFF08;1&#xFF09;&#x5728;&#x9009;&#x9879;&#x5BF9;&#x8C61; <strong>components</strong> &#x5C5E;&#x6027;&#x4E2D;&#x6CE8;&#x518C;&#x5C40;&#x90E8;&#x7EC4;&#x4EF6;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let app = new Vue({ 
    el: &apos;#app&apos;,
    components: {
        &apos;my-button&apos;: {
            template: `&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;` 
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({ 
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">components</span>: {
        <span class="hljs-string">&apos;my-button&apos;</span>: {
            <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;`</span> 
        }
    }
})</code></pre>
<p>&#xFF08;2&#xFF09;&#x3010;&#x6CE8;&#x610F;&#x3011;&#x5C3D;&#x7BA1;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x7B80;&#x5316;&#x4E86;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#xFF0C;&#x4F46;&#x5728;template&#x9009;&#x9879;&#x4E2D;&#x62FC;&#x63A5;HTML&#x5143;&#x7D20;&#x8FD8;&#x662F;&#x76F8;&#x5F53;&#x7684;&#x9EBB;&#x70E6;&#xFF0C;&#x5C3D;&#x7BA1;ES6&#x7684;&#x8BED;&#x6CD5;&#x8BA9;&#x4E8B;&#x60C5;&#x53D8;&#x5F97;&#x7B80;&#x5355;&#x4E86;&#x4E0D;&#x5C11;&#xFF0C;&#x4F46;&#x4E5F;&#x5C06;&#x5BFC;&#x81F4;<strong>HTML&#x548C;JavaScript&#x7684;&#x9AD8;&#x8026;&#x5408;&#x6027;</strong>&#x3002;</p>
<p>&#xFF08;3&#xFF09;&#x3010;&#x5176;&#x4ED6;&#x65B9;&#x5F0F;&#x3011;&#x5E86;&#x5E78;&#x7684;&#x662F;&#xFF0C;Vue&#x9664;&#x4E86;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#x8BED;&#x6CD5;&#x7CD6;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x5982;&#x4E0B;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-button&apos;, { 
    template: &apos;#my-button&apos; 
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">&apos;my-button&apos;</span>, { 
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;#my-button&apos;</span> 
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template id=&quot;my-button&quot;&gt;
    &lt;button&gt;&#x70B9;&#x51FB;&#x6211;&lt;/button&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;my-button&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x70B9;&#x51FB;&#x6211;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p><a href="https://segmentfault.com/u/webing123">&#x9605;&#x8BFB;&#x66F4;&#x591A;</a><br>&#x66F4;&#x591A;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;GitHub&#x7684;&#x5730;&#x5740; <a href="https://github.com/WEBING123/blog" rel="nofollow noreferrer" target="_blank">Vue.js&#x5165;&#x95E8;&#x6559;&#x7A0B;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js入门教程-组件注册

## 原文链接
[https://segmentfault.com/a/1190000015157007](https://segmentfault.com/a/1190000015157007)


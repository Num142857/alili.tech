---
title: 'Vue.js入门教程-组件数据传递' 
date: 2018-11-29 9:27:38
hidden: true
slug: bnh0yas0wtc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x7EC4;&#x4EF6;&#x57FA;&#x7840;</h2>
<h3 id="articleHeader1">1.1 &#x57FA;&#x672C;&#x793A;&#x4F8B;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; button-counter &#x7684;&#x65B0;&#x7EC4;&#x4EF6;
Vue.component(&apos;button-counter&apos;, {
  data: function () {
    return {
      count: 0
    }
  },
  template: &apos;&lt;button v-on:click=&quot;count++&quot;&gt;You clicked me "{{" count "}}" times.&lt;/button&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; button-counter &#x7684;&#x65B0;&#x7EC4;&#x4EF6;</span>
Vue.component(<span class="hljs-string">&apos;button-counter&apos;</span>, {
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },
  <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;button v-on:click=&quot;count++&quot;&gt;You clicked me "{{" count "}}" times.&lt;/button&gt;&apos;</span>
})</code></pre>
<p>&#xFF08;1&#xFF09;&#x7EC4;&#x4EF6;&#x662F;&#x53EF;&#x590D;&#x7528;&#x7684; Vue &#x5B9E;&#x4F8B;&#xFF0C;&#x4E14;&#x5E26;&#x6709;&#x4E00;&#x4E2A;<strong>&#x540D;&#x5B57;</strong>&#xFF1A;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x662F; <strong>&lt;button-counter&gt;</strong>&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x4E00;&#x4E2A;&#x901A;&#x8FC7; <strong>new Vue &#x521B;&#x5EFA;&#x7684; Vue &#x6839;&#x5B9E;&#x4F8B;</strong>&#x4E2D;&#xFF0C;&#x628A;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;<strong>&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;&#x6765;&#x4F7F;&#x7528;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;components-demo&quot;&gt;
  &lt;button-counter&gt;&lt;/button-counter&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;components-demo&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({ 
    el: &apos;#components-demo&apos; 
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-keyword">new</span> Vue({ 
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#components-demo&apos;</span> 
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbJ4K?w=754&amp;h=98" src="https://static.alili.tech/img/bVbbJ4K?w=754&amp;h=98" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<p>&#xFF08;2&#xFF09;&#x56E0;&#x4E3A;&#x7EC4;&#x4EF6;&#x662F;&#x53EF;&#x590D;&#x7528;&#x7684; Vue &#x5B9E;&#x4F8B;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x4EEC;<strong>&#x4E0E; new Vue &#x63A5;&#x6536;&#x76F8;&#x540C;&#x7684;&#x9009;&#x9879;</strong>&#xFF0C;&#x4F8B;&#x5982; data&#x3001;computed&#x3001;watch&#x3001;methods &#x4EE5;&#x53CA;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x7B49;&#x3002;&#x4EC5;&#x6709;&#x7684;&#x4F8B;&#x5916;&#x662F;&#x50CF; <strong>el</strong> &#x8FD9;&#x6837;<strong>&#x6839;&#x5B9E;&#x4F8B;&#x7279;&#x6709;&#x7684;&#x9009;&#x9879;</strong>&#x3002;</p>
<h3 id="articleHeader2">1.2 &#x7EC4;&#x4EF6;&#x590D;&#x7528;</h3>
<p>&#xFF08;1&#xFF09;&#x4F60;&#x53EF;&#x4EE5;&#x5C06;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x4EFB;&#x610F;&#x6B21;&#x6570;&#x7684;&#x590D;&#x7528;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;components-demo&quot;&gt;
  &lt;button-counter&gt;&lt;/button-counter&gt;
  &lt;button-counter&gt;&lt;/button-counter&gt;
  &lt;button-counter&gt;&lt;/button-counter&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;components-demo&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbJ6K?w=752&amp;h=100" src="https://static.alili.tech/img/bVbbJ6K?w=752&amp;h=100" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<p>&#xFF08;2&#xFF09;&#x6CE8;&#x610F;&#x5F53;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;<strong>&#x5404;&#x81EA;&#x72EC;&#x7ACB;&#x7EF4;&#x62A4;</strong>&#x5B83;&#x7684; <strong>count</strong>&#x3002;&#x56E0;&#x4E3A;&#x4F60;&#x6BCF;&#x7528;&#x4E00;&#x6B21;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5B83;&#x7684;<strong>&#x65B0;&#x5B9E;&#x4F8B;</strong>&#x88AB;&#x521B;&#x5EFA;&#x3002;</p>
<h3 id="articleHeader3">1.3 data &#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;</h3>
<p>&#xFF08;1&#xFF09;&#x5F53;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x8FD9;&#x4E2A; &lt;button-counter&gt; &#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;&#x5B83;&#x7684; data <strong>&#x5E76;&#x4E0D;&#x662F;</strong>&#x50CF;&#x8FD9;&#x6837;&#x76F4;&#x63A5;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;<strong>&#x5BF9;&#x8C61;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: {
  count: 0
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data: {
  <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
}</code></pre>
<p>&#xFF08;2&#xFF09;&#x53D6;&#x800C;&#x4EE3;&#x4E4B;&#x7684;&#x662F;&#xFF0C;<strong>&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684; data &#x9009;&#x9879;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</strong>&#xFF0C;&#x56E0;&#x6B64;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x53EF;&#x4EE5;&#x7EF4;&#x62A4;&#x4E00;&#x4EFD;&#x88AB;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x7684;&#x72EC;&#x7ACB;&#x7684;&#x62F7;&#x8D1D;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: function () {
  return {
    count: 0
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
  }
}</code></pre>
<p>&#xFF08;3&#xFF09;&#x5982;&#x679C; Vue &#x6CA1;&#x6709;&#x8FD9;&#x6761;&#x89C4;&#x5219;&#xFF0C;&#x70B9;&#x51FB;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x5C31;&#x53EF;&#x80FD;&#x4F1A;&#x50CF;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x4E00;&#x6837;<strong>&#x5F71;&#x54CD;&#x5230;&#x5176;&#x5B83;&#x6240;&#x6709;&#x5B9E;&#x4F8B;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbKbL?w=750&amp;h=100" src="https://static.alili.tech/img/bVbbKbL?w=750&amp;h=100" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">&#x4E8C;&#x3001;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;</h2>
<h3 id="articleHeader5">2.1 &#x589E;&#x5F3A;&#x6A21;&#x5757;&#x5316;</h3>
<p>&#xFF08;1&#xFF09;&#x5728; Vue &#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#xFF0C;&#x76EE;&#x7684;&#x4E00;&#x822C;&#x5C31;&#x662F; <strong>&#x63D0;&#x9AD8;&#x4EE3;&#x7801;&#x590D;&#x7528;&#x7387;&#xFF0C;&#x589E;&#x5F3A;&#x6A21;&#x5757;&#x5316;</strong>&#xFF0C;&#x4ECE;&#x800C;&#x964D;&#x4F4E;&#x5F00;&#x53D1;&#x6210;&#x672C;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x6211;&#x4EEC;&#x5728; Vue &#x4E2D;&#x4F7F;&#x7528;<strong>&#x7EC4;&#x5408;&#x7EC4;&#x4EF6;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;A&#x7EC4;&#x4EF6;&#x4E2D;&#x5305;&#x542B;&#x4E86;B&#x7EC4;&#x4EF6;&#x3002;&#x800C;&#x7EC4;&#x4EF6;&#x4E0E;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x76F8;&#x4E92;&#x4F7F;&#x7528;&#x907F;&#x514D;&#x4E0D;&#x4E86;&#x6570;&#x636E;&#x4E4B;&#x95F4;&#x7684;&#x4F20;&#x9012;&#x3002;&#x90A3;&#x4E48; Vue &#x4E2D;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x662F;&#x5982;&#x4F55;&#x4F20;&#x9012;&#x7684;&#x5462;&#xFF1F;</p>
<h3 id="articleHeader6">2.2 &#x6570;&#x636E;&#x4F20;&#x9012;</h3>
<p>&#xFF08;1&#xFF09;&#x9996;&#x5148;&#x8981;&#x8BF4;&#x660E;&#xFF0C;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x4F20;&#x9012;<strong>&#x4E0D;&#x540C;&#x4E8E;</strong>Vue&#x5168;&#x5C40;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;&#xFF0C;<strong>&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x7684;&#x6570;&#x636E;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5B64;&#x7ACB;&#x7684;</strong>&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x8FD9;&#x91CC;&#x7684;&#x5B64;&#x7ACB;&#x5E76;<strong>&#x4E0D;&#x4EC5;&#x4EC5;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x72EC;&#x7ACB;</strong>&#xFF0C;&#x800C;&#x4E14;&#x662F;&#x6307;<strong>&#x4E0A;&#x4E0B;&#x5C42;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x9694;&#x79BB;</strong>&#xFF0C;&#x5373;<strong>&#x4E0D;&#x80FD;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x5185;&#x76F4;&#x63A5;&#x5F15;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;</strong>&#x3002;&#x5982;&#x679C;&#x8981;&#x628A;&#x6570;&#x636E;&#x4ECE;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x4F7F;&#x7528;<strong>props</strong>&#x5C5E;&#x6027;&#x3002;&#x8FD9;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x7528;&#x6765;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x4E00;&#x4E2A;<strong>&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;</strong>&#x3002;</p>
<h2 id="articleHeader7">&#x4E09;&#x3001;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x6D41;&#x5411;</h2>
<h3 id="articleHeader8">3.1 &#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x5173;&#x7CFB;</h3>
<p>&#xFF08;1&#xFF09;&#x5728;Vue&#x7684;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x63D0;&#x5230;&#xFF0C;&#x5728;Vue&#x4E2D;&#xFF0C;<strong>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5173;&#x7CFB;</strong> &#x3010;<strong>prop&#x5411;&#x4E0B;&#x4F20;&#x9012;&#xFF0C;&#x4E8B;&#x4EF6;&#x5411;&#x4E0A;&#x4F20;&#x9012;</strong>&#x3011;&#x3002;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;prop&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;<strong>&#x4E0B;&#x53D1;&#x6570;&#x636E;</strong>&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;<strong>&#x4E8B;&#x4EF6;</strong>&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;<strong>&#x53D1;&#x9001;&#x6D88;&#x606F;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVLRG0?w=790&amp;h=646" src="https://static.alili.tech/img/bVLRG0?w=790&amp;h=646" alt="&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x6D41;&#x5411;" title="&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x6D41;&#x5411;" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">3.2 &#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</h3>
<p>&#xFF08;1&#xFF09;&#x5E38;&#x628A;&#x8FD9;&#x79CD;&#x6570;&#x636E;&#x6D41;&#x79F0;&#x4E4B;&#x4E3A;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x3002;<strong>prop&#x662F;&#x5355;&#x5411;&#x7ED1;&#x5B9A;&#x7684;</strong>&#xFF0C;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x5C06;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;<strong>&#x53CD;&#x8FC7;&#x6765;&#x4E0D;&#x4F1A;</strong>&#x3002;&#x8FD9;&#x662F;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x5B50;&#x7EC4;&#x4EF6;&#x65E0;&#x610F;&#x95F4;&#x4FEE;&#x6539;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x6765;&#x907F;&#x514D;&#x5E94;&#x7528;&#x7684;&#x6570;&#x636E;&#x6D41;&#x53D8;&#x5F97;&#x96BE;&#x4EE5;&#x7406;&#x89E3;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x53E6;&#x5916;&#xFF0C;&#x6BCF;&#x6B21;&#x7236;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6240;&#x6709;prop&#x90FD;&#x4F1A;&#x66F4;&#x65B0;&#x4E3A;&#x6700;&#x65B0;&#x503C;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x4F60;<strong>&#x4E0D;&#x5E94;&#x8BE5;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x6539;&#x53D8;prop</strong>&#x3002;&#x5982;&#x679C;&#x4F60;&#x8FD9;&#x4E48;&#x505A;&#x4E86;&#xFF0C;Vue&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x7ED9;&#x51FA;&#x8B66;&#x544A;&#x3002;</p>
<h2 id="articleHeader10">&#x56DB;&#x3001;Prop&#x4F7F;&#x7528;</h2>
<h3 id="articleHeader11">4.1 &#x57FA;&#x672C;&#x793A;&#x4F8B;</h3>
<p>&#xFF08;1&#xFF09;&#x9996;&#x5148;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<strong>&#x5B50;&#x7EC4;&#x4EF6;</strong>child&#xFF0C;&#x5E76;&#x4E14;&#x5728;Vue&#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;data&#x9009;&#x9879;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let parent = new Vue ({
    el:&quot;#app&quot;,
    data () {
        return {
            name: &apos;WEBING&apos;,
            job: &apos;front-end-development&apos;
        }
    },
    components: {
        &apos;child&apos;: {
            template: &apos;#child&apos;,
            props: [&apos;myName&apos;,&apos;myJob&apos;]
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> parent = <span class="hljs-keyword">new</span> Vue ({
    <span class="hljs-attr">el</span>:<span class="hljs-string">&quot;#app&quot;</span>,
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;WEBING&apos;</span>,
            <span class="hljs-attr">job</span>: <span class="hljs-string">&apos;front-end-development&apos;</span>
        }
    },
    <span class="hljs-attr">components</span>: {
        <span class="hljs-string">&apos;child&apos;</span>: {
            <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;#child&apos;</span>,
            <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;myName&apos;</span>,<span class="hljs-string">&apos;myJob&apos;</span>]
        }
    }
});</code></pre>
<p>&#xFF08;2&#xFF09;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x628A;Vue&#x5B9E;&#x4F8B; <strong>parent</strong> &#x5F53;&#x4F5C;&#x7EC4;&#x4EF6;child&#x7684;<strong>&#x7236;&#x7EC4;&#x4EF6;</strong>&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x4F7F;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5219;&#x5FC5;&#x987B;&#x5148;&#x5728;<strong>&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;props</strong>&#xFF0C;&#x5373;&#xFF1A;props:[&apos;myName&apos;, &apos;myJob&apos;]&#x3002;</p>
<p>&#xFF08;3&#xFF09;&#x63A5;&#x4E0B;&#x6765;&#x5B9A;&#x4E49;<strong>child&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template id=&quot;child&quot;&gt; 
    &lt;div class=&quot;child&quot;&gt; 
        &lt;h3&gt;&#x5B50;&#x7EC4;&#x4EF6;child&#x6570;&#x636E;&lt;/h3&gt; 
        &lt;ul&gt; 
            &lt;li&gt; 
                &lt;label&gt;&#x59D3;&#x540D;&lt;/label&gt; 
                &lt;span&gt;"{{" myName "}}"&lt;/span&gt; 
            &lt;/li&gt; 
            &lt;li&gt; 
                &lt;label&gt;&#x5DE5;&#x4F5C;&lt;/label&gt; 
                &lt;span&gt;"{{" myJob "}}"&lt;/span&gt; 
            &lt;/li&gt; 
        &lt;/ul&gt; 
    &lt;/div&gt; 
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x5B50;&#x7EC4;&#x4EF6;child&#x6570;&#x636E;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span> 
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span> 
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> 
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x59D3;&#x540D;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span> 
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" myName "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> 
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> 
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x5DE5;&#x4F5C;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span> 
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" myJob "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> 
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span> 
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>&#xFF08;4&#xFF09;&#x5C06;&#x7236;&#x7EC4;&#x4EF6;parent&#x7684;data&#x901A;&#x8FC7;&#x5DF2;&#x5B9A;&#x4E49;&#x597D;&#x7684;<strong>props</strong>&#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;child :my-name=&quot;name&quot; :my-job=&quot;job&quot;&gt;&lt;/child&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:my-name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">:my-job</span>=<span class="hljs-string">&quot;job&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#xFF08;5&#xFF09;&#x7ED9;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x6DFB;&#x52A0;CSS&#x6837;&#x5F0F;&#xFF0C;&#x6700;&#x7EC8;&#x770B;&#x5230;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbLf5?w=648&amp;h=248" src="https://static.alili.tech/img/bVbbLf5?w=648&amp;h=248" alt="props" title="props" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">4.2 Prop &#x5927;&#x5C0F;&#x5199;</h3>
<p>&#xFF08;1&#xFF09;&#x7531;&#x4E8E;HTML&#x7279;&#x6027;&#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5728;<strong>&#x5B50;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;prop</strong>&#x65F6;&#xFF0C;&#x4F7F;&#x7528;&#x4E86;<strong>&#x9A7C;&#x5CF0;&#x5F0F;&#x5927;&#x5C0F;&#x5199;&#xFF08;camelCase&#xFF09;</strong>&#x547D;&#x540D;&#x6CD5;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x9A7C;&#x5CF0;&#x5F0F;&#x5927;&#x5C0F;&#x5199;&#x7684;prop&#x7528;&#x4E8E;<strong>&#x7279;&#x6027;</strong>&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x8F6C;&#x4E3A;<strong>&#x77ED;&#x6A2A;&#x7EBF;&#x9694;&#x5F00;&#xFF08;kebab-case&#xFF09;</strong>&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5728;prop&#x4E2D;&#x5B9A;&#x4E49;&#x7684;myName&#xFF0C;&#x5728;&#x7528;&#x4F5C;<strong>&#x7279;&#x6027;</strong>&#x65F6;&#x9700;&#x8981;&#x8F6C;&#x6362;&#x4E3A;<strong>my-name</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let parent = new Vue ({
    // ...
    components: {
        &apos;child&apos;: {
            props: [&apos;myName&apos;,&apos;myJob&apos;] // &#x5728; JavaScript &#x4E2D;&#x662F; camelCase &#x7684;
            // ...
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> parent = <span class="hljs-keyword">new</span> Vue ({
    <span class="hljs-comment">// ...</span>
    components: {
        <span class="hljs-string">&apos;child&apos;</span>: {
            <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;myName&apos;</span>,<span class="hljs-string">&apos;myJob&apos;</span>] <span class="hljs-comment">// &#x5728; JavaScript &#x4E2D;&#x662F; camelCase &#x7684;</span>
            <span class="hljs-comment">// ...</span>
        }
    }
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x5728; HTML &#x4E2D;&#x662F; kebab-case &#x7684; --&gt;
&lt;div id=&quot;app&quot;&gt;
    &lt;child :my-name=&quot;name&quot; :my-job=&quot;job&quot;&gt;&lt;/child&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- &#x5728; HTML &#x4E2D;&#x662F; kebab-case &#x7684; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:my-name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">:my-job</span>=<span class="hljs-string">&quot;job&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#xFF08;3&#xFF09;&#x3010;&#x6CE8;&#x610F;&#x3011;&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;<strong>&#x5B57;&#x7B26;&#x4E32;&#x6A21;&#x677F;</strong>&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x9650;&#x5236;&#x5C31;&#x4E0D;&#x5B58;&#x5728;&#x4E86;&#x3002;</p>
<h3 id="articleHeader13">4.3 Prop&#x8BED;&#x6CD5;</h3>
<p>&#xFF08;1&#xFF09;&#x5728;<strong>&#x7236;&#x7EC4;&#x4EF6;</strong>&#x4F7F;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x8BED;&#x6CD5;<strong>&#x5C06;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;child :&#x5B50;&#x7EC4;&#x4EF6;&#x7684;prop=&quot;&#x7236;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x5C5E;&#x6027;&quot;&gt;&lt;/child&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:</span>&#x5B50;&#x7EC4;&#x4EF6;&#x7684;<span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;&#x7236;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x5C5E;&#x6027;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></code></pre>
<p>&#xFF08;2&#xFF09;&#x3010;&#x6CE8;&#x610F;&#x3011;:&#x5176;&#x5B9E;&#x76F8;&#x5F53;&#x4E8E;v-bind&#xFF0C;&#x4E5F;&#x5C31;&#x662F;Vue&#x4E2D;&#x7684;v-bind&#x6307;&#x4EE4;&#x3002;&#x8FD9;&#x662F;&#x5C5E;&#x4E8E;&#x52A8;&#x6001;&#x7ED1;&#x5B9A;&#xFF0C;&#x8BA9;&#x5B83;&#x7684;&#x503C;&#x88AB;&#x5F53;&#x4F5C;JavaScript&#x8868;&#x8FBE;&#x5F0F;&#x8BA1;&#x7B97;&#x3002;</p>
<h2 id="articleHeader14">&#x4E94;&#x3001;Prop&#x7ED1;&#x5B9A;&#x7C7B;&#x578B;</h2>
<blockquote>&#x5728;Vue&#x4E2D;&#x7684;prop&#x7ED1;&#x5B9A;&#x4E3B;&#x8981;&#x6709;&#x2460;<strong>&#x5355;&#x5411;&#x7ED1;&#x5B9A;</strong>&#x548C;&#x2461;<strong>&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#xFF08;&#x89C1;&#x540E;&#x7EED;&#x6587;&#x7AE0;&#xFF09;</strong>&#x3002;</blockquote>
<h2 id="articleHeader15">&#x516D;&#x3001;&#x5355;&#x5411;&#x7ED1;&#x5B9A;</h2>
<h3 id="articleHeader16">6.1 &#x6570;&#x636E;&#x5355;&#x5411;&#x6D41;&#x52A8;</h3>
<p>&#xFF08;1&#xFF09;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5728; <strong>Vue 2.0</strong> &#x4E2D;&#x7EC4;&#x4EF6;&#x7684;props&#x7684;&#x6570;&#x636E;&#x6D41;&#x52A8;&#x6539;&#x4E3A;&#x4E86;<strong>&#x5355;&#x5411;&#x6D41;&#x52A8;</strong>;</p>
<p>&#xFF08;2&#xFF09;&#x5373;&#x53EA;&#x80FD;&#x7531;&#x7EC4;&#x4EF6;&#x5916;&#xFF08;&#x8C03;&#x7528;&#x7EC4;&#x4EF6;&#x65B9;&#xFF09;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x7684;DOM&#x5C5E;&#x6027;attribute&#x4F20;&#x9012;props&#x7ED9;&#x7EC4;&#x4EF6;&#x5185;&#xFF0C;<strong>&#x7EC4;&#x4EF6;&#x5185;&#x53EA;&#x80FD;&#x88AB;&#x52A8;&#x63A5;&#x53D7;&#x7EC4;&#x4EF6;&#x5916;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#xFF0C;&#x4E0D;&#x80FD;&#x4FEE;&#x6539;&#x7531;&#x5916;&#x5C42;&#x4F20;&#x6765;&#x7684;props&#x6570;&#x636E;&#x3002;</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbbM4e?w=688&amp;h=314" src="https://static.alili.tech/img/bVbbM4e?w=688&amp;h=314" alt="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" title="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" style="cursor: pointer;"></span></p>
<h3 id="articleHeader17">6.2 &#x7236;&#x7EC4;&#x4EF6;&#x5F71;&#x54CD;&#x5B50;&#x7EC4;&#x4EF6;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div class=&quot;parent&quot;&gt;
        &lt;h3&gt;&#x7236;&#x7EC4;&#x4EF6;Parent&#x6570;&#x636E;&lt;/h3&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;label&gt;&#x59D3;&#x540D;&lt;/label&gt;
                &lt;span&gt;"{{" name "}}"&lt;/span&gt;
                &lt;input type=&quot;text&quot; v-model=&quot;name&quot; /&gt;
            &lt;/li&gt;
            &lt;li&gt;
                &lt;label&gt;&#x5DE5;&#x4F5C;&lt;/label&gt;
                &lt;span&gt;"{{" job "}}"&lt;/span&gt;
                &lt;input type=&quot;text&quot; v-model=&quot;job&quot; /&gt;
            &lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;child :my-name=&quot;name&quot; :my-job=&quot;job&quot;&gt;&lt;/child&gt;
&lt;/div&gt;

&lt;template id=&quot;child&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;
        &lt;h3&gt;&#x5B50;&#x7EC4;&#x4EF6;Child&#x6570;&#x636E;&lt;/h3&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;label&gt;&#x59D3;&#x540D;&lt;/label&gt;
                &lt;span&gt;"{{" myName "}}"&lt;/span&gt;
                &lt;input type=&quot;text&quot; v-model=&quot;myName&quot; /&gt;
            &lt;/li&gt;
            &lt;li&gt;
                &lt;label&gt;&#x5DE5;&#x4F5C;&lt;/label&gt;
                &lt;span&gt;"{{" myJob "}}"&lt;/span&gt;
                &lt;input type=&quot;text&quot; v-model=&quot;myJob&quot; /&gt;
            &lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x7236;&#x7EC4;&#x4EF6;Parent&#x6570;&#x636E;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x59D3;&#x540D;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" name "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;name&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x5DE5;&#x4F5C;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" job "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;job&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:my-name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">:my-job</span>=<span class="hljs-string">&quot;job&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x5B50;&#x7EC4;&#x4EF6;Child&#x6570;&#x636E;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x59D3;&#x540D;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" myName "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;myName&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x5DE5;&#x4F5C;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" myJob "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;myJob&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let parent = new Vue({
  el: &apos;#app&apos;,
  data () {
    return {
      name: &apos;WEBING&apos;,
      job: &apos;FE&apos;
    }
  },
  components: {
    &apos;child&apos;: {
      template: &apos;#child&apos;,
      props: [&apos;myName&apos;, &apos;myJob&apos;]
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> parent = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;WEBING&apos;</span>,
      <span class="hljs-attr">job</span>: <span class="hljs-string">&apos;FE&apos;</span>
    }
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">&apos;child&apos;</span>: {
      <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;#child&apos;</span>,
      <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;myName&apos;</span>, <span class="hljs-string">&apos;myJob&apos;</span>]
    }
  }
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbM5u?w=989&amp;h=284" src="https://static.alili.tech/img/bVbbM5u?w=989&amp;h=284" alt="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" title="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" style="cursor: pointer;"></span></p>
<p>&#xFF08;1&#xFF09;&#x4EE5;&#x4E0B;&#x793A;&#x4F8B;<strong>&#x4FEE;&#x6539;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x6570;&#x636E;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbNaH?w=800&amp;h=222" src="https://static.alili.tech/img/bVbbNaH?w=800&amp;h=222" alt="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" title="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" style="cursor: pointer;"></span></p>
<p>&#xFF08;2&#xFF09;&#x4ECE;&#x4E0A;&#x9762;&#x4FEE;&#x6539;&#x7236;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x5F97;&#x5230;&#x7684;&#x6548;&#x679C;&#x53EF;&#x4EE5;&#x544A;&#x8BC9;&#x6211;&#x4EEC; &#x3010;<strong>&#x4FEE;&#x6539;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x5C06;&#x4F1A;&#x5F71;&#x54CD;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x4F1A;&#x5BF9;&#x5E94;&#x7684;&#x4FEE;&#x6539;</strong>&#x3011;</p>
<p>&#xFF08;3&#xFF09;&#x4EE5;&#x4E0B;&#x793A;&#x4F8B;<strong>&#x4FEE;&#x6539;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbNfR?w=800&amp;h=556" src="https://static.alili.tech/img/bVbbNfR?w=800&amp;h=556" alt="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" title="&#x5355;&#x5411;&#x7ED1;&#x5B9A;" style="cursor: pointer;"></span></p>
<p>&#xFF08;4&#xFF09;&#x4ECE;&#x6548;&#x679C;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x51FA; &#x3010;<strong>&#x4FEE;&#x6539;&#x5B50;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;</strong>&#x3011;&#xFF08;&#x8B66;&#x544A;&#x4FE1;&#x606F;&#x7684;&#x5904;&#x7406;&#x89C1;&#x540E;&#x7EED;&#x6587;&#x7AE0;&#x3002;&#xFF09;</p>
<blockquote>prop&#x9ED8;&#x8BA4;&#x662F;<strong>&#x5355;&#x5411;&#x7ED1;&#x5B9A;</strong> &#x3010;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x5C06;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x53CD;&#x8FC7;&#x6765;&#x4E0D;&#x4F1A;&#x3002;&#x8FD9;&#x662F;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x5B50;&#x7EC4;&#x4EF6;&#x65E0;&#x610F;&#x4FEE;&#x6539;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x3011;</blockquote>
<p><a href="https://github.com/WEBING123/blog" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x591A;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;GitHub&#x5730;&#x5740;</a><br><a href="https://segmentfault.com/u/webing123">&#x9605;&#x8BFB;&#x66F4;&#x591A;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js入门教程-组件数据传递

## 原文链接
[https://segmentfault.com/a/1190000015173640](https://segmentfault.com/a/1190000015173640)


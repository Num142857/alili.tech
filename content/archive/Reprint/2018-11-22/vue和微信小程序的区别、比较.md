---
title: 'vue和微信小程序的区别、比较' 
date: 2018-11-22 11:48:10
hidden: true
slug: c1m153tqudn
categories: [reprint]
---

{{< raw >}}
<p><em>&#x5199;&#x4E86;vue&#x9879;&#x76EE;&#x548C;&#x5C0F;&#x7A0B;&#x5E8F;&#xFF0C;&#x53D1;&#x73B0;&#x4E8C;&#x8005;&#x6709;&#x8BB8;&#x591A;&#x76F8;&#x540C;&#x4E4B;&#x5904;&#xFF0C;&#x5728;&#x6B64;&#x60F3;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x4E8C;&#x8005;&#x7684;&#x5171;&#x540C;&#x70B9;&#x548C;&#x533A;&#x522B;&#x3002;</em></p><h1 id="articleHeader0">&#x4E00;&#x3001;&#x751F;&#x547D;&#x5468;&#x671F;</h1><p>&#x5148;&#x8D34;&#x4E24;&#x5F20;&#x56FE;&#xFF1A;</p><h4>vue&#x751F;&#x547D;&#x5468;&#x671F;</h4><p><span class="img-wrap"><img data-src="/img/bVVORa?w=1200&amp;h=3039" src="https://static.alili.tech/img/bVVORa?w=1200&amp;h=3039" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>&#x5C0F;&#x7A0B;&#x5E8F;&#x751F;&#x547D;&#x5468;&#x671F;</h4><p><span class="img-wrap"><img data-src="/img/bVbcfCK?w=662&amp;h=1014" src="https://static.alili.tech/img/bVbcfCK?w=662&amp;h=1014" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x76F8;&#x6BD4;&#x4E4B;&#x4E0B;&#xFF0C;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x8981;&#x7B80;&#x5355;&#x5F97;&#x591A;&#x3002;</p><p><code>vue</code>&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x5728;&#x8DF3;&#x8F6C;&#x65B0;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;&#xFF0C;&#x4F46;&#x662F;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#xFF0C;&#x9875;&#x9762;&#x4E0D;&#x540C;&#x7684;&#x8DF3;&#x8F6C;&#x65B9;&#x5F0F;&#xFF0C;&#x89E6;&#x53D1;&#x7684;&#x94A9;&#x5B50;&#x5E76;&#x4E0D;&#x4E00;&#x6837;&#x3002;</p><ul><li><code>onLoad</code>: &#x9875;&#x9762;&#x52A0;&#x8F7D;<br>&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x53EA;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#xFF0C;&#x53EF;&#x4EE5;&#x5728; <code>onLoad</code> &#x4E2D;&#x83B7;&#x53D6;&#x6253;&#x5F00;&#x5F53;&#x524D;&#x9875;&#x9762;&#x6240;&#x8C03;&#x7528;&#x7684; <code>query</code> &#x53C2;&#x6570;&#x3002;</li><li><code>onShow</code>: &#x9875;&#x9762;&#x663E;&#x793A;<br>&#x6BCF;&#x6B21;&#x6253;&#x5F00;&#x9875;&#x9762;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x3002;</li><li><code>onReady</code>: &#x9875;&#x9762;&#x521D;&#x6B21;&#x6E32;&#x67D3;&#x5B8C;&#x6210;<br>&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x53EA;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#xFF0C;&#x4EE3;&#x8868;&#x9875;&#x9762;&#x5DF2;&#x7ECF;&#x51C6;&#x5907;&#x59A5;&#x5F53;&#xFF0C;&#x53EF;&#x4EE5;&#x548C;&#x89C6;&#x56FE;&#x5C42;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;<br>&#x5BF9;&#x754C;&#x9762;&#x7684;&#x8BBE;&#x7F6E;&#x5982;<code>wx.setNavigationBarTitle</code>&#x8BF7;&#x5728;<code>onReady</code>&#x4E4B;&#x540E;&#x8BBE;&#x7F6E;&#x3002;&#x8BE6;&#x89C1;&#x751F;&#x547D;&#x5468;&#x671F;</li><li><code>onHide</code>: &#x9875;&#x9762;&#x9690;&#x85CF;<br>&#x5F53;<code>navigateTo</code>&#x6216;&#x5E95;&#x90E8;tab&#x5207;&#x6362;&#x65F6;&#x8C03;&#x7528;&#x3002;</li><li><code>onUnload</code>: &#x9875;&#x9762;&#x5378;&#x8F7D;<br>&#x5F53;<code>redirectTo</code>&#x6216;<code>navigateBack</code>&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x3002;</li></ul><h4>&#x6570;&#x636E;&#x8BF7;&#x6C42;</h4><p>&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x4E24;&#x8005;&#x94A9;&#x5B50;&#x7684;&#x4F7F;&#x7528;&#x6709;&#x4E9B;&#x7C7B;&#x4F3C;&#xFF0C;<code>vue</code>&#x4E00;&#x822C;&#x4F1A;&#x5728;<code>created</code>&#x6216;&#x8005;<code>mounted</code>&#x4E2D;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x5728;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#xFF0C;&#x4F1A;&#x5728;<code>onLoad</code>&#x6216;&#x8005;<code>onShow</code>&#x4E2D;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x3002;</p><h1 id="articleHeader1">&#x4E8C;&#x3001;&#x6570;&#x636E;&#x7ED1;&#x5B9A;</h1><p><code>VUE</code>:vue&#x52A8;&#x6001;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x5728;&#x53D8;&#x91CF;&#x524D;&#x9762;&#x52A0;&#x4E0A;&#x5192;&#x53F7;&#xFF1A;&#xFF0C;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img :src=&quot;imgSrc&quot;/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code style="word-break:break-word;white-space:initial">&lt;img <span class="hljs-symbol">:src=<span class="hljs-string">&quot;imgSrc&quot;</span>/&gt;</span></code></pre><p><code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#xFF1A;&#x7ED1;&#x5B9A;&#x67D0;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4E3A;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4F1A;&#x7528;&#x4E24;&#x4E2A;&#x5927;&#x62EC;&#x53F7;&#x62EC;&#x8D77;&#x6765;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x52A0;&#x62EC;&#x53F7;&#xFF0C;&#x4E3A;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;image src=&quot;"{{"imgSrc"}}"&quot;&gt;&lt;/image&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code style="word-break:break-word;white-space:initial"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">"{{"imgSrc"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span></span></code></pre><h1 id="articleHeader2">&#x4E09;&#x3001;&#x5217;&#x8868;&#x6E32;&#x67D3;</h1><p>&#x76F4;&#x63A5;&#x8D34;&#x4EE3;&#x7801;&#xFF0C;&#x4E24;&#x8005;&#x8FD8;&#x662F;&#x6709;&#x4E9B;&#x76F8;&#x4F3C;<br><strong>vue&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul id=&quot;example-1&quot;&gt;
  &lt;li v-for=&quot;item in items&quot;&gt;
    "{{" item.message "}}"
  &lt;/li&gt;
&lt;/ul&gt;

var example1 = new Vue({
  el: &apos;#example-1&apos;,
  data: {
    items: [
      { message: &apos;Foo&apos; },
      { message: &apos;Bar&apos; }
    ]
  }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">ul</span> id=<span class="hljs-string">&quot;example-1&quot;</span>&gt;
  &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;item in items&quot;</span>&gt;
    "{{" item<span class="hljs-selector-class">.message</span> "}}"
  &lt;/li&gt;
&lt;/ul&gt;

<span class="hljs-selector-tag">var</span> example1 = new Vue({
  el: <span class="hljs-string">&apos;#example-1&apos;</span>,
  data: {
    items: [
      { message: <span class="hljs-string">&apos;Foo&apos;</span> },
      { message: <span class="hljs-string">&apos;Bar&apos;</span> }
    ]
  }
})
</code></pre><p><strong>&#x5C0F;&#x7A0B;&#x5E8F;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Page({
  data: {
    items: [
      { message: &apos;Foo&apos; },
      { message: &apos;Bar&apos; }
    ]
  }
})

&lt;text wx:for=&quot;"{{"items"}}"&quot;&gt;"{{"item"}}"&lt;/text&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>
Page({
  data: {
    items: [
      { message: <span class="hljs-string">&apos;Foo&apos;</span> },
      { message: <span class="hljs-string">&apos;Bar&apos;</span> }
    ]
  }
})

&lt;text wx:for=<span class="hljs-string">&quot;"{{"items"}}"&quot;</span>&gt;"{{"item"}}"&lt;/text&gt;</code></pre><h1 id="articleHeader3">&#x56DB;&#x3001;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;&#x5143;&#x7D20;</h1><p><code>vue</code>&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;<code>v-if</code> &#x548C;<code>v-show</code>&#x63A7;&#x5236;&#x5143;&#x7D20;&#x7684;&#x663E;&#x793A;&#x548C;&#x9690;&#x85CF;</p><p><code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;<code>wx-if</code>&#x548C;<code>hidden</code>&#x63A7;&#x5236;&#x5143;&#x7D20;&#x7684;&#x663E;&#x793A;&#x548C;&#x9690;&#x85CF;</p><h1 id="articleHeader4">&#x4E94;&#x3001;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</h1><p><code>vue</code>&#xFF1A;&#x4F7F;&#x7528;<code>v-on:event</code>&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528;<code>@event</code>&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;,&#x4F8B;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button v-on:click=&quot;counter += 1&quot;&gt;Add 1&lt;/button&gt;
&lt;button v-on:click.stop=&quot;counter+=1&quot;&gt;Add1&lt;/button&gt;  //&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hsp"><code>&lt;<span class="hljs-keyword">button</span> v-<span class="hljs-keyword">on</span>:click=<span class="hljs-string">&quot;counter += 1&quot;</span>&gt;Add <span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">button</span>&gt;
&lt;<span class="hljs-keyword">button</span> v-<span class="hljs-keyword">on</span>:click.stop=<span class="hljs-string">&quot;counter+=1&quot;</span>&gt;Add1&lt;/<span class="hljs-keyword">button</span>&gt;  <span class="hljs-comment">//&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;</span></code></pre><p><code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;&#xFF0C;&#x5168;&#x7528;<code>bindtap(bind+event)</code>&#xFF0C;&#x6216;&#x8005;<code>catchtap(catch+event)</code>&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;,&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button bindtap=&quot;noWork&quot;&gt;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&lt;/button&gt;
&lt;button catchtap=&quot;noWork&quot;&gt;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&lt;/button&gt;  //&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hsp"><code>&lt;<span class="hljs-keyword">button</span> bindtap=<span class="hljs-string">&quot;noWork&quot;</span>&gt;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&lt;/<span class="hljs-keyword">button</span>&gt;
&lt;<span class="hljs-keyword">button</span> catchtap=<span class="hljs-string">&quot;noWork&quot;</span>&gt;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&lt;/<span class="hljs-keyword">button</span>&gt;  <span class="hljs-comment">//&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;</span></code></pre><h1 id="articleHeader5">&#x516D;&#x3001;&#x6570;&#x636E;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</h1><h4>1.&#x8BBE;&#x7F6E;&#x503C;</h4><p>&#x5728;<code>vue</code>&#x4E2D;,&#x53EA;&#x9700;&#x8981;&#x518D;<code>&#x8868;&#x5355;</code>&#x5143;&#x7D20;&#x4E0A;&#x52A0;&#x4E0A;<code>v-model</code>,&#x7136;&#x540E;&#x518D;&#x7ED1;&#x5B9A;<code>data</code>&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x5F53;&#x8868;&#x5355;&#x5143;&#x7D20;&#x5185;&#x5BB9;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;<code>data</code>&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x4E5F;&#x4F1A;&#x76F8;&#x5E94;&#x6539;&#x53D8;&#xFF0C;&#x8FD9;&#x662F;<code>vue</code>&#x975E;&#x5E38;nice&#x7684;&#x4E00;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;input v-model=&quot;reason&quot; placeholder=&quot;&#x586B;&#x5199;&#x7406;&#x7531;&quot; class=&apos;reason&apos;/&gt;
&lt;/div&gt;

new Vue({
  el: &apos;#app&apos;,
  data: {
   reason:&apos;&apos;
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;reason&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x586B;&#x5199;&#x7406;&#x7531;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;reason&apos;</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  <span class="hljs-attr">data</span>: {
   <span class="hljs-attr">reason</span>:<span class="hljs-string">&apos;&apos;</span>
  }
})</code></pre><p>&#x4F46;&#x662F;&#x5728;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;&#xFF0C;&#x5374;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x3002;&#x90A3;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;<br>&#x5F53;&#x8868;&#x5355;&#x5185;&#x5BB9;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8868;&#x5355;&#x5143;&#x7D20;&#x4E0A;&#x7ED1;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>this.setData({key:value})</code>&#x6765;&#x5C06;&#x8868;&#x5355;&#x4E0A;&#x7684;&#x503C;&#x8D4B;&#x503C;&#x7ED9;<code>data</code>&#x4E2D;&#x7684;&#x5BF9;&#x5E94;&#x503C;&#x3002;<br>&#x4E0B;&#x9762;&#x662F;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x611F;&#x53D7;&#x4E00;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input bindinput=&quot;bindReason&quot; placeholder=&quot;&#x586B;&#x5199;&#x7406;&#x7531;&quot; class=&apos;reason&apos; value=&apos;"{{"reason"}}"&apos; name=&quot;reason&quot; /&gt;

Page({
data:{
    reason:&apos;&apos;
},
bindReason(e) {
    this.setData({
      reason: e.detail.value
    })
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> bindinput=<span class="hljs-string">&quot;bindReason&quot;</span> placeholder=<span class="hljs-string">&quot;&#x586B;&#x5199;&#x7406;&#x7531;&quot;</span> class=<span class="hljs-string">&apos;reason&apos;</span> value=<span class="hljs-string">&apos;"{{"reason"}}"&apos;</span> name=<span class="hljs-string">&quot;reason&quot;</span> /&gt;

Page({
data:{
    reason:<span class="hljs-string">&apos;&apos;</span>
},
<span class="hljs-function"><span class="hljs-title">bindReason</span><span class="hljs-params">(e)</span></span> {
    this.setData({
      reason: e<span class="hljs-selector-class">.detail</span><span class="hljs-selector-class">.value</span>
    })
  }
})</code></pre><p>&#x5F53;&#x9875;&#x9762;&#x8868;&#x5355;&#x5143;&#x7D20;&#x5F88;&#x591A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x66F4;&#x6539;&#x503C;&#x5C31;&#x662F;&#x4E00;&#x4EF6;&#x4F53;&#x529B;&#x6D3B;&#x4E86;&#x3002;&#x548C;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E00;&#x6BD4;&#x8F83;&#xFF0C;<code>vue</code>&#x7684;<code>v-model</code>&#x7B80;&#x76F4;&#x723D;&#x7684;&#x4E0D;&#x8981;&#x4E0D;&#x8981;&#x7684;&#x3002;</p><h4>2.&#x53D6;&#x503C;</h4><p><code>vue</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>this.reason</code>&#x53D6;&#x503C;</p><p><code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>this.data.reason</code>&#x53D6;&#x503C;</p><p><span class="img-wrap"><img data-src="/img/bVbdXrK?w=242&amp;h=180" src="https://static.alili.tech/img/bVbdXrK?w=242&amp;h=180" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader6">&#x4E03;&#x3001;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x4F20;&#x53C2;</h1><p>&#x5728;<code>vue</code>&#x4E2D;&#xFF0C;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x4F20;&#x53C2;&#x633A;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x628A;&#x9700;&#x8981;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x4F5C;&#x4E3A;&#x5F62;&#x53C2;&#x4F20;&#x5165;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button @click=&quot;say(&apos;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&apos;)&quot;&gt;&lt;/button&gt;

new Vue({
  el: &apos;#app&apos;,
  methods:{
    say(arg){
    consloe.log(arg)
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>&lt;button @click=<span class="hljs-string">&quot;say(&apos;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&apos;)&quot;</span>&gt;&lt;/button&gt;

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">&apos;#app&apos;</span>,
  method<span class="hljs-variable">s:</span>{
    say(arg){
    consloe.<span class="hljs-built_in">log</span>(arg)
    }
  }
})</code></pre><p>&#x5728;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;&#xFF0C;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x5728;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#x4F20;&#x5165;&#x53C2;&#x6570;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x7ED1;&#x5B9A;&#x5230;&#x5143;&#x7D20;&#x4E0A;&#x7684;<code>data-</code>&#x5C5E;&#x6027;&#x4E0A;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>e.currentTarget.dataset.*</code>&#x7684;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;&#xFF0C;&#x4ECE;&#x800C;&#x5B8C;&#x6210;&#x53C2;&#x6570;&#x7684;&#x4F20;&#x9012;&#xFF0C;&#x5F88;&#x9EBB;&#x70E6;&#x6709;&#x6CA1;&#x6709;...</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;view class=&apos;tr&apos; bindtap=&apos;toApprove&apos; data-id=&quot;"{{"item.id"}}"&quot;&gt;&lt;/view&gt;
Page({
data:{
    reason:&apos;&apos;
},
toApprove(e) {
    let id = e.currentTarget.dataset.id;
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;view <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&apos;tr&apos;</span> bindtap=<span class="hljs-string">&apos;toApprove&apos;</span> data-id=<span class="hljs-string">&quot;"{{"item.id"}}"&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span>
Page({
<span class="hljs-attr">data</span>:{
    <span class="hljs-attr">reason</span>:<span class="hljs-string">&apos;&apos;</span>
},
toApprove(e) {
    <span class="hljs-keyword">let</span> id = e.currentTarget.dataset.id;
  }
})</code></pre><p><span class="img-wrap"><img data-src="/img/bVbdXGC?w=340&amp;h=327" src="https://static.alili.tech/img/bVbdXGC?w=340&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h1 id="articleHeader7">&#x516B;&#x3001;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h1><h3 id="articleHeader8">1.&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</h3><p>&#x5728;<code>vue</code>&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#xFF1A;</p><ol><li>&#x7F16;&#x5199;&#x5B50;&#x7EC4;&#x4EF6;</li><li>&#x5728;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x901A;&#x8FC7;<code>import</code>&#x5F15;&#x5165;</li><li>&#x5728;<code>vue</code>&#x7684;<code>components</code>&#x4E2D;&#x6CE8;&#x518C;</li><li>&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x4F7F;&#x7528;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B50;&#x7EC4;&#x4EF6; bar.vue
&lt;template&gt;
  &lt;div class=&quot;search-box&quot;&gt;
    &lt;div @click=&quot;say&quot; :title=&quot;title&quot; class=&quot;icon-dismiss&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default{
props:{
    title:{
       type:String,
       default:&apos;&apos;
      }
    }
},
methods:{
    say(){
       console.log(&apos;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&apos;);
       this.$emit(&apos;helloWorld&apos;)
    }
}
&lt;/script&gt;

// &#x7236;&#x7EC4;&#x4EF6; foo.vue
&lt;template&gt;
  &lt;div class=&quot;container&quot;&gt;
    &lt;bar :title=&quot;title&quot; @helloWorld=&quot;helloWorld&quot;&gt;&lt;/bar&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Bar from &apos;./bar.vue&apos;
export default{
data(){
    return{
        title:&quot;&#x6211;&#x662F;&#x6807;&#x9898;&quot;
    }
},
methods:{
    helloWorld(){
        console.log(&apos;&#x6211;&#x63A5;&#x6536;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x4E8B;&#x4EF6;&#x4E86;&apos;)
    }
},
components:{
    Bar
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>//&#x5B50;&#x7EC4;&#x4EF6; bar.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;search-box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;say&quot;</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">&quot;title&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;icon-dismiss&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
<span class="hljs-attr">props</span>:{
    <span class="hljs-attr">title</span>:{
       <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
       <span class="hljs-attr">default</span>:<span class="hljs-string">&apos;&apos;</span>
      }
    }
},
<span class="hljs-attr">methods</span>:{
    say(){
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x660E;&#x5929;&#x4E0D;&#x4E0A;&#x73ED;&apos;</span>);
       <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;helloWorld&apos;</span>)
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

// &#x7236;&#x7EC4;&#x4EF6; foo.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">bar</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">&quot;title&quot;</span> @<span class="hljs-attr">helloWorld</span>=<span class="hljs-string">&quot;helloWorld&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Bar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bar.vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
data(){
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">title</span>:<span class="hljs-string">&quot;&#x6211;&#x662F;&#x6807;&#x9898;&quot;</span>
    }
},
<span class="hljs-attr">methods</span>:{
    helloWorld(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x63A5;&#x6536;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x4E8B;&#x4EF6;&#x4E86;&apos;</span>)
    }
},
<span class="hljs-attr">components</span>:{
    Bar
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p>&#x5728;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#xFF1A;</p><ol><li>&#x7F16;&#x5199;&#x5B50;&#x7EC4;&#x4EF6;</li><li><p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;<code>json</code>&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5C06;&#x8BE5;&#x6587;&#x4EF6;&#x58F0;&#x660E;&#x4E3A;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;component&quot;: true
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;component&quot;</span>: <span class="hljs-literal">true</span>
}</code></pre></li><li><p>&#x5728;&#x9700;&#x8981;&#x5F15;&#x5165;&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x7684;<code>json</code>&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5728;<code>usingComponents</code>&#x586B;&#x5199;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;&#x540D;&#x4EE5;&#x53CA;&#x8DEF;&#x5F84;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;usingComponents&quot;: {
    &quot;tab-bar&quot;: &quot;../../components/tabBar/tabBar&quot;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;usingComponents&quot;</span>: {
    <span class="hljs-string">&quot;tab-bar&quot;</span>: <span class="hljs-string">&quot;../../components/tabBar/tabBar&quot;</span>
  }</code></pre></li><li><p>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x76F4;&#x63A5;&#x5F15;&#x5165;&#x5373;&#x53EF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;tab-bar currentpage=&quot;index&quot;&gt;&lt;/tab-bar&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-built_in">tab</span>-<span class="hljs-built_in">bar</span> currentpage=<span class="hljs-string">&quot;index&quot;</span>&gt;&lt;/<span class="hljs-built_in">tab</span>-<span class="hljs-built_in">bar</span>&gt;</code></pre><p>&#x5177;&#x4F53;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B50;&#x7EC4;&#x4EF6;
&lt;!--components/tabBar/tabBar.wxml--&gt;
&lt;view class=&apos;tabbar-wrapper&apos;&gt;
  &lt;view class=&apos;left-bar "{{"currentpage===&quot;index&quot;?&quot;active&quot;:&quot;&quot;"}}"&apos; bindtap=&apos;jumpToIndex&apos;&gt;
    &lt;text class=&apos;iconfont icon-shouye&apos;&gt;&lt;/text&gt;
    &lt;view&gt;&#x9996;&#x9875;&lt;/view&gt;
  &lt;/view&gt;
  &lt;view class=&apos;right-bar "{{"currentpage===&quot;setting&quot;?&quot;active&quot;:&quot;&quot;"}}"&apos; bindtap=&apos;jumpToSetting&apos;&gt;
    &lt;text class=&apos;iconfont icon-shezhi&apos;&gt;&lt;/text&gt;
    &lt;view&gt;&#x8BBE;&#x7F6E;&lt;/view&gt;
  &lt;/view&gt;
&lt;/view&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs htmlbars"><code><span class="xml">// &#x5B50;&#x7EC4;&#x4EF6;
<span class="hljs-comment">&lt;!--components/tabBar/tabBar.wxml--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;tabbar-wrapper&apos;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;left-bar </span></span></span><span class="hljs-template-variable">"{{"currentpage===<span class="hljs-string">&quot;index&quot;</span>?<span class="hljs-string">&quot;active&quot;</span>:<span class="hljs-string">&quot;&quot;</span>"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&apos;</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">&apos;jumpToIndex&apos;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;iconfont icon-shouye&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>&#x9996;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;right-bar </span></span></span><span class="hljs-template-variable">"{{"currentpage===<span class="hljs-string">&quot;setting&quot;</span>?<span class="hljs-string">&quot;active&quot;</span>:<span class="hljs-string">&quot;&quot;</span>"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&apos;</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">&apos;jumpToSetting&apos;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;iconfont icon-shezhi&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>&#x8BBE;&#x7F6E;<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
</span></code></pre></li></ol><h3 id="articleHeader9">2.&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;</h3><h4><strong>&#x5728;<code>vue</code>&#x4E2D;</strong></h4><p>&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;<code>v-bind</code>&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>props</code>&#x63A5;&#x6536;&#xFF0C;&#x5373;&#x53EF;&#x5B8C;&#x6210;&#x6570;&#x636E;&#x7684;&#x4F20;&#x9012;&#xFF0C;&#x793A;&#x4F8B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7236;&#x7EC4;&#x4EF6; foo.vue
&lt;template&gt;
  &lt;div class=&quot;container&quot;&gt;
    &lt;bar :title=&quot;title&quot;&gt;&lt;/bar&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import Bar from &apos;./bar.vue&apos;
export default{
data(){
    return{        
        title:&quot;&#x6211;&#x662F;&#x6807;&#x9898;&quot;
    }
},
components:{
    Bar
}
&lt;/script&gt;

// &#x5B50;&#x7EC4;&#x4EF6;bar.vue
&lt;template&gt;
  &lt;div class=&quot;search-box&quot;&gt;
    &lt;div :title=&quot;title&quot; &gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default{
props:{
    title:{
       type:String,
       default:&apos;&apos;
      }
    }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// &#x7236;&#x7EC4;&#x4EF6; foo.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">bar</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Bar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bar.vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
data(){
    <span class="hljs-keyword">return</span>{        
        <span class="hljs-attr">title</span>:<span class="hljs-string">&quot;&#x6211;&#x662F;&#x6807;&#x9898;&quot;</span>
    }
},
<span class="hljs-attr">components</span>:{
    Bar
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

// &#x5B50;&#x7EC4;&#x4EF6;bar.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;search-box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">&quot;title&quot;</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
<span class="hljs-attr">props</span>:{
    <span class="hljs-attr">title</span>:{
       <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
       <span class="hljs-attr">default</span>:<span class="hljs-string">&apos;&apos;</span>
      }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x5B50;&#x7EC4;&#x4EF6;&#x548C;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this.$emit</code>&#x5C06;&#x65B9;&#x6CD5;&#x548C;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#x3002;</p><h4><strong>&#x5728;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x4E2D;</strong></h4><p>&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x548C;<code>vue</code>&#x7C7B;&#x4F3C;&#xFF0C;&#x4F46;&#x662F;<code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x6CA1;&#x6709;&#x901A;&#x8FC7;<code>v-bind</code>&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x5C06;&#x503C;&#x8D4B;&#x503C;&#x7ED9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;tab-bar currentpage=&quot;index&quot;&gt;&lt;/tab-bar&gt;

&#x6B64;&#x5904;&#xFF0C; &#x201C;index&#x201D;&#x5C31;&#x662F;&#x8981;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x503C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>&lt;<span class="hljs-built_in">tab</span>-<span class="hljs-built_in">bar</span> currentpage=<span class="hljs-string">&quot;index&quot;</span>&gt;&lt;/<span class="hljs-built_in">tab</span>-<span class="hljs-built_in">bar</span>&gt;

&#x6B64;&#x5904;&#xFF0C; &#x201C;index&#x201D;&#x5C31;&#x662F;&#x8981;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x503C;</code></pre><p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;<code>properties</code>&#x4E2D;&#xFF0C;&#x63A5;&#x6536;&#x4F20;&#x9012;&#x7684;&#x503C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="properties: {
    // &#x5F39;&#x7A97;&#x6807;&#x9898;
    currentpage: {            // &#x5C5E;&#x6027;&#x540D;
      type: String,     // &#x7C7B;&#x578B;&#xFF08;&#x5FC5;&#x586B;&#xFF09;&#xFF0C;&#x76EE;&#x524D;&#x63A5;&#x53D7;&#x7684;&#x7C7B;&#x578B;&#x5305;&#x62EC;&#xFF1A;String, Number, Boolean, Object, Array, null&#xFF08;&#x8868;&#x793A;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#xFF09;
      value: &apos;index&apos;     // &#x5C5E;&#x6027;&#x521D;&#x59CB;&#x503C;&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x672A;&#x6307;&#x5B9A;&#x5219;&#x4F1A;&#x6839;&#x636E;&#x7C7B;&#x578B;&#x9009;&#x62E9;&#x4E00;&#x4E2A;
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-attribute">properties</span>: {
    <span class="hljs-comment">// &#x5F39;&#x7A97;&#x6807;&#x9898;</span>
    <span class="hljs-attribute">currentpage</span>: {            <span class="hljs-comment">// &#x5C5E;&#x6027;&#x540D;</span>
      <span class="hljs-attribute">type</span>: String,     <span class="hljs-comment">// &#x7C7B;&#x578B;&#xFF08;&#x5FC5;&#x586B;&#xFF09;&#xFF0C;&#x76EE;&#x524D;&#x63A5;&#x53D7;&#x7684;&#x7C7B;&#x578B;&#x5305;&#x62EC;&#xFF1A;String, Number, Boolean, Object, Array, null&#xFF08;&#x8868;&#x793A;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#xFF09;</span>
      <span class="hljs-attribute">value</span>: <span class="hljs-string">&apos;index&apos;</span>     <span class="hljs-comment">// &#x5C5E;&#x6027;&#x521D;&#x59CB;&#x503C;&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x672A;&#x6307;&#x5B9A;&#x5219;&#x4F1A;&#x6839;&#x636E;&#x7C7B;&#x578B;&#x9009;&#x62E9;&#x4E00;&#x4E2A;</span>
    }
  }</code></pre><p>&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x548C;<code>vue</code>&#x4E5F;&#x5F88;&#x7C7B;&#x4F3C;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;
methods: {   
    // &#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;
    cancelBut: function (e) {
      var that = this;
      var myEventDetail = { pickerShow: false, type: &apos;cancel&apos; } // detail&#x5BF9;&#x8C61;&#xFF0C;&#x63D0;&#x4F9B;&#x7ED9;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x51FD;&#x6570;
      this.triggerEvent(&apos;myevent&apos;, myEventDetail) //myevent&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x79F0;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;
    },
}

//&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;
&lt;bar bind:myevent=&quot;toggleToast&quot;&gt;&lt;/bar&gt;

// &#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x4FE1;&#x606F;
toggleToast(e){
    console.log(e.detail)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;</span>
methods: {   
    <span class="hljs-comment">// &#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;</span>
    cancelBut: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
      <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">var</span> myEventDetail = { <span class="hljs-attr">pickerShow</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;cancel&apos;</span> } <span class="hljs-comment">// detail&#x5BF9;&#x8C61;&#xFF0C;&#x63D0;&#x4F9B;&#x7ED9;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x51FD;&#x6570;</span>
      <span class="hljs-keyword">this</span>.triggerEvent(<span class="hljs-string">&apos;myevent&apos;</span>, myEventDetail) <span class="hljs-comment">//myevent&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x79F0;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</span>
    },
}

<span class="hljs-comment">//&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;</span>
&lt;bar bind:myevent=<span class="hljs-string">&quot;toggleToast&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span></span>

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x4FE1;&#x606F;</span>
toggleToast(e){
    <span class="hljs-built_in">console</span>.log(e.detail)
}</code></pre><h4>&#x5982;&#x679C;&#x7236;&#x7EC4;&#x4EF6;&#x60F3;&#x8981;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;</h4><p><code>vue</code>&#x4F1A;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>ref</code>&#x5C5E;&#x6027;&#xFF0C;&#x901A;&#x8FC7;<code>this.$refs.ref&#x7684;&#x503C;</code>&#x4FBF;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;&#x8BE5;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x4FBF;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x4EFB;&#x610F;&#x65B9;&#x6CD5;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B50;&#x7EC4;&#x4EF6;
&lt;bar ref=&quot;bar&quot;&gt;&lt;/bar&gt;

//&#x7236;&#x7EC4;&#x4EF6;
this.$ref.bar.&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-comment">//&#x5B50;&#x7EC4;&#x4EF6;</span>
&lt;bar <span class="hljs-keyword">ref</span>=<span class="hljs-string">&quot;bar&quot;</span>&gt;&lt;/bar&gt;

<span class="hljs-comment">//&#x7236;&#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">this</span>.$<span class="hljs-keyword">ref</span>.bar.&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;</code></pre><p><code>&#x5C0F;&#x7A0B;&#x5E8F;</code>&#x662F;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;<code>id</code>&#x6216;&#x8005;<code>class</code>&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>this.selectComponent</code>&#x627E;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;,&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B50;&#x7EC4;&#x4EF6;
&lt;bar id=&quot;bar&quot;&gt;&lt;/bar&gt;

// &#x7236;&#x7EC4;&#x4EF6;
this.selectComponent(&apos;#id&apos;).syaHello()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5B50;&#x7EC4;&#x4EF6;</span>
&lt;bar id=<span class="hljs-string">&quot;bar&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span></span>

<span class="hljs-comment">// &#x7236;&#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">this</span>.selectComponent(<span class="hljs-string">&apos;#id&apos;</span>).syaHello()</code></pre><p>&#x5C0F;&#x7A0B;&#x5E8F;&#x548C;vue&#x5728;&#x8FD9;&#x70B9;&#x4E0A;&#x592A;&#x76F8;&#x4F3C;&#x4E86;&#xFF0C;&#x6709;&#x6728;&#x6709;&#x3002;&#x3002;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbdYtp?w=389&amp;h=324" src="https://static.alili.tech/img/bVbdYtp?w=389&amp;h=324" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h1 id="articleHeader10">&#x4E5D;&#x3001;&#x5E9F;&#x8BDD;</h1><p><strong>&#x8FD8;&#x6709;&#x597D;&#x591A;&#x5730;&#x65B9;&#x6CA1;&#x5199;&#xFF0C;&#x4E4B;&#x540E;&#x518D;&#x6162;&#x6162;&#x52A0;&#x4E0A;&#x3001;&#x7CBE;&#x7B80;&#x3002;&#x611F;&#x89C9;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x6709;&#x70B9;&#x5197;&#x4F59;&#xFF0C;&#x5927;&#x4F6C;&#x52FF;&#x55B7;&#xFF01;&#xFF01;&#xFF01;</strong><br><strong>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x5E0C;&#x671B;&#x5E2E;&#x5FD9;&#x70B9;&#x4E2A;&#x8D5E;&#x548C;&#x6536;&#x85CF;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbdYvN?w=180&amp;h=180" src="https://static.alili.tech/img/bVbdYvN?w=180&amp;h=180" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue和微信小程序的区别、比较

## 原文链接
[https://segmentfault.com/a/1190000015684864](https://segmentfault.com/a/1190000015684864)


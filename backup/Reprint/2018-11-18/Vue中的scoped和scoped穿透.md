---
title: 'Vue中的scoped和scoped穿透' 
date: 2018-11-18 2:30:10
hidden: true
slug: jy6crfgta1n
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x4EC0;&#x4E48;&#x662F;scoped</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5728;Vue&#x6587;&#x4EF6;&#x4E2D;&#x7684;style&#x6807;&#x7B7E;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;scoped&#x3002;&#x5F53;&#x4E00;&#x4E2A;style&#x6807;&#x7B7E;&#x62E5;&#x6709;scoped&#x5C5E;&#x6027;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x7684;css&#x6837;&#x5F0F;&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x7684;Vue&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;&#x4E0D;&#x76F8;&#x4E92;&#x6C61;&#x67D3;&#x3002;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x6240;&#x6709;style&#x6807;&#x7B7E;&#x90FD;&#x52A0;&#x4E0A;&#x4E86;scoped&#x5C5E;&#x6027;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x5B9E;&#x73B0;&#x4E86;&#x6837;&#x5F0F;&#x7684;&#x6A21;&#x5757;&#x5316;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code style="word-break:break-word;white-space:initial">&#x5728;Vue&#x6587;&#x4EF6;&#x4E2D;&#x7684;<span class="hljs-built_in">style</span>&#x6807;&#x7B7E;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;scoped&#x3002;&#x5F53;&#x4E00;&#x4E2A;<span class="hljs-built_in">style</span>&#x6807;&#x7B7E;&#x62E5;&#x6709;scoped&#x5C5E;&#x6027;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x7684;css&#x6837;&#x5F0F;&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x7684;Vue&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;&#x4E0D;&#x76F8;&#x4E92;&#x6C61;&#x67D3;&#x3002;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x6240;&#x6709;<span class="hljs-built_in">style</span>&#x6807;&#x7B7E;&#x90FD;&#x52A0;&#x4E0A;&#x4E86;scoped&#x5C5E;&#x6027;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x5B9E;&#x73B0;&#x4E86;&#x6837;&#x5F0F;&#x7684;&#x6A21;&#x5757;&#x5316;&#x3002;</code></pre><h2 id="articleHeader1">2.scoped&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;</h2><p>Vue&#x4E2D;&#x7684;scoped&#x5C5E;&#x6027;&#x7684;&#x6548;&#x679C;&#x4E3B;&#x8981;&#x662F;&#x901A;&#x8FC7;PostCss&#x5B9E;&#x73B0;&#x7684;&#x3002;&#x4EE5;&#x4E0B;&#x662F;&#x8F6C;&#x8BD1;&#x524D;&#x7684;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style scoped lang=&quot;less&quot;&gt;
    .example{
        color:red;
    }
&lt;/style&gt;
&lt;template&gt;
    &lt;div class=&quot;example&quot;&gt;scoped&#x6D4B;&#x8BD5;&#x6848;&#x4F8B;&lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;less&quot;</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.example</span>{
        <span class="hljs-attribute">color</span>:red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example&quot;</span>&gt;</span>scoped&#x6D4B;&#x8BD5;&#x6848;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre><p>&#x8F6C;&#x8BD1;&#x540E;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".example[data-v-5558831a] {
  color: red;
}
&lt;template&gt;
    &lt;div class=&quot;example&quot; data-v-5558831a&gt;scoped&#x6D4B;&#x8BD5;&#x6848;&#x4F8B;&lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haskell"><code>.example[<span class="hljs-class"><span class="hljs-keyword">data</span>-v-5558831a] {
  <span class="hljs-title">color</span>: <span class="hljs-title">red</span>;
}</span>
&lt;template&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;example&quot;</span> <span class="hljs-class"><span class="hljs-keyword">data</span>-v-5558831a&gt;scoped&#x6D4B;&#x8BD5;&#x6848;&#x4F8B;&lt;/div&gt;</span>
&lt;/template&gt;</code></pre><p>&#x65E2;:PostCSS&#x7ED9;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x6240;&#x6709;dom&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x52A8;&#x6001;&#x5C5E;&#x6027;&#xFF0C;&#x7ED9;css&#x9009;&#x62E9;&#x5668;&#x989D;&#x5916;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x6765;&#x9009;&#x62E9;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;dom,&#x8FD9;&#x79CD;&#x505A;&#x6CD5;&#x4F7F;&#x5F97;&#x6837;&#x5F0F;&#x53EA;&#x4F5C;&#x7528;&#x4E8E;&#x542B;&#x6709;&#x8BE5;&#x5C5E;&#x6027;&#x7684;dom&#x5143;&#x7D20;(&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;dom)&#x3002;</p><blockquote>&#x603B;&#x7ED3;&#xFF1A;scoped&#x7684;&#x6E32;&#x67D3;&#x89C4;&#x5219;&#xFF1A;</blockquote><ol><li>&#x7ED9;HTML&#x7684;dom&#x8282;&#x70B9;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x4E0D;&#x91CD;&#x590D;&#x7684;data&#x5C5E;&#x6027;(&#x4F8B;&#x5982;: data-v-5558831a)&#x6765;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#x8FD9;&#x4E2A;dom &#x5143;&#x7D20;</li><li>&#x5728;&#x6BCF;&#x53E5;css&#x9009;&#x62E9;&#x5668;&#x7684;&#x672B;&#x5C3E;(&#x7F16;&#x8BD1;&#x540E;&#x751F;&#x6210;&#x7684;css&#x8BED;&#x53E5;)&#x52A0;&#x4E00;&#x4E2A;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;data&#x5C5E;&#x6027;&#x9009;&#x62E9;&#x5668;(&#x4F8B;&#x5982;&#xFF1A;[data-v-5558831a])&#x6765;&#x79C1;&#x6709;&#x5316;&#x6837;&#x5F0F;</li></ol><h2 id="articleHeader2">3.scoped&#x7A7F;&#x900F;</h2><p>scoped&#x770B;&#x8D77;&#x6765;&#x5F88;&#x597D;&#x7528;&#xFF0C;&#x5F53;&#x65F6;&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5E93;&#x65F6;(&#x5982;&#x4F7F;&#x7528;vue-awesome-swiper&#x5B9E;&#x73B0;&#x79FB;&#x52A8;&#x7AEF;&#x8F6E;&#x64AD;)&#xFF0C;&#x9700;&#x8981;&#x5728;&#x5C40;&#x90E8;&#x7EC4;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5E93;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x800C;&#x53C8;&#x4E0D;&#x60F3;&#x53BB;&#x9664;scoped&#x5C5E;&#x6027;&#x9020;&#x6210;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6837;&#x5F0F;&#x8986;&#x76D6;&#x3002;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7279;&#x6B8A;&#x7684;&#x65B9;&#x5F0F;&#x7A7F;&#x900F;scoped&#x3002;</p><blockquote>stylus&#x7684;&#x6837;&#x5F0F;&#x7A7F;&#x900F; &#x4F7F;&#x7528;&gt;&gt;&gt;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &#x5916;&#x5C42; &gt;&gt;&gt; &#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6; 
        &#x6837;&#x5F0F;
        
   .wrapper &gt;&gt;&gt; .swiper-pagination-bullet-active
    background: #fff" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    &#x5916;&#x5C42; &gt;&gt;&gt; &#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6; 
        &#x6837;&#x5F0F;
        
   <span class="hljs-selector-class">.wrapper</span> &gt;&gt;&gt; <span class="hljs-selector-class">.swiper-pagination-bullet-active</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span></code></pre><blockquote>sass&#x548C;less&#x7684;&#x6837;&#x5F0F;&#x7A7F;&#x900F; &#x4F7F;&#x7528;/deep/</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &#x5916;&#x5C42; /deep/ &#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6; {
        &#x6837;&#x5F0F;
    }
    .wrapper /deep/ .swiper-pagination-bullet-active{
      background: #fff;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>    &#x5916;&#x5C42; <span class="hljs-meta-keyword">/deep/</span> &#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6; {
        &#x6837;&#x5F0F;
    }
    .wrapper <span class="hljs-meta-keyword">/deep/</span> .swiper-pagination-bullet-active{
<span class="hljs-symbol">      background:</span> <span class="hljs-meta">#fff;</span>
    }</code></pre><h2 id="articleHeader3">3.&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5E93;&#x6837;&#x5F0F;&#x7684;&#x5176;&#x5B83;&#x65B9;&#x6CD5;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;&#x5728;&#x4F7F;&#x7528;scoped &#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;scopd&#x7A7F;&#x900F;&#x7684;&#x65B9;&#x5F0F;&#x4FEE;&#x6539;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5E93;&#x6837;&#x5F0F;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x5176;&#x5B83;&#x65B9;&#x5F0F;&#x6765;&#x4FEE;&#x6539;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5E93;&#x7684;&#x6837;&#x5F0F;</p><blockquote>&#x5728;vue&#x7EC4;&#x4EF6;&#x4E2D;&#x4E0D;&#x4F7F;&#x7528;scoped&#x5C5E;&#x6027;</blockquote><hr><blockquote>&#x5728;vue&#x7EC4;&#x5EFA;&#x4E2D;&#x4F7F;&#x7528;&#x4E24;&#x4E2A;style&#x6807;&#x7B7E;&#xFF0C;&#x4E00;&#x4E2A;&#x52A0;&#x4E0A;scoped&#x5C5E;&#x6027;&#xFF0C;&#x4E00;&#x4E2A;&#x4E0D;&#x52A0;scoped&#x5C5E;&#x6027;&#xFF0C;&#x628A;&#x9700;&#x8981;&#x8986;&#x76D6;&#x7684;css&#x6837;&#x5F0F;&#x5199;&#x5728;&#x4E0D;&#x52A0;scoped&#x5C5E;&#x6027;&#x7684;style&#x6807;&#x7B7E;&#x91CC;</blockquote><hr><blockquote>&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;reset.css(&#x57FA;&#x7840;&#x5168;&#x5C40;&#x6837;&#x5F0F;)&#x6587;&#x4EF6;&#xFF0C;&#x91CC;&#x9762;&#x5199;&#x8986;&#x76D6;&#x7684;css&#x6837;&#x5F0F;&#xFF0C;&#x5728;&#x5165;&#x53E3;&#x6587;&#x4EF6;main.js &#x4E2D;&#x5F15;&#x5165;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue中的scoped和scoped穿透

## 原文链接
[https://segmentfault.com/a/1190000015932467](https://segmentfault.com/a/1190000015932467)


---
title: '前端进阶系列(二):css常见布局解决方案'
reprint: true
categories: reprint
abbrlink: 3e2653f2
date: 2018-11-05 02:30:10
---

{{% raw %}}
<h2 id="articleHeader0">&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x5E03;&#x5C40;</h2><h3 id="articleHeader1">margin+&#x5B9A;&#x5BBD;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .child {
    width: 100px;
    margin: 0 auto;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x60F3;&#x5FC5;&#x662F;&#x4E2A;&#x524D;&#x7AEF;&#x90FD;&#x89C1;&#x8FC7;&#xFF0C;&#x8FD9;&#x5B9A;&#x5BBD;&#x7684;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x79CD;&#x6765;&#x5B9E;&#x73B0;&#x4E0D;&#x5B9A;&#x5BBD;</li></ul><h3 id="articleHeader2">table+margin</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .child {
    display: table;
    margin: 0 auto;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li><code>display:table</code>&#x5728;&#x8868;&#x73B0;&#x4E0A;&#x7C7B;&#x4F3C;<code>block</code>&#x5143;&#x7D20;&#xFF0C;&#x4F46;&#x662F;&#x5BBD;&#x5EA6;&#x4E3A;&#x5185;&#x5BB9;&#x5BBD;&#x3002;</li><li>&#x65E0;&#x9700;&#x8BBE;&#x7F6E;&#x7236;&#x5143;&#x7D20;&#x6837;&#x5F0F; &#xFF08;&#x652F;&#x6301; IE 8 &#x53CA;&#x5176;&#x4EE5;&#x4E0A;&#x7248;&#x672C;&#xFF09;&#x517C;&#x5BB9; IE 8 &#x4E00;&#x4E0B;&#x7248;&#x672C;&#x9700;&#x8981;&#x8C03;&#x6574;&#x4E3A; <code>&lt;table&gt;</code></li></ul><h3 id="articleHeader3">inline-block+text-align</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .child {
    display: inline-block;
  }
  .parent {
    text-align: center;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">display</span>: inline-block;
  }
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">text-align</span>: center;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>&#x517C;&#x5BB9;&#x6027;&#x4F73;&#xFF08;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;IE6&#x548C;IE7&#xFF09;</p><h3 id="articleHeader4">absolute+margin-left</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
.parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    width: 100px;
    margin-left: -50px;  /* width/2 */
  }
  &lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
  }
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;  <span class="hljs-comment">/* width/2 */</span>
  }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x5BBD;&#x5EA6;&#x56FA;&#x5B9A;</li><li>&#x76F8;&#x6BD4;&#x4E0E;&#x4F7F;&#x7528;<code>transform</code>&#x517C;&#x5BB9;&#x6027;&#x66F4;&#x597D;</li></ul><h3 id="articleHeader5">absolute+transform</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
  }
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x4E0D;&#x4F1A;&#x5BF9;&#x540E;&#x7EED;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#x9020;&#x6210;&#x5F71;&#x54CD;</li><li><code>transform</code>&#x4E3A;CSS3&#x5C5E;&#x6027;&#xFF0C;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</li></ul><h3 id="articleHeader6">flex+justify-content</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
&lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
.parent {
  display: flex;
  justify-content: center;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x53EA;&#x9700;&#x8BBE;&#x7F6E;&#x7236;&#x8282;&#x70B9;&#x5C5E;&#x6027;&#xFF0C;&#x65E0;&#x9700;&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;</li><li><code>flex</code>&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</li></ul><h2 id="articleHeader7">&#x5782;&#x76F4;&#x5C45;&#x4E2D;</h2><h3 id="articleHeader8">table-cell+vertical-align</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    display: table-cell;
    vertical-align: middle;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x517C;&#x5BB9;&#x6027;&#x597D;(IE 8&#x4EE5;&#x4E0B;&#x7248;&#x672C;&#x9700;&#x8981;&#x8C03;&#x6574;&#x9875;&#x9762;&#x7ED3;&#x6784;&#x81F3; table)</li></ul><h3 id="articleHeader9">absolute+transform</h3><p>&#x5F3A;&#x5927;&#x7684;absolute&#x5BF9;&#x4E8E;&#x8FD9;&#x79CD;&#x5C0F;&#x95EE;&#x9898;&#x5F53;&#x7136;&#x662F;&#x5F88;&#x7B80;&#x5355;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
  }
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x4E0D;&#x4F1A;&#x5BF9;&#x540E;&#x7EED;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#x9020;&#x6210;&#x5F71;&#x54CD;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x662F;&#x552F;&#x4E00;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x7236;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x5931;&#x53BB;&#x9AD8;&#x5EA6;&#x3002;</li><li><code>transform</code> &#x4E3A;CSS3&#x5C5E;&#x6027;&#xFF0C;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</li></ul><p>&#x540C;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;margin-top&#x5B9E;&#x73B0;&#xFF0C;&#x539F;&#x7406;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;</p><h3 id="articleHeader10">flex+align-items</h3><p>&#x5982;&#x679C;&#x8BF4;<code>absolute</code>&#x5F3A;&#x5927;&#xFF0C;&#x90A3;<code>flex</code>&#x53EA;&#x662F;&#x7B11;&#x7B11;&#xFF0C;&#x56E0;&#x4E3A;&#x4ED6;&#x624D;&#x662F;&#x6700;&#x5F3A;&#x7684;&#xFF0C;&#x4F46;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    display: flex;
    align-items: center;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h2 id="articleHeader11">&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;</h2><h3 id="articleHeader12">absolute+transform</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
  }
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x4E0D;&#x4F1A;&#x5BF9;&#x540E;&#x7EED;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#x9020;&#x6210;&#x5F71;&#x54CD;</li><li><code>transform</code>&#x4E3A;CSS3&#x5C5E;&#x6027;&#xFF0C;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</li></ul><h3 id="articleHeader13">inline-block+text-align+table-cell+vertical-align</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }
  .child {
    display: inline-block;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
  }
  <span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">display</span>: inline-block;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x517C;&#x5BB9;&#x6027;&#x597D;</li></ul><h3 id="articleHeader14">flex+justify-content+align-items</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;Demo&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    display: flex;
    justify-content: center; /* &#x6C34;&#x5E73;&#x5C45;&#x4E2D; */
    align-items: center; /*&#x5782;&#x76F4;&#x5C45;&#x4E2D;*/
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center; <span class="hljs-comment">/* &#x6C34;&#x5E73;&#x5C45;&#x4E2D; */</span>
    <span class="hljs-attribute">align-items</span>: center; <span class="hljs-comment">/*&#x5782;&#x76F4;&#x5C45;&#x4E2D;*/</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x53EA;&#x9700;&#x8BBE;&#x7F6E;&#x7236;&#x8282;&#x70B9;&#x5C5E;&#x6027;&#xFF0C;&#x65E0;&#x9700;&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;</li><li>&#x8FD8;&#x662F;&#x5B58;&#x5728;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</li></ul><h2 id="articleHeader15">&#x4E00;&#x5217;&#x5B9A;&#x5BBD;&#xFF0C;&#x4E00;&#x5217;&#x81EA;&#x9002;&#x5E94;</h2><p>&#x8FD9;&#x79CD;&#x5E03;&#x5C40;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x5C31;&#x662F;&#x4E2D;&#x540E;&#x53F0;&#x7C7B;&#x578B;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016638811?w=730&amp;h=426" src="https://static.alili.tech/img/remote/1460000016638811?w=730&amp;h=426" alt="image" title="image" style="cursor:pointer"></span></p><h3 id="articleHeader16">float+margin</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;left&quot;&gt;
    &lt;p&gt;left&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;
    &lt;p&gt;right&lt;/p&gt;
    &lt;p&gt;right&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .left {
    float: left;
    width: 100px;
  }
  .right {
    margin-left: 100px
    /*&#x95F4;&#x8DDD;&#x53EF;&#x518D;&#x52A0;&#x5165; margin-left */
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  }
  <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>
    <span class="hljs-comment">/*&#x95F4;&#x8DDD;&#x53EF;&#x518D;&#x52A0;&#x5165; margin-left */</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>IE6&#x4E2D;&#x4F1A;&#x6709;3px&#x7684;BUG,&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5728;<code>.left</code>&#x52A0;&#x5165;<code>margin-left:-3px</code>&#x5F53;&#x7136;&#x4E0B;&#x9762;&#x7684;&#x65B9;&#x6848;&#x4E5F;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;bug:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;left&quot;&gt;
    &lt;p&gt;left&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class=&quot;right-fix&quot;&gt;
    &lt;div class=&quot;right&quot;&gt;
      &lt;p&gt;right&lt;/p&gt;
      &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .left {
    float: left;
    width: 100px;
  }
  .right-fix {
    float: right;
    width: 100%;
    margin-left: -100px;
  }
  .right {
    margin-left: 100px
    /*&#x95F4;&#x8DDD;&#x53EF;&#x518D;&#x52A0;&#x5165; margin-left */
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right-fix&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  }
  <span class="hljs-selector-class">.right-fix</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>;
  }
  <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>
    <span class="hljs-comment">/*&#x95F4;&#x8DDD;&#x53EF;&#x518D;&#x52A0;&#x5165; margin-left */</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h3 id="articleHeader17">float+overflow</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;left&quot;&gt;
    &lt;p&gt;left&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;
    &lt;p&gt;right&lt;/p&gt;
    &lt;p&gt;right&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .left {
    float: left;
    width: 100px;
  }
  .right {
    overflow: hidden;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  }
  <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E;overflow:hidden&#x4F1A;&#x51FA;&#x53D1;BFC&#x6A21;&#x5F0F;&#xFF08;block formatting context&#xFF09;&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x4E0A;&#x4E0B;&#x6587;&#x3002;BFC&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x7528;&#x901A;&#x4FD7;&#x7684;&#x6C5F;&#x5C31;&#x662F;&#xFF0C;&#x968F;&#x4FBF;&#x4F60;&#x5728;BFC&#x91CC;&#x9762;&#x5E72;&#x4EC0;&#x4E48;&#xFF0C;&#x5916;&#x9762;&#x90FD;&#x4E0D;&#x4F1A;&#x624B;&#x6BB5;&#x54E6;&#x5F71;&#x54CD;&#x3002;&#x6B64;&#x65B9;&#x6CD5;&#x6837;&#x5F0F;&#x7B80;&#x5355;&#x4F46;&#x4E0D;&#x652F;&#x6301; IE 6</p><h3 id="articleHeader18">table</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;left&quot;&gt;
    &lt;p&gt;left&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;
    &lt;p&gt;right&lt;/p&gt;
    &lt;p&gt;right&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .left {
    display: table-cell;
    width: 100px;
  }
  .right {
    display: table-cell;
    /*&#x5BBD;&#x5EA6;&#x4E3A;&#x5269;&#x4F59;&#x5BBD;&#x5EA6;*/
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">table-layout</span>: fixed;
  }
  <span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  }
  <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-comment">/*&#x5BBD;&#x5EA6;&#x4E3A;&#x5269;&#x4F59;&#x5BBD;&#x5EA6;*/</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p><code>table</code> &#x7684;&#x663E;&#x793A;&#x7279;&#x6027;&#x4E3A;&#x6BCF;&#x5217;&#x7684;&#x5355;&#x5143;&#x683C;&#x5BBD;&#x5EA6;&#x548C;&#x4E00;&#x5B9A;&#x7B49;&#x4E0E;&#x8868;&#x683C;&#x5BBD;&#x5EA6;&#x3002; <code>table-layout: fixed</code> &#x53EF;&#x52A0;&#x901F;&#x6E32;&#x67D3;&#xFF0C;&#x4E5F;&#x662F;&#x8BBE;&#x5B9A;&#x5E03;&#x5C40;&#x4F18;&#x5148;&#x3002;<code>table-cell</code> &#x4E2D;&#x4E0D;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;<code>margin</code>&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>padding</code> &#x6765;&#x8BBE;&#x7F6E;&#x95F4;&#x8DDD;</p><h3 id="articleHeader19">flex</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;left&quot;&gt;
    &lt;p&gt;left&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;
    &lt;p&gt;right&lt;/p&gt;
    &lt;p&gt;right&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
  .parent {
    display: flex;
  }
  .left {
    width: 100px;
    margin-left: 20px;
  }
  .right {
    flex: 1;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: flex;
  }
  <span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
  }
  <span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</li><li>&#x6027;&#x80FD;&#x95EE;&#x9898;&#xFF0C;&#x53EA;&#x662F;&#x9002;&#x5408;&#x5C0F;&#x8303;&#x56F4;&#x5E03;&#x5C40;</li></ul><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x5E38;&#x89C1;&#x7684;&#x51E0;&#x79CD;&#x5E03;&#x5C40;&#x3002;</p><p>&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;</p><ul><li><a href="https://coolshell.cn/articles/6840.html" rel="nofollow noreferrer" target="_blank">CSS &#x5E03;&#x5C40;:40&#x4E2A;&#x6559;&#x7A0B;&#x3001;&#x6280;&#x5DE7;&#x3001;&#x4F8B;&#x5B50;&#x548C;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;</a></li><li><a href="http://www.imooc.com/article/17719" rel="nofollow noreferrer" target="_blank">CSS&#x5E38;&#x89C1;&#x5E03;&#x5C40;&#x53CA;&#x89E3;&#x51B3;&#x65B9;&#x6848;</a></li><li><a href="https://segmentfault.com/a/1190000006047872">CSS display&#x5C5E;&#x6027;&#x8BE6;&#x89E3;</a></li><li><a href="http://www.imooc.com/article/2235" rel="nofollow noreferrer" target="_blank">&#x53F2;&#x4E0A;&#x6700;&#x5168;Html&#x548C;CSS&#x5E03;&#x5C40;&#x6280;&#x5DE7;</a></li></ul>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶系列(二):css常见布局解决方案

## 原文链接
[https://segmentfault.com/a/1190000016638808](https://segmentfault.com/a/1190000016638808)


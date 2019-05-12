---
title: '[踩坑] CSS中overflow-y: visible;不起作用'
hidden: true
categories: [reprint]
slug: da68668a
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x573A;&#x666F;</h2><p>&#x6700;&#x8FD1;&#x8981;&#x505A;&#x7684;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#x662F;&#x79FB;&#x52A8;&#x7AEF;&#x7684;h5&#x9875;&#x9762;&#xFF0C;&#x8981;&#x6C42;&#x6709;&#x4E00;&#x6392;&#x53EF;&#x9009;&#x62E9;&#x7684;&#x5361;&#x7247;, <code>&#x8D85;&#x51FA;&#x5BB9;&#x5668;&#x90E8;&#x5206;&#x53EF;&#x4EE5;&#x5DE6;&#x53F3;&#x6ED1;&#x52A8;&#xFF0C;&#x540C;&#x65F6;&#x6BCF;&#x5F20;&#x5361;&#x7247;&#x5DE6;&#x4E0A;&#x89D2;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x5220;&#x9664;&#x6309;&#x94AE;</code>&#x3002;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgPTA?w=370&amp;h=78" src="https://static.alili.tech/img/bVbgPTA?w=370&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5FC3;&#x60F3;&#xFF1A;so easy, &#x5728;&#x7236;&#x5BB9;&#x5668;&#x4E0A;&#x52A0;&#x4E00;&#x4E2A;<code>max-width: 200px; white-space: nowrap; overflow-x: auto;</code>&#x4E0D;&#x5C31;&#x641E;&#x5B9A;&#x4E86;&#x561B;&#x3002;Demo&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
  &lt;div class=&quot;son&quot;&gt;
    &lt;div class=&quot;delete_btn&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;son&quot;&gt;
    &lt;div class=&quot;delete_btn&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;son&quot;&gt;
    &lt;div class=&quot;delete_btn&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

.container {
  max-width: 500px;
  overflow-x: auto;
  white-space: nowrap;
}

.son {
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: lightblue;
  position: relative;
  margin-right: 20px;
}

.delete_btn {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  transform: translateX(-50%) translateY(-50%);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;container&quot;</span>&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;son&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;delete_btn&quot;</span>&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;son&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;delete_btn&quot;</span>&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;son&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;delete_btn&quot;</span>&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">overflow-x</span>: auto;
  <span class="hljs-attribute">white-space</span>: nowrap;
}

<span class="hljs-selector-class">.son</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">background-color</span>: lightblue;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.delete_btn</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: red;
  <span class="hljs-attribute">transform</span>: translateX(-<span class="hljs-number">50%</span>) translateY(-<span class="hljs-number">50%</span>);
}</code></pre><p>&#x539F;&#x672C;&#x4EE5;&#x4E3A;&#x4E00;&#x5207;&#x987A;&#x5229;&#xFF0C;&#x7ED3;&#x679C;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgP0y?w=517&amp;h=235" src="https://static.alili.tech/img/bVbgP0y?w=517&amp;h=235" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x770B;&#x7B2C;&#x77E9;&#x5F62;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x7EA2;&#x8272;&#x65B9;&#x5757;&#xFF0C;&#x539F;&#x672C;&#x4E3A;20 * 20&#x7684;&#x7EA2;&#x8272;&#x65B9;&#x5757;&#x6709;&#x4E00;&#x90E8;&#x5206;&#x88AB;&#x9690;&#x85CF;&#x4E86;&#x3002;&#x6211;&#x60F3;&#x5E94;&#x8BE5;&#x662F;overflow&#x5F71;&#x54CD;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x60F3;&#x901A;&#x8FC7;overflow-y: visible;&#x6765;&#x89E3;&#x51B3;,&#x7ED3;&#x679C;&#x662F;&#x4E0D;&#x884C;&#x7684;&#x3002;&#x7EC6;&#x5FC3;&#x7684;&#x670B;&#x53CB;&#x5E94;&#x8BE5;&#x8BB0;&#x5F97;overflow&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x5C31;&#x662F;visible&#x3002;&#x90A3;&#x4E48;&#x539F;&#x56E0;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><h2 id="articleHeader1">Why</h2><p>&#x627E;&#x4E86;&#x597D;&#x4E45;&#xFF0C;&#x5927;&#x81F4;&#x4E86;&#x89E3;&#x5230;&#x662F;&#x5982;&#x4E0B;&#x539F;&#x56E0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="The computed values of &#x2018;overflow-x&#x2019; and &#x2018;overflow-y&#x2019; are the same as their specified values, except that some combinations with &#x2018;visible&#x2019; are not possible: if one is specified as &#x2018;visible&#x2019; and the other is &#x2018;scroll&#x2019; or &#x2018;auto&#x2019;, then &#x2018;visible&#x2019; is set to &#x2018;auto&#x2019;. The computed value of &#x2018;overflow&#x2019; is equal to the computed value of &#x2018;overflow-x&#x2019; if &#x2018;overflow-y&#x2019; is the same; otherwise it is the pair of computed values of &#x2018;overflow-x&#x2019; and &#x2018;overflow-y&#x2019;." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">The computed values <span class="hljs-keyword">of</span> &#x2018;overflow-x&#x2019; <span class="hljs-keyword">and</span> &#x2018;overflow-y&#x2019; are <span class="hljs-keyword">the</span> same <span class="hljs-keyword">as</span> their specified values, except <span class="hljs-keyword">that</span> <span class="hljs-keyword">some</span> combinations <span class="hljs-keyword">with</span> &#x2018;visible&#x2019; are <span class="hljs-keyword">not</span> possible: <span class="hljs-keyword">if</span> one <span class="hljs-keyword">is</span> specified <span class="hljs-keyword">as</span> &#x2018;visible&#x2019; <span class="hljs-keyword">and</span> <span class="hljs-keyword">the</span> other <span class="hljs-keyword">is</span> &#x2018;scroll&#x2019; <span class="hljs-keyword">or</span> &#x2018;auto&#x2019;, <span class="hljs-keyword">then</span> &#x2018;visible&#x2019; <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span> <span class="hljs-keyword">to</span> &#x2018;auto&#x2019;. The computed value <span class="hljs-keyword">of</span> &#x2018;overflow&#x2019; <span class="hljs-keyword">is</span> <span class="hljs-keyword">equal</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> computed value <span class="hljs-keyword">of</span> &#x2018;overflow-x&#x2019; <span class="hljs-keyword">if</span> &#x2018;overflow-y&#x2019; <span class="hljs-keyword">is</span> <span class="hljs-keyword">the</span> same; otherwise <span class="hljs-keyword">it</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">the</span> pair <span class="hljs-keyword">of</span> computed values <span class="hljs-keyword">of</span> &#x2018;overflow-x&#x2019; <span class="hljs-keyword">and</span> &#x2018;overflow-y&#x2019;.</code></pre><p>&#x5927;&#x81F4;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x5F53;overflow-x&#x4E3A;scroll&#x6216;&#x8005;auto&#x65F6;&#xFF0C;overflow-y&#x88AB;&#x8BBE;&#x7F6E;&#x4E3A;auto&#xFF0C;&#x53CD;&#x4E4B;&#x4EA6;&#x7136;&#x3002;&#x8FD9;&#x5C31;&#x5F88;&#x5C34;&#x5C2C;&#x4E86;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5462;&#x3002;</p><p>ps: &#x4E0A;&#x9762;&#x90A3;&#x6BB5;&#x8BDD;&#x8BF4;&#x662F;&#x6765;&#x81EA;&#x4E8E;w3c&#x7684;&#x6587;&#x6863;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x627E;&#x4E86;&#x534A;&#x5929;&#x6CA1;&#x627E;&#x5230;&#x539F;&#x6587;&#xFF0C;&#x9EBB;&#x70E6;&#x627E;&#x5230;&#x4E86;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x7559;&#x4E2A;&#x94FE;&#x63A5;~ [&#x624B;&#x52A8;&#x72D7;&#x5934;]</p><h2 id="articleHeader2">How</h2><p>&#x7EC8;&#x7A76;&#x8FD8;&#x662F;&#x60F3;&#x8BA9;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x7EA2;&#x8272;&#x65B9;&#x5757;&#x663E;&#x793A;&#x5B8C;&#x6574;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5462;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x91C7;&#x7528;&#x7684;&#x662F;&#x5728;<code>container</code>&#x4E0A;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="padding-top: 20px;
margin-top: -20px;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>;
<span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">20px</span>;</code></pre><p>&#x539F;&#x7406;&#x5176;&#x5B9E;&#x633A;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x52A0;&#x4E86;<code>padding-top: 20px;</code>&#x540E;&#xFF0C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;&#x7EA2;&#x8272;&#x65B9;&#x5757;&#x5C31;&#x6709;&#x7A7A;&#x95F4;&#x663E;&#x793A;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x8D85;&#x51FA;&#x5BB9;&#x5668;&#x4F53;&#x79EF;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>margin-top: -20px;</code>&#x62B5;&#x6D88;&#x4F4D;&#x7F6E;&#x7684;&#x53D8;&#x5316;.&#x5982;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVbgQv3?w=514&amp;h=232" src="https://static.alili.tech/img/bVbgQv3?w=514&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>ps: &#x7B2C;&#x4E00;&#x4E2A;&#x7EA2;&#x8272;&#x65B9;&#x5757;&#x5DE6;&#x8FB9;&#x88AB;&#x906E;&#x4F4F;&#x7684;&#x90E8;&#x5206;&#x540C;&#x6837;&#x7684;&#x601D;&#x8DEF;&#x89E3;&#x51B3;&#xFF0C;&#x5373;&#x901A;&#x8FC7;padding-left&#x548C;margin-left&#x6765;&#x5904;&#x7406;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[踩坑] CSS中overflow-y: visible;不起作用

## 原文链接
[https://segmentfault.com/a/1190000016369151](https://segmentfault.com/a/1190000016369151)


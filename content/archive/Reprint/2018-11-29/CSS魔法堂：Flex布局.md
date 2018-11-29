---
title: 'CSS魔法堂：Flex布局' 
date: 2018-11-29 9:27:38
hidden: true
slug: v1nxu3txk4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<p>&#x2003;Flex&#x662F;Flexible Box&#x7684;&#x7F29;&#x5199;&#xFF0C;&#x5C31;&#x662F;&#x300C;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#x300D;&#x3002;&#x4ECE;2012&#x5E74;&#x5DF2;&#x7ECF;&#x9762;&#x4E16;&#xFF0C;&#x4F46;&#x7531;&#x4E8E;&#x5DE5;&#x4F5C;&#x73AF;&#x5883;&#x7684;&#x539F;&#x56E0;&#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x8BE6;&#x7EC6;&#x4E86;&#x89E3;&#x3002;&#x6700;&#x8FD1;&#x5DE5;&#x4F5C;&#x5FD9;&#x5230;&#x5934;&#x6655;&#x8111;&#x80C0;&#xFF0C;&#x662F;&#x8981;&#x5B66;&#x70B9;&#x65B0;&#x4E1C;&#x897F;&#x523A;&#x6FC0;&#x4E00;&#x4E0B;&#x5927;&#x8111;&#xFF0C;&#x6253;&#x6253;&#x9E21;&#x8840;&#x3002;</p>
<h2 id="articleHeader1">Flex&#x5C31;&#x8FD9;&#x4E48;&#x7B80;&#x5355;</h2>
<h3 id="articleHeader2">&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;</h3>
<p>&#x2003;&#x4E00;&#x8BF4;&#x5230;&#x517C;&#x5BB9;&#x6027;&#x5C31;&#x662F;&#x6C38;&#x8FDC;&#x7684;&#x75DB;&#xFF0C;&#x4E0D;&#x8FC7;&#x5E78;&#x8FD0;&#x7684;&#x662F;&#x53EA;&#x8981;&#x5728;IE10&#x52A0;<code>-ms-</code>&#x524D;&#x7F00;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x5566;^_^</p>
<h3 id="articleHeader3">&#x6D89;&#x53CA;&#x7684;&#x5BF9;&#x8C61;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166874" src="https://static.alili.tech/img/remote/1460000015166874" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x2003;Flex&#x5E03;&#x5C40;&#x4E3B;&#x8981;&#x662F;&#x64CD;&#x4F5C;<strong>Flex Container</strong> &#x548C; <strong>Flex Item</strong>&#x4E24;&#x7C7B;&#x5BF9;&#x8C61;&#x3002;<br><br><strong>Flex Container</strong>&#x4E3A;&#x4F5C;&#x4E3A;&#x5E03;&#x5C40;&#x5BB9;&#x5668;&#x62E5;&#x6709;<strong>main axis</strong>&#xFF0C;<strong>main start</strong>&#xFF0C;<strong>main end</strong>&#xFF0C;<strong>cross axis</strong>&#xFF0C;<strong>cross start</strong> &#x548C; <strong>cross end</strong>&#x5C5E;&#x6027;&#x3002;<br></p>
<ol>
<li>
<strong>main axis</strong>&#x4E3A;&#x4E3B;&#x8F74;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#xFF1B;</li>
<li>
<strong>main start</strong>&#x4E3A;&#x4E3B;&#x8F74;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x4E3B;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;(<strong>Flex Item</strong>&#x4F1A;&#x4ECE;<strong>main start</strong>&#x548C;<strong>cross start</strong>&#x5F00;&#x59CB;&#x6392;&#x5217;)&#xFF1B;</li>
<li>
<strong>main end</strong>&#x4E3A;&#x4E3B;&#x8F74;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x4E3B;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF1B;</li>
<li>
<strong>cross axis</strong>&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x5782;&#x76F4;&#x65B9;&#x5411;&#xFF1B;</li>
<li>
<strong>cross start</strong>&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF1B;</li>
<li>
<strong>cross end</strong>&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#x3002;</li>
</ol>
<p><strong>Flex Item</strong>&#x5219;&#x4E3A;&#x5BB9;&#x5668;&#x5185;&#x7684;&#x5B69;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x62E5;&#x6709;<strong>main size</strong>&#x548C;<strong>cross size</strong>&#x5C5E;&#x6027;&#x3002;<br></p>
<ol>
<li>
<strong>main size</strong>&#x4E3A;<strong>Flex Item</strong>&#x7684;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x5BBD;&#x5EA6;&#xFF1B;</li>
<li>
<strong>cross size</strong>&#x4E3A;<strong>Flex Item</strong>&#x7684;&#x4EA4;&#x53C9;&#x8F74;&#x65B9;&#x5411;&#x5BBD;&#x5EA6;&#x3002;</li>
</ol>
<h3 id="articleHeader4">&#x73A9;&#x8F6C;Flex Container</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;Flex Container&#xFF0C;&#x4E3A;&#x5176;&#x76F4;&#x63A5;&#x5B69;&#x5B50;&#x8282;&#x70B9;&#x521B;&#x5EFA;Flex Context */
display: flex;        /* &#x5B9A;&#x4E49;&#x5757;&#x7EA7;Flex Contianer */
display: inline-flex; /* &#x5B9A;&#x4E49;&#x884C;&#x7EA7;Flex Contianer */" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* &#x8BBE;&#x7F6E;Flex Container&#xFF0C;&#x4E3A;&#x5176;&#x76F4;&#x63A5;&#x5B69;&#x5B50;&#x8282;&#x70B9;&#x521B;&#x5EFA;Flex Context */</span>
<span class="hljs-attribute">display</span>: flex;        <span class="hljs-comment">/* &#x5B9A;&#x4E49;&#x5757;&#x7EA7;Flex Contianer */</span>
<span class="hljs-attribute">display</span>: inline-flex; <span class="hljs-comment">/* &#x5B9A;&#x4E49;&#x884C;&#x7EA7;Flex Contianer */</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;main/cross axis&#x65B9;&#x5411;&#x548C;main/cross start, main/cross end&#x7684;&#x4F4D;&#x7F6E;
 * row - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;main axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *               cross axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;cross start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;cross end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 * row-reverse - main axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *               cross axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;cross start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;cross end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 * column - main axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *          cross axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;cross start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;cross end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 * column-reverse - main axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *                  cross axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;cross start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;cross end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 */
flex-direction: row | row-reverse | column | column-reverse " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs q"><code>/* &#x8BBE;&#x7F6E;main/<span class="hljs-built_in">cross</span> axis&#x65B9;&#x5411;&#x548C;main/<span class="hljs-built_in">cross</span> start, main/<span class="hljs-built_in">cross</span> end&#x7684;&#x4F4D;&#x7F6E;
 * row - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;main axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *               <span class="hljs-built_in">cross</span> axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;<span class="hljs-built_in">cross</span> start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;<span class="hljs-built_in">cross</span> end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 * row-<span class="hljs-built_in">reverse</span> - main axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *               <span class="hljs-built_in">cross</span> axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;<span class="hljs-built_in">cross</span> start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;<span class="hljs-built_in">cross</span> end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 * column - main axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *          <span class="hljs-built_in">cross</span> axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;<span class="hljs-built_in">cross</span> start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;<span class="hljs-built_in">cross</span> end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 * column-<span class="hljs-built_in">reverse</span> - main axis&#x4E3A;&#x5782;&#x76F4;&#xFF0C;main start&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0B;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;main end&#x4E3A;&#x4E3B;&#x8F74;&#x548C;&#x4E0A;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 *                  <span class="hljs-built_in">cross</span> axis&#x4E3A;&#x6C34;&#x5E73;&#xFF0C;<span class="hljs-built_in">cross</span> start&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x5DE6;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;&#xFF0C;<span class="hljs-built_in">cross</span> end&#x4E3A;&#x4EA4;&#x53C9;&#x8F74;&#x548C;&#x53F3;&#x4FA7;&#x8FB9;&#x6846;&#x7684;&#x4EA4;&#x53C9;&#x70B9;
 */
flex-direction: row | row-<span class="hljs-built_in">reverse</span> | column | column-<span class="hljs-built_in">reverse</span> </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x662F;&#x5426;&#x6362;&#x884C;
 * nowrap - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x6253;&#x6B7B;&#x90FD;&#x4E0D;&#x6362;&#x884C;
 * wrap - &#x4E56;&#x4E56;&#x6362;&#x884C;&#xFF0C;&#x7B2C;&#x4E00;&#x884C;&#x5230;&#x6700;&#x540E;&#x4E00;&#x884C;&#x7684;&#x65B9;&#x5411;&#x4E3A;&#x4ECE; cross start &#x5230; cross end
 * wrap-reverse - &#x4E56;&#x4E56;&#x6362;&#x884C;&#xFF0C;&#x4F46;&#x7B2C;&#x4E00;&#x884C;&#x5230;&#x6700;&#x540E;&#x4E00;&#x884C;&#x7684;&#x65B9;&#x5411;&#x4E3A;&#x4ECE; cross end &#x5230; cross start
 */
flex-wrap: nowrap | wrap | wrap-reverse" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lua"><code>/* &#x662F;&#x5426;&#x6362;&#x884C;
 * nowrap - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x6253;&#x6B7B;&#x90FD;&#x4E0D;&#x6362;&#x884C;
 * <span class="hljs-built_in">wrap</span> - &#x4E56;&#x4E56;&#x6362;&#x884C;&#xFF0C;&#x7B2C;&#x4E00;&#x884C;&#x5230;&#x6700;&#x540E;&#x4E00;&#x884C;&#x7684;&#x65B9;&#x5411;&#x4E3A;&#x4ECE; cross start &#x5230; cross <span class="hljs-keyword">end</span>
 * <span class="hljs-built_in">wrap</span>-reverse - &#x4E56;&#x4E56;&#x6362;&#x884C;&#xFF0C;&#x4F46;&#x7B2C;&#x4E00;&#x884C;&#x5230;&#x6700;&#x540E;&#x4E00;&#x884C;&#x7684;&#x65B9;&#x5411;&#x4E3A;&#x4ECE; cross <span class="hljs-keyword">end</span> &#x5230; cross start
 */
flex-<span class="hljs-built_in">wrap</span>: nowrap | <span class="hljs-built_in">wrap</span> | <span class="hljs-built_in">wrap</span>-reverse</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166875" src="https://static.alili.tech/img/remote/1460000015166875" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x4E00;&#x6B21;&#x641E;&#x5B9A;flex-direction &#x548C; flex-wrap&#x8BBE;&#x7F6E;
 */
flex-flow: &lt;flex-direction&gt; || &lt;flex-wrap&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">/* &#x4E00;&#x6B21;&#x641E;&#x5B9A;flex-direction &#x548C; flex-wrap&#x8BBE;&#x7F6E;
 */</span>
flex-flow: <span class="hljs-params">&lt;flex-direction&gt;</span> || <span class="hljs-params">&lt;flex-wrap&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;main axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;
 * flex-start - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5411;main start&#x5BF9;&#x9F50;
 * flex-end - &#x5411;main end&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * space-between - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E4B;&#x95F4;
 * space-around - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E24;&#x8FB9;
 * space-evenly - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x6309;&quot;&#x591A;&#x4F59;&#x7A7A;&#x95F4;/(FlexItem&#x6570;+1)&quot;&#x8BA1;&#x7B97;&#x5F97;&#x5230;&#x7A7A;&#x95F4;&#x5BBD;&#x5EA6;&#xFF0C;&#x7136;&#x540E;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E24;&#x8FB9;
 */
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>/* &#x8BBE;&#x7F6E;main axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;
 * flex-start - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5411;main start&#x5BF9;&#x9F50;
 * flex-<span class="hljs-keyword">end</span> - &#x5411;main <span class="hljs-keyword">end</span>&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E4B;&#x95F4;
 * <span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span> - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E24;&#x8FB9;
 * <span class="hljs-literal">space</span>-evenly - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x6309;<span class="hljs-string">&quot;&#x591A;&#x4F59;&#x7A7A;&#x95F4;/(FlexItem&#x6570;+1)&quot;</span>&#x8BA1;&#x7B97;&#x5F97;&#x5230;&#x7A7A;&#x95F4;&#x5BBD;&#x5EA6;&#xFF0C;&#x7136;&#x540E;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E24;&#x8FB9;
 */
justify-content: flex-start | flex-<span class="hljs-keyword">end</span> | center | <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> | <span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span> | <span class="hljs-literal">space</span>-evenly</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166876" src="https://static.alili.tech/img/remote/1460000015166876" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;cross axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;
 * stretch - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F53;height&#x4E3A;auto&#x65F6;&#xFF0C;Flex Item&#x88AB;&#x62C9;&#x4F38;&#x6CBE;&#x6EE1;cross axis&#x7684;&#x7A7A;&#x95F4;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x6548;&#x679C;&#x3002;
 * flex-start - &#x5411;cross start&#x5BF9;&#x9F50;
 * flex-end - &#x5411;cross end&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * baseline - &#x5BF9;&#x9F50;Flex Container&#x7684;baseline
 */
align-items: flex-start | flex-end | center | stretch | baseline" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coq"><code>/* &#x8BBE;&#x7F6E;cross axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;
 * stretch - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F53;height&#x4E3A;<span class="hljs-built_in">auto</span>&#x65F6;&#xFF0C;Flex Item&#x88AB;&#x62C9;&#x4F38;&#x6CBE;&#x6EE1;cross axis&#x7684;&#x7A7A;&#x95F4;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x6548;&#x679C;&#x3002;
 * flex-start - &#x5411;cross start&#x5BF9;&#x9F50;
 * flex-<span class="hljs-keyword">end</span> - &#x5411;cross <span class="hljs-keyword">end</span>&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * baseline - &#x5BF9;&#x9F50;Flex Container&#x7684;baseline
 */
align-items: flex-start | <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span> | <span class="hljs-type">center</span> | <span class="hljs-type">stretch</span> | <span class="hljs-type">baseline</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;cross axis&#x51FA;&#x73B0;&#x591A;&#x884C;&#x65F6;&#xFF0C;cross axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;&#x3002;&#x5F53;&#x4EC5;&#x6709;&#x4E00;&#x884C;&#x65F6;&#xFF0C;&#x65E0;&#x6548;&#x679C;&#x3002;
 * stretch - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F53;height&#x4E3A;auto&#x65F6;&#xFF0C;Flex Item&#x88AB;&#x62C9;&#x4F38;&#x6CBE;&#x6EE1;cross axis&#x7684;&#x7A7A;&#x95F4;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x6548;&#x679C;&#x3002;
 * flex-start - &#x5411;cross start&#x5BF9;&#x9F50;
 * flex-end - &#x5411;cross end&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * space-between - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E4B;&#x95F4;
 * space-round - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E24;&#x8FB9; 
 */
align-content: flex-start | flex-end | center | stretch | space-between | space-around" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code>/* &#x8BBE;&#x7F6E;cross axis&#x51FA;&#x73B0;&#x591A;&#x884C;&#x65F6;&#xFF0C;cross axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;&#x3002;&#x5F53;&#x4EC5;&#x6709;&#x4E00;&#x884C;&#x65F6;&#xFF0C;&#x65E0;&#x6548;&#x679C;&#x3002;
 * stretch - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F53;height&#x4E3A;auto&#x65F6;&#xFF0C;Flex Item&#x88AB;&#x62C9;&#x4F38;&#x6CBE;&#x6EE1;cross axis&#x7684;&#x7A7A;&#x95F4;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x6548;&#x679C;&#x3002;
 * flex-start - &#x5411;cross start&#x5BF9;&#x9F50;
 * flex-<span class="hljs-keyword">end</span> - &#x5411;cross <span class="hljs-keyword">end</span>&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E4B;&#x95F4;
 * <span class="hljs-literal">space</span>-<span class="hljs-built_in">round</span> - &#x82E5;&#x6709;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#xFF0C;&#x5219;&#x5E73;&#x5747;&#x5206;&#x914D;&#x5230;&#x5404;Flex Item&#x4E24;&#x8FB9; 
 */
align-content: flex-start | flex-<span class="hljs-keyword">end</span> | center | stretch | <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> | <span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span></code></pre>
<h3 id="articleHeader5">&#x73A9;&#x8F6C;Flex Item</h3>
<p><strong>&#x6CE8;&#x610F;&#xFF1A;Flex Item&#x7684;float,clear&#x548C;vertical-align&#x5747;&#x65E0;&#x6548;&#x3002;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;&#x663E;&#x793A;&#x987A;&#x5E8F;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#xFF0C;&#x6839;&#x636E;&#x5143;&#x7D20;&#x5728;DOM&#x6811;&#x7684;&#x4F4D;&#x7F6E;&#x51B3;&#x5B9A;&#x663E;&#x793A;&#x7684;&#x987A;&#x5E8F;
 */
order: &lt;integer&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">/* &#x8BBE;&#x7F6E;&#x663E;&#x793A;&#x987A;&#x5E8F;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#xFF0C;&#x6839;&#x636E;&#x5143;&#x7D20;&#x5728;DOM&#x6811;&#x7684;&#x4F4D;&#x7F6E;&#x51B3;&#x5B9A;&#x663E;&#x793A;&#x7684;&#x987A;&#x5E8F;
 */</span>
<span class="hljs-symbol">order:</span> <span class="hljs-params">&lt;integer&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;&#x5F53;main axis&#x65B9;&#x5411;&#x5B58;&#x5728;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#x65F6;&#xFF0C;&#x5143;&#x7D20;&#x62C9;&#x4F38;&#x6240;&#x5360;&#x7684;&#x6BD4;&#x4F8B;&#x3002;
 * &#x4F8B;&#x5982;#div1[style=&quot;flex-grow:1&quot;]&#x548C;#div2[style=&quot;flex-grow:3&quot;]&#xFF0C;&#x73B0;&#x5728;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#x4E3A;400px&#xFF0C;&#x90A3;&#x4E48;div1&#x5360;400*1/(1+3)&#xFF0C;&#x800C;div2&#x5360;400*3/(1+3)&#x3002;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#xFF0C;&#x5373;&#x5143;&#x7D20;&#x4E0D;&#x62C9;&#x4F38;
 */
flex-grow: &lt;number&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs purebasic"><code>/* &#x8BBE;&#x7F6E;&#x5F53;main axis&#x65B9;&#x5411;&#x5B58;&#x5728;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#x65F6;&#xFF0C;&#x5143;&#x7D20;&#x62C9;&#x4F38;&#x6240;&#x5360;&#x7684;&#x6BD4;&#x4F8B;&#x3002;
 * &#x4F8B;&#x5982;<span class="hljs-symbol">#div1</span>[style=<span class="hljs-string">&quot;flex-grow:1&quot;</span>]&#x548C;<span class="hljs-symbol">#div2</span>[style=<span class="hljs-string">&quot;flex-grow:3&quot;</span>]&#xFF0C;&#x73B0;&#x5728;&#x591A;&#x4F59;&#x7A7A;&#x95F4;&#x4E3A;400px&#xFF0C;&#x90A3;&#x4E48;div1&#x5360;400*1/(1+3)&#xFF0C;&#x800C;div2&#x5360;400*3/(1+3)&#x3002;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;0&#xFF0C;&#x5373;&#x5143;&#x7D20;&#x4E0D;&#x62C9;&#x4F38;
 */
flex-grow: &lt;number&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;&#x5F53;main axis&#x65B9;&#x5411;&#x5B58;&#x5728;&#x7A7A;&#x95F4;&#x4E0D;&#x8DB3;&#x4E14;flex-wrap:nowrap&#x65F6;&#xFF0C;&#x5143;&#x7D20;&#x7684;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#x3002;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;1
 */
flex-shrink: &lt;number&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">/* &#x8BBE;&#x7F6E;&#x5F53;main axis&#x65B9;&#x5411;&#x5B58;&#x5728;&#x7A7A;&#x95F4;&#x4E0D;&#x8DB3;&#x4E14;flex-wrap:nowrap&#x65F6;&#xFF0C;&#x5143;&#x7D20;&#x7684;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#x3002;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;1
 */</span>
flex-shrink: <span class="hljs-params">&lt;number&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x9ED8;&#x8BA4;&#x5BBD;&#x5EA6;&#xFF0C;&#x5F53;&#x8BBE;&#x7F6E;&#x4E3A;0&#x65F6;flex-grow&#x65E0;&#x6548;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;auto
 */
flex-basis: auto | &lt;length&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coq"><code>/* &#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x9ED8;&#x8BA4;&#x5BBD;&#x5EA6;&#xFF0C;&#x5F53;&#x8BBE;&#x7F6E;&#x4E3A;<span class="hljs-number">0</span>&#x65F6;flex-grow&#x65E0;&#x6548;
 * &#x9ED8;&#x8BA4;&#x503C;&#x4E3A;<span class="hljs-built_in">auto</span>
 */
flex-basis: <span class="hljs-built_in">auto</span> | <span class="hljs-type">&lt;length</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x4E00;&#x6B21;&#x641E;&#x5B9A;flex-grow&#x3001; flex-shrink&#x548C;flex-basis
 * &#x9ED8;&#x8BA4;&#x503C;0 1 auto&#xFF0C;&#x5173;&#x952E;&#x503C;none &#x4E3A; 0 0 auto&#xFF0C;&#x5173;&#x952E;&#x503C;auto&#x4E3A; 1 1 auto&#x3002;
 */
flex: none | [&lt;flex-grow&gt; &lt;flex-shrink&gt;? || &lt;flex-basis&gt;]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coq"><code>/* &#x4E00;&#x6B21;&#x641E;&#x5B9A;flex-grow&#x3001; flex-shrink&#x548C;flex-basis
 * &#x9ED8;&#x8BA4;&#x503C;<span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-built_in">auto</span>&#xFF0C;&#x5173;&#x952E;&#x503C;none &#x4E3A; <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">auto</span>&#xFF0C;&#x5173;&#x952E;&#x503C;<span class="hljs-built_in">auto</span>&#x4E3A; <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-built_in">auto</span>&#x3002;
 */
flex: none | <span class="hljs-type">[&lt;flex</span>-grow&gt; &lt;flex-shrink&gt;? |<span class="hljs-type">| &lt;flex</span>-basis&gt;]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8BBE;&#x7F6E;cross axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;
 * stretch - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F53;height&#x4E3A;auto&#x65F6;&#xFF0C;Flex Item&#x88AB;&#x62C9;&#x4F38;&#x6CBE;&#x6EE1;cross axis&#x7684;&#x7A7A;&#x95F4;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x6548;&#x679C;&#x3002;
 * flex-start - &#x5411;cross start&#x5BF9;&#x9F50;
 * flex-end - &#x5411;cross end&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * baseline - &#x5BF9;&#x9F50;Flex Container&#x7684;baseline
 */
align-self: auto | flex-start | flex-end | center | baseline | stretch" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coq"><code>/* &#x8BBE;&#x7F6E;cross axis&#x65B9;&#x5411;&#x7684;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;
 * stretch - &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F53;height&#x4E3A;<span class="hljs-built_in">auto</span>&#x65F6;&#xFF0C;Flex Item&#x88AB;&#x62C9;&#x4F38;&#x6CBE;&#x6EE1;cross axis&#x7684;&#x7A7A;&#x95F4;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x6548;&#x679C;&#x3002;
 * flex-start - &#x5411;cross start&#x5BF9;&#x9F50;
 * flex-<span class="hljs-keyword">end</span> - &#x5411;cross <span class="hljs-keyword">end</span>&#x5BF9;&#x9F50;
 * center - &#x5C45;&#x4E2D;
 * baseline - &#x5BF9;&#x9F50;Flex Container&#x7684;baseline
 */
align-self: <span class="hljs-built_in">auto</span> | <span class="hljs-type">flex</span>-start | <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span> | <span class="hljs-type">center</span> | <span class="hljs-type">baseline</span> | <span class="hljs-type">stretch</span></code></pre>
<h2 id="articleHeader6">&#x5E94;&#x7528;</h2>
<p>&#x2003;&#x901A;&#x8FC7;Flex Layout&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x8FC7;&#x53BB;&#x4E0D;&#x597D;&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;</p>
<h3 id="articleHeader7">&#x8272;&#x5B50;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166877?w=863&amp;h=139" src="https://static.alili.tech/img/remote/1460000015166877?w=863&amp;h=139" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box box1&quot;&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;div class=&quot;box box2&quot;&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;div class=&quot;box box3&quot;&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;div class=&quot;box box4&quot;&gt;
  &lt;div class=&quot;column&quot;&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class=&quot;column&quot;&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;box box5&quot;&gt;
  &lt;div class=&quot;column&quot;&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;/div&gt;
  &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;div class=&quot;column&quot;&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;box box6&quot;&gt;
  &lt;div class=&quot;column&quot;&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class=&quot;column&quot;&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;dot&quot;&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box box1&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box box2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box box3&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box box4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;column&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;column&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box box5&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;column&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;column&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box box6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;column&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;column&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    vertical-align: top;
    margin: 10px;
    padding: 10px;
    width: 100px;
    height: 100px;
    background: #ccc;
    border-radius: 10%;
    box-shadow: 0 5px 1px #fff inset
        , 0 -5px 1px #888 inset
        , 5px 0 1px #aaa inset
        , -5px 0 1px #aaa inset;
    display: inline-flex;
    flex-flow: row wrap;
}
.dot{
    width:30px;
  height:30px;
    background: #222;
    border-radius:50%;
    box-shadow: 1px 4px 1px #000 inset
        , -1px -3px 3px #444 inset;
}

.box1{
    justify-content: center;
    align-items: center;
}
.box2{
    justify-content: space-between;
}
.box2 &gt; .dot:last-child{
    align-self: flex-end;
}
.box3{
    justify-content: space-between;
}
.box3 &gt; .dot:nth-of-type(2){
    align-self: center;
}
.box3 &gt; .dot:last-child{
    align-self: flex-end;
}

.box4{
      flex-flow: column;
        justify-content: space-between;
}
.column{
    display: flex;
    justify-content: space-between;
}

.box5{
      flex-flow: column;
        justify-content: space-between;
}
.box5 &gt; .dot{
    align-self: center;
}

.box6{
      flex-flow: row;
        justify-content: space-between;
}
.box6 &gt; .column{
  flex-flow: column;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">vertical-align</span>: top;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#fff</span> inset
        , <span class="hljs-number">0</span> -<span class="hljs-number">5px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#888</span> inset
        , <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">#aaa</span> inset
        , -<span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">#aaa</span> inset;
    <span class="hljs-attribute">display</span>: inline-flex;
    <span class="hljs-attribute">flex-flow</span>: row wrap;
}
<span class="hljs-selector-class">.dot</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#222</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#000</span> inset
        , -<span class="hljs-number">1px</span> -<span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">#444</span> inset;
}

<span class="hljs-selector-class">.box1</span>{
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
}
<span class="hljs-selector-class">.box2</span>{
    <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.box2</span> &gt; <span class="hljs-selector-class">.dot</span><span class="hljs-selector-pseudo">:last-child</span>{
    <span class="hljs-attribute">align-self</span>: flex-end;
}
<span class="hljs-selector-class">.box3</span>{
    <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.box3</span> &gt; <span class="hljs-selector-class">.dot</span><span class="hljs-selector-pseudo">:nth-of-type(2)</span>{
    <span class="hljs-attribute">align-self</span>: center;
}
<span class="hljs-selector-class">.box3</span> &gt; <span class="hljs-selector-class">.dot</span><span class="hljs-selector-pseudo">:last-child</span>{
    <span class="hljs-attribute">align-self</span>: flex-end;
}

<span class="hljs-selector-class">.box4</span>{
      <span class="hljs-attribute">flex-flow</span>: column;
        <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-between;
}

<span class="hljs-selector-class">.box5</span>{
      <span class="hljs-attribute">flex-flow</span>: column;
        <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.box5</span> &gt; <span class="hljs-selector-class">.dot</span>{
    <span class="hljs-attribute">align-self</span>: center;
}

<span class="hljs-selector-class">.box6</span>{
      <span class="hljs-attribute">flex-flow</span>: row;
        <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.box6</span> &gt; <span class="hljs-selector-class">.column</span>{
  <span class="hljs-attribute">flex-flow</span>: column;
}</code></pre>
<h3 id="articleHeader8">&#x5723;&#x676F;&#x5E03;&#x5C40;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166878?w=1094&amp;h=210" src="https://static.alili.tech/img/remote/1460000015166878?w=1094&amp;h=210" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body class=&quot;container&quot;&gt;
  &lt;header&gt;#header&lt;/header&gt;
  &lt;main&gt;#main&lt;/main&gt;
  &lt;aside class=&quot;left-aside&quot;&gt;#aside1&lt;/aside&gt;
  &lt;aside class=&quot;right-aside&quot;&gt;#aside2&lt;/aside&gt;
  &lt;footer&gt;#footer&lt;/footer&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>#header<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>#main<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left-aside&quot;</span>&gt;</span>#aside1<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right-aside&quot;</span>&gt;</span>#aside2<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>#footer<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    margin:0;
    font-style: italic;
    font-family: sans;
}

/* Holy Grail Layout */
.container{
    display: flex;
    flex-direction: column;
}

@media all and (min-width: 600px){
    .container{
        flex-flow: row wrap;
    }
    header,footer{
        flex: 0 0 100%;
    }
    header{
        order: 0;
    }
    footer{
        order: 4;
    }
    .left-aside{
        order: 1;
    }
    .right-aside{
        order: 3;
    }
    .left-aside,.right-aside{
        flex: 0 0 10em;
    }
    main{
        order: 2;
        flex: 1;
    }
}

/* User Defined Style*/
.container &gt; *{
    text-align: center;
}
main{
    background: #ccc;
    line-height: 6;
}
.left-aside{
    background: skyblue;
    line-height: 4;
}
.right-aside{
    background: tomato;
    line-height: 4;
}
header,footer{
    background: #666;
    line-height: 3;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-style</span>: italic;
    <span class="hljs-attribute">font-family</span>: sans;
}

<span class="hljs-comment">/* Holy Grail Layout */</span>
<span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
}

@<span class="hljs-keyword">media</span> all and (min-width: <span class="hljs-number">600px</span>){
    <span class="hljs-selector-class">.container</span>{
        <span class="hljs-attribute">flex-flow</span>: row wrap;
    }
    <span class="hljs-selector-tag">header</span>,<span class="hljs-selector-tag">footer</span>{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-tag">header</span>{
        <span class="hljs-attribute">order</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">footer</span>{
        <span class="hljs-attribute">order</span>: <span class="hljs-number">4</span>;
    }
    <span class="hljs-selector-class">.left-aside</span>{
        <span class="hljs-attribute">order</span>: <span class="hljs-number">1</span>;
    }
    <span class="hljs-selector-class">.right-aside</span>{
        <span class="hljs-attribute">order</span>: <span class="hljs-number">3</span>;
    }
    <span class="hljs-selector-class">.left-aside</span>,<span class="hljs-selector-class">.right-aside</span>{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10em</span>;
    }
    <span class="hljs-selector-tag">main</span>{
        <span class="hljs-attribute">order</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
    }
}

<span class="hljs-comment">/* User Defined Style*/</span>
<span class="hljs-selector-class">.container</span> &gt; *{
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-tag">main</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">6</span>;
}
<span class="hljs-selector-class">.left-aside</span>{
    <span class="hljs-attribute">background</span>: skyblue;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">4</span>;
}
<span class="hljs-selector-class">.right-aside</span>{
    <span class="hljs-attribute">background</span>: tomato;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">4</span>;
}
<span class="hljs-selector-tag">header</span>,<span class="hljs-selector-tag">footer</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#666</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">3</span>;
}</code></pre>
<h3 id="articleHeader9">&#x6805;&#x683C;&#x7CFB;&#x7EDF;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166879?w=1086&amp;h=106" src="https://static.alili.tech/img/remote/1460000015166879?w=1086&amp;h=106" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;grid&quot;&gt;
  &lt;div class=&quot;row&quot;&gt;
    &lt;div class=&quot;col col-5&quot;&gt;
      &lt;div&gt;5/10&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;col col-4&quot;&gt;
      &lt;div&gt;4/10&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;col col-1&quot;&gt;
      &lt;div&gt;1/10&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col&quot;&gt;
    &lt;div&gt;
      auto
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;col col-3&quot;&gt;
    &lt;div&gt;
      3/10
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col col-5&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>5/10<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col col-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>4/10<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col col-1&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>1/10<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      auto
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col col-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      3/10
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Mobile First Grid System */
.grid{
    display: flex;
    flex-flow: row wrap;
}
.row{
    flex:0 0 100%;
    display:flex;
    flex-flow: row wrap;
}
.col{
    box-sizing: border-box;
    padding: 5px;
    flex: 0 0 100%;
}
@media all and (min-width:600px){
.col{
    flex: 1;
}
.col-10{flex:0 0 100%;}
.col-9{flex:0 0 90%;}
.col-8{flex:0 0 80%;}
.col-7{flex:0 0 70%;}
.col-6{flex:0 0 60%;}
.col-5{flex:0 0 50%;}
.col-4{flex:0 0 40%;}
.col-3{flex:0 0 30%;}
.col-2{flex:0 0 20%;}
.col-1{flex:0 0 10%;}
}

/* User Defined Style*/
.col&gt;div{
    text-align: center;
    background: #bbb;
    line-height: 2.5;
    height: 100%;
    font-family: sans;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* Mobile First Grid System */</span>
<span class="hljs-selector-class">.grid</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-flow</span>: row wrap;
}
<span class="hljs-selector-class">.row</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">flex-flow</span>: row wrap;
}
<span class="hljs-selector-class">.col</span>{
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
}
@<span class="hljs-keyword">media</span> all and (min-width:<span class="hljs-number">600px</span>){
<span class="hljs-selector-class">.col</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.col-10</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;}
<span class="hljs-selector-class">.col-9</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">90%</span>;}
<span class="hljs-selector-class">.col-8</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">80%</span>;}
<span class="hljs-selector-class">.col-7</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">70%</span>;}
<span class="hljs-selector-class">.col-6</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">60%</span>;}
<span class="hljs-selector-class">.col-5</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;}
<span class="hljs-selector-class">.col-4</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">40%</span>;}
<span class="hljs-selector-class">.col-3</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span>;}
<span class="hljs-selector-class">.col-2</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20%</span>;}
<span class="hljs-selector-class">.col-1</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10%</span>;}
}

<span class="hljs-comment">/* User Defined Style*/</span>
<span class="hljs-selector-class">.col</span>&gt;<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#bbb</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2.5</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">font-family</span>: sans;
}</code></pre>
<h3 id="articleHeader10">&#x5E26;&#x9644;&#x52A0;&#x9879;&#x7684;&#x8868;&#x5355;&#x63A7;&#x4EF6;</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015166880" src="https://static.alili.tech/img/remote/1460000015166880" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;form-input&quot;&gt;
  &lt;i class=&quot;form-addon&quot;&gt;Amount&lt;/i&gt;
  &lt;input class=&quot;form-control&quot;&gt;
  &lt;i class=&quot;form-addon form-addon-after&quot;&gt;Encrypt&lt;/i&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-input&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-addon&quot;</span>&gt;</span>Amount<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-control&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-addon form-addon-after&quot;</span>&gt;</span>Encrypt<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".form-input{
    display: inline-flex;
    line-height: 2;
    border: solid 1px rgba(0,0,0,0.3);
}
.form-input:hover{
        border: solid 1px rgba(0,0,0,0.4);
}
.form-addon{
    font-style: normal;
    color: #666;
    background: #ddd;
    padding-left: 10px;
    padding-right: 10px;
    border-right: solid 1px rgba(0,0,0,0.3);
}
.form-addon-after{
    border-left: solid 1px rgba(0,0,0,0.3);
    border-right: none 0;
}
.form-control{
    border:none 0;
    outline-color: transparent;
    padding: 5px;
    caret-color: #888;
    font-size: 16px;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.form-input</span>{
    <span class="hljs-attribute">display</span>: inline-flex;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
}
<span class="hljs-selector-class">.form-input</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.4);
}
<span class="hljs-selector-class">.form-addon</span>{
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-right</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
}
<span class="hljs-selector-class">.form-addon-after</span>{
    <span class="hljs-attribute">border-left</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
    <span class="hljs-attribute">border-right</span>: none <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.form-control</span>{
    <span class="hljs-attribute">border</span>:none <span class="hljs-number">0</span>;
    <span class="hljs-attribute">outline-color</span>: transparent;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">caret-color</span>: <span class="hljs-number">#888</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}</code></pre>
<h2 id="articleHeader11">&#x603B;&#x7ED3;</h2>
<p>&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x8F6C;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9134088.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a>  ^_^&#x80A5;&#x4ED4;John</p>
<h2 id="articleHeader12">&#x53C2;&#x8003;</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：Flex布局

## 原文链接
[https://segmentfault.com/a/1190000015166869](https://segmentfault.com/a/1190000015166869)


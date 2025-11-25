---
title: '[npm资源] naming-style，快速转换各种命名风格' 
date: 2018-11-23 2:30:10
hidden: true
slug: 0094ph26awfnf
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">naming-style</h1><p><a href="https://www.npmjs.com/package/naming-style" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p><p>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5DE5;&#x5177;&#x7C7B;&#x5E93;&#xFF0C;&#x7528;&#x4E8E;&#x5C06;&#x6587;&#x672C;&#x8F6C;&#x5316;&#x4E3A;&#x4E0D;&#x540C;&#x683C;&#x5F0F;&#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;&#xFF08;&#x5982;&#xFF1A;&#x9A7C;&#x5CF0;&#x5F0F;&#x3001;&#x8FDE;&#x5B57;&#x7B26;&#x5F0F;&#x3001;&#x5E38;&#x91CF;&#x5F0F;&#x7B49;&#xFF09;&#x3002;</p><h2 id="articleHeader1">&#x5B89;&#x88C5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add naming-style" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">yarn <span class="hljs-keyword">add</span><span class="bash"> naming-style</span></code></pre><p>or</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i naming-style" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> naming-style</code></pre><h2 id="articleHeader2">&#x4F7F;&#x7528;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  style,
  camel,
  pascal,
  hyphen,
  constant,
  snake,
  underscore,
  setence,
} from &apos;naming-style&apos;;

style(&apos;iAm24YearsOld&apos;); // &#x68C0;&#x6D4B;&#x6587;&#x672C; &apos;iAm24YearsOld&apos; &#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;
// Output: &apos;camel&apos;

style(&apos;--naming-style -loves you&apos;); // &#x68C0;&#x6D4B;&#x6587;&#x672C; &apos;--naming-style -loves you&apos; &#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;
// Output: &apos;other&apos;

camel(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x9A7C;&#x5CF0;&#x5F0F;&#x547D;&#x540D;
// Output: &apos;namingStyleLovesYou&apos;

pascal(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x5927;&#x5199;&#x9A7C;&#x5CF0;&#x5F0F;&#x547D;&#x540D;
// Output: &apos;NamingStyleLovesYou&apos;

hyphen(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x8FDE;&#x5B57;&#x7B26;&#x5F0F;&#x547D;&#x540D;
// Output: &apos;naming-style-loves-you&apos;

constant(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x5E38;&#x91CF;&#x5F0F;&#x547D;&#x540D;
// Output: &apos;NAMING_STYLE_LOVES_YOU&apos;

snake(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x201C;&#x86C7;&#x201D;&#x5F0F;&#x547D;&#x540D;
// Output: &apos;naming_style_loves_you&apos;

sentence(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x5355;&#x4E2A;&#x53E5;&#x5B50;
// Output: &apos;Naming-style loves you&apos;

underscore(&apos;--naming-style -loves you&apos;); // &#x8F6C;&#x6362;&#x4E3A;&#x4E0B;&#x5212;&#x7EBF;&#x5F62;&#x5F0F;
// Output: &apos;__naming_style__loves_you&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {
  style,
  camel,
  pascal,
  hyphen,
  constant,
  snake,
  underscore,
  setence,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;naming-style&apos;</span>;

style(<span class="hljs-string">&apos;iAm24YearsOld&apos;</span>); <span class="hljs-comment">// &#x68C0;&#x6D4B;&#x6587;&#x672C; &apos;iAm24YearsOld&apos; &#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;</span>
<span class="hljs-comment">// Output: &apos;camel&apos;</span>

style(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x68C0;&#x6D4B;&#x6587;&#x672C; &apos;--naming-style -loves you&apos; &#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;</span>
<span class="hljs-comment">// Output: &apos;other&apos;</span>

camel(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x9A7C;&#x5CF0;&#x5F0F;&#x547D;&#x540D;</span>
<span class="hljs-comment">// Output: &apos;namingStyleLovesYou&apos;</span>

pascal(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x5927;&#x5199;&#x9A7C;&#x5CF0;&#x5F0F;&#x547D;&#x540D;</span>
<span class="hljs-comment">// Output: &apos;NamingStyleLovesYou&apos;</span>

hyphen(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x8FDE;&#x5B57;&#x7B26;&#x5F0F;&#x547D;&#x540D;</span>
<span class="hljs-comment">// Output: &apos;naming-style-loves-you&apos;</span>

constant(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x5E38;&#x91CF;&#x5F0F;&#x547D;&#x540D;</span>
<span class="hljs-comment">// Output: &apos;NAMING_STYLE_LOVES_YOU&apos;</span>

snake(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x201C;&#x86C7;&#x201D;&#x5F0F;&#x547D;&#x540D;</span>
<span class="hljs-comment">// Output: &apos;naming_style_loves_you&apos;</span>

sentence(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x5355;&#x4E2A;&#x53E5;&#x5B50;</span>
<span class="hljs-comment">// Output: &apos;Naming-style loves you&apos;</span>

underscore(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>); <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A;&#x4E0B;&#x5212;&#x7EBF;&#x5F62;&#x5F0F;</span>
<span class="hljs-comment">// Output: &apos;__naming_style__loves_you&apos;</span></code></pre><h2 id="articleHeader3">&#x7279;&#x6027;</h2><h3 id="articleHeader4">1. &#x5DE5;&#x5177;&#x65B9;&#x6CD5;</h3><ul><li><p>&#x6B64;&#x7C7B;&#x5E93;&#x63D0;&#x4F9B;&#x4E86; <strong>8</strong> &#x4E2A;&#x5DE5;&#x5177;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li><code>style()</code> &#x7528;&#x4E8E;&#x68C0;&#x6D4B;&#x6587;&#x672C;&#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;</li><li>&#x5176;&#x4ED6; <strong>7</strong> &#x4E2A;&#x65B9;&#x6CD5;&#x5206;&#x522B;&#x7528;&#x4E8E;&#x5C06;&#x6587;&#x672C;&#x8F6C;&#x6362;&#x4E3A;&#x5BF9;&#x5E94;&#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;</li></ul></li></ul><h3 id="articleHeader5">2. &#x652F;&#x6301;&#x8F6C;&#x6362;&#x7684;&#x547D;&#x540D;&#x98CE;&#x683C;</h3><ul><li>&#x6B64;&#x7C7B;&#x5E93;&#x652F;&#x6301; <strong>7</strong> &#x79CD;&#x547D;&#x540D;&#x98CE;&#x683C;&#x7684;&#x8F6C;&#x6362;&#xFF0C;&#x5206;&#x522B;&#x4E3A;&#xFF1A;<strong><code>camel</code></strong>, <strong><code>pascal</code></strong>, <strong><code>hyphen</code></strong>, <strong><code>constant</code></strong>, <strong><code>snake</code></strong>, <strong><code>sentence</code></strong> &#x548C; <code>underscore</code></li><li>&#x5176;&#x4E2D;&#xFF0C;&#x524D; <strong>6</strong> &#x79CD;&#x98CE;&#x683C;&#x4F5C;&#x4E3A; <strong>&#x57FA;&#x7840;&#x98CE;&#x683C;</strong>&#xFF0C;&#x4E0B;&#x5212;&#x7EBF;&#x98CE;&#x683C;&#xFF08;<code>underscore</code>&#xFF09;&#x7531;&#x57FA;&#x7840;&#x98CE;&#x683C;&#x6D3E;&#x751F;&#x800C;&#x6210;</li></ul><p><strong>&#x4E3E;&#x4F8B;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="camel       --&gt;  &apos;iAm24YearsOld&apos;
pascal      --&gt;  &apos;IAm24YearsOld&apos;
hyphen      --&gt;  &apos;i-am-24-years-old&apos;
constant    --&gt;  &apos;I_AM_24_YEARS_OLD&apos;
snake       --&gt;  &apos;i_am_24_years_old&apos;
sentence    --&gt;  &apos;I am 24 years old&apos;
underscore  --&gt;  &apos;i_am_24_years_old&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code><span class="hljs-function"><span class="hljs-title">camel</span>       --&gt;</span>  <span class="hljs-string">&apos;iAm24YearsOld&apos;</span>
<span class="hljs-function"><span class="hljs-title">pascal</span>      --&gt;</span>  <span class="hljs-string">&apos;IAm24YearsOld&apos;</span>
<span class="hljs-function"><span class="hljs-title">hyphen</span>      --&gt;</span>  <span class="hljs-string">&apos;i-am-24-years-old&apos;</span>
<span class="hljs-function"><span class="hljs-title">constant</span>    --&gt;</span>  <span class="hljs-string">&apos;I_AM_24_YEARS_OLD&apos;</span>
<span class="hljs-function"><span class="hljs-title">snake</span>       --&gt;</span>  <span class="hljs-string">&apos;i_am_24_years_old&apos;</span>
<span class="hljs-function"><span class="hljs-title">sentence</span>    --&gt;</span>  <span class="hljs-string">&apos;I am 24 years old&apos;</span>
<span class="hljs-function"><span class="hljs-title">underscore</span>  --&gt;</span>  <span class="hljs-string">&apos;i_am_24_years_old&apos;</span></code></pre><h3 id="articleHeader6">3. &#x57FA;&#x7840;&#x98CE;&#x683C;&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x76F8;&#x4E92;&#x53EF;&#x9006;&#x7684;</h3><ul><li>&#x5982;&#x679C;&#x8981;&#x8F6C;&#x6362;&#x7684;&#x6587;&#x672C;&#x5C5E;&#x4E8E;&#x524D;&#x9762;&#x8BF4;&#x7684; 6 &#x79CD; <strong>&#x57FA;&#x7840;&#x98CE;&#x683C;</strong> &#x4E4B;&#x4E00;&#xFF0C;&#x5219;&#x4F7F;&#x7528;&#x5176;&#x5BF9;&#x5E94;&#x7684;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x4E92;&#x9006;&#x7684;&#x8F6C;&#x6362;</li></ul><p><strong>&#x4E3E;&#x4F8B;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { style, camel, snake } from &apos;naming-style&apos;;

const origin = &apos;i_am_24_years_old&apos;;

const namingStyle = style(origin);
console.log(namingStyle);
// &apos;snake&apos;

const camelCase = camel(origin);
const snake_case = snake(camelCase);
const newCamelCase = camel(snake_case);

console.log(camelCase === newCamelCase);
// true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { style, camel, snake } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;naming-style&apos;</span>;

<span class="hljs-keyword">const</span> origin = <span class="hljs-string">&apos;i_am_24_years_old&apos;</span>;

<span class="hljs-keyword">const</span> namingStyle = style(origin);
<span class="hljs-built_in">console</span>.log(namingStyle);
<span class="hljs-comment">// &apos;snake&apos;</span>

<span class="hljs-keyword">const</span> camelCase = camel(origin);
<span class="hljs-keyword">const</span> snake_case = snake(camelCase);
<span class="hljs-keyword">const</span> newCamelCase = camel(snake_case);

<span class="hljs-built_in">console</span>.log(camelCase === newCamelCase);
<span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader7">4. &#x8F6C;&#x6362;&#x65E0;&#x5339;&#x914D;&#x98CE;&#x683C;&#x7684;&#x6587;&#x672C;</h3><ul><li>&#x5982;&#x679C;&#x8981;&#x8F6C;&#x6362;&#x7684;&#x6587;&#x672C;&#x4E0D;&#x5C5E;&#x4E8E;&#x7C7B;&#x5E93;&#x63D0;&#x4F9B;&#x7684; 7 &#x79CD;&#x98CE;&#x683C;&#xFF0C;&#x5219; <code>style</code> &#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x4E3A; <code>&apos;other&apos;</code></li></ul><p><strong>&#x4E3E;&#x4F8B;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { style } from &apos;naming-style&apos;;

style(&apos;--naming-style -loves you&apos;);
// Output: &apos;other&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { style } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;naming-style&apos;</span>;

style(<span class="hljs-string">&apos;--naming-style -loves you&apos;</span>);
<span class="hljs-comment">// Output: &apos;other&apos;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[npm资源] naming-style，快速转换各种命名风格

## 原文链接
[https://segmentfault.com/a/1190000015638398](https://segmentfault.com/a/1190000015638398)


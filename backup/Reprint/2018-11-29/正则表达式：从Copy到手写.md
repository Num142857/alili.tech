---
title: '正则表达式：从Copy到手写' 
date: 2018-11-29 9:33:05
hidden: true
slug: xy9aqmu7r8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1. RegExp&#x5BF9;&#x8C61;</h3>
<p>JavaScript&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x4F8B;&#x5316;RegExp&#x5BF9;&#x8C61;</p>
<ul>
<li>&#x5B57;&#x9762;&#x91CF;</li>
<li>&#x6784;&#x9020;&#x51FD;&#x6570;</li>
</ul>
<h5>&#x5B57;&#x9762;&#x91CF;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /all/;
console.log(reg);   // /all/
&apos;This is all I have.&apos;.replace(reg, &apos;ALL&apos;);    // This is ALL I have." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/all/</span>;
<span class="hljs-built_in">console</span>.log(reg);   <span class="hljs-comment">// /all/</span>
<span class="hljs-string">&apos;This is all I have.&apos;</span>.replace(reg, <span class="hljs-string">&apos;ALL&apos;</span>);    <span class="hljs-comment">// This is ALL I have.</span></code></pre>
<h5>&#x6784;&#x9020;&#x51FD;&#x6570;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = new RegExp(&apos;all&apos;);
console.log(reg);   // /all/
&apos;This is all I have.&apos;.replace(reg, &apos;ALL&apos;); // This is ALL I have." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">const</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;all&apos;</span>);
<span class="hljs-built_in">console</span>.log(reg);   <span class="hljs-comment">// /all/</span>
<span class="hljs-string">&apos;This is all I have.&apos;</span>.replace(reg, <span class="hljs-string">&apos;ALL&apos;</span>); <span class="hljs-comment">// This is ALL I have.</span></code></pre>
<h3 id="articleHeader1">2. &#x5143;&#x5B57;&#x7B26;</h3>
<ul>
<li>&#x539F;&#x4E49;&#x6587;&#x672C;&#x5B57;&#x7B26;</li>
<li>&#x5143;&#x5B57;&#x7B26;</li>
</ul>
<h5>&#x539F;&#x4E49;&#x6587;&#x672C;&#x5B57;&#x7B26;</h5>
<blockquote>&#x4EE3;&#x8868;&#x5B83;&#x672C;&#x6765;&#x542B;&#x4E49;&#x7684;&#x5B57;&#x7B26;&#x3002;&#x6BD4;&#x5982;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4E3A; <code>/abc/</code>&#x3001;<code>/123/</code>&#xFF1B;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x5339;&#x914D;&#x7684;&#x662F; <code>abc</code>&#x3001;<code>123</code> &#xFF0C;</blockquote>
<h5>&#x5143;&#x5B57;&#x7B26;</h5>
<blockquote>&#x5728;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#xFF0C;&#x6709;&#x7279;&#x6B8A;&#x542B;&#x4E49;&#x7684;&#x975E;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#x3002;&#x5982;&#xFF1A;<code>\b</code> <code>\d</code> <code>\w</code> <code>.</code> <code>+</code> <code>()</code> &#x7B49;&#x3002;&#x90E8;&#x5206;&#x5143;&#x5B57;&#x7B26;&#x7684;&#x542B;&#x4E49;&#x5E76;&#x4E0D;&#x552F;&#x4E00;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#xFF0C;&#x542B;&#x4E49;&#x53EF;&#x80FD;&#x4E0D;&#x540C;&#x3002;</blockquote>
<p>&#x5143;&#x5B57;&#x7B26;&#x8868;&#xFF1A;<a href="http://tool.oschina.net/uploads/apidocs/jquery/regexp.html" rel="nofollow noreferrer" target="_blank">http://tool.oschina.net/uploads/apidocs/jquery/regexp.html</a></p>
<h3 id="articleHeader2">3. &#x5DE5;&#x5177;&#x63A8;&#x8350;</h3>
<p>&#x4E0D;&#x662F;&#x6240;&#x6709;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x90FD;&#x50CF;&#x524D;&#x9762;&#x5199;&#x7684;&#x90A3;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x8BED;&#x6CD5;&#x6709;&#x4E9B;&#x590D;&#x6742;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5199;&#x7684;&#x65F6;&#x5019;&#x591A;&#x591A;&#x5C11;&#x5C11;&#x4E5F;&#x4F1A;&#x6709;&#x4E9B;&#x9519;&#x8BEF;&#xFF0C;&#x6216;&#x8005;&#x9605;&#x8BFB;&#x522B;&#x4EBA;&#x5199;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x96BE;&#x7406;&#x89E3;&#x3002;</p>
<p>&#x5982;&#x679C;&#x628A;&#x4E0B;&#x9762;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x8F6C;&#x6362;&#x6210;&#x4E0B;&#x56FE;&#xFF0C;&#x4F1A;&#x6709;&#x52A9;&#x4E8E;&#x6211;&#x4EEC;&#x7406;&#x89E3;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x542B;&#x4E49;&#x3002;</p>
<p><code>^http(|s):\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+\/$</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101346" src="https://static.alili.tech/img/remote/1460000015101346" alt="&#x56FE;&#x89E3;" title="&#x56FE;&#x89E3;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x7ED9;&#x5927;&#x5BB6;&#x63A8;&#x8350;&#x4E00;&#x4E2A;&#x5DE5;&#x5177; <a href="https://regexper.com/" rel="nofollow noreferrer" target="_blank">https://regexper.com</a></p>
<h3 id="articleHeader3">4. &#x91CF;&#x8BCD;</h3>
<table>
<thead><tr>
<th>&#x5B57;&#x7B26;</th>
<th>&#x542B;&#x4E49;</th>
</tr></thead>
<tbody>
<tr>
<td>+</td>
<td>&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x6216;&#x591A;&#x6B21;(&#x81F3;&#x5C11;&#x51FA;&#x73B0;&#x4E00;&#x6B21;)</td>
</tr>
<tr>
<td>?</td>
<td>&#x51FA;&#x73B0;&#x96F6;&#x6B21;&#x6216;&#x4E00;&#x6B21;(&#x6700;&#x591A;&#x51FA;&#x73B0;&#x4E00;&#x6B21;)</td>
</tr>
<tr>
<td>*</td>
<td>&#x51FA;&#x73B0;&#x96F6;&#x6B21;&#x6216;&#x591A;&#x6B21;(&#x4EFB;&#x610F;&#x6B21;)</td>
</tr>
<tr>
<td>{n}</td>
<td>&#x51FA;&#x73B0;n&#x6B21;</td>
</tr>
<tr>
<td>{n, m}</td>
<td>&#x51FA;&#x73B0;n&#x5230;m&#x6B21;</td>
</tr>
<tr>
<td>{n,}</td>
<td>&#x81F3;&#x5C11;&#x51FA;&#x73B0;n&#x6B21;</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// \d&#x8868;&#x793A;&#x5339;&#x914D;&#x6570;&#x5B57;
// &#x5339;&#x914D;&#x4E00;&#x4E2A;&#x6570;&#x5B57;
&apos;1234567890&apos;.replace(/\d/, &apos;a&apos;); // a234567890
// &#x5339;&#x914D;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6570;&#x5B57;(&#x81F3;&#x5C11;&#x5339;&#x914D;&#x4E00;&#x4E2A;)
&apos;1234567890&apos;.replace(/\d+/, &apos;a&apos;); // a
&apos;1234567890&apos;.replace(/\d?/, &apos;a&apos;); // a234567890
&apos;1234567890&apos;.replace(/\d*/, &apos;a&apos;); // a
&apos;1234567890&apos;.replace(/\d{3}/, &apos;a&apos;); // a4567890
&apos;1234567890&apos;.replace(/\d{2,4}/, &apos;a&apos;); // a567890
&apos;1234567890&apos;.replace(/\d{3,}/, &apos;a&apos;); // a
&apos;12&apos;.replace(/\d{3,}/, &apos;a&apos;); // 12" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// \d&#x8868;&#x793A;&#x5339;&#x914D;&#x6570;&#x5B57;</span>
<span class="hljs-comment">// &#x5339;&#x914D;&#x4E00;&#x4E2A;&#x6570;&#x5B57;</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a234567890</span>
<span class="hljs-comment">// &#x5339;&#x914D;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6570;&#x5B57;(&#x81F3;&#x5C11;&#x5339;&#x914D;&#x4E00;&#x4E2A;)</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d+/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d?/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a234567890</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d*/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d{3}/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a4567890</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d{2,4}/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a567890</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d{3,}/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a</span>
<span class="hljs-string">&apos;12&apos;</span>.replace(<span class="hljs-regexp">/\d{3,}/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// 12</span></code></pre>
<p>&#x4F7F;&#x7528;&#x5DE5;&#x5177; <a href="https://regexper.com/" rel="nofollow noreferrer" target="_blank">https://regexper.com/</a> &#x56FE;&#x89E3;</p>
<p><code>\d{2,6}</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101347" src="https://static.alili.tech/img/remote/1460000015101347" alt="d{2,6}" title="d{2,6}" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">5. &#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x548C;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;</h3>
<p>&#x4ECE;&#x4E0A;&#x9762; <code>4. &#x91CF;&#x8BCD;</code> &#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;<code>&apos;1234567890&apos;.replace(/\d+/, &apos;a&apos;);</code> &#x8F93;&#x51FA;&#x7684;&#x662F; <code>a</code> &#x800C;&#x4E0D;&#x662F; <code>a234567890</code>&#xFF1B;<code>&apos;1234567890&apos;.replace(/\d{2,4}/, &apos;a&apos;);</code> &#x8F93;&#x51FA;&#x7684;&#x662F; <code>a567890</code> &#x800C;&#x4E0D;&#x662F; <code>a34567890</code>&#x3002;</p>
<blockquote>&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF1A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5C3D;&#x53EF;&#x80FD;&#x591A;&#x7684;&#x5339;&#x914D;&#xFF0C;&#x4E00;&#x76F4;&#x5230;&#x5339;&#x914D;&#x5931;&#x8D25;<p>&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF1A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5C3D;&#x53EF;&#x80FD;&#x5C11;&#x7684;&#x5339;&#x914D;&#xFF0C;&#x4E00;&#x65E6;&#x5339;&#x914D;&#x6210;&#x529F;&#x5C31;&#x4E0D;&#x518D;&#x5339;&#x914D;</p>
</blockquote>
<p>&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x90FD;&#x662F;&#x4F7F;&#x7528;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x505A;&#x5339;&#x914D;&#x7684;&#x3002;&#x5982;&#x679C;&#x60F3;&#x8981;&#x8BA9;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4F7F;&#x7528;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x5339;&#x914D;&#xFF0C;&#x5728;&#x91CF;&#x8BCD;&#x540E;&#x9762;&#x52A0;&#x4E2A; <code>?</code> &#x5373;&#x53EF;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;1234567890&apos;.replace(/\d{2,4}/, &apos;a&apos;);  // a567890
&apos;1234567890&apos;.replace(/\d{2,4}?/, &apos;a&apos;); // a34567890

&apos;1234567890&apos;.replace(/\d+/, &apos;a&apos;);      // a
&apos;1234567890&apos;.replace(/\d+?/, &apos;a&apos;);     // a234567890" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d{2,4}/</span>, <span class="hljs-string">&apos;a&apos;</span>);  <span class="hljs-comment">// a567890</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d{2,4}?/</span>, <span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// a34567890</span>

<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d+/</span>, <span class="hljs-string">&apos;a&apos;</span>);      <span class="hljs-comment">// a</span>
<span class="hljs-string">&apos;1234567890&apos;</span>.replace(<span class="hljs-regexp">/\d+?/</span>, <span class="hljs-string">&apos;a&apos;</span>);     <span class="hljs-comment">// a234567890</span></code></pre>
<h3 id="articleHeader5">6. &#x7C7B;</h3>
<ul><li>&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>[]</code> &#x6765;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x7C7B;&#x662F;&#x6307;&#x7B26;&#x5408;&#x67D0;&#x4E9B;&#x7279;&#x6027;&#x7684;&#x5BF9;&#x8C61;</li></ul>
<h4>&#x5B57;&#x7B26;&#x7C7B;</h4>
<blockquote>&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F; <code>[abcd]</code> &#x662F;&#x628A; <code>a</code>&#x3001;<code>b</code>&#x3001;<code>c</code>&#x3001;<code>d</code> &#x5F52;&#x4E3A;&#x4E00;&#x7C7B;&#xFF0C;&#x8BE5;&#x8868;&#x8FBE;&#x5F0F;&#x53EF;&#x4EE5;&#x5339;&#x914D;&#x8FD9;&#x7C7B;&#x5B57;&#x7B26;</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;12345a6b7c8D9e&apos;.replace(/[abcd]/g, &apos;|&apos;);   // 12345|6|7|8D9e" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS" style="word-break: break-word; white-space: initial;"><span class="hljs-string">&apos;12345a6b7c8D9e&apos;</span>.replace(<span class="hljs-regexp">/[abcd]/g</span>, <span class="hljs-string">&apos;|&apos;</span>);   <span class="hljs-comment">// 12345|6|7|8D9e</span></code></pre>
<h4>&#x8303;&#x56F4;&#x7C7B;</h4>
<blockquote>&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x63D0;&#x4F9B;&#x4E86; <code>[a-z]</code> &#x6765;&#x8868;&#x793A;&#x4ECE; <code>a</code> &#x5230; <code>z</code> &#x7684;&#x4EFB;&#x610F;&#x5B57;&#x7B26;&#xFF08;&#x5305;&#x542B; <code>a</code> &#x548C; <code>z</code>&#xFF09;</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;1a2b3c4q5z&apos;.replace(/[a-z]/g, &apos;|&apos;);   // 1|2|3|4|5|
&apos;1a2b3c4T5Z&apos;.replace(/[a-z]/g, &apos;|&apos;);   // 1|2|3|4T5Z
&apos;1a2b3c4T5Z&apos;.replace(/[a-zA-Z]/g, &apos;|&apos;);   // 1|2|3|4|5|
&apos;1a2b3c4q5z&apos;.replace(/[0-9]/g, &apos;|&apos;);   // |a|b|c|q|z" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-string">&apos;1a2b3c4q5z&apos;</span>.replace(<span class="hljs-regexp">/[a-z]/g</span>, <span class="hljs-string">&apos;|&apos;</span>);   <span class="hljs-comment">// 1|2|3|4|5|</span>
<span class="hljs-string">&apos;1a2b3c4T5Z&apos;</span>.replace(<span class="hljs-regexp">/[a-z]/g</span>, <span class="hljs-string">&apos;|&apos;</span>);   <span class="hljs-comment">// 1|2|3|4T5Z</span>
<span class="hljs-string">&apos;1a2b3c4T5Z&apos;</span>.replace(<span class="hljs-regexp">/[a-zA-Z]/g</span>, <span class="hljs-string">&apos;|&apos;</span>);   <span class="hljs-comment">// 1|2|3|4|5|</span>
<span class="hljs-string">&apos;1a2b3c4q5z&apos;</span>.replace(<span class="hljs-regexp">/[0-9]/g</span>, <span class="hljs-string">&apos;|&apos;</span>);   <span class="hljs-comment">// |a|b|c|q|z</span></code></pre>
<p><code>[a-zA-Z0-9]</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101348" src="https://static.alili.tech/img/remote/1460000015101348" alt="[a-zA-Z0-9]" title="[a-zA-Z0-9]" style="cursor: pointer;"></span></p>
<h4>&#x9884;&#x5B9A;&#x4E49;&#x7C7B;</h4>
<table>
<thead><tr>
<th>&#x5B57;&#x7B26;</th>
<th>&#x7B49;&#x4EF7;&#x4E8E;</th>
<th>&#x542B;&#x4E49;</th>
</tr></thead>
<tbody>
<tr>
<td>\d</td>
<td>[0-9]</td>
<td>&#x6570;&#x5B57;&#x5B57;&#x7B26;</td>
</tr>
<tr>
<td>\D</td>
<td>[^0-9]</td>
<td>&#x975E;&#x6570;&#x5B57;&#x5B57;&#x7B26;</td>
</tr>
<tr>
<td>\w</td>
<td>[a-zA-Z0-9_]</td>
<td>&#x5B57;&#x6BCD;&#x3001;&#x6570;&#x5B57;&#x3001;&#x4E0B;&#x5212;&#x7EBF;&#xFF08;&#x5355;&#x8BCD;&#x5B57;&#x7B26;&#xFF09;</td>
</tr>
<tr>
<td>\W</td>
<td>[^a-zA-Z0-9_]</td>
<td>&#x975E;&#x5B57;&#x6BCD;&#x3001;&#x6570;&#x5B57;&#x3001;&#x4E0B;&#x5212;&#x7EBF;&#xFF08;&#x975E;&#x5355;&#x8BCD;&#x5B57;&#x7B26;&#xFF09;</td>
</tr>
<tr>
<td>\s</td>
<td>[\t\n\x0B\f\r]</td>
<td>&#x7A7A;&#x767D;&#x5B57;&#x7B26;</td>
</tr>
<tr>
<td>\S</td>
<td>[^\t\n\x0B\f\r]</td>
<td>&#x975E;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</td>
</tr>
<tr>
<td>.</td>
<td>[^\n\r]</td>
<td>&#x9664;&#x4E86;&#x6362;&#x884C;&#x3001;&#x56DE;&#x8F66;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x610F;&#x5B57;&#x7B26;</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader6">7. &#x8FB9;&#x754C;</h3>
<table>
<thead><tr>
<th>&#x5B57;&#x7B26;</th>
<th>&#x542B;&#x4E49;</th>
</tr></thead>
<tbody>
<tr>
<td>^</td>
<td>&#x4EE5;xxx&#x5F00;&#x5934;</td>
</tr>
<tr>
<td>$</td>
<td>&#x4EE5;xxx&#x7ED3;&#x5C3E;</td>
</tr>
<tr>
<td>\b</td>
<td>&#x5355;&#x8BCD;&#x8FB9;&#x754C;</td>
</tr>
<tr>
<td>\B</td>
<td>&#x975E;&#x5355;&#x8BCD;&#x8FB9;&#x754C;</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;img/png/img-1.png&apos;.replace(/img/g, &apos;image&apos;); // image/png/image-1.png
&apos;img/png/img-1.png&apos;.replace(/^img/g, &apos;image&apos;); // image/png/img-1.png

&apos;img/png/img-1.png&apos;.replace(/png/g, &apos;jpg&apos;); // img/jpg/img-1.jpg
&apos;img/png/img-1.png&apos;.replace(/png$/g, &apos;jpg&apos;); // img/png/img-1.jpg

&apos;This is all I have.&apos;.replace(/is/g, &apos;IS&apos;); // ThIS IS all I have.
&apos;This is all I have.&apos;.replace(/\bis\b/g, &apos;IS&apos;); // This IS all I have.
&apos;This is all I have.&apos;.replace(/\Bis\b/g, &apos;IS&apos;); // ThIS is all I have.

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-string">&apos;img/png/img-1.png&apos;</span>.replace(<span class="hljs-regexp">/img/g</span>, <span class="hljs-string">&apos;image&apos;</span>); <span class="hljs-comment">// image/png/image-1.png</span>
<span class="hljs-string">&apos;img/png/img-1.png&apos;</span>.replace(<span class="hljs-regexp">/^img/g</span>, <span class="hljs-string">&apos;image&apos;</span>); <span class="hljs-comment">// image/png/img-1.png</span>

<span class="hljs-string">&apos;img/png/img-1.png&apos;</span>.replace(<span class="hljs-regexp">/png/g</span>, <span class="hljs-string">&apos;jpg&apos;</span>); <span class="hljs-comment">// img/jpg/img-1.jpg</span>
<span class="hljs-string">&apos;img/png/img-1.png&apos;</span>.replace(<span class="hljs-regexp">/png$/g</span>, <span class="hljs-string">&apos;jpg&apos;</span>); <span class="hljs-comment">// img/png/img-1.jpg</span>

<span class="hljs-string">&apos;This is all I have.&apos;</span>.replace(<span class="hljs-regexp">/is/g</span>, <span class="hljs-string">&apos;IS&apos;</span>); <span class="hljs-comment">// ThIS IS all I have.</span>
<span class="hljs-string">&apos;This is all I have.&apos;</span>.replace(<span class="hljs-regexp">/\bis\b/g</span>, <span class="hljs-string">&apos;IS&apos;</span>); <span class="hljs-comment">// This IS all I have.</span>
<span class="hljs-string">&apos;This is all I have.&apos;</span>.replace(<span class="hljs-regexp">/\Bis\b/g</span>, <span class="hljs-string">&apos;IS&apos;</span>); <span class="hljs-comment">// ThIS is all I have.</span>

</code></pre>
<h3 id="articleHeader7">9. &#x5206;&#x7EC4;</h3>
<h4>&#x4F5C;&#x7528;</h4>
<ul>
<li>&#x4E0E; | &#x4F7F;&#x7528;</li>
<li>&#x4E0E;&#x91CF;&#x8BCD;&#x4F7F;&#x7528;</li>
<li>&#x53CD;&#x5411;&#x5F15;&#x7528;</li>
</ul>
<h4>&#x4E0E; | &#x4F7F;&#x7528;</h4>
<p><code>/http(|s):\/\//</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101349" src="https://static.alili.tech/img/remote/1460000015101349" alt="/http(|s):///" title="/http(|s):///" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/http(|s):\/\//.test(&apos;https://&apos;);   // true
/http(|s):\/\//.test(&apos;http://&apos;);    // true
/a(b|c)d/.test(&apos;ad&apos;);               // false
/a(b|c)d/.test(&apos;abd&apos;);              // true
/a(b|c)d/.test(&apos;acd&apos;);              // true" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS">/http(|s):\/\<span class="hljs-comment">//.test(&apos;https://&apos;);   // true</span>
/http(|s):\/\<span class="hljs-comment">//.test(&apos;http://&apos;);    // true</span>
/a(b|c)d/.test(<span class="hljs-string">&apos;ad&apos;</span>);               <span class="hljs-comment">// false</span>
/a(b|c)d/.test(<span class="hljs-string">&apos;abd&apos;</span>);              <span class="hljs-comment">// true</span>
/a(b|c)d/.test(<span class="hljs-string">&apos;acd&apos;</span>);              <span class="hljs-comment">// true</span></code></pre>
<h4>&#x4E0E;&#x91CF;&#x8BCD;&#x4F7F;&#x7528;</h4>
<p>&#x5982;&#x4F55;&#x5339;&#x914D; <code>javascript</code> &#x51FA;&#x73B0;&#x4E24;&#x6B21; <code>javascriptjavascript</code> &#xFF1F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/javascript{2}/.test(&apos;javascriptjavascript&apos;);    // false
/javascript{2}/.test(&apos;javascript&apos;);          // true
/(javascript){2}/.test(&apos;javascriptjavascript&apos;);  // true" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS">/javascript{<span class="hljs-number">2</span>}/.test(<span class="hljs-string">&apos;javascriptjavascript&apos;</span>);    <span class="hljs-comment">// false</span>
/javascript{<span class="hljs-number">2</span>}/.test(<span class="hljs-string">&apos;javascript&apos;</span>);          <span class="hljs-comment">// true</span>
/(javascript){<span class="hljs-number">2</span>}/.test(<span class="hljs-string">&apos;javascriptjavascript&apos;</span>);  <span class="hljs-comment">// true</span></code></pre>
<h4>&#x53CD;&#x5411;&#x5F15;&#x7528;</h4>
<p>&#x542B;&#x6709;&#x5206;&#x7EC4;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5339;&#x914D;&#x6210;&#x529F;&#x65F6;&#xFF0C;&#x5C06;&#x5B50;&#x8868;&#x8FBE;&#x5F0F;&#x5339;&#x914D;&#x5230;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4FDD;&#x5B58;&#x5230;&#x5185;&#x5B58;&#x4E2D;&#x4E00;&#x4E2A;&#x4EE5;&#x6570;&#x5B57;&#x7F16;&#x53F7;&#x7684;&#x7EC4;&#x91CC;&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x8BA4;&#x4E3A;&#x662F;&#x5BF9;&#x4E00;&#x4E2A;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x8FDB;&#x884C;&#x4E86;&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x53CD;&#x5411;&#x5F15;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x5F15;&#x7528;&#x8FD9;&#x4E2A;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x3002;</p>
<p>&#x5F88;&#x591A;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x5C06;&#x67D0;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x6210;&#x53E6;&#x4E00;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x4F8B;&#x5982;&#xFF1A;&#x5C06; <code>05/28/2018</code> &#x8F6C;&#x6362;&#x6210; <code>2018-05-28</code>&#xFF1B;&#x5C06;Markdown&#x8BED;&#x6CD5;&#x7684;&#x8D85;&#x94FE;&#x63A5; <code>[Test](https://www.test.com/)</code> &#x8F6C;&#x6362;&#x6210;HTML&#x7684;&#x8D85;&#x94FE;&#x63A5; <code>&lt;a href=&quot;https://www.test.com/&quot;&gt;Test&lt;/a&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;05/28/2018&apos;.replace(/(\d{2})\/(\d{2})\/(\d{4})/, &apos;$3-$1-$2&apos;);
// =&gt; 2018-05-28
&apos;[Test](https://www.test.com/)&apos;.replace(/\[(.+)\]\((http(|s):\/\/.+)\)/, &apos;&lt;a href=&quot;$2&quot;&gt;$1&lt;/a&gt;&apos;);
// =&gt; &lt;a href=&quot;https://www.test.com/&quot;&gt;Test&lt;/a&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-string">&apos;05/28/2018&apos;</span>.replace(<span class="hljs-regexp">/(\d{2})\/(\d{2})\/(\d{4})/</span>, <span class="hljs-string">&apos;$3-$1-$2&apos;</span>);
<span class="hljs-comment">// =&gt; 2018-05-28</span>
<span class="hljs-string">&apos;[Test](https://www.test.com/)&apos;</span>.replace(<span class="hljs-regexp">/\[(.+)\]\((http(|s):\/\/.+)\)/</span>, <span class="hljs-string">&apos;&lt;a href=&quot;$2&quot;&gt;$1&lt;/a&gt;&apos;</span>);
<span class="hljs-comment">// =&gt; &lt;a href=&quot;https://www.test.com/&quot;&gt;Test&lt;/a&gt;</span></code></pre>
<h4>&#x5FFD;&#x7565;&#x5206;&#x7EC4;</h4>
<p>&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5728;&#x5199;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x591A;&#x6B21;&#x4F7F;&#x7528;&#x5206;&#x7EC4;&#xFF0C;&#x4F46;&#x6709;&#x4E00;&#x4E9B;&#x5206;&#x7EC4;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x53CD;&#x5411;&#x5F15;&#x7528;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F; <code>/http(|s):\/\//</code> &#x4E2D;&#x7684;&#x5206;&#x7EC4;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x53CD;&#x5411;&#x5F15;&#x7528;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x4F7F;&#x7528; <code>(?:)</code> &#x6765;&#x5FFD;&#x7565;&#x5206;&#x7EC4;</p>
<p><strong>&#x4E0D;&#x5FFD;&#x7565;&#x5206;&#x7EC4;&#xFF1A;</strong></p>
<p><code>/http(|s):\/\//</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101350" src="https://static.alili.tech/img/remote/1460000015101350" alt="/http(|s):///" title="/http(|s):///" style="cursor: pointer;"></span></p>
<p><strong>&#x5FFD;&#x7565;&#x5206;&#x7EC4;&#xFF1A;</strong></p>
<p><code>/http(?:|s):\/\//</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101351" src="https://static.alili.tech/img/remote/1460000015101351" alt="/http(|s):///" title="/http(|s):///" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">10. &#x524D;&#x77BB;&#x540E;&#x987E;</h3>
<ul>
<li>&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x662F;&#x4ECE;&#x5934;&#x90E8;(&#x5DE6;)&#x5411;&#x5C3E;&#x90E8;(&#x53F3;)&#x5F00;&#x59CB;&#x5339;&#x914D;&#x7684;&#xFF0C;&#x6587;&#x672C;&#x7684;&#x5C3E;&#x90E8;&#x65B9;&#x5411;&#x79F0;&#x4E3A;&#x201C;&#x524D;&#x201D;&#xFF0C;&#x6587;&#x672C;&#x7684;&#x5934;&#x90E8;&#x65B9;&#x5411;&#x79F0;&#x4E3A;&#x201C;&#x540E;&#x201D;</li>
<li>&#x524D;&#x77BB;&#xFF1A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5728;&#x5339;&#x914D;&#x5230;&#x89C4;&#x5219;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5411;&#x524D;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x7B26;&#x5408;&#x65AD;&#x8A00;</li>
<li>&#x540E;&#x987E;&#xFF1A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5728;&#x5339;&#x914D;&#x5230;&#x89C4;&#x5219;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5411;&#x540E;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x7B26;&#x5408;&#x65AD;&#x8A00;</li>
</ul>
<table>
<thead><tr>
<th>&#x540D;&#x79F0;</th>
<th>&#x6B63;&#x5219;</th>
<th>&#x542B;&#x4E49;</th>
</tr></thead>
<tbody>
<tr>
<td>&#x6B63;&#x5411;&#x524D;&#x77BB;</td>
<td>exp(?=assert)</td>
<td>&#x5411;&#x524D;&#x68C0;&#x67E5;&#x7B26;&#x5408;&#x65AD;&#x8A00;&#x7684;</td>
</tr>
<tr>
<td>&#x8D1F;&#x5411;&#x524D;&#x77BB;</td>
<td>exp(?!assert)</td>
<td>&#x5411;&#x524D;&#x68C0;&#x67E5;&#x4E0D;&#x7B26;&#x5408;&#x65AD;&#x8A00;&#x7684;</td>
</tr>
<tr>
<td>&#x6B63;&#x5411;&#x540E;&#x77BB;</td>
<td>(?&lt;=assert)exp</td>
<td>&#x5411;&#x540E;&#x68C0;&#x67E5;&#x7B26;&#x5408;&#x65AD;&#x8A00;&#x7684;</td>
</tr>
<tr>
<td>&#x8D1F;&#x5411;&#x540E;&#x77BB;</td>
<td>(?&lt;!assert)exp</td>
<td>&#x5411;&#x540E;&#x68C0;&#x67E5;&#x4E0D;&#x7B26;&#x5408;&#x65AD;&#x8A00;&#x7684;</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;ab1cde2fg&apos;.replace(/[a-z](?=\d)/g, &apos;X&apos;); // aX1cdX2fg
&apos;ab1cde2fg&apos;.replace(/[a-z](?!\d)/g, &apos;X&apos;); // Xb1XXe2XX

&apos;ab1cde2fg&apos;.replace(/(?&lt;=\d)[a-z]/g, &apos;X&apos;); // ab1Xde2Xg
&apos;ab1cde2fg&apos;.replace(/(?&lt;!\d)[a-z]/g, &apos;X&apos;); // XX1cXX2fX" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-string">&apos;ab1cde2fg&apos;</span>.replace(<span class="hljs-regexp">/[a-z](?=\d)/g</span>, <span class="hljs-string">&apos;X&apos;</span>); <span class="hljs-comment">// aX1cdX2fg</span>
<span class="hljs-string">&apos;ab1cde2fg&apos;</span>.replace(<span class="hljs-regexp">/[a-z](?!\d)/g</span>, <span class="hljs-string">&apos;X&apos;</span>); <span class="hljs-comment">// Xb1XXe2XX</span>

<span class="hljs-string">&apos;ab1cde2fg&apos;</span>.replace(<span class="hljs-regexp">/(?&lt;=\d)[a-z]/g</span>, <span class="hljs-string">&apos;X&apos;</span>); <span class="hljs-comment">// ab1Xde2Xg</span>
<span class="hljs-string">&apos;ab1cde2fg&apos;</span>.replace(<span class="hljs-regexp">/(?&lt;!\d)[a-z]/g</span>, <span class="hljs-string">&apos;X&apos;</span>); <span class="hljs-comment">// XX1cXX2fX</span></code></pre>
<h3 id="articleHeader9">11. &#x4FEE;&#x9970;&#x7B26;</h3>
<ul>
<li>global: &#x662F;&#x5426;&#x5168;&#x6587;&#x641C;&#x7D22;&#xFF0C;&#x9ED8;&#x8BA4; false</li>
<li>ignoreCase: &#x662F;&#x5426;&#x5927;&#x5C0F;&#x5199;&#x654F;&#x611F;&#xFF0C;&#x9ED8;&#x8BA4; false</li>
<li>multiline: &#x662F;&#x5426;&#x591A;&#x884C;&#x641C;&#x7D22;&#xFF0C;&#x9ED8;&#x8BA4; false</li>
<li>lastIndex: &#x662F;&#x5F53;&#x524D;&#x8868;&#x8FBE;&#x5F0F;&#x5339;&#x914D;&#x5185;&#x5BB9;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;</li>
<li>source: &#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x6587;&#x672C;&#x5B57;&#x7B26;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;aaaaa&apos;.replace(/a/, &apos;A&apos;);      // Aaaaa
&apos;aaaaa&apos;.replace(/a/g, &apos;A&apos;);     // AAAAA

&apos;aAQq&apos;.replace(/[a-z]/g, &apos;X&apos;); // XAQX
&apos;aAQq&apos;.replace(/[a-z]/gi, &apos;X&apos;); // XXXX

/[a-z]/.test(&apos;AA&apos;);    // false
/[a-z]/i.test(&apos;AA&apos;);    // true

`img/png/img-1.png
img/png/img-1.png
img/png/img-1.png`.replace(/^img/g, &apos;image&apos;);
// =&gt; image/png/img-1.png
//    img/png/img-1.png
//    img/png/img-1.png
`img/png/img-1.png
img/png/img-1.png
img/png/img-1.png`.replace(/^img/gm, &apos;image&apos;);
// =&gt; image/png/img-1.png
//    image/png/img-1.png
//    image/png/img-1.png
const reg = /\d/gim;
console.log(reg.source);    // \d
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-string">&apos;aaaaa&apos;</span>.replace(<span class="hljs-regexp">/a/</span>, <span class="hljs-string">&apos;A&apos;</span>);      <span class="hljs-comment">// Aaaaa</span>
<span class="hljs-string">&apos;aaaaa&apos;</span>.replace(<span class="hljs-regexp">/a/g</span>, <span class="hljs-string">&apos;A&apos;</span>);     <span class="hljs-comment">// AAAAA</span>

<span class="hljs-string">&apos;aAQq&apos;</span>.replace(<span class="hljs-regexp">/[a-z]/g</span>, <span class="hljs-string">&apos;X&apos;</span>); <span class="hljs-comment">// XAQX</span>
<span class="hljs-string">&apos;aAQq&apos;</span>.replace(<span class="hljs-regexp">/[a-z]/gi</span>, <span class="hljs-string">&apos;X&apos;</span>); <span class="hljs-comment">// XXXX</span>

/[a-z]/.test(<span class="hljs-string">&apos;AA&apos;</span>);    <span class="hljs-comment">// false</span>
/[a-z]/i.test(<span class="hljs-string">&apos;AA&apos;</span>);    <span class="hljs-comment">// true</span>

<span class="hljs-string">`img/png/img-1.png
img/png/img-1.png
img/png/img-1.png`</span>.replace(<span class="hljs-regexp">/^img/g</span>, <span class="hljs-string">&apos;image&apos;</span>);
<span class="hljs-comment">// =&gt; image/png/img-1.png</span>
<span class="hljs-comment">//    img/png/img-1.png</span>
<span class="hljs-comment">//    img/png/img-1.png</span>
<span class="hljs-string">`img/png/img-1.png
img/png/img-1.png
img/png/img-1.png`</span>.replace(<span class="hljs-regexp">/^img/gm</span>, <span class="hljs-string">&apos;image&apos;</span>);
<span class="hljs-comment">// =&gt; image/png/img-1.png</span>
<span class="hljs-comment">//    image/png/img-1.png</span>
<span class="hljs-comment">//    image/png/img-1.png</span>
<span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\d/gim</span>;
<span class="hljs-built_in">console</span>.log(reg.source);    <span class="hljs-comment">// \d</span>
</code></pre>
<h3 id="articleHeader10">12. RegExp&#x5BF9;&#x8C61;&#x4E2D; test() &#x548C; exec()</h3>
<h4>test()</h4>
<blockquote>&#x7528;&#x4E8E;&#x6D4B;&#x8BD5;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x662F;&#x5426;&#x5B58;&#x5728;&#x5339;&#x914D;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x6A21;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF1B;&#x5982;&#x679C;&#x5B58;&#x5728;&#x5219;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /\w/;
reg.test(&apos;|&apos;); // false
reg.test(&apos;a&apos;); // true
reg.test(&apos;a&apos;); // true" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\w/</span>;
reg.test(<span class="hljs-string">&apos;|&apos;</span>); <span class="hljs-comment">// false</span>
reg.test(<span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// true</span>
reg.test(<span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// true</span></code></pre>
<p>&#x5F53;&#x4F7F;&#x7528; <code>g</code> &#x5168;&#x6587;&#x641C;&#x7D22;&#x65F6;&#xFF0C;<code>test</code> &#x51FD;&#x6570;&#x4F1A;&#x51FA;&#x73B0;&#x5982;&#x4E0B;&#x95EE;&#x9898;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101352" src="https://static.alili.tech/img/remote/1460000015101352" alt="test" title="test" style="cursor: pointer; display: inline;"></span></p>
<p>&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#x5176;&#x5B9E;&#x662F;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#x7684; <code>lastIndex</code> &#x5C5E;&#x6027;&#x5728;&#x4F5C;&#x602A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101353" src="https://static.alili.tech/img/remote/1460000015101353" alt="test" title="test" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5982;&#x679C;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4F7F;&#x7528;&#x4E86;&#x5168;&#x6587;&#x641C;&#x7D22; <code>g</code> &#xFF0C;&#x53C8;&#x60F3;&#x907F;&#x514D;&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#xFF0C;&#x5E94;&#x5728;&#x6267;&#x884C; <code>test</code> &#x51FD;&#x6570;&#x524D;&#x5148;&#x5C06; <code>lastIndex</code> &#x7F6E; <code>0</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /\w/g;
reg.test(&apos;ab&apos;); // true
reg.lastIndex = 0;
reg.test(&apos;ab&apos;); // true
reg.lastIndex = 0;
reg.test(&apos;ab&apos;); // true" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\w/g</span>;
reg.test(<span class="hljs-string">&apos;ab&apos;</span>); <span class="hljs-comment">// true</span>
reg.lastIndex = <span class="hljs-number">0</span>;
reg.test(<span class="hljs-string">&apos;ab&apos;</span>); <span class="hljs-comment">// true</span>
reg.lastIndex = <span class="hljs-number">0</span>;
reg.test(<span class="hljs-string">&apos;ab&apos;</span>); <span class="hljs-comment">// true</span></code></pre>
<h4>exec()</h4>
<blockquote>&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x6A21;&#x5F0F;&#x5BF9;&#x5B57;&#x7B26;&#x4E32;&#x6267;&#x884C;&#x641C;&#x7D22;&#xFF0C;&#x5E76;&#x5C06;&#x5339;&#x914D;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x4EE5;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x8FD4;&#x56DE;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5339;&#x914D;&#xFF0C;&#x8FD4;&#x56DE;null</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101354" src="https://static.alili.tech/img/remote/1460000015101354" alt="exec" title="exec" style="cursor: pointer;"></span></p>
<p><strong>&#x7ED3;&#x679C;&#x6570;&#x7EC4;&#x5C5E;&#x6027;</strong></p>
<ul>
<li>index&#xFF1A;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x4F4D;&#x7F6E;</li>
<li>input&#xFF1A;&#x88AB;&#x5339;&#x914D;&#x7684;&#x5B57;&#x7B26;&#x4E32;</li>
</ul>
<p><strong>&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;</strong></p>
<ul>
<li>&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4E0E;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5339;&#x914D;&#x7684;&#x5185;&#x5BB9;</li>
<li>&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4E0E;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x8868;&#x8FBE;&#x5F0F;&#x76F8;&#x5339;&#x914D;&#x7684;&#x5185;&#x5BB9;</li>
<li>&#x7B2C;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4E0E;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B50;&#x8868;&#x8FBE;&#x5F0F;&#x76F8;&#x5339;&#x914D;&#x7684;&#x5185;&#x5BB9;&#xFF08;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#xFF09;</li>
</ul>
<p>&#x73B0;&#x6709;&#x5982;&#x4E0B;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>exec</code> &#x4ECE;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x4E2D;&#x63D0;&#x53D6;&#x56FE;&#x7247;&#x7684;&#x8DEF;&#x5F84;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [
    &apos;[&#x6D4B;&#x8BD5;1](https://www.test1.com/img/img-1.png)&apos;,
    &apos;[&#x6D4B;&#x8BD5;1](http://www.test1.com/img/img-1.jpg)&apos;,
    &apos;[&#x6D4B;&#x8BD5;2](https://static.test2.com/image/haha/img-1.png)&apos;
]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">const</span> arr = [
    <span class="hljs-string">&apos;[&#x6D4B;&#x8BD5;1](https://www.test1.com/img/img-1.png)&apos;</span>,
    <span class="hljs-string">&apos;[&#x6D4B;&#x8BD5;1](http://www.test1.com/img/img-1.jpg)&apos;</span>,
    <span class="hljs-string">&apos;[&#x6D4B;&#x8BD5;2](https://static.test2.com/image/haha/img-1.png)&apos;</span>
]</code></pre>
<p>&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /\[.+\]\(http(|s):\/\/[a-zA-Z0-g_-]+(\.[a-zA-Z0-9_-]+)+\/((.+\/)+.+\.(png|jpg))\)/;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\[.+\]\(http(|s):\/\/[a-zA-Z0-g_-]+(\.[a-zA-Z0-9_-]+)+\/((.+\/)+.+\.(png|jpg))\)/</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101355" src="https://static.alili.tech/img/remote/1460000015101355" alt="exec" title="exec" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const res = reg.exec(arr[2]);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> res = reg.exec(arr[<span class="hljs-number">2</span>]);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101356" src="https://static.alili.tech/img/remote/1460000015101356" alt="exec" title="exec" style="cursor: pointer; display: inline;"></span></p>
<p>&#x4E0A;&#x8FF0;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4F7F;&#x7528;&#x4E86;&#x8F83;&#x591A;&#x7684;&#x5206;&#x7EC4;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x9605;&#x8BFB;&#x56FE;&#x5F62;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x80FD;&#x9020;&#x6210;&#x5E72;&#x6270;&#xFF0C;&#x5FFD;&#x7565;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5206;&#x7EC4;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg2 = /\[.+\]\(http(?:|s):\/\/[a-zA-Z0-g_-]+(?:\.[a-zA-Z0-9_-]+)+\/((?:.+\/)+.+\.(?:png|jpg))\)/;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> reg2 = <span class="hljs-regexp">/\[.+\]\(http(?:|s):\/\/[a-zA-Z0-g_-]+(?:\.[a-zA-Z0-9_-]+)+\/((?:.+\/)+.+\.(?:png|jpg))\)/</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101357" src="https://static.alili.tech/img/remote/1460000015101357" alt="exec" title="exec" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reg2.exec(arr[2]);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS" style="word-break: break-word; white-space: initial;">reg2.exec(arr[<span class="hljs-number">2</span>]);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015101358" src="https://static.alili.tech/img/remote/1460000015101358" alt="exec" title="exec" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
正则表达式：从Copy到手写

## 原文链接
[https://segmentfault.com/a/1190000015101341](https://segmentfault.com/a/1190000015101341)


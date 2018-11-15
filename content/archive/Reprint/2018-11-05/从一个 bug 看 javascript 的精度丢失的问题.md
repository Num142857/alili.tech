---
title: 从一个 bug 看 javascript 的精度丢失的问题
hidden: true
categories: reprint
slug: d629aa72
date: 2018-11-05 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x95EE;&#x9898;&#x63CF;&#x8FF0;</h2><ol><li>&#x540E;&#x7AEF;&#x8FD4;&#x56DE; <code>{ spaceObject: { objectId: &apos;1049564069045993472&apos; } }</code></li><li><p>&#x524D;&#x7AEF;&#x6A21;&#x7248;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x662F; atpl &#x6A21;&#x7248;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span id=&quot;test&quot; data-id=&quot;&lt;%= spaceObject.objectId %&gt;&quot;&gt;&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs erb"><code style="word-break:break-word;white-space:initial"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test&quot;</span> <span class="hljs-attr">data-id</span>=<span class="hljs-string">&quot;&lt;%=</span></span></span><span class="ruby"> spaceObject.objectId </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre></li><li>&#x524D;&#x7AEF;&#x83B7;&#x53D6; <code>objectId</code> &#x7684;&#x65B9;&#x5F0F;&#xFF0C;<code>const objectId = $(&apos;#test&apos;).data(&apos;id&apos;)</code></li><li>&#x6B63;&#x5E38;&#x7406;&#x89E3;&#xFF0C;&#x6211;&#x4EEC;&#x83B7;&#x53D6;&#x5230;&#x7684; <code>objectId</code> &#x5C31;&#x662F;&#x8FD4;&#x56DE;&#x7684; <code>1049564069045993472</code>&#xFF0C;&#x53EF;&#x662F;&#x73B0;&#x5B9E;&#x60C5;&#x51B5;&#x662F;&#x8FD9;&#x4E2A; <code>objectId</code> &#x662F; <code>1049564069045993500</code></li></ol><h2 id="articleHeader1">&#x95EE;&#x9898;&#x62C6;&#x5206;</h2><h3 id="articleHeader2">&#x4E00;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4ECE; dom &#x4E2D;&#x83B7;&#x53D6;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x4F1A;&#x53D8;&#x6210;&#x6570;&#x5B57;</h3><p>&#x67E5;&#x770B; <code>zepto</code> &#x4EE3;&#x7801;&#x53EF;&#x77E5;&#xFF0C;&#x7531;&#x4E8E;&#x901A;&#x8FC7; <code>$(&apos;#test&apos;).data(&apos;id&apos;)</code> &#x83B7;&#x53D6;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32; <code>&apos;1049564069045993472&apos;</code> &#x7ECF;&#x8FC7; <code>deserializeValue</code> &#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x5C31;&#x53D8;&#x6210;&#x6570;&#x5B57;&#x4E86;&#x3002;</p><p>&#x5173;&#x952E;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: function (name, value) {
      //[Opt:C]&#x5C06;&#x539F;&#x672C;&#x5728;&#x7236;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x53D8;&#x91CF;&#x8F6C;&#x79FB;&#x81F3;&#x5C40;&#x90E8;&#x53D8;&#x91CF;
      var capitalRE = /([A-Z])/g,
        data = this.attr(&apos;data-&apos; + name.replace(capitalRE, &apos;-$1&apos;).toLowerCase(), value)
      return data !== null ? deserializeValue(data) : undefined
    },

// &quot;true&quot;  =&gt; true
  // &quot;false&quot; =&gt; false
  // &quot;null&quot;  =&gt; null
  // &quot;42&quot;    =&gt; 42
  // &quot;42.5&quot;  =&gt; 42.5
  // &quot;08&quot;    =&gt; &quot;08&quot;
  // JSON    =&gt; parse if valid
  // String  =&gt; self
function deserializeValue(value) {
    var num
    try {
      return value ?
        value == &quot;true&quot; ||
        ( value == &quot;false&quot; ? false :
          value == &quot;null&quot; ? null :
            !/^0/.test(value) &amp;&amp; !isNaN(num = Number(value)) ? num :
              /^[\[\{]/.test(value) ? $.parseJSON(value) :
                value )
        : value
    } catch (e) {
      return value
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>data: function (name, <span class="hljs-keyword">value</span>) {
      <span class="hljs-comment">//[Opt:C]&#x5C06;&#x539F;&#x672C;&#x5728;&#x7236;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x53D8;&#x91CF;&#x8F6C;&#x79FB;&#x81F3;&#x5C40;&#x90E8;&#x53D8;&#x91CF;</span>
      <span class="hljs-keyword">var</span> capitalRE = /([A-Z])/g,
        data = <span class="hljs-keyword">this</span>.attr(<span class="hljs-string">&apos;data-&apos;</span> + name.replace(capitalRE, <span class="hljs-string">&apos;-$1&apos;</span>).toLowerCase(), <span class="hljs-keyword">value</span>)
      <span class="hljs-keyword">return</span> data !== <span class="hljs-literal">null</span> ? deserializeValue(data) : undefined
    },

<span class="hljs-comment">// &quot;true&quot;  =&gt; true</span>
  <span class="hljs-comment">// &quot;false&quot; =&gt; false</span>
  <span class="hljs-comment">// &quot;null&quot;  =&gt; null</span>
  <span class="hljs-comment">// &quot;42&quot;    =&gt; 42</span>
  <span class="hljs-comment">// &quot;42.5&quot;  =&gt; 42.5</span>
  <span class="hljs-comment">// &quot;08&quot;    =&gt; &quot;08&quot;</span>
  <span class="hljs-comment">// JSON    =&gt; parse if valid</span>
  <span class="hljs-comment">// String  =&gt; self</span>
<span class="hljs-function">function <span class="hljs-title">deserializeValue</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
    <span class="hljs-keyword">var</span> num
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> ?
        <span class="hljs-keyword">value</span> == <span class="hljs-string">&quot;true&quot;</span> ||
        ( <span class="hljs-keyword">value</span> == <span class="hljs-string">&quot;false&quot;</span> ? <span class="hljs-literal">false</span> :
          <span class="hljs-keyword">value</span> == <span class="hljs-string">&quot;null&quot;</span> ? <span class="hljs-literal">null</span> :
            !/^<span class="hljs-number">0</span>/.test(<span class="hljs-keyword">value</span>) &amp;&amp; !isNaN(num = Number(<span class="hljs-keyword">value</span>)) ? num :
              /^[\[\{]/.test(<span class="hljs-keyword">value</span>) ? $.parseJSON(<span class="hljs-keyword">value</span>) :
                <span class="hljs-keyword">value</span> )
        : <span class="hljs-keyword">value</span>
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>
    }
  }</code></pre><h3 id="articleHeader3">&#x4E8C;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x6570;&#x5B57;&#x8DDF; dom &#x4E2D;&#x83B7;&#x53D6;&#x7684;&#x4E0D;&#x4E00;&#x81F4;</h3><p>&#x7531;&#x4E8E;javascript&#x7684;&#x80FD;&#x591F;&#x4FDD;&#x6301;&#x7CBE;&#x5EA6;&#x7684;&#x6700;&#x5927;&#x503C;&#x662F; <code>9007199254740991</code>&#xFF0C;&#x6240;&#x4EE5;&#x7531;&#x4E8E;&#x4E0A;&#x9762;&#x90A3;&#x4E2A;&#x6570;&#x5B57;&#x5927;&#x4E8E;&#x8FD9;&#x4E2A;&#x6700;&#x5927;&#x5B89;&#x5168;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x51FA;&#x73B0;&#x5931;&#x53BB;&#x7CBE;&#x5EA6;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader4">&#x5F15;&#x7533;</h2><h3 id="articleHeader5">javascript &#x4E2D;&#x7CBE;&#x5EA6;&#x4E22;&#x5931;&#x7684;&#x51E0;&#x79CD;&#x60C5;&#x51B5;</h3><h4>1. &#x7B80;&#x5355;&#x7684;&#x6D6E;&#x70B9;&#x6570;&#x76F8;&#x52A0;</h4><p><code>0.1 + 0.2 !== 0.3 // true</code><br><code>0.1 + 0.2 === 0.3 // false</code><br><span class="img-wrap"><img data-src="/img/remote/1460000016654840?w=882&amp;h=234" src="https://static.alili.tech/img/remote/1460000016654840?w=882&amp;h=234" alt="add-example.png" title="add-example.png" style="cursor:pointer;display:inline"></span>)</p><h4>2. &#x5927;&#x6574;&#x6570;&#x4E22;&#x5931;&#x7CBE;&#x5EA6;</h4><p><code>99999999999999999 === 100000000000000000</code><br><span class="img-wrap"><img data-src="/img/remote/1460000016654841" src="https://static.alili.tech/img/remote/1460000016654841" alt="big-example.png" title="big-example.png" style="cursor:pointer;display:inline"></span></p><h4>3. toFxied &#x6709;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x4E0D;&#x4F1A;&#x56DB;&#x820D;&#x4E94;&#x5165;</h4><p><code>(12.235).toFixed(2) // 12.23</code><br><span class="img-wrap"><img data-src="/img/remote/1460000016654842?w=672&amp;h=170" src="https://static.alili.tech/img/remote/1460000016654842?w=672&amp;h=170" alt="toFixed-example.png" title="toFixed-example.png" style="cursor:pointer"></span></p><h2 id="articleHeader6">&#x6570;&#x5B57;&#x7CBE;&#x5EA6;&#x4E22;&#x5931;&#x95EE;&#x9898;&#x539F;&#x56E0;&#x5206;&#x6790;</h2><ol><li>&#x9996;&#x5148;&#xFF0C;javascript &#x4E2D;&#x4FDD;&#x6301;&#x7CBE;&#x5EA6;&#x4E0D;&#x4E22;&#x5931;&#x7684;&#x6570;&#x503C;&#x662F;&#x6709;&#x4E2A;&#x8303;&#x56F4;&#x7684;&#xFF0C;&#x662F;&#x5728; <code>Number.MIN_SAFE_INTEGER</code> &#x548C; <code>Number.MAX_SAFE_INTEGER</code> &#x4E4B;&#x95F4;. <code>Number.MAX_SAFE_INTEGER</code> =&gt; <code>9007199254740991</code> =&gt; <code>2&#x7684;53&#x6B21;&#x65B9;-1</code></li><li><a href="http://ecma262-5.com/ELS5_HTML.htm#Section_8.5" rel="nofollow noreferrer" target="_blank">ECMA Section 8.5 - Numbers</a> <code>Note that all the positive and negative integers whose magnitude is no greater than 253 are representable in the Number type (indeed, the integer 0 has two representations, +0 and &#x2212;0).</code></li><li>&#x8BA1;&#x7B97;&#x673A;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x5B9E;&#x73B0;&#x548C;&#x4F4D;&#x6570;&#x9650;&#x5236;&#x6709;&#x4E9B;&#x6570;&#x65E0;&#x6CD5;&#x6709;&#x9650;&#x8868;&#x793A;&#x3002;&#x5C31;&#x50CF;&#x4E00;&#x4E9B;&#x65E0;&#x7406;&#x6570;&#x4E0D;&#x80FD;&#x6709;&#x9650;&#x8868;&#x793A;&#xFF0C;&#x5982; &#x5706;&#x5468;&#x7387; 3.1415926...&#xFF0C;1.3333... &#x7B49;&#x3002;JS &#x9075;&#x5FAA; IEEE 754 &#x89C4;&#x8303;&#xFF0C;&#x91C7;&#x7528;&#x53CC;&#x7CBE;&#x5EA6;&#x5B58;&#x50A8;&#xFF08;double precision&#xFF09;&#xFF0C;&#x5360;&#x7528; 64 bit&#x3002;&#x5982;&#x56FE;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000016654843?w=1950&amp;h=138" src="https://static.alili.tech/img/remote/1460000016654843?w=1950&amp;h=138" alt="precision-example.png" title="precision-example.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* 1&#x4F4D;&#x7528;&#x6765;&#x8868;&#x793A;&#x7B26;&#x53F7;&#x4F4D;
* 11&#x4F4D;&#x7528;&#x6765;&#x8868;&#x793A;&#x6307;&#x6570;
* 52&#x4F4D;&#x8868;&#x793A;&#x5C3E;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code><span class="hljs-bullet">* </span>1&#x4F4D;&#x7528;&#x6765;&#x8868;&#x793A;&#x7B26;&#x53F7;&#x4F4D;
<span class="hljs-bullet">* </span>11&#x4F4D;&#x7528;&#x6765;&#x8868;&#x793A;&#x6307;&#x6570;
<span class="hljs-bullet">* </span>52&#x4F4D;&#x8868;&#x793A;&#x5C3E;&#x6570;</code></pre><ol><li><a>&#x6DF1;&#x5165;&#x4E86;&#x89E3;</a></li></ol><h2 id="articleHeader7">&#x89E3;&#x51B3;&#x65B9;&#x6848;</h2><ol><li>&#x4F7F;&#x7528; <a href="https://github.com/MikeMcl/big.js" rel="nofollow noreferrer" target="_blank">big.js&#x5E93;</a></li><li><p>&#x5982;&#x679C;&#x662F;&#x5C0F;&#x6570;&#x52A0;&#x51CF;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5148;&#x5C06;&#x6240;&#x6709;&#x5C0F;&#x6570;&#x8F6C;&#x5316;&#x4E3A;&#x6574;&#x6570;&#xFF08;&#x4E58;&#x500D;&#x6570;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5B8C;&#x6210;&#x8FD0;&#x7B97;&#xFF0C;&#x6700;&#x540E;&#x7F29;&#x5C0F;&#x56DE;&#x53BB;&#xFF08;&#x9664;&#x500D;&#x6570;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.01 + 0.2 // 0.21000000000000002
(0.01 * 100 + 0.2 * 100) / 100 // 0.21" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">0.01</span> + <span class="hljs-number">0.2</span> <span class="hljs-comment">// 0.21000000000000002</span>
(<span class="hljs-number">0.01</span> * <span class="hljs-number">100</span> + <span class="hljs-number">0.2</span> * <span class="hljs-number">100</span>) / <span class="hljs-number">100</span> <span class="hljs-comment">// 0.21</span></code></pre></li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000016654844" src="https://static.alili.tech/img/remote/1460000016654844" alt="solution-example.png" title="solution-example.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader8">&#x53C2;&#x8003;</h2><ol><li><a href="https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin" rel="nofollow noreferrer" target="_blank">javascript &#x4E2D;&#x4E0D;&#x4F1A;&#x5931;&#x53BB;&#x7CBE;&#x5EA6;&#x7684;&#x6700;&#x5927;&#x503C;</a></li><li><a href="https://www.cnblogs.com/snandy/p/4943138.html" rel="nofollow noreferrer" target="_blank">JS&#x6570;&#x5B57;&#x7CBE;&#x5EA6;&#x4E22;&#x5931;&#x7684;&#x4E00;&#x4E9B;&#x5178;&#x578B;&#x95EE;&#x9898;</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从一个 bug 看 javascript 的精度丢失的问题

## 原文链接
[https://segmentfault.com/a/1190000016654837](https://segmentfault.com/a/1190000016654837)


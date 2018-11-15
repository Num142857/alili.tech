---
title: JavaScript循环遍历你会用哪些？
reprint: true
categories: reprint
abbrlink: 57db5607
date: 2018-11-06 15:28:31
---

{{% raw %}}
<blockquote>&#x603B;&#x7ED3;JavaScript&#x4E2D;&#x7684;&#x5FAA;&#x73AF;&#x904D;&#x5386;</blockquote><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;, &apos;e&apos;, &apos;f&apos;];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> arr = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>, <span class="hljs-string">&apos;e&apos;</span>, <span class="hljs-string">&apos;f&apos;</span>];</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">d</span>: <span class="hljs-number">4</span>
}</code></pre><h2 id="articleHeader0">for()</h2><blockquote>&#x7ECF;&#x5E38;&#x7528;&#x6765;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5143;&#x7D20;<br>&#x904D;&#x5386;&#x503C;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7D22;&#x5F15;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0, len = arr.length; i &lt; len; i++) {
    console.log(i);            // 0 1 2 3 4 5
    console.log(arr[i]);     // a b c d e f
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
    <span class="hljs-built_in">console</span>.log(i);            <span class="hljs-comment">// 0 1 2 3 4 5</span>
    <span class="hljs-built_in">console</span>.log(arr[i]);     <span class="hljs-comment">// a b c d e f</span>
}</code></pre><h2 id="articleHeader1">forEach()</h2><blockquote>&#x7528;&#x6765;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5143;&#x7D20;<br>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7D22;&#x5F15;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x672C;&#x8EAB;(&#x53EF;&#x9009;)<br>&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.forEach((item, index) =&gt; {
    console.log(item);     // a b c d e f 
    console.log(index);   // 0 1 2 3 4 5
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">arr.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(item);     <span class="hljs-comment">// a b c d e f </span>
    <span class="hljs-built_in">console</span>.log(index);   <span class="hljs-comment">// 0 1 2 3 4 5</span>
})</code></pre><h2 id="articleHeader2">map()</h2><blockquote>&#x7528;&#x6765;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5143;&#x7D20;<br>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7D22;&#x5F15;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x672C;&#x8EAB;(&#x53EF;&#x9009;)<br>&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;<p>every()&#xFF0C;some()&#xFF0C;filter()&#xFF0C;reduce()&#xFF0C;reduceRight()&#x4E0D;&#x518D;&#x4E00;&#x4E00;&#x4ECB;&#x7ECD;&#xFF0C;&#x8BE6;&#x7EC6;&#x8BF7;&#x770B;<a href="https://github.com/hezizi/Blog/issues/5" rel="nofollow noreferrer" target="_blank">Js&#x4E2D;Array&#x65B9;&#x6CD5;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</a></p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arrData = arr.map((item, index) =&gt; {
    console.log(item);     // a b c d e f 
    console.log(index);   // 0 1 2 3 4 5
    return item;
})
console.log(arrData);    // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, &quot;e&quot;, &quot;f&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arrData = arr.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(item);     <span class="hljs-comment">// a b c d e f </span>
    <span class="hljs-built_in">console</span>.log(index);   <span class="hljs-comment">// 0 1 2 3 4 5</span>
    <span class="hljs-keyword">return</span> item;
})
<span class="hljs-built_in">console</span>.log(arrData);    <span class="hljs-comment">// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, &quot;e&quot;, &quot;f&quot;]</span></code></pre><h2 id="articleHeader3">for...in</h2><blockquote>&#x53EF;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#xFF0C;&#x63A8;&#x8350;&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;</blockquote><ul><li><strong>&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x65F6;</strong></li></ul><blockquote>&#x5FAA;&#x73AF;&#x503C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key);           // a b c d  &#x5C5E;&#x6027;
        console.log(obj[key]);    // 1 2 3 4  &#x5C5E;&#x6027;&#x503C;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
        <span class="hljs-built_in">console</span>.log(key);           <span class="hljs-comment">// a b c d  &#x5C5E;&#x6027;</span>
        <span class="hljs-built_in">console</span>.log(obj[key]);    <span class="hljs-comment">// 1 2 3 4  &#x5C5E;&#x6027;&#x503C;</span>
    }
}</code></pre><ul><li><strong>&#x7528;&#x4E8E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x65F6;</strong></li></ul><blockquote>&#x503C;&#x4E3A;&#x6570;&#x7EC4;&#x7D22;&#x5F15;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index in arr) {
    console.log(index);          // 0 1 2 3 4 5 &#x6570;&#x7EC4;&#x7D22;&#x5F15;
    console.log(arr[index]);   // a b c d e f &#x6570;&#x7EC4;&#x503C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-built_in">console</span>.log(index);          <span class="hljs-comment">// 0 1 2 3 4 5 &#x6570;&#x7EC4;&#x7D22;&#x5F15;</span>
    <span class="hljs-built_in">console</span>.log(arr[index]);   <span class="hljs-comment">// a b c d e f &#x6570;&#x7EC4;&#x503C;</span>
}</code></pre><p>&#x5F53;&#x6211;&#x4EEC;&#x7ED9;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;name<br><code>arr.name = &apos;&#x6211;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;&apos;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index in arr) {
    console.log(index);           // 0 1 2 3 4 5 name (&#x4F1A;&#x904D;&#x5386;&#x51FA;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;)
    console.log(arr[index]);    // a b c d e f &#x6211;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;name
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-built_in">console</span>.log(index);           <span class="hljs-comment">// 0 1 2 3 4 5 name (&#x4F1A;&#x904D;&#x5386;&#x51FA;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;)</span>
    <span class="hljs-built_in">console</span>.log(arr[index]);    <span class="hljs-comment">// a b c d e f &#x6211;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;name</span>
}</code></pre><h2 id="articleHeader4">for...of</h2><blockquote>&#x53EF;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#xFF0C;&#x63A8;&#x8350;&#x7528;&#x4E8E;&#x904D;&#x5386;&#x6570;&#x7EC4;</blockquote><ul><li><strong>&#x7528;&#x4E8E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x65F6;</strong></li></ul><blockquote>&#x904D;&#x5386;&#x503C;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let value of arr) {
    console.log(value);       // a b c d e f &#x6570;&#x7EC4;&#x503C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> arr) {
    <span class="hljs-built_in">console</span>.log(value);       <span class="hljs-comment">// a b c d e f &#x6570;&#x7EC4;&#x503C;</span>
}</code></pre><ul><li><strong>&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x65F6;</strong></li></ul><blockquote>&#x987B;&#x914D;&#x5408;<code>Object.keys()</code>&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x76F4;&#x63A5;&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;for...of&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;<br>&#x5FAA;&#x73AF;&#x503C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let value of Object.keys(obj)) {
    console.log(value);    // a b c d &#x5BF9;&#x8C61;&#x5C5E;&#x6027;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.keys(obj)) {
    <span class="hljs-built_in">console</span>.log(value);    <span class="hljs-comment">// a b c d &#x5BF9;&#x8C61;&#x5C5E;&#x6027;</span>
}</code></pre><h3 id="articleHeader5">&#x603B;&#x7ED3;</h3><ul><li>&#x7528;&#x4E8E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4F7F;&#x7528;&#xFF1A;for()&#xFF0C;forEach()&#xFF0C;map()&#xFF0C;for...of</li><li>&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x4F7F;&#x7528;&#xFF1A;for...in</li></ul><blockquote>&#x5173;&#x4E8E;&#x4E0A;&#x8FF0;&#x5FAA;&#x73AF;&#x5BF9;&#x6027;&#x80FD;&#x7684;&#x5F71;&#x54CD;&#x4F1A;&#x540E;&#x7EED;&#x8865;&#x5145;</blockquote><p>&#x66F4;&#x591A;&#x5185;&#x5BB9;&#x8BF7;&#x5173;&#x6CE8;<a href="https://github.com/hezizi/Blog" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;&#x535A;&#x5BA2;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript循环遍历你会用哪些？

## 原文链接
[https://segmentfault.com/a/1190000016549153](https://segmentfault.com/a/1190000016549153)


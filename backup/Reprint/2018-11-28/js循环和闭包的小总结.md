---
title: 'js循环和闭包的小总结' 
date: 2018-11-28 2:30:11
hidden: true
slug: cxtwdmi33vt
categories: [reprint]
---

{{< raw >}}
<p><strong>&#x5FAA;&#x73AF;&#x548C;&#x95ED;&#x5305;</strong><br>for&#x5FAA;&#x73AF;&#x662F;&#x6700;&#x5E38;&#x89C1;&#x8BF4;&#x660E;&#x95ED;&#x5305;&#x7684;&#x4F8B;&#x5B50;&#x4E86;&#xFF0C;&#x6211;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x8E29;&#x7684;&#x5751;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=1;i&lt;=5;i++){
    setTimeout(function timer(){
        console.log(i)
    },i*1000);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>;i&lt;=<span class="hljs-number">5</span>;i++){
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i)
    },i*<span class="hljs-number">1000</span>);
}</code></pre><p>&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x4EE5;&#x4E3A;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x6BCF;&#x79D2;&#x6253;&#x5370;&#x51FA;&#x6765;1 2 3 4 5&#xFF0C;&#x6CA1;&#x60F3;&#x5230;&#x7684;&#x662F;&#x6211;&#x9519;&#x4E86;<br>&#x7ED3;&#x679C;&#x7ADF;&#x7136;&#x662F;&#x4E94;&#x4E2A;6.&#x6211;&#x53BB;&#xFF0C;&#x4EC0;&#x4E48;&#x9B3C;&#xFF1F;&#xFF1F;<br>&#x540E;&#x6765;&#x4ED4;&#x7EC6;&#x60F3;&#x60F3;&#x5EF6;&#x8FDF;&#x51FD;&#x6570;&#x7684;&#x56DE;&#x8C03;&#x4F1A;&#x5728;&#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x65F6;&#x624D;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x6B64;&#x4F1A;&#x8F93;&#x51FA;&#x4E94;&#x4E2A;6&#x3002;&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x4EE3;&#x7801;&#x51FA;&#x4E86;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x5462;&#xFF1F;&#x539F;&#x6765;&#x662F;&#x5FAA;&#x73AF;&#x4E2D;&#x6BCF;&#x4E2A;&#x8FED;&#x4EE3;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x90FD;&#x4F1A;&#x7ED9;&#x81EA;&#x5DF1;&#x6355;&#x83B7;&#x4E00;&#x4E2A;i,&#x7136;&#x540E;&#x6211;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#x624D;&#x80FD;&#x8BA9;&#x5B83;&#x6253;&#x5370;&#x51FA;&#x6211;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#x5462;&#xFF1F;</p><p><strong>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x66F4;&#x591A;&#x7684;&#x95ED;&#x5305;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x6BCF;&#x4E2A;&#x8FED;&#x4EE3;&#x90FD;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x4F5C;&#x7528;&#x57DF;&#x3002;</strong><br><strong>&#x6211;&#x662F;&#x901A;&#x8FC7;&#x7533;&#x58F0;&#x660E;&#x5E76;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x521B;&#x5EFA;&#x4F5C;&#x7528;&#x57DF;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
for(var i=1;i&lt;=5;i++){
    (function (j){
    setTimeout(function timer(){
        console.log(j)
    },i*1000);
})(i)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>
for(<span class="hljs-name">var</span> i=1<span class="hljs-comment">;i&lt;=5;i++){</span>
    (<span class="hljs-name">function</span> (<span class="hljs-name">j</span>){
    setTimeout(<span class="hljs-name">function</span> timer(){
        console.log(<span class="hljs-name">j</span>)
    },i*1000)<span class="hljs-comment">;</span>
})(<span class="hljs-name">i</span>)
}</code></pre><p>&#x7ED3;&#x679C;&#x5C31;&#x51FA;&#x6765;&#x4E86;</p><p><span class="img-wrap"><img data-src="/img/bVbce1y?w=682&amp;h=105" src="https://static.alili.tech/img/bVbce1y?w=682&amp;h=105" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x6700;&#x7B80;&#x5355;&#x6709;&#x6548;&#x7684;&#x65B9;&#x6CD5;&#x662F;for&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x7528;let&#x58F0;&#x660E;&#xFF0C;let&#x4F1A;&#x8BA9;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x90FD;&#x4F1A;&#x58F0;&#x660E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let i=1;i&lt;=5;i++){
    setTimeout(function timer(){
        console.log(i)
    },i*1000);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;=<span class="hljs-number">5</span>;i++){
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i)
    },i*<span class="hljs-number">1000</span>);
}</code></pre><p>&#x7ED3;&#x679C;&#x4E5F;&#x80FD;&#x51FA;&#x6765;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbce5G?w=456&amp;h=135" src="https://static.alili.tech/img/bVbce5G?w=456&amp;h=135" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js循环和闭包的小总结

## 原文链接
[https://segmentfault.com/a/1190000015271773](https://segmentfault.com/a/1190000015271773)


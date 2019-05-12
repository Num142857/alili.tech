---
title: '你们真的理解prototype和__proto__嘛？' 
date: 2018-11-18 3:32:07
hidden: true
slug: nu3boxtl3is
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x770B;&#x5230;prototype&#x5C31;&#x4F1A;&#x4E0B;&#x610F;&#x8BC6;&#x7684;&#x8BF4;&#x8FD9;&#x4E0D;&#x5C31;&#x662F;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x561B;&#xFF1F;&#x4F46;&#x662F;&#x4F60;&#x4EEC;&#x771F;&#x7684;&#x4E86;&#x89E3;prototype&#x561B;&#xFF1F;&#x5C31;&#x5F53;&#x4F60;&#x4EEC;&#x5F88;&#x4E86;&#x89E3;&#x4E86;&#xFF0C;&#x6BD5;&#x7ADF;&#x662F;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#xFF0C;&#x6211;&#x5C31;&#x7B80;&#x5355;&#x8BF4;&#x8BF4;</p><h3 id="articleHeader1">&#x6B63;&#x6587;</h3><p>&#x5148;&#x8BF4;&#x8BF4;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x7684;&#x7531;&#x6765;&#x5427;&#xFF0C;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x53EF;&#x4EE5;&#x7528;new Object()&#x6216;&#x8005;&#x76F4;&#x63A5;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;{}&#x521B;&#x5EFA;&#xFF0C;&#x4F46;&#x662F;&#x8981;&#x662F;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#x53C8;&#x6709;&#x5176;&#x4ED6;&#x5171;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x53C8;&#x5C06;&#x5982;&#x4F55;&#x5462;&#xFF1F;&#x4E0D;&#x9519;&#xFF0C;&#x8FD9;&#x4F1A;&#x9020;&#x6210;&#x5927;&#x91CF;&#x7684;&#x4EE3;&#x7801;&#x5197;&#x4F59;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;JS&#x7684;&#x4E16;&#x754C;&#x91CC;&#x6CA1;&#x6709;&#x63A5;&#x53E3;&#x7684;&#x6982;&#x5FF5;&#xFF08;ES5&#x4E4B;&#x524D;&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x5728;JS&#x6240;&#x8BF4;&#x7684;&#x7C7B;&#x4E5F;&#x5E76;&#x975E;&#x5B9E;&#x9645;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x7C7B;&#xFF0C;&#x5F88;&#x591A;&#x7C7B;&#x7684;&#x7279;&#x6027;JS&#x90FD;&#x6CA1;&#x6709;&#xFF0C;&#x6211;&#x4E00;&#x822C;&#x5C31;&#x628A;JS&#x7684;&#x7C7B;&#x79F0;&#x4E3A;&#x4E00;&#x4E2A;&quot;&#x53E6;&#x7C7B;&quot;&#xFF0C;&#x867D;&#x7136;ES6&#x6709;&#x4E86;&#x6240;&#x8C13;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x4F46;&#x662F;&#x4E07;&#x53D8;&#x4E0D;&#x79BB;&#x5176;&#x5B97;&#x3002;&#x626F;&#x5F97;&#x6709;&#x70B9;&#x8FDC;&#x554A;,&#x65E2;&#x7136;&#x666E;&#x901A;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x4F1A;&#x9020;&#x6210;&#x5197;&#x4F59;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x907F;&#x514D;&#x5462;&#xFF1F;&#x8D77;&#x521D;&#x7528;&#x7684;&#x662F;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF0C;&#x5982;demo1&#x6240;&#x793A;&#xFF1A;</p><h4>demo1</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function demo1 () {
    this.name = &apos;mirok&apos;,
    this.show = show
}
function demo2 () {
    this.name = &apos;july&apos;,
    this.show = show
}
function show () {
    console.log(this.name)
}
var name = &apos;global&apos;
new demo1().show() //mirok
new demo2().show() // july
show() //global" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo1</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;mirok&apos;</span>,
    <span class="hljs-keyword">this</span>.show = show
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo2</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;july&apos;</span>,
    <span class="hljs-keyword">this</span>.show = show
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
<span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;global&apos;</span>
<span class="hljs-keyword">new</span> demo1().show() <span class="hljs-comment">//mirok</span>
<span class="hljs-keyword">new</span> demo2().show() <span class="hljs-comment">// july</span>
show() <span class="hljs-comment">//global</span></code></pre><p>&#x867D;&#x7136;demo1&#x89E3;&#x51B3;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5C01;&#x88C5;&#x800C;&#x8A00;, show&#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7279;&#x5B9A;&#x80FD;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x5982;demo1&#x8F93;&#x51FA;&#x4E86;global&#x4E00;&#x6837;&#xFF0C;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x6B64;&#x7C7B;&#x95EE;&#x9898;&#xFF0C;&#x4FBF;&#x6709;&#x4E86;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4F60;&#x4EEC;&#x7ECF;&#x5E38;&#x7528;&#x7684;prototype</p><h4>demo2</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Demo2 () {
}
Demo2.prototype.show = function() {
    console.log(this.name)
}
var obj1 = new Demo2()
var obj2 = new Demo2()
obj1.name = &apos;mirok&apos;
obj2.name = &apos;july&apos;
obj1.show() //mirok
obj2.show() // july
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Demo2</span> (<span class="hljs-params"></span>) </span>{
}
Demo2.prototype.show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
<span class="hljs-keyword">var</span> obj1 = <span class="hljs-keyword">new</span> Demo2()
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-keyword">new</span> Demo2()
obj1.name = <span class="hljs-string">&apos;mirok&apos;</span>
obj2.name = <span class="hljs-string">&apos;july&apos;</span>
obj1.show() <span class="hljs-comment">//mirok</span>
obj2.show() <span class="hljs-comment">// july</span>
</code></pre><p>&#x7F51;&#x4E0A;&#x6709;&#x5F88;&#x591A;&#x89E3;&#x91CA;&#x4E86;__proto__&#x548C;prototype&#x7684;&#x533A;&#x522B;&#xFF0C;&#x8FD8;&#x5404;&#x81EA;&#x5199;&#x4E86;&#x4F8B;&#x5B50;&#xFF0C;&#x867D;&#x7136;&#x8BF4;&#x4E86;&#x5F88;&#x591A;&#xFF0C;&#x4E5F;&#x662F;&#x89E3;&#x91CA;&#x5F97;&#x4E0D;&#x6E05;&#x4E0D;&#x695A;&#x3002;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x5E26;&#x4E86;&#x4E00;&#x4E2A;prototype&#x5C5E;&#x6027;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5C31;&#x5E26;&#x7740;&#x4E00;&#x4E2A;[[prototype]]&#x6307;&#x9488;&#xFF0C;&#x8FD9;&#x4E2A;&#x6307;&#x9488;&#x662F;&#x5B9E;&#x4F8B;&#x548C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x95F4;&#x7684;&#x8054;&#x7CFB;&#xFF0C;&#x8FD9;&#x4E2A;&#x6307;&#x9488;&#x5728;&#x811A;&#x672C;&#x4E2D;&#x662F;&#x4E0D;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4F60;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;Firefox&#x3001;Safari &#x548C; Chrome&#x4E2D;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;__proto__&#x6765;&#x652F;&#x6301;&#x8BBF;&#x95EE;&#xFF0C;&#x8FD9;&#x4E48;&#x4E00;&#x8BF4;&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x80FD;&#x660E;&#x767D;&#x5427;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你们真的理解prototype和__proto__嘛？

## 原文链接
[https://segmentfault.com/a/1190000015884498](https://segmentfault.com/a/1190000015884498)


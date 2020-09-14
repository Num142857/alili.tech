---
title: 'JavaScript的for从懵懂到辨明' 
date: 2018-11-29 2:30:09
hidden: true
slug: jmofoztyxel
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015236979?w=1776&amp;h=1080" src="https://static.alili.tech/img/remote/1460000015236979?w=1776&amp;h=1080" alt="" title="" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x521D;&#x5B66;<code>JavaScript</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x77E5;&#x9053;&#x6709;&#x5404;&#x79CD;<code>for</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x61F5;&#x61F5;&#x61C2;&#x61C2;&#xFF0C;&#x4E5F;&#x8BB8;&#x662F;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x7CFB;&#x7EDF;&#x5B66;&#x4E60;&#x7684;&#x7F18;&#x6545;&#x3002;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x628A;&#x5404;&#x79CD;<code>for</code>&#x90FD;&#x6328;&#x4E2A;&#x8FA8;&#x660E;&#x3002;</p><h1 id="articleHeader1">&#x4E00;&#x3001;<code>for</code></h1><blockquote>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#xFF0C;&#x5305;&#x542B;&#x4E09;&#x4E2A;&#x53EF;&#x9009;&#x8868;&#x8FBE;&#x5F0F;&#x3002;&#x4E09;&#x4E2A;&#x53EF;&#x9009;&#x8868;&#x8FBE;&#x5F0F;&#x5728;&#x5706;&#x62EC;&#x53F7;&#x4E2D;&#xFF0C;&#x7531;&#x5206;&#x53F7;&#x5206;&#x9694;&#x3002;&#x540E;&#x8DDF;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x4E2D;&#x6267;&#x884C;&#x7684;&#x8BED;&#x53E5;&#x6216;&#x5757;&#x8BED;&#x53E5;&#x3002;</blockquote><h2 id="articleHeader2">&#x8BED;&#x6CD5;</h2><blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for ([initialization]; [condition]; [final-expression])
    statement" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">for</span> ([initialization]; [condition]; [final-expression])
    statement</code></pre></blockquote><h3 id="articleHeader3"><code>initialization</code></h3><p>&#x521D;&#x59CB;&#x5316;&#x8BED;&#x53E5;&#x3002;&#x53EF;&#x5199;&#x8868;&#x8FBE;&#x5F0F;&#x3001;&#x8D4B;&#x503C;&#x8BED;&#x53E5;&#x3001;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x3002;</p><h3 id="articleHeader4"><code>condition</code></h3><p>&#x5FAA;&#x73AF;&#x6761;&#x4EF6;&#x8868;&#x8FBE;&#x5F0F;&#x3002;&#x5982;&#x679C;&#x8868;&#x8FBE;&#x5F0F;&#x7ED3;&#x679C;&#x4E3A;<code>true</code>&#xFF0C;<code>statement</code>&#x4F1A;&#x88AB;&#x6267;&#x884C;&#x3002;&#x5982;&#x679C;&#x8868;&#x8FBE;&#x5F0F;&#x7ED3;&#x679C;&#x4E3A;<code>false</code>&#xFF0C;&#x90A3;&#x4E48;&#x6267;&#x884C;&#x6D41;&#x7A0B;&#x8DF3;&#x5230;<code>for</code>&#x8BED;&#x53E5;&#x7ED3;&#x6784;&#x540E;&#x9762;&#x7684;&#x7B2C;&#x4E00;&#x6761;&#x8BED;&#x53E5;&#x3002;&#x4E0D;&#x5199;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5C31;&#x662F;&#x6C38;&#x8FDC;&#x4E3A;<code>true</code>&#x3002;</p><h3 id="articleHeader5"><code>final-expression</code></h3><p>&#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x7684;&#x6700;&#x540E;&#x90FD;&#x8981;&#x6267;&#x884C;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;&#x6267;&#x884C;&#x65F6;&#x673A;&#x662F;&#x5728;&#x4E0B;&#x4E00;&#x6B21;<code>condition</code>&#x7684;&#x8BA1;&#x7B97;&#x4E4B;&#x524D;&#x3002;</p><h3 id="articleHeader6"><code>statement</code></h3><p>&#x53EA;&#x8981;<code>condition</code>&#x7684;&#x7ED3;&#x679C;&#x4E3A;<code>true</code>&#x5C31;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#x7684;&#x8BED;&#x53E5;&#x3002;&#x591A;&#x6761;&#x8BED;&#x53E5;&#x4F7F;&#x7528;&#x5757;&#x8BED;&#x53E5;&#xFF08;<code>{...}</code>&#xFF09;&#x6765;&#x5305;&#x542B;&#x3002;&#x6CA1;&#x6709;&#x8BED;&#x53E5;&#x6267;&#x884C;&#xFF0C;&#x4F7F;&#x7528;&#x7A7A;&#x8BED;&#x53E5;&#xFF08;<code>;</code>&#xFF09;&#x3002;</p><h3 id="articleHeader7">&#x793A;&#x4F8B;</h3><p>&#x6211;&#x60F3;&#x8F93;&#x51FA;&#x4E94;&#x4E2A;&#x6570;&#x5B57;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i &lt; 5; i++)
    console.log(i);
/*
0
1
2
3
4
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++)
    <span class="hljs-built_in">console</span>.log(i);
<span class="hljs-comment">/*
0
1
2
3
4
*/</span></code></pre><p>&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;&#x8F93;&#x51FA;&#x4E94;&#x4E2A;&#x6570;&#x5B57;&#x3002;&#x53EF;&#x9009;&#x7684;&#x4E09;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x591A;&#x884C;&#x8BED;&#x53E5;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>{}</code>&#x5305;&#x542B;&#x8D77;&#x6765;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; ; i++) {
    if (i &gt;= 5)
        break;
    console.log(i);
}
/*
0
1
2
3
4
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; ; i++) {
    <span class="hljs-keyword">if</span> (i &gt;= <span class="hljs-number">5</span>)
        <span class="hljs-keyword">break</span>;
    <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">/*
0
1
2
3
4
*/</span></code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5199;&#x6761;&#x4EF6;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5C31;&#x8981;&#x786E;&#x4FDD;&#x5FAA;&#x73AF;&#x4F53;&#x5185;&#x80FD;&#x591F;&#x8DF3;&#x51FA;&#xFF0C;&#x9632;&#x6B62;&#x6B7B;&#x5FAA;&#x73AF;&#x3002;<code>break</code>&#x53EF;&#x4EE5;&#x8DF3;&#x51FA;&#x5FAA;&#x73AF;&#x3002;</p><h1 id="articleHeader8">&#x4E8C;&#x3001;<code>for...in</code></h1><blockquote>&#x4EE5;&#x4EFB;&#x610F;&#x987A;&#x5E8F;&#x904D;&#x5386;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x3002;&#x5BF9;&#x4E8E;&#x6BCF;&#x4E2A;&#x679A;&#x4E3E;&#x7684;&#x5C5E;&#x6027;&#xFF0C;<code>...</code>&#x90E8;&#x5206;&#x90FD;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#x3002;</blockquote><h2 id="articleHeader9">&#x8BED;&#x6CD5;</h2><blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (variable in object) {...}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">for</span> (variable <span class="hljs-keyword">in</span> object) {...}</code></pre></blockquote><h3 id="articleHeader10"><code>variable</code></h3><p>&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x5206;&#x914D;&#x7ED9;&#x53D8;&#x91CF;&#x3002;</p><h3 id="articleHeader11"><code>object</code></h3><p>&#x88AB;&#x8FED;&#x4EE3;&#x679A;&#x4E3E;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><h2 id="articleHeader12">&#x793A;&#x4F8B;</h2><p>&#x6211;&#x60F3;&#x8F93;&#x51FA;&#x5BF9;&#x8C61;&#x91CC;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = {
    a: 1,
    b: 2,
    c: 3
};
for (const v in o) {
    console.log(`o.${v} = ${o[v]}`);
}
/*
o.a = 1
o.b = 2
o.c = 3
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> o = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> v <span class="hljs-keyword">in</span> o) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`o.<span class="hljs-subst">${v}</span> = <span class="hljs-subst">${o[v]}</span>`</span>);
}
<span class="hljs-comment">/*
o.a = 1
o.b = 2
o.c = 3
*/</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x89C1;<code>for...in</code>&#x628A;&#x6240;&#x6709;&#x7684;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x90FD;&#x679A;&#x4E3E;&#x4E86;&#x51FA;&#x6765;&#xFF0C;<code>v</code>&#x7684;&#x7C7B;&#x578B;&#x662F;<code>String</code>&#xFF0C;&#x6240;&#x4EE5;&#x8BBF;&#x95EE;&#x5F53;&#x524D;&#x904D;&#x5386;&#x5230;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x4F7F;&#x7528;&#x4E86;&#x5173;&#x8054;&#x6570;&#x7EC4;<code>o[v]</code>&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><p><code>for...in</code>&#x5728;&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x4EE5;&#x4EFB;&#x610F;&#x987A;&#x5E8F;&#x904D;&#x5386;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = [];
o[0] = 1;
o[&apos;one&apos;] = 2;
o[2] = 3;
for (const v in o) {
    console.log(`o[${v}] = ${o[v]}`);
}
/*
o[0] = 1
o[2] = 3
o[one] = 2
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> o = [];
o[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>;
o[<span class="hljs-string">&apos;one&apos;</span>] = <span class="hljs-number">2</span>;
o[<span class="hljs-number">2</span>] = <span class="hljs-number">3</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> v <span class="hljs-keyword">in</span> o) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`o[<span class="hljs-subst">${v}</span>] = <span class="hljs-subst">${o[v]}</span>`</span>);
}
<span class="hljs-comment">/*
o[0] = 1
o[2] = 3
o[one] = 2
*/</span></code></pre><p>&#x56E0;&#x6B64;&#x5F53;&#x9047;&#x5230;&#x5BF9;&#x8FED;&#x4EE3;&#x8BBF;&#x95EE;&#x987A;&#x5E8F;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x6570;&#x7EC4;&#x65F6;&#xFF0C;&#x6700;&#x597D;&#x7528;&#x6574;&#x6570;&#x7D22;&#x5F15;&#x3002;</p><p>&#x6211;&#x60F3;&#x7D2F;&#x52A0;&#x6570;&#x7EC4;&#x6240;&#x6709;&#x7684;&#x6210;&#x5458;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.age = 97;
let o = [1,2];
let sum = 0;
for (const v in o) {
    sum += o[v];
    console.log(`o[${v}] = ${o[v]}`);
}
console.log(`sum = ${sum}`);
/*
o[0] = 1
o[1] = 2
o[age] = 97
sum = 100
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">Array</span>.prototype.age = <span class="hljs-number">97</span>;
<span class="hljs-keyword">let</span> o = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
<span class="hljs-keyword">let</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> v <span class="hljs-keyword">in</span> o) {
    sum += o[v];
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`o[<span class="hljs-subst">${v}</span>] = <span class="hljs-subst">${o[v]}</span>`</span>);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`sum = <span class="hljs-subst">${sum}</span>`</span>);
<span class="hljs-comment">/*
o[0] = 1
o[1] = 2
o[age] = 97
sum = 100
*/</span></code></pre><p>&#x5F88;&#x663E;&#x7136;&#x8FD9;&#x91CC;&#x4E0D;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x7684;&#x9884;&#x671F;&#xFF0C;&#x56E0;&#x4E3A;<code>for...in</code>&#x5FAA;&#x73AF;&#x8BED;&#x53E5;&#x5C06;&#x8FD4;&#x56DE;&#x6240;&#x6709;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#xFF0C;&#x5305;&#x62EC;&#x975E;&#x6574;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x540D;&#x79F0;&#x548C;&#x7EE7;&#x627F;&#x7684;&#x90A3;&#x4E9B;&#x3002;&#x8FD8;&#x4F1A;&#x83B7;&#x53D6;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x3002;</p><p>&#x6211;&#x53EA;&#x60F3;&#x7D2F;&#x52A0;&#x81EA;&#x8EAB;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.age = 97;
let arr = [1, 2];
let sum = 0;
for (const v in arr) {
    if (arr.hasOwnProperty(v)) {
        sum += arr[v];
    }
    console.log(`arr[${v}] = ${arr[v]}`);
}
console.log(`sum = ${sum}`);
/*
o[0] = 1
o[1] = 2
o[age] = 97
sum = 3
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">Array</span>.prototype.age = <span class="hljs-number">97</span>;
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">let</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> v <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-keyword">if</span> (arr.hasOwnProperty(v)) {
        sum += arr[v];
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`arr[<span class="hljs-subst">${v}</span>] = <span class="hljs-subst">${arr[v]}</span>`</span>);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`sum = <span class="hljs-subst">${sum}</span>`</span>);
<span class="hljs-comment">/*
o[0] = 1
o[1] = 2
o[age] = 97
sum = 3
*/</span></code></pre><p>&#x5982;&#x679C;&#x4F60;&#x53EA;&#x8981;&#x8003;&#x8651;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5B83;&#x7684;&#x539F;&#x578B;&#xFF0C;&#x90A3;&#x4E48;&#x4F7F;&#x7528;<code>Object.getOwnPropertyNames()</code>&#x6216;&#x6267;&#x884C;<code>Object.prototype.hasOwnProperty()</code>&#x6765;&#x786E;&#x5B9A;&#x67D0;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x662F;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#xFF08;&#x4E5F;&#x80FD;&#x4F7F;&#x7528;<code>propertyIsEnumerable</code>&#xFF09;&#x3002;</p><h1 id="articleHeader13">&#x4E09;&#x3001;<code>Array.prototype.forEach()</code></h1><blockquote>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x63D0;&#x4F9B;&#x7684;&#x51FD;&#x6570;&#x3002;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;<code>undefined</code>&#x3002;</blockquote><h2 id="articleHeader14">&#x8BED;&#x6CD5;</h2><blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.forEach(callback[, thisArg])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">Array</span>.forEach(callback[, thisArg])</code></pre></blockquote><h3 id="articleHeader15"><code>callback</code></h3><p>&#x4E3A;&#x6570;&#x7EC4;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p><h4><code>currentValue</code></h4><p>&#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x503C;&#x3002;</p><h4><code>index</code></h4><p>&#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002;</p><h4><code>array</code></h4><p><code>forEach()</code>&#x65B9;&#x6CD5;&#x6B63;&#x5728;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><h3 id="articleHeader16"><code>thisArg</code></h3><p>&#x53EF;&#x9009;&#x53C2;&#x6570;&#x3002;&#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03; &#x51FD;&#x6570;&#x65F6;&#x7528;&#x4F5C;<code>this</code>&#x7684;&#x503C;(&#x53C2;&#x8003;&#x5BF9;&#x8C61;)&#x3002;</p><h2 id="articleHeader17">&#x793A;&#x4F8B;</h2><p>&#x6211;&#x60F3;&#x8F93;&#x51FA;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArrayElements(element, index, array) {
    console.log(`a[${index}] = ${element}`);
}
[4, 2, 3].forEach(logArrayElements);
/*
a[0] = 4
a[1] = 2
a[2] = 3
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArrayElements</span>(<span class="hljs-params">element, index, array</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`a[<span class="hljs-subst">${index}</span>] = <span class="hljs-subst">${element}</span>`</span>);
}
[<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].forEach(logArrayElements);
<span class="hljs-comment">/*
a[0] = 4
a[1] = 2
a[2] = 3
*/</span></code></pre><p><code>forEcah()</code>&#x4F1A;&#x8DF3;&#x8FC7;&#x5DF2;&#x7ECF;&#x5220;&#x9664;&#x6216;&#x8005;&#x4E3A;&#x521D;&#x59CB;&#x5316;&#x7684;&#x9879;&#xFF08;&#x4F46;&#x4E0D;&#x5305;&#x62EC;&#x90A3;&#x4E9B;&#x503C;&#x4E3A;<code>undefined</code>&#x7684;&#x9879;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x7A00;&#x758F;&#x6570;&#x7EC4;&#x4E0A;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArrayElements(element, index, array) {
    console.log(`a[${index}] = ${element}`);
}
[4, , 3].forEach(logArrayElements);
[1, undefined, 3].forEach(logArrayElements);
/*
a[0] = 4
a[2] = 3
a[0] = 1
a[1] = undefined
a[2] = 3
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArrayElements</span>(<span class="hljs-params">element, index, array</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`a[<span class="hljs-subst">${index}</span>] = <span class="hljs-subst">${element}</span>`</span>);
}
[<span class="hljs-number">4</span>, , <span class="hljs-number">3</span>].forEach(logArrayElements);
[<span class="hljs-number">1</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-number">3</span>].forEach(logArrayElements);
<span class="hljs-comment">/*
a[0] = 4
a[2] = 3
a[0] = 1
a[1] = undefined
a[2] = 3
*/</span></code></pre><p>&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x7EC8;&#x6B62;&#x4F1A;&#x8DF3;&#x51FA;<code>forEcah()</code>&#x5FAA;&#x73AF;&#xFF0C;&#x9664;&#x4E86;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x5F02;&#x5E38;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArrayElements(element, index, array) {
    console.log(`a[${index}] = ${element}`);
    break;
}
[1, 2, 3].forEach(logArrayElements);
/*
Uncaught SyntaxError: Illegal break statement
    at Array.forEach (&lt;anonymous&gt;)
    at &lt;anonymous&gt;:5:11
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArrayElements</span>(<span class="hljs-params">element, index, array</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`a[<span class="hljs-subst">${index}</span>] = <span class="hljs-subst">${element}</span>`</span>);
    <span class="hljs-keyword">break</span>;
}
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].forEach(logArrayElements);
<span class="hljs-comment">/*
Uncaught SyntaxError: Illegal break statement
    at Array.forEach (&lt;anonymous&gt;)
    at &lt;anonymous&gt;:5:11
*/</span></code></pre><p>&#x4F7F;&#x7528;<code>return</code>&#x4E5F;&#x65E0;&#x6CD5;&#x4E2D;&#x6B62;&#x5FAA;&#x73AF;&#x3002;</p><p>&#x4F7F;&#x7528;<code>thisArg</code>&#xFF0C;&#x4E3E;&#x4E2A;&#x52C9;&#x5F3A;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x901A;&#x8FC7;&#x81EA;&#x5B9A;&#x4E49;&#x7684;<code>add()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x8BA1;&#x7B97;&#x6240;&#x6DFB;&#x52A0;&#x6570;&#x7EC4;&#x7684;&#x548C;<code>sum</code>&#x548C;&#x6210;&#x5458;&#x6570;<code>count</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Counter() {
    this.sum = 0;
    this.count = 0;
}
Counter.prototype.add = function(array) {
    array.forEach(function(element) {
        this.sum += element;
        ++this.count;
    }, this);
};
let obj = new Counter();
obj.add([1, 3, 5, 7]);
console.log(obj.count);  // 4 === (1+1+1+1)
console.log(obj.sum);  // 16 === (1+3+5+7)
/*
4
16
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Counter</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.sum = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span>;
}
Counter.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array</span>) </span>{
    array.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element</span>) </span>{
        <span class="hljs-keyword">this</span>.sum += element;
        ++<span class="hljs-keyword">this</span>.count;
    }, <span class="hljs-keyword">this</span>);
};
<span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">new</span> Counter();
obj.add([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>]);
<span class="hljs-built_in">console</span>.log(obj.count);  <span class="hljs-comment">// 4 === (1+1+1+1)</span>
<span class="hljs-built_in">console</span>.log(obj.sum);  <span class="hljs-comment">// 16 === (1+3+5+7)</span>
<span class="hljs-comment">/*
4
16
*/</span></code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x4F20;&#x5165;&#x51FD;&#x6570;&#x53C2;&#x6570;&#xFF0C;<code>thisArg</code>&#x53C2;&#x6570;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5728;&#x8BCD;&#x6CD5;&#x4E0A;&#x7ED1;&#x5B9A;&#x4E86;<code>this</code>&#x503C;&#x3002;</p><p>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x5728;&#x8FED;&#x4EE3;&#x65F6;&#x88AB;&#x4FEE;&#x6539;&#x4E86;&#xFF0C;&#x5219;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x4F1A;&#x88AB;&#x8DF3;&#x8FC7;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let words = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;, &quot;four&quot;];
words.forEach(function(word) {
  console.log(word);
  if (word === &quot;two&quot;) {
    words.shift();
  }
});
/*
one
two
four
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> words = [<span class="hljs-string">&quot;one&quot;</span>, <span class="hljs-string">&quot;two&quot;</span>, <span class="hljs-string">&quot;three&quot;</span>, <span class="hljs-string">&quot;four&quot;</span>];
words.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">word</span>) </span>{
  <span class="hljs-built_in">console</span>.log(word);
  <span class="hljs-keyword">if</span> (word === <span class="hljs-string">&quot;two&quot;</span>) {
    words.shift();
  }
});
<span class="hljs-comment">/*
one
two
four
*/</span></code></pre><p>&#x5F53;&#x5230;&#x8FBE;&#x5305;&#x542B;&#x503C;<code>&quot;two&quot;</code>&#x7684;&#x9879;&#x65F6;&#xFF0C;&#x6574;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x9879;&#x88AB;&#x79FB;&#x9664;&#x4E86;&#xFF0C;&#x8FD9;&#x5BFC;&#x81F4;&#x6240;&#x6709;&#x5269;&#x4E0B;&#x7684;&#x9879;&#x524D;&#x79FB;&#x4E86;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x3002;&#x56E0;&#x4E3A;&#x5143;&#x7D20;<code>&quot;four&quot;</code>&#x73B0;&#x5728;&#x5728;&#x6570;&#x7EC4;&#x66F4;&#x524D;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;<code>&quot;three&quot;</code>&#x4F1A;&#x88AB;&#x8DF3;&#x8FC7;&#x3002;<code>forEach()</code>&#x4E0D;&#x4F1A;&#x5728;&#x8FED;&#x4EE3;&#x4E4B;&#x524D;&#x521B;&#x5EFA;&#x6570;&#x7EC4;&#x7684;&#x526F;&#x672C;&#x3002;</p><h1 id="articleHeader18">&#x56DB;&#x3001;<code>for...of</code></h1><blockquote><code>for...of</code>&#x8BED;&#x53E5;&#x5728;&#x53EF;&#x4EE5;&#x8FED;&#x4EE3;&#x7684;&#x5BF9;&#x8C61;&#xFF08;<code>Array</code>&#x3001;<code>Map</code>&#x3001;<code>Set</code>&#x3001;<code>String</code>&#x3001;<code>TypedArray</code>&#x3001;<code>arguments</code>&#x5BF9;&#x8C61;&#x7B49;&#x7B49;&#xFF09;&#x4E0A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#xFF0C;&#x8C03;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x8FED;&#x4EE3;&#x94A9;&#x5B50;&#xFF0C;&#x5E76;&#x4E3A;&#x6BCF;&#x4E2A;&#x4E0D;&#x540C;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x6267;&#x884C;&#x8BED;&#x53E5;&#x3002;</blockquote><h2 id="articleHeader19">&#x8BED;&#x6CD5;</h2><blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (variable of iterable) {
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">for</span> (variable <span class="hljs-keyword">of</span> iterable) {
    ...
}</code></pre></blockquote><h3 id="articleHeader20"><code>variable</code></h3><p>&#x5728;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x4E2D;&#xFF0C;&#x5C06;&#x4E0D;&#x540C;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x5206;&#x914D;&#x7ED9;&#x53D8;&#x91CF;&#x3002;</p><h3 id="articleHeader21"><code>iterable</code></h3><p>&#x88AB;&#x8FED;&#x4EE3;&#x679A;&#x4E3E;&#x5176;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><h2 id="articleHeader22">&#x793A;&#x4F8B;</h2><h3 id="articleHeader23">&#x8FED;&#x4EE3;<code>Array</code></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [10, 20, 30];
for (let v of a) {
    console.log(v);
}
/*
10
20
30
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> a = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> a) {
    <span class="hljs-built_in">console</span>.log(v);
}
<span class="hljs-comment">/*
10
20
30
*/</span></code></pre><h3 id="articleHeader24">&#x8FED;&#x4EE3;<code>String</code></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s = &apos;Tang&apos;;
for (let v of s) {
    console.log(v);
}
/*
T
a
n
g
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> s = <span class="hljs-string">&apos;Tang&apos;</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> s) {
    <span class="hljs-built_in">console</span>.log(v);
}
<span class="hljs-comment">/*
T
a
n
g
*/</span></code></pre><h3 id="articleHeader25">&#x8FED;&#x4EE3;<code>arguments</code></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    for (let v of arguments) {
        console.log(v);
    }
}
)(1, 2, 3);
/*
1
2
3
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> <span class="hljs-built_in">arguments</span>) {
        <span class="hljs-built_in">console</span>.log(v);
    }
}
)(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<span class="hljs-comment">/*
1
2
3
*/</span></code></pre><h2 id="articleHeader26">&#x533A;&#x522B;</h2><blockquote>&#x65E0;&#x8BBA;&#x662F;<code>for...in</code>&#x8FD8;&#x662F;<code>for...of</code>&#x8BED;&#x53E5;&#x90FD;&#x662F;&#x8FED;&#x4EE3;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x3002;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x5B83;&#x4EEC;&#x7684;&#x8FED;&#x4EE3;&#x65B9;&#x5F0F;&#x3002;</blockquote><p><code>for...in</code>&#x8BED;&#x53E5;&#x4EE5;&#x539F;&#x59CB;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x7684;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x3002;</p><p><code>for...of</code>&#x8BED;&#x53E5;&#x904D;&#x5386;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x5B9A;&#x4E49;&#x8981;&#x8FED;&#x4EE3;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x793A;&#x4F8B;&#x663E;&#x793A;&#x4E86;&#x4E0E;<code>Array</code>&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;<code>for...of</code>&#x5FAA;&#x73AF;&#x548C;<code>for...in</code>&#x5FAA;&#x73AF;&#x4E4B;&#x95F4;&#x7684;&#x533A;&#x522B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = &apos;hello&apos;;

for (let i in iterable) {
  console.log(i);
}
/*
0
1
2
foo
arrCustom
objCustom
*/

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i);
  }
}
/*
0
1
2
foo
*/

for (let i of iterable) {
  console.log(i);
}
/*
3
5
7
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">Object</span>.prototype.objCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}; 
<span class="hljs-built_in">Array</span>.prototype.arrCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-keyword">let</span> iterable = [<span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>];
iterable.foo = <span class="hljs-string">&apos;hello&apos;</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">/*
0
1
2
foo
arrCustom
objCustom
*/</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-keyword">if</span> (iterable.hasOwnProperty(i)) {
    <span class="hljs-built_in">console</span>.log(i);
  }
}
<span class="hljs-comment">/*
0
1
2
foo
*/</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">/*
3
5
7
*/</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript的for从懵懂到辨明

## 原文链接
[https://segmentfault.com/a/1190000015236976](https://segmentfault.com/a/1190000015236976)


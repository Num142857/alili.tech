---
title: '不要再问我this的指向问题了' 
date: 2018-11-25 2:30:07
hidden: true
slug: r7oq3m0imfp
categories: [reprint]
---

{{< raw >}}
<p>this&#x7684;&#x6307;&#x5411;&#x5DF2;&#x7ECF;&#x662F;&#x4E00;&#x4E2A;&#x8001;&#x751F;&#x5E38;&#x8C08;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6BCF;&#x9022;&#x9762;&#x8BD5;&#x90FD;&#x8981;&#x53BB;&#x590D;&#x4E60;&#x590D;&#x4E60;&#xFF0C;&#x8FD1;&#x6765;&#x5DE9;&#x56FA;js&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x51B3;&#x5FC3;&#x5F7B;&#x5E95;&#x638C;&#x63E1;&#x8FD9;&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x4E00;&#x52B3;&#x6C38;&#x9038;&#x3002;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#xFF0C;&#x4E3A;&#x4E86;&#x4E0D;&#x5F71;&#x54CD;&#x5927;&#x5BB6;&#x7684;&#x601D;&#x8003;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x4E0D;&#x4F1A;&#x53BB;&#x6CE8;&#x91CA;&#x7B54;&#x6848;&#xFF0C;&#x60F3;&#x77E5;&#x9053;&#x7B54;&#x6848;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x53BB;&#x63A7;&#x5236;&#x53F0;&#x6267;&#x884C;&#x4E00;&#x4E0B;&#x3002;</p><h2 id="articleHeader0">&#x56DB;&#x7C7B;&#x573A;&#x666F;&#x9010;&#x4E00;&#x51FB;&#x7834;</h2><p>&#x9996;&#x5148;&#xFF0C;&#x5206;&#x6790;this&#x7684;&#x6307;&#x5411;&#x5171;&#x6709;&#x56DB;&#x79CD;&#x7C7B;&#x578B;&#xFF0C;&#x5728;&#x5206;&#x6790;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x5E26;&#x597D;&#x4E24;&#x4E2A;&#x9526;&#x56CA;&#xFF1A;<br>1.&#x51FD;&#x6570;<strong>&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF08;&#x5373;&#x8FD0;&#x884C;&#x65F6;&#xFF09;</strong>&#x624D;&#x4F1A;&#x786E;&#x5B9A;&#x8BE5;&#x51FD;&#x6570;&#x5185;this&#x7684;&#x6307;&#x5411;&#x3002;&#x56E0;&#x4E3A;&#x5728;&#x51FD;&#x6570;&#x4E2D;this&#x4E0E;arguments&#x662F;&#x4E24;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#x624D;&#x4F1A;&#x53D6;&#x5F97;&#x5B83;&#x4EEC;&#xFF0C;&#x800C;&#x4E14;&#x641C;&#x7D22;&#x8FD9;&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#x65F6;&#x53EA;&#x4F1A;&#x5728;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x8303;&#x56F4;&#x91CC;&#x9762;&#x53BB;&#x641C;&#x3002;&#xFF08;&#x6709;&#x5173;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x4E0E;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x8BF7;&#x79FB;&#x6B65;&#x5230;<a href="https://www.zhihu.com/question/36393048" rel="nofollow noreferrer" target="_blank">js &#x4E2D;&#x7684;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61; &#x4E0E; &#x53D8;&#x91CF;&#x5BF9;&#x8C61; &#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF1F;</a>&#xFF09;<br>2.&#x8981;&#x786E;&#x5B9A;&#x51FD;&#x6570;&#x4E2D;this&#x7684;&#x6307;&#x5411;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x627E;&#x5230;&#x8BE5;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p><h3 id="articleHeader1">&#x8BA4;&#x51C6;&#x7B2C;&#x4E00;&#x79CD;&#x201C;test()&#x201D;&#x5F62;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test () {
    console.log(this.a)
}
test()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test () {
    console.log(this.a)
}
<span class="hljs-function"><span class="hljs-title">test</span><span class="hljs-params">()</span></span></code></pre><p>&#x76F4;&#x63A5;&#x4E0D;&#x5E26;&#x4EFB;&#x4F55;&#x5F15;&#x7528;&#x5F62;&#x5F0F;&#x53BB;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x5219;this&#x4F1A;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x5F71;&#x54CD;&#x53BB;&#x6539;&#x53D8;this&#xFF0C;this&#x9ED8;&#x8BA4;&#x5C31;&#x662F;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF08;&#x6D4F;&#x89C8;&#x5668;&#x662F;window&#xFF0C;Node&#x4E2D;&#x662F;global&#xFF09;&#x7684;&#x3002;&#x8FD9;&#x4E2A;&#x7ED3;&#x8BBA;&#x662F;&#x5728;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x8FD9;&#x4E2A;this&#x5176;&#x5B9E;&#x662F;undefined&#x7684;&#x3002;</p><h3 id="articleHeader2">&#x8BA4;&#x51C6;&#x7B2C;&#x4E8C;&#x79CD;&#x201C;xxx.test()&#x201D;&#x5F62;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test () {
    console.log(this.a)
}
<span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">2</span>,
    test
}
obj.test()</code></pre><p>&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x5BF9;&#x6BD4;&#x8D77;&#x7B2C;&#x4E00;&#x79CD;&#xFF0C;&#x5F88;&#x660E;&#x663E;test()&#x5DF2;&#x7ECF;&#x662F;&#x540D;&#x82B1;&#x6709;&#x4E3B;&#x7684;&#x4E86;&#xFF01;&#x770B;&#x6E05;&#x695A;&#xFF0C;&#x662F;&#x8C01;&#x547C;&#x5524;&#x7684;test()&#xFF1F;&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x662F;obj&#xFF0C;&#x6240;&#x4EE5;this&#x7684;&#x6307;&#x5411;&#x5C31;&#x4E0D;&#x8A00;&#x800C;&#x55BB;&#x4E86;&#x3002;&#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x8C01;&#x53BB;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x7684;this&#x5C31;&#x7ED1;&#x5B9A;&#x5230;&#x8C01;&#x8EAB;&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var obj0 = {
    a: 3,
    obj 
}
obj0.obj.test()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test () {
    console.log(this.a)
}
<span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">2</span>,
    test
}
<span class="hljs-selector-tag">var</span> obj0 = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">3</span>,
    obj 
}
obj0<span class="hljs-selector-class">.obj</span><span class="hljs-selector-class">.test</span>()</code></pre><p>&#x5373;&#x4F7F;&#x662F;&#x8FD9;&#x79CD;&#x4E32;&#x4E32;&#x70E7;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x7ED3;&#x679C;&#x4E5F;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;test()&#x4E2D;&#x7684;this&#x53EA;&#x5BF9;&#x76F4;&#x5C5E;&#x4E0A;&#x53F8;&#xFF08;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x8005;obj&#xFF09;&#x8D1F;&#x8D23;&#x3002;&#x518D;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x7EFC;&#x5408;&#x70B9;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test () {
    console.log(this.a)
}
<span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">2</span>,
    test
}
<span class="hljs-selector-tag">var</span> testCopy = obj<span class="hljs-selector-class">.test</span>
<span class="hljs-function"><span class="hljs-title">testCopy</span><span class="hljs-params">()</span></span></code></pre><p>&#x55EF;&#xFF0C;&#x806A;&#x660E;&#x7684;&#x4F60;&#x4E00;&#x5B9A;&#x60F3;&#x5230;&#xFF0C;&#x6362;&#x4E86;&#x4E2A;&#x540D;&#x5B57;&#x5C31;&#x80FD;&#x9A97;&#x5230;&#x6211;&#x4E86;&#xFF01;&#xFF1F;&#x867D;&#x7136;&#x7ECF;&#x8FC7;&#x4E86;&#x4E00;&#x6CE2;&#x6539;&#x540D;&#x6362;&#x59D3;&#xFF0C;&#x4F46;&#x672C;&#x8D28;&#x4E0A;&#x8FD8;&#x4E0D;&#x662F;obj.test()&#x561B;&#xFF01;&#x7ED3;&#x679C;&#x4E00;&#x5B9A;&#x548C;&#x4E0A;&#x9762;&#x4E00;&#x6837;&#xFF01;&#x5514;&#xFF0C;&#x8BF7;F12&#x5728;&#x63A7;&#x5236;&#x53F0;&#x8BD5;&#x8BD5;&#xFF0C;&#x7ADF;&#x7136;&#x2026;&#x2026;&#x5176;&#x5B9E;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x53BB;&#x601D;&#x8003;&#x4EC0;&#x4E48;&#xFF0C;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x7684;&#x5957;&#x8DEF;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8BA4;&#x51FD;&#x6570;&#x8C03;&#x65F6;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x770B;&#x5230;&#x6700;&#x540E;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x8DDF;&#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x4E00;&#x6BDB;&#x4E00;&#x6837;&#xFF1F;&#x6211;&#x518D;&#x4ECB;&#x7ECD;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#x5927;&#x5BB6;&#x4E00;&#x5B9A;&#x4E0D;&#x4F1A;&#x89C9;&#x5F97;&#x964C;&#x751F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
setTimeout(obj.test)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test () {
    console.log(this.a)
}
<span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">2</span>,
    test
}
<span class="hljs-function"><span class="hljs-title">setTimeout</span><span class="hljs-params">(obj.test)</span></span></code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x610F;&#x6DEB;&#x4E00;&#x4E0B;setTimeout&#x7684;&#x672C;&#x8D28;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x76F8;&#x5F53;&#x4E8E;&#x6709;&#x4E00;&#x4E2A;setTimeout&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setTimeout (fn, time) {
    // &#x8FD9;&#x91CC;&#x5E72;&#x4E86;&#x4E00;&#x5927;&#x6CE2;&#x4E0D;&#x53EF;&#x63CF;&#x8FF0;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6700;&#x540E;&#x4F1A;&#x53BB;&#x8C03;&#x4E00;&#x4E0B;&#x4F60;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
    fn()
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setTimeout</span> <span class="hljs-params">(fn, time)</span> </span>{
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5E72;&#x4E86;&#x4E00;&#x5927;&#x6CE2;&#x4E0D;&#x53EF;&#x63CF;&#x8FF0;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6700;&#x540E;&#x4F1A;&#x53BB;&#x8C03;&#x4E00;&#x4E0B;&#x4F60;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    fn()
}</code></pre><p>&#x770B;&#x5230;&#x600E;&#x6837;&#x8C03;&#x7528;&#x4F60;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x51FD;&#x6570;&#x4E86;&#x5417;&#xFF01;&#xFF1F;&#x518D;&#x60F3;&#x60F3;&#x6211;&#x4EEC;&#x7B2C;&#x4E00;&#x79CD;&#x5F62;&#x5F0F;&#x7684;&#x6807;&#x9898;<strong>&#x8BA4;&#x51C6;&#x7B2C;&#x4E00;&#x79CD;&#x201C;test()&#x201D;&#x5F62;&#x5F0F;</strong>&#x3002;</p><h3 id="articleHeader3">&#x8BA4;&#x51C6;&#x7B2C;&#x4E09;&#x79CD;&#x201C;test.call(xxx) / test.apply(xxx) / test.bind()&#x201D;&#x5F62;&#x5F0F;</h3><p>&#x770B;&#x4E86;&#x4E0A;&#x9762;&#x4E24;&#x79CD;&#x5F62;&#x5F0F;&#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x60F3;&#xFF0C;&#x6211;&#x975E;&#x5E38;&#x8BA8;&#x538C;&#x4E0A;&#x9762;&#x90A3;&#x4E9B;&#x77EB;&#x60C5;&#x7684;&#x626D;&#x626D;&#x634F;&#x634F;&#x7684;&#x4E5D;&#x66F2;&#x5341;&#x516B;&#x5F2F;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x8BA9;&#x4EBA;&#x6BEB;&#x65E0;&#x5B89;&#x5168;&#x611F;&#xFF0C;&#x6211;&#x8981;&#x6211;&#x81EA;&#x5DF1;&#x6307;&#x5B9A;this&#x7684;&#x6307;&#x5411;&#xFF0C;&#x6211;&#x8981;&#x80DC;&#x5929;&#x534A;&#x5B50;&#xFF01;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x7684;&#x4EE3;&#x7801;&#x6211;&#x505A;&#x4E3B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy.call(obj)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test () {
    console.log(this.a)
}
<span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">2</span>,
    test
}
<span class="hljs-selector-tag">var</span> testCopy = obj<span class="hljs-selector-class">.test</span>
testCopy.call(obj)</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;call&#xFF08;apply&#x8DDF;call&#x7684;&#x533A;&#x522B;&#x53EA;&#x662F;&#x4F20;&#x53C2;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;bind&#x6709;&#x70B9;&#x533A;&#x522B;&#xFF0C;bind&#x80FD;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x51FD;&#x6570;&#x5EF6;&#x8FDF;&#x6267;&#x884C;&#xFF0C;apply&#x4E0E;call&#x8C03;&#x7528;&#x5C31;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;bind&#x8FD9;&#x6837;&#x7684;&#x5F62;&#x5F0F;&#x6211;&#x4EEC;&#x4E5F;&#x79F0;&#x4E3A;&#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;&#xFF0C;&#x8FD9;&#x4E9B;&#x5C31;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x8981;&#x8BF4;&#x7684;&#x5566;&#xFF09;&#x6765;&#x8C03;&#x7528;testCopy&#xFF0C;&#x5E76;&#x4E14;&#x4F20;&#x5165;&#x4E86;&#x4F60;&#x60F3;&#x8981;this&#x6307;&#x5411;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x90A3;&#x4E48;this&#x5C31;&#x4F1A;&#x4E56;&#x4E56;&#x6309;&#x7167;&#x4F60;&#x7684;&#x6307;&#x793A;&#x884C;&#x4E8B;&#x5566;&#x3002;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x60F3;&#x8C61;&#x7B2C;&#x4E00;&#x3001;&#x4E8C;&#x79CD;&#x5F62;&#x5F0F;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x8F6C;&#x5316;&#x6210;call/apply&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x6709;&#x4E00;&#x7BC7;&#x6BD4;&#x8F83;&#x68D2;&#x7684;&#x6587;&#x7AE0;&#x63CF;&#x8FF0;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x601D;&#x8003;&#x8FC7;&#x7A0B;&#xFF0C;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x770B;<a href="https://zhuanlan.zhihu.com/p/23804247" rel="nofollow noreferrer" target="_blank">this &#x7684;&#x503C;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x4E00;&#x6B21;&#x8BF4;&#x6E05;&#x695A;</a></p><h3 id="articleHeader4">&#x8BA4;&#x51C6;&#x7B2C;&#x56DB;&#x79CD;&#x201C;new test()&#x201D;&#x5F62;&#x5F0F;</h3><p>&#x7EC8;&#x4E8E;&#x5230;&#x4E86;&#x6700;&#x540E;&#x4E00;&#x79CD;&#x5F62;&#x5F0F;&#x4E86;&#xFF0C;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x6BD4;&#x8F83;&#x597D;&#x8BA4;&#xFF0C;&#x56E0;&#x4E3A;&#x6709;&#x6807;&#x5FD7;&#x6027;&#x7684;new&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function test (a) {
    this.a = a
}
var b = new test(2)
console.log(b.a)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function test (a) {
    this<span class="hljs-selector-class">.a</span> = <span class="hljs-selector-tag">a</span>
}
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = new test(<span class="hljs-number">2</span>)
console.log(<span class="hljs-selector-tag">b</span>.a)</code></pre><p>new&#x8FD9;&#x4E2A;&#x64CD;&#x4F5C;&#x7B26;&#x5176;&#x5B9E;&#x662F;new&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x51FA;&#x6765;&#xFF0C;&#x800C;&#x88AB;new&#x7684;test&#x6211;&#x4EEC;&#x79F0;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x5B9A;&#x4E49;&#x4E00;&#x4E0B;&#x5C06;&#x8981;&#x5230;&#x6765;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#x3002;&#x90A3;&#x4E48;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x600E;&#x6837;&#x53BB;&#x63CF;&#x8FF0;&#x8FD9;&#x4E2A;&#x8FD8;&#x672A;&#x51FA;&#x751F;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x5462;&#xFF1F;&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x662F;&#x7528;this&#x3002;&#x6240;&#x4EE5;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x7684;this&#x6307;&#x7684;&#x5C31;&#x662F;&#x5C06;&#x8981;&#x88AB;new&#x51FA;&#x6765;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x3002;</p><h3 id="articleHeader5">One more thing</h3><p>&#x611F;&#x8C22;&#x5927;&#x5BB6;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x4F46;&#x8FD8;&#x8981;&#x8BF4;&#x6700;&#x540E;&#x4E00;&#x79CD;&#x5F62;&#x5F0F;&#x3002;&#x7B49;&#x7B49;&#xFF0C;&#x4E0D;&#x662F;&#x8BF4;&#x597D;&#x7684;&#x53EA;&#x6709;&#x56DB;&#x79CD;&#x5F62;&#x5F0F;&#x5417;&#xFF01;&#x7A0D;&#x5B89;&#x52FF;&#x8E81;&#xFF0C;&#x6B63;&#x5E38;&#x5957;&#x8DEF;&#x4E0B;&#x786E;&#x5B9E;&#x53EA;&#x6709;&#x4E0A;&#x9762;&#x56DB;&#x79CD;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E2A;&#x4E1C;&#x897F;&#x522B;&#x5FD8;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x5927;&#x5BB6;&#x6700;&#x559C;&#x6B22;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
var test = () =&gt; {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
<span class="hljs-selector-tag">var</span> test = () =&gt; {
    console.log(this.a)
}
<span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">2</span>,
    test
}
obj.test()</code></pre><p>&#x6765;&#xFF0C;&#x5F80;&#x4E0A;&#x7FFB;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x9526;&#x56CA;&#xFF0C;&#x201C;&#x51FD;&#x6570;<strong>&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF08;&#x5373;&#x8FD0;&#x884C;&#x65F6;&#xFF09;</strong>&#x624D;&#x4F1A;&#x786E;&#x5B9A;&#x8BE5;&#x51FD;&#x6570;&#x5185;this&#x7684;&#x6307;&#x5411;&#x3002;&#x201D;&#x73B0;&#x5728;&#x51FD;&#x6570;&#x8FD9;&#x4E24;&#x4E2A;&#x5B57;&#x8981;&#x52A0;&#x4E2A;&#x8BCD;&#x4FEE;&#x9970;&#x4E00;&#x4E0B;&#xFF0C;&#x53D8;&#x6210;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF08;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF09;&#x624D;&#x80FD;&#x533A;&#x522B;&#x4E8E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3002;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x7684;this&#x5728;<strong>&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x7684;&#x65F6;&#x5019;</strong>&#x5C31;&#x5DF2;&#x7ECF;&#x786E;&#x5B9A;&#xFF0C;&#x5B83;this&#x6307;&#x5411;&#x7684;&#x662F;&#x5B83;&#x7684;&#x5916;&#x5C42;&#x4F5C;&#x7528;&#x57DF;this&#x7684;&#x6307;&#x5411;&#x3002;</p><h3 id="articleHeader6">&#x6700;&#x540E;</h3><p>&#x6211;&#x4EEC;&#x6700;&#x540E;&#x8FD8;&#x8981;&#x8BF4;&#xFF1A;&#x201C;&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x771F;&#x7684;&#x6CA1;&#x6709;&#x4E86;&#x3002;&#x201D;<br>&#x5E0C;&#x671B;&#x770B;&#x5B8C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x6709;&#x4EBA;&#x95EE;this&#x6307;&#x5411;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5634;&#x89D2;&#x5FAE;&#x5FAE;&#x4E0A;&#x626C;&#xFF0C;&#x51B7;&#x7B11;&#x4E00;&#x58F0;&#xFF1A;&#x201C;&#x4E0D;&#x8981;&#x518D;&#x95EE;&#x6211;this&#x7684;&#x6307;&#x5411;&#x95EE;&#x9898;&#x4E86;&#x3002;&#x201D;<br>&#x626C;&#x957F;&#x800C;&#x53BB;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不要再问我this的指向问题了

## 原文链接
[https://segmentfault.com/a/1190000015438195](https://segmentfault.com/a/1190000015438195)


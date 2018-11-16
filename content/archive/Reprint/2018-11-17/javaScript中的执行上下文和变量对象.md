---
title: 'javaScript中的执行上下文和变量对象' 
date: 2018-11-17 2:30:12
hidden: true
slug: u4lcriplrhi
categories: reprint
---

{{< raw >}}
<h2 id="articleHeader0">&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;(Execution Context)</h2><p>&#x6587;&#x7AE0;&#x540C;&#x6B65;&#x5230;github<a href="https://github.com/sunzhaoye/blog/issues/14" rel="nofollow noreferrer" target="_blank"> javaScript&#x4E2D;&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;</a></p><p>JavaScript&#x4EE3;&#x7801;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5305;&#x62EC;&#x7F16;&#x8BD1;&#x548C;&#x6267;&#x884C;&#x4E24;&#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x7F16;&#x8BD1;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#xFF0C;&#x6784;&#x5EFA;&#x62BD;&#x8C61;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF0C;&#x5E76;&#x7F16;&#x8BD1;&#x6210;&#x673A;&#x5668;&#x8BC6;&#x522B;&#x7684;&#x6307;&#x4EE4;&#xFF0C;&#x5728;JavaScript&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x89C4;&#x5219;&#x5C31;&#x5DF2;&#x7ECF;&#x786E;&#x5B9A;&#x4E86;&#xFF1B;&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x9636;&#x6BB5;&#xFF0C;&#x6216;&#x8005;&#x51FD;&#x6570;&#x4E00;&#x65E6;&#x8C03;&#x7528;&#xFF0C;&#x4FBF;&#x4F1A;&#x521B;&#x5EFA;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;(Execution Context)&#xFF0C;&#x4E5F;&#x53EB;&#x6267;&#x884C;&#x73AF;&#x5883;</p><p>&#x5728;ECMA-262&#x4E2D;&#x6709;&#x5982;&#x4E0B;&#x4E00;&#x6BB5;&#x5B9A;&#x4E49;</p><blockquote>&#x5F53;&#x63A7;&#x5236;&#x5668;&#x8F6C;&#x5165; ECMA &#x811A;&#x672C;&#x7684;&#x53EF;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x63A7;&#x5236;&#x5668;&#x4F1A;&#x8FDB;&#x5165;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x3002;&#x5F53;&#x524D;&#x6D3B;&#x52A8;&#x7684;&#x591A;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x5728;&#x903B;&#x8F91;&#x4E0A;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x6808;&#x7ED3;&#x6784;&#x3002;&#x8BE5;&#x903B;&#x8F91;&#x6808;&#x7684;&#x6700;&#x9876;&#x5C42;&#x7684;&#x6267;&#x884C;&#x73AF;&#x5883;&#x79F0;&#x4E3A;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x7684;&#x6267;&#x884C;&#x73AF;&#x5883;&#x3002;&#x4EFB;&#x4F55;&#x65F6;&#x5019;&#xFF0C;&#x5F53;&#x63A7;&#x5236;&#x5668;&#x4ECE;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x7684;&#x6267;&#x884C;&#x73AF;&#x5883;&#x76F8;&#x5173;&#x7684;&#x53EF;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x8F6C;&#x5165;&#x4E0E;&#x8BE5;&#x6267;&#x884C;&#x73AF;&#x5883;&#x65E0;&#x5173;&#x7684;&#x53EF;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6267;&#x884C;&#x73AF;&#x5883;&#x3002;&#x65B0;&#x5EFA;&#x7684;&#x8FD9;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x4F1A;&#x63A8;&#x5165;&#x6808;&#x4E2D;&#xFF0C;&#x6210;&#x4E3A;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x7684;&#x6267;&#x884C;&#x73AF;&#x5883;.</blockquote><p>&#x8FD9;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5728;&#x4E00;&#x6BB5;JavaScript&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x4F1A;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x5B9A;&#x4E49;&#x4E86;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#x6709;&#x6743;&#x8BBF;&#x95EE;&#x7684;&#x5176;&#x4ED6;&#x6570;&#x636E;, ,&#x901A;&#x8FC7;&#x9605;&#x8BFB;&#x89C4;&#x8303;&#x53CA;&#x76F8;&#x5173;&#x6587;&#x6863;&#xFF0C;&#x4E86;&#x89E3;&#x5230;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;(&#x7B80;&#x79F0;EC)&#x4E3B;&#x8981;&#x5305;&#x62EC;&#x4E09;&#x4E2A;&#x70B9;&#xFF0C;&#x7528;&#x4F2A;&#x4EE3;&#x7801;&#x8868;&#x793A;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EC = {
    this: // &#x7ED1;&#x5B9A;this&#x6307;&#x5411;&#x4E3A;&#x5F53;&#x524D;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;, &#x5982;&#x679C;&#x51FD;&#x6570;&#x5C5E;&#x4E8E;&#x5168;&#x5C40;&#x51FD;&#x6570;&#xFF0C;&#x5219;this&#x6307;&#x5411;window
    scopeChain: [] // &#x521B;&#x5EFA;&#x5F53;&#x524D;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;,
    VO: {} // &#x5F53;&#x524D;&#x73AF;&#x5883;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;(Variable Object)&#xFF0C;&#x6BCF;&#x4E2A;&#x73AF;&#x5883;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x4E0E;&#x4E4B;&#x5173;&#x8054;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>EC = {
<span class="hljs-symbol">    this:</span> <span class="hljs-comment">// &#x7ED1;&#x5B9A;this&#x6307;&#x5411;&#x4E3A;&#x5F53;&#x524D;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;, &#x5982;&#x679C;&#x51FD;&#x6570;&#x5C5E;&#x4E8E;&#x5168;&#x5C40;&#x51FD;&#x6570;&#xFF0C;&#x5219;this&#x6307;&#x5411;window</span>
<span class="hljs-symbol">    scopeChain:</span> [] <span class="hljs-comment">// &#x521B;&#x5EFA;&#x5F53;&#x524D;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;,</span>
<span class="hljs-symbol">    VO:</span> {} <span class="hljs-comment">// &#x5F53;&#x524D;&#x73AF;&#x5883;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;(Variable Object)&#xFF0C;&#x6BCF;&#x4E2A;&#x73AF;&#x5883;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x4E0E;&#x4E4B;&#x5173;&#x8054;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;</span>
}</code></pre><p>&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function foo() {
    var b = 2;
    function bar() {
        console.log(b)
    }
    bar()
    console.log(a);
}

foo()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(b)
    }
    bar()
    <span class="hljs-built_in">console</span>.log(a);
}

foo()</code></pre><ul><li>1.&#x6267;&#x884C;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x9996;&#x5148;&#x4F1A;&#x521B;&#x5EFA;&#x5168;&#x5C40;&#x4E0A;&#x4E0B;&#x6587;globleEC&#xFF0C;&#x5E76;&#x63A8;&#x5165;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#xFF1B;</li><li>2.&#x5F53;&#x8C03;&#x7528;foo()&#x65F6;&#x4FBF;&#x4F1A;&#x521B;&#x5EFA;foo&#x7684;&#x4E0A;&#x4E0B;&#x6587;fooEC&#xFF0C;&#x5E76;&#x63A8;&#x5165;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#xFF1B;</li><li>3.&#x5F53;&#x8C03;&#x7528;bar()&#x65F6;&#x4FBF;&#x4F1A;&#x521B;&#x5EFA;bar&#x7684;&#x4E0A;&#x4E0B;&#x6587;barEC&#xFF0C;&#x5E76;&#x63A8;&#x5165;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#xFF1B;</li><li>4.&#x5F53;bar&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#xFF0C;barEC&#x4FBF;&#x4F1A;&#x4ECE;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF1B;</li><li>5.&#x5F53;foo&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#xFF0C;fooEC&#x4FBF;&#x4F1A;&#x4ECE;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF1B;</li><li>6.&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x540E;&#xFF0C;&#x5168;&#x5C40;&#x4E0A;&#x4E0B;&#x6587;globleEC&#x4FBF;&#x4F1A;&#x4ECE;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF1B;</li></ul><p><strong>&#x603B;&#x7ED3;: &#x6808;&#x5E95;&#x6C38;&#x8FDC;&#x90FD;&#x662F;&#x5168;&#x5C40;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x800C;&#x6808;&#x9876;&#x5C31;&#x662F;&#x5F53;&#x524D;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;&#x4E0A;&#x4E0B;&#x6587;</strong></p><p><strong>&#x518D;&#x4E3E;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x7ED3;&#x5408;&#x6D4F;&#x89C8;&#x5668;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x6765;&#x770B;&#x770B;&#x5230;&#x5E95;&#x4EC0;&#x4E48;&#x6267;&#x884C;&#x4E0A;&#x7EBF;&#x6587;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    bar()
    console.log(&apos;foo&apos;)
}

function bar() {
    baz()
    console.log(&apos;bar&apos;)
}

function baz() {
    debugger  // &#x6253;&#x65AD;&#x70B9;&#x89C2;&#x5BDF;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#x7684;&#x60C5;&#x51B5;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    bar()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;foo&apos;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    baz()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;bar&apos;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">debugger</span>  <span class="hljs-comment">// &#x6253;&#x65AD;&#x70B9;&#x89C2;&#x5BDF;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x4E2D;&#x7684;&#x60C5;&#x51B5;</span>
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F53;&#x524D;baz&#x6B63;&#x5728;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x6808;&#x9876;&#x662F;baz&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x800C;&#x6808;&#x5E95;&#x6C38;&#x8FDC;&#x90FD;&#x662F;Global&#x4E0A;&#x4E0B;&#x6587;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016041653?w=2878&amp;h=772" src="https://static.alili.tech/img/remote/1460000016041653?w=2878&amp;h=772" alt="callStack" title="callStack" style="cursor:pointer;display:inline"></span></p><p>&#x7EE7;&#x7EED;&#x6267;&#x884C;&#xFF0C;baz&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x4ECE;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#x9876;&#x5F39;&#x51FA;&#xFF0C;&#x7EE7;&#x7EED;&#x6267;&#x884C;bar&#x51FD;&#x6570;&#x5185;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;bar&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#xFF0C;bar&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x4ECE;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF1B;&#x7136;&#x540E;&#x6267;&#x884C;foo&#x51FD;&#x6570;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;foo&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x540E;&#xFF0C;&#x4ECE;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x4ECE;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF1B;&#x6700;&#x540E;&#x5168;&#x5C40;&#x4E0A;&#x4E0B;&#x6587;&#x4ECE;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x4ECE;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF0C;&#x6E05;&#x7A7A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x4ECE;&#x6808;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016041654" src="https://static.alili.tech/img/remote/1460000016041654" alt="clearCallStack" title="clearCallStack" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x53D8;&#x91CF;&#x5BF9;&#x8C61;(Variable Object):</h2><blockquote>&#x6BCF;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x4E0E;&#x4E4B;&#x5173;&#x8054;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x73AF;&#x5883;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x6240;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x90FD;&#x4FDD;&#x5B58;&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#x3002;&#x867D;&#x7136;&#x6211;&#x4EEC;&#x7F16;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5355;&#x89E3;&#x6790;&#x5668;&#x5728;&#x5904;&#x7406;&#x6570;&#x636E;&#x65F6;&#x4F1A;&#x5728;&#x540E;&#x53F0;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x3002;</blockquote><p>&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x7B2C;&#x4E00;&#x6B21;&#x52A0;&#x8F7D;js&#x811A;&#x672C;&#x7A0B;&#x5E8F;&#x7684;&#x65F6;&#x5019;, &#x9ED8;&#x8BA4;&#x8FDB;&#x5165;&#x5168;&#x5C40;&#x6267;&#x884C;&#x73AF;&#x5883;, &#x6B64;&#x6B21;&#x7684;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x4E3A;window, &#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x3002;</p><p>&#x5982;&#x679C;&#x73AF;&#x5883;&#x662F;&#x51FD;&#x6570;, &#x5219;&#x5C06;&#x6B64;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x505A;&#x4E3A;&#x5F53;&#x524D;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;(VO = AO), &#x6B64;&#x65F6;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x662F;&#x4E0D;&#x53EF;&#x901A;&#x8FC7;&#x4EE3;&#x7801;&#x6765;&#x8BBF;&#x95EE;&#x7684;,&#x4E0B;&#x9762;&#x4E3B;&#x8981;&#x5BF9;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x8BB2;&#x89E3;&#x3002;</p><h2 id="articleHeader2">&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;(Activation Object)</h2><h3 id="articleHeader3">1.&#x521D;&#x59CB;&#x5316;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;(&#x4E0B;&#x6587;&#x7F29;&#x5199;&#x4E3A;AO)</h3><p>&#x5F53;&#x51FD;&#x6570;&#x4E00;&#x8C03;&#x7528;&#xFF0C;&#x7ACB;&#x523B;&#x521B;&#x5EFA;&#x5F53;&#x524D;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;, &#x5E76;&#x5C06;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#xFF0C;&#x901A;&#x8FC7;arguments&#x5C5E;&#x6027;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x503C;&#x4E3A;arguments&#x5BF9;&#x8C61;(&#x4F20;&#x5165;&#x7684;&#x5B9E;&#x53C2;&#x96C6;&#x5408;,&#x4E0E;&#x5F62;&#x53C2;&#x65E0;&#x5173;,&#x5F62;&#x53C2;&#x505A;&#x4E3A;&#x5C40;&#x90E8;&#x73AF;&#x5883;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x88AB;&#x5B9A;&#x4E49;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AO = {
  arguments: &lt;ArgO&gt;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>AO = {
<span class="hljs-symbol">  arguments:</span> <span class="hljs-params">&lt;ArgO&gt;</span>
};</code></pre><p>arguments&#x5BF9;&#x8C61;&#x6709;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;:</p><ul><li><strong>length:</strong> &#x771F;&#x6B63;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;;</li><li><strong>callee:</strong> &#x6307;&#x5411;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;,&#x4E5F;&#x5C31;&#x662F;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;;</li><li><strong>&apos;&#x7C7B;index&apos;:</strong> &#x5B57;&#x7B26;&#x4E32;&#x7C7B;&#x578B;&#x7684;&#x6574;&#x6570;, &#x503C;&#x5C31;&#x662F;arguments&#x5BF9;&#x8C61;&#x4E2D;&#x5BF9;&#x8C61;&#x4E0B;&#x6807;&#x7684;&#x503C;,arguments&#x5BF9;&#x8C61;&#x5E94;&#x548C;&#x6570;&#x7EC4;&#x52A0;&#x4EE5;&#x533A;&#x522B;, &#x5B83;&#x5C31;&#x662F;arguments&#x5BF9;&#x8C61;,&#x53EA;&#x662F;&#x80FD;&#x548C;&#x6570;&#x7EC4;&#x5177;&#x6709;&#x76F8;&#x540C;&#x7684;length&#x5C5E;&#x6027;,&#x548C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0B;&#x6807;&#x6765;&#x8BBF;&#x95EE;&#x503C;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function show (a, b, c) {
    // &#x901A;&#x8FC7;Object.prototype.toString.call()&#x7CBE;&#x51C6;&#x5224;&#x65AD;&#x7C7B;&#x578B;, &#x8BC1;&#x660E;arguments&#x4E0D;&#x540C;&#x4E8E;&#x6570;&#x7EC4;&#x7C7B;&#x578B;
    var arr = [1, 2, 3];
    console.log(Object.prototype.toString.call(arr)); // [object Array]

    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]

    console.log(arguments.length) // 2  &#x4F20;&#x9012;&#x8FDB;&#x6765;&#x5B9E;&#x53C2;&#x7684;&#x4E2A;&#x6570;

    console.log(arguments.callee === show) // true &#x5C31;&#x662F;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;show&#x81EA;&#x8EAB;

    //&#x53C2;&#x6570;&#x5171;&#x4EAB;

    console.log(a === arguments[0]) // true

    a = 15;

    console.log(arguments[0]) // 15

    arguments[0] = 25;

    console.log(a)  // 25;

    &#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x4E8E;&#x6CA1;&#x6709;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x53C2;&#x6570;c, &#x548C;arguments&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x7D22;&#x5F15;&#x662F;&#x4E0D;&#x5171;&#x4EAB;&#x7684;

    c = 25;

    console.log(arguments[2]) // undefined

    argument[2] = 35;

    console.log(c) // 25

}

show(10, 20);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span> (<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-comment">// &#x901A;&#x8FC7;Object.prototype.toString.call()&#x7CBE;&#x51C6;&#x5224;&#x65AD;&#x7C7B;&#x578B;, &#x8BC1;&#x660E;arguments&#x4E0D;&#x540C;&#x4E8E;&#x6570;&#x7EC4;&#x7C7B;&#x578B;</span>
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(arr)); <span class="hljs-comment">// [object Array]</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-built_in">arguments</span>)); <span class="hljs-comment">// [object Arguments]</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.length) <span class="hljs-comment">// 2  &#x4F20;&#x9012;&#x8FDB;&#x6765;&#x5B9E;&#x53C2;&#x7684;&#x4E2A;&#x6570;</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.callee === show) <span class="hljs-comment">// true &#x5C31;&#x662F;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;show&#x81EA;&#x8EAB;</span>

    <span class="hljs-comment">//&#x53C2;&#x6570;&#x5171;&#x4EAB;</span>

    <span class="hljs-built_in">console</span>.log(a === <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]) <span class="hljs-comment">// true</span>

    a = <span class="hljs-number">15</span>;

    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]) <span class="hljs-comment">// 15</span>

    <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] = <span class="hljs-number">25</span>;

    <span class="hljs-built_in">console</span>.log(a)  <span class="hljs-comment">// 25;</span>

    &#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x4E8E;&#x6CA1;&#x6709;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x53C2;&#x6570;c, &#x548C;<span class="hljs-built_in">arguments</span>&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x7D22;&#x5F15;&#x662F;&#x4E0D;&#x5171;&#x4EAB;&#x7684;

    c = <span class="hljs-number">25</span>;

    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]) <span class="hljs-comment">// undefined</span>

    argument[<span class="hljs-number">2</span>] = <span class="hljs-number">35</span>;

    <span class="hljs-built_in">console</span>.log(c) <span class="hljs-comment">// 25</span>

}

show(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>);</code></pre><p>&#x63A5;&#x7740;&#x5F80;&#x4E0B;&#x8D70;,&#x8FD9;&#x624D;&#x662F;&#x5173;&#x952E;&#x7684;&#x5730;&#x65B9;,&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4EE3;&#x7801;&#x88AB;&#x5206;&#x6210;&#x4E24;&#x4E2A;&#x9636;&#x6BB5;&#x6765;&#x5904;&#x7406;&#xFF1A;</p><ol><li>&#x8FDB;&#x5165;&#x6267;&#x884C;&#x73AF;&#x5883;</li><li>&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;</li></ol><h3 id="articleHeader4">2.&#x8FDB;&#x5165;&#x6267;&#x884C;&#x73AF;&#x5883;</h3><p>&#x51FD;&#x6570;&#x5982;&#x679C;&#x88AB;&#x8C03;&#x7528;, &#x8FDB;&#x5165;&#x6267;&#x884C;&#x73AF;&#x5883;(&#x4E0A;&#x4E0B;&#x6587;)&#xFF0C;&#x5E76;&#x7ACB;&#x5373;&#x521B;&#x5EFA;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;, &#x901A;&#x8FC7;arguments&#x5C5E;&#x6027;&#x521D;&#x59CB;&#x5316;, &#x4E0E;&#x6B64;&#x540C;&#x65F6;&#x4F1A;&#x626B;&#x63CF;&#x6267;&#x884C;&#x73AF;&#x5883;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5F62;&#x53C2;&#x3001;&#x6240;&#x6709;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x3001;&#x6240;&#x6709;&#x53D8;&#x91CF;&#x58F0;&#x660E;, &#x6DFB;&#x52A0;&#x5230;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;(AO)&#x4E2D;, &#x5E76;&#x786E;&#x5B9A;this&#x7684;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x4F1A;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x3002;</p><p><strong>&#x5728;&#x8FDB;&#x5165;&#x6267;&#x884C;&#x73AF;&#x5883;&#x8FD9;&#x4E2A;&#x9636;&#x6BB5;:</strong></p><p><strong>&#x6240;&#x6709;&#x5F62;&#x53C2;&#x58F0;&#x660E;:</strong></p><blockquote>&#x5F62;&#x53C2;&#x540D;&#x79F0;&#x4F5C;&#x4E3A;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x88AB;&#x521B;&#x5EFA;, &#x5982;&#x679C;&#x4F20;&#x9012;&#x5B9E;&#x53C2;, &#x503C;&#x5C31;&#x4E3A;&#x5B9E;&#x53C2;&#x503C;, &#x5982;&#x679C;&#x6CA1;&#x6709;&#x4F20;&#x9012;&#x53C2;&#x6570;, &#x503C;&#x5C31;&#x4E3A;undefined</blockquote><p><strong>&#x6240;&#x6709;&#x51FD;&#x6570;&#x58F0;&#x660E;:</strong></p><blockquote>&#x51FD;&#x6570;&#x540D;&#x79F0;&#x4F5C;&#x4E3A;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x6307;&#x9488;&#x5728;&#x5185;&#x5B58;&#x4E2D;, &#x6307;&#x5411;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;,&#x5982;&#x679C;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x76F8;&#x540C;&#x540D;&#x79F0;&#x7684;&#x5C5E;&#x6027;, &#x5219;&#x5B8C;&#x5168;&#x66FF;&#x6362;&#x3002;</blockquote><p><strong>&#x6240;&#x6709;&#x53D8;&#x91CF;&#x58F0;&#x660E;:</strong></p><blockquote>&#x6240;&#x6709;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x4F5C;&#x4E3A;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x88AB;&#x521B;&#x5EFA;, &#x503C;&#x4E3A;undefined,&#x4F46;&#x662F;&#x548C;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x4E0D;&#x540C;&#x7684;&#x662F;, &#x5982;&#x679C;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x8DDF;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x5C5E;&#x6027;(&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x548C;&#x51FD;&#x6570;)&#x76F8;&#x540C;&#x3001;&#x5219;&#x4E0D;&#x4F1A;&#x8986;&#x76D6;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a, b) {
    var c = 10;
    function d() {
        console.log(&apos;d&apos;);
    }
    var e = function () {
        console.log(&apos;e&apos;);
    };
    (function f() {})
    if (true) {
        var g = 20;
    } else {
        var h = 30;
    }
}

foo(10);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">var</span> c = <span class="hljs-number">10</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">d</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;d&apos;</span>);
    }
    <span class="hljs-keyword">var</span> e = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;e&apos;</span>);
    };
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{})
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">var</span> g = <span class="hljs-number">20</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> h = <span class="hljs-number">30</span>;
    }
}

foo(<span class="hljs-number">10</span>);</code></pre><p>&#x6B64;&#x65F6;&#x5728;&#x8FDB;&#x5165;foo&#x51FD;&#x6570;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x65F6;,foo&#x7684;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;fooAO&#x4E3A;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fooAO = {
    arguments: {
        0: 10,
        length: 1
    },
    a: 10,
    b: undefined,
    c: fundefined,
    d: &lt;d reference&gt;  //&#x6307;&#x5411;d&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;,
    e: undefined,
    g: undefined,
    h: undefined  // &#x867D;&#x7136;else&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x6267;&#x884C;,&#x4F46;&#x662F;h&#x4ECD;&#x7136;&#x662F;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5C5E;&#x6027;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>fooAO = {
<span class="hljs-symbol">    arguments:</span> {
        <span class="hljs-number">0</span>: <span class="hljs-number">10</span>,
<span class="hljs-symbol">        length:</span> <span class="hljs-number">1</span>
    },
<span class="hljs-symbol">    a:</span> <span class="hljs-number">10</span>,
<span class="hljs-symbol">    b:</span> undefined,
<span class="hljs-symbol">    c:</span> fundefined,
<span class="hljs-symbol">    d:</span> <span class="hljs-params">&lt;d reference&gt;</span>  <span class="hljs-comment">//&#x6307;&#x5411;d&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;,</span>
<span class="hljs-symbol">    e:</span> undefined,
<span class="hljs-symbol">    g:</span> undefined,
<span class="hljs-symbol">    h:</span> undefined  <span class="hljs-comment">// &#x867D;&#x7136;else&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x6267;&#x884C;,&#x4F46;&#x662F;h&#x4ECD;&#x7136;&#x662F;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5C5E;&#x6027;</span>
}
</code></pre><p><strong>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x505A;&#x5982;&#x4E0B;&#x51E0;&#x70B9;&#x8BF4;&#x660E;:</strong></p><ul><li>1.&#x5173;&#x4E8E;&#x51FD;&#x6570;,&#x53EA;&#x4F1A;&#x521B;&#x5EFA;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x4F5C;&#x4E3A;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;, &#x800C;f&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x5E76;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x5728;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;(AO)&#x4E2D;</li><li>2.e&#x867D;&#x7136;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;, &#x4F46;&#x662F;&#x4F5C;&#x4E3A;&#x53D8;&#x91CF;&#x5C5E;&#x6027;&#x88AB;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x521B;&#x5EFA;</li></ul><h3 id="articleHeader5">3.&#x4EE3;&#x7801;&#x6267;&#x884C;&#x9636;&#x6BB5;</h3><p>&#x5728;&#x8FDB;&#x5165;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x9636;&#x6BB5;&#xFF0C;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x62E5;&#x6709;&#x4E86;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x591A;&#x5C5E;&#x6027;&#x503C;&#x4E3A;undefined, &#x5230;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x9636;&#x6BB5;&#x5C31;&#x5F00;&#x59CB;&#x4E3A;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#x4E86;</p><p><strong>&#x8FD8;&#x662F;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4F8B;&#x5B50;, &#x6B64;&#x65F6;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;&#x5982;&#x4E0B;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fooAO = {
    arguments: {
        0: 10,
        length: 1
    },
    a: 10,
    b: undefined,
    c: 10, // &#x8D4B;&#x503C;&#x4E3A;undefined
    d: &lt;d reference&gt;  //&#x6307;&#x5411;d&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;,
    e: &lt;d reference&gt;  // &#x6307;&#x5411;e&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;
    g: 20,
    h: undefined  // &#x58F0;&#x660E;h&#x53D8;&#x91CF;,&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x8D4B;&#x503C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>fooAO = {
<span class="hljs-symbol">    arguments:</span> {
        <span class="hljs-number">0</span>: <span class="hljs-number">10</span>,
<span class="hljs-symbol">        length:</span> <span class="hljs-number">1</span>
    },
<span class="hljs-symbol">    a:</span> <span class="hljs-number">10</span>,
<span class="hljs-symbol">    b:</span> undefined,
<span class="hljs-symbol">    c:</span> <span class="hljs-number">10</span>, <span class="hljs-comment">// &#x8D4B;&#x503C;&#x4E3A;undefined</span>
<span class="hljs-symbol">    d:</span> <span class="hljs-params">&lt;d reference&gt;</span>  <span class="hljs-comment">//&#x6307;&#x5411;d&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;,</span>
<span class="hljs-symbol">    e:</span> <span class="hljs-params">&lt;d reference&gt;</span>  <span class="hljs-comment">// &#x6307;&#x5411;e&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;</span>
<span class="hljs-symbol">    g:</span> <span class="hljs-number">20</span>,
<span class="hljs-symbol">    h:</span> undefined  <span class="hljs-comment">// &#x58F0;&#x660E;h&#x53D8;&#x91CF;,&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x8D4B;&#x503C;</span>
}</code></pre><p><strong>&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x5305;&#x62EC;:{ arguments&#x5BF9;&#x8C61;+&#x51FD;&#x6570;&#x5F62;&#x53C2;+&#x5185;&#x90E8;&#x53D8;&#x91CF;&#xFF0B;&#x51FD;&#x6570;&#x58F0;&#x660E;(&#x4F46;&#x4E0D;&#x5305;&#x542B;&#x8868;&#x8FBE;&#x5F0F;) }</strong></p><p>&#x8FD9;&#x65F6;&#x8FD9;&#x4E2A;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;, &#x5373;&#x4F5C;&#x4E3A;&#x5F53;&#x524D;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x63A8;&#x5230;&#x6B64;&#x6267;&#x884C;&#x73AF;&#x5883;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x7684;&#x6700;&#x524D;&#x7AEF;(&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x672C;&#x7BC7;&#x4E0D;&#x505A;&#x4ECB;&#x7ECD;&#xFF0C;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x5355;&#x72EC;&#x8BB2;&#x89E3;&#x4F5C;&#x7528;&#x57DF;&#x548C;&#x4F5C;&#x7528;&#x57DF;&#x94FE;), &#x5047;&#x5B9A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;,&#x5219;&#x6574;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x7684;&#x5C5E;&#x6027;&#x5982;&#x4E0B;:</p><p>&#x4F2A;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fooExecutionContext = {
    scopeChain: [], //fooAO +&#x6240;&#x6709;&#x7236;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;,
    fooAO: {
        arguments: {
            0: 10,
            length: 1
        },
        a: 10,
        b: undefined,
        c: 10, // &#x8D4B;&#x503C;&#x4E3A;undefined
        d: &lt;d reference&gt;  //&#x6307;&#x5411;d&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;,
        e: &lt;d reference&gt;  // &#x6307;&#x5411;e&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;
        g: 20,
        h: undefined
    },
    this: &#x5F53;&#x524D;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x6307;&#x9488;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>fooExecutionContext = {
<span class="hljs-symbol">    scopeChain:</span> [], <span class="hljs-comment">//fooAO +&#x6240;&#x6709;&#x7236;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x6D3B;&#x52A8;&#x5BF9;&#x8C61;,</span>
<span class="hljs-symbol">    fooAO:</span> {
<span class="hljs-symbol">        arguments:</span> {
            <span class="hljs-number">0</span>: <span class="hljs-number">10</span>,
<span class="hljs-symbol">            length:</span> <span class="hljs-number">1</span>
        },
<span class="hljs-symbol">        a:</span> <span class="hljs-number">10</span>,
<span class="hljs-symbol">        b:</span> undefined,
<span class="hljs-symbol">        c:</span> <span class="hljs-number">10</span>, <span class="hljs-comment">// &#x8D4B;&#x503C;&#x4E3A;undefined</span>
<span class="hljs-symbol">        d:</span> <span class="hljs-params">&lt;d reference&gt;</span>  <span class="hljs-comment">//&#x6307;&#x5411;d&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;,</span>
<span class="hljs-symbol">        e:</span> <span class="hljs-params">&lt;d reference&gt;</span>  <span class="hljs-comment">// &#x6307;&#x5411;e&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;</span>
<span class="hljs-symbol">        g:</span> <span class="hljs-number">20</span>,
<span class="hljs-symbol">        h:</span> undefined
    },
<span class="hljs-symbol">    this:</span> &#x5F53;&#x524D;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x6307;&#x9488;
}</code></pre><p><strong>&#x8865;&#x5145;:</strong></p><p>&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E3A;&#x4E86;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x987A;&#x5E8F;&#x53CA;&#x53D8;&#x91CF;&#x540C;&#x540D;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x51FD;&#x6570;&#x58F0;&#x660E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(foo); //  foo&#x7684;&#x51FD;&#x6570;&#x4F53;
var foo = 10;
console.log(foo) // 10
function foo() {};
foo = 20;
console.log(foo); // 20
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(foo); <span class="hljs-comment">//  foo&#x7684;&#x51FD;&#x6570;&#x4F53;</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(foo) <span class="hljs-comment">// 10</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{};
foo = <span class="hljs-number">20</span>;
<span class="hljs-built_in">console</span>.log(foo); <span class="hljs-comment">// 20</span>
</code></pre><p>&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x4E4B;&#x524D;, &#x5C31;&#x4F1A;&#x8BFB;&#x53D6;&#x51FD;&#x6570;&#x58F0;&#x660E;,&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x987A;&#x5E8F;&#x5728;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x548C;&#x5F62;&#x53C2;&#x58F0;&#x660E;&#x4E4B;&#x540E;, &#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;:</p><p><strong>1. &#x8FDB;&#x5165;&#x6267;&#x884C;&#x73AF;&#x5883;&#x9636;&#x6BB5;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. var VO = {}
2. VO[foo] = &apos;foo&#x51FD;&#x6570;&#x6307;&#x9488;&apos;
3. &#x626B;&#x63CF;&#x5230;var foo = 10&#xFF0C;

 // &#x4F46;&#x662F;foo&#x505A;&#x4E3A;function&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#xFF0C;&#x6240;&#x4EE5;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x540C;&#x540D;&#x7684;&#x51FD;&#x6570;&#x58F0;&#x660E;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7801;&#x4E2D;&#x6CA1;&#x6709;foo&#x51FD;&#x6570;&#x58F0;&#x660E;&#x7684;&#x8BDD;,&#x5219;foo&#x4E3A;undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-number">1</span>. <span class="hljs-selector-tag">var</span> VO = {}
<span class="hljs-number">2</span>. VO[foo] = <span class="hljs-string">&apos;foo&#x51FD;&#x6570;&#x6307;&#x9488;&apos;</span>
<span class="hljs-number">3</span>. &#x626B;&#x63CF;&#x5230;<span class="hljs-selector-tag">var</span> foo = <span class="hljs-number">10</span>&#xFF0C;

 <span class="hljs-comment">// &#x4F46;&#x662F;foo&#x505A;&#x4E3A;function&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#xFF0C;&#x6240;&#x4EE5;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x540C;&#x540D;&#x7684;&#x51FD;&#x6570;&#x58F0;&#x660E;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7801;&#x4E2D;&#x6CA1;&#x6709;foo&#x51FD;&#x6570;&#x58F0;&#x660E;&#x7684;&#x8BDD;,&#x5219;foo&#x4E3A;undefined</span></code></pre><p><strong>&#x4EE3;&#x7801;&#x6267;&#x884C;&#x9636;&#x6BB5;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. VO[foo] = 10;
2. VO[foo] = 20;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1.</span> VO[foo] = <span class="hljs-number">10</span>;
<span class="hljs-number">2.</span> VO[foo] = <span class="hljs-number">20</span>;</code></pre><p>&#x89E3;&#x6790;&#x4EE3;&#x7801;&#x5B8C;&#x6210;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x7B80;&#x5355;&#x603B;&#x7ED3;&#x4E86;&#x4E0B;&#x5BF9;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x4E3B;&#x8981;&#x5728;&#x4E8E;&#x8BB0;&#x5F55;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x5B66;&#x4E60;&#x6210;&#x679C;&#xFF0C;&#x76EE;&#x524D;&#x6587;&#x7AE0;&#x7684;&#x6C34;&#x5E73;&#x5B9E;&#x5728;&#x4E0D;&#x6562;&#x8C08;&#x5206;&#x4EAB;&#x3002;&#x5982;&#x6709;&#x7406;&#x89E3;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#x8FD8;&#x8BF7;&#x5404;&#x4F4D;&#x5927;&#x795E;&#x591A;&#x591A;&#x6307;&#x6559;,&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x6DF1;&#x53EF;&#x4EE5;&#x53BB;&#x67E5;&#x770B;&#x672C;&#x6587;&#x6700;&#x540E;&#x4E3B;&#x8981;&#x53C2;&#x8003;&#x8D44;&#x6599;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x90FD;&#x662F;&#x7ECF;&#x5178;&#x554A;&#xFF0C;&#x76F8;&#x4FE1;&#x770B;&#x5B8C;&#x4E5F;&#x5C31;&#x7406;&#x89E3;&#x4E86;&#x3002;</p><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x53C2;&#x8003;&#x8D44;&#x6599;:</p><p><a href="https://book.douban.com/subject/10546125/" rel="nofollow noreferrer" target="_blank">JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#xFF08;&#x7B2C;3&#x7248;&#xFF09;</a><br><a href="http://lzw.me/pages/ecmascript/#117" rel="nofollow noreferrer" target="_blank">ECMAScript5.1&#x4E2D;&#x6587;&#x7248;--&#x6267;&#x884C;&#x73AF;&#x5883;</a><br><a href="https://www.jianshu.com/p/a6d37c77e8db" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x57FA;&#x7840;&#x8FDB;&#x9636;&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x8BE6;&#x7EC6;&#x56FE;&#x89E3;</a><br><a href="https://www.jianshu.com/p/330b1505e41d" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x57FA;&#x7840;&#x8FDB;&#x9636;&#xFF08;&#x4E09;&#xFF09;&#xFF1A;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x8BE6;&#x89E3;</a><br><a href="http://www.cnblogs.com/TomXu/archive/2012/01/13/2308101.html" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3;JavaScript&#x7CFB;&#x5217;&#xFF08;11&#xFF09;&#xFF1A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF08;Execution Contexts&#xFF09;</a><br><a href="http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3;JavaScript&#x7CFB;&#x5217;&#xFF08;12&#xFF09;&#xFF1A;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#xFF08;Variable Object&#xFF09;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javaScript中的执行上下文和变量对象

## 原文链接
[https://segmentfault.com/a/1190000015999090](https://segmentfault.com/a/1190000015999090)


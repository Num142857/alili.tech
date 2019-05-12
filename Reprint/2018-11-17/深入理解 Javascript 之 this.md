---
title: '深入理解 Javascript 之 this' 
date: 2018-11-17 14:34:54
hidden: true
slug: lxp3u34hi7a
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x6DF1;&#x5165;&#x6D45;&#x51FA;this&#x7684;&#x7406;&#x89E3;</h1><hr><h2 id="articleHeader1">&#x95EE;&#x9898;&#x7684;&#x7531;&#x6765;</h2><hr><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    foo: function(){}
}

var foo = obj.foo;

// &#x5199;&#x6CD5;&#x4E00;
obj.foo();

// &#x5199;&#x6CD5;&#x4E8C;
foo();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {
    foo: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}
}

<span class="hljs-keyword">var</span> foo = obj.foo;

<span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E00;</span>
obj.foo();

<span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E8C;</span>
foo();</code></pre><p>&#x867D;&#x7136;obj.foo&#x548C;foo&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x53EF;&#x80FD;&#x4E0D;&#x4E00;&#x6837;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    foo: function() {
        conosle.log(this.bar)
    },
    bar: 2
};

var foo = obj.foo;
var bar = 3;

obj.foo(); // 2
foo(); // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {
    foo: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        conosle.log(<span class="hljs-keyword">this</span>.bar)
    },
    bar: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">var</span> foo = obj.foo;
<span class="hljs-keyword">var</span> bar = <span class="hljs-number">3</span>;

obj.foo(); <span class="hljs-comment">// 2</span>
foo(); <span class="hljs-comment">// 3</span></code></pre><p><strong>&#x8FD9;&#x79CD;&#x5DEE;&#x5F02;&#x7684;&#x539F;&#x56E0;&#x5C31;&#x662F;&#x56E0;&#x4E3A;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x4E86;<code>this</code>&#x5173;&#x952E;&#x5B57;&#xFF0C;<code>this</code>&#x6307;&#x5411;&#x7684;&#x662F;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x7684;&#x6240;&#x5728;&#x73AF;&#x5883;&#xFF0C;&#x5BF9;&#x4E8E;<code>obj.foo()</code>&#x6765;&#x8BF4;&#xFF0C;<code>this</code>&#x6267;&#x884C;<code>obj</code>&#xFF0C;&#x5BF9;&#x4E8E;<code>foo()</code>&#x6765;&#x8BF4;&#xFF0C;<code>this</code>&#x6307;&#x5411;<code>window</code>&#x5168;&#x5C40;&#x73AF;&#x5883;</strong></p><h2 id="articleHeader2">this&#x7684;&#x539F;&#x7406;</h2><hr><h3 id="articleHeader3">&#x5185;&#x5B58;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;</h3><p><strong>JavaScript &#x8BED;&#x8A00;&#x4E4B;&#x6240;&#x4EE5;&#x6709;this&#x7684;&#x8BBE;&#x8BA1;&#xFF0C;&#x8DDF;&#x5185;&#x5B58;&#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6709;&#x5173;&#x7CFB;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {foo: 5}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">var</span> obj = {foo: <span class="hljs-number">5</span>}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe6sk?w=459&amp;h=220" src="https://static.alili.tech/img/bVbe6sk?w=459&amp;h=220" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><blockquote>&#x4E5F;&#x5C31;&#x662F;&#x6216;&#x53D8;&#x91CF;obj&#x662F;&#x4E00;&#x4E2A;&#x5730;&#x5740;&#xFF0C;&#x540E;&#x9762;&#x8BFB;&#x53D6;obj.foo&#x5F15;&#x64CE;&#x5148;&#x4ECE;obj&#x62FF;&#x5230;&#x5730;&#x5740;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4ECE;&#x8BE5;&#x5730;&#x5740;&#x8BFB;&#x53D6;&#x539F;&#x59CB;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD4;&#x56DE;&#x5B83;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;</blockquote><p>&#x539F;&#x59CB;&#x7684;&#x5BF9;&#x8C61;&#x4EE5;&#x5B57;&#x5178;&#x7ED3;&#x6784;&#x4FDD;&#x5B58;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x540D;&#x90FD;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x3002;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x7684;foo&#x5C5E;&#x6027;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4EE5;&#x4E0B;&#x9762;&#x7684;&#x5F62;&#x5F0F;&#x4FDD;&#x5B58;&#x7684;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbe6sq?w=761&amp;h=290" src="https://static.alili.tech/img/bVbe6sq?w=761&amp;h=290" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><hr><h3 id="articleHeader4">&#x51FD;&#x6570;</h3><hr><p>&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#x662F;&#x5F88;&#x6E05;&#x6670;&#x7684;&#xFF0C;&#x95EE;&#x9898;&#x5728;&#x4E8E;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { foo: function () {} };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> obj = { foo: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{} };</code></pre><p>&#x8FD9;&#x65F6;&#xFF0C;&#x5F15;&#x64CE;&#x4F1A;&#x5C06;&#x51FD;&#x6570;&#x5355;&#x72EC;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C06;&#x51FD;&#x6570;&#x7684;&#x5730;&#x5740;&#x8D4B;&#x503C;&#x7ED9;foo&#x5C5E;&#x6027;&#x7684;value&#x5C5E;&#x6027;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbe6tp?w=774&amp;h=349" src="https://static.alili.tech/img/bVbe6tp?w=774&amp;h=349" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x7531;&#x4E8E;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#xFF08;&#x4E0A;&#x4E0B;&#x6587;&#xFF09;&#x6267;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = function () {};
var obj = { f: f };

// &#x5355;&#x72EC;&#x6267;&#x884C;
f()

// obj &#x73AF;&#x5883;&#x6267;&#x884C;
obj.f()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
<span class="hljs-keyword">var</span> obj = { f: f };

<span class="hljs-comment">// &#x5355;&#x72EC;&#x6267;&#x884C;</span>
f()

<span class="hljs-comment">// obj &#x73AF;&#x5883;&#x6267;&#x884C;</span>
obj.f()</code></pre><h3 id="articleHeader5">&#x73AF;&#x5883;&#x53D8;&#x91CF;</h3><hr><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = function () {
  console.log(x);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
};</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570;&#x4F53;&#x91CC;&#x9762;&#x4F7F;&#x7528;&#x4E86;&#x53D8;&#x91CF;x&#x3002;&#x8BE5;&#x53D8;&#x91CF;&#x7531;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x63D0;&#x4F9B;&#x3002;</p><p><strong>&#x73B0;&#x5728;&#x95EE;&#x9898;&#x5C31;&#x6765;&#x4E86;&#xFF0C;&#x7531;&#x4E8E;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x6709;&#x4E00;&#x79CD;&#x673A;&#x5236;&#xFF0C;&#x80FD;&#x591F;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;&#x83B7;&#x5F97;&#x5F53;&#x524D;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#xFF08;context&#xFF09;&#x3002;&#x6240;&#x4EE5;&#xFF0C;this&#x5C31;&#x51FA;&#x73B0;&#x4E86;&#xFF0C;&#x5B83;&#x7684;&#x8BBE;&#x8BA1;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;&#xFF0C;&#x6307;&#x4EE3;&#x51FD;&#x6570;&#x5F53;&#x524D;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = function () {
  console.log(this.x);
}

var x = 1;
var obj = {
  f: f,
  x: 2,
};

// &#x5355;&#x72EC;&#x6267;&#x884C;
f() // 1

// obj &#x73AF;&#x5883;&#x6267;&#x884C;
obj.f() // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
}

<span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">f</span>: f,
  <span class="hljs-attr">x</span>: <span class="hljs-number">2</span>,
};

<span class="hljs-comment">// &#x5355;&#x72EC;&#x6267;&#x884C;</span>
f() <span class="hljs-comment">// 1</span>

<span class="hljs-comment">// obj &#x73AF;&#x5883;&#x6267;&#x884C;</span>
obj.f() <span class="hljs-comment">// 2</span></code></pre><p>&#x5728;obj&#x73AF;&#x5883;&#x6267;&#x884C;&#xFF0C;this.x&#x6307;&#x5411;obj.x&#x3002;<br>&#x51FD;&#x6570;f&#x5728;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x6267;&#x884C;&#xFF0C;this.x&#x6307;&#x5411;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x7684;x&#x3002;</p><p><strong>&#x56DE;&#x5230;&#x6211;&#x4EEC;&#x6700;&#x521D;&#x7684;&#x95EE;&#x9898; <code>obj.foo()</code>&#x662F;&#x901A;&#x8FC7;obj&#x627E;&#x5230;foo&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x662F;&#x5728;<code>obj</code>&#x73AF;&#x5883;&#x6267;&#x884C;&#x3002;&#x4E00;&#x65E6;<code>var foo = obj.foo</code>&#xFF0C;&#x53D8;&#x91CF;<code>foo</code>&#x5C31;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#xFF0C;&#x6240;&#x4EE5;<code>foo()</code>&#x5C31;&#x53D8;&#x6210;&#x5728;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x6267;&#x884C;&#x3002;</strong></p><p><a href="http://www.ruanyifeng.com/blog/2018/06/javascript-this.html" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684; this&#x539F;&#x7406;</a></p><hr><h2 id="articleHeader6">&#x7EE7;&#x7EED;&#x6211;&#x4EEC;&#x7684;this</h2><p><strong>this&#x5728;js&#x4E2D;&#x4E00;&#x76F4;&#x662F;&#x8C1C;&#x4E00;&#x6837;&#x7684;&#x5B58;&#x5728;&#x7740;&#xFF0C;&#x5728;&#x9762;&#x8BD5;&#x4E2D;&#x4E5F;&#x662F;&#x7ECF;&#x5E38;&#x4F1A;&#x88AB;&#x95EE;&#x9053;</strong></p><p><strong>this&#x7684;&#x6307;&#x5411;&#x5728;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x662F;&#x51B3;&#x5B9A;&#x4E0D;&#x4E86;&#x7684;&#xFF0C;&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x51B3;&#x5B9A;</strong></p><ul><li><strong>&#x5168;&#x5C40;&#x8303;&#x56F4;&#x5185;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this;    //&#x5728;&#x5168;&#x5C40;&#x8303;&#x56F4;&#x5185;&#x4F7F;&#x7528;`this`&#xFF0C;&#x5B83;&#x5C06;&#x4F1A;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;

var name=&quot;zhoulujun&quot;;

function say(){
    console.log(this.name)
}
say(); //zhoulujun" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>;    <span class="hljs-comment">//&#x5728;&#x5168;&#x5C40;&#x8303;&#x56F4;&#x5185;&#x4F7F;&#x7528;`this`&#xFF0C;&#x5B83;&#x5C06;&#x4F1A;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;</span>

<span class="hljs-keyword">var</span> name=<span class="hljs-string">&quot;zhoulujun&quot;</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
say(); <span class="hljs-comment">//zhoulujun</span></code></pre><p>&#x5F53;&#x6267;&#x884C; say&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C; JavaScript &#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; Execute context &#xFF08;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF09;&#xFF0C;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x5C31;&#x5305;&#x542B;&#x4E86; say&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x671F;&#x6240;&#x9700;&#x8981;&#x7684;&#x6240;&#x6709;&#x4FE1;&#x606F;&#x3002; Execute context &#x4E5F;&#x6709;&#x81EA;&#x5DF1;&#x7684; Scope chain, &#x5F53;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x65F6;&#xFF0C; JavaScript &#x5F15;&#x64CE;&#x4F1A;&#x9996;&#x5148;&#x4ECE;&#x7528; say&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x6765;&#x521D;&#x59CB;&#x5316;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x3002;</p><ul><li><strong>&#x51FD;&#x6570;&#x8C03;&#x7528;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();    //this&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code style="word-break:break-word;white-space:initial">foo<span class="hljs-comment">()</span>;    <span class="hljs-comment">//this&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;</span></code></pre><ul><li><em>&#x65B9;&#x6CD5;&#x8C03;&#x7528;</em>*</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test.foo();    //this&#x6307;&#x5411;test&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code style="word-break:break-word;white-space:initial">test.foo<span class="hljs-comment">()</span>;    <span class="hljs-comment">//this&#x6307;&#x5411;test&#x5BF9;&#x8C61;</span></code></pre><ul><li><em>&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</em>*</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new foo();    //&#x51FD;&#x6570;&#x4E0E;new&#x4E00;&#x5757;&#x4F7F;&#x7528;&#x5373;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;this&#x6307;&#x5411;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">new</span> foo();    <span class="hljs-regexp">//</span>&#x51FD;&#x6570;&#x4E0E;<span class="hljs-keyword">new</span>&#x4E00;&#x5757;&#x4F7F;&#x7528;&#x5373;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;<span class="hljs-keyword">this</span>&#x6307;&#x5411;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;</code></pre><ul><li><em>&#x663E;&#x5F0F;&#x7684;&#x8BBE;&#x7F6E;this</em>*</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a, b, c) {}
var bar = {};
foo.apply(bar, [1, 2, 3]);    //this&#x88AB;&#x8BBE;&#x7F6E;&#x6210;bar
foo.call(bar, 1, 2, 3);       //this&#x88AB;&#x8BBE;&#x7F6E;&#x6210;bar" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>function foo(a, b, c) {}
var bar = {};
foo.apply(bar, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);    <span class="hljs-comment">//this&#x88AB;&#x8BBE;&#x7F6E;&#x6210;bar</span>
foo.call(bar, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);       <span class="hljs-comment">//this&#x88AB;&#x8BBE;&#x7F6E;&#x6210;bar</span></code></pre><hr><h3 id="articleHeader7">&#x4ECE;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7406;&#x89E3;this</h3><p><strong>&#x5B9E;&#x4F8B;1</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myObj3={
        site:&quot;zhoulujun.cn&quot;,
        andy:{
            site:&quot;www.zhoulujun.cn&quot;,
            fn:function(){
                console.log(this)
                console.log(this.site)
            }
        }
    };
var site=&quot;111&quot;;
var fn=myObj3.andy.fn;
fn();  // &#x8FD9;&#x91CC;&#x7684;&#x8C03;&#x7528;&#x73AF;&#x5883;&#x662F;window


// Window&#xA0;{postMessage: &#x192;, blur: &#x192;, focus: &#x192;, close: &#x192;, frames: Window,&#xA0;&#x2026;}
// 111" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>myObj3={
        site:<span class="hljs-string">&quot;zhoulujun.cn&quot;</span>,
        andy:{
            site:<span class="hljs-string">&quot;www.zhoulujun.cn&quot;</span>,
            <span class="hljs-function"><span class="hljs-keyword">fn</span>:function<span class="hljs-params">()</span>{
                console.<span class="hljs-built_in">log</span><span class="hljs-params">(this)</span>
                console.<span class="hljs-built_in">log</span><span class="hljs-params">(this.site)</span>
            }
        }
    }</span>;
var site=<span class="hljs-string">&quot;111&quot;</span>;
var <span class="hljs-function"><span class="hljs-keyword">fn</span>=myObj3.andy.<span class="hljs-keyword">fn</span></span>;
<span class="hljs-function"><span class="hljs-keyword">fn</span><span class="hljs-params">()</span></span>;  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;&#x8C03;&#x7528;&#x73AF;&#x5883;&#x662F;window</span>


<span class="hljs-comment">// Window&#xA0;{postMessage: &#x192;, blur: &#x192;, focus: &#x192;, close: &#x192;, frames: Window,&#xA0;&#x2026;}</span>
<span class="hljs-comment">// 111</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe6LJ?w=672&amp;h=319" src="https://static.alili.tech/img/bVbe6LJ?w=672&amp;h=319" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>&#x5B9E;&#x4F8B;2</strong></p><ul><li>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x6709;this&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5C3D;&#x7BA1;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x662F;&#x88AB;&#x6700;&#x5916;&#x5C42;&#x7684;&#x5BF9;&#x8C61;&#x6240;&#x8C03;&#x7528;&#xFF0C;this&#x6307;&#x5411;&#x7684;&#x4E5F;&#x53EA;&#x662F;&#x5B83;&#x4E0A;&#x4E00;&#x7EA7;&#x7684;&#x5BF9;&#x8C61;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myObj3={
    site:&quot;zhoulujun.cn&quot;,
    andy:{
        site:&quot;www.zhoulujun.cn&quot;,
        fn:function(){
            console.log(this)
            console.log(this.site)
        }
    }
};
var site=&quot;111&quot;;
myObj3.andy.fn();


VM51:6 {site: &quot;www.zhoulujun.cn&quot;, fn: &#x192;}
VM51:7 www.zhoulujun.cn" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>myObj3={
    <span class="hljs-attr">site</span>:<span class="hljs-string">&quot;zhoulujun.cn&quot;</span>,
    <span class="hljs-attr">andy</span>:{
        <span class="hljs-attr">site</span>:<span class="hljs-string">&quot;www.zhoulujun.cn&quot;</span>,
        <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.site)
        }
    }
};
<span class="hljs-keyword">var</span> site=<span class="hljs-string">&quot;111&quot;</span>;
myObj3.andy.fn();


VM51:<span class="hljs-number">6</span> {<span class="hljs-attr">site</span>: <span class="hljs-string">&quot;www.zhoulujun.cn&quot;</span>, <span class="hljs-attr">fn</span>: &#x192;}
VM51:<span class="hljs-number">7</span> www.zhoulujun.cn</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe6LK?w=468&amp;h=281" src="https://static.alili.tech/img/bVbe6LK?w=468&amp;h=281" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>&#x5B9E;&#x4F8B;3</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById( &apos;div1&apos; ).onclick = function(){
    console.log( this.id );// &#x8F93;&#x51FA;: div1
    var func = function(){ 
        console.log ( this.id );// &#x8F93;&#x51FA;: undefined
    } 
    func();
}; 
//&#x4FEE;&#x6B63;&#x540E;
document.getElementById( &apos;div1&apos; ).onclick = function(){
    var func = function(){ 
        console.log ( this.id );// &#x8F93;&#x51FA;: div1
    } 
    func.call(this);
}; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">&apos;div1&apos;</span> ).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.id );<span class="hljs-comment">// &#x8F93;&#x51FA;: div1</span>
    <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
        <span class="hljs-built_in">console</span>.log ( <span class="hljs-keyword">this</span>.id );<span class="hljs-comment">// &#x8F93;&#x51FA;: undefined</span>
    } 
    func();
}; 
<span class="hljs-comment">//&#x4FEE;&#x6B63;&#x540E;</span>
<span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">&apos;div1&apos;</span> ).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
        <span class="hljs-built_in">console</span>.log ( <span class="hljs-keyword">this</span>.id );<span class="hljs-comment">// &#x8F93;&#x51FA;: div1</span>
    } 
    func.call(<span class="hljs-keyword">this</span>);
}; </code></pre><p><strong>&#x5B9E;&#x4F8B;4</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var A = function( name ){ 
    this.name = name;
};
var B = function(){ 
    A.apply(this,arguments);
};
B.prototype.getName = function(){ 
    return this.name;
};
var b=new B(&apos;sven&apos;);
console.log( b.getName() ); // &#x8F93;&#x51FA;:  &apos;sven&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> A = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> name </span>)</span>{ 
    <span class="hljs-keyword">this</span>.name = name;
};
<span class="hljs-keyword">var</span> B = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    A.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
};
B.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
};
<span class="hljs-keyword">var</span> b=<span class="hljs-keyword">new</span> B(<span class="hljs-string">&apos;sven&apos;</span>);
<span class="hljs-built_in">console</span>.log( b.getName() ); <span class="hljs-comment">// &#x8F93;&#x51FA;:  &apos;sven&apos;</span></code></pre><p><strong>&#x5B9E;&#x4F8B;5</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    console.log( this.a );
}</span>

<span class="hljs-title">var</span> <span class="hljs-title">obj1</span> = <span class="hljs-comment">{
    a: 2,
    foo: foo
}</span>;</span>

<span class="hljs-keyword">var</span> obj2 = <span class="hljs-comment">{
    a: 3,
    foo: foo
}</span>;

obj1.foo(); <span class="hljs-comment">// 2</span>
obj2.foo(); <span class="hljs-comment">// 3</span>

obj1.foo.call( obj2 ); <span class="hljs-comment">// 3</span>
obj2.foo.call( obj1 ); <span class="hljs-comment">// 2</span></code></pre><h2 id="articleHeader8">apply&#x3001;call</h2><p><strong>&#x56E0;&#x4E3A;apply&#x3001;call&#x5B58;&#x5728;&#x4E8E;Function.prototype&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x6709;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</strong></p><blockquote>call</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x51FD;&#x6570;&#x540D;.call(&#x5BF9;&#x8C61;,arg1....argn)
//&#x529F;&#x80FD;&#xFF1A;
    //1.&#x8C03;&#x7528;&#x51FD;&#x6570;
    //2.&#x5C06;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;this&#x6307;&#x5411;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x5BF9;&#x8C61;
    //3.&#x5C06;&#x7B2C;&#x4E8C;&#x4E2A;&#x53CA;&#x4EE5;&#x540E;&#x6240;&#x6709;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4F5C;&#x4E3A;&#x5B9E;&#x53C2;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>&#x51FD;&#x6570;&#x540D;.call(&#x5BF9;&#x8C61;,arg1....argn)
<span class="hljs-comment">//&#x529F;&#x80FD;&#xFF1A;</span>
    <span class="hljs-comment">//1.&#x8C03;&#x7528;&#x51FD;&#x6570;</span>
    <span class="hljs-comment">//2.&#x5C06;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;this&#x6307;&#x5411;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x5BF9;&#x8C61;</span>
    <span class="hljs-comment">//3.&#x5C06;&#x7B2C;&#x4E8C;&#x4E2A;&#x53CA;&#x4EE5;&#x540E;&#x6240;&#x6709;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4F5C;&#x4E3A;&#x5B9E;&#x53C2;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;</span></code></pre><blockquote>apply&#x4E3B;&#x8981;&#x7528;&#x9014;&#x662F;&#x76F4;&#x63A5;&#x7528;&#x6570;&#x7EC4;&#x4F20;&#x53C2;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x51FD;&#x6570;&#x540D;.apply(&#x5BF9;&#x8C61;, &#x6570;&#x7EC4;/&#x4F2A;&#x6570;&#x7EC4;);
//&#x529F;&#x80FD;&#xFF1A;
    //1.&#x8C03;&#x7528;&#x51FD;&#x6570;
    //2.&#x5C06;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;this&#x6307;&#x5411;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x5BF9;&#x8C61;
    //3.&#x5C06;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x4F2A;&#x6570;&#x7EC4;&#xFF09;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x62C6;&#x89E3;&#x5F00;&#x4F9D;&#x6B21;&#x7684;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x5B9E;&#x53C2;
//&#x6848;&#x4F8B;&#x6C42;&#x6570;&#x7EC4;&#x4E2D;&#x6700;&#x5927;&#x503C;
var a=Math.max.apply( null, [ 1, 2, 5, 3, 4 ] );
console.log(a);// &#x8F93;&#x51FA;:5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x51FD;&#x6570;&#x540D;.apply(&#x5BF9;&#x8C61;, &#x6570;&#x7EC4;/&#x4F2A;&#x6570;&#x7EC4;);
<span class="hljs-comment">//&#x529F;&#x80FD;&#xFF1A;</span>
    <span class="hljs-comment">//1.&#x8C03;&#x7528;&#x51FD;&#x6570;</span>
    <span class="hljs-comment">//2.&#x5C06;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;this&#x6307;&#x5411;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x5BF9;&#x8C61;</span>
    <span class="hljs-comment">//3.&#x5C06;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x4F2A;&#x6570;&#x7EC4;&#xFF09;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x62C6;&#x89E3;&#x5F00;&#x4F9D;&#x6B21;&#x7684;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x5B9E;&#x53C2;</span>
<span class="hljs-comment">//&#x6848;&#x4F8B;&#x6C42;&#x6570;&#x7EC4;&#x4E2D;&#x6700;&#x5927;&#x503C;</span>
var a=Math.max.apply( null, [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ] );
console.log(a);<span class="hljs-comment">// &#x8F93;&#x51FA;:5</span></code></pre><p><strong>call&#x5E94;&#x7528;(&#x5C06;&#x4F2A;&#x6570;&#x7EC4;&#x8F6C;&#x4E3A;&#x6570;&#x7EC4;)</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrayLike = {0: &apos;name&apos;, 1: &apos;age&apos;, 2: &apos;sex&apos;, length: 3 }
Array.prototype.join.call(arrayLike, &apos;&amp;&apos;); // name&amp;age&amp;sex
Array.prototype.slice.call(arrayLike, 0); // [&quot;name&quot;, &quot;age&quot;, &quot;sex&quot;] 
// slice&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x7C7B;&#x6570;&#x7EC4;&#x8F6C;&#x6570;&#x7EC4;
Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
}); 
// [&quot;NAME&quot;, &quot;AGE&quot;, &quot;SEX&quot;]


console.log(
    Object.prototype.toString.call(num),
    Object.prototype.toString.call(str),
    Object.prototype.toString.call(bool),
    Object.prototype.toString.call(arr),
    Object.prototype.toString.call(json),
    Object.prototype.toString.call(func),
    Object.prototype.toString.call(und),
    Object.prototype.toString.call(nul),
    Object.prototype.toString.call(date),
    Object.prototype.toString.call(reg),
    Object.prototype.toString.call(error)
);
// &apos;[object Number]&apos; &apos;[object String]&apos; &apos;[object Boolean]&apos; &apos;[object Array]&apos; &apos;[object Object]&apos;
// &apos;[object Function]&apos; &apos;[object Undefined]&apos; &apos;[object Null]&apos; &apos;[object Date]&apos; &apos;[object RegExp]&apos; &apos;[object Error]&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-title">var</span> arrayLike = {<span class="hljs-number">0</span>: &apos;name&apos;, <span class="hljs-number">1</span>: &apos;age&apos;, <span class="hljs-number">2</span>: &apos;sex&apos;, length: <span class="hljs-number">3</span> }
<span class="hljs-type">Array</span>.proto<span class="hljs-keyword">type</span>.join.call(arrayLike, &apos;&amp;&apos;); // name&amp;age&amp;sex
<span class="hljs-type">Array</span>.proto<span class="hljs-keyword">type</span>.slice.call(arrayLike, 0); // [&quot;name&quot;, &quot;age&quot;, &quot;sex&quot;] 
// slice&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x7C7B;&#x6570;&#x7EC4;&#x8F6C;&#x6570;&#x7EC4;
<span class="hljs-type">Array</span>.proto<span class="hljs-keyword">type</span>.map.call(arrayLike, function(item){
    return item.toUpperCase();
}); 
// [<span class="hljs-string">&quot;NAME&quot;</span>, <span class="hljs-string">&quot;AGE&quot;</span>, <span class="hljs-string">&quot;SEX&quot;</span>]


<span class="hljs-title">console</span>.log(
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(num),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(str),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(bool),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(arr),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(json),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(func),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(und),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(nul),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(date),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(reg),
    <span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(error)
);
// &apos;[object <span class="hljs-type">Number</span>]&apos; &apos;[object <span class="hljs-type">String</span>]&apos; &apos;[object <span class="hljs-type">Boolean</span>]&apos; &apos;[object <span class="hljs-type">Array</span>]&apos; &apos;[object <span class="hljs-type">Object</span>]&apos;
// &apos;[object <span class="hljs-type">Function</span>]&apos; &apos;[object <span class="hljs-type">Undefined</span>]&apos; &apos;[object <span class="hljs-type">Null</span>]&apos; &apos;[object <span class="hljs-type">Date</span>]&apos; &apos;[object <span class="hljs-type">RegExp</span>]&apos; &apos;[object <span class="hljs-type">Error</span>]&apos;</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 this

## 原文链接
[https://segmentfault.com/a/1190000015955936](https://segmentfault.com/a/1190000015955936)


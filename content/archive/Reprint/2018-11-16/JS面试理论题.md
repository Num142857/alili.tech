---
title: 'JS面试理论题' 
date: 2018-11-16 2:30:06
hidden: true
slug: kuarhdceuz
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x53D8;&#x91CF;&#x7C7B;&#x578B;&#x548C;&#x8BA1;&#x7B97;</h1><h2 id="articleHeader1">&#x503C;&#x7C7B;&#x578B;&amp;&amp;&#x5F15;&#x7528;&#x7C7B;&#x578B;</h2><p>1.&#x503C;&#x7C7B;&#x578B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 100
var b = a
a = 200
console.log(b)//100" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">100</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = <span class="hljs-selector-tag">a</span>
<span class="hljs-selector-tag">a</span> = <span class="hljs-number">200</span>
console.log(b)<span class="hljs-comment">//100</span></code></pre><p>2.&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x5BF9;&#x8C61; &#x6570;&#x7EC4; &#x51FD;&#x6570;&#xFF09;</p><p>&#x65E0;&#x9650;&#x5236;&#x6269;&#x5C55;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {age:20}
var b = a
b.age = 21
console.log(a.age)//21" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = {age:<span class="hljs-number">20</span>}
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = <span class="hljs-selector-tag">a</span>
<span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.age</span> = <span class="hljs-number">21</span>
console.log(<span class="hljs-selector-tag">a</span>.age)<span class="hljs-comment">//21</span></code></pre><h2 id="articleHeader2">typeof&#x8FD0;&#x7B97;&#x7B26;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof undefined //undefined
typeof &apos;abc&apos;//string
typeof 123//number
typeof true//boolean

//&#x5212;&#x91CD;&#x70B9;
typeof {}//object
typeof null//object
typeof console.log//function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span> <span class="hljs-comment">//undefined</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-string">&apos;abc&apos;</span><span class="hljs-comment">//string</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-number">123</span><span class="hljs-comment">//number</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">true</span><span class="hljs-comment">//boolean</span>

<span class="hljs-comment">//&#x5212;&#x91CD;&#x70B9;</span>
<span class="hljs-keyword">typeof</span> {}<span class="hljs-comment">//object</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span><span class="hljs-comment">//object</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span>.log<span class="hljs-comment">//function</span></code></pre><h2 id="articleHeader3">&#x5F3A;&#x5236;&#x7C7B;&#x578B;&#x8F6C;&#x6362;</h2><p>&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&apos;&apos;||&apos;abc&apos;)//&apos;abc&apos;
console.log(!window.abc)//true

//&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x4F1A;&#x88AB;&#x5F53;&#x505A;true&#x8FD8;&#x662F;false
var a = 100
console.log(!!a)//true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&apos;</span>||<span class="hljs-string">&apos;abc&apos;</span>)<span class="hljs-regexp">//</span><span class="hljs-string">&apos;abc&apos;</span>
<span class="hljs-built_in">console</span>.log(!<span class="hljs-built_in">window</span>.abc)<span class="hljs-regexp">//</span><span class="hljs-literal">true</span>

<span class="hljs-regexp">//</span>&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x4F1A;&#x88AB;&#x5F53;&#x505A;<span class="hljs-literal">true</span>&#x8FD8;&#x662F;<span class="hljs-literal">false</span>
var a = <span class="hljs-number">100</span>
<span class="hljs-built_in">console</span>.log(!!a)<span class="hljs-regexp">//</span><span class="hljs-literal">true</span>
</code></pre><h2 id="articleHeader4">JS&#x4E2D;&#x7684;&#x5185;&#x7F6E;&#x51FD;&#x6570;</h2><p>Object<br>Array<br>Boolean<br>Number<br>String<br>Function<br>Date<br>RegExp<br>Error</p><h2 id="articleHeader5">&#x539F;&#x578B;&#x548C;&#x539F;&#x578B;&#x94FE;</h2><p><strong>1.&#x6784;&#x9020;&#x51FD;&#x6570;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x793A;&#x4F8B;
function Foo(name,age){
    this.name = name;
    this.age = age;
    this.class = &apos;class-1&apos;
    //return this
}
var f = new Foo(&apos;zwt&apos;,21);//&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">//&#x793A;&#x4F8B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span><span class="hljs-params">(name,age)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.class = <span class="hljs-string">&apos;class-1&apos;</span>
    <span class="hljs-comment">//return this</span>
}
<span class="hljs-keyword">var</span> f = <span class="hljs-keyword">new</span> Foo(<span class="hljs-string">&apos;zwt&apos;</span>,<span class="hljs-number">21</span>);<span class="hljs-comment">//&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x5BF9;&#x8C61;</span></code></pre><p><strong>2.&#x6784;&#x9020;&#x51FD;&#x6570;--&#x6269;&#x5C55;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.var a = {} &#x5176;&#x5B9E;&#x662F; var a = new Object()&#x7684;&#x8BED;&#x6CD5;&#x7CD6;
2.var a = [] &#x5176;&#x5B9E;&#x662F;var a = new Array()&#x7684;&#x8BED;&#x6CD5;&#x7CD6;
3.function Foo(){...}&#x5176;&#x5B9E;&#x662F; var Foo = new Function(...)
4.&#x4F7F;&#x7528;instanceof&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x662F;&#x5426;&#x662F;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-number">1</span><span class="hljs-selector-class">.var</span> <span class="hljs-selector-tag">a</span> = {} &#x5176;&#x5B9E;&#x662F; <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = new Object()&#x7684;&#x8BED;&#x6CD5;&#x7CD6;
<span class="hljs-number">2</span><span class="hljs-selector-class">.var</span> <span class="hljs-selector-tag">a</span> = [] &#x5176;&#x5B9E;&#x662F;<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = new Array()&#x7684;&#x8BED;&#x6CD5;&#x7CD6;
<span class="hljs-number">3</span><span class="hljs-selector-class">.function</span> Foo(){...}&#x5176;&#x5B9E;&#x662F; <span class="hljs-selector-tag">var</span> Foo = new Function(...)
<span class="hljs-number">4</span>.&#x4F7F;&#x7528;instanceof&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x662F;&#x5426;&#x662F;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
</code></pre><h2 id="articleHeader6">&#x539F;&#x578B;&#x89C4;&#x5219;&#x548C;&#x793A;&#x4F8B;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x6240;&#x6709;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x6570;&#x7EC4; &#x5BF9;&#x8C61; &#x51FD;&#x6570;&#xFF09;&#x90FD;&#x5177;&#x6709;&#x5BF9;&#x8C61;&#x7279;&#x6027;&#xFF0C;&#x65E2;&#x53EF;&#x81EA;&#x7531;&#x6269;&#x5C55;&#x5C5E;&#x6027;&#xFF08;&#x9664;nul&#x5916;&#xFF09;
2.&#x6240;&#x6709;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x6570;&#x7EC4; &#x5BF9;&#x8C61; &#x51FD;&#x6570;&#xFF09;&#x90FD;&#x6709;&#x4E00;&#x4E2A;_proto_&#xFF08;&#x9690;&#x5F0F;&#x539F;&#x578B;&#xFF09;&#x5C5E;&#x6027;&#xFF0C;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x5BF9;&#x8C61;
3.&#x6240;&#x6709;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x6709;&#x4E00;&#x4E2A;prototype&#xFF08;&#x663E;&#x793A;&#x539F;&#x578B;&#xFF09;&#x5C5E;&#x6027;&#xFF0C;&#x5C5E;&#x6027;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x5BF9;&#x8C61;
4.&#x6240;&#x6709;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x6570;&#x7EC4; &#x5BF9;&#x8C61; &#x51FD;&#x6570;&#xFF09;&#xFF0C;_protp_&#x5C5E;&#x6027;&#x90FD;&#x6307;&#x5411;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x2018;prototype
5.&#x5F53;&#x8BD5;&#x56FE;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x53BB;&#x627E;&#x5B83;&#x7684;_proto_(&#x5373;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;prototype)&#x4E2D;&#x5BFB;&#x627E;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-number">1.</span>&#x6240;&#x6709;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x6570;&#x7EC4; &#x5BF9;&#x8C61; &#x51FD;&#x6570;&#xFF09;&#x90FD;&#x5177;&#x6709;&#x5BF9;&#x8C61;&#x7279;&#x6027;&#xFF0C;&#x65E2;&#x53EF;&#x81EA;&#x7531;&#x6269;&#x5C55;&#x5C5E;&#x6027;&#xFF08;&#x9664;nul&#x5916;&#xFF09;
<span class="hljs-number">2.</span>&#x6240;&#x6709;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x6570;&#x7EC4; &#x5BF9;&#x8C61; &#x51FD;&#x6570;&#xFF09;&#x90FD;&#x6709;&#x4E00;&#x4E2A;_proto_&#xFF08;&#x9690;&#x5F0F;&#x539F;&#x578B;&#xFF09;&#x5C5E;&#x6027;&#xFF0C;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x5BF9;&#x8C61;
<span class="hljs-number">3.</span>&#x6240;&#x6709;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x6709;&#x4E00;&#x4E2A;proto<span class="hljs-keyword">type</span>&#xFF08;&#x663E;&#x793A;&#x539F;&#x578B;&#xFF09;&#x5C5E;&#x6027;&#xFF0C;&#x5C5E;&#x6027;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x5BF9;&#x8C61;
<span class="hljs-number">4.</span>&#x6240;&#x6709;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF08;&#x6570;&#x7EC4; &#x5BF9;&#x8C61; &#x51FD;&#x6570;&#xFF09;&#xFF0C;_protp_&#x5C5E;&#x6027;&#x90FD;&#x6307;&#x5411;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x2018;proto<span class="hljs-keyword">type</span>
<span class="hljs-number">5.</span>&#x5F53;&#x8BD5;&#x56FE;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x53BB;&#x627E;&#x5B83;&#x7684;_proto_(&#x5373;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;proto<span class="hljs-keyword">type</span>)&#x4E2D;&#x5BFB;&#x627E;&#x3002;
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
    obj.a = 20;
    alert(obj.__proto__ === Object.prototype)//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>var <span class="hljs-attr">obj</span> = {};
    obj.<span class="hljs-attr">a</span> = <span class="hljs-number">20</span>;
    alert(obj.<span class="hljs-attr">__proto__</span> === Object.prototype)//<span class="hljs-literal">true</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f.toString()//&#x8981;&#x53BB;f._proto_._proto_&#x4E2D;&#x67E5;&#x627E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">f</span><span class="hljs-selector-class">.toString</span>()<span class="hljs-comment">//&#x8981;&#x53BB;f._proto_._proto_&#x4E2D;&#x67E5;&#x627E;</span></code></pre><p>&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x5B57;&#x9762;&#x91CF;
var o1 = {name:&#x2019;o1&#x2019;};
Var o11 = new Object({name:&#x2019;o11})

2.&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;
Var m = function(){this.name=&#x2018;o2&#x2019;}
Var o2 = new m()

3.Object.create
Var P = {name:&#x2019;o3&#x2019;}
Var  o3=Object.create(P)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-number">1.</span>&#x5B57;&#x9762;&#x91CF;
<span class="hljs-keyword">var</span> o1 = {name:&#x2019;o1&#x2019;};
<span class="hljs-keyword">Var</span> o11 = <span class="hljs-keyword">new</span> Object({name:&#x2019;o11})

<span class="hljs-number">2.</span>&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;
<span class="hljs-keyword">Var</span> m = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{this.name=&#x2018;o2&#x2019;}
<span class="hljs-keyword">Var</span> o2 = <span class="hljs-keyword">new</span> m()

<span class="hljs-number">3.</span>Object.create
<span class="hljs-keyword">Var</span> P = {name:&#x2019;o3&#x2019;}
<span class="hljs-keyword">Var</span>  o3=Object.create(P)
</code></pre><p>&#x539F;&#x578B;&#x3001;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3001;&#x5B9E;&#x4F8B;&#x3001;&#x539F;&#x578B;&#x94FE;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbfsPa?w=1572&amp;h=740" src="https://static.alili.tech/img/bVbfsPa?w=1572&amp;h=740" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>instanceof&#x7684;&#x539F;&#x7406;&#xFF1A;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbfsPn?w=1650&amp;h=592" src="https://static.alili.tech/img/bVbfsPn?w=1650&amp;h=592" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader7">New&#x8FD0;&#x7B97;&#x7B26;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x88AB;&#x521B;&#x5EFA; &#x5B83;&#x7EE7;&#x627F;&#x81EA;foo.prototype
2.&#x6784;&#x9020;&#x51FD;&#x6570;foo&#x88AB;&#x6267;&#x884C;&#x3002;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F8;&#x5E94;&#x7684;&#x4F20;&#x53C2;&#x4F1A;&#x88AB;&#x4F20;&#x5165;&#xFF0C;&#x540C;&#x65F6;&#x4E0A;&#x4E0B;&#x6587;&#xFF08;this&#xFF09;&#x4F1A;&#x88AB;&#x6307;&#x5B9A;&#x4E3A;&#x8FD9;&#x4E2A;&#x65B0;&#x7684;&#x5B9E;&#x4F8B;&#x3002;new foo&#x7B49;&#x540C;&#x4E8E;new foo&#xFF08;&#xFF09; &#xFF0C;&#x53EA;&#x80FD;&#x7528;&#x5728;&#x4E0D;&#x4F20;&#x9012;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;
3.&#x5982;&#x679C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x2018;&#x5BF9;&#x8C61;&#x2019;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4F1A;&#x53D6;&#x4EE3;&#x6574;&#x4E2A;new&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x3002;&#x5982;&#x679C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;new&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x4E3A;&#x6B65;&#x9AA4;1&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-number">1.</span>&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x88AB;&#x521B;&#x5EFA; &#x5B83;&#x7EE7;&#x627F;&#x81EA;foo.prototype
<span class="hljs-number">2.</span>&#x6784;&#x9020;&#x51FD;&#x6570;foo&#x88AB;&#x6267;&#x884C;&#x3002;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F8;&#x5E94;&#x7684;&#x4F20;&#x53C2;&#x4F1A;&#x88AB;&#x4F20;&#x5165;&#xFF0C;&#x540C;&#x65F6;&#x4E0A;&#x4E0B;&#x6587;&#xFF08;<span class="hljs-built_in">this</span>&#xFF09;&#x4F1A;&#x88AB;&#x6307;&#x5B9A;&#x4E3A;&#x8FD9;&#x4E2A;&#x65B0;&#x7684;&#x5B9E;&#x4F8B;&#x3002;<span class="hljs-keyword">new</span> <span class="hljs-type">foo</span>&#x7B49;&#x540C;&#x4E8E;<span class="hljs-keyword">new</span> <span class="hljs-type">foo</span>&#xFF08;&#xFF09; &#xFF0C;&#x53EA;&#x80FD;&#x7528;&#x5728;&#x4E0D;&#x4F20;&#x9012;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;
<span class="hljs-number">3.</span>&#x5982;&#x679C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x2018;&#x5BF9;&#x8C61;&#x2019;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4F1A;&#x53D6;&#x4EE3;&#x6574;&#x4E2A;<span class="hljs-keyword">new</span><span class="hljs-type"></span>&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x3002;&#x5982;&#x679C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;<span class="hljs-keyword">new</span><span class="hljs-type"></span>&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x4E3A;&#x6B65;&#x9AA4;<span class="hljs-number">1</span>&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;</code></pre><h2 id="articleHeader8">&#x539F;&#x578B;&#x94FE;&#x4F8B;&#x5B50;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    function Elem(id) {
        this.elem = document.getElementById(id)
    }
    Elem.prototype.html = function (val) {
        var elem = this.elem
        if(val){
            elem.innerHTML = val;
            return this//&#x94FE;&#x5F0F;&#x64CD;&#x4F5C;
        }else{
            return elem.innerHTML
        }
    }

    var div1 = new Elem(&apos;divl&apos;)
    
    Elem.prototype.on = function (type,fn) {
        var elem = this.elem
        elem.addEventListener(type,fn);
    }
    div1.html(&apos;&lt;p&gt;hello&lt;/p&gt;&apos;)
    div1.on(&apos;click&apos;,function () {
        alert(&apos;click&apos;)
    })

    console.log(div1.html())
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Elem</span>(<span class="hljs-params">id</span>) </span>{
        <span class="hljs-keyword">this</span>.elem = <span class="hljs-built_in">document</span>.getElementById(id)
    }
    Elem.prototype.html = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
        <span class="hljs-keyword">var</span> elem = <span class="hljs-keyword">this</span>.elem
        <span class="hljs-keyword">if</span>(val){
            elem.innerHTML = val;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span><span class="hljs-comment">//&#x94FE;&#x5F0F;&#x64CD;&#x4F5C;</span>
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> elem.innerHTML
        }
    }

    <span class="hljs-keyword">var</span> div1 = <span class="hljs-keyword">new</span> Elem(<span class="hljs-string">&apos;divl&apos;</span>)
    
    Elem.prototype.on = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type,fn</span>) </span>{
        <span class="hljs-keyword">var</span> elem = <span class="hljs-keyword">this</span>.elem
        elem.addEventListener(type,fn);
    }
    div1.html(<span class="hljs-string">&apos;&lt;p&gt;hello&lt;/p&gt;&apos;</span>)
    div1.on(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">&apos;click&apos;</span>)
    })

    <span class="hljs-built_in">console</span>.log(div1.html())
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><h1 id="articleHeader9">&#x95ED;&#x5305;&#x77E5;&#x8BC6;&#x70B9;</h1><p>&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbfsPQ?w=908&amp;h=560" src="https://static.alili.tech/img/bVbfsPQ?w=908&amp;h=560" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>This&#xFF1A;&#x8981;&#x5728;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x786E;&#x8BA4;&#x503C;&#xFF0C;&#x5B9A;&#x4E49;&#x7684;&#x65F6;&#x5019;&#x65E0;&#x6CD5;&#x786E;&#x8BA4;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbfsPZ?w=1186&amp;h=662" src="https://static.alili.tech/img/bVbfsPZ?w=1186&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbfsP0?w=1936&amp;h=950" src="https://static.alili.tech/img/bVbfsP0?w=1936&amp;h=950" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader10">DOM&#x4E8B;&#x4EF6;</h1><h2 id="articleHeader11">DOM&#x4E8B;&#x4EF6;&#x7EA7;&#x522B;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dom0 element.onclick = function(){}
Dom2 element.addEventListener(&#x2018;click&#x2019;,function(){},false)&#x5192;&#x6CE1;/&#x6355;&#x83B7;
Dom3 element.addEventListener(&#x2018;keyup&#x2019;,function(){},false)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>Dom0 element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}
Dom2 element.addEventListener(&#x2018;click&#x2019;,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{},<span class="hljs-literal">false</span>)&#x5192;&#x6CE1;/&#x6355;&#x83B7;
Dom3 element.addEventListener(&#x2018;keyup&#x2019;,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{},<span class="hljs-literal">false</span>)
</code></pre><p>Dom&#x4E8B;&#x4EF6;&#x6A21;&#x578B;&#xFF08;&#x5192;&#x6CE1; &#x6355;&#x83B7;&#xFF09;</p><h2 id="articleHeader12">Dom&#x4E8B;&#x4EF6;&#x6D41;</h2><p>&#x6D4F;&#x89C8;&#x5668;&#x4E3A;&#x9875;&#x9762;&#x505A;&#x4EA4;&#x4E92;&#x7684;&#x8FC7;&#x7A0B; &#x4E8B;&#x4EF6;&#x6D41;&#x2014;&#x6355;&#x83B7;&#x2014;&gt;&#x76EE;&#x6807;&#x9636;&#x6BB5;&#xFF08;&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF09;&#x2014;&gt;&#x5192;&#x6CE1;<br>&#x63CF;&#x8FF0;dom&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x7684;&#x5177;&#x4F53;&#x6D41;&#x7A0B;&#xFF08;window&#x2014;&gt;document&#x2014;&gt;html(document.documentElement)&#x2014;&gt;body&#x2014;&gt;&#x2026;&#x2014;&gt;&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF09;<br>Event&#x5BF9;&#x8C61;&#x7684;&#x5E38;&#x89C1;&#x5E94;&#x7528;&#xFF1A;<br>Event.preventDefault()&#xFF1A;&#x963B;&#x6B62;&#x9ED8;&#x8BA4;&#x4E8B;&#x4EF6;(&#x5982;&#x963B;&#x6B62;a&#x6807;&#x7B7E;&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#x7684;&#x884C;&#x4E3A;)<br>Event.stopPropagation()&#xFF1A;&#x963B;&#x6B62;&#x5192;&#x6CE1;&#x884C;&#x4E3A;&#xFF08;&#x8BA9;&#x5B50;&#x5143;&#x7D20;&#x4E0E;&#x7236;&#x5143;&#x7D20;&#x7684;&#x54CD;&#x5E94;&#x5206;&#x79BB;&#xFF09;<br>Event.stopImmendiateProoagation()&#xFF1A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#x7ED1;&#x5B9A;&#x591A;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x6309;&#x4F18;&#x5148;&#x7EA7;&#x53EF;&#x53D6;&#x6D88;&#x540E;&#x9762;&#x54CD;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x6267;&#x884C;<br>Event.currentTarget&#xFF1A;&#x4E8B;&#x4EF6;&#x59D4;&#x6258; &#x5F53;&#x524D;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x5143;&#x7D20; &#x5F53;&#x524D;&#x88AB;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;<br>Event.target:</p><h2 id="articleHeader13">&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var eve = new Event(&#x2018;custome&#x2019;)
ev.addEventListener(&#x2018;custome&#x2019;,function(){
    console.log(&#x2018;custome&#x2019;)
});
ev.dispatchEvent(eve);//&#x89E6;&#x53D1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> eve = <span class="hljs-keyword">new</span> Event(&#x2018;custome&#x2019;)
ev.addEventListener(&#x2018;custome&#x2019;,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(&#x2018;custome&#x2019;)
});
ev.dispatchEvent(eve);<span class="hljs-comment">//&#x89E6;&#x53D1;</span></code></pre><h1 id="articleHeader14">HTTP&#x534F;&#x8BAE;&#x7C7B;</h1><h2 id="articleHeader15">HTTP&#x534F;&#x8BAE;&#x7684;&#x4E3B;&#x8981;&#x7279;&#x70B9;</h2><p>&#x7B80;&#x5355;&#x5FEB;&#x901F;&#xFF08;&#x6BCF;&#x4E2A;&#x8D44;&#x6E90;uri&#xFF0C;&#x56FA;&#x5B9A;&#xFF1B;&#x53EA;&#x8981;&#x8F93;&#x5165;uri&#x5C31;&#x80FD;&#x627E;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x8D44;&#x6E90;&#xFF09; &#x7075;&#x6D3B;&#xFF08;&#x5728;http&#x534F;&#x8BAE;&#x4E2D;&#xFF0C;&#x5934;&#x90E8;&#x5206;&#x6709;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;http&#x534F;&#x8BAE;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x4E0D;&#x540C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x534F;&#x8BAE;&#xFF09; &#x65E0;&#x8FDE;&#x63A5;&#xFF08;&#x8FDE;&#x63A5;&#x4E00;&#x6B21;&#x5C31;&#x4F1A;&#x65AD;&#x5F00;&#xFF09; &#x65E0;&#x72B6;&#x6001;&#xFF08;&#x5BA2;&#x6237;&#x7AEF;&#x3001;&#x670D;&#x52A1;&#x7AEF;&#x5206;&#x5F00;&#xFF1B;http&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#xFF1B;&#x65E0;&#x6CD5;&#x8BB0;&#x5F55;&#x72B6;&#x6001; &#x4E0D;&#x80FD;&#x533A;&#x5206;&#x4E24;&#x6B21;&#x8FDE;&#x63A5;&#xFF09;</p><h2 id="articleHeader16">HTTP&#x62A5;&#x6587;&#x7684;&#x7EC4;&#x6210;&#x90E8;&#x5206;</h2><p>&#x8BF7;&#x6C42;&#x62A5;&#x6587;&#xFF08;&#x8BF7;&#x6C42;&#x884C;[http&#x65B9;&#x6CD5;&#x3001;&#x534F;&#x8BAE;&#x3001;&#x7248;&#x672C; &#x9875;&#x9762;&#x4ECB;&#x8D28;] &#x8BF7;&#x6C42;&#x5934;[key vaule&#x2014;&gt;&#x544A;&#x8BC9;&#x670D;&#x52A1;&#x7AEF;&#x9700;&#x8981;&#x7684;&#x5185;&#x5BB9;] &#x7A7A;&#x884C;[&#x544A;&#x8BC9;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x4E0B;&#x4E00;&#x4E2A;&#x662F;&#x8BF7;&#x6C42;&#x4F53; &#x4E0D;&#x518D;&#x662F;&#x8BF7;&#x6C42;&#x5934;] &#x8BF7;&#x6C42;&#x4F53;&#xFF09; &#x54CD;&#x5E94;&#x62A5;&#x6587;&#xFF08;&#x72B6;&#x6001;&#x884C; &#x54CD;&#x5E94;&#x5934; &#x7A7A;&#x884C; &#x54CD;&#x5E94;&#x4F53;&#xFF09;</p><h2 id="articleHeader17">HTTP&#x65B9;&#x6CD5;</h2><p>Get&#x83B7;&#x53D6;&#x8D44;&#x6E90; post&#x4F20;&#x8F93;&#x8D44;&#x6E90; put&#x66F4;&#x65B0;&#x8D44;&#x6E90; delete&#x5220;&#x9664;&#x8D44;&#x6E90; head&#x83B7;&#x53D6;&#x62A5;&#x6587;</p><h2 id="articleHeader18">POST&#x548C;GET&#x7684;&#x533A;&#x522B;</h2><p>Get&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x56DE;&#x9000;&#x65F6;&#x662F;&#x65E0;&#x5BB3;&#x7684;&#xFF0C;&#x800C;post&#x4F1A;&#x518D;&#x6B21;&#x63D0;&#x4EA4;&#x8BF7;&#x6C42;<br>Get&#x4EA7;&#x751F;&#x7684;url&#x5730;&#x5740;&#x53EF;&#x4EE5;&#x88AB;&#x6536;&#x85CF; &#x800C;post&#x4E0D;&#x53EF;&#x4EE5;<br>Get&#x8BF7;&#x6C42;&#x4F1A;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x4E3B;&#x52A8;&#x7F13;&#x5B58; &#x800C;post&#x4E0D;&#x4F1A;&#xFF0C;&#x9664;&#x975E;&#x624B;&#x52A8;&#x8BBE;&#x7F6E;<br>Get&#x8BF7;&#x6C42;&#x53EA;&#x80FD;&#x8FDB;&#x884C;rul&#x7F16;&#x7801;&#xFF0C;&#x800C;post&#x652F;&#x6301;&#x591A;&#x79CD;&#x7F16;&#x7801;&#x65B9;&#x5F0F;<br>Get&#x8BF7;&#x6C42;&#x5728;url&#x4E2D;&#x4F20;&#x9001;&#x7684;&#x53C2;&#x6570;&#x662F;&#x6709;&#x957F;&#x5EA6;&#x9650;&#x5236;&#x7684;&#xFF0C;&#x800C;post&#x6CA1;&#x6709;&#x9650;&#x5236;<br>Get&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4F1A;&#x88AB;&#x5B8C;&#x6574;&#x4FDD;&#x7559;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x4E2D;&#xFF0C;&#x800C;post&#x4E2D;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x4F1A;&#x88AB;&#x4FDD;&#x7559;<br>&#x5BF9;&#x53C2;&#x6570;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;get&#x53EA;&#x63A5;&#x53D7;ascll&#x5B57;&#x7B26;&#xFF0C;&#x800C;post&#x6CA1;&#x6709;&#x9650;&#x5236;<br>Get&#x6BD4;post&#x66F4;&#x4E0D;&#x5B89;&#x5168; &#x56E0;&#x4E3A;&#x53C2;&#x6570;&#x76F4;&#x63A5;&#x66B4;&#x9732;&#x5728;url&#x4E0A;&#xFF0C;&#x6240;&#x6709;&#x4E0D;&#x80FD;&#x7528;&#x6765;&#x4F20;&#x9012;&#x654F;&#x611F;&#x4FE1;&#x606F;<br>get&#x53C2;&#x6570;&#x901A;&#x8FC7;url&#x4F20;&#x9012;&#xFF0C;post&#x653E;&#x5728;request body&#x4E2D;</p><h2 id="articleHeader19">HTTP&#x72B6;&#x6001;&#x7801;</h2><p>1xx&#xFF1A;&#x6307;&#x793A;&#x4FE1;&#x606F;-&#x8868;&#x793A;&#x8BF7;&#x6C42;&#x5DF2;&#x63A5;&#x6536;&#xFF0C;&#x7EE7;&#x7EED;&#x5904;&#x7406;<br>2xx&#xFF1A;&#x6210;&#x529F;-&#x8868;&#x793A;&#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x88AB;&#x6210;&#x529F;&#x63A5;&#x6536;<br>3xx&#xFF1A;&#x91CD;&#x5B9A;&#x5411;-&#x8981;&#x5B8C;&#x6210;&#x8BF7;&#x6C42;&#x5FC5;&#x987B;&#x8FDB;&#x884C;&#x66F4;&#x8FDB;&#x4E00;&#x6B65;&#x7684;&#x64CD;&#x4F5C;<br>4xx&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x9519;&#x8BEF;-&#x8BF7;&#x6C42;&#x6709;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#x6216;&#x8BF7;&#x6C42;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;<br>5xx&#xFF1A;&#x670D;&#x52A1;&#x5668;&#x9519;&#x8BEF;-&#x670D;&#x52A1;&#x5668;&#x672A;&#x80FD;&#x5B9E;&#x73B0;&#x5408;&#x6CD5;&#x7684;&#x8BF7;&#x6C42;</p><p>200 0K&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x6210;&#x529F;<br>206&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x4E86;&#x4E00;&#x4E2A;&#x5E26;&#x6709;range&#x5934;&#x7684;get&#x8BF7;&#x6C42;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x5B8C;&#x6210;&#x4E86;&#x5B83;&#xFF08;&#x6BD4;&#x5982;video&#x64AD;&#x653E;&#x89C6;&#x9891;&#xFF09;<br>301&#xFF1A;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x7684;&#x9875;&#x9762;&#x5DF2;&#x7ECF;&#x8F6C;&#x79FB;&#x81F3;&#x65B0;&#x7684;url &#x6C38;&#x4E45;&#x6027;&#x91CD;&#x5B9A;&#x5411;<br>302&#xFF1A;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x7684;&#x9875;&#x9762;&#x5DF2;&#x7ECF;&#x4E34;&#x65F6;&#x8F6C;&#x79FB;&#x81F3;&#x65B0;&#x7684;url<br>304&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x6709;&#x7F13;&#x51B2;&#x7684;&#x6587;&#x6863;&#x5E76;&#x53D1;&#x51FA;&#x4E86;&#x4E00;&#x4E2A;&#x6761;&#x4EF6;&#x6027;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x544A;&#x8BC9;&#x5BA2;&#x6237;&#x6CA1;&#x539F;&#x6765;&#x7F13;&#x51B2;&#x7684;&#x6587;&#x6863;&#x8FD8;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x4F7F;&#x7528;</p><p>400&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x6709;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#xFF0C;&#x4E0D;&#x80FD;&#x88AB;&#x670D;&#x52A1;&#x5668;&#x6240;&#x7406;&#x89E3;<br>401&#xFF1A;&#x8BF7;&#x6C42;&#x672A;&#x7ECF;&#x6388;&#x6743;&#xFF0C;&#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x4EE3;&#x7801;&#x5FC5;&#x987B;&#x548C;www-authenticate&#x62A5;&#x5934;&#x57DF;&#x4E00;&#x8D77;&#x4F7F;&#x7528;<br>403&#xFF1A;&#x5BF9;&#x88AB;&#x8BF7;&#x6C42;&#x9875;&#x9762;&#x7684;&#x8BBF;&#x95EE;&#x88AB;&#x7981;&#x6B62;<br>404&#xFF1A;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;&#x4E0D;&#x5B58;&#x5728;<br>500&#xFF1A;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x751F;&#x4E0D;&#x53EF;&#x9884;&#x671F;&#x7684;&#x9519;&#x8BEF; &#x539F;&#x6765;&#x7F13;&#x51B2;&#x7684;&#x6587;&#x6863;&#x8FD8;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x4F7F;&#x7528;<br>503&#xFF1A;&#x8BF7;&#x6C42;&#x672A;&#x5B8C;&#x6210;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x4E34;&#x65F6;&#x8FC7;&#x8F7D;&#x6216;&#x5F53;&#x673A;&#xFF0C;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x53EF;&#x80FD;&#x6062;&#x590D;&#x6B63;&#x5E38;</p><h2 id="articleHeader20">&#x6301;&#x4E45;&#x8FDE;&#x63A5;</h2><p>http&#x534F;&#x8BAE;&#x91C7;&#x7528;&#x2018;&#x8BF7;&#x6C42;-&#x5E94;&#x7B54;&#x2019;&#x6A21;&#x5F0F;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x666E;&#x901A;&#x6A21;&#x5F0F;&#xFF0C;&#x5373;&#x975E;keep-alive&#xFF08;&#x6301;&#x4E45;&#x8FDE;&#x63A5;&#xFF09;&#x6A21;&#x5F0F;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x3001;&#x5E94;&#x7B54;&#x5BA2;&#x6237;&#x548C;&#x670D;&#x52A1;&#x5668;&#x90FD;&#x8981;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#xFF0C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x7ACB;&#x523B;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;&#xFF08;http&#x534F;&#x8BAE;&#x4E3A;&#x65E0;&#x8FDE;&#x63A5;&#x7684;&#x534F;&#x8BAE;&#xFF09;<br>&#x5F53;&#x4F7F;&#x7528;keep-alive&#x6A21;&#x5F0F;&#xFF08;&#x6301;&#x4E45;&#x8FDE;&#x63A5; &#x8FDE;&#x63A5;&#x91CD;&#x7528;&#xFF09;&#x65F6;&#xFF0C;keep-alive&#x529F;&#x80FD;&#x4F7F;&#x5BA2;&#x6237;&#x7AEF;&#x5230;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x8FDE;&#x63A5;&#x6301;&#x7EED;&#x6709;&#x6548;&#xFF0C;&#x5F53;&#x51FA;&#x73B0;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x540E;&#x7EED;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;keep-alive&#x529F;&#x80FD;&#x907F;&#x514D;&#x4E86;&#x5EFA;&#x7ACB;&#x6216;&#x8005;&#x91CD;&#x65B0;&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;</p><h2 id="articleHeader21">&#x7BA1;&#x7EBF;&#x5316;</h2><p>&#x5728;&#x4F7F;&#x7528;&#x6301;&#x4E45;&#x8FDE;&#x63A5;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x67D0;&#x4E2A;&#x8FDE;&#x63A5;&#x4E0A;&#x6D88;&#x606F;&#x7684;&#x4F20;&#x9012;&#x7C7B;&#x4F3C;&#x4E8E;&#xFF1A;(&#x8FDE;&#x63A5;&#x65E0;&#x4E2D;&#x65AD;)&#x8BF7;&#x6C42;1-&gt;&#x54CD;&#x5E94;1-&gt;&#x8BF7;&#x6C42;2-&gt;&#x54CD;&#x5E94;2-&gt;&#x8BF7;&#x6C42;3-&gt;&#x54CD;&#x5E94;3<br>&#x67D0;&#x4E2A;&#x8FDE;&#x63A5;&#x4E0A;&#x7684;&#x6D88;&#x606F;&#x53D8;&#x6210;&#x4E86;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#xFF1A;&#xFF08;&#x7BA1;&#x7EBF;&#x5316;&#xFF09;<br>&#x8BF7;&#x6C42;1-&gt;&#x8BF7;&#x6C42;2-&gt;&#x8BF7;&#x6C42;3-&gt;&#x54CD;&#x5E94;1-&gt;&#x54CD;&#x5E94;2-&gt;&#x54CD;&#x5E94;3</p><p>&#x7BA1;&#x7EBF;&#x5316;&#x673A;&#x5236;&#x901A;&#x8FC7;&#x6301;&#x4E45;&#x8FDE;&#x63A5;&#x5B8C;&#x6210;&#xFF0C;&#x4EC5;HTTP/1.1&#x652F;&#x6301;&#x6B64;&#x6280;&#x672F;<br>&#x53EA;&#x6709;get&#x548C;head&#x8BF7;&#x6C42;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x7BA1;&#x7EBF;&#x5316;&#xFF0C;&#x800C;post&#x5219;&#x6709;&#x6240;&#x9650;&#x5236;<br>&#x9664;&#x6B64;&#x521B;&#x5EFA;&#x8FDE;&#x63A5;&#x65F6;&#x4E0D;&#x5E94;&#x542F;&#x52A8;&#x7BA1;&#x7EBF;&#x673A;&#x5236;&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x65B9;&#xFF08;&#x670D;&#x52A1;&#x5668;&#xFF09;&#x4E0D;&#x4E00;&#x5B9A;&#x652F;&#x6301;http/1.1&#x7248;&#x672C;&#x7684;&#x534F;&#x8BAE;<br>&#x7BA1;&#x7EBF;&#x5316;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x54CD;&#x5E94;&#x5230;&#x6765;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x5982;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6240;&#x793A;&#xFF0C;&#x54CD;&#x5E94;&#x8FD4;&#x56DE;&#x7684;&#x987A;&#x5E8F;&#x5E76;&#x672A;&#x6539;&#x53D8;<br>http/1.1&#x8981;&#x6C42;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x652F;&#x6301;&#x7BA1;&#x7EBF;&#x5316;&#xFF0C;&#x4F46;&#x5E76;&#x4E0D;&#x8981;&#x6C42;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4E5F;&#x5BF9;&#x54CD;&#x5E94;&#x8FDB;&#x884C;&#x7BA1;&#x7EBF;&#x5316;&#x5904;&#x7406;&#xFF0C;&#x53EA;&#x662F;&#x8981;&#x6C42;&#x5BF9;&#x7BA1;&#x7EBF;&#x5316;&#x7684;&#x8BF7;&#x6C42;&#x4E0D;&#x5931;&#x8D25;&#x5373;&#x53EF;<br>&#x7531;&#x4E8E;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5F00;&#x542F;&#x7BA1;&#x7EBF;&#x5316;&#x5F88;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x4F1A;&#x5E26;&#x6765;&#x5927;&#x5E45;&#x5EA6;&#x7684;&#x6027;&#x80FD;&#x63D0;&#x5347;&#xFF0C;&#x800C;&#x4E14;&#x5F88;&#x591A;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x548C;&#x4EE3;&#x7406;&#x7A0B;&#x5E8F;&#x5BF9;&#x7BA1;&#x7EBF;&#x5316;&#x7684;&#x652F;&#x6301;&#x5E76;&#x4E0D;&#x597D;&#xFF0C;&#x56E0;&#x6B64;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x5982;chrome&#x548C;firefox&#x9ED8;&#x8BA4;&#x5E76;&#x672A;&#x5F00;&#x542F;&#x7BA1;&#x7EBF;&#x5316;&#x652F;&#x6301;</p><h1 id="articleHeader22">&#x4E8B;&#x4EF6;</h1><p>Ie&#x4F4E;&#x7248;&#x672C;&#x4F7F;&#x7528;attachEvent&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6; &#x548C;w3c&#x6807;&#x51C6;&#x4E0D;&#x4E00;&#x6837;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbfsP1?w=1992&amp;h=688" src="https://static.alili.tech/img/bVbfsP1?w=1992&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x83B7;&#x5F97; body &#x5143;&#x7D20;&#x7684;&#x8282;&#x70B9;&#x540D;&#x79F0;&#xFF1A;<br>document.body.nodeName;</p><h2 id="articleHeader23">&#x901A;&#x7528;&#x7684;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//selector&#x5B58;&#x653E;&#x9009;&#x62E9;&#x5668;&#xFF08;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x65F6;&#x7528;&#xFF09;
    function bindEvent(elem,type,selector,fn) {
        if(fn == null){
            fn = selector;
            selector = null;
        }
        /*
        * element.matches(String selector);
        * &#x5728;SELECTORS API Level 2&#x89C4;&#x8303;&#x4E2D;&#xFF0C;&#x4E3A;DOM&#x8282;&#x70B9;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;
        * &#x4E3B;&#x8981;&#x662F;&#x7528;&#x6765;&#x5224;&#x65AD;&#x5F53;&#x524D;DOM&#x8282;&#x70B9;&#x4E0D;&#x5426;&#x80FD;&#x5B8C;&#x5168;&#x5339;&#x914D;&#x5BF9;&#x5E94;&#x7684;CSS&#x9009;&#x62E9;&#x5668;&#x89C4;&#x5219;&#xFF1B;
        * &#x5982;&#x679C;&#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x53CD;&#x4E4B;&#x5219;&#x8FD4;&#x56DE;false&#x3002;
        * */
        elem.addEventListener(type,function (e) {
            var target;
            if(selector){
                target = e.target;
                if(target.matches(selector)){
                    fn.call(target,e)
                }
            }else{
                fn(e)
            }
        })
    }
    //&#x4F7F;&#x7528;&#x4EE3;&#x7406;
    var div1 = document.getElementById(&apos;div1&apos;);
    bindEvent(div1,&apos;click&apos;,&apos;a&apos;,function (e) {
        console.log(this.innerHTML);
    })

    //&#x4E0D;&#x4F7F;&#x7528;&#x4EE3;&#x7406; [&#x4EE3;&#x7801;&#x7B80;&#x6D01; &#x51CF;&#x5C11;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5185;&#x5B58;&#x5360;&#x7528;]
    var a = document.getElementById(&apos;a1&apos;);
    bindEvent(div1,&apos;click&apos;,function (e) {
        console.log(a.innerHTML);
    })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//selector&#x5B58;&#x653E;&#x9009;&#x62E9;&#x5668;&#xFF08;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x65F6;&#x7528;&#xFF09;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindEvent</span>(<span class="hljs-params">elem,type,selector,fn</span>) </span>{
        <span class="hljs-keyword">if</span>(fn == <span class="hljs-literal">null</span>){
            fn = selector;
            selector = <span class="hljs-literal">null</span>;
        }
        <span class="hljs-comment">/*
        * element.matches(String selector);
        * &#x5728;SELECTORS API Level 2&#x89C4;&#x8303;&#x4E2D;&#xFF0C;&#x4E3A;DOM&#x8282;&#x70B9;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;
        * &#x4E3B;&#x8981;&#x662F;&#x7528;&#x6765;&#x5224;&#x65AD;&#x5F53;&#x524D;DOM&#x8282;&#x70B9;&#x4E0D;&#x5426;&#x80FD;&#x5B8C;&#x5168;&#x5339;&#x914D;&#x5BF9;&#x5E94;&#x7684;CSS&#x9009;&#x62E9;&#x5668;&#x89C4;&#x5219;&#xFF1B;
        * &#x5982;&#x679C;&#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x53CD;&#x4E4B;&#x5219;&#x8FD4;&#x56DE;false&#x3002;
        * */</span>
        elem.addEventListener(type,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> target;
            <span class="hljs-keyword">if</span>(selector){
                target = e.target;
                <span class="hljs-keyword">if</span>(target.matches(selector)){
                    fn.call(target,e)
                }
            }<span class="hljs-keyword">else</span>{
                fn(e)
            }
        })
    }
    <span class="hljs-comment">//&#x4F7F;&#x7528;&#x4EE3;&#x7406;</span>
    <span class="hljs-keyword">var</span> div1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;div1&apos;</span>);
    bindEvent(div1,<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.innerHTML);
    })

    <span class="hljs-comment">//&#x4E0D;&#x4F7F;&#x7528;&#x4EE3;&#x7406; [&#x4EE3;&#x7801;&#x7B80;&#x6D01; &#x51CF;&#x5C11;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5185;&#x5B58;&#x5360;&#x7528;]</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;a1&apos;</span>);
    bindEvent(div1,<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-built_in">console</span>.log(a.innerHTML);
    })</code></pre><h2 id="articleHeader24">XMLHttpRequest</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//IE&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#xFF1A;&#x4F4E;&#x7248;&#x672C;&#x4F7F;&#x7528;ActiveXObject
    /*
    * 0&#xFF1A;&#x672A;&#x521D;&#x59CB;&#x5316; &#x8FD8;&#x6CA1;&#x8C03;&#x7528;send&#xFF08;&#xFF09;&#x65B9;&#x6CD5;
    * 1&#xFF1A;&#x8F7D;&#x5165; &#x5DF2;&#x8C03;&#x7528;send&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#xFF0C;&#x6B63;&#x5728;&#x53D1;&#x9001;&#x8BF7;&#x6C42;
    * 2&#xFF1A;&#x8F7D;&#x5165;&#x5B8C;&#x6210; send&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x5B8C;&#x6210;&#xFF0C;&#x5DF2;&#x7ECF;&#x63A5;&#x53D7;&#x5230;&#x5168;&#x90E8;&#x54CD;&#x5E94;&#x5185;&#x5BB9;
    * 3&#xFF1A;&#x4EA4;&#x4E92; &#x6B63;&#x5728;&#x89E3;&#x6790;&#x54CD;&#x5E94;&#x5185;&#x5BB9;
    * 4&#xFF1A;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8C03;&#x7528;&#x4E86;
    * */

    /*
    * status
    * 2xx&#xFF1A;&#x8868;&#x793A;&#x6210;&#x529F;&#x5904;&#x7406;
    * 3xx&#xFF1A;&#x9700;&#x8981;&#x91CD;&#x5B9A;&#x5411; &#x6D4F;&#x89C8;&#x5668;&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;
    * 4xx&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x9519;&#x8BEF; &#x5982;404
    * 5xx&#xFF1A;&#x670D;&#x52A1;&#x7AEF;&#x9519;&#x8BEF;
    * */
  var xhr = new XMLHttpRequest()
    xhr.open(&quot;GET&quot;,&quot;api&quot;,false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                alert(xhr.responseText)
            }
        }
    }
    xhr.send(null)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">//IE&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#xFF1A;&#x4F4E;&#x7248;&#x672C;&#x4F7F;&#x7528;ActiveXObject</span>
    <span class="hljs-comment">/*
    * 0&#xFF1A;&#x672A;&#x521D;&#x59CB;&#x5316; &#x8FD8;&#x6CA1;&#x8C03;&#x7528;send&#xFF08;&#xFF09;&#x65B9;&#x6CD5;
    * 1&#xFF1A;&#x8F7D;&#x5165; &#x5DF2;&#x8C03;&#x7528;send&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#xFF0C;&#x6B63;&#x5728;&#x53D1;&#x9001;&#x8BF7;&#x6C42;
    * 2&#xFF1A;&#x8F7D;&#x5165;&#x5B8C;&#x6210; send&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x5B8C;&#x6210;&#xFF0C;&#x5DF2;&#x7ECF;&#x63A5;&#x53D7;&#x5230;&#x5168;&#x90E8;&#x54CD;&#x5E94;&#x5185;&#x5BB9;
    * 3&#xFF1A;&#x4EA4;&#x4E92; &#x6B63;&#x5728;&#x89E3;&#x6790;&#x54CD;&#x5E94;&#x5185;&#x5BB9;
    * 4&#xFF1A;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8C03;&#x7528;&#x4E86;
    * */</span>

    <span class="hljs-comment">/*
    * status
    * 2xx&#xFF1A;&#x8868;&#x793A;&#x6210;&#x529F;&#x5904;&#x7406;
    * 3xx&#xFF1A;&#x9700;&#x8981;&#x91CD;&#x5B9A;&#x5411; &#x6D4F;&#x89C8;&#x5668;&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;
    * 4xx&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x9519;&#x8BEF; &#x5982;404
    * 5xx&#xFF1A;&#x670D;&#x52A1;&#x7AEF;&#x9519;&#x8BEF;
    * */</span>
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
    xhr.open(<span class="hljs-string">&quot;GET&quot;</span>,<span class="hljs-string">&quot;api&quot;</span>,<span class="hljs-literal">false</span>);
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span>){
            <span class="hljs-keyword">if</span>(xhr.status == <span class="hljs-number">200</span>){
                alert(xhr.responseText)
            }
        }
    }
    xhr.send(<span class="hljs-literal">null</span>)</code></pre><h2 id="articleHeader25">jsonp</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x8DE8;&#x57DF;
    &#x6D4F;&#x89C8;&#x5668;&#x6709;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;ajax&#x8BBF;&#x95EE;&#x5176;&#x4ED6;&#x57DF;&#x7684;&#x63A5;&#x53E3;
    &#x534F;&#x8BAE;&#x3001;&#x57DF;&#x540D;&#x3001;&#x7AEF;&#x53E3;&#x3001;&#x6709;&#x4E00;&#x4E2A;&#x4E0D;&#x540C;&#x5C31;&#x7B97;&#x8DE8;&#x57DF;
    &#x4E09;&#x4E2A;&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x7684;&#x6807;&#x7B7E;&#xFF1A;&lt;img src=xxx&gt; &lt;link href=xxx&gt; &lt;script src=xxx&gt;
    &lt;img&gt;&#x7528;&#x4E8E;&#x6253;&#x70B9;&#x7EDF;&#x8BA1; &#x7EDF;&#x8BA1;&#x7F51;&#x7AD9;&#x53EF;&#x80FD;&#x662F;&#x5176;&#x4ED6;&#x57DF;
    &lt;link&gt;&lt;script&gt;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;CDN CDN&#x7684;&#x4E5F;&#x662F;&#x5176;&#x4ED6;&#x57DF;
    &lt;script&gt;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;JSONP
    */

    /*jsonp&#x5B9E;&#x73B0;&#x539F;&#x7406;*/

    /*cookie
    *&#x5B58;&#x50A8;&#x91CF;&#x592A;&#x5C0F; &#x53EA;&#x6709;4kb
    * &#x6240;&#x6709;&#x7684;http&#x8BF7;&#x6C42;&#x90FD;&#x5E26;&#x7740; &#x4F1A;&#x5F71;&#x54CD;&#x83B7;&#x53D6;&#x8D44;&#x6E90;&#x7684;&#x6548;&#x7387;
    * API&#x7B80;&#x5355; &#x9700;&#x8981;&#x5C01;&#x88C5;&#x624D;&#x80FD;&#x7528;document.cookie=...
    *
    * locationStorage&amp;sessionStorage
    * HTML5&#x4E13;&#x95E8;&#x4E3A;&#x5B58;&#x50A8;&#x800C;&#x8BBE;&#x8BA1;&#xFF0C;&#x6700;&#x5927;&#x5BB9;&#x91CF;5m &#x4E0D;&#x4F1A;&#x643A;&#x5E26;&#x5230;ajax
    * API&#x7B80;&#x5355;&#x6613;&#x7528;
    * localStorage.setItem(key,value);localStorage.getItem(key);
    *&#x5728;ios safari&#x9690;&#x85CF;&#x6A21;&#x5F0F;&#x4E0B; localStorage. getItem&#x4F1A;&#x62A5;&#x9519; &#x5EFA;&#x8BAE;&#x540C;&#x4E00;&#x4F7F;&#x7528;try-catch&#x5C01;&#x88C5;*/
&lt;script&gt;
    window.callback = function (data) {
        console.log(data)
    }
&lt;/script&gt;
&lt;script src=&quot;http://coding.m.imooc.com/api.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>/*&#x8DE8;&#x57DF;
    &#x6D4F;&#x89C8;&#x5668;&#x6709;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;ajax&#x8BBF;&#x95EE;&#x5176;&#x4ED6;&#x57DF;&#x7684;&#x63A5;&#x53E3;
    &#x534F;&#x8BAE;&#x3001;&#x57DF;&#x540D;&#x3001;&#x7AEF;&#x53E3;&#x3001;&#x6709;&#x4E00;&#x4E2A;&#x4E0D;&#x540C;&#x5C31;&#x7B97;&#x8DE8;&#x57DF;
    &#x4E09;&#x4E2A;&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x7684;&#x6807;&#x7B7E;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">xxx</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">xxx</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">xxx</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span>&gt;</span>&#x7528;&#x4E8E;&#x6253;&#x70B9;&#x7EDF;&#x8BA1; &#x7EDF;&#x8BA1;&#x7F51;&#x7AD9;&#x53EF;&#x80FD;&#x662F;&#x5176;&#x4ED6;&#x57DF;
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">&#x53EF;&#x4EE5;&#x4F7F;&#x7528;CDN CDN&#x7684;&#x4E5F;&#x662F;&#x5176;&#x4ED6;&#x57DF;
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">&#x53EF;&#x4EE5;&#x7528;&#x4E8E;JSONP
    */

    /*jsonp&#x5B9E;&#x73B0;&#x539F;&#x7406;*/

    /*cookie
    *&#x5B58;&#x50A8;&#x91CF;&#x592A;&#x5C0F; &#x53EA;&#x6709;4kb
    * &#x6240;&#x6709;&#x7684;http&#x8BF7;&#x6C42;&#x90FD;&#x5E26;&#x7740; &#x4F1A;&#x5F71;&#x54CD;&#x83B7;&#x53D6;&#x8D44;&#x6E90;&#x7684;&#x6548;&#x7387;
    * API&#x7B80;&#x5355; &#x9700;&#x8981;&#x5C01;&#x88C5;&#x624D;&#x80FD;&#x7528;document.cookie=...
    *
    * locationStorage&amp;sessionStorage
    * HTML5&#x4E13;&#x95E8;&#x4E3A;&#x5B58;&#x50A8;&#x800C;&#x8BBE;&#x8BA1;&#xFF0C;&#x6700;&#x5927;&#x5BB9;&#x91CF;5m &#x4E0D;&#x4F1A;&#x643A;&#x5E26;&#x5230;ajax
    * API&#x7B80;&#x5355;&#x6613;&#x7528;
    * localStorage.setItem(key,value);localStorage.getItem(key);
    *&#x5728;ios safari&#x9690;&#x85CF;&#x6A21;&#x5F0F;&#x4E0B; localStorage. getItem&#x4F1A;&#x62A5;&#x9519; &#x5EFA;&#x8BAE;&#x540C;&#x4E00;&#x4F7F;&#x7528;try-catch&#x5C01;&#x88C5;*/
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.callback = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data)
    }
</span></span></span></span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://coding.m.imooc.com/api.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h1 id="articleHeader26">&#x9875;&#x9762;&#x52A0;&#x8F7D;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &#x4ECE;&#x8F93;&#x5165;url&#x5230;&#x5F97;&#x5230;html&#x7684;&#x8BE6;&#x7EC6;&#x8FC7;&#x7A0B;&#xFF1A;
 &#x52A0;&#x8F7D;&#x8D44;&#x6E90;&#x7684;&#x5F62;&#x5F0F; &#x8F93;&#x5165;url&#xFF08;&#x6216;&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#xFF09;&#x52A0;&#x8F7D;html/&#x52A0;&#x8F7D;html&#x4E2D;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;
 &#x52A0;&#x8F7D;&#x4E00;&#x4E2A;&#x8D44;&#x6E90;&#x7684;&#x8FC7;&#x7A0B; &#x6D4F;&#x89C8;&#x5668;&#x6839;&#x636E;dns&#x670D;&#x52A1;&#x5668;&#x5F97;&#x5230;&#x57DF;&#x540D;&#x7684;ip&#x5730;&#x5740; &#x5411;&#x8FD9;&#x4E2A;ip&#x7684;&#x673A;&#x5668;&#x53D1;&#x9001;htto&#x8BF7;&#x6C42; &#x670D;&#x52A1;&#x5668;&#x6536;&#x5230;&#x3001;&#x5904;&#x7406;&#x5E76;&#x8FD4;&#x56DE;http&#x8BF7;&#x6C42; &#x6D4F;&#x89C8;&#x5668;&#x5F97;&#x5230;&#x8FD4;&#x56DE;&#x5185;&#x5BB9;
&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x9875;&#x9762;&#x7684;&#x8FC7;&#x7A0B; &#x6839;&#x636E;html&#x7ED3;&#x6784;&#x751F;&#x6210;dom tree  &#x6839;&#x636E;css&#x751F;&#x6210;cssom&#xFF08;css&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x5316;&#x5904;&#x7406;&#xFF09; &#x5C06;dom&#x548C;cssom&#x6574;&#x5408;&#x5F62;&#x6210;renderTree &#x6839;&#x636E;renderTree&#x5F00;&#x59CB;&#x6E32;&#x67D3;&#x548C;&#x5C55;&#x793A; &#x9047;&#x5230;&lt;script&gt;&#x65F6;&#x4F1A;&#x6267;&#x884C;&#x5E76;&#x963B;&#x585E;&#x6E32;&#x67D3;&#xFF08;js&#x53EF;&#x4EE5;&#x6539;&#x53D8;dom&#x7684;&#x7ED3;&#x6784;&#xFF09;

window.onload &#x548C;DOMContentLoaded&#x533A;&#x522B;&#xFF1A;
window.onload&#xFF1A;&#x9875;&#x9762;&#x7684;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#x52A0;&#x8F7D;&#x5B8C;&#x624D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x5305;&#x62EC;&#x56FE;&#x7247; &#x89C6;&#x9891;&#x7B49;
DOMContentLoaded&#xFF1A;dom&#x6E32;&#x67D3;&#x5B8C;&#x5373;&#x53EF;&#x6267;&#x884C;&#xFF0C;&#x6B64;&#x65F6;&#x56FE;&#x7247; &#x89C6;&#x9891;&#x8FD8;&#x53EF;&#x80FD;&#x6CA1;&#x6709;&#x52A0;&#x8F7D;&#x5B8C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code> &#x4ECE;&#x8F93;&#x5165;url&#x5230;&#x5F97;&#x5230;html&#x7684;&#x8BE6;&#x7EC6;&#x8FC7;&#x7A0B;&#xFF1A;
 &#x52A0;&#x8F7D;&#x8D44;&#x6E90;&#x7684;&#x5F62;&#x5F0F; &#x8F93;&#x5165;url&#xFF08;&#x6216;&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#xFF09;&#x52A0;&#x8F7D;html/&#x52A0;&#x8F7D;html&#x4E2D;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;
 &#x52A0;&#x8F7D;&#x4E00;&#x4E2A;&#x8D44;&#x6E90;&#x7684;&#x8FC7;&#x7A0B; &#x6D4F;&#x89C8;&#x5668;&#x6839;&#x636E;dns&#x670D;&#x52A1;&#x5668;&#x5F97;&#x5230;&#x57DF;&#x540D;&#x7684;ip&#x5730;&#x5740; &#x5411;&#x8FD9;&#x4E2A;ip&#x7684;&#x673A;&#x5668;&#x53D1;&#x9001;htto&#x8BF7;&#x6C42; &#x670D;&#x52A1;&#x5668;&#x6536;&#x5230;&#x3001;&#x5904;&#x7406;&#x5E76;&#x8FD4;&#x56DE;http&#x8BF7;&#x6C42; &#x6D4F;&#x89C8;&#x5668;&#x5F97;&#x5230;&#x8FD4;&#x56DE;&#x5185;&#x5BB9;
&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x9875;&#x9762;&#x7684;&#x8FC7;&#x7A0B; &#x6839;&#x636E;html&#x7ED3;&#x6784;&#x751F;&#x6210;dom tree  &#x6839;&#x636E;css&#x751F;&#x6210;cssom&#xFF08;css&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x5316;&#x5904;&#x7406;&#xFF09; &#x5C06;dom&#x548C;cssom&#x6574;&#x5408;&#x5F62;&#x6210;renderTree &#x6839;&#x636E;renderTree&#x5F00;&#x59CB;&#x6E32;&#x67D3;&#x548C;&#x5C55;&#x793A; &#x9047;&#x5230;<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">&#x65F6;&#x4F1A;&#x6267;&#x884C;&#x5E76;&#x963B;&#x585E;&#x6E32;&#x67D3;&#xFF08;js&#x53EF;&#x4EE5;&#x6539;&#x53D8;dom&#x7684;&#x7ED3;&#x6784;&#xFF09;

<span class="hljs-built_in">window</span>.onload &#x548C;DOMContentLoaded&#x533A;&#x522B;&#xFF1A;
<span class="hljs-built_in">window</span>.onload&#xFF1A;&#x9875;&#x9762;&#x7684;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#x52A0;&#x8F7D;&#x5B8C;&#x624D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x5305;&#x62EC;&#x56FE;&#x7247; &#x89C6;&#x9891;&#x7B49;
DOMContentLoaded&#xFF1A;dom&#x6E32;&#x67D3;&#x5B8C;&#x5373;&#x53EF;&#x6267;&#x884C;&#xFF0C;&#x6B64;&#x65F6;&#x56FE;&#x7247; &#x89C6;&#x9891;&#x8FD8;&#x53EF;&#x80FD;&#x6CA1;&#x6709;&#x52A0;&#x8F7D;&#x5B8C;</span></code></pre><h2 id="articleHeader27">&#x6027;&#x80FD;&#x4F18;&#x5316;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* &#x52A0;&#x8F7D;&#x9875;&#x9762;&#x548C;&#x9759;&#x6001;&#x8D44;&#x6E90;  &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x538B;&#x7F29;&#x5408;&#x5E76; &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7F13;&#x5B58; &#x4F7F;&#x7528;cdn &#x4F7F;&#x7528;ssr&#x540E;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x8BA9;&#x6570;&#x636E;&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x5230;html&#x4E2D;
* &#x9875;&#x9762;&#x6E32;&#x67D3; css&#x653E;&#x524D;&#x9762;&#xFF0C;js&#x653E;&#x540E;&#x9762; &#x61D2;&#x52A0;&#x8F7D;&#xFF08;&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#xFF09; &#x51CF;&#x5C11;dom&#x67E5;&#x8BE2;&#xFF0C;&#x5BF9;dom&#x67E5;&#x8BE2;&#x505A;&#x7F13;&#x5B58; &#x51CF;&#x5C11;dom&#x64CD;&#x4F5C;&#xFF0C;&#x591A;&#x4E2A;&#x64CD;&#x4F5C;&#x5C3D;&#x91CF;&#x5408;&#x5E76;&#x5728;&#x4E00;&#x8D77;&#x6267;&#x884C; &#x4E8B;&#x4EF6;&#x8282;&#x6D41; DOMConetenLoaded" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code><span class="hljs-bullet">* </span>&#x52A0;&#x8F7D;&#x9875;&#x9762;&#x548C;&#x9759;&#x6001;&#x8D44;&#x6E90;  &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x538B;&#x7F29;&#x5408;&#x5E76; &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7F13;&#x5B58; &#x4F7F;&#x7528;cdn &#x4F7F;&#x7528;ssr&#x540E;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x8BA9;&#x6570;&#x636E;&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x5230;html&#x4E2D;
<span class="hljs-bullet">* </span>&#x9875;&#x9762;&#x6E32;&#x67D3; css&#x653E;&#x524D;&#x9762;&#xFF0C;js&#x653E;&#x540E;&#x9762; &#x61D2;&#x52A0;&#x8F7D;&#xFF08;&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#xFF09; &#x51CF;&#x5C11;dom&#x67E5;&#x8BE2;&#xFF0C;&#x5BF9;dom&#x67E5;&#x8BE2;&#x505A;&#x7F13;&#x5B58; &#x51CF;&#x5C11;dom&#x64CD;&#x4F5C;&#xFF0C;&#x591A;&#x4E2A;&#x64CD;&#x4F5C;&#x5C3D;&#x91CF;&#x5408;&#x5E76;&#x5728;&#x4E00;&#x8D77;&#x6267;&#x884C; &#x4E8B;&#x4EF6;&#x8282;&#x6D41; DOMConetenLoaded</code></pre><h2 id="articleHeader28">&#x4E8B;&#x4EF6;&#x8282;&#x6D41;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var textarea = document.getElementById(&apos;text&apos;);
    var timeoutId
    textarea.addEventListener(&apos;keyup&apos;,function () {
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(function () {
            //&#x89E6;&#x53D1;change&#x4E8B;&#x4EF6;
        },100)
    })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> textarea = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;text&apos;</span>);
    <span class="hljs-keyword">var</span> timeoutId
    textarea.addEventListener(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//&#x89E6;&#x53D1;change&#x4E8B;&#x4EF6;</span>
        },<span class="hljs-number">100</span>)
    })
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS面试理论题

## 原文链接
[https://segmentfault.com/a/1190000016039828](https://segmentfault.com/a/1190000016039828)


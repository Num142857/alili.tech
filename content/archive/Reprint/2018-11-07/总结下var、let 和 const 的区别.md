---
title: 总结下var、let 和 const 的区别
hidden: true
categories: [reprint]
slug: 427207fb
date: 2018-11-07 02:30:16
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>var &#x548C; let &#x7684;&#x533A;&#x522B;&#x662F;&#x8001;&#x751F;&#x5E38;&#x8C08;&#xFF0C;&#x770B;&#x5230;&#x7F51;&#x4E0A;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x6709;&#x7684;&#x4E0D;&#x592A;&#x5168;&#x9762;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x7684;&#x63CF;&#x8FF0;&#x4E0D;&#x592A;&#x51C6;&#x786E;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x5C3D;&#x91CF;&#x5168;&#x9762;&#x7684;&#x603B;&#x7ED3;&#x4E0B;&#x8FD9;&#x4E09;&#x8005;&#x7684;&#x533A;&#x522B;&#x3002;</p><hr><p><strong>let &#x662F; ES6&#x65B0;&#x589E;&#x7684;&#x53D8;&#x91CF;&#x7C7B;&#x578B;&#xFF0C;&#x7528;&#x6765;&#x4EE3;&#x66FF; var &#x7684;&#x4E00;&#x4E9B;&#x7F3A;&#x9677;&#xFF0C;&#x8DDF; var &#x76F8;&#x6BD4;&#x4E3B;&#x8981;&#x6709;&#x4EE5;&#x4E0B;&#x533A;&#x522B;&#xFF1A;</strong></p><h3 id="articleHeader1">1. let &#x4F7F;&#x7528;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;</h3><p>&#x5728; ES6&#x4E4B;&#x524D;&#xFF0C;ES5&#x4E2D;js&#x53EA;&#x6709;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x548C;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(true) {
   var a = &apos;name&apos;
}
console.log(&apos;a&apos;,a) // name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(true)</span></span> {
   <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-string">&apos;name&apos;</span>
}
console.log(<span class="hljs-string">&apos;a&apos;</span>,a) <span class="hljs-comment">// name</span></code></pre><p>&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x5730;&#x76D8;&#xFF0C;&#x8BA9;&#x53D8;&#x91CF;&#x4E0D;&#x5916;&#x6CC4;&#x51FA;&#x53BB;&#xFF0C;&#x4F46;&#x662F;&#x4E0A;&#x4F8B;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x5C31;&#x5916;&#x6CC4;&#x4E86;&#x51FA;&#x53BB;&#xFF0C;&#x6240;&#x4EE5;&#x6B64;&#x65F6; JS &#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6982;&#x5FF5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function fn() {
   var a = 2;
   console.log(&apos;fn&apos;,a);
}
console.log(&apos;global&apos;,a);
fn();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn&apos;</span>,a);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;global&apos;</span>,a);
fn();</code></pre><p>&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x662F;&#x6700;&#x5916;&#x5C42;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5199;&#x4E86;&#x5F88;&#x591A;&#x884C; JS &#x4EE3;&#x7801;&#xFF0C;&#x53D8;&#x91CF;&#x5B9A;&#x4E49;&#x90FD;&#x6CA1;&#x6709;&#x7528;&#x51FD;&#x6570;&#x5305;&#x62EC;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x4EEC;&#x5C31;&#x5168;&#x90E8;&#x90FD;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x574F;&#x5904;&#x5C31;&#x662F;&#x5F88;&#x5BB9;&#x6613;&#x51B2;&#x7A81;&#x3002;<br>ES6&#x4E2D;&#x52A0;&#x5165;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x4E4B;&#x540E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(true) {
   let a = &apos;name&apos;
}
console.log(&apos;name&apos;,name) // Uncaught ReferenceError: a is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(true)</span></span> {
   let <span class="hljs-selector-tag">a</span> = <span class="hljs-string">&apos;name&apos;</span>
}
console.log(<span class="hljs-string">&apos;name&apos;</span>,name) <span class="hljs-comment">// Uncaught ReferenceError: a is not defined</span></code></pre><p>&#x5757;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7528; let &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5728;&#x5757;&#x5916;&#x662F;&#x4E0D;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5F15;&#x7528;&#x7684;&#x8BDD;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><h3 id="articleHeader2">2. let &#x7EA6;&#x675F;&#x4E86;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x800C;&#x4E0D;&#x662F;&#x6CA1;&#x6709;&#x53D8;&#x91CF;&#x63D0;&#x5347;</h3><p>&#x5728; js &#x4E2D;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x63D0;&#x5347;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
   console.log(&apos;a&apos;,a);
   var a = 1;  // undefind
}
fn()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;a&apos;</span>,a);
   <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;  <span class="hljs-comment">// undefind</span>
}
fn()</code></pre><p>a&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x5728;&#x8C03;&#x7528;&#x524D;&#x88AB;&#x58F0;&#x660E;&#x4E86;&#xFF0C;&#x53EA;&#x662F;&#x6CA1;&#x6709;&#x88AB;&#x521D;&#x59CB;&#x5316;&#x3002;JavaScript&#x4F1A;&#x628A;&#x4F5C;&#x7528;&#x57DF;&#x91CC;&#x7684;&#x6240;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x63D0;&#x5230;&#x51FD;&#x6570;&#x7684;&#x9876;&#x90E8;&#x58F0;&#x660E;,&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
   var a;
   console.log(&apos;a&apos;,a);
   a = 1;  // undefind
}
fn()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span> <span class="hljs-comment">{
   var a;
   console.log(&apos;a&apos;,a);
   a = 1;  // undefind
}</span>
<span class="hljs-title">fn</span><span class="hljs-params">()</span></span></code></pre><p>JavaScript&#x4F1A;&#x4F7F;&#x7528;<code>undefined</code>&#x7F3A;&#x7701;&#x503C;&#x521B;&#x5EFA;&#x53D8;&#x91CF;a,&#x4E8B;&#x5B9E;&#x4E0A;&#x6D4F;&#x89C8;&#x5668;&#x5E76;&#x6CA1;&#x6709;&#x628A;&#x58F0;&#x660E;&#x8BED;&#x53E5;&#x653E;&#x5230;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x9876;&#x90E8;&#xFF0C;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#xFF0C;&#x63A7;&#x5236;&#x6D41;&#x8FDB;&#x5165;&#x57DF;&#xFF0C;&#x8BE5;&#x57DF;&#x6240;&#x6709;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x7684;&#x58F0;&#x660E;&#x5148;&#x8FDB;&#x5165;&#x5185;&#x5B58;&#xFF0C;&#x6587;&#x4E2D;&#x4EE3;&#x7801;&#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;&#x4E0D;&#x4F1A;&#x53D8;&#x52A8;&#x3002;</p><p>&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x6307;&#x7684;&#x662F;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x63D0;&#x5347;&#xFF0C;&#x4E0D;&#x4F1A;&#x63D0;&#x5347;&#x53D8;&#x91CF;&#x7684;&#x521D;&#x59CB;&#x5316;&#x548C;&#x8D4B;&#x503C;&#x3002;</p><p>&#x5E76;&#x4E14;&#x51FD;&#x6570;&#x7684;&#x63D0;&#x5347;&#x4F18;&#x5148;&#x7EA7;&#x5927;&#x4E8E;&#x53D8;&#x91CF;&#x7684;&#x63D0;&#x5347;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
            console.log(&apos;a&apos;, a);
            var a = 1;
            function a () {
                console.log(&apos;I am a function&apos;);
            }
        }
        fn() // &#x192; a () {console.log(&apos;I am a function&apos;);}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;a&apos;</span>, a);
            <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;I am a function&apos;</span>);
            }
        }
        fn() <span class="hljs-comment">// &#x192; a () {console.log(&apos;I am a function&apos;);}</span></code></pre><p>&#x5728;&#x4E0A;&#x4F8B;&#x4E2D;&#xFF0C; let &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E4B;&#x5916;&#x5F15;&#x7528;&#x8BE5;&#x53D8;&#x91CF;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x5426;&#x53EF;&#x7406;&#x89E3;&#x4E3A; let &#x6CA1;&#x6709;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = &apos;outside&apos;;
if(true) {
   console.log(a);//Uncaught ReferenceError: a is not defined
    let a = &quot;inside&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> a = <span class="hljs-string">&apos;outside&apos;</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
   <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">//Uncaught ReferenceError: a is not defined</span>
    <span class="hljs-keyword">let</span> a = <span class="hljs-string">&quot;inside&quot;</span>;
}</code></pre><p>&#x62A5;&#x51FA;&#x9519;&#x8BEF; a &#x6CA1;&#x6709;&#x88AB;&#x5B9A;&#x4E49;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5F15;&#x7528;&#x4E86;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x91CC;&#x7684; a&#xFF0C;&#x8BF4;&#x660E; let &#x58F0;&#x660E;&#x7684; a &#x4E5F;&#x88AB;&#x63D0;&#x5347;&#x4E86;&#x3002;</p><p>&#x539F;&#x56E0;&#x662F; let &#x8BBE;&#x8BA1;&#x4E2D;&#x7684;&#x6682;&#x65F6;&#x6027;&#x6B7B;&#x533A;&#xFF1A;<br>&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x9876;&#x90E8;&#x5230;&#x8BE5;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x4F4D;&#x7F6E;&#x4E2D;&#x95F4;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x90FD;&#x662F;&#x8BE5;let&#x53D8;&#x91CF;&#x7684;&#x6B7B;&#x533A;&#xFF0C;&#x5728;&#x6B7B;&#x533A;&#x4E2D;&#xFF0C;&#x7981;&#x6B62;&#x8BBF;&#x95EE;&#x8BE5;&#x53D8;&#x91CF;&#x3002;&#x7531;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9;&#x51FA;&#x7ED3;&#x8BBA;&#xFF0C;<strong>let&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C; &#x4F46;&#x662F;&#x7531;&#x4E8E;&#x6B7B;&#x533A;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x5728;&#x58F0;&#x660E;&#x524D;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x3002;</strong></p><h3 id="articleHeader3">3. let &#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x53D8;&#x91CF;</h3><p>&#x4F7F;&#x7528; var &#x53EF;&#x4EE5;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#xFF0C;&#x4F46;&#x662F; let &#x4E0D;&#x5141;&#x8BB8;&#x5728;&#x540C;&#x4E00;&#x5757;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x540C;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn (){
   var a = 1;
   let a = 2;
   console.log(a); //SyntaxError
}

function fn (){
   let a = 1;
   let a = 2;
   console.log(a); //SyntaxError
}

function fn (a){
   let a = 2;
   console.log(a); //SyntaxError
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
   <span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>;
   <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">//SyntaxError</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
   <span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>;
   <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">//SyntaxError</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params">a</span>)</span>{
   <span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>;
   <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">//SyntaxError</span>
}</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4F1A;&#x62A5;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#xFF1B;</p><h3 id="articleHeader4">4. let&#x4E0D;&#x4F1A;&#x6210;&#x4E3A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;</h3><p>&#x6211;&#x4EEC;&#x5728;&#x5168;&#x5C40;&#x8303;&#x56F4;&#x5185;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x81EA;&#x52A8;&#x6210;&#x4E3A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF08;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x548C;<code>Node.js</code>&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E2A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x5206;&#x522B;&#x662F;<code>window</code>&#x548C;<code>global</code>)&#xFF0C;&#x4F46;let&#x662F;&#x72EC;&#x7ACB;&#x5B58;&#x5728;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x4F1A;&#x6210;&#x4E3A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
console.log(window.a); //1

let b = 2;
console.log(window.b); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a); <span class="hljs-comment">//1</span>

<span class="hljs-keyword">let</span> b = <span class="hljs-number">2</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.b); <span class="hljs-comment">// undefined</span></code></pre><h3 id="articleHeader5">5. const &#x58F0;&#x660E;&#x7684;&#x5E38;&#x91CF;</h3><p>&#x4EE5;&#x4E0A; let &#x7684;&#x89C4;&#x5219;&#x540C;&#x6837;&#x9002;&#x7528;&#x4E8E; const&#xFF0C;&#x4F46;&#x662F;&#x8DDF; let &#x7684;&#x533A;&#x522B;&#x662F; const &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x4E0D;&#x80FD;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;<strong> const &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x5FC5;&#x987B;&#x7ECF;&#x8FC7;&#x521D;&#x59CB;&#x5316;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 1;

a = 2; // // Uncaught TypeError: Assignment to constant variable
const b; // Uncaught SyntaxError: Missing initializer in const declaration" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs julia"><code><span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>;

a = <span class="hljs-number">2</span>; // // Uncaught <span class="hljs-built_in">TypeError</span>: Assignment to constant variable
<span class="hljs-keyword">const</span> b; // Uncaught SyntaxError: Missing initializer <span class="hljs-keyword">in</span> <span class="hljs-keyword">const</span> declaration</code></pre><h2 id="articleHeader6">&#x6700;&#x540E;</h2><p>&#x4EE5;&#x4E0A;&#x5927;&#x6982;&#x662F;&#x603B;&#x7ED3;&#x540E;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x770B;&#x6765;&#xFF0C;&#x8FD8;&#x662F;&#x591A;&#x7528; let &#x3001;const &#x5427;&#x3002;</p><blockquote>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;<a href="http://es6.ruanyifeng.com/#docs/let" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
总结下var、let 和 const 的区别

## 原文链接
[https://segmentfault.com/a/1190000016491581](https://segmentfault.com/a/1190000016491581)


---
title: '深入理解 Javascript 之 作用域' 
date: 2018-11-18 2:30:09
hidden: true
slug: hnjb39gexor
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4F5C;&#x7528;&#x57DF;</h1><blockquote>JavaScript&#x662F;&#x95E8;&#x52A8;&#x6001;&#x8BED;&#x8A00;&#xFF0C;&#x8DDF;Java&#x4E0D;&#x4E00;&#x6837;&#xFF0C;JavaScript&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x548C;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#xFF0C;&#x53D8;&#x91CF;&#x4F1A;&#x5728;&#x8BE5;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x63D0;&#x5347;&#xFF0C;&#x800C;&#x4E14;JavaScript&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3002;<br>&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x5728;&#x5168;&#x5C40;&#x7684;&#x53D8;&#x91CF;&#x4E86;&#xFF0C;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x662F;&#x5B9A;&#x4E49;&#x5728;&#x51FD;&#x6570;&#x91CC;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5F53;&#x51FD;&#x6570;&#x6267;&#x884C;&#x65F6;&#x4F1A;&#x4F18;&#x5148;&#x67E5;&#x627E;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x7136;&#x540E;&#x9010;&#x7EA7;&#x5411;&#x4E0A;&#x3002;&#x5B9A;&#x4E49;&#x5728;<br>if &#x548C; for &#x8BED;&#x53E5;&#x91CC;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5728;&#x5927;&#x62EC;&#x53F7;&#x5916;&#x9762;&#x4E5F;&#x80FD;&#x8BBF;&#x95EE;&#x5230;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbe2VK?w=1637&amp;h=306" src="https://static.alili.tech/img/bVbe2VK?w=1637&amp;h=306" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x4E00;&#x3001;&#x9884;&#x5904;&#x7406; + &#x4F5C;&#x7528;&#x57DF;&#x89E3;&#x6790;</h2><p><strong>JavaScript &#x7684;&#x4F5C;&#x7528;&#x57DF;&#x53EA;&#x7528;&#x4E24;&#x79CD;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x5168;&#x5C40;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x51FD;&#x6570;&#x7684;&#xFF0C;&#x4E5F;&#x79F0;&#x4E3A; &#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF; &#x548C; &#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF; &#xFF1B;&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF; &#x53EF;&#x4EE5;&#x8BBF;&#x95EE; &#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF; &#x3002;&#x4F46;&#x662F; &#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF; &#x4E0D;&#x80FD;&#x8BBF;&#x95EE; &#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;</strong></p><p>&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
function fn1(){
    alert(a);
    var a = 2;
}
fn1();
alert(a);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>)</span>{
    alert(a);
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
}
fn1();
alert(a);</code></pre><p>&#x8FD9;&#x91CC;&#x5148;&#x63ED;&#x6653;&#x7B54;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7B2C;&#x4E00;&#x4E2A; alert(a) &#x5F39;&#x51FA; undefined
&#x7B2C;&#x4E8C;&#x4E2A; alert(a) &#x5F39;&#x51FA; 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs brainfuck"><code><span class="hljs-comment">&#x7B2C;&#x4E00;&#x4E2A;</span> <span class="hljs-comment">alert(a)</span> <span class="hljs-comment">&#x5F39;&#x51FA;</span> <span class="hljs-comment">undefined</span>
<span class="hljs-comment">&#x7B2C;&#x4E8C;&#x4E2A;</span> <span class="hljs-comment">alert(a)</span> <span class="hljs-comment">&#x5F39;&#x51FA;</span> <span class="hljs-comment">1</span></code></pre><p><strong>1. &#x9884;&#x89E3;&#x6790;&#xFF08;&#x9884;&#x7F16;&#x8BD1;&#xFF09; &#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF; &#xFF08;&#x5168;&#x5C40;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5168;&#x5C40;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;
// &#x7B2C;1&#x884C;&#xFF0C;&#x9047;&#x5230; var &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;
a = undefined
// &#x7B2C;2&#x884C;&#xFF0C;&#x9047;&#x5230; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;
fn1 = function fn1(){
    alert(a);
    var a = 2;
}
// &#x7B2C;3&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E0D;&#x89E3;&#x6790;
// &#x7B2C;4&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E0D;&#x89E3;&#x6790;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5168;&#x5C40;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;</span>
<span class="hljs-comment">// &#x7B2C;1&#x884C;&#xFF0C;&#x9047;&#x5230; var &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;</span>
a = <span class="hljs-literal">undefined</span>
<span class="hljs-comment">// &#x7B2C;2&#x884C;&#xFF0C;&#x9047;&#x5230; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5168;&#x5C40;&#x7684;&#x5934;&#x90E8;</span>
fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>)</span>{
    alert(a);
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
}
<span class="hljs-comment">// &#x7B2C;3&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E0D;&#x89E3;&#x6790;</span>
<span class="hljs-comment">// &#x7B2C;4&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E0D;&#x89E3;&#x6790;</span></code></pre><p><strong>2. &#x5F00;&#x59CB;&#x6267;&#x884C;&#x4EE3;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7B2C;1&#x884C;&#xFF0C;&#x9047;&#x5230;&#x8868;&#x8FBE;&#x5F0F; a = 1, a &#x88AB;&#x8D4B;&#x503C;&#x6210; 1 
&#x7B2C;6&#x884C;&#xFF0C;&#x9047;&#x5230;&#x51FD;&#x6570;&#x8C03;&#x7528; fn1() ,           ---- &#x5F00;&#x59CB; &#x9884;&#x89E3;&#x6790;&#xFF08;&#x9884;&#x7F16;&#x8BD1;&#xFF09; &#x5C40;&#x90E8;-----" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x7B2C;<span class="hljs-number">1</span>&#x884C;&#xFF0C;&#x9047;&#x5230;&#x8868;&#x8FBE;&#x5F0F; a = <span class="hljs-number">1</span>, a &#x88AB;&#x8D4B;&#x503C;&#x6210; <span class="hljs-number">1</span> 
&#x7B2C;<span class="hljs-number">6</span>&#x884C;&#xFF0C;&#x9047;&#x5230;&#x51FD;&#x6570;&#x8C03;&#x7528; fn1() ,           ---- &#x5F00;&#x59CB; &#x9884;&#x89E3;&#x6790;&#xFF08;&#x9884;&#x7F16;&#x8BD1;&#xFF09; &#x5C40;&#x90E8;-----</code></pre><p><strong>3. &#x9884;&#x89E3;&#x6790;&#xFF08;&#x9884;&#x7F16;&#x8BD1;&#xFF09; &#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF; (&#x51FD;&#x6570;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;)</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;3&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E0D;&#x89E3;&#x6790;
// &#x7B2C;4&#x884C;&#xFF0C;&#x9047;&#x5230; var &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5C40;&#x90E8;
a = undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;3&#x884C;&#xFF0C;&#x6CA1;&#x6709;&#x9047;&#x5230;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E0D;&#x89E3;&#x6790;</span>
<span class="hljs-comment">// &#x7B2C;4&#x884C;&#xFF0C;&#x9047;&#x5230; var &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x89E3;&#x6790;&#x5230;&#x5C40;&#x90E8;</span>
a = <span class="hljs-literal">undefined</span></code></pre><p><strong>4. &#x5F00;&#x59CB;&#x6267;&#x884C; &#x5C40;&#x90E8; &#x4EE3;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7B2C;3&#x884C;&#xFF0C;&#x5F39;&#x51FA; undefined
&#x7B2C;4&#x884C;&#xFF0C;&#x9047;&#x5230;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x628A;&#x5C40;&#x90E8; a &#x6539;&#x6210; 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x7B2C;<span class="hljs-number">3</span>&#x884C;&#xFF0C;&#x5F39;&#x51FA; <span class="hljs-literal">undefined</span>
&#x7B2C;<span class="hljs-number">4</span>&#x884C;&#xFF0C;&#x9047;&#x5230;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x628A;&#x5C40;&#x90E8; a &#x6539;&#x6210; <span class="hljs-number">2</span></code></pre><p><strong>5. &#x5C40;&#x90E8;&#x6267;&#x884C;&#x5B8C;&#x6210;&#xFF0C;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x5168;&#x5C40;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7B2C;7&#x884C;&#xFF0C;&#x5F39;&#x51FA; 1 &#xFF0C;&#x56E0;&#x4E3A;&#x5168;&#x5C40;&#x548C;&#x5C40;&#x90E8;&#x662F;&#x4E24;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x4F5C;&#x7528;&#x57DF;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">&#x7B2C;<span class="hljs-number">7</span>&#x884C;&#xFF0C;&#x5F39;&#x51FA; <span class="hljs-number">1</span> &#xFF0C;&#x56E0;&#x4E3A;&#x5168;&#x5C40;&#x548C;&#x5C40;&#x90E8;&#x662F;&#x4E24;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x4F5C;&#x7528;&#x57DF;</code></pre><hr><h2 id="articleHeader2">&#x4E8C;&#x3001;&#x4F5C;&#x7528;&#x57DF;&#x7591;&#x60D1;&#x4E4B;&#x5904;</h2><p><strong>1. js&#x6CA1;&#x6709;&#x5757;&#x4F5C;&#x7528;&#x57DF;</strong></p><p><strong>2. js&#x4E0D;&#x662F;&#x52A8;&#x6001;&#x4F5C;&#x7528;&#x57DF;,js&#x662F;&#x9759;&#x6001;&#x4F5C;&#x7528;&#x57DF;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(){
  alert(x);
}
function f1() {
  var x = 6;
  f();
}
function f2() {
  var x = 10;
  f();
}

f1();
// &#x6267;&#x884C;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x56E0;&#x6B64;js&#x4E0D;&#x662F;&#x52A8;&#x6001;&#x4F5C;&#x7528;&#x57DF;&#x54E6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
  alert(x);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">6</span>;
  f();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
  f();
}

f1();
<span class="hljs-comment">// &#x6267;&#x884C;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x56E0;&#x6B64;js&#x4E0D;&#x662F;&#x52A8;&#x6001;&#x4F5C;&#x7528;&#x57DF;&#x54E6;</span></code></pre><hr><h2 id="articleHeader3">&#x4E8C;&#x3001;&#x4F5C;&#x7528;&#x57DF;&#x94FE;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 10;

function f() {
  var x = 100;
  function g () {
    // 
  }
  g();
}
f();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">100</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// </span>
  }
  g();
}
f();</code></pre><ul><li>&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x89E3;&#x6790;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. &#x521B;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#xFF08;window&#xFF09;
2. &#x52A0;&#x5165; a &#x4EE5;&#x53CA; f&#x51FD;&#x6570; &#xFF0C;&#x8FD9;&#x65F6;&#x5019;     &#x3010;f.scope === window&#x3011;
3. &#x8FDB;&#x5165;f&#x51FD;&#x6570;&#xFF0C;&#x521B;&#x5EFA;f&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;  &#x3010;f.le =&gt; f.scope&#x3011;
4. &#x521B;&#x5EFA;f &#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883; 
5. &#x6DFB;&#x52A0;x&#x548C; g&#x51FD;&#x6570; &#x5230;f&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883; &#x3010;g.scope === f.le&#x3011;
6. &#x8FDB;&#x5165;g&#x51FD;&#x6570;&#xFF0C;&#x521B;&#x5EFA;g&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;  &#x3010;g.le =&gt; g.scope&#x3011;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> &#x521B;&#x5EFA;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#xFF08;<span class="hljs-built_in">window</span>&#xFF09;
<span class="hljs-number">2.</span> &#x52A0;&#x5165; a &#x4EE5;&#x53CA; f&#x51FD;&#x6570; &#xFF0C;&#x8FD9;&#x65F6;&#x5019;     &#x3010;f.scope === <span class="hljs-built_in">window</span>&#x3011;
<span class="hljs-number">3.</span> &#x8FDB;&#x5165;f&#x51FD;&#x6570;&#xFF0C;&#x521B;&#x5EFA;f&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;  &#x3010;f.le =&gt; f.scope&#x3011;
<span class="hljs-number">4.</span> &#x521B;&#x5EFA;f &#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883; 
<span class="hljs-number">5.</span> &#x6DFB;&#x52A0;x&#x548C; g&#x51FD;&#x6570; &#x5230;f&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883; &#x3010;g.scope === f.le&#x3011;
<span class="hljs-number">6.</span> &#x8FDB;&#x5165;g&#x51FD;&#x6570;&#xFF0C;&#x521B;&#x5EFA;g&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;  &#x3010;g.le =&gt; g.scope&#x3011;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="g.le  -&gt;  g-&gt;scope  -&gt;  f.le  -&gt;  f.scope  -&gt;  window" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">g.le  -&gt;  g-&gt;scope  -&gt;  f.le  -&gt;  f.scope  -&gt;  <span class="hljs-built_in">window</span></code></pre><hr><h2 id="articleHeader4">&#x4E09;&#x3001;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x672C;&#x8D28;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 10;

function f() {
  var x = 100;
  function g () {
    // 
    alert(a);
  }
  g();
}
f();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">100</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// </span>
    alert(a);
  }
  g();
}
f();</code></pre><blockquote><p>&#x6211;&#x4EEC;&#x5728;g&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x4E86;&#x53D8;&#x91CF;a&#xFF0C;&#x60F3;&#x8981;&#x627E;&#x5230;a&#xFF0C;</p><ol><li>&#x9996;&#x5148;&#x5728;g&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x4E2D;&#x67E5;&#x627E;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x627E;&#x5230;</li><li>&#x5230;g.scope &#x4E5F;&#x5C31;&#x662F; f&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x4E2D;&#x67E5;&#x627E;&#xFF0C;&#x5982;&#x679C;&#x4F9D;&#x65E7;&#x6CA1;&#x627E;&#x5230;</li><li>&#x5230;f.scope &#x4E5F;&#x5C31;&#x662F; &#x5168;&#x5C40;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x4E2D;&#x67E5;&#x627E;&#x3002;</li></ol></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 作用域

## 原文链接
[https://segmentfault.com/a/1190000015940175](https://segmentfault.com/a/1190000015940175)


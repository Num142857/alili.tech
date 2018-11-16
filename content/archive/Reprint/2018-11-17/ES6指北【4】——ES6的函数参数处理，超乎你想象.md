---
title: 'ES6指北【4】——ES6的函数参数处理，超乎你想象' 
date: 2018-11-17 2:30:12
hidden: true
slug: wcdexh9hz6
categories: reprint
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x3001;&#x51FD;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x503C;</h1><h2 id="articleHeader1">1. ES6&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;</h2><h3 id="articleHeader2">1.1 &#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x4F7F;&#x7528;&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;&#x3010;||&#x3011;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(x) {
  x = x || &apos;&#x9ED8;&#x8BA4;&#x503C;&apos; // &#x4F7F;&#x7528;||&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x503C;
  console.log(x) 
}

test() // &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">x</span>) </span>{
  x = x || <span class="hljs-string">&apos;&#x9ED8;&#x8BA4;&#x503C;&apos;</span> <span class="hljs-comment">// &#x4F7F;&#x7528;||&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x503C;</span>
  <span class="hljs-built_in">console</span>.log(x) 
}

test() <span class="hljs-comment">// &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;</span></code></pre><p>&#x4F46;&#x8FD9;&#x6837;&#x505A;&#x6709;&#x4E2A;&#x975E;&#x5E38;&#x660E;&#x663E;&#x7684;&#x7F3A;&#x9677;<br>&#x5982;&#x679C;x&#x7684;&#x503C;&#x4E3A;<code>null/+0&#x6216;-0/NaN/&apos;&apos;/false</code>&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#xFF0C;x&#x90FD;&#x4F1A;&#x88AB;&#x8BBE;&#x7F6E;&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x7684;&#x672C;&#x610F;&#x662F;&#x5728;<strong>&#x4E0D;&#x4F20;&#x503C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x8BBE;&#x7F6E;&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;</strong></p><p>&#x56E0;&#x6B64;&#x6709;&#x4E86;&#x7B2C;&#x4E8C;&#x79CD;&#x5904;&#x7406;&#x65B9;&#x5F0F;</p><h3 id="articleHeader3">1.2 &#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x5BF9;&#x53C2;&#x6570;&#x662F;&#x5426;&#x4E3A;undefined&#x8FDB;&#x884C;&#x5224;&#x65AD;</h3><blockquote>ES5&#x5176;&#x5B9E;&#x672C;&#x6765;&#x5C31;&#x6709;&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;<code>&#x53EA;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E2A;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x53EA;&#x80FD;&#x662F;undefined&#xFF0C;&#x65E0;&#x6CD5;&#x8BBE;&#x7F6E;</code></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(x) {
  console.log(x)
}

test() // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x)
}

test() <span class="hljs-comment">// undefined</span></code></pre><blockquote>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x5BF9;&#x4F20;&#x5165;&#x7684;&#x503C;<strong>&#x662F;&#x5426;&#x4E3A;undefined</strong>&#x8FDB;&#x884C;&#x5224;&#x65AD;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x81EA;&#x7531;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x4E86;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(x) {
  if(!(Object.prototype.toString.call(x) === &quot;[object Undefined]&quot;)) {
    console.log(&apos;&#x9ED8;&#x8BA4;&#x503C;&apos;)
  } else {
    console.log(x) 
  }

}

test() // &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">if</span>(!(<span class="hljs-built_in">Object</span>.prototype.toString.call(x) === <span class="hljs-string">&quot;[object Undefined]&quot;</span>)) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x9ED8;&#x8BA4;&#x503C;&apos;</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(x) 
  }

}

test() <span class="hljs-comment">// &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;</span></code></pre><h2 id="articleHeader4">2. ES6&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;</h2><h3 id="articleHeader5">2.1 &#x57FA;&#x672C;&#x7528;&#x6CD5;</h3><blockquote>&#x5176;&#x5B9E;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x53C2;&#x6570;&#x540E;&#x9762;&#x52A0;&#x4E2A; = &#x53F7;&#x5C31;&#x884C;&#x5566;&#xFF0C;&#x770B;&#x6817;&#x5B50;&#x5427;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(x = &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;) {
  console.log(x) 
}

test() // &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">x = <span class="hljs-string">&apos;&#x9ED8;&#x8BA4;&#x503C;&apos;</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(x) 
}

test() <span class="hljs-comment">// &apos;&#x9ED8;&#x8BA4;&#x503C;&apos;</span></code></pre><blockquote>&#x5982;&#x679C;&#x8981;&#x7ED9;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#xFF0C;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x5199;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(x = &apos;&#x9ED8;&#x8BA4;&#x503C;1&apos;,y = &apos;&#x9ED8;&#x8BA4;&#x503C;2&apos;) {
  console.log(x,y) 
}

test() // &#x9ED8;&#x8BA4;&#x503C;1 &#x9ED8;&#x8BA4;&#x503C;2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">x = <span class="hljs-string">&apos;&#x9ED8;&#x8BA4;&#x503C;1&apos;</span>,y = <span class="hljs-string">&apos;&#x9ED8;&#x8BA4;&#x503C;2&apos;</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(x,y) 
}

test() <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x503C;1 &#x9ED8;&#x8BA4;&#x503C;2</span></code></pre><blockquote>&#x4F46;&#x8FD9;&#x672C;&#x8D28;&#x4E0A;&#x5176;&#x5B9E;&#x8FD8;&#x662F;&#x5BF9;<code>undefined</code>&#x505A;&#x5224;&#x65AD;&#xFF0C;&#x662F;<code>1.2&#x5C0F;&#x8282;</code>&#x7684;&#x8BED;&#x6CD5;&#x7CD6;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(x = 1) {
    console.log(x)
}
f(undefined) // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x = <span class="hljs-number">1</span></span>) </span>{
    <span class="hljs-built_in">console</span>.log(x)
}
f(<span class="hljs-literal">undefined</span>) <span class="hljs-comment">// 1</span></code></pre><h3 id="articleHeader6">2.2 &#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x60F0;&#x6027;&#x6C42;&#x503C;</h3><blockquote>&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x4E0D;&#x8BB0;&#x5F55;&#x503C;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;<strong>&#x91CD;&#x65B0;&#x8BA1;&#x7B97;</strong>&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08; ES6&#x6DF1;&#x5165;&#x6D45;&#x51FA; &#x7684;&#x4F8B;&#x5B50;
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101 &#x800C;&#x4E0D;&#x662F; 100" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08; ES6&#x6DF1;&#x5165;&#x6D45;&#x51FA; &#x7684;&#x4F8B;&#x5B50;</span>
<span class="hljs-keyword">let</span> x = <span class="hljs-number">99</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">p = x + <span class="hljs-number">1</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(p);
}

foo() <span class="hljs-comment">// 100</span>

x = <span class="hljs-number">100</span>;
foo() <span class="hljs-comment">// 101 &#x800C;&#x4E0D;&#x662F; 100</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mdn&#x7684;&#x4F8B;&#x5B50;
function append(value, array = []) {
  array.push(value);
  return array;
}

append(1); //[1]
append(2); //[2] &#x800C;&#x4E0D;&#x662F; [1, 2]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// mdn&#x7684;&#x4F8B;&#x5B50;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">append</span>(<span class="hljs-params">value, array = []</span>) </span>{
  array.push(value);
  <span class="hljs-keyword">return</span> array;
}

append(<span class="hljs-number">1</span>); <span class="hljs-comment">//[1]</span>
append(<span class="hljs-number">2</span>); <span class="hljs-comment">//[2] &#x800C;&#x4E0D;&#x662F; [1, 2]</span></code></pre><blockquote>&#x6709;&#x540C;&#x5B66;&#x4E00;&#x5B9A;&#x4F1A;&#x6709;&#x7591;&#x95EE;&#xFF0C;&#x8FD9;&#x4E0D;&#x662F;&#x5E9F;&#x8BDD;&#x5417;&#xFF1F;&#x5176;&#x5B9E;&#x4E0D;&#x7136;&#xFF0C;&#x6BD4;&#x5982;<code>Python</code>&#x7684;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x60F0;&#x6027;&#x6C42;&#x503C;&#xFF0C;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt;&gt;&gt; def f1(data=[]):
...     data.append(1)
...     return data
...
&gt;&gt;&gt; f1()
[1]
&gt;&gt;&gt; f1()
[1, 1]
&gt;&gt;&gt; f1()
[1, 1, 1]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="python hljs"><code class="python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f1</span><span class="hljs-params">(data=[])</span>:</span>
<span class="hljs-meta">... </span>    data.append(<span class="hljs-number">1</span>)
<span class="hljs-meta">... </span>    <span class="hljs-keyword">return</span> data
...
<span class="hljs-meta">&gt;&gt;&gt; </span>f1()
[<span class="hljs-number">1</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>f1()
[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>f1()
[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>]</code></pre><h1 id="articleHeader7">&#x4E8C;&#x3001;&#x5269;&#x4F59;&#x53C2;&#x6570;</h1><blockquote>&#x51FD;&#x6570;&#x5269;&#x4F59;&#x53C2;&#x6570;&#x7684;&#x82F1;&#x6587;&#x4E3A; &#x2014;&#x2014; <code>Functions Rest Parameters</code>&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x5269;&#x4F59;&#x53C2;&#x6570;&#x4E3A;<code>rest&#x53C2;&#x6570;</code></blockquote><h2 id="articleHeader8">1. &#x57FA;&#x672C;&#x6982;&#x5FF5;</h2><blockquote><strong>&#x6CE8;&#xFF1A;&#x6982;&#x5FF5;&#x6458;&#x81EA;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x300A;ECMAScript 6 &#x5165;&#x95E8;&#x300B;</strong><br>ES6 &#x5F15;&#x5165; rest &#x53C2;&#x6570;&#xFF08;&#x5F62;&#x5F0F;&#x4E3A;<code>...&#x53D8;&#x91CF;&#x540D;</code>&#xFF09;&#xFF0C;&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x7684;&#x591A;&#x4F59;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528;arguments&#x5BF9;&#x8C61;&#x4E86;&#x3002;rest &#x53C2;&#x6570;&#x642D;&#x914D;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8BE5;&#x53D8;&#x91CF;&#x5C06;&#x591A;&#x4F59;&#x7684;&#x53C2;&#x6570;&#x653E;&#x5165;&#x6570;&#x7EC4;&#x4E2D;&#x3002;</blockquote><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x6982;&#x5FF5;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x81F3;&#x5C11;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x5982;&#x4E0B;&#x4E09;&#x4E2A;&#x4FE1;&#x606F;</p><ol><li><strong>&#x8BED;&#x6CD5;</strong>&#x2014;&#x2014;<code>...</code>+<code>&#x53D8;&#x91CF;</code>&#x3002;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;<strong>&#x6570;&#x7EC4;</strong>&#xFF0C;&#x7528;&#x6765;&#x5B58;&#x653E;&#x591A;&#x4F59;&#x7684;&#x53C2;&#x6570;</li><li><strong>&#x4F5C;&#x7528;</strong>&#x2014;&#x2014;&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x7684;<code>&#x591A;&#x4F59;&#x53C2;&#x6570;</code></li><li><strong>&#x8BED;&#x6CD5;&#x7CD6;</strong>&#x2014;&#x2014;rest&#x53C2;&#x6570;&#x4E00;&#x5B9A;&#x662F;arguments&#x5BF9;&#x8C61;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;</li></ol><h3 id="articleHeader9">1.1 &#x57FA;&#x672C;&#x7528;&#x6CD5;</h3><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8981;&#x641E;&#x6E05;&#x695A;&#x4EC0;&#x4E48;&#x662F;<code>&#x591A;&#x4F59;&#x53C2;&#x6570;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(x, y) {
  return x + y
}

sum(1, 2, &apos;&#x591A;&#x4F59;1&apos;, &apos;&#x591A;&#x4F59;2&apos;, &apos;&#x591A;&#x4F59;3&apos;) // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">return</span> x + y
}

sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&apos;&#x591A;&#x4F59;1&apos;</span>, <span class="hljs-string">&apos;&#x591A;&#x4F59;2&apos;</span>, <span class="hljs-string">&apos;&#x591A;&#x4F59;3&apos;</span>) <span class="hljs-comment">// 3</span></code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;sum&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x4F20;&#x9012;&#xFF0C;&#x4F46;&#x662F;&#x7528;&#x6237;&#x4F20;&#x9012;&#x4E86;&#x4E94;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x5373;&#x4F7F;&#x4F20;&#x9012;&#x4E5F;&#x662F;&#x65E0;&#x6CD5;&#x88AB;sum&#x51FD;&#x6570;&#x4F7F;&#x7528;&#xFF0C;&#x663E;&#x5F97;&#x6709;&#x4E9B;<code>&#x591A;&#x4F59;</code></p><p><strong>&#x8FD9;&#x91CC;&#x7684;&#x591A;&#x4F59;&#x5E76;&#x4E0D;&#x662F;&#x65E0;&#x7528;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x800C;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x88AB;&#x4F7F;&#x7528;&#x5230;&#x4E86;&#x7684;&#x53C2;&#x6570;&#x663E;&#x5F97;&#x591A;&#x4F59;&#x800C;&#x5DF2;</strong></p><p>&#x90A3;&#x4E48;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E5F;&#x60F3;&#x5BF9;&#x8FD9;&#x4E9B;&#x591A;&#x4F59;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x7684;&#x8BDD;&#x5C31;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>rest&#x53C2;&#x6570;</code>&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7528;rest&#x53C2;&#x6570;&#x6539;&#x5199;&#x4E4B;&#x540E;
function sum(x, y, ...paraArr) {
  console.log(paraArr)
  return x + y
}

sum(1, 2, &apos;&#x591A;&#x4F59;1&apos;, &apos;&#x591A;&#x4F59;2&apos;, &apos;&#x591A;&#x4F59;3&apos;) 
// [&quot;&#x591A;&#x4F59;1&quot;, &quot;&#x591A;&#x4F59;2&quot;, &quot;&#x591A;&#x4F59;3&quot;] 3 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x7528;rest&#x53C2;&#x6570;&#x6539;&#x5199;&#x4E4B;&#x540E;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">x, y, ...paraArr</span>) </span>{
  <span class="hljs-built_in">console</span>.log(paraArr)
  <span class="hljs-keyword">return</span> x + y
}

sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&apos;&#x591A;&#x4F59;1&apos;</span>, <span class="hljs-string">&apos;&#x591A;&#x4F59;2&apos;</span>, <span class="hljs-string">&apos;&#x591A;&#x4F59;3&apos;</span>) 
<span class="hljs-comment">// [&quot;&#x591A;&#x4F59;1&quot;, &quot;&#x591A;&#x4F59;2&quot;, &quot;&#x591A;&#x4F59;3&quot;] 3 </span></code></pre><h3 id="articleHeader10">1.2 &#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4F1A;&#x7528;&#x5230;rest&#x53C2;&#x6570;&#xFF1F;</h3><p>&#x65E2;&#x7136;rest&#x53C2;&#x6570;&#x662F;arguments&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;<strong>&#x53EA;&#x8981;&#x641E;&#x6E05;&#x695A;&#x4EE5;&#x5F80;arguments&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x662F;&#x4EC0;&#x4E48;</strong>&#xFF0C;&#x90A3;&#x4E48;&#x81EA;&#x7136;&#x5C31;&#x61C2;&#x5F97;&#x5982;&#x4F55;&#x4F7F;&#x7528;rest&#x53C2;&#x6570;&#x4E86;&#x3002;</p><p>&#x4E0B;&#x9762;&#x770B;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;arguments&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;sum&#x51FD;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#x529F;&#x80FD;
// sum() // 0
// sum(1) // 1
// sum(2,10,2) // 14
// sum(0,0,200,1) // 201
// sum(1,10,3,2,100) // 116

function sum() {
  let total = 0
  for (let i = 0; i &lt; arguments.length; i++) {
      total += arguments[i]
  }
  return total
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;sum&#x51FD;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#x529F;&#x80FD;</span>
<span class="hljs-comment">// sum() // 0</span>
<span class="hljs-comment">// sum(1) // 1</span>
<span class="hljs-comment">// sum(2,10,2) // 14</span>
<span class="hljs-comment">// sum(0,0,200,1) // 201</span>
<span class="hljs-comment">// sum(1,10,3,2,100) // 116</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
      total += <span class="hljs-built_in">arguments</span>[i]
  }
  <span class="hljs-keyword">return</span> total
}</code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x5176;&#x6700;&#x5927;&#x7684;&#x7279;&#x70B9;&#x662F;<code>&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x786E;&#x5B9A;</code>&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x9047;&#x5230;<code>&#x51FD;&#x6570;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x786E;&#x5B9A;</code>&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5C31;&#x8981;&#x4F18;&#x5148;&#x8003;&#x8651;&#x4F7F;&#x7528;<code>rest&#x53C2;&#x6570;</code>&#xFF0C;&#x800C;&#x4E14;&#x7531;&#x4E8E;<code>rest&#x53C2;&#x6570;</code>&#x662F;<strong>&#x771F;&#x6570;&#x7EC4;</strong>&#xFF0C;&#x4F60;&#x7528;&#x8D77;&#x6765;&#x4F1A;&#x6BD4;arguments&#x8212;&#x670D;&#x592A;&#x591A;<br>&#x4E0B;&#x9762;&#x662F;&#x7528;rest&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x6539;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;sum&#x51FD;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#x529F;&#x80FD;
// sum() // 0
// sum(1) // 1
// sum(2,10,2) // 14
// sum(0,0,200,1) // 201
// sum(1,10,3,2,100) // 116

function sum(...paraArr) {
  let total = 0
  paraArr.forEach(e =&gt; total += e)
  return total
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;sum&#x51FD;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#x529F;&#x80FD;</span>
<span class="hljs-comment">// sum() // 0</span>
<span class="hljs-comment">// sum(1) // 1</span>
<span class="hljs-comment">// sum(2,10,2) // 14</span>
<span class="hljs-comment">// sum(0,0,200,1) // 201</span>
<span class="hljs-comment">// sum(1,10,3,2,100) // 116</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">...paraArr</span>) </span>{
  <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>
  paraArr.forEach(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> total += e)
  <span class="hljs-keyword">return</span> total
}</code></pre><h2 id="articleHeader11">2. &#x62D3;&#x5C55;&#xFF1A;&#x628A;arguments&#x8F6C;&#x6362;&#x4E3A;&#x771F;&#x6570;&#x7EC4;&#x7684;&#x4E09;&#x79CD;&#x65B9;&#x5F0F;</h2><blockquote>arguments&#x56E0;&#x4E3A;&#x80FD;&#x83B7;&#x53D6;&#x5230;&#x6240;&#x6709;&#x53C2;&#x6570;&#x6240;&#x4EE5;&#x8FD8;&#x662F;&#x6709;&#x5B83;&#x7684;&#x4E0D;&#x53EF;&#x66FF;&#x4EE3;&#x6027;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5176;&#x4F2A;&#x6570;&#x7EC4;&#x7684;&#x7279;&#x6027;&#x5B9E;&#x5728;&#x6709;&#x70B9;&#x6076;&#x5FC3;&#xFF0C;&#x4E0B;&#x9762;&#x6559;&#x5927;&#x5BB6;&#x4E09;&#x79CD;&#x65B9;&#x6CD5;&#x8F6C;&#x6362;&#xFF0C;&#x7B2C;&#x4E00;&#x79CD;&#x662F;ES5&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5269;&#x4E0B;&#x4E24;&#x79CD;&#x662F;ES6&#x7684;&#x65B9;&#x6CD5;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum() {
  let arr1 = Array.prototype.slice.call(arguments)
  let arr2 = Array.from(arguments)
  let arr3 = [...arguments] // &#x8FD9;&#x4E2A;&#x662F;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x3010;spread syntax&#x3011; &#x6211;&#x4F1A;&#x5728;ES6&#x6307;&#x5317;&#x7684;&#x4E0B;&#x4E00;&#x7AE0;&#x8BB2;&#x89E3;&#xFF0C;&#x656C;&#x8BF7;&#x5173;&#x6CE8;~~
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> arr1 = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)
  <span class="hljs-keyword">let</span> arr2 = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>)
  <span class="hljs-keyword">let</span> arr3 = [...arguments] <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x662F;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x3010;spread syntax&#x3011; &#x6211;&#x4F1A;&#x5728;ES6&#x6307;&#x5317;&#x7684;&#x4E0B;&#x4E00;&#x7AE0;&#x8BB2;&#x89E3;&#xFF0C;&#x656C;&#x8BF7;&#x5173;&#x6CE8;~~</span>
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6指北【4】——ES6的函数参数处理，超乎你想象

## 原文链接
[https://segmentfault.com/a/1190000016002003](https://segmentfault.com/a/1190000016002003)


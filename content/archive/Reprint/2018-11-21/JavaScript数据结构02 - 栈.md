---
title: 'JavaScript数据结构02 - 栈' 
date: 2018-11-21 2:30:10
hidden: true
slug: dz2zhhyxwss
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x5B9A;&#x4E49;</h2><h3 id="articleHeader1">1.1 &#x80CC;&#x666F;</h3><p>&#x901A;&#x8FC7;&#x524D;&#x9762;&#x4E00;&#x8282;<a href="https://segmentfault.com/a/1190000015765638">&#x300A;JavaScript&#x6570;&#x636E;&#x7ED3;&#x6784;01 - &#x6570;&#x7EC4;&#x300B;</a>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x6570;&#x7EC4;&#x7684;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x4E0A;&#x5220;&#x9664;&#x6216;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x79CD;&#x5728;&#x6DFB;&#x52A0;&#x6216;&#x5220;&#x9664;&#x5143;&#x7D20;&#x65F6;&#x6709;&#x66F4;&#x591A;&#x63A7;&#x5236;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;</p><p>&#x6709;&#x4E24;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x5728;&#x6DFB;&#x52A0;&#x548C;&#x5220;&#x9664;&#x5143;&#x7D20;&#x65F6;&#x66F4;&#x4E3A;&#x53EF;&#x63A7;&#x3002;</p><p>&#x5B83;&#x4EEC;&#x5C31;&#x662F;<strong>&#x6808;&#x548C;&#x961F;&#x5217;</strong>&#x3002;</p><h3 id="articleHeader2">1.2 &#x6982;&#x5FF5;</h3><p><strong>&#x6808;</strong>&#x662F;&#x4E00;&#x79CD;&#x9075;&#x5FAA;&#x540E;&#x8FDB;&#x5148;&#x51FA;&#xFF08;LIFO&#xFF09;&#x539F;&#x5219;&#x7684;&#x6709;&#x5E8F;&#x96C6;&#x5408;&#x3002;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x6216;&#x5F85;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x4FDD;&#x5B58;&#x5728;&#x6808;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x79F0;&#x4F5C;<strong>&#x6808;&#x9876;</strong>&#xFF0C;&#x53E6;&#x4E00;&#x7AEF;&#x5C31;&#x53EB;<strong>&#x6808;&#x5E95;</strong>&#x3002;</p><p>&#x5728;&#x6808;&#x91CC;&#xFF0C;&#x65B0;&#x5143;&#x7D20;&#x90FD;&#x9760;&#x8FD1;&#x6808;&#x9876;&#xFF0C;&#x65E7;&#x5143;&#x7D20;&#x90FD;&#x63A5;&#x8FD1;&#x6808;&#x5E95;&#x3002;</p><p>&#x6808;&#x4E5F;&#x88AB;&#x7528;&#x5728;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x7684;&#x7F16;&#x8BD1;&#x5668;&#x548C;&#x5185;&#x5B58;&#x4E2D;&#x4FDD;&#x5B58;&#x53D8;&#x91CF;&#x3001;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x7B49;&#xFF0C;&#x6BD4;&#x5982;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x6808;&#x3002;</p><h2 id="articleHeader3">&#x4E8C;&#x3001;&#x6808;&#x7684;&#x5B9E;&#x73B0;</h2><h3 id="articleHeader4">2.1 &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#x6765;&#x8868;&#x793A;&#x6808;</h3><p>&#x8FD9;&#x91CC;&#x6211;&#x8FD8;&#x662F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x6765;&#x4E66;&#x5199;&#xFF0C;&#x5927;&#x5BB6;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x7528;ES6&#x7684;Class&#x6765;&#x91CD;&#x5199;&#x4E00;&#x904D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Stack&#x7C7B;
function Stack () {
  this.items = [];

  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.isEmpty = isEmpty;
  this.clear = clear;
  this.size = size;
  this.print = print;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-comment">// Stack&#x7C7B;</span>
function Stack () {
  <span class="hljs-keyword">this</span>.items = [];

  <span class="hljs-keyword">this</span>.push = push;
  <span class="hljs-keyword">this</span>.pop = pop;
  <span class="hljs-keyword">this</span>.<span class="hljs-built_in">peek</span> = <span class="hljs-built_in">peek</span>;
  <span class="hljs-keyword">this</span>.isEmpty = isEmpty;
  <span class="hljs-keyword">this</span>.<span class="hljs-built_in">clear</span> = <span class="hljs-built_in">clear</span>;
  <span class="hljs-keyword">this</span>.<span class="hljs-built_in">size</span> = <span class="hljs-built_in">size</span>;
  <span class="hljs-keyword">this</span>.<span class="hljs-built_in">print</span> = <span class="hljs-built_in">print</span>;
}</code></pre><p>&#x6808;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x58F0;&#x660E;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>push(element)&#xFF1A;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#xFF08;&#x6216;&#x51E0;&#x4E2A;&#xFF09;&#x65B0;&#x5143;&#x7D20;&#x5230;&#x6808;&#x9876;</li><li>pop()&#xFF1A;&#x79FB;&#x9664;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x540C;&#x65F6;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;</li><li>peek()&#xFF1A;&#x8FD4;&#x56DE;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x5BF9;&#x6808;&#x505A;&#x4EFB;&#x4F55;&#x4FEE;&#x6539;</li><li>isEmpty()&#xFF1A;&#x5982;&#x679C;&#x6808;&#x91CC;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x5C31;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false</li><li>clear()&#xFF1A;&#x79FB;&#x9664;&#x6808;&#x91CC;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;</li><li>size()&#xFF1A;&#x8FD4;&#x56DE;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;</li></ul><h3 id="articleHeader5">2.2 &#x5B9E;&#x73B0;&#x6808;&#x4E2D;&#x7684;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#x5230;&#x6808;&#x9876;
function push (element) {
  this.items.push(element);
}

// &#x79FB;&#x9664;&#x6808;&#x9876;&#x5143;&#x7D20;&#xFF0C;&#x540C;&#x65F6;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;
function pop () {
  return this.items.pop();
}

// &#x67E5;&#x770B;&#x6808;&#x9876;&#x5143;&#x7D20;
function peek () {
  return this.items[this.items.length - 1];
}

// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x6808;
function isEmpty () {
  return this.items.length === 0;
}

// &#x6E05;&#x7A7A;&#x6808;
function clear () {
  this.items = [];
}

// &#x67E5;&#x8BE2;&#x6808;&#x7684;&#x957F;&#x5EA6;
function size () {
  return this.items.length;
}

// &#x6253;&#x5370;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;
function print () {
  console.log(this.items.toString());
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#x5230;&#x6808;&#x9876;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">push</span> (<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">this</span>.items.push(element);
}

<span class="hljs-comment">// &#x79FB;&#x9664;&#x6808;&#x9876;&#x5143;&#x7D20;&#xFF0C;&#x540C;&#x65F6;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pop</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items.pop();
}

<span class="hljs-comment">// &#x67E5;&#x770B;&#x6808;&#x9876;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">peek</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items[<span class="hljs-keyword">this</span>.items.length - <span class="hljs-number">1</span>];
}

<span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x6808;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmpty</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items.length === <span class="hljs-number">0</span>;
}

<span class="hljs-comment">// &#x6E05;&#x7A7A;&#x6808;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clear</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.items = [];
}

<span class="hljs-comment">// &#x67E5;&#x8BE2;&#x6808;&#x7684;&#x957F;&#x5EA6;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">size</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items.length;
}

<span class="hljs-comment">// &#x6253;&#x5370;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.items.toString());
}</code></pre><h3 id="articleHeader6">2.3 &#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;Stack&#x5B9E;&#x4F8B;
var stack = new Stack();

console.log(stack.isEmpty());     // true
stack.push(5);                    // undefined
stack.push(8);                    // undefined
console.log(stack.peek());        // 8
stack.push(11);                   // undefined
console.log(stack.size());        // 3
console.log(stack.isEmpty());     // false
stack.push(15);                   // undefined
stack.pop();                      // 15
console.log(stack.size());        // 3
stack.print();                    // 5,8,11
stack.clear();                    // undefined
console.log(stack.size());        // 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// &#x521B;&#x5EFA;Stack&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">stack</span> = new <span class="hljs-keyword">Stack</span>();

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.isEmpty());     <span class="hljs-comment">// true</span>
<span class="hljs-keyword">stack</span>.push(5);                    <span class="hljs-comment">// undefined</span>
<span class="hljs-keyword">stack</span>.push(8);                    <span class="hljs-comment">// undefined</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.peek());        <span class="hljs-comment">// 8</span>
<span class="hljs-keyword">stack</span>.push(11);                   <span class="hljs-comment">// undefined</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.size());        <span class="hljs-comment">// 3</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.isEmpty());     <span class="hljs-comment">// false</span>
<span class="hljs-keyword">stack</span>.push(15);                   <span class="hljs-comment">// undefined</span>
<span class="hljs-keyword">stack</span>.pop();                      <span class="hljs-comment">// 15</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.size());        <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">stack</span>.<span class="hljs-keyword">print</span>();                    <span class="hljs-comment">// 5,8,11</span>
<span class="hljs-keyword">stack</span>.<span class="hljs-keyword">clear</span>();                    <span class="hljs-comment">// undefined</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.size());        <span class="hljs-comment">// 0</span></code></pre><h2 id="articleHeader7">&#x4E09;&#x3001;&#x7ED3;&#x675F;</h2><p>&#x672C;&#x6587;&#x4F1A;&#x540C;&#x6B65;&#x5230;&#x6211;&#x7684;<a href="https://blog.liuxuan.site" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a>&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5230;&#x6211;&#x7684;<a href="https://github.com/leocoder351/data-structure" rel="nofollow noreferrer" target="_blank">github&#x4ED3;&#x5E93;&#x67E5;&#x770B;</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#x6B22;&#x8FCE;&#x70B9;&#x4E00;&#x4E2A;Star~~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数据结构02 - 栈

## 原文链接
[https://segmentfault.com/a/1190000015768412](https://segmentfault.com/a/1190000015768412)


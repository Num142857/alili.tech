---
title: 'JavaScript数据结构03 - 队列' 
date: 2018-11-21 2:30:09
hidden: true
slug: p07kgpv91m
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x5B9A;&#x4E49;</h2><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x5B66;&#x4E60;&#x4E86;<a href="https://segmentfault.com/a/1190000015768412">&#x6808;&#x7684;&#x5B9E;&#x73B0;</a>&#xFF0C;&#x961F;&#x5217;&#x548C;&#x6808;&#x975E;&#x5E38;&#x7C7B;&#x4F3C;&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528;&#x4E86;&#x4E0D;&#x540C;&#x7684;&#x539F;&#x5219;&#xFF0C;&#x800C;&#x975E;&#x540E;&#x8FDB;&#x5148;&#x51FA;&#x3002;</p><p><strong>&#x961F;&#x5217;</strong>&#x662F;&#x9075;&#x5FAA;FIFO&#xFF08;First In First Out&#xFF0C;&#x5148;&#x8FDB;&#x5148;&#x51FA;&#xFF09;&#x539F;&#x5219;&#x7684;&#x4E00;&#x7EC4;&#x6709;&#x5E8F;&#x7684;&#x9879;&#x3002;&#x961F;&#x5217;&#x5728;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4ECE;&#x9876;&#x90E8;&#x79FB;&#x9664;&#x5143;&#x7D20;&#x3002;&#x6700;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&#x5FC5;&#x987B;&#x6392;&#x5728;&#x961F;&#x5217;&#x7684;&#x672B;&#x5C3E;&#x3002;</p><p>&#x5728;&#x8BA1;&#x7B97;&#x673A;&#x79D1;&#x5B66;&#x4E2D;&#xFF0C;&#x4E00;&#x4E2A;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x662F;<strong>&#x6253;&#x5370;&#x961F;&#x5217;</strong>&#x3002;&#x6BD4;&#x5982;&#x8BF4;&#x6211;&#x4EEC;&#x8981;&#x6253;&#x5370;&#x4E94;&#x4EFD;&#x6587;&#x6863;&#x3002;&#x6211;&#x4EEC;&#x4F1A;&#x6253;&#x5F00;&#x6BCF;&#x4E2A;&#x6587;&#x6863;&#xFF0C;&#x7136;&#x540E;&#x70B9;&#x51FB;&#x6253;&#x5370;&#x6309;&#x94AE;&#x3002;&#x6BCF;&#x4E2A;&#x6587;&#x6863;&#x90FD;&#x4F1A;&#x88AB;&#x53D1;&#x9001;&#x81F3;&#x6253;&#x5370;&#x961F;&#x5217;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53D1;&#x9001;&#x5230;&#x6253;&#x5370;&#x961F;&#x5217;&#x7684;&#x6587;&#x6863;&#x4F1A;&#x9996;&#x5148;&#x88AB;&#x6253;&#x5370;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#xFF0C;&#x76F4;&#x5230;&#x6253;&#x5370;&#x5B8C;&#x6240;&#x6709;&#x6587;&#x6863;&#x3002;</p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x961F;&#x5217;&#x7684;&#x5B9E;&#x73B0;</h2><h3 id="articleHeader2">2.1 &#x666E;&#x901A;&#x961F;&#x5217;</h3><p>&#x521B;&#x5EFA;&#x666E;&#x901A;&#x961F;&#x5217;&#x7C7B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Queue&#x7C7B;
function Queue () {
  this.items = [];

  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.isEmpty = isEmpty;
  this.size = size;
  this.clear = clear;
  this.print = print;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// Queue&#x7C7B;</span>
function Queue () {
  <span class="hljs-keyword">this</span>.items = [];

  <span class="hljs-keyword">this</span>.enqueue = enqueue;
  <span class="hljs-keyword">this</span>.dequeue = dequeue;
  <span class="hljs-keyword">this</span>.front = front;
  <span class="hljs-keyword">this</span>.isEmpty = isEmpty;
  <span class="hljs-keyword">this</span>.size = size;
  <span class="hljs-keyword">this</span>.clear = clear;
  <span class="hljs-keyword">this</span>.print = print;
}</code></pre><p>&#x961F;&#x5217;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x58F0;&#x660E;&#x7684;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>enqueue(element)&#xFF1A;&#x5411;&#x961F;&#x5217;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x65B0;&#x9879;</li><li>dequeue()&#xFF1A;&#x79FB;&#x9664;&#x961F;&#x5217;&#x7684;&#x7B2C;&#x4E00;&#x9879;&#xFF08;&#x5373;&#x6392;&#x5728;&#x961F;&#x5217;&#x6700;&#x524D;&#x9762;&#x7684;&#x9879;&#xFF09;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;</li><li>front()&#xFF1A;&#x8FD4;&#x56DE;&#x961F;&#x5217;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x961F;&#x5217;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x53D8;&#x52A8;&#xFF0C;&#x548C;Stack&#x7684;peek()&#x65B9;&#x6CD5;&#x7C7B;&#x4F3C;</li><li>isEmpty()&#xFF1A;&#x5982;&#x679C;&#x961F;&#x5217;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false</li><li>size()&#xFF1A;&#x8FD4;&#x56DE;&#x961F;&#x5217;&#x5305;&#x542B;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E0E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;</li><li>print()&#xFF1A;&#x6253;&#x5370;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x5143;&#x7D20;</li><li>clear()&#xFF1A;&#x6E05;&#x7A7A;&#x6574;&#x4E2A;&#x961F;&#x5217;</li></ul><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x4E00;&#x5B9E;&#x73B0;&#x8FD9;&#x4E9B;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5411;&#x961F;&#x5217;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x5143;&#x7D20;
function enqueue (element) {
  this.items.push(element);
}

// &#x79FB;&#x9664;&#x961F;&#x5217;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;
function dequeue () {
  return this.items.shift();
}

// &#x8FD4;&#x56DE;&#x961F;&#x5217;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;
function front () {
  return this.items[0];
}

// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x961F;&#x5217;
function isEmpty () {
  return this.items.length === 0;
}

// &#x83B7;&#x53D6;&#x961F;&#x5217;&#x7684;&#x957F;&#x5EA6;
function size () {
  return this.items.length;
}

// &#x6E05;&#x7A7A;&#x961F;&#x5217;
function clear () {
  this.items = [];
}

// &#x6253;&#x5370;&#x961F;&#x5217;&#x91CC;&#x7684;&#x5143;&#x7D20;
function print () {
  console.log(this.items.toString());
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x5411;&#x961F;&#x5217;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueue</span> (<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">this</span>.items.push(element);
}

<span class="hljs-comment">// &#x79FB;&#x9664;&#x961F;&#x5217;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dequeue</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items.shift();
}

<span class="hljs-comment">// &#x8FD4;&#x56DE;&#x961F;&#x5217;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">front</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items[<span class="hljs-number">0</span>];
}

<span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x961F;&#x5217;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmpty</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items.length === <span class="hljs-number">0</span>;
}

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x961F;&#x5217;&#x7684;&#x957F;&#x5EA6;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">size</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.items.length;
}

<span class="hljs-comment">// &#x6E05;&#x7A7A;&#x961F;&#x5217;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clear</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.items = [];
}

<span class="hljs-comment">// &#x6253;&#x5370;&#x961F;&#x5217;&#x91CC;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.items.toString());
}</code></pre><p>&#x521B;&#x5EFA;&#x666E;&#x901A;&#x961F;&#x5217;&#x5B9E;&#x4F8B;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;Queue&#x5B9E;&#x4F8B;
var queue = new Queue();

console.log(queue.isEmpty());     // true
queue.enqueue(&quot;John&quot;);            // undefined
queue.enqueue(&quot;Jack&quot;);            // undefined
queue.enqueue(&quot;Camila&quot;);          // undefined
queue.print();                    // &quot;John,Jack,Camila&quot;
console.log(queue.size());        // 3
console.log(queue.isEmpty());     // false
queue.dequeue();                  // &quot;John&quot;
queue.dequeue();                  // &quot;Jack&quot;
queue.print();                    // &quot;Camila&quot;
queue.clear();                    // undefined
console.log(queue.size());        // 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-comment">// &#x521B;&#x5EFA;Queue&#x5B9E;&#x4F8B;</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">queue</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Queue</span>();

console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">queue</span>.isEmpty());     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">queue</span>.enqueue(<span class="hljs-string">&quot;John&quot;</span>);            <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">queue</span>.enqueue(<span class="hljs-string">&quot;Jack&quot;</span>);            <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">queue</span>.enqueue(<span class="hljs-string">&quot;Camila&quot;</span>);          <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">queue</span>.print();                    <span class="hljs-comment">// &quot;John,Jack,Camila&quot;</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">queue</span>.size());        <span class="hljs-comment">// 3</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">queue</span>.isEmpty());     <span class="hljs-comment">// false</span>
<span class="hljs-built_in">queue</span>.dequeue();                  <span class="hljs-comment">// &quot;John&quot;</span>
<span class="hljs-built_in">queue</span>.dequeue();                  <span class="hljs-comment">// &quot;Jack&quot;</span>
<span class="hljs-built_in">queue</span>.print();                    <span class="hljs-comment">// &quot;Camila&quot;</span>
<span class="hljs-built_in">queue</span>.clear();                    <span class="hljs-comment">// undefined</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">queue</span>.size());        <span class="hljs-comment">// 0</span></code></pre><h3 id="articleHeader3">2.2 &#x4F18;&#x5148;&#x961F;&#x5217;</h3><h3 id="articleHeader4">2.2.1 &#x5B9A;&#x4E49;</h3><p>&#x666E;&#x901A;&#x961F;&#x5217;&#x7684;&#x6DFB;&#x52A0;&#x548C;&#x79FB;&#x9664;&#x53EA;&#x4F9D;&#x8D56;&#x4E8E;&#x5148;&#x540E;&#x987A;&#x5E8F;&#xFF0C;&#x5148;&#x6765;&#x7684;&#x5148;&#x6DFB;&#x52A0;&#xFF0C;&#x540E;&#x6765;&#x7684;&#x540E;&#x6DFB;&#x52A0;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x7167;&#x5148;&#x540E;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x4ECE;&#x961F;&#x5217;&#x79FB;&#x9664;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x961F;&#x5217;&#x53EB;<strong>&#x4F18;&#x5148;&#x961F;&#x5217;</strong>&#xFF0C;&#x5143;&#x7D20;&#x7684;&#x6DFB;&#x52A0;&#x548C;&#x79FB;&#x9664;&#x662F;&#x4F9D;&#x8D56;&#x4F18;&#x5148;&#x7EA7;&#x7684;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x73B0;&#x5B9E;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x662F;&#x673A;&#x573A;&#x767B;&#x673A;&#x7684;&#x987A;&#x5E8F;&#x3002;&#x5934;&#x7B49;&#x8231;&#x548C;&#x5546;&#x52A1;&#x8231;&#x4E58;&#x5BA2;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x8981;&#x9AD8;&#x4E8E;&#x7ECF;&#x6D4E;&#x8231;&#x4E58;&#x5BA2;&#x3002;&#x518D;&#x6BD4;&#x5982;&#x706B;&#x8F66;&#xFF0C;&#x8001;&#x5E74;&#x4EBA;&#x3001;&#x5B55;&#x5987;&#x548C;&#x5E26;&#x5C0F;&#x5B69;&#x7684;&#x4E58;&#x5BA2;&#x662F;&#x4EAB;&#x6709;&#x4F18;&#x5148;&#x68C0;&#x7968;&#x6743;&#x7684;&#x3002;</p><h3 id="articleHeader5">2.2.2 &#x5206;&#x7C7B;</h3><p><strong>&#x4F18;&#x5148;&#x961F;&#x5217;</strong>&#x5206;&#x4E3A;&#x4E24;&#x7C7B;&#xFF1A;</p><ol><li><strong>&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;</strong></li><li><strong>&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;</strong></li></ol><p><strong>&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;</strong>&#x662F;&#x628A;&#x4F18;&#x5148;&#x7EA7;&#x7684;&#x503C;&#x6700;&#x5C0F;&#x7684;&#x5143;&#x7D20;&#x88AB;&#x653E;&#x7F6E;&#x5230;&#x961F;&#x5217;&#x7684;&#x6700;&#x524D;&#x9762;&#xFF08;&#x4EE3;&#x8868;&#x6700;&#x9AD8;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#xFF09;&#x3002;&#x6BD4;&#x5982;&#x6709;&#x56DB;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;&quot;John&quot;, &quot;Jack&quot;, &quot;Camila&quot;, &quot;Tom&quot;&#xFF0C;&#x4ED6;&#x4EEC;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x503C;&#x5206;&#x522B;&#x4E3A;4&#xFF0C;3&#xFF0C;2&#xFF0C;1&#x3002;</p><p>&#x90A3;&#x4E48;<strong>&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;&#x6392;&#x5E8F;</strong>&#x5E94;&#x8BE5;&#x4E3A;&#xFF1A;<strong>&quot;Tom&quot;&#xFF0C;&quot;Camila&quot;&#xFF0C;&quot;Jack&quot;&#xFF0C;&quot;John&quot;</strong>&#x3002;</p><p><strong>&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;</strong>&#x6B63;&#x597D;&#x76F8;&#x53CD;&#xFF0C;&#x628A;&#x4F18;&#x5148;&#x7EA7;&#x503C;&#x6700;&#x5927;&#x7684;&#x5143;&#x7D20;&#x653E;&#x7F6E;&#x5728;&#x961F;&#x5217;&#x7684;&#x6700;&#x524D;&#x9762;&#xFF0C;&#x4EE5;&#x4E0A;&#x9762;&#x7684;&#x4E3A;&#x4F8B;&#xFF0C;&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;&#x6392;&#x5E8F;&#x5E94;&#x8BE5;&#x4E3A;&#xFF1A;<strong>&quot;John&quot;, &quot;Jack&quot;, &quot;Camila&quot;, &quot;Tom&quot;</strong>&#x3002;</p><h3 id="articleHeader6">2.2.2 &#x5B9E;&#x73B0;</h3><p>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x4F18;&#x5148;&#x961F;&#x5217;&#xFF0C;&#x6709;&#x4E24;&#x79CD;&#x9009;&#x9879;&#xFF1A;</p><ol><li>&#x8BBE;&#x7F6E;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x6B63;&#x786E;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x7136;&#x540E;&#x548C;&#x666E;&#x901A;&#x961F;&#x5217;&#x4E00;&#x6837;&#x6B63;&#x5E38;&#x79FB;&#x9664;</li><li>&#x8BBE;&#x7F6E;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x548C;&#x666E;&#x901A;&#x961F;&#x5217;&#x4E00;&#x6837;&#x6B63;&#x5E38;&#x6309;&#x987A;&#x5E8F;&#x6DFB;&#x52A0;&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x79FB;&#x9664;</li></ol><p>&#x8FD9;&#x91CC;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;&#x548C;&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;&#x6211;&#x90FD;&#x91C7;&#x7528;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x4E00;&#x4E0B;&#x7B2C;&#x4E8C;&#x79CD;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x53EA;&#x91CD;&#x5199;enqueue()&#x65B9;&#x6CD5;&#x548C;print()&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x548C;&#x4E0A;&#x9762;&#x7684;&#x666E;&#x901A;&#x961F;&#x5217;&#x5B8C;&#x5168;&#x76F8;&#x540C;&#x3002;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;<a href="https://github.com/leocoder351/data-structure" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;github</a>&#x3002;</p><p><strong>&#x5B9E;&#x73B0;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;
function MinPriorityQueue () {
  this.items = [];

  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.isEmpty = isEmpty;
  this.size = size;
  this.clear = clear;
  this.print = print;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x5B9A;&#x4E49;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;</span>
function MinPriorityQueue () {
  <span class="hljs-keyword">this</span>.items = [];

  <span class="hljs-keyword">this</span>.enqueue = enqueue;
  <span class="hljs-keyword">this</span>.dequeue = dequeue;
  <span class="hljs-keyword">this</span>.front = front;
  <span class="hljs-keyword">this</span>.isEmpty = isEmpty;
  <span class="hljs-keyword">this</span>.size = size;
  <span class="hljs-keyword">this</span>.clear = clear;
  <span class="hljs-keyword">this</span>.print = print;
}</code></pre><p><strong>&#x5B9E;&#x73B0;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;enqueue()&#x65B9;&#x6CD5;&#x548C;print()&#x65B9;&#x6CD5;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4F18;&#x5148;&#x961F;&#x5217;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x8981;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x5224;&#x65AD;&#x5728;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x63D2;&#x5165;&#x987A;&#x5E8F;
function enqueue (element, priority) {
  var queueElement = {
    element: element,
    priority: priority
  };

  if (this.isEmpty()) {
    this.items.push(queueElement);
  } else {
    var added = false;

    for (var i = 0; i &lt; this.size(); i++) {
      if (queueElement.priority &lt; this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break ;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }
}

// &#x6253;&#x5370;&#x961F;&#x5217;&#x91CC;&#x7684;&#x5143;&#x7D20;
function print () {
  var strArr = [];

  strArr = this.items.map(function (item) {
    return `${item.element}-&gt;${item.priority}`;
  });

  console.log(strArr.toString());
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4F18;&#x5148;&#x961F;&#x5217;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x8981;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x5224;&#x65AD;&#x5728;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x63D2;&#x5165;&#x987A;&#x5E8F;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueue</span> (<span class="hljs-params">element, priority</span>) </span>{
  <span class="hljs-keyword">var</span> queueElement = {
    <span class="hljs-attr">element</span>: element,
    <span class="hljs-attr">priority</span>: priority
  };

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isEmpty()) {
    <span class="hljs-keyword">this</span>.items.push(queueElement);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> added = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.size(); i++) {
      <span class="hljs-keyword">if</span> (queueElement.priority &lt; <span class="hljs-keyword">this</span>.items[i].priority) {
        <span class="hljs-keyword">this</span>.items.splice(i, <span class="hljs-number">0</span>, queueElement);
        added = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">break</span> ;
      }
    }

    <span class="hljs-keyword">if</span> (!added) {
      <span class="hljs-keyword">this</span>.items.push(queueElement);
    }
  }
}

<span class="hljs-comment">// &#x6253;&#x5370;&#x961F;&#x5217;&#x91CC;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> strArr = [];

  strArr = <span class="hljs-keyword">this</span>.items.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${item.element}</span>-&gt;<span class="hljs-subst">${item.priority}</span>`</span>;
  });

  <span class="hljs-built_in">console</span>.log(strArr.toString());
}</code></pre><p>&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;&#x6D4B;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;minPriorityQueue&#x5B9E;&#x4F8B;
var minPriorityQueue = new MinPriorityQueue();

console.log(minPriorityQueue.isEmpty());     // true
minPriorityQueue.enqueue(&quot;John&quot;, 1);         // undefined
minPriorityQueue.enqueue(&quot;Jack&quot;, 3);         // undefined
minPriorityQueue.enqueue(&quot;Camila&quot;, 2);       // undefined
minPriorityQueue.enqueue(&quot;Tom&quot;, 3);          // undefined
minPriorityQueue.print();                    // &quot;John-&gt;1,Camila-&gt;2,Jack-&gt;3,Tom-&gt;3&quot;
console.log(minPriorityQueue.size());        // 4
console.log(minPriorityQueue.isEmpty());     // false
minPriorityQueue.dequeue();                  // {element: &quot;John&quot;, priority: 1}
minPriorityQueue.dequeue();                  // {element: &quot;Camila&quot;, priority: 2}
minPriorityQueue.print();                    // &quot;Jack-&gt;3,Tom-&gt;3&quot;
minPriorityQueue.clear();                    // undefined
console.log(minPriorityQueue.size());        // 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code><span class="hljs-comment">// &#x521B;&#x5EFA;&#x6700;&#x5C0F;&#x4F18;&#x5148;&#x961F;&#x5217;minPriorityQueue&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> minPriorityQueue = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">MinPriorityQueue</span>();

<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(minPriorityQueue.isEmpty());     <span class="hljs-comment">// true</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">John</span>&quot;, <span class="hljs-number">1</span>);         <span class="hljs-comment">// undefined</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">Jack</span>&quot;, <span class="hljs-number">3</span>);         <span class="hljs-comment">// undefined</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">Camila</span>&quot;, <span class="hljs-number">2</span>);       <span class="hljs-comment">// undefined</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">Tom</span>&quot;, <span class="hljs-number">3</span>);          <span class="hljs-comment">// undefined</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">print</span>();                    <span class="hljs-comment">// &quot;John-&gt;1,Camila-&gt;2,Jack-&gt;3,Tom-&gt;3&quot;</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(minPriorityQueue.size());        <span class="hljs-comment">// 4</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(minPriorityQueue.isEmpty());     <span class="hljs-comment">// false</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">dequeue</span>();                  <span class="hljs-comment">// {element: &quot;John&quot;, priority: 1}</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">dequeue</span>();                  <span class="hljs-comment">// {element: &quot;Camila&quot;, priority: 2}</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">print</span>();                    <span class="hljs-comment">// &quot;Jack-&gt;3,Tom-&gt;3&quot;</span>
<span class="hljs-title">minPriorityQueue</span>.<span class="hljs-title">clear</span>();                    <span class="hljs-comment">// undefined</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(minPriorityQueue.size());        <span class="hljs-comment">// 0</span></span></code></pre><p><strong>&#x5B9E;&#x73B0;&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;</strong><br><br>&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;&#x53EA;&#x8981;&#x5C06;&#x4F18;&#x5148;&#x7EA7;&#x7684;&#x5224;&#x65AD;&#x6539;&#x4E3A;&#x5927;&#x4E8E;&#x53F7;&quot;&gt;&quot;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;MaxPriorityQueue&#x7C7B;
function MaxPriorityQueue () {
  this.items = [];

  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.isEmpty = isEmpty;
  this.size = size;
  this.clear = clear;
  this.print = print;
}

// &#x4F18;&#x5148;&#x961F;&#x5217;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x8981;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x5224;&#x65AD;&#x5728;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x63D2;&#x5165;&#x987A;&#x5E8F;
function enqueue (element, priority) {
  var queueElement = {
    element: element,
    priority: priority
  };

  if (this.isEmpty()) {
    this.items.push(queueElement);
  } else {
    var added = false;

    for (var i = 0; i &lt; this.items.length; i++) {
      // &#x6CE8;&#x610F;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5C06;&#x8FD9;&#x91CC;&#x6539;&#x4E3A;&#x5927;&#x4E8E;&#x53F7;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;
      if (queueElement.priority &gt; this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break ;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;MaxPriorityQueue&#x7C7B;</span>
function MaxPriorityQueue () {
  <span class="hljs-keyword">this</span>.items = [];

  <span class="hljs-keyword">this</span>.enqueue = enqueue;
  <span class="hljs-keyword">this</span>.dequeue = dequeue;
  <span class="hljs-keyword">this</span>.front = front;
  <span class="hljs-keyword">this</span>.isEmpty = isEmpty;
  <span class="hljs-keyword">this</span>.size = size;
  <span class="hljs-keyword">this</span>.clear = clear;
  <span class="hljs-keyword">this</span>.print = print;
}

<span class="hljs-comment">// &#x4F18;&#x5148;&#x961F;&#x5217;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x8981;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x5224;&#x65AD;&#x5728;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x63D2;&#x5165;&#x987A;&#x5E8F;</span>
function enqueue (element, priority) {
  <span class="hljs-keyword">var</span> queueElement = {
    element: element,
    priority: priority
  };

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isEmpty()) {
    <span class="hljs-keyword">this</span>.items.push(queueElement);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> added = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.items.length; i++) {
      <span class="hljs-comment">// &#x6CE8;&#x610F;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5C06;&#x8FD9;&#x91CC;&#x6539;&#x4E3A;&#x5927;&#x4E8E;&#x53F7;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</span>
      <span class="hljs-keyword">if</span> (queueElement.priority &gt; <span class="hljs-keyword">this</span>.items[i].priority) {
        <span class="hljs-keyword">this</span>.items.splice(i, <span class="hljs-number">0</span>, queueElement);
        added = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">break</span> ;
      }
    }

    <span class="hljs-keyword">if</span> (!added) {
      <span class="hljs-keyword">this</span>.items.push(queueElement);
    }
  }
}</code></pre><p>&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;&#x6D4B;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;maxPriorityQueue&#x5B9E;&#x4F8B;
var maxPriorityQueue = new MaxPriorityQueue();

console.log(maxPriorityQueue.isEmpty());     // true
maxPriorityQueue.enqueue(&quot;John&quot;, 1);         // undefined
maxPriorityQueue.enqueue(&quot;Jack&quot;, 3);         // undefined
maxPriorityQueue.enqueue(&quot;Camila&quot;, 2);       // undefined
maxPriorityQueue.enqueue(&quot;Tom&quot;, 3);          // undefined
maxPriorityQueue.print();                    // &quot;Jack-&gt;3,Tom-&gt;3,Camila-&gt;2,John-&gt;1&quot;
console.log(maxPriorityQueue.size());        // 4
console.log(maxPriorityQueue.isEmpty());     // false
maxPriorityQueue.dequeue();                  // {element: &quot;Jack&quot;, priority: 3}
maxPriorityQueue.dequeue();                  // {element: &quot;Tom&quot;, priority: 3}
maxPriorityQueue.print();                    // &quot;Camila-&gt;2,John-&gt;1&quot;
maxPriorityQueue.clear();                    // undefined
console.log(maxPriorityQueue.size());        // 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code><span class="hljs-comment">// &#x521B;&#x5EFA;&#x6700;&#x5927;&#x4F18;&#x5148;&#x961F;&#x5217;maxPriorityQueue&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> maxPriorityQueue = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">MaxPriorityQueue</span>();

<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(maxPriorityQueue.isEmpty());     <span class="hljs-comment">// true</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">John</span>&quot;, <span class="hljs-number">1</span>);         <span class="hljs-comment">// undefined</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">Jack</span>&quot;, <span class="hljs-number">3</span>);         <span class="hljs-comment">// undefined</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">Camila</span>&quot;, <span class="hljs-number">2</span>);       <span class="hljs-comment">// undefined</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">enqueue</span>(&quot;<span class="hljs-type">Tom</span>&quot;, <span class="hljs-number">3</span>);          <span class="hljs-comment">// undefined</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">print</span>();                    <span class="hljs-comment">// &quot;Jack-&gt;3,Tom-&gt;3,Camila-&gt;2,John-&gt;1&quot;</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(maxPriorityQueue.size());        <span class="hljs-comment">// 4</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(maxPriorityQueue.isEmpty());     <span class="hljs-comment">// false</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">dequeue</span>();                  <span class="hljs-comment">// {element: &quot;Jack&quot;, priority: 3}</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">dequeue</span>();                  <span class="hljs-comment">// {element: &quot;Tom&quot;, priority: 3}</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">print</span>();                    <span class="hljs-comment">// &quot;Camila-&gt;2,John-&gt;1&quot;</span>
<span class="hljs-title">maxPriorityQueue</span>.<span class="hljs-title">clear</span>();                    <span class="hljs-comment">// undefined</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(maxPriorityQueue.size());        <span class="hljs-comment">// 0</span></span></code></pre><h2 id="articleHeader7">2.3 &#x5FAA;&#x73AF;&#x961F;&#x5217;</h2><p>&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x961F;&#x5217;&#x5B9E;&#x73B0;&#x53EB;&#x505A;<strong>&#x5FAA;&#x73AF;&#x961F;&#x5217;</strong>&#x3002;</p><p>&#x5FAA;&#x73AF;&#x961F;&#x5217;&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x5C31;&#x662F;<strong>&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x6E38;&#x620F;&#xFF08;Hot Potato&#xFF09;</strong>&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x6E38;&#x620F;&#x4E2D;&#xFF0C;&#x5B69;&#x5B50;&#x4EEC;&#x56F4;&#x57CE;&#x4E00;&#x4E2A;&#x5706;&#x5708;&#xFF0C;&#x51FB;&#x9F13;&#x7684;&#x65F6;&#x5019;&#x628A;&#x82B1;&#x5C3D;&#x5FEB;&#x7684;&#x4F20;&#x9012;&#x7ED9;&#x65C1;&#x8FB9;&#x7684;&#x4EBA;&#x3002;&#x67D0;&#x4E00;&#x65F6;&#x523B;&#x51FB;&#x9F13;&#x505C;&#x6B62;&#xFF0C;&#x8FD9;&#x65F6;&#x82B1;&#x5728;&#x8C01;&#x7684;&#x624B;&#x91CC;&#xFF0C;&#x8C01;&#x5C31;&#x9000;&#x51FA;&#x5706;&#x5708;&#x76F4;&#x5230;&#x6E38;&#x620F;&#x7ED3;&#x675F;&#x3002;&#x91CD;&#x590D;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x5230;&#x53EA;&#x5269;&#x4E00;&#x4E2A;&#x5B69;&#x5B50;&#xFF08;&#x80DC;&#x8005;&#xFF09;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5728;&#x666E;&#x901A;&#x961F;&#x5217;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6A21;&#x62DF;&#x7684;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x6E38;&#x620F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9E;&#x73B0;&#x51FB;&#x9F13;&#x4F20;&#x82B1;
function hotPotato (nameList, num) {
  var queue = new Queue();

  for (var i = 0; i &lt; nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  var eliminated = &apos;&apos;;

  while (queue.size() &gt; 1) {
    // &#x5FAA;&#x73AF;num&#x6B21;&#xFF0C;&#x961F;&#x9996;&#x51FA;&#x6765;&#x53BB;&#x5230;&#x961F;&#x5C3E;
    for (var i = 0; i &lt; num; i++) {
      queue.enqueue(queue.dequeue());
    }
    // &#x5FAA;&#x73AF;num&#x6B21;&#x8FC7;&#x540E;&#xFF0C;&#x79FB;&#x9664;&#x5F53;&#x524D;&#x961F;&#x9996;&#x7684;&#x5143;&#x7D20;
    eliminated = queue.dequeue();
    console.log(`${eliminated}&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;`);
  }

  // &#x6700;&#x540E;&#x53EA;&#x5269;&#x4E00;&#x4E2A;&#x5143;&#x7D20;
  return queue.dequeue();
}

// &#x6D4B;&#x8BD5;
var nameList = [&quot;John&quot;, &quot;Jack&quot;, &quot;Camila&quot;, &quot;Ingrid&quot;, &quot;Carl&quot;];
var winner = hotPotato(nameList, 10);
console.log(`&#x6700;&#x540E;&#x7684;&#x80DC;&#x5229;&#x8005;&#x662F;&#xFF1A;${winner}`);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x5B9E;&#x73B0;&#x51FB;&#x9F13;&#x4F20;&#x82B1;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hotPotato</span> (<span class="hljs-params">nameList, num</span>) </span>{
  <span class="hljs-keyword">var</span> queue = <span class="hljs-keyword">new</span> Queue();

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  <span class="hljs-keyword">var</span> eliminated = <span class="hljs-string">&apos;&apos;</span>;

  <span class="hljs-keyword">while</span> (queue.size() &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-comment">// &#x5FAA;&#x73AF;num&#x6B21;&#xFF0C;&#x961F;&#x9996;&#x51FA;&#x6765;&#x53BB;&#x5230;&#x961F;&#x5C3E;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; num; i++) {
      queue.enqueue(queue.dequeue());
    }
    <span class="hljs-comment">// &#x5FAA;&#x73AF;num&#x6B21;&#x8FC7;&#x540E;&#xFF0C;&#x79FB;&#x9664;&#x5F53;&#x524D;&#x961F;&#x9996;&#x7684;&#x5143;&#x7D20;</span>
    eliminated = queue.dequeue();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${eliminated}</span>&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;`</span>);
  }

  <span class="hljs-comment">// &#x6700;&#x540E;&#x53EA;&#x5269;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</span>
  <span class="hljs-keyword">return</span> queue.dequeue();
}

<span class="hljs-comment">// &#x6D4B;&#x8BD5;</span>
<span class="hljs-keyword">var</span> nameList = [<span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;Jack&quot;</span>, <span class="hljs-string">&quot;Camila&quot;</span>, <span class="hljs-string">&quot;Ingrid&quot;</span>, <span class="hljs-string">&quot;Carl&quot;</span>];
<span class="hljs-keyword">var</span> winner = hotPotato(nameList, <span class="hljs-number">10</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x6700;&#x540E;&#x7684;&#x80DC;&#x5229;&#x8005;&#x662F;&#xFF1A;<span class="hljs-subst">${winner}</span>`</span>);</code></pre><p>&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// John&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;
// Ingrid&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01; 
// Jack&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;
// Camila&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;
// &#x6700;&#x540E;&#x7684;&#x80DC;&#x5229;&#x8005;&#x662F;&#xFF1A;Carl" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-comment">// John&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;</span>
<span class="hljs-comment">// Ingrid&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01; </span>
<span class="hljs-comment">// Jack&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;</span>
<span class="hljs-comment">// Camila&#x5728;&#x51FB;&#x9F13;&#x4F20;&#x82B1;&#x4E2D;&#x88AB;&#x6DD8;&#x6C70;&#xFF01;</span>
<span class="hljs-comment">// &#x6700;&#x540E;&#x7684;&#x80DC;&#x5229;&#x8005;&#x662F;&#xFF1A;Carl</span></code></pre><h2 id="articleHeader8">&#x4E09;&#x3001;&#x7ED3;&#x675F;</h2><p>&#x672C;&#x6587;&#x4F1A;&#x540C;&#x6B65;&#x5230;&#x6211;&#x7684;<a href="https://blog.liuxuan.site" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a>&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5230;&#x6211;&#x7684;<a href="https://github.com/leocoder351/data-structure" rel="nofollow noreferrer" target="_blank">github&#x4ED3;&#x5E93;&#x67E5;&#x770B;</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#x6B22;&#x8FCE;&#x70B9;&#x4E00;&#x4E2A;Star~~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数据结构03 - 队列

## 原文链接
[https://segmentfault.com/a/1190000015778119](https://segmentfault.com/a/1190000015778119)


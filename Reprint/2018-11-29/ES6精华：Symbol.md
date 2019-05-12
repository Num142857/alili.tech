---
title: 'ES6精华：Symbol' 
date: 2018-11-29 2:30:09
hidden: true
slug: 6qn0y6vzu6
categories: [reprint]
---

{{< raw >}}
<p>&#x5B83;&#x662F;<code>JS</code>&#x7684;&#x7B2C;&#x4E03;&#x79CD;&#x7C7B;&#x578B;&#xFF0C;&#x5C5E;&#x4E8E;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x3002;<br>&#x5B83;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#xFF0C;&#x884C;&#x4E3A;&#x7C7B;&#x4F3C;&#x5B57;&#x7B26;&#x4E32;&#x3002;<br>&#x5B83;&#x662F;&#x76F4;&#x63A5;&#x901A;&#x8FC7;<code>Symbol</code>&#x51FD;&#x6570;&#x751F;&#x6210;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x5B57;&#x7B26;&#x4F5C;&#x4E3A;&#x8BE5;&#x503C;&#x7684;&#x63CF;&#x8FF0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const symbol1 = Symbol(&apos;unique&apos;);
const symbol2 = Symbol(&apos;unique&apos;);
console.log(symbol1 === symbol2); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> symbol1 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;unique&apos;</span>);
<span class="hljs-keyword">const</span> symbol2 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;unique&apos;</span>);
<span class="hljs-built_in">console</span>.log(symbol1 === symbol2); <span class="hljs-comment">// false</span></code></pre><h3 id="articleHeader0">&#x5E94;&#x7528;&#x4E3E;&#x4F8B;</h3><p><strong>&#x66FF;&#x4EE3;&#x7528;&#x4E8E;&#x8BC6;&#x522B;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5E38;&#x91CF;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- &#x4E4B;&#x524D;
const MY_ONE = &apos;unique-one&apos;;
if (MY_ONE === &apos;unique-one&apos;) { ... }
&#x867D;&#x7136;&#x5B9A;&#x4E49;&#x4E86;&#x4FDD;&#x5B58;&#x503C;&#x7684;&#x5E38;&#x91CF;&#xFF0C;&#x4F46;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x503C;&#x6216;&#x518D;&#x5B9A;&#x4E49;&#x76F8;&#x540C;&#x503C;&#x7684;&#x53D8;&#x91CF;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#x3002;

--- &#x73B0;&#x5728;
const MY_ONE = Symbol(&apos;one&apos;);
if (MY_ONE === MY_ONE) { ... }
&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;&#x8BE5;&#x5E38;&#x91CF;&#xFF0C;&#x5FC5;&#x987B;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x8BE5;&#x5E38;&#x91CF;&#x6216;&#x5176;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#xFF0C;&#x56E0;&#x4E3A; Symbol(&apos;one&apos;) &#x662F;&#x7EDD;&#x5BF9;&#x552F;&#x4E00;&#x7684;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- &#x4E4B;&#x524D;
<span class="hljs-keyword">const</span> MY_ONE = <span class="hljs-string">&apos;unique-one&apos;</span>;
<span class="hljs-keyword">if</span> (MY_ONE === <span class="hljs-string">&apos;unique-one&apos;</span>) { ... }
&#x867D;&#x7136;&#x5B9A;&#x4E49;&#x4E86;&#x4FDD;&#x5B58;&#x503C;&#x7684;&#x5E38;&#x91CF;&#xFF0C;&#x4F46;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x503C;&#x6216;&#x518D;&#x5B9A;&#x4E49;&#x76F8;&#x540C;&#x503C;&#x7684;&#x53D8;&#x91CF;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#x3002;

--- &#x73B0;&#x5728;
<span class="hljs-keyword">const</span> MY_ONE = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;one&apos;</span>);
<span class="hljs-keyword">if</span> (MY_ONE === MY_ONE) { ... }
&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;&#x8BE5;&#x5E38;&#x91CF;&#xFF0C;&#x5FC5;&#x987B;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x8BE5;&#x5E38;&#x91CF;&#x6216;&#x5176;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#xFF0C;&#x56E0;&#x4E3A; <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;one&apos;</span>) &#x662F;&#x7EDD;&#x5BF9;&#x552F;&#x4E00;&#x7684;&#x3002;</code></pre><p><strong>&#x4F5C;&#x4E3A;&#x95F4;&#x63A5;&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x9014;&#x5F84;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x53EA;&#x6709;&#x4F7F;&#x7528; private_a / private_b &#x53D8;&#x91CF;&#x6240;&#x6307;&#x5411;&#x7684;&#x503C;&#x624D;&#x80FD;&#x8BBF;&#x95EE;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;

const private_a = Symbol(&apos;private_a&apos;);
const private_b = Symbol(&apos;private_b&apos;);

function Class() {
  this[private_a] = &apos;private_a&apos;;
}

Class.prototype[private_b] = function() {
  console.log(&apos;private_b&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x53EA;&#x6709;&#x4F7F;&#x7528; private_a / private_b &#x53D8;&#x91CF;&#x6240;&#x6307;&#x5411;&#x7684;&#x503C;&#x624D;&#x80FD;&#x8BBF;&#x95EE;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;

<span class="hljs-keyword">const</span> private_a = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;private_a&apos;</span>);
<span class="hljs-keyword">const</span> private_b = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;private_b&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>[private_a] = <span class="hljs-string">&apos;private_a&apos;</span>;
}

Class.prototype[private_b] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;private_b&apos;</span>);
}</code></pre><p><strong>&#x4F5C;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x63A5;&#x53E3;&#x6216;&#x4E0D;&#x540C;&#x6570;&#x636E;&#x96C6;&#x5408;&#x7EDF;&#x4E00;&#x63A5;&#x53E3;&#x7684;&#x540D;&#x79F0;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x793A;&#x4F8B;&#xFF1A;&#x4E3A; Array &#x589E;&#x52A0;&#x5E76;&#x96C6;&#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x672A;&#x6765;&#x53EF;&#x80FD;&#x7684;&#x547D;&#x540D;&#x51B2;&#x7A81;&#x3002;

const CusArrayAPIMap = {
  union: Symbol(&apos;cus-array-api-union&apos;)
};

Array[CusArrayAPIMap.union] = function() {
  return [...new Set([...arguments].reduce((a, b) =&gt; a.concat(b), []))];
};

Array[CusArrayAPIMap.union]([1, 3], [2, 3]); // [1, 3, 2]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x793A;&#x4F8B;&#xFF1A;&#x4E3A; <span class="hljs-built_in">Array</span> &#x589E;&#x52A0;&#x5E76;&#x96C6;&#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x672A;&#x6765;&#x53EF;&#x80FD;&#x7684;&#x547D;&#x540D;&#x51B2;&#x7A81;&#x3002;

<span class="hljs-keyword">const</span> CusArrayAPIMap = {
  <span class="hljs-attr">union</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;cus-array-api-union&apos;</span>)
};

<span class="hljs-built_in">Array</span>[CusArrayAPIMap.union] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [...new <span class="hljs-built_in">Set</span>([...arguments].reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.concat(b), []))];
};

<span class="hljs-built_in">Array</span>[CusArrayAPIMap.union]([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// [1, 3, 2]</span></code></pre><h3 id="articleHeader1">&#x8F6C;&#x5316;&#x89C4;&#x5219;</h3><p><code>symbol</code>&#x503C;&#x4E0D;&#x53EF;&#x8F6C;&#x5316;&#x6210;&#x6570;&#x5B57;&#xFF08;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x503C;&#x65E0;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x503C;&#xFF09;&#x3002;<br><code>symbol</code>&#x503C;&#x53EF;&#x4EE5;&#x8F6C;&#x5316;&#x6210;&#x5E03;&#x5C14;&#x503C;&#xFF08;&#x4E0D;&#x7BA1;&#x600E;&#x6837;&#xFF0C;&#x5B83;&#x662F;&#x6709;&#x503C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6052;&#x4E3A;<code>true</code>&#xFF09;&#x3002;<br><code>symbol</code>&#x503C;&#x4E0D;&#x53EF;&#x88AB;&#x9690;&#x5F0F;&#x8F6C;&#x5316;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x663E;&#x793A;&#x8F6C;&#x5316;&#xFF08;&#x9690;&#x5F0F;&#x5373;&#x8BA1;&#x7B97;&#xFF0C;&#x62FF;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x503C;&#x8BA1;&#x7B97;&#x6CA1;&#x610F;&#x4E49;&#xFF0C;&#x4F46;&#x76F4;&#x63A5;&#x6253;&#x5370;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#x67E5;&#x770B;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Symbol() + 2; // &#x62A5;&#x9519;
Number(Symbol()); // &#x62A5;&#x9519;

Boolean(Symbol()); // &#x6052;&#x4E3A; true
if (Symbol()) { ... } // &#x6052;&#x6267;&#x884C;

Symbol() + &apos;-&apos;; // &#x62A5;&#x9519;
String(Symbol()); // &quot;Symbol()&quot;
Symbol().toString(); // &quot;Symbol()&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Symbol</span>() + <span class="hljs-number">2</span>; <span class="hljs-comment">// &#x62A5;&#x9519;</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-built_in">Symbol</span>()); <span class="hljs-comment">// &#x62A5;&#x9519;</span>

<span class="hljs-built_in">Boolean</span>(<span class="hljs-built_in">Symbol</span>()); <span class="hljs-comment">// &#x6052;&#x4E3A; true</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">Symbol</span>()) { ... } <span class="hljs-comment">// &#x6052;&#x6267;&#x884C;</span>

<span class="hljs-built_in">Symbol</span>() + <span class="hljs-string">&apos;-&apos;</span>; <span class="hljs-comment">// &#x62A5;&#x9519;</span>
<span class="hljs-built_in">String</span>(<span class="hljs-built_in">Symbol</span>()); <span class="hljs-comment">// &quot;Symbol()&quot;</span>
<span class="hljs-built_in">Symbol</span>().toString(); <span class="hljs-comment">// &quot;Symbol()&quot;</span></code></pre><h3 id="articleHeader2">Symbol.for()</h3><p><code>Symbol.for(key)</code>&#x4E0E;<code>Symbol()</code>&#x4E00;&#x6837;&#xFF0C;&#x7528;&#x6765;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x503C;&#x3002;<br>&#x4E0D;&#x8FC7;&#x5176;&#x4F20;&#x5165;&#x7684;<code>key</code>&#x4E0E;&#x751F;&#x6210;&#x7684;&#x503C;&#x4F1A;&#x5F62;&#x6210;&#x6620;&#x5C04;&#x5B58;&#x50A8;&#x5728;&#x5168;&#x5C40;&#x7684;<code>symbol</code>&#x6CE8;&#x518C;&#x8868;&#x4E2D;&#x3002;<br>&#x5373;&#x662F;&#x8BF4;&#xFF0C;<code>Symbol.for(key)</code>&#x662F;&#x5148;&#x6839;&#x636E;<code>key</code>&#x5728;&#x6CE8;&#x518C;&#x8868;&#x4E2D;&#x5BFB;&#x627E;&#xFF0C;&#x6709;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#xFF0C;&#x6CA1;&#x6709;&#x521B;&#x5EFA;&#x5E76;&#x8FD4;&#x56DE;&#x3002;<br>&#x4E5F;&#x5373;&#x662F;&#x8BF4;&#xFF0C;&#x5728;&#x76F8;&#x540C;&#x7684;&#x5168;&#x5C40;&#x7A7A;&#x95F4;&#x4E2D;&#xFF08;&#x5305;&#x62EC;&#x4E0D;&#x540C;&#x7684;<code>iframe</code>&#x6216;<code>service worker</code>&#xFF09;&#x4F20;&#x5165;&#x76F8;&#x540C;&#x7684;<code>key</code>&#x53D6;&#x51FA;&#x6765;&#x7684;&#x662F;&#x540C;&#x4E00;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Symbol(&apos;one&apos;) === Symbol(&apos;one&apos;); // false
Symbol(&apos;one&apos;) === Symbol.for(&apos;one&apos;); // false
Symbol.for(&apos;one&apos;) === Symbol.for(&apos;one&apos;); // true
Symbol.for(&apos;one&apos;) === Symbol.for(&apos;two&apos;); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;one&apos;</span>) === <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;one&apos;</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;one&apos;</span>) === <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;one&apos;</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;one&apos;</span>) === <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;one&apos;</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;one&apos;</span>) === <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;two&apos;</span>); <span class="hljs-comment">// false</span></code></pre><p>&#x76F8;&#x914D;&#x5957;&#x7684;&#x8FD8;&#x6709;&#x65B9;&#x6CD5;<code>Symbol.keyFor()</code>&#x3002;<br>&#x5B83;&#x4F1A;&#x6839;&#x636E;&#x4F20;&#x5165;&#x7684;<code>Symbol</code>&#x503C;&#xFF0C;&#x53BB;&#x6CE8;&#x518C;&#x8868;&#x4E2D;&#x67E5;&#x627E;&#x5E76;&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;&#x7684;<code>key</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = Symbol.for(&apos;one&apos;);

Symbol.keyFor(o); // &apos;one&apos;
Symbol.keyFor(Symbol(&apos;two&apos;)); // undefined
Symbol.keyFor(Symbol.for(&apos;two&apos;)); // &apos;two&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> o = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;one&apos;</span>);

<span class="hljs-built_in">Symbol</span>.keyFor(o); <span class="hljs-comment">// &apos;one&apos;</span>
<span class="hljs-built_in">Symbol</span>.keyFor(<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;two&apos;</span>)); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">Symbol</span>.keyFor(<span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;two&apos;</span>)); <span class="hljs-comment">// &apos;two&apos;</span></code></pre><h3 id="articleHeader3">&#x5185;&#x7F6E;&#x7684; Symbol &#x503C;</h3><p><code>ES6</code>&#x89C4;&#x5B9A;&#x4E86;11&#x4E2A;&#x5185;&#x7F6E;&#x63A5;&#x53E3;&#x7684;&#x7EDF;&#x4E00;&#x540D;&#x79F0;&#x3002;<br>&#x53EF;&#x4EE5;&#x5C06;&#x8FD9;&#x4E9B;&#x63A5;&#x53E3;&#x90E8;&#x7F72;&#x5230;&#x81EA;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x6216;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;&#xFF0C;&#x540C;&#x6B65;&#x539F;&#x751F;&#x64CD;&#x4F5C;&#x3002;</p><p><strong>Symbol.toStringTag</strong><br>&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x7C7B;&#x578B;&#x6807;&#x7B7E;&#x3002;<br>&#x901A;&#x4FD7;&#x7684;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;&#x4F7F;&#x7528;<code>Object.prototype.toString.call(target)</code>&#x83B7;&#x53D6;&#x5230;&#x7684;<code>[object Name]</code>&#x4E2D;&#x7684;<code>Name</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  [Symbol.toStringTag]: &apos;MyTag&apos;
};
console.log( Object.prototype.toString.call(target) ); // &apos;[object MyTag]&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  [<span class="hljs-built_in">Symbol</span>.toStringTag]: <span class="hljs-string">&apos;MyTag&apos;</span>
};
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Object</span>.prototype.toString.call(target) ); <span class="hljs-comment">// &apos;[object MyTag]&apos;</span></code></pre><p><strong>Symbol.toPrimitive</strong><br>&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;&#x8BE5;&#x5BF9;&#x8C61;&#x88AB;&#x8F6C;&#x5316;&#x6210;<code>Number</code>&#x6216;<code>String</code>&#x578B;&#x65F6;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;<br>&#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;&#x573A;&#x5408;&#x9700;&#x8981;&#x8F6C;&#x5316;&#x6210;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#xFF0C;&#x4E00;&#x5171;&#x6709;&#x4E09;&#x79CD;&#x6A21;&#x5F0F;&#xFF1A;<code>number</code>&#xFF0C;<code>string</code>&#x548C;<code>default</code>&#xFF08;&#x8F6C;&#x5316;&#x6210;&#x4E24;&#x8005;&#x90FD;&#x884C;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  [Symbol.toPrimitive](type) {
    switch(type) {
      case &apos;number&apos;:
        return 3;
        break;
      case &apos;string&apos;:
        return &apos;s&apos;;
        break;
      case &apos;default&apos;:
        return &apos;d&apos;;
        break;
    }
  }
};

console.log( Number(obj) ); // 3
console.log( String(obj) ); // &apos;s&apos;
console.log( obj + 1 );  // &apos;d1&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  [<span class="hljs-built_in">Symbol</span>.toPrimitive](type) {
    <span class="hljs-keyword">switch</span>(type) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;number&apos;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;string&apos;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;s&apos;</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;default&apos;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;d&apos;</span>;
        <span class="hljs-keyword">break</span>;
    }
  }
};

<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Number</span>(obj) ); <span class="hljs-comment">// 3</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">String</span>(obj) ); <span class="hljs-comment">// &apos;s&apos;</span>
<span class="hljs-built_in">console</span>.log( obj + <span class="hljs-number">1</span> );  <span class="hljs-comment">// &apos;d1&apos;</span></code></pre><p><strong>Symbol.hasInstance</strong><br>&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;<code>instanceof</code>&#x547D;&#x4EE4;&#x5B9E;&#x9645;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[] instanceof Array; // true
&#x5B9E;&#x9645;&#x662F;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x3002;
Array[Symbol.hasInstance]([]); // true

&#x53EF;&#x81EA;&#x884C;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x6B64;&#x63A5;&#x53E3;&#x3002;
let OBJ = {
  [Symbol.hasInstance](arr) {
    return arr.length === 2 ? true : false;
  }
};
[1] instanceof OBJ; // false
[1, 2] instanceof OBJ; // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>; <span class="hljs-comment">// true</span>
&#x5B9E;&#x9645;&#x662F;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x3002;
<span class="hljs-built_in">Array</span>[<span class="hljs-built_in">Symbol</span>.hasInstance]([]); <span class="hljs-comment">// true</span>

&#x53EF;&#x81EA;&#x884C;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x6B64;&#x63A5;&#x53E3;&#x3002;
<span class="hljs-keyword">let</span> OBJ = {
  [<span class="hljs-built_in">Symbol</span>.hasInstance](arr) {
    <span class="hljs-keyword">return</span> arr.length === <span class="hljs-number">2</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
  }
};
[<span class="hljs-number">1</span>] <span class="hljs-keyword">instanceof</span> OBJ; <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>] <span class="hljs-keyword">instanceof</span> OBJ; <span class="hljs-comment">// true</span></code></pre><p><strong>Symbol.iterator</strong><br>&#x6307;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x9ED8;&#x8BA4;&#x904D;&#x5386;&#x5668;&#x65B9;&#x6CD5;&#xFF08;&#x5173;&#x4E8E;&#x904D;&#x5386;&#x5668;&#x53EF;&#x770B;<code>Iterator</code>&#x7AE0;&#x8282;&#xFF09;&#x3002;<br>&#x6570;&#x7EC4;&#x9ED8;&#x8BA4;&#x7684;&#x904D;&#x5386;&#x5668;&#x65B9;&#x6CD5;&#x4E3A;&#xFF1A;<code>Array.prototype[Symbol.iterator]</code>&#x3002;</p><p><strong>Symbol.species</strong><br>&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x5F53;&#x5B9E;&#x4F8B;&#x9700;&#x8981;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#x65B9;&#x6CD5;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;<br>&#x6709;&#x4E9B;&#x7C7B;&#x5E93;&#x662F;&#x5728;&#x57FA;&#x7C7B;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x4FEE;&#x6539;&#x7684;&#xFF0C;&#x5F53;&#x5B50;&#x7C7B;&#x4F7F;&#x7528;&#x7EE7;&#x627F;&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x4F5C;&#x8005;&#x5E0C;&#x671B;&#x8FD4;&#x56DE;&#x57FA;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
  static get [Symbol.species]() { return Array }
}

let a = new MyArray(1, 2, 3);
let b = a.map(x =&gt; x);
console.log(b instanceof Array); // true
console.log(b instanceof MyArray); // false

b &#x662F; a &#x7684;&#x884D;&#x751F;&#x5BF9;&#x8C61;&#xFF0C;&#x6216;&#x79F0;&#x6D3E;&#x751F;&#x5BF9;&#x8C61;&#x3002;
&#x5982;&#x679C;&#x6CA1;&#x6709; [Symbol.species] &#xFF0C;b &#x539F;&#x578B;&#x94FE;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5E94;&#x4E3A; MyArray &#x539F;&#x578B;&#x3002;
&#x4F46;&#x73B0;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E3A; Array &#x7684;&#x539F;&#x578B;&#xFF0C;&#x5373; b &#x76F4;&#x63A5;&#x4E3A; Array &#x7684;&#x5B9E;&#x4F8B;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  <span class="hljs-keyword">static</span> get [<span class="hljs-built_in">Symbol</span>.species]() { <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span> }
}

<span class="hljs-keyword">let</span> a = <span class="hljs-keyword">new</span> MyArray(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<span class="hljs-keyword">let</span> b = a.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x);
<span class="hljs-built_in">console</span>.log(b <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(b <span class="hljs-keyword">instanceof</span> MyArray); <span class="hljs-comment">// false</span>

b &#x662F; a &#x7684;&#x884D;&#x751F;&#x5BF9;&#x8C61;&#xFF0C;&#x6216;&#x79F0;&#x6D3E;&#x751F;&#x5BF9;&#x8C61;&#x3002;
&#x5982;&#x679C;&#x6CA1;&#x6709; [<span class="hljs-built_in">Symbol</span>.species] &#xFF0C;b &#x539F;&#x578B;&#x94FE;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5E94;&#x4E3A; MyArray &#x539F;&#x578B;&#x3002;
&#x4F46;&#x73B0;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E3A; <span class="hljs-built_in">Array</span> &#x7684;&#x539F;&#x578B;&#xFF0C;&#x5373; b &#x76F4;&#x63A5;&#x4E3A; <span class="hljs-built_in">Array</span> &#x7684;&#x5B9E;&#x4F8B;&#x3002;</code></pre><p><strong>Symbol.split, Symbol.match, Symbol.search, Symbol.replace</strong><br>&#x56DB;&#x8005;&#x90FD;&#x662F;&#x9488;&#x5BF9;&#x5B57;&#x7B26;&#x4E32;&#x4E0E;&#x6B63;&#x5219;&#xFF08;&#x5BF9;&#x8C61;&#xFF09;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5177;&#x6709;&#x76F8;&#x540C;&#x884C;&#x4E3A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /m/g;
let str = &apos;Hi, I\&apos;m programmer monkey&apos;;

str.replace(reg, &apos;M&apos;);
&#x5B9E;&#x9645;&#x662F;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;
reg[Symbol.replace](str, &apos;M&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/m/g</span>;
<span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;Hi, I\&apos;m programmer monkey&apos;</span>;

str.replace(reg, <span class="hljs-string">&apos;M&apos;</span>);
&#x5B9E;&#x9645;&#x662F;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;
reg[<span class="hljs-built_in">Symbol</span>.replace](str, <span class="hljs-string">&apos;M&apos;</span>);</code></pre><p><strong>Symbol.isConcatSpreadable</strong><br>&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x5BF9;&#x8C61;&#x7528;&#x4E8E;<code>Array.prototype.concat()</code>&#x65F6;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x5C55;&#x5F00;&#x3002;<br>&#x9ED8;&#x8BA4;&#x6CA1;&#x6709;&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5373;&#x4E3A;<code>undefined</code>&#xFF0C;&#x7B49;&#x540C;&#x4E8E;<code>true</code>&#x3002;&#x8BBE;&#x7F6E;&#x4E3A;<code>false</code>&#x5219;&#x4E0D;&#x5C55;&#x5F00;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2];
arr[Symbol.isConcatSpreadable] = false;
[3].concat(arr); // [3, [1, 2]]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
arr[<span class="hljs-built_in">Symbol</span>.isConcatSpreadable] = <span class="hljs-literal">false</span>;
[<span class="hljs-number">3</span>].concat(arr); <span class="hljs-comment">// [3, [1, 2]]</span></code></pre><p><strong>Symbol.unscopables</strong><br>&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x6307;&#x5B9A;&#x4E86;&#x4F7F;&#x7528;<code>with</code>&#x5173;&#x952E;&#x5B57;&#x65F6;&#xFF0C;&#x54EA;&#x4E9B;&#x5C5E;&#x6027;&#x4F1A;&#x88AB;<code>with</code>&#x73AF;&#x5883;&#x6392;&#x9664;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  id: &apos;123&apos;,
  name: &apos;limo&apos;,
  [Symbol.unscopables]: {
    id: true
  }
};

let id = &apos;id&apos;;
let name = &apos;name&apos;;

with (obj) {
  console.log(id); // &apos;id&apos;
  console.log(name); // &apos;limo&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;123&apos;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;limo&apos;</span>,
  [<span class="hljs-built_in">Symbol</span>.unscopables]: {
    <span class="hljs-attr">id</span>: <span class="hljs-literal">true</span>
  }
};

<span class="hljs-keyword">let</span> id = <span class="hljs-string">&apos;id&apos;</span>;
<span class="hljs-keyword">let</span> name = <span class="hljs-string">&apos;name&apos;</span>;

<span class="hljs-keyword">with</span> (obj) {
  <span class="hljs-built_in">console</span>.log(id); <span class="hljs-comment">// &apos;id&apos;</span>
  <span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">// &apos;limo&apos;</span>
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：Symbol

## 原文链接
[https://segmentfault.com/a/1190000015244917](https://segmentfault.com/a/1190000015244917)


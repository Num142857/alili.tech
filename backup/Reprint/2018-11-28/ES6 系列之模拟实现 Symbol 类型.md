---
title: 'ES6 系列之模拟实现 Symbol 类型' 
date: 2018-11-28 2:30:11
hidden: true
slug: js6t57v4zq
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;Symbol &#x7684;&#x5F88;&#x591A;&#x7279;&#x6027;&#x90FD;&#x65E0;&#x6CD5;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x2026;&#x2026;&#x6240;&#x4EE5;&#x5148;&#x8BA9;&#x6211;&#x4EEC;&#x56DE;&#x987E;&#x4E0B;&#x6709;&#x54EA;&#x4E9B;&#x7279;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x6311;&#x70B9;&#x80FD;&#x5B9E;&#x73B0;&#x7684;&#x2026;&#x2026;&#x5F53;&#x7136;&#x5728;&#x770B;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x601D;&#x8003;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x662F;&#x5426;&#x80FD;&#x5B9E;&#x73B0;&#xFF0C;&#x5982;&#x679C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#xFF0C;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x3002;</p><h2 id="articleHeader1">&#x56DE;&#x987E;</h2><p>ES6 &#x5F15;&#x5165;&#x4E86;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x539F;&#x59CB;&#x6570;&#x636E;&#x7C7B;&#x578B; Symbol&#xFF0C;&#x8868;&#x793A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#x3002;</p><p><strong>1. Symbol &#x503C;&#x901A;&#x8FC7; Symbol &#x51FD;&#x6570;&#x751F;&#x6210;&#xFF0C;&#x4F7F;&#x7528; typeof&#xFF0C;&#x7ED3;&#x679C;&#x4E3A; &quot;symbol&quot;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = Symbol();
console.log(typeof s); // &quot;symbol&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> s); <span class="hljs-comment">// &quot;symbol&quot;</span></code></pre><p><strong>2. Symbol &#x51FD;&#x6570;&#x524D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528; new &#x547D;&#x4EE4;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x751F;&#x6210;&#x7684; Symbol &#x662F;&#x4E00;&#x4E2A;&#x539F;&#x59CB;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x3002;</strong></p><p><strong>3. instanceof &#x7684;&#x7ED3;&#x679C;&#x4E3A; false</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = Symbol(&apos;foo&apos;);
console.log(s instanceof Symbol); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-built_in">console</span>.log(s <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Symbol</span>); <span class="hljs-comment">// false</span></code></pre><p><strong>4. Symbol &#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x5BF9; Symbol &#x5B9E;&#x4F8B;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x663E;&#x793A;&#xFF0C;&#x6216;&#x8005;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#xFF0C;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x533A;&#x5206;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s1 = Symbol(&apos;foo&apos;);
console.log(s1); // Symbol(foo)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-built_in">console</span>.log(s1); <span class="hljs-comment">// Symbol(foo)</span></code></pre><p><strong>5. &#x5982;&#x679C; Symbol &#x7684;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#x7684; toString &#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5176;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x751F;&#x6210;&#x4E00;&#x4E2A; Symbol &#x503C;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
  toString() {
    return &apos;abc&apos;;
  }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = {
  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;abc&apos;</span>;
  }
};
<span class="hljs-keyword">const</span> sym = <span class="hljs-built_in">Symbol</span>(obj);
<span class="hljs-built_in">console</span>.log(sym); <span class="hljs-comment">// Symbol(abc)</span></code></pre><p><strong>6. Symbol &#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x53EA;&#x662F;&#x8868;&#x793A;&#x5BF9;&#x5F53;&#x524D; Symbol &#x503C;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;&#x76F8;&#x540C;&#x53C2;&#x6570;&#x7684; Symbol &#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E0D;&#x76F8;&#x7B49;&#x7684;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6CA1;&#x6709;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2); // false

// &#x6709;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;
var s1 = Symbol(&apos;foo&apos;);
var s2 = Symbol(&apos;foo&apos;);

console.log(s1 === s2); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6CA1;&#x6709;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;</span>
<span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">var</span> s2 = <span class="hljs-built_in">Symbol</span>();

<span class="hljs-built_in">console</span>.log(s1 === s2); <span class="hljs-comment">// false</span>

<span class="hljs-comment">// &#x6709;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;</span>
<span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-keyword">var</span> s2 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;foo&apos;</span>);

<span class="hljs-built_in">console</span>.log(s1 === s2); <span class="hljs-comment">// false</span></code></pre><p><strong>7. Symbol &#x503C;&#x4E0D;&#x80FD;&#x4E0E;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sym = Symbol(&apos;My symbol&apos;);

console.log(&quot;your symbol is &quot; + sym); // TypeError: can&apos;t convert symbol to string" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sym = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;My symbol&apos;</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;your symbol is &quot;</span> + sym); <span class="hljs-comment">// TypeError: can&apos;t convert symbol to string</span></code></pre><p><strong>8. Symbol &#x503C;&#x53EF;&#x4EE5;&#x663E;&#x5F0F;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sym = Symbol(&apos;My symbol&apos;);

console.log(String(sym)); // &apos;Symbol(My symbol)&apos;
console.log(sym.toString()); // &apos;Symbol(My symbol)&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sym = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;My symbol&apos;</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">String</span>(sym)); <span class="hljs-comment">// &apos;Symbol(My symbol)&apos;</span>
<span class="hljs-built_in">console</span>.log(sym.toString()); <span class="hljs-comment">// &apos;Symbol(My symbol)&apos;</span></code></pre><p><strong>9. Symbol &#x503C;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x540C;&#x540D;&#x7684;&#x5C5E;&#x6027;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mySymbol = Symbol();

// &#x7B2C;&#x4E00;&#x79CD;&#x5199;&#x6CD5;
var a = {};
a[mySymbol] = &apos;Hello!&apos;;

// &#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;
var a = {
  [mySymbol]: &apos;Hello!&apos;
};

// &#x7B2C;&#x4E09;&#x79CD;&#x5199;&#x6CD5;
var a = {};
Object.defineProperty(a, mySymbol, { value: &apos;Hello!&apos; });

// &#x4EE5;&#x4E0A;&#x5199;&#x6CD5;&#x90FD;&#x5F97;&#x5230;&#x540C;&#x6837;&#x7ED3;&#x679C;
console.log(a[mySymbol]); // &quot;Hello!&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mySymbol = <span class="hljs-built_in">Symbol</span>();

<span class="hljs-comment">// &#x7B2C;&#x4E00;&#x79CD;&#x5199;&#x6CD5;</span>
<span class="hljs-keyword">var</span> a = {};
a[mySymbol] = <span class="hljs-string">&apos;Hello!&apos;</span>;

<span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;</span>
<span class="hljs-keyword">var</span> a = {
  [mySymbol]: <span class="hljs-string">&apos;Hello!&apos;</span>
};

<span class="hljs-comment">// &#x7B2C;&#x4E09;&#x79CD;&#x5199;&#x6CD5;</span>
<span class="hljs-keyword">var</span> a = {};
<span class="hljs-built_in">Object</span>.defineProperty(a, mySymbol, { <span class="hljs-attr">value</span>: <span class="hljs-string">&apos;Hello!&apos;</span> });

<span class="hljs-comment">// &#x4EE5;&#x4E0A;&#x5199;&#x6CD5;&#x90FD;&#x5F97;&#x5230;&#x540C;&#x6837;&#x7ED3;&#x679C;</span>
<span class="hljs-built_in">console</span>.log(a[mySymbol]); <span class="hljs-comment">// &quot;Hello!&quot;</span></code></pre><p><strong>10. Symbol &#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x8BE5;&#x5C5E;&#x6027;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x5728; for...in&#x3001;for...of &#x5FAA;&#x73AF;&#x4E2D;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x88AB; Object.keys()&#x3001;Object.getOwnPropertyNames()&#x3001;JSON.stringify() &#x8FD4;&#x56DE;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5B83;&#x4E5F;&#x4E0D;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6709;&#x4E00;&#x4E2A; Object.getOwnPropertySymbols &#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709; Symbol &#x5C5E;&#x6027;&#x540D;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
var a = Symbol(&apos;a&apos;);
var b = Symbol(&apos;b&apos;);

obj[a] = &apos;Hello&apos;;
obj[b] = &apos;World&apos;;

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols);
// [Symbol(a), Symbol(b)]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;a&apos;</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;b&apos;</span>);

obj[a] = <span class="hljs-string">&apos;Hello&apos;</span>;
obj[b] = <span class="hljs-string">&apos;World&apos;</span>;

<span class="hljs-keyword">var</span> objectSymbols = <span class="hljs-built_in">Object</span>.getOwnPropertySymbols(obj);

<span class="hljs-built_in">console</span>.log(objectSymbols);
<span class="hljs-comment">// [Symbol(a), Symbol(b)]</span></code></pre><p><strong>11. &#x5982;&#x679C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x4E2A; Symbol &#x503C;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Symbol.for&#x3002;&#x5B83;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x641C;&#x7D22;&#x6709;&#x6CA1;&#x6709;&#x4EE5;&#x8BE5;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x540D;&#x79F0;&#x7684; Symbol &#x503C;&#x3002;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A; Symbol &#x503C;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x65B0;&#x5EFA;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4EE5;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x4E3A;&#x540D;&#x79F0;&#x7684; Symbol &#x503C;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s1 = Symbol.for(&apos;foo&apos;);
var s2 = Symbol.for(&apos;foo&apos;);

console.log(s1 === s2); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-keyword">var</span> s2 = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;foo&apos;</span>);

<span class="hljs-built_in">console</span>.log(s1 === s2); <span class="hljs-comment">// true</span></code></pre><p><strong>12. Symbol.keyFor &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5DF2;&#x767B;&#x8BB0;&#x7684; Symbol &#x7C7B;&#x578B;&#x503C;&#x7684; key&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s1 = Symbol.for(&quot;foo&quot;);
console.log(Symbol.keyFor(s1)); // &quot;foo&quot;

var s2 = Symbol(&quot;foo&quot;);
console.log(Symbol.keyFor(s2) ); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&quot;foo&quot;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>.keyFor(s1)); <span class="hljs-comment">// &quot;foo&quot;</span>

<span class="hljs-keyword">var</span> s2 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&quot;foo&quot;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>.keyFor(s2) ); <span class="hljs-comment">// undefined</span></code></pre><h2 id="articleHeader2">&#x5206;&#x6790;</h2><p>&#x770B;&#x5B8C;&#x4EE5;&#x4E0A;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F60;&#x89C9;&#x5F97;&#x54EA;&#x4E9B;&#x7279;&#x6027;&#x662F;&#x53EF;&#x4EE5;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF1F;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Symbol &#x7684;&#x8BDD;&#xFF0C;&#x57FA;&#x672C;&#x7684;&#x601D;&#x8DEF;&#x5C31;&#x662F;&#x6784;&#x5EFA;&#x4E00;&#x4E2A; Symbol &#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#x3002;</p><p>&#x4E0D;&#x8FC7;&#x5728;&#x6B64;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-description" rel="nofollow noreferrer" target="_blank">&#x89C4;&#x8303;</a>&#x4E2D;&#x8C03;&#x7528; Symbol &#x65F6;&#x5230;&#x5E95;&#x505A;&#x4E86;&#x54EA;&#x4E9B;&#x5DE5;&#x4F5C;&#xFF1A;</p><blockquote><p>Symbol ( [ description ] )</p><p>When Symbol is called with optional argument description, the following steps are taken:</p><ol><li>If NewTarget is not undefined, throw a TypeError exception.</li><li>If description is undefined, var descString be undefined.</li><li>Else, var descString be ToString(description).</li><li>ReturnIfAbrupt(descString).</li><li>Return a new unique Symbol value whose [[Description]] value is descString.</li></ol></blockquote><p>&#x5F53;&#x8C03;&#x7528; Symbol &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x5982;&#x679C;&#x4F7F;&#x7528; new &#xFF0C;&#x5C31;&#x62A5;&#x9519;</li><li>&#x5982;&#x679C; description &#x662F; undefined&#xFF0C;&#x8BA9; descString &#x4E3A; undefined</li><li>&#x5426;&#x5219; &#x8BA9; descString &#x4E3A; ToString(description)</li><li>&#x5982;&#x679C;&#x62A5;&#x9519;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;</li><li>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x552F;&#x4E00;&#x7684; Symbol &#x503C;&#xFF0C;&#x5B83;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027; [[Description]] &#x503C;&#x4E3A; descString</li></ol><p>&#x8003;&#x8651;&#x5230;&#x8FD8;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; [[Description]] &#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x6700;&#x7EC8;&#x8FD8;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</p><h2 id="articleHeader3">&#x7B2C;&#x4E00;&#x7248;</h2><p>&#x53C2;&#x7167;&#x7740;&#x89C4;&#x8303;&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x5199;&#x8D77;&#x6765;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;&#x4E00;&#x7248;
(function() {
    var root = this;

    var SymbolPolyfill = function Symbol(description) {

        // &#x5B9E;&#x73B0;&#x7279;&#x6027;&#x7B2C; 2 &#x70B9;&#xFF1A;Symbol &#x51FD;&#x6570;&#x524D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528; new &#x547D;&#x4EE4;
        if (this instanceof SymbolPolyfill) throw new TypeError(&apos;Symbol is not a constructor&apos;);

        // &#x5B9E;&#x73B0;&#x7279;&#x6027;&#x7B2C; 5 &#x70B9;&#xFF1A;&#x5982;&#x679C; Symbol &#x7684;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#x7684; toString &#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5176;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x751F;&#x6210;&#x4E00;&#x4E2A; Symbol &#x503C;&#x3002;
        var descString = description === undefined ? undefined : String(description)

        var symbol = Object.create(null)

        Object.defineProperties(symbol, {
            &apos;__Description__&apos;: {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        // &#x5B9E;&#x73B0;&#x7279;&#x6027;&#x7B2C; 6 &#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#xFF0C;&#x53EA;&#x8981;&#x5F15;&#x7528;&#x4E0D;&#x540C;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x76F8;&#x540C;
        return symbol;
    }

    root.SymbolPolyfill = SymbolPolyfill;
})();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;&#x4E00;&#x7248;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> root = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> SymbolPolyfill = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Symbol</span>(<span class="hljs-params">description</span>) </span>{

        <span class="hljs-comment">// &#x5B9E;&#x73B0;&#x7279;&#x6027;&#x7B2C; 2 &#x70B9;&#xFF1A;Symbol &#x51FD;&#x6570;&#x524D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528; new &#x547D;&#x4EE4;</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> SymbolPolyfill) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Symbol is not a constructor&apos;</span>);

        <span class="hljs-comment">// &#x5B9E;&#x73B0;&#x7279;&#x6027;&#x7B2C; 5 &#x70B9;&#xFF1A;&#x5982;&#x679C; Symbol &#x7684;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#x7684; toString &#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5176;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x751F;&#x6210;&#x4E00;&#x4E2A; Symbol &#x503C;&#x3002;</span>
        <span class="hljs-keyword">var</span> descString = description === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">String</span>(description)

        <span class="hljs-keyword">var</span> symbol = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)

        <span class="hljs-built_in">Object</span>.defineProperties(symbol, {
            <span class="hljs-string">&apos;__Description__&apos;</span>: {
                <span class="hljs-attr">value</span>: descString,
                <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>
            }
        });

        <span class="hljs-comment">// &#x5B9E;&#x73B0;&#x7279;&#x6027;&#x7B2C; 6 &#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#xFF0C;&#x53EA;&#x8981;&#x5F15;&#x7528;&#x4E0D;&#x540C;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x76F8;&#x540C;</span>
        <span class="hljs-keyword">return</span> symbol;
    }

    root.SymbolPolyfill = SymbolPolyfill;
})();</code></pre><p>&#x53EA;&#x662F;&#x53C2;&#x7167;&#x7740;&#x89C4;&#x8303;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x7279;&#x6027;&#x7684;&#x7B2C; 2&#x3001;5&#x3001;6 &#x70B9;&#x3002;</p><h2 id="articleHeader4">&#x7B2C;&#x4E8C;&#x7248;</h2><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5176;&#x4ED6;&#x7684;&#x7279;&#x6027;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#xFF1A;</p><p><strong>1. &#x4F7F;&#x7528; typeof&#xFF0C;&#x7ED3;&#x679C;&#x4E3A; &quot;symbol&quot;&#x3002;</strong></p><p>&#x5229;&#x7528; ES5&#xFF0C;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x80FD;&#x4FEE;&#x6539; typeof &#x64CD;&#x4F5C;&#x7B26;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x3002;</p><p><strong>3. instanceof &#x7684;&#x7ED3;&#x679C;&#x4E3A; false</strong></p><p>&#x56E0;&#x4E3A;&#x4E0D;&#x662F;&#x901A;&#x8FC7; new &#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x6240;&#x4EE5; instanceof &#x7684;&#x7ED3;&#x679C;&#x81EA;&#x7136;&#x662F; false&#x3002;</p><p><strong>4. Symbol &#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x5BF9; Symbol &#x5B9E;&#x4F8B;&#x7684;&#x63CF;&#x8FF0;&#x3002;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x663E;&#x793A;&#xFF0C;&#x6216;&#x8005;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#xFF0C;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x533A;&#x5206;&#x3002;</strong></p><p>&#x5F53;&#x6211;&#x4EEC;&#x6253;&#x5370;&#x4E00;&#x4E2A;&#x539F;&#x751F; Symbol &#x503C;&#x7684;&#x65F6;&#x5019;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Symbol(&apos;1&apos;)); // Symbol(1)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;1&apos;</span>)); <span class="hljs-comment">// Symbol(1)</span></code></pre><p>&#x53EF;&#x662F;&#x6211;&#x4EEC;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7684;&#x65F6;&#x5019;&#x8FD4;&#x56DE;&#x7684;&#x5374;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4FEE;&#x6539; console.log &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x53E6;&#x8BB2;&#x3002;</p><p><strong>8. Symbol &#x503C;&#x53EF;&#x4EE5;&#x663E;&#x5F0F;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sym = Symbol(&apos;My symbol&apos;);

console.log(String(sym)); // &apos;Symbol(My symbol)&apos;
console.log(sym.toString()); // &apos;Symbol(My symbol)&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sym = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;My symbol&apos;</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">String</span>(sym)); <span class="hljs-comment">// &apos;Symbol(My symbol)&apos;</span>
<span class="hljs-built_in">console</span>.log(sym.toString()); <span class="hljs-comment">// &apos;Symbol(My symbol)&apos;</span></code></pre><p>&#x5F53;&#x8C03;&#x7528; String &#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x5BF9;&#x8C61;&#x6709; toString &#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x4F1A;&#x8C03;&#x7528;&#x8BE5; toString &#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x7ED9;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; toString &#x65B9;&#x6CD5;&#xFF0C;&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#x8FD9;&#x4E24;&#x4E2A;&#x6548;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;&#x4E8C;&#x7248;

// &#x524D;&#x9762;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;

var symbol = Object.create({
    toString: function() {
        return &apos;Symbol(&apos; + this.__Description__ + &apos;)&apos;;
    },
});

// &#x540E;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x7248;</span>

<span class="hljs-comment">// &#x524D;&#x9762;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;</span>

<span class="hljs-keyword">var</span> symbol = <span class="hljs-built_in">Object</span>.create({
    <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;Symbol(&apos;</span> + <span class="hljs-keyword">this</span>.__Description__ + <span class="hljs-string">&apos;)&apos;</span>;
    },
});

<span class="hljs-comment">// &#x540E;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;</span></code></pre><h2 id="articleHeader5">&#x7B2C;&#x4E09;&#x7248;</h2><p><strong>9. Symbol &#x503C;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x540C;&#x540D;&#x7684;&#x5C5E;&#x6027;&#x3002;</strong></p><p>&#x770B;&#x7740;&#x597D;&#x50CF;&#x6CA1;&#x4EC0;&#x4E48;&#xFF0C;&#x8FD9;&#x70B9;&#x5176;&#x5B9E;&#x548C;&#x7B2C; 8 &#x70B9;&#x662F;&#x51B2;&#x7A81;&#x7684;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5F53;&#x6211;&#x4EEC;&#x6A21;&#x62DF;&#x7684;&#x6240;&#x8C13; Symbol &#x503C;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x7740; toString &#x65B9;&#x6CD5;&#x7684; &#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x8FDB;&#x884C;&#x9690;&#x5F0F;&#x7C7B;&#x578B;&#x8F6C;&#x6362;&#xFF0C;&#x8FD8;&#x662F;&#x4F1A;&#x8C03;&#x7528;&#x6211;&#x4EEC;&#x6DFB;&#x52A0;&#x7684; toString &#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x4E8E; Symbol(&apos;foo&apos;) &#x548C; Symbol(&apos;foo&apos;)&#x4E24;&#x4E2A; Symbol &#x503C;&#xFF0C;&#x867D;&#x7136;&#x63CF;&#x8FF0;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x56E0;&#x4E3A;&#x662F;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x5E76;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x4F46;&#x662F;&#x5F53;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x4F1A;&#x9690;&#x5F0F;&#x8F6C;&#x6362;&#x4E3A; <code>Symbol(foo)</code> &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x9020;&#x6210;&#x540C;&#x540D;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = SymbolPolyfill(&apos;foo&apos;);
var b = SymbolPolyfill(&apos;foo&apos;);

console.log(a ===  b); // false

var o = {};
o[a] = &apos;hello&apos;;
o[b] = &apos;hi&apos;;

console.log(o); // {Symbol(foo): &apos;hi&apos;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = SymbolPolyfill(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-keyword">var</span> b = SymbolPolyfill(<span class="hljs-string">&apos;foo&apos;</span>);

<span class="hljs-built_in">console</span>.log(a ===  b); <span class="hljs-comment">// false</span>

<span class="hljs-keyword">var</span> o = {};
o[a] = <span class="hljs-string">&apos;hello&apos;</span>;
o[b] = <span class="hljs-string">&apos;hi&apos;</span>;

<span class="hljs-built_in">console</span>.log(o); <span class="hljs-comment">// {Symbol(foo): &apos;hi&apos;}</span></code></pre><p>&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x540C;&#x540D;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6BD5;&#x7ADF;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x8FEB;&#x4E0D;&#x5F97;&#x5DF2;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4FEE;&#x6539; toString &#x65B9;&#x6CD5;&#xFF0C;&#x8BA9;&#x5B83;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x7B2C; 8 &#x70B9;&#x5C31;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x800C;&#x4E14;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x518D;&#x5199;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x751F;&#x6210; &#x552F;&#x4E00;&#x503C;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x547D;&#x540D;&#x4E3A; generateName&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x8BE5;&#x552F;&#x4E00;&#x503C;&#x6DFB;&#x52A0;&#x5230;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x7684; __Name__ &#x5C5E;&#x6027;&#x4E2D;&#x4FDD;&#x5B58;&#x4E0B;&#x6765;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;&#x4E09;&#x7248;
(function() {
    var root = this;

    var generateName = (function(){
        var postfix = 0;
        return function(descString){
            postfix++;
            return &apos;@@&apos; + descString + &apos;_&apos; + postfix
        }
    })()

    var SymbolPolyfill = function Symbol(description) {

        if (this instanceof SymbolPolyfill) throw new TypeError(&apos;Symbol is not a constructor&apos;);

        var descString = description === undefined ? undefined : String(description)

        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            }
        })

        Object.defineProperties(symbol, {
            &apos;__Description__&apos;: {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },
            &apos;__Name__&apos;: {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        return symbol;
    }


    root.SymbolPolyfill = SymbolPolyfill;

})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;&#x4E09;&#x7248;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> root = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> generateName = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> postfix = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">descString</span>)</span>{
            postfix++;
            <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;@@&apos;</span> + descString + <span class="hljs-string">&apos;_&apos;</span> + postfix
        }
    })()

    <span class="hljs-keyword">var</span> SymbolPolyfill = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Symbol</span>(<span class="hljs-params">description</span>) </span>{

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> SymbolPolyfill) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Symbol is not a constructor&apos;</span>);

        <span class="hljs-keyword">var</span> descString = description === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">String</span>(description)

        <span class="hljs-keyword">var</span> symbol = <span class="hljs-built_in">Object</span>.create({
            <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__Name__;
            }
        })

        <span class="hljs-built_in">Object</span>.defineProperties(symbol, {
            <span class="hljs-string">&apos;__Description__&apos;</span>: {
                <span class="hljs-attr">value</span>: descString,
                <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>
            },
            <span class="hljs-string">&apos;__Name__&apos;</span>: {
                <span class="hljs-attr">value</span>: generateName(descString),
                <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>
            }
        });

        <span class="hljs-keyword">return</span> symbol;
    }


    root.SymbolPolyfill = SymbolPolyfill;

})()</code></pre><p>&#x6B64;&#x65F6;&#x518D;&#x770B;&#x4E0B;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = SymbolPolyfill(&apos;foo&apos;);
var b = SymbolPolyfill(&apos;foo&apos;);

console.log(a ===  b); // false

var o = {};
o[a] = &apos;hello&apos;;
o[b] = &apos;hi&apos;;

console.log(o); // Object { &quot;@@foo_1&quot;: &quot;hello&quot;, &quot;@@foo_2&quot;: &quot;hi&quot; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = SymbolPolyfill(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-keyword">var</span> b = SymbolPolyfill(<span class="hljs-string">&apos;foo&apos;</span>);

<span class="hljs-built_in">console</span>.log(a ===  b); <span class="hljs-comment">// false</span>

<span class="hljs-keyword">var</span> o = {};
o[a] = <span class="hljs-string">&apos;hello&apos;</span>;
o[b] = <span class="hljs-string">&apos;hi&apos;</span>;

<span class="hljs-built_in">console</span>.log(o); <span class="hljs-comment">// Object { &quot;@@foo_1&quot;: &quot;hello&quot;, &quot;@@foo_2&quot;: &quot;hi&quot; }</span></code></pre><h2 id="articleHeader6">&#x7B2C;&#x56DB;&#x7248;</h2><p>&#x6211;&#x4EEC;&#x518D;&#x770B;&#x770B;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x7279;&#x6027;&#x3002;</p><p><strong>7.Symbol &#x503C;&#x4E0D;&#x80FD;&#x4E0E;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#x3002;</strong></p><p>&#x4EE5; <code>+</code> &#x64CD;&#x4F5C;&#x7B26;&#x4E3A;&#x4F8B;&#xFF0C;&#x5F53;&#x8FDB;&#x884C;&#x9690;&#x5F0F;&#x7C7B;&#x578B;&#x8F6C;&#x6362;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x5148;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684; valueOf &#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x57FA;&#x672C;&#x503C;&#xFF0C;&#x5C31;&#x4F1A;&#x518D;&#x8C03;&#x7528; toString &#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8003;&#x8651;&#x5728; valueOf &#x65B9;&#x6CD5;&#x4E2D;&#x8FDB;&#x884C;&#x62A5;&#x9519;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var symbol = Object.create({
    valueOf: function() {
        throw new Error(&apos;Cannot convert a Symbol value&apos;)
    }
})

console.log(&apos;1&apos; + symbol); // &#x62A5;&#x9519;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> symbol = <span class="hljs-built_in">Object</span>.create({
    <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Cannot convert a Symbol value&apos;</span>)
    }
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1&apos;</span> + symbol); <span class="hljs-comment">// &#x62A5;&#x9519;</span></code></pre><p>&#x770B;&#x7740;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x89E3;&#x51B3;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x662F;&#x663E;&#x5F0F;&#x8C03;&#x7528; valueOf &#x65B9;&#x6CD5;&#x5462;&#xFF1F;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x539F;&#x751F;&#x7684; Symbol &#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s1 = Symbol(&apos;foo&apos;)
console.log(s1.valueOf()); // Symbol(foo)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;foo&apos;</span>)
<span class="hljs-built_in">console</span>.log(s1.valueOf()); <span class="hljs-comment">// Symbol(foo)</span></code></pre><p>&#x662F;&#x7684;&#xFF0C;&#x5BF9;&#x4E8E;&#x539F;&#x751F; Symbol&#xFF0C;&#x663E;&#x5F0F;&#x8C03;&#x7528; valueOf &#x65B9;&#x6CD5;&#xFF0C;&#x4F1A;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8BE5; Symbol &#x503C;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x53C8;&#x65E0;&#x6CD5;&#x5224;&#x65AD;&#x662F;&#x663E;&#x5F0F;&#x8FD8;&#x662F;&#x9690;&#x5F0F;&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x6211;&#x4EEC;&#x5C31;&#x53EA;&#x80FD;&#x5B9E;&#x73B0;&#x4E00;&#x534A;&#xFF0C;&#x8981;&#x4E0D;&#x7136;&#x5B9E;&#x73B0;&#x9690;&#x5F0F;&#x8C03;&#x7528;&#x62A5;&#x9519;&#xFF0C;&#x8981;&#x4E0D;&#x7136;&#x5B9E;&#x73B0;&#x663E;&#x5F0F;&#x8C03;&#x7528;&#x8FD4;&#x56DE;&#x8BE5;&#x503C;&#xFF0C;&#x90A3;&#x2026;&#x2026;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x4E0D;&#x62A5;&#x9519;&#x7684;&#x90A3;&#x4E2A;&#x5427;&#xFF0C;&#x5373;&#x540E;&#x8005;&#x3002;</p><p>&#x6211;&#x4EEC;&#x8FEB;&#x4E0D;&#x5F97;&#x5DF2;&#x7684;&#x4FEE;&#x6539; valueOf &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;&#x56DB;&#x7248;
// &#x524D;&#x9762;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;

var symbol = Object.create({
    toString: function() {
        return this.__Name__;
    },
    valueOf: function() {
        return this;
    }
});
// &#x540E;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;&#x56DB;&#x7248;</span>
<span class="hljs-comment">// &#x524D;&#x9762;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;</span>

<span class="hljs-keyword">var</span> symbol = <span class="hljs-built_in">Object</span>.create({
    <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__Name__;
    },
    <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }
});
<span class="hljs-comment">// &#x540E;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;</span></code></pre><h2 id="articleHeader7">&#x7B2C;&#x4E94;&#x7248;</h2><p><strong>10. Symbol &#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x8BE5;&#x5C5E;&#x6027;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x5728; for...in&#x3001;for...of &#x5FAA;&#x73AF;&#x4E2D;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x88AB; Object.keys()&#x3001;Object.getOwnPropertyNames()&#x3001;JSON.stringify() &#x8FD4;&#x56DE;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5B83;&#x4E5F;&#x4E0D;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6709;&#x4E00;&#x4E2A; Object.getOwnPropertySymbols &#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709; Symbol &#x5C5E;&#x6027;&#x540D;&#x3002;</strong></p><p>&#x55EF;&#xFF0C;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x3002;</p><p><strong>11. &#x6709;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x91CD;&#x65B0;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x4E2A;Symbol&#x503C;&#xFF0C;Symbol.for&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#x3002;&#x5B83;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x641C;&#x7D22;&#x6709;&#x6CA1;&#x6709;&#x4EE5;&#x8BE5;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x540D;&#x79F0;&#x7684;Symbol&#x503C;&#x3002;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;Symbol&#x503C;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x65B0;&#x5EFA;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4EE5;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x4E3A;&#x540D;&#x79F0;&#x7684;Symbol&#x503C;&#x3002;</strong></p><p>&#x8FD9;&#x4E2A;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x4E8E;&#x51FD;&#x6570;&#x8BB0;&#x5FC6;&#xFF0C;&#x6211;&#x4EEC;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x50A8;&#x5B58;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x7684; Symbol &#x503C;&#x5373;&#x53EF;&#x3002;</p><p><strong>12. Symbol.keyFor &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5DF2;&#x767B;&#x8BB0;&#x7684; Symbol &#x7C7B;&#x578B;&#x503C;&#x7684; key&#x3002;</strong></p><p>&#x904D;&#x5386; forMap,&#x67E5;&#x627E;&#x8BE5;&#x503C;&#x5BF9;&#x5E94;&#x7684;&#x952E;&#x503C;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;&#x4E94;&#x7248;
// &#x524D;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;
var SymbolPolyfill = function() { ... }

var forMap = {};

Object.defineProperties(SymbolPolyfill, {
    &apos;for&apos;: {
        value: function(description) {
            var descString = description === undefined ? undefined : String(description)
            return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
        },
        writable: true,
        enumerable: false,
        configurable: true
    },
    &apos;keyFor&apos;: {
        value: function(symbol) {
            for (var key in forMap) {
                if (forMap[key] === symbol) return key;
            }
        },
        writable: true,
        enumerable: false,
        configurable: true
    }
});
// &#x540E;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7B2C;&#x4E94;&#x7248;</span>
<span class="hljs-comment">// &#x524D;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;</span>
<span class="hljs-keyword">var</span> SymbolPolyfill = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... }

<span class="hljs-keyword">var</span> forMap = {};

<span class="hljs-built_in">Object</span>.defineProperties(SymbolPolyfill, {
    <span class="hljs-string">&apos;for&apos;</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">description</span>) </span>{
            <span class="hljs-keyword">var</span> descString = description === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">String</span>(description)
            <span class="hljs-keyword">return</span> forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
        },
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-string">&apos;keyFor&apos;</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">symbol</span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> forMap) {
                <span class="hljs-keyword">if</span> (forMap[key] === symbol) <span class="hljs-keyword">return</span> key;
            }
        },
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
    }
});
<span class="hljs-comment">// &#x540E;&#x9762;&#x4EE3;&#x7801;&#x76F8;&#x540C; &#x2026;&#x2026;</span></code></pre><h2 id="articleHeader8">&#x5B8C;&#x6574;&#x5B9E;&#x73B0;</h2><p>&#x7EFC;&#x4E0A;&#x6240;&#x8FF0;&#xFF1A;</p><p>&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#x7279;&#x6027;&#x6709;&#xFF1A;1&#x3001;4&#x3001;7&#x3001;8&#x3001;10</p><p>&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#x7279;&#x6027;&#x6709;&#xFF1A;2&#x3001;3&#x3001;5&#x3001;6&#x3001;9&#x3001;11&#x3001;12</p><p>&#x6700;&#x540E;&#x7684;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    var root = this;

    var generateName = (function(){
        var postfix = 0;
        return function(descString){
            postfix++;
            return &apos;@@&apos; + descString + &apos;_&apos; + postfix
        }
    })()

    var SymbolPolyfill = function Symbol(description) {

        if (this instanceof SymbolPolyfill) throw new TypeError(&apos;Symbol is not a constructor&apos;);

        var descString = description === undefined ? undefined : String(description)

        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            },
            valueOf: function() {
                return this;
            }
        })

        Object.defineProperties(symbol, {
            &apos;__Description__&apos;: {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },
            &apos;__Name__&apos;: {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        return symbol;
    }

    var forMap = {};

    Object.defineProperties(SymbolPolyfill, {
        &apos;for&apos;: {
            value: function(description) {
                var descString = description === undefined ? undefined : String(description)
                return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
            },
            writable: true,
            enumerable: false,
            configurable: true
        },
        &apos;keyFor&apos;: {
            value: function(symbol) {
                for (var key in forMap) {
                    if (forMap[key] === symbol) return key;
                }
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    });

    root.SymbolPolyfill = SymbolPolyfill;

})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> root = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> generateName = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> postfix = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">descString</span>)</span>{
            postfix++;
            <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;@@&apos;</span> + descString + <span class="hljs-string">&apos;_&apos;</span> + postfix
        }
    })()

    <span class="hljs-keyword">var</span> SymbolPolyfill = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Symbol</span>(<span class="hljs-params">description</span>) </span>{

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> SymbolPolyfill) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Symbol is not a constructor&apos;</span>);

        <span class="hljs-keyword">var</span> descString = description === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">String</span>(description)

        <span class="hljs-keyword">var</span> symbol = <span class="hljs-built_in">Object</span>.create({
            <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__Name__;
            },
            <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            }
        })

        <span class="hljs-built_in">Object</span>.defineProperties(symbol, {
            <span class="hljs-string">&apos;__Description__&apos;</span>: {
                <span class="hljs-attr">value</span>: descString,
                <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>
            },
            <span class="hljs-string">&apos;__Name__&apos;</span>: {
                <span class="hljs-attr">value</span>: generateName(descString),
                <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>
            }
        });

        <span class="hljs-keyword">return</span> symbol;
    }

    <span class="hljs-keyword">var</span> forMap = {};

    <span class="hljs-built_in">Object</span>.defineProperties(SymbolPolyfill, {
        <span class="hljs-string">&apos;for&apos;</span>: {
            <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">description</span>) </span>{
                <span class="hljs-keyword">var</span> descString = description === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-built_in">String</span>(description)
                <span class="hljs-keyword">return</span> forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
            },
            <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-string">&apos;keyFor&apos;</span>: {
            <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">symbol</span>) </span>{
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> forMap) {
                    <span class="hljs-keyword">if</span> (forMap[key] === symbol) <span class="hljs-keyword">return</span> key;
                }
            },
            <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
        }
    });

    root.SymbolPolyfill = SymbolPolyfill;

})()</code></pre><h2 id="articleHeader9">ES6 &#x7CFB;&#x5217;</h2><p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p><p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之模拟实现 Symbol 类型

## 原文链接
[https://segmentfault.com/a/1190000015262174](https://segmentfault.com/a/1190000015262174)


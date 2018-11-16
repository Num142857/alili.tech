---
title: 如何编写 Typescript 声明文件
hidden: true
categories: [reprint]
slug: f74ee42
date: 2018-11-04 02:30:10
---

{{< raw >}}
<p>&#x4F7F;&#x7528;<code>TypeScript</code>&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#xFF0C;&#x8FD9;&#x7684;&#x786E;&#x662F;&#x4E00;&#x4E2A;&#x597D;&#x4E1C;&#x897F;&#xFF0C;&#x867D;&#x8BF4;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E5F;&#x53D1;&#x73B0;&#x4E86;&#x4E00;&#x4E9B;<code>bug</code>&#xFF0C;&#x4E0D;&#x8FC7;&#x90FD;&#x662F;&#x4E9B;&#x5C0F;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x6574;&#x4F53;&#x4F53;&#x9A8C;&#x8FD8;&#x662F;&#x5F88;&#x4E0D;&#x9519;&#x7684;&#x3002;</p><p><code>TypeScript</code>&#x4E4B;&#x6240;&#x4EE5;&#x53EB;<code>Type</code>&#xFF0C;&#x548C;&#x5B83;&#x7684;&#x5F3A;&#x7C7B;&#x578B;&#x662F;&#x5206;&#x4E0D;&#x5F00;&#x7684;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x533A;&#x522B;&#x4E8E;<code>JavaScript</code>&#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x70B9;&#xFF0C;&#x7C7B;&#x578B;&#x7684;&#x58F0;&#x660E;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5199;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5355;&#x72EC;&#x5199;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x8868;&#x793A;&#x7C7B;&#x578B;&#x7684;&#x63CF;&#x8FF0;&#x6587;&#x4EF6;<code>*.d.ts</code>&#x3002;</p><h2 id="articleHeader0">&#x5E38;&#x7528;&#x65B9;&#x5F0F;</h2><p>&#x9996;&#x5148;&#x5728;<code>d.ts</code>&#x4E2D;&#x662F;&#x4E0D;&#x4F1A;&#x5B58;&#x5728;&#x6709;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x5B9A;&#x4E49;&#x7684;&#xFF08;&#x56E0;&#x4E3A;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x5199;&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x3001;&#x53D8;&#x91CF;&#x540E;&#x8FB9;&#x7684;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x610F;&#x4E49;&#xFF09;&#xFF0C;&#x58F0;&#x660E;&#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x5F80;&#x5F80;&#x90FD;&#x662F;&#x4E00;&#x4E9B;&#x590D;&#x6742;&#x7ED3;&#x6784;&#x7684;&#x7C7B;&#x578B;&#x3002;</p><p>&#x5927;&#x90E8;&#x5206;&#x8BED;&#x6CD5;&#x90FD;&#x4E0E;&#x5199;&#x5728;&#x666E;&#x901A;<code>ts</code>&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x8BED;&#x6CD5;&#x4E00;&#x81F4;&#xFF0C;&#x4E5F;&#x662F;<code>export</code>&#x540E;&#x8FB9;&#x8DDF;&#x4E0A;&#x8981;&#x5BFC;&#x51FA;&#x7684;&#x6210;&#x5458;&#x3002;</p><p>&#x6700;&#x7B80;&#x5355;&#x7684;&#x5C31;&#x662F;&#x4F7F;&#x7528;<code>type</code>&#x5173;&#x952E;&#x5B57;&#x6765;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type A = {                 // &#x5B9A;&#x4E49;&#x590D;&#x6742;&#x7ED3;&#x6784;
  b: number
  c: string
}

type Func = () =&gt; number   // &#x5B9A;&#x4E49;&#x51FD;&#x6570;

type Key = number | string // &#x591A;&#x4E2A;&#x7C7B;&#x578B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">type</span> A = {                 <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x590D;&#x6742;&#x7ED3;&#x6784;</span>
  b: <span class="hljs-built_in">number</span>
  c: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">type</span> Func = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">number</span>   <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x51FD;&#x6570;</span>

<span class="hljs-keyword">type</span> Key = <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span> <span class="hljs-comment">// &#x591A;&#x4E2A;&#x7C7B;&#x578B;</span></code></pre><h3 id="articleHeader1">&#x7EC4;&#x5408;&#x7C7B;&#x578B;</h3><p>&#x4EE5;&#x53CA;&#x5728;<code>TypeScript</code>&#x4E2D;&#x6709;&#x7740;&#x5F88;&#x8F7B;&#x677E;&#x7684;&#x65B9;&#x5F0F;&#x9488;&#x5BF9;<code>type</code>&#x8FDB;&#x884C;&#x590D;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;<code>Animal</code>&#x7C7B;&#x578B;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E2A;<code>Dog</code>&#x7C7B;&#x578B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>&amp;</code>&#x6765;&#x8FDB;&#x884C;&#x590D;&#x7528;&#x3002;</p><p><em>P.S&gt; <code>&amp;</code>&#x7B26;&#x53F7;&#x53EF;&#x4EE5;&#x62FC;&#x63A5;&#x591A;&#x4E2A;</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Animal = {
  weight: number
  height: number
}

type Dog = Animal &amp; {
  leg: number
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">type</span> Animal = {
  weight: <span class="hljs-built_in">number</span>
  height: <span class="hljs-built_in">number</span>
}

<span class="hljs-keyword">type</span> Dog = Animal &amp; {
  leg: <span class="hljs-built_in">number</span>
}</code></pre><h3 id="articleHeader2">&#x52A8;&#x6001;&#x7684; JSON &#x7C7B;&#x578B;&#x6307;&#x5B9A;</h3><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;<code>JSON</code>&#x7ED3;&#x6784;&#xFF0C;&#x800C;&#x5B83;&#x7684;<code>key</code>&#x662F;&#x52A8;&#x6001;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x4E0D;&#x80FD;&#x5C06;&#x6240;&#x6709;&#x7684;<code>key</code>&#x90FD;&#x5199;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x7B80;&#x5355;&#x7684;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x901A;&#x914D;&#x7B26;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type info = {
  [k: string]: string | number // &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x591A;&#x4E2A;&#x7C7B;&#x578B;
}

const infos: info = {
  a: 1,
  b: &apos;2&apos;,
  c: true, // error &#x7C7B;&#x578B;&#x4E0D;&#x5339;&#x914D;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">type</span> info = {
  [k: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x591A;&#x4E2A;&#x7C7B;&#x578B;</span>
}

<span class="hljs-keyword">const</span> infos: info = {
  a: <span class="hljs-number">1</span>,
  b: <span class="hljs-string">&apos;2&apos;</span>,
  c: <span class="hljs-literal">true</span>, <span class="hljs-comment">// error &#x7C7B;&#x578B;&#x4E0D;&#x5339;&#x914D;</span>
}</code></pre><p>&#x4EE5;&#x53CA;&#x5728;&#x65B0;&#x7684;&#x7248;&#x672C;&#x4E2D;&#x66F4;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x5185;&#x7F6E;&#x51FD;&#x6570;<code>Record</code>&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const infos: Record&lt;string, string | number&gt; = {
  a: 1,
  b: &apos;2&apos;,
  c: true, // error
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> infos: Record&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt; = {
  a: <span class="hljs-number">1</span>,
  b: <span class="hljs-string">&apos;2&apos;</span>,
  c: <span class="hljs-literal">true</span>, <span class="hljs-comment">// error</span>
}</code></pre><h3 id="articleHeader3">&#x83B7;&#x53D6;&#x53D8;&#x91CF;&#x7684;&#x7C7B;&#x578B;</h3><p>&#x5047;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;JSON&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x8FB9;&#x5305;&#x542B;&#x4E86;<code>name</code>&#x3001;<code>age</code>&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x4E9B;<code>TypeScript</code>&#x5185;&#x7F6E;&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x6709;&#x610F;&#x601D;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>&#x901A;&#x8FC7;<code>keyof</code>&#x4E0E;<code>typeof</code>&#x7EC4;&#x5408;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
  name: &apos;Niko&apos;,
  age: 18
}

// &#x5982;&#x679C;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x53D6;&#x503C;&#xFF0C;&#x53EA;&#x80FD;&#x5199;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x4E0D;&#x80FD;&#x5199;&#x5728; d.ts &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;&#x58F0;&#x660E;&#x6587;&#x4EF6;&#x91CC;&#x8FB9;&#x4E0D;&#x80FD;&#x5B58;&#x5728;&#x5B9E;&#x9645;&#x6709;&#x6548;&#x7684;&#x4EE3;&#x7801;
type keys = keyof typeof obj

let a: keys = &apos;name&apos; // pass
let b: keys = &apos;age&apos;  // pass

let c: keys = &apos;test&apos; // error" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> obj = {
  name: <span class="hljs-string">&apos;Niko&apos;</span>,
  age: <span class="hljs-number">18</span>
}

<span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x53D6;&#x503C;&#xFF0C;&#x53EA;&#x80FD;&#x5199;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x4E0D;&#x80FD;&#x5199;&#x5728; d.ts &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;&#x58F0;&#x660E;&#x6587;&#x4EF6;&#x91CC;&#x8FB9;&#x4E0D;&#x80FD;&#x5B58;&#x5728;&#x5B9E;&#x9645;&#x6709;&#x6548;&#x7684;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">type</span> keys = keyof <span class="hljs-keyword">typeof</span> obj

<span class="hljs-keyword">let</span> a: keys = <span class="hljs-string">&apos;name&apos;</span> <span class="hljs-comment">// pass</span>
<span class="hljs-keyword">let</span> b: keys = <span class="hljs-string">&apos;age&apos;</span>  <span class="hljs-comment">// pass</span>

<span class="hljs-keyword">let</span> c: keys = <span class="hljs-string">&apos;test&apos;</span> <span class="hljs-comment">// error</span></code></pre><p>&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x5C06;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x4E0D;&#x7EDF;&#x4E00;&#x7684;<code>JSON</code>&#x4FEE;&#x6539;&#x4E3A;&#x7EDF;&#x4E00;&#x7C7B;&#x578B;&#x7684;<code>JSON</code>&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
  name: &apos;Niko&apos;,
  age: 18,
  birthday: new Date()
}

const infos: Record&lt;keyof typeof obj, string&gt; = {
  name: &apos;&apos;,
  age: &apos;&apos;,
  birthday: 123, // &#x51FA;&#x9519;&#xFF0C;&#x63D0;&#x793A;&#x7C7B;&#x578B;&#x4E0D;&#x5339;&#x914D;
  test: &apos;&apos;, // &#x63D0;&#x793A;&#x4E0D;&#x662F;`info`&#x7684;&#x5DF2;&#x77E5;&#x7C7B;&#x578B;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> obj = {
  name: <span class="hljs-string">&apos;Niko&apos;</span>,
  age: <span class="hljs-number">18</span>,
  birthday: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
}

<span class="hljs-keyword">const</span> infos: Record&lt;keyof <span class="hljs-keyword">typeof</span> obj, <span class="hljs-built_in">string</span>&gt; = {
  name: <span class="hljs-string">&apos;&apos;</span>,
  age: <span class="hljs-string">&apos;&apos;</span>,
  birthday: <span class="hljs-number">123</span>, <span class="hljs-comment">// &#x51FA;&#x9519;&#xFF0C;&#x63D0;&#x793A;&#x7C7B;&#x578B;&#x4E0D;&#x5339;&#x914D;</span>
  test: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x63D0;&#x793A;&#x4E0D;&#x662F;`info`&#x7684;&#x5DF2;&#x77E5;&#x7C7B;&#x578B;</span>
}</code></pre><h3 id="articleHeader4">&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;</h3><p>&#x53C8;&#x6BD4;&#x5982;&#x8BF4;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>JSON</code>&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FD9;&#x4E2A;<code>JSON</code>&#x6765;&#x4F5C;&#x4E3A;&#x7C7B;&#x578B;&#x3002;</p><p>&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>ReturnType&lt;&gt;</code>&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func () {
  return {
    name: &apos;Niko&apos;,
    age: 18
  }
}

type results = ReturnType&lt;typeof func&gt;

// &#x6216;&#x8005;&#x4E5F;&#x53EF;&#x4EE5;&#x62FC;&#x63A5; keyof &#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684; key
type resultKeys = keyof ReturnType&lt;typeof func&gt;

// &#x4EA6;&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x653E;&#x5728;`Object`&#x4E2D;&#x4F5C;&#x4E3A;&#x52A8;&#x6001;&#x7684;`key`&#x5B58;&#x5728;
type infoJson = Record&lt;keyof ReturnType&lt;typeof func&gt;, string&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    name: <span class="hljs-string">&apos;Niko&apos;</span>,
    age: <span class="hljs-number">18</span>
  }
}

<span class="hljs-keyword">type</span> results = ReturnType&lt;<span class="hljs-keyword">typeof</span> func&gt;

<span class="hljs-comment">// &#x6216;&#x8005;&#x4E5F;&#x53EF;&#x4EE5;&#x62FC;&#x63A5; keyof &#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684; key</span>
<span class="hljs-keyword">type</span> resultKeys = keyof ReturnType&lt;<span class="hljs-keyword">typeof</span> func&gt;

<span class="hljs-comment">// &#x4EA6;&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x653E;&#x5728;`Object`&#x4E2D;&#x4F5C;&#x4E3A;&#x52A8;&#x6001;&#x7684;`key`&#x5B58;&#x5728;</span>
<span class="hljs-keyword">type</span> infoJson = Record&lt;keyof ReturnType&lt;<span class="hljs-keyword">typeof</span> func&gt;, <span class="hljs-built_in">string</span>&gt;</code></pre><h3 id="articleHeader5">&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x58F0;&#x660E;&#x51FD;&#x6570;&#x548C;<code>class</code>&#x7C7B;&#x578B;</h3><p>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x51FD;&#x6570;&#x548C;<code>class</code>&#x5728;&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x662F;&#x90FD;&#x6709;&#x5B9E;&#x9645;&#x7684;&#x4EE3;&#x7801;&#x7684;&#xFF08;&#x51FD;&#x6570;&#x4F53;&#x3001;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;&#x3002;<br>&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x662F;&#x5199;&#x5728;<code>d.ts</code>&#x58F0;&#x660E;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#xFF0C;&#x8FD9;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x9488;&#x5BF9;&#x7C7B;&#x578B;&#x7684;&#x7EA6;&#x675F;&#xFF0C;&#x6240;&#x4EE5;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x4F1A;&#x5B58;&#x5728;&#x771F;&#x5B9E;&#x7684;&#x4EE3;&#x7801;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x5728;&#x666E;&#x901A;&#x7684;<code>ts</code>&#x6587;&#x4EF6;&#x4E2D;&#x8FD9;&#x4E48;&#x5199;&#x4F1A;&#x51FA;&#x9519;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9488;&#x5BF9;&#x8FD9;&#x7C7B;&#x60C5;&#x51B5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>declare</code>&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x8868;&#x793A;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x7684;&#xFF0C;&#x800C;&#x975E;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3001;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Personal {
  name: string
  // ^ &#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x63D0;&#x793A;`name`&#x5FC5;&#x987B;&#x663E;&#x5F0F;&#x7684;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;
}

function getName (personal: Personal): name
// ^ &#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x63D0;&#x793A;&#x51FD;&#x6570;&#x7F3A;&#x5931;&#x5B9E;&#x73B0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> Personal {
  name: <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// ^ &#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x63D0;&#x793A;`name`&#x5FC5;&#x987B;&#x663E;&#x5F0F;&#x7684;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span> (<span class="hljs-params">personal: Personal</span>): <span class="hljs-title">name</span>
// ^ &#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x63D0;&#x793A;&#x51FD;&#x6570;&#x7F3A;&#x5931;&#x5B9E;&#x73B0;</span></code></pre><p>&#x4EE5;&#x4E0B;&#x4E3A;&#x6B63;&#x786E;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-declare class Personal {
+declare class Personal {
  name: string
}

-function getName (personal: Personal): name
+declare function getName (personal: Personal): name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="diff hljs"><code class="diff"><span class="hljs-deletion">-declare class Personal {</span>
<span class="hljs-addition">+declare class Personal {</span>
  name: string
}

<span class="hljs-deletion">-function getName (personal: Personal): name</span>
<span class="hljs-addition">+declare function getName (personal: Personal): name</span></code></pre><p><strong>&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x662F;&#x4E0D;&#x5EFA;&#x8BAE;&#x8FD9;&#x4E48;&#x5B9A;&#x4E49;<code>class</code>&#x7684;&#xFF0C;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;<code>interface</code>&#x6765;&#x4EE3;&#x66FF;&#x5B83;&#xFF0C;&#x8FD9;&#x6837;&#x7684;<code>class</code>&#x5E94;&#x8BE5;&#x4EC5;&#x5B58;&#x5728;&#x4E8E;&#x9488;&#x5BF9;&#x975E;<code>TS</code>&#x6A21;&#x5757;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x81EA;&#x5DF1;&#x5F00;&#x53D1;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x90A3;&#x4E48;&#x672C;&#x8EAB;&#x7ED3;&#x6784;&#x5C31;&#x5177;&#x6709;&#x58F0;&#x660E;&#x7C7B;&#x578B;&#x7684;&#x7279;&#x6027;&#x3002;</strong></p><h2 id="articleHeader6">&#x51FD;&#x6570;&#x91CD;&#x8F7D;</h2><p>&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#x662F;&#x5728;&#x4E00;&#x4E9B;&#x5F3A;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#x4E2D;&#x624D;&#x6709;&#x7684;&#xFF0C;&#x4F9D;&#x6258;&#x4E8E;<code>TypeScript</code>&#xFF0C;&#x8FD9;&#x4E5F;&#x7B97;&#x662F;&#x4E00;&#x95E8;&#x5F3A;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x4F1A;&#x6709;&#x9700;&#x8981;&#x7528;&#x5230;&#x8FD9;&#x79CD;&#x58F0;&#x660E;&#x7684;&#x5730;&#x65B9;&#x3002;</p><p>&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;<code>add</code>&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x63A5;&#x6536;<code>string</code>&#x7C7B;&#x578B;&#x7684;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x62FC;&#x63A5;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x63A5;&#x6536;<code>number</code>&#x7C7B;&#x578B;&#x7684;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x76F8;&#x52A0;&#x3002;</p><p><strong>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x53EA;&#x6709;&#x5728;&#x505A;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x5B9A;&#x4E49;&#x65F6;&#x80FD;&#x591F;&#x653E;&#x5230;<code>d.ts</code>&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5176;&#x4ED6;&#x73AF;&#x5883;&#x4E0B;&#x5EFA;&#x8BAE;&#x5C06;&#x51FD;&#x6570;&#x7684;&#x5B9A;&#x4E49;&#x4E0E;&#x5B9E;&#x73B0;&#x653E;&#x5728;&#x4E00;&#x8D77;&#xFF08;&#x867D;&#x8BF4;&#x914D;&#x7F6E;<code>paths</code>&#x4E5F;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x5206;&#x5F00;&#x5904;&#x7406;&#xFF0C;&#x4F46;&#x662F;&#x90A3;&#x6837;&#x5C31;&#x5931;&#x53BB;&#x4E86;&#x5BF9;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x65F6;&#x7684;&#x7EA6;&#x675F;&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.ts

// &#x4E0A;&#x8FB9;&#x662F;&#x58F0;&#x660E;
function add (arg1: string, arg2: string): string
function add (arg1: number, arg2: number): number
// &#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;&#x4E0B;&#x8FB9;&#x6709;&#x5177;&#x4F53;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x6DFB;&#x52A0; declare &#x5173;&#x952E;&#x5B57;

// &#x4E0B;&#x8FB9;&#x662F;&#x5B9E;&#x73B0;
function add (arg1: string | number, arg2: string | number) {
  // &#x5728;&#x5B9E;&#x73B0;&#x4E0A;&#x6211;&#x4EEC;&#x8981;&#x6CE8;&#x610F;&#x4E25;&#x683C;&#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#x662F;&#x5426;&#x76F8;&#x7B49;&#xFF0C;&#x800C;&#x4E0D;&#x80FD;&#x7B80;&#x5355;&#x7684;&#x5199;&#x4E00;&#x4E2A; arg1 + arg2
  if (typeof arg1 === &apos;string&apos; &amp;&amp; typeof arg2 === &apos;string&apos;) {
    return arg1 + arg2
  } else if (typeof arg1 === &apos;number&apos; &amp;&amp; typeof arg2 === &apos;number&apos;) {
    return arg1 + arg2
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// index.ts</span>

<span class="hljs-comment">// &#x4E0A;&#x8FB9;&#x662F;&#x58F0;&#x660E;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params">arg1: <span class="hljs-built_in">string</span>, arg2: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">string</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params">arg1: <span class="hljs-built_in">number</span>, arg2: <span class="hljs-built_in">number</span></span>): <span class="hljs-title">number</span>
// &#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;&#x4E0B;&#x8FB9;&#x6709;&#x5177;&#x4F53;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x6DFB;&#x52A0; <span class="hljs-title">declare</span> &#x5173;&#x952E;&#x5B57;

// &#x4E0B;&#x8FB9;&#x662F;&#x5B9E;&#x73B0;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params">arg1: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>, arg2: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) </span>{
  // &#x5728;&#x5B9E;&#x73B0;&#x4E0A;&#x6211;&#x4EEC;&#x8981;&#x6CE8;&#x610F;&#x4E25;&#x683C;&#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#x662F;&#x5426;&#x76F8;&#x7B49;&#xFF0C;&#x800C;&#x4E0D;&#x80FD;&#x7B80;&#x5355;&#x7684;&#x5199;&#x4E00;&#x4E2A; <span class="hljs-title">arg1</span> + <span class="hljs-title">arg2</span>
  <span class="hljs-title">if</span> (<span class="hljs-params"><span class="hljs-keyword">typeof</span> arg1 === &apos;<span class="hljs-built_in">string</span>&apos; &amp;&amp; <span class="hljs-keyword">typeof</span> arg2 === &apos;<span class="hljs-built_in">string</span>&apos;</span>) </span>{
    <span class="hljs-title">return</span> <span class="hljs-title">arg1</span> + <span class="hljs-title">arg2</span>
  } <span class="hljs-title">else</span> <span class="hljs-title">if</span> (<span class="hljs-params"><span class="hljs-keyword">typeof</span> arg1 === &apos;<span class="hljs-built_in">number</span>&apos; &amp;&amp; <span class="hljs-keyword">typeof</span> arg2 === &apos;<span class="hljs-built_in">number</span>&apos;</span>) </span>{
    <span class="hljs-keyword">return</span> arg1 + arg2
  }
}</code></pre><p><strong><code>TypeScript</code> &#x4E2D;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x4E5F;&#x53EA;&#x662F;&#x591A;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x58F0;&#x660E;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x903B;&#x8F91;&#x8FD8;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x53BB;&#x5199;&#xFF0C;&#x4ED6;&#x5E76;&#x4E0D;&#x4F1A;&#x771F;&#x7684;&#x5C06;&#x4F60;&#x7684;&#x591A;&#x4E2A;&#x91CD;&#x540D; function &#x7684;&#x51FD;&#x6570;&#x4F53;&#x8FDB;&#x884C;&#x5408;&#x5E76;</strong></p><h3 id="articleHeader7">&#x591A;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x987A;&#x5E8F;&#x95EE;&#x9898;</h3><p>&#x60F3;&#x8C61;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4F20;&#x5165;<code>Date</code>&#x7C7B;&#x578B;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x5176;<code>unix</code>&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;<code>Object</code>&#xFF0C;&#x5219;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5177;&#x4F53;&#x7C7B;&#x578B;&#x8FDB;&#x884C;<code>toString</code>&#x8F93;&#x51FA;&#xFF0C;&#x5176;&#x4F59;&#x60C5;&#x51B5;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x5199;&#xFF1F;</p><p><em>&#x4EC5;&#x505A;&#x793A;&#x4F8B;&#x6F14;&#x793A;&#xFF0C;&#x4E00;&#x822C;&#x6B63;&#x5E38;&#x4EBA;&#x4E0D;&#x4F1A;&#x5199;&#x51FA;&#x8FD9;&#x6837;&#x7684;&#x51FD;&#x6570;...</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function build (arg: any) {
  if (arg instanceof Date) {
    return arg.valueOf()
  } else if (typeof arg === &apos;object&apos;) {
    return Object.prototype.toString.call(arg)
  } else {
    return arg
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span> (<span class="hljs-params">arg: <span class="hljs-built_in">any</span></span>) </span>{
  <span class="hljs-keyword">if</span> (arg <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
    <span class="hljs-keyword">return</span> arg.valueOf()
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> arg === <span class="hljs-string">&apos;object&apos;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> arg
  }
}</code></pre><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x5728;&#x58F0;&#x660E;&#x7684;&#x987A;&#x5E8F;&#x4E0A;&#x5C31;&#x5F88;&#x6709;&#x8BB2;&#x7A76;&#x4E86;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x5C06;&#x7CBE;&#x786E;&#x6027;&#x9AD8;&#x7684;&#x653E;&#x5728;&#x524D;&#x8FB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD9;&#x6837;&#x662F;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x56E0;&#x4E3A;&#x65E0;&#x8BBA;&#x600E;&#x6837;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x90FD;&#x4F1A;&#x662F;`any`&#x7C7B;&#x578B;
function build(arg: any): any
function build(arg: Object): string
function build(arg: Date): number" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// &#x8FD9;&#x6837;&#x662F;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x56E0;&#x4E3A;&#x65E0;&#x8BBA;&#x600E;&#x6837;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x90FD;&#x4F1A;&#x662F;`any`&#x7C7B;&#x578B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">arg: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">any</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">arg: <span class="hljs-built_in">Object</span></span>): <span class="hljs-title">string</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">arg: <span class="hljs-built_in">Date</span></span>): <span class="hljs-title">number</span></span></span></span></code></pre><p>&#x56E0;&#x4E3A;<code>TypeScript</code>&#x5728;&#x67E5;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x7684;&#x58F0;&#x660E;&#x4EE5;&#x540E;&#x5C31;&#x4F1A;&#x505C;&#x6B62;&#x4E0D;&#x4F1A;&#x7EE7;&#x7EED;&#x67E5;&#x627E;&#xFF0C;<code>any</code>&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x6A21;&#x7CCA;&#x7684;&#x8303;&#x56F4;&#xFF0C;&#x800C;<code>Object</code>&#x53C8;&#x662F;&#x5305;&#x542B;<code>Date</code>&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x6309;&#x7167;&#x987A;&#x5E8F;&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x8FDB;&#x884C;&#x6392;&#x5217;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function build(arg: Date): number
function build(arg: Object): string
function build(arg: any): any

// &#x8FD9;&#x6837;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x5F97;&#x5230;&#x6B63;&#x786E;&#x7684;&#x7C7B;&#x578B;&#x63D0;&#x793A;
const res1 = build(new Date()) // number
const res2 = build(() =&gt; { })  // string
const res3 = build(true)       // any" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">arg: <span class="hljs-built_in">Date</span></span>): <span class="hljs-title">number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">arg: <span class="hljs-built_in">Object</span></span>): <span class="hljs-title">string</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">arg: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">any</span>

// &#x8FD9;&#x6837;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x5F97;&#x5230;&#x6B63;&#x786E;&#x7684;&#x7C7B;&#x578B;&#x63D0;&#x793A;
<span class="hljs-title">const</span> <span class="hljs-title">res1</span> = <span class="hljs-title">build</span>(<span class="hljs-params"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(</span>)) // <span class="hljs-title">number</span>
<span class="hljs-title">const</span> <span class="hljs-title">res2</span> = <span class="hljs-title">build</span>(<span class="hljs-params">(</span>) =&gt; </span>{ })  // <span class="hljs-title">string</span>
<span class="hljs-title">const</span> <span class="hljs-title">res3</span> = <span class="hljs-title">build</span>(<span class="hljs-params"><span class="hljs-literal">true</span></span>)       // <span class="hljs-title">any</span></span></span></code></pre><h3 id="articleHeader8">&#x4E00;&#x4E9B;&#x4E0D;&#x9700;&#x8981;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x7684;&#x573A;&#x666F;</h3><p>&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x7684;&#x610F;&#x4E49;&#x5728;&#x4E8E;&#x80FD;&#x591F;&#x8BA9;&#x4F60;&#x77E5;&#x9053;&#x4F20;&#x5165;&#x4E0D;&#x540C;&#x7684;&#x53C2;&#x6570;&#x5F97;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x540C;&#xFF0C;&#x4F46;&#x662F;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#xFF08;__&#x7C7B;&#x578B;__&#xFF09;&#x5374;&#x76F8;&#x540C;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#xFF08;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#xFF09;&#x3002;</p><p><strong>&#x5982;&#x679C;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;&#x76F8;&#x540C;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x91CD;&#x8F7D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func (a: number): number
function func (a: number, b: number): number

// &#x50CF;&#x8FD9;&#x6837;&#x7684;&#x662F;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x53EF;&#x9009;&#x53C2;&#x6570;&#x6765;&#x4EE3;&#x66FF;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x7684;&#x5B9A;&#x4E49;
function func (a: number, b?: number): number
// &#x6CE8;&#x610F;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5728;&#x7C7B;&#x578B;&#x524D;&#x8FB9;&#x591A;&#x4E86;&#x4E00;&#x4E2A;`?`

// &#x4EA6;&#x6216;&#x662F;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x533A;&#x522B;&#x5BFC;&#x81F4;&#x7684;
function func (a: number): number
function func (a: string): number

// &#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x8054;&#x5408;&#x7C7B;&#x578B;&#x6765;&#x4EE3;&#x66FF;&#x51FD;&#x6570;&#x91CD;&#x8F7D;
function func (a: number | string): number" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params">a: <span class="hljs-built_in">number</span></span>): <span class="hljs-title">number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params">a: <span class="hljs-built_in">number</span>, b: <span class="hljs-built_in">number</span></span>): <span class="hljs-title">number</span>

// &#x50CF;&#x8FD9;&#x6837;&#x7684;&#x662F;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x53EF;&#x9009;&#x53C2;&#x6570;&#x6765;&#x4EE3;&#x66FF;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x7684;&#x5B9A;&#x4E49;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params">a: <span class="hljs-built_in">number</span>, b?: <span class="hljs-built_in">number</span></span>): <span class="hljs-title">number</span>
// &#x6CE8;&#x610F;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5728;&#x7C7B;&#x578B;&#x524D;&#x8FB9;&#x591A;&#x4E86;&#x4E00;&#x4E2A;`?`

// &#x4EA6;&#x6216;&#x662F;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x533A;&#x522B;&#x5BFC;&#x81F4;&#x7684;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params">a: <span class="hljs-built_in">number</span></span>): <span class="hljs-title">number</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params">a: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">number</span>

// &#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x8054;&#x5408;&#x7C7B;&#x578B;&#x6765;&#x4EE3;&#x66FF;&#x51FD;&#x6570;&#x91CD;&#x8F7D;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params">a: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span></span>): <span class="hljs-title">number</span></span></span></span></span></span></span></code></pre><h2 id="articleHeader9">Interface</h2><p><code>interface</code>&#x662F;&#x5728;<code>TypeScript</code>&#x4E2D;&#x72EC;&#x6709;&#x7684;&#xFF0C;&#x5728;<code>JavaScript</code>&#x5E76;&#x6CA1;&#x6709;<code>interface</code>&#x4E00;&#x8BF4;&#x3002;<br><em>&#x56E0;&#x4E3A;<code>interface</code>&#x53EA;&#x662F;&#x7528;&#x6765;&#x89C4;&#x5B9A;&#x5B9E;&#x73B0;&#x5B83;&#x7684;<code>class</code>&#x5BF9;&#x5E94;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5B9E;&#x8D28;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5BF9;&#x4E8E;&#x811A;&#x672C;&#x8BED;&#x8A00;&#x6765;&#x8BF4;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x65E0;&#x6548;&#x7684;&#x64CD;&#x4F5C;</em></p><p>&#x5728;&#x8BED;&#x6CD5;&#x4E0A;&#x4E0E;<code>class</code>&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x592A;&#x5927;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x4F46;&#x662F;&#x5728;<code>interface</code>&#x4E2D;&#x53EA;&#x80FD;&#x591F;&#x8FDB;&#x884C;&#x6210;&#x5458;&#x5C5E;&#x6027;&#x7684;&#x58F0;&#x660E;&#xFF0C;&#x4F8B;&#x5982;<code>function</code>&#x53EA;&#x80FD;&#x591F;&#x5199;&#x5177;&#x4F53;&#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#x4EE5;&#x53CA;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x5E76;&#x4E0D;&#x80FD;&#x591F;&#x5728;<code>interface</code>&#x4E2D;&#x7F16;&#x5199;&#x5177;&#x4F53;&#x7684;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x9488;&#x5BF9;&#x6210;&#x5458;&#x5C5E;&#x6027;&#x4E5F;&#x4E0D;&#x80FD;&#x591F;&#x76F4;&#x63A5;&#x5728;<code>interface</code>&#x4E2D;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x793A;&#x4F8B;
interface PersonalIntl {
  name: string = &apos;Niko&apos;

  sayHi (): string {
    return this.name
  }
}

// &#x5728; interface &#x4E2D;&#x53EA;&#x80FD;&#x5B58;&#x5728;&#x7C7B;&#x578B;&#x58F0;&#x660E;
interface PersonalIntl {
  name: string

  sayHi (): string
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// &#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x793A;&#x4F8B;</span>
<span class="hljs-keyword">interface</span> PersonalIntl {
  name: <span class="hljs-built_in">string</span> = <span class="hljs-string">&apos;Niko&apos;</span>

  sayHi (): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}

<span class="hljs-comment">// &#x5728; interface &#x4E2D;&#x53EA;&#x80FD;&#x5B58;&#x5728;&#x7C7B;&#x578B;&#x58F0;&#x660E;</span>
<span class="hljs-keyword">interface</span> PersonalIntl {
  name: <span class="hljs-built_in">string</span>

  sayHi (): <span class="hljs-built_in">string</span>
}</code></pre><p>&#x5176;&#x5B9E;&#x5728;&#x4E00;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528;<code>interface</code>&#x4E0E;&#x666E;&#x901A;&#x7684;<code>type</code>&#x5B9A;&#x4E49;&#x4E5F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x3002;<br>&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x8981;&#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x5B58;&#x5728;<code>name</code>&#x548C;<code>age</code>&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// types/personal.d.ts
export interface PersonalIntl {
  name: string
  age:  number
}

// index.d.ts
import { PersonalIntl } from &apos;./types/personal&apos;

const personal: PersonalIntl = {
  name: &apos;Niko&apos;,
  age:  18,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// types/personal.d.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> PersonalIntl {
  name: <span class="hljs-built_in">string</span>
  age:  <span class="hljs-built_in">number</span>
}

<span class="hljs-comment">// index.d.ts</span>
<span class="hljs-keyword">import</span> { PersonalIntl } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./types/personal&apos;</span>

<span class="hljs-keyword">const</span> personal: PersonalIntl = {
  name: <span class="hljs-string">&apos;Niko&apos;</span>,
  age:  <span class="hljs-number">18</span>,
}</code></pre><p>&#x5982;&#x679C;&#x5C06;<code>interface</code>&#x6362;&#x6210;<code>type</code>&#x5B9A;&#x4E49;&#x4E5F;&#x662F;&#x5B8C;&#x5168;&#x6CA1;&#x95EE;&#x9898;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// types/personal.d.ts
export type PersonalIntl = {
  name: string
  age:  number
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// types/personal.d.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> PersonalIntl = {
  name: <span class="hljs-built_in">string</span>
  age:  <span class="hljs-built_in">number</span>
}</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x5B9A;&#x4E49;&#x5728;&#x57FA;&#x4E8E;&#x4E0A;&#x8FB9;&#x7684;&#x4F7F;&#x7528;&#x662F;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x4E5F;&#x4EC5;&#x4EC5;&#x9002;&#x7528;&#x4E8E;<code>Object</code>&#x5B57;&#x9762;&#x91CF;&#x7684;&#x58F0;&#x660E;&#xFF0C;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x5F88;&#x597D;&#x7684;&#x7EA6;&#x675F;<code>class</code>&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x91C7;&#x7528;<code>interface</code>&#x6765;&#x7EA6;&#x675F;<code>class</code>&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { PersonalIntl } from &apos;./types/personal&apos;

class Personal implements PersonalIntl {
  constructor(public name: string, public age: number) { }

  // &#x4E0A;&#x8FB9;&#x7684;&#x7B80;&#x5199;&#x4E0E;&#x4E0B;&#x8FF0;&#x4EE3;&#x7801;&#x6548;&#x679C;&#x4E00;&#x81F4;

  public name: string
  public age: number

  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }
}

const personal = new Personal(&apos;niko&apos;, 18)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { PersonalIntl } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./types/personal&apos;</span>

<span class="hljs-keyword">class</span> Personal <span class="hljs-keyword">implements</span> PersonalIntl {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> name: <span class="hljs-built_in">string</span>, <span class="hljs-keyword">public</span> age: <span class="hljs-built_in">number</span></span>) { }

  <span class="hljs-comment">// &#x4E0A;&#x8FB9;&#x7684;&#x7B80;&#x5199;&#x4E0E;&#x4E0B;&#x8FF0;&#x4EE3;&#x7801;&#x6548;&#x679C;&#x4E00;&#x81F4;</span>

  <span class="hljs-keyword">public</span> name: <span class="hljs-built_in">string</span>
  <span class="hljs-keyword">public</span> age: <span class="hljs-built_in">number</span>

  <span class="hljs-keyword">constructor</span> (<span class="hljs-params">name: <span class="hljs-built_in">string</span>, age: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.age = age
  }
}

<span class="hljs-keyword">const</span> personal = <span class="hljs-keyword">new</span> Personal(<span class="hljs-string">&apos;niko&apos;</span>, <span class="hljs-number">18</span>)</code></pre><h3 id="articleHeader10">&#x5173;&#x4E8E;&#x51FD;&#x6570;&#x6210;&#x5458;&#x58F0;&#x660E;&#x7684;&#x4E00;&#x4E9B;&#x7591;&#x60D1;</h3><p>&#x9996;&#x5148;&#xFF0C;&#x5728;&#x63A5;&#x53E3;&#x4E2D;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x5B9E;&#x4F8B;&#x4E0A;&#xFF0C;&#x4E00;&#x4E2A;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x3002;<br>&#x4E24;&#x79CD;&#x58F0;&#x660E;&#x65B9;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface PersonalIntl {
  func1 (): any      // &#x539F;&#x578B;&#x94FE;&#x65B9;&#x6CD5;

  func2: () =&gt; any   // &#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> PersonalIntl {
  func1 (): <span class="hljs-built_in">any</span>      <span class="hljs-comment">// &#x539F;&#x578B;&#x94FE;&#x65B9;&#x6CD5;</span>

  func2: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">any</span>   <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5C5E;&#x6027;</span>
}</code></pre><p>&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5728;&#x5B9E;&#x73B0;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x65F6;&#x5176;&#x5B9E;&#x662F;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x7684;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5F3A;&#x8981;&#x6C42;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x54EA;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Personal implements PersonalIntl {
  func1 () {
    console.log(this)
  }

  func2 = () =&gt; {
    console.log(this)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> Personal <span class="hljs-keyword">implements</span> PersonalIntl {
  func1 () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
  }

  func2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
  }
}</code></pre><p>&#x5176;&#x5B9E;&#x8FD9;&#x4E24;&#x8005;&#x5728;&#x7F16;&#x8BD1;&#x540E;&#x7684;<code>JavaScript</code>&#x4EE3;&#x7801;&#x4E2D;&#x662F;&#x6709;&#x533A;&#x522B;&#x7684;&#xFF0C;&#x5E76;&#x4E0D;&#x6E05;&#x695A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;<code>bug</code>&#x8FD8;&#x662F;&#x8BBE;&#x8BA1;&#x5C31;&#x662F;&#x5982;&#x6B64;&#xFF0C;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Personal = /** @class */ (function () {
    function Personal() {
        var _this = this;
        this.func2 = function () {
            console.log(_this);
        };
    }
    Personal.prototype.func1 = function () {
        console.log(this);
    };
    return Personal;
}());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Personal = <span class="hljs-comment">/** @class */</span> (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Personal</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.func2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(_this);
        };
    }
    Personal.prototype.func1 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    };
    <span class="hljs-keyword">return</span> Personal;
}());</code></pre><p>&#x6240;&#x4EE5;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x6700;&#x597D;&#x6309;&#x7167;<code>interface</code>&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x521B;&#x5EFA;&#xFF0C;&#x907F;&#x514D;&#x4E00;&#x4E9B;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x7684;&#x5947;&#x5947;&#x602A;&#x602A;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader11">&#x63A5;&#x53E3;&#x58F0;&#x660E;&#x7684;&#x81EA;&#x52A8;&#x5408;&#x5E76;</h3><p>&#x56E0;&#x4E3A;<code>interface</code>&#x662F;<code>TypeScript</code>&#x7279;&#x6709;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x6709;&#x610F;&#x601D;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#x76F8;&#x540C;&#x547D;&#x540D;&#x7684;<code>interface</code>&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x5408;&#x5E76;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface PersonalIntl {
  name: string
}

interface PersonalIntl {
  age: number
}

class Personal implements PersonalIntl {
  name = &apos;Niko&apos;
  age = 18
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> PersonalIntl {
  name: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">interface</span> PersonalIntl {
  age: <span class="hljs-built_in">number</span>
}

<span class="hljs-keyword">class</span> Personal <span class="hljs-keyword">implements</span> PersonalIntl {
  name = <span class="hljs-string">&apos;Niko&apos;</span>
  age = <span class="hljs-number">18</span>
}</code></pre><h3 id="articleHeader12">&#x4E0D;&#x8981;&#x5728; interface &#x4E2D;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x91CD;&#x8F7D;</h3><p>&#x5728;<code>interface</code>&#x4E2D;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#xFF0C;&#x4F60;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x8FD8;&#x662F;&#x62FF;&#x4E0A;&#x8FB9;&#x7684;<code>build</code>&#x51FD;&#x6570;&#x6765;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x5728;<code>interface</code>&#x4E2D;&#x58F0;&#x660E;&#xFF0C;&#x7136;&#x540E;&#x5728;<code>class</code>&#x4E2D;&#x5B9E;&#x73B0;&#xFF0C;&#x90A3;&#x4E48;&#x65E0;&#x8BBA;&#x600E;&#x6837;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x7C7B;&#x578B;&#x90FD;&#x4F1A;&#x8BA4;&#x4E3A;&#x662F;<code>any</code>&#x3002;</p><p>&#x6240;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x5728;<code>class</code>&#x4E2D;&#x58F0;&#x660E;&#x91CD;&#x8F7D;&#xFF0C;&#x5728;<code>class</code>&#x4E2D;&#x5B9E;&#x73B0;&#xFF0C;<code>interface</code>&#x4E2D;&#x6700;&#x591A;&#x53EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;<code>any</code>&#xFF0C;&#x800C;&#x975E;&#x4E09;&#x4E2A;&#x91CD;&#x8F7D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Util implements UtilIntl {
  build(arg: Date): number
  build(arg: Object): string
  build(arg: any): any

  build(arg: any) {
    if (arg instanceof Date) {
      return arg.valueOf()
    } else if (typeof arg === &apos;object&apos;) {
      return Object.prototype.toString.call(arg)
    } else {
      return arg
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> Util <span class="hljs-keyword">implements</span> UtilIntl {
  build(arg: <span class="hljs-built_in">Date</span>): <span class="hljs-built_in">number</span>
  build(arg: <span class="hljs-built_in">Object</span>): <span class="hljs-built_in">string</span>
  build(arg: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">any</span>

  build(arg: <span class="hljs-built_in">any</span>) {
    <span class="hljs-keyword">if</span> (arg <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
      <span class="hljs-keyword">return</span> arg.valueOf()
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> arg === <span class="hljs-string">&apos;object&apos;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> arg
    }
  }
}</code></pre><h2 id="articleHeader13">&#x5C0F;&#x7ED3;</h2><p>&#x6709;&#x5173;<code>TypeScript</code>&#x58F0;&#x660E;&#x7C7B;&#x578B;&#x58F0;&#x660E;&#x76F8;&#x5173;&#x7684;&#x76EE;&#x524D;&#x5C31;&#x603B;&#x7ED3;&#x4E86;&#x8FD9;&#x4E9B;&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#xFF0C;&#x6B22;&#x8FCE;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x8FDB;&#x884C;&#x8865;&#x5145;&#x3002;</p><p><em>&#x5728;&#x4E4B;&#x524D;&#x7684;&#x7248;&#x672C;&#x4E2D;&#x6709;&#x5B58;&#x5728;<code>module</code>&#x548C;<code>namespace</code>&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x4F46;&#x662F;&#x76EE;&#x524D;&#x6765;&#x770B;&#xFF0C;&#x597D;&#x50CF;&#x66F4;&#x63A8;&#x8350;&#x4F7F;&#x7528; ES-Modules &#x7248;&#x672C;&#x7684; <code>import</code>/<code>export</code>&#x6765;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x800C;&#x975E;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x7565;&#x8FC7;&#x4E86;&#x8FD9;&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#x76F8;&#x5173;&#x7684;&#x63CF;&#x8FF0;</em></p><p>&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x6709;&#x9488;&#x5BF9;&#x5982;&#x4F55;&#x7F16;&#x5199;&#x58F0;&#x660E;&#x6587;&#x4EF6;&#x7684;&#x6A21;&#x7248;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A;<a href="https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html" rel="nofollow noreferrer" target="_blank">&#x4F20;&#x9001;&#x9635;</a></p><h3 id="articleHeader14">&#x53C2;&#x8003;&#x8D44;&#x6599;</h3><ul><li><a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types" rel="nofollow noreferrer" target="_blank">keyof</a></li><li><a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types" rel="nofollow noreferrer" target="_blank">Record</a></li><li><a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types" rel="nofollow noreferrer" target="_blank">ReturnType &#x53CA;&#x5176;&#x4ED6;&#x7684;&#x5185;&#x7F6E;&#x51FD;&#x6570;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何编写 Typescript 声明文件

## 原文链接
[https://segmentfault.com/a/1190000016684583](https://segmentfault.com/a/1190000016684583)


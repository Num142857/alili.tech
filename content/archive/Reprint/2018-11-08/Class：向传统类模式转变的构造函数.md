---
title: Class：向传统类模式转变的构造函数
reprint: true
categories: reprint
abbrlink: '38193800'
date: 2018-11-08 02:30:09
---

{{% raw %}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>JS&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x7684;&#x2018;&#x7C7B;&#x2019;&#xFF0C;&#x4E00;&#x76F4;&#x88AB;&#x8F6C;&#x884C;&#x524D;&#x7AEF;&#x7684;&#x7801;&#x50DA;&#x4EEC;&#x5927;&#x547C;&#x60CA;&#x5947;&#xFF0C;&#x4F46;&#x63A5;&#x8FD1;&#x4F20;&#x7EDF;&#x6A21;&#x5F0F;&#x4F7F;&#x7528;<code>class</code>&#x5173;&#x952E;&#x5B57;&#x5B9A;&#x4E49;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x5374;&#x4F7F;&#x5F97;&#x4E00;&#x4E9B;&#x524D;&#x7AEF;&#x540C;&#x884C;&#x6DF1;&#x611F;&#x9057;&#x61BE;&#x800C;&#x7EB7;&#x7EB7;&#x7559;&#x8A00;&#xFF1A;&#x201C;&#x8FD8;&#x6211;&#x72EC;&#x7279;&#x7684;JS&#x201D;&#x3001;&#x201C;&#x51C0;&#x641E;&#x4E9B;&#x6CA1;&#x5B9E;&#x8D28;&#x7684;&#x4E1C;&#x897F;&#x201D;&#x3001;&#x201C;&#x81EA;&#x5DF1;&#x6CA1;&#x6709;&#x7C7B;&#x8FD8;&#x975E;&#x8981;&#x5F80;&#x522B;&#x5BB6;&#x7684;&#x7C7B;&#x4E0A;&#x9760;&#x201D;&#xFF0C;&#x751A;&#x81F3;&#x662F;&#x201C;&#x5DF2;&#x8F6C;&#x884C;&#x201D;&#x7B49;&#x7B49;&#x3002;&#x6709;&#x60C5;&#x7EEA;&#x5F88;&#x6B63;&#x5E38;&#xFF0C;&#x6BD5;&#x7ADF;&#x65B0;&#x77E5;&#x8BC6;&#x610F;&#x5473;&#x7740;&#x66F4;&#x591A;&#x65F6;&#x95F4;&#x4E0E;&#x7CBE;&#x529B;&#x7684;&#x5F00;&#x9500;&#xFF0C;&#x53C8;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;&#x95ED;&#x773C;&#x4EAB;&#x53D7;&#x3002;</p><p>&#x7136;&#x800C;&#x5386;&#x53F2;&#x7684;&#x8F74;&#x5370;&#x524D;&#x884C;&#x4F9D;&#x65E7;&#xFF0C;&#x5BF9;&#x4E8E;<code>class</code>&#x53EF;&#x4EE5;&#x80AF;&#x5B9A;&#x7684;&#x4E00;&#x70B9;&#x662F;&#x4F60;&#x4E0D;&#x80FD;&#x5BF9;&#x9762;&#x8BD5;&#x5B98;&#x8BF4;&#xFF1A;&#x201C;&#x62DC;&#x6258;&#xFF0C;&#x4E0D;&#x662F;&#x5C0F;&#x5F1F;&#x4E0D;&#x61C2;&#xFF0C;&#x4EC5;&#x4EC5;&#x662F;&#x4E0D;&#x613F;&#x610F;&#x4E86;&#x89E3;&#xFF0C;&#x60A8;&#x6362;&#x4E2A;&#x95EE;&#x9898;&#x5457;&#xFF01;&#x201D;&#x4E00;&#x65B9;&#x9762;&#x867D;&#x7136;<code>class</code>&#x53EA;&#x662F;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x4F46;<code>extends</code>&#x5BF9;&#x7EE7;&#x627F;&#x7684;&#x6539;&#x8FDB;&#x8FD8;&#x662F;&#x4E0D;&#x9519;&#x7684;&#x3002;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#x4ECA;&#x540E;&#x53EF;&#x80FD;&#x5728;&#x2018;&#x7C7B;&#x2019;&#x4E0A;&#x51FA;&#x73B0;&#x7684;&#x65B0;&#x7279;&#x6027;&#x5E94;&#x8BE5;&#x662F;&#x7531;<code>class</code>&#x800C;&#x4E0D;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x627F;&#x8F7D;&#xFF0C;&#x8C01;&#x4E5F;&#x4E0D;&#x786E;&#x5B9A;&#x5B83;&#x5C06;&#x6765;&#x4F1A;&#x51FA;&#x843D;&#x5F97;&#x600E;&#x6837;&#x6807;&#x81F4;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x6765;&#x6765;&#x6765;&#xFF0C;&#x6162;&#x6162;&#x7684;&#x559D;&#x4E0B;&#x8FD9;&#x7897;&#x70ED;&#x6C14;&#x817E;&#x817E;&#x7684;&#x7EA2;&#x7CD6;&#x59DC;&#x6C64;&#x3002;</p><h2 id="articleHeader1">1 class</h2><p>ECMAScript&#x4E2D;&#x6CA1;&#x6709;&#x7C7B;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x4F8B;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x7531;&#x6784;&#x9020;&#x51FD;&#x6570;&#x751F;&#x6210;&#x5177;&#x6709;&#x52A8;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x4E0D;&#x8FC7;&#x4E3A;&#x4E86;&#x4E0E;&#x56FD;&#x9645;&#x63A5;&#x8F68;&#xFF0C;&#x63CF;&#x8FF0;&#x7684;&#x66F4;&#x4E3A;&#x7B80;&#x4FBF;&#x548C;&#x9AD8;&#x5927;&#x4E0A;&#xFF0C;&#x4F9D;&#x7136;&#x4F1A;&#x4F7F;&#x7528;&#x2018;&#x7C7B;&#x2019;&#x8FD9;&#x4E00;&#x8BCD;&#x3002;&#x6240;&#x4EE5;JS&#x7684;&#x7C7B;&#x7B49;&#x540C;&#x4E8E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;ES6&#x7684;<code>class</code>&#x53EA;&#x662F;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x5176;&#x5B9A;&#x4E49;&#x751F;&#x6210;&#x7684;&#x5BF9;&#x8C61;&#x4F9D;&#x7136;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x4E0D;&#x8FC7;&#x4E3A;&#x4E86;&#x4E0E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x533A;&#x5206;&#x5F00;&#xFF0C;&#x6211;&#x4EEC;&#x79F0;&#x5176;&#x4E3A;&#x7C7B;&#x6A21;&#x5F0F;&#x3002;&#x5B66;&#x4E60;<code>class</code>&#x9700;&#x8981;&#x6709;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x767E;&#x5EA6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ---&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;
function C () {
  console.log(&apos;New someone.&apos;);
}

C.a = function () { return &apos;a&apos;; }; // &#x9759;&#x6001;&#x65B9;&#x6CD5;

C.prototype.b = function () { return &apos;b&apos;; }; // &#x539F;&#x578B;&#x65B9;&#x6CD5;


// ---&#x4F7F;&#x7528;class
class C {
  static a() { return &apos;a&apos;; } // &#x9759;&#x6001;&#x65B9;&#x6CD5;
  
  constructor() { console.log(&apos;New someone.&apos;); } // &#x6784;&#x9020;&#x65B9;&#x6CD5;
  
  b() { return &apos;b&apos;; } // &#x539F;&#x578B;&#x65B9;&#x6CD5;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ---&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;New someone.&apos;</span>);
}

C.a = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;a&apos;</span>; }; <span class="hljs-comment">// &#x9759;&#x6001;&#x65B9;&#x6CD5;</span>

C.prototype.b = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;b&apos;</span>; }; <span class="hljs-comment">// &#x539F;&#x578B;&#x65B9;&#x6CD5;</span>


<span class="hljs-comment">// ---&#x4F7F;&#x7528;class</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  <span class="hljs-keyword">static</span> a() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;a&apos;</span>; } <span class="hljs-comment">// &#x9759;&#x6001;&#x65B9;&#x6CD5;</span>
  
  <span class="hljs-keyword">constructor</span>() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;New someone.&apos;</span>); } <span class="hljs-comment">// &#x6784;&#x9020;&#x65B9;&#x6CD5;</span>
  
  b() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;b&apos;</span>; } <span class="hljs-comment">// &#x539F;&#x578B;&#x65B9;&#x6CD5;</span>
};</code></pre><h3 id="articleHeader2">1.1 &#x4E0E;&#x53D8;&#x91CF;&#x5BF9;&#x6BD4;</h3><p>&#x5173;&#x952E;&#x5B57;<code>class</code>&#x7C7B;&#x4F3C;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684;&#x5173;&#x952E;&#x5B57;<code>function</code>&#xFF0C;&#x5176;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x58F0;&#x660E;&#x5F0F;&#x548C;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x533F;&#x540D;&#x5F0F;&#x548C;&#x547D;&#x540D;&#x5F0F;&#xFF09;&#x4E24;&#x79CD;&#x3002;&#x901A;&#x8FC7;&#x58F0;&#x660E;&#x5F0F;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x6027;&#x8D28;&#x4E0E;<code>function</code>&#x4E0D;&#x540C;&#xFF0C;&#x66F4;&#x4E3A;&#x7C7B;&#x4F3C;<code>let</code>&#x548C;<code>const</code>&#xFF0C;&#x4E0D;&#x4F1A;&#x63D0;&#x524D;&#x89E3;&#x6790;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x4E0D;&#x4E0E;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x6302;&#x94A9;&#x548C;&#x62E5;&#x6709;&#x6682;&#x65F6;&#x6027;&#x6B7B;&#x533A;&#x7B49;&#x3002;<code>class</code>&#x5B9A;&#x4E49;&#x751F;&#x6210;&#x7684;&#x53D8;&#x91CF;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x56E0;&#x6B64;&#xFF0C;&#x7C7B;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#x6A21;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ---&#x58F0;&#x660E;&#x5F0F;
class C {}
function F() {}

// ---&#x533F;&#x540D;&#x8868;&#x8FBE;&#x5F0F;
let C = class {};
let F = function () {};

// ---&#x547D;&#x540D;&#x8868;&#x8FBE;&#x5F0F;
let C = class CC {};
let F = function FF() {};

// ---&#x672C;&#x8D28;&#x662F;&#x4E2A;&#x51FD;&#x6570;
class C {}
console.log(typeof C); // function
console.log(Object.prototype.toString.call(C)); // [object Function]
console.log(C.hasOwnProperty(&apos;prototype&apos;)); // true

// ---&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;
C; // &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;C&#x3002;
class C {}
// &#x5B58;&#x5728;&#x63D0;&#x524D;&#x89E3;&#x6790;&#x548C;&#x53D8;&#x91CF;&#x63D0;&#x5347;
F; // &#x4E0D;&#x62A5;&#x9519;&#xFF0C;F&#x5DF2;&#x88AB;&#x58F0;&#x660E;&#x548C;&#x8D4B;&#x503C;&#x3002;
function F() {}

// ---&#x81EA;&#x6267;&#x884C;&#x6A21;&#x5F0F;
let c = new (class {
})();
let f = new (function () {
})();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ---&#x58F0;&#x660E;&#x5F0F;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// ---&#x533F;&#x540D;&#x8868;&#x8FBE;&#x5F0F;</span>
<span class="hljs-keyword">let</span> C = <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{};
<span class="hljs-keyword">let</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};

<span class="hljs-comment">// ---&#x547D;&#x540D;&#x8868;&#x8FBE;&#x5F0F;</span>
<span class="hljs-keyword">let</span> C = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CC</span> </span>{};
<span class="hljs-keyword">let</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FF</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-comment">// ---&#x672C;&#x8D28;&#x662F;&#x4E2A;&#x51FD;&#x6570;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> C); <span class="hljs-comment">// function</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(C)); <span class="hljs-comment">// [object Function]</span>
<span class="hljs-built_in">console</span>.log(C.hasOwnProperty(<span class="hljs-string">&apos;prototype&apos;</span>)); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// ---&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;</span>
C; <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;C&#x3002;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
<span class="hljs-comment">// &#x5B58;&#x5728;&#x63D0;&#x524D;&#x89E3;&#x6790;&#x548C;&#x53D8;&#x91CF;&#x63D0;&#x5347;</span>
F; <span class="hljs-comment">// &#x4E0D;&#x62A5;&#x9519;&#xFF0C;F&#x5DF2;&#x88AB;&#x58F0;&#x660E;&#x548C;&#x8D4B;&#x503C;&#x3002;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// ---&#x81EA;&#x6267;&#x884C;&#x6A21;&#x5F0F;</span>
<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> (<span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
})();
<span class="hljs-keyword">let</span> f = <span class="hljs-keyword">new</span> (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
})();</code></pre><h3 id="articleHeader3">1.2 &#x4E0E;&#x5BF9;&#x8C61;&#x5BF9;&#x6BD4;</h3><p>&#x7C7B;&#x5185;&#x5BB9;&#xFF08;<code>{}</code>&#x91CC;&#x9762;&#xFF09;&#x7684;&#x5F62;&#x5F0F;&#x4E0E;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x76F8;&#x4F3C;&#x3002;&#x4E0D;&#x8FC7;&#x7C7B;&#x5185;&#x5BB9;&#x91CC;&#x9762;&#x53EA;&#x80FD;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x65B9;&#x6CD5;&#x7684;&#x5F62;&#x5F0F;&#x53EA;&#x80FD;&#x662F;&#x51FD;&#x6570;&#x7B80;&#x5199;&#x5F0F;&#xFF0C;&#x65B9;&#x6CD5;&#x95F4;&#x4E0D;&#x7528;&#x4E5F;&#x4E0D;&#x80FD;&#x7528;&#x9017;&#x53F7;&#x5206;&#x9694;&#x3002;&#x65B9;&#x6CD5;&#x540D;&#x53EF;&#x4EE5;&#x662F;&#x5E26;&#x62EC;&#x53F7;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4E3A;<code>Symbol</code>&#x503C;&#x3002;&#x65B9;&#x6CD5;&#x5206;&#x4E3A;&#x4E09;&#x7C7B;&#xFF0C;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF08;<code>constructor</code>&#x65B9;&#x6CD5;&#xFF09;&#x3001;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF08;&#x5B58;&#x5728;&#x4E8E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;<code>prototype</code>&#x5C5E;&#x6027;&#x4E0A;&#xFF09;&#x548C;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF08;&#x5B58;&#x5728;&#x4E8E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x4E0A;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class C {
  // &#x539F;&#x578B;&#x65B9;&#x6CD5;a
  a() { console.log(&apos;a&apos;); }
  // &#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x6BCF;&#x6B21;&#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x65F6;&#x90FD;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x5B9E;&#x4F8B;&#x3002;
  constructor() {}
  // &#x9759;&#x6001;&#x65B9;&#x6CD5;b&#xFF0C;&#x5E26;static&#x5173;&#x952E;&#x5B57;&#x3002;
  static b() { console.log(&apos;b&apos;); }
  // &#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x5E26;&#x62EC;&#x53F7;&#x7684;&#x8868;&#x8FBE;&#x5F0F;
  [&apos;a&apos; + &apos;b&apos;]() { console.log(&apos;ab&apos;); }
  // &#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x7528;Symbol&#x503C;
  [Symbol.for(&apos;s&apos;)]() { console.log(&apos;symbol s&apos;); }
}

C.b(); // b

let c = new C();
c.a(); // a
c.ab(); // ab
c[Symbol.for(&apos;s&apos;)](); // symbol s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  <span class="hljs-comment">// &#x539F;&#x578B;&#x65B9;&#x6CD5;a</span>
  a() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;a&apos;</span>); }
  <span class="hljs-comment">// &#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x6BCF;&#x6B21;&#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x65F6;&#x90FD;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x5B9E;&#x4F8B;&#x3002;</span>
  <span class="hljs-keyword">constructor</span>() {}
  <span class="hljs-comment">// &#x9759;&#x6001;&#x65B9;&#x6CD5;b&#xFF0C;&#x5E26;static&#x5173;&#x952E;&#x5B57;&#x3002;</span>
  <span class="hljs-keyword">static</span> b() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;b&apos;</span>); }
  <span class="hljs-comment">// &#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x5E26;&#x62EC;&#x53F7;&#x7684;&#x8868;&#x8FBE;&#x5F0F;</span>
  [<span class="hljs-string">&apos;a&apos;</span> + <span class="hljs-string">&apos;b&apos;</span>]() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ab&apos;</span>); }
  <span class="hljs-comment">// &#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x7528;Symbol&#x503C;</span>
  [<span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;s&apos;</span>)]() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;symbol s&apos;</span>); }
}

C.b(); <span class="hljs-comment">// b</span>

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C();
c.a(); <span class="hljs-comment">// a</span>
c.ab(); <span class="hljs-comment">// ab</span>
c[<span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">&apos;s&apos;</span>)](); <span class="hljs-comment">// symbol s</span></code></pre><p>&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4E0D;&#x8868;&#x793A;&#x7C7B;&#x4E0D;&#x80FD;&#x6709;&#x539F;&#x578B;&#x6216;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x3002;&#x89E3;&#x6790;<code>class</code>&#x4F1A;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x6B64;&#x53EA;&#x9700;&#x50CF;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#x4E3A;&#x7C7B;&#x6DFB;&#x52A0;&#x5373;&#x53EF;&#x3002;&#x66F4;&#x4E3A;&#x76F4;&#x63A5;&#x4E5F;&#x662F;&#x63A8;&#x8350;&#x7684;&#x662F;&#x53EA;&#x4F7F;&#x7528;<code>getter</code>&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x53EA;&#x8BFB;&#x5C5E;&#x6027;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#xFF1F;&#x662F;&#x6280;&#x672F;&#x4E0D;&#x6210;&#x719F;&#xFF1F;&#x662F;&#x5B98;&#x65B9;&#x5E0C;&#x671B;&#x4F20;&#x9012;&#x67D0;&#x79CD;&#x601D;&#x60F3;&#xFF1F;&#x6291;&#x6216;&#x4EC5;&#x4EC5;&#x662F;&#x7B14;&#x8005;&#x968F;&#x610F;&#x629B;&#x51FA;&#x7684;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ---&#x76F4;&#x63A5;&#x5728;C&#x7C7B;&#xFF08;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;&#x4E0A;&#x4FEE;&#x6539;
class C {}
C.a = &apos;a&apos;;
C.b = function () { return &apos;b&apos;; };
C.prototype.c = &apos;c&apos;;
C.prototype.d = function () { return &apos;d&apos;; };

let c = new C();
c.c; // c
c.d(); // d

// ---&#x4F7F;&#x7528;setter&#x548C;getter
// &#x5B9A;&#x4E49;&#x53EA;&#x80FD;&#x83B7;&#x53D6;&#x4E0D;&#x80FD;&#x4FEE;&#x6539;&#x7684;&#x539F;&#x578B;&#x6216;&#x9759;&#x6001;&#x5C5E;&#x6027;
class C {
  get a() { return &apos;a&apos;; }
  static get b() { return &apos;b&apos;; }
}

let c = new C();
c.a; // a
c.a = &apos;1&apos;; // &#x8D4B;&#x503C;&#x6CA1;&#x7528;&#xFF0C;&#x53EA;&#x6709;get&#x6CA1;&#x6709;set&#x65E0;&#x6CD5;&#x4FEE;&#x6539;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ---&#x76F4;&#x63A5;&#x5728;C&#x7C7B;&#xFF08;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;&#x4E0A;&#x4FEE;&#x6539;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
C.a = <span class="hljs-string">&apos;a&apos;</span>;
C.b = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;b&apos;</span>; };
C.prototype.c = <span class="hljs-string">&apos;c&apos;</span>;
C.prototype.d = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;d&apos;</span>; };

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C();
c.c; <span class="hljs-comment">// c</span>
c.d(); <span class="hljs-comment">// d</span>

<span class="hljs-comment">// ---&#x4F7F;&#x7528;setter&#x548C;getter</span>
<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x53EA;&#x80FD;&#x83B7;&#x53D6;&#x4E0D;&#x80FD;&#x4FEE;&#x6539;&#x7684;&#x539F;&#x578B;&#x6216;&#x9759;&#x6001;&#x5C5E;&#x6027;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  get a() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;a&apos;</span>; }
  <span class="hljs-keyword">static</span> get b() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;b&apos;</span>; }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C();
c.a; <span class="hljs-comment">// a</span>
c.a = <span class="hljs-string">&apos;1&apos;</span>; <span class="hljs-comment">// &#x8D4B;&#x503C;&#x6CA1;&#x7528;&#xFF0C;&#x53EA;&#x6709;get&#x6CA1;&#x6709;set&#x65E0;&#x6CD5;&#x4FEE;&#x6539;&#x3002;</span></code></pre><h3 id="articleHeader4">1.3 &#x4E0E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5BF9;&#x6BD4;</h3><p>&#x4E0B;&#x9762;&#x662F;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x7C7B;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x529F;&#x80FD;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x76F4;&#x89C2;&#x4E0A;&#xFF0C;<code>class</code>&#x7B80;&#x5316;&#x4E86;&#x4EE3;&#x7801;&#xFF0C;&#x4F7F;&#x5F97;&#x5185;&#x5BB9;&#x66F4;&#x4E3A;&#x805A;&#x5408;&#x3002;<code>constructor</code>&#x65B9;&#x6CD5;&#x4F53;&#x7B49;&#x540C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x663E;&#x5F0F;&#x5B9A;&#x4E49;&#x6B64;&#x65B9;&#x6CD5;&#xFF0C;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;<code>constructor</code>&#x65B9;&#x6CD5;&#x4F1A;&#x88AB;&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x4E0E;ES5&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x8FD4;&#x56DE;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x800C;&#x4E0D;&#x662F;&#x65B0;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ---&#x6784;&#x9020;&#x51FD;&#x6570;
function C(a) {
  this.a = a;
}

// &#x9759;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
C.b = &apos;b&apos;;
C.c = function () { return &apos;c&apos;; };

// &#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
C.prototype.d = &apos;d&apos;;
C.prototype.e = function () { return &apos;e&apos;; };
Object.defineProperty(C.prototype, &apos;f&apos;, { // &#x53EA;&#x8BFB;&#x5C5E;&#x6027;
  get() {
    return &apos;f&apos;;
  }
});

// ---&#x7C7B;
class C {
  static c() { return &apos;c&apos;; }
  
  constructor(a) {
    this.a = a;
  }
  
  e() { return &apos;e&apos;; }
  get f() { return &apos;f&apos;; }
}

C.b = &apos;b&apos;;
C.prototype.d = &apos;d&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ---&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">this</span>.a = a;
}

<span class="hljs-comment">// &#x9759;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</span>
C.b = <span class="hljs-string">&apos;b&apos;</span>;
C.c = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;c&apos;</span>; };

<span class="hljs-comment">// &#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</span>
C.prototype.d = <span class="hljs-string">&apos;d&apos;</span>;
C.prototype.e = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;e&apos;</span>; };
<span class="hljs-built_in">Object</span>.defineProperty(C.prototype, <span class="hljs-string">&apos;f&apos;</span>, { <span class="hljs-comment">// &#x53EA;&#x8BFB;&#x5C5E;&#x6027;</span>
  get() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;f&apos;</span>;
  }
});

<span class="hljs-comment">// ---&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  <span class="hljs-keyword">static</span> c() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;c&apos;</span>; }
  
  <span class="hljs-keyword">constructor</span>(a) {
    <span class="hljs-keyword">this</span>.a = a;
  }
  
  e() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;e&apos;</span>; }
  get f() { <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;f&apos;</span>; }
}

C.b = <span class="hljs-string">&apos;b&apos;</span>;
C.prototype.d = <span class="hljs-string">&apos;d&apos;</span>;</code></pre><p>&#x7C7B;&#x867D;&#x7136;&#x662F;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x53EA;&#x80FD;&#x901A;&#x8FC7;<code>new</code>&#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x800C;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x3002;&#x7C7B;&#x5185;&#x90E8;&#x6240;&#x5B9A;&#x4E49;&#x7684;&#x5168;&#x90E8;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;&#x7684;&#xFF0C;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x548C;<code>prototype</code>&#x4E0A;&#x6DFB;&#x52A0;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x662F;&#x53EF;&#x679A;&#x4E3E;&#x7684;&#x3002;&#x7C7B;&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x6CD5;&#x9ED8;&#x8BA4;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x65E0;&#x9700;&#x663E;&#x5F0F;&#x58F0;&#x660E;&#x3002;&#x4EE5;&#x4E0A;&#x4E09;&#x70B9;&#x589E;&#x52A0;&#x4E86;&#x7C7B;&#x7684;&#x4E25;&#x8C28;&#x6027;&#xFF0C;&#x6BD4;&#x8F83;&#x9057;&#x61BE;&#x7684;&#x662F;&#xFF0C;&#x4F9D;&#x7136;&#x8FD8;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x5B9A;&#x4E49;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ---&#x80FD;&#x5426;&#x76F4;&#x63A5;&#x8C03;&#x7528;
class C {}
C(); // &#x62A5;&#x9519;

function C() {}
C(); // &#x53EF;&#x4EE5;


// ---&#x662F;&#x5426;&#x53EF;&#x679A;&#x4E3E;
class C {
  static a() {} // &#x4E0D;&#x53EF;&#x679A;&#x4E3E;
  b() {} // &#x4E0D;&#x53EF;&#x679A;&#x4E3E;
}

C.c = function () {}; // &#x53EF;&#x679A;&#x4E3E;
C.prototype.d = function () {}; // &#x53EF;&#x679A;&#x4E3E;

isEnumerable(C, [&apos;a&apos;, &apos;c&apos;]); // a false, c true
isEnumerable(C.prototype, [&apos;b&apos;, &apos;d&apos;]); // b false, d true

function isEnumerable(target, keys) {
  let obj = Object.getOwnPropertyDescriptors(target);
  keys.forEach(k =&gt; {
    console.log(k, obj[k].enumerable);
  });
}


// ---&#x662F;&#x5426;&#x4E3A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;
class C {
  a() {
    let is = false;
    try {
      n = 1;
    } catch (e) {
      is = true;
    }
    console.log(is ? &apos;true&apos; : &apos;false&apos;);
  }
}

C.prototype.b = function () {
  let is = false;
  try {
    n = 1;
  } catch (e) {
    is = true;
  }
  console.log(is ? &apos;true&apos; : &apos;false&apos;);
};

let c = new C();
c.a(); // true&#xFF0C;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x3002;
c.b(); // false&#xFF0C;&#x4E0D;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ---&#x80FD;&#x5426;&#x76F4;&#x63A5;&#x8C03;&#x7528;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
C(); <span class="hljs-comment">// &#x62A5;&#x9519;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params"></span>) </span>{}
C(); <span class="hljs-comment">// &#x53EF;&#x4EE5;</span>


<span class="hljs-comment">// ---&#x662F;&#x5426;&#x53EF;&#x679A;&#x4E3E;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  <span class="hljs-keyword">static</span> a() {} <span class="hljs-comment">// &#x4E0D;&#x53EF;&#x679A;&#x4E3E;</span>
  b() {} <span class="hljs-comment">// &#x4E0D;&#x53EF;&#x679A;&#x4E3E;</span>
}

C.c = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}; <span class="hljs-comment">// &#x53EF;&#x679A;&#x4E3E;</span>
C.prototype.d = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}; <span class="hljs-comment">// &#x53EF;&#x679A;&#x4E3E;</span>

isEnumerable(C, [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]); <span class="hljs-comment">// a false, c true</span>
isEnumerable(C.prototype, [<span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>]); <span class="hljs-comment">// b false, d true</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEnumerable</span>(<span class="hljs-params">target, keys</span>) </span>{
  <span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptors(target);
  keys.forEach(<span class="hljs-function"><span class="hljs-params">k</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(k, obj[k].enumerable);
  });
}


<span class="hljs-comment">// ---&#x662F;&#x5426;&#x4E3A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  a() {
    <span class="hljs-keyword">let</span> is = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">try</span> {
      n = <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">catch</span> (e) {
      is = <span class="hljs-literal">true</span>;
    }
    <span class="hljs-built_in">console</span>.log(is ? <span class="hljs-string">&apos;true&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>);
  }
}

C.prototype.b = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> is = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">try</span> {
    n = <span class="hljs-number">1</span>;
  } <span class="hljs-keyword">catch</span> (e) {
    is = <span class="hljs-literal">true</span>;
  }
  <span class="hljs-built_in">console</span>.log(is ? <span class="hljs-string">&apos;true&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>);
};

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C();
c.a(); <span class="hljs-comment">// true&#xFF0C;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x3002;</span>
c.b(); <span class="hljs-comment">// false&#xFF0C;&#x4E0D;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x3002;</span></code></pre><p>&#x5728;&#x65B9;&#x6CD5;&#x524D;&#x52A0;&#x4E0A;<code>static</code>&#x5173;&#x952E;&#x5B57;&#x8868;&#x793A;&#x6B64;&#x65B9;&#x6CD5;&#x4E3A;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x5B58;&#x5728;&#x4E8E;&#x7C7B;&#x672C;&#x8EAB;&#xFF0C;&#x4E0D;&#x80FD;&#x88AB;&#x5B9E;&#x4F8B;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x3002;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;<code>this</code>&#x6307;&#x5411;&#x7C7B;&#x672C;&#x8EAB;&#x3002;&#x56E0;&#x4E3A;&#x5904;&#x4E8E;&#x4E0D;&#x540C;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x548C;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x91CD;&#x540D;&#x3002;ES6&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;<code>new.target</code>&#xFF0C;&#x6307;&#x4EE3;<code>new</code>&#x540E;&#x9762;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6216;<code>class</code>&#xFF0C;&#x8BE5;&#x547D;&#x4EE4;&#x7684;&#x4F7F;&#x7528;&#x6709;&#x67D0;&#x4E9B;&#x9650;&#x5236;&#xFF0C;&#x5177;&#x4F53;&#x8BF7;&#x770B;&#x4E0B;&#x9762;&#x793A;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ---static
class C {
  static a() { console.log(this === C); }
  a() { console.log(this instanceof C); }
}

let c = new C();
C.a(); // true
c.a(); // true


// ---new.target
// &#x6784;&#x9020;&#x51FD;&#x6570;
function C() {
  console.log(new.target);
}

C.prototype.a = function () { console.log(new.target); };

let c = new C(); // &#x6253;&#x5370;&#x51FA;C
c.a(); // &#x5728;&#x666E;&#x901A;&#x65B9;&#x6CD5;&#x4E2D;&#x4E3A;undefined&#x3002;

// ---&#x7C7B;
class C {
  constructor() { console.log(new.target); }
  a() { console.log(new.target); }
}

let c = new C(); // &#x6253;&#x5370;&#x51FA;C
c.a(); // &#x5728;&#x666E;&#x901A;&#x65B9;&#x6CD5;&#x4E2D;&#x4E3A;undefined&#x3002;

// ---&#x5728;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x4F7F;&#x7528;&#x4F1A;&#x62A5;&#x9519;
new.target; // &#x62A5;&#x9519;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ---static</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  <span class="hljs-keyword">static</span> a() { <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === C); }
  a() { <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> C); }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C();
C.a(); <span class="hljs-comment">// true</span>
c.a(); <span class="hljs-comment">// true</span>


<span class="hljs-comment">// ---new.target</span>
<span class="hljs-comment">// &#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span>.target);
}

C.prototype.a = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span>.target); };

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C(); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;C</span>
c.a(); <span class="hljs-comment">// &#x5728;&#x666E;&#x901A;&#x65B9;&#x6CD5;&#x4E2D;&#x4E3A;undefined&#x3002;</span>

<span class="hljs-comment">// ---&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
  <span class="hljs-keyword">constructor</span>() { <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span>.target); }
  a() { <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span>.target); }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C(); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;C</span>
c.a(); <span class="hljs-comment">// &#x5728;&#x666E;&#x901A;&#x65B9;&#x6CD5;&#x4E2D;&#x4E3A;undefined&#x3002;</span>

<span class="hljs-comment">// ---&#x5728;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x4F7F;&#x7528;&#x4F1A;&#x62A5;&#x9519;</span>
<span class="hljs-keyword">new</span>.target; <span class="hljs-comment">// &#x62A5;&#x9519;</span></code></pre><h2 id="articleHeader5">2 extends</h2><p>ES5&#x4E2D;&#x7684;&#x7ECF;&#x5178;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#x662F;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#xFF0C;&#x5B50;&#x7C7B;&#x4F1A;&#x5206;&#x522B;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x548C;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;ES6&#x4E2D;&#x7684;&#x7EE7;&#x627F;&#x672C;&#x8D28;&#x4E5F;&#x662F;&#x5982;&#x6B64;&#xFF0C;&#x4E0D;&#x8FC7;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x6709;&#x6240;&#x6539;&#x53D8;&#xFF0C;&#x5177;&#x4F53;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x7EE7;&#x627F;&#x662F;&#x4F7F;&#x7528;<code>extends</code>&#x5173;&#x952E;&#x5B57;&#x8FD9;&#x4E00;&#x66F4;&#x63A5;&#x8FD1;&#x4F20;&#x7EDF;&#x8BED;&#x8A00;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x5B9E;&#x4F8B;&#x4E0A;&#x7684;&#x7EE7;&#x627F;&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>super</code>&#x5B8C;&#x6210;&#x5B50;&#x7C7B;<code>this</code>&#x5851;&#x9020;&#x3002;&#x8868;&#x9762;&#x4E0A;&#x770B;&#xFF0C;&#x65B9;&#x5F0F;&#x66F4;&#x4E3A;&#x7684;&#x7EDF;&#x4E00;&#x548C;&#x7B80;&#x6D01;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class C1 {
  constructor(a) { this.a = a; }
  b() { console.log(&apos;b&apos;); }
}

class C extends C1 { // &#x7EE7;&#x627F;&#x539F;&#x578B;&#x6570;&#x636E;
  constructor() {
    super(&apos;a&apos;); // &#x7EE7;&#x627F;&#x5B9E;&#x4F8B;&#x6570;&#x636E;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">constructor</span>(a) { <span class="hljs-keyword">this</span>.a = a; }
  b() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;b&apos;</span>); }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">C1</span> </span>{ <span class="hljs-comment">// &#x7EE7;&#x627F;&#x539F;&#x578B;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>(<span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// &#x7EE7;&#x627F;&#x5B9E;&#x4F8B;&#x6570;&#x636E;</span>
  }
}</code></pre><h3 id="articleHeader6">2.1 &#x4E0E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5BF9;&#x6BD4;</h3><p>&#x4F7F;&#x7528;<code>extends</code>&#x7EE7;&#x627F;&#xFF0C;&#x4E0D;&#x4EC5;&#x4EC5;&#x4F1A;&#x5C06;&#x5B50;&#x7C7B;&#x7684;<code>prototype</code>&#x5C5E;&#x6027;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF08;<code>__proto__</code>&#xFF09;&#x8BBE;&#x7F6E;&#x4E3A;&#x7236;&#x7C7B;&#x7684;<code>prototype</code>&#xFF0C;&#x8FD8;&#x4F1A;&#x5C06;&#x5B50;&#x7C7B;&#x672C;&#x8EAB;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF08;<code>__proto__</code>&#xFF09;&#x8BBE;&#x7F6E;&#x4E3A;&#x7236;&#x7C7B;&#x672C;&#x8EAB;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5B50;&#x7C7B;&#x4E0D;&#x5355;&#x5355;&#x4F1A;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6570;&#x636E;&#xFF0C;&#x4E5F;&#x4F1A;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x672C;&#x8EAB;&#x62E5;&#x6709;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;&#x800C;ES5&#x7684;&#x7ECF;&#x5178;&#x7EE7;&#x627F;&#x53EA;&#x4F1A;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6570;&#x636E;&#x3002;&#x4E0D;&#x5355;&#x5355;&#x662F;&#x8D22;&#x5BCC;&#xFF0C;&#x8FDE;&#x8001;&#x7238;&#x7684;&#x540D;&#x6C14;&#x4E5F;&#x8981;&#x83B7;&#x5F97;&#xFF0C;&#x4E0D;&#x9519;&#x4E0D;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class C1 {
  static get a() { console.log(&apos;a&apos;); }
  static b() { console.log(&apos;b&apos;); }
}

class C extends C1 {
}
// &#x7B49;&#x4EF7;&#xFF0C;&#x6CA1;&#x6709;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x4F1A;&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;&#x3002;
class C extends C1 {
  constructor(...args) {
    super(...args);
  }
}

let c = new C();
C.a; // a&#xFF0C;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x3002;
C.b(); // b&#xFF0C;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x3002;
console.log(Object.getPrototypeOf(C) === C1); // true&#xFF0C;C&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E3A;C1
console.log(Object.getPrototypeOf(C.prototype) === C1.prototype); // true&#xFF0C;C&#x7684;prototype&#x5C5E;&#x6027;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E3A;C1&#x7684;prototype" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">static</span> get a() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;a&apos;</span>); }
  <span class="hljs-keyword">static</span> b() { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;b&apos;</span>); }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">C1</span> </span>{
}
<span class="hljs-comment">// &#x7B49;&#x4EF7;&#xFF0C;&#x6CA1;&#x6709;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x4F1A;&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;&#x3002;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
  }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C();
C.a; <span class="hljs-comment">// a&#xFF0C;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x3002;</span>
C.b(); <span class="hljs-comment">// b&#xFF0C;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x3002;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(C) === C1); <span class="hljs-comment">// true&#xFF0C;C&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E3A;C1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(C.prototype) === C1.prototype); <span class="hljs-comment">// true&#xFF0C;C&#x7684;prototype&#x5C5E;&#x6027;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E3A;C1&#x7684;prototype</span></code></pre><p>ES5&#x4E2D;&#x7684;&#x5B9E;&#x4F8B;&#x7EE7;&#x627F;&#xFF0C;&#x662F;&#x5148;&#x521B;&#x9020;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;<code>this</code>&#xFF0C;&#x518D;&#x901A;&#x8FC7;<code>call</code>&#x6216;<code>apply</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5728;<code>this</code>&#x4E0A;&#x6DFB;&#x52A0;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x4E0D;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x6570;&#x636E;&#x3002;&#x800C;ES6&#x4E0D;&#x540C;&#xFF0C;&#x5B83;&#x7684;&#x8BBE;&#x8BA1;&#x4F7F;&#x5F97;&#x5B9E;&#x4F8B;&#x7EE7;&#x627F;&#x66F4;&#x4E3A;&#x4F18;&#x79C0;&#x548C;&#x4E25;&#x8C28;&#x3002;</p><p>&#x5728;ES6&#x7684;&#x5B9E;&#x4F8B;&#x7EE7;&#x627F;&#x4E2D;&#xFF0C;&#x662F;&#x5148;&#x8C03;&#x7528;<code>super</code>&#x65B9;&#x6CD5;&#x521B;&#x5EFA;&#x7236;&#x7C7B;&#x7684;<code>this</code>&#xFF08;&#x4F9D;&#x65E7;&#x6307;&#x5411;&#x5B50;&#x7C7B;&#xFF09;&#x548C;&#x6DFB;&#x52A0;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x6570;&#x636E;&#xFF0C;&#x518D;&#x901A;&#x8FC7;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4FEE;&#x9970;<code>this</code>&#xFF0C;&#x4E0E;ES5&#x6B63;&#x597D;&#x76F8;&#x53CD;&#x3002;ES6&#x89C4;&#x5B9A;&#x5728;&#x5B50;&#x7C7B;&#x7684;<code>constructor</code>&#x65B9;&#x6CD5;&#x91CC;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x5230;<code>this</code>&#x4E4B;&#x524D;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x8C03;&#x7528;<code>super</code>&#x65B9;&#x6CD5;&#x5F97;&#x5230;&#x5B50;&#x7C7B;&#x7684;<code>this</code>&#x3002;&#x4E0D;&#x8C03;&#x7528;<code>super</code>&#x65B9;&#x6CD5;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x5B50;&#x7C7B;&#x5F97;&#x4E0D;&#x5230;<code>this</code>&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class C1 {
  constructor() {
    console.log(&apos;C1&apos;, this instanceof C);
  }
}

class C extends C1 {
  constructor() {
    super(); // &#x5728;super()&#x4E4B;&#x524D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;this&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;
    console.log(&apos;C&apos;);
  }
}

new C(); // &#x5148;&#x6253;&#x5370;&#x51FA;C1 true&#xFF0C;&#x518D;&#x6253;&#x5370;C&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;C1&apos;</span>, <span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> C);
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>(); <span class="hljs-comment">// &#x5728;super()&#x4E4B;&#x524D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;this&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;C&apos;</span>);
  }
}

<span class="hljs-keyword">new</span> C(); <span class="hljs-comment">// &#x5148;&#x6253;&#x5370;&#x51FA;C1 true&#xFF0C;&#x518D;&#x6253;&#x5370;C&#x3002;</span></code></pre><h3 id="articleHeader7">2.2 super</h3><p>&#x5173;&#x952E;&#x5B57;<code>super</code>&#x6BD4;&#x8F83;&#x5947;&#x8469;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#x548C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E0B;&#xFF0C;&#x5B83;&#x4F1A;&#x6307;&#x4EE3;&#x4E0D;&#x540C;&#x7684;&#x4E1C;&#x897F;&#xFF08;&#x603B;&#x7684;&#x8BF4;&#x53EF;&#x4EE5;&#x6307;&#x4EE3;&#x5BF9;&#x8C61;&#x6216;&#x65B9;&#x6CD5;&#x4E24;&#x79CD;&#xFF09;&#x3002;&#x800C;&#x4E14;&#x5728;&#x4E0D;&#x663E;&#x5F0F;&#x7684;&#x6307;&#x660E;&#x662F;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x6216;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x6BD4;&#x5982;<code>console.log(super)</code>&#xFF0C;&#x4F1A;&#x76F4;&#x63A5;&#x62A5;&#x9519;&#x3002;</p><p>&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x65F6;&#x3002;<code>super</code>&#x53EA;&#x80FD;&#x5B58;&#x5728;&#x4E8E;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x8FD9;&#x65F6;&#x5B83;&#x6307;&#x4EE3;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p><p>&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x65F6;&#x3002;<code>super</code>&#x5728;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x4E2D;&#x6307;&#x4EE3;&#x7236;&#x7C7B;&#x672C;&#x8EAB;&#xFF0C;&#x5728;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x548C;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#x4E2D;&#x6307;&#x4EE3;&#x7236;&#x7C7B;&#x7684;<code>prototype</code>&#x5C5E;&#x6027;&#x3002;&#x4E0D;&#x8FC7;&#x901A;&#x8FC7;<code>super</code>&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x65B9;&#x6CD5;&#x7684;<code>this</code>&#x4F9D;&#x65E7;&#x6307;&#x5411;&#x5B50;&#x7C7B;&#x3002;&#x5373;&#x662F;&#x8BF4;&#xFF0C;&#x901A;&#x8FC7;<code>super</code>&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;<code>this</code>&#x6307;&#x5411;&#x5B50;&#x7C7B;&#x672C;&#x8EAB;&#xFF1B;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;<code>this</code>&#x6307;&#x5411;&#x8BE5;&#xFF08;&#x5B50;&#x7C7B;&#x7684;&#xFF09;&#x5B9E;&#x4F8B;&#x3002;&#x800C;&#x4E14;&#x901A;&#x8FC7;<code>super</code>&#x5BF9;&#x67D0;&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#x65F6;&#xFF0C;&#x5728;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#x91CC;&#x6307;&#x4EE3;&#x8BE5;&#x5B9E;&#x4F8B;&#xFF0C;&#x5728;&#x5B50;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x91CC;&#x6307;&#x4EE3;&#x5B50;&#x7C7B;&#x672C;&#x8EAB;&#xFF0C;&#x6BD5;&#x7ADF;&#x76F4;&#x63A5;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x901A;&#x8FC7;<code>super</code>&#x4FEE;&#x6539;&#x7236;&#x7C7B;&#x662F;&#x5F88;&#x5371;&#x9669;&#x7684;&#x3002;</p><p>&#x5F88;&#x8FF7;&#x7CCA;&#x5BF9;&#x5427;&#xFF0C;&#x75AF;&#x75AF;&#x766B;&#x766B;&#x7684;&#xFF0C;&#x8FD8;&#x662F;&#x7ED3;&#x5408;&#x7740;&#x4EE3;&#x7801;&#x770B;&#x5427;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class C1 {
  static a() {
    console.log(this === C);
  }
  b() {
    console.log(this instanceof C);
  }
}

class C extends C1 {
  static c() {
    console.log(super.a); // &#x6B64;&#x65F6;super&#x6307;&#x5411;C1&#xFF0C;&#x6253;&#x5370;&#x51FA;function a&#x3002;
    
    this.x = 2; // this&#x7B49;&#x4E8E;C&#x3002;
    super.x = 3; // &#x6B64;&#x65F6;super&#x7B49;&#x4E8E;this&#xFF0C;&#x5373;C&#x3002;
    console.log(super.x); // &#x6B64;&#x65F6;super&#x6307;&#x5411;C1&#xFF0C;&#x6253;&#x5370;&#x51FA;undefined&#x3002;
    console.log(this.x); // &#x503C;&#x5DF2;&#x6539;&#x4E3A;3&#x3002;

    super.a(); // &#x6253;&#x5370;&#x51FA;true&#xFF0C;a&#x65B9;&#x6CD5;&#x7684;this&#x6307;&#x5411;C&#x3002;
  }

  constructor() {
    super(); // &#x6307;&#x4EE3;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
    
    console.log(super.c); // &#x6B64;&#x65F6;super&#x6307;&#x5411;C1.prototype&#xFF0C;&#x6253;&#x5370;&#x51FA;function c&#x3002;

    this.x = 2; // this&#x7B49;&#x4E8E;&#x65B0;&#x5B9E;&#x4F8B;&#x3002;
    super.x = 3; // &#x6B64;&#x65F6;super&#x7B49;&#x4E8E;this&#xFF0C;&#x5373;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x3002;
    console.log(super.x); // &#x6B64;&#x65F6;super&#x6307;&#x5411;C1.prototype&#xFF0C;&#x6253;&#x5370;&#x51FA;undefined&#x3002;
    console.log(this.x); // &#x503C;&#x5DF2;&#x6539;&#x4E3A;3&#x3002;

    super.b(); // &#x6253;&#x5370;&#x51FA;true&#xFF0C;b&#x65B9;&#x6CD5;&#x7684;this&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x3002;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">static</span> a() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === C);
  }
  b() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> C);
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">C1</span> </span>{
  <span class="hljs-keyword">static</span> c() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">super</span>.a); <span class="hljs-comment">// &#x6B64;&#x65F6;super&#x6307;&#x5411;C1&#xFF0C;&#x6253;&#x5370;&#x51FA;function a&#x3002;</span>
    
    <span class="hljs-keyword">this</span>.x = <span class="hljs-number">2</span>; <span class="hljs-comment">// this&#x7B49;&#x4E8E;C&#x3002;</span>
    <span class="hljs-keyword">super</span>.x = <span class="hljs-number">3</span>; <span class="hljs-comment">// &#x6B64;&#x65F6;super&#x7B49;&#x4E8E;this&#xFF0C;&#x5373;C&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">super</span>.x); <span class="hljs-comment">// &#x6B64;&#x65F6;super&#x6307;&#x5411;C1&#xFF0C;&#x6253;&#x5370;&#x51FA;undefined&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x); <span class="hljs-comment">// &#x503C;&#x5DF2;&#x6539;&#x4E3A;3&#x3002;</span>

    <span class="hljs-keyword">super</span>.a(); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;true&#xFF0C;a&#x65B9;&#x6CD5;&#x7684;this&#x6307;&#x5411;C&#x3002;</span>
  }

  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>(); <span class="hljs-comment">// &#x6307;&#x4EE3;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">super</span>.c); <span class="hljs-comment">// &#x6B64;&#x65F6;super&#x6307;&#x5411;C1.prototype&#xFF0C;&#x6253;&#x5370;&#x51FA;function c&#x3002;</span>

    <span class="hljs-keyword">this</span>.x = <span class="hljs-number">2</span>; <span class="hljs-comment">// this&#x7B49;&#x4E8E;&#x65B0;&#x5B9E;&#x4F8B;&#x3002;</span>
    <span class="hljs-keyword">super</span>.x = <span class="hljs-number">3</span>; <span class="hljs-comment">// &#x6B64;&#x65F6;super&#x7B49;&#x4E8E;this&#xFF0C;&#x5373;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">super</span>.x); <span class="hljs-comment">// &#x6B64;&#x65F6;super&#x6307;&#x5411;C1.prototype&#xFF0C;&#x6253;&#x5370;&#x51FA;undefined&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x); <span class="hljs-comment">// &#x503C;&#x5DF2;&#x6539;&#x4E3A;3&#x3002;</span>

    <span class="hljs-keyword">super</span>.b(); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;true&#xFF0C;b&#x65B9;&#x6CD5;&#x7684;this&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x3002;</span>
  }
}</code></pre><h3 id="articleHeader8">2.3 &#x7EE7;&#x627F;&#x539F;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;</h3><p>&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF0C;&#x6784;&#x5EFA;&#x7EE7;&#x627F;&#x4E86;&#x539F;&#x751F;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF08;&#x6BD4;&#x5982;<code>Array</code>&#xFF09;&#x7684;&#x5B50;&#x7C7B;&#xFF0C;&#x6709;&#x8BB8;&#x591A;&#x7F3A;&#x9677;&#x7684;&#x3002;&#x4E00;&#x65B9;&#x9762;&#x7531;&#x4E0A;&#x6587;&#x53EF;&#x77E5;&#xFF0C;&#x539F;&#x59CB;&#x7EE7;&#x627F;&#x662F;&#x5148;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;<code>this</code>&#xFF0C;&#x518D;&#x901A;&#x8FC7;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x4FEE;&#x9970;&#xFF0C;&#x56E0;&#x6B64;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x7236;&#x7C7B;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#xFF08;&#x9690;&#x85CF;&#x5C5E;&#x6027;&#xFF09;&#x3002;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x539F;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F1A;&#x76F4;&#x63A5;&#x5FFD;&#x7565;<code>call</code>&#x6216;<code>apply</code>&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x7684;<code>this</code>&#xFF0C;&#x5BFC;&#x81F4;&#x5B50;&#x7C7B;&#x6839;&#x672C;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyArray(...args) {
  Array.apply(this, args);
}

MyArray.prototype = Array.prototype;
// MyArray.prototype.constructor = MyArray;

let arr = new MyArray(1, 2, 3); // arr&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6CA1;&#x6709;&#x50A8;&#x5B58;&#x503C;&#x3002;
arr.push(4, 5); // &#x5728;arr&#x4E0A;&#x65B0;&#x589E;&#x4E86;0&#xFF0C;1&#x548C;length&#x5C5E;&#x6027;&#x3002;
arr.map(d =&gt; d); // &#x8FD4;&#x56DE;&#x6570;&#x7EC4;[4, 5]
arr.length = 1; // arr&#x5E76;&#x6CA1;&#x6709;&#x66F4;&#x65B0;&#xFF0C;&#x4F9D;&#x65E7;&#x6709;0&#xFF0C;1&#x5C5E;&#x6027;&#xFF0C;&#x4E14;arr[1]&#x4E3A;5&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyArray</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-built_in">Array</span>.apply(<span class="hljs-keyword">this</span>, args);
}

MyArray.prototype = <span class="hljs-built_in">Array</span>.prototype;
<span class="hljs-comment">// MyArray.prototype.constructor = MyArray;</span>

<span class="hljs-keyword">let</span> arr = <span class="hljs-keyword">new</span> MyArray(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// arr&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6CA1;&#x6709;&#x50A8;&#x5B58;&#x503C;&#x3002;</span>
arr.push(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>); <span class="hljs-comment">// &#x5728;arr&#x4E0A;&#x65B0;&#x589E;&#x4E86;0&#xFF0C;1&#x548C;length&#x5C5E;&#x6027;&#x3002;</span>
arr.map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> d); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x6570;&#x7EC4;[4, 5]</span>
arr.length = <span class="hljs-number">1</span>; <span class="hljs-comment">// arr&#x5E76;&#x6CA1;&#x6709;&#x66F4;&#x65B0;&#xFF0C;&#x4F9D;&#x65E7;&#x6709;0&#xFF0C;1&#x5C5E;&#x6027;&#xFF0C;&#x4E14;arr[1]&#x4E3A;5&#x3002;</span></code></pre><p>&#x521B;&#x5EFA;&#x7C7B;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x662F;&#x5148;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x5C5E;&#x4E8E;&#x7236;&#x7C7B;&#x5374;&#x6307;&#x5411;&#x5B50;&#x7C7B;&#x7684;<code>this</code>&#xFF08;&#x7ED5;&#x53E3;&#xFF09;&#xFF0C;&#x518D;&#x901A;&#x8FC7;&#x7236;&#x7C7B;&#x548C;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x4FEE;&#x9970;&#x3002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x89C4;&#x907F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x83B7;&#x53D6;&#x5230;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x5305;&#x62EC;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x3002;&#x8FDB;&#x800C;&#x771F;&#x6B63;&#x7684;&#x521B;&#x5EFA;&#x539F;&#x751F;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x5B50;&#x7C7B;&#xFF0C;&#x4ECE;&#x800C;&#x7B80;&#x5355;&#x7684;&#x6269;&#x5C55;&#x539F;&#x751F;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3002;&#x53E6;&#x5916;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;<code>Symbol.species</code>&#x5C5E;&#x6027;&#xFF0C;&#x4F7F;&#x5F97;&#x884D;&#x751F;&#x5BF9;&#x8C61;&#x4E3A;&#x539F;&#x751F;&#x7C7B;&#x800C;&#x4E0D;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array { // &#x5B9E;&#x73B0;&#x662F;&#x5982;&#x6B64;&#x7684;&#x7B80;&#x5355;
  static get [Symbol.species]() { return Array; }
}

let arr = new MyArray(1, 2, 3); // arr&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x50A8;&#x5B58;&#x6709;1&#xFF0C;2&#xFF0C;3&#x3002;
arr.map(d =&gt; d); // &#x8FD4;&#x56DE;&#x6570;&#x7EC4;[1, 2, 3]
arr.length = 1; // arr&#x6B63;&#x5E38;&#x66F4;&#x65B0;&#xFF0C;&#x5DF2;&#x5305;&#x542B;&#x5FC5;&#x8981;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{ <span class="hljs-comment">// &#x5B9E;&#x73B0;&#x662F;&#x5982;&#x6B64;&#x7684;&#x7B80;&#x5355;</span>
  <span class="hljs-keyword">static</span> get [<span class="hljs-built_in">Symbol</span>.species]() { <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>; }
}

<span class="hljs-keyword">let</span> arr = <span class="hljs-keyword">new</span> MyArray(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// arr&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x50A8;&#x5B58;&#x6709;1&#xFF0C;2&#xFF0C;3&#x3002;</span>
arr.map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> d); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x6570;&#x7EC4;[1, 2, 3]</span>
arr.length = <span class="hljs-number">1</span>; <span class="hljs-comment">// arr&#x6B63;&#x5E38;&#x66F4;&#x65B0;&#xFF0C;&#x5DF2;&#x5305;&#x542B;&#x5FC5;&#x8981;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x3002;</span></code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x7EE7;&#x627F;<code>Object</code>&#x7684;&#x5B50;&#x7C7B;&#x3002;ES6&#x6539;&#x53D8;&#x4E86;<code>Object</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x4E00;&#x65E6;&#x53D1;&#x73B0;&#x5176;&#x4E0D;&#x662F;&#x901A;&#x8FC7;<code>new Object()</code>&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F1A;&#x5FFD;&#x7565;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x3002;&#x7531;&#x6B64;&#x5BFC;&#x81F4;<code>Object</code>&#x5B50;&#x7C7B;&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x4F46;&#x8FD9;&#x4E0D;&#x662F;&#x4E2A;&#x5927;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyObject extends Object {
  static get [Symbol.species]() { return Object; }
}

let o = new MyObject({ id: 1 });
console.log(o.hasOwnPropoty(&apos;id&apos;)); // false&#xFF0C;&#x6CA1;&#x6709;&#x88AB;&#x6B63;&#x786E;&#x521D;&#x59CB;&#x5316;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyObject</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Object</span> </span>{
  <span class="hljs-keyword">static</span> get [<span class="hljs-built_in">Symbol</span>.species]() { <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>; }
}

<span class="hljs-keyword">let</span> o = <span class="hljs-keyword">new</span> MyObject({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> });
<span class="hljs-built_in">console</span>.log(o.hasOwnPropoty(<span class="hljs-string">&apos;id&apos;</span>)); <span class="hljs-comment">// false&#xFF0C;&#x6CA1;&#x6709;&#x88AB;&#x6B63;&#x786E;&#x521D;&#x59CB;&#x5316;</span></code></pre><h2 id="articleHeader9">&#x63A8;&#x8350;</h2><p><a href="https://segmentfault.com/a/1190000015244917">ES6&#x7CBE;&#x534E;&#xFF1A;Symbol</a><br><a href="https://segmentfault.com/a/1190000015423360" target="_blank">ES6&#x7CBE;&#x534E;&#xFF1A;Promise</a><br><a href="https://segmentfault.com/a/1190000016212269">Async&#xFF1A;&#x7B80;&#x6D01;&#x4F18;&#x96C5;&#x7684;&#x5F02;&#x6B65;&#x4E4B;&#x9053;</a><br><a href="https://segmentfault.com/a/1190000016047312" target="_blank">Generator&#xFF1A;JS&#x6267;&#x884C;&#x6743;&#x7684;&#x771F;&#x5B9E;&#x64CD;&#x4F5C;&#x8005;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Class：向传统类模式转变的构造函数

## 原文链接
[https://segmentfault.com/a/1190000016475608](https://segmentfault.com/a/1190000016475608)


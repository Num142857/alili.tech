---
title: 'Generator：JS执行权的真实操作者' 
date: 2018-11-15 21:20:48
hidden: true
slug: jxhrzeop528
categories: reprint
---

{{< raw >}}
<h2>&#x524D;&#x8A00;</h2><p>ES6&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x65B0;&#x578B;&#x7684;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;<code>Generator</code>&#x51FD;&#x6570;&#xFF08;&#x4EE5;&#x4E0B;&#x7B80;&#x79F0;G&#x51FD;&#x6570;&#xFF09;&#x3002;&#x5B83;&#x4E0D;&#x662F;&#x4F7F;&#x7528;JS&#x73B0;&#x6709;&#x80FD;&#x529B;&#x6309;&#x7167;&#x4E00;&#x5B9A;&#x6807;&#x51C6;&#x5236;&#x5B9A;&#x51FA;&#x6765;&#x7684;&#x4E1C;&#x897F;&#xFF08;<code>Promise</code>&#x662F;&#x5982;&#x6B64;&#x51FA;&#x751F;&#x7684;&#xFF09;&#xFF0C;&#x800C;&#x662F;&#x5177;&#x6709;&#x65B0;&#x578B;&#x5E95;&#x5C42;&#x64CD;&#x4F5C;&#x80FD;&#x529B;&#xFF0C;&#x4E0E;&#x4F20;&#x7EDF;&#x7F16;&#x7A0B;&#x5B8C;&#x5168;&#x4E0D;&#x540C;&#xFF0C;&#x4EE3;&#x8868;&#x4E00;&#x79CD;&#x65B0;&#x7F16;&#x7A0B;&#x903B;&#x8F91;&#x7684;&#x9AD8;&#x5927;&#x5B58;&#x5728;&#x3002;&#x7B80;&#x6D01;&#x65B9;&#x4FBF;&#x3001;&#x53D7;&#x4EBA;&#x559C;&#x7231;&#x7684;<code>async</code>&#x51FD;&#x6570;&#x5C31;&#x662F;&#x4EE5;&#x5B83;&#x4E3A;&#x57FA;&#x7840;&#x5B9E;&#x73B0;&#x7684;&#x3002;</p><h2>1 &#x610F;&#x4E49;</h2><p>JS&#x5F15;&#x64CE;&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;&#x6808;&#x3002;<br>&#x5F53;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x6808;&#x5C06;&#x5176;&#x5F39;&#x51FA;&#xFF0C;&#x9500;&#x6BC1;&#x5305;&#x542B;&#x5176;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7684;&#x6808;&#x7A7A;&#x95F4;&#xFF0C;&#x5E76;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x524D;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x6267;&#x884C;&#x6743;&#x7531;&#x6B64;&#x5355;&#x5411;&#x7A33;&#x5B9A;&#x7684;&#x5728;&#x4E0D;&#x540C;&#x51FD;&#x6570;&#x4E2D;&#x5207;&#x6362;&#x3002;&#x867D;&#x7136;<code>Web Worker</code>&#x7684;&#x51FA;&#x73B0;&#x4F7F;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x81EA;&#x884C;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x7EBF;&#x7A0B;&#xFF0C;&#x4F46;&#x8FD9;&#x79BB;&#x7075;&#x6D3B;&#x7684;&#x63A7;&#x5236;&#xFF1A;&#x6682;&#x505C;&#x6267;&#x884C;&#x3001;&#x5207;&#x6362;&#x6267;&#x884C;&#x6743;&#x548C;&#x4E2D;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4EA4;&#x6362;&#x7B49;&#x7B49;&#xFF0C;&#x8FD8;&#x662F;&#x5F88;&#x6709;&#x8DDD;&#x79BB;&#x7684;&#x3002;</p><p>G&#x51FD;&#x6570;&#x7684;&#x610F;&#x4E49;&#x5728;&#x4E8E;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x5728;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#x80CC;&#x666F;&#x4E0B;&#xFF0C;&#x4F7F;&#x6267;&#x884C;&#x6743;&#x4E0E;&#x6570;&#x636E;&#x81EA;&#x7531;&#x7684;&#x6E38;&#x8D70;&#x4E8E;&#x591A;&#x4E2A;&#x6267;&#x884C;&#x6808;&#x4E4B;&#x95F4;&#xFF0C;&#x5B9E;&#x73B0;&#x534F;&#x7A0B;&#x5F0F;&#x7F16;&#x7A0B;&#x3002;<br>&#x8C03;&#x7528;G&#x51FD;&#x6570;&#x540E;&#xFF0C;&#x5F15;&#x64CE;&#x4F1A;&#x4E3A;&#x5176;&#x5F00;&#x8F9F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x51FD;&#x6570;&#x6267;&#x884C;&#x6808;&#xFF08;&#x4EE5;&#x4E0B;&#x7B80;&#x79F0;G&#x6808;&#xFF09;&#x3002;&#x5728;&#x6267;&#x884C;&#x5B83;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x6682;&#x505C;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x5C06;&#x6267;&#x884C;&#x6743;&#x8F6C;&#x51FA;&#x7ED9;&#x4E3B;&#x6267;&#x884C;&#x6808;&#x6216;&#x53E6;&#x4E00;&#x4E2A;G&#x6808;&#xFF08;&#x6808;&#x5728;&#x8FD9;&#x91CC;&#x53EF;&#x7406;&#x89E3;&#x4E3A;&#x51FD;&#x6570;&#xFF09;&#x3002;&#x800C;&#x6B64;G&#x6808;&#x4E0D;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#x800C;&#x662F;&#x88AB;&#x51BB;&#x7ED3;&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x6743;&#x518D;&#x6B21;&#x56DE;&#x6765;&#x65F6;&#xFF0C;&#x4F1A;&#x5728;&#x4E0E;&#x4E0A;&#x6B21;&#x9000;&#x51FA;&#x65F6;&#x5B8C;&#x5168;&#x76F8;&#x540C;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4EA4;&#x51FA;&#x548C;&#x518D;&#x6B21;&#x83B7;&#x5F97;&#x6267;&#x884C;&#x6743;&#x7684;&#x4F8B;&#x5B50;&#x3002;</p><pre><code class="js">// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 2 3 4 5&#x3002;

let g = G();

console.log(&apos;1&apos;); // &#x6267;&#x884C;&#x6743;&#x5728;&#x5916;&#x90E8;&#x3002;
g.next(); // &#x5F00;&#x59CB;&#x6267;&#x884C;G&#x51FD;&#x6570;&#xFF0C;&#x9047;&#x5230; yield &#x547D;&#x4EE4;&#x540E;&#x505C;&#x6B62;&#x6267;&#x884C;&#x8FD4;&#x56DE;&#x6267;&#x884C;&#x6743;&#x3002;
console.log(&apos;3&apos;); // &#x6267;&#x884C;&#x6743;&#x518D;&#x6B21;&#x56DE;&#x5230;&#x5916;&#x90E8;&#x3002;
g.next(); // &#x518D;&#x6B21;&#x8FDB;&#x5165;&#x5230;G&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x4ECE;&#x4E0A;&#x6B21;&#x505C;&#x6B62;&#x7684;&#x5730;&#x65B9;&#x5F00;&#x59CB;&#x6267;&#x884C;&#xFF0C;&#x5230;&#x6700;&#x540E;&#x81EA;&#x52A8;&#x8FD4;&#x56DE;&#x6267;&#x884C;&#x6743;&#x3002;
console.log(&apos;5&apos;);

function* G() {
  let n = 4;
  console.log(&apos;2&apos;);
  yield; // &#x9047;&#x5230;&#x6B64;&#x547D;&#x4EE4;&#xFF0C;&#x4F1A;&#x6682;&#x505C;&#x6267;&#x884C;&#x5E76;&#x8FD4;&#x56DE;&#x6267;&#x884C;&#x6743;&#x3002;
  console.log(n);
}</code></pre><h2>2 &#x767B;&#x5802;</h2><h3>2.1 &#x5F62;&#x5F0F;</h3><p>G&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x5177;&#x6709;&#x666E;&#x901A;&#x51FD;&#x6570;&#x8BE5;&#x6709;&#x7684;&#x6027;&#x8D28;&#xFF0C;&#x4E0D;&#x8FC7;&#x5F62;&#x5F0F;&#x4E0A;&#x6709;&#x4E24;&#x70B9;&#x4E0D;&#x540C;&#x3002;&#x4E00;&#x662F;&#x5728;<code>function</code>&#x5173;&#x952E;&#x5B57;&#x548C;&#x51FD;&#x6570;&#x540D;&#x4E4B;&#x95F4;&#x6709;&#x4E00;&#x4E2A;<code>*</code>&#x53F7;&#xFF0C;&#x8868;&#x793A;&#x6B64;&#x4E3A;G&#x51FD;&#x6570;&#x3002;&#x4E8C;&#x662F;&#x53EA;&#x6709;&#x5728;G&#x51FD;&#x6570;&#x91CC;&#x624D;&#x80FD;&#x4F7F;&#x7528;<code>yield</code>&#x547D;&#x4EE4;&#xFF08;&#x4EE5;&#x53CA;<code>yield*</code>&#x547D;&#x4EE4;&#xFF09;&#xFF0C;&#x5904;&#x4E8E;&#x5176;&#x5185;&#x90E8;&#x7684;&#x975E;G&#x51FD;&#x6570;&#x4E5F;&#x4E0D;&#x884C;&#x3002;&#x7531;&#x4E8E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;<code>yield</code>&#x547D;&#x4EE4;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x80FD;&#x7528;&#x4F5C;&#x4E8E;<code>Generator</code>&#x51FD;&#x6570;&#xFF08;&#x53EF;&#x4EE5;&#x7528;&#x4F5C;&#x4E8E;<code>async</code>&#x51FD;&#x6570;&#xFF09;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x5B83;&#x7684;&#x51E0;&#x79CD;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#x3002;</p><pre><code class="js">// &#x58F0;&#x660E;&#x5F0F;
function* G() {}

// &#x8868;&#x8FBE;&#x5F0F;
let G = function* () {};

// &#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;
let o = {
  G: function* () {}
};

// &#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x7B80;&#x5199;&#x5F0F;
let o = {
  * G() {}
};

// &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0D;&#x80FD;&#x7528;&#x4F5C;G&#x51FD;&#x6570;&#xFF0C;&#x62A5;&#x9519;&#xFF01;
let o = {
  G: *() =&gt; {}
};

// &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x7528;&#x4F5C; async &#x51FD;&#x6570;&#x3002;
let o = {
  G: async () =&gt; {}
};</code></pre><h3>2.2 &#x6267;&#x884C;</h3><p>&#x8C03;&#x7528;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4F1A;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x4F46;G&#x51FD;&#x6570;&#x4E0D;&#x540C;&#xFF0C;&#x6267;&#x884C;&#x5B83;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF08;&#x6B64;&#x5BF9;&#x8C61;&#x4E0E;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x76F8;&#x540C;&#xFF09;&#xFF0C;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x53EA;&#x6709;&#x5F53;&#x8C03;&#x7528;&#x5B83;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF08;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x5176;&#x5B83;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#xFF09;&#x65F6;&#xFF0C;&#x624D;&#x5F00;&#x59CB;&#x4E86;&#x771F;&#x6B63;&#x6267;&#x884C;&#x3002;</p><p>&#x5728;G&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x78B0;&#x5230;<code>yield</code>&#x6216;<code>return</code>&#x547D;&#x4EE4;&#x65F6;&#x4F1A;&#x505C;&#x6B62;&#x6267;&#x884C;&#x5E76;&#x5C06;&#x6267;&#x884C;&#x6743;&#x8FD4;&#x56DE;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x6267;&#x884C;&#x5230;&#x6B64;&#x51FD;&#x6570;&#x672B;&#x5C3E;&#x65F6;&#x81EA;&#x7136;&#x4F1A;&#x8FD4;&#x56DE;&#x6267;&#x884C;&#x6743;&#x3002;&#x6BCF;&#x6B21;&#x8FD4;&#x56DE;&#x6267;&#x884C;&#x6743;&#x4E4B;&#x540E;&#x518D;&#x6B21;&#x8C03;&#x7528;&#x5B83;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF08;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x5176;&#x5B83;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x4F1A;&#x91CD;&#x65B0;&#x83B7;&#x5F97;&#x6267;&#x884C;&#x6743;&#xFF0C;&#x5E76;&#x4ECE;&#x4E0A;&#x6B21;&#x505C;&#x6B62;&#x7684;&#x5730;&#x65B9;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#xFF0C;&#x76F4;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x505C;&#x6B62;&#x70B9;&#x6216;&#x7ED3;&#x675F;&#x3002;</p><pre><code class="js">// &#x793A;&#x4F8B;&#x4E00;
let g = G();
g.next(); // &#x6253;&#x5370;&#x51FA; 1
g.next(); // &#x6253;&#x5370;&#x51FA; 2
g.next(); // &#x6253;&#x5370;&#x51FA; 3

function* G() {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
}

// &#x793A;&#x4F8B;&#x4E8C;
let gg = GG();

gg.next(); // &#x6253;&#x5370;&#x51FA; 1
gg.next(); // &#x6253;&#x5370;&#x51FA; 2
gg.next(); // &#x6CA1;&#x6709;&#x6253;&#x5370;

function* GG() {
  console.log(1);
  yield;
  console.log(2);
  return;
  yield;
  console.log(3);
}</code></pre><h2>3 &#x5165;&#x5BA4;</h2><h3>3.1 &#x6570;&#x636E;&#x4EA4;&#x4E92;</h3><p>&#x6570;&#x636E;&#x5982;&#x679C;&#x4E0D;&#x80FD;&#x5728;&#x6267;&#x884C;&#x6743;&#x7684;&#x66F4;&#x66FF;&#x4E2D;&#x53D6;&#x5F97;&#x4EA4;&#x4E92;&#xFF0C;&#x5176;&#x5B58;&#x5728;&#x7684;&#x610F;&#x4E49;&#x5C31;&#x4F1A;&#x5927;&#x6253;&#x6298;&#x6263;&#x3002;</p><p>G&#x51FD;&#x6570;&#x7684;&#x6570;&#x636E;&#x8F93;&#x51FA;&#x548C;&#x8F93;&#x5165;&#x662F;&#x901A;&#x8FC7;<code>yield</code>&#x547D;&#x4EE4;&#x548C;<code>next</code>&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#x3002;<br><code>yield</code>&#x548C;<code>return</code>&#x4E00;&#x6837;&#xFF0C;&#x540E;&#x9762;&#x53EF;&#x4EE5;&#x8DDF;&#x4E0A;&#x4EFB;&#x610F;&#x6570;&#x636E;&#xFF0C;&#x7A0B;&#x5E8F;&#x6267;&#x884C;&#x5230;&#x6B64;&#x4F1A;&#x4EA4;&#x51FA;&#x63A7;&#x5236;&#x6743;&#x5E76;&#x8FD4;&#x56DE;&#x5176;&#x540E;&#x7684;&#x8DDF;&#x968F;&#x503C;&#xFF08;&#x6CA1;&#x6709;&#x5219;&#x4E3A;<code>undefined</code>&#xFF09;&#xFF0C;&#x4F5C;&#x4E3A;&#x6570;&#x636E;&#x7684;&#x8F93;&#x51FA;&#x3002;&#x6BCF;&#x6B21;&#x8C03;&#x7528;<code>next</code>&#x65B9;&#x6CD5;&#x5C06;&#x63A7;&#x5236;&#x6743;&#x79FB;&#x4EA4;&#x7ED9;G&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4EFB;&#x610F;&#x6570;&#x636E;&#xFF0C;&#x8BE5;&#x6570;&#x636E;&#x4F1A;&#x7B49;&#x540C;&#x66FF;&#x6362;G&#x51FD;&#x6570;&#x5185;&#x90E8;&#x76F8;&#x5E94;&#x7684;<code>yield xxx</code>&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4F5C;&#x4E3A;&#x6570;&#x636E;&#x7684;&#x8F93;&#x5165;&#x3002;</p><p>&#x6267;&#x884C;G&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x3002;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x5B83;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x5177;&#x6709;<code>value</code>&#x548C;<code>done</code>&#x5B57;&#x6BB5;&#x7684;&#x5BF9;&#x8C61;&#x3002;<code>value</code>&#x5B58;&#x50A8;&#x4E86;&#x79FB;&#x51FA;&#x63A7;&#x5236;&#x6743;&#x65F6;&#x8F93;&#x51FA;&#x7684;&#x6570;&#x636E;&#xFF08;&#x5373;<code>yield</code>&#x6216;<code>return</code>&#x540E;&#x7684;&#x8DDF;&#x968F;&#x503C;&#xFF09;&#xFF0C;<code>done</code>&#x4E3A;&#x5E03;&#x5C14;&#x503C;&#x4EE3;&#x8868;&#x8BE5;G&#x51FD;&#x6570;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x6267;&#x884C;&#x3002;&#x4F5C;&#x4E3A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x7684;&#x5B83;&#x5177;&#x6709;&#x548C;&#x6570;&#x7EC4;&#x904D;&#x5386;&#x5668;&#x76F8;&#x540C;&#x7684;&#x5176;&#x5B83;&#x6027;&#x8D28;&#x3002;</p><pre><code class="js">// n1 &#x7684; value &#x4E3A; 10&#xFF0C;a &#x548C; n2 &#x7684; value &#x4E3A; 100&#x3002;
let g = G(10);

let n1 = g.next(); // &#x5F97;&#x5230; n &#x503C;&#x3002;
let n2 = g.next(100); // &#x76F8;&#x5F53;&#x5C06; yield n &#x66FF;&#x6362;&#x6210; 100&#x3002;

function* G(n) {
  let a = yield n; // let a = 100;
  console.log(a); // 100
  return a;
}</code></pre><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;G&#x51FD;&#x6570;&#x662F;&#x5B9E;&#x73B0;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x6700;&#x7B80;&#x5355;&#x7684;&#x9014;&#x5F84;&#xFF0C;&#x4E0D;&#x8FC7;&#x6709;&#x4E24;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x3002;&#x4E00;&#x662F;G&#x51FD;&#x6570;&#x4E2D;&#x7684;<code>return</code>&#x8BED;&#x53E5;&#xFF0C;&#x867D;&#x7136;&#x901A;&#x8FC7;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x83B7;&#x5F97;<code>return</code>&#x540E;&#x9762;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x4F46;&#x6B64;&#x65F6;<code>done</code>&#x5C5E;&#x6027;&#x5DF2;&#x4E3A;<code>true</code>&#xFF0C;&#x901A;&#x8FC7;<code>for of</code>&#x5FAA;&#x73AF;&#x662F;&#x904D;&#x5386;&#x4E0D;&#x5230;&#x7684;&#x3002;&#x4E8C;&#x662F;G&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#x4E3A;&#x6C38;&#x52A8;&#x673A;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x7C7B;&#x4F3C;&#x670D;&#x52A1;&#x5668;&#x76D1;&#x542C;&#x5E76;&#x6267;&#x884C;&#x8BF7;&#x6C42;&#xFF0C;&#x8FD9;&#x65F6;&#x901A;&#x8FC7;<code>for of</code>&#x904D;&#x5386;&#x662F;&#x6CA1;&#x6709;&#x5C3D;&#x5934;&#x7684;&#x3002;</p><pre><code class="js">--- &#x793A;&#x4F8B;&#x4E00;&#xFF1A;return &#x8FD4;&#x56DE;&#x503C;&#x3002;
let g1 = G();
console.log( g1.next() ); // value: 1, done: false
console.log( g1.next() ); // value: 2, done: true
console.log( g1.next() ); // value: undefined, done: true

let g2 = G();
for (let v of g2) {
  console.log(v); // &#x53EA;&#x6253;&#x5370;&#x51FA; 1&#x3002;
}

function* G() {
  yield 1;
  return 2;
}

--- &#x793A;&#x4F8B;&#x4E8C;&#xFF1A;&#x4F5C;&#x4E3A;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x3002;
let o = {
  id: 1,
  name: 2,
  ago: 3,
  *[Symbol.iterator]() {
    let arr = Object.keys(this);
    for (let v of arr) {
      yield this[v]; // &#x4F7F;&#x7528; yield &#x8F93;&#x51FA;&#x3002;
    }
  }
}

for (let v of o) {
  console.log(v); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 2 3&#x3002;
}

--- &#x793A;&#x4F8B;&#x4E09;&#xFF1A;&#x6C38;&#x52A8;&#x673A;&#x3002;
let g = G();
g.next(); // &#x6253;&#x5370;&#x51FA;&#xFF1A; Do ... &#x3002;
g.next(); // &#x6253;&#x5370;&#x51FA;&#xFF1A; Do ... &#x3002;
// ... &#x53EF;&#x4EE5;&#x65E0;&#x7A77;&#x6B21;&#x8C03;&#x7528;&#x3002;

// &#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x6B64;&#x4F8B;&#x5B50;&#xFF0C;&#x867D;&#x7136;&#x9875;&#x9762;&#x4F1A;&#x5D29;&#x6E83;&#x3002;
// &#x5D29;&#x6E83;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x5173;&#x95ED;&#x9875;&#x9762;&#xFF0C;&#x6216;&#x7EC8;&#x6B62;&#x6D4F;&#x89C8;&#x5668;&#x8FDB;&#x7A0B;&#xFF0C;&#x6216;&#x8FB1;&#x9A82;&#x4F5C;&#x8005;&#x3002;
for (let v of G()) {
  console.log(v);
}

function* G() {
  while (true) {
    console.log(&apos;Do ...&apos;);
    yield;
  }
}</code></pre><h3>3.2 yield*</h3><p><code>yield*</code>&#x547D;&#x4EE4;&#x7684;&#x57FA;&#x672C;&#x539F;&#x7406;&#x662F;&#x81EA;&#x52A8;&#x904D;&#x5386;&#x5E76;&#x7528;<code>yield</code>&#x547D;&#x4EE4;&#x8F93;&#x51FA;&#x62E5;&#x6709;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x602A;&#x7ED5;&#x53E3;&#x7684;&#xFF0C;&#x76F4;&#x63A5;&#x770B;&#x793A;&#x4F8B;&#x5427;&#x3002;</p><pre><code class="js">// G2 &#x4E0E; G22 &#x51FD;&#x6570;&#x7B49;&#x4EF7;&#x3002;

for (let v of G1()) {
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1 [2, 3] 4&#x3002;
}
for (let v of G2()) {
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1 2 3 4&#x3002;
}
for (let v of G22()) {
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1 2 3 4&#x3002;
}

function* G1() {
  yield 1;
  yield [2, 3];
  yield 4;
}

function* G2() {
  yield 1;
  yield* [2, 3]; // &#x4F7F;&#x7528; yield* &#x81EA;&#x52A8;&#x904D;&#x5386;&#x3002;
  yield 4;
}

function* G22() {
  yield 1;
  for (let v of [2, 3]) { // &#x7B49;&#x4EF7;&#x4E8E; yield* &#x547D;&#x4EE4;&#x3002;
    yield v;
  }
  yield 4;
}</code></pre><p>&#x5728;G&#x51FD;&#x6570;&#x4E2D;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x53E6;&#x4E00;&#x4E2A;G&#x51FD;&#x6570;&#xFF0C;&#x4E0E;&#x5728;&#x5916;&#x90E8;&#x8C03;&#x7528;&#x6CA1;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF0C;&#x5373;&#x4FBF;&#x524D;&#x9762;&#x52A0;&#x4E0A;<code>yield</code>&#x547D;&#x4EE4;&#x3002;&#x4F46;&#x5982;&#x679C;&#x4F7F;&#x7528;<code>yield*</code>&#x547D;&#x4EE4;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x6574;&#x5408;&#x5B50;G&#x51FD;&#x6570;&#x5230;&#x7236;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x5341;&#x5206;&#x65B9;&#x4FBF;&#x3002;&#x56E0;&#x4E3A;G&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;<code>yield*</code>&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x5C55;&#x5F00;&#x6301;&#x6709;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x7528;<code>yield</code>&#x8F93;&#x51FA;&#x3002;&#x5982;&#x6B64;&#x5C31;&#x7B49;&#x4EF7;&#x4E8E;&#x5C06;&#x5B50;G&#x51FD;&#x6570;&#x7684;&#x51FD;&#x6570;&#x4F53;&#x539F;&#x539F;&#x672C;&#x672C;&#x7684;&#x590D;&#x5236;&#x5230;&#x7236;G&#x51FD;&#x6570;&#x4E2D;&#x3002;</p><pre><code class="js">// G1 &#x4E0E; G2 &#x7B49;&#x4EF7;&#x3002;

for (let v of G1()) {
  console.log(v); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 2 &apos;-&apos; 3 4
}
for (let v of G2()) {
  console.log(v); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 2 &apos;-&apos; 3 4
}

function* G1() {
  yield 1;
  yield* GG();
  yield 4;
}

function* G2() {
  yield 1;
  yield 2;
  console.log(&apos;-&apos;);
  yield 3;
  yield 4;
}

function* GG() {
  yield 2;
  console.log(&apos;-&apos;);
  yield 3;
}</code></pre><p>&#x552F;&#x4E00;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x5B50;G&#x51FD;&#x6570;&#x4E2D;&#x7684;<code>return</code>&#x8BED;&#x53E5;&#x3002;<code>yield*</code>&#x867D;&#x7136;&#x4E0E;<code>for of</code>&#x4E00;&#x6837;&#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x5230;&#x8BE5;&#x503C;&#xFF0C;&#x4F46;&#x5176;&#x80FD;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8BE5;&#x503C;&#x3002;</p><pre><code class="js">let g = G();

console.log( g.next().value ); // 1
console.log( g.next().value ); // undefined, &#x6253;&#x5370;&#x51FA; return 2&#x3002;

function* G() {
  let n = yield* GG(); // &#x7B2C;&#x4E8C;&#x6B21;&#x6267;&#x884C; next &#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x8FD9;&#x91CC;&#x7B49;&#x4EF7;&#x4E8E; let n = 2; &#x3002;
  console.log(&apos;return&apos;, n);
}

function* GG() {
  yield 1;
  return 2;
}</code></pre><h3>3.3 &#x5F02;&#x6B65;&#x5E94;&#x7528;</h3><p>&#x5386;&#x7ECF;&#x4E86;&#x5982;&#x6B64;&#x591A;&#x7684;&#x94FA;&#x57AB;&#xFF0C;&#x662F;&#x5230;&#x5C06;&#x5176;&#x5E94;&#x7528;&#x5230;&#x5F02;&#x6B65;&#x7684;&#x65F6;&#x5019;&#x4E86;&#xFF0C;&#x6765;&#x6765;&#x6765;&#xFF0C;&#x559D;&#x4E86;&#x8FD9;&#x575B;&#x9152;&#x54B1;&#x5C31;&#x5230;&#x9A6C;&#x8DEF;&#x4E0A;&#x78B0;&#x4E2A;&#x74F7;&#x8BD5;&#x8BD5;&#x8FD0;&#x6C14;&#x3002;<br>&#x4F7F;&#x7528;G&#x51FD;&#x6570;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;&#x4F18;&#x52BF;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;&#x5728;&#x8FD9;&#x4EE5;&#x524D;&#x6700;&#x4F18;&#x79C0;&#x7684;<code>Promise</code>&#x6765;&#x8BF4;&#xFF0C;&#x5728;&#x4E8E;&#x5F62;&#x5F0F;&#x4E0A;&#x4F7F;&#x4E3B;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x66F4;&#x4E3A;&#x7684;&#x7CBE;&#x7B80;&#x548C;&#x6E05;&#x6670;&#xFF0C;&#x4F7F;&#x5176;&#x770B;&#x8D77;&#x6765;&#x4E0E;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x57FA;&#x672C;&#x76F8;&#x540C;&#x3002;&#x867D;&#x7136;&#x5728;&#x65E5;&#x5E38;&#x751F;&#x6D3B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x8BF4;&#x8C01;&#x8C01;&#x505A;&#x4E8B;&#x7231;&#x641E;&#x5F62;&#x5F0F;&#x591A;&#x5C11;&#x5305;&#x542B;&#x6709;&#x8D2C;&#x4F4E;&#x610F;&#x5473;&#x3002;&#x4F46;&#x5728;&#x8FD9;&#x7A0B;&#x5E8F;&#x7684;&#x4E16;&#x754C;&#xFF0C;&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x7F16;&#x5199;&#x548C;&#x4ED6;&#x4EBA;&#x9605;&#x8BFB;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x4E9B;&#x6539;&#x8FDB;&#x7684;&#x6548;&#x76CA;&#x53EF;&#x662F;&#x76F8;&#x5F53;&#x53EF;&#x89C2;&#x54E6;&#x3002;</p><pre><code class="js">// &#x6A21;&#x62DF;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x3002;
// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA; get api1, Do ..., get api2, Do ..., &#x6700;&#x7EC8;&#x503C;&#xFF1A;3000 &#x3002;

// &#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;&#x4E3B;&#x903B;&#x8F91;&#x5757;
function* G() {
  let api1 = yield createPromise(1000); // &#x53D1;&#x9001;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x8BE5; Promise &#x3002;
  console.log(&apos;get api1&apos;, api1); // &#x5F97;&#x5230;&#x6570;&#x636E;&#x3002;
  console.log(&apos;Do somethings with api1&apos;); // &#x505A;&#x4E9B;&#x64CD;&#x4F5C;&#x3002;
  
  let api2 = yield createPromise(2000); // &#x53D1;&#x9001;&#x7B2C;&#x4E8C;&#x4E2A;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x8BE5; Promise &#x3002;
  console.log(&apos;get api2&apos;, api2); // &#x5F97;&#x5230;&#x6570;&#x636E;&#x3002;
  console.log(&apos;Do somethings with api2&apos;); // &#x505A;&#x4E9B;&#x64CD;&#x4F5C;&#x3002;
  
  return api1 + api2;
}

// &#x5F00;&#x59CB;&#x6267;&#x884C;G&#x51FD;&#x6570;&#x3002;
let g = G();
// &#x5F97;&#x5230;&#x7B2C;&#x4E00;&#x4E2A; Promise &#x5E76;&#x7B49;&#x5F85;&#x5176;&#x8FD4;&#x56DE;&#x6570;&#x636E;
g.next().value.then(res =&gt; {
  // &#x83B7;&#x53D6;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x3002;
  return g.next(res).value; // &#x5C06;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x4F20;&#x56DE;&#xFF0C;&#x5E76;&#x83B7;&#x53D6;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A; Promise &#x3002;
}).then(res =&gt; {
  // &#x83B7;&#x53D6;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x3002;
  return g.next(res).value; // &#x5C06;&#x7B2C;&#x4E8C;&#x4E2A;&#x6570;&#x636E;&#x4F20;&#x56DE;&#x3002;
}).then(res =&gt; {
  console.log(&apos;&#x6700;&#x7EC8;&#x503C;&#xFF1A;&apos;, res);
});

// &#x6A21;&#x62DF;&#x8BF7;&#x6C42;&#x6570;&#x636E;
function createPromise(time) {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(time);
    }, time);
  });
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x5927;&#x7684;&#x4F18;&#x5316;&#x7A7A;&#x95F4;&#x3002;&#x6211;&#x4EEC;&#x6267;&#x884C;&#x51FD;&#x6570;&#x65F6;&#x7684;&#x903B;&#x8F91;&#x662F;&#xFF1A;&#x5148;&#x83B7;&#x53D6;&#x5230;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x5E76;&#x7B49;&#x5F85;&#x5176;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x518D;&#x5C06;&#x7ED3;&#x679C;&#x4F20;&#x9012;&#x56DE;G&#x51FD;&#x6570;&#xFF0C;&#x4E4B;&#x540E;&#x91CD;&#x590D;&#x64CD;&#x4F5C;&#x3002;&#x800C;&#x6309;&#x7167;&#x6B64;&#x65B9;&#x5F0F;&#xFF0C;&#x610F;&#x5473;&#x7740;G&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x591A;&#x5C11;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5E94;&#x8BE5;&#x91CD;&#x590D;&#x591A;&#x5C11;&#x6B21;&#x8BE5;&#x64CD;&#x4F5C;&#x3002;&#x5982;&#x679C;&#x89C2;&#x4F17;&#x8001;&#x7237;&#x4EEC;&#x8DB3;&#x591F;&#x654F;&#x611F;&#xFF0C;&#x6B64;&#x65F6;&#x5C31;&#x80FD;&#x60F3;&#x5230;&#x8FD9;&#x4E9B;&#x6B65;&#x594F;&#x662F;&#x80FD;&#x62BD;&#x8C61;&#x6210;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x3002;&#x800C;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x7684;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x662F;G&#x51FD;&#x6570;&#x7684;&#x81EA;&#x6267;&#x884C;&#x5668;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;&#x81EA;&#x6267;&#x884C;&#x5668;&#xFF0C;&#x5B83;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#x3002;&#x518D;&#x5F80;&#x5185;&#x662F;&#x901A;&#x8FC7;&#x9012;&#x5F52;&#x4E00;&#x6B65;&#x6B65;&#x7684;&#x6267;&#x884C;G&#x51FD;&#x6570;&#xFF0C;&#x5BF9;&#x5176;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x90FD;&#x7EDF;&#x4E00;&#x4F7F;&#x7528;<code>resolve</code>&#x65B9;&#x6CD5;&#x5305;&#x88C5;&#x6210;<code>Promise</code>&#x5BF9;&#x8C61;&#x3002;</p><pre><code class="js">// &#x4E0E;&#x4E0A;&#x4E00;&#x4E2A;&#x793A;&#x4F8B;&#x7B49;&#x4EF7;&#x3002;
RunG(G).then(res =&gt; {
  console.log(&apos;G&#x51FD;&#x6570;&#x6267;&#x884C;&#x7ED3;&#x675F;&#xFF1A;&apos;, res); // 3000
});

function* G() {
  let api1 = yield createPromise(1000);
  console.log(&apos;get api1&apos;, api1);
  console.log(&apos;Do somethings with api1&apos;);
  
  let api2 = yield createPromise(2000);
  console.log(&apos;get api2&apos;, api2);
  console.log(&apos;Do somethings with api2&apos;);
  
  return api1 + api2;
}

function RunG(G) {
  // &#x8FD4;&#x56DE; Promise &#x5BF9;&#x8C61;&#x3002;
  return new Promise((resolve, reject) =&gt; {
    let g = G();

    next();

    function next(data) {
      let r = g.next(data);

      // &#x6210;&#x529F;&#x6267;&#x884C;&#x5B8C;G&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x6539;&#x53D8; Promise &#x7684;&#x72B6;&#x6001;&#x4E3A;&#x6210;&#x529F;&#x3002;
      if (r.done) return resolve(r.value);

      // &#x5C06;&#x6BCF;&#x6B21;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x7EDF;&#x4E00;&#x5305;&#x88C5;&#x6210; Promise &#x5BF9;&#x8C61;&#x3002;
      // &#x6210;&#x529F;&#x5219;&#x7EE7;&#x7EED;&#x6267;&#x884C;G&#x51FD;&#x6570;&#xFF0C;&#x5426;&#x5219;&#x6539;&#x53D8; Promise &#x7684;&#x72B6;&#x6001;&#x4E3A;&#x5931;&#x8D25;&#x3002;
      Promise.resolve(r.value).then(next).catch(reject);
    }
  });
}

function createPromise(time) {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(time);
    }, time);
  });
}</code></pre><p>&#x81EA;&#x6267;&#x884C;&#x5668;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x4EFB;&#x610F;&#x7684;G&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x5E94;&#x7528;&#x4E8E;&#x5F02;&#x6B65;&#x65F6;&#x5FC5;&#x8981;&#x7684;&#x5496;&#x5561;&#x4F34;&#x4FA3;&#x3002;&#x4E0A;&#x9762;&#x662F;&#x63A5;&#x5730;&#x6C14;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x8F83;&#x4E3A;&#x5B98;&#x65B9;&#x7684;&#x7248;&#x672C;&#x3002;&#x53EF;&#x4EE5;&#x76F4;&#x89C2;&#x7684;&#x611F;&#x53D7;&#x5230;&#xFF0C;&#x4E24;&#x8005;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#x5728;&#x5BF9;&#x53EF;&#x80FD;&#x9519;&#x8BEF;&#x7684;&#x6355;&#x83B7;&#x548C;&#x5904;&#x7406;&#x4E0A;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x5E73;&#x5E38;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x548C;&#x6784;&#x5EFA;&#x5E95;&#x5C42;&#x5E93;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#x4E4B;&#x4E00;&#x3002;</p><pre><code class="js">function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}</code></pre><h2>4 &#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</h2><p>&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x6BD4;&#x5982;<code>next</code>&#x4EE5;&#x53CA;&#x63A5;&#x4E0B;&#x6765;&#x7684;<code>throw</code>&#x548C;<code>return</code>&#xFF0C;&#x5B9E;&#x9645;&#x662F;&#x5B58;&#x5728;G&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E2D;&#x3002;&#x6267;&#x884C;G&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x4F1A;&#x7EE7;&#x627F;G&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x3002;&#x5728;&#x6B64;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x88AB;&#x7EE7;&#x627F;&#x3002;&#x8FD9;&#x4F7F;&#x5F97;G&#x51FD;&#x6570;&#x770B;&#x8D77;&#x6765;&#x7C7B;&#x4F3C;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E24;&#x8005;&#x4E0D;&#x76F8;&#x540C;&#x3002;&#x56E0;&#x4E3A;G&#x51FD;&#x6570;&#x672C;&#x5C31;&#x4E0D;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x80FD;&#x88AB;<code>new</code>&#xFF0C;&#x5185;&#x90E8;&#x7684;<code>this</code>&#x4E5F;&#x4E0D;&#x80FD;&#x88AB;&#x7EE7;&#x627F;&#x3002;</p><pre><code class="js">function* G() {
  this.id = 123;
}
G.prototype.sayName = () =&gt; {
  console.log(&apos;Wmaker&apos;);
};

let g = G();
g.id; // undefined
g.sayName(); // &apos;Wmaker&apos;</code></pre><h3>4.1 throw</h3><p>&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;<code>throw</code>&#x548C;<code>next</code>&#x65B9;&#x6CD5;&#x7684;&#x6027;&#x8D28;&#x57FA;&#x672C;&#x76F8;&#x540C;&#xFF0C;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x5176;&#x662F;&#x5411;G&#x51FD;&#x6570;&#x4F53;&#x5185;&#x4F20;&#x9012;&#x9519;&#x8BEF;&#x800C;&#x4E0D;&#x662F;&#x503C;&#x3002;&#x901A;&#x4FD7;&#x7684;&#x8868;&#x8FBE;&#x662F;&#x5C06;<code>yield xxx</code>&#x8868;&#x8FBE;&#x5F0F;&#x66FF;&#x6362;&#x6210;<code>throw &#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;</code>&#x3002;&#x5176;&#x5B83;&#x6BD4;&#x5982;&#x4F1A;&#x63A5;&#x7740;&#x6267;&#x884C;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x65AD;&#x70B9;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7B49;&#x7B49;&#xFF0C;&#x548C;<code>next</code>&#x65B9;&#x6CD5;&#x4E00;&#x81F4;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x4F7F;&#x5F97;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x66F4;&#x4E3A;&#x7B80;&#x5355;&#xFF0C;&#x800C;&#x4E14;&#x591A;&#x4E2A;<code>yield</code>&#x8868;&#x8FBE;&#x5F0F;&#x53EF;&#x4EE5;&#x53EA;&#x7528;&#x4E00;&#x4E2A;<code>try catch</code>&#x4EE3;&#x7801;&#x5757;&#x6355;&#x83B7;&#x3002;</p><p>&#x5F53;&#x901A;&#x8FC7;<code>throw</code>&#x65B9;&#x6CD5;&#x6216;G&#x51FD;&#x6570;&#x5728;&#x6267;&#x884C;&#x4E2D;&#x81EA;&#x5DF1;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x65F6;&#x3002;&#x5982;&#x679C;&#x6B64;&#x4EE3;&#x7801;&#x6B63;&#x597D;&#x88AB;<code>try catch</code>&#x5757;&#x5305;&#x88F9;&#xFF0C;&#x4FBF;&#x4F1A;&#x50CF;&#x516C;&#x56ED;&#x91CC;&#x884C;&#x5B8C;&#x65B9;&#x4FBF;&#x7684;&#x5BA0;&#x7269;&#x4E00;&#x6837;&#xFF0C;&#x6CA1;&#x4E8B;&#x7684;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x6267;&#x884C;&#x3002;&#x9047;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x65AD;&#x70B9;&#xFF0C;&#x4EA4;&#x51FA;&#x6267;&#x884C;&#x6743;&#x4F20;&#x51FA;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x9519;&#x8BEF;&#x6355;&#x83B7;&#xFF0C;JS&#x4F1A;&#x7EC8;&#x6B62;&#x6267;&#x884C;&#x5E76;&#x8BA4;&#x4E3A;&#x51FD;&#x6570;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;&#x8FD0;&#x884C;&#xFF0C;&#x6B64;&#x540E;&#x518D;&#x8C03;&#x7528;<code>next</code>&#x65B9;&#x6CD5;&#x4F1A;&#x4E00;&#x76F4;&#x8FD4;&#x56DE;<code>value</code>&#x4E3A;<code>undefined</code>&#x3001;<code>done</code>&#x4E3A;<code>true</code>&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><pre><code class="js">// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1, Error: 2, 3&#x3002;
let g = G();

console.log( g.next().value ); // 1
console.log( g.throw(2).value ); // 3&#xFF0C;&#x6253;&#x5370;&#x51FA; Error: 2&#x3002;

function* G() {
  try {
    yield 1;
  } catch(e) {
    console.log(&apos;Error:&apos;, e);
  }
  yield 3;
}

// &#x4F7F;&#x7528;&#x4E86; throw(2) &#x7B49;&#x4EF7;&#x4E8E;&#x4F7F;&#x7528; next() &#x5E76;&#x5C06;&#x4EE3;&#x7801;&#x6539;&#x5199;&#x6210;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x3002;

function* G() {
  try {
    yield 1;
    throw 2; // &#x66FF;&#x6362;&#x539F;&#x6765;&#x7684; yield &#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x76F8;&#x5F53;&#x5728;&#x540E;&#x9762;&#x6DFB;&#x52A0;&#x3002;
  } catch(e) {
    console.log(&apos;Error:&apos;, e);
  }
  yield 3;
}</code></pre><h3>4.2 return</h3><p>&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;<code>return</code>&#x548C;<code>throw</code>&#x7684;&#x60C5;&#x51B5;&#x76F8;&#x540C;&#xFF0C;&#x4E0E;<code>next</code>&#x5177;&#x6709;&#x76F8;&#x4F3C;&#x7684;&#x6027;&#x8D28;&#x3002;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x5176;&#x4F1A;&#x76F4;&#x63A5;&#x7EC8;&#x6B62;G&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x5E76;&#x8FD4;&#x56DE;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x3002;&#x901A;&#x4FD7;&#x7684;&#x8868;&#x8FBE;&#x662F;&#x5C06;<code>yield xxx</code>&#x8868;&#x8FBE;&#x5F0F;&#x66FF;&#x6362;&#x6210;<code>return &#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;</code>&#x3002;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x6B64;&#x65F6;&#x6B63;&#x597D;&#x5904;&#x4E8E;<code>try</code>&#x4EE3;&#x7801;&#x5757;&#x4E2D;&#xFF0C;&#x4E14;&#x5176;&#x5E26;&#x6709;<code>finally</code>&#x6A21;&#x5757;&#xFF0C;&#x90A3;&#x4E48;<code>return</code>&#x65B9;&#x6CD5;&#x4F1A;&#x63A8;&#x8FDF;&#x5230;<code>finally</code>&#x4EE3;&#x7801;&#x5757;&#x6267;&#x884C;&#x5B8C;&#x540E;&#x518D;&#x6267;&#x884C;&#x3002;</p><pre><code class="js">let g = G();

console.log( g.next().value ); // 1
console.log( g.return(4).value ); // 2
console.log( g.next().value ); // 3
console.log( g.next().value ); // 4&#xFF0C;G&#x51FD;&#x6570;&#x7ED3;&#x675F;&#x3002;
console.log( g.next().value ); // undefined

function* G() {
  try {
    yield 1;
  } finally {
    yield 2;
    yield 3;
  }
  yield 5;
}

// &#x4F7F;&#x7528;&#x4E86; return(4) &#x7B49;&#x4EF7;&#x4E8E;&#x4F7F;&#x7528; next() &#x5E76;&#x5C06;&#x4EE3;&#x7801;&#x6539;&#x5199;&#x6210;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x3002;

function* GG() {
  try {
    yield 1;
    return 4; // &#x66FF;&#x6362;&#x539F;&#x6765;&#x7684; yield &#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x76F8;&#x5F53;&#x5728;&#x540E;&#x9762;&#x6DFB;&#x52A0;&#x3002;
  } finally {
    yield 2;
    yield 3;
  }
  
  yield 5;
}</code></pre><h2>&#x5EF6;&#x4F38;</h2><p><a href="https://segmentfault.com/a/1190000015244917">ES6&#x7CBE;&#x534E;&#xFF1A;Symbol</a><br><a href="https://segmentfault.com/a/1190000015423360">ES6&#x7CBE;&#x534E;&#xFF1A;Promise</a><br><a href="https://segmentfault.com/a/1190000015701263">Iterator&#xFF1A;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x96C6;&#x5408;&#x7684;&#x7EDF;&#x4E00;&#x63A5;&#x53E3;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Generator：JS执行权的真实操作者

## 原文链接
[https://segmentfault.com/a/1190000016047312](https://segmentfault.com/a/1190000016047312)


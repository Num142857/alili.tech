---
title: 前端进阶（5） - js 扩展：静态类型检查（facebook flow）
reprint: true
categories: reprint
slug: 59e47a86
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h1>js &#x6269;&#x5C55;&#xFF1A;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#xFF08;facebook flow&#xFF09;</h1><p>js &#x8BED;&#x8A00;&#x4E0E; java&#x3001;C &#x7CFB;&#x5217;&#x7B49;&#x8BED;&#x8A00;&#x6709;&#x4E00;&#x70B9;&#x5F88;&#x5927;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x5C31;&#x662F; js &#x8BED;&#x8A00;&#x662F;&#x5F31;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#x3002;js &#x8BED;&#x8A00;&#x7684;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x53EF;&#x80FD;&#x8BA9;&#x5927;&#x5BB6;&#x89C9;&#x5F97; js &#x5F88;&#x81EA;&#x7531;&#xFF0C;&#x6CA1;&#x6709;&#x5F3A;&#x5236;&#x6027;&#x7684;&#x7EA6;&#x675F;&#xFF0C;&#x4F46;&#x662F;&#x5F53;&#x9047;&#x5230;&#x5927;&#x578B;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;js &#x7684;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x5C31;&#x4F1A;&#x53D8;&#x5F97;&#x6BD4;&#x8F83;&#x9EBB;&#x70E6;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x56E2;&#x961F;&#x7684;&#x4EE3;&#x7801;&#x5F88;&#x4E0D;&#x53EF;&#x63A7;&#x3002;&#x8FD9;&#x4E2A;&#x539F;&#x56E0;&#x4E5F;&#x662F;&#x4FC3;&#x4F7F; <a href="https://github.com/Microsoft/TypeScript" rel="nofollow noreferrer">TypeScript</a> &#x8BDE;&#x751F;&#x7684;&#x4E00;&#x4E2A;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x539F;&#x56E0;&#x3002;</p><p>&#x4F46;&#x5176;&#x5B9E;&#x5F88;&#x591A;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x559C;&#x6B22;&#x7528; js &#x6765;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#xFF0C;&#x6240;&#x4EE5; <a href="https://github.com/facebook" rel="nofollow noreferrer">facebook</a> &#x5F00;&#x53D1;&#x51FA; <a href="https://github.com/facebook/flow" rel="nofollow noreferrer">flow</a> &#x6765;&#x5E2E;&#x52A9; js &#x8BED;&#x8A00;&#x6269;&#x5C55;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x529F;&#x80FD;&#xFF0C;&#x89C4;&#x907F;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h2>1. &#x4EE3;&#x7801;&#x793A;&#x4F8B;</h2><p><a href="https://github.com/facebook/flow" rel="nofollow noreferrer">flow</a> &#x89C4;&#x5B9A;&#xFF0C;&#x5728;&#x9700;&#x8981;&#x505A; &apos;flow &#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&apos; &#x6587;&#x4EF6;&#x7684;&#x5F00;&#x5934;&#x52A0;&#x4E0A; <code>// @flow</code> &#x8FD9;&#x6BB5;&#x6CE8;&#x91CA;&#xFF0C;&#x8BA9;&#x5DE5;&#x5177;&#x8BC6;&#x522B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x505A;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x4F1A;&#x5F53;&#x4F5C;&#x4E00;&#x822C; js &#x6587;&#x4EF6;&#x5BF9;&#x5F85;&#xFF0C;&#x4E0D;&#x505A;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x3002;</p><p>flow &#x9759;&#x6001;&#x7C7B;&#x578B;&#x51E0;&#x4E4E;&#x53EF;&#x4EE5;&#x5E94;&#x7528;&#x5230;&#x6240;&#x6709;&#x7684; js &#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x62EC; es6 &#x6269;&#x5C55;&#x7684; class, module &#x7B49;&#xFF0C;&#x4E5F;&#x5305;&#x62EC; jsx &#x8BED;&#x6CD5;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x7684;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x4E3E;&#x4F8B;&#xFF0C;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x53EF;&#x4EE5;&#x67E5;&#x770B; <a href="https://flow.org/en/docs/types/" rel="nofollow noreferrer">Type Annotations | Flow</a>.</p><h3>1.1 &#x57FA;&#x672C;&#x7C7B;&#x578B;</h3><p>&#x4E0E; js &#x7684;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7C7B;&#x4F3C;&#xFF0C;&#x5305;&#x62EC;:</p><ul><li><code>boolean</code>: &#x5BF9;&#x5E94; js &#x7684; Boolean &#x7C7B;&#x578B;</li><li><code>number</code>: &#x5BF9;&#x5E94; js &#x7684; Number &#x7C7B;&#x578B;</li><li><code>string</code>: &#x5BF9;&#x5E94; js &#x7684; String &#x7C7B;&#x578B;</li><li><code>null</code>: &#x5BF9;&#x5E94; js &#x7684; null</li><li><code>void</code>: &#x5BF9;&#x5E94; js &#x7684; undefined</li></ul><p>&#x6B63;&#x5E38;&#x7684; js &#x4EE3;&#x7801;</p><pre><code>let hello = &apos;hello&apos;; // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;

hello = 2 * 2; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;

hello = []; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;</code></pre><p>&#x52A0;&#x4E0A; flow &#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x6269;&#x5C55;&#x7684;&#x4EE3;&#x7801;</p><pre><code>// @flow

let hello: string = &apos;hello&apos;; // &#x58F0;&#x660E;&#x4E00;&#x4E2A; string &#x7C7B;&#x578B;&#x7684;&#x53D8;&#x91CF;

hello = 2 * 2; // &#x62A5;&#x9519;

hello = []; // &#x62A5;&#x9519;

hello = &apos;hi&apos;; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;</code></pre><h3>1.2 &#x51FD;&#x6570;</h3><p>&#x6B63;&#x5E38;&#x7684; js &#x4EE3;&#x7801;</p><pre><code>function plus(a, b) {
  return a + b;
}

plus(); // NaN
plus(1); // NaN
plus(1, 2); // 3
plus(&apos;hello&apos;); // &apos;helloundefined&apos;
plus(&apos;hello&apos;, &apos; hi&apos;); // &apos;hello hi&apos;
plus({}, {}); // &apos;[object Object][object Object]&apos;</code></pre><p>&#x52A0;&#x4E0A; flow &#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x6269;&#x5C55;&#x7684;&#x4EE3;&#x7801;</p><pre><code>// @flow

// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; &apos;&#x4E24;&#x4E2A;&#x6570;&#x5B57;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4E5F;&#x662F;&#x6570;&#x5B57;&apos; &#x7684;&#x51FD;&#x6570;
function plus(a: number, b: number): number {
  return a + b;
}

plus(); // &#x62A5;&#x9519;
plus(1); // &#x62A5;&#x9519;
plus(&apos;hello&apos;); // &#x62A5;&#x9519;
plus(&apos;hello&apos;, &apos; hi&apos;); // &#x62A5;&#x9519;
plus({}, {}); // &#x62A5;&#x9519;

plus(1, 2); // 3</code></pre><h3>1.3 &#x53EF;&#x80FD;&#xFF08;Maybe&#xFF09;&#xFF0C;&#x53EF;&#x9009;&#xFF08;Optional&#xFF09;&#xFF0C;&#x8BED;&#x4E49;&#xFF08;Literal&#xFF09;&#xFF0C;&#x6DF7;&#x5408;&#xFF08;Mixed&#xFF09;</h3><p>&#x53EF;&#x80FD;&#xFF08;Maybe&#xFF09;&#x7C7B;&#x578B;&#x7528;&#x4E00;&#x4E2A; <code>?</code> &#x5728;&#x7C7B;&#x578B;&#x524D;&#x9762;&#x8868;&#x793A;&#xFF0C;&#x5305;&#x542B;&#x7C7B;&#x578B;&#x672C;&#x8EAB;&#x3001;<code>null</code>&#x3001;<code>undefined</code></p><pre><code>// @flow

let hello: ?string; // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x53EF;&#x4EE5;&#x662F; string, null, undefined &#x7684;&#x53D8;&#x91CF;

hello = null; // &#x8D4B;&#x503C;
hello = undefined; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
hello = &apos;hello&apos;; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
hello = 1; // &#x62A5;&#x9519;
hello = true; // &#x62A5;&#x9519;</code></pre><p>&#x53EF;&#x9009;&#xFF08;Optional&#xFF09;&#x7C7B;&#x578B;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x51FD;&#x6570;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x540D;&#x79F0;&#x540E;&#x9762;&#x52A0;&#x4E00;&#x4E2A; <code>?</code>&#xFF0C;&#x5305;&#x542B;&#x7C7B;&#x578B;&#x672C;&#x8EAB;&#x3001;<code>undefined</code></p><pre><code>// @flow

const obj: {hello? : string}; // &#x5C5E;&#x6027; hello &#x53EF;&#x4EE5;&#x662F; string, undefined

obj = {}; // &#x8D4B;&#x503C;
obj = {hello: undefined}; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
obj = {hello: &apos;hello&apos;}; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
obj = {hello: null}; // &#x62A5;&#x9519;
obj = {hello: 1}; // &#x62A5;&#x9519;
obj = {hello: true}; // &#x62A5;&#x9519;

// &#x5C5E;&#x6027; param &#x53EF;&#x4EE5;&#x662F; number, undefined
function method(param?: number) { /* ... */ }

method(); // &#x6B63;&#x5E38;
method(undefined); // &#x6B63;&#x5E38;
method(1.12); // &#x6B63;&#x5E38;
method(null); // &#x62A5;&#x9519;
method(&apos;hello&apos;); // &#x62A5;&#x9519;</code></pre><p>&#x8BED;&#x4E49;&#xFF08;Literal&#xFF09;&#x7C7B;&#x578B;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x58F0;&#x660E;&#x67D0;&#x4E2A;&#xFF0C;&#x67D0;&#x51E0;&#x4E2A;&#x7279;&#x5B9A;&#x7684;&#x503C;&#xFF08;&#x591A;&#x4E2A;&#x503C;&#x7528; <code>|</code> &#x5206;&#x9694;&#xFF09;</p><pre><code>// @flow

let hello: &apos;hello&apos;; // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53EA;&#x80FD;&#x8D4B;&#x503C; &apos;hello&apos; &#x7684;&#x53D8;&#x91CF;

hello = &apos;hello&apos;; // &#x8D4B;&#x503C;
hello = &apos;hi&apos;; // &#x62A5;&#x9519;
hello = 12; // &#x62A5;&#x9519;
hello = undefined; // &#x62A5;&#x9519;
hello = null; // &#x62A5;&#x9519;

function method(param: 1 | &apos;hi&apos; | boolean): void { /* ... */ }

method(); // &#x62A5;&#x9519;&#xFF0C;&#x7F3A;&#x5C11;&#x53C2;&#x6570;
method(1); // ok
method(1.2); // &#x62A5;&#x9519;&#xFF0C;&#x7C7B;&#x578B;&#x4E0D;&#x5BF9;
method(&apos;hi&apos;); // ok
method(&apos;hello&apos;); // &#x62A5;&#x9519;&#xFF0C;&#x7C7B;&#x578B;&#x4E0D;&#x5BF9;
method(true); // ok
method(false); // ok</code></pre><p>&#x6DF7;&#x5408;&#xFF08;Mixed&#xFF09;&#x7C7B;&#x578B;&#x662F;&#x6307;&#x4EFB;&#x610F;&#x6570;&#x636E;&#x7C7B;&#x578B;</p><pre><code>// @flow

let hello: mixed; // &#x58F0;&#x660E;&#x4E00;&#x4E2A; mixed &#x7C7B;&#x578B;&#x7684;&#x53D8;&#x91CF;

hello = &apos;hello&apos;; // &#x8D4B;&#x503C;
hello = &apos;hi&apos;; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
hello = 12; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
hello = undefined; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;
hello = null; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;</code></pre><h3>1.4 &#x590D;&#x5408;&#x7C7B;&#x578B;</h3><p>&#x6570;&#x7EC4;</p><pre><code>// @flow

let arr1: Array&lt;boolean&gt; = [true, false, true]; // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F; boolean &#x7684;&#x6570;&#x7EC4;
arr1 = [true, 1]; // &#x62A5;&#x9519;&#xFF0C;1 &#x4E0D;&#x662F; boolean &#x503C;
arr1 = [&apos;&apos;]; // &#x62A5;&#x9519;&#xFF0C;&apos;&apos; &#x4E0D;&#x662F; boolean &#x503C;

let arr2: Array&lt;string&gt; = [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;]; // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F; string &#x7684;&#x6570;&#x7EC4;

let arr3: Array&lt;mixed&gt; = [1, true, &quot;three&quot;] // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x7EC4;
arr1 = [true, 1]; // &#x91CD;&#x65B0;&#x8D4B;&#x503C; 
arr1 = [&apos;&apos;]; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;</code></pre><p>map</p><pre><code>// @flow

// &#x58F0;&#x660E;&#x4E00;&#x4E2A; map &#x7C7B;&#x578B;&#xFF0C;&#x5176;&#x6709;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; foo&#xFF0C;&#x7C7B;&#x578B; boolean &#x7684;&#x5B50;&#x5143;&#x7D20;
let obj1: { foo: boolean } = { foo: true };
obj1 = {}; // &#x62A5;&#x9519;&#xFF0C;&#x7F3A;&#x5C11; foo &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x503C;
obj1 = {foo: 1}; // &#x62A5;&#x9519;&#xFF0C;&#x5C5E;&#x6027;&#x503C; foo &#x7684;&#x7C7B;&#x578B;&#x5FC5;&#x987B;&#x662F; boolean
obj1 = {foo: false, bar: &apos;hello&apos;}; // &#x91CD;&#x65B0;&#x8D4B;&#x503C;

// &#x58F0;&#x660E;&#x4E00;&#x4E2A; map &#x7C7B;&#x578B;&#xFF0C;&#x5176;&#x6709;&#x540D;&#x4E3A; foo, bar, baz&#xFF0C;&#x7C7B;&#x578B; number, boolean, string &#x7684;&#x5B50;&#x5143;&#x7D20;
let obj2: {
  foo: number,
  bar: boolean,
  baz: string,
} = {
  foo: 1,
  bar: true,
  baz: &apos;three&apos;,
};</code></pre><p>&#x66F4;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x53EF;&#x4EE5;&#x67E5;&#x770B; <a href="https://flow.org/en/docs/types/" rel="nofollow noreferrer">Type Annotations | Flow</a>.</p><h2>2. &#x4F7F;&#x7528;&#x5DE5;&#x5177;</h2><p>&#x5B89;&#x88C5;</p><pre><code># &#x5168;&#x5C40;&#x5B89;&#x88C5;
npm i -g flow-bin

# &#x672C;&#x5730;&#x5B89;&#x88C5;
npm i -D flow-bin</code></pre><p>&#x4F7F;&#x7528;</p><pre><code>flow init                       # &#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;

flow check path/to/dir          # &#x68C0;&#x67E5;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x6240;&#x6709;&#x7684;&#x6587;&#x4EF6;
flow check path/to/js/file      # &#x68C0;&#x67E5;&#x6307;&#x5B9A;&#x6587;&#x4EF6;</code></pre><h2>3. &#x914D;&#x5408; <a href="https://github.com/babel/babel" rel="nofollow noreferrer">babel</a> &#x4E00;&#x8D77;&#x4F7F;&#x7528;</h2><p>&#x56E0;&#x4E3A; flow &#x9759;&#x6001;&#x7C7B;&#x578B;&#x53EA;&#x662F;&#x5BF9; js &#x7684;&#x6269;&#x5C55;&#xFF0C;&#x5E76;&#x4E0D;&#x662F; js &#x539F;&#x751F;&#x652F;&#x6301;&#x7684;&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x4E00;&#x822C; <a href="https://github.com/facebook/flow" rel="nofollow noreferrer">flow</a> &#x90FD;&#x662F;&#x914D;&#x5408; <a href="https://github.com/babel/babel" rel="nofollow noreferrer">babel</a> &#x4E00;&#x8D77;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#xFF0C;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#x3002;</p><h3>3.1 babel-preset-flow</h3><p>&#x5B89;&#x88C5; <code>babel-preset-flow</code>&#xFF0C;&#x8FD9;&#x6837; babel &#x5728;&#x8F6C;&#x7801; js &#x6587;&#x4EF6;&#x65F6;&#x5C31;&#x80FD;&#x8BC6;&#x522B; flow &#x7684;&#x8BED;&#x6CD5;&#x3002;</p><pre><code>npm i -D babel-preset-flow</code></pre><p>.babelrc</p><pre><code>{
  &quot;presets&quot;: [&quot;flow&quot;]
}</code></pre><p>&#x6E90;&#x6587;&#x4EF6;&#xFF08;flow&#xFF09;</p><pre><code>// @flow

// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; &apos;&#x4E24;&#x4E2A;&#x6570;&#x5B57;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4E5F;&#x662F;&#x6570;&#x5B57;&apos; &#x7684;&#x51FD;&#x6570;
function plus(a: number, b: number): number {
  return a + b;
}

plus(); // &#x62A5;&#x9519;
plus(1); // &#x62A5;&#x9519;
plus(&apos;hello&apos;); // &#x62A5;&#x9519;
plus(&apos;hello&apos;, &apos; hi&apos;); // &#x62A5;&#x9519;
plus({}, {}); // &#x62A5;&#x9519;

plus(1, 2); // 3</code></pre><p>&#x8F6C;&#x7801;&#x540E;&#x7684;&#x6587;&#x4EF6;</p><pre><code>// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; &apos;&#x4E24;&#x4E2A;&#x6570;&#x5B57;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4E5F;&#x662F;&#x6570;&#x5B57;&apos; &#x7684;&#x51FD;&#x6570;
function plus(a, b) {
  return a + b;
}

plus(); // &#x62A5;&#x9519;
plus(1); // &#x62A5;&#x9519;
plus(&apos;hello&apos;); // &#x62A5;&#x9519;
plus(&apos;hello&apos;, &apos; hi&apos;); // &#x62A5;&#x9519;
plus({}, {}); // &#x62A5;&#x9519;

plus(1, 2); // 3</code></pre><h3>3.2 babel-plugin-flow-runtime</h3><p>&#x4E00;&#x822C;&#x4F1A;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528; <code>babel-plugin-flow-runtime</code> &#x63D2;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B9E;&#x65F6;&#x68C0;&#x67E5;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x5C31;&#x50CF;&#x539F;&#x751F;&#x7684;&#x8FD0;&#x884C; flow &#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x4E00;&#x6837;&#x3002;&#xFF08;&#x4E00;&#x822C;&#x5728;&#x4EA7;&#x54C1;&#x73AF;&#x5883;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x56E0;&#x4E3A;&#x4F1A;&#x989D;&#x5916;&#x6D88;&#x8017; js &#x7684;&#x6027;&#x80FD;&#xFF09;</p><pre><code>npm i -D babel-plugin-flow-runtime flow-runtime</code></pre><p>.babelrc</p><pre><code>{
  &quot;presets&quot;: [&quot;flow&quot;],
  &quot;plugins&quot;: [&quot;flow-runtime&quot;]
}
</code></pre><p>&#x6E90;&#x6587;&#x4EF6;&#xFF08;flow&#xFF09;</p><pre><code>// @flow

// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; &apos;&#x4E24;&#x4E2A;&#x6570;&#x5B57;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4E5F;&#x662F;&#x6570;&#x5B57;&apos; &#x7684;&#x51FD;&#x6570;
function plus(a: number, b: number): number {
  return a + b;
}

plus(); // &#x62A5;&#x9519;
plus(1); // &#x62A5;&#x9519;
plus(&apos;hello&apos;); // &#x62A5;&#x9519;
plus(&apos;hello&apos;, &apos; hi&apos;); // &#x62A5;&#x9519;
plus({}, {}); // &#x62A5;&#x9519;

plus(1, 2); // 3</code></pre><p>&#x8F6C;&#x7801;&#x540E;&#x7684;&#x6587;&#x4EF6;</p><pre><code>import t from &apos;flow-runtime&apos;;


// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; &apos;&#x4E24;&#x4E2A;&#x6570;&#x5B57;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4E5F;&#x662F;&#x6570;&#x5B57;&apos; &#x7684;&#x51FD;&#x6570;
function plus(a, b) {
  return a + b;
}

t.annotate(plus, t.function(t.param(&apos;a&apos;, t.number()), t.param(&apos;b&apos;, t.number()), t.return(t.number())));
plus(); // &#x62A5;&#x9519;
plus(1); // &#x62A5;&#x9519;
plus(&apos;hello&apos;); // &#x62A5;&#x9519;
plus(&apos;hello&apos;, &apos; hi&apos;); // &#x62A5;&#x9519;
plus({}, {}); // &#x62A5;&#x9519;

plus(1, 2); // 3</code></pre><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;js &#x6587;&#x4EF6;&#x5C31;&#x4F1A;&#x5BFC;&#x5165; <code>flow-runtime</code> &#x6A21;&#x5757;&#xFF0C;&#x5BF9; <code>plus</code> &#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570; <code>a, b</code> &#x548C;&#x8FD4;&#x56DE;&#x503C;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x7B26;&#x5408;&#x6570;&#x636E;&#x5B9A;&#x4E49;&#xFF0C;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><h2>4. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶（5） - js 扩展：静态类型检查（facebook flow）

## 原文链接
[https://segmentfault.com/a/1190000016127186](https://segmentfault.com/a/1190000016127186)


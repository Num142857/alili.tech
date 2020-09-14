---
title: React源码阅读之：复合类型方案设计
hidden: true
categories: [reprint]
slug: 993b8d89
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h1>&#x5173;&#x4E8E;React&#x4E2D;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x8BBE;&#x8BA1;</h1><p>&#x6700;&#x8FD1;&#x5728;&#x770B;React&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x6CE8;&#x610F;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x6709;&#x610F;&#x601D;&#x7684;&#x7EC6;&#x8282;&#xFF0C;&#x6BD4;&#x5982;&#x7ECF;&#x5E38;&#x4F1A;&#x51FA;&#x73B0;&#x7684;&#x4E00;&#x4E0B;&#x6BD4;&#x8F83;&#x548C;&#x8D4B;&#x503C;&#x4EE3;&#x7801;</p><pre><code class="js">workInProgress.effectTag |= Ref
(workInProgress.effectTag &amp; DidCapture) !== NoEffect</code></pre><p>&#x5BF9;&#x4E8E;&#x5E73;&#x65F6;&#x57FA;&#x672C;&#x4E0A;&#x6CA1;&#x600E;&#x4E48;&#x7528;&#x5230;&#x8FC7;&#x79FB;&#x4F4D;&#x8FD0;&#x7B97;&#x7684;&#x6211;&#x4E00;&#x5F00;&#x59CB;&#x8868;&#x793A;&#x8FD9;&#x662F;&#x5565;&#xFF1F;&#x4E3A;&#x5565;&#x8981;&#x8FD9;&#x4E48;&#x8BBE;&#x8BA1;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E2A;<code>effectTag</code>&#x5177;&#x4F53;&#x4F1A;&#x6709;&#x90A3;&#x4E9B;&#x503C;</p><pre><code class="js">// Don&apos;t change these two values. They&apos;re used by React Dev Tools.
export const NoEffect = /*              */ 0b00000000000;
export const PerformedWork = /*         */ 0b00000000001;

// You can change the rest (and add more).
export const Placement = /*             */ 0b00000000010;
export const Update = /*                */ 0b00000000100;
export const PlacementAndUpdate = /*    */ 0b00000000110;
export const Deletion = /*              */ 0b00000001000;
export const ContentReset = /*          */ 0b00000010000;
export const Callback = /*              */ 0b00000100000;
export const DidCapture = /*            */ 0b00001000000;
export const Ref = /*                   */ 0b00010000000;
export const Snapshot = /*              */ 0b00100000000;

// Union of all host effects
export const HostEffectMask = /*        */ 0b00111111111;

export const Incomplete = /*            */ 0b01000000000;
export const ShouldCapture = /*         */ 0b10000000000;</code></pre><p>&#x8FD9;&#x4E48;&#x4E00;&#x770B;&#x8C8C;&#x4F3C;&#x597D;&#x50CF;&#x6709;&#x70B9;&#x610F;&#x601D;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5927;&#x90E8;&#x5206;&#x7684;&#x503C;&#x90FD;&#x53EA;&#x6709;&#x4E00;&#x4F4D;&#x662F;<code>1</code>&#xFF0C;&#x5176;&#x4ED6;&#x4F4D;&#x90FD;&#x662F;<code>0</code>&#xFF0C;<code>0bxxx</code>&#x662F;&#x539F;&#x751F;&#x4E8C;&#x8FDB;&#x5236;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x8868;&#x793A;&#x65B9;&#x6CD5;</p><p>&#x90A3;&#x4E48;&#x56DE;&#x8FC7;&#x5934;&#x53BB;&#x6211;&#x4EEC;&#x518D;&#x770B;&#x4E0A;&#x9762;&#x4E24;&#x53E5;&#x8868;&#x8FBE;&#x5F0F;</p><pre><code class="js">workInProgress.effectTag |= Ref
// &#x4E5F;&#x5C31;&#x662F;
workInProgress.effectTag = workInProgress.effectTag | RefRef</code></pre><p>&#x6211;&#x4EEC;&#x968F;&#x4FBF;&#x62FF;&#x4E24;&#x4E2A;&#x503C;&#x6765;&#x4E3E;&#x4F8B;&#xFF0C;&#x6BD4;&#x5982;<code>Placement</code>&#x548C;<code>Update</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>0b00000000010 | 0b00000000100</code>&#x90A3;&#x4E48;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;<code>0b00000000110</code>&#xFF0C;&#x4E5F;&#x5C31;&#x7B49;&#x4E8E;<code>PlacementAndUpdate</code>&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x65F6;&#x5019;&#x5927;&#x5BB6;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x5927;&#x90E8;&#x5206;&#x7684;&#x503C;<code>1</code>&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#x4E0D;&#x4E00;&#x6837;&#x4E86;&#x5427;&#xFF0C;&#x56E0;&#x4E3A;&#x5176;&#x5B9E;&#x6BCF;&#x4E00;&#x4F4D;&#x7684;<code>1</code>&#x4EE3;&#x8868;&#x4E00;&#x79CD;&#x5C5E;&#x6027;&#xFF0C;&#x628A;&#x4ED6;&#x4EEC;&#x7ED3;&#x5408;&#x5728;&#x4E00;&#x8D77;&#x5C31;&#x4EE3;&#x8868;&#x6709;&#x591A;&#x79CD;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x4F1A;&#x6709;&#x91CD;&#x590D;&#x3002;</p><p>&#x540C;&#x6837;&#x7684;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E8C;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;</p><pre><code class="js">(workInProgress.effectTag &amp; DidCapture) !== NoEffect</code></pre><p>&#x6211;&#x4EEC;&#x62FF;<code>Update</code>&#x548C;<code>DidCapture</code>&#x6765;&#x8FDB;&#x884C;<code>&amp;</code>&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x4E48;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x5F88;&#x660E;&#x663E;&#x4E86;&#xFF0C;&#x6240;&#x6709;&#x4F4D;&#x90FD;&#x662F;<code>0</code>&#xFF0C;&#x6240;&#x4EE5;&#x540E;&#x671F;&#x7684;<code>&amp;</code>&#x64CD;&#x4F5C;&#x662F;&#x7528;&#x6765;&#x5224;&#x65AD;&#x5728;&#x67D0;&#x4E2A;&#x53D8;&#x91CF;&#x4E2D;&#x662F;&#x5426;&#x542B;&#x6709;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x3002;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x5C31;&#x662F;<strong>&#x5224;&#x65AD;<code>workInProgress.effectTag</code>&#x4E2D;&#x662F;&#x5426;&#x542B;&#x6709;<code>DidCapture</code></strong>&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x8BBE;&#x8BA1;&#x65B9;&#x5F0F;&#x6211;&#x89C9;&#x5F97;&#x633A;&#x6709;&#x53C2;&#x8003;&#x610F;&#x4E49;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x7C7B;&#x4F3C;&#x6743;&#x9650;&#x7CFB;&#x7EDF;&#x4E0A;&#x3002;&#x5927;&#x6982;&#x73B0;&#x5728;&#x5F88;&#x591A;&#x6743;&#x9650;&#x7CFB;&#x7EDF;&#x5DF2;&#x7ECF;&#x8FD9;&#x4E48;&#x505A;&#x4E86;&#x5427;&#xFF0C;&#x53EA;&#x662F;&#x6211;&#x4E0D;&#x77E5;&#x9053;&#x3002;&#x3002;&#x3002;</p><p>React&#x6E90;&#x7801;&#x6B63;&#x5728;&#x9605;&#x8BFB;&#x4E2D;&#xFF0C;&#x6709;&#x671B;&#x4E00;&#x4E24;&#x4E2A;&#x6708;&#x628A;&#x6240;&#x6709;&#x6210;&#x679C;&#x653E;&#x51FA;&#x6765;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x6211;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码阅读之：复合类型方案设计

## 原文链接
[https://segmentfault.com/a/1190000016284033](https://segmentfault.com/a/1190000016284033)


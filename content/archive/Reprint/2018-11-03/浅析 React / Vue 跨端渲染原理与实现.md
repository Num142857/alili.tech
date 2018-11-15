---
title: 浅析 React / Vue 跨端渲染原理与实现
reprint: true
categories: reprint
abbrlink: c0175c06
date: 2018-11-03 02:30:13
---

{{% raw %}}
<p>&#x5F53;&#x4E0B;&#x7684;&#x524D;&#x7AEF;&#x540C;&#x5B66;&#x5BF9; React &#x4E0E; Vue &#x7684;&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;&#x60F3;&#x5FC5;&#x4E0D;&#x4F1A;&#x964C;&#x751F;&#xFF0C;RN &#x4E0E; Weex &#x7684;&#x8DE8;&#x754C;&#x4E5F;&#x5E38;&#x4E3A;&#x6211;&#x4EEC;&#x6240;&#x6D25;&#x6D25;&#x4E50;&#x9053;&#x3002;UI &#x6846;&#x67B6;&#x5728;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x8DE8;&#x7AEF;&#x6E32;&#x67D3;&#x65F6;&#x9700;&#x8981;&#x505A;&#x54EA;&#x4E9B;&#x5DE5;&#x4F5C;&#xFF0C;&#x5176;&#x6280;&#x672F;&#x65B9;&#x6848;&#x80FD;&#x5426;&#x501F;&#x9274;&#x4E43;&#x81F3;&#x5E94;&#x7528;&#x5230;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x5462;&#xFF1F;&#x8FD9;&#x5C31;&#x662F;&#x672C;&#x6587;&#x6240;&#x5E0C;&#x671B;&#x5206;&#x4EAB;&#x7684;&#x4E3B;&#x9898;&#x3002;</p><h2 id="articleHeader0">&#x6982;&#x5FF5;&#x7B80;&#x4ECB;</h2><p>&#x4EC0;&#x4E48;&#x662F;&#x8DE8;&#x7AEF;&#x6E32;&#x67D3;&#x5462;&#xFF1F;&#x8FD9;&#x91CC;&#x7684;&#x300C;&#x7AEF;&#x300D;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x5C40;&#x9650;&#x5728;&#x4F20;&#x7EDF;&#x7684; PC &#x7AEF;&#x548C;&#x79FB;&#x52A8;&#x7AEF;&#xFF0C;&#x800C;&#x662F;&#x62BD;&#x8C61;&#x7684; <strong>&#x6E32;&#x67D3;&#x5C42; (Renderer)</strong> &#x3002;&#x6E32;&#x67D3;&#x5C42;&#x5E76;&#x4E0D;&#x5C40;&#x9650;&#x5728;&#x6D4F;&#x89C8;&#x5668; DOM &#x548C;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x539F;&#x751F; UI &#x63A7;&#x4EF6;&#xFF0C;&#x8FDE;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x4E43;&#x81F3;&#x865A;&#x62DF;&#x73B0;&#x5B9E;&#x7B49;&#x73AF;&#x5883;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x662F;&#x4F60;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#x3002;&#x8FD9;&#x5E76;&#x4E0D;&#x53EA;&#x662F;&#x4E2A;&#x7F8E;&#x597D;&#x7684;&#x613F;&#x666F;&#xFF0C;&#x5728; 8102 &#x5E74;&#x7684;&#x4ECA;&#x5929;&#xFF0C;&#x9664;&#x4E86; React &#x793E;&#x533A;&#x5230; <code>.docx</code> / <code>.pdf</code> &#x7684;&#x6E32;&#x67D3;&#x5C42;&#x4EE5;&#x5916;&#xFF0C;Facebook &#x751A;&#x81F3;&#x8FD8;&#x57FA;&#x4E8E; Three.js &#x5B9E;&#x73B0;&#x4E86;&#x5230; VR &#x7684;&#x6E32;&#x67D3;&#x5C42;&#xFF0C;&#x5373; ReactVR&#x3002;&#x73B0;&#x5728;&#x56DE;&#x987E; React &#x7684; <strong>Learn Once, Write Anywhere</strong> &#x53E3;&#x53F7;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5F3A;&#x8C03;&#x7684;&#x5C31;&#x662F;&#x5B83;&#x5BF9;&#x5404;&#x79CD;&#x4E0D;&#x540C;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x652F;&#x6301;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZss?w=550&amp;h=413" src="https://static.alili.tech/img/bVbhZss?w=550&amp;h=413" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x6E32;&#x67D3;&#x5C42;&#x7684; API &#x5462;&#xFF1F;&#x8DE8;&#x7AEF;&#x5F00;&#x53D1;&#x7684;&#x4E00;&#x4E2A;&#x75DB;&#x70B9;&#xFF0C;&#x5C31;&#x5728;&#x4E8E;&#x5404;&#x79CD;&#x4E0D;&#x540C;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x5B66;&#x4E60;&#x3001;&#x4F7F;&#x7528;&#x4E0E;&#x7EF4;&#x62A4;&#x6210;&#x672C;&#x3002;&#x800C;&#x4E0D;&#x7BA1;&#x662F; React &#x7684; JSX &#x8FD8;&#x662F; Vue &#x7684; <code>.vue</code> &#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF0C;&#x90FD;&#x80FD;&#x6709;&#x6548;&#x5730;&#x89E3;&#x8026; UI &#x7EC4;&#x4EF6;&#xFF0C;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x4E0E;&#x4EE3;&#x7801;&#x7EF4;&#x62A4;&#x6027;&#x3002;&#x4ECE;&#x800C;&#x5F88;&#x81EA;&#x7136;&#x5730;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4F1A;&#x5E0C;&#x671B;&#x4F7F;&#x7528;&#x8FD9;&#x6837;&#x7684;&#x7EC4;&#x4EF6;&#x5316;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x5BF9;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x63A7;&#x5236;&#x4E86;&#x3002;</p><p>&#x5728;&#x5F00;&#x59CB;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x4E3A; React / Vue &#x9002;&#x914D;&#x4E0D;&#x540C;&#x6E32;&#x67D3;&#x5C42;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x56DE;&#x987E;&#x4E00;&#x4E0B;&#x5B83;&#x4EEC;&#x5728;&#x8001;&#x672C;&#x884C; DOM &#x4E2D;&#x6267;&#x884C;&#x65F6;&#x7684;&#x57FA;&#x672C;&#x5C42;&#x6B21;&#x7ED3;&#x6784;&#x3002;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528; React &#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x9700;&#x8981;&#x5206;&#x522B;&#x5BFC;&#x5165; <code>react</code> &#x4E0E; <code>react-dom</code> &#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x7684; package&#xFF0C;&#x8FD9;&#x65F6;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x7684;&#x6574;&#x4F53;&#x7ED3;&#x6784;&#x53EF;&#x4EE5;&#x7528;&#x4E0B;&#x56FE;&#x7B80;&#x7565;&#x5730;&#x8868;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016641833?w=550&amp;h=413" src="https://static.alili.tech/img/remote/1460000016641833?w=550&amp;h=413" alt="" title="" style="cursor:pointer"></span></p><p>&#x5F88;&#x591A;&#x524D;&#x7AEF;&#x540C;&#x5B66;&#x719F;&#x6089;&#x7684; UI &#x5E93;&#x3001;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x3001;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x90FD;&#x4F4D;&#x4E8E;&#x56FE;&#x4E2D;&#x5C01;&#x88C5;&#x540E;&#x300C;&#x57FA;&#x4E8E; React &#x5B9E;&#x73B0;&#x300D;&#x7684;&#x6700;&#x9876;&#x5C42;&#xFF0C;&#x8FDE;&#x63A5; React &#x4E0E; DOM &#x7684; React DOM &#x4E00;&#x5C42;&#x5219;&#x663E;&#x5F97;&#x6709;&#x4E9B;&#x9ED8;&#x9ED8;&#x65E0;&#x95FB;&#x3002;&#x800C;&#x5728; Vue 2.x &#x4E2D;&#xFF0C;&#x8FD9;&#x79CD;&#x7ED3;&#x6784;&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#x3002;&#x4E0D;&#x8FC7; Vue &#x76EE;&#x524D;&#x5E76;&#x672A;&#x5B9E;&#x73B0; React &#x8FD9;&#x6837;&#x7684;&#x62C6;&#x5206;&#xFF0C;&#x5176;&#x7B80;&#x5316;&#x7684;&#x57FA;&#x672C;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016641834?w=550&amp;h=413" src="https://static.alili.tech/img/remote/1460000016641834?w=550&amp;h=413" alt="" title="" style="cursor:pointer"></span></p><p>&#x5982;&#x4F55;&#x5C06;&#x5B83;&#x4EEC;&#x8FD9;&#x4E2A;&#x4E3A; DOM &#x8BBE;&#x8BA1;&#x7684;&#x67B6;&#x6784;&#x8FC1;&#x79FB;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#x5462;&#xFF1F;&#x4E0B;&#x6587;&#x4E2D;&#x4F1A;&#x4F9D;&#x6B21;&#x4ECB;&#x7ECD;&#x8FD9;&#x4E9B;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#xFF1A;</p><ul><li>&#x57FA;&#x4E8E; React 16 Reconciler &#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;</li><li>&#x57FA;&#x4E8E; Vue EventBus &#x7684;&#x975E;&#x4FB5;&#x5165;&#x5F0F;&#x9002;&#x914D;&#x65B9;&#x5F0F;</li><li>&#x57FA;&#x4E8E; Vue Mixin &#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;</li><li>&#x57FA;&#x4E8E; Vue Platform &#x5B9A;&#x5236;&#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;</li></ul><h2 id="articleHeader1">React Reconciler &#x9002;&#x914D;</h2><p>&#x4E4B;&#x6240;&#x4EE5;&#x9996;&#x5148;&#x4ECB;&#x7ECD; React&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5B83;&#x5DF2;&#x7ECF;&#x63D0;&#x4F9B;&#x4E86;&#x6210;&#x578B;&#x7684;&#x63A5;&#x53E3;&#x4F9B;&#x9002;&#x914D;&#x4E4B;&#x7528;&#x3002;&#x5728; React 16 &#x6807;&#x5FD7;&#x6027;&#x7684; Fiber &#x67B6;&#x6784;&#x4E2D;&#xFF0C; <code>react-reconciler</code> &#x6A21;&#x5757;&#x5C06;&#x57FA;&#x4E8E; fiber &#x7684; reconciliation &#x5B9E;&#x73B0;&#x5C01;&#x88C5;&#x4E3A;&#x4E86;&#x5355;&#x72EC;&#x7684;&#x4E00;&#x5C42;&#x3002;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x4E0E;&#x6211;&#x4EEC;&#x5B9A;&#x5236;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x9700;&#x6C42;&#x6709;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#x5462;&#xFF1F;&#x5B83;&#x7684;&#x5A01;&#x529B;&#x5728;&#x4E8E;&#xFF0C; &#x53EA;&#x8981;&#x6211;&#x4EEC;&#x4E3A; Reconciler &#x63D0;&#x4F9B;&#x4E86;&#x5BBF;&#x4E3B;&#x6E32;&#x67D3;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x90A3;&#x4E48; React &#x5C31;&#x80FD;&#x65E0;&#x7F1D;&#x5730;&#x6E32;&#x67D3;&#x5230;&#x8FD9;&#x4E2A;&#x73AF;&#x5883; &#x3002;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016641835" src="https://static.alili.tech/img/remote/1460000016641835" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x56FE;&#x4E2D;&#x6211;&#x4EEC;&#x6240;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x6838;&#x5FC3;&#x6A21;&#x5757;&#x5373;&#x4E3A; <strong>Adapter</strong> &#xFF0C;&#x8FD9;&#x662F;&#x5C06; React &#x80FD;&#x529B;&#x6269;&#x5C55;&#x5230;&#x65B0;&#x6E32;&#x67D3;&#x73AF;&#x5883;&#x7684;&#x6865;&#x6881;&#x3002;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x9002;&#x914D;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x4EE5;&#x9002;&#x914D;&#x8457;&#x540D;&#x7684; WebGL &#x6E32;&#x67D3;&#x5E93; <a href="https://pixijs.io/" rel="nofollow noreferrer" target="_blank">PIXI.js</a> &#x4E3A;&#x4F8B;&#xFF0C;&#x7B80;&#x8981;&#x4ECB;&#x7ECD;&#x8FD9;&#x4E00;&#x673A;&#x5236;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x3002;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x6240;&#x5B9E;&#x73B0;&#x7684;&#x9002;&#x914D;&#x5C42;&#xFF0C;&#x5176;&#x6700;&#x7EC8;&#x7684;&#x4F7F;&#x7528;&#x5F62;&#x5F0F;&#x5E94;&#x5F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as PIXI from &apos;pixi.js&apos;
import React from &apos;react&apos;
import { ReactPixi } from &apos;our-react-pixi&apos;
import { App } from &apos;./app&apos;

// &#x76EE;&#x6807;&#x6E32;&#x67D3;&#x5BB9;&#x5668;
const container = new PIXI.Application()

// &#x4F7F;&#x7528;&#x6211;&#x4EEC;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#x66FF;&#x4EE3; react-dom
ReactPixi.render(&lt;App /&gt;, container) " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> PIXI <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;pixi.js&apos;</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> { ReactPixi } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;our-react-pixi&apos;</span>
<span class="hljs-keyword">import</span> { App } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app&apos;</span>

<span class="hljs-comment">// &#x76EE;&#x6807;&#x6E32;&#x67D3;&#x5BB9;&#x5668;</span>
<span class="hljs-keyword">const</span> container = <span class="hljs-keyword">new</span> PIXI.Application()

<span class="hljs-comment">// &#x4F7F;&#x7528;&#x6211;&#x4EEC;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#x66FF;&#x4EE3; react-dom</span>
ReactPixi.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, container) </span></code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x5C31;&#x662F; <code>ReactPixi</code> &#x6A21;&#x5757;&#x3002;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x662F; Renderer &#x7684;&#x4E00;&#x5C42;&#x8584;&#x5C01;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Renderer &#x9700;&#x8981;&#x4F9D;&#x8D56; react-reconciler
import { Renderer } from &apos;./renderer&apos;

let container

export const ReactPixi = {
  render (element, pixiApp) {
    if (!container) {
      container = Renderer.createContainer(pixiApp)
    }
    // &#x8C03;&#x7528; React Reconciler &#x66F4;&#x65B0;&#x5BB9;&#x5668;
    Renderer.updateContainer(element, container, null)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// Renderer &#x9700;&#x8981;&#x4F9D;&#x8D56; react-reconciler</span>
<span class="hljs-keyword">import</span> { Renderer } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./renderer&apos;</span>

<span class="hljs-keyword">let</span> container

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ReactPixi = {
  render (element, pixiApp) {
    <span class="hljs-keyword">if</span> (!container) {
      container = Renderer.createContainer(pixiApp)
    }
    <span class="hljs-comment">// &#x8C03;&#x7528; React Reconciler &#x66F4;&#x65B0;&#x5BB9;&#x5668;</span>
    Renderer.updateContainer(element, container, <span class="hljs-literal">null</span>)
  }
}</code></pre><p>&#x5B83;&#x4F9D;&#x8D56;&#x7684; Renderer &#x662F;&#x4EC0;&#x4E48;&#x5F62;&#x5F0F;&#x7684;&#x5462;&#xFF1F;&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactFiberReconciler from &apos;react-reconciler&apos;

export const Renderer = ReactFiberReconciler({
  now: Date.now,
  createInstance () {},
  appendInitialChild () {},
  appendChild () {},
  appendChildToContainer () {},
  insertBefore () {},
  insertInContainerBefore () {},
  removeChild () {},
  removeChildFromContainer () {},
  getRootHostContext () {},
  getChildHostContext () {},
  prepareUpdate () {},
  // ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> ReactFiberReconciler from <span class="hljs-string">&apos;react-reconciler&apos;</span>

export const Renderer = ReactFiberReconciler({
  now: Date.now,
  createInstance () {},
  appendInitialChild () {},
  appendChild () {},
  appendChildToContainer () {},
  insertBefore () {},
  insertInContainerBefore () {},
  removeChild () {},
  removeChildFromContainer () {},
  getRootHostContext () {},
  getChildHostContext () {},
  prepareUpdate () {},
  // ...
})</code></pre><p>&#x8FD9;&#x4E9B;&#x914D;&#x7F6E;&#x76F8;&#x5F53;&#x4E8E; Fiber &#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x94A9;&#x5B50;&#x3002;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x63D0;&#x4F9B;&#x4E00;&#x7CFB;&#x5217;&#x7684; Stub &#x7A7A;&#x5B9E;&#x73B0;&#xFF0C;&#x800C;&#x540E;&#x5728;&#x76F8;&#x5E94;&#x7684;&#x4F4D;&#x7F6E;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x64CD;&#x4F5C; PIXI &#x5BF9;&#x8C61;&#x7684;&#x4EE3;&#x7801;&#x5373;&#x53EF;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728; <code>createInstance</code> &#x4E2D;&#x5B9E;&#x73B0;&#x5BF9; PIXI &#x5BF9;&#x8C61;&#x7684; new &#x64CD;&#x4F5C;&#xFF0C;&#x5728; <code>appendChild</code> &#x4E2D;&#x4E3A;&#x4F20;&#x5165;&#x7684; PIXI &#x5B50;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x52A0;&#x5165;&#x7236;&#x5BF9;&#x8C61;&#x7B49;&#x3002;&#x53EA;&#x8981;&#x8FD9;&#x4E9B;&#x94A9;&#x5B50;&#x90FD;&#x6B63;&#x786E;&#x5730;&#x4E0E;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x76F8;&#x5E94; API &#x7ED1;&#x5B9A;&#xFF0C;&#x90A3;&#x4E48; React &#x5C31;&#x80FD;&#x5C06;&#x5176;&#x5B8C;&#x6574;&#x5730;&#x6E32;&#x67D3;&#xFF0C;&#x5E76;&#x5728; <code>setState</code> &#x65F6;&#x4F9D;&#x636E;&#x81EA;&#x8EAB;&#x7684; diff &#x53BB;&#x5B9E;&#x73B0;&#x5BF9;&#x5176;&#x7684;&#x6309;&#x9700;&#x66F4;&#x65B0;&#x4E86;&#x3002;</p><p>&#x8FD9;&#x4E9B;&#x8FDE;&#x63A5;&#x6027;&#x7684;&#x80F6;&#x6C34;&#x4EE3;&#x7801;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x591F;&#x7528; React &#x7EC4;&#x4EF6;&#x6765;&#x63A7;&#x5236; PIXI &#x8FD9;&#x6837;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6E32;&#x67D3;&#x5E93;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016641836?w=550&amp;h=254" src="https://static.alili.tech/img/remote/1460000016641836?w=550&amp;h=254" alt="" title="" style="cursor:pointer"></span></p><p>&#x8FD9;&#x5C31;&#x662F;&#x57FA;&#x4E8E; React &#x63A5;&#x5165;&#x6E32;&#x67D3;&#x5C42;&#x9002;&#x914D;&#x7684;&#x57FA;&#x672C;&#x5B9E;&#x73B0;&#x4E86;&#x3002;</p><h2 id="articleHeader2">Vue &#x975E;&#x4FB5;&#x5165;&#x5F0F;&#x9002;&#x914D;</h2><p>&#x7531;&#x4E8E; Vue &#x6682;&#x65F6;&#x672A;&#x63D0;&#x4F9B;&#x7C7B;&#x4F3C; <code>ReactFiberReconciler</code> &#x8FD9;&#x6837;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x9002;&#x914D;&#x6E32;&#x67D3;&#x5C42;&#x7684; API&#xFF0C;&#x56E0;&#x6B64;&#x57FA;&#x4E8E; Vue &#x7684;&#x6E32;&#x67D3;&#x5C42;&#x9002;&#x914D;&#x5728;&#x76EE;&#x524D;&#x6709;&#x8F83;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x3002;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x4ECB;&#x7ECD;&#x300C;&#x975E;&#x4FB5;&#x5165;&#x5F0F;&#x300D;&#x7684;&#x9002;&#x914D;&#xFF0C;&#x5B83;&#x7684;&#x7279;&#x70B9;&#x5728;&#x4E8E;&#x5B8C;&#x5168;&#x53EF;&#x5728;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9E;&#x73B0;&#x3002;&#x5176;&#x57FA;&#x672C;&#x7ED3;&#x6784;&#x5F62;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016641837" src="https://static.alili.tech/img/remote/1460000016641837" alt="" title="" style="cursor:pointer"></span></p><p>&#x8FD9;&#x4E2A;&#x5B9E;&#x73B0;&#x7684;&#x521D;&#x8877;&#x662F;&#x8BA9;&#x6211;&#x4EEC;&#x4EE5;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7F16;&#x5199;&#x6E32;&#x67D3;&#x5C42;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;pixi-renderer&gt;
    &lt;container @tick=&quot;tickInfo&quot; @pointerdown=&quot;scaleObject&quot;&gt;
      &lt;pixi-text :x=&quot;10&quot; :y=&quot;10&quot; content=&quot;hello world&quot;/&gt;
    &lt;/container&gt;
  &lt;/pixi-renderer&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">pixi-renderer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">container</span> @<span class="hljs-attr">tick</span>=<span class="hljs-string">&quot;tickInfo&quot;</span> @<span class="hljs-attr">pointerdown</span>=<span class="hljs-string">&quot;scaleObject&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pixi-text</span> <span class="hljs-attr">:x</span>=<span class="hljs-string">&quot;10&quot;</span> <span class="hljs-attr">:y</span>=<span class="hljs-string">&quot;10&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;hello world&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">container</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">pixi-renderer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x6700;&#x5916;&#x5C42;&#x7684; <code>pixi-renderer</code> &#x7EC4;&#x4EF6;&#x3002;&#x57FA;&#x4E8E; Vue &#x4E2D;&#x7C7B;&#x4F3C; Context &#x7684; Provide / Inject &#x673A;&#x5236;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06; PIXI &#x6CE8;&#x5165;&#x8BE5;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x5E76;&#x57FA;&#x4E8E; Slot &#x5B9E;&#x73B0; Renderer &#x7684;&#x52A8;&#x6001;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// renderer.js
import Vue from &apos;vue&apos;
import * as PIXI from &apos;pixi.js&apos;

export default {
  template: `
    &lt;div class=&quot;pixi-renderer&quot;&gt;
      &lt;canvas ref=&quot;renderCanvas&quot;&gt;&lt;/canvas&gt;
      &lt;slot&gt;&lt;/slot&gt;
    &lt;/div&gt;`,
  data () {
    return {
      PIXIWrapper: { PIXI, PIXIApp: null },
      EventBus: new Vue()
    }
  },
  provide () {
    return {
      PIXIWrapper: this.PIXIWrapper,
      EventBus: this.EventBus
    }
  },
  mounted () {
    this.PIXIWrapper.PIXIApp = new PIXI.Application({
      view: this.$refs.renderCanvas
    })
    this.EventBus.$emit(&apos;ready&apos;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> renderer.js
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> PIXI <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;pixi.js&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  template: `<span class="javascript">
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;pixi-renderer&quot;</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;renderCanvas&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span></span>
      &lt;slot&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/div&gt;</span></span>`,
  data () {
    <span class="hljs-keyword">return</span> {
      PIXIWrapper: { PIXI, PIXIApp: <span class="hljs-literal">null</span> },
      EventBus: <span class="hljs-keyword">new</span> Vue()
    }
  },
  provide () {
    <span class="hljs-keyword">return</span> {
      PIXIWrapper: <span class="hljs-keyword">this</span>.PIXIWrapper,
      EventBus: <span class="hljs-keyword">this</span>.EventBus
    }
  },
  mounted () {
    <span class="hljs-keyword">this</span>.PIXIWrapper.PIXIApp = <span class="hljs-keyword">new</span> PIXI.Application({
      view: <span class="hljs-keyword">this</span>.$refs.renderCanvas
    })
    <span class="hljs-keyword">this</span>.EventBus.$emit(<span class="hljs-string">&apos;ready&apos;</span>)
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x5177;&#x5907;&#x4E86;&#x6700;&#x5916;&#x5C42;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#x5BB9;&#x5668;&#x4E86;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x5185;&#x5C42;&#x7684; Container &#x7EC4;&#x4EF6;&#xFF08;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684; Container &#x4E0D;&#x4EE3;&#x8868;&#x6700;&#x5916;&#x5C42;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x53EA;&#x662F; PIXI &#x4E2D;&#x4EE3;&#x8868;&#x8282;&#x70B9;&#x7684;&#x6982;&#x5FF5;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// container.js
export default {
  inject: [&apos;EventBus&apos;, &apos;PIXIWrapper&apos;],
  data () {
    return {
      container: null
    }
  },
  render (h) { return h(&apos;template&apos;, this.$slots.default) },
  created () {
    this.container = new this.PIXIWrapper.PIXI.Container()
    this.container.interactive = true

    this.container.on(&apos;pointerdown&apos;, () =&gt; {
      this.$emit(&apos;pointerdown&apos;, this.container)
    })
    // &#x7EF4;&#x62A4; Vue &#x4E0E; PIXI &#x7EC4;&#x4EF6;&#x95F4;&#x540C;&#x6B65;
    this.EventBus.$on(&apos;ready&apos;, () =&gt; {
      if (this.$parent.container) {
        this.$parent.container.addChild(this.container)
      } else {
        this.PIXIWrapper.PIXIApp.stage.addChild(this.container)
      }

      this.PIXIWrapper.PIXIApp.ticker.add(delta =&gt; {
        this.$emit(&apos;tick&apos;, this.container, delta)
      })
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// container.js</span>
export <span class="hljs-keyword">default</span> {
  inject: [<span class="hljs-string">&apos;EventBus&apos;</span>, <span class="hljs-string">&apos;PIXIWrapper&apos;</span>],
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      container: <span class="hljs-literal">null</span>
    }
  },
  render (h) { <span class="hljs-keyword">return</span> h(<span class="hljs-string">&apos;template&apos;</span>, <span class="hljs-keyword">this</span>.$slots.<span class="hljs-keyword">default</span>) },
  created () {
    <span class="hljs-keyword">this</span>.container = new <span class="hljs-keyword">this</span>.PIXIWrapper.PIXI.Container()
    <span class="hljs-keyword">this</span>.container.interactive = <span class="hljs-literal">true</span>

    <span class="hljs-keyword">this</span>.container.on(<span class="hljs-string">&apos;pointerdown&apos;</span>, () =&gt; {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pointerdown&apos;</span>, <span class="hljs-keyword">this</span>.container)
    })
    <span class="hljs-comment">// &#x7EF4;&#x62A4; Vue &#x4E0E; PIXI &#x7EC4;&#x4EF6;&#x95F4;&#x540C;&#x6B65;</span>
    <span class="hljs-keyword">this</span>.EventBus.$on(<span class="hljs-string">&apos;ready&apos;</span>, () =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$parent.container) {
        <span class="hljs-keyword">this</span>.$parent.container.addChild(<span class="hljs-keyword">this</span>.container)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.PIXIWrapper.PIXIApp.stage.addChild(<span class="hljs-keyword">this</span>.container)
      }

      <span class="hljs-keyword">this</span>.PIXIWrapper.PIXIApp.ticker.add(delta =&gt; {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;tick&apos;</span>, <span class="hljs-keyword">this</span>.container, delta)
      })
    })
  }
}</code></pre><p>&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x91CC;&#x663E;&#x5F97;&#x53E4;&#x602A;&#x7684; <code>render</code> &#x662F;&#x7531;&#x4E8E;&#x5176;&#x867D;&#x7136;&#x65E0;&#x9700;&#x6A21;&#x677F;&#xFF0C;&#x4F46;&#x5374;&#x53EF;&#x80FD;&#x6709;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x7279;&#x70B9;&#x6240;&#x51B3;&#x5B9A;&#x7684;&#x3002;&#x5176;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x5373;&#x662F;&#x7EF4;&#x62A4;&#x6E32;&#x67D3;&#x5C42;&#x5BF9;&#x8C61;&#x4E0E; Vue &#x4E4B;&#x95F4;&#x7684;&#x72B6;&#x6001;&#x4E00;&#x81F4;&#x3002;&#x6700;&#x540E;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x4F5C;&#x4E3A;&#x53F6;&#x5B50;&#x8282;&#x70B9;&#x7684; Text &#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// text.js
export default {
  inject: [&apos;EventBus&apos;, &apos;PIXIWrapper&apos;],
  props: [&apos;x&apos;, &apos;y&apos;, &apos;content&apos;],
  data () {
    return {
      text: null
    }
  },
  render (h) { return h() },

  created () {
    this.text = new this.PIXIWrapper.PIXI.Text(this.content, { fill: 0xFF0000 })
    this.text.x = this.x
    this.text.y = this.y
    this.text.on(&apos;pointerdown&apos;, () =&gt; this.$emit(&apos;pointerdown&apos;, this.text))

    this.EventBus.$on(&apos;ready&apos;, () =&gt; {
      if (this.$parent.container) {
        this.$parent.container.addChild(this.text)
      } else {
        this.PIXIWrapper.PIXIApp.stage.addChild(this.text)
      }
      this.PIXIWrapper.PIXIApp.ticker.add(delta =&gt; {
        this.$emit(&apos;tick&apos;, this.text, delta)
      })
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// text.js</span>
export <span class="hljs-keyword">default</span> {
  inject: [<span class="hljs-string">&apos;EventBus&apos;</span>, <span class="hljs-string">&apos;PIXIWrapper&apos;</span>],
  props: [<span class="hljs-string">&apos;x&apos;</span>, <span class="hljs-string">&apos;y&apos;</span>, <span class="hljs-string">&apos;content&apos;</span>],
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      text: <span class="hljs-literal">null</span>
    }
  },
  render (h) { <span class="hljs-keyword">return</span> h() },

  created () {
    <span class="hljs-keyword">this</span>.text = new <span class="hljs-keyword">this</span>.PIXIWrapper.PIXI.Text(<span class="hljs-keyword">this</span>.content, { fill: <span class="hljs-number">0xFF0000</span> })
    <span class="hljs-keyword">this</span>.text.x = <span class="hljs-keyword">this</span>.x
    <span class="hljs-keyword">this</span>.text.y = <span class="hljs-keyword">this</span>.y
    <span class="hljs-keyword">this</span>.text.on(<span class="hljs-string">&apos;pointerdown&apos;</span>, () =&gt; <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pointerdown&apos;</span>, <span class="hljs-keyword">this</span>.text))

    <span class="hljs-keyword">this</span>.EventBus.$on(<span class="hljs-string">&apos;ready&apos;</span>, () =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$parent.container) {
        <span class="hljs-keyword">this</span>.$parent.container.addChild(<span class="hljs-keyword">this</span>.text)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.PIXIWrapper.PIXIApp.stage.addChild(<span class="hljs-keyword">this</span>.text)
      }
      <span class="hljs-keyword">this</span>.PIXIWrapper.PIXIApp.ticker.add(delta =&gt; {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;tick&apos;</span>, <span class="hljs-keyword">this</span>.text, delta)
      })
    })
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x6A21;&#x62DF;&#x51FA;&#x4E86;&#x548C; React &#x7C7B;&#x4F3C;&#x7684;&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x3002;&#x4F46;&#x8FD9;&#x91CC;&#x5B58;&#x5728;&#x51E0;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ul><li>&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x8131;&#x79BB; DOM &#x505A;&#x6E32;&#x67D3;&#x3002;</li><li>&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x5728;&#x5404;&#x4E2A;&#x5B9A;&#x5236;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x624B;&#x52A8;&#x7EF4;&#x62A4; PIXI &#x5B9E;&#x4F8B;&#x72B6;&#x6001;&#x3002;</li><li>&#x4F7F;&#x7528;&#x4E86; EventBus &#x548C; props &#x4E24;&#x5957;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#x673A;&#x5236;&#xFF0C;&#x5B58;&#x5728;&#x5197;&#x4F59;&#x3002;</li></ul><p>&#x6709;&#x6CA1;&#x6709;&#x5176;&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#x5462;&#xFF1F;</p><h2 id="articleHeader3">Vue Mixin &#x9002;&#x914D;</h2><p>&#x5C06; DOM &#x8282;&#x70B9;&#x7ED8;&#x5236;&#x5230; Canvas &#x7684; <a href="https://github.com/muwoo/vnode2canvas" rel="nofollow noreferrer" target="_blank">vnode2canvas</a> &#x6E32;&#x67D3;&#x5E93;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7684;&#x6280;&#x672F;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; Mixin &#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x5BF9; Vnode &#x7684;&#x76D1;&#x542C;&#x3002;&#x8FD9;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x76F4;&#x63A5;&#x5230; Canvas &#x7684;&#x6E32;&#x67D3;&#x5C42;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x7684;&#x7ED3;&#x6784;&#x5927;&#x81F4;&#x5F62;&#x5982;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="![image](http://upload-images.jianshu.io/upload_images/13341631-6925272b84d1582a.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&#x5B83;&#x7684;&#x6E90;&#x7801;&#x5E76;&#x4E0D;&#x591A;&#xFF0C;&#x4EAE;&#x70B9;&#x5728;&#x4E8E;&#x8FD9;&#x4E2A; Mixin &#x7684; mounted &#x94A9;&#x5B50;&#xFF1A;
&lt;pre class=&quot;prettyprint hljs kotlin&quot;&gt;mounted() {
  if (this.$options.renderCanvas) {
    this.options = Object.assign({}, this.options, this.getOptions())
    constants.IN_BROWSER &amp;&amp; (constants.rate = this.options.remUnit ? window.innerWidth / (this.options.remUnit * 10) : 1)
    renderInstance = new Canvas(this.options.width, this.options.height, this.options.canvasId)
    // &#x5728;&#x6B64; $watch Vnode
    this.$watch(this.updateCanvas, this.noop)
    constants.IN_BROWSER &amp;&amp; document.querySelector(this.options.el || &apos;body&apos;).appendChild(renderInstance._canvas)
  }
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>![image](http:<span class="hljs-comment">//upload-images.jianshu.io/upload_images/13341631-6925272b84d1582a.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)</span>

&#x5B83;&#x7684;&#x6E90;&#x7801;&#x5E76;&#x4E0D;&#x591A;&#xFF0C;&#x4EAE;&#x70B9;&#x5728;&#x4E8E;&#x8FD9;&#x4E2A; Mixin &#x7684; mounted &#x94A9;&#x5B50;&#xFF1A;
&lt;pre <span class="hljs-class"><span class="hljs-keyword">class</span>=&quot;<span class="hljs-title">prettyprint</span> <span class="hljs-title">hljs</span> <span class="hljs-title">kotlin</span>&quot;&gt;<span class="hljs-title">mounted</span></span>() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$options.renderCanvas) {
    <span class="hljs-keyword">this</span>.options = Object.assign({}, <span class="hljs-keyword">this</span>.options, <span class="hljs-keyword">this</span>.getOptions())
    constants.IN_BROWSER &amp;&amp; (constants.rate = <span class="hljs-keyword">this</span>.options.remUnit ? window.innerWidth / (<span class="hljs-keyword">this</span>.options.remUnit * <span class="hljs-number">10</span>) : <span class="hljs-number">1</span>)
    renderInstance = new Canvas(<span class="hljs-keyword">this</span>.options.width, <span class="hljs-keyword">this</span>.options.height, <span class="hljs-keyword">this</span>.options.canvasId)
    <span class="hljs-comment">// &#x5728;&#x6B64; $watch Vnode</span>
    <span class="hljs-keyword">this</span>.$watch(<span class="hljs-keyword">this</span>.updateCanvas, <span class="hljs-keyword">this</span>.noop)
    constants.IN_BROWSER &amp;&amp; document.querySelector(<span class="hljs-keyword">this</span>.options.el || <span class="hljs-string">&apos;body&apos;</span>).appendChild(renderInstance._canvas)
  }
},</code></pre><p>&#x7531;&#x4E8E;&#x8FD9;&#x91CC;&#x7684; <code>updateCanvas</code> &#x4E2D;&#x8FD4;&#x56DE;&#x4E86; <code>Vnode</code> &#xFF08;&#x867D;&#x7136;&#x8FD9;&#x4E2A;&#x884C;&#x4E3A;&#x4F3C;&#x4E4E;&#x6709;&#x4E9B;&#x4E0D;&#x5408;&#x8BED;&#x4E49;&#x7684;&#x76F4;&#x89C9;&#xFF09;&#xFF0C;&#x6545;&#x800C;&#x8FD9;&#x91CC;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x5728; Vnode &#x66F4;&#x65B0;&#x65F6;&#x89E6;&#x53D1;&#x5BF9; Canvas &#x7684;&#x6E32;&#x67D3;&#x3002;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x5DE7;&#x5999;&#x5730;&#x5C06;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x6811;&#x7684;&#x66F4;&#x65B0;&#x4E0E;&#x6E32;&#x67D3;&#x5C42;&#x76F4;&#x63A5;&#x8054;&#x7CFB;&#x5728;&#x4E00;&#x8D77;&#x4E86;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x5B9E;&#x73B0;&#x786E;&#x5B9E;&#x5F88;&#x65B0;&#x9896;&#xFF0C;&#x4E0D;&#x8FC7;&#x591A;&#x5C11;&#x6709;&#x4E9B; Hack &#x7684;&#x5473;&#x9053;&#xFF1A;</p><ul><li>&#x5B83;&#x9700;&#x8981;&#x4E3A; Vue &#x7EC4;&#x4EF6;&#x6CE8;&#x5165;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x7684;&#x65B9;&#x6CD5;&#x4E0E;&#x5C5E;&#x6027;&#x3002;</li><li>&#x5B83;&#x9700;&#x8981;&#x8026;&#x5408; Vnode &#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x8FD9;&#x5728; React Reconciler &#x4E2D;&#x662F;&#x4E00;&#x79CD;&#x53CD;&#x6A21;&#x5F0F;&#x3002;</li><li>&#x5B83;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x5BF9; Vnode &#x7684;&#x904D;&#x5386;&#x4E0E;&#x5BF9; Canvas &#x5BF9;&#x8C61;&#x7684; getter &#x4EE3;&#x7406;&#xFF0C;&#x5B9E;&#x73B0;&#x6210;&#x672C;&#x8F83;&#x9AD8;&#x3002;</li><li>&#x5B83;&#x4ECD;&#x7136;&#x9644;&#x5E26;&#x4E86; Vue &#x81EA;&#x8EAB;&#x5230; DOM &#x7684;&#x6E32;&#x67D3;&#x5C42;&#x3002;</li></ul><p>&#x6709;&#x6CA1;&#x6709;&#x4E00;&#x4E9B;&#x66F4;&#x52A0;&#x300C;&#x6B63;&#x7EDF;&#x300D;&#x7684;&#x65B9;&#x6CD5;&#x5462;&#xFF1F;</p><h2 id="articleHeader4">Vue Platform &#x5B9A;&#x5236;&#x9002;&#x914D;</h2><p>&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A; Vue 2.x &#x4E2D;&#x5BF9; Weex &#x7684;&#x652F;&#x6301;&#x65B9;&#x5F0F;&#xFF0C;&#x662F;&#x6700;&#x8D34;&#x5408;&#x6211;&#x4EEC;&#x5BF9;&#x5B9A;&#x5236;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x7406;&#x89E3;&#x7684;&#x3002;&#x5927;&#x540D;&#x9F0E;&#x9F0E;&#x7684; mpvue &#x4E5F;&#x662F;&#x6309;&#x7167;&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x5B9E;&#x73B0;&#x4E86;&#x5230;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#x3002;&#x7C7B;&#x4F3C;&#x5730;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7B80;&#x7565;&#x5730;&#x753B;&#x51FA;&#x5B83;&#x7684;&#x7ED3;&#x6784;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016641838" src="https://static.alili.tech/img/remote/1460000016641838" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x56FE;&#x4E2D;&#x7684; Platform &#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x6253;&#x5F00; mpvue &#x7684;&#x6E90;&#x7801;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x627E;&#x5230;&#x5B83;&#x5728; platforms &#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x589E;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="platforms
&#x251C;&#x2500;&#x2500; mp
&#x2502;   &#x251C;&#x2500;&#x2500; compiler
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; codegen
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; directives
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x251C;&#x2500;&#x2500; runtime
&#x2502;   &#x2514;&#x2500;&#x2500; util
&#x251C;&#x2500;&#x2500; web
&#x2502;   &#x251C;&#x2500;&#x2500; compiler
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; directives
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x251C;&#x2500;&#x2500; runtime
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; components
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; directives
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x251C;&#x2500;&#x2500; server
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; directives
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x2514;&#x2500;&#x2500; util
&#x2514;&#x2500;&#x2500; weex
    &#x251C;&#x2500;&#x2500; compiler
    &#x2502;   &#x251C;&#x2500;&#x2500; directives
    &#x2502;   &#x2514;&#x2500;&#x2500; modules
    &#x251C;&#x2500;&#x2500; runtime
    &#x2502;   &#x251C;&#x2500;&#x2500; components
    &#x2502;   &#x251C;&#x2500;&#x2500; directives
    &#x2502;   &#x2514;&#x2500;&#x2500; modules
    &#x2514;&#x2500;&#x2500; util" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>platforms
&#x251C;&#x2500;&#x2500; mp
&#x2502;   &#x251C;&#x2500;&#x2500; compiler
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; codegen
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">directives
</span>&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x251C;&#x2500;&#x2500; runtime
&#x2502;   &#x2514;&#x2500;&#x2500; util
&#x251C;&#x2500;&#x2500; web
&#x2502;   &#x251C;&#x2500;&#x2500; compiler
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">directives
</span>&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x251C;&#x2500;&#x2500; runtime
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; components
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">directives
</span>&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x251C;&#x2500;&#x2500; server
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">directives
</span>&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; modules
&#x2502;   &#x2514;&#x2500;&#x2500; util
&#x2514;&#x2500;&#x2500; weex
    &#x251C;&#x2500;&#x2500; compiler
    &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">directives
</span>    &#x2502;   &#x2514;&#x2500;&#x2500; modules
    &#x251C;&#x2500;&#x2500; runtime
    &#x2502;   &#x251C;&#x2500;&#x2500; components
    &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">directives
</span>    &#x2502;   &#x2514;&#x2500;&#x2500; modules
    &#x2514;&#x2500;&#x2500; util</code></pre><p>&#x4E0A;&#x9762;&#x7684; <code>mp</code> &#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x65B0;&#x589E;&#x7684;&#x5C0F;&#x7A0B;&#x5E8F;&#x6E32;&#x67D3;&#x5C42;&#x5165;&#x53E3;&#x4E86;&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6E32;&#x67D3;&#x5C42;&#x662F;&#x72EC;&#x7ACB;&#x4E8E; Vue &#x7684; core &#x6A21;&#x5757;&#x7684;&#x3002;&#x90A3;&#x4E48;&#x8FD9;&#x91CC;&#x7684;&#x9002;&#x914D;&#x9700;&#x8981;&#x505A;&#x54EA;&#x4E9B;&#x5904;&#x7406;&#x5462;&#xFF1F;&#x6982;&#x62EC;&#x800C;&#x8A00;&#x6709;&#x4EE5;&#x4E0B;&#x8FD9;&#x4E9B;&#xFF1A;</p><ul><li>&#x7F16;&#x8BD1;&#x671F;&#x7684;&#x76EE;&#x6807;&#x4EE3;&#x7801;&#x751F;&#x6210;&#xFF08;&#x8FD9;&#x4E2A;&#x5E94;&#x5F53;&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x5E73;&#x53F0;&#x7279;&#x6027;&#x6240;&#x51B3;&#x5B9A;&#x7684;&#xFF09;&#x3002;</li><li>runtime/ <strong>events</strong> &#x6A21;&#x5757;&#x4E2D;&#x6E32;&#x67D3;&#x5C42;&#x4E8B;&#x4EF6;&#x5230; Vue &#x4E2D;&#x4E8B;&#x4EF6;&#x7684;&#x8F6C;&#x6362;&#x3002;</li><li>runtime/ <strong>lifecycle</strong> &#x6A21;&#x5757;&#x4E2D;&#x6E32;&#x67D3;&#x5C42;&#x4E0E; Vue &#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x540C;&#x6B65;&#x3002;</li><li>runtime/ <strong>render</strong> &#x6A21;&#x5757;&#x4E2D;&#x5BF9;&#x5C0F;&#x7A0B;&#x5E8F; <code>setData</code> &#x6E32;&#x67D3;&#x7684;&#x652F;&#x6301;&#x4E0E;&#x4F18;&#x5316;&#x3002;</li><li>runtime/ <strong>node-ops</strong> &#x6A21;&#x5757;&#x4E2D;&#x5BF9; Vnode &#x64CD;&#x4F5C;&#x7684;&#x5904;&#x7406;&#x3002;</li></ul><p>&#x8FD9;&#x91CC;&#x6709;&#x8DA3;&#x7684;&#x5730;&#x65B9;&#x5728;&#x4E8E; <code>node-ops</code> &#xFF0C;&#x548C;&#x7B14;&#x8005;&#x4E00;&#x5F00;&#x59CB;&#x8BBE;&#x60F3;&#x4E2D;&#x5728;&#x6B64;&#x540C;&#x6B65;&#x6E32;&#x67D3;&#x5C42;&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4E0D;&#x540C;&#xFF0C;mpvue &#x7684;&#x5B9E;&#x73B0;&#x770B;&#x8D77;&#x6765;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x9605;&#x8BFB;&#x2026;&#x2026;&#x50CF;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// runtime/node-ops.js
const obj = {}

export function createElement (tagName: string, vnode: VNode) {
  return obj
}
export function createElementNS (namespace: string, tagName: string) {
  return obj
}
export function createTextNode (text: string) {
  return obj
}
export function createComment (text: string) {
  return obj
}
export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {}
export function removeChild (node: Node, child: Node) {}
export function appendChild (node: Node, child: Node) {}
export function parentNode (node: Node) {
  return obj
}
export function nextSibling (node: Node) {
  return obj
}
export function tagName (node: Element): string {
  return &apos;div&apos;
}
export function setTextContent (node: Node, text: string) {
  return obj
}
export function setAttribute (node: Element, key: string, val: string) {
  return obj
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>// runtime/<span class="hljs-keyword">node</span><span class="hljs-title">-ops</span>.js
const obj = {}

export function createElement (tagName: <span class="hljs-keyword">string</span>, vnode: VNode) {
  return obj
}
export function createElementNS (namespace: <span class="hljs-keyword">string</span>, tagName: <span class="hljs-keyword">string</span>) {
  return obj
}
export function createTextNode (text: <span class="hljs-keyword">string</span>) {
  return obj
}
export function createComment (text: <span class="hljs-keyword">string</span>) {
  return obj
}
export function insertBefore (parentNode: <span class="hljs-keyword">Node</span><span class="hljs-title">, newNode</span>: <span class="hljs-keyword">Node</span><span class="hljs-title">, referenceNode</span>: <span class="hljs-keyword">Node</span><span class="hljs-title">) {}
export</span> function removeChild (<span class="hljs-keyword">node</span><span class="hljs-title">: Node</span>, child: <span class="hljs-keyword">Node</span><span class="hljs-title">) {}
export</span> function appendChild (<span class="hljs-keyword">node</span><span class="hljs-title">: Node</span>, child: <span class="hljs-keyword">Node</span><span class="hljs-title">) {}
export</span> function parentNode (<span class="hljs-keyword">node</span><span class="hljs-title">: Node</span>) {
  return obj
}
export function nextSibling (<span class="hljs-keyword">node</span><span class="hljs-title">: Node</span>) {
  return obj
}
export function tagName (<span class="hljs-keyword">node</span><span class="hljs-title">: Element</span>): <span class="hljs-keyword">string</span> {
  return &apos;div&apos;
}
export function setTextContent (<span class="hljs-keyword">node</span><span class="hljs-title">: Node</span>, text: <span class="hljs-keyword">string</span>) {
  return obj
}
export function setAttribute (<span class="hljs-keyword">node</span><span class="hljs-title">: Element</span>, key: <span class="hljs-keyword">string</span>, val: <span class="hljs-keyword">string</span>) {
  return obj
}</code></pre><p>&#x770B;&#x8D77;&#x6765;&#x8FD9;&#x4E0D;&#x662F;&#x4EC0;&#x4E48;&#x90FD;&#x6CA1;&#x6709;&#x505A;&#x5417;&#xFF1F;&#x4E2A;&#x4EBA;&#x7406;&#x89E3;&#x91CC;&#x8FD9;&#x548C;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684; API &#x6709;&#x66F4;&#x591A;&#x7684;&#x5173;&#x7CFB;&#xFF1A;&#x5B83;&#x9700;&#x8981;&#x4E0E; <code>.wxml</code> &#x6A21;&#x677F;&#x7ED3;&#x5408;&#x7684; API &#x52A0;&#x5927;&#x4E86;&#x6309;&#x7167;&#x914D;&#x7F6E; Reconciler &#x7684;&#x65B9;&#x6CD5;&#x5C06;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7531; Vue &#x63A5;&#x7BA1;&#x7684;&#x96BE;&#x5EA6;&#xFF0C;&#x56E0;&#x800C;&#x8F83;&#x96BE;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x65B9;&#x5F0F;&#x76F4;&#x63A5;&#x9002;&#x914D;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E3A;&#x6E32;&#x67D3;&#x5C42;&#xFF0C;&#x8FD8;&#x4E0D;&#x5982;&#x901A;&#x8FC7;&#x4E00;&#x5957;&#x4EE3;&#x7801;&#x540C;&#x65F6;&#x751F;&#x6210; Vue &#x4E0E;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x4E24;&#x68F5;&#x7EC4;&#x4EF6;&#x6811;&#x5E76;&#x8BBE;&#x6CD5;&#x4FDD;&#x6301;&#x5176;&#x540C;&#x6B65;&#x6765;&#x5F97;&#x5212;&#x7B97;&#x3002;</p><p>&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x57FA;&#x672C;&#x4ECB;&#x7ECD;&#x4E86;&#x901A;&#x8FC7;&#x6DFB;&#x52A0; platform &#x652F;&#x6301; Vue &#x6E32;&#x67D3;&#x5C42;&#x7684;&#x57FA;&#x672C;&#x65B9;&#x5F0F;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x7684;&#x4F18;&#x52BF;&#x5F88;&#x660E;&#x663E;&#xFF1A;</p><ul><li>&#x5B83;&#x65E0;&#x9700;&#x5728; Vue &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x6E32;&#x67D3;&#x5C42; API&#x3002;</li><li>&#x5B83;&#x5BF9; Vue &#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x7684;&#x4FB5;&#x5165;&#x76F8;&#x5BF9;&#x8F83;&#x5C11;&#x3002;</li><li>&#x5B83;&#x4E0D;&#x9700;&#x8981;&#x8026;&#x5408; Vnode &#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;</li><li>&#x5B83;&#x53EF;&#x4EE5;&#x786E;&#x5B9E;&#x5730;&#x8131;&#x79BB; DOM &#x73AF;&#x5883;&#x3002;</li></ul><p>&#x800C;&#x5728;&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x7684;&#x95EE;&#x9898;&#x4E0A;&#xFF0C;&#x76EE;&#x524D;&#x6700;&#x5927;&#x7684;&#x56F0;&#x6270;&#x5E94;&#x8BE5;&#x662F;&#x5B83;&#x5FC5;&#x987B; fork Vue &#x6E90;&#x7801;&#x4E86;&#x3002;&#x9664;&#x4E86;&#x7EF4;&#x62A4;&#x6210;&#x672C;&#x4EE5;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x57FA;&#x4E8E;&#x539F;&#x751F; Vue &#x7684;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x6E32;&#x67D3;&#x5C42;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x5C06;&#x4F1A;&#x5B58;&#x5728;&#x4E24;&#x4E2A;&#x5177;&#x6709;&#x7EC6;&#x5FAE;&#x533A;&#x522B;&#x7684;&#x4E0D;&#x540C; Vue &#x73AF;&#x5883;&#xFF0C;&#x8FD9;&#x542C;&#x8D77;&#x6765;&#x4F3C;&#x4E4E;&#x6709;&#x4E9B;&#x4E0D;&#x6E05;&#x771F;&#x554A;&#x2026;&#x597D;&#x5728;&#x8FD9;&#x5757;&#x7684;&#x5BF9;&#x5916; API &#x5DF2;&#x7ECF;&#x5728; Vue 3.0 &#x7684;&#x89C4;&#x5212;&#x4E2D;&#x4E86;&#xFF0C;&#x503C;&#x5F97;&#x671F;&#x5F85; XD</p><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x603B;&#x7ED3;&#x4E86; React &#x4E0E; Vue &#x4E2D;&#x5B9A;&#x5236;&#x6E32;&#x67D3;&#x5C42;&#x7684;&#x4E3B;&#x8981;&#x65B9;&#x5F0F;&#x3002;&#x91CD;&#x590D;&#x4E00;&#x904D;&#xFF1A;</p><ul><li>&#x57FA;&#x4E8E; React 16 Reconciler &#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;&#xFF0C;&#x7B80;&#x5355;&#x76F4;&#x63A5;&#x3002;</li><li>&#x57FA;&#x4E8E; Vue EventBus &#x7684;&#x975E;&#x4FB5;&#x5165;&#x5F0F;&#x9002;&#x914D;&#x65B9;&#x5F0F;&#xFF0C;&#x7B80;&#x5355;&#x4F46;&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x7684;&#x7EC6;&#x8282;&#x8F83;&#x591A;&#x3002;</li><li>&#x57FA;&#x4E8E; Vue Mixin &#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;&#xFF0C;Hack &#x610F;&#x5473;&#x8F83;&#x5F3A;&#x3002;</li><li>&#x57FA;&#x4E8E; Vue Platform &#x5B9A;&#x5236;&#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;&#xFF0C;&#x6700;&#x4E3A;&#x7075;&#x6D3B;&#x4F46;&#x9700;&#x8981; fork &#x6E90;&#x7801;&#x3002;</li></ul><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5728;&#x76EE;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x8282;&#x70B9;&#x4E0A;&#xFF0C;&#x6CA1;&#x6709;&#x8DEF;&#x5F84;&#x4F9D;&#x8D56;&#x7684;&#x9879;&#x76EE;&#x5728;&#x5B9A;&#x5236; Canvas / WebGL &#x6E32;&#x67D3;&#x5C42;&#x65F6;&#x4F7F;&#x7528; React &#x8F83;&#x4E3A;&#x7B80;&#x5355;&#x3002;&#x800C;&#x5728; Vue &#x7684;&#x65B9;&#x6848;&#x9009;&#x62E9;&#x4E0A;&#xFF0C;fork &#x6E90;&#x7801;&#x4FEE;&#x6539;&#x7684;&#x65B9;&#x5F0F;&#x53CD;&#x800C;&#x662F;&#x5411;&#x540E;&#x517C;&#x5BB9;&#x6027;&#x8F83;&#x597D;&#x7684;&#x65B9;&#x6848;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析 React / Vue 跨端渲染原理与实现

## 原文链接
[https://segmentfault.com/a/1190000016641830](https://segmentfault.com/a/1190000016641830)


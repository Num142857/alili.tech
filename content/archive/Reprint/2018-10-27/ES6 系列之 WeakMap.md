---
title: ES6 系列之 WeakMap
reprint: true
categories: reprint
abbrlink: b5caf17c
date: 2018-10-27 02:30:17
---

{{% raw %}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x6211;&#x4EEC;&#x5148;&#x4ECE; WeakMap &#x7684;&#x7279;&#x6027;&#x8BF4;&#x8D77;&#xFF0C;&#x7136;&#x540E;&#x804A;&#x804A; WeakMap &#x7684;&#x4E00;&#x4E9B;&#x5E94;&#x7528;&#x573A;&#x666F;&#x3002;</p><h2 id="articleHeader1">&#x7279;&#x6027;</h2><h3 id="articleHeader2">1. WeakMap &#x53EA;&#x63A5;&#x53D7;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x952E;&#x540D;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = new WeakMap();
map.set(1, 2);
// TypeError: Invalid value used as weak map key
map.set(null, 2);
// TypeError: Invalid value used as weak map key" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
map.set(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
<span class="hljs-comment">// TypeError: Invalid value used as weak map key</span>
map.set(<span class="hljs-literal">null</span>, <span class="hljs-number">2</span>);
<span class="hljs-comment">// TypeError: Invalid value used as weak map key</span></code></pre><h3 id="articleHeader3">2. WeakMap &#x7684;&#x952E;&#x540D;&#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x662F;&#x5F31;&#x5F15;&#x7528;</h3><p>&#x8FD9;&#x53E5;&#x8BDD;&#x5176;&#x5B9E;&#x8BA9;&#x6211;&#x975E;&#x5E38;&#x8D39;&#x89E3;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x53E5;&#x8BDD;&#x771F;&#x6B63;&#x60F3;&#x8868;&#x8FBE;&#x7684;&#x610F;&#x601D;&#x5E94;&#x8BE5;&#x662F;&#xFF1A;</p><blockquote>WeakMaps hold &quot;weak&quot; references to key objects,</blockquote><p>&#x7FFB;&#x8BD1;&#x8FC7;&#x6765;&#x5E94;&#x8BE5;&#x662F; WeakMaps &#x4FDD;&#x6301;&#x4E86;&#x5BF9;&#x952E;&#x540D;&#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5F31;&#x5F15;&#x7528;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x804A;&#x804A;&#x5F31;&#x5F15;&#x7528;&#xFF1A;</p><blockquote>&#x5728;&#x8BA1;&#x7B97;&#x673A;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x4E2D;&#xFF0C;&#x5F31;&#x5F15;&#x7528;&#x4E0E;&#x5F3A;&#x5F15;&#x7528;&#x76F8;&#x5BF9;&#xFF0C;&#x662F;&#x6307;&#x4E0D;&#x80FD;&#x786E;&#x4FDD;&#x5176;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x4E0D;&#x4F1A;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x56DE;&#x6536;&#x7684;&#x5F15;&#x7528;&#x3002; &#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x82E5;&#x53EA;&#x88AB;&#x5F31;&#x5F15;&#x7528;&#x6240;&#x5F15;&#x7528;&#xFF0C;&#x5219;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x4E0D;&#x53EF;&#x8BBF;&#x95EE;&#xFF08;&#x6216;&#x5F31;&#x53EF;&#x8BBF;&#x95EE;&#xFF09;&#x7684;&#xFF0C;&#x5E76;&#x56E0;&#x6B64;&#x53EF;&#x80FD;&#x5728;&#x4EFB;&#x4F55;&#x65F6;&#x523B;&#x88AB;&#x56DE;&#x6536;&#x3002;</blockquote><p>&#x5728; JavaScript &#x4E2D;&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x90FD;&#x662F;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x5F3A;&#x5F15;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();</code></pre><p>&#x53EA;&#x6709;&#x5F53;&#x6211;&#x4EEC;&#x624B;&#x52A8;&#x8BBE;&#x7F6E; <code>obj = null</code> &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x6709;&#x53EF;&#x80FD;&#x56DE;&#x6536; obj &#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x80FD;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5F31;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5047;&#x8BBE;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;
var obj = new WeakObject();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5047;&#x8BBE;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;</span>
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> WeakObject();</code></pre><p>&#x6211;&#x4EEC;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x7528;&#x505A;&#xFF0C;&#x53EA;&#x7528;&#x9759;&#x9759;&#x7684;&#x7B49;&#x5F85;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x6267;&#x884C;&#xFF0C;obj &#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x5C31;&#x4F1A;&#x88AB;&#x56DE;&#x6536;&#x3002;</p><p>&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x53E5;&#xFF1A;</p><blockquote>WeakMaps &#x4FDD;&#x6301;&#x4E86;&#x5BF9;&#x952E;&#x540D;&#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5F31;&#x5F15;&#x7528;</blockquote><p>&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const key = new Array(5 * 1024 * 1024);
const arr = [
  [key, 1]
];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
<span class="hljs-keyword">const</span> arr = [
  [key, <span class="hljs-number">1</span>]
];</code></pre><p>&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x5176;&#x5B9E;&#x5EFA;&#x7ACB;&#x4E86; arr &#x5BF9; key &#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;(&#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x8FD9;&#x4E2A;&#x771F;&#x6B63;&#x7684;&#x5BF9;&#x8C61;&#x53EB; Obj)&#x7684;&#x5F3A;&#x5F15;&#x7528;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5F53;&#x4F60;&#x8BBE;&#x7F6E; <code>key = null</code> &#x65F6;&#xFF0C;&#x53EA;&#x662F;&#x53BB;&#x6389;&#x4E86; key &#x5BF9; Obj &#x7684;&#x5F3A;&#x5F15;&#x7528;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x53BB;&#x9664; arr &#x5BF9; Obj &#x7684;&#x5F3A;&#x5F15;&#x7528;&#xFF0C;&#x6240;&#x4EE5; Obj &#x8FD8;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;&#x56DE;&#x6536;&#x6389;&#x3002;</p><p>Map &#x7C7B;&#x578B;&#x4E5F;&#x662F;&#x7C7B;&#x4F3C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map();
let key = new Array(5 * 1024 * 1024);

// &#x5EFA;&#x7ACB;&#x4E86; map &#x5BF9; key &#x6240;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x5F3A;&#x5F15;&#x7528;
map.set(key, 1);
// key = null &#x4E0D;&#x4F1A;&#x5BFC;&#x81F4; key &#x7684;&#x539F;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x88AB;&#x56DE;&#x6536;
key = null;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">let</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);

<span class="hljs-comment">// &#x5EFA;&#x7ACB;&#x4E86; map &#x5BF9; key &#x6240;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x5F3A;&#x5F15;&#x7528;</span>
map.set(key, <span class="hljs-number">1</span>);
<span class="hljs-comment">// key = null &#x4E0D;&#x4F1A;&#x5BFC;&#x81F4; key &#x7684;&#x539F;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x88AB;&#x56DE;&#x6536;</span>
key = <span class="hljs-literal">null</span>;</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; Node &#x6765;&#x8BC1;&#x660E;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5141;&#x8BB8;&#x624B;&#x52A8;&#x6267;&#x884C;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;
node --expose-gc

global.gc();
// &#x8FD4;&#x56DE; Nodejs &#x7684;&#x5185;&#x5B58;&#x5360;&#x7528;&#x60C5;&#x51B5;&#xFF0C;&#x5355;&#x4F4D;&#x662F; bytes
process.memoryUsage(); // heapUsed: 4640360 &#x2248; 4.4M

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
global.gc();
process.memoryUsage(); // heapUsed: 46751472 &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x5927;&#x7EA6;&#x662F; 44.6M

key = null;
global.gc();
process.memoryUsage(); // heapUsed: 46754648 &#x2248; 44.6M

// &#x8FD9;&#x53E5;&#x8BDD;&#x5176;&#x5B9E;&#x662F;&#x65E0;&#x7528;&#x7684;&#xFF0C;&#x56E0;&#x4E3A; key &#x5DF2;&#x7ECF;&#x662F; null &#x4E86;
map.delete(key);
global.gc();
process.memoryUsage(); // heapUsed: 46755856 &#x2248; 44.6M" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5141;&#x8BB8;&#x624B;&#x52A8;&#x6267;&#x884C;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;</span>
node --expose-gc

global.gc();
<span class="hljs-comment">// &#x8FD4;&#x56DE; Nodejs &#x7684;&#x5185;&#x5B58;&#x5360;&#x7528;&#x60C5;&#x51B5;&#xFF0C;&#x5355;&#x4F4D;&#x662F; bytes</span>
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 4640360 &#x2248; 4.4M</span>

<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">let</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
map.set(key, <span class="hljs-number">1</span>);
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 46751472 &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x5927;&#x7EA6;&#x662F; 44.6M</span>

key = <span class="hljs-literal">null</span>;
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 46754648 &#x2248; 44.6M</span>

<span class="hljs-comment">// &#x8FD9;&#x53E5;&#x8BDD;&#x5176;&#x5B9E;&#x662F;&#x65E0;&#x7528;&#x7684;&#xFF0C;&#x56E0;&#x4E3A; key &#x5DF2;&#x7ECF;&#x662F; null &#x4E86;</span>
map.delete(key);
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 46755856 &#x2248; 44.6M</span></code></pre><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8981;&#x8BA9; Obj &#x88AB;&#x56DE;&#x6536;&#x6389;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5148; <code>delete(key)</code> &#x7136;&#x540E;&#x518D; <code>key = null</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
map.delete(key);
key = null;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">let</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
map.set(key, <span class="hljs-number">1</span>);
map.delete(key);
key = <span class="hljs-literal">null</span>;</code></pre><p>&#x6211;&#x4EEC;&#x4F9D;&#x7136;&#x901A;&#x8FC7; Node &#x8BC1;&#x660E;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --expose-gc

global.gc();
process.memoryUsage(); // heapUsed: 4638376 &#x2248; 4.4M

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
global.gc();
process.memoryUsage(); // heapUsed: 46727816 &#x2248; 44.6M

map.delete(key);
global.gc();
process.memoryUsage(); // heapUsed: 46748352 &#x2248; 44.6M

key = null;
global.gc();
process.memoryUsage(); // heapUsed: 4808064 &#x2248; 4.6M" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">node --expose-gc

global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 4638376 &#x2248; 4.4M</span>

<span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">let</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
map.set(key, <span class="hljs-number">1</span>);
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 46727816 &#x2248; 44.6M</span>

map.delete(key);
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 46748352 &#x2248; 44.6M</span>

key = <span class="hljs-literal">null</span>;
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 4808064 &#x2248; 4.6M</span></code></pre><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x8981;&#x8BF4;&#x5230; WeakMap &#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
key = null;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> wm = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
<span class="hljs-keyword">let</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
wm.set(key, <span class="hljs-number">1</span>);
key = <span class="hljs-literal">null</span>;</code></pre><p>&#x5F53;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E; <code>wm.set(key, 1)</code> &#x65F6;&#xFF0C;&#x5176;&#x5B9E;&#x5EFA;&#x7ACB;&#x4E86; wm &#x5BF9; key &#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5F31;&#x5F15;&#x7528;&#xFF0C;&#x4F46;&#x56E0;&#x4E3A; <code>let key = new Array(5 * 1024 * 1024)</code> &#x5EFA;&#x7ACB;&#x4E86; key &#x5BF9;&#x6240;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x5F3A;&#x5F15;&#x7528;&#xFF0C;&#x88AB;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x5E76;&#x4E0D;&#x4F1A;&#x88AB;&#x56DE;&#x6536;&#xFF0C;&#x4F46;&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E; <code>key = null</code> &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x53EA;&#x6709; wm &#x5BF9;&#x6240;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x5F31;&#x5F15;&#x7528;&#xFF0C;&#x4E0B;&#x6B21;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BE5;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x5C31;&#x4F1A;&#x88AB;&#x56DE;&#x6536;&#x6389;&#x3002;</p><p>&#x6211;&#x4EEC;&#x7528; Node &#x8BC1;&#x660E;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --expose-gc

global.gc();
process.memoryUsage(); // heapUsed: 4638992 &#x2248; 4.4M

const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
global.gc();
process.memoryUsage(); // heapUsed: 46776176 &#x2248; 44.6M

key = null;
global.gc();
process.memoryUsage(); // heapUsed: 4800792 &#x2248; 4.6M" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">node --expose-gc

global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 4638992 &#x2248; 4.4M</span>

<span class="hljs-keyword">const</span> wm = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
<span class="hljs-keyword">let</span> key = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
wm.set(key, <span class="hljs-number">1</span>);
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 46776176 &#x2248; 44.6M</span>

key = <span class="hljs-literal">null</span>;
global.gc();
process.memoryUsage(); <span class="hljs-comment">// heapUsed: 4800792 &#x2248; 4.6M</span></code></pre><p>&#x6240;&#x4EE5; WeakMap &#x53EF;&#x4EE5;&#x5E2E;&#x4F60;&#x7701;&#x6389;&#x624B;&#x52A8;&#x5220;&#x9664;&#x5BF9;&#x8C61;&#x5173;&#x8054;&#x6570;&#x636E;&#x7684;&#x6B65;&#x9AA4;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x4F60;&#x4E0D;&#x80FD;&#x6216;&#x8005;&#x4E0D;&#x60F3;&#x63A7;&#x5236;&#x5173;&#x8054;&#x6570;&#x636E;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x4F7F;&#x7528; WeakMap&#x3002;</p><p>&#x603B;&#x7ED3;&#x8FD9;&#x4E2A;&#x5F31;&#x5F15;&#x7528;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x5C31;&#x662F; WeakMaps &#x4FDD;&#x6301;&#x4E86;&#x5BF9;&#x952E;&#x540D;&#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5F31;&#x5F15;&#x7528;&#xFF0C;&#x5373;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x4E0D;&#x5C06;&#x8BE5;&#x5F15;&#x7528;&#x8003;&#x8651;&#x5728;&#x5185;&#x3002;&#x53EA;&#x8981;&#x6240;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5176;&#x4ED6;&#x5F15;&#x7528;&#x90FD;&#x88AB;&#x6E05;&#x9664;&#xFF0C;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x5C31;&#x4F1A;&#x91CA;&#x653E;&#x8BE5;&#x5BF9;&#x8C61;&#x6240;&#x5360;&#x7528;&#x7684;&#x5185;&#x5B58;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4E00;&#x65E6;&#x4E0D;&#x518D;&#x9700;&#x8981;&#xFF0C;WeakMap &#x91CC;&#x9762;&#x7684;&#x952E;&#x540D;&#x5BF9;&#x8C61;&#x548C;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x952E;&#x503C;&#x5BF9;&#x4F1A;&#x81EA;&#x52A8;&#x6D88;&#x5931;&#xFF0C;&#x4E0D;&#x7528;&#x624B;&#x52A8;&#x5220;&#x9664;&#x5F15;&#x7528;&#x3002;</p><p>&#x4E5F;&#x6B63;&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x7684;&#x7279;&#x6027;&#xFF0C;WeakMap &#x5185;&#x90E8;&#x6709;&#x591A;&#x5C11;&#x4E2A;&#x6210;&#x5458;&#xFF0C;&#x53D6;&#x51B3;&#x4E8E;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x6709;&#x6CA1;&#x6709;&#x8FD0;&#x884C;&#xFF0C;&#x8FD0;&#x884C;&#x524D;&#x540E;&#x5F88;&#x53EF;&#x80FD;&#x6210;&#x5458;&#x4E2A;&#x6570;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x800C;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x4F55;&#x65F6;&#x8FD0;&#x884C;&#x662F;&#x4E0D;&#x53EF;&#x9884;&#x6D4B;&#x7684;&#xFF0C;&#x56E0;&#x6B64; ES6 &#x89C4;&#x5B9A; WeakMap &#x4E0D;&#x53EF;&#x904D;&#x5386;&#x3002;</p><p>&#x6240;&#x4EE5; WeakMap &#x4E0D;&#x50CF; Map&#xFF0C;&#x4E00;&#x662F;&#x6CA1;&#x6709;&#x904D;&#x5386;&#x64CD;&#x4F5C;&#xFF08;&#x5373;&#x6CA1;&#x6709;keys()&#x3001;values()&#x548C;entries()&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709; size &#x5C5E;&#x6027;&#xFF0C;&#x4E5F;&#x4E0D;&#x652F;&#x6301; clear &#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5; WeakMap&#x53EA;&#x6709;&#x56DB;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x7528;&#xFF1A;get()&#x3001;set()&#x3001;has()&#x3001;delete()&#x3002;</p><h2 id="articleHeader4">&#x5E94;&#x7528;</h2><h3 id="articleHeader5">1. &#x5728; DOM &#x5BF9;&#x8C61;&#x4E0A;&#x4FDD;&#x5B58;&#x76F8;&#x5173;&#x6570;&#x636E;</h3><p>&#x4F20;&#x7EDF;&#x4F7F;&#x7528; jQuery &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x901A;&#x8FC7; $.data() &#x65B9;&#x6CD5;&#x5728; DOM &#x5BF9;&#x8C61;&#x4E0A;&#x50A8;&#x5B58;&#x76F8;&#x5173;&#x4FE1;&#x606F;(&#x5C31;&#x6BD4;&#x5982;&#x5728;&#x5220;&#x9664;&#x6309;&#x94AE;&#x5143;&#x7D20;&#x4E0A;&#x50A8;&#x5B58;&#x5E16;&#x5B50;&#x7684; ID &#x4FE1;&#x606F;)&#xFF0C;jQuery &#x5185;&#x90E8;&#x4F1A;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7BA1;&#x7406; DOM &#x548C;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5F53;&#x4F60;&#x5C06; DOM &#x5143;&#x7D20;&#x5220;&#x9664;&#xFF0C;DOM &#x5BF9;&#x8C61;&#x7F6E;&#x4E3A;&#x7A7A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F8;&#x5173;&#x8054;&#x7684;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x4F1A;&#x88AB;&#x5220;&#x9664;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x624B;&#x52A8;&#x6267;&#x884C; $.removeData() &#x65B9;&#x6CD5;&#x624D;&#x80FD;&#x5220;&#x9664;&#x6389;&#x76F8;&#x5173;&#x8054;&#x7684;&#x6570;&#x636E;&#xFF0C;WeakMap &#x5C31;&#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x8FD9;&#x4E00;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let wm = new WeakMap(), element = document.querySelector(&quot;.element&quot;);
wm.set(element, &quot;data&quot;);

let value = wm.get(elemet);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> wm = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>(), element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.element&quot;</span>);
wm.set(element, <span class="hljs-string">&quot;data&quot;</span>);

<span class="hljs-keyword">let</span> value = wm.get(elemet);
<span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// data</span>

element.parentNode.removeChild(element);
element = <span class="hljs-literal">null</span>;</code></pre><h3 id="articleHeader6">2. &#x6570;&#x636E;&#x7F13;&#x5B58;</h3><p>&#x4ECE;&#x4E0A;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5173;&#x8054;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x636E;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x4E0D;&#x4FEE;&#x6539;&#x539F;&#x6709;&#x5BF9;&#x8C61;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x50A8;&#x5B58;&#x67D0;&#x4E9B;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x6839;&#x636E;&#x5BF9;&#x8C61;&#x50A8;&#x5B58;&#x4E00;&#x4E9B;&#x8BA1;&#x7B97;&#x7684;&#x503C;&#x7B49;&#xFF0C;&#x800C;&#x53C8;&#x4E0D;&#x60F3;&#x7BA1;&#x7406;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x7684;&#x6B7B;&#x6D3B;&#x65F6;&#x975E;&#x5E38;&#x9002;&#x5408;&#x8003;&#x8651;&#x4F7F;&#x7528; WeakMap&#x3002;&#x6570;&#x636E;&#x7F13;&#x5B58;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x597D;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cache = new WeakMap();
function countOwnKeys(obj) {
    if (cache.has(obj)) {
        console.log(&apos;Cached&apos;);
        return cache.get(obj);
    } else {
        console.log(&apos;Computed&apos;);
        const count = Object.keys(obj).length;
        cache.set(obj, count);
        return count;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countOwnKeys</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (cache.has(obj)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Cached&apos;</span>);
        <span class="hljs-keyword">return</span> cache.get(obj);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Computed&apos;</span>);
        <span class="hljs-keyword">const</span> count = <span class="hljs-built_in">Object</span>.keys(obj).length;
        cache.set(obj, count);
        <span class="hljs-keyword">return</span> count;
    }
}</code></pre><h3 id="articleHeader7">3. &#x79C1;&#x6709;&#x5C5E;&#x6027;</h3><p>WeakMap &#x4E5F;&#x53EF;&#x4EE5;&#x88AB;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x8FC7;&#x5728; ES6 &#x4E2D;&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x591A;&#x79CD;&#xFF0C;&#x8FD9;&#x53EA;&#x662F;&#x5176;&#x4E2D;&#x4E00;&#x79CD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name: name, age: age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }
}

export default Person;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> privateData = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>(name, age) {
        privateData.set(<span class="hljs-keyword">this</span>, { <span class="hljs-attr">name</span>: name, <span class="hljs-attr">age</span>: age });
    }

    getName() {
        <span class="hljs-keyword">return</span> privateData.get(<span class="hljs-keyword">this</span>).name;
    }

    getAge() {
        <span class="hljs-keyword">return</span> privateData.get(<span class="hljs-keyword">this</span>).age;
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Person;</code></pre><h2 id="articleHeader8">ES6 &#x7CFB;&#x5217;</h2><p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p><p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之 WeakMap

## 原文链接
[https://segmentfault.com/a/1190000015774465](https://segmentfault.com/a/1190000015774465)


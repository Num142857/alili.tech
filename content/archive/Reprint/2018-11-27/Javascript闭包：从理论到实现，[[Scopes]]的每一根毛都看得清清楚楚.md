---
title: 'Javascript闭包：从理论到实现，[[Scopes]]的每一根毛都看得清清楚楚' 
date: 2018-11-27 2:30:13
hidden: true
slug: sjzgaptkbv
categories: [reprint]
---

{{< raw >}}
<p>&#x6628;&#x5929;&#x6211;&#x5199;&#x5230;&#x201C;<a href="https://segmentfault.com/a/1190000015304105">&#x6240;&#x6709;Javascript&#x51FD;&#x6570;&#x90FD;&#x662F;&#x95ED;&#x5305;</a>&#x201D;&#xFF0C;&#x6709;&#x4E9B;&#x540C;&#x5B66;&#x8868;&#x793A;&#x8FD8;&#x662F;&#x63A5;&#x53D7;&#x4E0D;&#x80FD;&#x3002;&#x6211;&#x597D;&#x597D;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x600E;&#x4E48;&#x5C31;&#x6210;&#x95ED;&#x5305;&#x4E86;&#xFF1F;&#x90A3;&#x4E48;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x63A2;&#x7A76;&#x4E00;&#x4E0B;&#xFF0C;Chrome&#xFF08;V8&#xFF09;&#x5230;&#x5E95;&#x662F;&#x600E;&#x6837;&#x5B9E;&#x73B0;&#x95ED;&#x5305;&#x7684;&#x3002;</p><h1 id="articleHeader0">&#x4ECE;&#x95ED;&#x5305;&#x5230;<code>[[Scopes]]</code></h1><p>&#x73B0;&#x5728;&#x6309;&#x4E0B;F12&#xFF0C;&#x6253;&#x5F00;console&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x968F;&#x4FBF;&#x627E;&#x4E00;&#x4E2A;&#x5B9E;&#x9A8C;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function simpleFunc() { }
// &lt;- undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">simpleFunc</span>(<span class="hljs-params"></span>) </span>{ }
<span class="hljs-comment">// &lt;- undefined</span></code></pre><p>&#x8D85;&#x7B80;&#x5355;&#x8D85;&#x6B63;&#x5E38;&#x7684;&#x51FD;&#x6570;&#x5427;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x9A8C;&#x8BC1;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="simpleFunc
// &lt;- &#x192; simpleFunc() { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">simpleFunc
<span class="hljs-comment">// &lt;- &#x192; simpleFunc() { }</span></code></pre><p>&#x8BF4;&#x4E86;&#x8D85;&#x6B63;&#x5E38;&#x7684;&#xFF0C;&#x54EA;&#x91CC;&#x95ED;&#x5305;&#x4E86;&#xFF1F;&#x73B0;&#x5728;&#x8BD5;&#x8BD5;&#x8FD9;&#x4E2A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.dir(simpleFunc)
// &#x192; simpleFunc()
//   arguments: null
//   caller: null
//   length: 0
//   name: &quot;simpleFunc&quot;
//   prototype: {constructor: &#x192;}
//   __proto__: &#x192; ()
//   [[FunctionLocation]]: VM000:1
//   [[Scopes]]: Scopes[1]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.dir(simpleFunc)
<span class="hljs-comment">// &#x192; simpleFunc()</span>
<span class="hljs-comment">//   arguments: null</span>
<span class="hljs-comment">//   caller: null</span>
<span class="hljs-comment">//   length: 0</span>
<span class="hljs-comment">//   name: &quot;simpleFunc&quot;</span>
<span class="hljs-comment">//   prototype: {constructor: &#x192;}</span>
<span class="hljs-comment">//   __proto__: &#x192; ()</span>
<span class="hljs-comment">//   [[FunctionLocation]]: VM000:1</span>
<span class="hljs-comment">//   [[Scopes]]: Scopes[1]</span></code></pre><p>&#x54A6;&#xFF0C;<code>[[Scopes]]</code>&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x6253;&#x5F00;&#x4E00;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//   [[Scopes]]: Scopes[1]
//     0: Global&#xA0;{type: &quot;global&quot;, name: &quot;&quot;, object: Window}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//   [[Scopes]]: Scopes[1]</span>
<span class="hljs-comment">//     0: Global&#xA0;{type: &quot;global&quot;, name: &quot;&quot;, object: Window}</span></code></pre><p>&#x8FD9;&#x5C31;&#x662F;&#x95ED;&#x5305;&#x7684;&#x5B9E;&#x73B0;&#x3002;&#x4E1C;&#x897F;&#x90FD;&#x5B58;&#x5728;&#x8FD9;&#x91CC;&#x4E86;&#x3002;&#x770B;&#x8D77;&#x6765;<code>simpleFunc</code>&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x7EAF;&#x6D01;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x5B83;&#x5B9E;&#x9645;&#x4E0A;&#x662F;<strong>&#xFF08;&#x7A7A;&#x7684;&#xFF09;&#x81EA;&#x8EAB;&#x4EE3;&#x7801;+&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x73AF;&#x5883;</strong>&#x3002;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x5B83;&#x6B63;&#x662F;&#x201C;&#x51FD;&#x6570;&#x548C;&#x58F0;&#x660E;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#x7684;&#x7EC4;&#x5408;&#x201D;&#x3002;</p><p>&#x518D;&#x6765;&#x4E2A;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x70B9;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let localVar = 1;
  function dirtyFunc() { return localVar++ }
}
// &lt;- &#x192; dirtyFunc() { return localVar++ }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-keyword">let</span> localVar = <span class="hljs-number">1</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dirtyFunc</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> localVar++ }
}
<span class="hljs-comment">// &lt;- &#x192; dirtyFunc() { return localVar++ }</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.dir(dirtyFunc)
// &#x192; dirtyFunc()
//   [[Scopes]]: Scopes[2]
//     0: Block
//       localVar: 1
//     1: Global {type: &quot;global&quot;, name: &quot;&quot;, object: Window}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.dir(dirtyFunc)
<span class="hljs-comment">// &#x192; dirtyFunc()</span>
<span class="hljs-comment">//   [[Scopes]]: Scopes[2]</span>
<span class="hljs-comment">//     0: Block</span>
<span class="hljs-comment">//       localVar: 1</span>
<span class="hljs-comment">//     1: Global {type: &quot;global&quot;, name: &quot;&quot;, object: Window}</span></code></pre><p>&#x770B;&#xFF0C;<code>localVar</code>&#x5B58;&#x5728;&#x8FD9;&#x91CC;&#x4E86;&#x5427;&#xFF01;&#x5927;&#x5BB6;&#x8001;&#x8BF4;&#x4EC0;&#x4E48;&#x201C;&#x4FDD;&#x6301;&#x8FD0;&#x884C;&#x7684;&#x6570;&#x636E;&#x72B6;&#x6001;&#x201D;&#x4E91;&#x4E91;&#xFF0C;&#x5176;&#x5B9E;&#x90FD;&#x5728;<code>[[Scopes]]</code>&#x91CC;&#x3002;<code>dirtyFunc</code>&#x770B;&#x8D77;&#x6765;&#x662F;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F46;<code>[[Scopes]]</code>&#x91CC;&#x5374;&#x6DF7;&#x4E86;&#x4E9B;&#x4E1C;&#x897F;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8BF4;&#x4EBA;&#x8BDD;&#xFF0C;&#x95ED;&#x5305;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x2014;&#x2014;</p><p><strong>&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;+<code>[[Scopes]]</code></strong></p><p>&#x8D85;&#x7EA7;&#x597D;&#x7406;&#x89E3;&#x4E86;&#x5427;&#x3002;</p><h1 id="articleHeader1">&#x5B81;&#x613F;&#x7528;<code>this</code>&#x4E5F;&#x4E0D;&#x7528;&#x95ED;&#x5305;</h1><p>&#x63A5;&#x4E0B;&#x6765;&#x8BA9;&#x6211;&#x4EEC;&#x5BF9;&#x95ED;&#x5305;&#x505A;&#x4E9B;&#x66F4;&#x6DF1;&#x5165;&#x7684;&#x89E3;&#x6790;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x5927;&#x5BB6;&#x5B81;&#x613F;&#x7528;<code>this</code>&#x4E5F;&#x4E0D;&#x7528;&#x95ED;&#x5305;&#x4E86;&#x3002;</p><h2 id="articleHeader2"><code>[[Scopes]]</code>&#x80FD;&#x7528;&#x4EE3;&#x7801;&#x8BBF;&#x95EE;/&#x590D;&#x5236;/&#x4FEE;&#x6539;&#x5417;&#xFF1F;</h2><p>&#x4E0D;&#x80FD;&#x3002;&#x60F3;&#x4E0D;&#x9760;console&#xFF0C;&#x627E;&#x5230;&#x526F;&#x4F5C;&#x7528;&#x5728;&#x54EA;&#x513F;&#xFF1F;&#x4E0D;&#x884C;&#x3002;&#x60F3;&#x6DF1;&#x62F7;&#x8D1D;&#x76EE;&#x524D;&#x72B6;&#x6001;&#xFF1F;&#x4E0D;&#x884C;&#x3002;&#x60F3;&#x5386;&#x53F2;&#x56DE;&#x653E;&#xFF1F;&#x4E0D;&#x884C;&#x3002;debug&#xFF1F;&#x81EA;&#x5DF1;&#x6162;&#x6162;&#x7422;&#x78E8;&#x53BB;&#x5427;&#xFF01;</p><h2 id="articleHeader3">&#x95ED;&#x5305;&#x4F1A;&#x628A;&#x6240;&#x6709;&#x4E1C;&#x897F;&#x90FD;&#x5B58;&#x4E0B;&#x6765;&#x5417;&#xFF1F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let localVar = 1;
  let unusedVar = 2;
  function dirtyFunc2() { return localVar++ }
}
console.dir(dirtyFunc2)
// &#x192; dirtyFunc()
//   [[Scopes]]: Scopes[2]
//     0: Block
//       localVar: 1
//     1: Global {type: &quot;global&quot;, name: &quot;&quot;, object: Window}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-keyword">let</span> localVar = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">let</span> unusedVar = <span class="hljs-number">2</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dirtyFunc2</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> localVar++ }
}
<span class="hljs-built_in">console</span>.dir(dirtyFunc2)
<span class="hljs-comment">// &#x192; dirtyFunc()</span>
<span class="hljs-comment">//   [[Scopes]]: Scopes[2]</span>
<span class="hljs-comment">//     0: Block</span>
<span class="hljs-comment">//       localVar: 1</span>
<span class="hljs-comment">//     1: Global {type: &quot;global&quot;, name: &quot;&quot;, object: Window}</span></code></pre><p>&#x81F3;&#x5C11;Chrome&#x662F;&#x4E0D;&#x4F1A;&#x628A;&#x6240;&#x6709;&#x4E1C;&#x897F;&#x90FD;&#x585E;&#x5230;&#x95ED;&#x5305;&#x91CC;&#x7684;&#x3002;</p><h2 id="articleHeader4">&#x90A3;&#x95ED;&#x5305;&#x5BF9;&#x5783;&#x573E;&#x56DE;&#x6536;&#x6CA1;&#x5BB3;&#x5904;&#xFF1F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let localVar = new Uint8Array(1000000000)
  function dirtyFunc3() { return localVar }
  function cleanFunc() { }
}
var dirtyFunc3 = null
console.dir(cleanFunc)
// &#x192; cleanFunc()
//   [[Scopes]]: Scopes[2]
//     0: Block
//       localVar: Uint8Array(1000000000) [0, 0, &#x2026;]
//     1: Global {type: &quot;global&quot;, name: &quot;&quot;, object: Window}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-keyword">let</span> localVar = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(<span class="hljs-number">1000000000</span>)
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dirtyFunc3</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> localVar }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanFunc</span>(<span class="hljs-params"></span>) </span>{ }
}
<span class="hljs-keyword">var</span> dirtyFunc3 = <span class="hljs-literal">null</span>
<span class="hljs-built_in">console</span>.dir(cleanFunc)
<span class="hljs-comment">// &#x192; cleanFunc()</span>
<span class="hljs-comment">//   [[Scopes]]: Scopes[2]</span>
<span class="hljs-comment">//     0: Block</span>
<span class="hljs-comment">//       localVar: Uint8Array(1000000000) [0, 0, &#x2026;]</span>
<span class="hljs-comment">//     1: Global {type: &quot;global&quot;, name: &quot;&quot;, object: Window}</span></code></pre><p><code>dirtyFunc3</code>&#x548C;<code>cleanFunc</code>&#x5171;&#x4EAB;&#x540C;&#x4E00;&#x4E2A;<code>[[Scopes]]</code>&#x9879;&#xFF0C;<strong>&#x4F46;&#x8FD9;&#x4E2A;<code>[[Scopes]]</code>&#x9879;&#x5E76;&#x4E0D;&#x4F1A;&#x56E0;&#x4E3A;<code>dirtyFunc3</code>&#x88AB;&#x56DE;&#x6536;&#x800C;&#x52A8;&#x6001;&#x66F4;&#x65B0;&#xFF01;</strong>&#x6240;&#x4EE5;&#x65E0;&#x8F9C;&#x7684;<code>cleanFunc</code>&#x5C31;&#x53EA;&#x597D;&#x4E00;&#x76F4;&#x5E26;&#x7740;&#x8FD9;1GB&#x7684;&#x5783;&#x573E;&#xFF0C;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x59A5;&#x59A5;&#x7684;&#x3002;&#x4F5C;&#x4E3A;&#x5F3A;&#x8FEB;&#x75C7;&#xFF0C;&#x8FD9;&#x662F;&#x6211;&#x8BA8;&#x538C;&#x95ED;&#x5305;&#x6700;&#x91CD;&#x8981;&#x7684;&#x539F;&#x56E0;&#x3002;</p><h2 id="articleHeader5">&#x771F;&#x7684;&#x6240;&#x6709;Javascript&#x51FD;&#x6570;&#x90FD;&#x662F;&#x95ED;&#x5305;&#x5417;&#xFF1F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.dir(alert)
// &#x192; dirtyFunc()
//   [[Scopes]]: Scopes[0]
//     No properties" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.dir(alert)
<span class="hljs-comment">// &#x192; dirtyFunc()</span>
<span class="hljs-comment">//   [[Scopes]]: Scopes[0]</span>
<span class="hljs-comment">//     No properties</span></code></pre><p>&#x62B1;&#x6B49;&#xFF0C;&#x6211;&#x53EF;&#x80FD;&#x662F;&#x4E0D;&#x592A;&#x4E25;&#x8C28;&#x3002;&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x81EA;&#x5E26;&#x7684;&#x539F;&#x751F;API&#x51FD;&#x6570;&#x90FD;&#x662F;&#x5728;&#x3010;&#x91CC;&#x4E16;&#x754C;&#x3011;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6CA1;&#x6709;&#x8BCD;&#x6CD5;&#x73AF;&#x5883;&#xFF0C;&#x81EA;&#x7136;<code>[[Scopes]]</code>&#x662F;&#x7A7A;&#x7684;&#x3002;&#x5B83;&#x4EEC;&#x4E0D;&#x662F;&#x95ED;&#x5305;&#x3002;</p><h1 id="articleHeader6">&#x6700;&#x4F73;&#x5B9E;&#x8DF5;</h1><p>&#x5B81;&#x613F;&#x7528;<code>this</code>&#x4E5F;&#x4E0D;&#x7528;&#x95ED;&#x5305;&#x3002;&#x539F;&#x56E0;&#x8BE6;&#x89C1;&#x6211;&#x7684;&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#xFF08;&#x4ECE;&#x8FC7;&#x7A0B;&#x5F0F;&#x5230;&#x51FD;&#x6570;&#x5F0F;&#xFF09;&#x3002;</p><h1 id="articleHeader7">&#x6211;&#x7684;&#x76F8;&#x5173;&#x6587;&#x7AE0;</h1><p><a href="https://segmentfault.com/a/1190000015304105" target="_blank">Javascript&#x95ED;&#x5305;&#xFF1A;&#x4ECE;&#x8FC7;&#x7A0B;&#x5F0F;&#x5230;&#x51FD;&#x6570;&#x5F0F;</a></p><p>&#x4EE5;&#x4E0A;&#x6240;&#x6709;&#x4EE3;&#x7801;&#x6309;<a href="https://mozilla.org/MPL/2.0/" rel="nofollow noreferrer" target="_blank">Mozilla Public License, v. 2.0</a>&#x6388;&#x6743;&#x3002;<br>&#x4EE5;&#x4E0A;&#x6240;&#x6709;&#x6587;&#x5B57;&#x5185;&#x5BB9;&#x6309;<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" rel="nofollow noreferrer" target="_blank">CC BY-NC-ND 4.0</a>&#x6388;&#x6743;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript闭包：从理论到实现，[[Scopes]]的每一根毛都看得清清楚楚

## 原文链接
[https://segmentfault.com/a/1190000015311755](https://segmentfault.com/a/1190000015311755)


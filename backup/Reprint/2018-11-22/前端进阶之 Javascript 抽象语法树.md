---
title: '前端进阶之 Javascript 抽象语法树' 
date: 2018-11-22 11:48:10
hidden: true
slug: cxxuuwtcp5
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#x6587;&#x7AE0;&#xFF0C;&#x6B22;&#x8FCE; Star <a href="https://github.com/Pines-Cheng/blog/issues" rel="nofollow noreferrer" target="_blank">Github/Blog</a></blockquote><h2 id="articleHeader0">Babel &#x4E0E; Babylon</h2><p><strong><a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">Babel</a> &#x662F; JavaScript &#x7F16;&#x8BD1;&#x5668; compiler</strong>&#xFF0C;&#x66F4;&#x786E;&#x5207;&#x5730;&#x8BF4;&#x662F;&#x6E90;&#x7801;&#x5230;&#x6E90;&#x7801;&#x7684;&#x7F16;&#x8BD1;&#x5668;&#xFF0C;&#x901A;&#x5E38;&#x4E5F;&#x53EB;&#x505A; <code>&#x8F6C;&#x6362;&#x7F16;&#x8BD1;&#x5668;&#xFF08;transpiler&#xFF09;</code>&#x3002; &#x610F;&#x601D;&#x662F;&#x8BF4;&#x4F60;&#x4E3A; Babel &#x63D0;&#x4F9B;&#x4E00;&#x4E9B; JavaScript &#x4EE3;&#x7801;&#xFF0C;Babel &#x66F4;&#x6539;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x7ED9;&#x4F60;&#x65B0;&#x751F;&#x6210;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><blockquote>Babel &#x662F;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x591A;&#x529F;&#x80FD;&#x7684; JavaScript &#x7F16;&#x8BD1;&#x5668;&#x3002;&#x6B64;&#x5916;&#x5B83;&#x8FD8;&#x62E5;&#x6709;&#x4F17;&#x591A;&#x6A21;&#x5757;&#x53EF;&#x7528;&#x4E8E;&#x4E0D;&#x540C;&#x5F62;&#x5F0F;&#x7684;&#x9759;&#x6001;&#x5206;&#x6790;&#x3002;<p>&#x9759;&#x6001;&#x5206;&#x6790;&#x662F;&#x5728;&#x4E0D;&#x9700;&#x8981;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#x5BF9;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x7684;&#x5904;&#x7406;&#x8FC7;&#x7A0B; &#xFF08;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x540C;&#x65F6;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5206;&#x6790;&#x5373;&#x662F;&#x52A8;&#x6001;&#x5206;&#x6790;&#xFF09;&#x3002; &#x9759;&#x6001;&#x5206;&#x6790;&#x7684;&#x76EE;&#x7684;&#x662F;&#x591A;&#x79CD;&#x591A;&#x6837;&#x7684;&#xFF0C; &#x5B83;&#x53EF;&#x7528;&#x4E8E;&#x8BED;&#x6CD5;&#x68C0;&#x67E5;&#xFF0C;&#x7F16;&#x8BD1;&#xFF0C;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#xFF0C;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#xFF0C;&#x4F18;&#x5316;&#xFF0C;&#x538B;&#x7F29;&#x7B49;&#x7B49;&#x573A;&#x666F;&#x3002;</p></blockquote><p><strong><a href="https://github.com/babel/babylon" rel="nofollow noreferrer" target="_blank">Babylon</a> &#x662F; Babel &#x7684;&#x89E3;&#x6790;&#x5668; parser</strong>&#x3002;&#x6700;&#x521D;&#x662F; &#x4ECE; Acorn &#x9879;&#x76EE; fork &#x51FA;&#x6765;&#x7684;&#x3002;Acorn &#x975E;&#x5E38;&#x5FEB;&#xFF0C;&#x6613;&#x4E8E;&#x4F7F;&#x7528;&#xFF0C;&#x5E76;&#x4E14;&#x9488;&#x5BF9;&#x975E;&#x6807;&#x51C6;&#x7279;&#x6027;(&#x4EE5;&#x53CA;&#x90A3;&#x4E9B;&#x672A;&#x6765;&#x7684;&#x6807;&#x51C6;&#x7279;&#x6027;) &#x8BBE;&#x8BA1;&#x4E86;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;&#x63D2;&#x4EF6;&#x7684;&#x67B6;&#x6784;&#x3002;</p><blockquote>Babylon &#x5DF2;&#x7ECF;&#x79FB;&#x5165; Babel mono-repo &#x66F4;&#x540D;&#x4E3A; <a href="https://github.com/babel/babel/tree/master/packages/babel-parser" rel="nofollow noreferrer" target="_blank">babel-parser</a></blockquote><p><span class="img-wrap"><img data-src="https://user-images.githubusercontent.com/9441951/42747697-0824bd88-8910-11e8-849a-9f2ccd91f82c.png" src="https://static.alili.techhttps://user-images.githubusercontent.com/9441951/42747697-0824bd88-8910-11e8-849a-9f2ccd91f82c.png" alt="baimage" title="baimage" style="cursor:pointer"></span></p><p>&#x9996;&#x5148;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x5B89;&#x88C5;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save babylon" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code class="shell" style="word-break:break-word;white-space:initial">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babylon</span></code></pre><p>&#x5148;&#x4ECE;&#x89E3;&#x6790;&#x4E00;&#x4E2A;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x5F00;&#x59CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as babylon from &quot;babylon&quot;;

const code = `function square(n) {
  return n * n;
}`;

babylon.parse(code);
// Node {
//   type: &quot;File&quot;,
//   start: 0,
//   end: 38,
//   loc: SourceLocation {...},
//   program: Node {...},
//   comments: [],
//   tokens: [...]
// }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> babylon <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;babylon&quot;</span>;

<span class="hljs-keyword">const</span> code = <span class="hljs-string">`function square(n) {
  return n * n;
}`</span>;

babylon.parse(code);
<span class="hljs-comment">// Node {</span>
<span class="hljs-comment">//   type: &quot;File&quot;,</span>
<span class="hljs-comment">//   start: 0,</span>
<span class="hljs-comment">//   end: 38,</span>
<span class="hljs-comment">//   loc: SourceLocation {...},</span>
<span class="hljs-comment">//   program: Node {...},</span>
<span class="hljs-comment">//   comments: [],</span>
<span class="hljs-comment">//   tokens: [...]</span>
<span class="hljs-comment">// }</span></code></pre><p>&#x6211;&#x4EEC;&#x8FD8;&#x80FD;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x4F20;&#x9012;&#x9009;&#x9879;&#x7ED9; <code>parse()</code>&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babylon.parse(code, {
  sourceType: &quot;module&quot;, // default: &quot;script&quot;
  plugins: [&quot;jsx&quot;] // default: []
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">babylon.parse(code, {
  <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&quot;module&quot;</span>, <span class="hljs-comment">// default: &quot;script&quot;</span>
  plugins: [<span class="hljs-string">&quot;jsx&quot;</span>] <span class="hljs-comment">// default: []</span>
});</code></pre><p><code>sourceType</code> &#x53EF;&#x4EE5;&#x662F; <code>&quot;module&quot;</code> &#x6216;&#x8005; <code>&quot;script&quot;</code>&#xFF0C;&#x5B83;&#x8868;&#x793A; Babylon &#x5E94;&#x8BE5;&#x7528;&#x54EA;&#x79CD;&#x6A21;&#x5F0F;&#x6765;&#x89E3;&#x6790;&#x3002; <code>&quot;module&quot;</code> &#x5C06;&#x4F1A;&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x89E3;&#x6790;&#x5E76;&#x4E14;&#x5141;&#x8BB8;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#xFF0C;<code>&quot;script&quot;</code> &#x5219;&#x4E0D;&#x4F1A;&#x3002;</p><blockquote><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> <code>sourceType</code> &#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x662F; <code>&quot;script&quot;</code> &#x5E76;&#x4E14;&#x5728;&#x53D1;&#x73B0; <code>import</code> &#x6216; <code>export</code> &#x65F6;&#x4EA7;&#x751F;&#x9519;&#x8BEF;&#x3002; &#x4F7F;&#x7528; <code>scourceType: &quot;module&quot;</code> &#x6765;&#x907F;&#x514D;&#x8FD9;&#x4E9B;&#x9519;&#x8BEF;&#x3002;</blockquote><p>&#x7531;&#x4E8E; Babylon &#x4F7F;&#x7528;&#x4E86;&#x57FA;&#x4E8E;&#x63D2;&#x4EF6;&#x7684;&#x67B6;&#x6784;&#xFF0C;&#x56E0;&#x6B64;&#x6709;&#x4E00;&#x4E2A; <code>plugins</code> &#x9009;&#x9879;&#x53EF;&#x4EE5;&#x5F00;&#x5173;&#x5185;&#x7F6E;&#x7684;&#x63D2;&#x4EF6;&#x3002; &#x6CE8;&#x610F; Babylon &#x5C1A;&#x672A;&#x5BF9;&#x5916;&#x90E8;&#x63D2;&#x4EF6;&#x5F00;&#x653E;&#x6B64; API &#x63A5;&#x53E3;&#xFF0C;&#x4E0D;&#x6392;&#x9664;&#x672A;&#x6765;&#x4F1A;&#x5F00;&#x653E;&#x6B64;API&#x3002;</p><h2 id="articleHeader1">&#x89E3;&#x6790;&#xFF08;Parse&#xFF09;</h2><p><strong>&#x89E3;&#x6790;</strong>&#xFF08;Parse &#xFF09;&#x6B65;&#x9AA4;&#x63A5;&#x6536;&#x4EE3;&#x7801;&#x5E76;&#x8F93;&#x51FA; <code>&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF08;AST&#xFF09;</code>&#x3002; &#x8FD9;&#x4E2A;&#x6B65;&#x9AA4;&#x5206;&#x4E3A;&#x4E24;&#x4E2A;&#x9636;&#x6BB5;&#xFF1A;<a href="https://en.wikipedia.org/wiki/Lexical_analysis" rel="nofollow noreferrer" target="_blank"><strong>&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#xFF08;Lexical Analysis&#xFF09; </strong></a>&#x548C; <a href="https://en.wikipedia.org/wiki/Parsing" rel="nofollow noreferrer" target="_blank"><strong>&#x8BED;&#x6CD5;&#x5206;&#x6790;&#xFF08;Syntactic Analysis&#xFF09;</strong></a>&#x3002;</p><h3 id="articleHeader2">&#x8BCD;&#x6CD5;&#x5206;&#x6790;</h3><p>&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#x9636;&#x6BB5;&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x7684;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x4E3A; <strong>&#x4EE4;&#x724C;&#xFF08;tokens&#xFF09;</strong> &#x6D41;&#x3002;</p><p>&#x4F60;&#x53EF;&#x4EE5;&#x628A;&#x4EE4;&#x724C;&#x770B;&#x4F5C;&#x662F;&#x4E00;&#x4E2A;&#x6241;&#x5E73;&#x7684;&#x8BED;&#x6CD5;&#x7247;&#x6BB5;&#x6570;&#x7EC4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="n * n;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">n</span> * <span class="hljs-built_in">n</span>;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { type: { ... }, value: &quot;n&quot;, start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: &quot;*&quot;, start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: &quot;n&quot;, start: 4, end: 5, loc: { ... } },
  ...
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[
  { <span class="hljs-attr">type</span>: { ... }, <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;n&quot;</span>, <span class="hljs-attr">start</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">end</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">loc</span>: { ... } },
  { <span class="hljs-attr">type</span>: { ... }, <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-attr">start</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">end</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">loc</span>: { ... } },
  { <span class="hljs-attr">type</span>: { ... }, <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;n&quot;</span>, <span class="hljs-attr">start</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">end</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">loc</span>: { ... } },
  ...
]</code></pre><p>&#x6BCF;&#x4E00;&#x4E2A; <code>type</code> &#x6709;&#x4E00;&#x7EC4;&#x5C5E;&#x6027;&#x6765;&#x63CF;&#x8FF0;&#x8BE5;&#x4EE4;&#x724C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: {
    label: &apos;name&apos;,
    keyword: undefined,
    beforeExpr: false,
    startsExpr: true,
    rightAssociative: false,
    isLoop: false,
    isAssign: false,
    prefix: false,
    postfix: false,
    binop: null,
    updateContext: null
  },
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  type: {
    label: &apos;name&apos;,
    keyword: undefined,
    beforeExpr: <span class="hljs-literal">false</span>,
    startsExpr: <span class="hljs-literal">true</span>,
    rightAssociative: <span class="hljs-literal">false</span>,
    isLoop: <span class="hljs-literal">false</span>,
    isAssign: <span class="hljs-literal">false</span>,
    prefix: <span class="hljs-literal">false</span>,
    postfix: <span class="hljs-literal">false</span>,
    binop: <span class="hljs-literal">null</span>,
    updateContext: <span class="hljs-literal">null</span>
  },
  ...
}</code></pre><p>&#x548C; AST &#x8282;&#x70B9;&#x4E00;&#x6837;&#x5B83;&#x4EEC;&#x4E5F;&#x6709; <code>start</code>&#xFF0C;<code>end</code>&#xFF0C;<code>loc</code> &#x5C5E;&#x6027;&#x3002;</p><h3 id="articleHeader3">&#x8BED;&#x6CD5;&#x5206;&#x6790;</h3><p>&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x9636;&#x6BB5;&#x4F1A;&#x628A;&#x4E00;&#x4E2A;&#x4EE4;&#x724C;&#x6D41;&#x8F6C;&#x6362;&#x6210; <code>&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF08;AST&#xFF09;</code> &#x7684;&#x5F62;&#x5F0F;&#x3002; &#x8FD9;&#x4E2A;&#x9636;&#x6BB5;&#x4F1A;&#x4F7F;&#x7528;&#x4EE4;&#x724C;&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#x628A;&#x5B83;&#x4EEC;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A; AST &#x7684;&#x8868;&#x8FF0;&#x7ED3;&#x6784;&#xFF0C;&#x8FD9;&#x6837;&#x66F4;&#x6613;&#x4E8E;&#x540E;&#x7EED;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x5904;&#x7406;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x6B65;&#x90FD;&#x6D89;&#x53CA;&#x5230;&#x521B;&#x5EFA;&#x6216;&#x662F;&#x64CD;&#x4F5C;<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree" rel="nofollow noreferrer" target="_blank">&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;</a>&#xFF0C;&#x4EA6;&#x79F0; AST&#x3002;</p><blockquote>Babel &#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; <a href="https://github.com/estree/estree" rel="nofollow noreferrer" target="_blank">ESTree</a> &#x5E76;&#x4FEE;&#x6539;&#x8FC7;&#x7684; AST&#xFF0C;&#x5B83;&#x7684;&#x5185;&#x6838;&#x8BF4;&#x660E;&#x6587;&#x6863;&#x53EF;&#x4EE5;&#x5728;<a>&#x8FD9;&#x91CC;</a>. com/babel/babel/blob/master/doc/ast/spec. md)&#x627E;&#x5230;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function square(n) {
  return n * n;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">return</span> n * n;
}</code></pre><blockquote><a href="http://astexplorer.net/" rel="nofollow noreferrer" target="_blank">AST Explorer</a> &#x53EF;&#x4EE5;&#x8BA9;&#x4F60;&#x5BF9; AST &#x8282;&#x70B9;&#x6709;&#x4E00;&#x4E2A;&#x66F4;&#x597D;&#x7684;&#x611F;&#x6027;&#x8BA4;&#x8BC6;&#x3002; <a href="http://astexplorer.net/#/Z1exs6BWMq" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x662F;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x7684;&#x4E00;&#x4E2A;&#x793A;&#x4F8B;&#x94FE;&#x63A5;&#x3002;</blockquote><p>&#x8FD9;&#x4E2A;&#x7A0B;&#x5E8F;&#x53EF;&#x4EE5;&#x88AB;&#x8868;&#x793A;&#x6210;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x7684; JavaScript Object&#xFF08;&#x5BF9;&#x8C61;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: &quot;FunctionDeclaration&quot;,
  id: {
    type: &quot;Identifier&quot;,
    name: &quot;square&quot;
  },
  params: [{
    type: &quot;Identifier&quot;,
    name: &quot;n&quot;
  }],
  body: {
    type: &quot;BlockStatement&quot;,
    body: [{
      type: &quot;ReturnStatement&quot;,
      argument: {
        type: &quot;BinaryExpression&quot;,
        operator: &quot;*&quot;,
        left: {
          type: &quot;Identifier&quot;,
          name: &quot;n&quot;
        },
        right: {
          type: &quot;Identifier&quot;,
          name: &quot;n&quot;
        }
      }
    }]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FunctionDeclaration&quot;</span>,
  <span class="hljs-attr">id</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;square&quot;</span>
  },
  <span class="hljs-attr">params</span>: [{
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;n&quot;</span>
  }],
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BlockStatement&quot;</span>,
    <span class="hljs-attr">body</span>: [{
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ReturnStatement&quot;</span>,
      <span class="hljs-attr">argument</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BinaryExpression&quot;</span>,
        <span class="hljs-attr">operator</span>: <span class="hljs-string">&quot;*&quot;</span>,
        <span class="hljs-attr">left</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;n&quot;</span>
        },
        <span class="hljs-attr">right</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;n&quot;</span>
        }
      }
    }]
  }
}</code></pre><p>&#x4F60;&#x4F1A;&#x7559;&#x610F;&#x5230; AST &#x7684;&#x6BCF;&#x4E00;&#x5C42;&#x90FD;&#x62E5;&#x6709;&#x76F8;&#x540C;&#x7684;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: &quot;FunctionDeclaration&quot;,
  id: {...},
  params: [...],
  body: {...}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FunctionDeclaration&quot;</span>,
  <span class="hljs-attr">id</span>: {...},
  <span class="hljs-attr">params</span>: [...],
  <span class="hljs-attr">body</span>: {...}
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: &quot;Identifier&quot;,
  name: ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
  <span class="hljs-attr">name</span>: ...
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: &quot;BinaryExpression&quot;,
  operator: ...,
  left: {...},
  right: {...}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BinaryExpression&quot;</span>,
  <span class="hljs-attr">operator</span>: ...,
  <span class="hljs-attr">left</span>: {...},
  <span class="hljs-attr">right</span>: {...}
}</code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x51FA;&#x4E8E;&#x7B80;&#x5316;&#x7684;&#x76EE;&#x7684;&#x79FB;&#x9664;&#x4E86;&#x67D0;&#x4E9B;&#x5C5E;&#x6027;</blockquote><p>&#x8FD9;&#x6837;&#x7684;&#x6BCF;&#x4E00;&#x5C42;&#x7ED3;&#x6784;&#x4E5F;&#x88AB;&#x53EB;&#x505A; <strong>&#x8282;&#x70B9;&#xFF08;Node&#xFF09;</strong>&#x3002; &#x4E00;&#x4E2A; AST &#x53EF;&#x4EE5;&#x7531;&#x5355;&#x4E00;&#x7684;&#x8282;&#x70B9;&#x6216;&#x662F;&#x6210;&#x767E;&#x4E0A;&#x5343;&#x4E2A;&#x8282;&#x70B9;&#x6784;&#x6210;&#x3002; &#x5B83;&#x4EEC;&#x7EC4;&#x5408;&#x5728;&#x4E00;&#x8D77;&#x53EF;&#x4EE5;&#x63CF;&#x8FF0;&#x7528;&#x4E8E;&#x9759;&#x6001;&#x5206;&#x6790;&#x7684;&#x7A0B;&#x5E8F;&#x8BED;&#x6CD5;&#x3002;</p><p>&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x90FD;&#x6709;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x7684;&#x63A5;&#x53E3;&#xFF08;Interface&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Node {
  type: string;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Node {
  <span class="hljs-attr">type</span>: string;
}</code></pre><p>&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x7684; <code>type</code> &#x5B57;&#x6BB5;&#x8868;&#x793A;&#x8282;&#x70B9;&#x7684;&#x7C7B;&#x578B;&#xFF08;&#x5982;&#xFF1A; <code>&quot;FunctionDeclaration&quot;</code>&#xFF0C;<code>&quot;Identifier&quot;</code>&#xFF0C;&#x6216; <code>&quot;BinaryExpression&quot;</code>&#xFF09;&#x3002; &#x6BCF;&#x4E00;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x8282;&#x70B9;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E9B;&#x9644;&#x52A0;&#x5C5E;&#x6027;&#x7528;&#x6765;&#x8FDB;&#x4E00;&#x6B65;&#x63CF;&#x8FF0;&#x8BE5;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x3002;</p><p>Babel &#x8FD8;&#x4E3A;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x989D;&#x5916;&#x751F;&#x6210;&#x4E86;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x63CF;&#x8FF0;&#x8BE5;&#x8282;&#x70B9;&#x5728;&#x539F;&#x59CB;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: ...,
  start: 0,
  end: 38,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 3,
      column: 1
    }
  },
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">type</span>: ...,
  <span class="hljs-attr">start</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">end</span>: <span class="hljs-number">38</span>,
  <span class="hljs-attr">loc</span>: {
    <span class="hljs-attr">start</span>: {
      <span class="hljs-attr">line</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">column</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">end</span>: {
      <span class="hljs-attr">line</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">column</span>: <span class="hljs-number">1</span>
    }
  },
  ...
}</code></pre><p>&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x90FD;&#x4F1A;&#x6709; <code>start</code>&#xFF0C;<code>end</code>&#xFF0C;<code>loc</code> &#x8FD9;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p><h2 id="articleHeader4">&#x53D8;&#x91CF;&#x58F0;&#x660E;</h2><h3 id="articleHeader5">&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a  = &apos;hello&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> a  = <span class="hljs-string">&apos;hello&apos;</span></code></pre><h3 id="articleHeader6">AST</h3><p><span class="img-wrap"><img data-src="https://user-images.githubusercontent.com/9441951/42793395-950f4ab4-89ac-11e8-817a-8bc74d24b877.png" src="https://static.alili.techhttps://user-images.githubusercontent.com/9441951/42793395-950f4ab4-89ac-11e8-817a-8bc74d24b877.png" alt="image" title="image" style="cursor:pointer"></span></p><h3 id="articleHeader7">VariableDeclaration</h3><p>&#x53D8;&#x91CF;&#x58F0;&#x660E;&#xFF0C;<code>kind</code> &#x5C5E;&#x6027;&#x8868;&#x793A;&#x662F;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#x7684;&#x58F0;&#x660E;&#xFF0C;&#x56E0;&#x4E3A; ES6 &#x5F15;&#x5165;&#x4E86; <code>const/let</code>&#x3002;<br><code>declarations</code> &#x8868;&#x793A;&#x58F0;&#x660E;&#x7684;&#x591A;&#x4E2A;&#x63CF;&#x8FF0;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#xFF1A;<code>let a = 1, b = 2;</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface VariableDeclaration &lt;: Declaration {
    type: &quot;VariableDeclaration&quot;;
    declarations: [ VariableDeclarator ];
    kind: &quot;var&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface VariableDeclaration &lt;: Declaration {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VariableDeclaration&quot;</span>;
    declarations: [ VariableDeclarator ];
    kind: <span class="hljs-string">&quot;var&quot;</span>;
}</code></pre><h4>VariableDeclarator</h4><p>&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;<code>id</code> &#x8868;&#x793A;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x8282;&#x70B9;&#xFF0C;<code>init</code> &#x8868;&#x793A;&#x521D;&#x59CB;&#x503C;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x4E3A; <code>null</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface VariableDeclarator &lt;: Node {
    type: &quot;VariableDeclarator&quot;;
    id: Pattern;
    init: Expression | null;
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface VariableDeclarator &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VariableDeclarator&quot;</span>;
    id: Pattern;
    init: Expression | <span class="hljs-literal">null</span>;
} </code></pre><h3 id="articleHeader8">Identifier</h3><p>&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x4E48;&#x53EB;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5199; JS &#x65F6;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x5982;&#x53D8;&#x91CF;&#x540D;&#xFF0C;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x90FD;&#x5F52;&#x4E3A;&#x6807;&#x8BC6;&#x7B26;&#x3002;&#x76F8;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Identifier &lt;: Expression, Pattern {
    type: &quot;Identifier&quot;;
    name: string;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Identifier &lt;: Expression, Pattern {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>;
    name: string;
}</code></pre><p>&#x4E00;&#x4E2A;&#x6807;&#x8BC6;&#x7B26;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x89E3;&#x6784;&#x7684;&#x6A21;&#x5F0F;&#xFF08;ES6 &#x4E2D;&#x7684;&#x89E3;&#x6784;&#x8BED;&#x6CD5;&#xFF09;&#x3002;&#x6211;&#x4EEC;&#x7B49;&#x4F1A;&#x4F1A;&#x770B;&#x5230; <code>Expression</code> &#x548C; <code>Pattern</code> &#x76F8;&#x5173;&#x7684;&#x5185;&#x5BB9;&#x7684;&#x3002;</p><h3 id="articleHeader9">Literal</h3><p>&#x5B57;&#x9762;&#x91CF;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x662F;&#x6307; <code>[]</code> &#x6216;&#x8005; <code>{}</code> &#x8FD9;&#x4E9B;&#xFF0C;&#x800C;&#x662F;&#x672C;&#x8EAB;&#x8BED;&#x4E49;&#x5C31;&#x4EE3;&#x8868;&#x4E86;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x5B57;&#x9762;&#x91CF;&#xFF0C;&#x5982; <code>1</code>&#xFF0C;<code>&#x201C;hello&#x201D;</code>, <code>true</code> &#x8FD9;&#x4E9B;&#xFF0C;&#x8FD8;&#x6709;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x6709;&#x4E00;&#x4E2A;&#x6269;&#x5C55;&#x7684; <code>Node</code> &#x6765;&#x8868;&#x793A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#xFF0C;&#x5982; <code>/\d?/</code>&#x3002;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x6587;&#x6863;&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Literal &lt;: Expression {
    type: &quot;Literal&quot;;
    value: string | boolean | null | number | RegExp;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Literal &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Literal&quot;</span>;
    value: string | boolean | <span class="hljs-literal">null</span> | number | <span class="hljs-built_in">RegExp</span>;
}</code></pre><p><code>value</code> &#x8FD9;&#x91CC;&#x5373;&#x5BF9;&#x5E94;&#x4E86;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x5B57;&#x9762;&#x91CF;&#x503C;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E03;&#x5C14;&#xFF0C;&#x6570;&#x503C;&#xFF0C;<code>null</code> &#x548C;&#x6B63;&#x5219;&#x3002;</p><h2 id="articleHeader10">&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;</h2><h3 id="articleHeader11">&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 3+4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> a = <span class="hljs-number">3</span>+<span class="hljs-number">4</span></code></pre><h3 id="articleHeader12">AST</h3><p><span class="img-wrap"><img data-src="https://user-images.githubusercontent.com/9441951/42793655-b4ec197e-89ad-11e8-86a0-7d5a8d0152ef.png" src="https://static.alili.techhttps://user-images.githubusercontent.com/9441951/42793655-b4ec197e-89ad-11e8-86a0-7d5a8d0152ef.png" alt="image" title="image" style="cursor:pointer"></span></p><h3 id="articleHeader13">BinaryExpression</h3><p>&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#xFF0C;<code>left</code> &#x548C; <code>right</code> &#x8868;&#x793A;&#x8FD0;&#x7B97;&#x7B26;&#x5DE6;&#x53F3;&#x7684;&#x4E24;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;<code>operator</code> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface BinaryExpression &lt;: Expression {
    type: &quot;BinaryExpression&quot;;
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface BinaryExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BinaryExpression&quot;</span>;
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}</code></pre><h4>BinaryOperator</h4><p>&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x6240;&#x6709;&#x503C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum BinaryOperator {
    &quot;==&quot; | &quot;!=&quot; | &quot;===&quot; | &quot;!==&quot;
         | &quot;&lt;&quot; | &quot;&lt;=&quot; | &quot;&gt;&quot; | &quot;&gt;=&quot;
         | &quot;&lt;&lt;&quot; | &quot;&gt;&gt;&quot; | &quot;&gt;&gt;&gt;&quot;
         | &quot;+&quot; | &quot;-&quot; | &quot;*&quot; | &quot;/&quot; | &quot;%&quot;
         | &quot;|&quot; | &quot;^&quot; | &quot;&amp;&quot; | &quot;in&quot;
         | &quot;instanceof&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">enum BinaryOperator {
    <span class="hljs-string">&quot;==&quot;</span> | <span class="hljs-string">&quot;!=&quot;</span> | <span class="hljs-string">&quot;===&quot;</span> | <span class="hljs-string">&quot;!==&quot;</span>
         | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span>
         | <span class="hljs-string">&quot;&lt;&lt;&quot;</span> | <span class="hljs-string">&quot;&gt;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;&gt;&gt;&quot;</span>
         | <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span>
         | <span class="hljs-string">&quot;|&quot;</span> | <span class="hljs-string">&quot;^&quot;</span> | <span class="hljs-string">&quot;&amp;&quot;</span> | <span class="hljs-string">&quot;in&quot;</span>
         | <span class="hljs-string">&quot;instanceof&quot;</span>
}</code></pre><h2 id="articleHeader14">if &#x8BED;&#x53E5;</h2><h3 id="articleHeader15">&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(a === 0){
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(a === <span class="hljs-number">0</span>){
}</code></pre><h3 id="articleHeader16">AST</h3><p><span class="img-wrap"><img data-src="https://user-images.githubusercontent.com/9441951/42794874-d19e4aa0-89b3-11e8-9a60-89a3abaff288.png" src="https://static.alili.techhttps://user-images.githubusercontent.com/9441951/42794874-d19e4aa0-89b3-11e8-9a60-89a3abaff288.png" alt="image" title="image" style="cursor:pointer"></span></p><h3 id="articleHeader17">IfStatement</h3><p><code>if</code> &#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x5F88;&#x5E38;&#x89C1;&#xFF0C;&#x4F1A;&#x5E26;&#x6709;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;<code>test</code> &#x5C5E;&#x6027;&#x8868;&#x793A; <code>if (...)</code> &#x62EC;&#x53F7;&#x4E2D;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p><code>consequent</code> &#x5C5E;&#x6027;&#x662F;&#x8868;&#x793A;&#x6761;&#x4EF6;&#x4E3A; <code>true</code> &#x65F6;&#x7684;&#x6267;&#x884C;&#x8BED;&#x53E5;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;&#x5757;&#x8BED;&#x53E5;&#x3002;</p><p><code>alternate</code> &#x5C5E;&#x6027;&#x5219;&#x662F;&#x7528;&#x6765;&#x8868;&#x793A; <code>else</code> &#x540E;&#x8DDF;&#x968F;&#x7684;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x901A;&#x5E38;&#x4E5F;&#x4F1A;&#x662F;&#x5757;&#x8BED;&#x53E5;&#xFF0C;&#x4F46;&#x4E5F;&#x53EF;&#x4EE5;&#x53C8;&#x662F;&#x4E00;&#x4E2A; <code>if</code> &#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x5373;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#xFF1A;<br><code>if (a) { //... } else if (b) { // ... }</code>&#x3002;<br><code>alternate</code> &#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x4E3A; <code>null</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface IfStatement &lt;: Statement {
    type: &quot;IfStatement&quot;;
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface IfStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;IfStatement&quot;</span>;
    test: Expression;
    consequent: Statement;
    alternate: Statement | <span class="hljs-literal">null</span>;
}</code></pre><h2 id="articleHeader18">&#x5E38;&#x89C1;&#x7684; AST node types</h2><p>&#x5E38;&#x89C1;&#x7684; AST node types &#x5728; Babylon &#x4E2D; &#x5B9A;&#x4E49;&#x5982;&#x4E0B;&#xFF1A;</p><h3 id="articleHeader19">Node objects</h3><p>&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684;&#x89E3;&#x6790;&#x51FA;&#x6765;&#x7684; AST &#x8282;&#x70B9;&#x7528; <code>Node</code> &#x5BF9;&#x8C61;&#x6765;&#x6807;&#x8BC6;&#xFF0C;<code>Node</code> &#x5BF9;&#x8C61;&#x5E94;&#x8BE5;&#x7B26;&#x5408;&#x8FD9;&#x6837;&#x7684;&#x63A5;&#x53E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Node {
    type: string;
    loc: SourceLocation | null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Node {
    <span class="hljs-attr">type</span>: string;
    loc: SourceLocation | <span class="hljs-literal">null</span>;
}</code></pre><p><code>type</code> &#x5B57;&#x6BB5;&#x8868;&#x793A;&#x4E0D;&#x540C;&#x7684;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#xFF0C;&#x4E0B;&#x8FB9;&#x4F1A;&#x518D;&#x8BB2;&#x4E00;&#x4E0B;&#x5404;&#x4E2A;&#x7C7B;&#x578B;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x4E86; JavaScript &#x4E2D;&#x7684;&#x4EC0;&#x4E48;&#x8BED;&#x6CD5;&#x3002;<br><code>loc</code> &#x5B57;&#x6BB5;&#x8868;&#x793A;&#x6E90;&#x7801;&#x7684;&#x4F4D;&#x7F6E;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x76F8;&#x5173;&#x4FE1;&#x606F;&#x7684;&#x8BDD;&#x4E3A; <code>null</code>&#xFF0C;&#x5426;&#x5219;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x5F00;&#x59CB;&#x548C;&#x7ED3;&#x675F;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x63A5;&#x53E3;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface SourceLocation {
    source: string | null;
    start: Position;
    end: Position;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface SourceLocation {
    <span class="hljs-attr">source</span>: string | <span class="hljs-literal">null</span>;
    start: Position;
    end: Position;
}</code></pre><p>&#x8FD9;&#x91CC;&#x7684; <code>Position</code> &#x5BF9;&#x8C61;&#x5305;&#x542B;&#x4E86;&#x884C;&#x548C;&#x5217;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x884C;&#x4ECE; 1 &#x5F00;&#x59CB;&#xFF0C;&#x5217;&#x4ECE; 0 &#x5F00;&#x59CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Position {
    line: number; // &gt;= 1
    column: number; // &gt;= 0
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Position {
    <span class="hljs-attr">line</span>: number; <span class="hljs-comment">// &gt;= 1</span>
    column: number; <span class="hljs-comment">// &gt;= 0</span>
}</code></pre><h3 id="articleHeader20">Identifier</h3><p>&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5199; JS &#x65F6;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x5982;&#x53D8;&#x91CF;&#x540D;&#xFF0C;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x90FD;&#x5F52;&#x4E3A;&#x6807;&#x8BC6;&#x7B26;&#x3002;&#x76F8;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Identifier &lt;: Expression, Pattern {
    type: &quot;Identifier&quot;;
    name: string;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Identifier &lt;: Expression, Pattern {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>;
    name: string;
}</code></pre><p>&#x4E00;&#x4E2A;&#x6807;&#x8BC6;&#x7B26;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x89E3;&#x6784;&#x7684;&#x6A21;&#x5F0F;&#xFF08;ES6 &#x4E2D;&#x7684;&#x89E3;&#x6784;&#x8BED;&#x6CD5;&#xFF09;&#x3002;&#x6211;&#x4EEC;&#x7B49;&#x4F1A;&#x4F1A;&#x770B;&#x5230; <code>Expression</code> &#x548C; <code>Pattern</code> &#x76F8;&#x5173;&#x7684;&#x5185;&#x5BB9;&#x7684;&#x3002;</p><h3 id="articleHeader21">PrivateName</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface PrivateName &lt;: Expression, Pattern {
  type: &quot;PrivateName&quot;;
  id: Identifier;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface PrivateName &lt;: Expression, Pattern {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;PrivateName&quot;</span>;
  id: Identifier;
}</code></pre><p>A Private Name Identifier.</p><h3 id="articleHeader22">Literal</h3><p>&#x5B57;&#x9762;&#x91CF;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x662F;&#x6307; <code>[]</code> &#x6216;&#x8005; <code>{}</code> &#x8FD9;&#x4E9B;&#xFF0C;&#x800C;&#x662F;&#x672C;&#x8EAB;&#x8BED;&#x4E49;&#x5C31;&#x4EE3;&#x8868;&#x4E86;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x5B57;&#x9762;&#x91CF;&#xFF0C;&#x5982; <code>1</code>&#xFF0C;<code>&#x201C;hello&#x201D;</code>, <code>true</code> &#x8FD9;&#x4E9B;&#xFF0C;&#x8FD8;&#x6709;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x6709;&#x4E00;&#x4E2A;&#x6269;&#x5C55;&#x7684; <code>Node</code> &#x6765;&#x8868;&#x793A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#xFF0C;&#x5982; <code>/\d?/</code>&#x3002;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x6587;&#x6863;&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Literal &lt;: Expression {
    type: &quot;Literal&quot;;
    value: string | boolean | null | number | RegExp;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Literal &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Literal&quot;</span>;
    value: string | boolean | <span class="hljs-literal">null</span> | number | <span class="hljs-built_in">RegExp</span>;
}</code></pre><h4>RegExpLiteral</h4><p><code>value</code> &#x8FD9;&#x91CC;&#x5373;&#x5BF9;&#x5E94;&#x4E86;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x5B57;&#x9762;&#x91CF;&#x503C;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E03;&#x5C14;&#xFF0C;&#x6570;&#x503C;&#xFF0C;<code>null</code> &#x548C;&#x6B63;&#x5219;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x9488;&#x5BF9;&#x6B63;&#x5219;&#x5B57;&#x9762;&#x91CF;&#x7684;&#xFF0C;&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x5730;&#x6765;&#x89E3;&#x6790;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6DFB;&#x52A0;&#x591A;&#x4E00;&#x4E2A; <code>regex</code> &#x5B57;&#x6BB5;&#xFF0C;&#x91CC;&#x8FB9;&#x4F1A;&#x5305;&#x62EC;&#x6B63;&#x5219;&#x672C;&#x8EAB;&#xFF0C;&#x4EE5;&#x53CA;&#x6B63;&#x5219;&#x7684; <code>flags</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface RegExpLiteral &lt;: Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface RegExpLiteral &lt;: Literal {
  <span class="hljs-attr">regex</span>: {
    <span class="hljs-attr">pattern</span>: string;
    flags: string;
  };
}</code></pre><h3 id="articleHeader23">Programs</h3><p>&#x4E00;&#x822C;&#x8FD9;&#x4E2A;&#x662F;&#x4F5C;&#x4E3A;&#x6839;&#x8282;&#x70B9;&#x7684;&#xFF0C;&#x5373;&#x4EE3;&#x8868;&#x4E86;&#x4E00;&#x68F5;&#x5B8C;&#x6574;&#x7684;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;&#x6811;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Program &lt;: Node {
    type: &quot;Program&quot;;
    body: [ Statement ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Program &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Program&quot;</span>;
    body: [ Statement ];
}</code></pre><p><code>body</code> &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x591A;&#x4E2A; <code>Statement</code>&#xFF08;&#x5373;&#x8BED;&#x53E5;&#xFF09;&#x8282;&#x70B9;&#x3002;</p><h3 id="articleHeader24">Functions</h3><p>&#x51FD;&#x6570;&#x58F0;&#x660E;&#x6216;&#x8005;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Function &lt;: Node {
    id: Identifier | null;
    params: [ Pattern ];
    body: BlockStatement;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface <span class="hljs-built_in">Function</span> &lt;: Node {
    <span class="hljs-attr">id</span>: Identifier | <span class="hljs-literal">null</span>;
    params: [ Pattern ];
    body: BlockStatement;
}</code></pre><p><code>id</code> &#x662F;&#x51FD;&#x6570;&#x540D;&#xFF0C;<code>params</code> &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8868;&#x793A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x3002;<code>body</code> &#x662F;&#x4E00;&#x4E2A;&#x5757;&#x8BED;&#x53E5;&#x3002;</p><p>&#x6709;&#x4E00;&#x4E2A;&#x503C;&#x5F97;&#x7559;&#x610F;&#x7684;&#x70B9;&#x662F;&#xFF0C;&#x4F60;&#x5728;&#x6D4B;&#x8BD5;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x662F;&#x4E0D;&#x4F1A;&#x627E;&#x5230; <code>type: &quot;Function&quot;</code> &#x7684;&#x8282;&#x70B9;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x53EF;&#x4EE5;&#x627E;&#x5230; <code>type: &quot;FunctionDeclaration&quot;</code> &#x548C; <code>type: &quot;FunctionExpression&quot;</code>&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x8981;&#x4E48;&#x4EE5;&#x58F0;&#x660E;&#x8BED;&#x53E5;&#x51FA;&#x73B0;&#xFF0C;&#x8981;&#x4E48;&#x4EE5;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x51FA;&#x73B0;&#xFF0C;&#x90FD;&#x662F;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x5408;&#x7C7B;&#x578B;&#xFF0C;&#x540E;&#x8FB9;&#x4F1A;&#x518D;&#x63D0;&#x53CA; <code>FunctionDeclaration</code> &#x548C; <code>FunctionExpression</code> &#x7684;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#x3002;</p><h3 id="articleHeader25">Statement</h3><p>&#x8BED;&#x53E5;&#x8282;&#x70B9;&#x6CA1;&#x4EC0;&#x4E48;&#x7279;&#x522B;&#x7684;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x4E00;&#x79CD;&#x533A;&#x5206;&#xFF0C;&#x4F46;&#x662F;&#x8BED;&#x53E5;&#x6709;&#x5F88;&#x591A;&#x79CD;&#xFF0C;&#x4E0B;&#x8FB9;&#x4F1A;&#x8BE6;&#x8FF0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Statement &lt;: Node { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">interface Statement &lt;: Node { }</code></pre><h4>ExpressionStatement</h4><p>&#x8868;&#x8FBE;&#x5F0F;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;<code>a = a + 1</code> &#x6216;&#x8005; <code>a++</code> &#x91CC;&#x8FB9;&#x4F1A;&#x6709;&#x4E00;&#x4E2A; <code>expression</code> &#x5C5E;&#x6027;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#x5BF9;&#x8C61;&#xFF08;&#x540E;&#x8FB9;&#x4F1A;&#x63D0;&#x53CA;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ExpressionStatement &lt;: Statement {
    type: &quot;ExpressionStatement&quot;;
    expression: Expression;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ExpressionStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ExpressionStatement&quot;</span>;
    expression: Expression;
}</code></pre><h4>BlockStatement</h4><p>&#x5757;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;<code>if (...) { // &#x8FD9;&#x91CC;&#x662F;&#x5757;&#x8BED;&#x53E5;&#x7684;&#x5185;&#x5BB9; }</code>&#xFF0C;&#x5757;&#x91CC;&#x8FB9;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x5176;&#x4ED6;&#x7684;&#x8BED;&#x53E5;&#xFF0C;&#x6240;&#x4EE5;&#x6709;&#x4E00;&#x4E2A; <code>body</code> &#x5C5E;&#x6027;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8868;&#x793A;&#x4E86;&#x5757;&#x91CC;&#x8FB9;&#x7684;&#x591A;&#x4E2A;&#x8BED;&#x53E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface BlockStatement &lt;: Statement {
    type: &quot;BlockStatement&quot;;
    body: [ Statement ];
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface BlockStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BlockStatement&quot;</span>;
    body: [ Statement ];
} </code></pre><h4>ReturnStatement</h4><p>&#x8FD4;&#x56DE;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;<code>argument</code> &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4EE3;&#x8868;&#x8FD4;&#x56DE;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ReturnStatement &lt;: Statement {
    type: &quot;ReturnStatement&quot;;
    argument: Expression | null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ReturnStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ReturnStatement&quot;</span>;
    argument: Expression | <span class="hljs-literal">null</span>;
}</code></pre><h4>IfStatement</h4><p><code>if</code> &#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x5F88;&#x5E38;&#x89C1;&#xFF0C;&#x4F1A;&#x5E26;&#x6709;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;<code>test</code> &#x5C5E;&#x6027;&#x8868;&#x793A; <code>if (...)</code> &#x62EC;&#x53F7;&#x4E2D;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p><code>consequent</code> &#x5C5E;&#x6027;&#x662F;&#x8868;&#x793A;&#x6761;&#x4EF6;&#x4E3A; <code>true</code> &#x65F6;&#x7684;&#x6267;&#x884C;&#x8BED;&#x53E5;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;&#x5757;&#x8BED;&#x53E5;&#x3002;</p><p><code>alternate</code> &#x5C5E;&#x6027;&#x5219;&#x662F;&#x7528;&#x6765;&#x8868;&#x793A; <code>else</code> &#x540E;&#x8DDF;&#x968F;&#x7684;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x901A;&#x5E38;&#x4E5F;&#x4F1A;&#x662F;&#x5757;&#x8BED;&#x53E5;&#xFF0C;&#x4F46;&#x4E5F;&#x53EF;&#x4EE5;&#x53C8;&#x662F;&#x4E00;&#x4E2A; <code>if</code> &#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x5373;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#xFF1A;<br><code>if (a) { //... } else if (b) { // ... }</code>&#x3002;<br><code>alternate</code> &#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x4E3A; <code>null</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface IfStatement &lt;: Statement {
    type: &quot;IfStatement&quot;;
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface IfStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;IfStatement&quot;</span>;
    test: Expression;
    consequent: Statement;
    alternate: Statement | <span class="hljs-literal">null</span>;
}</code></pre><h4>SwitchStatement</h4><p><code>switch</code> &#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;<code>discriminant</code> &#x5C5E;&#x6027;&#x8868;&#x793A; <code>switch</code> &#x8BED;&#x53E5;&#x540E;&#x7D27;&#x968F;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;<code>cases</code> &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A; <code>case</code> &#x8282;&#x70B9;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x7528;&#x6765;&#x8868;&#x793A;&#x5404;&#x4E2A; <code>case</code> &#x8BED;&#x53E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface SwitchStatement &lt;: Statement {
    type: &quot;SwitchStatement&quot;;
    discriminant: Expression;
    cases: [ SwitchCase ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface SwitchStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SwitchStatement&quot;</span>;
    discriminant: Expression;
    cases: [ SwitchCase ];
}</code></pre><h4>ForStatement</h4><p><code>for</code> &#x5FAA;&#x73AF;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x5C5E;&#x6027; <code>init/test/update</code> &#x5206;&#x522B;&#x8868;&#x793A;&#x4E86; <code>for</code> &#x8BED;&#x53E5;&#x62EC;&#x53F7;&#x4E2D;&#x7684;&#x4E09;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x503C;&#xFF0C;&#x5FAA;&#x73AF;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#xFF0C;&#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x6267;&#x884C;&#x7684;&#x53D8;&#x91CF;&#x66F4;&#x65B0;&#x8BED;&#x53E5;&#xFF08;<code>init</code> &#x53EF;&#x4EE5;&#x662F;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x6216;&#x8005;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#x3002;&#x8FD9;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x90FD;&#x53EF;&#x4EE5;&#x4E3A; <code>null</code>&#xFF0C;&#x5373; <code>for(;;){}</code>&#x3002;<br><code>body</code> &#x5C5E;&#x6027;&#x7528;&#x4EE5;&#x8868;&#x793A;&#x8981;&#x5FAA;&#x73AF;&#x6267;&#x884C;&#x7684;&#x8BED;&#x53E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ForStatement &lt;: Statement {
    type: &quot;ForStatement&quot;;
    init: VariableDeclaration | Expression | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ForStatement &lt;: Statement {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ForStatement&quot;</span>;
    init: VariableDeclaration | Expression | <span class="hljs-literal">null</span>;
    test: Expression | <span class="hljs-literal">null</span>;
    update: Expression | <span class="hljs-literal">null</span>;
    body: Statement;
}</code></pre><h3 id="articleHeader26">Declarations</h3><p>&#x58F0;&#x660E;&#x8BED;&#x53E5;&#x8282;&#x70B9;&#xFF0C;&#x540C;&#x6837;&#x4E5F;&#x662F;&#x8BED;&#x53E5;&#xFF0C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x7684;&#x7EC6;&#x5316;&#x3002;&#x4E0B;&#x8FB9;&#x4F1A;&#x4ECB;&#x7ECD;&#x5404;&#x79CD;&#x58F0;&#x660E;&#x8BED;&#x53E5;&#x7C7B;&#x578B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Declaration &lt;: Statement { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">interface Declaration &lt;: Statement { }</code></pre><h4>FunctionDeclaration</h4><p>&#x51FD;&#x6570;&#x58F0;&#x660E;&#xFF0C;&#x548C;&#x4E4B;&#x524D;&#x63D0;&#x5230;&#x7684; Function &#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;<code>id</code> &#x4E0D;&#x80FD;&#x4E3A; <code>null</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface FunctionDeclaration &lt;: Function, Declaration {
    type: &quot;FunctionDeclaration&quot;;
    id: Identifier;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface FunctionDeclaration &lt;: <span class="hljs-built_in">Function</span>, Declaration {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FunctionDeclaration&quot;</span>;
    id: Identifier;
}</code></pre><h4>VariableDeclaration</h4><p>&#x53D8;&#x91CF;&#x58F0;&#x660E;&#xFF0C;<code>kind</code> &#x5C5E;&#x6027;&#x8868;&#x793A;&#x662F;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#x7684;&#x58F0;&#x660E;&#xFF0C;&#x56E0;&#x4E3A; ES6 &#x5F15;&#x5165;&#x4E86; <code>const/let</code>&#x3002;<br><code>declarations</code> &#x8868;&#x793A;&#x58F0;&#x660E;&#x7684;&#x591A;&#x4E2A;&#x63CF;&#x8FF0;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#xFF1A;<code>let a = 1, b = 2;</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface VariableDeclaration &lt;: Declaration {
    type: &quot;VariableDeclaration&quot;;
    declarations: [ VariableDeclarator ];
    kind: &quot;var&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface VariableDeclaration &lt;: Declaration {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VariableDeclaration&quot;</span>;
    declarations: [ VariableDeclarator ];
    kind: <span class="hljs-string">&quot;var&quot;</span>;
}</code></pre><h5>VariableDeclarator</h5><p>&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;<code>id</code> &#x8868;&#x793A;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x8282;&#x70B9;&#xFF0C;<code>init</code> &#x8868;&#x793A;&#x521D;&#x59CB;&#x503C;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x4E3A; <code>null</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface VariableDeclarator &lt;: Node {
    type: &quot;VariableDeclarator&quot;;
    id: Pattern;
    init: Expression | null;
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface VariableDeclarator &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VariableDeclarator&quot;</span>;
    id: Pattern;
    init: Expression | <span class="hljs-literal">null</span>;
} </code></pre><h3 id="articleHeader27">Expressions</h3><p>&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Expression &lt;: Node { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">interface Expression &lt;: Node { }</code></pre><h4>Import</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Import &lt;: Node {
    type: &quot;Import&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Import &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Import&quot;</span>;
}</code></pre><h4>ArrayExpression</h4><p>&#x6570;&#x7EC4;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#xFF0C;<code>elements</code> &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8868;&#x793A;&#x6570;&#x7EC4;&#x7684;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ArrayExpression &lt;: Expression {
    type: &quot;ArrayExpression&quot;;
    elements: [ Expression | null ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ArrayExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ArrayExpression&quot;</span>;
    elements: [ Expression | <span class="hljs-literal">null</span> ];
}</code></pre><h4>ObjectExpression</h4><p>&#x5BF9;&#x8C61;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#xFF0C;<code>property</code> &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8868;&#x793A;&#x5BF9;&#x8C61;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x952E;&#x503C;&#x5BF9;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x8282;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ObjectExpression &lt;: Expression {
    type: &quot;ObjectExpression&quot;;
    properties: [ Property ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ObjectExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ObjectExpression&quot;</span>;
    properties: [ Property ];
}</code></pre><h5>Property</h5><p>&#x5BF9;&#x8C61;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x8282;&#x70B9;&#x3002;<code>key</code> &#x8868;&#x793A;&#x952E;&#xFF0C;<code>value</code> &#x8868;&#x793A;&#x503C;&#xFF0C;&#x7531;&#x4E8E; ES5 &#x8BED;&#x6CD5;&#x4E2D;&#x6709; <code>get/set</code> &#x7684;&#x5B58;&#x5728;&#xFF0C;&#x6240;&#x4EE5;&#x6709;&#x4E00;&#x4E2A; <code>kind</code> &#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x6765;&#x8868;&#x793A;&#x662F;&#x666E;&#x901A;&#x7684;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x6216;&#x8005;&#x662F; <code>get/set</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Property &lt;: Node {
    type: &quot;Property&quot;;
    key: Literal | Identifier;
    value: Expression;
    kind: &quot;init&quot; | &quot;get&quot; | &quot;set&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Property &lt;: Node {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Property&quot;</span>;
    key: Literal | Identifier;
    value: Expression;
    kind: <span class="hljs-string">&quot;init&quot;</span> | <span class="hljs-string">&quot;get&quot;</span> | <span class="hljs-string">&quot;set&quot;</span>;
}</code></pre><h4>FunctionExpression</h4><p>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface FunctionExpression &lt;: Function, Expression {
    type: &quot;FunctionExpression&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface FunctionExpression &lt;: <span class="hljs-built_in">Function</span>, Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FunctionExpression&quot;</span>;
}</code></pre><h4>BinaryExpression</h4><p>&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#xFF0C;<code>left</code> &#x548C; <code>right</code> &#x8868;&#x793A;&#x8FD0;&#x7B97;&#x7B26;&#x5DE6;&#x53F3;&#x7684;&#x4E24;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;<code>operator</code> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface BinaryExpression &lt;: Expression {
    type: &quot;BinaryExpression&quot;;
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface BinaryExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BinaryExpression&quot;</span>;
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}</code></pre><h5>BinaryOperator</h5><p>&#x4E8C;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x6240;&#x6709;&#x503C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum BinaryOperator {
    &quot;==&quot; | &quot;!=&quot; | &quot;===&quot; | &quot;!==&quot;
         | &quot;&lt;&quot; | &quot;&lt;=&quot; | &quot;&gt;&quot; | &quot;&gt;=&quot;
         | &quot;&lt;&lt;&quot; | &quot;&gt;&gt;&quot; | &quot;&gt;&gt;&gt;&quot;
         | &quot;+&quot; | &quot;-&quot; | &quot;*&quot; | &quot;/&quot; | &quot;%&quot;
         | &quot;|&quot; | &quot;^&quot; | &quot;&amp;&quot; | &quot;in&quot;
         | &quot;instanceof&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">enum BinaryOperator {
    <span class="hljs-string">&quot;==&quot;</span> | <span class="hljs-string">&quot;!=&quot;</span> | <span class="hljs-string">&quot;===&quot;</span> | <span class="hljs-string">&quot;!==&quot;</span>
         | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span>
         | <span class="hljs-string">&quot;&lt;&lt;&quot;</span> | <span class="hljs-string">&quot;&gt;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;&gt;&gt;&quot;</span>
         | <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span>
         | <span class="hljs-string">&quot;|&quot;</span> | <span class="hljs-string">&quot;^&quot;</span> | <span class="hljs-string">&quot;&amp;&quot;</span> | <span class="hljs-string">&quot;in&quot;</span>
         | <span class="hljs-string">&quot;instanceof&quot;</span>
}</code></pre><h4>AssignmentExpression</h4><p>&#x8D4B;&#x503C;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#xFF0C;<code>operator</code> &#x5C5E;&#x6027;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x8D4B;&#x503C;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;<code>left</code> &#x548C; <code>right</code> &#x662F;&#x8D4B;&#x503C;&#x8FD0;&#x7B97;&#x7B26;&#x5DE6;&#x53F3;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface AssignmentExpression &lt;: Expression {
    type: &quot;AssignmentExpression&quot;;
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface AssignmentExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;AssignmentExpression&quot;</span>;
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
}</code></pre><h5>AssignmentOperator</h5><p>&#x8D4B;&#x503C;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x6240;&#x6709;&#x503C;&#x5982;&#x4E0B;&#xFF1A;&#xFF08;&#x5E38;&#x7528;&#x7684;&#x5E76;&#x4E0D;&#x591A;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum AssignmentOperator {
    &quot;=&quot; | &quot;+=&quot; | &quot;-=&quot; | &quot;*=&quot; | &quot;/=&quot; | &quot;%=&quot;
        | &quot;&lt;&lt;=&quot; | &quot;&gt;&gt;=&quot; | &quot;&gt;&gt;&gt;=&quot;
        | &quot;|=&quot; | &quot;^=&quot; | &quot;&amp;=&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">enum AssignmentOperator {
    <span class="hljs-string">&quot;=&quot;</span> | <span class="hljs-string">&quot;+=&quot;</span> | <span class="hljs-string">&quot;-=&quot;</span> | <span class="hljs-string">&quot;*=&quot;</span> | <span class="hljs-string">&quot;/=&quot;</span> | <span class="hljs-string">&quot;%=&quot;</span>
        | <span class="hljs-string">&quot;&lt;&lt;=&quot;</span> | <span class="hljs-string">&quot;&gt;&gt;=&quot;</span> | <span class="hljs-string">&quot;&gt;&gt;&gt;=&quot;</span>
        | <span class="hljs-string">&quot;|=&quot;</span> | <span class="hljs-string">&quot;^=&quot;</span> | <span class="hljs-string">&quot;&amp;=&quot;</span>
}</code></pre><h4>ConditionalExpression</h4><p>&#x6761;&#x4EF6;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x79F0;&#x4E4B;&#x4E3A;&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5373; <code>boolean ? true : false</code>&#x3002;&#x5C5E;&#x6027;&#x53C2;&#x8003;&#x6761;&#x4EF6;&#x8BED;&#x53E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ConditionalExpression &lt;: Expression {
    type: &quot;ConditionalExpression&quot;;
    test: Expression;
    alternate: Expression;
    consequent: Expression;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ConditionalExpression &lt;: Expression {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ConditionalExpression&quot;</span>;
    test: Expression;
    alternate: Expression;
    consequent: Expression;
}</code></pre><h3 id="articleHeader28">Misc</h3><h4>Decorator</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Decorator &lt;: Node {
  type: &quot;Decorator&quot;;
  expression: Expression;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Decorator &lt;: Node {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Decorator&quot;</span>;
  expression: Expression;
}</code></pre><h3 id="articleHeader29">Patterns</h3><p>&#x6A21;&#x5F0F;&#xFF0C;&#x4E3B;&#x8981;&#x5728; ES6 &#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x4E2D;&#x6709;&#x610F;&#x4E49;&#xFF0C;&#x5728; ES5 &#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x548C; <code>Identifier</code> &#x5DEE;&#x4E0D;&#x591A;&#x7684;&#x4E1C;&#x897F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Pattern &lt;: Node { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">interface Pattern &lt;: Node { }</code></pre><h3 id="articleHeader30">Classes</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Class &lt;: Node {
  id: Identifier | null;
  superClass: Expression | null;
  body: ClassBody;
  decorators: [ Decorator ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface Class &lt;: Node {
  <span class="hljs-attr">id</span>: Identifier | <span class="hljs-literal">null</span>;
  superClass: Expression | <span class="hljs-literal">null</span>;
  body: ClassBody;
  decorators: [ Decorator ];
}</code></pre><h4>ClassBody</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ClassBody &lt;: Node {
  type: &quot;ClassBody&quot;;
  body: [ ClassMethod | ClassPrivateMethod | ClassProperty | ClassPrivateProperty ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ClassBody &lt;: Node {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ClassBody&quot;</span>;
  body: [ ClassMethod | ClassPrivateMethod | ClassProperty | ClassPrivateProperty ];
}</code></pre><h4>ClassMethod</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ClassMethod &lt;: Function {
  type: &quot;ClassMethod&quot;;
  key: Expression;
  kind: &quot;constructor&quot; | &quot;method&quot; | &quot;get&quot; | &quot;set&quot;;
  computed: boolean;
  static: boolean;
  decorators: [ Decorator ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ClassMethod &lt;: <span class="hljs-built_in">Function</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ClassMethod&quot;</span>;
  key: Expression;
  kind: <span class="hljs-string">&quot;constructor&quot;</span> | <span class="hljs-string">&quot;method&quot;</span> | <span class="hljs-string">&quot;get&quot;</span> | <span class="hljs-string">&quot;set&quot;</span>;
  computed: boolean;
  <span class="hljs-keyword">static</span>: boolean;
  decorators: [ Decorator ];
}</code></pre><h3 id="articleHeader31">Modules</h3><h4>ImportDeclaration</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ImportDeclaration &lt;: ModuleDeclaration {
  type: &quot;ImportDeclaration&quot;;
  specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
  source: Literal;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">interface ImportDeclaration &lt;: ModuleDeclaration {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;ImportDeclaration&quot;</span>;
  specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
  source: Literal;
}</code></pre><p>import &#x58F0;&#x660E;&#xFF0C;&#x5982;&#xFF1A; <code>import foo from &quot;mod&quot;;</code></p><h2 id="articleHeader32">Babylon AST node types</h2><p>&#x60F3;&#x77E5;&#x9053;&#x5B8C;&#x6574;&#x7684;&#x6838;&#x5FC3; Babylon AST node types&#xFF0C;&#x53EF;&#x67E5;&#x770B; <a href="https://github.com/babel/babylon/blob/master/ast/spec.md" rel="nofollow noreferrer" target="_blank">babylon spec.md</a>&#x3002;&#x8FD9;&#x91CC;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x5217;&#x51FA;&#x76EE;&#x5F55;&#xFF0C;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x5BF9;&#x5F62;&#x6210;&#x6E05;&#x6670;&#x5B8C;&#x6574;&#x7684;&#x6982;&#x5FF5;&#x3002;</p><ul><li><a href="#node-objects">Node objects</a></li><li><a href="#identifier">Identifier</a></li><li><a href="#privatename">PrivateName</a></li><li><p><a href="#literals">Literals</a></p><ul><li><a href="#regexpliteral">RegExpLiteral</a></li><li><a href="#nullliteral">NullLiteral</a></li><li><a href="#stringliteral">StringLiteral</a></li><li><a href="#booleanliteral">BooleanLiteral</a></li><li><a href="#numericliteral">NumericLiteral</a></li></ul></li><li><a href="#programs">Programs</a></li><li><a href="#functions">Functions</a></li><li><p><a href="#statements">Statements</a></p><ul><li><a href="#expressionstatement">ExpressionStatement</a></li><li><a href="#blockstatement">BlockStatement</a></li><li><a href="#emptystatement">EmptyStatement</a></li><li><a href="#debuggerstatement">DebuggerStatement</a></li><li><a href="#withstatement">WithStatement</a></li><li><p><a href="#control-flow">Control flow</a></p><ul><li><a href="#returnstatement">ReturnStatement</a></li><li><a href="#labeledstatement">LabeledStatement</a></li><li><a href="#breakstatement">BreakStatement</a></li><li><a href="#continuestatement">ContinueStatement</a></li></ul></li><li><p><a href="#choice">Choice</a></p><ul><li><a href="#ifstatement">IfStatement</a></li><li><p><a href="#switchstatement">SwitchStatement</a></p><ul><li><a href="#switchcase">SwitchCase</a></li></ul></li></ul></li><li><p><a href="#exceptions">Exceptions</a></p><ul><li><a href="#throwstatement">ThrowStatement</a></li><li><p><a href="#trystatement">TryStatement</a></p><ul><li><a href="#catchclause">CatchClause</a></li></ul></li></ul></li><li><p><a href="#loops">Loops</a></p><ul><li><a href="#whilestatement">WhileStatement</a></li><li><a href="#dowhilestatement">DoWhileStatement</a></li><li><a href="#forstatement">ForStatement</a></li><li><a href="#forinstatement">ForInStatement</a></li><li><a href="#forofstatement">ForOfStatement</a></li></ul></li></ul></li><li><p><a href="#declarations">Declarations</a></p><ul><li><a href="#functiondeclaration">FunctionDeclaration</a></li><li><p><a href="#variabledeclaration">VariableDeclaration</a></p><ul><li><a href="#variabledeclarator">VariableDeclarator</a></li></ul></li></ul></li><li><p><a href="#misc">Misc</a></p><ul><li><a href="#decorator">Decorator</a></li><li><a href="#directive">Directive</a></li><li><a href="#directiveliteral">DirectiveLiteral</a></li></ul></li><li><p><a href="#expressions">Expressions</a></p><ul><li><a href="#super">Super</a></li><li><a href="#import">Import</a></li><li><a href="#thisexpression">ThisExpression</a></li><li><a href="#arrowfunctionexpression">ArrowFunctionExpression</a></li><li><a href="#yieldexpression">YieldExpression</a></li><li><a href="#awaitexpression">AwaitExpression</a></li><li><a href="#arrayexpression">ArrayExpression</a></li><li><p><a href="#objectexpression">ObjectExpression</a></p><ul><li><p><a href="#objectmember">ObjectMember</a></p><ul><li><a href="#objectproperty">ObjectProperty</a></li><li><a href="#objectmethod">ObjectMethod</a></li></ul></li></ul></li><li><a href="#functionexpression">FunctionExpression</a></li><li><p><a href="#unary-operations">Unary operations</a></p><ul><li><p><a href="#unaryexpression">UnaryExpression</a></p><ul><li><a href="#unaryoperator">UnaryOperator</a></li></ul></li><li><p><a href="#updateexpression">UpdateExpression</a></p><ul><li><a href="#updateoperator">UpdateOperator</a></li></ul></li></ul></li><li><p><a href="#binary-operations">Binary operations</a></p><ul><li><p><a href="#binaryexpression">BinaryExpression</a></p><ul><li><a href="#binaryoperator">BinaryOperator</a></li></ul></li><li><p><a href="#assignmentexpression">AssignmentExpression</a></p><ul><li><a href="#assignmentoperator">AssignmentOperator</a></li></ul></li><li><p><a href="#logicalexpression">LogicalExpression</a></p><ul><li><a href="#logicaloperator">LogicalOperator</a></li></ul></li><li><a href="#spreadelement">SpreadElement</a></li><li><a href="#memberexpression">MemberExpression</a></li><li><a href="#bindexpression">BindExpression</a></li></ul></li><li><a href="#conditionalexpression">ConditionalExpression</a></li><li><a href="#callexpression">CallExpression</a></li><li><a href="#newexpression">NewExpression</a></li><li><a href="#sequenceexpression">SequenceExpression</a></li><li><a href="#doexpression">DoExpression</a></li></ul></li><li><p><a href="#template-literals">Template Literals</a></p><ul><li><a href="#templateliteral">TemplateLiteral</a></li><li><a href="#taggedtemplateexpression">TaggedTemplateExpression</a></li><li><a href="#templateelement">TemplateElement</a></li></ul></li><li><p><a href="#patterns">Patterns</a></p><ul><li><a href="#objectpattern">ObjectPattern</a></li><li><a href="#arraypattern">ArrayPattern</a></li><li><a href="#restelement">RestElement</a></li><li><a href="#assignmentpattern">AssignmentPattern</a></li></ul></li><li><p><a href="#classes">Classes</a></p><ul><li><a href="#classbody">ClassBody</a></li><li><a href="#classmethod">ClassMethod</a></li><li><a href="#classprivatemethod">ClassPrivateMethod</a></li><li><a href="#classproperty">ClassProperty</a></li><li><a href="#classprivateproperty">ClassPrivateProperty</a></li><li><a href="#classdeclaration">ClassDeclaration</a></li><li><a href="#classexpression">ClassExpression</a></li><li><a href="#metaproperty">MetaProperty</a></li></ul></li><li><p><a href="#modules">Modules</a></p><ul><li><a href="#moduledeclaration">ModuleDeclaration</a></li><li><a href="#modulespecifier">ModuleSpecifier</a></li><li><p><a href="#imports">Imports</a></p><ul><li><a href="#importdeclaration">ImportDeclaration</a></li><li><a href="#importspecifier">ImportSpecifier</a></li><li><a href="#importdefaultspecifier">ImportDefaultSpecifier</a></li><li><a href="#importnamespacespecifier">ImportNamespaceSpecifier</a></li></ul></li><li><p><a href="#exports">Exports</a></p><ul><li><a href="#exportnameddeclaration">ExportNamedDeclaration</a></li><li><a href="#exportspecifier">ExportSpecifier</a></li><li><a href="#exportdefaultdeclaration">ExportDefaultDeclaration</a></li><li><a href="#exportalldeclaration">ExportAllDeclaration</a></li></ul></li></ul></li></ul><h2 id="articleHeader33">&#x603B;&#x7ED3;</h2><p>&#x521A;&#x5F00;&#x59CB;&#x672C;&#x6765;&#x662F;&#x51C6;&#x5907;&#x8BB2;&#x89E3; Babel &#x53CA;&#x5E38;&#x7528;&#x6A21;&#x5757;&#x7684;&#xFF0C;&#x540E;&#x6765;&#x53D1;&#x73B0;&#x5185;&#x5BB9;&#x592A;&#x5E9E;&#x5927;&#xFF0C;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6839;&#x672C;&#x5BB9;&#x7EB3;&#x4E0D;&#x4E86;&#xFF0C;&#x4E8E;&#x662F;&#x6539;&#x4E3A;&#x53EA;&#x5173;&#x6CE8; Babel &#x7684;&#x4EE3;&#x7801;&#x89E3;&#x6790; Babylon &#x90E8;&#x5206;&#xFF0C;&#x7ED3;&#x679C;&#x968F;&#x4FBF;&#x4E00;&#x6574;&#x7406;&#xFF0C;&#x53C8;&#x662F;&#x8FD9;&#x4E48;&#x957F;&#xFF0C;&#x5509;&#x3002;&#x3002;&#x3002;&#x53EA;&#x80FD;&#x8FD9;&#x6837;&#x5B50;&#x4E86;&#x3002;</p><h2 id="articleHeader34">&#x53C2;&#x8003;</h2><ul><li><a href="https://github.com/jamiebuilds/babel-handbook" rel="nofollow noreferrer" target="_blank">babel-handbook</a></li><li><a href="https://github.com/babel/babylon/blob/master/ast/spec.md" rel="nofollow noreferrer" target="_blank">babylon spec.md</a></li><li><a href="https://github.com/estree/estree" rel="nofollow noreferrer" target="_blank">estree</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶之 Javascript 抽象语法树

## 原文链接
[https://segmentfault.com/a/1190000015653342](https://segmentfault.com/a/1190000015653342)


---
title: '精读《手写 SQL 编译器 - 回溯》' 
date: 2018-11-20 2:30:10
hidden: true
slug: znfifa0egl
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2><p>&#x4E0A;&#x56DE; <a href="https://github.com/dt-fe/weekly/blob/master/66.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%89%8B%E5%86%99%20SQL%20%E7%BC%96%E8%AF%91%E5%99%A8%20-%20%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90%E3%80%8B.md" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;&#x624B;&#x5199; SQL &#x7F16;&#x8BD1;&#x5668; - &#x8BED;&#x6CD5;&#x5206;&#x6790;&#x300B;</a> &#x8BF4;&#x5230;&#x4E86;&#x5982;&#x4F55;&#x5229;&#x7528; Js &#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x65F6;&#xFF0C;&#x7559;&#x4E0B;&#x4E86;&#x4E00;&#x4E2A;&#x56DE;&#x6EAF;&#x95EE;&#x9898;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5B58;&#x6863;&#x3001;&#x8BFB;&#x6863;&#x95EE;&#x9898;&#x3002;</p><p>&#x6211;&#x4EEC;&#x628A;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#x5F53;&#x4F5C;&#x4E00;&#x4E2A;&#x8FF7;&#x5BAB;&#xFF0C;&#x6709;&#x76F4;&#x7EBF;&#x6709;&#x5C94;&#x8DEF;&#xFF0C;&#x800C;&#x60F3;&#x8981;&#x8D70;&#x51FA;&#x8FF7;&#x5BAB;&#xFF0C;&#x5728;&#x9047;&#x5230;&#x5C94;&#x8DEF;&#x65F6;&#x9700;&#x8981;&#x63D0;&#x524D;&#x8FDB;&#x884C;&#x5B58;&#x6863;&#xFF0C;&#x5728;&#x540E;&#x9762;&#x8D70;&#x9519;&#x65F6;&#x8BFB;&#x6863;&#x6362;&#x4E0B;&#x4E00;&#x4E2A;&#x5C94;&#x8DEF;&#x8FDB;&#x884C;&#x5C1D;&#x8BD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x5C31;&#x53EB;&#x56DE;&#x6EAF;&#x3002;</p><p>&#x4E0A;&#x4E00;&#x7BC7;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86; <strong>&#x5206;&#x652F;&#x51FD;&#x6570;</strong>&#xFF0C;&#x5728;&#x5206;&#x652F;&#x6267;&#x884C;&#x5931;&#x8D25;&#x540E;&#x56DE;&#x6EDA; TokenIndex &#x4F4D;&#x7F6E;&#x5E76;&#x91CD;&#x8BD5;&#xFF0C;&#x4F46;&#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6808;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x5176;&#x5B50;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x5806;&#x6808;&#x8DF3;&#x51FA;&#xFF0C;&#x6211;&#x4EEC;&#x4FBF;&#x65E0;&#x6CD5;&#x627E;&#x5230;&#x539F;&#x6765;&#x7684;&#x51FD;&#x6570;&#x6808;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x66F4;&#x52A0;&#x8BE6;&#x7EC6;&#x7684;&#x63CF;&#x8FF0;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4E3E;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5B58;&#x5728;&#x4EE5;&#x4E0B;&#x5C94;&#x8DEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a -&gt; tree() -&gt; c
     -&gt; b1 -&gt; b1&apos;
     -&gt; b2 -&gt; b2&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sml"><code>a -&gt; tree<span class="hljs-literal">()</span> -&gt; c
     -&gt; b1 -&gt; b1&apos;
     -&gt; b2 -&gt; b2&apos;</code></pre><p>&#x4E0A;&#x9762;&#x63CF;&#x8FF0;&#x4E86;&#x4E24;&#x6761;&#x5224;&#x65AD;&#x5206;&#x652F;&#xFF0C;&#x5206;&#x522B;&#x662F; <code>a -&gt; b1 -&gt; b1&apos; -&gt; c</code> &#x4E0E; <code>a -&gt; b2 -&gt; b2&apos; -&gt; c</code>&#xFF0C;&#x5F53;&#x5C94;&#x8DEF; <code>b1</code> &#x6267;&#x884C;&#x5931;&#x8D25;&#x540E;&#xFF0C;&#x5206;&#x652F;&#x51FD;&#x6570; <code>tree</code> &#x53EF;&#x4EE5;&#x590D;&#x539F;&#x5230; <code>b2</code> &#x4F4D;&#x7F6E;&#x5C1D;&#x8BD5;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x3002;</p><p>&#x4F46;&#x8BBE;&#x60F3; <code>b1 -&gt; b1&apos;</code> &#x901A;&#x8FC7;&#xFF0C;&#x4F46; <code>b1 -&gt; b1&apos; -&gt; c</code> &#x4E0D;&#x901A;&#x8FC7;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x7531;&#x4E8E; <code>b1&apos;</code> &#x6267;&#x884C;&#x5B8C;&#x540E;&#xFF0C;&#x5206;&#x652F;&#x51FD;&#x6570; <code>tree</code> &#x7684;&#x8C03;&#x7528;&#x6808;&#x5DF2;&#x7ECF;&#x9000;&#x51FA;&#xFF0C;&#x65E0;&#x6CD5;&#x518D;&#x5C1D;&#x8BD5;&#x8DEF;&#x7EBF; <code>b2 -&gt; b2&apos;</code> &#x4E86;&#x3002;</p><p>&#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x8981; <strong>&#x901A;&#x8FC7;&#x94FE;&#x8868;&#x624B;&#x52A8;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6267;&#x884C;&#x8FC7;&#x7A0B;</strong>&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x56DE;&#x6EAF;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x5DE6;&#x9012;&#x5F52;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x5728;&#x6267;&#x884C;&#x524D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x52A0;&#x4E00;&#x4E9B; Magic &#x52A8;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x8C03;&#x6362;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF01;&#x8FD9;&#x6587;&#x7AE0;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x901A;&#x8FC7;&#x94FE;&#x8868;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6808;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x56DE;&#x6EAF;&#x3002;</p><h2 id="articleHeader1">2 &#x7CBE;&#x8BFB;</h2><p>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x62E5;&#x6709;&#x4E86;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x51FD;&#x6570; <code>chain</code>&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;&#x8868;&#x793A;&#x8FDE;&#x7EED;&#x5339;&#x914D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const root = (tokens: IToken[], tokenIndex: number) =&gt; match(&apos;a&apos;, tokens, tokenIndex) &amp;&amp; match(&apos;b&apos;, tokens, tokenIndex) &amp;&amp; match(&apos;c&apos;, tokens, tokenIndex)
&#x2193; &#x2193; &#x2193; &#x2193; &#x2193; &#x2193;
const root = (chain: IChain) =&gt; chain(&apos;a&apos;, &apos;b&apos;, &apos;c&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> root = <span class="hljs-function">(<span class="hljs-params">tokens: IToken[], tokenIndex: <span class="hljs-built_in">number</span></span>) =&gt;</span> match(<span class="hljs-string">&apos;a&apos;</span>, tokens, tokenIndex) &amp;&amp; match(<span class="hljs-string">&apos;b&apos;</span>, tokens, tokenIndex) &amp;&amp; match(<span class="hljs-string">&apos;c&apos;</span>, tokens, tokenIndex)
&#x2193; &#x2193; &#x2193; &#x2193; &#x2193; &#x2193;
<span class="hljs-keyword">const</span> root = <span class="hljs-function">(<span class="hljs-params">chain: IChain</span>) =&gt;</span> chain(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>)</code></pre><p>&#x9047;&#x5230;&#x5206;&#x652F;&#x6761;&#x4EF6;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x6570;&#x7EC4;&#x8868;&#x793A;&#x53D6;&#x4EE3; <code>tree</code> &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const root = (tokens: IToken[], tokenIndex: number) =&gt; tree(
  line(match(&apos;a&apos;, tokens, tokenIndex) &amp;&amp; match(&apos;b&apos;, tokens, tokenIndex)),
  line(match(&apos;c&apos;, tokens, tokenIndex) &amp;&amp; match(&apos;d&apos;, tokens, tokenIndex))
)
&#x2193; &#x2193; &#x2193; &#x2193; &#x2193; &#x2193;
const root = (chain: IChain) =&gt; chain([
  chain(&apos;a&apos;, &apos;b&apos;),
  chain(&apos;c&apos;, &apos;d&apos;)
])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> root = <span class="hljs-function">(<span class="hljs-params">tokens: IToken[], tokenIndex: <span class="hljs-built_in">number</span></span>) =&gt;</span> tree(
  line(match(<span class="hljs-string">&apos;a&apos;</span>, tokens, tokenIndex) &amp;&amp; match(<span class="hljs-string">&apos;b&apos;</span>, tokens, tokenIndex)),
  line(match(<span class="hljs-string">&apos;c&apos;</span>, tokens, tokenIndex) &amp;&amp; match(<span class="hljs-string">&apos;d&apos;</span>, tokens, tokenIndex))
)
&#x2193; &#x2193; &#x2193; &#x2193; &#x2193; &#x2193;
<span class="hljs-keyword">const</span> root = <span class="hljs-function">(<span class="hljs-params">chain: IChain</span>) =&gt;</span> chain([
  chain(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>),
  chain(<span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>)
])</code></pre><p>&#x8FD9;&#x4E2A; <code>chain</code> &#x51FD;&#x6570;&#x6709;&#x4E24;&#x4E2A;&#x7279;&#x8D28;&#xFF1A;</p><ol><li>&#x975E;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5; <strong>&#x9884;&#x5148;&#x751F;&#x6210;&#x6267;&#x884C;&#x94FE;&#x6761;</strong> &#xFF0C;&#x5E76;&#x5BF9;&#x94FE;&#x6761;&#x7ED3;&#x6784;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x3001;&#x751A;&#x81F3;&#x63A7;&#x5236;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x5B9E;&#x73B0;&#x56DE;&#x6EAF;&#x529F;&#x80FD;&#x3002;</li><li>&#x65E0;&#x9700;&#x663E;&#x793A;&#x4F20;&#x9012; Token&#xFF0C;&#x51CF;&#x5C11;&#x6BCF;&#x4E00;&#x6B65;&#x5339;&#x914D;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x3002;</li></ol><h3 id="articleHeader2">&#x5C01;&#x88C5; scanner&#x3001;matchToken</h3><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5236;&#x4F5C; scanner &#x51FD;&#x6570;&#x5C01;&#x88C5;&#x5BF9; token &#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const query = &quot;select * from table;&quot;;
const tokens = new Lexer(query);
const scanner = new Scanner(tokens);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> query = <span class="hljs-string">&quot;select * from table;&quot;</span>;
<span class="hljs-keyword">const</span> tokens = <span class="hljs-keyword">new</span> Lexer(query);
<span class="hljs-keyword">const</span> scanner = <span class="hljs-keyword">new</span> Scanner(tokens);</code></pre><p>scanner &#x62E5;&#x6709;&#x4E24;&#x4E2A;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#xFF0C;&#x5206;&#x522B;&#x662F; <code>read</code> &#x8BFB;&#x53D6;&#x5F53;&#x524D; token &#x5185;&#x5BB9;&#xFF0C;&#x548C; <code>next</code> &#x5C06; token &#x5411;&#x4E0B;&#x79FB;&#x52A8;&#x4E00;&#x4F4D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x5C01;&#x88C5;&#x65B0;&#x7684; <code>matchToken</code> &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function matchToken(
  scanner: Scanner,
  compare: (token: IToken) =&gt; boolean
): IMatch {
  const token = scanner.read();
  if (!token) {
    return false;
  }
  if (compare(token)) {
    scanner.next();
    return true;
  } else {
    return false;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">matchToken</span>(<span class="hljs-params">
  scanner: Scanner,
  compare: (token: IToken</span>) =&gt; <span class="hljs-title">boolean</span>
): <span class="hljs-title">IMatch</span> </span>{
  <span class="hljs-keyword">const</span> token = scanner.read();
  <span class="hljs-keyword">if</span> (!token) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">if</span> (compare(token)) {
    scanner.next();
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}</code></pre><p>&#x5982;&#x679C; token &#x6D88;&#x8017;&#x5B8C;&#xFF0C;&#x6216;&#x8005;&#x4E0E;&#x6BD4;&#x5BF9;&#x4E0D;&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE; false &#x4E14;&#x4E0D;&#x6D88;&#x8017; token&#xFF0C;&#x5F53;&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x6D88;&#x8017;&#x4E00;&#x4E2A; token &#x5E76;&#x8FD4;&#x56DE; true&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x7528; <code>matchToken</code> &#x51FD;&#x6570;&#x5199;&#x4E00;&#x6BB5;&#x5339;&#x914D;&#x4EE3;&#x7801;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const query = &quot;select * from table;&quot;;
const tokens = new Lexer(query);
const scanner = new Scanner(tokens);
const root =
  matchToken(scanner, token =&gt; token.value === &quot;select&quot;) &amp;&amp;
  matchToken(scanner, token =&gt; token.value === &quot;*&quot;) &amp;&amp;
  matchToken(scanner, token =&gt; token.value === &quot;from&quot;) &amp;&amp;
  matchToken(scanner, token =&gt; token.value === &quot;table&quot;) &amp;&amp;
  matchToken(scanner, token =&gt; token.value === &quot;;&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> query = <span class="hljs-string">&quot;select * from table;&quot;</span>;
<span class="hljs-keyword">const</span> tokens = <span class="hljs-keyword">new</span> Lexer(query);
<span class="hljs-keyword">const</span> scanner = <span class="hljs-keyword">new</span> Scanner(tokens);
<span class="hljs-keyword">const</span> root =
  matchToken(scanner, <span class="hljs-function"><span class="hljs-params">token</span> =&gt;</span> token.value === <span class="hljs-string">&quot;select&quot;</span>) &amp;&amp;
  matchToken(scanner, <span class="hljs-function"><span class="hljs-params">token</span> =&gt;</span> token.value === <span class="hljs-string">&quot;*&quot;</span>) &amp;&amp;
  matchToken(scanner, <span class="hljs-function"><span class="hljs-params">token</span> =&gt;</span> token.value === <span class="hljs-string">&quot;from&quot;</span>) &amp;&amp;
  matchToken(scanner, <span class="hljs-function"><span class="hljs-params">token</span> =&gt;</span> token.value === <span class="hljs-string">&quot;table&quot;</span>) &amp;&amp;
  matchToken(scanner, <span class="hljs-function"><span class="hljs-params">token</span> =&gt;</span> token.value === <span class="hljs-string">&quot;;&quot;</span>);</code></pre><p>&#x6211;&#x4EEC;&#x6700;&#x7EC8;&#x5E0C;&#x671B;&#x8868;&#x8FBE;&#x6210;&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const root = (chain: IChain) =&gt; chain(&quot;select&quot;, &quot;*&quot;, &quot;from&quot;, &quot;table&quot;, &quot;;&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> root = <span class="hljs-function">(<span class="hljs-params">chain: IChain</span>) =&gt;</span> chain(<span class="hljs-string">&quot;select&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;from&quot;</span>, <span class="hljs-string">&quot;table&quot;</span>, <span class="hljs-string">&quot;;&quot;</span>);</code></pre><p>&#x65E2;&#x7136; chain &#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x7EBF;&#x7D22;&#x8D2F;&#x7A7F;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF0C;&#x90A3; scanner &#x51FD;&#x6570;&#x9700;&#x8981;&#x88AB;&#x5305;&#x542B;&#x5728; chain &#x51FD;&#x6570;&#x7684;&#x95ED;&#x5305;&#x91CC;&#x5185;&#x90E8;&#x4F20;&#x9012;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6784;&#x9020;&#x51FA;&#x7B2C;&#x4E00;&#x4E2A; chain&#x3002;</p><h3 id="articleHeader3">&#x5C01;&#x88C5; createChainNodeFactory</h3><p>&#x6211;&#x4EEC;&#x9700;&#x8981; createChainNodeFactory &#x51FD;&#x6570;&#x5C06; scanner &#x4F20;&#x8FDB;&#x53BB;&#xFF0C;&#x5728;&#x5185;&#x90E8;&#x5077;&#x5077;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x4E0D;&#x8981;&#x5728;&#x5916;&#x90E8;&#x4EE3;&#x7801;&#x663E;&#x793A;&#x4F20;&#x9012;&#xFF0C;&#x800C;&#x4E14; chain &#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x7531;&#x6B64;&#x53EF;&#x4EE5;&#x5C01;&#x88C5;&#x4E8C;&#x9636;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createChainNodeFactory = (scanner: Scanner, parentNode?: ChainNode) =&gt; (
  ...elements: any[]
): ChainNode =&gt; {
  // &#x751F;&#x6210;&#x7B2C;&#x4E00;&#x4E2A;&#x8282;&#x70B9;
  return firstNode;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> createChainNodeFactory = <span class="hljs-function">(<span class="hljs-params">scanner: Scanner, parentNode?: ChainNode</span>) =&gt;</span> (
  ...elements: <span class="hljs-built_in">any</span>[]
): <span class="hljs-function"><span class="hljs-params">ChainNode</span> =&gt;</span> {
  <span class="hljs-comment">// &#x751F;&#x6210;&#x7B2C;&#x4E00;&#x4E2A;&#x8282;&#x70B9;</span>
  <span class="hljs-keyword">return</span> firstNode;
};</code></pre><p>&#x9700;&#x8981;&#x8BF4;&#x660E;&#x4E24;&#x70B9;&#xFF1A;</p><ol><li>chain &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x94FE;&#x8868;&#x8282;&#x70B9;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; visiter &#x51FD;&#x6570;&#x8BBF;&#x95EE;&#x6574;&#x6761;&#x94FE;&#x8868;&#x4E86;&#x3002;</li><li><code>(...elements: any[]): ChainNode</code> &#x5C31;&#x662F; chain &#x51FD;&#x6570;&#x672C;&#x8EAB;&#xFF0C;&#x5B83;&#x63A5;&#x6536;&#x4E00;&#x7CFB;&#x5217;&#x53C2;&#x6570;&#xFF0C;&#x6839;&#x636E;&#x7C7B;&#x578B;&#x8FDB;&#x884C;&#x529F;&#x80FD;&#x5206;&#x7C7B;&#x3002;</li></ol><p>&#x6709;&#x4E86; createChainNodeFactory&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x6267;&#x884C;&#x5165;&#x53E3;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chainNodeFactory = createChainNodeFactory(scanner);
const firstNode = chainNodeFactory(root); // const root = (chain: IChain) =&gt; chain(&apos;select&apos;, &apos;*&apos;, &apos;from&apos;, &apos;table&apos;, &apos;;&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> chainNodeFactory = createChainNodeFactory(scanner);
<span class="hljs-keyword">const</span> firstNode = chainNodeFactory(root); <span class="hljs-comment">// const root = (chain: IChain) =&gt; chain(&apos;select&apos;, &apos;*&apos;, &apos;from&apos;, &apos;table&apos;, &apos;;&apos;)</span></code></pre><p>&#x4E3A;&#x4E86;&#x652F;&#x6301; <code>chain(&apos;select&apos;, &apos;*&apos;, &apos;from&apos;, &apos;table&apos;, &apos;;&apos;)</code> &#x8BED;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x662F;&#x6587;&#x672C;&#x7C7B;&#x578B;&#x65F6;&#xFF0C;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x4E00;&#x4E2A; matchToken &#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x94FE;&#x8868;&#x8282;&#x70B9;&#xFF0C;&#x540C;&#x65F6;&#x901A;&#x8FC7; reduce &#x51FD;&#x6570;&#x5C06;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x5173;&#x8054;&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createChainNodeFactory = (scanner: Scanner, parentNode?: ChainNode) =&gt; (
  ...elements: any[]
): ChainNode =&gt; {
  let firstNode: ChainNode = null;

  elements.reduce((prevNode: ChainNode, element) =&gt; {
    const node = new ChainNode();

    // ... Link node

    node.addChild(createChainChildByElement(node, scanner, element));

    return node;
  }, parentNode);

  return firstNode;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> createChainNodeFactory = <span class="hljs-function">(<span class="hljs-params">scanner: Scanner, parentNode?: ChainNode</span>) =&gt;</span> (
  ...elements: <span class="hljs-built_in">any</span>[]
): <span class="hljs-function"><span class="hljs-params">ChainNode</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> firstNode: ChainNode = <span class="hljs-literal">null</span>;

  elements.reduce(<span class="hljs-function">(<span class="hljs-params">prevNode: ChainNode, element</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> node = <span class="hljs-keyword">new</span> ChainNode();

    <span class="hljs-comment">// ... Link node</span>

    node.addChild(createChainChildByElement(node, scanner, element));

    <span class="hljs-keyword">return</span> node;
  }, parentNode);

  <span class="hljs-keyword">return</span> firstNode;
};</code></pre><p>&#x4F7F;&#x7528; reduce &#x51FD;&#x6570;&#x5BF9;&#x94FE;&#x8868;&#x4E0A;&#x4E0B;&#x8282;&#x70B9;&#x8FDB;&#x884C;&#x5173;&#x8054;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x6BD4;&#x8F83;&#x5E38;&#x89C4;&#x6240;&#x4EE5;&#x5FFD;&#x7565;&#x6389;&#xFF0C;&#x901A;&#x8FC7; createChainChildByElement &#x51FD;&#x6570;&#x5BF9;&#x4F20;&#x5165;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x5206;&#x7C7B;&#xFF0C;&#x5982;&#x679C; <strong>&#x4F20;&#x5165;&#x51FD;&#x6570;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5C31;&#x6784;&#x9020;&#x4E00;&#x4E2A; matchToken &#x51FD;&#x6570;&#x585E;&#x5165;&#x5F53;&#x524D;&#x94FE;&#x8868;&#x7684;&#x5B50;&#x5143;&#x7D20;</strong>&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x94FE;&#x8868;&#x65F6;&#xFF0C;&#x518D;&#x6267;&#x884C; matchToken &#x51FD;&#x6570;&#x3002;</p><p>&#x91CD;&#x70B9;&#x662F;&#x6211;&#x4EEC;&#x5BF9;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x5148;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x94FE;&#x8868;&#x7ED3;&#x6784;&#x3002;</p><h3 id="articleHeader4">&#x94FE;&#x8868;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ChainNode {
  public prev: ChainNode;
  public next: ChainNode;
  public childs: ChainChild[] = [];
}

class ChainChild {
  // If type is function, when run it, will expend.
  public type: &quot;match&quot; | &quot;chainNode&quot; | &quot;function&quot;;
  public node?: IMatchFn | ChainNode | ChainFunctionNode;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> ChainNode {
  <span class="hljs-keyword">public</span> prev: ChainNode;
  <span class="hljs-keyword">public</span> next: ChainNode;
  <span class="hljs-keyword">public</span> childs: ChainChild[] = [];
}

<span class="hljs-keyword">class</span> ChainChild {
  <span class="hljs-comment">// If type is function, when run it, will expend.</span>
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;match&quot;</span> | <span class="hljs-string">&quot;chainNode&quot;</span> | <span class="hljs-string">&quot;function&quot;</span>;
  <span class="hljs-keyword">public</span> node?: IMatchFn | ChainNode | ChainFunctionNode;
}</code></pre><p>ChainNode &#x662F;&#x5BF9;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x8FD9;&#x91CC;&#x7ED9;&#x51FA;&#x4E86;&#x548C;&#x5F53;&#x524D;&#x6587;&#x7AE0;&#x5185;&#x5BB9;&#x76F8;&#x5173;&#x7684;&#x90E8;&#x5206;&#x5B9A;&#x4E49;&#x3002;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;&#x53CC;&#x5411;&#x94FE;&#x8868;&#xFF0C;&#x56E0;&#x6B64;&#x6BCF;&#x4E2A; node &#x8282;&#x70B9;&#x90FD;&#x62E5;&#x6709; prev &#x4E0E; next &#x5C5E;&#x6027;&#xFF0C;&#x5206;&#x522B;&#x6307;&#x5411;&#x4E0A;&#x4E00;&#x4E2A;&#x4E0E;&#x4E0B;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x800C; childs &#x662F;&#x8FD9;&#x4E2A;&#x94FE;&#x8868;&#x4E0B;&#x6302;&#x8F7D;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x53EF;&#x4EE5;&#x662F; matchToken &#x51FD;&#x6570;&#x3001;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x3001;&#x6216;&#x8005;&#x662F;&#x51FD;&#x6570;&#x3002;</p><p>&#x6574;&#x4E2A;&#x94FE;&#x8868;&#x7ED3;&#x6784;&#x53EF;&#x80FD;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node1 &lt;-&gt; node2 &lt;-&gt; node3 &lt;-&gt; node4
            |- function2-1
            |- matchToken2-1
            |- node2-1 &lt;-&gt; node2-2 &lt;-&gt; node2-3
                              |- matchToken2-2-1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code><span class="hljs-symbol">node1</span> &lt;-&gt; <span class="hljs-symbol">node2</span> &lt;-&gt; <span class="hljs-symbol">node3</span> &lt;-&gt; <span class="hljs-symbol">node4</span>
            |- fu<span class="hljs-symbol">nction2</span><span class="hljs-number">-1</span>
            |- matchToke<span class="hljs-symbol">n2</span><span class="hljs-number">-1</span>
            |- <span class="hljs-symbol">node2</span><span class="hljs-number">-1</span> &lt;-&gt; <span class="hljs-symbol">node2</span><span class="hljs-number">-2</span> &lt;-&gt; <span class="hljs-symbol">node2</span><span class="hljs-number">-3</span>
                              |- matchToke<span class="hljs-symbol">n2</span><span class="hljs-number">-2</span><span class="hljs-number">-1</span></code></pre><p>&#x5BF9;&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x90FD;&#x81F3;&#x5C11;&#x5B58;&#x5728;&#x4E00;&#x4E2A; child &#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x591A;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8868;&#x793A;&#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x662F; tree &#x8282;&#x70B9;&#xFF0C;&#x5B58;&#x5728;&#x5206;&#x652F;&#x60C5;&#x51B5;&#x3002;</p><p>&#x800C;&#x8282;&#x70B9;&#x7C7B;&#x578B; <code>ChainChild</code> &#x4E5F;&#x53EF;&#x4EE5;&#x4ECE;&#x5B9A;&#x4E49;&#x4E2D;&#x770B;&#x5230;&#xFF0C;&#x6709;&#x4E09;&#x79CD;&#x7C7B;&#x578B;&#xFF0C;&#x6211;&#x4EEC;&#x5206;&#x522B;&#x8BF4;&#x660E;&#xFF1A;</p><h4>matchToken &#x7C7B;&#x578B;</h4><p>&#x8FD9;&#x79CD;&#x7C7B;&#x578B;&#x662F;&#x6700;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#xFF0C;&#x7531;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x751F;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain(&quot;word&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial">chain(<span class="hljs-string">&quot;word&quot;</span>);</code></pre><p>&#x94FE;&#x8868;&#x6267;&#x884C;&#x65F6;&#xFF0C;match &#x662F;&#x6700;&#x57FA;&#x672C;&#x7684;&#x6267;&#x884C;&#x5355;&#x5143;&#xFF0C;&#x51B3;&#x5B9A;&#x4E86;&#x8BED;&#x53E5;&#x662F;&#x5426;&#x80FD;&#x5339;&#x914D;&#xFF0C;&#x4E5F;&#x662F;&#x552F;&#x4E00;&#x4F1A;&#x6D88;&#x8017; Token &#x7684;&#x5355;&#x5143;&#x3002;</p><h4>node &#x7C7B;&#x578B;</h4><p>&#x94FE;&#x8868;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x7C7B;&#x6BD4;&#x5D4C;&#x5957;&#x51FD;&#x6570;&#xFF0C;&#x7531;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x751F;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain(chain(&quot;word&quot;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial">chain(chain(<span class="hljs-string">&quot;word&quot;</span>));</code></pre><p>&#x4E5F;&#x5C31;&#x662F; chain &#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5C31;&#x662F; chain &#x672C;&#x8EAB;&#xFF0C;&#x90A3;&#x8FD9;&#x4E2A; chain &#x5B50;&#x94FE;&#x8868;&#x4F1A;&#x4F5C;&#x4E3A;&#x7236;&#x7EA7;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x5230;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x65F6;&#xFF0C;&#x4F1A;&#x8FDB;&#x884C;&#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;&#xFF0C;&#x5982;&#x679C;&#x6267;&#x884C;&#x901A;&#x8FC7;&#xFF0C;&#x4F1A;&#x8DF3;&#x5230;&#x7236;&#x7EA7;&#x7EE7;&#x7EED;&#x5BFB;&#x627E;&#x4E0B;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x5176;&#x6267;&#x884C;&#x673A;&#x5236;&#x7C7B;&#x6BD4;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6808;&#x7684;&#x8FDB;&#x51FA;&#x5173;&#x7CFB;&#x3002;</p><h4>&#x51FD;&#x6570;&#x7C7B;&#x578B;</h4><p>&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x975E;&#x5E38;&#x7279;&#x522B;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x9012;&#x5F52;&#x5C55;&#x5F00;&#x6240;&#x6709;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#xFF0C;&#x56E0;&#x4E3A;&#x6587;&#x6CD5;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x65E0;&#x9650;&#x9012;&#x5F52;&#x7684;&#x60C5;&#x51B5;&#x3002;</p><p>&#x597D;&#x6BD4;&#x4E00;&#x4E2A;&#x8FF7;&#x5BAB;&#xFF0C;&#x5F88;&#x591A;&#x533A;&#x57DF;&#x90FD;&#x662F;&#x76F8;&#x540C;&#x5E76;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5C06;&#x8FF7;&#x5BAB;&#x5B8C;&#x5168;&#x5C55;&#x5F00;&#xFF0C;&#x90A3;&#x8FF7;&#x5BAB;&#x7684;&#x5927;&#x5C0F;&#x5C06;&#x8FBE;&#x5230;&#x65E0;&#x7A77;&#x5927;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8BA1;&#x7B97;&#x673A;&#x6267;&#x884C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x4E00;&#x6B65;&#x6B65;&#x5C55;&#x5F00;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#xFF0C;&#x8BA9;&#x8FF7;&#x5BAB;&#x7ED3;&#x675F;&#x53D6;&#x51B3;&#x4E8E; Token &#x6D88;&#x8017;&#x5B8C;&#x3001;&#x8D70;&#x51FA;&#x8FF7;&#x5BAB;&#x3001;&#x6216;&#x8005; match &#x4E0D;&#x4E0A; Token&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5728;&#x751F;&#x6210;&#x8FF7;&#x5BAB;&#x65F6;&#x5C31;&#x5C06;&#x8D44;&#x6E90;&#x6D88;&#x8017;&#x5B8C;&#x6BD5;&#x3002;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x8282;&#x70B9;&#x7531;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x751F;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain(root);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial">chain(root);</code></pre><p>&#x6240;&#x6709;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x8282;&#x70B9;&#x90FD;&#x4F1A;&#x5728;&#x6267;&#x884C;&#x5230;&#x7684;&#x65F6;&#x5019;&#x5C55;&#x5F00;&#xFF0C;&#x5728;&#x5C55;&#x5F00;&#x65F6;&#x5982;&#x679C;&#x518D;&#x6B21;&#x9047;&#x5230;&#x51FD;&#x6570;&#x8282;&#x70B9;&#x4ECD;&#x4F1A;&#x4FDD;&#x7559;&#xFF0C;&#x7B49;&#x5F85;&#x4E0B;&#x6B21;&#x6267;&#x884C;&#x5230;&#x65F6;&#x518D;&#x5C55;&#x5F00;&#x3002;</p><h4>&#x5206;&#x652F;</h4><p>&#x666E;&#x901A;&#x7684;&#x94FE;&#x8DEF;&#x53EA;&#x662F;&#x5206;&#x652F;&#x7684;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF0C;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x662F;&#x7B49;&#x4EF7;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain(&quot;a&quot;);
chain([&quot;a&quot;]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript">chain(<span class="hljs-string">&quot;a&quot;</span>);
chain([<span class="hljs-string">&quot;a&quot;</span>]);</code></pre><p>&#x518D;&#x5BF9;&#x6BD4;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain([&quot;a&quot;]);
chain([&quot;a&quot;, &quot;b&quot;]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript">chain([<span class="hljs-string">&quot;a&quot;</span>]);
chain([<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>]);</code></pre><p>&#x65E0;&#x8BBA;&#x662F;&#x76F4;&#x7EBF;&#x8FD8;&#x662F;&#x5206;&#x652F;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x5206;&#x652F;&#x8DEF;&#x7EBF;&#xFF0C;&#x800C;&#x76F4;&#x7EBF;&#xFF08;&#x65E0;&#x5206;&#x652F;&#xFF09;&#x7684;&#x60C5;&#x51B5;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x53EA;&#x6709;&#x4E00;&#x6761;&#x5206;&#x53C9;&#x7684;&#x5206;&#x652F;&#xFF0C;&#x5BF9;&#x6BD4;&#x5230;&#x94FE;&#x8868;&#x8282;&#x70B9;&#xFF0C;&#x5BF9;&#x5E94; childs &#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x3002;</p><h3 id="articleHeader5">&#x56DE;&#x6EAF;</h3><p>&#x73B0;&#x5728; chain &#x51FD;&#x6570;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x4E86;&#x4E09;&#x79CD;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x4E00;&#x79CD;&#x5206;&#x652F;&#x8868;&#x8FBE;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain(&quot;a&quot;); // MatchNode
chain(chain(&quot;a&quot;)); // ChainNode
chain(foo); // FunctionNode
chain([&quot;a&quot;]); // &#x5206;&#x652F; -&gt; [MatchNode]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript">chain(<span class="hljs-string">&quot;a&quot;</span>); <span class="hljs-comment">// MatchNode</span>
chain(chain(<span class="hljs-string">&quot;a&quot;</span>)); <span class="hljs-comment">// ChainNode</span>
chain(foo); <span class="hljs-comment">// FunctionNode</span>
chain([<span class="hljs-string">&quot;a&quot;</span>]); <span class="hljs-comment">// &#x5206;&#x652F; -&gt; [MatchNode]</span></code></pre><p>&#x800C;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x4E86; chain &#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;&#x6267;&#x884C;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x53EA;&#x662F;&#x751F;&#x6210;&#x94FE;&#x8868;&#x7ED3;&#x6784;&#xFF0C;&#x800C;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x6267;&#x884C;&#x5185;&#x5BB9;&#xFF0C;&#x5185;&#x5BB9;&#x5305;&#x542B;&#x5728; childs &#x4E2D;&#x3002;</p><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6784;&#x9020; execChain &#x51FD;&#x6570;&#xFF0C;&#x62FF;&#x5230;&#x94FE;&#x8868;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x5E76;&#x901A;&#x8FC7; visiter &#x51FD;&#x6570;&#x904D;&#x5386;&#x94FE;&#x8868;&#x8282;&#x70B9;&#x6765;&#x771F;&#x6B63;&#x6267;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function visiter(
  chainNode: ChainNode,
  scanner: Scanner,
  treeChances: ITreeChance[]
): boolean {
  const currentTokenIndex = scanner.getIndex();

  if (!chainNode) {
    return false;
  }

  const nodeResult = chainNode.run();

  let nestedMatch = nodeResult.match;

  if (nodeResult.match &amp;&amp; nodeResult.nextNode) {
    nestedMatch = visiter(nodeResult.nextNode, scanner, treeChances);
  }

  if (nestedMatch) {
    if (!chainNode.isFinished) {
      // It&apos;s a new chance, because child match is true, so we can visit next node, but current node is not finished, so if finally falsely, we can go back here.
      treeChances.push({
        chainNode,
        tokenIndex: currentTokenIndex
      });
    }

    if (chainNode.next) {
      return visiter(chainNode.next, scanner, treeChances);
    } else {
      return true;
    }
  } else {
    if (chainNode.isFinished) {
      // Game over, back to root chain.
      return false;
    } else {
      // Try again
      scanner.setIndex(currentTokenIndex);
      return visiter(chainNode, scanner, treeChances);
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">visiter</span>(<span class="hljs-params">
  chainNode: ChainNode,
  scanner: Scanner,
  treeChances: ITreeChance[]
</span>): <span class="hljs-title">boolean</span> </span>{
  <span class="hljs-keyword">const</span> currentTokenIndex = scanner.getIndex();

  <span class="hljs-keyword">if</span> (!chainNode) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">const</span> nodeResult = chainNode.run();

  <span class="hljs-keyword">let</span> nestedMatch = nodeResult.match;

  <span class="hljs-keyword">if</span> (nodeResult.match &amp;&amp; nodeResult.nextNode) {
    nestedMatch = visiter(nodeResult.nextNode, scanner, treeChances);
  }

  <span class="hljs-keyword">if</span> (nestedMatch) {
    <span class="hljs-keyword">if</span> (!chainNode.isFinished) {
      <span class="hljs-comment">// It&apos;s a new chance, because child match is true, so we can visit next node, but current node is not finished, so if finally falsely, we can go back here.</span>
      treeChances.push({
        chainNode,
        tokenIndex: currentTokenIndex
      });
    }

    <span class="hljs-keyword">if</span> (chainNode.next) {
      <span class="hljs-keyword">return</span> visiter(chainNode.next, scanner, treeChances);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (chainNode.isFinished) {
      <span class="hljs-comment">// Game over, back to root chain.</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Try again</span>
      scanner.setIndex(currentTokenIndex);
      <span class="hljs-keyword">return</span> visiter(chainNode, scanner, treeChances);
    }
  }
}</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;nestedMatch &#x7C7B;&#x6BD4;&#x5D4C;&#x5957;&#x51FD;&#x6570;&#xFF0C;&#x800C; treeChances &#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x56DE;&#x6EAF;&#x7684;&#x5173;&#x952E;&#x3002;</p><h4>&#x5F53;&#x524D;&#x8282;&#x70B9;&#x6267;&#x884C;&#x5931;&#x8D25;&#x65F6;</h4><p>&#x7531;&#x4E8E;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x90FD;&#x5305;&#x542B; N &#x4E2A; child&#xFF0C;&#x6240;&#x4EE5;&#x4EFB;&#x4F55;&#x65F6;&#x5019;&#x6267;&#x884C;&#x5931;&#x8D25;&#xFF0C;&#x90FD;&#x7ED9;&#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x7684; child &#x6253;&#x6807;&#xFF0C;&#x5E76;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x662F;&#x5426;&#x8FD8;&#x6709;&#x5B50;&#x8282;&#x70B9;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#xFF0C;&#x5E76;&#x5C1D;&#x8BD5;&#x5230;&#x6240;&#x6709;&#x8282;&#x70B9;&#x90FD;&#x5931;&#x8D25;&#x624D;&#x8FD4;&#x56DE; false&#x3002;</p><h4>&#x5F53;&#x524D;&#x8282;&#x70B9;&#x6267;&#x884C;&#x6210;&#x529F;&#x65F6;&#xFF0C;&#x8FDB;&#x884C;&#x4F4D;&#x7F6E;&#x5B58;&#x6863;</h4><p>&#x5F53;&#x8282;&#x70B9;&#x6210;&#x529F;&#x65F6;&#xFF0C;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x540E;&#x7EED;&#x94FE;&#x8DEF;&#x6267;&#x884C;&#x5931;&#x8D25;&#xFF0C;&#x9700;&#x8981;&#x8BB0;&#x5F55;&#x4E0B;&#x5F53;&#x524D;&#x6267;&#x884C;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5229;&#x7528; treeChances &#x4FDD;&#x5B58;&#x4E00;&#x4E2A;&#x5B58;&#x76D8;&#x70B9;&#x3002;</p><p>&#x7136;&#x800C;&#x6211;&#x4EEC;&#x4E0D;&#x77E5;&#x9053;&#x4F55;&#x65F6;&#x6574;&#x4E2A;&#x94FE;&#x8868;&#x4F1A;&#x906D;&#x9047;&#x5931;&#x8D25;&#xFF0C;&#x6240;&#x4EE5;&#x5FC5;&#x987B;&#x7B49;&#x5F85;&#x6574;&#x4E2A; visiter &#x6267;&#x884C;&#x5B8C;&#x624D;&#x77E5;&#x9053;&#x662F;&#x5426;&#x6267;&#x884C;&#x5931;&#x8D25;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x6BCF;&#x6B21;&#x6267;&#x884C;&#x7ED3;&#x675F;&#x65F6;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x8FD8;&#x6709;&#x5B58;&#x76D8;&#x70B9;&#xFF08;treeChances&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while (!result &amp;&amp; treeChances.length &gt; 0) {
  const newChance = treeChances.pop();
  scanner.setIndex(newChance.tokenIndex);
  result = judgeChainResult(
    visiter(newChance.chainNode, scanner, treeChances),
    scanner
  );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">while</span> (!result &amp;&amp; treeChances.length &gt; <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">const</span> newChance = treeChances.pop();
  scanner.setIndex(newChance.tokenIndex);
  result = judgeChainResult(
    visiter(newChance.chainNode, scanner, treeChances),
    scanner
  );
}</code></pre><p>&#x540C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x94FE;&#x8868;&#x7ED3;&#x6784;&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x5B57;&#x6BB5; tokenIndex&#xFF0C;&#x4EE5;&#x5907;&#x56DE;&#x6EAF;&#x8FD8;&#x539F;&#x4F7F;&#x7528;&#xFF0C;&#x540C;&#x65F6;&#x8C03;&#x7528; scanner &#x51FD;&#x6570;&#x7684; <code>setIndex</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5C06; token &#x4F4D;&#x7F6E;&#x8FD8;&#x539F;&#x3002;</p><p>&#x6700;&#x540E;&#x5982;&#x679C;&#x673A;&#x4F1A;&#x7528;&#x5C3D;&#xFF0C;&#x5219;&#x5339;&#x914D;&#x5931;&#x8D25;&#xFF0C;&#x53EA;&#x8981;&#x6709;&#x4EFB;&#x610F;&#x4E00;&#x6B21;&#x673A;&#x4F1A;&#xFF0C;&#x6216;&#x8005;&#x80FD;&#x4E00;&#x547D;&#x901A;&#x5173;&#xFF0C;&#x5219;&#x5339;&#x914D;&#x6210;&#x529F;&#x3002;</p><h2 id="articleHeader6">3 &#x603B;&#x7ED3;</h2><p>&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x4EEC;&#x5229;&#x7528;&#x94FE;&#x8868;&#x91CD;&#x5199;&#x4E86;&#x51FD;&#x6570;&#x6267;&#x884C;&#x673A;&#x5236;&#xFF0C;&#x4E0D;&#x4EC5;&#x4F7F;&#x5339;&#x914D;&#x51FD;&#x6570;&#x62E5;&#x6709;&#x4E86;&#x56DE;&#x6EAF;&#x80FD;&#x529B;&#xFF0C;&#x8FD8;&#x8BA9;&#x5176;&#x8868;&#x8FBE;&#x66F4;&#x4E3A;&#x76F4;&#x89C2;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain(&quot;a&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial">chain(<span class="hljs-string">&quot;a&quot;</span>);</code></pre><p>&#x8FD9;&#x79CD;&#x6784;&#x9020;&#x65B9;&#x5F0F;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x4E0E;&#x6839;&#x636E;&#x6587;&#x6CD5;&#x7ED3;&#x6784;&#x7F16;&#x8BD1;&#x6210;&#x4EE3;&#x7801;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x8BB8;&#x591A;&#x8BCD;&#x6CD5;&#x89E3;&#x6790;&#x5668;&#x5229;&#x7528;&#x6587;&#x672C;&#x89E3;&#x6790;&#x6210;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x5229;&#x7528;&#x4EE3;&#x7801;&#x8868;&#x8FBE;&#x51FA;&#x4E86;&#x6587;&#x6CD5;&#x7ED3;&#x6784;&#xFF0C;&#x540C;&#x65F6;&#x81EA;&#x8EAB;&#x6267;&#x884C;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x662F; &#x201C;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x201D;&#x3002;</p><p>&#x4E0B;&#x6B21;&#x6211;&#x4EEC;&#x5C06;&#x63A2;&#x8BA8;&#x5982;&#x4F55;&#x81EA;&#x52A8;&#x89E3;&#x51B3;&#x5DE6;&#x9012;&#x5F52;&#x95EE;&#x9898;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x5199;&#x51FA;&#x8FD9;&#x6837;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = (chain: IChain) =&gt; chain(foo, bar);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> foo = <span class="hljs-function">(<span class="hljs-params">chain: IChain</span>) =&gt;</span> chain(foo, bar);</code></pre><p>&#x597D;&#x5728; chain &#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x4F1A;&#x7ACB;&#x5373;&#x6389;&#x8FDB;&#x5806;&#x6808;&#x6EA2;&#x51FA;&#x7684;&#x6F29;&#x6DA1;&#xFF0C;&#x4F46;&#x5728;&#x6267;&#x884C;&#x8282;&#x70B9;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x51FD;&#x6570;&#x65E0;&#x9650;&#x5C55;&#x5F00;&#x4ECE;&#x800C;&#x5806;&#x6808;&#x6EA2;&#x51FA;&#x3002;</p><p>&#x89E3;&#x51B3;&#x5DE6;&#x9012;&#x5F52;&#x5E76;&#x4E0D;&#x5BB9;&#x6613;&#xFF0C;&#x9664;&#x4E86;&#x624B;&#x52A8;&#x6216;&#x81EA;&#x52A8;&#x91CD;&#x5199;&#x6587;&#x6CD5;&#xFF0C;&#x8FD8;&#x4F1A;&#x6709;&#x5176;&#x4ED6;&#x65B9;&#x6848;&#x5417;&#xFF1F;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;&#x3002;</p><h2 id="articleHeader7">4 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2><blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/96" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;&#x624B;&#x5199; SQL &#x7F16;&#x8BD1;&#x5668; - &#x56DE;&#x6EAF;&#x300B; &#xB7; Issue #96 &#xB7; dt-fe/weekly</a></blockquote><p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《手写 SQL 编译器 - 回溯》

## 原文链接
[https://segmentfault.com/a/1190000015810070](https://segmentfault.com/a/1190000015810070)


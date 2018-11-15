---
title: 基于 Generator 和 Iterator 的惰性列表
reprint: true
categories: reprint
abbrlink: 6456fa88
date: 2018-11-03 02:30:13
---

{{% raw %}}
<h2 id="articleHeader0">&#x521D;&#x8BC6; Lazy List</h2><p>&#x5982;&#x679C;&#x6709;&#x4E86;&#x89E3;&#x8FC7; Haskell &#x7684;&#x670B;&#x53CB;&#xFF0C;&#x5BF9;&#x4E0B;&#x9762;&#x7684;&#x8FD9;&#x4E9B;&#x8868;&#x8FBE;&#x4E00;&#x5B9A;&#x4E0D;&#x964C;&#x751F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="repeat 1 -- =&gt; [1, 1, 1, 1, 1,...]
cycle &quot;abc&quot; -- =&gt; &quot;abcabcabc...&quot;
[1, 3..] -- =&gt; [1, 3, 5, 7, ...]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="haskell hljs"><code class="Haskell"><span class="hljs-title">repeat</span> <span class="hljs-number">1</span> <span class="hljs-comment">-- =&gt; [1, 1, 1, 1, 1,...]</span>
<span class="hljs-title">cycle</span> <span class="hljs-string">&quot;abc&quot;</span> <span class="hljs-comment">-- =&gt; &quot;abcabcabc...&quot;</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">3.</span>.] <span class="hljs-comment">-- =&gt; [1, 3, 5, 7, ...]</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x51E0;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x4EA7;&#x751F;&#x7684;&#x90FD;&#x662F;&#x65E0;&#x9650;&#x5217;&#x8868;&#x3002;&#x5BF9;&#x4E8E;&#x4E60;&#x60EF;&#x4E86;&#x4E3B;&#x6D41;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x80FD;&#x611F;&#x5230;&#x56F0;&#x60D1;&#xFF0C;&#x5728;&#x6709;&#x9650;&#x7684;&#x5185;&#x5B58;&#x91CC;&#x9762;&#x5982;&#x4F55;&#x80FD;&#x8868;&#x8FBE;&#x65E0;&#x9650;&#x7684;&#x6982;&#x5FF5;&#x3002;&#x4E3B;&#x8981;&#x7684;&#x539F;&#x56E0;&#x5C31;&#x662F; Haskell &#x662F;&#x4E00;&#x95E8;&#x9ED8;&#x8BA4;&#x91C7;&#x7528;&#x60F0;&#x6027;&#x6C42;&#x503C;&#x7B56;&#x7565;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5728;&#x5185;&#x5B58;&#x91CC;&#x9762;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x771F;&#x6B63;&#x7684;&#x53BB;&#x505A;&#x8BA1;&#x7B97;&#x3002;</p><p>&#x5982;&#x679C;&#x53EA;&#x770B;&#x4E0A;&#x9762;&#x7684;&#x51E0;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5F88;&#x591A;&#x670B;&#x53CB;&#x53EF;&#x80FD;&#x4F1A;&#x8BF4;&#xFF0C;&#x4E5F;&#x6CA1;&#x611F;&#x89C9;&#x5230;&#x6709;&#x4EC0;&#x4E48;&#x795E;&#x5947;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x4F3C;&#x4E4E;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x4F5C;&#x7528;&#x3002;&#x6211;&#x4EEC;&#x518D;&#x770B;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>Haskell &#x4E2D;&#x7684; <code>fibonacci</code> &#x6570;&#x5217;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fibonacci = 1 : 1 : zipWith (+) fibonacci (tail fibonacci)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="haskell hljs"><code class="Haskell" style="word-break:break-word;white-space:initial"><span class="hljs-title">fibonacci</span> = <span class="hljs-number">1</span> : <span class="hljs-number">1</span> : zipWith (+) fibonacci (tail fibonacci)</code></pre><p>&#x8FD9;&#x91CC; <code>fibonacci</code> &#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;&#x60F0;&#x6027;&#x7ED3;&#x6784;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8BA1;&#x7B97;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x5148;&#x7B97;&#x51FA;&#x5217;&#x8868;&#x524D;&#x9762;&#x7684;&#x4E24;&#x4E2A;1&#xFF0C;&#x5F97;&#x5230; <code>1 : 1...</code> &#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x7136;&#x540E;&#x600E;&#x4E48;&#x8868;&#x8FBE; <code>fibonacci</code> &#x7684; <code>fib(n) = fib(n - 1) + fib(n - 2)</code> &#x7279;&#x6027;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6CE8;&#x610F;&#x5230;&#xFF0C;<code>n - 1</code>&#x548C; <code>n - 2</code> &#x521A;&#x597D;&#x5728;&#x6570;&#x5217;&#x4E2D;&#x76F8;&#x5DEE;&#x4E00;&#x4F4D;&#xFF0C;&#x6240;&#x4EE5; <code>n</code> &#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x8BE5;&#x6570;&#x5217;&#x9519;&#x4F4D;&#x7684;&#x76F8;&#x52A0;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x4E00;&#x5219;<a href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes" rel="nofollow noreferrer" target="_blank">&#x7B5B;&#x6CD5;&#x6C42;&#x7D20;&#x6570;</a>&#x3002;&#x4E0D;&#x719F;&#x6089;&#x7B5B;&#x6CD5;&#x7684;&#x53EF;&#x4EE5;&#x5148;&#x70B9;&#x5F00; wiki &#x53BB;&#x770B;&#x4E00;&#x4E0B;&#x8BE5;&#x7B97;&#x6CD5;&#x7684;&#x601D;&#x8DEF;&#x3002;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x662F; Haskell &#x7684;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="primes = 2 : filter isPrime [3, 5..]
  where
    isPrime x = all (\p -&gt; x `mod` p &gt; 0) (takeWhile (\p -&gt; p * p &lt;= x) primes)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="haskell hljs"><code class="Haskell"><span class="hljs-title">primes</span> = <span class="hljs-number">2</span> : filter isPrime [<span class="hljs-number">3</span>, <span class="hljs-number">5.</span>.]
  <span class="hljs-keyword">where</span>
    isPrime x = all (\p -&gt; x `mod` p &gt; <span class="hljs-number">0</span>) (takeWhile (\p -&gt; p * p &lt;= x) primes)</code></pre><h2 id="articleHeader1">So, Why Lazy?</h2><p>&#x5728;&#x67D0;&#x4E9B;&#x4E0D;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x5217;&#x8868;&#x64CD;&#x4F5C;&#x4E0A;&#xFF0C;&#x60F0;&#x6027;&#x5217;&#x8868;&#x4F1A;&#x8BA9;&#x4EE3;&#x7801;&#x548C;&#x7ED3;&#x6784;&#x66F4;&#x7075;&#x6D3B;&#x3002;&#x7528;&#x4E0A;&#x9762;&#x7684; <code>primes</code> &#x5217;&#x8868;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x597D;&#x4E86;&#xFF0C;&#x5728;&#x4F20;&#x7EDF;&#x7684; C &#x8BED;&#x8A00;&#x6216;&#x8005; Java &#x7684;&#x5B9E;&#x73B0;&#x91CC;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x8981;&#x5148;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x6700;&#x5927;&#x957F;&#x5EA6;&#x6216;&#x8005;&#x4E00;&#x4E2A;&#x6700;&#x5927;&#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#xFF0C;&#x6BD4;&#x5982; 10000 &#x4EE5;&#x5185;&#x7684;&#x7D20;&#x6570;&#x3002;&#x5982;&#x679C;&#x540E;&#x9762;&#x7684;&#x8BA1;&#x7B97;&#x8981;&#x7528;&#x5230;&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x8303;&#x56F4;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x5F97;&#x4E0D;&#x91CD;&#x65B0;&#x8C03;&#x7528;&#x751F;&#x6210;&#x51FD;&#x6570;&#xFF0C;&#x91CD;&#x65B0;&#x751F;&#x6210;&#x4E00;&#x4EFD;&#x66F4;&#x957F;&#x7684;&#x5217;&#x8868;&#x3002;&#x8FD9;&#x91CC;&#x9762;&#x7684;&#x95EE;&#x9898;&#x662F;&#xFF1A;&#x4E00;&#x3001;&#x8981;&#x4E3B;&#x52A8;&#x53BB;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x4E8C;&#x3001;&#x5982;&#x679C;&#x8981;&#x590D;&#x7528;&#x5DF2;&#x7ECF;&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x624B;&#x52A8;&#x53BB;&#x7EF4;&#x62A4;&#x4E00;&#x4E2A;cache&#x5217;&#x8868;&#xFF0C;&#x52BF;&#x5FC5;&#x589E;&#x52A0;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x6742;&#x5EA6;&#x3002;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x53EF;&#x80FD;&#x7684;&#x60C5;&#x51B5;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x9884;&#x5148;&#x751F;&#x6210;&#x4E86;&#x4E00;&#x4EFD;&#x5F88;&#x957F;&#x7684;&#x5217;&#x8868;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x8BA1;&#x7B97;&#x4E2D;&#x53EA;&#x7528;&#x5230;&#x4E86;&#x5217;&#x8868;&#x5934;&#x90E8;&#x7684;&#x4E00;&#x4E22;&#x4E22;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x6781;&#x5927;&#x7684;&#x6D6A;&#x8D39;&#x3002;</p><p>&#x60F0;&#x6027;&#x5217;&#x8868;&#x7684;&#x4F7F;&#x7528;&#x589E;&#x52A0;&#x4E86;&#x6211;&#x4EEC;&#x7F16;&#x7A0B;&#x7684;&#x8868;&#x8FBE;&#x80FD;&#x529B;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x66F4;&#x5173;&#x6CE8;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x672C;&#x8EAB;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6D6A;&#x8D39;&#x65F6;&#x95F4;&#x5728;&#x5982;&#x4F55;&#x53BB;&#x7BA1;&#x7406;&#x5806;&#x6808;&#x4E0A;&#x9762;&#x3002;&#x56E0;&#x4E3A;&#xFF0C;&#x60F0;&#x6027;&#x6C42;&#x503C;&#x7279;&#x6027;&#x4FDD;&#x8BC1;&#x6211;&#x4EEC;&#x5728;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x53BB;&#x8BA1;&#x7B97;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x5730;&#x6700;&#x5C0F;&#x5316;&#x6211;&#x4EEC;&#x7684;&#x8BA1;&#x7B97;&#x91CF;&#xFF0C;&#x8282;&#x7EA6;&#x8D44;&#x6E90;&#x3002;</p><p>&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; lazy byteString &#x53BB;&#x8BFB;&#x3001;&#x5199;&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x672C;&#x8EAB;&#x4E0D;&#x4F1A;&#x628A;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x5185;&#x5B58;&#x91CC;&#x9762;&#xFF0C;&#x800C;&#x662F;&#x6309;&#x9700;&#x7684;&#x8BFB;&#x53D6;&#x3002;&#x6709;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x8BFB;&#x4E00;&#x4E2A;&#x5927;&#x6587;&#x4EF6;&#xFF0C;&#x53EF;&#x80FD;&#x53EA;&#x7B5B;&#x9009;&#x51FA;&#x9700;&#x8981;&#x7684;&#x524D;&#x51E0;&#x5341;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x5374;&#x786E;&#x4E0D;&#x5F97;&#x4E0D;&#x628A;&#x51E0;&#x767E; M &#x751A;&#x81F3;&#x4E0A; G &#x7684;&#x5927;&#x6587;&#x4EF6;&#x6574;&#x4E2A;&#x7684;&#x653E;&#x5230;&#x5185;&#x5B58;&#x91CC;&#x9762;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x4E5F;&#x627E;&#x5230;&#x4E00;&#x7BC7;14&#x5E74;&#x7684;&#x6587;&#x7AE0; <a href="http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/" rel="nofollow noreferrer" target="_blank">How to Speed Up Lo-Dash &#xD7;100? Introducing Lazy Evaluation</a>&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x70B9;&#x5F00;&#x770B;&#x770B;&#x3002;</p><h2 id="articleHeader2">&#x5728; JavaScript &#x4E2D;&#x5B9E;&#x73B0; Lazy List</h2><p>&#x5728; JavaScript &#x6709;&#x6CA1;&#x6709;&#x60F0;&#x6027;&#x7ED3;&#x6784;&#x5462;&#xFF1F;&#x5148;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fetchSomething = fetch(&apos;/some/thing&apos;);
if (condition) {
  fetchSomething = fetch(&apos;/some/thing/condition&apos;);
}
fetchSomething.then(() =&gt; {
  // TODO
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">let</span> fetchSomething = fetch(<span class="hljs-string">&apos;/some/thing&apos;</span>);
<span class="hljs-keyword">if</span> (condition) {
  fetchSomething = fetch(<span class="hljs-string">&apos;/some/thing/condition&apos;</span>);
}
fetchSomething.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// TODO</span>
});</code></pre><p><code>fetch</code> &#x65B9;&#x6CD5;&#x672C;&#x8EAB;&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x7684; <code>fetch</code> &#x65B9;&#x6CD5;&#x4F1A;&#x6267;&#x884C;&#x4E24;&#x6B21;&#x3002;&#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x671F;&#x5F85;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x8BA9;&#x8FD9;&#x4E2A; <code>fetch</code> &#x7684;&#x52A8;&#x4F5C;&#x5728;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x624D;&#x53BB;&#x6267;&#x884C;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x58F0;&#x660E;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x7684;&#x8BDD;&#xFF0C;&#x901A;&#x5E38;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x628A;&#x5B83;&#x6539;&#x6210;&#x4E0B;&#x9762;&#x7684;&#x6837;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fetchSomething = () =&gt; fetch(&apos;/some/thing&apos;);
if (condition) {
  fetchSomething = () = fetch(&apos;/some/thing/condition&apos;);
}
fetchSomething.then(() =&gt; {
  // TODO
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">let</span> fetchSomething = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> fetch(<span class="hljs-string">&apos;/some/thing&apos;</span>);
<span class="hljs-keyword">if</span> (condition) {
  fetchSomething = () = fetch(<span class="hljs-string">&apos;/some/thing/condition&apos;</span>);
}
fetchSomething.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// TODO</span>
});</code></pre><p>&#x7531;&#x6B64;&#x542F;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x5927;&#x81F4;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#x7684;&#x7ED3;&#x6784;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List&lt;T&gt; {
  head: T | () =&gt; T
  tail: List&lt;T&gt; | () =&gt; List&lt;T&gt;

  constructor(head: T, tail: () =&gt; List&lt;T&gt;) {
    this.head = () =&gt; head;
    this.tail = tail;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">class</span> List&lt;T&gt; {
  head: T | <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> T
  tail: List&lt;T&gt; | <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> List&lt;T&gt;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">head: T, tail: (</span>) =&gt; List&lt;T&gt;) {
    <span class="hljs-keyword">this</span>.head = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> head;
    <span class="hljs-keyword">this</span>.tail = tail;
  }
}</code></pre><p><code>List&lt;T&gt;</code> &#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x94FE;&#x8868;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4F20;&#x5165;&#x7684; tail &#x662F;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x6784;&#x5EFA;&#x65B0;&#x7684; List &#x8282;&#x70B9;&#x3002;&#x53EA;&#x6709;&#x5728;&#x6211;&#x4EEC;&#x8BBF;&#x95EE;&#x5230;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x5BF9;&#x5B83;&#x7684; head &#x6C42;&#x503C;&#xFF0C;&#x8BBF;&#x95EE;&#x5B83;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x65F6;&#x5019;&#x5BF9; tail &#x6C42;&#x503C;&#xFF0C;&#x4E0D;&#x7136; head &#x548C; tail &#x90FD;&#x53EA;&#x662F;&#x5F85;&#x6C42;&#x503C;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x770B;&#x8D77;&#x6765;&#x4F3C;&#x4E4E;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#x6211;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x7ED3;&#x6784;&#x5728;&#x548C;&#x666E;&#x901A;&#x7684; Array &#x505A;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B58;&#x5728;&#x5927;&#x91CF;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x989D;&#x5916;&#x5F00;&#x9500;&#x3002;</p><p>&#x90A3; JavaScript &#x4E2D;&#x6709;&#x6CA1;&#x6709;&#x66F4;&#x5929;&#x7136;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x514D;&#x4E8E;&#x53BB;&#x6784;&#x9020;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x7B80;&#x5316;&#x4EE3;&#x7801;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x5177;&#x6709;&#x666E;&#x9002;&#x6027;&#x5462;&#xFF1F;</p><h3 id="articleHeader3">&#x521D;&#x8BC6; Iterable</h3><p>ES6 &#x7684;&#x65B0;&#x7279;&#x6027;&#x7ED9;&#x4E86;&#x6211;&#x60F3;&#x8981;&#x7684;&#x7B54;&#x6848;&#xFF0C;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols" rel="nofollow noreferrer" target="_blank">Iteration Protocols</a>&#x3002;&#x5982;&#x679C;&#x5ACC;MDN&#x7684;&#x63CF;&#x8FF0;&#x592A;&#x957F;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x770B;&#x4E0B;&#x9762;&#x7B49;&#x4EF7;&#x7684;&#x7C7B;&#x578B;&#x58F0;&#x660E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Iterable&lt;T&gt; {
  [Symbol.iterator](): Iterator&lt;T&gt;;
}

interface Iterator&lt;T&gt; {
  next(): IteratorResult&lt;T&gt;;
}

interface IteratorResult&lt;T&gt; {
  done: Boolean;
  value?: T;
}

interface IterableIterator&lt;T&gt; {
  [Symbol.iterator](): Iterator&lt;T&gt;;
  next(): IteratorResult&lt;T&gt;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">interface</span> Iterable&lt;T&gt; {
  [Symbol.iterator](): Iterator&lt;T&gt;;
}

<span class="hljs-keyword">interface</span> Iterator&lt;T&gt; {
  next(): IteratorResult&lt;T&gt;;
}

<span class="hljs-keyword">interface</span> IteratorResult&lt;T&gt; {
  done: <span class="hljs-built_in">Boolean</span>;
  value?: T;
}

<span class="hljs-keyword">interface</span> IterableIterator&lt;T&gt; {
  [Symbol.iterator](): Iterator&lt;T&gt;;
  next(): IteratorResult&lt;T&gt;;
}</code></pre><p>&#x6240;&#x6709;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Iterable&#x63A5;&#x53E3;&#x7684;&#x5BF9;&#x8C61;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BF8;&#x5982; <code>for...of...</code>&#x3001;<code>...itor</code> &#x4EE5;&#x53CA; <code>Array.from</code> &#x6765;&#x8BBF;&#x95EE;&#xFF0C;&#x5F53;next&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4E2D;done&#x4E3A;true&#x65F6;&#xFF0C;&#x8FED;&#x4EE3;&#x7ED3;&#x675F;&#x3002;&#x800C;&#x4E14;&#x53EA;&#x6709;&#x6211;&#x4EEC;&#x8BBF;&#x95EE;next&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x6B65;&#x8FED;&#x4EE3;&#xFF0C;&#x662F;&#x7406;&#x60F3;&#x7684;Lazy&#x7ED3;&#x6784;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x7684; fibonacci &#x8BE5;&#x600E;&#x4E48;&#x5199;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Fibonacci implements IterableIterator&lt;number&gt; {
  private prev = 1;
  private next = 1;

  public next() {
    let current = this.prev;
    this.prev = this.next;
    this.next = current + this.prev;
    return {
      done: false,
      value: current
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}

const fib = new Fibonacci();
fib.next() // =&gt; { done: false, value: 1 }
fib.next() // =&gt; { done: false, value: 1 }
fib.next() // =&gt; { done: false, value: 2 }
// etc" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">class</span> Fibonacci <span class="hljs-keyword">implements</span> IterableIterator&lt;<span class="hljs-built_in">number</span>&gt; {
  <span class="hljs-keyword">private</span> prev = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">private</span> next = <span class="hljs-number">1</span>;

  <span class="hljs-keyword">public</span> next() {
    <span class="hljs-keyword">let</span> current = <span class="hljs-keyword">this</span>.prev;
    <span class="hljs-keyword">this</span>.prev = <span class="hljs-keyword">this</span>.next;
    <span class="hljs-keyword">this</span>.next = current + <span class="hljs-keyword">this</span>.prev;
    <span class="hljs-keyword">return</span> {
      done: <span class="hljs-literal">false</span>,
      value: current
    }
  }

  [Symbol.iterator]() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}

<span class="hljs-keyword">const</span> fib = <span class="hljs-keyword">new</span> Fibonacci();
fib.next() <span class="hljs-comment">// =&gt; { done: false, value: 1 }</span>
fib.next() <span class="hljs-comment">// =&gt; { done: false, value: 1 }</span>
fib.next() <span class="hljs-comment">// =&gt; { done: false, value: 2 }</span>
<span class="hljs-comment">// etc</span></code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x8868;&#x8FBE;&#x4E00;&#x4E2A;&#x60F0;&#x6027;&#x7684;&#x65E0;&#x9650;&#x6570;&#x5217;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6BD5;&#x7ADF;&#x8FC7;&#x4E8E;&#x7E41;&#x7410;&#xFF0C;&#x597D;&#x5728; ES6 &#x540C;&#x65F6;&#x7ED9;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86; Generator, &#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x5F88;&#x65B9;&#x4FBF;&#x5730;&#x4E66;&#x5199; IterableItorator&#xFF0C;&#x4ECE;&#x67D0;&#x79CD;&#x610F;&#x4E49;&#x4E0A;&#x6765;&#x8BB2;&#xFF0C;Generator &#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;</p><p>&#x4F7F;&#x7528;Generator&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x6210;&#x4E0B;&#x9762;&#x7684;&#x6837;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function* fibonacci() {
  let prev = 1;
  let next = 1;

  while (true) {
    yield prev;
    const temp = prev;
    prev = next;
    next = temp + prev;
  }
}

const fib = fibonacci();
// etc" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fibonacci</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> prev = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">let</span> next = <span class="hljs-number">1</span>;

  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span> prev;
    <span class="hljs-keyword">const</span> temp = prev;
    prev = next;
    next = temp + prev;
  }
}

<span class="hljs-keyword">const</span> fib = fibonacci();
<span class="hljs-comment">// etc</span></code></pre><p>&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x53BB;&#x82B1;&#x6BB5;&#x843D;&#x4ECB;&#x7ECD; Generator &#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x5148;&#x53BB;&#x9605;&#x8BFB;&#x4E0B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0; <a href="https://medium.com/dailyjs/a-simple-guide-to-understanding-javascript-es6-generators-d1c350551950" rel="nofollow noreferrer" target="_blank">A Simple Guide to Understanding Javascript (ES6) Generators</a>&#x3002;</p><h3 id="articleHeader4">&#x5B9A;&#x4E49; Infinite List</h3><p>&#x63A5;&#x7740;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5F80;&#x4E0B;&#x5199;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5206;&#x522B;&#x5B9E;&#x73B0;&#x4E86;&#x6587;&#x7AE0;&#x5F00;&#x5934;&#x7684; repeat, cycle, iterate, range &#x7B49;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function* repeat&lt;T&gt;(item: T) {
  while (true) {
    yield item;
  }
}

export function* cycle&lt;T&gt;(items: Iterable&lt;T&gt;) {
  while (true) {
    yield* [...items];
  }
}

export function* iterate&lt;T&gt;(fn: (value: T) =&gt; T, initial: T) {
  let val = initial;
  while (true) {
    yield val;
    val = fn(val);
  }
}

export function* range(start: number, end = Infinity, step = 1) {
  while (start &lt;= end) {
    yield start;
    start += step;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">repeat</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">item: T</span>) </span>{
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span> item;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">cycle</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">items: Iterable&lt;T&gt;</span>) </span>{
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span>* [...items];
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">iterate</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">fn: (value: T</span>) =&gt; <span class="hljs-title">T</span>, <span class="hljs-title">initial</span>: <span class="hljs-title">T</span>) </span>{
  <span class="hljs-keyword">let</span> val = initial;
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span> val;
    val = fn(val);
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">range</span>(<span class="hljs-params">start: <span class="hljs-built_in">number</span>, end = <span class="hljs-literal">Infinity</span>, step = 1</span>) </span>{
  <span class="hljs-keyword">while</span> (start &lt;= end) {
    <span class="hljs-keyword">yield</span> start;
    start += step;
  }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4EE3;&#x7801;&#x662F;&#x975E;&#x5E38;&#x76F4;&#x89C2;&#x4E14;&#x6613;&#x4E8E;&#x7406;&#x89E3;&#x7684;&#x3002;</p><h3 id="articleHeader5">&#x5B9A;&#x4E49; Operator</h3><p>&#x6709;&#x4E86;&#x5217;&#x8868;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x5217;&#x8868;&#x4E4B;&#x4E0A;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5206;&#x522B;&#x5B9E;&#x73B0;&#x4E86; map/filter/take/takeWhile &#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function* map&lt;T, U&gt;(fn: (value: T) =&gt; U, items: Iterable&lt;T&gt;) {
  for (let item of items) {
    yield fn(item);
  }
}

export function* filter&lt;T&gt;(
  predicate: (value: T) =&gt; boolean,
  items: Iterable&lt;T&gt;
) {
  for (let item of items) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function* take&lt;T&gt;(n: number, items: Iterable&lt;T&gt;) {
  let i = 0;
  if (n &lt; 1) return;

  for (let item of items) {
    yield item;
    i++;
    if (i &gt;= n) {
      return;
    }
  }
}

function* takeWhile&lt;T&gt;(
  predicate: (value: T) =&gt; boolean,
  items: Iterable&lt;T&gt;
) {
  for (let item of items) {
    if (predicate(item)) {
      yield item;
    } else {
      return;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">map</span>&lt;<span class="hljs-title">T</span>, <span class="hljs-title">U</span>&gt;(<span class="hljs-params">fn: (value: T</span>) =&gt; <span class="hljs-title">U</span>, <span class="hljs-title">items</span>: <span class="hljs-title">Iterable</span>&lt;<span class="hljs-title">T</span>&gt;) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item of items) {
    <span class="hljs-keyword">yield</span> fn(item);
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">filter</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">
  predicate: (value: T</span>) =&gt; <span class="hljs-title">boolean</span>,
  <span class="hljs-title">items</span>: <span class="hljs-title">Iterable</span>&lt;<span class="hljs-title">T</span>&gt;
) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item of items) {
    <span class="hljs-keyword">if</span> (predicate(item)) {
      <span class="hljs-keyword">yield</span> item;
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">take</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">n: <span class="hljs-built_in">number</span>, items: Iterable&lt;T&gt;</span>) </span>{
  <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span> (n &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item of items) {
    <span class="hljs-keyword">yield</span> item;
    i++;
    <span class="hljs-keyword">if</span> (i &gt;= n) {
      <span class="hljs-keyword">return</span>;
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">takeWhile</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">
  predicate: (value: T</span>) =&gt; <span class="hljs-title">boolean</span>,
  <span class="hljs-title">items</span>: <span class="hljs-title">Iterable</span>&lt;<span class="hljs-title">T</span>&gt;
) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item of items) {
    <span class="hljs-keyword">if</span> (predicate(item)) {
      <span class="hljs-keyword">yield</span> item;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span>;
    }
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x7684;&#x3002;&#x6BD4;&#x8F83;&#x96BE;&#x4E00;&#x70B9;&#x7684;&#x662F;&#x53BB;&#x5B9E;&#x73B0; <code>zip</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5373;&#x600E;&#x4E48;&#x628A;&#x4E24;&#x4E2A;&#x5217;&#x8868;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#xFF1F;</p><p>&#x96BE;&#x70B9;&#x5728;&#x4E8E;&#x63A5;&#x6536;&#x4E00;&#x4E2A; Iterable &#x7684;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#xFF0C;&#x672C;&#x8EAB;&#x5E76;&#x4E0D;&#x4E00;&#x5B9A;&#x8981;&#x5B9E;&#x73B0; <code>next</code> &#x65B9;&#x6CD5;&#x7684;&#xFF0C;&#x6BD4;&#x5982; Array&#x3001;String &#x7B49;&#xFF0C;&#x540C;&#x65F6;Iterable&#x5BF9;&#x8C61;&#x4E5F;&#x5E76;&#x4E0D;&#x662F;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; index &#x6765;&#x8BBF;&#x95EE;&#x7684;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5148;&#x901A;&#x8FC7;Array.from&#x53D8;&#x6210;&#x6570;&#x7EC4;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6570;&#x7EC4;&#x4E0A;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x60C5;&#x51B5;&#x662F;&#x6211;&#x4EEC;&#x4F20;&#x5165;&#x7684; Iterable &#x5BF9;&#x8C61;&#x662F;&#x65E0;&#x9650;&#x7684;&#xFF0C;&#x5982;&#x4E0A;&#x6587;&#x7684; fibonacci &#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x662F;&#x4E0D;&#x80FD;&#x4F7F;&#x7528; Array.from &#x7684;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x7684;&#x4E00;&#x4E2A;&#x601D;&#x8DEF;&#x662F;&#x9700;&#x8981;&#x60F3;&#x529E;&#x6CD5;&#x628A;&#x4E00;&#x4E2A; Iterable &#x7684;&#x5BF9;&#x8C61;&#x63D0;&#x5347;&#x6210;&#x4E3A; IterableItorator &#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7; next &#x65B9;&#x6CD5;&#xFF0C;&#x9010;&#x4E00;&#x904D;&#x5386;&#x3002;</p><p>How &#xFF1F;&#x5E78;&#x597D; Generator &#x7ED9;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A; <code>yield*</code> &#x64CD;&#x4F5C;&#x7B26;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x65B9;&#x4FBF;&#x7684;&#x5B9A;&#x4E49;&#x51FA;&#x4E00;&#x4E2A; <code>lift</code> &#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function* lift&lt;T&gt;(items: Iterable&lt;T&gt;): IterableIterator&lt;T&gt; {
  yield* items;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">lift</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">items: Iterable&lt;T&gt;</span>): <span class="hljs-title">IterableIterator</span>&lt;<span class="hljs-title">T</span>&gt; </span>{
  <span class="hljs-keyword">yield</span>* items;
}</code></pre><p>&#x6709;&#x4E86;&#x8FD9;&#x4E2A; <code>lift</code> &#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x4E66;&#x5199; <code>zip</code> &#x65B9;&#x6CD5;&#x548C; <code>zipWith</code> &#x65B9;&#x6CD5;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function* zip&lt;T, G&gt;(
  seqA: Iterable&lt;T&gt;,
  seqB: Iterable&lt;G&gt;
): IterableIterator&lt;[T, G]&gt; {
  const itorA = lift(seqA);
  const itorB = lift(seqB);
  let valA = itorA.next();
  let valB = itorB.next();
  while (!valA.done || !valB.done) {
    yield [valA.value, valB.value];
    valA = itorA.next();
    valB = itorB.next();
  }
}

export function* zipWith&lt;T, G, R&gt;(
  fn: (a: T, b: G) =&gt; R,
  seqA: Iterable&lt;T&gt;,
  seqB: Iterable&lt;G&gt;
): IterableIterator&lt;R&gt; {
  const itorA = lift(seqA);
  const itorB = lift(seqB);
  let valA = itorA.next();
  let valB = itorB.next();
  while (!valA.done || !valB.done) {
    yield fn(valA.value, valB.value);
    valA = itorA.next();
    valB = itorB.next();
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">zip</span>&lt;<span class="hljs-title">T</span>, <span class="hljs-title">G</span>&gt;(<span class="hljs-params">
  seqA: Iterable&lt;T&gt;,
  seqB: Iterable&lt;G&gt;
</span>): <span class="hljs-title">IterableIterator</span>&lt;[<span class="hljs-title">T</span>, <span class="hljs-title">G</span>]&gt; </span>{
  <span class="hljs-keyword">const</span> itorA = lift(seqA);
  <span class="hljs-keyword">const</span> itorB = lift(seqB);
  <span class="hljs-keyword">let</span> valA = itorA.next();
  <span class="hljs-keyword">let</span> valB = itorB.next();
  <span class="hljs-keyword">while</span> (!valA.done || !valB.done) {
    <span class="hljs-keyword">yield</span> [valA.value, valB.value];
    valA = itorA.next();
    valB = itorB.next();
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">zipWith</span>&lt;<span class="hljs-title">T</span>, <span class="hljs-title">G</span>, <span class="hljs-title">R</span>&gt;(<span class="hljs-params">
  fn: (a: T, b: G</span>) =&gt; <span class="hljs-title">R</span>,
  <span class="hljs-title">seqA</span>: <span class="hljs-title">Iterable</span>&lt;<span class="hljs-title">T</span>&gt;,
  <span class="hljs-title">seqB</span>: <span class="hljs-title">Iterable</span>&lt;<span class="hljs-title">G</span>&gt;
): <span class="hljs-title">IterableIterator</span>&lt;<span class="hljs-title">R</span>&gt; </span>{
  <span class="hljs-keyword">const</span> itorA = lift(seqA);
  <span class="hljs-keyword">const</span> itorB = lift(seqB);
  <span class="hljs-keyword">let</span> valA = itorA.next();
  <span class="hljs-keyword">let</span> valB = itorB.next();
  <span class="hljs-keyword">while</span> (!valA.done || !valB.done) {
    <span class="hljs-keyword">yield</span> fn(valA.value, valB.value);
    valA = itorA.next();
    valB = itorB.next();
  }
}</code></pre><p>&#x66F4;&#x591A;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x53BB;&#x5E95;&#x90E8;&#x7684;&#x70B9;&#x5F00;&#x6211;&#x7684; repo&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5217;&#x4E3E;&#x4E86;&#x3002;</p><h2 id="articleHeader6">&#x7ED3;&#x8BED;</h2><p>Generator &#x548C; Iterator &#x662F; ES6 &#x5E26;&#x7ED9;&#x6211;&#x4EEC;&#x7684;&#x975E;&#x5E38;&#x5F3A;&#x5927;&#x7684;&#x8BED;&#x8A00;&#x5C42;&#x9762;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x5B83;&#x672C;&#x8EAB;&#x7684;&#x6C42;&#x503C;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x60F0;&#x6027;&#x7684;&#x3002;</p><p>&#x5DEE;&#x4E0D;&#x591A;&#x5728;13&#x5E74;&#x5DE6;&#x53F3;&#xFF0C;TJ &#x7684; <a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co</a> &#x521A;&#x51FA;&#x6765;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5176;&#x4EE3;&#x7801;&#x7684;&#x77ED;&#x5C0F;&#x7CBE;&#x608D;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x76F8;&#x5F53;&#x60CA;&#x8273;&#x7684;&#x3002;&#x7136;&#x800C;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x4F7F;&#x7528;&#x4E2D;&#xFF0C;&#x4E00;&#x6765;&#x53D7;&#x9650;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x4E8C;&#x6765;&#x53D7;&#x9650;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x6211;&#x4EEC;&#x5BF9;&#x5176;&#x7279;&#x6027;&#x5F00;&#x53D1;&#x5F97;&#x8FD8;&#x8FDC;&#x8FDC;&#x4E0D;&#x591F;&#x3002;&#x7ED3;&#x5408; IO&#x3001;network&#xFF0C;Generator &#x548C; Iterator &#x8FD8;&#x80FD;&#x4E3A;&#x6211;&#x4EEC;&#x505A;&#x66F4;&#x591A;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x9700;&#x8981;&#x7279;&#x522B;&#x8BF4;&#x660E;&#x7684;&#x662F;&#xFF0C;&#x867D;&#x7136;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x901A;&#x7BC7;&#x662F;&#x5728;&#x8BB2;&#x60F0;&#x6027;&#x5217;&#x8868;&#xFF0C;&#x4F46;&#x662F;&#x60F0;&#x6027;&#x5217;&#x8868;&#x5E76;&#x4E0D;&#x662F;&#x94F6;&#x5F39;&#xFF0C;&#x76F8;&#x53CD;&#x7684;&#xFF0C;&#x60F0;&#x6027;&#x7ED3;&#x6784;&#x7684;&#x6EE5;&#x7528;&#x4F1A;&#x5728;&#x7A0B;&#x5E8F;&#x7684;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x7F13;&#x5B58;&#x5927;&#x91CF;&#x7684;thunk&#xFF0C;&#x589E;&#x5927;&#x5728;&#x5185;&#x5B58;&#x4E0A;&#x7684;&#x5F00;&#x9500;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x5229;&#x76CA;&#x76F8;&#x5173; - &#x6709;&#x8D5E;&#x62DB;&#x524D;&#x7AEF;&#xFF0C;&#x7B80;&#x5386;&#x8BF7;&#x6295; <code>wangqiao@youzan.com</code>&#x3002;</p><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x8BF7;&#x79FB;&#x6B65; <a href="https://github.com/nodew/lazyList" rel="nofollow noreferrer" target="_blank">GitHub</a>&#x3002;</p><p>&#x672C;&#x6587;&#x9996;&#x53D1;&#x4E8E;<a href="https://tech.youzan.com/lazy-list-with-generator-and-iterator/" rel="nofollow noreferrer" target="_blank">&#x6709;&#x8D5E;&#x6280;&#x672F;&#x535A;&#x5BA2;</a>&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Generator 和 Iterator 的惰性列表

## 原文链接
[https://segmentfault.com/a/1190000016538399](https://segmentfault.com/a/1190000016538399)


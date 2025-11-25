---
title: '数组去重-Map实现' 
date: 2018-11-18 2:30:10
hidden: true
slug: bsbm5ns5iu5
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x95EE;&#x9898;&#x7531;&#x6765;</h2><p>&#x9047;&#x5230;&#x4E00;&#x9053;&#x9762;&#x8BD5;&#x9898;&#xFF1A;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x7684;&#x6570;&#x3002;</p><blockquote>[ 1, 1, 2, 2, 3, 4, 4, 5 ]<br>&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x7684;&#x6570;&#x4E3A; 3</blockquote><p>&#x6700;&#x7B80;&#x5355;&#x7684;&#x60F3;&#x6CD5;&#x5C31;&#x662F;&#x4E24;&#x5C42; <code>for</code> &#x5FAA;&#x73AF;&#x904D;&#x5386;&#x6570;&#x7EC4;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x662F; <code>O(n^2)</code>&#x3002;&#x800C;&#x66F4;&#x9AD8;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x662F;&#x4F7F;&#x7528;<code>hash Map</code>&#xFF0C;&#x53EF;&#x5C06;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x964D;&#x4E3A;<code>O(n)</code>&#x3002;</p><p>&#x5176;&#x5B9E;&#x8FD9;&#x4E2A;&#x9898;&#x76EE;&#x53EF;&#x4EE5;&#x884D;&#x751F;&#x51FA;&#x4E09;&#x4E2A;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x6570;&#x7EC4;&#x53BB;&#x91CD;</li><li>&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x91CD;&#x590D;&#x7684;&#x6570;</li><li>&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x7684;&#x6570;</li></ol><p>&#x6211;&#x51C6;&#x5907;&#x7528;<code>ES6</code>&#x4E2D;&#x7684; <code>Map</code>&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E09;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x8FD9;&#x4E4B;&#x524D;&#x6709;&#x5FC5;&#x8981;&#x5148;&#x68B3;&#x7406;&#x4E0B;Map&#x7684;&#x4E3B;&#x8981;&#x77E5;&#x8BC6;&#x70B9;&#x3002;</p><h2 id="articleHeader1">Map&#x57FA;&#x7840;&#x68B3;&#x7406;</h2><p>JavaScript &#x7684;&#x5BF9;&#x8C61;&#xFF08;Object&#xFF09;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x96C6;&#x5408;&#xFF08;Hash &#x7ED3;&#x6784;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x4F20;&#x7EDF;&#x4E0A;&#x53EA;&#x80FD;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x5F53;&#x4F5C;&#x952E;&#x3002;&#x8FD9;&#x7ED9;&#x5B83;&#x7684;&#x4F7F;&#x7528;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x5927;&#x7684;&#x9650;&#x5236;&#x3002;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;ES6 &#x63D0;&#x4F9B;&#x4E86; <code>Map</code> &#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x662F;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x4F46;&#x662F;&#x201C;&#x952E;&#x201D;&#x7684;&#x8303;&#x56F4;&#x4E0D;&#x9650;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5404;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF08;&#x5305;&#x62EC;&#x5BF9;&#x8C61;&#xFF09;&#x90FD;&#x53EF;&#x4EE5;&#x5F53;&#x4F5C;&#x952E;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;<code>Object</code>&#x7ED3;&#x6784;&#x63D0;&#x4F9B;&#x4E86;&#x201C;&#x5B57;&#x7B26;&#x4E32;&#x2014;&#x503C;&#x201D;&#x7684;&#x5BF9;&#x5E94;&#xFF0C;<code>Map</code> &#x7ED3;&#x6784;&#x63D0;&#x4F9B;&#x4E86;&#x201C;&#x503C;&#x2014;&#x503C;&#x201D;&#x7684;&#x5BF9;&#x5E94;&#xFF0C;&#x662F;&#x4E00;&#x79CD;&#x66F4;&#x5B8C;&#x5584;&#x7684; Hash &#x7ED3;&#x6784;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x4F8B;&#x5982;Map&#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x5176;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = new Map([
  [1, &apos;&#x5F20;&#x4E09;&apos;],
  [2, &apos;&#x674E;&#x56DB;&apos;]
]);
// 0:{1 =&gt; &quot;&#x5F20;&#x4E09;&quot;}
// 1:{2 =&gt; &quot;&#x674E;&#x56DB;&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([
  [<span class="hljs-number">1</span>, <span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-string">&apos;&#x674E;&#x56DB;&apos;</span>]
]);
<span class="hljs-comment">// 0:{1 =&gt; &quot;&#x5F20;&#x4E09;&quot;}</span>
<span class="hljs-comment">// 1:{2 =&gt; &quot;&#x674E;&#x56DB;&quot;}</span></code></pre><p><code>Map</code>&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li><code>size</code>&#xFF1A;&#x8FD4;&#x56DE;&#x6210;&#x5458;&#x603B;&#x6570;</li><li><code>set(key, value)</code>&#xFF1A;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x952E;&#x503C;</li><li><code>get(key)</code>&#xFF1A;&#x8BFB;&#x53D6;&#x952E;&#x5BF9;&#x5E94;&#x7684;&#x503C;</li><li><code>has(key)</code>&#xFF1A;&#x662F;&#x5426;&#x6709;&#x67D0;&#x4E2A;&#x952E;</li><li><code>delete(key)</code>&#xFF1A;&#x5220;&#x9664;&#x67D0;&#x4E2A;&#x952E;</li><li><code>clear()</code>&#xFF1A;&#x6E05;&#x7A7A;</li></ul><p><code>Map</code>&#x5B9E;&#x4F8B;&#x7684;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li><code>keys()</code>&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x5668;&#x3002;</li><li><code>values()</code>&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x7684;&#x904D;&#x5386;&#x5668;&#x3002;</li><li><code>entries()</code>&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x5668;&#x3002;</li><li><code>forEach()</code>&#xFF1A;&#x904D;&#x5386; Map &#x7684;&#x6240;&#x6709;&#x6210;&#x5458;&#x3002;</li></ul><p>&#x4E0B;&#x9762;&#x6765;&#x901A;&#x8FC7;&#x4EE3;&#x7801;&#x89E3;&#x51B3;&#x4E09;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><h2 id="articleHeader2">&#x6570;&#x7EC4;&#x53BB;&#x91CD;</h2><blockquote>&#x53BB;&#x91CD;&#x524D;&#xFF1A;[ 1, 1, 2, 2, 3, 4, 4, 5 ]<br>&#x53BB;&#x91CD;&#x540E;&#xFF1A;[ 1, 2, 3, 4, 5 ]</blockquote><p>&#x4E3B;&#x8981;&#x601D;&#x8DEF;&#xFF1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;<code>Map</code>&#xFF0C;&#x904D;&#x5386;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#xFF0C;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4F5C;&#x4E3A;<code>key</code>&#x5B58;&#x5230;Map&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;<code>Map</code>&#x4E2D;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x76F8;&#x540C;&#x7684;<code>key</code>&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;<code>Map</code>&#x4E2D;&#x7684;&#x6240;&#x6709;<code>key</code>&#x503C;&#x5C31;&#x662F;&#x53BB;&#x91CD;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function arrayNonRepeatfy(arr) {
  let hashMap = new Map();
  let result = new Array();  // &#x6570;&#x7EC4;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;
  for (let i = 0; i &lt; arr.length; i++) {
    if(hashMap.has(arr[i])) { // &#x5224;&#x65AD; hashMap &#x4E2D;&#x662F;&#x5426;&#x5DF2;&#x6709;&#x8BE5; key &#x503C;
      hashMap.set(arr[i], true);  // &#x540E;&#x9762;&#x7684;true &#x4EE3;&#x8868;&#x8BE5; key &#x503C;&#x5728;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x4E2D;&#x91CD;&#x590D;&#x4E86;&#xFF0C;false&#x53CD;&#x4E4B;
    } else {  // &#x5982;&#x679C; hashMap &#x4E2D;&#x6CA1;&#x6709;&#x8BE5; key &#x503C;&#xFF0C;&#x6DFB;&#x52A0;
      hashMap.set(arr[i], false);  
      result.push(arr[i]);
    }
  } 
  return result;
}

let arr = [1, 1, 1, 2, 3, 3, 4, 5, 5, &quot;a&quot;, &quot;b&quot;, &quot;a&quot;];
console.log(arrayNonRepeatfy(arr)); // [ 1, 2, 3, 4, 5, &apos;a&apos;, &apos;b&apos; ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arrayNonRepeatfy</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> hashMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
  <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();  <span class="hljs-comment">// &#x6570;&#x7EC4;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-keyword">if</span>(hashMap.has(arr[i])) { <span class="hljs-comment">// &#x5224;&#x65AD; hashMap &#x4E2D;&#x662F;&#x5426;&#x5DF2;&#x6709;&#x8BE5; key &#x503C;</span>
      hashMap.set(arr[i], <span class="hljs-literal">true</span>);  <span class="hljs-comment">// &#x540E;&#x9762;&#x7684;true &#x4EE3;&#x8868;&#x8BE5; key &#x503C;&#x5728;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x4E2D;&#x91CD;&#x590D;&#x4E86;&#xFF0C;false&#x53CD;&#x4E4B;</span>
    } <span class="hljs-keyword">else</span> {  <span class="hljs-comment">// &#x5982;&#x679C; hashMap &#x4E2D;&#x6CA1;&#x6709;&#x8BE5; key &#x503C;&#xFF0C;&#x6DFB;&#x52A0;</span>
      hashMap.set(arr[i], <span class="hljs-literal">false</span>);  
      result.push(arr[i]);
    }
  } 
  <span class="hljs-keyword">return</span> result;
}

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;a&quot;</span>];
<span class="hljs-built_in">console</span>.log(arrayNonRepeatfy(arr)); <span class="hljs-comment">// [ 1, 2, 3, 4, 5, &apos;a&apos;, &apos;b&apos; ]</span></code></pre><p>&#x4E0A;&#x9762;&#x6700;&#x7EC8;&#x4EA7;&#x751F;&#x7684;<code>Map</code>&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x53BB;&#x91CD;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x800C;&#x4E14;&#x5BF9;&#x6BCF;&#x4E00;&#x5143;&#x7D20;&#x7684;&#x91CD;&#x590D;&#x6027;&#x90FD;&#x505A;&#x4E86;&#x6807;&#x6CE8;&#xFF0C;&#x8FD9;&#x6837;&#x60F3;&#x627E;&#x5230;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x91CD;&#x590D;&#x7684;&#x6570;&#x5C31;&#x5F88;&#x65B9;&#x4FBF;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(hashMap);
/*
0:{1 =&gt; true} {key: 1, value: true}
1:{2 =&gt; false} {key: 2, value: false}
2:{3 =&gt; true} {key: 3, value: true}
3:{4 =&gt; false} {key: 4, value: false}
4:{5 =&gt; true} {key: 5, value: true}
5:{&quot;a&quot; =&gt; true} {key: &quot;a&quot;, value: true}
6:{&quot;b&quot; =&gt; false} {key: &quot;b&quot;, value: false}
*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">console.log(hashMap);</span>
<span class="hljs-string">/*</span>
<span class="hljs-number">0</span><span class="hljs-string">:{1</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span>
<span class="hljs-number">1</span><span class="hljs-string">:{2</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span>
<span class="hljs-number">2</span><span class="hljs-string">:{3</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span>
<span class="hljs-number">3</span><span class="hljs-string">:{4</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span>
<span class="hljs-number">4</span><span class="hljs-string">:{5</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-number">5</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span>
<span class="hljs-number">5</span><span class="hljs-string">:{&quot;a&quot;</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-string">&quot;a&quot;</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">true</span><span class="hljs-string">}</span>
<span class="hljs-number">6</span><span class="hljs-string">:{&quot;b&quot;</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span> <span class="hljs-string">{key:</span> <span class="hljs-string">&quot;b&quot;</span><span class="hljs-string">,</span> <span class="hljs-attr">value:</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span>
<span class="hljs-string">*/</span></code></pre><h2 id="articleHeader3">&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x91CD;&#x590D;&#x7684;&#x6570;</h2><blockquote>[ 1, 1, 2, 2, 3, 4, 4, 5 ]<br>[ 1, 2, 4 ]<br>&#x63A5;&#x4E0A;&#x4E00;&#x8282;&#x672B;&#x5C3E;&#xFF0C;&#x65E2;&#x7136;<code>hashMap</code>&#x4E2D;&#x8BB0;&#x5F55;&#x4E86;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x91CD;&#x590D;&#x60C5;&#x51B5;&#xFF0C;&#x627E;&#x5230;&#x91CD;&#x590D;&#x7684;&#x6570;&#x5C31;&#x5F88;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x904D;&#x5386;&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;<code>hashMap</code>&#xFF0C;&#x503C;&#x4E3A; <code>true</code> &#x5BF9;&#x5E94;&#x7684;&#x952E;&#x5C31;&#x662F;&#x91CD;&#x590D;&#x7684;&#x6570;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findRepeatNumInArray(arr) {
  let hashMap = new Map();
  let result = new Array();
  for (let i = 0; i &lt; arr.length; i++) {
    hashMap.set(arr[i], hashMap.has(arr[i]))
  }
  // &#x5F97;&#x5230; hashMap &#x540E;&#xFF0C;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x503C;&#x4E3A; true&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x952E;&#x5C31;&#x662F;&#x91CD;&#x590D;&#x7684;&#x6570;
  for(let [key, value] of hashMap.entries()) { 
    if(value === true) {
      result.push(key);
    }
  }
  return result; 
}

let arr = [1, 1, 1, 2, 3, 3, 4, 5, 5, &quot;a&quot;, &quot;b&quot;, &quot;a&quot;];
console.log(findRepeatNumInArray(arr));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findRepeatNumInArray</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> hashMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
  <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    hashMap.set(arr[i], hashMap.has(arr[i]))
  }
  <span class="hljs-comment">// &#x5F97;&#x5230; hashMap &#x540E;&#xFF0C;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x503C;&#x4E3A; true&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x952E;&#x5C31;&#x662F;&#x91CD;&#x590D;&#x7684;&#x6570;</span>
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [key, value] <span class="hljs-keyword">of</span> hashMap.entries()) { 
    <span class="hljs-keyword">if</span>(value === <span class="hljs-literal">true</span>) {
      result.push(key);
    }
  }
  <span class="hljs-keyword">return</span> result; 
}

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;a&quot;</span>];
<span class="hljs-built_in">console</span>.log(findRepeatNumInArray(arr));</code></pre><h2 id="articleHeader4">&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x7684;&#x6570;</h2><blockquote>[ 1, 1, 2, 2, 3, 4, 4, 5 ]<br>3<br>&#x4EE3;&#x7801;&#x4E0E;&#x4E0A;&#x4E00;&#x8282;&#x7684;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x904D;&#x5386;&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;<code>hashMap</code>&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#x4E3A; <code>false</code> &#x5BF9;&#x5E94;&#x7684;&#x952E;&#x5C31;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x6570;&#x5B57;:</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findFirstNonRepeat(arr) {
  let hashMap = new Map();
  for (let i = 0; i &lt; arr.length; i++) {
    hashMap.set(arr[i], hashMap.has(arr[i]))
  }
  // &#x627E;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#x4E3A; false &#x7684;&#xFF0C;&#x5C31;&#x4EE3;&#x8868;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x6570;&#xFF0C;return &#x5C31;&#x597D;&#x4E86;
  for(let [key, value] of hashMap.entries()) {
    if(value === false) {
      return key;
    }
  }
  return &quot;&#x5168;&#x90E8;&#x91CD;&#x590D;&quot;;
}

let arr = [1, 1, 1, 2, 3, 3, 4, 5, 5, &quot;a&quot;, &quot;b&quot;, &quot;a&quot;];
console.log(findFirstNonRepeat(arr));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findFirstNonRepeat</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> hashMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    hashMap.set(arr[i], hashMap.has(arr[i]))
  }
  <span class="hljs-comment">// &#x627E;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#x4E3A; false &#x7684;&#xFF0C;&#x5C31;&#x4EE3;&#x8868;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x91CD;&#x590D;&#x6570;&#xFF0C;return &#x5C31;&#x597D;&#x4E86;</span>
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [key, value] <span class="hljs-keyword">of</span> hashMap.entries()) {
    <span class="hljs-keyword">if</span>(value === <span class="hljs-literal">false</span>) {
      <span class="hljs-keyword">return</span> key;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&#x5168;&#x90E8;&#x91CD;&#x590D;&quot;</span>;
}

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;a&quot;</span>];
<span class="hljs-built_in">console</span>.log(findFirstNonRepeat(arr));</code></pre><p>&#x603B;&#x7ED3;&#xFF0C;&#x4E09;&#x7C7B;&#x95EE;&#x9898;&#x7684;&#x6838;&#x5FC3;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#xFF1A;&#x5229;&#x7528; <code>Map</code>&#x5B58;&#x50A8;&#x6BCF;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x7684;&#x91CD;&#x590D;&#x60C5;&#x51B5;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数组去重-Map实现

## 原文链接
[https://segmentfault.com/a/1190000015923301](https://segmentfault.com/a/1190000015923301)


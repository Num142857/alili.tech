---
title: 'js/javascript 生成罗马字符' 
date: 2018-11-29 2:30:09
hidden: true
slug: ty14sdtf8fs
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x751F;&#x6210;&#x7F57;&#x9A6C;&#x6570;&#x5B57;</h3><p>&#x8FD9;&#x6837;&#x751F;&#x6210;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x5230;&#x4E86; 12 &#x4E4B;&#x540E;&#x5C31;&#x4E0D;&#x89C4;&#x5F8B;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="roman() {
  return new Array(30).fill(&apos;&#x2160;&apos;).map((lastLetter, i) =&gt; {
    return String.fromCharCode(lastLetter.charCodeAt(0) + i)
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>roman() {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">30</span>).fill(<span class="hljs-string">&apos;&#x2160;&apos;</span>).map(<span class="hljs-function">(<span class="hljs-params">lastLetter, i</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>.fromCharCode(lastLetter.charCodeAt(<span class="hljs-number">0</span>) + i)
  })
}</code></pre><h2 id="articleHeader1">&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6B63;&#x786E;&#x7684;&#x59FF;&#x52BF;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var data = {
    &#x2188;: 100000,
    &#x2182;&#x2188;: 90000,
    &#x2187;: 50000,
    &#x2182;&#x2187;: 40000,
    &#x2182;: 10000,
    &#x216F;&#x2182;: 9000,
    &#x2181;: 5000,
    &#x216F;&#x2181;: 4000,
    &#x216F;: 1000,
    &#x216D;&#x216F;: 900,
    &#x216E;: 500,
    &#x216D;&#x216E;: 400,
    &#x216D;: 100,
    &#x2169;&#x216D;: 90,
    &#x216C;: 50,
    &#x2169;&#x216C;: 40,
    &#x2169;: 10,
    &#x2168;: 9,
    &#x2167;: 8,
    &#x2166;: 7,
    &#x2165;: 6,
    &#x2164;: 5,
    &#x2163;: 4,
    &#x2162;: 3,
    &#x2161;: 2,
    &#x2160;: 1
  } 
function g(num){
  var roman = &apos;&apos;
  if(num &gt; 30000) return false
  var arr = []
  for (i in data) {
    while (num &gt;= data[i]) {
      roman += i;
      num -= data[i];
    }
  }
  return roman
}

let arr = []
for (let index = 1; index &lt; 26; index++) {
  arr.push(g(index))
}
console.log(arr)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>  <span class="hljs-built_in">var</span> data = {
    &#x2188;: <span class="hljs-number">100000</span>,
    &#x2182;&#x2188;: <span class="hljs-number">90000</span>,
    &#x2187;: <span class="hljs-number">50000</span>,
    &#x2182;&#x2187;: <span class="hljs-number">40000</span>,
    &#x2182;: <span class="hljs-number">10000</span>,
    &#x216F;&#x2182;: <span class="hljs-number">9000</span>,
    &#x2181;: <span class="hljs-number">5000</span>,
    &#x216F;&#x2181;: <span class="hljs-number">4000</span>,
    &#x216F;: <span class="hljs-number">1000</span>,
    &#x216D;&#x216F;: <span class="hljs-number">900</span>,
    &#x216E;: <span class="hljs-number">500</span>,
    &#x216D;&#x216E;: <span class="hljs-number">400</span>,
    &#x216D;: <span class="hljs-number">100</span>,
    &#x2169;&#x216D;: <span class="hljs-number">90</span>,
    &#x216C;: <span class="hljs-number">50</span>,
    &#x2169;&#x216C;: <span class="hljs-number">40</span>,
    &#x2169;: <span class="hljs-number">10</span>,
    &#x2168;: <span class="hljs-number">9</span>,
    &#x2167;: <span class="hljs-number">8</span>,
    &#x2166;: <span class="hljs-number">7</span>,
    &#x2165;: <span class="hljs-number">6</span>,
    &#x2164;: <span class="hljs-number">5</span>,
    &#x2163;: <span class="hljs-number">4</span>,
    &#x2162;: <span class="hljs-number">3</span>,
    &#x2161;: <span class="hljs-number">2</span>,
    &#x2160;: <span class="hljs-number">1</span>
  } 
function g(<span class="hljs-built_in">num</span>){
  <span class="hljs-built_in">var</span> roman = &apos;&apos;
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">num</span> &gt; <span class="hljs-number">30000</span>) <span class="hljs-built_in">return</span> <span class="hljs-literal">false</span>
  <span class="hljs-built_in">var</span> arr = []
  <span class="hljs-keyword">for</span> (i <span class="hljs-keyword">in</span> data) {
    <span class="hljs-keyword">while</span> (<span class="hljs-built_in">num</span> &gt;= data[i]) {
      roman += i;
      <span class="hljs-built_in">num</span> -= data[i];
    }
  }
  <span class="hljs-built_in">return</span> roman
}

<span class="hljs-built_in">let</span> arr = []
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> index = <span class="hljs-number">1</span>; index &lt; <span class="hljs-number">26</span>; index++) {
  arr.<span class="hljs-built_in">push</span>(g(index))
}
console.<span class="hljs-built_in">log</span>(arr)
</code></pre><h2 id="articleHeader2">&#x624B;&#x5DE5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getRomanNumber() {
  return [
    &apos;&#x2160;&apos;, &apos;&#x2161;&apos;, &apos;&#x2162;&apos;, &apos;&#x2163;&apos;, &apos;&#x2164;&apos;, &apos;&#x2165;&apos;, &apos;&#x2166;&apos;, &apos;&#x2167;&apos;, &apos;&#x2168;&apos;, &apos;&#x2169;&apos;,
    &apos;&#x2169;&#x2160;&apos;, &apos;&#x2169;&#x2161;&apos;, &apos;&#x2169;&#x2162;&apos;, &apos;&#x2169;&#x2163;&apos;, &apos;&#x2169;&#x2164;&apos;, &apos;&#x2169;&#x2165;&apos;, &apos;&#x2169;&#x2166;&apos;, &apos;&#x2169;&#x2167;&apos;, &apos;&#x2169;&#x2168;&apos;, &apos;&#x2169;&#x2169;&apos;,
    &apos;&#x2169;&#x2169;&#x2160;&apos;, &apos;&#x2169;&#x2169;&#x2161;&apos;, &apos;&#x2169;&#x2169;&#x2162;&apos;, &apos;&#x2169;&#x2169;&#x2163;&apos;, &apos;&#x2169;&#x2169;&#x2164;&apos;, &apos;&#x2169;&#x2169;&#x2165;&apos;
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRomanNumber</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [
    <span class="hljs-string">&apos;&#x2160;&apos;</span>, <span class="hljs-string">&apos;&#x2161;&apos;</span>, <span class="hljs-string">&apos;&#x2162;&apos;</span>, <span class="hljs-string">&apos;&#x2163;&apos;</span>, <span class="hljs-string">&apos;&#x2164;&apos;</span>, <span class="hljs-string">&apos;&#x2165;&apos;</span>, <span class="hljs-string">&apos;&#x2166;&apos;</span>, <span class="hljs-string">&apos;&#x2167;&apos;</span>, <span class="hljs-string">&apos;&#x2168;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&apos;</span>,
    <span class="hljs-string">&apos;&#x2169;&#x2160;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2161;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2162;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2163;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2164;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2165;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2166;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2167;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2168;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2169;&apos;</span>,
    <span class="hljs-string">&apos;&#x2169;&#x2169;&#x2160;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2169;&#x2161;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2169;&#x2162;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2169;&#x2163;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2169;&#x2164;&apos;</span>, <span class="hljs-string">&apos;&#x2169;&#x2169;&#x2165;&apos;</span>
  ]
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js/javascript 生成罗马字符

## 原文链接
[https://segmentfault.com/a/1190000015218289](https://segmentfault.com/a/1190000015218289)


---
title: js数组遍历总结
hidden: true
categories: reprint
slug: 5b8c223e
date: 2018-11-04 02:30:10
---

{{< raw >}}
<p>js&#x4E2D;&#x7684;&#x6570;&#x7EC4;&#x904D;&#x5386;&#x662F;&#x9879;&#x76EE;&#x4E2D;&#x7ECF;&#x5E38;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x5C06;&#x51E0;&#x79CD;&#x65B9;&#x6CD5;&#x505A;&#x4E2A;&#x5BF9;&#x6BD4;&#x3002;</p><h2 id="articleHeader0">for&#x5FAA;&#x73AF;&#xFF1A;&#x4F7F;&#x7528;&#x8BC4;&#x7387;&#x6700;&#x9AD8;&#xFF0C;&#x4E5F;&#x662F;&#x6700;&#x57FA;&#x672C;&#x7684;&#x4E00;&#x79CD;&#x904D;&#x5386;&#x65B9;&#x5F0F;&#x3002;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;,&apos;d&apos;,&apos;e&apos;];
for (let i = 0, len = arr.length; i &lt; len; i++) {
    console.log(i);       //  0 1 2 3 4
    console.log(arr[i]);  //a b c d e
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>,<span class="hljs-string">&apos;d&apos;</span>,<span class="hljs-string">&apos;e&apos;</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
    <span class="hljs-built_in">console</span>.log(i);       <span class="hljs-comment">//  0 1 2 3 4</span>
    <span class="hljs-built_in">console</span>.log(arr[i]);  <span class="hljs-comment">//a b c d e</span>
}</code></pre><h2 id="articleHeader1">forEach()&#x5FAA;&#x73AF;&#xFF1A;forEach&#x4E2D;&#x4F20;&#x5165;&#x8981;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x6709;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;(&#x5FC5;&#x9009;)&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7D22;&#x5F15;&#x503C;(&#x53EF;&#x9009;)&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x672C;&#x8EAB;(&#x53EF;&#x9009;)</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;,&apos;d&apos;,&apos;e&apos;];
arr.forEach((item,index,arr)=&gt; {
    console.log(item);   // a b c d e 
    console.log(index);  // 0 1 2 3 4
    console.log(arr);    // [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;,&apos;d&apos;,&apos;e&apos;]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let arr = [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>,<span class="hljs-string">&apos;d&apos;</span>,<span class="hljs-string">&apos;e&apos;</span>];
arr.forEach(<span class="hljs-function"><span class="hljs-params">(item,index,arr)</span>=&gt;</span> {
    <span class="hljs-built_in">console</span>.log(item);   <span class="hljs-regexp">//</span> a b c d e 
    <span class="hljs-built_in">console</span>.log(index);  <span class="hljs-regexp">//</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span>
    <span class="hljs-built_in">console</span>.log(arr);    <span class="hljs-regexp">//</span> [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>,<span class="hljs-string">&apos;d&apos;</span>,<span class="hljs-string">&apos;e&apos;</span>]
})</code></pre><h2 id="articleHeader2">map&#x5FAA;&#x73AF;&#xFF1A; map()&#x4E2D;&#x4F20;&#x5165;&#x8981;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x6709;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;(&#x5FC5;&#x9009;)&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7D22;&#x5F15;&#x503C;(&#x53EF;&#x9009;)&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x672C;&#x8EAB;(&#x53EF;&#x9009;)</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [
    {name:&apos;a&apos;,age:&apos;18&apos;},
    {name:&apos;b&apos;,age:&apos;19&apos;},
    {name:&apos;c&apos;,age:&apos;20&apos;}
];
arr.map(function(item,index) {
    if(item.name == &apos;b&apos;) {
        console.log(index)  // 1
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>var arr = [
    {<span class="hljs-string">name:</span><span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">age:</span><span class="hljs-string">&apos;18&apos;</span>},
    {<span class="hljs-string">name:</span><span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">age:</span><span class="hljs-string">&apos;19&apos;</span>},
    {<span class="hljs-string">name:</span><span class="hljs-string">&apos;c&apos;</span>,<span class="hljs-string">age:</span><span class="hljs-string">&apos;20&apos;</span>}
];
arr.map(function(item,index) {
    <span class="hljs-keyword">if</span>(item.name == <span class="hljs-string">&apos;b&apos;</span>) {
        console.log(index)  <span class="hljs-comment">// 1</span>
    }
})</code></pre><h2 id="articleHeader3">for...in&#x5FAA;&#x73AF;&#xFF1A;for...in&#x5FAA;&#x73AF;&#x53EF;&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;,&#x63A8;&#x8350;&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;,&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x904D;&#x5386;json</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: &apos;&#x738B;&#x5927;&#x9524;&apos;,
    age: &apos;18&apos;,
    weight: &apos;70kg&apos;
}
for(var key in obj) {
    console.log(key);       //  name age weight
    console.log(obj[key]);  //  &#x738B;&#x5927;&#x9524; 18 70kg
}
let arr = [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;,&apos;d&apos;,&apos;e&apos;];
for(var key in arr) {
    console.log(key);  //  0 1 2 3 4 &#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7D22;&#x5F15;
    console.log(arr[key]) //  a b c d e
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x738B;&#x5927;&#x9524;&apos;</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-string">&apos;18&apos;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-string">&apos;70kg&apos;</span>
}
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-built_in">console</span>.log(key);       <span class="hljs-comment">//  name age weight</span>
    <span class="hljs-built_in">console</span>.log(obj[key]);  <span class="hljs-comment">//  &#x738B;&#x5927;&#x9524; 18 70kg</span>
}
<span class="hljs-keyword">let</span> arr = [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>,<span class="hljs-string">&apos;d&apos;</span>,<span class="hljs-string">&apos;e&apos;</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> arr) {
    <span class="hljs-built_in">console</span>.log(key);  <span class="hljs-comment">//  0 1 2 3 4 &#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7D22;&#x5F15;</span>
    <span class="hljs-built_in">console</span>.log(arr[key]) <span class="hljs-comment">//  a b c d e</span>
}</code></pre><h2 id="articleHeader4">for...of&#x5FAA;&#x73AF;&#xFF1A;&#x53EF;&#x5FAA;&#x73AF;&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;&#xFF0C;&#x63A8;&#x8350;&#x7528;&#x4E8E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x3002;</h2><p>for...of&#x63D0;&#x4F9B;&#x4E86;&#x4E09;&#x4E2A;&#x65B0;&#x65B9;&#x6CD5;&#xFF1A;</p><ol><li>key()&#x662F;&#x5BF9;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#xFF1B;</li><li>value()&#x662F;&#x5BF9;&#x952E;&#x503C;&#x7684;&#x904D;&#x5386;&#xFF1B;</li><li>entries()&#x662F;&#x5BF9;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#xFF1B;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [&apos;&#x79D1;&#x5927;&#x8BAF;&#x98DE;&apos;, &apos;&#x653F;&#x6CD5;BG&apos;, &apos;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&apos;];
for (let item of arr) {  
  console.log(item); //  &#x79D1;&#x5927;&#x8BAF;&#x98DE;  &#x653F;&#x6CD5;BG  &#x524D;&#x7AEF;&#x5F00;&#x53D1;
}
// &#x8F93;&#x51FA;&#x6570;&#x7EC4;&#x7D22;&#x5F15;
for (let item of arr.keys()) {  
  console.log(item);  // 0 1 2
}
// &#x8F93;&#x51FA;&#x5185;&#x5BB9;&#x548C;&#x7D22;&#x5F15;
for (let [item, val] of arr.entries()) {  
  console.log(item + &apos;:&apos; + val); //  0:&#x79D1;&#x5927;&#x8BAF;&#x98DE;  1&#xFF1A;&#x653F;&#x6CD5;BG  2&#xFF1A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-string">&apos;&#x79D1;&#x5927;&#x8BAF;&#x98DE;&apos;</span>, <span class="hljs-string">&apos;&#x653F;&#x6CD5;BG&apos;</span>, <span class="hljs-string">&apos;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&apos;</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> arr) {  
  <span class="hljs-built_in">console</span>.log(item); <span class="hljs-comment">//  &#x79D1;&#x5927;&#x8BAF;&#x98DE;  &#x653F;&#x6CD5;BG  &#x524D;&#x7AEF;&#x5F00;&#x53D1;</span>
}
<span class="hljs-comment">// &#x8F93;&#x51FA;&#x6570;&#x7EC4;&#x7D22;&#x5F15;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> arr.keys()) {  
  <span class="hljs-built_in">console</span>.log(item);  <span class="hljs-comment">// 0 1 2</span>
}
<span class="hljs-comment">// &#x8F93;&#x51FA;&#x5185;&#x5BB9;&#x548C;&#x7D22;&#x5F15;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [item, val] <span class="hljs-keyword">of</span> arr.entries()) {  
  <span class="hljs-built_in">console</span>.log(item + <span class="hljs-string">&apos;:&apos;</span> + val); <span class="hljs-comment">//  0:&#x79D1;&#x5927;&#x8BAF;&#x98DE;  1&#xFF1A;&#x653F;&#x6CD5;BG  2&#xFF1A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;</span>
}</code></pre><h2 id="articleHeader5">&#x603B;&#x7ED3;&#xFF1A;forEach&#x3001;map&#x3001;filter&#x3001;reduce&#x3001;every&#x3001;some &#x90FD;&#x4F1A;&#x6709; break &#x548C; continue &#x4E0D;&#x751F;&#x6548;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x662F;&#x5728;function&#x4E2D;&#xFF0C;&#x4F46;function&#x89E3;&#x51B3;&#x4E86;&#x95ED;&#x5305;&#x9677;&#x9631;&#x7684;&#x95EE;&#x9898;&#xFF1B;&#x8981;&#x4F7F;&#x7528; break&#x3001;continue &#x53EF;&#x4EE5;&#x4F7F;&#x7528; for&#x3001;for...in&#x3001;for...of&#x3001;while&#x3002; &#x7528;&#x4E8E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4F7F;&#x7528;&#xFF1A;for()&#xFF0C;forEach()&#xFF0C;map()&#xFF0C;for...of &#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x4F7F;&#x7528;&#xFF1A;for...in</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js数组遍历总结

## 原文链接
[https://segmentfault.com/a/1190000016669588](https://segmentfault.com/a/1190000016669588)


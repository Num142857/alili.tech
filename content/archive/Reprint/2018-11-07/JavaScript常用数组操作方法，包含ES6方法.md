---
title: JavaScript常用数组操作方法，包含ES6方法
hidden: true
categories: [reprint]
slug: 882dba7e
date: 2018-11-07 02:30:15
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;concat()</h2><p>concat() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6570;&#x7EC4;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x73B0;&#x6709;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x4EC5;&#x4F1A;&#x8FD4;&#x56DE;&#x88AB;&#x8FDE;&#x63A5;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1,2,3];
var arr2 = [4,5];
var arr3 = arr1.concat(arr2);
console.log(arr1); //[1, 2, 3]
console.log(arr3); //[1, 2, 3, 4, 5]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> arr2 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> arr3 = arr1.concat(arr2);
<span class="hljs-built_in">console</span>.log(arr1); <span class="hljs-comment">//[1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log(arr3); <span class="hljs-comment">//[1, 2, 3, 4, 5]</span></code></pre><h2 id="articleHeader1">&#x4E8C;&#x3001;join()</h2><p>join() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x653E;&#x5165;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x5143;&#x7D20;&#x662F;&#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x7684;&#x5206;&#x9694;&#x7B26;&#x8FDB;&#x884C;&#x5206;&#x9694;&#x7684;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&apos;,&apos;&#x53F7;&#x5206;&#x5272;&#xFF0C;&#x4E0D;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4];
console.log(arr.join());  //2,3,4
console.log(arr);  //[2, 3, 4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
<span class="hljs-built_in">console</span>.log(arr.join());  <span class="hljs-comment">//2,3,4</span>
<span class="hljs-built_in">console</span>.log(arr);  <span class="hljs-comment">//[2, 3, 4]</span></code></pre><h2 id="articleHeader2">&#x4E09;&#x3001;push()</h2><p>push() &#x65B9;&#x6CD5;&#x53EF;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x957F;&#x5EA6;&#xFF0C;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [2,3,4];
var b = a.push(5);
console.log(a);  //[2,3,4,5]
console.log(b);  //4
push&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4E00;&#x6B21;&#x6DFB;&#x52A0;&#x591A;&#x4E2A;&#x5143;&#x7D20;push(data1,data2....)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>var a = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
var b = a.<span class="hljs-keyword">push</span>(<span class="hljs-number">5</span>);
console.<span class="hljs-built_in">log</span>(a);  <span class="hljs-comment">//[2,3,4,5]</span>
console.<span class="hljs-built_in">log</span>(b);  <span class="hljs-comment">//4</span>
<span class="hljs-keyword">push</span>&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4E00;&#x6B21;&#x6DFB;&#x52A0;&#x591A;&#x4E2A;&#x5143;&#x7D20;<span class="hljs-keyword">push</span>(data1,data2....)</code></pre><h2 id="articleHeader3">&#x56DB;&#x3001;pop()</h2><p>pop() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5220;&#x9664;&#x5E76;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;&#x8FD4;&#x56DE;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4];
console.log(arr.pop()); //4
console.log(arr);  //[2,3]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>var arr = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-keyword">pop</span>()); <span class="hljs-comment">//4</span>
console.<span class="hljs-built_in">log</span>(arr);  <span class="hljs-comment">//[2,3]</span>
</code></pre><h2 id="articleHeader4">&#x4E94;&#x3001;shift()</h2><p>shift() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4ECE;&#x5176;&#x4E2D;&#x5220;&#x9664;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4];
console.log(arr.shift()); //2
console.log(arr);  //[3,4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
<span class="hljs-built_in">console</span>.log(arr.shift()); <span class="hljs-comment">//2</span>
<span class="hljs-built_in">console</span>.log(arr);  <span class="hljs-comment">//[3,4]</span></code></pre><h2 id="articleHeader5">&#x516D;&#x3001;unshift()</h2><p>unshift() &#x65B9;&#x6CD5;&#x53EF;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x5F00;&#x5934;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x66F4;&#x591A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6;&#x3002;&#x8FD4;&#x56DE;&#x65B0;&#x957F;&#x5EA6;&#xFF0C;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4,5];
console.log(arr.unshift(3,6)); //6
console.log(arr); //[3, 6, 2, 3, 4, 5]
tip:&#x8BE5;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4E0D;&#x4F20;&#x53C2;&#x6570;,&#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x5C31;&#x662F;&#x4E0D;&#x589E;&#x52A0;&#x5143;&#x7D20;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-built_in">console</span>.log(arr.unshift(<span class="hljs-number">3</span>,<span class="hljs-number">6</span>)); <span class="hljs-comment">//6</span>
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">//[3, 6, 2, 3, 4, 5]</span>
tip:&#x8BE5;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4E0D;&#x4F20;&#x53C2;&#x6570;,&#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x5C31;&#x662F;&#x4E0D;&#x589E;&#x52A0;&#x5143;&#x7D20;&#x3002;
</code></pre><h2 id="articleHeader6">&#x4E03;&#x3001;slice()</h2><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5305;&#x542B;&#x4ECE; start &#x5230; end &#xFF08;&#x4E0D;&#x5305;&#x62EC;&#x8BE5;&#x5143;&#x7D20;&#xFF09;&#x7684; arrayObject &#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;&#x8FD4;&#x56DE;&#x9009;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4,5];
console.log(arr.slice(1,3));  //[3,4]
console.log(arr);  //[2,3,4,5]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
console.log(arr.slice(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>));  <span class="hljs-comment">//[3,4]</span>
console.log(arr);  <span class="hljs-comment">//[2,3,4,5]</span></code></pre><h2 id="articleHeader7">&#x516B;&#x3001;splice()</h2><p>splice() &#x65B9;&#x6CD5;&#x53EF;&#x5220;&#x9664;&#x4ECE; index &#x5904;&#x5F00;&#x59CB;&#x7684;&#x96F6;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x7528;&#x53C2;&#x6570;&#x5217;&#x8868;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x503C;&#x6765;&#x66FF;&#x6362;&#x90A3;&#x4E9B;&#x88AB;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x3002;&#x5982;&#x679C;&#x4ECE; arrayObject &#x4E2D;&#x5220;&#x9664;&#x4E86;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x542B;&#x6709;&#x88AB;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#x3002;splice() &#x65B9;&#x6CD5;&#x4F1A;&#x76F4;&#x63A5;&#x5BF9;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [5,6,7,8];
console.log(a.splice(1,0,9)); //[]
console.log(a);  // [5, 9, 6, 7, 8]
var b = [5,6,7,8];
console.log(b.splice(1,2,3));  //[6, 7]
console.log(b); //[5, 3, 8]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>];
console.log(a.splice(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">9</span>)); <span class="hljs-comment">//[]</span>
console.log(a);  <span class="hljs-comment">// [5, 9, 6, 7, 8]</span>
var b = [<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>];
console.log(b.splice(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>));  <span class="hljs-comment">//[6, 7]</span>
console.log(b); <span class="hljs-comment">//[5, 3, 8]</span></code></pre><h2 id="articleHeader8">&#x4E5D;&#x3001;&#x5199;&#x9519;&#x4E86;&#xFF08;&#x5DF2;&#x5220;&#x9664;&#xFF09;</h2><h2 id="articleHeader9">&#x5341;&#x3001;sort &#x6392;&#x5E8F;</h2><p>&#x6309;&#x7167; Unicode code &#x4F4D;&#x7F6E;&#x6392;&#x5E8F;&#xFF0C;&#x9ED8;&#x8BA4;&#x5347;&#x5E8F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fruit = [&apos;cherries&apos;, &apos;apples&apos;, &apos;bananas&apos;];
fruit.sort(); // [&apos;apples&apos;, &apos;bananas&apos;, &apos;cherries&apos;]

var scores = [1, 10, 21, 2];
scores.sort(); // [1, 10, 2, 21]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>var fruit = [<span class="hljs-string">&apos;cherries&apos;</span>, <span class="hljs-string">&apos;apples&apos;</span>, <span class="hljs-string">&apos;bananas&apos;</span>];
fruit.sort(); // [<span class="hljs-string">&apos;apples&apos;</span>, <span class="hljs-string">&apos;bananas&apos;</span>, <span class="hljs-string">&apos;cherries&apos;</span>]

var scores = [<span class="hljs-number">1</span>, <span class="hljs-number">10</span>, <span class="hljs-number">21</span>, <span class="hljs-number">2</span>];
scores.sort(); // [<span class="hljs-number">1</span>, <span class="hljs-number">10</span>, <span class="hljs-number">2</span>, <span class="hljs-number">21</span>]</code></pre><h2 id="articleHeader10">&#x5341;&#x4E00;&#x3001;reverse()</h2><p>reverse() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x98A0;&#x5012;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;&#x3002;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x98A0;&#x5012;&#x540E;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4];
console.log(arr.reverse()); //[4, 3, 2]
console.log(arr);  //[4, 3, 2]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> arr = [2,3,4];
console.<span class="hljs-built_in">log</span>(arr.<span class="hljs-built_in">reverse</span>()); <span class="hljs-comment">//[4, 3, 2]</span>
console.<span class="hljs-built_in">log</span>(arr);  <span class="hljs-comment">//[4, 3, 2]</span>
</code></pre><h2 id="articleHeader11">&#x5341;&#x4E8C;&#x3001;indexOf &#x548C; lastIndexOf</h2><p>&#x90FD;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x67E5;&#x627E;&#x7684;&#x503C;&#x3001;&#x67E5;&#x627E;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;<br>&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x8FD4;&#x56DE; -1 &#xFF1B;&#x5B58;&#x5728;&#xFF0C;&#x8FD4;&#x56DE;&#x4F4D;&#x7F6E;&#x3002;indexOf &#x662F;&#x4ECE;&#x524D;&#x5F80;&#x540E;&#x67E5;&#x627E;&#xFF0C; lastIndexOf &#x662F;&#x4ECE;&#x540E;&#x5F80;&#x524D;&#x67E5;&#x627E;&#x3002;<br><strong>indexOf</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [2, 9, 9];
a.indexOf(2); // 0
a.indexOf(7); // -1

if (a.indexOf(7) === -1) {
  // element doesn&apos;t exist in array
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">9</span>];
a.indexOf(<span class="hljs-number">2</span>); <span class="hljs-comment">// 0</span>
a.indexOf(<span class="hljs-number">7</span>); <span class="hljs-comment">// -1</span>

if (a.indexOf(<span class="hljs-number">7</span>) === <span class="hljs-number">-1</span>) {
  <span class="hljs-comment">// element doesn&apos;t exist in array</span>
}</code></pre><p><strong>lastIndexOf</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2);     // 3
numbers.lastIndexOf(7);     // -1
numbers.lastIndexOf(2, 3);  // 3
numbers.lastIndexOf(2, 2);  // 0
numbers.lastIndexOf(2, -2); // 0
numbers.lastIndexOf(2, -1); // 3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var numbers = [<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">2</span>];
numbers.lastIndexOf(<span class="hljs-number">2</span>);     <span class="hljs-comment">// 3</span>
numbers.lastIndexOf(<span class="hljs-number">7</span>);     <span class="hljs-comment">// -1</span>
numbers.lastIndexOf(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">// 3</span>
numbers.lastIndexOf(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>);  <span class="hljs-comment">// 0</span>
numbers.lastIndexOf(<span class="hljs-number">2</span>, <span class="hljs-number">-2</span>); <span class="hljs-comment">// 0</span>
numbers.lastIndexOf(<span class="hljs-number">2</span>, <span class="hljs-number">-1</span>); <span class="hljs-comment">// 3</span>
</code></pre><h2 id="articleHeader12">&#x5341;&#x4E09;&#x3001;every</h2><p>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x8FD0;&#x884C;&#x7ED9;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x8FD4;&#x56DE; ture,&#x5219;&#x8FD4;&#x56DE; true</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isBigEnough(element, index, array) {
  return element &lt; 10;
}    
[2, 5, 8, 3, 4].every(isBigEnough);   // true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isBigEnough</span><span class="hljs-params">(element, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">array</span>)</span> <span class="hljs-comment">{
  return element &lt; 10;
}</span>    
[2, 5, 8, 3, 4].<span class="hljs-title">every</span><span class="hljs-params">(isBigEnough)</span>;</span>   <span class="hljs-comment">// true</span>
</code></pre><h2 id="articleHeader13">&#x5341;&#x56DB;&#x3001;some</h2><p>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x8FD0;&#x884C;&#x7ED9;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4EFB;&#x610F;&#x4E00;&#x9879;&#x90FD;&#x8FD4;&#x56DE; ture,&#x5219;&#x8FD4;&#x56DE; true</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compare(element, index, array) {
  return element &gt; 10;
}    
[2, 5, 8, 1, 4].some(compare);  // false
[12, 5, 8, 1, 4].some(compare); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>function compare(element, index, array) {
  return element &gt; <span class="hljs-number">10</span>;
}    
[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].some(compare);  <span class="hljs-comment">// false</span>
[<span class="hljs-number">12</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>].some(compare); <span class="hljs-comment">// true</span></code></pre><h2 id="articleHeader14">&#x5341;&#x4E94;&#x3001;filter</h2><p>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x8FD0;&#x884C;&#x7ED9;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE; &#x7ED3;&#x679C;&#x4E3A; ture &#x7684;&#x9879;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var words = [&quot;spray&quot;, &quot;limit&quot;, &quot;elite&quot;, &quot;exuberant&quot;, &quot;destruction&quot;, &quot;present&quot;, &quot;happy&quot;];

var longWords = words.filter(function(word){
  return word.length &gt; 6;
});
// Filtered array longWords is [&quot;exuberant&quot;, &quot;destruction&quot;, &quot;present&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs golo"><code><span class="hljs-keyword">var</span> words = [<span class="hljs-string">&quot;spray&quot;</span>, <span class="hljs-string">&quot;limit&quot;</span>, <span class="hljs-string">&quot;elite&quot;</span>, <span class="hljs-string">&quot;exuberant&quot;</span>, <span class="hljs-string">&quot;destruction&quot;</span>, <span class="hljs-string">&quot;present&quot;</span>, <span class="hljs-string">&quot;happy&quot;</span>];

<span class="hljs-keyword">var</span> longWords = words.<span class="hljs-keyword">filter</span>(<span class="hljs-keyword">function</span>(word){
  <span class="hljs-keyword">return</span> word.length &gt; <span class="hljs-number">6</span>;
});
// Filtered <span class="hljs-keyword">array</span> longWords is [<span class="hljs-string">&quot;exuberant&quot;</span>, <span class="hljs-string">&quot;destruction&quot;</span>, <span class="hljs-string">&quot;present&quot;</span>]</code></pre><h2 id="articleHeader15">&#x5341;&#x516D;&#x3001;map</h2><p>&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x8FD0;&#x884C;&#x7ED9;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x6BCF;&#x6B21;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;&#x7ED3;&#x679C;&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = [1, 5, 10, 15];
var doubles = numbers.map(function(x) {
   return x * 2;
});
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
<span class="hljs-keyword">var</span> doubles = numbers.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{
   <span class="hljs-keyword">return</span> x * <span class="hljs-number">2</span>;
});
<span class="hljs-comment">// doubles is now [2, 10, 20, 30]</span>
<span class="hljs-comment">// numbers is still [1, 5, 10, 15]</span></code></pre><h2 id="articleHeader16">&#x5341;&#x4E03;&#x3001;forEach &#x6570;&#x7EC4;&#x904D;&#x5386;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const items = [&apos;item1&apos;, &apos;item2&apos;, &apos;item3&apos;];
const copy = [];    
items.forEach(function(item){
  copy.push(item)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>const items = [<span class="hljs-string">&apos;item1&apos;</span>, <span class="hljs-string">&apos;item2&apos;</span>, <span class="hljs-string">&apos;item3&apos;</span>];
const <span class="hljs-keyword">copy</span><span class="bash"> = [];    
</span>items.forEach(function(item){
  <span class="hljs-keyword">copy</span>.<span class="bash">push(item)
</span>});</code></pre><h2 id="articleHeader17">ES6&#x65B0;&#x589E;&#x65B0;&#x64CD;&#x4F5C;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;</h2><h2 id="articleHeader18">1&#x3001;find()&#xFF1A;</h2><p>&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B26;&#x5408;&#x5F53;&#x524D;&#x641C;&#x7D22;&#x89C4;&#x5219;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x5B83;&#xFF0C;&#x5E76;&#x4E14;&#x7EC8;&#x6B62;&#x641C;&#x7D22;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [1, &quot;2&quot;, 3, 3, &quot;2&quot;]
console.log(arr.find(n =&gt; typeof n === &quot;number&quot;)) // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-string">&quot;2&quot;</span>]
<span class="hljs-built_in">console</span>.log(arr.find(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> <span class="hljs-keyword">typeof</span> n === <span class="hljs-string">&quot;number&quot;</span>)) <span class="hljs-comment">// 1</span></code></pre><h2 id="articleHeader19">2&#x3001;findIndex()&#xFF1A;</h2><p>&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B26;&#x5408;&#x5F53;&#x524D;&#x641C;&#x7D22;&#x89C4;&#x5219;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x5B83;&#x7684;&#x4E0B;&#x6807;&#xFF0C;&#x7EC8;&#x6B62;&#x641C;&#x7D22;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [1, &quot;2&quot;, 3, 3, &quot;2&quot;]
console.log(arr.findIndex(n =&gt; typeof n === &quot;number&quot;)) // 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-string">&quot;2&quot;</span>]
<span class="hljs-built_in">console</span>.log(arr.findIndex(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> <span class="hljs-keyword">typeof</span> n === <span class="hljs-string">&quot;number&quot;</span>)) <span class="hljs-comment">// 0</span></code></pre><h2 id="articleHeader20">3&#x3001;fill()&#xFF1A;</h2><p>&#x7528;&#x65B0;&#x5143;&#x7D20;&#x66FF;&#x6362;&#x6389;&#x6570;&#x7EC4;&#x5185;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x66FF;&#x6362;&#x4E0B;&#x6807;&#x8303;&#x56F4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.fill(value, start, end)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code style="word-break:break-word;white-space:initial">arr.fill(<span class="hljs-built_in">value</span>, <span class="hljs-built_in">start</span>, <span class="hljs-keyword">end</span>)</code></pre><h2 id="articleHeader21">4&#x3001;copyWithin()&#xFF1A;</h2><p>&#x9009;&#x62E9;&#x6570;&#x7EC4;&#x7684;&#x67D0;&#x4E2A;&#x4E0B;&#x6807;&#xFF0C;&#x4ECE;&#x8BE5;&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x590D;&#x5236;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#xFF0C;&#x9ED8;&#x8BA4;&#x4ECE;0&#x5F00;&#x59CB;&#x590D;&#x5236;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x8981;&#x590D;&#x5236;&#x7684;&#x5143;&#x7D20;&#x8303;&#x56F4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.copyWithin(target, start, end)
const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3))
 // [1,2,3,1,2] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6240;&#x4EE5;4, 5&#x88AB;&#x66FF;&#x6362;&#x6210;1, 2
const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.copyWithin(3, 1)) 
// [1,2,3,2,3] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x590D;&#x5236;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#x4E3A;1&#xFF0C;&#x6240;&#x4EE5;4, 5&#x88AB;&#x66FF;&#x6362;&#x6210;2, 3
const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.copyWithin(3, 1, 2)) 
// [1,2,3,2,5] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x590D;&#x5236;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#x4E3A;1&#xFF0C;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x4E3A;2&#xFF0C;&#x6240;&#x4EE5;4&#x88AB;&#x66FF;&#x6362;&#x6210;2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>arr.copyWithin(target, start, end)
const arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
console.log(arr.copyWithin(<span class="hljs-number">3</span>))
 <span class="hljs-comment">// [1,2,3,1,2] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6240;&#x4EE5;4, 5&#x88AB;&#x66FF;&#x6362;&#x6210;1, 2</span>
const arr1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
console.log(arr1.copyWithin(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>)) 
<span class="hljs-comment">// [1,2,3,2,3] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x590D;&#x5236;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#x4E3A;1&#xFF0C;&#x6240;&#x4EE5;4, 5&#x88AB;&#x66FF;&#x6362;&#x6210;2, 3</span>
const arr2 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
console.log(arr2.copyWithin(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>)) 
<span class="hljs-comment">// [1,2,3,2,5] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x590D;&#x5236;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#x4E3A;1&#xFF0C;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x4E3A;2&#xFF0C;&#x6240;&#x4EE5;4&#x88AB;&#x66FF;&#x6362;&#x6210;2</span></code></pre><h2 id="articleHeader22">5&#x3001;from</h2><p>&#x5C06;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;&#x5BF9;&#x8C61;&#xFF08;array-like object&#xFF09;&#x548C;&#x53EF;&#x904D;&#x5386;&#xFF08;iterable&#xFF09;&#x7684;&#x5BF9;&#x8C61;&#x8F6C;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bar = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
Array.from(bar);
// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]

Array.from(&apos;foo&apos;);
// [&quot;f&quot;, &quot;o&quot;, &quot;o&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>const bar = [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>];
<span class="hljs-symbol">Array</span>.from(bar);
// [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>]

<span class="hljs-symbol">Array</span>.from(<span class="hljs-string">&apos;foo&apos;</span>);
// [<span class="hljs-string">&quot;f&quot;</span>, <span class="hljs-string">&quot;o&quot;</span>, <span class="hljs-string">&quot;o&quot;</span>]</code></pre><h2 id="articleHeader23">6&#x3001;of</h2><p>&#x7528;&#x4E8E;&#x5C06;&#x4E00;&#x7EC4;&#x503C;&#xFF0C;&#x8F6C;&#x6362;&#x4E3A;&#x6570;&#x7EC4;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x4E3B;&#x8981;&#x76EE;&#x7684;&#xFF0C;&#x662F;&#x5F25;&#x8865;&#x6570;&#x7EC4;&#x6784;&#x9020;&#x51FD;&#x6570; Array() &#x7684;&#x4E0D;&#x8DB3;&#x3002;&#x56E0;&#x4E3A;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4; Array() &#x7684;&#x884C;&#x4E3A;&#x6709;&#x5DEE;&#x5F02;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>Array() <span class="hljs-comment">// []</span>
Array(<span class="hljs-number">3</span>) <span class="hljs-comment">// [, , ,]</span>
Array(<span class="hljs-number">3</span>, <span class="hljs-number">11</span>, <span class="hljs-number">8</span>) <span class="hljs-comment">// [3, 11, 8]</span>
Array.of(<span class="hljs-number">7</span>);       <span class="hljs-comment">// [7]</span>
Array.of(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// [1, 2, 3]</span>

Array(<span class="hljs-number">7</span>);          <span class="hljs-comment">// [ , , , , , , ]</span>
Array(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);    <span class="hljs-comment">// [1, 2, 3]</span></code></pre><h2 id="articleHeader24">7&#x3001;entries() &#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6570;&#x7EC4;
const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
for(let v of arr.entries()) {
  console.log(v)
}
// [0, &apos;a&apos;] [1, &apos;b&apos;] [2, &apos;c&apos;]

//Set
const arr = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
for(let v of arr.entries()) {
  console.log(v)
}
// [&apos;a&apos;, &apos;a&apos;] [&apos;b&apos;, &apos;b&apos;] [&apos;c&apos;, &apos;c&apos;]

//Map
const arr = new Map();
arr.set(&apos;a&apos;, &apos;a&apos;);
arr.set(&apos;b&apos;, &apos;b&apos;);
for(let v of arr.entries()) {
  console.log(v)
}
// [&apos;a&apos;, &apos;a&apos;] [&apos;b&apos;, &apos;b&apos;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.entries()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// [0, &apos;a&apos;] [1, &apos;b&apos;] [2, &apos;c&apos;]</span>

<span class="hljs-comment">//Set</span>
<span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.entries()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// [&apos;a&apos;, &apos;a&apos;] [&apos;b&apos;, &apos;b&apos;] [&apos;c&apos;, &apos;c&apos;]</span>

<span class="hljs-comment">//Map</span>
<span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
arr.set(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>);
arr.set(<span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.entries()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// [&apos;a&apos;, &apos;a&apos;] [&apos;b&apos;, &apos;b&apos;]</span></code></pre><h2 id="articleHeader25">8&#x3001;values() &#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;value</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6570;&#x7EC4;
const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
for(let v of arr.values()) {
  console.log(v)
}
//&apos;a&apos; &apos;b&apos; &apos;c&apos;

//Set
const arr = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
for(let v of arr.values()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos; &apos;c&apos;

//Map
const arr = new Map();
arr.set(&apos;a&apos;, &apos;a&apos;);
arr.set(&apos;b&apos;, &apos;b&apos;);
for(let v of arr.values()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.values()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">//&apos;a&apos; &apos;b&apos; &apos;c&apos;</span>

<span class="hljs-comment">//Set</span>
<span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.values()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// &apos;a&apos; &apos;b&apos; &apos;c&apos;</span>

<span class="hljs-comment">//Map</span>
<span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
arr.set(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>);
arr.set(<span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.values()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// &apos;a&apos; &apos;b&apos;</span></code></pre><h2 id="articleHeader26">9&#x3001;keys() &#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;key</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6570;&#x7EC4;
const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
for(let v of arr.keys()) {
  console.log(v)
}
// 0 1 2

//Set
const arr = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
for(let v of arr.keys()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos; &apos;c&apos;

//Map
const arr = new Map();
arr.set(&apos;a&apos;, &apos;a&apos;);
arr.set(&apos;b&apos;, &apos;b&apos;);
for(let v of arr.keys()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.keys()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// 0 1 2</span>

<span class="hljs-comment">//Set</span>
<span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.keys()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// &apos;a&apos; &apos;b&apos; &apos;c&apos;</span>

<span class="hljs-comment">//Map</span>
<span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
arr.set(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>);
arr.set(<span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr.keys()) {
  <span class="hljs-built_in">console</span>.log(v)
}
<span class="hljs-comment">// &apos;a&apos; &apos;b&apos;</span></code></pre><h2 id="articleHeader27">10&#x3001;includes</h2><p>&#x5224;&#x65AD;&#x6570;&#x7EC4;&#x4E2D;&#x662F;&#x5426;&#x5B58;&#x5728;&#x8BE5;&#x5143;&#x7D20;&#xFF0C;&#x53C2;&#x6570;&#xFF1A;&#x67E5;&#x627E;&#x7684;&#x503C;&#x3001;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x53EF;&#x4EE5;&#x66FF;&#x6362; ES5 &#x65F6;&#x4EE3;&#x7684; indexOf &#x5224;&#x65AD;&#x65B9;&#x5F0F;&#x3002;indexOf &#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x4E3A; NaN&#xFF0C;&#x4F1A;&#x5224;&#x65AD;&#x9519;&#x8BEF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1, 2, 3];
a.includes(2); // true
a.includes(4); // false
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
a.includes(<span class="hljs-number">2</span>); <span class="hljs-comment">// true</span>
a.includes(<span class="hljs-number">4</span>); <span class="hljs-comment">// false</span>
</code></pre><p><a href="https://segmentfault.com/a/1190000016603159">JavaScript&#x5B57;&#x7B26;&#x4E32;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x5927;&#x5168;&#xFF0C;&#x5305;&#x542B;ES6&#x65B9;&#x6CD5;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript常用数组操作方法，包含ES6方法

## 原文链接
[https://segmentfault.com/a/1190000016503330](https://segmentfault.com/a/1190000016503330)


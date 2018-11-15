---
title: 深入理解：ES6中的Set和Map数据结构，Map与其它数据结构的互相转换
reprint: true
categories: reprint
abbrlink: 66ba1d75
date: 2018-11-09 02:30:06
---

{{% raw %}}
<p>&#x6587;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x4E3B;&#x8981;&#x662F;&#x6765;&#x81EA;&#x4E8E;&#x962E;&#x4E00;&#x5CF0;&#x7684;&#x300A;ES6&#x6807;&#x51C6;&#x5165;&#x95E8;&#x300B;&#xFF08;&#x7B2C;&#x4E09;&#x7248;&#xFF09;&#x3002;<a href="https://segmentfault.com/a/1190000016068235">&#x300A;&#x5B66;&#x4E60;ES6&#x7B14;&#x8BB0;&#x2500;&#x2500;&#x5DE5;&#x4F5C;&#x4E2D;&#x5E38;&#x7528;&#x5230;&#x7684;ES6&#x8BED;&#x6CD5;&#x300B;</a>&#x53EA;&#x662F;&#x7B80;&#x5355;&#x63D0;&#x53CA;Set&#x548C;Map&#xFF0C;&#x4ECA;&#x5929;&#x6709;&#x7A7A;&#x4E8E;&#x662F;&#x5199;&#x4E86;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x2500;&#x2500;&#x300A;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#xFF1A;ES6&#x4E2D;&#x7684;Set&#x548C;Map&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;Map&#x4E0E;&#x5176;&#x5B83;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x300B;&#x3002;</p><h2 id="articleHeader0">ES6 &#x7684; Set:</h2><p>ES6 &#x63D0;&#x4F9B;&#x4E86;&#x65B0;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x2500;&#x2500;Set&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F;&#x6210;&#x5458;&#x7684;&#x503C;&#x90FD;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x91CD;&#x590D;&#x7684;&#x503C;&#x3002;<br>Set &#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x751F;&#x6210; Set &#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;<br><strong>Array&#x548C;Set&#x5BF9;&#x6BD4;</strong><br>&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x591A;&#x503C;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E0A;&#x6709;&#x533A;&#x522B;&#x3002;&#x5982;&#x4E0B;:<br>&#x2460;Array&#x7684;indexOf&#x65B9;&#x6CD5;&#x6BD4;Set&#x7684;has&#x65B9;&#x6CD5;&#x6548;&#x7387;&#x4F4E;&#x4E0B;<br>&#x2461;Set&#x4E0D;&#x542B;&#x6709;&#x91CD;&#x590D;&#x503C;&#xFF08;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x5B9E;&#x73B0;&#x5BF9;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x53BB;&#x91CD;&#xFF09;<br>&#x2462;Set&#x901A;&#x8FC7;delete&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x800C;Array&#x53EA;&#x80FD;&#x901A;&#x8FC7;splice&#x3002;&#x4E24;&#x8005;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x4FBF;&#x7A0B;&#x5EA6;&#x524D;&#x8005;&#x66F4;&#x4F18;<br>&#x2463;Array&#x7684;&#x5F88;&#x591A;&#x65B0;&#x65B9;&#x6CD5;map&#x3001;filter&#x3001;some&#x3001;every&#x7B49;&#x662F;Set&#x6CA1;&#x6709;&#x7684;&#xFF08;&#x4F46;&#x662F;&#x901A;&#x8FC7;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x6765;&#x4F7F;&#x7528;&#xFF09;</p><h2 id="articleHeader1">&#x4E00;&#x3001;Set &#x5B9E;&#x4F8B;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#xFF1A;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();
set.add(1);
set.add(&quot;1&quot;);
console.log(set.size); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>let <span class="hljs-built_in">set</span> = <span class="hljs-keyword">new</span> Set();
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-number">1</span>);
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-string">&quot;1&quot;</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">set</span>.<span class="hljs-built_in">size</span>); <span class="hljs-comment">// 2</span></code></pre><p>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x6765;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A; Set &#xFF0C;&#x5E76;&#x4E14; Set &#x6784;&#x9020;&#x5668;&#x4F1A;&#x786E;&#x4FDD;&#x4E0D;&#x91CD;&#x590D;&#x5730;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x503C;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size); // 5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let set = new Set([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>]);
console.log(set.size); <span class="hljs-comment">// 5</span></code></pre><p><strong>add(value):</strong> &#x6DFB;&#x52A0;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;Set&#x7ED3;&#x6784;&#x672C;&#x8EAB;<br><strong>has(value):</strong> &#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x503C;&#x662F;&#x5426;&#x4E3A;Set&#x7684;&#x6210;&#x5458;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();
set.add(1);
set.add(&quot;1&quot;);
console.log(set.has(1)); // true
console.log(set.has(6)); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">set</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Set</span>();
<span class="hljs-built_in">set</span>.add(<span class="hljs-number">1</span>);
<span class="hljs-built_in">set</span>.add(<span class="hljs-string">&quot;1&quot;</span>);
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">set</span>.has(<span class="hljs-number">1</span>)); <span class="hljs-comment">// true</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">set</span>.has(<span class="hljs-number">6</span>)); <span class="hljs-comment">// false</span></code></pre><p><strong>delete(value):</strong> &#x5220;&#x9664;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x662F;&#x5426;&#x6210;&#x529F;<br><strong>clear(value):</strong>&#x6E05;&#x9664;&#x6240;&#x6709;&#x6210;&#x5458;&#xFF0C;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();
set.add(1);
set.add(&quot;1&quot;);
console.log(set.has(1)); // true
set.delete(1);
console.log(set.has(5)); // false
console.log(set.size); // 1

set.clear();
console.log(set.size); // 0
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>let <span class="hljs-built_in">set</span> = <span class="hljs-keyword">new</span> Set();
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-number">1</span>);
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-string">&quot;1&quot;</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">set</span>.has(<span class="hljs-number">1</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">set</span>.delete(<span class="hljs-number">1</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">set</span>.has(<span class="hljs-number">5</span>)); <span class="hljs-comment">// false</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">set</span>.<span class="hljs-built_in">size</span>); <span class="hljs-comment">// 1</span>

<span class="hljs-built_in">set</span>.<span class="hljs-built_in">clear</span>();
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">set</span>.<span class="hljs-built_in">size</span>); <span class="hljs-comment">// 0</span>
</code></pre><h2 id="articleHeader2">&#x4E8C;&#x3001;<strong>Set&#x904D;&#x5386;&#x64CD;&#x4F5C;</strong></h2><p><strong>keys():</strong>&#x8FD4;&#x56DE;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x5668;<br><strong>values():</strong> &#x8FD4;&#x56DE;&#x5065;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x5668;<br><strong>entries():</strong>&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x5668;<br><strong>forEach():</strong> &#x6BCF;&#x4E2A;&#x6210;&#x5458;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([&apos;red&apos;, &apos;green&apos;, &apos;blue&apos;]);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// [&quot;red&quot;, &quot;red&quot;]
// [&quot;green&quot;, &quot;green&quot;]
// [&quot;blue&quot;, &quot;blue&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;green&apos;</span>, <span class="hljs-string">&apos;blue&apos;</span>]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.keys()) {
  <span class="hljs-built_in">console</span>.log(item);
}
<span class="hljs-comment">// red</span>
<span class="hljs-comment">// green</span>
<span class="hljs-comment">// blue</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.values()) {
  <span class="hljs-built_in">console</span>.log(item);
}
<span class="hljs-comment">// red</span>
<span class="hljs-comment">// green</span>
<span class="hljs-comment">// blue</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.entries()) {
  <span class="hljs-built_in">console</span>.log(item);
}
<span class="hljs-comment">// [&quot;red&quot;, &quot;red&quot;]</span>
<span class="hljs-comment">// [&quot;green&quot;, &quot;green&quot;]</span>
<span class="hljs-comment">// [&quot;blue&quot;, &quot;blue&quot;]</span></code></pre><p><strong>forEach()</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2]);
set.forEach(function(value, key, ownerSet) {
    console.log(key + &quot;&#xFF1A; &quot; + value);
});
// &#x8F93;&#x51FA;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]);
set.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, key, ownerSet</span>) </span>{
    <span class="hljs-built_in">console</span>.log(key + <span class="hljs-string">&quot;&#xFF1A; &quot;</span> + value);
});
<span class="hljs-comment">// &#x8F93;&#x51FA;</span></code></pre><p>// 1 &#xFF1A;1<br>// 2&#xFF1A; 2</p><h2 id="articleHeader3">&#x4E09;&#x3001;<strong>ES6&#x6570;&#x7EC4;&#x53BB;&#x91CD;</strong>&#xFF08;&#x9762;&#x8BD5;&#x4E5F;&#x7ECF;&#x5E38;&#x4F1A;&#x95EE;&#x5230;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x7684;&#x95EE;&#x9898;&#xFF09;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 2, 3];
let set = new Set(arr);
let newArr = Array.from(set);
console.log(newArr); // [1, 2, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>let arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
let <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Set</span>(arr);
let <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = <span class="hljs-keyword">Array</span>.from(<span class="hljs-keyword">set</span>);
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// [1, 2, 3]</span></code></pre><p><strong>Set&#x96C6;&#x5408;&#x8F6C;&#x5316;Array&#x6570;&#x7EC4;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3, 3, 4]);
let arr = Array.from(set)  //&#x8F93;&#x51FA;[1,2,3,4]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">let</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> Set([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]);
<span class="hljs-keyword">let</span> arr = Array.<span class="hljs-keyword">from</span>(<span class="hljs-keyword">set</span>)  <span class="hljs-comment">//&#x8F93;&#x51FA;[1,2,3,4]</span></code></pre><h2 id="articleHeader4">&#x56DB;&#x3001;<strong>WeakSet</strong></h2><p>WeakSet&#x7ED3;&#x6784;&#x4E0E;Set&#x7C7B;&#x4F3C;&#xFF0C;&#x5B83;&#x4E0E;Set&#x6709;&#x4E24;&#x4E2A;&#x533A;&#x522B;&#xFF1A;<br>&#x2460;weakSet&#x7684;&#x6210;&#x5458;&#x53EA;&#x80FD;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x80FD;&#x662F;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF1B;<br>&#x2461;weakSet&#x5BF9;&#x8C61;&#x90FD;&#x662F;&#x5F31;&#x5F15;&#x7528;&#x3002;&#x5982;&#x679C;&#x5176;&#x5B83;&#x5BF9;&#x8C61;&#x4E0D;&#x518D;&#x5F15;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x4F1A;&#x81EA;&#x52A8;&#x56DE;&#x6536;&#x8BE5;&#x5BF9;&#x8C61;&#x6240;&#x5360;&#x7684;&#x5185;&#x5B58;&#xFF0C;&#x6240;&#x4EE5;WeakSet&#x662F;&#x4E0D;&#x53EF;&#x904D;&#x5386;&#x7684;&#x3002;</p><p>WeakSet &#x7ED3;&#x6784;&#x6709;&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;<br><strong>WeakSet.prototype.add(value)</strong>&#xFF1A;&#x5411; WeakSet &#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x6210;&#x5458;&#x3002;<br><strong>WeakSet.prototype.delete(value)</strong>&#xFF1A;&#x6E05;&#x9664; WeakSet &#x5B9E;&#x4F8B;&#x7684;&#x6307;&#x5B9A;&#x6210;&#x5458;&#x3002;<br><strong>WeakSet.prototype.has(value)</strong>&#xFF1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x67D0;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x5728; WeakSet &#x5B9E;&#x4F8B;&#x4E4B;&#x4E2D;&#x3002;<br>WeakSet&#x7684;&#x4E00;&#x4E2A;&#x7528;&#x5904;&#x662F;&#x50A8;&#x5B58;DOM&#x8282;&#x70B9;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x8FD9;&#x4E9B;&#x8282;&#x70B9;&#x4F1A;&#x4ECE;&#x6587;&#x6863;&#x4E2D;&#x79FB;&#x9664;&#x65F6;&#xFF0C;&#x4F1A;&#x5F15;&#x53D1;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x3002;</p><h2 id="articleHeader5">ES6&#x7684;Map:</h2><h2 id="articleHeader6">&#x4E00;&#x3001;ES6 &#x7684; Map&#x542B;&#x4E49;&#x548C;&#x57FA;&#x672C;&#x7528;&#x6CD5;</h2><p>JavaScript &#x7684;&#x5BF9;&#x8C61;&#xFF08;Object&#xFF09;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x96C6;&#x5408;&#xFF08;Hash &#x7ED3;&#x6784;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x4F20;&#x7EDF;&#x4E0A;&#x53EA;&#x80FD;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x5F53;&#x4F5C;&#x952E;&#x3002;&#x8FD9;&#x7ED9;&#x5B83;&#x7684;&#x4F7F;&#x7528;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x5927;&#x7684;&#x9650;&#x5236;&#x3002;<br>ES6 &#x63D0;&#x4F9B;&#x4E86; Map &#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x662F;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x4F46;&#x662F;&#x201C;&#x952E;&#x201D;&#x7684;&#x8303;&#x56F4;&#x4E0D;&#x9650;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5404;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF08;&#x5305;&#x62EC;&#x5BF9;&#x8C61;&#xFF09;&#x90FD;&#x53EF;&#x4EE5;&#x5F53;&#x4F5C;&#x952E;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;Object &#x7ED3;&#x6784;&#x63D0;&#x4F9B;&#x4E86;&#x201C;&#x5B57;&#x7B26;&#x4E32;&#x2014;&#x503C;&#x201D;&#x7684;&#x5BF9;&#x5E94;&#xFF0C;Map &#x7ED3;&#x6784;&#x63D0;&#x4F9B;&#x4E86;&#x201C;&#x503C;&#x2014;&#x503C;&#x201D;&#x7684;&#x5BF9;&#x5E94;&#xFF0C;&#x662F;&#x4E00;&#x79CD;&#x66F4;&#x5B8C;&#x5584;&#x7684; Hash &#x7ED3;&#x6784;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const m = new Map();
const o = {p: &apos;Hello World&apos;};

m.set(o, &apos;content&apos;)
m.get(o) // &quot;content&quot;

m.has(o) // true
m.delete(o) // true
m.has(o) // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">const</span> o = {p: <span class="hljs-string">&apos;Hello World&apos;</span>};

m.<span class="hljs-keyword">set</span>(o, <span class="hljs-string">&apos;content&apos;</span>)
m.<span class="hljs-keyword">get</span>(o) <span class="hljs-comment">// &quot;content&quot;</span>

m.has(o) <span class="hljs-comment">// true</span>
m.delete(o) <span class="hljs-comment">// true</span>
m.has(o) <span class="hljs-comment">// false</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4F7F;&#x7528; Map &#x7ED3;&#x6784;&#x7684;set&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;o&#x5F53;&#x4F5C;m&#x7684;&#x4E00;&#x4E2A;&#x952E;&#xFF0C;&#x7136;&#x540E;&#x53C8;&#x4F7F;&#x7528;get&#x65B9;&#x6CD5;&#x8BFB;&#x53D6;&#x8FD9;&#x4E2A;&#x952E;&#xFF0C;&#x63A5;&#x7740;&#x4F7F;&#x7528;delete&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x4E86;&#x8FD9;&#x4E2A;&#x952E;&#x3002;<br>&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5; &#xA7; &#x21E7;</p><h2 id="articleHeader7">&#x4E8C;&#x3001;Map &#x7ED3;&#x6784;&#x7684;&#x5B9E;&#x4F8B;&#x6709;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;&#x548C;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#xFF1A;</h2><p><strong>1.size &#x5C5E;&#x6027;</strong><br>size&#x5C5E;&#x6027;&#x8FD4;&#x56DE; Map &#x7ED3;&#x6784;&#x7684;&#x6210;&#x5458;&#x603B;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = new Map();
map.set(&apos;foo&apos;, true);
map.set(&apos;bar&apos;, false);
map.size // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> Map();
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">&apos;foo&apos;</span>, <span class="hljs-keyword">true</span>);
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">&apos;bar&apos;</span>, <span class="hljs-keyword">false</span>);
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">size</span> <span class="hljs-comment">// 2</span></code></pre><p><strong>2.set(key, value)</strong><br>set&#x65B9;&#x6CD5;&#x8BBE;&#x7F6E;&#x952E;&#x540D;key&#x5BF9;&#x5E94;&#x7684;&#x952E;&#x503C;&#x4E3A;value&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x6574;&#x4E2A; Map &#x7ED3;&#x6784;&#x3002;&#x5982;&#x679C;key&#x5DF2;&#x7ECF;&#x6709;&#x503C;&#xFF0C;&#x5219;&#x952E;&#x503C;&#x4F1A;&#x88AB;&#x66F4;&#x65B0;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x65B0;&#x751F;&#x6210;&#x8BE5;&#x952E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const m = new Map();
m.set(&apos;edition&apos;, 6)        // &#x952E;&#x662F;&#x5B57;&#x7B26;&#x4E32;
m.set(262, &apos;standard&apos;)     // &#x952E;&#x662F;&#x6570;&#x503C;
m.set(undefined, &apos;nah&apos;)    // &#x952E;&#x662F; undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
m.<span class="hljs-keyword">set</span>(<span class="hljs-string">&apos;edition&apos;</span>, <span class="hljs-number">6</span>)        <span class="hljs-comment">// &#x952E;&#x662F;&#x5B57;&#x7B26;&#x4E32;</span>
m.<span class="hljs-keyword">set</span>(<span class="hljs-number">262</span>, <span class="hljs-string">&apos;standard&apos;</span>)     <span class="hljs-comment">// &#x952E;&#x662F;&#x6570;&#x503C;</span>
m.<span class="hljs-keyword">set</span>(undefined, <span class="hljs-string">&apos;nah&apos;</span>)    <span class="hljs-comment">// &#x952E;&#x662F; undefined</span></code></pre><p>set&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x5F53;&#x524D;&#x7684;Map&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x94FE;&#x5F0F;&#x5199;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map()
  .set(1, &apos;a&apos;)
  .set(2, &apos;b&apos;)
  .set(3, &apos;c&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">map</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Map</span>()
  .<span class="hljs-built_in">set</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&apos;a&apos;</span>)
  .<span class="hljs-built_in">set</span>(<span class="hljs-number">2</span>, <span class="hljs-string">&apos;b&apos;</span>)
  .<span class="hljs-built_in">set</span>(<span class="hljs-number">3</span>, <span class="hljs-string">&apos;c&apos;</span>);</code></pre><p><strong>3.get(key)</strong><br>get&#x65B9;&#x6CD5;&#x8BFB;&#x53D6;key&#x5BF9;&#x5E94;&#x7684;&#x952E;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x627E;&#x4E0D;&#x5230;key&#xFF0C;&#x8FD4;&#x56DE;undefined&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const m = new Map();
const hello = function() {console.log(&apos;hello&apos;);};
m.set(hello, &apos;Hello ES6!&apos;) // &#x952E;&#x662F;&#x51FD;&#x6570;
m.get(hello)  // Hello ES6!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">const</span> hello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>);};
m.set(hello, <span class="hljs-string">&apos;Hello ES6!&apos;</span>) <span class="hljs-comment">// &#x952E;&#x662F;&#x51FD;&#x6570;</span>
m.get(hello)  <span class="hljs-comment">// Hello ES6!</span></code></pre><p><strong>4.has(key)</strong><br>has&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x67D0;&#x4E2A;&#x952E;&#x662F;&#x5426;&#x5728;&#x5F53;&#x524D; Map &#x5BF9;&#x8C61;&#x4E4B;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const m = new Map();
m.set(&apos;edition&apos;, 6);
m.set(262, &apos;standard&apos;);
m.set(undefined, &apos;nah&apos;);
m.has(&apos;edition&apos;)     // true
m.has(&apos;years&apos;)       // false
m.has(262)           // true
m.has(undefined)     // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
m.<span class="hljs-keyword">set</span>(<span class="hljs-string">&apos;edition&apos;</span>, <span class="hljs-number">6</span>);
m.<span class="hljs-keyword">set</span>(<span class="hljs-number">262</span>, <span class="hljs-string">&apos;standard&apos;</span>);
m.<span class="hljs-keyword">set</span>(undefined, <span class="hljs-string">&apos;nah&apos;</span>);
m.has(<span class="hljs-string">&apos;edition&apos;</span>)     <span class="hljs-comment">// true</span>
m.has(<span class="hljs-string">&apos;years&apos;</span>)       <span class="hljs-comment">// false</span>
m.has(<span class="hljs-number">262</span>)           <span class="hljs-comment">// true</span>
m.has(undefined)     <span class="hljs-comment">// true</span></code></pre><p><strong>5.delete(key)</strong><br>delete&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x67D0;&#x4E2A;&#x952E;&#xFF0C;&#x8FD4;&#x56DE;true&#x3002;&#x5982;&#x679C;&#x5220;&#x9664;&#x5931;&#x8D25;&#xFF0C;&#x8FD4;&#x56DE;false&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const m = new Map();
m.set(undefined, &apos;nah&apos;);
m.has(undefined)     // true
m.delete(undefined)
m.has(undefined)       // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
m.set(<span class="hljs-literal">undefined</span>, <span class="hljs-string">&apos;nah&apos;</span>);
m.has(<span class="hljs-literal">undefined</span>)     <span class="hljs-comment">// true</span>
m.delete(<span class="hljs-literal">undefined</span>)
m.has(<span class="hljs-literal">undefined</span>)       <span class="hljs-comment">// false</span></code></pre><p><strong>6.clear()</strong><br>clear&#x65B9;&#x6CD5;&#x6E05;&#x9664;&#x6240;&#x6709;&#x6210;&#x5458;&#xFF0C;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map();
map.set(&apos;foo&apos;, true);
map.set(&apos;bar&apos;, false);
map.size // 2
map.clear()
map.size // 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>let <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> Map();
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">&apos;foo&apos;</span>, <span class="hljs-keyword">true</span>);
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">&apos;bar&apos;</span>, <span class="hljs-keyword">false</span>);
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">size</span> <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">clear</span>()
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">size</span> <span class="hljs-comment">// 0</span></code></pre><h2 id="articleHeader8"><strong>&#x4E09;&#x3001;Map&#x904D;&#x5386;&#x65B9;&#x6CD5;</strong></h2><p>Map &#x7ED3;&#x6784;&#x539F;&#x751F;&#x63D0;&#x4F9B;&#x4E09;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x751F;&#x6210;&#x51FD;&#x6570;&#x548C;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#xFF1A;<br><strong>keys()&#xFF1A;</strong>&#x8FD4;&#x56DE;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x5668;&#x3002;<br><strong>values()&#xFF1A;</strong>&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x7684;&#x904D;&#x5386;&#x5668;&#x3002;<br><strong>entries()&#xFF1A;</strong>&#x8FD4;&#x56DE;&#x6240;&#x6709;&#x6210;&#x5458;&#x7684;&#x904D;&#x5386;&#x5668;&#x3002;<br><strong>forEach()&#xFF1A;</strong>&#x904D;&#x5386; Map &#x7684;&#x6240;&#x6709;&#x6210;&#x5458;&#x3002;<br>&#x9700;&#x8981;&#x7279;&#x522B;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;Map &#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;&#x5C31;&#x662F;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = new Map([
  [&apos;F&apos;, &apos;no&apos;],
  [&apos;T&apos;,  &apos;yes&apos;],
]);

for (let key of map.keys()) {
  console.log(key);
}
// &quot;F&quot;
// &quot;T&quot;

for (let value of map.values()) {
  console.log(value);
}
// &quot;no&quot;
// &quot;yes&quot;

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// &quot;F&quot; &quot;no&quot;
// &quot;T&quot; &quot;yes&quot;

// &#x6216;&#x8005;
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// &quot;F&quot; &quot;no&quot;
// &quot;T&quot; &quot;yes&quot;

// &#x7B49;&#x540C;&#x4E8E;&#x4F7F;&#x7528;map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// &quot;F&quot; &quot;no&quot;
// &quot;T&quot; &quot;yes&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>const <span class="hljs-keyword">map</span> = new Map([
  [<span class="hljs-string">&apos;F&apos;</span>, <span class="hljs-string">&apos;no&apos;</span>],
  [<span class="hljs-string">&apos;T&apos;</span>,  <span class="hljs-string">&apos;yes&apos;</span>],
]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.keys()) {
  console.log(key);
}
// <span class="hljs-string">&quot;F&quot;</span>
// <span class="hljs-string">&quot;T&quot;</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.values()) {
  console.log(value);
}
// <span class="hljs-string">&quot;no&quot;</span>
// <span class="hljs-string">&quot;yes&quot;</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-literal">item</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.entries()) {
  console.log(item[<span class="hljs-number">0</span>], item[<span class="hljs-number">1</span>]);
}
// <span class="hljs-string">&quot;F&quot;</span> <span class="hljs-string">&quot;no&quot;</span>
// <span class="hljs-string">&quot;T&quot;</span> <span class="hljs-string">&quot;yes&quot;</span>

// &#x6216;&#x8005;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, <span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.entries()) {
  console.log(key, value);
}
// <span class="hljs-string">&quot;F&quot;</span> <span class="hljs-string">&quot;no&quot;</span>
// <span class="hljs-string">&quot;T&quot;</span> <span class="hljs-string">&quot;yes&quot;</span>

// &#x7B49;&#x540C;&#x4E8E;&#x4F7F;&#x7528;<span class="hljs-keyword">map</span>.entries()
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, <span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>) {
  console.log(key, value);
}
// <span class="hljs-string">&quot;F&quot;</span> <span class="hljs-string">&quot;no&quot;</span>
// <span class="hljs-string">&quot;T&quot;</span> <span class="hljs-string">&quot;yes&quot;</span></code></pre><h2 id="articleHeader9">&#x56DB;&#x3001;<strong>WeakMap</strong></h2><p>WeakMap&#x7ED3;&#x6784;&#x4E0E;Map&#x7ED3;&#x6784;&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x662F;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x96C6;&#x5408;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// WeakMap &#x53EF;&#x4EE5;&#x4F7F;&#x7528; set &#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x6210;&#x5458;
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap &#x4E5F;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;
// &#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, &apos;foo&apos;], [k2, &apos;bar&apos;]]);
wm2.get(k2) // &quot;bar&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-comment">// WeakMap &#x53EF;&#x4EE5;&#x4F7F;&#x7528; set &#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x6210;&#x5458;</span>
<span class="hljs-keyword">const</span> wm1 = <span class="hljs-keyword">new</span> WeakMap();
<span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> = {foo: <span class="hljs-number">1</span>};
wm1.<span class="hljs-built_in">set</span>(<span class="hljs-built_in">key</span>, <span class="hljs-number">2</span>);
wm1.<span class="hljs-built_in">get</span>(<span class="hljs-built_in">key</span>) <span class="hljs-comment">// 2</span>

<span class="hljs-comment">// WeakMap &#x4E5F;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;</span>
<span class="hljs-comment">// &#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
<span class="hljs-keyword">const</span> k1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> k2 = [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];
<span class="hljs-keyword">const</span> wm2 = <span class="hljs-keyword">new</span> WeakMap([[k1, <span class="hljs-string">&apos;foo&apos;</span>], [k2, <span class="hljs-string">&apos;bar&apos;</span>]]);
wm2.<span class="hljs-built_in">get</span>(k2) <span class="hljs-comment">// &quot;bar&quot;</span></code></pre><p><strong>WeakMap&#x4E0E;Map&#x7684;&#x533A;&#x522B;&#x6709;&#x4E24;&#x70B9;&#xFF1A;</strong><br>&#x9996;&#x5148;&#xFF0C;WeakMap&#x53EA;&#x63A5;&#x53D7;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x952E;&#x540D;&#xFF08;null&#x9664;&#x5916;&#xFF09;&#xFF0C;&#x4E0D;&#x63A5;&#x53D7;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x4F5C;&#x4E3A;&#x952E;&#x540D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> WeakMap();
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
<span class="hljs-comment">// TypeError: 1 is not an object!</span>
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(Symbol(), <span class="hljs-number">2</span>)
<span class="hljs-comment">// TypeError: Invalid value used as weak map key</span>
<span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-keyword">null</span>, <span class="hljs-number">2</span>)
<span class="hljs-comment">// TypeError: Invalid value used as weak map key</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x5C06;&#x6570;&#x503C;1&#x548C;Symbol&#x503C;&#x4F5C;&#x4E3A; WeakMap &#x7684;&#x952E;&#x540D;&#xFF0C;&#x90FD;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x5176;&#x6B21;&#xFF0C;WeakMap&#x7684;&#x952E;&#x540D;&#x6240;&#x6307;&#x5411;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x8BA1;&#x5165;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x3002;<br>WeakMap&#x7684;&#x8BBE;&#x8BA1;&#x76EE;&#x7684;&#x5728;&#x4E8E;&#xFF0C;&#x6709;&#x65F6;&#x6211;&#x4EEC;&#x60F3;&#x5728;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#x9762;&#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4F1A;&#x5F62;&#x6210;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x3002;&#x8BF7;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const e1 = document.getElementById(&apos;foo&apos;);
const e2 = document.getElementById(&apos;bar&apos;);
const arr = [
  [e1, &apos;foo &#x5143;&#x7D20;&apos;],
  [e2, &apos;bar &#x5143;&#x7D20;&apos;],
];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> e1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;foo&apos;</span>);
<span class="hljs-keyword">const</span> e2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;bar&apos;</span>);
<span class="hljs-keyword">const</span> arr = [
  [e1, <span class="hljs-string">&apos;foo &#x5143;&#x7D20;&apos;</span>],
  [e2, <span class="hljs-string">&apos;bar &#x5143;&#x7D20;&apos;</span>],
];</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;e1&#x548C;e2&#x662F;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;arr&#x6570;&#x7EC4;&#x5BF9;&#x8FD9;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x6587;&#x5B57;&#x8BF4;&#x660E;&#x3002;&#x8FD9;&#x5C31;&#x5F62;&#x6210;&#x4E86;arr&#x5BF9;e1&#x548C;e2&#x7684;&#x5F15;&#x7528;&#x3002;&#x4E00;&#x65E6;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x8FD9;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5FC5;&#x987B;&#x624B;&#x52A8;&#x5220;&#x9664;&#x8FD9;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x5426;&#x5219;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x5C31;&#x4E0D;&#x4F1A;&#x91CA;&#x653E;e1&#x548C;e2&#x5360;&#x7528;&#x7684;&#x5185;&#x5B58;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x9700;&#x8981; e1 &#x548C; e2 &#x7684;&#x65F6;&#x5019;
// &#x5FC5;&#x987B;&#x624B;&#x52A8;&#x5220;&#x9664;&#x5F15;&#x7528;
arr [0] = null;
arr [1] = null;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x4E0D;&#x9700;&#x8981; e1 &#x548C; e2 &#x7684;&#x65F6;&#x5019;</span>
<span class="hljs-comment">// &#x5FC5;&#x987B;&#x624B;&#x52A8;&#x5220;&#x9664;&#x5F15;&#x7528;</span>
arr [<span class="hljs-number">0</span>] = <span class="hljs-literal">null</span>;
arr [<span class="hljs-number">1</span>] = <span class="hljs-literal">null</span>;
</code></pre><h2 id="articleHeader10">&#x4E94;&#x3001;Map&#x4E0E;&#x5176;&#x5B83;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x4E92;&#x76F8;&#x8F6C;&#x6362;</h2><p><strong>1.Map &#x8F6C;&#x4E3A;&#x6570;&#x7EC4;&#xFF1A;</strong><br>Map &#x8F6C;&#x4E3A;&#x6570;&#x7EC4;&#x6700;&#x65B9;&#x4FBF;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;...&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, [&apos;abc&apos;]);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ &apos;abc&apos; ] ] ]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>const myMap = <span class="hljs-literal">new</span> <span class="hljs-built_in">Map</span>()
  .<span class="hljs-built_in">set</span>(<span class="hljs-literal">true</span>, <span class="hljs-number">7</span>)
  .<span class="hljs-built_in">set</span>({foo: <span class="hljs-number">3</span>}, <span class="hljs-meta">[</span><span class="hljs-string">&apos;abc&apos;</span><span class="hljs-meta">]</span>);
<span class="hljs-meta">[</span><span class="hljs-params">...</span>myMap<span class="hljs-meta">]</span>
// <span class="hljs-meta">[</span> <span class="hljs-meta">[</span> <span class="hljs-literal">true</span>, <span class="hljs-number">7</span> <span class="hljs-meta">]</span>, <span class="hljs-meta">[</span> { foo: <span class="hljs-number">3</span> }, <span class="hljs-meta">[</span> <span class="hljs-string">&apos;abc&apos;</span> <span class="hljs-meta">]</span> ] ]
</code></pre><p><strong>2.&#x6570;&#x7EC4; &#x8F6C;&#x4E3A; Map&#xFF1A;</strong><br>&#x5C06;&#x6570;&#x7EC4;&#x4F20;&#x5165; Map &#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8F6C;&#x4E3A; Map&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Map([
  [true, 7],
  [{foo: 3}, [&apos;abc&apos;]]
])
// Map {
//   true =&gt; 7,
//   Object {foo: 3} =&gt; [&apos;abc&apos;]
// }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([
  [<span class="hljs-keyword">true</span>, <span class="hljs-number">7</span>],
  [{foo: <span class="hljs-number">3</span>}, [<span class="hljs-string">&apos;abc&apos;</span>]]
])
<span class="hljs-comment">// Map {</span>
<span class="hljs-comment">//   true =&gt; 7,</span>
<span class="hljs-comment">//   Object {foo: 3} =&gt; [&apos;abc&apos;]</span>
<span class="hljs-comment">// }</span>
</code></pre><p><strong>3.Map &#x8F6C;&#x4E3A;&#x5BF9;&#x8C61;&#xFF1A;</strong><br>&#x5982;&#x679C;&#x6240;&#x6709; Map &#x7684;&#x952E;&#x90FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x8F6C;&#x4E3A;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set(&apos;yes&apos;, true)
  .set(&apos;no&apos;, false);
strMapToObj(myMap)
// { yes: true, no: false }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strMapToObj</span>(<span class="hljs-params">strMap</span>) </span>{
  <span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [k,v] <span class="hljs-keyword">of</span> strMap) {
    obj[k] = v;
  }
  <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-keyword">const</span> myMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()
  .set(<span class="hljs-string">&apos;yes&apos;</span>, <span class="hljs-literal">true</span>)
  .set(<span class="hljs-string">&apos;no&apos;</span>, <span class="hljs-literal">false</span>);
strMapToObj(myMap)
<span class="hljs-comment">// { yes: true, no: false }</span>
</code></pre><p><strong>4.&#x5BF9;&#x8C61;&#x8F6C;&#x4E3A; Map&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {&quot;yes&quot; =&gt; true, &quot;no&quot; =&gt; false}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">objToStrMap</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">let</span> strMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  <span class="hljs-keyword">return</span> strMap;
}

objToStrMap({<span class="hljs-attr">yes</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">no</span>: <span class="hljs-literal">false</span>})
<span class="hljs-comment">// Map {&quot;yes&quot; =&gt; true, &quot;no&quot; =&gt; false}</span>
</code></pre><p><strong>5.Map &#x8F6C;&#x4E3A; JSON&#xFF1A;</strong><br>Map &#x8F6C;&#x4E3A; JSON &#x8981;&#x533A;&#x5206;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x3002;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x662F;&#xFF0C;Map &#x7684;&#x952E;&#x540D;&#x90FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x8F6C;&#x4E3A;&#x5BF9;&#x8C61; JSON&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set(&apos;yes&apos;, true).set(&apos;no&apos;, false);
strMapToJson(myMap)
// &apos;{&quot;yes&quot;:true,&quot;no&quot;:false}&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">strMapToJson</span>(strMap) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">JSON.stringify(strMapToObj(strMap))</span>;
}

let myMap = <span class="hljs-keyword">new</span> Map().set(<span class="hljs-symbol">&apos;yes</span>&apos;, <span class="hljs-literal">true</span>).set(<span class="hljs-symbol">&apos;no</span>&apos;, <span class="hljs-literal">false</span>);
strMapToJson(myMap)
// &apos;{<span class="hljs-string">&quot;yes&quot;</span>:<span class="hljs-literal">true</span>,<span class="hljs-string">&quot;no&quot;</span>:<span class="hljs-literal">false</span>}&apos;</code></pre><p>&#x53E6;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x662F;&#xFF0C;Map &#x7684;&#x952E;&#x540D;&#x6709;&#x975E;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x8F6C;&#x4E3A;&#x6570;&#x7EC4; JSON&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, [&apos;abc&apos;]);
mapToArrayJson(myMap)
// &apos;[[true,7],[{&quot;foo&quot;:3},[&quot;abc&quot;]]]&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">mapToArrayJson</span>(map) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">JSON.stringify([...map])</span>;
}

let myMap = <span class="hljs-keyword">new</span> Map().set(<span class="hljs-literal">true</span>, <span class="hljs-number">7</span>).set({foo: <span class="hljs-number">3</span>}, [<span class="hljs-symbol">&apos;abc</span>&apos;]);
mapToArrayJson(myMap)
// &apos;[[<span class="hljs-literal">true</span>,<span class="hljs-number">7</span>],[{<span class="hljs-string">&quot;foo&quot;</span>:<span class="hljs-number">3</span>},[<span class="hljs-string">&quot;abc&quot;</span>]]]&apos;
</code></pre><p><strong>6.JSON &#x8F6C;&#x4E3A; Map&#xFF1A;</strong><br>JSON &#x8F6C;&#x4E3A; Map&#xFF0C;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6240;&#x6709;&#x952E;&#x540D;&#x90FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap(&apos;{&quot;yes&quot;: true, &quot;no&quot;: false}&apos;)
// Map {&apos;yes&apos; =&gt; true, &apos;no&apos; =&gt; false}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">jsonToStrMap</span>(jsonStr) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">objToStrMap(JSON.parse(jsonStr))</span>;
}

jsonToStrMap(&apos;{<span class="hljs-string">&quot;yes&quot;</span>: <span class="hljs-literal">true</span>, <span class="hljs-string">&quot;no&quot;</span>: <span class="hljs-literal">false</span>}&apos;)
// Map {<span class="hljs-symbol">&apos;yes</span>&apos; =&gt; <span class="hljs-literal">true</span>, <span class="hljs-symbol">&apos;no</span>&apos; =&gt; <span class="hljs-literal">false</span>}</code></pre><p>&#x4F46;&#x662F;&#xFF0C;&#x6709;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF0C;&#x6574;&#x4E2A; JSON &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4E14;&#x6BCF;&#x4E2A;&#x6570;&#x7EC4;&#x6210;&#x5458;&#x672C;&#x8EAB;&#xFF0C;&#x53C8;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x4E24;&#x4E2A;&#x6210;&#x5458;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x8FD9;&#x65F6;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x5730;&#x8F6C;&#x4E3A; Map&#x3002;&#x8FD9;&#x5F80;&#x5F80;&#x662F;&#x6570;&#x7EC4;&#x8F6C;&#x4E3A; JSON &#x7684;&#x9006;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap(&apos;[[true,7],[{&quot;foo&quot;:3},[&quot;abc&quot;]]]&apos;)
// Map {true =&gt; 7, Object {foo: 3} =&gt; [&apos;abc&apos;]}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">jsonToMap</span>(jsonStr) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">new</span> Map(JSON.parse(jsonStr));
}

jsonToMap(&apos;[[<span class="hljs-literal">true</span>,<span class="hljs-number">7</span>],[{<span class="hljs-string">&quot;foo&quot;</span>:<span class="hljs-number">3</span>},[<span class="hljs-string">&quot;abc&quot;</span>]]]&apos;)
// Map {<span class="hljs-literal">true</span> =&gt; <span class="hljs-number">7</span>, Object {foo: <span class="hljs-number">3</span>} =&gt; [<span class="hljs-symbol">&apos;abc</span>&apos;]}

</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解：ES6中的Set和Map数据结构，Map与其它数据结构的互相转换

## 原文链接
[https://segmentfault.com/a/1190000016411261](https://segmentfault.com/a/1190000016411261)


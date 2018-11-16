---
title: 从零到有模拟实现一个Set类
hidden: true
categories: [reprint]
slug: 5ec856df
date: 2018-11-02 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><blockquote>es6&#x65B0;&#x589E;&#x4E86;Set&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5B83;&#x5141;&#x8BB8;&#x4F60;&#x5B58;&#x50A8;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;&#x7684;&#x552F;&#x4E00;&#x503C;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x539F;&#x59CB;&#x503C;&#x8FD8;&#x662F;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x3002;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5E0C;&#x671B;&#x901A;&#x8FC7;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Set&#x6765;&#x589E;&#x52A0;&#x5BF9;&#x5B83;&#x7684;&#x7406;&#x89E3;&#x3002;</blockquote><p><a href="https://github.com/qianlongo/blog/issues/34" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></p><h2 id="articleHeader1">&#x7528;&#x5728;&#x524D;&#x9762;</h2><blockquote>&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x548C;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4E5F;&#x7ECF;&#x5E38;&#x7528;Set&#x6765;&#x5BF9;&#x6570;&#x7EC4;&#x505A;&#x53BB;&#x91CD;&#x5904;&#x7406;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let unique = (array) =&gt; {
  return [ ...new Set(array) ]
}

console.log(unique([ 1, 2, 3, 4, 1, 2, 5 ])) // [1, 2, 3, 4, 5]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> unique = <span class="hljs-function">(<span class="hljs-params">array</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> [ ...new <span class="hljs-built_in">Set</span>(array) ]
}

<span class="hljs-built_in">console</span>.log(unique([ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span> ])) <span class="hljs-comment">// [1, 2, 3, 4, 5]</span>
</code></pre><h2 id="articleHeader2">&#x57FA;&#x672C;&#x8BED;&#x6CD5;</h2><blockquote><strong>&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;&#x57FA;&#x672C;&#x51FA;&#x81EA;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" rel="nofollow noreferrer" target="_blank">MDN</a>,&#x8FD9;&#x91CC;&#x5199;&#x51FA;&#x6765;&#xFF0C;&#x7EAF;&#x7CB9;&#x662F;&#x4E3A;&#x4E86;&#x4FBF;&#x4E8E;&#x540E;&#x9762;&#x7684;&#x6A21;&#x62DF;&#x64CD;&#x4F5C;&#x3002;&#x5982;&#x679C;&#x4F60;&#x5DF2;&#x7ECF;&#x5F88;&#x719F;&#x6089;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7565;&#x8FC7;&#x3002;</strong></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
new Set([ iterable ])
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([ iterable ])
</code></pre><p>&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x5C06;&#x88AB;&#x6DFB;&#x52A0;&#x5230;&#x65B0;&#x7684; Set&#x4E2D;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x6307;&#x5B9A;&#x6B64;&#x53C2;&#x6570;&#x6216;&#x5176;&#x503C;&#x4E3A;null&#xFF0C;&#x5219;&#x65B0;&#x7684; Set&#x4E3A;&#x7A7A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let s = new Set([ 1, 2, 3 ]) // Set(3)&#xA0;{1, 2, 3}
let s2 = new Set() // Set(0)&#xA0;{}
let s3 = new Set(null /* or undefined */) // Set(0)&#xA0;{}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ]) <span class="hljs-comment">// Set(3)&#xA0;{1, 2, 3}</span>
<span class="hljs-keyword">let</span> s2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>() <span class="hljs-comment">// Set(0)&#xA0;{}</span>
<span class="hljs-keyword">let</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-literal">null</span> <span class="hljs-comment">/* or undefined */</span>) <span class="hljs-comment">// Set(0)&#xA0;{}</span>
</code></pre><h2 id="articleHeader3">&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</h2><p><strong>&#x5C5E;&#x6027;</strong></p><p><code>constructor</code> Set&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</p><p><code>size</code> Set &#x957F;&#x5EA6;</p><p><strong>&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</strong></p><ol><li>Set.prototype.add(value)</li></ol><p>&#x5728;Set&#x5BF9;&#x8C61;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;&#x8FD4;&#x56DE;&#x8BE5;Set&#x5BF9;&#x8C61;&#x3002;</p><ol><li>Set.prototype.has(value)</li></ol><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x503C;&#x5728;Set&#x4E2D;&#x5B58;&#x5728;&#x4E0E;&#x5426;&#x3002;</p><ol><li>Set.prototype.delete(value)</li></ol><p>&#x79FB;&#x9664;Set&#x4E2D;&#x4E0E;&#x8FD9;&#x4E2A;&#x503C;&#x76F8;&#x7B49;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;Set.prototype.has(value)&#x5728;&#x8FD9;&#x4E2A;&#x64CD;&#x4F5C;&#x524D;&#x4F1A;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#xFF08;&#x5373;&#x5982;&#x679C;&#x8BE5;&#x5143;&#x7D20;&#x5B58;&#x5728;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#xFF09;</p><ol><li>Set.prototype.clear()</li></ol><p>&#x79FB;&#x9664;Set&#x5BF9;&#x8C61;&#x5185;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;</p><p><strong>&#x6817;&#x5B50;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let s = new Set()

s.add(1) // Set(1) {1}
  .add(2) // Set(2) {1, 2}
  .add(NaN) // Set(2) {1, 2, NaN}
  .add(NaN) // Set(2) {1, 2, NaN}

// &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x56E0;&#x4E3A;&#x6DFB;&#x52A0;&#x5B8C;&#x5143;&#x7D20;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x8BE5;Set&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;
// NaN === NaN &#x7ED3;&#x679C;&#x662F;false&#xFF0C;&#x4F46;&#x662F;Set&#x4E2D;&#x53EA;&#x4F1A;&#x5B58;&#x4E00;&#x4E2A;NaN

s.has(1) // true
s.has(NaN) // true

s.size // 3

s.delete(1)
s.has(1) // false
s.size // 2

s.clear()

s // Set(0)&#xA0;{}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()

s.add(<span class="hljs-number">1</span>) <span class="hljs-comment">// Set(1) {1}</span>
  .add(<span class="hljs-number">2</span>) <span class="hljs-comment">// Set(2) {1, 2}</span>
  .add(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// Set(2) {1, 2, NaN}</span>
  .add(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// Set(2) {1, 2, NaN}</span>

<span class="hljs-comment">// &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x56E0;&#x4E3A;&#x6DFB;&#x52A0;&#x5B8C;&#x5143;&#x7D20;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x8BE5;Set&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;</span>
<span class="hljs-comment">// NaN === NaN &#x7ED3;&#x679C;&#x662F;false&#xFF0C;&#x4F46;&#x662F;Set&#x4E2D;&#x53EA;&#x4F1A;&#x5B58;&#x4E00;&#x4E2A;NaN</span>

s.has(<span class="hljs-number">1</span>) <span class="hljs-comment">// true</span>
s.has(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true</span>

s.size <span class="hljs-comment">// 3</span>

s.delete(<span class="hljs-number">1</span>)
s.has(<span class="hljs-number">1</span>) <span class="hljs-comment">// false</span>
s.size <span class="hljs-comment">// 2</span>

s.clear()

s <span class="hljs-comment">// Set(0)&#xA0;{}</span>
</code></pre><p><strong>&#x904D;&#x5386;&#x65B9;&#x6CD5;</strong></p><ol><li>Set.prototype.keys()</li></ol><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;Set&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6309;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;</p><ol><li>Set.prototype.values()</li></ol><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;Set&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6309;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;</p><ol><li>Set.prototype.entries()</li></ol><p>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;Set&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6309;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x503C;&#x7684;[value, value]&#x6570;&#x7EC4;&#x3002;&#x4E3A;&#x4E86;&#x4F7F;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x548C;Map&#x5BF9;&#x8C61;&#x4FDD;&#x6301;&#x76F8;&#x4F3C;&#xFF0C; &#x6BCF;&#x4E2A;&#x503C;&#x7684;&#x952E;&#x548C;&#x503C;&#x76F8;&#x7B49;&#x3002;</p><ol><li>Set.prototype.forEach(callbackFn[, thisArg])</li></ol><p>&#x6309;&#x7167;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#xFF0C;&#x4E3A;Set&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x503C;&#x8C03;&#x7528;&#x4E00;&#x6B21;callBackFn&#x3002;&#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;thisArg&#x53C2;&#x6570;&#xFF0C;&#x56DE;&#x8C03;&#x4E2D;&#x7684;this&#x4F1A;&#x662F;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p><p><strong>&#x6817;&#x5B50;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let s = new Set([ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ])

s // SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}
s.keys() // SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}
s.values() // SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}
s.entries() // SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}

// log
[ ...s ] // [&quot;s&quot;, &quot;e&quot;, &quot;t&quot;]
[ ...s.keys() ] // &#xA0;[&quot;s&quot;, &quot;e&quot;, &quot;t&quot;]
[ ...s.values() ] // &#xA0;[&quot;s&quot;, &quot;e&quot;, &quot;t&quot;]
[ ...s.entries() ] // &#xA0;[[&quot;s&quot;, &quot;s&quot;], [&quot;e&quot;, &quot;e&quot;], [&quot;t&quot;, &quot;t&quot;]]

s.forEach(function (value, key, set) {
  console.log(value, key, set, this)
})

// s s Set(3)&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;} Window
// e e Set(3)&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;} Window
// t t Set(3)&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;} Window

s.forEach(function () {
  console.log(this)
}, { name: &apos;qianlongo&apos; })

// {name: &quot;qianlongo&quot;}
// {name: &quot;qianlongo&quot;}
// {name: &quot;qianlongo&quot;}

for (let value of s) {
  console.log(value)
}
// s
// e
// t

for (let value of s.entries()) {
  console.log(value)
}
// [&quot;s&quot;, &quot;s&quot;]
// [&quot;e&quot;, &quot;e&quot;]
// [&quot;t&quot;, &quot;t&quot;]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([ <span class="hljs-string">&apos;s&apos;</span>, <span class="hljs-string">&apos;e&apos;</span>, <span class="hljs-string">&apos;t&apos;</span> ])

s <span class="hljs-comment">// SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}</span>
s.keys() <span class="hljs-comment">// SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}</span>
s.values() <span class="hljs-comment">// SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}</span>
s.entries() <span class="hljs-comment">// SetIterator&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;}</span>

<span class="hljs-comment">// log</span>
[ ...s ] <span class="hljs-comment">// [&quot;s&quot;, &quot;e&quot;, &quot;t&quot;]</span>
[ ...s.keys() ] <span class="hljs-comment">// &#xA0;[&quot;s&quot;, &quot;e&quot;, &quot;t&quot;]</span>
[ ...s.values() ] <span class="hljs-comment">// &#xA0;[&quot;s&quot;, &quot;e&quot;, &quot;t&quot;]</span>
[ ...s.entries() ] <span class="hljs-comment">// &#xA0;[[&quot;s&quot;, &quot;s&quot;], [&quot;e&quot;, &quot;e&quot;], [&quot;t&quot;, &quot;t&quot;]]</span>

s.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, key, set</span>) </span>{
  <span class="hljs-built_in">console</span>.log(value, key, set, <span class="hljs-keyword">this</span>)
})

<span class="hljs-comment">// s s Set(3)&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;} Window</span>
<span class="hljs-comment">// e e Set(3)&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;} Window</span>
<span class="hljs-comment">// t t Set(3)&#xA0;{&quot;s&quot;, &quot;e&quot;, &quot;t&quot;} Window</span>

s.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
}, { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;qianlongo&apos;</span> })

<span class="hljs-comment">// {name: &quot;qianlongo&quot;}</span>
<span class="hljs-comment">// {name: &quot;qianlongo&quot;}</span>
<span class="hljs-comment">// {name: &quot;qianlongo&quot;}</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> s) {
  <span class="hljs-built_in">console</span>.log(value)
}
<span class="hljs-comment">// s</span>
<span class="hljs-comment">// e</span>
<span class="hljs-comment">// t</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> s.entries()) {
  <span class="hljs-built_in">console</span>.log(value)
}
<span class="hljs-comment">// [&quot;s&quot;, &quot;s&quot;]</span>
<span class="hljs-comment">// [&quot;e&quot;, &quot;e&quot;]</span>
<span class="hljs-comment">// [&quot;t&quot;, &quot;t&quot;]</span>
</code></pre><h2 id="articleHeader4">&#x6574;&#x4F53;&#x7ED3;&#x6784;</h2><blockquote>&#x4EE5;&#x4E0A;&#x56DE;&#x987E;&#x4E86;&#x4E00;&#x4E0B;Set&#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x5C1D;&#x8BD5;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x4E00;&#x628A;&#x5566;&#x3002;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;<a href="https://github.com/qianlongo/es6/blob/master/lib/set-map/set-polyfill/set.js" rel="nofollow noreferrer" target="_blank">&#x76F4;&#x63A5;&#x70B9;&#x51FB;</a>&#x67E5;&#x770B;&#x6E90;&#x7801;&#x3002;</blockquote><p><code>&#x76EE;&#x5F55;&#x7ED3;&#x6784;</code></p><p>&#x251C;&#x2500;&#x2500;set-polyfill<br>&#x2502; &#x251C;&#x2500;&#x2500;iterator.js // &#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;Iterator,&#x6A21;&#x62DF;&#x521B;&#x5EFA;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;<br>&#x2502; &#x251C;&#x2500;&#x2500;set.js // Set&#x7C7B;<br>&#x2502; &#x251C;&#x2500;&#x2500;utils.js // &#x8F85;&#x52A9;&#x51FD;&#x6570;<br>&#x2502; &#x251C;&#x2500;&#x2500;test.js // &#x6D4B;&#x8BD5;</p><p><code>Set&#x6574;&#x4F53;&#x6846;&#x67B6;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Set {

  constructor (iterable) {}

  get size () {}

  has () {}

  add () {}

  delete () {}  

  clear () {}

  forEach () {}

  keys () {}

  values () {}  

  entries () {}

  [ Symbol.iterator ] () {}
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Set</span> </span>{

  <span class="hljs-keyword">constructor</span> (iterable) {}

  get size () {}

  has () {}

  add () {}

  <span class="hljs-keyword">delete</span> () {}  

  clear () {}

  forEach () {}

  keys () {}

  values () {}  

  entries () {}

  [ <span class="hljs-built_in">Symbol</span>.iterator ] () {}
}

</code></pre><h2 id="articleHeader5">&#x8F85;&#x52A9;&#x65B9;&#x6CD5;</h2><blockquote>&#x5F00;&#x59CB;&#x5B9E;&#x73B0;Set&#x7EC6;&#x8282;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x4F1A;&#x7528;&#x5230;&#x7684;&#x4E00;&#x4E9B;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;</blockquote><ol><li><a href="https://github.com/vuejs/vuex/blob/b205e9fc54f2c53b3fcfa8ff46392524c4bfda12/src/util.js#L64" rel="nofollow noreferrer" target="_blank">assert</a>, &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x5B66;&#x4E60;vuex&#x6E90;&#x7801;&#x65F6;&#x5019;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x611F;&#x89C9;&#x86EE;&#x5B9E;&#x7528;&#x7684;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x5BF9;&#x67D0;&#x4E9B;&#x6761;&#x4EF6;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const assert = (condition, msg) =&gt; {
  if (!condition) throw new Error(msg)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> assert = <span class="hljs-function">(<span class="hljs-params">condition, msg</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!condition) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(msg)
}
</code></pre><ol><li>isDef, &#x8FC7;&#x6EE4;&#x6389;<code>null</code>&#x548C;<code>undefined</code></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const isDef = (value) =&gt; {
  return value != void 0
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> isDef = <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> value != <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>
}
</code></pre><ol><li>isIterable, &#x7B80;&#x5355;&#x5224;&#x65AD;value&#x662F;&#x5426;&#x662F;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;.</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const isIterable = (value) =&gt; {
  return isDef(value) &amp;&amp; typeof value[ Symbol.iterator ] === &apos;function&apos;
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> isIterable = <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> isDef(value) &amp;&amp; <span class="hljs-keyword">typeof</span> value[ <span class="hljs-built_in">Symbol</span>.iterator ] === <span class="hljs-string">&apos;function&apos;</span>
}

</code></pre><ol><li>forOf, &#x6A21;&#x62DF;<code>for of</code>&#x884C;&#x4E3A;, &#x5BF9;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x904D;&#x5386;&#x64CD;&#x4F5C;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const forOf = (iterable, callback, ctx) =&gt; {
  let result

  iterable = iterable[ Symbol.iterator ]()
  result = iterable.next()

  while (!result.done) {
    callback.call(ctx, result.value)
    result = iterable.next()
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> forOf = <span class="hljs-function">(<span class="hljs-params">iterable, callback, ctx</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> result

  iterable = iterable[ <span class="hljs-built_in">Symbol</span>.iterator ]()
  result = iterable.next()

  <span class="hljs-keyword">while</span> (!result.done) {
    callback.call(ctx, result.value)
    result = iterable.next()
  }
}
</code></pre><h2 id="articleHeader6">&#x6E90;&#x7801;&#x5B9E;&#x73B0;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Set {
  constructor (iterable) {
    // &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x6765;&#x5B58;&#x50A8;Set&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x5143;&#x7D20;
    this.value = []
    // &#x5224;&#x65AD;&#x662F;&#x5426;&#x4F7F;&#x7528;new&#x8C03;&#x7528;
    assert(this instanceof Set, &apos;Constructor Set requires &quot;new&quot;&apos;)
    // &#x8FC7;&#x6EE4;&#x6389;null&#x548C;undefined
    if (isDef(iterable)) {
      // &#x662F;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x624D;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B65;forOf&#x5143;&#x7D20;&#x6DFB;&#x52A0;
      assert(isIterable(iterable), `${iterable} is not iterable`)
      // &#x5FAA;&#x73AF;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x521D;&#x59CB;&#x5316;
      forOf(iterable, (value) =&gt; {
        this.add(value)
      })
    }
  }
  // &#x83B7;&#x53D6;s.size&#x65F6;&#x5019;&#x4F1A;&#x8C03;&#x7528; size&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;value&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get
  get size () {
    return this.value.length
  }
  // &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x7684;includes&#x65B9;&#x6CD5;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5305;&#x542B;value
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  // [ NaN ].includes(NaN)&#x4F1A;&#x8FD4;&#x56DE;true&#xFF0C;&#x6B63;&#x597D;Set&#x4E5F;&#x53EA;&#x80FD;&#x5B58;&#x4E00;&#x4E2A;NaN
  has (value) {
    return this.value.includes(value)
  }
  // &#x901A;&#x8FC7;has&#x65B9;&#x6CD5;&#x5224;&#x65AD;value&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x6DFB;&#x52A0;&#x8FDB;&#x6570;&#x7EC4;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;Set&#x672C;&#x8EAB;&#xFF0C;&#x652F;&#x6301;&#x94FE;&#x5F0F;&#x8C03;&#x7528;
  add (value) {
    if (!this.has(value)) {
      this.value.push(value)
    }

    return this
  }
  // &#x5728;&#x5220;&#x9664;&#x4E4B;&#x524D;&#x5148;&#x5224;&#x65AD;value&#x662F;&#x5426;&#x5B58;&#x5728;&#x7528;&#x4E4B;&#x5F53;&#x505A;&#x8FD4;&#x56DE;&#x503C;,&#x5B58;&#x5728;&#x5219;&#x901A;&#x8FC7;splice&#x65B9;&#x6CD5;&#x79FB;&#x9664;
  delete (value) {
    let result = this.has(value)

    if (result) {
      this.value.splice(this.value.indexOf(value), 1)
    }

    return result
  }
  // &#x91CD;&#x65B0;&#x8D4B;&#x503C;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;&#xFF0C;&#x5373;&#x5B9E;&#x73B0;clear&#x65B9;&#x6CD5;
  clear () {
    this.value = []
  }
  // &#x901A;&#x8FC7;forOf&#x904D;&#x5386; values&#x8FD4;&#x56DE;&#x7684;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x5B9E;&#x73B0;forEach
  forEach (callback, thisArg) {
    forOf(this.values(), (value) =&gt; {
      callback.call(thisArg, value, value, this)
    })
  }
  // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x503C;&#x662F;Set&#x4E2D;&#x7684;value
  keys () {
    return new Iterator(this.value)
  }
  // &#x540C;keys
  values () {
    return this.keys()
  }
  // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x540C;keys&#x548C;values&#x7684;&#x662F;&#x5176;&#x503C;&#x662F;[value, value]
  entries () {
    return new Iterator(this.value, (value) =&gt; [ value, value ])
  }
  // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;Set&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6309;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;
  [ Symbol.iterator ] () {
    return this.values()
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Set</span> </span>{
  <span class="hljs-keyword">constructor</span> (iterable) {
    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x6765;&#x5B58;&#x50A8;Set&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.value = []
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4F7F;&#x7528;new&#x8C03;&#x7528;</span>
    assert(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Set</span>, <span class="hljs-string">&apos;Constructor Set requires &quot;new&quot;&apos;</span>)
    <span class="hljs-comment">// &#x8FC7;&#x6EE4;&#x6389;null&#x548C;undefined</span>
    <span class="hljs-keyword">if</span> (isDef(iterable)) {
      <span class="hljs-comment">// &#x662F;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x624D;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B65;forOf&#x5143;&#x7D20;&#x6DFB;&#x52A0;</span>
      assert(isIterable(iterable), <span class="hljs-string">`<span class="hljs-subst">${iterable}</span> is not iterable`</span>)
      <span class="hljs-comment">// &#x5FAA;&#x73AF;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x521D;&#x59CB;&#x5316;</span>
      forOf(iterable, (value) =&gt; {
        <span class="hljs-keyword">this</span>.add(value)
      })
    }
  }
  <span class="hljs-comment">// &#x83B7;&#x53D6;s.size&#x65F6;&#x5019;&#x4F1A;&#x8C03;&#x7528; size&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;value&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;</span>
  <span class="hljs-comment">// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get</span>
  get size () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value.length
  }
  <span class="hljs-comment">// &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x7684;includes&#x65B9;&#x6CD5;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5305;&#x542B;value</span>
  <span class="hljs-comment">// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes</span>
  <span class="hljs-comment">// [ NaN ].includes(NaN)&#x4F1A;&#x8FD4;&#x56DE;true&#xFF0C;&#x6B63;&#x597D;Set&#x4E5F;&#x53EA;&#x80FD;&#x5B58;&#x4E00;&#x4E2A;NaN</span>
  has (value) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value.includes(value)
  }
  <span class="hljs-comment">// &#x901A;&#x8FC7;has&#x65B9;&#x6CD5;&#x5224;&#x65AD;value&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x6DFB;&#x52A0;&#x8FDB;&#x6570;&#x7EC4;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;Set&#x672C;&#x8EAB;&#xFF0C;&#x652F;&#x6301;&#x94FE;&#x5F0F;&#x8C03;&#x7528;</span>
  add (value) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.has(value)) {
      <span class="hljs-keyword">this</span>.value.push(value)
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
  <span class="hljs-comment">// &#x5728;&#x5220;&#x9664;&#x4E4B;&#x524D;&#x5148;&#x5224;&#x65AD;value&#x662F;&#x5426;&#x5B58;&#x5728;&#x7528;&#x4E4B;&#x5F53;&#x505A;&#x8FD4;&#x56DE;&#x503C;,&#x5B58;&#x5728;&#x5219;&#x901A;&#x8FC7;splice&#x65B9;&#x6CD5;&#x79FB;&#x9664;</span>
  <span class="hljs-keyword">delete</span> (value) {
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">this</span>.has(value)

    <span class="hljs-keyword">if</span> (result) {
      <span class="hljs-keyword">this</span>.value.splice(<span class="hljs-keyword">this</span>.value.indexOf(value), <span class="hljs-number">1</span>)
    }

    <span class="hljs-keyword">return</span> result
  }
  <span class="hljs-comment">// &#x91CD;&#x65B0;&#x8D4B;&#x503C;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;&#xFF0C;&#x5373;&#x5B9E;&#x73B0;clear&#x65B9;&#x6CD5;</span>
  clear () {
    <span class="hljs-keyword">this</span>.value = []
  }
  <span class="hljs-comment">// &#x901A;&#x8FC7;forOf&#x904D;&#x5386; values&#x8FD4;&#x56DE;&#x7684;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x5B9E;&#x73B0;forEach</span>
  forEach (callback, thisArg) {
    forOf(<span class="hljs-keyword">this</span>.values(), (value) =&gt; {
      callback.call(thisArg, value, value, <span class="hljs-keyword">this</span>)
    })
  }
  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x503C;&#x662F;Set&#x4E2D;&#x7684;value</span>
  keys () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Iterator(<span class="hljs-keyword">this</span>.value)
  }
  <span class="hljs-comment">// &#x540C;keys</span>
  values () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.keys()
  }
  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x540C;keys&#x548C;values&#x7684;&#x662F;&#x5176;&#x503C;&#x662F;[value, value]</span>
  entries () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Iterator(<span class="hljs-keyword">this</span>.value, (value) =&gt; [ value, value ])
  }
  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;Set&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6309;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;</span>
  [ <span class="hljs-built_in">Symbol</span>.iterator ] () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.values()
  }
}
</code></pre><p><strong>&#x6D4B;&#x8BD5;&#x4E00;&#x628A;</strong></p><p><code>&#x6267;&#x884C; node test.js</code></p><p><code>size&#x5C5E;&#x6027;&#x548C;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Set = require(&apos;./set&apos;)
const s = new Set()

s.add(1)
  .add(2)
  .add(NaN)
  .add(NaN)

console.log(s)  // Set { value: [ 1, 2, NaN ] }
console.log(s.has(1)) // true
console.log(s.has(NaN)) // true
console.log(s.size) // 3

s.delete(1)

console.log(s.has(1)) // false
console.log(s.size) // 2

s.clear()

console.log(s) // Set { value: [] }

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> <span class="hljs-built_in">Set</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./set&apos;</span>)
<span class="hljs-keyword">const</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()

s.add(<span class="hljs-number">1</span>)
  .add(<span class="hljs-number">2</span>)
  .add(<span class="hljs-literal">NaN</span>)
  .add(<span class="hljs-literal">NaN</span>)

<span class="hljs-built_in">console</span>.log(s)  <span class="hljs-comment">// Set { value: [ 1, 2, NaN ] }</span>
<span class="hljs-built_in">console</span>.log(s.has(<span class="hljs-number">1</span>)) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(s.has(<span class="hljs-literal">NaN</span>)) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(s.size) <span class="hljs-comment">// 3</span>

s.delete(<span class="hljs-number">1</span>)

<span class="hljs-built_in">console</span>.log(s.has(<span class="hljs-number">1</span>)) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(s.size) <span class="hljs-comment">// 2</span>

s.clear()

<span class="hljs-built_in">console</span>.log(s) <span class="hljs-comment">// Set { value: [] }</span>

</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x628A;Set&#x7684;size&#x5C5E;&#x6027;&#x548C;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x8FC7;&#x4E86;&#x4E00;&#x904D;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#x6765;&#x7684;Set&#x5B9E;&#x4F8B;&#x548C;&#x539F;&#x751F;&#x7684;&#x957F;&#x5F97;&#x4E0D;&#x592A;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x5148;&#x4E0D;&#x7BA1;&#x4E86;&#x3002;</p><p><code>&#x904D;&#x5386;&#x65B9;&#x6CD5;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let s2 = new Set([ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ])

console.log(s2) // Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] }
console.log(s2.keys()) // Iterator {}
console.log(s2.values()) //  Iterator {}
console.log(s2.entries()) //  Iterator {}

console.log([ ...s2 ]) // [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]
console.log([ ...s2.keys() ]) // [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]
console.log([ ...s2.values() ]) // [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]
console.log([ ...s2.entries() ]) // [ [ &apos;s&apos;, &apos;s&apos; ], [ &apos;e&apos;, &apos;e&apos; ], [ &apos;t&apos;, &apos;t&apos; ] ]

s2.forEach(function (value, key, set) {
  console.log(value, key, set, this)
})

// s s Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] } global
// e e Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] } global
// t t Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] } global

s2.forEach(function () {
  console.log(this)
}, { name: &apos;qianlongo&apos; })

// { name: &apos;qianlongo&apos; }
// { name: &apos;qianlongo&apos; }
// { name: &apos;qianlongo&apos; }

// {name: &quot;qianlongo&quot;}
// {name: &quot;qianlongo&quot;}
// {name: &quot;qianlongo&quot;}

for (let value of s) {
  console.log(value)
}
// s
// e
// t

for (let value of s.entries()) {
  console.log(value)
}
// [&quot;s&quot;, &quot;s&quot;]
// [&quot;e&quot;, &quot;e&quot;]
// [&quot;t&quot;, &quot;t&quot;]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> s2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([ <span class="hljs-string">&apos;s&apos;</span>, <span class="hljs-string">&apos;e&apos;</span>, <span class="hljs-string">&apos;t&apos;</span> ])

<span class="hljs-built_in">console</span>.log(s2) <span class="hljs-comment">// Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] }</span>
<span class="hljs-built_in">console</span>.log(s2.keys()) <span class="hljs-comment">// Iterator {}</span>
<span class="hljs-built_in">console</span>.log(s2.values()) <span class="hljs-comment">//  Iterator {}</span>
<span class="hljs-built_in">console</span>.log(s2.entries()) <span class="hljs-comment">//  Iterator {}</span>

<span class="hljs-built_in">console</span>.log([ ...s2 ]) <span class="hljs-comment">// [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]</span>
<span class="hljs-built_in">console</span>.log([ ...s2.keys() ]) <span class="hljs-comment">// [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]</span>
<span class="hljs-built_in">console</span>.log([ ...s2.values() ]) <span class="hljs-comment">// [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]</span>
<span class="hljs-built_in">console</span>.log([ ...s2.entries() ]) <span class="hljs-comment">// [ [ &apos;s&apos;, &apos;s&apos; ], [ &apos;e&apos;, &apos;e&apos; ], [ &apos;t&apos;, &apos;t&apos; ] ]</span>

s2.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, key, set</span>) </span>{
  <span class="hljs-built_in">console</span>.log(value, key, set, <span class="hljs-keyword">this</span>)
})

<span class="hljs-comment">// s s Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] } global</span>
<span class="hljs-comment">// e e Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] } global</span>
<span class="hljs-comment">// t t Set { value: [ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ] } global</span>

s2.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
}, { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;qianlongo&apos;</span> })

<span class="hljs-comment">// { name: &apos;qianlongo&apos; }</span>
<span class="hljs-comment">// { name: &apos;qianlongo&apos; }</span>
<span class="hljs-comment">// { name: &apos;qianlongo&apos; }</span>

<span class="hljs-comment">// {name: &quot;qianlongo&quot;}</span>
<span class="hljs-comment">// {name: &quot;qianlongo&quot;}</span>
<span class="hljs-comment">// {name: &quot;qianlongo&quot;}</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> s) {
  <span class="hljs-built_in">console</span>.log(value)
}
<span class="hljs-comment">// s</span>
<span class="hljs-comment">// e</span>
<span class="hljs-comment">// t</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> s.entries()) {
  <span class="hljs-built_in">console</span>.log(value)
}
<span class="hljs-comment">// [&quot;s&quot;, &quot;s&quot;]</span>
<span class="hljs-comment">// [&quot;e&quot;, &quot;e&quot;]</span>
<span class="hljs-comment">// [&quot;t&quot;, &quot;t&quot;]</span>
</code></pre><p>&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x770B;&#x8D77;&#x6765;&#x4E5F;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x548C;&#x524D;&#x9762;&#x4F8B;&#x5B50;&#x4E00;&#x6837;&#x7684;&#x6548;&#x679C;,&#x6E90;&#x7801;&#x5B9E;&#x73B0;&#x90E8;&#x5206;&#x57FA;&#x672C;&#x5C31;&#x5230;&#x8FD9;&#x91CC;&#x5566;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6CA1;&#x5B8C;...</p><ol><li>&#x4E3A;&#x4EC0;&#x4E48;<code>[ ...s2 ]</code>&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x6570;&#x7EC4;<code>[ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]</code>&#x5462;&#xFF1F;</li><li><code>s2</code> &#x4E3A;&#x4EC0;&#x4E48;&#x53EF;&#x4EE5;&#x88AB;<code>for of</code>&#x5FAA;&#x73AF;&#x5462;&#xFF1F;</li></ol><h2 id="articleHeader7">iterator(&#x8FED;&#x4EE3;&#x5668;)</h2><blockquote>&#x4ECE;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators" rel="nofollow noreferrer" target="_blank">MDN</a>&#x627E;&#x6765;&#x8FD9;&#x6BB5;&#x8BDD;&#xFF0C;&#x5728;JavaScript&#x4E2D;&#x8FED;&#x4EE3;&#x5668;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;next() &#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x6765;&#x8FD4;&#x56DE;&#x5E8F;&#x5217;&#x4E2D;&#x7684;&#x4E0B;&#x4E00;&#x9879;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;done(&#x8868;&#x793A;&#x904D;&#x5386;&#x662F;&#x5426;&#x7ED3;&#x675F;)&#x548C; value&#xFF08;&#x5F53;&#x524D;&#x7684;&#x503C;&#xFF09;&#x3002;</blockquote><p>&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#x4E00;&#x65E6;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x53CD;&#x590D;&#x8C03;&#x7528;next()&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function makeIterator(array){
  var nextIndex = 0

  return {
    next: function () {
      return nextIndex &lt; array.length ?
        { done: false, value: array[ nextIndex++ ] } :
        { done: true, value: undefined }
    }
  };
}

var it = makeIterator([&apos;yo&apos;, &apos;ya&apos;])

console.log(it.next()) // { done: false, value: &quot;yo&quot; }
console.log(it.next()) // { done: false, value: &quot;ya&quot; }
console.log(it.next()) // { done: true, value: undefined }

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeIterator</span>(<span class="hljs-params">array</span>)</span>{
  <span class="hljs-keyword">var</span> nextIndex = <span class="hljs-number">0</span>

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> nextIndex &lt; array.length ?
        { <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">value</span>: array[ nextIndex++ ] } :
        { <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span> }
    }
  };
}

<span class="hljs-keyword">var</span> it = makeIterator([<span class="hljs-string">&apos;yo&apos;</span>, <span class="hljs-string">&apos;ya&apos;</span>])

<span class="hljs-built_in">console</span>.log(it.next()) <span class="hljs-comment">// { done: false, value: &quot;yo&quot; }</span>
<span class="hljs-built_in">console</span>.log(it.next()) <span class="hljs-comment">// { done: false, value: &quot;ya&quot; }</span>
<span class="hljs-built_in">console</span>.log(it.next()) <span class="hljs-comment">// { done: true, value: undefined }</span>

</code></pre><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x8BB2;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x7684;<code>iterator.js</code>&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Iterator {
  constructor (arrayLike, iteratee = (value) =&gt; value) {
    this.value = Array.from(arrayLike)
    this.nextIndex = 0
    this.len = this.value.length
    this.iteratee = iteratee
  }

  next () {
    let done = this.nextIndex &gt;= this.len
    let value = done ? undefined : this.iteratee(this.value[ this.nextIndex++ ])

    return { done, value }
  }

  [ Symbol.iterator ] () {
    return this
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Iterator</span> </span>{
  <span class="hljs-keyword">constructor</span> (arrayLike, iteratee = (value) =&gt; value) {
    <span class="hljs-keyword">this</span>.value = <span class="hljs-built_in">Array</span>.from(arrayLike)
    <span class="hljs-keyword">this</span>.nextIndex = <span class="hljs-number">0</span>
    <span class="hljs-keyword">this</span>.len = <span class="hljs-keyword">this</span>.value.length
    <span class="hljs-keyword">this</span>.iteratee = iteratee
  }

  next () {
    <span class="hljs-keyword">let</span> done = <span class="hljs-keyword">this</span>.nextIndex &gt;= <span class="hljs-keyword">this</span>.len
    <span class="hljs-keyword">let</span> value = done ? <span class="hljs-literal">undefined</span> : <span class="hljs-keyword">this</span>.iteratee(<span class="hljs-keyword">this</span>.value[ <span class="hljs-keyword">this</span>.nextIndex++ ])

    <span class="hljs-keyword">return</span> { done, value }
  }

  [ <span class="hljs-built_in">Symbol</span>.iterator ] () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
}
</code></pre><p><code>Iterator</code>&#x7684;&#x5B9E;&#x4F8B;&#x6709;&#x4E00;&#x4E2A;next&#x65B9;&#x6CD5;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>done</code>&#x5C5E;&#x6027;&#x548C;<code>value</code>&#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x8BED;&#x610F;&#x548C;&#x524D;&#x9762;&#x7684;&#x89E3;&#x91CA;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let it = new Iterator([&apos;yo&apos;, &apos;ya&apos;])

console.log(it.next()) // { done: false, value: &quot;yo&quot; }
console.log(it.next()) // { done: false, value: &quot;ya&quot; }
console.log(it.next()) // { done: true, value: undefined }

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> it = <span class="hljs-keyword">new</span> Iterator([<span class="hljs-string">&apos;yo&apos;</span>, <span class="hljs-string">&apos;ya&apos;</span>])

<span class="hljs-built_in">console</span>.log(it.next()) <span class="hljs-comment">// { done: false, value: &quot;yo&quot; }</span>
<span class="hljs-built_in">console</span>.log(it.next()) <span class="hljs-comment">// { done: false, value: &quot;ya&quot; }</span>
<span class="hljs-built_in">console</span>.log(it.next()) <span class="hljs-comment">// { done: true, value: undefined }</span>

</code></pre><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#x4F60;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x4E86;&#xFF0C;Iterator&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x4E00;&#x5C31;&#x662F;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x3002;&#x90A3;&#x8FD9;&#x4E2A;&#x53C8;&#x548C;&#x4E0A;&#x9762;&#x7684;&#x95EE;&#x9898;1&#x548C;2&#x6709;&#x5565;&#x5173;&#x7CFB;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x770B;<code>for of</code></p><h2 id="articleHeader8">for of</h2><blockquote>&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x53EA;&#x8981;&#x90E8;&#x7F72;&#x4E86;Symbol.iterator&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x88AB;&#x89C6;&#x4E3A;&#x5177;&#x6709;iterator&#x63A5;&#x53E3;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7528;for...of&#x5FAA;&#x73AF;&#x904D;&#x5386;&#x5B83;&#x7684;&#x6210;&#x5458;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;for...of&#x5FAA;&#x73AF;&#x5185;&#x90E8;&#x8C03;&#x7528;&#x7684;&#x662F;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;Symbol.iterator&#x65B9;&#x6CD5; <a href="http://es6.ruanyifeng.com/?search=%E6%89%A9%E5%B1%95%E7%AC%A6&amp;x=0&amp;y=0#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF" rel="nofollow noreferrer" target="_blank">for...of &#x5FAA;&#x73AF;</a></blockquote><p>&#x9ED8;&#x8BA4;&#x53EA;&#x6709;&#xFF08;Array&#xFF0C;Map&#xFF0C;Set&#xFF0C;String&#xFF0C;TypedArray&#xFF0C;arguments&#xFF09;&#x53EF;&#x88AB;<code>for of</code>&#x8FED;&#x4EE3;&#x3002;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;<code>Set</code>&#x7C7B;&#x4E0D;&#x5728;&#x8FD9;&#x5176;&#x4E2D;&#xFF0C;&#x524D;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#x5374;&#x5728;<code>for of</code>&#x5FAA;&#x73AF;&#x4E2D;&#x6253;&#x5370;&#x51FA;&#x4E86;&#x60F3;&#x8981;&#x7684;&#x503C;&#x3002;&#x539F;&#x56E0;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7ED9;<code>Iterator</code>&#x7C7B;&#x90E8;&#x7F72;&#x4E86;<code>Symbol.iterator</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6267;&#x884C;&#x8BE5;&#x65B9;&#x6CD5;&#x4FBF;&#x8FD4;&#x56DE;<code>Iterator</code>&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#xFF0C;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x88AB;&#x8FED;&#x4EE3;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ Symbol.iterator ] () {
  return this
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">[ <span class="hljs-built_in">Symbol</span>.iterator ] () {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#x4E0A;&#x9762;&#x7684;&#x95EE;&#x9898;2&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x91CA;&#x901A;&#x4E86;&#x3002;</p><p>&#x518D;&#x770B;&#x770B;&#x95EE;&#x9898;1<code>&#x4E3A;&#x4EC0;&#x4E48;</code>[ ...s2 ]<code>&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x6570;&#x7EC4;</code>[ &apos;s&apos;, &apos;e&apos;, &apos;t&apos; ]<code>&#x5462;&#xFF1F;</code>,&#x539F;&#x56E0;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x7ED9;<code>Set</code>&#x3001;<code>keys</code>&#x3001;<code>values</code>&#x3001;<code>entries</code>&#x90E8;&#x7F72;&#x4E86;Symbol.iterator&#xFF0C;&#x4F7F;&#x4E4B;&#x5177;&#x6709;&#x201C;iterator&#x201D;&#x63A5;&#x53E3;,&#x800C;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;<code>...</code>&#x7684;&#x7279;&#x70B9;&#x4E4B;&#x4E00;&#x5C31;&#x662F;&#x4EFB;&#x4F55;&#x5177;&#x6709;Iterator&#x63A5;&#x53E3;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x7528;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x8F6C;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><h2 id="articleHeader9">&#x7ED3;&#x5C3E;</h2><blockquote>&#x6A21;&#x62DF;&#x8FC7;&#x7A0B;&#x4E2D;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x76F8;&#x5E94;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4E5F;&#x4E0D;&#x662F;&#x548C;&#x539F;&#x751F;&#x7684;&#x5B9E;&#x73B0;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#x3002;&#x4EC5;&#x5F53;&#x5B66;&#x4E60;&#x4E4B;&#x7528;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x62CD;&#x7816;&#x3002;</blockquote><p><a href="https://github.com/qianlongo/blog/issues/34" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></p><h2 id="articleHeader10">&#x53C2;&#x8003;</h2><ol><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" rel="nofollow noreferrer" target="_blank">Set</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators" rel="nofollow noreferrer" target="_blank">&#x8FED;&#x4EE3;&#x5668;&#x548C;&#x751F;&#x6210;&#x5668;</a></li><li><a href="https://github.com/mqyqingfeng/Blog/issues/91" rel="nofollow noreferrer" target="_blank">ES6 &#x7CFB;&#x5217;&#x4E4B;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Set &#x6570;&#x636E;&#x7ED3;&#x6784;</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax" rel="nofollow noreferrer" target="_blank">&#x5C55;&#x5F00;&#x8BED;&#x6CD5;</a></li><li><a href="http://es6.ruanyifeng.com/?search=%E6%89%A9%E5%B1%95%E7%AC%A6&amp;x=0&amp;y=0#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF" rel="nofollow noreferrer" target="_blank">for...of &#x5FAA;&#x73AF;</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零到有模拟实现一个Set类

## 原文链接
[https://segmentfault.com/a/1190000016406045](https://segmentfault.com/a/1190000016406045)


---
title: '别让undefined摧毁你的前端代码' 
date: 2018-11-29 2:30:09
hidden: true
slug: jmpda492i1k
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5B55;&#x80B2;</h2><p>undefined&#x662F;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x503C;&#xFF0C;&#x5B83;&#x4EE3;&#x8868;<strong>&#x6CA1;&#x6709;</strong>&#x3002;&#x55EF;&#xFF0C;&#x4E0D;&#x662F;&#x8BF4;&#x771F;&#x7684;&#x6CA1;&#x6709;&#xFF0C;&#x5B83;&#x5C31;&#x50CF;&#x5C0F;&#x5F3A;&#x4E00;&#x6837;&#x65E0;&#x6240;&#x4E0D;&#x5728;&#xFF0C;&#x4F46;&#x4F60;&#x53C8;&#x6293;&#x4E0D;&#x4F4F;&#x5B83;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;<strong>&#x6CA1;&#x6709;</strong>&#x3002;&#x3002;&#x3002;</p><h2 id="articleHeader1">&#x5351;&#x5FAE;&#x7684;&#x51FA;&#x751F;</h2><h5>&#x6570;&#x7EC4;&#x6EA2;&#x51FA;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3];

console.log(arr[4]); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

<span class="hljs-built_in">console</span>.log(arr[<span class="hljs-number">4</span>]); <span class="hljs-comment">// undefined</span></code></pre><hr><h5>&#x521D;&#x59CB;&#x53D8;&#x91CF;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a;

console.log(a); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a;

<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span></code></pre><hr><h5>&#x672A;&#x4F20;&#x5B9E;&#x53C2;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function callMe(name) {
  return name;
}

console.log(callMe()); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callMe</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> name;
}

<span class="hljs-built_in">console</span>.log(callMe()); <span class="hljs-comment">// undefined</span></code></pre><hr><h5>&#x65E0;&#x8FD4;&#x56DE;&#x503C;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function callMe(name) {
  // do nothing
}

console.log(callMe(&apos;&#x539F;&#x7F6A;&apos;)); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callMe</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// do nothing</span>
}

<span class="hljs-built_in">console</span>.log(callMe(<span class="hljs-string">&apos;&#x539F;&#x7F6A;&apos;</span>)); <span class="hljs-comment">// undefined</span></code></pre><hr><h5>&#x865A;&#x6784;&#x5C5E;&#x6027;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var def = {hello: &quot;world&quot;};

console.log(def.hi); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> def = {<span class="hljs-attr">hello</span>: <span class="hljs-string">&quot;world&quot;</span>};

<span class="hljs-built_in">console</span>.log(def.hi); <span class="hljs-comment">// undefined</span></code></pre><hr><h5>&#x5077;&#x6881;&#x6362;&#x67F1;</h5><p>&#x5806;&#x5185;&#x5B58;&#x548C;&#x6808;&#x5185;&#x5B58;&#x7684;&#x5343;&#x4E1D;&#x4E07;&#x7F15;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doYouLikeMe(You) {
  delete You.amPower;

  return &apos;no&apos;;
}

var I = {name: &quot;&#x539F;&#x7F6A;&quot;, amPower: &apos;yes&apos;};

console.log(I.amPower);        // &apos;yes&apos;
console.log(doYouLikeMe(I));   // &apos;no&apos;

console.log(I.amPower);        // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doYouLikeMe</span>(<span class="hljs-params">You</span>) </span>{
  <span class="hljs-keyword">delete</span> You.amPower;

  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;no&apos;</span>;
}

<span class="hljs-keyword">var</span> I = {<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;&#x539F;&#x7F6A;&quot;</span>, <span class="hljs-attr">amPower</span>: <span class="hljs-string">&apos;yes&apos;</span>};

<span class="hljs-built_in">console</span>.log(I.amPower);        <span class="hljs-comment">// &apos;yes&apos;</span>
<span class="hljs-built_in">console</span>.log(doYouLikeMe(I));   <span class="hljs-comment">// &apos;no&apos;</span>

<span class="hljs-built_in">console</span>.log(I.amPower);        <span class="hljs-comment">// undefined</span></code></pre><hr><h5>&#x5077;&#x4E0A;&#x763E;&#x4E86;</h5><p>&#x4E9A;&#x5F53;&#x548C;&#x590F;&#x5A03;&#x5077;&#x5403;&#x7981;&#x679C;&#xFF0C;&#x72AF;&#x4E86;<a href="https://baike.baidu.com/item/%E5%8E%9F%E7%BD%AA" rel="nofollow noreferrer" target="_blank">&#x539F;&#x7F6A;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function whatAboutAdam(eve) {
  eve.pop();

  return &apos;&#x65E0;&#x7F6A;&#x91CA;&#x653E;&apos;;
}

var eve = [&apos;&#x590F;&apos;, &apos;&#x5A03;&apos;, &apos;&#x7684;&apos;, &apos;&#x539F;&apos;, &apos;&#x7F6A;&apos;];

console.log(eve[4]);               // &apos;&#x7F6A;&apos;
console.log(whatAboutAdam(eve));   // &apos;&#x65E0;&#x7F6A;&#x91CA;&#x653E;&apos;

console.log(eve[4]);               // undefined
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">whatAboutAdam</span>(<span class="hljs-params">eve</span>) </span>{
  eve.pop();

  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x65E0;&#x7F6A;&#x91CA;&#x653E;&apos;</span>;
}

<span class="hljs-keyword">var</span> eve = [<span class="hljs-string">&apos;&#x590F;&apos;</span>, <span class="hljs-string">&apos;&#x5A03;&apos;</span>, <span class="hljs-string">&apos;&#x7684;&apos;</span>, <span class="hljs-string">&apos;&#x539F;&apos;</span>, <span class="hljs-string">&apos;&#x7F6A;&apos;</span>];

<span class="hljs-built_in">console</span>.log(eve[<span class="hljs-number">4</span>]);               <span class="hljs-comment">// &apos;&#x7F6A;&apos;</span>
<span class="hljs-built_in">console</span>.log(whatAboutAdam(eve));   <span class="hljs-comment">// &apos;&#x65E0;&#x7F6A;&#x91CA;&#x653E;&apos;</span>

<span class="hljs-built_in">console</span>.log(eve[<span class="hljs-number">4</span>]);               <span class="hljs-comment">// undefined</span>
</code></pre><hr><h5>&#x7C7B;&#x578B;&#x63A8;&#x65AD;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a;

console.log(typeof a);              // &quot;undefined&quot;
console.log(typeof undefined);      // &quot;undefined&quot;
console.log(typeof notDefinedKey);  // &quot;undefined&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a;

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> a);              <span class="hljs-comment">// &quot;undefined&quot;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span>);      <span class="hljs-comment">// &quot;undefined&quot;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> notDefinedKey);  <span class="hljs-comment">// &quot;undefined&quot;</span></code></pre><h2 id="articleHeader2">&#x6B8B;&#x9177;&#x7684;&#x7ADE;&#x4E89;</h2><p>&#x961F;&#x53CB;&#xFF0C;&#x53EF;&#x4EE5;&#x7528; <code>===</code> &#x5BF9;&#x6BD4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// void&#x540E;&#x9762;&#x52A0;&#x4E0A;&#x4EFB;&#x4F55;&#x503C;&#x90FD;&#x4F1A; &#x5168;&#x7B49;&#x4E8E; undefined

void 0 === undefined       // true
void 1 === undefined       // true
void &apos;&#x539F;&#x7F6A;&apos; === undefined   // true
void true === undefined    // true
void {} === undefined      // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// void&#x540E;&#x9762;&#x52A0;&#x4E0A;&#x4EFB;&#x4F55;&#x503C;&#x90FD;&#x4F1A; &#x5168;&#x7B49;&#x4E8E; undefined</span>

<span class="hljs-keyword">void</span> <span class="hljs-number">0</span> === <span class="hljs-literal">undefined</span>       <span class="hljs-comment">// true</span>
<span class="hljs-keyword">void</span> <span class="hljs-number">1</span> === <span class="hljs-literal">undefined</span>       <span class="hljs-comment">// true</span>
<span class="hljs-keyword">void</span> <span class="hljs-string">&apos;&#x539F;&#x7F6A;&apos;</span> === <span class="hljs-literal">undefined</span>   <span class="hljs-comment">// true</span>
<span class="hljs-keyword">void</span> <span class="hljs-literal">true</span> === <span class="hljs-literal">undefined</span>    <span class="hljs-comment">// true</span>
<span class="hljs-keyword">void</span> {} === <span class="hljs-literal">undefined</span>      <span class="hljs-comment">// true</span></code></pre><p>&#x654C;&#x4EBA;&#xFF0C;&#x53EF;&#x4EE5;&#x7528; <code>==</code> &#x5BF9;&#x6BD4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null ==  undefined // true

null === undefined // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">null</span> ==  <span class="hljs-literal">undefined</span> <span class="hljs-comment">// true</span>

<span class="hljs-literal">null</span> === <span class="hljs-literal">undefined</span> <span class="hljs-comment">// false</span></code></pre><p>&#x654C;&#x4EBA;&#x7684;&#x654C;&#x4EBA;&#xFF0C;&#x9700;&#x8981;<code>&#x53D6;&#x53CD;</code>&#x5BF9;&#x6BD4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
!false === !undefined // true
!&quot;&quot; === !undefined // true
!0 === !undefined // true

false == undefined // false
&quot;&quot; == undefined // false
0 == undefined // false
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">
!<span class="hljs-literal">false</span> === !<span class="hljs-literal">undefined</span> <span class="hljs-comment">// true</span>
!<span class="hljs-string">&quot;&quot;</span> === !<span class="hljs-literal">undefined</span> <span class="hljs-comment">// true</span>
!<span class="hljs-number">0</span> === !<span class="hljs-literal">undefined</span> <span class="hljs-comment">// true</span>

<span class="hljs-literal">false</span> == <span class="hljs-literal">undefined</span> <span class="hljs-comment">// false</span>
<span class="hljs-string">&quot;&quot;</span> == <span class="hljs-literal">undefined</span> <span class="hljs-comment">// false</span>
<span class="hljs-number">0</span> == <span class="hljs-literal">undefined</span> <span class="hljs-comment">// false</span>
</code></pre><h2 id="articleHeader3">&#x514B;&#x9686;&#x8005;&#x5165;&#x4FB5;</h2><p>undefined&#x4E0D;&#x662F;&#x4FDD;&#x7559;&#x5B57;&#xFF0C;es5&#x4E4B;&#x540E;&#xFF0C;&#x5168;&#x5C40;undefined&#x65E0;&#x6CD5;&#x88AB;&#x8986;&#x76D6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined = 2;

console.log(undefined); // undefined
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">undefined</span> = <span class="hljs-number">2</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// undefined</span>
</code></pre><p>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x8986;&#x76D6;&#x5168;&#x5C40;undefined&#x5C06;&#x76F4;&#x63A5;&#x629B;&#x9519;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
undefined = 2;

console.log(undefined); // throw new TypeError();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&quot;use strict&quot;</span>;
<span class="hljs-literal">undefined</span> = <span class="hljs-number">2</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// throw new TypeError();</span>
</code></pre><p>&#x4F46;&#x5C40;&#x90E8;undefined&#x8FD8;&#x53EF;&#x4EE5;&#x88AB;&#x8986;&#x76D6;&#xFF08;&#x5305;&#x62EC;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var undefined = 2;

console.log(undefined); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> <span class="hljs-literal">undefined</span> = <span class="hljs-number">2</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// 2</span></code></pre><h2 id="articleHeader4">&#x706D;&#x9738;&#x54CD;&#x6307;</h2><ul><li>&#x8986;&#x76D6;undefined&#x7684;&#x503C;&#x662F;&#x5371;&#x9669;&#x52A8;&#x4F5C;&#xFF0C;&#x8BF7;&#x52FF;&#x6A21;&#x4EFF;&#x3002;</li><li>&#x53EF;&#x4EE5;&#x7528; void 0 &#x4EE3;&#x66FF; undefined&#xFF0C;&#x538B;&#x7F29;&#x63D2;&#x4EF6;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x505A;&#x7684;</li><li>&#x6709;&#x6761;&#x4EF6;&#x7684;&#x770B;&#x5B98;&#x8BF7;&#x7528;typescript&#xFF0C;&#x7ED9;&#x6BCF;&#x4E2A;undefined&#x90FD;&#x53D1;&#x901A;&#x884C;&#x8BC1;</li><li>&#x5199;js&#x5C3D;&#x91CF;&#x7528; <code>===</code>&#xFF0C;&#x4E24;&#x4E2A;&#x7B49;&#x4E8E;&#x53F7;&#x7684;&#x5C31;&#x5FD8;&#x4E86;&#x5B83;&#x5427;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
别让undefined摧毁你的前端代码

## 原文链接
[https://segmentfault.com/a/1190000015232522](https://segmentfault.com/a/1190000015232522)


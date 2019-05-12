---
title: '「JavaScript」带你彻底搞清楚深拷贝、浅拷贝和循环引用' 
date: 2018-11-29 9:33:05
hidden: true
slug: kxb5q3bt5t
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">&#x4E00;&#x3001;&#x4E3A;&#x4EC0;&#x4E48;&#x6709;&#x6DF1;&#x62F7;&#x8D1D;&#x548C;&#x6D45;&#x62F7;&#x8D1D;&#xFF1F;</h3>
<p>&#xA0;&#xA0;&#xA0;&#xA0; &#x8FD9;&#x4E2A;&#x8981;&#x4ECE;js&#x4E2D;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x8BF4;&#x8D77;&#xFF0C;js&#x4E2D;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5206;&#x4E3A;<strong>&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;</strong>&#x548C;<strong>&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;</strong>&#x3002;</p>
<p>&#xA0;&#xA0;&#xA0;&#xA0;<code>&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;</code>&#x6307;&#x7684;&#x662F;&#x90A3;&#x4E9B;&#x4FDD;&#x5B58;&#x5728;<strong>&#x6808;</strong>&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x7B80;&#x5355;&#x6570;&#x636E;&#x6BB5;&#xFF0C;&#x5373;&#x8FD9;&#x79CD;&#x503C;&#x662F;&#x5B8C;&#x5168;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x3002;&#x5305;&#x542B;<code>Number</code>&#xFF0C;<code>String</code>&#xFF0C;<code>Boolean</code>&#xFF0C;<code>Null</code>&#xFF0C;<code>Undefined</code> &#xFF0C;<code>Symbol</code>&#x3002;</p>
<p>&#xA0;&#xA0;&#xA0;&#xA0;<code>&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;</code>&#x6307;&#x7684;&#x662F;&#x90A3;&#x4E9B;&#x4FDD;&#x5B58;&#x5728;<strong>&#x5806;</strong>&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x4FDD;&#x5B58;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x6307;&#x9488;&#xFF0C;&#x8FD9;&#x4E2A;&#x6307;&#x9488;&#x6307;&#x5411;&#x5B58;&#x50A8;&#x5728;<strong>&#x5806;</strong>&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x9664;&#x4E86;&#x4E0A;&#x9762;&#x7684; 6 &#x79CD;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5916;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x4E86;&#xFF0C;&#x7EDF;&#x79F0;&#x4E3A; <code>Object</code> &#x7C7B;&#x578B;&#x3002;&#x7EC6;&#x5206;&#x7684;&#x8BDD;&#xFF0C;&#x6709;&#xFF1A;<code>Object</code> &#x7C7B;&#x578B;&#x3001;<code>Array</code> &#x7C7B;&#x578B;&#x3001;<code>Date</code> &#x7C7B;&#x578B;&#x3001;<code>RegExp</code> &#x7C7B;&#x578B;&#x3001;<code>Function</code> &#x7C7B;&#x578B; &#x7B49;&#x3002;</p>
<p>&#xA0;&#xA0;&#xA0;&#xA0;&#x6B63;&#x56E0;&#x4E3A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x8FD9;&#x79CD;&#x673A;&#x5236;&#xFF0C; &#x5F53;&#x6211;&#x4EEC;&#x4ECE;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x5411;&#x53E6;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x590D;&#x5236;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x65F6;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5C06;&#x8FD9;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5728;<strong>&#x6808;</strong>&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x5F15;&#x7528;&#x5730;&#x5740;&#x590D;&#x5236;&#x4E86;&#x4E00;&#x4EFD;&#x7ED9;&#x65B0;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;<strong>&#x6307;&#x9488;</strong>&#x3002;&#x56E0;&#x6B64;&#x5F53;&#x64CD;&#x4F5C;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#x5B9E;&#x9645;&#x4E0A;&#x6307;&#x5411;&#x7684;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5728;<strong>&#x5806;</strong>&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x6539;&#x53D8;&#x5176;&#x4E2D;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x6539;&#x53D8;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVOPUr?w=500&amp;h=500" src="https://static.alili.tech/img/bVOPUr?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xA0;&#xA0;&#xA0;&#xA0;&#x56E0;&#x6B64;&#x6DF1;&#x62F7;&#x8D1D;&#x548C;&#x6D45;&#x62F7;&#x8D1D;&#x53EA;&#x53D1;&#x751F;&#x5728;<strong>&#x5F15;&#x7528;&#x7C7B;&#x578B;</strong>&#x4E2D;&#x3002;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x4ED6;&#x4EEC;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF1A;</p>
<h4>1. &#x5C42;&#x6B21;</h4>
<ul>
<li>
<strong>&#x6D45;&#x62F7;&#x8D1D;</strong>  &#x53EA;&#x4F1A;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5404;&#x4E2A;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x4F9D;&#x6B21;&#x590D;&#x5236;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x8FDB;&#x884C;&#x9012;&#x5F52;&#x590D;&#x5236;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53EA;&#x4F1A;&#x8D4B;&#x503C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7684;&#x7B2C;&#x4E00;&#x5C42;&#x5C5E;&#x6027;&#x3002;</li>
<li>
<strong>&#x6DF1;&#x62F7;&#x8D1D;</strong>&#x4E0D;&#x540C;&#x4E8E;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x5B83;&#x4E0D;&#x53EA;&#x62F7;&#x8D1D;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7684;&#x7B2C;&#x4E00;&#x5C42;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x662F;<code>&#x9012;&#x5F52;</code>&#x62F7;&#x8D1D;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x3002;</li>
</ul>
<h4>2. &#x662F;&#x5426;&#x5F00;&#x8F9F;&#x65B0;&#x7684;&#x6808;</h4>
<ul>
<li>
<strong>&#x6D45;&#x62F7;&#x8D1D;</strong>  &#x5BF9;&#x4E8E;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7B2C;&#x4E00;&#x5C42;&#x4E3A;<code>&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;</code>&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5C31;&#x662F;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#xFF0C;&#x5373;&#x300C;&#x4F20;&#x503C;&#x300D;&#xFF1B;&#x800C;&#x5BF9;&#x4E8E;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7B2C;&#x4E00;&#x5C42;&#x4E3A;<code>&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;</code>&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5C31;&#x662F;&#x76F4;&#x63A5;&#x8D4B;&#x5B58;&#x4E8E;&#x6808;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x5806;&#x5185;&#x5B58;&#x5730;&#x5740;,&#x5373;&#x300C;&#x4F20;&#x5740;&#x300D;,&#x5E76;<code>&#x6CA1;&#x6709;&#x5F00;&#x8F9F;&#x65B0;&#x7684;&#x6808;</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x590D;&#x5236;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5730;&#x5740;&#xFF0C;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;</li>
<li>
<strong>&#x6DF1;&#x62F7;&#x8D1D;</strong>  &#x800C;&#x6DF1;&#x590D;&#x5236;&#x5219;&#x662F;<code>&#x5F00;&#x8F9F;&#x65B0;&#x7684;&#x6808;</code>&#xFF0C;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5BF9;&#x5E94;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x4FEE;&#x6539;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x3002;</li>
</ul>
<h3 id="articleHeader1">&#x4E8C;&#x3001;&#x6D45;&#x62F7;&#x8D1D;</h3>
<p>&#x4EE5;&#x4E0B;&#x662F;&#x5B9E;&#x73B0;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x51E0;&#x79CD;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#xFF1A;</p>
<h4>1.<strong>Array.concat()</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   const arr = [1,2,3,4,[5,6]];
   const copy = arr.concat(); \\ &#x5229;&#x7528;concat()&#x521B;&#x5EFA;arr&#x7684;&#x526F;&#x672C;
   
   \\&#x6539;&#x53D8;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;,&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;
   copy[0] = 2; 
   arr; //[1,2,3,4,[5,6]];

   \\&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;&#xFF0C;&#x539F;&#x6570;&#x7EC4;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x6539;&#x53D8;
   copy[4][1] = 7;
   arr; //[1,2,3,4,[5,7]];
   " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">   <span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]];
   <span class="hljs-keyword">const</span> copy = arr.concat(); \\ &#x5229;&#x7528;concat()&#x521B;&#x5EFA;arr&#x7684;&#x526F;&#x672C;
   
   \\&#x6539;&#x53D8;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;,&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;
   copy[<span class="hljs-number">0</span>] = <span class="hljs-number">2</span>; 
   arr; <span class="hljs-comment">//[1,2,3,4,[5,6]];</span>

   \\&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;&#xFF0C;&#x539F;&#x6570;&#x7EC4;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x6539;&#x53D8;
   copy[<span class="hljs-number">4</span>][<span class="hljs-number">1</span>] = <span class="hljs-number">7</span>;
   arr; <span class="hljs-comment">//[1,2,3,4,[5,7]];</span>
   </code></pre>
<p>&#x80FD;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x6548;&#x679C;&#x7684;&#x8FD8;&#x6709;slice()&#x548C;Array.from()&#x7B49;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5C1D;&#x8BD5;&#x4E00;&#x4E0B;&#xFF5E;</p>
<h4>2.<strong>Object.assign()</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {x: 1, y: 2};
const obj2 = Object.assign({}, obj1);

obj2.x = 2; \\&#x4FEE;&#x6539;obj2.x,&#x6539;&#x53D8;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;
console.log(obj1) //{x: 1, y: 2} //&#x539F;&#x5BF9;&#x8C61;&#x672A;&#x6539;&#x53D8;
console.log(obj2) //{x: 2, y: 2}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj1 = {<span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">2</span>};
<span class="hljs-keyword">const</span> obj2 = <span class="hljs-built_in">Object</span>.assign({}, obj1);

obj2.x = <span class="hljs-number">2</span>; \\&#x4FEE;&#x6539;obj2.x,&#x6539;&#x53D8;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;
<span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">//{x: 1, y: 2} //&#x539F;&#x5BF9;&#x8C61;&#x672A;&#x6539;&#x53D8;</span>
<span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">//{x: 2, y: 2}</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {
    x: 1, 
    y: {
        m: 1
    }
};
const obj2 = Object.assign({}, obj1);

obj2.y.m = 2; \\&#x4FEE;&#x6539;obj2.y.m,&#x6539;&#x53D8;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;
console.log(obj1) //{x: 1, y: {m: 2"}}" &#x539F;&#x5BF9;&#x8C61;&#x4E5F;&#x88AB;&#x6539;&#x53D8;
console.log(obj2) //{x: 2, y: {m: 2"}}"
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj1 = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-attr">y</span>: {
        <span class="hljs-attr">m</span>: <span class="hljs-number">1</span>
    }
};
<span class="hljs-keyword">const</span> obj2 = <span class="hljs-built_in">Object</span>.assign({}, obj1);

obj2.y.m = <span class="hljs-number">2</span>; \\&#x4FEE;&#x6539;obj2.y.m,&#x6539;&#x53D8;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;
<span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">//{x: 1, y: {m: 2"}}" &#x539F;&#x5BF9;&#x8C61;&#x4E5F;&#x88AB;&#x6539;&#x53D8;</span>
<span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">//{x: 2, y: {m: 2"}}"</span>
</code></pre>
<h3 id="articleHeader2">&#x4E09;&#x3001;&#x6DF1;&#x62F7;&#x8D1D;</h3>
<h4>1.JSON.parse()&#x548C;JSON.stringify()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {
    x: 1, 
    y: {
        m: 1
    }
};
const obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1) //{x: 1, y: {m: 1"}}"
console.log(obj2) //{x: 1, y: {m: 1"}}"

obj2.y.m = 2; //&#x4FEE;&#x6539;obj2.y.m
console.log(obj1) //{x: 1, y: {m: 1"}}" &#x539F;&#x5BF9;&#x8C61;&#x672A;&#x6539;&#x53D8;
console.log(obj2) //{x: 2, y: {m: 2"}}"" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj1 = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-attr">y</span>: {
        <span class="hljs-attr">m</span>: <span class="hljs-number">1</span>
    }
};
<span class="hljs-keyword">const</span> obj2 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj1));
<span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">//{x: 1, y: {m: 1"}}"</span>
<span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">//{x: 1, y: {m: 1"}}"</span>

obj2.y.m = <span class="hljs-number">2</span>; <span class="hljs-comment">//&#x4FEE;&#x6539;obj2.y.m</span>
<span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">//{x: 1, y: {m: 1"}}" &#x539F;&#x5BF9;&#x8C61;&#x672A;&#x6539;&#x53D8;</span>
<span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">//{x: 2, y: {m: 2"}}"</span></code></pre>
<p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#x8F83;&#x4E3A;&#x7B80;&#x5355;&#xFF0C;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x57FA;&#x672C;&#x65E5;&#x5E38;&#x7684;&#x6DF1;&#x62F7;&#x8D1D;&#x9700;&#x6C42;&#xFF0C;&#x800C;&#x4E14;&#x80FD;&#x591F;&#x5904;&#x7406;JSON&#x683C;&#x5F0F;&#x80FD;&#x8868;&#x793A;&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x7F3A;&#x70B9;&#xFF1A;</p>
<ul>
<li>undefined&#x3001;&#x4EFB;&#x610F;&#x7684;&#x51FD;&#x6570;&#x3001;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7C7B;&#x578B;&#x4EE5;&#x53CA; symbol &#x503C;&#xFF0C;&#x5728;&#x5E8F;&#x5217;&#x5316;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#xFF08;&#x51FA;&#x73B0;&#x5728;&#x975E;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x4E2D;&#x65F6;&#xFF09;&#x6216;&#x8005;&#x88AB;&#x8F6C;&#x6362;&#x6210; null&#xFF08;&#x51FA;&#x73B0;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x65F6;)&#xFF1B;</li>
<li>&#x5B83;&#x4F1A;&#x629B;&#x5F03;&#x5BF9;&#x8C61;&#x7684;constructor&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x6DF1;&#x62F7;&#x8D1D;&#x4E4B;&#x540E;&#xFF0C;&#x4E0D;&#x7BA1;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x539F;&#x6765;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5728;&#x6DF1;&#x62F7;&#x8D1D;&#x4E4B;&#x540E;&#x90FD;&#x4F1A;&#x53D8;&#x6210;Object&#xFF1B;</li>
<li>&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x4E2D;&#x5B58;&#x5728;&#x5FAA;&#x73AF;&#x5F15;&#x7528;&#x7684;&#x60C5;&#x51B5;&#x65E0;&#x6CD5;&#x6B63;&#x786E;&#x5904;&#x7406;&#x3002;</li>
</ul>
<h4>2.&#x9012;&#x5F52;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepCopy1(obj) {
    // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;
    let result = {}
    let keys = Object.keys(obj),
        key = null,
        temp = null;

    for (let i = 0; i &lt; keys.length; i++) {
        key = keys[i];    
        temp = obj[key];
        // &#x5982;&#x679C;&#x5B57;&#x6BB5;&#x7684;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5219;&#x9012;&#x5F52;&#x64CD;&#x4F5C;
        if (temp &amp;&amp; typeof temp === &apos;object&apos;) {
            result[key] = deepCopy(temp);
        } else {
        // &#x5426;&#x5219;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#x7ED9;&#x65B0;&#x5BF9;&#x8C61;
            result[key] = temp;
        }
    }
    return result;
}

const obj1 = {
    x: {
        m: 1
    },
    y: undefined,
    z: function add(z1, z2) {
        return z1 + z2
    },
    a: Symbol(&quot;foo&quot;)
};

const obj2 = deepCopy1(obj1);
obj2.x.m = 2;

console.log(obj1); //{x: {m: 1}, y: undefined, z: &#x192;, a: Symbol(foo)}
console.log(obj2); //{x: {m: 2}, y: undefined, z: &#x192;, a: Symbol(foo)}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepCopy1</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">let</span> result = {}
    <span class="hljs-keyword">let</span> keys = <span class="hljs-built_in">Object</span>.keys(obj),
        key = <span class="hljs-literal">null</span>,
        temp = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
        key = keys[i];    
        temp = obj[key];
        <span class="hljs-comment">// &#x5982;&#x679C;&#x5B57;&#x6BB5;&#x7684;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5219;&#x9012;&#x5F52;&#x64CD;&#x4F5C;</span>
        <span class="hljs-keyword">if</span> (temp &amp;&amp; <span class="hljs-keyword">typeof</span> temp === <span class="hljs-string">&apos;object&apos;</span>) {
            result[key] = deepCopy(temp);
        } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// &#x5426;&#x5219;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#x7ED9;&#x65B0;&#x5BF9;&#x8C61;</span>
            result[key] = temp;
        }
    }
    <span class="hljs-keyword">return</span> result;
}

<span class="hljs-keyword">const</span> obj1 = {
    <span class="hljs-attr">x</span>: {
        <span class="hljs-attr">m</span>: <span class="hljs-number">1</span>
    },
    <span class="hljs-attr">y</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">z</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">z1, z2</span>) </span>{
        <span class="hljs-keyword">return</span> z1 + z2
    },
    <span class="hljs-attr">a</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&quot;foo&quot;</span>)
};

<span class="hljs-keyword">const</span> obj2 = deepCopy1(obj1);
obj2.x.m = <span class="hljs-number">2</span>;

<span class="hljs-built_in">console</span>.log(obj1); <span class="hljs-comment">//{x: {m: 1}, y: undefined, z: &#x192;, a: Symbol(foo)}</span>
<span class="hljs-built_in">console</span>.log(obj2); <span class="hljs-comment">//{x: {m: 2}, y: undefined, z: &#x192;, a: Symbol(foo)}</span></code></pre>
<h3 id="articleHeader3">&#x56DB;&#x3001;&#x5FAA;&#x73AF;&#x5F15;&#x7528;</h3>
<p>&#x770B;&#x4F3C;&#x9012;&#x5F52;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x89E3;&#x51B3;&#x6211;&#x4EEC;&#x7684;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x7136;&#x800C;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x6211;&#x4EEC;&#x6CA1;&#x8003;&#x8651;&#x5230;&#xFF0C;&#x90A3;&#x5C31;&#x662F;<code>&#x5FAA;&#x73AF;&#x5F15;&#x7528;</code></p>
<h4>1.&#x7236;&#x7EA7;&#x5F15;&#x7528;</h4>
<p>&#x8FD9;&#x91CC;&#x7684;&#x7236;&#x7EA7;&#x5F15;&#x7528;&#x6307;&#x7684;&#x662F;&#xFF0C;&#x5F53;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6B63;&#x662F;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#xFF0C;&#x6B64;&#x65F6;&#x6211;&#x4EEC;&#x5982;&#x679C;&#x8FDB;&#x884C;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x5B50;&#x5143;&#x7D20;-&gt;&#x7236;&#x5BF9;&#x8C61;-&gt;&#x5B50;&#x5143;&#x7D20;...&#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x4E2D;&#x4E00;&#x76F4;&#x8FDB;&#x884C;&#xFF0C;&#x5BFC;&#x81F4;&#x6808;&#x6EA2;&#x51FA;&#x3002;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const obj1 = {
    x: 1, 
    y: 2
};
obj1.z = obj1;

const obj2 = deepCopy1(obj1); \\&#x6808;&#x6EA2;&#x51FA;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livescript"><code> <span class="hljs-keyword">const</span> obj1 = {
    x: <span class="hljs-number">1</span>, 
    y: <span class="hljs-number">2</span>
};
obj1.z = obj1;

<span class="hljs-keyword">const</span> obj2 = deepCopy1(obj1); <span class="hljs-string">\\&#x6808;&#x6EA2;&#x51FA;</span></code></pre>
<p>&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x662F;:&#x53EA;&#x9700;&#x8981;&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5B57;&#x6BB5;&#x662F;&#x5426;&#x5F15;&#x7528;&#x4E86;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x6216;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x4EFB;&#x610F;&#x7236;&#x7EA7;&#x5373;&#x53EF;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x4E0A;&#x9762;&#x7684;deepCopy1&#x51FD;&#x6570;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepCopy2(obj, parent=null) {
    //&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;
    let result = {};
    let keys = Object.keys(obj),
         key = null,
         temp = null,
         _parent = parent;
    //&#x8BE5;&#x5B57;&#x6BB5;&#x6709;&#x7236;&#x7EA7;&#x5219;&#x9700;&#x8981;&#x8FFD;&#x6EAF;&#x8BE5;&#x5B57;&#x6BB5;&#x7684;&#x7236;&#x7EA7;
    while(_parent) {
        //&#x5982;&#x679C;&#x8BE5;&#x5B57;&#x6BB5;&#x5F15;&#x7528;&#x4E86;&#x5B83;&#x7684;&#x7236;&#x7EA7;&#xFF0C;&#x5219;&#x4E3A;&#x5FAA;&#x73AF;&#x5F15;&#x7528;
        if(_parent.originParent === obj) {
            //&#x5FAA;&#x73AF;&#x5F15;&#x7528;&#x8FD4;&#x56DE;&#x540C;&#x7EA7;&#x7684;&#x65B0;&#x5BF9;&#x8C61;
            return _parent.currentParent;
        }
        _parent = _parent.parent
    }
    for(let i=0,len=keys.length;i&lt;len;i++) {
        key = keys[i]
        temp = obj[key]
        // &#x5982;&#x679C;&#x5B57;&#x6BB5;&#x7684;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;
        if(temp &amp;&amp; typeof temp === &apos;object&apos;) {
            result[key] = deepCopy(temp, {
                //&#x9012;&#x5F52;&#x6267;&#x884C;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x5C06;&#x540C;&#x7EA7;&#x7684;&#x5F85;&#x62F7;&#x8D1D;&#x5BF9;&#x8C61;&#x4E0E;&#x65B0;&#x5BF9;&#x8C61;&#x4F20;&#x9012;&#x7ED9;parent&#xFF0C;&#x65B9;&#x4FBF;&#x8FFD;&#x6EAF;&#x5FAA;&#x73AF;&#x5F15;&#x7528;
                originParent: obj,
                currentParent: result,
                parent: parent
            });
        } else {
            result[key] = temp;
        }
    }
    return result;
}

const obj1 = {
    x:1
}
obj1.z = obj1;

const obj2 = deepCopy2(obj1);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepCopy2</span>(<span class="hljs-params">obj, parent=null</span>) </span>{
    <span class="hljs-comment">//&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">let</span> result = {};
    <span class="hljs-keyword">let</span> keys = <span class="hljs-built_in">Object</span>.keys(obj),
         key = <span class="hljs-literal">null</span>,
         temp = <span class="hljs-literal">null</span>,
         _parent = parent;
    <span class="hljs-comment">//&#x8BE5;&#x5B57;&#x6BB5;&#x6709;&#x7236;&#x7EA7;&#x5219;&#x9700;&#x8981;&#x8FFD;&#x6EAF;&#x8BE5;&#x5B57;&#x6BB5;&#x7684;&#x7236;&#x7EA7;</span>
    <span class="hljs-keyword">while</span>(_parent) {
        <span class="hljs-comment">//&#x5982;&#x679C;&#x8BE5;&#x5B57;&#x6BB5;&#x5F15;&#x7528;&#x4E86;&#x5B83;&#x7684;&#x7236;&#x7EA7;&#xFF0C;&#x5219;&#x4E3A;&#x5FAA;&#x73AF;&#x5F15;&#x7528;</span>
        <span class="hljs-keyword">if</span>(_parent.originParent === obj) {
            <span class="hljs-comment">//&#x5FAA;&#x73AF;&#x5F15;&#x7528;&#x8FD4;&#x56DE;&#x540C;&#x7EA7;&#x7684;&#x65B0;&#x5BF9;&#x8C61;</span>
            <span class="hljs-keyword">return</span> _parent.currentParent;
        }
        _parent = _parent.parent
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,len=keys.length;i&lt;len;i++) {
        key = keys[i]
        temp = obj[key]
        <span class="hljs-comment">// &#x5982;&#x679C;&#x5B57;&#x6BB5;&#x7684;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">if</span>(temp &amp;&amp; <span class="hljs-keyword">typeof</span> temp === <span class="hljs-string">&apos;object&apos;</span>) {
            result[key] = deepCopy(temp, {
                <span class="hljs-comment">//&#x9012;&#x5F52;&#x6267;&#x884C;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x5C06;&#x540C;&#x7EA7;&#x7684;&#x5F85;&#x62F7;&#x8D1D;&#x5BF9;&#x8C61;&#x4E0E;&#x65B0;&#x5BF9;&#x8C61;&#x4F20;&#x9012;&#x7ED9;parent&#xFF0C;&#x65B9;&#x4FBF;&#x8FFD;&#x6EAF;&#x5FAA;&#x73AF;&#x5F15;&#x7528;</span>
                originParent: obj,
                <span class="hljs-attr">currentParent</span>: result,
                <span class="hljs-attr">parent</span>: parent
            });
        } <span class="hljs-keyword">else</span> {
            result[key] = temp;
        }
    }
    <span class="hljs-keyword">return</span> result;
}

<span class="hljs-keyword">const</span> obj1 = {
    <span class="hljs-attr">x</span>:<span class="hljs-number">1</span>
}
obj1.z = obj1;

<span class="hljs-keyword">const</span> obj2 = deepCopy2(obj1);
</code></pre>
<h4>2. &#x540C;&#x7EA7;&#x5F15;&#x7528;</h4>
<p>&#x5047;&#x8BBE;&#x5BF9;&#x8C61;obj&#x6709;a,b,c&#x4E09;&#x4E2A;&#x5B50;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;&#x5B50;&#x5BF9;&#x8C61;c&#x4E2D;&#x6709;&#x4E2A;&#x5C5E;&#x6027;d&#x5F15;&#x7528;&#x4E86;&#x5BF9;&#x8C61;obj&#x4E0B;&#x9762;&#x7684;&#x5B50;&#x5BF9;&#x8C61;a&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj= {
    a: {
        name: &apos;a&apos;
    },
    b: {
        name: &apos;b&apos;
    },
    c: {

    }
};
c.d.e = obj.a;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code>const obj= {
<span class="hljs-symbol">    a:</span> {
<span class="hljs-symbol">        name:</span> <span class="hljs-string">&apos;a&apos;</span>
    },
<span class="hljs-symbol">    b:</span> {
<span class="hljs-symbol">        name:</span> <span class="hljs-string">&apos;b&apos;</span>
    },
<span class="hljs-symbol">    c:</span> {

    }
};
c.d.e = obj.a;</code></pre>
<p>&#x6B64;&#x65F6;c.d.e&#x548C;obj.a &#x662F;&#x76F8;&#x7B49;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x5F15;&#x7528;&#x7684;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  console.log(c.d.e === obj.a); //true" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">  console.<span class="hljs-built_in">log</span>(c.d.e === obj.<span class="hljs-keyword">a</span>);<span class="hljs-comment"> //true</span></code></pre>
<p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8C03;&#x7528;&#x4E0A;&#x9762;&#x7684;deepCopy2&#x51FD;&#x6570;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const copy = deepCopy2(obj);
console.log(copy.a); // &#x8F93;&#x51FA;&#xFF1A; {name: &quot;a&quot;}
console.log(copy.d.e);// &#x8F93;&#x51FA;: {name: &quot;a&quot;}
console.log(copy.a === copy.d.e); // &#x8F93;&#x51FA;&#xFF1A; false" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>const <span class="hljs-keyword">copy</span><span class="bash"> = deepCopy2(obj);
</span>console.log(<span class="hljs-keyword">copy</span>.<span class="bash">a); // &#x8F93;&#x51FA;&#xFF1A; {name: <span class="hljs-string">&quot;a&quot;</span>}
</span>console.log(<span class="hljs-keyword">copy</span>.<span class="bash">d.e);// &#x8F93;&#x51FA;: {name: <span class="hljs-string">&quot;a&quot;</span>}
</span>console.log(<span class="hljs-keyword">copy</span>.<span class="bash">a === copy.d.e); // &#x8F93;&#x51FA;&#xFF1A; <span class="hljs-literal">false</span></span></code></pre>
<p>&#x4EE5;&#x4E0A;&#x8868;&#x73B0;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x867D;&#x7136;opy.a &#x548C;copy.d.e&#x5728;&#x5B57;&#x9762;&#x610F;&#x4E49;&#x4E0A;&#x662F;&#x76F8;&#x7B49;&#x7684;&#xFF0C;&#x4F46;&#x4E8C;&#x8005;&#x5E76;&#x4E0D;&#x662F;&#x5F15;&#x7528;&#x7684;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x70B9;&#x4E0A;&#x6765;&#x770B;&#x5BF9;&#x8C61;copy&#x548C;&#x539F;&#x5BF9;&#x8C61;obj&#x8FD8;&#x662F;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x3002;</p>
<p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x662F;&#x56E0;&#x4E3A;obj.a&#x5E76;&#x4E0D;&#x5728;obj.d.e&#x7684;&#x7236;&#x7EA7;&#x5BF9;&#x8C61;&#x94FE;&#x4E0A;&#xFF0C;&#x6240;&#x4EE5;deepCopy2&#x51FD;&#x6570;&#x5C31;&#x65E0;&#x6CD5;&#x68C0;&#x6D4B;&#x5230;obj.d.e&#x5BF9;obj.a&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x5F15;&#x7528;&#x5173;&#x7CFB;&#xFF0C;&#x6240;&#x4EE5;deepCopy2&#x51FD;&#x6570;&#x5C31;&#x5C06;obj.a&#x6DF1;&#x62F7;&#x8D1D;&#x7684;&#x7ED3;&#x679C;&#x8D4B;&#x503C;&#x7ED9;&#x4E86;copy.d.e&#x3002;</p>
<p>&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;&#x7236;&#x7EA7;&#x7684;&#x5F15;&#x7528;&#x662F;&#x4E00;&#x79CD;&#x5F15;&#x7528;&#xFF0C;&#x975E;&#x7236;&#x7EA7;&#x7684;&#x5F15;&#x7528;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x5F15;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x53EA;&#x8981;&#x8BB0;&#x5F55;&#x4E0B;&#x5BF9;&#x8C61;A&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E0E;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x5373;&#x53EF;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepCopy3(obj) {
    // hash&#x8868;&#xFF0C;&#x8BB0;&#x5F55;&#x6240;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x5173;&#x7CFB;
    let map = new WeakMap();
    function dp(obj) {
        let result = null;
        let keys = Object.keys(obj);
        let key = null,
            temp = null,
            existobj = null;

        existobj = map.get(obj);
        //&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5DF2;&#x7ECF;&#x88AB;&#x8BB0;&#x5F55;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;
        if(existobj) {
            return existobj;
        }

        result = {}
        map.set(obj, result);

        for(let i =0,len=keys.length;i&lt;len;i++) {
            key = keys[i];
            temp = obj[key];
            if(temp &amp;&amp; typeof temp === &apos;object&apos;) {
                result[key] = dp(temp);
            }else {
                result[key] = temp;
            }
        }
        return result;
    }
    return dp(obj);
}

const obj= {
    a: {
        name: &apos;a&apos;
    },
    b: {
        name: &apos;b&apos;
    },
    c: {

    }
};
c.d.e = obj.a;

const copy = deepCopy3(obj);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepCopy3</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// hash&#x8868;&#xFF0C;&#x8BB0;&#x5F55;&#x6240;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x5173;&#x7CFB;</span>
    <span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dp</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">let</span> result = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">let</span> keys = <span class="hljs-built_in">Object</span>.keys(obj);
        <span class="hljs-keyword">let</span> key = <span class="hljs-literal">null</span>,
            temp = <span class="hljs-literal">null</span>,
            existobj = <span class="hljs-literal">null</span>;

        existobj = map.get(obj);
        <span class="hljs-comment">//&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5DF2;&#x7ECF;&#x88AB;&#x8BB0;&#x5F55;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;</span>
        <span class="hljs-keyword">if</span>(existobj) {
            <span class="hljs-keyword">return</span> existobj;
        }

        result = {}
        map.set(obj, result);

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i =<span class="hljs-number">0</span>,len=keys.length;i&lt;len;i++) {
            key = keys[i];
            temp = obj[key];
            <span class="hljs-keyword">if</span>(temp &amp;&amp; <span class="hljs-keyword">typeof</span> temp === <span class="hljs-string">&apos;object&apos;</span>) {
                result[key] = dp(temp);
            }<span class="hljs-keyword">else</span> {
                result[key] = temp;
            }
        }
        <span class="hljs-keyword">return</span> result;
    }
    <span class="hljs-keyword">return</span> dp(obj);
}

<span class="hljs-keyword">const</span> obj= {
    <span class="hljs-attr">a</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;a&apos;</span>
    },
    <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;b&apos;</span>
    },
    <span class="hljs-attr">c</span>: {

    }
};
c.d.e = obj.a;

<span class="hljs-keyword">const</span> copy = deepCopy3(obj);</code></pre>
<h3 id="articleHeader4">&#x4E94;&#x3001;&#x603B;&#x7ED3;</h3>
<p>&#xA0;&#xA0;&#xA0;&#xA0;&#x5176;&#x5B9E;&#x62F7;&#x8D1D;&#x7684;&#x65B9;&#x5F0F;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x79CD;&#xFF0C;&#x6BD4;&#x5982;jquery&#x4E2D;&#x7684;$.extend,lodash&#x7684;_.cloneDeep&#x7B49;&#x7B49;&#xFF0C;&#x5173;&#x4E8E;&#x62F7;&#x8D1D;&#x4E2D;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x503C;&#x5F97;&#x6DF1;&#x7A76;&#xFF0C;&#x6BD4;&#x5982;&#x6B63;&#x5219;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x5982;&#x4F55;&#x62F7;&#x8D1D;&#xFF0C;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x5982;&#x4F55;&#x62F7;&#x8D1D;&#xFF0C;&#x8FD9;&#x4E9B;&#x6211;&#x90FD;&#x4F1A;&#x6162;&#x6162;&#x7814;&#x7A76;&#x54D2;&#xFF01;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x601D;&#x8003;&#x4E00;&#x4E0B;&#xFF5E;<br>&#xA0;&#xA0;&#xA0;&#xA0;&#x6700;&#x540E;&#xFF0C;&#x6B22;&#x8FCE;<strong>&#x70B9;&#x8D5E;</strong>&#x548C;<strong>&#x6536;&#x85CF;</strong>&#xFF01;&#xFF01;&#x9519;&#x8BEF;&#x4E4B;&#x5904;&#x6B22;&#x8FCE;&#x6307;&#x6B63;(`&#x30FB;&#x3C9;&#x30FB;&#xB4;)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「JavaScript」带你彻底搞清楚深拷贝、浅拷贝和循环引用

## 原文链接
[https://segmentfault.com/a/1190000015042902](https://segmentfault.com/a/1190000015042902)


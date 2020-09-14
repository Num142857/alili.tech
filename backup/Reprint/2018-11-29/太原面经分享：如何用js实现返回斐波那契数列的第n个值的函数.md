---
title: '太原面经分享：如何用js实现返回斐波那契数列的第n个值的函数' 
date: 2018-11-29 9:27:38
hidden: true
slug: 7vq6u7hm58t
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x9762;&#x8BD5;&#x6512;&#x7ECF;&#x9A8C;&#xFF0C;let&apos;s go&#xFF01;</h2>
<p>&#x503C;&#x6B64;&#x9AD8;&#x8003;&#x6765;&#x4E34;&#x4E4B;&#x9645;&#xFF0C;&#x95F2;&#x4E0D;&#x4F4F;&#x7684;&#x6211;&#x53C8;&#x53CC;&#x53D2;&#x53D5;&#x51FA;&#x53D1;&#x53BB;&#x9762;&#x8BD5;&#x6512;&#x7ECF;&#x9A8C;&#x4E86;&#xFF0C;&#x53BB;&#x4E86;&#x516C;&#x53F8;&#x4EA4;&#x5F85;&#x4E00;&#x756A;&#x6D41;&#x7A0B;&#x540E;&#xFF0C;&#x9762;&#x8BD5;&#x5B98;&#x7529;&#x7ED9;&#x4E86;&#x6211;&#x4E00;&#x5F20;A4&#x7EB8;&#xFF0C;&#x4E0A;&#x9762;&#x5199;&#x7740;&#x4E00;&#x9053;js&#x7B97;&#x6CD5;&#x7B14;&#x8BD5;&#x9898;&#xFF08;&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x662F;&#x5728;&#x8003;&#x5BDF;js&#x7B97;&#x6CD5;&#xFF09;&#xFF0C;&#x4E0A;&#x9762;&#x5199;&#x7740;&#x201C;<strong>1&#x3001;1&#x3001;2&#x3001;3&#x3001;5&#x3001;8......,&#x6C42;&#x7B2C;n&#x4E2A;&#x6570;&#x7684;&#x503C;</strong>&#x201D;</p>
<p>&#x4E0D;&#x5F97;&#x4E0D;&#x627F;&#x8BA4;&#xFF0C;&#x5F53;&#x65F6;&#x6211;&#x7B2C;&#x4E00;&#x773C;&#x770B;&#x8FD9;&#x9053;&#x9898;&#x5927;&#x8111;&#x91CC;&#x662F;&#x61F5;&#x903C;&#x7684;&#x3002;&#x540E;&#x6765;&#x624D;&#x60F3;&#x8D77;&#x6765;&#xFF0C;&#x8FD9;&#x4E0D;&#x5C31;&#x662F;&#x6570;&#x5B66;&#x9898;&#x91CC;&#x7684;&#x90A3;&#x4E2A;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#xFF08;&#x80A5;&#x5A46;&#x7EB3;&#x59BE;&#xFF09;&#x6570;&#x5217;&#x4E48;&#xFF01;&#x4ECE;&#x7B2C;&#x4E09;&#x4E2A;&#x6570;&#x5F00;&#x59CB;&#xFF0C;&#x6BCF;&#x4E2A;&#x6570;&#x90FD;&#x662F;&#x524D;&#x4E24;&#x4E2A;&#x6570;&#x7684;&#x548C;&#x3002;</p>
<p>&#x80FD;get&#x5230;&#x8FD9;&#x4E2A;&#x70B9;&#xFF0C;&#x4F60;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x4E86;&#x4E00;&#x534A;&#x4E86;&#x3002;&#x53E6;&#x4E00;&#x534A;&#x5C31;&#x662F;&#x9700;&#x8981;&#x4F60;&#x5C06;&#x6570;&#x5B66;&#x516C;&#x5F0F;&#x903B;&#x8F91;&#x8F6C;&#x53D8;&#x6210;js&#x7A0B;&#x5E8F;&#x903B;&#x8F91;&#x3002;</p>
<p>&#x90A3;&#x5176;&#x5B9E;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x8FD8;&#x53EF;&#x4EE5;&#x6362;&#x4E2A;&#x95EE;&#x6CD5;&#xFF1A;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8F93;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x5B57;n&#x80FD;&#x8FD4;&#x56DE;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x6570;&#x5217;&#x7684;&#x7B2C;n&#x4E2A;&#x503C;&#x3002;</p>
<h2 id="articleHeader1">&#x5206;&#x6790;&#x601D;&#x8DEF;</h2>
<p>&#x9996;&#x5148;&#xFF0C;&#x601D;&#x8DEF;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#xFF0C;&#x5927;&#x6982;&#x7684;&#x601D;&#x8DEF;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p>
<blockquote>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8981;&#x628A;&#x7279;&#x6B8A;&#x7684;&#x90E8;&#x5206;&#x7ED9;&#x72EC;&#x7ACB;&#x51FA;&#x6765;&#x505A;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x54EA;&#x4E9B;&#x6570;&#x5B57;&#x662F;&#x7279;&#x6B8A;&#x7684;&#x5462;&#xFF1F;&#x5F88;&#x660E;&#x663E;&#x662F;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x6570;&#x5217;&#x7684;&#x524D;&#x4E24;&#x9879;&#xFF0C;&#x800C;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x6570;&#x5217;&#x7684;&#x524D;&#x4E24;&#x9879;&#x90FD;&#x4E3A;1&#x3002;&#x7136;&#x540E;&#x5B9A;&#x4E49;&#x4E09;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;firstNum&#x3001;secondNum&#x3001;total&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x7740;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x6570;&#x5B57;&#xFF0C;&#x8FD8;&#x6709;&#x4ED6;&#x4EEC;&#x4FE9;&#x4E4B;&#x548C;&#x3002;<br>&#x7136;&#x540E;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;for&#x5FAA;&#x73AF;&#x904D;&#x5386;&#xFF0C;&#x5C06;firstNum&#x52A0;&#x4E0A;secondNum&#x7684;&#x7ED3;&#x679C;&#x8D4B;&#x503C;&#x7ED9;total&#xFF0C;&#x7136;&#x540E;&#x5C06;secondNum&#x7684;value&#x8D4B;&#x503C;&#x7ED9;firstNum&#xFF0C;&#x628A;total&#x7684;value&#x8D4B;&#x503C;&#x7ED9;secondNum&#xFF0C;&#x4EE5;&#x6B64;&#x6839;&#x636E;&#x4F20;&#x5165;&#x7684;n&#x6765;&#x4E0D;&#x65AD;&#x5730;&#x5FAA;&#x73AF;&#x53E0;&#x52A0;&#xFF0C;&#x8FBE;&#x5230;&#x60F3;&#x8981;&#x7684;total&#x503C;&#xFF0C;&#x6700;&#x540E;return&#x8FD4;&#x56DE;&#x51FA;&#x53BB;&#x3002;</blockquote>
<p>&#x601D;&#x8DEF;&#x8BF4;&#x5B8C;&#x540E;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x7528;js&#x628A;&#x5B83;&#x5B9E;&#x73B0;&#x51FA;&#x6765;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x53EF;&#x80FD;&#x662F;&#x6700;&#x666E;&#x901A;&#x7684;&#x89E3;&#x6CD5;

var series = function (n) {

  var sum = [0, 1];

  if(n &lt; 2) {

    return sum[n];

  }



  var firstNum = 0;

  var secondNum = 1;

  var total = 0;



  for (var i = 2; i&lt;= n; i++) {

    total = firstNum + secondNum;

    firstNum = secondNum;

    secondNum = total;

  }

  return total;

}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// &#x53EF;&#x80FD;&#x662F;&#x6700;&#x666E;&#x901A;&#x7684;&#x89E3;&#x6CD5;</span>

<span class="hljs-keyword">var</span> series = function (<span class="hljs-keyword">n</span>) {

  <span class="hljs-keyword">var</span> <span class="hljs-keyword">sum</span> = [0, 1];

  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">n</span> &lt; 2) {

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">sum</span>[<span class="hljs-keyword">n</span>];

  }



  <span class="hljs-keyword">var</span> firstNum = 0;

  <span class="hljs-keyword">var</span> secondNum = 1;

  <span class="hljs-keyword">var</span> <span class="hljs-keyword">total</span> = 0;



  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = 2; i&lt;= <span class="hljs-keyword">n</span>; i++) {

    <span class="hljs-keyword">total</span> = firstNum + secondNum;

    firstNum = secondNum;

    secondNum = <span class="hljs-keyword">total</span>;

  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">total</span>;

}</code></pre>
<h2 id="articleHeader2">&#x9762;&#x8BD5;&#x9898;&#x7684;&#x6700;&#x4F18;&#x89E3;</h2>
<p>&#x8BB0;&#x4F4F;&#xFF0C;&#x9762;&#x8BD5;&#x5B98;&#x4E0E;&#x54B1;&#x4EEC;&#x5E94;&#x8058;&#x8005;&#x7684;&#x601D;&#x7EF4;&#x4E0D;&#x540C;&#xFF0C;&#x4F60;&#x5E94;&#x8058;&#x7684;&#x65F6;&#x5019;&#x4F60;&#x5927;&#x90E8;&#x5206;&#x65F6;&#x95F4;&#x662F;&#x5728;&#x60F3;&#xFF0C;&#x8FD9;&#x9053;&#x9898;&#x6211;&#x4F1A;&#x4E0D;&#x4F1A;&#x505A;&#xFF0C;&#x80FD;&#x4E0D;&#x80FD;&#x505A;&#x51FA;&#x6765;&#xFF0C;&#x800C;&#x4ED6;&#x4EEC;&#x60F3;&#x7684;&#x662F;&#x8FD9;&#x9053;&#x9898;&#x7684;&#x6700;&#x4F18;&#x89E3;&#x3002;</p>
<p><strong>&#x524D;&#x7AEF;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x201C;&#x6700;&#x4F18;&#x89E3;&#x201D;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x79CD;&#x81EA;&#x6211;&#x8FFD;&#x6C42;&#x8FDB;&#x6B65;&#x7684;&#x8868;&#x73B0;&#x3002;</strong></p>
<p>&#x9664;&#x4E86;&#x4EE5;&#x4E0A;&#x8FD9;&#x79CD;&#x529E;&#x6CD5;&#xFF0C;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x5417;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#x6709;&#x7684;&#x3002;</p>
<p>&#x5148;&#x6765;&#x770B;&#x770B;&#x8FED;&#x4EE3;&#x7684;&#x89E3;&#x6CD5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var series = function (n) {

  var feipo = [0,1];

  for(var i=2;i&lt;=n;i++){

    feipo[i] = feipo[i-1] + feipo[i-2]

  }

  return feipo[n];

}

// console.log(series(6));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> series = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(n)</span> </span>{

  <span class="hljs-keyword">var</span> feipo = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>];

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">2</span>;i&lt;=n;i++){

    feipo[i] = feipo[i<span class="hljs-number">-1</span>] + feipo[i<span class="hljs-number">-2</span>]

  }

  <span class="hljs-keyword">return</span> feipo[n];

}

<span class="hljs-comment">// console.log(series(6));</span></code></pre>
<p>&#x518D;&#x6765;&#x770B;&#x770B;&#x9012;&#x5F52;&#x7684;&#x89E3;&#x6CD5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var series = function (n) {

  if(n &gt;= 2) {

    return series(n-1) + series(n-2)

  }else {

    return n;

  }

}

// console.log(series(6));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> series = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(n)</span> </span>{

  <span class="hljs-keyword">if</span>(n &gt;= <span class="hljs-number">2</span>) {

    <span class="hljs-keyword">return</span> series(n<span class="hljs-number">-1</span>) + series(n<span class="hljs-number">-2</span>)

  }<span class="hljs-keyword">else</span> {

    <span class="hljs-keyword">return</span> n;

  }

}

<span class="hljs-comment">// console.log(series(6));</span></code></pre>
<p>&#x7A76;&#x7ADF;&#x54EA;&#x4E2A;&#x624D;&#x662F;&#x6700;&#x4F18;&#x89E3;&#xFF0C;&#x76F8;&#x4FE1;&#x770B;&#x5B8C;&#x6587;&#x7AE0;&#x7684;&#x4F60;&#x4EEC;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x7B54;&#x6848;&#x3002;</p>
<p>&#x53EF;&#x80FD;&#x4F60;&#x4EEC;&#x4F1A;&#x95EE;:</p>
<blockquote>&#x90A3;&#x95F0;&#x571F;&#x4F60;&#x5728;&#x7B14;&#x8BD5;&#x65F6;&#x505A;&#x51FA;&#x6765;&#x4E86;&#x4E48;&#xFF1F;</blockquote>
<blockquote>&#x4F60;&#x731C;~</blockquote>
<h2 id="articleHeader3">&#x5199;&#x5728;&#x540E;&#x9762;</h2>
<p>&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#x6211;&#x4E5F;&#x53C2;&#x52A0;&#x8FC7;&#x5F88;&#x591A;&#x6B21;&#x5927;&#x5927;&#x5C0F;&#x5C0F;&#x7684;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#xFF0C;&#x786E;&#x5B9E;&#x4E5F;&#x542C;&#x8BF4;&#x8FC7;&#x6709;&#x4E0D;&#x5C11;&#x9762;&#x8BD5;&#x5B98;&#x4F1A;&#x95EE;&#x5230;&#x4E00;&#x4E9B;&#x7B97;&#x6CD5;&#x3002;&#x901A;&#x5E38;&#x4F1A;&#x6D89;&#x53CA;&#x7684;&#xFF0C;&#x662F;&#x94FE;&#x8868;&#x3001;&#x6811;&#x3001;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x6570;&#x7EC4;&#x76F8;&#x5173;&#x7684;&#x77E5;&#x8BC6;&#x3002;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x5BF9;&#x7B97;&#x6CD5;&#x8981;&#x6C42;&#x4E0D;&#x9AD8;&#xFF0C;&#x4F3C;&#x4E4E;&#x5DF2;&#x7ECF;&#x662F;&#x4E1A;&#x5185;&#x7684;&#x4E00;&#x79CD;&#x5171;&#x8BC6;&#x4E86;&#x3002;&#x867D;&#x8BF4;&#x7B97;&#x6CD5;&#x597D;&#x7684;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x80AF;&#x5B9A;&#x4F1A;&#x52A0;&#x5206;&#xFF0C;&#x4F46;&#x662F;&#x4EC5;&#x51ED;&#x5E38;&#x89C1;&#x7684;&#x9762;&#x8BD5;&#x9898;&#xFF0C;&#x800C;&#x4E0D;&#x53BB;&#x8054;&#x7CFB;&#x9700;&#x6C42;&#xFF0C;&#x5F88;&#x96BE;&#x8BA9;&#x4EBA;&#x89C9;&#x5F97;&#xFF0C;&#x7B97;&#x6CD5;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;&#x771F;&#x7684;&#x5F88;&#x91CD;&#x8981;&#x3002;</p>
<p>&#x76F4;&#x5230;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x5929;&#xFF0C;&#x592A;&#x539F;&#x8FD9;&#x5BB6;&#x516C;&#x53F8;&#x7684;&#x524D;&#x7AEF;leader&#x7ED9;&#x6211;&#x51FA;&#x4E86;&#x8FD9;&#x4E48;&#x4E00;&#x9053;js&#x7B97;&#x6CD5;&#x9898;&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x8DDF;&#x6211;&#x804A;&#x4E86;&#x5F88;&#x591A;&#x5185;&#x5BB9;&#xFF0C;&#x4E0E;&#x6211;&#x56FA;&#x6709;&#x7684;&#x601D;&#x7EF4;&#x4EA7;&#x751F;&#x4E86;&#x5F3A;&#x70C8;&#x7684;&#x78B0;&#x649E;&#x3002;&#x9762;&#x8BD5;&#x5B98;&#x8FD8;&#x8DDF;&#x6211;&#x8BB2;&#xFF0C;&#x4ED6;&#x4EEC;&#x516C;&#x53F8;&#x7684;&#x6280;&#x672F;&#x603B;&#x76D1;&#x662F;&#x5FAE;&#x8F6F;&#x51FA;&#x8EAB;&#xFF0C;&#x5F88;&#x6CE8;&#x91CD;&#x7B97;&#x6CD5;&#x8FD9;&#x5757;&#xFF0C;&#x4ED6;&#x5F53;&#x521D;&#x5E94;&#x8058;&#x8FDB;&#x6765;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x662F;&#x8003;&#x5BDF;&#x7684;&#x7B97;&#x6CD5;&#x3002;</p>
<p>&#x867D;&#x7136;&#x8FD9;&#x6B21;&#x9762;&#x8BD5;&#x88AB;pass&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x8BA4;&#x4E3A;&#x5DE5;&#x7A0B;&#x5E08;&#x90FD;&#x5E94;&#x8BE5;&#x5B66;&#x4E60;&#x7B97;&#x6CD5;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x90A3;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x5BF9;&#x8F6F;&#x4EF6;&#x5DE5;&#x7A0B;&#x601D;&#x60F3;&#x7684;&#x57F9;&#x517B;&#xFF0C;&#x66F4;&#x662F;&#x4E00;&#x79CD;&#x5BF9;&#x5FC3;&#x667A;&#x7684;&#x953B;&#x70BC;&#x3002;</p>
<p>&#x6587;&#x7AE0;&#x9884;&#x544A;&#xFF1A;&#x66F4;&#x591A;&#x7684;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x5206;&#x4EAB;&#x6211;&#x90FD;&#x4F1A;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x66F4;&#x65B0;&#x5728;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;&lt;<strong>&#x95F0;&#x571F;&#x5927;&#x53D4;</strong>&gt;&#x91CC;&#x9762;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#xFF01;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbIH0?w=258&amp;h=258" src="https://static.alili.tech/img/bVbbIH0?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
太原面经分享：如何用js实现返回斐波那契数列的第n个值的函数

## 原文链接
[https://segmentfault.com/a/1190000015210132](https://segmentfault.com/a/1190000015210132)


---
title: '函数柯里化（Currying）小实践' 
date: 2018-11-17 14:34:54
hidden: true
slug: 3xz25zktttf
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;&#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;</h2><p>&#x5728;&#x8BA1;&#x7B97;&#x673A;&#x79D1;&#x5B66;&#x4E2D;&#xFF0C;&#x67EF;&#x91CC;&#x5316;&#xFF08;Currying&#xFF09;&#x662F;&#x628A;<strong>&#x63A5;&#x53D7;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x51FD;&#x6570;&#x53D8;&#x6362;&#x6210;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5355;&#x4E00;&#x53C2;&#x6570;</strong>(&#x6700;&#x521D;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;)&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x63A5;&#x53D7;&#x4F59;&#x4E0B;&#x7684;&#x53C2;&#x6570;&#x4E14;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7684;&#x65B0;&#x51FD;&#x6570;&#x7684;&#x6280;&#x672F;&#x3002;&#x8FD9;&#x4E2A;&#x6280;&#x672F;&#x7531; Christopher Strachey &#x4EE5;&#x903B;&#x8F91;&#x5B66;&#x5BB6; Haskell Curry &#x547D;&#x540D;&#x7684;&#xFF0C;&#x5C3D;&#x7BA1;&#x5B83;&#x662F; Moses Schnfinkel &#x548C; Gottlob Frege &#x53D1;&#x660E;&#x7684;&#x3002;<br>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5047;&#x8BBE;&#x7A0B;&#x5E8F;&#x5458;A&#x662F;&#x4E2A;&#x59BB;&#x7BA1;&#x4E25;&#xFF0C;&#x5DE5;&#x8D44;&#x6089;&#x6570;&#x4E0A;&#x4EA4;&#x7ED9;&#x59BB;&#x5B50;&#xFF0C;&#x4E3A;&#x4E86;&#x4E70;&#x4E00;&#x4E2A;&#x5FC3;&#x7231;&#x7684;&#x952E;&#x76D8;<br><span class="img-wrap"><img data-src="/img/bVbe7yh?w=500&amp;h=334" src="https://static.alili.tech/img/bVbe7yh?w=500&amp;h=334" alt="u=3317326080,3565966017&amp;fm=27&amp;gp=0.jpg" title="u=3317326080,3565966017&amp;fm=27&amp;gp=0.jpg" style="cursor:pointer;display:inline"></span></p><p>&#x7A0B;&#x5E8F;&#x5458;A&#x6BCF;&#x5929;&#x90FD;&#x5077;&#x5077;&#x85CF;&#x51E0;&#x6BDB;&#x94B1;&#xFF0C;&#x6253;&#x7B97;&#x5E74;&#x5E95;&#x4E70;&#x4E2A;&#x952E;&#x76D8;&#xFF0C;&#x56E0;&#x6B64;&#x7A0B;&#x5E8F;&#x5458;A&#x5199;&#x4E86;&#x4EE5;&#x4E0B;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x7EDF;&#x8BA1;&#x5E74;&#x7EC8;&#x4E00;&#x5171;&#x51D1;&#x4E86;&#x591A;&#x5C11;&#x94B1;&#xFF0C;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description &#x7EDF;&#x8BA1;&#x91D1;&#x989D;
 * @return {number}
 */
function countMoney() {
  let money = 0
  // &#x6E29;&#x99A8;&#x63D0;&#x793A;&#xFF1A;arguments&#x662F;&#x6240;&#x63A5;&#x6536;&#x7684;&#x6240;&#x6709;&#x53C2;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x61C2;&#x7684;&#x9700;&#x8981;&#x641C;&#x4E00;&#x641C;&#x8865;&#x8865;&#x77E5;&#x8BC6;&#x5566;
  for (let i = 0; i &lt; arguments.length; i++) {
    money += arguments[i]
  }

  return money
}
// &#x85CF;&#x4E86;&#x4E00;&#x5E74;&#x7684;&#x8D26;&#x672C;&#x8BB0;&#x5F55;&#x7684;&#x6570;&#x636E;
const records = [1, 1, 2, 2, 3, 3, 4, 4]
// &#x628A;&#x5168;&#x90E8;&#x6570;&#x636E;&#x90FD;&#x8F93;&#x5165;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;
countMoney(1, 1, 2, 2, 3, 3, 4, 4)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">/**
 * @description &#x7EDF;&#x8BA1;&#x91D1;&#x989D;
 * @return {number}
 */</span>
function countMoney() {
  let <span class="hljs-section">money</span> = <span class="hljs-number">0</span>
  <span class="hljs-comment">// &#x6E29;&#x99A8;&#x63D0;&#x793A;&#xFF1A;arguments&#x662F;&#x6240;&#x63A5;&#x6536;&#x7684;&#x6240;&#x6709;&#x53C2;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x61C2;&#x7684;&#x9700;&#x8981;&#x641C;&#x4E00;&#x641C;&#x8865;&#x8865;&#x77E5;&#x8BC6;&#x5566;</span>
  for (let i = <span class="hljs-number">0</span>; i &lt; arguments.length; i++) {
    <span class="hljs-section">money</span> += arguments[i]
  }

  return <span class="hljs-section">money</span>
}
<span class="hljs-comment">// &#x85CF;&#x4E86;&#x4E00;&#x5E74;&#x7684;&#x8D26;&#x672C;&#x8BB0;&#x5F55;&#x7684;&#x6570;&#x636E;</span>
const records = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]
<span class="hljs-comment">// &#x628A;&#x5168;&#x90E8;&#x6570;&#x636E;&#x90FD;&#x8F93;&#x5165;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;</span>
countMoney(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>)</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x6240;&#x5448;&#x73B0;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x6700;&#x76F4;&#x63A5;&#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x4E0D;&#x65B9;&#x4FBF;&#x7684;&#x5730;&#x65B9;&#x5728;&#x4E8E;&#xFF0C;&#x7A0B;&#x5E8F;&#x5458;A&#x8FD8;&#x8981;&#x62FF;&#x4E2A;&#x5C0F;&#x672C;&#x672C;&#x628A;&#x6BCF;&#x5929;&#x5B58;&#x4E86;&#x591A;&#x5C11;&#x94B1;&#x5148;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#xFF01;&#xFF01;&#xFF01;&#x4E07;&#x4E00;&#x8FD9;&#x4E2A;&#x672C;&#x5B50;&#x88AB;&#x53D1;&#x73B0;&#x90A3;&#x5C31;&#x5C11;&#x4E0D;&#x4E86;&#x8DEA;&#x952E;&#x76D8;&#x4E86;&#xFF0C;&#x6781;&#x5EA6;&#x4E0D;&#x5B89;&#x5168;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbe7xN?w=145&amp;h=300" src="https://static.alili.tech/img/bVbe7xN?w=145&amp;h=300" alt="u=864471950,2685274187&amp;fm=27&amp;gp=0.jpg" title="u=864471950,2685274187&amp;fm=27&amp;gp=0.jpg" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x66F4;&#x5B89;&#x5168;&#x5730;&#x85CF;&#x79C1;&#x623F;&#x94B1;</h2><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x6BCF;&#x5929;&#x8BB0;&#x5F55;&#x4E0B;&#x5F53;&#x524D;&#x7684;&#x6570;&#x636E;&#x662F;&#x4E0D;&#x7075;&#x6D3B;&#x7684;&#xFF0C;&#x800C;&#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;&#x5219;&#x6709;&#x6548;&#x5730;&#x89E3;&#x51B3;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;<br>&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x8FD9;&#x6837;&#x5B58;&#x50A8;&#x6211;&#x4EEC;&#x7684;&#x79C1;&#x623F;&#x94B1;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2018-01-01 &#x5B58;&#x4E86;1&#x6BDB;&#x94B1;
countMoney(1)
// 2018-01-02 &#x5B58;&#x4E86;2&#x6BDB;&#x94B1;
countMoney(2)
// 2018-01-03 &#x5B58;&#x4E86;3&#x6BDB;&#x94B1;
countMoney(3)
// 2018-01-04 &#x5B58;&#x4E86;4&#x6BDB;&#x94B1;
countMoney(4)
//&#x4E00;&#x5E74;&#x4EE5;&#x540E;
// &#x7EDF;&#x8BA1;&#x8FD9;&#x7B14;&#x5DE8;&#x989D;&#x5B58;&#x6B3E;
countMoney()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// 2018-01-01 &#x5B58;&#x4E86;1&#x6BDB;&#x94B1;</span>
<span class="hljs-function"><span class="hljs-title">countMoney</span><span class="hljs-params">(<span class="hljs-number">1</span>)</span></span>
<span class="hljs-comment">// 2018-01-02 &#x5B58;&#x4E86;2&#x6BDB;&#x94B1;</span>
<span class="hljs-function"><span class="hljs-title">countMoney</span><span class="hljs-params">(<span class="hljs-number">2</span>)</span></span>
<span class="hljs-comment">// 2018-01-03 &#x5B58;&#x4E86;3&#x6BDB;&#x94B1;</span>
<span class="hljs-function"><span class="hljs-title">countMoney</span><span class="hljs-params">(<span class="hljs-number">3</span>)</span></span>
<span class="hljs-comment">// 2018-01-04 &#x5B58;&#x4E86;4&#x6BDB;&#x94B1;</span>
<span class="hljs-function"><span class="hljs-title">countMoney</span><span class="hljs-params">(<span class="hljs-number">4</span>)</span></span>
<span class="hljs-comment">//&#x4E00;&#x5E74;&#x4EE5;&#x540E;</span>
<span class="hljs-comment">// &#x7EDF;&#x8BA1;&#x8FD9;&#x7B14;&#x5DE8;&#x989D;&#x5B58;&#x6B3E;</span>
<span class="hljs-function"><span class="hljs-title">countMoney</span><span class="hljs-params">()</span></span></code></pre><p>&#x4E0A;&#x8FF0;&#x7684;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5173;&#x5FC3;&#x6570;&#x636E;&#x7684;&#x5B58;&#x50A8;&#x8BB0;&#x5F55;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x6BCF;&#x5929;&#x5F80;&#x5B58;&#x94B1;&#x7F50;&#x91CC;&#x9762;&#x585E;&#x94B1;&#xFF0C;&#x7136;&#x540E;&#x5E74;&#x5E95;&#x53D6;&#x51FA;&#x6765;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x603B;&#x548C;&#x3002;&#x518D;&#x4E5F;&#x4E0D;&#x62C5;&#x5FC3;&#x7559;&#x4E0B;&#x5C0F;&#x672C;&#x672C;&#x4F5C;&#x4E3A;&#x8BC1;&#x636E;&#x4E86;&#xFF01;</p><h2 id="articleHeader2">&#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;&#x4EE3;&#x7801;&#x7684;&#x5B9E;&#x73B0;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description countMoney&#x4E3A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;
 */
const countMoney = (function () {
  let money = 0
  let args = []
  const res = function () {
    if (arguments.length === 0) {
      for (let i = 0; i &lt; args.length; i++) {
        money += args[i]
      }
      return money
    } else {
      // arguments &#x662F;&#x4E2A;&#x7C7B;&#x6570;&#x7EC4;&#x6765;&#x7740;&#xFF0C;&#x5E94;&#x8BE5;&#x7528;&#x5C55;&#x5F00;&#x7B26;&#x5C55;&#x5F00;&#x624D;&#x80FD;push&#x8FDB;&#x53BB;
      args.push(...arguments)
      return res
    }
  }
  return res
})()

// 2018-01-01 &#x5B58;&#x4E86;1&#x6BDB;&#x94B1;
countMoney(1)
// 2018-01-02 &#x5B58;&#x4E86;2&#x6BDB;&#x94B1;
countMoney(2)
// 2018-01-03 &#x5B58;&#x4E86;3&#x6BDB;&#x94B1;
countMoney(3)
// 2018-01-04 &#x5B58;&#x4E86;4&#x6BDB;&#x94B1;
countMoney(4)
//&#x4E00;&#x5E74;&#x4EE5;&#x540E;
// &#x7EDF;&#x8BA1;&#x8FD9;&#x7B14;&#x5DE8;&#x989D;&#x5B58;&#x6B3E; &#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x4E3A; 10
console.log(countMoney())
// &#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x88C5;&#x903C;&#x5730;&#x8FDB;&#x884C;&#x82B1;&#x5F0F;&#x7EDF;&#x8BA1;&#xFF0C;&#x7ED3;&#x679C;&#x540C;&#x6837;&#x662F;10
countMoney(1)(2)(3)(4)()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @description countMoney&#x4E3A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;
 */</span>
<span class="hljs-keyword">const</span> countMoney = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> money = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> args = []
  <span class="hljs-keyword">const</span> res = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; args.length; i++) {
        money += args[i]
      }
      <span class="hljs-keyword">return</span> money
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// arguments &#x662F;&#x4E2A;&#x7C7B;&#x6570;&#x7EC4;&#x6765;&#x7740;&#xFF0C;&#x5E94;&#x8BE5;&#x7528;&#x5C55;&#x5F00;&#x7B26;&#x5C55;&#x5F00;&#x624D;&#x80FD;push&#x8FDB;&#x53BB;</span>
      args.push(...arguments)
      <span class="hljs-keyword">return</span> res
    }
  }
  <span class="hljs-keyword">return</span> res
})()

<span class="hljs-comment">// 2018-01-01 &#x5B58;&#x4E86;1&#x6BDB;&#x94B1;</span>
countMoney(<span class="hljs-number">1</span>)
<span class="hljs-comment">// 2018-01-02 &#x5B58;&#x4E86;2&#x6BDB;&#x94B1;</span>
countMoney(<span class="hljs-number">2</span>)
<span class="hljs-comment">// 2018-01-03 &#x5B58;&#x4E86;3&#x6BDB;&#x94B1;</span>
countMoney(<span class="hljs-number">3</span>)
<span class="hljs-comment">// 2018-01-04 &#x5B58;&#x4E86;4&#x6BDB;&#x94B1;</span>
countMoney(<span class="hljs-number">4</span>)
<span class="hljs-comment">//&#x4E00;&#x5E74;&#x4EE5;&#x540E;</span>
<span class="hljs-comment">// &#x7EDF;&#x8BA1;&#x8FD9;&#x7B14;&#x5DE8;&#x989D;&#x5B58;&#x6B3E; &#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x4E3A; 10</span>
<span class="hljs-built_in">console</span>.log(countMoney())
<span class="hljs-comment">// &#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x88C5;&#x903C;&#x5730;&#x8FDB;&#x884C;&#x82B1;&#x5F0F;&#x7EDF;&#x8BA1;&#xFF0C;&#x7ED3;&#x679C;&#x540C;&#x6837;&#x662F;10</span>
countMoney(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">4</span>)()</code></pre><h2 id="articleHeader3">&#x5206;&#x6790;&#x4EE3;&#x7801;</h2><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x5728;JavaScript&#x7684;&#x5F88;&#x591A;&#x601D;&#x60F3;&#x548C;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E2D;&#xFF0C;&#x95ED;&#x5305;&#x662F;&#x4E2A;&#x5F88;&#x5E38;&#x89C1;&#x4E14;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4E0A;&#x8FF0;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x5229;&#x7528;&#x4E86;&#x95ED;&#x5305;&#x3002;<br>&#x8BE5;&#x51FD;&#x6570;&#x662F;&#x4E2A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#x628A;&#x6BCF;&#x6B21;&#x63A5;&#x6536;&#x5230;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x5B58;&#x50A8;&#x8D77;&#x6765;&#xFF0C;<br>&#x5E76;&#x4E14;&#x7EE7;&#x7EED;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x53D1;&#x73B0;&#x67D0;&#x6B21;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x6CA1;&#x6709;&#x4F20;&#x5165;&#x53C2;&#x6570;&#xFF0C;&#x90A3;&#x5C31;&#x610F;&#x5473;&#x7740;&#x8981;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x7EDF;&#x8BA1;&#xFF0C;&#x4ECE;&#x800C;&#x628A;&#x4E4B;&#x524D;&#x5B58;&#x50A8;&#x7684;&#x6570;&#x636E;&#x4E00;&#x6B21;&#x6027;&#x62FF;<br>&#x51FA;&#x6765;&#x8BA1;&#x7B97;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x8BA1;&#x7B97;&#x7ED3;&#x679C;&#x3002;&#x5176;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe7wi?w=357&amp;h=742" src="https://static.alili.tech/img/bVbe7wi?w=357&amp;h=742" alt="5b6d0ab0e4b053a09c2e0a95.png" title="5b6d0ab0e4b053a09c2e0a95.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><p>&#x6240;&#x8C13;&#x7684;&#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;&#xFF0C;&#x4EA6;&#x6216;&#x8005;&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x5176;&#x4ED6;&#x4E00;&#x4E9B;&#x6982;&#x5FF5;&#xFF0C;&#x4F8B;&#x5982;&#x95ED;&#x5305;&#x3001;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x3001;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x7B49;&#x7B49;&#x90FD;&#x597D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5173;&#x6CE8;&#x7684;&#x70B9;&#x5728;&#x4E8E;&#x638C;&#x63E1;<br>&#x8FD9;&#x4E9B;&#x6A21;&#x5F0F;&#x6216;&#x8005;&#x6982;&#x5FF5;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#xFF0C;&#x4ECE;&#x800C;&#x66F4;&#x597D;&#x5730;&#x670D;&#x52A1;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x4E1A;&#x52A1;&#x5F00;&#x53D1;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x5065;&#x58EE;&#x3001;&#x7075;&#x6D3B;&#x3001;&#x9AD8;&#x6548;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
函数柯里化（Currying）小实践

## 原文链接
[https://segmentfault.com/a/1190000015957944](https://segmentfault.com/a/1190000015957944)


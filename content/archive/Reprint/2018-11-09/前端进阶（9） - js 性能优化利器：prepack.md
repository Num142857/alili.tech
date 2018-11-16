---
title: 前端进阶（9） - js 性能优化利器：prepack
hidden: true
categories: [reprint]
slug: 7c9a6abc
date: 2018-11-09 02:30:06
---

{{< raw >}}
<h1 id="articleHeader0">js &#x6027;&#x80FD;&#x4F18;&#x5316;&#x5229;&#x5668;&#xFF1A;prepack</h1><h2 id="articleHeader1">1. js &#x6027;&#x80FD;&#x4F18;&#x5316;</h2><p>js &#x6027;&#x80FD;&#x4F18;&#x5316;&#x4E0D;&#x5916;&#x4E4E;&#x4ECE;&#x4E09;&#x4E2A;&#x89D2;&#x5EA6;&#x5165;&#x624B;&#xFF1A;</p><h3 id="articleHeader2">1.1 &#x5F00;&#x53D1;&#x8005;&#x5728;&#x7F16;&#x5199;&#x7A0B;&#x5E8F;&#x65F6;&#xFF0C;&#x5C3D;&#x91CF;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5197;&#x4F59;&#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x5197;&#x4F59;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</h3><p>&#x9996;&#x5148;&#x8981;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5197;&#x4F59;&#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x95ED;&#x5305;&#x3001;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x53D8;&#x91CF;&#x4E0E;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x3001;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6A21;&#x5757;&#x5206;&#x5272;&#x7B49;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4F4E;&#x6548;&#x7684;&#x5B9E;&#x73B0;
const urlParams = (() =&gt; {
  const params = {};
  if (location.search) {
    location.search.slice(1).split(&apos;&amp;&apos;).forEach(item =&gt; {
      const arr = item.split(&apos;=&apos;);
      params[arr[0]] = arr[1] || &apos;&apos;;
    });
  }
  
 return params;
})();


// &#x66F4;&#x9AD8;&#x6548;&#x7684;&#x5B9E;&#x73B0;
const urlParams = {};
if (location.search) {
  location.search.slice(1).split(&apos;&amp;&apos;).forEach(item =&gt; {
    const arr = item.split(&apos;=&apos;);
    urlParams[arr[0]] = arr[1] || &apos;&apos;;
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// &#x4F4E;&#x6548;&#x7684;&#x5B9E;&#x73B0;</span>
<span class="hljs-keyword">const</span> urlParams = <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> params = {};
  <span class="hljs-keyword">if</span> (<span class="hljs-params">location.search</span>) {
    location.search.slice(<span class="hljs-params">1</span>).split(<span class="hljs-params">&apos;&amp;&apos;</span>).forEach(<span class="hljs-params">item =&gt; {
      <span class="hljs-keyword">const</span> arr = item.split(<span class="hljs-params">&apos;=&apos;</span>);
      params[arr[0]] = arr[1] || &apos;&apos;;
    }</span>);
  }
  
 <span class="hljs-keyword">return</span> params;
}</span>)<span class="hljs-params">()</span>;


// &#x66F4;&#x9AD8;&#x6548;&#x7684;&#x5B9E;&#x73B0;
<span class="hljs-params">const</span> <span class="hljs-params">urlParams</span> = {};
<span class="hljs-params">if</span> (<span class="hljs-params">location.search</span>) {
  <span class="hljs-params">location</span>.<span class="hljs-params">search</span>.<span class="hljs-params">slice</span>(<span class="hljs-params">1</span>).<span class="hljs-params">split</span>(<span class="hljs-params">&apos;&amp;&apos;</span>).<span class="hljs-params">forEach</span>(<span class="hljs-params">item =&gt; {
    <span class="hljs-keyword">const</span> arr = item.split(<span class="hljs-params">&apos;=&apos;</span>);
    urlParams[arr[0]] = arr[1] || &apos;&apos;;
  }</span>);
}</span></code></pre><p>&#x5176;&#x6B21;&#x662F;&#x8981;&#x907F;&#x514D;&#x4F7F;&#x7528;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF0C;&#x56E0;&#x4E3A;&#x4E00;&#x822C;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x90FD;&#x5F88;&#x5927;&#xFF0C;&#x529F;&#x80FD;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x5728;&#x6761;&#x4EF6;&#x5141;&#x8BB8;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C3D;&#x91CF;&#x5C11;&#x7528;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const users = [
  { user: &apos;barney&apos;,  age: 36, active: true },
  { user: &apos;fred&apos;,    age: 40, active: false },
  { user: &apos;pebbles&apos;, age: 1,  active: true },
];

// &#x4F7F;&#x7528; lodash
import _ from &apos;lodash&apos;;

const user = _.find(users, { age: 1, active: true });


// &#x4E0D;&#x4F7F;&#x7528; lodash
const user = users.find(item =&gt; item.age === 1 &amp;&amp; item.active === true);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>const users = [
  { <span class="hljs-string">user:</span> <span class="hljs-string">&apos;barney&apos;</span>,  <span class="hljs-string">age:</span> <span class="hljs-number">36</span>, <span class="hljs-string">active:</span> <span class="hljs-literal">true</span> },
  { <span class="hljs-string">user:</span> <span class="hljs-string">&apos;fred&apos;</span>,    <span class="hljs-string">age:</span> <span class="hljs-number">40</span>, <span class="hljs-string">active:</span> <span class="hljs-literal">false</span> },
  { <span class="hljs-string">user:</span> <span class="hljs-string">&apos;pebbles&apos;</span>, <span class="hljs-string">age:</span> <span class="hljs-number">1</span>,  <span class="hljs-string">active:</span> <span class="hljs-literal">true</span> },
];

<span class="hljs-comment">// &#x4F7F;&#x7528; lodash</span>
<span class="hljs-keyword">import</span> _ from <span class="hljs-string">&apos;lodash&apos;</span>;

const user = _.find(users, { <span class="hljs-string">age:</span> <span class="hljs-number">1</span>, <span class="hljs-string">active:</span> <span class="hljs-literal">true</span> });


<span class="hljs-comment">// &#x4E0D;&#x4F7F;&#x7528; lodash</span>
const user = users.find(item =&gt; item.age === <span class="hljs-number">1</span> &amp;&amp; item.active === <span class="hljs-literal">true</span>);</code></pre><p>&#x8FD8;&#x6BD4;&#x5982;&#xFF1A;</p><ul><li><a href="https://github.com/nefe/You-Dont-Need-jQuery" rel="nofollow noreferrer" target="_blank">You-Dont-Need-jQuery</a>: &#x4E00;&#x4E9B; <a href="https://github.com/jquery/jquery" rel="nofollow noreferrer" target="_blank">jquery</a> &#x7684;&#x66FF;&#x4EE3;&#x6027;&#x89E3;&#x51B3;&#x65B9;&#x6848;</li><li><a href="https://github.com/you-dont-need/You-Dont-Need-JavaScript" rel="nofollow noreferrer" target="_blank">You-Dont-Need-JavaScript</a>: &#x4E00;&#x4E9B;&#x4F7F;&#x7528;&#x539F;&#x751F; <code>css</code> &#x52A8;&#x753B;&#x66FF;&#x4EE3;&#x539F;&#x6709;&#x7684; <code>js</code> &#x52A8;&#x753B;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;</li><li><a href="https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore" rel="nofollow noreferrer" target="_blank">You-Dont-Need-Lodash-Underscore</a>: &#x4E00;&#x4E9B; <a href="https://github.com/lodash/lodash" rel="nofollow noreferrer" target="_blank">lodash</a>&#x3001;<a href="https://github.com/jashkenas/underscore" rel="nofollow noreferrer" target="_blank">underscore</a> &#x7684;&#x66FF;&#x4EE3;&#x6027;&#x89E3;&#x51B3;&#x65B9;&#x6848;</li><li><a href="https://github.com/you-dont-need/You-Dont-Need-Momentjs" rel="nofollow noreferrer" target="_blank">You-Dont-Need-Momentjs</a>: &#x4E00;&#x4E9B; <a href="https://github.com/moment/moment" rel="nofollow noreferrer" target="_blank">moment</a> &#x7684;&#x66FF;&#x4EE3;&#x6027;&#x89E3;&#x51B3;&#x65B9;&#x6848;</li></ul><p>&#x672C;&#x8D28;&#x4E0A;&#x8BB2;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x4ECE;&#x5F00;&#x53D1;&#x8005;&#x7F16;&#x7801;&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x4F18;&#x5316;&#x7684;&#xFF0C;&#x4F46;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E5F;&#x662F;&#x5F88;&#x6709;&#x9650;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4E0D;&#x5F97;&#x4E0D;&#x5927;&#x91CF;&#x7684;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF0C;&#x6765;&#x63D0;&#x5347;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><h3 id="articleHeader3">1.2 &#x4F7F;&#x7528;&#x6241;&#x5E73;&#x5316;&#x4EE3;&#x7801;&#x6784;&#x5EFA;&#x7684;&#x6784;&#x5EFA;&#x5DE5;&#x5177;</h3><p>&#x73B0;&#x5728;&#x524D;&#x7AEF;&#x6253;&#x5305;&#x57FA;&#x672C;&#x4E0A;&#x90FD;&#x4F1A;&#x7528; <a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>&#xFF0C;&#x4F46; <code>webpack</code> &#x6253;&#x5305;&#x4E4B;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x4EA7;&#x751F;&#x5F88;&#x591A;&#x5197;&#x4F59;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4; <code>js</code> &#x6027;&#x80FD;&#x964D;&#x4F4E;&#x3002;</p><p>&#x5982;&#x679C;&#x5728;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x7684;&#x6027;&#x80FD;&#x4E0A;&#x6709;&#x7279;&#x522B;&#x9700;&#x6C42;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://github.com/rollup/rollup" rel="nofollow noreferrer" target="_blank">rollup</a>&#xFF0C;&#x8BE6;&#x7EC6;&#x4F7F;&#x7528;&#x4E0E;&#x5BF9;&#x6BD4;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x8FD9;&#x91CC; <a href="https://github.com/senntyou/blogs/blob/master/advanced/6.md" rel="nofollow noreferrer" target="_blank">webpack &#x4E4B;&#x5916;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x9009;&#x62E9;&#xFF1A;rollup</a>.</p><h3 id="articleHeader4">1.3 &#x4EE3;&#x7801;&#x9884;&#x7F16;&#x8BD1;</h3><p><code>js</code> &#x672C;&#x8EAB;&#x662F;&#x6CA1;&#x6709;&#x50CF; <code>python</code> &#x4E00;&#x6837;&#x7684;&#x9884;&#x7F16;&#x8BD1;&#x529F;&#x80FD;&#xFF0C;&#x66F4;&#x6CA1;&#x6709;&#x50CF; <code>java</code> &#x4E00;&#x6837;&#x7684;&#x7F16;&#x8BD1;&#x529F;&#x80FD;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x91CC;&#x6240;&#x8BF4;&#x7684; <code>js &#x4EE3;&#x7801;&#x9884;&#x7F16;&#x8BD1;</code> &#x53EA;&#x662F;&#x901A;&#x8FC7;&#x5DE5;&#x5177;&#x5B9E;&#x73B0;&#x7684;&#x7C7B;&#x4F3C;&#x529F;&#x80FD;&#x800C;&#x5DF2;&#x3002;</p><p>&#x8FD9;&#x5C31;&#x8981;&#x63D0;&#x5230; <a href="https://github.com/facebook/prepack" rel="nofollow noreferrer" target="_blank">prepack</a> &#x4E86;&#xFF0C;&#x5B83;&#x7684;&#x601D;&#x8DEF;&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x6837;&#xFF1A;</p><p><strong><em>&#x628A;&#x4E0D;&#x4F9D;&#x8D56;&#x5916;&#x90E8;&#x73AF;&#x5883;&#x7684;&#x903B;&#x8F91;&#x63D0;&#x524D;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#xFF0C;&#x5E76;&#x628A;&#x8FD0;&#x7B97;&#x7ED3;&#x679C;&#x66FF;&#x6362;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6E90;&#x7801;&#x5904;&#xFF0C;&#x7136;&#x540E;&#x4ECE;&#x6E90;&#x7801;&#x4E2D;&#x79FB;&#x9664;&#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#x3002;</em></strong></p><h2 id="articleHeader5">2. prepack</h2><h3 id="articleHeader6">2.1 &#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g prepack" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> -g prepack</code></pre><h3 id="articleHeader7">2.2 &#x7F16;&#x8BD1;&#xFF08;&#x6253;&#x5370;&#x5728;&#x547D;&#x4EE4;&#x884C;&#xFF09;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prepack script.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">prepack <span class="hljs-keyword">script</span>.js</code></pre><h3 id="articleHeader8">2.3 &#x7F16;&#x8BD1;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prepack script.js --out script-processed.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">prepack <span class="hljs-keyword">script</span>.js <span class="hljs-comment">--out script-processed.js</span></code></pre><h3 id="articleHeader9">2.4 &#x793A;&#x4F8B;</h3><p>&#x6E90;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(() =&gt; {
  const secondsOfOneDay = 24 * 60 * 60;

  window.getSecondsOfDays = days =&gt; days * secondsOfOneDay;
})();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> secondsOfOneDay = <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>;

  <span class="hljs-built_in">window</span>.getSecondsOfDays = <span class="hljs-function"><span class="hljs-params">days</span> =&gt;</span> days * secondsOfOneDay;
})();</code></pre><p>&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
  var _$0 = this;

  var _1 = days =&gt; {
    return days * 86400;
  };

  _$0.getSecondsOfDays = _1;
}).call(this);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _$<span class="hljs-number">0</span> = <span class="hljs-keyword">this</span>;

  <span class="hljs-keyword">var</span> _1 = <span class="hljs-function"><span class="hljs-params">days</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> days * <span class="hljs-number">86400</span>;
  };

  _$<span class="hljs-number">0.</span>getSecondsOfDays = _1;
}).call(<span class="hljs-keyword">this</span>);</code></pre><h3 id="articleHeader10">2.5 &#x914D;&#x5408;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x4E00;&#x8D77;&#x4F7F;&#x7528;</h3><ul><li><a href="https://github.com/gajus/prepack-webpack-plugin" rel="nofollow noreferrer" target="_blank">prepack-webpack-plugin</a>: A webpack plugin for Prepack</li><li><a href="https://github.com/olstenlarck/rollup-plugin-prepack" rel="nofollow noreferrer" target="_blank">rollup-plugin-prepack</a>: A Rollup plugin for Prepack</li><li><a href="https://marketplace.visualstudio.com/items?itemName=RobinMalfait.prepack-vscode" rel="nofollow noreferrer" target="_blank">prepack-vscode</a>: A Visual Studio code plugin for Prepack</li></ul><h3 id="articleHeader11">2.6 &#x95EE;&#x9898;</h3><ul><li>&#x76EE;&#x524D;&#x6700;&#x65B0;&#x7248;&#x672C;&#x662F; <code>0.2.51</code>&#xFF0C;&#x8FD8;&#x4E00;&#x76F4;&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x5F88;&#x591A;&#x529F;&#x80FD;&#x90FD;&#x8FD8;&#x6CA1;&#x6709;&#x5B9E;&#x73B0;&#xFF0C;&#x5305;&#x62EC;&#x6A21;&#x5757;&#x8F93;&#x5165;&#x8F93;&#x51FA;&#x7684;&#x4F18;&#x5316;</li></ul><h2 id="articleHeader12">3. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶（9） - js 性能优化利器：prepack

## 原文链接
[https://segmentfault.com/a/1190000016408261](https://segmentfault.com/a/1190000016408261)


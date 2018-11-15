---
title: 前端性能优化—js代码打包
reprint: true
categories: reprint
abbrlink: 1b69f4ab
date: 2018-11-02 02:30:12
---

{{% raw %}}
<p>&#x73B0;&#x5728;&#x7684; web &#x5E94;&#x7528;&#xFF0C;&#x5185;&#x5BB9;&#x4E00;&#x822C;&#x90FD;&#x5F88;&#x4E30;&#x5BCC;&#xFF0C;&#x7AD9;&#x70B9;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x8D44;&#x6E90;&#x4E5F;&#x7279;&#x522B;&#x591A;&#xFF0C;&#x5C24;&#x5176;&#x8981;&#x52A0;&#x8F7D;&#x5F88;&#x591A; js &#x6587;&#x4EF6;&#x3002;js &#x6587;&#x4EF6;&#x4ECE;&#x670D;&#x52A1;&#x7AEF;&#x83B7;&#x53D6;&#xFF0C;&#x4F53;&#x79EF;&#x5927;&#x5C0F;&#x51B3;&#x5B9A;&#x4E86;&#x4F20;&#x8F93;&#x7684;&#x5FEB;&#x6162;&#xFF1B;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x62FF;&#x5230; js &#x6587;&#x4EF6;&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x7ECF;&#x8FC7;&#x89E3;&#x538B;&#x7F29;&#x3001;&#x89E3;&#x6790;&#x3001;&#x7F16;&#x8BD1;&#x3001;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;<strong>&#x63A7;&#x5236; js &#x4EE3;&#x7801;&#x7684;&#x4F53;&#x79EF;</strong>&#x4EE5;&#x53CA;<strong>&#x6309;&#x9700;&#x52A0;&#x8F7D;</strong>&#x5BF9;&#x524D;&#x7AEF;&#x6027;&#x80FD;&#x4EE5;&#x53CA;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x662F;&#x5341;&#x5206;&#x7684;&#x91CD;&#x8981;&#x3002;</p><p>&#x672C;&#x6587;&#x4ECE; <code>Tree Shaking</code> &#x548C; <code>&#x4EE3;&#x7801;&#x5206;&#x5272;</code> &#x4E24;&#x90E8;&#x5206;&#x4ECB;&#x7ECD; js &#x6253;&#x5305;&#x4F18;&#x5316;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x8DDF;&#x7740;&#x4E00;&#x8D77;&#x5B9E;&#x8DF5;&#x3002;<br>clone &#x4EE5;&#x4E0B;&#x9879;&#x76EE; <a href="https://github.com/jasonintju/optimizing-js" rel="nofollow noreferrer" target="_blank">https://github.com/jasonintju...</a>&#xFF0C;&#x5C31;&#x662F;&#x4E2A;&#x7B80;&#x5355;&#x7684; React SPA&#xFF0C;&#x4E00;&#x770B;&#x5C31;&#x61C2;&#x3002;</p><h2 id="articleHeader0">Tree Shaking</h2><p>Tree Shaking &#x7B80;&#x5355;&#x7406;&#x89E3;&#x5C31;&#x662F;&#xFF1A;&#x6253;&#x5305;&#x65F6;&#x628A;&#x4E00;&#x4E9B;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x7684;&#x4EE3;&#x7801;&#x5220;&#x9664;&#x6389;&#xFF0C;&#x4FDD;&#x8BC1;&#x6253;&#x5305;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4F53;&#x79EF;&#x6700;&#x5C0F;&#x5316;&#x3002;&#x5176;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://juejin.im/post/5a4dc842518825698e7279a9" rel="nofollow noreferrer" target="_blank">Tree-Shaking&#x6027;&#x80FD;&#x4F18;&#x5316;&#x5B9E;&#x8DF5; - &#x539F;&#x7406;&#x7BC7;</a>&#x3002;</p><p>&#x9879;&#x76EE; clone&#x3001;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#x540E;&#xFF0C;&#x5148; <code>npm run build</code> &#x6253;&#x5305;&#x521D;&#x59CB;&#x4EE3;&#x7801;&#xFF0C;&#x5927;&#x5C0F;&#x53CA;&#x5206;&#x5E03;&#x5982;&#x4E0B;&#xFF08;&#x5176;&#x4E2D; <code>src/utils/utils.js</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6253;&#x5305;&#x540E;&#x5927;&#x5C0F;&#x4E3A;<code>11.72Kb</code>&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgAFs?w=2786&amp;h=1432" src="https://static.alili.tech/img/bVbgAFs?w=2786&amp;h=1432" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><code>src/containers/About/test.js</code>&#x53EA;&#x5F15;&#x7528;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x5230;&#xFF0C;<code>src/utils/utils.js</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x4E2A;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x96C6;&#xFF0C;&#x6709;&#x5F88;&#x591A;&#x5F88;&#x591A;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x53EA;&#x7528;&#x5230;&#x4E86;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x3002;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x90FD;&#x88AB;&#x6253;&#x5305;&#x8FDB; <code>main.js</code> &#x4E86;&#xFF0C;&#x663E;&#x7136;&#xFF0C;&#x8FD9;&#x662F;&#x5F88;&#x5927;&#x7684;&#x5197;&#x4F59;&#xFF0C;&#x6B63;&#x597D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>Tree Shaking</code> &#x4F18;&#x5316;&#x3002;</p><h3 id="articleHeader1">&#x4FEE;&#x6539; <code>.babelrc</code></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [[&quot;env&quot;, { &quot;modules&quot;: false }], &quot;react&quot;, &quot;stage-0&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">&quot;presets&quot;</span>: [[<span class="hljs-string">&quot;env&quot;</span>, { <span class="hljs-string">&quot;modules&quot;</span>: <span class="hljs-literal">false</span> }], <span class="hljs-string">&quot;react&quot;</span>, <span class="hljs-string">&quot;stage-0&quot;</span>]
}</code></pre><h3 id="articleHeader2">&#x4FEE;&#x6539; <code>package.json</code></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;optimizing-js&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;sideEffects&quot;: false
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;optimizing-js&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;sideEffects&quot;</span>: <span class="hljs-literal">false</span>
}</code></pre><p>&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x4E4B;&#x540E;&#xFF0C;&#x8868;&#x793A;&#x6240;&#x6709;&#x7684; module &#x90FD;&#x662F;&#x65E0;&#x526F;&#x4F5C;&#x7528;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x5230;&#x7684; module &#x90FD;&#x53EF;&#x4EE5;&#x5220;&#x6389;&#xFF0C;&#x6B64;&#x65F6;&#x6253;&#x5305;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgAFI?w=2786&amp;h=1428" src="https://static.alili.tech/img/bVbgAFI?w=2786&amp;h=1428" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
// &#x53EA;&#x5F15;&#x5165;&#x4E86; arraySum&#xFF0C; utils.js &#x4E2D;&#x7684;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5305;
import { arraySum } from &apos;@utils/utils&apos;;
import &apos;./test&apos;; // &#x5F15;&#x7528;&#xFF0C;&#x201C;&#x672A;&#x4F7F;&#x7528;&#x201D;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5305;
import &apos;./About.scss&apos;; // &#x5F15;&#x7528;&#xFF0C;&#x201C;&#x672A;&#x4F7F;&#x7528;&#x201D;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5305;

class About extends React.Component {
  render() {
    const sum = arraySum([12, 3]);
    return (
      &lt;div className=&quot;page-about&quot;&gt;
        &lt;h1&gt;About Page&lt;/h1&gt;
        &lt;div&gt; 12 plus 3 equals {sum}&lt;/div&gt;
      &lt;/div&gt;
    );
  }
}
export default About;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-comment">// &#x53EA;&#x5F15;&#x5165;&#x4E86; arraySum&#xFF0C; utils.js &#x4E2D;&#x7684;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5305;</span>
<span class="hljs-keyword">import</span> { arraySum } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@utils/utils&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./test&apos;</span>; <span class="hljs-comment">// &#x5F15;&#x7528;&#xFF0C;&#x201C;&#x672A;&#x4F7F;&#x7528;&#x201D;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5305;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./About.scss&apos;</span>; <span class="hljs-comment">// &#x5F15;&#x7528;&#xFF0C;&#x201C;&#x672A;&#x4F7F;&#x7528;&#x201D;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5305;</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">About</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> sum = arraySum([<span class="hljs-number">12</span>, <span class="hljs-number">3</span>]);
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;page-about&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>About Page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> 12 plus 3 equals {sum}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> About;</code></pre><p>&#x5982;&#x4E0A;&#x9762;&#x6CE8;&#x91CA;&#x6240;&#x8BF4;&#xFF0C;Tree Shaking &#x8BA4;&#x4E3A;&#x8FD9;&#x4E9B;&#x662F;&#x6CA1;&#x6709;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x5220;&#x6389;&#x3002;&#x4F46;&#x4E8B;&#x5B9E;&#x4E0A;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4E0D;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;<code>test.js</code> &#x53EF;&#x4EE5;&#x5220;&#x6389;&#xFF0C;&#x4F46;&#x662F; css&#x3001;scss &#x662F;&#x6709;&#x7528;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x5F15;&#x5165;&#x5373;&#x53EF;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E00;&#x4E0B; <code>sideEffects</code> &#x7684;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;sideEffects&quot;: [
    &quot;*.css&quot;, &quot;*.scss&quot;, &quot;*.sass&quot;
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;sideEffects&quot;</span>: [
    <span class="hljs-string">&quot;*.css&quot;</span>, <span class="hljs-string">&quot;*.scss&quot;</span>, <span class="hljs-string">&quot;*.sass&quot;</span>
  ]
}</code></pre><p>&#x8868;&#x793A;&#xFF0C;&#x9664;&#x4E86;<code>[]</code>&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x7C7B;&#x578B;&#xFF09;&#xFF0C;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#x90FD;&#x662F;&#x65E0;&#x526F;&#x4F5C;&#x7528;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x653E;&#x5FC3;&#x5220;&#x6389;&#x3002;&#x6B64;&#x65F6;&#x6253;&#x5305;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgAGm?w=2794&amp;h=1432" src="https://static.alili.tech/img/bVbgAGm?w=2794&amp;h=1432" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;css &#x7B49;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x73B0;&#x5728;&#x5982;&#x671F;&#x6253;&#x5305;&#x8FDB;&#x53BB;&#x4E86;&#x3002;&#x5982;&#x679C;&#x6709;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#x6709;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x5E0C;&#x671B;&#x6253;&#x5305;&#x8FDB;&#x53BB;&#xFF0C;&#x5728; <code>sideEffects: []</code> &#x4E2D;&#x6DFB;&#x52A0;&#x5373;&#x53EF;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x5177;&#x4F53;&#x7684;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x6216;&#x8005;&#x67D0;&#x79CD;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x3002;</p><p>&#x5173;&#x4E8E;&#x4E3A;&#x4EC0;&#x4E48;&#x4FEE;&#x6539;&#x8FD9;&#x4E24;&#x4E2A;&#x5730;&#x65B9;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0; Tree Shaking &#x7684;&#x6548;&#x679C;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E00;&#x4E0B;<a href="https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/" rel="nofollow noreferrer" target="_blank">https://developers.google.com...</a> &#x6216;&#x8005;&#x5176;&#x4ED6;&#x6587;&#x7AE0;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x505A;&#x8BE6;&#x7EC6;&#x89E3;&#x91CA;&#x4E86;&#x3002;</p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x5206;&#x5272;</h2><p>&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6240;&#x6709;&#x7684;&#x8D44;&#x6E90;&#x90FD;&#x6253;&#x5305;&#x5728;&#x4E00;&#x4E2A; js &#x91CC;&#x9762;&#xFF0C;&#x6BEB;&#x65E0;&#x7591;&#x95EE;&#xFF0C;&#x4F53;&#x79EF;&#x4F1A;&#x975E;&#x5E38;&#x5E9E;&#x5927;&#xFF0C;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x4F1A;&#x6709;&#x5F88;&#x957F;&#x65F6;&#x95F4;&#x767D;&#x5C4F;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x6781;&#x5DEE;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x8981;&#x4EE3;&#x7801;&#x5206;&#x5272;&#xFF0C;&#x5206;&#x6210;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5C0F;&#x7684; js&#xFF0C;&#x4F18;&#x5316;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x3002;</p><h3 id="articleHeader4">&#x5206;&#x79BB;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4EE3;&#x7801;</h3><p>&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4EE3;&#x7801;&#x5355;&#x72EC;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x548C;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x5206;&#x79BB;&#xFF0C;&#x51CF;&#x5C11; js &#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x3002;&#x5728; <code>webpack.base.conf.js</code> &#x4E2D;&#x589E;&#x52A0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {...},
optimization: {
  splitChunks: {
    cacheGroups: {
      venders: {
        test: /node_modules/,
        name: &apos;vendors&apos;,
        chunks: &apos;all&apos;
      }
    }
  }
},
plugins: ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {...},
<span class="hljs-attr">optimization</span>: {
  <span class="hljs-attr">splitChunks</span>: {
    <span class="hljs-attr">cacheGroups</span>: {
      <span class="hljs-attr">venders</span>: {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendors&apos;</span>,
        <span class="hljs-attr">chunks</span>: <span class="hljs-string">&apos;all&apos;</span>
      }
    }
  }
},
<span class="hljs-attr">plugins</span>: ...</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgA1j?w=2868&amp;h=1436" src="https://static.alili.tech/img/bVbgA1j?w=2868&amp;h=1436" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader5">&#x52A8;&#x6001;&#x5BFC;&#x5165;</h3><p>&#x4F7F;&#x7528; <a href="https://github.com/tc39/proposal-dynamic-import" rel="nofollow noreferrer" target="_blank">ECMAScript &#x63D0;&#x6848;</a> &#x7684; <code>dynamic import</code> &#x8BED;&#x6CD5;&#x53EF;&#x4EE5;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x4E1A;&#x52A1;&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/containers/App/App.js

// &#x6CE8;&#x91CA;&#x6389;&#x6B64;&#x884C;&#x4EE3;&#x7801;
// import About from &apos;@containers/About/About&apos;;

// &#x4FEE;&#x6539;&#x6A21;&#x5757;&#x4E3A;&#x52A8;&#x6001;&#x5BFC;&#x5165;&#x5F62;&#x5F0F;
&lt;Route path=&quot;/about&quot; render={() =&gt; import(/* webpackChunkName: &quot;about&quot; */ &apos;@containers/About/About&apos;).then(module =&gt; module.default)}/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/containers/App/App.js</span>

<span class="hljs-comment">// &#x6CE8;&#x91CA;&#x6389;&#x6B64;&#x884C;&#x4EE3;&#x7801;</span>
<span class="hljs-comment">// import About from &apos;@containers/About/About&apos;;</span>

<span class="hljs-comment">// &#x4FEE;&#x6539;&#x6A21;&#x5757;&#x4E3A;&#x52A8;&#x6001;&#x5BFC;&#x5165;&#x5F62;&#x5F0F;</span>
&lt;Route path=<span class="hljs-string">&quot;/about&quot;</span> render={() =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;about&quot; */</span> <span class="hljs-string">&apos;@containers/About/About&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> <span class="hljs-built_in">module</span>.default)}/&gt;</code></pre><p>&#x6B64;&#x65F6;&#x6253;&#x5305;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgBRB?w=2862&amp;h=1432" src="https://static.alili.tech/img/bVbgBRB?w=2862&amp;h=1432" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x80FD;&#x770B;&#x5230;&#xFF0C;<code>&lt;About&gt; &#x7EC4;&#x4EF6;</code>&#x5DF2;&#x7ECF;&#x88AB; webpack &#x5355;&#x72EC;&#x6253;&#x5305;&#x51FA;&#x5BF9;&#x5E94;&#x7684; js &#x6587;&#x4EF6;&#x4E86;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x7ED3;&#x5408; <code>react-router</code>&#xFF0C;&#x5206;&#x79BB; <code>&lt;About&gt; &#x7EC4;&#x4EF6;</code>&#x7684;&#x540C;&#x65F6;&#x4E5F;&#x505A;&#x5230;&#x4E86;<strong>&#x6309;&#x9700;&#x52A0;&#x8F7D;</strong>&#xFF1A;&#x5F53;&#x8BBF;&#x95EE; About &#x9875;&#x9762;&#x65F6;&#xFF0C;<code>about.js</code> &#x624D;&#x4F1A;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x5730;&#x4F7F;&#x7528;&#x4E86; <code>dynamic import</code>&#xFF0C;&#x5F88;&#x591A;&#x8FB9;&#x754C;&#x60C5;&#x51B5;&#x6CA1;&#x8003;&#x8651;&#x8FDB;&#x53BB;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x52A0;&#x8F7D;&#x8FDB;&#x5EA6;&#x3001;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x3001;&#x8D85;&#x65F6;&#x7B49;&#x5904;&#x7406;&#x3002;&#x53EF;&#x4EE5;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x628A;&#x8FD9;&#x4E9B;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x90FD;&#x5305;&#x542B;&#x8FDB;&#x53BB;&#x3002;&#x793E;&#x533A;&#x6709;&#x4E2A;&#x5F88;&#x68D2;&#x7684; <a href="https://github.com/jamiebuilds/react-loadable" rel="nofollow noreferrer" target="_blank">react-loadable</a>&#xFF0C;&#x5927;&#x6811;&#x5E95;&#x4E0B;&#x597D;&#x4E58;&#x51C9;~</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i react-loadable

// src/containers/App/App.js
import Loadable from &apos;react-loadable&apos;;

// &#x4EE3;&#x7801;&#x5206;&#x5272; &amp; &#x5F02;&#x6B65;&#x52A0;&#x8F7D;
const LoadableAbout = Loadable({
  loader: () =&gt; import(/* webpackChunkName: &quot;about&quot; */ &apos;@containers/About/About&apos;),
  loading() {
    return &lt;div&gt;Loading...&lt;/div&gt;;
  }
});

class App extends React.Component {
  render() {
    return (
      &lt;BrowserRouter&gt;
        &lt;div&gt;
          &lt;Header /&gt;

          &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
          &lt;Route path=&quot;/docs&quot; component={Docs} /&gt;
          &lt;Route path=&quot;/about&quot; component={LoadableAbout} /&gt;
        &lt;/div&gt;
      &lt;/BrowserRouter&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>npm i react-loadable

<span class="hljs-comment">// src/containers/App/App.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">Loadable</span> from <span class="hljs-symbol">&apos;react</span>-loadable&apos;;

<span class="hljs-comment">// &#x4EE3;&#x7801;&#x5206;&#x5272; &amp; &#x5F02;&#x6B65;&#x52A0;&#x8F7D;</span>
const <span class="hljs-type">LoadableAbout</span> = <span class="hljs-type">Loadable</span>({
  loader: () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;about&quot; */</span> &apos;<span class="hljs-meta">@containers</span>/<span class="hljs-type">About</span>/<span class="hljs-type">About</span>&apos;),
  loading() {
    <span class="hljs-keyword">return</span> &lt;div&gt;<span class="hljs-type">Loading</span>...&lt;/div&gt;;
  }
});

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">BrowserRouter</span>&gt;
        &lt;div&gt;
          &lt;<span class="hljs-type">Header</span> /&gt;

          &lt;<span class="hljs-type">Route</span> exact path=<span class="hljs-string">&quot;/&quot;</span> component={<span class="hljs-type">Home</span>} /&gt;
          &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">&quot;/docs&quot;</span> component={<span class="hljs-type">Docs</span>} /&gt;
          &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">&quot;/about&quot;</span> component={<span class="hljs-type">LoadableAbout</span>} /&gt;
        &lt;/div&gt;
      &lt;/<span class="hljs-type">BrowserRouter</span>&gt;
    );
  }
}</code></pre><p><a href="https://github.com/jamiebuilds/react-loadable#loadablecomponentpreload" rel="nofollow noreferrer" target="_blank">react-loadable</a> &#x8FD8;&#x63D0;&#x4F9B;&#x4E86; preload &#x529F;&#x80FD;&#x3002;&#x5047;&#x5982;&#x6709;&#x7EDF;&#x8BA1;&#x6570;&#x636E;&#x663E;&#x793A;&#xFF0C;&#x7528;&#x6237;&#x5728;&#x8FDB;&#x5165;&#x9996;&#x9875;&#x4E4B;&#x540E;&#x5927;&#x6982;&#x7387;&#x4F1A;&#x8FDB;&#x5165; About &#x9875;&#x9762;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x5728;&#x9996;&#x9875;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x7684;&#x65F6;&#x5019;&#x53BB;&#x52A0;&#x8F7D; <code>about.js</code>&#xFF0C;&#x8FD9;&#x6837;&#x7B49;&#x7528;&#x6237;&#x8DF3;&#x5230; About &#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;js &#x8D44;&#x6E90;&#x90FD;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x597D;&#x4E86;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x4F1A;&#x66F4;&#x597D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/containers/App/App.js
componentDidMount() {
  LoadableAbout.preload();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-comment">// src/containers/App/App.js</span>
<span class="hljs-selector-tag">componentDidMount</span>() {
  <span class="hljs-selector-tag">LoadableAbout</span><span class="hljs-selector-class">.preload</span>();
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgB8d?w=2878&amp;h=1448" src="https://static.alili.tech/img/bVbgB8d?w=2878&amp;h=1448" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x6709;&#x540C;&#x5B66;&#x5BF9;Network&#x9762;&#x677F;&#x4E0D;&#x662F;&#x5F88;&#x719F;&#x6089;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B; <a href="https://segmentfault.com/a/1190000008407729">Chrome DevTools &#x2014; Network</a>&#x3002;</p><h3 id="articleHeader6">&#x63D0;&#x53D6;&#x590D;&#x7528;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;</h3><p>&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x5355;&#x72EC;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x4E2D;&#x4E5F;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x590D;&#x7528;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5178;&#x578B;&#x7684;&#x6BD4;&#x5982;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x5E93; <code>utils.js</code>&#x3002;&#x73B0;&#x5728;&#xFF0C;<code>About &#x7EC4;&#x4EF6;</code>&#x548C; <code>Docs &#x7EC4;&#x4EF6;</code>&#x90FD;&#x5F15;&#x7528;&#x4E86; <code>utils.js</code>&#xFF0C;webpack &#x53EA;&#x6253;&#x5305;&#x4E86;&#x4E00;&#x4EFD; <code>utils.js</code> &#x5728; <code>main.js</code> &#x91CC;&#x9762;&#xFF0C;main.js &#x5728;&#x9996;&#x9875;&#x5C31;&#x88AB;&#x52A0;&#x8F7D;&#x4E86;&#xFF0C;&#x5176;&#x4ED6;&#x9875;&#x9762;&#x6709;&#x4F7F;&#x7528;&#x5230; utils.js &#x81EA;&#x7136;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x5F15;&#x7528;&#x5230;&#xFF0C;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x7684;&#x9884;&#x671F;&#x3002;&#x4F46;&#x662F;&#x76EE;&#x524D;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x628A; About &#x9875;&#x9762;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x628A; Docs &#x9875;&#x9762;&#x4E5F;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x4E86;&#x4F1A;&#x600E;&#x4E48;&#x6837;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/containers/App/App.js
// &#x6CE8;&#x91CA;&#x6389;&#x6B64;&#x884C;&#x4EE3;&#x7801;
// import Docs from &apos;@containers/Docs/Docs&apos;;

const LoadableDocs = Loadable({
  loader: () =&gt; import(/* webpackChunkName: &quot;docs&quot; */ &apos;@containers/Docs/Docs&apos;),
  loading() {
    return &lt;div&gt;Loading...&lt;/div&gt;;
  }
});

class App extends React.Component {
  render() {
    return (
      &lt;BrowserRouter&gt;
        &lt;div&gt;
          &lt;Header /&gt;

          &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
          &lt;Route path=&quot;/docs&quot; component={LoadableDocs} /&gt;
          &lt;Route path=&quot;/about&quot; component={LoadableAbout} /&gt;
        &lt;/div&gt;
      &lt;/BrowserRouter&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/containers/App/App.js</span>
<span class="hljs-comment">// &#x6CE8;&#x91CA;&#x6389;&#x6B64;&#x884C;&#x4EE3;&#x7801;</span>
<span class="hljs-comment">// import Docs from &apos;@containers/Docs/Docs&apos;;</span>

<span class="hljs-keyword">const</span> LoadableDocs = Loadable({
  <span class="hljs-attr">loader</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;docs&quot; */</span> <span class="hljs-string">&apos;@containers/Docs/Docs&apos;</span>),
  loading() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;BrowserRouter&gt;
        &lt;div&gt;
          &lt;Header /&gt;

          &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
          &lt;Route path=&quot;/docs&quot; component={LoadableDocs} /&gt;
          &lt;Route path=&quot;/about&quot; component={LoadableAbout} /&gt;
        &lt;/div&gt;
      &lt;/BrowserRouter&gt;
    );
  }
}</code></pre><p>&#x6B64;&#x65F6;&#x6253;&#x5305;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgFua?w=2868&amp;h=1432" src="https://static.alili.tech/img/bVbgFua?w=2868&amp;h=1432" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x80FD;&#x591F;&#x770B;&#x5230;&#xFF0C;about.js &#x548C; docs.js &#x91CC;&#x9762;&#x90FD;&#x6253;&#x5305;&#x4E86; utils.js&#xFF0C;&#x91CD;&#x590D;&#x4E86;&#xFF01;<br>&#x5728; <code>webpack.base.conf.js</code> &#x4E2D;&#x589E;&#x52A0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {...},
optimization: {
  splitChunks: {
    cacheGroups: {
      venders: {
        test: /node_modules/,
        name: &apos;vendors&apos;,
        chunks: &apos;all&apos;
      },
      default: {
        minSize: 0,
        minChunks: 2,
        reuseExistingChunk: true,
        name: &apos;utils&apos;
      }
    }
  }
},
plugins: ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {...},
<span class="hljs-attr">optimization</span>: {
  <span class="hljs-attr">splitChunks</span>: {
    <span class="hljs-attr">cacheGroups</span>: {
      <span class="hljs-attr">venders</span>: {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendors&apos;</span>,
        <span class="hljs-attr">chunks</span>: <span class="hljs-string">&apos;all&apos;</span>
      },
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">minSize</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;utils&apos;</span>
      }
    }
  }
},
<span class="hljs-attr">plugins</span>: ...</code></pre><p>&#x518D;&#x6253;&#x5305;&#x770B;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgFu9?w=2868&amp;h=1436" src="https://static.alili.tech/img/bVbgFu9?w=2868&amp;h=1436" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>utils.js &#x4E5F;&#x88AB;&#x5355;&#x72EC;&#x6253;&#x5305;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#x3002;</p><h3 id="articleHeader7">&#x5206;&#x79BB;&#x975E;&#x9996;&#x9875;&#x4F7F;&#x7528;&#x4E14;&#x590D;&#x7528;&#x7A0B;&#x5EA6;&#x5C0F;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</h3><p>&#x5047;&#x5982;&#xFF0C;&#x73B0;&#x5728; Docs.js &#x5F15;&#x7528;&#x4E86; <code>lodash</code> &#x8FD9;&#x4E2A;&#x4E09;&#x65B9;&#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import _ from &apos;lodash&apos;;
import { arraySum } from &apos;@utils/utils&apos;;
import &apos;./Docs.scss&apos;;

class Docs extends React.Component {
  render() {
    const sum = arraySum([1, 3]);
    const b = _.sum([1, 3]);
    return (
      &lt;div className=&quot;page-docs&quot;&gt;
        &lt;h1&gt;Docs Page&lt;/h1&gt;
        &lt;div&gt; 1 plus 3 equals {sum}&lt;/div&gt;
        &lt;br /&gt;
        &lt;div&gt;use _.sum, 1 plus 3 equals {b} too.&lt;/div&gt;
      &lt;/div&gt;
    );
  }
}
export default Docs;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash&apos;</span>;
<span class="hljs-keyword">import</span> { arraySum } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@utils/utils&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./Docs.scss&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Docs</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> sum = arraySum([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>]);
    <span class="hljs-keyword">const</span> b = _.sum([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>]);
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;page-docs&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Docs Page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> 1 plus 3 equals {sum}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>use _.sum, 1 plus 3 equals {b} too.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Docs;</code></pre><p>&#x6253;&#x5305;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgFxI?w=2868&amp;h=1434" src="https://static.alili.tech/img/bVbgFxI?w=2868&amp;h=1434" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>lodash.js &#x53EA;&#x5728; Docs &#x9875;&#x9762;&#x4F7F;&#x7528;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x80FD; Docs &#x9875;&#x9762;&#x8BBF;&#x95EE;&#x91CF;&#x5F88;&#x5C11;&#xFF0C;&#x628A; lodash.js &#x6253;&#x5305;&#x5728;&#x9996;&#x9875;&#x5C31;&#x4F1A;&#x52A0;&#x8F7D;&#x7684; venders.js &#x91CC;&#x9762;&#xFF0C;&#x5B9E;&#x5728;&#x4E0D;&#x662F;&#x660E;&#x667A;&#x4E4B;&#x4E3E;&#x3002;</p><p>&#x4FEE;&#x6539; <code>webpack.base.conf.js</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
venders: {
  test: /node_modules\/(?!(lodash)\/)/, // &#x53BB;&#x9664; lodash&#xFF0C;&#x5269;&#x4F59;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x6253;&#x6210;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x547D;&#x540D;&#x4E3A; vendors-common
  name: &apos;vendors-common&apos;,
  chunks: &apos;all&apos;
},
lodash: {
  test: /node_modules\/lodash\//, // lodash &#x5E93;&#x5355;&#x72EC;&#x6253;&#x5305;&#xFF0C;&#x5E76;&#x547D;&#x540D;&#x4E3A; vender-lodash
  name: &apos;vender-lodash&apos;
},
default: {
  minSize: 0,
  minChunks: 2,
  reuseExistingChunk: true,
  name: &apos;utils&apos;
}
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">...
venders: {
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/node_modules\/(?!(lodash)\/)/</span>, <span class="hljs-comment">// &#x53BB;&#x9664; lodash&#xFF0C;&#x5269;&#x4F59;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x6253;&#x6210;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x547D;&#x540D;&#x4E3A; vendors-common</span>
  name: <span class="hljs-string">&apos;vendors-common&apos;</span>,
  <span class="hljs-attr">chunks</span>: <span class="hljs-string">&apos;all&apos;</span>
},
<span class="hljs-attr">lodash</span>: {
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/node_modules\/lodash\//</span>, <span class="hljs-comment">// lodash &#x5E93;&#x5355;&#x72EC;&#x6253;&#x5305;&#xFF0C;&#x5E76;&#x547D;&#x540D;&#x4E3A; vender-lodash</span>
  name: <span class="hljs-string">&apos;vender-lodash&apos;</span>
},
<span class="hljs-attr">default</span>: {
  <span class="hljs-attr">minSize</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;utils&apos;</span>
}
...</code></pre><p>&#x6B64;&#x65F6;&#x628A; lodash &#x5355;&#x72EC;&#x6253;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x4E14;&#x914D;&#x5408; Docs &#x9875;&#x9762;&#x7684;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x8FBE;&#x5230;&#x4E86;&#x7406;&#x60F3;&#x7684;&#x52A0;&#x8F7D;&#x6548;&#x679C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgFAA?w=2870&amp;h=1442" src="https://static.alili.tech/img/bVbgFAA?w=2870&amp;h=1442" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader8">&#x7F13;&#x5B58;</h3><p>&#x9879;&#x76EE;&#x6253;&#x5305;&#x540E;&#xFF0C;&#x8D44;&#x6E90;&#x90E8;&#x7F72;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x9700;&#x8981;&#x5411;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#x4E0B;&#x8F7D;&#x8FD9;&#x4E9B;&#x8D44;&#x6E90;&#xFF0C;&#x7528;&#x6237;&#x624D;&#x80FD;&#x770B;&#x5230;&#x5185;&#x5BB9;&#x3002;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x53EF;&#x4EE5;&#x5927;&#x5927;&#x51CF;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x8BF7;&#x6C42;&#x548C;&#x65F6;&#x95F4;&#x803D;&#x6401;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x8D44;&#x6E90;&#x6709;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x518D;&#x53BB;&#x4E0B;&#x8F7D;&#x3002;&#x533A;&#x5206;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x6709;&#x66F4;&#x65B0;&#xFF0C;&#x4F7F;&#x7528; <code>&#x6587;&#x4EF6;&#x540D; + hash</code> &#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x76EE;&#x7684;&#x3002;&#x672C;&#x6848;&#x4F8B;&#x4E2D;&#xFF0C;&#x5DF2;&#x7ECF;&#x4F7F;&#x7528;&#x4E86; <code>&apos;[name].[contenthash:8].js&apos;</code>&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x5728;&#x6253;&#x5305;&#x7684;&#x65F6;&#x5019;&#xFF0C;webpack&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x6709;&#x65F6;&#x5019;&#x4F1A;&#x5BFC;&#x81F4;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x51FA;&#x73B0;&#xFF0C;&#x5982;&#xFF1A;&#x4EC0;&#x4E48;&#x5185;&#x5BB9;&#x90FD;&#x6CA1;&#x6539;&#xFF0C;&#x4E24;&#x6B21; build &#x4EE3;&#x7801;&#x7684; hash &#x4E0D;&#x4E00;&#x6837;&#xFF1B;&#x6216;&#x8005;&#x662F;&#xFF0C;&#x4FEE;&#x6539;&#x4E86; a &#x6587;&#x4EF6;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5374;&#x5BFC;&#x81F4;&#x4E86;&#x67D0;&#x4E9B;&#x672A;&#x4FEE;&#x6539;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x7684; hash &#x4E5F;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x3002;<a href="https://webpack.js.org/concepts/manifest/" rel="nofollow noreferrer" target="_blank">This is caused by the injection of the runtime and manifest which changes every build.</a></p><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x4F7F;&#x7528;&#x7684; webpack &#x7248;&#x672C;&#x4E0D;&#x540C;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x6253;&#x5305;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x8F83;&#x65B0;&#x7684;&#x7248;&#x672C;&#x6216;&#x8BB8;&#x6CA1;&#x6709;&#x8FD9;&#x79CD; hash &#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x4E3A;&#x4E86;&#x5B89;&#x5168;&#x8D77;&#x89C1;&#xFF0C;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x6309;&#x7167;&#x4E0B;&#x9762;&#x7684;&#x6B65;&#x9AA4;&#x5904;&#x7406;&#x4E00;&#x4E0B;&#x3002;</blockquote><h4>&#x5206;&#x79BB; webpack runtimeChunk code</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.conf.js
optimization: {
  runtimeChunk: {
    name: &apos;manifest&apos;
  },
  splitChunks: {...}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.base.conf.js</span>
optimization: {
  <span class="hljs-attr">runtimeChunk</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;manifest&apos;</span>
  },
  <span class="hljs-attr">splitChunks</span>: {...}
}</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x80FD;&#x8FBE;&#x5230;&#xFF1A;&#x4FEE;&#x6539;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x6709;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x548C; manifest.js &#x6587;&#x4EF6;&#x7684; hash &#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#x7684; hash &#x4E0D;&#x53D8;&#x3002;<br>&#x6253;&#x5305;&#x524D;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgFJ2?w=1034&amp;h=312" src="https://static.alili.tech/img/bVbgFJ2?w=1034&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// About.scss
.page-about {
  padding-left: 30px;
  color: #545880; // &#x4FEE;&#x6539;&#x5B57;&#x4F53;&#x989C;&#x8272;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="scss hljs"><code class="scss"><span class="hljs-comment">// About.scss</span>
<span class="hljs-selector-class">.page-about</span> {
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#545880</span>; <span class="hljs-comment">// &#x4FEE;&#x6539;&#x5B57;&#x4F53;&#x989C;&#x8272;</span>
}</code></pre><p>&#x4FEE;&#x6539;&#x540E;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgFKG?w=1046&amp;h=308" src="https://static.alili.tech/img/bVbgFKG?w=1046&amp;h=308" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>HashedModuleIdsPlugin</h4><p>&#x589E;&#x52A0;&#x3001;&#x5220;&#x9664;&#x4E00;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x4E0D;&#x76F8;&#x5173;&#x6587;&#x4EF6;&#x7684; hash &#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; webpack &#x6253;&#x5305;&#x65F6;&#xFF0C;&#x6309;&#x7167;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684;&#x987A;&#x5E8F;&#xFF0C;module.id &#x81EA;&#x589E;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x67D0;&#x4E9B;&#x6A21;&#x5757;&#x7684; module.id &#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x8FDB;&#x800C;&#x5BFC;&#x81F4;&#x6587;&#x4EF6;&#x7684; hash &#x53D8;&#x5316;&#x3002;</p><p>&#x89E3;&#x51B3;&#x65B9;&#x5F0F;&#xFF1A; &#x4F7F;&#x7528; webpack &#x5185;&#x7F6E;&#x7684; <a href="https://webpack.js.org/plugins/hashed-module-ids-plugin/" rel="nofollow noreferrer" target="_blank">HashedModuleIdsPlugin</a>&#xFF0C;&#x8BE5;&#x63D2;&#x4EF6;&#x57FA;&#x4E8E;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x751F;&#x6210;&#x76F8;&#x5E94;&#x7684; module.id&#xFF0C;&#x8FD9;&#x6837;&#x5982;&#x679C;&#x5185;&#x5BB9;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x52A0;&#x4E0A; module.id &#x4E5F;&#x6CA1;&#x53D8;&#x5316;&#xFF0C;&#x5219;&#x751F;&#x6210;&#x7684; hash &#x4E5F;&#x5C31;&#x4E0D;&#x4F1A;&#x53D8;&#x5316;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.conf.js
const webpack = require(&apos;webpack&apos;);
...
plugins: [new webpack.HashedModuleIdsPlugin(), new BundleAnalyzerPlugin()]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.prod.conf.js</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
...
plugins: [<span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(), <span class="hljs-keyword">new</span> BundleAnalyzerPlugin()]</code></pre><p>&#x5B8C;&#x6574;&#x7684;&#x4F18;&#x5316;&#x4EE3;&#x7801;&#x89C1; <a href="https://github.com/jasonintju/optimizing-js-example" rel="nofollow noreferrer" target="_blank">https://github.com/jasonintju...</a></p><hr><p>&#x6709;&#x7528;&#x7684;&#x6587;&#x7AE0;&#xFF1A;<br><a href="https://yi-jy.com/2018/06/09/webpack-split-chunks/" rel="nofollow noreferrer" target="_blank">webpack&#x5206;&#x79BB;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x53CA;&#x516C;&#x7528;&#x6587;&#x4EF6;</a><br><a href="https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/" rel="nofollow noreferrer" target="_blank">https://developers.google.com...</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端性能优化—js代码打包

## 原文链接
[https://segmentfault.com/a/1190000016330896](https://segmentfault.com/a/1190000016330896)


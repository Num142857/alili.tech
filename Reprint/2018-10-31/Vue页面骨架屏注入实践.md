---
title: Vue页面骨架屏注入实践
hidden: true
categories: [reprint]
slug: fa33c59a
date: 2018-10-31 02:30:10
---

{{< raw >}}
<p>&#x4F5C;&#x4E3A;&#x4E0E;&#x7528;&#x6237;&#x8054;&#x7CFB;&#x6700;&#x4E3A;&#x5BC6;&#x5207;&#x7684;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x662F;&#x6700;&#x503C;&#x5F97;&#x5173;&#x6CE8;&#x7684;&#x95EE;&#x9898;&#x3002;&#x5173;&#x4E8E;&#x9875;&#x9762;loading&#x72B6;&#x6001;&#x7684;&#x5C55;&#x793A;&#xFF0C;&#x4E3B;&#x6D41;&#x7684;&#x4E3B;&#x8981;&#x6709;loading&#x56FE;&#x548C;&#x8FDB;&#x5EA6;&#x6761;&#x4E24;&#x79CD;&#x3002;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684;APP&#x91C7;&#x7528;&#x4E86;&#x201C;&#x9AA8;&#x67B6;&#x5C4F;&#x201D;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5C55;&#x793A;&#x672A;&#x52A0;&#x8F7D;&#x5185;&#x5BB9;&#xFF0C;&#x7ED9;&#x4E88;&#x4E86;&#x7528;&#x6237;&#x7115;&#x7136;&#x4E00;&#x65B0;&#x7684;&#x4F53;&#x9A8C;&#x3002;&#x968F;&#x7740;SPA&#x5728;&#x524D;&#x7AEF;&#x754C;&#x7684;&#x9010;&#x6E10;&#x6D41;&#x884C;&#xFF0C;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x7684;&#x95EE;&#x9898;&#x4E5F;&#x5728;&#x56F0;&#x6270;&#x7740;&#x5F00;&#x53D1;&#x8005;&#x4EEC;&#x3002;&#x90A3;&#x4E48;&#x6709;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x529E;&#x6CD5;&#xFF0C;&#x4E5F;&#x80FD;&#x8BA9;SPA&#x7528;&#x4E0A;&#x9AA8;&#x67B6;&#x5C4F;&#x5462;&#xFF1F;&#x8FD9;&#x5C31;&#x662F;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5C06;&#x8981;&#x63A2;&#x8BA8;&#x7684;&#x95EE;&#x9898;&#x3002;</p><blockquote>&#x6587;&#x7AE0;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x540C;&#x6B65;&#x5230;<a href="https://github.com/jrainlau/vue-skeleton" rel="nofollow noreferrer" target="_blank">Github</a>&#xFF0C;&#x6B22;&#x8FCE;&#x67E5;&#x9605;~</blockquote><h1 id="articleHeader0">&#x4E00;&#x3001;&#x4F55;&#x4E3A;&#x9AA8;&#x67B6;&#x5C4F;</h1><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x9AA8;&#x67B6;&#x5C4F;&#x5C31;&#x662F;&#x5728;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x672A;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;&#x56FE;&#x5F62;&#x8FDB;&#x884C;&#x5360;&#x4F4D;&#xFF0C;&#x5F85;&#x5185;&#x5BB9;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x518D;&#x628A;&#x5B83;&#x66FF;&#x6362;&#x6389;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbaoxa?w=1000&amp;h=445" src="https://static.alili.tech/img/bVbaoxa?w=1000&amp;h=445" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x6280;&#x672F;&#x5728;&#x4E00;&#x4E9B;&#x4EE5;&#x5185;&#x5BB9;&#x4E3A;&#x4E3B;&#x7684;APP&#x548C;&#x7F51;&#x9875;&#x5E94;&#x7528;&#x8F83;&#x591A;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4EE5;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Vue&#x5DE5;&#x7A0B;&#x4E3A;&#x4F8B;&#xFF0C;&#x4E00;&#x8D77;&#x63A2;&#x7D22;&#x5982;&#x4F55;&#x5728;&#x57FA;&#x4E8E;Vue&#x7684;SPA&#x9879;&#x76EE;&#x4E2D;&#x5B9E;&#x73B0;&#x9AA8;&#x67B6;&#x5C4F;&#x3002;</p><h1 id="articleHeader1">&#x4E8C;&#x3001;&#x5206;&#x6790;Vue&#x9875;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x52A0;&#x8F7D;&#x8FC7;&#x7A0B;</h1><p>&#x4E3A;&#x4E86;&#x7B80;&#x5355;&#x8D77;&#x89C1;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>vue-cli</code>&#x642D;&#x914D;<code>webpack-simple</code>&#x8FD9;&#x4E2A;&#x6A21;&#x677F;&#x6765;&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack-simple vue-skeleton" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code style="word-break:break-word;white-space:initial">vue init webpack-<span class="hljs-built_in">simple</span> vue-skeleton</code></pre><p>&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x4FBF;&#x83B7;&#x5F97;&#x4E86;&#x4E00;&#x4E2A;&#x6700;&#x57FA;&#x672C;&#x7684;Vue&#x9879;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; src
&#x2502;   &#x251C;&#x2500;&#x2500; App.vue
&#x2502;   &#x251C;&#x2500;&#x2500; assets
&#x2502;   &#x2514;&#x2500;&#x2500; main.js
&#x251C;&#x2500;&#x2500; index.html
&#x2514;&#x2500;&#x2500; webpack.conf.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; src
&#x2502;   &#x251C;&#x2500;&#x2500; App<span class="hljs-selector-class">.vue</span>
&#x2502;   &#x251C;&#x2500;&#x2500; assets
&#x2502;   &#x2514;&#x2500;&#x2500; main<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.html</span>
&#x2514;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span></code></pre><p>&#x5B89;&#x88C5;&#x5B8C;&#x4E86;&#x4F9D;&#x8D56;&#x4EE5;&#x540E;&#xFF0C;&#x4FBF;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>npm run dev</code>&#x53BB;&#x8FD0;&#x884C;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E86;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5728;&#x8FD0;&#x884C;&#x9879;&#x76EE;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;&#x5165;&#x53E3;&#x7684;html&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x90FD;&#x5199;&#x4E86;&#x4E9B;&#x4EC0;&#x4E48;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;vue-skeleton&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
    &lt;script src=&quot;/dist/build.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-skeleton<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/dist/build.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;DOM&#x91CC;&#x9762;&#x6709;&#x4E14;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;<code>div#app</code>&#xFF0C;&#x5F53;js&#x88AB;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x6B64;<code>div#app</code>&#x4F1A;&#x88AB;<strong>&#x6574;&#x4E2A;&#x66FF;&#x6362;&#x6389;</strong>&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6765;&#x505A;&#x4E00;&#x4E0B;&#x5B9E;&#x9A8C;&#xFF0C;&#x5728;&#x6B64;div&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;p&gt;Hello skeleton&lt;/p&gt;
  &lt;p&gt;Hello skeleton&lt;/p&gt;
  &lt;p&gt;Hello skeleton&lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello skeleton<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello skeleton<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello skeleton<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6253;&#x5F00;chrome&#x7684;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#xFF0C;&#x5728;<code>Network</code>&#x91CC;&#x9762;&#x627E;&#x5230;<code>throttle</code>&#x529F;&#x80FD;&#xFF0C;&#x8C03;&#x8282;&#x7F51;&#x901F;&#x4E3A;&#x201C;Slow 3G&#x201D;&#xFF0C;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x5C31;&#x80FD;&#x770B;&#x5230;&#x9875;&#x9762;&#x5148;&#x662F;&#x5C55;&#x793A;&#x4E86;&#x4E09;&#x53E5;&#x201C;Hello skeleton&#x201D;&#xFF0C;&#x5F85;js&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#x624D;&#x4F1A;&#x66FF;&#x6362;&#x4E3A;&#x539F;&#x672C;&#x8981;&#x5C55;&#x793A;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbaozz?w=480&amp;h=127" src="https://static.alili.tech/img/bVbaozz?w=480&amp;h=127" alt="hzv4.gif" title="hzv4.gif" style="cursor:pointer;display:inline"></span></p><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x4E8E;&#x5982;&#x4F55;&#x5728;Vue&#x9875;&#x9762;&#x5B9E;&#x73B0;&#x9AA8;&#x67B6;&#x5C4F;&#xFF0C;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x5F88;&#x6E05;&#x6670;&#x7684;&#x601D;&#x8DEF;&#x2014;&#x2014;&#x5728;<code>div#app</code>&#x5185;&#x76F4;&#x63A5;&#x63D2;&#x5165;&#x9AA8;&#x67B6;&#x5C4F;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#x5373;&#x53EF;&#x3002;</p><h1 id="articleHeader2">&#x4E09;&#x3001;&#x6613;&#x7EF4;&#x62A4;&#x7684;&#x65B9;&#x6848;</h1><p>&#x663E;&#x7136;&#xFF0C;&#x624B;&#x52A8;&#x5728;<code>div#app</code>&#x91CC;&#x9762;&#x5199;&#x5165;&#x9AA8;&#x67B6;&#x5C4F;&#x5185;&#x5BB9;&#x662F;&#x4E0D;&#x79D1;&#x5B66;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x6269;&#x5C55;&#x6027;&#x5F3A;&#x4E14;&#x81EA;&#x52A8;&#x5316;&#x7684;&#x6613;&#x7EF4;&#x62A4;&#x65B9;&#x6848;&#x3002;&#x65E2;&#x7136;&#x662F;&#x5728;Vue&#x9879;&#x76EE;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5F53;&#x7136;&#x5E0C;&#x671B;&#x6240;&#x8C13;&#x7684;&#x9AA8;&#x67B6;&#x5C4F;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;<code>.vue</code>&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x80FD;&#x591F;&#x5728;&#x6784;&#x5EFA;&#x65F6;&#x7531;&#x5DE5;&#x5177;&#x81EA;&#x52A8;&#x6CE8;&#x5165;&#x5230;<code>div#app</code>&#x91CC;&#x9762;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5728;<code>/src</code>&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>Skeleton.vue</code>&#x6587;&#x4EF6;&#xFF0C;&#x5176;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;skeleton page&quot;&gt;
    &lt;div class=&quot;skeleton-nav&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;skeleton-swiper&quot;&gt;&lt;/div&gt;
    &lt;ul class=&quot;skeleton-tabs&quot;&gt;
      &lt;li v-for=&quot;i in 8&quot; class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;skeleton-banner&quot;&gt;&lt;/div&gt;
    &lt;div v-for=&quot;i in 6&quot; class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.skeleton {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav {
  height: 45px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-swiper {
  height: 160px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-tabs {
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
}
.skeleton-tabs-item {
  width: 25%;
  height: 55px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 15px;
}
.skeleton-tabs-item span {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #eee;
}
.skeleton-banner {
  height: 60px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-productions {
  height: 20px;
  margin-bottom: 15px;
  background: #eee;
}
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton page&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-nav&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-swiper&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;i in 8&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-banner&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;i in 6&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.skeleton</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.skeleton-nav</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">45px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-swiper</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">160px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-tabs</span> {
  <span class="hljs-attribute">list-style</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> -<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}
<span class="hljs-selector-class">.skeleton-tabs-item</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-tabs-item</span> <span class="hljs-selector-tag">span</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
<span class="hljs-selector-class">.skeleton-banner</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-productions</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x518D;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>skeleton.entry.js</code>&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Skeleton from &apos;./Skeleton.vue&apos;

export default new Vue({
  components: {
    Skeleton
  },
  template: &apos;&lt;skeleton /&gt;&apos;
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Skeleton <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Skeleton.vue&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue({
  components: {
    Skeleton
  },
  template: <span class="hljs-string">&apos;&lt;skeleton /&gt;&apos;</span>
})
</code></pre><p>&#x5728;&#x5B8C;&#x6210;&#x4E86;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x51C6;&#x5907;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x8F6E;&#x5230;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x63D2;&#x4EF6;<code>vue-server-renderer</code>&#x767B;&#x573A;&#x4E86;&#x3002;&#x8BE5;&#x63D2;&#x4EF6;&#x672C;&#x7528;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x5229;&#x7528;&#x5B83;&#x80FD;&#x591F;&#x628A;<code>.vue</code>&#x6587;&#x4EF6;&#x5904;&#x7406;&#x6210;<code>html</code>&#x548C;<code>css</code>&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6765;&#x5B8C;&#x6210;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x6CE8;&#x5165;&#xFF0C;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbaoAn?w=1050&amp;h=1520" src="https://static.alili.tech/img/bVbaoAn?w=1050&amp;h=1520" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h1 id="articleHeader3">&#x56DB;&#x3001;&#x65B9;&#x6848;&#x5B9E;&#x73B0;</h1><p>&#x6839;&#x636E;&#x6D41;&#x7A0B;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>webpack.skeleton.conf.js</code>&#x6587;&#x4EF6;&#xFF0C;&#x4EE5;&#x4E13;&#x95E8;&#x7528;&#x6765;&#x8FDB;&#x884C;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x6784;&#x5EFA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const webpack = require(&apos;webpack&apos;)
const nodeExternals = require(&apos;webpack-node-externals&apos;)
const VueSSRServerPlugin = require(&apos;vue-server-renderer/server-plugin&apos;)

module.exports = {
  target: &apos;node&apos;,
  entry: {
    skeleton: &apos;./src/skeleton.entry.js&apos;
  },
  output: {
    path: path.resolve(__dirname, &apos;./dist&apos;),
    publicPath: &apos;/dist/&apos;,
    filename: &apos;[name].js&apos;,
    libraryTarget: &apos;commonjs2&apos;
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          &apos;vue-style-loader&apos;,
          &apos;css-loader&apos;
        ]
      },
      {
        test: /\.vue$/,
        loader: &apos;vue-loader&apos;
      }
    ]
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  resolve: {
    alias: {
      &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;
    },
    extensions: [&apos;*&apos;, &apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;]
  },
  plugins: [
    new VueSSRServerPlugin({
      filename: &apos;skeleton.json&apos;
    })
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> nodeExternals = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-node-externals&apos;</span>)
<span class="hljs-keyword">const</span> VueSSRServerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer/server-plugin&apos;</span>)

<span class="hljs-built_in">module</span>.exports = {
  target: <span class="hljs-string">&apos;node&apos;</span>,
  entry: {
    skeleton: <span class="hljs-string">&apos;./src/skeleton.entry.js&apos;</span>
  },
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">&apos;./dist&apos;</span>),
    publicPath: <span class="hljs-string">&apos;/dist/&apos;</span>,
    filename: <span class="hljs-string">&apos;[name].js&apos;</span>,
    libraryTarget: <span class="hljs-string">&apos;commonjs2&apos;</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: [
          <span class="hljs-string">&apos;vue-style-loader&apos;</span>,
          <span class="hljs-string">&apos;css-loader&apos;</span>
        ]
      },
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">&apos;vue-loader&apos;</span>
      }
    ]
  },
  externals: nodeExternals({
    whitelist: <span class="hljs-regexp">/\.css$/</span>
  }),
  resolve: {
    alias: {
      <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>
    },
    extensions: [<span class="hljs-string">&apos;*&apos;</span>, <span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>]
  },
  plugins: [
    <span class="hljs-keyword">new</span> VueSSRServerPlugin({
      filename: <span class="hljs-string">&apos;skeleton.json&apos;</span>
    })
  ]
}
</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x8BE5;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x548C;&#x666E;&#x901A;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x57FA;&#x672C;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#xFF0C;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x5176;<code>target: &apos;node&apos;</code>&#xFF0C;&#x914D;&#x7F6E;&#x4E86;<code>externals</code>&#xFF0C;&#x4EE5;&#x53CA;&#x5728;<code>plugins</code>&#x91CC;&#x9762;&#x52A0;&#x5165;&#x4E86;<code>VueSSRServerPlugin</code>&#x3002;&#x5728;<code>VueSSRServerPlugin</code>&#x4E2D;&#xFF0C;&#x6307;&#x5B9A;&#x4E86;&#x5176;&#x8F93;&#x51FA;&#x7684;json&#x6587;&#x4EF6;&#x540D;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD0;&#x884C;&#x4E0B;&#x5217;&#x6307;&#x4EE4;&#xFF0C;&#x5728;<code>/dist</code>&#x76EE;&#x5F55;&#x4E0B;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>skeleton.json</code>&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --config ./webpack.skeleton.conf.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">webpack --config ./webpack<span class="hljs-selector-class">.skeleton</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span></code></pre><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5728;&#x8BB0;&#x8F7D;&#x4E86;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x5185;&#x5BB9;&#x548C;&#x6837;&#x5F0F;&#xFF0C;&#x4F1A;&#x63D0;&#x4F9B;&#x7ED9;<code>vue-server-renderer</code>&#x4F7F;&#x7528;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>skeleton.js</code>&#xFF0C;&#x8BE5;&#x6587;&#x4EF6;&#x5373;&#x5C06;&#x88AB;&#x7528;&#x4E8E;&#x5F80;<code>index.html</code>&#x5185;&#x63D2;&#x5165;&#x9AA8;&#x67B6;&#x5C4F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const fs = require(&apos;fs&apos;)
const { resolve } = require(&apos;path&apos;)

const createBundleRenderer = require(&apos;vue-server-renderer&apos;).createBundleRenderer

// &#x8BFB;&#x53D6;`skeleton.json`&#xFF0C;&#x4EE5;`index.html`&#x4E3A;&#x6A21;&#x677F;&#x5199;&#x5165;&#x5185;&#x5BB9;
const renderer = createBundleRenderer(resolve(__dirname, &apos;./dist/skeleton.json&apos;), {
  template: fs.readFileSync(resolve(__dirname, &apos;./index.html&apos;), &apos;utf-8&apos;)
})

// &#x628A;&#x4E0A;&#x4E00;&#x6B65;&#x6A21;&#x677F;&#x5B8C;&#x6210;&#x7684;&#x5185;&#x5BB9;&#x5199;&#x5165;&#xFF08;&#x66FF;&#x6362;&#xFF09;`index.html`
renderer.renderToString({}, (err, html) =&gt; {
  fs.writeFileSync(&apos;index.html&apos;, html, &apos;utf-8&apos;)
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> { resolve } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)

<span class="hljs-keyword">const</span> createBundleRenderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer&apos;</span>).createBundleRenderer

<span class="hljs-comment">// &#x8BFB;&#x53D6;`skeleton.json`&#xFF0C;&#x4EE5;`index.html`&#x4E3A;&#x6A21;&#x677F;&#x5199;&#x5165;&#x5185;&#x5BB9;</span>
<span class="hljs-keyword">const</span> renderer = createBundleRenderer(resolve(__dirname, <span class="hljs-string">&apos;./dist/skeleton.json&apos;</span>), {
  template: fs.readFileSync(resolve(__dirname, <span class="hljs-string">&apos;./index.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>)
})

<span class="hljs-comment">// &#x628A;&#x4E0A;&#x4E00;&#x6B65;&#x6A21;&#x677F;&#x5B8C;&#x6210;&#x7684;&#x5185;&#x5BB9;&#x5199;&#x5165;&#xFF08;&#x66FF;&#x6362;&#xFF09;`index.html`</span>
renderer.renderToString({}, <span class="hljs-function">(<span class="hljs-params">err, html</span>) =&gt;</span> {
  fs.writeFileSync(<span class="hljs-string">&apos;index.html&apos;</span>, html, <span class="hljs-string">&apos;utf-8&apos;</span>)
})
</code></pre><blockquote><p>&#x6CE8;&#x610F;&#xFF0C;&#x4F5C;&#x4E3A;&#x6A21;&#x677F;&#x7684;<code>html</code>&#x6587;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x88AB;&#x5199;&#x5165;&#x5185;&#x5BB9;&#x7684;&#x4F4D;&#x7F6E;&#x6DFB;&#x52A0;<code>&lt;!--vue-ssr-outlet--&gt;</code>&#x5360;&#x4F4D;&#x7B26;&#xFF0C;&#x672C;&#x4F8B;&#x5B50;&#x5728;<code>div#app</code>&#x91CC;&#x5199;&#x5165;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
 &lt;!--vue-ssr-outlet--&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
 <span class="hljs-comment">&lt;!--vue-ssr-outlet--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre></blockquote><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x53EA;&#x8981;&#x8FD0;&#x884C;<code>node skeleton.js</code>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x6CE8;&#x5165;&#x4E86;&#x3002;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;vue-skeleton&lt;/title&gt;
  &lt;style data-vue-ssr-id=&quot;742d88be:0&quot;&gt;
.skeleton {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav {
  height: 45px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-swiper {
  height: 160px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-tabs {
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
}
.skeleton-tabs-item {
  width: 25%;
  height: 55px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 15px;
}
.skeleton-tabs-item span {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #eee;
}
.skeleton-banner {
  height: 60px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-productions {
  height: 20px;
  margin-bottom: 15px;
  background: #eee;
}
&lt;/style&gt;&lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
      &lt;div data-server-rendered=&quot;true&quot; class=&quot;skeleton page&quot;&gt;&lt;div class=&quot;skeleton-nav&quot;&gt;&lt;/div&gt; &lt;div class=&quot;skeleton-swiper&quot;&gt;&lt;/div&gt; &lt;ul class=&quot;skeleton-tabs&quot;&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;li class=&quot;skeleton-tabs-item&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/li&gt;&lt;/ul&gt; &lt;div class=&quot;skeleton-banner&quot;&gt;&lt;/div&gt; &lt;div class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;&lt;div class=&quot;skeleton-productions&quot;&gt;&lt;/div&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;script src=&quot;/dist/build.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-skeleton<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-vue-ssr-id</span>=<span class="hljs-string">&quot;742d88be:0&quot;</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.skeleton</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.skeleton-nav</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">45px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-swiper</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">160px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-tabs</span> {
  <span class="hljs-attribute">list-style</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> -<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}
<span class="hljs-selector-class">.skeleton-tabs-item</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-tabs-item</span> <span class="hljs-selector-tag">span</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
<span class="hljs-selector-class">.skeleton-banner</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.skeleton-productions</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-server-rendered</span>=<span class="hljs-string">&quot;true&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton page&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-nav&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-swiper&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-tabs-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-banner&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;skeleton-productions&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/dist/build.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x6837;&#x5F0F;&#x901A;&#x8FC7;<code>&lt;style&gt;&lt;/style&gt;</code>&#x6807;&#x7B7E;&#x76F4;&#x63A5;&#x88AB;&#x63D2;&#x5165;&#xFF0C;&#x800C;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x88AB;&#x653E;&#x7F6E;&#x5728;<code>div#app</code>&#x4E4B;&#x95F4;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x5904;&#x7406;&#xFF0C;&#x628A;&#x8FD9;&#x4E9B;&#x5185;&#x5BB9;&#x90FD;&#x538B;&#x7F29;&#x4E00;&#x4E0B;&#x3002;&#x6539;&#x5199;<code>skeleton.js</code>&#xFF0C;&#x5728;&#x91CC;&#x9762;&#x6DFB;&#x52A0;<code>html-minifier</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

+ const htmlMinifier = require(&apos;html-minifier&apos;)

...

renderer.renderToString({}, (err, html) =&gt; {
+  html = htmlMinifier.minify(html, {
+    collapseWhitespace: true,
+    minifyCSS: true
+  })
  fs.writeFileSync(&apos;index.html&apos;, html, &apos;utf-8&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>...

+ const htmlMinifier = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-minifier&apos;</span>)

...

renderer.renderToString({}, <span class="hljs-function"><span class="hljs-params">(err, html)</span> =&gt;</span> {
+  html = htmlMinifier.minify(html, {
+    collapseWhitespace: <span class="hljs-literal">true</span>,
+    minifyCSS: <span class="hljs-literal">true</span>
+  })
  fs.writeFileSync(<span class="hljs-string">&apos;index.html&apos;</span>, html, <span class="hljs-string">&apos;utf-8&apos;</span>)
})</code></pre><p>&#x6765;&#x770B;&#x770B;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbaoFS?w=640&amp;h=309" src="https://static.alili.tech/img/bVbaoFS?w=640&amp;h=309" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6548;&#x679C;&#x975E;&#x5E38;&#x4E0D;&#x9519;&#xFF01;&#x81F3;&#x6B64;&#xFF0C;Vue&#x9875;&#x9762;&#x63A5;&#x5165;&#x9AA8;&#x67B6;&#x5C4F;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x5B9E;&#x73B0;&#x4E86;&#x3002;</p><h1 id="articleHeader4">&#x5C3E;&#x58F0;</h1><p>&#x672C;&#x6587;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x5957;&#x6700;&#x7B80;&#x5355;&#x7684;Vue&#x9875;&#x9762;&#x9AA8;&#x67B6;&#x5C4F;&#x6CE8;&#x5165;&#x5B9E;&#x8DF5;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x770B;&#x66F4;&#x590D;&#x6742;&#x4E00;&#x4E9B;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://xiaoiver.github.io/coding/2017/07/30/%E4%B8%BAvue%E9%A1%B9%E7%9B%AE%E6%B7%BB%E5%8A%A0%E9%AA%A8%E6%9E%B6%E5%B1%8F.html" rel="nofollow noreferrer" target="_blank">&#x300A;&#x4E3A;vue&#x9879;&#x76EE;&#x6DFB;&#x52A0;&#x9AA8;&#x67B6;&#x5C4F;&#x300B;</a>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x672C;&#x6587;&#x7684;&#x8BB8;&#x591A;&#x601D;&#x8DEF;&#x4E5F;&#x662F;&#x53D7;&#x5176;&#x542F;&#x53D1;&#xFF0C;&#x975E;&#x5E38;&#x503C;&#x5F97;&#x9605;&#x8BFB;&#x3002;</p><p>&#x5982;&#x679C;&#x8FD8;&#x6709;&#x4EFB;&#x4F55;&#x66F4;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#xFF0C;&#x4E5F;&#x6B22;&#x8FCE;&#x548C;&#x6211;&#x63A2;&#x8BA8;&#xFF0C;&#x6709;&#x673A;&#x4F1A;&#x6211;&#x4E5F;&#x4F1A;&#x603B;&#x7ED3;&#x57FA;&#x4E8E;<code>React</code>&#x7684;&#x9AA8;&#x67B6;&#x5C4F;&#x6CE8;&#x5165;&#x5B9E;&#x8DF5;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#xFF01;</p><blockquote>&#x6587;&#x7AE0;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x540C;&#x6B65;&#x5230;<a href="https://github.com/jrainlau/vue-skeleton" rel="nofollow noreferrer" target="_blank">Github</a>&#xFF0C;&#x6B22;&#x8FCE;&#x67E5;&#x9605;~</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue页面骨架屏注入实践

## 原文链接
[https://segmentfault.com/a/1190000014832185](https://segmentfault.com/a/1190000014832185)


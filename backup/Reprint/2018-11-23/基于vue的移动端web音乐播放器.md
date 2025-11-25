---
title: '基于vue的移动端web音乐播放器' 
date: 2018-11-23 2:30:10
hidden: true
slug: iwv534bklne
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x58F0;&#x660E;</h1><p>&#x4EE5;&#x4E0B;&#x53EA;&#x662F;&#x5B66;&#x4E60;&#x5B8C;&#x6155;&#x8BFE;&#x7F51;huangyi&#x8001;&#x5E08;&#x5B9E;&#x6218;&#x89C6;&#x9891;&#x8BFE;&#x7A0B;&#x7684;&#x7B14;&#x8BB0;&#x5185;&#x5BB9;&#xFF0C;&#x4EC5;&#x4F9B;&#x4E2A;&#x4EBA;&#x53C2;&#x8003;&#x5B66;&#x4E60;&#x4F7F;&#x7528;&#x3002;<br>&#x5982;&#x679C;&#x5BF9;<code>Vue2.0&#x5B9E;&#x6218;&#x9AD8;&#x7EA7;-&#x5F00;&#x53D1;&#x79FB;&#x52A8;&#x7AEF;&#x97F3;&#x4E50;WebApp</code>&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#xFF0C;&#x8BF7;&#x79FB;&#x6B65;&#x8FD9;&#x91CC;&#xFF1A;<br><a href="https://coding.imooc.com/class/107.html" rel="nofollow noreferrer" target="_blank">https://coding.imooc.com/clas...</a><br>&#x8C22;&#x8C22;&#x3002;</p><p>&#x9879;&#x76EE;GitHub&#x5730;&#x5740;&#xFF1A; <a href="https://github.com/bjw1234/vue-music" rel="nofollow noreferrer" target="_blank">https://github.com/bjw1234/vu...</a></p><p>&#x9879;&#x76EE;&#x6F14;&#x793A;&#x5730;&#x5740;&#xFF1A; <a href="http://music.baijiawei.top" rel="nofollow noreferrer" target="_blank">http://music.baijiawei.top</a></p><h1 id="articleHeader1">&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B89;&#x88C5;vue&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;
npm install vue-cli -g

// &#x521D;&#x59CB;&#x5316;webpack&#x5E94;&#x7528;
vue init webpack vue-music" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code class="npm"><span class="hljs-comment">// &#x5B89;&#x88C5;vue&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;</span>
npm install vue-<span class="hljs-keyword">cli</span> -<span class="hljs-keyword">g</span>

<span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;webpack&#x5E94;&#x7528;</span>
vue init webpack vue-music</code></pre><h1 id="articleHeader2">&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x7684;mixin</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x80CC;&#x666F;&#x56FE;&#x7247;
bg-image($url)
  background-image: url($url + &quot;@2x.png&quot;)
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + &quot;@3x.png&quot;)

// &#x4E0D;&#x6362;&#x884C;
no-wrap()
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

// &#x6269;&#x5C55;&#x70B9;&#x51FB;&#x533A;&#x57DF;
extend-click()
  position: relative
  &amp;:before
    content: &apos;&apos;
    position: absolute
    top: -10px
    left: -10px
    right: -10px
    bottom: -10px" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="styl"><span class="hljs-comment">// &#x80CC;&#x666F;&#x56FE;&#x7247;</span>
<span class="hljs-function"><span class="hljs-title">bg-image</span><span class="hljs-params">(<span class="hljs-variable">$url</span>)</span></span>
  <span class="hljs-attribute">background-image</span>: url(<span class="hljs-variable">$url</span> + <span class="hljs-string">&quot;@2x.png&quot;</span>)
  @media (-webkit-min-device-pixel-ratio: <span class="hljs-number">3</span>),(min-device-pixel-ratio: <span class="hljs-number">3</span>)
    <span class="hljs-attribute">background-image</span>: url(<span class="hljs-variable">$url</span> + <span class="hljs-string">&quot;@3x.png&quot;</span>)

<span class="hljs-comment">// &#x4E0D;&#x6362;&#x884C;</span>
<span class="hljs-function"><span class="hljs-title">no-wrap</span><span class="hljs-params">()</span></span>
  <span class="hljs-attribute">text-overflow</span>: ellipsis
  <span class="hljs-attribute">overflow</span>: hidden
  <span class="hljs-attribute">white-space</span>: nowrap

<span class="hljs-comment">// &#x6269;&#x5C55;&#x70B9;&#x51FB;&#x533A;&#x57DF;</span>
<span class="hljs-function"><span class="hljs-title">extend-click</span><span class="hljs-params">()</span></span>
  <span class="hljs-attribute">position</span>: relative
  &amp;:before
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>
    <span class="hljs-attribute">position</span>: absolute
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">10px</span>
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">10px</span>
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">10px</span></code></pre><h1 id="articleHeader3">&#x914D;&#x7F6E;&#x8DEF;&#x5F84;&#x522B;&#x540D;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
    alias: {
      &apos;@&apos;: resolve(&apos;src&apos;),
      &apos;common&apos;: resolve(&apos;src/common&apos;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">resolve: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">&apos;@&apos;</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>),
      <span class="hljs-string">&apos;common&apos;</span>: resolve(<span class="hljs-string">&apos;src/common&apos;</span>)
    }
}</code></pre><h1 id="articleHeader4">&#x79FB;&#x52A8;&#x7AEF;300&#x6BEB;&#x79D2;&#x5EF6;&#x65F6;&#x548C;&#x70B9;&#x900F;&#x95EE;&#x9898;</h1><p><code>fastclick&#xFF1A;</code>&#x5904;&#x7406;&#x79FB;&#x52A8;&#x7AEF;click&#x4E8B;&#x4EF6;300&#x6BEB;&#x79D2;&#x5EF6;&#x8FDF;&#x548C;&#x70B9;&#x900F;&#x95EE;&#x9898;&#x3002;</p><p>&#x5148;&#x6267;&#x884C;&#x5B89;&#x88C5;fastclick&#x7684;&#x547D;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install fastclick --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code class="npm" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> fastclick <span class="hljs-comment">--save</span></code></pre><p>&#x4E4B;&#x540E;&#xFF0C;&#x5728;main.js&#x4E2D;&#x5F15;&#x5165;&#xFF0C;&#x5E76;&#x7ED1;&#x5B9A;&#x5230;body</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import FastClick from &apos;fastclick&apos;;

FastClick.attach(document.body);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> FastClick <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;fastclick&apos;</span>;

FastClick.attach(<span class="hljs-built_in">document</span>.body);</code></pre><p><strong>&#x6CE8;&#x610F;&#xFF1A; </strong>&#x5F53;<code>fastclick</code>&#x548C;&#x5176;&#x4ED6;&#x7684;&#x6A21;&#x5757;&#x70B9;&#x51FB;&#x51B2;&#x7A81;&#xFF0C;&#x5BFC;&#x81F4;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x4E0D;&#x53EF;&#x7528;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x7ED9;&#x5BF9;&#x5E94;&#x7684;dom&#x6DFB;&#x52A0;<code>needsclick</code>&#x7C7B;&#x6765;&#x89E3;&#x51B3;&#x3002;</p><h1 id="articleHeader5">&#x5BF9;jsonp&#x8FDB;&#x4E00;&#x6B65;&#x5C01;&#x88C5;</h1><p>&#x4E0B;&#x8F7D;&#x539F;&#x59CB;&#x7684;<code>jsonp</code>&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install jsonp --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">npm install jsonp --save</code></pre><p>&#x518D;&#x6B21;&#x5C01;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import originJSONP from &apos;jsonp&apos;;

/**
 * &#x505A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;jsonp&#x5C01;&#x88C5;
 * @param url
 * @param data
 * @param option
 * @return {Promise}
 */
export default function jsonp (url, data, option) {
  return new Promise((resolve, reject) =&gt; {
    url = `${url}?${_obj2String(data)}`;
    originJSONP(url, option, (err, data) =&gt; {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

function _obj2String (obj, arr = [], index = 0) {
  for (let item in obj) {
    arr[index++] = [item, obj[item]];
  }
  return new URLSearchParams(arr).toString();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> originJSONP <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;jsonp&apos;</span>;

<span class="hljs-comment">/**
 * &#x505A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;jsonp&#x5C01;&#x88C5;
 * @param url
 * @param data
 * @param option
 * @return {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonp</span> (<span class="hljs-params">url, data, option</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    url = <span class="hljs-string">`<span class="hljs-subst">${url}</span>?<span class="hljs-subst">${_obj2String(data)}</span>`</span>;
    originJSONP(url, option, (err, data) =&gt; {
      <span class="hljs-keyword">if</span> (!err) {
        resolve(data);
      } <span class="hljs-keyword">else</span> {
        reject(err);
      }
    });
  });
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_obj2String</span> (<span class="hljs-params">obj, arr = [], index = <span class="hljs-number">0</span></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">in</span> obj) {
    arr[index++] = [item, obj[item]];
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> URLSearchParams(arr).toString();
}</code></pre><h1 id="articleHeader6">vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;</h1><p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/350/409/3504099265-580628fd03258" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/350/409/3504099265-580628fd03258" alt="" title="" style="cursor:pointer"></span></p><p><strong>&#x6CE8;&#x610F;&#xFF1A; </strong>&#x5F53;&#x4F7F;&#x7528;<code>keep-alive</code>&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x5F53;&#x5207;&#x6362;&#x5230;&#x5176;&#x4ED6;&#x8DEF;&#x7531;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;&#x524D;&#x7EC4;&#x4EF6;&#x7684;<code>deactivated</code>&#x94A9;&#x5B50;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x5207;&#x56DE;&#x6765;&#x65F6;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;<code>activated</code>&#x51FD;&#x6570;&#x3002;</p><h1 id="articleHeader7">better-scroll&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</h1><p><strong>&#x6CE8;&#x610F;:</strong></p><ul><li>1.better-scroll&#x53EA;&#x5904;&#x7406;&#x5BB9;&#x5668;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6EDA;&#x52A8;&#x3002;</li><li>2.&#x4E00;&#x5B9A;&#x5F97;&#x4FDD;&#x8BC1;&#x5B50;&#x5143;&#x7D20;&#x8D85;&#x51FA;&#x7236;&#x5143;&#x7D20;&#xFF0C;&#x8FD9;&#x6837;&#x624D;&#x80FD;&#x6B63;&#x786E;&#x7684;&#x6EDA;&#x52A8;&#x3002;</li></ul><p>&#x521D;&#x59CB;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import BScroll from &apos;better-scroll&apos;;

let wrapper = document.querySelector(&apos;.wrapper&apos;);
let scroll = new BScroll(wrapper,{
    // &#x914D;&#x7F6E;&#x9879;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> BScroll <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;better-scroll&apos;</span>;

<span class="hljs-keyword">let</span> wrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.wrapper&apos;</span>);
<span class="hljs-keyword">let</span> scroll = <span class="hljs-keyword">new</span> BScroll(wrapper,{
    <span class="hljs-comment">// &#x914D;&#x7F6E;&#x9879;</span>
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .scroll
        height: 100%
        overflow: hidden" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-class">.wrapper</span>
    <span class="hljs-attribute">position</span>: fixed
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
    <span class="hljs-attribute">top</span>: <span class="hljs-number">88px</span>
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>
    <span class="hljs-selector-class">.scroll</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>
        <span class="hljs-attribute">overflow</span>: hidden</code></pre><p>&#x95EE;&#x9898;&#x6392;&#x67E5;&#xFF08;&#x65E0;&#x6CD5;&#x6EDA;&#x52A8;&#x539F;&#x56E0;&#xFF1A;&#xFF09;</p><ul><li>1.&#x5185;&#x5C42;&#x5BB9;&#x5668;&#x7684;&#x9AD8;&#x5EA6;&#x6CA1;&#x6709;&#x8D85;&#x8FC7;&#x5916;&#x5C42;&#x5BB9;&#x5668;&#x3002;</li><li>2.dom&#x6CA1;&#x6709;&#x6E32;&#x67D3;&#x5B8C;&#x6BD5;&#x5C31;&#x521D;&#x59CB;&#x5316;<code>better-scroll</code>&#x3002;</li><li>3.&#x6539;&#x53D8;&#x4E86;dom&#x7684;&#x663E;&#x9690;&#x6027;&#xFF0C;&#x6CA1;&#x6709;&#x5BF9;scroll&#x8FDB;&#x884C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x3002;</li><li>&#x9488;&#x5BF9;3&#xFF1A;&#x5F53;dom&#x663E;&#x793A;&#x51FA;&#x6765;&#x4E4B;&#x540E;&#xFF0C;&#x52A0;20&#x6BEB;&#x79D2;&#x5EF6;&#x65F6;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;<code>refresh</code>&#x65B9;&#x6CD5;&#x3002;</li></ul><h1 id="articleHeader8">&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x8BF7;&#x6C42;&#x4EE3;&#x7406;</h1><p>&#x5F53;&#x5728;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#xFF0C;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#xFF0C;<code>vue-cli</code>&#x63D0;&#x4F9B;&#x4E86;&#x975E;&#x5E38;&#x5F3A;&#x5927;&#x7684;<code>http-proxy-middleware</code>&#x5305;&#x3002;&#x53EF;&#x4EE5;&#x5BF9;&#x6211;&#x4EEC;&#x7684;&#x8BF7;&#x6C42;&#x8FDB;&#x884C;&#x4EE3;&#x7406;&#x3002;<br>&#x8FDB;&#x5165; <code>config/index.js</code> &#x4EE3;&#x7801;&#x4E0B;&#x5982;&#x4E0B;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  &apos;/getDescList&apos;: {
    target: &apos;http://127.0.0.1:7070/desclist&apos;, // &#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x5730;&#x5740;
    changeOrigin: true,
    // secure: false,
    pathRewrite: {
      &apos;^/getDescList&apos;: &apos;/&apos;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">proxyTable: {
  <span class="hljs-string">&apos;/getDescList&apos;</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">&apos;http://127.0.0.1:7070/desclist&apos;</span>, <span class="hljs-comment">// &#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x5730;&#x5740;</span>
    changeOrigin: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// secure: false,</span>
    pathRewrite: {
      <span class="hljs-string">&apos;^/getDescList&apos;</span>: <span class="hljs-string">&apos;/&apos;</span>
    }
  }
}</code></pre><h1 id="articleHeader9">&#x8D1F;&#x5916;&#x8FB9;&#x8DDD;&#x7684;&#x4F5C;&#x7528;&#x6548;&#x679C;</h1><ul><li><code>marin-left</code>&#x6216;&#x8005;<code>margin-top</code>&#x662F;&#x8D1F;&#x503C;&#xFF1A;&#x5B83;&#x4F1A;&#x5C06;&#x5143;&#x7D20;&#x5728;&#x76F8;&#x5E94;&#x7684;&#x65B9;&#x5411;&#x8FDB;&#x884C;&#x79FB;&#x52A8;&#x3002;<code>left</code>&#x5C31;&#x662F;&#x5DE6;&#x53F3;&#x65B9;&#x5411;&#x79FB;&#x52A8;&#xFF0C;<code>top</code>&#x5C31;&#x662F;&#x4E0A;&#x4E0B;&#x65B9;&#x5411;&#x79FB;&#x52A8;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x4F1A;&#x4F7F;&#x5143;&#x7D20;&#x5728;&#x6587;&#x6863;&#x6D41;&#x91CC;&#x7684;<code>&#x4F4D;&#x7F6E;&#x53D1;&#x751F;&#x53D8;&#x5316;</code>&#x3002;</li><li><code>margin-right</code>&#x6216;&#x8005;<code>margin-bottom</code>&#x662F;&#x8D1F;&#x503C;&#xFF1A;&#x5B83;&#x4E0D;&#x4F1A;&#x79FB;&#x52A8;&#x8BE5;&#x5143;&#x7D20;(&#x8BE5;&#x5143;&#x7D20;&#x4E0D;&#x53D8;&#x5316;)&#xFF0C;&#x4F46;&#x4F1A;&#x4F7F;&#x8BE5;&#x5143;&#x7D20;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x5F80;&#x524D;&#x79FB;&#x52A8;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;<code>margin-bottom</code>&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5143;&#x7D20;&#x4E0B;&#x9762;&#x7684;&#x5143;&#x7D20;&#x4F1A;<code>&#x5F80;&#x4E0A;</code>&#x79FB;&#x52A8;&#xFF1B;&#x5982;&#x679C;<code>margin-right</code>&#x4E3A;&#x8D1F;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5143;&#x7D20;&#x53F3;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x4F1A;<code>&#x5F80;&#x5DE6;</code>&#x79FB;&#x52A8;&#xFF0C;&#x4ECE;&#x800C;&#x8986;&#x76D6;&#x8BE5;&#x5143;&#x7D20;&#x3002;</li></ul><h1 id="articleHeader10">&#x914D;&#x7F6E;&#x5B50;&#x8DEF;&#x7531;</h1><p>&#x9700;&#x6C42;&#xFF1A;&#x5728;&#x6B4C;&#x624B;&#x9875;&#x9762;&#x4E0B;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x6B4C;&#x624B;&#x8BE6;&#x60C5;&#x9875;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes:[
        {
            path: &apos;/&apos;,
            component: Singer,
            children: [
                {
                    path: &apos;:id&apos;,
                    compoonent: SingerDetail
                }
            ]
        },
        ...
    ]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">routes</span>:[
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>,
            <span class="hljs-attr">component</span>: Singer,
            <span class="hljs-attr">children</span>: [
                {
                    <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;:id&apos;</span>,
                    <span class="hljs-attr">compoonent</span>: SingerDetail
                }
            ]
        },
        ...
    ]
});</code></pre><p>&#x5F53;&#x76D1;&#x542C;&#x5230;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.push({
  path: `singer/${singer.id}`
});

// &#x522B;&#x5FD8;&#x4E86;&#x5728;`Singer`&#x9875;&#x9762;&#x4E2D;&#xFF1A;
&lt;router-view&gt;&lt;/router-view&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.$router.push({
  <span class="hljs-attr">path</span>: <span class="hljs-string">`singer/<span class="hljs-subst">${singer.id}</span>`</span>
});

<span class="hljs-comment">// &#x522B;&#x5FD8;&#x4E86;&#x5728;`Singer`&#x9875;&#x9762;&#x4E2D;&#xFF1A;</span>
&lt;router-view&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></span></code></pre><h1 id="articleHeader11">Vuex&#x7684;&#x4F7F;&#x7528;</h1><h3 id="articleHeader12">Vuex&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</h3><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF1A;<code>Vuex</code>&#x89E3;&#x51B3;&#x9879;&#x76EE;&#x4E2D;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x4FE1;&#x548C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;</p><p>Vuex&#x5C06;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5355;&#x72EC;&#x62CE;&#x51FA;&#x6765;&#xFF0C;&#x5E94;&#x7528;&#x7EDF;&#x4E00;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x91C7;&#x7528;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x7BA1;&#x7406;&#x6570;&#x636E;&#x3002;&#x7528;&#x5904;&#x8D1F;&#x8D23;&#x89E6;&#x53D1;&#x52A8;&#x4F5C;&#xFF08;<code>Action</code>&#xFF09;&#x8FDB;&#x800C;&#x6539;&#x53D8;&#x5BF9;&#x5E94;&#x72B6;&#x6001;&#xFF08;<code>State</code>&#xFF09;&#xFF0C;&#x4ECE;&#x800C;&#x53CD;&#x6620;&#x5230;&#x89C6;&#x56FE;&#xFF08;<code>View</code>&#xFF09;&#x4E0A;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbcih2?w=1195&amp;h=945" src="https://static.alili.tech/img/bVbcih2?w=1195&amp;h=945" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader13">Vuex&#x600E;&#x4E48;&#x7528;&#xFF1F;</h3><p><strong>&#x5B89;&#x88C5;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">npm install vuex --save</code></pre><p><strong>&#x5F15;&#x5165;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from &apos;vuex&apos;;
import Vue from &apos;Vue&apos;;

Vue.use(Vuex);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;Vue&apos;</span>;

Vue.use(Vuex);</code></pre><p><strong>Vuex&#x7684;&#x7EC4;&#x6210;&#x90E8;&#x5206;</strong></p><p>&#x4F7F;&#x7528;Vuex&#x5F00;&#x53D1;&#x7684;&#x5E94;&#x7528;&#x7ED3;&#x6784;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcijz?w=1012&amp;h=870" src="https://static.alili.tech/img/bVbcijz?w=1012&amp;h=870" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><ul><li><strong>State</strong></li></ul><p><code>State</code>&#x8D1F;&#x8D23;&#x5B58;&#x50A8;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x7684;&#x72B6;&#x6001;&#x6570;&#x636E;&#xFF0C;&#x4E00;&#x822C;&#x9700;&#x8981;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5728;&#x6839;&#x8282;&#x70B9;&#x6CE8;&#x5165;<code>store</code>&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x671F;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>this.$store.state</code>&#x76F4;&#x63A5;&#x83B7;&#x53D6;&#x72B6;&#x6001;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from &apos;./store&apos;;
..

new Vue({
    el: &apos;#app&apos;,
    store,
    render: h =&gt; h(App)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>;
..

new Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    store,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});</code></pre><p>&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;<code>store</code>&#x53C8;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x4ECE;&#x54EA;&#x6765;&#x7684;&#x5462;&#xFF1F;</p><p><code>store</code>&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#xFF0C;&#x5305;&#x542B;&#x5E94;&#x7528;&#x4E2D;&#x7684;<code>state</code>&#x3002;&#x5B9E;&#x4F8B;&#x5316;&#x751F;&#x6210;<code>store</code>&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mutations = {...};
const actions = {...};
const state = {...};

// &#x5B9E;&#x4F8B;&#x5316;store&#x5BF9;&#x8C61;&#x5E76;&#x5BFC;&#x51FA;
export defautl new Vuex.Store({
    state,
    actions,
    mutations
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> mutations = {...};
<span class="hljs-keyword">const</span> actions = {...};
<span class="hljs-keyword">const</span> state = {...};

<span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;store&#x5BF9;&#x8C61;&#x5E76;&#x5BFC;&#x51FA;</span>
<span class="hljs-keyword">export</span> defautl <span class="hljs-keyword">new</span> Vuex.Store({
    state,
    actions,
    mutations
});</code></pre><ul><li><strong>Mutations</strong></li></ul><p>&#x4E2D;&#x6587;&#x610F;&#x601D;&#x662F;&#x201C;&#x53D8;&#x5316;&#x201D;&#xFF0C;&#x5229;&#x7528;&#x5B83;&#x53EF;&#x4EE5;&#x6765;&#x66F4;&#x6539;&#x72B6;&#x6001;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x7528;&#x6765;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;&#x3002;<br><code>store.commit(mutationName)</code>&#x662F;&#x7528;&#x6765;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;<code>mutation</code>&#x7684;&#x65B9;&#x6CD5;&#x3002;<br>&#x9700;&#x8981;&#x8BB0;&#x4F4F;&#x7684;&#x662F;&#xFF0C;&#x5B9A;&#x4E49;&#x7684;mutation&#x5FC5;&#x987B;&#x662F;&#x540C;&#x6B65;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mutations = {
    changState(state) {
        // &#x5728;&#x8FD9;&#x91CC;&#x6539;&#x53D8;state&#x4E2D;&#x7684;&#x6570;&#x636E;
    }
};

// &#x53EF;&#x4EE5;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x8FD9;&#x6837;&#x89E6;&#x53D1;
this.$store.commit(&apos;changeState&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> mutations = {
    changState(state) {
        <span class="hljs-comment">// &#x5728;&#x8FD9;&#x91CC;&#x6539;&#x53D8;state&#x4E2D;&#x7684;&#x6570;&#x636E;</span>
    }
};

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x8FD9;&#x6837;&#x89E6;&#x53D1;</span>
<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;changeState&apos;</span>);
</code></pre><ul><li><strong>Actions</strong></li></ul><p>Actions&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x6539;&#x53D8;&#x72B6;&#x6001;&#xFF0C;&#x4E0D;&#x8FC7;&#x662F;&#x901A;&#x8FC7;&#x89E6;&#x53D1;<code>mutation</code>&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x91CD;&#x8981;&#x7684;&#x662F;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x76F4;&#x63A5;&#x89E6;&#x53D1;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>this.$store.dispatch(actionName)</code>&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader14">&#x7B80;&#x5355;&#x7684;&#x591A;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x4EA4;&#x4E92;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import Vuex from &apos;vuex&apos;;

Vue.use(Vuex);

// &#x72B6;&#x6001;
const state = {
  singer: {}
};

// &#x8DDF;&#x8E2A;&#x72B6;&#x6001;&#x7684;&#x53D8;&#x5316;
const mutations = {
  setSinger (state, singer) {
    state.singer = singer;
  }
};

// &#x5B9E;&#x4F8B;&#x5316;store&#x5BF9;&#x8C61;
export default new Vuex.Store({
  state,
  mutations
});

// &#x5728;singer&#x7EC4;&#x4EF6;&#x4E2D;&#x63D0;&#x4EA4;&#x6570;&#x636E;
this.$store.commit(&apos;setSinger&apos;,singer);

// &#x5728;singer-detail&#x7EC4;&#x4EF6;&#x4E2D;&#x63A5;&#x6536;&#x6570;&#x636E;
let singer = this.$store.state.singer;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;

Vue.use(Vuex);

<span class="hljs-comment">// &#x72B6;&#x6001;</span>
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">singer</span>: {}
};

<span class="hljs-comment">// &#x8DDF;&#x8E2A;&#x72B6;&#x6001;&#x7684;&#x53D8;&#x5316;</span>
<span class="hljs-keyword">const</span> mutations = {
  setSinger (state, singer) {
    state.singer = singer;
  }
};

<span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;store&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations
});

<span class="hljs-comment">// &#x5728;singer&#x7EC4;&#x4EF6;&#x4E2D;&#x63D0;&#x4EA4;&#x6570;&#x636E;</span>
<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;setSinger&apos;</span>,singer);

<span class="hljs-comment">// &#x5728;singer-detail&#x7EC4;&#x4EF6;&#x4E2D;&#x63A5;&#x6536;&#x6570;&#x636E;</span>
<span class="hljs-keyword">let</span> singer = <span class="hljs-keyword">this</span>.$store.state.singer;</code></pre><h3 id="articleHeader15">vuex&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x70B9;&#x7684;&#x4F7F;&#x7528;</h3><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x5C0F;&#x6817;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x628A;<code>sate</code>&#x3001;<code>mutations</code>&#x7B49;&#x5176;&#x4ED6;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#x5199;&#x5728;&#x4E86;&#x4E00;&#x8D77;&#xFF0C;<br>&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E0D;&#x9002;&#x5408;&#x5927;&#x578B;&#x70B9;&#x7684;&#x9879;&#x76EE;&#x3002;&#x6700;&#x597D;&#x80FD;&#x5C06;&#x8FD9;&#x4E9B;&#x5185;&#x5BB9;&#x62CE;&#x51FA;&#x6765;&#xFF0C;&#x5355;&#x72EC;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x6765;&#x4F7F;&#x7528;&#x3002;</p><p><strong>&#x5728;src/store&#x76EE;&#x5F55;&#x4E2D;&#x65B0;&#x5EFA;&#x4EE5;&#x4E0B;&#x6587;&#x4EF6;&#xFF1A;</strong></p><ul><li><strong>state.js </strong>&#x7528;&#x4E8E;&#x5B58;&#x50A8;&#x72B6;&#x6001;&#x4FE1;&#x606F;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sate = {
    singer: {}    
};

export default state;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sate = {
    <span class="hljs-attr">singer</span>: {}    
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> state;</code></pre><ul><li><strong>mutation-types.js </strong>&#x4FDD;&#x5B58;&#x4E00;&#x4E9B;&#x5E38;&#x91CF;&#xFF08;mutations&#x4E2D;&#x51FD;&#x6570;&#x7684;&#x51FD;&#x6570;&#x540D;&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const SET_SINGER = &apos;SET_SINGER&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_SINGER = <span class="hljs-string">&apos;SET_SINGER&apos;</span>;</code></pre><ul><li><strong>mutations.js </strong>&#x7528;&#x4E8E;&#x66F4;&#x6539;&#x72B6;&#x6001;&#xFF08;state&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from &apos;./mutation-types&apos;;

// &#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x4F20;&#x5165;payload&#x4FE1;&#x606F;
const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    }
};

export default mutations;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mutation-types&apos;</span>;

<span class="hljs-comment">// &#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x4F20;&#x5165;payload&#x4FE1;&#x606F;</span>
<span class="hljs-keyword">const</span> mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mutations;</code></pre><ul><li><strong>getters.js </strong>&#x5BF9;&#x72B6;&#x6001;&#x83B7;&#x53D6;&#x7684;&#x5C01;&#x88C5;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const singer = state =&gt; state.singer;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> singer = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.singer;</code></pre><ul><li><strong>actions.js </strong>&#x5BF9;mutation&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#xFF0C;&#x6216;&#x8005;&#x6267;&#x884C;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6682;&#x65F6;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-comment">// &#x6682;&#x65F6;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</span></code></pre><ul><li><strong>index.js </strong>store&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5165;&#x53E3;&#x6587;&#x4EF6;
import Vue from &apos;vue&apos;;
import Vuex from &apos;vuex&apos;;
import state from &apos;./state&apos;;
import mutations from &apos;./mutations&apos;;
import * as actions from &apos;./actions&apos;;
import * as getters from &apos;./getters&apos;;
import createLogger from &apos;vuex/dist/logger&apos;;

Vue.use(Vuex);

// &#x8C03;&#x8BD5;&#x73AF;&#x5883;&#x4E0B;&#x5F00;&#x542F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;
const debug = process.env.NODE_ENV !== &apos;production&apos;;

// &#x521B;&#x5EFA;store&#x5BF9;&#x8C61;&#x5E76;&#x5BFC;&#x51FA;
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;
<span class="hljs-keyword">import</span> state <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./state&apos;</span>;
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mutations&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./actions&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./getters&apos;</span>;
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex/dist/logger&apos;</span>;

Vue.use(Vuex);

<span class="hljs-comment">// &#x8C03;&#x8BD5;&#x73AF;&#x5883;&#x4E0B;&#x5F00;&#x542F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;</span>
<span class="hljs-keyword">const</span> debug = process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>;

<span class="hljs-comment">// &#x521B;&#x5EFA;store&#x5BF9;&#x8C61;&#x5E76;&#x5BFC;&#x51FA;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  <span class="hljs-attr">strict</span>: debug,
  <span class="hljs-attr">plugins</span>: debug ? [createLogger()] : []
});</code></pre><p><strong>&#x4F7F;&#x7528;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js&#x4E2D;&#x5F15;&#x5165;
import store from &apos;./store&apos;;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-comment">// main.js&#x4E2D;&#x5F15;&#x5165;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>;

</code></pre><p>&#x6709;&#x4E86;&#x4EE5;&#x4E0A;&#x5185;&#x5BB9;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x53BB;&#x4F7F;&#x7528;&#x4E86;&#xFF1A;</p><p>&#x4F8B;&#x5982;&#xFF1A;&#x591A;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x7684;&#x6570;&#x636E;&#x4EA4;&#x4E92;&#x3002;<br>&#x9700;&#x6C42;&#xFF1A;<code>singer</code>&#x7EC4;&#x4EF6;&#x4E2D;&#x9700;&#x8981;&#x5C06;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x7684;&#x90A3;&#x4E2A;<code>singer&#x5BF9;&#x8C61;</code>&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;<code>singer-detail</code>&#x7EC4;&#x4EF6;&#x3002;</p><p><strong>singer.vue &#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;
import { mapMutations } from &apos;vuex&apos;;

methods:{
    ...mapMutations({
        // &#x5C06;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;(setSinger)&#x548C;mutations&#x4E2D;&#x7528;&#x4E8E;&#x4FEE;&#x6539;&#x72B6;&#x6001;&#x7684;&#x51FD;&#x6570;&#x5173;&#x8054;&#x8D77;&#x6765;
        setSinger: &apos;SET_SINGER&apos;
    });
}

// &#x4F20;&#x53C2;
this.setSinger(singer);

// &#x8BED;&#x6CD5;&#x7CD6;&#x7684;&#x672C;&#x8D28;
  this.$store.commit(&apos;setSinger&apos;, singer);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;</span>
<span class="hljs-keyword">import</span> { mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;

methods:{
    ...mapMutations({
        <span class="hljs-comment">// &#x5C06;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;(setSinger)&#x548C;mutations&#x4E2D;&#x7528;&#x4E8E;&#x4FEE;&#x6539;&#x72B6;&#x6001;&#x7684;&#x51FD;&#x6570;&#x5173;&#x8054;&#x8D77;&#x6765;</span>
        setSinger: <span class="hljs-string">&apos;SET_SINGER&apos;</span>
    });
}

<span class="hljs-comment">// &#x4F20;&#x53C2;</span>
<span class="hljs-keyword">this</span>.setSinger(singer);

<span class="hljs-comment">// &#x8BED;&#x6CD5;&#x7CD6;&#x7684;&#x672C;&#x8D28;</span>
  <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;setSinger&apos;</span>, singer);</code></pre><p><strong>singer-detail.vue &#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;</strong><br>&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x53BB;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x4E86;&#xFF0C;&#x5F53;&#x7136;&#x4E5F;&#x662F;&#x4F7F;&#x7528;&#x6211;&#x4EEC;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x5566;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapGetters } from &apos;vuex&apos;;

export default {
    // &#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;
    computed: {
        ...mapGetters([
            &apos;singer&apos;   // &#x8FD9;&#x4E2A;&#x5C31;&#x662F;getters.js&#x4E2D;&#x7684;&#x90A3;&#x4E2A;singer
        ]);
    },
    created(){
        console.log(this.singer);
    }    
}

// &#x8BED;&#x6CD5;&#x7CD6;&#x7684;&#x672C;&#x8D28;&#xFF1A;
let singer = this.$store.state.singer;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</span>
    computed: {
        ...mapGetters([
            <span class="hljs-string">&apos;singer&apos;</span>   <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x5C31;&#x662F;getters.js&#x4E2D;&#x7684;&#x90A3;&#x4E2A;singer</span>
        ]);
    },
    created(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.singer);
    }    
}

<span class="hljs-comment">// &#x8BED;&#x6CD5;&#x7CD6;&#x7684;&#x672C;&#x8D28;&#xFF1A;</span>
<span class="hljs-keyword">let</span> singer = <span class="hljs-keyword">this</span>.$store.state.singer;</code></pre><h1 id="articleHeader16">js&#x4E2D;&#x7ED9;CSS&#x6DFB;&#x52A0;prefix</h1><p>&#x6211;&#x4EEC;&#x4E00;&#x5B9A;&#x9047;&#x5230;&#x8FC7;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;<br><em>&#x9700;&#x8981;&#x7528;JS&#x5199;CSS&#x52A8;&#x753B;&#x3002;&#x4F46;&#x6211;&#x4EEC;&#x53C8;&#x4E0D;&#x5F97;&#x4E0D;&#x5904;&#x7406;&#x524D;&#x7F00;&#x7684;&#x95EE;&#x9898;&#x3002;</em></p><p>&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$refs.image.style.transform = `scale(${scale})`;
this.$refs.image.style.webkitTansform = `scale(${scale})`;
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.$refs.image.style.transform = <span class="hljs-string">`scale(<span class="hljs-subst">${scale}</span>)`</span>;
<span class="hljs-keyword">this</span>.$refs.image.style.webkitTansform = <span class="hljs-string">`scale(<span class="hljs-subst">${scale}</span>)`</span>;
...</code></pre><p>&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x600E;&#x6837;&#x7528;JS&#x5904;&#x7406;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x5462;&#xFF1F;</p><p><strong>&#x601D;&#x8DEF;&#xFF1A;</strong></p><ul><li>&#x68C0;&#x6D4B;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x80FD;&#x529B;&#x3002;</li><li>&#x8FD4;&#x56DE;&#x5E26;&#x7740;&#x524D;&#x7F00;&#x7684;CSS&#x6837;&#x5F0F;&#x3002;</li></ul><p>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let elementStyle = document.createElement(&apos;div&apos;).style;

// &#x5F97;&#x5230;&#x5408;&#x9002;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x524D;&#x7F00;
let vendor = (() =&gt; {
  let transformNames = {
    webkit: &apos;webkitTransform&apos;,
    Moz: &apos;MozTransform&apos;,
    O: &apos;OTransform&apos;,
    ms: &apos;msTransform&apos;,
    standard: &apos;transform&apos;
  };

  for (let key in transformNames) {
    let support = elementStyle[transformNames[key]] !== undefined;
    if (support) {
      return key;
    }
  }
  return false;
})();

// &#x5BF9;&#x5916;&#x66B4;&#x9732;&#x7684;&#x65B9;&#x6CD5;
export function prefixStyle (style) {
  if (vendor === false) {
    return style;
  }
  if (vendor === &apos;standard&apos;) {
    return style;
  }
  let result = vendor + style.charAt(0).toUpperCase() + style.substr(1);
  return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> elementStyle = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>).style;

<span class="hljs-comment">// &#x5F97;&#x5230;&#x5408;&#x9002;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x524D;&#x7F00;</span>
<span class="hljs-keyword">let</span> vendor = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> transformNames = {
    <span class="hljs-attr">webkit</span>: <span class="hljs-string">&apos;webkitTransform&apos;</span>,
    <span class="hljs-attr">Moz</span>: <span class="hljs-string">&apos;MozTransform&apos;</span>,
    <span class="hljs-attr">O</span>: <span class="hljs-string">&apos;OTransform&apos;</span>,
    <span class="hljs-attr">ms</span>: <span class="hljs-string">&apos;msTransform&apos;</span>,
    <span class="hljs-attr">standard</span>: <span class="hljs-string">&apos;transform&apos;</span>
  };

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> transformNames) {
    <span class="hljs-keyword">let</span> support = elementStyle[transformNames[key]] !== <span class="hljs-literal">undefined</span>;
    <span class="hljs-keyword">if</span> (support) {
      <span class="hljs-keyword">return</span> key;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
})();

<span class="hljs-comment">// &#x5BF9;&#x5916;&#x66B4;&#x9732;&#x7684;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prefixStyle</span> (<span class="hljs-params">style</span>) </span>{
  <span class="hljs-keyword">if</span> (vendor === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span> style;
  }
  <span class="hljs-keyword">if</span> (vendor === <span class="hljs-string">&apos;standard&apos;</span>) {
    <span class="hljs-keyword">return</span> style;
  }
  <span class="hljs-keyword">let</span> result = vendor + style.charAt(<span class="hljs-number">0</span>).toUpperCase() + style.substr(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> result;
}</code></pre><p>&#x4F7F;&#x7528;&#x6848;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5BFC;&#x5165;&#x8BE5;&#x6A21;&#x5757;
import { prefixStyle } from &apos;common/js/dom&apos;;

// &#x52A0;&#x4E86;&#x5408;&#x9002;&#x524D;&#x7F00;&#x7684;CSS&#x5C5E;&#x6027;
const TRANSFORM = prefixStyle(&apos;transform&apos;);

// &#x4F7F;&#x7528;&#x8BE5;CSS&#x5C5E;&#x6027;
this.$refs.image.style[TRANSFORM] = `scale(${scale})`;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5BFC;&#x5165;&#x8BE5;&#x6A21;&#x5757;</span>
<span class="hljs-keyword">import</span> { prefixStyle } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;common/js/dom&apos;</span>;

<span class="hljs-comment">// &#x52A0;&#x4E86;&#x5408;&#x9002;&#x524D;&#x7F00;&#x7684;CSS&#x5C5E;&#x6027;</span>
<span class="hljs-keyword">const</span> TRANSFORM = prefixStyle(<span class="hljs-string">&apos;transform&apos;</span>);

<span class="hljs-comment">// &#x4F7F;&#x7528;&#x8BE5;CSS&#x5C5E;&#x6027;</span>
<span class="hljs-keyword">this</span>.$refs.image.style[TRANSFORM] = <span class="hljs-string">`scale(<span class="hljs-subst">${scale}</span>)`</span>;</code></pre><h1 id="articleHeader17">&#x79FB;&#x52A8;&#x7AEF;&#x7684;touch&#x4E8B;&#x4EF6;</h1><p>&#x968F;&#x7740;&#x89E6;&#x5C4F;&#x8BBE;&#x5907;&#x7684;&#x666E;&#x53CA;&#xFF0C;w3c&#x4E3A;&#x79FB;&#x52A8;&#x7AEF;web&#x65B0;&#x589E;&#x4E86;touch&#x4E8B;&#x4EF6;&#x3002;</p><p>&#x6700;&#x57FA;&#x672C;&#x7684;touch&#x4E8B;&#x4EF6;&#x5305;&#x62EC;4&#x4E2A;&#x4E8B;&#x4EF6;&#xFF1A;</p><ul><li><strong>touchstart </strong>&#x5F53;&#x5728;&#x5C4F;&#x5E55;&#x4E0A;&#x6309;&#x4E0B;&#x624B;&#x6307;&#x65F6;&#x89E6;&#x53D1;</li></ul><p>&#x5F53;&#x7528;&#x6237;&#x624B;&#x6307;&#x89E6;&#x6478;&#x5230;&#x7684;&#x89E6;&#x6478;&#x5C4F;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x3002;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x7684; <code>target</code> &#x5C31;&#x662F; <code>touch</code> &#x53D1;&#x751F;&#x4F4D;&#x7F6E;&#x7684;&#x90A3;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p><ul><li><strong>touchmove </strong>&#x5F53;&#x5728;&#x5C4F;&#x5E55;&#x4E0A;&#x79FB;&#x52A8;&#x624B;&#x6307;&#x65F6;&#x89E6;&#x53D1;</li></ul><p>&#x5373;&#x4F7F;&#x624B;&#x6307;&#x79FB;&#x51FA;&#x4E86; &#x539F;&#x6765;&#x7684;<code>target</code>&#x5143;&#x7D20;&#xFF0C;&#x4F46; <code>touchmove</code> &#x4ECD;&#x7136;&#x4F1A;&#x88AB;&#x4E00;&#x76F4;&#x89E6;&#x53D1;&#xFF0C;&#x800C;&#x4E14; <code>target</code> &#x4ECD;&#x7136;&#x662F;&#x539F;&#x6765;&#x7684; <code>target</code> &#x5143;&#x7D20;&#x3002;</p><ul><li><strong>touchend </strong>&#x5F53;&#x5728;&#x5C4F;&#x5E55;&#x4E0A;&#x62AC;&#x8D77;&#x624B;&#x6307;&#x65F6;&#x89E6;&#x53D1;</li></ul><p>&#x5F53;&#x7528;&#x6237;&#x7684;&#x624B;&#x6307;&#x62AC;&#x8D77;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1; <code>touchend</code> &#x4E8B;&#x4EF6;&#x3002;&#x5982;&#x679C;&#x7528;&#x6237;&#x7684;&#x624B;&#x6307;&#x4ECE;&#x89E6;&#x5C4F;&#x8BBE;&#x5907;&#x7684;&#x8FB9;&#x7F18;&#x79FB;&#x51FA;&#x4E86;&#x89E6;&#x5C4F;&#x8BBE;&#x5907;&#xFF0C;&#x4E5F;&#x4F1A;&#x89E6;&#x53D1; <code>touchend</code> &#x4E8B;&#x4EF6;&#x3002;</p><p><code>touchend</code> &#x4E8B;&#x4EF6;&#x7684; <code>target</code> &#x4E5F;&#x662F;&#x4E0E; <code>touchstart</code> &#x7684; <code>target</code> &#x4E00;&#x81F4;&#xFF0C;&#x5373;&#x4F7F;&#x5DF2;&#x7ECF;&#x79FB;&#x51FA;&#x4E86;&#x5143;&#x7D20;&#x3002;</p><ul><li><strong>touchcancel </strong>&#x5F53;&#x4E00;&#x4E9B;&#x66F4;&#x9AD8;&#x7EA7;&#x522B;&#x7684;&#x4E8B;&#x4EF6;&#x53D1;&#x751F;&#x7684;&#x65F6;&#x5019;&#xFF08;&#x5982;&#x7535;&#x8BDD;&#x63A5;&#x5165;&#x6216;&#x8005;&#x5F39;&#x51FA;&#x4FE1;&#x606F;&#xFF09;&#x4F1A;&#x53D6;&#x6D88;&#x5F53;&#x524D;&#x7684;touch&#x64CD;&#x4F5C;&#xFF0C;&#x5373;&#x89E6;&#x53D1;touchcancel&#x3002;&#x4E00;&#x822C;&#x4F1A;&#x5728;touchcancel&#x65F6;&#x6682;&#x505C;&#x6E38;&#x620F;&#x3001;&#x5B58;&#x6863;&#x7B49;&#x64CD;&#x4F5C;&#x3002;</li></ul><p><code>&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;&#x4E86;&#x89E6;&#x6478;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x8C03;&#x7528; event.preventDefault()&#x6765;&#x963B;&#x6B62;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#x88AB;&#x89E6;&#x53D1;&#x3002;</code></p><p>&#x4E0E;&#x79FB;&#x52A8;&#x7AEF;&#x76F8;&#x5173;&#x7684;<code>interface</code>&#x4E3B;&#x8981;&#x6709;&#x4E09;&#x4E2A;&#xFF1A;</p><ul><li>TouchEvent &#x8868;&#x793A;&#x89E6;&#x6478;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#x89E6;&#x53D1;&#x7684;event</li></ul><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x68C0;&#x67E5;&#x89E6;&#x6478;&#x4E8B;&#x4EF6;&#x7684; <code>TouchEvent.type</code> &#x5C5E;&#x6027;&#x6765;&#x786E;&#x5B9A;&#x5F53;&#x524D;&#x4E8B;&#x4EF6;&#x5C5E;&#x4E8E;&#x54EA;&#x79CD;&#x7C7B;&#x578B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dom.addEventListener(&apos;touchstart&apos;,(e) =&gt; {
    // &#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;
    let type = e.type;
    // toch&#x4E8B;&#x4EF6;&#x53D1;&#x751F;&#x65F6;&#x90A3;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x5143;&#x7D20;&#x5BF9;&#x8C61;
    let target = e.target;    
    
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">dom.addEventListener(<span class="hljs-string">&apos;touchstart&apos;</span>,(e) =&gt; {
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</span>
    <span class="hljs-keyword">let</span> type = e.type;
    <span class="hljs-comment">// toch&#x4E8B;&#x4EF6;&#x53D1;&#x751F;&#x65F6;&#x90A3;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x5143;&#x7D20;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">let</span> target = e.target;    
    
});</code></pre><ul><li>Touch &#x8868;&#x793A;&#x7528;&#x6237;&#x548C;&#x89E6;&#x5C4F;&#x8BBE;&#x5907;&#x4E4B;&#x95F4;&#x63A5;&#x89E6;&#x65F6;&#x5355;&#x72EC;&#x7684;&#x4EA4;&#x4E92;&#x70B9;(a single point of contact)</li></ul><p><code>screenX</code>&#x3001;<code>screenY</code>:&#x89E6;&#x70B9;&#x76F8;&#x5BF9;&#x4E8E;&#x5C4F;&#x5E55;&#x5DE6;&#x8FB9;&#x7F18;&#x6216;&#x4E0A;&#x8FB9;&#x7F18;&#x7684;x&#x3001;y&#x5750;&#x6807;&#x3002;<br><code>clientX</code>&#x3001;<code>clientY</code>:&#x89E6;&#x70B9;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;viewport&#x5DE6;&#x8FB9;&#x7F18;&#x6216;&#x4E0A;&#x8FB9;&#x7F18;&#x7684;x&#x3001;y&#x5750;&#x6807;&#x3002;&#xFF08;&#x4E0D;&#x5305;&#x542B;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;&#xFF09;</p><p><code>pageX</code>&#x3001;<code>pageY</code>:&#x89E6;&#x70B9;&#x76F8;&#x5BF9;&#x4E8E;document&#x7684;&#x5DE6;&#x8FB9;&#x7F18;&#x6216;&#x4E0A;&#x8FB9;&#x7F18;&#x7684;x&#x3001;y&#x5750;&#x6807;&#x3002;&#x4E0E;client&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x5305;&#x542B;&#x5DE6;&#x8FB9;&#x6EDA;&#x52A8;&#x7684;&#x8DDD;&#x79BB;&#x3002;</p><p><code>target</code>:&#x89E6;&#x6478;&#x5F00;&#x59CB;&#x65F6;&#x7684;element&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x83B7;&#x53D6;touchList
let touchList = e.changedTouches;
// &#x83B7;&#x53D6;&#x7B2C;i&#x4E2A;touch&#x5BF9;&#x8C61;
let touch = touchList[i];

touch.screenX
touch.clientX
touch.pageX
touch.target
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x83B7;&#x53D6;touchList</span>
<span class="hljs-keyword">let</span> touchList = e.changedTouches;
<span class="hljs-comment">// &#x83B7;&#x53D6;&#x7B2C;i&#x4E2A;touch&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">let</span> touch = touchList[i];

touch.screenX
touch.clientX
touch.pageX
touch.target
...</code></pre><ul><li>TouchList &#x8868;&#x793A;&#x4E00;&#x7EC4;touches&#x3002;&#x5F53;&#x53D1;&#x751F;&#x591A;&#x70B9;&#x89E6;&#x6478;&#x7684;&#x65F6;&#x5019;&#x624D;&#x7528;&#x7684;&#x5230;&#x3002;</li></ul><p>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x7528;&#x6237;&#x7528;&#x4E09;&#x6839;&#x624B;&#x6307;&#x63A5;&#x89E6;&#x5C4F;&#x5E55;(&#x6216;&#x8005;&#x89E6;&#x63A7;&#x677F;), &#x4E0E;&#x4E4B;&#x76F8;&#x5173;&#x7684;<code>TouchList</code>&#x5BF9;&#x4E8E;&#x6BCF;&#x6839;&#x624B;&#x6307;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A; <code>Touch</code> &#x5BF9;&#x8C61;, &#x5171;&#x8BA1; 3 &#x4E2A;.<br>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dom.addEventListener(&apos;touchstart&apos;,(e) =&gt; {
    // &#x8FD9;&#x4E2A; TouchList&#x5BF9;&#x8C61;&#x5217;&#x51FA;&#x4E86;&#x548C;&#x8FD9;&#x4E2A;&#x89E6;&#x6478;&#x4E8B;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;&#x90A3;&#x4E9B;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x7684; Touch &#x5BF9;&#x8C61;
    e.changedTouches
    // &#x8FD9;&#x4E2A;TouchList&#x5217;&#x51FA;&#x4E86;&#x90A3;&#x4E9B; touchstart&#x53D1;&#x751F;&#x5728;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x8FD8;&#x6CA1;&#x6709;&#x79BB;&#x5F00; touch surface &#x7684;touch point(&#x624B;&#x6307;)
    e.targetTouches
    // &#x8FD9;&#x4E2A; TouchList &#x5217;&#x51FA;&#x4E86;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x65F6;&#xFF1A; touch suface&#x4E0A;&#x6240;&#x6709;&#x7684; touch point&#x3002;
    e.touches
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">dom.addEventListener(<span class="hljs-string">&apos;touchstart&apos;</span>,(e) =&gt; {
    <span class="hljs-comment">// &#x8FD9;&#x4E2A; TouchList&#x5BF9;&#x8C61;&#x5217;&#x51FA;&#x4E86;&#x548C;&#x8FD9;&#x4E2A;&#x89E6;&#x6478;&#x4E8B;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;&#x90A3;&#x4E9B;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x7684; Touch &#x5BF9;&#x8C61;</span>
    e.changedTouches
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;TouchList&#x5217;&#x51FA;&#x4E86;&#x90A3;&#x4E9B; touchstart&#x53D1;&#x751F;&#x5728;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x8FD8;&#x6CA1;&#x6709;&#x79BB;&#x5F00; touch surface &#x7684;touch point(&#x624B;&#x6307;)</span>
    e.targetTouches
    <span class="hljs-comment">// &#x8FD9;&#x4E2A; TouchList &#x5217;&#x51FA;&#x4E86;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x65F6;&#xFF1A; touch suface&#x4E0A;&#x6240;&#x6709;&#x7684; touch point&#x3002;</span>
    e.touches
});</code></pre><h1 id="articleHeader18">&#x64AD;&#x653E;&#x5668;&#x5185;&#x6838;&#x5F00;&#x53D1;</h1><h3 id="articleHeader19">audio&#x6807;&#x7B7E;</h3><p>&#x5BF9;&#x4E8E;&#x97F3;&#x4E50;&#x7684;&#x64AD;&#x653E;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;<code>audio</code>&#x6807;&#x7B7E;&#xFF0C;&#x76D1;&#x542C;&#x5B83;&#x7684;&#x4E8B;&#x4EF6;&#x548C;&#x64CD;&#x4F5C;DOM&#xFF0C;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x5BF9;&#x97F3;&#x4E50;&#x64AD;&#x653E;&#x3001;<br>&#x6682;&#x505C;&#x3001;&#x8FDB;&#x5EA6;&#x63A7;&#x5236;&#x7B49;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;audio ref=&quot;audio&quot; :src=&quot;currentSongUrl&quot;
    @canplay=&quot;songCanPlay&quot;
    @error=&quot;songError&quot;
    @ended=&quot;songEnd&quot;
    @timeupdate=&quot;updateTime&quot;&gt;
&lt;/audio&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;audio&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;currentSongUrl&quot;</span>
    @<span class="hljs-attr">canplay</span>=<span class="hljs-string">&quot;songCanPlay&quot;</span>
    @<span class="hljs-attr">error</span>=<span class="hljs-string">&quot;songError&quot;</span>
    @<span class="hljs-attr">ended</span>=<span class="hljs-string">&quot;songEnd&quot;</span>
    @<span class="hljs-attr">timeupdate</span>=<span class="hljs-string">&quot;updateTime&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>
</code></pre><p>&#x5BF9;<code>audio</code>&#x8FDB;&#x884C;&#x64CD;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let audio = this.$refs.audio;
// &#x6682;&#x505C;&#x548C;&#x64AD;&#x653E;
audio.pause();
audio.play();

// Audio&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF08;&#x90E8;&#x5206;&#xFF09;

audio.currentTime // &#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x4E2D;&#x7684;&#x5F53;&#x524D;&#x64AD;&#x653E;&#x4F4D;&#x7F6E;&#xFF08;&#x4EE5;&#x79D2;&#x8BA1;&#xFF09;&#x3002;

audio.duration    // &#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x7684;&#x957F;&#x5EA6;&#xFF08;&#x4EE5;&#x79D2;&#x8BA1;&#xFF09;&#x3002;

audio.loop    // &#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x662F;&#x5426;&#x5E94;&#x5728;&#x7ED3;&#x675F;&#x65F6;&#x518D;&#x6B21;&#x64AD;&#x653E;&#x3002;&#xFF08;&#x9ED8;&#x8BA4;false&#xFF09;

audio.volume    // &#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x7684;&#x97F3;&#x91CF;&#x3002;[0,1]

// Audio&#x5BF9;&#x8C61;&#x591A;&#x5A92;&#x4F53;&#x4E8B;&#x4EF6;&#xFF08;Media Events&#xFF09;

onerror // &#x52A0;&#x8F7D;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x7684;&#x56DE;&#x8C03;

ontimeupdate // &#x5F53;&#x64AD;&#x653E;&#x4F4D;&#x7F6E;&#x6539;&#x53D8;&#x65F6;&#x8C03;&#x7528;
updateTime(e) {
    if(this.currentSongReady){
        // &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x64AD;&#x653E;&#x7684;&#x8FDB;&#x5EA6;
        this.currentSongTime=e.traget.currentTime;
    }
}
oncanplay // &#x80FD;&#x591F;&#x64AD;&#x653E;&#x65F6;&#x8C03;&#x7528;

// &#x901A;&#x8FC7;&#x76D1;&#x542C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x8BBE;&#x7F6E;&#x6807;&#x5FD7;&#x4F4D;&#xFF0C;&#x8FD9;&#x4E2A;&#x6807;&#x5FD7;&#x4F4D;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;
// &#x9632;&#x6B62;&#x7528;&#x6237;&#x5FEB;&#x901F;&#x5207;&#x6362;&#x6B4C;&#x66F2;&#x5F15;&#x8D77;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x3002;
songCanPlay(){
    this.currentSongReady = true;
}


onended // &#x5230;&#x8FBE;&#x7ED3;&#x5C3E;&#x65F6;&#x8C03;&#x7528;

onplay&#x3001;onpause..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> audio = <span class="hljs-keyword">this</span>.$refs.audio;
<span class="hljs-comment">// &#x6682;&#x505C;&#x548C;&#x64AD;&#x653E;</span>
audio.pause();
audio.play();

<span class="hljs-comment">// Audio&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF08;&#x90E8;&#x5206;&#xFF09;</span>

audio.currentTime <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x4E2D;&#x7684;&#x5F53;&#x524D;&#x64AD;&#x653E;&#x4F4D;&#x7F6E;&#xFF08;&#x4EE5;&#x79D2;&#x8BA1;&#xFF09;&#x3002;</span>

audio.duration    <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x7684;&#x957F;&#x5EA6;&#xFF08;&#x4EE5;&#x79D2;&#x8BA1;&#xFF09;&#x3002;</span>

audio.loop    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x662F;&#x5426;&#x5E94;&#x5728;&#x7ED3;&#x675F;&#x65F6;&#x518D;&#x6B21;&#x64AD;&#x653E;&#x3002;&#xFF08;&#x9ED8;&#x8BA4;false&#xFF09;</span>

audio.volume    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x97F3;&#x9891;&#x7684;&#x97F3;&#x91CF;&#x3002;[0,1]</span>

<span class="hljs-comment">// Audio&#x5BF9;&#x8C61;&#x591A;&#x5A92;&#x4F53;&#x4E8B;&#x4EF6;&#xFF08;Media Events&#xFF09;</span>

onerror <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x7684;&#x56DE;&#x8C03;</span>

ontimeupdate <span class="hljs-comment">// &#x5F53;&#x64AD;&#x653E;&#x4F4D;&#x7F6E;&#x6539;&#x53D8;&#x65F6;&#x8C03;&#x7528;</span>
updateTime(e) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.currentSongReady){
        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x64AD;&#x653E;&#x7684;&#x8FDB;&#x5EA6;</span>
        <span class="hljs-keyword">this</span>.currentSongTime=e.traget.currentTime;
    }
}
oncanplay <span class="hljs-comment">// &#x80FD;&#x591F;&#x64AD;&#x653E;&#x65F6;&#x8C03;&#x7528;</span>

<span class="hljs-comment">// &#x901A;&#x8FC7;&#x76D1;&#x542C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x8BBE;&#x7F6E;&#x6807;&#x5FD7;&#x4F4D;&#xFF0C;&#x8FD9;&#x4E2A;&#x6807;&#x5FD7;&#x4F4D;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;</span>
<span class="hljs-comment">// &#x9632;&#x6B62;&#x7528;&#x6237;&#x5FEB;&#x901F;&#x5207;&#x6362;&#x6B4C;&#x66F2;&#x5F15;&#x8D77;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x3002;</span>
songCanPlay(){
    <span class="hljs-keyword">this</span>.currentSongReady = <span class="hljs-literal">true</span>;
}


onended <span class="hljs-comment">// &#x5230;&#x8FBE;&#x7ED3;&#x5C3E;&#x65F6;&#x8C03;&#x7528;</span>

onplay&#x3001;onpause...</code></pre><h3 id="articleHeader20">&#x8FDB;&#x5EA6;&#x6761;&#x7EC4;&#x4EF6;</h3><p>1.<code>progress-bar.vue</code>&#x63A5;&#x6536;&#x4E00;&#x4E2A;<code>percent</code>&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x663E;&#x793A;&#x5F53;&#x524D;&#x64AD;&#x653E;&#x7684;&#x4E00;&#x4E2A;&#x8FDB;&#x5EA6;&#x3002;</p><p>2.&#x5BF9;&#x4E8E;&#x8FDB;&#x5EA6;&#x6761;&#x7528;&#x6237;&#x624B;&#x52A8;&#x62D6;&#x52A8;&#x8FDB;&#x5EA6;&#x7684;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;progress-btn&quot; ref=&quot;btn&quot;
     @touchstart=&quot;touchStart&quot;
     @touchmove=&quot;touchMove&quot;
     @touchend=&quot;touchEnd&quot;&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;progress-btn&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;btn&quot;</span>
     @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">&quot;touchStart&quot;</span>
     @<span class="hljs-attr">touchmove</span>=<span class="hljs-string">&quot;touchMove&quot;</span>
     @<span class="hljs-attr">touchend</span>=<span class="hljs-string">&quot;touchEnd&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x601D;&#x8DEF;&#xFF1A;&#x4E3B;&#x8981;&#x662F;&#x901A;&#x8FC7;&#x76D1;&#x542C;<code>ontouchstart</code>&#x3001;<code>ontouchmove</code>&#x3001;<code>ontouchend</code>&#x4E8B;&#x4EF6;&#x6765;&#x5B8C;&#x6210;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x9996;&#x5148;&#x5F97;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;`touch`&#x5BF9;&#x8C61;
let touch = {};

// &#x5728;&#x76D1;&#x542C;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;
touchStart(e){
    this.touch.initialized = true;
    // &#x83B7;&#x53D6;touch&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
    this.touch.startX = e.touches[0].pageX;
    // &#x83B7;&#x53D6;&#x6574;&#x4E2A;&#x8FDB;&#x5EA6;&#x6761;&#x7684;&#x5BBD;&#x5EA6;
    this.touch.barW = xxx;
    // &#x83B7;&#x53D6;&#x5DF2;&#x7ECF;&#x64AD;&#x653E;&#x7684;&#x8FDB;&#x5EA6;
    this.touch.offset = xxx;    
}

touchMove(e){
    // &#x5224;&#x65AD;&#x6709;&#x65E0;&#x521D;&#x59CB;&#x5316;
    ...
    // &#x83B7;&#x53D6;&#x7528;&#x6237;&#x6ED1;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
    let deltaX = e.touches[0].pageX - this.touch.startX;
    let barW = xxx; // &#x8FDB;&#x5EA6;&#x6761;&#x7684;&#x5BBD;&#x5EA6; - &#x62D6;&#x52A8;btn&#x7684;&#x5BBD;&#x5EA6;
    let offset = Math.min(Math.max(0, this.touch.offset + detail), barW);
    
    // &#x6700;&#x540E;&#x8BBE;&#x7F6E;btn&#x7684;&#x4F4D;&#x7F6E;&#x548C;progress&#x7684;&#x8FDB;&#x5EA6;&#x5C31;OK
    ...
}

touchEnd(){
    this.touch.initialized = false;
    // &#x7136;&#x540E;&#x5C06;&#x8FDB;&#x5EA6;&#x63A8;&#x9001;&#x51FA;&#x53BB;&#x5C31;&#x597D;&#x4E86;
    this.$emit(&apos;percentChange&apos;,percent);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x9996;&#x5148;&#x5F97;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;`touch`&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">let</span> touch = {};

<span class="hljs-comment">// &#x5728;&#x76D1;&#x542C;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;</span>
touchStart(e){
    <span class="hljs-keyword">this</span>.touch.initialized = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">// &#x83B7;&#x53D6;touch&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.touch.startX = e.touches[<span class="hljs-number">0</span>].pageX;
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6574;&#x4E2A;&#x8FDB;&#x5EA6;&#x6761;&#x7684;&#x5BBD;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.touch.barW = xxx;
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5DF2;&#x7ECF;&#x64AD;&#x653E;&#x7684;&#x8FDB;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.touch.offset = xxx;    
}

touchMove(e){
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x6709;&#x65E0;&#x521D;&#x59CB;&#x5316;</span>
    ...
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7528;&#x6237;&#x6ED1;&#x52A8;&#x7684;&#x8DDD;&#x79BB;</span>
    <span class="hljs-keyword">let</span> deltaX = e.touches[<span class="hljs-number">0</span>].pageX - <span class="hljs-keyword">this</span>.touch.startX;
    <span class="hljs-keyword">let</span> barW = xxx; <span class="hljs-comment">// &#x8FDB;&#x5EA6;&#x6761;&#x7684;&#x5BBD;&#x5EA6; - &#x62D6;&#x52A8;btn&#x7684;&#x5BBD;&#x5EA6;</span>
    <span class="hljs-keyword">let</span> offset = <span class="hljs-built_in">Math</span>.min(<span class="hljs-built_in">Math</span>.max(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.touch.offset + detail), barW);
    
    <span class="hljs-comment">// &#x6700;&#x540E;&#x8BBE;&#x7F6E;btn&#x7684;&#x4F4D;&#x7F6E;&#x548C;progress&#x7684;&#x8FDB;&#x5EA6;&#x5C31;OK</span>
    ...
}

touchEnd(){
    <span class="hljs-keyword">this</span>.touch.initialized = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// &#x7136;&#x540E;&#x5C06;&#x8FDB;&#x5EA6;&#x63A8;&#x9001;&#x51FA;&#x53BB;&#x5C31;&#x597D;&#x4E86;</span>
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;percentChange&apos;</span>,percent);
}</code></pre><h3 id="articleHeader21">svg&#x5B9E;&#x73B0;&#x5706;&#x5F62;&#x8FDB;&#x5EA6;&#x6761;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;progress-circle&quot;&gt;
    &lt;svg :width=&quot;radius&quot; :height=&quot;radius&quot; viewBox=&quot;0 0 100 100&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;
      &lt;circle class=&quot;progress-background&quot; r=&quot;50&quot; cx=&quot;50&quot; cy=&quot;50&quot; fill=&quot;transparent&quot;/&gt;
      &lt;circle class=&quot;progress-bar&quot; r=&quot;50&quot; cx=&quot;50&quot; cy=&quot;50&quot; fill=&quot;transparent&quot;
              :stroke-dasharray=&quot;dashArray&quot;
              :stroke-dashoffset=&quot;offset&quot;/&gt;
    &lt;/svg&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;progress-circle&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;radius&quot;</span> <span class="hljs-attr">:height</span>=<span class="hljs-string">&quot;radius&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 100 100&quot;</span> <span class="hljs-attr">version</span>=<span class="hljs-string">&quot;1.1&quot;</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">&quot;http://www.w3.org/2000/svg&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;progress-background&quot;</span> <span class="hljs-attr">r</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;transparent&quot;</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;progress-bar&quot;</span> <span class="hljs-attr">r</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;transparent&quot;</span>
              <span class="hljs-attr">:stroke-dasharray</span>=<span class="hljs-string">&quot;dashArray&quot;</span>
              <span class="hljs-attr">:stroke-dashoffset</span>=<span class="hljs-string">&quot;offset&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre><p>&#x901A;&#x8FC7;<code>svg</code>&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5404;&#x79CD;&#x8FDB;&#x5EA6;&#x6761;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x600E;&#x6837;&#x53BB;&#x52A8;&#x6001;&#x7684;&#x4FEE;&#x6539;&#x5B83;&#x7684;&#x8FDB;&#x5EA6;&#x503C;&#x5462;&#xFF1F;</p><p>&#x8FD9;&#x5C31;&#x4E0D;&#x80FD;&#x4E0D;&#x63D0; <code>SVG Stroke &#x5C5E;&#x6027;</code></p><ul><li>stroke &#x5B9A;&#x4E49;&#x4E00;&#x6761;&#x7EBF;&#xFF0C;&#x6587;&#x672C;&#x6216;&#x5143;&#x7D20;&#x8F6E;&#x5ED3;&#x989C;&#x8272;</li><li>stroke-width &#x6587;&#x672C;&#x6216;&#x5143;&#x7D20;&#x8F6E;&#x5ED3;&#x7684;&#x539A;&#x5EA6;</li><li>stroke-dasharray &#x8BE5;&#x5C5E;&#x6027;&#x53EF;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x865A;&#x7EBF;</li><li>stroke-dashoffset &#x8BBE;&#x7F6E;&#x865A;&#x7EBF;&#x8FB9;&#x6846;&#x7684;&#x504F;&#x79FB;&#x91CF;</li></ul><p>OK&#xFF0C;&#x77E5;&#x9053;&#x4E86;&#x4EE5;&#x4E0A;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x8DB3;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53EF;&#x8BBE;&#x7F6E;&#x8FDB;&#x5EA6;&#x7684;SVG&#x8FDB;&#x5EA6;&#x6761;&#x4E86;&#x3002;</p><p>&#x601D;&#x8DEF;&#xFF1A;<code>stroke-dasharray</code>&#x9002;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x865A;&#x7EBF;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x865A;&#x7EBF;&#x957F;&#x5EA6;&#x4E3A;&#x6574;&#x4E2A;&#x8F6E;&#x5ED3;&#x7684;&#x5468;&#x957F;&#x5462;&#x3002;<br><code>stroke-dashoffset</code>&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x865A;&#x7EBF;&#x7684;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x5229;&#x7528;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5BF9;&#x8FDB;&#x5EA6;&#x7684;&#x63A7;&#x5236;&#x3002;</p><p>&#x4E14;&#x770B;&#x4E00;&#x4E2A;&#x5C0F;&#x6817;&#x5B50;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbds9l?w=1213&amp;h=514" src="https://static.alili.tech/img/bVbds9l?w=1213&amp;h=514" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x6240;&#x4EE5;&#xFF0C;&#x901A;&#x8FC7;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x5165;&#x7684;<code>percent</code>&#xFF0C;&#x4E0D;&#x65AD;&#x5730;&#x4FEE;&#x6539;<code>stroke-dashoffset</code>&#x5C31;&#x80FD;&#x8FBE;&#x5230;&#x8FDB;&#x5EA6;&#x7684;&#x663E;&#x793A;&#x4E86;&#x3002;</p><h3 id="articleHeader22">&#x5168;&#x5C4F;&#x548C;&#x9000;&#x51FA;&#x5168;&#x5C4F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5168;&#x5C4F;&#x663E;&#x793A;
document.documentElement.webkitRequestFullScreen();
// &#x9000;&#x51FA;&#x5168;&#x5C4F;
document.webkitExitFullscreen();

// 1.&#x5F97;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x6DFB;&#x52A0;&#x524D;&#x7F00;
// 2.&#x7A0B;&#x5E8F;&#x4E3B;&#x52A8;&#x8C03;&#x7528;&#x4E0D;&#x7BA1;&#x7528;&#xFF0C;&#x5F97;&#x7528;&#x6237;&#x64CD;&#x4F5C;&#x624D;&#x53EF;&#x4EE5;&#xFF08;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5168;&#x5C4F;&#x663E;&#x793A;</span>
<span class="hljs-built_in">document</span>.documentElement.webkitRequestFullScreen();
<span class="hljs-comment">// &#x9000;&#x51FA;&#x5168;&#x5C4F;</span>
<span class="hljs-built_in">document</span>.webkitExitFullscreen();

<span class="hljs-comment">// 1.&#x5F97;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x6DFB;&#x52A0;&#x524D;&#x7F00;</span>
<span class="hljs-comment">// 2.&#x7A0B;&#x5E8F;&#x4E3B;&#x52A8;&#x8C03;&#x7528;&#x4E0D;&#x7BA1;&#x7528;&#xFF0C;&#x5F97;&#x7528;&#x6237;&#x64CD;&#x4F5C;&#x624D;&#x53EF;&#x4EE5;&#xFF08;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#xFF09;</span></code></pre><h3 id="articleHeader23">&#x6B4C;&#x8BCD;&#x9875;&#x7684;&#x663E;&#x793A;</h3><p>&#x901A;&#x8FC7;&#x7F51;&#x7EDC;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x7684;&#x6B4C;&#x8BCD;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbdtgI?w=339&amp;h=407" src="https://static.alili.tech/img/bVbdtgI?w=339&amp;h=407" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5BF9;&#x4E8E;&#x6B4C;&#x8BCD;&#x7684;&#x89E3;&#x6790;&#xFF0C;&#x64AD;&#x653E;&#x662F;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;<a href="https://github.com/ustbhuangyi/lyric-parser" rel="nofollow noreferrer" target="_blank">lyric-parser</a>&#x5B8C;&#x6210;&#x7684;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x5F88;&#x7B80;&#x5355;&#xFF1A;<br>1.&#x901A;&#x8FC7;&#x6B63;&#x5219;&#x628A;&#x65F6;&#x95F4;&#x548C;&#x5BF9;&#x5E94;&#x7684;&#x6B4C;&#x8BCD;&#x5207;&#x5206;&#x51FA;&#x6765;&#x521B;&#x5EFA;&#x6210;&#x5BF9;&#x8C61;&#x3002;<br>2.&#x5F53;&#x8C03;&#x7528;<code>play</code>&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x5B9A;&#x65F6;&#x5668;&#x5B8C;&#x6210;&#x6B4C;&#x8BCD;&#x7684;&#x64AD;&#x653E;&#xFF0C;&#x5E76;&#x5C06;&#x5BF9;&#x5E94;&#x7684;&#x884C;&#x53F7;&#x548C;&#x6B4C;&#x8BCD;&#x901A;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x51FA;&#x53BB;&#x3002;</p><p>&#x5F53;&#x64AD;&#x653E;&#x7684;&#x6B4C;&#x8BCD;&#x8D85;&#x8FC7;5&#x884C;&#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5C01;&#x88C5;&#x7684;<code>scroll</code>&#x7EC4;&#x4EF6;&#x5B8C;&#x6210;&#x6EDA;&#x52A8;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (lineNum &gt; 5) {
  let elements = this.$refs.lyricLine;
  this.$refs.lyricScroll.scrollToElement(elements[lineNum - 5], 1000);
} else {
  this.$refs.lyricScroll.scrollTo(0, 0, 1000);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (lineNum &gt; <span class="hljs-number">5</span>) {
  <span class="hljs-keyword">let</span> elements = <span class="hljs-keyword">this</span>.$refs.lyricLine;
  <span class="hljs-keyword">this</span>.$refs.lyricScroll.scrollToElement(elements[lineNum - <span class="hljs-number">5</span>], <span class="hljs-number">1000</span>);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">this</span>.$refs.lyricScroll.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1000</span>);
}</code></pre><h3 id="articleHeader24">Vue&#x4E2D;&#x7684;mixin</h3><p>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;mixin&#xFF1F;</p><p>&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x516C;&#x7528;&#x4E00;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x8FD9;&#x90E8;&#x5206;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x4F5C;&#x4E3A;<code>mixin</code>&#xFF0C;&#x53EA;&#x8981;&#x5F15;&#x5165;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p>&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x7684;<code>mixin</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapGetters } from &apos;vuex&apos;;

export const playListMixin = {

  mounted () {
    this.handlePlayList(this.playList);
  },
  // &#x5F53;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x9875;&#x9762;&#x6FC0;&#x6D3B;&#x65F6;&#x8C03;&#x7528;
  activated () {
    this.handlePlayList(this.playList);
  },
  watch: {
    playList (newPlayList) {
      this.handlePlayList(newPlayList);
    }
  },
  computed: {
    ...mapGetters([
      &apos;playList&apos;
    ])
  },
  methods: {
      // &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x81EA;&#x5DF1;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x629B;&#x51FA;&#x9519;&#x8BEF;
    handlePlayList () {
      throw new Error(&apos;Components must implement handlePlayList method.&apos;);
    }
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> playListMixin = {

  mounted () {
    <span class="hljs-keyword">this</span>.handlePlayList(<span class="hljs-keyword">this</span>.playList);
  },
  <span class="hljs-comment">// &#x5F53;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x9875;&#x9762;&#x6FC0;&#x6D3B;&#x65F6;&#x8C03;&#x7528;</span>
  activated () {
    <span class="hljs-keyword">this</span>.handlePlayList(<span class="hljs-keyword">this</span>.playList);
  },
  <span class="hljs-attr">watch</span>: {
    playList (newPlayList) {
      <span class="hljs-keyword">this</span>.handlePlayList(newPlayList);
    }
  },
  <span class="hljs-attr">computed</span>: {
    ...mapGetters([
      <span class="hljs-string">&apos;playList&apos;</span>
    ])
  },
  <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x81EA;&#x5DF1;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x629B;&#x51FA;&#x9519;&#x8BEF;</span>
    handlePlayList () {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Components must implement handlePlayList method.&apos;</span>);
    }
  }
};</code></pre><p>&#x6709;&#x4E86;<code>mixin</code>&#x6211;&#x4EEC;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x4F7F;&#x7528;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { playListMixin } from &apos;common/js/mixin&apos;;

export default{
    mixins: [playListMixin],
    ...
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { playListMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;common/js/mixin&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">mixins</span>: [playListMixin],
    ...
}
</code></pre><h1 id="articleHeader25">&#x8282;&#x6D41;&#x5904;&#x7406;</h1><p>&#x5728;&#x641C;&#x7D22;&#x9875;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5904;&#x7406;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x7136;&#x540E;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x3002;<br>&#x4E3A;&#x4E86;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x8BF7;&#x6C42;&#x3001;&#x8282;&#x7701;&#x6D41;&#x91CF;&#x548C;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x6027;&#x80FD;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x6709;&#x5FC5;&#x8981;&#x505A;&#x8282;&#x6D41;&#x5904;&#x7406;&#x3002;</p><p>&#x5728;&#x641C;&#x7D22;&#x6846;<code>search-box</code>&#x8FD9;&#x4E2A;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5728;created&#x94A9;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x7528;&#x6237;&#x8F93;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#xFF08;query&#xFF09;&#x53D8;&#x5316;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x53D8;&#x5316;&#x540E;&#x7684;&#x5B57;&#x7B26;&#x4E32;
// &#x63D0;&#x4EA4;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;

// &#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x53C8;&#x5305;&#x4E86;&#x4E00;&#x5C42;debounce&#x51FD;&#x6570;

created () {
  this.$watch(&apos;query&apos;, debounce(() =&gt; {
    this.$emit(&apos;queryChange&apos;, this.query);
  }, 500));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5728;created&#x94A9;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x7528;&#x6237;&#x8F93;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#xFF08;query&#xFF09;&#x53D8;&#x5316;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x53D8;&#x5316;&#x540E;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-comment">// &#x63D0;&#x4EA4;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;</span>

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x53C8;&#x5305;&#x4E86;&#x4E00;&#x5C42;debounce&#x51FD;&#x6570;</span>

created () {
  <span class="hljs-keyword">this</span>.$watch(<span class="hljs-string">&apos;query&apos;</span>, debounce(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;queryChange&apos;</span>, <span class="hljs-keyword">this</span>.query);
  }, <span class="hljs-number">500</span>));
}</code></pre><p>&#x6240;&#x4EE5;<code>debounce</code>&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x8282;&#x6D41;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(func,delay){
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=&gt;{
            func.apply(this,args);
        },delay)        
    }
}

// &#x6D4B;&#x8BD5;
function show(){
    console.log(&apos;hello...&apos;);
}

var func = debounce(show,3000);

// &#x8C03;&#x7528;
func(); 

// &#x8FDE;&#x7EED;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x8D85;&#x8FC7;&#x4E09;&#x79D2;&#x662F;&#x4E0D;&#x4F1A;&#x6709;&#x4EFB;&#x4F55;&#x8F93;&#x51FA;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">func,delay</span>)</span>{
    <span class="hljs-keyword">let</span> timer = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>)</span>{
        <span class="hljs-keyword">if</span>(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            func.apply(<span class="hljs-keyword">this</span>,args);
        },delay)        
    }
}

<span class="hljs-comment">// &#x6D4B;&#x8BD5;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello...&apos;</span>);
}

<span class="hljs-keyword">var</span> func = debounce(show,<span class="hljs-number">3000</span>);

<span class="hljs-comment">// &#x8C03;&#x7528;</span>
func(); 

<span class="hljs-comment">// &#x8FDE;&#x7EED;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x8D85;&#x8FC7;&#x4E09;&#x79D2;&#x662F;&#x4E0D;&#x4F1A;&#x6709;&#x4EFB;&#x4F55;&#x8F93;&#x51FA;&#x7684;</span></code></pre><h1 id="articleHeader26">animation&#x52A8;&#x753B;</h1><p>&#x8BED;&#x6CD5;&#xFF1A;</p><blockquote>animation: name duration timing-function delay iteration-count direction fill-mode play-state;<br>animation: &#x52A8;&#x753B;&#x540D;&#x79F0; &#x6267;&#x884C;&#x65F6;&#x95F4; &#x901F;&#x5EA6;&#x66F2;&#x7EBF; &#x5EF6;&#x65F6;&#x65F6;&#x95F4; &#x6267;&#x884C;&#x6B21;&#x6570; &#x52A8;&#x753B;&#x64AD;&#x653E;&#x987A;&#x5E8F; &#x7ED3;&#x675F;&#x65F6;&#x5E94;&#x7528;&#x7684;&#x6837;&#x5F0F; &#x64AD;&#x653E;&#x7684;&#x72B6;&#x6001;&#xFF08;paused|running&#xFF09;</blockquote><h1 id="articleHeader27">&#x5C01;&#x88C5;localStorage&#x64CD;&#x4F5C;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const __VERSION__ = &apos;1.0.1&apos;;
const store = {
  version: __VERSION__,
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
};

// &#x64CD;&#x4F5C;store&#x7684;api
const api = {
  set (key, val) {
    if (this.disabled) {
      return false;
    }
    if (val === undefined) {
      return this.remove(key);
    }
    this.storage.setItem(key, this.serialize(val));
    return val;
  },
  get (key, val) {
    if (this.disabled) {
      return false;
    }
    let result = this.storage.getItem(key);
    if (!result) {
      return val;
    }
    return this.deSerialize(result);
  },
  getAll () {
    if (this.disabled) {
      return false;
    }
    let ret = {};
    for (let key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        ret[key] = this.get(key);
      }
    }
    return ret;
  },
  remove (key) {
    if (this.disabled) {
      return false;
    }
    this.storage.removeItem(key);
  },
  removeAll () {
    if (this.disabled) {
      return false;
    }
    this.storage.clear();
  },
  forEach (cb) {
    if (this.disabled) {
      return false;
    }
    for (let key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        cb &amp;&amp; cb(key, this.get(key));
      }
    }
  },
  has (key) {
    if (this.disabled) {
      return false;
    }
    return key === this.get(key);
  },
  serialize (val) {
    try {
      return JSON.stringify(val) || undefined;
    } catch (e) {
      return undefined;
    }
  },
  deSerialize (val) {
    if (typeof val !== &apos;string&apos;) {
      return undefined;
    }
    try {
      return JSON.parse(val) || undefined;
    } catch (e) {
      return undefined;
    }
  }
};

// &#x6269;&#x5C55;store&#x5BF9;&#x8C61;
Object.assign(store, api);
Object.assign(store.session, api);

// &#x6D4F;&#x89C8;&#x5668;&#x80FD;&#x529B;&#x68C0;&#x6D4B;
try {
  let testKey = &apos;test_key&apos;;
  store.set(testKey, testKey);
  if (store.get(testKey) !== testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (e) {
  store.disabled = true;
}

export default store;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> __VERSION__ = <span class="hljs-string">&apos;1.0.1&apos;</span>;
<span class="hljs-keyword">const</span> store = {
  <span class="hljs-attr">version</span>: __VERSION__,
  <span class="hljs-attr">storage</span>: <span class="hljs-built_in">window</span>.localStorage,
  <span class="hljs-attr">session</span>: {
    <span class="hljs-attr">storage</span>: <span class="hljs-built_in">window</span>.sessionStorage
  }
};

<span class="hljs-comment">// &#x64CD;&#x4F5C;store&#x7684;api</span>
<span class="hljs-keyword">const</span> api = {
  set (key, val) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">if</span> (val === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.remove(key);
    }
    <span class="hljs-keyword">this</span>.storage.setItem(key, <span class="hljs-keyword">this</span>.serialize(val));
    <span class="hljs-keyword">return</span> val;
  },
  get (key, val) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">this</span>.storage.getItem(key);
    <span class="hljs-keyword">if</span> (!result) {
      <span class="hljs-keyword">return</span> val;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.deSerialize(result);
  },
  getAll () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">let</span> ret = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.storage) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.storage.hasOwnProperty(key)) {
        ret[key] = <span class="hljs-keyword">this</span>.get(key);
      }
    }
    <span class="hljs-keyword">return</span> ret;
  },
  remove (key) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">this</span>.storage.removeItem(key);
  },
  removeAll () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">this</span>.storage.clear();
  },
  forEach (cb) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.storage) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.storage.hasOwnProperty(key)) {
        cb &amp;&amp; cb(key, <span class="hljs-keyword">this</span>.get(key));
      }
    }
  },
  has (key) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> key === <span class="hljs-keyword">this</span>.get(key);
  },
  serialize (val) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(val) || <span class="hljs-literal">undefined</span>;
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    }
  },
  deSerialize (val) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">&apos;string&apos;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    }
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(val) || <span class="hljs-literal">undefined</span>;
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    }
  }
};

<span class="hljs-comment">// &#x6269;&#x5C55;store&#x5BF9;&#x8C61;</span>
<span class="hljs-built_in">Object</span>.assign(store, api);
<span class="hljs-built_in">Object</span>.assign(store.session, api);

<span class="hljs-comment">// &#x6D4F;&#x89C8;&#x5668;&#x80FD;&#x529B;&#x68C0;&#x6D4B;</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> testKey = <span class="hljs-string">&apos;test_key&apos;</span>;
  store.set(testKey, testKey);
  <span class="hljs-keyword">if</span> (store.get(testKey) !== testKey) {
    store.disabled = <span class="hljs-literal">true</span>;
  }
  store.remove(testKey);
} <span class="hljs-keyword">catch</span> (e) {
  store.disabled = <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;
</code></pre><h1 id="articleHeader28">&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;</h1><p>&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#xFF1F;</p><p>&#x5982;&#x679C;&#x5F00;&#x53D1;&#x7684;App&#x592A;&#x5927;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x9996;&#x5C4F;&#x6E32;&#x67D3;&#x8FC7;&#x6162;&#xFF0C;&#x4E3A;&#x4E86;&#x589E;&#x5F3A;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF0C;&#x52A0;&#x5FEB;&#x6E32;&#x67D3;&#x901F;&#x5EA6;&#xFF0C;<br>&#x9700;&#x8981;&#x7528;&#x5230;&#x61D2;&#x52A0;&#x8F7D;&#x529F;&#x80FD;&#x3002;&#x8BA9;&#x9996;&#x5C4F;&#x7684;&#x5185;&#x5BB9;&#x5148;&#x52A0;&#x8F7D;&#x51FA;&#x6765;&#xFF0C;&#x5176;&#x4ED6;&#x8DEF;&#x7531;&#x4E0B;&#x7684;&#x7EC4;&#x4EF6;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x3002;</p><p>vue&#x5B98;&#x7F51;&#x63CF;&#x8FF0;&#xFF1A;</p><blockquote>&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;<br>&#x5728;&#x5927;&#x578B;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x5C06;&#x5E94;&#x7528;&#x5206;&#x5272;&#x6210;&#x5C0F;&#x4E00;&#x4E9B;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x5728;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x52A0;&#x8F7D;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x3002;<br>&#x4E3A;&#x4E86;&#x7B80;&#x5316;&#xFF0C;Vue &#x5141;&#x8BB8;&#x4F60;&#x4EE5;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x4F1A;&#x5F02;&#x6B65;&#x89E3;&#x6790;&#x4F60;&#x7684;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x3002;<br>Vue &#x53EA;&#x6709;&#x5728;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x88AB;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x89E6;&#x53D1;&#x8BE5;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x4E14;&#x4F1A;&#x628A;&#x7ED3;&#x679C;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#x4F9B;&#x672A;&#x6765;&#x91CD;&#x6E32;&#x67D3;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AsyncComponent = () =&gt; ({
  // &#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6; (&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A; `Promise` &#x5BF9;&#x8C61;)
  component: import(&apos;./MyComponent.vue&apos;),
  // &#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;
  loading: LoadingComponent,
  // &#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;
  error: ErrorComponent,
  // &#x5C55;&#x793A;&#x52A0;&#x8F7D;&#x65F6;&#x7EC4;&#x4EF6;&#x7684;&#x5EF6;&#x65F6;&#x65F6;&#x95F4;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 200 (&#x6BEB;&#x79D2;)
  delay: 200,
  // &#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#x4E14;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x4E5F;&#x8D85;&#x65F6;&#x4E86;&#xFF0C;
  // &#x5219;&#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#xFF1A;`Infinity`
  timeout: 3000
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> AsyncComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-comment">// &#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6; (&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A; `Promise` &#x5BF9;&#x8C61;)</span>
  component: <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./MyComponent.vue&apos;</span>),
  <span class="hljs-comment">// &#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;</span>
  loading: LoadingComponent,
  <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;</span>
  error: ErrorComponent,
  <span class="hljs-comment">// &#x5C55;&#x793A;&#x52A0;&#x8F7D;&#x65F6;&#x7EC4;&#x4EF6;&#x7684;&#x5EF6;&#x65F6;&#x65F6;&#x95F4;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 200 (&#x6BEB;&#x79D2;)</span>
  delay: <span class="hljs-number">200</span>,
  <span class="hljs-comment">// &#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#x4E14;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x4E5F;&#x8D85;&#x65F6;&#x4E86;&#xFF0C;</span>
  <span class="hljs-comment">// &#x5219;&#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#xFF1A;`Infinity`</span>
  timeout: <span class="hljs-number">3000</span>
})</code></pre><p><strong>&#x6CE8;&#x610F;:&#x5982;&#x679C;&#x4F60;&#x5E0C;&#x671B;&#x5728; Vue Router &#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x4E0A;&#x8FF0;&#x8BED;&#x6CD5;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x4F7F;&#x7528; Vue Router 2.4.0+ &#x7248;&#x672C;&#x3002;</strong></p><p>&#x5F53;&#x7136;&#x4E3A;&#x4E86;&#x7B80;&#x5355;&#x8D77;&#x89C1;&#xFF1A;</p><p>&#x5728;<code>router/index.js</code>&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x8FD9;&#x6837;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import Recommend from &apos;@/components/recommend/recommend&apos;;
const Recommend = () =&gt; ({
  component: import(&apos;@/components/recommend/recommend&apos;)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// import Recommend from &apos;@/components/recommend/recommend&apos;;</span>
<span class="hljs-keyword">const</span> Recommend = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-attr">component</span>: <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;@/components/recommend/recommend&apos;</span>)
});</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue的移动端web音乐播放器

## 原文链接
[https://segmentfault.com/a/1190000015629684](https://segmentfault.com/a/1190000015629684)


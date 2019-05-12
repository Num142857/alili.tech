---
title: 基于react/vue的移动端终极适配方案（更新css-modules配置）
hidden: true
categories: [reprint]
slug: 19712f5b
date: 2018-10-30 02:30:12
---

{{< raw >}}
<p>&#x5148;&#x4E0A;github&#x5730;&#x5740; <a href="https://github.com/gaohan1994/react-vw-layout" rel="nofollow noreferrer" target="_blank">https://github.com/gaohan1994...</a> &#x6709;&#x7A7A;&#x70B9;&#x4E2A;&#x8D5E;&#x86E4;~~</p><h3 id="articleHeader0"><code>2018-4-19&#x65E5;&#x66F4;&#x65B0;&#x9002;&#x914D;&#x5230;&#x5B89;&#x5353;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x63D2;&#x4EF6;buggyfill&#xFF08;&#x662F;&#x6211;&#x758F;&#x5FFD;&#x5BFC;&#x81F4;&#x5927;&#x5BB6;&#x4EE5;&#x4E3A;vw&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x517C;&#x5BB9;&#x8303;&#x56F4;&#x8FC7;&#x5C0F;&#xFF0C;&#x539F;&#x7B2C;&#x516D;&#x6B65;css-modules&#x6539;&#x4E3A;buggyfill&#xFF0C;css-modules&#x987A;&#x5EF6;&#x4E3A;&#x7B2C;&#x4E03;&#x6B65;&#xFF09;</code></h3><h3 id="articleHeader1"><code>2018-4-16&#x65E5;&#x66F4;&#x65B0;css-modules&#x914D;&#x7F6E;&#xFF0C;&#x524D;&#x9762;&#x6B65;&#x9AA4;&#x4E0D;&#x53D8;&#xFF0C;&#x53EF;&#x76F4;&#x63A5;&#x8DF3;&#x5230;&#x7B2C;&#x4E03;&#x6B65;&#x3002;</code></h3><h2 id="articleHeader2">&#x5199;&#x5728;&#x524D;&#x9762;&#x7684;&#x8BDD;</h2><blockquote>&#x5728;&#x63A5;&#x89E6;&#x5230;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7275;&#x5934;&#x5F00;&#x53D1;&#x7684;vw&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x963F;&#x91CC;&#x7684;&#x7B2C;&#x4E00;&#x4EE3;&#x9002;&#x914D;&#x89E3;&#x51B3;&#x65B9;&#x6848; <a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">lib-flexible</a> &#x5728;&#x4F7F;&#x7528;vw&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5F00;&#x53D1;&#x4E00;&#x5957;H5&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x771F;&#x6B63;&#x7684;&#x88AB;vw&#x7684;&#x5A01;&#x529B;&#x6240;&#x6298;&#x670D;&#x3002;<br>&#x7531;&#x4E8E;&#x5927;&#x6F20;&#x5148;&#x751F;&#x53EA;&#x7ED9;&#x51FA;&#x4E86;vue-cli&#x7684;&#x914D;&#x7F6E;&#x65B9;&#x5F0F;&#xFF0C;&#x5E76;&#x672A;&#x7ED9;&#x51FA;react&#x7CFB;&#x5217;&#x5BF9;&#x5E94;&#x811A;&#x624B;&#x67B6;create-react-app&#x914D;&#x7F6E;&#x7248;&#x672C;&#xFF0C;&#x5728;&#x770B;&#x8FC7;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7684;&#x914D;&#x7F6E;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x5728;create-react-app&#x811A;&#x624B;&#x67B6;&#x751F;&#x6210;&#x7684;&#x9879;&#x76EE;&#x4E0A;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x5957;&#x914D;&#x7F6E;&#xFF0C;&#x4F7F;&#x5F97;&#x4F7F;&#x7528;react&#x7684;&#x5404;&#x4F4D;&#x5E08;&#x5144;&#x5F1F;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;vw&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF01;<br>&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#x5F00;&#x5DE5;<p>vue&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;<a href="https://www.w3cplus.com/mobile/vw-layout-in-vue.html" rel="nofollow noreferrer" target="_blank">&#x300A;&#x5982;&#x4F55;&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;vw&#x5B9E;&#x73B0;&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;&#x300B;</a><br>&#x5173;&#x4E8E;&#x5177;&#x4F53;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x8BF7;&#x53C2;&#x8003;<br><a href="https://www.w3cplus.com/css/vw-for-layout.html" rel="nofollow noreferrer" target="_blank">&#x518D;&#x804A;&#x79FB;&#x52A8;&#x7AEF;&#x9875;&#x9762;&#x7684;&#x9002;&#x914D;</a><br><a href="https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html" rel="nofollow noreferrer" target="_blank">&#x4F7F;&#x7528;Flexible&#x5B9E;&#x73B0;&#x624B;&#x6DD8;H5&#x9875;&#x9762;&#x7684;&#x7EC8;&#x7AEF;&#x9002;&#x914D;</a></p></blockquote><h4>&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;&#x6700;&#x63A5;&#x8FD1;&#x5B8C;&#x7F8E;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5728;react&#x4E2D;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x3002;&#x672C;&#x6587;&#x53EA;&#x8BB2;create-react-app&#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#xFF0C;&#x5177;&#x4F53;&#x6BCF;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x7528;&#x9014;&#x548C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x8BF7;&#x5148;&#x67E5;&#x9605;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7684;&#x6587;&#x7AE0;&#x5DF2;&#x7ECF;&#x8BB2;&#x7684;&#x5F88;&#x660E;&#x767D;&#x3002;</h4><p><a href="https://www.w3cplus.com/mobile/vw-layout-in-vue.html" rel="nofollow noreferrer" target="_blank">&#x300A;&#x5982;&#x4F55;&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;vw&#x5B9E;&#x73B0;&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;&#x300B;</a></p><p><a href="https://www.w3cplus.com/mobile/vw-layout-in-vue.html" rel="nofollow noreferrer" target="_blank">&#x300A;&#x5982;&#x4F55;&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;vw&#x5B9E;&#x73B0;&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;&#x300B;</a></p><p><a href="https://www.w3cplus.com/mobile/vw-layout-in-vue.html" rel="nofollow noreferrer" target="_blank">&#x300A;&#x5982;&#x4F55;&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;vw&#x5B9E;&#x73B0;&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;&#x300B;</a></p><h4>&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x8BF4;&#x4E09;&#x904D;&#x3002;&#x4E00;&#x5B9A;&#x8981;&#x5148;&#x5927;&#x6982;&#x770B;&#x4E00;&#x4E0B;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7684;&#x6587;&#x7AE0;&#x518D;&#x5F80;&#x4E0B;&#x770B;&#xFF0C;&#x5426;&#x5219;&#x53EF;&#x80FD;&#x4F1A;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#x3002;</h4><h2 id="articleHeader3">1.&#x521B;&#x5EFA;&#x9879;&#x76EE;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create-react-app react-vw-layout
cd react-vw-layout
npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">react-vw-</span><span class="hljs-string">layout
</span><span class="hljs-string">cd </span><span class="hljs-string">react-vw-</span><span class="hljs-string">layout
</span><span class="hljs-string">npm </span><span class="hljs-string">start</span></code></pre><p>&#x6253;&#x5F00;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/ &#x53EF;&#x4EE5;&#x770B;&#x5230;react&#x6B22;&#x8FCE;&#x9875;&#x9762;&#xFF0C;&#x7B2C;&#x4E00;&#x6B65;&#x6210;&#x529F;&#x3002;</p><h2 id="articleHeader4">2.&#x6253;&#x5F00;&#x914D;&#x7F6E;&#x9009;&#x9879;</h2><p>&#x7531;&#x4E8E;react&#x9ED8;&#x8BA4;&#x9690;&#x85CF;webpack&#x914D;&#x7F6E;&#x9700;&#x8981;&#x624B;&#x52A8;&#x663E;&#x793A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject
//Are you sure you want to eject? This action is permanent. (y/N) 
y" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>npm <span class="hljs-keyword">run</span> eject
<span class="hljs-comment">//Are you sure you want to eject? This action is permanent. (y/N) </span>
<span class="hljs-built_in">y</span></code></pre><p>&#x8FD0;&#x884C;&#x5B8C;eject&#x4E4B;&#x540E;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x5982;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/remote/1460000014470669?w=358&amp;h=400" src="https://static.alili.tech/img/remote/1460000014470669?w=358&amp;h=400" alt="&#x9879;&#x76EE;&#x7ED3;&#x6784;.png" title="&#x9879;&#x76EE;&#x7ED3;&#x6784;.png" style="cursor:pointer"></span></p><p>&#x7B2C;&#x4E8C;&#x6B65;&#x6536;&#x5DE5;&#xFF0C;&#x7B2C;&#x4E09;&#x90E8;&#x5F00;&#x59CB;&#x914D;&#x7F6E;&#x5404;&#x79CD;&#x63D2;&#x4EF6;&#x3002;</p><h2 id="articleHeader5">3.&#x589E;&#x52A0;&#x914D;&#x7F6E;</h2><p>&#x5B89;&#x88C5;postCss&#x63D2;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code style="word-break:break-word;white-space:initial">npm i --save postcss-<span class="hljs-keyword">aspect</span>-ratio-mini postcss-px-<span class="hljs-keyword">to</span>-viewport postcss-<span class="hljs-keyword">write</span>-svg postcss-cssnext postcss-viewport-units cssnano</code></pre><p>&#x5728;<code>config/webpack.config.dev.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x4FEE;&#x6539;</p><p>1.&#x5F15;&#x5165;postCss&#x63D2;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const postcssAspectRatioMini = require(&apos;postcss-aspect-ratio-mini&apos;);
const postcssPxToViewport = require(&apos;postcss-px-to-viewport&apos;);
const postcssWriteSvg = require(&apos;postcss-write-svg&apos;);
const postcssCssnext = require(&apos;postcss-cssnext&apos;);
const postcssViewportUnits = require(&apos;postcss-viewport-units&apos;);
const cssnano = require(&apos;cssnano&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">const postcssAspectRatioMini</span> = require(<span class="hljs-string">&apos;postcss-aspect-ratio-mini&apos;</span>);
<span class="hljs-attribute">const postcssPxToViewport</span> = require(<span class="hljs-string">&apos;postcss-px-to-viewport&apos;</span>);
<span class="hljs-attribute">const postcssWriteSvg</span> = require(<span class="hljs-string">&apos;postcss-write-svg&apos;</span>);
<span class="hljs-attribute">const postcssCssnext</span> = require(<span class="hljs-string">&apos;postcss-cssnext&apos;</span>);
<span class="hljs-attribute">const postcssViewportUnits</span> = require(<span class="hljs-string">&apos;postcss-viewport-units&apos;</span>);
<span class="hljs-attribute">const cssnano</span> = require(<span class="hljs-string">&apos;cssnano&apos;</span>);</code></pre><p>2.&#x52A0;&#x5165;postCss&#x914D;&#x7F6E;</p><h4>&#x52A0;&#x5165;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#x4F4D;&#x7F6E;&#x5982;&#x4E0B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    use: [
      require.resolve(&apos;style-loader&apos;),
      {
        loader: require.resolve(&apos;css-loader&apos;),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve(&apos;postcss-loader&apos;),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: &apos;postcss&apos;,
          plugins: () =&gt; [
            require(&apos;postcss-flexbugs-fixes&apos;),
            autoprefixer({
              browsers: [
                &apos;&gt;1%&apos;,
                &apos;last 4 versions&apos;,
                &apos;Firefox ESR&apos;,
                &apos;not ie &lt; 9&apos;, // React doesn&apos;t support IE8 anyway
              ],
              flexbox: &apos;no-2009&apos;,
            }),
            //&#x52A0;&#x5165;&#x5730;&#x70B9;
            //&#x52A0;&#x5165;&#x5730;&#x70B9;
            //&#x52A0;&#x5165;&#x5730;&#x70B9;
          ],
        },
      },
    ],
},    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">use</span>: [
      <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;style-loader&apos;</span>),
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;css-loader&apos;</span>),
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span>,
        },
      },
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;postcss-loader&apos;</span>),
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// Necessary for external CSS imports to work</span>
          <span class="hljs-comment">// https://github.com/facebookincubator/create-react-app/issues/2677</span>
          ident: <span class="hljs-string">&apos;postcss&apos;</span>,
          <span class="hljs-attr">plugins</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> [
            <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;postcss-flexbugs-fixes&apos;</span>),
            autoprefixer({
              <span class="hljs-attr">browsers</span>: [
                <span class="hljs-string">&apos;&gt;1%&apos;</span>,
                <span class="hljs-string">&apos;last 4 versions&apos;</span>,
                <span class="hljs-string">&apos;Firefox ESR&apos;</span>,
                <span class="hljs-string">&apos;not ie &lt; 9&apos;</span>, <span class="hljs-comment">// React doesn&apos;t support IE8 anyway</span>
              ],
              <span class="hljs-attr">flexbox</span>: <span class="hljs-string">&apos;no-2009&apos;</span>,
            }),
            <span class="hljs-comment">//&#x52A0;&#x5165;&#x5730;&#x70B9;</span>
            <span class="hljs-comment">//&#x52A0;&#x5165;&#x5730;&#x70B9;</span>
            <span class="hljs-comment">//&#x52A0;&#x5165;&#x5730;&#x70B9;</span>
          ],
        },
      },
    ],
},    </code></pre><p>&#x9700;&#x8981;&#x52A0;&#x5165;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
postcssAspectRatioMini({}),
postcssPxToViewport({ 
  viewportWidth: 750, // (Number) The width of the viewport. 
  viewportHeight: 1334, // (Number) The height of the viewport. 
  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
  viewportUnit: &apos;vw&apos;, // (String) Expected units. 
  selectorBlackList: [&apos;.ignore&apos;, &apos;.hairlines&apos;], // (Array) The selectors to ignore and leave as px. 
  minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
  mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
}),
postcssWriteSvg({
  utf8: false
}),
postcssCssnext({}),
postcssViewportUnits({}),
cssnano({
  preset: &quot;advanced&quot;, 
  autoprefixer: false, 
  &quot;postcss-zindex&quot;: false 
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>
<span class="hljs-selector-tag">postcssAspectRatioMini</span>({}),
<span class="hljs-selector-tag">postcssPxToViewport</span>({ 
  <span class="hljs-attribute">viewportWidth</span>: <span class="hljs-number">750</span>, <span class="hljs-comment">// (Number) The width of the viewport. </span>
  <span class="hljs-attribute">viewportHeight</span>: <span class="hljs-number">1334</span>, <span class="hljs-comment">// (Number) The height of the viewport. </span>
  <span class="hljs-attribute">unitPrecision</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// (Number) The decimal numbers to allow the REM units to grow to. </span>
  <span class="hljs-attribute">viewportUnit</span>: <span class="hljs-string">&apos;vw&apos;</span>, <span class="hljs-comment">// (String) Expected units. </span>
  <span class="hljs-attribute">selectorBlackList</span>: [<span class="hljs-string">&apos;.ignore&apos;</span>, <span class="hljs-string">&apos;.hairlines&apos;</span>], <span class="hljs-comment">// (Array) The selectors to ignore and leave as px. </span>
  <span class="hljs-attribute">minPixelValue</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// (Number) Set the minimum pixel value to replace. </span>
  <span class="hljs-attribute">mediaQuery</span>: false <span class="hljs-comment">// (Boolean) Allow px to be converted in media queries. </span>
}),
<span class="hljs-selector-tag">postcssWriteSvg</span>({
  <span class="hljs-attribute">utf8</span>: false
}),
<span class="hljs-selector-tag">postcssCssnext</span>({}),
<span class="hljs-selector-tag">postcssViewportUnits</span>({}),
<span class="hljs-selector-tag">cssnano</span>({
  <span class="hljs-attribute">preset</span>: <span class="hljs-string">&quot;advanced&quot;</span>, 
  <span class="hljs-attribute">autoprefixer</span>: false, 
  <span class="hljs-string">&quot;postcss-zindex&quot;</span>: false 
})
</code></pre><p>&#x7B2C;&#x4E09;&#x6B65;&#x6536;&#x5DE5;&#x3002;</p><h2 id="articleHeader6">4.&#x6D4B;&#x8BD5;</h2><p>&#x4FEE;&#x6539;<code>App.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import &apos;./App.css&apos;;

class App extends Component {
  render() {
    return (
      &lt;div className=&quot;App&quot;&gt;
        hello vw-layout
      &lt;/div&gt;
    );
  }
}
export default App;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> &apos;./<span class="hljs-type">App</span>.css&apos;;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">&quot;App&quot;</span>&gt;
        hello vw-layout
      &lt;/div&gt;
    );
  }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;</code></pre><p>&#x4FEE;&#x6539;App.css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".App {
  width: 750px;
  height: 200px;
  background: #f27a7a;
  color: #ffffff;
  line-height: 200px;
  text-align: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.App</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">750px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f27a7a</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}</code></pre><p>&#x91CD;&#x65B0;<code>npm start</code>&#x9875;&#x9762;&#x663E;&#x793A;&#x5982;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/remote/1460000014470670?w=1240&amp;h=559" src="https://static.alili.tech/img/remote/1460000014470670?w=1240&amp;h=559" alt="&#x6D4B;&#x8BD5;demo.png" title="&#x6D4B;&#x8BD5;demo.png" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x975E;&#x5E38;OK&#xFF0C;&#x5269;&#x4E0B;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x914D;&#x7F6E;&#x751F;&#x4EA7;&#x73AF;&#x5883;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</p><h2 id="articleHeader7">5.&#x914D;&#x7F6E;&#x751F;&#x4EA7;&#x73AF;&#x5883;webpack.config.js</h2><p>&#x64CD;&#x4F5C;&#x4E0E;&#x914D;&#x7F6E;&#x6D4B;&#x8BD5;&#x73AF;&#x5883;&#x6587;&#x4EF6;&#x76F8;&#x540C;&#x5148;&#x5F15;&#x5165;&#x63D2;&#x4EF6;&#xFF0C;&#x5728;&#x76F8;&#x540C;&#x7684;&#x4F4D;&#x7F6E;&#x914D;&#x7F6E;postCss&#x63D2;&#x4EF6;<br>&#x914D;&#x7F6E;&#x5B8C;&#x6210;&#x540E;&#x6267;&#x884C;<code>npm run build</code><br>&#x6253;&#x5F00;<code>static/css/main.********.css</code><br><span class="img-wrap"><img data-src="/img/remote/1460000014470671?w=1120&amp;h=96" src="https://static.alili.tech/img/remote/1460000014470671?w=1120&amp;h=96" alt="&#x6253;&#x5305;&#x540E;&#x7684;css.png" title="&#x6253;&#x5305;&#x540E;&#x7684;css.png" style="cursor:pointer;display:inline"></span><br>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x7F16;&#x8BD1;&#xFF0C;&#x6253;&#x5B8C;&#x6536;&#x5DE5;</p><h2 id="articleHeader8">6.&#x52A0;&#x5165;viewport-units-buggyfill&#x914D;&#x7F6E;</h2><p><code>&#x8FD9;&#x4E00;&#x6B65;&#x4E0D;&#x8FC7;&#x5728;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7684;&#x6587;&#x7AE0;&#x4E2D;&#x6216;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x90FD;&#x5DF2;&#x7ECF;&#x914D;&#x7F6E;&#xFF0C;&#x7CFB;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x758F;&#x5FFD;&#x5FD8;&#x8BB0;&#x5199;&#x5728;&#x6587;&#x7AE0;&#x4E2D;&#x5BFC;&#x81F4;&#x5927;&#x5BB6;&#x4EE5;&#x4E3A;vw&#x517C;&#x5BB9;&#x8303;&#x56F4;&#x5C0F;&#x3002;&#x62B1;&#x6B49;&#xFF01;&#xFF01;&#xFF01;</code></p><p>&#x6253;&#x5F00;<code>public/index.html</code></p><p>&#x9996;&#x5148;&#x5728;<code>&lt;head&gt;&lt;/head&gt;</code>&#x4E2D;&#x5F15;&#x5165;&#x963F;&#x91CC;cdn</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">&lt;script src=<span class="hljs-string">&quot;//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x5728;<code>body</code>&#x4E2D;&#xFF0C;&#x52A0;&#x5165;&#x5982;&#x4E0B;<code>js</code>&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;script&gt;
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"> &lt;script&gt;
  <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.viewportUnitsBuggyfill.init({
      <span class="hljs-attr">hacks</span>: <span class="hljs-built_in">window</span>.viewportUnitsBuggyfillHacks
    });
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p>&#x6700;&#x7EC8;index.html&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;&gt;
    &lt;meta name=&quot;theme-color&quot; content=&quot;#000000&quot;&gt;
    &lt;!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    --&gt;
    &lt;link rel=&quot;manifest&quot; href=&quot;%PUBLIC_URL%/manifest.json&quot;&gt;
    &lt;link rel=&quot;shortcut icon&quot; href=&quot;%PUBLIC_URL%/favicon.ico&quot;&gt;
    &lt;!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike &quot;/favicon.ico&quot; or &quot;favicon.ico&quot;, &quot;%PUBLIC_URL%/favicon.ico&quot; will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    --&gt;
    &lt;title&gt;React App&lt;/title&gt;
    &lt;script src=&quot;//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;noscript&gt;
      You need to enable JavaScript to run this app.
    &lt;/noscript&gt;
    &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
    &lt;!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the &lt;body&gt; tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    --&gt;
    &lt;script&gt;
      window.onload = function () {
        window.viewportUnitsBuggyfill.init({
          hacks: window.viewportUnitsBuggyfillHacks
        });
      }
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;&gt;
    &lt;meta name=&quot;theme-color&quot; content=&quot;#000000&quot;&gt;
    &lt;!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    --&gt;
    &lt;link rel=&quot;manifest&quot; href=&quot;%PUBLIC_URL%/manifest.json&quot;&gt;
    &lt;link rel=&quot;shortcut icon&quot; href=&quot;%PUBLIC_URL%/favicon.ico&quot;&gt;
    &lt;!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike &quot;/favicon.ico&quot; or &quot;favicon.ico&quot;, &quot;%PUBLIC_URL%/favicon.ico&quot; will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    --&gt;
    &lt;title&gt;React App&lt;/title&gt;
    &lt;script src=&quot;//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;noscript&gt;
      You need to enable JavaScript to run this app.
    &lt;/noscript&gt;
    &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
    &lt;!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the &lt;body&gt; tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    --&gt;
    &lt;script&gt;
      window.onload = function () {
        window.viewportUnitsBuggyfill.init({
          hacks: window.viewportUnitsBuggyfillHacks
        });
      }
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><p>&#x91CD;&#x65B0;&#x6267;&#x884C;<code>npm start</code>&#x6253;&#x5F00;&#x9875;&#x9762;&#x53D1;&#x73B0;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014470672?w=2452&amp;h=478" src="https://static.alili.tech/img/remote/1460000014470672?w=2452&amp;h=478" alt="" title="" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x9047;&#x5230;<code>img</code>&#x65E0;&#x6CD5;&#x663E;&#x793A;&#xFF0C;&#x5219;&#x6DFB;&#x52A0;&#x5168;&#x5C40;css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img { 
    content: normal !important; 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">img</span> { 
    <span class="hljs-attribute">content</span>: normal <span class="hljs-meta">!important</span>; 
}</code></pre><h4>OK&#x914D;&#x7F6E;&#x6210;&#x529F;&#x3002;&#x8FD9;&#x6837;&#x5C31;&#x9002;&#x914D;&#x4E86;&#x4F4E;&#x7248;&#x672C;&#x5B89;&#x5353;&#x673A;&#x578B;</h4><h2 id="articleHeader9">7.&#x52A0;&#x5165;css-modules&#x914D;&#x7F6E;</h2><p>&#x4E00;&#x822C;&#x7684;&#x5C0F;&#x9879;&#x76EE;&#x4E0D;&#x4F7F;&#x7528;<code>css-modules</code>&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;hold&#x4F4F;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x9875;&#x9762;&#x591A;&#x8D77;&#x6765;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;<code>css-modules</code>&#xFF0C;&#x4E0B;&#x9762;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x7528;&#x6CD5;&#xFF1A;</p><p>&#x6267;&#x884C;<code>npm i --save react-css-modules</code></p><p>&#x5728;<code>App.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x63D2;&#x4EF6;<br><code>import CSSModules from &apos;react-css-modules&apos;;</code></p><p>&#x4FEE;&#x6539;css&#x6587;&#x4EF6;&#x7684;&#x5F15;&#x5165;&#x65B9;&#x5F0F;<br>&#x4ECE;<code>import &apos;./App.css&apos;;</code>&#x4FEE;&#x6539;&#x4E3A;<code>import styles from &apos;./App.css&apos;;</code></p><p>&#x4FEE;&#x6539;&#x5F15;&#x7528;Css&#x65B9;&#x5F0F;<br><code>className</code>=&gt;<code>styleName</code></p><p>&#x4FEE;&#x6539;&#x5BFC;&#x51FA;&#x65B9;&#x5F0F;<br><code>export default App</code>=&gt;<code>export default CSSModules(App, styles);</code></p><p>&#x4FDD;&#x5B58;&#xFF0C;&#x4ECE;&#x65B0;&#x6267;&#x884C;<code>npm start</code>&#x67E5;&#x770B;&#x9875;&#x9762;&#x53D1;&#x73B0;&#x5931;&#x8D25;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014470673?w=800&amp;h=345" src="https://static.alili.tech/img/remote/1460000014470673?w=800&amp;h=345" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x539F;&#x56E0;&#x662F;&#x672A;&#x6253;&#x5F00;<code>css import</code>&#x914D;&#x7F6E;&#xFF0C;&#x6B64;&#x65F6;<code>import styles from &apos;./App.css&apos;;</code>&#x8BE5;&#x8BED;&#x53E5;&#x5E76;&#x672A;&#x6210;&#x529F;&#x5F15;&#x5165;<code>css</code>&#x6587;&#x4EF6;&#x3002;</p><p>&#x6253;&#x5F00;<code>webpack.config.dev.js</code>&#x52A0;&#x5165;<code>modules: true</code><br>&#x627E;&#x5230;&#x5982;&#x4E0B;&#x4F4D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    use: [
      require.resolve(&apos;style-loader&apos;),
      {
        loader: require.resolve(&apos;css-loader&apos;),
        options: {
          //&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;
          modules: true,
          
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve(&apos;postcss-loader&apos;),
        options: {
           //.....&#x7701;&#x7565;
        }
      }
    ],
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">use</span>: [
      <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;style-loader&apos;</span>),
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;css-loader&apos;</span>),
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">//&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;</span>
          modules: <span class="hljs-literal">true</span>,
          
          <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span>,
        },
      },
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;postcss-loader&apos;</span>),
        <span class="hljs-attr">options</span>: {
           <span class="hljs-comment">//.....&#x7701;&#x7565;</span>
        }
      }
    ],
  },</code></pre><p>&#x4FDD;&#x5B58;&#xFF0C;&#x518D;&#x6B21;&#x6267;&#x884C;<code>npm start</code>&#x67E5;&#x770B;&#x9875;&#x9762;<br><span class="img-wrap"><img data-src="/img/remote/1460000014470674?w=800&amp;h=158" src="https://static.alili.tech/img/remote/1460000014470674?w=800&amp;h=158" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>&#x6210;&#x529F;&#xFF01;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;<code>class&#x540D;</code>&#x592A;&#x8FC7;&#x4E71;&#x7801;&#x4E0D;&#x9002;&#x4E8E;&#x8C03;&#x8BD5;&#xFF0C;&#x518D;&#x6B21;&#x6253;&#x5F00;<code>webpack.config.dev.js</code><br>&#x627E;&#x5230;&#x5982;&#x4E0B;&#x4F4D;&#x7F6E;&#x52A0;&#x5165;&#x8BED;&#x53E5;<code>localIdentName:&apos;[name]_[local]_[hash:base64:5]&apos;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    use: [
      require.resolve(&apos;style-loader&apos;),
      {
        loader: require.resolve(&apos;css-loader&apos;),
        options: {
          modules: true,
          importLoaders: 1,
          //&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;
          localIdentName: &apos;[name]_[local]_[hash:base64:5]&apos;
        },
      },
      {
        loader: require.resolve(&apos;postcss-loader&apos;),
        options: {
           //.....&#x7701;&#x7565;
        }
      }
    ],
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">use</span>: [
      <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;style-loader&apos;</span>),
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;css-loader&apos;</span>),
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span>,
          <span class="hljs-comment">//&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;&#x770B;&#x8FD9;&#x91CC;</span>
          localIdentName: <span class="hljs-string">&apos;[name]_[local]_[hash:base64:5]&apos;</span>
        },
      },
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;postcss-loader&apos;</span>),
        <span class="hljs-attr">options</span>: {
           <span class="hljs-comment">//.....&#x7701;&#x7565;</span>
        }
      }
    ],
  },</code></pre><p>&#x518D;&#x6B21;&#x6267;&#x884C;<code>npm start</code>&#x67E5;&#x770B;&#x9875;&#x9762;<br><span class="img-wrap"><img data-src="/img/remote/1460000014470675?w=800&amp;h=160" src="https://static.alili.tech/img/remote/1460000014470675?w=800&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>OJBK&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</h4><p>&#x6700;&#x540E;&#x76F8;&#x540C;&#x6B65;&#x9AA4;&#x52A0;&#x5165;&#x5230;<code>webpack.config.prod.js</code>&#x4E2D;<br>&#x6267;&#x884C;<code>npm run build</code> &#x67E5;&#x770B;&#x6253;&#x5305;&#x6587;&#x4EF6;<br><span class="img-wrap"><img data-src="/img/remote/1460000014470676" src="https://static.alili.tech/img/remote/1460000014470676" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader10">&#x5F73;&#x4E8D;&#x5427;&#xFF0C;OK&#x4E86;&#x3002;</h3><h2 id="articleHeader11">END.&#x5176;&#x4ED6;&#x60F3;&#x8BF4;&#x7684;&#x8BDD;</h2><blockquote>git&#x5730;&#x5740;&#x518D;&#x53D1;&#x4E00;&#x6B21;&#xFF0C;&#x5E0C;&#x671B;&#x6709;&#x7A7A;&#x80FD;&#x5E2E;&#x5FD9;&#x70B9;&#x4E2A;&#x8D5E;~&#x8C22;&#x8C22;~~&#xFF01;&#xFF01; <a href="https://github.com/gaohan1994/react-vw-layout" rel="nofollow noreferrer" target="_blank">https://github.com/gaohan1994...</a> &#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x6210;&#x529F;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E00;&#x4E0B;&#x3002;&#x5C24;&#x5176;&#x662F;css-modules&#x53EF;&#x80FD;&#x6539;&#x7684;&#x5730;&#x65B9;&#x6BD4;&#x8F83;&#x591A;&#x3002;<p>&#x5F53;&#x521D;&#x770B;&#x5230;&#x5927;&#x6F20;&#x5148;&#x751F;&#x7684;vw&#x9002;&#x914D;&#x65B9;&#x6848;&#x771F;&#x7684;&#x662F;&#x773C;&#x524D;&#x4E00;&#x4EAE;&#xFF0C;&#x5728;&#x5C1D;&#x8BD5;&#x4E86;&#x4E4B;&#x540E;&#x89C9;&#x5F97;&#x8FD9;&#x5957;&#x65B9;&#x6848;&#x7684;&#x751F;&#x4EA7;&#x529B;&#x975E;&#x5E38;&#x5F3A;&#x608D;&#xFF0C;&#x5176;&#x5B9E;&#x6309;&#x7167;&#x672C;&#x6587;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x76F8;&#x5F53;&#x4E00;&#x90E8;&#x5206;&#x9879;&#x76EE;&#xFF0C;<del>&#x9664;&#x4E86;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x6CA1;&#x6709;&#x4F7F;&#x7528;<code>css-modules</code>&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x81EA;&#x5DF1;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x914D;&#x7F6E;&#x4E86;<code>css-modules</code>&#x8981;&#x4FEE;&#x6539;&#x7684;&#x5730;&#x65B9;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x4EE5;&#x540E;&#x4F1A;&#x51FA;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6765;&#x518D;&#x7EE7;&#x7EED;&#x5206;&#x4EAB;&#xFF0C;</del>&#x540C;&#x65F6;&#x6211;&#x662F;&#x4E2A;Typescript&#x91CD;&#x5EA6;&#x60A3;&#x8005;&#xFF01;&#x6211;&#x6781;&#x5EA6;&#x4F5C;&#x6B7B;&#x7684;&#x6210;&#x529F;&#x914D;&#x7F6E;&#x4E86;<code>create-react-app typescript version</code>&#x7684;<code>vw + css-modules</code>&#x7248;&#x672C;&#xFF0C;&#x73B0;&#x5728;&#x56DE;&#x60F3;&#x8D77;&#x6765;&#x914D;&#x7F6E;&#x7684;&#x90A3;&#x51E0;&#x5929;&#x771F;&#x7684;&#x751F;&#x4E0D;&#x5982;&#x6B7B;&#x3002;&#x3002;&#x3002;&#x5404;&#x79CD;<br>&#x8E29;&#x5751;&#x3002; &#x7B49;&#x5982;&#x679C;&#x6709;&#x4EBA;&#x9700;&#x8981;ts + react + vw &#x89E3;&#x51B3;&#x65B9;&#x6848;&#x7684;&#x65F6;&#x5019;&#x6211;&#x518D;&#x5199;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5427;&#x3002;<br>&#x90A3;&#x5C31;&#x5230;&#x8FD9;&#x91CC;&#x4E86;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x4F7F;&#x7528;vw&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x73A9;&#x7684;&#x6109;&#x5FEB;&#xFF01;</p></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于react/vue的移动端终极适配方案（更新css-modules配置）

## 原文链接
[https://segmentfault.com/a/1190000014185590](https://segmentfault.com/a/1190000014185590)


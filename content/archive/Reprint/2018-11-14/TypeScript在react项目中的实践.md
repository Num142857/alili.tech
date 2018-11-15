---
title: TypeScript在react项目中的实践
hidden: true
categories: reprint
slug: c955a8e6
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p>&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#x6709;&#x5199;&#x8FC7;&#x4E00;&#x4E2A;<a href="https://segmentfault.com/a/1190000015719697">TypeScript&#x5728;node&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x5B9E;&#x8DF5;</a>&#x3002;<br>&#x5728;&#x91CC;&#x8FB9;&#x6709;&#x89E3;&#x91CA;&#x4E86;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;<code>TS</code>&#xFF0C;&#x4EE5;&#x53CA;&#x5728;<code>Node</code>&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x662F;&#x600E;&#x6837;&#x7684;&#x3002;<br>&#x4F46;&#x662F;&#x90A3;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x7EAF;&#x63A5;&#x53E3;&#x9879;&#x76EE;&#xFF0C;&#x78B0;&#x5DE7;&#x8D76;&#x4E0A;&#x8FD1;&#x671F;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x91CD;&#x6784;&#x4E5F;&#x7531;&#x6211;&#x6765;&#x4E3B;&#x6301;&#xFF0C;&#x7ECF;&#x8FC7;&#x4E0A;&#x6B21;&#x7684;&#x5B9E;&#x8DF5;&#x4EE5;&#x540E;&#xFF0C;&#x5C1D;&#x5230;&#x4E86;<code>TS</code>&#x6240;&#x5E26;&#x6765;&#x7684;&#x751C;&#x5934;&#xFF0C;&#x6BEB;&#x4E0D;&#x72B9;&#x8C6B;&#x7684;&#x9009;&#x62E9;&#x7528;<code>TS</code>+<code>React</code>&#x6765;&#x91CD;&#x6784;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x3002;<br>&#x8FD9;&#x6B21;&#x7684;&#x91CD;&#x6784;&#x4E0D;&#x4EC5;&#x5305;&#x62EC;<code>Node</code>&#x7684;&#x91CD;&#x6784;&#xFF08;&#x4E4B;&#x524D;&#x662F;<code>Express</code>&#x7684;&#x9879;&#x76EE;&#xFF09;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x5305;&#x62EC;&#x524D;&#x7AEF;&#x7684;&#x91CD;&#x6784;&#xFF08;&#x4E4B;&#x524D;&#x662F;&#x7531;<code>jQuery</code>&#x9A71;&#x52A8;&#x7684;&#x591A;&#x9875;&#x5E94;&#x7528;&#xFF09;&#x3002;</p><h2>&#x9879;&#x76EE;&#x7ED3;&#x6784;</h2><p>&#x56E0;&#x4E3A;&#x76EE;&#x524D;&#x9879;&#x76EE;&#x662F;&#x6CA1;&#x6709;&#x505A;&#x524D;&#x540E;&#x5206;&#x79BB;&#x7684;&#x6253;&#x7B97;&#x7684;&#xFF08;&#x4E00;&#x4E2A;&#x5185;&#x90E8;&#x5DE5;&#x5177;&#x5E73;&#x53F0;&#x7C7B;&#x7684;&#x9879;&#x76EE;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x5927;&#x81F4;&#x7ED3;&#x6784;&#x5C31;&#x662F;&#x57FA;&#x4E8E;&#x4E0A;&#x6B21;<code>Node</code>&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x5728;&#x5176;&#x4E4B;&#x4E0A;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;<code>FrontEnd</code>&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p><pre><code class="diff">  .
  &#x251C;&#x2500;&#x2500; README.md
  &#x251C;&#x2500;&#x2500; copy-static-assets.ts
  &#x251C;&#x2500;&#x2500; nodemon.json
  &#x251C;&#x2500;&#x2500; package.json
+ &#x251C;&#x2500;&#x2500; client-dist
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; bundle.js
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; bundle.js.map
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; logo.png
+ &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; vendors.dll.js
  &#x251C;&#x2500;&#x2500; dist
  &#x251C;&#x2500;&#x2500; src
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; controllers
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entity
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; models
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; middleware
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; public
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; app.ts
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; server.ts
  &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; types
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; common
  &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; utils
+ &#x251C;&#x2500;&#x2500; client-src
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; components
+ &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; Header.tsx
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; conf
+ &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; host.ts
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dist
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; utils
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.ejs
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.tsx
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; webpack
+ &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; package.json
+ &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; tsconfig.json
+ &#x251C;&#x2500;&#x2500; views
+ &#x2502;   &#x2514;&#x2500;&#x2500; index.ejs
  &#x251C;&#x2500;&#x2500; tsconfig.json
  &#x2514;&#x2500;&#x2500; tslint.json</code></pre><p>&#x5176;&#x4E2D;&#x6807;&#x7EFF;&#xFF08;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;<code>+</code>&#x53F7;&#x663E;&#x793A;&#xFF09;&#x7684;&#x6587;&#x4EF6;&#x4E3A;&#x672C;&#x6B21;&#x65B0;&#x589E;&#x7684;&#x3002;<br>&#x5176;&#x4E2D;<code>client-dist</code>&#x4E0E;<code>views</code>&#x90FD;&#x662F;&#x901A;&#x8FC7;<code>webpack</code>&#x751F;&#x6210;&#x7684;&#xFF0C;&#x5B9E;&#x9645;&#x7684;&#x6E90;&#x7801;&#x6587;&#x4EF6;&#x90FD;&#x5728;<code>client-src</code>&#x4E0B;&#x3002;_&#x5C31;&#x8FD9;&#x4E2A;&#x7ED3;&#x6784;&#x62C6;&#x5206;&#x524D;&#x540E;&#x5206;&#x79BB;&#x5176;&#x5B9E;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x6210;&#x672C;_<br>&#x5728;&#x4E0B;&#x8FB9;&#x5206;&#x4E86;&#x5927;&#x6982;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x5939;&#xFF1A;</p><table><thead><tr><th align="center">dir/file</th><th align="left">desc</th></tr></thead><tbody><tr><td align="center"><code>index.ejs</code></td><td align="left">&#x9879;&#x76EE;&#x7684;&#x5165;&#x53E3;<code>html</code>&#x6587;&#x4EF6;&#xFF0C;&#x91C7;&#x7528;<code>ejs</code>&#x4F5C;&#x4E3A;&#x6E32;&#x67D3;&#x5F15;&#x64CE;</td></tr><tr><td align="center"><code>index.tsx</code></td><td align="left">&#x9879;&#x76EE;&#x7684;&#x5165;&#x53E3;<code>js</code>&#x6587;&#x4EF6;&#xFF0C;&#x540E;&#x7F00;&#x4F7F;&#x7528;<code>tsx</code>&#xFF0C;&#x539F;&#x56E0;&#x6709;&#x4E8C;&#xFF1A;&lt;br/&gt;1. &#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;<code>ts</code>&#x8FDB;&#x884C;<code>React</code>&#x7A0B;&#x5E8F;&#x7684;&#x5F00;&#x53D1; &lt;br/&gt;2. <code>.tsx</code>&#x6587;&#x4EF6;&#x5728;vs code&#x4E0A;&#x7684;<code>icon</code>&#x6BD4;&#x8F83;&#x597D;&#x770B; :p</td></tr><tr><td align="center"><code>tsconfig.json</code></td><td align="left">&#x662F;&#x7528;&#x4E8E;<code>tsc</code>&#x7F16;&#x8BD1;&#x6267;&#x884C;&#x7684;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</td></tr><tr><td align="center"><code>components</code></td><td align="left">&#x7EC4;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x76EE;&#x5F55;</td></tr><tr><td align="center"><code>config</code></td><td align="left">&#x5404;&#x79CD;&#x914D;&#x7F6E;&#x9879;&#x5B58;&#x653E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x7C7B;&#x4F3C;&#x8BF7;&#x6C42;&#x63A5;&#x53E3;&#x7684;<code>host</code>&#x6216;&#x8005;&#x5404;&#x79CD;&#x72B6;&#x6001;&#x7684;<code>map</code>&#x6620;&#x5C04;&#x4E4B;&#x7C7B;&#x7684;&#xFF08;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x679A;&#x4E3E;&#x5BF9;&#x8C61;&#x4EEC;&#x90FD;&#x5728;&#x8FD9;&#x91CC;&#xFF09;</td></tr><tr><td align="center"><code>utils</code></td><td align="left">&#x4E00;&#x4E9B;&#x516C;&#x5171;&#x51FD;&#x6570;&#x5B58;&#x653E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5404;&#x79CD;&#x53EF;&#x590D;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x5E94;&#x8BE5;&#x653E;&#x5728;&#x8FD9;&#x91CC;</td></tr><tr><td align="center"><code>dist</code></td><td align="left">&#x5404;&#x79CD;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x5B58;&#x653E;&#x4F4D;&#x7F6E;&#xFF0C;&#x56FE;&#x7247;&#x4E4B;&#x7C7B;&#x6587;&#x4EF6;</td></tr><tr><td align="center"><code>webpack</code></td><td align="left">&#x91CC;&#x8FB9;&#x5B58;&#x653E;&#x4E86;&#x5404;&#x79CD;&#x73AF;&#x5883;&#x7684;<code>webpack</code>&#x811A;&#x672C;&#x547D;&#x4EE4;&#x4EE5;&#x53CA;<code>dll</code>&#x7684;&#x751F;&#x6210;</td></tr></tbody></table><h2>&#x524D;&#x540E;&#x7AEF;&#x590D;&#x7528;&#x4EE3;&#x7801;&#x7684;&#x4E00;&#x4E2A;&#x5C1D;&#x8BD5;</h2><p>&#x5B9E;&#x9645;&#x4E0A;&#x8FB9;&#x8FD8;&#x6F0F;&#x6389;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x589E;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x6211;&#x4EEC;&#x5728;<code>src</code>&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;<code>common</code>&#x76EE;&#x5F55;&#xFF0C;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x662F;&#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x516C;&#x5171;&#x7684;&#x51FD;&#x6570;&#x548C;&#x516C;&#x5171;&#x7684;<code>config</code>&#xFF0C;&#x4E0D;&#x540C;&#x4E8E;<code>utils</code>&#x6216;&#x8005;<code>config</code>&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x524D;&#x540E;&#x7AEF;&#x5171;&#x4EAB;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8FB9;&#x7684;&#x51FD;&#x6570;&#x4E00;&#x5B9A;&#x8981;&#x662F;&#x5B8C;&#x5168;&#x7684;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x73AF;&#x5883;&#x4F9D;&#x8D56;&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x3002;</p><p>&#x7C7B;&#x4F3C;&#x7684;&#x6570;&#x5B57;&#x5343;&#x5206;&#x4F4D;&#xFF0C;&#x65E5;&#x671F;&#x683C;&#x5F0F;&#x5316;&#xFF0C;&#x6291;&#x6216;&#x662F;&#x670D;&#x52A1;&#x76D1;&#x542C;&#x7684;&#x7AEF;&#x53E3;&#x53F7;&#xFF0C;&#x8FD9;&#x4E9B;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x903B;&#x8F91;&#xFF0C;&#x4E5F;&#x5BF9;&#x73AF;&#x5883;&#x6CA1;&#x6709;&#x5F3A;&#x4F9D;&#x8D56;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x53EF;&#x4EE5;&#x653E;&#x5728;&#x8FD9;&#x91CC;&#x3002;<br>&#x8FD9;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x505A;&#x524D;&#x540E;&#x5206;&#x79BB;&#x5E26;&#x6765;&#x7684;&#x4E00;&#x4E2A;&#x5C0F;&#x751C;&#x5934;&#x5427;&#xFF0C;&#x524D;&#x540E;&#x53EF;&#x4EE5;&#x5171;&#x4EAB;&#x4E00;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x57FA;&#x4E8E;&#x4E0A;&#x8FF0;&#x9879;&#x76EE;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#x51E0;&#x5904;&#xFF1A;</p><ul><li><strong>1</strong> <code>src</code>&#x4E0B;&#x7684;<code>utils</code>&#x548C;<code>config</code>&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x8FC1;&#x79FB;&#x5230;<code>common</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x4E8E;&#x533A;&#x5206;&#x662F;&#x5426;&#x53EF;&#x524D;&#x540E;&#x901A;&#x7528;</li><li><strong>2</strong> &#x4E3A;&#x4E86;&#x5C06;&#x5BF9;&#x4E4B;&#x524D;<code>node</code>&#x7ED3;&#x6784;&#x65B9;&#x9762;&#x7684;&#x5F71;&#x54CD;&#x964D;&#x81F3;&#x6700;&#x4F4E;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;<code>common</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x589E;&#x4E00;&#x4E2A;<code>index.ts</code>&#x7D22;&#x5F15;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;<code>utils/index.ts</code>&#x4E0B;&#x5F15;&#x7528;&#x5B83;&#xFF0C;&#x8FD9;&#x6837;&#x5BF9;&#x4E8E;<code>node</code>&#x65B9;&#x9762;&#x4F7F;&#x7528;&#x6765;&#x8BB2;&#xFF0C;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x6765;&#x81EA;<code>utils</code>&#x8FD8;&#x662F;<code>common</code></li></ul><pre><code class="javascript">// src/common/utils/comma.ts
export default (num: number): string =&gt; String(num).replace(/\B(?=(\d{3})+$)/g, &apos;,&apos;)

// src/common/utils/index.ts
export { default as comma } from &apos;./comma&apos;

// src/utils.index.ts
export * from &apos;../common/utils&apos;

// src/app.ts
import { comma } from &apos;./utils&apos; // &#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x662F;&#x6765;&#x81EA;common&#x8FD8;&#x662F;&#x6765;&#x81EA;utils

console.log(comma(1234567)) // 1,234,567</code></pre><ul><li><strong>3</strong> &#x7136;&#x540E;&#x662F;&#x914D;&#x7F6E;<code>webpack</code>&#x7684;<code>alias</code>&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;<code>webpack</code>&#x80FD;&#x591F;&#x6B63;&#x786E;&#x7684;&#x627E;&#x5230;&#x5176;&#x8DEF;&#x5F84;</li></ul><pre><code class="javascript">// client-src/webpack/base.js
module.exports = {
  resolve: {
    alias: {
       &apos;@Common&apos;: path.resolve(__dirname, &apos;../../src/common&apos;),
    }
  }
}</code></pre><ul><li><strong>4</strong> &#x540C;&#x65F6;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x914D;&#x7F6E;<code>tsconfig.json</code>&#x7528;&#x4E8E;<code>vs code</code>&#x53EF;&#x4EE5;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x5728;&#x7F16;&#x8F91;&#x5668;&#x4E2D;&#x63D0;&#x793A;<code>can&apos;t find module XXX</code></li></ul><pre><code class="javascript">// client-src/tsconfig.json
{
  &quot;compilerOptions&quot;: {
    &quot;paths&quot;: {
      // &#x7528;&#x4E8E;&#x5F15;&#x5165;&#x67D0;&#x4E2A;`module`
      &quot;@Common/*&quot;: [
        &quot;../src/common/*&quot;
      ]
    }
  }
}</code></pre><ul><li><strong>5</strong> &#x6700;&#x540E;&#x5728;<code>client-src/utils/index.ts</code>&#x5199;&#x4E0A;&#x7C7B;&#x4F3C;<code>server</code>&#x7AEF;&#x7684;&#x5904;&#x7406;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</li></ul><pre><code class="javascript">// client-src/utils/index.ts
export * from &apos;@Common/utils&apos;

// client-src/index.tsx
import { comma } from &apos;./utils&apos;

console.log(comma(1234567)) // 1,234,567</code></pre><h2>&#x73AF;&#x5883;&#x7684;&#x642D;&#x5EFA;</h2><p><em>&#x5982;&#x679C;&#x4F7F;&#x7528;<code>vs code</code>&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#xFF0C;&#x800C;&#x4E14;&#x4F7F;&#x7528;&#x4E86;<code>ESLint</code>&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;<code>TS</code>&#x8BED;&#x6CD5;&#x652F;&#x6301;&#x7684;&#x540E;&#x7F00;&#xFF0C;&#x6DFB;&#x52A0;<code>typescriptreact</code>&#x7684;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x6837;&#x624D;&#x4F1A;&#x81EA;&#x52A8;&#x4FEE;&#x590D;&#x4E00;&#x4E9B;<code>ESLint</code>&#x7684;&#x89C4;&#x5219;&#xFF1A;</em></p><pre><code class="javascript">&quot;eslint.validate&quot;: [
  &quot;javascript&quot;,
  &quot;javascriptreact&quot;,
  {
    &quot;language&quot;: &quot;typescript&quot;,
    &quot;autoFix&quot;: true
  },
  {
    &quot;language&quot;: &quot;typescriptreact&quot;,
    &quot;autoFix&quot;: true
  }
]</code></pre><h3>webpack&#x7684;&#x914D;&#x7F6E;</h3><p>&#x56E0;&#x4E3A;&#x5728;&#x524D;&#x7AEF;&#x4F7F;&#x7528;&#x4E86;<code>React</code>&#xFF0C;&#x6309;&#x7167;&#x76EE;&#x524D;&#x7684;&#x4E3B;&#x6D41;&#xFF0C;<code>webpack</code>&#x80AF;&#x5B9A;&#x662F;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x3002;<br>&#x5E76;&#x6CA1;&#x6709;&#x9009;&#x62E9;&#x6210;&#x719F;&#x7684;<code>cra</code>(<a href="https://www.npmjs.com/package/create-react-app" rel="nofollow noreferrer">create-react-app</a>)&#x6765;&#x8FDB;&#x884C;&#x73AF;&#x5883;&#x642D;&#x5EFA;&#xFF0C;&#x539F;&#x56E0;&#x6709;&#x4E0B;&#xFF1A;</p><ol><li><code>webpack</code>&#x66F4;&#x65B0;&#x5230;4&#x4EE5;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x5C1D;&#x8BD5;&#x8FC7;&#xFF0C;&#x60F3;&#x81EA;&#x5DF1;&#x800D;&#x4E00;&#x800D;</li><li>&#x7ED3;&#x5408;&#x7740;<code>TS</code>&#x4EE5;&#x53CA;&#x516C;&#x53F8;&#x5185;&#x90E8;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#x60C5;&#x51B5;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x62C5;&#x5FC3;&#x4E8C;&#x6B21;&#x5F00;&#x53D1;&#x592A;&#x7E41;&#x7410;</li></ol><p>&#x4F46;&#x662F;&#x5176;&#x5B9E;&#x4E5F;&#x6CA1;&#x6709;&#x592A;&#x591A;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x672C;&#x6B21;&#x91CD;&#x6784;&#x9009;&#x7528;&#x7684;UI&#x6846;&#x67B6;&#x4E3A;Google Material&#x7684;&#x5B9E;&#x73B0;&#xFF1A;<a href="https://material-ui.com/" rel="nofollow noreferrer">material-ui</a><br>&#x800C;&#x4ED6;&#x4EEC;&#x91C7;&#x7528;&#x7684;&#x662F;<a href="http://cssinjs.org/" rel="nofollow noreferrer">jss</a> &#x6765;&#x8FDB;&#x884C;&#x6837;&#x5F0F;&#x7684;&#x7F16;&#x5199;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x4E0D;&#x4F1A;&#x6D89;&#x53CA;&#x5230;&#x4E4B;&#x524D;&#x60EF;&#x7528;&#x7684;<code>scss</code>&#x7684;&#x90A3;&#x4E00;&#x5957;<code>loader</code>&#x4E86;&#x3002;</p><p><code>webpack</code>&#x5206;&#x4E86;&#x5927;&#x6982;&#x5982;&#x4E0B;&#x51E0;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p><table><thead><tr><th align="center">file</th><th align="left">desc</th></tr></thead><tbody><tr><td align="center"><code>common.js</code></td><td align="left">&#x516C;&#x5171;&#x7684;<code>webpack</code>&#x914D;&#x7F6E;&#xFF0C;&#x7C7B;&#x4F3C;<code>env</code>&#x4E4B;&#x7C7B;&#x7684;&#x9009;&#x9879;</td></tr><tr><td align="center"><code>dll.js</code></td><td align="left">&#x7528;&#x4E8E;&#x5C06;&#x4E00;&#x4E9B;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x8FDB;&#x884C;&#x63D0;&#x524D;&#x6253;&#x5305;&#xFF0C;&#x52A0;&#x5FEB;&#x5F00;&#x53D1;&#x65F6;&#x7F16;&#x8BD1;&#x6548;&#x7387;</td></tr><tr><td align="center"><code>base.js</code></td><td align="left">&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;<code>webpack</code>&#x7684;&#x57FA;&#x7840;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x901A;&#x7528;&#x7684;<code>loader</code>&#x4EE5;&#x53CA;<code>plugins</code>&#x5728;&#x8FD9;&#x91CC;</td></tr><tr><td align="center"><code>pro.js</code></td><td align="left">&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;&#x7279;&#x6B8A;&#x914D;&#x7F6E;&#xFF08;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x3001;&#x8D44;&#x6E90;&#x4E0A;&#x4F20;&#xFF09;</td></tr><tr><td align="center"><code>dev.js</code></td><td align="left">&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x7279;&#x6B8A;&#x914D;&#x7F6E;&#xFF08;<code>source-map</code>&#xFF09;</td></tr></tbody></table><p><code>dll</code>&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x65E9;&#x4E4B;&#x524D;&#x7684;&#x5957;&#x8DEF;&#x4E86;&#xFF0C;&#x5927;&#x6982;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x8FD9;&#x4E48;&#x51E0;&#x5904;&#xFF1A;</p><ol><li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;<code>webpack</code>&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E8E;&#x751F;&#x6210;<code>dll</code>&#x6587;&#x4EF6;</li><li>&#x5728;&#x666E;&#x901A;&#x7684;<code>webpack</code>&#x6587;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x5F15;&#x7528;&#x751F;&#x6210;&#x7684;<code>dll</code>&#x6587;&#x4EF6;</li></ol><pre><code class="javascript">// dll.js
{
  entry: {
    // &#x9700;&#x8981;&#x63D0;&#x524D;&#x6253;&#x5305;&#x7684;&#x5E93;
    vendors: [
      &apos;react&apos;,
      &apos;react-dom&apos;,
      &apos;react-router-dom&apos;,
      &apos;babel-polyfill&apos;,
    ],
  },
  output: {
    filename: &apos;vendors.dll.js&apos;,
    path: path.resolve(__dirname, &apos;../../client-dist&apos;),
    // &#x8F93;&#x51FA;&#x65F6;&#x4E0D;&#x8981;&#x5C11;&#x4E86;&#x8FD9;&#x4E2A;option
    library: &apos;vendors_lib&apos;,
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      // &#x5411;&#x5916;&#x629B;&#x51FA;&#x7684;`vendors.dll.js`&#x4EE3;&#x7801;&#x7684;&#x5177;&#x4F53;&#x6620;&#x5C04;&#xFF0C;&#x5F15;&#x7528;`dll`&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x505A;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#x7684;
      path: path.join(__dirname, &apos;../dist/vendors-manifest.json&apos;),
      name: &apos;vendors_lib&apos;,
    })
  ]
}

// base.js
{
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(&apos;../dist/vendors-manifest.json&apos;),
    }),
  ]
}</code></pre><p>&#x8FD9;&#x6837;&#x5728;<code>watch</code>&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x6253;&#x5305;&#x5C31;&#x4F1A;&#x8DF3;&#x8FC7;<code>verdors</code>&#x4E2D;&#x5B58;&#x5728;&#x7684;&#x90A3;&#x4E9B;&#x5305;&#x4E86;&#x3002;<br><strong>&#x6709;&#x4E00;&#x70B9;&#x8981;&#x6CE8;&#x610F;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6700;&#x7EC8;&#x9700;&#x8981;&#x4E0A;&#x4F20;&#x8FD9;&#x4E9B;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x8BB0;&#x5F97;&#x8FDE;&#x5E26;&#x7740;<code>verdors.dll.js</code>&#x4E00;&#x5E76;&#x4E0A;&#x4F20;</strong></p><p>&#x5728;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;<code>vendors</code>&#x6587;&#x4EF6;&#x5E76;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x6CE8;&#x5165;&#x5230;<code>html</code>&#x6A21;&#x7248;&#x4E2D;&#x53BB;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x6709;&#x7528;&#x5230;&#x4E86;&#x53E6;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;<a href="https://www.npmjs.com/package/add-asset-html-webpack-plugin" rel="nofollow noreferrer">add-asset-html-webpack-plugin</a>&#x3002;<br>&#x540C;&#x65F6;&#x5728;&#x4F7F;&#x7528;&#x4E2D;&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x9047;&#x5230;<code>webpack</code>&#x65E0;&#x9650;&#x6B21;&#x6570;&#x7684;&#x91CD;&#x65B0;&#x6253;&#x5305;&#xFF0C;&#x8FD9;&#x4E2A;&#x9700;&#x8981;&#x914D;&#x7F6E;<code>ignore</code>&#x6765;&#x89E3;&#x51B3;-.-&#xFF1A;</p><pre><code class="javascript">// dev.js
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
const AddAssetHtmlPlugin = require(&apos;add-asset-html-webpack-plugin&apos;)

{
  plugins: [
    // &#x5C06;`ejs`&#x6A21;&#x7248;&#x6587;&#x4EF6;&#x653E;&#x5230;&#x76EE;&#x6807;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5E76;&#x6CE8;&#x5165;&#x5165;&#x53E3;`js`&#x6587;&#x4EF6;
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, &apos;../index.ejs&apos;),
      filename: path.resolve(__dirname, &apos;../../views/index.ejs&apos;),
    }),
    // &#x5C06;`vendors`&#x6587;&#x4EF6;&#x6CE8;&#x5165;&#x5230;`ejs`&#x6A21;&#x7248;&#x4E2D;
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, &apos;../../client-dist/vendors.dll.js&apos;),
      includeSourcemap: false,
    }),
    // &#x5FFD;&#x7565;`ejs`&#x548C;`js`&#x7684;&#x6587;&#x4EF6;&#x53D8;&#x5316;&#xFF0C;&#x907F;&#x514D;`webpack`&#x65E0;&#x9650;&#x91CD;&#x65B0;&#x6253;&#x5305;&#x7684;&#x95EE;&#x9898;
    new webpack.WatchIgnorePlugin([
      /\.ejs$/,
      /\.js$/,
    ]),
  ]
}</code></pre><h3>TypeScript&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;</h3><p><code>TS</code>&#x7684;&#x914D;&#x7F6E;&#x5206;&#x4E86;&#x4E24;&#x5757;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;<code>webpack</code>&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;<code>tsconfig</code>&#x7684;&#x914D;&#x7F6E;&#x3002;</p><p>&#x9996;&#x5148;&#x662F;<code>webpack</code>&#xFF0C;&#x9488;&#x5BF9;<code>ts</code>&#x3001;<code>tsx</code>&#x6587;&#x4EF6;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&#x4E24;&#x4E2A;<code>loader</code>&#xFF1A;</p><pre><code class="javascript">{
  rules: [
    {
      test: /\.tsx?$/,
      use: [&apos;babel-loader&apos;, &apos;ts-loader&apos;],
      exclude: /node_modules/,
    }
  ],
  resolve: {
    // &#x4E00;&#x5B9A;&#x4E0D;&#x8981;&#x5FD8;&#x8BB0;&#x914D;&#x7F6E;ts tsx&#x540E;&#x7F00;
    extensions: [&apos;.tsx&apos;, &apos;.ts&apos;, &apos;.js&apos;],
  }
}</code></pre><p><code>ts-loader</code>&#x7528;&#x4E8E;&#x5C06;<code>TS</code>&#x7684;&#x4E00;&#x4E9B;&#x7279;&#x6027;&#x8F6C;&#x6362;&#x4E3A;<code>JS</code>&#x517C;&#x5BB9;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;<code>babel</code>&#x8FDB;&#x884C;&#x5904;&#x7406;<code>react/jsx</code>&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6700;&#x7EC8;&#x751F;&#x6210;&#x53EF;&#x6267;&#x884C;&#x7684;<code>JS</code>&#x4EE3;&#x7801;&#x3002;</p><p>&#x7136;&#x540E;&#x662F;<code>tsconfig</code>&#x7684;&#x914D;&#x7F6E;&#xFF0C;<code>ts-loader</code>&#x7684;&#x6267;&#x884C;&#x662F;&#x4F9D;&#x6258;&#x4E8E;&#x8FD9;&#x91CC;&#x7684;&#x914D;&#x7F6E;&#x7684;&#xFF0C;&#x5927;&#x81F4;&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="javascript">{
  &quot;compilerOptions&quot;: {
    &quot;module&quot;: &quot;esnext&quot;,
    &quot;target&quot;: &quot;es6&quot;,
    &quot;allowSyntheticDefaultImports&quot;: true,
    // import&#x7684;&#x76F8;&#x5BF9;&#x8D77;&#x59CB;&#x8DEF;&#x5F84;
    &quot;baseUrl&quot;: &quot;.&quot;,
    &quot;sourceMap&quot;: true,
    // &#x6784;&#x5EFA;&#x8F93;&#x51FA;&#x76EE;&#x5F55;&#xFF0C;&#x4F46;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x4E86;`webpack`&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5375;&#x7528;
    &quot;outDir&quot;: &quot;../client-dist&quot;,
    // &#x5F00;&#x542F;`JSX`&#x6A21;&#x5F0F;, 
    // `preserve`&#x7684;&#x914D;&#x7F6E;&#x8BA9;`tsc`&#x4E0D;&#x4F1A;&#x53BB;&#x5904;&#x7406;&#x5B83;&#xFF0C;&#x800C;&#x662F;&#x4F7F;&#x7528;&#x540E;&#x7EED;&#x7684;`babel-loader`&#x8FDB;&#x884C;&#x5904;&#x7406;
    &quot;jsx&quot;: &quot;preserve&quot;, 
    &quot;strict&quot;: true,
    &quot;moduleResolution&quot;: &quot;node&quot;,
    // &#x5F00;&#x542F;&#x88C5;&#x9970;&#x5668;&#x7684;&#x4F7F;&#x7528;
    &quot;experimentalDecorators&quot;: true,
    &quot;emitDecoratorMetadata&quot;: true,
    // `vs code`&#x6240;&#x9700;&#x8981;&#x7684;&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x771F;&#x5B9E;&#x7684;&#x5F15;&#x7528;&#x662F;&#x5728;`webpack`&#x4E2D;&#x914D;&#x7F6E;&#x7684;`alias`
    &quot;paths&quot;: {
      &quot;@Common&quot;: [
        &quot;../src/common&quot;
      ],
      &quot;@Common/*&quot;: [
        &quot;../src/common/*&quot;
      ]
    }
  },
  &quot;exclude&quot;: [
    &quot;node_modules&quot;
  ]
}</code></pre><h3>ESLint&#x7684;&#x914D;&#x7F6E;</h3><p>&#x6700;&#x8FD1;&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#xFF0C;&#x6211;&#x4EEC;&#x56E2;&#x961F;&#x57FA;&#x4E8E;<code>airbnb</code>&#x7684;<code>ESLint</code>&#x89C4;&#x5219;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x81EA;&#x5BB6;&#x7684;<a href="https://www.npmjs.com/package/eslint-config-blued" rel="nofollow noreferrer">eslint-config-blued</a><br>&#x540C;&#x65F6;&#x8FD8;&#x5B58;&#x5728;&#x4E86;<a href="https://www.npmjs.com/package/eslint-config-blued-react" rel="nofollow noreferrer">react</a>&#x548C;<a href="https://www.npmjs.com/package/eslint-config-blued-typescript" rel="nofollow noreferrer">typescript</a>&#x7684;&#x4E24;&#x4E2A;&#x884D;&#x751F;&#x7248;&#x672C;&#x3002;</p><p>&#x5173;&#x4E8E;<code>ESLint</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;<code>.eslintrc</code>&#xFF0C;&#x5728;&#x672C;&#x9879;&#x76EE;&#x4E2D;&#x5B58;&#x5728;&#x4E24;&#x4EFD;&#x3002;&#x4E00;&#x4E2A;&#x662F;&#x6839;&#x76EE;&#x5F55;&#x7684;<code>blued-typescript</code>&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;<code>client-src</code>&#x4E0B;&#x7684;<code>blued-react</code> + <code>blued-typescript</code>&#x3002;<br>&#x56E0;&#x4E3A;&#x6839;&#x76EE;&#x5F55;&#x7684;&#x66F4;&#x591A;&#x7528;&#x4E8E;<code>node</code>&#x9879;&#x76EE;&#xFF0C;&#x6240;&#x4EE5;&#x6CA1;&#x5FC5;&#x8981;&#x628A;<code>react</code>&#x4EC0;&#x4E48;&#x7684;&#x4F9D;&#x8D56;&#x4E5F;&#x88C5;&#x8FDB;&#x6765;&#x3002;</p><pre><code class="yaml"># .eslintrc
extends: blued-typescript

# client-src/.eslintrc
extends: 
  - blued-react
  - blued-typescript</code></pre><p><strong>&#x4E00;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5C0F;&#x7EC6;&#x8282;</strong><br>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7684;<code>react</code>&#x4E0E;<code>typescript</code>&#x5B9E;&#x73B0;&#x7248;&#x672C;&#x4E2D;&#x90FD;&#x7528;&#x5230;&#x4E86;<code>parser</code>&#x3002;<br><code>react</code>&#x4F7F;&#x7528;&#x7684;&#x662F;<a href="https://www.npmjs.com/package/babel-eslint" rel="nofollow noreferrer">babel-eslint</a>&#xFF0C;<code>typescript</code>&#x4F7F;&#x7528;&#x7684;&#x662F;<a href="https://www.npmjs.com/package/typescript-eslint-parser" rel="nofollow noreferrer">typescript-eslint-parser</a>&#x3002;<br>&#x4F46;&#x662F;<code>parser</code>&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#xFF0C;&#x4ECE;<code>option</code>&#x7684;&#x547D;&#x540D;&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x51FA;<code>extends</code>&#x3001;<code>plugins</code>&#x3001;<code>rules</code>&#xFF0C;&#x5230;&#x4E86;<code>parser</code>&#x5C31;&#x6CA1;&#x6709;&#x590D;&#x6570;&#x4E86;&#x3002;<br>&#x6240;&#x4EE5;&#x8FD9;&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x5728;<code>extends</code>&#x4E2D;&#x7684;&#x987A;&#x5E8F;&#x5C31;&#x53D8;&#x5F97;&#x5F88;&#x5173;&#x952E;&#xFF0C;<code>babel</code>&#x73B0;&#x5728;&#x5E76;&#x4E0D;&#x80FD;&#x7406;&#x89E3;<code>TS</code>&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x4F46;&#x597D;&#x50CF;<code>babel</code>&#x5F00;&#x53D1;&#x8005;&#x6709;&#x652F;&#x6301;<code>TS</code>&#x7684;<a href="https://github.com/babel/babel-eslint/issues/505" rel="nofollow noreferrer">&#x610F;&#x613F;</a>&#x3002;<br>&#x4F46;&#x5C31;&#x76EE;&#x524D;&#x6765;&#x8BF4;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x4FDD;&#x8BC1;<code>react</code>&#x5728;&#x524D;&#xFF0C;<code>typescript</code>&#x5728;&#x540E;&#xFF0C;&#x8FD9;&#x6837;<code>parser</code>&#x624D;&#x4F1A;&#x4F7F;&#x7528;<code>typescript-eslint-parser</code>&#x6765;&#x8FDB;&#x884C;&#x8986;&#x76D6;&#x3002;</p><h3>node&#x5C42;&#x7684;&#x4FEE;&#x6539;</h3><p>&#x9664;&#x4E86;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#x4E24;&#x7AEF;&#x516C;&#x7528;&#x4EE3;&#x7801;&#x4EE5;&#x5916;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>controller</code>&#x7528;&#x4E8E;&#x5410;&#x9875;&#x9762;&#xFF0C;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x7684;&#x662F;<code>routing-controllers</code>&#x8FD9;&#x4E2A;&#x5E93;&#xFF0C;&#x6E32;&#x67D3;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x9875;&#x9762;&#x88AB;&#x5C01;&#x88C5;&#x7684;&#x975E;&#x5E38;&#x68D2;&#xFF0C;&#x4EC5;&#x4EC5;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E24;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;<code>render</code>&#x6A21;&#x7248;&#x7684;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x8981;&#x5410;&#x51FA;&#x6765;&#x7684;&#x6A21;&#x7248;&#x540D;&#x79F0;&#xFF1A;</p><pre><code class="javascript">// controller/index.ts
import {
  Get,
  Controller,
  Render,
} from &apos;routing-controllers&apos;

@Controller(&apos;/&apos;)
export default class {
  @Get(&apos;/&apos;)
  @Render(&apos;index&apos;) // &#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x6A21;&#x7248;&#x7684;&#x540D;&#x5B57;
  async router() {
    // &#x6E32;&#x67D3;&#x9875;&#x9762;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;
    // &#x7C7B;&#x4F3C;&#x4E4B;&#x524D;&#x7684; ctx.state = XXX
    return {
      title: &apos;First TypeScript React App&apos;,
    }
  }
}

// app.ts
import koaViews from &apos;koa-views&apos;

// &#x6DFB;&#x52A0;&#x6A21;&#x7248;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
// &#x4EE5;&#x53CA;&#x4F7F;&#x7528;&#x7684;&#x6E32;&#x67D3;&#x5F15;&#x64CE;&#x3001;&#x6587;&#x4EF6;&#x540E;&#x7F00;
app.use(koaViews(path.join(__dirname, &apos;../views&apos;), {
  options: {
    ext: &apos;ejs&apos;,
  },
  extension: &apos;ejs&apos;,
}))</code></pre><p><em>&#x5982;&#x679C;&#x662F;&#x591A;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x90A3;&#x5C31;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x7528;&#x6765;<code>Render</code>&#x7684;<code>ts</code>&#x6587;&#x4EF6;&#x5C31;&#x597D;&#x4E86;</em></p><h4>&#x6DF1;&#x5751;&#xFF0C;&#x6CE8;&#x610F;</h4><p>&#x76EE;&#x524D;&#x7684;<code>routing-controller</code>&#x5BF9;&#x4E8E;<code>Koa</code>&#x7684;&#x652F;&#x6301;&#x8FD8;&#x4E0D;&#x662F;&#x5F88;&#x597D;&#xFF0C;&#xFF08;&#x539F;&#x4F5C;&#x8005;&#x5BF9;<code>Koa</code>&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x4E86;&#x89E3;&#xFF0C;&#x5BFC;&#x81F4;<code>Render</code>&#x5BF9;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x88AB;&#x8BF7;&#x6C42;&#x4E00;&#x6B21;&#x4EE5;&#x540E;&#xFF0C;&#x540E;&#x7EED;&#x6240;&#x6709;&#x7684;&#x5176;&#x4ED6;&#x7684;&#x63A5;&#x53E3;&#x90FD;&#x4F1A;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8BE5;&#x6A21;&#x7248;&#x6587;&#x4EF6;&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x5728;&#x8D1F;&#x8D23;&#x6A21;&#x7248;&#x6E32;&#x67D3;&#x7684;<code>URL</code>&#x89E6;&#x53D1;&#x65F6;&#xFF0C;&#x672C;&#x5E94;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;&#x76EE;&#x524D;&#x7684;&#x5904;&#x7406;&#x5374;&#x662F;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x5230;<code>Koa</code>&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x4EFB;&#x4F55;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x5C06;&#x8BE5;&#x6A21;&#x7248;&#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x6570;&#x636E;&#x6765;&#x8FD4;&#x56DE;&#xFF09;&#x6240;&#x4EE5;<code>@Render</code>&#x5E76;&#x4E0D;&#x80FD;&#x9002;&#x7528;&#x4E8E;<code>Koa</code>&#x9A71;&#x52A8;&#x3002;<br>&#x4E0D;&#x8FC7;&#x6211;&#x5DF2;&#x7ECF;&#x63D0;&#x4EA4;&#x4E86;<a href="https://github.com/typestack/routing-controllers/pull/434" rel="nofollow noreferrer">PR</a>&#x4E86;&#xFF0C;&#x8DD1;&#x901A;&#x4E86;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x5750;&#x7B49;&#x88AB;&#x5408;&#x5E76;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x7684;&#x4FEE;&#x6539;&#x65B9;&#x6848;&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x8FD9;&#x4E2A;&#x5E93;&#x9488;&#x5BF9;&#x5916;&#x90E8;&#x4E2D;&#x95F4;&#x4EF6;&#x6CE8;&#x518C;&#x7684;&#x987A;&#x5E8F;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x4E8E;<code>app.ts</code>&#x8FD8;&#x8981;&#x6709;&#x989D;&#x5916;&#x7684;&#x4FEE;&#x6539;&#x624D;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x3002;</p><pre><code class="javascript">// app.ts &#x7684;&#x4FEE;&#x6539;
import &apos;reflect-metadata&apos;
import Koa from &apos;koa&apos;
import koaViews from &apos;koa-views&apos;
import { useKoaServer } from &apos;routing-controllers&apos;
import { distPath } from &apos;./config&apos;

// &#x624B;&#x52A8;&#x521B;&#x5EFA;koa&#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x6DFB;&#x52A0;`render`&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x786E;&#x4FDD;`ctx.render`&#x65B9;&#x6CD5;&#x4F1A;&#x5728;&#x8BF7;&#x6C42;&#x7684;&#x5934;&#x90E8;&#x5C31;&#x88AB;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;
const koa = new Koa()

koa.use(koaViews(path.join(__dirname, &apos;../views&apos;), {
  options: {
    ext: &apos;ejs&apos;,
  },
  extension: &apos;ejs&apos;,
}))

// &#x4F7F;&#x7528;`useKoaServer`&#x800C;&#x4E0D;&#x662F;`createKoaServer`
const app = useKoaServer(koa, {
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
})

// &#x540E;&#x7EED;&#x7684;&#x903B;&#x8F91;&#x5C31;&#x90FD;&#x4E00;&#x6837;&#x4E86;
export default app</code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x65B0;&#x7248;&#x53D1;&#x51FA;&#x4EE5;&#x540E;&#x7684;&#x903B;&#x8F91;&#x4E86;&#xFF0C;&#x57FA;&#x4E8E;&#x73B0;&#x6709;&#x7684;&#x7ED3;&#x6784;&#x4E5F;&#x53EF;&#x4EE5;&#x7ED5;&#x8FC7;&#x53BB;&#xFF0C;&#x4F46;&#x662F;&#x5C31;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;<code>@Render</code>&#x88C5;&#x9970;&#x5668;&#x4E86;&#xFF0C;&#x629B;&#x5F00;<code>koa-views</code>&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5185;&#x90E8;&#x7684;<a href="https://github.com/tj/consolidate.js" rel="nofollow noreferrer">consolidate</a>&#xFF1A;</p><pre><code class="javascript">// controller/index.ts
// &#x8FD9;&#x4E2A;&#x4FEE;&#x6539;&#x4E0D;&#x9700;&#x8981;&#x6539;&#x52A8;`app.ts`&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;`createKoaServer`
import {
  Get,
  Controller,
} from &apos;routing-controllers&apos;
import cons from &apos;consolidate&apos;
import path from &apos;path&apos;

@Controller()
export default class {
  @Get(&apos;/&apos;)
  async router() {
    // &#x76F4;&#x63A5;&#x5728;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x65F6;&#x83B7;&#x53D6;&#x6A21;&#x7248;&#x6E32;&#x67D3;&#x540E;&#x7684;&#x6570;&#x636E;
    return cons.ejs(path.resolve(__dirname, &apos;../../views/index.ejs&apos;), {
      title: &apos;Example For TypeScript React App&apos;,
    })
  }
}</code></pre><p><em>&#x76EE;&#x524D;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x91C7;&#x7528;&#x7684;&#x4E0A;&#x8FB9;&#x7684;&#x65B9;&#x6848;</em></p><h2>&#x5C0F;&#x7ED3;</h2><p>&#x81F3;&#x6B64;&#xFF0C;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;TS&#x524D;&#x540E;&#x7AEF;&#x9879;&#x76EE;&#x67B6;&#x6784;&#x5C31;&#x5DF2;&#x7ECF;&#x642D;&#x5EFA;&#x5B8C;&#x6210;&#x4E86;&#xFF08;&#x5269;&#x4E0B;&#x7684;&#x4EFB;&#x52A1;&#x5C31;&#x662F;&#x5F80;&#x9AA8;&#x67B6;&#x91CC;&#x8FB9;&#x586B;&#x4EE3;&#x7801;&#x4E86;&#xFF09;&#x3002;<br>&#x6211;&#x5DF2;&#x7ECF;&#x66F4;&#x65B0;&#x4E86;&#x4E4B;&#x524D;&#x7684;<a href="https://github.com/Jiasm/typescript-example" rel="nofollow noreferrer">typescript-exmaple</a> &#x5728;&#x91CC;&#x8FB9;&#x6DFB;&#x52A0;&#x4E86;&#x672C;&#x6B21;&#x91CD;&#x6784;&#x6240;&#x4F7F;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x524D;&#x7AEF;<code>TS</code>+<code>React</code>&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x8FD8;&#x5305;&#x62EC;&#x9488;&#x5BF9;<code>@Render</code>&#x7684;&#x4E00;&#x4E9B;&#x517C;&#x5BB9;&#x3002;</p><p><code>TypeScript</code>&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x68D2;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;N&#x591A;<code>javaScript</code>&#x79CD;&#x4EE4;&#x4EBA;&#x8BDF;&#x75C5;&#x7684;&#x95EE;&#x9898;&#x3002;<br>&#x4F7F;&#x7528;&#x9759;&#x6001;&#x8BED;&#x8A00;&#x6765;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E0D;&#x4EC5;&#x80FD;&#x591F;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x7684;&#x6548;&#x7387;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x80FD;&#x964D;&#x4F4E;&#x9519;&#x8BEF;&#x51FA;&#x73B0;&#x7684;&#x51E0;&#x7387;&#x3002;<br>&#x7ED3;&#x5408;&#x7740;&#x5F3A;&#x5927;&#x7684;<code>vs code</code>&#xFF0C;Enjoy it.</p><p>&#x5982;&#x679C;&#x5728;&#x4F7F;&#x7528;<code>TS</code>&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x3001;&#x6216;&#x8005;&#x6709;&#x4EC0;&#x4E48;&#x66F4;&#x597D;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x6765;&#x6C9F;&#x901A;&#x8BA8;&#x8BBA;&#x3002;</p><h3>One more things</h3><p>Blued&#x524D;&#x7AEF;/Node&#x56E2;&#x961F;&#x62DB;&#x4EBA;&#x3002;&#x3002;&#x521D;&#x4E2D;&#x9AD8;&#x90FD;&#x6709;HC<br>&#x5750;&#x6807;&#x5E1D;&#x90FD;&#x671D;&#x9633;&#x53CC;&#x4E95;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BF7;&#x8054;&#x7CFB;&#x6211;&#xFF1A;<br>wechat&#xFF1A; github_jiasm<br>mail&#xFF1A; jiashunming@blued.com</p><p>&#x6B22;&#x8FCE;&#x7838;&#x7B80;&#x5386;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TypeScript在react项目中的实践

## 原文链接
[https://segmentfault.com/a/1190000016163937](https://segmentfault.com/a/1190000016163937)


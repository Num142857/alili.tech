---
title: '一款小程序增强开发工具 - EWA' 
date: 2018-11-22 11:48:10
hidden: true
slug: zrjctzytfm
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">EWA (&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x589E;&#x5F3A;&#x5F00;&#x53D1;&#x5DE5;&#x5177;)</h1><p>Enhanced Wechat App Development Toolkit (&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x589E;&#x5F3A;&#x5F00;&#x53D1;&#x5DE5;&#x5177;)</p><p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/lyfeyaj/ewa" rel="nofollow noreferrer" target="_blank">https://github.com/lyfeyaj/ewa</a>&#xFF0C;&#x6B22;&#x8FCE;&#x8BD5;&#x7528; ~</p><p>&#x559C;&#x6B22;&#x4E48;&#xFF1F;&#x6216;&#x8005;&#x5BF9;&#x60A8;&#x6709;&#x7528;&#xFF1F; <a href="https://github.com/lyfeyaj/ewa" rel="nofollow noreferrer" target="_blank">&#x261E; &#x7ACB;&#x5373;&#x53BB; &#x2B50;&#xFE0F; Star &#x2B50;&#xFE0F; &#x4E00;&#x4E0B; &#x261E;</a></p><h2 id="articleHeader1">&#x4E3A;&#x4EC0;&#x4E48;&#x5F00;&#x53D1;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#xFF1F;</h2><p>&#x538C;&#x5026;&#x4E86;&#x4E0D;&#x505C;&#x7684;&#x5BF9;&#x6BD4; <a href="https://github.com/Tencent/wepy" rel="nofollow noreferrer" target="_blank">wepy</a> &#x6216;&#x8005; <a href="https://github.com/Meituan-Dianping/mpvue" rel="nofollow noreferrer" target="_blank">mpvue</a> &#x7684;&#x7279;&#x6027;&#xFF0C;&#x95F4;&#x6B47;&#x6027;&#x7684;&#x8E29;&#x96F7;&#xFF0C;&#x4EE5;&#x53CA; <code>code once, run everywhere</code> &#x7684;&#x5E7B;&#x60F3;&#x3002;&#x53EA;&#x60F3;&#x7ED9;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x63D2;&#x4E0A;&#x6548;&#x7387;&#x7684;&#x7FC5;&#x8180; ~</p><h2 id="articleHeader2">&#x529F;&#x80FD;&#x7279;&#x6027;</h2><ol><li>async/await &#x652F;&#x6301;</li><li>Javascript ES2017 &#x8BED;&#x6CD5;</li><li>&#x539F;&#x751F;&#x5C0F;&#x7A0B;&#x5E8F;&#x6240;&#x6709;&#x529F;&#x80FD;</li><li>&#x5FAE;&#x4FE1;&#x63A5;&#x53E3; Promise &#x5316;</li><li>&#x652F;&#x6301;&#x5B89;&#x88C5; NPM &#x5305;</li><li>&#x652F;&#x6301; SCSS &#x4EE5;&#x53CA; &#x5C0F;&#x4E8E; 16k &#x7684; background-image</li><li>&#x652F;&#x6301; source map, &#x65B9;&#x4FBF;&#x8C03;&#x8BD5;</li><li>&#x6DFB;&#x52A0;&#x65B0;&#x9875;&#x9762;&#x6216;&#x65B0;&#x7EC4;&#x4EF6;&#x65E0;&#x9700;&#x91CD;&#x542F;&#x7F16;&#x8BD1;</li><li>&#x5141;&#x8BB8;&#x81EA;&#x5B9A;&#x4E49;&#x7F16;&#x8BD1;&#x6D41;&#x7A0B;</li></ol><p>&#x66F4;&#x591A;&#x7279;&#x6027;&#x6B63;&#x5728;&#x8D76;&#x6765; ... &#x656C;&#x8BF7;&#x671F;&#x5F85; &#x1F447;</p><ul><li>LESS &#x652F;&#x6301;</li><li>&#x53EF;&#x8DE8;&#x9879;&#x76EE;&#x590D;&#x7528;&#x7684;&#x5C0F;&#x7A0B;&#x5E8F;&#x7EC4;&#x4EF6;&#x6216;&#x9875;&#x9762;&#xFF08;&#x901A;&#x8FC7;NPM&#x5305;&#x7BA1;&#x7406;&#xFF09;</li><li>Redux &#x652F;&#x6301;</li><li>Mixin &#x652F;&#x6301;</li></ul><h2 id="articleHeader3">&#x5B89;&#x88C5;</h2><p>&#x9700;&#x8981; node &#x7248;&#x672C; &gt;= 8</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g ewa-cli &#x6216;&#x8005; yarn global add ewa-cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm i -g ewa-cli &#x6216;&#x8005; yarn global add ewa-cli</code></pre><h2 id="articleHeader4">&#x5982;&#x4F55;&#x4F7F;&#x7528;</h2><h3 id="articleHeader5">&#x521B;&#x5EFA;&#x65B0;&#x9879;&#x76EE;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ewa new your_project_name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">ewa new your_project_name</code></pre><h3 id="articleHeader6">&#x96C6;&#x6210;&#x5230;&#x73B0;&#x6709;&#x5C0F;&#x7A0B;&#x5E8F;&#x9879;&#x76EE;&#xFF0C;&#x4EC5;&#x652F;&#x6301;&#x5C0F;&#x7A0B;&#x5E8F;&#x539F;&#x751F;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x8F6C;&#x6362;</h3><p><strong><em>&#x6CE8;&#x610F;&#xFF1A;&#x4F7F;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x5BF9;&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x505A;&#x597D;&#x5907;&#x4EFD;&#xFF01;&#xFF01;&#xFF01;</em></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd your_project_dir &amp;&amp; ewa init" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">cd</span> your_project_dir &amp;&amp; ewa init</code></pre><h3 id="articleHeader7">&#x542F;&#x52A8;</h3><p>&#x8FD0;&#x884C; <code>npm start</code> &#x5373;&#x53EF;&#x542F;&#x52A8;&#x5B9E;&#x65F6;&#x7F16;&#x8BD1;</p><p>&#x8FD0;&#x884C; <code>npm run build</code> &#x5373;&#x53EF;&#x7F16;&#x8BD1;&#x7EBF;&#x4E0A;&#x7248;&#x672C;&#xFF08;&#x76F8;&#x6BD4;&#x5B9E;&#x65F6;&#x7F16;&#x8BD1;&#x800C;&#x8A00;&#xFF0C;&#x53BB;&#x9664;&#x4E86; source map &#x5E76;&#x589E;&#x52A0;&#x4E86;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x6DF7;&#x6DC6;&#x7B49;&#xFF0C;&#x4F53;&#x79EF;&#x66F4;&#x5C0F;&#xFF09;</p><p>&#x4E0A;&#x8FF0;&#x547D;&#x4EE4;&#x8FD0;&#x884C;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x672C;&#x5730;&#x591A;&#x4E86;&#x4E2A; <code>dist</code> &#x76EE;&#x5F55;&#xFF0C;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x91CC;&#x5C31;&#x662F;&#x751F;&#x6210;&#x7684;&#x5C0F;&#x7A0B;&#x5E8F;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x3002;</p><p>&#x4F7F;&#x7528;<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;</a>&#x9009;&#x62E9; <code>dist</code> &#x76EE;&#x5F55;&#x6253;&#x5F00;&#xFF0C;&#x5373;&#x53EF;&#x9884;&#x89C8;&#x9879;&#x76EE;</p><h3 id="articleHeader8">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; .ewa                         &#x7279;&#x6B8A;&#x5360;&#x4F4D;&#x76EE;&#x5F55;&#xFF0C;&#x7528;&#x4E8E;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x4E3A; ewa &#x9879;&#x76EE;
&#x251C;&#x2500;&#x2500; dist                         &#x5C0F;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x4EE3;&#x7801;&#x76EE;&#x5F55;&#xFF08;&#x8BE5;&#x76EE;&#x5F55;&#x7531;ewa&#x7684;start &#x6216;&#x8005; build&#x6307;&#x4EE4;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x751F;&#x6210;&#xFF0C;&#x8BF7;&#x4E0D;&#x8981;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF09;
&#x251C;&#x2500;&#x2500; node_modules                 &#x5916;&#x90E8;&#x4F9D;&#x8D56;&#x5E93;
&#x251C;&#x2500;&#x2500; src                          &#x4EE3;&#x7801;&#x7F16;&#x5199;&#x7684;&#x76EE;&#x5F55;&#xFF08;&#x8BE5;&#x76EE;&#x5F55;&#x4E3A;&#x4F7F;&#x7528;ewa&#x540E;&#x7684;&#x5F00;&#x53D1;&#x76EE;&#x5F55;&#xFF09;
&#x2502;   &#x251C;&#x2500;&#x2500; components               &#x5C0F;&#x7A0B;&#x5E8F;&#x7EC4;&#x4EF6;&#x76EE;&#x5F55;
&#x2502;   &#x251C;&#x2500;&#x2500; pages                    &#x5C0F;&#x7A0B;&#x5E8F;&#x9875;&#x9762;&#x76EE;&#x5F55;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; index
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; index.js
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; index.wxml
&#x2502;   &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; index.wxss
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; logs
&#x2502;   &#x2502;       &#x251C;&#x2500;&#x2500; logs.js
&#x2502;   &#x2502;       &#x251C;&#x2500;&#x2500; logs.json
&#x2502;   &#x2502;       &#x251C;&#x2500;&#x2500; logs.wxml
&#x2502;   &#x2502;       &#x2514;&#x2500;&#x2500; logs.wxss
&#x2502;   &#x251C;&#x2500;&#x2500; templates                &#x5C0F;&#x7A0B;&#x5E8F;&#x6A21;&#x7248;&#x76EE;&#x5F55;
&#x2502;   &#x251C;&#x2500;&#x2500; utils
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; util.js
&#x2502;   &#x251C;&#x2500;&#x2500; app.js                   &#x5C0F;&#x7A0B;&#x5E8F;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; app.json                 &#x5C0F;&#x7A0B;&#x5E8F;&#x5168;&#x5C40;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; app.wxss                 &#x5C0F;&#x7A0B;&#x5E8F;&#x5168;&#x5C40;&#x6837;&#x5F0F;&#x6587;&#x4EF6;
&#x2502;   &#x2514;&#x2500;&#x2500; project.config.json      &#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x5C0F;&#x7A0B;&#x5E8F;&#x9879;&#x76EE;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; ewa.config.js                ewa &#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; .gitignore
&#x251C;&#x2500;&#x2500; .eslintrc.js                 eslint &#x914D;&#x7F6E;
&#x2514;&#x2500;&#x2500; package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.ewa</span>                         &#x7279;&#x6B8A;&#x5360;&#x4F4D;&#x76EE;&#x5F55;&#xFF0C;&#x7528;&#x4E8E;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x4E3A; ewa &#x9879;&#x76EE;
&#x251C;&#x2500;&#x2500; dist                         &#x5C0F;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x4EE3;&#x7801;&#x76EE;&#x5F55;&#xFF08;&#x8BE5;&#x76EE;&#x5F55;&#x7531;ewa&#x7684;start &#x6216;&#x8005; build&#x6307;&#x4EE4;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x751F;&#x6210;&#xFF0C;&#x8BF7;&#x4E0D;&#x8981;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF09;
&#x251C;&#x2500;&#x2500; node_modules                 &#x5916;&#x90E8;&#x4F9D;&#x8D56;&#x5E93;
&#x251C;&#x2500;&#x2500; src                          &#x4EE3;&#x7801;&#x7F16;&#x5199;&#x7684;&#x76EE;&#x5F55;&#xFF08;&#x8BE5;&#x76EE;&#x5F55;&#x4E3A;&#x4F7F;&#x7528;ewa&#x540E;&#x7684;&#x5F00;&#x53D1;&#x76EE;&#x5F55;&#xFF09;
&#x2502;   &#x251C;&#x2500;&#x2500; components               &#x5C0F;&#x7A0B;&#x5E8F;&#x7EC4;&#x4EF6;&#x76EE;&#x5F55;
&#x2502;   &#x251C;&#x2500;&#x2500; pages                    &#x5C0F;&#x7A0B;&#x5E8F;&#x9875;&#x9762;&#x76EE;&#x5F55;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; index
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.wxml</span>
&#x2502;   &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.wxss</span>
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; logs
&#x2502;   &#x2502;       &#x251C;&#x2500;&#x2500; logs<span class="hljs-selector-class">.js</span>
&#x2502;   &#x2502;       &#x251C;&#x2500;&#x2500; logs<span class="hljs-selector-class">.json</span>
&#x2502;   &#x2502;       &#x251C;&#x2500;&#x2500; logs<span class="hljs-selector-class">.wxml</span>
&#x2502;   &#x2502;       &#x2514;&#x2500;&#x2500; logs<span class="hljs-selector-class">.wxss</span>
&#x2502;   &#x251C;&#x2500;&#x2500; templates                &#x5C0F;&#x7A0B;&#x5E8F;&#x6A21;&#x7248;&#x76EE;&#x5F55;
&#x2502;   &#x251C;&#x2500;&#x2500; utils
&#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; util<span class="hljs-selector-class">.js</span>
&#x2502;   &#x251C;&#x2500;&#x2500; app<span class="hljs-selector-class">.js</span>                   &#x5C0F;&#x7A0B;&#x5E8F;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; app<span class="hljs-selector-class">.json</span>                 &#x5C0F;&#x7A0B;&#x5E8F;&#x5168;&#x5C40;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; app<span class="hljs-selector-class">.wxss</span>                 &#x5C0F;&#x7A0B;&#x5E8F;&#x5168;&#x5C40;&#x6837;&#x5F0F;&#x6587;&#x4EF6;
&#x2502;   &#x2514;&#x2500;&#x2500; project<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.json</span>      &#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x5C0F;&#x7A0B;&#x5E8F;&#x9879;&#x76EE;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; ewa<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>                ewa &#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.gitignore</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>                 eslint &#x914D;&#x7F6E;
&#x2514;&#x2500;&#x2500; package.json</code></pre><h2 id="articleHeader9">&#x5FAE;&#x4FE1;&#x63A5;&#x53E3; Promise &#x5316;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { wx } = require(&apos;ewa&apos;);

Page({
  async onLoad() {
    let { data } = await wx.request({ url: &apos;http://your_api_endpoint&apos; });
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { wx } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;ewa&apos;</span>);

Page({
  <span class="hljs-keyword">async</span> onLoad() {
    <span class="hljs-keyword">let</span> { data } = <span class="hljs-keyword">await</span> wx.request({ <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://your_api_endpoint&apos;</span> });
  }
})</code></pre><h2 id="articleHeader10">&#x914D;&#x7F6E;</h2><p>ewa &#x901A;&#x8FC7; <code>ewa.config.js</code> &#x6765;&#x652F;&#x6301;&#x4E2A;&#x6027;&#x5316;&#x914D;&#x7F6E;&#x3002;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ewa.config.js

module.exports = {
  // &#x516C;&#x7528;&#x4EE3;&#x7801;&#x5E93; (node_modules &#x6253;&#x5305;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;)&#x540D;&#x79F0;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; vendors.js
  commonModuleName: &apos;vendors.js&apos;,

  // &#x901A;&#x7528;&#x6A21;&#x5757;&#x5339;&#x914D;&#x6A21;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; /[\\/]node_modules[\\/]/
  commonModulePattern: /[\\/]node_modules[\\/]/,

  // &#x662F;&#x5426;&#x7B80;&#x5316;&#x8DEF;&#x5F84;&#xFF0C;&#x4F5C;&#x7528;&#x4E8E; page &#x548C; component&#xFF0C;&#x5982; index/index.wxml=&gt; index.wxml&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; false
  simplifyPath: false,

  // &#x6587;&#x4EF6;&#x5939;&#x5FEB;&#x6377;&#x5F15;&#x7528;
  aliasDirs: [
    &apos;apis&apos;,
    &apos;assets&apos;,
    &apos;constants&apos;,
    &apos;utils&apos;
  ],

  // &#x9700;&#x8981;&#x62F7;&#x8D1D;&#x7684;&#x6587;&#x4EF6;&#x7C7B;&#x578B;
  copyFileTypes: [
    &apos;png&apos;,
    &apos;jpeg&apos;,
    &apos;jpg&apos;,
    &apos;gif&apos;,
    &apos;svg&apos;,
    &apos;ico&apos;
  ],

  // webpack loader &#x89C4;&#x5219;
  rules: [],

  // webpack &#x63D2;&#x4EF6;
  plugins: [],

  // &#x5ACC;&#x4E0D;&#x591F;&#x7075;&#x6D3B;&#xFF1F;&#x76F4;&#x63A5;&#x4FEE;&#x6539; webpack &#x914D;&#x7F6E;
  webpack: function(config) {
    return config;
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ewa.config.js</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// &#x516C;&#x7528;&#x4EE3;&#x7801;&#x5E93; (node_modules &#x6253;&#x5305;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;)&#x540D;&#x79F0;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; vendors.js</span>
  commonModuleName: <span class="hljs-string">&apos;vendors.js&apos;</span>,

  <span class="hljs-comment">// &#x901A;&#x7528;&#x6A21;&#x5757;&#x5339;&#x914D;&#x6A21;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; /[\\/]node_modules[\\/]/</span>
  commonModulePattern: <span class="hljs-regexp">/[\\/]node_modules[\\/]/</span>,

  <span class="hljs-comment">// &#x662F;&#x5426;&#x7B80;&#x5316;&#x8DEF;&#x5F84;&#xFF0C;&#x4F5C;&#x7528;&#x4E8E; page &#x548C; component&#xFF0C;&#x5982; index/index.wxml=&gt; index.wxml&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; false</span>
  simplifyPath: <span class="hljs-literal">false</span>,

  <span class="hljs-comment">// &#x6587;&#x4EF6;&#x5939;&#x5FEB;&#x6377;&#x5F15;&#x7528;</span>
  aliasDirs: [
    <span class="hljs-string">&apos;apis&apos;</span>,
    <span class="hljs-string">&apos;assets&apos;</span>,
    <span class="hljs-string">&apos;constants&apos;</span>,
    <span class="hljs-string">&apos;utils&apos;</span>
  ],

  <span class="hljs-comment">// &#x9700;&#x8981;&#x62F7;&#x8D1D;&#x7684;&#x6587;&#x4EF6;&#x7C7B;&#x578B;</span>
  copyFileTypes: [
    <span class="hljs-string">&apos;png&apos;</span>,
    <span class="hljs-string">&apos;jpeg&apos;</span>,
    <span class="hljs-string">&apos;jpg&apos;</span>,
    <span class="hljs-string">&apos;gif&apos;</span>,
    <span class="hljs-string">&apos;svg&apos;</span>,
    <span class="hljs-string">&apos;ico&apos;</span>
  ],

  <span class="hljs-comment">// webpack loader &#x89C4;&#x5219;</span>
  rules: [],

  <span class="hljs-comment">// webpack &#x63D2;&#x4EF6;</span>
  plugins: [],

  <span class="hljs-comment">// &#x5ACC;&#x4E0D;&#x591F;&#x7075;&#x6D3B;&#xFF1F;&#x76F4;&#x63A5;&#x4FEE;&#x6539; webpack &#x914D;&#x7F6E;</span>
  webpack: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>) </span>{
    <span class="hljs-keyword">return</span> config;
  }
};</code></pre><h2 id="articleHeader11">&#x5E38;&#x89C1;&#x95EE;&#x9898; &amp; Tips</h2><ol><li>wxss &#x4E2D;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7F16;&#x5199; scss &#x6837;&#x5F0F;&#x4EE3;&#x7801;</li><li>&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>@</code> &#x6765;&#x4EE3;&#x66FF;<strong>&#x6E90;&#x4EE3;&#x7801;&#x6839;&#x76EE;&#x5F55;</strong>&#x6765;&#x5F15;&#x5165;&#x4EE3;&#x7801;&#x6216;&#x6837;&#x5F0F;&#xFF0C;&#x5982; <code>const utils = require(&apos;@/utils/util&apos;)</code></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一款小程序增强开发工具 - EWA

## 原文链接
[https://segmentfault.com/a/1190000015653494](https://segmentfault.com/a/1190000015653494)


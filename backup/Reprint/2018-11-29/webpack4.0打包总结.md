---
title: 'webpack4.0打包总结' 
date: 2018-11-29 9:27:39
hidden: true
slug: l32r0jujis
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.webpack&#x6982;&#x5FF5;</h2>
<p>WebPack&#x53EF;&#x4EE5;&#x770B;&#x505A;&#x662F;&#x6A21;&#x5757;&#x6253;&#x5305;&#x673A;&#xFF1A;&#x5B83;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#xFF0C;&#x5206;&#x6790;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#xFF0C;&#x627E;&#x5230;JavaScript&#x6A21;&#x5757;&#x4EE5;&#x53CA;&#x5176;&#x5B83;&#x7684;&#x4E00;&#x4E9B;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x7684;&#x62D3;&#x5C55;&#x8BED;&#x8A00;&#xFF08;Scss&#xFF0C;TypeScript&#x7B49;&#xFF09;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x6253;&#x5305;&#x4E3A;&#x5408;&#x9002;&#x7684;&#x683C;&#x5F0F;&#x4EE5;&#x4F9B;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x3002;</p>
<p>&#x6784;&#x5EFA;&#x5C31;&#x662F;&#x628A;&#x6E90;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x6210;&#x53D1;&#x5E03;&#x5230;&#x7EBF;&#x4E0A;&#x7684;&#x53EF;&#x6267;&#x884C; JavaScrip&#x3001;CSS&#x3001;HTML &#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x5982;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#xFF1A;TypeScript &#x7F16;&#x8BD1;&#x6210; JavaScript&#x3001;SCSS &#x7F16;&#x8BD1;&#x6210; CSS &#x7B49;&#x3002;
&#x6587;&#x4EF6;&#x4F18;&#x5316;&#xFF1A;&#x538B;&#x7F29; JavaScript&#x3001;CSS&#x3001;HTML &#x4EE3;&#x7801;&#xFF0C;&#x538B;&#x7F29;&#x5408;&#x5E76;&#x56FE;&#x7247;&#x7B49;&#x3002;
&#x4EE3;&#x7801;&#x5206;&#x5272;&#xFF1A;&#x63D0;&#x53D6;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x3001;&#x63D0;&#x53D6;&#x9996;&#x5C4F;&#x4E0D;&#x9700;&#x8981;&#x6267;&#x884C;&#x90E8;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x8BA9;&#x5176;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x3002;
&#x6A21;&#x5757;&#x5408;&#x5E76;&#xFF1A;&#x5728;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#x7684;&#x9879;&#x76EE;&#x91CC;&#x4F1A;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x548C;&#x6587;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x6784;&#x5EFA;&#x529F;&#x80FD;&#x628A;&#x6A21;&#x5757;&#x5206;&#x7C7B;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;
&#x81EA;&#x52A8;&#x5237;&#x65B0;&#xFF1A;&#x76D1;&#x542C;&#x672C;&#x5730;&#x6E90;&#x4EE3;&#x7801;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x3001;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x3002;
&#x4EE3;&#x7801;&#x6821;&#x9A8C;&#xFF1A;&#x5728;&#x4EE3;&#x7801;&#x88AB;&#x63D0;&#x4EA4;&#x5230;&#x4ED3;&#x5E93;&#x524D;&#x9700;&#x8981;&#x6821;&#x9A8C;&#x4EE3;&#x7801;&#x662F;&#x5426;&#x7B26;&#x5408;&#x89C4;&#x8303;&#xFF0C;&#x4EE5;&#x53CA;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x662F;&#x5426;&#x901A;&#x8FC7;&#x3002;
&#x81EA;&#x52A8;&#x53D1;&#x5E03;&#xFF1A;&#x66F4;&#x65B0;&#x5B8C;&#x4EE3;&#x7801;&#x540E;&#xFF0C;&#x81EA;&#x52A8;&#x6784;&#x5EFA;&#x51FA;&#x7EBF;&#x4E0A;&#x53D1;&#x5E03;&#x4EE3;&#x7801;&#x5E76;&#x4F20;&#x8F93;&#x7ED9;&#x53D1;&#x5E03;&#x7CFB;&#x7EDF;&#x3002;
&#x6784;&#x5EFA;&#x5176;&#x5B9E;&#x662F;&#x5DE5;&#x7A0B;&#x5316;&#x3001;&#x81EA;&#x52A8;&#x5316;&#x601D;&#x60F3;&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4F53;&#x73B0;&#xFF0C;&#x628A;&#x4E00;&#x7CFB;&#x5217;&#x6D41;&#x7A0B;&#x7528;&#x4EE3;&#x7801;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x81EA;&#x52A8;&#x5316;&#x5730;&#x6267;&#x884C;&#x8FD9;&#x4E00;&#x7CFB;&#x5217;&#x590D;&#x6742;&#x7684;&#x6D41;&#x7A0B;&#x3002; &#x6784;&#x5EFA;&#x7ED9;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x6CE8;&#x5165;&#x4E86;&#x66F4;&#x5927;&#x7684;&#x6D3B;&#x529B;&#xFF0C;&#x89E3;&#x653E;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x751F;&#x4EA7;&#x529B;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#xFF1A;TypeScript &#x7F16;&#x8BD1;&#x6210; <span class="hljs-keyword">JavaScript&#x3001;SCSS </span>&#x7F16;&#x8BD1;&#x6210; CSS &#x7B49;&#x3002;
&#x6587;&#x4EF6;&#x4F18;&#x5316;&#xFF1A;&#x538B;&#x7F29; <span class="hljs-keyword">JavaScript&#x3001;CSS&#x3001;HTML </span>&#x4EE3;&#x7801;&#xFF0C;&#x538B;&#x7F29;&#x5408;&#x5E76;&#x56FE;&#x7247;&#x7B49;&#x3002;
&#x4EE3;&#x7801;&#x5206;&#x5272;&#xFF1A;&#x63D0;&#x53D6;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x3001;&#x63D0;&#x53D6;&#x9996;&#x5C4F;&#x4E0D;&#x9700;&#x8981;&#x6267;&#x884C;&#x90E8;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x8BA9;&#x5176;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x3002;
&#x6A21;&#x5757;&#x5408;&#x5E76;&#xFF1A;&#x5728;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#x7684;&#x9879;&#x76EE;&#x91CC;&#x4F1A;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x548C;&#x6587;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x6784;&#x5EFA;&#x529F;&#x80FD;&#x628A;&#x6A21;&#x5757;&#x5206;&#x7C7B;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;
&#x81EA;&#x52A8;&#x5237;&#x65B0;&#xFF1A;&#x76D1;&#x542C;&#x672C;&#x5730;&#x6E90;&#x4EE3;&#x7801;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x3001;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x3002;
&#x4EE3;&#x7801;&#x6821;&#x9A8C;&#xFF1A;&#x5728;&#x4EE3;&#x7801;&#x88AB;&#x63D0;&#x4EA4;&#x5230;&#x4ED3;&#x5E93;&#x524D;&#x9700;&#x8981;&#x6821;&#x9A8C;&#x4EE3;&#x7801;&#x662F;&#x5426;&#x7B26;&#x5408;&#x89C4;&#x8303;&#xFF0C;&#x4EE5;&#x53CA;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x662F;&#x5426;&#x901A;&#x8FC7;&#x3002;
&#x81EA;&#x52A8;&#x53D1;&#x5E03;&#xFF1A;&#x66F4;&#x65B0;&#x5B8C;&#x4EE3;&#x7801;&#x540E;&#xFF0C;&#x81EA;&#x52A8;&#x6784;&#x5EFA;&#x51FA;&#x7EBF;&#x4E0A;&#x53D1;&#x5E03;&#x4EE3;&#x7801;&#x5E76;&#x4F20;&#x8F93;&#x7ED9;&#x53D1;&#x5E03;&#x7CFB;&#x7EDF;&#x3002;
&#x6784;&#x5EFA;&#x5176;&#x5B9E;&#x662F;&#x5DE5;&#x7A0B;&#x5316;&#x3001;&#x81EA;&#x52A8;&#x5316;&#x601D;&#x60F3;&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4F53;&#x73B0;&#xFF0C;&#x628A;&#x4E00;&#x7CFB;&#x5217;&#x6D41;&#x7A0B;&#x7528;&#x4EE3;&#x7801;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x81EA;&#x52A8;&#x5316;&#x5730;&#x6267;&#x884C;&#x8FD9;&#x4E00;&#x7CFB;&#x5217;&#x590D;&#x6742;&#x7684;&#x6D41;&#x7A0B;&#x3002; &#x6784;&#x5EFA;&#x7ED9;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x6CE8;&#x5165;&#x4E86;&#x66F4;&#x5927;&#x7684;&#x6D3B;&#x529B;&#xFF0C;&#x89E3;&#x653E;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x751F;&#x4EA7;&#x529B;&#x3002;</code></pre>
<h2 id="articleHeader1">2.&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h2>
<p>&#x521D;&#x59CB;&#x5316;package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init -y " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init -y </code></pre>
<p>package.json &#x6587;&#x4EF6;&#x4E2D;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
&quot;build&quot;: &quot;webpack  --profile --progress --colors --display-error-details&quot;,
&quot;dev&quot;: &quot;webpack  --display-modules --profile --progress --colors --display-error-details&quot;
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">&quot;scripts&quot;:</span> <span class="hljs-comment">{</span>
<span class="hljs-comment">&quot;build&quot;:</span> <span class="hljs-comment">&quot;webpack</span>  <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">error</span><span class="hljs-literal">-</span><span class="hljs-comment">details&quot;</span><span class="hljs-string">,</span>
<span class="hljs-comment">&quot;dev&quot;:</span> <span class="hljs-comment">&quot;webpack</span>  <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">modules</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">error</span><span class="hljs-literal">-</span><span class="hljs-comment">details&quot;</span>
<span class="hljs-comment">}</span><span class="hljs-string">,</span></code></pre>
<p>color &#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5E26;&#x5F69;&#x8272;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x4F1A;&#x7528;&#x7EA2;&#x8272;&#x663E;&#x793A;&#x8017;&#x65F6;&#x8F83;&#x957F;&#x7684;&#x6B65;&#x9AA4;</p>
<p>profile &#x8F93;&#x51FA;&#x6027;&#x80FD;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6BCF;&#x4E00;&#x6B65;&#x7684;&#x8017;&#x65F6;</p>
<p>progress &#x8F93;&#x51FA;&#x5F53;&#x524D;&#x7F16;&#x8BD1;&#x7684;&#x8FDB;&#x5EA6;&#xFF0C;&#x4EE5;&#x767E;&#x5206;&#x6BD4;&#x7684;&#x5F62;&#x5F0F;&#x5448;&#x73B0;</p>
<p>display-modules &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B; node_modules &#x4E0B;&#x7684;&#x6A21;&#x5757;&#x4F1A;&#x88AB;&#x9690;&#x85CF;&#xFF0C;&#x52A0;&#x4E0A;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x663E;&#x793A;&#x8FD9;&#x4E9B;&#x88AB;&#x9690;&#x85CF;&#x7684;&#x6A21;&#x5757;</p>
<p>display-error-details &#x8F93;&#x51FA;&#x8BE6;&#x7EC6;&#x7684;&#x9519;&#x8BEF;&#x4FE1;&#x606F;</p>
<hr>
<p>&#x5168;&#x5C40;&#x5B89;&#x88C5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack -g" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> webpack -g</code></pre>
<p>&#x672C;&#x5730;&#x5B89;&#x88C5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-cli -D//-D&#x662F;&#x6307;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x9700;&#x8981;&#xFF0C;&#x4E0A;&#x7EBF;&#x4E0D;&#x9700;&#x8981;&#xFF0C;&#x4E0B;&#x540C;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs mathematica"><code style="word-break: break-word; white-space: initial;">npm install webpack webpack-cli -<span class="hljs-keyword">D</span>//-<span class="hljs-keyword">D</span>&#x662F;&#x6307;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x9700;&#x8981;&#xFF0C;&#x4E0A;&#x7EBF;&#x4E0D;&#x9700;&#x8981;&#xFF0C;&#x4E0B;&#x540C;</code></pre>
<p>&#x4E00;&#x822C;&#x63A8;&#x8350;&#x672C;&#x5730;&#x5B89;&#x88C5;&#xFF0C;&#x5B89;&#x88C5;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4E0D;&#x7136;&#x7248;&#x672C;&#x4E0D;&#x540C;&#x4F1A;&#x6709;&#x4E0D;&#x517C;&#x5BB9;&#x3002;</p>
<h2 id="articleHeader2">3.1 webpack&#x6838;&#x5FC3;&#x6982;&#x5FF5;</h2>
<ul>
<li>Entry&#xFF1A;&#x5165;&#x53E3;&#xFF0C;Webpack &#x6267;&#x884C;&#x6784;&#x5EFA;&#x7684;&#x7B2C;&#x4E00;&#x6B65;&#x5C06;&#x4ECE; Entry &#x5F00;&#x59CB;&#xFF0C;&#x53EF;&#x62BD;&#x8C61;&#x6210;&#x8F93;&#x5165;&#x3002;</li>
<li>Module&#xFF1A;&#x6A21;&#x5757;&#xFF0C;&#x5728; Webpack &#x91CC;&#x4E00;&#x5207;&#x7686;&#x6A21;&#x5757;&#xFF0C;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7740;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;Webpack &#x4F1A;&#x4ECE;&#x914D;&#x7F6E;&#x7684; Entry &#x5F00;&#x59CB;&#x9012;&#x5F52;&#x627E;&#x51FA;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#x3002;</li>
<li>Chunk&#xFF1A;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x4E00;&#x4E2A; Chunk &#x7531;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x7EC4;&#x5408;&#x800C;&#x6210;&#xFF0C;&#x7528;&#x4E8E;&#x4EE3;&#x7801;&#x5408;&#x5E76;&#x4E0E;&#x5206;&#x5272;&#x3002;</li>
<li>Loader&#xFF1A;&#x6A21;&#x5757;&#x8F6C;&#x6362;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x628A;&#x6A21;&#x5757;&#x539F;&#x5185;&#x5BB9;&#x6309;&#x7167;&#x9700;&#x6C42;&#x8F6C;&#x6362;&#x6210;&#x65B0;&#x5185;&#x5BB9;&#x3002;</li>
<li>Plugin&#xFF1A;&#x6269;&#x5C55;&#x63D2;&#x4EF6;&#xFF0C;&#x5728; Webpack &#x6784;&#x5EFA;&#x6D41;&#x7A0B;&#x4E2D;&#x7684;&#x7279;&#x5B9A;&#x65F6;&#x673A;&#x6CE8;&#x5165;&#x6269;&#x5C55;&#x903B;&#x8F91;&#x6765;&#x6539;&#x53D8;&#x6784;&#x5EFA;&#x7ED3;&#x679C;&#x6216;&#x505A;&#x4F60;&#x60F3;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x3002;</li>
<li>Output&#xFF1A;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF0C;&#x5728; Webpack &#x7ECF;&#x8FC7;&#x4E00;&#x7CFB;&#x5217;&#x5904;&#x7406;&#x5E76;&#x5F97;&#x51FA;&#x6700;&#x7EC8;&#x60F3;&#x8981;&#x7684;&#x4EE3;&#x7801;&#x540E;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x3002;</li>
</ul>
<h2 id="articleHeader3">3.2 &#x914D;&#x7F6E;webpack</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-cli -D" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm install webpack webpack-<span class="hljs-keyword">cli</span> -<span class="hljs-built_in">D</span></code></pre>
<p>&#x521B;&#x5EFA;src<br>&#x521B;&#x5EFA;dist<br>&#x521B;&#x5EFA;index.html<br>&#x914D;&#x7F6E;&#x6587;&#x4EF6;webpack.config.js</p>
<p>entry&#xFF1A;&#x914D;&#x7F6E;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x5730;&#x5740;<br>output&#xFF1A;&#x914D;&#x7F6E;&#x51FA;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x5730;&#x5740;<br>module&#xFF1A;&#x914D;&#x7F6E;&#x6A21;&#x5757;,&#x4E3B;&#x8981;&#x7528;&#x6765;&#x914D;&#x7F6E;&#x4E0D;&#x540C;&#x6587;&#x4EF6;&#x7684;&#x52A0;&#x8F7D;&#x5668;<br>plugins&#xFF1A;&#x914D;&#x7F6E;&#x63D2;&#x4EF6;<br>devServer&#xFF1A;&#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;<br>// &#x57FA;&#x4E8E;node&#x7684; &#x9075;&#x5FAA;commonjs&#x89C4;&#x8303;&#x7684;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let path = require(&apos;path&apos;);//node&#x7684;&#x6A21;&#x5757;
module.exports = {
entry:&apos;./src/index.js&apos;, // &#x5165;&#x53E3;
output:{

filename:&apos;build.js&apos;,
// &#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x662F;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
path: path.resolve(&apos;./dist&apos;)
}, // &#x51FA;&#x53E3;
devServer:{

contentBase:&apos;./dist&apos;,
port:8080,
compress:true,// &#x670D;&#x52A1;&#x5668;&#x538B;&#x7F29;
open:true,// &#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
// hot:true//&#x70ED;&#x66F4;&#x65B0;
},// &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;
module:{}, // &#x6A21;&#x5757;&#x914D;&#x7F6E;
plugins:[], // &#x63D2;&#x4EF6;&#x7684;&#x914D;&#x7F6E;
mode:&apos;development&apos;, // &#x53EF;&#x4EE5;&#x66F4;&#x6539;&#x6A21;&#x5F0F;
resolve:{}, // &#x914D;&#x7F6E;&#x89E3;&#x6790;
}
// &#x5728;webpack&#x4E2D;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668; webpack-dev-server" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code>let path = require(<span class="hljs-string">&apos;path&apos;</span>);<span class="hljs-comment">//node&#x7684;&#x6A21;&#x5757;</span>
module.exports = {
<span class="hljs-string">entry:</span><span class="hljs-string">&apos;./src/index.js&apos;</span>, <span class="hljs-comment">// &#x5165;&#x53E3;</span>
<span class="hljs-string">output:</span>{
<span class="hljs-symbol">
filename:</span><span class="hljs-string">&apos;build.js&apos;</span>,
<span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x662F;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
<span class="hljs-string">path:</span> path.resolve(<span class="hljs-string">&apos;./dist&apos;</span>)
}, <span class="hljs-comment">// &#x51FA;&#x53E3;</span>
<span class="hljs-string">devServer:</span>{
<span class="hljs-symbol">
contentBase:</span><span class="hljs-string">&apos;./dist&apos;</span>,
<span class="hljs-string">port:</span><span class="hljs-number">8080</span>,
<span class="hljs-string">compress:</span><span class="hljs-literal">true</span>,<span class="hljs-comment">// &#x670D;&#x52A1;&#x5668;&#x538B;&#x7F29;</span>
<span class="hljs-string">open:</span><span class="hljs-literal">true</span>,<span class="hljs-comment">// &#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
<span class="hljs-comment">// hot:true//&#x70ED;&#x66F4;&#x65B0;</span>
},<span class="hljs-comment">// &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;</span>
<span class="hljs-string">module:</span>{}, <span class="hljs-comment">// &#x6A21;&#x5757;&#x914D;&#x7F6E;</span>
<span class="hljs-string">plugins:</span>[], <span class="hljs-comment">// &#x63D2;&#x4EF6;&#x7684;&#x914D;&#x7F6E;</span>
<span class="hljs-string">mode:</span><span class="hljs-string">&apos;development&apos;</span>, <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x66F4;&#x6539;&#x6A21;&#x5F0F;</span>
<span class="hljs-string">resolve:</span>{}, <span class="hljs-comment">// &#x914D;&#x7F6E;&#x89E3;&#x6790;</span>
}
<span class="hljs-comment">// &#x5728;webpack&#x4E2D;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668; webpack-dev-server</span></code></pre>
<p>&#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i webpack-dev-server &#x2013;D" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> webpack-dev-server &#x2013;D</code></pre>
<p>contentBase &#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x6587;&#x4EF6;&#x6839;&#x76EE;&#x5F55;<br>host&#xFF1A;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x76D1;&#x542C;&#x7684;&#x4E3B;&#x673A;&#x5730;&#x5740;<br>compress &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x662F;&#x5426;&#x542F;&#x52A8;gzip&#x7B49;&#x538B;&#x7F29;<br>port&#xFF1A;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x76D1;&#x542C;&#x7684;&#x7AEF;&#x53E3;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{

contentBase:path.resolve(__dirname,&apos;dist&apos;),

host:&apos;localhost&apos;,

compress:true,

port:8080

}//&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;

&quot;scripts&quot;: {

&quot;build&quot;: &quot;webpack --mode development&quot;,

&quot;dev&quot;: &quot;webpack-dev-server --open --mode development &quot;

}//&#x5F00;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1; npm run dev" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">devServer:</span>{
<span class="hljs-symbol">
contentBase:</span>path.resolve(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
<span class="hljs-symbol">
host:</span><span class="hljs-string">&apos;localhost&apos;</span>,
<span class="hljs-symbol">
compress:</span><span class="hljs-literal">true</span>,
<span class="hljs-symbol">
port:</span><span class="hljs-number">8080</span>

}<span class="hljs-comment">//&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;</span>

<span class="hljs-string">&quot;scripts&quot;</span>: {

<span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode development&quot;</span>,

<span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --open --mode development &quot;</span>

}<span class="hljs-comment">//&#x5F00;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1; npm run dev</span></code></pre>
<p>&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x7C7B;&#x578B;</p>
<h2 id="articleHeader4">5.1&#x5355;&#x5165;&#x53E3;+&#x5355;&#x51FA;&#x53E3;</h2>
<p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x5F88;&#x5C11;&#xFF0C;&#x4E00;&#x822C;&#x5C31;&#x4EE5;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5F62;&#x5F0F;&#x51FA;&#x73B0;&#x5373;&#x53EF;,&#x4F8B;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: &apos;./src/index.js&apos;," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">entry:</span> <span class="hljs-string">&apos;./src/index.js&apos;</span>,</code></pre>
<h2 id="articleHeader5">5.2 &#x591A;&#x5165;&#x53E3;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;+&#x5355;&#x51FA;&#x53E3;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry:[&apos;./src/index.js&apos;,&apos;./src/a.js&apos;]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">entry:</span>[<span class="hljs-string">&apos;./src/index.js&apos;</span>,<span class="hljs-string">&apos;./src/a.js&apos;</span>]</code></pre>
<h2 id="articleHeader6">5.1. &#x591A;&#x5165;&#x53E3;+&#x591A;&#x51FA;&#x53E3;</h2>
<p>&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x7684;&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x4E0D;&#x6B62;&#x4E00;&#x4E2A;HTML&#x9875;&#x9762;&#xFF0C;&#x4F1A;&#x6709;&#x591A;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x9700;&#x8981;&#x591A;&#x5165;&#x53E3;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {

   index: &apos;./src/index.js&apos;,
   main:&apos;./src/main.js&apos;
},
output: {
       path: path.resolve(__dirname, &apos;dist&apos;),
       filename: &apos;[name].[hash].js&apos;,
       publicPath:PUBLIC_PATH
  },
   new HtmlWebpackPlugin({
               minify: {
                   removeAttributeQuotes:true
               },
               hash: true,
               template: &apos;./src/index.html&apos;,
               chunks:[&apos;index&apos;],
                filename:&apos;index.html&apos;
           }),
            new HtmlWebpackPlugin({
                minify: {
                   removeAttributeQuotes:true
                },
               hash: true,
               chunks:[&apos;main&apos;],
               template: &apos;./src/main.html&apos;,
               filename:&apos;main.html&apos;
           })]," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">entry</span>: {

<span class="less">   <span class="hljs-attribute">index</span>: <span class="hljs-string">&apos;./src/index.js&apos;</span>,
   <span class="hljs-attribute">main</span>:<span class="hljs-string">&apos;./src/main.js&apos;</span>
},
<span class="hljs-attribute">output</span>: {
       <span class="hljs-attribute">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
       <span class="hljs-attribute">filename</span>: <span class="hljs-string">&apos;[name].[hash].js&apos;</span>,
       <span class="hljs-attribute">publicPath</span>:PUBLIC_PATH
  },
   <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
               <span class="hljs-attribute">minify</span>: {
                   <span class="hljs-attribute">removeAttributeQuotes</span>:true
               },
               <span class="hljs-attribute">hash</span>: true,
               <span class="hljs-attribute">template</span>: <span class="hljs-string">&apos;./src/index.html&apos;</span>,
               <span class="hljs-attribute">chunks</span>:[<span class="hljs-string">&apos;index&apos;</span>],
                <span class="hljs-attribute">filename</span>:<span class="hljs-string">&apos;index.html&apos;</span>
           }),
            <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
                <span class="hljs-attribute">minify</span>: {
                   <span class="hljs-attribute">removeAttributeQuotes</span>:true
                },
               <span class="hljs-attribute">hash</span>: true,
               <span class="hljs-attribute">chunks</span>:[<span class="hljs-string">&apos;main&apos;</span>],
               <span class="hljs-attribute">template</span>: <span class="hljs-string">&apos;./src/main.html&apos;</span>,
               <span class="hljs-attribute">filename</span>:<span class="hljs-string">&apos;main.html&apos;</span>
           })],</span></code></pre>
<p>&#x652F;&#x6301;&#x52A0;&#x8F7D;css&#x6587;&#x4EF6;</p>
<h2 id="articleHeader7">6.1 &#x4EC0;&#x4E48;&#x662F;Loader</h2>
<p>&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;Loader&#xFF0C;Webpack&#x53EF;&#x4EE5;&#x8981;&#x628A;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x8F6C;&#x6210;JS&#x6587;&#x4EF6;,&#x6BD4;&#x5982;CSS&#x3001;ES6/7&#x3001;JSX&#x7B49;</p>
<p>test&#xFF1A;&#x5339;&#x914D;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;<br>use&#xFF1A;loader&#x540D;&#x79F0;&#xFF0C;&#x5C31;&#x662F;&#x4F60;&#x8981;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;<br>include/exclude:&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x5FC5;&#x987B;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x6216;&#x5C4F;&#x853D;&#x4E0D;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#x5939;<br>query&#xFF1A;&#x4E3A;loaders&#x63D0;&#x4F9B;&#x989D;&#x5916;&#x7684;&#x8BBE;&#x7F6E;&#x9009;&#x9879;<br>loader&#x4E09;&#x79CD;&#x5199;&#x6CD5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use
loader
use+loader" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">use</span>
loader
<span class="hljs-keyword">use</span>+loader</code></pre>
<h2 id="articleHeader8">6.2 css-loader</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i style-loader css-loader -D" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> style-loader css-loader -D</code></pre>
<p>&#x914D;&#x7F6E;&#x52A0;&#x8F7D;&#x5668;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
rules:[

{

test:/.css$/,

use:[&apos;style-loader&apos;,&apos;css-loader&apos;],//&#x4ECE;&#x53F3;&#x5F80;&#x5DE6;&#x5199;&#xFF0C;webpack&#x7279;&#x6027;

include:path.join(__dirname,&apos;./src&apos;),

exclude:/node_modules/

}

]
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
<span class="hljs-attribute">rules</span>:[

{

test:/.css$/,

use:[<span class="hljs-string">&apos;style-loader&apos;</span>,<span class="hljs-string">&apos;css-loader&apos;</span>],//&#x4ECE;&#x53F3;&#x5F80;&#x5DE6;&#x5199;&#xFF0C;webpack&#x7279;&#x6027;

include:path.<span class="hljs-built_in">join</span>(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),

exclude:/node_modules/

}

]
},</code></pre>
<p>&#x652F;&#x6301;&#x56FE;&#x7247;</p>
<h2 id="articleHeader9">7.1 &#x624B;&#x52A8;&#x6DFB;&#x52A0;&#x56FE;&#x7247;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i file-loader url-loader -D" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm i <span class="hljs-keyword">file</span>-loader url-loader -<span class="hljs-built_in">D</span></code></pre>
<p>file-loader &#x89E3;&#x51B3;CSS&#x7B49;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5F15;&#x5165;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&#x95EE;&#x9898;<br>url-loader &#x5F53;&#x56FE;&#x7247;&#x8F83;&#x5C0F;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x628A;&#x56FE;&#x7247;BASE64&#x7F16;&#x7801;&#xFF0C;&#x5927;&#x4E8E;limit&#x53C2;&#x6570;&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x662F;&#x4F7F;&#x7528;file-loader &#x8FDB;&#x884C;&#x62F7;&#x8D1D;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let logo=require(&apos;./images/logo.png&apos;);
let img=new Image();
img.src=logo;
document.body.appendChild(img);
{
test:/\.(jpg|png|gif|svg)$/,
use:&apos;url-loader&apos;,
include:path.join(__dirname,&apos;./src&apos;),
exclude:/node_modules/
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code>let logo=require(<span class="hljs-string">&apos;./images/logo.png&apos;</span>);
let img=<span class="hljs-keyword">new</span> Image();
img.src=logo;
document.body.appendChild(img);
{
<span class="hljs-string">test:</span><span class="hljs-regexp">/\.(jpg|png|gif|svg)$/</span>,
<span class="hljs-string">use:</span><span class="hljs-string">&apos;url-loader&apos;</span>,
<span class="hljs-string">include:</span>path.join(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),
<span class="hljs-string">exclude:</span><span class="hljs-regexp">/node_modules/</span>
}</code></pre>
<h2 id="articleHeader10">7.2 &#x5728;CSS&#x4E2D;&#x5F15;&#x5165;&#x56FE;&#x7247;</h2>
<p>&#x8FD8;&#x53EF;&#x4EE5;&#x5728;CSS&#x6587;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x56FE;&#x7247;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-bg{
background: url(./images/logo.png);
width:173px;
height:66px;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.img-bg</span>{
<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(./images/logo.png);
<span class="hljs-attribute">width</span>:<span class="hljs-number">173px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">66px</span>;
}</code></pre>
<p>&#x81EA;&#x52A8;&#x4EA7;&#x51FA;html</p>
<h2 id="articleHeader11">8.1 &#x4EC0;&#x4E48;&#x662F;&#x63D2;&#x4EF6;</h2>
<p>&#x63D2;&#x4EF6;&#x662F; wepback &#x7684;&#x652F;&#x67F1;&#x529F;&#x80FD;&#x3002;webpack &#x81EA;&#x8EAB;&#x4E5F;&#x662F;&#x6784;&#x5EFA;&#x4E8E;&#xFF0C;&#x4F60;&#x5728; webpack &#x914D;&#x7F6E;&#x4E2D;&#x7528;&#x5230;&#x7684;&#x76F8;&#x540C;&#x7684;&#x63D2;&#x4EF6;&#x7CFB;&#x7EDF;&#x4E4B;&#x4E0A;&#xFF01;</p>
<p>&#x63D2;&#x4EF6;&#x4F7F;&#x7528;<br>npm install &#x63D2;&#x4EF6;&#x540D; -D<br>&#x56E0;&#x4E3A;&#x63D2;&#x4EF6;&#x90FD;&#x662F;&#x7C7B;&#xFF0C;&#x5F15;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x5728;plugins&#x6570;&#x7EC4;&#x4E2D; new &#x63D2;&#x4EF6;&#x540D; &#x5373;&#x53EF;&#x4F7F;&#x7528;&#x3002;</p>
<h2 id="articleHeader12">8.2 &#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x81EA;&#x52A8;&#x80FD;&#x4EA7;&#x51FA;HTML&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;&#x91CC;&#x9762;&#x5F15;&#x5165;&#x4EA7;&#x51FA;&#x540E;&#x7684;&#x8D44;&#x6E90;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i html-webpack-plugin -D" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm i html-webpack-<span class="hljs-keyword">plugin</span> -<span class="hljs-built_in">D</span></code></pre>
<p>minify &#x662F;&#x5BF9;html&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#xFF0C;removeAttrubuteQuotes&#x662F;&#x53BB;&#x6389;&#x5C5E;&#x6027;&#x7684;&#x53CC;&#x5F15;&#x53F7;<br>hash &#x5F15;&#x5165;&#x4EA7;&#x51FA;&#x8D44;&#x6E90;&#x7684;&#x65F6;&#x5019;&#x52A0;&#x4E0A;&#x54C8;&#x5E0C;&#x907F;&#x514D;&#x7F13;&#x5B58;<br>template &#x6A21;&#x7248;&#x8DEF;&#x5F84;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
new HtmlWebpackPlugin({

minify: {

removeAttributeQuotes:true

},

hash: true,

template: &apos;./src/index.html&apos;,

filename:&apos;index.html&apos;
})]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">plugins:</span> <span class="hljs-string">[</span>
<span class="hljs-string">new</span> <span class="hljs-string">HtmlWebpackPlugin({</span>

<span class="hljs-attr">minify:</span> <span class="hljs-string">{</span>

<span class="hljs-attr">removeAttributeQuotes:</span><span class="hljs-literal">true</span>

<span class="hljs-string">},</span>

<span class="hljs-attr">hash:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>

<span class="hljs-attr">template:</span> <span class="hljs-string">&apos;./src/index.html&apos;</span><span class="hljs-string">,</span>

<span class="hljs-attr">filename:</span><span class="hljs-string">&apos;index.html&apos;</span>
<span class="hljs-string">})]</span></code></pre>
<p>&#x5206;&#x79BB;CSS</p>
<p>&#x56E0;&#x4E3A;CSS&#x7684;&#x4E0B;&#x8F7D;&#x548C;JS&#x53EF;&#x4EE5;&#x5E76;&#x884C;,&#x5F53;&#x4E00;&#x4E2A;HTML&#x6587;&#x4EF6;&#x5F88;&#x5927;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;CSS&#x5355;&#x72EC;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x52A0;&#x8F7D;&#xFF0C;webpack4&#x4E2D;mini-css-extract-plugin&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x76EE;&#x524D;bug&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x4E0D;&#x80FD;&#x5206;&#x6210;&#x591A;&#x4E2A;css&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev extract-text-webpack-plugin@next" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> extract-text-webpack-plugin@<span class="hljs-built_in">next</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{

test:/\.css$/,
use: ExtractTextWebpackPlugin.extract({
    use:&apos;css-loader&apos;
}),
include:path.join(__dirname,&apos;./src&apos;),
exclude:/node_modules/
},

plugins: [

new ExtractTextWebpackPlugin(&apos;css/index.css&apos;),
]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code>{

test:<span class="hljs-regexp">/\.css$/</span>,
use: ExtractTextWebpackPlugin.extract({
    use:<span class="hljs-string">&apos;css-loader&apos;</span>
}),
<span class="hljs-keyword">include</span>:path.<span class="hljs-keyword">join</span>(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),
<span class="hljs-keyword">exclude</span>:<span class="hljs-regexp">/node_modules/</span>
},

plugins: [

<span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">&apos;css/index.css&apos;</span>),
]</code></pre>
<p>&#x5904;&#x7406;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&#x95EE;&#x9898;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PUBLIC_PATH=&apos;/&apos;;

output: {

path: path.resolve(__dirname, &apos;dist&apos;),
filename: &apos;bundle.js&apos;,
publicPath:PUBLIC_PATH
},
// &#x6307;&#x5B9A;&#x6253;&#x5305;&#x540E;&#x7684;&#x56FE;&#x7247;&#x4F4D;&#x7F6E;

use: [

{
 loader: &apos;url-loader&apos;,
 options: {
   limit: 1024,
  outputPath:&apos;images/&apos;
 }
}
]," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">PUBLIC_PATH=&apos;/&apos;;</span>

<span class="hljs-attr">output:</span> <span class="hljs-string">{</span>

<span class="hljs-attr">path:</span> <span class="hljs-string">path.resolve(__dirname,</span> <span class="hljs-string">&apos;dist&apos;</span><span class="hljs-string">),</span>
<span class="hljs-attr">filename:</span> <span class="hljs-string">&apos;bundle.js&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">publicPath:</span><span class="hljs-string">PUBLIC_PATH</span>
<span class="hljs-string">},</span>
<span class="hljs-string">//</span> <span class="hljs-string">&#x6307;&#x5B9A;&#x6253;&#x5305;&#x540E;&#x7684;&#x56FE;&#x7247;&#x4F4D;&#x7F6E;</span>

<span class="hljs-attr">use:</span> <span class="hljs-string">[</span>

<span class="hljs-string">{</span>
<span class="hljs-attr"> loader:</span> <span class="hljs-string">&apos;url-loader&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr"> options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">   limit:</span> <span class="hljs-number">1024</span><span class="hljs-string">,</span>
<span class="hljs-attr">  outputPath:</span><span class="hljs-string">&apos;images/&apos;</span>
 <span class="hljs-string">}</span>
<span class="hljs-string">}</span>
<span class="hljs-string">],</span></code></pre>
<p>&#x5728;HTML&#x4E2D;&#x4F7F;&#x7528;&#x56FE;&#x7247;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i html-withimg-loader -D
&lt;div class=&quot;img-container &quot;&gt;&lt;img src=&quot;./images/logo.png&quot; alt=&quot;logo.png&quot;&gt;&lt;/div&gt;
{

test:/.(html|html)$/,

use:&apos;html-withimg-loader&apos;,

include:path.join(__dirname,&apos;./src&apos;),

exclude:/node_modules/
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>npm i html-withimg-loader -D
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;img-container &quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./images/logo.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;logo.png&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
{

<span class="hljs-attr">test</span>:<span class="hljs-regexp">/.(html|html)$/</span>,

<span class="hljs-attr">use</span>:<span class="hljs-string">&apos;html-withimg-loader&apos;</span>,

<span class="hljs-attr">include</span>:path.join(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),

<span class="hljs-attr">exclude</span>:<span class="hljs-regexp">/node_modules/</span>
}</code></pre>
<p>&#x7F16;&#x8BD1;less &#x548C; sass</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i less less-loader -D
npm i node-saas sass-loader -D
@color:orange;
.less-container{

border:1px solid @color;
}

$color:green;
.sass-container{

border:1px solid $color;
}
const cssExtract=new ExtractTextWebpackPlugin(&apos;css.css&apos;);
const lessExtract=new ExtractTextWebpackPlugin(&apos;less.css&apos;);
const sassExtract=new ExtractTextWebpackPlugin(&apos;sass.css&apos;);

        {

            test:/\.less$/,
            use: lessExtract.extract({
                use:[&apos;css-loader&apos;,&apos;less-loader&apos;]
            }),
            include:path.join(__dirname,&apos;./src&apos;),
            exclude:/node_modules/
        },
        {
            test:/\.scss$/,
            use: sassExtract.extract({
                use:[&apos;css-loader&apos;,&apos;sass-loader&apos;]
            }),
            include:path.join(__dirname,&apos;./src&apos;),
            exclude:/node_modules/
        }," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-built_in">npm</span> i less less-loader -D
<span class="hljs-built_in">npm</span> i node-saas sass-loader -D
@color:orange;
.less-container{

border:<span class="hljs-number">1px</span> solid @color;
}

$color:green;
.sass-container{

border:<span class="hljs-number">1px</span> solid $color;
}
<span class="hljs-keyword">const</span> cssExtract=<span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">&apos;css.css&apos;</span>);
<span class="hljs-keyword">const</span> lessExtract=<span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">&apos;less.css&apos;</span>);
<span class="hljs-keyword">const</span> sassExtract=<span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">&apos;sass.css&apos;</span>);

        {

            test:<span class="hljs-regexp">/\.less$/</span>,
            use: lessExtract.extract({
                use:[<span class="hljs-string">&apos;css-loader&apos;</span>,<span class="hljs-string">&apos;less-loader&apos;</span>]
            }),
            include:path.join(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),
            exclude:<span class="hljs-regexp">/node_modules/</span>
        },
        {
            test:<span class="hljs-regexp">/\.scss$/</span>,
            use: sassExtract.extract({
                use:[<span class="hljs-string">&apos;css-loader&apos;</span>,<span class="hljs-string">&apos;sass-loader&apos;</span>]
            }),
            include:path.join(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),
            exclude:<span class="hljs-regexp">/node_modules/</span>
        },</code></pre>
<p>&#x5904;&#x7406;CSS3&#x5C5E;&#x6027;&#x524D;&#x7F00;</p>
<p>&#x4E3A;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x52A0;&#x5165;-webkit,-ms,-o,-moz&#x8FD9;&#x4E9B;&#x524D;&#x7F00;</p>
<p>Trident&#x5185;&#x6838;&#xFF1A;&#x4E3B;&#x8981;&#x4EE3;&#x8868;&#x4E3A;IE&#x6D4F;&#x89C8;&#x5668;, &#x524D;&#x7F00;&#x4E3A;-ms<br>Gecko&#x5185;&#x6838;&#xFF1A;&#x4E3B;&#x8981;&#x4EE3;&#x8868;&#x4E3A;Firefox, &#x524D;&#x7F00;&#x4E3A;-moz<br>Presto&#x5185;&#x6838;&#xFF1A;&#x4E3B;&#x8981;&#x4EE3;&#x8868;&#x4E3A;Opera, &#x524D;&#x7F00;&#x4E3A;-o<br>Webkit&#x5185;&#x6838;&#xFF1A;&#x4EA7;&#x8981;&#x4EE3;&#x8868;&#x4E3A;Chrome&#x548C;Safari, &#x524D;&#x7F00;&#x4E3A;-webkit</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i postcss-loader autoprefixer -D
postcss-loader

postcss.config.js

module.exports={

plugins:[require(&apos;autoprefixer&apos;)]
}
.circle {

transform: translateX(100px);

{

            test:/\.css$/,
            use: cssExtract.extract({
use:[&apos;css-loader&apos;,&apos;postcss-loader&apos;]

}),
include:path.join(__dirname,&apos;./src&apos;),
exclude:/node_modules/
},
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> postcss-loader autoprefixer -D
postcss-loader

postcss<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>

module.exports={

plugins:[require(<span class="hljs-string">&apos;autoprefixer&apos;</span>)]
}
<span class="hljs-selector-class">.circle</span> {

<span class="hljs-attribute">transform</span>: translateX(<span class="hljs-number">100px</span>);

{

            test:/\.css$/,
            use: cssExtract.extract({
use:[<span class="hljs-string">&apos;css-loader&apos;</span>,<span class="hljs-string">&apos;postcss-loader&apos;</span>]

}),
include:path.join(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),
exclude:/node_modules/
},
}</code></pre>
<p>&#x8F6C;&#x4E49;ES6/ES7/JSX</p>
<p>Babel&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;JavaScript&#x7684;&#x5E73;&#x53F0;,&#x53EF;&#x4EE5;&#x628A;ES6/ES7,React&#x7684;JSX&#x8F6C;&#x4E49;&#x4E3A;ES5</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react -D
    {

    test:/\.jsx?$/,
    use: {
        loader: &apos;babel-loader&apos;,
        options: {
            presets: [&quot;env&quot;,&quot;stage-0&quot;,&quot;react&quot;]
        }
    },
    include:path.join(__dirname,&apos;./src&apos;),
    exclude:/node_modules/
    }," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code>npm i babel-core babel-loader babel-preset-env babel-preset-stage-<span class="hljs-number">0</span> babel-preset-react -D
    {

    test:<span class="hljs-regexp">/\.jsx?$/</span>,
    use: {
        loader: <span class="hljs-string">&apos;babel-loader&apos;</span>,
        <span class="hljs-keyword">options</span>: {
            presets: [<span class="hljs-string">&quot;env&quot;</span>,<span class="hljs-string">&quot;stage-0&quot;</span>,<span class="hljs-string">&quot;react&quot;</span>]
        }
    },
    <span class="hljs-keyword">include</span>:path.<span class="hljs-keyword">join</span>(__dirname,<span class="hljs-string">&apos;./src&apos;</span>),
    <span class="hljs-keyword">exclude</span>:<span class="hljs-regexp">/node_modules/</span>
    },</code></pre>
<h2 id="articleHeader13">&#x5982;&#x4F55;&#x8C03;&#x8BD5;&#x6253;&#x5305;&#x540E;&#x7684;&#x4EE3;&#x7801;</h2>
<p>webapck&#x901A;&#x8FC7;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x7ED9;&#x6211;&#x4EEC;source maps&#x6587;&#x4EF6;&#xFF0C;map&#x6587;&#x4EF6;&#x662F;&#x4E00;&#x79CD;&#x5BF9;&#x5E94;&#x7F16;&#x8BD1;&#x6587;&#x4EF6;&#x548C;&#x6E90;&#x6587;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source-map &#x628A;&#x6620;&#x5C04;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x5230;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6700;&#x5B8C;&#x6574;&#x6700;&#x6162;
cheap-module-source-map &#x5728;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x4E0D;&#x5E26;&#x5217;&#x6620;&#x5C04;&#x7684;Map
eval-source-map &#x4F7F;&#x7528;eval&#x6253;&#x5305;&#x6E90;&#x6587;&#x4EF6;&#x6A21;&#x5757;,&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x751F;&#x6210;&#x5B8C;&#x6574;sourcemap
cheap-module-eval-source-map sourcemap&#x548C;&#x6253;&#x5305;&#x540E;&#x7684;JS&#x540C;&#x884C;&#x663E;&#x793A;&#xFF0C;&#x6CA1;&#x6709;&#x6620;&#x5C04;&#x5217;
devtool:&apos;eval-source-map&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span> &#x628A;&#x6620;&#x5C04;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x5230;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6700;&#x5B8C;&#x6574;&#x6700;&#x6162;
cheap-module-<span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span> &#x5728;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x4E0D;&#x5E26;&#x5217;&#x6620;&#x5C04;&#x7684;Map
<span class="hljs-built_in">eval</span>-<span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span> &#x4F7F;&#x7528;<span class="hljs-built_in">eval</span>&#x6253;&#x5305;&#x6E90;&#x6587;&#x4EF6;&#x6A21;&#x5757;,&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x751F;&#x6210;&#x5B8C;&#x6574;sourcemap
cheap-module-<span class="hljs-built_in">eval</span>-<span class="hljs-keyword">source</span>-<span class="hljs-keyword">map</span> sourcemap&#x548C;&#x6253;&#x5305;&#x540E;&#x7684;JS&#x540C;&#x884C;&#x663E;&#x793A;&#xFF0C;&#x6CA1;&#x6709;&#x6620;&#x5C04;&#x5217;
devtoo<span class="hljs-variable">l:</span><span class="hljs-string">&apos;eval-source-map&apos;</span></code></pre>
<p>&#x62F7;&#x8D1D;&#x9759;&#x6001;&#x6587;&#x4EF6;</p>
<p>&#x6709;&#x65F6;&#x9879;&#x76EE;&#x4E2D;&#x6CA1;&#x6709;&#x5F15;&#x7528;&#x7684;&#x6587;&#x4EF6;&#x4E5F;&#x9700;&#x8981;&#x6253;&#x5305;&#x5230;&#x76EE;&#x6807;&#x76EE;&#x5F55;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i copy-webpack-plugin -D
new CopyWebpackPlugin([{

        from: path.join(__dirname,&apos;public&apos;),//&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#x6E90;&#x5730;&#x5740;
        to:&apos;./public&apos; //&#x76EE;&#x6807;&#x5730;&#x5740;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;output&#x7684;path&#x76EE;&#x5F55;
    }])," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code>npm i <span class="hljs-keyword">copy</span>-webpack-plugin -D
<span class="hljs-keyword">new</span> CopyWebpackPlugin([{

        <span class="hljs-keyword">from</span>: path.<span class="hljs-keyword">join</span>(__dirname,<span class="hljs-string">&apos;public&apos;</span>),<span class="hljs-comment">//&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#x6E90;&#x5730;&#x5740;</span>
        to:<span class="hljs-string">&apos;./public&apos;</span> <span class="hljs-comment">//&#x76EE;&#x6807;&#x5730;&#x5740;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;output&#x7684;path&#x76EE;&#x5F55;</span>
    }]),</code></pre>
<p>&#x6253;&#x5305;&#x524D;&#x5148;&#x6E05;&#x7A7A;&#x8F93;&#x51FA;&#x76EE;&#x5F55;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i clean-webpack-plugin -D
new cleanWebpaclPlugin(path.join(__dirname,&apos;dist&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lisp"><code>npm i clean-webpack-plugin -D
new cleanWebpaclPlugin(<span class="hljs-name">path</span>.join(<span class="hljs-name">__dirname</span>,&apos;dist&apos;))</code></pre>
<p>&#x538B;&#x7F29;CSS</p>
<p>webpack&#x53EF;&#x4EE5;&#x6D88;&#x9664;&#x672A;&#x4F7F;&#x7528;&#x7684;CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D purifycss-webpack purify-css glob
new PurifyCSSPlugin({//purifycss&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x904D;&#x5386;&#x4F60;&#x7684;HTML&#x6587;&#x4EF6;&#xFF0C;&#x67E5;&#x627E;&#x4F60;&#x4F7F;&#x7528;&#x7684;CSS
paths:require(&apos;glob&apos;).sync(path.join(__dirname,&apos;src/*.html&apos;))
})," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code>npm i -D purifycss-webpack purify-css <span class="hljs-built_in">glob</span>
<span class="hljs-keyword">new</span> PurifyCSSPlugin({//purifycss&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x904D;&#x5386;&#x4F60;&#x7684;HTML&#x6587;&#x4EF6;&#xFF0C;&#x67E5;&#x627E;&#x4F60;&#x4F7F;&#x7528;&#x7684;CSS
path<span class="hljs-variable">s:require</span>(<span class="hljs-string">&apos;glob&apos;</span>).<span class="hljs-keyword">sync</span>(path.<span class="hljs-keyword">join</span>(__dirname,<span class="hljs-string">&apos;src/*.html&apos;</span>))
}),</code></pre>
<p>resolve&#x89E3;&#x6790;</p>
<h2 id="articleHeader14">17.1 extensions</h2>
<p>&#x6307;&#x5B9A;extension&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x5728;require&#x6216;&#x662F;import&#x7684;&#x65F6;&#x5019;&#x52A0;&#x6587;&#x4EF6;&#x6269;&#x5C55;&#x540D;,&#x4F1A;&#x4F9D;&#x6B21;&#x5C1D;&#x8BD5;&#x6DFB;&#x52A0;&#x6269;&#x5C55;&#x540D;&#x8FDB;&#x884C;&#x5339;&#x914D;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {

//&#x81EA;&#x52A8;&#x8865;&#x5168;&#x540E;&#x7F00;&#xFF0C;&#x6CE8;&#x610F;&#x7B2C;&#x4E00;&#x4E2A;&#x5FC5;&#x987B;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;,&#x540E;&#x7F00;&#x4E00;&#x5B9A;&#x4EE5;&#x70B9;&#x5F00;&#x5934;
extensions: [&quot; &quot;,&quot;.js&quot;,&quot;.css&quot;,&quot;.json&quot;],
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">resolve</span>: {

<span class="dts"><span class="hljs-comment">//&#x81EA;&#x52A8;&#x8865;&#x5168;&#x540E;&#x7F00;&#xFF0C;&#x6CE8;&#x610F;&#x7B2C;&#x4E00;&#x4E2A;&#x5FC5;&#x987B;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;,&#x540E;&#x7F00;&#x4E00;&#x5B9A;&#x4EE5;&#x70B9;&#x5F00;&#x5934;</span>
<span class="hljs-symbol">extensions:</span> [<span class="hljs-string">&quot; &quot;</span>,<span class="hljs-string">&quot;.js&quot;</span>,<span class="hljs-string">&quot;.css&quot;</span>,<span class="hljs-string">&quot;.json&quot;</span>],
},</span></code></pre>
<h2 id="articleHeader15">17.2 alias</h2>
<p>&#x914D;&#x7F6E;&#x522B;&#x540D;&#x53EF;&#x4EE5;&#x52A0;&#x5FEB;webpack&#x67E5;&#x627E;&#x6A21;&#x5757;&#x7684;&#x901F;&#x5EA6;</p>
<p>&#x6BCF;&#x5F53;&#x5F15;&#x5165;jquery&#x6A21;&#x5757;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x4F1A;&#x76F4;&#x63A5;&#x5F15;&#x5165;jqueryPath,&#x800C;&#x4E0D;&#x9700;&#x8981;&#x4ECE;node_modules&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x6309;&#x6A21;&#x5757;&#x7684;&#x67E5;&#x627E;&#x89C4;&#x5219;&#x67E5;&#x627E;<br>&#x4E0D;&#x9700;&#x8981;webpack&#x53BB;&#x89E3;&#x6790;jquery.js&#x6587;&#x4EF6;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bootstrap=path.join(__dirname,&apos;node_modules/bootstrap/dist/css/bootstrap.css&apos;)
resolve: {

alias: {

&apos;bootstrap&apos;: bootstrap

}
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">bootstrap</span>=path.join(__dirname,&apos;node_modules/<span class="hljs-keyword">bootstrap</span>/dist/css/<span class="hljs-keyword">bootstrap</span>.css&apos;)
resolve: {

alias: {

&apos;<span class="hljs-keyword">bootstrap</span>&apos;: <span class="hljs-keyword">bootstrap</span>

}
},</code></pre>
<p>&#x533A;&#x5206;&#x73AF;&#x5883;&#x53D8;&#x91CF;</p>
<p>&#x8BB8;&#x591A; library &#x5C06;&#x901A;&#x8FC7;&#x4E0E; process.env.NODE_ENV &#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5173;&#x8054;&#xFF0C;&#x4EE5;&#x51B3;&#x5B9A; library &#x4E2D;&#x5E94;&#x8BE5;&#x5F15;&#x7528;&#x54EA;&#x4E9B;&#x5185;&#x5BB9;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5F53;&#x4E0D;&#x5904;&#x4E8E;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;&#x65F6;&#xFF0C;&#x67D0;&#x4E9B; library &#x4E3A;&#x4E86;&#x4F7F;&#x8C03;&#x8BD5;&#x53D8;&#x5F97;&#x5BB9;&#x6613;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6DFB;&#x52A0;&#x989D;&#x5916;&#x7684;&#x65E5;&#x5FD7;&#x8BB0;&#x5F55;(log)&#x548C;&#x6D4B;&#x8BD5;(test)&#x3002;&#x5176;&#x5B9E;&#xFF0C;&#x5F53;&#x4F7F;&#x7528; process.env.NODE_ENV === &apos;production&apos; &#x65F6;&#xFF0C;&#x4E00;&#x4E9B; library &#x53EF;&#x80FD;&#x9488;&#x5BF9;&#x5177;&#x4F53;&#x7528;&#x6237;&#x7684;&#x73AF;&#x5883;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x4F18;&#x5316;&#xFF0C;&#x4ECE;&#x800C;&#x5220;&#x9664;&#x6216;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x91CD;&#x8981;&#x4EE3;&#x7801;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; webpack &#x5185;&#x7F6E;&#x7684; DefinePlugin &#x4E3A;&#x6240;&#x6709;&#x7684;&#x4F9D;&#x8D56;&#x5B9A;&#x4E49;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install cross-env -D
&quot;scripts&quot;: {

&quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --mode development&quot;,

&quot;dev&quot;: &quot;webpack-dev-server --open --mode development &quot;
},
plugins: [

new webpack.DefinePlugin({

NODE_ENV:JSON.stringify(process.env.NODE_ENV)

}),

if (process.env.NODE_ENV == &apos;development&apos;) {

console.log(&apos;&#x8FD9;&#x662F;&#x5F00;&#x53D1;&#x73AF;&#x5883;&apos;);
} else {

console.log(&apos;&#x8FD9;&#x662F;&#x751F;&#x4EA7;&#x73AF;&#x5883;&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs mel"><code>npm install <span class="hljs-keyword">cross</span>-<span class="hljs-keyword">env</span> -D
<span class="hljs-string">&quot;scripts&quot;</span>: {

<span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;cross-env NODE_ENV=production webpack --mode development&quot;</span>,

<span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --open --mode development &quot;</span>
},
plugins: [

new webpack.DefinePlugin({

NODE_ENV:JSON.stringify(process.<span class="hljs-keyword">env</span>.NODE_ENV)

}),

<span class="hljs-keyword">if</span> (process.<span class="hljs-keyword">env</span>.NODE_ENV == <span class="hljs-string">&apos;development&apos;</span>) {

console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&apos;&#x8FD9;&#x662F;&#x5F00;&#x53D1;&#x73AF;&#x5883;&apos;</span>);
} <span class="hljs-keyword">else</span> {

console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&apos;&#x8FD9;&#x662F;&#x751F;&#x4EA7;&#x73AF;&#x5883;&apos;</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4F5C;&#x8005;&#xFF1A;&#x6B63;&#x513F;&#x516B;&#x7ECF;&#x7684;&#x5A07;&#x5A07;
&#x94FE;&#x63A5;&#xFF1A;https://juejin.im/post/5af8fa806fb9a07ac162876d
&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;
&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs awk"><code>&#x4F5C;&#x8005;&#xFF1A;&#x6B63;&#x513F;&#x516B;&#x7ECF;&#x7684;&#x5A07;&#x5A07;
&#x94FE;&#x63A5;&#xFF1A;https:<span class="hljs-regexp">//</span>juejin.im<span class="hljs-regexp">/post/</span><span class="hljs-number">5</span>af8fa806fb9a07ac162876d
&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;
&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4.0打包总结

## 原文链接
[https://segmentfault.com/a/1190000015141775](https://segmentfault.com/a/1190000015141775)


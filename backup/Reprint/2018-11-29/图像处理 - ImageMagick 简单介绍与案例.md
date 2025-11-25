---
title: '图像处理 - ImageMagick 简单介绍与案例' 
date: 2018-11-29 9:27:38
hidden: true
slug: y1psme7499
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; <code>PhotoShop</code> &#x7B49; <code>GUI</code> &#x5DE5;&#x5177;&#x5904;&#x7406;&#x9759;&#x6001;&#x56FE;&#x7247;&#x6216;&#x8005;&#x52A8;&#x6001; <code>GIF</code> &#x56FE;&#x7247;&#xFF0C;&#x4E0D;&#x8FC7;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x5BF9;&#x4E8E; <code>WEB</code> &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x8981;&#x5904;&#x7406;&#x56FE;&#x7247;&#x683C;&#x5F0F;&#x8F6C;&#x6362;&#xFF0C;&#x7F29;&#x653E;&#x88C1;&#x526A;&#xFF0C;&#x7FFB;&#x8F6C;&#x626D;&#x66F2;&#xFF0C;PDF&#x89E3;&#x6790;&#x7B49;&#x64CD;&#x4F5C;&#xFF0C; <code>GUI</code> &#x8F6F;&#x4EF6;&#x5C31;&#x5F88;&#x96BE;&#x4E0B;&#x624B;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6B64;&#x5904;&#x9700;&#x8981;&#x53EC;&#x5524;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#x6765;&#x5E2E;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x8FD9;&#x4E9B;&#x4E8B;&#x3002;</p>
<p><strong>ImageMagick:</strong> &#x662F;&#x4E00;&#x6B3E;&#x521B;&#x5EFA;&#x3001;&#x7F16;&#x8F91;&#x3001;&#x5408;&#x6210;&#xFF0C;&#x8F6C;&#x6362;&#x56FE;&#x50CF;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#x3002;&#x652F;&#x6301;&#x683C;&#x5F0F;&#x8D85;&#x8FC7; <code>200</code> &#x79CD;&#xFF0C;&#x5305;&#x62EC;&#x5E38;&#x89C1;&#x7684; <code>PNG, JPEG, GIF, HEIC, TIFF, DPX, EXR, WebP, Postscript, PDF, SVG</code> &#x7B49;&#x3002;&#x529F;&#x80FD;&#x5305;&#x62EC;&#x8C03;&#x6574;&#xFF0C;&#x7FFB;&#x8F6C;&#xFF0C;&#x955C;&#x50CF;(mirror)&#xFF0C;&#x65CB;&#x8F6C;&#xFF0C;&#x626D;&#x66F2;&#xFF0C;&#x4FEE;&#x526A;&#x548C;&#x53D8;&#x6362;&#x56FE;&#x50CF;&#xFF0C;&#x8C03;&#x6574;&#x56FE;&#x50CF;&#x989C;&#x8272;&#xFF0C;&#x5E94;&#x7528;&#x5404;&#x79CD;&#x7279;&#x6B8A;&#x6548;&#x679C;&#xFF0C;&#x6216;&#x7ED8;&#x5236;&#x6587;&#x672C;&#xFF0C;&#x7EBF;&#x6761;&#xFF0C;&#x591A;&#x8FB9;&#x5F62;&#xFF0C;&#x692D;&#x5706;&#x548C;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x7B49;&#x3002;</p>
<p>&#x5B98;&#x7F51;&#xFF1A;<a href="https://www.imagemagick.org" rel="nofollow noreferrer" target="_blank">https://www.imagemagick.org</a>&#xFF0C;&#x4E0B;&#x9762;&#x653E;&#x4E2A;&#x5C0F;&#x6807;&#x8BC6;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bV9Yrn?w=176&amp;h=233" src="https://static.alili.tech/img/bV9Yrn?w=176&amp;h=233" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x5B89;&#x88C5; ImageMagick</h2>
<blockquote>&#x652F;&#x6301; <code>Linux, Windows, Mac OS X, iOS, Android OS</code> &#x7B49;&#x5E73;&#x53F0;<br><a href="https://www.imagemagick.org/script/download.php" rel="nofollow noreferrer" target="_blank">https://www.imagemagick.org/s...</a>
</blockquote>
<p>&#x56E0;&#x4E3A;&#x6211;&#x662F; MAC &#x673A;&#x5668;&#xFF0C;&#x6F14;&#x793A;&#x4E00;&#x4E0B; <code>brew</code> &#x7684;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#x54AF;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew install imagemagick" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>imagemagick</code></pre>
<h2 id="articleHeader1">&#x57FA;&#x672C;&#x547D;&#x4EE4;&#x4E0E;&#x683C;&#x5F0F;</h2>
<h3 id="articleHeader2">1&#x3001;&#x57FA;&#x672C;&#x547D;&#x4EE4;</h3>
<blockquote>
<code>ImageMagick</code> &#x5305;&#x62EC;&#x4E00;&#x7EC4;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#x6765;&#x64CD;&#x4F5C;&#x56FE;&#x7247;&#xFF0C;&#x5B89;&#x88C5;&#x597D; <code>ImageMagick</code> &#x540E;&#xFF0C;&#x7EC8;&#x7AEF;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#x547D;&#x4EE4;&#x4E86;&#x3002;</blockquote>
<p><code>magick:</code> &#x521B;&#x5EFA;&#x3001;&#x7F16;&#x8F91;&#x56FE;&#x50CF;&#xFF0C;&#x8F6C;&#x6362;&#x56FE;&#x50CF;&#x683C;&#x5F0F;&#xFF0C;&#x4EE5;&#x53CA;&#x8C03;&#x6574;&#x56FE;&#x50CF;&#x5927;&#x5C0F;&#x3001;&#x6A21;&#x7CCA;&#x3001;&#x88C1;&#x5207;&#x3001;&#x9664;&#x53BB;&#x6742;&#x70B9;&#x3001;&#x6296;&#x52A8; ( dither )&#x3001;&#x7ED8;&#x56FE;&#x3001;&#x7FFB;&#x8F6C;&#x3001;&#x5408;&#x5E76;&#x3001;&#x91CD;&#x65B0;&#x91C7;&#x6837;&#x7B49;&#x3002;<br><code>convert:</code> &#x7B49;&#x540C;&#x4E8E; <code>magick</code> &#x547D;&#x4EE4;&#x3002;<br><code>identify:</code> &#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x56FE;&#x50CF;&#x6587;&#x4EF6;&#x7684;&#x683C;&#x5F0F;&#x548C;&#x7279;&#x5F81;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x5206;&#x8FA8;&#x7387;&#x3001;&#x5927;&#x5C0F;&#x3001;&#x5C3A;&#x5BF8;&#x3001;&#x8272;&#x5F69;&#x7A7A;&#x95F4;&#x7B49;&#x3002;<br><code>mogrify:</code> &#x4E0E; <code> magick</code> &#x529F;&#x80FD;&#x4E00;&#x6837;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E0D;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#xFF0C;&#x81EA;&#x52A8;&#x8986;&#x76D6;&#x539F;&#x59CB;&#x56FE;&#x50CF;&#x6587;&#x4EF6;&#x3002;<br><code>composite:</code> &#x5C06;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x6216;&#x591A;&#x4E2A;&#x56FE;&#x7247;&#x7EC4;&#x5408;&#x6210;&#x65B0;&#x56FE;&#x7247;&#x3002;<br><code>montage:</code> &#x7EC4;&#x5408;&#x591A;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x56FE;&#x50CF;&#x6765;&#x521B;&#x5EFA;&#x5408;&#x6210;&#x56FE;&#x50CF;&#x3002;&#x6BCF;&#x4E2A;&#x56FE;&#x50CF;&#x90FD;&#x53EF;&#x4EE5;&#x7528;&#x8FB9;&#x6846;&#xFF0C;&#x900F;&#x660E;&#x5EA6;&#x7B49;&#x7279;&#x6027;&#x8FDB;&#x884C;&#x88C5;&#x9970;&#x3002;</p>
<p><code>compare:</code> &#x4ECE;&#x6570;&#x5B66;&#x548C;&#x89C6;&#x89C9;&#x89D2;&#x5EA6;&#x6BD4;&#x8F83;&#x6E90;&#x56FE;&#x50CF;&#x4E0E;&#x91CD;&#x5EFA;&#x56FE;&#x50CF;&#x4E4B;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#x3002;<br><code>display:</code> &#x5728;&#x4EFB;&#x4F55; X server &#x4E0A;&#x663E;&#x793A;&#x4E00;&#x4E2A;&#x56FE;&#x50CF;&#x6216;&#x56FE;&#x50CF;&#x5E8F;&#x5217;&#x3002;<br><code>animate:</code> &#x5728;&#x4EFB;&#x4F55; X server &#x4E0A;&#x663E;&#x793A;&#x56FE;&#x50CF;&#x5E8F;&#x5217;&#x3002;<br><code>import:</code> &#x4FDD;&#x5B58; X server &#x4E0A;&#x7684;&#x4EFB;&#x4F55;&#x53EF;&#x89C1;&#x7A97;&#x53E3;&#x5E76;&#x628A;&#x5B83;&#x4F5C;&#x4E3A;&#x56FE;&#x50CF;&#x6587;&#x4EF6;&#x8F93;&#x51FA;&#x3002;&#x53EF;&#x4EE5;&#x6355;&#x6349;&#x5355;&#x4E2A;&#x7A97;&#x53E3;&#xFF0C;&#x6574;&#x4E2A;&#x5C4F;&#x5E55;&#x6216;&#x5C4F;&#x5E55;&#x7684;&#x4EFB;&#x610F;&#x77E9;&#x5F62;&#x90E8;&#x5206;&#x3002;<br><code>conjure:</code> &#x89E3;&#x91CA;&#x5E76;&#x6267;&#x884C; MSL ( Magick Scripting Language ) &#x5199;&#x7684;&#x811A;&#x672C;&#x3002;<br><code>stream:</code> &#x4E00;&#x4E2A;&#x8F7B;&#x91CF;&#x7EA7;&#x5DE5;&#x5177;&#xFF0C;&#x7528;&#x4E8E;&#x5C06;&#x56FE;&#x50CF;&#x6216;&#x90E8;&#x5206;&#x56FE;&#x50CF;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x50CF;&#x7D20;&#x7EC4;&#x4EF6;&#x6D41;&#x5F0F;&#x4F20;&#x8F93;&#x5230;&#x5B58;&#x50A8;&#x8BBE;&#x5907;&#x3002;&#x5728;&#x5904;&#x7406;&#x5927;&#x56FE;&#x50CF;&#x6216;&#x539F;&#x59CB;&#x50CF;&#x7D20;&#x7EC4;&#x4EF6;&#x65F6;&#x5F88;&#x6709;&#x7528;&#x3002;</p>
<h3 id="articleHeader3">2&#x3001;&#x547D;&#x4EE4;&#x683C;&#x5F0F;</h3>
<p>&#x57FA;&#x672C;&#x547D;&#x4EE4;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x9075;&#x5FAA; <code>Unix</code> &#x98CE;&#x683C;&#x7684;&#x6807;&#x51C6;&#x683C;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="command [options] input_image output_image" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">command</span> [<span class="hljs-title">options</span>] <span class="hljs-title">input_image</span> <span class="hljs-title">output_image</span></code></pre>
<p>&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x5C06;&#x4E00;&#x5F20;&#x5BBD;&#x9AD8; <code>300x300</code> &#x7684;&#x56FE;&#x7247; <code>goods.png</code> &#x8F6C;&#x6362;&#x6210; <code>200x200</code> &#x7684;<code>goods.jpg</code>&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x7528;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert -resize 200x200 goods.png goods.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">convert</span> <span class="hljs-selector-tag">-resize</span> 200<span class="hljs-selector-tag">x200</span> <span class="hljs-selector-tag">goods</span><span class="hljs-selector-class">.png</span> <span class="hljs-selector-tag">goods</span><span class="hljs-selector-class">.jpg</span></code></pre>
<blockquote>
<code>-resize</code> &#x5B9A;&#x4E49;&#x56FE;&#x7247;&#x5C3A;&#x5BF8;&#xFF0C;<code>ImageMagick</code> &#x6240;&#x6709;&#x7684;&#x9009;&#x9879;&#x53C2;&#x6570;&#x90FD;&#x5728;&#x8FD9;&#x4E2A;&#x3010;<a href="https://www.imagemagick.org/script/command-line-options.php" rel="nofollow noreferrer" target="_blank">&#x547D;&#x4EE4;&#x884C;&#x9009;&#x9879;&#x624B;&#x518C;</a>&#x3011;&#x3002;</blockquote>
<p>&#x4F46;&#x662F;&#x968F;&#x7740;&#x529F;&#x80FD;&#x7684;&#x590D;&#x6742;&#xFF0C;&#x547D;&#x4EE4;&#x7F13;&#x6162;&#x6269;&#x5927;&#x6210;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x683C;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="command [options] image1 [options] image2 [options] output_image    " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">command</span> [<span class="hljs-keyword">options</span>] image1 [<span class="hljs-keyword">options</span>] image2 [<span class="hljs-keyword">options</span>] output_image    </code></pre>
<p>&#x4E8E;&#x662F;&#x4E0A;&#x9762;&#x7684;&#x547D;&#x4EE4;&#x4E5F;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#x8FD9;&#x6837;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert goods.png -resize 200x200 goods.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">convert</span> <span class="hljs-selector-tag">goods</span><span class="hljs-selector-class">.png</span> <span class="hljs-selector-tag">-resize</span> 200<span class="hljs-selector-tag">x200</span> <span class="hljs-selector-tag">goods</span><span class="hljs-selector-class">.jpg</span></code></pre>
<p><code>&#x7B14;&#x8BB0;&#xFF1A;</code>&#x4E2A;&#x4EBA;&#x5EFA;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x8F6C;&#x6362;&#x7684;&#x662F;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#xFF0C;&#x90A3;&#x4E48;&#x7528;&#x7B2C;&#x4E00;&#x79CD;&#x683C;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;&#x50CF; <code>-density</code> &#x7B49;&#x4E00;&#x4E9B;&#x9009;&#x9879;&#x5FC5;&#x987B;&#x653E;&#x5728; <code>command</code> &#x4E0E; <code>input_image</code> &#x4E4B;&#x95F4;&#xFF0C;&#x6240;&#x4EE5;&#x4E3A;&#x4E86;&#x7701;&#x8BB0;&#x90FD;&#x4E0D;&#x5199;&#x9519;&#xFF0C;&#x90FD;&#x5199;&#x5728; <code>command</code> &#x4E0E; <code>input_image</code> &#x4E4B;&#x95F4;&#x5C82;&#x4E0D;&#x5F88;&#x597D;&#x3002;<br>&#x4F46;&#x662F;&#x5982;&#x679C;&#x662F;&#x591A;&#x5F20;&#x56FE;&#x7247;&#x8F6C;&#x6362;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x6309;&#x7B2C;&#x4E8C;&#x79CD;&#x683C;&#x5F0F;&#xFF0C;&#x6B63;&#x786E;&#x8F93;&#x51FA;&#x547D;&#x4EE4;&#x9009;&#x9879;&#x4E86;&#x3002;</p>
<p><code>&#x63D0;&#x793A;&#xFF1A;</code>&#x5982;&#x679C;&#x4E0A;&#x9762;&#x7684;&#x5DE5;&#x5177;&#x547D;&#x4EE4;&#x5728;&#x8BA1;&#x7B97;&#x673A;&#x4E0A;&#x4E0D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x628A;&#x5B83;&#x4EEC;&#x5F53;&#x4F5C; <code>magick</code> &#x547D;&#x4EE4;&#x7684;&#x5B50;&#x547D;&#x4EE4;&#x4F7F;&#x7528;&#xFF0C;&#x4F8B;&#x5982;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="magick identify goods.png" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">magick</span> <span class="hljs-selector-tag">identify</span> <span class="hljs-selector-tag">goods</span><span class="hljs-selector-class">.png</span></code></pre>
<h3 id="articleHeader4">3&#x3001;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x683C;&#x5F0F;</h3>
<p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B; <code>ImageMagick</code> &#x4F1A;&#x8BFB;&#x53D6;&#x56FE;&#x50CF;&#x4E2D;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#x683C;&#x5F0F;&#x7684;&#x7B7E;&#x540D;&#x6765;&#x786E;&#x5B9A;&#x6587;&#x4EF6;&#x683C;&#x5F0F;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#xFF0C;&#x5219;&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;&#x6765;&#x786E;&#x5B9A;&#x683C;&#x5F0F;&#xFF0C;&#x5982; <code>image.jpg</code> &#x88AB;&#x8BA4;&#x4E3A; <code>jpeg</code> &#x683C;&#x5F0F;&#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x90FD;&#x83B7;&#x53D6;&#x4E0D;&#x5230;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x7684;&#x683C;&#x5F0F;&#x3002;&#x547D;&#x4EE4;&#x683C;&#x5F0F;&#x4E3A; <code>format:input_or_output_image</code>&#x3002;</p>
<p>&#x8F93;&#x5165;&#x6587;&#x4EF6;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x5E94;&#x8BE5;&#x4E0D;&#x9700;&#x8981;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x683C;&#x5F0F;&#xFF0C;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;<code>png</code> &#x683C;&#x5F0F;&#x5206; <code>png8</code>&#x3001;<code>png24</code> &#x7B49;&#x683C;&#x5F0F;&#xFF0C;&#x5982;&#x679C; <code>png8</code> &#x683C;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x9700;&#x6C42;&#xFF0C;&#x6307;&#x5B9A;&#x5408;&#x7406;&#x7684;&#x683C;&#x5F0F;&#x53EF;&#x4EE5;&#x7F29;&#x5C0F;&#x6587;&#x4EF6;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert goods.png png8:goods_8.png
convert goods.png png24:goods_24.png" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>convert goods<span class="hljs-selector-class">.png</span> png8:goods_8<span class="hljs-selector-class">.png</span>
convert goods<span class="hljs-selector-class">.png</span> png24:goods_24.png</code></pre>
<h2 id="articleHeader5">&#x5B9E;&#x9645;&#x6848;&#x4F8B;</h2>
<blockquote>&#x6587;&#x4E2D;&#x6848;&#x4F8B;&#x57FA;&#x4E8E; <code>ImageMagick 7.0.7</code>
</blockquote>
<h3 id="articleHeader6">1&#x3001;&#x751F;&#x6210;&#x7F29;&#x7565;&#x56FE;</h3>
<p>&#x9700;&#x6C42;&#xFF1A;&#x5C06;&#x4E00;&#x5F20;&#x5BBD;&#x9AD8;&#x4E3A; <code>900x600</code> &#x7684;&#x56FE;&#x7247; <code>goods.jpg</code> &#x751F;&#x6210;&#x5BBD;&#x9AD8;&#x4E3A; <code>150x100</code> &#x7684;&#x7F29;&#x7565;&#x56FE; <code>thumbnail.jpg</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert -resize 150x100 -quality 70 -strip goods.jpg thumbnail.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">convert</span> <span class="hljs-selector-tag">-resize</span> 150<span class="hljs-selector-tag">x100</span> <span class="hljs-selector-tag">-quality</span> 70 <span class="hljs-selector-tag">-strip</span> <span class="hljs-selector-tag">goods</span><span class="hljs-selector-class">.jpg</span> <span class="hljs-selector-tag">thumbnail</span><span class="hljs-selector-class">.jpg</span></code></pre>
<p>&#x89E3;&#x91CA;&#xFF1A;</p>
<ul>
<li>
<code>-resize 150x100</code>&#xFF1A;&#x5B9A;&#x4E49;&#x8F93;&#x51FA;&#x7684;&#x7F29;&#x7565;&#x56FE;&#x5C3A;&#x5BF8;&#x4E3A; <code>150x100</code>&#x3002;</li>
<li>
<code>-quality 70</code>&#xFF1A;&#x964D;&#x4F4E;&#x7F29;&#x7565;&#x56FE;&#x7684;&#x8D28;&#x91CF;&#x4E3A; <code>70</code>&#xFF0C;&#x53D6;&#x503C;&#x8303;&#x56F4; <code>1</code> ( &#x6700;&#x4F4E;&#x56FE;&#x50CF;&#x8D28;&#x91CF;&#x548C;&#x6700;&#x9AD8;&#x538B;&#x7F29;&#x7387; ) &#x5230; <code>100</code> ( &#x6700;&#x9AD8;&#x56FE;&#x50CF;&#x8D28;&#x91CF;&#x548C;&#x6700;&#x4F4E;&#x538B;&#x7F29;&#x7387; )&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x6839;&#x636E;&#x8F93;&#x51FA;&#x683C;&#x5F0F;&#x6709; <code>75</code>&#x3001;<code>92</code>&#x3001;<code>100</code>&#xFF0C;&#x9009;&#x9879;&#x9002;&#x7528;&#x4E8E; <code>JPEG / MIFF / PNG</code>&#x3002;</li>
<li>
<code>-strip</code>&#xFF1A;&#x8BA9;&#x7F29;&#x7565;&#x56FE;&#x79FB;&#x9664;&#x56FE;&#x7247;&#x5185;&#x5D4C;&#x7684;&#x6240;&#x6709;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x6CE8;&#x91CA;&#x7B49;&#x4FE1;&#x606F;&#xFF0C;&#x4EE5;&#x51CF;&#x5C0F;&#x6587;&#x4EF6;&#x5927;&#x5C0F;&#x3002;</li>
</ul>
<blockquote>
<code>-resize</code> &#x5EF6;&#x4F38;&#x89E3;&#x8BFB;&#xFF0C;&#x5982;&#x4E0B;&#x3002;</blockquote>
<p>&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x8F93;&#x5165;&#x7684;&#x56FE;&#x7247;&#x548C;&#x8F93;&#x51FA;&#x7684;&#x56FE;&#x7247;&#x6BD4;&#x4F8B;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x6709;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#x51FA;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x9047;&#x5230;&#x6BD4;&#x4F8B;&#x4E0D;&#x540C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x5199;&#x6CD5;&#x5E76;&#x4E0D;&#x4F1A;&#x5F97;&#x5230; <code>150x100</code> &#x7684;&#x56FE;&#x50CF;&#xFF0C;&#x800C;&#x662F;&#x4F1A;&#x6839;&#x636E;&#x56FE;&#x50CF;&#x7684;&#x5BBD;&#x9AD8;&#x6BD4;&#x4F8B;&#xFF0C;&#x53D6;&#x6700;&#x5927;&#x503C;&#xFF0C;&#x5F97;&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x53EF;&#x80FD;&#x662F; <code>150</code> &#x5BBD;&#x548C;&#x66F4;&#x5C0F;&#x7684;&#x9AD8;&#xFF0C;&#x6216;&#x8005; <code>100</code> &#x9AD8;&#x548C;&#x66F4;&#x5C0F;&#x7684;&#x5BBD;&#xFF1B;&#x6240;&#x4EE5; <code>IamgeMagick</code> &#x63D0;&#x4F9B;&#x4E86;&#x51E0;&#x79CD;&#x7B26;&#x53F7;&#x6765;&#x5B9A;&#x4E49;&#x7F29;&#x653E;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert -resize &apos;150x100!&apos; goods.jpg thumbnail.jpg
convert -resize &apos;150x100&gt;&apos; goods.jpg thumbnail.jpg
convert -resize &apos;150x100&lt;&apos; goods.jpg thumbnail.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-built_in">convert</span> -resize <span class="hljs-string">&apos;150x100!&apos;</span> goods.jpg thumbnail.jpg
<span class="hljs-built_in">convert</span> -resize <span class="hljs-string">&apos;150x100&gt;&apos;</span> goods.jpg thumbnail.jpg
<span class="hljs-built_in">convert</span> -resize <span class="hljs-string">&apos;150x100&lt;&apos;</span> goods.jpg thumbnail.jpg</code></pre>
<p><code>!</code>&#xFF1A;&#x4E0D;&#x7BA1;&#x56FE;&#x7247;&#x5BBD;&#x9AD8;&#x5982;&#x4F55;&#xFF0C;&#x90FD;&#x7F29;&#x653E;&#x6210; <code>150x100</code> &#x8FD9;&#x6837;&#x7684;&#x5C3A;&#x5BF8;&#x3002;<br><code>&gt;</code>&#xFF1A;&#x53EA;&#x6709;&#x5BBD;&#x9AD8;&#x5747;&#x5927;&#x4E8E; <code>150x100</code> &#x7684;&#x56FE;&#x7247;&#x624D;&#x7F29;&#x653E;&#x6210;&#x8BE5;&#x5C3A;&#x5BF8; ( &#x6309;&#x6BD4;&#x4F8B;&#x53D6;&#x6700;&#x5927;&#x503C; )&#xFF0C;&#x5C0F;&#x4E8E;&#x7684;&#x56FE;&#x7247;&#x4E0D;&#x505A;&#x5904;&#x7406;&#x3002;<br><code>&lt;</code>&#xFF1A;&#x4E0E; <code>&gt;</code> &#x529F;&#x80FD;&#x76F8;&#x53CD;&#x3002;</p>
<p><code>&#x63D0;&#x793A;&#xFF1A;</code>&#x56E0;&#x4E3A;&#x6709;&#x4E9B;&#x5B57;&#x7B26;&#x662F; <code>Linux shell</code> &#x6216;&#x5176;&#x4ED6;&#x7CFB;&#x7EDF;&#x7684;&#x7279;&#x6B8A;&#x5B57;&#x7B26;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x7528;&#x5F15;&#x53F7;&#x5305;&#x88F9;&#x8D77;&#x6765;&#x6216;&#x8005;&#x7528;&#x53CD;&#x659C;&#x7EBF; <code>\</code> &#x8F6C;&#x4E49;&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x53EF;&#x80FD;&#x5F15;&#x53F7;&#x90FD;&#x662F;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x3002;</p>
<h3 id="articleHeader7">2&#x3001;&#x6DFB;&#x52A0;&#x6C34;&#x5370;</h3>
<p>&#x9700;&#x6C42; &#x2460; &#xFF1A;&#x7ED9;&#x56FE;&#x7247;&#x5C45;&#x4E2D;&#x52A0;&#x4E0A;&#x900F;&#x660E;&#x6587;&#x672C;&#x6C34;&#x5370;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -draw &apos;text 0,0 &quot;JD.COM&quot;&apos;  -fill &apos;rgba(221, 34, 17, 0.25)&apos;  -pointsize 36  \
-font &apos;cochin.ttc&apos;  -gravity center  joy.jpg  watermark.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>convert  -draw &apos;text <span class="hljs-number">0</span>,<span class="hljs-number">0</span> <span class="hljs-string">&quot;JD.COM&quot;</span>&apos;  -fill &apos;rgba(<span class="hljs-number">221</span>, <span class="hljs-number">34</span>, <span class="hljs-number">17</span>, <span class="hljs-number">0.25</span>)&apos;  -pointsize <span class="hljs-number">36</span>  \
-font &apos;cochin.ttc&apos;  -gravity center  joy.jpg  watermark.jpg</code></pre>
<p>&#x89E3;&#x91CA;&#xFF1A;</p>
<ul>
<li>
<code>-draw</code>&#xFF1A;&#x7ED8;&#x56FE;&#x9009;&#x9879;&#xFF0C;<code>text</code> &#x58F0;&#x660E;&#x7ED8;&#x5236;&#x6587;&#x672C;&#xFF0C; <code>0,0</code>&#x58F0;&#x660E;&#x6587;&#x672C;&#x8DDD;&#x79BB;&#x56FE;&#x7247;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x504F;&#x79FB;&#x503C;&#xFF0C; <code>JD.COM</code>&#x58F0;&#x660E;&#x7ED8;&#x5236;&#x7684;&#x6587;&#x672C;&#xFF0C;&#x6700;&#x597D;&#x7528;&#x5F15;&#x53F7;&#x5305;&#x88F9;&#x8D77;&#x6765;&#xFF0C;&#x907F;&#x514D;&#x8F93;&#x5165;&#x7279;&#x6B8A;&#x5B57;&#x7B26;&#x5F15;&#x8D77;&#x9519;&#x8BEF;&#x3002;&#x7ED8;&#x5236;&#x6587;&#x672C;&#x7684;&#x683C;&#x5F0F;&#x4E3A; <code>text x,y string</code>&#xFF0C;&#x5F53;&#x7136;&#x8FD8;&#x53EF;&#x4EE5;&#x7ED8;&#x5236;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#xFF0C;&#x8BF8;&#x5982;&#x5706; ( circle )&#x3001;&#x6298;&#x7EBF; ( polyline )&#x3002;</li>
<li>
<code>-fill</code>&#xFF1A;&#x5BF9;&#x6587;&#x672C;&#x586B;&#x5145;&#x989C;&#x8272;&#xFF0C;&#x8C8C;&#x4F3C; <code>ImageMagick</code> &#x547D;&#x4EE4;&#x4E2D;<code>&#x524D;&#x9762;&#x7684;&#x9009;&#x9879;</code>&#x662F;&#x7528;&#x6765;&#x63A7;&#x5236;<code>&#x540E;&#x9762;&#x7684;&#x9009;&#x9879;</code>&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5E94;&#x8BE5;&#x628A;&#x8FD9;&#x6837;&#x7684;&#x4FEE;&#x9970;&#x9009;&#x9879;&#x653E;&#x5230; <code>-draw</code> &#x524D;&#x9762;&#x6BD4;&#x8F83;&#x597D;&#xFF0C;<code>&#x5F88;&#x91CD;&#x8981;</code>&#xFF0C;&#x540E;&#x9762;&#x7684;&#x6848;&#x4F8B;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x3002;</li>
<li>
<code>-pointsize</code>&#xFF1A;&#x6307;&#x5B9A;&#x6587;&#x672C;&#x7684;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#x3002;</li>
<li>
<code>-font</code>&#xFF1A;&#x6307;&#x5B9A;&#x5B57;&#x4F53;&#x3002;</li>
<li>
<code>-gravity</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x6587;&#x672C;&#x5728;&#x56FE;&#x7247;&#x91CC;&#x7684;&#x6392;&#x5217;&#x65B9;&#x5F0F; ( &#x7C7B;&#x4F3C; CSS &#x91CC;&#x7684; align-items + justify-content )&#xFF0C;<code>center</code> &#x8868;&#x793A;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x90FD;&#x5C45;&#x4E2D;&#xFF0C;&#x5176;&#x4ED6;&#x503C;&#x8FD8;&#x53EF;&#x4EE5;&#x662F;&#xFF1A;<code>NorthWest, North, NorthEast, West, East, SouthWest, South, SouthEast</code>&#xFF0C;&#x4E0D;&#x8BB0;&#x5927;&#x5C0F;&#x5199;&#x3002;</li>
<li>
<code>\</code>&#xFF1A;&#x53CD;&#x659C;&#x7EBF;&#x4E5F;&#x662F;&#x7C7B; <code>Unix</code> &#x7CFB;&#x7EDF;&#x7684;&#x7EED;&#x884C;&#x5B57;&#x7B26;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x5F88;&#x957F;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x5B83;&#x5199;&#x6210;&#x591A;&#x884C;&#xFF0C;&#x4EE5;&#x4FBF;&#x89C6;&#x89C9;&#x4E0A;&#x7684;&#x7F8E;&#x89C2;&#x548C;&#x76F4;&#x89C2;&#x3002;</li>
</ul>
<p>&#x9700;&#x6C42; &#x2461; &#xFF1A;&#x7ED9;&#x56FE;&#x7247;&#x52A0;&#x4E0A;&#x503E;&#x659C;&#x5E73;&#x94FA;&#x900F;&#x660E;&#x6587;&#x672C;&#x6C34;&#x5370;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -size 100x100  xc:none  \
-fill &apos;#d90f02&apos;  -pointsize 18  -font &apos;cochin.ttc&apos;  \
-gravity center  -draw &apos;rotate -45 text 0,0 &quot;JD.COM&quot;&apos;  \
-resize 60%  miff:-  |  composite  -tile  -dissolve 25  -  joy.jpg  watermark.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haml"><code>convert  -size 100x100  xc:none  \
-<span class="ruby">fill <span class="hljs-string">&apos;#d90f02&apos;</span>  -pointsize <span class="hljs-number">18</span>  -font <span class="hljs-string">&apos;cochin.ttc&apos;</span>  \
</span>-<span class="ruby">gravity center  -draw <span class="hljs-string">&apos;rotate -45 text 0,0 &quot;JD.COM&quot;&apos;</span>  \
</span>-<span class="ruby">resize <span class="hljs-number">60</span>%  <span class="hljs-symbol">miff:</span>-  <span class="hljs-params">|  composite  -tile  -dissolve 25  -  joy.jpg  watermark.jpg</span></span></code></pre>
<p>&#x89E3;&#x91CA;&#xFF1A;&#x6587;&#x672C;&#x5E73;&#x94FA;&#x6C34;&#x5370;&#x5176;&#x5B9E;&#x662F;&#x5C06;&#x6587;&#x672C;&#x753B;&#x6210;&#x4E00;&#x5F20; <code>png</code> &#x56FE;&#x7247;&#xFF0C;&#x7136;&#x540E;&#x7528;&#x8FD9;&#x5F20;&#x900F;&#x660E;&#x56FE;&#x7247;&#x5728;&#x76EE;&#x6807;&#x56FE;&#x7247;&#x4E0A;&#x8FDB;&#x884C;&#x5E73;&#x94FA;&#x3002;</p>
<ul>
<li>
<code>-size</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x753B;&#x5E03;&#x7684;&#x5927;&#x5C0F;&#x3002;</li>
<li>
<code>xc:</code>&#xFF1A;&#x5168;&#x79F0; <code>X Constant Image</code>&#xFF0C;&#x662F; <code>canvas:</code>&#x7684;&#x522B;&#x540D;&#xFF0C;&#x5B9A;&#x4E49;&#x4E00;&#x5F20;&#x753B;&#x5E03;&#xFF0C;&#x7528;&#x6765;&#x7ED8;&#x56FE;&#xFF0C;&#x5E38;&#x7528;&#x683C;&#x5F0F;&#x4E3A; <code>xc:color</code>&#xFF0C;<code>none</code> &#x6216;&#x8005; <code>transparent</code> &#x8BBE;&#x7F6E;&#x753B;&#x5E03;&#x4E3A;&#x900F;&#x660E;&#x5E95;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x767D;&#x8272;&#x3002;</li>
<li>
<code>-resize</code>&#xFF1A;&#x8BE5;&#x9009;&#x9879;&#x8FD8;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x767E;&#x5206;&#x6BD4;&#xFF0C;&#x610F;&#x4E3A;&#x7F29;&#x653E;&#x81F3;&#x539F;&#x56FE;&#x50CF;&#x7684;&#x767E;&#x5206;&#x4E4B;&#x51E0;&#x3002;&#x8C8C;&#x4F3C; <code>-pointsize</code> &#x5C0F;&#x4E8E; <code>14</code> &#x540E;&#xFF0C;<code>-draw</code> &#x91CC;&#x7684; <code>rotate</code> &#x4F1A;&#x4E0D;&#x751F;&#x6548;&#xFF0C;&#x6240;&#x4EE5;&#x7528; <code>-resize</code> &#x6765;&#x628A;&#x5E73;&#x94FA;&#x56FE;&#x6848;&#x53D8;&#x5F97;&#x66F4;&#x5C0F;&#x3002;</li>
<li>
<p><code>miff:-</code>&#xFF1A;</p>
<ul>
<li>
<code>miff:</code> &#x58F0;&#x660E;&#x8F93;&#x51FA; ImageMagick ( IM ) &#x81EA;&#x5DF1;&#x7684;&#x56FE;&#x50CF;&#x6587;&#x4EF6;&#x683C;&#x5F0F;&#xFF1A;<a href="https://www.imagemagick.org/script/miff.php" rel="nofollow noreferrer" target="_blank">MIFF</a>&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x9014;&#x662F;&#x4EE5;&#x590D;&#x6742;&#x7684;&#x65B9;&#x5F0F;&#x5904;&#x7406;&#x56FE;&#x50CF;&#x65F6;&#x5F53;&#x505A;&#x4E2D;&#x95F4;&#x4FDD;&#x5B58;&#x683C;&#x5F0F;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x4ECE;&#x4E00;&#x4E2A; IM &#x547D;&#x4EE4;&#x5411;&#x53E6;&#x4E00;&#x4E2A; IM &#x547D;&#x4EE4;&#x4F20;&#x9012;&#x56FE;&#x50CF;&#x5143;&#x6570;&#x636E;&#x548C;&#x5176;&#x4ED6;&#x5173;&#x8054;&#x5C5E;&#x6027;&#x3002;</li>
<li>
<code>-</code> &#x5728;&#x7BA1;&#x9053;&#x7B26;&#x524D;&#x9762;&#x610F;&#x4E3A;&#x5C06; IM &#x547D;&#x4EE4;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x4F5C;&#x4E3A;&#x6807;&#x51C6;&#x8F93;&#x51FA;&#xFF0C;&#x5728;&#x7BA1;&#x9053;&#x7B26;&#x540E;&#x9762;&#x5219;&#x8868;&#x793A;&#x4ECE;&#x6807;&#x51C6;&#x8F93;&#x5165;&#x4E2D;&#x8BFB;&#x53D6;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x5728;&#x7BA1;&#x9053;&#x7B26;&#x540E;&#x9762;&#x7684; <code>composite</code> &#x4E2D;&#x4F7F;&#x7528; <code>-</code> &#x8BFB;&#x53D6;&#x521A;&#x521A;&#x751F;&#x6210;&#x7684;&#x900F;&#x660E;&#x56FE;&#x50CF;&#x3002;</li>
</ul>
</li>
<li>
<code>|</code>&#xFF1A;<code>Linux shell</code> &#x7BA1;&#x9053;&#x7B26;&#xFF0C;&#x7528;&#x4E8E;&#x5C06;&#x4E0A;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x7684;&#x6807;&#x51C6;&#x8F93;&#x51FA;&#x4F20;&#x9012;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x4F5C;&#x4E3A;&#x6807;&#x51C6;&#x8F93;&#x5165;&#x3002;&#x8FD9;&#x91CC;&#x5C06;&#x751F;&#x6210;&#x7684;&#x6C34;&#x5370;&#x56FE;&#x6848;&#x4F20;&#x9012;&#x7ED9; <code>composite</code> &#x547D;&#x4EE4;&#x3002;</li>
<li>
<code>-tile</code>&#xFF1A;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x8BA9;&#x56FE;&#x6848;&#x5E73;&#x94FA;&#x3002;</li>
<li>
<code>-dissolve</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x5E73;&#x94FA;&#x56FE;&#x6848;&#x7684;&#x900F;&#x660E;&#x5EA6;&#x3002;</li>
</ul>
<p>&#x56FE;&#x91CA;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbauxu?w=1705&amp;h=528" src="https://static.alili.tech/img/bVbauxu?w=1705&amp;h=528" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">3&#x3001;&#x7ED8;&#x5236;&#x9A8C;&#x8BC1;&#x7801;</h3>
<p>&#x5927;&#x6982;&#x903B;&#x8F91;&#x5982;&#x4E0B;&#xFF1A;</p>
<ol>
<li>&#x968F;&#x673A;&#x751F;&#x6210; <code>4</code> &#x4E2A;&#x82F1;&#x6587;&#x5B57;&#x6BCD;&#x6216;&#x6570;&#x5B57;&#x3002;</li>
<li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BBD;&#x9AD8; <code>100x40</code> &#x7684;&#x753B;&#x5E03;&#x3002;</li>
<li>&#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#x4E3A; <code>16</code>&#xFF0C;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x5BBD;&#x9AD8;&#x4E5F;&#x5C31;&#x662F; <code>16</code> &#x5DE6;&#x53F3;&#x4E86;&#xFF0C;&#x4F9D;&#x6B21;&#x8BA1;&#x7B97;&#x51FA;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x7684; <code>x, y</code> &#x5750;&#x6807;&#xFF0C;&#x518D;&#x589E;&#x52A0;&#x4E00;&#x4E01;&#x70B9;&#x65CB;&#x8F6C;&#x3002;</li>
<li>&#x968F;&#x673A;&#x521B;&#x5EFA;&#x4E00;&#x6761;&#x900F;&#x660E;&#x66F2;&#x7EBF;&#xFF0C;&#x52A0;&#x4E0A;&#x566A;&#x70B9;&#xFF0C;&#x589E;&#x52A0;&#x56FE;&#x7247;&#x88AB;&#x7834;&#x89E3;&#x7684;&#x96BE;&#x5EA6;&#xFF08;&#x5728;&#x4FDD;&#x8BC1;&#x8089;&#x773C;&#x80FD;&#x770B;&#x5F97;&#x6E05;&#x695A;&#x7684;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x4E0B;&#xFF09;&#x3002;</li>
<li>&#x5982;&#x679C;&#x9700;&#x8981;&#x5B89;&#x5168;&#x6027;&#x66F4;&#x9AD8;&#x7684;&#x9A8C;&#x8BC1;&#x7801;&#xFF0C;&#x8BF7;&#x4E86;&#x89E3;&#x9A8C;&#x8BC1;&#x7801;&#x7834;&#x89E3;&#x539F;&#x7406;&#x5E76;&#x505A;&#x5408;&#x7406;&#x8C03;&#x6574;&#x3002;</li>
</ol>
<p>&#x5982;&#x679C;&#x52A0;&#x4E0A;&#x968F;&#x673A;&#x8BA1;&#x7B97;&#xFF0C;&#x53EF;&#x80FD;&#x4EE3;&#x7801;&#x4F1A;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x5199;&#x6210;&#x56FA;&#x5B9A;&#x503C;&#xFF0C;&#x65B9;&#x4FBF;&#x7406;&#x89E3;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  &apos;xc:[100x40!]&apos;  -pointsize 20  -font &apos;cochin.ttc&apos;  \
-gravity NorthWest  -strokewidth 1  \
-fill &apos;#b72b36&apos;  -stroke &apos;#b72b36&apos;  -draw &apos;translate 13,19  rotate 10  text -5,-8 &quot;5&quot;&apos;  \
-fill &apos;#821d70&apos;  -stroke &apos;#821d70&apos;  -draw &apos;translate 36,13  rotate -8  text -8,-8 &quot;C&quot;&apos;  \
-fill &apos;#c7960a&apos;  -stroke &apos;#c7960a&apos;  -draw &apos;translate 60,23  rotate 5   text -5,-8 &quot;2&quot;&apos;  \
-fill &apos;#03610a&apos;  -stroke &apos;#03610a&apos;  -draw &apos;translate 85,25  rotate 13  text -8,-8 &quot;E&quot;&apos;  \
-strokewidth 2  -stroke &apos;rgba(248, 100, 30, 0.5)&apos;  -fill &apos;rgba(0, 0, 0, 0)&apos;  \
-draw &apos;bezier  -20,30  -16,10  20,2    50,20&apos;  \
-draw &apos;bezier  50,20   78,42   138,36  140,16&apos;  \
+noise Impulse  \
captcha.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs processing"><code>convert  <span class="hljs-string">&apos;xc:[100x40!]&apos;</span>  -pointsize <span class="hljs-number">20</span>  -font <span class="hljs-string">&apos;cochin.ttc&apos;</span>  \
-gravity NorthWest  -strokewidth <span class="hljs-number">1</span>  \
-<span class="hljs-built_in">fill</span> <span class="hljs-string">&apos;#b72b36&apos;</span>  -<span class="hljs-built_in">stroke</span> <span class="hljs-string">&apos;#b72b36&apos;</span>  -<span class="hljs-title">draw</span> <span class="hljs-string">&apos;translate 13,19  rotate 10  text -5,-8 &quot;5&quot;&apos;</span>  \
-<span class="hljs-built_in">fill</span> <span class="hljs-string">&apos;#821d70&apos;</span>  -<span class="hljs-built_in">stroke</span> <span class="hljs-string">&apos;#821d70&apos;</span>  -<span class="hljs-title">draw</span> <span class="hljs-string">&apos;translate 36,13  rotate -8  text -8,-8 &quot;C&quot;&apos;</span>  \
-<span class="hljs-built_in">fill</span> <span class="hljs-string">&apos;#c7960a&apos;</span>  -<span class="hljs-built_in">stroke</span> <span class="hljs-string">&apos;#c7960a&apos;</span>  -<span class="hljs-title">draw</span> <span class="hljs-string">&apos;translate 60,23  rotate 5   text -5,-8 &quot;2&quot;&apos;</span>  \
-<span class="hljs-built_in">fill</span> <span class="hljs-string">&apos;#03610a&apos;</span>  -<span class="hljs-built_in">stroke</span> <span class="hljs-string">&apos;#03610a&apos;</span>  -<span class="hljs-title">draw</span> <span class="hljs-string">&apos;translate 85,25  rotate 13  text -8,-8 &quot;E&quot;&apos;</span>  \
-strokewidth <span class="hljs-number">2</span>  -<span class="hljs-built_in">stroke</span> <span class="hljs-string">&apos;rgba(248, 100, 30, 0.5)&apos;</span>  -<span class="hljs-built_in">fill</span> <span class="hljs-string">&apos;rgba(0, 0, 0, 0)&apos;</span>  \
-<span class="hljs-title">draw</span> <span class="hljs-string">&apos;bezier  -20,30  -16,10  20,2    50,20&apos;</span>  \
-<span class="hljs-title">draw</span> <span class="hljs-string">&apos;bezier  50,20   78,42   138,36  140,16&apos;</span>  \
+<span class="hljs-built_in">noise</span> Impulse  \
captcha.jpg</code></pre>
<p>&#x7ED3;&#x679C;&#xFF1A;<span class="img-wrap"><img data-src="/img/bVba2Y0?w=100&amp;h=40" src="https://static.alili.tech/img/bVba2Y0?w=100&amp;h=40" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p>&#x9274;&#x4E8E;&#x5B57;&#x4F53;&#x6BD4;&#x8F83;&#x7EC6;&#xFF0C;&#x53EF;&#x4EE5;&#x7528; <code>strokewidth</code> &#x52A0;&#x8FB9;&#x6846;&#x6765;&#x52A0;&#x7C97;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528;&#x5B57;&#x4F53;&#x7684;&#x7C97;&#x4F53;&#x7248;&#x672C;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p>
<p>&#x89E3;&#x91CA;&#xFF1A;</p>
<ul>
<li>
<code>xc:[100x40!]</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x753B;&#x5E03;&#x5927;&#x5C0F;&#x7684;&#x4E00;&#x79CD;&#x7B80;&#x5199;&#x65B9;&#x5F0F;&#xFF0C;&#x65B9;&#x62EC;&#x53F7;&#x91CC;&#x5199;&#x5165;&#x753B;&#x5E03;&#x5BBD;&#x9AD8;&#xFF0C;&#x6CE8;&#x610F;&#x8981;&#x52A0; <code>!</code>&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x4E4E;&#x610F;&#x6599;&#x54DF;&#x3002;</li>
<li>
<p><code>&#x6587;&#x672C;&#x5B9A;&#x4F4D;&#x4E0E;&#x65CB;&#x8F6C;</code></p>
<ol>
<li>&#x753B;&#x5E03;&#x5BBD; <code>100px</code>&#xFF0C;&#x5E73;&#x5747;&#x5206;&#x6210; <code>4</code> &#x5206;&#xFF0C;&#x6BCF;&#x4EFD; <code>25px</code>, &#x6587;&#x5B57;&#x5BBD; <code>16px</code>, &#x5F97;&#x6587;&#x5B57; <code>x</code> &#x7684;&#x5750;&#x6807;&#x5DE6;&#x53F3;&#x6446;&#x52A8;&#x8303;&#x56F4;&#x4E3A; <code>+0px, +9px</code>&#xFF0C;<code>y</code> &#x5750;&#x6807;&#x540C;&#x7406;&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E; <code>translate</code> &#x503C;&#x3002;</li>
<li>&#x5B9E;&#x9645;&#x4E0A;&#x5B57;&#x4F53;&#x672C;&#x8EAB;&#x5E76;&#x6CA1;&#x6709;&#x586B;&#x5145;&#x6EE1;&#x6574;&#x4E2A; <code>16x16</code> &#x7684;&#x533A;&#x57DF;&#xFF0C;&#x6839;&#x636E;&#x5B57;&#x4F53;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x586B;&#x6EE1;&#x7684;&#x533A;&#x57DF;&#x53EF;&#x80FD;&#x5404;&#x6709;&#x4E0D;&#x540C;&#xFF0C;&#x6240;&#x4EE5;&#x6839;&#x636E;<code>cochin</code> &#x5B57;&#x4F53;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4E0A;&#x9762;&#x7A0D;&#x5FAE;&#x5C06;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#x8C03;&#x6574;&#x4E3A; <code>20</code>&#xFF0C;&#x5B9E;&#x9645;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x5B57;&#x6BCD;&#x624D;&#x662F; <code>16x16</code> &#x5DE6;&#x53F3;&#x5927;&#x5C0F;&#xFF0C;&#x6570;&#x5B57;&#x5927;&#x6982;&#x662F; <code>10x16</code>&#xFF0C;&#x6240;&#x4EE5;&#x8BBE;&#x7F6E;&#x6570;&#x5B57;&#x7684; <code>x,y</code> &#x4E3A; <code>-5,-8</code>&#xFF0C;&#x7ED3;&#x5408;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x89E3;&#x91CA; <code>x,y</code> &#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x5F0F;&#x3002;</li>
<li>
<code>translate</code>: &#x8BBE;&#x7F6E;&#x6587;&#x672C;&#x7684;&#x6A2A;&#x7EB5;&#x5411;&#x504F;&#x79FB;&#x503C;&#x3002;</li>
<li>
<code>rotate</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x6587;&#x672C;&#x65CB;&#x8F6C;&#xFF0C;&#x5355;&#x4F4D; <code>degrees</code>&#x3002;&#x6839;&#x636E; <code>gravity</code> &#x7684;&#x8BBE;&#x7F6E;&#x5750;&#x6807;&#x7CFB;&#x7EDF;&#x6709;&#x4E00;&#x4E01;&#x70B9;&#x53D8;&#x5316;&#xFF0C;&#x6240;&#x4EE5;&#x8BF7;&#x8BBE;&#x7F6E;&#x4E3A; <code>&#x897F;&#x5317;(NorthWest)</code> &#xFF0C;&#x8868;&#x793A;&#x4EE5;&#x753B;&#x5E03; <code>0,0</code> &#x5750;&#x6807;&#x65CB;&#x8F6C;&#xFF0C;&#x8DDF; <code>HTML 5 Canvas</code> &#x5750;&#x6807;&#x7CFB;&#x7EDF;&#x4E00;&#x81F4;&#x3002;</li>
<li>&#x6839;&#x636E;&#x8FD9;&#x6837;&#x7684;&#x5750;&#x6807;&#x7CFB;&#x7EDF;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x6587;&#x5B57;&#x6309;&#x81EA;&#x8EAB;&#x7684;&#x4E2D;&#x5FC3;&#x65CB;&#x8F6C;&#xFF0C;&#x5F97;&#x914D;&#x5408; <code>translate</code> &#x548C; <code>text</code> &#x7684; <code>x,y</code> &#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x539F;&#x7406;&#x53EF;&#x53C2;&#x8003;<a href="https://aotu.io/notes/2017/05/25/canvas-img-rotate-and-flip/index.html" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;[&#x56FE;&#x50CF;&#x65CB;&#x8F6C;&#x7684;&#x5B9E;&#x73B0;]</a>&#xFF0C;&#x6CE8;&#x610F; <code>translate</code> &#x4E0E; <code>rotate</code> &#x7684;&#x987A;&#x5E8F;&#x3002;</li>
</ol>
</li>
<li>
<code>strokewidth</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x6587;&#x672C;&#x7684;&#x8FB9;&#x6846;&#x5BBD;&#x5EA6;&#x6216;&#x7EBF;&#x6761;&#x5BBD;&#x5EA6;&#x3002;</li>
<li>
<code>stroke</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x6587;&#x672C;&#x7684;&#x8FB9;&#x6846;&#x989C;&#x8272;&#x6216;&#x7EBF;&#x6761;&#x989C;&#x8272;&#x3002;</li>
<li>
<code>-fill &apos;rgba(0, 0, 0, 0)&apos;</code>&#xFF1A;&#x4E0A;&#x9762;&#x8BBE;&#x7F6E;&#x4E86;&#x6587;&#x672C;&#x7684;&#x586B;&#x5145;&#x989C;&#x8272;&#xFF0C;&#x4F1A;&#x5F71;&#x54CD;&#x4E0B;&#x9762;&#x7684;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x900F;&#x660E;&#x7684;&#x586B;&#x5145;&#x8272;&#x4EE5;&#x8986;&#x76D6;&#x4E0A;&#x9762;&#x7684;&#x8BBE;&#x5B9A;&#xFF0C;&#x4F7F;&#x66F2;&#x7EBF;&#x6CA1;&#x6709;&#x586B;&#x5145;&#x3002;</li>
<li>
<code>bezier</code>&#xFF1A;&#x7ED8;&#x5236;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#xFF0C;&#x4E00;&#x4E24;&#x53E5;&#x8BDD;&#x6211;&#x6015;&#x89E3;&#x91CA;&#x4E0D;&#x6E05;&#x695A;&#xFF0C;&#x6240;&#x4EE5;&#x8BF7;&#x5927;&#x5BB6;&#x53C2;&#x8003;&#x4E00;&#x4E0B;<a href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve" rel="nofollow noreferrer" target="_blank">&#x7EF4;&#x57FA;&#x767E;&#x79D1;&#x7684;&#x89E3;&#x91CA;</a>&#x6216;&#x8005;<a href="http://www.html-js.com/article/1628" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x4E2D;&#x6587;&#x6587;&#x7AE0;&#x7684;&#x89E3;&#x91CA;</a>&#xFF0C;&#x6700;&#x540E;&#x518D;&#x53C2;&#x8003;&#x4E00;&#x4E0B; <a href="https://www.imagemagick.org/Usage/draw/#bezier" rel="nofollow noreferrer" target="_blank">IM &#x5B98;&#x65B9;&#x793A;&#x4F8B;&#x7684;&#x63CF;&#x8FF0;</a>&#x3002;&#x4E0A;&#x9762;&#x4E24;&#x6761;&#x4E09;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x7684;&#x5750;&#x6807;&#x5206;&#x522B;&#x8868;&#x793A; <code>&#x8D77;&#x59CB;&#x70B9;</code>&#xFF0C;<code>&#x8D77;&#x59CB;&#x70B9;&#x7684;&#x63A7;&#x5236;&#x70B9;</code>&#xFF0C;<code>&#x7ED3;&#x675F;&#x70B9;&#x7684;&#x63A7;&#x5236;&#x70B9;</code>&#xFF0C;<code>&#x7ED3;&#x675F;&#x70B9;</code>&#x3002;</li>
<li>
<code>+noise</code>&#xFF1A;&#x589E;&#x52A0;&#x566A;&#x70B9;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>convert -list noise</code> &#x67E5;&#x770B;&#x5F53;&#x524D;&#x7CFB;&#x7EDF;&#x652F;&#x6301;&#x54EA;&#x4E9B;&#x7B97;&#x6CD5;&#x7684;&#x566A;&#x70B9;&#xFF0C;&#x5927;&#x6982;&#x6709; <code>Gaussian, Impulse, Laplacian, Multiplicative, Poisson, Random, Uniform</code>&#x3002;</li>
</ul>
<h3 id="articleHeader9">4&#x3001;&#x514B;&#x9686;&#x53CA;&#x62FC;&#x5408;&#x56FE;&#x50CF;</h3>
<blockquote>&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;&#x4E3B;&#x8981;&#x4E86;&#x89E3;&#x51E0;&#x4E2A;&#x57FA;&#x672C;&#x64CD;&#x4F5C;&#x7684; <code>API</code>&#x3002;</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  \
\(  -crop 300x300+10+25  joy.jpg  \)  \
\(  -resize 400x400  -crop 300x300+50+0  logo:  \)  -swap 0,1  +append  \
\(  -clone 0  -flop  -flip  \)  -append  \
-resize 200x200  combined.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livescript"><code>convert  <span class="hljs-string">\</span>
<span class="hljs-string">\(</span>  -crop <span class="hljs-number">300x</span>300+<span class="hljs-number">10</span>+<span class="hljs-number">25</span>  joy.jpg  <span class="hljs-string">\)</span>  <span class="hljs-string">\</span>
<span class="hljs-string">\(</span>  -resize <span class="hljs-number">400x</span>400  -crop <span class="hljs-number">300x</span>300+<span class="hljs-number">50</span>+<span class="hljs-number">0</span>  logo:  <span class="hljs-string">\)</span>  -swap <span class="hljs-number">0</span>,<span class="hljs-number">1</span>  +append  <span class="hljs-string">\</span>
<span class="hljs-string">\(</span>  -clone <span class="hljs-number">0</span>  -flop  -flip  <span class="hljs-string">\)</span>  -append  <span class="hljs-string">\</span>
-resize <span class="hljs-number">200x</span>200  combined.jpg</code></pre>
<p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbg93?w=300&amp;h=300" src="https://static.alili.tech/img/bVbbg93?w=300&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x89E3;&#x91CA;&#xFF1A;</p>
<ul>
<li>
<code>&#x5706;&#x62EC;&#x53F7; \( ... \)</code>&#xFF1A;&#x56FE;&#x50CF;&#x5806;&#x6808; ( <code>image stack</code> )&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x4F5C;&#x7528;&#x57DF;&#x5904;&#x7406;&#x56FE;&#x50CF;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x4F7F;&#x56FE;&#x50CF;&#x4E4B;&#x524D;&#x7684;&#x5904;&#x7406;&#x4E92;&#x4E0D;&#x5E72;&#x6270;&#x3002;&#x5706;&#x62EC;&#x53F7;&#x9700;&#x7528;&#x53CD;&#x659C;&#x6760;&#x8F6C;&#x4E49;&#xFF0C;&#x624D;&#x80FD;&#x4E0D;&#x88AB; <code>Shell</code> &#x5F53;&#x505A;&#x7279;&#x6B8A;&#x5B57;&#x7B26;&#x5904;&#x7406;&#xFF0C;&#x5E76;&#x4E14;<code>&#x6BCF;&#x4E2A;&#x5706;&#x62EC;&#x53F7;&#x4E24;&#x8FB9;&#x9700;&#x8981;&#x7528;&#x7A7A;&#x683C;&#x9694;&#x5F00;</code>&#x3002;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5706;&#x62EC;&#x53F7;&#x4F1A;&#x4F7F; <code>IM</code> &#x589E;&#x52A0;&#x5C11;&#x8BB8;&#x989D;&#x5916;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x4F46;&#x662F;&#x5374;&#x8BA9;&#x547D;&#x4EE4;&#x66F4;&#x6E05;&#x6670;&#x4E0D;&#x5BB9;&#x6613;&#x51FA;&#x9519;&#x3002;</li>
<li>
<code>-crop</code>&#xFF1A;&#x88C1;&#x526A;&#x51FA;&#x56FE;&#x50CF;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x77E9;&#x5F62;&#x533A;&#x57DF;&#xFF0C;&#x683C;&#x5F0F;&#x4E3A; <code>{size}{+-}x{+-}y</code>&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x6307;&#x5B9A;&#x504F;&#x79FB;&#x503C; <code>x,y</code>&#xFF0C;&#x5219;&#x4F1A;&#x88AB;&#x89E3;&#x91CA;&#x4E3A;&#x6309;&#x6307;&#x5B9A;&#x5BBD;&#x9AD8;&#x5207;&#x5272;&#x56FE;&#x50CF;&#x6210;&#x591A;&#x5C11;&#x4EFD;&#xFF08;&#x591A;&#x56FE;&#x50CF;&#xFF09;&#x3002;</li>
<li>
<code>logo:</code>&#xFF1A;<code>IM</code> &#x5185;&#x7F6E;&#x56FE;&#x50CF;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x4E0A;&#x56FE;&#x4E2D;&#x62FF;&#x7740;&#x9B54;&#x6CD5;&#x68D2;&#x7684;&#x4E3B;&#x4EBA;&#x516C;&#x4E86;&#xFF0C;&#x672C;&#x8EAB;&#x5BBD;&#x9AD8; <code>640x480</code>&#xFF0C;&#x5176;&#x4ED6;&#x5185;&#x7F6E;&#x56FE;&#x50CF;&#x8FD8;&#x6709;&#xFF1A;<code>rose:</code>&#xFF0C;<code>granite :</code>&#x7B49;&#xFF0C;<a href="https://www.imagemagick.org/script/formats.php#builtin-images" rel="nofollow noreferrer" target="_blank">&#x770B;&#x8FD9;&#x91CC;</a>&#x3002;</li>
<li>
<p><code>-swap</code>&#xFF1A;</p>
<ol>
<li>&#x4EA4;&#x6362;&#x56FE;&#x50CF;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x683C;&#x5F0F; <code>-swap index,index</code>&#x3002;</li>
<li>
<code>IM</code> &#x5728;&#x56FE;&#x50CF;&#x5904;&#x7406;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5F88;&#x53EF;&#x80FD;&#x662F;&#x5728;&#x5904;&#x7406;&#x4E00;&#x4E2A;&#x56FE;&#x50CF;&#x5217;&#x8868;&#xFF0C;&#x5F53;&#x65B0;&#x56FE;&#x50CF;&#x88AB;&#x8BFB;&#x5165;&#x6216;&#x8005;&#x521B;&#x5EFA;&#x65F6;&#xFF0C;<code>IM</code> &#x4F1A;&#x5C06;&#x8BE5;&#x65B0;&#x56FE;&#x50CF;&#x6DFB;&#x52A0;&#x5230;&#x5F53;&#x524D;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x7684;&#x672B;&#x5C3E;&#x3002;</li>
<li>&#x5982;&#x4E0A;&#xFF0C;&#x672C;&#x6765;&#x6211;&#x4EEC;&#x7684;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x91CC;&#x6709; <code>2</code> &#x5F20;&#x56FE;&#xFF0C;&#x7B2C;&#x4E00;&#x5F20;&#x662F; <code>joy</code>&#xFF0C;&#x4F46;&#x662F; <code>-swap 0,1</code> &#x7684;&#x610F;&#x601D;&#x662F;&#x4EA4;&#x6362;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x4E0E;&#x7B2C;&#x4E8C;&#x5F20;&#x56FE;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5; <code>joy</code> &#x53D8;&#x6210;&#x8DD1;&#x5230;&#x540E;&#x9762;&#x4E86;&#x3002;</li>
</ol>
</li>
<li>
<code>+append</code>&#xFF1A;&#x6C34;&#x5E73;&#x8FDE;&#x63A5;&#x5F53;&#x524D;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x7684;&#x56FE;&#x50CF;&#x6765;&#x521B;&#x5EFA;&#x5355;&#x4E2A;&#x8F83;&#x957F;&#x7684;&#x56FE;&#x50CF;&#x3002;</li>
<li>
<code>-append</code>&#xFF1A;&#x5782;&#x76F4;&#x8FDE;&#x63A5;&#x5F53;&#x524D;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x7684;&#x56FE;&#x50CF;&#x6765;&#x521B;&#x5EFA;&#x5355;&#x4E2A;&#x8F83;&#x957F;&#x7684;&#x56FE;&#x50CF;&#x3002;</li>
<li>
<p><code>-clone</code>&#xFF1A;&#x514B;&#x9686;&#x56FE;&#x50CF;&#xFF0C;&#x683C;&#x5F0F;&#x4E3A; <code>-clone {index_range_list}</code>&#x3002;</p>
<ul>
<li>
<code>-clone 0</code>&#xFF1A;&#x8868;&#x793A;&#x514B;&#x9686;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x91CC;&#x7684;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x50CF;&#x3002;</li>
<li>
<code>-clone 1-2</code>&#xFF1A;&#x8868;&#x793A;&#x514B;&#x9686;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x91CC;&#x7684;&#x7B2C;&#x4E8C;&#x5F20;&#x5230;&#x7B2C;&#x4E09;&#x5F20;&#x56FE;&#x50CF;&#x3002;</li>
<li>
<code>-clone 0--1</code>&#xFF1A;<code>0</code> &#x8868;&#x793A;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x50CF;&#xFF0C;<code>-1</code> &#x8868;&#x793A;&#x6700;&#x540E;&#x4E00;&#x5F20;&#x56FE;&#x50CF;&#xFF0C;&#x6240;&#x4EE5;&#x6574;&#x53E5;&#x547D;&#x4EE4;&#x5219;&#x8868;&#x793A;&#x514B;&#x9686;&#x6574;&#x4E2A;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x3002;</li>
<li>
<code>-clone 2,0,1</code>&#xFF1A;&#x8868;&#x793A;&#x514B;&#x9686;&#x7B2C;&#x4E09;&#x5F20;&#xFF0C;&#x7B2C;&#x4E00;&#x5F20;&#xFF0C;&#x7B2C;&#x4E8C;&#x5F20;&#x56FE;&#x50CF;&#xFF0C;&#x987A;&#x5E8F;&#x6839;&#x636E;&#x6307;&#x5B9A;&#x7684;&#x7D22;&#x5F15;&#x51B3;&#x5B9A;&#xFF0C;&#x7528;&#x9017;&#x53F7;&#x5206;&#x9694;&#x3002;</li>
</ul>
</li>
<li>
<code>-flop</code>&#xFF1A;&#x5C06;&#x56FE;&#x50CF;&#x6C34;&#x5E73;&#x7FFB;&#x8F6C;&#x3002;</li>
<li>
<code>-flip</code>&#xFF1A;&#x5C06;&#x56FE;&#x50CF;&#x5782;&#x76F4;&#x7FFB;&#x8F6C;&#x3002;</li>
</ul>
<p><code>&#x7B14;&#x8BB0;&#xFF1A;</code></p>
<ol>
<li>&#x9009;&#x9879;&#x4E4B;&#x95F4;&#x7684;&#x987A;&#x5E8F;&#x5F88;&#x91CD;&#x8981;&#x3002;</li>
<li>&#x4E0E; <code>-clone</code> &#x96F7;&#x540C;&#x7684;&#x9009;&#x9879;&#x8FD8;&#x6709;&#x8BF8;&#x5982;&#xFF1A;<code>-delete, -insert, -reverse, -duplicate</code>&#xFF0C;&#x7528;&#x4E8E;&#x64CD;&#x4F5C;&#x56FE;&#x50CF;&#x5217;&#x8868;&#xFF0C;&#x529F;&#x80FD;&#x4E0E;&#x5355;&#x8BCD;&#x610F;&#x601D;&#x76F8;&#x540C;&#x3002;</li>
</ol>
<h3 id="articleHeader10">5&#x3001;GIF &#x4E0E;&#x56FE;&#x7247;&#x4E92;&#x8F6C;</h3>
<h4>5.1&#x3001;GIF &#x8F6C;&#x56FE;&#x7247;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -coalesce  rain.gif  frame.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">convert</span>  <span class="hljs-selector-tag">-coalesce</span>  <span class="hljs-selector-tag">rain</span><span class="hljs-selector-class">.gif</span>  <span class="hljs-selector-tag">frame</span><span class="hljs-selector-class">.jpg</span></code></pre>
<p><code>-coalesce</code>&#xFF1A;&#x6839;&#x636E;&#x56FE;&#x50CF; <code>-dispose</code> &#x5143;&#x6570;&#x636E;&#x7684;&#x8BBE;&#x7F6E;&#x8986;&#x76D6;&#x56FE;&#x50CF;&#x5E8F;&#x5217;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x56FE;&#x50CF;&#xFF0C;&#x4EE5;&#x91CD;&#x73B0;&#x52A8;&#x753B;&#x5E8F;&#x5217;&#x4E2D;&#x6BCF;&#x4E2A;&#x70B9;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;&#x4E0B;&#x9762;&#x7528;&#x4E00;&#x5F20;&#x7ED3;&#x679C;&#x5BF9;&#x6BD4;&#x56FE;&#x6765;&#x89E3;&#x91CA;&#x8FD9;&#x53E5;&#x8BDD;&#x3002;</p>
<p>&#x539F;&#x59CB;&#x56FE; ( rain.gif ) &#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbJDb?w=500&amp;h=268" src="https://static.alili.tech/img/bVbbJDb?w=500&amp;h=268" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p>&#x7ED3;&#x679C;&#x5BF9;&#x6BD4;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbJEe?w=1349&amp;h=1346" src="https://static.alili.tech/img/bVbbJEe?w=1349&amp;h=1346" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<h4>5.2&#x3001;&#x5B9A;&#x4E49;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;</h4>
<p>&#x4E0A;&#x9762;&#x9ED8;&#x8BA4;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x4E3A;&#xFF1A;<code>frame-0.jpg, frame-1.jpg, frame-2.jpg ...</code>&#xFF0C;<br>&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;&#x4E0B;&#x5212;&#x7EBF;&#x4F5C;&#x4E3A;&#x7B26;&#x53F7;&#xFF0C;&#x8F93;&#x51FA;&#x4E3A; <code>frame_0.jpg, frame_1.jpg, frame_2.jpg ...</code>&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x5982;&#x4E0B;&#x8BBE;&#x7F6E;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -coalesce  rain.gif  frame_%d.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">convert</span>  <span class="hljs-selector-tag">-coalesce</span>  <span class="hljs-selector-tag">rain</span><span class="hljs-selector-class">.gif</span>  <span class="hljs-selector-tag">frame_</span>%<span class="hljs-selector-tag">d</span><span class="hljs-selector-class">.jpg</span></code></pre>
<p>&#x6216;&#x8005;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" convert  -coalesce  -set filename:n &apos;%p&apos;  rain.gif  &apos;frame_%[filename:n].jpg&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-built_in">convert</span>  -coalesce  -<span class="hljs-built_in">set</span> filename:n <span class="hljs-string">&apos;%p&apos;</span>  rain.gif  <span class="hljs-string">&apos;frame_%[filename:n].jpg&apos;</span></code></pre>
<p>&#x89E3;&#x91CA;&#xFF1A;</p>
<ol>
<li>&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F; <code>%d</code> &#x662F; <code>C</code> &#x8BED;&#x8A00; <code>printf()</code> &#x4E2D;&#x8868;&#x793A;&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#xFF0C;&#x53C2;&#x8003; <a href="https://www.imagemagick.org/script/command-line-options.php?#adjoin" rel="nofollow noreferrer" target="_blank">-adjoin</a> &#x9009;&#x9879;&#x3002;</li>
<li>
<p>&#x7B2C;&#x4E8C;&#x79CD;&#x4E3A;&#x5E38;&#x89C4;&#x65B9;&#x5F0F;&#x3002;</p>
<ul>
<li>
<code>-set</code>&#xFF1A;&#x8BBE;&#x7F6E;&#x56FE;&#x50CF;&#x5C5E;&#x6027;&#xFF0C;&#x683C;&#x5F0F;&#x4E3A; <code>-set key value</code>
</li>
<li>
<code>filename:n &apos;%p&apos;</code>&#xFF1A;&#x4EE5; <code>filename:</code> &#x5F00;&#x5934;&#x7684; <code>key</code> &#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;&#x7684;&#x76F8;&#x5173;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x8FD9;&#x91CC;&#x4F7F;&#x7528; <code>filename:n</code>&#xFF0C;&#x5728;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;&#x65F6;&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>%[filename:n]</code> &#x62FF;&#x5230;&#x521A;&#x521A;&#x7684;&#x8BBE;&#x7F6E;&#xFF0C;&#x800C;&#x8BBE;&#x7F6E;&#x7684;&#x5185;&#x5BB9;&#x5219;&#x662F; <code>&apos;%p&apos;</code>&#x3002;<code>&apos;%p&apos;</code> &#x8868;&#x793A;&#x56FE;&#x50CF;&#x5728;&#x56FE;&#x50CF;&#x5217;&#x8868;&#x4E2D;&#x7684;&#x7D22;&#x5F15;&#x503C;&#xFF0C;&#x66F4;&#x591A;<a href="http://imagemagick.org/script/escape.php" rel="nofollow noreferrer" target="_blank">&#x767E;&#x5206;&#x6BD4;&#x9009;&#x9879; ( Percent Escapes )</a> &#x53C2;&#x8003;&#x3002;</li>
</ul>
</li>
</ol>
<h4>5.3&#x3001;&#x89E3;&#x6790;&#x7279;&#x5B9A;&#x5E27;</h4>
<p>&#x5982;&#x679C;&#x53EA;&#x60F3;&#x62FF;&#x5230; GIF &#x7684;&#x7B2C;&#x4E00;&#x5E27;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -coalesce  &apos;rain.gif[0]&apos;  first_frame.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">convert</span>  -coalesce  <span class="hljs-string">&apos;rain.gif[0]&apos;</span>  first_frame.jpg</code></pre>
<p>&#x62FF;&#x5230;&#x67D0;&#x4E9B;&#x5E27;&#xFF0C;&#x5982;&#x540C; <code>-clone</code> &#x7684;&#x5199;&#x6CD5;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -coalesce  &apos;rain.gif[0-2]&apos;  some_frames_%d.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">convert  -coalesce  <span class="hljs-string">&apos;rain.gif[0-2]&apos;</span>  some_frames_%d.jpg</code></pre>
<h4>5.4&#x3001;&#x83B7;&#x53D6;&#x9875;&#x6570;</h4>
<p>&#x901A;&#x8FC7; <code>identify</code> &#x547D;&#x4EE4;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7B80;&#x8981;&#x5F97;&#x5230;&#x6587;&#x4EF6;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x4E0B;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="identify  rain.gif" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">identify</span>  <span class="hljs-selector-tag">rain</span><span class="hljs-selector-class">.gif</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbJ0z?w=627&amp;h=233" src="https://static.alili.tech/img/bVbbJ0z?w=627&amp;h=233" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x901A;&#x8FC7;&#x6362;&#x884C;&#x7B26;&#x5206;&#x5272;&#xFF0C;&#x7B80;&#x5355;&#x5C01;&#x88C5;&#x4E00;&#x4E2A; <code>Node.js</code> &#x51FD;&#x6570;&#x83B7;&#x53D6;&#x9875;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parser.js
const util = require(&apos;util&apos;)
const exec = util.promisify(require(&apos;child_process&apos;).exec)

exports.numberOfPages = async (filePath) =&gt; {
  try {
    const { stdout } = await exec(`identify &apos;${filePath}&apos;`)
    return stdout.trim().split(&apos;\n&apos;).length
  } catch (err) {
    throw new Error(err)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// parser.js</span>
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)
<span class="hljs-keyword">const</span> exec = util.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;child_process&apos;</span>).exec)

exports.numberOfPages = <span class="hljs-keyword">async</span> (filePath) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> { stdout } = <span class="hljs-keyword">await</span> exec(<span class="hljs-string">`identify &apos;<span class="hljs-subst">${filePath}</span>&apos;`</span>)
    <span class="hljs-keyword">return</span> stdout.trim().split(<span class="hljs-string">&apos;\n&apos;</span>).length
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
const { numberOfPages } = require(&apos;./parser&apos;)

;(async function start () {
  const pages = await numberOfPages(&apos;rain.gif&apos;)
  console.log(&apos;pages:&apos;, pages)
}())" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">const</span> { numberOfPages } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./parser&apos;</span>)

;(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> pages = <span class="hljs-keyword">await</span> numberOfPages(<span class="hljs-string">&apos;rain.gif&apos;</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;pages:&apos;</span>, pages)
}())</code></pre>
<h4>5.5&#x3001;&#x56FE;&#x7247;&#x8F6C; GIF</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -loop 0  &apos;frame-*.jpg&apos;  rain_animation.gif" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">convert  -<span class="hljs-keyword">loop</span> <span class="hljs-number">0</span>  <span class="hljs-symbol">&apos;frame</span>-*.jpg&apos;  rain_animation.gif</code></pre>
<p>&#x5C06;&#x6240;&#x6709;&#x4E0E; <code>frame-*.jpg</code> &#x6A21;&#x5F0F;&#x5339;&#x914D;&#x7684;&#x56FE;&#x50CF;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x5F20; <code>GIF</code> &#x56FE;&#x50CF;&#xFF0C;&#x5982; <code>frame-0.jpg</code>&#xFF0C;<code>frame-1.jpg</code>&#x7B49;&#x3002;<br><code>-loop</code> &#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5FAA;&#x73AF;&#x6B21;&#x6570;&#xFF0C;<code>0</code> &#x8868;&#x793A;&#x65E0;&#x9650;&#x5FAA;&#x73AF;&#x3002;<br>&#x8BBE;&#x7F6E;&#x6BCF;&#x5F20;&#x56FE;&#x50CF;&#x7684;&#x64AD;&#x653E;&#x901F;&#x5EA6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://www.imagemagick.org/Usage/anim_basics/#gif_anim" rel="nofollow noreferrer" target="_blank">-delay</a> &#x9009;&#x9879;&#x3002;</p>
<p><code>&#x7B14;&#x8BB0;&#xFF1A;</code> &#x5728; <code>IM</code> &#x8BFB;&#x53D6;&#x7CFB;&#x5217;&#x6587;&#x4EF6;&#x65F6;&#xFF0C;<code>frame-10.jpg</code> &#x4F1A;&#x6392;&#x5728; <code>frame-2.jpg</code> &#x524D;&#x9762;&#xFF0C;&#x4E3A;&#x83B7;&#x5F97;&#x56FE;&#x50CF;&#x6B63;&#x786E;&#x7684;&#x8BFB;&#x53D6;&#x987A;&#x5E8F;&#xFF0C;&#x53EF;&#x4EE5;&#x4E3A;&#x6587;&#x4EF6;&#x540D;&#x8BBE;&#x7F6E;&#x524D;&#x5BFC;&#x96F6; ( <code>leading zeros</code> )&#x3002;&#x5982;&#xFF1A;<code>frame-000.jpg, frame-001.jpg, frame-002.jpg ... frame-010.jpg</code>&#x3002;</p>
<p>&#x6240;&#x4EE5;&#x5728;&#x751F;&#x6210;&#x56FE;&#x50CF;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>%03d</code> &#x83B7;&#x5F97;&#x4E09;&#x4F4D;&#x524D;&#x5BFC;&#x96F6;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="convert  -coalesce  rain.gif  frame-%03d.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">convert</span>  <span class="hljs-selector-tag">-coalesce</span>  <span class="hljs-selector-tag">rain</span><span class="hljs-selector-class">.gif</span>  <span class="hljs-selector-tag">frame-</span>%03<span class="hljs-selector-tag">d</span><span class="hljs-selector-class">.jpg</span></code></pre>
<h3 id="articleHeader11">6&#x3001;PDF &#x4E0E;&#x56FE;&#x7247;&#x4E92;&#x8F6C;</h3>
<p>PDF &#x4E0E;&#x56FE;&#x7247;&#x4E92;&#x8F6C;&#x8DDF; GIF &#x5F88;&#x76F8;&#x4F3C;&#xFF0C;&#x7A0D;&#x5FAE;&#x6709;&#x4E9B;&#x683C;&#x5F0F;&#x81EA;&#x8EAB;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x533A;&#x522B;&#x3002;<br><code>IM</code> &#x672C;&#x8EAB;&#x662F;&#x4E0D;&#x5177;&#x5907;&#x89E3;&#x6790; PDF &#x7684;&#x529F;&#x80FD;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x4F9D;&#x8D56;&#x4E13;&#x95E8;&#x89E3;&#x6790;&#x8FD9;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x5916;&#x90E8;&#x7A0B;&#x5E8F;&#xFF0C;&#x5982;&#x5B98;&#x65B9;&#x6307;&#x660E;&#x7684; <code>ghostscript</code> &#x89E3;&#x6790;&#x7A0B;&#x5E8F;&#x3002;<br>&#x9996;&#x5148;&#x5B89;&#x88C5; <code>gs</code>&#xFF0C;&#x8FD8;&#x662F;&#x6F14;&#x793A; <code>Mac OS</code> &#x5B89;&#x88C5;&#xFF1A;<code>brew install ghostscript</code>&#x3002;</p>
<p>&#x4EE5; <a href="https://mozilla.github.io/pdf.js/web/viewer.html" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;PDF</a> &#x4E3A;&#x4F8B;&#xFF0C;&#x628A;&#x5B83;&#x8F6C;&#x6362;&#x6210;&#x56FE;&#x7247;&#xFF0C;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x2460; convert  -density 150  -flatten  &apos;download.pdf[0]&apos;  first_page.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">&#x2460; convert  -density <span class="hljs-number">150</span>  -<span class="hljs-keyword">flatten</span>  <span class="hljs-string">&apos;download.pdf[0]&apos;</span>  first_page.jpg</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x2461; convert  -density 150  -background white  -alpha remove  download.pdf  download.jpg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">&#x2461; <span class="hljs-built_in">convert</span>  -density <span class="hljs-number">150</span>  -<span class="hljs-built_in">background</span> white  -alpha <span class="hljs-built_in">remove</span>  download.pdf  download.jpg</code></pre>
<p>&#x89E3;&#x91CA;&#xFF1A;</p>
<ol>
<li>&#x5F53;&#x8F6C;&#x6362; PDF &#x6210; JPG &#x683C;&#x5F0F;&#x56FE;&#x50CF;&#x65F6;&#xFF0C;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x5F97;&#x5230;&#x7684; JPG &#x56FE;&#x7247;&#x4F1A;&#x51FA;&#x73B0;&#x9ED1;&#x8272;&#x80CC;&#x666F;&#xFF08;&#x8F6C;&#x6362;&#x6210; PNG &#x4E0D;&#x4F1A;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>-flatten</code> &#x9009;&#x9879;&#x8BA9;&#x5176;&#x4FDD;&#x6301;&#x767D;&#x8272;&#x80CC;&#x666F;&#xFF0C;&#x4F46;&#x52A0;&#x4E0A;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#xFF0C;<code>&#x591A;&#x9875; PDF &#x4E0D;&#x4F1A;&#x5206;&#x6210;&#x591A;&#x4E2A; JPG &#x56FE;&#x50CF;</code>&#xFF0C;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F; <code>-background white -alpha remove</code> &#x5219;&#x53EF;&#x4EE5;<code>&#x4E00;&#x6B21;&#x547D;&#x4EE4;&#x8F6C;&#x6362;&#x591A;&#x9875; PDF &#x6210;&#x591A;&#x4E2A;&#x56FE;&#x50CF;</code>&#x5E76;&#x4FDD;&#x6301;&#x767D;&#x8272;&#x80CC;&#x666F;&#x3002;</li>
<li>&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F; <code>IM</code> &#x5185;&#x90E8;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x9875;&#x4E00;&#x9875;&#x7684;&#x8F6C;&#x6362;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x4E2A; <code>10</code> &#x9875;&#x7684; <code>PDF</code> &#x8017;&#x65F6;&#x4F1A;&#x6BD4;&#x8F83;&#x4E45;&#xFF0C;&#x91C7;&#x7528;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x8BA9; <code>Node.js</code> &#x591A;&#x8FDB;&#x7A0B;&#x540C;&#x65F6;&#x8F6C;&#x6362;&#x8BE5; <code>PDF</code> &#x53EF;&#x4EE5;&#x63D0;&#x5347;&#x901F;&#x7387;&#x3002;</li>
<li>
<code>-density</code>&#xFF1A;&#x6307;&#x5B9A;&#x8F93;&#x51FA;&#x56FE;&#x50CF;&#x7684;&#x5206;&#x8FA8;&#x7387; ( <code>DPI</code> )&#xFF0C;&#x5728; <code>Mac OS</code> &#x4E0A;&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;&#x5206;&#x8FA8;&#x7387; ( <code>72</code> ) &#x8F93;&#x51FA;&#x7684;&#x56FE;&#x50CF;&#x5B57;&#x8FF9;&#x4E0D;&#x6E05;&#xFF0C;&#x9700;&#x8981;&#x66F4;&#x9AD8;&#x5206;&#x8FA8;&#x7387;&#x83B7;&#x5F97;&#x6E05;&#x6670;&#x7684;&#x56FE;&#x50CF;&#x3002;</li>
</ol>
<h2 id="articleHeader12">&#x5728; Node.js &#x4E2D;&#x5E94;&#x7528;</h2>
<blockquote>&#x76F4;&#x63A5;&#x901A;&#x8FC7; <code>child_process</code> &#x6A21;&#x5757;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x547D;&#x4EE4;&#x5373;&#x53EF;&#xFF0C;&#x5982;&#x4E0B;&#x3002;</blockquote>
<p>&#x53EA;&#x9700;&#x8981;&#x7ED3;&#x679C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>exec</code>&#xFF0C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const util = require(&apos;util&apos;)
const exec = util.promisify(require(&apos;child_process&apos;).exec)

;(async function start () {
  try {
    await exec(`convert -resize &apos;150x100!&apos; -strip goods.jpg thumbnail.jpg`)
    console.log(&apos;convert completed.&apos;)
  } catch (err) {
    console.log(&apos;convert failed.&apos;, err)
  }
}())" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)
<span class="hljs-keyword">const</span> exec = util.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;child_process&apos;</span>).exec)

;(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> exec(<span class="hljs-string">`convert -resize &apos;150x100!&apos; -strip goods.jpg thumbnail.jpg`</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;convert completed.&apos;</span>)
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;convert failed.&apos;</span>, err)
  }
}())</code></pre>
<p>&#x6D41;&#x5F0F;&#x8F93;&#x5165;&#x8F93;&#x51FA;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>spawn</code>&#xFF0C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cp = require(&apos;child_process&apos;)
const fs = require(&apos;fs&apos;)

const args = [
  &apos;-&apos;,  // &#x4F7F;&#x7528;&#x6807;&#x51C6;&#x8F93;&#x5165;
  &apos;-resize&apos;, &apos;150x100!&apos;,
  &apos;-strip&apos;,
  &apos;jpg:-&apos;,  // &#x8F93;&#x51FA;&#x5230;&#x6807;&#x51C6;&#x8F93;&#x51FA;
]

const streamIn = fs.createReadStream(&apos;/path/to/goods.jpg&apos;)
const proc = cp.spawn(&apos;convert&apos;, args)
streamIn.pipe(proc.stdin)
proc.stdout.pipe(HttpResponse)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> cp = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;child_process&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-keyword">const</span> args = [
  <span class="hljs-string">&apos;-&apos;</span>,  <span class="hljs-comment">// &#x4F7F;&#x7528;&#x6807;&#x51C6;&#x8F93;&#x5165;</span>
  <span class="hljs-string">&apos;-resize&apos;</span>, <span class="hljs-string">&apos;150x100!&apos;</span>,
  <span class="hljs-string">&apos;-strip&apos;</span>,
  <span class="hljs-string">&apos;jpg:-&apos;</span>,  <span class="hljs-comment">// &#x8F93;&#x51FA;&#x5230;&#x6807;&#x51C6;&#x8F93;&#x51FA;</span>
]

<span class="hljs-keyword">const</span> streamIn = fs.createReadStream(<span class="hljs-string">&apos;/path/to/goods.jpg&apos;</span>)
<span class="hljs-keyword">const</span> proc = cp.spawn(<span class="hljs-string">&apos;convert&apos;</span>, args)
streamIn.pipe(proc.stdin)
proc.stdout.pipe(HttpResponse)</code></pre>
<h2 id="articleHeader13">&#x6700;&#x540E;</h2>
<p>&#x672C;&#x6587;&#x540C;&#x6B65;&#x53D1;&#x8868;&#x4E8E;&#x3010;<a href="https://aotu.io/" rel="nofollow noreferrer" target="_blank">&#x51F9;&#x51F8;&#x5B9E;&#x9A8C;&#x5BA4;</a>&#x3011;&#x535A;&#x5BA2;&#x53CA;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x4EEC;&#xFF0C;&#x4E48;&#x4E48;&#x54D2;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bV9ZYS?w=224&amp;h=224" src="https://static.alili.tech/img/bV9ZYS?w=224&amp;h=224" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
图像处理 - ImageMagick 简单介绍与案例

## 原文链接
[https://segmentfault.com/a/1190000015210920](https://segmentfault.com/a/1190000015210920)


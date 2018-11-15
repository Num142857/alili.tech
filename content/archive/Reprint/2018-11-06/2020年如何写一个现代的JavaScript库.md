---
title: 2020年如何写一个现代的JavaScript库
hidden: true
categories: reprint
slug: 3774c2dd
date: 2018-11-06 02:30:12
---

{{< raw >}}
<p>&#x6211;&#x5199;&#x8FC7;&#x4E00;&#x4E9B;<a href="https://github.com/yanhaijing" rel="nofollow noreferrer" target="_blank">&#x5F00;&#x6E90;&#x9879;&#x76EE;</a>&#xFF0C;&#x5728;&#x5F00;&#x6E90;&#x65B9;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#xFF0C;&#x6700;&#x8FD1;&#x5F00;&#x5230;&#x4E86;&#x962E;&#x8001;&#x5E08;&#x7684;&#x5FAE;&#x535A;&#xFF0C;&#x6DF1;&#x6709;&#x611F;&#x89E6;&#xFF0C;&#x73B0;&#x5728;&#x4E00;&#x4E2A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x6D89;&#x53CA;&#x7684;&#x4E1C;&#x897F;&#x786E;&#x5B9E;&#x633A;&#x591A;&#x7684;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5BF9;&#x4E8E;&#x65B0;&#x624B;&#x6765;&#x8BF4;&#x975E;&#x5E38;&#x4E0D;&#x53CB;&#x597D;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613993?w=1075&amp;h=656" src="https://static.alili.tech/img/remote/1460000016613993?w=1075&amp;h=656" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x8FD1;&#x6211;&#x5199;&#x4E86;&#x4E00;&#x4E2A;<a href="https://github.com/yanhaijing/jslib-base" rel="nofollow noreferrer" target="_blank">jslib-base</a>&#xFF0C;&#x65E8;&#x5728;&#x4ECE;&#x591A;&#x65B9;&#x9762;&#x5FEB;&#x901F;&#x5E2E;&#x5927;&#x5BB6;&#x642D;&#x5EFA;&#x4E00;&#x4E2A;&#x6807;&#x51C6;&#x7684;js&#x5E93;&#xFF0C;&#x672C;&#x6587;&#x5C06;&#x5DF2;jslib-base&#x4E3A;&#x4F8B;&#xFF0C;&#x4ECB;&#x7ECD;&#x5199;&#x4E00;&#x4E2A;&#x5F00;&#x6E90;&#x5E93;&#x7684;&#x77E5;&#x8BC6;</p><blockquote>jslib-base &#x6700;&#x597D;&#x7528;&#x7684;js&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x8D4B;&#x80FD;js&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x5F00;&#x6E90;&#xFF0C;&#x8BA9;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;js&#x5E93;&#x66F4;&#x7B80;&#x5355;&#xFF0C;&#x66F4;&#x4E13;&#x4E1A;</blockquote><h2 id="articleHeader0">&#x6587;&#x6863;</h2><p>&#x6240;&#x8C13;&#x4EE3;&#x7801;&#x672A;&#x52A8;&#xFF0C;&#x6587;&#x6863;&#x5148;&#x884C;&#xFF0C;&#x6587;&#x6863;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x6587;&#x6863;&#x5305;&#x62EC;</p><ul><li>README.md</li><li>TODO.md</li><li>CHANGELOG.md</li><li>LICENSE</li><li>doc</li></ul><h3 id="articleHeader1">README.md</h3><p>README&#x662F;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x95E8;&#x9762;&#xFF0C;&#x5E94;&#x8BE5;&#x7B80;&#x5355;&#x660E;&#x4E86;&#x7684;&#x5448;&#x73B0;&#x7528;&#x6237;&#x6700;&#x5173;&#x5FC3;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4E00;&#x4E2A;&#x5F00;&#x6E90;&#x5E93;&#x7684;&#x7528;&#x6237;&#x5305;&#x62EC;&#x4F7F;&#x7528;&#x8005;&#x548C;&#x8D21;&#x732E;&#x8005;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x4E2A;&#x6587;&#x6863;&#x5E94;&#x8BE5;&#x5305;&#x62EC;&#x9879;&#x76EE;&#x7B80;&#x4ECB;&#xFF0C;&#x4F7F;&#x7528;&#x8005;&#x6307;&#x5357;&#xFF0C;&#x8D21;&#x732E;&#x8005;&#x6307;&#x5357;&#x4E09;&#x90E8;&#x5206;</p><p>&#x9879;&#x76EE;&#x7B80;&#x4ECB;&#x7528;&#x8BE5;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x9879;&#x76EE;&#x529F;&#x80FD;&#xFF0C;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x517C;&#x5BB9;&#x6027;&#x7684;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#xFF0C;&#x8FD9;&#x91CC;&#x91CD;&#x70B9;&#x4ECB;&#x7ECD;&#x4E0B;&#x5FBD;&#x7AE0;&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x89C1;&#x8FC7;&#x522B;&#x4EBA;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x5FBD;&#x7AE0;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613994?w=1621&amp;h=238" src="https://static.alili.tech/img/remote/1460000016613994?w=1621&amp;h=238" alt="" title="" style="cursor:pointer"></span></p><p>&#x5FBD;&#x7AE0;&#x901A;&#x8FC7;&#x66F4;&#x76F4;&#x89C2;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5C06;&#x66F4;&#x591A;&#x7684;&#x4FE1;&#x606F;&#x5448;&#x73B0;&#x51FA;&#x6765;&#xFF0C;&#x8FD8;&#x80FD;&#x591F;&#x63D0;&#x9AD8;&#x989C;&#x503C;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x7F51;&#x7AD9;&#x4E13;&#x95E8;&#x5236;&#x4F5C;&#x5404;&#x79CD;&#x5FBD;&#x7AE0;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;<a href="https://shields.io/#/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;README&#x7684;<a href="https://github.com/yanhaijing/jslib-base/blob/master/README.md" rel="nofollow noreferrer" target="_blank">&#x5B8C;&#x6574;&#x7684;&#x4F8B;&#x5B50;</a></p><h3 id="articleHeader2">TODO.md</h3><p>TODO&#x5E94;&#x8BE5;&#x8BB0;&#x5F55;&#x9879;&#x76EE;&#x7684;&#x672A;&#x6765;&#x8BA1;&#x5212;&#xFF0C;&#x8FD9;&#x5BF9;&#x4E8E;&#x8D21;&#x732E;&#x8005;&#x548C;&#x4F7F;&#x7528;&#x8005;&#x90FD;&#x6709;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x610F;&#x4E49;&#xFF0C;&#x4E0B;&#x9762;&#x662F;TODO&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- [X] &#x5DF2;&#x5B8C;&#x6210;
- [ ] &#x672A;&#x5B8C;&#x6210;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> [X] &#x5DF2;&#x5B8C;&#x6210;
</span>-<span class="ruby"> [ ] &#x672A;&#x5B8C;&#x6210;</span></code></pre><h3 id="articleHeader3">CHANGELOG.md</h3><p>CHANGELOG&#x8BB0;&#x5F55;&#x9879;&#x76EE;&#x7684;&#x53D8;&#x66F4;&#x65E5;&#x5FD7;&#xFF0C;&#x5BF9;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x8005;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5728;&#x5347;&#x7EA7;&#x4F7F;&#x7528;&#x7248;&#x672C;&#x65F6;&#xFF0C;CHANGELOG&#x9700;&#x8981;&#x8BB0;&#x5F55;&#x9879;&#x76EE;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x53D1;&#x7248;&#x65F6;&#x95F4;&#x548C;&#x7248;&#x672C;&#x53D8;&#x66F4;&#x8BB0;&#x5F55;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="## 0.1.0 / 2018-10-6

- &#x65B0;&#x589E;xxx&#x529F;&#x80FD;
- &#x5220;&#x9664;xxx&#x529F;&#x80FD;
- &#x66F4;&#x6539;xxx&#x529F;&#x80FD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>## 0.1.0 / 2018-10-6

-<span class="ruby"> &#x65B0;&#x589E;xxx&#x529F;&#x80FD;
</span>-<span class="ruby"> &#x5220;&#x9664;xxx&#x529F;&#x80FD;
</span>-<span class="ruby"> &#x66F4;&#x6539;xxx&#x529F;&#x80FD;</span></code></pre><h3 id="articleHeader4">LICENSE</h3><p>&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x5FC5;&#x987B;&#x8981;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x534F;&#x8BAE;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x534F;&#x8BAE;&#x7684;&#x9879;&#x76EE;&#x662F;&#x6CA1;&#x6709;&#x4EBA;&#x6562;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x5173;&#x4E8E;&#x4E0D;&#x540C;&#x534F;&#x8BAE;&#x7684;&#x533A;&#x522B;&#x53EF;&#x4EE5;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x5F20;&#x56FE;&#xFF08;&#x51FA;&#x81EA;&#x962E;&#x8001;&#x5E08;&#x535A;&#x5BA2;&#xFF09;&#xFF0C;&#x6211;&#x7684;&#x5EFA;&#x8BAE;&#x662F;&#x9009;&#x62E9;MIT&#x6216;&#x8005;BSD&#x534F;&#x8BAE;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613995" src="https://static.alili.tech/img/remote/1460000016613995" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader5">doc</h3><p>&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x8FD8;&#x5E94;&#x8BE5;&#x63D0;&#x4F9B;&#x8BE6;&#x7EC6;&#x7684;&#x4F7F;&#x7528;&#x6587;&#x6863;&#xFF0C;&#x4E00;&#x4EFD;&#x8BE6;&#x7EC6;&#x6587;&#x6863;&#x7684;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x4ECB;&#x7ECD;&#x90FD;&#x5E94;&#x8BE5;&#x5305;&#x62EC;&#x5982;&#x4E0B;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x51FD;&#x6570;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;

&#x51FD;&#x6570;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;

&#x51FD;&#x6570;&#x53C2;&#x6570;&#x548C;&#x8FD4;&#x56DE;&#x503C;&#xFF08;&#x8981;&#x9075;&#x5B88;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x7684;&#x89C4;&#x5219;&#xFF09;

- param {string} name1 name1&#x63CF;&#x8FF0;
- return {string} &#x8FD4;&#x56DE;&#x503C;&#x63CF;&#x8FF0;

&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF08;&#x8981;&#x5305;&#x542B;&#x4EE3;&#x7801;&#x7528;&#x4F8B;&#xFF09;

// &#x4EE3;&#x7801;

&#x7279;&#x6B8A;&#x8BF4;&#x660E;&#xFF0C;&#x6BD4;&#x5982;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x62A5;&#x9519;&#x7B49;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>&#x51FD;&#x6570;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;

&#x51FD;&#x6570;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;

&#x51FD;&#x6570;&#x53C2;&#x6570;&#x548C;&#x8FD4;&#x56DE;&#x503C;&#xFF08;&#x8981;&#x9075;&#x5B88;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x7684;&#x89C4;&#x5219;&#xFF09;

-<span class="ruby"> param {string} name1 name1&#x63CF;&#x8FF0;
</span>-<span class="ruby"> <span class="hljs-keyword">return</span> {string} &#x8FD4;&#x56DE;&#x503C;&#x63CF;&#x8FF0;
</span>
&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF08;&#x8981;&#x5305;&#x542B;&#x4EE3;&#x7801;&#x7528;&#x4F8B;&#xFF09;
<span class="hljs-comment">
// &#x4EE3;&#x7801;</span>

&#x7279;&#x6B8A;&#x8BF4;&#x660E;&#xFF0C;&#x6BD4;&#x5982;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x62A5;&#x9519;&#x7B49;</code></pre><h2 id="articleHeader6">&#x6784;&#x5EFA;</h2><p>&#x7406;&#x60F3;&#x7684;&#x60C5;&#x51B5;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x5E93;&#x5F00;&#x53D1;&#x8005;&#x7F8E;&#x6ECB;&#x6ECB;&#x7684;&#x5199;ES6+&#x7684;&#x4EE3;&#x7801;&#xFF1B;</li><li>&#x5E93;&#x4F7F;&#x7528;&#x8005;&#x80FD;&#x591F;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#xFF08;ie6-11&#xFF09;&#x548C;node&#xFF08;0.12-10&#xFF09;&#x4E2D;</li><li>&#x5E93;&#x4F7F;&#x7528;&#x8005;&#x80FD;&#x591F;&#x4F7F;&#x7528;AMD&#x6216;CMD&#x6A21;&#x5757;&#x65B9;&#x6848;</li><li>&#x5E93;&#x4F7F;&#x7528;&#x8005;&#x80FD;&#x591F;&#x4F7F;&#x7528;webpack&#x3001;rollup&#x6216;fis&#x7B49;&#x9884;&#x7F16;&#x8BD1;&#x5DE5;&#x5177;</li></ul><p>&#x7406;&#x60F3;&#x5F88;&#x4E30;&#x6EE1;&#xFF0C;&#x73B0;&#x5B9E;&#x5F88;&#x3002;&#x3002;&#x3002;&#xFF0C;&#x5982;&#x4F55;&#x624D;&#x80FD;&#x591F;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x548C;&#x4F7F;&#x7528;&#x8005;&#x90FD;&#x80FD;&#x591F;&#x5F00;&#x5FC3;&#x5462;&#xFF0C;jslib-base&#x901A;&#x8FC7;babel+rollup&#x63D0;&#x4F9B;&#x4E86;&#x89E3;&#x51B3;&#x65B9;&#x6848;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613996?w=1856&amp;h=878" src="https://static.alili.tech/img/remote/1460000016613996?w=1856&amp;h=878" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader7">&#x7F16;&#x8BD1;</h3><p>&#x901A;&#x8FC7;babel&#x53EF;&#x4EE5;&#x628A;ES6+&#x7684;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x6210;ES5&#x7684;&#x4EE3;&#x7801;&#xFF0C;babel&#x7ECF;&#x7406;&#x4E86;5&#x5230;6&#x7684;&#x8FDB;&#x5316;&#xFF0C;&#x4E0B;&#x9762;&#x4E00;&#x5F20;&#x56FE;&#x603B;&#x7ED3;&#x4E86;babel&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x7684;&#x53D8;&#x8FC1;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613997?w=1765&amp;h=483" src="https://static.alili.tech/img/remote/1460000016613997?w=1765&amp;h=483" alt="" title="" style="cursor:pointer"></span></p><p>&#x672C;&#x6587;&#x4E0D;&#x8BA8;&#x8BBA;babel&#x7684;&#x8FDB;&#x5316;&#x53F2;&#xFF08;&#x540E;&#x9762;&#x4F1A;&#x5355;&#x72EC;&#x5F00;&#x4E00;&#x7247;&#x535A;&#x6587;&#x4ECB;&#x7ECD;&#xFF09;&#xFF0C;&#x800C;&#x662F;&#x9009;&#x62E9;&#x6700;&#x73B0;&#x4EE3;&#x5316;&#x7684;<code>babel-preset-env</code>&#x65B9;&#x6848;&#xFF0C;babel-preset-env&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x63D0;&#x4F9B;&#x63D0;&#x4F9B;&#x517C;&#x5BB9;&#x73AF;&#x5883;&#xFF0C;&#x800C;&#x51B3;&#x5B9A;&#x8981;&#x7F16;&#x8BD1;&#x90A3;&#x4E9B;ES&#x7279;&#x6027;</p><p>&#x5176;&#x539F;&#x7406;&#x5927;&#x6982;&#x5982;&#x4E0B;&#xFF0C;&#x9996;&#x5148;&#x901A;&#x8FC7;ES&#x7684;&#x7279;&#x6027;&#x548C;[&#x7279;&#x6027;&#x7684;&#x517C;&#x5BB9;&#x5217;&#x8868;](<a href="http://kangax.github.io/compat-table/es6/" rel="nofollow noreferrer" target="_blank">http://kangax.github.io/compa...</a><br>)&#x8BA1;&#x7B97;&#x51FA;&#x6BCF;&#x4E2A;&#x7279;&#x6027;&#x7684;&#x517C;&#x5BB9;&#x6027;&#x4FE1;&#x606F;&#xFF0C;&#x518D;&#x901A;&#x8FC7;&#x7ED9;&#x5B9A;&#x517C;&#x5BB9;&#x6027;&#x8981;&#x6C42;&#xFF0C;&#x8BA1;&#x7B97;&#x51FA;&#x8981;&#x4F7F;&#x7528;&#x7684;babel&#x63D2;&#x4EF6;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613998?w=1708&amp;h=744" src="https://static.alili.tech/img/remote/1460000016613998?w=1708&amp;h=744" alt="" title="" style="cursor:pointer"></span></p><p>&#x9996;&#x5148;&#x9700;&#x8981;&#x5B89;&#x88C5;<code>babel-preset-env</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i --save-dev babel-preset-env" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">$ npm i --save-dev babel-preset-env</code></pre><p>&#x7136;&#x540E;&#x65B0;&#x589E;&#x4E00;&#x4E2A;.babelrc&#x6587;&#x4EF6;&#xFF0C;&#x6DFB;&#x52A0;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;,
    {
      &quot;targets&quot;: {
        &quot;browsers&quot;: &quot;last 2 versions, &gt; 1%, ie &gt;= 6, Android &gt;= 4, iOS &gt;= 6, and_uc &gt; 9&quot;,
        &quot;node&quot;: &quot;0.10&quot;
      },
      &quot;modules&quot;: false,
      &quot;loose&quot;: false
    }]
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;presets&quot;</span>: [
    [<span class="hljs-string">&quot;env&quot;</span>,
    {
      <span class="hljs-attr">&quot;targets&quot;</span>: {
        <span class="hljs-attr">&quot;browsers&quot;</span>: <span class="hljs-string">&quot;last 2 versions, &gt; 1%, ie &gt;= 6, Android &gt;= 4, iOS &gt;= 6, and_uc &gt; 9&quot;</span>,
        <span class="hljs-attr">&quot;node&quot;</span>: <span class="hljs-string">&quot;0.10&quot;</span>
      },
      <span class="hljs-attr">&quot;modules&quot;</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">&quot;loose&quot;</span>: <span class="hljs-literal">false</span>
    }]
  ]
}
</code></pre><p><code>targets</code>&#x4E2D;&#x914D;&#x7F6E;&#x9700;&#x8981;&#x517C;&#x5BB9;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x5173;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x914D;&#x7F6E;&#x5BF9;&#x5E94;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5217;&#x8868;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;<a href="http://browserl.ist/" rel="nofollow noreferrer" target="_blank">browserl.ist</a>&#x4E0A;&#x67E5;&#x770B;</p><p><code>modules</code>&#x8868;&#x793A;&#x7F16;&#x51FA;&#x8F93;&#x51FA;&#x7684;&#x6A21;&#x5757;&#x7C7B;&#x578B;&#xFF0C;&#x652F;&#x6301;&quot;amd&quot;,&quot;umd&quot;,&quot;systemjs&quot;,&quot;commonjs&quot;,false&#x8FD9;&#x4E9B;&#x9009;&#x9879;&#xFF0C;false&#x8868;&#x793A;&#x4E0D;&#x8F93;&#x51FA;&#x4EFB;&#x4F55;&#x6A21;&#x5757;&#x7C7B;&#x578B;</p><p><code>loose</code>&#x4EE3;&#x8868;&#x677E;&#x6563;&#x6A21;&#x5F0F;&#xFF0C;&#x5C06;loose&#x8BBE;&#x7F6E;&#x4E3A;true&#xFF0C;&#x80FD;&#x591F;&#x66F4;&#x597D;&#x5730;&#x517C;&#x5BB9;ie8&#x4EE5;&#x4E0B;&#x73AF;&#x5883;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF08;ie8&#x4E0D;&#x652F;&#x6301;<code>Object.defineProperty</code>&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6E90;&#x4EE3;&#x7801;
const aaa = 1;
export default aaa;


// loose false
Object.defineProperty(exports, &apos;__esModule&apos;, {
    value: true
});
var aaa = 1;
exports.default = 1;


// loose true
exports.__esModule = true;
var aaa = 1;
exports.default = 1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6E90;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">const</span> aaa = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> aaa;


<span class="hljs-comment">// loose false</span>
<span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&apos;__esModule&apos;</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
});
<span class="hljs-keyword">var</span> aaa = <span class="hljs-number">1</span>;
exports.default = <span class="hljs-number">1</span>;


<span class="hljs-comment">// loose true</span>
exports.__esModule = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> aaa = <span class="hljs-number">1</span>;
exports.default = <span class="hljs-number">1</span>;</code></pre><p><code>babel-preset-env</code>&#x89E3;&#x51B3;&#x4E86;&#x8BED;&#x6CD5;&#x65B0;&#x7279;&#x6027;&#x7684;&#x517C;&#x5BB9;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;api&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5728;babel&#x4E2D;&#x4E00;&#x822C;&#x901A;&#x8FC7;babel-polyfill&#x6765;&#x89E3;&#x51B3;&#xFF0C;babel-polyfill&#x901A;&#x8FC7;&#x5F15;&#x5165;&#x4E00;&#x4E2A;polyfill&#x6587;&#x4EF6;&#x6765;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x5BF9;&#x4E8E;&#x666E;&#x901A;&#x9879;&#x76EE;&#x5F88;&#x5B9E;&#x7528;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x5E93;&#x6765;&#x8BF4;&#x5C31;&#x4E0D;&#x592A;&#x53CB;&#x597D;&#x4E86;</p><p>babel&#x7ED9;&#x5E93;&#x5F00;&#x53D1;&#x8005;&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6848;&#x662F;<code>babel-transform-runtime</code>&#xFF0C;runtime&#x63D0;&#x4F9B;&#x7C7B;&#x4F3C;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x5168;&#x5C40;&#x7684;polyfill&#x6C99;&#x76D2;&#x5316;</p><p>&#x9996;&#x5148;&#x9700;&#x8981;&#x5B89;&#x88C5;<code>babel-transform-runtime</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i --save-dev babel-plugin-transform-runtime" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">$ npm i --save-dev babel-plugin-transform-runtime</code></pre><p>&#x5728;.babelrc&#x589E;&#x52A0;&#x4E0B;&#x9762;&#x7684;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;plugins&quot;: [
  [&quot;transform-runtime&quot;, {
    &quot;helpers&quot;: false,
    &quot;polyfill&quot;: false,
    &quot;regenerator&quot;: false,
    &quot;moduleName&quot;: &quot;babel-runtime&quot;
  }]
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-attr">&quot;plugins&quot;:</span> <span class="hljs-string">[</span>
  <span class="hljs-string">[&quot;transform-runtime&quot;,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    &quot;helpers&quot;:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    &quot;polyfill&quot;:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    &quot;regenerator&quot;:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    &quot;moduleName&quot;:</span> <span class="hljs-string">&quot;babel-runtime&quot;</span>
  <span class="hljs-string">}]</span>
<span class="hljs-string">]</span></code></pre><p>transform-runtime&#xFF0C;&#x652F;&#x6301;&#x4E09;&#x79CD;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x4E0B;&#x9762;&#x662F;polyfill&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6E90;&#x4EE3;&#x7801;
var a = Promise.resolve(1);

// &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;
var _promise = require(&apos;babel-runtime/core-js/promise&apos;);

var a = _promise.resolve(1); // Promise&#x88AB;&#x66FF;&#x6362;&#x4E3A;_promise" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6E90;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>);

<span class="hljs-comment">// &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">var</span> _promise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-runtime/core-js/promise&apos;</span>);

<span class="hljs-keyword">var</span> a = _promise.resolve(<span class="hljs-number">1</span>); <span class="hljs-comment">// Promise&#x88AB;&#x66FF;&#x6362;&#x4E3A;_promise</span></code></pre><p>&#x867D;&#x7136;&#x867D;&#x7136;&#x53EF;&#x4EE5;&#x4F18;&#x96C5;&#x7684;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x5F15;&#x5165;&#x7684;&#x6587;&#x4EF6;&#x975E;&#x5E38;&#x4E4B;&#x5927;&#xFF0C;&#x6BD4;&#x5982;&#x53EA;&#x7528;&#x4E86;ES6&#x4E2D;&#x6570;&#x7EC4;&#x7684;find&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x4F1A;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x51E0;&#x5343;&#x884C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x7684;&#x5EFA;&#x8BAE;&#x5BF9;&#x4E8E;&#x5E93;&#x6765;&#x8BF4;&#x80FD;&#x4E0D;&#x7528;&#x6700;&#x597D;&#x4E0D;&#x7528;</p><h3 id="articleHeader8">&#x6253;&#x5305;</h3><p>&#x7F16;&#x8BD1;&#x89E3;&#x51B3;&#x4E86;ES6&#x5230;ES5&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6253;&#x5305;&#x53EF;&#x4EE5;&#x628A;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x7EDF;&#x4E00;&#x7684;&#x6587;&#x4EF6;&#x5165;&#x53E3;&#xFF0C;&#x6253;&#x5305;&#x89E3;&#x51B3;&#x7684;&#x662F;&#x4F9D;&#x8D56;&#x5F15;&#x5165;&#x7684;&#x95EE;&#x9898;</p><h4>rollup vs webpack</h4><p>&#x6211;&#x9009;&#x62E9;&#x7684;rollup&#x4F5C;&#x4E3A;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;rollup&#x53F7;&#x79F0;&#x4E0B;&#x4E00;&#x4EE3;&#x6253;&#x5305;&#x65B9;&#x6848;&#xFF0C;&#x5176;&#x6709;&#x5982;&#x4E0B;&#x529F;&#x80FD;</p><ul><li>&#x4F9D;&#x8D56;&#x89E3;&#x6790;&#xFF0C;&#x6253;&#x5305;&#x6784;&#x5EFA;</li><li>&#x4EC5;&#x652F;&#x6301;ES6&#x6A21;&#x5757;</li><li>Tree shaking</li></ul><p>webpack&#x4F5C;&#x4E3A;&#x6700;&#x6D41;&#x884C;&#x7684;&#x6253;&#x5305;&#x65B9;&#x6848;&#xFF0C;rollup&#x4F5C;&#x4E3A;&#x4E0B;&#x4E00;&#x4EE3;&#x6253;&#x5305;&#x65B9;&#x6848;&#xFF0C;&#x5176;&#x5B9E;&#x4E00;&#x53E5;&#x8BDD;&#x5C31;&#x53EF;&#x4EE5;&#x603B;&#x7ED3;&#x4E8C;&#x8005;&#x7684;&#x533A;&#x522B;&#xFF1A;&#x5E93;&#x4F7F;&#x7528;rollup&#xFF0C;&#x5176;&#x4ED6;&#x573A;&#x666F;&#x4F7F;&#x7528;webpack</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4F1A;&#x8FD9;&#x4E48;&#x8BF4;&#x5462;&#xFF1F;&#x4E0B;&#x9762;&#x901A;&#x8FC7;&#x4F8B;&#x5B50;&#x5BF9;&#x6BD4;&#x4E0B;webpack&#x548C;rollup&#x7684;&#x533A;&#x522B;</p><p>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x6709;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;index.js&#x548C;bar.js&#xFF0C;&#x5176;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><p>bar.js&#x5BF9;&#x5916;&#x66B4;&#x6F0F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;<code>bar</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function bar() {
  console.log(&apos;bar&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;bar&apos;</span>)
}</code></pre><p>index.js&#x5F15;&#x7528;bar.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bar from &apos;./bar&apos;;

bar()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bar&apos;</span>;

bar()</code></pre><p>&#x4E0B;&#x9762;&#x662F;webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;webpack.config.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);

module.exports = {
    entry: &apos;./src/index.js&apos;,
    output: {
        path: path.resolve(__dirname, &apos;dist&apos;),
        filename: &apos;bundle.js&apos;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">&apos;./src/index.js&apos;</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;bundle.js&apos;</span>
    }
};</code></pre><p>&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E00;&#x4E0B;webpack&#x6253;&#x5305;&#x8F93;&#x51FA;&#x7684;&#x5185;&#x5BB9;&#xFF0C;o(&#x256F;&#x25A1;&#x2570;)o&#xFF0C;&#x522B;&#x7740;&#x6025;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x6700;&#x4E0B;&#x9762;&#x7684;&#x51E0;&#x884C;&#xFF0C;&#x4E0A;&#x9762;&#x8FD9;&#x4E00;&#x5927;&#x7247;&#x4EE3;&#x7801;&#x5176;&#x5B9E;&#x662F;webpack&#x751F;&#x6210;&#x7684;&#x7B80;&#x6613;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF0C;webpack&#x7684;&#x65B9;&#x6848;&#x95EE;&#x9898;&#x5728;&#x4E8E;&#x4F1A;&#x751F;&#x6210;&#x5F88;&#x591A;&#x5197;&#x4F59;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x5BF9;&#x4E8E;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x6765;&#x8BF4;&#x6CA1;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x5E93;&#x6765;&#x8BF4;&#x5C31;&#x4E0D;&#x592A;&#x53CB;&#x597D;&#x4E86;</p><p><em>&#x6CE8;&#x610F;&#xFF1A;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x57FA;&#x4E8E;webpack3&#xFF0C;webpack4&#x589E;&#x52A0;&#x4E86;scope hoisting&#xFF0C;&#x5DF2;&#x7ECF;&#x628A;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x5408;&#x5E76;&#x5230;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x4E2D;</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/
(function(modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
                /******/
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter = module &amp;&amp; module.__esModule ?
            /******/
            function getDefault() { return module[&apos;default&apos;]; } :
            /******/
            function getModuleExports() { return module; };
        /******/
        __webpack_require__.d(getter, &apos;a&apos;, getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = &quot;&quot;;
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 0);
    /******/
})
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    (function(module, __webpack_exports__, __webpack_require__) {

        &quot;use strict&quot;;
        Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__bar__ = __webpack_require__(1);


        Object(__WEBPACK_IMPORTED_MODULE_0__bar__[&quot;a&quot; /* default */ ])()


        /***/
    }),
    /* 1 */
    /***/
    (function(module, __webpack_exports__, __webpack_require__) {

        &quot;use strict&quot;;
        /* harmony export (immutable) */
        __webpack_exports__[&quot;a&quot;] = bar;

        function bar() {
            //
            console.log(&apos;bar&apos;)
        }


        /***/
    })
    /******/
]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/******/</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// The module cache</span>
    <span class="hljs-comment">/******/</span>
    <span class="hljs-keyword">var</span> installedModules = {};
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// The require function</span>
    <span class="hljs-comment">/******/</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-comment">/******/</span>
        <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Check if module is in cache</span>
        <span class="hljs-comment">/******/</span>
        <span class="hljs-keyword">if</span> (installedModules[moduleId]) {
            <span class="hljs-comment">/******/</span>
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
            <span class="hljs-comment">/******/</span>
        }
        <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
        <span class="hljs-comment">/******/</span>
        <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-comment">/******/</span>
            i: moduleId,
            <span class="hljs-comment">/******/</span>
            l: <span class="hljs-literal">false</span>,
            <span class="hljs-comment">/******/</span>
            exports: {}
            <span class="hljs-comment">/******/</span>
        };
        <span class="hljs-comment">/******/</span>
        <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Execute the module function</span>
        <span class="hljs-comment">/******/</span>
        modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
        <span class="hljs-comment">/******/</span>
        <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Flag the module as loaded</span>
        <span class="hljs-comment">/******/</span>
        <span class="hljs-built_in">module</span>.l = <span class="hljs-literal">true</span>;
        <span class="hljs-comment">/******/</span>
        <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Return the exports of the module</span>
        <span class="hljs-comment">/******/</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
        <span class="hljs-comment">/******/</span>
    }
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
    <span class="hljs-comment">/******/</span>
    __webpack_require__.m = modules;
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// expose the module cache</span>
    <span class="hljs-comment">/******/</span>
    __webpack_require__.c = installedModules;
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// define getter function for harmony exports</span>
    <span class="hljs-comment">/******/</span>
    __webpack_require__.d = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">exports, name, getter</span>) </span>{
        <span class="hljs-comment">/******/</span>
        <span class="hljs-keyword">if</span> (!__webpack_require__.o(exports, name)) {
            <span class="hljs-comment">/******/</span>
            <span class="hljs-built_in">Object</span>.defineProperty(exports, name, {
                <span class="hljs-comment">/******/</span>
                configurable: <span class="hljs-literal">false</span>,
                <span class="hljs-comment">/******/</span>
                enumerable: <span class="hljs-literal">true</span>,
                <span class="hljs-comment">/******/</span>
                get: getter
                <span class="hljs-comment">/******/</span>
            });
            <span class="hljs-comment">/******/</span>
        }
        <span class="hljs-comment">/******/</span>
    };
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules</span>
    <span class="hljs-comment">/******/</span>
    __webpack_require__.n = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
        <span class="hljs-comment">/******/</span>
        <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">module</span> &amp;&amp; <span class="hljs-built_in">module</span>.__esModule ?
            <span class="hljs-comment">/******/</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDefault</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>[<span class="hljs-string">&apos;default&apos;</span>]; } :
            <span class="hljs-comment">/******/</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleExports</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>; };
        <span class="hljs-comment">/******/</span>
        __webpack_require__.d(getter, <span class="hljs-string">&apos;a&apos;</span>, getter);
        <span class="hljs-comment">/******/</span>
        <span class="hljs-keyword">return</span> getter;
        <span class="hljs-comment">/******/</span>
    };
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Object.prototype.hasOwnProperty.call</span>
    <span class="hljs-comment">/******/</span>
    __webpack_require__.o = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">object, property</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, property); };
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// __webpack_public_path__</span>
    <span class="hljs-comment">/******/</span>
    __webpack_require__.p = <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-comment">/******/</span>
    <span class="hljs-comment">/******/</span> <span class="hljs-comment">// Load entry module and return exports</span>
    <span class="hljs-comment">/******/</span>
    <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-number">0</span>);
    <span class="hljs-comment">/******/</span>
})
<span class="hljs-comment">/************************************************************************/</span>
<span class="hljs-comment">/******/</span>
([
    <span class="hljs-comment">/* 0 */</span>
    <span class="hljs-comment">/***/</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
        &quot;use strict&quot;</span>;
        <span class="hljs-built_in">Object</span>.defineProperty(__webpack_exports__, <span class="hljs-string">&quot;__esModule&quot;</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });
        <span class="hljs-comment">/* harmony import */</span>
        <span class="hljs-keyword">var</span> __WEBPACK_IMPORTED_MODULE_0__bar__ = __webpack_require__(<span class="hljs-number">1</span>);


        <span class="hljs-built_in">Object</span>(__WEBPACK_IMPORTED_MODULE_0__bar__[<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-comment">/* default */</span> ])()


        <span class="hljs-comment">/***/</span>
    }),
    <span class="hljs-comment">/* 1 */</span>
    <span class="hljs-comment">/***/</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
        &quot;use strict&quot;</span>;
        <span class="hljs-comment">/* harmony export (immutable) */</span>
        __webpack_exports__[<span class="hljs-string">&quot;a&quot;</span>] = bar;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;bar&apos;</span>)
        }


        <span class="hljs-comment">/***/</span>
    })
    <span class="hljs-comment">/******/</span>
]);</code></pre><p>&#x4E0B;&#x9762;&#x6765;&#x770B;&#x770B;rollup&#x7684;&#x7ED3;&#x679C;&#xFF0C;rollup&#x7684;&#x914D;&#x7F6E;&#x548C;webpack&#x7C7B;&#x4F3C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    input: &apos;src/index.js&apos;,
    output: {
        file: &apos;dist/bundle2.js&apos;,
        format: &apos;cjs&apos;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">&apos;src/index.js&apos;</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">&apos;dist/bundle2.js&apos;</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">&apos;cjs&apos;</span>
    }
};</code></pre><p>&#x4E0B;&#x9762;&#x770B;&#x770B;rollup&#x7684;&#x4EA7;&#x51FA;&#xFF0C;&#x7B80;&#x76F4;&#x5B8C;&#x7F8E;&#x6709;&#x6CA1;&#x6709;&#xFF0C;&#x6A21;&#x5757;&#x5B8C;&#x5168;&#x6D88;&#x5931;&#x4E86;&#xFF0C;rollup&#x901A;&#x8FC7;&#x987A;&#x5E8F;&#x5F15;&#x5165;&#x5230;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x6765;&#x89E3;&#x51B3;&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#x95EE;&#x9898;&#xFF0C;rollup&#x7684;&#x65B9;&#x6848;&#x5982;&#x679C;&#x8981;&#x505A;&#x62C6;&#x5305;&#x7684;&#x8BDD;&#x5C31;&#x4F1A;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x6A21;&#x5757;&#x5B8C;&#x5168;&#x900F;&#x660E;&#x4E86;&#xFF0C;&#x4F46;&#x8FD9;&#x5BF9;&#x4E8E;&#x5E93;&#x5F00;&#x53D1;&#x8005;&#x6765;&#x8BF4;&#x7B80;&#x76F4;&#x5C31;&#x662F;&#x6700;&#x5B8C;&#x7F8E;&#x7684;&#x65B9;&#x6848;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;;

function bar() {
  //
  console.log(&apos;bar&apos;);
}

bar();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&apos;use strict&apos;</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">//</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;bar&apos;</span>);
}

bar();</code></pre><h4>&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;</h4><p>&#x5728;ES6&#x6A21;&#x5757;&#x5316;&#x4E4B;&#x524D;&#xFF0C;JS&#x793E;&#x533A;&#x63A2;&#x7D22;&#x51FA;&#x4E86;&#x4E00;&#x4E9B;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF0C;&#x6BD4;&#x5982;node&#x4E2D;&#x7684;commonjs&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;AMD&#xFF0C;&#x8FD8;&#x6709;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x517C;&#x5BB9;&#x4E0D;&#x540C;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#x7684;UMD&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x8FD9;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x6211;&#x4E4B;&#x524D;&#x7684;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x300A;<a href="https://yanhaijing.com/javascript/2015/03/28/js-module/" rel="nofollow noreferrer" target="_blank">JavaScript&#x6A21;&#x5757;&#x7684;&#x524D;&#x4E16;&#x4ECA;&#x751F;</a>&#x300B;</p><p>&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;&#xFF0C;&#x9884;&#x7F16;&#x8BD1;&#x5DE5;&#x5177;&#x548C;node&#xFF0C;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x4E2D;&#x7684;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;&#x4E5F;&#x4E0D;&#x540C;&#xFF1B;&#x7531;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E0D;&#x80FD;&#x591F;&#x89E3;&#x6790;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;&#xFF0C;&#x6240;&#x4EE5;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x9700;&#x8981;&#x628A;&#x4F9D;&#x8D56;&#x4E5F;&#x8FDB;&#x884C;&#x6253;&#x5305;&#x5904;&#x7406;&#xFF1B;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x4E0B;&#x5F15;&#x7528;&#x7684;&#x6587;&#x4EF6;&#x4E5F;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x4E0B;&#x9762;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x8868;&#x683C;&#x5BF9;&#x6BD4;&#x4E0B;</p><table><thead><tr><th></th><th>&#x6D4F;&#x89C8;&#x5668;&#xFF08;script,AMD,CMD&#xFF09;</th><th>&#x9884;&#x7F16;&#x8BD1;&#x5DE5;&#x5177;&#xFF08;webpack,rollup,fis&#xFF09;</th><th>Node</th></tr></thead><tbody><tr><td>&#x5F15;&#x7528;&#x6587;&#x4EF6;</td><td>index.aio.js</td><td>index.esm.js</td><td>index.js</td></tr><tr><td>&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6848;</td><td>UMD</td><td>ES Module</td><td>commonjs</td></tr><tr><td>&#x81EA;&#x8EAB;&#x4F9D;&#x8D56;</td><td>&#x6253;&#x5305;</td><td>&#x6253;&#x5305;</td><td>&#x6253;&#x5305;</td></tr><tr><td>&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;</td><td>&#x6253;&#x5305;</td><td>&#x4E0D;&#x6253;&#x5305;</td><td>&#x4E0D;&#x6253;&#x5305;</td></tr></tbody></table><p>*&#x6CE8;&#x610F;: legacy&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;ie6-8&#xFF0C;&#x4F46;&#x7531;&#x4E8E;rollup&#x7684;&#x4E00;&#x4E2A;[bug](<a href="https://github.com/rollup/rollup/issues/2088" rel="nofollow noreferrer" target="_blank">https://github.com/rollup/rol...</a><br>)&#xFF08;&#x8FD9;&#x4E2A;bug&#x662F;&#x6211;&#x53D1;&#x73B0;&#x7684;&#xFF0C;&#x4F46;rollup&#x5E76;&#x4E0D;&#x6253;&#x7B97;&#x4FEE;&#x590D;&#xFF0C;&#x256E;(&#x256F;&#x25BD;&#x2570;)&#x256D;&#x54CE;&#xFF09;&#xFF0C;legacy&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x4E0D;&#x53EF;&#x540C;&#x65F6;&#x4F7F;&#x7528; export &#x4E0E; export default*</p><h4>tree shaking</h4><p>rollup&#x662F;&#x5929;&#x7136;&#x652F;&#x6301;tree shaking&#xFF0C;tree shaking&#x53EF;&#x4EE5;&#x63D0;&#x51FA;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#x4E2D;&#x6CA1;&#x6709;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x8FD9;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;&#x975E;&#x5E38;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x53EF;&#x4EE5;&#x6781;&#x5927;&#x7684;&#x964D;&#x4F4E;&#x5305;&#x7684;&#x4F53;&#x79EF;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5047;&#x8BBE;index.js&#x53EA;&#x662F;&#x7528;&#x4E86;&#x7B2C;&#x4E09;&#x65B9;&#x5305;is.js&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;<code>isString</code>&#xFF0C;&#x6CA1;&#x6709;treeshaking&#x4F1A;&#x5C06;is.js&#x5168;&#x90E8;&#x5F15;&#x7528;&#x8FDB;&#x6765;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016613999?w=1266&amp;h=518" src="https://static.alili.tech/img/remote/1460000016613999?w=1266&amp;h=518" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x800C;&#x4F7F;&#x7528;&#x4E86;treeshaking&#x7684;&#x8BDD;&#x5219;&#x53EF;&#x4EE5;&#x5C06;is.js&#x4E2D;&#x7684;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x5254;&#x9664;&#xFF0C;&#x4EC5;&#x4FDD;&#x7559;<code>isString</code>&#x51FD;&#x6570;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016614000?w=1238&amp;h=524" src="https://static.alili.tech/img/remote/1460000016614000?w=1238&amp;h=524" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader9">&#x89C4;&#x8303;</h2><p>&#x65E0;&#x89C4;&#x77E9;&#x4E0D;&#x6210;&#x65B9;&#x5706;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5BF9;&#x4E8E;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#xFF0C;&#x7531;&#x4E8E;&#x4F1A;&#x6709;&#x591A;&#x4EBA;&#x53C2;&#x4E0E;&#xFF0C;&#x6240;&#x4EE5;&#x5927;&#x5BB6;&#x9075;&#x5B88;&#x4E00;&#x4EFD;&#x89C4;&#x8303;&#x4F1A;&#x4E8B;&#x534A;&#x529F;&#x500D;</p><h3 id="articleHeader10">&#x7F16;&#x8F91;&#x5668;&#x89C4;&#x8303;</h3><p>&#x9996;&#x5148;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>.editorconfig</code>&#x6765;&#x4FDD;&#x8BC1;&#x7F29;&#x8FDB;&#x3001;&#x6362;&#x884C;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x76EE;&#x524D;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;<a href="http://editorconfig.org/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></p><p>&#x4E0B;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x8BBE;&#x7F6E;&#x5728;js&#xFF0C;css&#x548C;html&#x4E2D;&#x90FD;&#x7528;&#x7A7A;&#x683C;&#x4EE3;&#x66FF;tab&#xFF0C;tab&#x4E3A;4&#x4E2A;&#x7A7A;&#x683C;&#xFF0C;&#x4F7F;&#x7528;unix&#x6362;&#x884C;&#x7B26;&#xFF0C;&#x4F7F;&#x7528;utf8&#x5B57;&#x7B26;&#x96C6;&#xFF0C;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x7ED3;&#x5C3E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7A7A;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root = true

[{*.js,*.css,*.html}]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
insert_final_newline = true

[{package.json,.*rc,*.yml}]
indent_style = space
indent_size = 2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ini"><code><span class="hljs-attr">root</span> = <span class="hljs-literal">true</span>
<span class="hljs-section">
[{*.js,*.css,*.html}]</span>
<span class="hljs-attr">indent_style</span> = space
<span class="hljs-attr">indent_size</span> = <span class="hljs-number">4</span>
<span class="hljs-attr">end_of_line</span> = lf
<span class="hljs-attr">charset</span> = utf-<span class="hljs-number">8</span>
<span class="hljs-attr">insert_final_newline</span> = <span class="hljs-literal">true</span>
<span class="hljs-section">
[{package.json,.*rc,*.yml}]</span>
<span class="hljs-attr">indent_style</span> = space
<span class="hljs-attr">indent_size</span> = <span class="hljs-number">2</span>
</code></pre><h3 id="articleHeader11">&#x4EE3;&#x7801;&#x98CE;&#x683C;</h3><p>&#x5176;&#x6B21;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;eslint&#x6765;&#x4FDD;&#x8BC1;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#x4E00;&#x81F4;&#xFF0C;&#x5173;&#x4E8E;eslint&#x7684;&#x5B89;&#x88C5;&#x548C;&#x914D;&#x7F6E;&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x5C55;&#x5F00;&#x89E3;&#x91CA;&#x4E86;&#xFF0C;&#x5728;jslib-base&#x4E2D;&#x53EA;&#x9700;&#x8981;&#x8FD0;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x547D;&#x4EE4;&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x6821;&#x9A8C;&#x4E86;&#xFF0C;eslint&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4F4D;&#x4E8E;<code>config/.eslintrc.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run lint" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">$ npm run lint</code></pre><h3 id="articleHeader12">&#x8BBE;&#x8BA1;&#x89C4;&#x8303;</h3><p>eslint&#x53EA;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x4EE3;&#x7801;&#x89C4;&#x8303;&#xFF0C;&#x5374;&#x4E0D;&#x80FD;&#x4FDD;&#x8BC1;&#x63D0;&#x4F9B;&#x4F18;&#x79C0;&#x7684;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;&#xFF0C;&#x5173;&#x4E8E;&#x51FD;&#x6570;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;&#x6709;&#x4E00;&#x4E9B;&#x6307;&#x5BFC;&#x89C4;&#x5219;</p><p>&#x53C2;&#x6570;&#x6570;&#x91CF;</p><ul><li>&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x6700;&#x591A;&#x4E0D;&#x8981;&#x8D85;&#x8FC7;5&#x4E2A;</li></ul><p>&#x53EF;&#x9009;&#x53C2;&#x6570;</p><ul><li>&#x53EF;&#x9009;&#x53C2;&#x6570;&#x5E94;&#x8BE5;&#x653E;&#x5230;&#x540E;&#x9762;</li><li>&#x53EF;&#x9009;&#x53C2;&#x6570;&#x6570;&#x91CF;&#x8D85;&#x8FC7;&#x4E09;&#x4E2A;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x4F20;&#x5165;</li><li>&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x5E94;&#x8BE5;&#x63D0;&#x4F9B;&#x9ED8;&#x8BA4;&#x503C;</li></ul><p>&#x53C2;&#x6570;&#x6821;&#x9A8C;&#x4E0E;&#x7C7B;&#x578B;&#x8F6C;&#x6362;</p><ul><li>&#x5FC5;&#x4F20;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x4F20;&#x8981;&#x62A5;&#x9519;</li><li>&#x5BF9;&#x4E0B;&#x5217;&#x7C7B;&#x578B;&#x8981;&#x505A;&#x5F3A;&#x5236;&#x68C0;&#x9A8C;&#xFF0C;&#x7C7B;&#x578B;&#x4E0D;&#x5BF9;&#x8981;&#x62A5;&#x9519;&#xFF08;object, array, function&#xFF09;</li><li>&#x5BF9;&#x4E0B;&#x5217;&#x7C7B;&#x578B;&#x8981;&#x505A;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#xFF08;number, string, boolean&#xFF09;</li><li>&#x5BF9;&#x4E8E;&#x590D;&#x5408;&#x7C7B;&#x578B;&#x7684;&#x5185;&#x90E8;&#x6570;&#x636E;&#xFF0C;&#x4E5F;&#x8981;&#x505A;&#x4E0A;&#x9762;&#x7684;&#x4E24;&#x4E2A;&#x6B65;&#x9AA4;</li><li>&#x5BF9;&#x4E8E;number&#x8F6C;&#x6362;&#x540E;&#x5982;&#x679C;&#x4E3A;NaN&#xFF0C;&#x8981;&#x505A;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF08;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x8D4B;&#x503C;&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x65E0;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x8981;&#x62A5;&#x9519;&#xFF09;</li></ul><p>&#x53C2;&#x6570;&#x7C7B;&#x578B;</p><ul><li>&#x53C2;&#x6570;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x503C;&#x7C7B;&#x578B;&#xFF08;&#x7B80;&#x5355;&#x7C7B;&#x578B;&#xFF09;</li><li>&#x53C2;&#x6570;&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x590D;&#x6742;&#x7C7B;&#x578B;&#xFF08;&#x907F;&#x514D;&#x526F;&#x4F5C;&#x7528;&#xFF09;</li><li>&#x4F7F;&#x7528;&#x590D;&#x6742;&#x7C7B;&#x578B;&#x65F6;&#xFF0C;&#x5C42;&#x7EA7;&#x4E0D;&#x8981;&#x8FC7;&#x6DF1;</li><li>&#x4F7F;&#x7528;&#x590D;&#x6742;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x65F6;&#xFF0C;&#x5E94;&#x8BE5;&#x8FDB;&#x884C;&#x6DF1;&#x62F7;&#x8D1D;&#xFF08;&#x907F;&#x514D;&#x526F;&#x4F5C;&#x7528;&#xFF09;</li></ul><p>&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;</p><ul><li>&#x8FD4;&#x56DE;&#x503C;&#x53EF;&#x8FD4;&#x56DE;&#x64CD;&#x4F5C;&#x7ED3;&#x679C;&#xFF08;&#x83B7;&#x53D6;&#x63A5;&#x53E3;&#xFF09;&#xFF0C;&#x64CD;&#x4F5C;&#x662F;&#x5426;&#x6210;&#x529F;&#xFF08;&#x4FDD;&#x5B58;&#x63A5;&#x53E3;&#xFF09;</li><li>&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x7C7B;&#x578B;&#x8981;&#x4FDD;&#x6301;&#x4E00;&#x81F4;</li><li>&#x8FD4;&#x56DE;&#x503C;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x503C;&#x7C7B;&#x578B;&#xFF08;&#x7B80;&#x5355;&#x7C7B;&#x578B;&#xFF09;</li><li>&#x8FD4;&#x56DE;&#x503C;&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x590D;&#x6742;&#x7C7B;&#x578B;&#xFF08;&#x907F;&#x514D;&#x526F;&#x4F5C;&#x7528;&#xFF09;</li></ul><h3 id="articleHeader13">&#x7248;&#x672C;&#x89C4;&#x8303;</h3><p>&#x7248;&#x672C;&#x5E94;&#x8BE5;&#x9075;&#x5B88;&#x5F00;&#x6E90;&#x793E;&#x533A;&#x901A;&#x7528;&#x7684;[&#x8BED;&#x4E49;&#x5316;&#x7248;&#x672C;](<a href="https://semver.org/lang/zh-CN/" rel="nofollow noreferrer" target="_blank">https://semver.org/lang/zh-CN/</a><br>)</p><p>&#x7248;&#x672C;&#x53F7;&#x683C;&#x5F0F;&#xFF1A;x.y.z</p><ul><li>x &#x4E3B;&#x7248;&#x672C;&#x53F7;&#xFF0C;&#x4E0D;&#x517C;&#x5BB9;&#x7684;&#x6539;&#x52A8;</li><li>y &#x6B21;&#x7248;&#x672C;&#x53F7;&#xFF0C;&#x517C;&#x5BB9;&#x7684;&#x6539;&#x52A8;</li><li>z &#x4FEE;&#x8BA2;&#x7248;&#x672C;&#x53F7;&#xFF0C;bug&#x4FEE;&#x590D;</li></ul><h3 id="articleHeader14">Git commit&#x89C4;&#x8303;</h3><p>&#x4EE3;&#x7801;&#x7684;&#x63D0;&#x4EA4;&#x5E94;&#x8BE5;&#x9075;&#x5B88;&#x89C4;&#x8303;&#xFF0C;&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x4E00;&#x4E2A;<a href="https://yanhaijing.com/git/2016/02/17/my-commit-message/" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;&#x89C4;&#x8303;</a></p><h2 id="articleHeader15">&#x6D4B;&#x8BD5;</h2><p>&#x6CA1;&#x6709;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x7684;&#x5E93;&#x90FD;&#x662F;&#x800D;&#x6D41;&#x6C13;&#xFF0C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x6BCF;&#x6B21;&#x4EA4;&#x4ED8;&#x90FD;&#x662F;&#x6709;&#x8D28;&#x91CF;&#x4FDD;&#x8BC1;&#x7684;&#xFF0C;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7531;&#x4E8E;&#x4E00;&#x6B21;&#x6027;&#x548C;&#x65F6;&#x95F4;&#x6210;&#x672C;&#x53EF;&#x4EE5;&#x4E0D;&#x505A;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x4F46;&#x5F00;&#x6E90;&#x5E93;&#x7531;&#x4E8E;&#x9700;&#x8981;&#x53CD;&#x590D;&#x8FED;&#x4EE3;&#xFF0C;&#x5BF9;&#x8D28;&#x91CF;&#x8981;&#x6C42;&#x53C8;&#x6781;&#x9AD8;&#xFF0C;&#x6240;&#x4EE5;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x662F;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;</p><p>&#x5173;&#x4E8E;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x6709;&#x5F88;&#x591A;&#x6280;&#x672F;&#x65B9;&#x6848;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x79CD;&#x9009;&#x62E9;&#x662F;[mocha](<a href="https://mochajs.org/" rel="nofollow noreferrer" target="_blank">https://mochajs.org/</a><br>)+[chai](<a href="http://www.chaijs.com/" rel="nofollow noreferrer" target="_blank">http://www.chaijs.com/</a><br>)&#xFF0C;mocha&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#xFF0C;&#x7528;&#x6765;&#x7EC4;&#x7EC7;&#x3001;&#x8FD0;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x5E76;&#x8F93;&#x51FA;&#x6D4B;&#x8BD5;&#x62A5;&#x544A;&#xFF1B;chai&#x662F;&#x4E00;&#x4E2A;&#x65AD;&#x8A00;&#x5E93;&#xFF0C;&#x7528;&#x6765;&#x505A;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x7684;&#x65AD;&#x8A00;&#x529F;&#x80FD;</p><p>&#x7531;&#x4E8E;chai&#x4E0D;&#x80FD;&#x591F;&#x517C;&#x5BB9;ie6-8&#xFF0C;&#x6240;&#x4EE5;&#x9009;&#x62E9;&#x4E86;&#x53E6;&#x4E00;&#x4E2A;&#x65AD;&#x8A00;&#x5E93;&#x2014;&#x2014;<a href="http://chaijs.com/" rel="nofollow noreferrer" target="_blank">expect.js</a>&#xFF0C;expect&#x662F;&#x4E00;&#x4E2A;BDD&#x65AD;&#x8A00;&#x5E93;&#xFF0C;&#x517C;&#x5BB9;&#x6027;&#x975E;&#x5E38;&#x597D;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x9009;&#x62E9;&#x7684;&#x662F;mocha+expect.js</p><p><em>&#x5173;&#x4E8E;BDD&#x4E0E;TDD&#x7684;&#x533A;&#x522B;&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x67E5;&#x9605;&#x76F8;&#x5173;&#x8D44;&#x6599;</em></p><p>&#x6709;&#x4E86;&#x6D4B;&#x8BD5;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5199;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expect = require(&apos;expect.js&apos;);

var base = require(&apos;../dist/index.js&apos;);

describe(&apos;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&apos;, function() {
    describe(&apos;&#x529F;&#x80FD;1&apos;, function() {
        it(&apos;&#x76F8;&#x7B49;&apos;, function() {
            expect(1).to.equal(1);
        });
    });
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> expect = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;expect.js&apos;</span>);

<span class="hljs-keyword">var</span> base = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../dist/index.js&apos;</span>);

describe(<span class="hljs-string">&apos;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">&apos;&#x529F;&#x80FD;1&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">&apos;&#x76F8;&#x7B49;&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            expect(<span class="hljs-number">1</span>).to.equal(<span class="hljs-number">1</span>);
        });
    });
});
</code></pre><p>&#x7136;&#x540E;&#x53EA;&#x9700;&#x8FD0;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x547D;&#x4EE4;&#xFF0C;mocha&#x4F1A;&#x81EA;&#x52A8;&#x8FD0;&#x884C;test&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x7684;js&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mocha" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">$ mocha</code></pre><p>mocha&#x652F;&#x6301;&#x5728;node&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6D4B;&#x8BD5;&#xFF0C;&#x4F46;&#x4E0A;&#x9762;&#x7684;&#x6846;&#x67B6;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x6CA1;&#x6CD5;&#x652F;&#x6301;<code>require(&apos;expect.js&apos;)</code>&#xFF0C;&#x6211;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;hack&#x7684;&#x65B9;&#x6CD5;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x65E9;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x4E86;require&#x7684;&#x542B;&#x4E49;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;../../node_modules/mocha/mocha.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;../../node_modules/expect.js/index.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    var libs = {
        &apos;expect.js&apos;: expect,
        &apos;../dist/index.js&apos;: jslib_base
    };
    var require = function(path) {
        return libs[path];
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;../../node_modules/mocha/mocha.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;../../node_modules/expect.js/index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> libs = {
        <span class="hljs-string">&apos;expect.js&apos;</span>: expect,
        <span class="hljs-string">&apos;../dist/index.js&apos;</span>: jslib_base
    };
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">require</span> = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
        <span class="hljs-keyword">return</span> libs[path];
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x4E0B;&#x9762;&#x662F;&#x7528;mocha&#x751F;&#x6210;&#x6D4B;&#x8BD5;&#x62A5;&#x544A;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5DE6;&#x8FB9;&#x662F;&#x5728;node&#x4E2D;&#xFF0C;&#x53F3;&#x8FB9;&#x662F;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016614001?w=1539&amp;h=1049" src="https://static.alili.tech/img/remote/1460000016614001?w=1539&amp;h=1049" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader16">&#x53EF;&#x6301;&#x7EED;&#x96C6;&#x6210;</h2><p>&#x6CA1;&#x6709;&#x53EF;&#x6301;&#x7EED;&#x96C6;&#x6210;&#x7684;&#x5E93;&#x90FD;&#x662F;&#x539F;&#x59CB;&#x4EBA;&#xFF0C;&#x5982;&#x679C;&#x6BCF;&#x6B21;push&#x90FD;&#x80FD;&#x591F;&#x81EA;&#x52A8;&#x8FD0;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x5C31;&#x597D;&#x4E86;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x7701;&#x53BB;&#x4E86;&#x624B;&#x52A8;&#x8FD0;&#x884C;&#x7684;&#x7E41;&#x7410;&#xFF0C;&#x597D;&#x5728;[travis-ci](<a href="https://www.travis-ci.org/" rel="nofollow noreferrer" target="_blank">https://www.travis-ci.org/</a><br>)&#x5DF2;&#x7ECF;&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;</p><p>&#x7528;GitHub&#x767B;&#x5F55;travis-ci&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x81EA;&#x5DF1;&#x5728;GitHub&#x4E0A;&#x7684;&#x9879;&#x76EE;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x9700;&#x8981;&#x6253;&#x5F00;&#x4E0B;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x5173;&#xFF0C;&#x624D;&#x80FD;&#x591F;&#x6253;&#x5F00;&#x81EA;&#x52A8;&#x96C6;&#x6210;&#x529F;&#x80FD;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016614002?w=1326&amp;h=718" src="https://static.alili.tech/img/remote/1460000016614002?w=1326&amp;h=718" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;<code>.travis.yml</code>&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6BCF;&#x6B21;push&#x65F6;&#x81EA;&#x52A8;&#x5728;node 4 6 8&#x7248;&#x672C;&#x4E0B;&#x8FD0;&#x884C;<code>npm test</code>&#x547D;&#x4EE4;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x81EA;&#x52A8;&#x6D4B;&#x8BD5;&#x7684;&#x76EE;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: node_js
node_js:
  - &quot;8&quot;
  - &quot;6&quot;
  - &quot;4&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>language: node_js
node_js:
  -<span class="ruby"> <span class="hljs-string">&quot;8&quot;</span>
</span>  -<span class="ruby"> <span class="hljs-string">&quot;6&quot;</span>
</span>  -<span class="ruby"> <span class="hljs-string">&quot;4&quot;</span></span></code></pre><h2 id="articleHeader17">&#x5176;&#x4ED6;&#x5185;&#x5BB9;</h2><p>&#x5F00;&#x6E90;&#x5E93;&#x5E0C;&#x671B;&#x5F97;&#x5230;&#x7528;&#x6237;&#x7684;&#x53CD;&#x9988;&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x7528;&#x6237;&#x63D0;&#x7684;issue&#x6709;&#x8981;&#x6C42;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6A21;&#x7248;&#xFF0C;&#x7528;&#x6765;&#x89C4;&#x8303;github&#x4E0A;&#x7528;&#x6237;&#x53CD;&#x9988;&#x7684;issue&#x9700;&#x8981;&#x5236;&#x5B9A;&#x4E00;&#x4E9B;&#x4FE1;&#x606F;</p><p>&#x901A;&#x8FC7;&#x63D0;&#x4F9B;<code>.github/ISSUE_TEMPLATE</code>&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x7ED9;issue&#x63D0;&#x4F9B;&#x6A21;&#x7248;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x7528;&#x6237;&#x63D0;issue&#x65F6;&#x4F1A;&#x81EA;&#x52A8;&#x5E26;&#x4E0A;&#x5982;&#x4E0B;&#x7684;&#x63D0;&#x793A;&#x4FE1;&#x606F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="### &#x95EE;&#x9898;&#x662F;&#x4EC0;&#x4E48;
&#x95EE;&#x9898;&#x7684;&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#xFF0C;&#x5C3D;&#x91CF;&#x8BE6;&#x7EC6;

### &#x73AF;&#x5883;
- &#x624B;&#x673A;: &#x5C0F;&#x7C73;6
- &#x7CFB;&#x7EDF;&#xFF1A;&#x5B89;&#x5353;7.1.1
- &#x6D4F;&#x89C8;&#x5668;&#xFF1A;chrome 61
- jslib-base&#x7248;&#x672C;&#xFF1A;0.2.0
- &#x5176;&#x4ED6;&#x7248;&#x672C;&#x4FE1;&#x606F;

### &#x5728;&#x7EBF;&#x4F8B;&#x5B50;
&#x5982;&#x679C;&#x6709;&#x8BF7;&#x63D0;&#x4F9B;&#x5728;&#x7EBF;&#x4F8B;&#x5B50;

### &#x5176;&#x4ED6;
&#x5176;&#x4ED6;&#x4FE1;&#x606F;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>### &#x95EE;&#x9898;&#x662F;&#x4EC0;&#x4E48;
&#x95EE;&#x9898;&#x7684;&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#xFF0C;&#x5C3D;&#x91CF;&#x8BE6;&#x7EC6;

### &#x73AF;&#x5883;
- &#x624B;&#x673A;: &#x5C0F;&#x7C73;<span class="hljs-number">6</span>
- &#x7CFB;&#x7EDF;&#xFF1A;&#x5B89;&#x5353;<span class="hljs-number">7.1</span><span class="hljs-number">.1</span>
- &#x6D4F;&#x89C8;&#x5668;&#xFF1A;chrome <span class="hljs-number">61</span>
- jslib-base&#x7248;&#x672C;&#xFF1A;<span class="hljs-number">0.2</span><span class="hljs-number">.0</span>
- &#x5176;&#x4ED6;&#x7248;&#x672C;&#x4FE1;&#x606F;

### &#x5728;&#x7EBF;&#x4F8B;&#x5B50;
&#x5982;&#x679C;&#x6709;&#x8BF7;&#x63D0;&#x4F9B;&#x5728;&#x7EBF;&#x4F8B;&#x5B50;

### &#x5176;&#x4ED6;
&#x5176;&#x4ED6;&#x4FE1;&#x606F;
</code></pre><h2 id="articleHeader18">jsmini</h2><p><a href="https://github.com/jsmini" rel="nofollow noreferrer" target="_blank">jsmini</a>&#x662F;&#x57FA;&#x4E8E;jslib-base&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x5E93;&#xFF0C;jsmini&#x7684;&#x7406;&#x5FF5;&#x662F;&#x5C0F;&#x800C;&#x7F8E;&#xFF0C;&#x5E76;&#x4E14;&#x65E0;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;&#xFF0C;&#x5F00;&#x6E90;&#x4E86;&#x5F88;&#x591A;&#x80FD;&#x529B;&#xFF0C;&#x80FD;&#x591F;<br>&#x52A9;&#x529B;&#x5E93;&#x5F00;&#x53D1;&#x8005;</p><h2 id="articleHeader19">&#x603B;&#x7ED3;</h2><p>&#x4E94;&#x5E74;&#x5F39;&#x6307;&#x4E00;&#x6325;&#x95F4;&#xFF0C;&#x672C;&#x6587;&#x603B;&#x7ED3;&#x4E86;&#x81EA;&#x5DF1;&#x505A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x7684;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x5927;&#x5BB6;&#xFF0C;&#x6240;&#x6709;&#x4ECB;&#x7ECD;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x53EF;&#x4EE5;&#x5728;<a href="https://github.com/yanhaijing/jslib-base" rel="nofollow noreferrer" target="_blank">jslib-base</a>&#x91CC;&#x9762;&#x627E;&#x5230;</p><p>jslib-base&#x662F;&#x4E00;&#x4E2A;&#x62FF;&#x6765;&#x5373;&#x7528;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x8D4B;&#x80FD;js&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x5F00;&#x6E90;&#xFF0C;&#x5FEB;&#x901F;&#x5F00;&#x6E90;&#x4E00;&#x4E2A;&#x6807;&#x51C6;&#x7684;js&#x5E93;</p><p>&#x6700;&#x540E;&#x518D;&#x9001;&#x7ED9;&#x5927;&#x5BB6;&#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x5F00;&#x6E90;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;<code>&#x91CD;&#x5728;&#x5F00;&#x59CB;&#xFF0C;&#x8D35;&#x5728;&#x575A;&#x6301;</code></p><p>&#x6700;&#x540E;&#x63A8;&#x8350;&#x4E0B;&#x6211;&#x7684;&#x65B0;&#x4E66;&#x300A;React&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4E0E;&#x540C;&#x6784;&#x5B9E;&#x6218;&#x300B;&#xFF0C;&#x6DF1;&#x5165;&#x89E3;&#x8BFB;&#x524D;&#x6CBF;&#x540C;&#x6784;&#x6280;&#x672F;&#xFF0C;&#x611F;&#x8C22;&#x5927;&#x5BB6;&#x652F;&#x6301;</p><p>&#x4EAC;&#x4E1C;&#xFF1A;<a href="https://item.jd.com/12403508.html" rel="nofollow noreferrer" target="_blank">https://item.jd.com/12403508.html</a></p><p>&#x5F53;&#x5F53;&#xFF1A;<a href="http://product.dangdang.com/25308679.html" rel="nofollow noreferrer" target="_blank">http://product.dangdang.com/25308679.html</a></p><p>&#x6700;&#x540E;&#x6700;&#x540E;&#x62DB;&#x8058;&#x524D;&#x7AEF;&#xFF0C;&#x540E;&#x7AEF;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x5566;&#xFF01;&#x5730;&#x70B9;&#xFF1A;&#x5317;&#x4EAC;+&#x4E0A;&#x6D77;+&#x6210;&#x90FD;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x7B80;&#x5386;&#x53D1;&#x5230;&#x6211;&#x7684;&#x90AE;&#x7BB1;&#xFF1A; yanhaijing@yeah.net</p><p>&#x539F;&#x6587;&#x7F51;&#x5740;&#xFF1A;<a href="http://yanhaijing.com/javascript/2018/08/17/2020-js-lib/" rel="nofollow noreferrer" target="_blank">http://yanhaijing.com/javascr...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2020年如何写一个现代的JavaScript库

## 原文链接
[https://segmentfault.com/a/1190000016610626](https://segmentfault.com/a/1190000016610626)


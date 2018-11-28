---
title: 'vue中使用第三方UI库的移动端rem适配方案' 
date: 2018-11-29 2:30:09
hidden: true
slug: h8x1guu8h6a
categories: [reprint]
---

{{< raw >}}
<p>&#x9700;&#x6C42;&#xFF1A;&#x4F7F;&#x7528;vue-cli&#x811A;&#x624B;&#x67B6;&#x642D;&#x5EFA;&#x9879;&#x76EE;&#xFF0C;&#x5E76;&#x4E14;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x7684;UI&#x5E93;&#xFF08;&#x6BD4;&#x5982;vant&#xFF0C;mint ui&#xFF09;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x56E0;&#x4E3A;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x7528;&#x7684;&#x90FD;&#x662F;&#x7528;px&#x5355;&#x4F4D;&#xFF0C;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;rem&#x9002;&#x914D;&#x4E0D;&#x540C;&#x8BBE;&#x5907;&#x7684;&#x5C4F;&#x5E55;&#x3002;</p><p>&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;&#x4F7F;&#x7528;px2rem-loader&#x63D2;&#x4EF6;&#x5C06;&#x7B2C;&#x4E09;&#x65B9;ui&#x5E93;&#x7684;px&#x8F6C;&#x6362;&#x6210;rem&#x5355;&#x4F4D;&#x3002;</p><p>(1) npm install px2rem-loader --save-dev &#x5B89;&#x88C5;&#x63D2;&#x4EF6;<br>(2)&#x7136;&#x540E;&#x5728;vue-cli&#x9879;&#x76EE;&#x627E;&#x5230;built/utils&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x91CC;&#x9762;&#x52A0;&#x4E0A;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var px2remLoader = {
  loader: &apos;px2rem-loader&apos;,
  options: {
    remUnit: 75     // (&#x8FD9;&#x91CC;&#x662F;&#x6307;&#x8BBE;&#x8BA1;&#x7A3F;&#x7684;&#x5BBD;&#x5EA6;&#x4E3A; 750 / 10)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> px2remLoader = {
  loader: <span class="hljs-string">&apos;px2rem-loader&apos;</span>,
  options: {
    remUnit: <span class="hljs-number">75</span>     <span class="hljs-comment">// (&#x8FD9;&#x91CC;&#x662F;&#x6307;&#x8BBE;&#x8BA1;&#x7A3F;&#x7684;&#x5BBD;&#x5EA6;&#x4E3A; 750 / 10)</span>
  }
}</code></pre><p>&#x7136;&#x540E;&#x5728;generateLoaders&#x51FD;&#x6570;&#x91CC;&#x9762;&#x63D2;&#x5165;px2remLoader &#xFF0C;&#x518D;&#x91CD;&#x542F; npm run dev&#x670D;&#x52A1;&#x5373;&#x53EF;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbb6kG?w=553&amp;h=248" src="https://static.alili.tech/img/bVbb6kG?w=553&amp;h=248" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#xFF08;3&#xFF09;&#x628A;px&#x8F6C;&#x6362;&#x6210;rem&#x7684;&#x914D;&#x7F6E;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF08;main.js&#xFF09;&#x91CC;&#x9762;&#x914D;&#x7F6E;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x6B64;&#x4EE3;&#x7801;&#x7684;&#x76EE;&#x7684;&#x662F;&#x76D1;&#x542C;window&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x4ECE;&#x800C;&#x52A8;&#x6001;&#x6539;&#x53D8;html&#x6839;&#x8282;&#x70B9;&#x7684;font-size&#x7684;&#x5927;&#x5C0F;&#x3002;&#x8FBE;&#x5230;&#x9002;&#x914D;&#x4E0D;&#x540C;&#x8BBE;&#x5907;&#x7684;&#x6548;&#x679C;&#xFF1B;&#xFF08;&#x6CE8;&#x610F;&#xFF1A;&#x4E0D;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x52A8;&#x6001;&#x6539;&#x53D8;html&#x6839;&#x8282;&#x70B9;&#x7684;font-size&#x7684;&#x8BDD;&#xFF0C;&#x5EFA;&#x8BAE;&#x53BB;&#x770B;&#x4E00;&#x4E0B;rem&#x7684;&#x77E5;&#x8BC6;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName(&apos;html&apos;)[0];
    htmlDom.style.fontSize = htmlWidth / 10 + &apos;px&apos;;
};
setHtmlFontSize();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onresize = setHtmlFontSize;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setHtmlFontSize</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">const</span> htmlWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth;
    <span class="hljs-keyword">const</span> htmlDom = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;html&apos;</span>)[<span class="hljs-number">0</span>];
    htmlDom.style.fontSize = htmlWidth / <span class="hljs-number">10</span> + <span class="hljs-string">&apos;px&apos;</span>;
};
setHtmlFontSize();
</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x662F;&#x4E3A;&#x4E86;&#x5F53;&#x7B2C;&#x4E00;&#x6B21;&#x52A0;&#x8F7D;main.js&#x7684;&#x65F6;&#x5019;&#x5C31;&#x8BBE;&#x7F6E;&#x6839;&#x8282;&#x70B9;&#x7684;&#xFF08;html&#x8282;&#x70B9;&#xFF09;font-size&#x3002;&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x73B0;&#x6DF7;&#x4E71;&#x9875;&#x9762;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbb6kO?w=554&amp;h=243" src="https://static.alili.tech/img/bVbb6kO?w=554&amp;h=243" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中使用第三方UI库的移动端rem适配方案

## 原文链接
[https://segmentfault.com/a/1190000015238394](https://segmentfault.com/a/1190000015238394)


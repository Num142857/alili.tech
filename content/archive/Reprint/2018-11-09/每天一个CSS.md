---
title: 每天一个CSS
hidden: true
categories: reprint
slug: d69504ed
date: 2018-11-09 02:30:06
---

{{< raw >}}
<h2 id="articleHeader0">&#x6BCF;&#x5929;&#x575A;&#x6301;&#x4E00;&#x4E2A;CSS-------&#x6EDA;&#x52A8;&#x6587;&#x5B57;</h2><h3 id="articleHeader1">&#x6548;&#x679C;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000016412993?w=257&amp;h=124" src="https://static.alili.tech/img/remote/1460000016412993?w=257&amp;h=124" alt="" title="" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&#x56FE;&#x7247;&#x63CF;&#x8FF0;&#xFF1A;&#x7BAD;&#x5934;&#x6307;&#x5411;&#x90E8;&#x5206;&#xFF0C;&#x4EE5;&#x767D;&#x8272;&#x4E3A;&#x80CC;&#x666F;&#xFF0C;&#x4ECE;&#x5DE6;&#x5411;&#x53F3;&#x6EDA;&#x52A8;&#x3002;&#xFF08;&#x4E0D;&#x9002;&#x7528;&#x4E8E;IE&#xFF09;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>
&#x56FE;&#x7247;&#x63CF;&#x8FF0;&#xFF1A;&#x7BAD;&#x5934;&#x6307;&#x5411;&#x90E8;&#x5206;&#xFF0C;&#x4EE5;&#x767D;&#x8272;&#x4E3A;&#x80CC;&#x666F;&#xFF0C;&#x4ECE;&#x5DE6;&#x5411;&#x53F3;&#x6EDA;&#x52A8;&#x3002;&#xFF08;&#x4E0D;&#x9002;&#x7528;&#x4E8E;IE&#xFF09;
</code></pre><h3 id="articleHeader2">&#x4EE3;&#x7801;</h3><h4>html</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;   
&#x4F8B;&#x5B50;&#xFF1A;
&lt;div class=&quot;box&quot;&gt;
&lt;span class=&quot;box-text&quot;&gt;&#x6EDA;&#x52A8;&#x7684;&#x6587;&#x5B57;&#xFF0C;&#x6211;&#x662F;&#x6EDA;&#x52A8;&#x7684;&#x6587;&#x5B57;&lt;/span&gt;
&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;   
&#x4F8B;&#x5B50;&#xFF1A;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;
&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;box-text&quot;</span>&gt;&#x6EDA;&#x52A8;&#x7684;&#x6587;&#x5B57;&#xFF0C;&#x6211;&#x662F;&#x6EDA;&#x52A8;&#x7684;&#x6587;&#x5B57;&lt;/span&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre><h4>CSS</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    height: auto;
    background-color: blue;
}

.box-text{
    color: white;
    background: -ms-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
    background: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: slidetounlock 3s infinite;
    -webkit-animation: slidetounlock 3s infinite;
}

@-webkit-keyframes slidetounlock{
    0%  {
        background-position:-200px 0
    }
    
    100% {
        background-position:200px 0
    }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">height</span>: auto;
    <span class="hljs-attribute">background-color</span>: blue;
}

<span class="hljs-selector-class">.box-text</span>{
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-ms-gradient</span>(linear,left top,right top,color-stop(0,#4d4d4d),<span class="hljs-built_in">color-stop</span>(.4,#4d4d4d),<span class="hljs-built_in">color-stop</span>(.5,#fff),<span class="hljs-built_in">color-stop</span>(.6,#4d4d4d),<span class="hljs-built_in">color-stop</span>(1,#4d4d4d));
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-gradient</span>(linear,left top,right top,color-stop(0,#4d4d4d),<span class="hljs-built_in">color-stop</span>(.4,#4d4d4d),<span class="hljs-built_in">color-stop</span>(.5,#fff),<span class="hljs-built_in">color-stop</span>(.6,#4d4d4d),<span class="hljs-built_in">color-stop</span>(1,#4d4d4d));
    <span class="hljs-attribute">background-clip</span>: text;
    <span class="hljs-attribute">-webkit-text-fill-color</span>: transparent;
    <span class="hljs-attribute">animation</span>: slidetounlock <span class="hljs-number">3s</span> infinite;
    <span class="hljs-attribute">-webkit-animation</span>: slidetounlock <span class="hljs-number">3s</span> infinite;
}

@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> slidetounlock{
    0%  {
        <span class="hljs-attribute">background-position</span>:-<span class="hljs-number">200px</span> <span class="hljs-number">0</span>
    }
    
    100% {
        <span class="hljs-attribute">background-position</span>:<span class="hljs-number">200px</span> <span class="hljs-number">0</span>
    }
}

</code></pre><h2 id="articleHeader3">&#x5B9E;&#x73B0;&#x539F;&#x7406;</h2><p>1&#x3001;&#x52A8;&#x753B;&#x6548;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@-webkit-keyframes" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span></code></pre><p>&#x5B9A;&#x4E49;&#x4E00;&#x7EC4;&#x52A8;&#x753B;&#xFF0C;&#x5728;&#x672C;&#x52A8;&#x753B;&#x4E2D;&#xFF0C;&#x5C06;&#x80CC;&#x666F;&#x7684;&#x4F4D;&#x7F6E;&#x8FDB;&#x884C;&#x4E86;&#x6539;&#x53D8;&#xFF08;&#x6CE8;&#x610F;&#x662F;&#x6587;&#x672C;&#x7684;&#x4F4D;&#x7F6E;&#xFF09;</p><p>2&#x3001;&#x80CC;&#x666F;&#x4E3A;&#x4F55;&#x9009;&#x62E9;&#x5230;&#x6587;&#x672C;&#x800C;&#x4E0D;&#x662F;&#x6574;&#x5757;&#x80CC;&#x666F;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background-clip: text;

&#x4F5C;&#x7528;&#xFF1A;&#x6307;&#x5B9A;&#x7ED8;&#x56FE;&#x533A;&#x7684;&#x80CC;&#x666F;
&#x9664;&#x4E86;text&#x5916;&#xFF0C;&#x8FD8;&#x5305;&#x62EC; &#xFF1A;border-box|padding-box|content-box;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code><span class="hljs-attribute">background-clip</span>: text;

<span class="maxima">&#x4F5C;&#x7528;&#xFF1A;&#x6307;&#x5B9A;&#x7ED8;&#x56FE;&#x533A;&#x7684;&#x80CC;&#x666F;
&#x9664;&#x4E86;text&#x5916;&#xFF0C;&#x8FD8;&#x5305;&#x62EC; &#xFF1A;<span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>|padding-<span class="hljs-built_in">box</span>|<span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span>;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;
</span></code></pre><p>3&#x3001;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x4E00;&#x5C0F;&#x6BB5;&#x7684;&#x53D8;&#x5316;&#x6548;&#x679C;&#x7684;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gradient()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">gradient</span><span class="hljs-params">()</span></span>
</code></pre><p>&#x4F5C;&#x7528;&#xFF1A;&#x6E10;&#x53D8;<br>&#x4ECE;&#x5B9E;&#x9645;&#x6548;&#x679C;&#x4E2D;&#x770B;&#x5230;&#xFF0C;&#x767D;&#x8272;&#x90E8;&#x5206;&#x4E4B;&#x5916;&#x90FD;&#x662F;&#x7070;&#x8272;&#xFF0C;&#x8D8A;&#x662F;&#x9760;&#x8FD1;&#x767D;&#x8272;&#xFF0C;&#x5C31;&#x8D8A;&#x767D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-ms-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
&#x8BF4;&#x660E;&#xFF1A;&#x6E10;&#x53D8;&#x7C7B;&#x578B;&#xFF0C;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#xFF08;z=x*y&#xFF09;
to left&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4E3A;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: 270deg
to right&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: 90deg
to top&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4ECE;&#x4E0B;&#x5230;&#x4E0A;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: 0deg
to bottom&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: 180deg&#x3002;&#x8FD9;&#x662F;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x7B49;&#x540C;&#x4E8E;&#x7559;&#x7A7A;&#x4E0D;&#x5199;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vbscript"><code>-ms-gradient(linear,<span class="hljs-built_in">left</span> top,<span class="hljs-built_in">right</span> top,color-<span class="hljs-keyword">stop</span>(<span class="hljs-number">0</span>,#<span class="hljs-number">4</span>d4d4d),color-<span class="hljs-keyword">stop</span>(<span class="hljs-number">.4</span>,#<span class="hljs-number">4</span>d4d4d),color-<span class="hljs-keyword">stop</span>(<span class="hljs-number">.5</span>,#fff),color-<span class="hljs-keyword">stop</span>(<span class="hljs-number">.6</span>,#<span class="hljs-number">4</span>d4d4d),color-<span class="hljs-keyword">stop</span>(<span class="hljs-number">1</span>,#<span class="hljs-number">4</span>d4d4d));
&#x8BF4;&#x660E;&#xFF1A;&#x6E10;&#x53D8;&#x7C7B;&#x578B;&#xFF0C;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#xFF08;z=x*y&#xFF09;
<span class="hljs-keyword">to</span> <span class="hljs-built_in">left</span>&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4E3A;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: <span class="hljs-number">270</span>deg
<span class="hljs-keyword">to</span> <span class="hljs-built_in">right</span>&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: <span class="hljs-number">90</span>deg
<span class="hljs-keyword">to</span> top&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4ECE;&#x4E0B;&#x5230;&#x4E0A;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: <span class="hljs-number">0</span>deg
<span class="hljs-keyword">to</span> bottom&#xFF1A;
&#x8BBE;&#x7F6E;&#x6E10;&#x53D8;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#x3002;&#x76F8;&#x5F53;&#x4E8E;: <span class="hljs-number">180</span>deg&#x3002;&#x8FD9;&#x662F;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x7B49;&#x540C;&#x4E8E;&#x7559;&#x7A7A;&#x4E0D;&#x5199;&#x3002;</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x6E10;&#x53D8;&#x5B57;&#x4F53;&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-text-fill-color: transparent;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code style="word-break:break-word;white-space:initial">-webkit-<span class="hljs-built_in">text</span>-<span class="hljs-built_in">fill</span>-<span class="hljs-built_in">color</span>: transparent;</code></pre><p>&#x5B57;&#x4F53;&#x586B;&#x5145;&#x989C;&#x8272;&#xFF1A;&#x7EE7;&#x627F;&#x4E0E;&#x80CC;&#x666F;&#xFF0C;&#x6240;&#x4EE5;&#x5B57;&#x4F53;&#x989C;&#x8272;&#x4E3A;&#x8BBE;&#x7F6E;&#x7684;box-text&#x7684;background ,&#x800C;&#x975E;box&#x7684;&#x80CC;&#x666F;&#x989C;&#x8272;&#x3002;</p><p>&#x5C31;&#x8FD9;&#x6837;&#x52A0;&#x4E0A;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x5FAA;&#x73AF;&#x79FB;&#x52A8;&#xFF0C;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#x3002;</p><p>PS:&#x6B22;&#x8FCE;&#x4E00;&#x8D77;&#x5B66;&#x4E60;&#xFF0C;&#x7B49;&#x670D;&#x52A1;&#x5668;&#x5907;&#x6848;&#x901A;&#x8FC7;&#xFF0C;&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x6848;&#x4F8B;&#x53D1;&#x5E03;&#x81F3;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
每天一个CSS

## 原文链接
[https://segmentfault.com/a/1190000016412990](https://segmentfault.com/a/1190000016412990)


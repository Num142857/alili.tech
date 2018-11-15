---
title: 利用HTML5，无JS实现各种交互效果
reprint: true
categories: reprint
abbrlink: d886bfab
date: 2018-11-03 10:03:44
---

{{% raw %}}
<blockquote>&#x672C;&#x6587;&#x5229;&#x7528;&#x7684;&#x662F;HTML5 details, summary</blockquote><p>&#x9996;&#x5148;</p><p>&#x4E00;&#x3001;&#x4E86;&#x89E3;HTML5 details, summary&#x9ED8;&#x8BA4;&#x4EA4;&#x4E92;&#x884C;&#x4E3A;</p><p><code>&lt;details&gt;</code> &#x6807;&#x7B7E;&#x5728;Chrome&#xFF0C;Firefox&#x7B49;&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x9ED8;&#x8BA4;&#x662F;&#x6709;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x884C;&#x4E3A;&#x7684;&#xFF0C;&#x4F8B;&#x5982;&#x4E0B;&#x9762;HTML&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details&gt;

    &lt;summary&gt;&#x8FD9;&#x662F;&#x6458;&#x8981;1&lt;/summary&gt;

    &lt;p&gt;&#x8FD9;&#x91CC;&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#xFF0C;&#x6807;&#x7B7E;&#x76F8;&#x5BF9;&#x968F;&#x610F;&#xFF0C;&#x4F8B;&#x5982;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&amp;lt;p&amp;gt;&#x6807;&#x7B7E;&#x3002;&lt;/p&gt;

&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-params">&lt;details&gt;</span>

    <span class="hljs-params">&lt;summary&gt;</span>&#x8FD9;&#x662F;&#x6458;&#x8981;<span class="hljs-number">1</span><span class="hljs-params">&lt;/summary&gt;</span>

    <span class="hljs-params">&lt;p&gt;</span>&#x8FD9;&#x91CC;&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#xFF0C;&#x6807;&#x7B7E;&#x76F8;&#x5BF9;&#x968F;&#x610F;&#xFF0C;&#x4F8B;&#x5982;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;<span class="hljs-variable">&amp;lt</span>;p<span class="hljs-variable">&amp;gt</span>;&#x6807;&#x7B7E;&#x3002;<span class="hljs-params">&lt;/p&gt;</span>

<span class="hljs-params">&lt;/details&gt;</span>
</code></pre><p>&#x7ED3;&#x679C;UI&#x8868;&#x73B0;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718881" src="https://static.alili.tech/img/remote/1460000016718881" alt="details&#x6807;&#x7B7E;&#x9ED8;&#x8BA4;&#x6548;&#x679C;&#x622A;&#x56FE;" title="details&#x6807;&#x7B7E;&#x9ED8;&#x8BA4;&#x6548;&#x679C;&#x622A;&#x56FE;" style="cursor:pointer;display:inline"></span></p><p>&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#x4E3A;&#xFF1A;</p><ol><li>&#x53EA;&#x663E;&#x793A;&#x4E86;<code>&lt;summary&gt;</code>&#x6807;&#x7B7E;&#x5185;&#x5BB9;&#xFF0C;&#x800C;<code>&lt;p&gt;</code>&#x9ED8;&#x8BA4;&#x9690;&#x85CF;&#x4E86;&#xFF1B;</li><li><code>&lt;summary&gt;</code>&#x6807;&#x7B7E;&#x524D;&#x9762;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x5C0F;&#x4E09;&#x89D2;&#xFF1B;</li></ol><p>&#x5C0F;&#x4E09;&#x89D2;&#x56FE;&#x5F62;&#x7684;&#x9690;&#x55BB;&#x662F;&#xFF1A;&#x6211;&#x662F;&#x53EF;&#x70B9;&#x51FB;&#x7684;&#xFF0C;&#x70B9;&#x51FB;&#x6211;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x5B9D;&#x7BB1;&#x3002;</p><p>OK&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x5C31;&#x70B9;&#x51FB;&#x4E00;&#x4E0B;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718882" src="https://static.alili.tech/img/remote/1460000016718882" alt="image.png" title="image.png" style="cursor:pointer"></span></p><p>&#x5177;&#x4F53;&#x63CF;&#x8FF0;&#x4E3A;&#xFF1A;</p><ol><li>&#x539F;&#x672C;&#x9690;&#x85CF;&#x7684;<code>&lt;p&gt;</code>&#x6807;&#x7B7E;&#x663E;&#x793A;&#x51FA;&#x6765;&#x4E86;&#xFF1B;</li><li><code>&lt;summary&gt;</code>&#x6807;&#x7B7E;&#x524D;&#x9762;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#x65B9;&#x5411;&#x671D;&#x4E0B;&#x4E86;&#xFF1B;</li></ol><p>&#x6B64;&#x65F6;&#x6211;&#x4EEC;&#x518D;&#x4E00;&#x6B21;&#x70B9;&#x51FB;&#xFF0C;<code>&lt;p&gt;</code>&#x6807;&#x7B7E;&#x5185;&#x5BB9;&#x53C8;&#x4F1A;&#x9690;&#x85CF;&#x6536;&#x8D77;&#xFF0C;&#x7BAD;&#x5934;&#x65B9;&#x5411;&#x8FD8;&#x539F;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718883" src="https://static.alili.tech/img/remote/1460000016718883" alt="image.png" title="image.png" style="cursor:pointer"></span></p><p>&#x6D3B;&#x8131;&#x8131;&#x4E00;&#x4E2A;&#x5929;&#x7136;&#x7684;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x6548;&#x679C;&#x3002;</p><h4>&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#x662F;&#x901A;&#x8FC7;open&#x5C5E;&#x6027;&#x63A7;&#x5236;&#x7684;</h4><p>&#x901A;&#x8FC7;&#x5728;<code>&lt;details&gt;</code>&#x6807;&#x7B7E;&#x4E0A;&#x6DFB;&#x52A0;&#x5E03;&#x5C14;&#x7C7B;&#x578B;&#x7684;<code>open</code>&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;&#x9ED8;&#x8BA4;&#x5C31;&#x662F;&#x5C55;&#x5F00;&#x72B6;&#x6001;&#xFF0C;&#x5982;&#x4E0B;HTML&#x793A;&#x610F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details open&gt;
    &lt;summary&gt;&#x8FD9;&#x662F;&#x6458;&#x8981;2&lt;/summary&gt;
    &lt;content&gt;&#x8FD9;&#x91CC;&amp;lt;details&amp;gt;&#x6807;&#x7B7E;&#x8BBE;&#x7F6E;&#x4E86;HTML&#x5E03;&#x5C14;&#x5C5E;&#x6027;open&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x5C55;&#x5F00;&#x72B6;&#x6001;&#x3002;&lt;/content&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-params">&lt;details open&gt;</span>
    <span class="hljs-params">&lt;summary&gt;</span>&#x8FD9;&#x662F;&#x6458;&#x8981;<span class="hljs-number">2</span><span class="hljs-params">&lt;/summary&gt;</span>
    <span class="hljs-params">&lt;content&gt;</span>&#x8FD9;&#x91CC;<span class="hljs-variable">&amp;lt</span>;details<span class="hljs-variable">&amp;gt</span>;&#x6807;&#x7B7E;&#x8BBE;&#x7F6E;&#x4E86;HTML&#x5E03;&#x5C14;&#x5C5E;&#x6027;open&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x5C55;&#x5F00;&#x72B6;&#x6001;&#x3002;<span class="hljs-params">&lt;/content&gt;</span>
<span class="hljs-params">&lt;/details&gt;</span>
</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#x622A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718884" src="https://static.alili.tech/img/remote/1460000016718884" alt="open&#x5C5E;&#x6027;&#x4E0B;&#x7684;&#x4FE1;&#x606F;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;" title="open&#x5C5E;&#x6027;&#x4E0B;&#x7684;&#x4FE1;&#x606F;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;JS&#x811A;&#x672C;&#x624B;&#x52A8;&#x79FB;&#x9664;&#x8FD9;&#x4E2A;<code>open</code>&#x5C5E;&#x6027;&#xFF0C;&#x5373;&#x4F7F;&#x6CA1;&#x6709;&#x70B9;&#x51FB;&#x884C;&#x4E3A;&#x7684;&#x53D1;&#x751F;&#xFF0C;&#x6211;&#x4EEC;&#x5185;&#x5BB9;&#x4E5F;&#x4F1A;&#x6536;&#x8D77;&#x3002;</p><h4>&lt;summary&gt;&#x5982;&#x679C;&#x7F3A;&#x7701;</h4><p><code>&lt;summary&gt;</code>&#x6807;&#x7B7E;&#x5982;&#x679C;&#x7F3A;&#x7701;&#xFF0C;&#x5219;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x4F1A;&#x5728;&#x5185;&#x90E8;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>&lt;summary&gt;</code>&#x5185;&#x5BB9;&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;&#x6587;&#x6848;&#x662F;&#x201C;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#x201D;&#x3002;&#x5982;&#x4E0B;HTML&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details open&gt;
    &lt;p&gt;&#x5982;&#x679C;&amp;lt;summary&amp;gt;&#x7F3A;&#x7701;&#xFF0C;&#x5219;&#x4F1A;&#x81EA;&#x52A8;&#x8865;&#x4E0A;&#xFF0C;&#x6587;&#x6848;&#x662F;&#x201C;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#x201D;&#x3002;&lt;/p&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-params">&lt;details open&gt;</span>
    <span class="hljs-params">&lt;p&gt;</span>&#x5982;&#x679C;<span class="hljs-variable">&amp;lt</span>;summary<span class="hljs-variable">&amp;gt</span>;&#x7F3A;&#x7701;&#xFF0C;&#x5219;&#x4F1A;&#x81EA;&#x52A8;&#x8865;&#x4E0A;&#xFF0C;&#x6587;&#x6848;&#x662F;&#x201C;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#x201D;&#x3002;<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/details&gt;</span>
</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#x622A;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718885" src="https://static.alili.tech/img/remote/1460000016718885" alt="summary &#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#x5360;&#x4F4D;&#x793A;&#x610F;&#x56FE;" title="summary &#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#x5360;&#x4F4D;&#x793A;&#x610F;&#x56FE;" style="cursor:pointer;display:inline"></span></p><p>&#x4E8C;&#x3001;details&#x6D4F;&#x89C8;&#x5668;&#x5185;&#x7F6E;UI&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;</p><p>&lt;details&gt;&#x6807;&#x7B7E;&#x9ED8;&#x8BA4;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#x6837;&#x5F0F;&#x6709;&#x4E9B;&#x7B80;&#x964B;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F80;&#x5F80;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x4E0D;&#x8981;&#x62C5;&#x5FC3;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x53EF;&#x4EE5;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x3002;&#x5728;Chrome&#x7B49;&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x4F7F;&#x7528;::-webkit-details-marker&#xFF0C;&#x5728;Firefox&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x4F7F;&#x7528;::-moz-list-bullet&#x53EF;&#x4EE5;&#x5BF9;&#x5C0F;&#x4E09;&#x89D2;&#x8FDB;&#x884C;UI&#x63A7;&#x5236;&#xFF0C;&#x4F8B;&#x5982;&#x6539;&#x53D8;&#x989C;&#x8272;&#xFF0C;&#x6539;&#x53D8;&#x5927;&#x5C0F;&#xFF0C;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x56FE;&#x5F62;&#x4EE3;&#x66FF;&#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x9690;&#x85CF;&#x7B49;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x51E0;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6848;&#x4F8B;&#x3002;</p><p>&#x6848;&#x4F8B;1&#xFF1A;&#x5C0F;&#x4E09;&#x89D2;&#x53F3;&#x4FA7;&#x663E;&#x793A;&#x540C;&#x65F6;&#x989C;&#x8272;&#x53D8;&#x6DE1;</p><p>HTML&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details class=&quot;details-1&quot; open&gt;
    &lt;summary&gt;&#x8FD9;&#x662F;&#x793A;&#x4F8B;1&lt;/summary&gt;
    &lt;content&gt;&#x672C;&#x6848;&#x4F8B;&#x5C55;&#x793A;&#x5BF9;&#x5C0F;&#x4E09;&#x89D2;UI&#x91CD;&#x5B9A;&#x4E49;&#xFF1A;&#x5305;&#x62EC;&#x663E;&#x793A;&#x5728;&#x53F3;&#x4FA7;&#xFF0C;&#x989C;&#x8272;&#x51CF;&#x6DE1;&#x7B49;&#x3002;&lt;/content&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;details-1&quot;</span> <span class="hljs-attr">open</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x8FD9;&#x662F;&#x793A;&#x4F8B;1<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content</span>&gt;</span>&#x672C;&#x6848;&#x4F8B;&#x5C55;&#x793A;&#x5BF9;&#x5C0F;&#x4E09;&#x89D2;UI&#x91CD;&#x5B9A;&#x4E49;&#xFF1A;&#x5305;&#x62EC;&#x663E;&#x793A;&#x5728;&#x53F3;&#x4FA7;&#xFF0C;&#x989C;&#x8272;&#x51CF;&#x6DE1;&#x7B49;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre><p>CSS&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".details-1 summary {
    width: -moz-fit-content;
    width: fit-content;
    direction: rtl;
}
.details-1 ::-webkit-details-marker {
    direction: ltr;
    color: gray;
    margin-left: .5ch;
}
.details-1 ::-moz-list-bullet {
    direction: ltr;
    color: gray;
    margin-left: .5ch;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.details-1</span> <span class="hljs-selector-tag">summary</span> {
    <span class="hljs-attribute">width</span>: -moz-fit-content;
    <span class="hljs-attribute">width</span>: fit-content;
    <span class="hljs-attribute">direction</span>: rtl;
}
<span class="hljs-selector-class">.details-1</span> <span class="hljs-selector-pseudo">::-webkit-details-marker</span> {
    <span class="hljs-attribute">direction</span>: ltr;
    <span class="hljs-attribute">color</span>: gray;
    <span class="hljs-attribute">margin-left</span>: .<span class="hljs-number">5ch</span>;
}
<span class="hljs-selector-class">.details-1</span> <span class="hljs-selector-pseudo">::-moz-list-bullet</span> {
    <span class="hljs-attribute">direction</span>: ltr;
    <span class="hljs-attribute">color</span>: gray;
    <span class="hljs-attribute">margin-left</span>: .<span class="hljs-number">5ch</span>;
}
</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718886" src="https://static.alili.tech/img/remote/1460000016718886" alt="&#x4E09;&#x89D2;&#x4F4D;&#x7F6E;&#x548C;&#x989C;&#x8272;&#x793A;&#x610F;" title="&#x4E09;&#x89D2;&#x4F4D;&#x7F6E;&#x548C;&#x989C;&#x8272;&#x793A;&#x610F;" style="cursor:pointer"></span></p><p>&#x5F53;&#x6211;&#x4EEC;&#x70B9;&#x51FB;&#x6458;&#x8981;&#x6807;&#x9898;&#x5347;&#x8D77;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8868;&#x73B0;&#x4E3A;&#x4E0B;&#x56FE;&#xFF08;&#x622A;&#x81EA;Firefox&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718887" src="https://static.alili.tech/img/remote/1460000016718887" alt="&#x4E09;&#x89D2;&#x6536;&#x8D77;&#x6548;&#x679C;" title="&#x4E09;&#x89D2;&#x6536;&#x8D77;&#x6548;&#x679C;" style="cursor:pointer"></span></p><p>&#x800C;&#x5B9E;&#x9645;&#x4E0A;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5BF9;&#x5C0F;&#x4E09;&#x89D2;UI&#x66F4;&#x4FBF;&#x6377;&#x7684;&#x5B9A;&#x5236;&#x65B9;&#x6CD5;&#x662F;&#xFF1A;&#x9690;&#x85CF;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#xFF0C;&#x7136;&#x540E;&#x501F;&#x52A9;::before&#x6216;::after&#x4F2A;&#x5143;&#x7D20;&#x91CD;&#x65B0;&#x751F;&#x6210;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;UI&#x6548;&#x679C;&#xFF0C;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;&#x5C31;&#x5C06;&#x5C55;&#x793A;&#x76F8;&#x5173;&#x7684;&#x5904;&#x7406;&#x3002;</p><p>&#x6848;&#x4F8B;2&#xFF1A;&#x9690;&#x85CF;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#x5E76;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E09;&#x89D2;&#x66FF;&#x6362;</p><p>HTML&#x7ED3;&#x6784;&#x8FD8;&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details class=&quot;details-2&quot; open&gt;
    &lt;summary&gt;&#x8FD9;&#x662F;&#x793A;&#x4F8B;2&lt;/summary&gt;
    &lt;content&gt;&#x672C;&#x6848;&#x4F8B;&#x9690;&#x85CF;&#x539F;&#x751F;&#x5C0F;&#x4E09;&#x89D2;&#xFF0C;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x5C0F;&#x4E09;&#x89D2;&#x3002;&lt;/content&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;details-2&quot;</span> <span class="hljs-attr">open</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x8FD9;&#x662F;&#x793A;&#x4F8B;2<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content</span>&gt;</span>&#x672C;&#x6848;&#x4F8B;&#x9690;&#x85CF;&#x539F;&#x751F;&#x5C0F;&#x4E09;&#x89D2;&#xFF0C;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x5C0F;&#x4E09;&#x89D2;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre><p>CSS&#x4E3B;&#x8981;&#x5206;&#x4E3A;2&#x90E8;&#x5206;&#xFF0C;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x9690;&#x85CF;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#xFF0C;&#x53E6;&#x5916;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x4F7F;&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x751F;&#x6210;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E09;&#x89D2;&#x6548;&#x679C;&#x3002;</p><p>&#x9996;&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x9690;&#x85CF;&lt;details&gt;&#x6807;&#x7B7E;&#x9ED8;&#x8BA4;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#x7684;CSS&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x9690;&#x85CF;&#x9ED8;&#x8BA4;&#x4E09;&#x89D2; */
.details-2 ::-webkit-details-marker {
    display: none;
}
.details-2 ::-moz-list-bullet {
    font-size: 0;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/* &#x9690;&#x85CF;&#x9ED8;&#x8BA4;&#x4E09;&#x89D2; */</span>
<span class="hljs-selector-class">.details-2</span> <span class="hljs-selector-pseudo">::-webkit-details-marker</span> {
    <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-class">.details-2</span> <span class="hljs-selector-pseudo">::-moz-list-bullet</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
}
</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;Chrome&#x6D4F;&#x89C8;&#x5668;&#x548C;Firefox&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5C0F;&#x4E09;&#x89D2;&#x9690;&#x85CF;&#x91C7;&#x7528;&#x7684;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x7B56;&#x7565;&#x3002;&#x5728;Chrome&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;display:none&#x8FDB;&#x884C;&#x9690;&#x85CF;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E00;&#x62DB;&#x5728;Firefox&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x786E;&#x5B9E;&#x6CA1;&#x6709;&#x6548;&#x679C;&#x7684;&#xFF0C;&#x5373;&#x4F7F;&#x8BBE;&#x7F6E;display:none!important&#x4E5F;&#x662F;&#x5982;&#x6B64;&#xFF0C;&#x6839;&#x636E;&#x6211;&#x7684;&#x6D4B;&#x8BD5;&#xFF0C;&#x53EA;&#x6709;font-size:0&#x80FD;&#x591F;&#x6BD4;&#x8F83;&#x5B8C;&#x7F8E;&#x7684;&#x9690;&#x85CF;&#x3002;&#x7C7B;&#x4F3C;position:absolute;visibility:hidden&#x8FD9;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x9690;&#x85CF;&#x4E5F;&#x662F;&#x4E0D;&#x884C;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;position:absolute&#x65E0;&#x6CD5;&#x751F;&#x6548;&#x3002;</p><p>&#x7136;&#x540E;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x5C0F;&#x4E09;&#x89D2;&#x663E;&#x793A;&#x7684;CSS&#xFF0C;&#x8FD9;&#x91CC;&#x91C7;&#x7528;&#x7684;&#x662F;::after&#x4F2A;&#x5143;&#x7D20;&#x6A21;&#x62DF;&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E09;&#x89D2; */
.details-2 summary::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1em; height: 1em;
    margin: .2em 0 0 .5ch;
    background: url(./arrow-on.svg) no-repeat;
    background-size: 100% 100%;
    transition: transform .2s;
}
.details-2:not([open]) summary::after {
    margin-top: .25em;
    transform: rotate(90deg);    
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/* &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E09;&#x89D2; */</span>
<span class="hljs-selector-class">.details-2</span> <span class="hljs-selector-tag">summary</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">margin</span>: .<span class="hljs-number">2em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> .<span class="hljs-number">5ch</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(./arrow-on.svg) no-repeat;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100%</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">transition</span>: transform .<span class="hljs-number">2s</span>;
}
<span class="hljs-selector-class">.details-2</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[open]</span>) <span class="hljs-selector-tag">summary</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">25em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg);    
}
</code></pre><p>&#x6700;&#x7EC8;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718888" src="https://static.alili.tech/img/remote/1460000016718888" alt="&#x81EA;&#x5B9A;&#x4E49;&#x4E09;&#x89D2;&#x6548;&#x679C;&#x622A;&#x56FE;" title="&#x81EA;&#x5B9A;&#x4E49;&#x4E09;&#x89D2;&#x6548;&#x679C;&#x622A;&#x56FE;" style="cursor:pointer"></span></p><p>&#x6536;&#x8D77;&#x65F6;&#x5019;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718889" src="https://static.alili.tech/img/remote/1460000016718889" alt="&#x6536;&#x8D77;&#x65F6;&#x5019;&#x6548;&#x679C;" title="&#x6536;&#x8D77;&#x65F6;&#x5019;&#x6548;&#x679C;" style="cursor:pointer"></span></p><ul><li><ul><li>*</li></ul></li></ul><p>&#x6700;&#x540E;&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x4E0B;&#xFF0C;&#x5C31;&#x662F;&#x5982;&#x679C;<code>&lt;details&gt;</code>&#x6807;&#x7B7E;&#x5185;&#x5E76;&#x6CA1;&#x6709;<code>&lt;summary&gt;</code>&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x6211;&#x4EEC;&#x7684;&#x5BF9;&#x4E09;&#x89D2;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x65E0;&#x6548;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;<code>&lt;summary&gt;</code>&#x5143;&#x7D20;&#x5360;&#x4F4D;&#xFF0C;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details&gt;
    &lt;summary&gt;&lt;/summary&gt;
    &lt;content&gt;&#x5185;&#x5BB9;&#x3002;&lt;/content&gt;
&lt;/details&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content</span>&gt;</span>&#x5185;&#x5BB9;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span></code></pre><h3 id="articleHeader0">&#x4E09;&#x3001;Chrome&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x70B9;&#x51FB;&#x65F6;&#x5019;outline&#x8F6E;&#x5ED3;&#x7B49;&#x4F53;&#x9A8C;&#x5904;&#x7406;</h3><p>UI&#x53EF;&#x4EE5;&#x5B9A;&#x5236;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6709;&#x4E2A;&#x4E0D;&#x5BB9;&#x5FFD;&#x89C6;&#x7684;&#x4F53;&#x9A8C;&#x95EE;&#x9898;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x5728;Chrome&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x70B9;&#x51FB;&#x65F6;&#x5019;&#x4F1A;&#x51FA;&#x73B0;<code>outline</code>&#x8F6E;&#x5ED3;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718890" src="https://static.alili.tech/img/remote/1460000016718890" alt="Chrome&#x4E0B;&#x7684;outline&#x8F6E;&#x5ED3;" title="Chrome&#x4E0B;&#x7684;outline&#x8F6E;&#x5ED3;" style="cursor:pointer"></span></p><p>&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4EA7;&#x54C1;&#x548C;&#x8BBE;&#x8BA1;&#x4E00;&#x5B9A;&#x4F1A;&#x8BA9;&#x4F60;&#x628A;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#x53BB;&#x6389;&#x7684;&#x3002;&#x4EE5;&#x53CA;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;<code>&lt;summary&gt;</code>&#x5143;&#x7D20;&#x70B9;&#x51FB;&#x8F83;&#x5FEB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6587;&#x672C;&#x4F1A;&#x88AB;&#x9009;&#x4E2D;&#xFF0C;&#x4E5F;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x770B;&#x5230;&#x7684;&#x3002;</p><p>&#x963B;&#x6B62;&#x6587;&#x672C;&#x9009;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="summary {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">summary</span> {
  <span class="hljs-attribute">-webkit-user-select</span>: none;
  <span class="hljs-attribute">-moz-user-select</span>: none;
  <span class="hljs-attribute">-ms-user-select</span>: none;
  <span class="hljs-attribute">user-select</span>: none;
}
</code></pre><p>&#x5BF9;&#x4E8E;outline&#x8F6E;&#x5ED3;&#xFF0C;&#x6BD4;&#x8F83;&#x76F4;&#x63A5;&#x7684;&#x505A;&#x6CD5;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="summary {
  outline: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">summary</span> {
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5904;&#x7406;&#x5BF9;&#x65E0;&#x969C;&#x788D;&#x8BBF;&#x95EE;&#x800C;&#x662F;&#x975E;&#x5E38;&#x4E0D;&#x53CB;&#x597D;&#x7684;&#xFF0C;&#x90A3;&#x6709;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x529E;&#x6CD5;&#x517C;&#x987E;&#x89C6;&#x89C9;&#x4F53;&#x9A8C;&#x548C;&#x65E0;&#x969C;&#x788D;&#x8BBF;&#x95EE;&#x4F53;&#x9A8C;&#x5462;&#xFF1F;</p><p>&#x6211;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><ol><li>&#x5229;&#x7528;<code>&lt;a&gt;</code>&#x6807;&#x7B7E;&#x7684;outline&#x4EA4;&#x4E92;&#x4F53;&#x9A8C;</li></ol><p>&#x6D4F;&#x89C8;&#x5668;&#x5BF9;<code>&lt;a&gt;</code>&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x7684;outline&#x8F6E;&#x5ED3;&#x8FDB;&#x884C;&#x4E86;&#x4E13;&#x95E8;&#x7684;&#x4F53;&#x9A8C;&#x4F18;&#x5316;&#x5904;&#x7406;&#xFF0C;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x663E;&#x793A;&#x8F6E;&#x5ED3;&#xFF0C;&#x952E;&#x76D8;&#x8BBF;&#x95EE;&#x65F6;&#x5019;&#x663E;&#x793A;&#x8F6E;&#x5ED3;&#x3002;&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x53EF;&#x91C7;&#x7528;&#x674E;&#x4EE3;&#x6843;&#x50F5;&#x7B56;&#x7565;&#xFF0C;&#x8BA9;<code>&lt;summary&gt;</code>&#x5143;&#x7D20;&#x7684;outline&#x4EA4;&#x7ED9;<code>&lt;a&gt;</code>&#x5143;&#x7D20;&#xFF0C;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5728;&lt;summary&gt;&#x4E2D;&#x518D;&#x5185;&#x5D4C;&#x4E00;&#x4E2A;<code>&lt;a&gt;</code>&#xFF0C;&#x540C;&#x65F6;&#x901A;&#x8FC7;tabindex&#x5C5E;&#x6027;remove&#x6389;<code>&lt;summary&gt;</code>&#x539F;&#x672C;&#x7684;&#x53EF;&#x8BBF;&#x95EE;&#x6027;&#x3002;HTML&#x4EE3;&#x7801;&#x793A;&#x610F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;details open&gt;
    &lt;summary tabindex=&quot;-1&quot;&gt;&lt;a href=&quot;javascript:&quot;&gt;&#x8FD9;&#x662F;&#x793A;&#x4F8B;&lt;/a&gt;&lt;/summary&gt;
    &lt;content&gt;&#x70B9;&#x51FB;&#x65E0;&#x5916;&#x6846;&#xFF0C;&#x952E;&#x76D8;focus&#x6709;&#x3002;&lt;/content&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">&quot;-1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:&quot;</span>&gt;</span>&#x8FD9;&#x662F;&#x793A;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content</span>&gt;</span>&#x70B9;&#x51FB;&#x65E0;&#x5916;&#x6846;&#xFF0C;&#x952E;&#x76D8;focus&#x6709;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre><p>CSS&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="summary {
    user-select: none;
    outline: 0;
}
summary a {
    color: inherit;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">summary</span> {
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">summary</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">color</span>: inherit;
}
</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x5728;Chrome&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x70B9;&#x51FB;&#x6458;&#x8981;&#x4FE1;&#x606F;&#xFF0C;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;<code>outline</code>&#x8F6E;&#x5ED3;&#x51FA;&#x73B0;&#xFF1B;&#x4F46;&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;Tab&#x952E;&#x7D22;&#x5F15;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#x7684;&#x8F6E;&#x5ED3;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718891" src="https://static.alili.tech/img/remote/1460000016718891" alt="&#x8F6E;&#x5ED3;&#x793A;&#x610F;" title="&#x8F6E;&#x5ED3;&#x793A;&#x610F;" style="cursor:pointer"></span></p><p>&#x8F6E;&#x5ED3;&#x533A;&#x57DF;&#x6BD4;&#x539F;&#x751F;&#x7684;<code>&lt;summary&gt;</code>&#x8981;&#x5C0F;&#xFF0C;&#x4F46;&#x8FD9;&#x65E0;&#x4F24;&#x5927;&#x96C5;&#xFF0C;&#x800C;&#x4E14;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x53BB;&#x6389;&#x5C0F;&#x7BAD;&#x5934;&#xFF0C;&#x6B64;&#x65F6;&#x53EA;&#x8981;&#x8BBE;&#x7F6E;<code>&lt;a&gt;</code>&#x6807;&#x7B7E;<code>display:block</code>&#xFF0C;&#x5219;&#x8F6E;&#x5ED3;&#x5C31;&#x53EF;&#x4EE5;&#x548C;<code>&lt;summary&gt;</code>&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x4E86;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x6309;&#x4E0B;Space&#x7A7A;&#x683C;&#x952E;&#xFF0C;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x5185;&#x7684;&#x5185;&#x5BB9;&#x4FE1;&#x606F;&#x4E0D;&#x65AD;&#x7684;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718892" src="https://static.alili.tech/img/remote/1460000016718892" alt="&#x6536;&#x8D77;&#x72B6;&#x6001;" title="&#x6536;&#x8D77;&#x72B6;&#x6001;" style="cursor:pointer"></span></p><p>&#x7136;&#x540E;&#x4E0A;&#x9762;&#x5B9E;&#x73B0;&#x5E76;&#x4E0D;&#x5B8C;&#x7F8E;&#xFF0C;&#x76F8;&#x6BD4;&#x539F;&#x751F;&#x7684;&lt;summary&gt;&#x5143;&#x7D20;&#xFF0C;Enter&#x56DE;&#x8F66;&#x952E;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x6548;&#x679C;&#x4E22;&#x5931;&#x4E86;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;HTML&#x5143;&#x7D20;&#x4E2D;&#x5982;&#x679C;&#x591A;&#x4E2A;focusable&#x540C;&#x65F6;&#x5E26;click&#x6D4F;&#x89C8;&#x5668;&#x884C;&#x4E3A;&#x5143;&#x7D20;&#x5D4C;&#x5957;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x70B9;&#x51FB;&#x91CC;&#x9762;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5916;&#x90E8;&#x5143;&#x7D20;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x884C;&#x4E3A;&#x662F;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x7684;&#x3002;&#x7C7B;&#x4F3C;&#x7684;&#x6709;&lt;label&gt;&#x5185;&#x5D4C;<code>&lt;a&gt;</code>&#x6807;&#x7B7E;&#x3002;</p><p>&#x5BF9;&#x4E8E;<code>&lt;a&gt;</code>&#x6807;&#x7B7E;&#xFF0C;&#x5176;&#x6D4F;&#x89C8;&#x5668;&#x884C;&#x4E3A;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x56DE;&#x8F66;&#x952E;&#x89E6;&#x53D1;&#xFF0C;&#x7A7A;&#x683C;&#x952E;&#x662F;&#x65E0;&#x6548;&#x7684;&#xFF1B;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;<code>&lt;summary&gt;</code>&#xFF0C;&#x56DE;&#x8F66;&#x952E;&#x548C;&#x7A7A;&#x683C;&#x952E;&#x90FD;&#x80FD;&#x89E6;&#x53D1;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x884C;&#x4E3A;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7A7A;&#x683C;&#x952E;&#x6709;&#x6548;&#xFF0C;&#x56DE;&#x8F66;&#x952E;&#x65E0;&#x6548;&#x7684;&#x539F;&#x56E0;&#x3002;</p><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x540C;&#x65F6;&#x652F;&#x6301;&#x56DE;&#x8F66;&#x952E;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;HTML&#x5982;&#x4E0B;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;details open&gt;
    &lt;summary tabindex=&quot;-1&quot;&gt;&lt;a href=&quot;javascript:&quot; onClick=&quot;this.parentNode.click();&quot;&gt;&#x8FD9;&#x662F;&#x793A;&#x4F8B;&lt;/a&gt;&lt;/summary&gt;
    &lt;content&gt;&#x70B9;&#x51FB;&#x65E0;&#x5916;&#x6846;&#xFF0C;&#x952E;&#x76D8;focus&#x6709;&#x3002;&lt;/content&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">&quot;-1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">&quot;this.parentNode.click();&quot;</span>&gt;</span>&#x8FD9;&#x662F;&#x793A;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content</span>&gt;</span>&#x70B9;&#x51FB;&#x65E0;&#x5916;&#x6846;&#xFF0C;&#x952E;&#x76D8;focus&#x6709;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x4E0A;&#x9762;&#x5904;&#x7406;&#x5728;<code>&lt;summary&gt;</code>&#x81EA;&#x5DF1;&#x989D;&#x5916;&#x7ED1;&#x5B9A;click&#x4E8B;&#x4EF6;&#x65F6;&#x5019;&#x53EF;&#x80FD;&#x4F1A;&#x6709;double&#x89E6;&#x53D1;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6B64;&#x65F6;&#xFF0C;&#x963B;&#x6B62;<code>&lt;a&gt;</code>&#x5143;&#x7D20;&#x7684;&#x5192;&#x6CE1;&#x5373;&#x53EF;&#x3002;</p><ol><li>JS&#x6355;&#x83B7;&#x952E;&#x76D8;&#x884C;&#x4E3A;&#x624B;&#x52A8;&#x8BBE;&#x7F6E;outline</li></ol><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0D;&#x9700;&#x8981;&#x5BF9;HTML&#x8FDB;&#x884C;&#x4EFB;&#x4F55;&#x7684;&#x6539;&#x52A8;&#xFF0C;&#x662F;&#x901A;&#x8FC7;CSS&#x548C;JS&#x914D;&#x5408;&#x5BF9;&#x5168;&#x5C40;&#x7684;&lt;summary&gt;&#x5143;&#x7D20;&#x8FDB;&#x884C;outline&#x4F18;&#x5316;&#x3002;</p><p>CSS&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="summary {
    user-select: none;
    outline: 0;
}
summary[focus] {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">summary</span> {
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">summary</span><span class="hljs-selector-attr">[focus]</span> {
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">1px</span> dotted;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">5px</span> auto -webkit-focus-ring-color;
}
</code></pre><p>JS&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&apos;keydown&apos;, function () {    
    window.isKeyEvent = true;
    setTimeout(function () {
        window.isKeyEvent = false;
    }, 100);    
});

document.addEventListener(&apos;focusin&apos;, function (event) {
    var target = event.target;
    if (target &amp;&amp; target.tagName.toLowerCase() == &apos;summary&apos; &amp;&amp; window.isKeyEvent == true) {
        target.setAttribute(&apos;focus&apos;, &apos;&apos;);
    }
});
document.addEventListener(&apos;focusout&apos;, function (event) {
    var eleFocusAll = document.querySelectorAll(&apos;summary[focus]&apos;);
    [].slice.call(eleFocusAll).forEach(function (summary) {
        summary.removeAttribute(&apos;focus&apos;);
    });
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;keydown&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{    
    <span class="hljs-built_in">window</span>.isKeyEvent = <span class="hljs-literal">true</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">window</span>.isKeyEvent = <span class="hljs-literal">false</span>;
    }, <span class="hljs-number">100</span>);    
});

<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;focusin&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> target = event.target;
    <span class="hljs-keyword">if</span> (target &amp;&amp; target.tagName.toLowerCase() == <span class="hljs-string">&apos;summary&apos;</span> &amp;&amp; <span class="hljs-built_in">window</span>.isKeyEvent == <span class="hljs-literal">true</span>) {
        target.setAttribute(<span class="hljs-string">&apos;focus&apos;</span>, <span class="hljs-string">&apos;&apos;</span>);
    }
});
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;focusout&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> eleFocusAll = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;summary[focus]&apos;</span>);
    [].slice.call(eleFocusAll).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">summary</span>) </span>{
        summary.removeAttribute(<span class="hljs-string">&apos;focus&apos;</span>);
    });
});
</code></pre><p>&#x53EA;&#x8981;&#x628A;&#x4E0A;&#x9762;&#x7684;CSS&#x548C;JS&#x590D;&#x5236;&#x5230;&#x9875;&#x9762;&#x4E2D;&#xFF0C;&#x89C6;&#x89C9;&#x4F53;&#x9A8C;&#x548C;&#x4EA4;&#x4E92;&#x4F53;&#x9A8C;&#x5B8C;&#x7F8E;&#x652F;&#x6301;&#x7684;&lt;summary&gt;&#x5143;&#x7D20;outline&#x6548;&#x679C;&#x5C31;&#x6709;&#x4E86;&#x3002;</p><p>&#x8868;&#x73B0;&#x4E3A;&#xFF0C;&#x70B9;&#x51FB;&lt;summary&gt;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;outline&#xFF0C;&#x952E;&#x76D8;focus&#x65F6;&#x5019;&#x51FA;&#x73B0;&#xFF0C;&#x4E14;&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;outline&#x6548;&#x679C;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#xFF0C;Space&#x952E;&#x548C;Enter&#x952E;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#x8BBF;&#x95EE;&#x5B8C;&#x5168;&#x4FDD;&#x7559;&#x3002;</p><p>&#x4F8B;&#x5982;&#x4E0B;&#x56FE;&#x5C31;&#x662F;&#x952E;&#x76D8;Tab&#x952E;<code>focus</code>&#x540E;&#x56DE;&#x8F66;&#x540E;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718893" src="https://static.alili.tech/img/remote/1460000016718893" alt="&#x952E;&#x76D8;&#x8BBF;&#x95EE;&#x56DE;&#x8F66;&#x6536;&#x8D77;&#x540E;&#x6548;&#x679C;&#x622A;&#x56FE;" title="&#x952E;&#x76D8;&#x8BBF;&#x95EE;&#x56DE;&#x8F66;&#x6536;&#x8D77;&#x540E;&#x6548;&#x679C;&#x622A;&#x56FE;" style="cursor:pointer"></span></p><p>&#x6BCF;&#x6BCF;&#x770B;&#x5230;&#x5982;&#x6B64;&#x6781;&#x81F4;&#x7684;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x5904;&#x7406;&#xFF0C;&#x5FC3;&#x60C5;&#x90FD;&#x5927;&#x597D;&#x3002;</p><p><strong>&#x539F;&#x7406;&#xFF1A;</strong><br>&#x5173;&#x952E;&#x662F;&#x5168;&#x5C40;&#x76D1;&#x542C;<code>keydown</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x53D1;&#x751F;&#xFF0C;&#x5219;&#x8BA4;&#x4E3A;&#x6B64;100&#x6BEB;&#x79D2;&#x5185;&#x7684;&#x9875;&#x9762;<code>focus</code>&#x884C;&#x4E3A;&#x5747;&#x662F;&#x952E;&#x76D8;&#x4EA7;&#x751F;&#xFF0C;&#x4ECE;&#x800C;&#x6709;&#x6548;&#x533A;&#x5206;&#x662F;&#x70B9;&#x51FB;&#x89E6;&#x53D1;&#x7684;<code>focus</code>&#x884C;&#x4E3A;&#x8FD8;&#x662F;&#x952E;&#x76D8;&#x89E6;&#x53D1;&#x7684;<code>focus</code>&#x884C;&#x4E3A;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x952E;&#x76D8;&#x89E6;&#x53D1;&#xFF0C;&#x7ED9;<code>&lt;summary&gt;</code>&#x5143;&#x7D20;&#x624B;&#x52A8;&#x589E;&#x52A0;<code>outline</code>&#x6548;&#x679C;&#x3002;</p><h3 id="articleHeader1">&#x56DB;&#x3001;&#x57FA;&#x4E8E;details&#x5143;&#x7D20;&#x884C;&#x4E3A;&#x7684;&#x5404;&#x79CD;&#x4EA4;&#x4E92;&#x6548;&#x679C;&#x6848;&#x4F8B;</h3><p>&#x4E86;&#x89E3;&#x4E86;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x7684;&#x70B9;&#x51FB;&#x4EA4;&#x4E92;&#x884C;&#x4E3A;&#xFF1B;&#x89E3;&#x51B3;&#x4E86;UI&#x5B9A;&#x5236;&#x96BE;&#x9898;&#xFF1B;&#x89E3;&#x51B3;&#x4E86;<code>outline</code>&#x7684;&#x4F53;&#x9A8C;&#x95EE;&#x9898;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4ED8;&#x8BF8;&#x5B9E;&#x8DF5;&#xFF0C;&#x4E0D;&#x501F;&#x52A9;&#x4EFB;&#x4F55;JS&#x6765;&#x5B9E;&#x73B0;&#x5404;&#x79CD;&#x6211;&#x4EEC;&#x5E73;&#x5E38;&#x89C1;&#x5230;&#x7684;&#x4EA4;&#x4E92;&#x6548;&#x679C;&#x3002;</p><h4>&#x6848;&#x4F8B;1&#xFF1A;&#x201C;&#x66F4;&#x591A;&#x201D;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#x6548;&#x679C;</h4><p>&#x5B9E;&#x73B0;&#x6700;&#x7EC8;&#x6548;&#x679C;&#x5982;&#x4E0B;gif&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718894" src="https://static.alili.tech/img/remote/1460000016718894" alt="&#x66F4;&#x591A;&#x5C55;&#x5F00;&#x6536;&#x8D77;gif&#x6548;&#x679C;" title="&#x66F4;&#x591A;&#x5C55;&#x5F00;&#x6536;&#x8D77;gif&#x6548;&#x679C;" style="cursor:pointer"></span></p><p>&#x56E0;&#x4E3A;&#x201C;&#x66F4;&#x591A;&#x201D;&#x5143;&#x7D20;&#x662F;&#x5728;&#x5E95;&#x90E8;&#xFF0C;&#x56E0;&#x6B64;&#x6548;&#x679C;&#x5B9E;&#x73B0;&#x7684;&#x8981;&#x70B9;&#x7684;&#x6240;&#x6709;&#x7684;&#x5185;&#x5BB9;&#x4FE1;&#x606F;&#x90FD;&#x653E;&#x5728;<code>&lt;summary&gt;</code>&#x5143;&#x7D20;&#x5185;&#x90E8;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x7684;<code>open</code>&#x5C5E;&#x6027;&#x63A7;&#x5236;UI&#x7684;&#x53D8;&#x5316;&#x3002;</p><p>HTML&#x548C;CSS&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF0C;&#x5176;&#x4E2D;&#xFF0C;&#x6700;&#x6838;&#x5FC3;&#x90E8;&#x5206;&#x5DF2;&#x7ECF;&#x7EA2;&#x8272;&#x9AD8;&#x4EAE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details&gt;
    &lt;summary&gt;
        &lt;p&gt;&#x636E;&#x53F0;&#x5A92;&#x62A5;&#x9053;&#xFF0C;&#x5927;...&#x9752;&#x7750;&#x3002;&lt;/p&gt;
        &lt;div class=&quot;more&quot;&gt;
            &lt;p&gt;&#x5176;&#x4ED6;&#x51E0;&#x9996;&#x6B4C;&#x66F2;...&lt;/p&gt;
        &lt;/div&gt;
        &lt;a&gt;&#x66F4;&#x591A;&lt;/a&gt;
    &lt;/summary&gt; 
&lt;/details&gt;
::-webkit-details-marker {
    display: none;
}
::-moz-list-bullet {
    font-size: 0;
    float: left;
}
.more {
    display: none;
}
[open] .more {
    display: block;
}
[open] summary a {
    font-size: 0;
}
[open] summary a::before {
    content: &apos;&#x6536;&#x8D77;&apos;;
    font-size: 14px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;details&gt;
    &lt;summary&gt;
        &lt;p&gt;&#x636E;&#x53F0;&#x5A92;&#x62A5;&#x9053;&#xFF0C;&#x5927;...&#x9752;&#x7750;&#x3002;&lt;/p&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;more&quot;</span>&gt;
            &lt;p&gt;&#x5176;&#x4ED6;&#x51E0;&#x9996;&#x6B4C;&#x66F2;...&lt;/p&gt;
        &lt;/div&gt;
        &lt;a&gt;&#x66F4;&#x591A;&lt;/a&gt;
    &lt;/summary&gt; 
&lt;/details&gt;
::-webkit-details-marker {
    <span class="hljs-attribute">display</span>: none;
}
::-moz-list-bullet {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.more</span> {
    <span class="hljs-attribute">display</span>: none;
}
[open] <span class="hljs-selector-class">.more</span> {
    <span class="hljs-attribute">display</span>: block;
}
[open] <span class="hljs-selector-tag">summary</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
}
[open] <span class="hljs-selector-tag">summary</span> <span class="hljs-selector-tag">a</span>::before {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&#x6536;&#x8D77;&apos;</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
</code></pre><p>&#x628A;&#x201C;&#x66F4;&#x591A;&#x201D;&#x5BF9;&#x5E94;&#x7684;&#x4FE1;&#x606F;&#x653E;&#x5728;.more&#x5143;&#x7D20;&#x5185;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;[open]&#x5C5E;&#x6027;&#x9009;&#x62E9;&#x5668;&#x63A7;&#x5236;&#x5668;&#x663E;&#x793A;&#xFF0C;&#x6548;&#x679C;&#x5373;&#x8FBE;&#x6210;&#x3002;</p><h4>&#x6848;&#x4F8B;2&#xFF1A;&#x65E0;JS&#x5B9E;&#x73B0;&#x70B9;&#x51FB;&#x663E;&#x793A;&#x60AC;&#x6D6E;&#x83DC;&#x5355;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x4E0B;&#x62C9;&#x6846;&#x7B49;&#x6548;&#x679C;</h4><p>&#x6548;&#x679C;&#x5982;&#x4E0B;gif&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718895" src="https://static.alili.tech/img/remote/1460000016718895" alt="&#x4E0B;&#x62C9;&#x83DC;&#x5355;gif&#x6548;&#x679C;" title="&#x4E0B;&#x62C9;&#x83DC;&#x5355;gif&#x6548;&#x679C;" style="cursor:pointer"></span></p><p>&#x6CA1;&#x6709;&#x4EFB;&#x4F55;JS&#x53C2;&#x4E0E;&#x3002;HTML&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;details&gt;
    &lt;summary&gt;&#x6211;&#x7684;&#x6D88;&#x606F;&lt;/summary&gt; 
    &lt;div class=&quot;box&quot;&gt;
        &lt;a href&gt;&#x6211;&#x7684;&#x56DE;&#x7B54;&lt;sup&gt;12&lt;/sup&gt;&lt;/a&gt;
        &lt;a href&gt;&#x6211;&#x7684;&#x79C1;&#x4FE1;&lt;/a&gt;
        &lt;a href&gt;&#x672A;&#x8BC4;&#x4EF7;&#x8BA2;&#x5355;&lt;sup&gt;2&lt;/sup&gt;&lt;/a&gt;
        &lt;a href&gt;&#x6211;&#x7684;&#x5173;&#x6CE8;&lt;/a&gt;
    &lt;/div&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x6211;&#x7684;&#x6D88;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x56DE;&#x7B54;<span class="hljs-tag">&lt;<span class="hljs-name">sup</span>&gt;</span>12<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x79C1;&#x4FE1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x672A;&#x8BC4;&#x4EF7;&#x8BA2;&#x5355;<span class="hljs-tag">&lt;<span class="hljs-name">sup</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x5173;&#x6CE8;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre><p>&#x7136;&#x540E;CSS&#x8BA9;.box&#x5143;&#x7D20;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5373;&#x53EF;&#xFF0C;&#x663E;&#x793A;&#x548C;&#x9690;&#x85CF;&lt;details&gt;&#x5143;&#x7D20;&#x5185;&#x7F6E;&#x884C;&#x4E3A;&#x5C31;&#x641E;&#x5B9A;&#x4E86;&#x3002;</p><h4>&#x6848;&#x4F8B;3&#xFF1A;accordion&#x591A;&#x9879;&#x6298;&#x53E0;&#x6548;&#x679C;</h4><p>&#x6B64;&#x6548;&#x679C;&#x5E38;&#x89C1;&#x4E8E;&#x6761;&#x76EE;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#xFF0C;&#x65B0;&#x95FB;&#x6761;&#x76EE;&#x7B49;&#x3002;</p><p>&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718896" src="https://static.alili.tech/img/remote/1460000016718896" alt="&#x591A;&#x6761;&#x76EE;&#x83DC;&#x5355;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#x6548;&#x679C;" title="&#x591A;&#x6761;&#x76EE;&#x83DC;&#x5355;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;&#x6548;&#x679C;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x66F4;&#x52A0;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x5806;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x5E76;&#x6392;&#x653E;&#x7F6E;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x5982;&#x4E0B;HTML&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details open&gt;
    &lt;summary&gt;&lt;dt&gt;&#x8BA2;&#x5355;&#x4E2D;&#x5FC3;&lt;/dt&gt;&lt;/summary&gt; 
    &lt;dd&gt;&lt;a href&gt;&#x6211;&#x7684;&#x8BA2;&#x5355;&lt;/a&gt;&lt;/dd&gt;
    &lt;dd&gt;&lt;a href&gt;&#x6211;&#x7684;&#x6D3B;&#x52A8;&lt;/a&gt;&lt;/dd&gt;
    &lt;dd&gt;&lt;a href&gt;&#x8BC4;&#x4EF7;&#x6652;&#x5355;&lt;/a&gt;&lt;/dd&gt;
    &lt;dd&gt;&lt;a href&gt;&#x8D2D;&#x7269;&#x52A9;&#x624B;&lt;/a&gt;&lt;/dd&gt;
&lt;/details&gt;
&lt;details open&gt;
    &lt;summary&gt;&lt;dt&gt;&#x5173;&#x6CE8;&#x4E2D;&#x5FC3;&lt;/dt&gt;&lt;/summary&gt; 
    &lt;dd&gt;&lt;a href&gt;&#x5173;&#x6CE8;&#x7684;&#x5546;&#x54C1;&lt;/a&gt;&lt;/dd&gt;
    ...
&lt;/details&gt;
&lt;details open&gt;
    ...
&lt;/details&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>&#x8BA2;&#x5355;&#x4E2D;&#x5FC3;<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x8BA2;&#x5355;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x6D3B;&#x52A8;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x8BC4;&#x4EF7;&#x6652;&#x5355;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x8D2D;&#x7269;&#x52A9;&#x624B;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>&#x5173;&#x6CE8;&#x4E2D;&#x5FC3;<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x5173;&#x6CE8;&#x7684;&#x5546;&#x54C1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>

</code></pre><p>&#x8BA1;&#x7B97;CSS&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x8BBE;&#x7F6E;&#xFF0C;&#x6548;&#x679C;&#x4E5F;&#x5929;&#x7136;&#x8FBE;&#x6210;&#x3002;</p><p>&#x6848;&#x4F8B;3&#x4E2D;&#x7684;&#x5C55;&#x5F00;&#x9879;&#x663E;&#x793A;&#x7684;&#x65F6;&#x5019;&#x662F;&#x975E;&#x5E38;&#x751F;&#x786C;&#x7684;&#x7A81;&#x7136;&#x663E;&#x793A;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x501F;&#x52A9;&#x4E00;&#x4E9B;&#x9009;&#x62E9;&#x5668;&#x6280;&#x5DE7;&#x4EE5;&#x53CA;CSS3&#xA0;<code>transition</code>&#x5C5E;&#x6027;&#x8BA9;&#x83DC;&#x5355;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x7684;&#x65F6;&#x5019;&#x662F;&#x6709;&#x52A8;&#x753B;&#x6548;&#x679C;&#x7684;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x4E0B;gif&#x622A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718897" src="https://static.alili.tech/img/remote/1460000016718897" alt="&#x542B;slideup/slidedown&#x52A8;&#x753B;&#x7684;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;" title="&#x542B;slideup/slidedown&#x52A8;&#x753B;&#x7684;&#x5C55;&#x5F00;&#x4E0E;&#x6536;&#x8D77;" style="cursor:pointer"></span></p><p>&#x6B64;&#x6548;&#x679C;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x6838;&#x5FC3;&#x662F;<code>[open]</code>&#x5C5E;&#x6027;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x548C;&#x52A0;&#x53F7;<code>+</code>&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x9009;&#x62E9;&#x5668;&#x3002;</p><p>&#x9996;&#x5148;&#x770B;&#x4E0B;HTML&#xFF0C;&#x5C55;&#x5F00;&#x5217;&#x8868;&#x7ED3;&#x6784;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x4E0D;&#x662F;&#x4F5C;&#x4E3A;<code>&lt;details&gt;</code>&#x7684;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x662F;&#x4F5C;&#x4E3A;&#x5176;&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x5143;&#x7D20;&#x5B58;&#x5728;&#xFF0C;HTML&#x793A;&#x610F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details open&gt;&lt;summary&gt;&#x8BA2;&#x5355;&#x4E2D;&#x5FC3;&lt;/summary&gt;&lt;/details&gt;
&lt;dl&gt;
    &lt;dd&gt;&lt;a href&gt;&#x6211;&#x7684;&#x8BA2;&#x5355;&lt;/a&gt;&lt;/dd&gt;
    &lt;dd&gt;&lt;a href&gt;&#x6211;&#x7684;&#x6D3B;&#x52A8;&lt;/a&gt;&lt;/dd&gt;
    &lt;dd&gt;&lt;a href&gt;&#x8BC4;&#x4EF7;&#x6652;&#x5355;&lt;/a&gt;&lt;/dd&gt;
    &lt;dd&gt;&lt;a href&gt;&#x8D2D;&#x7269;&#x52A9;&#x624B;&lt;/a&gt;&lt;/dd&gt;
&lt;/dl&gt;
...
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x8BA2;&#x5355;&#x4E2D;&#x5FC3;<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x8BA2;&#x5355;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x6211;&#x7684;&#x6D3B;&#x52A8;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x8BC4;&#x4EF7;&#x6652;&#x5355;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>&gt;</span>&#x8D2D;&#x7269;&#x52A9;&#x624B;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dl</span>&gt;</span>
...
</code></pre><p>&#x4E0A;&#x9762;&lt;dl&gt;&#x5B9A;&#x4E49;&#x5217;&#x8868;&#x5C31;&#x662F;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5176;&#x4F5C;&#x4E3A;&#x5144;&#x5F1F;&#x5143;&#x7D20;&#x548C;&lt;details&gt;&#x5143;&#x7D20;&#x5E73;&#x8D77;&#x5E73;&#x5750;&#xFF0C;&#x4E8E;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x70B9;&#x51FB;&lt;summary&gt;&#x5143;&#x7D20;&lt;details&gt;&#x5143;&#x7D20;&#x7684;open&#x5C5E;&#x6027;&#x4F1A;&#x53D8;&#x5316;&#x7684;&#x7279;&#x6027;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;CSS&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
details + dl {
    max-height: 0;
    transition: max-height .25s;
    overflow: hidden;
}
[open] + dl {
    max-height: 100px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>
<span class="hljs-selector-tag">details</span> + <span class="hljs-selector-tag">dl</span> {
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transition</span>: max-height .<span class="hljs-number">25s</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-attr">[open]</span> + <span class="hljs-selector-tag">dl</span> {
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">100px</span>;
}
</code></pre><p>&#x501F;&#x52A9;&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x9009;&#x62E9;&#x5668;&#x4EE5;&#x53CA;max-height&#x4EFB;&#x610F;&#x5143;&#x7D20;slideUp/slideDown&#x6280;&#x672F;&#x5C31;&#x53EF;&#x4EE5;&#x6548;&#x679C;&#x8FBE;&#x6210;&#x3002;</p><h4>&#x6848;&#x4F8B;5&#xFF1A;&#x591A;&#x7EA7;&#x5D4C;&#x5957;&#x7684;&#x6811;&#x5F62;&#x83DC;&#x5355;&#x4EA4;&#x4E92;&#x6548;&#x679C;</h4><p>&#x8FD9;&#x91CC;&#x7684;&#x6811;&#x5F62;&#x83DC;&#x5355;&#x6548;&#x679C;&#x5B9E;&#x73B0;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x591A;&#x4E2A;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x76F8;&#x4E92;&#x5D4C;&#x5957;&#x5C31;&#x53EF;&#x4EE5;&#xFF0C;&#x6548;&#x679C;Gif&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718898?w=234&amp;h=346" src="https://static.alili.tech/img/remote/1460000016718898?w=234&amp;h=346" alt="&#x6811;&#x5F62;&#x83DC;&#x5355;&#x5C55;&#x5F00;gif&#x6548;&#x679C;&#x622A;&#x56FE;" title="&#x6811;&#x5F62;&#x83DC;&#x5355;&#x5C55;&#x5F00;gif&#x6548;&#x679C;&#x622A;&#x56FE;" style="cursor:pointer"></span></p><p>HTML&#x7ED3;&#x6784;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;details&gt;
    &lt;summary&gt;&#x6211;&#x7684;&#x89C6;&#x9891;&lt;/summary&gt;
    &lt;details&gt;
        &lt;summary&gt;&#x7206;&#x809D;&#x5DE5;&#x7A0B;&#x5E08;&#x7684;&#x5F02;&#x4E16;&#x754C;&#x72C2;&#x60F3;&#x66F2;&lt;/summary&gt;
        &lt;div&gt;tv1-720p.mp4&lt;/div&gt;
        &lt;div&gt;tv2-720p.mp4&lt;/div&gt;
        ...
        &lt;div&gt;tv10-720p.mp4&lt;/div&gt;
    &lt;/details&gt;
    &lt;details&gt;
        &lt;summary&gt;&#x4E03;&#x5927;&#x7F6A;&lt;/summary&gt;
        &lt;div&gt;&#x4E03;&#x5927;&#x7F6A;B&#x7AD9;00&#x5408;&#x96C6;.mp4&lt;/div&gt;
    &lt;/details&gt;
    &lt;div&gt;&#x73CD;&#x85CF;&#x52A8;&#x6F2B;&#x7F51;&#x76D8;&#x5730;&#x5740;.txt&lt;/div&gt;
    &lt;div&gt;&#x6211;&#x4EEC;&#x7684;&#x5C0F;&#x7F8E;&#x597D;.mp4&lt;/div&gt;
&lt;/details&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x6211;&#x7684;&#x89C6;&#x9891;<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x7206;&#x809D;&#x5DE5;&#x7A0B;&#x5E08;&#x7684;&#x5F02;&#x4E16;&#x754C;&#x72C2;&#x60F3;&#x66F2;<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>tv1-720p.mp4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>tv2-720p.mp4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ...
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>tv10-720p.mp4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>&#x4E03;&#x5927;&#x7F6A;<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x4E03;&#x5927;&#x7F6A;B&#x7AD9;00&#x5408;&#x96C6;.mp4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x73CD;&#x85CF;&#x52A8;&#x6F2B;&#x7F51;&#x76D8;&#x5730;&#x5740;.txt<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x6211;&#x4EEC;&#x7684;&#x5C0F;&#x7F8E;&#x597D;.mp4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre><p>CSS&#x7684;&#x4E3B;&#x8981;&#x5DE5;&#x4F5C;&#x5C31;&#x662F;&#x7ED8;&#x5236;&#x83DC;&#x5355;&#x524D;&#x9762;&#x7684;&#x52A0;&#x53F7;&#x548C;&#x51CF;&#x53F7;&#x56FE;&#x5F62;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x501F;&#x52A9;background&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#xFF0C;&#x76F8;&#x5173;CSS&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
details {
    padding-left: 20px;
}
summary::before {
    content: &apos;&apos;;
    display: inline-block;
    width: 12px; height: 12px;
    border: 1px solid #999;
    background: linear-gradient(to right, #999, #999) no-repeat center, linear-gradient(to top, #999, #999) no-repeat center;
    background-size: 2px 10px, 10px 2px;
    vertical-align: -2px;
    margin-right: 6px;
    margin-left: -20px;
}
[open] &gt; summary::before {
    background: linear-gradient(to right, #999, #999) no-repeat center;
    background-size: 10px 2px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>
<span class="hljs-selector-tag">details</span> {
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-tag">summary</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, #999, #999) no-repeat center, <span class="hljs-built_in">linear-gradient</span>(to top, #999, #999) no-repeat center;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">2px</span> <span class="hljs-number">10px</span>, <span class="hljs-number">10px</span> <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">vertical-align</span>: -<span class="hljs-number">2px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">6px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-attr">[open]</span> &gt; <span class="hljs-selector-tag">summary</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, #999, #999) no-repeat center;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">10px</span> <span class="hljs-number">2px</span>;
}
</code></pre><p>&#x6548;&#x679C;&#x5373;&#x8FBE;&#x6210;&#xFF01;</p><p>&#x4E94;&#x3001;&#x5982;&#x679C;&#x53EA;&#x60F3;&#x8981;details/summary&#x7684;&#x8BED;&#x4E49;&#x4E0D;&#x8981;&#x884C;&#x4E3A;</p><p>&#x5982;&#x679C;&#x53EA;&#x60F3;&#x8981;&lt;details&gt;&#x5143;&#x7D20;&#xFF0C;&lt;summary&gt;&#x5143;&#x7D20;&#x7684;&#x8BED;&#x4E49;&#xFF0C;&#x4F46;&#x662F;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x70B9;&#x51FB;&#x5C55;&#x5F00;&#x6536;&#x8D77;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x5904;&#x7406;&#x5462;&#xFF1F;</p><p>&#x4F8B;&#x5982;&#xFF0C;&#x67D0;&#x8BC4;&#x8BBA;&#xFF0C;&#x6216;&#x8005;&#x67D0;&#x5E16;&#x5B50;&#x6709;&#x6807;&#x9898;&#x548C;&#x6B63;&#x6587;&#xFF0C;&#x975E;&#x5E38;&#x7B26;&#x5408;&#x8BE6;&#x60C5;-&#x6982;&#x8981;-&#x5185;&#x5BB9;&#x7684;&#x8BED;&#x4E49;&#xFF0C;&#x4F46;&#x662F;&#x5E0C;&#x671B;&#x662F;&#x7EAF;&#x5C55;&#x793A;&#x7684;&#xFF0C;&#x70B9;&#x51FB;&#x65F6;&#x5019;&#x4E0D;&#x6536;&#x8D77;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5904;&#x7406;&#xFF1A;</p><p>1.&lt;summary&gt;&#x6807;&#x7B7E;&#x8BBE;&#x7F6E;tabindex=&quot;-1&quot;&#x8BA9;&#x952E;&#x76D8;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#xFF1B;<br>2.&#x8BBE;&#x7F6E;CSS&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
summary {
  outline: 0;
  pointer-events: none;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>
<span class="hljs-selector-tag">summary</span> {
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">pointer-events</span>: none;
}
</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x80FD;&#x70B9;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x6709;outline&#x8F6E;&#x5ED3;&#x3002;</p><h3 id="articleHeader2">&#x516D;&#x3001;&#x517C;&#x5BB9;&#x6027;&#x4EE5;&#x53CA;Polyfill</h3><p>&#x517C;&#x5BB9;&#x6027;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016718899" src="https://static.alili.tech/img/remote/1460000016718899" alt="detailas&#x517C;&#x5BB9;&#x6027;" title="detailas&#x517C;&#x5BB9;&#x6027;" style="cursor:pointer;display:inline"></span></p><p>&#x9664;&#x4E86;IE&#x548C;Edge&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x5927;&#x597D;&#x6CB3;&#x5C71;&#x4E00;&#x7247;&#x7EFF;&#xFF0C;&#x81F3;&#x5C11;&#x79FB;&#x52A8;&#x7AEF;&#x53EF;&#x4EE5;&#x7528;&#x5F97;&#x6BD4;&#x8F83;&#x5F00;&#x5FC3;&#x3002;</p><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x5728;&#x684C;&#x9762;web&#x7F51;&#x9875;&#x4F7F;&#x7528;<code>&lt;details&gt;</code>&#x5143;&#x7D20;&#x7684;&#x68D2;&#x68D2;&#x54D2;&#x7279;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5BF9;&#x5176;&#x8FDB;&#x884C;Polyfill</p><p>&#x5BF9;&#x952E;&#x76D8;&#x8BBF;&#x95EE;&#xFF0C;&#x4E8B;&#x4EF6;toggle&#x90FD;&#x505A;&#x4E86;&#x517C;&#x5BB9;&#x3002;</p><p>&#x5982;&#x679C;&#x5F00;&#x53D1;&#x7B56;&#x7565;&#x662F;&#x5BF9;&#x4E0D;&#x652F;&#x6301;&#x7684;IE&#x8FDB;&#x884C;&#x7279;&#x5F02;&#x5904;&#x7406;&#xFF0C;&#x5219;&#x4E0B;&#x9762;&#x7684;JS&#x5224;&#x65AD;&#x662F;&#x5426;&#x652F;&#x6301;&lt;details&gt;&#x5143;&#x7D20;&#x7684;&#x811A;&#x672C;&#x53EF;&#x80FD;&#x5BF9;&#x4F60;&#x6709;&#x7528;&#xFF1A;</p><p><code>var isSupportDetails = &apos;open&apos; in document.createElement(&apos;details&apos;);</code></p><p>&#x6700;&#x540E;&#xFF0C;&#x65E0;JS&#x5B9E;&#x73B0;&#x7684;&#x597D;&#x5904;&#x6709;&#xFF1A;</p><p>&#x7701;&#x4E86;&#x4EE3;&#x7801;&#xFF0C;&#x52A0;&#x8F7D;&#x5FEB;&#x4E86;&#xFF1B;<br>&#x5B9E;&#x73B0;&#x66F4;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x5F00;&#x53D1;&#x5FEB;&#x4E86;&#xFF1B;<br>JS&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x4EA4;&#x4E92;&#x4E5F;&#x80FD;&#x8FDB;&#x884C;&#xFF0C;&#x4F53;&#x9A8C;&#x597D;&#x4E86;&#xFF1B;<br>&#x952E;&#x76D8;&#x65E0;&#x969C;&#x788D;&#x548C;aria&#x9605;&#x8BFB;&#x8BBE;&#x5907;&#x65E0;&#x969C;&#x788D;&#x5929;&#x7136;&#x652F;&#x6301;&#xFF0C;&#x4F53;&#x9A8C;&#x6863;&#x6B21;&#x9AD8;&#x4E86;&#x3002;</p><blockquote>&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x4E00;&#x4E0B;&#x6211;&#x7684;&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x4EA4;&#x6D41;&#x7FA4;&#xFF1A;784783012 &#xFF0C;&#x91CC;&#x9762;&#x90FD;&#x662F;&#x5B66;&#x4E60;&#x524D;&#x7AEF;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x5236;&#x4F5C;&#x9177;&#x70AB;&#x7684;&#x7F51;&#x9875;&#xFF0C;&#x60F3;&#x5B66;&#x4E60;&#x77E5;&#x8BC6;&#x3002;&#x81EA;&#x5DF1;&#x6574;&#x7406;&#x4E86;&#x4E00;&#x4EFD;2018&#x6700;&#x5168;&#x9762;&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x8D44;&#x6599;&#xFF0C;&#x4ECE;&#x6700;&#x57FA;&#x7840;&#x7684;HTML+CSS+JS&#x5230;&#x79FB;&#x52A8;&#x7AEF;HTML5&#x5230;&#x5404;&#x79CD;&#x6846;&#x67B6;&#x7684;&#x5B66;&#x4E60;&#x8D44;&#x6599;&#x90FD;&#x6709;&#x6574;&#x7406;&#xFF0C;&#x9001;&#x7ED9;&#x6BCF;&#x4E00;&#x4F4D;&#x524D;&#x7AEF;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x6709;&#x60F3;&#x5B66;&#x4E60;web&#x524D;&#x7AEF;&#x7684;&#xFF0C;&#x6216;&#x662F;&#x8F6C;&#x884C;&#xFF0C;&#x6216;&#x662F;&#x5927;&#x5B66;&#x751F;&#xFF0C;&#x8FD8;&#x6709;&#x5DE5;&#x4F5C;&#x4E2D;&#x60F3;&#x63D0;&#x5347;&#x81EA;&#x5DF1;&#x80FD;&#x529B;&#x7684;&#xFF0C;&#x6B63;&#x5728;&#x5B66;&#x4E60;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x6B22;&#x8FCE;&#x52A0;&#x5165;&#x5B66;&#x4E60;&#x3002;</blockquote>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用HTML5，无JS实现各种交互效果

## 原文链接
[https://segmentfault.com/a/1190000016718878](https://segmentfault.com/a/1190000016718878)


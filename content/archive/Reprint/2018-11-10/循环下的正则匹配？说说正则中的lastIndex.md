---
title: 循环下的正则匹配？说说正则中的lastIndex
hidden: true
categories: [reprint]
slug: afda056b
date: 2018-11-10 02:30:10
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x5728;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x5339;&#x914D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x6709;&#x610F;&#x601D;&#x7684;&#x73B0;&#x8C61;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /\.jpg/g;
const arr = [
    &apos;test1.jpg&apos;,
    &apos;test2.jpg&apos;,
    &apos;test3.jpg&apos;,
    &apos;test4.jpg&apos;,
    &apos;test5.jpg&apos;,
];
arr.map(item =&gt; console.log(reg.test(item)));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\.jpg/g</span>;
<span class="hljs-keyword">const</span> arr = [
    <span class="hljs-string">&apos;test1.jpg&apos;</span>,
    <span class="hljs-string">&apos;test2.jpg&apos;</span>,
    <span class="hljs-string">&apos;test3.jpg&apos;</span>,
    <span class="hljs-string">&apos;test4.jpg&apos;</span>,
    <span class="hljs-string">&apos;test5.jpg&apos;</span>,
];
arr.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(reg.test(item)));</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF1A;&#x5B83;&#x7684;&#x89C4;&#x5219;&#x5C31;&#x662F;&#x5224;&#x65AD;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x662F;&#x5426;&#x542B;&#x6709;<code>.jpg</code>&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5FAA;&#x73AF;&#x5730;&#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8FDB;&#x884C;&#x5339;&#x914D;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#x7ED3;&#x679C;&#x3002;</p><p>&#x5F88;&#x663E;&#x7136;&#x8FD9;&#x975E;&#x5E38;&#x4E4B;&#x7B80;&#x5355;&#x561B;&#xFF0C;&#x8F93;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x5F53;&#x7136;&#x662F;&#x5168;&#x4E3A;<code>true</code>&#x5566;~</p><p>&#x7136;&#x800C;&#xFF0C;&#x56FE;&#x6837;&#x56FE;&#x68EE;&#x7834;&#xFF0C;&#x5B83;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbgOxg?w=340&amp;h=270" src="https://static.alili.tech/img/bVbgOxg?w=340&amp;h=270" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x975E;&#x5E38;&#x795E;&#x5947;&#xFF1A;&#x5B83;&#x5E76;&#x6CA1;&#x6709;&#x5168;&#x90E8;&#x6253;&#x5370;<code>true</code>&#xFF0C;&#x800C;&#x662F;&#x4EA4;&#x66FF;&#x6253;&#x5370;<code>true</code>&#x548C;<code>false</code>&#x503C;&#xFF0C;&#x8FD9;&#x5230;&#x5E95;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;<br>&#x4E3A;&#x4E86;&#x67E5;&#x6E05;&#x695A;&#x5230;&#x5E95;&#x662F;&#x600E;&#x4E48;&#x56DE;&#x4E8B;&#xFF0C;&#x6211;&#x5F00;&#x59CB;&#x4E0A;&#x7F51;&#x641C;&#x7D22;&#x76F8;&#x5173;&#x8D44;&#x6599;&#xFF0C;&#x7ECF;&#x8FC7;&#x4E00;&#x756A;&#x641C;&#x7D22;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x6B63;&#x5219;&#x5E76;&#x6CA1;&#x6709;&#x6211;&#x4EEC;&#x60F3;&#x8C61;&#x7684;&#x90A3;&#x4E48;&#x7B80;&#x5355;...</p><hr><h3 id="articleHeader0">what&apos;s going on?</h3><p>&#x9996;&#x5148;&#x6B63;&#x5219;&#x6709;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x53EB;<code>lastIndex</code>&#xFF0C;&#x5B83;&#x8868;&#x793A;<strong>&#x6B63;&#x5219;&#x4E0B;&#x4E00;&#x6B21;&#x5339;&#x914D;&#x65F6;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</strong>&#x3002;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x6211;&#x4EEC;&#x662F;&#x4F7F;&#x7528;&#x4E0D;&#x5230;&#x5B83;&#x7684;&#xFF0C;&#x4F46;&#x5728;&#x6B63;&#x5219;&#x4E2D;&#x5305;&#x542B;&#x5168;&#x5C40;&#x6807;&#x5FD7;<code>g</code>&#x65F6;&#xFF0C;&#x6B63;&#x5219;&#x7684;<code>test</code>&#x548C;<code>exec</code>&#x65B9;&#x6CD5;&#x5C31;&#x4F1A;&#x4F7F;&#x7528;&#x5230;&#x5B83;&#xFF0C;&#x5177;&#x4F53;&#x89C4;&#x5219;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x521D;&#x59CB;&#x72B6;&#x6001;&#x4E0B;<code>lastIndex</code>&#x7684;&#x503C;&#x4E3A;0</li><li>&#x82E5;&#x6210;&#x529F;&#x5339;&#x914D;&#xFF0C;<code>lastIndex</code>&#x7684;&#x503C;&#x5C31;&#x88AB;&#x66F4;&#x65B0;&#x6210;<strong>&#x88AB;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;&#x540E;&#x9762;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x7684;index</strong>&#xFF0C;&#x6216;&#x8005;&#x53EF;&#x7406;&#x89E3;&#x4E3A;<strong>&#x88AB;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;index + 1</strong>&#xFF0C;</li><li>&#x82E5;&#x5339;&#x914D;&#x5931;&#x8D25;&#xFF0C;<code>lastIndex</code>&#x5219;&#x88AB;&#x91CD;&#x7F6E;&#x4E3A;0&#x3002;</li><li>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x4F7F;&#x7528;&#x539F;&#x5148;&#x7684;&#x6B63;&#x5219;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x8F6E;&#x5339;&#x914D;&#xFF0C;&#x5B83;&#x5219;&#x4F1A;&#x4ECE;&#x5B57;&#x7B26;&#x4E32;<code>lastIndex</code>&#x7684;&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x8FDB;&#x884C;</li></ul><p>&#x4E3A;&#x9A8C;&#x8BC1;&#x8FD9;&#x4E2A;&#x7ED3;&#x8BBA;&#xFF0C;&#x6211;&#x7279;&#x610F;&#x505A;&#x4E86;&#x4E24;&#x4E2A;&#x5B9E;&#x9A8C;&#xFF1A;</p><p>&#x7B2C;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x76F4;&#x63A5;&#x5C06;&#x6B63;&#x5219;&#x7684;<code>lastIndex</code>&#x6253;&#x5370;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /\.jpg/g;
const arr = [
    &apos;test1.jpg&apos;,
    &apos;test2.jpg&apos;,
    &apos;test3.jpg&apos;,
    &apos;test4.jpg&apos;,
    &apos;test5.jpg&apos;,
];
arr.map(item =&gt; console.log(reg.test(item), reg.lastIndex));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\.jpg/g</span>;
<span class="hljs-keyword">const</span> arr = [
    <span class="hljs-string">&apos;test1.jpg&apos;</span>,
    <span class="hljs-string">&apos;test2.jpg&apos;</span>,
    <span class="hljs-string">&apos;test3.jpg&apos;</span>,
    <span class="hljs-string">&apos;test4.jpg&apos;</span>,
    <span class="hljs-string">&apos;test5.jpg&apos;</span>,
];
arr.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(reg.test(item), reg.lastIndex));</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgOxy?w=284&amp;h=274" src="https://static.alili.tech/img/bVbgOxy?w=284&amp;h=274" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x7B2C;&#x4E8C;&#x4E2A;&#x5C31;&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x7A0D;&#x4F5C;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reg = /\.jpg/g;
const arr = [
    &apos;test1.jpg&apos;,
    &apos;longTest4.jpg&apos;,
    &apos;test3.jpg&apos;,
    &apos;longTest4.jpg&apos;,
    &apos;test5.jpg&apos;,
];
arr.map(item =&gt; console.log(reg.test(item), reg.lastIndex));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\.jpg/g</span>;
<span class="hljs-keyword">const</span> arr = [
    <span class="hljs-string">&apos;test1.jpg&apos;</span>,
    <span class="hljs-string">&apos;longTest4.jpg&apos;</span>,
    <span class="hljs-string">&apos;test3.jpg&apos;</span>,
    <span class="hljs-string">&apos;longTest4.jpg&apos;</span>,
    <span class="hljs-string">&apos;test5.jpg&apos;</span>,
];
arr.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(reg.test(item), reg.lastIndex));</code></pre><p>&#x901A;&#x8FC7;&#x4E24;&#x7EC4;&#x5B9E;&#x9A8C;&#x7684;&#x5BF9;&#x6BD4;&#x89C2;&#x5BDF;&#xFF0C;&#x53D1;&#x73B0;&#x786E;&#x5B9E;&#x5982;&#x6B64;&#xFF1A;</p><p>&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x5B9E;&#x9A8C;&#x4E2D;&#xFF0C;&#x7531;&#x4E8E;&#x6570;&#x7EC4;&#x4E2D;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x957F;&#x5EA6;&#x90FD;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x6210;&#x529F;&#x5339;&#x914D;&#x540E;<code>lastIndex</code>&#x7684;&#x503C;&#x76F4;&#x63A5;&#x66F4;&#x65B0;&#x4E3A;9&#xFF0C;&#x4E0B;&#x6B21;&#x5339;&#x914D;&#x7684;&#x65F6;&#x5019;&#x76F4;&#x63A5;&#x4ECE;&#x7B2C;10&#x4E2A;&#x5B57;&#x7B26;&#x5F00;&#x59CB;&#xFF08;&#x5F88;&#x660E;&#x663E;&#x6839;&#x672C;&#x5C31;&#x6CA1;&#x7B2C;10&#x4E2A;&#x5B57;&#x7B26;&#x561B;&#xFF09;&#xFF0C;&#x56E0;&#x6B64;&#x5339;&#x914D;&#x5931;&#x8D25;&#xFF0C;<code>lastIndex</code>&#x91CD;&#x7F6E;&#x4E3A;0&#x3002;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#xFF0C;&#x6700;&#x7EC8;&#x4EE5;<code>9</code>&#x3001;<code>0</code>&#x3001;<code>9</code>&#x7684;&#x5F62;&#x5F0F;&#x4EA4;&#x66FF;&#x6253;&#x5370;&#x3002;</p><p>&#x800C;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B9E;&#x9A8C;&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x589E;&#x52A0;&#x4E86;&#x90E8;&#x5206;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x56E0;&#x6B64;&#x5BF9;&#x4E8E;&#x7B2C;2&#x3001;4&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x800C;&#x8A00;&#xFF0C;&#x5373;&#x4F7F;&#x4ECE;&#x7B2C;9&#x4E2A;&#x5B57;&#x7B26;&#x5F00;&#x59CB;&#x5339;&#x914D;&#xFF0C;&#x4F9D;&#x7136;&#x80FD;&#x5339;&#x914D;&#x5230;&#x540E;&#x8FB9;&#x7684;<code>.jpg</code>&#xFF0C;&#x6545;<code>lastIndex</code>&#x7EE7;&#x7EED;&#x66F4;&#x65B0;&#x5230;13</p><hr><p>&#x901A;&#x8FC7;&#x8FD9;&#x6B21;&#x5C0F;&#x5C0F;&#x7684;&#x5B9E;&#x9A8C;&#xFF0C;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x662F;&#x8981;&#x591A;&#x52A0;&#x5C0F;&#x5FC3;&#xFF0C;&#x5BF9;&#x4E8E;<code>test</code>&#x548C;<code>exec</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6700;&#x597D;&#x8FD8;&#x662F;&#x4E0D;&#x8981;&#x968F;&#x610F;&#x52A0;&#x4E0A;&#x5168;&#x5C40;&#x6807;&#x5FD7;<code>g</code>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
循环下的正则匹配？说说正则中的lastIndex

## 原文链接
[https://segmentfault.com/a/1190000016361529](https://segmentfault.com/a/1190000016361529)


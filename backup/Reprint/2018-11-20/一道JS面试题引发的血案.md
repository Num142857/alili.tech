---
title: '一道JS面试题引发的血案' 
date: 2018-11-20 2:30:10
hidden: true
slug: f3zdzbl8q5r
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015809543" src="https://static.alili.tech/img/remote/1460000015809543" alt="&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;" title="&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;" style="cursor:pointer;display:inline"></span></p><p>&#x521A;&#x5165;&#x804C;&#x65B0;&#x516C;&#x53F8;&#xFF0C;&#x5C5E;&#x4E8E;&#x516C;&#x53F8;&#x840C;&#x65B0;&#x4E00;&#x679A;&#xFF0C;&#x4E00;&#x5929;&#x4E0B;&#x5348;&#x5BF9;&#x7740;&#x5C4F;&#x5E55;&#x770B;&#x4EE3;&#x7801;&#x67B6;&#x6784;&#x65F6;&#x3002;<br>BI&#x9879;&#x76EE;&#x7EC4;&#x957F;&#x7ED9;&#x6211;&#x770B;&#x4E86;&#x4E00;&#x9053;&#x9762;&#x8BD5;&#x522B;&#x4EBA;&#x7684;JS&#x9762;&#x8BD5;&#x9898;&#x3002;</p><p>&#x867D;&#x7136;&#x7B54;&#x5BF9;&#x4E86;&#xFF0C;&#x4F46;&#x628A;&#x7406;&#x7531;&#x8BF4;&#x9519;&#x4E86;&#xFF0C;&#x7167;&#x6837;&#x4E0D;&#x53CA;&#x683C;&#x3002;</p><p>&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x76F4;&#x63A5;&#x4E0A;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
switch (a) {
    case 2:
        console.log(2)
    break;
    case 1, 2, 3:  // &#x8FD9;&#x91CC;case&#x662F;&#x5BF9;&#x6BD4;&#x51E0;&#x5462;&#xFF1F;
        console.log(1)
    break;
    default: 
    break;
}
// result&#xFF1A;&#x6700;&#x540E;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x4F1A;&#x8F93;&#x51FA;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">switch</span> (a) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>:  <span class="hljs-comment">// &#x8FD9;&#x91CC;case&#x662F;&#x5BF9;&#x6BD4;&#x51E0;&#x5462;&#xFF1F;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>: 
    <span class="hljs-keyword">break</span>;
}
<span class="hljs-comment">// result&#xFF1A;&#x6700;&#x540E;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x4F1A;&#x8F93;&#x51FA;</span></code></pre><p>&#x770B;&#x5B8C;&#x9898;&#x5982;&#x679C;&#x7B54;&#x5BF9;&#x5E76;&#x4E14;&#x77E5;&#x9053;&#x7406;&#x7531;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x4EC5;&#x5F53;&#x52A0;&#x6DF1;&#x5370;&#x8C61;&#xFF1B;&#x5982;&#x679C;&#x4F60;&#x4E5F;&#x50CF;&#x6211;&#x4E00;&#x6837;&#x4E0D;&#x660E;&#x6240;&#x4EE5;&#xFF0C;&#x8BF7;&#x4ED4;&#x7EC6;&#x5F80;&#x4E0B;&#x770B;&#x3002;</p><h3 id="articleHeader0">&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8868;&#x8FBE;&#x5F0F;1&#xFF0C;&#x8868;&#x8FBE;&#x5F0F;2&#xFF0C;&#x8868;&#x8FBE;&#x5F0F;3&#xFF0C;...... &#xFF0C;&#x8868;&#x8FBE;&#x5F0F;n" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code style="word-break:break-word;white-space:initial">&#x8868;&#x8FBE;&#x5F0F;<span class="hljs-number">1</span>&#xFF0C;&#x8868;&#x8FBE;&#x5F0F;<span class="hljs-number">2</span>&#xFF0C;&#x8868;&#x8FBE;&#x5F0F;<span class="hljs-number">3</span>&#xFF0C;...... &#xFF0C;&#x8868;&#x8FBE;&#x5F0F;n</code></pre><h4>&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8981;&#x9886;&#xFF1A;</h4><ol><li>&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8FD0;&#x7B97;&#x8FC7;&#x7A0B;&#x4E3A;&#xFF1A;&#x4ECE;&#x5DE6;&#x5F80;&#x53F3;&#x9010;&#x4E2A;&#x8BA1;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;</li><li>&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#xFF0C;&#x5B83;&#x7684;&#x503C;&#x4E3A;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x4E5F;&#x5373;&#x8868;&#x8FBE;&#x5F0F;n&#xFF09;&#x7684;&#x503C;</li><li>&#x9017;&#x53F7;&#x8FD0;&#x7B97;&#x7B26;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x522B;&#x5728;&#x6240;&#x6709;&#x8FD0;&#x7B97;&#x7B26;&#x4E2D;&#x6700;&#x4F4E;</li></ol><p>&#x6709;&#x4E86;&#x4E0A;&#x8FF0;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x518D;&#x56DE;&#x8FC7;&#x5934;&#x6765;&#x770B;&#x9762;&#x8BD5;&#x9898;&#x5C31;&#x5F88;&#x6E05;&#x6670;&#x4E86;&#x3002;</p><p>&#x6253;&#x94C1;&#x8D81;&#x70ED;&#xFF0C;&#x518D;&#x6765;&#x4E00;&#x9053;&#x9898;&#x6765;&#x52A0;&#x6DF1;&#x4E0B;&#x7406;&#x89E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i, j, k;
for (i = 0, j = 0; i &lt; 10, j &lt; 6; i++, j++) {
    k = i+j;
}
console.log(k); 

// result&#xFF1A;10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var i, j, k;
for (i = <span class="hljs-number">0</span>, j = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>, j &lt; <span class="hljs-number">6</span>; i++, j++) {
    k = i+j;
}
console.log(k); 

<span class="hljs-comment">// result&#xFF1A;10</span></code></pre><p>&#x6267;&#x884C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#x8868;</p><table><thead><tr><th>i</th><th>j</th><th>k</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>2</td></tr><tr><td>2</td><td>2</td><td>4</td></tr><tr><td>3</td><td>3</td><td>6</td></tr><tr><td>4</td><td>4</td><td>8</td></tr><tr><td>5</td><td>5</td><td>10</td></tr></tbody></table><p>&#x4E00;&#x76F4;&#x57CB;&#x5934;&#x5199;&#x4EE3;&#x7801;&#xFF0C;&#x6CA1;&#x7528;&#x5230;&#x7684;&#x77E5;&#x8BC6;&#x603B;&#x662F;&#x5BB9;&#x6613;&#x5FD8;&#x8BB0;&#xFF0C;&#x521A;&#x597D;&#x78B0;&#x5230;&#xFF0C;&#x7D22;&#x6027;&#x505A;&#x4E0B;&#x7B14;&#x8BB0;&#x52A0;&#x6DF1;&#x5370;&#x8C61;&#xFF0C;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x77E5;&#x8BC6;&#xFF0C;&#x4EC5;&#x4E3A;&#x88C5;X&#x3002;</p><blockquote>&#x4F5C;&#x8005;&#xFF1A;&#x4EE5;&#x4E50;&#x4E4B;&#x540D;<br>&#x672C;&#x6587;&#x539F;&#x521B;&#xFF0C;&#x6709;&#x4E0D;&#x5F53;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#x3002;&#x8F6C;&#x8F7D;&#x8BF7;&#x6307;&#x660E;&#x51FA;&#x5904;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一道JS面试题引发的血案

## 原文链接
[https://segmentfault.com/a/1190000015809540](https://segmentfault.com/a/1190000015809540)


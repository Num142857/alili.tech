---
title: 'scrollHeight, clientHeight, offsetHeight的区别'
hidden: true
categories: [reprint]
slug: a5a45d1f
date: 2018-11-06 15:28:31
---

{{< raw >}}
<h2 id="articleHeader0">&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x548C;&#x7F51;&#x9875;&#x6587;&#x6863;</h2><p>&#x5148;&#x660E;&#x786E;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x548C;&#x7F51;&#x9875;&#x6587;&#x6863;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x62FF;&#x4E0B;&#x9762;&#x8FD9;&#x5F20;&#x56FE;&#x6765;&#x8BF4;</p><p><span class="img-wrap"><img data-src="/img/bVbhCpA?w=804&amp;h=357" src="https://static.alili.tech/img/bVbhCpA?w=804&amp;h=357" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53F3;&#x8FB9;&#x90A3;&#x5F20;&#x56FE;&#x4E2D;&#xFF0C;&#x5927;&#x7EA2;&#x8272;&#x65B9;&#x6846;&#x6846;&#x8D77;&#x6765;&#x7684;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#xFF0C;&#x800C;&#x7F51;&#x9875;&#x6587;&#x6863;&#x5C31;&#x662F;&#x5DE6;&#x8FB9;&#x8FD9;&#x5F20;&#x56FE;&#x3002;&#x5148;&#x4E0D;&#x7528;&#x53BB;&#x7BA1;scrollHeight&#x8FD9;&#x4E9B;&#x4E1C;&#x897F;&#xFF0C;&#x540E;&#x9762;&#x518D;&#x89E3;&#x91CA;&#x3002;<br>&#x5148;&#x660E;&#x786E;<code>&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;</code>&#x548C;<code>&#x7F51;&#x9875;&#x6587;&#x6863;</code>&#x662F;&#x4E0D;&#x540C;&#x7684;&#xFF01;&#xFF01;&#x4E0D;&#x7528;&#x53BB;&#x7EA0;&#x7ED3;&#x5B83;&#x4EEC;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x9AD8;&#x5EA6;&#x76F8;&#x7B49;&#xFF0C;&#x660E;&#x767D;&#x8FD9;&#x4E24;&#x4E2A;&#x4EE3;&#x8868;&#x7684;&#x542B;&#x4E49;&#x624D;&#x662F;&#x6700;&#x91CD;&#x8981;&#x7684;&#x3002;</p><h3 id="articleHeader1">&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5BBD;&#xFF1A;window.innerWidth
&#x9AD8;&#xFF1A;window.innerHeight" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>&#x5BBD;&#xFF1A;<span class="hljs-built_in">window</span>.innerWidth
&#x9AD8;&#xFF1A;<span class="hljs-built_in">window</span>.innerHeight</code></pre><p>&#x4E00;&#x4E9B;&#x6CE8;&#x610F;&#x70B9;&#xFF1A;</p><ol><li>&#x65E0;&#x8BBA;&#x662F;&#x5426;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x503C;&#x90FD;&#x662F;&#x4E0D;&#x53D8;&#x7684;&#x3002;</li><li>&#x5F53;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x5927;&#x5C0F;&#x65F6;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x503C;&#x4F1A;&#x53D8;&#x3002;</li></ol><p>&#x7B80;&#x800C;&#x8A00;&#x4E4B;&#xFF1A;&#x5C31;&#x662F;&#x4F60;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x89C6;&#x7A97;&#x7684;&#x5927;&#x5C0F;(<code>&#x4E0D;&#x5305;&#x62EC;&#x9876;&#x90E8;&#x7684;&#x83DC;&#x5355;&#x680F;</code>)</p><p>&#x6709;&#x5C0F;&#x4F19;&#x4F34;&#x4F1A;&#x95EE;&#x4E86;&#xFF0C;&#x90A3;window.outerWidth&#x662F;&#x548C;outerHeight&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x5C31;&#x662F;&#x5305;&#x542B;&#x83DC;&#x5355;&#x680F;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x4F60;&#x53EF;&#x4EE5;&#x5728;chrome&#x91CC;&#x6309;&#x4E0B;F12&#x6253;&#x5F00;&#x8C03;&#x8BD5;&#x7A97;&#x53E3;&#xFF0C;&#x653E;&#x5728;&#x53F3;&#x4FA7;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;innerWidth&#x548C;outerWidth&#x662F;&#x4E0D;&#x540C;&#x7684;&#x3002;</p><h3 id="articleHeader2">&#x7F51;&#x9875;&#x6587;&#x6863;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5BBD;&#xFF1A;document.body.scrollWidth
&#x9AD8;&#xFF1A;document.body.scrollHeight" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x5BBD;&#xFF1A;document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollWidth</span>
&#x9AD8;&#xFF1A;document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollHeight</span></code></pre><p>&#x597D;&#x4E86;&#x65E2;&#x7136;&#x8FD9;&#x91CC;&#x8BB2;&#x5230;scrollHeight&#x4E86;&#xFF0C;&#x90A3;&#x521A;&#x597D;&#x628A;clientHeight&#x548C;offsetHeight&#x8BB2;&#x4E86;&#x3002;<br>&#x8981;&#x6BD4;&#x8F83;&#x8FD9;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x6709;&#x4E2A;&#x524D;&#x63D0;&#x6761;&#x4EF6;&#xFF0C;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x8981;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#x3002;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#x5C31;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style&gt;
        .container {
            width: 600px;
            height: 600px;
            padding: 10px;
            border: 10px solid lightgray;
            overflow: auto; // &#x6CE8;&#x610F;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;
        }
        .large_block {
            width: 1000px;
            height: 2000px;
            background-color: lightblue;
            padding: 20px;
            margin: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;div class=&quot;large_block&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
        .container {
            width: 600px;
            height: 600px;
            padding: 10px;
            border: 10px solid lightgray;
            overflow: auto; // &#x6CE8;&#x610F;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;
        }
        .large_block {
            width: 1000px;
            height: 2000px;
            background-color: lightblue;
            padding: 20px;
            margin: 20px;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;large_block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x62F7;&#x8D1D;&#x4EE3;&#x7801;&#x81EA;&#x5DF1;&#x770B;&#x6548;&#x679C;.</p><p><span class="img-wrap"><img data-src="/img/bVbhCNo?w=709&amp;h=668" src="https://static.alili.tech/img/bVbhCNo?w=709&amp;h=668" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9;&#x4E8E;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#xFF0C;&#x5206;&#x522B;&#x83B7;&#x53D6;:</p><p><span class="img-wrap"><img data-src="/img/bVbhCNu?w=492&amp;h=168" src="https://static.alili.tech/img/bVbhCNu?w=492&amp;h=168" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9;&#x4E8E;&#x8FD9;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x8FD8;&#x662F;&#x62FF;&#x8FD9;&#x5F20;&#x56FE;&#x6765;&#x8BF4;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhCpA?w=804&amp;h=357" src="https://static.alili.tech/img/bVbhCpA?w=804&amp;h=357" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><code>scrollHeight</code>: &#x5C31;&#x662F;container<code>&#x5185;&#x90E8;</code>&#x7684;&#x603B;&#x9AD8;&#x5EA6;<br>&#x8FD9;&#x91CC;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x5C31;&#x662F;large_block&#xFF0C;large_block&#x6240;&#x6491;&#x5F00;&#x7684;&#x9AD8;&#x5EA6;(2000 + 40&#xFF08;&#x4E0A;&#x4E0B;padding&#xFF09; + 40&#xFF08;&#x4E0A;&#x4E0B;margin&#xFF09;) = 2080px&#xFF0C;&#x7136;&#x540E;&#x52A0;&#x4E0A;&#x81EA;&#x8EAB;container&#x4E0A;&#x4E0B;&#x5404;10px&#x7684;padding,&#x56E0;&#x6B64;&#x4E00;&#x5171;&#x662F;2100px</p><p><code>clientHeight</code>: &#x5C31;&#x662F;container&#x5185;&#x90E8;&#x53EF;&#x89C1;&#x9AD8;&#x5EA6; + &#x81EA;&#x8EAB;padding&#x3002;<br>&#x5185;&#x90E8;&#x53EF;&#x89C1;&#x9AD8;&#x5EA6;&#x4E3A;600 - 17(&#x6EDA;&#x52A8;&#x6761;&#x9AD8;&#x5EA6;)<br>padding&#x4E3A;&#x4E0A;&#x4E0B;&#x5404;10&#xFF0C;&#x56E0;&#x6B64;&#x4E00;&#x5171;&#x662F;600 - 17 + 20 = 603</p><p><code>offsetHeight</code>: &#x4E5F;&#x662F;container&#x81EA;&#x5DF1;&#x672C;&#x8EAB;&#x7684;&#x53EF;&#x89C1;&#x9AD8;&#x5EA6; + &#x81EA;&#x8EAB;padding <code>+ &#x81EA;&#x8EAB;border + &#x6EDA;&#x52A8;&#x6761;</code><br>&#x4E0E;clientHeight&#x4E0D;&#x540C;&#x7684;&#x5C31;&#x662F;&#x8981;&#x52A0;&#x4E0A;&#x81EA;&#x8EAB;border&#x4EE5;&#x53CA;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x56E0;&#x6B64;&#x662F;603 + 20 + 17 = 640</p><h2 id="articleHeader3">&#x5199;&#x5728;&#x6700;&#x540E;</h2><p>&#x6709;&#x95EE;&#x9898;&#x7684;&#x8BDD;&#x6B22;&#x8FCE;&#x8BA8;&#x8BBA;~&#x4E00;&#x8D77;&#x8FDB;&#x6B65;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
scrollHeight, clientHeight, offsetHeight的区别

## 原文链接
[https://segmentfault.com/a/1190000016554851](https://segmentfault.com/a/1190000016554851)


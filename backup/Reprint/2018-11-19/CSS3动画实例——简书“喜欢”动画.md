---
title: 'CSS3动画实例——简书“喜欢”动画' 
date: 2018-11-19 2:32:04
hidden: true
slug: d3ih8kwrpiu
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015815895" src="https://static.alili.tech/img/remote/1460000015815895" alt="&#x559C;&#x6B22;.gif" title="&#x559C;&#x6B22;.gif" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x7B80;&#x4E66;&#x91CC;&#x9762;&#xFF0C;&#x6BCF;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5E95;&#x90E8;&#x90FD;&#x6709;&#x559C;&#x6B22;&#x8FD9;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x5982;&#x540C;&#x4E0A;&#x56FE;&#x7684;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#xFF0C;&#x4F53;&#x9A8C;&#x975E;&#x5E38;&#x597D;&#xFF0C;&#x7A76;&#x7ADF;&#x662F;&#x600E;&#x4E48;&#x505A;&#x7684;&#x5462;&#xFF1F;<br>&#x9996;&#x5148;&#xFF0C;&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x653B;&#x57CE;&#x72EE;&#x7684;&#x6211;&#x4EEC;&#xFF0C;&#x6765;&#x53F3;&#x952E;&#x67E5;&#x770B;&#x4E00;&#x6CE2;&#x2193;<br><span class="img-wrap"><img data-src="/img/remote/1460000015815896" src="https://static.alili.tech/img/remote/1460000015815896" alt="&#x53F3;&#x952E;" title="&#x53F3;&#x952E;" style="cursor:pointer;display:inline"></span><br>&#x770B;&#x5230;&#x8FD9;&#x4E2A;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x4F2A;&#x7C7B;&#xFF0C;&#x7136;&#x540E;&#x653E;&#x7684;&#x80CC;&#x666F;&#x56FE;&#x7247;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x4E2A;&#x80CC;&#x666F;&#x56FE;&#x7247;&#x5728;&#x65B0;&#x6807;&#x7B7E;&#x9875;&#x4E2D;&#x6253;&#x5F00;&#xFF0C;&#x4F1A;&#x770B;&#x5230;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#xFF0C;&#x6709;&#x70B9;&#x50CF;&#x4EE5;&#x524D;&#x505A;&#x7684;&#x90A3;&#x79CD;&#x96EA;&#x78A7;&#x56FE;<br><span class="img-wrap"><img data-src="/img/remote/1460000015815897" src="https://static.alili.tech/img/remote/1460000015815897" alt="&#x559C;&#x6B22;&#x7684;&#x80CC;&#x666F;&#x56FE;" title="&#x559C;&#x6B22;&#x7684;&#x80CC;&#x666F;&#x56FE;" style="cursor:pointer;display:inline"></span></p><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x5F20;&#x56FE;&#x7247;&#x4E0B;&#x8F7D;&#x4E0B;&#x6765;&#x5230;&#x672C;&#x5730;&#xFF0C;&#x65B0;&#x5EFA;&#x4E2A;HTML&#xFF0C;&#x5148;&#x628A;button&#x7684;&#x57FA;&#x672C;&#x6837;&#x5F0F;&#x5199;&#x51FA;&#x6765;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    #like{
        background: #EA6F5A;
        color: white;
        padding: 13px 0 15px 0;
        font-size: 19px;
        border: 1px solid #EA6F5A;
        border-radius: 40px;
        width: 100px;
        position: relative;
        padding-left: 20px;
        cursor: pointer;
        text-align: center;
    }
&lt;/style&gt;
&lt;div class=&quot;like&quot;  onclick=&quot;like()&quot; id=&quot;like&quot;&gt;&#x559C;&#x6B22;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#like</span>{
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#EA6F5A</span>;
        <span class="hljs-attribute">color</span>: white;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">13px</span> <span class="hljs-number">0</span> <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">19px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#EA6F5A</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">text-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;like&quot;</span>  <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;like()&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;like&quot;</span>&gt;</span>&#x559C;&#x6B22;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5F97;&#x5230;&#x57FA;&#x672C;&#x7684;&#x6309;&#x94AE;&#x6837;&#x5F0F;&#x4E86;<br><span class="img-wrap"><img data-src="/img/remote/1460000015815898" src="https://static.alili.tech/img/remote/1460000015815898" alt="image.png" title="image.png" style="cursor:pointer;display:inline"></span></p><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x518D;&#x5199;&#x52A8;&#x753B;&#x7684;&#x6837;&#x5F0F;<br>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x6570;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x603B;&#x5171;&#x6709;&#x591A;&#x5C11;&#x6B65;&#xFF0C;&#x5C31;&#x662F;&#x53BB;&#x6570; &#x559C;&#x6B22;&#x7684;&#x80CC;&#x666F;&#x56FE;&#x603B;&#x5171;&#x6709;&#x591A;&#x5C11;&#x5E45;&#xFF0C;&#x518D;&#x53BB;&#x51CF;&#x4E00;&#x3002;&#x6570;&#x51FA;&#x6765;&#x603B;&#x5171;19&#x6B65;&#xFF0C;&#x5148;&#x5B58;&#x7740;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x7528;&#x5230;&#x3002;<br>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x6253;&#x7B97;&#x7528;&#x4F2A;&#x7C7B;&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;<br>&#x5148;&#x5199;&#x57FA;&#x672C;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".like::before{
        content: &apos;&apos;;
        position: absolute;
        left: 5px;
        top: 2px;
        width: 50px;
        height: 50px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.like</span><span class="hljs-selector-pseudo">::before</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x628A;&#x90A3;&#x4E2A;&#x80CC;&#x666F;&#x56FE;&#x5F15;&#x5165;&#x8FDB;&#x53BB;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".like::before{
        content: &apos;&apos;;
        position: absolute;
        left: 5px;
        top: 2px;
        width: 50px;
        height: 50px;
        background-image: url(https://cdn2.jianshu.io/assets/web/like_animation_steps-62a00a7b52377d3069927cdb8e61fd34.png);
        background-position: left;
        background-repeat: no-repeat;
        background-size: 1000px 50px;
        background-position: right;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.like</span><span class="hljs-selector-pseudo">::before</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(https://cdn2.jianshu.io/assets/web/like_animation_steps-62a00a7b52377d3069927cdb8e61fd34.png);
        <span class="hljs-attribute">background-position</span>: left;
        <span class="hljs-attribute">background-repeat</span>: no-repeat;
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">1000px</span> <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">background-position</span>: right;
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x5F97;&#x5230;&#x4E86;&quot;&#x559C;&#x6B22;&quot;&#x7684;&#x6700;&#x7EC8;&#x5B8C;&#x6210;&#x7684;&#x65F6;&#x5019;&#x7684;&#x6837;&#x5F0F;&#x4E86;<br><span class="img-wrap"><img data-src="/img/remote/1460000015815899" src="https://static.alili.tech/img/remote/1460000015815899" alt="&#x52A8;&#x753B;&#x6700;&#x7EC8;&#x5B8C;&#x6210;&#x7684;&#x6837;&#x5F0F;" title="&#x52A8;&#x753B;&#x6700;&#x7EC8;&#x5B8C;&#x6210;&#x7684;&#x6837;&#x5F0F;" style="cursor:pointer;display:inline"></span></p><p>&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x50CF; &#x7B80;&#x4E66; &#x90A3;&#x6837;&#xFF0C;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;<a href="http://www.runoob.com/css3/css3-animations.html" rel="nofollow noreferrer" target="_blank">&#x76F8;&#x5173;&#x6280;&#x672F;&#x4F20;&#x9001;&#x95E8;</a><br>&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    @keyframes like{
        0%{background-position: left;};
        100%{background-position: right;}
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>    @<span class="hljs-keyword">keyframes</span> like{
        0%{<span class="hljs-attribute">background-position</span>: left;};
        100%{<span class="hljs-attribute">background-position</span>: right;}
    }</code></pre><p>&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x5F00;&#x59CB;&#x7684;&#x65F6;&#x5019;&#x662F;&#x6700;&#x5DE6;&#x8FB9;&#xFF0C;&#x7ED3;&#x675F;&#x5C31;&#x662F;&#x6700;&#x53F3;&#x8FB9;&#xFF0C;&#x8FD8;&#x8981;&#x5728;like&#x7684;&#x6837;&#x5F0F;&#x91CC;&#x52A0;&#x591A;&#x4E00;&#x53E5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation:like  0.6s 1 steps(19);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less" style="word-break:break-word;white-space:initial"><span class="hljs-attribute">animation</span>:like  <span class="hljs-number">0.6s</span> <span class="hljs-number">1</span> steps(<span class="hljs-number">19</span>);</code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x5237;&#x65B0;&#x5C31;&#x80FD;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x52A8;&#x753B;&#x4E86;&#xFF0C;&#x4E3A;&#x4E86;&#x8FFD;&#x6C42;&#x5B8C;&#x7F8E;&#xFF0C;&#x5373;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x51FA;&#x73B0;&#x52A8;&#x753B;&#xFF0C;&#x518D;&#x70B9;&#x4E00;&#x4E0B;&#x53C8;&#x6CA1;&#x6709;&#xFF0C;&#x518D;&#x70B9;&#x4E00;&#x4E0B;&#x53C8;&#x51FA;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div class=&quot;like&quot;  onclick=&quot;like()&quot; id=&quot;like&quot;&gt;&#x559C;&#x6B22;&lt;/div&gt;
    &lt;script&gt;
        function like(){
            var like = document.querySelector(&apos;#like&apos;);
            console.log(like.classList)
            if(like.classList.length == 0)
                like.className = &apos;like&apos;
            else
                like.className = &apos;&apos;
        }
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;like&quot;</span>  <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;like()&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;like&quot;</span>&gt;</span>&#x559C;&#x6B22;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">like</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> like = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#like&apos;</span>);
            <span class="hljs-built_in">console</span>.log(like.classList)
            <span class="hljs-keyword">if</span>(like.classList.length == <span class="hljs-number">0</span>)
                like.className = <span class="hljs-string">&apos;like&apos;</span>
            <span class="hljs-keyword">else</span>
                like.className = <span class="hljs-string">&apos;&apos;</span>
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684; &#x7B80;&#x4E66;&#x559C;&#x6B22;&#x52A8;&#x753B;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3动画实例——简书“喜欢”动画

## 原文链接
[https://segmentfault.com/a/1190000015815892](https://segmentfault.com/a/1190000015815892)


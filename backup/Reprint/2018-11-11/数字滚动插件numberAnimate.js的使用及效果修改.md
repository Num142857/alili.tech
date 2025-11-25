---
title: 数字滚动插件numberAnimate.js的使用及效果修改
hidden: true
categories: [reprint]
slug: 3b1ac21d
date: 2018-11-11 02:30:07
---

{{< raw >}}
<p>&#x6709;&#x4E2A;&#x5B9E;&#x73B0;&#x6570;&#x5B57;&#x6EDA;&#x52A8;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x60F3;&#x7740;&#x80AF;&#x5B9A;&#x6709;&#x5F88;&#x591A;&#x8FD9;&#x79CD;&#x6548;&#x679C;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x5C31;&#x4E0D;&#x81EA;&#x5DF1;&#x9020;&#x8F6E;&#x5B50;&#x4E86;&#xFF0C;&#x4E8E;&#x662F;&#xFF0C;&#x627E;&#x4E86;&#x4E2A;<a href="https://github.com/zoeblow/numberAnimate" rel="nofollow noreferrer" target="_blank">numberAnimate js&#x6570;&#x5B57;&#x6EDA;&#x52A8;&#x63D2;&#x4EF6;</a>&#xFF0C;&#x8FD8;&#x633A;&#x597D;&#x7528;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x521A;&#x597D;&#x7B26;&#x5408;&#x9700;&#x6C42;&#x3002;</p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;title&gt;&#x6570;&#x5B57;&#x6EDA;&#x52A8;&#x63D2;&#x4EF6;&lt;/title&gt;
        &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;../dist/style/numberAnimate.css&quot; /&gt;
    &lt;/head&gt;
    &lt;body&gt;
    &#x65E0;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x65E0;&#x5C0F;&#x6570;&#x70B9;&#xFF1A;&lt;div class=&quot;numberRun&quot;&gt;&lt;/div&gt;&lt;br&gt;&lt;br&gt;
    &lt;/body&gt;
    &lt;script src=&quot;http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js&quot;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot; src=&quot;../dist/script/numberAnimate.js&quot;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    $(function(){
        //&#x521D;&#x59CB;&#x5316;
        var numRun = $(&quot;.numberRun&quot;).numberAnimate({num:&apos;1553093&apos;, speed:1000});
        //&#x60F3;&#x8981;&#x7684;&#x662F;&#x8FC7;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x52A0;1&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;
        var nums = 1553093;
        setInterval(function(){
            nums+= 1;
            numRun.resetData(nums);
        },2000);

    })
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x6570;&#x5B57;&#x6EDA;&#x52A8;&#x63D2;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;../dist/style/numberAnimate.css&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    &#x65E0;&#x5206;&#x9694;&#x7B26;&#xFF0C;&#x65E0;&#x5C0F;&#x6570;&#x70B9;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;numberRun&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;../dist/script/numberAnimate.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//&#x521D;&#x59CB;&#x5316;</span>
        <span class="hljs-keyword">var</span> numRun = $(<span class="hljs-string">&quot;.numberRun&quot;</span>).numberAnimate({<span class="hljs-attr">num</span>:<span class="hljs-string">&apos;1553093&apos;</span>, <span class="hljs-attr">speed</span>:<span class="hljs-number">1000</span>});
        <span class="hljs-comment">//&#x60F3;&#x8981;&#x7684;&#x662F;&#x8FC7;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x52A0;1&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;</span>
        <span class="hljs-keyword">var</span> nums = <span class="hljs-number">1553093</span>;
        setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            nums+= <span class="hljs-number">1</span>;
            numRun.resetData(nums);
        },<span class="hljs-number">2000</span>);

    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#x662F;&#x8FC7;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x52A0;1&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;<code>bug</code>&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#xFF0C;&#x4E2A;&#x4F4D;&#x6570;&#x5B57;&#x52A0;&#x5230;9&#x65F6;&#x8FDB;&#x4E00;&#x4F4D;&#x7136;&#x540E;&#x8BE5;&#x4F4D;&#x4E0A;&#x4E3A;0&#xFF0C;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;0&#x7684;&#x6570;&#x5B57;&#x5374;&#x6EDA;&#x52A8;&#x4E0D;&#x51FA;&#x6765;&#xFF0C;&#x76F4;&#x63A5;&#x5230;&#x4E86;&#x4E0B;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#x65F6;&#x6EDA;&#x52A8;&#x5230;&#x4E86;11&#xFF0C;&#x8C03;&#x8BD5;&#x4E86;&#x5F88;&#x4E45;&#x53D1;&#x73B0;&#xFF0C;&#x662F;<code>numberAnimate.js</code>&#x4E2D;&#xFF0C;&#x7B2C;85&#x884C;&#x7684;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x6CE8;&#x91CA;&#x6389;&#x8BE5;if&#x5224;&#x65AD;&#x5C31;&#x597D;&#x4E86;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbgBic?w=666&amp;h=549" src="https://static.alili.tech/img/bVbgBic?w=666&amp;h=549" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4E0A;&#x56FE;&#x4E2D;&#xFF0C;&#x7B2C;85&#x884C;&#x7684;<code>$(this).css(&quot;top&quot;)</code>&#x4E00;&#x76F4;&#x90FD;&#x662F;<code>0px</code>&#xFF0C;&#x800C;&#x7B2C;84&#x884C;&#x8BA1;&#x7B97;&#x83B7;&#x53D6;&#x5230;&#x7684;<code>thisTop</code> &#x5728;&#x6570;&#x5B57;&#x6EDA;&#x5230;&#x5230;0 &#x65F6;&#x503C;&#x4E3A;<code>0px</code>&#xFF0C;&#x6240;&#x4EE5;&#x5BFC;&#x81F4;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x4E86;&#x5224;&#x65AD;&#xFF0C;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x5230;<code>transform</code>&#x52A8;&#x753B;&#x90A3;&#x91CC;&#xFF0C;&#x6240;&#x4EE5;&#x5C11;&#x4E86;0&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5BFC;&#x81F4;&#x770B;&#x8D77;&#x6765;&#x7684;&#x6548;&#x679C;&#x5C31;&#x662F;9&#x76F4;&#x63A5;&#x8DF3;&#x5230;&#x4E86;11&#xFF0C;&#x6CA1;&#x6709;10&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x63D0;&#x793A;&#x4E00;&#x53E5;&#xFF0C;&#x6539;&#x53D8;&#x6570;&#x5B57;&#x7684;&#x5B57;&#x53F7;&#x5927;&#x5C0F;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x7684;<code>numberAnimate.css</code>&#x4E2D;&#x7684;<code>height&#x3001;width&#x3001;&#x5B57;&#x53F7;</code>&#x7684;&#x6BD4;&#x4F8B;&#x8981;&#x628A;&#x63E1;&#x597D;&#xFF0C;&#x4E00;&#x4E0D;&#x5C0F;&#x5FC3;&#x5C31;&#x574F;&#x4E86;&#xFF0C;&#x5475;&#x5475;&#xFF0C;&#x4EB2;&#x8EAB;&#x4F53;&#x4F1A; -_-||</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数字滚动插件numberAnimate.js的使用及效果修改

## 原文链接
[https://segmentfault.com/a/1190000016310706](https://segmentfault.com/a/1190000016310706)


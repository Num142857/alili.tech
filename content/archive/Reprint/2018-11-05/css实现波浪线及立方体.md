---
title: css实现波浪线及立方体
hidden: true
categories: reprint
slug: 67000d76
date: 2018-11-05 02:30:10
---

{{< raw >}}
<blockquote>&#x6700;&#x8FD1;&#x7684;&#x9879;&#x76EE;&#x6709;&#x505A;&#x5230;&#x8981;&#x753B;&#x51FA;&#x6CE2;&#x6D6A;&#x7EBF;&#x6548;&#x679C;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;&#x5229;&#x7528;linear-gradient&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x753B;&#x5706;&#xFF0C;&#x7136;&#x540E;&#x5229;&#x7528;&#x5E95;&#x8272;&#x6765;&#x906E;&#x4F4F;&#x90E8;&#x5206;&#x5706;&#xFF1B;<br>&#x5229;&#x7528;css3&#x5C5E;&#x6027;perspective&#x52A0;&#x65CB;&#x8F6C;&#x5B9E;&#x73B0;&#x7ACB;&#x65B9;&#x4F53;</blockquote><h1 id="articleHeader0">1.css&#x5B9E;&#x73B0;&#x6CE2;&#x6D6A;&#x7EBF;</h1><ul><li>html</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;card-list&quot;&gt;
    &lt;div class=&quot;wave-container&quot;&gt;
        &lt;div class=&quot;wave&quot;&gt;&lt;/div&gt;
        &lt;!-- &#x5B9E;&#x73B0;&#x6CE2;&#x6D6A;&#x7EBF;&#x7684;div --&gt;
        &lt;div class=&quot;wave-left-decorate&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;wave-right-decorate&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;card-list&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wave-container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wave&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x5B9E;&#x73B0;&#x6CE2;&#x6D6A;&#x7EBF;&#x7684;div --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wave-left-decorate&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wave-right-decorate&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre><ul><li>css</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".card-list{
    display: flex;
    padding: 20px;
    width: 100%;
}
.wave-container{
    position: relative;
    margin-right: 28px;
    width: 20%;
}
.wave{
    width: 100%;
    height: 90px;
    background: linear-gradient(to right, rgb(85, 181, 255), rgb(207, 224, 232));
}
/* &#x6CE2;&#x6D6A;&#x7EBF; */
.wave-left-decorate{
    position: absolute;
    top: -4px;
    width: 90px;
    height: 8px;
    transform-origin: center left;
    transform: rotate(90deg);
    background: radial-gradient(circle, #fff 2px, #fff, transparent 3px, transparent 4px, transparent 4px, transparent);
    background-size: 8px 8px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.card-list</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.wave-container</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">28px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20%</span>;
}
<span class="hljs-selector-class">.wave</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">90px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, rgb(85, 181, 255), <span class="hljs-built_in">rgb</span>(207, 224, 232));
}
<span class="hljs-comment">/* &#x6CE2;&#x6D6A;&#x7EBF; */</span>
<span class="hljs-selector-class">.wave-left-decorate</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">transform-origin</span>: center left;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle, #fff 2px, #fff, transparent 3px, transparent 4px, transparent 4px, transparent);
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">8px</span> <span class="hljs-number">8px</span>;
}</code></pre><ul><li>&#x6548;&#x679C;&#x56FE;</li></ul><blockquote><span class="img-wrap"><img data-src="/img/bVbhKSj?w=851&amp;h=235" src="https://static.alili.tech/img/bVbhKSj?w=851&amp;h=235" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></blockquote><h1 id="articleHeader1">2.&#x5B9E;&#x73B0;&#x7ACB;&#x65B9;&#x4F53;</h1><ul><li>html&#x6587;&#x4EF6;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;content&quot;&gt;
    &lt;div class=&quot;leftContent&quot;&gt;
        &lt;div class=&quot;leftContentItem&quot;&gt;
            &lt;div class=&quot;itemImg&quot;&gt;
                &lt;img class=&quot;leftContentImg&quot; src=&quot;images/rabbit.jpg&quot; alt=&quot;&quot;/&gt;
                &lt;img class=&quot;leftContentImg&quot; src=&quot;images/rabbit.jpg&quot; alt=&quot;&quot;/&gt;
                &lt;img class=&quot;leftContentImg&quot; src=&quot;images/rabbit.jpg&quot; alt=&quot;&quot;/&gt;
                &lt;img class=&quot;leftContentImg&quot; src=&quot;images/rabbit.jpg&quot; alt=&quot;&quot;/&gt;
                &lt;img class=&quot;leftContentImg&quot; src=&quot;images/rabbit.jpg&quot; alt=&quot;&quot;/&gt;
                &lt;img class=&quot;leftContentImg&quot; src=&quot;images/rabbit.jpg&quot; alt=&quot;&quot;/&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContent&quot;</span>&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentItem&quot;</span>&gt;
            &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;itemImg&quot;</span>&gt;
                &lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentImg&quot;</span> src=<span class="hljs-string">&quot;images/rabbit.jpg&quot;</span> alt=<span class="hljs-string">&quot;&quot;</span>/&gt;
                &lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentImg&quot;</span> src=<span class="hljs-string">&quot;images/rabbit.jpg&quot;</span> alt=<span class="hljs-string">&quot;&quot;</span>/&gt;
                &lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentImg&quot;</span> src=<span class="hljs-string">&quot;images/rabbit.jpg&quot;</span> alt=<span class="hljs-string">&quot;&quot;</span>/&gt;
                &lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentImg&quot;</span> src=<span class="hljs-string">&quot;images/rabbit.jpg&quot;</span> alt=<span class="hljs-string">&quot;&quot;</span>/&gt;
                &lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentImg&quot;</span> src=<span class="hljs-string">&quot;images/rabbit.jpg&quot;</span> alt=<span class="hljs-string">&quot;&quot;</span>/&gt;
                &lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;leftContentImg&quot;</span> src=<span class="hljs-string">&quot;images/rabbit.jpg&quot;</span> alt=<span class="hljs-string">&quot;&quot;</span>/&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre><ul><li>css&#x6587;&#x4EF6;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".content{
    position: relative;
    display: flex;
    margin: 0 auto;
    padding-top: 50px;
    width: 1200px;
    height: 380px;
    background: url(../images/bg2.jpg) no-repeat;
    background-size: 1200px 100%;
}
.content .leftContent{
    margin-right: 25px;
    padding-left: 45px;
    padding-bottom: 30px;
    box-sizing: border-box;
}
/* &#x65CB;&#x8F6C;&#x7684;&#x56FE;&#x7247; */
.content .leftContent .leftContentItem{
    width: 350px;
    height: 350px;
    /* &#x8BBE;&#x7F6E;&#x666F;&#x6DF1; */
    perspective: 1000px;
    /* &#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x989C;&#x8272;&#x5728;&#x4E2D;&#x95F4;&#x4E3A;&#x692D;&#x5706;&#x5F62; */
    /*background: radial-gradient(ellipse at center, #430d6d 0%, #000 100%);*/
}
.leftContent .leftContentItem .itemImg{
    position: absolute;
    left: 20%;
    top: 20%;
    width: 200px;
    height: 200px;
    /* &#x5B9E;&#x73B0;3D&#x5448;&#x73B0; */
    transform-style: preserve-3d;
    transform: rotateX(-20deg) rotateY(-20deg);
    -webkit-animation: 6s imgRotate linear infinite;
    -o-animation: 6s imgRotate linear infinite;
    animation: 6s imgRotate linear infinite;
}
.leftContent .leftContentItem .itemImg *{
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 25px rgba(0, 128, 0, .4);
}
.leftContentItem .itemImg .leftContentImg{
    position: absolute;
    width: 100%;
    height: 100%;
}
/* &#x5206;&#x522B;&#x5BF9;&#x5404;&#x4E2A;&#x9762;&#x8FDB;&#x884C;&#x65CB;&#x8F6C;&#x3001;&#x5E73;&#x79FB;&#x64CD;&#x4F5C; */
.leftContentItem .itemImg .leftContentImg:nth-child(1){
    transform: translateZ(100px);
}
.leftContentItem .itemImg .leftContentImg:nth-child(2){
    transform: rotateX(180deg) translateZ(100px);
}
.leftContentItem .itemImg .leftContentImg:nth-child(3){
    transform: rotateY(-90deg) translateZ(100px);
}
.leftContentItem .itemImg .leftContentImg:nth-child(4){
    transform: rotateY(90deg) translateZ(100px);
}
.leftContentItem .itemImg .leftContentImg:nth-child(5){
    transform: rotateX(90deg) translateZ(100px);
}
.leftContentItem .itemImg .leftContentImg:nth-child(6){
    transform: rotateX(-90deg) translateZ(100px);
}
@-webkit-keyframes imgRotate {
    from{
        transform: translateZ(-100px) rotateX(0) rotateY(0);
    }
    to{
        transform: translateZ(-100px) rotateX(360deg) rotateY(360deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">380px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../images/bg2.jpg) no-repeat;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">1200px</span> <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.leftContent</span>{
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">45px</span>;
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-comment">/* &#x65CB;&#x8F6C;&#x7684;&#x56FE;&#x7247; */</span>
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.leftContent</span> <span class="hljs-selector-class">.leftContentItem</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-comment">/* &#x8BBE;&#x7F6E;&#x666F;&#x6DF1; */</span>
    <span class="hljs-attribute">perspective</span>: <span class="hljs-number">1000px</span>;
    <span class="hljs-comment">/* &#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x989C;&#x8272;&#x5728;&#x4E2D;&#x95F4;&#x4E3A;&#x692D;&#x5706;&#x5F62; */</span>
    <span class="hljs-comment">/*background: radial-gradient(ellipse at center, #430d6d 0%, #000 100%);*/</span>
}
<span class="hljs-selector-class">.leftContent</span> <span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">20%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">20%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-comment">/* &#x5B9E;&#x73B0;3D&#x5448;&#x73B0; */</span>
    <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-20deg) <span class="hljs-built_in">rotateY</span>(-20deg);
    <span class="hljs-attribute">-webkit-animation</span>: <span class="hljs-number">6s</span> imgRotate linear infinite;
    <span class="hljs-attribute">-o-animation</span>: <span class="hljs-number">6s</span> imgRotate linear infinite;
    <span class="hljs-attribute">animation</span>: <span class="hljs-number">6s</span> imgRotate linear infinite;
}
<span class="hljs-selector-class">.leftContent</span> <span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> *{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">25px</span> <span class="hljs-built_in">rgba</span>(0, 128, 0, .4);
}
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-comment">/* &#x5206;&#x522B;&#x5BF9;&#x5404;&#x4E2A;&#x9762;&#x8FDB;&#x884C;&#x65CB;&#x8F6C;&#x3001;&#x5E73;&#x79FB;&#x64CD;&#x4F5C; */</span>
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(100px);
}
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(180deg) <span class="hljs-built_in">translateZ</span>(100px);
}
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateZ</span>(100px);
}
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(100px);
}
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span><span class="hljs-selector-pseudo">:nth-child(5)</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(100px);
}
<span class="hljs-selector-class">.leftContentItem</span> <span class="hljs-selector-class">.itemImg</span> <span class="hljs-selector-class">.leftContentImg</span><span class="hljs-selector-pseudo">:nth-child(6)</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(100px);
}
@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> imgRotate {
    <span class="hljs-selector-tag">from</span>{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-100px) <span class="hljs-built_in">rotateX</span>(0) <span class="hljs-built_in">rotateY</span>(0);
    }
    <span class="hljs-selector-tag">to</span>{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-100px) <span class="hljs-built_in">rotateX</span>(360deg) <span class="hljs-built_in">rotateY</span>(360deg);
    }
}</code></pre><ul><li>&#x6548;&#x679C;&#x56FE;</li></ul><blockquote><span class="img-wrap"><img data-src="/img/bVbh27W?w=1294&amp;h=483" src="https://static.alili.tech/img/bVbh27W?w=1294&amp;h=483" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></blockquote><ul><li>&#x4E3B;&#x8981;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;&#x666F;&#x6DF1;perspective&#xFF0C;&#x7136;&#x540E;&#x5BF9;&#x6BCF;&#x4E2A;&#x9762;&#x65CB;&#x8F6C;&#x3001;&#x5E73;&#x79FB;</li></ul><blockquote>&#x6B63;&#x5728;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x82E5;&#x5BF9;&#x4F60;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x5370;&#x8BB0;&#x5457;&#xFF08;&#x70B9;&#x4E2A;&#x8D5E;&#x54AF;^_^&#xFF09;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x597D;&#x6587;&#x63A8;&#x8350;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000016068450">webpack&#x6253;&#x5305;&#xFF08;&#x6709;&#x9762;&#x8BD5;&#x9898;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016255824" target="_blank">&#x7EAF;css&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#xFF08;multi-column&#x591A;&#x5217;&#x53CA;flex&#x5E03;&#x5C40;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016082968">&#x753B;&#x4E09;&#x89D2;&#x5F62;</a></li><li><a href="https://segmentfault.com/a/1190000016542821" target="_blank">&#x5224;&#x65AD;ios&#x548C;Android&#x53CA;PC&#x7AEF;</a></li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css实现波浪线及立方体

## 原文链接
[https://segmentfault.com/a/1190000016655944](https://segmentfault.com/a/1190000016655944)


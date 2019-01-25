---
title: 'CSS效果篇--CSS3实现5种预载动画效果' 
date: 2019-01-26 2:30:18
hidden: true
slug: kfss2f33qsh
categories: [reprint]
---

{{< raw >}}

                    
<p>实现如图所示的动画效果：<br><span class="img-wrap"><img data-src="/img/bVJgTc?w=800&amp;h=300" src="https://static.alili.tech/img/bVJgTc?w=800&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">预载动画一：双旋圈</h2>
<p>在两个不同方向旋转的圆圈。我们对内圈的转速定义了一个CSS代码，即内圈比外圈的速率快2倍。<br>实现如图所示：<br><span class="img-wrap"><img data-src="/img/bVJgTL?w=800&amp;h=284" src="https://static.alili.tech/img/bVJgTL?w=800&amp;h=284" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style=&quot;background: #ffb83c;&quot;>
    <div id=&quot;preloader-1&quot;>
        <span></span>
        <span></span>
    </div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #ffb83c;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preloader-1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#preloader-1{
    position: relative;
}
#preloader-1 span{
    position: absolute;
    border:8px solid #fff;
    border-top:8px solid transparent;
    border-radius: 999px;
}
#preloader-1 span:nth-child(1){
    width:80px;
    height: 80px;
    animation: spin-1 2s infinite linear;
}
#preloader-1 span:nth-child(2){
    top:20px;
    left:20px;
    width:40px;
    height: 40px;
    animation: spin-2 1s infinite linear;
}
@keyframes spin-1{
    0%{transform: rotate(360deg); opacity: 1.0;}
    50%{transform: rotate(180deg); opacity: 0.5;}
    100%{transform: rotate(0deg);opacity: 0;}
}
@keyframes spin-2{
    0%{transform: rotate(0deg); opacity: 0.5;}
    50%{transform: rotate(180deg); opacity: 1;}
    100%{transform: rotate(360deg);opacity: 0.5;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#preloader-1</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-id">#preloader-1</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">8px</span> solid <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-top</span>:<span class="hljs-number">8px</span> solid transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">999px</span>;
}
<span class="hljs-selector-id">#preloader-1</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">animation</span>: spin-<span class="hljs-number">1</span> <span class="hljs-number">2s</span> infinite linear;
}
<span class="hljs-selector-id">#preloader-1</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
    <span class="hljs-attribute">top</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">40px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">animation</span>: spin-<span class="hljs-number">2</span> <span class="hljs-number">1s</span> infinite linear;
}
@<span class="hljs-keyword">keyframes</span> spin-<span class="hljs-number">1</span>{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1.0</span>;}
    50%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;}
}
@<span class="hljs-keyword">keyframes</span> spin-<span class="hljs-number">2</span>{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    50%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
}</code></pre>
<h2 id="articleHeader1">预载动画二：交错圈</h2>
<p>两个圆圈进行横向交错来回移动。每个圆圈都设置了单独的反向移动动画参数。<br>效果：<br><span class="img-wrap"><img data-src="/img/bVJgUb?w=800&amp;h=284" src="https://static.alili.tech/img/bVJgUb?w=800&amp;h=284" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style=&quot;background: #4ad3b4;&quot;>
    <div id=&quot;preloader-2&quot;>
        <span></span>
        <span></span>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #4ad3b4;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preloader-2"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#preloader-2{
    position: relative;
}
#preloader-2 span{
    position: absolute;
    width:30px;
    height: 30px;
    background: #fff;
    border-radius: 999px;
}
#preloader-2 span:nth-child(1){
    animation: cross-1 1.5s infinite linear;
}
#preloader-2 span:nth-child(2){
    animation: cross-2 1.5s infinite linear;
}
@keyframes cross-1{
    0%{transform: translateX(0); opacity: 0.5;}
    50%{transform: translateX(80px); opacity: 1;}
    100%{transform: translateX(0);opacity: 0.5;}
}
@keyframes cross-2{
    0%{transform: translateX(80px); opacity: 0.5;}
    50%{transform: translateX(0); opacity: 1;}
    100%{transform: translateX(80px);opacity: 0.5;}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#preloader-2</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-id">#preloader-2</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">999px</span>;
}
<span class="hljs-selector-id">#preloader-2</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
    <span class="hljs-attribute">animation</span>: cross-<span class="hljs-number">1</span> <span class="hljs-number">1.5s</span> infinite linear;
}
<span class="hljs-selector-id">#preloader-2</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
    <span class="hljs-attribute">animation</span>: cross-<span class="hljs-number">2</span> <span class="hljs-number">1.5s</span> infinite linear;
}
@<span class="hljs-keyword">keyframes</span> cross-<span class="hljs-number">1</span>{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    50%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(80px); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
}
@<span class="hljs-keyword">keyframes</span> cross-<span class="hljs-number">2</span>{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(80px); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    50%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0); <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(80px);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
}
</code></pre>
<h2 id="articleHeader2">预载动画三：旋转圈</h2>
<p>效果：<br><span class="img-wrap"><img data-src="/img/bVJgWo?w=800&amp;h=284" src="https://static.alili.tech/img/bVJgWo?w=800&amp;h=284" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style=&quot;background: #ab69d9;&quot;>
    <div id=&quot;preloader-3&quot;>
        <span></span>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #ab69d9;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preloader-3"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#preloader-3{
    position: relative;
    width:80px;
    height: 80px;
    border:4px solid rgba(255,255,255,.25);
    border-radius: 999px;
    
}
#preloader-3 span{
    position: absolute;
    width:80px;
    height:80px;
    border:4px solid transparent;
    border-top:4px solid #fff;
    border-radius: 999px;
    top:-4px;
    left:-4px;
    animation: rotate 1s infinite linear;
}
@keyframes rotate{
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#preloader-3</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">4px</span> solid <span class="hljs-built_in">rgba</span>(255,255,255,.25);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">999px</span>;
    
}
<span class="hljs-selector-id">#preloader-3</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">4px</span> solid transparent;
    <span class="hljs-attribute">border-top</span>:<span class="hljs-number">4px</span> solid <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">999px</span>;
    <span class="hljs-attribute">top</span>:-<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">left</span>:-<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">animation</span>: rotate <span class="hljs-number">1s</span> infinite linear;
}
@<span class="hljs-keyword">keyframes</span> rotate{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);}
}
</code></pre>
<h2 id="articleHeader3">预载动画四：跳动圈</h2>
<p>这是一种墨西哥波浪纹的动画效果，通过设置不同圆圈之间的延迟参数来实现。<br>效果：<br><span class="img-wrap"><img data-src="/img/bVJgYC?w=800&amp;h=284" src="https://static.alili.tech/img/bVJgYC?w=800&amp;h=284" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style=&quot;background: #c1d64a;&quot;>
    <div id=&quot;preloader-4&quot;>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #c1d64a;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preloader-4"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#preloader-4{
    position: relative;
}
#preloader-4 span{
    position:absolute;
    width:16px;
    height: 16px;
    border-radius: 999px;
    background: #fff;
    animation: bounce 1s infinite linear;
}
#preloader-4 span:nth-child(1){
    left:0;
    animation-delay: 0s;
}
#preloader-4 span:nth-child(2){
    left:20px;
    animation-delay: 0.25s;
}
#preloader-4 span:nth-child(3){
    left:40px;
    animation-delay: 0.5s;
}
#preloader-4 span:nth-child(4){
    left:60px;
    animation-delay: 0.75s;
}
#preloader-4 span:nth-child(5){
    left:80px;
    animation-delay: 1.0s;
}
@keyframes bounce{
    0%{transform: translateY(0px);opacity: 0.5;}
    50%{transform: translateY(-30px);opacity: 1.0;}
    100%{transform: translateY(0px);opacity: 0.5;}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#preloader-4</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-id">#preloader-4</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">16px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">999px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">animation</span>: bounce <span class="hljs-number">1s</span> infinite linear;
}
<span class="hljs-selector-id">#preloader-4</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0s</span>;
}
<span class="hljs-selector-id">#preloader-4</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
    <span class="hljs-attribute">left</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.25s</span>;
}
<span class="hljs-selector-id">#preloader-4</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
    <span class="hljs-attribute">left</span>:<span class="hljs-number">40px</span>;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.5s</span>;
}
<span class="hljs-selector-id">#preloader-4</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
    <span class="hljs-attribute">left</span>:<span class="hljs-number">60px</span>;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.75s</span>;
}
<span class="hljs-selector-id">#preloader-4</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span>{
    <span class="hljs-attribute">left</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">1.0s</span>;
}
@<span class="hljs-keyword">keyframes</span> bounce{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0px);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    50%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-30px);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">1.0</span>;}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0px);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
}
</code></pre>
<h2 id="articleHeader4">预载动画五：雷达圈</h2>
<p>一种雷达辐射效果，给3个<code>span elements</code>设置相同的淡入淡出效果，再予每个稍微延迟下即可实现。<br>效果：<br><span class="img-wrap"><img data-src="/img/bVJg04?w=800&amp;h=284" src="https://static.alili.tech/img/bVJg04?w=800&amp;h=284" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style=&quot;background: #f9553f;&quot;>
    <div id=&quot;preloader-5&quot;>
        <span></span>
        <span></span>
        <span></span>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #f9553f;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preloader-5"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#preloader-5{
    position: relative;
}
#preloader-5 span{
    position:absolute;
    width:50px;
    height: 50px;
    border:5px solid #fff;
    border-radius: 999px;
    opacity: 0;
    animation: radar 2s infinite linear;
}
#preloader-5 span:nth-child(1){
    animation-delay: 0s;
}
#preloader-5 span:nth-child(2){
    
    animation-delay: 0.66s;
}
#preloader-5 span:nth-child(3){
    animation-delay: 1.33s;
}

@keyframes radar{
    0%{transform: scale(0);opacity: 0;}
    25%{transform: scale(0);opacity: 0.5;}
    50%{transform: scale(1);opacity: 1.0;}
    75%{transform: scale(1.5);opacity: 0.5;}
    100%{transform: scale(2);opacity: 0;}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#preloader-5</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-id">#preloader-5</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">5px</span> solid <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">999px</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">animation</span>: radar <span class="hljs-number">2s</span> infinite linear;
}
<span class="hljs-selector-id">#preloader-5</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0s</span>;
}
<span class="hljs-selector-id">#preloader-5</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
    
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.66s</span>;
}
<span class="hljs-selector-id">#preloader-5</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">1.33s</span>;
}

@<span class="hljs-keyword">keyframes</span> radar{
    0%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;}
    25%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    50%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">1.0</span>;}
    75%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.5);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;}
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS效果篇--CSS3实现5种预载动画效果

## 原文链接
[https://segmentfault.com/a/1190000008367943](https://segmentfault.com/a/1190000008367943)


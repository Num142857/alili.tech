---
title: '纯 Css 绘制扇形' 
date: 2018-12-26 2:30:14
hidden: true
slug: hzm4tvnuguj
categories: [reprint]
---

{{< raw >}}

                    
<p>阅读此文需具备基本数学知识：圆心角、弧度制、三角函数。</p>
<p>为实现如下效果呕心沥血：</p>
<p><span class="img-wrap"><img data-src="http://oz54mleef.bkt.clouddn.com/example.jpg" src="https://static.alili.techhttp://oz54mleef.bkt.clouddn.com/example.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当然你可以拥抱 Svg...在此分享如何纯 Css 打造圆环进度条，只需三步！</p>
<p><span class="img-wrap"><img data-src="http://oz54mleef.bkt.clouddn.com/coverage.jpg" src="https://static.alili.techhttp://oz54mleef.bkt.clouddn.com/coverage.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>此物乃 2 + 1 夹心饼干，蓝绿色部分为果酱。显而易见饼干为两个削成了圆形的 <strong>div</strong> ，我们重点演示果酱是怎么制作的：</p>
<p><span class="img-wrap"><img data-src="http://oz54mleef.bkt.clouddn.com/elem-sector.jpg" src="https://static.alili.techhttp://oz54mleef.bkt.clouddn.com/elem-sector.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，大扇形由 <strong>6</strong> 个小扇形构成，每一小扇形占整个圆饼的 <strong>1/15</strong> ，大扇形占整个圆饼的 <strong>6/15</strong> 。我们只需构造一个扇形单元，将其复制 6 份后旋转相应角度连接至一起即可。</p>
<p>如何构造扇形？用三角形伪装...</p>
<p><span class="img-wrap"><img data-src="http://oz54mleef.bkt.clouddn.com/real-feature.jpg" src="https://static.alili.techhttp://oz54mleef.bkt.clouddn.com/real-feature.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>三角形的宽高如何计算？假定圆半径 $radius 为 100px，等分数 $count 为 15。则小扇形的圆心角为 <strong>360deg / 15</strong> ，三角形的高为 100px，宽为 <strong>2 × 100px × tan(360deg / 15 / 2)</strong> 。其中 <strong>360deg / 15 / 2</strong> 转化弧度制为 <strong>PI / 15</strong> （PI == 360deg / 2）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="span {
    width: 0;
    height: 0;
    border: $radius solid transparent;
    $borderWidth: tan(pi() / $count) * $radius;
    border-left-width: $borderWidth;
    border-right-width: $borderWidth;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: $radius solid transparent;
    $<span class="hljs-attribute">borderWidth</span>: <span class="hljs-built_in">tan</span>(pi() / $count) * $radius;
    <span class="hljs-attribute">border-left-width</span>: $borderWidth;
    <span class="hljs-attribute">border-right-width</span>: $borderWidth;
}</code></pre>
<p>数学欠佳的同学请自行科普...</p>
<p>对于 <strong>$count</strong> 为 <strong>1</strong> 或 <strong>2</strong> 的情况需特殊处理，因为 <strong>tan(PI)</strong> 及 <strong>tan(PI / 2)</strong> 为无穷值，不了解的同学请研究正切函数图像：</p>
<p><span class="img-wrap"><img data-src="http://oz54mleef.bkt.clouddn.com/tan.jpg" src="https://static.alili.techhttp://oz54mleef.bkt.clouddn.com/tan.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>相关代码（其中 <strong>$diameter = 2 × $radius</strong> 为圆直径）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="span {
    @if $count == 1 {
        width: $diameter;
        height: $diameter;
    } @else if $count == 2 {
        width: $diameter;
        height: $radius;
    } @else {
        width: 0;
        height: 0;
        border: $radius solid transparent;
        $borderWidth: tan(pi() / $count) * $radius;
        border-left-width: $borderWidth;
        border-right-width: $borderWidth;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">span</span> {
    @if $count == 1 {
        <span class="hljs-attribute">width</span>: $diameter;
        <span class="hljs-attribute">height</span>: $diameter;
    } @<span class="hljs-keyword">else</span> if $count == <span class="hljs-number">2</span> {
        <span class="hljs-selector-tag">width</span>: $<span class="hljs-selector-tag">diameter</span>;
        <span class="hljs-selector-tag">height</span>: $<span class="hljs-selector-tag">radius</span>;
    } @<span class="hljs-keyword">else</span> {
        <span class="hljs-selector-tag">width</span>: 0;
        <span class="hljs-selector-tag">height</span>: 0;
        <span class="hljs-selector-tag">border</span>: $<span class="hljs-selector-tag">radius</span> <span class="hljs-selector-tag">solid</span> <span class="hljs-selector-tag">transparent</span>;
        $<span class="hljs-selector-tag">borderWidth</span>: <span class="hljs-selector-tag">tan</span>(<span class="hljs-selector-tag">pi</span>() / $<span class="hljs-selector-tag">count</span>) * $<span class="hljs-selector-tag">radius</span>;
        <span class="hljs-selector-tag">border-left-width</span>: $<span class="hljs-selector-tag">borderWidth</span>;
        <span class="hljs-selector-tag">border-right-width</span>: $<span class="hljs-selector-tag">borderWidth</span>;
    }
}</code></pre>
<p>最后，复制并逐一旋转扇形单元：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@for $index from 0 to $count {
    span:nth-child(#{$index + 1}) {
        $transform: translate(-50%, 0) rotate(360deg / $count / 2 + 360deg * $index / $count);
        $origin: if($count == 2, bottom, center);
        -webkit-transform: $transform;
                transform: $transform;
        -webkit-transform-origin: $origin;
                transform-origin: $origin;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">for</span> $index from <span class="hljs-number">0</span> to $count {
    <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(</span>#{$index + 1}) {
        $<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 0) <span class="hljs-built_in">rotate</span>(360deg / $count / 2 + 360deg * $index / $count);
        $<span class="hljs-attribute">origin</span>: <span class="hljs-built_in">if</span>($count == 2, bottom, center);
        <span class="hljs-attribute">-webkit-transform</span>: $transform;
                <span class="hljs-attribute">transform</span>: $transform;
        <span class="hljs-attribute">-webkit-transform-origin</span>: $origin;
                <span class="hljs-attribute">transform-origin</span>: $origin;
    }
}</code></pre>
<p>果酱制作完毕，其它点缀请自行添加喽...本例完整代码<a href="https://github.com/sunmengyuan/metis/tree/master/css/sector" rel="nofollow noreferrer" target="_blank">在此</a>。</p>
<hr>
<h6>2017/11/14 续更</h6>
<p>由于本例引入了三角函数等数学运算，使用 <strong>Sass</strong> 预编译。未安装 <strong>Sass</strong> 的同学可下载经编译的 <a href="http://oz54mleef.bkt.clouddn.com/sector.zip" rel="nofollow noreferrer" target="_blank">源码</a> 开启 <strong>sector.html</strong> 查看效果。</p>
<p>安装 <strong>Sass</strong> 请参考 <a href="https://segmentfault.com/a/1190000009466690">https://segmentfault.com/a/11...</a> 文章末尾的安装教程。</p>
<p>本例调试方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd sector
sass --watch style.scss:style.css --debug-info" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> sector
sass --watch style.scss:style.css --debug-info</code></pre>
<hr>
<p>作者：呆恋小喵</p>
<p>我的后花园：<a href="https://sunmengyuan.github.io/garden/" rel="nofollow noreferrer" target="_blank">https://sunmengyuan.github.io...</a></p>
<p>我的 github：<a href="https://github.com/sunmengyuan" rel="nofollow noreferrer" target="_blank">https://github.com/sunmengyuan</a></p>
<p>原文链接：<a href="https://sunmengyuan.github.io/garden/2017/11/09/css-sector.html" rel="nofollow noreferrer" target="_blank">https://sunmengyuan.github.io...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯 Css 绘制扇形

## 原文链接
[https://segmentfault.com/a/1190000011981896](https://segmentfault.com/a/1190000011981896)


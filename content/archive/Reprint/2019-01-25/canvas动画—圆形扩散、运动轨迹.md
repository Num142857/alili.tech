---
title: 'canvas动画—圆形扩散、运动轨迹' 
date: 2019-01-25 2:30:23
hidden: true
slug: jjn3on1xi2m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>在ECharts中看到过这种圆形扩散效果，类似css3，刚好项目中想把它用上，but我又不想引入整个echart.js文件，更重要的是想弄明白它的原理，所以自己动手。在这篇文章中我们就来分析实现这种效果的两种方法，先上效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000008560574?w=300&amp;h=200" src="https://static.alili.tech/img/remote/1460000008560574?w=300&amp;h=200" alt="圆形扩散" title="圆形扩散" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">实现原理</h2>
<p>通过不断的改变圆的半径大小，不断重叠达到运动的效果，在运动的过程中，设置当前canvas的透明度<code>context.globalAlpha=0.95</code>，使得canvas上的圆逐渐透明直至为0，从而实现这种扩散、渐变的效果。</p>
<h2 id="articleHeader2">实现方法一</h2>
<p><em>1. 关键技术点</em><br><code>context.globalAlpha = 0.95</code>; //设置主canvas的绘制透明度。<br>创建临时canvas来缓存主canas的历史图像，再叠加到主canvas上。</p>
<p><em>2. 绘制过程</em><br>首先，我们先来写一个绘制圆的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//画圆
var drawCircle = function() {
    context.beginPath();
    context.arc(150, 100, radius, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 2; //线条宽度
    context.strokeStyle = 'rgba(250,250,50,1)'; //颜色
    context.stroke();
    radius += 0.5; //每一帧半径增加0.5

    //半径radius大于30时，重置为0
    if (radius > 30) {
        radius = 0;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//画圆</span>
<span class="hljs-keyword">var</span> drawCircle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    context.beginPath();
    context.arc(<span class="hljs-number">150</span>, <span class="hljs-number">100</span>, radius, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
    context.closePath();
    context.lineWidth = <span class="hljs-number">2</span>; <span class="hljs-comment">//线条宽度</span>
    context.strokeStyle = <span class="hljs-string">'rgba(250,250,50,1)'</span>; <span class="hljs-comment">//颜色</span>
    context.stroke();
    radius += <span class="hljs-number">0.5</span>; <span class="hljs-comment">//每一帧半径增加0.5</span>

    <span class="hljs-comment">//半径radius大于30时，重置为0</span>
    <span class="hljs-keyword">if</span> (radius &gt; <span class="hljs-number">30</span>) {
        radius = <span class="hljs-number">0</span>;
    }
};</code></pre>
<p>然后，我们创建一个临时canvas用来缓存主canvas上的历史图像，设置主canvas的透明度<code>context.globalAlpha=0.95</code>(关键一步)，在每次调用<code>drawCircle</code>方法绘制一个新圆之前都把主canvas上的图像，也就是之前的图像给绘制到临时的canvas中，等到<code>drawCircle</code>方法绘制完新圆后，再把临时canvas的图像绘制回主canvas中。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008560575?w=620&amp;h=280" src="https://static.alili.tech/img/remote/1460000008560575?w=620&amp;h=280" alt="绘制流程" title="绘制流程" style="cursor: pointer;"></span></p>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建一个临时canvas来缓存主canvas的历史图像
var backCanvas = document.createElement('canvas'),
    backCtx = backCanvas.getContext('2d');
    backCanvas.width = width;
    backCanvas.height = height;

    //设置主canvas的绘制透明度
    context.globalAlpha = 0.95;

    //显示即将绘制的图像，忽略临时canvas中已存在的图像
    backCtx.globalCompositeOperation = 'copy';

var render = function() {
    //1.先将主canvas的图像缓存到临时canvas中
    backCtx.drawImage(canvas, 0, 0, width, height);

    //2.清除主canvas上的图像
    context.clearRect(0, 0, width, height);

    //3.在主canvas上画新圆
    drawCircle();

    //4.等新圆画完后，再把临时canvas的图像绘制回主canvas中
    context.drawImage(backCanvas, 0, 0, width, height);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//创建一个临时canvas来缓存主canvas的历史图像</span>
<span class="hljs-keyword">var</span> backCanvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>),
    backCtx = backCanvas.getContext(<span class="hljs-string">'2d'</span>);
    backCanvas.width = width;
    backCanvas.height = height;

    <span class="hljs-comment">//设置主canvas的绘制透明度</span>
    context.globalAlpha = <span class="hljs-number">0.95</span>;

    <span class="hljs-comment">//显示即将绘制的图像，忽略临时canvas中已存在的图像</span>
    backCtx.globalCompositeOperation = <span class="hljs-string">'copy'</span>;

<span class="hljs-keyword">var</span> render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//1.先将主canvas的图像缓存到临时canvas中</span>
    backCtx.drawImage(canvas, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);

    <span class="hljs-comment">//2.清除主canvas上的图像</span>
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);

    <span class="hljs-comment">//3.在主canvas上画新圆</span>
    drawCircle();

    <span class="hljs-comment">//4.等新圆画完后，再把临时canvas的图像绘制回主canvas中</span>
    context.drawImage(backCanvas, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);
};</code></pre>
<h2 id="articleHeader3">实现方法二</h2>
<p>与上一种方法相比，这种方法更加简单，同样是用到了透明度逐渐减小直到为0的原理，不同的是这里并没有创建临时canvas，而是运用了<code>context.globalCompositeOperation</code>属性值<code>source-over</code>和<code>destination-in</code>来配合使用，<a href="http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp" rel="nofollow noreferrer" target="_blank">查看globalCompositeOperation属性介绍</a></p>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var render = function() {
    //默认值为source-over
    var prev = context.globalCompositeOperation;

    //只显示canvas上原图像的重叠部分
    context.globalCompositeOperation = 'destination-in';

    //设置主canvas的绘制透明度
    context.globalAlpha = 0.95;

    //这一步目的是将canvas上的图像变的透明
    context.fillRect(0, 0, width, height);

    //在原图像上重叠新图像
    context.globalCompositeOperation = prev;

    //在主canvas上画新圆
    drawCircle();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//默认值为source-over</span>
    <span class="hljs-keyword">var</span> prev = context.globalCompositeOperation;

    <span class="hljs-comment">//只显示canvas上原图像的重叠部分</span>
    context.globalCompositeOperation = <span class="hljs-string">'destination-in'</span>;

    <span class="hljs-comment">//设置主canvas的绘制透明度</span>
    context.globalAlpha = <span class="hljs-number">0.95</span>;

    <span class="hljs-comment">//这一步目的是将canvas上的图像变的透明</span>
    context.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);

    <span class="hljs-comment">//在原图像上重叠新图像</span>
    context.globalCompositeOperation = prev;

    <span class="hljs-comment">//在主canvas上画新圆</span>
    drawCircle();
};</code></pre>
<h2 id="articleHeader4">地图上的应用</h2>
<p>这里我采用的是第二种方式，将扩散、渐变效果运用到了百度地图上，感觉还比较炫，<a href="https://github.com/chengquan223/map-canvas" rel="nofollow noreferrer" target="_blank">查看更多demo</a></p>
<p><a href="https://chengquan223.github.io/map-canvas/examples/baidu-map-flashmarker.html" rel="nofollow noreferrer" target="_blank">圆形扩散动画</a><br><span class="img-wrap"><img data-src="/img/remote/1460000008560576?w=620&amp;h=280" src="https://static.alili.tech/img/remote/1460000008560576?w=620&amp;h=280" alt="百度地图圆形扩散" title="百度地图圆形扩散" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://chengquan223.github.io/map-canvas/examples/baidu-map-move.html" rel="nofollow noreferrer" target="_blank">运动轨迹动画</a><br><span class="img-wrap"><img data-src="/img/remote/1460000008560577?w=620&amp;h=423" src="https://static.alili.tech/img/remote/1460000008560577?w=620&amp;h=423" alt="百度地图运动轨迹动画" title="百度地图运动轨迹动画" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>方法一、二都能实现同样的效果，如果动画绘制、操作canvas比较频繁，建议采用第一种方式，用临时canvas来缓存历史图像，效率更高。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas动画—圆形扩散、运动轨迹

## 原文链接
[https://segmentfault.com/a/1190000008560571](https://segmentfault.com/a/1190000008560571)


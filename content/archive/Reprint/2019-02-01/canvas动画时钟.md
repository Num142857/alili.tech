---
title: 'canvas动画时钟' 
date: 2019-02-01 2:30:10
hidden: true
slug: lg8fvsttdn
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学canvas，然后根据MDN上的例子做了个动画时钟<del>（为什么要造个轮子，因为丑。。）</del><img src="https://static.alili.techundefined" class="emoji" alt="trollface" title="trollface"></p>
<p>这是MDN上的例子，怎么说呢，比较复古吧。</p>
<p><span class="img-wrap"><img data-src="https://mdn.mozillademos.org/files/203/Canvas_animation2.png" src="https://static.alili.techhttps://mdn.mozillademos.org/files/203/Canvas_animation2.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>首先，找一张时钟的图片，就是下面这张了。</p>
<p><span class="img-wrap"><img data-src="http://7xtdan.com2.z0.glb.clouddn.com/image/blog/Clock-Full.png?imageView2/2/w/400" src="https://static.alili.techhttp://7xtdan.com2.z0.glb.clouddn.com/image/blog/Clock-Full.png?imageView2/2/w/400" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>——来自bigger than bigger的<a href="https://dribbble.com/" rel="nofollow noreferrer" target="_blank">dribbble</a>网站，<a href="https://dribbble.com/shots/1036844-Clock" rel="nofollow noreferrer" target="_blank">图片来源</a>（侵删）</p>
<p>然后就开始用canvas实现这个逼格满满的时钟吧。在<code>html</code>代码中插入<code>canvas</code>标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot; width=&quot;400&quot; height=&quot;400&quot;></canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"canvas"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"400"</span> height=<span class="hljs-string">"400"</span>&gt;&lt;/canvas&gt;
</code></pre>
<p>在<code>js</code>文件中创建画布（假设我们使用的都是现代浏览器）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function clock() {
  var ctx = document.getElementById('canvas').getContext('2d');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clock</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> ctx = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>).getContext(<span class="hljs-string">'2d'</span>);
}
</code></pre>
<p>先来绘制时钟表盘，我们看到这张图是带有光线阴影效果的，画成一样难度太高。于是就用颜色的渐变来让时钟看起来稍微立体一点。在<code>canvas</code>中用<code>createLinearGradient</code>来创建一个新的渐变，并用addColorStop上色，最后把颜色赋给<code>strokeStyle</code>。详见<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Gradients" rel="nofollow noreferrer" target="_blank">运用样式与颜色 by MDN</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//绘制表盘底色
ctx.translate(200, 200); //将坐标原点移到画布中心
ctx.rotate(-Math.PI/2); //将坐标轴逆时针旋转90度，x轴正方向对准12点方向
var lingrad = ctx.createLinearGradient(150, 0, -150, 0);
lingrad.addColorStop(0, '#242f37');
lingrad.addColorStop(1, '#48585c');
ctx.fillStyle = lingrad;
ctx.beginPath();
ctx.arc(0, 0, 150, 0, Math.PI * 2, true);
ctx.fill();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//绘制表盘底色</span>
ctx.translate(<span class="hljs-number">200</span>, <span class="hljs-number">200</span>); <span class="hljs-comment">//将坐标原点移到画布中心</span>
ctx.rotate(-Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">2</span>); <span class="hljs-comment">//将坐标轴逆时针旋转90度，x轴正方向对准12点方向</span>
var lingrad = ctx.createLinearGradient(<span class="hljs-number">150</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-150</span>, <span class="hljs-number">0</span>);
lingrad.addColorStop(<span class="hljs-number">0</span>, '#<span class="hljs-number">242</span>f37');
lingrad.addColorStop(<span class="hljs-number">1</span>, '#<span class="hljs-number">48585</span>c');
ctx.fillStyle = lingrad;
ctx.beginPath();
ctx.arc(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">150</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-literal">PI</span> * <span class="hljs-number">2</span>, true);
ctx.fill();
</code></pre>
<p>比较关键的一点是画布的坐标轴x轴正方向是时钟3点钟方向，为了方便起见，我们把它逆时针旋转90度让它指向十二点钟方向。</p>
<p>绘制刻度要用到旋转<code>rotate</code>（<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Transformations" rel="nofollow noreferrer" target="_blank">变形 Transformations by MDN</a>），小时刻度有12个，相邻两个刻度与圆心连线的角度就是Math.PI/6，这里用的是弧度表示，也就是30度。那么我们就用for循环来画出小时的刻度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 12; i++) {
  ctx.beginPath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.rotate(Math.PI / 6);
  ctx.moveTo(140, 0);
  ctx.lineTo(120, 0);
  ctx.stroke();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>for (var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">12</span>; i++) {
  ctx.beginPath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = <span class="hljs-number">3</span>;
  ctx.rotate(Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">6</span>);
  ctx.moveTo(<span class="hljs-number">140</span>, <span class="hljs-number">0</span>);
  ctx.lineTo(<span class="hljs-number">120</span>, <span class="hljs-number">0</span>);
  ctx.stroke();
}
</code></pre>
<p>同理，分钟的刻度也一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath();
for (i = 0; i < 60; i++) {
  if (i % 5 !== 0) { //去掉与小时刻度重叠的部分
    ctx.beginPath();
    ctx.strokeStyle = '#536b7a';
    ctx.lineWidth = 2;
    ctx.moveTo(140, 0);
    ctx.lineTo(130, 0);
    ctx.stroke();
  }
  ctx.rotate(Math.PI / 30);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.beginPath();
for (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">60</span>; i++) {
  if (i % <span class="hljs-number">5</span> !== <span class="hljs-number">0</span>) { <span class="hljs-comment">//去掉与小时刻度重叠的部分</span>
    ctx.beginPath();
    ctx.strokeStyle = '#<span class="hljs-number">536</span>b7a';
    ctx.lineWidth = <span class="hljs-number">2</span>;
    ctx.moveTo(<span class="hljs-number">140</span>, <span class="hljs-number">0</span>);
    ctx.lineTo(<span class="hljs-number">130</span>, <span class="hljs-number">0</span>);
    ctx.stroke();
  }
  ctx.rotate(Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">30</span>);
}
</code></pre>
<p>表盘大致画好了，刻度也画好了，接下来就是绘制指针并让它指向正确的时间，是不是？不就就是画一条直线么。关键是指针rotate的角度是多少呢？其实也是比较简单的。先获取当前的时间，把小时转换为12小时制的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var now = new Date(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hr = now.getHours();
hr = hr > 12 ? hr - 12 : hr;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> now = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>(),
    <span class="hljs-title">sec</span> = <span class="hljs-title">now</span>.<span class="hljs-title">getSeconds</span>(),
    <span class="hljs-title">min</span> = <span class="hljs-title">now</span>.<span class="hljs-title">getMinutes</span>(),
    <span class="hljs-title">hr</span> = <span class="hljs-title">now</span>.<span class="hljs-title">getHours</span>();
<span class="hljs-title">hr</span> = <span class="hljs-title">hr</span> &gt; 12 ? <span class="hljs-title">hr</span> - 12 : hr;
</span></code></pre>
<p>那么，时针的位置就是（相对于x轴正方向转过的角度）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.rotate(hr * (Math.PI / 6) + min * (Math.PI / 360) + sec * (Math.PI / 21600));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.rotate(hr * (Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">6</span>) + min * (Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">360</span>) + sec * (Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">21600</span>));
</code></pre>
<p>同理，分针和秒针的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.rotate(min * (Math.PI / 30) + sec * (Math.PI/1800)); //分针
ctx.rotate(sec * (Math.PI /30)); //秒针
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>ctx.rotate(<span class="hljs-built_in">min</span> * (Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">30</span>) + <span class="hljs-built_in">sec</span> * (Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">1800</span>));<span class="hljs-comment"> //分针</span>
ctx.rotate(<span class="hljs-built_in">sec</span> * (Math.<span class="hljs-literal">PI</span> /<span class="hljs-number">30</span>));<span class="hljs-comment"> //秒针</span>
</code></pre>
<p>最后，最关键的让指针转动起来，这里要用到的是<code>requestAnimationFrame</code>方法，用来重绘页面，得到连贯逐帧的动画，实现最佳的动画效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.requestAnimationFrame(callback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>window.requestAnimationFrame(callback)<span class="hljs-comment">;</span>
</code></pre>
<p>这个callback就是我们的绘制时钟的clock()函数。需要注意的是每次执行完<code>requestAnimationFrame</code>后需要清除画布，不然出现重叠交错的现象，我们把它放在clock函数开始的地方。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.clearRect(0, 0, canvas.width, canvas.height);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.width</span>, <span class="hljs-selector-tag">canvas</span>.<span class="hljs-attribute">height</span>);
</code></pre>
<p>到这里，动画时钟就OK了<img src="https://static.alili.techundefined" class="emoji" alt="sunglasses" title="sunglasses"> 效果图如下：</p>
<p><span class="img-wrap"><img data-src="http://7xtdan.com2.z0.glb.clouddn.com/image/blog/clock.png" src="https://static.alili.techhttp://7xtdan.com2.z0.glb.clouddn.com/image/blog/clock.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/lifeng1893/pen/ALPamR" rel="nofollow noreferrer" target="_blank">Codepen演示地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="lifeng1893/pen/ALPamR" data-typeid="3">点击预览</button></p>
<p><a href="https://github.com/lifeng1893/Fantastic-Animation/tree/master/Canvas/clock" rel="nofollow noreferrer" target="_blank">Github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas动画时钟

## 原文链接
[https://segmentfault.com/a/1190000007405217](https://segmentfault.com/a/1190000007405217)


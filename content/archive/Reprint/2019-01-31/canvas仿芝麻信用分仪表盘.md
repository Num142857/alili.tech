---
title: 'canvas仿芝麻信用分仪表盘' 
date: 2019-01-31 2:31:16
hidden: true
slug: 806f866tl0o
categories: [reprint]
---

{{< raw >}}

                    
<p>hi，这是一个仿支付宝芝麻信用分的一个canvas，其实就是一个动画仪表盘。</p>
<p>首先， 上原图：</p>
<p><span class="img-wrap"><img data-src="http://7xtdan.com2.z0.glb.clouddn.com/image/blog/IMG_0071.PNG?imageView2/2/w/360" src="https://static.alili.techhttp://7xtdan.com2.z0.glb.clouddn.com/image/blog/IMG_0071.PNG?imageView2/2/w/360" alt="原图" title="原图" style="cursor: pointer; display: inline;"></span></p>
<p>这个是在下支付宝上的截图，分低各位见笑了。然后看下我用canvas实现的效果图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot; width=&quot;400&quot; height=&quot;700&quot; data-score='724'></canvas>
<!-- 设置data-score，分数区间[400, 900] -->
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"400"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"700"</span> <span class="hljs-attr">data-score</span>=<span class="hljs-string">'724'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 设置data-score，分数区间[400, 900] --&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="http://7xtdan.com2.z0.glb.clouddn.com/image/blog/zhima%20credit.gif" src="https://static.alili.techhttp://7xtdan.com2.z0.glb.clouddn.com/image/blog/zhima%20credit.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>唉，总感觉不像。这个是GIF图，可能在网页上打开的效果会好一点(<del>当然可能就是这样</del>)。大家可以点击底部预览codepen上的演示。有两个不完美的地方，一个是实际上芝麻信用表盘上的的刻度是不均匀的，我这为了简单的实现就采取相同的刻度；二是表盘上运动的点是有模糊的效果，还没解决。唉，下次再说吧。</p>
<p>接下来还是来说说怎么实现的吧。第一步，国际惯例，创建画布：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    cWidth = canvas.width,
    cHeight = canvas.height;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">canvas</span> = document.getElementById(<span class="hljs-string">'canvas'</span>),
    ctx = <span class="hljs-selector-tag">canvas</span>.getContext(<span class="hljs-string">'2d'</span>),
    cWidth = <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.width</span>,
    cHeight = <span class="hljs-selector-tag">canvas</span>.<span class="hljs-attribute">height</span>;
</code></pre>
<p>然后绘制表盘，虽说不是处女座，但也要尽可能做到跟原图上的一样，那就是这个环形开口的角度是多少呢？请上ps来测一下：</p>
<p><span class="img-wrap"><img data-src="http://7xtdan.com2.z0.glb.clouddn.com/image/blogScreenshot_2.png?imageView2/2/w/600" src="https://static.alili.techhttp://7xtdan.com2.z0.glb.clouddn.com/image/blogScreenshot_2.png?imageView2/2/w/600" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>嗯，136°，这个角度确实刁钻，为了方便接下来的计算，那就约等于140°。那么一个分数段的弧度就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deg1 = Math.PI * 11 / 45
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var deg1 = Math.<span class="hljs-literal">PI</span> * <span class="hljs-number">11</span> / <span class="hljs-number">45</span>
</code></pre>
<p>先把中间半透明的刻度层画好：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.save(); //中间刻度层
ctx.beginPath();
ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
ctx.lineWidth = 10;
ctx.arc(0, 0, 135, 0, 11 * deg0, false);
ctx.stroke();
ctx.restore();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.save(); <span class="hljs-comment">//中间刻度层</span>
ctx.beginPath();
ctx.strokeStyle = 'rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">.2</span>)';
ctx.lineWidth = <span class="hljs-number">10</span>;
ctx.arc(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">135</span>, <span class="hljs-number">0</span>, <span class="hljs-number">11</span> * deg0, false);
ctx.stroke();
ctx.restore();
</code></pre>
<p>接着，画6条刻度线，用for循环来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.save(); // 刻度线
for (var i = 0; i < 6; i++) {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
  ctx.moveTo(140, 0);
  ctx.lineTo(130, 0);
  ctx.stroke();
  ctx.rotate(deg1);
}
ctx.restore();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.save(); <span class="hljs-comment">// 刻度线</span>
for (var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">6</span>; i++) {
  ctx.beginPath();
  ctx.lineWidth = <span class="hljs-number">2</span>;
  ctx.strokeStyle = 'rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">.3</span>)';
  ctx.moveTo(<span class="hljs-number">140</span>, <span class="hljs-number">0</span>);
  ctx.lineTo(<span class="hljs-number">130</span>, <span class="hljs-number">0</span>);
  ctx.stroke();
  ctx.rotate(deg1);
}
ctx.restore();
</code></pre>
<p>同理，再把大刻度细分为5个小刻度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.save(); // 细分刻度线
for (i = 0; i < 25; i++) {
  if (i % 5 !== 0){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx.moveTo(140, 0);
    ctx.lineTo(133, 0);
    ctx.stroke();
  }
  ctx.rotate(deg1 / 5);
}
ctx.restore();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.save(); <span class="hljs-comment">// 细分刻度线</span>
for (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">25</span>; i++) {
  if (i % <span class="hljs-number">5</span> !== <span class="hljs-number">0</span>){
    ctx.beginPath();
    ctx.lineWidth = <span class="hljs-number">2</span>;
    ctx.strokeStyle = 'rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">.1</span>)';
    ctx.moveTo(<span class="hljs-number">140</span>, <span class="hljs-number">0</span>);
    ctx.lineTo(<span class="hljs-number">133</span>, <span class="hljs-number">0</span>);
    ctx.stroke();
  }
  ctx.rotate(deg1 / <span class="hljs-number">5</span>);
}
ctx.restore();
</code></pre>
<p>刻度到这里就ok了，还需要给刻度标上文字和每个分数段的信用级别，具体的参见代码，因为跟刻度实现的原理差不多，就不啰嗦了。现在最关键就是实现表盘上那个运动的点（不知道怎么称呼，下文就叫它动点），我们可以这样想，它是个半径很小的圆，只不过是画在最外层环形轨道上圆，而圆在<code>canvas</code>上的实现方法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.arc(x, y, radius, sAngle, eAngle, false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>ctx.arc(<span class="hljs-keyword">x</span>, y, radius, sAngle, eAngle, <span class="hljs-keyword">false</span>)<span class="hljs-comment">;
</span></code></pre>
<p>我们只要控制x, y就能让它动起来，实现我们想要的效果。so，创建一个动点对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dot() {
  this.x = 0;
  this.y = 0;
  this.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, .7)';
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  };
}
var dot = new Dot(),
    dotSpeed = 0.03, //控制动点的速度
    angle = 0, //这个很关键，用来得到动点的坐标x, y
    credit = 400; //信用最低分数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dot</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.x = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.y = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.draw = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx</span>) </span>{
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = <span class="hljs-string">'rgba(255, 255, 255, .7)'</span>;
    ctx.arc(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>, <span class="hljs-literal">false</span>);
    ctx.fill();
    ctx.restore();
  };
}
<span class="hljs-keyword">var</span> dot = <span class="hljs-keyword">new</span> Dot(),
    dotSpeed = <span class="hljs-number">0.03</span>, <span class="hljs-comment">//控制动点的速度</span>
    angle = <span class="hljs-number">0</span>, <span class="hljs-comment">//这个很关键，用来得到动点的坐标x, y</span>
    credit = <span class="hljs-number">400</span>; <span class="hljs-comment">//信用最低分数</span>
</code></pre>
<p>如何得到dot的坐标x, y呢？那就要用到传说中三角函数了。</p>
<p><span class="img-wrap"><img data-src="http://7xtdan.com2.z0.glb.clouddn.com/image/blog/Axes.png?imageView2/2/w/400" src="https://static.alili.techhttp://7xtdan.com2.z0.glb.clouddn.com/image/blog/Axes.png?imageView2/2/w/400" alt="" title="" style="cursor: pointer;"></span></p>
<p>通过上图我们可以得到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x = r * cos(angle), y = r * sin(angle)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>x = r * <span class="hljs-built_in">cos</span>(<span class="hljs-built_in">angle</span>), y = r * <span class="hljs-built_in">sin</span>(<span class="hljs-built_in">angle</span>)
</code></pre>
<p>在JavaScript中，dot的中心坐标就变成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dot.x = radius * Math.cos(angle); //radius为最外层轨道的半径值
dot.y = radius * Math.sin(angle);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">dot</span>.x = radius * Math.<span class="hljs-keyword">cos</span>(<span class="hljs-keyword">angle</span>); <span class="hljs-comment">//radius为最外层轨道的半径值</span>
<span class="hljs-keyword">dot</span>.y = radius * Math.<span class="hljs-keyword">sin</span>(<span class="hljs-keyword">angle</span>);
</code></pre>
<p>接下来我们只要得到这个angle。这个通过弧度与分数的比例关系就可以得到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aim = (score - 400) * deg1 / 100;
if (angle < aim) {
  angle += dotSpeed;
}
dot.draw(ctx);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>var aim = (score - <span class="hljs-number">400</span>) * deg1 / <span class="hljs-number">100</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">angle</span> &lt; aim) {
  <span class="hljs-keyword">angle</span> += dotSpeed;
}
<span class="hljs-keyword">dot</span>.draw(ctx);
</code></pre>
<p>然后让中间的信用分数也能随动点的转动而变化，创建一个<code>text()</code>，为了使数字变化能和动点保持一致，要根据动点的速率来计算数字变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function text(process) {
  ctx.save();
  ctx.rotate(10 * deg0);
  ctx.fillStyle = '#000';
  ctx.font = '80px Microsoft yahei';
  ctx.textAlign = 'center';
  ctx.textBaseLine = 'top';
  ctx.fillText(process, 0 ,10);
  ctx.restore();
}
var textSpeed = Math.round(dotSpeed * 100 / deg1),
if (credit < score - textSpeed) {
  credit += textSpeed;
} else if (credit >= score - textSpeed &amp;&amp; credit < score) {
  credit += 1; // 这里确保信用分数最后停下来是我们输入的分数
}
text(credit);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function <span class="hljs-built_in">text</span>(process) {
  ctx.<span class="hljs-built_in">save</span>();
  ctx.<span class="hljs-built_in">rotate</span>(<span class="hljs-number">10</span> * deg0);
  ctx.fillStyle = <span class="hljs-string">'#000'</span>;
  ctx.font = <span class="hljs-string">'80px Microsoft yahei'</span>;
  ctx.<span class="hljs-built_in">textAlign</span> = <span class="hljs-string">'center'</span>;
  ctx.textBaseLine = <span class="hljs-string">'top'</span>;
  ctx.fillText(process, <span class="hljs-number">0</span> ,<span class="hljs-number">10</span>);
  ctx.restore();
}
var textSpeed = Math.<span class="hljs-built_in">round</span>(dotSpeed * <span class="hljs-number">100</span> / deg1),
<span class="hljs-keyword">if</span> (credit &lt; score - textSpeed) {
  credit += textSpeed;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (credit &gt;= score - textSpeed &amp;&amp; credit &lt; score) {
  credit += <span class="hljs-number">1</span>; <span class="hljs-comment">// 这里确保信用分数最后停下来是我们输入的分数</span>
}
<span class="hljs-built_in">text</span>(credit);
</code></pre>
<p>最后这一切都逃不过让window.requestAnimationFrame()来控制绘制动画和用ctx.clearRect(0, 0, cWidth, cHeight)来清除画布。</p>
<p>写的不好，大家将就着看，我相信大家理解代码的能力一定强于理解我这些我自己都不知道说什么的文字。</p>
<p>好了，以上。</p>
<p><a href="http://codepen.io/lifeng1893/pen/BQKeEY" rel="nofollow noreferrer" target="_blank">Codepen演示地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="lifeng1893/pen/BQKeEY" data-typeid="3">点击预览</button></p>
<p><a href="https://github.com/lifeng1893/Fantastic-Animation/tree/master/Canvas/zhima%20credit" rel="nofollow noreferrer" target="_blank">Github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas仿芝麻信用分仪表盘

## 原文链接
[https://segmentfault.com/a/1190000007477776](https://segmentfault.com/a/1190000007477776)


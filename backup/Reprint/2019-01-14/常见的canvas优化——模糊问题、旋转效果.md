---
title: '常见的canvas优化——模糊问题、旋转效果' 
date: 2019-01-14 2:30:07
hidden: true
slug: 157192j51w6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">canvas常见优化方案——模糊问题、旋转效果、离屏、自定义图片尺寸</h2>
<p><a href="https://segmentfault.com/a/1190000009406855">实践demo——“canvas离屏、旋转效果实践——旋转的雪花”</a></p>
<h3 id="articleHeader1">2017-12-18 16:27:35更新关于模糊问题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="前几天研究html2Canvas的时候刚好赶上作者发布新版本，发现新版本截屏出来的效果比我对旧版本处理后(画布尺寸都设为2倍)的效果更好。
扒源码的时候发现他们并没有直接设为两倍尺寸，而是先获取当前dom结构的scale，用当前dom的scale去设置canvas的画布尺寸比。
我自己手机上测试时打印出来的dom的scale显示为3倍尺寸，所以我设置canvas两倍画布尺寸的时候，其实还是会模糊的，不过对比1倍尺寸的是要清晰很多了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>前几天研究html2Canvas的时候刚好赶上作者发布新版本，发现新版本截屏出来的效果比我对旧版本处理后(画布尺寸都设为<span class="hljs-number">2</span>倍)的效果更好。
扒源码的时候发现他们并没有直接设为两倍尺寸，而是先获取当前dom结构的<span class="hljs-keyword">scale</span>，用当前dom的<span class="hljs-keyword">scale</span>去设置<span class="hljs-keyword">canvas</span>的画布尺寸比。
我自己手机上测试时打印出来的dom的<span class="hljs-keyword">scale</span>显示为<span class="hljs-number">3</span>倍尺寸，所以我设置<span class="hljs-keyword">canvas</span>两倍画布尺寸的时候，其实还是会模糊的，不过对比<span class="hljs-number">1</span>倍尺寸的是要清晰很多了。</code></pre>
<h3 id="articleHeader2">canvas显示模糊问题——画布尺寸设为显示尺寸的两倍即可</h3>
<p><strong>问题原因</strong></p>
<p>查阅canvas的API就可以知道，想要获得精确地线条，必须对线条是如何描绘出来的有所理解。</p>
<p>首先要清楚一点：canvas画线时的定位定的是线条中线的位置，根据线条的宽度再向两边延伸，如果延伸出去的线条没有占满1px，不足的部分将会以实际笔触颜色的一半色调来填充。所以最后我们实际看到的效果就是：1px的线条变宽了，且变模糊了，效果如左图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVNAhe?w=311&amp;h=161" src="https://static.alili.tech/img/bVNAhe?w=311&amp;h=161" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>解决办法</strong></p>
<p>根据问题原因我们知道：只要从线条中线开始向外延伸部分占满1px，就不会出现线条变宽且模糊的问题了。</p>
<p>最简单的办法是画线时根据需求将线条定位移动0.5px，不过这是治标不治本的方法，只能用来验证这个方法是不是正确的。</p>
<p>我们还可以将画布尺寸设为显示尺寸的2倍，这相当于用画图时的两个像素点去填充实际显示的一个像素点，这样就能很好的解决canvas显示模糊的问题了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="canvas.setAttribute('width', x * 2);
canvas.setAttribute('height', y * 2);
canvas.style.width = x + 'px';
canvas.style.height = y + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">canvas</span>.setAttribute(<span class="hljs-string">'width'</span>, x * <span class="hljs-number">2</span>);
<span class="hljs-keyword">canvas</span>.setAttribute(<span class="hljs-string">'height'</span>, y * <span class="hljs-number">2</span>);
<span class="hljs-keyword">canvas</span>.style.width = x + <span class="hljs-string">'px'</span>;
<span class="hljs-keyword">canvas</span>.style.height = y + <span class="hljs-string">'px'</span>;</code></pre>
<p>用这种方法要记得：各种布局尺寸也要做相应变化。</p>
<h3 id="articleHeader3">离屏canvas</h3>
<p>定义离屏canvas，在离屏canvas上设定画布尺寸并绘制canvas图片：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var offScreenCanvas = document.createElement('offScreenCanvas');
var offScreenCtx = offScreenCanvas.getContext('2d');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">var</span> <span class="hljs-literal">off</span>ScreenCanvas = document.createElement(<span class="hljs-string">'offScreenCanvas'</span>);
<span class="hljs-attribute">var</span> <span class="hljs-literal">off</span>ScreenCtx = <span class="hljs-literal">off</span>ScreenCanvas.getContext(<span class="hljs-string">'2d'</span>);</code></pre>
<p>然后将画好的离屏canvas绘制到实际显示的canvas上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.drawImage(offScreenCanvas, 0, 0, offScreenCanvas.width, offScreenCanvas.height,
    0, 0, canvas.width, canvas.height);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>ctx.drawImage(offScreenCanvas, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, offScreenCanvas<span class="hljs-selector-class">.width</span>, offScreenCanvas<span class="hljs-selector-class">.height</span>,
    <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.width</span>, <span class="hljs-selector-tag">canvas</span>.<span class="hljs-attribute">height</span>);</code></pre>
<p><strong>好处</strong></p>
<p>一是可以不受限于html标签及实际显示尺寸，画出一个标准尺寸的大图，然后自适应到实际显示的canvas上；<br>二是离屏canvas的缓存效果可以大大提升canvas的性能(当然像上述那样粗糙的代码，是体现不出这一效果的)。</p>
<p><strong>不足</strong></p>
<p>离屏canvas一定要画好之后才能绘制到实际显示的canvas上，这就导致哪些有延时的元素不方便这样用(如图片、自定义字体等)。针对这一问题，目前我还没有找到好的解决办法。</p>
<h3 id="articleHeader4">图片尺寸问题</h3>
<p>刚开始画图的时候很纠结的一个问题就是：canvas画png图片时，不同屏幕尺寸要配多大的图、配几套。后来在解决上述“离屏canvas”的问题后，这个问题也就迎刃而解了：drawImage函数可以设定将图片绘制成多大的，而不限定于图片本身的尺寸。</p>
<p>这个问题解决之后，就只需要一套图片就好了，还可以使图片大小自适应屏幕、随显示界面缩放。</p>
<h3 id="articleHeader5">canvas旋转效果——改变了画布坐标系</h3>
<p>canvas中有两个很好用的东西：旋转和保存状态。</p>
<p>以画圆的不同角度的半径为例，正常情况下我们要根据圆半径、线的角度和圆心的位置计算得出线的端点坐标P1{x1,y1}、P2{x2,y2}，然后画一条P1到P2的线，代码中的计算量不小。不过canvas中我们有更好的解决办法：</p>
<p>1.定位笔触到圆心位置{x,y}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.translate(x,y)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.translate</span>(<span class="hljs-selector-tag">x</span>,<span class="hljs-selector-tag">y</span>)</code></pre>
<p>2.根据线的角度旋转画布angle圈(angle=1时表示顺时针旋转一圈)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.rotate(Math.PI*2 * angle);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.rotate</span>(<span class="hljs-selector-tag">Math</span><span class="hljs-selector-class">.PI</span>*2 * <span class="hljs-selector-tag">angle</span>);</code></pre>
<p>3.画一条{0,0}到{r,0}的线即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath();
ctx.lineTo(0, 0);
ctx.lineTo(r, 0);
ctx.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.beginPath</span>();
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.lineTo</span>(0, 0);
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.lineTo</span>(<span class="hljs-selector-tag">r</span>, 0);
<span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.stroke</span>();</code></pre>
<p><strong>canvas旋转方式画线步骤解读：</strong></p>
<p>笔触定位相当于是定画布原点的位置，旋转画布则是以原点为圆心顺时针旋转了x/y坐标系，旋转后的效果是将x正半轴与要画的线重合，自然就相当于直接画一条{0,0}到{r,0}的线。</p>
<p><strong>另外一定要注意</strong>：</p>
<p>修改画布坐标系(定原点、旋转画布)之前一定要保存状态，画完线后一定要重载状态！不然你会很容易被自己改过的坐标系玩死的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见的canvas优化——模糊问题、旋转效果

## 原文链接
[https://segmentfault.com/a/1190000009396591](https://segmentfault.com/a/1190000009396591)


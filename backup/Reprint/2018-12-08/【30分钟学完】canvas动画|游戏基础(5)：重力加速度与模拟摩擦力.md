---
title: '【30分钟学完】canvas动画|游戏基础(5)：重力加速度与模拟摩擦力' 
date: 2018-12-08 2:30:30
hidden: true
slug: 42ml7q7htu6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>解决运动和碰撞问题后，我们为了让运动环境更加自然，需要加入一些环境因子，比如常见的重力加速度和模拟摩擦力。  <br>阅读本篇前请先打好前面的基础。  <br>本人能力有限，欢迎牛人共同讨论，批评指正。</p>
<h2 id="articleHeader1">重力加速度</h2>
<blockquote>【科普】重力加速度是一个物体受重力作用的情况下所具有的加速度。也叫自由落体加速度，用g表示。方向竖直向下。通常指地面附近物体受地球引力作用在真空中下落的加速度，记为g。为了便于计算，其近似标准值通常取为980厘米/秒的二次方或9.8米/秒的二次方。</blockquote>
<p>真实的物体是有质量的，所以其重力加速度是由于重力产生，而我们计算机中的抽象物体并没有质量，所有也不存在重力一说，我们这里说的重力加速度只是借用了物理上的概念，实际上是人为定义的一个<strong>方向指向y轴正半轴的加速度</strong>。  <br>其实实现起来很简单，就是设定一个为正的加速度，每次绘制都加到物体的y轴速度上。  <br>下面的示例是一个ball，它会受重力加速度gravity而自动下落，你可以使用键盘的上、下、左、右改变其四个方向上的加速度。核心代码如下：  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/09-gravity.html" rel="nofollow noreferrer" target="_blank">重力加速度演示</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);

  vx += ax;
  vy += ay;
  vy += gravity;
  ball.x += vx;
  ball.y += vy;
  ball.draw(context);
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="javascipt">(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas)<span class="hljs-comment">;</span>
  <span class="hljs-built_in">context</span>.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height)<span class="hljs-comment">;</span>

  vx += ax<span class="hljs-comment">;</span>
  vy += ay<span class="hljs-comment">;</span>
  vy += gravity<span class="hljs-comment">;</span>
  <span class="hljs-keyword">ball.x </span>+= vx<span class="hljs-comment">;</span>
  <span class="hljs-keyword">ball.y </span>+= vy<span class="hljs-comment">;</span>
  <span class="hljs-keyword">ball.draw(context);
</span>}())<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader2">模拟摩擦力</h2>
<blockquote>【科普】阻碍物体相对运动（或相对运动趋势）的力叫做摩擦力。摩擦力的方向与物体相对运动（或相对运动趋势）的方向相反。一个物体在另一个物体表面发生滑动时，接触面间产生阻碍它们相对运动的摩擦，称为滑动摩擦。滑动摩擦力的大小与接触面的粗糙程度的大小和压力大小有关。压力越大，物体接触面越粗糙，产生的滑动摩擦力就越大。</blockquote>
<p>之前的例子中有一些非常不自然的场景，比如<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/04-follow-mouse.html" rel="nofollow noreferrer" target="_blank">跟随鼠标的箭头</a>，由于加速度始终存在，导致运动永远不可能停止，而在现实中（太空例外），由于存在各种摩擦力的关系，这是不可能发生的情况。  <br>计算机中没有摩擦力，我们只是借鉴物理中的概念模拟一个<strong>模拟摩擦力</strong>，请记住这个并不是物理意义的力。</p>
<blockquote>【定义】模拟摩擦力是人为规定的值，定义和滑动摩擦力相似都与运动方向相反的量，将物体速度削减到0为止，不会改变运动方向。</blockquote>
<p>注意：根据定义只能将物体的速率减去与一定大小的值，而不能分别在x, y轴上减小速度向量。如果物体正沿着某个角度运动，就会出现物体在某条轴的速度降为零，而继续在另一条轴上运动的奇怪现象。</p>
<h3 id="articleHeader3">正确做法</h3>
<p>我们将模拟摩擦力用变量friction表示，示例会演示随机速度的ball从运动到停止的过程，核心代码如下，基本思路：</p>
<blockquote>【科普】速度和速率是两个不同的概念。速度是矢量，具有大小和方向；速率则纯粹指物体运动的快慢，是标量，没有方向。</blockquote>
<ol>
<li>将vx与vy平方后求和，再开方求出速率；通过计算Math.atan2(vy, vx)获得角度；</li>
<li>从速率减去模拟摩擦力，但不要让速率变为负数；</li>
<li>通过正余弦函数将和速率分解为x轴和y轴上的速度。</li>
</ol>
<p>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/06-friction-1.html" rel="nofollow noreferrer" target="_blank">模拟摩擦力正确计算</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // 先求速率
  let speed = Math.sqrt(vx ** 2 + vy ** 2);
  // 算出角度
  const angle = Math.atan2(vy, vx);
  // 判断运动是否停止
  if (speed > friction) {
    // 没有停止则减去模拟摩擦力
    speed -= friction;
  } else {
    speed = 0;
  }
  // 重新分解为x轴和y轴上的速度
  vx = Math.cos(angle) * speed;
  vy = Math.sin(angle) * speed;
  ball.x += vx;
  ball.y += vy;
  ball.draw(context);
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
  <span class="hljs-comment">// 先求速率</span>
  <span class="hljs-keyword">let</span> speed = <span class="hljs-built_in">Math</span>.sqrt(vx ** <span class="hljs-number">2</span> + vy ** <span class="hljs-number">2</span>);
  <span class="hljs-comment">// 算出角度</span>
  <span class="hljs-keyword">const</span> angle = <span class="hljs-built_in">Math</span>.atan2(vy, vx);
  <span class="hljs-comment">// 判断运动是否停止</span>
  <span class="hljs-keyword">if</span> (speed &gt; friction) {
    <span class="hljs-comment">// 没有停止则减去模拟摩擦力</span>
    speed -= friction;
  } <span class="hljs-keyword">else</span> {
    speed = <span class="hljs-number">0</span>;
  }
  <span class="hljs-comment">// 重新分解为x轴和y轴上的速度</span>
  vx = <span class="hljs-built_in">Math</span>.cos(angle) * speed;
  vy = <span class="hljs-built_in">Math</span>.sin(angle) * speed;
  ball.x += vx;
  ball.y += vy;
  ball.draw(context);
}());</code></pre>
<h3 id="articleHeader4">简便做法</h3>
<p>正确的做法十分繁琐，是个合成分解再合成的过程，这样对计算资源的消耗是比较大的，但我们也许并不需要这么精确的做法，只要每次将各个方向的速度乘以一个0~1之间的数就能简单模拟出摩擦力的效果。因此我们定义了<strong>模拟摩擦力系数</strong>。</p>
<blockquote>【定义】模拟摩擦力系数是人为规定的值，会在物体运动时不断比例减少各个方向上的速度，使各个方向的速度无限接近于0。</blockquote>
<p>示例由上面的正确做法改造而来，friction被定义为模拟摩擦力系数，指为0.9，只要运动都将x轴和y轴方向的速度乘以这个值即可，减少了大量操作。核心代码如下：  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/06-friction-1.html" rel="nofollow noreferrer" target="_blank">模拟摩擦力正确计算</a>  <br>注意：这里有一个细节，速度不断乘以系数会导致速度<strong>无限接近但不等于0</strong>，为了避免做无意义的计算，可以先判断速度是否已经小到肉眼不可见的值，以提高性能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // 判断速度大小以减少不必要的计算
  if (Math.abs(vx) > 0.001) {
    // 减少速度
    vx *= friction;
    ball.x += vx;
  }
  if (Math.abs(vy) > 0.001) {
    vy *= friction;
    ball.y += vy;
  }
  ball.draw(context);
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
  <span class="hljs-comment">// 判断速度大小以减少不必要的计算</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(vx) &gt; <span class="hljs-number">0.001</span>) {
    <span class="hljs-comment">// 减少速度</span>
    vx *= friction;
    ball.x += vx;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(vy) &gt; <span class="hljs-number">0.001</span>) {
    vy *= friction;
    ball.y += vy;
  }
  ball.draw(context);
}());</code></pre>
<h2 id="articleHeader5">回顾前面的示例</h2>
<ul>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/02-fountain.html" rel="nofollow noreferrer" target="_blank">彩色喷泉</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part7/08-spring-4.html" rel="nofollow noreferrer" target="_blank">往鼠标方向弹动的箭头</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(5)：重力加速度与模拟摩擦力

## 原文链接
[https://segmentfault.com/a/1190000014019499](https://segmentfault.com/a/1190000014019499)


---
title: '【30分钟学完】canvas动画|游戏基础(4)：边界与碰撞' 
date: 2018-12-08 2:30:30
hidden: true
slug: dg954lcn8rg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本系列前几篇中常出现物体跑到画布外的情况，本篇就是为了解决这个问题。  <br>阅读本篇前请先打好前面的基础。  <br>本人能力有限，欢迎牛人共同讨论，批评指正。</p>
<h2 id="articleHeader1">越界检测</h2>
<p>假定物体是个圆形，如图其圆心坐标即是物体的x轴和y轴坐标。  <br>越界是常见的场景，一般会有两种场景的越界：一是整个物体移出区域，二是物体接触到区域边界。我们以画布边界为例进行讨论，示例中矩形边界即是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let top = 0;
let bottom = canvas.height;
let left = 0;
let right = canvas.width;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> top = <span class="hljs-number">0</span>;
<span class="hljs-keyword">let</span> bottom = canvas.height;
<span class="hljs-keyword">let</span> left = <span class="hljs-number">0</span>;
<span class="hljs-keyword">let</span> right = canvas.width;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV6UUr?w=1044&amp;h=536" src="https://static.alili.tech/img/bV6UUr?w=1044&amp;h=536" alt="边界" title="边界" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">整个物体移出区域</h3>
<p>要整个物体离开范围才算越界，则可得越界条件如下，以下任何一项为true即可判定越界。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 右侧越界
object.x - object.width/2 > right
// 左侧越界
object.x + object.width/2 < left
// 上部越界
object.y + object.height/2 < top
// 下部越界
object.y - object.height/2 > bottom" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 右侧越界</span>
object.x - object.width/<span class="hljs-number">2</span> &gt; right
<span class="hljs-comment">// 左侧越界</span>
object.x + object.width/<span class="hljs-number">2</span> &lt; left
<span class="hljs-comment">// 上部越界</span>
object.y + object.height/<span class="hljs-number">2</span> &lt; top
<span class="hljs-comment">// 下部越界</span>
object.y - object.height/<span class="hljs-number">2</span> &gt; bottom</code></pre>
<h3 id="articleHeader3">物体接触到区域边界</h3>
<p>物体接触到区域边界就算越界，则可得越界条件如下，以下任何一项为true即可判定越界。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 右侧越界
object.x + object.width/2 > right
// 左侧越界
object.x - object.width/2 < left
// 上部越界
object.y - object.height/2 < top
// 下部越界
object.y + object.height/2 > bottom" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 右侧越界</span>
object.x + object.width/<span class="hljs-number">2</span> &gt; right
<span class="hljs-comment">// 左侧越界</span>
object.x - object.width/<span class="hljs-number">2</span> &lt; left
<span class="hljs-comment">// 上部越界</span>
object.y - object.height/<span class="hljs-number">2</span> &lt; top
<span class="hljs-comment">// 下部越界</span>
object.y + object.height/<span class="hljs-number">2</span> &gt; bottom</code></pre>
<h2 id="articleHeader4">越界了该怎么办</h2>
<p>搞明白越界条件后，接下来讨论越界之后的处理办法，一般是一下四种。</p>
<h3 id="articleHeader5">将物体移除</h3>
<p>这是最简单的处理办法，属于整个物体移出区域才算越界的情况。  <br>下面的例子会先批量创建ball，保存在balls数组里，每次动画循环都会遍历这个数组，依次输入draw()函数，改变ball的位置并检测是否越界。下面只列出draw()函数的代码。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/01-removal.html" rel="nofollow noreferrer" target="_blank">清除越界圆</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(ball, pos) {
  // 依据球的速度改变球的位置
  ball.x += ball.vx;
  ball.y += ball.vy;
  // 检查是否越界
  if (ball.x - ball.radius > canvas.width || ball.x + ball.radius < 0 || ball.y - ball.radius > canvas.height || ball.y + ball.radius < 0) {
    // 在数组中清除越界的球
    balls.splice(pos, 1);
    // 打印提示
    if (balls.length > 0) {
      log.value += `Removed ${ball.id}\n`;
      log.scrollTop = log.scrollHeight;
    } else {
      log.value += 'All gone!\n';
    }
  }
  // 画球
  ball.draw(context);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params">ball, pos</span>) </span>{
  <span class="hljs-comment">// 依据球的速度改变球的位置</span>
  ball.x += ball.vx;
  ball.y += ball.vy;
  <span class="hljs-comment">// 检查是否越界</span>
  <span class="hljs-keyword">if</span> (ball.x - ball.radius &gt; canvas.width || ball.x + ball.radius &lt; <span class="hljs-number">0</span> || ball.y - ball.radius &gt; canvas.height || ball.y + ball.radius &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 在数组中清除越界的球</span>
    balls.splice(pos, <span class="hljs-number">1</span>);
    <span class="hljs-comment">// 打印提示</span>
    <span class="hljs-keyword">if</span> (balls.length &gt; <span class="hljs-number">0</span>) {
      log.value += <span class="hljs-string">`Removed <span class="hljs-subst">${ball.id}</span>\n`</span>;
      log.scrollTop = log.scrollHeight;
    } <span class="hljs-keyword">else</span> {
      log.value += <span class="hljs-string">'All gone!\n'</span>;
    }
  }
  <span class="hljs-comment">// 画球</span>
  ball.draw(context);
}</code></pre>
<h3 id="articleHeader6">将其物体置回边界内</h3>
<p>属于整个物体移出区域才算越界的情况。  <br>下面的例子也是把创建的ball保存在balls数组里，但ball的初始位置都是画布中间的下部，如果检测到有ball越界，则会重置ball的位置。下面只列出draw()函数的代码。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/02-fountain.html" rel="nofollow noreferrer" target="_blank">彩色喷泉</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(ball) {
  // 依据球的速度改变球的位置，这里包含了伪重力
  ball.vy += gravity;
  ball.x += ball.vx;
  ball.y += ball.vy;
  // 检测是否越界
  if (ball.x - ball.radius > canvas.width || ball.x + ball.radius < 0 || ball.y - ball.radius > canvas.height || ball.y + ball.radius < 0) {
    // 重置ball的位置
    ball.x = canvas.width / 2;
    ball.y = canvas.height;
    // 重置ball的速度
    ball.vx = Math.random() * 6 - 3;
    ball.vy = Math.random() * -10 - 10;
    // 打印提示
    log.value = `Reset ${ball.id}\n`;
  }
  // 画球
  ball.draw(context);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params">ball</span>) </span>{
  <span class="hljs-comment">// 依据球的速度改变球的位置，这里包含了伪重力</span>
  ball.vy += gravity;
  ball.x += ball.vx;
  ball.y += ball.vy;
  <span class="hljs-comment">// 检测是否越界</span>
  <span class="hljs-keyword">if</span> (ball.x - ball.radius &gt; canvas.width || ball.x + ball.radius &lt; <span class="hljs-number">0</span> || ball.y - ball.radius &gt; canvas.height || ball.y + ball.radius &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 重置ball的位置</span>
    ball.x = canvas.width / <span class="hljs-number">2</span>;
    ball.y = canvas.height;
    <span class="hljs-comment">// 重置ball的速度</span>
    ball.vx = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">6</span> - <span class="hljs-number">3</span>;
    ball.vy = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">-10</span> - <span class="hljs-number">10</span>;
    <span class="hljs-comment">// 打印提示</span>
    log.value = <span class="hljs-string">`Reset <span class="hljs-subst">${ball.id}</span>\n`</span>;
  }
  <span class="hljs-comment">// 画球</span>
  ball.draw(context);
}</code></pre>
<h3 id="articleHeader7">屏幕环绕</h3>
<p>属于整个物体移出区域才算越界的情况。  <br>屏幕环绕就是让同一个物体出现在边界内的另一个位置，如果一个物体从屏幕左侧移出，它就会在屏幕右侧再次出现，反之亦然，上下也是同理。  <br>这里比前面的要稍微复杂的判断物体跃的是那边的界，伪代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(object.x - object.width/2 > right){
    object.x = left - object.widht/2;
}else if(object.x + object.width/2 < left){
    object.x = right + object.width/2;
}
if(object.y - object.height/2 > bottom){
    object.y = top - object.height/2;
}else if(object.y + object.height/2 < top){
    obejct.y = bottom + object.height/2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(object.x - object.width/<span class="hljs-number">2</span> &gt; right){
    object.x = left - object.widht/<span class="hljs-number">2</span>;
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(object.x + object.width/<span class="hljs-number">2</span> &lt; left){
    object.x = right + object.width/<span class="hljs-number">2</span>;
}
<span class="hljs-keyword">if</span>(object.y - object.height/<span class="hljs-number">2</span> &gt; bottom){
    object.y = top - object.height/<span class="hljs-number">2</span>;
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(object.y + object.height/<span class="hljs-number">2</span> &lt; top){
    obejct.y = bottom + object.height/<span class="hljs-number">2</span>;
}</code></pre>
<h3 id="articleHeader8">反弹（粗略版）</h3>
<p>这是较复杂的一种情况，属于物体接触到区域边界就算越界的情况。基本思路：</p>
<ol>
<li>检查物体是否越过任意边界；</li>
<li>如果发生越界， 立即将物体置回边界；</li>
<li>反转物体的速度向量的方向。</li>
</ol>
<p>下面的示例是一个ball在画布内移动，撞到边界就反弹，反弹核心代码如下。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/04-bouncing-1.html" rel="nofollow noreferrer" target="_blank">反弹球（粗略版）</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (ball.x + ball.radius > right) {
  ball.x = right - ball.radius;
  vx *= -1;
} else if (ball.x - ball.radius < left) {
  ball.x = left + ball.radius;
  vx *= -1;
}
if (ball.y + ball.radius > bottom) {
  ball.y = bottom - ball.radius;
  vy *= -1;
} else if (ball.y - ball.radius < top) {
  ball.y = top + ball.radius;
  vy *= -1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (ball.x + ball.radius &gt; right) {
  ball.x = right - ball.radius;
  vx *= <span class="hljs-number">-1</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ball.x - ball.radius &lt; left) {
  ball.x = left + ball.radius;
  vx *= <span class="hljs-number">-1</span>;
}
<span class="hljs-keyword">if</span> (ball.y + ball.radius &gt; bottom) {
  ball.y = bottom - ball.radius;
  vy *= <span class="hljs-number">-1</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ball.y - ball.radius &lt; top) {
  ball.y = top + ball.radius;
  vy *= <span class="hljs-number">-1</span>;
}</code></pre>
<h3 id="articleHeader9">反弹（完美版）</h3>
<p>咋看似乎效果不错，但仔细想想，我们这样将物体置回边界的做法是准确的吗？  <br>答案是否定的，理想反弹与实际反弹是不同的，如下图：  </p>
<p><span class="img-wrap"><img data-src="/img/bV6UUs?w=760&amp;h=654" src="https://static.alili.tech/img/bV6UUs?w=760&amp;h=654" alt="理想反弹与实际反弹" title="理想反弹与实际反弹" style="cursor: pointer; display: inline;"></span></p>
<p>从图中我们可以清除的知道，ball实际上是不太可能会在理想反弹点反弹的，因为如果速度过大，计算位置时ball已经越过“理想反弹点”到达“实际反弹点”，而我们如果只是将ball的x轴坐标简单粗暴移到边界上，那还是不可能是“理想反弹点”，也就是说这种反弹方法不准确。  <br>那么，完美反弹的思路就明确了，我们需要找到“理想反弹点”，并将ball置到该点。如果是左右边越界，则算出"理想反弹点"与“实际反弹点”在y轴上的距离；如果是上下边越界，则算出"理想反弹点"与“实际反弹点”在x轴上的距离。如图，思路以左右边越界为例：  </p>
<p><span class="img-wrap"><img data-src="/img/bV6UUt?w=1132&amp;h=726" src="https://static.alili.tech/img/bV6UUt?w=1132&amp;h=726" alt="求理想反弹点" title="求理想反弹点" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>由速度可求得物体的方向弧度angle；</li>
<li>算出"实际反弹点"和“理想反弹点”在x轴上的距离；</li>
<li>依据正切求"实际反弹点"和“理想反弹点”在y轴上的距离；</li>
<li>“理想反弹点”的y轴坐标即是"实际反弹点"加上这段距离。</li>
</ol>
<p>改造后的核心代码如下，至于有没有必要多做这么多运算，这就要权衡性能和精密性了。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part5/05-bouncing-2.html" rel="nofollow noreferrer" target="_blank">反弹球（完美版）</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (ball.x + ball.radius > right) {
  const dx = ball.x - (right - ball.radius);
  const dy = Math.tan(angle) * dx;
  ball.x = right - ball.radius;
  ball.y += dy;
  vx *= bounce;
} else if (ball.x - ball.radius < left) {
  const dx = ball.x - (left + ball.radius);
  const dy = Math.tan(angle) * dx;
  ball.x = left + ball.radius;
  ball.y += dy;
  vx *= bounce;
}
if (ball.y + ball.radius > bottom) {
  const dy = ball.y - (bottom - ball.radius);
  const dx = dy / Math.tan(angle);
  ball.y = bottom - ball.radius;
  ball.x += dx;
  vy *= bounce;
} else if (ball.y - ball.radius < top) {
  const dy = ball.y - (top + ball.radius);
  const dx = dy / Math.tan(angle);
  ball.y = top + ball.radius;
  ball.x += dx;
  vy *= bounce;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (ball.x + ball.radius &gt; right) {
  <span class="hljs-keyword">const</span> dx = ball.x - (right - ball.radius);
  <span class="hljs-keyword">const</span> dy = <span class="hljs-built_in">Math</span>.tan(angle) * dx;
  ball.x = right - ball.radius;
  ball.y += dy;
  vx *= bounce;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ball.x - ball.radius &lt; left) {
  <span class="hljs-keyword">const</span> dx = ball.x - (left + ball.radius);
  <span class="hljs-keyword">const</span> dy = <span class="hljs-built_in">Math</span>.tan(angle) * dx;
  ball.x = left + ball.radius;
  ball.y += dy;
  vx *= bounce;
}
<span class="hljs-keyword">if</span> (ball.y + ball.radius &gt; bottom) {
  <span class="hljs-keyword">const</span> dy = ball.y - (bottom - ball.radius);
  <span class="hljs-keyword">const</span> dx = dy / <span class="hljs-built_in">Math</span>.tan(angle);
  ball.y = bottom - ball.radius;
  ball.x += dx;
  vy *= bounce;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ball.y - ball.radius &lt; top) {
  <span class="hljs-keyword">const</span> dy = ball.y - (top + ball.radius);
  <span class="hljs-keyword">const</span> dx = dy / <span class="hljs-built_in">Math</span>.tan(angle);
  ball.y = top + ball.radius;
  ball.x += dx;
  vy *= bounce;
}</code></pre>
<h2 id="articleHeader10">碰撞检测</h2>
<p>和越界检查很像，我们扩展到两个物体间的碰撞检测，一般常用的有如下两种办法。</p>
<h3 id="articleHeader11">基于几何图形的碰撞检测</h3>
<p>一般是用在<strong>检测矩形的碰撞</strong>，原理就是判断一个物体是否和另一个物体有重叠。  <br>下面直接给出两个检测的工具函数。完整示例：</p>
<ul>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part8/01-object-hit-test.html" rel="nofollow noreferrer" target="_blank">两个矩形碰撞检测演示</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part8/03-point-hit-test.html" rel="nofollow noreferrer" target="_blank">矩形与点碰撞检测演示</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 两个矩形碰撞检测
function intersects(rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 两个矩形碰撞检测</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">intersects</span>(<span class="hljs-params">rectA, rectB</span>) </span>{
  <span class="hljs-keyword">return</span> !(rectA.x + rectA.width &lt; rectB.x ||
    rectB.x + rectB.width &lt; rectA.x ||
    rectA.y + rectA.height &lt; rectB.y ||
    rectB.y + rectB.height &lt; rectA.y);
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 矩形与点碰撞检测
function containsPoint(rect, x, y) {
  return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 矩形与点碰撞检测</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">containsPoint</span>(<span class="hljs-params">rect, x, y</span>) </span>{
  <span class="hljs-keyword">return</span> !(x &lt; rect.x || x &gt; rect.x + rect.width || y &lt; rect.y || y &gt; rect.y + rect.height);
};</code></pre>
<h3 id="articleHeader12">基于距离的碰撞检测</h3>
<p>一般是用在<strong>检测圆形的碰撞</strong>，原理就是判断两个物体是否足够近到发生碰撞。  <br>对于圆来说，只要两个圆心距离小于两圆半径之和，那我们就可判定为碰撞。圆心距离可通过<strong>勾股定理</strong>求得。核心代码如下：  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part8/05-distance-2.html" rel="nofollow noreferrer" target="_blank">两圆基于距离的碰撞演示</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dx = ballB.x - ballA.x;
const dy = ballB.y - ballA.y;
const dist = Math.sqrt(dx ** 2 + dy ** 2);

if (dist < ballA.radius + ballB.radius) {
  log.value = 'Hit!';
} else {
  log.value = '';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> dx = ballB.x - ballA.x;
<span class="hljs-keyword">const</span> dy = ballB.y - ballA.y;
<span class="hljs-keyword">const</span> dist = <span class="hljs-built_in">Math</span>.sqrt(dx ** <span class="hljs-number">2</span> + dy ** <span class="hljs-number">2</span>);

<span class="hljs-keyword">if</span> (dist &lt; ballA.radius + ballB.radius) {
  log.value = <span class="hljs-string">'Hit!'</span>;
} <span class="hljs-keyword">else</span> {
  log.value = <span class="hljs-string">''</span>;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(4)：边界与碰撞

## 原文链接
[https://segmentfault.com/a/1190000014002724](https://segmentfault.com/a/1190000014002724)


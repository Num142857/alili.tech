---
title: '【30分钟学完】canvas动画|游戏基础(6)：坐标旋转探究' 
date: 2018-12-07 2:30:10
hidden: true
slug: zo95cnqp2u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本篇主要讲坐标旋转及其应用，这是编程动画必不可少的技术。  <br>阅读本篇前请先打好前面的基础。  <br>本人能力有限，欢迎牛人共同讨论，批评指正。</p>
<h2 id="articleHeader1">坐标旋转</h2>
<p>模拟场景：已知一个中心点（centerX,centerY），旋转前物体ball（x1,y1），旋转弧度（rotation）；求旋转后物体（x2,y2）。（如下图）  </p>
<p><span class="img-wrap"><img data-src="/img/bV7nCv?w=1072&amp;h=784" src="https://static.alili.tech/img/bV7nCv?w=1072&amp;h=784" alt="场景图" title="场景图" style="cursor: pointer; display: inline;"></span></p>
<p>坐标旋转就是说围绕某个点旋转坐标，我们要依据旋转的角度（弧度），计算出物体旋转前后的坐标，一般有两种方法：</p>
<h3 id="articleHeader2">简单坐标旋转</h3>
<p>灵活运用前章节的三角函数知识可以很容易解决，基本思路：</p>
<ol>
<li>计算物体初始相对于中心点的位置；</li>
<li>使用atan2计算弧度angle；</li>
<li>使用勾股定理计算半径radius；</li>
<li>angle+rotation后使用cos计算旋转后x轴位置，用sin计算旋转后y轴位置。</li>
</ol>
<p>下面是示例是采用这种方法的圆周运动，其中vr为ball相对于中心点的弧度变化速度，由于旋转半径是固定的，所以没有在动画循环里每次都获取。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part9/01-rotate-1.html" rel="nofollow noreferrer" target="_blank">简单坐标旋转演示</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 简单坐标旋转演示
 * */
window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const ball = new Ball();
  ball.x = 300;
  ball.y = 200;
  // 弧度变化速度
  const vr = 0.05;
  // 中心点位置设定在画布中心
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  // ball相对与中心点的距离
  const dx = ball.x - centerX;
  const dy = ball.y - centerY;
  // ball相对与中心点的弧度
  let angle = Math.atan2(dy, dx);
  // 旋转半径
  const radius = Math.sqrt(dx ** 2 + dy ** 2);

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    ball.x = centerX + Math.cos(angle) * radius;
    ball.y = centerY + Math.sin(angle) * radius;
    angle += vr;
    ball.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 简单坐标旋转演示
 * */</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> ball = <span class="hljs-keyword">new</span> Ball();
  ball.x = <span class="hljs-number">300</span>;
  ball.y = <span class="hljs-number">200</span>;
  <span class="hljs-comment">// 弧度变化速度</span>
  <span class="hljs-keyword">const</span> vr = <span class="hljs-number">0.05</span>;
  <span class="hljs-comment">// 中心点位置设定在画布中心</span>
  <span class="hljs-keyword">const</span> centerX = canvas.width / <span class="hljs-number">2</span>;
  <span class="hljs-keyword">const</span> centerY = canvas.height / <span class="hljs-number">2</span>;
  <span class="hljs-comment">// ball相对与中心点的距离</span>
  <span class="hljs-keyword">const</span> dx = ball.x - centerX;
  <span class="hljs-keyword">const</span> dy = ball.y - centerY;
  <span class="hljs-comment">// ball相对与中心点的弧度</span>
  <span class="hljs-keyword">let</span> angle = <span class="hljs-built_in">Math</span>.atan2(dy, dx);
  <span class="hljs-comment">// 旋转半径</span>
  <span class="hljs-keyword">const</span> radius = <span class="hljs-built_in">Math</span>.sqrt(dx ** <span class="hljs-number">2</span> + dy ** <span class="hljs-number">2</span>);

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    ball.x = centerX + <span class="hljs-built_in">Math</span>.cos(angle) * radius;
    ball.y = centerY + <span class="hljs-built_in">Math</span>.sin(angle) * radius;
    angle += vr;
    ball.draw(context);
  }());
};</code></pre>
<h3 id="articleHeader3">坐标旋转公式</h3>
<p>上面的方法对于单个物体来说是很合适的，特别是角度和半径只需计算一次的情况。但是在更动态的场景中，可能需要旋转多个物体，而他们相对于中心点的位置各不相同。所以每一帧都要计算每个物体的距离、角度和半径，然后把vr累加在角度上，最后计算物体新的坐标。这样显然不会是优雅的做法。  <br>理想的做法是用数学方法推导出旋转角度与位置的关系，直接每次代入计算即可。推导过程如下图：  </p>
<p><span class="img-wrap"><img data-src="/img/bV7nCC?w=1232&amp;h=930" src="https://static.alili.tech/img/bV7nCC?w=1232&amp;h=930" alt="推导过程" title="推导过程" style="cursor: pointer; display: inline;"></span></p>
<p>其实推导过程不重要，我们只需要记住如下两组公式，其中dx2和dy2是ball结束点相对于中心点的距离，所以得到物体结束点，还要分别加上中心点坐标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正向选择
dx2 = (x1 - centerX) * cos(rotation) - (y1 - centerY) * sin(rotation)
dy2 = (y1 - centerY) * cos(rotation) + (x1 - centerX) * sin(rotation)
// 反向选择
dx2 = (x1 - centerX) * cos(rotation) + (y1 - centerY) * sin(rotation)
dy2 = (y1 - centerY) * cos(rotation) - (x1 - centerX) * sin(rotation)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 正向选择</span>
dx2 = (x1 - centerX) * cos(rotation) - (y1 - centerY) * sin(rotation)
dy2 = (y1 - centerY) * cos(rotation) + (x1 - centerX) * sin(rotation)
<span class="hljs-comment">// 反向选择</span>
dx2 = (x1 - centerX) * cos(rotation) + (y1 - centerY) * sin(rotation)
dy2 = (y1 - centerY) * cos(rotation) - (x1 - centerX) * sin(rotation)</code></pre>
<p>下面是示例是采用这种方法的圆周运动，其中dx1和dy1是ball起始点相对于中心点的距离，dx2和dy2是ball结束点相对于中心点的距离。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part9/02-rotate-2.html" rel="nofollow noreferrer" target="_blank">高级坐标旋转演示</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 高级坐标旋转演示
 * */
window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const ball = new Ball();
  ball.x = 300;
  ball.y = 200;
  // 弧度变化速度
  const vr = 0.05;
  // 中心点位置设定在画布中心
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  // 由于vr是固定的可以先计算正弦和余弦
  const cos = Math.cos(vr);
  const sin = Math.sin(vr);

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // ball相对与中心点的距离
    const dx1 = ball.x - centerX;
    const dy1 = ball.y - centerY;
    // 代入公式求出ball在结束相对与中心点的距离
    const dx2 = dx1 * cos - dy1 * sin;
    const dy2 = dy1 * cos + dx1 * sin;
    // 求出x2，y2
    ball.x = centerX + dx2;
    ball.y = centerY + dy2;
    ball.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 高级坐标旋转演示
 * */</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> ball = <span class="hljs-keyword">new</span> Ball();
  ball.x = <span class="hljs-number">300</span>;
  ball.y = <span class="hljs-number">200</span>;
  <span class="hljs-comment">// 弧度变化速度</span>
  <span class="hljs-keyword">const</span> vr = <span class="hljs-number">0.05</span>;
  <span class="hljs-comment">// 中心点位置设定在画布中心</span>
  <span class="hljs-keyword">const</span> centerX = canvas.width / <span class="hljs-number">2</span>;
  <span class="hljs-keyword">const</span> centerY = canvas.height / <span class="hljs-number">2</span>;
  <span class="hljs-comment">// 由于vr是固定的可以先计算正弦和余弦</span>
  <span class="hljs-keyword">const</span> cos = <span class="hljs-built_in">Math</span>.cos(vr);
  <span class="hljs-keyword">const</span> sin = <span class="hljs-built_in">Math</span>.sin(vr);

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    <span class="hljs-comment">// ball相对与中心点的距离</span>
    <span class="hljs-keyword">const</span> dx1 = ball.x - centerX;
    <span class="hljs-keyword">const</span> dy1 = ball.y - centerY;
    <span class="hljs-comment">// 代入公式求出ball在结束相对与中心点的距离</span>
    <span class="hljs-keyword">const</span> dx2 = dx1 * cos - dy1 * sin;
    <span class="hljs-keyword">const</span> dy2 = dy1 * cos + dx1 * sin;
    <span class="hljs-comment">// 求出x2，y2</span>
    ball.x = centerX + dx2;
    ball.y = centerY + dy2;
    ball.draw(context);
  }());
};</code></pre>
<h2 id="articleHeader4">斜面反弹</h2>
<p>前面的章节中我们介绍过越界的一种处理办法是反弹，由于边界是矩形，反弹面垂直或水平，所以可以直接将对应轴的速度取反即可，但对于非垂直或水平的反弹面这种方法是不适用的。  <br>坐标旋转常见的应用就是处理这种情况，将不规律方向的复杂问题简单化。  <br>基本思路：（旋转前后如图）</p>
<ol>
<li>使用旋转公式，旋转整个系统，将斜面场景转变为水平场景；</li>
<li>在水平场景中处理反弹；</li>
<li>再旋转回来。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV7nCD?w=1430&amp;h=596" src="https://static.alili.tech/img/bV7nCD?w=1430&amp;h=596" alt="旋转前后系统" title="旋转前后系统" style="cursor: pointer; display: inline;"></span></p>
<p>示例是一个球掉落到一条线上，球受到重力加速度影响下落，碰到斜面就会反弹，每次反弹都会损耗速度。  <br>完整示例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part9/05-angle-bounce-opt.html" rel="nofollow noreferrer" target="_blank">斜面反弹示例</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const ball = new Ball();
  // line类构造函数参数（开始点x轴坐标，开始点y轴坐标，结束点x轴坐标，结束点y轴坐标）
  const line = new Line(0, 0, 500, 0);
  // 设置重力加速度
  const gravity = 0.2;
  // 设置反弹系数
  const bounce = -0.6;

  ball.x = 100;
  ball.y = 100;

  line.x = 0;
  line.y = 200;
  line.rotation = 10 * Math.PI / 180;

  const cos = Math.cos(line.rotation);
  const sin = Math.sin(line.rotation);

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;

    // 获取ball与line的相对位置
    let x1 = ball.x - line.x;
    let y1 = ball.y - line.y;
    // 旋转坐标系（反向）
    let y2 = y1 * cos - x1 * sin;

    // 依据旋转值执行反弹
    if (y2 > -ball.radius) {
      // 旋转坐标系（反向）
      const x2 = x1 * cos + y1 * sin;
      // 旋转速度（反向）
      const vx1 = ball.vx * cos + ball.vy * sin;
      let vy1 = ball.vy * cos - ball.vx * sin;

      y2 = -ball.radius;
      vy1 *= bounce;

      // 将所有东西回转（正向）
      x1 = x2 * cos - y2 * sin;
      y1 = y2 * cos + x2 * sin;
      ball.vx = vx1 * cos - vy1 * sin;
      ball.vy = vy1 * cos + vx1 * sin;
      ball.x = line.x + x1;
      ball.y = line.y + y1;
    }

    ball.draw(context);
    line.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> ball = <span class="hljs-keyword">new</span> Ball();
  <span class="hljs-comment">// line类构造函数参数（开始点x轴坐标，开始点y轴坐标，结束点x轴坐标，结束点y轴坐标）</span>
  <span class="hljs-keyword">const</span> line = <span class="hljs-keyword">new</span> Line(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">500</span>, <span class="hljs-number">0</span>);
  <span class="hljs-comment">// 设置重力加速度</span>
  <span class="hljs-keyword">const</span> gravity = <span class="hljs-number">0.2</span>;
  <span class="hljs-comment">// 设置反弹系数</span>
  <span class="hljs-keyword">const</span> bounce = <span class="hljs-number">-0.6</span>;

  ball.x = <span class="hljs-number">100</span>;
  ball.y = <span class="hljs-number">100</span>;

  line.x = <span class="hljs-number">0</span>;
  line.y = <span class="hljs-number">200</span>;
  line.rotation = <span class="hljs-number">10</span> * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>;

  <span class="hljs-keyword">const</span> cos = <span class="hljs-built_in">Math</span>.cos(line.rotation);
  <span class="hljs-keyword">const</span> sin = <span class="hljs-built_in">Math</span>.sin(line.rotation);

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;

    <span class="hljs-comment">// 获取ball与line的相对位置</span>
    <span class="hljs-keyword">let</span> x1 = ball.x - line.x;
    <span class="hljs-keyword">let</span> y1 = ball.y - line.y;
    <span class="hljs-comment">// 旋转坐标系（反向）</span>
    <span class="hljs-keyword">let</span> y2 = y1 * cos - x1 * sin;

    <span class="hljs-comment">// 依据旋转值执行反弹</span>
    <span class="hljs-keyword">if</span> (y2 &gt; -ball.radius) {
      <span class="hljs-comment">// 旋转坐标系（反向）</span>
      <span class="hljs-keyword">const</span> x2 = x1 * cos + y1 * sin;
      <span class="hljs-comment">// 旋转速度（反向）</span>
      <span class="hljs-keyword">const</span> vx1 = ball.vx * cos + ball.vy * sin;
      <span class="hljs-keyword">let</span> vy1 = ball.vy * cos - ball.vx * sin;

      y2 = -ball.radius;
      vy1 *= bounce;

      <span class="hljs-comment">// 将所有东西回转（正向）</span>
      x1 = x2 * cos - y2 * sin;
      y1 = y2 * cos + x2 * sin;
      ball.vx = vx1 * cos - vy1 * sin;
      ball.vy = vy1 * cos + vx1 * sin;
      ball.x = line.x + x1;
      ball.y = line.y + y1;
    }

    ball.draw(context);
    line.draw(context);
  }());
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(6)：坐标旋转探究

## 原文链接
[https://segmentfault.com/a/1190000014113090](https://segmentfault.com/a/1190000014113090)


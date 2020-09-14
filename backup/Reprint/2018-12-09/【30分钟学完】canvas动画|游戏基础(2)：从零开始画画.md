---
title: '【30分钟学完】canvas动画|游戏基础(2)：从零开始画画' 
date: 2018-12-09 2:30:08
hidden: true
slug: 3nabqcdtt2n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>上篇主要是理论的概述，本篇会多些实践，来讲讲canvas的基础用法，并包含一些基础三角函数的应用，推荐没有canvas基础的朋友阅读，熟悉的朋友可以跳过。  <br>本人能力有限，欢迎牛人共同讨论，批评指正。</p>
<h2 id="articleHeader1">一起来画画吧</h2>
<p>canvas的API有很多，如果一一列举30分钟你是绝对看不完的，而且怎么流水账还不如自己去看文档呢（笑），本教程的思路是用实例一步一步从无到有讲解基础用法。  <br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API" rel="nofollow noreferrer" target="_blank">canvas相关文档</a></p>
<h3 id="articleHeader2">准备工作</h3>
<ol>
<li>布置画布：通过添加<code>&lt;canvas&gt;</code>标签，添加canvas元素；</li>
<li>获取画布：通过<code>&lt;canvas&gt;</code>标签的id，获得canvas对象；</li>
<li>获得画笔：通过canvas对象的getContext("2d")方法，获得2D环境。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot; width=&quot;400&quot; height=&quot;400&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"400"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"400"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);</code></pre>
<h3 id="articleHeader3">画个箭头</h3>
<p>首先我们来画个<strong>红边黄底的箭头</strong>，使用面向对象的代码组织方式，全部代码如下。  <br>类名为Arrow。它拥有x轴坐标、y轴坐标、底的颜色color、旋转弧度rotation四个属性。  <br>实例方法是draw()，它需要一个context对象作为参数，就是准备工作里的context，它就相当于是画笔，这里其实是类似依赖注入的过程，将canvas的画笔交给实例的draw()方法，实例用这个画笔去画出箭头，绘画过程见代码注释。特别注意以下几点：</p>
<ul>
<li>beginPath()方法调用后moveTo()和lineTo移动坐标是<strong>相对与beginPath()时画笔的坐标的</strong>，可以理解成画笔自带一个坐标系，它可以旋转和在画布上移动，绘制工作的坐标都是属于这个坐标系的；</li>
<li>beginPath()是绘制设置状态的起始点，它之后代码设置的绘制状态的作用域结束于绘制方法stroke()、fill()或者closePath()；</li>
<li>save()的作用是保存笔的状态，因为一个画布的笔只有一支，会在不同对象中传递，为了不污染后续的画就应该先保存，画完再restore()还原；</li>
<li>
<strong><code>&lt;canvas&gt;</code>本身是透明的</strong>，可以使用CSS给它个背景，例子中普遍使用白色背景。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 箭头类
 * @class Representing a arrow.
 */
/* eslint no-unused-vars: [&quot;error&quot;, { &quot;varsIgnorePattern&quot;: &quot;Arrow&quot; }] */
class Arrow {
  /**
    * Create a arrow.
    */
  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = '#ffff00';
    this.rotation = 0;
  }
  /**
   * Draw the arrow.
   * @param {Object} _context - The canvas context.
   */
  draw(_context) {
    const context = _context;
    // 会先保存画笔状态
    context.save();
    // 移动画笔
    context.translate(this.x, this.y);
    // 旋转画笔
    context.rotate(this.rotation);
    // 设置线条宽度
    context.lineWidth = 2;
    // 设置线条颜色
    context.strokeStyle = '#ff0000';
    // 设置填充颜色
    context.fillStyle = this.color;
    // 开始路径
    context.beginPath();
    // 将笔移动到相对位置
    context.moveTo(-50, -25);
    // 画线到相对位置
    context.lineTo(0, -25);
    context.lineTo(0, -50);
    context.lineTo(50, 0);
    context.lineTo(0, 50);
    context.lineTo(0, 25);
    context.lineTo(-50, 25);
    context.lineTo(-50, -25);
    // 闭合路径
    context.closePath();
    // 填充路径包围区
    context.fill();
    // 绘制路径
    context.stroke();
    // 载入保存的笔信息
    context.restore();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 箭头类
 * @class Representing a arrow.
 */</span>
<span class="hljs-comment">/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Arrow" }] */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Arrow</span> </span>{
  <span class="hljs-comment">/**
    * Create a arrow.
    */</span>
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.x = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.y = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-string">'#ffff00'</span>;
    <span class="hljs-keyword">this</span>.rotation = <span class="hljs-number">0</span>;
  }
  <span class="hljs-comment">/**
   * Draw the arrow.
   * @param {Object} _context - The canvas context.
   */</span>
  draw(_context) {
    <span class="hljs-keyword">const</span> context = _context;
    <span class="hljs-comment">// 会先保存画笔状态</span>
    context.save();
    <span class="hljs-comment">// 移动画笔</span>
    context.translate(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y);
    <span class="hljs-comment">// 旋转画笔</span>
    context.rotate(<span class="hljs-keyword">this</span>.rotation);
    <span class="hljs-comment">// 设置线条宽度</span>
    context.lineWidth = <span class="hljs-number">2</span>;
    <span class="hljs-comment">// 设置线条颜色</span>
    context.strokeStyle = <span class="hljs-string">'#ff0000'</span>;
    <span class="hljs-comment">// 设置填充颜色</span>
    context.fillStyle = <span class="hljs-keyword">this</span>.color;
    <span class="hljs-comment">// 开始路径</span>
    context.beginPath();
    <span class="hljs-comment">// 将笔移动到相对位置</span>
    context.moveTo(<span class="hljs-number">-50</span>, <span class="hljs-number">-25</span>);
    <span class="hljs-comment">// 画线到相对位置</span>
    context.lineTo(<span class="hljs-number">0</span>, <span class="hljs-number">-25</span>);
    context.lineTo(<span class="hljs-number">0</span>, <span class="hljs-number">-50</span>);
    context.lineTo(<span class="hljs-number">50</span>, <span class="hljs-number">0</span>);
    context.lineTo(<span class="hljs-number">0</span>, <span class="hljs-number">50</span>);
    context.lineTo(<span class="hljs-number">0</span>, <span class="hljs-number">25</span>);
    context.lineTo(<span class="hljs-number">-50</span>, <span class="hljs-number">25</span>);
    context.lineTo(<span class="hljs-number">-50</span>, <span class="hljs-number">-25</span>);
    <span class="hljs-comment">// 闭合路径</span>
    context.closePath();
    <span class="hljs-comment">// 填充路径包围区</span>
    context.fill();
    <span class="hljs-comment">// 绘制路径</span>
    context.stroke();
    <span class="hljs-comment">// 载入保存的笔信息</span>
    context.restore();
  }
}</code></pre>
<p>同理我们还可以画点其他的，比如一个圆<a href="https://github.com/nimokuri/H5Learning-animationDemo/blob/master/common/ball.js" rel="nofollow noreferrer" target="_blank">ball.js</a>，稍微多些参数，慢慢理解。  <br>成品的效果可以先看这个（稍微剧透）：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/01-rotate-to-mouse.html" rel="nofollow noreferrer" target="_blank">一个会跟踪鼠标位置的箭头</a></p>
<h3 id="articleHeader4">加入循环动起来</h3>
<p>现在我们已经掌握了画画的基本功，并且可以画箭头<a href="https://github.com/nimokuri/H5Learning-animationDemo/blob/master/common/arrow.js" rel="nofollow noreferrer" target="_blank">arrow.js</a>和圆<a href="https://github.com/nimokuri/H5Learning-animationDemo/blob/master/common/ball.js" rel="nofollow noreferrer" target="_blank">ball.js</a>，然而这样只是静止画，接下来我们需要一个循环，不断的执行擦除和重画的工作才能实现帧动画。<br>下面这段代码的中绘图函数drawFrame被立即执行，并递归调用自身，你将会在大部分例子中看到。  <br>循环原理上一篇已经说明，不再重复。这里要说明的是clearRect()，这个函数接受一个矩形坐标，也就是（x轴坐标，y轴坐标，矩形宽度，矩形高度），用于清除矩形区域内的画。  <br>例子里直接是清除了整个画布，但这不是绝对的，刷不刷新，是局部刷新还是全部刷新，都需要灵活处理。  <br>这里有个不刷新的例子:<a href="https://nimokuri.github.io/H5Learning-animationDemo/part3/01-drawing-app.html" rel="nofollow noreferrer" target="_blank">鼠标画图工具</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function drawFrame() {
  // 类似setTimeout的操作
  window.requestAnimationFrame(drawFrame, canvas);
  // 将画布擦干净
  context.clearRect(0, 0, canvas.width, canvas.height);
  // ...继续你的作画
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 类似setTimeout的操作</span>
  <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
  <span class="hljs-comment">// 将画布擦干净</span>
  context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
  <span class="hljs-comment">// ...继续你的作画</span>
}());</code></pre>
<h3 id="articleHeader5">给它点动力</h3>
<p>现在画面已经是在不断的重绘，但为什么还是静止的呢？因为每一次刷新都没有改变要画的内容。  <br>那我们就给它一个目标吧，这样它才能动起来，比如就让箭头始终指向鼠标。  <br>下面是核心代码，主要目的就是求出每帧arrow的旋转角度，这里使用的工具类mouse会实时返回鼠标的x，y轴坐标，封装原理上一篇已经讲过，根据这鼠标的坐标和arrow的坐标，即可得到鼠标的相对于arrow的距离dx和dy，如下图：  </p>
<p><span class="img-wrap"><img data-src="/img/bV6Lbn?w=1232&amp;h=688" src="https://static.alili.tech/img/bV6Lbn?w=1232&amp;h=688" alt="箭头角度演示" title="箭头角度演示" style="cursor: pointer;"></span></p>
<p>而arrow的旋转角度即可以通过dx和dy使用反正切函数得到，这里需要注意几点：</p>
<ul>
<li>仔细看上面代码中arrow的绘制过程，可知其原点是在中心位置的，所以刚好旋转角度就是画笔的旋转角度；</li>
<li>dx和dy是鼠标相对与arrow的坐标，所以图中把坐标系挪动箭头中心是没毛病的；</li>
<li>用atan2，而不是atan，是因为tan值本来就可能是重复的，比如-1/2和1/(-2)两个都是-0.5，无法区分象限，而atan2就可以区分开。</li>
</ul>
<p>完整实例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/01-rotate-to-mouse.html" rel="nofollow noreferrer" target="_blank">一个会跟踪鼠标位置的箭头</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const mouse = utils.captureMouse(canvas);
  const arrow = new Arrow();

  arrow.x = canvas.width / 2;
  arrow.y = canvas.height / 2;

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    const dx = mouse.x - arrow.x;
    const dy = mouse.y - arrow.y;

    arrow.rotation = Math.atan2(dy, dx);
    arrow.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> mouse = utils.captureMouse(canvas);
  <span class="hljs-keyword">const</span> arrow = <span class="hljs-keyword">new</span> Arrow();

  arrow.x = canvas.width / <span class="hljs-number">2</span>;
  arrow.y = canvas.height / <span class="hljs-number">2</span>;

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
    <span class="hljs-keyword">const</span> dx = mouse.x - arrow.x;
    <span class="hljs-keyword">const</span> dy = mouse.y - arrow.y;

    arrow.rotation = <span class="hljs-built_in">Math</span>.atan2(dy, dx);
    arrow.draw(context);
  }());
};</code></pre>
<h2 id="articleHeader6">三角函数</h2>
<h3 id="articleHeader7">上下运动</h3>
<p>终于顺利过渡到三角函数的话题（笑）。三角函数不止有反正切一个应用，下面再看一个例子。  <br>下面是一个ball在上下运动的核心代码，重点就是ball的y轴坐标改变，就是这句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ball.y = clientY + Math.sin(angle) * range;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ball.y = clientY + <span class="hljs-built_in">Math</span>.sin(angle) * range;</code></pre>
<p>利用Math.sin(angle)的取值范围是-1到1，并且会随着angle增大而反复，使ball在一定范围上下运动。  <br>完整例子：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/03-bobbing-2.html" rel="nofollow noreferrer" target="_blank">一个上下运动的球（可调参数版）</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const ball = new Ball();
  let angle = 0;
  // 运动中心
  const clientY = 200;
  // 范围
  const range = 50;
  // 速度
  const speed = 0.05;

  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    ball.y = clientY + Math.sin(angle) * range;
    angle += speed;
    ball.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> ball = <span class="hljs-keyword">new</span> Ball();
  <span class="hljs-keyword">let</span> angle = <span class="hljs-number">0</span>;
  <span class="hljs-comment">// 运动中心</span>
  <span class="hljs-keyword">const</span> clientY = <span class="hljs-number">200</span>;
  <span class="hljs-comment">// 范围</span>
  <span class="hljs-keyword">const</span> range = <span class="hljs-number">50</span>;
  <span class="hljs-comment">// 速度</span>
  <span class="hljs-keyword">const</span> speed = <span class="hljs-number">0.05</span>;

  ball.x = canvas.width / <span class="hljs-number">2</span>;
  ball.y = canvas.height / <span class="hljs-number">2</span>;

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    ball.y = clientY + <span class="hljs-built_in">Math</span>.sin(angle) * range;
    angle += speed;
    ball.draw(context);
  }());
};</code></pre>
<h3 id="articleHeader8">向前运动</h3>
<p>只是上下运动不过瘾，那就让圆前进吧，其实就是每帧改变x轴的位置。  <br>核心代码如下，相比前面的上下运动，多了x轴的速度，每帧移动一点就形成了波浪前进的效果。  <br>完整实例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/04-wave-1.html" rel="nofollow noreferrer" target="_blank">一个波浪运动的球</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const ball = new Ball();
  let angle = 0;
  const centerY = 200;
  const range = 50;
  const xspeed = 1;
  const yspeed = 0.05;

  ball.x = 0;
  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.x += xspeed;
    ball.y = centerY + Math.sin(angle) * range;
    angle += yspeed;
    ball.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> ball = <span class="hljs-keyword">new</span> Ball();
  <span class="hljs-keyword">let</span> angle = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> centerY = <span class="hljs-number">200</span>;
  <span class="hljs-keyword">const</span> range = <span class="hljs-number">50</span>;
  <span class="hljs-keyword">const</span> xspeed = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">const</span> yspeed = <span class="hljs-number">0.05</span>;

  ball.x = <span class="hljs-number">0</span>;
  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
    ball.x += xspeed;
    ball.y = centerY + <span class="hljs-built_in">Math</span>.sin(angle) * range;
    angle += yspeed;
    ball.draw(context);
  }());
};</code></pre>
<h3 id="articleHeader9">其他示例</h3>
<p>其他的应用就不一一讲解，罗列出来一些：</p>
<ul>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/05-pulse.html" rel="nofollow noreferrer" target="_blank">不断缩放的球</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/06-random.html" rel="nofollow noreferrer" target="_blank">两轴同时改变的圆</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/07-wave-2.html" rel="nofollow noreferrer" target="_blank">绘制波</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/08-circle.html" rel="nofollow noreferrer" target="_blank">一个做圆周运动的圆</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/09-oval.html" rel="nofollow noreferrer" target="_blank">一个做椭圆形运动的圆</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/10-distance.html" rel="nofollow noreferrer" target="_blank">计算两个随机块的距离</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part2/11-mouse-distance.html" rel="nofollow noreferrer" target="_blank">中心点到鼠标的距离</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(2)：从零开始画画

## 原文链接
[https://segmentfault.com/a/1190000013965650](https://segmentfault.com/a/1190000013965650)


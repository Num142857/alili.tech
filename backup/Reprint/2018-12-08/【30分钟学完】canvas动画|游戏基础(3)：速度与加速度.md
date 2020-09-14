---
title: '【30分钟学完】canvas动画|游戏基础(3)：速度与加速度' 
date: 2018-12-08 2:30:31
hidden: true
slug: bfcc9f4zmsp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>上一篇基本已经对canvas打好了基础，本篇主要将引入经典物理概念速度和加速度，探讨他们在编程动画中的应用。  <br>在阅读之前请先自行了解速度和加速度的基础知识，以及向量与向量加法。  <br>本人能力有限，欢迎牛人共同讨论，批评指正。</p>
<h2 id="articleHeader1">速度</h2>
<blockquote>【科普】速度是描述物体运动快慢和方向的物理量。物理学中提到物体的速度通常是指其瞬时速度。速度在国际单位制中的单位是米每秒，国际符号是m/s，中文符号是米/秒。相对论框架中，物体的速度上限是光速。</blockquote>
<p>在动画编程中，速度是最基础的要素，在本系列教程的第2篇讲到三角函数时就有所体现。</p>
<h3 id="articleHeader2">动画编程中的速度</h3>
<p>见下图，我们这里要讨论的计算机动画中的速度跟物理学上概念相似，都是矢量，也就是<strong>既有大小又有方向</strong>，而方向的体现就是其值的正负，回顾系列第1篇中讲到的坐标系，沿着正半轴运动速度就是正，沿着负半轴运动速度就是负。  <br>另外一点不同就是单位，不一定会以时间为单位，可能是<strong>以帧为单位</strong>，比如“像素/帧”。  <br>也正因为速度是矢量，那任何一个速度都可以分解为x轴和y轴上的速度，这就是编程动画基本思想。  </p>
<p><span class="img-wrap"><img data-src="/img/bV6SKX?w=944&amp;h=588" src="https://static.alili.tech/img/bV6SKX?w=944&amp;h=588" alt="速度分解图" title="速度分解图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">实例应用</h3>
<p>将系列第2篇的“一个会跟踪鼠标位置的箭头”改造成“跟随鼠标的箭头”。代码很基础，看注释就行，基本思路：</p>
<ol>
<li>计算目标点与物体的夹角；</li>
<li>依据夹角分解速度到x轴和y轴；</li>
<li>分别将每条轴上的速度与物体的位置坐标相加。</li>
</ol>
<p>特别说明，因为这个例子中的动画循环是基于帧，所以速度单位是<strong>像素每帧</strong>。  <br>完整例子：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/04-follow-mouse.html" rel="nofollow noreferrer" target="_blank">跟随鼠标的箭头</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 跟随鼠标的箭头
 * */
window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const mouse = utils.captureMouse(canvas);
  const arrow = new Arrow();
  // 设定速度
  const speed = 3;

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 计算鼠标与箭头的相对距离
    const dx = mouse.x - arrow.x;
    const dy = mouse.y - arrow.y;
    // 求箭头指向鼠标的夹角
    const angle = Math.atan2(dy, dx);
    // 将速度分解到x轴和y轴
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    // 设置箭头的角度
    arrow.rotation = angle;
    // 将分解后的速度加到箭头的两轴位置上
    arrow.x += vx;
    arrow.y += vy;
    // 重新绘制箭头
    arrow.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 跟随鼠标的箭头
 * */</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> mouse = utils.captureMouse(canvas);
  <span class="hljs-keyword">const</span> arrow = <span class="hljs-keyword">new</span> Arrow();
  <span class="hljs-comment">// 设定速度</span>
  <span class="hljs-keyword">const</span> speed = <span class="hljs-number">3</span>;

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    <span class="hljs-comment">// 计算鼠标与箭头的相对距离</span>
    <span class="hljs-keyword">const</span> dx = mouse.x - arrow.x;
    <span class="hljs-keyword">const</span> dy = mouse.y - arrow.y;
    <span class="hljs-comment">// 求箭头指向鼠标的夹角</span>
    <span class="hljs-keyword">const</span> angle = <span class="hljs-built_in">Math</span>.atan2(dy, dx);
    <span class="hljs-comment">// 将速度分解到x轴和y轴</span>
    <span class="hljs-keyword">const</span> vx = <span class="hljs-built_in">Math</span>.cos(angle) * speed;
    <span class="hljs-keyword">const</span> vy = <span class="hljs-built_in">Math</span>.sin(angle) * speed;
    <span class="hljs-comment">// 设置箭头的角度</span>
    arrow.rotation = angle;
    <span class="hljs-comment">// 将分解后的速度加到箭头的两轴位置上</span>
    arrow.x += vx;
    arrow.y += vy;
    <span class="hljs-comment">// 重新绘制箭头</span>
    arrow.draw(context);
  }());
};</code></pre>
<h2 id="articleHeader4">加速度</h2>
<blockquote>【科普】加速度是物理学中的一个物理量，是一个矢量，主要应用于经典物理当中，一般用字母a表示，在国际单位制中的单位为米每二次方秒。加速度是速度矢量对于时间的变化率，描述速度的方向和大小变化的快慢。</blockquote>
<h3 id="articleHeader5">动画编程中的加速度</h3>
<p>计算机动画中的加速度就是<strong>速度的变化量</strong>，跟前面的速度一样是矢量，也可以分解为x轴和y轴上的加速度，方法同上。单位可以是像素每二次方帧，与“力学”有很大联系。  <br>加速度可以让运动更加自然，在计算机动画中模拟真实运动是必要的基础。  <br>请明确加速度是速度的变化量，也就是加速度的方向与速度相同即加速，方向相反即减速，如果加速度为零，速度将恒定，物体做匀速直线运动。</p>
<h3 id="articleHeader6">实例应用</h3>
<p>继续改造前面的例子<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/04-follow-mouse.html" rel="nofollow noreferrer" target="_blank">跟随鼠标的箭头</a>为“往鼠标方向加速的箭头”。改造量不大，就是把加速度分解后叠加给速度，基本思路：</p>
<ol>
<li>计算目标点与物体的夹角；</li>
<li>将加速度同样分解到x，y轴上；</li>
<li>分别将每条轴上的加速度与速度相加；</li>
<li>再分别将每条轴上的速度与物体的位置坐标相加。</li>
</ol>
<p>完整例子：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/10-follow-mouse-2.html" rel="nofollow noreferrer" target="_blank">往鼠标方向加速的箭头</a>  <br>观察实例，你会发现这个箭头虽然运动比前面例子自然了不少，但却永远都不会停下，这是由于这里的加速度不变的，而现实中由于摩擦力等因素加速度是会被削减的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 往鼠标方向加速的箭头
 * */
window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const mouse = utils.captureMouse(canvas);
  const arrow = new Arrow();
  // 初始化速度
  let vx = 0;
  let vy = 0;
  // 设定加速度
  const force = 0.02;

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 计算鼠标与箭头的相对距离
    const dx = mouse.x - arrow.x;
    const dy = mouse.y - arrow.y;
    // 求箭头指向鼠标的夹角
    const angle = Math.atan2(dy, dx);
    // 将加速度分解到x轴和y轴
    const ax = Math.cos(angle) * force;
    const ay = Math.sin(angle) * force;
    // 设置箭头的角度
    arrow.rotation = angle;
    // 将分解后的加速度加到箭头的两轴速度上
    vx += ax;
    vy += ay;
    // 将分解后的速度加到箭头的两轴位置上
    arrow.x += vx;
    arrow.y += vy;
    // 重新绘制箭头
    arrow.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 往鼠标方向加速的箭头
 * */</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> mouse = utils.captureMouse(canvas);
  <span class="hljs-keyword">const</span> arrow = <span class="hljs-keyword">new</span> Arrow();
  <span class="hljs-comment">// 初始化速度</span>
  <span class="hljs-keyword">let</span> vx = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">let</span> vy = <span class="hljs-number">0</span>;
  <span class="hljs-comment">// 设定加速度</span>
  <span class="hljs-keyword">const</span> force = <span class="hljs-number">0.02</span>;

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    <span class="hljs-comment">// 计算鼠标与箭头的相对距离</span>
    <span class="hljs-keyword">const</span> dx = mouse.x - arrow.x;
    <span class="hljs-keyword">const</span> dy = mouse.y - arrow.y;
    <span class="hljs-comment">// 求箭头指向鼠标的夹角</span>
    <span class="hljs-keyword">const</span> angle = <span class="hljs-built_in">Math</span>.atan2(dy, dx);
    <span class="hljs-comment">// 将加速度分解到x轴和y轴</span>
    <span class="hljs-keyword">const</span> ax = <span class="hljs-built_in">Math</span>.cos(angle) * force;
    <span class="hljs-keyword">const</span> ay = <span class="hljs-built_in">Math</span>.sin(angle) * force;
    <span class="hljs-comment">// 设置箭头的角度</span>
    arrow.rotation = angle;
    <span class="hljs-comment">// 将分解后的加速度加到箭头的两轴速度上</span>
    vx += ax;
    vy += ay;
    <span class="hljs-comment">// 将分解后的速度加到箭头的两轴位置上</span>
    arrow.x += vx;
    arrow.y += vy;
    <span class="hljs-comment">// 重新绘制箭头</span>
    arrow.draw(context);
  }());
};</code></pre>
<h2 id="articleHeader7">比例运动</h2>
<p>这里会介绍两个较高级的常见技术，缓动和弹动。  <br>所谓比例运动，就是运动程度与目标点距离是成正比，简单来说就是“距离越远，运动程度越大”，这里的运动程度是<strong>指但不局限于速度和加速度</strong>的与运动有关的变量。</p>
<h3 id="articleHeader8">缓动</h3>
<p>缓动是指<strong>物体的速度与它到目标点的距离成比例</strong>，即基于距离的比例速度，这个比例会影响速度的大小。  <br>缓动的运动特质不止一种，你可以先快后慢，也可以先慢后快，还可以先慢后快再慢等，我们这里只以最简单的先快后慢为例，即<strong>距离越大，速度越大，距离缩进到0，速度也为0</strong>。  </p>
<p>还是改造前面的<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/04-follow-mouse.html" rel="nofollow noreferrer" target="_blank">跟随鼠标的箭头</a>，代码如下，基本思路：</p>
<ol>
<li>确定一个比例系数，这是一个0~1之间的小数；</li>
<li>确定目标点，并计算相对距离；</li>
<li>计算速度，速度=距离×比例系数；</li>
<li>用当前位置加上速度来计算新的位置；</li>
<li>重复第2~4步，直到物体到达目标点。</li>
</ol>
<p>完整例子：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part7/04-ease-tomouse" rel="nofollow noreferrer" target="_blank">缓动到鼠标位置的箭头</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 往鼠标方向缓动的箭头
 * */
window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const mouse = utils.captureMouse(canvas);
  const arrow = new Arrow();
  // 比例系数
  const easing = 0.05;

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 计算鼠标与箭头的相对距离
    const dx = mouse.x - arrow.x;
    const dy = mouse.y - arrow.y;
    // 求箭头指向鼠标的夹角
    const angle = Math.atan2(dy, dx);
    // 根据距离缓动
    const vx = dx * easing;
    const vy = dy * easing;
    // 设置箭头的角度
    arrow.rotation = angle;
    // 将分解后的速度加到箭头的两轴位置上
    arrow.x += vx;
    arrow.y += vy;
    // 重新绘制箭头
    arrow.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 往鼠标方向缓动的箭头
 * */</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> mouse = utils.captureMouse(canvas);
  <span class="hljs-keyword">const</span> arrow = <span class="hljs-keyword">new</span> Arrow();
  <span class="hljs-comment">// 比例系数</span>
  <span class="hljs-keyword">const</span> easing = <span class="hljs-number">0.05</span>;

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    <span class="hljs-comment">// 计算鼠标与箭头的相对距离</span>
    <span class="hljs-keyword">const</span> dx = mouse.x - arrow.x;
    <span class="hljs-keyword">const</span> dy = mouse.y - arrow.y;
    <span class="hljs-comment">// 求箭头指向鼠标的夹角</span>
    <span class="hljs-keyword">const</span> angle = <span class="hljs-built_in">Math</span>.atan2(dy, dx);
    <span class="hljs-comment">// 根据距离缓动</span>
    <span class="hljs-keyword">const</span> vx = dx * easing;
    <span class="hljs-keyword">const</span> vy = dy * easing;
    <span class="hljs-comment">// 设置箭头的角度</span>
    arrow.rotation = angle;
    <span class="hljs-comment">// 将分解后的速度加到箭头的两轴位置上</span>
    arrow.x += vx;
    arrow.y += vy;
    <span class="hljs-comment">// 重新绘制箭头</span>
    arrow.draw(context);
  }());
};</code></pre>
<h3 id="articleHeader9">弹动</h3>
<p>弹动是指<strong>物体的加速度与它到目标点的距离成比例</strong>，即基于距离的比例加速度，这个比例会影响加速度的大小。  <br>弹动会使运动自然且有灵性，你会发现物体会冲过目标点，然后开始回弹，往复。这样就能模拟出弹簧或橡皮筋的效果。  <br>特别注意，距离为0时加速度也为0，但速度不一定为0。  </p>
<p>还是改造前面的<a href="https://nimokuri.github.io/H5Learning-animationDemo/part4/10-follow-mouse-2.html" rel="nofollow noreferrer" target="_blank">往鼠标方向加速的箭头</a>，代码如下，你会发现这个跟前面的加速度例子很像，都是不断的往复运动，其原因都是加速度和速度很难同时为0导致的，这里我们加了削减系数让它停下来，基本思路：</p>
<ol>
<li>确定一个比例系数，这是一个0~1之间的小数；</li>
<li>确定目标点，并计算相对距离；</li>
<li>计算速度，加速度=距离×比例系数；</li>
<li>用当前速度加上加速度；</li>
<li>用当前位置加上速度来计算新的位置；</li>
<li>重复第2~5步。</li>
</ol>
<p>完整例子：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part7/08-spring-4.html" rel="nofollow noreferrer" target="_blank">往鼠标方向弹动的箭头</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 往鼠标方向弹动的箭头
 * */
window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const mouse = utils.captureMouse(canvas);
  const arrow = new Arrow();
  // 设定弹动系数
  const spring = 0.02;
  // 初始化速度
  let vx = 0;
  let vy = 0;
  // 削减系数
  const friction = 0.95;

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 计算鼠标与箭头的相对距离
    const dx = mouse.x - arrow.x;
    const dy = mouse.y - arrow.y;
    // 求箭头指向鼠标的夹角
    const angle = Math.atan2(dy, dx);
    // 根据距离弹动
    const ax = dx * spring;
    const ay = dy * spring;
    // 设置箭头的角度
    arrow.rotation = angle;
    // 将分解后的加速度加到箭头的两轴速度上
    vx += ax;
    vy += ay;
    // 削减速度
    vx *= friction;
    vy *= friction;
    // 将分解后的速度加到箭头的两轴位置上
    arrow.x += vx;
    arrow.y += vy;
    // 重新绘制箭头
    arrow.draw(context);
  }());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 往鼠标方向弹动的箭头
 * */</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">const</span> mouse = utils.captureMouse(canvas);
  <span class="hljs-keyword">const</span> arrow = <span class="hljs-keyword">new</span> Arrow();
  <span class="hljs-comment">// 设定弹动系数</span>
  <span class="hljs-keyword">const</span> spring = <span class="hljs-number">0.02</span>;
  <span class="hljs-comment">// 初始化速度</span>
  <span class="hljs-keyword">let</span> vx = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">let</span> vy = <span class="hljs-number">0</span>;
  <span class="hljs-comment">// 削减系数</span>
  <span class="hljs-keyword">const</span> friction = <span class="hljs-number">0.95</span>;

  (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

    <span class="hljs-comment">// 计算鼠标与箭头的相对距离</span>
    <span class="hljs-keyword">const</span> dx = mouse.x - arrow.x;
    <span class="hljs-keyword">const</span> dy = mouse.y - arrow.y;
    <span class="hljs-comment">// 求箭头指向鼠标的夹角</span>
    <span class="hljs-keyword">const</span> angle = <span class="hljs-built_in">Math</span>.atan2(dy, dx);
    <span class="hljs-comment">// 根据距离弹动</span>
    <span class="hljs-keyword">const</span> ax = dx * spring;
    <span class="hljs-keyword">const</span> ay = dy * spring;
    <span class="hljs-comment">// 设置箭头的角度</span>
    arrow.rotation = angle;
    <span class="hljs-comment">// 将分解后的加速度加到箭头的两轴速度上</span>
    vx += ax;
    vy += ay;
    <span class="hljs-comment">// 削减速度</span>
    vx *= friction;
    vy *= friction;
    <span class="hljs-comment">// 将分解后的速度加到箭头的两轴位置上</span>
    arrow.x += vx;
    arrow.y += vy;
    <span class="hljs-comment">// 重新绘制箭头</span>
    arrow.draw(context);
  }());
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(3)：速度与加速度

## 原文链接
[https://segmentfault.com/a/1190000013994486](https://segmentfault.com/a/1190000013994486)


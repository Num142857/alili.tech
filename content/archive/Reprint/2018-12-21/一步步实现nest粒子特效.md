---
title: '一步步实现nest粒子特效' 
date: 2018-12-21 2:30:11
hidden: true
slug: l81zwngb0r
categories: [reprint]
---

{{< raw >}}

                    
<p>本文首发于<a href="https://kongchenglc.github.io" rel="nofollow noreferrer" target="_blank">我的博客</a>，<a href="https://github.com/kongchenglc" rel="nofollow noreferrer" target="_blank">这是我的github</a>，欢迎star。  </p>
<p>  这篇博客是模仿<a href="https://github.com/hustcc/canvas-nest.js" rel="nofollow noreferrer" target="_blank">nest.js</a>实现一个<code>demo</code>，由简单到复杂，来一步步的实现它。<a href="https://kongchenglc.github.io/Demo/nest/myNest.html" rel="nofollow noreferrer" target="_blank">这里是效果预览</a>。<a href="https://github.com/kongchenglc" rel="nofollow noreferrer" target="_blank">我的github</a>里边还有很多别的前端的<code>demo</code>，喜欢的话可以点个<code>star</code>，你的支持就是我的动力。</p>
<h2 id="articleHeader0">从一道面试题开始</h2>
<blockquote>实现一个半径<code>10px</code>的小球在<code>500px*500px</code>的方块中做直线运动，初始方向随机，速度保持不变，碰撞到墙壁后反弹。</blockquote>
<p>  <a href="https://kongchenglc.github.io/Demo/bouncing%20ball.html" rel="nofollow noreferrer" target="_blank">看下效果</a>，思路很简单，将小球定位在方块中，设置<code>xy</code>方向上的速度，每帧动画给小球定位的值加上对应方向的速度值，在检测到小球碰撞墙壁的时候，将对应方向的速度置为反方向就可以了。<a href="https://github.com/kongchenglc/Demo/blob/master/bouncing%20ball.html" rel="nofollow noreferrer" target="_blank">这里是实现的代码</a>，没有用到<code>canvas</code>，但是思路一致。</p>
<h2 id="articleHeader1">尝试实现</h2>
<p>  画出一个弹射的小球很简单，那怎么用多个小球实现<a href="https://kongchenglc.github.io/Demo/nest/myNest.html" rel="nofollow noreferrer" target="_blank">nest.js</a>这样的效果呢。这样的特效肯定不能用<code>Dom</code>直接做，太耗费性能，也做不出来，这时就显露出<code>canvas</code>的强大之处了。  <br>  同样的，用<code>canvas</code>生成多个弹来弹去的小球。首先不要管鼠标如何吸附这些小圆点，只做小球之间的连线。在每次绘制小球之前，判断一下它和之前的小球的距离是不是小于极限距离，小于就以它俩为端点绘制一条线。代码如下，思路都写在注释里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const theCanvas = document.getElementById('theCanvas'),
  ctx = theCanvas.getContext('2d'),
  mix = 6000;   //会产生连线的极限距离的平方

//将canvas铺满浏览器
let canvas_width = theCanvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  canvas_height = theCanvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  points = [];
theCanvas.style = &quot;position: fixed; top: 0px; left: 0px;&quot;;

//绘制函数，用requestAnimationFrame调用实现动画
function draw() {
  //清屏
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  let i,pi,x_dist,y_dist;

  //遍历点集合绘制线条
  points.forEach((p, index) => {
    p.x += p.xa,        //按指定速度移动
    p.y += p.ya,
    p.xa *= p.x > canvas_width || p.x < 0 ? -1 : 1,
    p.ya *= p.y > canvas_height || p.y < 0 ? -1 : 1,
    ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);        //绘制点，其实是小方块

    //类似于握手问题，两个点之间只绘制一次线
    for(i = index + 1; i < points.length; i++) {
      pi = points[i];
      x_dist = p.x - pi.x;
      y_dist = p.y - pi.y;
      dist = x_dist * x_dist + y_dist * y_dist;
      //判断点之间的距离是否小于极限距离
      if(dist < mix) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pi.x, pi.y);
        ctx.stroke();
      }
    }
  }),requestAnimationFrame(draw);
}

//随机生成100个点
for(let i = 0; i < 100; i++ ) {

  let    x = Math.random() * canvas_width,    //初始坐标
    y = Math.random() * canvas_height,
    xa = 2 * Math.random() - 1,            //x速度
    ya = 2 * Math.random() - 1;            //y速度

  points[i] = {x, y, xa, ya};
}

draw();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> theCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'theCanvas'</span>),
  ctx = theCanvas.getContext(<span class="hljs-string">'2d'</span>),
  mix = <span class="hljs-number">6000</span>;   <span class="hljs-comment">//会产生连线的极限距离的平方</span>

<span class="hljs-comment">//将canvas铺满浏览器</span>
<span class="hljs-keyword">let</span> canvas_width = theCanvas.width = <span class="hljs-built_in">window</span>.innerWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth,
  canvas_height = theCanvas.height = <span class="hljs-built_in">window</span>.innerHeight || <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight,
  points = [];
theCanvas.style = <span class="hljs-string">"position: fixed; top: 0px; left: 0px;"</span>;

<span class="hljs-comment">//绘制函数，用requestAnimationFrame调用实现动画</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">//清屏</span>
  ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas_width, canvas_height);
  <span class="hljs-keyword">let</span> i,pi,x_dist,y_dist;

  <span class="hljs-comment">//遍历点集合绘制线条</span>
  points.forEach(<span class="hljs-function">(<span class="hljs-params">p, index</span>) =&gt;</span> {
    p.x += p.xa,        <span class="hljs-comment">//按指定速度移动</span>
    p.y += p.ya,
    p.xa *= p.x &gt; canvas_width || p.x &lt; <span class="hljs-number">0</span> ? <span class="hljs-number">-1</span> : <span class="hljs-number">1</span>,
    p.ya *= p.y &gt; canvas_height || p.y &lt; <span class="hljs-number">0</span> ? <span class="hljs-number">-1</span> : <span class="hljs-number">1</span>,
    ctx.fillRect(p.x - <span class="hljs-number">0.5</span>, p.y - <span class="hljs-number">0.5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);        <span class="hljs-comment">//绘制点，其实是小方块</span>

    <span class="hljs-comment">//类似于握手问题，两个点之间只绘制一次线</span>
    <span class="hljs-keyword">for</span>(i = index + <span class="hljs-number">1</span>; i &lt; points.length; i++) {
      pi = points[i];
      x_dist = p.x - pi.x;
      y_dist = p.y - pi.y;
      dist = x_dist * x_dist + y_dist * y_dist;
      <span class="hljs-comment">//判断点之间的距离是否小于极限距离</span>
      <span class="hljs-keyword">if</span>(dist &lt; mix) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pi.x, pi.y);
        ctx.stroke();
      }
    }
  }),requestAnimationFrame(draw);
}

<span class="hljs-comment">//随机生成100个点</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {

  <span class="hljs-keyword">let</span>    x = <span class="hljs-built_in">Math</span>.random() * canvas_width,    <span class="hljs-comment">//初始坐标</span>
    y = <span class="hljs-built_in">Math</span>.random() * canvas_height,
    xa = <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">1</span>,            <span class="hljs-comment">//x速度</span>
    ya = <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">1</span>;            <span class="hljs-comment">//y速度</span>

  points[i] = {x, y, xa, ya};
}

draw();</code></pre>
<p>  看下效果，丑陋，和人家的不一样，很生硬。因为连线不是突然出现突然消失的，点和点之间的连线是渐渐的出现，然后渐渐消失的。给连线添加动态的属性，用点和点的之间的距离来计算连线的粗细、透明度，在两点距离比较远的时候线会变淡，这样看起来就舒服多了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(i = index + 1; i < points.length; i++) {
  pi = points[i];
  x_dist = p.x - pi.x;
  y_dist = p.y - pi.y;
  dist = x_dist * x_dist + y_dist * y_dist;
  //根据两点距离得到一个参数w
  w = (mix - dist) / mix;
  //判断点之间的距离是否小于极限距离
  if(dist < mix) {
    ctx.beginPath();
    //根据参数w设置连线宽度和透明度
    ctx.lineWidth = w / 2;
    ctx.strokeStyle = `rgba(110,110,110,${w + 0.2})`;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(pi.x, pi.y);
    ctx.stroke();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(i = index + <span class="hljs-number">1</span>; i &lt; points.length; i++) {
  pi = points[i];
  x_dist = p.x - pi.x;
  y_dist = p.y - pi.y;
  dist = x_dist * x_dist + y_dist * y_dist;
  <span class="hljs-comment">//根据两点距离得到一个参数w</span>
  w = (mix - dist) / mix;
  <span class="hljs-comment">//判断点之间的距离是否小于极限距离</span>
  <span class="hljs-keyword">if</span>(dist &lt; mix) {
    ctx.beginPath();
    <span class="hljs-comment">//根据参数w设置连线宽度和透明度</span>
    ctx.lineWidth = w / <span class="hljs-number">2</span>;
    ctx.strokeStyle = <span class="hljs-string">`rgba(110,110,110,<span class="hljs-subst">${w + <span class="hljs-number">0.2</span>}</span>)`</span>;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(pi.x, pi.y);
    ctx.stroke();
  }
}</code></pre>
<h2 id="articleHeader2">添加鼠标事件</h2>
<p>  先是加入对鼠标的响应。在鼠标进入浏览器时添加鼠标这个点，否则移除。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onmousemove = e => {
  e = e || window.event;
  current_point.x = e.clientX;
  current_point.y = e.clientY;
};
window.onmouseout = () => {
  current_point.x = null;
  current_point.y = null;
};
//将鼠标的点添加至点集合中
all_points = [...random_points,current_point];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.onmousemove = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  e = e || <span class="hljs-built_in">window</span>.event;
  current_point.x = e.clientX;
  current_point.y = e.clientY;
};
<span class="hljs-built_in">window</span>.onmouseout = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  current_point.x = <span class="hljs-literal">null</span>;
  current_point.y = <span class="hljs-literal">null</span>;
};
<span class="hljs-comment">//将鼠标的点添加至点集合中</span>
all_points = [...random_points,current_point];</code></pre>
<p>  要实现一个鼠标吸附粒子的效果，思路就是粒子和鼠标的距离在一定范围内时，给粒子添加一个向着鼠标的速度，结果就好像是粒子受到鼠标的吸附一样。这是一段鼠标吸附效果的核心代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当两点距离小于极限距离时产生连线，当第二个点是鼠标所产生点时，粒子如果在范围内就会产生向鼠标点的速度，实现吸附效果
dist < pi.max &amp;&amp; (pi === current_point &amp;&amp; dist >= pi.max / 2 &amp;&amp; (p.x -= 0.03 * x_dist, p.y -= 0.03 * y_dist));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//当两点距离小于极限距离时产生连线，当第二个点是鼠标所产生点时，粒子如果在范围内就会产生向鼠标点的速度，实现吸附效果</span>
dist &lt; pi.max &amp;&amp; (pi === current_point &amp;&amp; dist &gt;= pi.max / <span class="hljs-number">2</span> &amp;&amp; (p.x -= <span class="hljs-number">0.03</span> * x_dist, p.y -= <span class="hljs-number">0.03</span> * y_dist));</code></pre>
<p>  加入鼠标的点之后再做一些调整，得到<a href="https://github.com/kongchenglc/Demo/blob/master/nest/myNest.html" rel="nofollow noreferrer" target="_blank">最终的代码</a>。</p>
<h2 id="articleHeader3">其他的粒子特效</h2>
<p>  还可以利用<code>canvas</code>的<code>getImageData</code>属性，将图片粒子化，做成轮播图，<a href="https://kongchenglc.github.io/Demo/particle/index.html" rel="nofollow noreferrer" target="_blank">点击这里预览</a>，主要思路是用<code>getImageData</code>取到图片像素点的信息，每隔一段取一个样本，以这个样本绘制粒子，绘制出类似于马赛克一样的图片，然后给粒子加上运动的效果就可以了，<a href="https://github.com/kongchenglc/Demo/blob/master/particle/index.html" rel="nofollow noreferrer" target="_blank">这里是具体的代码实现</a>。</p>
<blockquote>这篇博客到这就结束了，<a href="https://github.com/kongchenglc" rel="nofollow noreferrer" target="_blank">这是我的github</a>，欢迎来访，欢迎star。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步步实现nest粒子特效

## 原文链接
[https://segmentfault.com/a/1190000012470526](https://segmentfault.com/a/1190000012470526)


---
title: '用SVG和Vanilla JS框架创建一个“星形变心形”的动画效果 | CSS-Tricks' 
date: 2019-01-25 2:30:23
hidden: true
slug: z3urntmbxe
categories: [reprint]
---

{{< raw >}}

            <p><a href="/"></a> </p>
<p># 
用SVG和Vanilla JS框架创建一个“星形变心形”的动画效果</p>
<p>By
<a href="https://css-tricks.com/author/thebabydino/">Ana Tudor</a> 
On</p>
<p>November 6, 2017        </p>
<p><a href="https://css-tricks.com/tag/javascript/">JavaScript</a>, <a href="https://css-tricks.com/tag/svg/">SVG</a>        </p>
<p>在 <a href="https://css-tricks.com/emulating-css-timing-functions-javascript/">我写的这篇文章</a>中, 讲述了如何用vanilla JavaScript使动画顺滑的从一种状态过渡到另一种。最好先看下那篇文章，因为在这篇文章中我们要用到一些那篇文章中讲过的内容。例如例子的演示、各种时间函数的公式、当从结束状态过渡到初始状态时不使时间函数倒转过来。都在那篇文章中做了详细讲解。</p>
<p>在最后的例子中，通过改变绘制嘴形的<code>路径</code>的属性<code>d</code>，我们得到了从悲伤的嘴变高兴的嘴的效果。  </p>
<p>更高水平的控制路径数据能够带给我们更有趣的效果，例如星形变心形。</p>
<p><img src="http://p0.qhimg.com/t014992d07aaf515d85.gif" alt="Gif recording of a star to heart animation. We start with a five-point golden star. All of its tips are rounded and one of them points up. On a first click, the golden star shape morphs into a crimson heart shape and it rotates clockwise by half a circle. On a second clip, the crimson heart shape morphs back into a golden star shape and rotates by another half a circle, completing thus a full turn."></p>
<p>这是我们要实现的星形变心形的动画效果。</p>
<h3>思路</h3>
<p>它们都是由五个<a href="https://codepen.io/thebabydino/pen/EKLNvZ">三次贝塞尔曲线</a>构成。下边的互动演示展示了每条曲线以及这些曲线相连接的点。点击任意曲线或连接点可以看到两个图形的曲线是如何相对应的。</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/NayELo/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>可以看出所有曲线都是由三次贝塞尔曲线创建的。即使其中一些曲线的两个控制点重叠了。</p>
<p>构成星形和心形的形状都是极简且不符合实际的。但它们可以做到。</p>
<h3>初始代码</h3>
<p>从<a href="https://codepen.io/thebabydino/pen/bryQGJ">表情动画的例子</a>中可以看出, 我通常选择用 Pug（译：即jade，一种模版引擎） 生成这类形状。但在这里，由于生成的路径数据还将由JavaScript处理过渡效果。包括计算坐标以及将这些坐标放入属性<code>d</code> 。所以使用JavaScript来做所有的这些是最好的选择。</p>
<p>这意味着我们不必写很多标签：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'shape'</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>

</code></pre><p>JavaScript中，我们首先获得元素 SVG 和元素 <code>path</code> 。<code>path</code> 是那个星形变心形再变回星形的形状。然后，我们给元素 SVG 设置<code>viewBox</code>属性，使得 SVG 沿两个轴的尺寸相等，并且坐标轴的原点<code>(0,0)</code>在 SVG 正中间。这意味着，当<code>viewBox</code>的尺寸值为<code>D</code> 时，它的左上角坐标为<code>(-.5*D,-.5*D)</code>。最后，这个也很重要，就是创建一个对象来存储过渡的初始和最终状态，以及一个将我们想要的值设置给 SVG 图形属性的方法。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> _SVG = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'svg'</span>), 
      _SHAPE = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'shape'</span>), 
      D = <span class="hljs-number">1000</span>, 
      O = { <span class="hljs-attr">ini</span>: {}, <span class="hljs-attr">fin</span>: {}, <span class="hljs-attr">afn</span>: {} };

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
  _SVG.setAttribute(<span class="hljs-string">'viewBox'</span>, [<span class="hljs-number">-.5</span>*D, <span class="hljs-number">-.5</span>*D, D, D].join(<span class="hljs-string">' '</span>));
})();

</code></pre><p>现在我们把这事解决了，可以开始更有趣的部分了！</p>
<h3>图形的几何绘制</h3>
<p>我们用终点和控制点的初始坐标来绘制星形，用它们的最终坐标来绘制心形。 每个坐标的过渡范围是它的初始值与最终值之间的差值。在这个例子中，当星形向心形转换时，我们会转动（rotate）它，因为我们想让星形的角朝上。我们还会改变填充（fill），从金色的星形变成深红色的心形。</p>
<p>那么，我们怎么能获得这两个图形的终点和控制点的坐标呢？</p>
<h4>星形</h4>
<p>在星形的例子中，我们先从一个正五角星形开始。我们的曲线（译：构成星形每个角的曲线）终点落在正五角星形边的交叉点上，我们把正五角星形的顶点作为控制点。</p>
<p><img src="http://s3.qhres.com/static/205a64043f67d411.svg" alt="Illustration showing the five cubic Bézier curves forming our star and the regular pentagram created by the support lines of the segments connecting the end points and the control points of these curves. The two control points for each curve coincide and represent the vertices of a regular pentagram. In a cyclical manner, the start point of any curve is the end point of the previous one and these points are where the pentagram edges cross each other."></p>
<p>五个三次贝塞尔曲线的终点和控制点用黄点标识在了正五角星形的顶点和边的交叉点上 (<a href="https://codepen.io/thebabydino/pen/YrebKb?editors=1000">live</a>).</p>
<p><a href="https://codepen.io/thebabydino/pen/ybVEzP/?editors=1100">直接给定正五角星形外接圆的半径</a>（或者直径）就可以获得五角星形的顶点。也就是我们给 SVG 的<code>viewBox</code> 设定的尺寸（简单起见，在这种情况下我们不考虑高填密）。但是如何获得他们的交叉点呢？</p>
<p>首先，我们先看下边的说明图。注意图中正五角星形中间高亮标注的小五边形。小五边形的顶点与正五角星形边的交叉点是重合的。这个小五边形显然是个正五边形（译：五个边的长度相等）。这个小正五边形的内切圆和内径跟正五角星形的是同一个。</p>
<p><img src="http://s3.qhres.com/static/1b844fe7e0cacc58.svg" alt="Illustration showing a regular pentagram. The five intersection points of its edges are the vertices of a small regular pentagon whose edges are on the same support lines as the edges of the pentagram. Furthermore, the regular pentagram and its inner regular pentagon have the same incircle (and thus the same inradius)."></p>
<p>正五角星形和内部的正五边形的内切圆是同一个 (<a href="https://codepen.io/thebabydino/pen/wrmKxY?editors=1000">live</a>)。</p>
<p>因此，如果我们计算出正五角星形的内径，那么也就获得了正五边形的内径。这个内径和<a href="http://mathworld.wolfram.com/CentralAngle.html">圆心角</a> 一起对应正五边形的边。根据这个我们就可以获得正五边形的<a href="http://mathworld.wolfram.com/Circumcircle.html">外接圆半径</a> 。这样就可以倒推出正五边形顶点的坐标。这些点正是正五角星形边的交叉点，也就是星形五个三次贝塞尔曲线的终点。</p>
<p>我们的正五角星形可以用<a href="https://en.wikipedia.org/wiki/Schl%C3%A4fli_symbol#Regular_polygons_.28plane.29">拓扑符号</a> <code>{5/2}</code>来表示。也就是说，正五角星形有<code>5</code>个顶点。这<code>5</code>个顶点均匀分布在它的外接圆上，间隔是 <code>360°/5 = 72°</code>。我们从第一个点开始，跳过紧挨着的下一个点，连接到紧挨着的第二个点（这就是符号<code>{5/2}</code>中<code>2</code>的含义；<code>1</code> 代表的意思是连接到第一个点，不跳过任何点，构成一个五边形）。照这样一直连接，就可以画出正五角星形了。 </p>
<p>在下边的演示中，点击五边形或者五角星形按钮，查看它们是怎样被绘制的。</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/veRKMd/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>这样，我们得到正五角星形的边所对应的的圆心角是正五边形的边所对应的圆心角的二倍。那么正五边形是<code>1·(360°/5) = 1·72° = 72°</code> （或者<code>1·(2·π/5)</code>弧度），那正五角星形就是<code>2·(360°/5) = 2·72° = 144°</code> （<code>2·(2·π/5)</code>弧度）。通常，一个用拓扑符号表示为<code>{p,q}</code>的正多边形，它的一个边所对应的圆心角就是 <code>q·(360°/p)</code>（<code>q·(2·π/p)</code> 弧度）。</p>
<p><img src="http://s2.qhres.com/static/b8fd0d6e18c907e6.svg" alt="Illustration showing the central angle corresponding to an edge of a regular polygon: pentagram vs. pentagon. This angle is twice as big in the pentagram case as, having five points equally spaced around the circle, edges connect from one of these points to the next in the pentagon case, but always skip the first one right near and connect to the second in the pentagram case. This makes the edges and the corresponding central angles bigger."></p>
<p>正多边形的一条边所对应的圆心角：正五角星形（左，<code>144°</code>）vs 正五边形（右，`72°）(<a href="https://codepen.io/thebabydino/pen/KXeqzy?editors=1000">live</a>)。</p>
<p>已知正五角星形外接圆半径，也就是的<code>viewBox</code>尺寸。那么，已知直角三角形斜边的长（即正五角星形外接圆的半径）和锐角的度数（正五角星形一条边所对应的角度的一半），这意味着我们可以算出正五角星形的内径（这个内径与正五角星形内部的小正五边形的内径相等）。</p>
<p><img src="http://s1.qhres.com/static/3675a5f9c0c7bbac.svg" alt="Illustration highlighting a right triangle from where we can compute a regular pentagram's inradius. The hypotenuse of this triangle is the pentagram circumradius and the acute angle between the two is half the central angle corresponding to the pentagram edge."></p>
<p>通过直角，可以计算出正五角星形的内径长。这个直角的斜边等于正五角星形外接圆半径，其中一个锐角的角度等于正五角星形一条边所对应的角度的一半 (<a href="https://codepen.io/thebabydino/pen/QqBBQg?editors=1000">live</a>)。</p>
<p>圆心角一半的余弦等于五角星形的内径比外接圆半径。就可以得出，五角星形的内径等于外接圆半径乘以这个余弦值。</p>
<p>现在我们得到了正五角星形内部小正五边形的内接圆半径，我们就可以计算出这个正五边形的外接圆半径了。还是通过一个小直角来计算。这个直角的斜边等于正五边形外接圆半径。一个锐角等于正五边形一条边所对应的圆心角的一半。这个锐角的一条边是这个圆心角的中直线，这个中直线是正五边形的外接圆半径。</p>
<p>下边的说明图中高亮标注了一个直角三角形，它是由正五边形的一条外接圆半径、内接圆半径、一个圆心角的一半构成的。如果我们已知内接圆半径和正五边形一条边所对应的圆心角，这个圆心角的一半也就是两条外接圆半径的夹角的话。用这个直角三角形我们可以计算出外接圆半径的长。</p>
<p><img src="http://s4.qhres.com/static/9d8d1052a45549d9.svg" alt="Illustration highlighting a right triangle from where we compute a regular pentagon's circumradius. The hypotenuse of this triangle is the desired circumradius, while the catheti are the pentagon inradius and half the pentagon edge. The acute angle between the two radii is half the central angle corresponding to the pentagon edge."></p>
<p>通过一个直角三角形计算正五边形外接圆的半径 (<a href="https://codepen.io/thebabydino/pen/eGPOOq?editors=1000">live</a>)。</p>
<p>前文提到过，正五边形圆心角的度数与正五角星形的圆心角度数是不相等的。前者是后者的一半 (<code>360°/5 = 72°</code>)。</p>
<p>好，现在我们有了这个半径，就可以得到所有想要的点的坐标了。这些点均匀分布在两个圆上。有<code>5</code>个点在外层的圆上（正五角星形的外接圆），还有<code>5</code>个在内层的圆上（小正五边形的外接圆）。共计<code>10</code>个点，他们所在的半径射线的夹角是 <code>360°/10 = 36°</code>。</p>
<p><img src="http://s3.qhres.com/static/52c68e5f3a1cc62d.svg" alt="Illustration showing the end and control points of the cubic curves making up our rounded tip star being distributed on two circles - the control points on an outer circle which is the circumcircle of the pentagram and the end points on an inner circle which is the circumcircle of the inner pentagon whose vertices are the points where the pentagram edges cross each other."></p>
<p>终点均匀分布在小正五边形的外接圆上，控制点均匀分布在正五角星形的外接圆上 (<a href="https://codepen.io/thebabydino/pen/oGawmm?editors=1000">live</a>)。</p>
<p>已知两个圆的半径。外层圆的半径等于正五角星形外接圆半径，也就是我们定的有点儿随意的<code>viewBox</code> 尺寸的一部分（<code>.5</code>  or <code>.25</code> or<code>.32</code>  or 或者我们认为效果更好地尺寸）。内层圆的半径等于正五角星形内部构成的小正五边形的外接圆半径。计算这个半径的方法是：首先，通过正五角星形的外接圆半径和它的一条边所对应的圆心角计算出正五角星形的内接圆半径。这个内接圆半径与小正五边形的内接圆半径相等；然后，再通过小正五边形一条边所对应的圆心角和它的内接圆半径来计算。</p>
<p>所以，基于这点，我们就能够生成绘制星形的路径的数据了。绘制它所需要的数据，我们都已经有了。</p>
<p>那么让我们来绘制吧！并且把上边的思考过程写成代码。</p>
<p>首先，先创建一个<code>getStarPoints(f)</code> 的函数。参数 (<code>f</code>) 将决定根据 <code>viewBox</code>的尺寸获取的正五角星形外接圆半径是多少。这个函数返回一个由坐标组成的数组，之后我们会给这个数组增加数组项。</p>
<p>在这个函数中，我们首先计算常量：正五角星形外接圆半径（外层圆的半径）、正五角星形一条边所对应的圆心角、正五角星形内部构成的正五边形的一条边所对应的圆心角、正五角星形内部构成的正五边形的一条边所对应的圆心角、正五角星形和内部构成的正五边形共用的内接圆的半径（正五变形的顶点是正五角星形边的交叉点）、内部小正五变形的外接圆半径、需要计算坐标的点的总数、所有点所在的径向线的夹角。</p>
<p>然后，用一个循环来计算我们想要的点的坐标，并将它们插入坐标数组中。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> P = <span class="hljs-number">5</span>; <span class="hljs-comment">/* number of cubic curves/ polygon vertices */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStarPoints</span>(<span class="hljs-params">f = <span class="hljs-number">.5</span></span>) </span>{
  <span class="hljs-keyword">const</span> RCO = f*D <span class="hljs-comment">/* outer (pentagram) circumradius  */</span>, 
        BAS = <span class="hljs-number">2</span>*(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI/P) <span class="hljs-comment">/* base angle for star poly */</span>, 
        BAC = <span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI/P <span class="hljs-comment">/* base angle for convex poly */</span>, 
        RI = RCO*<span class="hljs-built_in">Math</span>.cos(<span class="hljs-number">.5</span>*BAS) <span class="hljs-comment">/*pentagram/ inner pentagon inradius */</span>, 
        RCI = RI/<span class="hljs-built_in">Math</span>.cos(<span class="hljs-number">.5</span>*BAC) <span class="hljs-comment">/* inner pentagon circumradius */</span>, 
        ND = <span class="hljs-number">2</span>*P <span class="hljs-comment">/* total number of distinct points we need to get */</span>, 
        BAD = <span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI/ND <span class="hljs-comment">/* base angle for point distribution */</span>, 
        PTS = [] <span class="hljs-comment">/* array we fill with point coordinates */</span>;

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; ND; i++) {}

  <span class="hljs-keyword">return</span> PTS;
}

</code></pre><p>计算坐标需要的条件：用点所在圆的半径，以及一条半径与水平轴线构成的夹角。如下面的交互式演示所示（拖动点来查看它的笛卡尔坐标如何变化）：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/KNxXZJ/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>在我们的例子里，当前的半径有两个。一个是外圆的半径（正五角星形的外接圆半径<code>RCO</code>），可以帮助算出索引值为偶数的点的的坐标（<code>0</code>, <code>2</code>, ...）。还有一个是内接圆的半径（内部小正五边形的外接圆半径<code>RCI</code>），可以帮助算出索引值为奇数的点的的坐标(<code>1</code>, <code>3</code>, ...)。当前点与圆心点的连线所构成的径向线的夹角等于点的索引值（<code>i</code>）乘以所有点所在的径向线的夹角（<code>BAD</code>，在我们的例子里恰巧是<code>36°</code> 或 <code>π/10</code>）。</p>
<p>因此，循环体里的代码如下：</p>
<pre><code class="hljs routeros"><span class="hljs-keyword">for</span>(let i = 0; i &lt;<span class="hljs-built_in"> ND; </span>i++) {
  let cr = i%2 ? RCI : RCO, 
      ca = i<span class="hljs-number">*BAD</span>, 
      x = Math.round(cr*Math.cos(ca)), 
      y = Math.round(cr*Math.sin(ca));
}

</code></pre><p>由于我们给<code>viewBox</code> 设定的尺寸足够大，所以我们可以放心的给坐标值做四舍五入计算，舍弃小数部分，这样我们的代码看起来会更干净。</p>
<p>我们会把外层圆（索引值是偶数的情况）计算出的坐标值推入坐标数组中两次。因为实际上星形在这个点上有两个重叠的控制点。如果要绘制成心形，就要把这两个重叠的控制点放在别的的位置上。</p>
<pre><code class="hljs gauss"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; ND; i++) {
  <span class="hljs-comment">/* same as before */</span>

  PTS.<span class="hljs-keyword">push</span>([x, y]);
  <span class="hljs-keyword">if</span>(!(i%<span class="hljs-number">2</span>)) PTS.<span class="hljs-keyword">push</span>([x, y]);
}

</code></pre><p>接下来，我们给对象<code>O</code>添加数据。添加一个属性（<code>d</code>）来储存有关路径的数据。设置一个初始值来储存数组，这个数组是由上文提到的函数计算出的点的坐标组成的。我们还创建了一个函数用来生成实际的属性值（这个例子中，曲线的两个终点坐标的差值范围是路径的数据串，浏览器根据这个数据串绘制图形）。最后，我们获得了所有已经保存了数据的属性，并将这些属性的值作为前面提到的函数的返回值：</p>
<pre><code class="hljs scheme">(<span class="hljs-name">function</span> init() {
  /* same as before */

  O.d = {
    ini: getStarPoints(), 
    afn: function(<span class="hljs-name">pts</span>) {
      return pts.reduce((<span class="hljs-name">a</span>, c, i) =&gt; {
        return a + (<span class="hljs-name">i%3</span> ? ' ' : <span class="hljs-symbol">'C</span>') + c
      }, `M${pts[<span class="hljs-name">pts.length</span> - <span class="hljs-number">1</span>]}`)
    }
  }<span class="hljs-comment">;</span>

  for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> p in O) _SHAPE.setAttribute(<span class="hljs-name">p</span>, O[<span class="hljs-name">p</span>].afn(<span class="hljs-name">O</span>[<span class="hljs-name">p</span>].ini))
})()<span class="hljs-comment">;</span>

</code></pre><p>绘制的结果可以在下边的演示中看到：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/YrdwmX/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>这是一个很有前途的星形。但我们想让生成的五角星形第一个尖朝下并且由它生成的星形的第一个尖朝上。目前，他们的指向都偏右了。这是因为我们是从 <code>0°</code>开始的（对应时钟的三点位置）。所以为了能从时钟6点的位置开始，我们给<code>getStarPoints()</code> 函数中的每个角加 <code>90°</code> （<code>π/2</code> 弧度）。</p>
<pre><code class="hljs autohotkey">`c<span class="hljs-literal">a</span> = i*BAD + .<span class="hljs-number">5</span>*Math.PI`

</code></pre><p>这样生成的五角星形和由它生成的星形的第一个角就都朝下了。为了旋转星形，我们需要给它的  <code>transform</code> 属性设置成旋转半个圆的角度。为了到达这个效果，我们首先设置初始的旋转角度为<code>-180</code> 。然后，我们把生成实际属性值的函数设置成这样一个函数。这个函数接收两个参数，一个是函数名字，另一个为参数，函数返回由这两个参数组成的字符串:</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fnStr</span>(<span class="hljs-params">fname, farg</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${fname}</span>(<span class="hljs-subst">${farg}</span>)`</span> };

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">/* same as before */</span>

  O.transform = { <span class="hljs-attr">ini</span>: <span class="hljs-number">-180</span>,  <span class="hljs-attr">afn</span>: <span class="hljs-function">(<span class="hljs-params">ang</span>) =&gt;</span> fnStr(<span class="hljs-string">'rotate'</span>, ang) };

  <span class="hljs-comment">/* same as before */</span>
})();

</code></pre><p>我们用类似的方式给我们的星形填充（<code>fill</code> ）金色。我们给初始值设置一个 RGB 字符串，用同一个函数来给属性（<code>fill</code> ）设置值：</p>
<pre><code class="hljs clojure">(<span class="hljs-name">function</span> init() {
  /* same as before */

  O.fill = { ini: [<span class="hljs-number">255</span>, <span class="hljs-number">215</span>, <span class="hljs-number">0</span>],  afn: (<span class="hljs-name">rgb</span>) =&gt; fnStr(<span class="hljs-name">'rgb'</span>, rgb) }<span class="hljs-comment">;</span>

  /* same as before */
})()<span class="hljs-comment">;</span>

</code></pre><p>现在我们用 SVG 绘制好了一个漂亮的金色星形，它是由五个三次贝塞尔曲线构成的：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/wrRWJN/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<h4>心形</h4>
<p>我们已经绘制好星形了，现在来看下如何绘制心形吧！</p>
<p>我们先从两个半径相等并横向相交的圆开始，这两个圆都是 <code>viewBox</code> 尺寸的一部分（暂时定位<code>.25</code>）。这两个圆相交的方式为：它们中心点相连的线落在 x 轴上，它们相交点相连的线落在 y 轴上。这两条线要相等。</p>
<p><img src="http://s0.qhres.com/static/412808be36f7e629.svg" alt="Illustration showing the helper circles we start with, their radii and the segments connecting their central points and their intersection points."></p>
<p>我们先从两个半径相等的相交的圆开始。这两个圆的圆心落在水平轴上，他们相交的点落在垂直轴上 (<a href="https://codepen.io/thebabydino/pen/aLPYQy?editors=1000">live</a>)。</p>
<p>接着，我们画两条直径，这两条直径穿过靠上的那个交点。在直径与圆的另一个交点处画一条正切线。这两条正切线在 y 轴相交。</p>
<p><img src="http://s4.qhres.com/static/35cc7fafd4ab125d.svg" alt="Illustration showing the helper circles we start with, their passing through their upper intersection point, the tangents at the diametrically opposite points and their intersection."></p>
<p>画两条直径，穿过两个圆相交的点中靠上的那个，并在直径与圆的另一个交点处画正切线，两条正切线在垂直轴相交 (<a href="https://codepen.io/thebabydino/pen/qPLvbq?editors=1000">live</a>)。</p>
<p>两个圆上边的交点和两个直径与圆的另两个交点构成了我们需要的5个点中的3个。另外两个终点则是把外侧的半圆切割成两个相等弧线的中点，这使我们得到4个四分之一圆弧。</p>
<p><img src="http://s4.qhres.com/static/a8bf54d9ae406e7e.svg" alt="Illustration highlighting the end points of the cubic Bézier curves that make up the heart and the coinciding control points of the bottom one of these curves."></p>
<p>高亮显示了构成心形的三次贝塞尔曲线的终点以及靠下的那条曲线的控制点(<a href="https://codepen.io/thebabydino/pen/wrRZBw?editors=1000">live</a>)。</p>
<p>靠下的曲线控制点很明显已经得到了，就是两条切线的交点。但是另外四条曲线的控制点呢？我们怎么能把圆弧变成三次贝塞尔曲线呢？</p>
<p>我们无法得到四分之一圆弧的三次贝塞尔曲线，但我们可以得到一个近似的，在<a href="http://spencermortensen.com/articles/bezier-circle/">这篇文章</a>中有阐述。</p>
<p>这篇文章告诉我们，可以用一个值为<code>R</code> 的半径，和半径的切线（N 和 Q）来绘制四分之一圆弧。两条半径的切线相交于点 P。四边形 ONPQ 的四个角都等于<code>90°</code> (或<code>π/2</code>，其中三个是公理得出的（O 是<code>90°</code> ，两条切线与半径的夹角也是<code>90°</code>），最后一个是计算得出的（内角的合是 <code>360°</code>，其它三个角都是<code>90°</code>， 最后一个角也就是<code>90°</code>了）。这样 ONPQ 就是一个矩形。同时 ONPQ 有两个相邻的边是相等的（OQ 和 ON 的长度都等于半径<code>R</code>），这样它就是一个边长为<code>R</code>的正方形。所以 NP 和 QP 长也等于<code>R</code>。</p>
<p><img src="http://s2.qhres.com/static/15b4b0486e8e6e21.svg" alt="Illustration showing the control points we need to approximate a quarter circle arc with a cubic Bézier curve."></p>
<p>用三次贝塞尔曲线绘制近似四分之一圆弧的弧线 (<a href="https://codepen.io/thebabydino/pen/jGXoWY?editors=1000">live</a>)。</p>
<p>我们用三次贝塞尔曲线绘制的近似四分之一圆弧的弧线的控制点就在切线 NP 和 QP 上，也就是从终点算起<code>C·R</code>的长度，<code>C</code>在之前提到文章中算出的值是<code>.551915</code>。</p>
<p>知道了上边这些，我们可以开始计算三次贝塞尔曲线终点和控制点的坐标了，有了这些坐标，就可以构建我们的心形了。</p>
<p>由于我们选择这种方式构建心形， TO0SO1是一个四边相等（四个边都是由两个圆的半径构成）的 <a href="https://en.wikipedia.org/wiki/Square#Characterizations">正方形</a> ，并且它的对角线也是相等的（这点前文有说过，两个圆心的连线与两个交点的连线相等）。这里，O 是两个对角线的交点，并且 OT 等于对角线 ST 的一半。T 和 S 在 y 轴上，所以他们的 x 坐标为 <code>0</code>。他们的 y 坐标对应 OT 的绝对值，也就是对角线的一半（OS 同理）。</p>
<p><img src="http://s0.qhres.com/static/18a389a742d759e0.svg" alt="Illustration showing how the central points and the intersection points of the two helper circles form a square."></p>
<p>正方形 TO0SO1  (<a href="https://codepen.io/thebabydino/pen/PJVmzG?editors=1000">live</a>)。</p>
<p>我们可以把任意边长为<code>l</code>的正方形切割成两个等腰三角形。这个等腰三角形的直角边与正方形的边重合，斜边与正方形对角线重合。</p>
<p><img src="http://s3.qhres.com/static/af87db672ad89978.svg" alt="Illustration showing how a square can be split into two congruent right isosceles triangles."></p>
<p>任意正方形可以被切割成两个等腰三角形(<a href="https://codepen.io/thebabydino/pen/aLXjrJ?editors=1000">live</a>)。</p>
<p>利用勾股定理：<code>d² = l² + l²</code>，我们可以计算出其中一个直角的斜边（也就是正方形的对角线）。这样根据边长就可以得出正方形对角线的长 <code>d = √(2∙l) = l∙√2</code>（相反，根据对角线的长就可以得出边的长 <code>l = d/√2</code>）。还能计算出对角线的一半<code>d/2 = (l∙√2)/2 = l/√2</code>。</p>
<p>把这个应用到我们的边长为 <code>R</code>的 TO0SO1 正方形上，我们得到 T 点（它的绝对值等于正方形对角线的一半）的 y 坐标是 <code>-R/√2</code> ，同时 S 点的 y 坐标是<code>R/√2</code>。</p>
<p><img src="http://s4.qhres.com/static/41ba367eb91b0c35.svg" alt="Illustration showing the coordinates of the vertices of the TO₀SO₁ square."></p>
<p>TO0SO1 正方形四个顶点的坐标 (<a href="https://codepen.io/thebabydino/pen/qPgJbv?editors=1000">live</a>)。</p>
<p>类似的，O1 点在 x 轴上，所以他们的 y 轴坐标为<code>0</code>，他们的 x 轴坐标是对角线 OO1 的一半：<code>±R/√2</code>。</p>
<p>TO0SO1 是个正方形，那么它的四个角都是<code>90°</code>（<code>π/2</code>圆弧）。</p>
<p><img src="http://s0.qhres.com/static/3b0dd5bd54376325.svg" alt="Illustration showing TAₖBₖS quadrilaterals."></p>
<p>四边形 TA1B1S (<a href="https://codepen.io/thebabydino/pen/qPgwRx?editors=1000">live</a>)。</p>
<p>如上图所示，直线 TB1 是对角线，也就是说圆弧 TB1 是圆形的一半，或者叫做<code>180°</code>弧线。我们用 A1 点将这个弧分割成了相等的两半儿，得到两个相等的 <code>90°</code> 弧线：TA1 和 A1B1 。他们对应两个相等的  <code>90°</code> 角：∠TO1A1 和 ∠A1O1B1 。</p>
<p>根据公理 ∠TO1S 和 ∠TO1A1 都是<code>90°</code>的角，这证明直线 SA1 也是直径。这告诉我们在四边形 TA1B1S 中，对角线 TB1 和 SA1 是垂直且相等的，并且相交于各自的中心点（TO1、O1B1、SO1 和 O1A1 都等于圆形的的半径<code>R</code>）。这说明四边形 TA1B1S 是正方形，且它的对角线等于<code>2∙R</code>。</p>
<p>到这里我们就可以得到四边形 TA1B1S 的边等于<code>2∙R/√2 = R∙√2</code>。由于正方形所有的角都是<code>90°</code> ，并且边 TS 与垂直轴重叠，所以边 TA1 和 SB1 是水平的，且平行于 x 轴。根据他们的长度可以算出 A1 和 B1 两点的 x 轴坐标：<code>±R∙√2</code>。</p>
<p>因为 TA1 和 SB1 是水平的， 所以 A1 和 B1 两点的 y 轴坐标分别等于 T (<code>-R/√2</code>) 和 S (<code>R/√2</code>) 点。</p>
<p><img src="http://s1.qhres.com/static/e2f3c725df229787.svg" alt="Illustration showing the coordinates of the vertices of the TAₖBₖS squares."></p>
<p>正方形 TA1B1S 四个顶点坐标(<a href="https://codepen.io/thebabydino/pen/Oxqbzb?editors=1000">live</a>)。</p>
<p>我们从这里得到的另一个结论是，因为 TA1B1S 是正方形，所以 A1B1 平行于 TS ，因为 TS 在 y (垂直)轴上，所以 A1B1 也是垂直的。此外，因为 x 轴平行于 TA1 和 SB1 ，并且将 TS 平分切为两断，所以 x 轴也将 A1B1 平分切为了两断。</p>
<p>现在让我来看看控制点。</p>
<p>我们先从最下边弧线的重叠的控制点开始。</p>
<p><img src="http://s2.qhres.com/static/2af5519df709e8bb.svg" alt="Illustration showing the TB₀CB₁ quadrilateral."></p>
<p>四边形 TB0CB1 (<a href="https://codepen.io/thebabydino/pen/GMerwx?editors=1000">live</a>).</p>
<p>四边形 TB0CB1 的所有角都等于 <code>90°</code> （因为 TO0SO1 是正方形所以 ∠T 是直角；因为 B1C 是圆的切线，它与半径 O1B1 垂直，并相交于 B1 点， 所以 ∠B1 是直角；因为其他三个都是直角，所以 ∠C 也是直角），所以它是个矩形。同样它有两个相邻的边相等：TB0 和 TB1。这两条线都是圆形的直径，且都等于 <code>2∙R</code>。最后得出结论四边形 TB0CB1 是一个边长为<code>2∙R</code>的正方形。 </p>
<p>然后我们可以得到它的对角线 TC ： <code>2∙R∙√2</code>。因为 C 在 y 轴上，它的 x 轴坐标为 <code>0</code>。它的 y 轴坐标是 OC 的长度。OC 的长度等于 TC 减去 OT：<code>2∙R∙√2 - R/√2 = 4∙R/√2 - R/√2 = 3∙R/√2</code>。</p>
<p><img src="http://s0.qhres.com/static/186d2830bd180a13.svg" alt="Illustration showing the coordinates of the vertices of the TB₀CB₁ square."></p>
<p>正方形 TB0CB1 四个顶点的坐标 (<a href="https://codepen.io/thebabydino/pen/WZmjgZ?editors=1000">live</a>)。</p>
<p>现在我们得到了最下边弧线两个重叠的控制点的坐标为<code>(0,3∙R/√2)</code>。</p>
<p>为了获得其他曲线控制点的坐标，我们在他们的终点上画切线，并且获得这些切线的交叉点 D1 和 E1 。
<img src="http://s0.qhres.com/static/332cf5eca8d86ebc.svg" alt="Illustration showing the TOₖAₖDₖ and AₖOₖBₖEₖ quadrilaterals."></p>
<p>四边形 TO1A1D1 和 A1O1B1E1 (<a href="https://codepen.io/thebabydino/pen/XeGVdj?editors=1000">live</a>)。</p>
<p>在四边形 TO1A1D1 中，已知所有角都是直角（<code>90°</code> ），其中三个是公理得出的（∠D1TO1 和 ∠D1A1O1 是由半径和切线获得的；∠TO1A1 是对应四分之一弧 TA1 的角），那么第四个角通过计算就得出也是直角。这证明 TO1A1D1 是矩形。又因为它有两个相邻的边相等（O1T 和 O1A1 等于半径 <code>R</code>），所以 TO1A1D1 是正方形。</p>
<p>这说明对角线 TA1 和 O1D1 等于 <code>R∙√2</code>。已知 TA1 是水平的，又正方形两个对角线是垂直的，就证明 O1D1 是垂直的。那么点 O1 和 D1 的 x 轴坐标相等，O1 的 x 轴坐标是<code>±R/√2</code>。因为我们知道 O1D1 的长，所以我们可以算出 y 轴坐标：如前文提到的那样用对角线的长（ <code>R∙√2</code>）做减法。</p>
<p>四边形 A1O1B1E1 的情况类似。已知所有角都是直角（<code>90°</code>），其中三个是公理得出的（∠E1A1O1 和 ∠E1B1O1 是由半径和切线获得的；∠A1O1B1 是对应四分之一弧 A1B1 的角），那么第四个角通过计算就得出也是直角。这证明 A1O1B1E1 是矩形。又因为它有两个相邻的边相等（O1A1 和 O1B1 等于半径<code>R</code>），所以 A1O1B1E1 是正方形。</p>
<p>至此，我们得到对角线 A1B1 和 O1E1 的长为<code>R∙√2</code>。我们知道 A1B1 是垂直的，并且被水平轴切割成相等的两半儿，也就是 O1E1 在水平轴上，点 E1 的 y 轴坐标为<code>0</code>。因为点 O1 的 x 轴坐标为<code>±R/√2</code>，并且 O1E1 等于<code>R∙√2</code>，我们就可以计算出点 E1 的 x 轴坐标为：<code>±3∙R/√2</code>。</p>
<p><img src="http://s2.qhres.com/static/a0a20e9bba9f88f9.svg" alt="Illustration showing the coordinates of the newly computed vertices of the TOₖAₖDₖ and AₖOₖBₖEₖ squares."></p>
<p>四边形 TO1A1D1 和 A1O1B1E1 的顶点坐标。(<a href="https://codepen.io/thebabydino/pen/xXorRQ?editors=1000">live</a>)。</p>
<p>但是这些切线的交叉点并不是控制点，所以我们需要用近似圆弧形的方法来计算。我们想要的控制点在 TD1、A1D1、A1E1 和 B1E1 上，距离弧线终点（T、A1、B1）大约<code>55%</code>（这个值来源于前文提到的那篇文章中算出的常量<code>C</code>的值）的位置。也就是说从终点到控制点的距离是<code>C∙R</code>。</p>
<p>在这种情况下，我们的控制点坐标为：终点（T、A1 和 B1）坐标的<code>1 - C</code>，加上，切线交点(D1 和 E1)坐标的 <code>C</code> 。</p>
<p>让我们把这些写入JavaScript代码吧！</p>
<p>跟星形的例子一样，我们先从函数<code>getStarPoints(f)</code> 开始。根据这个函数的参数 (<code>f</code>) ，我们可以从<code>viewBox</code> 的尺寸中获得辅助圆的半径。这个函数同样会返回一个坐标构成的数组，以便我们后边插入数组项。</p>
<p>在函数中，我们先声明常量。1、辅助圆的半径。2、边与这个辅助圆半径相等的小正方形对角线的一半。对角线的一半也是这些正方形外接圆半径。3、三次贝塞尔曲线终点的坐标值（点T、A1、B1），沿水平轴的绝对值。然后我们把注意力放在切线交点的坐标上（ 点 C、D1、E1 ）。这些点或者与控制点（C）重合，或者可以帮助我们获得控制点（例如点 D1 和 E1）。</p>
<pre><code class="hljs nix">function getHeartPoints(<span class="hljs-attr">f</span> = .<span class="hljs-number">25</span>) {
  const <span class="hljs-attr">R</span> = f*D <span class="hljs-comment">/* helper circle radius  */</span>, 
        <span class="hljs-attr">RC</span> = Math.round(R/Math.SQRT2) <span class="hljs-comment">/* circumradius of square of edge R */</span>, 
        <span class="hljs-attr">XT</span> = <span class="hljs-number">0</span>, <span class="hljs-attr">YT</span> = -RC <span class="hljs-comment">/* coords of point T */</span>, 
        <span class="hljs-attr">XA</span> = <span class="hljs-number">2</span>*RC, <span class="hljs-attr">YA</span> = -RC <span class="hljs-comment">/* coords of A points (x in abs value) */</span>, 
        <span class="hljs-attr">XB</span> = <span class="hljs-number">2</span>*RC, <span class="hljs-attr">YB</span> = RC <span class="hljs-comment">/* coords of B points (x in abs value) */</span>, 
        <span class="hljs-attr">XC</span> = <span class="hljs-number">0</span>, <span class="hljs-attr">YC</span> = <span class="hljs-number">3</span>*RC <span class="hljs-comment">/* coords of point C */</span>, 
        <span class="hljs-attr">XD</span> = RC, <span class="hljs-attr">YD</span> = -<span class="hljs-number">2</span>*RC <span class="hljs-comment">/* coords of D points (x in abs value) */</span>, 
        <span class="hljs-attr">XE</span> = <span class="hljs-number">3</span>*RC, <span class="hljs-attr">YE</span> = <span class="hljs-number">0</span> <span class="hljs-comment">/* coords of E points (x in abs value) */</span>;
}

</code></pre><p>点击下边交互演示上的点，可以展示这些点的坐标：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/bYGrjR/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>现在我们可以通过终点和切线交点来获得控制点：</p>
<pre><code class="hljs applescript">function getHeartPoints(f = <span class="hljs-number">.25</span>) {
  /* same <span class="hljs-keyword">as</span> <span class="hljs-keyword">before</span> */
  const /* const <span class="hljs-keyword">for</span> cubic curve approx <span class="hljs-keyword">of</span> quarter circle */
        C = <span class="hljs-number">.551915</span>, 
        CC = <span class="hljs-number">1</span> - C, 
        /* coords <span class="hljs-keyword">of</span> ctrl points <span class="hljs-keyword">on</span> TD segs */
        XTD = Math.<span class="hljs-built_in">round</span>(CC*XT + C*XD), YTD = Math.<span class="hljs-built_in">round</span>(CC*YT + C*YD), 
        /* coords <span class="hljs-keyword">of</span> ctrl points <span class="hljs-keyword">on</span> AD segs */
        XAD = Math.<span class="hljs-built_in">round</span>(CC*XA + C*XD), YAD = Math.<span class="hljs-built_in">round</span>(CC*YA + C*YD), 
        /* coords <span class="hljs-keyword">of</span> ctrl points <span class="hljs-keyword">on</span> AE segs */
        XAE = Math.<span class="hljs-built_in">round</span>(CC*XA + C*XE), YAE = Math.<span class="hljs-built_in">round</span>(CC*YA + C*YE), 
        /* coords <span class="hljs-keyword">of</span> ctrl points <span class="hljs-keyword">on</span> BE segs */
        XBE = Math.<span class="hljs-built_in">round</span>(CC*XB + C*XE), YBE = Math.<span class="hljs-built_in">round</span>(CC*YB + C*YE);

  /* same <span class="hljs-keyword">as</span> <span class="hljs-keyword">before</span> */
}

</code></pre><p>下一步，我们要把相关的坐标合成一个数组，并将这个数组返回。在星形的例子中，我们是从最下边的弧形开始的，然后按照顺时针方向绘制，所以在这里我们用同样的方法。每个曲线，我们为控制点放入两组坐标，为终点放入一组坐标。</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/WXeVRO/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>请注意，第一个曲线（最下边的那个），他的两个控制点重叠了，所以我们把相同的坐标组合推入两次。代码看起来也许并不像绘制星形时那样整洁好看，但可以满足我们的需求：</p>
<pre><code class="hljs inform7">return <span class="hljs-comment">[
  <span class="hljs-comment">[XC, YC]</span>, <span class="hljs-comment">[XC, YC]</span>, <span class="hljs-comment">[-XB, YB]</span>, 
  <span class="hljs-comment">[-XBE, YBE]</span>, <span class="hljs-comment">[-XAE, YAE]</span>, <span class="hljs-comment">[-XA, YA]</span>, 
  <span class="hljs-comment">[-XAD, YAD]</span>, <span class="hljs-comment">[-XTD, YTD]</span>, <span class="hljs-comment">[XT, YT]</span>, 
  <span class="hljs-comment">[XTD, YTD]</span>, <span class="hljs-comment">[XAD, YAD]</span>, <span class="hljs-comment">[XA, YA]</span>, 
  <span class="hljs-comment">[XAE, YAE]</span>, <span class="hljs-comment">[XBE, YBE]</span>, <span class="hljs-comment">[XB, YB]</span>
]</span>;

</code></pre><p>现在我们可以把星形的最终状态设置成函数<code>getHeartPoints()</code>，没有旋转，没有填充（ <code>fill</code>）深红色。然后把当前状态设置成最终状态，以便能看到心形：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fnStr</span>(<span class="hljs-params">fname, farg</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${fname}</span>(<span class="hljs-subst">${farg}</span>)`</span> };

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{  
  _SVG.setAttribute(<span class="hljs-string">'viewBox'</span>, [<span class="hljs-number">-.5</span>*D, <span class="hljs-number">-.5</span>*D, D, D].join(<span class="hljs-string">' '</span>));

  O.d = {
    <span class="hljs-attr">ini</span>: getStarPoints(), 
    <span class="hljs-attr">fin</span>: getHeartPoints(), 
    <span class="hljs-attr">afn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">pts</span>) </span>{
      <span class="hljs-keyword">return</span> pts.reduce(<span class="hljs-function">(<span class="hljs-params">a, c, i</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> a + (i%<span class="hljs-number">3</span> ? <span class="hljs-string">' '</span> : <span class="hljs-string">'C'</span>) + c
      }, <span class="hljs-string">`M<span class="hljs-subst">${pts[pts.length - <span class="hljs-number">1</span>]}</span>`</span>)
    }
  };

  O.transform = {
    <span class="hljs-attr">ini</span>: <span class="hljs-number">-180</span>, 
    <span class="hljs-attr">fin</span>: <span class="hljs-number">0</span>, 
    <span class="hljs-attr">afn</span>: <span class="hljs-function">(<span class="hljs-params">ang</span>) =&gt;</span> fnStr(<span class="hljs-string">'rotate'</span>, ang)
  };

  O.fill = {
    <span class="hljs-attr">ini</span>: [<span class="hljs-number">255</span>, <span class="hljs-number">215</span>, <span class="hljs-number">0</span>], 
    <span class="hljs-attr">fin</span>: [<span class="hljs-number">220</span>, <span class="hljs-number">20</span>, <span class="hljs-number">60</span>], 
    <span class="hljs-attr">afn</span>: <span class="hljs-function">(<span class="hljs-params">rgb</span>) =&gt;</span> fnStr(<span class="hljs-string">'rgb'</span>, rgb)
  };

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> p <span class="hljs-keyword">in</span> O) _SHAPE.setAttribute(p, O[p].afn(O[p].fin))
})();

</code></pre><p>这个心形看上去很不错：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/veqbrV/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<h3>确保两个图形是对齐的</h3>
<p>如果我们不给图形填充（ <code>fill</code>）颜色、不旋转（<code>transform</code>）图形，只是看他们的骨架（`stro</p>
<p>e`）叠在一起。就会发现它们并没有对齐：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/PJrLMp/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>解决这个问题最简单的方法就是利用辅助圆的半径把心形向上移动一些：</p>
<pre><code class="hljs coffeescript">`<span class="javascript"><span class="hljs-keyword">return</span> [ <span class="hljs-comment">/* same coords */</span> ].map(<span class="hljs-function">(<span class="hljs-params">[x, y]</span>) =&gt;</span> [x, y - <span class="hljs-number">.09</span>*R])</span>`

</code></pre><p>现在我们已经对齐了，忽略我们是如何调整这两个例子的<code>f</code>参数的。这个参数在星形中决定了五角星形外接圆半径与<code>viewBox</code>尺寸的对应关系（默认值是 <code>.5</code>），在心形中决定了辅助圆的半径与<code>viewBox</code>尺寸的对应关系（默认值是 <code>.25</code>）。</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/eGqaxd/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<h3>在两个图形中切换</h3>
<p>当点击的时候，我们希望能从一种图形转换成另一种。为了做到这个，我们设置一个<code>dir</code>变量，当我们从星形变成心形时，它的值是<code>1</code>。当我们从心形转换成星形时，它的值是<code>-1</code>。初始值是<code>-1</code>，已达到刚刚从心形转换成星形的效果。</p>
<p>然后我们在元素<code>_SHAPE</code>上添加一个<code>'click'</code>事件监听，监听的函数内容为：改变变量<code>dir</code>的值、改变图形的属性。这样就可以获得从一个金色星形转换成深红色心形，再变回星形的效果：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">let</span> dir = <span class="hljs-number">-1</span>;

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">/* same as before */</span>

  _SHAPE.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    dir *= <span class="hljs-number">-1</span>;

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> p <span class="hljs-keyword">in</span> O)
      _SHAPE.setAttribute(p, O[p].afn(O[p][dir &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'fin'</span> : <span class="hljs-string">'ini'</span>]));
  }, <span class="hljs-literal">false</span>);
})();

</code></pre><p>现在我们可以通过点击图形在两种图形中转换了：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/wPwKMw/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<h3>在两个图形中转变</h3>
<p>我们最终想要的并不是两个图形间唐突的切换，而是柔和的渐变效果。所以我们用以前的文章说明的插值技术来实现。</p>
<p>首先我们要决定转变动画的总帧数（<code>NF</code>），然后选择一种我们想要的时间函数：从星形到心形的的路径（<code>path</code>）转变我们选择<code>ease-in-out</code>函数，旋转角度的转变我们选择 <code>bounce-ini-fin</code> 函数，填充（<code>fill</code>）颜色转变我们选择<code>ease-out</code> 函数。我们先只做这些，如果之后我们改变注意了想探索其它的选项，也可以添加。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">/* same as before */</span>
<span class="hljs-keyword">const</span> NF = <span class="hljs-number">50</span>, 
      TFN = {
        <span class="hljs-string">'ease-out'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k</span>) </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> - <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">1</span> - k, <span class="hljs-number">1.675</span>)
        }, 
        <span class="hljs-string">'ease-in-out'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k</span>) </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-number">.5</span>*(<span class="hljs-built_in">Math</span>.sin((k - <span class="hljs-number">.5</span>)*<span class="hljs-built_in">Math</span>.PI) + <span class="hljs-number">1</span>)
        },
        <span class="hljs-string">'bounce-ini-fin'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k, s = <span class="hljs-number">-.65</span>*Math.PI, e = -s</span>) </span>{
          <span class="hljs-keyword">return</span> (<span class="hljs-built_in">Math</span>.sin(k*(e - s) + s) - <span class="hljs-built_in">Math</span>.sin(s))/(<span class="hljs-built_in">Math</span>.sin(e) - <span class="hljs-built_in">Math</span>.sin(s))
        }
      };

</code></pre><p>然后我们为每种属性指定转换时使用的时间函数。</p>
<pre><code class="hljs sml">(function init<span class="hljs-literal">()</span> {  
  /* same <span class="hljs-keyword">as</span> before */

  <span class="hljs-type">O</span>.d = {
    /* same <span class="hljs-keyword">as</span> before */
    tfn: <span class="hljs-symbol">'ease</span>-<span class="hljs-keyword">in</span>-out'
  };

  <span class="hljs-type">O</span>.transform = {
    /* same <span class="hljs-keyword">as</span> before */
    tfn: <span class="hljs-symbol">'bounce</span>-ini-fin'
  };

  <span class="hljs-type">O</span>.fill = {
    /* same <span class="hljs-keyword">as</span> before */
    tfn: <span class="hljs-symbol">'ease</span>-out'
  };

  /* same <span class="hljs-keyword">as</span> before */
})<span class="hljs-literal">()</span>;

</code></pre><p>我们继续添加请求变量 ID（<code>rID</code>）、当前帧变量 （<code>cf</code>） 、点击时第一个被调用并在每次显示刷新的时候都会被调用的函数<code>update()</code> 、当过渡结束时被调用的函数<code>stopAni()</code>，这个函数用来退出循环动画。在 <code>update()</code>函数里我们更新当前帧 <code>cf</code>，计算进程变量 <code>k</code>，判断过渡是否结束，是退出循环动画还是继续动画。</p>
<p>我们还会添加一个乘数变量 <code>m</code> ，用于防止我们从最终状态（心形）返归到最初状态（星形）时倒转时间函数。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> rID = <span class="hljs-literal">null</span>, cf = <span class="hljs-number">0</span>, m;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stopAni</span>(<span class="hljs-params"></span>) </span>{
  cancelAnimationFrame(rID);
  rID = <span class="hljs-literal">null</span>;  
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params"></span>) </span>{
  cf += dir;

  <span class="hljs-keyword">let</span> k = cf/NF;

  <span class="hljs-keyword">if</span>(!(cf%NF)) {
    stopAni();
    <span class="hljs-keyword">return</span>
  }

  rID = requestAnimationFrame(update)
};

</code></pre><p>然后我们需要改变点击时所做的事情：</p>
<pre><code class="hljs lisp">addEventListener('click', e =&gt; {
  if(<span class="hljs-name">rID</span>) stopAni()<span class="hljs-comment">;</span>
  dir *= -1;
  m = .5*(<span class="hljs-number">1</span> - dir)<span class="hljs-comment">;</span>
  update()<span class="hljs-comment">;</span>
}, false)<span class="hljs-comment">;</span>

</code></pre><p>在 <code>update()</code>函数中，我们需要设置当过渡到中间值（取决于进程变量<code>k</code>）时的属性。如同前边的文章中所述，最好是在开始时计算出最终值和初始值之间的差值范围，甚至是在设置监听之前就设置好，所以我们的下一步是：创建一个计算数字间差值范围的函数。无论在这种情况下，还是在数组中，无论数组的嵌套有多深，都可以这个函数来设置我们想要转变的属性的范围值。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">range</span>(<span class="hljs-params">ini, fin</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> ini == <span class="hljs-string">'number'</span> ? 
         fin - ini : 
         ini.map(<span class="hljs-function">(<span class="hljs-params">c, i</span>) =&gt;</span> range(ini[i], fin[i]))
};

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">/* same as before */</span>

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> p <span class="hljs-keyword">in</span> O) {
    O[p].rng = range(O[p].ini, O[p].fin);
    _SHAPE.setAttribute(p, O[p].afn(O[p].ini));
  }

  <span class="hljs-comment">/* same as before */</span>
})();

</code></pre><p>现在只剩下 update() 函数中有关插值的部分了。使用一个循环，我们会遍历所有我们想要从一个状态顺滑转换到另一个状态的属性。在这个循环中，我们先得到插值函数的运算结果，然后将这些属性设置成这个值。插值函数的运算结果取决于初始值（s）、当前属性（<code>ini</code>和 <code>rng</code>）的范围（s）、我们使用的定时函数（<code>tfn</code>） 和进度（<code>k</code>）：</p>
<pre><code class="hljs swift">function update() {  
  <span class="hljs-comment">/* same as before */</span>

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> p <span class="hljs-keyword">in</span> <span class="hljs-type">O</span>) {
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">c</span> = <span class="hljs-type">O</span>[p];

    _SHAPE.setAttribute(p, <span class="hljs-built_in">c</span>.afn(int(<span class="hljs-built_in">c</span>.ini, <span class="hljs-built_in">c</span>.rng, <span class="hljs-type">TFN</span>[<span class="hljs-built_in">c</span>.tfn], k)));
  }

  <span class="hljs-comment">/* same as before */</span>
};

</code></pre><p>最后一步是编写这个插值函数。这跟获得范围值的那个函数非常相似：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">int</span>(<span class="hljs-params">ini, rng, tfn, k</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> ini == <span class="hljs-string">'number'</span> ? 
         <span class="hljs-built_in">Math</span>.round(ini + (m + dir*tfn(m + dir*k))*rng) : 
         ini.map(<span class="hljs-function">(<span class="hljs-params">c, i</span>) =&gt;</span> int(ini[i], rng[i], tfn, k))
};

</code></pre><p>最后获得了一个形状，当点击它时可以从星形过渡转换成心形，第二次点击的时候会变回星形！</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/LOPpBM/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p>这几乎就是我们想要的了：但还有一个小问题。对于像角度值这样的循环值，我们并不想在第二次点击的时候将他调转。相反，我们希望他继续顺着同一个方向旋转。通过两次点击后，正好能旋转一周，回到起点。</p>
<p>我们通过给代码添加一个可选的属性，稍稍调整更新函数和插值函数：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">int</span>(<span class="hljs-params">ini, rng, tfn, k, cnt</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> ini == <span class="hljs-string">'number'</span> ? 
         <span class="hljs-built_in">Math</span>.round(ini + cnt*(m + dir*tfn(m + dir*k))*rng) : 
         ini.map(<span class="hljs-function">(<span class="hljs-params">c, i</span>) =&gt;</span> int(ini[i], rng[i], tfn, k, cnt))
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">/* same as before */</span>

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> p <span class="hljs-keyword">in</span> O) {
    <span class="hljs-keyword">let</span> c = O[p];

    _SHAPE.setAttribute(p, c.afn(int(c.ini, c.rng, TFN[c.tfn], k, c.cnt ? dir : <span class="hljs-number">1</span>)));
  }

  <span class="hljs-comment">/* same as before */</span>
};

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">/* same as before */</span>

  O.transform = {
    <span class="hljs-attr">ini</span>: <span class="hljs-number">-180</span>, 
    <span class="hljs-attr">fin</span>: <span class="hljs-number">0</span>, 
    <span class="hljs-attr">afn</span>: <span class="hljs-function">(<span class="hljs-params">ang</span>) =&gt;</span> fnStr(<span class="hljs-string">'rotate'</span>, ang),
    <span class="hljs-attr">tfn</span>: <span class="hljs-string">'bounce-ini-fin'</span>,
    <span class="hljs-attr">cnt</span>: <span class="hljs-number">1</span>
  };

  <span class="hljs-comment">/* same as before */</span>
})();

</code></pre><p>现在我们得到了我们想要的最终结果：一个从金色星形变成深红色心形的形状，每次从一个状态到另一个状态顺时针旋转半圈：</p>
<p>See the <a href="http://codepen.io/thebabydino/pen/LpqEmJ/">Pen</a> by thebabydino (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用SVG和Vanilla JS框架创建一个“星形变心形”的动画效果 | CSS-Tricks

## 原文链接
[https://www.zcfy.cc/article/creating-a-star-to-heart-animation-with-svg-and-vanilla-javascript-css-tricks](https://www.zcfy.cc/article/creating-a-star-to-heart-animation-with-svg-and-vanilla-javascript-css-tricks)


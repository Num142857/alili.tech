---
title: 'Canvas getContext("3d")?' 
date: 2019-01-17 2:30:25
hidden: true
slug: xlsn8i67q6o
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>不好意思，标题其实是开了个玩笑。大家都知道，Canvas 获取绘画上下文的 api 是 getContext("2d")。我第一次看到这个 api 定义的时候，就很自然的认为，既然有 2d 那一定是有 3d 的咯？ 但是我接着我看到了 api 介绍的这句话</p>
<blockquote><p>提示：在未来，如果 canvas 标签扩展到支持 3D 绘图，getContext() 方法可能允许传递一个 "3d" 字符串参数。</p></blockquote>
<p>what? 我有一句妈卖批不知当讲不当讲... 从接触 canvas 之后我就一直等这个未来，等到后来我学习 three.js... 再等到现在，这个 getContext("3d") 还是没有出来。可能是因为越来越多浏览器都已经支持 webGL 的原因把，这个 getContext("3d") 有可能再也不会来了。</p>
<p><span class="img-wrap"><img data-src="/img/bVLnYx?w=1261&amp;h=454" src="https://static.alili.tech/img/bVLnYx?w=1261&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>webGL 就是浏览器端的 3D 绘图标准，它直接借助系统显卡来渲染 3D 场景，它能制作的 3D 应用，是普通 canvas 无法相比的。所以，你有复杂的 3D 前端项目，且不考虑 IE 的兼容性的话。不用说，直接使用 webGL 吧。</p>
<h2 id="articleHeader1">不使用 webGL 制作简单的 3D 效果</h2>
<p>然而，有的时候我们只需要实现简单的 3D 效果。在没有学习 webGL 或这方面的框架的情况下，我们其实也可以在普通的 canvas api 基础上制作出来。而且，我们可以兼容 IE 9。先来看看，我们都能做些什么效果。</p>
<p><a href="https://www.meizu.com/products/pro6/summary.html" rel="nofollow noreferrer" target="_blank">https://www.meizu.com/products/pro6/summary.html</a><br><span class="img-wrap"><img data-src="/img/bVLnY0?w=1004&amp;h=497" src="https://static.alili.tech/img/bVLnY0?w=1004&amp;h=497" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://www.meizu.com/products/pro6/performance.html" rel="nofollow noreferrer" target="_blank">https://www.meizu.com/products/pro6/performance.html</a><br><span class="img-wrap"><img data-src="/img/bVLnYV?w=1003&amp;h=440" src="https://static.alili.tech/img/bVLnYV?w=1003&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这的两个效果都是工作时简单的 3D 效果需求，没有必要使用 webGL。然而当时我并没有使用今天介绍的办法，因为没有扩展到 3D 坐标去实现所以只能很繁琐的转换成 2D 平面图形分析出来。</p>
<p><span class="img-wrap"><img data-src="/img/bVLnZc?w=1004&amp;h=497" src="https://static.alili.tech/img/bVLnZc?w=1004&amp;h=497" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><br></p>
<p><span class="img-wrap"><img data-src="/img/bVLnZe?w=1003&amp;h=440" src="https://static.alili.tech/img/bVLnZe?w=1003&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果当时能使用今天介绍方法，将可以很简单、在很短时间就能实现。</p>
<h2 id="articleHeader2">素描知识的启发</h2>
<p>因为平时以前在学校的时候学习过素描，现在平常也会简单画一点，所以对素描知识我有一点点了解。画画描绘真实世界的三维场景，需要用到透视。这里我当然不介绍太多，简单来说就是我们理解的近大远小，可以用简单的线条连接表示出来。两条平行的直线在无穷远的地方看起来会汇集到一起，而汇集的点，在透视里称作消失点。通过找到这个消失点，还有平行线，就可以画出简单的立体感觉的图像。</p>
<p><span class="img-wrap"><img data-src="/img/bVLnZQ?w=433&amp;h=384" src="https://static.alili.tech/img/bVLnZQ?w=433&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>观察上面这幅图，在这里所画的三维空间，所有的直线都是垂直与画面的，也就是所，如果用坐标描述每条直线上的任一点 v(x,y,z) 他们的 x,y 都是相等的。在画面上，离我们眼睛观察点越远的点，就越趋向与眼睛观察点的 x,y 。 那三维空间的坐标 v(x,y,z)，对应到平面的坐标 p(x',y') 其中这个 x,y 会随着 z 的变化，是不是会呈现一定的规律对应到 x', y' 呢？</p>
<h2 id="articleHeader3">回忆中学物理课</h2>
<p>我想起了中学学习过的一节物理课。小孔成像</p>
<p><span class="img-wrap"><img data-src="/img/bVLnZS?w=450&amp;h=255" src="https://static.alili.tech/img/bVLnZS?w=450&amp;h=255" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>三维空间的火焰，透过小孔，在二维成像屏上显示了二维的画面。那时候老师教我们，这其实最简单的照相机，和我们眼睛一样，光透过瞳孔，最终到达视网膜，在转换成我们看到的影像。照相机模拟我们的眼睛，所以拍出来的照片和我们眼睛看到的感觉是一样的。</p>
<p>我们试着把刚才的实验转换到简单的几何坐标中看。</p>
<p><span class="img-wrap"><img data-src="/img/bVLnZZ?w=1944&amp;h=992" src="https://static.alili.tech/img/bVLnZZ?w=1944&amp;h=992" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>观察 yz (x=0) 截面，假设小孔为坐标原点 (0,0,0) 成像屏到小孔的距离为 d，图中火焰上的一个点 a(0,y,z) 投射到成像屏对应点 a2，可以求的 a2 在成像屏中的平面坐标：x2 = 0, y2 = y * (d/z)。我天，这么简单就找到了这个对应关系？ 先别急，为了方便开发，我们还需要做一点小转换。</p>
<h2 id="articleHeader4">像 CSS 3D 一样表示坐标</h2>
<p>在 CSS 3D transform 中，我们需要定义 perspective 属性，用来说明观察点到屏幕的距离。如果一个点的 z 轴是 0， 那这个点是处于二维点一样的位置。z 轴越小（远离屏幕），对应到屏幕上的显示的点 xy 就越趋向于定义 perspective 属性容器的中心，也就是观察点、眼睛对应到屏幕的 xy。我们的目标就是用这种 CSS 3D 的方式表示三维的坐标（z = 0 的时候三维坐标的 xy 是和屏幕坐标的 xy 一样的），然后再套用我们找到的公式，计算出对应到屏幕中的二维坐标是多少，然后我们就可以用三维坐标描述点的位置，真正在 canvas 绘画的时候呢，通过简单的转换，用计算出来的二维坐标绘画。</p>
<p><span class="img-wrap"><img data-src="/img/bVLnZ3?w=2092&amp;h=934" src="https://static.alili.tech/img/bVLnZ3?w=2092&amp;h=934" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上一步求的 a2 对应的平面坐标是倒立的（成像屏的火焰也是倒过来的），我们可以想想在小孔与成像屏前方等距的位置放置显示屏，我们像 CSS 3D 一样，让坐标系原点就是显示屏的中点。而小孔，就成了我们的观察点，既眼睛所在的位置，眼睛离显示屏的距离就是 p(perspective)。由全等三角形的知识可以知道，上图中 a2' 刚好是 a2 正过来的坐标。咦，看来屏幕坐标完全可以简化三维坐标点和眼睛的连线与屏幕的交点。这样，一个三维空间的点坐标对应到屏幕坐标的关系就找出来了。</p>
<h2 id="articleHeader5">将这个关系用一个缩放值表示</h2>
<p>既然已经描述出来这个关系了，我们再用把它表示成简单的公式。以便直接在代码中完成三维坐标到平面坐标的转换。</p>
<p><span class="img-wrap"><img data-src="/img/bVLn0a?w=1994&amp;h=870" src="https://static.alili.tech/img/bVLn0a?w=1994&amp;h=870" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>已知观察者到屏幕的距离 p (perspective), 三维空间一个点的坐标 a(x,y,z)，求这个点在屏幕上的坐标。 图中，三维坐标 a 在坐标 xy 平面上的向量长度 d 和该点对应到屏幕上的点 a2' 在 xy 平面上的向量长度 d'，根据相似三角形，有这样的关系：</p>
<p>d'/d = p/(p+z)</p>
<p>x 和 y 的值同理：</p>
<p>x'/x = p/(p+z)   y'/y = p/(p+z)</p>
<p>原来，三维空间的点坐标的 x 和 y 对应到屏幕平面上是关于 z 和 p 成比例变化的这个比例值就是</p>
<p>scale = p/(p+z)</p>
<p>这个 scale 随着物体到屏幕的距离的值的变大而变小。这也很好地解释了为什么我们看东西会近大远小的原因：</p>
<p><span class="img-wrap"><img data-src="/img/bVLn0m?w=2310&amp;h=1076" src="https://static.alili.tech/img/bVLn0m?w=2310&amp;h=1076" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">缩放值的使用实例</h2>
<p>假设我们的眼睛看的就是屏幕中央，我们现在在 y = cvs.height + 5 的 xz 平面上一个正方形区域画一系列的变长为 5 的矩形点。如果不做处理，那么可以想到我们直接使用些点的 x, y 坐标画的点，肯定在画布上是看不到的，因为范围超出了画布。而真实的世界里，我们是可以看到远处的点的，远处的点是趋向与屏幕中央的。</p>
<h4>代码 1：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// 根据 perspective 和 z 获取三维坐标对应二维坐标的xy缩放值
function getScaleByZ(z, p=600) {
    let scale; 
    if (z > p) {
        scale = Infinity;
    } else {
        scale = p / (-z + p);
    }
    return scale;
}

function draw() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    
    let rectWidth = 5;
    points.forEach((point)=>{
        let scale = getScaleByZ(point.z);
        let drawX = center.x + (point.x -  center.x) * scale;
        let drawY = center.y + (point.y -  center.y) * scale;
        let drawWidth = rectWidth * scale

        ctx.fillStyle = '#abcdef';
        ctx.fillRect(drawX, drawY, drawWidth, drawWidth);
    });
}


let center = new Point(cvs.width/2, cvs.height/2, 0);
let points = [];
let xCount = 20; // x 方向的点数
let zCount = 20; // z 方向的点数
let step = cvs.width / xCount; // x 方向点之间的间隔

for (let i = -(xCount - 1) / 2; i <= (xCount - 1) / 2; i++) {
    for (let j = -(zCount - 1) / 2; j <= (zCount - 1) / 2; j++) {

        let x = i;
        let z = j;
        let y = 0;

        console.log(x,y,z);

        points.push(
            new Point((x + xCount/2) * step, cvs.height + 1, z * step)
        );
    }
}

draw();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> cvs = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">let</span> ctx = cvs.getContext(<span class="hljs-string">'2d'</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
    <span class="hljs-keyword">constructor</span>(x, y, z) {
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
        <span class="hljs-keyword">this</span>.z = z;
    }
}

<span class="hljs-comment">// 根据 perspective 和 z 获取三维坐标对应二维坐标的xy缩放值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScaleByZ</span>(<span class="hljs-params">z, p=<span class="hljs-number">600</span></span>) </span>{
    <span class="hljs-keyword">let</span> scale; 
    <span class="hljs-keyword">if</span> (z &gt; p) {
        scale = <span class="hljs-literal">Infinity</span>;
    } <span class="hljs-keyword">else</span> {
        scale = p / (-z + p);
    }
    <span class="hljs-keyword">return</span> scale;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    ctx.clearRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,cvs.width,cvs.height);
    
    <span class="hljs-keyword">let</span> rectWidth = <span class="hljs-number">5</span>;
    points.forEach(<span class="hljs-function">(<span class="hljs-params">point</span>)=&gt;</span>{
        <span class="hljs-keyword">let</span> scale = getScaleByZ(point.z);
        <span class="hljs-keyword">let</span> drawX = center.x + (point.x -  center.x) * scale;
        <span class="hljs-keyword">let</span> drawY = center.y + (point.y -  center.y) * scale;
        <span class="hljs-keyword">let</span> drawWidth = rectWidth * scale

        ctx.fillStyle = <span class="hljs-string">'#abcdef'</span>;
        ctx.fillRect(drawX, drawY, drawWidth, drawWidth);
    });
}


<span class="hljs-keyword">let</span> center = <span class="hljs-keyword">new</span> Point(cvs.width/<span class="hljs-number">2</span>, cvs.height/<span class="hljs-number">2</span>, <span class="hljs-number">0</span>);
<span class="hljs-keyword">let</span> points = [];
<span class="hljs-keyword">let</span> xCount = <span class="hljs-number">20</span>; <span class="hljs-comment">// x 方向的点数</span>
<span class="hljs-keyword">let</span> zCount = <span class="hljs-number">20</span>; <span class="hljs-comment">// z 方向的点数</span>
<span class="hljs-keyword">let</span> step = cvs.width / xCount; <span class="hljs-comment">// x 方向点之间的间隔</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = -(xCount - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>; i &lt;= (xCount - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>; i++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = -(zCount - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>; j &lt;= (zCount - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>; j++) {

        <span class="hljs-keyword">let</span> x = i;
        <span class="hljs-keyword">let</span> z = j;
        <span class="hljs-keyword">let</span> y = <span class="hljs-number">0</span>;

        <span class="hljs-built_in">console</span>.log(x,y,z);

        points.push(
            <span class="hljs-keyword">new</span> Point((x + xCount/<span class="hljs-number">2</span>) * step, cvs.height + <span class="hljs-number">1</span>, z * step)
        );
    }
}

draw();</code></pre>
<h4>效果 1：</h4>
<p><span class="img-wrap"><img data-src="/img/bVLn0o?w=1004&amp;h=507" src="https://static.alili.tech/img/bVLn0o?w=1004&amp;h=507" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在 draw 方法里，我把三维的坐标转换成了屏幕坐标。并且，边长也根据缩放值重新计算了，远处的点，边长越小。代码最终运行的结果是我们可以看到远处的点，还是有 3D 的感觉的，不过不是很明显。我们改变生成点的逻辑，这一次，我们生成一个球面上的点。</p>
<h4>代码 2：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let center = new Point(cvs.width/2, cvs.height/2, 0);
let points = [];
let circlePointCount = 30;
let angelStep = Math.PI * 2 / circlePointCount;
let radius = 10;
let step = 40;

for (let i = -radius; i <= radius; i++) {
    let y = i;

    for (let j = 0; j < circlePointCount; j++) {

        let xzRadius = Math.sqrt(radius * radius - y * y);
        let xzAngel = j * angelStep;
        let x = xzRadius * Math.cos(xzAngel);
        let z = xzRadius * Math.sin(xzAngel);

        // console.log(x,y,z);

        points.push(
            new Point(
                x * step + cvs.width/2, 
                y * step + cvs.height/2, 
                z * step - cvs.width/2
            )
        );
    }
}
draw();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> center = <span class="hljs-keyword">new</span> Point(cvs.width/<span class="hljs-number">2</span>, cvs.height/<span class="hljs-number">2</span>, <span class="hljs-number">0</span>);
<span class="hljs-keyword">let</span> points = [];
<span class="hljs-keyword">let</span> circlePointCount = <span class="hljs-number">30</span>;
<span class="hljs-keyword">let</span> angelStep = <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span> / circlePointCount;
<span class="hljs-keyword">let</span> radius = <span class="hljs-number">10</span>;
<span class="hljs-keyword">let</span> step = <span class="hljs-number">40</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = -radius; i &lt;= radius; i++) {
    <span class="hljs-keyword">let</span> y = i;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; circlePointCount; j++) {

        <span class="hljs-keyword">let</span> xzRadius = <span class="hljs-built_in">Math</span>.sqrt(radius * radius - y * y);
        <span class="hljs-keyword">let</span> xzAngel = j * angelStep;
        <span class="hljs-keyword">let</span> x = xzRadius * <span class="hljs-built_in">Math</span>.cos(xzAngel);
        <span class="hljs-keyword">let</span> z = xzRadius * <span class="hljs-built_in">Math</span>.sin(xzAngel);

        <span class="hljs-comment">// console.log(x,y,z);</span>

        points.push(
            <span class="hljs-keyword">new</span> Point(
                x * step + cvs.width/<span class="hljs-number">2</span>, 
                y * step + cvs.height/<span class="hljs-number">2</span>, 
                z * step - cvs.width/<span class="hljs-number">2</span>
            )
        );
    }
}
draw();</code></pre>
<h4>效果 2</h4>
<p><span class="img-wrap"><img data-src="/img/bVLn0r?w=990&amp;h=491" src="https://static.alili.tech/img/bVLn0r?w=990&amp;h=491" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>或者，再直接让它旋转起来。</p>
<h4>代码 3</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function update(angelOffset) {
    points = [];
    for (let i = -radius; i <= radius; i++) {
        let y = i;

        for (let j = 0; j < circlePointCount; j++) {

            let xzRadius = Math.sqrt(radius * radius - y * y);
            let xzAngel = j * angelStep + angelOffset;
            let x = xzRadius * Math.cos(xzAngel);
            let z = xzRadius * Math.sin(xzAngel);

            // console.log(x,y,z);
            points.push(
                new Point(
                    x * step + cvs.width/2, 
                    y * step + cvs.height/2, 
                    z * step - cvs.width/2
                )
            );
        }
    }
}

(function() {
    let angelOffset = 0;
    function tick() {
        update(angelOffset += 0.006);
        draw();
        window.requestAnimationFrame(tick);
    }
    tick();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params">angelOffset</span>) </span>{
    points = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = -radius; i &lt;= radius; i++) {
        <span class="hljs-keyword">let</span> y = i;

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; circlePointCount; j++) {

            <span class="hljs-keyword">let</span> xzRadius = <span class="hljs-built_in">Math</span>.sqrt(radius * radius - y * y);
            <span class="hljs-keyword">let</span> xzAngel = j * angelStep + angelOffset;
            <span class="hljs-keyword">let</span> x = xzRadius * <span class="hljs-built_in">Math</span>.cos(xzAngel);
            <span class="hljs-keyword">let</span> z = xzRadius * <span class="hljs-built_in">Math</span>.sin(xzAngel);

            <span class="hljs-comment">// console.log(x,y,z);</span>
            points.push(
                <span class="hljs-keyword">new</span> Point(
                    x * step + cvs.width/<span class="hljs-number">2</span>, 
                    y * step + cvs.height/<span class="hljs-number">2</span>, 
                    z * step - cvs.width/<span class="hljs-number">2</span>
                )
            );
        }
    }
}

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> angelOffset = <span class="hljs-number">0</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>) </span>{
        update(angelOffset += <span class="hljs-number">0.006</span>);
        draw();
        <span class="hljs-built_in">window</span>.requestAnimationFrame(tick);
    }
    tick();
})();</code></pre>
<h4>效果 3</h4>
<p><span class="img-wrap"><img data-src="/img/bVLqub?w=800&amp;h=402" src="https://static.alili.tech/img/bVLqub?w=800&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">F3.js</h2>
<p>因为学过 three.js，three.js 有丰富的三维向量计算 api。我从源码里提取了这些计算向量的 api 再结合这篇文章里总结的转换方法计算二维的坐标写了一个专门在 canvas(2d) 上绘制三维场景的组件，因为是并非真的是调用3D api，所以我取名字叫 F3.js (fake3D) </p>
<p><a href="https://github.com/gnauhca/f3.js" rel="nofollow noreferrer" target="_blank">https://github.com/gnauhca/f3.js</a></p>
<h4>使用 F3.js 制作的简单的 Demo：</h4>
<p><span class="img-wrap"><img data-src="/img/bVLn0L?w=743&amp;h=404" src="https://static.alili.tech/img/bVLn0L?w=743&amp;h=404" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Canvas getContext("3d")?

## 原文链接
[https://segmentfault.com/a/1190000008871433](https://segmentfault.com/a/1190000008871433)


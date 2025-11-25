---
title: '用canvas绘制一个曲线动画——深入理解贝塞尔曲线' 
date: 2018-12-19 2:30:07
hidden: true
slug: gutdaylyer
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>我的github博客地址 <a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在前端开发中，贝赛尔曲线无处不在：</p>
<ul>
<li>它可以用来绘制曲线，在svg和canvas中，原生提供的曲线绘制都是使用贝赛尔曲线</li>
<li>它也可以用来描述一个缓动算法，设置css的<code>transition-timing-function</code>属性，可以使用贝塞尔曲线来描述过渡的缓动计算</li>
<li>几乎所有前端2D或3D图形图表库(echarts，d3，three.js)都会使用到贝塞尔曲线</li>
</ul>
<p>这篇文章我准备从实现一个非常简单的曲线动画效果入手，帮助大家彻底地弄懂什么是贝塞尔曲线，以及它有哪些特性，文章中有一点点数学公式，但是都非常简单:)。</p>
<p><span class="img-wrap"><img data-src="/img/bV014F?w=305&amp;h=269" src="https://static.alili.tech/img/bV014F?w=305&amp;h=269" alt="34359508-9b656938-ea93-11e7-9caf-db0464af2db0.gif" title="34359508-9b656938-ea93-11e7-9caf-db0464af2db0.gif" style="cursor: pointer; display: inline;"></span>实现这样一个曲线动画</p>
<p>可以点击这里查看<a href="https://hujiulong.github.io/blog/demo/bezier/" rel="nofollow noreferrer" target="_blank">在线演示</a></p>
<p>在写代码之前，先了解一下什么是贝塞尔曲线吧。</p>
<h2 id="articleHeader1">贝塞尔曲线</h2>
<p>贝塞尔曲线（Bezier curve）是计算机图形学中相当重要的参数曲线，它通过一个方程来描述一条曲线，根据方程的最高阶数，又分为线性贝赛尔曲线，二次贝塞尔曲线、三次贝塞尔曲线和更高阶的贝塞尔曲线。</p>
<p>下面详细介绍一下用得比较多的二次贝塞尔曲线和三次贝塞尔曲线</p>
<h3 id="articleHeader2">二次贝塞尔曲线</h3>
<p>二次贝塞尔曲线由三个点<code>P0</code>,<code>P1</code>,<code>P2</code>来确定，这些点也被称作控制点。曲线的方程为：</p>
<p><span class="img-wrap"><img data-src="/img/bV1o1x?w=386&amp;h=21" src="https://static.alili.tech/img/bV1o1x?w=386&amp;h=21" alt="" title="" style="cursor: pointer;"></span></p>
<p>这个方程其实有它的几何意义，它表示可以通过这样的步骤来绘制一条曲线：</p>
<ul>
<li>选定一个<code>0-1</code>的<code>t</code>值</li>
<li>通过<code>P0</code>和<code>P1</code>计算出点<code>Q0</code>，<code>Q0</code>在<code>P0</code> <code>P1</code>连成的直线上，并且<code>length( P0, Q0 ) = length( P0, P1 ) * t</code>
</li>
<li>同样，通过<code>P1</code>和<code>P2</code>计算出<code>Q1</code>，使得<code>length( P1, Q1 ) = length( P1, P2 ) * t</code>
</li>
<li>再重复一次这个步骤，通过<code>Q1</code>和<code>Q2</code>计算出<code>B</code>，使得<code>length( Q0, Q1 ) = length( Q0, B ) * t</code>。<code>B</code>就为当前曲线上的点</li>
</ul>
<p>注：上面的<code>length</code>表示两点之间的长度</p>
<p><span class="img-wrap"><img data-src="/img/bVCxS8?w=240&amp;h=100" src="https://static.alili.tech/img/bVCxS8?w=240&amp;h=100" alt="1608e25792da9c97?w=240&amp;h=100&amp;f=png&amp;s=5429" title="1608e25792da9c97?w=240&amp;h=100&amp;f=png&amp;s=5429" style="cursor: pointer; display: inline;"></span>图：二次贝塞尔曲线结构</p>
<p>有了曲线方程，我们直接代入具体的<code>t</code>值就能算出点<code>B</code>了。</p>
<p>如果将<code>t</code>的值从<code>0</code>过渡到<code>1</code>，不断计算点<code>B</code>，就可以得到一条二次贝塞尔曲线：</p>
<p><span class="img-wrap"><img data-src="/img/bVCxS9?w=240&amp;h=100" src="https://static.alili.tech/img/bVCxS9?w=240&amp;h=100" alt="1608e1929786355b?w=240&amp;h=100&amp;f=gif&amp;s=74274" title="1608e1929786355b?w=240&amp;h=100&amp;f=gif&amp;s=74274" style="cursor: pointer; display: inline;"></span>图：二次贝塞尔线绘制过程</p>
<p>在canvas中，绘制二次贝塞尔曲线的方法为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.quadraticCurveTo( p1x, p1y, p2x, p2y )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ctx.quadraticCurveTo( p1x, p1y, p2x, p2y )</code></pre>
<p>其中<code>p1x, p1y, p2x, p2y</code>为后两个控制点（<code>P1</code>和<code>P2</code>）的横纵坐标，它默认将当前路径的起点作为一个控制点（<code>P0</code>）。</p>
<h3 id="articleHeader3">三次贝塞尔曲线</h3>
<p>三次贝塞尔曲线需要四个点<code>P0</code>,<code>P1</code>,<code>P2</code>,<code>P3</code>来确定，曲线方程为</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012670053?w=542&amp;h=21" src="https://static.alili.tech/img/remote/1460000012670053?w=542&amp;h=21" alt="" title="" style="cursor: pointer;"></span></p>
<p>它的计算过程和二次贝塞尔曲线类似，这里不再赘述，可以看下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVCxTa?w=240&amp;h=100" src="https://static.alili.tech/img/bVCxTa?w=240&amp;h=100" alt="1608e3077df20e7b?w=240&amp;h=100&amp;f=png&amp;s=7942" title="1608e3077df20e7b?w=240&amp;h=100&amp;f=png&amp;s=7942" style="cursor: pointer;"></span>图：三次贝塞尔曲线结构</p>
<p>同样，将<code>t</code>的值从<code>0</code>过渡到<code>1</code>，就可以绘制出一条三次贝塞尔曲线：</p>
<p><span class="img-wrap"><img data-src="/img/bVCxTb?w=240&amp;h=100" src="https://static.alili.tech/img/bVCxTb?w=240&amp;h=100" alt="1608e2ba9c18d8d6?w=240&amp;h=100&amp;f=gif&amp;s=109773" title="1608e2ba9c18d8d6?w=240&amp;h=100&amp;f=gif&amp;s=109773" style="cursor: pointer;"></span>图：三次贝塞尔曲线绘制过程</p>
<p>在canvas中，绘制三次贝塞尔曲线的方法为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.bezierCurveTo( p1x, p1y, p2x, p2y, p3x, p3y )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ctx.bezierCurveTo( p1x, p1y, p2x, p2y, p3x, p3y )</code></pre>
<p>其中<code>p1x, p1y, p2x, p2y, p3x, p3y</code>为后三个控制点（<code>P1</code>,<code>P2</code>和<code>P3</code>）的横纵坐标，它默认将当前路径的起点作为一个控制点（<code>P0</code>）。</p>
<h3 id="articleHeader4">贝塞尔曲线的特征</h3>
<p>在三次贝塞尔曲线后面，还有更高阶的贝塞尔曲线，同样它们绘制的过程也更加复杂</p>
<h4>四次贝塞尔曲线</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012670056?w=240&amp;h=100" src="https://static.alili.tech/img/remote/1460000012670056?w=240&amp;h=100" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>图：四次贝塞尔曲线</p>
<h4>五次贝塞尔曲线</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012600209?w=240&amp;h=192" src="https://static.alili.tech/img/remote/1460000012600209?w=240&amp;h=192" alt="1608e389f3e76e8d" title="1608e389f3e76e8d" style="cursor: pointer; display: inline;"></span>图：五次贝塞尔曲线</p>
<p>我们可以归纳出贝塞尔曲线有几个重要的特征：</p>
<ol>
<li>n阶贝塞尔曲线需要n+1个点来确定</li>
<li>贝塞尔曲线是平滑的</li>
<li>贝塞尔曲线的起点和终点与对应控制点的连线相切</li>
</ol>
<h2 id="articleHeader5">绘制贝塞尔曲线</h2>
<p>复习完基础概念，接下来就要讲如果绘制贝塞尔曲线啦</p>
<p>为简单起见，<strong>我们选择使用二次贝塞尔曲线</strong>。</p>
<p>我们先不考虑动画的事，我们先将问题简化成：给定一个起点和一个终点，需要实现一个函数，它能够绘制出一条曲线。</p>
<p>也就是说我们需要实现一个函数<code>drawCurvePath</code>，除渲染上下文ctx外（不清楚ctx是什么的同学可以先熟悉下canvas的基本概念），它接受三个参数，分别为二次贝塞尔曲线的三个控制点。我们将样式控制移到函数外，<code>drawCurvePath</code>只用来绘制路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制二次贝赛尔曲线路径
 * @param  {Object} ctx
 * @param  {Array<number>} p0
 * @param  {Array<number>} p1
 * @param  {Array<number>} p2
 */
function drawCurvePath( ctx, p0, p1, p2 ) {
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制二次贝赛尔曲线路径
 * @param  {Object} ctx
 * @param  {Array&lt;number&gt;} p0
 * @param  {Array&lt;number&gt;} p1
 * @param  {Array&lt;number&gt;} p2
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, p0, p1, p2 </span>) </span>{
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>前文提到过，在canvas中，绘制二次贝赛尔曲线的方法是<code>quadraticCurveTo</code>，所以只要短短两行就能完成这个方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制二次贝赛尔曲线路径
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {Array<number>} p0
 * @param  {Array<number>} p1
 * @param  {Array<number>} p2
 */
function drawCurvePath( ctx, p0, p1, p2 ) {
    ctx.moveTo( p0[ 0 ], p0[ 1 ] );
    ctx.quadraticCurveTo( 
        p1[ 0 ], p1[ 1 ],
        p2[ 0 ], p2[ 1 ]
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制二次贝赛尔曲线路径
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {Array&lt;number&gt;} p0
 * @param  {Array&lt;number&gt;} p1
 * @param  {Array&lt;number&gt;} p2
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, p0, p1, p2 </span>) </span>{
    ctx.moveTo( p0[ <span class="hljs-number">0</span> ], p0[ <span class="hljs-number">1</span> ] );
    ctx.quadraticCurveTo( 
        p1[ <span class="hljs-number">0</span> ], p1[ <span class="hljs-number">1</span> ],
        p2[ <span class="hljs-number">0</span> ], p2[ <span class="hljs-number">1</span> ]
    );
}</code></pre>
<p>这样就完成了基本的绘制二次贝塞尔曲线的方法了。</p>
<p>但是函数这样设计有点小问题</p>
<p>如果我们是在做一个图形库，我们想给使用者提供一个绘制曲线的方法。</p>
<p>对于使用者来说，他只想在给定的起点和终点间间绘制一条曲线，他想要得到的曲线尽量美观，但是又不想关心具体的实现细节，如果还需要给第三个点，使用者会有一定的学习成本（至少需要弄明白什么是贝塞尔曲线）。</p>
<p>看到这里你可能会比较疑惑，即使是二次贝塞尔曲线也需要三个控制点，只有起点和终点怎么绘制曲线呢。</p>
<p>我们可以在起点和终点的垂直平分线上选一点作为第三个控制点，可以提供给使用者一个参数来控制曲线的弯曲程度，现在函数就变成了这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制一条曲线路径
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 */
function drawCurvePath( ctx, start, end, curveness ) {
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制一条曲线路径
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {Array&lt;number&gt;} start 起点
 * @param  {Array&lt;number&gt;} end 终点
 * @param  {number} curveness 曲度(0-1)
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness </span>) </span>{
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>我们用<code>curveness</code>来表示曲线的弯曲程度，也就是第三个控制点的偏离程度。这样很容易就能计算出中间点。<br>现在完整的函数变成了这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 */
function drawCurvePath( ctx, start, end, curveness ) {
    // 计算中间控制点
    var cp = [
         ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * curveness,
         ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * curveness
    ];
    ctx.moveTo( start[ 0 ], start[ 1 ] );
    ctx.quadraticCurveTo( 
        cp[ 0 ], cp[ 1 ],
        end[ 0 ], end[ 1 ]
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array&lt;number&gt;} start 起点
 * @param  {Array&lt;number&gt;} end 终点
 * @param  {number} curveness 曲度(0-1)
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness </span>) </span>{
    <span class="hljs-comment">// 计算中间控制点</span>
    <span class="hljs-keyword">var</span> cp = [
         ( start[ <span class="hljs-number">0</span> ] + end[ <span class="hljs-number">0</span> ] ) / <span class="hljs-number">2</span> - ( start[ <span class="hljs-number">1</span> ] - end[ <span class="hljs-number">1</span> ] ) * curveness,
         ( start[ <span class="hljs-number">1</span> ] + end[ <span class="hljs-number">1</span> ] ) / <span class="hljs-number">2</span> - ( end[ <span class="hljs-number">0</span> ] - start[ <span class="hljs-number">0</span> ] ) * curveness
    ];
    ctx.moveTo( start[ <span class="hljs-number">0</span> ], start[ <span class="hljs-number">1</span> ] );
    ctx.quadraticCurveTo( 
        cp[ <span class="hljs-number">0</span> ], cp[ <span class="hljs-number">1</span> ],
        end[ <span class="hljs-number">0</span> ], end[ <span class="hljs-number">1</span> ]
    );
}</code></pre>
<p>对，就这么短短几行，接下来我们就可以通过它来绘制一条曲线了，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
    <head>
        <title>draw curve</title>
    </head>
    <body>
        <canvas id=&quot;canvas&quot; width=&quot;800&quot; height=&quot;800&quot;></canvas>
        <script>
            var canvas = document.getElementById( 'canvas' );
            var ctx = canvas.getContext( '2d' );
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';
            ctx.beginPath();
    
            drawCurvePath( 
                ctx,
                [ 100, 100 ],
                [ 200, 300 ],
                0.4
            );
            
            ctx.stroke();
            
            function drawCurvePath( ctx, start, end, curveness ) {
                // ...
            }
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>draw curve<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"800"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'canvas'</span> );
            <span class="hljs-keyword">var</span> ctx = canvas.getContext( <span class="hljs-string">'2d'</span> );
            
            ctx.lineWidth = <span class="hljs-number">2</span>;
            ctx.strokeStyle = <span class="hljs-string">'#000'</span>;
            ctx.beginPath();
    
            drawCurvePath( 
                ctx,
                [ <span class="hljs-number">100</span>, <span class="hljs-number">100</span> ],
                [ <span class="hljs-number">200</span>, <span class="hljs-number">300</span> ],
                <span class="hljs-number">0.4</span>
            );
            
            ctx.stroke();
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness </span>) </span>{
                <span class="hljs-comment">// ...</span>
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>绘制结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012600210?w=286&amp;h=242" src="https://static.alili.tech/img/remote/1460000012600210?w=286&amp;h=242" alt="qq 20171226233508" title="qq 20171226233508" style="cursor: pointer; display: inline;"></span><br>绘制一条曲线</p>
<h2 id="articleHeader6">绘制贝塞尔曲线动画</h2>
<p>终于来到文章的本体啦，我们的目的不是绘制一条静态的曲线，我们想绘制一条有过渡效果的曲线。</p>
<p>简化一下问题，那就是我们希望绘制曲线的函数还接受另一个参数，表示绘制曲线的百分比。我们定时去调用这个函数，递增百分比这个参数，就能画出动画了。</p>
<p>我们新增一个参数<code>percent</code>来表示百分比，现在函数变成了这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */
function drawCurvePath( ctx, start, end, curveness, percent ) {
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array&lt;number&gt;} start 起点
 * @param  {Array&lt;number&gt;} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness, percent </span>) </span>{
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>但是canvas提供的<code>quadraticCurveTo</code>方法只能绘制一条完整的二次贝赛尔曲线，没有办法去控制它只画一部分。</p>
<p>画完后用<code>clearRect</code>擦除掉一部分？这不太可行，因为很难确定要擦除的范围。如果曲线的线宽比较宽，就还需要保证擦除的边界和曲线末端垂直，问题就变得很复杂了。</p>
<p>现在再重新看看这张图</p>
<p><span class="img-wrap"><img data-src="/img/bVCxS9?w=240&amp;h=100" src="https://static.alili.tech/img/bVCxS9?w=240&amp;h=100" alt="1608e1929786355b?w=240&amp;h=100&amp;f=gif&amp;s=74274" title="1608e1929786355b?w=240&amp;h=100&amp;f=gif&amp;s=74274" style="cursor: pointer;"></span></p>
<p>我们是不是可以将<code>percent</code>这个参数理解成<code>t</code>值，然后通过贝赛尔曲线方程去计算出中间所有的点，用直线连接起来，以此模拟绘制贝赛尔曲线的一部分呢？</p>
<h3 id="articleHeader7">方法一</h3>
<p>我们不再用canvas提供的<code>quadraticCurveTo</code>来绘制曲线，而是通过贝赛尔曲线的方程计算出一系列点，用多端直线来模拟曲线。</p>
<p>这样做的好处时，我们可以很容易的控制绘制的范围。</p>
<p>那么函数实现就变成了这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */
function drawCurvePath( ctx, start, end, curveness, percent ) {

    var cp = [
         ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * curveness,
         ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * curveness
    ];
    
    ctx.moveTo( start[ 0 ], start[ 1 ] );
    
    for ( var t = 0; t <= percent / 100; t += 0.01 ) {

        var x = quadraticBezier( start[ 0 ], cp[ 0 ], end[ 0 ], t );
        var y = quadraticBezier( start[ 1 ], cp[ 1 ], end[ 1 ], t );
        
        ctx.lineTo( x, y );
    }
    
}

function quadraticBezier( p0, p1, p2, t ) {
    var k = 1 - t;
    return k * k * p0 + 2 * ( 1 - t ) * t * p1 + t * t * p2;    // 这个方程就是二次贝赛尔曲线方程
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array&lt;number&gt;} start 起点
 * @param  {Array&lt;number&gt;} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness, percent </span>) </span>{

    <span class="hljs-keyword">var</span> cp = [
         ( start[ <span class="hljs-number">0</span> ] + end[ <span class="hljs-number">0</span> ] ) / <span class="hljs-number">2</span> - ( start[ <span class="hljs-number">1</span> ] - end[ <span class="hljs-number">1</span> ] ) * curveness,
         ( start[ <span class="hljs-number">1</span> ] + end[ <span class="hljs-number">1</span> ] ) / <span class="hljs-number">2</span> - ( end[ <span class="hljs-number">0</span> ] - start[ <span class="hljs-number">0</span> ] ) * curveness
    ];
    
    ctx.moveTo( start[ <span class="hljs-number">0</span> ], start[ <span class="hljs-number">1</span> ] );
    
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> t = <span class="hljs-number">0</span>; t &lt;= percent / <span class="hljs-number">100</span>; t += <span class="hljs-number">0.01</span> ) {

        <span class="hljs-keyword">var</span> x = quadraticBezier( start[ <span class="hljs-number">0</span> ], cp[ <span class="hljs-number">0</span> ], end[ <span class="hljs-number">0</span> ], t );
        <span class="hljs-keyword">var</span> y = quadraticBezier( start[ <span class="hljs-number">1</span> ], cp[ <span class="hljs-number">1</span> ], end[ <span class="hljs-number">1</span> ], t );
        
        ctx.lineTo( x, y );
    }
    
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">quadraticBezier</span>(<span class="hljs-params"> p0, p1, p2, t </span>) </span>{
    <span class="hljs-keyword">var</span> k = <span class="hljs-number">1</span> - t;
    <span class="hljs-keyword">return</span> k * k * p0 + <span class="hljs-number">2</span> * ( <span class="hljs-number">1</span> - t ) * t * p1 + t * t * p2;    <span class="hljs-comment">// 这个方程就是二次贝赛尔曲线方程</span>
}</code></pre>
<p>接下来就可以通过设置定时器，每隔一段时间调用一次这个方法，并且递增percent</p>
<p>为了动画更加平滑，我们使用<code>requestAnimationFrame</code>来代替定时器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
    <head>
        <title>draw curve</title>
    </head>
    <body>
        <canvas id=&quot;canvas&quot; width=&quot;800&quot; height=&quot;800&quot;></canvas>
        <script>
            var canvas = document.getElementById( 'canvas' );
            var ctx = canvas.getContext( '2d' );
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';
            
            var percent = 0;
            
            function animate() {
                
                ctx.clearRect( 0, 0, 800, 800 );
                ctx.beginPath();

                drawCurvePath( 
                    ctx,
                    [ 100, 100 ],
                    [ 200, 300 ],
                    0.2,
                    percent
                );
    
                ctx.stroke();
    
                percent = ( percent + 1 ) % 100;
                
                requestAnimationFrame( animate );
                
            }
            
            animate();
            
            function drawCurvePath( ctx, start, end, curveness, percent ) {
                // ...
            }
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>draw curve<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"800"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'canvas'</span> );
            <span class="hljs-keyword">var</span> ctx = canvas.getContext( <span class="hljs-string">'2d'</span> );
            
            ctx.lineWidth = <span class="hljs-number">2</span>;
            ctx.strokeStyle = <span class="hljs-string">'#000'</span>;
            
            <span class="hljs-keyword">var</span> percent = <span class="hljs-number">0</span>;
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params"></span>) </span>{
                
                ctx.clearRect( <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">800</span>, <span class="hljs-number">800</span> );
                ctx.beginPath();

                drawCurvePath( 
                    ctx,
                    [ <span class="hljs-number">100</span>, <span class="hljs-number">100</span> ],
                    [ <span class="hljs-number">200</span>, <span class="hljs-number">300</span> ],
                    <span class="hljs-number">0.2</span>,
                    percent
                );
    
                ctx.stroke();
    
                percent = ( percent + <span class="hljs-number">1</span> ) % <span class="hljs-number">100</span>;
                
                requestAnimationFrame( animate );
                
            }
            
            animate();
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness, percent </span>) </span>{
                <span class="hljs-comment">// ...</span>
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>得到的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012670057?w=305&amp;h=269" src="https://static.alili.tech/img/remote/1460000012670057?w=305&amp;h=269" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这样基本实现了我们的需求，但它有一个问题：</p>
<p>测试发现，进行一次<code>lineTo</code>的时间和一次<code>quadraticCurveTo</code>的时间差不多，但是<code>quadraticCurveTo</code>只需要一次就能画出曲线，而使用<code>lineTo</code>则需要数十次。</p>
<p>换言之，用这样的方式绘制曲线，和我们前面的实现方式相比性能下降了数十倍之多。在绘制一条曲线时可能感觉不到区别，但是如果需要同时绘制上千条曲线，性能就会受到很大的影响。</p>
<h3 id="articleHeader8">方法二</h3>
<p>那有没有什么方法可以做到用<code>quadraticCurveTo</code>来实现绘制完整曲线的一部分呢？</p>
<p>我们再次回到这张图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012670052?w=240&amp;h=100" src="https://static.alili.tech/img/remote/1460000012670052?w=240&amp;h=100" alt="s" title="s" style="cursor: pointer;"></span></p>
<p>在中间的某一时刻，例如t=0.25时，它是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012670051?w=240&amp;h=100" src="https://static.alili.tech/img/remote/1460000012670051?w=240&amp;h=100" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们注意到，曲线<code>P0-B</code>这一段似乎也是贝赛尔曲线，它的控制点变成了<code>P0，Q0，B</code>。</p>
<p>现在问题就迎刃而解了，我们只需要每次计算出<code>Q0，B</code>，就能得到其中一小段贝赛尔曲线的控制点，然后就可以通过<code>quadraticCurveTo</code>来绘制它了。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */
function drawCurvePath( ctx, start, end, curveness, percent ) {

    var cp = [
         ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * curveness,
         ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * curveness
    ];
    
    var t = percent / 100;
    
    var p0 = start;
    var p1 = cp;
    var p2 = end;
    
    var v01 = [ p1[ 0 ] - p0[ 0 ], p1[ 1 ] - p0[ 1 ] ];     // 向量<p0, p1>
    var v12 = [ p2[ 0 ] - p1[ 0 ], p2[ 1 ] - p1[ 1 ] ];     // 向量<p1, p2>

    var q0 = [ p0[ 0 ] + v01[ 0 ] * t, p0[ 1 ] + v01[ 1 ] * t ];
    var q1 = [ p1[ 0 ] + v12[ 0 ] * t, p1[ 1 ] + v12[ 1 ] * t ];
    
    var v = [ q1[ 0 ] - q0[ 0 ], q1[ 1 ] - q0[ 1 ] ];       // 向量<q0, q1>

    var b = [ q0[ 0 ] + v[ 0 ] * t, q0[ 1 ] + v[ 1 ] * t ];
    
    ctx.moveTo( p0[ 0 ], p0[ 1 ] );

    ctx.quadraticCurveTo( 
        q0[ 0 ], q0[ 1 ],
        b[ 0 ], b[ 1 ]
    );

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array&lt;number&gt;} start 起点
 * @param  {Array&lt;number&gt;} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCurvePath</span>(<span class="hljs-params"> ctx, start, end, curveness, percent </span>) </span>{

    <span class="hljs-keyword">var</span> cp = [
         ( start[ <span class="hljs-number">0</span> ] + end[ <span class="hljs-number">0</span> ] ) / <span class="hljs-number">2</span> - ( start[ <span class="hljs-number">1</span> ] - end[ <span class="hljs-number">1</span> ] ) * curveness,
         ( start[ <span class="hljs-number">1</span> ] + end[ <span class="hljs-number">1</span> ] ) / <span class="hljs-number">2</span> - ( end[ <span class="hljs-number">0</span> ] - start[ <span class="hljs-number">0</span> ] ) * curveness
    ];
    
    <span class="hljs-keyword">var</span> t = percent / <span class="hljs-number">100</span>;
    
    <span class="hljs-keyword">var</span> p0 = start;
    <span class="hljs-keyword">var</span> p1 = cp;
    <span class="hljs-keyword">var</span> p2 = end;
    
    <span class="hljs-keyword">var</span> v01 = [ p1[ <span class="hljs-number">0</span> ] - p0[ <span class="hljs-number">0</span> ], p1[ <span class="hljs-number">1</span> ] - p0[ <span class="hljs-number">1</span> ] ];     <span class="hljs-comment">// 向量&lt;p0, p1&gt;</span>
    <span class="hljs-keyword">var</span> v12 = [ p2[ <span class="hljs-number">0</span> ] - p1[ <span class="hljs-number">0</span> ], p2[ <span class="hljs-number">1</span> ] - p1[ <span class="hljs-number">1</span> ] ];     <span class="hljs-comment">// 向量&lt;p1, p2&gt;</span>

    <span class="hljs-keyword">var</span> q0 = [ p0[ <span class="hljs-number">0</span> ] + v01[ <span class="hljs-number">0</span> ] * t, p0[ <span class="hljs-number">1</span> ] + v01[ <span class="hljs-number">1</span> ] * t ];
    <span class="hljs-keyword">var</span> q1 = [ p1[ <span class="hljs-number">0</span> ] + v12[ <span class="hljs-number">0</span> ] * t, p1[ <span class="hljs-number">1</span> ] + v12[ <span class="hljs-number">1</span> ] * t ];
    
    <span class="hljs-keyword">var</span> v = [ q1[ <span class="hljs-number">0</span> ] - q0[ <span class="hljs-number">0</span> ], q1[ <span class="hljs-number">1</span> ] - q0[ <span class="hljs-number">1</span> ] ];       <span class="hljs-comment">// 向量&lt;q0, q1&gt;</span>

    <span class="hljs-keyword">var</span> b = [ q0[ <span class="hljs-number">0</span> ] + v[ <span class="hljs-number">0</span> ] * t, q0[ <span class="hljs-number">1</span> ] + v[ <span class="hljs-number">1</span> ] * t ];
    
    ctx.moveTo( p0[ <span class="hljs-number">0</span> ], p0[ <span class="hljs-number">1</span> ] );

    ctx.quadraticCurveTo( 
        q0[ <span class="hljs-number">0</span> ], q0[ <span class="hljs-number">1</span> ],
        b[ <span class="hljs-number">0</span> ], b[ <span class="hljs-number">1</span> ]
    );

}</code></pre>
<p>将前面写的页面替换成上面的代码，可以看到得到的结果是一样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012670057?w=305&amp;h=269" src="https://static.alili.tech/img/remote/1460000012670057?w=305&amp;h=269" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">绘制动画</h3>
<p>现在已经解决了最关键的问题，我们可以绘制动画啦。<br>不过这一部分并不重要，我就不贴代码了。</p>
<p>完整代码可以看<a href="https://github.com/hujiulong/blog/blob/master/demo/bezier/index.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012600201?w=305&amp;h=269" src="https://static.alili.tech/img/remote/1460000012600201?w=305&amp;h=269" alt="160935917f7f0d3f" title="160935917f7f0d3f" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">结束</h2>
<p>我的博客地址： <a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a></p>
<p>我会在这里分享我的学习成果和经验，特别是canvas/WebGL/svg这方面的技术。如果有对前端图形绘制感兴趣的同学可以关注一下我的博客，<strong>收藏点star，订阅点watch</strong>。</p>
<p>最近才将博客搬到github，所以文章并不多，我会坚持写下去的！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用canvas绘制一个曲线动画——深入理解贝塞尔曲线

## 原文链接
[https://segmentfault.com/a/1190000012670045](https://segmentfault.com/a/1190000012670045)


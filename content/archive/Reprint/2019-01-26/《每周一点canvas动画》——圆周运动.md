---
title: '《每周一点canvas动画》——圆周运动' 
date: 2019-01-26 2:30:18
hidden: true
slug: qj0qa9jp29
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>接《每周一点canvas动画》——波形运动</blockquote>
<p>圆周运动可以分为两种基本的形式：<code>正圆运动</code>和<code>椭圆运动</code>。<br>在讲解圆周运动之前，必不可少的数学公式即将袭来。so,各位骚年们，请护好自己的膝盖。听不懂没关系，只要明白其中的原理就行。当然，能懂是最好的，这对后面学习高级动画是很有帮助的。好吧，废话少说直接上菜。</p>
<h3 id="articleHeader0">1.正圆运动</h3>
<p>一般情况下，圆的直角坐标方程可以表示为：<code>x2+y2=R2</code>，根据此公式可以得出圆在直角坐标中的轨迹。也许，你会说这样就可以通过改变x,y的坐标位置让物体做圆周运动。但是，实际情况是这种方法并不可行。因为，你无法精确的计算出物体做圆周运动的每一个坐标位置。就算你成功计算出物体做圆周运动的精确坐标。OK!你可以想象那是多么大的工作量。所以，我们需要转变思路，让计算机去做这种精确的计算问题。</p>
<p><span class="img-wrap"><img data-src="/img/bVJtU1?w=618&amp;h=291" src="https://static.alili.tech/img/bVJtU1?w=618&amp;h=291" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上图展示了从圆的函数表达式到圆的参数方程之间的转换过程。理解不理解都没有关系，总之你要明白，最终我们将 x, y 与 sin 和 cos 扯上关系了。而圆的参数方程就表示的是一个圆。这样我们想要让一个物体做圆周运动，就只需要让计算机自己去来计算每一帧物体所对应的坐标值。而我们所需要做的只是简单的改变<code>θ</code>值。有多简单呢，因为根据sin，cos函数的周期性只需要每一帧自增一个值或自减一个值。具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    window.onload = function(){
               var canvas = document.getElementById('canvas'),
                   context = canvas.getContext('2d');

               var ball = new Ball();

               var angle = 0, // 旋转的角度
                   centerX = canvas.width/2,
                   centerY = canvas.height/2,
                   radius = 100, // 定义半径
                   speed = 0.05; // 每帧旋转角度的增加值

               (function drawFrame(){
                   window.requestAnimationFrame(drawFrame, canvas);
                   context.clearRect(0,0,canvas.width, canvas.height);

                   //centerX, centerY 的作用是让球绕画布中心旋转
                   ball.x = centerX + Math.sin(angle)*radius;
                   ball.y = centerY + Math.cos(angle)*radius;

                   //角度增加
                   angle += speed;
                   ball.draw(context);
               }());
           }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
               var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),
                   context = canvas.getContext(<span class="hljs-string">'2d'</span>);

               var ball = new Ball();

               var angle = 0, // 旋转的角度
                   centerX = canvas.width/2,
                   centerY = canvas.height/2,
                   radius = 100, // 定义半径
                   speed = 0.05; // 每帧旋转角度的增加值

               (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
                   window.requestAnimationFrame(drawFrame, canvas);
                   context.clearRect(0,0,canvas.width, canvas.height);

                   //centerX, centerY 的作用是让球绕画布中心旋转
                   ball.x = centerX + Math.sin(angle)*radius;
                   ball.y = centerY + Math.cos(angle)*radius;

                   //角度增加
                   angle += speed;
                   ball.draw(context);
               }());
           }</code></pre>
<p>效果图</p>
<p><span class="img-wrap"><img data-src="/img/bVJtU5?w=484&amp;h=256" src="https://static.alili.tech/img/bVJtU5?w=484&amp;h=256" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ok,自己动手试试吧！看看是不是球体绕着画布中心做着圆周运动呢！这里我们需要的条件比较多 angle 和 Radius，在后面的章节中我们将介绍如何只通过 angle 就实现圆周运动。为了更容易理解，我劝你最好复习一下中学的知识，哈哈！！！</p>
<h3 id="articleHeader1">2.椭圆运动</h3>
<p>椭圆和正圆的不同之处可以这样理解：<strong>正圆半径在x轴和y轴上的距离是相同的，都是Radius.而椭圆则是不同的,我们用a, b 表示。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVJtVc?w=683&amp;h=298" src="https://static.alili.tech/img/bVJtVc?w=683&amp;h=298" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>具体到代码里，就是半径不同了呗！是不是so easy,上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var ball = new Ball();
            
            var centerX = canvas.width/2,
                centerY = canvas.height/2,
                angle = 0,
                radiusX = 50,
                radiusY = 100,
                speed = 0.05;
            
                ball.x = centerX;
                ball.y = centerY;
                
             context.fillStyle = &quot;rgba(0,0,0,.01)&quot;; 
            (function drawFrame(){
                window.requestAnimationFrame(drawFrame,canvas);
                context.fillRect(0,0,canvas.width,canvas.height);
                
                //当radius的值相等时为圆周运动
                //当radius的值不想等是为椭圆运动
                ball.x = centerX + Math.sin(angle)*radiusX; //radiusX = 50
                ball.y = centerY + Math.cos(angle)*radiusY; //radiusY = 100
                angle += speed;
                
                ball.draw(context);
            })();
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
            var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>);
            var context = canvas.getContext(<span class="hljs-string">'2d'</span>);
            var ball = new Ball();
            
            var centerX = canvas.width/2,
                centerY = canvas.height/2,
                angle = 0,
                radiusX = 50,
                radiusY = 100,
                speed = 0.05;
            
                ball.x = centerX;
                ball.y = centerY;
                
             context.fillStyle = <span class="hljs-string">"rgba(0,0,0,.01)"</span>; 
            (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
                window.requestAnimationFrame(drawFrame,canvas);
                context.fillRect(0,0,canvas.width,canvas.height);
                
                //当radius的值相等时为圆周运动
                //当radius的值不想等是为椭圆运动
                ball.x = centerX + Math.sin(angle)*radiusX; //radiusX = 50
                ball.y = centerY + Math.cos(angle)*radiusY; //radiusY = 100
                angle += speed;
                
                ball.draw(context);
            })();
        }</code></pre>
<p>为了让椭圆的效果看起来更加明显，代替clearRect采用fillRect是小球的运动形成尾迹。</p>
<p><span class="img-wrap"><img data-src="/img/bVJtVh?w=484&amp;h=263" src="https://static.alili.tech/img/bVJtVh?w=484&amp;h=263" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">三、两点之间的距离</h2>
<p>按理来说，连点之间的距离是不会用到三角函数的。但是，其实两点间的距离公式是可以通过勾股定理推出来的，所以这里直接就把他归到三角函数里。<br>这里就不画示意图了直接给你个公式好了(原谅我偷个懒)，假设有两个点, a(x1, y1), b(x2, y2)。那么怎样求它们之间的距离呢！公式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    dx = x2 - x1;
    dy = y2 - y1;
    distance = Math.sqrt(dx*dx + dy*dy); //这不就是勾股定理" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    dx = x2 - x1;
    dy = y2 - y1;
    distance = Math.sqrt(dx*dx + dy*dy); //这不就是勾股定理</code></pre>
<p>这里给你个小的Demo,代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <canvas id=&quot;canvas&quot; width=&quot;500&quot; height=&quot;500&quot; style=&quot;background:#000;&quot;>
           your browser not support canvas!
       </canvas>
       <p id=&quot;log&quot;></p>
       <script src=&quot;../js/utils.js&quot;></script>
       <script>
       window.onload = function(){
               var canvas = document.getElementById('canvas');
               var log = document.getElementById('log');
               var mouse = utils.captureMouse(canvas);
               var context = canvas.getContext('2d');

               //中心位置创建一个方块
               var rect = {
                   x:canvas.width/2,
                   y:canvas.height/2
               };

               (function drawFrame(){
                   window.requestAnimationFrame(drawFrame,canvas);
                   context.clearRect(0,0,canvas.width,canvas.height);

                   var dx = mouse.x - rect.x;
                   var dy = mouse.y - rect.y;
                   var dis = Math.sqrt(dx*dx + dy*dy);

                   //画方块
                   context.fillStyle = '#ffffff';
                   context.fillRect(rect.x-2,rect.y-2,4,4);
                   //画线
                   context.save();
                   context.strokeStyle = '#ffffff';
                   context.beginPath()
                   context.moveTo(rect.x,rect.y);
                   context.lineTo(mouse.x,mouse.y);
                   context.closePath();
                   context.stroke();
                   context.restore();
                   //显示距离
                   log.style.left = (mouse.x + rect.x)/2 + 'px';
                   log.style.top = (mouse.y + rect.y)/2 + 'px';
                   log.innerHTML = dis;
               })();
           }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    &lt;canvas id=<span class="hljs-string">"canvas"</span> width=<span class="hljs-string">"500"</span> height=<span class="hljs-string">"500"</span> style=<span class="hljs-string">"background:#000;"</span>&gt;
           your browser not support canvas!
       &lt;/canvas&gt;
       &lt;p id=<span class="hljs-string">"log"</span>&gt;&lt;/p&gt;
       &lt;script src=<span class="hljs-string">"../js/utils.js"</span>&gt;&lt;/script&gt;
       &lt;script&gt;
       window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
               var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>);
               var <span class="hljs-built_in">log</span> = document.getElementById(<span class="hljs-string">'log'</span>);
               var mouse = utils.captureMouse(canvas);
               var context = canvas.getContext(<span class="hljs-string">'2d'</span>);

               //中心位置创建一个方块
               var rect = {
                   x:canvas.width/2,
                   y:canvas.height/2
               };

               (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
                   window.requestAnimationFrame(drawFrame,canvas);
                   context.clearRect(0,0,canvas.width,canvas.height);

                   var dx = mouse.x - rect.x;
                   var dy = mouse.y - rect.y;
                   var dis = Math.sqrt(dx*dx + dy*dy);

                   //画方块
                   context.fillStyle = <span class="hljs-string">'#ffffff'</span>;
                   context.fillRect(rect.x-2,rect.y-2,4,4);
                   //画线
                   context.save();
                   context.strokeStyle = <span class="hljs-string">'#ffffff'</span>;
                   context.beginPath()
                   context.moveTo(rect.x,rect.y);
                   context.lineTo(mouse.x,mouse.y);
                   context.closePath();
                   context.stroke();
                   context.restore();
                   //显示距离
                   log.style.left = (mouse.x + rect.x)/2 + <span class="hljs-string">'px'</span>;
                   log.style.top = (mouse.y + rect.y)/2 + <span class="hljs-string">'px'</span>;
                   log.innerHTML = dis;
               })();
           }
    &lt;/script&gt;</code></pre>
<p>效果图</p>
<p><span class="img-wrap"><img data-src="/img/bVJtVm?w=502&amp;h=238" src="https://static.alili.tech/img/bVJtVm?w=502&amp;h=238" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">四、总结</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ## 角度旋转
    dx = mouse.x - object.x;
    dy = mouse.y - object.y;
    object.rotation = Math.atan2(dy,dx)*180/Math.PI

    ## 平滑运动
       value = center + Math.sin(angle)*range;
       angle += speed;

    ## 正圆运动
       x_position = centerX + Math.sin(angle)*radius;
       y_position = centerY + Math.cos(angle)*radius;
       angle += speed;

    ## 椭圆运动
       x_position = centerX + Math.cos(angle)*radiusX;
       y_position = centerY + Math.sin(angle)*radiusY;
       angle += speed;

    ##两点间距离
    dx = x2 - x1;
    dy = y2 - y1;
    dist = Math.sqrt(dx*dx + dy*dy);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    <span class="hljs-comment">## 角度旋转</span>
    dx = mouse.x - object.x;
    dy = mouse.y - object.y;
    object.rotation = Math.atan2(dy,dx)*180/Math.PI

    <span class="hljs-comment">## 平滑运动</span>
       value = center + Math.sin(angle)*range;
       angle += speed;

    <span class="hljs-comment">## 正圆运动</span>
       x_position = centerX + Math.sin(angle)*radius;
       y_position = centerY + Math.cos(angle)*radius;
       angle += speed;

    <span class="hljs-comment">## 椭圆运动</span>
       x_position = centerX + Math.cos(angle)*radiusX;
       y_position = centerY + Math.sin(angle)*radiusY;
       angle += speed;

    <span class="hljs-comment">##两点间距离</span>
    dx = x2 - x1;
    dy = y2 - y1;
    dist = Math.sqrt(dx*dx + dy*dy);
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——圆周运动

## 原文链接
[https://segmentfault.com/a/1190000008417444](https://segmentfault.com/a/1190000008417444)


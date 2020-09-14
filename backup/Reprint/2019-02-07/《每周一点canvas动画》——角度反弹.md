---
title: '《每周一点canvas动画》——角度反弹' 
date: 2019-02-07 2:30:15
hidden: true
slug: erufbmv34h9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/supperjet/H5-Animation" rel="nofollow noreferrer" target="_blank">每周一点canvas动画代码文件</a></p></blockquote>
<p>在上一节我们介绍了高级的坐标旋转方法，我们只需要知道物体的位置，通过设定每一帧需要旋转的角速度,通过公式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newX = x*cos - y*sin;
newY = y*cos + x*sin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">newX = x*cos - y*sin;
newY = y*cos + x*sin;</code></pre>
<p>就可以计算出做圆周运动时物体的下一个坐标位置。本节的内容与上一节的内容息息相关。所以，务必把上一节的内容弄懂了，再来看这一节你就不会那么吃力了。这也应该是本系列最难的一部分吧！请收下我的膝盖。。。</p>
<p>在前面的章节中我们写了很多的小动画，大部分的动画中，为了限制物体的活动范围，当物体与canvas画布边界接触的时候，我们都设定了一个反弹系数<code>bounce</code>，让物体有种撞上墙壁的感觉。但是现实环境中不仅仅只有水平或竖直方向的平面，更多的是不同倾斜度的表面。那么，当物体撞击上这样的表面我们该如何处理呢？物体反弹后的速度大小，还有方向该如何计算呢？下面我们就来一一讨论这些问题。</p>
<h3 id="articleHeader0">1.概念解析</h3>
<p>如果，你对前面的文字描述不理解，没关系。看下图，我会通过图形来形象的描述。比如，现在我们有个斜平面，物体以一定的速度朝着斜面运动。</p>
<p><span class="img-wrap"><img data-src="/img/bVy05I" src="https://static.alili.tech/img/bVy05I" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>没有现成的公式可以直接让物体按照我们想象的从斜面反弹。这似乎是个很复杂的问题，那你有没有想过，既然斜面不好做，何不把它转到平面来做呢！我们最擅长的就是平面的反弹了。</p>
<p>思路有了，我们需要把它转化成平面来做角度反弹。那我们需要做哪些事情呢？不卖关子了，我<strong>们所要做的所有事情就是把整个系统包括物体，包括平面全部旋转的平面，做完反弹处理后，再旋转回去。</strong>这就意味着，我们需要旋转斜面，旋转物体的坐标，并且还要旋转物体的速度。</p>
<p><span class="img-wrap"><img data-src="/img/bVy05M" src="https://static.alili.tech/img/bVy05M" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里我随便设置了一个中心点（图中虚线与实线相交的部分），让其围绕这个中心点旋转至平面。此时速度也做了相应的旋转，图中清晰的显示出了速度的方向。接下来，你应该就很熟悉了，既然到了水平面做反弹就很容易。反弹后的速度方向如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVy05N" src="https://static.alili.tech/img/bVy05N" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下一步，就是把整个系统旋转回去，也就是还原整个系统到初始位置</p>
<p><span class="img-wrap"><img data-src="/img/bVy05O" src="https://static.alili.tech/img/bVy05O" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你对它的真实性表示怀疑，这里我们它旋转前与旋转恢复后的两幅图做个叠加</p>
<p><span class="img-wrap"><img data-src="/img/bVy05R" src="https://static.alili.tech/img/bVy05R" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>是不是跟你想象的完全一样呢？</p>
<h3 id="articleHeader1">2.代码实现</h3>
<p>首先我们，新建一个类文件<code>line.js</code>，它的作用和其他的类文件一样，就是画一条线。这里我就不列出来了，你可以去代码文件中找到这个文件的代码。先上效果图</p>
<p><span class="img-wrap"><img data-src="/img/bVy06r" src="https://static.alili.tech/img/bVy06r" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体代码如下，首先引入类文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot; width=&quot;500&quot; height=&quot;500&quot; style=&quot;background: #fff;&quot;></canvas>
   <script src=&quot;../js/utils.js&quot;></script>
   <script src=&quot;../js/ball.js&quot;></script>
   <script src=&quot;../js/Line.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;canvas id=<span class="hljs-string">"canvas"</span> width=<span class="hljs-string">"500"</span> height=<span class="hljs-string">"500"</span> style=<span class="hljs-string">"background: #fff;"</span>&gt;&lt;/canvas&gt;
   &lt;script src=<span class="hljs-string">"../js/utils.js"</span>&gt;&lt;/script&gt;
   &lt;script src=<span class="hljs-string">"../js/ball.js"</span>&gt;&lt;/script&gt;
   &lt;script src=<span class="hljs-string">"../js/Line.js"</span>&gt;&lt;/script&gt;</code></pre>
<p>然后是初始化我们需要的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
       window.onload = function(){
           var canvas = document.getElementById('canvas'),
               context = canvas.getContext('2d'),
               ball = new Ball(20, &quot;red&quot;),
               line = new Line(0, 0, 300, 0),
               gravity = 0.2,                         //重力加速度
               bounce = -0.6,                         //反弹系数
               angleN = 10;                           //斜面的旋转角度
           
           ball.x = 100;
           ball.y = 100;
           
           line.x = 50;
           line.y = 300;
           line.rotation = angleN * Math.PI / 180;    //角度旋转
           
           //得到系统从斜面转到平面的cos和sin值(就是我们坐标旋转中的sin,cos值)
           var cos = Math.cos(line.rotation),         
               sin = Math.sin(line.rotation);
               
           //动画循环
           }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;script&gt;
       window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
           var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),
               context = canvas.getContext(<span class="hljs-string">'2d'</span>),
               ball = new Ball(20, <span class="hljs-string">"red"</span>),
               line = new Line(0, 0, 300, 0),
               gravity = 0.2,                         //重力加速度
               bounce = -0.6,                         //反弹系数
               angleN = 10;                           //斜面的旋转角度
           
           ball.x = 100;
           ball.y = 100;
           
           line.x = 50;
           line.y = 300;
           line.rotation = angleN * Math.PI / 180;    //角度旋转
           
           //得到系统从斜面转到平面的cos和sin值(就是我们坐标旋转中的sin,cos值)
           var cos = Math.cos(line.rotation),         
               sin = Math.sin(line.rotation);
               
           //动画循环
           }
    &lt;/script&gt;</code></pre>
<p>小球的引入我就不解释了，Line有4个参数（x1,y1,x2,y2）,表示从(x1，y1)位置开始，至（x2,y2）位置画一条线。在代码中是从(0,0)到(300,0)，也就是画了一条长度为300的水平直线。然后，把它移动到(50, 300)的位置，并让其倾斜了一个角度。这样你就看到我们图中的斜线了。</p>
<p><span class="img-wrap"><img data-src="/img/bVy05S" src="https://static.alili.tech/img/bVy05S" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下一步，就是我们的核心了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function drawFrame(){
               window.requestAnimationFrame(drawFrame, canvas);
               context.clearRect(0, 0, canvas.width, canvas.height);
               
               //球体运动
               ball.vy += gravity;            
               ball.x += ball.vx;                //初始为0，小球竖直往下落
               ball.y += ball.vy;
               
               //获取小球体与线的相对位置
               var x1 = ball.x - line.x,
                   y1 = ball.y - line.y,
                   
                   //旋转坐标
                   x2 = x1 * cos + y1 * sin,
                   y2 = y1 * cos - x1 * sin,
                   
                   //旋转速度
                   vx1 = ball.vx * cos + ball.vy * sin,
                   vy1 = ball.vy * cos - ball.vx * sin;
            
               
               //如果小球与斜面碰撞
               if(y2 > -ball.radius){
                   y2 = -ball.radius;              //重设小球的位置
                   vy1 *= bounce;                  //反弹
               }
               //
               x1 = x2 * cos - y2 * sin;           //位置旋转回去，注意公式变化
               y1 = y2 * cos + x2 * sin;
               ball.vx = vx1 * cos - vy1 * sin;    //速度旋转回去
               ball.vy = vy1 * cos + vx1 * sin;
               ball.x = line.x + x1;               //小球位置变化
               ball.y = line.y + y1;
               
               ball.draw(context);
               line.draw(context);
               
}())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">(<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
               window.requestAnimationFrame(drawFrame, canvas);
               context.clearRect(0, 0, canvas.width, canvas.height);
               
               //球体运动
               ball.vy += gravity;            
               ball.x += ball.vx;                //初始为0，小球竖直往下落
               ball.y += ball.vy;
               
               //获取小球体与线的相对位置
               var x1 = ball.x - line.x,
                   y1 = ball.y - line.y,
                   
                   //旋转坐标
                   x2 = x1 * cos + y1 * sin,
                   y2 = y1 * cos - x1 * sin,
                   
                   //旋转速度
                   vx1 = ball.vx * cos + ball.vy * sin,
                   vy1 = ball.vy * cos - ball.vx * sin;
            
               
               //如果小球与斜面碰撞
               <span class="hljs-keyword">if</span>(y2 &gt; -ball.radius){
                   y2 = -ball.radius;              //重设小球的位置
                   vy1 *= bounce;                  //反弹
               }
               //
               x1 = x2 * cos - y2 * sin;           //位置旋转回去，注意公式变化
               y1 = y2 * cos + x2 * sin;
               ball.vx = vx1 * cos - vy1 * sin;    //速度旋转回去
               ball.vy = vy1 * cos + vx1 * sin;
               ball.x = line.x + x1;               //小球位置变化
               ball.y = line.y + y1;
               
               ball.draw(context);
               line.draw(context);
               
}())</code></pre>
<p>注意代码中，旋转回去的坐标旋转公式公式发生了变化。</p>
<h3 id="articleHeader2">3.代码优化</h3>
<p>注意上部分代码中，我们发生坐标旋转是在下面的条件下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if(y2 > -ball.radius){
       //...
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"> <span class="hljs-keyword">if</span>(y2 &gt; -ball.radius){
       //...
  }
</code></pre>
<p>那上面的代码就有很大的问题了，我们在每一帧都做了坐标旋转，再旋转回去。其实完全没有必要，所以代码修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
    var x1 = ball.x - line.x,
        y1 = ball.y - line.y,
        y2 = y1*cos - x1*sin;
        
   
    if(y2 > -ball.radius){                       //只有当小球与平面接触时才做旋转
           var x2 = x1*cos + y1*sin;             //旋转 x 坐标
                      
           vx1 = ball.vx*cos + ball.vy*sin;      //旋转速度
           vy1 = ball.vy*cos - ball.vx*sin;
                      
            y2 = -ball.radius;
            vy1 *= bounce;
                      
           //所有东西旋转回去
           x1 = x2*cos - y2*sin;
           y1 = y2*cos + x2*sin;
           ball.vx = vx1*cos - vy1*sin;
           ball.vy = vy1*cos + vx1*sin;
           ball.x = line.x + x1;
           ball.y = line.y + y1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">...
    var x1 = ball.x - line.x,
        y1 = ball.y - line.y,
        y2 = y1*cos - x1*sin;
        
   
    <span class="hljs-keyword">if</span>(y2 &gt; -ball.radius){                       //只有当小球与平面接触时才做旋转
           var x2 = x1*cos + y1*sin;             //旋转 x 坐标
                      
           vx1 = ball.vx*cos + ball.vy*sin;      //旋转速度
           vy1 = ball.vy*cos - ball.vx*sin;
                      
            y2 = -ball.radius;
            vy1 *= bounce;
                      
           //所有东西旋转回去
           x1 = x2*cos - y2*sin;
           y1 = y2*cos + x2*sin;
           ball.vx = vx1*cos - vy1*sin;
           ball.vy = vy1*cos + vx1*sin;
           ball.x = line.x + x1;
           ball.y = line.y + y1;
}</code></pre>
<h3 id="articleHeader3">4.边界问题</h3>
<p>注意到在上面的效果中，当小球超出了斜面依然保持运动。而不是我们想象的掉落到地面上。为了修正这个问题，我们需要用到前面章节介绍的两个物体之间的边界检测方法，你应该很熟悉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//动画循环中
var bounds = line.getBounds(),
if( ball.x + ball.radius > bounds.x &amp;&amp; ball.x - ball.radius < bounds.x + bounds.width){
    if(y2 > -ball.radius){
       //....
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">//动画循环中
var bounds = line.getBounds(),
<span class="hljs-keyword">if</span>( ball.x + ball.radius &gt; bounds.x &amp;&amp; ball.x - ball.radius &lt; bounds.x + bounds.width){
    <span class="hljs-keyword">if</span>(y2 &gt; -ball.radius){
       //....
    }
}</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bVy05Y" src="https://static.alili.tech/img/bVy05Y" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">5.更多动效</h3>
<p>1.用鼠标控制斜面的角度</p>
<p><span class="img-wrap"><img data-src="/img/bVy053" src="https://static.alili.tech/img/bVy053" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.多斜面撞击<br><span class="img-wrap"><img data-src="/img/bVy056" src="https://static.alili.tech/img/bVy056" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">6.总结</h3>
<p>本章的重点公式就是一个坐标旋转</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
newX = x*cos - y*sin;
newY = y*cos + x*sin;

//旋转回去
newX = x*cos + y*sin;
newY = y*cos - x*sin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
newX = x*cos - y*sin;
newY = y*cos + x*sin;

//旋转回去
newX = x*cos + y*sin;
newY = y*cos - x*sin;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——角度反弹

## 原文链接
[https://segmentfault.com/a/1190000005923374](https://segmentfault.com/a/1190000005923374)


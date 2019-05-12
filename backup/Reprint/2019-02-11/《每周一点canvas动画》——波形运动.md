---
title: '《每周一点canvas动画》——波形运动' 
date: 2019-02-11 2:30:49
hidden: true
slug: 2lo9ip9tzur
categories: [reprint]
---

{{< raw >}}

                    
<p>在上一节我们介绍了canvas动画中有关三角函数的内容，以及一个跟随鼠标旋转的箭头动画。这一节主要介绍三角函数的波形运动。包括：</p>
<ol>
<li><p>平滑运动</p></li>
<li><p>线性运动</p></li>
<li><p>脉冲运动</p></li>
</ol>
<h3 id="articleHeader0">1.Sin函数的波形</h3>
<p>sin函数的波形想必骚年们不会感到陌生，其图形如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVuXCJ?w=579&amp;h=209" src="https://static.alili.tech/img/bVuXCJ?w=579&amp;h=209" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果想要取得<code>sin</code>函数在[0, 2π]之间的值，非连续的情况下，可以这样估算。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    for(var angle=0; angle<Math.PI*2; angle+=0.1){
        console.log(Math.sin(angle)); //打印出角度对应的sin值
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    <span class="hljs-keyword">for</span>(var angle=0; angle&lt;Math.PI*2; angle+=0.1){
        console.log(Math.sin(angle)); //打印出角度对应的sin值
    }</code></pre>
<h3 id="articleHeader1">1.平滑运动</h3>
<p>首先介绍<code>Math.sin(angle)</code>的第一个应用——<strong>平滑运动</strong>。</p>
<p>平滑是指物体一种流畅的运动状态，与之相反的是机械式的简单的从0到1再到-1和0的这么一种状态。平滑的运动更加趋近与自然的运动状态，类似水草在水流中的左右摇摆，在摆动的过程中是有速度的变化的。</p>
<p>我们用<code>Math.sin</code>函数模仿的第一个运动，就是这种类似水草摆动的运动。另外，因为<code>sin</code>函数的值介于[-1,1]之间。所以在实际代码中需要乘以一个较大的值(也就是振幅，你懂得)，使其的摆动看起来明显一些。水草摆动的如下图所示,<a href="http://codepen.io/supperjet/pen/qRgKMZ" rel="nofollow noreferrer" target="_blank">在线演示地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/qRgKMZ" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVJd5p?w=646&amp;h=223" src="https://static.alili.tech/img/bVJd5p?w=646&amp;h=223" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//水草类
function Aqu(color, num, amp){
      this.startPoint = [];
      this.endPointX = [];
      this.endPointY = [];
      this.amp = [];
      this.beta = 0;
      this.color = (color == undefined)?&quot;#3b154e&quot;:color;
      this.num = (num == undefined)?80:num;
}
       
 Aqu.prototype.init = function(){
       for(var i=0; i<this.num; i++){
           this.startPoint[i] = Math.random()*20 + i*10;
           this.endPointX[i] = this.startPoint[i];
           this.endPointY[i] = canvas.height/1.5 - Math.random()*50;
           this.amp[i] = Math.random()*10 + 40;
       }
   }

Aqu.prototype.draw = function(ctx){
       ctx.save();
       ctx.lineWidth = 14;
       ctx.lineCap = &quot;round&quot;;
       ctx.globalAlpha = 0.8;
       ctx.strokeStyle =this.color;
       
       //Math.sin的应用
       this.beta += del*0.0012;
       var l = Math.sin(this.beta);
       
       for(var i=0; i<this.num; i++){
          ctx.beginPath();
          ctx.moveTo(this.startPoint[i], canvas.height);
          
          //周期性改变水草的顶点X坐标
          this.endPointX[i] = this.startPoint[i] + l*this.amp[i]
          
          ctx.quadraticCurveTo(this.startPoint[i],canvas.height-120,this.endPointX[i],this.endPointY[i]);
          ctx.stroke();
      }
       ctx.restore();
   }
   
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
    canvas.height = 400;
    canvas.width = 800;
    
    //实例水草
    var oAqu = new Aqu();
    //初始化
    oAqu.init();
       
var oldTime = new Date().getTime(),
    del = null, newTime = null;
       
   (function drawFrmae(){
       window.requestAnimationFrame(drawFrmae);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
           
       newTime = new Date().getTime();
       del = new Date().getTime() - oldTime;
       oldTime = newTime;
       
       oAqu.draw(ctx);
       }())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">//水草类
<span class="hljs-keyword">function</span> Aqu(color, num, amp){
      this.startPoint = [];
      this.endPointX = [];
      this.endPointY = [];
      this.amp = [];
      this.beta = 0;
      this.color = (color == undefined)?<span class="hljs-string">"#3b154e"</span>:color;
      this.num = (num == undefined)?80:num;
}
       
 Aqu.prototype.init = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
       <span class="hljs-keyword">for</span>(var i=0; i&lt;this.num; i++){
           this.startPoint[i] = Math.random()*20 + i*10;
           this.endPointX[i] = this.startPoint[i];
           this.endPointY[i] = canvas.height/1.5 - Math.random()*50;
           this.amp[i] = Math.random()*10 + 40;
       }
   }

Aqu.prototype.draw = <span class="hljs-keyword">function</span>(ctx){
       ctx.save();
       ctx.lineWidth = 14;
       ctx.lineCap = <span class="hljs-string">"round"</span>;
       ctx.globalAlpha = 0.8;
       ctx.strokeStyle =this.color;
       
       //Math.sin的应用
       this.beta += del*0.0012;
       var l = Math.sin(this.beta);
       
       <span class="hljs-keyword">for</span>(var i=0; i&lt;this.num; i++){
          ctx.beginPath();
          ctx.moveTo(this.startPoint[i], canvas.height);
          
          //周期性改变水草的顶点X坐标
          this.endPointX[i] = this.startPoint[i] + l*this.amp[i]
          
          ctx.quadraticCurveTo(this.startPoint[i],canvas.height-120,this.endPointX[i],this.endPointY[i]);
          ctx.stroke();
      }
       ctx.restore();
   }
   
var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),
    ctx = canvas.getContext(<span class="hljs-string">'2d'</span>);
    canvas.height = 400;
    canvas.width = 800;
    
    //实例水草
    var oAqu = new Aqu();
    //初始化
    oAqu.init();
       
var oldTime = new Date().getTime(),
    del = null, newTime = null;
       
   (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrmae</span></span>(){
       window.requestAnimationFrame(drawFrmae);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
           
       newTime = new Date().getTime();
       del = new Date().getTime() - oldTime;
       oldTime = newTime;
       
       oAqu.draw(ctx);
       }())</code></pre>
<p>相比于机械的加减是不是更加的流畅呢？当然，你也通过改变Math.sin(this.beta)中的递增角度值，控制摆动的速度。</p>
<h3 id="articleHeader2">2.线性运动</h3>
<p>线性运动是最简单的一种运动，物体匀速朝某个方向运动，就是线性运动。</p>
<p><span class="img-wrap"><img data-src="/img/bVJd5H?w=498&amp;h=223" src="https://static.alili.tech/img/bVJd5H?w=498&amp;h=223" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>原理很简单，具体代码请查看<code>linear-vertical-motion.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <script>
       window.onload = function(){
           var canvas = document.getElementById('canvas'),
                 context = canvas.getContext('2d');
               
           var angle = 0,
               range = 50,
               xspeed = 1,
               yspeed = 0.05;

           var ball = new Ball();
           
           (function drawFrame(){
               window.requestAnimationFrame(drawFrame,canvas);
               context.clearRect(0,0,canvas.width,canvas.height);

               ball.x += xspeed; //水平，沿x轴方向水平运动
               
               if(ball.x > canvas.width + ball.radius){
                   ball.x = -ball.radius;
               }
               //垂直， 由于angle角度没发生变化，所以纵坐标保持不变
               ball.y = canvas.height/2+Math.sin(angle)*range;
               
              // angle += 0.05; //取消注释看看发生了什么？
               ball.draw(context);
           })();
       }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">   &lt;script&gt;
       window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
           var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),
                 context = canvas.getContext(<span class="hljs-string">'2d'</span>);
               
           var angle = 0,
               range = 50,
               xspeed = 1,
               yspeed = 0.05;

           var ball = new Ball();
           
           (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
               window.requestAnimationFrame(drawFrame,canvas);
               context.clearRect(0,0,canvas.width,canvas.height);

               ball.x += xspeed; //水平，沿x轴方向水平运动
               
               <span class="hljs-keyword">if</span>(ball.x &gt; canvas.width + ball.radius){
                   ball.x = -ball.radius;
               }
               //垂直， 由于angle角度没发生变化，所以纵坐标保持不变
               ball.y = canvas.height/2+Math.sin(angle)*range;
               
              // angle += 0.05; //取消注释看看发生了什么？
               ball.draw(context);
           })();
       }
    &lt;/script&gt;</code></pre>
<p>其实，这里如果你把<code>angle += 0.05</code>的注释取消，你会发现球的运动轨迹就与sin函数的图像一致了。</p>
<h3 id="articleHeader3">3.脉冲运动</h3>
<p>除了作用于物体的速度，sin函数仍然可以作用于物体的大小变化。脉冲运动便是将sin函数运用于物体大小的变化中。</p>
<p><span class="img-wrap"><img data-src="/img/bVJd5M?w=498&amp;h=223" src="https://static.alili.tech/img/bVJd5M?w=498&amp;h=223" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>具体代码如下，详细代码请查看<code>plusing-motion.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
            var canvas = document.getElementById('canvas');
            var context  = canvas.getContext('2d');

            var angle = 0,
                range = 0.5,
                speed = 0.05,
                centerScale = 1;

            var ball = new Ball();
                ball.x = canvas.width/2;
                   ball.y = canvas.height/2;

            (function drawFrame(){
                window.requestAnimationFrame(drawFrame,canvas);
                context.clearRect(0,0,canvas.width,canvas.height);
                
                //sin值的变化，导致 ball.scaleX ， ball.scaleY属性变化
                ball.scaleX = ball.scaleY = centerScale + Math.sin(angle)*range;
                angle += speed;

                ball.draw(context);
            })();
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
            var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>);
            var context  = canvas.getContext(<span class="hljs-string">'2d'</span>);

            var angle = 0,
                range = 0.5,
                speed = 0.05,
                centerScale = 1;

            var ball = new Ball();
                ball.x = canvas.width/2;
                   ball.y = canvas.height/2;

            (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
                window.requestAnimationFrame(drawFrame,canvas);
                context.clearRect(0,0,canvas.width,canvas.height);
                
                //sin值的变化，导致 ball.scaleX ， ball.scaleY属性变化
                ball.scaleX = ball.scaleY = centerScale + Math.sin(angle)*range;
                angle += speed;

                ball.draw(context);
            })();
        }</code></pre>
<p>由此你应该知道，除了位置属性，我们还可以将sin函数与其他的属性相结合，来形成不同的运动形式。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——波形运动

## 原文链接
[https://segmentfault.com/a/1190000004956705](https://segmentfault.com/a/1190000004956705)


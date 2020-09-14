---
title: '每周一点canvas动画——序' 
date: 2019-02-12 2:30:12
hidden: true
slug: y245ji3tshr
categories: [reprint]
---

{{< raw >}}

                    
<p>《每周一点canvas动画》是一个系列文章，本文并不对canvas的API做过多的介绍，我默认你已经了解基本的canvas绘图API，并在此告诉你如何使用简单的数学与物理知识创建相当酷炫的动画。一说到物理和数学知识各位骚年们是不是感觉蛋疼(原谅我说脏话了)，不过我要告诉你，我们用到的数学和物理知识真的很简单，一点都不可怕。</p>
<h4>1.支持情况</h4>
<p>canvas作为H5中最为重要的新增特性，使开发者可以用它来创作各种令人惊叹的作品。但开发者最关心的问题肯定是浏览器的支持情况（图片来自张鑫旭博客）！</p>
<p><span class="img-wrap"><img data-src="/img/bVHJ61?w=965&amp;h=214" src="https://static.alili.tech/img/bVHJ61?w=965&amp;h=214" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>2.本文主要内容</h4>
<p>本系列文章主要介绍Canvas 2D动画原理，以及简单的如何在2D平面模仿3D效果的方法，中间可能会穿插一些与其他技术相结合的DEMO和项目。首先，我们创作动画的基本文档结构如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>canvas动画序</title>
</head>
<body>
   <canvas id=&quot;canvas&quot; width='500' height=&quot;500&quot;>
       <P>you browser not support canvas!</P>
   </canvas>
   <script>
       window.onload = function(){
       //我们的代码
       }
   </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;!DOCTYPE html&gt;
&lt;html lang=<span class="hljs-string">"en"</span>&gt;
&lt;head&gt;
    &lt;meta charset=<span class="hljs-string">"UTF-8"</span>&gt;
    &lt;title&gt;canvas动画序&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
   &lt;canvas id=<span class="hljs-string">"canvas"</span> width=<span class="hljs-string">'500'</span> height=<span class="hljs-string">"500"</span>&gt;
       &lt;P&gt;you browser not support canvas!&lt;/P&gt;
   &lt;/canvas&gt;
   &lt;script&gt;
       window.onload = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
       //我们的代码
       }
   &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>在此我们需要明白动画的基本概念：<br><strong>动画其实是由不同的静态画面组成，每一幅静态画面我们叫做一帧（frame），当众多的静态画面按照一定的规则快速运动时，我们的眼睛就会欺骗我们的大脑，从而形成物体运动的假象。</strong>在这里先给大家展示用Canvas创作的两个酷炫动画，看看它是否够简洁，够酷炫！</p>
<h4>1、百分比加载</h4>
<p>第一个动画是一个用Canvas做的百分比加载动画（根据读者的建议，已经对错误的代码做了修改）。<a href="http://codepen.io/supperjet/pen/MbbPeJ" rel="nofollow noreferrer" target="_blank">codePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/MbbPeJ" data-typeid="3">点击预览</button></p>
<p><span class="img-wrap"><img data-src="/img/bVHJ7o?w=460&amp;h=380" src="https://static.alili.tech/img/bVHJ7o?w=460&amp;h=380" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas'),  //获取canvas元素
    context = canvas.getContext('2d'),           //获取画图环境，指明为2d
    centerX = canvas.width/2,                    //Canvas中心点x轴坐标
    centerY = canvas.height/2,                   //Canvas中心点y轴坐标
    rad = Math.PI*2/100,                         //将360度分成100份，那么每一份就是rad度
    speed = 0.1;                                  //加载的快慢就靠它了
             
    //绘制蓝色外圈
    function blueCircle(n){
        context.save();
        context.beginPath();
        context.strokeStyle = &quot;#49f&quot;;
        context.lineWidth = 12;
        context.arc(centerX, centerY, 100 , -Math.PI/2, -Math.PI/2 + n*rad, false);
        context.stroke();
        context.restore();
    }
         
    //绘制白色外圈
    function whiteCircle(){
        context.save();
        context.beginPath();
        context.strokeStyle = &quot;#A5DEF1&quot;;
        context.lineWidth = 12;
        context.arc(centerX, centerY, 100 , 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
        context.restore();
    }
         
    //百分比文字绘制
    function text(n){
        context.save();
        context.fillStyle = &quot;#F47C7C&quot;;
        context.font = &quot;40px Arial&quot;;
        context.textAlign = &quot;center&quot;;
        context.textBaseline = &quot;middle&quot;;
        context.fillText(n.toFixed(0)+&quot;%&quot;, centerX, centerY);
        context.restore();
   }
         
    //动画循环
    (function drawFrame(){
         window.requestAnimationFrame(drawFrame, canvas);
         context.clearRect(0, 0, canvas.width, canvas.height);
             
         whiteCircle();
         text(speed);
         blueCircle(speed);
                
         if(speed > 100) speed = 0;
         speed += 0.1;
    }());
 </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),  //获取canvas元素
    context = canvas.getContext(<span class="hljs-string">'2d'</span>),           //获取画图环境，指明为2d
    centerX = canvas.width/2,                    //Canvas中心点x轴坐标
    centerY = canvas.height/2,                   //Canvas中心点y轴坐标
    rad = Math.PI*2/100,                         //将360度分成100份，那么每一份就是rad度
    speed = 0.1;                                  //加载的快慢就靠它了
             
    //绘制蓝色外圈
    <span class="hljs-keyword">function</span> blueCircle(n){
        context.save();
        context.beginPath();
        context.strokeStyle = <span class="hljs-string">"#49f"</span>;
        context.lineWidth = 12;
        context.arc(centerX, centerY, 100 , -Math.PI/2, -Math.PI/2 + n*rad, <span class="hljs-literal">false</span>);
        context.stroke();
        context.restore();
    }
         
    //绘制白色外圈
    <span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">whiteCircle</span></span>(){
        context.save();
        context.beginPath();
        context.strokeStyle = <span class="hljs-string">"#A5DEF1"</span>;
        context.lineWidth = 12;
        context.arc(centerX, centerY, 100 , 0, Math.PI*2, <span class="hljs-literal">false</span>);
        context.stroke();
        context.closePath();
        context.restore();
    }
         
    //百分比文字绘制
    <span class="hljs-keyword">function</span> text(n){
        context.save();
        context.fillStyle = <span class="hljs-string">"#F47C7C"</span>;
        context.font = <span class="hljs-string">"40px Arial"</span>;
        context.textAlign = <span class="hljs-string">"center"</span>;
        context.textBaseline = <span class="hljs-string">"middle"</span>;
        context.fillText(n.toFixed(0)+<span class="hljs-string">"%"</span>, centerX, centerY);
        context.restore();
   }
         
    //动画循环
    (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
         window.requestAnimationFrame(drawFrame, canvas);
         context.clearRect(0, 0, canvas.width, canvas.height);
             
         whiteCircle();
         text(speed);
         blueCircle(speed);
                
         <span class="hljs-keyword">if</span>(speed &gt; 100) speed = 0;
         speed += 0.1;
    }());
 &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>在上面的代码段中，我们通过一个立即执行函数来执行我们的动画循环，并在内部通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.requestAnimationFrame(drawFrame, canvas);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">window.requestAnimationFrame(drawFrame, canvas);</code></pre>
<p>循环调用自身，requestAnimationFrame是一个新的API,作用与setTimeInterval一样，不同的是它会根据浏览器的刷新频率自动调整动画的时间间隔。在循环中我们每次执行都会重新绘制蓝色的圆弧，和白色的圆环和百分比加载的文字，由于每次绘制的时间间隔很小，只有十几毫秒（主要看电脑），所以我们的肉眼是无法清楚地分别每一帧的画面，这样就形成了我们看到的动画。该API的兼容处理如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!window.requestAnimationFrame){
    window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
                                   window.mozRequestAnimationFrame||
                                   window.oRequestAnimationFrame||
                                   window.msRequestAnimationFrame||
                                   function(callback){
                                       return window.setTimeout(callback,1000/60); 
                                 });
    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">if</span>(!window.requestAnimationFrame){
    window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
                                   window.mozRequestAnimationFrame||
                                   window.oRequestAnimationFrame||
                                   window.msRequestAnimationFrame||
                                   <span class="hljs-keyword">function</span>(callback){
                                       <span class="hljs-built_in">return</span> window.setTimeout(callback,1000/60); 
                                 });
    
}
</code></pre>
<h4>2、黑客帝国(Matrix.js)</h4>
<p>经典的黑客帝国效果，Geek们的最爱。目前，已经被我封装成插件，可供大家方便使用。<a href="http://codepen.io/supperjet/pen/JbqZPK" rel="nofollow noreferrer" target="_blank">codePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/JbqZPK" data-typeid="3">点击预览</button> | <a href="https://github.com/supperjet/Martrix.js" rel="nofollow noreferrer" target="_blank">插件地址</a></p>
<p><span class="img-wrap"><img data-src="/img/bVHsaC?w=698&amp;h=383" src="https://static.alili.tech/img/bVHsaC?w=698&amp;h=383" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight;
           
     //初始化
    var clearColor = 'rgba(0, 0, 0, .1)',             //用于绘制渐变阴影
        wordColor = &quot;#33ff33&quot;,                         //文字颜色
        words = &quot;0123456789qwertyuiopasdfghjklzxcvbnm,./;'\[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?&quot;,
        wordsArr = words.split(''),                 //将文字拆分进一个数组
        font_size = 16,  //字体大小
        clumns = w / font_size,                     //文字降落的列数
        drops = [];

     for(var i=0; i<clumns; i++){
         drops[i] = 1;
     }

   function draw(){
       context.save();
       context.fillStyle = wordColor;
       context.font = font_size + &quot;px arial&quot;;
       //核心
       for (var i = 0; i < drops.length; i++){
            var text = wordsArr[Math.floor(Math.random() * wordsArr.length)];
                context.fillText(text, i * font_size, drops[i] * font_size);
                if (drops[i] * font_size > h &amp;&amp; Math.random() > 0.98){
                        drops[i] = 0;
                }
                    drops[i]++;
        }
       context.restore();
  }
           
    //动画循环
  (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.fillStyle = clearColor;
        context.fillRect(0, 0, w, h);  //注意这
        draw();
   }())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var canvas = document.querySelector(<span class="hljs-string">'canvas'</span>),
    context = canvas.getContext(<span class="hljs-string">'2d'</span>),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight;
           
     //初始化
    var clearColor = <span class="hljs-string">'rgba(0, 0, 0, .1)'</span>,             //用于绘制渐变阴影
        wordColor = <span class="hljs-string">"#33ff33"</span>,                         //文字颜色
        words = <span class="hljs-string">"0123456789qwertyuiopasdfghjklzxcvbnm,./;'\[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM&lt;&gt;?"</span>,
        wordsArr = words.split(<span class="hljs-string">''</span>),                 //将文字拆分进一个数组
        font_size = 16,  //字体大小
        clumns = w / font_size,                     //文字降落的列数
        drops = [];

     <span class="hljs-keyword">for</span>(var i=0; i&lt;clumns; i++){
         drops[i] = 1;
     }

   <span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">draw</span></span>(){
       context.save();
       context.fillStyle = wordColor;
       context.font = font_size + <span class="hljs-string">"px arial"</span>;
       //核心
       <span class="hljs-keyword">for</span> (var i = 0; i &lt; drops.length; i++){
            var text = wordsArr[Math.floor(Math.random() * wordsArr.length)];
                context.fillText(text, i * font_size, drops[i] * font_size);
                <span class="hljs-keyword">if</span> (drops[i] * font_size &gt; h &amp;&amp; Math.random() &gt; 0.98){
                        drops[i] = 0;
                }
                    drops[i]++;
        }
       context.restore();
  }
           
    //动画循环
  (<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.fillStyle = clearColor;
        context.fillRect(0, 0, w, h);  //注意这
        draw();
   }())</code></pre>
<p>这段代码有两个比较核心的地方：<br><strong>1，在初始化部分，我们定义了一个变量clearColor = 'rgba(0, 0, 0, .1)',用于绘制阴影。其原理是：每当动画绘制新的一帧，就在上面覆盖一个透明度为0.1的黑色矩形。随着层数的叠加，文字就会被逐渐遮盖形成了我们看到的阴影。</strong></p>
<p>2，在初始化的注释处和核心模块处。首先，设置了每个字体的大小(font_size)。然后，用canvas的宽度除以字体的大小，就得到了需要绘制的列数(clumns)， 然后创建了一个数组drops,数组的长度为clumns,并且每个元素的值都为1(drops在这有什么用呢？继续往下看)。在绘制部分，我们采取的思路是一行一行的绘制，首先在循环中随机的获取文字，在文字绘制API部分注意这行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.fillText(text, i * font_size, drops[i] * font_size);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">context.fillText(text, i * font_size, drops[i] * font_size);</code></pre>
<p>我们知道该API有三个参数，第一个是绘制的文字，第二，三是文字的坐标。在X坐标部分为<code>i * font_size</code>，也就是说在循环完成后每个文字的X轴坐标是(0, 16, 32,48...), 而Y坐标为<code>drops[i] * font_size</code>由于drops内元素的初始值都为1，所以文字的Y坐标为(16, 16, 16, ...),这样我们就相当于先绘制了第一行的文字。那么紧接着我们绘制第二行只需要将drops中的元素加1即可，即(第二行的Y轴坐标为（32，32，32...）。<br>依次类推，我们就绘制了满屏的文字，通过渐变阴影我们就可以看到文字似乎是向下运动的效果。为了让他们看上去运动的速度不一致，加上了这行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (drops[i] * font_size > h &amp;&amp; Math.random() > 0.98){
           drops[i] = 0;
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">if</span> (drops[i] * font_size &gt; h &amp;&amp; Math.random() &gt; 0.98){
           drops[i] = 0;
 }
</code></pre>
<p>这行代码判断的是当前绘制的这行文字的Y坐标是否超过了canvas的高度，如果超过又从第一行开始绘制，那么如何让他们出现差异性呢！小秘密在<code>Math.random() &gt; 0.98</code>这，if中的两个条件一个是判断文字高度，另一个是判断一个随机数是佛大于0.98，只有当两个条件同时成立才能回到第一行重新绘制。所以，由于第二个条件是随机的，那么差异性就自然而然的出现了！</p>
<p>看看，只需要这么简单的代码就能写出这么酷炫的效果，是不是很赞！你也试试吧！不理解没关系，这里只是让你看看canvas能做出多么酷炫的效果。</p>
<p>下一节，我们就正式开始我们的Canvas动画之旅！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
每周一点canvas动画——序

## 原文链接
[https://segmentfault.com/a/1190000004852668](https://segmentfault.com/a/1190000004852668)


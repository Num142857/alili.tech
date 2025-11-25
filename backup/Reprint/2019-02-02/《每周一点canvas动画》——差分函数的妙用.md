---
title: '《每周一点canvas动画》——差分函数的妙用' 
date: 2019-02-02 2:30:10
hidden: true
slug: pb2g748urj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://github.com/supperjet/H5-Animation/tree/master/share" rel="nofollow noreferrer" target="_blank">每周一点canvas动画代码文件</a></blockquote>
<p>好像上次更新还是十一前，这唰唰唰的就过去大半个月了，现在更新我也没什么不好意思的。这次我们不涉及canvas 3D的内容，主要分享一个比较炫的动画效果，可以算是上一篇文章<a href="https://segmentfault.com/a/1190000007003958">《每周一点canvas动画》——3D点线与水波动画</a>的加强版。动画效果来自<a href="http://codepen.io/yangfan44777/pen/Afklw" rel="nofollow noreferrer" target="_blank">codePen</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangfan44777/pen/Afklw" data-typeid="3">点击预览</button>。在这篇文章中我们就分析这种效果是如何实现的，如果你对源码比较懵逼，相信看完解析就会恍然大悟。先上效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVEoPd?w=727&amp;h=420" src="https://static.alili.tech/img/bVEoPd?w=727&amp;h=420" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1.原理分析</h3>
<p>相比与上篇文章中简陋的水波动画的效果，本文的动画效果不仅能够和鼠标进行交互，而且波浪的形成更加自然，更加符合物理规律。整个动画的形成过程就如动图中所展示的那样，在液面的位置点击鼠标，此处的液面就会有一个比较大的起伏，然后此处的震动会向两边传播，随着能量的衰减，后面的震动幅度会越来越下，最后能量衰减到零，页面趋于平静。听上去是不是很玄乎，感觉很高深！毛主席告诉我们千万不要被物体的表面现象所迷惑（谁知道是谁说的呢o(^▽^)o）。下面我们就来一步一步的分析，这其中的原理。</p>
<p>首先，在静止状态下我们可以看到整个液面就相当于是个矩形。而当我们点击液面的位置时，这个矩形就发生了相应的变化。但其实并不是整个矩形都发生了变化，而<strong>只是矩形的上边发生了变化</strong>。那是如何做到仅仅让矩形的上边发生变化的呢？秘诀就在矩形的上边并不是简单的从左边的点<code>lineTo()</code>到右边的点。而是由很多的点<code>lineTo()</code>组成。这样讲可能不太好理解，看图说话：</p>
<p><span class="img-wrap"><img data-src="/img/bVEoPp?w=791&amp;h=318" src="https://static.alili.tech/img/bVEoPp?w=791&amp;h=318" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在上部我们设置了很多的点，这些点的纵坐标都是一样的，只是在水平方向相隔一定的间距。这样在静止的状态下，我们就可以它看见与普通的矩形别无二致。而改变这些点的位置时我们就能同时改变矩形的形状，从而形成不同的效果。</p>
<h3 id="articleHeader1">2.差分方程</h3>
<p>说到差分方程也许很多人会头疼，不过也没本法，疼就疼会吧！这个知识点在高数里讲微分方程那一节，如果不明白，就算了吧！记住下面的用法也不错，不过为了逼格我们还是简单的介绍下。</p>
<blockquote>在数学上，递推关系（recurrence relation），也就是差分方程（difference equation），是一种递推地定义一个序列的方程式：序列的每一项目是定义为前一项的函数。某些简单定义的递推关系式可能会表现出非常复杂的（混沌的）性质，他们属于数学中的非线性分析领域。</blockquote>
<p>记住一点，<strong>序列的每一项是定义为前一项的函数</strong>，我们用的就是这个原理。他的图像如果用matalab来绘制就是下面这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVEoPD?w=465&amp;h=334" src="https://static.alili.tech/img/bVEoPD?w=465&amp;h=334" alt="![](pic/liquaid2.png)" title="![](pic/liquaid2.png)" style="cursor: pointer; display: inline;"></span></p>
<p>只关注原函数，红色的那条曲线就可以了，是不是特别像水波。我们要做的就是让那一堆点按照这样的波形去排列。</p>
<h3 id="articleHeader2">3.代码实现</h3>
<h4>1.准备工作</h4>
<p>下面就到了大家最喜欢的代码时间。首先，我们创建一个点类Vertexes, 它的作用就是定义并更新那一堆点，代码在<code>vertex.js</code>中，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vertex(x,y,baseY){
        this.baseY = baseY;         //基线
        this.x = x;                 //点的坐标
        this.y = y;            
        this.vy = 0;                //竖直方向的速度
        this.targetY = 0;           //目标位置
        this.friction = 0.15;       //摩擦力
        this.deceleration = 0.95;   //减速
    }
//y坐标更新
Vertex.prototype.updateY = function(diffVal){
        this.targetY = diffVal + this.baseY;   //改变目标位置
        this.vy += (this.targetY - this.y);       //速度
        this.vy *= this.deceleration;
        this.y += this.vy * this.friction;     //改变坐标竖直方向的位置
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">function</span> Vertex(x,y,baseY){
        this.baseY = baseY;         //基线
        this.x = x;                 //点的坐标
        this.y = y;            
        this.vy = 0;                //竖直方向的速度
        this.targetY = 0;           //目标位置
        this.friction = 0.15;       //摩擦力
        this.deceleration = 0.95;   //减速
    }
//y坐标更新
Vertex.prototype.updateY = <span class="hljs-keyword">function</span>(diffVal){
        this.targetY = diffVal + this.baseY;   //改变目标位置
        this.vy += (this.targetY - this.y);       //速度
        this.vy *= this.deceleration;
        this.y += this.vy * this.friction;     //改变坐标竖直方向的位置
    }
</code></pre>
<p>我们要用这个函数去创建那一堆点。回到我们的主文件index.js中。我们先初始化一些要用的东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

var color1 = &quot;#6ca0f6&quot;,    //矩形1的颜色
    color2 = &quot;#367aec&quot;;   //矩形2的颜色
    
var vertexes = [],    //顶点坐标
    verNum = 250,     //顶点数
    diffPt = [],      //差分值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),
    ctx = canvas.getContext(<span class="hljs-string">'2d'</span>),
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

var color1 = <span class="hljs-string">"#6ca0f6"</span>,    //矩形1的颜色
    color2 = <span class="hljs-string">"#367aec"</span>;   //矩形2的颜色
    
var vertexes = [],    //顶点坐标
    verNum = 250,     //顶点数
    diffPt = [],      //差分值</code></pre>
<p>然后，创建点并把它<code>push</code>进<code>vertexes</code>中，同时也创建相应数量的差分值，同样把它放到<code>diffPt</code>数组中，这样每个点都有了对应的差分值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0; i<verNum; i++){
    vertexes[i] = new Vertex(W/(verNum-1)*i, H/2, H/2);
    diffPt[i] = 0;                                         //初始值都为0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">for</span>(var i=0; i&lt;verNum; i++){
    vertexes[i] = new Vertex(W/(verNum-1)*i, H/2, H/2);
    diffPt[i] = 0;                                         //初始值都为0
}</code></pre>
<p>结果是，每个顶点的<code>y</code>坐标都在（<code>H/2</code>）的高度，水平坐标每隔一定的间隔取一个点。在这里是每隔4.5个像素取一个点，这与你canvas的宽度和点的数目有关。这样我们就把点创建完成了，来绘制一下看看效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVEoPS?w=725&amp;h=423" src="https://static.alili.tech/img/bVEoPS?w=725&amp;h=423" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
        
        //矩形1
        ctx.save()
        ctx.fillStyle = color1;
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(vertexes[0].x, vertexes[0].y);
        for(var i=1; i<vertexes.length; i++){
            ctx.lineTo(vertexes[i].x, vertexes[i].y);
        }
        ctx.lineTo(W,H);
        ctx.lineTo(0,H);
        ctx.fill();
        ctx.restore();
        
        //矩形2
        ctx.save();
        ctx.fillStyle = color2;
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(vertexes[0].x, vertexes[0].y+5);
        for(var i=1; i<vertexes.length; i++){
            ctx.lineTo(vertexes[i].x, vertexes[i].y+5);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.fill();
        ctx.restore();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">draw</span></span>(){
        
        //矩形1
        ctx.save()
        ctx.fillStyle = color1;
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(vertexes[0].x, vertexes[0].y);
        <span class="hljs-keyword">for</span>(var i=1; i&lt;vertexes.length; i++){
            ctx.lineTo(vertexes[i].x, vertexes[i].y);
        }
        ctx.lineTo(W,H);
        ctx.lineTo(0,H);
        ctx.fill();
        ctx.restore();
        
        //矩形2
        ctx.save();
        ctx.fillStyle = color2;
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(vertexes[0].x, vertexes[0].y+5);
        <span class="hljs-keyword">for</span>(var i=1; i&lt;vertexes.length; i++){
            ctx.lineTo(vertexes[i].x, vertexes[i].y+5);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.fill();
        ctx.restore();
}</code></pre>
<p>就像你看到的那样此时我们的液面完全是静止的（因为没更新点嘛）。之所以要绘制两个矩形，你看看效果图就明白了，只是为了更好看，你完全可以绘制第三层，第四层。下面我们就来更新这些点的坐标。</p>
<h4>2.核心代码</h4>
<p>点的更新我们放在了<code>update</code>函数中。首先，我们设置一个初始的<strong>震荡点</strong>,<strong>缓冲变量</strong>和<strong>初始差分值</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vPos = 125;  //震荡点
var dd = 15;     //缓冲
var autoDiff = 1000;  //初始差分值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var vPos = 125;  //震荡点
var dd = 15;     //缓冲
var autoDiff = 1000;  //初始差分值</code></pre>
<p>这里的震荡点就是我们的起震位置，意思是<code>vertexes</code>中的第<code>125</code>号点开始起震，它对应的差分值就是<code>autoDiff</code>。它的改变会引起其他点的变化，从而达到更新其他差分值的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function update(){
        autoDiff -= autoDiff*0.9;        //1
        diffPt[vPos] = autoDiff;         

        //左侧
        for(var i=vPos-1; i>0; i--){     //2
            var d = vPos-i;
            if(d > dd){
                d=dd;
            }
            diffPt[i]-=(diffPt[i] - diffPt[i+1])*(1-0.01*d);
        }
        //右侧
        for(var i=vPos+1; i<verNum; i++){   //3
            var d = i-vPos;
            if(d>dd){
                d=dd;
            }
            diffPt[i] -= (diffPt[i] - diffPt[i-1])*(1-0.01*d);
        }

        //更新Y坐标
        for(var i=0; i<vertexes.length; i++){  //4
            vertexes[i].updateY(diffPt[i]);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">update</span></span>(){
        autoDiff -= autoDiff*0.9;        //1
        diffPt[vPos] = autoDiff;         

        //左侧
        <span class="hljs-keyword">for</span>(var i=vPos-1; i&gt;0; i--){     //2
            var d = vPos-i;
            <span class="hljs-keyword">if</span>(d &gt; dd){
                d=dd;
            }
            diffPt[i]-=(diffPt[i] - diffPt[i+1])*(1-0.01*d);
        }
        //右侧
        <span class="hljs-keyword">for</span>(var i=vPos+1; i&lt;verNum; i++){   //3
            var d = i-vPos;
            <span class="hljs-keyword">if</span>(d&gt;dd){
                d=dd;
            }
            diffPt[i] -= (diffPt[i] - diffPt[i-1])*(1-0.01*d);
        }

        //更新Y坐标
        <span class="hljs-keyword">for</span>(var i=0; i&lt;vertexes.length; i++){  //4
            vertexes[i].updateY(diffPt[i]);
        }
    }</code></pre>
<p>现在我们对上面的部分做详细解释：<br>代码1： 我们设置了起震位置的差分偏移量为<code>autoDiff=100</code>,注意<code>autoDiff -= autoDiff*0.9;</code>, 也就是说它的值每一帧都会变化。</p>
<p>代码2：为起震位置的左边，主要关注<code>diffPt[i]-=(diffPt[i] - diffPt[i+1])*(1-0.01*d);</code>这一行。<code>i</code>的起始位置为<code>124</code>，默认差分值为<code>0</code>。稍作简单推算，你会发现，经过更新后第<code>124</code>号点的差分值为<code>99</code>，同理第<code>123</code>号为<code>97.02</code>。以此类推，我们就可以得到第一帧的所有点的差分值。右边同理。</p>
<p>代码4：在得到第一帧的差分值后就该调用每个点的更新函数了，并且传入计算好的差分值。形成的效果如下图所示</p>
<p><span class="img-wrap"><img data-src="/img/bVEoP4?w=483&amp;h=276" src="https://static.alili.tech/img/bVEoP4?w=483&amp;h=276" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看一下<code>updateY</code>函数，我们把目标位置<code>targetY</code>设置为差分值<code>diffVal</code>和基线<code>baseY</code>的和。然后，通过距离计算需要运动的速度<code>vy</code>,最后将速度作用于点的纵坐标。这一段是不是与弹性动画缓动动画那一节很相似呢？</p>
<p>在缓冲系数dd的作用下，两侧的波会在扩散的过程中越来越小，最后趋近于0.<strong>我们也是通过这个变量去控制液体的粘度系数</strong>，达到粘稠度高的物体扩散的越缓慢并且起伏比较低，粘稠度低的物体扩散迅速但起伏大的效果。</p>
<p>随后，因为<code>autoDiff</code>的不断衰减，<strong>不同幅值波形的叠加形成波浪效果，最终衰减到0.液面也就趋于平静了</strong>。</p>
<p>现在，我们把update()和draw()放入动画循环中你就会看到水波起伏然后趋于平静的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function drawframe(){
        ctx.clearRect(0, 0, W, H);
        window.requestAnimationFrame(drawframe, canvas);
        update()
        draw();
    })()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">(<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawframe</span></span>(){
        ctx.clearRect(0, 0, W, H);
        window.requestAnimationFrame(drawframe, canvas);
        update()
        draw();
    })()
</code></pre>
<h4>3.鼠标交互</h4>
<p>上面的代码已经实现了波浪动画的效果，但是震荡完成后就平静了，不会再发生震荡的效果。这一步我们就来实现点哪，哪震的效果。实现的思路很简单：<strong>水波之所以区域平静是因为起震位置的差分值不断衰减的结果，我们只需要在点击鼠标的位置重设<code>autoDiff</code>就可以了。此外，起震点的位置也要变成鼠标点击的位置。</strong>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="canvas.addEventListener('mousedown', function(e){
        var mouse = {x:null, y:null};

        if(e.pageX||e.pageY){
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        }else{
            mouse.x = e.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
            mouse.y = e.clientY + document.body.scrollTop +document.documentElement.scrollTop;
        }

        //重设差分值
        if(mouse.y>(H/2-50) &amp;&amp; mouse.y<(H/2 +50)){
            autoDiff = 1000;
            vPos = 1 + Math.floor((verNum - 2) * mouse.x / W);
            diffPt[vPos] = autoDiff;
        }

        console.log(mouse.x, mouse.y)

    }, false)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">canvas.addEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-keyword">function</span>(e){
        var mouse = {x:null, y:null};

        <span class="hljs-keyword">if</span>(e.pageX||e.pageY){
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        }<span class="hljs-keyword">else</span>{
            mouse.x = e.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
            mouse.y = e.clientY + document.body.scrollTop +document.documentElement.scrollTop;
        }

        //重设差分值
        <span class="hljs-keyword">if</span>(mouse.y&gt;(H/2-50) &amp;&amp; mouse.y&lt;(H/2 +50)){
            autoDiff = 1000;
            vPos = 1 + Math.floor((verNum - 2) * mouse.x / W);
            diffPt[vPos] = autoDiff;
        }

        console.log(mouse.x, mouse.y)

    }, <span class="hljs-literal">false</span>)
</code></pre>
<p>在获取鼠标位置这里应该注意一点，我们没有减去canvas的偏移量，这是因为在这里canvas做的是全屏设置。所以，如果你的画布并不是全屏大小，建议你使用我们的<code>utils.js</code>文件中的方法<code>captureMouse</code>来获取鼠标的坐标。</p>
<p>另外在判断鼠标是否点击在了液面上，我们设定了一个比较宽的范围，上下共100px。这样做的目的是让用户很容易就能触发这个事件，而不是只在页面那唯一的一个值上才能触发。这种做法相信你以前做过，对于比较小的物体我们会遮罩一个大一些的透明物体，然后在该物体上做事件的触发，便于用户操作。</p>
<p>其他的颜色改变等细小功能就不做过多的介绍了,see you！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——差分函数的妙用

## 原文链接
[https://segmentfault.com/a/1190000007206262](https://segmentfault.com/a/1190000007206262)


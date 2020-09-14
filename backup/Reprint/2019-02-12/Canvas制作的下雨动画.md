---
title: 'Canvas制作的下雨动画' 
date: 2019-02-12 2:30:12
hidden: true
slug: 5hxilgnyr7
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">简介</h3>
<p>在codepen上看到一个Canvas做的下雨效果动画，感觉蛮有意思的。就研究了下，这里来分享下，实现技巧。效果可以见下面的链接。</p>
<p>霓虹雨: <a href="http://codepen.io/natewiley/full/NNgqVJ/%20" rel="nofollow noreferrer" target="_blank">http://codepen.io/natewiley/full/NNgqVJ/</a></p>
<p>效果截图：<br><span class="img-wrap"><img data-src="/img/bVtSJ8" src="https://static.alili.tech/img/bVtSJ8" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">Canvas动画基础</h3>
<p>大家都知道，Canvas其实只是一个画板。我们可以应用canvas的api在上面绘制各种图形。<br>Canvas 2D 的API：<br><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D%20" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D</a></p>
<p>那么Canvas绘制动画的步骤就是：</p>
<ol>
<li><p>绘制第一帧图形（利用API绘图）</p></li>
<li><p>清空画板(应用clearRect()或fillRect())</p></li>
<li><p>绘制下一帧动画</p></li>
</ol>
<p>用什么来控制动画每一帧的绘制时间呢？大家很容易想到 window.setInterval()和window.setTimeout()。没错用这两个也可以。除此之外，后来又出现一个新的方法：window.requestAnimationFrame(callback)。</p>
<p>requestAnimationFrame会告诉浏览器你要绘制一个动画。让浏览器要重绘时调用你指定的方法（callback）来绘制你的动画。<br>使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0,0,w,h);
    for(var i in drops){
        drops[i].draw();
    }
    requestAnimationFrame(anim);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anim</span><span class="hljs-params">()</span> </span>{
    ctx.fillStyle = clearColor;
    ctx.fillRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,w,h);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> drops){
        drops[i].draw();
    }
    requestAnimationFrame(anim);
}
</code></pre>
<p>一般情况下优先使用requestAnimationFrame能保持动画绘制的频率和浏览器重绘的频率一致。不幸的是requestAnimationFrame的兼容性还不是很好。IE9以下和addroid 4.3以下好像不支持这个属性。不支持的浏览器要用setInterval或setTimeout做兼容。</p>
<h3 id="articleHeader2">雨滴下落效果</h3>
<p>首先来讲讲雨滴下落的效果如何制作。雨滴其实是一个长方形，然后加残影。残影的绘制可以说是雨滴下落的关键。残影是通过在前进的方向每一帧都绘制一个半透明的背景和一个长方形,然后前面绘制的图形叠加产生的效果。由于前进方向的图形最后绘制，所以显得明亮，后面的图形叠加的比较多，所以视觉上减弱。整体看起来后面的就像残影。这里绘制具有透明度背景是关键,否则产生不了叠加效果。</p>
<p>那么来绘制个雨滴看看。首先准备一个画板:<br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>霓虹雨</title>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;>
    <style type=&quot;text/css&quot;>
        .bg {
            background: #000;
            overflow: hidden;
        }
    </style>

</head>
<body class=&quot;bg&quot;>
<canvas id=&quot;canvas-club&quot;></canvas>
<script type=&quot;text/javascript&quot; src=&quot;raindrop.js&quot;></script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>霓虹雨<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.bg</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas-club"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"raindrop.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>我在js文件里绘制动画（raindrop.js），代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var c = document.getElementById(&quot;canvas-club&quot;);
var ctx = c.getContext(&quot;2d&quot;);//获取canvas上下文
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;//设置canvas宽、高
var clearColor = 'rgba(0, 0, 0, .1)';//画板背景,注意最后的透明度0.1 这是产生叠加效果的基础

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function RainDrop(){}
//雨滴对象 这是绘制雨滴动画的关键
RainDrop.prototype = {
    init:function(){
        this.x =  random(0, w);//雨滴的位置x
        this.y = 0;//雨滴的位置y
        this.color = 'hsl(180, 100%, 50%)';//雨滴颜色 长方形的填充色
        this.vy = random(4, 5);//雨滴下落速度
        this.hit = random(h * .8, h * .9);//下落的最大值
        this.size = 2;//长方形宽度
    },
    draw:function(){
        if (this.y < this.hit) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size * 5);//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
        }
        this.update();//更新位置
    },
    update:function(){
        if(this.y < this.hit){
            this.y += this.vy;//未达到底部，增加雨滴y坐标
        }else{
            this.init();
        }
    }
};

function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

//初始化一个雨滴
var r = new RainDrop();
r.init();

function anim() {
    ctx.fillStyle = clearColor;//每一帧都填充背景色
    ctx.fillRect(0,0,w,h);//填充背景色，注意不要用clearRect，否则会清空前面的雨滴，导致不能产生叠加的效果
    r.draw();//绘制雨滴
    requestAnimationFrame(anim);//控制动画帧
}

window.addEventListener(&quot;resize&quot;, resize);
//启动动画
anim();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> c = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"canvas-club"</span>);
<span class="hljs-keyword">var</span> ctx = c.getContext(<span class="hljs-string">"2d"</span>);<span class="hljs-comment">//获取canvas上下文</span>
<span class="hljs-keyword">var</span> w = c.width = <span class="hljs-built_in">window</span>.innerWidth;
<span class="hljs-keyword">var</span> h = c.height = <span class="hljs-built_in">window</span>.innerHeight;<span class="hljs-comment">//设置canvas宽、高</span>
<span class="hljs-keyword">var</span> clearColor = <span class="hljs-string">'rgba(0, 0, 0, .1)'</span>;<span class="hljs-comment">//画板背景,注意最后的透明度0.1 这是产生叠加效果的基础</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">random</span>(<span class="hljs-params">min, max</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random() * (max - min) + min;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RainDrop</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-comment">//雨滴对象 这是绘制雨滴动画的关键</span>
RainDrop.prototype = {
    <span class="hljs-attr">init</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.x =  random(<span class="hljs-number">0</span>, w);<span class="hljs-comment">//雨滴的位置x</span>
        <span class="hljs-keyword">this</span>.y = <span class="hljs-number">0</span>;<span class="hljs-comment">//雨滴的位置y</span>
        <span class="hljs-keyword">this</span>.color = <span class="hljs-string">'hsl(180, 100%, 50%)'</span>;<span class="hljs-comment">//雨滴颜色 长方形的填充色</span>
        <span class="hljs-keyword">this</span>.vy = random(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>);<span class="hljs-comment">//雨滴下落速度</span>
        <span class="hljs-keyword">this</span>.hit = random(h * <span class="hljs-number">.8</span>, h * <span class="hljs-number">.9</span>);<span class="hljs-comment">//下落的最大值</span>
        <span class="hljs-keyword">this</span>.size = <span class="hljs-number">2</span>;<span class="hljs-comment">//长方形宽度</span>
    },
    <span class="hljs-attr">draw</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.y &lt; <span class="hljs-keyword">this</span>.hit) {
            ctx.fillStyle = <span class="hljs-keyword">this</span>.color;
            ctx.fillRect(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-keyword">this</span>.size, <span class="hljs-keyword">this</span>.size * <span class="hljs-number">5</span>);<span class="hljs-comment">//绘制长方形，通过多次叠加长方形，形成雨滴下落效果</span>
        }
        <span class="hljs-keyword">this</span>.update();<span class="hljs-comment">//更新位置</span>
    },
    <span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.y &lt; <span class="hljs-keyword">this</span>.hit){
            <span class="hljs-keyword">this</span>.y += <span class="hljs-keyword">this</span>.vy;<span class="hljs-comment">//未达到底部，增加雨滴y坐标</span>
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.init();
        }
    }
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resize</span>(<span class="hljs-params"></span>)</span>{
    w = c.width = <span class="hljs-built_in">window</span>.innerWidth;
    h = c.height = <span class="hljs-built_in">window</span>.innerHeight;
}

<span class="hljs-comment">//初始化一个雨滴</span>
<span class="hljs-keyword">var</span> r = <span class="hljs-keyword">new</span> RainDrop();
r.init();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anim</span>(<span class="hljs-params"></span>) </span>{
    ctx.fillStyle = clearColor;<span class="hljs-comment">//每一帧都填充背景色</span>
    ctx.fillRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,w,h);<span class="hljs-comment">//填充背景色，注意不要用clearRect，否则会清空前面的雨滴，导致不能产生叠加的效果</span>
    r.draw();<span class="hljs-comment">//绘制雨滴</span>
    requestAnimationFrame(anim);<span class="hljs-comment">//控制动画帧</span>
}

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"resize"</span>, resize);
<span class="hljs-comment">//启动动画</span>
anim();
</code></pre>
<h3 id="articleHeader3">涟漪效果</h3>
<p>接着来绘制涟漪效果。与绘制雨滴的方式类似,也是通过具有透明度的背景来叠加前面的图像产生内阴影的效果。</p>
<p>代码如下（rippling.js）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var c = document.getElementById(&quot;canvas-club&quot;);
var ctx = c.getContext(&quot;2d&quot;);//获取canvas上下文
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;//设置canvas宽、高
var clearColor = 'rgba(0, 0, 0, .1)';//画板背景,注意最后的透明度0.1 这是产生叠加效果的基础

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Rippling(){}
//涟漪对象 这是涟漪动画的主要部分
Rippling.prototype = {
    init:function(){
        this.x = random(0,w);//涟漪x坐标
        this.y = random(h * .8, h * .9);//涟漪y坐标
        this.w = 2;//椭圆形涟漪宽
        this.h = 1;//椭圆涟漪高
        this.vw = 3;//宽度增长速度
        this.vh = 1;//高度增长速度
        this.a = 1;//透明度
        this.va = .96;//涟漪消失的渐变速度
    },
    draw:function(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.h / 2);
        //绘制右弧线
        ctx.bezierCurveTo(
            this.x + this.w / 2, this.y - this.h / 2,
            this.x + this.w / 2, this.y + this.h / 2,
            this.x, this.y + this.h / 2);
        //绘制左弧线
        ctx.bezierCurveTo(
            this.x - this.w / 2, this.y + this.h / 2,
            this.x - this.w / 2, this.y - this.h / 2,
            this.x, this.y - this.h / 2);
        
        ctx.strokeStyle = 'hsla(180, 100%, 50%, '+this.a+')';
        ctx.stroke();
        ctx.closePath();
        this.update();//更新坐标
    },
    update:function(){
        if(this.a > .03){
            this.w += this.vw;//宽度增长
            this.h += this.vh;//高度增长
            if(this.w > 100){
                this.a *= this.va;//当宽度超过100，涟漪逐渐变淡消失
                this.vw *= .98;//宽度增长变缓慢
                this.vh *= .98;//高度增长变缓慢
            }
        } else {
            this.init();
        }

    }
};

function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

//初始化一个涟漪
var r = new Rippling();
r.init();

function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0,0,w,h);
    r.draw();
    requestAnimationFrame(anim);
}

window.addEventListener(&quot;resize&quot;, resize);
//启动动画
anim();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> c = document.getElementById(<span class="hljs-string">"canvas-club"</span>);
<span class="hljs-keyword">var</span> ctx = c.getContext(<span class="hljs-string">"2d"</span>);<span class="hljs-comment">//获取canvas上下文</span>
<span class="hljs-keyword">var</span> w = c.width = window.innerWidth;
<span class="hljs-keyword">var</span> h = c.height = window.innerHeight;<span class="hljs-comment">//设置canvas宽、高</span>
<span class="hljs-keyword">var</span> clearColor = <span class="hljs-string">'rgba(0, 0, 0, .1)'</span>;<span class="hljs-comment">//画板背景,注意最后的透明度0.1 这是产生叠加效果的基础</span>

function random(min, max) {
    <span class="hljs-keyword">return</span> Math.random() * (max - min) + min;
}

function Rippling(){}
<span class="hljs-comment">//涟漪对象 这是涟漪动画的主要部分</span>
Rippling.prototype = {
    init:function(){
        <span class="hljs-keyword">this</span>.x = random(<span class="hljs-number">0</span>,w);<span class="hljs-comment">//涟漪x坐标</span>
        <span class="hljs-keyword">this</span>.y = random(h * <span class="hljs-number">.8</span>, h * <span class="hljs-number">.9</span>);<span class="hljs-comment">//涟漪y坐标</span>
        <span class="hljs-keyword">this</span>.w = <span class="hljs-number">2</span>;<span class="hljs-comment">//椭圆形涟漪宽</span>
        <span class="hljs-keyword">this</span>.h = <span class="hljs-number">1</span>;<span class="hljs-comment">//椭圆涟漪高</span>
        <span class="hljs-keyword">this</span>.vw = <span class="hljs-number">3</span>;<span class="hljs-comment">//宽度增长速度</span>
        <span class="hljs-keyword">this</span>.vh = <span class="hljs-number">1</span>;<span class="hljs-comment">//高度增长速度</span>
        <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1</span>;<span class="hljs-comment">//透明度</span>
        <span class="hljs-keyword">this</span>.va = <span class="hljs-number">.96</span>;<span class="hljs-comment">//涟漪消失的渐变速度</span>
    },
    draw:function(){
        ctx.beginPath();
        ctx.moveTo(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y - <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>);
        <span class="hljs-comment">//绘制右弧线</span>
        ctx.bezierCurveTo(
            <span class="hljs-keyword">this</span>.x + <span class="hljs-keyword">this</span>.w / <span class="hljs-number">2</span>, <span class="hljs-keyword">this</span>.y - <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>,
            <span class="hljs-keyword">this</span>.x + <span class="hljs-keyword">this</span>.w / <span class="hljs-number">2</span>, <span class="hljs-keyword">this</span>.y + <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>,
            <span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y + <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>);
        <span class="hljs-comment">//绘制左弧线</span>
        ctx.bezierCurveTo(
            <span class="hljs-keyword">this</span>.x - <span class="hljs-keyword">this</span>.w / <span class="hljs-number">2</span>, <span class="hljs-keyword">this</span>.y + <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>,
            <span class="hljs-keyword">this</span>.x - <span class="hljs-keyword">this</span>.w / <span class="hljs-number">2</span>, <span class="hljs-keyword">this</span>.y - <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>,
            <span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y - <span class="hljs-keyword">this</span>.h / <span class="hljs-number">2</span>);
        
        ctx.strokeStyle = <span class="hljs-string">'hsla(180, 100%, 50%, '</span>+<span class="hljs-keyword">this</span>.a+<span class="hljs-string">')'</span>;
        ctx.stroke();
        ctx.closePath();
        <span class="hljs-keyword">this</span>.update();<span class="hljs-comment">//更新坐标</span>
    },
    update:function(){
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.a &gt; <span class="hljs-number">.03</span>){
            <span class="hljs-keyword">this</span>.w += <span class="hljs-keyword">this</span>.vw;<span class="hljs-comment">//宽度增长</span>
            <span class="hljs-keyword">this</span>.h += <span class="hljs-keyword">this</span>.vh;<span class="hljs-comment">//高度增长</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.w &gt; <span class="hljs-number">100</span>){
                <span class="hljs-keyword">this</span>.a *= <span class="hljs-keyword">this</span>.va;<span class="hljs-comment">//当宽度超过100，涟漪逐渐变淡消失</span>
                <span class="hljs-keyword">this</span>.vw *= <span class="hljs-number">.98</span>;<span class="hljs-comment">//宽度增长变缓慢</span>
                <span class="hljs-keyword">this</span>.vh *= <span class="hljs-number">.98</span>;<span class="hljs-comment">//高度增长变缓慢</span>
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.init();
        }

    }
};

function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

<span class="hljs-comment">//初始化一个涟漪</span>
<span class="hljs-keyword">var</span> r = new Rippling();
r.init();

function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,w,h);
    r.draw();
    requestAnimationFrame(anim);
}

window.addEventListener(<span class="hljs-string">"resize"</span>, resize);
<span class="hljs-comment">//启动动画</span>
anim();
</code></pre>
<h3 id="articleHeader4">总结</h3>
<p>这样大家对整个下雨效果的制作方法，应该有一定的了解了。Canvas用来绘制动画的效果确实能让人眼前一亮，让web的视觉效果提升一大截。发动自己的智慧，相信能做出更多奇妙的动画。这是我越来越喜欢web的原因之一吧 O(∩_∩)O~~。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Canvas制作的下雨动画

## 原文链接
[https://segmentfault.com/a/1190000004699623](https://segmentfault.com/a/1190000004699623)


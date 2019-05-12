---
title: '前端小项目：使用canvas绘画哆啦A梦' 
date: 2019-01-15 2:30:12
hidden: true
slug: o9wgldnkcgd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近在学canvas元素,&lt;canvas&gt;标签只是图形容器，必须使用js来绘制图形。为了增强对canvas元素的理解,于是用canvas画了一个哆啦A梦来</p></blockquote>
<p><strong>要实现的效果图</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319551?w=816&amp;h=1106" src="https://static.alili.tech/img/remote/1460000009319551?w=816&amp;h=1106" alt="哆啦A梦" title="哆啦A梦" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p><a href="https://shenzekun.github.io/doraemon/Doraemon.html" rel="nofollow noreferrer" target="_blank">在线预览</a></p></blockquote>
<p>要想绘画出这个哆啦a梦首先要掌握以下一些函数：</p>
<ul>
<li><p><a href="http://www.365mini.com/page/html5-canvas-arcto.htm" rel="nofollow noreferrer" target="_blank">arcTo()</a></p></li>
<li><p><a href="http://www.365mini.com/page/html5-canvas-circle.htm" rel="nofollow noreferrer" target="_blank">canvas绘制圆形或弧线</a></p></li>
<li><p><a href="http://www.w3school.com.cn/tags/canvas_beziercurveto.asp" rel="nofollow noreferrer" target="_blank">bezierCurveTo()</a></p></li>
<li><p><a href="http://www.w3school.com.cn/tags/canvas_quadraticcurveto.asp" rel="nofollow noreferrer" target="_blank">quadraticCurveTo() </a></p></li>
</ul>
<p>开始绘画！！</p>
<p>首先我们需要创建一个400*600的画布，代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <canvas id=&quot;doraemon&quot; width=&quot;400&quot; height=&quot;600&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"> &lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"doraemon"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"400"</span> height=<span class="hljs-string">"600"</span>&gt;&lt;/canvas&gt;</code></pre>
<p>接着定义一个div，用来显示坐标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;put&quot; style=&quot;width: 50px&quot; height=&quot;20px&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"put"</span> style=<span class="hljs-string">"width: 50px"</span> height=<span class="hljs-string">"20px"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>接着我写了一个显示坐标的函数，可以用来看大概画到哪个点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function zuobiao(event) {
        var x = event.clientX;
        var y = event.clientY;
        var out = document.getElementById(&quot;put&quot;);
        out.innerHTML = &quot;x:&quot; + x + &quot; y:&quot; + y;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function">function <span class="hljs-title">zuobiao</span>(<span class="hljs-params"><span class="hljs-keyword">event</span></span>) </span>{
        <span class="hljs-keyword">var</span> x = <span class="hljs-keyword">event</span>.clientX;
        <span class="hljs-keyword">var</span> y = <span class="hljs-keyword">event</span>.clientY;
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">out</span> = document.getElementById(<span class="hljs-string">"put"</span>);
        <span class="hljs-keyword">out</span>.innerHTML = <span class="hljs-string">"x:"</span> + x + <span class="hljs-string">" y:"</span> + y;
    }</code></pre>
<p>然后getContext() 方法返回一个用于在画布上绘图的环境。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cxt = document.getElementById('doraemon').getContext('2d');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> cxt = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'doraemon'</span>).getContext(<span class="hljs-string">'2d'</span>);</code></pre>
<p>接着开始画头部:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();//起始路径
        cxt.lineWidth = 1;//线宽度为1
        cxt.strokeStyle = '#000';//笔触的颜色
        cxt.arc(200, 175, 175, 0.7 * Math.PI, 0.3 * Math.PI);//绘制弧，中心点（200，175），半径175
        cxt.fillStyle = '#0bb0da';//设置填充时的颜色
        cxt.fill();//填充颜色
        cxt.stroke();//绘制路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();<span class="hljs-comment">//起始路径</span>
        cxt.lineWidth = <span class="hljs-number">1</span>;<span class="hljs-comment">//线宽度为1</span>
        cxt.strokeStyle = '#<span class="hljs-number">000</span>';<span class="hljs-comment">//笔触的颜色</span>
        cxt.arc(<span class="hljs-number">200</span>, <span class="hljs-number">175</span>, <span class="hljs-number">175</span>, <span class="hljs-number">0.7</span> * Math.<span class="hljs-literal">PI</span>, <span class="hljs-number">0.3</span> * Math.<span class="hljs-literal">PI</span>);<span class="hljs-comment">//绘制弧，中心点（200，175），半径175</span>
        cxt.fillStyle = '#<span class="hljs-number">0</span>bb0da';<span class="hljs-comment">//设置填充时的颜色</span>
        cxt.fill();<span class="hljs-comment">//填充颜色</span>
        cxt.stroke();<span class="hljs-comment">//绘制路径</span></code></pre>
<p>头部如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319552?w=752&amp;h=622" src="https://static.alili.tech/img/remote/1460000009319552?w=752&amp;h=622" alt="头部" title="头部" style="cursor: pointer; display: inline;"></span></p>
<p>接着绘画出脸部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.moveTo(110, 110);//将路径移到点（110，110），不创建线条
        cxt.quadraticCurveTo(-10, 200, 120, 315);//创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)
        cxt.lineTo(280, 315);//添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条
        cxt.quadraticCurveTo(410, 210, 290, 110);
        cxt.lineTo(110, 110);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.moveTo(<span class="hljs-number">110</span>, <span class="hljs-number">110</span>);<span class="hljs-comment">//将路径移到点（110，110），不创建线条</span>
        cxt.quadraticCurveTo(<span class="hljs-number">-10</span>, <span class="hljs-number">200</span>, <span class="hljs-number">120</span>, <span class="hljs-number">315</span>);<span class="hljs-comment">//创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)</span>
        cxt.lineTo(<span class="hljs-number">280</span>, <span class="hljs-number">315</span>);<span class="hljs-comment">//添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条</span>
        cxt.quadraticCurveTo(<span class="hljs-number">410</span>, <span class="hljs-number">210</span>, <span class="hljs-number">290</span>, <span class="hljs-number">110</span>);
        cxt.lineTo(<span class="hljs-number">110</span>, <span class="hljs-number">110</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>脸部如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000009319553?w=754&amp;h=658" src="https://static.alili.tech/img/remote/1460000009319553?w=754&amp;h=658" alt="脸部" title="脸部" style="cursor: pointer;"></span></p>
<p>接着绘画眼睛：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.lineWidth = 1;
        cxt.fillStyle = '#fff';
        cxt.moveTo(110, 110);
        cxt.bezierCurveTo(110, 25, 200, 25, 200, 100);//创建三次贝塞尔曲线,控制点1(110,25),控制点2(200,25),结束点(200,100)，也就是画左上半椭圆
        cxt.bezierCurveTo(200, 175, 110, 175, 110, 100);//画左下半椭圆
        cxt.moveTo(200, 100);
        cxt.bezierCurveTo(200, 25, 290, 25, 290, 100);
        cxt.bezierCurveTo(290, 175, 200, 175, 200, 100);
        cxt.fill();
        cxt.stroke();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.lineWidth = <span class="hljs-number">1</span>;
        cxt.fillStyle = '#fff';
        cxt.moveTo(<span class="hljs-number">110</span>, <span class="hljs-number">110</span>);
        cxt.bezierCurveTo(<span class="hljs-number">110</span>, <span class="hljs-number">25</span>, <span class="hljs-number">200</span>, <span class="hljs-number">25</span>, <span class="hljs-number">200</span>, <span class="hljs-number">100</span>);<span class="hljs-comment">//创建三次贝塞尔曲线,控制点1(110,25),控制点2(200,25),结束点(200,100)，也就是画左上半椭圆</span>
        cxt.bezierCurveTo(<span class="hljs-number">200</span>, <span class="hljs-number">175</span>, <span class="hljs-number">110</span>, <span class="hljs-number">175</span>, <span class="hljs-number">110</span>, <span class="hljs-number">100</span>);<span class="hljs-comment">//画左下半椭圆</span>
        cxt.moveTo(<span class="hljs-number">200</span>, <span class="hljs-number">100</span>);
        cxt.bezierCurveTo(<span class="hljs-number">200</span>, <span class="hljs-number">25</span>, <span class="hljs-number">290</span>, <span class="hljs-number">25</span>, <span class="hljs-number">290</span>, <span class="hljs-number">100</span>);
        cxt.bezierCurveTo(<span class="hljs-number">290</span>, <span class="hljs-number">175</span>, <span class="hljs-number">200</span>, <span class="hljs-number">175</span>, <span class="hljs-number">200</span>, <span class="hljs-number">100</span>);
        cxt.fill();
        cxt.stroke();
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319554?w=728&amp;h=644" src="https://static.alili.tech/img/remote/1460000009319554?w=728&amp;h=644" alt="眼睛" title="眼睛" style="cursor: pointer; display: inline;"></span></p>
<p>接着画左右眼球：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         /*右眼球*/
        cxt.beginPath();
        cxt.fillStyle = '#000';
        cxt.arc(230, 130, 12, 0, 2 * Math.PI);
        cxt.fill();
        cxt.stroke();
        /*左眼球*/
        cxt.beginPath();
        cxt.fillStyle = '#000';
        cxt.arc(170, 130, 12, 0, 2 * Math.PI);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>         <span class="hljs-comment">/*右眼球*/</span>
        cxt.beginPath();
        cxt.fillStyle = '#<span class="hljs-number">000</span>';
        cxt.arc(<span class="hljs-number">230</span>, <span class="hljs-number">130</span>, <span class="hljs-number">12</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);
        cxt.fill();
        cxt.stroke();
        <span class="hljs-comment">/*左眼球*/</span>
        cxt.beginPath();
        cxt.fillStyle = '#<span class="hljs-number">000</span>';
        cxt.arc(<span class="hljs-number">170</span>, <span class="hljs-number">130</span>, <span class="hljs-number">12</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>左右眼球：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319555?w=764&amp;h=648" src="https://static.alili.tech/img/remote/1460000009319555?w=764&amp;h=648" alt="左右眼球" title="左右眼球" style="cursor: pointer;"></span></p>
<p>接着画鼻子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.arc(200, 165, 25, 0, 2 * Math.PI);
        cxt.fillStyle = '#d05823';
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.arc(<span class="hljs-number">200</span>, <span class="hljs-number">165</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);
        cxt.fillStyle = '#d05823';
        cxt.fill();
        cxt.stroke();</code></pre>
<p>鼻子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319556?w=706&amp;h=658" src="https://static.alili.tech/img/remote/1460000009319556?w=706&amp;h=658" alt="鼻子" title="鼻子" style="cursor: pointer;"></span></p>
<p>接着画胡须：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //左胡须
        cxt.beginPath();
        cxt.moveTo(80, 175);
        cxt.lineTo(150, 195);
        cxt.moveTo(80, 200);
        cxt.lineTo(150, 205);
        cxt.moveTo(80, 225);
        cxt.lineTo(150, 215);
        //中部胡须
        cxt.moveTo(200, 195);
        cxt.lineTo(200, 290);
        //右胡须
        cxt.moveTo(250, 195);
        cxt.lineTo(320, 175);
        cxt.moveTo(250, 205);
        cxt.lineTo(320, 200);
        cxt.moveTo(250, 215);
        cxt.lineTo(320, 225);
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        <span class="hljs-comment">//左胡须</span>
        cxt.beginPath();
        cxt.moveTo(<span class="hljs-number">80</span>, <span class="hljs-number">175</span>);
        cxt.lineTo(<span class="hljs-number">150</span>, <span class="hljs-number">195</span>);
        cxt.moveTo(<span class="hljs-number">80</span>, <span class="hljs-number">200</span>);
        cxt.lineTo(<span class="hljs-number">150</span>, <span class="hljs-number">205</span>);
        cxt.moveTo(<span class="hljs-number">80</span>, <span class="hljs-number">225</span>);
        cxt.lineTo(<span class="hljs-number">150</span>, <span class="hljs-number">215</span>);
        <span class="hljs-comment">//中部胡须</span>
        cxt.moveTo(<span class="hljs-number">200</span>, <span class="hljs-number">195</span>);
        cxt.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">290</span>);
        <span class="hljs-comment">//右胡须</span>
        cxt.moveTo(<span class="hljs-number">250</span>, <span class="hljs-number">195</span>);
        cxt.lineTo(<span class="hljs-number">320</span>, <span class="hljs-number">175</span>);
        cxt.moveTo(<span class="hljs-number">250</span>, <span class="hljs-number">205</span>);
        cxt.lineTo(<span class="hljs-number">320</span>, <span class="hljs-number">200</span>);
        cxt.moveTo(<span class="hljs-number">250</span>, <span class="hljs-number">215</span>);
        cxt.lineTo(<span class="hljs-number">320</span>, <span class="hljs-number">225</span>);
        cxt.stroke();</code></pre>
<p>胡须:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319557?w=738&amp;h=640" src="https://static.alili.tech/img/remote/1460000009319557?w=738&amp;h=640" alt="胡须" title="胡须" style="cursor: pointer; display: inline;"></span></p>
<p>接着画嘴：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.moveTo(80, 240);
        cxt.quadraticCurveTo(200, 350, 320, 240);
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.moveTo(<span class="hljs-number">80</span>, <span class="hljs-number">240</span>);
        cxt.quadraticCurveTo(<span class="hljs-number">200</span>, <span class="hljs-number">350</span>, <span class="hljs-number">320</span>, <span class="hljs-number">240</span>);
        cxt.stroke();</code></pre>
<p>嘴：<br><span class="img-wrap"><img data-src="/img/remote/1460000009319558?w=748&amp;h=652" src="https://static.alili.tech/img/remote/1460000009319558?w=748&amp;h=652" alt="嘴" title="嘴" style="cursor: pointer; display: inline;"></span></p>
<p>接下来画围巾：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.moveTo(96, 316);
        cxt.lineTo(305, 316);
        cxt.lineTo(320, 316);
        cxt.arcTo(330, 316, 330, 326, 10);//在画布上创建介于两个切线之间的弧，起点坐标为(330,316),终点坐标为(330,326),半径为10
        cxt.lineTo(330, 336);
        cxt.arcTo(330, 346, 305, 346, 10);
        cxt.lineTo(81, 346);
        cxt.arcTo(71, 346, 71, 336, 10);
        cxt.lineTo(71, 326);
        cxt.arcTo(71, 316, 81, 316, 10);
        cxt.lineTo(96, 316);
        cxt.fillStyle = '#b13209';
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.moveTo(<span class="hljs-number">96</span>, <span class="hljs-number">316</span>);
        cxt.lineTo(<span class="hljs-number">305</span>, <span class="hljs-number">316</span>);
        cxt.lineTo(<span class="hljs-number">320</span>, <span class="hljs-number">316</span>);
        cxt.arcTo(<span class="hljs-number">330</span>, <span class="hljs-number">316</span>, <span class="hljs-number">330</span>, <span class="hljs-number">326</span>, <span class="hljs-number">10</span>);<span class="hljs-comment">//在画布上创建介于两个切线之间的弧，起点坐标为(330,316),终点坐标为(330,326),半径为10</span>
        cxt.lineTo(<span class="hljs-number">330</span>, <span class="hljs-number">336</span>);
        cxt.arcTo(<span class="hljs-number">330</span>, <span class="hljs-number">346</span>, <span class="hljs-number">305</span>, <span class="hljs-number">346</span>, <span class="hljs-number">10</span>);
        cxt.lineTo(<span class="hljs-number">81</span>, <span class="hljs-number">346</span>);
        cxt.arcTo(<span class="hljs-number">71</span>, <span class="hljs-number">346</span>, <span class="hljs-number">71</span>, <span class="hljs-number">336</span>, <span class="hljs-number">10</span>);
        cxt.lineTo(<span class="hljs-number">71</span>, <span class="hljs-number">326</span>);
        cxt.arcTo(<span class="hljs-number">71</span>, <span class="hljs-number">316</span>, <span class="hljs-number">81</span>, <span class="hljs-number">316</span>, <span class="hljs-number">10</span>);
        cxt.lineTo(<span class="hljs-number">96</span>, <span class="hljs-number">316</span>);
        cxt.fillStyle = '#b13209';
        cxt.fill();
        cxt.stroke();</code></pre>
<p>围巾：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319559" src="https://static.alili.tech/img/remote/1460000009319559" alt="围巾" title="围巾" style="cursor: pointer;"></span></p>
<p>接着画衣服：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.fillStyle = '#0bb0da';
        cxt.moveTo(80, 346);
        //左衣服
        cxt.lineTo(26, 406);
        cxt.lineTo(65, 440);
        cxt.lineTo(85, 418);
        cxt.lineTo(85, 528);
        cxt.lineTo(185, 528);
        //右衣服
        cxt.lineTo(315, 528);
        cxt.lineTo(315, 418);
        cxt.lineTo(337, 440);
        cxt.lineTo(374, 406);
        cxt.lineTo(320, 346);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.fillStyle = '#<span class="hljs-number">0</span>bb0da';
        cxt.moveTo(<span class="hljs-number">80</span>, <span class="hljs-number">346</span>);
        <span class="hljs-comment">//左衣服</span>
        cxt.lineTo(<span class="hljs-number">26</span>, <span class="hljs-number">406</span>);
        cxt.lineTo(<span class="hljs-number">65</span>, <span class="hljs-number">440</span>);
        cxt.lineTo(<span class="hljs-number">85</span>, <span class="hljs-number">418</span>);
        cxt.lineTo(<span class="hljs-number">85</span>, <span class="hljs-number">528</span>);
        cxt.lineTo(<span class="hljs-number">185</span>, <span class="hljs-number">528</span>);
        <span class="hljs-comment">//右衣服</span>
        cxt.lineTo(<span class="hljs-number">315</span>, <span class="hljs-number">528</span>);
        cxt.lineTo(<span class="hljs-number">315</span>, <span class="hljs-number">418</span>);
        cxt.lineTo(<span class="hljs-number">337</span>, <span class="hljs-number">440</span>);
        cxt.lineTo(<span class="hljs-number">374</span>, <span class="hljs-number">406</span>);
        cxt.lineTo(<span class="hljs-number">320</span>, <span class="hljs-number">346</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>衣服：<br><span class="img-wrap"><img data-src="/img/remote/1460000009319560?w=820&amp;h=1120" src="https://static.alili.tech/img/remote/1460000009319560?w=820&amp;h=1120" alt="衣服" title="衣服" style="cursor: pointer; display: inline;"></span><br>接着画手：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //左手
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(37, 433, 30, 0, 2 * Math.PI);
        cxt.fill();
        cxt.stroke();
        //右手
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(363, 433, 30, 0, 2 * Math.PI);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        <span class="hljs-comment">//左手</span>
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(<span class="hljs-number">37</span>, <span class="hljs-number">433</span>, <span class="hljs-number">30</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);
        cxt.fill();
        cxt.stroke();
        <span class="hljs-comment">//右手</span>
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(<span class="hljs-number">363</span>, <span class="hljs-number">433</span>, <span class="hljs-number">30</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>手：<br><span class="img-wrap"><img data-src="/img/remote/1460000009319561?w=802&amp;h=1066" src="https://static.alili.tech/img/remote/1460000009319561?w=802&amp;h=1066" alt="手" title="手" style="cursor: pointer;"></span></p>
<p>接着画肚：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(200, 400, 91, 1.8 * Math.PI, 1.2 * Math.PI);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(<span class="hljs-number">200</span>, <span class="hljs-number">400</span>, <span class="hljs-number">91</span>, <span class="hljs-number">1.8</span> * Math.<span class="hljs-literal">PI</span>, <span class="hljs-number">1.2</span> * Math.<span class="hljs-literal">PI</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>肚：<br><span class="img-wrap"><img data-src="/img/remote/1460000009319562?w=794&amp;h=1060" src="https://static.alili.tech/img/remote/1460000009319562?w=794&amp;h=1060" alt="肚" title="肚" style="cursor: pointer;"></span></p>
<p>接着画小口袋</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.moveTo(130, 394);
        cxt.lineTo(270, 394);
        cxt.moveTo(130, 394);
        cxt.bezierCurveTo(130, 490, 270, 490, 270, 394);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.moveTo(<span class="hljs-number">130</span>, <span class="hljs-number">394</span>);
        cxt.lineTo(<span class="hljs-number">270</span>, <span class="hljs-number">394</span>);
        cxt.moveTo(<span class="hljs-number">130</span>, <span class="hljs-number">394</span>);
        cxt.bezierCurveTo(<span class="hljs-number">130</span>, <span class="hljs-number">490</span>, <span class="hljs-number">270</span>, <span class="hljs-number">490</span>, <span class="hljs-number">270</span>, <span class="hljs-number">394</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>小口袋：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009319563?w=810&amp;h=1056" src="https://static.alili.tech/img/remote/1460000009319563?w=810&amp;h=1056" alt="小口袋" title="小口袋" style="cursor: pointer; display: inline;"></span></p>
<p>最后画两只脚以及两只脚的的空隙：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /*两只脚的空隙*/
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(200, 529, 20,Math.PI, 0);
        cxt.fill();
        cxt.stroke();
        /*脚*/
        //左脚
        cxt.beginPath();
        cxt.fillStyle='#fff';
        cxt.moveTo(180,528);
        cxt.lineTo(72,528);
        cxt.bezierCurveTo(52,528,52,558,72,558);
        cxt.lineTo(180,558);
        cxt.moveTo(180,558);
        cxt.bezierCurveTo(200,558,200,528,180,528);
        cxt.fill();
        cxt.stroke();
        //右脚
        cxt.beginPath();
        cxt.fillStyle='#fff';
        cxt.moveTo(220,528);
        cxt.lineTo(328,528);
        cxt.bezierCurveTo(348,528,348,558,328,558);
        cxt.lineTo(220,558);
        cxt.moveTo(220,558);
        cxt.bezierCurveTo(200,558,200,528,220,528);
        cxt.fill();
        cxt.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>      <span class="hljs-comment">/*两只脚的空隙*/</span>
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.arc(<span class="hljs-number">200</span>, <span class="hljs-number">529</span>, <span class="hljs-number">20</span>,Math.<span class="hljs-literal">PI</span>, <span class="hljs-number">0</span>);
        cxt.fill();
        cxt.stroke();
        <span class="hljs-comment">/*脚*/</span>
        <span class="hljs-comment">//左脚</span>
        cxt.beginPath();
        cxt.fillStyle='#fff';
        cxt.moveTo(<span class="hljs-number">180</span>,<span class="hljs-number">528</span>);
        cxt.lineTo(<span class="hljs-number">72</span>,<span class="hljs-number">528</span>);
        cxt.bezierCurveTo(<span class="hljs-number">52</span>,<span class="hljs-number">528</span>,<span class="hljs-number">52</span>,<span class="hljs-number">558</span>,<span class="hljs-number">72</span>,<span class="hljs-number">558</span>);
        cxt.lineTo(<span class="hljs-number">180</span>,<span class="hljs-number">558</span>);
        cxt.moveTo(<span class="hljs-number">180</span>,<span class="hljs-number">558</span>);
        cxt.bezierCurveTo(<span class="hljs-number">200</span>,<span class="hljs-number">558</span>,<span class="hljs-number">200</span>,<span class="hljs-number">528</span>,<span class="hljs-number">180</span>,<span class="hljs-number">528</span>);
        cxt.fill();
        cxt.stroke();
        <span class="hljs-comment">//右脚</span>
        cxt.beginPath();
        cxt.fillStyle='#fff';
        cxt.moveTo(<span class="hljs-number">220</span>,<span class="hljs-number">528</span>);
        cxt.lineTo(<span class="hljs-number">328</span>,<span class="hljs-number">528</span>);
        cxt.bezierCurveTo(<span class="hljs-number">348</span>,<span class="hljs-number">528</span>,<span class="hljs-number">348</span>,<span class="hljs-number">558</span>,<span class="hljs-number">328</span>,<span class="hljs-number">558</span>);
        cxt.lineTo(<span class="hljs-number">220</span>,<span class="hljs-number">558</span>);
        cxt.moveTo(<span class="hljs-number">220</span>,<span class="hljs-number">558</span>);
        cxt.bezierCurveTo(<span class="hljs-number">200</span>,<span class="hljs-number">558</span>,<span class="hljs-number">200</span>,<span class="hljs-number">528</span>,<span class="hljs-number">220</span>,<span class="hljs-number">528</span>);
        cxt.fill();
        cxt.stroke();</code></pre>
<p>完成了︿(￣︶￣)︿<br><span class="img-wrap"><img data-src="/img/remote/1460000009319551?w=816&amp;h=1106" src="https://static.alili.tech/img/remote/1460000009319551?w=816&amp;h=1106" alt="哆啦A梦" title="哆啦A梦" style="cursor: pointer;"></span></p>
<p>完整代码请点击：<a href="https://github.com/shenzekun/doraemon/blob/master/Doraemon.html" rel="nofollow noreferrer" target="_blank">哆啦A梦</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端小项目：使用canvas绘画哆啦A梦

## 原文链接
[https://segmentfault.com/a/1190000009319548](https://segmentfault.com/a/1190000009319548)


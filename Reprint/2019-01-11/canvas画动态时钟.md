---
title: 'canvas画动态时钟' 
date: 2019-01-11 2:30:08
hidden: true
slug: asmo9l82nm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">用canvas画动态时钟</h2>
<p><span class="img-wrap"><img data-src="/img/bVPBM0?w=528&amp;h=423" src="https://static.alili.tech/img/bVPBM0?w=528&amp;h=423" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ol><li><p>HTML代码</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div class=&quot;box&quot;>
    <span id=&quot;hour&quot;></span>:
    <span id=&quot;minute&quot;></span>:
    <span id=&quot;second&quot;></span>
  </div>
  <div>
    <canvas id=&quot;clock&quot; width=&quot;200px&quot; height=&quot;200px&quot;></canvas>
  </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"hour"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>:
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"minute"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>:
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"second"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"clock"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200px"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"200px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<ol><li><p>css：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin: 0;padding: 0;}
div{
  text-align: center;
}
div.box{
  margin: 50px auto;
  text-align: center;
  font-size: 30px;
  display: flex;
  align-content: center;
  justify-content: center;
}
span{
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border:2px solid #ccc;
  font-size: 20px;
  margin: 0px 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-content</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-tag">span</span>{
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#ccc</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span> <span class="hljs-number">20px</span>;
}</code></pre>
<ol><li><p>js代码</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var hourspan =document.getElementById(&quot;hour&quot;);
  var minutespan =document.getElementById(&quot;minute&quot;);
  var secondspan =document.getElementById(&quot;second&quot;);
  var dom = document.getElementById(&quot;clock&quot;);
  var ctx = dom.getContext(&quot;2d&quot;);
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var r = width/2;
  

  function drawBackground(){
    ctx.save(); //保存当前画布样式
    ctx.translate(r,r);//切换中心点
//画外圆
    ctx.beginPath();
    ctx.lineWidth=10;
    ctx.arc(0,0,r-5,0,2*Math.PI,false);
    ctx.stroke();
//画数字
    var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.textAlign = &quot;center&quot;;
    ctx.textBaseline = &quot;middle&quot;;
    hourNumber.forEach(function(item,index){
      var rad = 2*Math.PI/12*index;
      var x = Math.cos(rad)*(r-30);
      var y = Math.sin(rad)*(r-30);
      ctx.fillText(item,x,y);
    })
//画时刻
    for(var i=0;i<60;i++){
      var rad = 2*Math.PI/60*i;
      var x = Math.cos(rad)*(r-15);
      var y = Math.sin(rad)*(r-15);
      ctx.beginPath();
      ctx.arc(x,y,2,0,Math.PI*2,false);
      if(i%5 == 0){
        ctx.fillStyle = &quot;#000&quot;;
        ctx.fill();
      }else{
        ctx.fillStyle = &quot;#ccc&quot;;
        ctx.fill();
      }
    }
  }
//画时针，分针，秒针
  function drawHour(hour,minute,second){
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI/12*hour+((2*Math.PI/12)*(minute+second/60)/60);//将分，秒换算成小时
    ctx.rotate(rad);
    ctx.strokeStyle = &quot;#000&quot;;
    ctx.lineWidth = 4;
    ctx.lineCap = &quot;round&quot;;
    ctx.moveTo(0,10);
    ctx.lineTo(0,-r/2);
    ctx.stroke();
    ctx.restore();//返回上一个画布样式
  }
  function drawMinute(minute,second){
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI/60*minute+(2*Math.PI/60)*(second/60);//将秒换算成分
    ctx.rotate(rad);
    ctx.strokeStyle = &quot;#000&quot;;
    ctx.lineWidth = 6;
    ctx.lineCap = &quot;round&quot;;
    ctx.moveTo(0,15);
    ctx.lineTo(0,-(r-25));
    ctx.stroke();
    ctx.restore();
  }
  function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = &quot;red&quot;;
    var rad = 2*Math.PI/60*second;
    ctx.rotate(rad);
    ctx.lineWidth = 3;
    ctx.lineCap = &quot;round&quot;;
    ctx.moveTo(0,20);
    ctx.lineTo(0,-(r-15));
    ctx.stroke();
    ctx.restore();
  }
//画圆心
  function drawCicle(){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle =&quot;#fff&quot;;
    ctx.arc(0,0,2,0,Math.PI*2,false);
    ctx.fill();
    ctx.restore();
  }
  
  
  //将所有事件封装在一个函数中，为制作成动态时钟做准备
  function timeActive(){
    ctx.clearRect(0,0,width,height);//清空整个画布
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    hourspan.innerText = hour;
    minutespan.innerText = minute;
    secondspan.innerText = second;
    drawBackground();
    drawHour(hour,minute,second);
    drawMinute(minute,second);
    drawSecond(second);
    drawCicle();
    ctx.restore();
  }
  timeActive();//初始化画布
  setInterval('timeActive()',1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  var hourspan =document.getElementById(<span class="hljs-string">"hour"</span>);
  var minutespan =document.getElementById(<span class="hljs-string">"minute"</span>);
  var secondspan =document.getElementById(<span class="hljs-string">"second"</span>);
  var dom = document.getElementById(<span class="hljs-string">"clock"</span>);
  var ctx = dom.getContext(<span class="hljs-string">"2d"</span>);
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var r = width/<span class="hljs-number">2</span>;
  

  function drawBackground(){
    ctx.save(); <span class="hljs-comment">//保存当前画布样式</span>
    ctx.translate(r,r);<span class="hljs-comment">//切换中心点</span>
<span class="hljs-comment">//画外圆</span>
    ctx.beginPath();
    ctx.lineWidth=<span class="hljs-number">10</span>;
    ctx.arc(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,r<span class="hljs-number">-5</span>,<span class="hljs-number">0</span>,<span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>,false);
    ctx.stroke();
<span class="hljs-comment">//画数字</span>
    var hourNumber = [<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>];
    ctx.textAlign = <span class="hljs-string">"center"</span>;
    ctx.textBaseline = <span class="hljs-string">"middle"</span>;
    hourNumber.forEach(function(item,index){
      var rad = <span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">12</span>*index;
      var x = Math.cos(rad)*(r<span class="hljs-number">-30</span>);
      var y = Math.sin(rad)*(r<span class="hljs-number">-30</span>);
      ctx.fillText(item,x,y);
    })
<span class="hljs-comment">//画时刻</span>
    for(var i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">60</span>;i++){
      var rad = <span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">60</span>*i;
      var x = Math.cos(rad)*(r<span class="hljs-number">-15</span>);
      var y = Math.sin(rad)*(r<span class="hljs-number">-15</span>);
      ctx.beginPath();
      ctx.arc(x,y,<span class="hljs-number">2</span>,<span class="hljs-number">0</span>,Math.<span class="hljs-literal">PI</span>*<span class="hljs-number">2</span>,false);
      if(i%<span class="hljs-number">5</span> == <span class="hljs-number">0</span>){
        ctx.fillStyle = <span class="hljs-string">"#000"</span>;
        ctx.fill();
      }else{
        ctx.fillStyle = <span class="hljs-string">"#ccc"</span>;
        ctx.fill();
      }
    }
  }
<span class="hljs-comment">//画时针，分针，秒针</span>
  function drawHour(hour,minute,second){
    ctx.save();
    ctx.beginPath();
    var rad = <span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">12</span>*hour+((<span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">12</span>)*(minute+second/<span class="hljs-number">60</span>)/<span class="hljs-number">60</span>);<span class="hljs-comment">//将分，秒换算成小时</span>
    ctx.rotate(rad);
    ctx.strokeStyle = <span class="hljs-string">"#000"</span>;
    ctx.lineWidth = <span class="hljs-number">4</span>;
    ctx.lineCap = <span class="hljs-string">"round"</span>;
    ctx.moveTo(<span class="hljs-number">0</span>,<span class="hljs-number">10</span>);
    ctx.lineTo(<span class="hljs-number">0</span>,-r/<span class="hljs-number">2</span>);
    ctx.stroke();
    ctx.restore();<span class="hljs-comment">//返回上一个画布样式</span>
  }
  function drawMinute(minute,second){
    ctx.save();
    ctx.beginPath();
    var rad = <span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">60</span>*minute+(<span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">60</span>)*(second/<span class="hljs-number">60</span>);<span class="hljs-comment">//将秒换算成分</span>
    ctx.rotate(rad);
    ctx.strokeStyle = <span class="hljs-string">"#000"</span>;
    ctx.lineWidth = <span class="hljs-number">6</span>;
    ctx.lineCap = <span class="hljs-string">"round"</span>;
    ctx.moveTo(<span class="hljs-number">0</span>,<span class="hljs-number">15</span>);
    ctx.lineTo(<span class="hljs-number">0</span>,-(r<span class="hljs-number">-25</span>));
    ctx.stroke();
    ctx.restore();
  }
  function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = <span class="hljs-string">"red"</span>;
    var rad = <span class="hljs-number">2</span>*Math.<span class="hljs-literal">PI</span>/<span class="hljs-number">60</span>*second;
    ctx.rotate(rad);
    ctx.lineWidth = <span class="hljs-number">3</span>;
    ctx.lineCap = <span class="hljs-string">"round"</span>;
    ctx.moveTo(<span class="hljs-number">0</span>,<span class="hljs-number">20</span>);
    ctx.lineTo(<span class="hljs-number">0</span>,-(r<span class="hljs-number">-15</span>));
    ctx.stroke();
    ctx.restore();
  }
<span class="hljs-comment">//画圆心</span>
  function drawCicle(){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle =<span class="hljs-string">"#fff"</span>;
    ctx.arc(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">2</span>,<span class="hljs-number">0</span>,Math.<span class="hljs-literal">PI</span>*<span class="hljs-number">2</span>,false);
    ctx.fill();
    ctx.restore();
  }
  
  
  <span class="hljs-comment">//将所有事件封装在一个函数中，为制作成动态时钟做准备</span>
  function timeActive(){
    ctx.clearRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,width,height);<span class="hljs-comment">//清空整个画布</span>
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    hourspan.innerText = hour;
    minutespan.innerText = minute;
    secondspan.innerText = second;
    drawBackground();
    drawHour(hour,minute,second);
    drawMinute(minute,second);
    drawSecond(second);
    drawCicle();
    ctx.restore();
  }
  timeActive();<span class="hljs-comment">//初始化画布</span>
  setInterval('timeActive()',<span class="hljs-number">1000</span>);</code></pre>
<hr>
<p>小生初出茅庐，希望各位海涵，看见网上的教学视频后，感觉挺有意思的，手敲了一遍。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas画动态时钟

## 原文链接
[https://segmentfault.com/a/1190000009877728](https://segmentfault.com/a/1190000009877728)


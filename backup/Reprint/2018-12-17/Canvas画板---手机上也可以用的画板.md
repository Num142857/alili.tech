---
title: 'Canvas画板---手机上也可以用的画板' 
date: 2018-12-17 2:30:07
hidden: true
slug: drclzxe8h7
categories: [reprint]
---

{{< raw >}}

                    
<p>学习制作画板之前，我们先来了解一下canvas标签</p>
<h2 id="articleHeader0">一.canvas标签</h2>
<p><strong>1.</strong>canvas标签与img标签相似，但是canvas标签是一个闭合标签，并且没有src alt属性<br><strong>2.</strong>canvas标签有两个属性，width，height。我们在页面上用canvas绘制一个画布时，应用width，height属性设置大小，如果用css设置，绘制图像时可能会出现扭曲。<br><strong>3.</strong>渲染上下文 context<br>canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。<br>getContext()方法可以获取到上下文context.</p>
<h2 id="articleHeader1">二.制作画板</h2>
<p>画板功能：可以绘制不同颜色和粗细的线条，画板上有橡皮擦功能，一键清除功能，下载功能。</p>
<h3 id="articleHeader2">1.首先我们需要绘制一个自适应屏幕宽度的画布。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function wResize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> function wResize() {
        <span class="hljs-selector-tag">var</span> pageWidth = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientWidth</span>
        <span class="hljs-selector-tag">var</span> pageHeight = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientHeight</span>

        <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.width</span> = pageWidth
        <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.height</span> = pageHeight
    }</code></pre>
<h3 id="articleHeader3">2.当用户在画板上绘画时有三种状态，鼠标点击态，鼠标移动态，鼠标离开态。</h3>
<p>我们可以用mousedown,mousemove ,mouseup来监听三种状态。</p>
<p><strong>当用户点击鼠标时：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  canvas.onmousedown = function (a) {
                var x = a.clientX;
                var y = a.clientY;
                using = true;//设置变量，标志开始使用画布
                if (eraserEnabled) {//如果标志使用橡皮擦，则清除画布内容
                    context.clearRect(x, y, 20, 20);
                }
                else {否则记录当前鼠标坐标
                    lastPoint = {x: x, y: y}
                }
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  canvas.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a)</span> </span>{
                <span class="hljs-keyword">var</span> x = a.clientX;
                <span class="hljs-keyword">var</span> y = a.clientY;
                using = <span class="hljs-literal">true</span>;<span class="hljs-comment">//设置变量，标志开始使用画布</span>
                <span class="hljs-keyword">if</span> (eraserEnabled) {<span class="hljs-comment">//如果标志使用橡皮擦，则清除画布内容</span>
                    context.clearRect(x, y, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
                }
                <span class="hljs-keyword">else</span> {否则记录当前鼠标坐标
                    lastPoint = {x: x, y: y}
                }
            }</code></pre>
<p><strong>当用户鼠标移动时：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  canvas.onmousemove = function (a) {
                var x = a.clientX;
                var y = a.clientY;
                if (!using) {return}//判断是否使用画板
                if (eraserEnabled) {//如果标志使用橡皮擦，则清除画布内容
                    context.clearRect(x, y, 20, 20);
                }
                else{//如果没有使用橡皮擦
                    var newPoint = {&quot;x&quot;: x, &quot;y&quot;: y};//记录鼠标移动到的新坐标
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) //绘制线条
                    lastPoint = newPoint;//将当前坐标作为下次移动的首坐标
                }
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>  canvas.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(a) {
                <span class="hljs-keyword">var</span> x = a.clientX;
                <span class="hljs-keyword">var</span> y = a.clientY;
                <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">using</span>) {<span class="hljs-keyword">return</span>}<span class="hljs-comment">//判断是否使用画板</span>
                <span class="hljs-keyword">if</span> (eraserEnabled) {<span class="hljs-comment">//如果标志使用橡皮擦，则清除画布内容</span>
                    context.clearRect(x, y, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
                }
                <span class="hljs-keyword">else</span>{<span class="hljs-comment">//如果没有使用橡皮擦</span>
                    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Point</span> = {<span class="hljs-string">"x"</span>: <span class="hljs-type">x</span>, <span class="hljs-string">"y"</span>: <span class="hljs-type">y</span>};<span class="hljs-comment">//记录鼠标移动到的新坐标</span>
                    drawLine(lastPoint.x, lastPoint.y, <span class="hljs-keyword">new</span><span class="hljs-type">Point</span>.x, <span class="hljs-keyword">new</span><span class="hljs-type">Point</span>.y) <span class="hljs-comment">//绘制线条</span>
                    lastPoint = <span class="hljs-keyword">new</span><span class="hljs-type">Point</span>;<span class="hljs-comment">//将当前坐标作为下次移动的首坐标</span>
                }
            }</code></pre>
<p><strong>当鼠标离开时：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  canvas.onmouseup = function (a) {
                using = false;//设置变量，标志不使用画板
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  canvas.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a)</span> </span>{
                using = <span class="hljs-literal">false</span>;<span class="hljs-comment">//设置变量，标志不使用画板</span>
            }</code></pre>
<h3 id="articleHeader4">3.绘制直线</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawLine(x1, y1, x2, y2) {
    context.beginPath();//开始移动笔触，路径开始
    context.moveTo(x1, y1);//其实坐标
    context.lineWidth = lineWidth ;//默认线条粗细
    context.lineTo(x2, y2);//结束坐标
    context.stroke();
    context.closePath();//结束笔触，路径结束
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>function drawLine(x1, y1, x2, y2) {
    <span class="hljs-built_in">context</span>.<span class="hljs-keyword">beginPath();//开始移动笔触，路径开始
</span>    <span class="hljs-built_in">context</span>.<span class="hljs-keyword">moveTo(x1, </span>y1)<span class="hljs-comment">;//其实坐标</span>
    <span class="hljs-built_in">context</span>.lineWidth = lineWidth <span class="hljs-comment">;//默认线条粗细</span>
    <span class="hljs-built_in">context</span>.lineTo(x2, y2)<span class="hljs-comment">;//结束坐标</span>
    <span class="hljs-built_in">context</span>.stroke()<span class="hljs-comment">;</span>
    <span class="hljs-built_in">context</span>.<span class="hljs-keyword">closePath();//结束笔触，路径结束
</span>}</code></pre>
<p>stroke()：通过线条来绘制图形轮廓。<br>fill()：通过填充路径的内容区域生成实心的图形</p>
<h3 id="articleHeader5">4.画笔功能</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pen.onclick = function(){
    eraserEnabled = false;//设置变量，标志不使用橡皮擦
    pen.classList.add('active');//设置画板上画笔按钮的样式变化
    eraser.classList.remove('active');//设置画板上橡皮擦按钮的样式变化

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>pen.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    eraserEnabled = <span class="hljs-literal">false</span>;<span class="hljs-comment">//设置变量，标志不使用橡皮擦</span>
    pen.classList.add(<span class="hljs-string">'active'</span>);<span class="hljs-comment">//设置画板上画笔按钮的样式变化</span>
    eraser.classList.remove(<span class="hljs-string">'active'</span>);<span class="hljs-comment">//设置画板上橡皮擦按钮的样式变化</span>

}</code></pre>
<h3 id="articleHeader6">5.橡皮擦功能</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eraser.onclick = function(){
    eraserEnabled = true;//标志使用橡皮擦
    eraser.classList.add('active');//设置画板上橡皮擦按钮的样式变化
    pen.classList.remove('active');//设置画板上画笔按钮的样式变化
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>eraser.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    eraserEnabled = <span class="hljs-literal">true</span>;<span class="hljs-comment">//标志使用橡皮擦</span>
    eraser.classList.add(<span class="hljs-string">'active'</span>);<span class="hljs-comment">//设置画板上橡皮擦按钮的样式变化</span>
    pen.classList.remove(<span class="hljs-string">'active'</span>);<span class="hljs-comment">//设置画板上画笔按钮的样式变化</span>
}
</code></pre>
<h3 id="articleHeader7">6.一键清除功能</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>clear.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    context.clearRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,canvas.width,canvas.height);
}</code></pre>
<p>这里使用了clearRect(x, y, width, height)方法，清除指定矩形区域，让清除部分完全透明。x,y坐标为其实坐标，width, height为清除矩形区域的大小。</p>
<h3 id="articleHeader8">7.一键下载功能</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="download.onclick = function(){
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'context';
    a.click();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>download.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = canvas.toDataURL(<span class="hljs-string">'image/png'</span>);
    <span class="hljs-built_in">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
    <span class="hljs-built_in">document</span>.body.appendChild(a);
    a.href = <span class="hljs-built_in">url</span>;
    a.download = <span class="hljs-string">'context'</span>;
    a.click();
}</code></pre>
<p>canvas.toDataURL('image/png');该方法返回一个png格式的图片展示的url，当用户点击画板上的下载按钮，在html中插入一个a标签，a.download指向画布的上下文,download 属性规定被下载的超链接目标。</p>
<h2 id="articleHeader9">三.手机适配的画板</h2>
<h3 id="articleHeader10">1.添加meta标签:</h3>
<p>因为浏览器初始会将页面现在手机端显示时进行缩放，因此我们可以在meta标签中设置meta viewport属性，告诉浏览器不将页面进行缩放，页面宽度=用户设备屏幕宽度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;">  &lt;meta <span class="hljs-attr">name="viewport"</span> <span class="hljs-attr">content="width=device-width,</span> <span class="hljs-attr">initial-scale=1.0,</span> <span class="hljs-attr">maximum-scale=1.0,</span> <span class="hljs-attr">user-scalable=0"&gt;</span></code></pre>
<h3 id="articleHeader11">2.移动端监听鼠标事件的方法与pc端不同</h3>
<p><strong>当鼠标点击时用ontouchstart方法监听：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="canvas.ontouchstart = function(a){

            var x = a.touches[0].clientX;
            var y =a.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x, y, 20, 20);
            }
            else {
                lastPoint = {x: x, y: y}
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>canvas.ontouchstart = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a)</span></span>{

            <span class="hljs-keyword">var</span> x = a.touches[<span class="hljs-number">0</span>].clientX;
            <span class="hljs-keyword">var</span> y =a.touches[<span class="hljs-number">0</span>].clientY;
            using = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">if</span> (eraserEnabled) {
                context.clearRect(x, y, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
            }
            <span class="hljs-keyword">else</span> {
                lastPoint = {x: x, y: y}
            }
        }</code></pre>
<p><strong>当鼠标移动是用ontouchmove方法监听：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" canvas.ontouchmove = function(a){

            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            if (!using) {return}
            if (eraserEnabled) {
                context.clearRect(x, y, 20, 20);
            }
            else{

                var newPoint = {&quot;x&quot;: x, &quot;y&quot;: y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;

            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code> canvas.ontouchmove = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(a){

            <span class="hljs-keyword">var</span> x = a.touches[<span class="hljs-number">0</span>].clientX;
            <span class="hljs-keyword">var</span> y = a.touches[<span class="hljs-number">0</span>].clientY;
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">using</span>) {<span class="hljs-keyword">return</span>}
            <span class="hljs-keyword">if</span> (eraserEnabled) {
                context.clearRect(x, y, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
            }
            <span class="hljs-keyword">else</span>{

                <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Point</span> = {<span class="hljs-string">"x"</span>: <span class="hljs-type">x</span>, <span class="hljs-string">"y"</span>: <span class="hljs-type">y</span>};
                drawLine(lastPoint.x, lastPoint.y, <span class="hljs-keyword">new</span><span class="hljs-type">Point</span>.x, <span class="hljs-keyword">new</span><span class="hljs-type">Point</span>.y)
                lastPoint = <span class="hljs-keyword">new</span><span class="hljs-type">Point</span>;

            }
        }</code></pre>
<p><strong>当鼠标离开时用ontouchend方法监听：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" canvas.ontouchhend = function(a){

            using = false;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> canvas.ontouchhend = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a)</span></span>{

            using = <span class="hljs-literal">false</span>;
        }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Canvas画板---手机上也可以用的画板

## 原文链接
[https://segmentfault.com/a/1190000012861756](https://segmentfault.com/a/1190000012861756)


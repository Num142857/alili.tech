---
title: 'HTML5 中 canvas 的使用总结' 
date: 2019-01-31 2:31:16
hidden: true
slug: 7kt5s47oysx
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1. 概述</h3>
<p>Canvas API（画布）用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用JavaScript操作的位图（bitmap）。</p>
<p>使用前，首先需要新建一个&lt;canvas&gt;网页元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;myCanvas&quot; width=&quot;400&quot; height=&quot;200&quot;>
  您的浏览器不支持canvas！
</canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"myCanvas"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"400"</span> height=<span class="hljs-string">"200"</span>&gt;
  您的浏览器不支持canvas！
&lt;/canvas&gt;
</code></pre>
<p>上面代码中，如果浏览器不支持这个API，则就会显示&lt;canvas&gt;标签中间的文字——“您的浏览器不支持canvas！”。</p>
<p>每个canvas节点都有一个对应的context对象（上下文对象），Canvas API定义在这个context对象上面，所以需要获取这个对象，方法是使用getContext方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('myCanvas');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myCanvas'</span>);
<span class="hljs-keyword">if</span> (canvas.getContext) {
  <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>);
}
</code></pre>
<p>上面代码中，getContext方法指定参数2d，表示该canvas节点用于生成2D图案（即平面图案）。如果参数是webgl，就表示用于生成3D图像（即立体图案），这部分实际上单独叫做WebGL API。</p>
<h3 id="articleHeader1">2. 绘图方法</h3>
<p>canvas画布提供了一个用来作图的平面空间，该空间的每个点都有自己的坐标，x表示横坐标，y表示竖坐标。原点(0, 0)位于图像左上角，x轴的正向是原点向右，y轴的正向是原点向下。</p>
<p><strong>（1）绘制路径</strong></p>
<p>beginPath方法表示开始绘制路径，moveTo(x, y)方法设置线段的起点，lineTo(x, y)方法设置线段的终点，stroke方法用来给透明的线段着色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath(); // 开始路径绘制
ctx.moveTo(20, 20); // 设置路径起点，坐标为(20,20)
ctx.lineTo(200, 20); // 绘制一条到(200,20)的直线
ctx.lineWidth = 1.0; // 设置线宽
ctx.strokeStyle = '#CC0000'; // 设置线的颜色
ctx.stroke(); // 进行线的着色，这时整条线才变得可见
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.beginPath(); <span class="hljs-comment">// 开始路径绘制</span>
ctx.moveTo(<span class="hljs-number">20</span>, <span class="hljs-number">20</span>); <span class="hljs-comment">// 设置路径起点，坐标为(20,20)</span>
ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">20</span>); <span class="hljs-comment">// 绘制一条到(200,20)的直线</span>
ctx.lineWidth = <span class="hljs-number">1.0</span>; <span class="hljs-comment">// 设置线宽</span>
ctx.strokeStyle = '#CC0000'; <span class="hljs-comment">// 设置线的颜色</span>
ctx.stroke(); <span class="hljs-comment">// 进行线的着色，这时整条线才变得可见</span>
</code></pre>
<p>moveto和lineto方法可以多次使用。最后，还可以使用closePath方法，自动绘制一条当前点到起点的直线，形成一个封闭图形，省却使用一次lineto方法。</p>
<p><strong>（2）绘制矩形</strong></p>
<p>fillRect(x, y, width, height)方法用来绘制矩形，它的四个参数分别为矩形左上角顶点的x坐标、y坐标，以及矩形的宽和高。fillStyle属性用来设置矩形的填充色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.fillStyle = 'yellow';
ctx.fillRect(50, 50, 200, 100); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.fillStyle = 'yellow';
ctx.fillRect(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">200</span>, <span class="hljs-number">100</span>); 
</code></pre>
<p>strokeRect方法与fillRect类似，用来绘制空心矩形。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.strokeRect(10,10,200,100); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.strokeRect(<span class="hljs-number">10</span>,<span class="hljs-number">10</span>,<span class="hljs-number">200</span>,<span class="hljs-number">100</span>); 
</code></pre>
<p>clearRect方法用来清除某个矩形区域的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.clearRect(100,50,50,50); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.clearRect(<span class="hljs-number">100</span>,<span class="hljs-number">50</span>,<span class="hljs-number">50</span>,<span class="hljs-number">50</span>); 
</code></pre>
<p><strong>（3）绘制文本</strong></p>
<p>fillText(string, x, y) 用来绘制文本，它的三个参数分别为文本内容、起点的x坐标、y坐标。使用之前，需用font设置字体、大小、样式（写法类似与CSS的font属性）。与此类似的还有strokeText方法，用来添加空心字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.font = &quot;Bold 20px Arial&quot;; // 设置字体
ctx.textAlign = &quot;left&quot;;// 设置对齐方式
ctx.fillStyle = &quot;#008600&quot;; // 设置填充颜色
ctx.fillText(&quot;Hello!&quot;, 10, 50); // 设置字体内容，以及在画布上的位置
ctx.strokeText(&quot;Hello!&quot;, 10, 100); // 绘制空心字
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.font = <span class="hljs-string">"Bold 20px Arial"</span>; <span class="hljs-comment">// 设置字体</span>
ctx.textAlign = <span class="hljs-string">"left"</span>;<span class="hljs-comment">// 设置对齐方式</span>
ctx.fillStyle = <span class="hljs-string">"#008600"</span>; <span class="hljs-comment">// 设置填充颜色</span>
ctx.fillText(<span class="hljs-string">"Hello!"</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>); <span class="hljs-comment">// 设置字体内容，以及在画布上的位置</span>
ctx.strokeText(<span class="hljs-string">"Hello!"</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>); <span class="hljs-comment">// 绘制空心字</span>
</code></pre>
<p>fillText方法不支持文本断行，即所有文本出现在一行内。所以，如果要生成多行文本，只有调用多次fillText方法。</p>
<p><strong>（4）绘制圆形和扇形</strong></p>
<p>arc方法用来绘制扇形。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ctx</span><span class="hljs-selector-class">.arc</span>(<span class="hljs-selector-tag">x</span>, <span class="hljs-selector-tag">y</span>, <span class="hljs-selector-tag">radius</span>, <span class="hljs-selector-tag">startAngle</span>, <span class="hljs-selector-tag">endAngle</span>, <span class="hljs-selector-tag">anticlockwise</span>);
</code></pre>
<p>arc方法的x和y参数是圆心坐标，radius是半径，startAngle和endAngle则是扇形的起始角度和终止角度（以弧度表示），anticlockwise表示做图时应该逆时针画（true）还是顺时针画（false）。</p>
<p>下面是如何绘制实心的圆形:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath(); 
ctx.arc(60, 60, 50, 0, Math.PI*2, true); 
ctx.fillStyle = &quot;#000000&quot;; 
ctx.fill();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.beginPath(); 
ctx.arc(<span class="hljs-number">60</span>, <span class="hljs-number">60</span>, <span class="hljs-number">50</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-literal">PI</span>*<span class="hljs-number">2</span>, true); 
ctx.fillStyle = <span class="hljs-string">"#000000"</span>; 
ctx.fill();
</code></pre>
<p>绘制空心圆形的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.beginPath(); 
ctx.arc(60, 60, 50, 0, Math.PI*2, true); 
ctx.lineWidth = 1.0; 
ctx.strokeStyle = &quot;#000&quot;; 
ctx.stroke();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.beginPath(); 
ctx.arc(<span class="hljs-number">60</span>, <span class="hljs-number">60</span>, <span class="hljs-number">50</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-literal">PI</span>*<span class="hljs-number">2</span>, true); 
ctx.lineWidth = <span class="hljs-number">1.0</span>; 
ctx.strokeStyle = <span class="hljs-string">"#000"</span>; 
ctx.stroke();
</code></pre>
<p><strong>（5）设置渐变色</strong></p>
<p>createLinearGradient方法用来设置渐变色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myGradient = ctx.createLinearGradient(0, 0, 0, 160); 
myGradient.addColorStop(0, &quot;#BABABA&quot;); 
myGradient.addColorStop(1, &quot;#636363&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var myGradient = ctx.createLinearGradient(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">160</span>); 
myGradient.addColorStop(<span class="hljs-number">0</span>, <span class="hljs-string">"#BABABA"</span>); 
myGradient.addColorStop(<span class="hljs-number">1</span>, <span class="hljs-string">"#636363"</span>);
</code></pre>
<p>createLinearGradient方法的参数是(x1, y1, x2, y2)，其中x1和y1是起点坐标，x2和y2是终点坐标。通过不同的坐标值，可以生成从上至下、从左到右的渐变等等。<br>使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.fillStyle = myGradient;
ctx.fillRect(10,10,200,100);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.fillStyle = myGradient;
ctx.fillRect(<span class="hljs-number">10</span>,<span class="hljs-number">10</span>,<span class="hljs-number">200</span>,<span class="hljs-number">100</span>);
</code></pre>
<p><strong>（6）设置阴影</strong></p>
<p>一系列与阴影相关的方法，可以用来设置阴影。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.shadowOffsetX = 10; // 设置水平位移
ctx.shadowOffsetY = 10; // 设置垂直位移
ctx.shadowBlur = 5; // 设置模糊度
ctx.shadowColor = &quot;rgba(0,0,0,0.5)&quot;; // 设置阴影颜色
ctx.fillStyle = &quot;#CC0000&quot;; 
ctx.fillRect(10,10,200,100);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.shadowOffsetX = <span class="hljs-number">10</span>; <span class="hljs-comment">// 设置水平位移</span>
ctx.shadowOffsetY = <span class="hljs-number">10</span>; <span class="hljs-comment">// 设置垂直位移</span>
ctx.shadowBlur = <span class="hljs-number">5</span>; <span class="hljs-comment">// 设置模糊度</span>
ctx.shadowColor = <span class="hljs-string">"rgba(0,0,0,0.5)"</span>; <span class="hljs-comment">// 设置阴影颜色</span>
ctx.fillStyle = <span class="hljs-string">"#CC0000"</span>; 
ctx.fillRect(<span class="hljs-number">10</span>,<span class="hljs-number">10</span>,<span class="hljs-number">200</span>,<span class="hljs-number">100</span>);
</code></pre>
<h3 id="articleHeader2">3. 图像处理方法</h3>
<p><strong>drawImage方法</strong></p>
<p>Canvas API 允许将图像文件插入画布，做法是读取图片后，使用drawImage方法在画布内进行重绘。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img = new Image();
img.src = 'image.png';
ctx.drawImage(img, 0, 0); // 设置对应的图像对象，以及它在画布上的位置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();
img.src = <span class="hljs-string">'image.png'</span>;
ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>); <span class="hljs-comment">// 设置对应的图像对象，以及它在画布上的位置</span>
</code></pre>
<p>上面代码将一个PNG图像载入画布。drawImage()方法接受三个参数，第一个参数是图像文件的DOM元素（即&lt;img&gt;节点），第二个和第三个参数是图像左上角在画布中的坐标，上例中的(0, 0)就表示将图像左上角放置在画布的左上角。</p>
<p>由于图像的载入需要时间，drawImage方法只能在图像完全载入后才能调用，因此上面的代码需要改写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var image = new Image();
image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);
    // 插入页面底部
    document.body.appendChild(image);
    return canvas;
}
image.src = 'image.png';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>var <span class="hljs-built_in">image</span> = <span class="hljs-keyword">new</span> Image();
<span class="hljs-built_in">image</span>.onload = function() {
    var canvas = document.createElement(<span class="hljs-string">'canvas'</span>);
    canvas.<span class="hljs-built_in">width</span> = <span class="hljs-built_in">image</span>.<span class="hljs-built_in">width</span>;
    canvas.<span class="hljs-built_in">height</span> = <span class="hljs-built_in">image</span>.<span class="hljs-built_in">height</span>;
    canvas.getContext(<span class="hljs-string">'2d'</span>).drawImage(<span class="hljs-built_in">image</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    <span class="hljs-comment">// 插入页面底部</span>
    document.body.appendChild(<span class="hljs-built_in">image</span>);
    <span class="hljs-built_in">return</span> canvas;
}
<span class="hljs-built_in">image</span>.src = <span class="hljs-string">'image.png'</span>;
</code></pre>
<p><strong>getImageData方法，putImageData方法</strong></p>
<p>getImageData方法可以用来读取Canvas的内容，返回一个对象，包含了每个像素的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.width</span>, <span class="hljs-selector-tag">canvas</span>.<span class="hljs-attribute">height</span>);
</code></pre>
<p>imageData对象有一个data属性，它的值是一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha通道值，因此该数组的长度等于 图像的像素宽度 x 图像的像素高度 x 4，每个值的范围是0–255。这个数组不仅可读，而且可写，因此通过操作这个数组的值，就可以达到操作图像的目的。修改这个数组以后，使用putImageData方法将数组内容重新绘制在Canvas上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.putImageData(imageData, 0, 0);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>context.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
</code></pre>
<p><strong>toDataURL方法</strong></p>
<p>对图像数据做出修改以后，可以使用toDataURL方法，将Canvas数据重新转化成一般的图像文件形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL('image/png');
    return image;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">convertCanvasToImage</span><span class="hljs-params">(canvas)</span> </span>{
    <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();
    image.src = canvas.toDataURL(<span class="hljs-string">'image/png'</span>);
    <span class="hljs-keyword">return</span> image;
}
</code></pre>
<p>上面的代码将Canvas数据，转化成PNG data URI。</p>
<p><strong>save方法，restore方法</strong></p>
<p>save方法用于保存上下文环境，restore方法用于恢复到上一次保存的上下文环境。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.save();
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 5;
ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.fillStyle = '#CC0000';
ctx.fillRect(10,10,150,100);
ctx.restore();
ctx.fillStyle = '#000000';
ctx.fillRect(180,10,150,100);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctx.save();
ctx.shadowOffsetX = <span class="hljs-number">10</span>;
ctx.shadowOffsetY = <span class="hljs-number">10</span>;
ctx.shadowBlur = <span class="hljs-number">5</span>;
ctx.shadowColor = 'rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0.5</span>)';
ctx.fillStyle = '#CC0000';
ctx.fillRect(<span class="hljs-number">10</span>,<span class="hljs-number">10</span>,<span class="hljs-number">150</span>,<span class="hljs-number">100</span>);
ctx.restore();
ctx.fillStyle = '#<span class="hljs-number">000000</span>';
ctx.fillRect(<span class="hljs-number">180</span>,<span class="hljs-number">10</span>,<span class="hljs-number">150</span>,<span class="hljs-number">100</span>);
</code></pre>
<p>上面代码先用save方法，保存了当前设置，然后绘制了一个有阴影的矩形。接着，使用restore方法，恢复了保存前的设置，绘制了一个没有阴影的矩形。</p>
<h3 id="articleHeader3">4. 动画</h3>
<p>利用JavaScript，可以在canvas元素上很容易地产生动画效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var posX = 20,
    posY = 100;
setInterval(function() {
    context.fillStyle = &quot;black&quot;;
    context.fillRect(0,0,canvas.width, canvas.height);

    posX += 1;
    posY += 0.25;

    context.beginPath();
    context.fillStyle = &quot;white&quot;;

    context.arc(posX, posY, 10, 0, Math.PI*2, true); 
    context.closePath();
    context.fill();
}, 30);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var posX = <span class="hljs-number">20</span>,
    posY = <span class="hljs-number">100</span><span class="hljs-comment">;</span>
setInterval(function() {
    <span class="hljs-built_in">context</span>.fillStyle = <span class="hljs-string">"black"</span><span class="hljs-comment">;</span>
    <span class="hljs-built_in">context</span>.fillRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,canvas.width, canvas.height)<span class="hljs-comment">;</span>

    posX += <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    posY += <span class="hljs-number">0</span>.<span class="hljs-number">25</span><span class="hljs-comment">;</span>

    <span class="hljs-built_in">context</span>.<span class="hljs-keyword">beginPath();
</span>    <span class="hljs-built_in">context</span>.fillStyle = <span class="hljs-string">"white"</span><span class="hljs-comment">;</span>

    <span class="hljs-built_in">context</span>.arc(posX, posY, <span class="hljs-number">10</span>, <span class="hljs-number">0</span>, Math.PI*<span class="hljs-number">2</span>, true)<span class="hljs-comment">; </span>
    <span class="hljs-built_in">context</span>.<span class="hljs-keyword">closePath();
</span>    <span class="hljs-built_in">context</span>.fill()<span class="hljs-comment">;</span>
}, <span class="hljs-number">30</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>上面代码会产生一个小圆点，每隔30毫秒就向右下方移动的效果。setInterval函数的一开始，之所以要将画布重新渲染黑色底色，是为了抹去上一步的小圆点。</p>
<p>通过设置圆心坐标，可以产生各种运动轨迹。先上升后下降。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vx = 10,
    vy = -10,
    gravity = 1;
setInterval(function() {
    posX += vx;
    posY += vy;
    vy += gravity;
    // ...
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> vx = <span class="hljs-number">10</span>,
    vy = <span class="hljs-number">-10</span>,
    gravity = <span class="hljs-number">1</span>;
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    posX += vx;
    posY += vy;
    vy += gravity;
    <span class="hljs-comment">// ...</span>
});
</code></pre>
<p>上面代码中，x坐标始终增大，表示持续向右运动。y坐标先变小，然后在重力作用下，不断增大，表示先上升后下降。<br>小球不断反弹后，逐步趋于静止。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vx = 10,
    vy = -10,
    gravity = 1;
setInterval(function() {
    posX += vx;
    posY += vy;
    if (posY > canvas.height * 0.75) {
          vy *= -0.6;
          vx *= 0.75;
          posY = canvas.height * 0.75;
    }
    vy += gravity;
    // ...
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var vx = <span class="hljs-number">10</span>,
    vy = <span class="hljs-number">-10</span>,
    gravity = <span class="hljs-number">1</span>;
setInterval(function() {
    posX += vx;
    posY += vy;
    if (posY &gt; canvas.height * <span class="hljs-number">0.75</span>) {
          vy *= <span class="hljs-number">-0.6</span>;
          vx *= <span class="hljs-number">0.75</span>;
          posY = canvas.height * <span class="hljs-number">0.75</span>;
    }
    vy += gravity;
    <span class="hljs-comment">// ...</span>
});
</code></pre>
<p>上面代码表示，一旦小球的y坐标处于屏幕下方75%的位置，向x轴移动的速度变为原来的75%，而向y轴反弹上一次反弹高度的40%。</p>
<h3 id="articleHeader4">5.像素处理</h3>
<p>通过getImageData方法和putImageData方法，可以处理每个像素，进而操作图像内容。<br>假定filter是一个处理像素的函数，那么整个对Canvas的处理流程，可以用下面的代码表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (canvas.width > 0 &amp;&amp; canvas.height > 0) {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    filter(imageData);
    context.putImageData(imageData, 0, 0);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-keyword">if</span> (canvas.<span class="hljs-built_in">width</span> &gt; <span class="hljs-number">0</span> &amp;&amp; canvas.<span class="hljs-built_in">height</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">var</span> imageData = <span class="hljs-built_in">context</span>.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.<span class="hljs-built_in">width</span>, canvas.<span class="hljs-built_in">height</span>);
    filter(imageData);
    <span class="hljs-built_in">context</span>.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}
</code></pre>
<p>以下是几种常见的处理方法：</p>
<p><strong>灰度效果</strong></p>
<p>灰度图（grayscale）就是取红、绿、蓝三个像素值的算术平均值，这实际上将图像转成了黑白形式。假定d[i]是像素数组中一个象素的红色值，则d[i+1]为绿色值，d[i+2]为蓝色值，d[i+3]就是alpha通道值。转成灰度的算法，就是将红、绿、蓝三个值相加后除以3，再将结果写回数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grayscale = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }
    return pixels;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>grayscale = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(pixels)</span> </span>{
    <span class="hljs-keyword">var</span> d = pixels.data;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; d.length; i += <span class="hljs-number">4</span>) {
      <span class="hljs-keyword">var</span> r = d[i];
      <span class="hljs-keyword">var</span> g = d[i + <span class="hljs-number">1</span>];
      <span class="hljs-keyword">var</span> b = d[i + <span class="hljs-number">2</span>];
      d[i] = d[i + <span class="hljs-number">1</span>] = d[i + <span class="hljs-number">2</span>] = (r+g+b)/<span class="hljs-number">3</span>;
    }
    <span class="hljs-keyword">return</span> pixels;
};
</code></pre>
<p><strong>复古效果</strong></p>
<p>复古效果（sepia）则是将红、绿、蓝三个像素，分别取这三个值的某种加权平均值，使得图像有一种古旧的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sepia = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
      d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
      d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
    }
    return pixels;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>sepia = function (pixels) {
    var d = pixels.data;
    for (var i = <span class="hljs-number">0</span>; i &lt; d.length; i += <span class="hljs-number">4</span>) {
      var r = d[i];
      var g = d[i + <span class="hljs-number">1</span>];
      var b = d[i + <span class="hljs-number">2</span>];
      d[i]     = (r * <span class="hljs-number">0.393</span>)+(g * <span class="hljs-number">0.769</span>)+(b * <span class="hljs-number">0.189</span>); <span class="hljs-comment">// red</span>
      d[i + <span class="hljs-number">1</span>] = (r * <span class="hljs-number">0.349</span>)+(g * <span class="hljs-number">0.686</span>)+(b * <span class="hljs-number">0.168</span>); <span class="hljs-comment">// green</span>
      d[i + <span class="hljs-number">2</span>] = (r * <span class="hljs-number">0.272</span>)+(g * <span class="hljs-number">0.534</span>)+(b * <span class="hljs-number">0.131</span>); <span class="hljs-comment">// blue</span>
    }
    return pixels;
};
</code></pre>
<p><strong>红色蒙版效果</strong></p>
<p>红色蒙版指的是，让图像呈现一种偏红的效果。算法是将红色通道设为红、绿、蓝三个值的平均值，而将绿色通道和蓝色通道都设为0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="red = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = (r+g+b)/3;        // 红色通道取平均值
      d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
    }
    return pixels;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>red = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(pixels)</span> </span>{
    <span class="hljs-keyword">var</span> d = pixels.data;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; d.length; i += <span class="hljs-number">4</span>) {
      <span class="hljs-keyword">var</span> r = d[i];
      <span class="hljs-keyword">var</span> g = d[i + <span class="hljs-number">1</span>];
      <span class="hljs-keyword">var</span> b = d[i + <span class="hljs-number">2</span>];
      d[i] = (r+g+b)/<span class="hljs-number">3</span>;        <span class="hljs-comment">// 红色通道取平均值</span>
      d[i + <span class="hljs-number">1</span>] = d[i + <span class="hljs-number">2</span>] = <span class="hljs-number">0</span>; <span class="hljs-comment">// 绿色通道和蓝色通道都设为0</span>
    }
    <span class="hljs-keyword">return</span> pixels;
};
</code></pre>
<p><strong>亮度效果</strong></p>
<p>亮度效果（brightness）是指让图像变得更亮或更暗。算法将红色通道、绿色通道、蓝色通道，同时加上一个正值或负值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brightness = function (pixels, delta) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
          d[i] += delta;     // red
          d[i + 1] += delta; // green
          d[i + 2] += delta; // blue   
    }
    return pixels;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>brightness = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(pixels, delta)</span> </span>{
    <span class="hljs-keyword">var</span> d = pixels.data;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; d.length; i += <span class="hljs-number">4</span>) {
          d[i] += delta;     <span class="hljs-comment">// red</span>
          d[i + <span class="hljs-number">1</span>] += delta; <span class="hljs-comment">// green</span>
          d[i + <span class="hljs-number">2</span>] += delta; <span class="hljs-comment">// blue   </span>
    }
    <span class="hljs-keyword">return</span> pixels;
};
</code></pre>
<p><strong>反转效果</strong></p>
<p>反转效果（invert）是指图片呈现一种色彩颠倒的效果。算法为红、绿、蓝通道都取各自的相反值（255-原值）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="invert = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i];
        d[i+1] = 255 - d[i + 1];
        d[i+2] = 255 - d[i + 2];
    }
    return pixels;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>invert = function (pixels) {
    var d = pixels.data;
    for (var i = <span class="hljs-number">0</span>; i &lt; d.length; i += <span class="hljs-number">4</span>) {
        d[i] = <span class="hljs-number">255</span> - d[i];
        d[i+<span class="hljs-number">1</span>] = <span class="hljs-number">255</span> - d[i + <span class="hljs-number">1</span>];
        d[i+<span class="hljs-number">2</span>] = <span class="hljs-number">255</span> - d[i + <span class="hljs-number">2</span>];
    }
    return pixels;
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 中 canvas 的使用总结

## 原文链接
[https://segmentfault.com/a/1190000007495768](https://segmentfault.com/a/1190000007495768)


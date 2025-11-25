---
title: 'Fabric.js 简单介绍和使用' 
date: 2019-02-12 2:30:12
hidden: true
slug: jy4bu4ip7vb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>Fabric.js是一个可以简化canvas程序编写的库。 Fabric.js为canvas提供所缺少的对象模型, svg parser, 交互和一整套其他不可或缺的工具。基于MIT协议开源，在github上有许多人贡献代码。</p>
<h2 id="articleHeader1">Why fabric?</h2>
<p>canvas提供一个好的画布能力, 但其api超级烂。如果你就想画个简单图形, 其实也可以, 不过做一些复杂的图形绘制, 编写一些复杂的效果，就不是那么好了。<br>fabric就是为此而开发。</p>
<p>用对象的方式去编写代码  </p>
<p>举个例子<br>传统的画正方形代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reference canvas element (with id=&quot;c&quot;)
var canvasEl = document.getElementById('c');

// get 2d context to draw on (the &quot;bitmap&quot; mentioned earlier)
var ctx = canvasEl.getContext('2d');

// set fill color of context
ctx.fillStyle = 'red';

// create rectangle at a 100,100 point, with 20x20 dimensions
ctx.fillRect(100, 100, 20, 20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// reference canvas element (with id="c")</span>
<span class="hljs-keyword">var</span> canvasEl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'c'</span>);

<span class="hljs-comment">// get 2d context to draw on (the "bitmap" mentioned earlier)</span>
<span class="hljs-keyword">var</span> ctx = canvasEl.getContext(<span class="hljs-string">'2d'</span>);

<span class="hljs-comment">// set fill color of context</span>
ctx.fillStyle = <span class="hljs-string">'red'</span>;

<span class="hljs-comment">// create rectangle at a 100,100 point, with 20x20 dimensions</span>
ctx.fillRect(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);</code></pre>
<p>使用fabric</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// create a wrapper around native canvas element (with id=&quot;c&quot;)
var canvas = new fabric.Canvas('c');

// create a rectangle object
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
});

// &quot;add&quot; rectangle onto canvas
canvas.add(rect);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// <span class="hljs-keyword">create</span> a wrapper around <span class="hljs-keyword">native</span> canvas <span class="hljs-keyword">element</span> (<span class="hljs-keyword">with</span> <span class="hljs-keyword">id</span>=<span class="hljs-string">"c"</span>)
<span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> fabric.Canvas(<span class="hljs-string">'c'</span>);

// <span class="hljs-keyword">create</span> a rectangle <span class="hljs-keyword">object</span>
<span class="hljs-keyword">var</span> rect = <span class="hljs-keyword">new</span> fabric.Rect({
    <span class="hljs-keyword">left</span>: <span class="hljs-number">100</span>,
    top: <span class="hljs-number">100</span>,
    fill: <span class="hljs-string">'red'</span>,
    width: <span class="hljs-number">20</span>,
    height: <span class="hljs-number">20</span>
});

// "add" rectangle onto canvas
canvas.add(rect);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVuxkr" src="https://static.alili.tech/img/bVuxkr" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好的 其实并没有什么差别  不过我们试着旋转一下角度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvasEl = document.getElementById('c');
var ctx = canvasEl.getContext('2d');
ctx.fillStyle = 'red';

ctx.translate(100, 100);
ctx.rotate(Math.PI / 180 * 45);
ctx.fillRect(-10, -10, 20, 20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var canvasEl = document.getElementById('c');
var ctx = canvasEl.getContext('<span class="hljs-number">2</span>d');
ctx.fillStyle = 'red';

ctx.translate(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
ctx.rotate(Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">180</span> * <span class="hljs-number">45</span>);
ctx.fillRect(<span class="hljs-number">-10</span>, <span class="hljs-number">-10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);</code></pre>
<p>fabric</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = new fabric.Canvas('c');

// create a rectangle with angle=45
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  angle: 45
});

canvas.add(rect);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var canvas = <span class="hljs-keyword">new</span> fabric.Canvas(<span class="hljs-string">'c'</span>);

<span class="hljs-comment">// create a rectangle with angle=45</span>
var <span class="hljs-built_in">rect</span> = <span class="hljs-keyword">new</span> fabric.Rect({
  left: <span class="hljs-number">100</span>,
  top: <span class="hljs-number">100</span>,
  <span class="hljs-built_in">fill</span>: <span class="hljs-string">'red'</span>,
  <span class="hljs-built_in">width</span>: <span class="hljs-number">20</span>,
  <span class="hljs-built_in">height</span>: <span class="hljs-number">20</span>,
  angle: <span class="hljs-number">45</span>
});

canvas.<span class="hljs-built_in">add</span>(<span class="hljs-built_in">rect</span>);</code></pre>
<p>如果我们想重新调整位置 怎么办</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvasEl = document.getElementById('c');

...
ctx.strokRect(100, 100, 20, 20);
...

// erase entire canvas area
ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
ctx.fillRect(20, 50, 20, 20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var canvasEl = document.getElementById('c');

...
ctx.strokRect(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
...

<span class="hljs-comment">// erase entire canvas area</span>
ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvasEl.width, canvasEl.height);
ctx.fillRect(<span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);</code></pre>
<p>fabric</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = new fabric.Canvas('c');
...
canvas.add(rect);
...

rect.set({ left: 20, top: 50 });
canvas.renderAll();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> canvas = <span class="hljs-literal">new</span> fabric.Canvas(<span class="hljs-string">'c'</span>);
<span class="hljs-params">...</span>
canvas.add(rect);
<span class="hljs-params">...</span>

rect.<span class="hljs-built_in">set</span>({ left: <span class="hljs-number">20</span>, top: <span class="hljs-number">50</span> });
canvas.renderAll();</code></pre>
<h2 id="articleHeader2">objects</h2>
<ol>
<li><p>fabric.Circle</p></li>
<li><p>fabric.Ellipse</p></li>
<li><p>fabric.Line</p></li>
<li><p>fabric.Polygon</p></li>
<li><p>fabric.Polyline</p></li>
<li><p>fabric.Rect</p></li>
<li><p>fabric.Triangle</p></li>
</ol>
<p>画一个三角形 和一个 圆形</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// create a wrapper around native canvas element (with id=&quot;c&quot;)
var canvas = new fabric.Canvas('c');

var circle = new fabric.Circle({
    radius: 20, fill: 'green', left: 100, top: 100
});
var triangle = new fabric.Triangle({
    width: 20, height: 30, fill: 'blue', left: 50, top: 50
});

canvas.add(circle, triangle);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// create a wrapper around native canvas element (with id="c")</span>
var canvas = <span class="hljs-keyword">new</span> fabric.Canvas(<span class="hljs-string">'c'</span>);

var circle = <span class="hljs-keyword">new</span> fabric.Circle({
<span class="hljs-symbol">    radius:</span> <span class="hljs-number">20</span>, <span class="hljs-string">fill:</span> <span class="hljs-string">'green'</span>, <span class="hljs-string">left:</span> <span class="hljs-number">100</span>, <span class="hljs-string">top:</span> <span class="hljs-number">100</span>
});
var triangle = <span class="hljs-keyword">new</span> fabric.Triangle({
<span class="hljs-symbol">    width:</span> <span class="hljs-number">20</span>, <span class="hljs-string">height:</span> <span class="hljs-number">30</span>, <span class="hljs-string">fill:</span> <span class="hljs-string">'blue'</span>, <span class="hljs-string">left:</span> <span class="hljs-number">50</span>, <span class="hljs-string">top:</span> <span class="hljs-number">50</span>
});

canvas.add(circle, triangle);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVuxt5" src="https://static.alili.tech/img/bVuxt5" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">Manipulating objects</h3>
<p>可以简单的使用set来控制对象属性<br>positioning — left, top; <br>dimension — width, height; <br>rendering — fill, opacity, stroke, strokeWidth; <br>scaling and rotation — scaleX, scaleY, angle; <br>and even those related to flipping — flipX, flipY.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rect.set('fill', 'red');
rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
rect.set('angle', 15).set('flipY', true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-built_in">rect</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">'fill'</span>, <span class="hljs-string">'red'</span>);
<span class="hljs-built_in">rect</span>.<span class="hljs-built_in">set</span>({ strokeWidth: <span class="hljs-number">5</span>, <span class="hljs-built_in">stroke</span>: <span class="hljs-string">'rgba(100,200,200,0.5)'</span> });
<span class="hljs-built_in">rect</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">'angle'</span>, <span class="hljs-number">15</span>).<span class="hljs-built_in">set</span>(<span class="hljs-string">'flipY'</span>, <span class="hljs-keyword">true</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVuxZx" src="https://static.alili.tech/img/bVuxZx" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>有了set 其实也就有了get</p>
<p>对象可以创建时设置属性 也可以先实例化 再赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rect = new fabric.Rect({ width: 10, height: 20, fill: '#f55', opacity: 0.7 });

// or functionally identical

var rect = new fabric.Rect();
rect.set({ width: 10, height: 20, fill: '#f55', opacity: 0.7 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var <span class="hljs-built_in">rect</span> = <span class="hljs-keyword">new</span> fabric.Rect({ <span class="hljs-built_in">width</span>: <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span>: <span class="hljs-number">20</span>, <span class="hljs-built_in">fill</span>: <span class="hljs-string">'#f55'</span>, opacity: <span class="hljs-number">0.7</span> });

<span class="hljs-comment">// or functionally identical</span>

var <span class="hljs-built_in">rect</span> = <span class="hljs-keyword">new</span> fabric.Rect();
<span class="hljs-built_in">rect</span>.<span class="hljs-built_in">set</span>({ <span class="hljs-built_in">width</span>: <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span>: <span class="hljs-number">20</span>, <span class="hljs-built_in">fill</span>: <span class="hljs-string">'#f55'</span>, opacity: <span class="hljs-number">0.7</span> });</code></pre>
<p>另外这里的fabric.Rect是函数 大家可以使用class继承</p>
<h3 id="articleHeader4">默认值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rect = new fabric.Rect(); // notice no options passed in

rect.getWidth(); // 0
rect.getHeight(); // 0

rect.getLeft(); // 0
rect.getTop(); // 0

rect.getFill(); // rgb(0,0,0)
rect.getStroke(); // null

rect.getOpacity(); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> rect = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">fabric</span>.<span class="hljs-title">Rect</span>(); <span class="hljs-comment">// notice no options passed in</span>

<span class="hljs-title">rect</span>.<span class="hljs-title">getWidth</span>(); <span class="hljs-comment">// 0</span>
<span class="hljs-title">rect</span>.<span class="hljs-title">getHeight</span>(); <span class="hljs-comment">// 0</span>

<span class="hljs-title">rect</span>.<span class="hljs-title">getLeft</span>(); <span class="hljs-comment">// 0</span>
<span class="hljs-title">rect</span>.<span class="hljs-title">getTop</span>(); <span class="hljs-comment">// 0</span>

<span class="hljs-title">rect</span>.<span class="hljs-title">getFill</span>(); <span class="hljs-comment">// rgb(0,0,0)</span>
<span class="hljs-title">rect</span>.<span class="hljs-title">getStroke</span>(); <span class="hljs-comment">// null</span>

<span class="hljs-title">rect</span>.<span class="hljs-title">getOpacity</span>(); <span class="hljs-comment">// 1</span></span></code></pre>
<h3 id="articleHeader5">Hierarchy and Inheritance</h3>
<p>fabric.Object 是图像基类</p>
<p>你可以自己扩充方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fabric.Object.prototype.getAngleInRadians = function() {
  return this.getAngle() / 180 * Math.PI;
};

var rect = new fabric.Rect({ angle: 45 });
rect.getAngleInRadians(); // 0.785...

var circle = new fabric.Circle({ angle: 30, radius: 10 });
circle.getAngleInRadians(); // 0.523...

circle instanceof fabric.Circle; // true
circle instanceof fabric.Object; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>fabric.Object.prototype.getAngleInRadians = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getAngle() / <span class="hljs-number">180</span> * <span class="hljs-built_in">Math</span>.PI;
};

<span class="hljs-built_in">var</span> <span class="hljs-built_in">rect</span> = <span class="hljs-keyword">new</span> fabric.Rect({ <span class="hljs-attribute">angle</span>: <span class="hljs-number">45</span> });
<span class="hljs-built_in">rect</span>.getAngleInRadians(); <span class="hljs-comment">// 0.785...</span>

<span class="hljs-built_in">var</span> circle = <span class="hljs-keyword">new</span> fabric.Circle({ <span class="hljs-attribute">angle</span>: <span class="hljs-number">30</span>, <span class="hljs-attribute">radius</span>: <span class="hljs-number">10</span> });
circle.getAngleInRadians(); <span class="hljs-comment">// 0.523...</span>

circle <span class="hljs-keyword">instanceof</span> fabric.Circle; <span class="hljs-comment">// true</span>
circle <span class="hljs-keyword">instanceof</span> fabric.Object; <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader6">Canvas</h2>
<p>fabric.Canvas 是canvas的wrapper</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = new fabric.Canvas('c');
var rect = new fabric.Rect();

canvas.add(rect); // add object

canvas.item(0); // reference fabric.Rect added earlier (first object)
canvas.getObjects(); // get all objects on canvas (rect will be first and only)

canvas.remove(rect); // remove previously-added fabric.Rect" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">fabric</span>.<span class="hljs-title">Canvas</span>('c');
<span class="hljs-title">var</span> <span class="hljs-title">rect</span> = <span class="hljs-title">new</span> <span class="hljs-title">fabric</span>.<span class="hljs-title">Rect</span>();

<span class="hljs-title">canvas</span>.<span class="hljs-title">add</span>(rect); <span class="hljs-comment">// add object</span>

<span class="hljs-title">canvas</span>.<span class="hljs-title">item</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// reference fabric.Rect added earlier (first object)</span>
<span class="hljs-title">canvas</span>.<span class="hljs-title">getObjects</span>(); <span class="hljs-comment">// get all objects on canvas (rect will be first and only)</span>

<span class="hljs-title">canvas</span>.<span class="hljs-title">remove</span>(rect); <span class="hljs-comment">// remove previously-added fabric.Rect</span></span></code></pre>
<p>经典的设计 有options 有对象方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = new fabric.Canvas('c', {
  backgroundColor: 'rgb(100,100,200)',
  selectionColor: 'blue',
  selectionLineWidth: 2
  // ...
});

// or

var canvas = new fabric.Canvas('c');
canvas.setBackgroundImage(http://...');
canvas.onFpsUpdate = function(){ /* ... */ };
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> fabric.Canvas(<span class="hljs-string">'c'</span>, {
  backgroundColor: <span class="hljs-string">'rgb(100,100,200)'</span>,
  selectionColor: <span class="hljs-string">'blue'</span>,
  selectionLineWidth: <span class="hljs-number">2</span>
  <span class="hljs-comment">// ...</span>
});

<span class="hljs-comment">// or</span>

<span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> fabric.Canvas(<span class="hljs-string">'c'</span>);
canvas.setBackgroundImage(http:<span class="hljs-comment">//...');</span>
canvas.onFpsUpdate = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/* ... */</span> };
<span class="hljs-comment">// ...</span></code></pre>
<h3 id="articleHeader7">Images</h3>
<p>使用fabric.Image你可以轻松的加载一个图片<br>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;c&quot;></canvas>
<img src=&quot;my_image.png&quot; id=&quot;my-image&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"c"</span>&gt;&lt;/canvas&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"my_image.png"</span> id=<span class="hljs-string">"my-image"</span>&gt;</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = new fabric.Canvas('c');
var imgElement = document.getElementById('my-image');
var imgInstance = new fabric.Image(imgElement, {
  left: 100,
  top: 100,
  angle: 30,
  opacity: 0.85
});
canvas.add(imgInstance);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> <span class="hljs-type">fabric</span>.Canvas(<span class="hljs-string">'c'</span>);
<span class="hljs-keyword">var</span> imgElement = document.getElementById(<span class="hljs-string">'my-image'</span>);
<span class="hljs-keyword">var</span> imgInstance = <span class="hljs-keyword">new</span> <span class="hljs-type">fabric</span>.Image(imgElement, {
  left: <span class="hljs-type">100</span>,
  top: <span class="hljs-type">100</span>,
  angle: <span class="hljs-type">30</span>,
  opacity: <span class="hljs-type">0</span>.<span class="hljs-number">85</span>
});
canvas.add(imgInstance);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVuzxW" src="https://static.alili.tech/img/bVuzxW" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当然也可以通过url加载一张图片到canvas</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fabric.Image.fromURL('my_image.png', function(oImg) {
  canvas.add(oImg);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>fabric.Image.fromURL(<span class="hljs-string">'my_image.png'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(oImg)</span> </span>{
  canvas.add(oImg);
});
</code></pre>
<p>可以对加载的图片进行预处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fabric.Image.fromURL('my_image.png', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.scale(0.5).setFlipX(true);
  canvas.add(oImg);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">fabric.Image.fromURL</span>(<span class="hljs-string">'my_image.png'</span>, <span class="hljs-meta">function</span>(oImg) {
  // scale image down, <span class="hljs-keyword">and </span>flip <span class="hljs-keyword">it, </span><span class="hljs-keyword">before </span><span class="hljs-keyword">adding </span><span class="hljs-keyword">it </span>onto canvas
  oImg.scale(<span class="hljs-number">0</span>.<span class="hljs-number">5</span>).setFlipX(true)<span class="hljs-comment">;</span>
  canvas.<span class="hljs-keyword">add(oImg);
</span>})<span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader8">Path and PathGroup</h3>
<p>我们已经看了简单的形状，然后图像。更复杂、丰富的形状和内容呢？<br>路径包括一系列的命令，这基本上模仿一个笔从一个点到另一个。在“移动”，“线”，“曲线”，或“弧”等命令的帮助下，路径可以形成令人难以置信的复杂形状。同组的路径（路径组的帮助），开放更多的可能性。<br>类似于svg的path</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = new fabric.Canvas('c');
var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
path.set({ left: 120, top: 120 });
canvas.add(path);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> <span class="hljs-type">fabric</span>.Canvas(<span class="hljs-string">'c'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-keyword">new</span> <span class="hljs-type">fabric</span>.Path(<span class="hljs-string">'M 0 0 L 200 100 L 170 200 z'</span>);
path.<span class="hljs-keyword">set</span>({ left: <span class="hljs-type">120</span>, top: <span class="hljs-type">120 </span>});
canvas.add(path);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVuzzb" src="https://static.alili.tech/img/bVuzzb" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>“M” 代表 “move” 命令, 告诉笔到 0, 0 点.<br>“L” 代表 “line” 画一条0, 0 到 200, 100 的线. <br>another “L” creates a line to 170, 200.<br>z” tells forces drawing pen to close current path and finalize the shape.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
var path = new fabric.Path('M 0 0 L 300 100 L 200 300 z');
...
path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });
canvas.add(path);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>
<span class="hljs-built_in">var</span> path = <span class="hljs-literal">new</span> fabric.Path(<span class="hljs-string">'M 0 0 L 300 100 L 200 300 z'</span>);
<span class="hljs-params">...</span>
path.<span class="hljs-built_in">set</span>({ fill: <span class="hljs-string">'red'</span>, stroke: <span class="hljs-string">'green'</span>, opacity: <span class="hljs-number">0.5</span> });
canvas.add(path);</code></pre>
<p>path也可以设置canvas属性</p>
<p><span class="img-wrap"><img data-src="/img/bVuzzl" src="https://static.alili.tech/img/bVuzzl" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当然 太困然了 所以你可以使用 fabric.loadSVGFromString or fabric.loadSVGFromURL 方法</p>
<h3 id="articleHeader9">Afterword</h3>
<p>看些<a href="http://fabricjs.com/demos/" rel="nofollow noreferrer" target="_blank">demo</a>吧</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Fabric.js 简单介绍和使用

## 原文链接
[https://segmentfault.com/a/1190000004864237](https://segmentfault.com/a/1190000004864237)


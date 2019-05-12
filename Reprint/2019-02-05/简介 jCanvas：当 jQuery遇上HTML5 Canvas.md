---
title: '简介 jCanvas：当 jQuery遇上HTML5 Canvas' 
date: 2019-02-05 2:30:09
hidden: true
slug: urx8mjo03lr
categories: [reprint]
---

{{< raw >}}

                    
<p>HTML5 可以直接在你的网页中使用 <strong>&lt;canvas&gt;</strong> <a href="https://html.spec.whatwg.org/multipage/scripting.html#the-canvas-element" rel="nofollow noreferrer" target="_blank">元素</a>及其相关的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" rel="nofollow noreferrer" target="_blank">JavaScript API</a>绘制的图形。</p>
<p>在这篇文章中，我将向你介绍 <a href="http://projects.calebevans.me/jcanvas/" rel="nofollow noreferrer" target="_blank">jCanvas</a>，一个基于 jQuery的免费且开源的 HTML5的Canvas API。</p>
<p>如果你使用 jQuery 进行开发，jCanvas能够使用 jQuery更简单，更快速的完成一些非常炫酷的 canvas画布及交互效果。</p>
<h2 id="articleHeader0">什么是 jCanvas ？</h2>
<p>jCanvas 官网是这样解释的：</p>
<p>“jCanvas is a JavaScript library, written using jQuery and for jQuery, that wraps around the HTML5 canvas API, adding new features and capabilities, many of which are customizable. Capabilities include layers, events, drag-and-drop, animation, and much more.</p>
<p>The result is a flexible API wrapped up in a sugary, jQuery-esque syntax that brings power and ease to the HTML5 canvas. ”</p>
<p>jCanvas 能让你做的一切事情，你都可以用原生的Canvas API来实现，甚至可以做更多的事情。如果你愿意的话，你也可以将原生的Canvas API方法和 jCanvas一起使用。<a href="http://projects.calebevans.me/jcanvas/docs/drawManually/" rel="nofollow noreferrer" target="_blank">draw()方法</a>就可以这样使用。此外，你还可以非常轻松的用自己的方法结合 <a href="http://projects.calebevans.me/jcanvas/docs/extending/" rel="nofollow noreferrer" target="_blank">extend()函数</a>来扩展jCanvas的功能。</p>
<h2 id="articleHeader1">添加jCanvas 到你的项目中</h2>
<p>将jCanavs添加在你的项目中，从官方网站或<a href="https://github.com/caleb531/jcanvas" rel="nofollow noreferrer" target="_blank">GitHub的页面</a>上<a href="http://projects.calebevans.me/jcanvas/downloads/" rel="nofollow noreferrer" target="_blank">下载脚本</a>，然后将脚本文件放在你的项目文件夹中。正如前面说的，jCanvas需要依赖 jQuery才能正常工作，所以还要确保引入了 jQuery文件。</p>
<p>项目的脚本文件将是这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/jquery.min.js></script>
<script src=&quot;js/jcanvas.min.js></script>
<script src=&quot;js/script.js></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;script src="js/jquery.min.js&gt;</span><span class="hljs-section">&lt;/script&gt;</span>
<span class="hljs-section">&lt;script src="js/jcanvas.min.js&gt;</span><span class="hljs-section">&lt;/script&gt;</span>
<span class="hljs-section">&lt;script src="js/script.js&gt;</span><span class="hljs-section">&lt;/script&gt;</span>
</code></pre>
<p>最后，引入你自己的JavaScript 代码文件。现在，让我们开始jCanvas之旅吧。</p>
<h2 id="articleHeader2">设置 HTML文档</h2>
<p>我们通过为 HTMl5文档添加一个&lt;canvas&gt;标签，来开始我们的示例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
 <p>This is fallback content 
      for users of assistive technologies 
      or of browsers that don't have 
      full support for the Canvas API.</p>
</canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
 &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content 
      <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies 
      <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have 
      full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;
</code></pre>
<p>以下是关于上面的代码片段的几点说明。</p>
<ol>
<li><p>默认情况下，&lt;canvas&gt;的尺寸300px <strong>x</strong> 150px，你可以在width 和 height 属性里修改默认的大小。</p></li>
<li><p>id属性不是必须添加的，但是确是 JavaScript访问该元素的最简单的方法。</p></li>
<li><p>在&lt;canvas&gt;元素中的内容只是位图，这使得它无法被使用辅助技术的用户访问。另外，对<a href="http://caniuse.com/#" rel="nofollow noreferrer" target="_blank">不支持 Canvas API</a>的浏览器，将不能够访问其内容或者任何方式的交互。因此，该技术旨在让&lt;canvas&gt;<a href="https://www.w3.org/Talks/2014/0510-canvas-a11y/#1" rel="nofollow noreferrer" target="_blank">更容易被支持</a>。</p></li>
</ol>
<p>如果你想使用原生的Canvas API，你的 JavaScript 代码将会这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('myCanvas'),
context = canvas.getContext('2d');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myCanvas'</span>),
context = canvas.getContext(<span class="hljs-string">'2d'</span>);
</code></pre>
<p>上述代码中的context变量存储了Canvas对象的一个2D上下文属性。正是这种特性，使得你可以访问 HTML5的 Canvas API提供的所有其他属性和方法。</p>
<p>如果你想了解的更多，你可以戳这里<a href="https://www.sitepoint.com/html5-canvas-tutorial-introduction/" rel="nofollow noreferrer" target="_blank">HTML5 Canvas 简介</a>。</p>
<p>jCanvas的方法和属性已经包含了2D上下文的引用，因此你可以直接的跳到绘制图片。</p>
<h2 id="articleHeader3">用jCanvas绘制一些图形</h2>
<p>大多数的 jCanvas方法，接受键值对的形式，因此你可以根据你的需要，或你喜欢的顺序去使用它们。</p>
<p>让我们从绘制一个矩形开始吧。</p>
<h2 id="articleHeader4">矩形</h2>
<p>下面是你怎样用 jCanvas对象的 <a href="http://projects.calebevans.me/jcanvas/docs/rectangles" rel="nofollow noreferrer" target="_blank">drawRect() 方法</a>绘制出一个矩形的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

// rectangle shape 
$myCanvas.drawRect({
      fillStyle: 'steelblue',
      strokeStyle: 'blue',
      strokeWidth: 4,
      x: 150, y: 100,
      fromCenter: false,
      width: 200,
     height: 100
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// Store the canvas object into a variable</span>
<span class="hljs-built_in">var</span> $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

<span class="hljs-comment">// rectangle shape </span>
$myCanvas.drawRect({
      fillStyle: <span class="hljs-string">'steelblue'</span>,
      strokeStyle: <span class="hljs-string">'blue'</span>,
      strokeWidth: <span class="hljs-number">4</span>,
      x: <span class="hljs-number">150</span>, y: <span class="hljs-number">100</span>,
      fromCenter: <span class="hljs-literal">false</span>,
      width: <span class="hljs-number">200</span>,
     height: <span class="hljs-number">100</span>
});
</code></pre>
<p>上面的代码片段表示，存储 Canvas对象到一个名为$myCanvas的变量中。里面的drawRect()方法的属性都是比较简单的，但是我们在这里简单的阐述一下：</p>
<ol>
<li><p>fillStyle 设置矩形的背景色;</p></li>
<li><p>strokeStyle 设置它的边框颜色;</p></li>
<li><p>strokeWidth 设置矩形的边框宽度;</p></li>
<li><p>x 和 y设置对应矩形的坐标的水平和垂直的画布内测的位置。顶点的0值的分别为 x和y，也就是说，（0，0），对应于画布的左上角。x坐标向右增大，y坐标朝向画布的底部增加。默认情况下，jCanvas会以矩形的中心点作为x和y坐标的值;</p></li>
<li><p>要想改变这一点，以便x和y对应矩形的左上角，可以将fromCenter属性的值设置为 false;</p></li>
<li><p>最后，通过宽度和高度属性设置矩形的尺寸。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629502" src="https://static.alili.tech/img/remote/1460000006629502" alt="juxing" title="juxing" style="cursor: pointer;"></span></p>
<p>下面是矩形的示例代码：</p>
<p>HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Rectangle</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
       <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Rectangle&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
       &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;
</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}
</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

// rectangle shape 
$myCanvas.drawRect({
  fillStyle: 'steelblue',
  strokeStyle: 'blue',
  strokeWidth: 4,
  x: 190,
  y: 50,
  fromCenter: false,
  width: 200,
  height: 100
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// Store the canvas object into a variable</span>
<span class="hljs-built_in">var</span> $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

<span class="hljs-comment">// rectangle shape </span>
$myCanvas.drawRect({
  fillStyle: <span class="hljs-string">'steelblue'</span>,
  strokeStyle: <span class="hljs-string">'blue'</span>,
  strokeWidth: <span class="hljs-number">4</span>,
  x: <span class="hljs-number">190</span>,
  y: <span class="hljs-number">50</span>,
  fromCenter: <span class="hljs-literal">false</span>,
  width: <span class="hljs-number">200</span>,
  height: <span class="hljs-number">100</span>
});
</code></pre>
<p>Result:</p>
<p>jCanvas example: Rectangle</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629500" src="https://static.alili.tech/img/remote/1460000006629500" alt="rectangle" title="rectangle" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">圆弧和圆</h2>
<p>弧是一个圆的边缘部分。对于jCanvas来说，画一个圆弧仅仅是在 <a href="http://projects.calebevans.me/jcanvas/docs/arcs/" rel="nofollow noreferrer" target="_blank">drawArc() 方法</a>里设置几个所需的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawArc({
  strokeStyle: 'steelblue',
  strokeStyle: 'blue',
  strokeWidth: 4,
  x: 300, y: 100,
  radius: 50,
  // start and end angles in degrees
  start: 0, end: 200
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawArc({</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'blue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span>
  <span class="hljs-string">//</span> <span class="hljs-string">start</span> <span class="hljs-string">and</span> <span class="hljs-string">end</span> <span class="hljs-string">angles</span> <span class="hljs-string">in</span> <span class="hljs-string">degrees</span>
<span class="hljs-attr">  start:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">end:</span> <span class="hljs-number">200</span>
<span class="hljs-string">});</span>
</code></pre>
<p>绘制弧形，需要设置半径属性的值，以及开始的角度和结束的角度。如果你希望弧形是逆时针方向的话，需要添加一个ccw属性，并将其属性值设置为true。</p>
<p>下面是上述代码块演示：</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Arc</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Arc&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;

</code></pre>
<p>CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}

</code></pre>
<p>JS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawArc({
  strokeStyle: 'steelblue',
  strokeStyle: 'blue',
  strokeWidth: 4,
  x: 300, y: 100,
  radius: 50,
  // start and end angles in degrees
  start: 0, end: 200
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// Store the canvas object into a variable</span>
<span class="hljs-built_in">var</span> $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

$myCanvas.drawArc({
  strokeStyle: <span class="hljs-string">'steelblue'</span>,
  strokeStyle: <span class="hljs-string">'blue'</span>,
  strokeWidth: <span class="hljs-number">4</span>,
  x: <span class="hljs-number">300</span>, y: <span class="hljs-number">100</span>,
  radius: <span class="hljs-number">50</span>,
  <span class="hljs-comment">// start and end angles in degrees</span>
  start: <span class="hljs-number">0</span>, end: <span class="hljs-number">200</span>
});

</code></pre>
<p>Result:</p>
<p>jCanvas example: Arc</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629507" src="https://static.alili.tech/img/remote/1460000006629507" alt="Arc" title="Arc" style="cursor: pointer;"></span></p>
<p>绘制一个圆形：</p>
<p>举例来说，下面是如何只使用圆弧形状来绘制出一个简单的笑脸图形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawArc({
  // draw the face
  fillStyle: 'yellow',
  strokeStyle: '#333',
  strokeWidth: 4,
  x: 300, y: 100,
  radius: 80
}).drawArc({
  // draw the left eye
  fillStyle: '#333',
  strokeStyle: '#333',
  x: 250, y: 70,
  radius: 5
}).drawArc({
  // draw the right eye
  fillStyle: '#333',
  strokeStyle: '#333',
  x: 350, y: 70,
  radius: 5
}).drawArc({
  // draw the nose
  strokeStyle: '#333',
  strokeWidth: 4,
  ccw: true,
  x: 300, y: 100,
  radius: 30,
  start: 0,
  end: 200
}).drawArc({
  // draw the smile
  strokeStyle: '#333',
  strokeWidth: 4,
  x: 300, y: 135,
  radius: 30,
  start: 90,
  end: 280
});    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">face</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'yellow'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">80</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">left</span> <span class="hljs-string">eye</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">250</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">70</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">5</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">right</span> <span class="hljs-string">eye</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">350</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">70</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">5</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">nose</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  ccw:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">  start:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">  end:</span> <span class="hljs-number">200</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">smile</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">135</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">  start:</span> <span class="hljs-number">90</span><span class="hljs-string">,</span>
<span class="hljs-attr">  end:</span> <span class="hljs-number">280</span>
<span class="hljs-string">});</span>    
</code></pre>
<p>请记住，jCanvas是基于jQuery的，因此，你可以像jQuery的链式操作一样，在jCanvas中也可以使用链式操作。</p>
<p>下面是以上代码在浏览器中的效果：</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Smiling Face</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Smiling Face&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;
</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}
</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawArc({
  // draw the face
  fillStyle: 'yellow',
  strokeStyle: '#333',
  strokeWidth: 4,
  x: 300, y: 100,
  radius: 80
}).drawArc({
  // draw the left eye
  fillStyle: '#333',
  strokeStyle: '#333',
  x: 250, y: 70,
  radius: 5
}).drawArc({
  // draw the right eye
  fillStyle: '#333',
  strokeStyle: '#333',
  x: 350, y: 70,
  radius: 5
}).drawArc({
  // draw the nose
  strokeStyle: '#333',
  strokeWidth: 4,
  ccw: true,
  x: 300, y: 100,
  radius: 30,
  start: 0,
  end: 200
}).drawArc({
  // draw the smile
  strokeStyle: '#333',
  strokeWidth: 4,
  x: 300, y: 135,
  radius: 30,
  start: 90,
  end: 280
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">Store</span> <span class="hljs-string">the</span> <span class="hljs-string">canvas</span> <span class="hljs-string">object</span> <span class="hljs-string">into</span> <span class="hljs-string">a</span> <span class="hljs-string">variable</span>
<span class="hljs-string">var</span> <span class="hljs-string">$myCanvas</span> <span class="hljs-string">=</span> <span class="hljs-string">$('#myCanvas');</span>

<span class="hljs-string">$myCanvas.drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">face</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'yellow'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">80</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">left</span> <span class="hljs-string">eye</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">250</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">70</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">5</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">right</span> <span class="hljs-string">eye</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">350</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">70</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">5</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">nose</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  ccw:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">  start:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">  end:</span> <span class="hljs-number">200</span>
<span class="hljs-string">}).drawArc({</span>
  <span class="hljs-string">//</span> <span class="hljs-string">draw</span> <span class="hljs-string">the</span> <span class="hljs-string">smile</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#333'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">135</span><span class="hljs-string">,</span>
<span class="hljs-attr">  radius:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">  start:</span> <span class="hljs-number">90</span><span class="hljs-string">,</span>
<span class="hljs-attr">  end:</span> <span class="hljs-number">280</span>
<span class="hljs-string">});</span>
</code></pre>
<p>Result:</p>
<p>jCanvas example: Smiling Face</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760559" src="https://static.alili.tech/img/remote/1460000006760559" alt="face" title="face" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">绘制线条和路径</h2>
<p>你可以用<a href="http://projects.calebevans.me/jcanvas/docs/lines/" rel="nofollow noreferrer" target="_blank">drawLine()方法</a>快速的绘制直线，或者定义一系列的线条的连接点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawLine({
  strokeStyle: 'steelblue',
  strokeWidth: 10,
  rounded: true,
  closed: true,
  x1: 100, y1: 28,
  x2: 50, y2: 200,
  x3: 300, y3: 200,
  x4: 200, y4: 109
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawLine({</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">  rounded:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  closed:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">28</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x2:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x3:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span> <span class="hljs-attr">y3:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x4:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span> <span class="hljs-attr">y4:</span> <span class="hljs-number">109</span>
<span class="hljs-string">});</span>
</code></pre>
<p>上面代码设置了 rounded和closed属性的值为true，从而所绘制的线和角都是闭合的。</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Connected lines</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Connected lines&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;

</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}
</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawLine({
  strokeStyle: 'steelblue',
  strokeWidth: 10,
  rounded: true,
  closed: true,
  x1: 100,
  y1: 28,
  x2: 50,
  y2: 200,
  x3: 300,
  y3: 200,
  x4: 200,
  y4: 109
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">Store</span> <span class="hljs-string">the</span> <span class="hljs-string">canvas</span> <span class="hljs-string">object</span> <span class="hljs-string">into</span> <span class="hljs-string">a</span> <span class="hljs-string">variable</span>
<span class="hljs-string">var</span> <span class="hljs-string">$myCanvas</span> <span class="hljs-string">=</span> <span class="hljs-string">$('#myCanvas');</span>

<span class="hljs-string">$myCanvas.drawLine({</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">  rounded:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  closed:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  y1:</span> <span class="hljs-number">28</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x2:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span>
<span class="hljs-attr">  y2:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x3:</span> <span class="hljs-number">300</span><span class="hljs-string">,</span>
<span class="hljs-attr">  y3:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x4:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span>
<span class="hljs-attr">  y4:</span> <span class="hljs-number">109</span>
<span class="hljs-string">});</span>
</code></pre>
<p>Result:</p>
<p>jCanvas example: Connected lines</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629511" src="https://static.alili.tech/img/remote/1460000006629511" alt="sanjiao" title="sanjiao" style="cursor: pointer;"></span></p>
<p>还可以使用<a href="http://projects.calebevans.me/jcanvas/docs/paths/" rel="nofollow noreferrer" target="_blank">drawPath()方法</a>绘制路径。</p>
<p>该drawPath()方法设置 x 和 y值，你还需要制定你要绘制的路径的类型，例如直线，圆弧等。</p>
<p>下面教你如何使用 drawPath()方法和<a href="http://projects.calebevans.me/jcanvas/docs/arrows/" rel="nofollow noreferrer" target="_blank">drawarrows()方法</a>画出一对水平和垂直方向的箭头，后者是一个非常好用的jCanvas方法，能够使你快速的在画布上绘制一个箭头形状：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  x: 10, y: 10,
  p1: {
    type: 'line',
    x1: 100, y1: 100,
    x2: 200, y2: 100
  },
  p2: {
    type: 'line',
    rounded: true,
    endArrow: true,
    arrowRadius: 25,
    arrowAngle: 90,
    x1: 200, y1: 100,
    x2: 290, y2: 100
 },
 p3: {
   type: 'line',
   rounded: true,
   endArrow: true,
   arrowRadius: 25,
   arrowAngle: 90,
   x1: 100, y1: 100,
   x2: 100, y2: 250
  }
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawPath({</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#000'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">  p1:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">'line'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x2:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">100</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  p2:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">'line'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    rounded:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    endArrow:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arrowRadius:</span> <span class="hljs-number">25</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arrowAngle:</span> <span class="hljs-number">90</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x1:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x2:</span> <span class="hljs-number">290</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">100</span>
 <span class="hljs-string">},</span>
<span class="hljs-attr"> p3:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">   type:</span> <span class="hljs-string">'line'</span><span class="hljs-string">,</span>
<span class="hljs-attr">   rounded:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">   endArrow:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">   arrowRadius:</span> <span class="hljs-number">25</span><span class="hljs-string">,</span>
<span class="hljs-attr">   arrowAngle:</span> <span class="hljs-number">90</span><span class="hljs-string">,</span>
<span class="hljs-attr">   x1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">   x2:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">250</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">});</span>

</code></pre>
<p>结果展示：</p>
<p>HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Connected Arrows</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>    

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Connected Arrows&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;    

</code></pre>
<p>CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}

</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  x: 10, y: 10,
  p1: {
    type: 'line',
    x1: 100, y1: 100,
    x2: 200, y2: 100
  },
  p2: {
    type: 'line',
    rounded: true,
    endArrow: true,
    arrowRadius: 25,
    arrowAngle: 90,
    x1: 200, y1: 100,
    x2: 290, y2: 100
  },
  p3: {
    type: 'line',
    rounded: true,
    endArrow: true,
    arrowRadius: 25,
    arrowAngle: 90,
    x1: 100, y1: 100,
    x2: 100, y2: 250
  }
});
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">Store</span> <span class="hljs-string">the</span> <span class="hljs-string">canvas</span> <span class="hljs-string">object</span> <span class="hljs-string">into</span> <span class="hljs-string">a</span> <span class="hljs-string">variable</span>
<span class="hljs-string">var</span> <span class="hljs-string">$myCanvas</span> <span class="hljs-string">=</span> <span class="hljs-string">$('#myCanvas');</span>

<span class="hljs-string">$myCanvas.drawPath({</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'#000'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">  p1:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">'line'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x2:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">100</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  p2:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">'line'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    rounded:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    endArrow:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arrowRadius:</span> <span class="hljs-number">25</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arrowAngle:</span> <span class="hljs-number">90</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x1:</span> <span class="hljs-number">200</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x2:</span> <span class="hljs-number">290</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">100</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  p3:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">'line'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    rounded:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    endArrow:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arrowRadius:</span> <span class="hljs-number">25</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arrowAngle:</span> <span class="hljs-number">90</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y1:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">    x2:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">y2:</span> <span class="hljs-number">250</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">});</span>
    
    </code></pre>
<p>Result:</p>
<p>jCanvas example: Connected Arrows</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629513" src="https://static.alili.tech/img/remote/1460000006629513" alt="arrow" title="arrow" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">绘制文本</h2>
<p>你可以使用<a href="http://projects.calebevans.me/jcanvas/docs/text/" rel="nofollow noreferrer" target="_blank">drawText()方法</a>快速的绘制出你需要的文字，这个方法的主要的功能：</p>
<ol>
<li><p>text：将此属性设置为你想要显示在画布上的文字内容：例如：‘Hello World’</p></li>
<li><p>fontsize：此属性的值决定了在画布上的文字的大小。你可以为这个属性设置为一个数字，jCanvas默认为像素。另外，你也可以使用pt,但是在这种情况下，你需要用引号将属性值包括起来</p></li>
<li><p>fontFamily：允许你指定您的文字图像的字体：'Verdana, sans-serif'。</p></li>
</ol>
<p>这里的示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawText({
  text: 'Canvas is fun',
  fontFamily: 'cursive',
  fontSize: 40,
  x: 290, y: 150,
  fillStyle: 'lightblue',
  strokeStyle: 'blue',
  strokeWidth: 1
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawText({</span>
<span class="hljs-attr">  text:</span> <span class="hljs-string">'Canvas is fun'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fontFamily:</span> <span class="hljs-string">'cursive'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fontSize:</span> <span class="hljs-number">40</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">290</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">150</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'lightblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeStyle:</span> <span class="hljs-string">'blue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  strokeWidth:</span> <span class="hljs-number">1</span>
<span class="hljs-string">});</span>

</code></pre>
<p>在浏览器中将是这样的效果：</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Drawing text</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Drawing <span class="hljs-built_in">text</span>&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;

</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}

</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawText({
  text: 'jCanvas is fun',
  fontFamily: 'cursive',
  fontSize: 40,
  x: 290, y: 150,
  fillStyle: 'lightblue',
  strokeStyle: 'blue',
  strokeWidth: 1
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>
<span class="hljs-comment">// Store the canvas object into a variable</span>
var $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

$myCanvas.drawText({
  <span class="hljs-keyword">text</span>: <span class="hljs-string">'jCanvas is fun'</span>,
  fontFamily: <span class="hljs-string">'cursive'</span>,
  fontSize: <span class="hljs-number">40</span>,
  x: <span class="hljs-number">290</span>, y: <span class="hljs-number">150</span>,
  fillStyle: <span class="hljs-string">'lightblue'</span>,
  strokeStyle: <span class="hljs-string">'blue'</span>,
  strokeWidth: <span class="hljs-number">1</span>
});
</code></pre>
<p>Result:</p>
<p>jCanvas example: Drawing text</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629509" src="https://static.alili.tech/img/remote/1460000006629509" alt="text" title="text" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">绘制图片</h2>
<p>你可以使用<a href="http://projects.calebevans.me/jcanvas/docs/images/" rel="nofollow noreferrer" target="_blank">drawImage()方法</a>来导入和处理图片。下面是一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawImage({
  source: 'imgs/cat.jpg',
  x: 250, y: 100,
  fromCenter: false,
  shadowColor: '#222',
  shadowBlur: 3,
  rotate: 40
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawImage({</span>
<span class="hljs-attr">  source:</span> <span class="hljs-string">'imgs/cat.jpg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">250</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fromCenter:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowColor:</span> <span class="hljs-string">'#222'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowBlur:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">  rotate:</span> <span class="hljs-number">40</span>
<span class="hljs-string">});</span>
</code></pre>
<p>这是上面代码的呈现方式：</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Importing and manipulating an image</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;h2&gt;jCanvas <span class="hljs-built_in">example</span>: Importing <span class="hljs-keyword">and</span> manipulating an <span class="hljs-built_in">image</span>&lt;/h2&gt;

&lt;canvas id=<span class="hljs-string">"myCanvas"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"600"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-built_in">is</span> fallback <span class="hljs-built_in">content</span> <span class="hljs-keyword">for</span> users of assistive technologies <span class="hljs-keyword">or</span> of browsers that don't have full support <span class="hljs-keyword">for</span> the Canvas API.&lt;/p&gt;
&lt;/canvas&gt;
    
</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}
</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawImage({
  source: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/cat.jpg',
  x: 250, y: 100,
  fromCenter: false,
  shadowColor: '#222',
  shadowBlur: 3,
  rotate: 40
});
    
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// Store the canvas object into a variable</span>
var $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

$myCanvas.drawImage({
  <span class="hljs-keyword">source</span>: <span class="hljs-string">'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/cat.jpg'</span>,
  x: <span class="hljs-number">250</span>, y: <span class="hljs-number">100</span>,
  fromCenter: false,
  shadowColor: <span class="hljs-string">'#222'</span>,
  shadowBlur: <span class="hljs-number">3</span>,
  <span class="hljs-keyword">rotate</span>: <span class="hljs-number">40</span>
});
    
    
    </code></pre>
<p>Result:</p>
<p>jCanvas example: Importing and manipulating an image</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629519" src="https://static.alili.tech/img/remote/1460000006629519" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>你可以随便的改变上面示例的代码，戳这里：<a href="http://codepen.io/SitePoint/pen/ZQoWQM" rel="nofollow noreferrer" target="_blank">CodePen demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="SitePoint/pen/ZQoWQM" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader9">Canvas层</h2>
<p>如果你曾经使用过，如Photoshop或Gimp图像编辑器类的应用程序，你可能会对图层有所了解，使用图层最爽的地方在于，你可以在画布上控制每个图像。</p>
<p>jCanvas提供了一个功能强大的<a href="http://projects.calebevans.me/jcanvas/docs/layerAPI/" rel="nofollow noreferrer" target="_blank">API</a>，基于你的画布增加了灵活性。</p>
<p>这里介绍了如何使用jCanvas的层。</p>
<h3 id="articleHeader10">添加图层</h3>
<p>你只能在每一个层上绘制一个对象。在你的jCanvas项目中你有两种添加图层的方式：</p>
<ol>
<li><p>使用 addLayer()方法，其次是drawLayers()方法</p></li>
<li><p>在任何的绘制方法里设置layer属性的值为true</p></li>
</ol>
<p>下面是如何运用第一种技术来绘制一个蓝色矩形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.addLayer({
  type: 'rectangle',
  fillStyle: 'steelblue',
  fromCenter: false,
  name: 'blueRectangle',
  x: 50, y: 50,
  width: 400, height: 200
}).drawLayers();

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.addLayer({</span>
<span class="hljs-attr">  type:</span> <span class="hljs-string">'rectangle'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fromCenter:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">'blueRectangle'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span>
<span class="hljs-attr">  width:</span> <span class="hljs-number">400</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">200</span>
<span class="hljs-string">}).drawLayers();</span>

</code></pre>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Drawing a rectangle with addLayer()</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Drawing a rectangle <span class="hljs-keyword">with</span> addLayer()&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;
</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}

</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.addLayer({
  type: 'rectangle',
  fillStyle: 'steelblue',
  fromCenter: false,
  name: 'blueRectangle',
  x: 50, y: 50,
  width: 400, height: 200
}).drawLayers();
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// Store the canvas object into a variable</span>
<span class="hljs-built_in">var</span> $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

$myCanvas.addLayer({
  <span class="hljs-keyword">type</span>: <span class="hljs-string">'rectangle'</span>,
  fillStyle: <span class="hljs-string">'steelblue'</span>,
  fromCenter: <span class="hljs-literal">false</span>,
  name: <span class="hljs-string">'blueRectangle'</span>,
  x: <span class="hljs-number">50</span>, y: <span class="hljs-number">50</span>,
  width: <span class="hljs-number">400</span>, height: <span class="hljs-number">200</span>
}).drawLayers();
    
</code></pre>
<p>Result:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629517" src="https://static.alili.tech/img/remote/1460000006629517" alt="bluerect" title="bluerect" style="cursor: pointer;"></span></p>
<p>这里是你如何得到同样矩形的第二种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawRect({
  fillStyle: 'steelblue',
  layer: true,
  name: 'blueRectangle',
  fromCenter: false,
  x: 50, y: 50,
  width: 400, height: 200
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawRect({</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  layer:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">'blueRectangle'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fromCenter:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span>
<span class="hljs-attr">  width:</span> <span class="hljs-number">400</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">200</span>
<span class="hljs-string">});</span>

</code></pre>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Using drawing method with layer set to &quot;true&quot;</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>&lt;h2&gt;jCanvas example: <span class="hljs-keyword">Using</span> drawing method <span class="hljs-keyword">with</span> layer <span class="hljs-keyword">set</span> <span class="hljs-keyword">to</span> <span class="hljs-string">"true"</span>&lt;/h2&gt;

&lt;canvas id=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers that don<span class="hljs-comment">'t have full support for the Canvas API.<span class="hljs-doctag">&lt;/p&gt;</span></span>
&lt;/canvas&gt;


</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}

</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

$myCanvas.drawRect({
  fillStyle: 'steelblue',
  layer: true,
  name: 'blueRectangle',
  fromCenter: false,
  x: 50, y: 50,
  width: 400, height: 200
});    
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">Store</span> <span class="hljs-string">the</span> <span class="hljs-string">canvas</span> <span class="hljs-string">object</span> <span class="hljs-string">into</span> <span class="hljs-string">a</span> <span class="hljs-string">variable</span>
<span class="hljs-string">var</span> <span class="hljs-string">$myCanvas</span> <span class="hljs-string">=</span> <span class="hljs-string">$('#myCanvas');</span>

<span class="hljs-string">$myCanvas.drawRect({</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  layer:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">'blueRectangle'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fromCenter:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span>
<span class="hljs-attr">  width:</span> <span class="hljs-number">400</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">200</span>
<span class="hljs-string">});</span>    
    
    </code></pre>
<p>Result:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629517" src="https://static.alili.tech/img/remote/1460000006629517" alt="tworect" title="tworect" style="cursor: pointer;"></span></p>
<p>正如你所看到的，上面的两种方法，我们得到了相同的结果。</p>
<p>最重要的一点是在上面两个代码样本中可以发现，上面的层你通过name设置的一个名称。这使得他易于参照本层的代码做出各种炫酷的东西，像改变其索引值，动画，删除等等。</p>
<p>让我们看看如何能够做到这一点。</p>
<h3 id="articleHeader11">动画层</h3>
<p>你可以使用jCanvas的 <a href="http://projects.calebevans.me/jcanvas/docs/animateLayers/" rel="nofollow noreferrer" target="_blank">animateLayer()方法</a>，快速的在你的基础图层上添加动画，此方法接受以下参数：</p>
<ol>
<li><p>该层的 index 或者 name</p></li>
<li><p>具有键值对的动画对象</p></li>
<li><p>以毫秒为单位的动画时长（duration）。这是个默认的参数，如果不设置，默认为400</p></li>
<li><p>动画的运动方式（easing ）。这也是一个可选的参数，如果不设置，则默认为摇摆</p></li>
<li><p>动画完成之后的回调函数（callback），也是可选的。</p></li>
</ol>
<p>让我们来看一下animateLayer() 方法的效果，我们将在一个层上绘制一个半透明的橙色圆圈，然后设置动画的位置，颜色以及透明度属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Draw circle
$myCanvas.drawArc({
  name: 'orangeCircle',
  layer: true,
  x: 50, y: 50,
  radius: 100,
  fillStyle: 'orange',
  opacity: 0.5
});

// Animate the circle layer 
$myCanvas.animateLayer('orangeCircle', {
  x: 150, y: 150,
  radius: 50,
}, 1000, function(layer) { // Callback function
  $(this).animateLayer(layer, {
    fillStyle: 'darkred',
    x: 250, y: 100,
    opacity: 1
  }, 'slow', 'ease-in-out');
});
    


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Draw circle</span>
$myCanvas.drawArc({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'orangeCircle'</span>,
  <span class="hljs-attr">layer</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">x</span>: <span class="hljs-number">50</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">50</span>,
  <span class="hljs-attr">radius</span>: <span class="hljs-number">100</span>,
  <span class="hljs-attr">fillStyle</span>: <span class="hljs-string">'orange'</span>,
  <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.5</span>
});

<span class="hljs-comment">// Animate the circle layer </span>
$myCanvas.animateLayer(<span class="hljs-string">'orangeCircle'</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-number">150</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>,
  <span class="hljs-attr">radius</span>: <span class="hljs-number">50</span>,
}, <span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">layer</span>) </span>{ <span class="hljs-comment">// Callback function</span>
  $(<span class="hljs-keyword">this</span>).animateLayer(layer, {
    <span class="hljs-attr">fillStyle</span>: <span class="hljs-string">'darkred'</span>,
    <span class="hljs-attr">x</span>: <span class="hljs-number">250</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>
  }, <span class="hljs-string">'slow'</span>, <span class="hljs-string">'ease-in-out'</span>);
});
    


</code></pre>
<p>看一下下面例子中的动画：</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>jCanvas example: Animating Layers</h2>

<canvas id=&quot;myCanvas&quot; width=&quot;600&quot; height=&quot;300&quot;>
  <p>This is fallback content for users of assistive technologies or of browsers that don't have full support for the Canvas API.</p>
</canvas>
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;h2&gt;jCanvas example: Animating Layers&lt;/h2&gt;

&lt;canvas <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCanvas"</span> width=<span class="hljs-string">"600"</span> height=<span class="hljs-string">"300"</span>&gt;
  &lt;p&gt;This <span class="hljs-keyword">is</span> fallback content <span class="hljs-keyword">for</span> users <span class="hljs-keyword">of</span> assistive technologies <span class="hljs-keyword">or</span> <span class="hljs-keyword">of</span> browsers <span class="hljs-keyword">that</span> don't have full support <span class="hljs-keyword">for</span> <span class="hljs-keyword">the</span> Canvas API.&lt;/p&gt;
&lt;/canvas&gt;
    
</code></pre>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  text-align: center;
}

canvas {
  margin: auto;
  display: block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}
</code></pre>
<p>JS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Store the canvas object into a variable
var $myCanvas = $('#myCanvas');

// Draw circle
$myCanvas.drawArc({
  name: 'orangeCircle',
  layer: true,
  x: 50, y: 50,
  radius: 100,
  fillStyle: 'orange',
  opacity: 0.5
});

// Animate the circle layer 
$myCanvas.animateLayer('orangeCircle', {
  x: 150, y: 150,
  radius: 50,
}, 1000, function(layer) { // Callback function
  $(this).animateLayer(layer, {
    fillStyle: 'darkred',
    x: 250, y: 100,
    opacity: 1
  }, 'slow', 'ease-in-out');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Store the canvas object into a variable</span>
<span class="hljs-keyword">var</span> $myCanvas = $(<span class="hljs-string">'#myCanvas'</span>);

<span class="hljs-comment">// Draw circle</span>
$myCanvas.drawArc({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'orangeCircle'</span>,
  <span class="hljs-attr">layer</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">x</span>: <span class="hljs-number">50</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">50</span>,
  <span class="hljs-attr">radius</span>: <span class="hljs-number">100</span>,
  <span class="hljs-attr">fillStyle</span>: <span class="hljs-string">'orange'</span>,
  <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.5</span>
});

<span class="hljs-comment">// Animate the circle layer </span>
$myCanvas.animateLayer(<span class="hljs-string">'orangeCircle'</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-number">150</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>,
  <span class="hljs-attr">radius</span>: <span class="hljs-number">50</span>,
}, <span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">layer</span>) </span>{ <span class="hljs-comment">// Callback function</span>
  $(<span class="hljs-keyword">this</span>).animateLayer(layer, {
    <span class="hljs-attr">fillStyle</span>: <span class="hljs-string">'darkred'</span>,
    <span class="hljs-attr">x</span>: <span class="hljs-number">250</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>
  }, <span class="hljs-string">'slow'</span>, <span class="hljs-string">'ease-in-out'</span>);
});
</code></pre>
<p>Result:</p>
<p>jCanvas example: Animating Layers</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629521" src="https://static.alili.tech/img/remote/1460000006629521" alt="red" title="red" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">可拖动图层</h3>
<p>我想提醒你注意的是它还有一个很酷的功能，你可以在<a href="http://projects.calebevans.me/jcanvas/docs/draggableLayers/" rel="nofollow noreferrer" target="_blank">可拖动层</a>里设置draggable属性和layer 属性的值为true，就可以将一个普通的jCanvas层变成可拖动的层了。</p>
<p>具体方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawRect({
  layer: true,
  draggable: true,
  bringToFront: true,
  name: 'blueSquare',
  fillStyle: 'steelblue',
  x: 250, y: 150,
  width: 100, height: 100,
  rotate: 80,
  shadowX: -1, shadowY: 8,
  shadowBlur: 2,
  shadowColor: 'rgba(0, 0, 0, 0.8)'
})
.drawRect({
  layer: true,
  draggable: true,
  bringToFront: true,
  name: 'redSquare',
  fillStyle: 'red',
  x: 190, y: 100,
  width: 100, height: 100,
  rotate: 130,
  shadowX: -2, shadowY: 5,
  shadowBlur: 3,
  shadowColor: 'rgba(0, 0, 0, 0.5)'
});
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$myCanvas.drawRect({</span>
<span class="hljs-attr">  layer:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  draggable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  bringToFront:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">'blueSquare'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'steelblue'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">250</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">150</span><span class="hljs-string">,</span>
<span class="hljs-attr">  width:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  rotate:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowX:</span> <span class="hljs-bullet">-1</span><span class="hljs-string">,</span> <span class="hljs-attr">shadowY:</span> <span class="hljs-number">8</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowBlur:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowColor:</span> <span class="hljs-string">'rgba(0, 0, 0, 0.8)'</span>
<span class="hljs-string">})</span>
<span class="hljs-string">.drawRect({</span>
<span class="hljs-attr">  layer:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  draggable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  bringToFront:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">'redSquare'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fillStyle:</span> <span class="hljs-string">'red'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">190</span><span class="hljs-string">,</span> <span class="hljs-attr">y:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  width:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">  rotate:</span> <span class="hljs-number">130</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowX:</span> <span class="hljs-bullet">-2</span><span class="hljs-string">,</span> <span class="hljs-attr">shadowY:</span> <span class="hljs-number">5</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowBlur:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">  shadowColor:</span> <span class="hljs-string">'rgba(0, 0, 0, 0.5)'</span>
<span class="hljs-string">});</span>
    
</code></pre>
<p>在上面的代码段中，通过把属性draggable设置为true，绘制出了两个可拖动的矩形层。此外，请小心使用bringToFront属性，以确保当你拖动层时，他会被自动拖到所有其他现有的图层的前面。</p>
<p>最后，在上述代码段中添加旋转图层的代码并且设置一个盒子阴影，只是为了告诉你如何快速的在你的jCanvas图纸上添加一些特效。</p>
<p>结果会是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006629515" src="https://static.alili.tech/img/remote/1460000006629515" alt="rotate" title="rotate" style="cursor: pointer;"></span></p>
<p>如果你想在在你拖动图层之前，之间或者之后做一些事情的话，jCanvas 可以很容易的利用相关的回调函数来实现这一点：</p>
<ol>
<li><p>dragstart：当你开始拖动图层的时候的触发器</p></li>
<li><p>drag：当你正在拖动图层时发生</p></li>
<li><p>dragstop：当你停止拖动图层时的触发器</p></li>
<li><p>dragcancel：当你拖动的图层到了画布表面的边界时发生</p></li>
</ol>
<p>比方说，当用户完成拖动层之后，你想在页面上显示一条消息，你可以通过添加一个回调函数dragstop来实现，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$myCanvas.drawRect({
  layer: true,

  // Rest of the code as shown above...

  // Callback function
  dragstop: function(layer) {
    var layerName = layer.name;
    el.innerHTML = 'The ' + layerName + ' layer has been dropped.';
  }
})
.drawRect({
  layer: true,

  // Rest of the code...

  // Callback function
  dragstop: function(layer) {
    var layerName = layer.name;
    el.innerHTML = 'The ' + layerName + ' layer has been dropped.';
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>$myCanvas.drawRect({
  layer: <span class="hljs-keyword">true</span>,

  <span class="hljs-comment">// Rest of the code as shown above...</span>

  <span class="hljs-comment">// Callback function</span>
  dragstop: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(layer)</span> </span>{
    <span class="hljs-keyword">var</span> layerName = layer.name;
    el.innerHTML = <span class="hljs-string">'The '</span> + layerName + <span class="hljs-string">' layer has been dropped.'</span>;
  }
})
.drawRect({
  layer: <span class="hljs-keyword">true</span>,

  <span class="hljs-comment">// Rest of the code...</span>

  <span class="hljs-comment">// Callback function</span>
  dragstop: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(layer)</span> </span>{
    <span class="hljs-keyword">var</span> layerName = layer.name;
    el.innerHTML = <span class="hljs-string">'The '</span> + layerName + <span class="hljs-string">' layer has been dropped.'</span>;
  }
});
</code></pre>
<h2 id="articleHeader13">结论</h2>
<p>在这篇文章中，我向你介绍了jCanvas，一个新的基于jQuery能与HTML5的 Canvas API一起使用的库。我已经简单的介绍了一些jCanvas的属性和方法，能够让你快速的在画布和是哪个绘制图形，增加视觉效果，动画和拖动图层。</p>
<p>你可以访问<a href="http://projects.calebevans.me/jcanvas/docs/" rel="nofollow noreferrer" target="_blank">jCanvas文档</a>，这里有很多的详细指导和示例。你要可以在 jCanvas网站的 <a href="http://projects.calebevans.me/jcanvas/sandbox/" rel="nofollow noreferrer" target="_blank">sandbox</a>上进行快速测试。</p>
<hr>
<p><strong>作者信息</strong></p>
<p>原文作者：<a href="https://www.sitepoint.com/author/mperna/" rel="nofollow noreferrer" target="_blank">Maria Antonietta Perna</a><br>原文链接：<a href="http://t.cn/Rt82jVj" rel="nofollow noreferrer" target="_blank">http://t.cn/Rt82jVj</a><br>翻译自力谱宿云 LeapCloud旗下MaxLeap团队_前端研发人员：Ammie白<br>中文翻译首发：<a href="https://blog.maxleap.cn/archives/1071" rel="nofollow noreferrer" target="_blank">https://blog.maxleap.cn/archi...</a><br>译者简介：新晋前端一枚，目前负责 MaxLeap 网站展示性内容的实现。喜欢自己尝试写一些js特效小Demo。</p>
<p><strong>相关文章</strong><br><a href="https://blog.maxleap.cn/archives/705" rel="nofollow noreferrer" target="_blank">无需Flash实现图片裁剪——HTML5中级进阶</a></p>
<p><strong>作者往期佳作</strong><br><a href="https://blog.maxleap.cn/archives/789" rel="nofollow noreferrer" target="_blank">如何结合Gulp使用PostCss</a></p>
<hr>
<p><strong>活动预告</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVBYU2" src="https://static.alili.tech/img/bVBYU2" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>报名链接：<a href="http://t.cn/Rt9ooRw" rel="nofollow noreferrer" target="_blank">http://t.cn/Rt9ooRw</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简介 jCanvas：当 jQuery遇上HTML5 Canvas

## 原文链接
[https://segmentfault.com/a/1190000006615569](https://segmentfault.com/a/1190000006615569)


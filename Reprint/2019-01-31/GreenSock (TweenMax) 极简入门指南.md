---
title: 'GreenSock (TweenMax) 极简入门指南' 
date: 2019-01-31 2:31:16
hidden: true
slug: nvtmua2a1hd
categories: [reprint]
---

{{< raw >}}

                    
<p>最近把GreenSock的一些知识以及一些开发技巧使用gitbook整理了一本在线的电子书，<a href="http://svgtrick.com/book/greensock/" rel="nofollow noreferrer" target="_blank">GreenSock电子书</a>可以去看看，下面是一个基本入门的简化版本，更详细的可以去看在线的版本，里面有详细的介绍以及一些高级应用技巧，<a href="http://svgtrick.com/book/greensock/" rel="nofollow noreferrer" target="_blank">GreenSock电子书</a></p>
<p>今天就来开始学习下牛逼的javascript动画库GASP(greensock)。</p>
<p><a href="http://www.greensock.com/about/" rel="nofollow noreferrer" target="_blank">GreenSock</a>在Flash动画时代久负盛名，并且GreenSock的维护团队与时俱进，推出了以javascript为核心的GreenSock，在Flash和HTML5项目中，你可以使用相同的动画工具集，同样的API，同样的开发体验，同样关注性能。</p>
<p>它具有以下优点:</p>
<p>1、速度快。GSAP专门优化了动画性能，使之实现和CSS一样的高性能动画效果。 </p>
<p>2、轻量与模块化。模块化与插件式的结构保持了核心引擎的轻量，TweenLite包非常小（基本上低于7kb）。GSAP提供了TweenLite, TimelineLite, TimelineMax 和 TweenMax不同功能的动画模块，你可以按需使用。 </p>
<p>3、没有依赖。 </p>
<p>4、灵活控制。不用受限于线性序列，可以重叠动画序列，你可以通过精确时间控制，灵活地使用最少的代码实现动画。 </p>
<p>5、任何对象都可以实现动画。</p>
<p>下面就开始GreenSock之旅吧。</p>
<h3 id="articleHeader0">开始</h3>
<p>开始之前先来了解下GSAP动画平台四个插件的不同功能。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496081?w=600&amp;h=920" src="https://static.alili.tech/img/remote/1460000007496081?w=600&amp;h=920" alt="" title="" style="cursor: pointer;"></span></p>
<p>开始之前我们先准备一些基本的代码，如下所示：</p>
<p>html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
  <div class=&quot;boxSmall&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"boxSmall"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  background-color: #262626;
  font-family: 'Open Sans', sans-serif;
  overflow: hidden;
}
#box {
  background-color: #88ce02;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.boxSmall {
  position: absolute;
  background-color: #70a40b;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 25px;
  height: 75px;
  z-index: 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#262626</span>;
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Open Sans'</span>, sans-serif;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-id">#box</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#88ce02</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.boxSmall</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#70a40b</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">75px</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
}</code></pre>
<p>当然还得引入GreenSock文件，这里我们引入的是<strong>TweenMax</strong>这个全功能的js文件，为了操作方便我们还需要引入jquery来选择和操作DOM。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">https:<span class="hljs-regexp">//</span>cdnjs.cloudflare.com<span class="hljs-regexp">/ajax/</span>libs<span class="hljs-regexp">/gsap/</span><span class="hljs-number">1.19</span>.<span class="hljs-number">0</span><span class="hljs-regexp">/TweenMax.min.js</span></code></pre>
<p>这里为了演示方便，使用了codepen这个代码平台来运行我们编写的效果。</p>
<p><a href="http://codepen.io/janily/pen/xwbpGw" rel="nofollow noreferrer" target="_blank">demo地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/xwbpGw" data-typeid="3">点击预览</button></p>
<p>OK，准备工作已做好，下面来让它动起来！</p>
<p>我们这里操作的物体是这个ID为box的盒子。首先把它用一个变量存起来，方便后面来操作。在codepen里的js区域编写下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $box = $('#box');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">var <span class="hljs-variable">$box</span> = <span class="hljs-variable">$(</span><span class="hljs-string">'#box'</span>);</code></pre>
<h3 id="articleHeader1">TweenLite.to()方法</h3>
<p>下面就是让它动起来，可以使用TweenLite.to()方法来使元素动起来。比如，让元素移动到浏览器左边的边缘，我们就可以使用TweenLite.to()方法。</p>
<p>下面是TweenLite.to()方法的示意图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496082?w=624&amp;h=179" src="https://static.alili.tech/img/remote/1460000007496082?w=624&amp;h=179" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在codepen中加入下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to($box, 0.7, {left: 0});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;">TweenLite<span class="hljs-selector-class">.to</span>(<span class="hljs-variable">$box</span>, 0<span class="hljs-selector-class">.7</span>, {<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>});</code></pre>
<p>上面的代码会在0.7秒之内把$box元素从CSS中定义的位置移动到body的边缘。如下所示：(鼠标移动到右下角，有一个return按钮，点击以下就会重新运行代码，就可以看到效果了)。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496083?w=839&amp;h=276" src="https://static.alili.tech/img/remote/1460000007496083?w=839&amp;h=276" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/janily/pen/meypPB" rel="nofollow noreferrer" target="_blank">demo地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/meypPB" data-typeid="3">点击预览</button></p>
<p>不过，你应该发现了一个奇怪的小问题。那就是$box元素只有一半露出来了，应该是全部显示的，这是为什么呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496084?w=624&amp;h=358" src="https://static.alili.tech/img/remote/1460000007496084?w=624&amp;h=358" alt="" title="" style="cursor: pointer;"></span></p>
<p>这是因为我们在CSS中定义了transform: translate(–50%, –50%)，这个时候可以通过定义元素的X的值来修正这个小bug。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to($box, 0.7, {left: 0, x: 0});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;">TweenLite<span class="hljs-selector-class">.to</span>(<span class="hljs-variable">$box</span>, 0<span class="hljs-selector-class">.7</span>, {<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>, x: <span class="hljs-number">0</span>});</code></pre>
<h3 id="articleHeader2">TweenLite.from方法</h3>
<p>下面来看下TweenLite.from这个方法。</p>
<p>在上面的例子上，我们修改代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.from($box, 2, {x: '-=200px', autoAlpha: 0});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">TweenLite.from($box, <span class="hljs-number">2</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'-=200px'</span>, <span class="hljs-string">autoAlpha:</span> <span class="hljs-number">0</span>});</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496085?w=624&amp;h=232" src="https://static.alili.tech/img/remote/1460000007496085?w=624&amp;h=232" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个方法是用来使元素从定义在.from()方法里的位置运动到在CSS中定义的位置。</p>
<p>运行这个例子，我们会看到元素从元素左边200px的位置运动到元素在CSS中定义的位置。</p>
<p>autoAlpha方法是GSAP中一个特别的属性，它把opacity和visibility两个属性合二为一了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496086?w=624&amp;h=324" src="https://static.alili.tech/img/remote/1460000007496086?w=624&amp;h=324" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在代码中autoAlpha: 0表示它会把元素初始化为opacity:0;visibility:hidden。当执行动画效果的时候它会把visibility的值设置为inherit以及opacity值设置为1。从而产生一个渐现的效果。</p>
<h3 id="articleHeader3">TweenLite.set()</h3>
<p>有时候，我们只是想设置元素的一些CSS属性并不需要动画效果，比如，重设元素的位置。</p>
<p>这个时候就可以使用GreenSock提供的.set()方法。</p>
<p>去掉我们前面编写的代码除了定义好的$box变量，编写下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.set($box, {x: '-=200px', scale: 0.3});
TweenLite.set($box, {x: '+=100px', scale: 0.6, delay: 1});
TweenLite.set($box, {x: '-50%', scale: 1, delay: 2});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>TweenLite<span class="hljs-meta">.set</span>($<span class="hljs-keyword">box, </span>{x: <span class="hljs-string">'-=200px'</span>, <span class="hljs-keyword">scale: </span><span class="hljs-number">0</span>.<span class="hljs-number">3</span>})<span class="hljs-comment">;</span>
TweenLite<span class="hljs-meta">.set</span>($<span class="hljs-keyword">box, </span>{x: <span class="hljs-string">'+=100px'</span>, <span class="hljs-keyword">scale: </span><span class="hljs-number">0</span>.<span class="hljs-number">6</span>, delay: <span class="hljs-number">1</span>})<span class="hljs-comment">;</span>
TweenLite<span class="hljs-meta">.set</span>($<span class="hljs-keyword">box, </span>{x: <span class="hljs-string">'-50%'</span>, <span class="hljs-keyword">scale: </span><span class="hljs-number">1</span>, delay: <span class="hljs-number">2</span>})<span class="hljs-comment">;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496087?w=624&amp;h=358" src="https://static.alili.tech/img/remote/1460000007496087?w=624&amp;h=358" alt="" title="" style="cursor: pointer;"></span></p>
<p>运行上面的代码，可以看到元素只是单纯的在改变属性并没有动画效果。</p>
<p>在上面的代码中，我们使用delay这个属性来制定元素属性改变的延迟时间。</p>
<p>要注意一点的是，在最后一个序列中我们重新设置元素的位置为x: ‘-50%’。</p>
<h3 id="articleHeader4">TweenLite.fromTo()方法</h3>
<p>最后来说一说TweenLite.fromTo这个方法。</p>
<p>顾名思义，这个方法我们可以定义元素的起始位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.fromTo($box, 2, {x: '-=200px'}, {x: 150});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;">TweenLite.fromTo($box, <span class="hljs-number">2</span>, {x: <span class="hljs-string">'-=200px'</span>}, {x: <span class="hljs-number">150</span>});</code></pre>
<p>把上面的代码放入到codepen中，就可以看到运行的动画效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496088?w=624&amp;h=276" src="https://static.alili.tech/img/remote/1460000007496088?w=624&amp;h=276" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们定义了元素从左边200px的位置开始运动到指定的位置。</p>
<p>x:150会覆盖在CSS中定义的transform: translate(–50%, –50%)的样式，用新的transform: matrix(1, 0, 0, 1, 150, -50);样式来代替。</p>
<h3 id="articleHeader5">缓动曲线</h3>
<p>为了使动画效果更有趣，符合真实的物体运动效果。这个时候缓动曲线函数就派上用场了，GreenSock也提供了各种的运动曲线。</p>
<p>如果使用的是TweenMax的话，它已经包含了EasePack。</p>
<p>EasePack包含下面的这些运动曲线：</p>
<p>1、Back 2、SlowMo 3、StppedEase 4、RoughEase 5、Bounce 6、Circ 7、Elastic 8、Expo 9、Sine</p>
<p>下面来添加ease:Power4.easeInOut来看看实际的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.fromTo($box, 2, {x: '-=200px'}, {x: 150, ease:Power4.easeInOut});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">TweenLite.fromTo($box, <span class="hljs-number">2</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'-=200px'</span>}, {<span class="hljs-string">x:</span> <span class="hljs-number">150</span>, <span class="hljs-string">ease:</span>Power4.easeInOut});</code></pre>
<p>试着添加下面的代码，看看有什么有趣的效果发生？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to($box, 0.4, {top: '100%', y: '-100%', ease:Bounce.easeOut, delay: 2});
TweenLite.to($box, 0.7, {x: '-=200px', y: '-100%', ease:Back.easeInOut, delay: 3});
TweenLite.to($box, 0.8, {x: '-=200px', y: '-100%', ease:Back.easeInOut, delay: 4.2});
TweenLite.to($box, 2.5, {top: '50%', y: '-50%', ease:Power0.easeNone, delay: 5});
TweenLite.to($box, 2.5, {x: '+=400px', ease:Elastic.easeInOut, delay: 7.7});
TweenLite.to($box, 2.5, {x: '-=400px', rotation: -720, ease: SlowMo.ease.config(0.1, 0.7, false), delay: 10.4});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>TweenLite.to($box, <span class="hljs-number">0.4</span>, {<span class="hljs-string">top:</span> <span class="hljs-string">'100%'</span>, <span class="hljs-string">y:</span> <span class="hljs-string">'-100%'</span>, <span class="hljs-string">ease:</span>Bounce.easeOut, <span class="hljs-string">delay:</span> <span class="hljs-number">2</span>});
TweenLite.to($box, <span class="hljs-number">0.7</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'-=200px'</span>, <span class="hljs-string">y:</span> <span class="hljs-string">'-100%'</span>, <span class="hljs-string">ease:</span>Back.easeInOut, <span class="hljs-string">delay:</span> <span class="hljs-number">3</span>});
TweenLite.to($box, <span class="hljs-number">0.8</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'-=200px'</span>, <span class="hljs-string">y:</span> <span class="hljs-string">'-100%'</span>, <span class="hljs-string">ease:</span>Back.easeInOut, <span class="hljs-string">delay:</span> <span class="hljs-number">4.2</span>});
TweenLite.to($box, <span class="hljs-number">2.5</span>, {<span class="hljs-string">top:</span> <span class="hljs-string">'50%'</span>, <span class="hljs-string">y:</span> <span class="hljs-string">'-50%'</span>, <span class="hljs-string">ease:</span>Power0.easeNone, <span class="hljs-string">delay:</span> <span class="hljs-number">5</span>});
TweenLite.to($box, <span class="hljs-number">2.5</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'+=400px'</span>, <span class="hljs-string">ease:</span>Elastic.easeInOut, <span class="hljs-string">delay:</span> <span class="hljs-number">7.7</span>});
TweenLite.to($box, <span class="hljs-number">2.5</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'-=400px'</span>, <span class="hljs-string">rotation:</span> <span class="hljs-number">-720</span>, <span class="hljs-string">ease:</span> SlowMo.ease.config(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.7</span>, <span class="hljs-literal">false</span>), <span class="hljs-string">delay:</span> <span class="hljs-number">10.4</span>});</code></pre>
<p>具体各种运动曲线的效果可以去这个<a href="http://greensock.com/ease-visualizer" rel="nofollow noreferrer" target="_blank">地址</a>看看。</p>
<h3 id="articleHeader6">回调函数</h3>
<p>GreenSock提供了丰富的回调函数来操作动画效果。</p>
<p>这里以.fromTo()方法来说明它的用法。</p>
<p>比如，我们想要在动画开始的时候来触发回调函数。首先来创建一个start的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function start(){
  console.log('start');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start'</span>);
}</code></pre>
<p>触发回调函数，只需要添加下面这句代码就可以了onStart:start就可以了，非常简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.fromTo($box, 2, {x: '-=200px'}, {x: 150, ease:Power4.easeInOut, onStart: start});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">TweenLite.fromTo($box, <span class="hljs-number">2</span>, {<span class="hljs-string">x:</span> <span class="hljs-string">'-=200px'</span>}, {<span class="hljs-string">x:</span> <span class="hljs-number">150</span>, <span class="hljs-string">ease:</span>Power4.easeInOut, <span class="hljs-string">onStart:</span> start});</code></pre>
<p>打开开发者工具，就可以看到输出的相关信息。</p>
<p>你也可以添加onUpdate和onComplete来触发对应的回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function start(){
  console.log('start');
}
function update(){
  console.log('animating');
}
function complete(){
  console.log('end');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'animating'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">complete</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496089?w=624&amp;h=271" src="https://static.alili.tech/img/remote/1460000007496089?w=624&amp;h=271" alt="" title="" style="cursor: pointer;"></span></p>
<p>onUpdate会在动画的每一帧触发；onComplete会在动画结束的时候触发。</p>
<p>看看最后的效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007496090?w=830&amp;h=274" src="https://static.alili.tech/img/remote/1460000007496090?w=830&amp;h=274" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="http://codepen.io/janily/pen/ZbYvVQ" rel="nofollow noreferrer" target="_blank">demo地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/ZbYvVQ" data-typeid="3">点击预览</button></p>
<p>最后再来一些好的tips：</p>
<p>1、任何的CSS属性需要从有－的写法变为驼峰式的写法。比如background-color修改为backgroundColor等。</p>
<p>2、CSS中的transform:rotate()变为rotation。</p>
<p>3、另外在GSAP中的2Dtransform－scaleX, scaleY, scale, skewX, skewY,x, y, xPercent,和 yPercent 的使用方法可以去<a href="https://www.youtube.com/watch?v=J5twQLXJ-vQ" rel="nofollow noreferrer" target="_blank">这个视频</a>看看。</p>
<p>4、如果使用SublimeText来作为开发工具，可以下载<a href="http://greensock.com/forums/topic/11071-sublimetext-snippets/" rel="nofollow noreferrer" target="_blank">GSAP这个代码片段</a>。</p>
<p>5、如果你使用JSHint和JSLint作为代码质量检测工具，可以去这看看它在GSAP中的<a href="http://greensock.com/forums/topic/11369-gsap-globals-for-jshint/" rel="nofollow noreferrer" target="_blank">使用方法</a>。</p>
<p>遇到问题随时查看GreenSock的<a href="http://greensock.com/docs/#/HTML5/GSAP/TweenLite/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<p>另外推荐一些有用的学习资源：</p>
<p><a href="https://greensock.com/jump-start-js" rel="nofollow noreferrer" target="_blank">Jump Start: GSAP JS</a></p>
<p><a href="http://greensock.com/get-started-js" rel="nofollow noreferrer" target="_blank">Getting Started Guide</a></p>
<p><a href="http://greensock.com/forums/forum/11-gsap/" rel="nofollow noreferrer" target="_blank">GSAP Forum</a></p>
<p><a href="https://nobledesktop.com/classes/greensock" rel="nofollow noreferrer" target="_blank">GreenSock course at Noble Desktop in New York</a></p>
<p><a href="https://nobledesktop.com/books/gsap" rel="nofollow noreferrer" target="_blank">GreenSock course workbook</a></p>
<p><a href="https://ihatetomatoes.net/product/greensock-workshop/" rel="nofollow noreferrer" target="_blank">GreenSock Workshop</a></p>
<p>更详细的可以去看看我整理的在线版本<a href="http://svgtrick.com/book/greensock/" rel="nofollow noreferrer" target="_blank">GreenSock电子书</a></p>
<p>文章来自于<a href="https://ihatetomatoes.net/simple-greensock-tutorial-your-first-steps-with-gsap/" rel="nofollow noreferrer" target="_blank">Simple GreenSock Tutorial – Your first steps with GSAP</a>有删减。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GreenSock (TweenMax) 极简入门指南

## 原文链接
[https://segmentfault.com/a/1190000007496078](https://segmentfault.com/a/1190000007496078)


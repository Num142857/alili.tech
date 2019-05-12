---
title: '使用 GreenSock 来制作 SVG 动画' 
date: 2019-01-30 2:30:23
hidden: true
slug: q802siw6pd
categories: [reprint]
---

{{< raw >}}

                    
<p>这是我的一个关于SVG的应用的技术分享网站<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">svgtrick.com</a>，会同步一些文章到这里来，更多关于SVG技术应用可以去<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">网站</a>看看。</p>
<p>最近从<a href="https://dribbble.com/shots/3100915-Coastal-Mountain-View" rel="nofollow noreferrer" target="_blank">Dribbble shot</a> 看到<a href="http://twitter.com/thorstenbeeck" rel="nofollow noreferrer" target="_blank">@thorstenbeeck</a>发布的一个设计效果图得到灵感。根据这个设计，使用GreenSock这个动画平台实现了一个SVG的动画效果，下面就来聊聊我是怎么实现这个动画效果的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007770471?w=663&amp;h=467" src="https://static.alili.tech/img/remote/1460000007770471?w=663&amp;h=467" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">GreenSock</h3>
<p>GreenSock是一个无需多介绍了，是一个专门用来开发动效的平台，并且提供了javascript版本。更多关于GreenSock的一个入门介绍可以去我整理的<a href="http://svgtrick.com/book/greensock/" rel="nofollow noreferrer" target="_blank">简明教程</a>看看，这里就不再介绍它的基本知识。</p>
<p>GreenSock在制作SVG动画方面也非常强悍，并且还专门提供了用于加强SVG动画制作的相关插件，比如<a href="https://greensock.com/drawSVG" rel="nofollow noreferrer" target="_blank">Greensock DrawSVG plugin</a>。它可以实现任何SVG图形的绘制，也可以操作诸如stroke-dashoffset和stroke-dasharray等CSS属性来制作一些描边的动画效果，下面来一个简单的实例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007770472?w=638&amp;h=286" src="https://static.alili.tech/img/remote/1460000007770472?w=638&amp;h=286" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/timrijkse/pen/jVyaVG" rel="nofollow noreferrer" target="_blank">详细代码地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="timrijkse/pen/jVyaVG" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader1">使用SVG来绘制图形</h3>
<p>这一步将使用SVG来实现Dribble shot上的效果图。从效果图可以看到整个图形都是由简单的一些几何图形组成的，而绘制图形正是SVG所擅长的，使用SVG来实现这样的形状非常简单。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007770473?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000007770473?w=800&amp;h=600" alt="" title="" style="cursor: pointer;"></span></p>
<p>首先来为整个图形创建一个画布。创建一个SVG元素。然后创建一个跟画布一样大的矩形元素 rect 然后使用一个圆形的 clipPath 元素来遮住整个画布使其内容只显示在圆形的遮罩内。代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg viewBox=&quot;0 0 500 500&quot;>

<g class=&quot;canvas&quot;>
<defs>
<clipPath id=&quot;circle&quot;>
<circle class=&quot;mask&quot; cx=&quot;250&quot; cy=&quot;250&quot; r=&quot;100&quot; />

</clipPath>
</defs>

<g clip-path=&quot;url(#circle)&quot;>

<rect class=&quot;bg&quot; x=&quot;0&quot; y=&quot;0&quot; width=&quot;500&quot; height=&quot;500&quot; />

</g>
</g>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 500 500"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"canvas"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">clipPath</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"circle"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mask"</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"100"</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">clipPath</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">clip-path</span>=<span class="hljs-string">"url(#circle)"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"500"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"500"</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>一个基本的布局就完成了。下面是来添加一些样式。当然你可以使用行内样式或者是内联样式也可以是外链样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<circle class=&quot;mask&quot; cx=&quot;250&quot; cy=&quot;250&quot; r=&quot;100&quot; fill=&quot;red&quot; />

<circle class=&quot;mask&quot; cx=&quot;250&quot; cy=&quot;250&quot; r=&quot;100&quot; style=&quot;fill: red;&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>
&lt;<span class="hljs-built_in">circle</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"mask"</span> cx=<span class="hljs-string">"250"</span> cy=<span class="hljs-string">"250"</span> r=<span class="hljs-string">"100"</span> <span class="hljs-built_in">fill</span>=<span class="hljs-string">"red"</span> /&gt;

&lt;<span class="hljs-built_in">circle</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"mask"</span> cx=<span class="hljs-string">"250"</span> cy=<span class="hljs-string">"250"</span> r=<span class="hljs-string">"100"</span> style=<span class="hljs-string">"fill: red;"</span> /&gt;</code></pre>
<p>一般样式建议使用外链的方式来引入样式，这样可以保证html的整洁以及可维护性。当然也可以使用诸如SASS等预编译语言来编写CSS，可以利用预编译语言提供的变量功能来管理颜色或者是字号等全局样式，非常方便。</p>
<p>由于我使用的是SASS，我把颜色都在SASS中定义好对应颜色名称的变量里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Color palette

$red: #E9214F;
$burnt-sienna: #F06B4B;

$goldenrod: #F6DA71;
$scooter: #349597;
$midnight-express: #20283B;

$marzipan: #FCDC9F;
$fruit-salad: #49934E;

$goblin: #3D7C42;
$chambray: #44557E;
$port-gore: #384668;

$white: #ffffff;
$silver-sand: #BBBBBB;
// Set background color

body {
background-color: $midnight-express;

}

// Center the svg horizontally and vertically

svg {
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);

width: 500px;
height: 500px;
backface-visibility: hidden;

}

// Color styles

.canvas {
.bg { fill: $scooter; }

.ground { fill: $marzipan; }

.sky1 { fill: $goldenrod; }

.sky2 { fill: $burnt-sienna; }

.sky3 { fill: $red; }

.tree-left { fill: $fruit-salad; }

.tree-right { fill: $goblin; }

.mountain-left { fill: $chambray; }

.mountain-right { fill: $port-gore; }

.mountain-top-left { fill: $white; }

.mountain-top-right { fill: $silver-sand;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// Color palette</span>

<span class="hljs-variable">$red</span>: <span class="hljs-number">#E9214F</span>;
<span class="hljs-variable">$burnt-sienna</span>: <span class="hljs-number">#F06B4B</span>;

<span class="hljs-variable">$goldenrod</span>: <span class="hljs-number">#F6DA71</span>;
<span class="hljs-variable">$scooter</span>: <span class="hljs-number">#349597</span>;
<span class="hljs-variable">$midnight-express</span>: <span class="hljs-number">#20283B</span>;

<span class="hljs-variable">$marzipan</span>: <span class="hljs-number">#FCDC9F</span>;
<span class="hljs-variable">$fruit-salad</span>: <span class="hljs-number">#49934E</span>;

<span class="hljs-variable">$goblin</span>: <span class="hljs-number">#3D7C42</span>;
<span class="hljs-variable">$chambray</span>: <span class="hljs-number">#44557E</span>;
<span class="hljs-variable">$port-gore</span>: <span class="hljs-number">#384668</span>;

<span class="hljs-variable">$white</span>: <span class="hljs-number">#ffffff</span>;
<span class="hljs-variable">$silver-sand</span>: <span class="hljs-number">#BBBBBB</span>;
<span class="hljs-comment">// Set background color</span>

<span class="hljs-selector-tag">body</span> {
<span class="hljs-attribute">background-color</span>: <span class="hljs-variable">$midnight-express</span>;

}

<span class="hljs-comment">// Center the svg horizontally and vertically</span>

svg {
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">transform</span>: translate(-<span class="hljs-number">50%</span>, -<span class="hljs-number">50%</span>);

<span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
<span class="hljs-attribute">backface-visibility</span>: hidden;

}

<span class="hljs-comment">// Color styles</span>

<span class="hljs-selector-class">.canvas</span> {
<span class="hljs-selector-class">.bg</span> { fill: <span class="hljs-variable">$scooter</span>; }

<span class="hljs-selector-class">.ground</span> { fill: <span class="hljs-variable">$marzipan</span>; }

<span class="hljs-selector-class">.sky1</span> { fill: <span class="hljs-variable">$goldenrod</span>; }

<span class="hljs-selector-class">.sky2</span> { fill: <span class="hljs-variable">$burnt-sienna</span>; }

<span class="hljs-selector-class">.sky3</span> { fill: <span class="hljs-variable">$red</span>; }

<span class="hljs-selector-class">.tree-left</span> { fill: <span class="hljs-variable">$fruit-salad</span>; }

<span class="hljs-selector-class">.tree-right</span> { fill: <span class="hljs-variable">$goblin</span>; }

<span class="hljs-selector-class">.mountain-left</span> { fill: <span class="hljs-variable">$chambray</span>; }

<span class="hljs-selector-class">.mountain-right</span> { fill: <span class="hljs-variable">$port-gore</span>; }

<span class="hljs-selector-class">.mountain-top-left</span> { fill: <span class="hljs-variable">$white</span>; }

<span class="hljs-selector-class">.mountain-top-right</span> { fill: <span class="hljs-variable">$silver-sand</span>;

}</code></pre>
<p>现在整个是静态的，我们使用一点点GreenSock代码来实现一个从小到大缩放动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义好要操作相关元素的变量

const svg = document.querySelector('svg')

const canvas = {

wrapper: svg.querySelector('.canvas'),
mask: svg.querySelector('.canvas .mask')

}

// 创建一个新的GASP的时间轴

const tl = new TimelineMax({

repeat: -1

})

// 使用 GASP的from方法来定义mask元素半径从0到1的缩放动画效果

tl.from(canvas.mask, 1, {

attr: {
r: 0
},
ease: Elastic.easeOut.config(3, 1)

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 定义好要操作相关元素的变量</span>

<span class="hljs-keyword">const</span> svg = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'svg'</span>)

<span class="hljs-keyword">const</span> canvas = {

wrapper: svg.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'.canvas'</span>),
mask: svg.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'.canvas .mask'</span>)

}

<span class="hljs-comment">// 创建一个新的GASP的时间轴</span>

<span class="hljs-keyword">const</span> tl = <span class="hljs-keyword">new</span> TimelineMax({

repeat: <span class="hljs-number">-1</span>

})

<span class="hljs-comment">// 使用 GASP的from方法来定义mask元素半径从0到1的缩放动画效果</span>

tl.from(canvas.mask, <span class="hljs-number">1</span>, {

attr: {
r: <span class="hljs-number">0</span>
},
ease: Elastic.easeOut.config(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>)

})</code></pre>
<p>几行代码，一个缩放的动画效果就完成了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007770474?w=628&amp;h=467" src="https://static.alili.tech/img/remote/1460000007770474?w=628&amp;h=467" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="http://codepen.io/timrijkse/pen/wogpzX" rel="nofollow noreferrer" target="_blank">详细代码地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="timrijkse/pen/wogpzX" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader2">绘制天空</h3>
<p>接下来是绘制天空和地面元素。使用SVG中的矩形元素 rect 来绘制，三个用来绘制天空一个用来绘制地面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg viewBox=&quot;0 0 500 500&quot;>

<g class=&quot;canvas&quot;>
<defs>
<clipPath id=&quot;circle&quot;>
<circle class=&quot;mask&quot; cx=&quot;250&quot; cy=&quot;250&quot; r=&quot;100&quot; />

</clipPath>

<clipPath id=&quot;ground&quot;>
<rect x=&quot;50&quot; y=&quot;50&quot; width=&quot;400&quot; height=&quot;260&quot; />

</clipPath>
</defs>

<g clip-path=&quot;url(#circle)&quot;>

<rect class=&quot;bg&quot; x=&quot;0&quot; y=&quot;0&quot; width=&quot;500&quot; height=&quot;500&quot; />

<g clip-path=&quot;url(#ground)&quot;>

<rect class=&quot;sky3&quot; x=&quot;50&quot; y=&quot;130&quot; width=&quot;350&quot; height=&quot;70&quot; />

<rect class=&quot;sky2&quot; x=&quot;50&quot; y=&quot;200&quot; width=&quot;350&quot; height=&quot;50&quot; />

<rect class=&quot;sky1&quot; x=&quot;50&quot; y=&quot;250&quot; width=&quot;350&quot; height=&quot;50&quot; />

</g>
<rect class=&quot;ground&quot; x=&quot;100&quot; y=&quot;300&quot; width=&quot;350&quot; height=&quot;10&quot; />

</g>
</g>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;svg viewBox=<span class="hljs-string">"0 0 500 500"</span>&gt;

&lt;g <span class="hljs-keyword">class</span>=<span class="hljs-string">"canvas"</span>&gt;
&lt;defs&gt;
&lt;clipPath id=<span class="hljs-string">"circle"</span>&gt;
&lt;<span class="hljs-built_in">circle</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"mask"</span> cx=<span class="hljs-string">"250"</span> cy=<span class="hljs-string">"250"</span> r=<span class="hljs-string">"100"</span> /&gt;

&lt;/clipPath&gt;

&lt;clipPath id=<span class="hljs-string">"ground"</span>&gt;
&lt;<span class="hljs-built_in">rect</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"50"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"400"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"260"</span> /&gt;

&lt;/clipPath&gt;
&lt;/defs&gt;

&lt;g clip-path=<span class="hljs-string">"url(#circle)"</span>&gt;

&lt;<span class="hljs-built_in">rect</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"bg"</span> x=<span class="hljs-string">"0"</span> y=<span class="hljs-string">"0"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"500"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"500"</span> /&gt;

&lt;g clip-path=<span class="hljs-string">"url(#ground)"</span>&gt;

&lt;<span class="hljs-built_in">rect</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"sky3"</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"130"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"70"</span> /&gt;

&lt;<span class="hljs-built_in">rect</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"sky2"</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"200"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"50"</span> /&gt;

&lt;<span class="hljs-built_in">rect</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"sky1"</span> x=<span class="hljs-string">"50"</span> y=<span class="hljs-string">"250"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"50"</span> /&gt;

&lt;/g&gt;
&lt;<span class="hljs-built_in">rect</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"ground"</span> x=<span class="hljs-string">"100"</span> y=<span class="hljs-string">"300"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"10"</span> /&gt;

&lt;/g&gt;
&lt;/g&gt;
&lt;/svg&gt;</code></pre>
<p>同样这里也需要为它们增加一点动效，首先是地面的动效，地面的动效是从下往上冒出的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tl.from(canvas.ground, 0.5, {

autoAlpha: 0,
attr: {
y: '+=200'
},
ease: Power4.easeOut
}, 0.1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">tl</span><span class="hljs-selector-class">.from</span>(<span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.ground</span>, 0<span class="hljs-selector-class">.5</span>, {

<span class="hljs-attribute">autoAlpha</span>: <span class="hljs-number">0</span>,
attr: {
y: <span class="hljs-string">'+=200'</span>
},
<span class="hljs-selector-tag">ease</span>: <span class="hljs-selector-tag">Power4</span><span class="hljs-selector-class">.easeOut</span>
}, 0<span class="hljs-selector-class">.1</span>)</code></pre>
<p>天空的动效跟地面一样的。由于天空有3个元素，并且是依次出现而不是同从下往上冒出来，可以使用GreenSock中的 stagger 方法来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tl.staggerFrom([canvas.sky1, canvas.sky2, canvas.sky3], 0.5, {

autoAlpha: 0,
skewY: 0,
attr: {
y: '+=90'
},
ease: Elastic.easeOut.config(1, 3)

}, 0.075, 0.25)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>tl.staggerFrom([<span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.sky1</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.sky2</span>, <span class="hljs-selector-tag">canvas</span>.sky3], <span class="hljs-number">0.5</span>, {

autoAlpha: <span class="hljs-number">0</span>,
skewY: <span class="hljs-number">0</span>,
attr: {
y: <span class="hljs-string">'+=90'</span>
},
ease: Elastic<span class="hljs-selector-class">.easeOut</span><span class="hljs-selector-class">.config</span>(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>)

}, <span class="hljs-number">0.075</span>, <span class="hljs-number">0.25</span>)</code></pre>
<p>为了使动画更加细腻，做完动画后还需要调整下动画的运动曲线，可以使用GreenSock提供的一个可视化动画曲线调整工具来选择合适的动画曲线 <a href="http://greensock.com/ease-visualizer" rel="nofollow noreferrer" target="_blank">ease visualizer</a>。</p>
<p><a href="http://codepen.io/timrijkse/pen/gLgvQY" rel="nofollow noreferrer" target="_blank">详细代码地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="timrijkse/pen/gLgvQY" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader3">树</h3>
<p>下面添加地面上的树，树由两个三角形组成。因为数是一个一个挨着排列的，所以使用 g 元素来包裹树元素编成一个组，这样方便来布局：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g class=&quot;tree tree1&quot; transform=&quot;translate(150 255)&quot;>

<polygon class=&quot;tree-left&quot; points=&quot;15,0 15,50 0,50&quot; />

<polygon class=&quot;tree-right&quot; points=&quot;15,0 15,50 30,50&quot; />

</g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;g <span class="hljs-keyword">class</span>=<span class="hljs-string">"tree tree1"</span> transform=<span class="hljs-string">"translate(150 255)"</span>&gt;

&lt;polygon <span class="hljs-keyword">class</span>=<span class="hljs-string">"tree-left"</span> points=<span class="hljs-string">"15,0 15,50 0,50"</span> /&gt;

&lt;polygon <span class="hljs-keyword">class</span>=<span class="hljs-string">"tree-right"</span> points=<span class="hljs-string">"15,0 15,50 30,50"</span> /&gt;

&lt;/g&gt;</code></pre>
<p>重复复制七份同样的代码，并且使用transform来改变树的位置，从而使之依次排列。然后是使用GreenSock来编写树的动画效果，树的动画效果是从45度旋转到0度旋转的效果并且同时从0到1的缩放效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tl.staggerFrom([canvas.tree1, canvas.tree2, canvas.tree3, canvas.tree4, canvas.tree5, canvas.tree6, canvas.tree7], 0.5, {

rotation: 45,
scale: 0,
transformOrigin: 'bottom center',

ease: Back.easeOut.config(2, 1.55)

}, 0.05, 0.4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>tl.staggerFrom([<span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.tree1</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.tree2</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.tree3</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.tree4</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.tree5</span>, <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.tree6</span>, <span class="hljs-selector-tag">canvas</span>.tree7], <span class="hljs-number">0.5</span>, {

rotation: <span class="hljs-number">45</span>,
scale: <span class="hljs-number">0</span>,
transformOrigin: <span class="hljs-string">'bottom center'</span>,

ease: Back<span class="hljs-selector-class">.easeOut</span><span class="hljs-selector-class">.config</span>(<span class="hljs-number">2</span>, <span class="hljs-number">1.55</span>)

}, <span class="hljs-number">0.05</span>, <span class="hljs-number">0.4</span>)</code></pre>
<p>效果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007770475?w=652&amp;h=427" src="https://static.alili.tech/img/remote/1460000007770475?w=652&amp;h=427" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/timrijkse/pen/jVyzGY" rel="nofollow noreferrer" target="_blank">详细代码地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="timrijkse/pen/jVyzGY" data-typeid="3">点击预览</button></p>
<p>最后是后面的大山以及大山的动画效果。</p>
<p>大山由四个三角形元素组成，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g class=&quot;mountain&quot; transform=&quot;translate(150 185)&quot;>

<polygon class=&quot;mountain-left&quot; points=&quot;100,0 100,120 0,120&quot; />

<polygon class=&quot;mountain-right&quot; points=&quot;100,0 200,120 100,120&quot; />

<polygon class=&quot;mountain-top-left&quot; points=&quot;100,0 100,30 75,30&quot; />

<polygon class=&quot;mountain-top-right&quot; points=&quot;99,0 125,30 99,30&quot; />

</g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;g <span class="hljs-keyword">class</span>=<span class="hljs-string">"mountain"</span> transform=<span class="hljs-string">"translate(150 185)"</span>&gt;

&lt;polygon <span class="hljs-keyword">class</span>=<span class="hljs-string">"mountain-left"</span> points=<span class="hljs-string">"100,0 100,120 0,120"</span> /&gt;

&lt;polygon <span class="hljs-keyword">class</span>=<span class="hljs-string">"mountain-right"</span> points=<span class="hljs-string">"100,0 200,120 100,120"</span> /&gt;

&lt;polygon <span class="hljs-keyword">class</span>=<span class="hljs-string">"mountain-top-left"</span> points=<span class="hljs-string">"100,0 100,30 75,30"</span> /&gt;

&lt;polygon <span class="hljs-keyword">class</span>=<span class="hljs-string">"mountain-top-right"</span> points=<span class="hljs-string">"99,0 125,30 99,30"</span> /&gt;

&lt;/g&gt;</code></pre>
<p>它的动画效果和树的效果差不多，只不过是把旋转的动效变成翻转的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tl.staggerFrom([canvas.mountain], 0.75, {

y: '+=50',
skewX: -200,
scale: 0,
transformOrigin: 'bottom center',

ease: Back.easeOut.config(1, .2)

}, 0.0125, 0.5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">tl</span><span class="hljs-selector-class">.staggerFrom</span>(<span class="hljs-selector-attr">[canvas.mountain]</span>, 0<span class="hljs-selector-class">.75</span>, {

<span class="hljs-attribute">y</span>: <span class="hljs-string">'+=50'</span>,
skewX: -<span class="hljs-number">200</span>,
scale: <span class="hljs-number">0</span>,
transformOrigin: <span class="hljs-string">'bottom center'</span>,

ease: Back.easeOut.<span class="hljs-built_in">config</span>(1, .2)

}, 0<span class="hljs-selector-class">.0125</span>, 0<span class="hljs-selector-class">.5</span>)</code></pre>
<p>一个有趣的SVG的动画效果就完成了，<a href="http://codepen.io/timrijkse/pen/XNjQBR" rel="nofollow noreferrer" target="_blank">代码地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="timrijkse/pen/XNjQBR" data-typeid="3">点击预览</button>使用GreenSock 配合 SVG 来制作动画效果如此简单。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007770471?w=663&amp;h=467" src="https://static.alili.tech/img/remote/1460000007770471?w=663&amp;h=467" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://timrijkse.nl/animating-an-svg-with-greensock/" rel="nofollow noreferrer" target="_blank">原文地址</a>，根据自己理解整理了下这个教程，主要是来学习下使用GreenSock来制作SVG动画效果的思路和方法。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 GreenSock 来制作 SVG 动画

## 原文链接
[https://segmentfault.com/a/1190000007770468](https://segmentfault.com/a/1190000007770468)


---
title: '不可思议的CSS之clip-path' 
date: 2019-01-02 2:30:09
hidden: true
slug: 822bd33lqt4
categories: [reprint]
---

{{< raw >}}

                    
<p>本文首发于 <strong><a href="https://smohan.net/blog/eutcdc" rel="nofollow noreferrer" target="_blank">我的博客</a></strong></p>
<p>曾经和某位朋友在聊天中讨论过这样一个话题：综合90%的网站的布局以及页面中的元素不是方的，就是圆的。就像所有的颜色都是由三原色（<code>RGB</code>）构成的一样，所有规则的形状似乎也都是由方和圆组成的；抛开设计效果的好看与否不说，似乎不规则的设计在实现（CSS）成本上也是一个麻烦，毕竟在<code>CSS3</code>之前，我们实现一个圆都要切图，更何况那些复杂的多边形。好在<code>CSS3</code>时代的到来，尤其是<code>CSS3</code>在借鉴并增加了众多<code>SVG</code>属性的今天，使用纯<code>CSS</code>绘制一个多边形已经不再是什么难事。文章中要介绍的<code>clip-path</code>这个属性也是一个借鉴了<code>SVG</code>的<code>clipPath</code>的借鉴品（确切的说应该是css  <code>clip</code>属性（已被废弃）的替代品，svg <code>clip-path</code>属性的延伸品?）。</p>
<h3 id="articleHeader0">clip-path介绍</h3>
<p><code>clip-path</code> 直译过来就是裁剪路径，使用SVG或形状定义一个HTML元素的可见区域的方法。想象一下你在<code>Photoshop</code>中勾勒路径的场景。<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path" rel="nofollow noreferrer" target="_blank">MDN</a>上是这样介绍<code> clip-path</code>的：</p>
<blockquote><p>clip-path属性可以防止部分元素通过定义的剪切区域来显示，仅通过显示的特殊区域。剪切区域是被URL定义的路径代替行内或者外部svg，或者定义路线的方法例如circle().。clip-path属性代替了现在已经弃用的剪切 clip属性。</p></blockquote>
<p>文字过于苦涩，直接来看看效果：</p>
<h4>效果演示</h4>
<p>截图基于<code>clip-path</code>在线神器 - <a href="http://bennettfeely.com/clippy" rel="nofollow noreferrer" target="_blank">http://bennettfeely.com/clippy</a> 。一个用来生成各种形状（包括随意拖拉自定义）并且可以直接生成代码的网站。 博客 <a href="https://smohan.net/links" rel="nofollow noreferrer" target="_blank">前端WEB圈</a> 页面banner上的形状就直接使用该网站生成。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010936212" src="https://static.alili.tech/img/remote/1460000010936212" alt="css clip-path 效果演示" title="css clip-path 效果演示" style="cursor: pointer; display: inline;"></span></p>
<p>效果虽然吊炸天，兼容性却是个问题。</p>
<h4>兼容性</h4>
<p><code>clip-path</code>目前兼容性较差，IE和Edge直接不支持，考虑兼容性的同学可以暂时等等?。由于浏览器更新换代太快，很难说一段时间后<code>clip-path</code>的兼容性又是如何，因此这里不再截图，可以直接<a href="https://caniuse.com/#search=clip-path" rel="nofollow noreferrer" target="_blank">点击这里</a>来查看。</p>
<h4>基本语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<clip-source> | [ <basic-shape> || <geometry-box> ] | none

/*属性说明*/
<clip-source> = <url>
<basic-shape> = <inset()> | <circle()> | <ellipse()> | <polygon()>
<geometry-box> = <shape-box> | fill-box | stroke-box | view-box" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">clip-source</span>&gt; | <span class="hljs-selector-attr">[ &lt;basic-shape&gt; || &lt;geometry-box&gt; ]</span> | <span class="hljs-selector-tag">none</span>

<span class="hljs-comment">/*属性说明*/</span>
&lt;<span class="hljs-selector-tag">clip-source</span>&gt; = &lt;<span class="hljs-selector-tag">url</span>&gt;
&lt;<span class="hljs-selector-tag">basic-shape</span>&gt; = &lt;<span class="hljs-selector-tag">inset</span>()&gt; | &lt;<span class="hljs-selector-tag">circle</span>()&gt; | &lt;<span class="hljs-selector-tag">ellipse</span>()&gt; | &lt;<span class="hljs-selector-tag">polygon</span>()&gt;
&lt;<span class="hljs-selector-tag">geometry-box</span>&gt; = &lt;<span class="hljs-selector-tag">shape-box</span>&gt; | <span class="hljs-selector-tag">fill-box</span> | <span class="hljs-selector-tag">stroke-box</span> | <span class="hljs-selector-tag">view-box</span></code></pre>
<h3 id="articleHeader1">语法详解和示例</h3>
<p>为了更明显的表示裁剪区域，我给每个demo添加了同样宽高的透明背景，其中色块表示被裁剪后的部分，透明背景表示被裁剪的区域。</p>
<p><em>同时，文章底部有demo可运行查看具体效果。<strong>透明区域表示被裁剪的区域</strong></em></p>
<h4>基本图形：inset</h4>
<blockquote><p><code>inset()</code> : 定义一个矩形 。注意，定义矩形不是<code>rect</code>，而是 <strong><code>inset</code></strong>。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//语法
inset( <length-percentage>{1,4} [ round <border-radius> ]? )
//说明
inset()可以传入5个参数，分别对应top,right,bottom,left的裁剪位置,round radius（可选，圆角）

//示例
clip-path: inset(2em 3em 2em 1em round 2em);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//语法
<span class="hljs-selector-tag">inset</span>( &lt;<span class="hljs-selector-tag">length-percentage</span>&gt;{1,4} <span class="hljs-selector-attr">[ round &lt;border-radius&gt; ]</span>? )
//说明
<span class="hljs-selector-tag">inset</span>()可以传入5个参数，分别对应<span class="hljs-selector-tag">top</span>,<span class="hljs-selector-tag">right</span>,<span class="hljs-selector-tag">bottom</span>,<span class="hljs-selector-tag">left</span>的裁剪位置,<span class="hljs-selector-tag">round</span> <span class="hljs-selector-tag">radius</span>（可选，圆角）

//示例
<span class="hljs-selector-tag">clip-path</span>: <span class="hljs-selector-tag">inset</span>(2<span class="hljs-selector-tag">em</span> 3<span class="hljs-selector-tag">em</span> 2<span class="hljs-selector-tag">em</span> 1<span class="hljs-selector-tag">em</span> <span class="hljs-selector-tag">round</span> 2<span class="hljs-selector-tag">em</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010936213" src="https://static.alili.tech/img/remote/1460000010936213" alt="clip-path：inset" title="clip-path：inset" style="cursor: pointer;"></span></p>
<h4>基本图形：circle</h4>
<blockquote><p><code>circle()</code> : 定义一个圆 。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//语法
circle( [ <shape-radius> ]? [ at <position> ]? )
//说明
circle()可以传人2个可选参数；
1. 圆的半径，默认元素宽高中短的那个为直径，支持百分比
2. 圆心位置，默认为元素中心点
//半径公式
如果半径使用百分比：圆的半径 = (sqrt(width^2+height^2)/sqrt(2)) * 百分比 

//示例
clip-path: circle(30% at 150px 120px);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//语法
<span class="hljs-selector-tag">circle</span>( <span class="hljs-selector-attr">[ &lt;shape-radius&gt; ]</span>? <span class="hljs-selector-attr">[ at &lt;position&gt; ]</span>? )
//说明
<span class="hljs-selector-tag">circle</span>()可以传人2个可选参数；
1. 圆的半径，默认元素宽高中短的那个为直径，支持百分比
2. 圆心位置，默认为元素中心点
//半径公式
如果半径使用百分比：圆的半径 = (<span class="hljs-selector-tag">sqrt</span>(<span class="hljs-selector-tag">width</span>^2+<span class="hljs-selector-tag">height</span>^2)/<span class="hljs-selector-tag">sqrt</span>(2)) * 百分比 

//示例
<span class="hljs-selector-tag">clip-path</span>: <span class="hljs-selector-tag">circle</span>(30% <span class="hljs-selector-tag">at</span> 150<span class="hljs-selector-tag">px</span> 120<span class="hljs-selector-tag">px</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010936214" src="https://static.alili.tech/img/remote/1460000010936214" alt="clip-path：circle" title="clip-path：circle" style="cursor: pointer; display: inline;"></span></p>
<h4>基本图形：ellipse</h4>
<blockquote><p><code>ellipse()</code> : 定义一个椭圆 。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//语法
ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )
//说明
ellipse()可以传人3个可选参数；
1. 椭圆的X轴半径，默认是宽度的一半，支持百分比
2. 椭圆的Y轴半径，默认是高度的一半，支持百分比
3. 椭圆中心位置，默认是元素的中心点

//示例
clip-path: ellipse(45% 30% at 50% 50%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//语法
<span class="hljs-selector-tag">ellipse</span>( <span class="hljs-selector-attr">[ &lt;shape-radius&gt;{2} ]</span>? <span class="hljs-selector-attr">[ at &lt;position&gt; ]</span>? )
//说明
<span class="hljs-selector-tag">ellipse</span>()可以传人3个可选参数；
1. 椭圆的<span class="hljs-selector-tag">X</span>轴半径，默认是宽度的一半，支持百分比
2. 椭圆的<span class="hljs-selector-tag">Y</span>轴半径，默认是高度的一半，支持百分比
3. 椭圆中心位置，默认是元素的中心点

//示例
<span class="hljs-selector-tag">clip-path</span>: <span class="hljs-selector-tag">ellipse</span>(45% 30% <span class="hljs-selector-tag">at</span> 50% 50%);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010936215" src="https://static.alili.tech/img/remote/1460000010936215" alt="clip-path：ellipse" title="clip-path：ellipse" style="cursor: pointer;"></span></p>
<h4>基本图形：polygon</h4>
<blockquote><p><code>polygon()</code> : 定义一个多边形 。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//语法
polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )
//说明
<fill-rule>可选，表示填充规则用来确定该多边形的内部。可能的值有nonzero和evenodd,默认值是nonzero
后面的每对参数表示多边形的顶点坐标（X,Y），也就是连接点

//示例
clip-path: polygon(50% 0,100% 50%,0 100%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//语法
<span class="hljs-selector-tag">polygon</span>( &lt;<span class="hljs-selector-tag">fill-rule</span>&gt;? , <span class="hljs-selector-attr">[ &lt;length-percentage&gt; &lt;length-percentage&gt; ]</span># )
//说明
&lt;<span class="hljs-selector-tag">fill-rule</span>&gt;可选，表示填充规则用来确定该多边形的内部。可能的值有<span class="hljs-selector-tag">nonzero</span>和<span class="hljs-selector-tag">evenodd</span>,默认值是<span class="hljs-selector-tag">nonzero</span>
后面的每对参数表示多边形的顶点坐标（<span class="hljs-selector-tag">X</span>,<span class="hljs-selector-tag">Y</span>），也就是连接点

//示例
<span class="hljs-selector-tag">clip-path</span>: <span class="hljs-selector-tag">polygon</span>(50% 0,100% 50%,0 100%);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010936216" src="https://static.alili.tech/img/remote/1460000010936216" alt="clip-path：polygon" title="clip-path：polygon" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">使用demo浪起来</h3>
<p>如果无法显示，请自备梯子?，你懂得~??</p>
<h4><a href="https://codepen.io/smohan/full/BdOoyP/" rel="nofollow noreferrer" target="_blank">clip-path-demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="smohan/full/BdOoyP/" data-typeid="3">点击预览</button></h4>
<h3 id="articleHeader3">综合实例</h3>
<p>如上知识点再加上CSS3的<code>animation</code>动画和<code>linear-gradient</code>渐变属性，就可以完成 <a href="https://smohan.net/links" rel="nofollow noreferrer" target="_blank">前端WEB圈</a> 页面上的多形状动画Banner效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000010936217" src="https://static.alili.tech/img/remote/1460000010936217" alt="多形状动画" title="多形状动画" style="cursor: pointer; display: inline;"></span></p>
<h4>核心样式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shape1 {
  background-image: linear-gradient(to bottom right, #183de7, #48cffe 80%);
  clip-path: inset(0 0 0 0 round 100px);
}
.shape2 {
  clip-path: inset(0 0 0 0 round 100px);
  background-image: linear-gradient(to bottom right, #183de7, #48cffe 80%);
  transform: rotate(45deg);
}
.shape3 {
  width: 960px;
  height: 960px;
  border-radius: 50%/100% 0;
  background: #00ffff;
}
.shape4,.shape5 {
  clip-path: circle();
  background-image: linear-gradient(to right, #0db54c, #00697b 40%);
}
.shape6 {
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  background-image: linear-gradient(to right, #f76b71, #a41058 60%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.shape1</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to bottom right, #183de7, #48cffe 80%);
  <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">inset</span>(0 0 0 0 round 100px);
}
<span class="hljs-selector-class">.shape2</span> {
  <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">inset</span>(0 0 0 0 round 100px);
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to bottom right, #183de7, #48cffe 80%);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
}
<span class="hljs-selector-class">.shape3</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">960px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">960px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>/<span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#00ffff</span>;
}
<span class="hljs-selector-class">.shape4</span>,<span class="hljs-selector-class">.shape5</span> {
  <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">circle</span>();
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to right, #0db54c, #00697b 40%);
}
<span class="hljs-selector-class">.shape6</span> {
  <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(0 0, 50% 100%, 100% 0);
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to right, #f76b71, #a41058 60%);
}</code></pre>
<h4>在线DEMO</h4>
<h4><a href="https://codepen.io/smohan/full/oePqZw/" rel="nofollow noreferrer" target="_blank">clip-path-animation</a><button class="btn btn-xs btn-default ml10 preview" data-url="smohan/full/oePqZw/" data-typeid="3">点击预览</button></h4>
<h3 id="articleHeader4">其他属性</h3>
<p>除了 <code>inset</code>, <code>circle</code>等<code> basic-shape</code>属性外，<code>clip-path</code>还具有<code>url</code>, <code>geometry-box</code>等属性值，具体可以参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path" rel="nofollow noreferrer" target="_blank">MDN</a>上的介绍。</p>
<h3 id="articleHeader5">总结</h3>
<p>在<code>clip-path</code>之前，我们可以利用盒模型，利用<code>border-radius</code>, <code>border</code>，<code>transform</code>，<code>box-shadow</code>等来创建诸如矩形，圆形，椭圆，三角形等一些简单的形状，<code>clip-path</code>为我们提供了多边形的创建方案，尽管它现在的支持性，兼容性还不是很好，但我们完全可以在一些特定的场景下使用它来代替图片了。当然，<code>clip-path</code>的作用不仅仅是如我上面介绍的那般简单，她还有很多奇妙的用处，尤其是配合动画一起使用，感兴趣的同学可以深入之……</p>
<h3 id="articleHeader6">参考</h3>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path</a></li>
<li><a href="https://caniuse.com/#search=clip-path" rel="nofollow noreferrer" target="_blank">https://caniuse.com/#search=clip-path</a></li>
<li><a href="http://bennettfeely.com/clippy/" rel="nofollow noreferrer" target="_blank">http://bennettfeely.com/clippy/</a></li>
</ul>
<p>本文首发于 <strong><a href="https://smohan.net/blog/eutcdc" rel="nofollow noreferrer" target="_blank">我的博客</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不可思议的CSS之clip-path

## 原文链接
[https://segmentfault.com/a/1190000010936207](https://segmentfault.com/a/1190000010936207)


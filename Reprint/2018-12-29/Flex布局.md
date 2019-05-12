---
title: 'Flex布局' 
date: 2018-12-29 2:30:10
hidden: true
slug: 5h5hovmgsut
categories: [reprint]
---

{{< raw >}}

                    
<p>本文最早发布在：<a href="https://rootrl.github.io/2017/10/13/Flex-Layout/" rel="nofollow noreferrer" target="_blank">Rootrl's blog</a></p>
<h2 id="articleHeader0">简介</h2>
<p>Flex是Flexible Box的缩写，意为弹性布局。是W3C在2009年提出的一个新的布局方案。可以方便的实现各种页面布局。目前浏览器兼容如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546048?w=899&amp;h=317" src="https://static.alili.tech/img/remote/1460000011546048?w=899&amp;h=317" alt="Flex support" title="Flex support" style="cursor: pointer; display: inline;"></span></p>
<p>Flex在移动端开发上已是主流，比如H5页面，微信小程序等等。</p>
<h2 id="articleHeader1">Why Flex</h2>
<p>传统的布局方案主要基于CSS盒子模型，依赖Display、Position、Float等属性。但是它对于一些特殊布局非常不方便，比如水平垂直居中。传统方式实现起来非常繁杂，各种黑科技，比如以下是一种水平垂直居中的实现方式：</p>
<p>基础的DOM如下，一个父元素是宽高为500px的红色容器，包裹着宽高为100px的黄色子容器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    * {
        margin: 0;
        padding: 0;
    }

    .dad {
        background-color: red;
        width: 500px;
        height: 500px;
    }

    .son {
        background-color: yellow;
        width: 100px;
        height: 100px;
    }
</style>

<div class=&quot;dad&quot;>
    <div class=&quot;son&quot;>
        
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.dad</span> {
        <span class="hljs-attribute">background-color</span>: red;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
    }

    <span class="hljs-selector-class">.son</span> {
        <span class="hljs-attribute">background-color</span>: yellow;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dad"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span>
        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>现要实现子元素在父元素中水平垂直居中，传统的方式如下，基于定位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".dad {
    position: relative;
}

.son {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.dad</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.son</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<p>而Flex只需几行代码搞定，非常方便：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".dad {
    display: flex;
    justify-content: center;
    align-items: center
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.dad</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center
}</code></pre>
<h2 id="articleHeader2">使用</h2>
<p>任何一个容器都可以指定为Flex布局。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    display: flex;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">display</span>: flex;
}</code></pre>
<p>行内元素也可以使用Flex布局：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    display: inline-flex
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">display</span>: inline-flex
}</code></pre>
<p>Webkit内核的浏览器需加上-webkit前缀。</p>
<p>注意：<br>设为Flex布局后，子元素的float、clear、vertical-alian属性都将失效。</p>
<h2 id="articleHeader3">基本概念</h2>
<p>父容器设为flex后，它的所有子元素自动成为容器成员（这里加入我的理解，如果不对请指出：这里的子元素不论什么元素，块级还是行内，而且只作用于子元素，孙元素不起作用，需继续在子元素上设置display:flex）</p>
<p>Flex的基本概念就是容器和轴，容器包括外层的父容器和内层的子容器（也叫项目，flex item），轴包括主轴和交叉轴。</p>
<p>如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546049" src="https://static.alili.tech/img/remote/1460000011546049" alt="Flex container" title="Flex container" style="cursor: pointer;"></span></p>
<p>容器默认存在两根轴，水平的主轴(main axis)和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。</p>
<p>子容器（项目）默认沿主轴排列，单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。</p>
<p>Flex布局主要涉及12个属性（不含display:flex），其中容器和子容器各6个，但是平常使用到的基本只有4个属性，父容器和子容器各2个。</p>
<p>作用于父容器的属性：</p>
<ul>
<li>flex-direction</li>
<li>flex-wrap</li>
<li>flex-flow</li>
<li>justify-content</li>
<li>align-items</li>
<li>align-content</li>
</ul>
<p>作用于子容器（项目）的属性：</p>
<ul>
<li>order</li>
<li>flex-grow</li>
<li>flex-shrink</li>
<li>flex-basis</li>
<li>flex</li>
<li>align-self</li>
</ul>
<h2 id="articleHeader4">详细介绍</h2>
<h3 id="articleHeader5">容器属性</h3>
<h4>flex-direction</h4>
<p>flex-direction属性决定主轴的方向，及子容器（项目）的排列方向。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  flex-direction: row | row-reverse | column | column-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">flex-direction</span>: row | row-reverse | column | column-reverse;
}</code></pre>
<p>可能的值：</p>
<ul>
<li>row（默认值）：主轴为水平方向，起点在左端。</li>
<li>row-reverse：主轴为水平方向，起点在右端。</li>
<li>column：主轴为垂直方向，起点在上沿。</li>
<li>column-reverse：主轴为垂直方向，起点在下沿。</li>
</ul>
<p>如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546050?w=796&amp;h=203" src="https://static.alili.tech/img/remote/1460000011546050?w=796&amp;h=203" alt="Flex direction" title="Flex direction" style="cursor: pointer;"></span></p>
<h4>flex-wrap</h4>
<p>默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">flex-wrap</span>: nowrap | wrap | wrap-reverse;
}</code></pre>
<p>可能的值：</p>
<ul>
<li>nowrap（默认）：不换行</li>
<li>wrap：换行，第一行在上方</li>
<li>wrap-reverse: 换行，第一行在下方</li>
</ul>
<h4>flex-flow</h4>
<p>flex-flow属性是flex-direction和flex-wrap属性的简写形式，默认为：row nowrap</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    flex-flow: <flex-direction> || <flex-wrap>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">flex-flow</span>: &lt;flex-direction&gt; || &lt;flex-wrap&gt;
}</code></pre>
<h4>justify-content</h4>
<p>justify-content定义了项目在主轴上的对齐方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    justify-content: flex-start| flext-end | center | space-between |space-around;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>.box {
    justify-content: flex-start| flext-<span class="hljs-keyword">end</span> | center | <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> |<span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span>;
}</code></pre>
<p>它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。</p>
<ul>
<li>flex-start（默认值）：左对齐</li>
<li>flex-end：右对齐</li>
<li>center： 居中</li>
<li>space-between：两端对齐，项目之间的间隔都相等。</li>
<li>space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。</li>
</ul>
<p>如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546051?w=637&amp;h=763" src="https://static.alili.tech/img/remote/1460000011546051?w=637&amp;h=763" alt="Justify content" title="Justify content" style="cursor: pointer;"></span></p>
<h4>align-items</h4>
<p>align-items属性定义了项目在交叉轴上的对齐方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    align-items: flex-start| flex-end | center | baseline | strech
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>.box {
    align-items: flex-start| <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span> | <span class="hljs-type">center</span> | <span class="hljs-type">baseline</span> | <span class="hljs-type">strech</span>
}</code></pre>
<p>它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下：</p>
<ul>
<li>flex-start：交叉轴的起点对齐。</li>
<li>flex-end：交叉轴的终点对齐。</li>
<li>center：交叉轴的中点对齐。</li>
<li>baseline: 项目的第一行文字的基线对齐。</li>
<li>stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。</li>
</ul>
<p>如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546052" src="https://static.alili.tech/img/remote/1460000011546052" alt="Align items" title="Align items" style="cursor: pointer;"></span></p>
<h4>align-content</h4>
<p>align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p>
<p>可能的值：</p>
<ul>
<li>flex-start：与交叉轴的起点对齐。</li>
<li>flex-end：与交叉轴的终点对齐。</li>
<li>center：与交叉轴的中点对齐。</li>
<li>space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。</li>
<li>space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。</li>
<li>stretch（默认值）：轴线占满整个交叉轴。</li>
</ul>
<p>如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011546053?w=620&amp;h=786" src="https://static.alili.tech/img/remote/1460000011546053?w=620&amp;h=786" alt="Align items" title="Align items" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">项目属性</h3>
<h4>order</h4>
<p>order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
    order: <integer>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">order</span>: &lt;integer&gt;
}</code></pre>
<h4>flex-grow</h4>
<p>flex-grow属性定义项目放大比例，默认为0，即如果存在剩余空间，也不放大。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
    flex-grow: <number> /* default 0 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-grow</span>: &lt;number&gt; <span class="hljs-comment">/* default 0 */</span>
}</code></pre>
<p>如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。</p>
<h4>flex-shrink</h4>
<p>flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，项目将缩小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
    flex-shrink: <number> /* default 1 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-shrink</span>: &lt;number&gt; <span class="hljs-comment">/* default 1 */</span>
}</code></pre>
<p>如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。<br>负值对该属性无效。</p>
<h4>flex-basis</h4>
<p>flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
    flex-basis: <length> | auto; /* default auto */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-basis</span>: &lt;length&gt; | auto; <span class="hljs-comment">/* default auto */</span>
}</code></pre>
<p>它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。</p>
<h4>flex</h4>
<p>flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。</p>
<p>该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。<br>建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。</p>
<h4>align-self</h4>
<p>align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
    align-self: auto | flex-start | flex-end| center | baseline | stretch
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>.item {
    align-self: <span class="hljs-built_in">auto</span> | <span class="hljs-type">flex</span>-start | <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span>| <span class="hljs-type">center</span> | <span class="hljs-type">baseline</span> | <span class="hljs-type">stretch</span>
}</code></pre>
<p>该属性可能取6个值，除了auto，其他都与align-items属性完全一致。</p>
<h2 id="articleHeader7">布局实战</h2>
<h4>基本网格布局</h4>
<p>最简单的网格布局，就是平均分布。在容器里面平均分配空间。</p>
<p>比如实现如图布局：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546054?w=953&amp;h=460" src="https://static.alili.tech/img/remote/1460000011546054?w=953&amp;h=460" alt="Grid布局" title="Grid布局" style="cursor: pointer;"></span></p>
<p>Html代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;grid&quot;>
        <div class=&quot;grid-cell&quot;>cell1</div>
        <div class=&quot;grid-cell&quot;>cell2</div>
        <div class=&quot;grid-cell&quot;>cell3</div>
    </div>
    <div class=&quot;grid&quot;>
        <div class=&quot;grid-cell&quot;>cell1</div>
        <div class=&quot;grid-cell&quot;>cell2</div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;cell1&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;cell2&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;cell3&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;cell1&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;cell2&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>Css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .grid {
        display: flex;
    }

    .grid-cell {
        flex: 1; /* 即为flex-grow: 1; */
        border: green solid 1px; /* 可选，加边框保证例子效果 */
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.grid</span> {
        <span class="hljs-attribute">display</span>: flex;
    }

    <span class="hljs-selector-class">.grid-cell</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; <span class="hljs-comment">/* 即为flex-grow: 1; */</span>
        <span class="hljs-attribute">border</span>: green solid <span class="hljs-number">1px</span>; <span class="hljs-comment">/* 可选，加边框保证例子效果 */</span>
    }</code></pre>
<h4>百分比布局</h4>
<p>某个网格宽度为固定百分比布局，其余网格平均分配剩余空间。</p>
<p>如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011546055?w=776&amp;h=210" src="https://static.alili.tech/img/remote/1460000011546055?w=776&amp;h=210" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>Html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;grid&quot;>
        <div class=&quot;grid-cell cell-1of2&quot;>dsfdsf</div>
        <div class=&quot;grid-cell&quot;>dsfsdf</div>
        <div class=&quot;grid-cell&quot;>sdfsdf</div>
    </div>


    <div class=&quot;grid&quot;>
        <div class=&quot;grid-cell cell-1of3&quot;>dsfdsf</div>
        <div class=&quot;grid-cell&quot;>dsfsdf</div>
        <div class=&quot;grid-cell&quot;>sdfsdf</div>
    </div>

    <div class=&quot;grid&quot;>
        <div class=&quot;grid-cell cell-1of4&quot;>dsfdsf</div>
        <div class=&quot;grid-cell&quot;>dsfsdf</div>
        <div class=&quot;grid-cell&quot;>sdfsdf</div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell cell-1of2"</span>&gt;dsfdsf&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;dsfsdf&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;sdfsdf&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;


    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell cell-1of3"</span>&gt;dsfdsf&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;dsfsdf&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;sdfsdf&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell cell-1of4"</span>&gt;dsfdsf&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;dsfsdf&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-cell"</span>&gt;sdfsdf&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>Css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .grid {
        display: flex;
    }

    .grid-cell {
        flex: 1;
        border: red solid 1px;
    }

    .cell-full {
        flex: 0 0 100%;    
    }

    .cell-1of2 {
        flex: 0 0 50%;
    }

    .cell-1of3 {
        flex: 0 0 33.3333%;
    }

    .cell-1of4 {
        flex: 0 0 25%;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.grid</span> {
        <span class="hljs-attribute">display</span>: flex;
    }

    <span class="hljs-selector-class">.grid-cell</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">border</span>: red solid <span class="hljs-number">1px</span>;
    }

    <span class="hljs-selector-class">.cell-full</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;    
    }

    <span class="hljs-selector-class">.cell-1of2</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;
    }

    <span class="hljs-selector-class">.cell-1of3</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">33.3333%</span>;
    }

    <span class="hljs-selector-class">.cell-1of4</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">25%</span>;
    }</code></pre>
<h4>圣杯布局</h4>
<p>圣杯布局（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011546056?w=540&amp;h=350" src="https://static.alili.tech/img/remote/1460000011546056?w=540&amp;h=350" alt="百分比布局" title="百分比布局" style="cursor: pointer;"></span></p>
<p>Html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body class=&quot;holy-grid&quot;>
    <header class=&quot;holy-grid-items&quot;>#header</header>
    <div class=&quot;holy-grid-content holy-grid-items&quot;>
        <div class=&quot;holy-grid-content-items holy-grid-content-left&quot;>
            # left
        </div>
        <div class=&quot;holy-grid-content-items holy-grid-content-center&quot;>
            # center
        </div>
        <div class=&quot;holy-grid-content-items holy-grid-content-right&quot;>
            # right
        </div>
    </div>
    <footer class=&quot;holy-grid-items&quot;>#footer</footer>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;body <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid"</span>&gt;
    &lt;header <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid-items"</span>&gt;<span class="hljs-comment">#header&lt;/header&gt;</span>
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid-content holy-grid-items"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid-content-items holy-grid-content-left"</span>&gt;
            <span class="hljs-comment"># left</span>
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid-content-items holy-grid-content-center"</span>&gt;
            <span class="hljs-comment"># center</span>
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid-content-items holy-grid-content-right"</span>&gt;
            <span class="hljs-comment"># right</span>
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;footer <span class="hljs-built_in">class</span>=<span class="hljs-string">"holy-grid-items"</span>&gt;<span class="hljs-comment">#footer&lt;/footer&gt;</span>
&lt;/body&gt;</code></pre>
<p>Css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    * {
        margin: 0;
        padding: 0;
    }

    .holy-grid {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* 相对于视口的高度。视口被均分为100单位的vh */
    }

    header, footer {
        text-align: center;
        flex: 0 0 100px;
    }

    .holy-grid-content {
        display: flex;
        flex: 1;
    }

    .holy-grid-content-items {
        flex: 1;
    }

    .holy-grid-content-left {
        flex: 0 0 150px;
    }

    .holy-grid-content-right {
        flex: 0 0 150px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.holy-grid</span> {
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">flex-direction</span>: column;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>; <span class="hljs-comment">/* 相对于视口的高度。视口被均分为100单位的vh */</span>
    }

    <span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">footer</span> {
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
    }

    <span class="hljs-selector-class">.holy-grid-content</span> {
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
    }

    <span class="hljs-selector-class">.holy-grid-content-items</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
    }

    <span class="hljs-selector-class">.holy-grid-content-left</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">150px</span>;
    }

    <span class="hljs-selector-class">.holy-grid-content-right</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">150px</span>;
    }</code></pre>
<p>好了，flex就到这里了，本内容主要参考后面参考部分的教程，文章并不是简单搬过来的，而是理解后在写的，例子也是自己在理解后，然后动手写，再消化明白后才写出来的。</p>
<p>今天一天都在搞这篇文章，现在Flex算是入门了。。</p>
<h2 id="articleHeader8">参考</h2>
<p>Flex 布局教程：语法篇 <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a><br>一劳永逸的搞定 flex 布局 <a href="https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb" rel="nofollow noreferrer" target="_blank"></a><a href="https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/58e3a5...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flex布局

## 原文链接
[https://segmentfault.com/a/1190000011546043](https://segmentfault.com/a/1190000011546043)


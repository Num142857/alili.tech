---
title: 'border、outline、boxshadow那些事以及如何做内凹圆' 
date: 2019-02-10 2:30:42
hidden: true
slug: 8wuh09yeiib
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">border</h3>
<p>边框是我们美化网页、增强样式最常用的手段之一。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;text&quot;></div>
    .text {
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 10px solid #03D766;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"text"</span>&gt;&lt;/div&gt;
    <span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid <span class="hljs-number">#03D766</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMPj" src="https://static.alili.tech/img/bVvMPj" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>但有些时候，我们的需求是给一个容器加上多重边框，最容易想到的是给它多加一层标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;text-outborder&quot;>
    <div class=&quot;text&quot;></div>
</div>

.text-outborder {
    width: 274px;
    height: 274px;
    border: 10px solid #03D766;
}

.text {
    margin: auto;
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 10px solid #03D766;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"text-outborder"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"text"</span>&gt;&lt;/div&gt;
&lt;/div&gt;

<span class="hljs-selector-class">.text-outborder</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">274px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">274px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid <span class="hljs-number">#03D766</span>;
}

<span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid <span class="hljs-number">#03D766</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMPq" src="https://static.alili.tech/img/bVvMPq" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>不过有些时候，我们可能无法修改结构，或者修改结构的成本很高，此时就需要我们在纯 CSS 层面解决这个问题。</p>
<h3 id="articleHeader1">outline</h3>
<p>这时候可以通过 <code>outline</code> 属性来解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 10px solid #03D766;
    outline: 10px solid #BC9E9C;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid <span class="hljs-number">#03D766</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">10px</span> solid <span class="hljs-number">#BC9E9C</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMPx" src="https://static.alili.tech/img/bVvMPx" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>描边有一个好处在于，它跟边框类似，可以设置各种线型，比如虚线：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 10px solid #03D766;
    outline: 5px dashed #CE843B;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> solid <span class="hljs-number">#03D766</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#CE843B</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMPD" src="https://static.alili.tech/img/bVvMPD" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>有趣的是，还有一个 <code>outline-offset</code> 属性，可以控制描边的偏移量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 20px solid #03D766;
    outline: 5px dashed #FFF;
    outline-offset: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#03D766</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#FFF</span>;
    <span class="hljs-attribute">outline-offset</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p>我们可以把 <code>outline</code> 扩展出去：<br><span class="img-wrap"><img data-src="/img/bVvMPG" src="https://static.alili.tech/img/bVvMPG" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">outline-offset</h3>
<p>而且 <code>outline-offset</code> 还支持负值，可以将 <code>outline</code> 叠加在 <code>border</code> 之上:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 20px solid #03D766;
    outline: 5px dashed #FFF;
    outline-offset: -12px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#03D766</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#FFF</span>;
    <span class="hljs-attribute">outline-offset</span>: -<span class="hljs-number">12px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMPR" src="https://static.alili.tech/img/bVvMPR" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>利用这个特性可以玩出很多好玩的效果。</p>
<p>不过描边有一个缺陷——如果这个容器本身有圆角的话，描边并不能完全贴合圆角。目前所有浏览器的行为都是这样的：<br><span class="img-wrap"><img data-src="/img/bVvMPV" src="https://static.alili.tech/img/bVvMPV" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">box-shadow</h3>
<p>如果你需要使用圆角，那么你就得另寻它法了。接着，我们又想到了  <code>box-shadow</code> 属性：</p>
<p>我们通常是这样设置投影的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-shadow: 0 5px 5px #000;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-number">5px</span> <span class="hljs-number">#000</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMPZ" src="https://static.alili.tech/img/bVvMPZ" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>前面三个长度值，再加一个颜色值。</p>
<p>前两个长度值分别表示投影在水平和垂直方向上的偏移量，第三个长度值表示投影的模糊半径（也就是模糊的程度）；颜色值就是投影的颜色。</p>
<p>如果我们把前三个值都设为零，实际上是没有任何效果的。因为如果投影即不偏移也不模糊，刚好会被这个元素自己严严实实地遮住。</p>
<h3 id="articleHeader4">box-shadow第四个长度值</h3>
<p>很多人可能不知道的是，投影还可以有第四个长度值。这个值表示投影向外扩张的程度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-shadow: 0 0 0 10px #FF0000;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#FF0000</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMP1" src="https://static.alili.tech/img/bVvMP1" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这样，投影就会从元素的底下露出一圈了。</p>
<p>关于投影，另外一个不是每个人都知道的特性是，投影属性其实可以接受一个列表，我们可以一次赋予它多层投影，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    width: 254px;
    height: 254px;
    background-color: #33AAE1;
    border: 20px solid #03D766;
    border-radius: 50px;
    box-shadow: 
        0 0 0 10px #FB0000,
        0 0 0 20px #FBDD00, 
        0 0 0 30px #00BDFB;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAE1</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#03D766</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">box-shadow</span>: 
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#FB0000</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">#FBDD00</span>, 
        <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">30px</span> <span class="hljs-number">#00BDFB</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvMP4" src="https://static.alili.tech/img/bVvMP4" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这样我们就得到了超过两层的 “边框” 效果了。</p>
<p>投影的另外一个好处是，它的扩张效果是根据元素自己的形状来的。如果元素是矩形，它扩张开来就是一个更大的矩形；如果元素有圆角，它也会扩张出圆角。</p>
<h3 id="articleHeader5">注意事项</h3>
<p>由于描边和投影都是不影响布局的，所以如果这个元素和其它元素的相对位置关系很重要，就需要我们以外边距等方式来为这些多出来的 “边框” 腾出位置，以防被其它元素盖住。</p>
<p>因此，从这个意义上来说，使用内嵌投影似乎是更好的选择。因为内嵌投影让投影出现在元素内部，我们可以用内边距在元素的内部消化掉这些额外 “边框” 所需要的空间，处理起来更容易一些。</p>
<h3 id="articleHeader6">内凹圆</h3>
<p>标签页我们都很熟悉了，它是一种常用的 UI 元素。<br><span class="img-wrap"><img data-src="/img/bVvMQk" src="https://static.alili.tech/img/bVvMQk" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们把它拉近来看一看：<br><span class="img-wrap"><img data-src="/img/bVvMQl" src="https://static.alili.tech/img/bVvMQl" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个标签还是比较美观的，我们用圆角让它看起来很接近真实的标签造型。不过我们也注意到，它底部的两个直角看起来似乎有点生硬。</p>
<p>所以设计师原本期望的效果可能是这样的：<br><span class="img-wrap"><img data-src="/img/bVvMQo" src="https://static.alili.tech/img/bVvMQo" alt="![图片描述" title="![图片描述" style="cursor: pointer;"></span>][14]</p>
<p>这样就自然多了。但这看起来似乎很难实现啊！</p>
<p>我们的难点主要在这里：<br><span class="img-wrap"><img data-src="/img/bVvMQn" src="https://static.alili.tech/img/bVvMQn" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个特殊的形状如何实现？</p>
<p>我们把它放大来看一下：<br><span class="img-wrap"><img data-src="/img/bVvMQv" src="https://static.alili.tech/img/bVvMQv" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>首先我们可能会想到用图片。这当然是可行的，但图片有种种局限，我们最好还是完全用 CSS 来实现它。</p>
<p>好，接下来我们来分析一下它的形状。它其实就是一个方形，再挖掉一个 90° 的扇形。于是我们试着创建一个方形，再用背景色做出一个扇形叠加上去：<br><span class="img-wrap"><img data-src="/img/bVvMQw" src="https://static.alili.tech/img/bVvMQw" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看起来好像可以了。但这是骗人的啊！</p>
<p>把它放在复杂背景下，立马就露馅了——扇形部分不是透明的：<br><span class="img-wrap"><img data-src="/img/bVvMQx" src="https://static.alili.tech/img/bVvMQx" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">如何实现内凹圆角</h3>
<p>所以，我们的问题就变成了如何用CSS实现内凹圆角。</p>
<p>对于普通外凸的圆角，我们都已经非常熟悉了，我们用圆角属性就可以得到：<br><span class="img-wrap"><img data-src="/img/bVvMQC" src="https://static.alili.tech/img/bVvMQC" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>但我们需要的是一个内凹的圆角形状。</p>
<p>这是一个实实在在的需求，于是有开发者曾经提议，扩展圆角属性，让它支持负值。如果是负值，圆角就不再是外凸的，而是内凹的。这个提议听起来似乎很有道理，语法设计也很紧凑。<br><span class="img-wrap"><img data-src="/img/bVvMQK" src="https://static.alili.tech/img/bVvMQK" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>但实际上它的语义不够准确。因此 CSS 工作组并没有接受这个提议，并未将它纳入标准。<br><span class="img-wrap"><img data-src="/img/bVvMQD" src="https://static.alili.tech/img/bVvMQD" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这条路走不通，我们还需要继续探索。</p>
<p>我们顺着这个方向，头脑中很自然地会迸出这个疑问：CSS中还有和圆形有关的属性吗？</p>
<p>答案当然是有！</p>
<h3 id="articleHeader8">径向渐变</h3>
<p>“径向渐变” 特性就是跟圆形有关的。</p>
<h3 id="articleHeader9">线性渐变</h3>
<p>不过它稍稍有些复杂。在讲解径向渐变之前，我们先来看一看比较简单的 “线性渐变”。<br><span class="img-wrap"><img data-src="/img/bVvMQU" src="https://static.alili.tech/img/bVvMQU" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>说到渐变，那自然需要有一个容器。然后，还需要有两种颜色。渐变的颜色设置我们称之为 “色标”——每个色标不仅有颜色信息，还有位置信息。</p>
<p>我们给起点和终点的色标分别设置颜色，就可以得到一条渐变图案：<span class="img-wrap"><img data-src="/img/bVvMQZ" src="https://static.alili.tech/img/bVvMQZ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来，关于渐变，我们其实可以设置不止两个色标。比如我们可以在中央再增加一个色标。请注意我们特意选择了跟起点色标一样的颜色。我们得到的效果如下：<br><span class="img-wrap"><img data-src="/img/bVvMQ0" src="https://static.alili.tech/img/bVvMQ0" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们发现，渐变只发生在颜色不同的色标之间。如果两个色标的颜色相同，则它们之间会显示为一块实色。</p>
<p>好的，我们继续增加色标。这次我们在渐变地带的中央增加一个色标，且让它的颜色和终点色标相同：<br><span class="img-wrap"><img data-src="/img/bVvMQ4" src="https://static.alili.tech/img/bVvMQ4" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>根据上面的经验，这个结果正是我们所预料的——渐变只发生在颜色不同的色标之间。</p>
<p>接下来，我们玩点更特别的，我们把中间的两个色标相互靠近直至重合，会发生什么？<br><span class="img-wrap"><img data-src="/img/bVvMQ7" src="https://static.alili.tech/img/bVvMQ7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>实际上这个渐变也会趋向于零。也就是说，虽然这本质上仍然是一个 “渐变” 图案，但经过我们的精心设计之后，我们最终得到了两个纯色的色块条纹。</p>
<p>如果我们把终点颜色换为透明色……<br><span class="img-wrap"><img data-src="/img/bVvMQ8" src="https://static.alili.tech/img/bVvMQ8" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们甚至还会得到实色和透明色间隔的条纹。</p>
<h3 id="articleHeader10">再来看径向渐变</h3>
<p>好的，接下来我们来看径向渐变。它稍稍有些复杂，但原理是一样的。</p>
<p>同样，我们需要有一个容器。但对径向渐变来说，顾名思议，所有色标是排布在一条半径上的。也就是说，我们还需要有一个圆心。默认情况下，圆心就是这个容器的正中心：<br><span class="img-wrap"><img data-src="/img/bVvMQ9" src="https://static.alili.tech/img/bVvMQ9" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>而这条半径就是圆心指向容器最远端的一条假想的线：<br><span class="img-wrap"><img data-src="/img/bVvMRa" src="https://static.alili.tech/img/bVvMRa" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来，我们要设置一些色标：<br><span class="img-wrap"><img data-src="/img/bVvMRd" src="https://static.alili.tech/img/bVvMRd" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>说到这里，就要讲解一下径向渐变的特别之处。所有色标的颜色变化推进不是像线性渐变那样平行推进的，而是以同心圆的方式向外扩散的——就像水池里被石子激起的涟漪那样。</p>
<p>看到这个色标的分布，我们应该可以想像出线性渐变的结果是什么；但这里我们把它按照径向渐变的特征来推演一下，实际上最终的效果是这样的：<br><span class="img-wrap"><img data-src="/img/bVvMRY" src="https://static.alili.tech/img/bVvMRY" alt="d4477682-427b-11e5-87fd-8e0ad91113d2.png" title="d4477682-427b-11e5-87fd-8e0ad91113d2.png" style="cursor: pointer;"></span></p>
<p>我们把所有辅助性的标记都去掉，只留下渐变图案：<br><span class="img-wrap"><img data-src="/img/bVvMRg" src="https://static.alili.tech/img/bVvMRg" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这是一个穿了个窟窿的实色背景。很好玩是吧？不过不要忘了我们是为什么来到这儿的——我们是为了得到一个内凹圆角的形状。</p>
<p>细心的朋友可能已经发现了，我们需要的东西已经出现了：<br><span class="img-wrap"><img data-src="/img/bVvMRo" src="https://static.alili.tech/img/bVvMRo" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来，我们调整一下圆心的位置和容器的尺寸，就可以得到这个内凹圆角的造型了。<br><span class="img-wrap"><img data-src="/img/bVvMRp" src="https://static.alili.tech/img/bVvMRp" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">内凹圆具体代码例子</h3>
<p>具体代码例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    width: 254px;
    height: 254px;
    background:
      -moz-radial-gradient(
          100% 0%, 
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0) 71%,
          #0059FF 0%;
      );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">254px</span>;
    <span class="hljs-attribute">background</span>:
      -moz-radial-gradient(
          <span class="hljs-number">100%</span> <span class="hljs-number">0%</span>, 
          rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>) <span class="hljs-number">0%</span>,
          rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>) <span class="hljs-number">71%</span>,
          <span class="hljs-number">#0059FF</span> <span class="hljs-number">0%</span>;
      );
}</code></pre>
<h3 id="articleHeader12">内凹圆完成</h3>
<p>利用这个技巧，我们用纯 CSS 最终实现了这个看似不可能的 “圆润的标签页” 效果！<br><span class="img-wrap"><img data-src="/img/bVvMQo" src="https://static.alili.tech/img/bVvMQo" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>原文链接：<a href="https://github.com/cssmagic/blog/issues/54#rd" rel="nofollow noreferrer" target="_blank">https://github.com/cssmagic/blog/issues/54#rd</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
border、outline、boxshadow那些事以及如何做内凹圆

## 原文链接
[https://segmentfault.com/a/1190000005153660](https://segmentfault.com/a/1190000005153660)


---
title: 'CSS3三角形的运用' 
date: 2019-01-03 2:30:11
hidden: true
slug: 7s1vwegr3rg
categories: [reprint]
---

{{< raw >}}

                    
<p>本文摘自   <a href="http://www.cnblogs.com/keepfool/p/5616326.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/keepfo...</a></p>
<h2 id="articleHeader0">概述</h2>
<p>在早期的前端Web设计开发年代，完成一些页面元素时，我们必须要有专业的PS美工爸爸，由PS美工爸爸来切图，做一些圆角、阴影、锯齿或者一些小图标。<br>在CSS3出现后，借助一些具有魔力的CSS3属性，使得这些元素大多都可以由开发人员自己来完成。</p>
<h2 id="articleHeader1">图例</h2>
<p><span class="img-wrap"><img data-src="/img/bVTmyt?w=403&amp;h=768" src="https://static.alili.tech/img/bVTmyt?w=403&amp;h=768" alt="341820-20160625143920735-987703814.png" title="341820-20160625143920735-987703814.png" style="cursor: pointer; display: inline;"></span></p>
<p>这幅图复杂的元素不多，布局也较为简单，我们大致分析一下，需要PS美工爸爸帮忙做的只有一件事情，就是将上半部分的蓝色背景图给抠出来。<br>除此之外，出现在这幅设计图的一些特殊形状和小图标，都可以通过CSS3来实现。<br>我们将这些特殊形状和小图标分为两类：</p>
<h5><strong>1.可以用Icon Font实现的</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVTmAz?w=50&amp;h=50" src="https://static.alili.tech/img/bVTmAz?w=50&amp;h=50" alt="341820-20160625143928610-1673030626.png" title="341820-20160625143928610-1673030626.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVTmAc?w=143&amp;h=117" src="https://static.alili.tech/img/bVTmAc?w=143&amp;h=117" alt="341820-20160625143927172-528278411.png" title="341820-20160625143927172-528278411.png" style="cursor: pointer;"></span></p>
<p>Icon Font是将一些图标作成字体文件，在CSS中指定font-face和font-family，然后为每个图标指定相应的class。<br>在网页中使用Icon Font就像使用普通的文字一样，比如font-size属性可以设定图标的大小，设定color属性可以设定图标的颜色。<br>更多内容，请参考阿里巴巴矢量图标管理网站：<a href="http://iconfont.cn/" rel="nofollow noreferrer" target="_blank">http://iconfont.cn/</a>。</p>
<h5><strong>2.不能用IconFont实现的</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVTmEL?w=501&amp;h=520" src="https://static.alili.tech/img/bVTmEL?w=501&amp;h=520" alt="341820-20160625143930266-670762486.png" title="341820-20160625143930266-670762486.png" style="cursor: pointer; display: inline;"></span></p>
<p>为什么这些图形不用IconFont实现呢？因为通常Icon Font提供的都是一些正方形的矢量图标，也就是长等于宽的图标。<br>本篇要讲的就是如何通过CSS3来实现这4个图形。</p>
<h2 id="articleHeader2">三角形</h2>
<p>不知大家注意到了没有，这4个图形都包含了一个特殊的元素——三角形。<br>这4个图形，都是由三角形、长方形，或者是一个被啃掉了一口的长方形组成的。</p>
<p>CSS3是如何实现三角形的呢？——答案是通过<strong>边框</strong>，也就是border属性</p>
<h2 id="articleHeader3">长方形边框</h2>
<p>HTML的块级元素都是长方形的，比如我们设定了以下样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.simple-retangle {
    margin: 50px auto;
    width: 200px;
    height: 200px;
    border: 40px solid salmon;
}
</style>

<div class=&quot;simple-retangle&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.simple-retangle</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">40px</span> solid salmon;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"simple-retangle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>如大家所认知的，这只是一个简单的长方形，这个长方形在画面中是这样显式的：</p>
<p><span class="img-wrap"><img data-src="/img/bVTmGS?w=279&amp;h=280" src="https://static.alili.tech/img/bVTmGS?w=279&amp;h=280" alt="341820-20160625143932906-417803012.png" title="341820-20160625143932906-417803012.png" style="cursor: pointer;"></span></p>
<p>这个长方形太单调了，再给它点颜色看看，咱们来个彩色边框吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .colored-border-retangle {
        margin: 50px auto;
        width: 200px;
        height: 200px;
        border-top: 40px solid coral;
        border-right: 40px solid lightblue;
        border-bottom: 40px solid lightgreen;
        border-left: 40px solid mediumpurple;
    }
</style>
<div class=&quot;colored-border-retangle&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.colored-border-retangle</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">40px</span> solid coral;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">40px</span> solid lightblue;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">40px</span> solid lightgreen;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">40px</span> solid mediumpurple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colored-border-retangle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>在画面中，每个边框都变成一个梯形了。</p>
<p><span class="img-wrap"><img data-src="/img/bVTmHq?w=280&amp;h=281" src="https://static.alili.tech/img/bVTmHq?w=280&amp;h=281" alt="341820-20160625143933985-1495934344.png" title="341820-20160625143933985-1495934344.png" style="cursor: pointer; display: inline;"></span></p>
<p>为什么它会变成梯形呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVTmHy?w=616&amp;h=299" src="https://static.alili.tech/img/bVTmHy?w=616&amp;h=299" alt="341820-20160625143935828-1026626973.png" title="341820-20160625143935828-1026626973.png" style="cursor: pointer; display: inline;"></span></p>
<p>请注意长方形的4个角，以<strong>左上角</strong>为例，它到底是属于左边框还是上边框呢？<br><strong>左上角</strong>，既属于<strong>左边框</strong>，又属于<strong>上边框</strong><br>角落的归属成了一个问题，浏览器为了不让边框打架，就让二位各分一半吧。<br>于是乎左上角就被一分为二，变成了两个三角形，三角形靠近哪个边框，就显示那个边框的颜色。</p>
<h2 id="articleHeader4">三角形的实现</h2>
<p>再看看文章开头的4个图案，你是不是又发现了这样一个规律？每个三角形都是“小家碧玉”的，它们<strong>没有内容</strong>。<br>既然如此，我们把上面这个彩色边框的矩形内容拿掉，看看会发生什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .colored-border-empty-retangle {
        margin: 50px auto;
        border-top: 40px solid coral;
        border-right: 40px solid lightblue;
        border-bottom: 40px solid lightgreen;
        border-left: 40px solid mediumpurple;
    }
</style>
<div class=&quot;colored-border-empty-retangle&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.colored-border-empty-retangle</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">40px</span> solid coral;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">40px</span> solid lightblue;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">40px</span> solid lightgreen;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">40px</span> solid mediumpurple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colored-border-empty-retangle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>呜，cool！左边和右边都是三角形了 耶！</p>
<p><span class="img-wrap"><img data-src="/img/bVTmIy?w=490&amp;h=174" src="https://static.alili.tech/img/bVTmIy?w=490&amp;h=174" alt="341820-20160625143936985-2102496700.png" title="341820-20160625143936985-2102496700.png" style="cursor: pointer;"></span></p>
<p>为什么上边和下边还是梯形呢？这是因为<strong>块级元素默认会在页面上水平平铺</strong>。<br>理解这一点，让上边和下边也变成三角形就简单了，<strong>将元素的width属性设为0</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .colored-border-empty-retangle {
        margin: 50px auto;
        width: 0;
        height: 0;
        border-top: 40px solid coral;
        border-right: 40px solid lightblue;
        border-bottom: 40px solid lightgreen;
        border-left: 40px solid mediumpurple;
    }
</style>
<div class=&quot;colored-border-empty-retangle&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.colored-border-empty-retangle</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">40px</span> solid coral;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">40px</span> solid lightblue;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">40px</span> solid lightgreen;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">40px</span> solid mediumpurple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colored-border-empty-retangle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>现在上下左右4个边框都是三角形了。</p>
<p><span class="img-wrap"><img data-src="/img/bVTmJc?w=306&amp;h=141" src="https://static.alili.tech/img/bVTmJc?w=306&amp;h=141" alt="341820-20160625143938344-293817724.png" title="341820-20160625143938344-293817724.png" style="cursor: pointer;"></span></p>
<p>假设我们不要4个三角形，也不要让它们凑一块，我们就只要1个三角形，该如何做呢？<br><strong>将其他3个边框的颜色设为透明色</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<style>
    .triangle-top,
    .triangle-right,
    .triangle-bottom,
    .triangle-left {
        margin: 20px auto;
        width: 0;
        height: 0;
        border: 100px solid transparent;
    }
    
    .triangle-top {
        border-top-color: coral;
    }
    
    .triangle-right {
        border-right-color: lightblue;
    }
    
    .triangle-bottom {
        border-bottom-color: lightgreen;
    }
    
    .triangle-left {
        border-left-color: mediumpurple;
    }
</style>
<div class=&quot;triangle-top&quot;></div>
<div class=&quot;triangle-right&quot;></div>
<div class=&quot;triangle-bottom&quot;></div>
<div class=&quot;triangle-left&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.triangle-top</span>,
    <span class="hljs-selector-class">.triangle-right</span>,
    <span class="hljs-selector-class">.triangle-bottom</span>,
    <span class="hljs-selector-class">.triangle-left</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">100px</span> solid transparent;
    }
    
    <span class="hljs-selector-class">.triangle-top</span> {
        <span class="hljs-attribute">border-top-color</span>: coral;
    }
    
    <span class="hljs-selector-class">.triangle-right</span> {
        <span class="hljs-attribute">border-right-color</span>: lightblue;
    }
    
    <span class="hljs-selector-class">.triangle-bottom</span> {
        <span class="hljs-attribute">border-bottom-color</span>: lightgreen;
    }
    
    <span class="hljs-selector-class">.triangle-left</span> {
        <span class="hljs-attribute">border-left-color</span>: mediumpurple;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"triangle-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"triangle-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"triangle-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"triangle-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTmJS?w=341&amp;h=686" src="https://static.alili.tech/img/bVTmJS?w=341&amp;h=686" alt="341820-20160625143940000-503362680.png" title="341820-20160625143940000-503362680.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">图案实现</h2>
<p>知道了三角形的实现方法，那么下面4个图案实现起来就小Case了。</p>
<p><span class="img-wrap"><img data-src="/img/bVTmEL?w=501&amp;h=520" src="https://static.alili.tech/img/bVTmEL?w=501&amp;h=520" alt="341820-20160625143941625-1514029408.png" title="341820-20160625143941625-1514029408.png" style="cursor: pointer;"></span></p>
<p>这4个图案分别是：旗帜，向右的双实心箭头，气泡和丝带。</p>
<p>为了便于这几种图案的演示，我们先设定以下基础共通的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    font-family: simhei, sans-serif;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    background-color: lightblue;
}

div {
    margin: 20px auto;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>* {
    <span class="hljs-attribute">font-family</span>: simhei, sans-serif;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}

<span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">62.5%</span>;
}

<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background-color</span>: lightblue;
}

<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
}
</code></pre>
<h2 id="articleHeader6">实现旗帜</h2>
<p>旗帜图案是下半部分被啃掉了一口的长方形，这一口是个三角形。</p>
<p><span class="img-wrap"><img data-src="/img/bVTmK2?w=666&amp;h=190" src="https://static.alili.tech/img/bVTmK2?w=666&amp;h=190" alt="341820-20160625143942891-488963326.png" title="341820-20160625143942891-488963326.png" style="cursor: pointer; display: inline;"></span></p>
<p>根据以上知识，我们很自然地就能想到实现方法，<strong>将border-bottom的颜色设置为透明的</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flag {
    width: 0;
    height: 0;
    border: 2rem solid #FF6600;
    border-top-width: 4rem;
    border-bottom-color: transparent;
    border-bottom-width: 2rem;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.flag</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2rem</span> solid <span class="hljs-number">#FF6600</span>;
    <span class="hljs-attribute">border-top-width</span>: <span class="hljs-number">4rem</span>;
    <span class="hljs-attribute">border-bottom-color</span>: transparent;
    <span class="hljs-attribute">border-bottom-width</span>: <span class="hljs-number">2rem</span>;
}
</code></pre>
<h2 id="articleHeader7">实现双实心箭头</h2>
<p>双实心箭头则是由两个三角形组成的</p>
<p><span class="img-wrap"><img data-src="/img/bVTmLy?w=666&amp;h=171" src="https://static.alili.tech/img/bVTmLy?w=666&amp;h=171" alt="341820-20160625143944313-511563050.png" title="341820-20160625143944313-511563050.png" style="cursor: pointer;"></span></p>
<p>为了减少页面的HTML元素，我们可以只提供一个元素实现第1个三角形，然后借助CSS3的伪类实现第2个三角形。<br>第1个三角形使用了相对定位，第2个三角形使用了绝对定位，使得第2个三角形能够紧挨着第1个三角形。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.rds-arrow-wrapper {
    position: relative;
    width: 20em;
    text-align: center;
}

.rds-arrow,
.rds-arrow:after {
    display: inline-block;
    position: relative;
    width: 0;
    height: 0;
    border-top: 1rem solid transparent;
    border-left: 2rem solid #fff;
    border-bottom: 1rem solid transparent;
    border-right: 2rem solid transparent;
}

.rds-arrow {
    margin-left: 1rem;
}

.rds-arrow:after {
    content: &quot;&quot;;
    position: absolute;
    left: 100%;
    top: -1rem;
    bottom: 0;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-class">.rds-arrow-wrapper</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-class">.rds-arrow</span>,
<span class="hljs-selector-class">.rds-arrow</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1rem</span> solid transparent;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">2rem</span> solid <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1rem</span> solid transparent;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">2rem</span> solid transparent;
}

<span class="hljs-selector-class">.rds-arrow</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">1rem</span>;
}

<span class="hljs-selector-class">.rds-arrow</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<p><strong>需要注意的是，箭头方向是向右的，但在CSS里面是通过border-left的颜色来控制的。</strong></p>
<h2 id="articleHeader8">实现气泡</h2>
<p>气泡是我们常见的一种图案，<strong>它是由一个三角形和一个长方形组成的</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVTmMv?w=666&amp;h=181" src="https://static.alili.tech/img/bVTmMv?w=666&amp;h=181" alt="341820-20160625143945860-1075822201.png" title="341820-20160625143945860-1075822201.png" style="cursor: pointer; display: inline;"></span></p>
<p>由于三角形是放在长方形前面的，所以我们使用<strong>:before伪类</strong>，并设置<strong>绝对定位</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bubble {
    position: relative;
    background-color: #33AAEE;
    width: 10rem;
    height: 3rem;
    font-size: 2rem;
    line-height: 3rem;
    color: #FFF;
    text-align: center;
}

.bubble:before {
    position: absolute;
    content: &quot;&quot;;
    right: 100%;
    top: 1rem;
    width: 0;
    height: 0;
    border-top: 0.6rem solid transparent;
    border-right: 0.6rem solid #33AAEE;
    border-bottom: 0.6rem solid transparent;
    border-left: 0.6rem solid transparent;
}

.bubble .text {
    display: inline-block;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.bubble</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#33AAEE</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3rem</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2rem</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">3rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
    <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-class">.bubble</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">0.6rem</span> solid transparent;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.6rem</span> solid <span class="hljs-number">#33AAEE</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">0.6rem</span> solid transparent;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">0.6rem</span> solid transparent;
}

<span class="hljs-selector-class">.bubble</span> <span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}
</code></pre>
<h2 id="articleHeader9">实现丝带</h2>
<p>丝带的实现则稍微复杂一些，不过我们可以将它拆分成3个部分：</p>
<ol>
<li><p>1.一个显示文字的长方形</p></li>
<li><p>2.左右两侧的耳朵（被啃了一口的长方形）</p></li>
<li><p>3.在下方用于显示阴影的两个小三角形</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVTmNf?w=469&amp;h=603" src="https://static.alili.tech/img/bVTmNf?w=469&amp;h=603" alt="341820-20160625143947766-166332362.png" title="341820-20160625143947766-166332362.png" style="cursor: pointer;"></span></p>
<h4><strong>第1步：实现丝带主体长方形</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ribbon {
    position: relative;
    width: 10rem;
    height: 3rem;
    padding: 0.7rem 0;
    font-size: 1.6rem !important;
    color: #fff;
    text-align: center;
    background: #ff0066;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ribbon</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3rem</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.7rem</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.6rem</span> <span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0066</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTmNI?w=271&amp;h=134" src="https://static.alili.tech/img/bVTmNI?w=271&amp;h=134" alt="341820-20160625143949047-266584057.png" title="341820-20160625143949047-266584057.png" style="cursor: pointer; display: inline;"></span></p>
<h4><strong>第2步：实现丝带左右两侧的耳朵</strong></h4>
<p><strong>:before伪类</strong>实现左耳朵，<strong>:after伪类</strong>实现右耳朵</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ribbon:before,
.ribbon:after {
    content: &quot;&quot;;
    position: absolute;
    display: block;
    bottom: -0.6rem;
    border: 1.5rem solid #ff0066;
    z-index: -1;
}

.ribbon:before {
    left: -2.4rem;
    border-right-width: 1.5rem;
    border-left-color: transparent;
    box-shadow: 1px 1px 0 rgba(176, 102, 166, 0.8);
}

.ribbon:after {
    right: -2.4rem;
    border-left-width: 1.5rem;
    border-right-color: transparent;
    box-shadow: 0 1px 0 rgba(176, 102, 166, 0.8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ribbon</span><span class="hljs-selector-pseudo">:before</span>,
<span class="hljs-selector-class">.ribbon</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">0.6rem</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1.5rem</span> solid <span class="hljs-number">#ff0066</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.ribbon</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">2.4rem</span>;
    <span class="hljs-attribute">border-right-width</span>: <span class="hljs-number">1.5rem</span>;
    <span class="hljs-attribute">border-left-color</span>: transparent;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(176, 102, 166, 0.8);
}

<span class="hljs-selector-class">.ribbon</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">2.4rem</span>;
    <span class="hljs-attribute">border-left-width</span>: <span class="hljs-number">1.5rem</span>;
    <span class="hljs-attribute">border-right-color</span>: transparent;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(176, 102, 166, 0.8);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTmOq?w=284&amp;h=120" src="https://static.alili.tech/img/bVTmOq?w=284&amp;h=120" alt="341820-20160625143950860-1405295332.png" title="341820-20160625143950860-1405295332.png" style="cursor: pointer;"></span></p>
<p>HTML代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;ribbon&quot;>
    <span class=&quot;ribbon-content&quot;>金卡会员</span>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ribbon"</span>&gt;
    &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"ribbon-content"</span>&gt;金卡会员&lt;/span&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3三角形的运用

## 原文链接
[https://segmentfault.com/a/1190000010773460](https://segmentfault.com/a/1190000010773460)


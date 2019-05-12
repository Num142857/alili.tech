---
title: 'Flexbox布局的正确使用姿势' 
date: 2019-01-11 2:30:07
hidden: true
slug: ldz90nxuwg
categories: [reprint]
---

{{< raw >}}

                    
<p>在项目中，我们还会大量使用到flexbox的新旧属性，但大多数人一般只会写新属性，旧属性交由autoprefixer处理，但其实完成同样功能的新旧属性表现形式却不尽相同。还有部分人只使用“万能”的flex:number属性为伸缩项目分配空间，但有些特殊情景却无法满足，此文为此梳理了flexbox的新旧属性区别和分配空间的原理，为大家用flexbox布局的项目通通渠。</p>
<h2 id="articleHeader0">Flexbox兼容性</h2>
<p>PC端的兼容性<br><span class="img-wrap"><img data-src="/img/remote/1460000009932887?w=500&amp;h=280" src="https://static.alili.tech/img/remote/1460000009932887?w=500&amp;h=280" alt="flexbox-pc" title="flexbox-pc" style="cursor: pointer; display: inline;"></span></p>
<p>移动端的兼容性<br><span class="img-wrap"><img data-src="/img/remote/1460000009932888?w=500&amp;h=280" src="https://static.alili.tech/img/remote/1460000009932888?w=500&amp;h=280" alt="flexbox-wap" title="flexbox-wap" style="cursor: pointer; display: inline;"></span></p>
<p>如上图，为了兼容IE10-11和Android4.3-，UC，我们仍需要使用Flexbox的旧属性。</p>
<h2 id="articleHeader1">Flexbox新旧属性</h2>
<p>Flexbox的新属性提供了很多旧版本没有的功能，但是目前Android4.x和UC仍有一定市场占有率需要兼容，因此目前只使用新旧属性都有的功能。<br>能实现相同功能的Flexbox新旧属性如下表：<br><span class="img-wrap"><img data-src="/img/remote/1460000009932889?w=800&amp;h=684" src="https://static.alili.tech/img/remote/1460000009932889?w=800&amp;h=684" alt="flexbox-attribute" title="flexbox-attribute" style="cursor: pointer; display: inline;"></span></p>
<p>但想象是美好的，现实是残酷的，新旧属性里有那么几个顽固分子并不能乖乖的表现的一样，总有那么一点不同。<br>下面我们来看看是哪些新旧属性有不同：</p>
<h3 id="articleHeader2">
<code>flex-direction:row-reverse</code> vs <code>box-orient:horizontal;box-direction:reverse</code>
</h3>
<p>相同点：改变主轴方向和伸缩项目的排列顺序；在ltr下伸缩项目从右到左排列。<br>不同点：</p>
<p><code>flex-direction:row-reverse</code>：第一个伸缩项目向主轴起点对齐<br><span class="img-wrap"><img data-src="/img/remote/1460000009932890?w=320&amp;h=60" src="https://static.alili.tech/img/remote/1460000009932890?w=320&amp;h=60" alt="row-reverse" title="row-reverse" style="cursor: pointer; display: inline;"></span></p>
<p><code>box-orient:horizontal;box-direction:reverse</code>：最后一个伸缩项目向主轴终点对齐<br><span class="img-wrap"><img data-src="/img/remote/1460000009932891?w=320&amp;h=60" src="https://static.alili.tech/img/remote/1460000009932891?w=320&amp;h=60" alt="row-reverse2" title="row-reverse2" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">
<code>flex-direction:column-reverse</code> vs <code>box-orient:vertical;box-direction:reverse</code>
</h3>
<p>相同点：改变主轴方向和伸缩项目的排列顺序；在ltr下伸缩项目从下到上排列。<br>不同点：<br><code>flex-direction:column-reverse</code>：第一个伸缩项目向主轴起点对齐。<br><span class="img-wrap"><img data-src="/img/remote/1460000009932892?w=60&amp;h=319" src="https://static.alili.tech/img/remote/1460000009932892?w=60&amp;h=319" alt="column-reverse" title="column-reverse" style="cursor: pointer;"></span></p>
<p><code>box-orient:vertical;box-direction:reverse</code>：最后一个伸缩项目向主轴终点对齐。<br><span class="img-wrap"><img data-src="/img/remote/1460000009932893?w=60&amp;h=320" src="https://static.alili.tech/img/remote/1460000009932893?w=60&amp;h=320" alt="column-reverse2" title="column-reverse2" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">
<code>oreder:integer</code> vs <code>box-ordinal-group:integer</code>
</h3>
<p>相同点：定义伸缩项目显示顺序。<br>不同点：<br><code>oreder:integer</code>：默认值为0；可以为负值。<br><code>box-ordinal-group:integer</code>：默认值为1；取值大于1。</p>
<h3 id="articleHeader5">
<code>flex-grow:number</code> vs <code>box-flex:number</code>
</h3>
<p>相同点：定义伸缩项目的扩展因素。<br>不同点：<code>box-flex:number</code>同时定义了伸缩项目的缩小因素。</p>
<h3 id="articleHeader6">
<code>flex-shrink:number</code> vs <code>box-flex:number</code>
</h3>
<p>相同点：定义伸缩项目的缩小因素。<br>不同点：<code>box-flex:number</code>同时定义了伸缩项目的扩展因素。</p>
<h2 id="articleHeader7">Flexbox分配空间原理</h2>
<p>影响Flexbox布局分配空间的属性有三个，分别是<code>flex-grow</code>、<code>flex-shrink</code>和<code>flex-basis</code>。</p>
<ul>
<li><p><code>flex-grow</code>：当伸缩项目在主轴方向的总宽度 &lt; 伸缩容器，伸缩项目根据扩展因素分配伸缩容器的剩余空间。</p></li>
<li><p><code>flex-shrink</code>：当伸缩项目在主轴方向的总宽度 &gt; 伸缩容器，伸缩项目根据缩小因素分配总宽度超出伸缩容器的空间。</p></li>
<li><p><code>flex-basis</code>：伸缩基础，在进行计算剩余空间或超出空间前，给伸缩项目重新设置一个宽度，然后再计算。</p></li>
</ul>
<p>我们先来看看如何计算计算拉伸后的伸缩项目宽度，先简单明了的给个公式，再通过栗子来验证。</p>
<blockquote>
<p>伸缩项目扩展宽度 = (项目容器宽度 - 项目宽度或项目设置的<code>flex-basis</code>总和) * 对应的<code>flex-grow</code>比例</p>
<p>拉伸后伸缩项目宽度 = 原伸缩项目宽度 + 扩展宽度</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flexbox-wrap{
    width:550px;
    display: flex;
}
.flexbox-item{
    &amp;:nth-child(1){
        width:60px;
    }
    &amp;:nth-child(2){
        width:70px;
    }
    &amp;:nth-child(3){
        flex-basis:80px;
    }
    &amp;:nth-child(4){
        flex-basis:90px;
    }
    &amp;:nth-child(5){
         flex-basis:100px;
    }
}
@for $i from 1 through 5 {
    .flexbox-item:nth-child(#{$i}){
        flex-grow: $i;
        background-color: rgba(35 * (6-$i), 20 * $i, 35 * $i,1);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.flexbox-wrap</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">550px</span>;
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.flexbox-item</span>{
    &amp;:nth-child(1){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">60px</span>;
    }
    &amp;:nth-child(2){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">70px</span>;
    }
    &amp;:nth-child(3){
        <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">80px</span>;
    }
    &amp;:nth-child(4){
        <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">90px</span>;
    }
    &amp;:nth-child(5){
         <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">100px</span>;
    }
}
@<span class="hljs-keyword">for</span> <span class="hljs-variable">$i</span> from 1 through 5 {
    <span class="hljs-selector-class">.flexbox-item</span>:nth-child(#{<span class="hljs-variable">$i</span>}){
        <span class="hljs-attribute">flex-grow</span>: <span class="hljs-variable">$i</span>;
        <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">35</span> * (<span class="hljs-number">6</span>-<span class="hljs-variable">$i</span>), <span class="hljs-number">20</span> * <span class="hljs-variable">$i</span>, <span class="hljs-number">35</span> * <span class="hljs-variable">$i</span>,<span class="hljs-number">1</span>);
    }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009932894?w=320&amp;h=65" src="https://static.alili.tech/img/remote/1460000009932894?w=320&amp;h=65" alt="flex-grow" title="flex-grow" style="cursor: pointer; display: inline;"></span></p>
<p>我们来计算一下上面栗子中第一个伸缩项目拉伸后的宽度。<br>对应着公式一步步计算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目容器宽度
container = 550
// 项目宽度或项目设置的flex-basis总和
itemSum = 60 + 70 + 80 + 90 + 100 = 400
// 第一个伸缩项目对应的flex-grow比例
flexRatio = 1 / ( 1 + 2 + 3 + 4 + 5 ) = 1/15
// 第一个伸缩项目扩展宽度
extendWidth = ( 550 - 400 ) * 1/15 = 10
// 第一个伸缩项目拉伸后的宽度
itemWidth = 60 + 10 = 70" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 项目容器宽度</span>
container = <span class="hljs-number">550</span>
<span class="hljs-comment">// 项目宽度或项目设置的flex-basis总和</span>
itemSum = <span class="hljs-number">60</span> + <span class="hljs-number">70</span> + <span class="hljs-number">80</span> + <span class="hljs-number">90</span> + <span class="hljs-number">100</span> = <span class="hljs-number">400</span>
<span class="hljs-comment">// 第一个伸缩项目对应的flex-grow比例</span>
flexRatio = <span class="hljs-number">1</span> / ( <span class="hljs-number">1</span> + <span class="hljs-number">2</span> + <span class="hljs-number">3</span> + <span class="hljs-number">4</span> + <span class="hljs-number">5</span> ) = <span class="hljs-number">1</span>/<span class="hljs-number">15</span>
<span class="hljs-comment">// 第一个伸缩项目扩展宽度</span>
extendWidth = ( <span class="hljs-number">550</span> - <span class="hljs-number">400</span> ) * <span class="hljs-number">1</span>/<span class="hljs-number">15</span> = <span class="hljs-number">10</span>
<span class="hljs-comment">// 第一个伸缩项目拉伸后的宽度</span>
itemWidth = <span class="hljs-number">60</span> + <span class="hljs-number">10</span> = <span class="hljs-number">70</span></code></pre>
<p>计算后得到第一个伸缩项目拉伸后的宽度是70px，我们通过chrome上的盒子模型来看看是否正确<br><span class="img-wrap"><img data-src="/img/remote/1460000009932895?w=200&amp;h=182" src="https://static.alili.tech/img/remote/1460000009932895?w=200&amp;h=182" alt="flex-grow-box" title="flex-grow-box" style="cursor: pointer; display: inline;"></span></p>
<p>chrome计算的结果和我们计算的结果是一致的。</p>
<blockquote><p><strong>根据拉伸的计算公式是不是很容易就能推演出压缩的计算公式呢？</strong></p></blockquote>
<p>伸缩项目缩小宽度 = (项目宽度或项目设置的<code>flex-basis</code>总和 - 项目容器宽度) * 对应的<code>flex-shrink</code>比例</p>
<p>压缩后伸缩项目宽度 = 原伸缩项目宽度 - 缩小宽度</p>
<p>继续用个栗子来验证公式是否正确</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flexbox-wrap{
    width:250px;
    display: flex;
}
.flexbox-item{
    &amp;:nth-child(1){
        width:60px;
    }
    &amp;:nth-child(2){
        width:70px;
    }
    &amp;:nth-child(3){
        flex-basis:80px;
    }
    &amp;:nth-child(4){
        flex-basis:90px;
    }
    &amp;:nth-child(5){
         flex-basis:100px;
    }
}
@for $i from 1 through 5 {
    .flexbox-item:nth-child(#{$i}){
        flex-shrink: $i;
        background-color: rgba(35 * (6-$i), 20 * $i, 35 * $i,1);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.flexbox-wrap</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">250px</span>;
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.flexbox-item</span>{
    &amp;:nth-child(1){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">60px</span>;
    }
    &amp;:nth-child(2){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">70px</span>;
    }
    &amp;:nth-child(3){
        <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">80px</span>;
    }
    &amp;:nth-child(4){
        <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">90px</span>;
    }
    &amp;:nth-child(5){
         <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">100px</span>;
    }
}
@<span class="hljs-keyword">for</span> <span class="hljs-variable">$i</span> from 1 through 5 {
    <span class="hljs-selector-class">.flexbox-item</span>:nth-child(#{<span class="hljs-variable">$i</span>}){
        <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-variable">$i</span>;
        <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">35</span> * (<span class="hljs-number">6</span>-<span class="hljs-variable">$i</span>), <span class="hljs-number">20</span> * <span class="hljs-variable">$i</span>, <span class="hljs-number">35</span> * <span class="hljs-variable">$i</span>,<span class="hljs-number">1</span>);
    }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009932896?w=320&amp;h=132" src="https://static.alili.tech/img/remote/1460000009932896?w=320&amp;h=132" alt="flex-shrink" title="flex-shrink" style="cursor: pointer;"></span></p>
<p>我们来计算一下上面栗子中第一个伸缩项目压缩后的宽度。<br>对应着公式一步步计算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目容器宽度
container = 250
// 项目宽度或项目设置的flex-basis总和
itemSum = 60 + 70 + 80 + 90 + 100 = 400
// 第一个伸缩项目对应的flex-shrink比例
flexRatio = 1 / ( 1 + 2 + 3 + 4 + 5 ) = 1/15
// 第一个伸缩项目缩小宽度
extendWidth = ( 400 - 250 ) * 1/15 = 10
// 第一个伸缩项目压缩后的宽度
itemWidth = 60 - 10 = 50" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 项目容器宽度</span>
container = <span class="hljs-number">250</span>
<span class="hljs-comment">// 项目宽度或项目设置的flex-basis总和</span>
itemSum = <span class="hljs-number">60</span> + <span class="hljs-number">70</span> + <span class="hljs-number">80</span> + <span class="hljs-number">90</span> + <span class="hljs-number">100</span> = <span class="hljs-number">400</span>
<span class="hljs-comment">// 第一个伸缩项目对应的flex-shrink比例</span>
flexRatio = <span class="hljs-number">1</span> / ( <span class="hljs-number">1</span> + <span class="hljs-number">2</span> + <span class="hljs-number">3</span> + <span class="hljs-number">4</span> + <span class="hljs-number">5</span> ) = <span class="hljs-number">1</span>/<span class="hljs-number">15</span>
<span class="hljs-comment">// 第一个伸缩项目缩小宽度</span>
extendWidth = ( <span class="hljs-number">400</span> - <span class="hljs-number">250</span> ) * <span class="hljs-number">1</span>/<span class="hljs-number">15</span> = <span class="hljs-number">10</span>
<span class="hljs-comment">// 第一个伸缩项目压缩后的宽度</span>
itemWidth = <span class="hljs-number">60</span> - <span class="hljs-number">10</span> = <span class="hljs-number">50</span></code></pre>
<p>计算后得到第一个伸缩项目压缩后的宽度是50px，我们通过chrome上的盒子模型来看看是否正确<br><span class="img-wrap"><img data-src="/img/remote/1460000009932897?w=200&amp;h=181" src="https://static.alili.tech/img/remote/1460000009932897?w=200&amp;h=181" alt="flex-shrink-box" title="flex-shrink-box" style="cursor: pointer;"></span></p>
<p>chrome计算的结果和我们计算的结果不一样。<br><span class="img-wrap"><img data-src="/img/remote/1460000009932898?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000009932898?w=200&amp;h=200" alt="gangga" title="gangga" style="cursor: pointer;"></span></p>
<p>伸缩项目压缩的计算方式和拉伸的不一样，是因为压缩会有极端情况，我们把第一个伸缩项目的<code>flex-shrink</code>修改为10，此时缩小宽度为<code>( 400 - 250 ) * ( 10 / 24) = 62.5</code>，缩小的宽度比原宽度要大，计算的压缩后的宽度变成了负数。</p>
<p>为了避免这种极端情况，计算缩小比例是要考虑伸缩项目的原宽度。</p>
<p>正确的公式是这样的</p>
<blockquote>
<p>伸缩项目缩小宽度 = (项目宽度或项目设置的flex-basis总和 - 项目容器宽度) <em> (对应的flex-shrink </em> 项目宽度或项目设置的flex-basis比例)</p>
<p>压缩后伸缩项目宽度 = 原伸缩项目宽度 - 缩小宽度</p>
</blockquote>
<p>对应着公式一步步计算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目容器宽度
container = 250
// 项目宽度或项目设置的flex-basis总和
itemSum = 60 + 70 + 80 + 90 + 100 = 400
// 第一个伸缩项目对应的flex-shrink比例
flexRatio = (1*60) / (1*60+2*70+3*80+4*90+5*100) = 6/130
// 第一个伸缩项目缩小宽度
extendWidth = ( 400 - 250 ) * 6/130 ≈ 6.922
// 第一个伸缩项目压缩后的宽度
itemWidth = 60 - 6.922 = 53.078" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 项目容器宽度</span>
container = <span class="hljs-number">250</span>
<span class="hljs-comment">// 项目宽度或项目设置的flex-basis总和</span>
itemSum = <span class="hljs-number">60</span> + <span class="hljs-number">70</span> + <span class="hljs-number">80</span> + <span class="hljs-number">90</span> + <span class="hljs-number">100</span> = <span class="hljs-number">400</span>
<span class="hljs-comment">// 第一个伸缩项目对应的flex-shrink比例</span>
flexRatio = (<span class="hljs-number">1</span>*<span class="hljs-number">60</span>) / (<span class="hljs-number">1</span>*<span class="hljs-number">60</span>+<span class="hljs-number">2</span>*<span class="hljs-number">70</span>+<span class="hljs-number">3</span>*<span class="hljs-number">80</span>+<span class="hljs-number">4</span>*<span class="hljs-number">90</span>+<span class="hljs-number">5</span>*<span class="hljs-number">100</span>) = <span class="hljs-number">6</span>/<span class="hljs-number">130</span>
<span class="hljs-comment">// 第一个伸缩项目缩小宽度</span>
extendWidth = ( <span class="hljs-number">400</span> - <span class="hljs-number">250</span> ) * <span class="hljs-number">6</span>/<span class="hljs-number">130</span> ≈ <span class="hljs-number">6.922</span>
<span class="hljs-comment">// 第一个伸缩项目压缩后的宽度</span>
itemWidth = <span class="hljs-number">60</span> - <span class="hljs-number">6.922</span> = <span class="hljs-number">53.078</span></code></pre>
<p>计算后得到第一个伸缩项目压缩后的宽度是53.078px，和chrome上的盒子模型是一样的。</p>
<h2 id="articleHeader8">Flexbox属性缩写陷阱</h2>
<p>上面介绍的<code>flex-grow</code>、<code>flex-shrink</code>和<code>flex-basis</code>有一个缩写的写法<code>flex</code>。</p>
<blockquote><p><code>flex</code>: <code>flex-grow</code> [<code>flex-shrink</code>] [<code>flex-basis</code>]</p></blockquote>
<p><code>flex</code>各种缩写的值</p>
<ul>
<li><p><code>flex: initial</code> == <code>flex: 0 1 auto</code></p></li>
<li><p><code>flex: none</code> == <code>flex: 0 0 auto</code></p></li>
<li><p><code>flex: auto</code> == <code>flex: 1 1 auto</code></p></li>
<li><p><code>flex: number</code> == <code>flex: number 1 0%</code></p></li>
</ul>
<p>在实际项目中，会直接写使用缩写的<code>flex</code>来给伸缩项目分配空间，但是使用缩写属性会留下一些陷阱，导致表现的结果不尽如人意。</p>
<p>分别使用<code>flex</code>和<code>flex-grow</code>来把伸缩项目拉伸填满容器，看看表现的差异。</p>
<p>首先看看使用<code>flex-grow</code>拉伸伸缩项目的效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flexbox-wrap{
    width:550px;
    display: flex;
}
.flexbox-item{
    flex-grow:1;
    &amp;:nth-child(1){
        width:60px;
    }
    &amp;:nth-child(2){
        width:70px;
    }
    &amp;:nth-child(3){
        width:80px;
    }
    &amp;:nth-child(4){
        width:90px;
    }
    &amp;:nth-child(5){
         width:100px;
    }
}
@for $i from 1 through 5 {
    .flexbox-item:nth-child(#{$i}){
        background-color: rgba(35 * (6-$i), 20 * $i, 35 * $i,1);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.flexbox-wrap</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">550px</span>;
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.flexbox-item</span>{
    <span class="hljs-attribute">flex-grow</span>:<span class="hljs-number">1</span>;
    &amp;:nth-child(1){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">60px</span>;
    }
    &amp;:nth-child(2){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">70px</span>;
    }
    &amp;:nth-child(3){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;
    }
    &amp;:nth-child(4){
        <span class="hljs-attribute">width</span>:<span class="hljs-number">90px</span>;
    }
    &amp;:nth-child(5){
         <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    }
}
@<span class="hljs-keyword">for</span> <span class="hljs-variable">$i</span> from 1 through 5 {
    <span class="hljs-selector-class">.flexbox-item</span>:nth-child(#{<span class="hljs-variable">$i</span>}){
        <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">35</span> * (<span class="hljs-number">6</span>-<span class="hljs-variable">$i</span>), <span class="hljs-number">20</span> * <span class="hljs-variable">$i</span>, <span class="hljs-number">35</span> * <span class="hljs-variable">$i</span>,<span class="hljs-number">1</span>);
    }
}</code></pre>
<p>每个伸缩项目在原宽度上拉伸相同的宽度<br><span class="img-wrap"><img data-src="/img/remote/1460000009932899?w=320&amp;h=65" src="https://static.alili.tech/img/remote/1460000009932899?w=320&amp;h=65" alt="flex-grow1" title="flex-grow1" style="cursor: pointer; display: inline;"></span></p>
<p>通过上面的计算拉伸后的伸缩项目宽度，可以计算第一个伸缩项目拉伸后的宽度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目容器宽度
container = 550
// 项目宽度或项目设置的flex-basis总和
itemSum = 60 + 70 + 80 + 90 + 100 = 400
// 第一个伸缩项目对应的flex-grow比例
flexRatio = 1 / ( 1 + 1 + 1 + 1 + 1 ) = 1/5
// 第一个伸缩项目扩展宽度
extendWidth = ( 550 - 400 ) * 1/5 = 30
// 第一个伸缩项目拉伸后的宽度
itemWidth = 60 + 30 = 90" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 项目容器宽度</span>
container = <span class="hljs-number">550</span>
<span class="hljs-comment">// 项目宽度或项目设置的flex-basis总和</span>
itemSum = <span class="hljs-number">60</span> + <span class="hljs-number">70</span> + <span class="hljs-number">80</span> + <span class="hljs-number">90</span> + <span class="hljs-number">100</span> = <span class="hljs-number">400</span>
<span class="hljs-comment">// 第一个伸缩项目对应的flex-grow比例</span>
flexRatio = <span class="hljs-number">1</span> / ( <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span> ) = <span class="hljs-number">1</span>/<span class="hljs-number">5</span>
<span class="hljs-comment">// 第一个伸缩项目扩展宽度</span>
extendWidth = ( <span class="hljs-number">550</span> - <span class="hljs-number">400</span> ) * <span class="hljs-number">1</span>/<span class="hljs-number">5</span> = <span class="hljs-number">30</span>
<span class="hljs-comment">// 第一个伸缩项目拉伸后的宽度</span>
itemWidth = <span class="hljs-number">60</span> + <span class="hljs-number">30</span> = <span class="hljs-number">90</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009932900?w=200&amp;h=181" src="https://static.alili.tech/img/remote/1460000009932900?w=200&amp;h=181" alt="flex-grow1-box" title="flex-grow1-box" style="cursor: pointer;"></span></p>
<p>然后我们把<code>flex-grow:1</code>替换成<code>flex:1</code>，下面是表现的效果，伸缩项目拉伸后的宽度变成一样了。<br><span class="img-wrap"><img data-src="/img/remote/1460000009932901?w=320&amp;h=65" src="https://static.alili.tech/img/remote/1460000009932901?w=320&amp;h=65" alt="flex1" title="flex1" style="cursor: pointer;"></span></p>
<p>从chrome的盒子模型可看到伸缩项目拉伸后宽度变成了<code>110px</code>，伸缩容器等分了容器的宽度。<br><span class="img-wrap"><img data-src="/img/remote/1460000009932902?w=200&amp;h=181" src="https://static.alili.tech/img/remote/1460000009932902?w=200&amp;h=181" alt="flex1-box" title="flex1-box" style="cursor: pointer;"></span></p>
<p><code>flex:1</code>展开后是<code>flex:1 1 0%</code>，<code>flex-grow:1</code>相当于<code>flex:1 1 auto</code>，两者的区别在于<code>flex-basis</code>的值不同。<code>flex:1</code>为项目宽度重新设置了宽度为<code>0</code>，所以可分配空间为整个容器，从公式计算上可以更直观理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目容器宽度
container = 550
// 项目宽度或项目设置的flex-basis总和
itemSum = 0 + 0 + 0 + 0 + 0 = 0
// 第一个伸缩项目对应的flex-grow比例
flexRatio = 1 / ( 1 + 1 + 1 + 1 + 1 ) = 1/5
// 第一个伸缩项目扩展宽度
extendWidth = ( 550 - 0 ) * 1/5 = 110
// 第一个伸缩项目拉伸后的宽度
itemWidth = 0 + 110 = 110" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 项目容器宽度</span>
container = <span class="hljs-number">550</span>
<span class="hljs-comment">// 项目宽度或项目设置的flex-basis总和</span>
itemSum = <span class="hljs-number">0</span> + <span class="hljs-number">0</span> + <span class="hljs-number">0</span> + <span class="hljs-number">0</span> + <span class="hljs-number">0</span> = <span class="hljs-number">0</span>
<span class="hljs-comment">// 第一个伸缩项目对应的flex-grow比例</span>
flexRatio = <span class="hljs-number">1</span> / ( <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span> + <span class="hljs-number">1</span> ) = <span class="hljs-number">1</span>/<span class="hljs-number">5</span>
<span class="hljs-comment">// 第一个伸缩项目扩展宽度</span>
extendWidth = ( <span class="hljs-number">550</span> - <span class="hljs-number">0</span> ) * <span class="hljs-number">1</span>/<span class="hljs-number">5</span> = <span class="hljs-number">110</span>
<span class="hljs-comment">// 第一个伸缩项目拉伸后的宽度</span>
itemWidth = <span class="hljs-number">0</span> + <span class="hljs-number">110</span> = <span class="hljs-number">110</span></code></pre>
<h2 id="articleHeader9">需要注意的Flexbox特性</h2>
<h3 id="articleHeader10">无效属性</h3>
<ul>
<li><p>column-*在伸缩容器无效</p></li>
<li><p>float和clear在伸缩项目无效</p></li>
<li><p>vertical-align在伸缩项目无效</p></li>
<li><p>::first-line and ::first-letter在伸缩容器无效</p></li>
</ul>
<h3 id="articleHeader11">伸缩容器中的非空字符文本节点也是伸缩项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;flexbox-wrap&quot;>
    <span class=&quot;flexbox-item&quot;>1</span>
    <span class=&quot;flexbox-item&quot;>2</span>
    我是个假文本
    <span class=&quot;flexbox-item&quot;>3</span>
    <span class=&quot;flexbox-item&quot;>4</span>
    <span class=&quot;flexbox-item&quot;>5</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flexbox-wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flexbox-item"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flexbox-item"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    我是个假文本
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flexbox-item"</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flexbox-item"</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flexbox-item"</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009932903?w=320&amp;h=60" src="https://static.alili.tech/img/remote/1460000009932903?w=320&amp;h=60" alt="textelement" title="textelement" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">margin折叠</h3>
<ul>
<li><p>伸缩容器和伸缩项目的margin不会折叠</p></li>
<li><p>伸缩项目间的margin不会折叠</p></li>
</ul>
<h2 id="articleHeader13">旧版Flexbox的BUG</h2>
<p>伸缩项目为行内元素要加display:block;或display:flex</p>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000009932882" target="_blank">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flexbox布局的正确使用姿势

## 原文链接
[https://segmentfault.com/a/1190000009932882](https://segmentfault.com/a/1190000009932882)


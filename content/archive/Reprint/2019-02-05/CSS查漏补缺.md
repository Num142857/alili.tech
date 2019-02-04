---
title: 'CSS查漏补缺' 
date: 2019-02-05 2:30:09
hidden: true
slug: x5l3bwwlrih
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">块级格式上下文（Block formatting context）</h2>
<ol>
<li>
<p>普通流(Normal Flow)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行， 除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs julia"><code>
在普通流中，元素按照其在 <span class="hljs-built_in">HTML</span> 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行， 除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 <span class="hljs-built_in">HTML</span> 文档中的位置决定。
</code></pre>
</li>
<li>
<p>浮动 (Floats)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
</code></pre>
</li>
<li>
<p>绝对定位 (Absolute Positioning)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响（如果看了上文的童鞋，会发现这点与浮动元素会影响兄弟元素是不同的），而元素具体的位置由绝对定位的坐标决定。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响（如果看了上文的童鞋，会发现这点与浮动元素会影响兄弟元素是不同的），而元素具体的位置由绝对定位的坐标决定。
</code></pre>
</li>
</ol>
<p>BFC 正是属于普通流的，因此它对兄弟元素也不会造成什么影响。</p>
<h3 id="articleHeader1">什么是BFC?</h3>
<blockquote><p>块格式化上下文（block formatting context） 是页面 CSS 视觉渲染的一部分。它是用于决定块盒子的布局及浮动相互影响的一个区域。 --<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context" rel="nofollow noreferrer" target="_blank">MDN 块格式上下文</a></p></blockquote>
<p>我的理解是，BFC是一个环境，在这个环境中的元素不会影响到其他环境中的布局，也就是说，处于不同BFC中的元素是不会互相干扰的。</p>
<h3 id="articleHeader2">BFC的触发条件</h3>
<ul>
<li><p>根元素或其它包含它的元素</p></li>
<li><p>浮动元素，float除none以外的值</p></li>
<li><p>绝对定位元素 (元素的 position 为 absolute 或 fixed)</p></li>
<li><p>display为以下其中之一的值：inline-block,table-cell,table-caption</p></li>
<li><p>overflow 的值不为 visible的元素</p></li>
<li><p>弹性盒子 flex boxes (元素的 display: flex 或 inline-flex)</p></li>
</ul>
<p>其中，最常见的就是overflow:hidden、float:left/right、position:absolute。也就是说，每次看到这些属性的时候，就代表了该元素以及创建了一个BFC了。</p>
<h3 id="articleHeader3">BFC的特性</h3>
<ol>
<li><p>内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）；</p></li>
<li><p>处于同一个BFC中的元素相互影响，可能会发生margin collapse；</p></li>
<li><p>每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；</p></li>
<li><p>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；</p></li>
<li><p>计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算；</p></li>
<li><p>浮动盒区域不叠加到BFC上；</p></li>
</ol>
<h3 id="articleHeader4">BFC有什么用？</h3>
<ol>
<li>
<p>阻止外边距折叠</p>
<p>两个相连的块级元素在垂直上的外边距会发生叠加，有些把这种情况看作是bug，但我觉得可能是出于段落排版的考虑，为了令行间距一致才有的这一特性。我们先来看看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>first</p>
<p>second</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin: 0px;padding: 0px}
p {
    color: red;
    background: #eee;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin: 10px;
    border: solid 1px red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">*{<span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>}
<span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">color</span>: red;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760336" src="https://static.alili.tech/img/remote/1460000006760336" alt="外边距折叠情况" title="外边距折叠情况" style="cursor: pointer;"></span></p>
<p>从上面可以看出，我们给两个p元素都设置<code>margin</code>,但中间的间距却发生了折叠。然后举个BFC的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ele{
    overflow: hidden;
    border: solid 1px red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ele</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;ele&quot;>
    <p>first</p>
</div>
<div class=&quot;ele&quot;>
    <p>second</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ele"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ele"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760337" src="https://static.alili.tech/img/remote/1460000006760337" alt="防止外边距折叠" title="防止外边距折叠" style="cursor: pointer;"></span></p>
<p>从上面可以看出，我们为每个div元素设置<code>overflow</code>的值为<code>hidden</code>,产生一个块级格式上下文，因为外边距不会相互重叠。</p>
</li>
<li>
<p>BFC可以包含浮动的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html
<div class = &quot;box&quot;>
    <div class= &quot;floatL&quot;>float</div>
    <div class= &quot;floatL&quot;>float</div>
</div>

<br style=&quot;clear:both&quot;>
<div class = &quot;box BFC&quot;>
    <div class= &quot;floatL&quot;>float</div>
    <div class= &quot;floatL&quot;>float</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//html
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>= <span class="hljs-string">"floatL"</span>&gt;</span>float<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>= <span class="hljs-string">"floatL"</span>&gt;</span>float<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">br</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"clear:both"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"box BFC"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>= <span class="hljs-string">"floatL"</span>&gt;</span>float<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>= <span class="hljs-string">"floatL"</span>&gt;</span>float<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin: 0px;padding: 0px}
.floatL{
    float: left;
    width: 100px;
    height: 100px;
    background-color: red;
    text-align: center;
    line-height: 100px;
}
.box{
    border: 1px solid red;
    width: 300px;
    margin: 100px;
    padding: 20px;
}
.BFC{
    overflow: hidden;
    *zoom: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">*{<span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>}
<span class="hljs-selector-class">.floatL</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: red;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.BFC</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    *<span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760338" src="https://static.alili.tech/img/remote/1460000006760338" alt="bfc计算高度" title="bfc计算高度" style="cursor: pointer; display: inline;"></span></p>
<p>从运行结果可以看出，如果块级元素里面包含着浮动元素会发生高度塌陷，但是将它变成一个BFC后，BFC在计算高度时会自动将浮动元素计算在内。</p>
</li>
<li>
<p>BFC可以阻止元素被浮动元素覆盖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box1&quot;>box1</div>
<div class=&quot;box2&quot;>box2</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span>&gt;</span>box1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span>&gt;</span>box2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin: 0px; padding: 0px}

.box1{
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: rgba(0, 0, 255, 0.5);
    border: 1px solid #000;
    float: left;
}
.box2{
    width: 200px;
    height: 200px;
    line-height: 100px;
    text-align: center;
    background-color: rgba(255, 0, 0, 0.5);
    border: 1px solid #000;
    /* overflow: hidden; */
    /* *zoom: 1; */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">*{<span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>; <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>}

<span class="hljs-selector-class">.box1</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 255, 0.5);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.box2</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 0, 0, 0.5);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-comment">/* overflow: hidden; */</span>
    <span class="hljs-comment">/* *zoom: 1; */</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760339" src="https://static.alili.tech/img/remote/1460000006760339" alt="浮动元素重叠" title="浮动元素重叠" style="cursor: pointer;"></span></p>
<p>从上面看出，当元素浮动后，会与后面的块级元素产生相互覆盖。那怎么解决这个问题，只要为后面的元素创建一个BFC。添加<code>overflow</code>属性到<code>box2</code>上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow: hidden;
*zoom: 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">overflow</span>: <span class="hljs-selector-tag">hidden</span>;
*<span class="hljs-selector-tag">zoom</span>: 1;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760340" src="https://static.alili.tech/img/remote/1460000006760340" alt="bfc" title="bfc" style="cursor: pointer;"></span></p>
<p>这样子阻止了浮动元素重叠的问题。</p>
</li>
</ol>
<h3 id="articleHeader5">BFC与<code>hasLayout</code>
</h3>
<p>除了使用 <code>overflow: hidden</code> 触发 BFC 外，还使用了一个 <code>*zomm: 1</code> 的属性，这是 IEhack ，因为 IE6-7 并不支持 W3C 的 BFC ，而是使用私有属性 <code>hasLayout</code> 。从表现上来说，<code>hasLayout </code>跟 BFC 很相似，只是 <code>hasLayout</code> 自身存在很多问题，导致了 IE6-7 中一系列的 bug 。触发 hasLayout 的条件与触发 BFC 有些相似，推荐为元素设置 IE 特有的 CSS 属性 <code>zoom: 1</code> 触发 <code>hasLayout</code> ，<code>zoom</code> 用于设置或检索元素的缩放比例，值为“1”即使用元素的实际尺寸，使用 <code>zoom: 1</code> 既可以触发 hasLayout 又不会对元素造成其他影响，相对来说会更为方便。</p>
<p>拓展阅读：</p>
<p><a href="http://www.cnblogs.com/MockingBirdHome/p/3365346.html" rel="nofollow noreferrer" target="_blank">Block formatting context(块级格式化上下文)</a></p>
<p><a href="http://mp.weixin.qq.com/s?src=3&amp;timestamp=1470323942&amp;ver=1&amp;signature=Y72Cy9gjrTcOj6VGI7-BPdSdo5Zi6iSCYmISpw274JuHSaCizBF6Qik-sGs-dxvXrHGtLoaKnuIjjCGlp30YMWyYSq" rel="nofollow noreferrer" target="_blank">学习块格式化上下文</a></p>
<p><a href="http://www.cnblogs.com/pigtail/archive/2013/01/23/2871627.html" rel="nofollow noreferrer" target="_blank">BFC与hasLayout</a></p>
<h2 id="articleHeader6">清除浮动</h2>
<p>经典的清除浮动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//利用伪元素清除浮动
.clearfix:after {
     content:&quot;.&quot;; 
     display:block; 
     height:0; 
     visibility:hidden; 
     clear:both; 
}
.clearfix { 
    *zoom:1; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//利用伪元素清除浮动
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {
     <span class="hljs-attribute">content</span>:<span class="hljs-string">"."</span>; 
     <span class="hljs-attribute">display</span>:block; 
     <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>; 
     <span class="hljs-attribute">visibility</span>:hidden; 
     <span class="hljs-attribute">clear</span>:both; 
}
<span class="hljs-selector-class">.clearfix</span> { 
    *<span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>; 
}</code></pre>
<p>拓展阅读：<br><a href="http://www.cnblogs.com/lhb25/p/story-of-clear-float.html" rel="nofollow noreferrer" target="_blank">那些年一起清除过的浮动</a></p>
<h2 id="articleHeader7">认识圣杯布局和双飞翼布局</h2>
<p>各种各样的布局，无非就是用了浮动 float，负边距，相对定位，通过这三者的巧妙组合跟拼凑来实现的。用好这些，布局就会很简单。</p>
<p>还没学会布局时，就听到有圣杯布局和双飞翼布局，这布局都有这么风骚的名字，就觉得很酷，事实也如此，了解了圣杯布局和双飞翼布局，才发现挺深奥的。</p>
<p>传统的布局中，当我们需要改变两栏的互换，就会很麻烦。因为还要涉及到 HTML 代码的修改，不能完全从 CSS 上更改，这叫 HTML 和 CSS 的耦合。而圣杯布局跟双飞翼布局就是能够不考虑主体的位置，能够只通过 CSS 代码就改变相应的布局，这也是优点之一。</p>
<h3 id="articleHeader8">圣杯布局</h3>
<p>试试这样的HTML结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;header&quot;>header</div>
<div class=&quot;container&quot;>
    <div class=&quot;main&quot;>main</div>
    <div class=&quot;sub&quot;>sub</div>
    <div class=&quot;extra&quot;>extra</div>
</div>
<div class=&quot;footer&quot;>footer</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>header<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>sub<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra"</span>&gt;</span>extra<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>给它加上CSS样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{ margin: 0; padding: 0; font-size: 1.5em; font-weight: bold; min-width: 500px;}
.header,.footer{ text-align: center;}
.header{ height: 50px; background-color: #76ffff;}
.footer{ height: 50px; background-color: #ff7676;}
.main{ background-color: #666;}
.sub{ background-color: #44fa44;}
.extra{ background-color: #3dbdff;}
/*start*/
.main{
    width: 100%;
    float: left;
}
.sub{
    width: 100px;
    float: left;
    margin-left: -100%;
}
.extra{
    width: 200px;
    float: left;
    margin-left: -200px;
}
.container{
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>{ <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5em</span>; <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">min-width</span>: <span class="hljs-number">500px</span>;}
<span class="hljs-selector-class">.header</span>,<span class="hljs-selector-class">.footer</span>{ <span class="hljs-attribute">text-align</span>: center;}
<span class="hljs-selector-class">.header</span>{ <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#76ffff</span>;}
<span class="hljs-selector-class">.footer</span>{ <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff7676</span>;}
<span class="hljs-selector-class">.main</span>{ <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#666</span>;}
<span class="hljs-selector-class">.sub</span>{ <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#44fa44</span>;}
<span class="hljs-selector-class">.extra</span>{ <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3dbdff</span>;}
<span class="hljs-comment">/*start*/</span>
<span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.sub</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.extra</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>结果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000006760341" src="https://static.alili.tech/img/remote/1460000006760341" alt="011542497982872.png" title="011542497982872.png" style="cursor: pointer; display: inline;"></span></p>
<p>会发现，main的位置不正确，所以再给<code>container</code>加上 <code>padding: 0 200px 0 100px</code>;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760342" src="https://static.alili.tech/img/remote/1460000006760342" alt="011544456578941.png" title="011544456578941.png" style="cursor: pointer;"></span></p>
<p>虽然 main 的位置正确了，可是 sub 和 extra 位置优点不对，所以我们再用上相对定位，为 <code>sub</code> 和 <code>extra</code> 加上如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sub{
    position: relative;;
    left: -100px;
}
.extra{
    position: relative;
    right: -200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sub</span>{
    <span class="hljs-attribute">position</span>: relative;;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.extra</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">200px</span>;
}</code></pre>
<p>效果就出来了，<br><span class="img-wrap"><img data-src="/img/remote/1460000006760343" src="https://static.alili.tech/img/remote/1460000006760343" alt="011547019548969.png" title="011547019548969.png" style="cursor: pointer;"></span></p>
<p>噢耶，这就是圣杯布局。如果在圣杯布局的基础上，给它一个多余的标签，把 mian 包起来，这就是双飞翼布局。</p>
<h3 id="articleHeader9">双飞翼布局</h3>
<p>HTML结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;header&quot;>header</div>
<div class=&quot;container&quot;>
    <div class=&quot;main&quot;>
        <div class=&quot;main-wrap&quot;>main</div>
    </div>
    <div class=&quot;sub&quot;>sub</div>
    <div class=&quot;extra&quot;>extra</div>
</div>
<div class=&quot;footer&quot;>footer</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>header<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-wrap"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>sub<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra"</span>&gt;</span>extra<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{ margin: 0; padding: 0; font-size: 1.5em; font-weight: bold; min-width: 500px;}
.header,.footer{ text-align: center;}
.header{ height: 50px; background-color: #76ffff;}
.footer{ height: 50px; background-color: #ff7676;}
.main{ background-color: #666;}
.sub{ background-color: #44fa44;}
.extra{ background-color: #3dbdff;}
/*start*/
.main{
    width: 100%;
    height: 100px;
    float: left;
}
.sub{
    width: 100px;
    height: 100px;
    float: left;
    margin-left: -100%;
}
.extra{
    width: 200px;
    height: 100px;
    float: left;
    margin-left: -200px;
}
.main-wrap{
    margin: 0 200px 0 100px;
}
.container{
    height: 100px;
    overflow: hidden;
    *zoom: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>{ <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5em</span>; <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">min-width</span>: <span class="hljs-number">500px</span>;}
<span class="hljs-selector-class">.header</span>,<span class="hljs-selector-class">.footer</span>{ <span class="hljs-attribute">text-align</span>: center;}
<span class="hljs-selector-class">.header</span>{ <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#76ffff</span>;}
<span class="hljs-selector-class">.footer</span>{ <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff7676</span>;}
<span class="hljs-selector-class">.main</span>{ <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#666</span>;}
<span class="hljs-selector-class">.sub</span>{ <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#44fa44</span>;}
<span class="hljs-selector-class">.extra</span>{ <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3dbdff</span>;}
<span class="hljs-comment">/*start*/</span>
<span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.sub</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.extra</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.main-wrap</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">200px</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    *<span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>可以看到，只要为包住 main-wrap 设置 margin，连相对定位都没用到，效果就出来了。<br><span class="img-wrap"><img data-src="/img/remote/1460000006760344" src="https://static.alili.tech/img/remote/1460000006760344" alt="011558067042018.png" title="011558067042018.png" style="cursor: pointer;"></span></p>
<blockquote><p>如果把三栏布局比作一只大鸟，可以把main看成是鸟的身体，sub和extra则是鸟的翅膀。这个布局的实现思路是，先把最重要的身体部分放好，然后再将翅膀移动到适当的地方。因此请容许我给这个布局实现取名为双飞翼布局（Flying Swing Layout）.<br>就如上图中的鸟有各种姿势一样，利用双飞翼布局，我们也可以实现各种布局。这里有个尝试页面，利用双飞翼，实现了一套栅格化布局系统。</p></blockquote>
<p>优点：</p>
<ul>
<li><p>实现了内容与布局的分离，这是渐进式增强布局的思想，从内容出发，不考虑布局。</p></li>
<li><p>main部分是自适应宽度的，很容易在定宽布局和流体布局中切换。</p></li>
<li><p>任何一栏都可以是最高栏，不会出问题。</p></li>
<li><p>需要的hack非常少（就一个针对ie6的清除浮动hack:_zoom: 1;）<br>在浏览器上的兼容性非常好，IE5.5以上都支持。</p></li>
</ul>
<p>缺点：</p>
<ul><li><p>main需要一个额外的包裹层。</p></li></ul>
<h2 id="articleHeader10">normalize.css和reset.css</h2>
<p>normalize 的理念则是尽量保留浏览器的默认样式，不进行太多的重置。</p>
<p>reset 的目的，是将所有的浏览器的自带样式重置掉，这样更易于保持各浏览器渲染的一致性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,em,var,address,dfn{font-style:normal;}
[hidefocus],summary{outline:0;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
q:before,q:after{content:none;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,u,s,a,a:hover{text-decoration:none;}
body,textarea,input,button,select,keygen,legend{font:12px/1.14 arial,\5b8b\4f53;color:#333;outline:0;}
body{background:#fff;}
a,a:hover{color:#333;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* reset */</span>
<span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dt</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">blockquote</span>,<span class="hljs-selector-tag">pre</span>,<span class="hljs-selector-tag">hr</span>,<span class="hljs-selector-tag">figure</span>,<span class="hljs-selector-tag">table</span>,<span class="hljs-selector-tag">caption</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">legend</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">menu</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">header</span>,<span class="hljs-selector-tag">footer</span>,<span class="hljs-selector-tag">section</span>,<span class="hljs-selector-tag">article</span>,<span class="hljs-selector-tag">aside</span>,<span class="hljs-selector-tag">nav</span>,<span class="hljs-selector-tag">hgroup</span>,<span class="hljs-selector-tag">address</span>,<span class="hljs-selector-tag">figure</span>,<span class="hljs-selector-tag">figcaption</span>,<span class="hljs-selector-tag">menu</span>,<span class="hljs-selector-tag">details</span>{<span class="hljs-attribute">display</span>:block;}
<span class="hljs-selector-tag">table</span>{<span class="hljs-attribute">border-collapse</span>:collapse;<span class="hljs-attribute">border-spacing</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">caption</span>,<span class="hljs-selector-tag">th</span>{<span class="hljs-attribute">text-align</span>:left;<span class="hljs-attribute">font-weight</span>:normal;}
<span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">img</span>,<span class="hljs-selector-tag">iframe</span>,<span class="hljs-selector-tag">abbr</span>{<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">i</span>,<span class="hljs-selector-tag">cite</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">var</span>,<span class="hljs-selector-tag">address</span>,<span class="hljs-selector-tag">dfn</span>{<span class="hljs-attribute">font-style</span>:normal;}
<span class="hljs-selector-attr">[hidefocus]</span>,<span class="hljs-selector-tag">summary</span>{<span class="hljs-attribute">outline</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style</span>:none;}
<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">small</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>;}
<span class="hljs-selector-tag">sup</span>,<span class="hljs-selector-tag">sub</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">83%</span>;}
<span class="hljs-selector-tag">pre</span>,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">kbd</span>,<span class="hljs-selector-tag">samp</span>{<span class="hljs-attribute">font-family</span>:inherit;}
<span class="hljs-selector-tag">q</span><span class="hljs-selector-pseudo">:before</span>,<span class="hljs-selector-tag">q</span><span class="hljs-selector-pseudo">:after</span>{<span class="hljs-attribute">content</span>:none;}
<span class="hljs-selector-tag">textarea</span>{<span class="hljs-attribute">overflow</span>:auto;<span class="hljs-attribute">resize</span>:none;}
<span class="hljs-selector-tag">label</span>,<span class="hljs-selector-tag">summary</span>{<span class="hljs-attribute">cursor</span>:default;}
<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">button</span>{<span class="hljs-attribute">cursor</span>:pointer;}
<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">strong</span>,<span class="hljs-selector-tag">b</span>{<span class="hljs-attribute">font-weight</span>:bold;}
<span class="hljs-selector-tag">del</span>,<span class="hljs-selector-tag">ins</span>,<span class="hljs-selector-tag">u</span>,<span class="hljs-selector-tag">s</span>,<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{<span class="hljs-attribute">text-decoration</span>:none;}
<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">select</span>,<span class="hljs-selector-tag">keygen</span>,<span class="hljs-selector-tag">legend</span>{<span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span>/<span class="hljs-number">1.14</span> arial,\<span class="hljs-number">5</span>b8b\<span class="hljs-number">4</span>f53;<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;<span class="hljs-attribute">outline</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;}
<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;}</code></pre>
<p>以上reset来自<a href="http://nec.netease.com/framework/css-reset.html" rel="nofollow noreferrer" target="_blank">NEC</a>的css reset。</p>
<p>拓展阅读：<br><a href="https://segmentfault.com/q/1010000000117189">Normalize.css 和 Reset CSS 有什么本质区别？</a></p>
<h2 id="articleHeader11">IE条件注释</h2>
<p>IE条件注释是一种特殊的HTML注释，这种注释只有IE5.0及以上版本才能理解。比如普通的HTML注释是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--This is a comment-->
　　而只有IE可读的IE条件注释是：
<!--[if IE]> <![endif]-->
　　“非IE条件注释”：
<!--[if !IE]>--> non-IE HTML Code <!--<![endif]-->
　　“非特定版本IE条件注释”（很少用到）：
<!--[if ! lt IE 7]>
<![IGNORE[--><![IGNORE[]]>
Code for browsers that match the if condition
<!--<![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--This is a comment--&gt;</span>
　　而只有IE可读的IE条件注释是：
<span class="hljs-comment">&lt;!--[if IE]&gt; &lt;![endif]--&gt;</span>
　　“非IE条件注释”：
<span class="hljs-comment">&lt;!--[if !IE]&gt;--&gt;</span> non-IE HTML Code <span class="hljs-comment">&lt;!--&lt;![endif]--&gt;</span>
　　“非特定版本IE条件注释”（很少用到）：
<span class="hljs-comment">&lt;!--[if ! lt IE 7]&gt;
&lt;![IGNORE[--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">![IGNORE[]]</span>&gt;</span>
Code for browsers that match the if condition
<span class="hljs-comment">&lt;!--&lt;![endif]--&gt;</span></code></pre>
<p>简而言之，除了“Windows上的IE”之外的所有浏览器都会认为条件注释只是一段普通的HTML注释。你不能在CSS代码中使用条件注释。IE条件注释是很有用的对IE隐藏或者展现特定代码的方法，比起在CSS中用诡异的_/制造bug，利用IE条件注释来写CSS “hacks”是更合理的方法。通俗点，条件注释就是一些if判断，但这些判断不是在脚本里执行的，而是直接在html代码里执行的。</p>
<ol>
<li><p>条件注释的基本结构和HTML的注释(&lt;!– –&gt;)是一样的。因此IE以外的浏览器将会把它们看作是普通的注释而完全忽略它们。</p></li>
<li><p>IE将会根据if条件来判断是否如解析普通的页面内容一样解析条件注释里的内容。</p></li>
<li><p>条件注释使用的是HTML的注释结构，因此他们只能使用在HTML文件里，而不能在CSS文件中使用。</p></li>
</ol>
<p>从语法上看这是相当合法的普通HTML注释。任何浏览器都会认为&lt;!–和–&gt;之间的部分是注释从而忽略它。但是IE也会看到其中[if IE]&gt;，从而开始解释接下来的代码直到遇到&lt;![endif]。所以，下面这些代码不会显示在任何其他浏览器中面。</p>
<p>通过“比较操作符”可以更灵活地对IE版本进行控制，用法是在IE前面加上“比较操作符”。合法的操作符如下：</p>
<ul>
<li><p>lte：就是Less than or equal to的简写，也就是小于或等于的意思。</p></li>
<li><p>lt ：就是Less than的简写，也就是小于的意思。</p></li>
<li><p>gte：就是Greater than or equal to的简写，也就是大于或等于的意思。</p></li>
<li><p>gt ：就是Greater than的简写，也就是大于的意思。</p></li>
<li><p>! ：就是不等于的意思，跟javascript里的不等于判断符相同</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!–[if gt IE 5.5]> / 如果IE版本大于5.5 /
<!–[if lte IE 6]> / 如果IE版本小于等于6 /
<!–[if !IE]> / 如果浏览器不是IE /" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">!–[if</span> <span class="hljs-attr">gt</span> <span class="hljs-attr">IE</span> <span class="hljs-attr">5.5</span>]&gt;</span> / 如果IE版本大于5.5 /
<span class="hljs-tag">&lt;<span class="hljs-name">!–[if</span> <span class="hljs-attr">lte</span> <span class="hljs-attr">IE</span> <span class="hljs-attr">6</span>]&gt;</span> / 如果IE版本小于等于6 /
<span class="hljs-tag">&lt;<span class="hljs-name">!–[if</span> !<span class="hljs-attr">IE</span>]&gt;</span> / 如果浏览器不是IE /</code></pre>
<p>常用的IE条件注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--[if !IE]>除IE外都可识别<![endif]-->
<!--[if IE]> 所有的IE可识别 <![endif]-->
<!--[if IE 5.0]> 只有IE5.0可以识别 <![endif]-->
<!--[if IE 5]> 仅IE5.0与IE5.5可以识别 <![endif]-->
<!--[if gt IE 5.0]> IE5.0以及IE5.0以上版本都可以识别 <![endif]-->
<!--[if IE 6]> 仅IE6可识别 <![endif]-->
<!--[if lt IE 6]> IE6以及IE6以下版本可识别 <![endif]-->
<!--[if gte IE 6]> IE6以及IE6以上版本可识别 <![endif]-->
<!--[if IE 7]> 仅IE7可识别 <![endif]-->
<!--[if lt IE 7]> IE7以及IE7以下版本可识别 <![endif]-->
<!--[if gte IE 7]> IE7以及IE7以上版本可识别 <![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--[if !IE]&gt;除IE外都可识别&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE]&gt; 所有的IE可识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 5.0]&gt; 只有IE5.0可以识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 5]&gt; 仅IE5.0与IE5.5可以识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if gt IE 5.0]&gt; IE5.0以及IE5.0以上版本都可以识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 6]&gt; 仅IE6可识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if lt IE 6]&gt; IE6以及IE6以下版本可识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if gte IE 6]&gt; IE6以及IE6以上版本可识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 7]&gt; 仅IE7可识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if lt IE 7]&gt; IE7以及IE7以下版本可识别 &lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if gte IE 7]&gt; IE7以及IE7以上版本可识别 &lt;![endif]--&gt;</span></code></pre>
<h2 id="articleHeader12">水平垂直居中的各种方案</h2>
<h3 id="articleHeader13">行内元素的水平居中</h3>
<p>要实现行内元素的水平居中,只需把行内元素包裹在块级父层元(<code>&lt;div&gt;、&lt;li&gt;、&lt;p&gt;</code>等)中，并且在父层元素CSS设置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  text-align: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/xOoZxK" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/xOoZxK" data-typeid="3">点击预览</button><br><span class="img-wrap"><img data-src="/img/remote/1460000006760345" src="https://static.alili.tech/img/remote/1460000006760345" alt="居中2.png" title="居中2.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">块状元素的水平居中</h3>
<p>要实现块状元素（display:block）的水平居中，我们只需要将它的左右外边距margin-left和margin-right设置为auto，即可实现块状元素的居中，要水平居中的块状元素CSS设置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/XKLGwG" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/XKLGwG" data-typeid="3">点击预览</button><br><span class="img-wrap"><img data-src="/img/remote/1460000006760346" src="https://static.alili.tech/img/remote/1460000006760346" alt="居中1.png" title="居中1.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">已知高度宽度元素的水平垂直居中</h3>
<h4>1. 利用绝对定位与负边距实现。</h4>
<p>利用绝对定位，将元素的top和left属性都设为50%，再利用margin边距，将元素回拉它本身高宽的一半，实现垂直居中。核心CSS代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    position: relative;
}
.center{
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px 0 0 -50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin</span>: -<span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">50px</span>;
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/ZOdkGP" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/ZOdkGP" data-typeid="3">点击预览</button></p>
<h4>2. 利用绝对定位和margin</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  position: relative;
}
.center{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.center</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: auto;
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/NAkmxY" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/NAkmxY" data-typeid="3">点击预览</button></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760347" src="https://static.alili.tech/img/remote/1460000006760347" alt="居中3.png" title="居中3.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">未知高度和宽度元素的水平垂直居中</h3>
<h4>1. 被居中的元素是<code>inline</code>或者<code>inline-block</code>元素</h4>
<p>可以巧妙的将父级容器设置为<code>display:table-cell</code>，配合<code>text-align:center</code>和<code>vertical-align:middle</code>即可以实现水平垂直居中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  width: 600px;
  height: 600px;
  background: #eee;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.center{
  background: blue; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.center</span>{
  <span class="hljs-attribute">background</span>: blue; 
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/QEXPNx?editors=1100" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/QEXPNx" data-typeid="3">点击预览</button></p>
<h4>2. 利用CSS3的transform的属性</h4>
<p>利用C3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  width: 100%;
  height: 400px;
  background: #eee;
  position: relative;
}
.center{
  background: blue;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.center</span>{
  <span class="hljs-attribute">background</span>: blue;
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/mEkgAm?editors=0100" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/mEkgAm" data-typeid="3">点击预览</button></p>
<h4>3. flex布局</h4>
<p>使用flex布局，无需绝对定位等改变布局的操作，可以轻松实现元素的水平垂直居中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  width: 100%;
  height: 400px;
  background: #eee;
  /* flex 布局解决水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.center{
  width: 100px;
  height: 100px;
  background: blue;
  text-align: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-comment">/* flex 布局解决水平居中 */</span>
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
}
<span class="hljs-selector-class">.center</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: blue;
  <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<p><a href="http://codepen.io/allinlin/pen/vKqryg?editors=1100" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="allinlin/pen/vKqryg" data-typeid="3">点击预览</button><br><span class="img-wrap"><img data-src="/img/remote/1460000006760348" src="https://static.alili.tech/img/remote/1460000006760348" alt="居中4.png" title="居中4.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
notes：CSS3的transform和flex有兼容性问题。ie11+才支持flexbox布局。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>
notes：CSS3的<span class="hljs-attribute">transform</span>和<span class="hljs-attribute">flex</span>有兼容性问题。ie11+才支持flexbox布局。</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS查漏补缺

## 原文链接
[https://segmentfault.com/a/1190000006242814](https://segmentfault.com/a/1190000006242814)


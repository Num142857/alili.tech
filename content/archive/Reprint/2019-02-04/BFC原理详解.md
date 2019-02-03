---
title: 'BFC原理详解' 
date: 2019-02-04 2:30:58
hidden: true
slug: pekr43ipge
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一.BFC是什么</h2>
<p>在解释 BFC 是什么之前，需要先介绍 Box、Formatting Context的概念。</p>
<h3 id="articleHeader1">1.BOX：CSS布局的基本单位</h3>
<p><code>Box</code>是<code>CSS</code>布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 <code>Box</code> 组成的。元素的类型和 <code>display</code> 属性，决定了这个 <code>Box</code> 的类型。 不同类型的 <code>Box</code>， 会参与不同的 <strong>Formatting Context</strong>（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：</p>
<ul>
<li><p>block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；</p></li>
<li><p>inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；</p></li>
<li><p>run-in box: css3 中才有， 这儿先不讲了。</p></li>
</ul>
<p><strong>注：</strong>这里补充一些block-level box一些知识</p>
<h4>1.1 block-level box</h4>
<ul><li><p>w3.org中对块级元素的定义</p></li></ul>
<blockquote><p>Block-level elements are those elements of the source document that are formatted visually as blocks (e.g., paragraphs). The following values of the ‘display’ property make an element block-level: ‘block’, ‘list-item’, and ‘table’.</p></blockquote>
<p>大意：块级元素是那种源文档被格式化为可视块了的元素，然后使这个元素变成块级元素的display属性取值如下： ‘block’, ‘list-item’, 和 ‘table’。</p>
<blockquote><p>Block-level boxes are boxes that participate in a block formatting context. Each block-level element generates a principal block-level box that contains descendant boxes and generated content and is also the box involved in any positioning scheme</p></blockquote>
<p>大意：块级盒block-level box是这种参与了块级排版上下文的一种盒子，每个块级元素都生成了一个包含后代盒子和生成的内容的主要块级盒，并且这个盒子参与了任何定位的计算</p>
<ul><li><p>block-level box 盒模型</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVCruR" src="https://static.alili.tech/img/bVCruR" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVCruS" src="https://static.alili.tech/img/bVCruS" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul><li><p>block-level box特性</p></li></ul>
<blockquote>
<p>块状元素排斥其他元素与其位于同一行，可以设定元素的宽（width）和高（height），块级元素一般是其他元素的容器，可容纳块级元素和行内元素。</p>
<p>块状元素具有流体特性，即：在默认情况下（非浮动、绝对定位等），水平方向会自动填满外部的容器</p>
</blockquote>
<h3 id="articleHeader2">2.Formatting context</h3>
<p>Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。<br>CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。</p>
<h3 id="articleHeader3">3.BFC定义</h3>
<p>BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。</p>
<blockquote>
<p>解释：</p>
<blockquote>
<p>BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个BFC就是一个独立的行政单位的意思。也可以说BFC就是一个作用范围。可以把它理解成是一个独立的容器，并且这个容器的里box的布局，与这个容器外的毫不相干。</p>
<p>另一个通俗点的解释是：在普通流中的 Box(框) 属于一种 formatting context(格式化上下文) ，类型可以是 block ，或者是 inline ，但不能同时属于这两者。并且， Block boxes(块框) 在 block formatting context(块格式化上下文) 里格式化， Inline boxes(块内框) 则在 inline formatting context(行内格式化上下文) 里格式化。任何被渲染的元素都属于一个 box ，并且不是 block ，就是 inline 。即使是未被任何元素包裹的文本，根据不同的情况，也会属于匿名的 block boxes 或者 inline boxes。所以上面的描述，即是把所有的元素划分到对应的 formatting context 里。</p>
</blockquote>
</blockquote>
<p>canvas会设立一个BFC，这也是最外层的formatting context了，问题的复杂性在于有些块级盒内部也可以产生BFC（至少它必须也能包含块级盒），于是说BFC是可以嵌套。不是所有块级盒内部都可以产生BFC，比如说要是这盒里面连块级盒都没有，都是行内盒那就产生IFC。不过，只要它的子节点里面有一个块级盒，它就产生BFC，那些行内元素，会自动套一个匿名的块级行盒。</p>
<h3 id="articleHeader4">4.BFC的布局规则</h3>
<ul>
<li><p>内部的Box会在垂直方向，一个接一个地放置</p></li>
<li><p>Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠</p></li>
<li><p>每个元素的margin-box的左边， 与包含块border-box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。</p></li>
<li><p>BFC的区域不会与float box重叠。</p></li>
</ul>
<blockquote>
<p>关于这条规则的几点说明：</p>
<blockquote><p>当容器有足够的剩余空间容纳 BFC 的宽度时，所有浏览器都会将 BFC 放置在浮动元素所在行的剩余空间内。 <br>当 BFC 的宽度大于容器剩余宽度时，最新版本的浏览中只有firefox会在同一行显示，其它浏览器均换行。</p></blockquote>
</blockquote>
<ul>
<li><p>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。</p></li>
<li><p>计算BFC的高度时，浮动元素也参与计算</p></li>
</ul>
<h2 id="articleHeader5">二.哪些元素会生成BFC</h2>
<ul>
<li><p>根元素</p></li>
<li><p>float属性不为none</p></li>
<li><p>position为absolute或fixed</p></li>
<li><p>display为inline-block, table-cell, table-caption, flex, inline-flex</p></li>
<li><p>overflow不为visible</p></li>
</ul>
<blockquote>
<p>关于overflow:visible：</p>
<blockquote><p>overflow:visible的块盒就不产生BFC，不但不产生BFC，啥FC都不产生，它的子元素直接搞进自己外层的BFC鸟：：<br>overflow:visible这个限制只对所谓的块盒（既包含块级盒、自己又是块级盒）存在，有些盒内部也能包含块级元素，但是它本身又不是块级元素（比如display为table-cell、inline-block、或者盒本身是flex item等），因为外面不是BFC，所以它们不论如何一定会给包含的块级盒创建一个新的BFC出来。</p></blockquote>
<p>关于浮动：</p>
<blockquote><p>浮动是个行级的行为，当遇到浮动元素的时候，会首先"假装"它是个行内元素进行排版，排好后就往浮动的方向挤到挤不过去为止（遇到边界或者其它浮动元素）。<br>某一方向有clear的时候，浮动元素总是挤到边界，在垂直方向上的行为类似"换行"。<br>排好一个浮动元素之后，这一行就要重排一次。所以说浮动元素会造成行级的reflow。重排的时候，行盒会躲开浮动元素。之后的块级盒（不论是行盒还是其它盒）也都会躲开浮动元素排布。</p></blockquote>
</blockquote>
<h2 id="articleHeader6">三.BFC的作用及原理</h2>
<h3 id="articleHeader7">1.自适应的两栏布局</h3>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    body {
        width: 300px;
        position: relative;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
    .main {
        height: 200px;
        background: #fcc;
    }
</style>
<body>
    <div class=&quot;aside&quot;></div>
    <div class=&quot;main&quot;></div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.aside</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f66</span>;
    }
    <span class="hljs-selector-class">.main</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"aside"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>页面：<br><span class="img-wrap"><img data-src="/img/bVCroJ" src="https://static.alili.tech/img/bVCroJ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>根据BFC布局规则第3条：</p>
<blockquote><p>每个元素的<em>margin-box</em>的左边， 与包含块<em>border-box</em>的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。</p></blockquote>
</blockquote>
<p>因此，虽然存在浮动的元素aslide，但main的左边依然会与包含块的左边相接触。</p>
<blockquote>
<p>根据BFC布局规则第四条：</p>
<blockquote><p>BFC的区域不会与float box重叠。</p></blockquote>
</blockquote>
<p>我们可以通过通过触发main生成BFC， 来实现自适应两栏布局。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.main {
    overflow: hidden;
}</code></pre>
<p>当触发main生成BFC后，这个新的BFC不会与浮动的aside重叠。因此会根据包含块的宽度，和aside的宽度，自动变窄。效果如下：</p>
<p>页面：<br><span class="img-wrap"><img data-src="/img/bVCrpp" src="https://static.alili.tech/img/bVCrpp" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>对比</strong>： 实现布局的另一种方式利用块状元素流体特性实现的自适应布局</p>
<blockquote>
<p>利用块状元素流体特性实现的自适应布局</p>
<blockquote>
<p>常用方法：浮动或者定位+margin撑开</p>
<p>不足之处：我们需要知道浮动或绝对定位内容的尺寸。然后，流体内容才能有对应的margin或padding或border值进行位置修正。</p>
</blockquote>
</blockquote>
<h3 id="articleHeader8">2.清除内部浮动</h3>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class=&quot;par&quot;>
        <div class=&quot;child&quot;></div>
        <div class=&quot;child&quot;></div>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.par</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-number">#fcc</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    }
 
    <span class="hljs-selector-class">.child</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-number">#f66</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">float</span>: left;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"par"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>页面：<br><span class="img-wrap"><img data-src="/img/bVCrpI" src="https://static.alili.tech/img/bVCrpI" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>根据BFC布局规则第六条：</p>
<blockquote><p>计算BFC的高度时，浮动元素也参与计算</p></blockquote>
</blockquote>
<p>为达到清除内部浮动，我们可以触发par生成BFC，那么par在计算高度时，par内部的浮动元素child也会参与计算。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".par {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.par</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bVCrti" src="https://static.alili.tech/img/bVCrti" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">3.防止margin重叠</h3>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <p>Hehe</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">p</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#f55</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-align</span>:center;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Haha<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hehe<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>页面：<br><span class="img-wrap"><img data-src="/img/bVCrtr" src="https://static.alili.tech/img/bVCrtr" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>两个p之间的距离为100px，发送了margin重叠。</p>
<blockquote>
<p>根据BFC布局规则第二条：</p>
<blockquote><p>Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠</p></blockquote>
</blockquote>
<p>我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。</p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .wrap {
        overflow: hidden;
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <div class=&quot;wrap&quot;>
        <p>Hehe</p>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.wrap</span> {
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-tag">p</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#f55</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-align</span>:center;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Haha<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hehe<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>效果如下:<br><span class="img-wrap"><img data-src="/img/bVCrtJ" src="https://static.alili.tech/img/bVCrtJ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">4.总结</h3>
<blockquote>
<p>以上的几个例子都体现了BFC布局规则第五条：</p>
<blockquote><p>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。</p></blockquote>
</blockquote>
<p>因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。</p>
<h2 id="articleHeader11">参考</h2>
<p>1.<a href="http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html" rel="nofollow noreferrer" target="_blank">前端精选文摘：BFC 神奇背后的原理</a><br>2.<a href="http://sentsin.com/web/529.html" rel="nofollow noreferrer" target="_blank">CSS之BFC详解</a><br>3.<a href="http://blog.sina.com.cn/s/blog_877284510101jo5d.html" rel="nofollow noreferrer" target="_blank">BFC 、IFC</a><br>4.<a href="http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/" rel="nofollow noreferrer" target="_blank">CSS深入理解流体特性和BFC特性下多栏自适应布局</a><br>5.<a href="http://www.cnblogs.com/winter-cn/archive/2013/05/11/3072929.html" rel="nofollow noreferrer" target="_blank">CSS布局</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
BFC原理详解

## 原文链接
[https://segmentfault.com/a/1190000006740129](https://segmentfault.com/a/1190000006740129)


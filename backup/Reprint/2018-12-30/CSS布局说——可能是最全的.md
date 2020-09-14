---
title: 'CSS布局说——可能是最全的' 
date: 2018-12-30 2:30:10
hidden: true
slug: b7he5kpyeq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<blockquote><p>现在，我们被称为前端工程师。然而，早年给我们的称呼却是页面仔。或许是职责越来越大，整体的前端井喷式的发展，使我们只关注了js，而疏远了css和html。</p></blockquote>
<p>其实，我们可能经常在聊组件化，咋地咋地。但是，回过头来思考一下，如果你看到一张设计稿的时候，连布局都不清不楚，谈何组件化呢。所以，我们需要在分清楚组件之前，先来分清楚布局。废话说了这么多，只是想告诉你，布局这个东西真的很重要。本篇内容概括了布局的基础+基本的PC端布局+移动端适配等内容。如果你喜欢我的文章，欢迎评论，欢迎Star~。欢迎关注我的<a href="https://github.com/laizimo/zimo-article" rel="nofollow noreferrer" target="_blank">github博客</a></p>
<h1 id="articleHeader1">正文</h1>
<p>或许对于你来说，喜欢js的背后，是看不懂css的深层。入门级的css非常简单，但是，精通它却没有想象的容易。我们本篇聊的是布局。前端开发，从拿到设计稿的那一刻，布局的思考就已经开始了。</p>
<blockquote><p>举个例子，建筑师在设计房屋的时候，需要丈量开发地块的长度，以及每幢房屋相对于其他房屋的位置。</p></blockquote>
<p>在css布局中，似乎也是这样开始的。我们也会去区分每个元素的尺寸和定位，力争完美的实现整个设计稿。所以，我们的布局应该从定位和尺寸开始聊起</p>
<h2 id="articleHeader2">定位</h2>
<p>定位的概念就是它允许你定义一个元素相对于其他正常元素的位置，它应该出现在哪里，这里的其他元素可以是父元素，另一个元素甚至是浏览器窗口本身。还有就是浮动了，其实浮动并不完全算是定位，它的特性非常的神奇，以至于它在布局中被人广泛的应用。我们会在后文中专门提及它的。</p>
<p>谈及定位，我们就得从position属性说起。你能准确的说出position的属性值吗？相信你可以完美地说出这么六个属性值：static、relative、absolute、fixed、sticky和inherit。</p>
<ul>
<li>static(默认)：元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分；行内元素则会创建一个或多个行框，置于其父元素中。</li>
<li>relative：元素框相对于之前正常文档流中的位置发生偏移，并且原先的位置仍然被占据。发生偏移的时候，可能会覆盖其他元素。</li>
<li>absolute：元素框不再占有文档流位置，并且相对于包含块进行偏移(所谓的包含块就是最近一级外层元素position不为static的元素)</li>
<li>fixed：元素框不再占有文档流位置，并且相对于视窗进行定位</li>
<li>sticky：(这是css3新增的属性值)粘性定位，官方的介绍比较简单，或许你不能理解。其实，它就相当于relative和fixed混合。最初会被当作是relative，相对于原来的位置进行偏移；一旦超过一定阈值之后，会被当成fixed定位，相对于视口进行定位。<a href="https://jsbin.com/moxetad/edit?html,css,output" rel="nofollow noreferrer" target="_blank">demo地址</a>
</li>
</ul>
<p>简单地，介绍一下position的属性值的含义后，在来看一下偏移量top、right、bottom、left四个属性。</p>
<p>不清楚，当初在初学css的时候，会不会与margin这个属性混淆？其实，它们之间是很容易去辨识地。因为这四个属性值，其实是，定位时的偏移量。偏移量不会对static的元素起到作用。而margin，相对应的是盒子模型的外边距，它会对每个元素框起到作用，使得元素框与其他元素之间产生空白。</p>
<p>下面：我们来看一下一些常用定位的偏移</p>
<ul><li>relative：它的偏移是相对于原先在文档流中的位置，如图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358512?w=208&amp;h=216" src="https://static.alili.tech/img/remote/1460000011358512?w=208&amp;h=216" alt="relative" title="relative" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000011358513?w=218&amp;h=217" src="https://static.alili.tech/img/remote/1460000011358513?w=218&amp;h=217" alt="relative-offset" title="relative-offset" style="cursor: pointer;"></span></p>
<blockquote><p>这里设置了top：100px，left：100px。</p></blockquote>
<ul>
<li>absolute：它的偏移量是相对于最近一级position不是static的祖先元素的</li>
<li>fixed：它的偏移量是相对于视口的。</li>
</ul>
<p>其实，这里说描述的内容，应该都是需要理解的。这些相对于布局来说是基础的，同时也是非常重要的。需要注意的是，这里的偏移量其实已经涉及到了接下来要说的尺寸。在做自适应布局设计时，往往希望这些偏移量的单位能够使用百分比，或者相对的单位例如rem等。</p>
<h2 id="articleHeader3">尺寸</h2>
<p>那之前上面谈到过尺寸的单位——百分比。那么，下面部分我们就围绕着尺寸单位展开。</p>
<p>尺寸，我们就应该从单位聊起，对于px这个单位，做网页的应该在熟悉不过了，因此不多做介绍。</p>
<p>那么，我们可以来介绍一下下面几个单位：</p>
<ul>
<li>百分比：百分比的参照物是父元素，50%相当于父元素width的50%</li>
<li>rem：这个对于复杂的设计图相当有用，它是html的font-size的大小</li>
<li>em：它虽然也是一个相对的单位，相对于父元素的font-size，但是，并不常用，主要是计算太麻烦了。</li>
</ul>
<p>单位只是一个来定义元素大小的相应参考。另一个概念，或许可以用房子来打一个比方，在早年每幢房子都会在房子的外围建一层栅栏，使得整一块地区可以看成房子+内部地块+栅栏+外围地块的模型。而在css中，每个元素也会有<strong>盒子模型</strong>的概念。</p>
<p><strong>盒子模型</strong>：每个元素，都会形成一个矩形块，主要包括四部分：margin(外边距)+border(边框)+padding(内边距)+content(内容)</p>
<p>css中存在两种不同的盒子模型，可以通过box-sizing设置不同的模型。两种盒子模型，主要是width的宽度不同。如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358514" src="https://static.alili.tech/img/remote/1460000011358514" alt="content-box" title="content-box" style="cursor: pointer;"></span></p>
<p>这是标准盒子模型，可以看到width的长度等于content的宽度；而当将box-sizing的属性值设置成border-box时，盒子模型的width=border+padding+content的总和。</p>
<p>可以看出，对于不同的模型的宽度是不同的。宽度默认的属性值是auto，这个属性值会使得内部元素的长度自动填充满父元素的width。如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358515?w=454&amp;h=222" src="https://static.alili.tech/img/remote/1460000011358515?w=454&amp;h=222" alt="width-auto" title="width-auto" style="cursor: pointer;"></span></p>
<p>但是，height的属性值也是默认的auto，为什么没有像width一样呢？</p>
<p>其实，auto这个属性值表示的是浏览器自动计算。这种自动计算，需要一个基准，一般浏览器都是允许高度滚动的，所以，会导致一个问题——浏览器找不到垂直方向上的基准。</p>
<p>同样地道理也会被应用在margin属性上。相信如果考察居中时，水平居中你可能闭着眼睛都能写出来，但是垂直居中却绕着脑袋想。这是因为如果是块级元素水平居中只要将水平方向上的margin设置成auto就可以了。但是，垂直方向上却没有这么简单，因为你设置成auto时，margin为0。这个问题，还是需要仔细思考一下的。</p>
<p>到此为止，布局最基本的部分我们已经将去大半，还有就是一块浮动。</p>
<h2 id="articleHeader4">浮动</h2>
<p>浮动，这是一个非常有意思的东西，在布局中被广泛的应用。最初，设计浮动时，其实并不是为了布局的，而是为了实现文字环绕的特效，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358516?w=206&amp;h=214" src="https://static.alili.tech/img/remote/1460000011358516?w=206&amp;h=214" alt="float" title="float" style="cursor: pointer;"></span></p>
<p>但是，浮动并不是仅仅这样而已。何为浮动？浮动应该说是‘自成一派’，类似于ps中的图层一样，浮动的元素会在浮动层上面进行排布，而在原先文档流中的元素位置，会被以某种方式进行删除，但是还是会影响布局。你可能会觉得有疑问，什么叫影响布局？我们可以来举个例子：</p>
<p>首先，我们准备两个颜色块，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358517?w=128&amp;h=420" src="https://static.alili.tech/img/remote/1460000011358517?w=128&amp;h=420" alt="浮动前" title="浮动前" style="cursor: pointer;"></span></p>
<p>之后我们将left的块设置成左浮动，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358518?w=112&amp;h=252" src="https://static.alili.tech/img/remote/1460000011358518?w=112&amp;h=252" alt="浮动后" title="浮动后" style="cursor: pointer;"></span></p>
<p>可以，发现虽然left块因为左浮动，而使得原先元素在文档流中占有的位置被删除，但是，当right块补上原先的位置时，right块中的字体却被挤出来了。这就是所谓的影响布局。</p>
<p>浮动为什么会被使用在布局中呢？因为设置浮动后的元素会形成BFC（使得内部的元素不会被外部所干扰），并且元素的宽度也不再自适应父元素宽度，而是适应自身内容。这样就可以，轻松地实现多栏布局的效果。</p>
<p>浮动的内容还需要介绍一块——清除浮动。可以看到，浮动元素，其实对于布局来说，是特别危险的。因为你可能这一块做过浮动，但未做清除，那么造成高度塌陷的问题。就是上面图示的那种情况。</p>
<p><strong>清除浮动</strong>，最常用的方法有两种:</p>
<ul>
<li>overflow: 将父元素的overflow，设置成hidden。</li>
<li>after伪类：对子元素的after伪类进行设置。</li>
</ul>
<p>这里只是稍微的提上一嘴。下面我们正式来介绍一下网页的布局，本篇最核心的东西。</p>
<h2 id="articleHeader5">最初的布局——table</h2>
<p>最初的时候，网页简单到可能只有文字和链接。这时候，大家最常用的就是table。因为table可以展示出多个块的排布。</p>
<p>这种布局现在应该不常用了，因为在形色单一时，使用起来方便。但是，现在的网页变得越来越复杂，适配的问题也是越来越多，这种布局已经不再时候了。</p>
<p>主要是div块的出现，可以使得网页进行灵活的排布，使得网页变得繁荣。这时，开发者也开始思索如何去更加清晰地分辨网页的层次。接下来，我们可以看看有哪些比较出名的布局方式。</p>
<h2 id="articleHeader6">两栏布局</h2>
<p>是否记得，那些一边主体内容，一边目录的网页，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358519?w=1918&amp;h=1006" src="https://static.alili.tech/img/remote/1460000011358519?w=1918&amp;h=1006" alt="两栏布局" title="两栏布局" style="cursor: pointer;"></span></p>
<p>类似于上图的布局，可以定义为<strong>两栏布局</strong>。</p>
<p><strong>两栏布局：</strong>一栏定宽，一栏自适应。这样子做的好处是定宽的那一栏可以做广告，自适应的可以作为内容主体。</p>
<p><strong>实现的方式：</strong></p>
<ol><li>float + margin：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div class=&quot;left&quot;>定宽</div>
  <div class=&quot;right&quot;>自适应</div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>定宽<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
  width: 200px;
  height: 600px;
  background: red;
  float: left;
  display: table;
  text-align: center;
  line-height: 600px;
  color: #fff;
}

.right{
  margin-left: 210px;
  height: 600px;
  background: yellow;
  text-align: center;
  line-height: 600px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">background</span>: red;
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}

<span class="hljs-selector-class">.right</span>{
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">210px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">background</span>: yellow;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">600px</span>;
}</code></pre>
<p>如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358520?w=956&amp;h=615" src="https://static.alili.tech/img/remote/1460000011358520?w=956&amp;h=615" alt="两栏布局" title="两栏布局" style="cursor: pointer;"></span></p>
<p>其他的方法：还可以使用position的absolute，可以使用同样的效果</p>
<h2 id="articleHeader7">三栏布局</h2>
<p>三栏布局，也是经常会被使用到的一种布局。</p>
<p>它的特点：两边定宽，然后中间的width是auto的，可以自适应内容，再加上margin边距，来进行设定。</p>
<p>三栏布局可以有4种实现方式，每种实现方式都有各自的优缺点。</p>
<p><strong>1.使用左右两栏使用float属性，中间栏使用margin属性进行撑开，注意的是html的结果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;left&quot;>左栏</div>
<div class=&quot;right&quot;>右栏</div>
<div class=&quot;middle&quot;>中间栏</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>左栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>右栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"middle"</span>&gt;</span>中间栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
  width: 200px;height: 300px; background: yellow; float: left;    
}
.right{
  width: 150px; height: 300px; background: green; float: right;
}
.middle{
  height: 300px; background: red; margin-left: 220px; margin-right: 160px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>; <span class="hljs-attribute">background</span>: yellow; <span class="hljs-attribute">float</span>: left;    
}
<span class="hljs-selector-class">.right</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>; <span class="hljs-attribute">background</span>: green; <span class="hljs-attribute">float</span>: right;
}
<span class="hljs-selector-class">.middle</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>; <span class="hljs-attribute">background</span>: red; <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">220px</span>; <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">160px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358521?w=452&amp;h=215" src="https://static.alili.tech/img/remote/1460000011358521?w=452&amp;h=215" alt="first" title="first" style="cursor: pointer;"></span></p>
<blockquote><p>缺点是：1. 当宽度小于左右两边宽度之和时，右侧栏会被挤下去；2. html的结构不正确</p></blockquote>
<p><strong>2. 使用position定位实现，即左右两栏使用position进行定位，中间栏使用margin进行定位</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;left&quot;>左栏</div>
<div class=&quot;middle&quot;>中间栏</div>
<div class=&quot;right&quot;>右栏</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>左栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"middle"</span>&gt;</span>中间栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>右栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
    background: yellow;
    width: 200px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
}
.middle{
    height: 300px;
    margin: 0 220px;
    background: red;
}
.right{
    height: 300px;
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    background: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">background</span>: yellow;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.middle</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">220px</span>;
    <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: green;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358522?w=457&amp;h=217" src="https://static.alili.tech/img/remote/1460000011358522?w=457&amp;h=217" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote>
<p>好处是：html结构正常。</p>
<p>缺点时：当父元素有内外边距时，会导致中间栏的位置出现偏差</p>
</blockquote>
<p><strong>3. 使用float和BFC配合圣杯布局</strong></p>
<p>将middle的宽度设置为100%，然后将其float设置为left，其中的main块设置margin属性，然后左边栏设置float为left，之后设置margin为-100%，右栏也设置为float：left，之后margin-left为自身大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
    <div class=&quot;middle&quot;>
        <div class=&quot;main&quot;>中间</div>
    </div>
    <div class=&quot;left&quot;>
        左栏
    </div>
    <div class=&quot;right&quot;>
        右栏
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"middle"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>中间<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        左栏
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        右栏
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper{
    overflow: hidden;  //清除浮动
}
.middle{
    width: 100%;
    float: left;
}
.middle .main{
    margin: 0 220px;
    background: red;
}
.left{
    width: 200px;
    height: 300px;
    float: left;
    background: green;
    margin-left: -100%;
}
.right{
    width: 200px;
    height: 300px;
    float: left;
    background: yellow;
    margin-left: -200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span>{
    <span class="hljs-attribute">overflow</span>: hidden;  //清除浮动
}
<span class="hljs-selector-class">.middle</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.middle</span> <span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">220px</span>;
    <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">background</span>: green;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">background</span>: yellow;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358523?w=454&amp;h=212" src="https://static.alili.tech/img/remote/1460000011358523?w=454&amp;h=212" alt="bf-layout" title="bf-layout" style="cursor: pointer;"></span></p>
<blockquote><p>缺点是：1. 结构不正确 2. 多了一层标签</p></blockquote>
<p><strong>4. flex布局</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
    <div class=&quot;left&quot;>左栏</div>
    <div class=&quot;middle&quot;>中间</div>
    <div class=&quot;right&quot;>右栏</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>左栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"middle"</span>&gt;</span>中间<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>右栏<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper{
    display: flex;
}
.left{
    width: 200px;
    height: 300px;
    background: green;
}
.middle{
    width: 100%;
    background: red;
    marign: 0 20px;
}
.right{
    width: 200px;
    height: 3000px;
    background: yellow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">background</span>: green;
}
<span class="hljs-selector-class">.middle</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: red;
    <span class="hljs-attribute">marign</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3000px</span>;
    <span class="hljs-attribute">background</span>: yellow;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358521?w=452&amp;h=215" src="https://static.alili.tech/img/remote/1460000011358521?w=452&amp;h=215" alt="first" title="first" style="cursor: pointer;"></span></p>
<blockquote><p>除了兼容性，一般没有太大的缺陷</p></blockquote>
<p>三栏布局使用较为广泛，不过也是比较基础的布局方式。对于PC端的网页来说，使用较多，但是移动端，本身宽度的限制，很难做到三栏的方式。因此，移动端盛行的现在，我们应该掌握一些自适应布局技巧和flex等方式。</p>
<h2 id="articleHeader8">移动端的时代</h2>
<p>或许，手机占用了人们大部分的时间，对于前端工程师来说，不仅需要会h5和大前端的技术，还需要去适配不同的手机屏幕。PC端称王的时代已经过去，现在要求的网页都是需要能够去适配PC和移动端的。</p>
<p>之前，所聊的两栏和三栏布局，一般只能在PC中去使用，在移动端，由于屏幕尺寸有限，很难去做到类似的操作，所以，我们需要来了解新的东西。</p>
<p><strong>1. 媒体查询</strong></p>
<p>如果你需要一张网页能够在PC和移动端都能按照不同的设计稿显示出来，那么你需要做的就是去设置媒体查询。</p>
<p>媒体查询的css标识符是@media，它的媒体类型可以分为：</p>
<ol>
<li>all， 所有媒体</li>
<li>braille 盲文触觉设备</li>
<li>embossed 盲文打印机</li>
<li>print 手持设备</li>
<li>projection 打印预览</li>
<li>screen 彩屏设备</li>
<li>speech ‘听觉’类似的媒体类型</li>
<li>tty 不适用像素的设备</li>
<li>tv 电视</li>
</ol>
<p>代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen {
  p.test {font-family:verdana,sans-serif;font-size:14px;}
}
@media print {
  p.test {font-family:times,serif;font-size:10px;}
}
@media screen,print {
  p.test {font-weight:bold;}
}
/*移动端样式*/
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  /* Styles */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> screen {
  <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.test</span> {<span class="hljs-attribute">font-family</span>:verdana,sans-serif;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;}
}
@<span class="hljs-keyword">media</span> print {
  <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.test</span> {<span class="hljs-attribute">font-family</span>:times,serif;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">10px</span>;}
}
@<span class="hljs-keyword">media</span> screen,print {
  <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.test</span> {<span class="hljs-attribute">font-weight</span>:bold;}
}
<span class="hljs-comment">/*移动端样式*/</span>
@<span class="hljs-keyword">media</span> only screen and (min-device-width : <span class="hljs-number">320px</span>) and (max-device-width : <span class="hljs-number">480px</span>) {
  <span class="hljs-comment">/* Styles */</span>
}</code></pre>
<p>媒体查询的主要原理：它像是给整个css样式设置了断点，通过给定的条件去判断，在不同的条件下，显示不同的样式。例如：手机端的尺寸在750px，而PC端则是大于750px的，我们可以将样式写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen and (min-width: 750px){
  .media{
    height: 100px;
    background: red;
  }
}

@media (max-width: 750px){
  .media{
    height: 200px;
    background: green;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">750px</span>){
  <span class="hljs-selector-class">.media</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: red;
  }
}

@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">750px</span>){
  <span class="hljs-selector-class">.media</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: green;
  }
}</code></pre>
<p><a href="https://jsbin.com/gopezum/edit?html,css,output" rel="nofollow noreferrer" target="_blank">demo地址</a></p>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011358524?w=640&amp;h=372" src="https://static.alili.tech/img/remote/1460000011358524?w=640&amp;h=372" alt="小于750px" title="小于750px" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000011358525?w=953&amp;h=306" src="https://static.alili.tech/img/remote/1460000011358525?w=953&amp;h=306" alt="大于750px" title="大于750px" style="cursor: pointer;"></span></p>
<p><strong>flex弹性盒子</strong></p>
<p>其实移动端会经常使用到flex布局，因为在简单的页面适配方面，flex可以起到很好的拉伸的效果。我们先看几张图体会一下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007859559?w=320&amp;h=499" src="https://static.alili.tech/img/remote/1460000007859559?w=320&amp;h=499" alt="flex盒子" title="flex盒子" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000007859560?w=375&amp;h=678" src="https://static.alili.tech/img/remote/1460000007859560?w=375&amp;h=678" alt="flex盒子" title="flex盒子" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000007859561?w=700&amp;h=581" src="https://static.alili.tech/img/remote/1460000007859561?w=700&amp;h=581" alt="flex盒子" title="flex盒子" style="cursor: pointer;"></span></p>
<p>可以从图中看出，这个网页不管屏幕分辨率怎么发生变化，它的高度和位置都不变，而且里面的元素排布也没有发生变化，总是图标信息在左边和薪资状况在右边。</p>
<p>这就是很明显的，flex布局。flex可以在移动端适配比较简单的，元素比较单一的页面。</p>
<p>具体的flex布局内容，在这里不详细说明。<a href="https://github.com/laizimo/zimo-article/issues/13" rel="nofollow noreferrer" target="_blank">flex传送门</a></p>
<p><strong>rem适配</strong></p>
<p>rem可以说是移动端适配的一个神器。类似于手淘等界面，都是使用的rem进行的适配。这种界面有个特点就是页面元素的复杂度比较高，而使用flex进行布局会导致页面被拉伸，但是上下的高度却没有变化等问题。示例图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007859566?w=320&amp;h=673" src="https://static.alili.tech/img/remote/1460000007859566?w=320&amp;h=673" alt="rem适配" title="rem适配" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000007859567?w=365&amp;h=671" src="https://static.alili.tech/img/remote/1460000007859567?w=365&amp;h=671" alt="rem适配" title="rem适配" style="cursor: pointer;"></span></p>
<p>具体的讲解可以看这篇比较好的文章。<a href="http://www.cnblogs.com/lyzg/p/4877277.html" rel="nofollow noreferrer" target="_blank">rem传送门</a></p>
<h1 id="articleHeader9">总结</h1>
<p>分析到这里，布局的很多东西都已经非常的清晰了。相信这是一篇值得去收藏的一篇文章。内容可能有点多，所以这里做一个总结：</p>
<ul>
<li>定位</li>
<li>尺寸</li>
<li>浮动</li>
<li>最初的布局——table</li>
<li>两栏布局</li>
<li>三栏布局</li>
<li>移动端的布局</li>
</ul>
<p>相信你看完这些，在以后，一定可以拿到设计稿的时候，内心大致有个算盘，应该如何区分，如何布局。</p>
<blockquote><p>最后，如果你对我写的有疑问，可以与我讨论。如果我写的有错误，欢迎指正。你喜欢我的博客，请给我关注Star~呦。大家一起总结一起进步。欢迎关注我的<a href="https://github.com/laizimo/zimo-article" rel="nofollow noreferrer" target="_blank">github博客</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS布局说——可能是最全的

## 原文链接
[https://segmentfault.com/a/1190000011358507](https://segmentfault.com/a/1190000011358507)


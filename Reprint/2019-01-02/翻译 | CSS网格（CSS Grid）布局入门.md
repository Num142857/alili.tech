---
title: '翻译 | CSS网格（CSS Grid）布局入门' 
date: 2019-01-02 2:30:09
hidden: true
slug: tm7cs2vlkgj
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li><p>原文地址：<a href="https://cm.engineering/getting-to-know-css-grid-layout-818e43ca71a5" rel="nofollow noreferrer" target="_blank">Getting to know CSS Grid Layout</a></p></li>
<li><p>原文作者：<a href="https://cm.engineering/@cwrightdesign?source=post_header_lockup" rel="nofollow noreferrer" target="_blank">Chris Wright</a></p></li>
<li><p>译者：<a>华翔</a></p></li>
<li><p>校对者：<a>珂珂</a>、<a>干干</a></p></li>
</ul>
<h1 id="articleHeader0">翻译 | CSS网格（CSS Grid）布局入门</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923577" src="https://static.alili.tech/img/remote/1460000010923577" alt="banner" title="banner" style="cursor: pointer; display: inline;"></span></p>
<p>CSS网格布局是浏览器Flexbox布局之后最重要的布局方式。我们可以忘记过去15年经常使用的的各种“神奇数字”，hacks和一系列变通布局方案。网格布局提供了非常简单的声明布局方式，之后再也不需要借助一些常见的主流css框架，也能减少很多手动实现的布局方式</p>
<p>如果你以前不熟悉CSS网格布局，那么你可以开始了解它了。它是一种适用于容器元素，并能指定子元素的间距、大小和对齐方式的布局工具。</p>
<p>CSS网格布局赋予我们更强大的能力——大家熟悉的水平垂直居中布局，不需要增加标签就能做到。同样，这也能让我们不需要媒体查询就能根据可用空间自动适应。</p>
<h2 id="articleHeader1">学习的最低要求</h2>
<p>首先网格布局有不少新语法需要学习，但是你只需要稍微看下就能上手。本文将会用示例带你学习CSS网格布局各种各样重要的入门概念。</p>
<h2 id="articleHeader2">浏览器兼容性</h2>
<p>CSS网格布局从Safari 10.1, Firefox 52, Opera 44, Chrome 57开始收到支持，微软Edge在Edge 15会更新对网格布局的支持。</p>
<p>微软的浏览器（IE10–11和Edge 13-14）有一种比较旧的实现，所以有不少限制，我们会简单介绍新的实现方式和老的实现方式之间的区别，这样你能知道如何规避他们。</p>
<p>对于大多数布局，我们会使用下面的query特性来让老的浏览器对他们理解的特性也能工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@supports (display: grid) {
    .grid {
        display: grid;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">supports</span> (display: grid) {
    <span class="hljs-selector-class">.grid</span> {
        <span class="hljs-attribute">display</span>: grid;
    }
}</code></pre>
<p>不支持浏览器<code>@supports</code>或网格的浏览器将不会生效。</p>
<p>为了能正确展示文中的示例，你需要使用<a href="https://igalia.github.io/css-grid-layout/enable.html" rel="nofollow noreferrer" target="_blank">支持网格布局的浏览器</a>。</p>
<h2 id="articleHeader3">创建带有间距（gutter）的两列（column）网格</h2>
<p>为了演示CSS网格布局如何定义列，我们从下面的布局开始：<br><span class="img-wrap"><img data-src="/img/remote/1460000010923578" src="https://static.alili.tech/img/remote/1460000010923578" alt="grid-template-columns 和 grid-gap" title="grid-template-columns 和 grid-gap" style="cursor: pointer;"></span><br>[使用grid-template-columns 和 grid-gap创建带间距的两列布局]</p>
<p>为了创建上述网格布局，我们需要使用<code>grid-template-columns</code>和<code>grid-gap</code>。<br><code>grid-template-columns</code>表示网格中的列是如何布局的，它的值是一连串以空格分割的的值，这些值标识每列的大小，值的个数表示列的数目。</p>
<p>例如，四列250px宽度的网格布局可以这样表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid-template-columns: 250px 250px 250px 250px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">grid</span>-template-<span class="hljs-built_in">columns</span>: 250px 250px 250px 250px;</code></pre>
<p>也可以使用<code>repeat</code>关键字表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid-template-columns: repeat(4, 250px);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">grid</span>-template-<span class="hljs-built_in">columns</span>: repeat(<span class="hljs-number">4</span>, 250px);</code></pre>
<h3 id="articleHeader4">定义间距</h3>
<p><code>grid-gap</code>定义了网格布局的间距大小，接收一个或两个值，如果定义两个值则表示列（column）和行（row）的间距大小。</p>
<p>在两列布局示例中，我们可以如下使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
  display: grid;
  grid-template-columns: 50vw 50vw;
  grid-gap: 1rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">50vw</span> <span class="hljs-number">50vw</span>;
  <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">1rem</span>;
}</code></pre>
<p>不幸的是，这个间距将会占用容器元素的整体宽度，计算出来就是<code>100vw + 1rem</code>，最终这个布局会导致出现水平滚动条。<br><span class="img-wrap"><img data-src="/img/remote/1460000010923579" src="https://static.alili.tech/img/remote/1460000010923579" alt="viewport导致的水平滚动条" title="viewport导致的水平滚动条" style="cursor: pointer;"></span><br>[通过viewport单位创建带间距网格导致的水平滚动条]</p>
<p>为了解决这个空间溢出问题，我们需要些不同的方法来处理，需要用分数单位或者说是<strong>FR</strong>。</p>
<h3 id="articleHeader5">分数单位</h3>
<p>分数单位标识占用可用空间的份额，如果900px是可用空间，其中的一个元素占有1份，另外的元素占有2份——那么第一个元素的宽度会是900px的1/3，另外的元素是900px的2/3。<br>修改后用分数代替view-port单位的新代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">1rem</span>;
}</code></pre>
<h3 id="articleHeader6">内容对齐</h3>
<p>为了对齐示例中的内容，我们在子元素上使用grid布局，并加上对齐属性来定位他们到指定轨道(track)，轨道就是一个网格的列或行的某个位置的常见的名称。网格跟Flex布局一样，有一系列对齐的属性——共有四种值——<code>start</code>, <code>center</code>, <code>end</code>, 和<code>stretch</code>，分别对应其子元素所在的轨道。<code>stretch</code>跟其他不太一样，它会将元素从所在轨道的头拉伸到尾。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923580" src="https://static.alili.tech/img/remote/1460000010923580" alt="align-items 和 justify-content" title="align-items 和 justify-content" style="cursor: pointer;"></span></p>
<p>[align-items 和 justify-content]</p>
<p>例子中我们要将内容水平和垂直居中，可以通过在容器上设置下面这些属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-content {
    display: grid;
    align-items: center;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.center-content</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p><a href="http://codepen.io/chriswrightdesign/pen/51f1dcaa9b6d815a240420106cd09a0b?editors=1100" rel="nofollow noreferrer" target="_blank">示例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/51f1dcaa9b6d815a240420106cd09a0b" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader7">使用旧的网格布局实现两栏布局</h3>
<p>如果使用旧的网格布局方式创建，我们需要考虑实现中的诸多限制。旧的布局方式不仅没有<code>grid-gap</code>，而且你需要在每一个网格元素上声明网格元素的起始位置，否则默认会设置为1，这样所有的网格都会堆在第一列。</p>
<p>旧版本的布局方式需要通过增加间距作为网格轨道的一部分，也需要设置每个网格从哪里开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid-legacy {
   display: -ms-grid;
   -ms-grid-columns: 1fr 1rem 1fr; // 取代 gap 间距
}
.grid-legacy:first-child {
   -ms-grid-column: 1;
}
.grid-legacy:last-child {
    -ms-grid-column: 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>.<span class="hljs-built_in">grid</span>-legacy {
   <span class="hljs-built_in">display</span>: -ms-<span class="hljs-built_in">grid</span>;
   -ms-<span class="hljs-built_in">grid</span>-<span class="hljs-built_in">columns</span>: 1fr 1<span class="hljs-built_in">rem</span> 1fr; // 取代 gap 间距
}
.<span class="hljs-built_in">grid</span>-legacy:<span class="hljs-built_in">first</span>-child {
   -ms-<span class="hljs-built_in">grid</span>-column: <span class="hljs-number">1</span>;
}
.<span class="hljs-built_in">grid</span>-legacy:<span class="hljs-built_in">last</span>-child {
    -ms-<span class="hljs-built_in">grid</span>-column: <span class="hljs-number">3</span>;
}</code></pre>
<h3 id="articleHeader8">旧的布局方式实现对齐和全高度</h3>
<p>旧的布局方式跟IE 11中Flexbox有一样的问题，<a href="https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items" rel="nofollow noreferrer" target="_blank">在容器上设置最小高度（min-height）不一定会生效</a>。这个问题通过网格布局来解决更方便。</p>
<p>为了实现这个效果我们在父容器的行属性上使用<code>minmax</code>方法，<code>minmax</code>指定了行或列的最大和最小值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-ms-grid-rows: minmax(100vh, 1fr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">-ms-grid-rows: minmax(100vh, 1fr);</code></pre>
<p>在子元素上我们声明一个单位为1fr的单列单行的网格：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ms-cell {
   -ms-grid-columns: 1fr;
   -ms-grid-rows: 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ms-cell</span> {
   <span class="hljs-attribute">-ms-grid-columns</span>: <span class="hljs-number">1</span>fr;
   <span class="hljs-attribute">-ms-grid-rows</span>: <span class="hljs-number">1</span>fr;
}</code></pre>
<p>最后，因为我们不能像Flexbox或最新网格布局那样根据父元素对齐，我们必须使用元素自身的对齐方式来对齐：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ms-align-center {
    -ms-grid-column: 1;
    -ms-grid-column-align: center; // 新型grid布局中的 align-self
    -ms-grid-row-align: center; // 新型grid布局中的 justify-self
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>.ms-align-center {
    -<span class="ruby">ms-grid-<span class="hljs-symbol">column:</span> <span class="hljs-number">1</span>;
</span>    -<span class="ruby">ms-grid-column-<span class="hljs-symbol">align:</span> center; <span class="hljs-regexp">//</span> 新型grid布局中的 align-<span class="hljs-keyword">self</span>
</span>    -<span class="ruby">ms-grid-row-<span class="hljs-symbol">align:</span> center; <span class="hljs-regexp">//</span> 新型grid布局中的 justify-<span class="hljs-keyword">self</span>
</span>}</code></pre>
<p><a href="http://codepen.io/chriswrightdesign/pen/08b9afe6847968c1f319a5ce51e9eb95" rel="nofollow noreferrer" target="_blank">旧的两列布局示例</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/08b9afe6847968c1f319a5ce51e9eb95" data-typeid="3">点击预览</button></p>
<p>到此我们实现了如何创建列、实现间距、内容对齐及对旧的网格布局的支持。接下来让我们实验下如何通过grid实现内边距。</p>
<h2 id="articleHeader9">通过CSS网格实现内边距（Negative Space）</h2>
<p>网格布局允许你通过<code>grid-column-start</code>属性指定列开始的位置，所以就有了可以在网格内创建内边距的可能性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923581" src="https://static.alili.tech/img/remote/1460000010923581" alt="使用grid-template-columns和grid-column-start创建内边距" title="使用grid-template-columns和grid-column-start创建内边距" style="cursor: pointer;"></span><br>[使用grid-template-columns和grid-column-start创建内边距]</p>
<p>创建内边距的一种方式是在列的实际位置上设置一个数字，空出网格元素的原始空间, 网格元素也会被push到新的网格列。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923582" src="https://static.alili.tech/img/remote/1460000010923582" alt="grid-column-start push" title="grid-column-start push" style="cursor: pointer; display: inline;"></span><br>[随着grid-column-start push 第一项]</p>
<p>在上面的内边距示例中，html结构中用一个div包裹另外一个div：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;grid&quot;>
    <div class=&quot;child&quot;><!-- 内容 --></div>
</div" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"grid"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-comment">&lt;!-- 内容 --&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div</span></code></pre>
<p>网格像这样设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
}</code></pre>
<p>为了让子元素从右侧开始，我们设置子元素从第2列开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child {
    grid-column-start: 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span>;
}</code></pre>
<p><strong>注意</strong>：在Firefox 52中的一个差异导致一个垂直对齐问题——<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1346699" rel="nofollow noreferrer" target="_blank">基于FR单位的行不会拉伸得跟整个窗口一样高</a>。为了解决（address）这个问题我们设置子元素为网格项，并给每一行设置一个想要的高度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".l-grid--full-height {
    grid-template-rows: minmax(100vh, 1fr);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.l-grid--full-height</span> {
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">minmax</span>(100vh, 1fr);
}</code></pre>
<p><a href="http://codepen.io/chriswrightdesign/pen/5a9bc28c370ad5155515c3c7a19653d8" rel="nofollow noreferrer" target="_blank">设置内边距示例</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/5a9bc28c370ad5155515c3c7a19653d8" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader10">用内容死区（content dead-zones）创建空白</h2>
<p>在四列布局中，给本来在第三列的网格项上设置<code>grid-column-start:2;</code>，那么会找到下一个可用的第二列来填充空间。</p>
<p>网格轨道会跳过某些列，直到找到下一列。我们可以利用这个方法在网格内创建空白，没有内容的网格也会被分配。<br><a href="http://codepen.io/chriswrightdesign/pen/427c3e51c320e04662be56dad44dee74" rel="nofollow noreferrer" target="_blank">[创建空白示例]</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/427c3e51c320e04662be56dad44dee74" data-typeid="3">点击预览</button></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923583" src="https://static.alili.tech/img/remote/1460000010923583" alt="" title="" style="cursor: pointer;"></span><br>[使用grid-template-columns 和 grid-column-start创建空白]</p>
<h2 id="articleHeader11">创建行</h2>
<p>如果我们想分割布局为四份，我们目前所了解的关于列的布局方式对行同样有效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 250px 250px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">250px</span> <span class="hljs-number">250px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923584" src="https://static.alili.tech/img/remote/1460000010923584" alt="" title="" style="cursor: pointer;"></span><br>[同时使用grid-template-columns 和 grid-template-rows创建网格布局]</p>
<p>理想情况下这个示例是没问题的。因为此时每个网格项的内容足够少而不会撑开每行。但随着内容的变化，一切都不一样了。当示例中的内容超出指定行的大小后，看下会发生什么：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923585" src="https://static.alili.tech/img/remote/1460000010923585" alt="" title="" style="cursor: pointer;"></span><br>[内容超出声明的行高]</p>
<p>我们创建了250px高的两行，如果内容超过每行的高度，将会打破布局并和后面的行的内容重叠。并不是一个我们想要的结果。</p>
<h2 id="articleHeader12">灵活的设置最小值</h2>
<p>我们在该场景下需要的是设置最小尺寸的能力，但又要允许尺寸可以根据内容弹性变化。这里我们通过上面旧浏览器示例中的<code>minmax</code>关键字实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    grid-template-rows: minmax(250px, auto) minmax(250px, auto);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">minmax</span>(250px, auto) <span class="hljs-built_in">minmax</span>(250px, auto);
}</code></pre>
<p><a href="http://codepen.io/chriswrightdesign/pen/447e07c84aac9abb5514f9b9fbb18459" rel="nofollow noreferrer" target="_blank">创建有最小值的弹性行</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/447e07c84aac9abb5514f9b9fbb18459" data-typeid="3">点击预览</button></p>
<p>现在我们已经了解了创建带有内容的行的基础方法，我们开始来创建水平和垂直交错的更复杂网格布局。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923586" src="https://static.alili.tech/img/remote/1460000010923586" alt="" title="" style="cursor: pointer;"></span><br>[使用grid-column-start和span关键字创建复杂网格布局<a href="https://unsplash.com/" rel="nofollow noreferrer" target="_blank">Unsplash</a>]</p>
<h2 id="articleHeader13">创建更复杂的网格</h2>
<p>我们开始创建更复杂的网格布局。将网格中的每个网格项设置成占据多条轨道，在一列内，我们能通过<code>grid-column-start</code>和<code>grid-column-end</code>实现，或者通过如下所示更简单的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid-column: 1 / 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">grid-<span class="hljs-string">column:</span> <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;</code></pre>
<p>用这种实现方式的弊端是难以“模块化”，为了定位每块内容需要写很多代码。<strong>span</strong>关键字更符合模块化的思路，因为我们能放在任何地方，让网格来控制他。我们可以定义网格项的开始位置，及其占据的轨道数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".span-column-3 {
    grid-column-start: span 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.span-column-3</span> {
    <span class="hljs-attribute">grid-column-start</span>: span <span class="hljs-number">3</span>;
}</code></pre>
<p>任何添加该class的网格将会从其开始位置，占据三个轨道。</p>
<p><a href="http://codepen.io/chriswrightdesign/pen/35102dd4a2cf7fbadb33dd53cb88787d" rel="nofollow noreferrer" target="_blank">[通过span实现的复杂网格]</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/35102dd4a2cf7fbadb33dd53cb88787d" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader14">使用span设计一个布局</h2>
<p>我们能设计一个多轨道布局，通过将布局分解为grid布局中的最小单元。本示例中的最小单位是图中高亮的部分。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923587" src="https://static.alili.tech/img/remote/1460000010923587" alt="" title="" style="cursor: pointer;"></span><br>[通过最小网格单位结合span创建更大的网格]</p>
<p>围绕最小单位，我们能灵活的使用span来创建一些有意思的布局，因为span是可以叠加的——你可以结合列和行的轨道在网格中创建多层级。</p>
<h2 id="articleHeader15">不需要媒体查询（media queries）的弹性网格</h2>
<p>虽然上面说到的例子能在可用空间内适应变化，但是没有一个是专门为空间变化设计的。网格有两个非常有用的特性来适应可用空间的变化。这两个属性叫‘auto-fit’和‘auto-fill’，像下面这样结合<strong>repeat function</strong>和<strong>minmax function</strong>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">grid-<span class="hljs-keyword">template</span>-columns: repeat(<span class="hljs-keyword">auto</span>-fit, minmax(<span class="hljs-number">250</span>px, <span class="hljs-number">1f</span>r));</code></pre>
<p>这些值代替了repeat中的数字，并计算在每条轨道上会填充多少行或列。二者之间最大不同是当一条轨道上空白的溢出时的他们的处理方式不同。</p>
<p><code>auto-fit</code>尝试在不导致列溢出的情况下，放置该列能处理的最大数量的重复元素。当没有足够的空间来放置更多的元素时，之后的元素将会放到下一行，不能填满的空间将会被保留。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923588" src="https://static.alili.tech/img/remote/1460000010923588" alt="auto-fill" title="auto-fill" style="cursor: pointer; display: inline;"></span><br>[示例：auto-fill. auto-fill会保留后面空间，反之auto-fit会让空白收缩为0px]</p>
<p><code>auto-fill</code>的表现跟<code>auto-fit</code>类似，但是任何的空白空间都会自动收缩，同时这一行的元素也会被拉升——类似flexbox的效果，列会随着可用空间变小发生折叠。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923589" src="https://static.alili.tech/img/remote/1460000010923589" alt="grid-auto-fit示例" title="grid-auto-fit示例" style="cursor: pointer; display: inline;"></span></p>
<p>[grid-auto-fit示例]</p>
<p>依赖媒体查询的布局跟窗口大小关系很大，这不够模块化——系统内的组件应该能根据可用空间自适应。那么在实践中会是什么样的呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010923590" src="https://static.alili.tech/img/remote/1460000010923590" alt="auto-fit" title="auto-fit" style="cursor: pointer; display: inline;"></span><br>[grid auto-fit的真实示例]</p>
<p><a href="http://codepen.io/chriswrightdesign/pen/f93ce007ae9cc48eab4c577f1efac382" rel="nofollow noreferrer" target="_blank">[网格auto-fit示例]</a><button class="btn btn-xs btn-default ml10 preview" data-url="chriswrightdesign/pen/f93ce007ae9cc48eab4c577f1efac382" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader16">这只是冰山一角</h2>
<p>我们已经经历了快十五年的CSS浮动为主的布局方式，我们上面学习了几乎所有你能用float实现的布局——CSS网格布局是这个领域的新代表，仍然还有许多东西需要去尝试和学习。</p>
<p>现在最重要的步骤是开始使用它。在构建、创建更多高级布局的时候会很方便。网格布局还有不少未知领域，一旦我们更好地理解其能力并开始与其他特性结合，我们便能用更少代码创造更多有趣、灵活的布局，并能减少些框架抽象的麻烦。</p>
<p>如果你感兴趣并想进一步探究CSS网格，可以试下<a href="http://gridbyexample.com/" rel="nofollow noreferrer" target="_blank">Rachel Andrew的例子</a>，这里面通过带解释说明的实例探讨了CSS网格布局的每一个特性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVT6wG?w=1500&amp;h=854" src="https://static.alili.tech/img/bVT6wG?w=1500&amp;h=854" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
翻译 | CSS网格（CSS Grid）布局入门

## 原文链接
[https://segmentfault.com/a/1190000010923572](https://segmentfault.com/a/1190000010923572)


---
title: 'css grid布局入门' 
date: 2019-02-14 2:30:37
hidden: true
slug: s91hlk95a6g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>CSS网格布局（又称“网格”），是一种二维网格布局系统。CSS在处理网页布局方面一直做的不是很好。一开始我们用的是table（表格）布局，然后用float(浮动)，position（定位）和inline-block（行内块）布局，但是这些方法本质上是hack，遗漏了很多功能，例如垂直居中。后来出了flexbox盒布局，解决了很多布局问题，但是它仅仅是一维布局，而不是复杂的二维布局，实际上它们（flexbox与grid）能很好的配合使用。</p>
<h2 id="articleHeader1">浏览器支持情况</h2>
<p>在我们开始正式学习Grid布局之前，先看一下<a href="https://caniuse.com/#search=grid" rel="nofollow noreferrer" target="_blank">can i use</a>上grid布局在各个浏览器下的支持情况是很有用的，</p>
<p><span class="img-wrap"><img data-src="/img/bVbiGqE?w=2496&amp;h=484" src="https://static.alili.tech/img/bVbiGqE?w=2496&amp;h=484" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">基本概念</h2>
<p>要想学好Grid布局的用法，基本概念的介绍是少不了的，虽然看起来比较枯燥。</p>
<h3 id="articleHeader3">网格容器(Grid Container)</h3>
<p>通过display属性设置属性值为grid或inline-grid可以创建一个网格容器。网格容器中的所有子元素就会自动变成网格项目（Grid item）</p>
<h3 id="articleHeader4">网格线(Grid Line)</h3>
<p>组成网格线的分界线。它们可以是列网格线（column grid lines），也可以是行网格线（row grid lines）并且居于行或列的任意一侧</p>
<h3 id="articleHeader5">网格轨道(Grid Track)</h3>
<p>两个相邻的网格线之间为网格轨道。你可以认为它们是网格的列或行</p>
<h3 id="articleHeader6">网格单元(Grid Cell)</h3>
<p>两个相邻的列网格线和两个相邻的行网格线组成的是网格单元，它是最小的网格单元</p>
<h3 id="articleHeader7">网格区(Grid  Area)</h3>
<p>网格区是由任意数量网格单元组成</p>
<h2 id="articleHeader8">基本属性及作用</h2>
<h3 id="articleHeader9">一个简单例子</h3>
<p>要介绍Grid布局属性，让我们先从一个简单例子开始：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiGtJ?w=414&amp;h=394" src="https://static.alili.tech/img/bVbiGtJ?w=414&amp;h=394" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，如果我们要实现一个3x3的正方形矩阵，用Grid布局要怎么实现？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;container&quot;>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: grid;
    width: 200px;
    height: 200px;
    grid-template-rows: repeat(3, 50px);
    grid-template-columns: repeat(3, 50px);
    grid-row-gap: 10px;
    grid-column-gap:10px;
}
.container div {
    background-color: #ccc;
    border: 1px solid #333;
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">repeat</span>(3, 50px);
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 50px);
    <span class="hljs-attribute">grid-row-gap</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">grid-column-gap</span>:<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
}    </code></pre>
<p>如上面代码所示，3x3的矩阵布局，用Grid布局去写，非常简单方便，相对于使用其他布局来说，Grid布局的优点就显现出来了，那么，接下来就让我们看看Grid局部中那些常用属性：</p>
<ul>
<li>grid-template-rows：指定的每个值可以创建每行的高度。行高的尺寸可以是任何非负值，长度可以是px、%、em等长度单位的值</li>
<li>grid-template-columns：指定的每个值来创建每列的列宽</li>
<li>repeat函数：使用repeat()可以创建重复的网格轨道。这个适用于创建相等尺寸的网格项目和多个网格项目，repeat()接受两个参数：第一个参数定义网格轨道应该重复的次数，第二个参数定义每个轨道的尺寸</li>
<li>grid-column-gap和grid-row-gap属性用来创建列与列，行与行之间的间距，间距(Gap)可以设置任何非负值，长度值可以是px、%、em等单位值。</li>
</ul>
<h3 id="articleHeader10">网格线号码定位</h3>
<p>依旧是上面html代码，一个3x3的矩阵，不同的是这次我们通过网线号码来定位某一个特定方块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: grid;
    width: 200px;
    height: 200px;
    grid-template-rows: repeat(3, 50px);
    grid-template-columns: repeat(3, 50px);
}
.container div {
    background-color: #ccc;
    border: 1px solid #333;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3; 
/*  grid-area: 2/2/3/3; */
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">repeat</span>(3, 50px);
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 50px);
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-column-end</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row-end</span>: <span class="hljs-number">3</span>; 
<span class="hljs-comment">/*  grid-area: 2/2/3/3; */</span>
  }</code></pre>
<p>通过上面的代码我们可以实现如下效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiGzJ?w=402&amp;h=346" src="https://static.alili.tech/img/bVbiGzJ?w=402&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们定位矩阵正中间的小方块显示出来，其余的就不显示了，下面我们网格线号码定位的那些属性：</p>
<ul>
<li>每条线是从网格轨道开始，网格的网格线从1开始，每条网格线逐步增加1</li>
<li>grid-row-start：表示开始的行网格线序号</li>
<li>grid-row-end：表示结束的行网格线序号</li>
<li>grid-column-start：表示开始的列网格线序号</li>
<li>grid-row-end：表示结束的列网格线序号</li>
<li>如果一个网格项目跨度只有一行或一列，那么grid-row-end和grid-column-end不是必需的</li>
<li>grid-area：网格区域，也是用来定位，如果只提供一个值，它指定了grid-row-start和grid-column-start的值。如果提供两个值，第一个值是grid-row-start、grid-column-start的值，第二个值是grid-row-end、grid-column-end的值，两者之间必须要用/隔开。如果指定四个值，第一个值对应grid-row-start，第二个值对应grid-column-start，第三个值对应grid-row-end和第四个值对应grid-column-end</li>
</ul>
<h3 id="articleHeader11">网格区域命名定位网格项目</h3>
<p>通过上面的例子，我们知道了如何用网格线去定位网格项目，接下来我们将学习如何通过网格区域的命名来定位网格项目，老样子，依旧从一个例子开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;first&quot;></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"first"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: grid;
    width: 400px;
    height: 400px;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 100px);
    grid-template-areas: &quot;header header2 header3&quot; &quot;body body2 body3&quot; &quot;footer footer2 footer3&quot;;
}
.container div {
    background-color: #ccc;
    border: 1px solid #333;
}
.container .first {
    grid-row-start: header2;
    grid-row-end: body2;
    grid-column-start: header;
    grid-column-end: header2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">repeat</span>(3, 100px);
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 100px);
    <span class="hljs-attribute">grid-template-areas</span>: <span class="hljs-string">"header header2 header3"</span> <span class="hljs-string">"body body2 body3"</span> <span class="hljs-string">"footer footer2 footer3"</span>;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-class">.first</span> {
    <span class="hljs-attribute">grid-row-start</span>: header2;
    <span class="hljs-attribute">grid-row-end</span>: body2;
    <span class="hljs-attribute">grid-column-start</span>: header;
    <span class="hljs-attribute">grid-column-end</span>: header2;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiKzo?w=600&amp;h=808" src="https://static.alili.tech/img/bVbiKzo?w=600&amp;h=808" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如上述例子看到的，本来是一个3x3的矩阵，但是通过区域命名的方式，将第一个div设置了跨两行两列，接下来让我们一起了解一下网格区域命名定位网格项目的相关属性：</p>
<ul>
<li>像网格线名称一样，网格区域的名称也可以使用grid-template-areas属性来命名。引用网格区域名称也可以设置网格项目位置</li>
<li>设置网格区域的名称应该放置在单引号或双引号内，每个名称由一个空格符分开。网格区域的名称，每组（单引号或双引号内的网格区域名称）定义了网格的一行，每个网格区域名称定义网格的一列</li>
<li>grid-row-start和grid-row-end通过区域命名分别设置了行开始的位置和结束，grid-column-start和grid-column-end通过区域命名分别设置了列开始的位置和结束位置</li>
</ul>
<h2 id="articleHeader12">总结</h2>
<p>这篇文章简单的介绍了一些Grid布局的属性和用法，但没有涉及所有，Grid布局还有很多属性和用法需要自己去探索，通过不同属性的排列组合，可以发掘不同的玩法，这不正是布局的魅力吗？<br>如果大家想要更加全面的了解Grid布局，可以去<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout" rel="nofollow noreferrer" target="_blank">Mozilla Grid</a>板块去探索发现Grid布局的魅力。<br>这篇文章如果有错误或不严谨的地方，欢迎批评指正，如果喜欢，欢迎点赞收藏</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css grid布局入门

## 原文链接
[https://segmentfault.com/a/1190000016823187](https://segmentfault.com/a/1190000016823187)


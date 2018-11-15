---
title: 通过生成内容和CSS网格布局为空单元格添加样式
hidden: true
categories: reprint
slug: eee546d2
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <p>新手在使用网格布局时常见的一个问题是：如何对一个不包含任何内容的单元格添加样式。在当前的Level 1规范中还无法做到，因为无法选定空单元格或网格区域并对其添加样式。也就是说，想要设置样式必须插入一个元素。</p>
<p>本文我将会介绍如何使用CSS生成内容为空单元格添加样式，而不添加多余的空元素，同时会给出一些示例。</p>
<h3>为什么不能对空区域设置样式？</h3>
<p><a href="https://www.w3.org/TR/css-grid-1/">网格规范</a>的开头有提到：</p>
<blockquote>
<p>“本 CSS 模块定义了一个用于优化UI设计的基于网格的二维布局系统。在网格布局模型中，网格容器的子节点可以定位到预定义的弹性或固定大小的网格中的任意位置。“</p>
</blockquote>
<p>注意关键词”网格容器的子节点“。该规范定义了在父元素上创建网格的哪些子节点能够被定位。其没有定义任何关于网格的样式，也没有像多列布局的 <code>column-rule</code> 那样的属性。我们是对子项目添加样式，而不是网格本身，即需要有某个元素来应用样式。</p>
<h3>使用多余元素作为样式钩子</h3>
<p>添加样式的方法之一是在文档中添加多余的元素，如 span 或 div。一般来说程序员都不喜欢这个方法，虽然多年来一直是通过多余的“行包裹元素”，然后通过浮动实现网格布局。而明显的空元素比某些隐式的多余包裹元素更让人觉得不爽。</p>
<p>如下例所示，将空元素变成网格项，并对其添加背景和边框，就像包含内容的元素一样。</p>
<p>查看 Rachel Andrew (<a href="https://codepen.io/rachelandrew">@rachelandrew</a>) 的 <a href="https://codepen.io/rachelandrew/pen/mXymBJ">Empty elements become Grid Items</a> 。</p>
<p>Eric Meyer 在他的个人网站 A List Apart 的文章 <a href="https://alistapart.com/article/faux-grid-tracks">Faux Grid Tracks</a> 中提倡使用 <code>b</code> 元素作为冗余元素，因为它没有任何语义，在所有的标签中作为一个钩子很短而且很明显。</p>
<p>插入额外的 <code>div</code> 或 <code>b</code> 元素不算是什么大问题，所以若有需要，我不会觉得有什么不好的。而在 Web 开发中，通常一开始使用无优化的方法完成任务，直到有更好的解决方案。我一般尽可能的将样式放在统一的地方，这样的样式更易于重用，且不需要担心额外的标签。正是出于这个原因，我倾向用生成内容的方法，在我的 <a href="https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/">formatting books with CSS</a> 一文中，生成内容的使用频率非常高。</p>
<h3>使用生成内容作为样式钩子</h3>
<p>CSS生成内容使用 <code>::before</code> 和 <code>::after</code> CSS 伪类以及 <code>content</code> 属性在文档中插入内容。插入内容可能会用于插入文本，虽然这是可能的，但此处我们的目标是插入空元素作为网格容器的直接子元素。插入一个可以添加样式的元素。</p>
<p>在下面的例子中，有一个包裹元素作为网格容器，在其中嵌套了另一个元素。这个单独子元素作为网格项。我在容器上定义了三列三行的网格，然后使用网格线对其定位，将其它定位于中间的网格单元格中。</p>
<pre><code class="hljs apache"><span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span>
</code></pre><pre><code class="hljs css">
<span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.grid</span> &gt; * {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">rgb</span>(137,153,175);
}

<span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
}

</code></pre>
<p>使用 Firefox Grid Inspector 查看这个示例，其上覆盖着网格线，虽然这样能看到其他空单元格的位置，但若想要对其添加背景或边框，则需要添加的子元素，通过生成内容可以实现。</p>
<p> <a href="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3d0676c5-529d-4385-b80e-2f66fb9efcea/single-grid-item.png"><img src="https://p0.ssl.qhimg.com/t0110682a6bf614f263.png" alt="A single item in the center cell of a grid"></a> </p>
<p>单个网格项，通过 Firefox Grid Inspector 突出显示</p>
<p>在CSS中，在网格容器的伪元素 <code>::before</code> 和 <code>::after</code> 中添加一个空字符串。他们将作为网格项并填充在容器中。然后对其设置样式，添加背景色，如同普通的网格项一样对其定位。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(214,232,182);
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(214,232,182);
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span>;
}

</code></pre>
<p> <a href="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8e9cca88-1933-4788-95f0-5d37328ce9f1/single-grid-item-generated-content.png"><img src="https://p0.ssl.qhimg.com/t01ef2785d75f9ddc1a.png" alt="A single item in the center cell of a grid, with two green items in the corners"></a> </p>
<p>单个网格项，两个生成内容作为网格项</p>
<p>在文档中，我们只有一个直接子元素，多余的其他样式元素则在CSS中，这看起来挺合理的，因为这些元素的目的就是用于添加样式。</p>
<h4>生成内容方法的局限</h4>
<p>若你想要对右上或左下的网格项设置样式那么就有一个问题了，因为生成内容是有限的，多次重复设置 <code>::before</code> 和 <code>::after</code> 伪元素是无效的。例如，无法通过伪元素来生成 CSS 网格棋盘。若你确实需要对很多空单元格添加样式，那么在将来，你也许能通过"Filler B"的方式实现。</p>
<p>生成内容方法也可能会让项目以后的开发人员感到困惑。由于选择器目标是容器，如果在其他地方重复使用该类，将会出现生成内容，如果这正是想要的效果，自然是好的。在下面的例子中，在标题的任一侧添加一个装饰横线，每个 <code>h1</code> 都有这些横线是合理的。但是，如果不知道有这个伪类，则装饰横线会令人感到困惑！在CSS中添加注释将对此有所帮助。我一般会将他们作为一个组件库使用，在统一的地方定义组件，清晰的说明当类被应用到元素时会发生什么。</p>
<h3>花式标题</h3>
<p>我最喜欢的运用生成内容的技巧之一是对标题设置样式。过去，对标题设置样式需要通过额外的包裹元素和绝对定位来实现。但当页面内容来自CMS时，通常是无法添加额外的包裹元素的。</p>
<p>而使用网格和生成内容，我们可以在标题的任意一侧添加横线，而无需任何附加标签。该线将根据可用空间增长和缩小，并且当网格在浏览器中不可用时，将优雅地回退到普通的居中效果。</p>
<p> <a href="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8a77172d-c1fd-4474-b4c3-b4d31221bdd8/heading-example.png"><img src="https://p0.ssl.qhimg.com/t01e1e1d89e14f011a8.png" alt="A heading with lines either side, followed by text"></a> </p>
<p>我们需要实现的标题样式</p>
<p>标签为一个简单的 <code>h1</code>。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My heading<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
</code></pre><p>在 <code>h1</code> 的样式中，我创建了一个三列网格。<code>grid-template-columns</code> 的值表示一列为 <code>1fr</code>，一列为 <code>auto</code>，最后一列为 <code>1fr</code>。两个 <code>1fr</code> 的列的宽度将会自适应，在标题占据 <code>auto</code> 大小的空间之后，平分剩余可用空间。</p>
<p>设置 <code>text-align</code> 属性为 <code>center</code> 以便标题在不支持网格的浏览器中水平居中。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr auto <span class="hljs-number">1</span>fr;
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">20px</span>;
}

</code></pre>
<p>现在添加生成内容，在标题文本前后各添加一行。同时将其对应样式规则包含在特性查询（Feature Query）中，因此不会在不支持网格布局的浏览器中出错。</p>
<p>横线其实是生产内容的边框。</p>
<pre><code class="hljs css">@<span class="hljs-keyword">supports</span> (display: grid) {
    <span class="hljs-selector-tag">h1</span><span class="hljs-selector-pseudo">:before</span>,
    <span class="hljs-selector-tag">h1</span><span class="hljs-selector-pseudo">:after</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">align-self</span>: center;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
    }
}

</code></pre>
<p>也就是说，你能使用类似的方式添加任何样式，甚至在元素周围添加图标。需要注意，将生产内容放入一个单独的列中时则无法做到生成内容与标题的重叠。即使是绝对定位也无法解决该问题。所以，你需要确实你想要实现的效果是否可通过此方法实现。</p>
<p>参考 Rachel Andrew (<a href="https://codepen.io/rachelandrew">@rachelandrew</a>) 的 <a href="https://codepen.io/rachelandrew/pen/NyPNyj">Generated Content heading example</a> 。</p>
<p>这是通过网格布局实现渐进增强的一个很好的例子，即使你不准备将网格作为主要布局方式，也可以使用。回退时的标题简单明了，而支持的浏览器也可以有更好效果，无论如何都可以正常查看内容。Eric Meyer 也采用了类似的方法，使用生成的内容<a href="http://meyerweb.com/eric/thoughts/2017/04/10/grid-drop-quotes-revisited/">为 blockquote 元素添加方便定位的引号</a>。</p>
<p>我常常不会在一开始就确定要使用网格布局。一般是在具体实现时才开始选方案。基于此，推荐大家不要将网格布局仅看作页面组件布局的方法，因为有可能会在实现细节时忘记它。</p>
<h3>添加背景和边框</h3>
<p>我们也可以使用生成内容来堆叠网格项; 其实，一个网格项可以占据不止一个单元格。包括通过生成内容插入的项目。</p>
<p>在下一个例子中，我设计了两段内容区域和一个全宽网格项。内容区域有一个背景，在全宽网格项也有相同的背景。</p>
<p><a href="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3a86054a-a8be-4610-89ef-662c7bfba928/final-layout.png"><img src="https://p0.ssl.qhimg.com/t018bdb1290b9098f82.png" alt="A single column layout, with a full width image"></a> </p>
<p>我们的目标布局</p>
<p>代码中有一个包裹元素，内容区域和全宽网格项为其子元素，通过基于行的定位来设置网格项的位置。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>…<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"“Placeholder”"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>…<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
</code></pre><pre><code class="hljs css">
<span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">20px</span> <span class="hljs-number">4</span>fr <span class="hljs-number">20px</span> <span class="hljs-number">1</span>fr;
    <span class="hljs-attribute">grid-template-rows</span>: auto <span class="hljs-number">300px</span> auto;
    <span class="hljs-attribute">grid-row-gap</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.section1</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.section2</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.full-width</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(214,232,182,.5);
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}

</code></pre>
<p>这样就能将布局设置为目标那样了，但对网格项设置背景时发现背景不会出现在 <code>section</code> 和全宽图片之间的 <code>row-gap</code> 区域。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.section</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(214,232,182,.3);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-built_in">rgb</span>(214,232,182);
}

</code></pre>
<p> <a href="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/28feafe9-0576-41c3-9098-6ce245e178bb/background-behind-grid-areas.png"><img src="https://p0.ssl.qhimg.com/t01d73b485a79268c9d.png" alt="A single column layout, with a full width image, background colour behind the content areas"></a> </p>
<p>背景仅出现在内容区之下</p>
<p>若将 <code>grid-row-gap</code> 属性移除，而用 padding 模拟也无法实现将背景置于全宽项之下。</p>
<p>此时就是使用生成内容的最佳场景了，通过 <code>::before</code> 在网格包裹元素之前添加一个生成内容，同时对其设置一个背景色，若什么都不做，那么此生产内容默认放置在网格的第一个单元格中。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(214,232,182,.3);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-built_in">rgb</span>(214,232,182);
}

</code></pre>
<p> <a href="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b33c1461-935b-4d13-83d0-bd3b609c3ce9/before-positioning-generated-content.png"><img src="https://p0.ssl.qhimg.com/t019bb82aad286e6448.png" alt="A square of colour in the top left corner of the layout"></a> </p>
<p>生成内容占了网格的第一个空单元格</p>
<p>然后，使用基于行的定位来定位生成内容，将其扩展到所有应显示背景色的区域。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(214,232,182,.3);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-built_in">rgb</span>(214,232,182);
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span> / <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
}

</code></pre>
<p>完整演示在CodePen上。</p>
<p>参考 Rachel Andrew (<a href="https://codepen.io/rachelandrew">@rachelandrew</a>) 的 <a href="https://codepen.io/rachelandrew/pen/jZEqeY">Generated Content background example</a> 。</p>
<h4>通过 <code>z-index</code> 控制层叠</h4>
<p>在上面的例子中，生成内容是通过插入 <code>::before</code> 实现的。这意味着其他元素在它之后，它位于层叠的底部，因此将显示在想要的其余内容的后面。可以通过 <code>z-index</code> 来控制层叠。也可以将 <code>::before</code> 选择器更改为 <code>::after</code>。生成内容背景则位于所有内容的顶部，如同从边框在图像上那样。这是因为它现在已经成为网格容器中的最后一项，它是最后被绘制的，因此出现在“顶部”。</p>
<p>要改变这一点，需要给这个元素一个比所有元素更低的 <code>z-index</code> 值。若没有设置过 <code>z-index</code> 值，则最简单的做法是给生成内容 <code>z-index</code> 设为 <code>-1</code>。这会导致它成为层叠中的第一项，因为它的 <code>z-index</code> 最低。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(214,232,182,.3);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-built_in">rgb</span>(214,232,182);
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span> / <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
}

</code></pre>
<p>以这种方式添加的背景不仅仅能将背景放在所有内容的下方。若只在部分元素后突出背景则可以产生一些有趣的效果。</p>
<h3>规范未来会解决这个问题么？</h3>
<p>CSS 网格规范确实没有说明如何为单元格添加背景和边框。工作组与社区的讨论可参考：<a href="https://github.com/w3c/csswg-drafts/issues/499">GitHub上讨论分支</a></p>
<p>如果你的用例场景不好用生成内容解决，那么可以将你的想法添加到该分支。你的意见和用例有助于呈现开发者对该特性的关注点，同时请确定你的意见和用例的准确度。</p>
<h3>请帮忙添加更多示例！</h3>
<p>如果本文让你尝试使用了生成内容，或者如果你已有示例，请将其添加到评论中。在生产环境中用到的网格布局的都是全新的示例，所以，当我们将网格与其他布局方法结合在一起使用时，会有很多“意外之喜”。</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/styling-empty-cells-with-generated-content-and-css-grid-layout](https://www.zcfy.cc/article/styling-empty-cells-with-generated-content-and-css-grid-layout)

## 原文标题
通过生成内容和CSS网格布局为空单元格添加样式

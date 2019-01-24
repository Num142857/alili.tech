---
title: 'CSS Grid 布局揭秘 | Creative Bloq' 
date: 2019-01-25 2:30:23
hidden: true
slug: w693licifkj
categories: [reprint]
---

{{< raw >}}

            <p>CSS Grid 布局揭秘</p>
<p>作者 <a href="http://www.creativebloq.com/author/rachel-andrew">Rachel Andrew</a></p>
<p>深入挖掘 CSS Grid 布局规范，发掘一些你可能不知道的特性，并探索即将到来的特性。</p>
<p><img src="http://p0.qhimg.com/t01076efd495105b1b0.jpg" alt=""></p>
<p>CSS Grid 布局于 2017 年 3 月 开始被浏览器所支持，在撰写本文时，大多数网站有超过百分之70的访问者有 <a href="https://caniuse.com/#search=CSS%20grid%20layout">CSS Grid 特性支持</a>。 这个数据还在快速增长中， 并且在 Edge 浏览器发布更新支持后继续改善。</p>
<p>我希望你之前已经有时间去探索过 CSS Grid 布局的一些特性了。 这篇文章将带你探索一些你可能不知道的特性。 并且了解一下未来阶段中可能实现的规范。</p>
<h3>01. minmax() 函数</h3>
<p>不像其他的布局方式，设置元素大小均要在该元素本身，而在 Grid 布局中，我们在元素的容器级别去设置元素的大小。 我们通过定义网格轨道（Track），创建出网格单元格（Cells），并将内容至于单元格之中。</p>
<p>为了使得内容能都在超出或者小于设计预期时能够灵活的展现， Gird 给 CSS 带来了一些新的特性。 其中一个就是 minmax() 函数。 这个函数意味着你能够指定一个网格轨道的最小值和最大值。</p>
<p>在下面的例子中，我有一个左上角放置标题右边放置图片的小板块。 我想顶行的最小值为 150 像素高， 无论标题有多少行或其他内容所需的空间大小。</p>
<p>然而， 如果内容需要占用多行或者字体更大， 我想这个容器能够增大到 150 像素以上。 此时在这里使用 <strong>minmax()</strong>, , 设置最小值为 150 像素以及一个最大值为 auto。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1.2</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">minmax</span>(150px, auto) <span class="hljs-built_in">minmax</span>(300px,auto);
}

</code></pre><p><img src="http://p0.qhimg.com/t0118202c377064c8de.jpg" alt=""></p>
<p>通过设置行的最小高度， 我们在设计中创建了一个大小刚好的行，即使内容比预想更短一些。</p>
<p><img src="http://p0.qhimg.com/t01eee85a728682b118.jpg" alt=""></p>
<p>minmax() 函数中设置最大值为 auto 意味着如果内容比预想的要多，则不会导致内容溢出。</p>
<p>通过使用 <strong>minmax()</strong>，如果我们只是有一个标题在这个容器中，容器大小比内容所需要的空间更大。 如果我们放入了更长的标题或者附加的文字，它能自动展开空间。</p>
<h3>02. Auto-fill 和 auto-fit</h3>
<p>Flexbox 开启了许多不需要学习媒体查询而实现响应式设计的模式。 Grid 则更进一步，允许元素在两个维度上排列的灵活设计模式： 通过设置行与列。 这种模式实用的地方就在于能够在一个容器中尽可能放入多的列， 为了达到这种效果，我们需要使用两个关键词： <strong>auto-fill</strong> and <strong>auto-fit</strong>。</p>
<p>为了能够在容器中放下尽可能多的 200px 大小的列轨道，我们可以这样：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid1</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(auto-fill, 200px);
}

</code></pre><p>为了能够使所有列都能保持灵活性但始终保持一个  200 像素的最小值， 将上文提到的 <strong>minmax()</strong> 函数带入即可。 我们即可创建至少有200像素最大 1fr 的列。 在放入尽可能多的 200 像素大小的列之后， 浏览器会将所有剩余的空间均分分配给每一列。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid1</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(auto-fill, minmax(200px, auto));
}

</code></pre><p><img src="http://p0.qhimg.com/t01f84c60f92ee1aea0.jpg" alt=""></p>
<p>上图展示了 <strong>auto-fill</strong> 与固定大小列组合以及 <strong>auto-fill</strong> 与 <strong>minmax()</strong> 组合创建的灵活大小列之间的区别。</p>
<p>我在这里使用的 <strong>auto-fill</strong> 关键词； 会使得即使列中没有内容，其所需要占用的空间仍然得到保留。如果使用 <strong>auto-fit</strong>, 任何空的轨道都会自动收缩起来，并将剩余的空间分配给其他的轨道。</p>
<h3>03. 密集填充模式</h3>
<p>当你在元素上声明 <strong>display: grid</strong> 时， 所有的直接子级元素都会成为网格项， 所有的网格项都会自动将其排布在网格之中。 这是由于规范中所定义的自动排列规则。</p>
<p>如果你的网格项包含了其他的轨道， 这意味着将会有其他的网格项将无法填入剩余的轨道之中， 这些网格项将会在网格中新开一行。 默认的， Grid 布局将会按照源内容出现的顺序向前进行内容显示。</p>
<p>然而， 如果你将 <strong>grid-auto-flow</strong> 的值设置为 <strong>dense</strong>, 如果网格中出现空隙，Grid 将会开始回溯源内容，并将源内容中能够填入空隙的一项抽出并填入空隙中。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-auto-flow</span>: dense;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(auto-fill,minmax(200px, 1fr));
}

</code></pre><p><img src="http://p0.qhimg.com/t0189c7538957e1d270.jpg" alt=""></p>
<p>auto-placement 规则会使内容保持默认顺序；这可能会导致布局中出现空隙</p>
<p><img src="http://p0.qhimg.com/t01d440fa9359fd02bd.jpg" alt=""></p>
<p>使用 grid-auto-flow 并设置属性值为 dense，将会开启密集填充模式，将会回填布局中出现的空隙</p>
<p>这种行为在你的网格项中没有逻辑顺序时使用最佳，然而， 使用这个关键词会对使用 tab 导航的人用起来更佳困难。 所以在使用这个特性时一定要充分考虑和测试！</p>
<h3>04. 神奇的网格线和网格区域</h3>
<p>当你使用网格区域模板布局时， 你只要在网格中创建一个命名的区域。 这会使用区域名结尾加上 <strong>-start</strong> 和 <strong>-end</strong> 依次地创建一组列网格线和行网格线。 在接下来的例子中， 我使用了由命名区域所创建的命名网格线去创建一个遮罩层。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">2</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-auto-rows</span>: <span class="hljs-built_in">minmax</span>(100px, auto);
  <span class="hljs-attribute">grid-template-areas</span>: 
    <span class="hljs-string">"sd1 content sd2"</span>
    <span class="hljs-string">"sd1 footer  sd2"</span>;
}
<span class="hljs-selector-class">.side1</span> { <span class="hljs-attribute">grid-area</span>: sd1; }
<span class="hljs-selector-class">.side2</span> { <span class="hljs-attribute">grid-area</span>: sd2; }
<span class="hljs-selector-class">.content</span> { <span class="hljs-attribute">grid-area</span>: content; }
<span class="hljs-selector-class">.footer</span> { <span class="hljs-attribute">grid-area</span>: footer; }

<span class="hljs-selector-class">.grid</span> <span class="hljs-selector-class">.overlay</span> {
  <span class="hljs-attribute">grid-column</span>: sd1-start / sd2-end;
  <span class="hljs-attribute">grid-row</span>: content-start / footer-end;
}

</code></pre><p>当你使用命名网格线时也可以犯规来用。 如果你将行和列网格线的命名以 <strong>-start</strong> 和 <strong>-end</strong> 结尾， 实际上你会创建了一个以网格线主名称所命名的命名区域。</p>
<p>一个以 <strong>content-start</strong> 和 <strong>content-end</strong> 定义的行和列的区域， 将会赋予名字 content。 你只需使用 <strong>grid-area: content</strong> 即可把内容存放在该区域中。</p>
<p><img src="http://p0.qhimg.com/t01ef6f15fc787d4f0f.jpg" alt=""></p>
<p>遮罩层使用命名区域中创建的命名网格线，置于网格区域的的顶端</p>
<h3>05. 默认对齐方式</h3>
<p>当一个元素变成网格项时， 默认的行为则是将此元素拉开布满所在的网格区域中； 除非元素本身是具有一定纵横比例的。 如果元素具有纵横比例， 元素将会被对齐到行列方向的起始网格线上。 这就意味着 Grid 将不会将你的图像拉伸而丢失原有比例， 当然你也可以通过调整对齐行为去改变这个默认的行为。</p>
<h3>06. 预设机制</h3>
<p>在 CSS Grid 规范中有详细的介绍了 CSS Grid 布局是如何覆盖其他布局方法的。 如果你的网格元素中有浮动的，使用 <strong>display: table</strong> 或 <strong>display: inline-block</strong> 的，规范中有介绍到会发生的行为。</p>
<p>简单地来说，如果元素成为了网格元素，你会发现：</p>
<ul>
<li><p>如果元素浮动了， 或者使用了清除属性，这些属性对元素产生的影响会被限制</p>
</li>
<li><p>如果使用了 <strong>display: inline-block</strong> 或其他表格属性如 <strong>display: table-cell</strong>， 这些属性将不再生效</p>
</li>
<li><p>以表格属性的例子， 在没有父表格容器的情况下使用 <strong>display: table-cell</strong> 也将不会生成匿名元素</p>
</li>
<li><p><strong>vertical-align</strong> 属性将不再生效</p>
</li>
</ul>
<p>你可以在 <a href="https://rachelandrew.co.uk/css/cheatsheets/grid-fallbacks">我的网站</a> 中找到这些覆盖行为的例子</p>
<p>大多数情况下这些覆盖行为都不会有问题，你还需要去关注一下后面会变成网格项的元素的宽度。 在之前的布局方式中，我们是在元素本身控制其宽度的。</p>
<p>而在 Grid 中，我们将元素置于网格项中并被其制约。这就意味着如果你使用百分比设置元素的长度，这个百分比在 Grid 布局中会转换成网格区域的的长度百分比。</p>
<p>这个问题的解决办法就是通过另一个 CSS 规范：特性查询。 我们可以使用特性查询去测试是否支持 Grid 布局。 如果浏览器支持 Grid， 则将长度设置为 auto。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.grid</span> &gt; <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">33.333%</span>;
}
@<span class="hljs-keyword">supports</span> (display: grid) {
  <span class="hljs-selector-class">.grid</span> &gt; <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: auto;
  }
}

</code></pre><h3>07. 使用 min-content 和 max-content 控制大小</h3>
<p>在 CSS Intrinsic &amp; Extrinsic Sizing Module Level 3 规范中为大小控制定义了附加的关键字。 这些关键字包括 <strong>min-content</strong> 和 <strong>max-content</strong>， 都可被用于定义网格轨道的大小。</p>
<p>以一个非常简单的例子， 我创建了一个两列轨道的网格。 一列使用 <strong>min-content</strong> 定义大小， 第二列使用 <strong>max-content</strong>。 第一列的大小仅为刚好能够放下一个单词的大小 -- 这也是这条轨道大小的最小值。 第二条轨道则扩增到能够装下正行文字的大小， 你会发现这可能会触发溢出问题同时需要去解决。</p>
<pre><code class="hljs maxima">.<span class="hljs-built_in">grid</span> {
  <span class="hljs-built_in">display</span>: <span class="hljs-built_in">grid</span>;
  <span class="hljs-built_in">grid</span>-template-<span class="hljs-built_in">columns</span>: <span class="hljs-built_in">min</span>-<span class="hljs-built_in">content</span> <span class="hljs-built_in">max</span>-<span class="hljs-built_in">content</span>;
}

</code></pre><p><img src="http://p0.qhimg.com/t01e9ff5830f255a535.jpg" alt=""></p>
<p>设置了 <strong>min-content</strong> 的一列仅为能够放下单个单词的宽度；设置了 <strong>max-content</strong> 的一列则扩张到能够显示整句的长度</p>
<h3>Level 2 特性</h3>
<p>Grid 规范现在已经在候选推荐状态了， 这意味着将不会再对规范进行大的改动；相反的，目前正处于寻求至少两个对每个特性的实现的阶段。 这保证了规范合理并且能被浏览器所实现。</p>
<p>Grid 仍然在有一些变化，然而，在本篇文章剩余的篇幅中，我们将会去探讨 Level 1 规范近期的一些变化，以及在 Level 2 中值得期待的东西。</p>
<h3>08. 改变中的间距设置</h3>
<p><strong>grid-gap</strong> 简写，以及其全写 <strong>grid-column-gap</strong> 和 <strong>grid-row-gap</strong> 属性在 2017 年 8 月的工作组会议中修改为 <strong>gap</strong>, <strong>column-gap</strong> 和 <strong>row-gap</strong>。对它们的定义也已经相应的移到 Box Alignment 规范中。</p>
<p>这篇规范中将 Flexbox 里已有的很好的对齐特性取出并进行扩展，使得这些特性能够在 Grid 中使用 -- 还可能应用于其他布局方法中。</p>
<p>将间距特性放入 Box Alignment 规范并将其重新命名至更通用的形式中，意味着这些功能在其他布局类型中使用会更加合理。 很显然在 Flexbox 中使用是合理的。</p>
<p>这次重命名意味着我们最终也会在 Flexbox 中获得更好的间距支持；再也不用纠结使用 margin 了。浏览器会将旧的命名别名至新的命名上， 所以如果你的代码中使用了旧的命名也不会出现问题。 然而， 你最好还是将两个属性都添加上去；浏览器会忽略不支持的那一个。</p>
<h3>09. Gird 并不是瀑布流布局</h3>
<p>当人们看到本文前面所演示的密集填充模式时， 会经常想 Grid 能做到瀑布流布局的模式。 然而，瀑布流属于完全不同的一类布局。 一个标准的瀑布流布局并不是一个严格的网格， 这种布局是介于 Flexbox 善于做的和 Grid 能做的之间。</p>
<p>然而在 CSS 工作组中我们也有想过这个问题。 我们知道这是开发者们非常想实现的特性。 你可以在 <a href="https://github.com/w3c/csswg-drafts/issues/945">CSS 规范设计草案 的 Github 仓库中</a> 找到讨论， 同时你也可以发表你的想法。</p>
<h3>10. 网格区域的伪元素</h3>
<p>另一个 Grid 布局的常见特性需求就是能够在不通过内置元素的情况下对网格单元格设置样式。 当前，如果你要在一个区域中添加边框需要通过添加一个空元素去实现， 或者通过已生成的内容去创建一个能够添加样式的网格项。</p>
<p>这里有一个关于考虑为网格区域添加伪元素的 <a href="https://github.com/w3c/csswg-drafts/issues/499">issue</a> 。 如果你想对指定的区域添加背景或者边框，这将会给你带来选择这些区域的能力，而不需要添加而外的标记代码或使用已生成的内容去达到效果。</p>
<p><em>本篇文章源于</em> <a href="https://www.myfavouritemagazines.co.uk/design/net-magazine-subscription/"><em>net magazine</em></a> 中的 issue 298_, 这个杂志为专业的 web 设计师和开发者 – 提供最新最潮的 web 技术和技巧_ <a href="https://www.myfavouritemagazines.co.uk/design/net-magazine-back-issues/net-october-2017-issue-298/">_在此购买 issue 298</a> _或_ <a href="https://www.myfavouritemagazines.co.uk/design/net-magazine-subscription/">_在此订阅此杂志 </a>_._</p>
<p><strong>喜欢这篇文章？还可以读读这些</strong></p>
<ul>
<li><p><a href="http://www.creativebloq.com/how-to/create-a-responsive-layout-with-css-grid">Create a responsive layout with CSS Grid</a></p>
</li>
<li><p><a href="http://www.creativebloq.com/features/get-up-to-speed-with-css-grid">Get up to speed with CSS Grid</a></p>
</li>
<li><p><a href="http://www.creativebloq.com/advice/a-guide-to-writing-better-css">A guide to writing better CSS</a></p>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS Grid 布局揭秘 | Creative Bloq

## 原文链接
[https://www.zcfy.cc/article/css-grid-layout-secrets-revealed-creative-bloq](https://www.zcfy.cc/article/css-grid-layout-secrets-revealed-creative-bloq)


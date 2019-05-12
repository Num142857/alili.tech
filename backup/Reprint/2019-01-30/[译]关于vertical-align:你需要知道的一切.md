---
title: '[译]关于vertical-align:你需要知道的一切' 
date: 2019-01-30 2:30:23
hidden: true
slug: wwqkdgtx0w
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文：<a href="http://christopheraue.net/2014/03/05/vertical-align/" rel="nofollow noreferrer" target="_blank">Vertical-Align: All You Need To Know</a></p></blockquote>
<p>通常我都有需要垂直对齐在一排上一个接着一个的元素。<br>CSS提供了很多种可能性。有时，我听过<code>float</code>来解决问题，有时使用<code>position:absolute</code>，有时甚至会通过添加<code>margin</code>或者<code>padding</code>属性这种使代码变得比较脏的方式来达到目的。</p>
<p>我一点也不喜欢上面这些解决方案。浮动仅仅是顶部对齐并且需要手动清除浮动。绝对定位让元素脱离文档流，所以他们不再影响他们的周边元素。而使用固定值的外边距和内边距会出现细微的差别。</p>
<p>但是这里还有另外一种玩法:<code>vertical-align</code>。我认为他值得更多的赞誉。OK，技术上来说使用<code>vertical-align</code>布局是一种hack的手段，因为他并不是因为实现我们上面那种需求发明的。尽管如此，你也可以在不同的上下文中使用<code>vertical-align</code>来灵活细致的摆放元素。不需要知道元素的大小。元素在文档流中，也能感知其他元素尺寸的改变。这些都让<code>vertical-align</code>变成了更有价值的选项。</p>
<h2 id="articleHeader0">独特的<code>vertical-align</code>
</h2>
<p>但是，<code>vertical-align</code>有时也是个卑鄙小人。使用它工作也会使人有点沮丧。在使用它工作时，这里会有一些令人难以理解的规则。例如，它可能会发生这样的情况，一个元素改变了他自己的<code>vertical-align</code>的值，而他的位置却一点都没有改变，改变的却是同行的其他元素。我仍然会一次一次被拉入这种奇怪的现象，使我苦恼。</p>
<p>不幸的是，大多数资料都讲述的比较浅显。特别是，当我们想使用<code>vertical-align</code>布局时。他们对最基本的属性进行了介绍并且在简单的例子中解释元素是如何在一行中进行摆放的。但是，他们并没有去解释它令人感到奇怪的部分。</p>
<p>所以，我的目标是使自己彻底弄清楚<code>vertical-align</code>到底是怎么回事。最后消解我疑问的是W3C's的<a href="https://www.w3.org/TR/CSS2/visuren.html#inline-formatting" rel="nofollow noreferrer" target="_blank">CSS specifications</a>和标准中演示的一些例子。答案就在文章中。</p>
<p>所以，让我们来解决掉这场关于规则的游戏吧。</p>
<h2 id="articleHeader1">使用<code>vertical-align</code>的要求</h2>
<p><code>vertical-align</code>被用于<a href="https://www.w3.org/TR/CSS2/visuren.html#inline-level" rel="nofollow noreferrer" target="_blank">inline-level elements</a>。这些元素的display属性如下</p>
<ul>
<li><p>inline</p></li>
<li><p>inline-block</p></li>
<li><p>inline-table(这篇文章中，并不考虑这种情况)</p></li>
</ul>
<p>基本的inline元素都是标签裹着文字。</p>
<p>inline-block元素：是在行内中的块级元素。他们可以有宽度和高度(通常情况下，这取决于他们的内容)。同样也有padding，margin，border。</p>
<p>行内级元素在一行中一个挨着一个。一旦，这些元素超出了他们的所在行，一个新行便会建立在它下方。这里的每一行就叫做line box。每一行不同尺寸的元素意味着line box不同的高度。在下面的例子中红线代表line box的顶部和底部。</p>
<p>line box寻找我们放置元素的轨迹。在这些line boxes里面<code>vertical-align</code>属性负责摆放单独的元素。所以什么样的元素被用来对齐了呢？</p>
<h2 id="articleHeader2">关于基线和边界线</h2>
<p>在一行中垂直摆放元素，最关键的参考点是参与的元素的基线。在一些例子中，被关闭盒子的顶部和底部也变得非常重要。让我们一起看看基线和外边缘是如何参与到不同类型的元素中的。</p>
<h3 id="articleHeader3">Inline Element</h3>
<p><span class="img-wrap"><img data-src="/img/bVGi8M?w=1438&amp;h=136" src="https://static.alili.tech/img/bVGi8M?w=1438&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这里有三行挨着的文字。顶部和底部的边缘线是行高的边缘线，它们都是红线。字体的高度被绿线包裹着。蓝色的线代表基线。在最左边，文字的行高和字体本身的高度一样高。绿线和红线发生了重叠。在中间，行高是字体大小的2倍高。在最右边，行高是字体大小的一半高。</p>
<p><strong>inline element的外边缘的位置</strong>，取决于他们的行高的顶部与底部边缘。如果行高的高度比字体的高度小。那么，红色的外边缘的位置就如上面提到的一样。</p>
<p><strong>inline element的基线</strong>，在字符放置的位置。在图中，用蓝线表示。初略的讲，基线的位置一般是在字体高度一半以下的位置。可以看看W3C的标准对它的定义，<a href="https://www.w3.org/TR/CSS2/visudet.html#leading" rel="nofollow noreferrer" target="_blank">detailed definition</a>。</p>
<h3 id="articleHeader4">Inline-Block Element</h3>
<p><span class="img-wrap"><img data-src="/img/bVGjaU?w=1364&amp;h=210" src="https://static.alili.tech/img/bVGjaU?w=1364&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从左边到右边的图你可以看到：最左，一个在<a href="https://www.w3.org/TR/CSS21/visuren.html#positioning-scheme" rel="nofollow noreferrer" target="_blank">in-flow</a>内的行内块级元素。中间，一个在文档流中的inline-block元素并且带有<code>overflow: hidden</code>属性的元素。最右，不在文档流中的inline-block元素(但是内容区域有高度)。margin的边界线指向红线，border是黄色的部分，padding是绿色的部分，内容区域是蓝色的部分。每一个inline-block元素的基线都用蓝线表示。</p>
<p><strong>inline-block元素的外边缘</strong> 是它的<a href="https://www.w3.org/TR/CSS2/box.html#x17" rel="nofollow noreferrer" target="_blank">margin-box</a>的顶部和底部。在图上，用红线来表示。</p>
<p><strong>inline-block元素的基线</strong> 依赖于元素是否是文档流中的元素。</p>
<ul>
<li><p>假设内容在文档流中，inline-block元素的基线是普通流中的最后一个内容元素的基线（最左的例子）。对于最后一个元素的基线根据它自己的规则来找寻。</p></li>
<li><p>假设内容在文档流中，但是元素有<code>overflow</code>属性除了属性值为<code>visible</code>这种情况，基线在margin-box的底部（最中间的例子）。所以，这等同于在inline-block元素的底部边缘。</p></li>
<li><p>假设内容不在文档流中，同样的，margin-box的底部边缘也是基线的位置所在。（例子在最右边）</p></li>
</ul>
<h3 id="articleHeader5">Line Box</h3>
<p><span class="img-wrap"><img data-src="/img/bVGjdA?w=1390&amp;h=198" src="https://static.alili.tech/img/bVGjdA?w=1390&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你已经看到了上面元素的放置。这次，我画了line box的text box顶部和底部的线(如图中的绿线,更多内容看下文)，基线如图中蓝色的线。我在文字元素上加了灰色的背景进行强调。</p>
<p>line box的顶部边缘与最顶部元素的顶线对齐，底部边缘与最底部元素的底线对齐。图中红线代表的就是line box。</p>
<p><strong>line box的基线</strong>是多种多样的</p>
<p>“CSS2.1 并没有对line box基线的位置有明确的定义。-<a href="https://www.w3.org/TR/CSS2/visudet.html#line-height" rel="nofollow noreferrer" target="_blank">W3C Specs</a>”</p>
<p>当使用vertical-align工作时，这可能是最令人迷惑的部分。这意味着，基线的位置改变是为了满足像垂直对齐和降低line box的高度这样的需求的。也就是说，在方程中，这是一个自由的参数。</p>
<p>因为line box的基线是不可见的，因此它的位置并不会那么明显。但是，你可以容易的使它变得可见。只需要在一行的开头加上一个字母，就像我在图中添加的字母"x"。如果这个字母并没排在一条直线上，那么x坐落的位置就是基线的位置。</p>
<p>在line box基线的周围有<strong>text box</strong>。text box可以简单的被认为是在line box中的行内元素。它的高度等同于它的父元素的文字大小。因此，text box仅仅只是围绕着line box的非格式化文字。这个盒子在上图中是指向绿线的位置。text box与基线的位置相关联，它随着基线而移动。</p>
<p>哦，现在是最难的部分。<strong>现在，我们把知道的所有事，都表现在了上图中</strong>。让我们快速的总结最重要的部分：</p>
<ul>
<li><p>这里有一个区域被叫做line box。这是元素垂直对齐的区域。它有一个基线和一个text box以及顶部与底部边缘。</p></li>
<li><p>这里有inline-level元素。他们是被对齐的对象。他们有基线以及顶部与底部边缘。</p></li>
</ul>
<h2 id="articleHeader6">Vertical-Align的值</h2>
<p>通过使用<code>vertical-align</code>的参考点，也就是上文提到的基线和边界线，将元素放置在合适的位置。</p>
<h3 id="articleHeader7">相对于line box的基线放置元素的基线</h3>
<p><span class="img-wrap"><img data-src="/img/bVGjlz?w=1426&amp;h=136" src="https://static.alili.tech/img/bVGjlz?w=1426&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><strong>baseline:</strong> 元素的基线刚好放置在line box基线的上。</p></li>
<li><p><strong>sub:</strong> 元素的基线放置在line box基线的下面。</p></li>
<li><p><strong>super:</strong> 元素的基线放置在line box的基线的上面。</p></li>
<li><p><strong>&lt;percentage&gt;</strong> 元素的基线移动相对于line box的基线通过相对于line-height的百分比的值来移动。</p></li>
<li><p><strong>&lt;length&gt;:</strong> 元素的基线相对于line box的基线通过绝对值的大小进行移动。</p></li>
</ul>
<h3 id="articleHeader8">相对于line box的基线放置元素的外边缘</h3>
<p><span class="img-wrap"><img data-src="/img/bVGjmt?w=1390&amp;h=88" src="https://static.alili.tech/img/bVGjmt?w=1390&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p><strong>middle:</strong> 元素的顶部与底部边缘的中点相对于line box的基线移动x-height的一半的位置对齐。</p></li></ul>
<h3 id="articleHeader9">相对于line box的text box放置元素的外边缘</h3>
<p><span class="img-wrap"><img data-src="/img/bVGjns?w=1416&amp;h=162" src="https://static.alili.tech/img/bVGjns?w=1416&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><strong>text-top:</strong> 元素的顶部边缘被放置在line box的text box的顶部边缘</p></li>
<li><p><strong>text-bottom:</strong> 元素的底部边缘被放置在line box的text box的底部边缘</p></li>
</ul>
<h3 id="articleHeader10">相对于line box的外边缘放置元素的外边缘</h3>
<p><span class="img-wrap"><img data-src="/img/bVGjny?w=1404&amp;h=176" src="https://static.alili.tech/img/bVGjny?w=1404&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul>
<li><p><strong>top：</strong> 元素的顶部边缘被放置在line box的顶部边缘</p></li>
<li><p><strong>bottom：</strong> 元素的底部边缘被放置在line box的底部边缘</p></li>
</ul>
<p>在W3C标准中的<a href="https://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align" rel="nofollow noreferrer" target="_blank">定义</a></p>
<h2 id="articleHeader11">Vertical-Align的行为就如它的表现一样</h2>
<p>现在，我们可以在具体的例子中看垂直对齐。特别是，处理一些比较容易出现差错的情况。</p>
<h3 id="articleHeader12">放置icon在中间</h3>
<p>这是一个一直以来都令我烦恼的事情：我有一个icon我想将它放置在一行文字的中间。只只仅仅将icon设置<code>vertical-align: middle</code>，看起来似乎不是一个安全的方法。看下面的例子。</p>
<p><span class="img-wrap"><img data-src="/img/bVGjo3?w=1012&amp;h=92" src="https://static.alili.tech/img/bVGjo3?w=1012&amp;h=92" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- left mark-up -->
<span class=&quot;icon middle&quot;></span>
Centered?

<!-- right mark-up -->
<span class=&quot;icon middle&quot;></span>
<span class=&quot;middle&quot;>Centered!</span>

<style type=&quot;text/css&quot;>
  .icon   { display: inline-block;
            /* size, color, etc. */ }

  .middle { vertical-align: middle; }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
Centered?

<span class="hljs-comment">&lt;!-- right mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"middle"</span>&gt;</span>Centered!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.icon</span>   { <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.middle</span> { <span class="hljs-attribute">vertical-align</span>: middle; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这里也是上面这个例子，不过，这次我加了一些你从上文了解到的辅助线，</p>
<p><span class="img-wrap"><img data-src="/img/bVGjpV?w=1426&amp;h=120" src="https://static.alili.tech/img/bVGjpV?w=1426&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这有助于帮我们理解。因为在左边的文字并没有对齐元素，而是被放置在基线所处的位置。通过使用<code>vertical-align:middle</code>来对齐盒子，我们将只是将盒子放置在了小写字母的中间。所以，出头部分的字母出现在顶部。</p>
<p>在右边，我们将全部文字区域放置在垂直方向的中点。通过移动text的基线到line box的基线的下方来实现。结果是文字完美的居中于紧挨着的icon。</p>
<h3 id="articleHeader13">移动line box的基线</h3>
<p>当我们使用<code>vertical-align</code>工作时，容易遇到的一个共同的问题：line box的基线会被在同一行中所有元素影响。让我们猜一猜，一个元素有可能在这样被对齐的，通过移动line box的基线。因为大多数垂直对齐（除了顶部和底部）都是相对于基线，这也会导致在同一行的的所有元素的位置都会被调整。</p>
<p>一些例子：</p>
<ul><li><p>如果在一行中，有一个高的元素占据了整行的高度，<code>vertical-align</code>对它不会有任何影响。在它的顶部上面与底部下面没有任何多余的空间可以移动它。为了实现它相对于line box基线的对齐，line box的基线必须移动。矮一点的盒子设置了<code>vertical-align: baseline</code>。在左边，高盒子根据<code>text-bottom</code>对齐。在右边，根据<code>text-top</code>对齐。你可以看到矮盒子的随着基线位置的改变而改变。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVGjIK?w=1296&amp;h=226" src="https://static.alili.tech/img/bVGjIK?w=1296&amp;h=226" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- left mark-up -->
<span class=&quot;tall-box text-bottom&quot;></span>
<span class=&quot;short-box&quot;></span>

<!-- right mark-up -->
<span class=&quot;tall-box text-top&quot;></span>
<span class=&quot;short-box&quot;></span>

<style type=&quot;text/css&quot;>
  .tall-box,
  .short-box   { display: inline-block;
                /* size, color, etc. */ }

  .text-bottom { vertical-align: text-bottom; }
  .text-top    { vertical-align: text-top; }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"short-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- right mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"short-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.tall-box</span>,
  <span class="hljs-selector-class">.short-box</span>   { <span class="hljs-attribute">display</span>: inline-block;
                <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.text-bottom</span> { <span class="hljs-attribute">vertical-align</span>: text-bottom; }
  <span class="hljs-selector-class">.text-top</span>    { <span class="hljs-attribute">vertical-align</span>: text-top; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>通过其他<code>vertical-align</code>的值对齐高的元素，也会出现和上面的例子相同的行为。</p>
<ul><li><p>同样的给它设置<code>vertical-align</code>的值分别设为<code>left</code>和<code>bottom</code>移动基线。而这很奇怪，因为基线本不应该参与。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- left mark-up -->
<span class=&quot;tall-box bottom&quot;></span>
<span class=&quot;short-box&quot;></span>

<!-- right mark-up -->
<span class=&quot;tall-box top&quot;></span>
<span class=&quot;short-box&quot;></span>

<style type=&quot;text/css&quot;>
  .tall-box,
  .short-box { display: inline-block;
               /* size, color, etc. */ }

  .bottom    { vertical-align: bottom; }
  .top       { vertical-align: top; }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"short-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- right mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"short-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.tall-box</span>,
  <span class="hljs-selector-class">.short-box</span> { <span class="hljs-attribute">display</span>: inline-block;
               <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.bottom</span>    { <span class="hljs-attribute">vertical-align</span>: bottom; }
  <span class="hljs-selector-class">.top</span>       { <span class="hljs-attribute">vertical-align</span>: top; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGjJY?w=1294&amp;h=228" src="https://static.alili.tech/img/bVGjJY?w=1294&amp;h=228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- left mark-up -->
<span class=&quot;tall-box bottom&quot;></span>
<span class=&quot;short-box&quot;></span>

<!-- right mark-up -->
<span class=&quot;tall-box top&quot;></span>
<span class=&quot;short-box&quot;></span>

<style type=&quot;text/css&quot;>
  .tall-box,
  .short-box { display: inline-block;
               /* size, color, etc. */ }

  .bottom    { vertical-align: bottom; }
  .top       { vertical-align: top; }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"short-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- right mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"short-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.tall-box</span>,
  <span class="hljs-selector-class">.short-box</span> { <span class="hljs-attribute">display</span>: inline-block;
               <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.bottom</span>    { <span class="hljs-attribute">vertical-align</span>: bottom; }
  <span class="hljs-selector-class">.top</span>       { <span class="hljs-attribute">vertical-align</span>: top; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<ul><li><p>在一行中，放置两个大体积元素并且移动基线垂直对齐他们以此满足同时对齐。line box的高度被调整（左边的例子）。添加第三个元素，它并有跑到line box的边缘因为它的对齐属性，既没有影响line box的高度，也没有影响line box基线的位置（中间的例子）。如果它真的跑到了line box的边缘，我们的前两个盒子会被往下推（最右的例子）。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVGjSO?w=1260&amp;h=374" src="https://static.alili.tech/img/bVGjSO?w=1260&amp;h=374" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- left mark-up -->
<span class=&quot;tall-box text-bottom&quot;></span>
<span class=&quot;tall-box text-top&quot;></span>

<!-- mark-up in the middle -->
<span class=&quot;tall-box text-bottom&quot;></span>
<span class=&quot;tall-box text-top&quot;></span>
<span class=&quot;tall-box middle&quot;></span>

<!-- right mark-up -->
<span class=&quot;tall-box text-bottom&quot;></span>
<span class=&quot;tall-box text-top&quot;></span>
<span class=&quot;tall-box text-100up&quot;></span>

<style type=&quot;text/css&quot;>
  .tall-box    { display: inline-block;
                 /* size, color, etc. */ }

  .middle      { vertical-align: middle; }
  .text-top    { vertical-align: text-top; }
  .text-bottom { vertical-align: text-bottom; }
  .text-100up  { vertical-align: 100%; }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- mark-up in the middle --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- right mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-100up"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.tall-box</span>    { <span class="hljs-attribute">display</span>: inline-block;
                 <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.middle</span>      { <span class="hljs-attribute">vertical-align</span>: middle; }
  <span class="hljs-selector-class">.text-top</span>    { <span class="hljs-attribute">vertical-align</span>: text-top; }
  <span class="hljs-selector-class">.text-bottom</span> { <span class="hljs-attribute">vertical-align</span>: text-bottom; }
  <span class="hljs-selector-class">.text-100up</span>  { <span class="hljs-attribute">vertical-align</span>: <span class="hljs-number">100%</span>; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader14">解开Vertical-Align的神秘面纱</h2>
<p>当你知道了规则，这就没那么复杂了。如果<code>vertical-align</code>并没有按照你想的那样行动，问自己两个问题：</p>
<ul>
<li><p>line box的顶部与底部边缘和基线在哪里？</p></li>
<li><p>inline-level元素的顶部与底部边缘和基线在哪里？</p></li>
</ul>
<p>这将解决你的问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]关于vertical-align:你需要知道的一切

## 原文链接
[https://segmentfault.com/a/1190000007663895](https://segmentfault.com/a/1190000007663895)


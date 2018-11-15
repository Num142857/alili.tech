---
title: Vertical-Align，你应该知道的一切
hidden: true
categories: reprint
slug: 9a1cab33
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>好，我们聊聊<code>vertical-align</code>。这个属性主要目的用于将相邻的文本与元素对齐。而实际上，<code>verticle-algin</code>可以在不同上下文中灵活地对齐元素，以及进行细粒度的控制，不必知道元素的大小。元素仍然在文档流中，因而其他元素可以根据它们大小的变化进行相应的调整。一个有用的例子就是居中图标与旁边的文本。</p>
<h2>Vertical-Align是个怪物</h2>
<p>可是，<code>vertical-align</code>有时候也很难搞，经常导致困惑。好像有什么神秘的规则在起作用。比如，我们改变了某个元素的<code>vertical-align</code>而它的对齐方式却并未改变，反倒是同一行的其他元素的对齐方式变了！我时不时地仍然会掉到<code>vertical-align</code>的坑里，绝望无助。</p>
<p>遗憾的是，关于这方面的资料大都讲得很肤浅。尤其是针对布局的情况。很多文章概念错乱，试图把元素中的一切都垂直对齐。它们介绍了这个属性的基本概念，解释了简单情况下元素的对齐，却没涉及真正棘手的部分。</p>
<p>因此，我给自己设定了一个目标：<strong>彻底摸清<code>vertical-align</code>的行为</strong>。然后我就死啃W3C的<a href="http://www.w3.org/TR/CSS2/visudet.html#line-height">CSS</a><a href="http://www.w3.org/TR/CSS2/visuren.html#inline-formatting">规范</a>，同时也尝试了一些例子。最终写出了这篇文章。</p>
<p>好，下面我们就开始吧。</p>
<h2>对哪些元素可以使用Vertical-Align</h2>
<p><code>vertical-align</code>用于对齐<a href="http://www.w3.org/TR/CSS2/visuren.html#inline-level">行内元素</a>。所谓行内元素，即<code>display</code>属性值为下列之一的元素：</p>
<ul>
<li><code>inline</code></li>
<li><code>inline-block</code></li>
<li><code>inline-table</code> （本文未涉及）</li>
</ul>
<p>其中，<strong>行内元素（inline element）</strong>就是包含文本的标签。</p>
<p>而<strong>行内块元素（inline-block element）</strong>，顾名思义，就是位于行内的块元素。可以有宽度和高度（可以由其内容决定），也可以有内边距、边框和外边距。</p>
<p>行内级元素会相互挨着排成行。如果一行排不下，就会在下方再建一行。所有行都会创建所谓的<strong>行盒子</strong>，行盒子装着自己行中的所有内容。内容的高度不同，行盒子的高度也不同。在下面的示意图中，行盒子的顶部和底部用红色点线表示。</p>
<p><img src="//p0.ssl.qhimg.com/t019d2177c3989a5af4.png" alt=""></p>
<p>这些行盒子限定了我们可以影响的范围。在行盒子内部，可以通过<code>vertical-align</code>来对齐个别元素。<strong>那么，相对于什么来对齐元素呢？</strong></p>
<h2>基线与外边界</h2>
<p>垂直对齐最重要的参考点，就是相关元素基线。某些情况下，行盒子的上下外边界也会成为参考点。下面我们就来看一看相关元素类型的基线和外边界。</p>
<h3>行内元素</h3>
<p><img src="//p0.ssl.qhimg.com/t01dce9e836392664a6.png" alt=""></p>
<p>这里有三行文本紧挨着。红线表示行高的顶边和底边，绿线表示字体高度，蓝线表示基线。左边这一行，行高与字体高度<strong>相同</strong>，因此上下方的红色和绿线重叠在了一起。中间一行，行高是<code>font-size</code>的两倍。右边一行，行高为<code>font-size</code>的一半。</p>
<p><strong>行内元素的外边界</strong>与自己行高的上、下边对齐。行高比<code>font-size</code>小不小<strong>并不重要</strong>。因此上图中红线同时也就表示外边界。</p>
<p><strong>行内元素的基线</strong>是字符恰好位于其上的那条线，也就是图中的蓝线。大致来说，基线总是穿过<strong>字体高度一半以下</strong>的某一点。可以参考W3C规范中<a href="http://www.w3.org/TR/CSS2/visudet.html#leading">详细的定义</a>。</p>
<h3>行内块元素</h3>
<p><img src="//p0.ssl.qhimg.com/t012330560a7eda5aa9.png" alt=""></p>
<p>从左到右：包含<a href="http://www.w3.org/TR/CSS21/visuren.html#positioning-scheme">流内</a>内容（“c”）的行内块、包含流内内容且设置了溢出（<code>overflow: hidden</code>）的行内块和未包含流内内容（但内容区有高度）的行内块。红线表示外边距的边界，黄色是边框，绿色的内边距，蓝色是内容区，蓝线是每个行内块元素的基线。</p>
<p><strong>行内块元素的外边界</strong>即其<a href="http://www.w3.org/TR/CSS2/box.html#x17">外边距盒子</a>的上、下两边，也就是图中的红线。</p>
<p><strong>行内块元素的基线</strong>取决于元素是否包含流内内容：</p>
<ul>
<li>有流内内容的行内块元素，基线就是正常流中最后内容元素的基线（左）。这个最后元素的基线是按照它自己的规则找到的。</li>
<li>有流内内容但<code>overflow</code>属性值不是<code>visible</code>的行内块元素，基线就是外边距盒子的底边（中）。也就是与行内块元素的下外边界重合。</li>
<li>没有流内内容的行内块元素，基线同样是外边距盒子的底边（右）。</li>
</ul>
<h3>行盒子</h3>
<p><img src="//p0.ssl.qhimg.com/t01fd081c38a5e4a082.png" alt=""></p>
<p>这张图前面出现过。但这次我们画出了行盒子的文本盒子的上、下边（绿色，下面详细介绍）还有基线（蓝色）。同时，还用灰色背景表示了文本元素的区域。</p>
<p>行盒子的<strong>顶边</strong>与该行中最顶部元素的顶边重合，<strong>底边</strong>与该行中最底部元素的底边重合。因此图中的红线表示的就是行盒子。</p>
<p><strong>行盒子的基线</strong>是个变量：</p>
<blockquote>
<p>CSS 2.1没有定义行盒子的基线。</p>
<p>— <a href="http://www.w3.org/TR/CSS2/visudet.html#line-height">W3C规范</a></p>
</blockquote>
<p>在使用<code>vertical-align</code>时这一块应该是最令人困惑的了。也就是说，基线画在哪里需要满足很多条件，比如要符合<code>vertical-align</code>指定的条件，同时还要保证行盒子高度最小。这是个自由变量。</p>
<p>因为行盒子的基线并不可见，所以有时候不容易确定它的位置。但实际上有个简单的办法可以令其可见。只要在相关行的开头加上一个字母，比如上图中开头的“x”即可。如果这个字母没有被设置对齐，那么它默认就位于基线之上。</p>
<p>围绕基线的是行盒子中的<strong>文本盒子</strong>。可以简单地把文本盒子看成行盒子内部未经对齐的行内元素。文本盒子的高度等于其父元素的<code>font-size</code>。因此，文本盒子只是用来盛放未经格式化的文本的。上图中的绿线表示的就是文本盒子。由于文本盒子与基线关联，所以基线移动它也会跟着移动。（W3C规范里称这个文本盒子为<a href="http://www.w3.org/TR/CSS2/visudet.html#strut">strut</a>。）</p>
<p>终于把最难的部分讲完了。<strong>现在，我们已经知道了对齐相关的一切要素</strong>。下面简单总结一下最重要的两点。</p>
<ul>
<li>有一个区域叫<strong>行盒子</strong>。行盒子中的内容可以垂直对齐。行盒子有<strong>基线</strong>、<strong>文本盒子</strong>，还有上边和下边。</li>
<li>还有<strong>行内元素</strong>，也就是可以被对齐的对象。行内元素有<strong>基线</strong>，以及上边和下边。</li>
</ul>
<h2>Vertical-Align的值</h2>
<p>使用<code>vertical-align</code>，前面提到的参考点就会按照某种关系被设置好。</p>
<h3>对齐行内元素的基线和行盒子的基线</h3>
<p><img src="//p0.ssl.qhimg.com/t01c233f2926380e5ae.png" alt=""></p>
<ul>
<li><strong><code>baseline</code></strong>：元素基线与行盒子基线重合。</li>
<li><strong><code>sub</code></strong>：元素基线移动至行盒子基线下方。</li>
<li><strong><code>super</code></strong>：元素基线移动至行盒子基线上方。</li>
<li><strong>&lt;百分比值&gt;</strong>：元素基线相对于行盒子基线向上或向下移动，移动距离等于<code>line-height</code>的百分比。</li>
<li><strong>&lt;长度值&gt;</strong>：元素基线相对于行盒子基线向上或向下移动指定的距离。</li>
</ul>
<h3>相对于行盒子的基线对齐元素的外边界</h3>
<p><img src="//p0.ssl.qhimg.com/t01c07a81f8e0ed25d7.png" alt=""></p>
<ul>
<li><strong><code>middle</code></strong>：元素上、下边的中点与行盒子基线加上x-height的一半对齐。</li>
</ul>
<h3>相对于行盒子的文本盒子对齐元素的外边界</h3>
<p><img src="//p0.ssl.qhimg.com/t01681bb7b2e466247e.png" alt=""></p>
<p>还有两种情况是相对于行盒子的基线对齐，因为文本盒子的位置由行盒子的基线决定。</p>
<ul>
<li><strong><code>text-top</code></strong>：元素的顶边与行盒子的文本盒子的顶边对齐。</li>
<li><strong><code>text-bottom</code></strong>：元素的底边与行盒子的文本盒子的底边对齐。</li>
</ul>
<h3>相对于行盒子的外边界对齐元素的外边界</h3>
<p><img src="//p0.ssl.qhimg.com/t011ccabf34ade7dacb.png" alt=""></p>
<ul>
<li><strong><code>top</code></strong>：元素的顶边与行盒子的顶边对齐。</li>
<li><strong><code>bottom</code></strong>：元素的底边与行盒子的底边对齐。</li>
</ul>
<p>当然，<a href="http://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align">正式的定义</a>在W3C的规范里。</p>
<h2>为何Vertical-Align的行为如此乖张</h2>
<p>下面我们看看在某些情况下的垂直对齐。特别是一些容易出错的情况。</p>
<h3>居中图标</h3>
<p>有一个问题一直困扰着我。有一个图标，我想让它与一行文本垂直居中。如果只应用<code>vertical-align: middle</code>好像不行，比如这个例子：</p>
<p><img src="//p0.ssl.qhimg.com/t01776e550316d6a472.png" alt=""></p>
<pre><code class="hljs xml">
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
Centered?


<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"middle"</span>&gt;</span>Centered!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.icon</span>   { <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.middle</span> { <span class="hljs-attribute">vertical-align</span>: middle; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>还是同一个例子，只不过这次多了一些辅助线：</p>
<p><img src="//p0.ssl.qhimg.com/t01970e5f4744e0dc11.png" alt=""></p>
<p>这次可以看清问题所在了。因为左侧的情况是文本没对齐，而是仍然位于基线之上。应用<code>vertical-align: middle</code>，实际上会导致图标中心与不出头小写字母的中心（x-height的一半）对齐，所以出头的字母会在上方突出出来。</p>
<p>右侧，仍然是对齐整个字体区的垂直中点。结果文本基线稍稍向下移动了一点，于是就实现了文本与图标完美对齐。</p>
<h3>行盒子基线的移动</h3>
<p>这是使用<code>vertical-align</code>时一个常见的坑：行盒子基线的位置会受到其中所有元素的影响。假设一个元素采用的对齐方式会导致行盒子移动。由于大多数垂直对齐（除<code>top</code>和<code>bottom</code>外），都相对于基线计算，因此这会导致该行所有其他元素重新调整位置。</p>
<p>下面是几个例子。</p>
<ul>
<li><p>如果行内有一个很高的元素，这个元素上方和下方都没有空间了，此时要与行盒子的基线对齐，就必须让它移动。矮盒子是<code>vertical-align: baseline</code>。左侧的高盒子是<code>vertical-align: text-bottom</code>，而右侧的高盒子是<code>vertical-algin: text-top</code>。可以看到，基线带着矮盒子移动到了上方。</p>
<p><img src="//p0.ssl.qhimg.com/t0166c52d282fe384c9.png" alt=""></p>
<pre><code class="hljs xml"> <span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
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
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p> 在通过<code>vertical-align</code>的其他值对齐一个较高的元素时，也会出现同样的现象。</p>
</li>
<li><p>即使设置<code>vertical-align</code>为<code>bottom</code>（左）和<code>top</code>（右），也会导致基线移动。这就很奇怪了，因为此时根本不关基线什么事。</p>
<p><img src="//p0.ssl.qhimg.com/t018f0fd67d61a4fa67.png" alt=""></p>
<pre><code class="hljs xml"><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
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
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre></li>
<li><p>把两个较大的元素放在一行并垂直对齐它们，基线也会移动以匹配两种对齐。然后，行的高度会调整（左）。再增加一个元素，但该元素对齐方式决定了它不会超出行盒子的边界，所以行盒子不会调整（中）。如果新增的元素会超出行盒子的边界，那么行盒子的高度和基线就会再次调整。在这例子中，前两个盒子向下移动了（右）。</p>
<p><img src="//p0.ssl.qhimg.com/t01854db8917c05667d.png" alt=""></p>
<pre><code class="hljs xml"><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tall-box text-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- middle mark-up --&gt;</span>
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
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre></li>
</ul>
<h3>行内元素下面可能会有一个小间隙</h3>
<p>看看这个例子：对列表元素的<code>li</code>应用<code>vertical-align</code>。</p>
<p><img src="//p0.ssl.qhimg.com/t0162285bf9a0861273.png" alt=""></p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.box</span> { <span class="hljs-attribute">display</span>: inline-block;
         <span class="hljs-comment">/* size, color, etc. */</span> }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>我们看到，列表项位于基线上。基线下面有一个小间隙，用于文本的下伸部分。怎么办？只要把基线向上移开一点就行了，比如用<code>vertical-align: middle</code>：</p>
<p><img src="//p0.ssl.qhimg.com/t01f34a9388bc17a8f6.png" alt=""></p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.box</span>    { <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-comment">/* size, color, etc. */</span> }

  <span class="hljs-selector-class">.middle</span> { <span class="hljs-attribute">vertical-align</span>: middle; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>有文本内容的行内块不会出现这种情况，因为<a href="http://christopheraue.net/design/vertical-align/#inline-block-element">内容已经把基线向上移了</a>。</p>
<h3>行内元素间的间隙会破坏布局</h3>
<p>这主要是行内元素本身的问题。由于<code>vertical-align</code>必然会遇到行内元素，所以有必要了解一下。</p>
<p>在前面列表项的例子中也可以看到这个间隙。这个间隙来自你的标记中行内元素间的空白。行内元素间的所有空白会折叠为一个。如果我们要通过<code>width: 50%</code>实现并排放两个行内元素，那这个空白就会成为障碍。因为一行放不下两个50%再加一个空白，结果就会折行（左）。要删除这个间隙，需要在HTML中通过注释删除空白（右）。</p>
<p><img src="//p0.ssl.qhimg.com/t01a49871626ff6e3ad.png" alt=""></p>
<pre><code class="hljs xml"><span class="hljs-comment">&lt;!-- left mark-up --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"half"</span>&gt;</span>50% wide<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"half"</span>&gt;</span>50% wide... and in next line<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- right mark-up --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"half"</span>&gt;</span>50% wide<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"half"</span>&gt;</span>50% wide<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.half</span> { <span class="hljs-attribute">display</span>: inline-block;
          <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h2>Vertical-Align揭秘</h2>
<p>好了，就这些。一旦了解了规则，就没有那么复杂了。如果<code>vertical-align</code>没有达到效果，只要问下面的问题就能找到症结所在：</p>
<ul>
<li>行盒子的基线和上、下边界在哪儿？</li>
<li>行内元素的基线和上、下边界在哪儿？</li>
</ul>
<p>据此就可以找到问题的解决方案。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/vertical-align-all-you-need-to-know](https://www.zcfy.cc/article/vertical-align-all-you-need-to-know)
原文标题: Vertical-Align，你应该知道的一切
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

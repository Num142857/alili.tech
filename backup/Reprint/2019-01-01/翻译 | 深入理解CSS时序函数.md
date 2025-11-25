---
title: '翻译 | 深入理解CSS时序函数' 
date: 2019-01-01 2:30:07
hidden: true
slug: 32tjd48gzy6
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作者：Nicolas（沪江前端开发工程师）<br>本文原创翻译，转载请注明作者及出处。</p></blockquote>
<p>各位，赶紧绑住自己并紧紧抓牢了，因为当你掌握了特别有趣但又复杂的CSS时序函数之后，你将会真正体验到竖起头发般的兴奋感受。</p>
<p>好吧，本文的主题可能还没能让你热血沸腾。言归正传，时序函数对CSS动画而言就像是一颗隐藏的宝石，你想得到多少惊喜取决于你如何使用它。</p>
<p>首先，让我们定义下场景，并确保这些与时序函数相关的场景都是我们熟悉的。如上所述，当你在CSS动画领域中工作时（其中包括CSS过渡和基于关键帧的动画），该功能将变得可用。那么，它究竟是什么，它是做什么的呢？</p>
<h1 id="articleHeader0">什么是CSS时序函数</h1>
<p>它是一个不太显眼的基于动画的CSS属性之一，而它的大多数的相邻属性都是相当自明的。然而，它的特别之处是它使你能够控制和改变动画的加速度 - 也就是说，它定义了动画在指定的持续时间内加速和减速的方式。</p>
<p>虽然它不影响动画的实际持续时间，但它可能会影响到用户如何感知动画的快或者慢。如果你还不知道它的实际意义，那么请在这里听我娓娓道来，因为时序函数属性比定义的更加有趣。</p>
<p>注意：事实上没有确切的“时序函数”的属性命名，当我提到这个“属性”时，既是指transition-timing-function和animation-timing-function属性。</p>
<p>在继续之前，让我们熟悉一下语法以及它适合在CSS中定义整个动画过程的位置。为了浅显易懂，让我们使用CSS过渡做为例子。我们将从完整的过渡属性数组开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
   transition-property: background;
   transition-duration: 1s;
   transition-delay: .5s;
   transition-timing-function: linear;
}

/* This could, of course, be shortened to: */
div {
   transition: background 1s .5s linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">transition-property</span>: background;
   <span class="hljs-attribute">transition-duration</span>: <span class="hljs-number">1s</span>;
   <span class="hljs-attribute">transition-delay</span>: .<span class="hljs-number">5s</span>;
   <span class="hljs-attribute">transition-timing-function</span>: linear;
}

<span class="hljs-comment">/* This could, of course, be shortened to: */</span>
<span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">transition</span>: background <span class="hljs-number">1s</span> .<span class="hljs-number">5s</span> linear;
}</code></pre>
<p>对定义过渡的简写是相当宽松的，对于顺序的唯一要求是延迟参数必须在持续时间值之后进行声明（但不必立即跟在后面）。此外，对该功能来说transition-duration的值是唯一的必填项; 而且由于其他参数的默认值在大多数的时候都会适当填充，因此过渡很少需要超过以下的代码片段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
   transition: 1s;
}

/* This is the same as saying: */
div {
   transition: all 1s 0s ease;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">transition</span>: <span class="hljs-number">1s</span>;
}

<span class="hljs-comment">/* This is the same as saying: */</span>
<span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> <span class="hljs-number">0s</span> ease;
}</code></pre>
<p>但这有点无趣。虽然默认值通常足以满足页面的标准悬停事件等，但如果你正在做一些更重要的东西，那么时序函数是微调动画的一个重要技巧！</p>
<p>不管怎么样，你现在已经有了对时序函数是干什么的基本了解。接下来让我们来看看它是如何做到的。</p>
<p>揭开面纱 </p>
<p>过去很多人可能不会在意时序函数属性的可用的关键词，它们有五个：ease（默认）ease-in，ease-out，ease-in-out和linear。然而，这些关键字仅仅是用于定义贝塞尔曲线的简写。</p>
<p>纳尼？</p>
<p>你可能不了解这个术语，但是我敢打赌，如果你使用过图形编辑软件，然后你还创建过一条曲线，你实际上看到的是一条贝塞尔曲线！没错，当您使用笔或路径工具来创建一个漂亮的平滑曲线，那么你正在绘制一条贝塞尔曲线！总之，贝塞尔曲线是时序函数背后的黑魔法 ; 它基本描述了在图形上的加速模式。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoBa?w=640&amp;h=563" src="https://static.alili.tech/img/bVUoBa?w=640&amp;h=563" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>这是关键字ease的贝塞尔曲线</em></p>
<p>如果你像我一样第一次看到这样的贝塞尔曲线，那么你可能想知道曲线是怎么从图表上的四个点绘制而成的！我可能无法通过言语来告诉你，但幸运的是，我有一个特别精彩的GIF来帮助我解决这个问题，非常感谢<a href="http://en.wikipedia.org/wiki/File:Bezier_3_big.gif" rel="nofollow noreferrer" target="_blank">维基百科</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoJi?w=360&amp;h=150" src="https://static.alili.tech/img/bVUoJi?w=360&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><em>一条正在绘制中的三次方贝塞尔曲线</em></p>
<p>因为该曲线由四个点形成，我们将其称为“三次方”贝塞尔曲线，而不是“二次方”曲线（三个点）或“四次方”曲线（五个点）。</p>
<h1 id="articleHeader1">cubic-bezier()函数介绍</h1>
<p>那么现在，这才是真正令人感到兴奋的地方了，因为我揭示了你实际上可以通过cubic-bezier()函数简单的替换时序函数属性值的关键字来访问这个曲线。我非常理解你可能需要一些时间来控制你的兴奋情绪...</p>
<p>你可以使用cubic-bezier()函数操纵你想要的贝塞尔曲线，从而为你的动画创建出完全自定义的加速模式！所以，让我们看看这个函数是如何工作的，以及它是如何使你能够创建出属于自己的贝塞尔曲线的。</p>
<p>首先，我们知道曲线由四个点形成，称为点0，点1，点2和点3。另外一个需要注意的重要事情是，第一个点和最后一个点（0和3）已经在图表上定义了，点0总是位于0,0（左下）和点3总是位于1,1（右上）。</p>
<p>这就使得你用cubic-bezier()函数只能在图表上绘制点1和点2了。此函数传入四个参数，前两个是点1的x和y坐标，后两个是点2的x和y坐标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition-timing-function: cubic-bezier(x, y, x, y);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(<span class="hljs-selector-tag">x</span>, <span class="hljs-selector-tag">y</span>, <span class="hljs-selector-tag">x</span>, <span class="hljs-selector-tag">y</span>);</code></pre>
<p>为了舒适的理解语法，以及它是如何创建曲线和动画的物理效果的，我将给你带来5个和时序函数关键字相等的cubic-bezier()值以及动画的最终效果。</p>
<h1 id="articleHeader2">EASE-IN-OUT</h1>
<p>让我们先从ease-in-out关键字开始，因为这条曲线背后的逻辑以及它如何将其转换为动画的可能是最容易理解的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* The cubic-bezier() equivalent of the ease-in-out keyword */
transition-timing-function: cubic-bezier(.42, 0, .58, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* The cubic-bezier() equivalent of the ease-in-out keyword */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(<span class="hljs-selector-class">.42</span>, 0, <span class="hljs-selector-class">.58</span>, 1);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUoDA?w=640&amp;h=662" src="https://static.alili.tech/img/bVUoDA?w=640&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>一个完全对称的贝塞尔曲线，意味着动画从慢速开始到全速，然后再减速。</em></p>
<p>你可以看到，点1位于沿着x轴的0.42处和在y轴上的0处，而点2位于x轴上的0.58和y轴上的1。这就是一条完全对称的贝塞尔曲线，意味着动画将低速移动至全速，然后以与起始处完全相同的速率移出。因此，这个关键字的名称就是这样来的。</p>
<p>如果你看一下下面的演示，你将会看到ease-in-out值的物理效果，以及它和其他关键字的值的不同之处。<a href="http://codepen.io/stephengreig/pen/bHzqm/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/bHzqm/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoD6?w=640&amp;h=626" src="https://static.alili.tech/img/bVUoD6?w=640&amp;h=626" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em><a href="https://codepen.io/stephengreig/pen/bHzqm" rel="nofollow noreferrer" target="_blank">访问CodePen上的演示效果</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/bHzqm" data-typeid="3">点击预览</button></em></p>
<h1 id="articleHeader3">EASE</h1>
<p>关键字ease是CSS时序函数属性的默认值，它实际上和前一个非常接近，虽然它以更快的速度移入，而以更平稳的速度移出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* The ease keyword and its cubic-bezier() equivalent */
transition-timing-function: cubic-bezier(.25, .1, .25, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* The ease keyword and its cubic-bezier() equivalent */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(<span class="hljs-selector-class">.25</span>, <span class="hljs-selector-class">.1</span>, <span class="hljs-selector-class">.25</span>, 1);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUoEh?w=640&amp;h=662" src="https://static.alili.tech/img/bVUoEh?w=640&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>关键字ease的曲线以更快的速度移入，以更平稳的速度移出。</em></p>
<p>你可以看到在动画中的这个时序函数直接转换成的物理效果，在原点处更加陡峭，到结束点又被拉长了。在查看了这些示例后，记得参考之前的演示来对比下效果。</p>
<h1 id="articleHeader4">EASE-IN和EASE-OUT</h1>
<p>勿庸置疑，关键字ease-in和ease-out是正好相反的。前者是低速开始，而后者是低速结束，其他时间内都保持全速。我们之前看到的ease-in-out关键字如同逻辑所暗示的那样，就是这2条贝塞尔曲线的完美组合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* The ease-in keyword and its cubic-bezier() equivalent */
transition-timing-function: cubic-bezier(.42, 0, 1, 1);

/* The ease-out keyword and its cubic-bezier() equivalent */
transition-timing-function: cubic-bezier(0, 0, .58, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* The ease-in keyword and its cubic-bezier() equivalent */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(<span class="hljs-selector-class">.42</span>, 0, 1, 1);

<span class="hljs-comment">/* The ease-out keyword and its cubic-bezier() equivalent */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(0, 0, <span class="hljs-selector-class">.58</span>, 1);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUoEr?w=640&amp;h=330" src="https://static.alili.tech/img/bVUoEr?w=640&amp;h=330" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>ease-in贝塞尔曲线（左）| ease-out贝塞尔曲线（右）</em></p>
<h1 id="articleHeader5">LINEAR</h1>
<p>最后一个关键字就完全不是曲线了。正如其名称所示，linear时序函数值在整个动画过程中都保持相同的速度，这意味着所得到的贝塞尔曲线（或者根本不是）将只是一条直线。在曲线图上表现为没有变化的加速模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* The linear keyword and its cubic-bezier() equivalent */
transition-timing-function: cubic-bezier(0, 0, 1, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* The linear keyword and its cubic-bezier() equivalent */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(0, 0, 1, 1);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUoEE?w=640&amp;h=662" src="https://static.alili.tech/img/bVUoEE?w=640&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>linear时序函数值在整个动画期间保持相同速度。</em></p>
<p>假如你回到之前的演示，你可能会注意到，尽管所有的例子都有保持不变的持续时间值，但有一部分的动画看起来会慢于其他动画。这是为什么呢？就拿ease-in-out作为一个例子，我们知道，它在开始和结束时都比较慢，这意味着它所涉及动画的中间部分需要以更快的速度执行。这就有效确保了我们感知的实际动画会更快更短，而线性动画看上去更长。</p>
<p>你也许会觉得，这篇文章写的有点拖沓（看我都写了些什么呀？），所以，现在是时候来写点干货了，看看如何使用cubic-bezier()函数来创建自定义的时序函数。</p>
<h1 id="articleHeader6">用cubic-bezier()函数创建自定义的加速模式</h1>
<p>现在我们已经看到了关键字是如何等同于相对应的贝塞尔曲线的，并且看到了它们在动画上的效果，那么再来看看如何操作曲线来创建自定义加速模式。</p>
<p>现在你应该能够利用cubic-bezier()函数在曲线图上绘制点1和点2 ，并相当清楚这将会如何影响动画。然而，考虑到你通常看不到的曲线图上绘制点，显然这可能会非常无趣。</p>
<p>幸好还存在Lea Verou这样的牛人，他们似乎从不需要休息，直到让CSS的开发可以变得更加简单！Lea开发的Cubic Bézier工具，可以用来创建完整的自定义的贝塞尔曲线，并将执行的动作与预定义的关键字进行比较。这意味着，你可以使用这个平台工具建立贝塞尔曲线直到得到你想要的效果，而不是在cubic-bezier()函数中无聊地编辑数字。你可以访问Cubic Bezier然后把玩一下曲线，直到可以实现你想要的效果。这就方便多了不是吗。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoEW?w=640&amp;h=305" src="https://static.alili.tech/img/bVUoEW?w=640&amp;h=305" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>LEA Verou开发的极其有用的Cubic Bézier（查看大图）</em></p>
<p>简写的关键字为你提供了在开始使用时序函数时有了很好的选择，但是它们之间的差异通常较小。只有当你开始创建自定义贝塞尔曲线时，你才会意识到时序函数在动画上会给你带来惊人的效果。</p>
<p>请看下面的示例，看一下各个动画在相同持续时间内的极端差异。<a href="http://codepen.io/stephengreig/pen/baFhH/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/baFhH/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoE4?w=640&amp;h=460" src="https://static.alili.tech/img/bVUoE4?w=640&amp;h=460" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>让我们仔细看一下第一个例子，试着去搞明白为什么它会产生这样一个完全不同的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* cubic-bezier() values for first example from preceding demo page */
transition-timing-function: cubic-bezier(.1, .9, .9, .1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* cubic-bezier() values for first example from preceding demo page */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(<span class="hljs-selector-class">.1</span>, <span class="hljs-selector-class">.9</span>, <span class="hljs-selector-class">.9</span>, <span class="hljs-selector-class">.1</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUoFb?w=640&amp;h=662" src="https://static.alili.tech/img/bVUoFb?w=640&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>自定义贝塞尔曲线的示例</em></p>
<p>这个时序函数和默认关键字之间的主要区别是这个陡峭的贝塞尔曲线靠近了“进度”标尺（y轴）。这意味着动画会突然前进，在中间（即曲线接近水平时）有一段较长的几乎暂停的低速。这种模式与我们习惯于使用时序函数关键字的方式形成了鲜明对比，它采用相反的方向，缓动时段出现在动画的开始和结束，并不是在中间。</p>
<p>现在终于可以将贝塞尔曲线收入囊中了，也已经对这个cubic-bezier()函数的功能属性做了彻底的探讨，对吗？也许你是这么想的，但这个狡猾的家伙还有更多的套路可以玩！</p>
<h1 id="articleHeader7">用贝塞尔曲线获得创意</h1>
<p>没错：贝塞尔曲线还可以更有趣！谁会想到，只有时间标尺（x轴）被限制在曲线图上的0-1的范围内，而进度标尺（y轴）可以继续延伸甚至超出0-1的范围。</p>
<p>进度标尺恰如你所想象的那样，底端（0）标记动画的开始，顶端（1）标记动画的结束。通常，三次的贝塞尔曲线总是以不同强度在这个进度标尺里向北方向运行，直到到达动画的终点。然而，在0—1范围之外绘制点1和点2的可能性将使得曲线蜿蜒回退到进度标尺内，这实际上会导致在动画中出现反向运动！和之前一样，理解这一点的最好方法是通过视图：</p>
<p><span class="img-wrap"><img data-src="/img/bVUoFw?w=640&amp;h=837" src="https://static.alili.tech/img/bVUoFw?w=640&amp;h=837" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>用标准0-1范围之外的值的自定义贝塞尔曲线</em></p>
<p>你可以看到点2在-0.5的位置，被绘制在标准0-1范围之外，，曲线反向下拉。如果你看下面的演示，你会看到，这会在动画的中段产生一个弹跳效果。<a href="http://codepen.io/stephengreig/pen/kILDb/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/kILDb/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoFy?w=640&amp;h=306" src="https://static.alili.tech/img/bVUoFy?w=640&amp;h=306" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>反之，你可以把反向运动放置于动画的起始处，并故意超出原来终点。它就像是后退了几步又回到了起点; 然后，在终点处，你的运动惯性使你超过了目的地，导致你走了几步后，又保证你回到预期的目的地。请看下面的示例，以彻底理解我们在这里说的什么。另外，产生这种效果的贝塞尔曲线也可以在下面看到。<a href="http://codepen.io/stephengreig/pen/xcCqj/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/xcCqj/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoFA?w=640&amp;h=301" src="https://static.alili.tech/img/bVUoFA?w=640&amp;h=301" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVUoFJ?w=640&amp;h=1133" src="https://static.alili.tech/img/bVUoFJ?w=640&amp;h=1133" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>使用标准0-1范围之外的值的自定义贝塞尔曲线</em></p>
<p>你现在应该对cubic-bezier()函数的值在标准的0-1范围以外如何影响到动画播放有一个较好的理解。当然我们可以整天看移动箱子的例子，但还是让我们用一个有创意的时序函数逼真的演示一个示例来完成这一部分的内容。<a href="http://codepen.io/stephengreig/pen/vbqBh/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/vbqBh/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoFT?w=640&amp;h=603" src="https://static.alili.tech/img/bVUoFT?w=640&amp;h=603" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>没错：这是一个漂浮气球的动画！你不总是想用CSS来做到这样的动画吗？</p>
<p>这个动画的要点是，当你点击“添加氦气”气球飘到了“天花板”， 就像自然世界中的那样，在碰到顶部之前会轻微回弹。使用cubic-bezier()函数的值在0-1范围之外可以让我们创造出弹跳，最终有助于产生一个逼真的效果。下面的代码片段展示了在cubic-bezier()函数中使用的坐标，而最终的贝塞尔曲线的表现在下方可以看到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* The cubic-bezier() values for the bouncing balloon */
transition-timing-function: cubic-bezier(.65, 1.95, .03, .32);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* The cubic-bezier() values for the bouncing balloon */</span>
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">cubic-bezier</span>(<span class="hljs-selector-class">.65</span>, 1<span class="hljs-selector-class">.95</span>, <span class="hljs-selector-class">.03</span>, <span class="hljs-selector-class">.32</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUoFX?w=640&amp;h=1031" src="https://static.alili.tech/img/bVUoFX?w=640&amp;h=1031" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>模拟弹跳的气球的自定义贝塞尔曲线</em></p>
<p>这个例子非常好地解释了曲线是如何转换为最终的动画的，因为它表现的几乎完美。首先，可以看到的是，曲线从进度标尺开始一直到结束都是一条直线，表示气球以恒定的速度从动画开始移动到结束。然后，和气球非常相似的是，曲线从标尺的顶端向下反弹，然后再缓缓地回到顶部。相当简单！</p>
<p>一旦你掌握了曲线并用它来操纵你想要的艺术品，你就成功了。</p>
<h1 id="articleHeader8">时序函数和基于关键帧的CSS动画</h1>
<p>要注意的最后一点是，当应用于CSS关键帧动画时时序函数是如何表现的。这些概念与我们迄今为止使用的过渡示例中的概念完全相同。但需要注意有一个重要的例外：当你应用一个时序函数设置关键帧时，它会在每一个关键帧都会被执行，而不是应用于动画的整个部分。</p>
<p>为了证明这一点，假如我们有四个关键帧，把一个箱子在一个矩形的四个角内移动，然后你应用了“弹跳”时序函数，也就是我们在前面的气球示例中使用的“反弹”的时序函数，那么四个关键帧中每一个动作都会经历反弹，而不是整个动画。让我们看看这个效果和代码。<a href="http://codepen.io/stephengreig/pen/rscGb/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/rscGb/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoF7?w=640&amp;h=437" src="https://static.alili.tech/img/bVUoF7?w=640&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes square {
   25% {
      top:200px;
      left:0;
   }

   50% {
      top:200px;
      left:400px;
   }

   75% {
      top:0;
      left:400px;
   }     
}

div {
   animation: square 8s infinite cubic-bezier(.65, 1.95, .03, .32);
   top: 0;
   left: 0;
   /* Other styles */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> square {
   25% {
      <span class="hljs-attribute">top</span>:<span class="hljs-number">200px</span>;
      <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
   }

   50% {
      <span class="hljs-attribute">top</span>:<span class="hljs-number">200px</span>;
      <span class="hljs-attribute">left</span>:<span class="hljs-number">400px</span>;
   }

   75% {
      <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
      <span class="hljs-attribute">left</span>:<span class="hljs-number">400px</span>;
   }     
}

<span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">animation</span>: square <span class="hljs-number">8s</span> infinite <span class="hljs-built_in">cubic-bezier</span>(.65, 1.95, .03, .32);
   <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
   <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
   <span class="hljs-comment">/* Other styles */</span>
}</code></pre>
<p>注意，如果100%的关键帧没有定义，那么元素将简单的返回到它起点的样式，这在这个案例中是本来想要的结果，所以就没必要定义了。从演示中可以很明显的看到，时序函数应用于四个关键帧中的每一个，因为它们每个都表现为从容器壁反弹。</p>
<p>如果你需要某些关键帧来呈现有别于其他的时序函数，可以直接使用一个单独的时序函数值给到关键帧，比如下面的代码片段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes square { 
   50% {
      top: 200px;
      left: 400px;
      animation-timing-function: ease-in-out;
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> square { 
   50% {
      <span class="hljs-attribute">top</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">400px</span>;
      <span class="hljs-attribute">animation-timing-function</span>: ease-in-out;
   }
}</code></pre>
<h1 id="articleHeader9">step()时序函数介绍</h1>
<p>如果你认为这就是时序函数的全部了，那么我告诉你，CSS时序函数要比预定义的缓动函数还要更多！</p>
<p>在这一节中，当我们通过steps()时序函数探索“分步函数”的概念时，我们可以把我们的曲线转换成直线。</p>
<p>steps()函数是一个很小众的工具，但在工具箱中仍然是有用的。它使您能够将动画分成多个步骤，而不是我们习惯的常规补间动画。例如，如果我们想要将一个正方形在4秒内分四步向右移动400个像素，那么正方形将每秒向右跳100个像素，而不是连续运动。让我们来看看在这个特殊案例中所需要的语法，既然我们已经理解了错综复杂的cubic-bezier()函数，这个就应该非常简单了。<a href="http://codepen.io/stephengreig/pen/Gwbry/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/Gwbry/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoGh?w=640&amp;h=302" src="https://static.alili.tech/img/bVUoGh?w=640&amp;h=302" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
   transition: 4s steps(4);
}

div:target {
   left: 400px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">transition</span>: <span class="hljs-number">4s</span> <span class="hljs-built_in">steps</span>(4);
}

<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:target</span> {
   <span class="hljs-attribute">left</span>: <span class="hljs-number">400px</span>;
}</code></pre>
<p>如你所见，将动画分割成多个步骤是如此的简单。但要记住，这个数字必须是一个正整数，所以不能是负数或者小数。然而，第二个可选参数为我们提供了更多的控制，可能的值有start和end，后者是默认的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition-timing-function: steps(4, start);
transition-timing-function: steps(4, end);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">steps</span>(4, <span class="hljs-selector-tag">start</span>);
<span class="hljs-selector-tag">transition-timing-function</span>: <span class="hljs-selector-tag">steps</span>(4, <span class="hljs-selector-tag">end</span>);</code></pre>
<p>Start会在每个步骤的起始位置运行动画，而end是在每个步骤的结束处运行动画。使用之前的“移动箱子”示例，下图对两者之间的差异做了很好的解释。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoGp?w=640&amp;h=638" src="https://static.alili.tech/img/bVUoGp?w=640&amp;h=638" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><em>start和end值在steps()函数中的差异。</em></p>
<p>可以看到，start值，只要动画被触发，它就会立即开始，而end值，它开始于第一个步骤的结尾处（在这个案例中，将会在一秒钟之后被触发）。</p>
<p>为了确保这个概述的足够全面，steps()函数还可以用两个预定义的关键字：step-start和step-end代替。前者相当于steps(1, start)，而后者是相当于steps(1, end)。</p>
<h1 id="articleHeader10">Steps()函数的创意案例</h1>
<p>好吧，你可能没有太多的需求来动画一个移动的箱子，但steps()函数也有很多很酷的用途。例如，如果你有一套基础的卡通的所有图片精灵（sprites），那么你可以使用这种技术来逐帧播放，只需要使用几个CSS属性！让我们来看一个演示和制作它功能的代码。<a href="http://codepen.io/stephengreig/pen/tuvfp/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/tuvfp/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoGD?w=640&amp;h=301" src="https://static.alili.tech/img/bVUoGD?w=640&amp;h=301" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
   width: 125px;
   height: 150px;
   background: url(images/sprite.jpg) left;
   transition: 2s steps(16);
   /* The number of steps = the number of frames in the cartoon */
}

div:target {
   background-position: -2000px 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
   <span class="hljs-attribute">width</span>: <span class="hljs-number">125px</span>;
   <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
   <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(images/sprite.jpg) left;
   <span class="hljs-attribute">transition</span>: <span class="hljs-number">2s</span> <span class="hljs-built_in">steps</span>(16);
   <span class="hljs-comment">/* The number of steps = the number of frames in the cartoon */</span>
}

<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:target</span> {
   <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">2000px</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>首先，我们有一个小的矩形框（125像素宽），它有一个背景图像（2000像素宽），并排包含16帧。这个背景图像最初与框的左边缘对齐; 所以，我们现在需要做的是将背景图像一直向左移动，以便所有的16帧都通过小矩形窗口。正常动画下，当背景图像向左移动时，帧将仅仅在视图中滑动; 然而，用steps()函数，背景图像可以移动16步到左侧，确保每一个16帧的图像可以像你希望的那样进出视图。就像这样，你仅仅使用CSS过渡就可以播放一个基本的卡通！</p>
<p><span class="img-wrap"><img data-src="/img/bVUoK6?w=500&amp;h=167" src="https://static.alili.tech/img/bVUoK6?w=500&amp;h=167" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><em>这个GIF演示了背景图分步通过“窗口”的概念</em></p>
<p>我还发现另一个使用steps()函数的创意来源于LEA Verou，她想出了一个特别巧妙的打字动画。<a href="http://codepen.io/stephengreig/pen/Blbcs/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/Blbcs/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoLG?w=640&amp;h=274" src="https://static.alili.tech/img/bVUoLG?w=640&amp;h=274" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>首先，你需要一些文本，但不幸的是，你还需要确切的知道你正在使用的字符数，因为你需要在CSS中使用这个数字。另一个要求是字体必须是等宽的，以便所有字符的宽度完全相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>smashingmag</p>

.text {
   width: 6.6em;
   width: 11ch; /* Number of characters */
   border-right: .1em solid;
   font: 5em monospace;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">p</span>&gt;<span class="hljs-selector-tag">smashingmag</span>&lt;/<span class="hljs-selector-tag">p</span>&gt;

<span class="hljs-selector-class">.text</span> {
   <span class="hljs-attribute">width</span>: <span class="hljs-number">6.6em</span>;
   <span class="hljs-attribute">width</span>: <span class="hljs-number">11ch</span>; <span class="hljs-comment">/* Number of characters */</span>
   <span class="hljs-attribute">border-right</span>: .<span class="hljs-number">1em</span> solid;
   <span class="hljs-attribute">font</span>: <span class="hljs-number">5em</span> monospace;
}</code></pre>
<p>我们正在处理的文本有11个字符。在CSS单位ch的帮助下，我们实际上可以使用这个数字来定义该段的宽度，尽管我们应该指定回退宽度针对那些并不支持这个单位的浏览器。然后，该段落在右侧显示一个黑色实心框，这将成为光标。现在一切就绪; 我们只需要简单的使它动起来。</p>
<p>这需要两个单独的动画：一个用于光标，一个用于打字。要实现前者，我们所需要做的就是使黑色边框闪烁，这没有更简单的了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes cursor {
   50% {
     border-color: transparent;
   }
}

.text {
   /* existing styles */
   animation: cursor 1s step-end infinite;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> cursor {
   50% {
     <span class="hljs-attribute">border-color</span>: transparent;
   }
}

<span class="hljs-selector-class">.text</span> {
   <span class="hljs-comment">/* existing styles */</span>
   <span class="hljs-attribute">animation</span>: cursor <span class="hljs-number">1s</span> step-end infinite;
}</code></pre>
<p>按照原先的设定，黑色边框只会在黑色和透明之间切换，然后连续循环。这是steps()至关重要的地方，因为如果没有它，光标也只是淡入淡出，而不会闪烁。</p>
<p>最后，打字动画也很简单。我们需要做的是在11个步骤（字符数）中将其宽度重新设置为全部宽度之前，将段落的宽度变为零。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes typing {
   from {
      width: 0;
   }
}

.text {
   /* existing styles */
   animation: typing 8s steps(11), 
              cursor 1s step-end infinite;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> typing {
   <span class="hljs-selector-tag">from</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
   }
}

<span class="hljs-selector-class">.text</span> {
   <span class="hljs-comment">/* existing styles */</span>
   <span class="hljs-attribute">animation</span>: typing <span class="hljs-number">8s</span> <span class="hljs-built_in">steps</span>(11), 
              cursor <span class="hljs-number">1s</span> step-end infinite;
}</code></pre>
<p>在这里有一个关键帧，文本会在8秒内每次显示一个字母，而黑色右边框（光标）会连续闪烁。该技术非常简单，但却很有效。</p>
<p>只要加上这个由LEA Verou创造的steps()函数的极佳用法，就将完全改变效果，或许使文字看上去被删除也不在话下。要做到这一点，只需改变下关键帧的关键字，以便它从to读取而不是from，然后添加一个forwards的animation-fill-mode参数到一组动画规则中。这将确保一旦文本“删除”（即当动画完成时），文本仍然保留被删除状态。看一下下面的演示。<a href="http://codepen.io/stephengreig/pen/LmohC/" rel="nofollow noreferrer" target="_blank">CodePen地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="stephengreig/pen/LmohC/" data-typeid="3">点击预览</button>。</p>
<p><span class="img-wrap"><img data-src="/img/bVUoLU?w=640&amp;h=288" src="https://static.alili.tech/img/bVUoLU?w=640&amp;h=288" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但本节中的两个示例的缺点是，必须事先知道帧或字符的数量，以指定正确的步数，如果此数字变更了，那么您将需要同时更改代码。尽管如此，steps()函数在此已经展现了它的价值，而且是CSS时序函数的另一个神奇功能。</p>
<h1 id="articleHeader11">浏览器支持情况</h1>
<p>我们已经制定的，除非浏览器支持基于CSS的动画，即CSS过渡和CSS动画（基于关键帧的）模块，否则不能使用CSS时序函数。幸运的是，现在浏览器的支持性越来越好了。</p>
<h1 id="articleHeader12">CSS过渡的支持</h1>
<p><span class="img-wrap"><img data-src="/img/bVUoL3?w=1388&amp;h=562" src="https://static.alili.tech/img/bVUoL3?w=1388&amp;h=562" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再次强调，对于关键帧动画，只需要包含-webkit-前缀和没有前缀的代码。</p>
<p>显然，基于CSS动画的浏览器支持性是非常好的，但当涉及到时序函数时，支持性会变得略有不同。请看下表更详细地说明。</p>
<h1 id="articleHeader13">时序函数的支持</h1>
<p><span class="img-wrap"><img data-src="/img/bVUoMn?w=1342&amp;h=590" src="https://static.alili.tech/img/bVUoMn?w=1342&amp;h=590" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再次再次强调，虽然某些浏览器还需要更长一段时间才能支持时序函数的完整功能，但可以看到目前的浏览器版本对此功能的支持较为普遍。（译者注：目前主流浏览器都已经很好的支持）</p>
<h1 id="articleHeader14">总结</h1>
<p>让我们回顾一下，我们学到了CSS时序函数的什么？。</p>
<ul>
<li>它们定义了动画加速和减速的位置。</li>
<li>他们不仅仅是预定义的关键字。</li>
<li>您可以通过用cubic-bezier()函数在0-1范围以外的值来创建反弹效果。</li>
<li>您可以将动画分成任意数量的步骤，而不是补间动画。</li>
<li>浏览器的支持非常好，而且在不断改进中。</li>
</ul>
<p>最后，这不是一篇关于CSS3技术的文章，虽然这些技术现在已经得到全面的支持，但还是需要做渐进增强。我们总是要从下到上的处理; 也就是说，渐进增强可以在不能很好支持这些功能的设备和浏览器上为浏览器优化处理，确保你的作品的可接受性和可访问性。</p>
<p>除此之外，祝你在用曲线和分步的时序函数调试动画时玩的愉快！哈～</p>
<h1 id="articleHeader15">其他参考资料</h1>
<ul>
<li>
<p>“<a href="http://cubic-bezier.com/" rel="nofollow noreferrer" target="_blank">Cubic Bézier</a>”，Lea Verou</p>
<ul><li>一个制作和对比贝塞尔曲线的平台</li></ul>
</li>
<li>
<p>“<a href="https://developer.mozilla.org/en/docs/Web/CSS/timing-function" rel="nofollow noreferrer" target="_blank">Timing Functions</a>”，Mozilla 开发者网络</p>
<ul><li>贝塞尔曲线的更多概述</li></ul>
</li>
<li>
<p>“<a href="http://en.wikipedia.org/wiki/B%C3%A9zier_curve" rel="nofollow noreferrer" target="_blank">Bézier Curves</a>”，维基百科</p>
<ul><li>了解贝塞尔曲线的更多信息</li></ul>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010953661" src="https://static.alili.tech/img/remote/1460000010953661" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p>
<p><a href="https://m.bosszhipin.com/weijd/v2/job/7bbfc95b9f1e9c4a1nRy2926FVA~?date8=20170905&amp;sid=self_jd" rel="nofollow noreferrer" target="_blank">&gt;&gt; 沪江Web前端上海团队招聘【Web前端架构师】，有意者简历至：zhouyao@hujiang.com &lt;&lt;</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
翻译 | 深入理解CSS时序函数

## 原文链接
[https://segmentfault.com/a/1190000011019534](https://segmentfault.com/a/1190000011019534)


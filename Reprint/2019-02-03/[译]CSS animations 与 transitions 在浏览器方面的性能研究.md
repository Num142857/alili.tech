---
title: '[译]CSS animations 与 transitions 在浏览器方面的性能研究' 
date: 2019-02-03 2:30:40
hidden: true
slug: bf2ozc3cf4t
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://blogs.adobe.com/webplatform/2014/03/18/css-animations-and-transitions-performance/" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<p>你也许早已在项目中使用上了Animations 或 Transitions（如果还没有，可以阅读CSS-Trick’s almanac 关于<a href="https://css-tricks.com/almanac/properties/a/animation/" rel="nofollow noreferrer" target="_blank">animations</a>或<a href="https://css-tricks.com/almanac/properties/t/transition/" rel="nofollow noreferrer" target="_blank">transitions</a>的相关文章）。你会发现你的一些运动表现流畅，而另一些却不尽如人意，你想知道原因？</p>
<p>本文将阐述浏览器是怎样处理<em>CSS animations</em> 与 <em>transitions</em>。以期在编写代码之前，你可以通过直觉判断某一运动能否运行良好。通过这种直觉，你将能过做出浏览器亲和且用户体验流畅的设计决策。</p>
<h2 id="articleHeader0">深入浏览器内部</h2>
<p>让我深入浏览器内部一探究竟。只有理解了它的工作用力，我们才能做的更好。</p>
<p>现代浏览器有两个重要的执行线程。两个线程共同协作来渲染web页面。他们是：</p>
<ul>
<li><p>主线程（<em>The main thread</em>）</p></li>
<li><p>排版线程（<em>The compositor thread</em>）</p></li>
</ul>
<p>一般来说，主线程负责：</p>
<ul>
<li><p>运行JS代码</p></li>
<li><p>计算HTML元素的CSS样式</p></li>
<li><p>布局页面</p></li>
<li><p>将元素绘制成一副或多幅位图</p></li>
<li><p>将位图传给排版线程</p></li>
</ul>
<p>排版线程则负责：</p>
<ul>
<li><p>通过GPU，将位图绘制到屏幕上</p></li>
<li><p>对可见或即将可见的区域，询问主线程是否进行位图更新。</p></li>
<li><p>计算页面的可见区域</p></li>
<li><p>当滚动屏幕时，计算出即将可见的区域</p></li>
<li><p>当滚动时移动页面区域</p></li>
</ul>
<p>主线程花费大量的时间忙于执行JS代码与绘制大型元素。主线程正在处理任务时，他将无法响应用户的输入（注：这里是广义的输入，泛指交互）。</p>
<p>另一方面，排版线程保持着对用户的输入的响应。当页面改变时，排版线程会进行每秒60次的重绘。甚至在页面还不完整时。</p>
<p>例如，当用户滚动页面时，排版线程会询问主线程是否为新的可见区域更新位图。然而，当主线程的反馈不那么迅速时，排版线程并不会等待。他将对已有反馈的页面进行绘制并使用空白代替未反馈的部分。</p>
<h2 id="articleHeader1">GPU</h2>
<p>上文提到排版线程通过GPU将位图绘制到屏幕上。让我们聊一聊GPU。</p>
<p>GPU是现今大多数手机，平板，电脑的组成部分。它是一个相当专门化的部件，这意味着它只专注处理一些事务。</p>
<p>GPUs 能够快速处理：</p>
<ol>
<li><p>把图形绘制到屏幕上</p></li>
<li><p>重复绘制位图</p></li>
<li><p>在不同的区域绘制相同位图或将位图旋转，缩放。</p></li>
</ol>
<h2 id="articleHeader2">transition: height</h2>
<p>现在我们对浏览网页时，硬件与软件的大致行为。让我们来看看究竟浏览器的两个线程是如何协同运作来完成一个CSS动画的。</p>
<p>假设我们使用如下代码，将一个元素从100px变为200px:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    height: 100px;
    transition: height 1s linear;
}
 
div:hover {
    height: 200px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">transition</span>: height <span class="hljs-number">1s</span> linear;
}
 
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
}
</code></pre>
<p>两个线程将会按照下图示意的操作执行。橙色框中的操作会消耗大量时间，而蓝色框的操作运行迅速。<br><span class="img-wrap"><img data-src="/img/bVDc96?w=958&amp;h=1479" src="https://static.alili.tech/img/bVDc96?w=958&amp;h=1479" alt="animate-height-2x.png" title="animate-height-2x.png" style="cursor: pointer;"></span></p>
<p>如图，这一过程中有大量的黄色框，这意味着浏览器并不能流畅运行。过渡动画将会卡顿。</p>
<p>在每一帧的过渡动画，浏览器都将执行布局，绘制以及向GPC内存更新新的位图的操作。如我们所知，向GPU内存加载位图是一个相当缓慢的操作。</p>
<p>浏览器每一帧运行不流畅的原因在于元素的内容在持续变化。变化元素的高度意味着其子元素的形状也跟着改变，因此浏览器要进行布局。布局后，主线程要为元素从新生成位图。</p>
<h2 id="articleHeader3">transition: transform</h2>
<p>因此，改变高度是一种高代价的过渡动画。那么有什么的代价比较低廉？</p>
<p>假设我们将一个元素的尺寸从一半还原会正常尺寸。同时，假设使用<em>CSS transform</em> 属性去缩放，采用过渡完成动画，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    transform: scale(0.5);
    transition: transform 1s linear;
}
 
div:hover {
    transform: scale(1.0);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.5);
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span> linear;
}
 
<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.0);
}
</code></pre>
<p>让我们看看这个过程的示意图：<br><span class="img-wrap"><img data-src="/img/bVDda8?w=958&amp;h=1209" src="https://static.alili.tech/img/bVDda8?w=958&amp;h=1209" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>这次橙色框明显减少，这意味着动画更加流畅。元素<em>transform</em> 变化与高度变化的动画究竟区别在哪？</p>
<p>通过定义，<em>CSS transform</em> 属性并没有改变元素与相邻元素的布局，仅仅只影响了作为一个整体的元素自身（缩放，旋转整个元素或移动整个元素）。</p>
<p>这对于浏览器来说是个好消息。浏览器仅需要产生元素的位图，并在动画开始时向GPU更新位图。之后，浏览器不用再做更多的布局，绘制和位图更新操作。取而代之的是，仰仗GPU专业的能力在不同的区域绘制相同的位图，或使之旋转，缩放。</p>
<h2 id="articleHeader4">设计决策</h2>
<p>如此，是否意味着不应进行元素高度的动画？不，有时这仰赖你的设计，运动同样能运行的足够快。也许你的元素是独立的，并不会造成其它部分的重排。也许你的元素只是简单的重绘，浏览器可以快速地执行。也许你的元素很小，浏览器只要向GPU更新一个小的位图。</p>
<p>当然，如果你的动画使用像<em>CSS transform</em>一样的“廉价”属性替代像<em>CSS height</em>的更“昂贵”的属性，并且这不影响你的设计理念，那就这样做吧。例如，当你的设计需要一个按钮在点击时显示菜单，你需要尝试元素的<em>transform</em>属性来显示菜单而不是通过使用<em>top</em>或<em>height</em>属性来实现相同或相似的效果。</p>
<p>下面列出一些能实现快速动画的<em>CSS</em>属性：</p>
<ul>
<li><p>CSS transform</p></li>
<li><p>CSS opacity</p></li>
<li><p>CSS filter (取决于filter的复杂程度与浏览器性能)</p></li>
</ul>
<p>这个列表现在看来可能很有限，但随着浏览器的进步，越来越多的属性会运动地更快。同时，只是用这个列表上的属性，你也会惊叹于仅仅通过使用这些属性的组合就能创造出大量丰富的效果。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]CSS animations 与 transitions 在浏览器方面的性能研究

## 原文链接
[https://segmentfault.com/a/1190000006923260](https://segmentfault.com/a/1190000006923260)


---
title: '我所知道的flex布局 —— 上篇' 
date: 2019-01-30 2:30:23
hidden: true
slug: g631971xom
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>你还在用display+position+float来进行css布局吗？有没有觉得用传统的这种布局方法来实现特殊布局特别麻烦困难，例如：垂直居中。今天来记录一下自己对flex布局的了解（虽然不算神马新东西了都可以说是旧东西了~~~）</p>
<h2 id="articleHeader1">历史</h2>
<p>2009年，W3C提出了一种新的方案 —— Flex布局，可以简便、完整、响应式地实现各种页面布局。</p>
<p>flex布局也经历了一段演变历史。当你用google搜索flex时你会发现很多“过时”的资料信息。</p>
<ul>
<li><p>如果你正在浏览一篇关于flexbox的博客时看到display:box或一个属性为box-{*}，那么你正在浏览的是2009年版本的flexbox</p></li>
<li><p>如果你正在浏览一篇关于flexbox的博客时看到display:flexbox或一个flex()函数，那么你正在浏览的是2011年版本的flexbox</p></li>
<li><p>如果你正在浏览一篇关于flexbox的博客时看到display:flex和flex-{*}的一系列属性，那么你正在浏览的是现在版本的flexbox</p></li>
</ul>
<p>目前，它已经得到了所有浏览器的支持，网页端浏览器兼容性如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVGEAC?w=1182&amp;h=708" src="https://static.alili.tech/img/bVGEAC?w=1182&amp;h=708" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>移动端浏览器兼容性：</p>
<p><span class="img-wrap"><img data-src="/img/bVGEAD?w=1024&amp;h=768" src="https://static.alili.tech/img/bVGEAD?w=1024&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">概念</h2>
<p>Flexbox布局（ Flexible Box 或CSS3 弹性布局），是CSS3中的一种新的布局模式，可以自动调整子元素的高和宽，来很好的填充任何不同屏幕大小的显示设备中的可用显示空间，收缩内容防止内容溢出，确保元素拥有恰当的行为的布局方式。使用Flexbox来布局更容易，可以使用更少的代码，更简单的方式实现更复杂的布局，例如对齐方式，排列方向，排列顺序（这也是Flexbox布局的核心能力所在），弹性盒中的子元素通过在各个方向放置就可以以弹性的尺寸适应父元素的显示区域。由于子元素的显示顺序和它们在代码中 的顺序是独立的，通过使用弹性盒，定位子元素变得更加简单，复杂的布局也能够使用更清晰的代码更简单的实现。独立显示被设定成只针对可见元素，而不是基于代码的声明和导航顺序。</p>
<p>不同于块级元素基于垂直方向布局以及行内元素基于水平方向布局，弹性盒布局的算法是<strong>方向无关</strong>的。 虽然块级元素布局在页面中工作良好，但是其定义不足以支持那种需要根据用户代理从竖直切换成水平等变化而进行方向切换、大小调整、拉伸、收缩的引用组件。不同于将要出现的网格布局针对目标为大比例布局，弹性盒布局更适用于应用组件和小比例布局。这两种都是CSS工作组为了能与不同用户代理、不同书写模式和其他弹性需要进行协作而做出的努力。</p>
<p><strong>常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流</strong>。先看一张图：</p>
<p><span class="img-wrap"><img data-src="/img/bVssyk" src="https://static.alili.tech/img/bVssyk" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">1. flex container：flex容器/弹性容器</h3>
<p>flex容器是flex元素的父元素。通过设置display属性的值为flex或inline-flex定义。<br>旧版本属性值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- box:将对象作为弹性容器显示（最老版本-2009）
- inline-box:将对象作为内联块级弹性容器显示（最老版本-2009）
- flexbox:将对象作为弹性容器显示。（过渡版本-2011）
- inline-box: 将对象作为内联块级弹性容器显示。（过渡版本-2011）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> <span class="hljs-symbol">box:</span>将对象作为弹性容器显示（最老版本-<span class="hljs-number">2009</span>）
</span>-<span class="ruby"> inline-<span class="hljs-symbol">box:</span>将对象作为内联块级弹性容器显示（最老版本-<span class="hljs-number">2009</span>）
</span>-<span class="ruby"> <span class="hljs-symbol">flexbox:</span>将对象作为弹性容器显示。（过渡版本-<span class="hljs-number">2011</span>）
</span>-<span class="ruby"> inline-<span class="hljs-symbol">box:</span> 将对象作为内联块级弹性容器显示。（过渡版本-<span class="hljs-number">2011</span>）
</span></code></pre>
<h3 id="articleHeader4">2. flex item：flex子元素或弹性子元素</h3>
<p>flex容器的每一个子元素均为一个flex子元素。<strong>注意：flex容器直接包含的文本变为匿名的弹性子元素，同时flexbox布局和原来的布局是两套概念，所以部分css属性在flex子元素中将不起作用，如：float，clear，vertical-align，column-*等</strong></p>
<p>###3. 轴 axis</p>
<p>每个flex子元素沿着主轴（main axis）依次相互排列。交叉轴（cross axis）垂直于主轴。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 属性flex-direction定义主轴方向
- 属性justify-content定义flex子元素如何沿着主轴排列
- 属性align-items定义flex子元素如何沿着交叉轴排列
- 属性align-self覆盖父元素的align-items属性，定义了单独的flex子元素如何沿着交   叉轴排列
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> 属性flex-direction定义主轴方向
</span>-<span class="ruby"> 属性justify-content定义flex子元素如何沿着主轴排列
</span>-<span class="ruby"> 属性align-items定义flex子元素如何沿着交叉轴排列
</span>-<span class="ruby"> 属性align-<span class="hljs-keyword">self</span>覆盖父元素的align-items属性，定义了单独的flex子元素如何沿着交   叉轴排列
</span></code></pre>
<h3 id="articleHeader5">方向 direction</h3>
<p>flex容器的主轴起点边缘（main start）、主轴终点边缘（main end）和 交叉轴起点边缘（cross start）,交叉轴终点边缘（cross end）为flex子元素排列的起始和结束位置。它们具体取决于由writing-mode（从左到右、从右到左等等）属性建立的向量中的主轴和交叉轴位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 属性order将元素依次分组，并决定谁先出现。
- 属性flex-flow是属性 flex-direction 和 flex-wrap 的简写，用于排列flex子元素。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>- 属性<span class="hljs-attribute">order</span>将元素依次分组，并决定谁先出现。
- 属性<span class="hljs-attribute">flex-flow</span>是属性 <span class="hljs-attribute">flex-direction</span> 和 <span class="hljs-attribute">flex-wrap</span> 的简写，用于排列<span class="hljs-attribute">flex</span>子元素。
</code></pre>
<h3 id="articleHeader6">行</h3>
<p>flex子元素根据 flex-wrap 属性控制的侧轴方向（在这个方向上可以建立垂直的新线），既可以是一行也可以是多行排列</p>
<h3 id="articleHeader7">尺寸</h3>
<p>flex子元素宽高可相应地等价于主尺寸（main size）和交叉尺寸（cross size），它们都分别取决于flex容器的主轴和侧轴。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- min-height和 min-width属性的初始值为新增关键字 auto。
- 属性flex是flex-basis，flex-grow和flex-shrink的缩写，代表flex子元素的伸缩性。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>- <span class="hljs-attribute">min-height</span>和 <span class="hljs-attribute">min-width</span>属性的初始值为新增关键字 <span class="hljs-attribute">auto</span>。
- 属性<span class="hljs-attribute">flex</span>是<span class="hljs-attribute">flex-basis</span>，<span class="hljs-attribute">flex-grow</span>和<span class="hljs-attribute">flex-shrink</span>的缩写，代表<span class="hljs-attribute">flex</span>子元素的伸缩性。
</code></pre>
<h3 id="articleHeader8">鸣谢</h3>
<p><a href="http://www.css88.com/archives/5741" rel="nofollow noreferrer" target="_blank">Flexbox布局（CSS3 弹性布局，Flexible Box）之 基本概念解析</a></p>
<h3 id="articleHeader9">后话</h3>
<p>夜深了，早点休息。——（其实是致自己。）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我所知道的flex布局 —— 上篇

## 原文链接
[https://segmentfault.com/a/1190000007743745](https://segmentfault.com/a/1190000007743745)


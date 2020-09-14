---
title: '聊聊flexbox' 
date: 2018-12-24 2:30:07
hidden: true
slug: wbf40hn2nan
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>和一步聊聊布局神器flexbox <a href="https://segmentfault.com/l/1500000012232953">视频讲解 有偿的哦</a>
</blockquote>
<p>本文涉及内容如下： flexbox的基本概念、容器属性学习、项目属性学习、实战演练。 flexbox 堪称布局神器，但属性实在太多让人无从下手，因此将自己所学的知识做个总结。</p>
<h2 id="articleHeader0">基本概念</h2>
<p>flexbox是Flexible Box的缩写，译为弹性布局。flex 布局主要是让容器中的子项目可以根据配置改变自身的宽高及顺序，以最佳的方式填充容器，达到<code>弹性</code>的目的。容器有横轴和纵轴来划分容器，横轴默认为水平方向纵轴为垂直方向。<br><span class="img-wrap"><img data-src="/img/bVZkCz?w=1255&amp;h=450" src="https://static.alili.tech/img/bVZkCz?w=1255&amp;h=450" alt="flex.png" title="flex.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">容器属性</h2>
<p>容器属性用来控制布局的大方向。</p>
<ul>
<li>flex-direction</li>
<li>flex-wrap</li>
<li>flex-flow</li>
<li>justify-content</li>
<li>align-items</li>
<li>align-content</li>
</ul>
<h3 id="articleHeader2">flex-direction</h3>
<p>flex-direction属性决定主轴方向（即项目的排列方向）。 row | row-reverse | column | column-reverse<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/flex-direction.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/flex-direction.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<h3 id="articleHeader3">flex-wrap</h3>
<p>该属性用来控制，当容器的主轴方向放不下所有项目时该如何处理。wrap | wrap-reverse | no-wrap, no-wrap 为默认值。<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/flex-wrap.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/flex-wrap.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<h3 id="articleHeader4">flex-flow</h3>
<p>flex-flow 是 flex-direction 和 flex-wrap 两个属性的简写，你要是记不住也不必强求。默认值为row nowrap。</p>
<h3 id="articleHeader5">justify-content</h3>
<p>justify-content定义子项目在主轴上的对齐方式。可以联想下 <code>text-align</code>。flex-start | flex-end | center | space-between | space-around<br>需要注意的是：space-around的两边的边距要比中间的边距要小一些。<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/justify-content.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/justify-content.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<h3 id="articleHeader6">align-items</h3>
<p>justify-content定义子项目在纵轴上的对齐方式。 flex-start | flex-end | center | baseline | stretch<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/align-items.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/align-items.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<h3 id="articleHeader7">align-content</h3>
<blockquote>align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</blockquote>
<p>也就是说只有当 wrap生效时，该属性才有存在的意义。flex-start | flex-end | center | space-between | space-around | stretch<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/align-content.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/align-content.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<p>以上就是flex 布局所涉及的所以容器属性。下一小结，我们将共同学习项目相关属性。</p>
<h2 id="articleHeader8">项目属性</h2>
<p>项目属性用来控制容器中的项目自身的位置和伸缩。</p>
<ul>
<li>order</li>
<li>flex-grow</li>
<li>flex-shrink</li>
<li>flex-basis</li>
<li>flex</li>
<li>align-self</li>
</ul>
<h3 id="articleHeader9">order</h3>
<p>order 用来控制 flex 项目自身的摆放顺序，默认值为0，可以为负数，值越小项目越靠前摆放。<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/order.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/order.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<h3 id="articleHeader10">flex-grow</h3>
<p>flex-grow控制项目的放大比例，默认为0，不放大。值得注意的是放大的比例是相对于剩余的空间而言，而不是项目自己的大小。<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/flex-grow.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/flex-grow.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<h3 id="articleHeader11">flex-shrink</h3>
<p>flex-shrink 与 flex-grow 类似，主要用来控制项目的缩小比例，默认值为1，同比缩小。<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/flex-shrink.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/flex-shrink.html" rel="nofollow noreferrer" target="_blank">preview</a><br>flex-grow 和 flex-shrink 都是按照剩余空间进行放大缩小的，而不是自身。大家记住瘦死的骆驼比马大。</p>
<h3 id="articleHeader12">flex-basis</h3>
<p>flex-basis 很好理解，若横轴是主轴，flex-basis 可以当做 width 来使用；若纵轴是主轴，flex-basis 可以当做 height 来使用。个人感觉 flex-basis width 和 height 更灵活。</p>
<h3 id="articleHeader13">flex</h3>
<p>flex 属性是 flex-grow flex-shrink flex-basis 三个属性的缩写。同样的原则，为了不增加大家的学习难度，不会不必强求。今天只向大家解释一下 flex: 1;当 flex的值为整数是它代表 flex-grow: 数值； flex-shrink采用默认值1；flex-basis:为0%。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {<span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;}
<span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">0%</span>;
}</code></pre>
<p>那么大家思考一下flex: 2;等同于什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {flex: 2;}
.item {
    flex-grow: 2;
    flex-shrink: 1;
    flex-basis: 0%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {<span class="hljs-attribute">flex</span>: <span class="hljs-number">2</span>;}
<span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">0%</span>;
}</code></pre>
<h3 id="articleHeader14">align-self</h3>
<p>align-self控制自身在侧重的对齐方式，和容器属性 align-items 类似，当然了，优先机肯定是高于他的爸爸的。auto | flex-start | flex-end | center | baseline | stretch<br><a href="https://github.com/xiyuanyuan/flex-demo/blob/master/align-self.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/align-self.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<p>以上项目的属性和练习也完成了，接下来使用 flex 布局实现我们日常工作中常见的三个需求。</p>
<h2 id="articleHeader15">实战</h2>
<p>实现等宽布局，即使项目被删除和添加也不需要更改 css 的代码，常用来实现导航<a href="https://github.com/xiyuanyuan/flex-demo/blob/master/Demo-03.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/Demo-03.html" rel="nofollow noreferrer" target="_blank">preview</a><br>垂直水平居中，该需求是特别常见的使用 flex 特别容易。<a href="https://github.com/xiyuanyuan/flex-demo/blob/master/Demo-02.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/Demo-02.html" rel="nofollow noreferrer" target="_blank">preview</a><br>等高布局，当左右两个框的高度不定时，我们可以考虑使用 flex 实现。<a href="https://github.com/xiyuanyuan/flex-demo/blob/master/Demo-01.html" rel="nofollow noreferrer" target="_blank">code demo</a> <a href="http://xixitoday.com/flex-demo/Demo-01.html" rel="nofollow noreferrer" target="_blank">preview</a></p>
<p><a href="http://flexboxfroggy.com/#zh-cn" rel="nofollow noreferrer" target="_blank">FLEXBOX FROGGY游戏检验一下自己对 flexbox 的理解</a><br>欢迎大家指正批评、或留言。QQ群：538631558</p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊flexbox

## 原文链接
[https://segmentfault.com/a/1190000012194932](https://segmentfault.com/a/1190000012194932)


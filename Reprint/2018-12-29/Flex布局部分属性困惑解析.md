---
title: 'Flex布局部分属性困惑解析' 
date: 2018-12-29 2:30:10
hidden: true
slug: vw44feihqvi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">开始</h1>
<p>最近研究一个框架，刚好里面也实现了flex布局的算法，虽然平时也用到flex做一些简单的布局，但是深入到算法实现的时候，发现自己对flex某些概念倒是没那么清晰，立马谷歌把几个flex涉及的属性都好好理清一下，权当一个自我梳理。</p>
<h1 id="articleHeader1">main-axis和cross-axis</h1>
<p>main其实跟flex-direction这个属性相当有关系，关系如下图：<br><span class="img-wrap"><img data-src="/img/bVV6UE?w=478&amp;h=134" src="https://static.alili.tech/img/bVV6UE?w=478&amp;h=134" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>根据flex-direction的值不同，main-axis方向相应也不同。<br>既然有方向这个概念，这个时候justify-content属性（justify-content主要负责调整main-axis上元素的布局），在取值为flex-start和flex-end时就要注意了。<br>而cross-axis是垂直于main-axis的。</p>
<ul>
<li><p>当flex-direction取值为row或者row-reverse时cross-axis方向是由下往上。</p></li>
<li><p>当flex-direction取值为column或者column-reverse时cross-axis方向是由左往右。</p></li>
</ul>
<h1 id="articleHeader2">align-items和align-content</h1>
<p>首先align-item和align-content都是应用在cross-axis上的元素。<br>flex布局默认情况下元素是不会换行的，这个时候就是align-items起作用的时候，但是当有多行的情况时，align-items的表现就有点令人失望了。例如你期待是这样一个网格的布局：<br><span class="img-wrap"><img data-src="/img/bVV65P?w=600&amp;h=519" src="https://static.alili.tech/img/bVV65P?w=600&amp;h=519" alt="网格" title="网格" style="cursor: pointer; display: inline;"></span></p>
<p>但是实际会是这样的效果：<br><span class="img-wrap"><img data-src="/img/bVV66m?w=598&amp;h=575" src="https://static.alili.tech/img/bVV66m?w=598&amp;h=575" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个网格怎么看都怪怪的有木有。<br>这个时候就是align-content属性大显神威的时候了，align-content主要应用在存在多行的场景下，但是只有单行的时候，它就失去作用了。</p>
<h1 id="articleHeader3">flex-basis</h1>
<p>flex-basis可以说是一个并太起眼的属性但是确有很大的意义。<br>flex-basis的作用，主要在与flex计算剩余空间时起作用，如果你设置flex-basis为一个明确的大小，在计算剩余空间时会先去减去这一部分，然后根据剩余空间为正或为负去应用flex-grow或flex-shrink进行缩放。<br>当flex-basis是默认值auto时，flex-basis等同于元素的自身宽度（例如你设置了width就是该设置的值，如果width也为auto，那就等同于元素内容的宽度）。<br>当flex-basis为0时，就等同于完全依赖于flex-grow的比例和剩余空间的大小去分配。</p>
<h1 id="articleHeader4">额外点</h1>
<p>计算剩余空间时，padding, margin, border和flex-basis是事先扣除，再根据flex-grow去分配空间的。<br>justify-content为space-around时，元素和父元素的间隙是元素与元素间的间隙的一半。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flex布局部分属性困惑解析

## 原文链接
[https://segmentfault.com/a/1190000011428421](https://segmentfault.com/a/1190000011428421)


---
title: '深入理解 flex-grow & flex-shrink & flex-basis' 
date: 2019-02-04 2:30:58
hidden: true
slug: 4s42teg7fwd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p><code>flex</code> 有三个属性值，分别是 <code>flex-grow</code>， <code>flex-shrink</code>， <code>flex-basis</code>，默认值是 <code>0 1 auto</code>。 发现网上详细介绍他们的文章比较少， 今天就详细说说他们，先一个一个看。</p>
<h1 id="articleHeader1">flex-grow</h1>
<p>定义项目的<code>放大</code>比例，默认值为<code>0</code>，就算存在剩余空间，也不会放大。单单几句话肯定不能表达出意思，来看个DEMO。</p>
<p><a href="https://jsfiddle.net/xiecg/var5eabk/" rel="nofollow noreferrer" target="_blank">flex-grow</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiecg/var5eabk/" data-typeid="0">点击预览</button></p>
<p><code>flex-grow</code>的默认值为<code>0</code>，如果没有定义该属性，是不会拥有分配<code>剩余空间</code>的权利的。<code>A, B, C, D, E</code> 的宽度分别是 <code>100, 120, 130, 100, 100</code>，父级的宽度是<code>660</code>，父级宽减去子级的全部宽度，这样<code>剩余空间</code>就是<code>110</code>。例子中<code>B, C</code>定义了<code>flex-grow</code>，分别是<code>1，2</code>，那剩余空间分成3份，B<code>1</code>份，C<code>2</code>份，比例就是<code>1：2</code>，分配计算出来的值就是B :<code>36.666666666666664</code>, C：<code>73.33333333333333</code>。这个时候<code>剩余空间</code>就被计算出来了，相加后的结果就是B：<code>156.66666666666666</code>，C：<code>203.33333333333331</code>。</p>
<p>B的计算公式：<code>120 + (110 / 3) * 1</code></p>
<p>C的计算公式: <code>130 + (110 / 3) * 2</code></p>
<h1 id="articleHeader2">flex-shrink</h1>
<p>定义项目的<code>缩小</code>比例，默认值为<code>1</code>，注意前提是空间不足的情况下，看例子。</p>
<p><a href="https://jsfiddle.net/xiecg/wLsndgLy/" rel="nofollow noreferrer" target="_blank">flex-shrink</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiecg/wLsndgLy/" data-typeid="0">点击预览</button></p>
<p>这里 <code>A, B, C</code> 的宽度分别是<code>155, 200, 50</code>，(注意这里的宽度我是用<code>flex-basis</code>代替的，在这个例子中和<code>width</code>的作用是一样的)。 父级宽度是<code>300</code>，计算超出的空间就是 <code>-105</code>，这样超出的 <code>105px</code> 就要被 <code>A, B, C</code> 消化掉，比例是<code>2：1：1</code>。</p>
<p>如何消化 ？ 首先是每个项目的<code>wdith</code>值乘以<code>flex-shrink</code>值求积，</p>
<p>A：<code>(155 * 2) = 310</code><br>B：<code>(200 * 1) = 200</code><br>C：<code>(50 * 1) = 50</code>。</p>
<p>然后再求和所有项目的乘积。</p>
<p><code>(310 + 200 + 50) = 560</code></p>
<p>得到求占比之后还要乘以要腾出的空间。</p>
<p>A：<code>(310 / 560) * 105</code> = <code>58.125</code><br>B：<code>(200 / 560) * 105</code> = <code>37.5</code><br>C：<code>(50 / 560) * 105</code> = <code>9.375</code></p>
<p>得到每一项要腾出的空间後然後</p>
<p>A：<code>(155 - 58.125) = 96.875</code><br>B：<code>(200 - 37.5) = 162.5</code><br>C：<code>(50 - 9.375) = 40.625</code></p>
<p>好了，这样就得出计算后的宽度了。</p>
<h1 id="articleHeader3">flex-basis</h1>
<p>和<code>width</code>一样，他的默认值为<code>auto</code>，把上面几个例子换成<code>width</code>也是一样的。当然工作中最好用<code>flex-basis</code>，更符合规范。</p>
<h1 id="articleHeader4">总结</h1>
<p>如果父级的空间足够：<code>flex-grow</code>有效，<code>flex-shrink</code>无效。</p>
<p>如果父级的空间不够：<code>flex-shrink</code> 有效，<code>flex-grow</code>无效。</p>
<p>如果你有疑问欢迎讨论，一起学习。</p>
<p>原文：<a href="https://xiecg.github.io/2016/08/28/flex/" rel="nofollow noreferrer" target="_blank"></a><a href="https://xiecg.github.io/2016/08/28/flex/" rel="nofollow noreferrer" target="_blank">https://xiecg.github.io/2016/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 flex-grow & flex-shrink & flex-basis

## 原文链接
[https://segmentfault.com/a/1190000006741711](https://segmentfault.com/a/1190000006741711)


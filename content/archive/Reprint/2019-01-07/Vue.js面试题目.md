---
title: 'Vue.js面试题目' 
date: 2019-01-07 2:30:11
hidden: true
slug: xu736acdirr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue 的优势</h2>
<p>官方认定的卖点：易用 灵活 高效<br>外加：使用数据双向绑定 生态好</p>
<h2 id="articleHeader1">methods 计算属性 watch的区别</h2>
<p>methods和计算属性的区别，照抄官方教程</p>
<blockquote>我们可以将同一函数定义为一个 method 而不是一个计算属性。对于最终的结果，两种方式确实是相同的。然而，不同的是<strong>计算属性是基于它们的依赖进行缓存的</strong>。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。<br>相比而言，只要发生重新渲染，method 调用总会执行该函数。</blockquote>
<p>总之，重新计算开销很大的话请选计算属性，不希望有缓存的请选methods</p>
<p><span class="img-wrap"><img data-src="/img/bVRiOH?w=590&amp;h=655" src="https://static.alili.tech/img/bVRiOH?w=590&amp;h=655" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>至于计算属性和watch我觉得官方例子好像不会太常用...至少这种情况我肯定是会用watch了...<br>这么说来计算属性和watch区别就是watch有新旧值这两个参数，计算属性没有，但是计算属性可以从setter获得新值</p>
<p><span class="img-wrap"><img data-src="/img/bVRiOY?w=605&amp;h=469" src="https://static.alili.tech/img/bVRiOY?w=605&amp;h=469" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">计算属性的实现</h2>
<p>答案在这 <br><a href="https://segmentfault.com/a/1190000010475575">https://segmentfault.com/a/11...</a></p>
<h2 id="articleHeader3">数组和对象的什么操作不会在vue反映</h2>
<blockquote>由于 JavaScript 的限制， Vue 不能检测以下变动的数组：<br>1 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue<br>2 当你修改数组的长度时，例如： vm.items.length = newLength</blockquote>
<p>原因参考这里：<a href="https://segmentfault.com/q/1010000006938552/a-1020000006939230" target="_blank">https://segmentfault.com/q/10...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js面试题目

## 原文链接
[https://segmentfault.com/a/1190000010280212](https://segmentfault.com/a/1190000010280212)


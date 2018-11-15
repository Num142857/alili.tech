---
title: 使用mobx优化React应用程序
reprint: true
categories: reprint
abbrlink: 48d77083
date: 2018-10-19 00:00:00
---

{{% raw %}}

            <p><img src="https://p0.ssl.qhimg.com/t012d37db783bb423d1.png" alt=""></p>
<h1>使用mobx优化React应用程序</h1>
<p>从1.5秒到50-100毫秒（每次更新）</p>
<p>在这里我将简短地讲述我关于如何通过简单的技巧将网络应用程序的性能提高10倍的故事。</p>
<p>我正在为客户构建基于Web的应用程序。 它是视频的字幕（字幕）审核工具。 所以你有一个视频，你有字幕列表，你想编辑它们。</p>
<p><img src="https://p0.ssl.qhimg.com/t012a3cc7e8057bd83c.png" alt=""></p>
<p>有一天，我将大型项目加载到应用程序中。 该项目有数百个标题。 该应用程序并不快，但它工作得很好。 直到我点击第一个标题的“删除”按钮。 我注意到这个操作非常慢。 删除大约需要<strong>1.5秒</strong>。 这个故障非常明显。 它为什么慢？ 经过一番调查后，我发现React必须重新渲染所有删除标题。 你可能会问为什么，如果它只是删除？ 问题是 - 每个标题应显示其索引（见左上角）。 因此，当您删除第一个标题时，需要更新所有其他标题的索引。</p>
<p>作为证据我删除了最后一个元素，它非常快。 为什么索引更新速度慢可能仍然很奇怪。 即使反应不需要触及很多元素（pfuuu，只有几百个），它需要做很多工作。 它需要为每个元素调用render，它需要创建一个新的虚拟DOM树，它需要计算更改并且需要应用它们。 此操作需要很长时间，因为一个标题组件内部有许多元素。</p>
<p>我开始考虑使用<a href="https://github.com/bvaughn/react-virtualized">react-virtualized</a> 来隐藏隐形字幕。 这应该100％解决问题。 但是，该应用程序在几个条件下有一些关于滚动列表的功能。 要计算正确的滚动位置，我需要所有元素都在DOM中（否则计算过于复杂）。 由于我有一些遗留代码，这种更改可能需要很长时间才能实现和测试，在某些情况下可能会破坏应用程序。</p>
<p>所以我继续考虑更快的解决方案。 在那个项目中，我使用<a href="https://mobx.js.org/">mobx</a> 进行状态管理。 关于它的很酷的事情是可观察的值和创建OBSERVE改变的React组件的能力。 所以我想：我需要更新item元素但是如何直接更新索引而不调用整个标题的渲染？</p>
<p>这是渲染函数在更改之前的部分：</p>
<p><img src="https://p0.ssl.qhimg.com/t017ce4c78d49580fb1.png" alt=""></p>
<p><a href="https://github.com/mobxjs/mobx-react">mobx-react</a> 自动跟踪渲染功能中属性的使用。 “index”属性已更改 - 组件已更新。</p>
<p>但这里有快速简单的解决方法。 让我们创建用于显示JUST索引的特殊组件：</p>
<p><img src="https://p0.ssl.qhimg.com/t015bba4e6fced7015a.png" alt=""></p>
<p>然后我们将在整个项目的渲染中使用此组件：</p>
<p><img src="https://p0.ssl.qhimg.com/t01763f4c7f901ebb45.png" alt=""></p>
<p>它改变了什么？ 在这种情况下，我没有直接在项目渲染中使用“index”属性。 因此，当我更新索引时，此组件未更新（它不会观察到更改）。 但是，子组件将被更新（直接且非常快），因为它会侦听“index”属性的更改。</p>
<p>请注意，如果您将在此处直接使用索引，则此方法将无效:</p>
<p><img src="https://p0.ssl.qhimg.com/t01fe56ba3bd140cfe4.png" alt=""></p>
<p>不好的例子</p>
<p>通过这种简单的重构，性能提升了很多。</p>
<p>每当你想要修复网络应用程序的性能时，记住要聪明并且<strong>测量性能</strong>。 在我的例子中，一个item元素有许多属性（索引，文本，开始时间，结束时间和许多其他）。 而且我没有将所有这些属性的渲染移动到单独的组件中。 这没有任何意义。</p>
<blockquote>
<p>问题：如果使用纯<strong> setState </strong>或redux架构，应用类似内容的最佳方法是什么？ 我脑子里没有任何美丽的东西，对吗？</p>
</blockquote>
<hr>
<p>您的网络应用程序是否存在性能问题？ <a href="https://lavrton.com/web-perf.html">点我求助.</a></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/optimizing-react-application-with-mobx](https://www.zcfy.cc/article/optimizing-react-application-with-mobx)
原文标题: 使用mobx优化React应用程序
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

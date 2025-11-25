---
title: '如何更好的使用JavaScript数组' 
date: 2019-02-07 2:30:15
hidden: true
slug: a2eeriid7ul
categories: [reprint]
---

{{< raw >}}

            <p><img src="https://p0.ssl.qhimg.com/t01506ff52035a4a758.jpg" alt=""></p>
<p>快速阅读，我保证。在过去几个月，在我检查拉取请求时，确切相同的四个错误不断出现。我也发表了这篇文章，因为我自己也犯过这些错误!让我们浏览它们以确保正确使用数组方法!</p>
<h3>用 Array.includes代替Array.indexOf</h3>
<p>“如果想在数组中查找某些内容，请使用Array. indexof”。我记得在学习JavaScript的时候，我在课上读过这样一句话。毫无疑问，这句话是千真万确的!</p>
<p>Array.indexOf “返回可以找到给定元素的第一个索引”，MDN文档这样说。因此，如果我们稍后在代码和数组中使用返回的索引。indexOf是解决方案。</p>
<p>但是，如果我们只需要知道数组是否包含一个值，该怎么办?看起来像是一个是/否的问题，一个布尔问题。像这种情况，我推荐使用返回布尔值的Array.includes。</p>
<h3>使用Array.find 代替Array.filter</h3>
<p>Array.filter是一个非常有用的方法。它从另一个数组中创建一个新数组，所有项都传递回调参数。 如其名称所示，我们必须使用此方法进行过滤，并获得更短的数组。</p>
<p>但是，如果知道我们的回调函数只能返回一个项，我将不会推荐它，例如，当使用一个通过唯一ID过滤的回调参数时。在这种情况，Array.filter 将会返回一个新的只含有一个项数组。通过查找特定的ID，我们的意图可能是使用数组中包含的唯一值，使这个数组无用。</p>
<p>一起讨论下性能，为了返回所有与回调函数数组匹配的项。Array.filter必须遍历整个数组。 此外, 想象一下，如果返回值有数百个是符合的项 ，过滤数组将变得非常庞大。</p>
<p>为了避免这些情况，我推荐Array.find.它需要一个像 Array.filter的回调参数，它返回满足这个回调的第一个元素的值。此外，Array.find 当项返回回调的时停止，它不需要浏览全部数组。</p>
<h3>使用Array.some代替Array.find</h3>
<p>我承认我犯过很多次这个错误，然而，一个好朋友告诉我，检查 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_2">MDN documentation</a> 是一个很好的方法。事情是这样的:这与我们的Array. indexof /Array.includes 非常相似。</p>
<p>在前面的例子中，我们看到了Array.find需要一个回调作为参数，并返回一个元素。如果我们需要知道数组中是否包含值，那么Array.find是最佳解决方案?可能不会，因为它返回一个值，而不是一个布尔值。</p>
<p>像这种情况，我推荐使用Array.some 返回一个需要的布尔值。</p>
<h3>使用Array.reduce代替Array.filter连接Array.map</h3>
<p>事实上，理解Array.reduce并不简单。这是真的，但是，如果我们执行 Array.filter, 然后执行Array.map 看起来像遗漏了些什么对吧？</p>
<p>我的意思是，这里我们遍历了两遍数组。第一次过滤并生成一个短数组，第二次通过Array.filter又创造了新的数组，包含基于获得的新值。为了得到新的数组，我们使用了两个Array方法。每个方法有自己的回调函数和一个以后不能使用的数组—由Array.filter创建数组。</p>
<p>为了避免在这个问题上表现不佳, 我建议使用Array.reduce 来代替.同样的结果，更完美的代码！Array.reduce 允许您过滤和添加满意的项目累加器。例如, 这个累加器可以是要递增的数字、要填充的对象、要连接的字符串或数组。</p>
<p>在我们的例子中，自从我们使用 Array.map,我推荐使用Array.reduce 作为数组累加器. 在下面的例子中, 根据env的值, 我们将把它添加到累加器中，或者让这个累加器保持原样。</p>
<h4>就是这样！</h4>
<p>希望这个有帮助. 如果你对这篇文章有什么想法或者有其他例子要展示，一定要留下评论。如果你发现这篇文章对你有帮助，一定要给我个赞并将它分享出去。感谢阅读！</p>
<p>PS: 你可以在twitter(<a href="https://twitter.com/pacdiv_io">https://twitter.com/pacdiv_io)</a>上关注我。</p>
<p><em>Note:</em>在评论中 ，正如前面提到的<a href="https://medium.com/@malgosia.stepniak">malgosiastp</a> 和 <a href="https://medium.com/@qwertie">David Piepgrass</a> , 使用前请检查框架是否支持 Array.find 和 Array.includes,目前Internet Explorer是不支持的。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何更好的使用JavaScript数组

## 原文链接
[https://www.zcfy.cc/article/here-s-how-you-can-make-better-use-of-javascript-arrays](https://www.zcfy.cc/article/here-s-how-you-can-make-better-use-of-javascript-arrays)


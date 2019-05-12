---
title: 'HTML语义化' 
date: 2019-02-09 2:30:59
hidden: true
slug: h6xg3k74mf4
categories: [reprint]
---

{{< raw >}}

                    
<p>近来看面试题的时候，经常看到一个问题：HTML语义化是什么意思？<br><a href="http://www.w3school.com.cn/tags/index.asp" rel="nofollow noreferrer" target="_blank">w3school里面有html标签的含义。</a>然而HTML5中对一些标签进行了修改，由于不了解H5的新定义，就很容易弄错标签之间的意思。例如：既然i标签是指斜体的意思，那么为什么font-awesome这类字体要用i标签呢？这不是反语义化了吗？除此之外，em和strong都是有强调的意思，又有什么区别呢？可能这个时候又会有人说，我用div+span+css就可以实现同样的页面效果，为什么非得用什么语义化的&lt;artical&gt;,&lt;ul&gt;来表示呢？<br>问题很多，我们一个一个来看。<br>【均为学习过程中的个人理解，可能有误。若有误解请指出，谢谢！】</p>
<h3 id="articleHeader0">HTML语义化是什么？</h3>
<p>语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。</p>
<h3 id="articleHeader1">为什么要语义化？</h3>
<ul>
<li><p>有利于SEO，有助于爬虫抓取更多的有效信息，爬虫是依赖于标签来确定上下文和各个关键字的权重。</p></li>
<li><p>语义化的HTML在没有CSS的情况下也能呈现较好的内容结构与代码结构</p></li>
<li><p>方便其他设备的解析</p></li>
<li><p>便于团队开发和维护</p></li>
</ul>
<h3 id="articleHeader2">易混淆的HTML标签详解</h3>
<ul><li><h4>i 标签</h4></li></ul>
<blockquote><p>The HTML &lt;i&amp;gt; Element represents a range of text that is set off from the normal text for some reason, for example, technical terms, foreign language phrases, or fictional character thoughts. It is typically displayed in italic type.</p></blockquote>
<p>i标签效果，i标签通常表示因为某种原因和正常文本不同的文本，例如专业术语、外语短语或排版用的文字。通常表现为斜体。</p>
<p>这也解决了我们之前提到的“为什么font-awesome这类字体是用i标签”这个问题。</p>
<ul><li><h4>em 标签</h4></li></ul>
<blockquote><p>The HTML element emphasis  &lt;em&amp;gt; marks text that has stress emphasis. The &lt;em&amp;gt; element can be nested, with each level of nesting indicating a greater degree of emphasis.</p></blockquote>
<p><em> em标签效果。em表示强调的文本。视觉上也是斜体的效果</em></p>
<ul><li><h4>strong标签</h4></li></ul>
<blockquote><p>The HTML Strong Element (&lt;strong&amp;gt;) gives text strong importance, and is typically displayed in bold.</p></blockquote>
<p><strong>strong标签效果。以加粗的形式展现。表示这个文本的重要性，在HTML4中表示特别强调，HTML5中描述为“strong importance for its contents”</strong></p>
<ul><li><h4>b标签</h4></li></ul>
<blockquote><p>The HTML &lt;b&amp;gt; Element represents a span of text stylistically different from normal text, without conveying any special importance or relevance. It is typically used for keywords in a summary, product names in a review, or other spans of text whose typical presentation would be boldfaced. Another example of its use is to mark the lead sentence of each paragraph of an article.</p></blockquote>
<p><b>b标签效果。表示的文本风格不同于正常的文本，没有表达任何特殊的重要性和相关性。通常用于关键字回顾，回顾中的产品名称或者是其他需要表现为粗体的文本。另一个例子是标志每个段落的lead sentence。</b></p>
<p>在HTML4之前b元素是为了使文本变为黑体，HTML4后样式信息已经被弃用，所以b元素的意义已经更改了。<br>不要使用b标签来标记标题，标题使用&lt;h1&gt;~&lt;h6&gt;标签。而且，当它们没有必要显示为粗体时，样式表可以改变这些元素的默认样式。<br>为了传达更多的语义信息，可以给b元素添加class属性，例如 b class ="lead"来标记每个段落的第一个句子。<br>如果没有语义上的目的，使用css属性的font-weight:bold来让文本加粗会更好。</p>
<ul><li><h4>mark</h4></li></ul>
<blockquote><p>The HTML Mark Element (&lt;mark&gt;) represents highlighted text, i.e., a run of text marked for reference purpose, due to its relevance in a particular context. For example it can be used in a page showing search results to highlight every instance of the searched-for word.</p></blockquote>
<p>mark的效果如下图。&lt;mark&gt;表现为高亮文本。例如我们在网页上查找关键字时，找到的结果就会以高亮的形式展现。<br><span class="img-wrap"><img data-src="/img/bVxLLB" src="https://static.alili.tech/img/bVxLLB" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>不要使用mark元素来实现语法高亮，而是用span元素。<br>mark元素通常是表示跨越不同的上下文中的相关文本。</p>
<h3 id="articleHeader3">HTML5新标签</h3>
<ul><li><h4>section</h4></li></ul>
<blockquote><p>表示文档中的一个区域（或节），比如，内容中的一个专题组，一般来说会有包含一个标题（heading）。一般通过是否包含一个标题 (&lt;h1&gt;-&lt;h6&gt; element) 作为子节点来辨识每一个&lt;section&gt;。一般来说，一个 &lt;section&gt; 应该出现在文档大纲中。</p></blockquote>
<ul><li><h4>artical</h4></li></ul>
<blockquote><p>&lt;article&gt;元素表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。</p></blockquote>
<h3 id="articleHeader4">不同标签的区别</h3>
<h4>em vs i</h4>
<p>虽然em标签也是显示为斜体的效果，但不能说因为效果一样就使用i标签来代替em标签。因为二者表示的含义不同。<br>举个例子。em标签：just <em> do </em> it already! <br>那么一个人或者一个软件在读这句话时，就会以强调加重的语气来读do这个单词。<br>对于i标签：The word  the  is an article。那么在这句话中斜体并没有强调的语气。只是表明the是一个article，而不是我们平时的冠词。</p>
<h4>em vs strong</h4>
<p>在HTML4中，strong一般指的是更强的强调。HTML5中strong表示的是内容的重要性。em被用来改变一个句子的含义，例如" I <em>love</em> carrots" vs " I love <em>carrots</em>"。而strong通常用来给部分句子增加重要性。例如"<strong>Warning!</strong>This is <strong>very dangerous</strong>"</p>
<h4>strong vs b</h4>
<p>strong 和 b 算是最相似的两个元素了。那么二者之间的差别。strong表示的是一种逻辑状态，而bold表示的是物理状态。逻辑状态是从内容中分离出来，以各种不同的形式来展现，可能你想标记为红色或者下划线或者其他，那么改变strong的属性比改变bold的属性更有意义。因为bold只是making bold，并不做任何重点性强调性的区分。</p>
<p>参考资料：</p>
<ol>
<li><p><a href="http://www.cnblogs.com/freeyiyi1993/p/3615179.html" rel="nofollow noreferrer" target="_blank">理解HTML语义化</a></p></li>
<li><p><a href="http://www.cnblogs.com/lovefan/p/3855513.html" rel="nofollow noreferrer" target="_blank">HTML语义化</a></p></li>
<li><p><a href="http://www.html5jscss.com/html5-semantics-section.html" rel="nofollow noreferrer" target="_blank">HTML5的革新——语义化标签</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" rel="nofollow noreferrer" target="_blank">HTML element reference</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004285858">HTML语义化标签探析</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML语义化

## 原文链接
[https://segmentfault.com/a/1190000005626375](https://segmentfault.com/a/1190000005626375)


---
title: '聚焦Quantum:浏览器引擎是个神马东西？' 
date: 2019-01-19 2:30:10
hidden: true
slug: cjhymwu98d
categories: [reprint]
---

{{< raw >}}

            <p>_去年10月，<a href="https://medium.com/mozilla-tech/a-quantum-leap-for-the-web-a3b7174b3c12">Mozilla宣布了Project Quantum</a>--倡导开发下一代浏览器引擎。 现在我们正在进行该项目。 其实我们已经是在上个月使用Firefox 53发布了我们的<a href="https://hacks.mozilla.org/2017/04/firefox-53-quantum-compositor-compact-themes-css-masks-and-more/">第一个重要的Quantum部分</a> 。</p>
<p>我们意识到，对于非浏览器开发人员而言是很难意识到我们对Firefox浏览器进行着多么大改动。毕竟，我们正在调整的许多方面最终不会被用户肉眼所见。</p>
<p>因此，我们开始发布一系列博客来对Quantum项目正在做的事情进行一个深入的观察。我们希望这一系列的文章可以使大家对Firefox的运行能更好的理解，以及认识我们正如何打造下一代浏览器引擎去更好地利用现代计算机硬件。</p>
<p>在此系列开始之前，我们认为最好先阐述一下Quantum正在改变的一些根本的东西。</p>
<p>何为浏览器引擎，其工作原理如何？</p>
<p>追本溯源，方可知其始末。</p>
<p>浏览器引擎是一款软件，用于加载文件（通常来自远程服务器）并将这些文件在本地展示出来，供使用者进行交互。</p>
<p>Quantum是我们在Mozilla中进行的一个项目的代号，用于大规模升级Firefox其中的一个组成部分，该部分用于决定将远程文件如何展示给用户，在专业术语中被称为“浏览器引擎”，如果没有它，便只能浏览代码，而不能浏览到真实的网页。Firefox的浏览器引擎被称为“Gecko”</p>
<p>可以很简单地将浏览引擎理解为单个的黑盒子，就类似将电视数据输入，由黑盒决定在屏幕上显示什么内容去描述这些数据。我们今天的问题是：这如何实现的？将数据转化为我们看到的网页的步骤是哪些？</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/05/black-box.png"><img src="https://p0.ssl.qhimg.com/t012a1aa1c422fd6315.png" alt=""></a></p>
<p>构成网页的数据很多，但大多数分为三部分：</p>
<ul>
<li>描述页面_结构_的代码</li>
<li>提供<em>样式（style）</em>的代码：结构内容在视觉上的呈现</li>
<li>由浏览器执行的<em>脚本（script）</em>功能代码 ：计算，响应用户操作，还有修改最初加载的结构和样式 </li>
</ul>
<p>浏览器引擎将结构和样式组合在一起，用于在屏幕上绘制页面，并找出它的哪些地方是可交互的。</p>
<p>一切从结构开始。当要求浏览器请求一个网址的时候，需要提供一个地址给它。这个地址所在的是另一台计算机，一旦连接，会给浏览器传回数据。这一过程具体如何进行的细节，参考这篇独立的<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP">文献</a>，而最终浏览器只是会获取这些数据。这些数据以HTML格式发回，它描述了网页的结构。 浏览器如何理解HTML呢？</p>
<p>浏览器引擎包含一些称为解析器的特殊代码，可将数据从一种格式转换为另一种被浏览器保存在内存中的格式 <a href="https://hacks.mozilla.org/#footnote-1">1</a>。HTML解析器获取像这样的HTML代码：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>`Hello!`<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://example.com/image.png"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre><p>解析后的理解：</p>
<blockquote>
<p>好的，有一个<code>section</code>。 在<code>section</code>内部有一个包含文本为“Hello！”的1级<code>head</code>，还有一张图像， 图像数据来源地址：<em><a href="http://example.com/image.png">http://example.com/image.png</a></em></p>
</blockquote>
<p>网页内部存储的结构称为<a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction">文档对象模型 (Document Object Model)</a>，简称DOM。 与一段长文本所不同的是，DOM描述最终页面元素的树：各个元素的属性以及哪些元素位于其他元素内。</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/05/html-diagra.png"><img src="https://p0.ssl.qhimg.com/t01362ed442302c599e.png" alt="A diagram showing the nesting of HTML elements"></a></p>
<p>除了描述页面的结构之外，HTML还包括获取样式和脚本的地址。 当浏览器发现这些地址时，它会连接这些地址并加载它们的数据。 这些数据之后提供给专门处理对应数据格式的其他解析器。如果找到脚本，则可以在文件完成分析之前修改页面结构和样式。 样式格式CSS在我们的浏览器引擎中扮演下一个角色。</p>
<h2>加入样式</h2>
<p>CSS是一种编程语言，可让开发人员描述页面上指定元素的外观。 CSS即“层叠样式表”（Cascading Style Sheets），这样命名是因为它允许多套样式代码，可以覆盖更早或更通用的代码（称为级联）。 部分CSS代码可能如下所示：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">section</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid blue;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
}
<span class="hljs-selector-class">.main-title</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3em</span>; 
}
<span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}

</code></pre><p>CSS J基本上被分解成一个个规则，每个规则由两个部分组成。首先是选择器。选择器描述了被赋予样式的DOM（参照前文所述）中的元素，还有要应用于与选择器匹配的元素的样式声明列表。浏览器引擎包含一个称为CSS引擎的子系统，它的任务是获取CSS代码并将其应用于由HTML解析器创建的DOM。</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/05/style-engine-1.png"><img src="https://p0.ssl.qhimg.com/t017ca7924e95923925.png" alt=""></a></p>
<p>例如，在以上的CSS中，指向<code>section</code>选择器的规则，这个规则会匹配在DOM中名字为section的元素。然后会为每个DOM元素生成并样式注明。 最终DOM中的每个元素都被赋予了样式，我们称这个状态为该元素计算后的样式。当多个竞争关系的样式应用于同一个元素时，更后面或更具体的样式会胜出。可以降样式表视为一层层薄的描图纸，每一层都可以覆盖之前其他层的内容，但同时也能通过这一层看到其他层的内容。</p>
<p>一旦浏览器引擎完成样式的计算，就是使用它的时候了。DOM和计算后的样式交由布局引擎处理，处理过程会考虑到即将展示的窗口的大小。布局引擎使用多种算法去处理每一个元素，绘制出包含元素内容的盒子，并将应用到元素上的样式考虑在内。</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/05/layout-time.png"><img src="https://p0.ssl.qhimg.com/t0118bcd41c064217d7.png" alt=""></a></p>
<p>布局完成后，是时候将页面的设计变成您看到的部分。 这个过程被称为绘制，它是所有先前步骤的最后组合。 由布局定义的每个框都被绘制，带有来自DOM的内容以及来自CSS的样式。 用户现在看到了被代码重新构建过的页面。</p>
<p>过程便是如此！</p>
<p>当用户滚动页面时，我们会重新绘制，以显示之前在窗口之外的页面的新部分。 但事实证明，用户喜欢滚动！ 可以相当肯定，浏览器引擎会被要求显示其初始绘制的窗口（即视窗）之外的内容。 更现代的浏览器考虑到这个情况，绘制了比最初可见部分更多的页面。 当用户滚动时，他们想要查看的页面部分已经被绘制并准备就绪。 因此，滚动可以更快，更顺畅。 这种技术是合成的基础，用于减小需要的绘制量。</p>
<p>此外，有时我们需要重新绘制屏幕的部分内容。 也许是因为用户正在观看每秒60帧的视频。 或者，也因为页面上有幻灯片在放映或存在动画列表。 浏览器可以检测到页面的某些部分会移动或更新，而不是重新绘制整个页面，他们会创建一个图层来保存该内容。 一个页面可以由多个彼此重叠的图层组成。 图层可以改变位置，滚动，透明度，或移动到其他层的后面或前面，而不必重新绘制任何东西！ 方便至极。</p>
<p>有时脚本或动画会更改元素的样式。 发生这种情况时，样式引擎需要重新计算元素的样式（以及页面上可能的更多元素的样式），重新计算布局（执行重排）并重新绘制页面。 这在计算上需要很长时间，但只要不经常发生，这个过程不会对用户的体验产生负面影响。</p>
<p>在现代Web应用程序中，文档的结构经常被脚本改变。 这可能需要整个渲染过程或多或少从头开始，HTML到DOM的解析，样式计算，重排和绘制。
<a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/05/browser-diagram-full-2.png"><img src="https://p0.ssl.qhimg.com/t01900e5d2aceb3bb1c.png" alt=""></a></p>
<h2>标准</h2>
<p>并非每个浏览器都以同样的方式解析HTML，CSS和JavaScript。 效果可能会有所不同：从小的视觉上的不同，到偶尔网页在两个浏览器中运行得完全不同。 如今，在现代网络上，无论您选择哪种浏览器，大多数网站似乎都能正常工作。 那浏览器如何达到这种一致性呢？</p>
<p>网站代码的格式，以及代码如何被解析和转化成可以可交互页面的规则，是由相互协商出来的被称为标准的文档所定义的。这些文档是由来自浏览器制造商，Web开发人员，设计人员和其他业界成员的代表组成的委员会开发的。 它们共同决定了浏览器引擎在给定具体的代码时应具有的准确行为。参见 <a href="https://developer.mozilla.org/en-US/docs/Web_Standards">HTML, CSS, and JavaScrip标准</a>，图片、视频、音频等标准也包含其中。</p>
<p>这为什么很重要？ 因为这样有可能创建一个全新的浏览器引擎，只要确保遵循标准，引擎就与所有其他浏览器用一样的方式，为互联网上数十亿的网页绘制页面。 这意味着制作网站的“秘诀”不是属于任何一个浏览器的秘密。 这样的标准允许用户根据自己的需求选择浏览器。</p>
<h2>Moore’s No More 摩尔定律不再</h2>
<p>在计算机的洪荒时代，人们只有台式电脑，所以假设电脑只会变得更快、更强大是相对安全的。这一想法是基于被称为<a href="https://en.wikipedia.org/wiki/Moore%27s_law">摩尔定律</a>的一项观察报告——元件的密度（以及硅片的精细化程度/效率）将大约每两年翻一番。难以置信的是，这一理论在21世纪持续被证实，并且有些人认为仍然适用今天的研究领域的最前沿。那么为什么电脑的平均速度在过去的10年里似乎已经趋于稳定呢？速度并不是客户购买电脑时唯一关注的功能。 快速计算机耗电量会大，容易发热，而且非常昂贵。 有时候，人们需要一台电池寿命良好的便携式电脑。 有时候，他们需要一台小巧的触摸屏电脑，它的相机可以放在口袋里，一整天不需要充电！计算性能的进步使之成为可能（这是神奇的），但需要提升原始速度Advances in computing have made that possible (which is amazing!), but at the cost of raw speed。正如极限速度运行你的计算机的效率并不高。对此的解决方法是在一个CPU芯片中具有多个“计算机”（核）。拥有4个更小，功能更弱的核心的智能手机并不罕见。</p>
<p>不幸的是，历史上网络浏览器设计，基本上以这种假设的速度曲线向前推进。 另外，编写能够同时使用多个CPU内核的代码可能会_非常_复杂。 那么，在多微型计算机的时代，我们如何制造出一款快速高效的浏览器呢？</p>
<p>办法我们是有滴！</p>
<p>在接下来的几个月中，我们将仔细研究Firefox的一些变化，以及他们将如何更好地利用现代硬件来提供<a href="https://www.mozilla.org/en-US/firefox/developer/">更快，更稳定的浏览器</a> ，让网站变得亮眼。</p>
<p>进击吧！</p>
<p>[1]:你的大脑可以做类似解析的事情：单词"eight"是拼写单词的一串字母，但是你将它们转换为头脑中的数字8，而不是字母e-i-g-h-t。 <a href="https://hacks.mozilla.org/#footnote-1-top">back</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聚焦Quantum:浏览器引擎是个神马东西？

## 原文链接
[https://www.zcfy.cc/article/quantum-up-close-what-is-a-browser-engine](https://www.zcfy.cc/article/quantum-up-close-what-is-a-browser-engine)


---
title: '[译] 关于两种视口（viewport）的故事：其一' 
date: 2019-02-04 2:30:58
hidden: true
slug: sq56p1zfd8m
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文地址：<a href="http://quirksmode.org/mobile/viewports.html" rel="nofollow noreferrer" target="_blank">http://quirksmode.org/mobile/...</a></p></blockquote>
<p><strong>这篇小短文中，我将会介绍关于viewport与诸如html元素，window 对象，screen 对象这类重要对象在呈现方面的原理。</strong></p>
<p>本篇讨论桌面浏览器，其目的是为了后续讨论类似的移动端行为提供一定基础。大量web开发者早已凭直觉理解了许多桌面端的概念。但是，在移动端这些概念将变得复杂起来，所以预先对这些我们熟知的术语进行讨论将有助于你对移动端浏览器行为的理解。</p>
<h2 id="articleHeader0">有关概念之：设备像素与CSS像素</h2>
<p>你首先需要理解什么是CSS像素，它与设备像素又有何区别。</p>
<p>设备像素是我们直觉上认为是“正确”的像素。它能给予一个关于你使用何种设备的正式结论，并且能通过'screen.width/height'获得。</p>
<p>假设有一个宽为128px的元素，屏幕宽度为1024px。当你最调整合适时，元素会占屏幕的1/8.</p>
<p>如果你缩放屏幕，你将得到不同的结果。假设你将屏幕放大到200%，你的128像素的元素将会占1024像素的屏幕的1/4。</p>
<p>缩放在现代浏览器中的应用无非用像素尺寸的变化来实现。这并不是说元素的宽度由128增大到256像素，而是像素点变为原来的两倍。形式上，即便元素占了256的设备像素，它依旧只有128的CSS像素。</p>
<p>换言之，一个放大到200%的CSS像素点是设备像素点尺寸的四倍。(宽度两倍，高度两倍，总体四倍)。</p>
<p>以下图片将更直观的描述这一概念。在一个四像素100%缩放的例子中：CSS像素与设备像素完全重叠。</p>
<p><span class="img-wrap"><img data-src="/img/bVce0i" src="https://static.alili.tech/img/bVce0i" alt="csspixels_100.gif" title="csspixels_100.gif" style="cursor: pointer; display: inline;"></span></p>
<p>现在进行缩小操作，CSS像素尺寸开始缩小，这意味着一个设备像素可以覆盖多个CSS像素。</p>
<p><span class="img-wrap"><img data-src="/img/bVce0m" src="https://static.alili.tech/img/bVce0m" alt="csspixels_out.gif" title="csspixels_out.gif" style="cursor: pointer; display: inline;"></span></p>
<p>如果你进行放大操作，CSS像素尺寸开始扩大，现在一个CSS像素可以覆盖多个设备像素。</p>
<p><span class="img-wrap"><img data-src="/img/bVce0p" src="https://static.alili.tech/img/bVce0p" alt="csspixels_in.gif" title="csspixels_in.gif" style="cursor: pointer; display: inline;"></span></p>
<p>这里的关键点在于<em>CSS像素</em>。它决定了你的样式表的呈现。</p>
<p>设备像素对于你来说几乎是完全无用的。当页面不方便阅读时，用户将通过缩放操作来达到舒适的阅读体验。但是，当缩放的水平无法达到你的要求时，浏览器会自动调整CSS布局的放大或缩小。</p>
<h4>100%缩放</h4>
<p>我们通过假定一个100%缩放的例子展开话题。是时候给一个略微严格的定义了：</p>
<blockquote><p>在缩放水平为100%时，一个CSS像素实际上等价与一个设备像素。</p></blockquote>
<p>这个关于100%缩放的概念对于后续的阐释是非常重要的。但你不必太过纠结日常的工作，因为在桌面端你的站点通常都是以100%缩放被打开的，即便用户使用了缩放，CSS的像素魔法也会确保样式以相同的比例呈现。</p>
<h2 id="articleHeader1">屏幕尺寸</h2>
<p>让我们来关注一些实际的尺寸，首先先从<code>screen.width</code>与<code>screen.height</code>说起。即用户屏幕的高度与宽度。我们用设备像素来描述这一尺寸，因为其永远不会变化：注意这是显示器的特性而非浏览器，不要混淆。</p>
<p><span class="img-wrap"><img data-src="/img/bVce0D" src="https://static.alili.tech/img/bVce0D" alt="desktop_screen.jpg" title="desktop_screen.jpg" style="cursor: pointer;"></span></p>
<p>这看起来相当有趣！但我们能有这些信息做什么？</p>
<p>事实上，对于我们屏幕尺寸并没什么卵用。除非你你想要记录它们并在web统计数据库中使用，那么它会有那么点用。</p>
<h2 id="articleHeader2">window 尺寸</h2>
<p>相反，你需要知道的是浏览器window的内在尺寸。它能反映出用户能使用多少空间来进行CSS布局。你能通过<code>window.innerWidth</code>与<code>window.innerHeight</code>获取。</p>
<p><span class="img-wrap"><img data-src="/img/bVCtuL" src="https://static.alili.tech/img/bVCtuL" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以明显看出，window的内部宽度使用CSS像素衡量。你必须要知道你的布局有多少显示在浏览器窗口中，并且当用户放大时它们的尺寸时如何减少的。因此，如果用户进行放大操作时，你在window上的可用空间将会变小并且window.innerWidth/Height也将变小。</p>
<p><em>（注：这里虽然进行了放大操作，但由于只是每个css像素点变大（设备宽度无变化）且css的尺寸并没有改变，所以能呈现在窗口中的尺寸反而时减小的）</em></p>
<p>(对于Opera存在例外情况，即当用户进行放大操作时，其浏览器的window.innerWidth/Height并没有缩小。这是由于在Opera 使用设备宽度而非CSS宽度衡量。这在桌面端无关痛痒，但在移动端确实致命的，我们将在稍后进行讨论。)</p>
<p><span class="img-wrap"><img data-src="/img/bVce0J" src="https://static.alili.tech/img/bVce0J" alt="desktop_inner_zoomed.jpg" title="desktop_inner_zoomed.jpg" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">滚动偏移（offset）</h2>
<p>window.pageXOffset与window.pageYOffset用来衡量文档中垂直与水平方向上的偏移量。因此，通过这它们你可以获取用户页面的此刻的滚动情况。</p>
<p><span class="img-wrap"><img data-src="/img/bVCwUD" src="https://static.alili.tech/img/bVCwUD" alt="desktop_page.jpg" title="desktop_page.jpg" style="cursor: pointer;"></span></p>
<p>它们也是通过CSS像素衡量的。无论是否处于放大状态，你都可以通过其来获取文档被向上滚动的情况信息。</p>
<p>理论上讲，如果用户向上滚动页面并且进行放大操作，window.pageX/YOffset将会变化。但浏览器默认会保持页面前后一致，即在用户放大时保证同一元素出现在页面顶部可见区域。虽然，这并不总是奏效，但这意味着实践中window.pageX/YOffset并不真的需要变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVCwX9" src="https://static.alili.tech/img/bVCwX9" alt="desktop_page_zoomed.jpg" title="desktop_page_zoomed.jpg" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">视口（viewport）的概念</h2>
<p>在我们继续讨论更多JS属性前，让我们先学习另一个概念视口（viewport）。</p>
<p>视口（viewport）的作用是限制&lt;html&gt;元素，&lt;html&gt;元素是所有网页块元素中最高一级的元素。</p>
<p>这可能听着有点晕，所以举一个实际的例子。假设在一个流式布局中，你其中一个边栏的宽度是10%。现在当你改变浏览器宽度时，边栏会一致的缩放。那么问题来了，他究竟是如何工作？</p>
<p>原理上说，当你给sidebar一个10%的宽度，实际上它获得了父级宽度的10%。让我们来考察一下（你并没有设定宽度的）body元素。那么问题来了，body元素的宽度是多少？</p>
<p>通常，所有块级元素的宽度都会等于父元素（这里有些特例，但不要在意细节）。所以&lt;body&gt;元素与其父级&lt;html&gt;元素等宽 element。</p>
<p>那么&lt;html&gt;元素的宽度又如何？为何他与浏览器窗口等宽？由于与浏览器窗口等宽，这也就是为什么你设置边栏宽度为10%他就占据了整个浏览器宽度的10%。这是一条所有的web开发人员感性上认可并使用的原理。</p>
<p>你不知道的只是在理论上，这条原理如何实现。理论上，&lt;html&gt;元素的宽度被视口限制。而&lt;html&gt;元素占据了100%的视口宽度的。</p>
<p>视口宽度又正好等于浏览器宽度:就是这么定义的。视口并非一个HTML结构，其不受CSS控制。在桌面端，其与浏览器窗口长宽一致。但在移动端情况略微复杂。</p>
<h3 id="articleHeader5">结论</h3>
<p>在这种情况下会有许多有趣的现象，用<a href="http://quirksmode.org/mobile/viewports.html" rel="nofollow noreferrer" target="_blank">这个页面</a>你可以观察到其中的一个现象。滚动到顶部，放大一到两次，这样内容区域就溢出窗口了。</p>
<p>现在当你向右滚动时，会发现顶部蓝色区块并不是充分填充的。</p>
<p><span class="img-wrap"><img data-src="/img/bVCyet" src="https://static.alili.tech/img/bVCyet" alt="desktop_htmlbehaviour.jpg" title="desktop_htmlbehaviour.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>正是因为我们将视口定义成如此，才造成了这种现象。我们定义了蓝色区块的宽度为100%。那究竟是什么的100%？是&lt;html&gt;元素的100%，&lt;html&gt;元素是和视口等宽的，也是和浏览器窗口等宽的。</p>
<p>重点是：上诉结论是在100%缩放的条件下成立的。现在在放大的情况下，视口宽度将会小于网站的宽度。这对于元素自身影响不大，但对于元素的内容则会溢出&lt;html&gt;元素，并且元素具有overflow: visible属性，这意味着溢出的内容在任何情况下都会被显示。</p>
<p>不过蓝色区块并没有溢出。已经将其宽度设为100%，毕竟，浏览器要遵守视口的宽度设定，而非关心当下宽度是否过于狭小。</p>
<p><span class="img-wrap"><img data-src="/img/bVce04" src="https://static.alili.tech/img/bVce04" alt="desktop_100percent.jpg" title="desktop_100percent.jpg" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">文档宽度？</h3>
<p>我们真正需要只晓得是页面内容区域的真实宽度（包括延伸的部分）。但据我所知不可能得出这个值（当然如果你能计算出页面中所有元素独自的狂高，但请你牢记，这极容易出错）。</p>
<p>我开始相信我门需要一组JS属性对来获取被我们称之为“文档宽度”的值。（当然是以CSS像素为单位）</p>
<p><span class="img-wrap"><img data-src="/img/bVCP3Q" src="https://static.alili.tech/img/bVCP3Q" alt="desktop_documentwidth.jpg" title="desktop_documentwidth.jpg" style="cursor: pointer;"></span></p>
<p>如果我门真的自我感觉时尚，何不将该值引入CSS？我更愿意让蓝色区块基于文档宽度的100%，而不是&lt;html&gt;元素。（这确是一个难题，即便，如果不能实现我也不会感到惊讶）</p>
<p>浏览器厂商们，你们怎么认为的？</p>
<h2 id="articleHeader7">度量视口</h2>
<p>你也许会想获取视口的值，可以通过<em>document.documentElement.clientWidth</em>与<em>-Height</em>获得。</p>
<p><span class="img-wrap"><img data-src="/img/bVCP4A" src="https://static.alili.tech/img/bVCP4A" alt="desktop_client.jpg" title="desktop_client.jpg" style="cursor: pointer;"></span></p>
<p>如果你熟悉DOM，你就会知道document.documentElement实际上是&lt;html&gt;元素（HTML文档的根元素）。然而，可以这么说视口比它（&lt;html&gt;元素）要高一级，它包含了&lt;html&gt;元素。如果你给&lt;html&gt;元素设置了宽度，这会生效。（虽然这可行，但我并不推荐）</p>
<p>在此情况下<em>document.documentElement.clientWidth</em>与<em>-Height</em>仍旧给出视口尺寸而非&lt;html&gt;元素尺寸。(这是一个奇特的规则只有在documentElement元素的这个属性对才起作用，在其他例子中使用的还是实际宽度。）</p>
<p><span class="img-wrap"><img data-src="/img/bVtvve" src="https://static.alili.tech/img/bVtvve" alt="desktop_client_smallpage.jpg" title="desktop_client_smallpage.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>于是<em>document.documentElement.clientWidth</em>与<em>-Height</em>总是给出视口尺寸不论&lt;html&gt;元素的宽度如何。</p>
<h3 id="articleHeader8">两对属性对</h3>
<p>另外，视口的尺寸也能由window.innerWidth/Height获取？这样的说法也对也不对。</p>
<p>这两者的正是区别就在于：<em>document.documentElement.clientWidth</em>与<em>-Height</em>不把滚动条计算在内，而window.innerWidth/Height则将滚动条计算在内。这算是一些细枝末节的概念了。</p>
<p>实际上这两者是浏览器争霸时代的产物。当时，Netscape 只支持<em>window.innerWidth/Height</em>而IE系列只支持<em>document.documentElement.clientWidth</em>与<em>Height</em>。从那时起，所有其他浏览器开始支持<em>document.documentElement.clientWidth</em>与<em>Height</em>，但IE依旧不支持<em>window.innerWidth/Height</em>。</p>
<p>在桌面端上拥有两个属性对是有一些累赘，但是我们即将看到的，在移动端这是多么大的福音。</p>
<h2 id="articleHeader9">度量&lt;html&gt;元素</h2>
<p>我们已经知道，通过<em>clientWidth/Height</em>可以在任意情况下获取视口尺寸。那么如何获取&lt;html&gt;元素尺寸？通过<em>document.documentElement.offsetWidth</em>与<em>Height</em>。</p>
<p><span class="img-wrap"><img data-src="/img/bVCQcP" src="https://static.alili.tech/img/bVCQcP" alt="desktop_offset.jpg" title="desktop_offset.jpg" style="cursor: pointer;"></span></p>
<p>该属性为你提供一个方法去获取块级&lt;html&gt;元素的宽高。如果你设置了一个宽度，offsetWidth将会重新计算。</p>
<h2 id="articleHeader10">事件坐标</h2>
<p>下面让我们谈谈事件坐标。当一个鼠标事件产生，有不少于五种属性可以为你提供关于事件确切位置的信息，在我们的讨论中，以下三种是比较重要的：</p>
<ol>
<li><p>pageX/Y 提供以CSS像素度量的相对于&lt;html&gt;元素的位置信息<br><span class="img-wrap"><img data-src="/img/bVCQew" src="https://static.alili.tech/img/bVCQew" alt="desktop_pageXY.jpg" title="desktop_pageXY.jpg" style="cursor: pointer;"></span></p></li>
<li><p>clientX/Y 提供以CSS像素度量的相对于视口的位置信息<br><span class="img-wrap"><img data-src="/img/bVCQeB" src="https://static.alili.tech/img/bVCQeB" alt="desktop_clientXY.jpg" title="desktop_clientXY.jpg" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>screenX/Y 提供以CSS像素度量的相对于屏幕的位置信息<br><span class="img-wrap"><img data-src="/img/bVCQeC" src="https://static.alili.tech/img/bVCQeC" alt="desktop_screenXY.jpg" title="desktop_screenXY.jpg" style="cursor: pointer; display: inline;"></span></p></li>
</ol>
<p>90%的情形你在使用<em>pageX/Y</em>，你通常发生在你想要知道发生事件的地点相对文档的位置。而另外10%的情形，你会用到<em>clientX/Y</em>。你基本不会需要处理事件想对于浏览器位置的情形。</p>
<h2 id="articleHeader11">媒体查询</h2>
<p>最后来谈谈媒体查询吧。这是一个非常简单的概念：由你定义一个特殊的CSS规则，仅在页面大于，等于，或小于某一特定的值时生效。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div.sidebar {
    width: 300px;
}

@media all and (max-width: 400px) {
    // styles assigned when width is smaller than 400px;
    div.sidebar {
        width: 100px;
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.sidebar</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
}

@media all and (<span class="hljs-attribute">max-width</span>: <span class="hljs-number">400px</span>) {
    <span class="hljs-comment">// styles assigned when width is smaller than 400px;</span>
    <span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.sidebar</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    }

}
</code></pre>
<p>目前，sidebar的宽度时300px，但当宽度低于400px，sidebar的宽度将变为100px。</p>
<p>那么问题来了：我门以哪个宽度作为基准？</p>
<p>存在两个相关的媒体查询：<em>width/height</em>与<em>device-width/device-height</em>。</p>
<blockquote><p><em>width/height</em>使用与<em>documentElement.clientWidth/Height</em>相同的值 (即视口的宽度)。使用CSS像素宽度。<br><em>device-width/device-height</em>使用与<em>screen.width/height</em>相同的值 (即设备的宽度)。使用设备像素宽度。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVCQfQ" src="https://static.alili.tech/img/bVCQfQ" alt="desktop_mediaqueries.jpg" title="desktop_mediaqueries.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>那我门应该使用哪一个？那还用问，当然是<em>width</em>。web开发者从来对设备宽度不来电，他们衷情于浏览器宽度。</p>
<p>因此，在桌面端忘记<em>device-width/device-height</em>拥抱<em>width/height</em>吧。我门将会看到在移动端情况变的复杂起来。</p>
<h2 id="articleHeader12">结论</h2>
<p>本文是对桌面端浏览器行为的初步探索。</p>
<p>注：翻完发现已经有翻译版了，质量也不错，<a href="http://weizhifeng.net/viewports2.html" rel="nofollow noreferrer" target="_blank">链接给上</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 关于两种视口（viewport）的故事：其一

## 原文链接
[https://segmentfault.com/a/1190000006837963](https://segmentfault.com/a/1190000006837963)


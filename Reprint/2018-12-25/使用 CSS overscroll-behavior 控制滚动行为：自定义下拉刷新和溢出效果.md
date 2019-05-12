---
title: '使用 CSS overscroll-behavior 控制滚动行为：自定义下拉刷新和溢出效果' 
date: 2018-12-25 2:30:11
hidden: true
slug: unj9sx8o6z
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">dev-reading/fe</a> 是一个阅读、导读、速读的 repo，不要依赖于 <a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">dev-reading/fe</a> 学习知识。本 repo 只是一个快速了解文章内容的工具，并不提供全文解读和翻译。你可以通过本平台快速了解文章里面的内容，找到感兴趣的文章，然后去阅读全文。</p></blockquote>
<p>本文地址：<a href="https://github.com/dev-reading/fe/issues/9" rel="nofollow noreferrer" target="_blank">https://github.com/dev-readin...</a></p>
<p>阅读时间大概 3 分钟</p>
<hr>
<p>CSS 的新属性 <a href="https://wicg.github.io/overscroll-behavior/" rel="nofollow noreferrer" target="_blank">overscroll-behavior</a> 允许开发者覆盖默认的浏览器<strong>滚动</strong>行为，一般用在滚动到顶部或者底部。</p>
<h2 id="articleHeader0">背景</h2>
<h3 id="articleHeader1">滚动边界和滚动链接（boundary &amp; chaining）</h3>
<p>在 APP 中经常使用的抽屉导航(drawer)中，我们期望的效果是：滚动到底部时，滚动停止，因为我们到达了"滚动边界"。</p>
<p>但是在 Web 页面中滚动并不会停止，而是<strong>继续滚动抽屉后面的内容</strong>。效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014967?w=540&amp;h=960" src="https://static.alili.tech/img/remote/1460000012014967?w=540&amp;h=960" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们称这种行为叫滚动链接（<strong>scroll chaining</strong>）。</p>
<h3 id="articleHeader2">下拉刷新 pull-to-refresh</h3>
<p>下拉刷新是一个在移动端经常使用的操作，Chrome 移动版也增加了下拉刷新的支持。</p>
<p>Twitter PWA 版本的自定义下拉刷新：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014968?w=270&amp;h=480" src="https://static.alili.tech/img/remote/1460000012014968?w=270&amp;h=480" alt="" title="" style="cursor: pointer;"></span></p>
<p>Chrome Android 版的原生下拉刷新（刷新整个页面）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014969?w=270&amp;h=480" src="https://static.alili.tech/img/remote/1460000012014969?w=270&amp;h=480" alt="" title="" style="cursor: pointer;"></span></p>
<p>很多时候我们需要<strong>禁用原生的 pull-to-refresh 行为</strong>。</p>
<p>以前我们想出各种方式来处理滚动，比如：不让页面滚动，而是使用 touch 事件处理滚动行为，使用 <code>100vw/vh</code> 设置页面高度禁止内容溢出或滚动，等等。。。</p>
<p>现在我们可以使用 <code>overscroll-behavior</code>。</p>
<h2 id="articleHeader3">介绍 overscroll-behavior</h2>
<p><code>overscroll-behavior</code> 属性有 3 个值：</p>
<ol>
<li><p><code>auto</code> - 默认。元素的滚动会传播给祖先元素。</p></li>
<li><p><code>contain</code> - 阻止滚动链接。滚动不会传播给祖先，但会显示元素内的原生效果。例如，Android 上的炫光效果或 iOS 上的回弹效果，当用户触摸滚动边界时会通知用户。注意：<code>overscroll-behavior: contain</code> 在 <code>html</code> 元素上使用<strong>可防止滚动导航操作</strong>。</p></li>
<li><p><code>none</code> - 和 <code>contain</code> 一样，但它也可以防止节点本身的滚动效果（例如 Android 炫光或 iOS 回弹）。</p></li>
</ol>
<h2 id="articleHeader4">阻止 fixed 定位元素的滚动传播</h2>
<p>当一个 <code>fixed</code> 定位元素滚动到边界时，会滚动元素后面的内容。如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014970?w=540&amp;h=960" src="https://static.alili.tech/img/remote/1460000012014970?w=540&amp;h=960" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们可以使用 <code>overscroll-behavior: contain</code> 阻止这种行为。</p>
<p>如果我们有一个 <code>fixed</code> 定位的弹出层需要滚动时，默认是这样的，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014971?w=600&amp;h=422" src="https://static.alili.tech/img/remote/1460000012014971?w=600&amp;h=422" alt="" title="" style="cursor: pointer;"></span></p>
<p>使用 <code>overscroll-behavior: contain</code> 可以阻止滚动传播给父元素，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014972?w=600&amp;h=418" src="https://static.alili.tech/img/remote/1460000012014972?w=600&amp;h=418" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">禁用下拉刷新 pull-to-refresh</h2>
<p>禁用原生的下拉刷新效果，只需要在 <code>body</code> 或 <code>html</code> 元素添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-comment">/* Disables pull-to-refresh but allows overscroll glow effects. */</span>
  <span class="hljs-attribute">overscroll-behavior-y</span>: contain;
}</code></pre>
<p>当我们阻止了原生的下拉刷新后，就可以实现自己定义的下拉刷新。否则会出现两个下拉刷新：</p>
<p>之前：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014973" src="https://static.alili.tech/img/remote/1460000012014973" alt="" title="" style="cursor: pointer;"></span></p>
<p>之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014974?w=540&amp;h=320" src="https://static.alili.tech/img/remote/1460000012014974?w=540&amp;h=320" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">禁用炫光和回弹效果</h2>
<p>将属性制定为 <code>none</code>，可以禁用默认的滚动边界效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  /* 禁用默认的下拉刷新和边界效果
     但是依然可以进行滑动导航 */
  overscroll-behavior-y: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-comment">/* 禁用默认的下拉刷新和边界效果
     但是依然可以进行滑动导航 */</span>
  <span class="hljs-attribute">overscroll-behavior-y</span>: none;
}</code></pre>
<p>之前:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014975?w=540&amp;h=466" src="https://static.alili.tech/img/remote/1460000012014975?w=540&amp;h=466" alt="" title="" style="cursor: pointer;"></span></p>
<p>之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014976?w=540&amp;h=466" src="https://static.alili.tech/img/remote/1460000012014976?w=540&amp;h=466" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果想禁用左右滑动的手势导航，可以使用 <code>overscroll-behavior-x: none</code>。</p>
<h2 id="articleHeader7">完整的 demo</h2>
<p>Demo 地址：<a href="https://ebidel.github.io/demos/chatbox.html" rel="nofollow noreferrer" target="_blank">https://ebidel.github.io/demo...</a></p>
<p>源码：<a href="https://github.com/ebidel/demos/blob/master/chatbox.html" rel="nofollow noreferrer" target="_blank">https://github.com/ebidel/dem...</a></p>
<p>最终效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012014977?w=544&amp;h=960" src="https://static.alili.tech/img/remote/1460000012014977?w=544&amp;h=960" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<blockquote>
<p>阅读原文：<a href="https://developers.google.com/web/updates/2017/11/overscroll-behavior" rel="nofollow noreferrer" target="_blank">Take control of your scroll: customizing pull-to-refresh and overflow effects</a></p>
<p>讨论地址：<a href="https://github.com/dev-reading/fe/issues/9" rel="nofollow noreferrer" target="_blank">使用 CSS overscroll-behavior 控制滚动行为：自定义下拉刷新和溢出效果</a></p>
<p>如果你想参与讨论，请<a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">点击这里</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 CSS overscroll-behavior 控制滚动行为：自定义下拉刷新和溢出效果

## 原文链接
[https://segmentfault.com/a/1190000012014962](https://segmentfault.com/a/1190000012014962)


---
title: 'CSS 性能优化笔记' 
date: 2019-02-01 2:30:10
hidden: true
slug: ke982v6qrfg
categories: [reprint]
---

{{< raw >}}

                    
<p>在实习做一个移动项目的时候，实现一个动画效果，在 iPhone 和 Chrome 上调试没有问题，在千元左右的 Android 机上测试问题就很大了，卡顿非常明显，百思不得其解，吐血，卒。</p>
<p>这个悲伤的故事就是本文的引子，真真切切的体会到了 CSS 对用户体验的影响非常明显，稍有不慎就是一个大坑。下面，我们就来谈谈 CSS 性能优化的问题。</p>
<h2 id="articleHeader0">加载性能</h2>
<ul>
<li><p>减少文件体积，压缩代码</p></li>
<li><p>减少阻塞加载，不要用 import</p></li>
<li><p>提高并发（这个不甚理解）</p></li>
</ul>
<h2 id="articleHeader1">选择器性能</h2>
<p>对整体性能的影响可以忽略不计了，但是选择器的考究更多是为了规范化和可维护性、健壮性。具体怎么实施可以参考 Github 的这个分享：<a href="https://speakerdeck.com/jonrohan/githubs-css-performance" rel="nofollow noreferrer" target="_blank">GitHub's CSS Performance by Jon Rohan</a></p>
<h2 id="articleHeader2">渲染性能</h2>
<p>渲染性能是 CSS 优化最重要的关注对象。我们先来了解一下浏览器的渲染机制。</p>
<h3 id="articleHeader3">浏览器的渲染机制</h3>
<p>浏览器渲染展示网页的过程，大致分为以下几个步骤：</p>
<ol>
<li><p>解析HTML(HTML Parser)</p></li>
<li><p>构建DOM树(DOM Tree)</p></li>
<li><p>渲染树构建(Render Tree)</p></li>
<li><p>绘制渲染树(Painting)</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007336990?w=657&amp;h=310" src="https://static.alili.tech/img/remote/1460000007336990?w=657&amp;h=310" alt="浏览器渲染展示网页的过程" title="浏览器渲染展示网页的过程" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">慎重选择高消耗的样式</h3>
<p>什么 CSS 属性是高消耗的？就是那些绘制前需要浏览器进行大量计算的属性。</p>
<ul>
<li><p>box-shadows</p></li>
<li><p>border-radius</p></li>
<li><p>transparency</p></li>
<li><p>transforms</p></li>
<li><p>CSS filters（性能杀手）</p></li>
</ul>
<h3 id="articleHeader5">避免过分重排(Reflow)</h3>
<p>简单解释一下 Reflow：当元素改变的时候，将会影响文档内容或结构，或元素位置，此过程称为 Reflow。</p>
<table>
<thead><tr>
<th align="center">常见的重排元素</th>
<th align="center"> </th>
<th align="center"> </th>
<th colspan="2" align="center"> </th>
</tr></thead>
<tbody>
<tr>
<td align="center">width</td>
<td align="center">height</td>
<td align="center">padding</td>
<td align="center">margin</td>
</tr>
<tr>
<td align="center">display</td>
<td align="center">border-width</td>
<td align="center">border</td>
<td align="center">top</td>
</tr>
<tr>
<td align="center">position</td>
<td align="center">font-size</td>
<td align="center">float</td>
<td align="center">text-align</td>
</tr>
<tr>
<td align="center">overflow-y</td>
<td align="center">font-weight</td>
<td align="center">overflow</td>
<td align="center">left</td>
</tr>
<tr>
<td align="center">font-family</td>
<td align="center">line-height</td>
<td align="center">vertical-align</td>
<td align="center">right</td>
</tr>
<tr>
<td align="center">clear</td>
<td align="center">white-space</td>
<td align="center">bottom</td>
<td align="center">min-height</td>
</tr>
</tbody>
</table>
<h4>怎么减少 Reflow</h4>
<ol>
<li><p>不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 <code>className</code></p></li>
<li><p>把 DOM 离线后修改，比如：先把 DOM 给 <code>display:none</code> (有一次 Reflow)，然后你修改100次，然后再把它显示出来</p></li>
<li><p>不要把 DOM 结点的属性值放在一个循环里当成循环里的变量</p></li>
<li><p>尽可能不要修改影响范围比较大的 DOM</p></li>
<li><p>为动画的元素使用绝对定位 <code>absolute / fixed</code></p></li>
<li><p>不要使用 <code>table</code> 布局，可能很小的一个小改动会造成整个 table 的重新布局</p></li>
</ol>
<h3 id="articleHeader6">避免过分重绘(Repaints)</h3>
<p>当元素改变的时候，将不会影响元素在页面当中的位置（比如 <code>background-color</code>, <code>border-color</code>, <code>visibility</code>），浏览器仅仅会应用新的样式重绘此元素，此过程称为 <code>Repaint</code>。</p>
<table>
<thead><tr>
<th align="center">常见的重绘元素</th>
<th align="center"> </th>
<th align="center"> </th>
<th colspan="2" align="center"> </th>
</tr></thead>
<tbody>
<tr>
<td align="center">color</td>
<td align="center">border-style</td>
<td align="center">visibility</td>
<td align="center">background</td>
</tr>
<tr>
<td align="center">text-decoration</td>
<td align="center">background-image</td>
<td align="center">background-position</td>
<td align="center">background-repeat</td>
</tr>
<tr>
<td align="center">outline-color</td>
<td align="center">outline</td>
<td align="center">outline-style</td>
<td align="center">border-radius</td>
</tr>
<tr>
<td align="center">outline-width</td>
<td align="center">box-shadow</td>
<td colspan="2" align="center">background-size</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader7">优化动画</h3>
<p>CSS3 动画是优化的重中之重。除了做到上面两点，<code>减少 Reflow 和 Repaints</code> 之外，还需要注意以下方面。</p>
<h4>启用 GPU 硬件加速</h4>
<p><code>GPU</code>（Graphics Processing Unit） 是<code>图像处理器</code>。<code>GPU</code> 硬件加速是指应用 <code>GPU</code> 的图形性能对浏览器中的一些图形操作交给 <code>GPU</code> 来完成，因为 <code>GPU</code> 是<code>专门为处理图形而设计</code>，所以它在<code>速度和能耗</code>上更有效率。<br><code>GPU</code> 加速可以不仅应用于3D，而且也可以应用于2D。这里， <code>GPU</code> 加速通常包括以下几个部分：<code>Canvas2D</code>，<code>布局合成（Layout Compositing）</code>, <code>CSS3转换（transitions）</code>，<code>CSS3 3D变换（transforms）</code>，<code>WebGL</code>和<code>视频(video)</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 根据上面的结论
 * 将 2d transform 换成 3d
 * 就可以强制开启 GPU 加速
 * 提高动画性能
 */
div {
  transform: translate(10px, 10px);
}
div {
  transform: translate3d(10px, 10px, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*
 * 根据上面的结论
 * 将 2d transform 换成 3d
 * 就可以强制开启 GPU 加速
 * 提高动画性能
 */</span>
<span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(10px, 10px);
}
<span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(10px, 10px, 0);
}</code></pre>
<p>需要注意的是，开启硬件加速相应的也会有额外的开销，参见这篇文章 <a href="http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/" rel="nofollow noreferrer" target="_blank">CSS 硬件加速的好与坏</a></p>
<h2 id="articleHeader8">参考</h2>
<ul>
<li><p><a href="http://zhihu.com/question/19886806/answer/50285495" rel="nofollow noreferrer" target="_blank">CSS 优化、提高性能的方法有哪些？ - 赵望野</a></p></li>
<li><p><a href="https://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles/" rel="nofollow noreferrer" target="_blank">CSS performance revisited: selectors, bloat and expensive styles</a></p></li>
<li><p><a href="http://coolshell.cn/articles/9666.html" rel="nofollow noreferrer" target="_blank">浏览器的渲染原理简介</a></p></li>
<li><p><a href="https://www.w3.org/2015/Talks/0109-CSSConf-xq/" rel="nofollow noreferrer" target="_blank">谈谈 CSS 性能</a></p></li>
<li><p><a href="http://www.jianshu.com/p/e305ace24ddf" rel="nofollow noreferrer" target="_blank">前端工程师需要明白的「浏览器渲染」</a></p></li>
<li><p><a href="http://www.ituring.com.cn/article/210651" rel="nofollow noreferrer" target="_blank">学习通过 CSS 硬件加速提升你网站的性能</a></p></li>
<li><p><a href="http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/" rel="nofollow noreferrer" target="_blank">CSS 硬件加速的好与坏</a></p></li>
<li><p><a href="https://github.com/ccforward/cc/issues/42" rel="nofollow noreferrer" target="_blank">两张图解释 CSS 动画的性能</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 性能优化笔记

## 原文链接
[https://segmentfault.com/a/1190000007336987](https://segmentfault.com/a/1190000007336987)


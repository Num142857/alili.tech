---
title: 'CSS 实现三角形，非 Hack' 
date: 2019-01-24 2:30:11
hidden: true
slug: y7nqj2mm6bo
categories: [reprint]
---

{{< raw >}}

            <h1>CSS 实现三角形，非 Hack</h1>
<p>2017.3.20</p>
<p>写过 HTML upvote arrow（向上箭头），speech bubble（对话气泡）或其他类似的尖角元素的人都知道，为了创建一个纯 CSS 实现的三角形，必须使用某些 Hack。最流行的两种方式是通过 <a href="http://stackoverflow.com/questions/7073484/how-do-css-triangles-work">边框实现</a>，或  <a href="http://stackoverflow.com/questions/2701192/what-characters-can-be-used-for-up-down-triangle-arrow-without-stem-for-displa">Unicode 字符</a>。</p>
<p>不得不说，这些 CSS Hack 都非常聪明，但它们却算不上好的解决方案，代码不优雅且不够灵活。例如，我们无法在三角形上使用背景图片，因为边框和字符只能使用颜色。</p>
<p><code>译注： speech bubble（对话气泡）如下图：</code>
<img src="http://images.all-free-download.com/images/graphicthumb/hand_drawn_speech_bubbles_creative_vector_545326.jpg" alt=""></p>
<h2>使用 Clip-path</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path">Clip-path</a> 是 CSS 规范中新属性中的一个，它能让我们只显示元素的一部分并隐藏其余部分。其工作原理如下：</p>
<p>假设我们有一个普通的矩形 <code>div</code> 元素。你可以在下面的编辑器中单击 <strong>Run</strong> 运行并查看渲染后的 HTML。<code>（译注：原文内有在线代码编辑器，此处仅贴出代码，可自行 copy 测试。）</code></p>
<pre><code class="hljs css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(https://goo.gl/BeSyyD);
}
</code></pre><pre><code class="hljs apache"><span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
</code></pre><p>为了实现三角形，我们需要使用 <code>polygon()</code> 函数。其参数为以逗号分隔的平面坐标点，这些坐标点定义了我们的剪切遮罩的形状。三角形 = 3个点。可以试着更改值并查看形状是如何变化的。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(https://goo.gl/BeSyyD);

    <span class="hljs-comment">/* 三个点分别为：中上的点，左下的点，右下的点 */</span>
    <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(50% 0, 0 100%, 100% 100%);
}
</code></pre><pre><code class="hljs apache"><span class="hljs-section">&lt;div&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
</code></pre><p>创建的路径中的所有内容都会保留，而路径外内容会被隐藏。通过这种方式，我们不仅可以制作三角形，还可以制作出各种不规则的形状，且这些形状可像普通的 CSS 块一样。<code>（译注：即可以正常运用 CSS 属性在这些形状上）</code></p>
<p>这种方法唯一的缺点就是是我们需要自行计算点的坐标来得到一个好看的三角形。</p>
<p>不过，它比使用边框或▲<code>（译注：正三角的 Unicode 字符）</code>更好。</p>
<h2>浏览器支持</h2>
<p>如果你查看 clip-path 的 <a href="http://caniuse.com/#feat=css-clip-path">caniuse</a> 页面，一开始你发现貌似兼容性非常不好，但事实上，该属性在 Chrome 中能正常工作，且不需要前缀，在 Safari 中需要加 <code>-webkit-</code> 前缀。Firefox 53 版本以上可用。IE / Edge 一贯的不支持，未来也许会支持。</p>
<h2>更多阅读</h2>
<p>关于 <code>clip-path</code> 属性有很多小技巧，包括 SVG 的“奇幻”用法。了解更多，请查看下面的链接。</p>
<ul>
<li>MDN 上的 clip-path - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path">链接</a></li>
<li>Codrops 上的深入 clip-path 教程  - <a href="https://tympanus.net/codrops/css_reference/clip-path/">链接</a></li>
<li>Clippy, 一个 clip-path 生成器 - <a href="http://bennettfeely.com/clippy/">链接</a></li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 实现三角形，非 Hack

## 原文链接
[https://www.zcfy.cc/article/finally-css-triangles-without-ugly-hacks](https://www.zcfy.cc/article/finally-css-triangles-without-ugly-hacks)


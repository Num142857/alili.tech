---
title: '前端每日实战：1# 视频演示如何用纯 CSS 创作一个按钮文字滑动特效' 
date: 2018-12-04 2:30:05
hidden: true
slug: buvyxh9mwyc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbfmCW?w=400&amp;h=301" src="https://static.alili.tech/img/bVbfmCW?w=400&amp;h=301" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/GdpPLE" rel="nofollow noreferrer">https://codepen.io/zhang-ou/pen/GdpPLE</a></p>
<h2>可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/c4vdvcL" rel="nofollow noreferrer">https://scrimba.com/c/c4vdvcL</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/001-button-text-staggered-sliding-effects" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges/tree/master/001-button-text-staggered-sliding-effects</a></p>
<h2>代码解读</h2>
<p>定义 dom，在一个容器中定义按钮的文字，每个字母一个 span，每个 span 有一个 data-text 属性，其值与 span 内的字母相同：</p>
<pre><code class="html">&lt;div class="box"&gt;
    &lt;span data-text="B"&gt;B&lt;/span&gt;
    &lt;span data-text="U"&gt;U&lt;/span&gt;
    &lt;span data-text="T"&gt;T&lt;/span&gt;
    &lt;span data-text="T"&gt;T&lt;/span&gt;
    &lt;span data-text="O"&gt;O&lt;/span&gt;
    &lt;span data-text="N"&gt;N&lt;/span&gt;
&lt;/div&gt;</code></pre>
<p>按钮居中：</p>
<pre><code class="css">html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre>
<p>设置按钮的尺寸和文字样式：</p>
<pre><code class="css">.box {
    width: 200px;
    height: 60px;
    border: 2px solid black;
    text-align: center;
    font-size: 30px;
    line-height: 60px;
    font-family: sans-serif;
}</code></pre>
<p>按钮的每个字母都设置为行内块元素，以便单独设置动效：</p>
<pre><code class="css">.box span {
    display: inline-block;
    color: blue;
}</code></pre>
<p>把字母交错地显示在按钮容器之外，第奇数个元素显示在上，第偶数个元素显示在下：</p>
<pre><code class="css">.box span:nth-child(odd) {
    transform: translateY(-100%);
}

.box span:nth-child(even) {
    transform: translateY(100%);
}</code></pre>
<p>用伪元素为每个字母增加一个副本：</p>
<pre><code class="css">.box span::before {
    content: attr(data-text);
    position: absolute;
    color: red;
}</code></pre>
<p>让伪元素的字母也交错显示，位置与其原始元素相对：</p>
<pre><code class="css">.box span:nth-child(odd)::before {
    transform: translateY(100%);
}

.box span:nth-child(even)::before {
    transform: translateY(-100%);
}</code></pre>
<p>为按钮增加鼠标划过样式，设置緩动时间，使其有动画效果：</p>
<pre><code class="css">.box:hover span {
    transform: translateY(0);
}

.box span {
    transition: 0.5s;
}</code></pre>
<p>最后，隐藏容器外的内容：</p>
<pre><code class="css">.box {
    overflow: hidden;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before" rel="nofollow noreferrer">::before</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY" rel="nofollow noreferrer">translateY</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-%2A" rel="nofollow noreferrer">data-*</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content" rel="nofollow noreferrer">content</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child" rel="nofollow noreferrer">nth-child</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：1# 视频演示如何用纯 CSS 创作一个按钮文字滑动特效

## 原文链接
[https://segmentfault.com/a/1190000014534572](https://segmentfault.com/a/1190000014534572)


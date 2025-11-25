---
title: '前端每日实战：2# 视频演示如何用纯 CSS 创作一个矩形旋转 loader 特效' 
date: 2018-12-04 2:30:05
hidden: true
slug: g8zdxs4e5o
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWRc?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWRc?w=500&amp;h=500" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/vjLQMM" rel="nofollow noreferrer">https://codepen.io/zhang-ou/pen/vjLQMM</a></p>
<h2>可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cJMkwH9" rel="nofollow noreferrer">https://scrimba.com/c/cJMkwH9</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/002-rectangular-rotating-loader-animation" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges/tree/master/002-rectangular-rotating-loader-animation</a></p>
<h2>代码解读</h2>
<p>定义 dom，一个包含 3 个 span 的容器：</p>
<pre><code class="html">&lt;div class="loader"&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>
<p>居中显示：</p>
<pre><code class="css">html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}</code></pre>
<p>设置容器的尺寸：</p>
<pre><code class="css">.loader {
    width: 150px;
    height: 150px;
    position: relative;
}</code></pre>
<p>设置矩形的边框样式：</p>
<pre><code class="css">.loader span {
    position: absolute;
    box-sizing: border-box;
    border: 10px solid dimgray;
    border-radius: 2px;
}</code></pre>
<p>设置 3 个矩形的尺寸：</p>
<pre><code class="css">.loader span:nth-child(1) {
    width: 100%;
    height: 100%;
}

.loader span:nth-child(2) {
    width: 70%;
    height: 70%;
    margin: 15%;
}

.loader span:nth-child(3) {
    width: 40%;
    height: 40%;
    margin: 30%;
}</code></pre>
<p>用伪元素绘制左上和右下的装饰条：</p>
<pre><code class="css">.loader span::before,
.loader span::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 50%;
    background-color: gold;
}

.loader span::before {
    top: -10px;
    left: -10px;
}

.loader span::after {
    bottom: -10px;
    right: -10px;
}</code></pre>
<p>定义动画效果：</p>
<pre><code class="css">@keyframes rotating {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(360deg);
    }
}</code></pre>
<p>把动画应用到 3 个矩形上：</p>
<pre><code class="css">.loader span {
    animation: rotating linear infinite;
}

.loader span:nth-child(1) {
    animation-duration: 4s;
}

.loader span:nth-child(2) {
    animation-duration: 2s;
}

.loader span:nth-child(3) {
    animation-duration: 1s;
}</code></pre>
<p>最后，设置一下 3 个矩形的堆叠顺序：</p>
<pre><code class="css">.loader span:nth-child(1) {
    z-index: 3;
}

.loader span:nth-child(2) {
    z-index: 2;
}

.loader span:nth-child(3) {
    z-index: 1;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li>@keyframes <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes</a>
</li>
<li>animation-duration <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration</a>
</li>
<li>rotateY <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY</a>
</li>
<li>nth-child <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child</a>
</li>
<li>z-index <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/z-index</a>
</li>
<li>::before <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/::before</a>
</li>
<li>::after <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::after" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/::after</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：2# 视频演示如何用纯 CSS 创作一个矩形旋转 loader 特效

## 原文链接
[https://segmentfault.com/a/1190000014553745](https://segmentfault.com/a/1190000014553745)


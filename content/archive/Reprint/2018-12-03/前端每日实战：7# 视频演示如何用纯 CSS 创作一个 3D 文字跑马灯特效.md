---
title: '前端每日实战：7# 视频演示如何用纯 CSS 创作一个 3D 文字跑马灯特效' 
date: 2018-12-03 2:30:08
hidden: true
slug: ze42mcvos
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbfmGm?w=400&amp;h=303" src="https://static.alili.tech/img/bVbfmGm?w=400&amp;h=303" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/GdrrZq" rel="nofollow noreferrer">https://codepen.io/zhang-ou/pen/GdrrZq</a></p>
<h2>可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cWknNUR" rel="nofollow noreferrer">https://scrimba.com/c/cWknNUR</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/007-3d-text-marquee-effects" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges/tree/master/007-3d-text-marquee-effects</a></p>
<h2>代码解读</h2>
<p>定义 dom，包含2组重复的文字：</p>
<pre><code class="html">&lt;div class="box"&gt;
    &lt;div class="inner"&gt;
        &lt;span&gt;Hello World&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class="inner"&gt;
        &lt;span&gt;Hello World&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>居中显示：</p>
<pre><code class="css">html,
body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre>
<p>设置容器的尺寸和文字样式：</p>
<pre><code class="css">.box {
    display: flex;
}

.box .inner {
    width: 200px;
    height: 100px;
    line-height: 100px;
    font-size: 32px;
    font-family: sans-serif;
    font-weight: bold;
    white-space: nowrap;
}</code></pre>
<p>配色：</p>
<pre><code class="css">.box .inner:first-child {
    background-color: indianred;
    color: darkred;
}

.box .inner:last-child {
    background-color: lightcoral;
    color: antiquewhite;
}</code></pre>
<p>设置 3d 效果：</p>
<pre><code class="css">.box .inner:first-child {
    transform-origin: left;
    transform: perspective(300px) rotateY(-67.3deg);
}

.box .inner:last-child {
    transform-origin: right;
    transform: perspective(300px) rotateY(67.3deg);
}</code></pre>
<p>定义动画效果：</p>
<pre><code class="css">@keyframes marquee {
    from {
        left: 100%;
    }

    to {
        left: -100%;
    }
}</code></pre>
<p>把动画效果应用到文字上，并隐藏容器外的内容：</p>
<pre><code class="css">.box .inner span {
    position: absolute;
    animation: marquee 5s linear infinite;
}

.box .inner {
    overflow: hidden;
}</code></pre>
<p>让左侧的文字延迟运动，模拟出2组文字连贯运动的效果：</p>
<pre><code class="css">.box .inner:first-child span {
    animation-delay: 2.5s;
    left: -100%;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li>transform-origin <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin</a>
</li>
<li>perspective <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/perspective" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/perspective</a>
</li>
<li>rotateY() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY</a>
</li>
<li>animation-delay <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：7# 视频演示如何用纯 CSS 创作一个 3D 文字跑马灯特效

## 原文链接
[https://segmentfault.com/a/1190000014663038](https://segmentfault.com/a/1190000014663038)


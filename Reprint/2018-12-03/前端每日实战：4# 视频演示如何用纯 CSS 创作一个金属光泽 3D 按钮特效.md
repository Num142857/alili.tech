---
title: '前端每日实战：4# 视频演示如何用纯 CSS 创作一个金属光泽 3D 按钮特效' 
date: 2018-12-03 2:30:08
hidden: true
slug: 4l61ziznet6
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbfmFb?w=400&amp;h=301" src="https://static.alili.tech/img/bVbfmFb?w=400&amp;h=301" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/full/MGeRRO" rel="nofollow noreferrer">https://codepen.io/zhang-ou/full/MGeRRO</a></p>
<h2>可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cdKMBTk" rel="nofollow noreferrer">https://scrimba.com/c/cdKMBTk</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/004-metallic-glossy-3d-button-effects" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges/tree/master/004-metallic-glossy-3d-button-effects</a></p>
<h2>代码解读</h2>
<p>在 dom 中定义一个容器：</p>
<pre><code class="html">&lt;div class="box"&gt;BUTTON&lt;/div&gt;</code></pre>
<p>容器居中显示：</p>
<pre><code class="css">html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
}</code></pre>
<p>设置按钮的 2d 样式，为了便于调整按钮尺寸，使用了变量：</p>
<pre><code class="css">.box {
    background: linear-gradient(to right, gold, darkorange);
    color: white;
    --width: 250px;
    --height: calc(var(--width) / 3);
    width: var(--width);
    height: var(--height);
    text-align: center;
    line-height: var(--height);
    font-size: calc(var(--height) / 2.5);
    font-family: sans-serif;
    letter-spacing: 0.2em;
    border: 1px solid darkgoldenrod;
    border-radius: 2em;
}</code></pre>
<p>设置按钮的 3d 样式：</p>
<pre><code class="css">.box {
    transform: perspective(500px) rotateY(-15deg);
    text-shadow: 6px 3px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 2px 0 0 5px rgba(0, 0, 0, 0.2);
}</code></pre>
<p>定义按钮的鼠标划过动画效果：</p>
<pre><code class="css">.box:hover {
    transform: perspective(500px) rotateY(15deg);
    text-shadow: -6px 3px 2px rgba(0, 0, 0, 0.2);
    box-shadow: -2px 0 0 5px rgba(0, 0, 0, 0.2);
}

.box {
    transition: 0.5s;
}</code></pre>
<p>用伪元素增加光泽：</p>
<pre><code class="css">.box {
    position: relative;
}

.box::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, white, transparent);
    left: 0;
}</code></pre>
<p>定义光泽动画效果：</p>
<pre><code class="css">.box::before {
    left: -100%;
    transition: 0.5s;
}

.box:hover::before {
    left: 100%;
}</code></pre>
<p>最后，隐藏容器之外的内容：</p>
<pre><code class="css">.box {
    overflow: hidden;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li>linear-gradient <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient</a>
</li>
<li>variables <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables</a>
</li>
<li>calc <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/calc</a>
</li>
<li>perspective <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/perspective" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/perspective</a>
</li>
<li>text-shadow <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow</a>
</li>
<li>box-shadow <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：4# 视频演示如何用纯 CSS 创作一个金属光泽 3D 按钮特效

## 原文链接
[https://segmentfault.com/a/1190000014599280](https://segmentfault.com/a/1190000014599280)


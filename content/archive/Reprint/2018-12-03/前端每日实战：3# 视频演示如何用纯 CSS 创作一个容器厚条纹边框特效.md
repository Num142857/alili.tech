---
title: '前端每日实战：3# 视频演示如何用纯 CSS 创作一个容器厚条纹边框特效' 
date: 2018-12-03 2:30:08
hidden: true
slug: u0xq2s503rc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWRf?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWRf?w=500&amp;h=500" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/YLqbXy" rel="nofollow noreferrer">https://codepen.io/zhang-ou/pen/YLqbXy</a></p>
<h2>可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cPvn6tE" rel="nofollow noreferrer">https://scrimba.com/c/cPvn6tE</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/003-diagonal-stripe-border-effects" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges/tree/master/003-diagonal-stripe-border-effects</a></p>
<h2>代码解读</h2>
<p>定义一个名为 box 的容器：</p>
<pre><code class="html">&lt;div class="box"&gt;
&lt;/div&gt;</code></pre>
<p>内容居中显示：</p>
<pre><code class="css">html,
body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre>
<p>画条纹背景：</p>
<pre><code class="css">.box {
    width: 300px;
    height: 300px;
    background: linear-gradient(
        -45deg,
        white 0%,
        white 25%,
        hotpink 25%,
        hotpink 50%,
        white 50%,
        white 75%,
        hotpink 75%,
        hotpink 100%);
    background-size: 10%;
}</code></pre>
<p>在 box 容器内定义一个名为 content 的容器：</p>
<pre><code class="html">&lt;div class="box"&gt;
    &lt;div class="content"&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>box 容器留出厚边框，content 容器嵌在其中：</p>
<pre><code class="css">.box .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box {
    box-sizing: border-box;
    padding: 15px;
}

.box .content {
    background-color: white;
}</code></pre>
<p>设置厚边框的立体效果：</p>
<pre><code class="css">.box,
.box .content {
    box-shadow: 0 0 2px deeppink,
                0 0 5px rgba(0, 0, 0, 1),
                inset 0 0 5px rgba(0, 0, 0, 1);
    border-radius: 10px;
}</code></pre>
<p>content 容器中增加内容：</p>
<pre><code class="html">&lt;div class="box"&gt;
    &lt;div class="content"&gt;
        &lt;h2&gt;What is Lorem Ipsum?&lt;/h2&gt;
        &lt;p&gt;Mauris volutpat risus quis nisi tempus hendrerit. Nullam nisi urna, suscipit quis risus sed, congue congue quam. Morbi sit amet suscipit ex. Vivamus vel nulla ac libero volutpat ultrices.&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>内容布局：</p>
<pre><code class="css">.box .content {
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px;
    text-align: center;
    font-family: sans-serif;
}

.box .content h2 {
    color: deeppink;
}

.box .content p {
    color: dimgray;
}</code></pre>
<p>定义动画效果：</p>
<pre><code class="css">@keyframes animate {
    from {
        background-position: 0;
    }

    to {
        background-position: 10%;
    }
}</code></pre>
<p>最后，把动画效果应用到 box 容器上：</p>
<pre><code class="css">.box {
    animation: animate 2s linear infinite;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li>linear-gradient <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient</a>
</li>
<li>box-shadow <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow</a>
</li>
<li>@keyframes <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes</a>
</li>
<li>background-size <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-size" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/background-size</a>
</li>
<li>background-position <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-position" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/background-position</a>
</li>
<li>lorem ipsum <a href="https://lipsum.com/" rel="nofollow noreferrer">https://lipsum.com/</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：3# 视频演示如何用纯 CSS 创作一个容器厚条纹边框特效

## 原文链接
[https://segmentfault.com/a/1190000014576519](https://segmentfault.com/a/1190000014576519)


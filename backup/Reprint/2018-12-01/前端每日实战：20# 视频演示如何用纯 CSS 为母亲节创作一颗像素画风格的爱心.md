---
title: '前端每日实战：20# 视频演示如何用纯 CSS 为母亲节创作一颗像素画风格的爱心' 
date: 2018-12-01 2:30:12
hidden: true
slug: wvpsr8hmbg
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWJi?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWJi?w=500&amp;h=500" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/LmrZVX" rel="nofollow noreferrer">https://codepen.io/comehope/pen/LmrZVX</a></p>
<h2>可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/p/pEgDAM/cPd9asV" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/cPd9asV</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/020-pixel-animation-heart-shape" rel="nofollow noreferrer">https://github.com/comehope/f...</a></p>
<h2>代码解读</h2>
<p>定义 dom，描绘出 8 行 9 列的心形像素图案，其中 &lt;dot&gt; 是指要填充颜色的像素点：</p>
<pre><code class="html">&lt;div class="heart"&gt;
    &lt;!-- line 1 --&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;

    &lt;!-- line 2 --&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;

    &lt;!-- line 3 --&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;

    &lt;!-- line 4 --&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;

    &lt;!-- line 5 --&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;

    &lt;!-- line 6 --&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;

    &lt;!-- line 7 --&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;

    &lt;!-- line 8 --&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;dot&gt;&lt;/dot&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>
<p>居中显示：</p>
<pre><code class="css">html,body{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(silver, white);
}</code></pre>
<p>设置心形的样式：</p>
<pre><code class="css">.heart {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 2px;
}

.heart &gt; * {
    width: 1em;
    height: 1em;
    border-radius: 0.1em;
    font-size: 30px;
}

.heart dot{
    background: red;
}</code></pre>
<p>定义淡入淡出动画：</p>
<pre><code class="css">.heart dot{
    filter: opacity(0);
    animation: animation 5s ease-out infinite;
}

@keyframes animation{
    0%{
        filter: opacity(0);
        transform: translateY(-10em);
    }

    25%{
        filter: opacity(1);
        transform: translateY(0);
    }

    75%{
        filter: opacity(1);
        transform: translateY(0);
    }

    100%{
        filter: opacity(0);
        transform: translateY(10em);
    }
}</code></pre>
<p>最后，让各像素点按不同时间入场，增强动画效果：</p>
<pre><code class="css">.heart dot:nth-of-type(2n) {
    animation-delay: 0.2s;
}

.heart dot:nth-of-type(3n) {
    animation-delay: 0.3s;
}

.heart dot:nth-of-type(4n) {
    animation-delay: 0.4s;
}

.heart dot:nth-of-type(5n) {
    animation-delay: 0.5s;
}

.heart dot:nth-of-type(6n) {
    animation-delay: 0.6s;
}

.heart dot:nth-of-type(7n) {
    animation-delay: 0.7s;
}

.heart dot:nth-of-type(8n) {
    animation-delay: 0.8s;
}

.heart dot:nth-of-type(9n) {
    animation-delay: 0.9s;
}

.heart dot:nth-of-type(10n) {
    animation-delay: 1.0s;
}

.heart dot:nth-of-type(11n) {
    animation-delay: 1.1s;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li>grid-template-columns <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns</a>
</li>
<li>grid-gap <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap</a>
</li>
<li>:nth-of-type() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type</a>
</li>
<li>animation-delay <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay</a>
</li>
<li>translateY() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY</a>
</li>
<li>filter <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/filter</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：20# 视频演示如何用纯 CSS 为母亲节创作一颗像素画风格的爱心

## 原文链接
[https://segmentfault.com/a/1190000014837536](https://segmentfault.com/a/1190000014837536)


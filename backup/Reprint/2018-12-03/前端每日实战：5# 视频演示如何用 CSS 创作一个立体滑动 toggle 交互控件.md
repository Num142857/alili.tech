---
title: '前端每日实战：5# 视频演示如何用 CSS 创作一个立体滑动 toggle 交互控件' 
date: 2018-12-03 2:30:08
hidden: true
slug: 1vwi5ixcnz2
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbyv7?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbyv7?w=500&amp;h=500" alt="图片描述" title="图片描述"></span></p>
<h2>效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/zjoOgX" rel="nofollow noreferrer">https://codepen.io/zhang-ou/pen/zjoOgX</a></p>
<h2>可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cPvMzTg" rel="nofollow noreferrer">https://scrimba.com/c/cPvMzTg</a></p>
<h2>源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/005-sleek-sliding-toggle-checkbox" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges/tree/master/005-sleek-sliding-toggle-checkbox</a></p>
<h2>代码解读</h2>
<p>定义 dom，是嵌套了3层的容器：</p>
<pre><code class="html">&lt;div class="checkbox"&gt;
    &lt;div class="inner"&gt;
        &lt;div class="toggle"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>居中显示：</p>
<pre><code class="css">html, 
body,
.checkbox,
.checkbox .inner,
.checkbox .inner .toggle {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre>
<p>画出外侧椭圆：</p>
<pre><code class="css">.checkbox {
    width: 10em;
    height: 5em;
    background: linear-gradient(silver, whitesmoke);
    border-radius: 2.5em;
    font-size: 40px;
}</code></pre>
<p>画出内侧椭圆：</p>
<pre><code class="css">.checkbox .inner {
    width: 8em;
    height: 3.5em;
    background: linear-gradient(dimgray, silver);
    border-radius: 2em;
    box-shadow: inset 0 0 1.5em rgba(0, 0, 0, 0.5);
}</code></pre>
<p>画出圆形按钮：</p>
<pre><code class="css">.checkbox .inner .toggle {
    width: 3.5em;
    height: 3.5em;
    background: linear-gradient(to top, silver, whitesmoke);
    border-radius: 50%;
    box-shadow: 0 0.4em 0.6em rgba(0, 0, 0, 0.2);
    position: relative;
    left: -30%;
}</code></pre>
<p>为圆形按钮增加立体效果：</p>
<pre><code class="css">.checkbox .inner .toggle::before {
    content: '';
    position: absolute;
    height: 80%;
    width: 80%;
    background: linear-gradient(whitesmoke, silver);
    border-radius: 50%;
}</code></pre>
<p>在按钮上写上 OFF，行高是根据父元素的高度计算出的：</p>
<pre><code class="css">.checkbox .inner .toggle::before {
    content: 'OFF';
    text-align: center;
    line-height: calc(3.5em * 0.8);
    font-family: sans-serif;
    color: gray;
}</code></pre>
<p>引入jquery：</p>
<pre><code class="html">&lt;script src="http://code.jquery.com/jquery-3.3.1.min.js"&gt;&lt;/script&gt;</code></pre>
<p>编写脚本，在点击按钮时切换样式类：</p>
<pre><code class="javascript">$(document).ready(function() {
    $('.toggle').click(function() {
        $('.inner').toggleClass('active');
    });
});</code></pre>
<p>设置 active 时控件的样式:</p>
<pre><code class="css">.checkbox .inner.active {
    background: linear-gradient(green, limegreen);
}

.checkbox .inner.active .toggle {
    left: 30%;
}

.checkbox .inner.active .toggle::before {
    content: 'ON';
    color: limegreen;
}</code></pre>
<p>最后，为按钮设置缓动时间，实现动画效果</p>
<pre><code class="css">.checkbox .inner .toggle {
    transition: 0.5s;
}</code></pre>
<p>大功告成！</p>
<h2>知识点</h2>
<ul>
<li>linear-gradient() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient</a>
</li>
<li>box-shadow <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow</a>
</li>
<li>calc() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/calc</a>
</li>
<li>::before <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before" rel="nofollow noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/::before</a>
</li>
<li>jquery toggleClass <a href="http://api.jquery.com/toggleclass/" rel="nofollow noreferrer">http://api.jquery.com/toggleclass/</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：5# 视频演示如何用 CSS 创作一个立体滑动 toggle 交互控件

## 原文链接
[https://segmentfault.com/a/1190000014638655](https://segmentfault.com/a/1190000014638655)


---
title: '前端每日实战：113# 视频演示如何用纯 CSS 创作一个赛车 loader' 
date: 2018-11-15 21:20:48
hidden: true
slug: ynh5xy3lyj9
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfFvo?w=400&amp;h=303" src="https://static.alili.tech/img/bVbfFvo?w=400&amp;h=303" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/mGdXGJ" rel="nofollow noreferrer">https://codepen.io/comehope/pen/mGdXGJ</a></p><h2>&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/c3qL7Sz" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/c3qL7Sz</a></p><h2>&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges</a></p><h2>&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 1 &#x4E2A; <code>.car</code> &#x5143;&#x7D20;&#xFF0C;&#x5B83;&#x7684; 2 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x8F66;&#x8EAB;&#x548C;&#x8F66;&#x8F6E;&#xFF1A;</p><pre><code class="html">&lt;figure class=&quot;loader&quot;&gt;
    &lt;div class=&quot;car&quot;&gt;
        &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;wheels&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/figure&gt;</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><pre><code class="css">body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#x548C;&#x8F66;&#x7684;&#x989C;&#x8272;&#xFF1A;</p><pre><code class="css">.loader {
    width: 11.7em;
    height: 4.2em;
    color: lightcyan;
    position: relative;
}</code></pre><p>&#x753B;&#x51FA;&#x5E95;&#x76D8;&#xFF1A;</p><pre><code class="css">.car {
    position: absolute;
    width: inherit;
    height: 2em;
    background-color: currentColor;
    top: 1.5em;
    border-radius: 0 5em 1em 0 / 0 4em 1em 0;
}</code></pre><p>&#x753B;&#x51FA;&#x5C3E;&#x5180;&#xFF1A;</p><pre><code class="css">.car::before {
    content: &apos;&apos;;
    position: absolute;
    width: 0;
    height: 0;
    border: 0.6em solid transparent;
    border-left-width: 0;
    border-right-color: currentColor;
    transform-origin: left;
    transform: rotate(-45deg);
    top: -0.5em;
}</code></pre><p>&#xFF08;&#x8FD9;&#x65F6;&#x770B;&#x8D77;&#x6765;&#x6709;&#x70B9;&#x513F;&#x50CF;&#x98DE;&#x673A;&#xFF0C;&#x54C8;&#x54C8;~~&#xFF09;</p><p>&#x753B;&#x51FA;&#x8F66;&#x8EAB;&#xFF1A;</p><pre><code class="css">.body {
    position: absolute;
    width: 7.5em;
    height: 3.5em;
    box-sizing: border-box;
    border: 0.4em solid;
    border-radius: 3em 4.5em 0 0 / 3em 4em 0 0;
    top: -1.5em;
    left: 1.2em;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x8F66;&#x7A97;&#xFF1A;</p><pre><code class="css">.body::before {
    content: &apos;&apos;;
    position: absolute;
    width: 3.5em;
    height: inherit;
    background-color: currentColor;
    border-top-left-radius: inherit;
    left: -0.4em;
    top: -0.4em;
}</code></pre><p>&#x753B;&#x51FA;&#x8F66;&#x8F6E;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><pre><code class="css">.wheels::before,
.wheels::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 2.6em;
    height: 2.6em;
    background-color: #333;
    border-radius: 50%;
    bottom: -1em;
}</code></pre><p>&#x753B;&#x51FA;&#x8F6E;&#x6BC2;&#xFF1A;</p><pre><code class="css">.wheels::before,
.wheels::after {
    border: 0.3em solid #333;
    background-image: 
        linear-gradient(
            135deg,
            transparent 45%,
            currentColor 46%, currentColor 54%,
            transparent 55%
        ),
        linear-gradient(
            90deg,
            transparent 45%,
            currentColor 46%, currentColor 54%,
            transparent 55%
        ),
        linear-gradient(
            45deg,
            transparent 45%,
            currentColor 46%, currentColor 54%,
            transparent 55%
        ),
        linear-gradient(
            0deg,
            transparent 45%,
            currentColor 46%, currentColor 54%,
            transparent 55%
        ),
        radial-gradient(
            currentColor 29%,
            transparent 30%, transparent 50%,
            currentColor 51%
        );
}</code></pre><p>&#x628A;&#x8F66;&#x8F6E;&#x5B9A;&#x4F4D;&#x5230;&#x5DE6;&#x53F3;&#x4E24;&#x4FA7;&#xFF1A;</p><pre><code class="css">.wheels::before {
    left: 1.2em;
}

.wheels::after {
    right: 0.8em;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x5236;&#x4F5C;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;</p><p>&#x589E;&#x52A0;&#x8868;&#x793A;&#x98CE;&#x5F71;&#x7684; dom &#x5143;&#x7D20; <code>.strikes</code>&#xFF0C;&#x5B83;&#x5305;&#x542B; 5 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><pre><code class="html">&lt;figure class=&quot;loader&quot;&gt;
    &lt;div class=&quot;car&quot;&gt;
        &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;wheels&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class=&quot;strikes&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/figure&gt;</code></pre><p>&#x753B;&#x51FA; 5 &#x6BB5;&#x77ED;&#x7EC6;&#x7EBF;&#xFF1A;</p><pre><code class="css">.strikes {
    position: absolute;
    width: 1em;
    height: inherit;
    border: 1px dashed white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.strikes span {
    height: 0.1em;
    background-color: lightcyan;
}</code></pre><p>&#x589E;&#x52A0;&#x98CE;&#x5F71;&#x98D8;&#x901D;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x5B9A;&#x4E49; css &#x53D8;&#x91CF;&#xFF0C;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF1A;</p><pre><code class="css">.strikes span {
    animation: drift 0.2s linear infinite;
    animation-delay: calc((var(--n) - 1) * 0.05s);
}

@keyframes drift {
    from {
        transform: translate(3.5em);
    }

    to {
        transform: translate(-8em);
        filter: opacity(0);
    }
}

.strikes span:nth-child(1) {
    --n: 1;
}

.strikes span:nth-child(2) {
    --n: 2;
}

.strikes span:nth-child(3) {
    --n: 3;
}

.strikes span:nth-child(4) {
    --n: 4;
}

.strikes span:nth-child(5) {
    --n: 5;
}</code></pre><p>&#x589E;&#x52A0;&#x8F6E;&#x5B50;&#x8F6C;&#x52A8;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.wheels::before,
.wheels::after {
    animation: rotating 0.5s linear infinite;
}

@keyframes rotating {
    to {
        transform: rotate(1turn);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x8F66;&#x8EAB;&#x98A0;&#x7C38;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.car {
    animation: run 0.25s linear infinite;
}

@keyframes run {
    0% {
        transform: translate(0.2em, 0.1em) rotate(0deg);
    }

    20% {
        transform: translate(0.1em, 0.2em) rotate(1deg);
    }

    40% {
        transform: translate(0.1em, -0.1em) rotate(-1deg);
    }

    60% {
        transform: translate(-0.1em, 0.2em) rotate(0deg);
    }

    80% {
        transform: translate(-0.1em, 0.1em) rotate(1deg);
    }

    100% {
        transform: translate(0.2em, 0.1em) rotate(-1deg);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：113# 视频演示如何用纯 CSS 创作一个赛车 loader

## 原文链接
[https://segmentfault.com/a/1190000016087024](https://segmentfault.com/a/1190000016087024)


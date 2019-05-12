---
title: '前端每日实战：92# 视频演示如何用纯 CSS 创作一颗逼真的土星' 
date: 2018-11-20 2:30:10
hidden: true
slug: lio0tymmvp
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVber3t?w=400&amp;h=300" src="https://static.alili.tech/img/bVber3t?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/EpbaQX" rel="nofollow noreferrer">https://codepen.io/comehope/pen/EpbaQX</a></p><h2>&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cBdyeTw" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/cBdyeTw</a></p><h2>&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges</a></p><h2>&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x672C;&#x8EAB;&#x8868;&#x793A;&#x571F;&#x661F;&#x661F;&#x7403;&#xFF0C;&#x5176;&#x4E2D;&#x7684; <code>ring</code> &#x5143;&#x7D20;&#x8868;&#x793A;&#x571F;&#x661F;&#x73AF;&#xFF1A;</p><pre><code class="html">&lt;div class=&quot;saturn&quot;&gt;
        &lt;span class=&quot;rings&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><pre><code class="css">body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><pre><code class="css">.saturn {
    width: 20em;
    height: 20em;
    font-size: 20px;
}</code></pre><p>&#x753B;&#x51FA;&#x571F;&#x661F;&#x661F;&#x7403;&#xFF08;&#x6B64;&#x4E3A;&#x8349;&#x7A3F;&#xFF0C;&#x540E;&#x9762;&#x8FD8;&#x4F1A;&#x7EC6;&#x5316;&#xFF09;&#xFF1A;</p><pre><code class="css">.saturn {
    position: relative;
}

.saturn::before,
.saturn::after {
    content: &apos;&apos;;
    position: absolute;
    width: 9em;
    height: 9em;
    background: linear-gradient(
        palegoldenrod 0%,
        tan 10%,
        burlywood 30%,
        palegoldenrod 60%,
        darkgray 100%
    );
    border-radius: 50%;
    left: calc((20em - 9em) / 2);
    top: calc((20em - 9em) / 2);
}</code></pre><p>&#x753B;&#x51FA;&#x571F;&#x661F;&#x73AF;&#xFF08;&#x6B64;&#x4E3A;&#x8349;&#x7A3F;&#xFF0C;&#x540E;&#x9762;&#x8FD8;&#x4F1A;&#x7EC6;&#x5316;&#xFF09;&#xFF1A;</p><pre><code class="css">.rings {
    position: absolute;
    width: inherit;
    height: inherit;
    background: radial-gradient(
        transparent 35%,
        dimgray 40%,
        slategray 50%,
        transparent 60%,
        dimgray 60%,
        slategray 70%,
        transparent 70%
    );
}</code></pre><p>&#x6539;&#x53D8;&#x89C2;&#x5BDF;&#x571F;&#x661F;&#x73AF;&#x7684;&#x89C6;&#x89D2;&#xFF1A;</p><pre><code class="css">.rings {
    transform: rotateX(75deg);
}</code></pre><p>&#x4E3A;&#x4E86;&#x4F7F;&#x571F;&#x661F;&#x5448;&#x73B0;&#x88AB;&#x571F;&#x661F;&#x73AF;&#x73AF;&#x7ED5;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x628A;&#x571F;&#x661F;&#x5206;&#x4E3A;&#x4E0A;&#x4E0B;&#x4E24;&#x534A;&#xFF0C;&#x4F7F;&#x5B83;&#x4EEC;&#x548C;&#x571F;&#x661F;&#x73AF;&#x7684;&#x56FE;&#x5C42;&#x987A;&#x5E8F;&#x4ECE;&#x5E95;&#x5230;&#x9876;&#x4F9D;&#x6B21;&#x4E3A;&#xFF1A;&#x661F;&#x7403;&#x7684;&#x4E0B;&#x534A;&#x90E8;&#x3001;&#x571F;&#x661F;&#x73AF;&#x3001;&#x661F;&#x7403;&#x7684;&#x4E0A;&#x534A;&#x90E8;&#xFF1A;</p><pre><code class="css">.saturn::before {
    clip-path: inset(50% 0 0 0);
}

.saturn::after {
    clip-path: inset(0 0 50% 0);
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x753B;&#x51FA;&#x4E86;&#x571F;&#x661F;&#x7684;&#x6574;&#x4F53;&#x7ED3;&#x6784;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5B8C;&#x5584;&#x7EC6;&#x8282;&#x3002;<br>&#x4E3A;&#x571F;&#x661F;&#x73AF;&#x6D82;&#x4E0A;&#x4E30;&#x5BCC;&#x7684;&#x6E10;&#x53D8;&#x8272;&#xFF1A;</p><pre><code class="css">.rings {
    background: radial-gradient(
        rgba(24,19,25,0) 0%,
        rgba(53,52,51,0) 34%,
        rgba(55,54,52,1) 36%,
        rgba(56,55,53,1) 37%,
        rgba(68,67,66,1) 38%,
        rgba(56,55,53,1) 39%,
        rgba(68,67,66,1) 40%,
        rgba(56,55,53,1) 41%,
        rgba(87,77,76,1) 42%,
        rgba(87,77,76,1) 44%,
        rgba(113,110,103,1) 46%,
        rgba(113,110,103,1) 48%,
        rgba(113,98,93,1) 49%,
        rgba(113,98,93,1) 51%,
        rgba(122,115,105,1) 52%,
        rgba(113,98,93,1) 53%,
        rgba(113,98,93,1) 54%,
        rgba(122,115,105,1) 55%,
        rgba(106,99,89,1) 56%,
        rgba(106,99,89,1) 58%,
        rgba(79,76,76,0) 60%,
        rgba(65,64,70,1) 61%,
        rgba(65,64,70,1) 62%,
        rgba(90,85,89,1) 63%,
        rgba(78,74,73,1) 65%,
        rgba(78,73,74,1) 67%,
        rgba(78,73,74,0) 68%,
        rgba(78,73,75,1) 69%,
        rgba(78,73,75,1) 70%,
        rgba(78,73,76,0) 71%,
        rgba(77,72,76,0) 72%,
        rgba(24,19,25,0) 100%
    );
}</code></pre><p>&#x4E3A;&#x661F;&#x7403;&#x6D82;&#x4E0A;&#x4E30;&#x5BCC;&#x7684;&#x6E10;&#x53D8;&#x8272;&#xFF1A;</p><pre><code class="css">.saturn::before,
.saturn::after {
    background:
        linear-gradient(
            rgba(212,203,174,1) 0%,
            rgba(212,203,174,1) 10%,
            rgba(221,203,157,1) 15%,
            rgba(221,203,157,1) 17%,
            rgba(213,181,143,1) 22%,
            rgba(213,181,143,1) 26%,
            rgba(208,180,158,1) 32%,
            rgba(208,180,158,1) 36%,
            rgba(218,188,162,1) 37%,
            rgba(218,188,162,1) 39%,
            rgba(211,184,157,1) 41%,
            rgba(211,184,157,1) 49%,
            rgba(205,186,156,1) 51%,
            rgba(205,186,156,1) 52%,
            rgba(202,176,153,1) 53%,
            rgba(202,176,153,1) 65%,
            rgba(190,177,145,1) 68%,
            rgba(190,177,145,1) 80%,
            rgba(150,144,130,1) 91%,
            rgba(150,144,130,1) 95%,
            rgba(131,129,117,1) 97%,
            rgba(131,129,117,1) 100%
        );
}</code></pre><p>&#x518D;&#x4E3A;&#x661F;&#x7403;&#x589E;&#x52A0;&#x5149;&#x7167;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.saturn::before,
.saturn::after {
    background:
        radial-gradient(
            circle at top, 
            transparent 40%,
            black
        ),
        radial-gradient(
            transparent 62%,
            black
        ),
        linear-gradient(
            rgba(212,203,174,1) 0%,
            rgba(212,203,174,1) 10%,
            rgba(221,203,157,1) 15%,
            rgba(221,203,157,1) 17%,
            rgba(213,181,143,1) 22%,
            rgba(213,181,143,1) 26%,
            rgba(208,180,158,1) 32%,
            rgba(208,180,158,1) 36%,
            rgba(218,188,162,1) 37%,
            rgba(218,188,162,1) 39%,
            rgba(211,184,157,1) 41%,
            rgba(211,184,157,1) 49%,
            rgba(205,186,156,1) 51%,
            rgba(205,186,156,1) 52%,
            rgba(202,176,153,1) 53%,
            rgba(202,176,153,1) 65%,
            rgba(190,177,145,1) 68%,
            rgba(190,177,145,1) 80%,
            rgba(150,144,130,1) 91%,
            rgba(150,144,130,1) 95%,
            rgba(131,129,117,1) 97%,
            rgba(131,129,117,1) 100%
        );
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x753B;&#x9762;&#x65CB;&#x8F6C;&#x4E00;&#x70B9;&#x89D2;&#x5EA6;&#xFF1A;</p><pre><code class="css">.saturn {
    transform: rotate(-15deg);
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：92# 视频演示如何用纯 CSS 创作一颗逼真的土星

## 原文链接
[https://segmentfault.com/a/1190000015798428](https://segmentfault.com/a/1190000015798428)


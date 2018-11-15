---
title: '前端每日实战：118# 视频演示如何用纯 CSS 创作一个沙漏 loader'
reprint: true
categories: reprint
abbrlink: 81a55c97
date: 2018-11-14 02:30:09
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/bVbfWwz?w=400&amp;h=301" src="https://static.alili.tech/img/bVbfWwz?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/VGegxr" rel="nofollow noreferrer">https://codepen.io/comehope/pen/VGegxr</a></p><h2>&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cVRr9cp" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/cVRr9cp</a></p><h2>&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges</a></p><h2>&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x6C99;&#x6F0F;&#x7684;&#x4E0A;&#x534A;&#x90E8;&#x548C;&#x4E0B;&#x534A;&#x90E8;&#xFF1A;</p><pre><code class="html">&lt;div class=&quot;loader&quot;&gt;
    &lt;span class=&quot;top&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;bottom&quot;&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><pre><code class="css">body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gainsboro;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x6574;&#x4F53;&#x5E03;&#x5C40;&#xFF1A;</p><pre><code class="css">.loader {
    width: 4.3em;
    height: 9.8em;
    font-size: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}</code></pre><p>&#x753B;&#x51FA; 2 &#x4E2A;&#x6B63;&#x65B9;&#x5F62;&#xFF1A;</p><pre><code class="css">.top,
.bottom {
    width: 3.5em;
    height: 3.5em;
    border-style: solid;
    border-color: saddlebrown;
}</code></pre><p>&#x901A;&#x8FC7;&#x8FB9;&#x6846;&#x3001;&#x5706;&#x89D2;&#x548C;&#x65CB;&#x8F6C;&#xFF0C;&#x628A; 2 &#x4E2A;&#x6B63;&#x65B9;&#x5F62;&#x53D8;&#x6210;&#x6C99;&#x6F0F;&#x5F62;&#x72B6;&#xFF1A;</p><pre><code class="css">.top,
.bottom {
    border-width: 0.2em 0.2em 0.6em 0.6em;
    border-radius: 50% 100% 50% 30%;
}

.top {
    transform: rotate(-45deg);
}

.bottom {
    transform: rotate(135deg);
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x6C99;&#x5B50;&#xFF0C;&#x4E0A;&#x90E8;&#x7684;&#x6C99;&#x5B50;&#x7684;&#x9876;&#x90E8;&#x662F;&#x5927;&#x5706;&#x5F27;&#xFF0C;&#x4E0B;&#x90E8;&#x7684;&#x6C99;&#x5B50;&#x7684;&#x9876;&#x90E8;&#x662F;&#x5C0F;&#x5706;&#x5F27;&#xFF1A;</p><pre><code class="css">.top::before,
.bottom::before {
    content: &apos;&apos;;
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: deepskyblue;
}

.top::before {
    border-radius: 0 100% 0 0;
}

.bottom::before {
    border-radius: 0 0 0 35%;
}</code></pre><p>&#x5B9A;&#x4E49;&#x6C99;&#x5B50;&#x7684;&#x52A8;&#x753B;&#x5C5E;&#x6027;&#xFF1A;</p><pre><code class="css">.top::before,
.bottom::before {
    animation: 2s linear infinite;
}</code></pre><p>&#x589E;&#x52A0;&#x6C99;&#x5B50;&#x4ECE;&#x6C99;&#x6F0F;&#x7684;&#x4E0A;&#x534A;&#x90E8;&#x843D;&#x4E0B;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.top::before {
    animation-name: drop-sand;
}

@keyframes drop-sand {
    to {
        transform: translate(-2.5em, 2.5em);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x6C99;&#x5B50;&#x7684;&#x6C99;&#x6F0F;&#x5728;&#x4E0B;&#x534A;&#x90E8;&#x5806;&#x79EF;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.bottom::before {
    transform: translate(2.5em, -2.5em);
    animation-name: fill-sand;
}

@keyframes fill-sand {
    to {
        transform: translate(0, 0);
    }
}</code></pre><p>&#x9690;&#x85CF;&#x6C99;&#x6F0F;&#x4E0A;&#x534A;&#x90E8;&#x548C;&#x4E0B;&#x534A;&#x90E8;&#x5BB9;&#x5668;&#x5916;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x6B64;&#x65F6;&#x4E0A;&#x9762; 2 &#x4E2A;&#x52A8;&#x753B;&#x7684;&#x53E0;&#x52A0;&#x6548;&#x679C;&#x662F;&#x6C99;&#x5B50;&#x4ECE;&#x4E0A;&#x534A;&#x90E8;&#x6F0F;&#x4E0B;&#xFF0C;&#x6162;&#x6162;&#x5728;&#x4E0B;&#x534A;&#x90E8;&#x5806;&#x79EF;&#xFF1A;</p><pre><code class="css">.top,
.bottom {
    overflow: hidden;
}</code></pre><p>&#x7528;&#x5916;&#x5C42;&#x5BB9;&#x5668;&#x7684;&#x4F2A;&#x5143;&#x7D20;&#x5236;&#x4F5C;&#x4E00;&#x4E2A;&#x7A84;&#x957F;&#x6761;&#xFF0C;&#x6A21;&#x62DF;&#x6D41;&#x52A8;&#x7684;&#x6C99;&#x5B50;&#xFF1A;</p><pre><code class="css">.loader::after {
    content: &apos;&apos;;
    position: absolute;
    width: 0.2em;
    height: 4.8em;
    background-color: deepskyblue;
    top: 1em;
}</code></pre><p>&#x589E;&#x52A0;&#x6C99;&#x5B50;&#x6D41;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.loader::after {
    animation: flow 2s linear infinite;
}

@keyframes flow {
    10%, 100% {
        transform: translateY(3.2em);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x589E;&#x52A0;&#x6C99;&#x6F0F;&#x7684;&#x7FFB;&#x8F6C;&#x52A8;&#x753B;&#xFF1A;</p><pre><code class="css">.loader {
    animation: rotating 2s linear infinite;
}

@keyframes rotating {
    0%, 90% {
        transform: rotate(0);
    }
    
    100% {
        transform: rotate(0.5turn);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：118# 视频演示如何用纯 CSS 创作一个沙漏 loader

## 原文链接
[https://segmentfault.com/a/1190000016153878](https://segmentfault.com/a/1190000016153878)


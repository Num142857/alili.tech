---
title: '前端每日实战：114# 视频演示如何用纯 CSS 和混色模式创作一个 loader 动画' 
date: 2018-11-15 21:18:14
hidden: true
slug: r9fpkko1wpi
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfIyK?w=400&amp;h=303" src="https://static.alili.tech/img/bVbfIyK?w=400&amp;h=303" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/MqYroW" rel="nofollow noreferrer">https://codepen.io/comehope/pen/MqYroW</a></p><h2>&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/c2qZyUV" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/c2qZyUV</a></p><h2>&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges</a></p><h2>&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709; 1 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><pre><code class="css">&lt;div class=&quot;loader&quot;&gt;&lt;/div&gt;</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><pre><code class="css">body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightyellow;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><pre><code class="css">.loader {
    width: 30em;
    height: 3em;
    font-size: 10px;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;2&#x4E2A;&#x5706;&#x89D2;&#x77E9;&#x5F62;&#xFF0C;&#x5404;&#x5360;&#x5BB9;&#x5668;&#x7684;&#x4E00;&#x534A;&#x5BBD;&#xFF0C;&#x653E;&#x7F6E;&#x5728;&#x5BB9;&#x5668;&#x7684;&#x5DE6;&#x53F3;&#x4E24;&#x7AEF;&#xFF0C;&#x5206;&#x522B;&#x4E0A;&#x8272;&#xFF1A;</p><pre><code class="css">.loader {
    position: relative;
}

.loader::before,
.loader::after {
    content: &apos;&apos;;
    position: absolute;
    width: 50%;
    height: inherit;
    border-radius: 1em;
}

.loader::before {
    left: 0;
    background-color: dodgerblue;
}

.loader::after {
    right: 0;
    background-color: hotpink;
}</code></pre><p>&#x4E3A;&#x5706;&#x89D2;&#x77E9;&#x5F62;&#x589E;&#x52A0; &apos;loading&apos; &#x6587;&#x672C;&#xFF1A;</p><pre><code class="css">.loader::before,
.loader::after {
    content: &apos;loading&apos;;
    font-size: 2.5em;
    color: white;
    text-align: center;
    line-height: 1em;
}</code></pre><p>&#x589E;&#x52A0;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.loader::before,
.loader::after {
    animation: 5s move ease-in-out infinite;
}

@keyframes move {
    50% {
        transform: translateX(100%);
    }
}</code></pre><p>&#x4E3A;&#x4E24;&#x4E2A;&#x5706;&#x89D2;&#x77E9;&#x5F62;&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x8FD0;&#x52A8;&#x65B9;&#x5411;&#x53D8;&#x91CF;&#xFF0C;&#x4F7F;&#x5B83;&#x4EEC;&#x76F8;&#x5BF9;&#x79FB;&#x52A8;&#xFF1A;</p><pre><code class="css">.loader::before {
    --direction: 1;
}

.loader::after {
    --direction: -1;
}

@keyframes move {
    50% {
        transform: translateX(calc(100% * var(--direction)));
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BBE;&#x7F6E;&#x6DF7;&#x8272;&#x6A21;&#x5F0F;&#xFF0C;&#x4F7F;&#x4E24;&#x4E2A;&#x77E9;&#x5F62;&#x76F8;&#x4EA4;&#x7684;&#x90E8;&#x5206;&#x4E0D;&#x662F;&#x8986;&#x76D6;&#x800C;&#x662F;&#x4F7F;&#x989C;&#x8272;&#x91CD;&#x53E0;&#xFF1A;</p><pre><code class="css">.loader::before,
.loader::after {
    mix-blend-mode: multiply;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：114# 视频演示如何用纯 CSS 和混色模式创作一个 loader 动画

## 原文链接
[https://segmentfault.com/a/1190000016100197](https://segmentfault.com/a/1190000016100197)


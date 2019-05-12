---
title: '前端每日实战：93# 视频演示如何用纯 CSS 创作一根闪电连接线' 
date: 2018-11-20 2:30:10
hidden: true
slug: e4qlk7rh0da
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeuTB?w=400&amp;h=300" src="https://static.alili.tech/img/bVbeuTB?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/RBjdzZ" rel="nofollow noreferrer">https://codepen.io/comehope/pen/RBjdzZ</a></p><h2>&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cgkE6C6" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/cgkE6C6</a></p><h2>&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges</a></p><h2>&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x63D2;&#x5934;&#x548C;&#x7EBF;&#x7F06;&#xFF1A;</p><pre><code class="html">&lt;div class=&quot;cable&quot;&gt;
    &lt;span class=&quot;head&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><pre><code class="css">body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><pre><code class="css">.cable {
    display: flex;
    align-items: center;
    font-size: 10px;
    margin-left: 5em;
}</code></pre><p>&#x753B;&#x51FA;&#x63D2;&#x5934;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><pre><code class="css">.head {
    width: 8.5em;
    height: 8.5em;
    border-radius: 2em 0 0 2em;
}</code></pre><p>&#x753B;&#x51FA;&#x63D2;&#x5934;&#x4E0A;&#x9488;&#x811A;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><pre><code class="css">.head {
    position: relative;
}

.head::before {
    content: &apos;&apos;;
    position: absolute;
    width: 3em;
    height: 7.3em;
    top: calc((8.5em - 7.3em) / 2);
    left: 0.7em;
    border-radius: 1em;
    box-sizing: border-box;
}</code></pre><p>&#x753B;&#x51FA;&#x7EBF;&#x7F06;&#x4E2D;&#x624B;&#x6301;&#x90E8;&#x4F4D;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><pre><code class="css">.body {
    width: 15.5em;
    height: 11em;
    border-radius: 0.5em;
}</code></pre><p>&#x753B;&#x51FA;&#x7EBF;&#x7F06;&#x4E2D;&#x7A0D;&#x7C97;&#x90E8;&#x4F4D;&#x7684;&#x8F6E;&#x5ED3;&#xFF1A;</p><pre><code class="css">.body {
    position: relative;
    display: flex;
    align-items: center;
}

.body::before {
    content: &apos;&apos;;
    position: absolute;
    width: 13.5em;
    height: 6em;
    left: 15.5em;
}</code></pre><p>&#x753B;&#x51FA;&#x7EBF;&#x7F06;&#x7684;&#x5EF6;&#x957F;&#x7EBF;&#x90E8;&#x5206;&#xFF1A;</p><pre><code class="css">.body::after {
    content: &apos;&apos;;
    position: absolute;
    width: 100vh;
    height: 3.9em;
    left: calc(15.5em + 13.5em);
}</code></pre><p>&#x9690;&#x85CF;&#x753B;&#x9762;&#x5916;&#x7684;&#x90E8;&#x5206;&#xFF1A;</p><pre><code class="css">body {
    overflow: hidden;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x7ED8;&#x5236;&#x7EC6;&#x8282;&#x3002;<br>&#x4E3A;&#x5EF6;&#x957F;&#x7EBF;&#x6D82;&#x4E0A;&#x6E10;&#x53D8;&#x8272;&#xFF1A;</p><pre><code class="css">.body::after {
    background:
        linear-gradient(
            white,
            hsl(0, 0%, 96%) 5%,  
            hsl(0, 0%, 97%) 25%, 
            hsl(0, 0%, 95%) 40%, 
            hsl(0, 0%, 81%) 95%,
            white
        );
}</code></pre><p>&#x4E3A;&#x7EBF;&#x7F06;&#x4E2D;&#x7A0D;&#x7C97;&#x90E8;&#x4F4D;&#x6D82;&#x4E0A;&#x6E10;&#x53D8;&#x8272;&#xFF1A;</p><pre><code class="css">.body::before {
    background:
        linear-gradient(
            white,
            hsl(0, 0%, 96%) 5%,  
            hsl(0, 0%, 98%) 20%, 
            hsl(0, 0%, 95%) 50%, 
            hsl(0, 0%, 81%) 95%,
            white
        );
}</code></pre><p>&#x4E3A;&#x7EBF;&#x7F06;&#x4E2D;&#x624B;&#x6301;&#x90E8;&#x4F4D;&#x6D82;&#x4E0A;&#x6E10;&#x53D8;&#x8272;&#xFF1A;</p><pre><code class="css">.body {
    background:linear-gradient(
        hsl(0, 0%, 91%),
        white 15%, 
        hsl(0, 0%, 93%) 50%, 
        hsl(0, 0%, 87%) 70%,
        hsl(0, 0%, 79%) 90%,
        hsl(0, 0%, 84%), 
        hsl(0, 0%, 86%)
    );
}</code></pre><p>&#x4E3A;&#x63D2;&#x5934;&#x6D82;&#x4E0A;&#x6E10;&#x53D8;&#x8272;&#xFF1A;</p><pre><code class="css">.head {
    background:
        linear-gradient(
            -45deg, 
            hsl(0, 0%, 75%),
            hsl(0, 0%, 79%),
            hsl(0, 0%, 78%),
            hsl(0, 0%, 87%) 80%
        );
}</code></pre><p>&#x5728;&#x63D2;&#x5934;&#x4E0A;&#x753B;&#x51FA;&#x9488;&#x811A;&#xFF1A;</p><pre><code class="css">.head::before {
    background-color: white;
}

.head::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 2.2em;
    height: 0.4em;
    color: goldenrod;
    background-color: currentColor;
    border-radius: 0.5em;
    left: 1.1em;
    top: 1.2em;
    box-shadow: 
        0 0.8em 0,
        0 1.6em 0,
        0 2.4em 0,
        0 3.2em 0,
        0 4em 0,
        0 4.8em 0,
        0 5.6em 0;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6DFB;&#x52A0;&#x9634;&#x5F71;&#xFF0C;&#x4F7F;&#x7EBF;&#x7F06;&#x66F4;&#x7ACB;&#x4F53;&#x3002;<br>&#x7ED8;&#x5236;&#x63D2;&#x5934;&#x4E0A;&#x7684;&#x9634;&#x5F71;&#xFF1A;</p><pre><code class="css">.head {
    background:
        linear-gradient(
            90deg, 
            transparent 80%,
            rgba(0,0,0,12%)
        ),
        linear-gradient(
            -45deg, 
            hsl(0, 0%, 75%),
            hsl(0, 0%, 79%),
            hsl(0, 0%, 78%),
            hsl(0, 0%, 87%) 80%
        );
}</code></pre><p>&#x7ED8;&#x5236;&#x7EBF;&#x7F06;&#x624B;&#x6301;&#x90E8;&#x5206;&#x7684;&#x9634;&#x5F71;&#xFF1A;</p><pre><code class="css">.body::before {
    background:
        linear-gradient(
            45deg, 
            rgba(0,0,0,4%) 10%,
            transparent 20%
        ),    
        linear-gradient(
            90deg, 
            rgba(0,0,0,4%), 
            transparent 10%
        ),
        linear-gradient(
            white,
            hsl(0, 0%, 96%) 5%,  
            hsl(0, 0%, 98%) 20%, 
            hsl(0, 0%, 95%) 50%, 
            hsl(0, 0%, 81%) 95%,
            white
        );
}</code></pre><p>&#x7ED8;&#x5236;&#x7EBF;&#x7F06;&#x4E2D;&#x7A0D;&#x7C97;&#x90E8;&#x4F4D;&#x7684;&#x9634;&#x5F71;&#xFF1A;</p><pre><code class="css">.body::after {
    background:
        linear-gradient(
            45deg, 
            rgba(0,0,0,4%),
            transparent 4%
        ),
        linear-gradient(
            90deg, 
            rgba(0,0,0,4%),
            transparent 2%
        ),
        linear-gradient(
            white,
            hsl(0, 0%, 96%) 5%,  
            hsl(0, 0%, 97%) 25%, 
            hsl(0, 0%, 95%) 40%, 
            hsl(0, 0%, 81%) 95%,
            white
        );
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x753B;&#x9762;&#x589E;&#x52A0;&#x5165;&#x573A;&#x52A8;&#x753B;</p><pre><code class="css">.cable {
    animation: show 5s linear infinite;
}

@keyframes show {
    0% {
        transform: translateX(100vw);
    }

    20%, 100% {
        transform: translateX(0);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：93# 视频演示如何用纯 CSS 创作一根闪电连接线

## 原文链接
[https://segmentfault.com/a/1190000015809333](https://segmentfault.com/a/1190000015809333)


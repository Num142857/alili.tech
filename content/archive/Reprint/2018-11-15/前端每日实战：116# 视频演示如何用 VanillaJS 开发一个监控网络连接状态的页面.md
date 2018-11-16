---
title: '前端每日实战：116# 视频演示如何用 VanillaJS 开发一个监控网络连接状态的页面'
reprint: true
categories: reprint
slug: 18aabdcb
date: 2018-11-15 02:30:08
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfQmV?w=400&amp;h=305" src="https://static.alili.tech/img/bVbfQmV?w=400&amp;h=305" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/oPjWvw" rel="nofollow noreferrer">https://codepen.io/comehope/pen/oPjWvw</a></p><h2>&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/ceNm8CW" rel="nofollow noreferrer">https://scrimba.com/p/pEgDAM/ceNm8CW</a></p><h2>&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer">https://github.com/comehope/front-end-daily-challenges</a></p><h2>&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>navigator.onLine &#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x5728;&#x7EBF;&#x72B6;&#x6001;&#xFF0C;&#x518D;&#x914D;&#x5408;&#x76F8;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x5728;&#x7EBF;&#x68C0;&#x6D4B;&#x5DE5;&#x5177;&#x4E86;&#x3002;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x5206;&#x6210;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x5148;&#x753B;&#x51FA;&#x89C6;&#x89C9;&#x6548;&#x679C;&#xFF0C;&#x518D;&#x68C0;&#x6D4B;&#x5728;&#x7EBF;/&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#x3002;</p><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x5BA2;&#x6237;&#x7AEF;&#x3001;&#x4FE1;&#x53F7;&#x548C;&#x670D;&#x52A1;&#x5668;&#xFF1A;</p><pre><code class="html">&lt;div class=&quot;detector&quot;&gt;
    &lt;div class=&quot;client&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;signal&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;server&quot;&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><pre><code class="css">body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre><p>&#x5728;&#x9876;&#x90E8;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x6A2A;&#x6761;&#xFF0C;&#x7528;&#x4E8E;&#x663E;&#x793A;&#x5F53;&#x524D;&#x72B6;&#x6001;&#x662F;&#x5728;&#x7EBF;&#x8FD8;&#x662F;&#x79BB;&#x7EBF;&#xFF0C;&#x7528;&#x7EFF;&#x8272;&#x8868;&#x793A;&#x5728;&#x7EBF;&#xFF1A;</p><pre><code class="css">:root {
    --status-color: green;
}

body {
    background: linear-gradient(var(--status-color) 5vh, #ccc 5vh);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><pre><code class="css">.detector {
    width: 40em;
    height: 14em;
    font-size: 10px;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5B50;&#x5143;&#x7D20;&#xFF08;&#x5BA2;&#x6237;&#x7AEF;&#x3001;&#x4FE1;&#x53F7;&#x3001;&#x670D;&#x52A1;&#x5668;&#xFF09;&#x7684;&#x6574;&#x4F53;&#x5E03;&#x5C40;&#x548C;&#x4E3B;&#x8272;&#xFF1A;</p><pre><code class="css">.detector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#xFF08;&#x5BA2;&#x6237;&#x7AEF;&#x3001;&#x4FE1;&#x53F7;&#x3001;&#x670D;&#x52A1;&#x5668;&#xFF09;&#x548C;&#x5B83;&#x4EEC;&#x7684;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x5171;&#x6709;&#x5C5E;&#x6027;&#xFF1A;</p><pre><code class="css">.detector &gt; * {
    position: relative;
    box-sizing: border-box;
}

.detector &gt; *::before,
.detector &gt; *::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
}</code></pre><p>&#x753B;&#x51FA;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x663E;&#x793A;&#x5668;&#xFF1A;</p><pre><code class="css">.client {
    width: 17em;
    height: 10em;
    border: 0.5em solid;
    border-radius: 0.5em;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x663E;&#x793A;&#x5668;&#x7684;&#x5E95;&#x5EA7;&#xFF1A;</p><pre><code class="css">.client {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -4em;
}

.client::before {
    width: 1.5em;
    height: 3em;
    background-color: currentColor;
    top: 9.5em;
}

.client::after {
    width: 5em;
    height: 1em;
    background-color: currentColor;
    border-radius: 0.3em;
    top: 12.5em;
}</code></pre><p>&#x753B;&#x51FA;&#x670D;&#x52A1;&#x5668;&#x7684;&#x673A;&#x7BB1;&#xFF1A;</p><pre><code class="css">.server {
    width: 7em;
    height: 14em;
    border: 0.5em solid;
    border-radius: 0.5em;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x786C;&#x76D8;&#xFF0C;&#x7559;&#x610F;&#x6B64;&#x5904;&#x9634;&#x5F71;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x7528;&#x9634;&#x5F71;&#x753B;&#x51FA;&#x4E86;&#x7B2C;&#x4E8C;&#x5757;&#x786C;&#x76D8;&#xFF1A;</p><pre><code class="css">.server::before {
    width: 5em;
    height: 1em;
    background-color: currentColor;
    border-radius: 0.2em;
    top: 8em;
    left: 0.5em;
    box-shadow: 0 1.5em 0;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x6309;&#x94AE;&#xFF0C;&#x548C;&#x4E0A;&#x9762;&#x9634;&#x5F71;&#x540C;&#x6837;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x8FD9;&#x6B21;&#x7528;&#x9634;&#x5F71;&#x753B;&#x51FA;&#x4E86;&#x7B2C;&#x4E8C;&#x4E2A;&#x6309;&#x94AE;&#xFF1A;</p><pre><code class="css">.server::after {
    width: 0.6em;
    height: 0.6em;
    background-color: currentColor;
    border-radius: 50%;
    right: 1.5em;
    bottom: 0.5em;
    box-shadow: 1em 0 0 0.1em;
}</code></pre><p>&#x753B;&#x51FA;&#x4FE1;&#x53F7;&#xFF0C;&#x6CE8;&#x610F;&#x914D;&#x8272;&#x7528;&#x7684;&#x662F;&#x4EE3;&#x8868;&#x5728;&#x7EBF;/&#x79BB;&#x7EBF;&#x7684;&#x989C;&#x8272;&#xFF0C;&#x76EE;&#x524D;&#x662F;&#x7EFF;&#x8272;&#xFF1A;</p><pre><code class="css">.signal,
.signal::before,
.signal::after {
    width: 1em;
    height: 1em;
    background-color: var(--status-color);
    border-radius: 50%;
}

.signal::before {
    right: 2.5em;
}

.signal::after {
    left: 2.5em;
}</code></pre><p>&#x7ED9;&#x4FE1;&#x53F7;&#x589E;&#x52A0;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><pre><code class="css">.signal,
.signal::before,
.signal::after {
    animation: blink 0.6s infinite;
}

@keyframes blink {
    50% {
        filter: opacity(0.1);
    }
}</code></pre><p>&#x4E3A;&#x7B2C; 2 &#x4E2A;&#x4FE1;&#x53F7;&#x548C;&#x7B2C; 3 &#x4E2A;&#x4FE1;&#x53F7;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x5EF6;&#x65F6;&#x7684;&#x503C;&#x7528;&#x53D8;&#x91CF;&#x5B9A;&#x4E49;&#xFF1A;</p><pre><code class="css">:root {
    --second-signal-delay: 0.2s;
    --third-signal-delay: 0.4s;
}

.signal::before {
    animation-delay: var(--second-signal-delay);
}

.signal::after {
    animation-delay: var(--third-signal-delay);
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x89C6;&#x89C9;&#x6548;&#x679C;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#xFF0C;&#x76EE;&#x524D;&#x662F;&#x5728;&#x7EBF;&#x72B6;&#x6001;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5728; <code>:root</code> &#x4E2D;&#x4E00;&#x5171;&#x5B9A;&#x4E49;&#x4E86; 3 &#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x9876;&#x90E8;&#x6A2A;&#x6761;&#x548C;&#x4FE1;&#x53F7;&#x662F;&#x7EFF;&#x8272;&#xFF0C;&#x4FE1;&#x53F7;&#x706F;&#x4F9D;&#x6B21;&#x95EA;&#x70C1;&#x8868;&#x793A;&#x6B63;&#x5728;&#x4F20;&#x8F93;&#x6570;&#x636E;&#xFF1A;</p><pre><code class="css">:root {
    --status-color: green;
    --second-signal-delay: 0.2s;
    --third-signal-delay: 0.4s;
}</code></pre><p>&#x901A;&#x8FC7;&#x4FEE;&#x6539;&#x8FD9; 3 &#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#x7684;&#x89C6;&#x89C9;&#x6548;&#x679C;&#xFF0C;&#x9876;&#x90E8;&#x6A2A;&#x6761;&#x548C;&#x4FE1;&#x53F7;&#x53D8;&#x4E3A;&#x7EA2;&#x8272;&#xFF0C;&#x4FE1;&#x53F7;&#x706F;&#x4E00;&#x8D77;&#x95EA;&#x70C1;&#x8868;&#x793A;&#x7EBF;&#x8DEF;&#x4E0D;&#x901A;&#xFF1A;</p><pre><code class="css">:root {
    --status-color: orangered;
    --second-signal-delay: 0s;
    --third-signal-delay: 0s;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x901A;&#x8FC7;&#x68C0;&#x6D4B;&#x5728;&#x7EBF;/&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#xFF0C;&#x52A8;&#x6001;&#x5E94;&#x7528;&#x8FD9; 2 &#x79CD;&#x6548;&#x679C;&#x3002;</p><p>&#x5B9A;&#x4E49;&#x5728;&#x7EBF;&#x72B6;&#x6001;&#x4E3B;&#x9898;&#xFF1A;</p><pre><code class="javascript">const ONLINE_THEME = {
    statusColor: &apos;green&apos;,
    secondSignalDelay: &apos;0.2s&apos;,
    thirdSignalDelay: &apos;0.4s&apos;
}</code></pre><p>&#x7C7B;&#x4F3C;&#x5730;&#xFF0C;&#x5B9A;&#x4E49;&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#x4E3B;&#x9898;&#xFF1A;</p><pre><code class="javascript">const OFFLINE_THEME = {
    statusColor: &apos;orangered&apos;,
    secondSignalDelay: &apos;0s&apos;,
    thirdSignalDelay: &apos;0s&apos;
}</code></pre><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x6839;&#x636E;&#x5728;&#x7EBF;/&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#x663E;&#x793A;&#x4E0D;&#x540C;&#x7684;&#x4E3B;&#x9898;&#xFF1A;</p><pre><code class="javascript">function detectOnlineStatus() {
    let theme = navigator.onLine ? ONLINE_THEME : OFFLINE_THEME
    let root = document.documentElement
    root.style.setProperty(&apos;--status-color&apos;, theme.statusColor)
    root.style.setProperty(&apos;--second-signal-delay&apos;, theme.secondSignalDelay)
    root.style.setProperty(&apos;--third-signal-delay&apos;, theme.thirdSignalDelay)
}

detectOnlineStatus()</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x5173;&#x6389; wifi &#x8FDE;&#x63A5;&#xFF0C;&#x7136;&#x540E;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x9875;&#x9762;&#x4F1A;&#x91C7;&#x7528;&#x7EA2;&#x8272;&#x4E3B;&#x9898;&#xFF1B;&#x518D;&#x6253;&#x5F00; wifi &#x8FDE;&#x63A5;&#xFF0C;&#x7136;&#x540E;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x9875;&#x9762;&#x4F1A;&#x91C7;&#x7528;&#x7EFF;&#x8272;&#x4E3B;&#x9898;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x628A;&#x68C0;&#x6D4B;&#x51FD;&#x6570;&#x4E0E;&#x7CFB;&#x7EDF;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF0C;&#x5F53;&#x8FDE;&#x63A5;&#x65AD;&#x5F00;&#x6216;&#x91CD;&#x65B0;&#x8FDE;&#x63A5;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x4F1A;&#x81EA;&#x52A8;&#x8BBE;&#x7F6E;&#x4E3B;&#x9898;&#xFF0C;&#x4E0D;&#x7528;&#x624B;&#x52A8;&#x5237;&#x65B0;&#x9875;&#x9762;&#x4E86;&#xFF1A;</p><pre><code class="javascript">window.addEventListener(&apos;online&apos;, detectOnlineStatus)
window.addEventListener(&apos;offline&apos;, detectOnlineStatus)</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：116# 视频演示如何用 VanillaJS 开发一个监控网络连接状态的页面

## 原文链接
[https://segmentfault.com/a/1190000016130216](https://segmentfault.com/a/1190000016130216)


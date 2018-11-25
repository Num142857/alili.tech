---
title: 'web端即时通信技术' 
date: 2018-11-26 2:30:09
hidden: true
slug: 4m3iwq6ljp
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x539F;&#x7406;</h2><blockquote>&#x539F;&#x5B50;&#x5BF9;&#x8C61;&#x53CA;&#x5176;api</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcXe6?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcXe6?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><blockquote>&#x901A;&#x4FE1;&#x7684;&#x5BF9;&#x8C61;&#x662F;: browser &#x548C; server<br>browser&#x4E4B;&#x95F4;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x901A;&#x4FE1;,&#x9700;&#x7ECF;&#x8FC7;server</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcQ5b?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcQ5b?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x76EE;&#x524D;&#x5373;&#x65F6;&#x901A;&#x8BAF;&#x6280;&#x672F;&#x7F57;&#x5217;</h2><p>1.&#x6D4F;&#x89C8;&#x5668;&#x8F6E;&#x8BE2;&#x670D;&#x52A1;&#x5668;</p><blockquote>xhr</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcQ9C?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcQ9C?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><blockquote>jsonp</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcSWi?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcSWi?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>2.&#x957F;&#x8F6E;&#x8BE2;</p><blockquote>&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x68C0;&#x6D4B;<strong>&#x8FDE;&#x63A5;&#x65AD;&#x5F00;</strong>&#x5373;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;<br>&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x68C0;&#x6D4B;<strong>&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;</strong>&#x5373;&#x54CD;&#x5E94;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcRcp?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcRcp?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>3.&#x57FA;&#x4E8E;http-stream&#x7684;&#x957F;&#x8F6E;&#x8BE2;</p><blockquote>xhr-streaming</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcRmv?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcRmv?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><blockquote>iframe streaming</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcRpJ?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcRpJ?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>4.SSE<br><span class="img-wrap"><img data-src="/img/bVbcSL3?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcSL3?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>5.websocket<br><span class="img-wrap"><img data-src="/img/bVbcSR7?w=1600&amp;h=1200" src="https://static.alili.tech/img/bVbcSR7?w=1600&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web端即时通信技术

## 原文链接
[https://segmentfault.com/a/1190000015418430](https://segmentfault.com/a/1190000015418430)


---
title: '一个微型 Javascript 开源项目如何在 4 天到 1000 star ？' 
date: 2019-02-04 2:30:57
hidden: true
slug: qdf59yc97zp
categories: [reprint]
---

{{< raw >}}

                    
<p>这里要提到的是我之前从项目抽离出来的微型 Javascript 项目 <a href="https://github.com/hustcc/timeago.js" rel="nofollow noreferrer" target="_blank">timeago.js</a>，为什么是微型，因为他还不到 2kb，这个也是做这个项目的原因之一。</p>
<p>已有的类似项目不是一般都依赖 jQuery 和 moment.js，实际上仅仅用到其中的选择器、一个日期方法（fromNow），<code>为了这么一点方法依赖，而引入则好么大的库</code>，个人感觉不是很划算。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006893725?w=740&amp;h=364" src="https://static.alili.tech/img/remote/1460000006893725?w=740&amp;h=364" alt="http://static.oschina.net/uploads/space/2016/0912/133711_0Rge_134320.png" title="http://static.oschina.net/uploads/space/2016/0912/133711_0Rge_134320.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/hustcc/timeago.js" rel="nofollow noreferrer" target="_blank">timeago.js</a> 项目大概开始于今年6月底左右，抽离出来，npm publish之后，在自己的多个项目中使用良好，就没有再多做更新了，后来因为另外一个项目中的 PR 引用到 timeago.js 项目，所以决定好好做一做，并推广一下，并陆续增加修改如下东西：</p>
<ol>
<li><p>增加<code>实时更新方法 render</code>，可以选择一些节点实时更新和计算；</p></li>
<li><p>完善<code>Testcase</code>，使用travis CI；</p></li>
<li><p>申请<code>域名 timeago.org</code>，后来因为这个域名和其他项目产生了一些不愉快，不过无所谓，我很大条；</p></li>
<li><p>更新优化<code>本地化 locale</code>文件的格式；</p></li>
<li><p>新开一个 issue 专门记录 locale 的 pr；</p></li>
</ol>
<p>然后将域名 <a href="http://timeago.org" rel="nofollow noreferrer" target="_blank">timeago.org</a> 发到 Hack New上，然后就是域名被老外转到reddit，并且关于创造更小的轮子，依赖jQuery这些问题引起了一些争论，再然后就过了一天，就上了 Github 的 Trending 总榜，<strong>目前已经在榜上 4 天了。就在这次天内，star 数量瞬间达到 1000 +</strong>，自己还是很激动的。</p>
<p>说说自己的感想吧？</p>
<ol>
<li><p>如果真的想好好做一个项目，还是申请一个<code>合适的域名</code>吧，这样可能会给人更加专业，更加重视的感觉；</p></li>
<li><p>老外真的特别喜欢发 pr 和 issue，可能是国内程序员的时间被商人完全榨干了；</p></li>
<li><p>保证项目有<code>完善的测试</code>，travis CI集成起来其实非常简单；</p></li>
<li><p><code>项目特色</code>，比如timeago.js特色就是tiny（1.75 kb完成其他项目依赖 jQ 的事情），并且在多个 issue 中要求 pr 一定要保证代码的简洁；</p></li>
<li><p><code>PR 规范</code>，比如 timeago.js 中的主要 pr 来源于本地化语言的翻译，所以我会专门开一个issue来展现需要 pr 哪些语言，然后大家一目了然，可以增加大家 pr 的积极性；</p></li>
</ol>
<p>做好这些之后，就可以到一些技术论坛发发文章，博客了，具体发哪些位置呢？</p>
<p><code>Hack New、开发者头条、V2ex、OSChina、segmentfault、极客头条</code>等等。我对国外技术站点不是很了解，仅仅发了 Hack New。</p>
<p>然后就是等着其他开发人员给你提意见、建议，然后积极响应和修改吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个微型 Javascript 开源项目如何在 4 天到 1000 star ？

## 原文链接
[https://segmentfault.com/a/1190000006893696](https://segmentfault.com/a/1190000006893696)


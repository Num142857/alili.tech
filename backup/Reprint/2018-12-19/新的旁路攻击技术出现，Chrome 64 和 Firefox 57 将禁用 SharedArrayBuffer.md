---
title: '新的旁路攻击技术出现，Chrome 64 和 Firefox 57 将禁用 SharedArrayBuffer' 
date: 2018-12-19 2:30:07
hidden: true
slug: owh86cfzlcp
categories: [reprint]
---

{{< raw >}}

                    
<p>昨天（2018-01-03）来自 Google Project Zero 的研究人员 Jann Horn 发表了一篇名为《旁路读取未授权内存的攻击技术》的博文。文中列举了一系列针对现代 CPU 使用的执行优化的新攻击技术。</p>
<ul><li><a href="https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html" rel="nofollow noreferrer" target="_blank">Reading privileged memory with a side-channel</a></li></ul>
<p>随后 Firefox 和 Chrome 也纷纷发布文章表示将在新版本中禁用 SharedArrayBuffer 功能。</p>
<ul>
<li><a href="https://blog.mozilla.org/security/2018/01/03/mitigations-landing-new-class-timing-attack/" rel="nofollow noreferrer" target="_blank">Mitigations landing for new class of timing attack</a></li>
<li><a href="https://www.chromium.org/Home/chromium-security/ssca" rel="nofollow noreferrer" target="_blank">Actions Required to Mitigate Speculative Side-Channel Attack Techniques</a></li>
</ul>
<p>这个漏洞也影响到了 WebAssembly。</p>
<p>Chrome 浏览器为每个标签页启动一个单独进程，但是并没有默认开启“网站隔离”功能。可以通过在地址栏输入 chrome://flags/#enable-site-per-process 手动开启。开启网站隔离功能后，Chrome 会为您的浏览器提供更多的安全保护措施。</p>
<p>网站隔离功能的已知问题：</p>
<ul>
<li>
<strong>内存</strong>：网站隔离功能将使 Chrome 的内存使用量增加约 10–20%.。</li>
<li>
<strong>打印</strong>：跨网站 iframe 会显示为空白。要打印整个网页，请将网页保存到您的计算机上。然后，打开保存的文件并进行打印。</li>
<li>DevTools：开启网站隔离功能后，Chrome 开发者工具将不完全支持跨网站 iframe。</li>
</ul>
<p>在启用网站隔离功能的情况下，由于 Chrome 在单独的进程中为每个打开的网站呈现内容，所以暴露于旁路攻击的数据会减少。</p>
<p>Chrome 的 JavaScript 引擎 V8 将包括从 Chrome 64 开始的缓解措施，该措施将于 2018 年1 月 23 日左右发布。未来的 Chrome 版本将包括额外的缓解措施和强化措施，这将进一步降低此类攻击的影响。缓解措施可能会导致性能损失。</p>
<p><span class="img-wrap"><img data-src="/img/bV1ueZ?w=487&amp;h=210" src="https://static.alili.tech/img/bV1ueZ?w=487&amp;h=210" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>而 Firefox 和 Chrome 都禁用了 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer" rel="nofollow noreferrer" target="_blank">SharedArrayBuffer</a> API 并修改了 performance.now() 的行为。Firefox 将 performance.now() 的精度降低到了 20µs，而 Chrome 目前还没有给出具体的数据。</p>
<p>这些都是临时措施，以后会在不影响性能的前提下防御这种攻击。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
新的旁路攻击技术出现，Chrome 64 和 Firefox 57 将禁用 SharedArrayBuffer

## 原文链接
[https://segmentfault.com/a/1190000012708572](https://segmentfault.com/a/1190000012708572)


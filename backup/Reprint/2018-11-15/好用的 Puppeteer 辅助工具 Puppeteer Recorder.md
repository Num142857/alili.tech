---
title: '好用的 Puppeteer 辅助工具 Puppeteer Recorder' 
date: 2018-11-15 21:20:48
hidden: true
slug: nm9zkhzyre
categories: [reprint]
---

{{< raw >}}
<h2>Puppeteer</h2><p><a href="https://github.com/GoogleChrome/puppeteer" rel="nofollow noreferrer">Puppeteer</a> &#x662F;&#x4E00;&#x4E2A;<code>Node</code>&#x5E93;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x9AD8;&#x7EA7;<code>API</code>&#x6765;&#x63A7;&#x5236;<code>DevTools</code>&#x534F;&#x8BAE;&#x4E0A;&#x7684;<code>Chrome</code>&#x6216;<code>Chromium</code>&#xFF0C;&#x5E38;&#x7528;&#x4E8E;&#x722C;&#x866B;&#x3001;&#x81EA;&#x52A8;&#x5316;&#x6D4B;&#x8BD5;&#x7B49;&#xFF0C;&#x4F60;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x624B;&#x52A8;&#x5B8C;&#x6210;&#x7684;&#x5927;&#x591A;&#x6570;&#x4E8B;&#x60C5;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5B83;&#x6765;&#x5B8C;&#x6210;&#x3002;</p><p>&#x7AD9;&#x5185;&#x6709;&#x5F88;&#x591A;&#x6587;&#x7AE0;&#x4ECB;&#x7ECD;<code>Puppeteer</code>&#xFF0C;&#x6B64;&#x5904;&#x5C31;&#x4E0D;&#x518D;&#x4ECB;&#x7ECD;&#x3002;</p><h2>&#x4F46;&#x662F;</h2><p>&#x4F46;&#x662F;&#x65E0;&#x8BBA;&#x662F;&#x722C;&#x866B;&#x8FD8;&#x662F;&#x81EA;&#x52A8;&#x5316;&#x6D4B;&#x8BD5;&#xFF0C;&#x4F60;&#x8981;&#x5199;<code>Puppeteer</code>&#x811A;&#x672C;&#xFF0C;&#x9996;&#x5148;&#x4F60;&#x5F97;&#x5206;&#x6790;&#x7F51;&#x9875;&#xFF0C;&#x5E76;&#x4E14;&#x8BB2;&#x9053;&#x7406;&#xFF0C;&#x6BCF;&#x4E2A;&#x7F51;&#x7AD9;&#x8FD8;&#x90FD;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x5C31;&#x5F88;&#x5C34;&#x5C2C;&#x3002;</p><h2>Puppeteer Recorder</h2><p><a href="https://github.com/checkly/puppeteer-recorder" rel="nofollow noreferrer">Puppeteer Recorder</a> &#x662F;<code>Chrome</code>&#x6269;&#x5C55;&#x7A0B;&#x5E8F;&#xFF0C;&#x53EF;&#x8BB0;&#x5F55;&#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4EA4;&#x4E92;&#x5E76;&#x751F;&#x6210;<code>Puppeteer</code>&#x811A;&#x672C;&#x3002;</p><p>&#x4E0B;&#x56FE;&#x662F;&#x4EE5;<code>segmentfault</code>&#x70B9;&#x51FB;&#x6392;&#x884C;&#x699C;&#x4E0A;&#x7528;&#x6237;&#x52A0;&#x5173;&#x6CE8;&#x4E3A;&#x6817;&#x5B50;&#x5F55;&#x5236;&#x7684;&#x811A;&#x672C;&#x3002;&#x770B;&#x4E0A;&#x53BB;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x6709;&#x89C4;&#x5F8B;&#xFF0C;&#x5199;&#x5165;<code>cookie</code>&#x518D;&#x6539;&#x6210;<code>for</code>&#x5FAA;&#x73AF;&#xFF0C;&#x4E00;&#x4E2A;&#x81EA;&#x52A8;&#x52A0;&#x5173;&#x6CE8;&#x7684;&#x811A;&#x672C;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbfBou?w=364&amp;h=348" src="https://static.alili.tech/img/bVbfBou?w=364&amp;h=348" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h2><p>&#x76EE;&#x524D;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x8FD8;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x901A;&#x8FC7;&#x5206;&#x6790;&#x51E0;&#x79CD;<code>event</code>&#x751F;&#x6210;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x6837;&#x8FD8;&#x662F;&#x4F1A;&#x6709;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x95EE;&#x9898;&#x3002;<br>&#x6BD4;&#x5982;&#xFF0C;&#x6700;&#x540E;&#x5F97;&#x5230;<code>selector</code>&#x548C;&#x70B9;&#x51FB;&#x524D;&#x7684;<code>selector</code>&#x4E0D;&#x4E00;&#x81F4;&#x3002;<code>selector</code>&#x662F;<code>js</code>&#x811A;&#x672C;&#x52A8;&#x6001;&#x751F;&#x6210;&#xFF0C;&#x9700;&#x8981;<code>waitFor</code>&#x53BB;&#x7B49;&#x5F85;&#x7B49;&#x7B49;&#x3002;<br>&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x672C;&#x8EAB;&#x4E5F;&#x662F;&#x5F00;&#x53D1;&#x524D;&#x5206;&#x6790;&#x7F51;&#x9875;&#x751A;&#x81F3;<code>debug</code>&#x9700;&#x8981;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6539;&#x6210;&#x81EA;&#x52A8;&#x811A;&#x672C;&#x4ECD;&#x9700;&#x6CE8;&#x610F;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x4E3A;&#x90E8;&#x5206;&#x6E90;&#x7801;</p><pre><code> _parseEvents (events) {
    console.debug(`generating code for ${events.length} events`)
    let result = &apos;&apos;
    for (let event of events) {
      const { action, selector, value, href, keyCode } = event
      switch (action) {
        case &apos;keydown&apos;:
          result += this._handleKeyDown(selector, value, keyCode)
          break
        case &apos;click&apos;:
          result += this._handleClick(selector, href)
          break
        case &apos;goto*&apos;:
          result += `  await page.goto(&apos;${href}&apos;)\n`
          break
        case &apos;reload&apos;:
          result += `  await page.reload()\n`
          break
      }
    }
    return result
  }
  _handleKeyDown (selector, value, keyCode) {
    if (keyCode === 9) return `  await page.type(&apos;${selector}&apos;, &apos;${value}&apos;)\n`
    return &apos;&apos;
  }</code></pre><h2>&#x53C2;&#x8003;</h2><p><a href="https://github.com/GoogleChrome/puppeteer" rel="nofollow noreferrer">Puppeteer</a><br><a href="https://github.com/checkly/puppeteer-recorder" rel="nofollow noreferrer">Puppeteer Recorder</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
好用的 Puppeteer 辅助工具 Puppeteer Recorder

## 原文链接
[https://segmentfault.com/a/1190000016073329](https://segmentfault.com/a/1190000016073329)


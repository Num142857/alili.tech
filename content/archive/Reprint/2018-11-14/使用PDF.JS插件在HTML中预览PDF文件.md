---
title: 使用PDF.JS插件在HTML中预览PDF文件
hidden: true
categories: reprint
slug: 551503ea
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p>PDF.js&#x662F;&#x4E00;&#x6B3E;&#x57FA;&#x4E8E;HTML5&#x5EFA;&#x7ACB;&#x7684;PDF&#x9605;&#x8BFB;&#x5668;&#xFF0C;&#x517C;&#x5BB9;&#x5927;&#x90E8;&#x5206;&#x4E3B;&#x6D41;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#xFF0C;&#x4E5F;&#x76F8;&#x5BF9;&#x7B80;&#x5355;&#x3002;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><h1>1.&#x4E0B;&#x8F7D;PDF.js&#x63D2;&#x4EF6;</h1><p>&#x4E0B;&#x8F7D;&#x5730;&#x5740;&#xFF1A;<a href="http://mozilla.github.io/pdf.js/getting_started/#download" rel="nofollow noreferrer">http://mozilla.github.io/pdf....</a></p><h1>2.&#x6587;&#x4EF6;&#x90E8;&#x7F72;</h1><p>&#x5EFA;&#x65B0;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5C06;PDF.js&#x63D2;&#x4EF6;&#x6587;&#x4EF6;&#x653E;&#x5165;&#x65B0;&#x5EFA;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x3002;</p><h1>3.&#x65B0;&#x5EFA;index.html</h1><p>&#x5728;HTML&#x6587;&#x4EF6;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, maximum-scale=1&quot;&gt;
    &lt;meta name=&quot;google&quot; content=&quot;notranslate&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;title&gt;&#x300A;&#x4F7F;&#x7528;&#x6307;&#x5357;&#x300B;-&#x67E0;&#x6AAC;&#x8BFE;&#x4EF6;&lt;/title&gt;
    &lt;script&gt;
      function openFile () {
        var url = &quot;pdf.pdf&quot;;
        window.open(&quot;pdfjs/web/viewer.html?file=&quot; + url);
      }
    &lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;input type=&quot;button&quot; onclick=&quot;openFile()&quot; value=&quot;&#x6253;&#x5F00;&quot;&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre><h1>4.&#x5C06;pdf.pdf&#x6587;&#x4EF6;&#x653E;&#x5230;pdfjs/web/&#x4E0B;</h1><h1>5.&#x70B9;&#x51FB;&#x6D4F;&#x89C8;&#x5373;&#x53EF;&#x3002;</h1><p>&#x6CE8;&#x610F;&#xFF1A;&#x56E0;&#x4E3A;pdf.js&#x9700;&#x8981;&#x4F9D;&#x8D56;http,https&#x534F;&#x8BAE;&#x3002;&#x6240;&#x4EE5;&#x76F4;&#x63A5;&#x6D4F;&#x89C8;index&#x6253;&#x5F00;&#x62A5;&#x9519;&#x3002;&#x642D;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6216;&#x8005;&#x7528;idea&#x7684;&#x6D4F;&#x89C8;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用PDF.JS插件在HTML中预览PDF文件

## 原文链接
[https://segmentfault.com/a/1190000016183158](https://segmentfault.com/a/1190000016183158)


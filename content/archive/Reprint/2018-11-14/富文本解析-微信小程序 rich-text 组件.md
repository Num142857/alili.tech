---
title: 富文本解析-微信小程序 rich-text 组件
hidden: true
categories: [reprint]
slug: 7cf5aa8b
date: 2018-11-14 02:30:09
---

{{< raw >}}
<h3>&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x5BCC;&#x6587;&#x672C;&#x89E3;&#x6790;&#x5668;</h3><p>&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x5728;<a href="https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html" rel="nofollow noreferrer">rich-text&#x7EC4;&#x4EF6;</a>&#x540E;&#x5F00;&#x59CB;&#x652F;&#x6301;&#x5BCC;&#x6587;&#x672C;&#x89E3;&#x6790;&#xFF0C;&#x4F46;&#x9700;&#x8981;&#x5BF9;&#x7167;&#x4E00;&#x5957;&#x81EA;&#x5B9A;&#x4E49;&#x89C4;&#x5219;&#x7684; JOSN &#x6570;&#x636E;&#x683C;&#x5F0F;&#xFF0C;API &#x8FD4;&#x56DE;&#x7684;&#x5BCC;&#x6587;&#x672C;&#x9700;&#x8981;&#x524D;&#x7AEF;&#x505A;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x4E8E;&#x67D0;&#x4E9B;&#x9700;&#x8981; API &#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x5BCC;&#x6587;&#x672C;&#x7684;&#x5730;&#x65B9;&#x3002;&#x6BD4;&#x5982;&#x540E;&#x7AEF;&#x8F93;&#x51FA;title&#x5B57;&#x6BB5;, &#x4F46; title &#x5B57;&#x6BB5;&#x4E2D;&#x6709;&#x52A0;&#x91CD;&#x63D0;&#x793A;&#x7684;&#x51E0;&#x4E2A;&#x6587;&#x5B57;&#x662F;&#x9700;&#x8981;&#x6807;&#x7EA2;&#x7684;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x540E;&#x7AEF;&#x5982;&#x679C;&#x4E0D;&#x8FD4;&#x56DE;&#x5BCC;&#x6587;&#x672C;&#xFF0C;&#x524D;&#x7AEF;&#x53BB;&#x5728;&#x5C0F;&#x7A0B;&#x5E8F;&#x53BB;&#x5904;&#x7406;&#x662F;&#x6BD4;&#x8F83;&#x9EBB;&#x70E6;&#x7684;&#xFF0C;&#x8FD8;&#x5F97;&#x5B9A;&#x4E2A;&#x89C4;&#x5219;&#xFF0C;&#x524D;&#x7AEF;&#x518D;&#x5199;&#x597D;&#x6837;&#x5F0F;&#x62FC;&#x63A5;&#x8D77;&#x6765;&#x3002;&#x5982;&#x679C;&#x540E;&#x7AEF;&#x76F4;&#x63A5;&#x7ED9;&#x4F60;&#x8FD4;&#x56DE;&#x5BCC;&#x6587;&#x672C;&#xFF0C;&#x7528;&#x8FD9;&#x4E2A;&#x53BB;&#x89E3;&#x6790;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x641E;&#x5B9A;&#x3002;</p><p>&#x5982;&#x5B98;&#x7F51;&#x7ED9;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfZqe" src="https://static.alili.tech/img/bVbfZqe" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x5982;&#x4F55;&#x624D;&#x80FD;&#x5C06; HTML &#x8F6C;&#x4E3A;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x7EC4;&#x4EF6;&#x652F;&#x6301;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5462;&#xFF1F;</p><p><a href="https://github.com/Jxck/html2json" rel="nofollow noreferrer">html2json</a> &#x662F;&#x4E00;&#x4E2A;&#x5C06; HTML &#x89E3;&#x6790;&#x4E3A;&#x5BF9;&#x5E94;&#x7684; json &#x683C;&#x5F0F;&#x4F46; <a href="https://github.com/Jxck/html2json" rel="nofollow noreferrer">html2json</a> &#x5E93;&#x8F6C;&#x6362;&#x51FA;&#x6765;&#x7684; JSON &#x4E0E;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x8981;&#x6C42;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x4E14;&#x4E0D;&#x652F;&#x6301;&#x89E3;&#x6790; style&#xFF0C;&#x6545;&#x5728;&#x6B64;&#x5E93;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x505A;&#x7684;&#x4E86;&#x6269;&#x5C55;&#x4E0E;&#x8C03;&#x6574;&#x3002;</p><p>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p><pre><code class="js">import html2json from &apos;wxapp-rich-text&apos;;
// &#x6216;&#x8005;&#x4E0B;&#x8F7D;&#x8BE5;&#x4ED3;&#x5E93;
import html2json from &apos;./your/path/index.js&apos;;

const html =
  &apos;&lt;div id=&quot;this-id&quot; class=&quot;this-class&quot;&gt;sample&lt;br/&gt;text&lt;h2 style=&quot;color: red;font-size:48rpx;&quot;&gt;sample text&lt;/h2&gt;&lt;/div&gt;&apos;;

const json = html2json(html);

this.setData({
    nodes: json,
});
</code></pre><p>&#x6E90;&#x7801;&#x89C1;Github: <a href="https://github.com/treadpit/wxapp-rich-text" rel="nofollow noreferrer">https://github.com/treadpit/w...</a></p><p>&#x76EE;&#x524D;&#x53EA;&#x6D4B;&#x8BD5;&#x4E86;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/treadpit/wxapp-rich-text/master/screentshot/test.png" src="https://static.alili.techhttps://raw.githubusercontent.com/treadpit/wxapp-rich-text/master/screentshot/test.png" alt="" title=""></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
富文本解析-微信小程序 rich-text 组件

## 原文链接
[https://segmentfault.com/a/1190000016165112](https://segmentfault.com/a/1190000016165112)


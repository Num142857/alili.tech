---
title: 'encodeURI、encodeURIComponent、decodeURI、decodeURIComponent的区别' 
date: 2018-11-23 2:30:10
hidden: true
slug: zk23crw9jl
categories: [reprint]
---

{{< raw >}}
<p>&#x4E00;&#x3001;&#x8FD9;&#x56DB;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x7528;&#x5904;</p><p>1&#x3001;&#x7528;&#x6765;&#x7F16;&#x7801;&#x548C;&#x89E3;&#x7801;URI&#x7684;</p><p>&#x7EDF;&#x4E00;&#x8D44;&#x6E90;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x6216;&#x53EB;&#x505A; URI&#xFF0C;&#x662F;&#x7528;&#x6765;&#x6807;&#x8BC6;&#x4E92;&#x8054;&#x7F51;&#x4E0A;&#x7684;&#x8D44;&#x6E90;&#xFF08;&#x4F8B;&#x5982;&#xFF0C;&#x7F51;&#x9875;&#x6216;&#x6587;&#x4EF6;&#xFF09;&#x548C;&#x600E;&#x6837;&#x8BBF;&#x95EE;&#x8FD9;&#x4E9B;&#x8D44;&#x6E90;&#x7684;&#x4F20;&#x8F93;&#x534F;&#x8BAE;&#xFF08;&#x4F8B;&#x5982;&#xFF0C;HTTP &#x6216; FTP&#xFF09;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x9664;&#x4E86;encodeURI&#x3001;encodeURIComponent&#x3001;decodeURI&#x3001;decodeURIComponent&#x56DB;&#x4E2A;&#x7528;&#x6765;&#x7F16;&#x7801;&#x548C;&#x89E3;&#x7801; URI &#x7684;&#x51FD;&#x6570;&#x4E4B;&#x5916; ECMAScript &#x8BED;&#x8A00;&#x81EA;&#x8EAB;&#x4E0D;&#x63D0;&#x4F9B;&#x4EFB;&#x4F55;&#x4F7F;&#x7528; URL &#x7684;&#x652F;&#x6301;&#x3002;</p><p>2&#x3001;URI&#x7EC4;&#x6210;&#x5F62;&#x5F0F;<br>&#x4E00;&#x4E2A; URI &#x662F;&#x7531;&#x7EC4;&#x4EF6;&#x5206;&#x9694;&#x7B26;&#x5206;&#x5272;&#x7684;&#x7EC4;&#x4EF6;&#x5E8F;&#x5217;&#x7EC4;&#x6210;&#x3002;&#x5176;&#x4E00;&#x822C;&#x5F62;&#x5F0F;&#x662F;&#xFF1A;<br>Scheme : First / Second ; Third ? Fourth</p><p>&#x5176;&#x4E2D;&#x659C;&#x4F53;&#x7684;&#x540D;&#x5B57;&#x4EE3;&#x8868;&#x7EC4;&#x4EF6;&#xFF1B;&#x201C;:&#x201D;, &#x201C;/&#x201D;, &#x201C;;&#x201D;&#xFF0C;&#x201C;?&#x201D;&#x662F;&#x5F53;&#x4F5C;&#x5206;&#x9694;&#x7B26;&#x7684;&#x4FDD;&#x7559;&#x5B57;&#x7B26;&#x3002;</p><p>3&#x3001;&#x6709;&#x548C;&#x4E0D;&#x540C;&#xFF1F;</p><p>encodeURI &#x548C; decodeURI &#x51FD;&#x6570;&#x64CD;&#x4F5C;&#x7684;&#x662F;&#x5B8C;&#x6574;&#x7684; URI&#xFF1B;&#x8FD9;&#x4FE9;&#x51FD;&#x6570;&#x5047;&#x5B9A; URI &#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x4FDD;&#x7559;&#x5B57;&#x7B26;&#x90FD;&#x6709;&#x7279;&#x6B8A;&#x610F;&#x4E49;&#xFF0C;&#x6240;&#x6709;&#x4E0D;&#x4F1A;&#x7F16;&#x7801;&#x5B83;&#x4EEC;&#x3002;</p><p>encodeURIComponent &#x548C; decodeURIComponent &#x51FD;&#x6570;&#x64CD;&#x4F5C;&#x7684;&#x662F;&#x7EC4;&#x6210; URI &#x7684;&#x4E2A;&#x522B;&#x7EC4;&#x4EF6;&#xFF1B;&#x8FD9;&#x4FE9;&#x51FD;&#x6570;&#x5047;&#x5B9A;&#x4EFB;&#x4F55;&#x4FDD;&#x7559;&#x5B57;&#x7B26;&#x90FD;&#x4EE3;&#x8868;&#x666E;&#x901A;&#x6587;&#x672C;&#xFF0C;&#x6240;&#x4EE5;&#x5FC5;&#x987B;&#x7F16;&#x7801;&#x5B83;&#x4EEC;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x4EEC;&#xFF08;&#x4FDD;&#x7559;&#x5B57;&#x7B26;&#xFF09;&#x51FA;&#x73B0;&#x5728;&#x4E00;&#x4E2A;&#x5B8C;&#x6574; URI &#x7684;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x65F6;&#x4E0D;&#x4F1A;&#x88AB;&#x89E3;&#x91CA;&#x6210;&#x4FDD;&#x7559;&#x5B57;&#x7B26;&#x4E86;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x8BF4;&#x660E;&#x6458;&#x81EA;ECMAScript&#x6807;&#x51C6;&#xFF0C;&#x4E3A;&#x4E86;&#x5BB9;&#x6613;&#x8BFB;&#x61C2;&#x505A;&#x4E86;&#x70B9;&#x7F16;&#x8F91;&#x52A0;&#x5DE5;&#x3002;</p><p>4&#x3001;&#x56FE;&#x89E3;&#x56DB;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x4E0D;&#x540C;&#xFF1A;</p><p>ECMA&#x5BF9;&#x8FD9;&#x56DB;&#x4E2A;&#x51FD;&#x6570;&#x8FD8;&#x505A;&#x4E86;&#x8BE6;&#x7EC6;&#x89E3;&#x91CA;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x4E3A;&#x4E86;&#x5199;&#x7684;&#x66F4;&#x903B;&#x8F91;&#x5316;&#x4E00;&#x4E9B;&#xFF0C;&#x91C7;&#x7528;&#x4E86;&#x7C7B;&#x4F3C;&#x53D8;&#x91CF;&#x914D;&#x5408;&#x903B;&#x8F91;&#x7684;&#x5199;&#x6CD5;&#x6765;&#x8BF4;&#x660E;&#xFF0C;&#x4F46;&#x662F;&#x8BA9;&#x521D;&#x5B66;&#x8005;&#x770B;&#x5F97;&#x4E91;&#x91CC;&#x96FE;&#x91CC;&#x7684;&#x7279;&#x522B;&#x7ED5;&#xFF0C;&#x6240;&#x4EE5;&#x6709;&#x5FC5;&#x8981;&#x628A;&#x5B83;&#x5199;&#x5F97;&#x66F4;&#x50CF;&#x662F;&#x4EBA;&#x8BFB;&#x7684;&#x4E1C;&#x897F;&#x2026;&#x2026;</p><p><span class="img-wrap"><img data-src="/img/bV7x6u?w=800&amp;h=2380" src="https://static.alili.tech/img/bV7x6u?w=800&amp;h=2380" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
encodeURI、encodeURIComponent、decodeURI、decodeURIComponent的区别

## 原文链接
[https://segmentfault.com/a/1190000015612373](https://segmentfault.com/a/1190000015612373)


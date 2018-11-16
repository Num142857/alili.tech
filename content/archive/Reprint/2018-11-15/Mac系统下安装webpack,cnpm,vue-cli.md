---
title: 'Mac系统下安装webpack,cnpm,vue-cli'
hidden: true
categories: reprint
slug: f123d921
date: 2018-11-15 02:30:08
---

{{< raw >}}
<p>Mac&#x81EA;&#x5E26;&#x5B89;&#x88C5;&#x4E86;npm node&#xFF0C;&#x65E0;&#x9700;&#x81EA;&#x5DF1;&#x5B89;&#x88C5;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x7684;Mac&#x6CA1;&#x6709;&#x5B89;&#x88C5;node&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;node&#x5B98;&#x7F51;&#x4E0B;&#x8F7D;&#xFF0C;&#x4E0B;&#x8F7D;&#x94FE;&#x63A5;&#x4E3A;&#xFF1A;<br><a href="https://nodejs.org/en/download/" rel="nofollow noreferrer">node&#x4E0B;&#x8F7D;&#x5730;&#x5740;</a><br>&#x5B89;&#x88C5;&#x8FC7;&#x7A0B;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5B89;&#x88C5;&#x5B8C;&#x4E4B;&#x540E;&#x67E5;&#x770B;&#x7248;&#x672C;<br>node -v&#x3010;&#x67E5;&#x770B;node&#x7248;&#x672C;&#x3011;&#x3001;npm -v&#x3010;&#x67E5;&#x770B;npm&#x7248;&#x672C;&#x3011;<br><span class="img-wrap"><img data-src="/img/bVbfNze?w=1130&amp;h=722" src="https://static.alili.tech/img/bVbfNze?w=1130&amp;h=722" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x901A;&#x8FC7;npm&#x5B89;&#x88C5;webpack&#x4E86;&#xFF0C;&#x5728;&#x7EC8;&#x7AEF;&#x91CC;&#x8F93;&#x5165;&#xFF1A;</p><pre><code>npm install webpack -g</code></pre><p>&#x8FD9;&#x5728;Windows&#x4E0B;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x5728;Mac&#x4E0B;&#x5374;&#x62A5;&#x9519;&#x4E86;&#xFF0C;<br><span class="img-wrap"><img data-src="/img/bVbfNAp?w=1140&amp;h=644" src="https://static.alili.tech/img/bVbfNAp?w=1140&amp;h=644" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x539F;&#x56E0;&#x662F;&#xFF1A;&#x5728;mac&#x4E0B;&#x4F9D;&#x8D56;&#x5305;&#x8981;&#x5199;&#x5165;&#x7CFB;&#x7EDF;&#x91CD;&#x8981;&#x6587;&#x4EF6;&#x5939;&#x91CC;&#xFF0C;&#x7531;&#x4E8E;&#x6CA1;&#x6709;&#x5148;&#x83B7;&#x53D6;root&#x6743;&#x9650;&#x6240;&#x4EE5;&#x5199;&#x5165;&#x5931;&#x8D25;&#xFF0C;&#x5BFC;&#x81F4;&#x5B89;&#x88C5;&#x5931;&#x8D25;&#x3002;</p><p>&#x6240;&#x4EE5;&#x9700;&#x8981;&#x5148;&#x83B7;&#x53D6;root&#x6743;&#x9650;</p><pre><code>$ sudo -s</code></pre><p>&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x5C0F;&#x94A5;&#x5319; &#x8F93;&#x5165;&#x4F60;&#x7684;&#x5F00;&#x673A;&#x5BC6;&#x7801;<br><span class="img-wrap"><img data-src="/img/bVbfNBV?w=1136&amp;h=56" src="https://static.alili.tech/img/bVbfNBV?w=1136&amp;h=56" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x4E0B;&#x9762;&#x5C31;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x5B89;&#x88C5;webpack &#x4E86;</p><pre><code>npm install webpack -g</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfNCa?w=1148&amp;h=346" src="https://static.alili.tech/img/bVbfNCa?w=1148&amp;h=346" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x5B8C;&#x6210;&#x4E86;webpack&#x5B89;&#x88C5;&#xFF0C;<br>&#x7EE7;&#x7EED;&#x5B89;&#x88C5; vue&#x955C;&#x50CF;&#xFF0C;<br>cnpm&#x4E0E;&#x4E4B;&#x7C7B;&#x4F3C;<br><span class="img-wrap"><img data-src="/img/bVbfNCL?w=1108&amp;h=92" src="https://static.alili.tech/img/bVbfNCL?w=1108&amp;h=92" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><strong>&#x91CD;&#x70B9;&#x5C31;&#x662F;&#x8981; sudo -s &#x5207;&#x6362;&#x5230;root&#x73AF;&#x5883;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Mac系统下安装webpack,cnpm,vue-cli

## 原文链接
[https://segmentfault.com/a/1190000016119806](https://segmentfault.com/a/1190000016119806)


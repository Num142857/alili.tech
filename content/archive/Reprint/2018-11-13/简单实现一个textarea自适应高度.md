---
title: 简单实现一个textarea自适应高度
hidden: true
categories: reprint
slug: 9afa6a0d
date: 2018-11-13 02:30:09
---

{{< raw >}}
<p>textarea&#x81EA;&#x9002;&#x5E94;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x5F88;&#x591A;&#xFF0C;&#x539F;&#x7406;&#x5176;&#x5B9E;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF1A;&#x76D1;&#x542C;textarea&#x7684;input&#x6216;&#x8005;&#x952E;&#x76D8;&#x4E8B;&#x4EF6;&#xFF0C;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;scrollHeight,&#x91CD;&#x7F6E;textarea&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x3002;</p><p>&#x9884;&#x89C8;&#x5730;&#x5740;&#xFF1A;<a href="https://zhhshen.github.io/shell/vue/textarea.html" rel="nofollow noreferrer">textarea</a></p><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;textarea&#x6709;&#x4E2A;rows&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6539;&#x53D8;rows&#x7684;&#x503C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;textarea&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x81F3;&#x4E8E;&#x600E;&#x4E48;&#x6539;&#x53D8;&#x4E0D;&#x505A;&#x63A2;&#x7A76;, &#x6240;&#x4EE5;&#x601D;&#x8DEF;&#x5C31;&#x6765;&#x4E86;&#xFF1A;&#x5F53;&#x6587;&#x672C;&#x8F93;&#x5165;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x52A8;&#x6001;&#x7ED9;textarea&#x8D4B;&#x503C;rows, rows&#x81EA;&#x4F1A;&#x5BFC;&#x81F4;textarea&#x7684;&#x9AD8;&#x5EA6;&#x6539;&#x53D8;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x95EE;&#x9898;&#x5C31;&#x6765;&#x4E86;&#xFF0C;&#x5982;&#x4F55;&#x52A8;&#x6001;&#x83B7;&#x53D6;rows&#x7684;&#x503C;&#xFF1F;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E00;&#x4E0B;textarea&#x4E0E;rows, cols&#x4EE5;&#x53CA;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x7684;&#x5173;&#x7CFB;&#x662F;&#x600E;&#x6837;&#x7684;&#xFF1F;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5F20;&#x5927;&#x795E;&#x7684;&#x6587;&#x7AE0;<a href="https://www.zhangxinxu.com/wordpress/2016/02/html-textarea-rows-height/" rel="nofollow noreferrer">HTML textarea cols,rows&#x5C5E;&#x6027;&#x548C;&#x5BBD;&#x5EA6;&#x9AD8;&#x5EA6;&#x5173;&#x7CFB;&#x7814;&#x7A76;</a></p><p>&#x731C;&#x6D4B;&#x4F60;&#x5DF2;&#x7ECF;&#x770B;&#x5B8C;&#x4E86;&#xFF0C;&#x5927;&#x6982;&#x5F97;&#x51FA;&#x4E00;&#x4E2A;&#x7ED3;&#x8BBA;&#x5C31;&#x662F;&#xFF1A;textarea&#x9AD8;&#x5EA6; &#x2248; lineHeight * rows. &#x8FD9;&#x6837;&#x601D;&#x8DEF;&#x5C31;&#x66F4;&#x6E05;&#x6670;&#x4E86;&#x3002;&#x770B;&#x4EE3;&#x7801;</p><pre><code>resizeHeight(elem, style) {
  elem.removeAttribute(&apos;rows&apos;)
  elem.style.height = &apos;auto&apos;
  const { scrollHeight } = elem
  const { lineHeight, paddingTop, paddingBottom } = style
  let rowsNum = Math.round((scrollHeight - paddingTop - paddingBottom) / lineHeight)
  elem.setAttribute(&apos;rows&apos;, rowsNum)
},</code></pre><p>&#x539F;&#x7406;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x83B7;&#x53D6;&#x5230;&#x5143;&#x7D20;&#x7684;scrollHeight(&#x5373;&#x5143;&#x7D20;&#x771F;&#x5B9E;&#x9AD8;&#x5EA6;), &#x4E0E;&#x5143;&#x7D20;&#x7684;&#x884C;&#x9AD8;&#x6C42;&#x5546;&#xFF0C;&#x56DB;&#x820D;&#x4E94;&#x5165;&#x3002;&#x6709;&#x540C;&#x5B66;&#x8BF4;&#xFF0C;&#x76F4;&#x63A5;&#x628A;scrollHeight&#x8D4B;&#x503C;&#x7ED9;&#x5143;&#x7D20;&#x4E0D;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x8FD9;&#x4E48;&#x9EBB;&#x70E6;&#xFF0C;&#x8BF4;&#x7684;&#x597D;&#x6709;&#x9053;&#x7406;&#x3002;&#x662F;&#x4E0D;&#x662F;&#x8FD9;&#x6837;</p><pre><code>const { scrollHeight } = elem
elem.style.height = `${scrollHeight}px`</code></pre><p>&#x8C8C;&#x4F3C;&#x597D;&#x50CF;&#x4E5F;&#x884C;&#x5440;&#xFF0C;pc&#x7AD9;&#x597D;&#x50CF;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x8FC7;&#x7B14;&#x8005;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x6D4B;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x5220;&#x9664;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8C8C;&#x4F3C;&#x6709;&#x70B9;&#x5C0F;&#x95EE;&#x9898;&#x3002;&#x6362;&#x6210;&#x6539;&#x6210;&#x83B7;&#x53D6;rows&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><p>&#x5982;&#x679C;textarea&#x8BBE;&#x7F6E;padding&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x51CF;&#x53BB;&#x4E0A;&#x4E0B;padding&#x7684;&#x503C;&#xFF0C;&#x4EE3;&#x7801;&#x4E2D;&#x4E5F;&#x6709;&#x4F53;&#x73B0;&#x3002;</p><p>&#x6709;&#x95EE;&#x9898;&#x6B22;&#x8FCE;&#x4EA4;&#x6D41;&#xFF0C;&#x6700;&#x540E;&#x9644;&#x4E0A;&#x6E90;&#x7801;&#x3002;</p><p>&#x67E5;&#x770B;&#x6E90;&#x7801;&#xFF1A;<a href="https://github.com/zhhshen/shell/blob/master/vue/textarea.html" rel="nofollow noreferrer">&#x6E90;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单实现一个textarea自适应高度

## 原文链接
[https://segmentfault.com/a/1190000016234169](https://segmentfault.com/a/1190000016234169)


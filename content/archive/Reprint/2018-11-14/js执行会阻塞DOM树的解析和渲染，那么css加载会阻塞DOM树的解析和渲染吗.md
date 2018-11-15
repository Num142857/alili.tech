---
title: js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗
reprint: true
categories: reprint
abbrlink: fd13d65e
date: 2018-11-14 02:30:09
---

{{% raw %}}
<h2>&#x9884;&#x70ED;</h2><p>&#x4E3A;&#x4E86;&#x5B8C;&#x6210;&#x672C;&#x6B21;&#x6D4B;&#x8BD5;&#xFF0C;&#x5148;&#x6765;&#x79D1;&#x666E;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x4F55;&#x5229;&#x7528;chrome&#x6765;&#x8BBE;&#x7F6E;&#x4E0B;&#x8F7D;&#x901F;&#x5EA6;&#xFF08;&#x4F1A;&#x7528;&#x7684;&#x53EF;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#xFF09;<br>1.&#x6253;&#x5F00;chrome&#x63A7;&#x5236;&#x53F0;(&#x6309;&#x4E0B;F12),&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E0B;&#x56FE;&#xFF0C;&#x91CD;&#x70B9;&#x5728;&#x6211;&#x753B;&#x7EA2;&#x5708;&#x7684;&#x5730;&#x65B9;</p><p><span class="img-wrap"><img data-src="/img/bVbf3Oy?w=721&amp;h=266" src="https://static.alili.tech/img/bVbf3Oy?w=721&amp;h=266" alt="clipboard.png" title="clipboard.png"></span></p><p>2.&#x70B9;&#x51FB;&#x6211;&#x753B;&#x7EA2;&#x5708;&#x7684;&#x5730;&#x65B9;(No throttling),&#x4F1A;&#x770B;&#x5230;&#x4E0B;&#x56FE;,&#x6211;&#x4EEC;&#x9009;&#x62E9;GPRS&#x8FD9;&#x4E2A;&#x9009;&#x9879;</p><p><span class="img-wrap"><img data-src="/img/bVbf3OA?w=869&amp;h=426" src="https://static.alili.tech/img/bVbf3OA?w=869&amp;h=426" alt="clipboard.png" title="clipboard.png"></span><br>3.&#x8FD9;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x8D44;&#x6E90;&#x7684;&#x4E0B;&#x8F7D;&#x901F;&#x5EA6;&#x4E0A;&#x9650;&#x5C31;&#x4F1A;&#x88AB;&#x9650;&#x5236;&#x6210;20kb/s&#xFF0C;&#x597D;&#xFF0C;&#x90A3;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8FDB;&#x5165;&#x6211;&#x4EEC;&#x7684;&#x6B63;&#x9898;</p><h2>&#x6B63;&#x9898;</h2><p><strong>1.css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x7684;&#x89E3;&#x6790;&#x5417;&#xFF1F;</strong><br>&#x4EE3;&#x7801;&#x4E3E;&#x4F8B;&#xFF1A;</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;title&gt;css&#x963B;&#x585E;&lt;/title&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
    &lt;style&gt;
      h1 {
        color: red !important
      }
    &lt;/style&gt;
    &lt;script&gt;
      function h () {
        console.log(document.querySelectorAll(&apos;h1&apos;))
      }
      setTimeout(h, 0)
    &lt;/script&gt;
    &lt;link href=&quot;https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css&quot; rel=&quot;stylesheet&quot;&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;&#x8FD9;&#x662F;&#x7EA2;&#x8272;&#x7684;&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre><p>&#x5047;&#x8BBE;&#xFF1A; css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x89E3;&#x6790;&#x548C;&#x6E32;&#x67D3;</p><p>&#x5047;&#x8BBE;&#x7ED3;&#x679C;: &#x5728;bootstrap.css&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x5B8C;&#x4E4B;&#x524D;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x4E0D;&#x4F1A;&#x88AB;&#x89E3;&#x6790;&#x6E32;&#x67D3;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x4E00;&#x5F00;&#x59CB;&#x770B;&#x5230;&#x7684;&#x5E94;&#x8BE5;&#x662F;&#x767D;&#x5C4F;&#xFF0C;h1&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x51FA;&#x6765;&#x3002;&#x5E76;&#x4E14;&#x6B64;&#x65F6;console.log&#x7684;&#x7ED3;&#x679C;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;&#x3002;<br>&#x5B9E;&#x9645;&#x7ED3;&#x679C;:&#x5982;&#x4E0B;&#x56FE;</p><p><a href="https://images2015.cnblogs.com/blog/993343/201707/993343-20170706155150409-142206220.gif" rel="nofollow noreferrer">3.gif</a><br>&#x7531;&#x4E0A;&#x56FE;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5F53;css&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x7684;&#x65F6;&#x5019;&#xFF0C;h1&#x5E76;&#x6CA1;&#x6709;&#x663E;&#x793A;&#xFF0C;&#x4F46;&#x662F;&#x6B64;&#x65F6;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x5982;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/bVbf3ON?w=635&amp;h=72" src="https://static.alili.tech/img/bVbf3ON?w=635&amp;h=72" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x53EF;&#x4EE5;&#x5F97;&#x77E5;&#xFF0C;&#x6B64;&#x65F6;DOM&#x6811;&#x81F3;&#x5C11;&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#x5230;&#x4E86;h1&#x90A3;&#x91CC;&#xFF0C;&#x800C;&#x6B64;&#x65F6;css&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#xFF0C;&#x4E5F;&#x5C31;&#x8BF4;&#x660E;&#xFF0C;<strong>css&#x5E76;&#x4E0D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x7684;&#x89E3;&#x6790;</strong>&#x3002;</p><p><strong>2.css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x7684;&#x6E32;&#x67D3;&#x5417;&#xFF1F;</strong><br>&#x7531;&#x4E0A;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5F53;css&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x51FA;&#x6765;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9875;&#x9762;&#x663E;&#x793A;&#x767D;&#x5C4F;&#xFF0C;&#x76F4;&#x5230;css&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x7EA2;&#x8272;&#x5B57;&#x4F53;&#x624D;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x867D;&#x7136;&#x89E3;&#x6790;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5E76;&#x6CA1;&#x6709;&#x88AB;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x3002;&#x6240;&#x4EE5;&#xFF0C;<strong>css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x6E32;&#x67D3;&#x3002;</strong>&#x6548;&#x679C;&#x89C1;&#x4E0B;&#x56FE;</p><p><a href="https://images2015.cnblogs.com/blog/993343/201707/993343-20170706155339894-924031517.gif" rel="nofollow noreferrer">5.gif</a></p><p><strong>&#x4E2A;&#x4EBA;&#x5BF9;&#x8FD9;&#x79CD;&#x673A;&#x5236;&#x7684;&#x8BC4;&#x4EF7;</strong></p><ul><li>&#x5176;&#x5B9E;&#x6211;&#x89C9;&#x5F97;&#xFF0C;&#x8FD9;&#x53EF;&#x80FD;&#x4E5F;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E00;&#x79CD;&#x4F18;&#x5316;&#x673A;&#x5236;&#x3002;&#x56E0;&#x4E3A;&#x4F60;&#x52A0;&#x8F7D;css&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x4FEE;&#x6539;&#x4E0B;&#x9762;DOM&#x8282;&#x70B9;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x5982;&#x679C;css&#x52A0;&#x8F7D;&#x4E0D;&#x963B;&#x585E;DOM&#x6811;&#x6E32;&#x67D3;&#x7684;&#x8BDD;&#xFF0C;&#x90A3;&#x4E48;&#x5F53;css&#x52A0;&#x8F7D;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;DOM&#x6811;&#x53EF;&#x80FD;&#x53C8;&#x5F97;&#x91CD;&#x65B0;&#x91CD;&#x7ED8;&#x6216;&#x8005;&#x56DE;&#x6D41;&#x4E86;&#xFF0C;&#x8FD9;&#x5C31;&#x9020;&#x6210;&#x4E86;&#x4E00;&#x4E9B;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x7684;&#x635F;&#x8017;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x5E72;&#x8106;&#x5C31;&#x5148;&#x628A;DOM&#x6811;&#x7684;&#x7ED3;&#x6784;&#x5148;&#x89E3;&#x6790;&#x5B8C;&#xFF0C;&#x628A;&#x53EF;&#x4EE5;&#x505A;&#x7684;&#x5DE5;&#x4F5C;&#x505A;&#x5B8C;&#xFF0C;&#x7136;&#x540E;&#x7B49;&#x4F60;css&#x52A0;&#x8F7D;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x5728;&#x6839;&#x636E;&#x6700;&#x7EC8;&#x7684;&#x6837;&#x5F0F;&#x6765;&#x6E32;&#x67D3;DOM&#x6811;&#xFF0C;&#x8FD9;&#x79CD;&#x505A;&#x6CD5;&#x6027;&#x80FD;&#x65B9;&#x9762;&#x786E;&#x5B9E;&#x4F1A;&#x6BD4;&#x8F83;&#x597D;&#x4E00;&#x70B9;&#x3002;</li></ul><p><strong>3.css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;js&#x8FD0;&#x884C;&#x5417;&#xFF1F;</strong></p><p>&#x200B; &#x7531;&#x4E0A;&#x9762;&#x7684;&#x63A8;&#x8BBA;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#xFF0C;css&#x52A0;&#x8F7D;&#x4E0D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x89E3;&#x6790;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x6E32;&#x67D3;&#x3002;&#x90A3;&#x4E48;&#xFF0C;css&#x52A0;&#x8F7D;&#x4F1A;&#x4E0D;&#x4F1A;&#x963B;&#x585E;js&#x6267;&#x884C;&#x5462;?</p><p>&#x540C;&#x6837;&#xFF0C;&#x901A;&#x8FC7;&#x4EE3;&#x7801;&#x6765;&#x9A8C;&#x8BC1;.</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;title&gt;css&#x963B;&#x585E;&lt;/title&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
    &lt;script&gt;
      console.log(&apos;before css&apos;)
      var startDate = new Date()
    &lt;/script&gt;
    &lt;link href=&quot;https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css&quot; rel=&quot;stylesheet&quot;&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;&#x8FD9;&#x662F;&#x7EA2;&#x8272;&#x7684;&lt;/h1&gt;
    &lt;script&gt;
      var endDate = new Date()
      console.log(&apos;after css&apos;)
      console.log(&apos;&#x7ECF;&#x8FC7;&#x4E86;&apos; + (endDate -startDate) + &apos;ms&apos;)
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre><p>&#x5047;&#x8BBE;: css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;&#x540E;&#x9762;&#x7684;js&#x8FD0;&#x884C;</p><p>&#x9884;&#x671F;&#x7ED3;&#x679C;: &#x5728;link&#x540E;&#x9762;&#x7684;js&#x4EE3;&#x7801;&#xFF0C;&#x5E94;&#x8BE5;&#x8981;&#x5728;css&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#x624D;&#x4F1A;&#x8FD0;&#x884C;<br>&#x5B9E;&#x9645;&#x7ED3;&#x679C;:</p><p><a href="https://images2015.cnblogs.com/blog/993343/201707/993343-20170706155406487-347515221.gif" rel="nofollow noreferrer">6.gif</a></p><p>&#x7531;&#x4E0A;&#x56FE;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x4F4D;&#x4E8E;css&#x52A0;&#x8F7D;&#x8BED;&#x53E5;&#x524D;&#x7684;&#x90A3;&#x4E2A;js&#x4EE3;&#x7801;&#x5148;&#x6267;&#x884C;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4F4D;&#x4E8E;css&#x52A0;&#x8F7D;&#x8BED;&#x53E5;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x8FDF;&#x8FDF;&#x6CA1;&#x6709;&#x6267;&#x884C;&#xFF0C;&#x76F4;&#x5230;css&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5B83;&#x624D;&#x6267;&#x884C;&#x3002;&#x8FD9;&#x4E5F;&#x5C31;&#x8BF4;&#x660E;&#x4E86;&#xFF0C;css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;&#x540E;&#x9762;&#x7684;js&#x8BED;&#x53E5;&#x7684;&#x6267;&#x884C;&#x3002;&#x8BE6;&#x7EC6;&#x7ED3;&#x679C;&#x770B;&#x4E0B;&#x56FE;(css&#x52A0;&#x8F7D;&#x7528;&#x4E86;5600+ms):</p><p><span class="img-wrap"><img data-src="/img/bVbf3O2?w=705&amp;h=152" src="https://static.alili.tech/img/bVbf3O2?w=705&amp;h=152" alt="clipboard.png" title="clipboard.png"></span><br>.png](/img/bVbf3O2)</p><p><strong>&#x7ED3;&#x8BBA;</strong><br>&#x7531;&#x4E0A;&#x6240;&#x8FF0;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#x4EE5;&#x4E0B;&#x7ED3;&#x8BBA;:</p><ul><li>1.css&#x52A0;&#x8F7D;&#x4E0D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x7684;&#x89E3;&#x6790;</li><li>2css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;DOM&#x6811;&#x7684;&#x6E32;&#x67D3;</li><li>3css&#x52A0;&#x8F7D;&#x4F1A;&#x963B;&#x585E;&#x540E;&#x9762;js&#x8BED;&#x53E5;&#x7684;&#x6267;&#x884C;&#x3001;</li></ul><p>&#x56E0;&#x6B64;&#xFF0C;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x8BA9;&#x7528;&#x6237;&#x770B;&#x5230;&#x957F;&#x65F6;&#x95F4;&#x7684;&#x767D;&#x5C4F;&#x65F6;&#x95F4;&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x63D0;&#x9AD8;css&#x52A0;&#x8F7D;&#x901F;&#x5EA6;</p><p>&#x6B22;&#x8FCE;&#x641C;&#x7D22;&#x516C;&#x4F17;&#x53F7;&#xFF1A;<strong>&#x4E00;&#x7EBF;&#x7801;&#x519C;</strong><br>&#x6216;&#x626B;&#x7801;&#x52A0;&#x5165;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbf4bC?w=258&amp;h=258" src="https://static.alili.tech/img/bVbf4bC?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗

## 原文链接
[https://segmentfault.com/a/1190000016181785](https://segmentfault.com/a/1190000016181785)


---
title: JavaScript fetch接口
hidden: true
categories: [reprint]
slug: 6808d2da
date: 2018-11-14 02:30:09
---

{{< raw >}}
<h1>JavaScript fetch&#x63A5;&#x53E3;</h1><p>&#x5982;&#x679C;&#x770B;&#x7F51;&#x4E0A;&#x7684;fetch&#x6559;&#x7A0B;&#xFF0C;&#x4F1A;&#x9996;&#x5148;&#x5BF9;&#x6BD4;XMLHttpRequest&#x548C;fetch&#x7684;&#x4F18;&#x52A3;&#xFF0C;&#x7136;&#x540E;&#x5F15;&#x51FA;&#x4E00;&#x5806;&#x770B;&#x4E86;&#x5F88;&#x5FEB;&#x4F1A;&#x5FD8;&#x8BB0;&#x7684;&#x5185;&#x5BB9;(&#x672C;&#x4EBA;&#x8BB0;&#x6027;&#x4E0D;&#x597D;)&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x5199;&#x4E00;&#x7BC7;&#x5173;&#x4E8E;fetch&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x4E3A;&#x4E86;&#x81EA;&#x5DF1;&#x770B;&#x7740;&#x65B9;&#x4FBF;&#xFF0C;&#x6BD5;&#x7ADF;&#x5DE5;&#x4F5C;&#x4E2D;&#x7528;&#x5230;&#x7684;&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x5F88;&#x57FA;&#x7840;&#x7684;&#x70B9;&#x800C;&#x5DF2;&#x3002;</p><p>fetch&#xFF0C;&#x8BF4;&#x767D;&#x4E86;&#xFF0C;&#x5C31;&#x662F;XMLHttpRequest&#x7684;&#x4E00;&#x79CD;&#x66FF;&#x4EE3;&#x65B9;&#x6848;&#x3002;&#x5982;&#x679C;&#x6709;&#x4EBA;&#x95EE;&#x4F60;&#xFF0C;&#x9664;&#x4E86;Ajax&#x83B7;&#x53D6;&#x540E;&#x53F0;&#x6570;&#x636E;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x66FF;&#x4EE3;&#x65B9;&#x6848;&#xFF1F;</p><p>&#x8FD9;&#x662F;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x56DE;&#x7B54;&#xFF0C;<strong>&#x9664;&#x4E86;XMLHttpRequest&#x5BF9;&#x8C61;&#x6765;&#x83B7;&#x53D6;&#x540E;&#x53F0;&#x7684;&#x6570;&#x636E;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x79CD;&#x66F4;&#x4F18;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;fetch&#x3002;</strong></p><h2>fetch&#x7684;&#x6848;&#x4F8B;</h2><h3>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x5199;&#x7B2C;&#x4E00;&#x4E2A;fetch&#x83B7;&#x53D6;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</h3><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html&apos;) // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;
  .then((res)=&gt;{
    return res.text() // res.text()&#x662F;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;
  })
  .then((res)=&gt;{
    console.log(res) // res&#x662F;&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;
  })
</code></pre><h2>GET&#x8BF7;&#x6C42;</h2><h3>GET&#x8BF7;&#x6C42;&#x521D;&#x6B65;</h3><p>&#x5B8C;&#x6210;&#x4E86;helloworld&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x8981;&#x6765;&#x8BA4;&#x8BC6;&#x4E00;&#x4E0B;GET&#x8BF7;&#x6C42;&#x5982;&#x4F55;&#x5904;&#x7406;&#x4E86;&#x3002;</p><p>&#x4E0A;&#x9762;&#x7684;helloworld&#x4E2D;&#x8FD9;&#x662F;&#x4F7F;&#x7528;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5176;&#x5B9E;fetch&#x8FD8;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x7528;&#x6765;&#x4F20;&#x9012;&#x4E00;&#x4E9B;&#x521D;&#x59CB;&#x5316;&#x7684;&#x4FE1;&#x606F;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x5982;&#x679C;&#x8981;&#x7279;&#x522B;&#x6307;&#x660E;&#x662F;GET&#x8BF7;&#x6C42;&#xFF0C;&#x5C31;&#x8981;&#x5199;&#x6210;&#x4E0B;&#x9762;&#x7684;&#x5F62;&#x5F0F;&#xFF1A;</p><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html&apos;, {
    method: &apos;GET&apos;
  })
  .then((res)=&gt;{
    return res.text()
  })
  .then((res)=&gt;{
    console.log(res)
  })</code></pre><h3>GET&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#x4F20;&#x9012;</h3><p>GET&#x8BF7;&#x6C42;&#x4E2D;&#x5982;&#x679C;&#x9700;&#x8981;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x80FD;&#x628A;&#x53C2;&#x6570;&#x5199;&#x5728;URL&#x4E0A;&#x6765;&#x8FDB;&#x884C;&#x4F20;&#x9012;&#x4E86;&#x3002;</p><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html?a=1&amp;b=2&apos;, { // &#x5728;URL&#x4E2D;&#x5199;&#x4E0A;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;
    method: &apos;GET&apos;
  })
  .then((res)=&gt;{
    return res.text()
  })
  .then((res)=&gt;{
    console.log(res)
  })</code></pre><h2>POST&#x8BF7;&#x6C42;</h2><p>&#x4E0E;GET&#x8BF7;&#x6C42;&#x7C7B;&#x4F3C;&#xFF0C;POST&#x8BF7;&#x6C42;&#x7684;&#x6307;&#x5B9A;&#x4E5F;&#x662F;&#x5728;fetch&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#xFF1A;</p><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html&apos;, {
    method: &apos;POST&apos; // &#x6307;&#x5B9A;&#x662F;POST&#x8BF7;&#x6C42;
  })
  .then((res)=&gt;{
    return res.text()
  })
  .then((res)=&gt;{
    console.log(res)
  })</code></pre><h3>POST&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x7684;&#x4F20;&#x9012;</h3><p>&#x4F17;&#x6240;&#x5468;&#x77E5;&#xFF0C;POST&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x5B9A;&#x4E0D;&#x80FD;&#x653E;&#x5728;URL&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x76EE;&#x7684;&#x662F;&#x9632;&#x6B62;&#x4FE1;&#x606F;&#x6CC4;&#x9732;&#x3002;</p><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html&apos;, {
    method: &apos;POST&apos;,
    body: new URLSearchParams([[&quot;foo&quot;, 1],[&quot;bar&quot;, 2]]).toString() // &#x8FD9;&#x91CC;&#x662F;&#x8BF7;&#x6C42;&#x5BF9;&#x8C61;
  })
  .then((res)=&gt;{
    return res.text()
  })
  .then((res)=&gt;{
    console.log(res)
  })</code></pre><h3>&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x7684;&#x5934;&#x4FE1;&#x606F;</h3><p>&#x5728;POST&#x63D0;&#x4EA4;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#xFF0C;&#x53EF;&#x662F;&#xFF0C;&#x7ECF;&#x8FC7;&#x67E5;&#x8BE2;&#xFF0C;&#x53D1;&#x73B0;&#x9ED8;&#x8BA4;&#x7684;&#x63D0;&#x4EA4;&#x65B9;&#x5F0F;&#x662F;&#xFF1A;Content-Type:text/plain;charset=UTF-8&#xFF0C;&#x8FD9;&#x4E2A;&#x663E;&#x7136;&#x662F;&#x4E0D;&#x5408;&#x7406;&#x7684;&#x3002;&#x4E0B;&#x9762;&#x54B1;&#x4EEC;&#x5B66;&#x4E60;&#x4E00;&#x4E0B;&#xFF0C;&#x6307;&#x5B9A;&#x5934;&#x4FE1;&#x606F;&#xFF1A;</p><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html&apos;, {
    method: &apos;POST&apos;,
    headers: new Headers({
      &apos;Content-Type&apos;: &apos;application/x-www-form-urlencoded&apos; // &#x6307;&#x5B9A;&#x63D0;&#x4EA4;&#x65B9;&#x5F0F;&#x4E3A;&#x8868;&#x5355;&#x63D0;&#x4EA4;
    }),
    body: new URLSearchParams([[&quot;foo&quot;, 1],[&quot;bar&quot;, 2]]).toString()
  })
  .then((res)=&gt;{
    return res.text()
  })
  .then((res)=&gt;{
    console.log(res)
  })</code></pre><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x5728;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x7684;Network&#x4E2D;&#x67E5;&#x8BE2;&#xFF0C;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x8BF7;&#x6C42;&#x65B9;&#x5F0F;&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;content-type:application/x-www-form-urlencoded&#x3002;</p><h2>&#x901A;&#x8FC7;&#x63A5;&#x53E3;&#x5F97;&#x5230;JSON&#x6570;&#x636E;</h2><p>&#x4E0A;&#x9762;&#x6240;&#x6709;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#x90FD;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6587;&#x672C;&#xFF0C;&#x90A3;&#x4E48;&#x9664;&#x4E86;&#x6587;&#x672C;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5462;&#xFF1F;&#x80AF;&#x5B9A;&#x662F;&#x6709;&#x7684;&#xFF0C;&#x5177;&#x4F53;&#x67E5;&#x8BE2;&#x5730;&#x5740;&#xFF1A;Body&#x7684;&#x7C7B;&#x578B;</p><p>&#x7531;&#x4E8E;&#x6700;&#x5E38;&#x7528;&#x7684;&#x662F;JSON&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x4E48;&#x4E0B;&#x9762;&#x5C31;&#x7B80;&#x5355;&#x6F14;&#x793A;&#x4E00;&#x4E0B;&#x83B7;&#x53D6;JSON&#x6570;&#x636E;&#x7684;&#x65B9;&#x5F0F;&#xFF1A;</p><pre><code>fetch(&apos;https://www.baidu.com/rec?platform=wise&amp;ms=1&amp;rset=rcmd&amp;word=123&amp;qid=11327900426705455986&amp;rq=123&amp;from=844b&amp;baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&amp;tn=&amp;clientWidth=375&amp;t=1506826017369&amp;r=8255&apos;, { // &#x5728;URL&#x4E2D;&#x5199;&#x4E0A;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;
    method: &apos;GET&apos;,
    headers: new Headers({
      &apos;Accept&apos;: &apos;application/json&apos; // &#x901A;&#x8FC7;&#x5934;&#x6307;&#x5B9A;&#xFF0C;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;JSON
    })
  })
  .then((res)=&gt;{
    return res.json() // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x53EF;&#x4EE5;&#x89E3;&#x6790;&#x6210;JSON
  })
  .then((res)=&gt;{
    console.log(res) // &#x83B7;&#x53D6;JSON&#x6570;&#x636E;
  })</code></pre><h2>&#x5F3A;&#x5236;&#x5E26;Cookie</h2><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;, fetch &#x4E0D;&#x4F1A;&#x4ECE;&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;&#x6216;&#x63A5;&#x6536;&#x4EFB;&#x4F55; cookies, &#x5982;&#x679C;&#x7AD9;&#x70B9;&#x4F9D;&#x8D56;&#x4E8E;&#x7EF4;&#x62A4;&#x4E00;&#x4E2A;&#x7528;&#x6237;&#x4F1A;&#x8BDD;&#xFF0C;&#x5219;&#x5BFC;&#x81F4;&#x672A;&#x7ECF;&#x8BA4;&#x8BC1;&#x7684;&#x8BF7;&#x6C42;(&#x8981;&#x53D1;&#x9001; cookies&#xFF0C;&#x5FC5;&#x987B;&#x53D1;&#x9001;&#x51ED;&#x636E;&#x5934;).</p><pre><code>// &#x901A;&#x8FC7;fetch&#x83B7;&#x53D6;&#x767E;&#x5EA6;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9875;&#x9762;
fetch(&apos;https://www.baidu.com/search/error.html&apos;, {
    method: &apos;GET&apos;,
    credentials: &apos;include&apos; // &#x5F3A;&#x5236;&#x52A0;&#x5165;&#x51ED;&#x636E;&#x5934;
  })
  .then((res)=&gt;{
    return res.text()
  })
  .then((res)=&gt;{
    console.log(res)
  })</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript fetch接口

## 原文链接
[https://segmentfault.com/a/1190000016196262](https://segmentfault.com/a/1190000016196262)


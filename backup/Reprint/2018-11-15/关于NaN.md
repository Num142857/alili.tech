---
title: '关于NaN' 
date: 2018-11-15 21:20:48
hidden: true
slug: q4wi11x3l5k
categories: [reprint]
---

{{< raw >}}
<p>&#x6628;&#x5929;&#x770B;&#x5230;&#x4E00;&#x4E2A;&#x9762;&#x8BD5;&#x9898;&#xFF1A;&#x600E;&#x6837;&#x5B9E;&#x73B0; <code>isNaN()</code> &#x65B9;&#x6CD5;&#xFF1F;</p><p>&#x7EC6;&#x7EC6;&#x7814;&#x7A76;&#x4E86;&#x4E00;&#x4E0B; <code>NaN</code>&#xFF0C;&#x53D1;&#x73B0;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x4E0D;&#x5E38;&#x7528;&#xFF0C;&#x5751;&#x5374;&#x5F02;&#x5E38;&#x591A;&#xFF0C;&#x9887;&#x6709; &#x201C;&#x8334;&#x201D; &#x5B57;&#x6709;&#x51E0;&#x79CD;&#x5199;&#x6CD5;&#x7684;&#x611F;&#x89C9;&#xFF0C;&#x8FD9;&#x91CC;&#x8BB0;&#x5F55;&#x4E0B;&#x603B;&#x7ED3;&#x7684;&#x4E1C;&#x897F;&#x5427;&#x3002;</p><h2><code>NaN</code> &#x662F;&#x4EC0;&#x4E48;</h2><p><code>NaN</code> &#x5373; <b>Not a Number</b>(&#x975E;&#x6570;&#x503C;)&#xFF0C;&#x4F46;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x6570;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#xFF1A;</p><pre><code>typeof(NaN)  // &quot;number&quot;</code></pre><p>&#x7F16;&#x7801;&#x65F6;&#x5F88;&#x5C11;&#x76F4;&#x63A5;&#x4F7F;&#x7528; <code>NaN</code>&#xFF0C;&#x901A;&#x5E38;&#x662F;&#x5728;&#x8BA1;&#x7B97;&#x5931;&#x8D25;&#x65F6;&#xFF0C;&#x4F5C;&#x4E3A; <code>Math</code> &#x7684;&#x67D0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x51FA;&#x73B0;&#x7684;&#x3002;</p><p>&#x5B83;&#x6709;&#x4E24;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x6027;&#x8D28;&#xFF1A;</p><ul><li><code>NaN</code>&#x4E0E;&#x4EFB;&#x4F55;&#x503C;&#x90FD;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x5305;&#x62EC;<code>NaN</code>&#x81EA;&#x8EAB;&#xFF1A;</li></ul><pre><code>alert(NaN == NaN)  // false
alert(NaN === NaN)  // false</code></pre><ul><li>&#x4EFB;&#x4F55;&#x6D89;&#x53CA; <code>NaN</code>&#x7684;&#x64CD;&#x4F5C;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;<code>NaN</code>&#x3002;</li></ul><h3>&#x54EA;&#x4E9B;&#x60C5;&#x51B5;&#x4F1A;&#x4EA7;&#x751F;<code>NaN</code>?</h3><h4>1. &#x8BA1;&#x7B97;</h4><p>JS &#x5728;&#x8FDB;&#x884C;&#x52A0;&#x51CF;&#x4E58;&#x9664;&#x8FD0;&#x7B97;&#x4E4B;&#x524D;&#xFF0C;&#x4F1A;&#x5148;&#x8C03;&#x7528; <code>Number()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x975E;&#x6570;&#x503C;&#x7684;&#x8FD0;&#x7B97;&#x9879;&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x8F6C;&#x6362;&#x5931;&#x8D25;&#x5C31;&#x8FD4;&#x56DE;<code>NaN</code>&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><pre><code>1-&apos;a&apos;;   // NaN</code></pre><p>&#x9996;&#x5148;&#x662F;&#x6267;&#x884C;<code>Number(&apos;a&apos;)</code>&#xFF0C;&#x4E0D;&#x80FD;&#x6210;&#x529F;&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;<code>NaN</code>&#xFF0C;&#x518D;&#x5229;&#x7528;<code>NaN</code>&#x7684;&#x7B2C;&#x4E8C;&#x6761;&#x6027;&#x8D28;&#xFF1A;&#x4EFB;&#x4F55;&#x6D89;&#x53CA; <code>NaN</code>&#x7684;&#x64CD;&#x4F5C;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;<code>NaN</code>&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;&#x662F;<code>NaN</code>&#x3002;</p><h4>2. &#x7C7B;&#x578B;&#x8F6C;&#x6362;</h4><p>&#x5F53;&#x4E00;&#x4E2A;&#x503C;&#x4E0D;&#x80FD;&#x88AB;<code>Number</code>&#xFF0C;<code>parseInt</code>&#xFF0C;<code>parseFloat</code>&#x6210;&#x529F;&#x8F6C;&#x6362;&#x4E3A;&#x6570;&#x503C;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;<code>NaN</code>&#xFF0C;&#x4E3E;&#x4F8B;&#xFF1A;</p><pre><code>Number(&apos;123.456abc&apos;);   // NaN
parseInt(&apos;123.456abc&apos;);  // 123
parseFloat(&apos;123.456abc&apos;); // 123.456

Number(&apos;abc&apos;);  // NaN
parseInt(&apos;abc&apos;);  // NaN
parseFloat(&apos;abc&apos;);  // NaN

Number([]);  // 0
parseInt([]);  // NaN
parseFloat([]);  // NaN

Number(&apos;&apos;);  // 0
parseInt(&apos;&apos;);  // NaN
parseFloat(&apos;&apos;);  // NaN

Number({});  // NaN
parseInt({});  // NaN
parseFloat({});  // NaN</code></pre><p>&#x8FD9;&#x91CC;&#x8981;&#x6CE8;&#x610F;&#x4E09;&#x8005;&#x4E4B;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x6211;&#x7684;&#x7406;&#x89E3;&#x662F; <code>parseInt</code>&#xFF0C;<code>parseFloat</code>&#x4F1A;&#x5C3D;&#x91CF;&#x5C06;&#x53C2;&#x6570;&#x503C;&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x503C;&#x3002;</p><h2>&#x5173;&#x4E8E;<code>isNaN()</code></h2><p><code>isNaN</code>&#x662F;<code>window</code>&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x8F83;&#x8BE1;&#x5F02;&#x7684;&#x662F;&#xFF1A;<code>isNaN(x)</code>&#x5E76;&#x4E0D;&#x662F;&#x5224;&#x65AD;&#x53C2;&#x6570;<code>x</code>&#x672C;&#x8EAB;&#x662F;&#x4E0D;&#x662F;<code>NaN</code>&#xFF0C;&#x800C;&#x662F;&#x5224;&#x65AD;<code>Number(x)</code>&#x662F;&#x4E0D;&#x662F;<code>NaN</code>&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5148;&#x7528;<code>Number()</code>&#x53BB;&#x8F6C;&#x5316;&#x53C2;&#x6570;&#xFF0C;&#x518D;&#x53BB;&#x5224;&#x65AD;&#x8F6C;&#x5316;&#x7684;&#x7ED3;&#x679C;&#x3002;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#x3002;</p><pre><code>isNaN(NaN);  // true
isNaN(123);  // false
isNaN(&apos;abc&apos;);  //true
isNaN(&apos;123abc&apos;); //true

isNaN({});  // true&#xFF0C;&#x56E0;&#x4E3A;Number({})=NaN
isNaN(&apos;&apos;);  // false, &#x56E0;&#x4E3A;Number(&apos;&apos;)=0
isNaN([]);  // false&#xFF0C;&#x56E0;&#x4E3A;Number([])=0</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6700;&#x540E;, &#x7A7A;&#x5B57;&#x7B26;&#x4E32;<code>&apos;&apos;</code> &#x548C; &#x7A7A;&#x6570;&#x7EC4;<code>[]</code>&#x663E;&#x7136;&#x662F;&#x975E;&#x6570;&#x503C;&#xFF0C;&#x800C;<code>isNaN</code>&#x8FD4;&#x56DE;&#x4E86;<code>false</code>&#xFF0C;&#x539F;&#x56E0;&#x5C31;&#x662F;<code>Number</code>&#x8F6C;&#x6362;&#x5728;&#x4F5C;&#x602A;&#xFF0C;&#x8FD9;&#x70B9;&#x8FD8;&#x662F;&#x5F88;&#x8BE1;&#x5F02;&#x7684;...&#x6240;&#x4EE5;&#x6211;&#x9009;&#x62E9;&#x614E;&#x7528;...</p><p>&#x90A3;&#x4E48;<code>isNaN</code>&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF0C;&#x539F;&#x7406;&#x5C31;&#x662F;&#x5229;&#x7528;<code>NaN</code>&#x7684;&#x7B2C;&#x4E00;&#x6761;&#x6027;&#x8D28;&#xFF1A;<code>NaN</code>&#x4E0E;&#x4EFB;&#x4F55;&#x503C;&#x90FD;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x5305;&#x62EC;<code>NaN</code>&#x81EA;&#x8EAB;&#x3002;</p><pre><code>var isNaNA = function(value) {
    var n = Number(value);
    return n !== n;
};</code></pre><p>&#x5148;&#x7528;<code>Number()</code>&#x8F6C;&#x6362;&#x53C2;&#x6570;&#xFF0C;&#x518D;&#x5224;&#x65AD;&#x8F6C;&#x6362;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4E0D;&#x662F;&#x4E0D;&#x7B49;&#x4E8E;&#x81EA;&#x8EAB;&#x3002;</p><p>&#x800C; <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN" rel="nofollow noreferrer">MDN</a> &#x4E0A;&#x7ED9;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><pre><code>var isNaNB = function(value) {
    var n = parseInt(value);
    return n !== n;
};</code></pre><p>&#x6211;&#x89C9;&#x5F97;&#x662F;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;:</p><pre><code>isNaN(&apos;123abc&apos;);    // true
isNaNA(&apos;123abc&apos;);   // true
isNaNB(&apos;123abc&apos;);   // false</code></pre><h2><code>Number.isNaN()</code></h2><p>ES6 &#x4E2D;&#x7684;<code>Number.isNaN()</code>&#x662F;&#x4E00;&#x4E2A;&#x5224;&#x65AD;<code>NaN</code>&#x7684;&#x5347;&#x7EA7;&#x7248;&#xFF0C;&#x548C;<code>isNaN()</code>&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;<code>Number.isNaN()</code>&#x4E0D;&#x4F1A;&#x5F3A;&#x5236;&#x8F6C;&#x5316;&#x53C2;&#x6570;&#xFF0C;&#x76F4;&#x63A5;&#x5BF9;&#x53C2;&#x6570;&#x672C;&#x8EAB;&#x505A;&#x5224;&#x65AD;&#xFF0C;&#x8FD9;&#x6837;&#x53EA;&#x6709;&#x53C2;&#x6570;&#x663E;&#x793A;&#x7B49;&#x4E8E;<code>NaN</code>&#xFF0C;&#x624D;&#x4F1A;&#x8FD4;&#x56DE;<code>true</code></p><pre><code>Number.isNaN(NaN);  // true&#xFF0C;&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x90FD;&#x8FD4;&#x56DE; false</code></pre><p>&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x662F;&#xFF1A;</p><pre><code>function isNaNC (value) {
    return typeof(value) === &quot;number&quot; &amp;&amp; isNaN(value);
}</code></pre><p>&#x7B97;&#x4E86;&#xFF0C;&#x8FD8;&#x662F;&#x4E0D;&#x7EA0;&#x7ED3;&#x4E86;....</p><h2>&#x53C2;&#x8003;</h2><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN" rel="nofollow noreferrer">MDN isNaN()</a><br><a href="https://www.cnblogs.com/onepixel/p/5281796.html" rel="nofollow noreferrer">JavaScript&#x4E2D;&#x7684; NaN &#x4E0E; isNaN</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于NaN

## 原文链接
[https://segmentfault.com/a/1190000016088123](https://segmentfault.com/a/1190000016088123)


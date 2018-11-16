---
title: JavaScript的几种循环方式
hidden: true
categories: reprint
slug: 35cb092b
date: 2018-11-15 02:30:08
---

{{< raw >}}
<p>JavaScript&#x63D0;&#x4F9B;&#x4E86;&#x8BB8;&#x591A;&#x901A;&#x8FC7;LOOPS&#x8FED;&#x4EE3;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x672C;&#x6559;&#x7A0B;&#x89E3;&#x91CA;&#x4E86;&#x73B0;&#x4EE3;JAVASCRIPT&#x4E2D;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x5FAA;&#x73AF;&#x53EF;&#x80FD;&#x6027;</p><p><span class="img-wrap"><img data-src="/img/bVbfH2g?w=863&amp;h=548" src="https://static.alili.tech/img/bVbfH2g?w=863&amp;h=548" alt="clipboard.png" title="clipboard.png"></span></p><h2>&#x76EE;&#x5F55;&#xFF1A;</h2><ul><li>for</li><li>forEach</li><li>do...while</li><li>while</li><li>for...in</li><li>for...of</li><li>for...in vs for...of</li></ul><h2>&#x4ECB;&#x7ECD;</h2><p>JavaScript&#x63D0;&#x4F9B;&#x4E86;&#x8BB8;&#x591A;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x672C;&#x6559;&#x7A0B;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x5C0F;&#x4F8B;&#x5B50;&#x548C;&#x4E3B;&#x8981;&#x5C5E;&#x6027;&#x89E3;&#x91CA;&#x6BCF;&#x4E00;&#x4E2A;&#x3002;</p><h3>for</h3><pre><code>const list = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]
for (let i = 0; i &lt; list.length; i++) {
  console.log(list[i]) //value
  console.log(i) //index
}</code></pre><ul><li>&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;break&#x4E2D;&#x65AD;for&#x5FAA;&#x73AF;</li><li>&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;continue&#x7EE7;&#x7EED;for&#x5FAA;&#x73AF;&#x7684;&#x4E0B;&#x4E00;&#x6B21;&#x8FED;&#x4EE3;</li></ul><h3>forEach</h3><p>&#x5728;ES5&#x4E2D;&#x5F15;&#x5165;&#x3002;&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;list.forEach&#xFF08;&#xFF09;&#x8FED;&#x4EE3;&#x5176;&#x5C5E;&#x6027;&#xFF1A;</p><pre><code>const list = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]
list.forEach((item, index) =&gt; {
  console.log(item) //value
  console.log(index) //index
})

//index is optional
list.forEach(item =&gt; console.log(item))</code></pre><blockquote>&#x4E0D;&#x8FC7;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x4F60;&#x65E0;&#x6CD5;&#x6446;&#x8131;&#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x3002;</blockquote><h3>do...while</h3><pre><code>const list = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]
let i = 0
do {
  console.log(list[i]) //value
  console.log(i) //index
  i = i + 1
} while (i &lt; list.length)</code></pre><p>&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;break&#x4E2D;&#x65AD;while&#x5FAA;&#x73AF;&#xFF1A;</p><pre><code>do {
  if (something) break
} while (true)
</code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;continue&#x8DF3;&#x8F6C;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#xFF1A;</p><pre><code>do {
  if (something) continue

  //do something else
} while (true)</code></pre><h3>while</h3><pre><code>const list = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]
let i = 0
while (i &lt; list.length) {
  console.log(list[i]) //value
  console.log(i) //index
  i = i + 1
}
</code></pre><p>&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;break&#x4E2D;&#x65AD;while&#x5FAA;&#x73AF;&#xFF1A;</p><pre><code>while (true) {
  if (something) break
}
</code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;continue&#x8DF3;&#x8F6C;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#xFF1A;</p><pre><code>while (true) {
  if (something) continue

  //do something else
}
</code></pre><p>&#x4E0E;do...while&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;do...while&#x603B;&#x662F;&#x81F3;&#x5C11;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x3002;</p><h3>for...in</h3><p>&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#xFF0C;&#x7ED9;&#x51FA;&#x5C5E;&#x6027;&#x540D;&#x79F0;&#x3002;</p><pre><code>for (let property in object) {
  console.log(property) //property name
  console.log(object[property]) //property value
}
</code></pre><h3>for...of</h3><p>ES2015&#x5F15;&#x5165;&#x4E86;for&#x5FAA;&#x73AF;&#xFF0C;&#x5B83;&#x7ED3;&#x5408;&#x4E86;forEach&#x7684;&#x7B80;&#x6D01;&#x6027;&#x548C;&#x7834;&#x89E3;&#x80FD;&#x529B;&#xFF1A;</p><pre><code>//iterate over the value
for (const value of [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]) {
  console.log(value) //value
}

//get the index as well, using `entries()`
for (const [index, value] of [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;].entries()) {
  console.log(index) //index
  console.log(value) //value
}</code></pre><p>&#x6CE8;&#x610F;&#x4F7F;&#x7528;const&#x3002;&#x6B64;&#x5FAA;&#x73AF;&#x5728;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x8303;&#x56F4;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B89;&#x5168;&#x5730;&#x4F7F;&#x7528;&#x5B83;&#x800C;&#x4E0D;&#x662F;let&#x3002;</p><h3>for...in VS FOR...OF</h3><p>&#x4E0E;for...in&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF1A;</p><ul><li>for...of &#x8FED;&#x4EE3;&#x5C5E;&#x6027;&#x503C;</li><li>for...in &#x8FED;&#x4EE3;&#x5C5E;&#x6027;&#x540D;&#x79F0;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript的几种循环方式

## 原文链接
[https://segmentfault.com/a/1190000016110909](https://segmentfault.com/a/1190000016110909)


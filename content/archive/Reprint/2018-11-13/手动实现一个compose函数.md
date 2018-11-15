---
title: 手动实现一个compose函数
hidden: true
categories: reprint
slug: e72090d9
date: 2018-11-13 02:30:09
---

{{< raw >}}
<pre><code>&#x5728;redux&#x4E2D;&#x5408;&#x5E76;reducer&#x7684;&#x65F6;&#x5019;&#x6709;&#x7528;&#x5230;compose&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C06;&#x591A;&#x4E2A;reducer&#x5408;&#x6210;&#x4E00;&#x4E2A;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;compose&#x51FD;&#x6570;&#x8BE5;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;

</code></pre><pre><code>function compose(...fns) { //fns&#x662F;&#x4F20;&#x5165;&#x7684;&#x51FD;&#x6570;
  const fn = fns.pop();
  return (...args) =&gt; {
    fn(...args);
    if (fns.length &gt; 0) {
      compose(...fns);
    }
  };
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手动实现一个compose函数

## 原文链接
[https://segmentfault.com/a/1190000016243679](https://segmentfault.com/a/1190000016243679)


---
title: 详解 vue 双向数据绑定的原理，并实现一组双向数据绑定
hidden: true
categories: [reprint]
slug: ce0643cd
date: 2018-11-13 02:30:09
---

{{< raw >}}
<p>1&#xFF1A;vue &#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x7684;&#x539F;&#x7406;&#xFF1A;</p><p>Object.defineProperty&#x662F;ES5&#x65B0;&#x589E;&#x7684;&#x4E00;&#x4E2A;API&#xFF0C;&#x5176;&#x4F5C;&#x7528;&#x662F;&#x7ED9;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x63A7;&#x5236;<br>Object.defineProperty(obj, prop, descriptor)<br>&#x53C2;&#x6570; obj: &#x9700;&#x8981;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF08;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF09;<br>prop: &#x9700;&#x88AB;&#x5B9A;&#x4E49;&#x6216;&#x4FEE;&#x6539;&#x7684;&#x5C5E;&#x6027;&#x540D;&#xFF08;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x65B9;&#x6CD5;&#xFF09;<br>&#x5BF9;&#x4E8E;setter&#x548C;getter&#xFF0C;&#x6211;&#x7684;&#x7406;&#x89E3;&#x662F;&#x5B83;&#x4EEC;&#x662F;&#x4E00;&#x5BF9;&#x52FE;&#x5B50;&#xFF08;hook&#xFF09;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x4F60;&#x5BF9;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#x65F6;&#xFF0C;&#x5219;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x7528;&#x76F8;&#x5E94;&#x7684;setert&#x51FD;&#x6570;&#xFF1B;&#x800C;&#x5F53;&#x83B7;&#x53D6;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5219;&#x8C03;&#x7528;getter&#x51FD;&#x6570;&#x3002;&#x8FD9;&#x4E5F;&#x662F;&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x7684;&#x5173;&#x952E;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgjbo?w=890&amp;h=541" src="https://static.alili.tech/img/bVbgjbo?w=890&amp;h=541" alt="clipboard.png" title="clipboard.png"></span></p><p>2&#xFF1A;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#xFF1A;</p><pre><code>&lt;div id=&quot;app&quot;&gt;
    &lt;input type=&quot;text&quot; id=&quot;txt&quot;&gt;
    &lt;p id=&quot;show-txt&quot;&gt;&lt;/p&gt;
&lt;/div&gt;



    var obj = {}
    Object.defineProperty(obj, &apos;txt&apos;, {
        get: function () {
            return obj
        },

        set: function (newValue) {
            document.getElementById(&apos;txt&apos;).value = newValue
            document.getElementById(&apos;show-txt&apos;).innerHTML = newValue
        }
    })

    document.addEventListener(&apos;keyup&apos;, function (e) {
        obj.txt = e.target.value
    })

</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解 vue 双向数据绑定的原理，并实现一组双向数据绑定

## 原文链接
[https://segmentfault.com/a/1190000016240984](https://segmentfault.com/a/1190000016240984)


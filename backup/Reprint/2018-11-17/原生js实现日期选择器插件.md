---
title: '原生js实现日期选择器插件' 
date: 2018-11-17 02:30:13
hidden: true
slug: 2e1ky99muik
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x539F;&#x751F;js&#x5B9E;&#x73B0;&#x65E5;&#x671F;&#x9009;&#x62E9;&#x5668;&#x63D2;&#x4EF6;</h1><h2 id="articleHeader1">&#x524D;&#x8A00;</h2><p>&#x8DDD;&#x79BB;&#x81EA;&#x5DF1;&#x4E0A;&#x6B21;&#x5199;&#x63D2;&#x4EF6;&#x5DEE;&#x4E0D;&#x591A;&#x534A;&#x5E74;&#x4E86;&#x3002;&#x516C;&#x53F8;&#x6280;&#x672F;&#x6808;&#x90FD;&#x662F;&#x7528;&#x6846;&#x67B6;&#xFF0C;&#x8C03;&#x89E3;&#x4E0B;&#x53E3;&#x5473;&#x5C31;&#x5199;&#x4E86;&#x6B64;&#x539F;&#x751F;&#x63D2;&#x4EF6;&#x3002;&#x56E0;&#x4E3A;&#x672C;&#x610F;&#x662F;&#x60F3;&#x517C;&#x5BB9;&#x5230;ie9&#x5C31;&#x4E0D;&#x7528;es6&#x8BED;&#x6CD5;&#x5199;&#x4E86;&#x3002;&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#x5728;&#x770B;vue&#x6E90;&#x7801;&#x53D7;&#x4E86;&#x70B9;&#x542F;&#x53D1;&#xFF0C;&#x672C;&#x63D2;&#x4EF6;&#x6709;&#x70B9;&#x63A5;&#x8FD1;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x89C6;&#x56FE;&#x66F4;&#x65B0;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x6E32;&#x67D3;&#x3002;&#x5982;&#x679C;&#x5E0C;&#x671B;&#x6709;&#x66F4;&#x591A;&#x529F;&#x80FD;&#x7684;&#xFF0C;&#x53EF;&#x5728;&#x4E0B;&#x65B9;&#x7559;&#x8A00;&#xFF0C;&#x6211;&#x5C3D;&#x91CF;&#x6269;&#x5C55;&#xFF01;&#x5982;&#x679C;&#x4F60;&#x6709;&#x9700;&#x8981;&#x6216;&#x8005;&#x559C;&#x6B22;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x7ED9;&#x6211;github&#x6765;&#x4E2A;star &#x1F606;</p><blockquote><a href="https://github.com/zhouatie/plugin/tree/master/datepicker" rel="nofollow noreferrer" target="_blank">&#x4ED3;&#x5E93;&#x5730;&#x5740;</a><p><a href="https://zhouatie.github.io/plugin/datepicker/datepicker.html" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF;&#x9884;&#x89C8;</a></p></blockquote><h3 id="articleHeader2">&#x9884;&#x89C8;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015973793?w=386&amp;h=500" src="https://static.alili.tech/img/remote/1460000015973793?w=386&amp;h=500" alt="&#x62FE;&#x8272;&#x5668;" title="&#x62FE;&#x8272;&#x5668;" style="cursor:pointer"></span></p><h3 id="articleHeader3">&#x51C6;&#x5907;</h3><p>&#x9996;&#x5148;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x5165;css&#x3001;js&#x6587;&#x4EF6;(&#x6587;&#x4EF6;&#x5728;&#x6211;&#x7684;github&#xFF0C;&#x5982;&#x4F55;&#x5F15;&#x5165;&#x53EF;&#x770B;github&#x793A;&#x4F8B;html)</p><p>&#x5728;&#x9875;&#x9762;&#x4E2D;&#x5199;&#x4E0A;&#x5982;&#x4E0B;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Calendar.create({
    classN: &apos;calendar-item&apos;, // &#x8FD9;&#x91CC;&#x7684;calendar-item&#x53EF;&#x968F;&#x610F;&#x586B; &#x4E0D;&#x9700;&#x8981;&#x8DDF;&#x6211;&#x4E00;&#x6837;
    callBack: function(bindElem, dateObj) {
        // bindElem: &#x8BE5;&#x63A7;&#x4EF6;&#x7ED1;&#x5B9A;&#x7684;&#x5143;&#x7D20;
        // dateObj: &#x9009;&#x4E2D;&#x7684;&#x5E74;&#x3001;&#x6708;&#x3001;&#x65E5; &#x5982;&#xFF1A; {year: 2018, month: 8, date: 12}

        // &#x7528;&#x6237;&#x53EF;&#x901A;&#x8FC7;bindElem&#x548C;dateObj&#x641E;&#x4E8B;&#x60C5;&#x5566; &#x1F606;
        bindElem.innerHTML = dateObj.year + &apos;-&apos; + dateObj.month + &apos;-&apos; + dateObj.date;
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javaScript">Calendar.create({
    <span class="hljs-attr">classN</span>: <span class="hljs-string">&apos;calendar-item&apos;</span>, <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;calendar-item&#x53EF;&#x968F;&#x610F;&#x586B; &#x4E0D;&#x9700;&#x8981;&#x8DDF;&#x6211;&#x4E00;&#x6837;</span>
    callBack: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">bindElem, dateObj</span>) </span>{
        <span class="hljs-comment">// bindElem: &#x8BE5;&#x63A7;&#x4EF6;&#x7ED1;&#x5B9A;&#x7684;&#x5143;&#x7D20;</span>
        <span class="hljs-comment">// dateObj: &#x9009;&#x4E2D;&#x7684;&#x5E74;&#x3001;&#x6708;&#x3001;&#x65E5; &#x5982;&#xFF1A; {year: 2018, month: 8, date: 12}</span>

        <span class="hljs-comment">// &#x7528;&#x6237;&#x53EF;&#x901A;&#x8FC7;bindElem&#x548C;dateObj&#x641E;&#x4E8B;&#x60C5;&#x5566; &#x1F606;</span>
        bindElem.innerHTML = dateObj.year + <span class="hljs-string">&apos;-&apos;</span> + dateObj.month + <span class="hljs-string">&apos;-&apos;</span> + dateObj.date;
    }
})</code></pre><blockquote><strong><code>String: classN</code></strong>:&#x53C2;&#x6570;&#x586B;&#x5165;&#x4F60;&#x8981;&#x7ED1;&#x5B9A;&#x65E5;&#x671F;&#x63A7;&#x4EF6;&#x7684;&#x5143;&#x7D20;&#x3002;&#x672C;&#x63D2;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x6839;&#x636E;&#x7528;&#x6237;&#x63D0;&#x4F9B;&#x7684;<code>classN</code>&#x7C7B;&#x540D;&#x751F;&#x6210;&#x76F8;&#x5E94;&#x4E2A;&#x6570;<p><strong><code>Function: callBack</code></strong>:<code>bindElem</code>: &#x8BE5;&#x63A7;&#x4EF6;&#x7ED1;&#x5B9A;&#x7684;&#x5143;&#x7D20;,<code>dateObj</code>: &#x9009;&#x4E2D;&#x7684;&#x5E74;&#x3001;&#x6708;&#x3001;&#x65E5; &#x5982;&#xFF1A; <code>{year: 2018, month: 8, date: 12}</code>&#x3002;&#x901A;&#x8FC7;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#xFF0C;&#x8BA9;&#x7528;&#x6237;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x901A;&#x8FC7;&#x56DE;&#x8C03;&#x53C2;&#x6570;&#x505A;&#x64CD;&#x4F5C;&#xFF0C;&#x7ED9;&#x7528;&#x6237;&#x66F4;&#x9AD8;&#x7684;&#x81EA;&#x7531;&#x5EA6;&#x3002;<br><strong>&#x5982;&#x679C;&#x9700;&#x8981;&#x66F4;&#x591A;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4F1A;&#x5C3D;&#x91CF;&#x6269;&#x5C55;</strong></p></blockquote><h2 id="articleHeader4">&#x7ED3;&#x5C3E;</h2><p>&#x5982;&#x6709;&#x4EC0;&#x4E48;&#x529F;&#x80FD;&#x9700;&#x8981;&#x589E;&#x52A0;&#x7684;&#xFF0C;&#x53EF;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x7559;&#x8A00;&#xFF0C;&#x6211;&#x5C3D;&#x91CF;&#x6EE1;&#x8DB3;&#x3002;&#x5982;&#x6709;&#x4EC0;&#x4E48;&#x758F;&#x5FFD;&#x6216;&#x9519;&#x8BEF;&#xFF0C;&#x5E0C;&#x671B;&#x60A8;&#x6307;&#x51FA;&#x3002;&#x6211;&#x4F1A;&#x5C3D;&#x65E9;&#x4FEE;&#x6539;&#xFF0C;&#x4EE5;&#x514D;&#x8BEF;&#x5BFC;&#x4ED6;&#x4EBA;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js实现日期选择器插件

## 原文链接
[https://segmentfault.com/a/1190000015973790](https://segmentfault.com/a/1190000015973790)


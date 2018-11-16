---
title: '用Vue撸一个『A-Z字母滑动检索菜单』' 
date: 2018-11-17 2:30:13
hidden: true
slug: lx9qxlzepgj
categories: reprint
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x7528;vue&#x4EFF;&#x5199;&#x9014;&#x725B;&#x65C5;&#x884C;APP &#x9047;&#x5230;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x57CE;&#x5E02;&#x5217;&#x8868;&#x9009;&#x62E9;&#x9875;&#x9762;&#xFF0C;&#x82B1;&#x4E86;&#x4E9B;&#x65F6;&#x95F4;&#xFF0C;&#x7528;Vue&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E0B;&#x5E76;&#x8BA9;&#x5B83;&#x4F53;&#x9A8C;&#x7684;&#x63A5;&#x8FD1; &#x5B89;&#x5353;/IOS &#x539F;&#x751F;&#x7EC4;&#x4EF6;</p><p>&#x5F88;&#x591A;&#x5730;&#x65B9;&#x90FD;&#x4F1A;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4FA7;&#x8FB9;&#x680F;&#x5B57;&#x6BCD;&#x5217;&#x8868;&#x83DC;&#x5355;&#xFF0C;&#x53EF;&#x4EE5;&#x6ED1;&#x52A8;&#x5B9E;&#x73B0;&#x5185;&#x5BB9;&#x5217;&#x8868;&#x8054;&#x52A8;&#x3002;</p><p>&#x6BD4;&#x5982;&#x624B;&#x673A;<strong>&#x901A;&#x8BAF;&#x5F55;</strong>&#xFF0C;<strong>&#x57CE;&#x5E02;&#x5207;&#x6362;&#x9875;&#x9762;</strong>&#x90FD;&#x4F1A;&#x7528;&#x5230;</p><h2 id="articleHeader0">&#x5B9E;&#x73B0;&#x6548;&#x679C;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000015969175?w=318&amp;h=568" src="https://static.alili.tech/img/remote/1460000015969175?w=318&amp;h=568" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x7EBF;&#x4F53;&#x9A8C;&#xFF1A;<a href="http://hx-dl.top/a-z_menu/#/city" rel="nofollow noreferrer" target="_blank">http://hx-dl.top/a-z_menu/#/city</a></p><h2 id="articleHeader1">&#x6280;&#x672F;&#x70B9;</h2><ul><li>better-scroll &#x5B9E;&#x73B0;&#x57CE;&#x5E02;&#x5217;&#x8868;&#x6ED1;&#x52A8;</li><li>evnetBus&#x603B;&#x7EBF;&#x673A;&#x5236;&#x5B9E;&#x73B0;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</li><li>axios&#x8BF7;&#x6C42;&#x57CE;&#x5E02;&#x5217;&#x8868;&#x6570;&#x636E;</li><li>stylus&#x5B9E;&#x73B0;&#x9AD8;&#x6548;css&#x7F16;&#x5199;</li><li>&#x51FD;&#x6570;&#x8282;&#x6D41;&#x51CF;&#x5C11;&#x6ED1;&#x52A8;&#x4E8B;&#x4EF6;&#x5F00;&#x9500;</li></ul><h3 id="articleHeader2">&#x9875;&#x9762;&#x7ED3;&#x6784;</h3><p>&#x9875;&#x9762;&#x4E3B;&#x8981;&#x7531;&#x4E09;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x62FC;&#x88C5;&#x800C;&#x6210;</p><p><strong>t-header</strong></p><p><strong>t-list</strong></p><p><strong>t-alphabet</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;div class=&quot;city&quot;&gt;
    &lt;t-header&gt;&lt;/t-header&gt;
    &lt;t-list :cities=&quot;cities&quot; :hotCities=&quot;hotCities&quot;&gt;&lt;/t-list&gt;
    &lt;t-alphabet :cities=&quot;cities&quot;&gt;&lt;/t-alphabet&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;city&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-list</span> <span class="hljs-attr">:cities</span>=<span class="hljs-string">&quot;cities&quot;</span> <span class="hljs-attr">:hotCities</span>=<span class="hljs-string">&quot;hotCities&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-alphabet</span> <span class="hljs-attr">:cities</span>=<span class="hljs-string">&quot;cities&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-alphabet</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p><strong>t-list</strong>&#xFF0C;<strong>t-alphabet</strong><br>&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x73B0;&#x76F4;&#x63A5;&#x79FB;&#x6B65;&#x9879;&#x76EE;&#x6E90;&#x7801;&#x5427;&#xFF0C;&#x5B9E;&#x73B0;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x5C31;&#x4E0D;&#x8D34;&#x4EE3;&#x7801;&#x4E86;,&#x6709;&#x9700;&#x8981;&#x7684;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x62FF;&#x53BB;&#x7528;&#xFF0C;&#x505A;&#x70B9;&#x5C0F;&#x4FEE;&#x6539;&#x5373;&#x53EF;</p><h2 id="articleHeader3">&#x6E90;&#x7801;&#x5730;&#x5740;</h2><p><a href="https://github.com/hx-dl/a-z_menu.git" rel="nofollow noreferrer" target="_blank">Github&#x6E90;&#x7801;</a></p><p>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://hx-dl.github.io/hx-dl.github.io/2018/08/11/%E7%94%A8Vue%E6%92%B8%E4%B8%80%E4%B8%AA%E3%80%8EA-Z%E5%AD%97%E6%AF%8D%E6%BB%91%E5%8A%A8%E6%A3%80%E7%B4%A2%E8%8F%9C%E5%8D%95%E3%80%8F/" rel="nofollow noreferrer" target="_blank">&#x884C;&#x65E0;&#x5FCC;&#x7684;&#x6210;&#x957F;&#x5C0F;&#x5C4B;&#xFF1A;&#x7528;Vue&#x64B8;&#x4E00;&#x4E2A;&#x300E;A-Z&#x5B57;&#x6BCD;&#x6ED1;&#x52A8;&#x68C0;&#x7D22;&#x83DC;&#x5355;&#x300F;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Vue撸一个『A-Z字母滑动检索菜单』

## 原文链接
[https://segmentfault.com/a/1190000015969172](https://segmentfault.com/a/1190000015969172)


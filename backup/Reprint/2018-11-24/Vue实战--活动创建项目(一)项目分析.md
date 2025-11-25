---
title: 'Vue实战--活动创建项目(一)项目分析' 
date: 2018-11-24 2:30:10
hidden: true
slug: xf05nqfz9ge
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x9879;&#x76EE;&#x7B80;&#x4ECB;</h2><p>&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x6765;&#x6211;&#x90A3;&#x4E2A;&#x8BFB;&#x4E66;&#x5C0F;&#x7EC4;&#x7684;&#x6D3B;&#x52A8;&#x521B;&#x5EFA;&#x4E0E;&#x53C2;&#x52A0;&#x7684;&#x3002;<br>&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x5C31;&#x662F;&#x6D3B;&#x52A8;&#x7684;&#x521B;&#x5EFA;&#x4E0E;&#x52A0;&#x5165;&#x3002;<br>&#x5F77;&#x539F;&#x751F;&#x624B;&#x673A;APP&#x7684;&#x98CE;&#x683C;</p><h2 id="articleHeader1">&#x9879;&#x76EE;&#x529F;&#x80FD;&#x5206;&#x6790;</h2><p>&#x76EE;&#x524D;&#x5C31;&#x8FD9;&#x4E48;&#x4E9B;&#x529F;&#x80FD;&#xFF0C;&#x4EE5;&#x540E;&#x6162;&#x6162;&#x4E30;&#x5BCC;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;</p><ul><li>&#x9996;&#x9875;(&#x672A;&#x5B8C;&#x6210;)</li><li>&#x767B;&#x9646;/&#x6CE8;&#x518C;(&#x5DF2;&#x5B8C;&#x6210;&#x524D;&#x7AEF;&#x89C6;&#x56FE;)</li><li><p>&#x5E38;&#x89C4;&#x6D3B;&#x52A8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x53D1;&#x8D77;&#x6D3B;&#x52A8;(&#x5DF2;&#x5B8C;&#x6210;)
- &#x6B63;&#x5728;&#x8FDB;&#x884C;(&#x5DF2;&#x5B8C;&#x6210;&#x524D;&#x7AEF;&#x89C6;&#x56FE;)
- &#x6D3B;&#x52A8;&#x8BE6;&#x60C5;(&#x672A;&#x5B8C;&#x6210;)
- &#x5F80;&#x671F;&#x6D3B;&#x52A8;(&#x672A;&#x5B8C;&#x6210;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> &#x53D1;&#x8D77;&#x6D3B;&#x52A8;(&#x5DF2;&#x5B8C;&#x6210;)
</span>-<span class="ruby"> &#x6B63;&#x5728;&#x8FDB;&#x884C;(&#x5DF2;&#x5B8C;&#x6210;&#x524D;&#x7AEF;&#x89C6;&#x56FE;)
</span>-<span class="ruby"> &#x6D3B;&#x52A8;&#x8BE6;&#x60C5;(&#x672A;&#x5B8C;&#x6210;)
</span>-<span class="ruby"> &#x5F80;&#x671F;&#x6D3B;&#x52A8;(&#x672A;&#x5B8C;&#x6210;)</span></code></pre></li><li><p>&#x4E3B;&#x9898;&#x9605;&#x8BFB;(&#x672A;&#x5B8C;&#x6210;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x53D1;&#x8D77;&#x6D3B;&#x52A8;(&#x672A;&#x5B8C;&#x6210;)
- &#x6B63;&#x5728;&#x8FDB;&#x884C;(&#x672A;&#x5B8C;&#x6210;)
- &#x6D3B;&#x52A8;&#x8BE6;&#x60C5;(&#x672A;&#x5B8C;&#x6210;)
- &#x5F80;&#x671F;&#x6D3B;&#x52A8;(&#x672A;&#x5B8C;&#x6210;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> &#x53D1;&#x8D77;&#x6D3B;&#x52A8;(&#x672A;&#x5B8C;&#x6210;)
</span>-<span class="ruby"> &#x6B63;&#x5728;&#x8FDB;&#x884C;(&#x672A;&#x5B8C;&#x6210;)
</span>-<span class="ruby"> &#x6D3B;&#x52A8;&#x8BE6;&#x60C5;(&#x672A;&#x5B8C;&#x6210;)
</span>-<span class="ruby"> &#x5F80;&#x671F;&#x6D3B;&#x52A8;(&#x672A;&#x5B8C;&#x6210;)
</span></code></pre></li></ul><p><span class="img-wrap"><img data-src="/img/bVbdr54?w=562&amp;h=437" src="https://static.alili.tech/img/bVbdr54?w=562&amp;h=437" alt="&#x529F;&#x80FD;&#x5206;&#x6790;-&#x601D;&#x7EF4;&#x5BFC;&#x56FE;" title="&#x529F;&#x80FD;&#x5206;&#x6790;-&#x601D;&#x7EF4;&#x5BFC;&#x56FE;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x6280;&#x672F;&#x5B9E;&#x73B0;</h2><ul><li>Vue&#x5168;&#x5BB6;&#x6876;</li><li>Muse-ui</li></ul><p>&#x9879;&#x76EE;&#x5730;&#x5740;:<a href="https://github.com/Zone-F/jingyesi" rel="nofollow noreferrer" target="_blank">Github</a> &#x6B22;&#x8FCE;Star<br>&#x540E;&#x7EED;&#x6587;&#x7AE0;:<a href="https://segmentfault.com/a/1190000015561767">Vue&#x5B9E;&#x6218;--&#x6D3B;&#x52A8;&#x521B;&#x5EFA;&#x9879;&#x76EE;(&#x4E8C;)&#x8DEF;&#x7531;&#x8BBE;&#x8BA1;&#x53CA;&#x9876;&#x90E8;&#x5BFC;&#x822A;&#x680F;&#x5F00;&#x53D1;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue实战--活动创建项目(一)项目分析

## 原文链接
[https://segmentfault.com/a/1190000015560283](https://segmentfault.com/a/1190000015560283)


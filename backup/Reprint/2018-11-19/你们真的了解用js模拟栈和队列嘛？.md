---
title: '你们真的了解用js模拟栈和队列嘛？' 
date: 2018-11-19 2:32:04
hidden: true
slug: 893wcwhpbrp
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;&#xFF1A;</h3><p>&#x8FD8;&#x8BB0;&#x5F97;&#x5F53;&#x521D;&#x7528;C&#x8BED;&#x8A00;&#x5199;&#x5404;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x82E6;&#x903C;&#x65F6;&#x4EE3;&#x561B;&#xFF0C;&#x4F46;&#x662F;&#x7528;JS&#x6765;&#x5B9E;&#x73B0;&#x6808;&#x548C;&#x961F;&#x5217;&#x662F;&#x5982;&#x6B64;&#x7684;&#x7B80;&#x5355;&#x554A;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x4EEC;&#x771F;&#x7684;&#x4E86;&#x89E3;&#x7528;js&#x6A21;&#x62DF;&#x6808;&#x548C;&#x961F;&#x5217;&#xFF0C;&#x5C31;&#x5F53;&#x4F60;&#x4EEC;&#x771F;&#x7684;&#x5F88;&#x4E86;&#x89E3;&#x4E86;&#xFF0C;&#x6BD5;&#x7ADF;&#x662F;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#xFF0C;&#x6211;&#x5C31;&#x5199;&#x51E0;&#x4E2A;&#x6848;&#x4F8B;&#xFF0C;&#x4E0D;&#x559C;&#x52FF;&#x55B7;</p><h3 id="articleHeader1">&#x6808;</h3><p>demo1&#xFF08;&#x6808;&#x65B9;&#x6CD5;&#xFF09;:<br>&#x6808;&#x5C31;&#x662F;&#x5148;&#x8FDB;&#x540E;&#x51FA;&#xFF08;LIFO&#xFF09;&#xFF0C;JS&#x5C31;&#x662F;&#x5982;&#x6B64;&#x4FBF;&#x6377;push/pop&#x5C31;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x6808;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var demoArr = new Array();
demoArr.push(&apos;111&apos;)
demoArr.push(&apos;222&apos;)
demoArr.push(&apos;333&apos;)
console.log(demoArr.pop()) // 333
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>var demoArr = <span class="hljs-keyword">new</span> Array();
demoArr.<span class="hljs-keyword">push</span>(<span class="hljs-string">&apos;111&apos;</span>)
demoArr.<span class="hljs-keyword">push</span>(<span class="hljs-string">&apos;222&apos;</span>)
demoArr.<span class="hljs-keyword">push</span>(<span class="hljs-string">&apos;333&apos;</span>)
console.log(demoArr.<span class="hljs-keyword">pop</span>()) <span class="hljs-comment">// 333</span>
</code></pre><h3 id="articleHeader2">&#x961F;&#x5217;</h3><p>&#x961F;&#x5217;&#x662F;&#x5148;&#x8FDB;&#x5148;&#x51FA;&#xFF08;FIFO&#xFF09;&#xFF0C;&#x9AD8;3&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#xFF0C;shift&#x548C;push&#x6A21;&#x62DF;/unshift&#x548C;pop&#x6A21;&#x62DF;</p><p>demo2(&#x961F;&#x5217;&#x65B9;&#x6CD5;1)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var demoArr = new Array();
demoArr.push(&apos;july&apos;);
demoArr.push(&apos;deny&apos;);
demoArr.push(&apos;mirok&apos;); //demoArr = [&apos;july&apos;, &apos;deny&apos;, &apos;mirok&apos;],&#x6309;&#x5148;&#x8FDB;&#x5148;&#x51FA;&#xFF0C;&#x51FA;&#x6765;&#x7684;&#x5219;&#x662F;july
console.log(demoArr.shift()) // july
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>var demoArr = <span class="hljs-keyword">new</span> Array();
demoArr.<span class="hljs-keyword">push</span>(<span class="hljs-string">&apos;july&apos;</span>);
demoArr.<span class="hljs-keyword">push</span>(<span class="hljs-string">&apos;deny&apos;</span>);
demoArr.<span class="hljs-keyword">push</span>(<span class="hljs-string">&apos;mirok&apos;</span>); <span class="hljs-comment">//demoArr = [&apos;july&apos;, &apos;deny&apos;, &apos;mirok&apos;],&#x6309;&#x5148;&#x8FDB;&#x5148;&#x51FA;&#xFF0C;&#x51FA;&#x6765;&#x7684;&#x5219;&#x662F;july</span>
console.log(demoArr.shift()) <span class="hljs-comment">// july</span>
</code></pre><p>demo2(&#x961F;&#x5217;&#x65B9;&#x6CD5;2)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var demoArr = new Array();
demoArr.unshift(&apos;july&apos;)
demoArr.unshift(&apos;deny&apos;)
demoArr.unshift(&apos;mirok&apos;)
console.log(demoArr.pop()) //july" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> demoArr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
demoArr.unshift(<span class="hljs-string">&apos;july&apos;</span>)
demoArr.unshift(<span class="hljs-string">&apos;deny&apos;</span>)
demoArr.unshift(<span class="hljs-string">&apos;mirok&apos;</span>)
<span class="hljs-built_in">console</span>.log(demoArr.pop()) <span class="hljs-comment">//july</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你们真的了解用js模拟栈和队列嘛？

## 原文链接
[https://segmentfault.com/a/1190000015818218](https://segmentfault.com/a/1190000015818218)


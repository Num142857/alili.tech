---
title: '使用对象字面量重写prototype需要注意的问题' 
date: 2018-11-18 3:32:07
hidden: true
slug: h8n3k27135o
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x4EBA;&#x90FD;&#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5B57;&#x9762;&#x91CF;&#x6765;&#x521D;&#x59CB;&#x5316;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x662F;&#x521B;&#x5EFA;&#x51FD;&#x6570;&#x81EA;&#x5E26;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x5B57;&#x9762;&#x91CF;&#x6765;&#x521D;&#x59CB;&#x5316;&#x76F8;&#x5F53;&#x4E8E;&#x91CD;&#x5199;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x4E00;&#x4E9B;&#x5982;&#x4E0B;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader1">&#x6B63;&#x6587;</h3><p>&#x95EE;&#x9898;&#xFF1A;<br>&#x91CD;&#x5199;&#x4E4B;&#x540E;&#xFF0C;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;constructor&#x4E0D;&#x5728;&#x6307;&#x5411;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x6240;&#x5728;&#x7684;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function demo1 () {
}
demo1.prototype = {
    show: function() {console.log(&apos;execute success!&apos;)}
}
demo1.prototype.constructor&#x4E0D;&#x518D;&#x6307;&#x5411;demo1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo1</span> (<span class="hljs-params"></span>) </span>{
}
demo1.prototype = {
    <span class="hljs-attr">show</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;execute success!&apos;</span>)}
}
demo1.prototype.constructor&#x4E0D;&#x518D;&#x6307;&#x5411;demo1</code></pre><p>&#x65E2;&#x7136;&#x6709;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x90A3;&#x81EA;&#x7136;&#x6709;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x7684;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x8BA9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x6307;&#x5411;&#x539F;&#x5148;&#x5F97;&#x5BF9;&#x8C61;
function demo1 () {}
demo1.prototype = {
    constructor: demo1,
    show: function() {console.log(&apos;execute success!&apos;)}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x8BA9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x6307;&#x5411;&#x539F;&#x5148;&#x5F97;&#x5BF9;&#x8C61;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo1</span> (<span class="hljs-params"></span>) </span>{}
demo1.prototype = {
    <span class="hljs-attr">constructor</span>: demo1,
    <span class="hljs-attr">show</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;execute success!&apos;</span>)}
}</code></pre><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x53C8;&#x6709;&#x4E86;&#x65B0;&#x95EE;&#x9898;&#xFF0C;[[Enumerable]]&#x9ED8;&#x8BA4;&#x662F;true&#xFF0C;&#x800C;&#x539F;&#x5148;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x662F;false&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4FEE;&#x6539;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x81EA;&#x7136;&#x8981;&#x7528;&#x5230;&#x5F3A;&#x5927;&#x7684;defineProperty&#x5566;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function demo1 () {}
demo1.prototype = {
    show: function() {console.log(&apos;execute success!&apos;)}
}
Object.defineProperty(demo1.prototype, &apos;constructor&apos;, {
    enumerable: false,
    value: demo1
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo1</span> (<span class="hljs-params"></span>) </span>{}
demo1.prototype = {
    <span class="hljs-attr">show</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;execute success!&apos;</span>)}
}
<span class="hljs-built_in">Object</span>.defineProperty(demo1.prototype, <span class="hljs-string">&apos;constructor&apos;</span>, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>: demo1
})</code></pre><p>&#x597D;&#x5566;&#xFF0C;&#x5927;&#x529F;&#x544A;&#x6210;&#xFF0C;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x5566;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用对象字面量重写prototype需要注意的问题

## 原文链接
[https://segmentfault.com/a/1190000015885530](https://segmentfault.com/a/1190000015885530)


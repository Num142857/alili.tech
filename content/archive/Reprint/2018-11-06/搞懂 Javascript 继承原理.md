---
title: 搞懂 Javascript 继承原理
hidden: true
categories: [reprint]
slug: d7791b4e
date: 2018-11-06 15:28:31
---

{{< raw >}}
<p>&#x5728;&#x7406;&#x89E3;&#x7EE7;&#x627F;&#x4E4B;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x77E5;&#x9053; js &#x7684;&#x4E09;&#x4E2A;&#x4E1C;&#x897F;&#xFF1A;</p><ol><li>&#x4EC0;&#x4E48;&#x662F; JS &#x539F;&#x578B;&#x94FE;</li><li>this &#x7684;&#x503C;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;</li><li>JS &#x7684;new &#x5230;&#x5E95;&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;</li></ol><h2 id="articleHeader0">&#x4E00;&#x3001;&#x4EC0;&#x4E48;&#x662F; JS &#x539F;&#x578B;&#x94FE;&#xFF1F;</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053; JS &#x6709;&#x5BF9;&#x8C61;&#xFF0C;&#x6BD4;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj = { name: &apos;obj&apos; } " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">    <span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;obj&apos;</span> } </code></pre><p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x63A7;&#x5236;&#x53F0;&#x628A;obj &#x6253;&#x5370;&#x51FA;&#x6765;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhwDx?w=458&amp;h=363" src="https://static.alili.tech/img/bVbhwDx?w=458&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0; obj&#x5DF2;&#x7ECF;&#x6709;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#xFF08;&#x65B9;&#x6CD5;&#xFF09;&#x4E86;&#x3002;<strong>&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF1A;valueOf / toString / constructor &#x662F;&#x600E;&#x4E48;&#x6765;&#xFF1F;&#x6211;&#x4EEC;&#x5E76;&#x6CA1;&#x6709;&#x7ED9; obj.valueOf &#x8D4B;&#x503C;&#x5440;&#x3002;</strong></p><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x56FE;&#x6709;&#x70B9;&#x96BE;&#x61C2;&#xFF0C;&#x6211;&#x624B;&#x753B;&#x4E00;&#x4E2A;&#x793A;&#x610F;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhwEC?w=720&amp;h=515" src="https://static.alili.tech/img/bVbhwEC?w=720&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p><ol><li>obj&#x672C;&#x8EAB;&#x6709;&#x4E00;&#x4E2A;&#x5C5E;&#x6027; name (&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x7ED9;&#x5B83;&#x52A0;&#x7684;)</li><li>obj&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x53EB;&#x505A; __proto__(&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;)</li><li>obj&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5305;&#x62EC; valueOf, toString, constructor&#x7B49;</li><li>obj.__proto__&#x5176;&#x5B9E;&#x4E5F;&#x6709;&#x4E00;&#x4E2A;&#x53EB;&#x505A;__proto__&#x7684;&#x5C5E;&#x6027;(console.log&#x6CA1;&#x6709;&#x663E;&#x793A;)&#xFF0C;&#x503C;&#x4E3A; null</li></ol><p>&#x73B0;&#x5728;&#x56DE;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x95EE;&#x9898;&#xFF1A;obj &#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x62E5;&#x6709; valueOf / toString / constructor &#x8FD9;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#xFF1F;</p><p><strong>&#x7B54;&#x6848;&#xFF1A; &#x8FD9;&#x8DDF; __proto__&#x6709;&#x5173; &#x3002;</strong></p><p>&#x5F53;&#x6211;&#x4EEC;&#x300C;&#x8BFB;&#x53D6;&#x300D; obj.toString &#x65F6;&#xFF0C;JS &#x5F15;&#x64CE;&#x4F1A;&#x505A;&#x4E0B;&#x9762;&#x7684;&#x4E8B;&#x60C5;&#xFF1A;</p><ol><li>&#x770B;&#x770B; obj &#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x6709;&#x6CA1;&#x6709; toString &#x5C5E;&#x6027;&#x3002;&#x6CA1;&#x6709;&#x5C31;&#x8D70;&#x5230;&#x4E0B;&#x4E00;&#x6B65;&#x3002;</li><li>&#x770B;&#x770B; obj.__proto__ &#x5BF9;&#x8C61;&#x6709;&#x6CA1;&#x6709; toString &#x5C5E;&#x6027;&#xFF0C; &#x53D1;&#x73B0; obj.__proto__ &#x6709; toString &#x5C5E;&#x6027;&#xFF0C; &#x4E8E;&#x662F;&#x627E;&#x5230;&#x4E86;&#xFF0C;&#x6240;&#x4EE5; obj.toString&#x5B9E;&#x9645;&#x5C31;&#x662F;&#x7B2C;2&#x6B65;&#x4E2D;&#x627E;&#x5230;&#x7684; obj.__proto__.toString&#x3002;</li><li>&#x5982;&#x679C; obj.__proto__&#x6CA1;&#x6709;&#xFF0C;&#x90A3;&#x4E48;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x7EE7;&#x7EED;&#x67E5;&#x770B; obj.__proto__.__proto__</li><li>&#x5982;&#x679C; obj.__proto__.__proto__&#x4E5F;&#x6CA1;&#x6709;&#xFF0C;&#x90A3;&#x4E48;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x7EE7;&#x7EED;&#x67E5;&#x770B; obj.__proto__.__proto__.__proto__</li></ol><p>5.&#x76F4;&#x5230;&#x627E;&#x5230; toString &#x6216;&#x8005; <strong>proto</strong> &#x4E3A; null&#x3002;</p><p>&#x4E0A;&#x9762;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5C31;&#x662F;&#x300C;&#x8BFB;&#x300D;&#x5C5E;&#x6027;&#x7684;&#x300C;&#x641C;&#x7D22;&#x8FC7;&#x7A0B;&#x300D;&#x3002;&#x800C;&#x8FD9;&#x4E2A;&#x300C;&#x641C;&#x7D22;&#x8FC7;&#x7A0B;&#x300D;&#xFF0C;&#x662F;&#x8FDE;&#x7740;&#x7531; <strong>proto</strong> &#x7EC4;&#x6210;&#x7684;&#x94FE;&#x5B50;&#x4E00;&#x76F4;&#x8D70;&#x7684;&#x3002;<strong>&#x8FD9;&#x4E2A;&#x94FE;&#x5B50;&#xFF0C;&#x5C31;&#x53EB;&#x505A;&#x300C;&#x539F;&#x578B;&#x94FE;&#x300D;&#x3002;</strong></p><h2 id="articleHeader1">&#x5171;&#x4EAB;&#x539F;&#x578B;&#x94FE;</h2><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x8FD8;&#x6709;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj2 = { name: &apos;obj2&apos; }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> obj2 = { name: <span class="hljs-string">&apos;obj2&apos;</span> }
</code></pre><p>&#x5982;&#x56FE;:</p><p><span class="img-wrap"><img data-src="/img/bVbhwKh?w=720&amp;h=518" src="https://static.alili.tech/img/bVbhwKh?w=720&amp;h=518" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x90A3;&#x4E48; obj.toString &#x548C; obj2.toString &#x5176;&#x5B9E;&#x662F;&#x540C;&#x4E00;&#x4E1C;&#x897F;&#xFF0C; &#x4E5F;&#x5C31;&#x662F; obj2.__proto__.toString&#x3002;<br>&#x8BF4;&#x767D;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x6539;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E2A; __proto__.toString &#xFF0C;&#x90A3;&#x4E48;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5176;&#x5B9E;&#x4E5F;&#x4F1A;&#x53D8;!</p><h2 id="articleHeader2">&#x5DEE;&#x5F02;&#x5316;</h2><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8BA9; obj.toString &#x548C; obj2.toString &#x7684;&#x884C;&#x4E3A;&#x4E0D;&#x540C;&#x600E;&#x4E48;&#x505A;&#x5462;&#xFF1F;<br>&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#x5C31;&#x597D;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.toString = function(){ return &apos;&#x65B0;&#x7684; toString &#x65B9;&#x6CD5;&apos; }

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>obj.toString = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x65B0;&#x7684; toString &#x65B9;&#x6CD5;&apos;</span> }

</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhwL1?w=720&amp;h=513" src="https://static.alili.tech/img/bVbhwL1?w=720&amp;h=513" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>&#x5C0F;&#x7ED3;</strong></p><ol><li>[&#x8BFB;]&#x5C5E;&#x6027;&#x65F6;&#x4F1A;&#x6CBF;&#x7740;&#x539F;&#x578B;&#x94FE;&#x641C;&#x7D22;</li><li>[&#x65B0;&#x589E;]&#x5C5E;&#x6027;&#x65F6;&#x4E0D;&#x4F1A;&#x53BB;&#x770B;&#x539F;&#x578B;&#x94FE;</li></ol><h2 id="articleHeader3">&#x4E8C;&#x3001; this &#x7684;&#x503C;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;</h2><p>&#x4F60;&#x53EF;&#x80FD;&#x9047;&#x5230;&#x8FC7;&#x8FD9;&#x6837;&#x7684; JS &#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  foo: function(){
    console.log(this)
  }
}

var bar = obj.foo
obj.foo() // &#x6253;&#x5370;&#x51FA;&#x7684; this &#x662F; obj
bar() // &#x6253;&#x5370;&#x51FA;&#x7684; this &#x662F; window   
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> obj = {
  foo: function(){
    console.log(this)
  }
}

<span class="hljs-selector-tag">var</span> bar = obj<span class="hljs-selector-class">.foo</span>
obj.foo() <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#x7684; this &#x662F; obj</span>
<span class="hljs-function"><span class="hljs-title">bar</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#x7684; this &#x662F; window   </span>
</code></pre><p>&#x8BF7;&#x89E3;&#x91CA;&#x6700;&#x540E;&#x4E24;&#x884C;&#x51FD;&#x6570;&#x7684;&#x503C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x4E00;&#x6837;&#x3002;</p><h4>&#x51FD;&#x6570;&#x8C03;&#x7528;</h4><p>JS&#xFF08;ES5&#xFF09;&#x91CC;&#x9762;&#x6709;&#x4E09;&#x79CD;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func(p1, p2) 
obj.child.method(p1, p2)
func.call(context, p1, p2) // &#x5148;&#x4E0D;&#x8BB2; apply
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">func</span><span class="hljs-params">(p1, p2)</span></span> 
obj<span class="hljs-selector-class">.child</span><span class="hljs-selector-class">.method</span>(p1, p2)
func.call(context, p1, p2) <span class="hljs-comment">// &#x5148;&#x4E0D;&#x8BB2; apply</span>
</code></pre><p>&#x4E00;&#x822C;&#xFF0C;&#x521D;&#x5B66;&#x8005;&#x90FD;&#x77E5;&#x9053;&#x524D;&#x4E24;&#x79CD;&#x5F62;&#x5F0F;&#xFF0C;&#x800C;&#x4E14;&#x8BA4;&#x4E3A;&#x524D;&#x4E24;&#x79CD;&#x5F62;&#x5F0F;&#x300C;&#x4F18;&#x4E8E;&#x300D;&#x7B2C;&#x4E09;&#x79CD;&#x5F62;&#x5F0F;&#x3002;<br>&#x6211;&#x4EEC;&#x65B9;&#x65B9;&#x8001;&#x5E08;&#x5927;&#x59E5;&#x8BF4;&#x4E86;&#xFF0C;&#x4F60;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;&#xFF0C;&#x7B2C;&#x4E09;&#x79CD;&#x8C03;&#x7528;&#x5F62;&#x5F0F;&#xFF0C;&#x624D;&#x662F;&#x6B63;&#x5E38;&#x8C03;&#x7528;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    func.call(context, p1, p2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code style="word-break:break-word;white-space:initial">    <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(context, p1, p2)</span></span></code></pre><p>&#x5176;&#x4ED6;&#x4E24;&#x79CD;&#x90FD;&#x662F;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x53EF;&#x4EE5;&#x7B49;&#x4EF7;&#x5730;&#x53D8;&#x4E3A; call &#x5F62;&#x5F0F;&#xFF1A;</p><p>func(p1, p2)&#x7B49;&#x4EF7;&#x4E8E; func.call(undefined, p1, p2);</p><p>obj.child.method(p1, p2) &#x7B49;&#x4EF7;&#x4E8E; obj.child.method.call(obj.child, p1, p2);</p><p>&#x81F3;&#x6B64;&#x6211;&#x4EEC;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x53EA;&#x6709;&#x4E00;&#x79CD;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func.call(context, p1, p2)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code><span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(context, p1, p2)</span></span>
</code></pre><p><strong>&#x8FD9;&#x6837;&#xFF0C;this &#x5C31;&#x597D;&#x89E3;&#x91CA;&#x4E86;</strong> this&#x5C31;&#x662F;&#x4E0A;&#x9762; context&#x3002;</p><p>this &#x662F;&#x4F60; call &#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x65F6;&#x4F20;&#x7684; context&#xFF0C;&#x7531;&#x4E8E;&#x4F60;&#x4ECE;&#x6765;&#x4E0D;&#x7528; call &#x5F62;&#x5F0F;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x4E00;&#x76F4;&#x4E0D;&#x77E5;&#x9053;&#x3002;</p><p>&#x5148;&#x770B; func(p1, p2) &#x4E2D;&#x7684; this &#x5982;&#x4F55;&#x786E;&#x5B9A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5F53;&#x4F60;&#x5199;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x65F6;

function func(){
  console.log(this)
}

func()
&#x7B49;&#x4EF7;&#x4E8E;

function func(){
  console.log(this)
}

func.call(undefined) // &#x53EF;&#x4EE5;&#x7B80;&#x5199;&#x4E3A; func.call()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>&#x5F53;&#x4F60;&#x5199;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x65F6;

function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>{</span>
  console.<span class="hljs-built_in">log</span>(this)
}

<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span>
&#x7B49;&#x4EF7;&#x4E8E;

function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>{</span>
  console.<span class="hljs-built_in">log</span>(this)
}

<span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(undefined)</span> // &#x53EF;&#x4EE5;&#x7B80;&#x5199;&#x4E3A; <span class="hljs-title">func</span>.<span class="hljs-title">call</span><span class="hljs-params">()</span></span>
</code></pre><p>&#x6309;&#x7406;&#x8BF4;&#x6253;&#x5370;&#x51FA;&#x6765;&#x7684; this &#x5E94;&#x8BE5;&#x5C31;&#x662F; undefined &#x4E86;&#x5427;&#xFF0C;&#x4F46;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x6709;&#x4E00;&#x6761;&#x89C4;&#x5219;&#xFF1A;</p><blockquote>&#x5982;&#x679C;&#x4F60;&#x4F20;&#x7684; context &#x5C31; null &#x6216;&#x8005; undefined&#xFF0C;&#x90A3;&#x4E48; window &#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x9ED8;&#x8BA4;&#x7684; context&#xFF08;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x9ED8;&#x8BA4; context &#x662F; undefined&#xFF09;</blockquote><p>&#x56E0;&#x6B64;&#x4E0A;&#x9762;&#x7684;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x662F; window&#x3002;&#x5982;&#x679C;&#x4F60;&#x5E0C;&#x671B;&#x8FD9;&#x91CC;&#x7684; this &#x4E0D;&#x662F; window&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func.call(obj) // &#x90A3;&#x4E48;&#x91CC;&#x9762;&#x7684; this &#x5C31;&#x662F; obj &#x5BF9;&#x8C61;&#x4E86;     
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs swift"><code><span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(obj)</span></span> <span class="hljs-comment">// &#x90A3;&#x4E48;&#x91CC;&#x9762;&#x7684; this &#x5C31;&#x662F; obj &#x5BF9;&#x8C61;&#x4E86;     </span>
</code></pre><p>&#x56DE;&#x5230;&#x9898;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  foo: function(){
    console.log(this)
  }
}

var bar = obj.foo
obj.foo() // &#x8F6C;&#x6362;&#x4E3A; obj.foo.call(obj)&#xFF0C;this &#x5C31;&#x662F; obj
bar() 
// &#x8F6C;&#x6362;&#x4E3A; bar.call()
// &#x7531;&#x4E8E;&#x6CA1;&#x6709;&#x4F20; context
// &#x6240;&#x4EE5; this &#x5C31;&#x662F; undefined
// &#x6700;&#x540E;&#x6D4F;&#x89C8;&#x5668;&#x7ED9;&#x4F60;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x7684; this &#x2014;&#x2014; window &#x5BF9;&#x8C61;    
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> obj = {
  foo: function(){
    console.log(this)
  }
}

<span class="hljs-selector-tag">var</span> bar = obj<span class="hljs-selector-class">.foo</span>
obj.foo() <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A; obj.foo.call(obj)&#xFF0C;this &#x5C31;&#x662F; obj</span>
<span class="hljs-function"><span class="hljs-title">bar</span><span class="hljs-params">()</span></span> 
<span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E3A; bar.call()</span>
<span class="hljs-comment">// &#x7531;&#x4E8E;&#x6CA1;&#x6709;&#x4F20; context</span>
<span class="hljs-comment">// &#x6240;&#x4EE5; this &#x5C31;&#x662F; undefined</span>
<span class="hljs-comment">// &#x6700;&#x540E;&#x6D4F;&#x89C8;&#x5668;&#x7ED9;&#x4F60;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x7684; this &#x2014;&#x2014; window &#x5BF9;&#x8C61;    </span>
</code></pre><h4>[ ] &#x8BED;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn (){ console.log(this) }
var arr = [fn, fn2]
arr[0]() // &#x8FD9;&#x91CC;&#x9762;&#x7684; this &#x53C8;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F; 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code>function fn (){ console.log(this) }
var arr = [fn, fn2]
arr[<span class="hljs-string">0</span>](<span class="hljs-link"></span>) // &#x8FD9;&#x91CC;&#x9762;&#x7684; this &#x53C8;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F; 
</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A; arr<a href="#">0</a> &#x60F3;&#x8C61;&#x4E3A;arr.0( )&#xFF0C;&#x867D;&#x7136;&#x540E;&#x8005;&#x7684;&#x8BED;&#x6CD5;&#x9519;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5F62;&#x5F0F;&#x4E0E;&#x8F6C;&#x6362;&#x4EE3;&#x7801;&#x91CC;&#x7684; obj.child.method(p1, p2) &#x5BF9;&#x5E94;&#x4E0A;&#x4E86;&#xFF0C;&#x4E8E;&#x662F;&#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x7684;&#x8F6C;&#x6362;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    arr[0]() " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial">    <span class="hljs-selector-tag">arr</span><span class="hljs-selector-attr">[0]</span>() </code></pre><p>&#x5047;&#x60F3;&#x4E3A; arr.0()<br>&#x7136;&#x540E;&#x8F6C;&#x6362;&#x4E3A; arr.0.call(arr)<br>&#x90A3;&#x4E48;&#x91CC;&#x9762;&#x7684; this &#x5C31;&#x662F; arr &#x4E86; :)</p><p><strong>&#x5C0F;&#x7ED3;&#xFF1A;</strong></p><ol><li>this &#x5C31;&#x662F;&#x4F60; call &#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4F20;&#x5165;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x3002;</li><li>&#x5982;&#x679C;&#x4F60;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E0D;&#x662F; call &#x5F62;&#x5F0F;&#xFF0C; &#x8BF7;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A; call &#x5F62;&#x5F0F;</li></ol><h2 id="articleHeader4">&#x4E09;&#x3001;JS &#x7684; new &#x5230;&#x5E95;&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;&#xFF1F;</h2><p>&#x6211;&#x4EEC;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x58EB;&#x5175;&#xFF0C;&#x5177;&#x6709;&#x5982;&#x4E0B;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var &#x58EB;&#x5175; = {
  ID: 1, // &#x7528;&#x4E8E;&#x533A;&#x5206;&#x6BCF;&#x4E2A;&#x58EB;&#x5175;
  &#x5175;&#x79CD;:&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;,
  &#x653B;&#x51FB;&#x529B;:5,
  &#x751F;&#x547D;&#x503C;:42, 
  &#x884C;&#x8D70;:function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/},
  &#x5954;&#x8DD1;:function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  },
  &#x6B7B;&#x4EA1;:function(){ /*Go die*/    },
  &#x653B;&#x51FB;:function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   },
  &#x9632;&#x5FA1;:function(){ /*&#x62A4;&#x8138;*/       }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> &#x58EB;&#x5175; = {
  ID: <span class="hljs-number">1</span>, <span class="hljs-comment">// &#x7528;&#x4E8E;&#x533A;&#x5206;&#x6BCF;&#x4E2A;&#x58EB;&#x5175;</span>
  &#x5175;&#x79CD;:<span class="hljs-string">&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;</span>,
  &#x653B;&#x51FB;&#x529B;:<span class="hljs-number">5</span>,
  &#x751F;&#x547D;&#x503C;:<span class="hljs-number">42</span>, 
  &#x884C;&#x8D70;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/</span>},
  &#x5954;&#x8DD1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/</span>  },
  &#x6B7B;&#x4EA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*Go die*/</span>    },
  &#x653B;&#x51FB;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/</span>   },
  &#x9632;&#x5FA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x62A4;&#x8138;*/</span>       }
}
</code></pre><p>&#x6211;&#x4EEC;&#x5236;&#x9020;&#x4E00;&#x4E2A;&#x58EB;&#x5175;&#xFF0C; &#x53EA;&#x9700;&#x8981;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5175;&#x8425;.&#x5236;&#x9020;(&#x58EB;&#x5175;)     
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>&#x5175;&#x8425;.&#x5236;&#x9020;<span class="hljs-comment">(&#x58EB;&#x5175;)</span>     
    </code></pre><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x5236;&#x9020; 100 &#x4E2A;&#x58EB;&#x5175;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5FAA;&#x73AF; 100 &#x6B21;&#x5427;&#xFF1A;

var &#x58EB;&#x5175;&#x4EEC; = []
var &#x58EB;&#x5175;
for(var i=0; i&lt;100; i++){
  &#x58EB;&#x5175; = {
    ID: i, // ID &#x4E0D;&#x80FD;&#x91CD;&#x590D;
    &#x5175;&#x79CD;:&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;,
    &#x653B;&#x51FB;&#x529B;:5,
    &#x751F;&#x547D;&#x503C;:42, 
    &#x884C;&#x8D70;:function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/}&#xFF0C;
    &#x5954;&#x8DD1;:function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  },
    &#x6B7B;&#x4EA1;:function(){ /*Go die*/    },
    &#x653B;&#x51FB;:function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   },
    &#x9632;&#x5FA1;:function(){ /*&#x62A4;&#x8138;*/       }
  }
  &#x58EB;&#x5175;&#x4EEC;.push(&#x58EB;&#x5175;)
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&#x5FAA;&#x73AF; <span class="hljs-number">100</span> &#x6B21;&#x5427;&#xFF1A;

<span class="hljs-keyword">var</span> &#x58EB;&#x5175;&#x4EEC; = []
<span class="hljs-keyword">var</span> &#x58EB;&#x5175;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">100</span>; i++){
  &#x58EB;&#x5175; = {
    ID: i, <span class="hljs-comment">// ID &#x4E0D;&#x80FD;&#x91CD;&#x590D;</span>
    &#x5175;&#x79CD;:<span class="hljs-string">&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;</span>,
    &#x653B;&#x51FB;&#x529B;:<span class="hljs-number">5</span>,
    &#x751F;&#x547D;&#x503C;:<span class="hljs-number">42</span>, 
    &#x884C;&#x8D70;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/</span>}&#xFF0C;
    &#x5954;&#x8DD1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/</span>  },
    &#x6B7B;&#x4EA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*Go die*/</span>    },
    &#x653B;&#x51FB;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/</span>   },
    &#x9632;&#x5FA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x62A4;&#x8138;*/</span>       }
  }
  &#x58EB;&#x5175;&#x4EEC;.push(&#x58EB;&#x5175;)
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
</code></pre><p>&#x54CE;&#x5440;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x597D;&#x7B80;&#x5355;</p><h4>&#x8D28;&#x7591;</h4><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x6D6A;&#x8D39;&#x4E86;&#x5F88;&#x591A;&#x5185;&#x5B58;</p><ol><li>&#x884C;&#x8D70;&#x3001;&#x5954;&#x8DD1;&#x3001;&#x6B7B;&#x4EA1;&#x3001;&#x653B;&#x51FB;&#x3001;&#x9632;&#x5FA1;&#x8FD9;&#x4E94;&#x4E2A;&#x52A8;&#x4F5C;&#x5BF9;&#x4E8E;&#x6BCF;&#x4E2A;&#x58EB;&#x5175;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5404;&#x81EA;&#x5F15;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x6CA1;&#x5FC5;&#x8981;&#x91CD;&#x590D;&#x521B;&#x5EFA; 100 &#x4E2A;&#x884C;&#x8D70;&#x3001;100&#x4E2A;&#x5954;&#x8DD1;&#x2026;&#x2026;</li><li>&#x8FD9;&#x4E9B;&#x58EB;&#x5175;&#x7684;&#x5175;&#x79CD;&#x548C;&#x653B;&#x51FB;&#x529B;&#x90FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x6CA1;&#x5FC5;&#x8981;&#x521B;&#x5EFA; 100 &#x6B21;&#x3002;</li><li>&#x53EA;&#x6709; ID &#x548C;&#x751F;&#x547D;&#x503C;&#x9700;&#x8981;&#x521B;&#x5EFA; 100 &#x6B21;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x4E2A;&#x58EB;&#x5175;&#x6709;&#x81EA;&#x5DF1;&#x7684; ID &#x548C;&#x751F;&#x547D;&#x503C;&#x3002;</li></ol><h4>&#x6539;&#x8FDB;</h4><p>&#x901A;&#x8FC7;&#x7B2C;&#x4E00;&#x8282;&#x53EF;&#x4EE5;&#x77E5;&#x9053; &#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x6765;&#x89E3;&#x51B3;&#x91CD;&#x590D;&#x521B;&#x5EFA;&#x7684;&#x95EE;&#x9898;&#xFF1A;&#x6211;&#x4EEC;&#x5148;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x300C;&#x58EB;&#x5175;&#x539F;&#x578B;&#x300D;&#xFF0C;&#x7136;&#x540E;&#x8BA9;&#x300C;&#x58EB;&#x5175;&#x300D;&#x7684; <strong>proto</strong> &#x6307;&#x5411;&#x300C;&#x58EB;&#x5175;&#x539F;&#x578B;&#x300D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var &#x58EB;&#x5175;&#x539F;&#x578B; = {
  &#x5175;&#x79CD;:&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;,
  &#x653B;&#x51FB;&#x529B;:5,
  &#x884C;&#x8D70;:function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/}&#xFF0C;
  &#x5954;&#x8DD1;:function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  },
  &#x6B7B;&#x4EA1;:function(){ /*Go die*/    },
  &#x653B;&#x51FB;:function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   },
  &#x9632;&#x5FA1;:function(){ /*&#x62A4;&#x8138;*/       }
}

var &#x58EB;&#x5175;&#x4EEC; = []
var &#x58EB;&#x5175;
for(var i=0; i&lt;100; i++){
  &#x58EB;&#x5175; = {
    ID: i, // ID &#x4E0D;&#x80FD;&#x91CD;&#x590D;
    &#x751F;&#x547D;&#x503C;:42
  }

  /*&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x4E2D;&#x4E0D;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF0C;&#x56E0;&#x4E3A; __proto__ &#x4E0D;&#x662F;&#x6807;&#x51C6;&#x5C5E;&#x6027;*/
  &#x58EB;&#x5175;.__proto__ = &#x58EB;&#x5175;&#x539F;&#x578B; 

  &#x58EB;&#x5175;&#x4EEC;.push(&#x58EB;&#x5175;)
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> &#x58EB;&#x5175;&#x539F;&#x578B; = {
  &#x5175;&#x79CD;:<span class="hljs-string">&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;</span>,
  &#x653B;&#x51FB;&#x529B;:<span class="hljs-number">5</span>,
  &#x884C;&#x8D70;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/</span>}&#xFF0C;
  &#x5954;&#x8DD1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/</span>  },
  &#x6B7B;&#x4EA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*Go die*/</span>    },
  &#x653B;&#x51FB;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/</span>   },
  &#x9632;&#x5FA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x62A4;&#x8138;*/</span>       }
}

<span class="hljs-keyword">var</span> &#x58EB;&#x5175;&#x4EEC; = []
<span class="hljs-keyword">var</span> &#x58EB;&#x5175;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">100</span>; i++){
  &#x58EB;&#x5175; = {
    ID: i, <span class="hljs-comment">// ID &#x4E0D;&#x80FD;&#x91CD;&#x590D;</span>
    &#x751F;&#x547D;&#x503C;:<span class="hljs-number">42</span>
  }

  <span class="hljs-comment">/*&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x4E2D;&#x4E0D;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF0C;&#x56E0;&#x4E3A; __proto__ &#x4E0D;&#x662F;&#x6807;&#x51C6;&#x5C5E;&#x6027;*/</span>
  &#x58EB;&#x5175;.__proto__ = &#x58EB;&#x5175;&#x539F;&#x578B; 

  &#x58EB;&#x5175;&#x4EEC;.push(&#x58EB;&#x5175;)
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
</code></pre><h4>&#x4F18;&#x96C5;&#xFF1F;</h4><p>&#x6709;&#x4EBA;&#x6307;&#x51FA;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x58EB;&#x5175;&#x7684;&#x4EE3;&#x7801;&#x5206;&#x6563;&#x5728;&#x4E24;&#x4E2A;&#x5730;&#x65B9;&#x5F88;&#x4E0D;&#x4F18;&#x96C5;&#xFF0C;&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x628A;&#x8FD9;&#x4E24;&#x90E8;&#x5206;&#x8054;&#x7CFB;&#x8D77;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function &#x58EB;&#x5175;(ID){
  var &#x4E34;&#x65F6;&#x5BF9;&#x8C61; = {};
  &#x4E34;&#x65F6;&#x5BF9;&#x8C61;.__proto__ = &#x58EB;&#x5175;.&#x539F;&#x578B;;
  &#x4E34;&#x65F6;&#x5BF9;&#x8C61;.ID = ID;
  &#x4E34;&#x65F6;&#x5BF9;&#x8C61;.&#x751F;&#x547D;&#x503C; = 42;
  
  return &#x4E34;&#x65F6;&#x5BF9;&#x8C61;;
}  

&#x58EB;&#x5175;.&#x539F;&#x578B; = {
  &#x5175;&#x79CD;:&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;,
  &#x653B;&#x51FB;&#x529B;:5,
  &#x884C;&#x8D70;:function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/}&#xFF0C;
  &#x5954;&#x8DD1;:function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  },
  &#x6B7B;&#x4EA1;:function(){ /*Go die*/    },
  &#x653B;&#x51FB;:function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   },
  &#x9632;&#x5FA1;:function(){ /*&#x62A4;&#x8138;*/       }
}

// &#x4FDD;&#x5B58;&#x4E3A;&#x6587;&#x4EF6;&#xFF1A;&#x58EB;&#x5175;.js

 &#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x5730;&#x5F15;&#x7528;&#x300C;&#x58EB;&#x5175;&#x300D;&#x6765;&#x521B;&#x5EFA;&#x58EB;&#x5175;&#x4E86;&#xFF1A;

var &#x58EB;&#x5175;&#x4EEC; = []
for(var i=0; i&lt;100; i++){
  &#x58EB;&#x5175;&#x4EEC;.push(&#x58EB;&#x5175;(i))
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> &#x58EB;&#x5175;(<span class="hljs-params">ID</span>)</span>{
  <span class="hljs-keyword">var</span> &#x4E34;&#x65F6;&#x5BF9;&#x8C61; = {};
  &#x4E34;&#x65F6;&#x5BF9;&#x8C61;.__proto__ = &#x58EB;&#x5175;.&#x539F;&#x578B;;
  &#x4E34;&#x65F6;&#x5BF9;&#x8C61;.ID = ID;
  &#x4E34;&#x65F6;&#x5BF9;&#x8C61;.&#x751F;&#x547D;&#x503C; = <span class="hljs-number">42</span>;
  
  <span class="hljs-keyword">return</span> &#x4E34;&#x65F6;&#x5BF9;&#x8C61;;
}  

&#x58EB;&#x5175;.&#x539F;&#x578B; = {
  &#x5175;&#x79CD;:<span class="hljs-string">&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;</span>,
  &#x653B;&#x51FB;&#x529B;:<span class="hljs-number">5</span>,
  &#x884C;&#x8D70;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/</span>}&#xFF0C;
  &#x5954;&#x8DD1;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/</span>  },
  &#x6B7B;&#x4EA1;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*Go die*/</span>    },
  &#x653B;&#x51FB;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/</span>   },
  &#x9632;&#x5FA1;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x62A4;&#x8138;*/</span>       }
}

<span class="hljs-comment">// &#x4FDD;&#x5B58;&#x4E3A;&#x6587;&#x4EF6;&#xFF1A;&#x58EB;&#x5175;.js</span>

 &#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x5730;&#x5F15;&#x7528;&#x300C;&#x58EB;&#x5175;&#x300D;&#x6765;&#x521B;&#x5EFA;&#x58EB;&#x5175;&#x4E86;&#xFF1A;

<span class="hljs-keyword">var</span> &#x58EB;&#x5175;&#x4EEC; = []
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">100</span>; i++){
  &#x58EB;&#x5175;&#x4EEC;.push(&#x58EB;&#x5175;(i))
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
</code></pre><p>JS &#x4E4B;&#x7236;&#x770B;&#x5230;&#x5927;&#x5BB6;&#x90FD;&#x8FD9;&#x4E48;&#x641E;&#xFF0C;&#x89C9;&#x5F97;&#x4F55;&#x5FC5;&#x5462;&#xFF0C;&#x6211;&#x7ED9;&#x4F60;&#x4EEC;&#x4E2A;&#x7CD6;&#x5403;&#xFF0C;&#x4E8E;&#x662F; JS &#x4E4B;&#x7236;&#x521B;&#x5EFA;&#x4E86; new &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x5C11;&#x5199;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhylM?w=720&amp;h=517" src="https://static.alili.tech/img/bVbhylM?w=720&amp;h=517" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x53EA;&#x8981;&#x4F60;&#x5728;&#x58EB;&#x5175;&#x524D;&#x9762;&#x4F7F;&#x7528; new &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x5C11;&#x505A;&#x56DB;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;</strong></p><ol><li>&#x4E0D;&#x7528;&#x521B;&#x5EFA;&#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A; new &#x4F1A;&#x5E2E;&#x4F60;&#x505A;&#xFF08;&#x4F60;&#x4F7F;&#x7528;&#x300C;this&#x300D;&#x5C31;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#xFF09;&#xFF1B;</li><li>&#x4E0D;&#x7528;&#x7ED1;&#x5B9A;&#x539F;&#x578B;&#xFF0C;&#x56E0;&#x4E3A;new &#x4F1A;&#x5E2E;&#x4F60;&#x505A;(new &#x4E3A;&#x4E86;&#x77E5;&#x9053;&#x539F;&#x578B;&#x5728;&#x54EA;&#xFF0C;&#x6240;&#x4EE5;&#x6307;&#x5B9A;&#x539F;&#x578B;&#x7684;&#x540D;&#x5B57; prototype);</li><li>&#x4E0D;&#x7528; return &#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A; new &#x4F1A;&#x5E2E;&#x4F60;&#x505A;&#xFF1B;</li><li>&#x4E0D;&#x8981;&#x7ED9;&#x539F;&#x578B;&#x60F3;&#x540D;&#x5B57;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A; new &#x6307;&#x5B9A;&#x540D;&#x5B57;&#x4E3A; prototype&#x3002;</li></ol><h4>&#x8FD9;&#x4E00;&#x6B21;&#x7528; new &#x6765;&#x5199;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function &#x58EB;&#x5175;(ID){
  this.ID = ID
  this.&#x751F;&#x547D;&#x503C; = 42
}

&#x58EB;&#x5175;.prototype = {
  &#x5175;&#x79CD;:&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;,
  &#x653B;&#x51FB;&#x529B;:5,
  &#x884C;&#x8D70;:function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/},
  &#x5954;&#x8DD1;:function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  },
  &#x6B7B;&#x4EA1;:function(){ /*Go die*/    },
  &#x653B;&#x51FB;:function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   },
  &#x9632;&#x5FA1;:function(){ /*&#x62A4;&#x8138;*/       }
}

// &#x4FDD;&#x5B58;&#x4E3A;&#x6587;&#x4EF6;&#xFF1A;&#x58EB;&#x5175;.js
&#x7136;&#x540E;&#x662F;&#x521B;&#x5EFA;&#x58EB;&#x5175;&#xFF08;&#x52A0;&#x4E86;&#x4E00;&#x4E2A; new &#x5173;&#x952E;&#x5B57;&#xFF09;&#xFF1A;

var &#x58EB;&#x5175;&#x4EEC; = []
for(var i=0; i&lt;100; i++){
  &#x58EB;&#x5175;&#x4EEC;.push(new &#x58EB;&#x5175;(i))
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> &#x58EB;&#x5175;(<span class="hljs-params">ID</span>)</span>{
  <span class="hljs-keyword">this</span>.ID = ID
  <span class="hljs-keyword">this</span>.&#x751F;&#x547D;&#x503C; = <span class="hljs-number">42</span>
}

&#x58EB;&#x5175;.prototype = {
  &#x5175;&#x79CD;:<span class="hljs-string">&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;</span>,
  &#x653B;&#x51FB;&#x529B;:<span class="hljs-number">5</span>,
  &#x884C;&#x8D70;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/</span>},
  &#x5954;&#x8DD1;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/</span>  },
  &#x6B7B;&#x4EA1;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*Go die*/</span>    },
  &#x653B;&#x51FB;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/</span>   },
  &#x9632;&#x5FA1;:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/*&#x62A4;&#x8138;*/</span>       }
}

<span class="hljs-comment">// &#x4FDD;&#x5B58;&#x4E3A;&#x6587;&#x4EF6;&#xFF1A;&#x58EB;&#x5175;.js</span>
&#x7136;&#x540E;&#x662F;&#x521B;&#x5EFA;&#x58EB;&#x5175;&#xFF08;&#x52A0;&#x4E86;&#x4E00;&#x4E2A; <span class="hljs-keyword">new</span> &#x5173;&#x952E;&#x5B57;&#xFF09;&#xFF1A;

<span class="hljs-keyword">var</span> &#x58EB;&#x5175;&#x4EEC; = []
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">100</span>; i++){
  &#x58EB;&#x5175;&#x4EEC;.push(<span class="hljs-keyword">new</span> &#x58EB;&#x5175;(i))
}

&#x5175;&#x8425;.&#x6279;&#x91CF;&#x5236;&#x9020;(&#x58EB;&#x5175;&#x4EEC;)
</code></pre><p><strong>new &#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x5C31;&#x662F;&#x7701;&#x90A3;&#x4E48;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#x3002;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF09;</strong></p><h4>&#x6CE8;&#x610F; constructor &#x5C5E;&#x6027;</h4><p>new &#x64CD;&#x4F5C;&#x4E3A;&#x4E86;&#x8BB0;&#x5F55;&#x300C;&#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#x662F;&#x7531;&#x54EA;&#x4E2A;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x7684;&#x300D;&#xFF0C;&#x6240;&#x4EE5;&#x9884;&#x5148;&#x7ED9;&#x300C;&#x58EB;&#x5175;.prototype&#x300D;&#x52A0;&#x4E86;&#x4E00;&#x4E2A; constructor &#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x58EB;&#x5175;.prototype = {
  constructor: &#x58EB;&#x5175;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code>&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span> = {
  constructor: &#x58EB;&#x5175;
}
</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x91CD;&#x65B0;&#x5BF9;&#x300C;&#x58EB;&#x5175;.prototype&#x300D;&#x8D4B;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A; constructor &#x5C5E;&#x6027;&#x5C31;&#x6CA1;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x5E94;&#x8BE5;&#x8FD9;&#x4E48;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x58EB;&#x5175;.prototype.&#x5175;&#x79CD; = &quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;
&#x58EB;&#x5175;.prototype.&#x653B;&#x51FB;&#x529B; = 5
&#x58EB;&#x5175;.prototype.&#x884C;&#x8D70; = function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/}
&#x58EB;&#x5175;.prototype.&#x5954;&#x8DD1; = function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  }
&#x58EB;&#x5175;.prototype.&#x6B7B;&#x4EA1; = function(){ /*Go die*/    }
&#x58EB;&#x5175;.prototype.&#x653B;&#x51FB; = function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   }
&#x58EB;&#x5175;.prototype.&#x9632;&#x5FA1; = function(){ /*&#x62A4;&#x8138;*/       }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code>&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x5175;&#x79CD; = &quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;
&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x653B;&#x51FB;&#x529B; = 5
&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x884C;&#x8D70; = function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/}
&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x5954;&#x8DD1; = function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  }
&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x6B7B;&#x4EA1; = function(){ /*<span class="hljs-type">Go</span> die*/    }
&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x653B;&#x51FB; = function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   }
&#x58EB;&#x5175;.proto<span class="hljs-keyword">type</span>.&#x9632;&#x5FA1; = function(){ /*&#x62A4;&#x8138;*/       }
</code></pre><p>&#x6216;&#x8005;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x7ED9; constructor &#x91CD;&#x65B0;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x58EB;&#x5175;.prototype = {
  constructor: &#x58EB;&#x5175;,
  &#x5175;&#x79CD;:&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;,
  &#x653B;&#x51FB;&#x529B;:5,
  &#x884C;&#x8D70;:function(){ /*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/},
  &#x5954;&#x8DD1;:function(){ /*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/  },
  &#x6B7B;&#x4EA1;:function(){ /*Go die*/    },
  &#x653B;&#x51FB;:function(){ /*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/   },
  &#x9632;&#x5FA1;:function(){ /*&#x62A4;&#x8138;*/       }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&#x58EB;&#x5175;.prototype = {
  constructor: &#x58EB;&#x5175;,
  &#x5175;&#x79CD;:<span class="hljs-string">&quot;&#x7F8E;&#x56FD;&#x5927;&#x5175;&quot;</span>,
  &#x653B;&#x51FB;&#x529B;:<span class="hljs-number">5</span>,
  &#x884C;&#x8D70;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x8D70;&#x4FE9;&#x6B65;&#x7684;&#x4EE3;&#x7801;*/</span>},
  &#x5954;&#x8DD1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x72C2;&#x5954;&#x7684;&#x4EE3;&#x7801;*/</span>  },
  &#x6B7B;&#x4EA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*Go die*/</span>    },
  &#x653B;&#x51FB;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x7CCA;&#x4ED6;&#x718A;&#x8138;*/</span>   },
  &#x9632;&#x5FA1;:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/*&#x62A4;&#x8138;*/</span>       }
}
</code></pre><h2 id="articleHeader5">&#x56DB;&#x3001;&#x7EE7;&#x627F;</h2><p><strong>&#x7EE7;&#x627F;&#x7684;&#x672C;&#x8D28;&#x5C31;&#x662F;&#x4E0A;&#x9762;&#x7684;&#x8BB2;&#x7684;&#x539F;&#x578B;&#x94FE;</strong></p><h4>1)&#x501F;&#x52A9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Parent1() {
   this.name = &apos;parent1&apos;;
 }
 
 Parent1.prototype.say = function () {}
 
 function Child1() {
   Parent1.call(this);
   this.type = &apos;child&apos;;
 }

 console.log(new Child1);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent1</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;parent1&apos;</span>;
 }
 
 Parent1.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
 
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child1</span>(<span class="hljs-params"></span>) </span>{
   Parent1.call(<span class="hljs-keyword">this</span>);
   <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;child&apos;</span>;
 }

 <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Child1);
</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhyVw?w=361&amp;h=159" src="https://static.alili.tech/img/bVbhyVw?w=361&amp;h=159" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x662F;&#x501F;&#x7528;call &#x6765;&#x6539;&#x53D8;this&#x7684;&#x6307;&#x5411;&#xFF0C;&#x901A;&#x8FC7; call &#x8C03;&#x7528; Parent &#xFF0C;&#x6B64;&#x65F6; Parent &#x4E2D;&#x7684; this &#x662F;&#x6307; Child1&#x3002;&#x6709;&#x4E2A;&#x7F3A;&#x70B9;&#xFF0C;&#x4ECE;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x770B;&#x51FA; Child1&#x5E76;&#x6CA1;&#x6709;say&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x79CD;&#x53EA;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x539F;&#x578B;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;&#x3002;</p><h4>2)&#x501F;&#x52A9;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x501F;&#x52A9;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;
 */
function Parent2() {
  this.name = &apos;parent2&apos;;
  this.play = [1, 2, 3];
}

function Child2() {
  this.type = &apos;child2&apos;;
}
Child2.prototype = new Parent2();

console.log(new Child2);

var s1 = new Child2();
var s2 = new Child2();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-comment">/**
 * &#x501F;&#x52A9;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent2</span></span>() {
  <span class="hljs-built_in">this</span>.name = <span class="hljs-string">&apos;parent2&apos;</span>;
  <span class="hljs-built_in">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child2</span></span>() {
  <span class="hljs-built_in">this</span>.type = <span class="hljs-string">&apos;child2&apos;</span>;
}
Child2.prototype = <span class="hljs-keyword">new</span> <span class="hljs-type">Parent2</span>();

console.log(<span class="hljs-keyword">new</span> <span class="hljs-type">Child2</span>);

<span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child2</span>();
<span class="hljs-keyword">var</span> s2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child2</span>();
</code></pre><p>&#x6253;&#x5370;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhy4U?w=362&amp;h=282" src="https://static.alili.tech/img/bVbhy4U?w=362&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x901A;&#x8FC7;&#x4E00;&#x8BB2;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x8981;&#x5171;&#x4EAB;&#x83AB;&#x4E9B;&#x5C5E;&#x6027;&#xFF0C;&#x9700;&#x8981; &#x5BF9;&#x8C61;.__proto__ = &#x7236;&#x4EB2;&#x5BF9;&#x8C61;&#x7684;.prototype,&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x4EEC;&#x662F;&#x4E0D;&#x80FD;&#x76F4;&#x63A5; &#x64CD;&#x4F5C;__proto__&#xFF0C;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x501F;&#x7528; new &#x6765;&#x505A;&#xFF0C;&#x6240;&#x4EE5;<br>Child2.prototype = new Parent2(); &lt;=&gt; Child2.prototype.__proto__ = Parent2.prototype; &#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x501F;&#x52A9; new &#x8FD9;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x3002;&#x4F46;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x603B;&#x662F;&#xFF0C;&#x5982;&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9; s1.play&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x503C; &#xFF0C;s2 &#x4E5F;&#x8DDF;&#x7740;&#x6539;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x662F;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x7F3A;&#x70B9;&#xFF0C;&#x539F;&#x56E0;&#x662F; s1.__pro__ &#x548C; s2.__pro__&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5730;&#x5740;&#x5373; &#x7236;&#x7C7B;&#x7684;prototype&#x3002;</p><h4>3)&#x7EC4;&#x5408;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x7EC4;&#x5408;&#x65B9;&#x5F0F;
 */

function Parent3() {
  this.name = &apos;parent3&apos;;
  this.play = [1, 2, 3];
}

Parent3.prototype.say = function () { }

function Child3 () {
  Parent3.call(this);
  this.type = &apos;child3&apos;;
}

Child3.prototype = new Parent3();

var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(new Child3);
console.log(s3.play, s4.play)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * &#x7EC4;&#x5408;&#x65B9;&#x5F0F;
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent3</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;parent3&apos;</span>;
  <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
}

Parent3.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child3</span> (<span class="hljs-params"></span>) </span>{
  Parent3.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;child3&apos;</span>;
}

Child3.prototype = <span class="hljs-keyword">new</span> Parent3();

<span class="hljs-keyword">var</span> s3 = <span class="hljs-keyword">new</span> Child3();
<span class="hljs-keyword">var</span> s4 = <span class="hljs-keyword">new</span> Child3();
s3.play.push(<span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Child3);
<span class="hljs-built_in">console</span>.log(s3.play, s4.play)
</code></pre><p>&#x6253;&#x5370;:</p><p><span class="img-wrap"><img data-src="/img/bVbhzaf?w=514&amp;h=330" src="https://static.alili.tech/img/bVbhzaf?w=514&amp;h=330" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5C06; 1 &#x548C; 2 &#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;1&#x548C;2&#x5B58;&#x5728;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E3A;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6709;&#x70B9;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x6211;&#x5B9E;&#x4F8B;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#xFF0C; &#x7236;&#x7C7B; new &#x4E86;&#x4E24;&#x6B21;&#xFF0C;&#x4E00;&#x6B21;&#x662F;var s3 = new Child3()&#x5BF9;&#x5E94; Child3.prototype = new Parent3()&#x8FD8;&#x8981;new &#x4E00;&#x6B21;&#x3002;</p><h4>4)&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x4F18;&#x5316;1</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent4() {
  this.name = &apos;parent4&apos;;
  this.play = [1, 2, 3];
}

Parent4.prototype.say = function () { }

function Child4() {
  Parent4.call(this);
  this.type = &apos;child4&apos;;
}

Child4.prototype = Parent4.prototype;

var s5 = new Child4();
var s6 = new Child4();


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent4</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;parent4&apos;</span>;
  <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
}

Parent4.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child4</span><span class="hljs-params">()</span> </span>{
  Parent4.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;child4&apos;</span>;
}

Child4.prototype = Parent4.prototype;

<span class="hljs-keyword">var</span> s5 = <span class="hljs-keyword">new</span> Child4();
<span class="hljs-keyword">var</span> s6 = <span class="hljs-keyword">new</span> Child4();


</code></pre><p>&#x8FD9;&#x8FB9;&#x4E3B;&#x8981;&#x4E3A; Child4.prototype = Parent4.prototype&#xFF0C; &#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x73B0;&#x5728;&#x6211;&#x60F3;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#x7ED9;&#x6211;&#x5C31;&#x884C;&#xFF0C;&#x4E0D;&#x7528;&#x5728;&#x53BB; new &#x4E00;&#x6B21;&#x7236;&#x7C7B;&#x3002;&#x5176;&#x5B9E;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x8FD8;&#x662F;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x4EE5;&#x4E0B;&#x4E24;&#x53E5;:</p><p><span class="img-wrap"><img data-src="/img/bVbhzvX?w=514&amp;h=288" src="https://static.alili.tech/img/bVbhzvX?w=514&amp;h=288" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>&#x4ECE;&#x6253;&#x5370;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x6B64;&#x65F6;&#x6211;&#x662F;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x533A;&#x5206;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61; &#x662F;&#x76F4;&#x63A5; &#x7531;&#x5B83;&#x7684;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x8FD8;&#x662F;&#x7236;&#x7C7B;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x5224;&#x65AD;&#x6765;&#x5224;&#x65AD;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x662F;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x7528; constructor,&#x6211;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhzwq?w=580&amp;h=204" src="https://static.alili.tech/img/bVbhzwq?w=580&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x54A6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5B83;&#x6307;&#x5411;&#x7684;&#x662F;&#x7236;&#x7C7B; &#xFF0C;&#x8FD9;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#xFF0C; &#x4E0A;&#x9762;&#x8BB2;&#x8FC7;&#x6211;&#x4EEC; prototype&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E2A; constructor, &#x800C;&#x6211;&#x4EEC;&#x6B64;&#x65F6;&#x5B50;&#x7C7B;&#x7684; prototype &#x6307;&#x5411;&#x662F; &#x7236;&#x7C7B;&#x7684; prototye ,&#x800C;&#x7236;&#x7C7B;prototype&#x91CC;&#x9762;&#x7684;contructor&#x5F53;&#x7136;&#x662F;&#x7236;&#x7C7B;&#x81EA;&#x5DF1;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x4EA7;&#x751F;&#x8BE5;&#x95EE;&#x9898;&#x7684;&#x539F;&#x56E0;&#x3002;</p><h4>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x4F18;&#x5316;2</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x4F18;&#x5316;2
 */

function Parent5() {
  this.name = &apos;parent4&apos;;
  this.play = [1, 2, 3];
}

Parent5.prototype.say = function () { }

function Child5() {
  Parent5.call(this);
  this.type = &apos;child4&apos;;
}

Child5.prototype = Object.create(Parent5.prototype);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * &#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x4F18;&#x5316;2
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent5</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;parent4&apos;</span>;
  <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
}

Parent5.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child5</span>(<span class="hljs-params"></span>) </span>{
  Parent5.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;child4&apos;</span>;
}

Child5.prototype = <span class="hljs-built_in">Object</span>.create(Parent5.prototype);
</code></pre><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x4F7F;&#x7528;<strong>Object.create()</strong>&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x5BF9;&#x8C61;&#x7EE7;&#x627F;&#x5230;__proto__&#x5C5E;&#x6027;&#x4E0A;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = Object.create({x:123,y:345});
console.log(test);//{}
console.log(test.x);//123
console.log(test.__proto__.x);//3
console.log(test.__proto__.x === test.x);//true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span> = Object.create({x:123,y:345});
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>);<span class="hljs-comment">//{}</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>.x);<span class="hljs-comment">//123</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>.__proto__.x);<span class="hljs-comment">//3</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>.__proto__.x === <span class="hljs-keyword">test</span>.x);<span class="hljs-comment">//true</span>
</code></pre><p>&#x90A3;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x8BF4;&#x8FD9;&#x6837;&#x89E3;&#x51B3;&#x4E86;&#x5417;&#xFF0C;&#x5176;&#x5B9E;&#x6CA1;&#x6709;&#x89E3;&#x51B3;,&#x56E0;&#x4E3A;&#x8FD9;&#x65F6; Child5.prototype &#x8FD8;&#x662F;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684; constructor,&#x5B83;&#x8981;&#x627E;&#x7684;&#x8BDD;&#x8FD8;&#x662F;&#x5411;&#x81EA;&#x5DF1;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x627E;&#x6700;&#x540E;&#x8FD8;&#x662F;&#x627E;&#x5230; Parent5.prototype, constructor&#x8FD8;&#x662F; Parent5 ,&#x6240;&#x4EE5;&#x8981;&#x7ED9; Child5.prototype &#x5199;&#x81EA;&#x5DF1;&#x7684; constructor:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-type">Child5</span>.proto<span class="hljs-keyword">type</span> = <span class="hljs-type">Object</span>.create(<span class="hljs-type">Parent5</span>.prototype);
<span class="hljs-type">Child5</span>.proto<span class="hljs-keyword">type</span>.constructor = <span class="hljs-type">Child5</span>;
</code></pre><h4>&#x53C2;&#x8003;</h4><blockquote><a href="https://zhuanlan.zhihu.com/p/23090041?refer=study-fe" rel="nofollow noreferrer" target="_blank">&#x4EC0;&#x4E48;&#x662F; JS &#x539F;&#x578B;&#x94FE;&#xFF1F;</a><br><a href="https://zhuanlan.zhihu.com/p/23804247" rel="nofollow noreferrer" target="_blank">this &#x7684;&#x503C;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x4E00;&#x6B21;&#x8BF4;&#x6E05;&#x695A;</a><br><a href="https://zhuanlan.zhihu.com/p/23987456?refer=study-fe" rel="nofollow noreferrer" target="_blank">JS &#x7684; new &#x5230;&#x5E95;&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;&#xFF1F;</a></blockquote><p><strong>&#x4E00;&#x4E2A;&#x7B28;&#x7B28;&#x7684;&#x7801;&#x519C;&#xFF0C;&#x6211;&#x7684;&#x4E16;&#x754C;&#x53EA;&#x6709;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbg32a?w=258&amp;h=258" src="https://static.alili.tech/img/bVbg32a?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
搞懂 Javascript 继承原理

## 原文链接
[https://segmentfault.com/a/1190000016542417](https://segmentfault.com/a/1190000016542417)


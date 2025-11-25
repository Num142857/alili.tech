---
title: JS里深拷贝和浅拷贝的释义
hidden: true
categories: [reprint]
slug: b8479e8d
date: 2018-11-03 10:03:44
---

{{< raw >}}
<p>&#x672C;&#x6587;&#x89E3;&#x91CA;javascript&#x4E2D;&#x6DF1;&#x62F7;&#x8D1D;&#x548C;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x533A;&#x522B;&#x3002;</p><h2 id="articleHeader0">&#x6D45;&#x62F7;&#x8D1D;/Shallow Copy</h2><p>&#x6D45;&#x62F7;&#x8D1D;&#x6307;&#x62F7;&#x8D1D;&#x4E86;&#x5F15;&#x7528;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var original = {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;};
console.log(JSON.stringify(original));
// {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}

var shallowCopy = original;
console.log(JSON.stringify(shallowCopy));
// {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}

shallowCopy.prop1 = &quot;ChangedProp1&quot;;

console.log(JSON.stringify(original));
// {&quot;prop1&quot; : &quot;ChangedProp1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}
console.log(JSON.stringify(shallowCopy));
// {&quot;prop1&quot; : &quot;ChangedProp1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> original = {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>};
console.<span class="hljs-built_in">log</span>(JSON.stringify(original));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}

<span class="hljs-built_in">var</span> shallowCopy = original;
console.<span class="hljs-built_in">log</span>(JSON.stringify(shallowCopy));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}

shallowCopy.prop1 = <span class="hljs-string">&quot;ChangedProp1&quot;</span>;

console.<span class="hljs-built_in">log</span>(JSON.stringify(original));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;ChangedProp1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}
console.<span class="hljs-built_in">log</span>(JSON.stringify(shallowCopy));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;ChangedProp1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}</code></pre><p><a href="https://smoothprogramming.com/wp-content/uploads/ShallowCopy.png" rel="nofollow noreferrer" target="_blank">https://smoothprogramming.com...</a><br><span class="img-wrap"><img data-src="/img/bVbidR4?w=640&amp;h=480" src="https://static.alili.tech/img/bVbidR4?w=640&amp;h=480" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6CE8;&#x610F;:</p><ul><li>&#x6D45;&#x62F7;&#x8D1D;&#x4E2D;&#xFF0C;&#x539F;&#x59CB;&#x503C;&#x548C;&#x526F;&#x672C;&#x5171;&#x4EAB;&#x540C;&#x6837;&#x7684;&#x5C5E;&#x6027;&#x3002;</li><li>&#x6D45;&#x62F7;&#x8D1D;&#x53EA;&#x62F7;&#x8D1D;&#x4E86;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x3002;</li><li>&#x6D45;&#x62F7;&#x8D1D;&#x4E2D;&#x5982;&#x679C;&#x4FEE;&#x6539;&#x4E86;&#x62F7;&#x8D1D;&#x5BF9;&#x8C61;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x539F;&#x59CB;&#x5BF9;&#x8C61;&#xFF0C;&#x53CD;&#x4E4B;&#x4EA6;&#x7136;&#x3002;</li><li>js&#x4E2D;&#xFF0C;&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;&#x7684;&#x8D4B;&#x503C;&#x9ED8;&#x8BA4;&#x4E3A;&#x6D45;&#x62F7;&#x8D1D;&#x3002;</li></ul><h2 id="articleHeader1">&#x6DF1;&#x62F7;&#x8D1D;/Deep Copy</h2><p>&#x6DF1;&#x62F7;&#x8D1D;&#x6307;&#x9012;&#x5F52;&#x7684;&#x590D;&#x5236;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x7ED9;&#x65B0;&#x5BF9;&#x8C61;&#x3002;jquery&#x4E2D;&#x6211;&#x4EEC;&#x4F7F;&#x7528;$.extend&#x53BB;&#x8FDB;&#x884C;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend(deepCopy, target, object1, [objectN] )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code style="word-break:break-word;white-space:initial">$.extend(deepCopy, target, object1, <span class="hljs-string">[objectN]</span> )</code></pre><p>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x5165;true&#xFF0C;&#x6307;&#x660E;&#x6B64;&#x4E3A;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;target&#x4E3A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;object1&#xFF0C;&#x539F;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var original = {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;};
console.log(JSON.stringify(original));
// {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}

var deepCopy = $.extend(true, {}, original);
console.log(JSON.stringify(deepCopy));
// {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}

deepCopy.prop1 = &quot;ChangedProp1&quot;;

console.log(JSON.stringify(original));
// {&quot;prop1&quot; : &quot;Prop1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}
console.log(JSON.stringify(deepCopy));
// {&quot;prop1&quot; : &quot;ChangedProp1&quot;, &quot;prop2&quot; : &quot;prop2&quot;}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> original = {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>};
console.<span class="hljs-built_in">log</span>(JSON.stringify(original));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}

<span class="hljs-built_in">var</span> deepCopy = $.extend(<span class="hljs-literal">true</span>, {}, original);
console.<span class="hljs-built_in">log</span>(JSON.stringify(deepCopy));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}

deepCopy.prop1 = <span class="hljs-string">&quot;ChangedProp1&quot;</span>;

console.<span class="hljs-built_in">log</span>(JSON.stringify(original));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;Prop1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}
console.<span class="hljs-built_in">log</span>(JSON.stringify(deepCopy));
// {<span class="hljs-string">&quot;prop1&quot;</span> : <span class="hljs-string">&quot;ChangedProp1&quot;</span>, <span class="hljs-string">&quot;prop2&quot;</span> : <span class="hljs-string">&quot;prop2&quot;</span>}
</code></pre><p><a href="https://smoothprogramming.com/wp-content/uploads/DeepCopy.png" rel="nofollow noreferrer" target="_blank">https://smoothprogramming.com...</a><br><span class="img-wrap"><img data-src="/img/bVbidWf?w=640&amp;h=480" src="https://static.alili.tech/img/bVbidWf?w=640&amp;h=480" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6CE8;&#x610F;:</p><ul><li>&#x6DF1;&#x62F7;&#x8D1D;&#x4E2D;&#xFF0C;&#x526F;&#x672C;&#x548C;&#x539F;&#x5BF9;&#x8C61;&#x4E0D;&#x5171;&#x4EAB;&#x5C5E;&#x6027;</li><li>&#x6DF1;&#x62F7;&#x8D1D;&#x9012;&#x5F52;&#x7684;&#x590D;&#x5236;&#x5C5E;&#x6027;</li><li>&#x6DF1;&#x62F7;&#x8D1D;&#x7684;&#x526F;&#x672C;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x539F;&#x5BF9;&#x8C61;&#xFF0C;&#x53CD;&#x4E4B;&#x4EA6;&#x7136;</li><li>js&#x4E2D;&#x6240;&#x6709;&#x7684;&#x539F;&#x59CB;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x9ED8;&#x8BA4;&#x6267;&#x884C;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x6BD4;&#x5982;Boolean, null, Undefined, Number,String&#x7B49;</li></ul><p>&#x8BD1;&#x8005;&#x6CE8;&#xFF1A;</p><ul><li>&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x4E2D;&#xFF0C;&#x901A;&#x5E38;&#x6240;&#x8C13;clone&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x6307;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x5373;&#x62F7;&#x8D1D;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x526F;&#x672C;&#x3002;</li><li>&#x6709;&#x4E9B;&#x65F6;&#x5019;&#x4E00;&#x5C42;&#x7684;&#x6DF1;&#x62F7;&#x8D1D;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x6BD4;&#x5982;shallowCopy({a:1,b:{hello:&apos;world}}),b&#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x6D45;&#x62F7;&#x8D1D;&#x51FA;&#x6765;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x76F4;&#x63A5;&#x5F15;&#x7528;&#x4E86;&#x539F;&#x5BF9;&#x8C61;&#x7684;value&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x4F1A;&#x76F8;&#x4E92;&#x5F71;&#x54CD;&#x7684;&#x3002;</li><li>&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x4E2D;&#xFF0C;&#x6DF1;&#x62F7;&#x8D1D;&#xFF08;&#x9012;&#x5F52;&#x7684;&#x5BF9;&#x5BF9;&#x8C61;&#x91CC;&#x6BCF;&#x4E00;&#x5C42;&#x503C;&#x548C;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x62F7;&#x8D1D;&#xFF09;&#x5E94;&#x7528;&#x5F88;&#x5E7F;&#x6CDB;&#xFF0C;&#x6211;&#x8BA4;&#x4E3A;&#x6D45;&#x62F7;&#x8D1D;&#x53EA;&#x53D8;&#x6210;&#x4E86;&#x4E00;&#x79CD;&#x6982;&#x5FF5;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x4E00;&#x4E2A;&#x9700;&#x8981;clone&#x7684;&#x5730;&#x65B9;&#x90FD;&#x662F;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;</li><li>&#x590D;&#x5236;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#x5BF9;&#x8C61;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x6BD4;&#x5982;vuejs&#x91CC;&#x7684;data&#x3002;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS里深拷贝和浅拷贝的释义

## 原文链接
[https://segmentfault.com/a/1190000016697476](https://segmentfault.com/a/1190000016697476)


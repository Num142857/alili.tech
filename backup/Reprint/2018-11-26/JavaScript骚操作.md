---
title: 'JavaScript骚操作' 
date: 2018-11-26 2:30:09
hidden: true
slug: l7653bpcyo7
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;JavaScript&#x4E16;&#x754C;&#x4E2D;&#xFF0C;&#x6709;&#x4E9B;&#x64CD;&#x4F5C;&#x4F1A;&#x8BA9;&#x4F60;&#x65E0;&#x6CD5;&#x7406;&#x89E3;&#xFF0C;&#x4F46;&#x662F;&#x5374;&#x65E0;&#x6BD4;&#x4F18;&#x96C5;&#x3002;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x4E9B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbcLt1?w=225&amp;h=225" src="https://static.alili.tech/img/bVbcLt1?w=225&amp;h=225" alt="3e630000bc75493a7458" title="3e630000bc75493a7458" style="cursor:pointer;display:inline"></span></p><p><strong>5&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x503C;&#x4EA4;&#x6362;</strong></p><p>&#x4E0B;&#x9762;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. var temp = a; a = b; b = temp; (&#x4F20;&#x7EDF;&#xFF0C;&#x4F46;&#x9700;&#x8981;&#x501F;&#x52A9;&#x4E34;&#x65F6;&#x53D8;&#x91CF;)
2. a ^= b; b ^= a; a ^= b; (&#x9700;&#x8981;&#x4E24;&#x4E2A;&#x6574;&#x6570;)
3. b = [a, a = b][0] (&#x501F;&#x52A9;&#x6570;&#x7EC4;)
4. [a, b] = [b, a]; (ES6&#xFF0C;&#x89E3;&#x6784;&#x8D4B;&#x503C;)
5. a = a + b; b = a - b; a = a - b; (&#x5C0F;&#x5B66;&#x5965;&#x8D5B;&#x9898;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>var temp = a; a = b; b = temp; (&#x4F20;&#x7EDF;&#xFF0C;&#x4F46;&#x9700;&#x8981;&#x501F;&#x52A9;&#x4E34;&#x65F6;&#x53D8;&#x91CF;)
<span class="hljs-bullet">2. </span>a ^= b; b ^= a; a ^= b; (&#x9700;&#x8981;&#x4E24;&#x4E2A;&#x6574;&#x6570;)
<span class="hljs-bullet">3. </span>b = [<span class="hljs-string">a, a = b</span>][<span class="hljs-symbol">0</span>] (&#x501F;&#x52A9;&#x6570;&#x7EC4;)
<span class="hljs-bullet">4. </span>[a, b] = [b, a]; (ES6&#xFF0C;&#x89E3;&#x6784;&#x8D4B;&#x503C;)
<span class="hljs-bullet">5. </span>a = a + b; b = a - b; a = a - b; (&#x5C0F;&#x5B66;&#x5965;&#x8D5B;&#x9898;)
</code></pre><p><strong>&#x53BB;&#x6389;&#x5C0F;&#x6570;&#x90E8;&#x5206;</strong><br>&#x4E0B;&#x9762;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt(num)
~~numnum &gt;&gt; 0num | 0
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>parseInt(<span class="hljs-built_in">num</span>)
~~numnum &gt;&gt; <span class="hljs-number">0</span><span class="hljs-built_in">num</span> | <span class="hljs-number">0</span>
</code></pre><p><strong>&#x5224;&#x65AD; x &#x662F;&#x5426;&#x662F;&#x6574;&#x6570;</strong><br>&#x4E0B;&#x9762;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isInt(x) { return (x ^ 0) === x
}
// return Math.round(x) === x
// return (typeof x === &apos;number&apos;) &amp;&amp; (x % 1 === 0)
// ES6 -&gt; Number.isInteger()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">isInt</span>(x) { <span class="hljs-keyword">return</span> <span class="hljs-type">(x</span> ^ <span class="hljs-number">0</span>) === x
}
// <span class="hljs-keyword">return</span> Math.round(x) === x
// <span class="hljs-keyword">return</span> (typeof x === <span class="hljs-symbol">&apos;number</span>&apos;) &amp;&amp; (x % <span class="hljs-number">1</span> === <span class="hljs-number">0</span>)
// ES6 -&gt; Number.isInteger()
</code></pre><p><strong>&#x9012;&#x5F52;&#x6C42;&#x9636;&#x4E58;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n) { return (n &gt; 1) ? n * f(n - 1) : n
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(n) { <span class="hljs-keyword">return</span> <span class="hljs-type">(n</span> &gt; <span class="hljs-number">1</span>) ? n * f(n - <span class="hljs-number">1</span>) : <span class="hljs-type">n</span>
}
</code></pre><p><strong>&#x5224;&#x65AD;&#x7B26;&#x53F7;&#x662F;&#x5426;&#x76F8;&#x540C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sameSign(a, b) { return (a ^ b) &gt;= 0}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">sameSign</span>(a, b) { <span class="hljs-keyword">return</span> <span class="hljs-type">(a</span> ^ b) &gt;= <span class="hljs-number">0</span>}
</code></pre><p><strong>&#x514B;&#x9686;&#x6570;&#x7EC4;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.slice(0)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">arr</span><span class="hljs-selector-class">.slice</span>(0)
</code></pre><p><strong>&#x6570;&#x7EC4;&#x53BB;&#x91CD;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6Array.from(new Set(arr))// ES5arr.filter(function(ele, index, array){ return index===array.indexOf(ele)
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code>// ES6Array.from(new <span class="hljs-keyword">Set</span>(arr))// ES5arr.filter(<span class="hljs-keyword">function</span>(ele, <span class="hljs-keyword">index</span>, <span class="hljs-built_in">array</span>){ <span class="hljs-keyword">return</span> <span class="hljs-keyword">index</span>===array.indexOf(ele)
})
</code></pre><p><strong>&#x6570;&#x7EC4;&#x6700;&#x5927;&#x503C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function maxArr(arr) { return Math.max.apply(null, arr)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">maxArr</span>(<span class="hljs-params">arr</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-literal">null</span>, arr)
}
</code></pre><p><strong>&#x6570;&#x7EC4;&#x6700;&#x5C0F;&#x503C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function minArr(arr) { return Math.min.apply(null, arr)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">minArr</span>(<span class="hljs-params">arr</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.min.apply(<span class="hljs-literal">null</span>, arr)
}
</code></pre><p><strong>&#x968F;&#x673A;&#x83B7;&#x53D6;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x4E2A;&#x6210;&#x5458;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function randomOne(arr) { return arr[Math.floor(Math.random() * arr.length)]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomOne</span>(<span class="hljs-params">arr</span>) </span>{ <span class="hljs-keyword">return</span> arr[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * arr.length)]
}
</code></pre><p><strong>&#x4EA7;&#x751F;&#x968F;&#x673A;&#x989C;&#x8272;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getRandomColor() { return `#${Math.random().toString(16).substr(2, 6)}`}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRandomColor</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">`#<span class="hljs-subst">${<span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">16</span>).substr(<span class="hljs-number">2</span>, <span class="hljs-number">6</span>)}</span>`</span>}
</code></pre><p><strong>&#x968F;&#x673A;&#x751F;&#x6210;&#x6307;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x5B57;&#x7B26;&#x4E32;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function randomStr(n) { let standard = &apos;abcdefghijklmnopqrstuvwxyz9876543210&apos;
let len = standard.length let result = &apos;&apos;
for (let i = 0; i &lt; n; i++) {
result += standard.charAt(Math.floor(Math.random() * len))
} return result
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomStr</span>(<span class="hljs-params">n</span>) </span>{ <span class="hljs-keyword">let</span> standard = <span class="hljs-string">&apos;abcdefghijklmnopqrstuvwxyz9876543210&apos;</span>
<span class="hljs-keyword">let</span> len = standard.length <span class="hljs-keyword">let</span> result = <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
result += standard.charAt(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * len))
} <span class="hljs-keyword">return</span> result
}
</code></pre><p><strong>&#x6DF1;&#x62F7;&#x8D1D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON.parse(JSON.stringify(obj))
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">JSON</span><span class="hljs-selector-class">.parse</span>(<span class="hljs-selector-tag">JSON</span><span class="hljs-selector-class">.stringify</span>(<span class="hljs-selector-tag">obj</span>))
</code></pre><p><strong>&#x6253;&#x5370;&#x51FA;&#x6765;&#x770B;&#x770B;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(([][[]] + [])[+!![]] + ([] + {})[!+[] + !![]])
console.log((!(~+[]) + {})[--[~+&apos;&apos;][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]])
&#x7F8E;&#x5316;console
console.info(&quot;%c&#x54C8;&#x54C8;&quot;, &quot;color: #3190e8; font-size: 30px; font-family: sans-serif&quot;);


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>console.log(([][[]] + [])[+!![]] + ([] + {})[!+[] + !![]])
console.log((!(~+[]) + {})[--[~+<span class="hljs-string">&apos;&apos;</span>][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]])
&#x7F8E;&#x5316;console
console.info(<span class="hljs-string">&quot;%c&#x54C8;&#x54C8;&quot;</span>, <span class="hljs-string">&quot;color: #3190e8; font-size: 30px; font-family: sans-serif&quot;</span>);


</code></pre><blockquote>&#x76F8;&#x4FE1;&#x8FD8;&#x662F;&#x6709;&#x60F3;&#x8981;&#x5B66;&#x4E60;&#x6216;&#x8005;&#x4E86;&#x89E3;web&#x524D;&#x7AEF;&#x7F16;&#x7A0B;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x53EF;&#x4EE5;&#x6765;&#x6211;&#x7684;web&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x88D9;&#x54E6;575308719&#x53EF;&#x4EE5;&#x514D;&#x8D39;&#x9886;&#x53D6;&#x7CBE;&#x54C1;&#x7684;web&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x6559;&#x7A0B;&#x54E6;&#xFF01;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript骚操作

## 原文链接
[https://segmentfault.com/a/1190000015396476](https://segmentfault.com/a/1190000015396476)


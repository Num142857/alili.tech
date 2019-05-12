---
title: 'js随手笔记-------理解JavaScript中的堆和栈' 
date: 2018-11-19 2:30:10
hidden: true
slug: 1arn41tmo1o
categories: [reprint]
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x7531;&#x4E8E;&#x505A;&#x7684;&#x9879;&#x76EE;&#x9700;&#x6C42;&#x7275;&#x626F;&#x5230;&#x4E86;&#x5927;&#x91CF;&#x7684;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;&#x4E8E;&#x662F;&#x5C31;&#x60F3;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;javascript&#x4E2D;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x4E8E;&#x662F;&#x5C31;&#x767E;&#x5EA6;&#x4E86;&#x4E00;&#x4E0B;&#x627E;&#x5230;&#x4E86;&#x4E9B;&#x5E72;&#x8D27;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x7CBE;&#x7B80;&#x4E0B;&#x505A;&#x4E2A;&#x7B14;&#x8BB0;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x65E5;&#x540E;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x67E5;&#x770B;&#xFF1A;<br>&#x8FD9;&#x91CC;&#x5148;&#x8BF4;&#x4E24;&#x4E2A;&#x6982;&#x5FF5;&#xFF1A;<strong>1&#x3001;&#x5806;&#xFF08;heap&#xFF09;</strong><strong>2&#x3001;&#x6808;&#xFF08;stack&#xFF09;</strong><br><strong>&#x5806;</strong> &#x662F;&#x5806;&#x5185;&#x5B58;&#x7684;&#x7B80;&#x79F0;&#x3002;<br><strong>&#x6808;</strong> &#x662F;&#x6808;&#x5185;&#x5B58;&#x7684;&#x7B80;&#x79F0;&#x3002;<br>&#x8BF4;&#x5230;&#x5806;&#x6808;&#xFF0C;&#x6211;&#x4EEC;&#x8BB2;&#x7684;&#x5C31;&#x662F;&#x5185;&#x5B58;&#x7684;&#x4F7F;&#x7528;&#x548C;&#x5206;&#x914D;&#x4E86;&#xFF0C;&#x6CA1;&#x6709;&#x5BC4;&#x5B58;&#x5668;&#x7684;&#x4E8B;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x786C;&#x76D8;&#x7684;&#x4E8B;&#x3002;<br>&#x5404;&#x79CD;&#x8BED;&#x8A00;&#x5728;&#x5904;&#x7406;&#x5806;&#x6808;&#x7684;&#x539F;&#x7406;&#x4E0A;&#x90FD;&#x5927;&#x540C;&#x5C0F;&#x5F02;&#x3002;&#x5806;&#x662F;&#x52A8;&#x6001;&#x5206;&#x914D;&#x5185;&#x5B58;&#xFF0C;&#x5185;&#x5B58;&#x5927;&#x5C0F;&#x4E0D;&#x4E00;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x91CA;&#x653E;&#x3002;&#x6808;&#x662F;&#x81EA;&#x52A8;&#x5206;&#x914D;&#x76F8;&#x5BF9;&#x56FA;&#x5B9A;&#x5927;&#x5C0F;&#x7684;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#xFF0C;&#x5E76;&#x7531;&#x7CFB;&#x7EDF;&#x81EA;&#x52A8;&#x91CA;&#x653E;&#x3002;</p><p>javascript&#x7684;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x5C31;5&#x79CD;:Undefined&#x3001;Null&#x3001;Boolean&#x3001;Number&#x548C;String&#xFF0C;&#x5B83;&#x4EEC;&#x90FD;&#x662F;&#x76F4;&#x63A5;&#x6309;&#x503C;&#x5B58;&#x50A8;&#x5728;&#x6808;&#x4E2D;&#x7684;&#xFF0C;&#x6BCF;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x5360;&#x7528;&#x7684;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#x7684;&#x5927;&#x5C0F;&#x662F;&#x786E;&#x5B9A;&#x7684;&#xFF0C;&#x5E76;&#x7531;&#x7CFB;&#x7EDF;&#x81EA;&#x52A8;&#x5206;&#x914D;&#x548C;&#x81EA;&#x52A8;&#x91CA;&#x653E;&#x3002;&#x8FD9;&#x6837;&#x5E26;&#x6765;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#xFF0C;&#x5185;&#x5B58;&#x53EF;&#x4EE5;&#x53CA;&#x65F6;&#x5F97;&#x5230;&#x56DE;&#x6536;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;&#x5806;&#x6765;&#x8BF4;&#xFF0C;&#x66F4;&#x52A0;&#x5BB9;&#x6613;&#x7BA1;&#x7406;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#x3002;</p><p>javascript&#x4E2D;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x88AB;&#x79F0;&#x4E3A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E; : &#x5982;&#x5BF9;&#x8C61;(Object)&#x3001;&#x6570;&#x7EC4;(Array)&#x3001;&#x51FD;&#x6570;(Function) &#x2026;&#xFF0C;&#x5B83;&#x4EEC;&#x662F;&#x901A;&#x8FC7;&#x62F7;&#x8D1D;&#x548C;new&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x4E8E;&#x5806;&#x4E2D;&#x3002;&#x5176;&#x5B9E;&#xFF0C;&#x8BF4;&#x5B58;&#x50A8;&#x4E8E;&#x5806;&#x4E2D;&#xFF0C;&#x4E5F;&#x4E0D;&#x592A;&#x51C6;&#x786E;&#xFF0C;&#x56E0;&#x4E3A;&#xFF0C;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x7684;&#x5730;&#x5740;&#x6307;&#x9488;&#x662F;&#x5B58;&#x50A8;&#x4E8E;&#x6808;&#x4E2D;&#x7684;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x8BBF;&#x95EE;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x5148;&#x4ECE;&#x6808;&#x4E2D;&#x83B7;&#x5F97;&#x5BF9;&#x8C61;&#x7684;&#x5730;&#x5740;&#x6307;&#x9488;&#xFF0C;&#x7136;&#x540E;&#xFF0C;&#x5728;&#x901A;&#x8FC7;&#x5730;&#x5740;&#x6307;&#x9488;&#x627E;&#x5230;&#x5806;&#x4E2D;&#x7684;&#x6240;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x8BF4;&#x6765;&#x4E5F;&#x662F;&#x5F62;&#x8C61;&#xFF0C;&#x6808;&#xFF0C;&#x7EBF;&#x6027;&#x7ED3;&#x6784;&#xFF0C;&#x540E;&#x8FDB;&#x5148;&#x51FA;&#xFF0C;&#x4FBF;&#x4E8E;&#x7BA1;&#x7406;&#x3002;&#x5806;&#xFF0C;&#x4E00;&#x4E2A;&#x6DF7;&#x6C8C;&#xFF0C;&#x6742;&#x4E71;&#x65E0;&#x7AE0;&#xFF0C;&#x65B9;&#x4FBF;&#x5B58;&#x50A8;&#x548C;&#x5F00;&#x8F9F;&#x5185;&#x5B58;&#x7A7A;&#x95F4;<br><strong>&#x4F20;&#x503C;&#x4E0E;&#x4F20;&#x5740;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1,2,5,8]; 
var arr2 = arr1 ; 
var str1 = arr1[2]; 
console.log(arr2);//1,2,5,8
console.log(str1);//5
arr2[4] = 99; 
str1 = 6; 
console.log(arr1);//1,2,5,8,99
console.log(arr1[2]);//5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">8</span>]; 
var arr2 = arr1 ; 
var str1 = arr1[<span class="hljs-number">2</span>]; 
console.log(arr2);<span class="hljs-comment">//1,2,5,8</span>
console.log(str1);<span class="hljs-comment">//5</span>
arr2[<span class="hljs-number">4</span>] = <span class="hljs-number">99</span>; 
str1 = <span class="hljs-number">6</span>; 
console.log(arr1);<span class="hljs-comment">//1,2,5,8,99</span>
console.log(arr1[<span class="hljs-number">2</span>]);<span class="hljs-comment">//5</span></code></pre><p>&#x4E0A;&#x65B9;&#x4F8B;&#x5B50;&#x5F97;&#x77E5;&#xFF0C;&#x5F53;&#x6211;&#x6539;&#x53D8;arr2&#x4E2D;&#x7684;&#x6570;&#x636E;&#x65F6;&#xFF0C;arr1&#x4E2D;&#x6570;&#x636E;&#x4E5F;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x5F53;&#x6539;&#x53D8;str1&#x7684;&#x6570;&#x636E;&#x503C;&#x65F6;&#xFF0C;arr1&#x5374;&#x6CA1;&#x6709;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x8FD9;&#x5C31;&#x662F;&#x4F20;&#x503C;&#x4E0E;&#x4F20;&#x5740;&#x7684;&#x533A;&#x522B;&#x3002;</p><p>&#x56E0;&#x4E3A;arr1&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x5C5E;&#x4E8E;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x8D4B;&#x4E88;&#x7ED9;arr2&#x7684;&#x65F6;&#x5019;&#x4F20;&#x7684;&#x662F;&#x6808;&#x4E2D;&#x7684;&#x5730;&#x5740;&#xFF08;&#x76F8;&#x5F53;&#x4E8E;&#x65B0;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x4E0D;&#x540C;&#x540D;&#x201C;&#x6307;&#x9488;&#x201D;&#xFF09;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5806;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x3002;str1&#x5F97;&#x5230;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x8D4B;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;str1&#x4EC5;&#x4EC5;&#x662F;&#x4ECE;arr1&#x5806;&#x5185;&#x5B58;&#x4E2D;&#x83B7;&#x53D6;&#x4E86;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#xFF0C;&#x5E76;&#x76F4;&#x63A5;&#x4FDD;&#x5B58;&#x5728;&#x6808;&#x4E2D;&#x3002;arr1&#x3001;arr2&#x90FD;&#x6307;&#x5411;&#x540C;&#x4E00;&#x5757;&#x5806;&#x5185;&#x5B58;&#xFF0C;arr2&#x4FEE;&#x6539;&#x7684;&#x5806;&#x5185;&#x5B58;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x5C31;&#x4F1A;&#x5F71;&#x54CD;&#x5230;arr1&#xFF0C;str1&#x662F;&#x76F4;&#x63A5;&#x5728;&#x6808;&#x4E2D;&#x4FEE;&#x6539;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x80FD;&#x5F71;&#x54CD;&#x5230;arr1&#x5806;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbeDcz?w=574&amp;h=274" src="https://static.alili.tech/img/bVbeDcz?w=574&amp;h=274" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><strong>&#x6D45;&#x62F7;&#x8D1D;&#x548C;&#x6DF1;&#x62F7;&#x8D1D;</strong><br>&#x4E0A;&#x8FB9;&#x8BF4;&#x5230;&#x7684;&#x8D4B;&#x503C;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x90A3;&#x4E48;&#x4EC0;&#x4E48;&#x53EB;&#x4F5C;&#x6DF1;&#x62F7;&#x8D1D;&#x5462;&#xFF1F;&#x5C31;&#x662F;&#x8981;&#x5C06;arr1&#x7684;&#x6BCF;&#x4E2A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x90FD;&#x904D;&#x5386;&#x4E00;&#x904D;&#xFF0C;&#x4F9D;&#x6B21;&#x7684;&#x8D4B;&#x503C;&#x7ED9;arr2&#x7684;&#x5BF9;&#x5E94;&#x5B57;&#x6BB5;&#x3002;&#x907F;&#x514D;&#x4EA7;&#x751F;&#x56E0;&#x4E3A;&#x5730;&#x5740;&#x5F15;&#x7528;&#x5E26;&#x6765;&#x7684;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1,2,5,8]; 
var arr2 = []; 
for(var i=0;i&lt;arr1.length;i++){
   arr2[i]=arr1[i];
};
console.log(arr2)//1,2,5,8
arr2[4]=99;
console.log(arr2)//1,2,5,8,99
console.log(arr1)//1,2,5,8" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">8</span>]; 
<span class="hljs-keyword">var</span> arr2 = []; 
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr1.length;i++){
   arr2[i]=arr1[i];
};
<span class="hljs-built_in">console</span>.log(arr2)<span class="hljs-comment">//1,2,5,8</span>
arr2[<span class="hljs-number">4</span>]=<span class="hljs-number">99</span>;
<span class="hljs-built_in">console</span>.log(arr2)<span class="hljs-comment">//1,2,5,8,99</span>
<span class="hljs-built_in">console</span>.log(arr1)<span class="hljs-comment">//1,2,5,8</span></code></pre><p>javascript&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x8BED;&#x8A00;&#x672C;&#x8EAB;&#x5728;&#x5904;&#x7406;&#x5BF9;&#x8C61;&#x548C;&#x975E;&#x5BF9;&#x8C61;&#x4E0A;&#x5C31;&#x8FDB;&#x884C;&#x4E86;&#x5212;&#x5206;&#xFF0C;&#x4ECE;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x8BB2;&#xFF0C;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x6808;&#x7684;&#x6307;&#x9488;&#x548C;&#x5806;&#x4E2D;&#x7684;&#x6570;&#x503C;&#x3002;</p><p>&#x672C;&#x6587;&#x5185;&#x5BB9;&#x501F;&#x9274;&#x81EA;<br>&#x94FE;&#x63A5;&#xFF1A;<a href="https://www.jianshu.com/p/5e0e8d183102" rel="nofollow noreferrer" target="_blank">https://www.jianshu.com/p/5e0...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js随手笔记-------理解JavaScript中的堆和栈

## 原文链接
[https://segmentfault.com/a/1190000015841342](https://segmentfault.com/a/1190000015841342)


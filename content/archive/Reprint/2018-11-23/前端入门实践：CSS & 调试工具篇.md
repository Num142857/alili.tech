---
title: '前端入门实践：CSS & 调试工具篇' 
date: 2018-11-23 2:30:11
hidden: true
slug: 4m21gmywezv
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">CSS&#x7BC7;</h2><h3 id="articleHeader1">1.&#x5757;&#x7EA7;&#x5143;&#x7D20; VS &#x884C;&#x5185;&#x5143;&#x7D20;</h3><ul><li><strong>&#x6587;&#x6863;&#x6D41;!</strong><p>&#x5C06;&#x7A97;&#x4F53;&#x81EA;&#x4E0A;&#x800C;&#x4E0B;&#x5206;&#x6210;&#x4E00;&#x884C;&#x884C;&#xFF0C; &#x5E76;&#x5728;&#x6BCF;&#x884C;&#x4E2D;&#x6309;&#x4ECE;&#x5DE6;&#x81F3;&#x53F3;&#x7684;&#x987A;&#x5E8F;&#x6392;&#x653E;&#x5143;&#x7D20;&#xFF0C;&#x5373;&#x4E3A;&#x6587;&#x6863;&#x6D41;&#x3002;</p></li><li>&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF1A;&#x81EA;&#x52A8;&#x6362;&#x884C;&#xFF1B;&#x5782;&#x76F4;&#x6392;&#x5217;&#xFF1B;width/height/margin/padding&#x90FD;&#x53EF;&#x63A7;&#x5236;&#xFF1B;&#x9ED8;&#x8BA4;&#x5BBD;&#x5EA6;100%&#xFF0C;&#x9664;&#x975E;&#x8BBE;&#x7F6E;width/margin<p>div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , menu , noframes , noscript , ol , p , pre , table , ul , li...</p></li><li>&#x884C;&#x5185;&#x5143;&#x7D20;&#xFF1A;&#x6C34;&#x5E73;&#x6392;&#x5217;&#xFF1B;width/height&#x65E0;&#x6548;&#xFF0C;&#x53EA;&#x80FD;&#x901A;&#x8FC7;line-height&#x8BBE;&#x7F6E;&#xFF1B;margin/padding&#x5DE6;&#x53F3;&#x6709;&#x6548;&#xFF0C;&#x4E0A;&#x4E0B;&#x65E0;&#x6548;<p>a , b , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup...</p></li><li>display/float/position&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x663E;&#x793A;&#x7C7B;&#x578B;&#xFF0C; inline-&gt;block, block-&gt;inline</li></ul><h3 id="articleHeader2">2.CSS&#x76D2;&#x6A21;&#x578B;</h3><p><span class="img-wrap"><img data-src="/uploads/daf10e603063fb7e829010bc65fb9607/image.png" src="https://static.alili.tech/uploads/daf10e603063fb7e829010bc65fb9607/image.png" alt="image" title="image" style="cursor:pointer"></span></p><p>box-sizing</p><h3 id="articleHeader3">3. display</h3><ul><li>none</li><li>inline</li><li>block</li><li>inline-block</li><li>table</li><li>table-cell</li><li>flex</li></ul><h3 id="articleHeader4">4.&#x5E03;&#x5C40;</h3><ul><li>position<p>static, relative, absolute, fixed</p><p>top, left, right, bottom</p></li><li>float<br>&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E8C;&#x4E09;&#x680F;&#x5E03;&#x5C40;&#xFF0C;&#x9700;&#x8981;&#x6E05;&#x9664;&#x6D6E;&#x52A8;</li><li>flex<br>&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x65F6;&#x4EE3;&#xFF0C;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x524D;&#x7F00;&#x517C;&#x5BB9;<p><a href="http://zh.learnlayout.com/" rel="nofollow noreferrer" target="_blank">http://zh.learnlayout.com/</a></p><p><a href="http://www.runoob.com/w3cnote/flex-grammar.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/w3cnote...</a></p></li></ul><h3 id="articleHeader5">5.&#x517C;&#x5BB9;&#x6027;&#x67E5;&#x770B;</h3><p><a href="https://caniuse.com/" rel="nofollow noreferrer" target="_blank">https://caniuse.com/</a></p><h2 id="articleHeader6">&#x5DE5;&#x5177;&#x7BC7;</h2><h3 id="articleHeader7">1.chrome/ff&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;</h3><ul><li>html&amp;css&#x8C03;&#x8BD5;</li><li>console</li><li>&#x65AD;&#x70B9;, debugger</li><li>&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;</li><li>...</li></ul><h3 id="articleHeader8">2.Fiddler / Charles</h3><ul><li>mock&#x6570;&#x636E;</li><li>&#x4FEE;&#x6539;header</li></ul><h3 id="articleHeader9">3.weinre</h3><ul><li>&#x8FDC;&#x7A0B;&#x8C03;&#x8BD5;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端入门实践：CSS & 调试工具篇

## 原文链接
[https://segmentfault.com/a/1190000015602773](https://segmentfault.com/a/1190000015602773)


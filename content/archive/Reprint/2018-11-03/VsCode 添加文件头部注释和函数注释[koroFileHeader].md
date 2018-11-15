---
title: 'VsCode 添加文件头部注释和函数注释[koroFileHeader]'
reprint: true
categories: reprint
abbrlink: ce5e0d04
date: 2018-11-03 10:03:44
---

{{% raw %}}
<blockquote>&#x4EE5;&#x524D;&#x53D1;&#x8FC7;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x8FD9;&#x56DE;&#x7248;&#x672C;&#x5347;&#x7EA7;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x4FEE;&#x590D;&#x4E86;&#x4EE5;&#x524D;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x9879;&#x4E0D;&#x80FD;&#x5220;&#x9664;&#xFF0C;&#x987A;&#x5E8F;&#x4E0D;&#x80FD;&#x79FB;&#x52A8;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5E76;&#x4E14;&#x65B0;&#x589E;&#x4E86;&#x5149;&#x6807;&#x5904;&#x6DFB;&#x52A0;&#x51FD;&#x6570;&#x6CE8;&#x91CA;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E5F;&#x91CD;&#x5199;&#x4E86;&#x4E00;&#x904D;readme&#xFF0C;&#x6240;&#x4EE5;&#x518D;&#x63A8;&#x5E7F;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;&#x8BA1;&#x5212;&#x662F;&#x652F;&#x6301;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x7684;&#x6CE8;&#x91CA;&#x3002;</blockquote><p>&#x4EE5;&#x4E0B;&#x662F;readme&#x6B63;&#x6587;&#x3002;</p><hr><h1 id="articleHeader0">koroFileHeader</h1><blockquote>&#x4E00;&#x4E2A;&#x8BFB;&#x53D6;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x6A21;&#x677F;&#xFF0C;&#x901A;&#x8FC7;&#x5FEB;&#x6377;&#x952E;&#x6DFB;&#x52A0;&#x6587;&#x4EF6;&#x5934;&#x90E8;&#x6CE8;&#x91CA;&#x3001;&#x5728;&#x5149;&#x6807;&#x5904;&#x6DFB;&#x52A0;&#x51FD;&#x6570;&#x6CE8;&#x91CA;&#x7684;<code>VsCode</code>&#x63D2;&#x4EF6;</blockquote><h2 id="articleHeader1">language</h2><p>&#x7B80;&#x4F53;&#x4E2D;&#x6587; | <a href="https://github.com/OBKoro1/koro1FileHeader/blob/master/README_en-us.md" rel="nofollow noreferrer" target="_blank">English</a></p><h3 id="articleHeader2">&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/OBKoro1/koro1FileHeader" rel="nofollow noreferrer" target="_blank">&#x4F20;&#x9001;&#x95E8;</a></h3><h2 id="articleHeader3">&#x7B80;&#x4ECB;</h2><ol><li><p><strong>&#x6587;&#x4EF6;&#x5934;&#x90E8;&#x6DFB;&#x52A0;&#x6CE8;&#x91CA;</strong>:</p><ul><li>&#x5728;&#x6587;&#x4EF6;&#x5F00;&#x5934;&#x6DFB;&#x52A0;&#x6CE8;&#x91CA;&#xFF0C;&#x8BB0;&#x5F55;&#x6587;&#x4EF6;&#x4FE1;&#x606F;</li><li>&#x8BFB;&#x53D6;&#x7528;&#x6237;&#x8BBE;&#x7F6E;&#xFF0C;&#x751F;&#x6210;&#x6CE8;&#x91CA;&#x6A21;&#x677F;</li><li>&#x4FDD;&#x5B58;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x6700;&#x540E;&#x7684;&#x7F16;&#x8F91;&#x65F6;&#x95F4;&#x548C;&#x7F16;&#x8F91;&#x4EBA;</li><li>&#x5FEB;&#x6377;&#x952E;&#xFF1A;<code>window</code>&#xFF1A;<code>ctrl+alt+i</code>,<code>mac</code>&#xFF1A;<code>ctrl+cmd+i</code></li></ul></li><li><p><strong>&#x5728;&#x5149;&#x6807;&#x5904;&#x6DFB;&#x52A0;&#x51FD;&#x6570;&#x6CE8;&#x91CA;</strong>:</p><ul><li>&#x5728;&#x5149;&#x6807;&#x5904;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6CE8;&#x91CA;&#x6A21;&#x677F;&#xFF0C;&#x4E0B;&#x65B9;&#x6709;&#x6817;&#x5B50;</li><li>&#x652F;&#x6301;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#x6A21;&#x677F;</li><li>&#x5FEB;&#x6377;&#x952E;&#xFF1A;<code>window</code>&#xFF1A;<code>ctrl+alt+t</code>,<code>mac</code>&#xFF1A;<code>ctrl+cmd+t</code></li></ul></li></ol><h2 id="articleHeader4">&#x5B89;&#x88C5;</h2><p>&#x5728; Vscode &#x6269;&#x5C55;&#x5546;&#x5E97;&#x4E2D;&#x641C;&#x7D22;<code>koroFileHeader</code>,&#x70B9;&#x51FB;&#x5B89;&#x88C5;&#x5373;&#x53EF;&#x3002;</p><h2 id="articleHeader5">&#x4F7F;&#x7528;</h2><ol><li>&#x6587;&#x4EF6;&#x5934;&#x90E8;&#x6CE8;&#x91CA;&#xFF1A;<p>&#x5728;&#x5F53;&#x524D;&#x7F16;&#x8F91;&#x6587;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x5FEB;&#x6377;&#x952E;:<code>window</code>&#xFF1A;<code>ctrl+alt+t</code>/<code>mac</code>&#xFF1A;<code>ctrl+cmd+t</code>,&#x5373;&#x53EF;&#x751F;&#x6210;&#x6587;&#x4EF6;&#x5934;&#x90E8;&#x6CE8;&#x91CA;&#x3002;</p></li><li><p>&#x51FD;&#x6570;&#x6CE8;&#x91CA;&#xFF1A;</p><ol><li>&#x5C06;&#x5149;&#x6807;&#x653E;&#x5728;&#x51FD;&#x6570;&#x884C;&#x6216;&#x8005;&#x5C06;&#x5149;&#x6807;&#x653E;&#x5728;&#x51FD;&#x6570;&#x4E0A;&#x65B9;&#x7684;&#x7A7A;&#x767D;&#x884C;</li><li>&#x4F7F;&#x7528;&#x5FEB;&#x6377;&#x952E;<code>window</code>&#xFF1A;<code>ctrl+alt+t</code>,<code>mac</code>&#xFF1A;<code>ctrl+cmd+t</code>&#xFF0C;&#x5373;&#x53EF;&#x751F;&#x6210;&#x51FD;&#x6570;&#x6CE8;&#x91CA;&#x3002;</li><li>&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x51FD;&#x6570;&#x6CE8;&#x91CA;&#x5728;&#x6587;&#x4EF6;&#x7684;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x90FD;&#x53EF;&#x751F;&#x6210;&#xFF0C;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x63A7;&#x5236;&#x3002;</li></ol></li></ol><h2 id="articleHeader6">&#x6CE8;&#x91CA;&#x6A21;&#x677F;&#x7684;&#x8BBE;&#x7F6E;</h2><ul><li><p>&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;:</p><p>&#x5728;&#x7528;&#x6237;&#x9996;&#x9009;&#x9879;&#x4E2D;&#x641C;&#x7D22;<code>fileheader</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &quot;fileheader.customMade&quot;: {} // &#x5934;&#x90E8;&#x6CE8;&#x91CA;
   &quot;fileheader.cursorMode&quot;: {} // &#x51FD;&#x6570;&#x6CE8;&#x91CA; 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>   <span class="hljs-string">&quot;fileheader.customMade&quot;</span>: {} <span class="hljs-comment">// &#x5934;&#x90E8;&#x6CE8;&#x91CA;</span>
   <span class="hljs-string">&quot;fileheader.cursorMode&quot;</span>: {} <span class="hljs-comment">// &#x51FD;&#x6570;&#x6CE8;&#x91CA; </span>
</code></pre><p>&#x7528;&#x6237;&#x672A;&#x8BBE;&#x7F6E;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5934;&#x90E8;&#x6CE8;&#x91CA;&#x548C;&#x51FD;&#x6570;&#x6CE8;&#x91CA;&#x6A21;&#x677F;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016699092?w=835&amp;h=669" src="https://static.alili.tech/img/remote/1460000016699092?w=835&amp;h=669" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li><p>&#x81EA;&#x5B9A;&#x4E49;&#x6A21;&#x677F;&#xFF1A;</p><ol><li>&#x5728;&#x7528;&#x6237;&#x8BBE;&#x7F6E;&#x4E2D;&#xFF0C;&#x641C;&#x7D22;<code>fileheader</code></li><li><p>&#x590D;&#x5236;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;+&#x4FEE;&#x6539;&#x914D;&#x7F6E;,&#x91CD;&#x542F;&#x751F;&#x6548;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016699093?w=1904&amp;h=1418" src="https://static.alili.tech/img/remote/1460000016699093?w=1904&amp;h=1418" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x4E0A;&#x8BBE;&#x7F6E;&#xFF0C;&#x751F;&#x6210;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6587;&#x4EF6;&#x5934;&#x90E8;&#x6CE8;&#x91CA;
/*
 * @Description: 
 * @version: 
 * @Company: BAT
 * @Author: OBKoro1
 * @Date: 2018-10-15 20:59:57
 * @LastEditors: OBKoro1
 * @LastEditTime: 2018-10-15 20:59:57" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">// &#x6587;&#x4EF6;&#x5934;&#x90E8;&#x6CE8;&#x91CA;</span>
<span class="hljs-comment">/*
 * <span class="hljs-doctag">@Description</span>: 
 * <span class="hljs-doctag">@version</span>: 
 * <span class="hljs-doctag">@Company</span>: BAT
 * <span class="hljs-doctag">@Author</span>: OBKoro1
 * <span class="hljs-doctag">@Date</span>: 2018-10-15 20:59:57
 * <span class="hljs-doctag">@LastEditors</span>: OBKoro1
 * <span class="hljs-doctag">@LastEditTime</span>: 2018-10-15 20:59:57</span></code></pre></li></ol></li></ul></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     */
    // &#x51FD;&#x6570;&#x6CE8;&#x91CA;
    /**
     * @name: 
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code>     */
    <span class="hljs-comment">// &#x51FD;&#x6570;&#x6CE8;&#x91CA;</span>
    <span class="hljs-comment">/**
     * <span class="hljs-doctag">@name</span>: 
     * <span class="hljs-doctag">@test</span>: test font
     * <span class="hljs-doctag">@msg</span>: 
     * <span class="hljs-doctag">@param</span> {type} 
     * <span class="hljs-doctag">@return</span>: 
     */</span>
</code></pre><h3 id="articleHeader7">&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;&#x3001;&#x7F16;&#x8F91;&#x4EBA;&#xFF1A;</h3><p>&#x8981;&#x5F00;&#x542F;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x9996;&#x9009;&#x9879;&#x8BBE;&#x7F6E;&#x4E2D;&#x586B;&#x5199;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;fileheader.customMade&quot;: {
    &quot;Date&quot;: &quot;Do not edit&quot;, // &#x6587;&#x4EF6;&#x521B;&#x5EFA;&#x65F6;&#x95F4;(&#x4E0D;&#x53D8;)
    &quot;LastEditors&quot;: &quot;OBKoro1&quot;, // &#x6587;&#x4EF6;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x8005;
    &quot;LastEditTime&quot;: &quot;Do not edit&quot; // &#x6587;&#x4EF6;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;
  }
  // &#x4E0D;&#x586B;&#x5199;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x5373;&#x5173;&#x95ED;&#x5BF9;&#x5E94;&#x529F;&#x80FD;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>  <span class="hljs-string">&quot;fileheader.customMade&quot;</span>: {
    <span class="hljs-string">&quot;Date&quot;</span>: <span class="hljs-string">&quot;Do not edit&quot;</span>, <span class="hljs-comment">// &#x6587;&#x4EF6;&#x521B;&#x5EFA;&#x65F6;&#x95F4;(&#x4E0D;&#x53D8;)</span>
    <span class="hljs-string">&quot;LastEditors&quot;</span>: <span class="hljs-string">&quot;OBKoro1&quot;</span>, <span class="hljs-comment">// &#x6587;&#x4EF6;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x8005;</span>
    <span class="hljs-string">&quot;LastEditTime&quot;</span>: <span class="hljs-string">&quot;Do not edit&quot;</span> <span class="hljs-comment">// &#x6587;&#x4EF6;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;</span>
  }
  <span class="hljs-comment">// &#x4E0D;&#x586B;&#x5199;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x5373;&#x5173;&#x95ED;&#x5BF9;&#x5E94;&#x529F;&#x80FD;</span>

</code></pre><h2 id="articleHeader8">&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x7F16;&#x8F91;&#x65F6;&#x95F4;</h2><p>&#x793A;&#x4F8B;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016699094?w=413&amp;h=270" src="https://static.alili.tech/img/remote/1460000016699094?w=413&amp;h=270" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader9">&#x6700;&#x540E;</h2><p>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x8FD8;&#x4E0D;&#x9519;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x7ED9;&#x4E2A; <a href="https://github.com/OBKoro1/koro1FileHeader" rel="nofollow noreferrer" target="_blank">Star</a> &#x2B50;&#xFE0F; &#x9F13;&#x52B1;&#x4E00;&#x4E0B;&#x6211;&#x5427;~</p><p><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">&#x535A;&#x5BA2;</a>&#x3001;<a href="http://obkoro1.com/web_accumulate/accumulate/" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x79EF;&#x7D2F;&#x6587;&#x6863;</a>&#x3001;<a href="https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&amp;h=344&amp;f=jpeg&amp;s=8317" rel="nofollow noreferrer" target="_blank">&#x516C;&#x4F17;&#x53F7;</a>&#x3001;<a href="https://github.com/OBKoro1" rel="nofollow noreferrer" target="_blank">GitHub</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VsCode 添加文件头部注释和函数注释[koroFileHeader]

## 原文链接
[https://segmentfault.com/a/1190000016709849](https://segmentfault.com/a/1190000016709849)


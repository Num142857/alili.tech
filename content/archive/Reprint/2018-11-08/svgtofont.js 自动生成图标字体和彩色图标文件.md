---
title: svgtofont.js 自动生成图标字体和彩色图标文件
hidden: true
categories: reprint
slug: 6abbdd3b
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x6211;&#x901A;&#x8FC7; <a href="http://iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a> &#x6216;&#x8005; <a href="https://icomoon.io" rel="nofollow noreferrer" target="_blank">icomoon</a> &#x6765;&#x5B9E;&#x73B0;&#x56FE;&#x6807;&#x7BA1;&#x7406;&#x751F;&#x6210;&#x5B57;&#x4F53;&#xFF0C;&#x5BFC;&#x5165;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;                                  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;
&#x2502;iconfont&#x2502;&#x2500;&#x2500;&#x2510;                               &#x2502;  Project   &#x2502;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2502;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;   &#x2502; &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510; &#x2502;
            &#x251C;&#x2500;&#x25B6;&#x2502;created font&#x2502;&#x2500;&#x25B6;&#x2502;download&#x2502;&#x2500;&#x2500;&#x25B6;&#x2502; &#x2502;use font&#x2502; &#x2502;
&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x2502;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;   &#x2502; &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518; &#x2502;
&#x2502;icomoon &#x2502;&#x2500;&#x2500;&#x2518;                               &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;                                  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;
&#x2502;iconfont&#x2502;&#x2500;&#x2500;&#x2510;                               &#x2502;  Project   &#x2502;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2502;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;   &#x2502; &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510; &#x2502;
            &#x251C;&#x2500;&#x25B6;&#x2502;created font&#x2502;&#x2500;&#x25B6;&#x2502;download&#x2502;&#x2500;&#x2500;&#x25B6;&#x2502; &#x2502;use font&#x2502; &#x2502;
&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x2502;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;   &#x2502; &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518; &#x2502;
&#x2502;icomoon &#x2502;&#x2500;&#x2500;&#x2518;                               &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;</code></pre><h2 id="articleHeader0">&#x4F7F;&#x7528;&#x8BF4;&#x660E;</h2><ol><li>&#x56FE;&#x6807;&#x5B57;&#x4F53;&#x53EA;&#x80FD;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x5355;&#x8272;&#xFF0C;&#x4E0D;&#x80FD;&#x751F;&#x6210; <code>&#x5F69;&#x8272;&#x56FE;&#x6807;</code>&#x3002;</li><li>&#x56FE;&#x6807;&#x5C06;&#x653E;&#x5230;&#x5E73;&#x53F0;&#x4E2D;&#x7EF4;&#x62A4;&#xFF0C;&#x4E0B;&#x8F7D;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x6837;&#x56E2;&#x961F;&#x7EF4;&#x62A4;&#x751F;&#x6210;&#x5B57;&#x4F53;&#x6210;&#x672C;&#x5C06;&#x975E;&#x5E38;&#x9AD8;&#x3002;</li></ol><p>&#x901A;&#x8FC7;&#x56FE;&#x6807;&#x5E73;&#x53F0;&#x7F51;&#x7AD9;&#x4E0B;&#x8F7D; svg &#x56FE;&#x6807;&#xFF0C;&#x5C06;&#x56FE;&#x6807;&#x653E;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x7BA1;&#x7406;&#xFF0C;&#x901A;&#x8FC7; <a href="https://github.com/jaywcjlove/svgtofont" rel="nofollow noreferrer" target="_blank">svgtofont.js</a> &#x5DE5;&#x5177;&#x6765;&#x751F;&#x6210;&#x5B83;&#xFF0C;&#x8FD9;&#x5C06;&#x662F;&#x65B0;&#x7684;&#x5B57;&#x4F53;&#x56FE;&#x6807;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                                &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;
                                &#x2502;      Project       &#x2502;
                                &#x2502;                    &#x2502;
&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;                      &#x2502;   &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;    &#x2502;
&#x2502;iconfont&#x2502;&#x2500;&#x2500;&#x2510;                   &#x2502;   &#x2502;    svg    &#x2502;&#x2500;&#x2500;&#x2510; &#x2502;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2502;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;   &#x2502;   &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2502; &#x2502;
            &#x251C;&#x2500;&#x25B6;&#x2502;download svg&#x2502;&#x2500;&#x2500;&#x25B6;&#x2502;   &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x2502; &#x2502;
&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x2502;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;   &#x2502;&#x250C;&#x2500;&#x2500;&#x2502;create font&#x2502;&#x25C0;&#x2500;&#x2518; &#x2502;
&#x2502;icomoon &#x2502;&#x2500;&#x2500;&#x2518;                   &#x2502;&#x2502;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;    &#x2502;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;                      &#x2502;&#x2502;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;    &#x2502;
                                &#x2502;&#x2514;&#x2500;&#x25B6;&#x2502; use font  &#x2502;    &#x2502;
                                &#x2502;   &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;    &#x2502;
                                &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">                                &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;
                                &#x2502;      Project       &#x2502;
                                &#x2502;                    &#x2502;
&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;                      &#x2502;   &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;    &#x2502;
&#x2502;iconfont&#x2502;&#x2500;&#x2500;&#x2510;                   &#x2502;   &#x2502;    svg    &#x2502;&#x2500;&#x2500;&#x2510; &#x2502;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2502;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;   &#x2502;   &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;  &#x2502; &#x2502;
            &#x251C;&#x2500;&#x25B6;&#x2502;download svg&#x2502;&#x2500;&#x2500;&#x25B6;&#x2502;   &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x2502; &#x2502;
&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;  &#x2502;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;   &#x2502;&#x250C;&#x2500;&#x2500;&#x2502;create font&#x2502;&#x25C0;&#x2500;&#x2518; &#x2502;
&#x2502;icomoon &#x2502;&#x2500;&#x2500;&#x2518;                   &#x2502;&#x2502;  &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;    &#x2502;
&#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;                      &#x2502;&#x2502;  &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2510;    &#x2502;
                                &#x2502;&#x2514;&#x2500;&#x25B6;&#x2502; use font  &#x2502;    &#x2502;
                                &#x2502;   &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;    &#x2502;
                                &#x2514;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2518;</code></pre><p>&#x65B0;&#x7684;&#x65B9;&#x5F0F;&#x7EF4;&#x62A4;&#x65B9;&#x5F0F;&#x597D;&#x5904;&#xFF1A;</p><ol><li>&#x4E0D;&#x9700;&#x8981;&#x77E5;&#x9053;&#x7B2C;&#x4E09;&#x65B9;&#x5E73;&#x53F0;&#x8D26;&#x53F7;&#x7EF4;&#x62A4;&#xFF0C;&#x5C06;&#x56FE;&#x6807;&#x4E0B;&#x8F7D;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x7EF4;&#x62A4;<code>&#x56FE;&#x6807;</code>&#xFF0C;&#x4E0D;&#x518D;&#x7EF4;&#x62A4;<code>&#x5B57;&#x4F53;&#x6587;&#x4EF6;</code></li><li>&#x751F;&#x6210;&#x5F69;&#x8272;&#x56FE;&#x6807;&#x6587;&#x4EF6; <code>SVG Symbol</code> &#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;</li></ol><h2 id="articleHeader1">svgtofont</h2><p>&#x8BFB;&#x53D6;&#x4E00;&#x7EC4; SVG&#x56FE;&#x6807;&#x5E76;&#x4ECE;SVG&#x56FE;&#x6807;&#x8F93;&#x51FA; TTF/EOT/WOFF/WOFF2/SVG &#x5B57;&#x4F53;&#xFF0C;&#x5B57;&#x4F53;&#x751F;&#x6210;&#x5668;&#x3002;</p><p><strong>&#x7279;&#x6027;</strong></p><ol><li>&#x652F;&#x6301;&#x7684;&#x5B57;&#x4F53;&#x683C;&#x5F0F;&#xFF1A;WOFF2&#xFF0C;WOFF&#xFF0C;EOT&#xFF0C;TTF&#x548C;SVG&#x3002;</li><li>&#x652F;&#x6301; <code>SVG Symbol</code> &#x6587;&#x4EF6;&#x3002;</li><li>&#x81EA;&#x52A8;&#x751F;&#x6210;&#x6A21;&#x677F;&#xFF08;&#x4F8B;&#x5982;css&#xFF0C;less&#x7B49;&#xFF09;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x3002;</li><li>&#x81EA;&#x52A8;&#x751F;&#x6210;&#x9884;&#x89C8;&#x7F51;&#x7AD9;&#xFF0C;&#x9884;&#x89C8;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x3002;</li></ol><h2 id="articleHeader2">&#x5B9E;&#x4F8B;</h2><p><a href="https://github.com/uiw-react/icons" rel="nofollow noreferrer" target="_blank">https://github.com/uiw-react/...</a></p><p><span class="img-wrap"><img data-src="/img/bVbheKW?w=1060&amp;h=820" src="https://static.alili.tech/img/bVbheKW?w=1060&amp;h=820" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><a href="https://github.com/uiw-react/file-icons" rel="nofollow noreferrer" target="_blank">https://github.com/uiw-react/...</a></p><p><span class="img-wrap"><img data-src="/img/bVbheKZ?w=899&amp;h=678" src="https://static.alili.tech/img/bVbheKZ?w=899&amp;h=678" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader3">&#x5B89;&#x88C5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i svgtofont" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm i svgtofont</code></pre><h2 id="articleHeader4">&#x4F7F;&#x7528;</h2><p>&#x7B80;&#x5355;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const svgtofont = require(&quot;svgtofont&quot;);
 
svgtofont({
  src: path.resolve(process.cwd(), &quot;icon&quot;), // svg &#x56FE;&#x6807;&#x76EE;&#x5F55;&#x8DEF;&#x5F84;
  dist: path.resolve(process.cwd(), &quot;fonts&quot;), // &#x8F93;&#x51FA;&#x5230;&#x6307;&#x5B9A;&#x76EE;&#x5F55;&#x4E2D;
  fontName: &quot;svgtofont&quot;, // &#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x540D;&#x79F0;
  css: true, // &#x751F;&#x6210;&#x5B57;&#x4F53;&#x6587;&#x4EF6;
}).then(() =&gt; {
  console.log(&apos;done!&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> svgtofont = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;svgtofont&quot;</span>);
 
svgtofont({
  <span class="hljs-attr">src</span>: path.resolve(process.cwd(), <span class="hljs-string">&quot;icon&quot;</span>), <span class="hljs-comment">// svg &#x56FE;&#x6807;&#x76EE;&#x5F55;&#x8DEF;&#x5F84;</span>
  dist: path.resolve(process.cwd(), <span class="hljs-string">&quot;fonts&quot;</span>), <span class="hljs-comment">// &#x8F93;&#x51FA;&#x5230;&#x6307;&#x5B9A;&#x76EE;&#x5F55;&#x4E2D;</span>
  fontName: <span class="hljs-string">&quot;svgtofont&quot;</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x540D;&#x79F0;</span>
  css: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x751F;&#x6210;&#x5B57;&#x4F53;&#x6587;&#x4EF6;</span>
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;done!&apos;</span>);
});</code></pre><h2 id="articleHeader5">&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const svgtofont = require(&quot;svgtofont&quot;);
const path = require(&quot;path&quot;);

svgtofont({
  src: path.resolve(process.cwd(), &quot;icon&quot;), // svg &#x56FE;&#x6807;&#x76EE;&#x5F55;&#x8DEF;&#x5F84;
  dist: path.resolve(process.cwd(), &quot;fonts&quot;), // &#x8F93;&#x51FA;&#x5230;&#x6307;&#x5B9A;&#x76EE;&#x5F55;&#x4E2D;
  fontName: &quot;svgtofont&quot;, // &#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x540D;&#x79F0;
  css: true, // &#x751F;&#x6210;&#x5B57;&#x4F53;&#x6587;&#x4EF6;
  startNumber: 20000, // unicode&#x8D77;&#x59CB;&#x7F16;&#x53F7;
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  },
  // website = null, &#x6CA1;&#x6709;&#x6F14;&#x793A;html&#x6587;&#x4EF6;
  website: {
    title: &quot;svgtofont&quot;,
    // Must be a .svg format image.
    logo: path.resolve(process.cwd(), &quot;svg&quot;, &quot;git.svg&quot;),
    version: pkg.version,
    meta: {
      description: &quot;Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.&quot;,
      keywords: &quot;svgtofont,TTF,EOT,WOFF,WOFF2,SVG&quot;
    },
    description: ``,
    links: [
      {
        title: &quot;GitHub&quot;,
        url: &quot;https://github.com/jaywcjlove/svgtofont&quot;
      },
      {
        title: &quot;Feedback&quot;,
        url: &quot;https://github.com/jaywcjlove/svgtofont/issues&quot;
      },
      {
        title: &quot;Font Class&quot;,
        url: &quot;index.html&quot;
      },
      {
        title: &quot;Unicode&quot;,
        url: &quot;unicode.html&quot;
      }
    ],
    footerInfo: `Licensed under MIT. (Yes it&apos;s free and &lt;a href=&quot;https://github.com/jaywcjlove/svgtofont&quot;&gt;open-sourced&lt;/a&gt;`
  }
}).then(() =&gt; {
  console.log(&apos;done!&apos;);
});;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> svgtofont = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;svgtofont&quot;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;path&quot;</span>);

svgtofont({
  <span class="hljs-attr">src</span>: path.resolve(process.cwd(), <span class="hljs-string">&quot;icon&quot;</span>), <span class="hljs-comment">// svg &#x56FE;&#x6807;&#x76EE;&#x5F55;&#x8DEF;&#x5F84;</span>
  dist: path.resolve(process.cwd(), <span class="hljs-string">&quot;fonts&quot;</span>), <span class="hljs-comment">// &#x8F93;&#x51FA;&#x5230;&#x6307;&#x5B9A;&#x76EE;&#x5F55;&#x4E2D;</span>
  fontName: <span class="hljs-string">&quot;svgtofont&quot;</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x540D;&#x79F0;</span>
  css: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x751F;&#x6210;&#x5B57;&#x4F53;&#x6587;&#x4EF6;</span>
  startNumber: <span class="hljs-number">20000</span>, <span class="hljs-comment">// unicode&#x8D77;&#x59CB;&#x7F16;&#x53F7;</span>
  svgicons2svgfont: {
    <span class="hljs-attr">fontHeight</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">normalize</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-comment">// website = null, &#x6CA1;&#x6709;&#x6F14;&#x793A;html&#x6587;&#x4EF6;</span>
  website: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;svgtofont&quot;</span>,
    <span class="hljs-comment">// Must be a .svg format image.</span>
    logo: path.resolve(process.cwd(), <span class="hljs-string">&quot;svg&quot;</span>, <span class="hljs-string">&quot;git.svg&quot;</span>),
    <span class="hljs-attr">version</span>: pkg.version,
    <span class="hljs-attr">meta</span>: {
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.&quot;</span>,
      <span class="hljs-attr">keywords</span>: <span class="hljs-string">&quot;svgtofont,TTF,EOT,WOFF,WOFF2,SVG&quot;</span>
    },
    <span class="hljs-attr">description</span>: <span class="hljs-string">``</span>,
    <span class="hljs-attr">links</span>: [
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;GitHub&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;https://github.com/jaywcjlove/svgtofont&quot;</span>
      },
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Feedback&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;https://github.com/jaywcjlove/svgtofont/issues&quot;</span>
      },
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Font Class&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;index.html&quot;</span>
      },
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Unicode&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;unicode.html&quot;</span>
      }
    ],
    <span class="hljs-attr">footerInfo</span>: <span class="hljs-string">`Licensed under MIT. (Yes it&apos;s free and &lt;a href=&quot;https://github.com/jaywcjlove/svgtofont&quot;&gt;open-sourced&lt;/a&gt;`</span>
  }
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;done!&apos;</span>);
});;</code></pre><h2 id="articleHeader6">API</h2><p><a href="https://github.com/jaywcjlove/svgtofont" rel="nofollow noreferrer" target="_blank">svgtofont</a> &#x63D0;&#x4F9B; API&#xFF0C;&#x53EF;&#x4EE5;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x7684;&#x81EA;&#x5DF1;&#x751F;&#x6210;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x65B9;&#x6CD5;&#x81EA;&#x52A8;&#x751F;&#x6210;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {
    createSVG,
    createTTF,
    createEOT,
    createWOFF,
    createWOFF2
} = require(&quot;svgtofont/src/utils&quot;);

const options = { ... };

createSVG(options) // SVG =&gt; SVG Font
  .then(UnicodeObjChar =&gt; createTTF(options)) // SVG Font =&gt; TTF
  .then(() =&gt; createEOT(options)) // TTF =&gt; EOT
  .then(() =&gt; createWOFF(options)) // TTF =&gt; WOFF
  .then(() =&gt; createWOFF2(options)) // TTF =&gt; WOFF2
  .then(() =&gt; createSvgSymbol(options)) // SVG Files =&gt; SVG Symbol" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {
    createSVG,
    createTTF,
    createEOT,
    createWOFF,
    createWOFF2
} = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;svgtofont/src/utils&quot;</span>);

<span class="hljs-keyword">const</span> options = { ... };

createSVG(options) <span class="hljs-comment">// SVG =&gt; SVG Font</span>
  .then(<span class="hljs-function"><span class="hljs-params">UnicodeObjChar</span> =&gt;</span> createTTF(options)) <span class="hljs-comment">// SVG Font =&gt; TTF</span>
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> createEOT(options)) <span class="hljs-comment">// TTF =&gt; EOT</span>
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> createWOFF(options)) <span class="hljs-comment">// TTF =&gt; WOFF</span>
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> createWOFF2(options)) <span class="hljs-comment">// TTF =&gt; WOFF2</span>
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> createSvgSymbol(options)) <span class="hljs-comment">// SVG Files =&gt; SVG Symbol</span></code></pre><h2 id="articleHeader7">options</h2><blockquote>svgtofont(options)</blockquote><h3 id="articleHeader8">dist</h3><blockquote>Type: <code>String</code><br>Default value: <code>dist</code></blockquote><p>svg &#x56FE;&#x6807;&#x8DEF;&#x5F84;</p><h3 id="articleHeader9">src</h3><blockquote>Type: <code>String</code><br>Default value: <code>svg</code></blockquote><p>&#x8F93;&#x51FA;&#x5230;&#x6307;&#x5B9A;&#x76EE;&#x5F55;</p><h3 id="articleHeader10">fontName</h3><blockquote>Type: <code>String</code><br>Default value: <code>iconfont</code></blockquote><p>&#x60A8;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x4F53;&#x540D;&#x79F0;&#x3002;</p><h3 id="articleHeader11">unicodeStart</h3><blockquote>Type: <code>Number</code><br>Default value: <code>10000</code></blockquote><p>unicode&#x8D77;&#x59CB;&#x7F16;&#x53F7;</p><h3 id="articleHeader12">clssaNamePrefix</h3><blockquote>Type: <code>String</code><br>Default value: font name</blockquote><p>&#x521B;&#x5EFA;&#x5B57;&#x4F53;&#x7C7B;&#x540D;&#x79F0;&#x524D;&#x7F00;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5B57;&#x4F53;&#x540D;&#x79F0;&#x3002;</p><h3 id="articleHeader13">css</h3><blockquote>Type: <code>Boolean</code><br>Default value: <code>false</code></blockquote><p>&#x521B;&#x5EFA;CSS / LESS&#x6587;&#x4EF6;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x201C;true&#x201D;&#x3002;</p><h3 id="articleHeader14">svgicons2svgfont</h3><p>&#x8FD9;&#x662F; <a href="https://github.com/nfroidure/svgicons2svgfont/tree/dd713bea4f97afa59f7dba6a21ff7f22db565bcf#api" rel="nofollow noreferrer" target="_blank">svgicons2svgfont</a> &#x7684;&#x8BBE;&#x7F6E;</p><h4>svgicons2svgfont.fontName</h4><blockquote>Type: <code>String</code><br>Default value: <code>&apos;iconfont&apos;</code></blockquote><p>&#x60A8;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x4F53;&#x540D;&#x79F0;&#xFF0C;&#x4E0E;&#x524D;&#x9762; <code>fontName</code> &#x4E00;&#x6837;&#x3002;</p><h4>svgicons2svgfont.fontId</h4><blockquote>Type: <code>String</code><br>Default value: the options.fontName value</blockquote><p>&#x4F60;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x4F53;ID&#x3002;</p><h4>svgicons2svgfont.fontStyle</h4><blockquote>Type: <code>String</code><br>Default value: <code>&apos;&apos;</code></blockquote><p>&#x4F60;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x4F53;&#x6837;&#x5F0F;&#x3002;</p><h4>svgicons2svgfont.fontWeight</h4><blockquote>Type: <code>String</code><br>Default value: <code>&apos;&apos;</code></blockquote><p>&#x4F60;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x4F53;&#x7C97;&#x7EC6;&#x3002;</p><h4>svgicons2svgfont.fixedWidth</h4><blockquote>Type: <code>Boolean</code><br>Default value: <code>false</code></blockquote><p>&#x521B;&#x5EFA;&#x6700;&#x5927;&#x8F93;&#x5165;&#x56FE;&#x6807;&#x5BBD;&#x5EA6;&#x7684;&#x7B49;&#x5BBD;&#x5B57;&#x4F53;&#x3002;</p><h4>svgicons2svgfont.centerHorizontally</h4><blockquote>Type: <code>Boolean</code><br>Default value: <code>false</code></blockquote><p>&#x8BA1;&#x7B97;&#x5B57;&#x5F62;&#x7684;&#x8FB9;&#x754C;&#x5E76;&#x4F7F;&#x5176;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x3002;</p><h4>svgicons2svgfont.normalize</h4><blockquote>Type: <code>Boolean</code><br>Default value: <code>false</code></blockquote><p>&#x901A;&#x8FC7;&#x5C06;&#x56FE;&#x6807;&#x7F29;&#x653E;&#x5230;&#x6700;&#x9AD8;&#x56FE;&#x6807;&#x7684;&#x9AD8;&#x5EA6;&#x6765;&#x6807;&#x51C6;&#x5316;&#x56FE;&#x6807;&#x3002;</p><h4>svgicons2svgfont.fontHeight</h4><blockquote>Type: <code>Number</code><br>Default value: <code>MAX(icons.height)</code></blockquote><p>&#x8F93;&#x51FA;&#x7684;&#x5B57;&#x4F53;&#x9AD8;&#x5EA6;&#xFF08;&#x9ED8;&#x8BA4;&#x4E3A;&#x6700;&#x9AD8;&#x8F93;&#x5165;&#x56FE;&#x6807;&#x7684;&#x9AD8;&#x5EA6;&#xFF09;&#x3002;</p><h4>svgicons2svgfont.round</h4><blockquote>Type: <code>Number</code><br>Default value: <code>10e12</code></blockquote><p>&#x8BBE;&#x7F6E;SVG&#x8DEF;&#x5F84;&#x820D;&#x5165;&#x3002;</p><h4>svgicons2svgfont.descent</h4><blockquote>Type: <code>Number</code><br>Default value: <code>0</code></blockquote><p>&#x5B57;&#x4F53;&#x4E0B;&#x964D;&#x3002; &#x81EA;&#x5DF1;&#x4FEE;&#x590D;&#x5B57;&#x4F53;&#x57FA;&#x7EBF;&#x5F88;&#x6709;&#x7528;&#x3002;</p><p><strong>&#x8B66;&#x544A;&#xFF1A;</strong> &#x4E0B;&#x964D;&#x662F;&#x4E00;&#x4E2A;&#x6B63;&#x503C;&#xFF01;</p><h4>svgicons2svgfont.ascent</h4><blockquote>Type: <code>Number</code><br>Default value: <code>fontHeight - descent</code></blockquote><p>&#x5B57;&#x4F53;&#x4E0A;&#x5347;&#x3002; &#x4EC5;&#x5F53;&#x60A8;&#x77E5;&#x9053;&#x81EA;&#x5DF1;&#x5728;&#x505A;&#x4EC0;&#x4E48;&#x65F6;&#x624D;&#x4F7F;&#x7528;&#x6B64;&#x9009;&#x9879;&#x3002; &#x4E3A;&#x60A8;&#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x5408;&#x9002;&#x7684;&#x503C;&#x3002;</p><h4>svgicons2svgfont.metadata</h4><blockquote>Type: <code>String</code><br>Default value: <code>undefined</code></blockquote><p>&#x5B57;&#x4F53; <a href="http://www.w3.org/TR/SVG/metadata.html" rel="nofollow noreferrer" target="_blank">metadata</a>&#x3002; &#x4F60;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4EFB;&#x4F55;<br>&#x5B57;&#x7B26;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x5B83;&#x662F;&#x9002;&#x5408;&#x63D0;&#x53CA;&#x7248;&#x6743;&#x7684;&#x5730;&#x65B9;&#x3002;</p><h4>svgicons2svgfont.log</h4><blockquote>Type: <code>Function</code><br>Default value: <code>console.log</code></blockquote><p>&#x5141;&#x8BB8;&#x60A8;&#x63D0;&#x4F9B;&#x81EA;&#x5DF1;&#x7684;&#x65E5;&#x5FD7;&#x8BB0;&#x5F55;&#x529F;&#x80FD;&#x3002; &#x8BBE;&#x7F6E;&#x4E3A; <code>function&#xFF08;&#xFF09;{}</code> &#x7981;&#x7528;&#x65E5;&#x5FD7;&#x8BB0;&#x5F55;</p><h3 id="articleHeader15">svg2ttf</h3><p>&#x8FD9;&#x662F; <a href="https://github.com/fontello/svg2ttf/tree/c33a126920f46b030e8ce960cc7a0e38a6946bbc#svg2ttfsvgfontstring-options---buf" rel="nofollow noreferrer" target="_blank">svg2ttf</a> &#x7684;&#x8BBE;&#x7F6E;</p><h4>svg2ttf.copyright</h4><blockquote>Type: <code>String</code></blockquote><p>&#x7248;&#x6743;&#x5B57;&#x7B26;&#x4E32;</p><h4>svg2ttf.ts</h4><blockquote>Type: <code>String</code></blockquote><p>&#x7528;&#x4E8E;&#x8986;&#x76D6;&#x521B;&#x5EFA;&#x65F6;&#x95F4;&#x7684;Unix&#x65F6;&#x95F4;&#x6233;&#xFF08;&#x4EE5;&#x79D2;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;</p><h4>svg2ttf.version</h4><blockquote>Type: <code>Number</code></blockquote><p>font version string, can be Version <code>x.y</code> or <code>x.y</code>.</p><h3 id="articleHeader16">website</h3><p>&#x5B9A;&#x4E49;&#x9884;&#x89C8;Web&#x5185;&#x5BB9;&#x3002; &#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  ...
  // website = null, no demo html files
  website: {
    title: &quot;svgtofont&quot;,
    logo: path.resolve(process.cwd(), &quot;svg&quot;, &quot;git.svg&quot;),
    version: pkg.version,
    meta: {
      description: &quot;Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.&quot;,
      keywords: &quot;svgtofont,TTF,EOT,WOFF,WOFF2,SVG&quot;,
      favicon: &quot;./favicon.png&quot;
    },
    footerLinks: [
      {
        title: &quot;GitHub&quot;,
        url: &quot;https://github.com/jaywcjlove/svgtofont&quot;
      },
      {
        title: &quot;Feedback&quot;,
        url: &quot;https://github.com/jaywcjlove/svgtofont/issues&quot;
      },
      {
        title: &quot;Font Class&quot;,
        url: &quot;index.html&quot;
      },
      {
        title: &quot;Unicode&quot;,
        url: &quot;unicode.html&quot;
      }
    ]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  ...
  <span class="hljs-comment">// website = null, no demo html files</span>
  website: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;svgtofont&quot;</span>,
    <span class="hljs-attr">logo</span>: path.resolve(process.cwd(), <span class="hljs-string">&quot;svg&quot;</span>, <span class="hljs-string">&quot;git.svg&quot;</span>),
    <span class="hljs-attr">version</span>: pkg.version,
    <span class="hljs-attr">meta</span>: {
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.&quot;</span>,
      <span class="hljs-attr">keywords</span>: <span class="hljs-string">&quot;svgtofont,TTF,EOT,WOFF,WOFF2,SVG&quot;</span>,
      <span class="hljs-attr">favicon</span>: <span class="hljs-string">&quot;./favicon.png&quot;</span>
    },
    <span class="hljs-attr">footerLinks</span>: [
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;GitHub&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;https://github.com/jaywcjlove/svgtofont&quot;</span>
      },
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Feedback&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;https://github.com/jaywcjlove/svgtofont/issues&quot;</span>
      },
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Font Class&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;index.html&quot;</span>
      },
      {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Unicode&quot;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;unicode.html&quot;</span>
      }
    ]
  }
}</code></pre><h4>website.template</h4><blockquote>Type: <code>String</code><br>Default value: <a href="https://github.com/jaywcjlove/svgtofont/blob/153f78cf541cc880fd3ce7940ba46c6255f854ca/src/website/index.ejs" rel="nofollow noreferrer" target="_blank">index.ejs</a></blockquote><p>&#x81EA;&#x5B9A;&#x4E49;&#x6A21;&#x677F;&#x53EF;&#x81EA;&#x5B9A;&#x4E49;&#x53C2;&#x6570;&#x3002; &#x60A8;&#x53EF;&#x4EE5;&#x6839;&#x636E;<a href="https://github.com/jaywcjlove/svgtofont/blob/153f78cf541cc880fd3ce7940ba46c6255f854ca/src/website/index.ejs" rel="nofollow noreferrer" target="_blank">&#x9ED8;&#x8BA4;&#x6A21;&#x677F;</a>&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x7684;&#x6A21;&#x677F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  website: {
    template: path.join(process.cwd(), &quot;my-template.ejs&quot;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">website</span>: {
    <span class="hljs-attr">template</span>: path.join(process.cwd(), <span class="hljs-string">&quot;my-template.ejs&quot;</span>)
  }
}</code></pre><h4>website.index</h4><blockquote>Type: <code>String</code><br>Default value: <code>font-class</code>, Enum{<code>font-class</code>, <code>unicode</code>, <code>symbol</code>}</blockquote><p>&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x4E3B;&#x9875;&#x3002;</p><h2 id="articleHeader17">&#x5B57;&#x4F53;&#x4F7F;&#x7528;</h2><p>&#x5047;&#x8BBE;&#x5B57;&#x4F53;&#x540D;&#x79F0;&#x5B9A;&#x4E49;&#x4E3A; <code>svgtofont</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3B;&#x9875;&#x4E3A;<code>unicode</code>&#xFF0C;&#x5C06;&#x751F;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-class.html
index.html
symbol.html
svgtofont.css
svgtofont.eot
svgtofont.less
svgtofont.svg
svgtofont.symbol.svg
svgtofont.ttf
svgtofont.woff
svgtofont.woff2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">font-class.html
index.html
symbol.html
svgtofont.css
svgtofont.eot
svgtofont.less
svgtofont.svg
svgtofont.symbol.svg
svgtofont.ttf
svgtofont.woff
svgtofont.woff2</code></pre><p>&#x9884;&#x89C8;demo <code>font-class.html</code>, <code>symbol.html</code> &#x548C; <code>index.html</code>&#x3002;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x6837;&#x5F0F;<code>svgtofont.css</code> &#x548C; <code>svgtofont.less</code> &#x3002;</p><h3 id="articleHeader18">symbol svg</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;svg class=&quot;icon&quot; aria-hidden=&quot;true&quot;&gt;
  &lt;use xlink:href=&quot;svgtofont.symbol.svg#svgtofont-git&quot;&gt;&lt;/use&gt;
&lt;/svg&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;icon&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">&quot;svgtofont.symbol.svg#svgtofont-git&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre><h3 id="articleHeader19">Unicode</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.iconfont {
  font-family: &quot;svgtofont-iconfont&quot; !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
&lt;/style&gt;
&lt;span class=&quot;iconfont&quot;&gt;&amp;#59907;&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.iconfont</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;svgtofont-iconfont&quot;</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
  <span class="hljs-attribute">font-style</span>: normal;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-webkit-text-stroke-width</span>: <span class="hljs-number">0.2px</span>;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;iconfont&quot;</span>&gt;</span>&amp;#59907;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><h3 id="articleHeader20">Class Name</h3><p>&#x652F;&#x6301;<code>.less</code>&#x548C;<code>.css</code>&#x6837;&#x5F0F;&#x5F15;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;node_modules/fonts/svgtofont.css&quot;&gt;
&lt;i class=&quot;svgtofont-apple&quot;&gt;&lt;/i&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;node_modules/fonts/svgtofont.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;svgtofont-apple&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre><h2 id="articleHeader21">License</h2><p>Licensed under the <a href="https://opensource.org/licenses/MIT" rel="nofollow noreferrer" target="_blank">MIT License</a>.</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
svgtofont.js 自动生成图标字体和彩色图标文件

## 原文链接
[https://segmentfault.com/a/1190000016462275](https://segmentfault.com/a/1190000016462275)


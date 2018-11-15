---
title: 基于 taro 和 taro-ui 的仿时光网的小程序
reprint: true
categories: reprint
abbrlink: 214bcf93
date: 2018-11-04 02:30:10
---

{{% raw %}}
<p>&#x672C;&#x9879;&#x76EE;&#x662F;&#x57FA;&#x4E8E; taro &#x548C; taro-ui &#x7684;&#x4EFF;&#x65F6;&#x5149;&#x7F51;&#x7684;&#x5C0F;&#x7A0B;&#x5E8F;&#x5B66;&#x4E60;&#x9879;&#x76EE;&#xFF0C;&#x540E;&#x7EED;&#x529F;&#x80FD;&#x4ECD;&#x5728;&#x5F00;&#x53D1;&#x4E2D;</p><p>&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x63A5;&#x53E3;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5149;&#x7F51;&#x7684;API&#xFF0C;&#x6709;&#x4FB5;&#x72AF;&#x65F6;&#x5149;&#x7F51;&#x6743;&#x76CA;&#x7684;&#x5ACC;&#x7591;&#xFF0C;&#x82E5;&#x88AB;&#x544A;&#x77E5;&#x9700;&#x505C;&#x6B62;&#x4F7F;&#x7528;&#xFF0C;&#x672C;&#x4EBA;&#x4F1A;&#x53CA;&#x65F6;&#x5220;&#x9664;&#x6B64;&#x9875;&#x9762;&#x4E0E;&#x6574;&#x4E2A;&#x9879;&#x76EE;</p><p><strong>&#x9879;&#x76EE;&#x8FD0;&#x884C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x5168;&#x5C40;&#x5B89;&#x88C5; taro &#x5F00;&#x53D1;&#x5DE5;&#x5177;
npm install -g @tarojs/cli
# &#x514B;&#x9686;&#x9879;&#x76EE;
git clone https://github.com/calabash519/taro-mtime.git
cd taro-mtime
# &#x5B89;&#x88C5;&#x4F9D;&#x8D56;
npm i
# &#x5C0F;&#x7A0B;&#x5E8F;&#x9884;&#x89C8;&#xFF08;&#x9700;&#x4E0B;&#x8F7D;&#x4E0B;&#x8F7D;&#x5E76;&#x6253;&#x5F00;&#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#xFF0C;&#x9009;&#x62E9;&#x9884;&#x89C8;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF09;
npm run dev:weapp
# H5 &#x9884;&#x89C8;
npm run dev:h5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vala"><code><span class="hljs-meta"># &#x5168;&#x5C40;&#x5B89;&#x88C5; taro &#x5F00;&#x53D1;&#x5DE5;&#x5177;</span>
npm install -g @tarojs/cli
<span class="hljs-meta"># &#x514B;&#x9686;&#x9879;&#x76EE;</span>
git clone https:<span class="hljs-comment">//github.com/calabash519/taro-mtime.git</span>
cd taro-mtime
<span class="hljs-meta"># &#x5B89;&#x88C5;&#x4F9D;&#x8D56;</span>
npm i
<span class="hljs-meta"># &#x5C0F;&#x7A0B;&#x5E8F;&#x9884;&#x89C8;&#xFF08;&#x9700;&#x4E0B;&#x8F7D;&#x4E0B;&#x8F7D;&#x5E76;&#x6253;&#x5F00;&#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#xFF0C;&#x9009;&#x62E9;&#x9884;&#x89C8;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF09;</span>
npm run dev:weapp
<span class="hljs-meta"># H5 &#x9884;&#x89C8;</span>
npm run dev:h5</code></pre><p><strong>&#x6587;&#x4EF6;&#x76EE;&#x5F55;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; dist              &#x7F16;&#x8BD1;&#x540E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; config            &#x9879;&#x76EE;&#x914D;&#x7F6E;&#x9879;
    &#x251C;&#x2500;&#x2500; dev.js             
    &#x251C;&#x2500;&#x2500; index.js           
    &#x2514;&#x2500;&#x2500; prod.js            
&#x2514;&#x2500;&#x2500; src
    &#x251C;&#x2500;&#x2500; assets            &#x5916;&#x90E8;&#x8D44;&#x6E90;
        &#x251C;&#x2500;&#x2500; data          mock &#x6570;&#x636E;
        &#x2514;&#x2500;&#x2500; images        &#x56FE;&#x7247;&#x8D44;&#x6E90;
    &#x2514;&#x2500;&#x2500; pages             &#x9875;&#x9762;&#x5C42; 
        &#x251C;&#x2500;&#x2500; coming-soon   &#x5373;&#x5C06;&#x4E0A;&#x6620;
        &#x251C;&#x2500;&#x2500; components    &#x5171;&#x7528;&#x7EC4;&#x4EF6;
        &#x251C;&#x2500;&#x2500; hot-showing   &#x6B63;&#x5728;&#x70ED;&#x6620;
        &#x251C;&#x2500;&#x2500; index         &#x6B63;&#x5728;&#x552E;&#x7968;
        &#x251C;&#x2500;&#x2500; user-center   &#x7528;&#x6237;&#x4E2D;&#x5FC3;
        &#x251C;&#x2500;&#x2500; user-message  &#x6211;&#x7684;&#x6D88;&#x606F;
        &#x2514;&#x2500;&#x2500; user-setting  &#x4E2A;&#x4EBA;&#x8D44;&#x6599;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>&#x251C;&#x2500;&#x2500; <span class="hljs-keyword">dist </span>             &#x7F16;&#x8BD1;&#x540E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; <span class="hljs-built_in">config</span>            &#x9879;&#x76EE;&#x914D;&#x7F6E;&#x9879;
    &#x251C;&#x2500;&#x2500; dev.<span class="hljs-keyword">js </span>            
    &#x251C;&#x2500;&#x2500; index.<span class="hljs-keyword">js </span>          
    &#x2514;&#x2500;&#x2500; prod.<span class="hljs-keyword">js </span>           
&#x2514;&#x2500;&#x2500; src
    &#x251C;&#x2500;&#x2500; assets            &#x5916;&#x90E8;&#x8D44;&#x6E90;
        &#x251C;&#x2500;&#x2500; data          mock &#x6570;&#x636E;
        &#x2514;&#x2500;&#x2500; images        &#x56FE;&#x7247;&#x8D44;&#x6E90;
    &#x2514;&#x2500;&#x2500; pages             &#x9875;&#x9762;&#x5C42; 
        &#x251C;&#x2500;&#x2500; coming-soon   &#x5373;&#x5C06;&#x4E0A;&#x6620;
        &#x251C;&#x2500;&#x2500; components    &#x5171;&#x7528;&#x7EC4;&#x4EF6;
        &#x251C;&#x2500;&#x2500; hot-<span class="hljs-keyword">showing </span>  &#x6B63;&#x5728;&#x70ED;&#x6620;
        &#x251C;&#x2500;&#x2500; index         &#x6B63;&#x5728;&#x552E;&#x7968;
        &#x251C;&#x2500;&#x2500; user-center   &#x7528;&#x6237;&#x4E2D;&#x5FC3;
        &#x251C;&#x2500;&#x2500; user-message  &#x6211;&#x7684;&#x6D88;&#x606F;
        &#x2514;&#x2500;&#x2500; user-setting  &#x4E2A;&#x4EBA;&#x8D44;&#x6599;</code></pre><p><strong>&#x5DF2;&#x5F00;&#x53D1;&#x529F;&#x80FD;&#x5217;&#x8868;</strong></p><ul><li>&#x6B63;&#x5728;&#x70ED;&#x6620;</li><li>&#x5373;&#x5C06;&#x4E0A;&#x6620;</li><li>&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;</li><li>&#x4E2A;&#x4EBA;&#x8BBE;&#x7F6E;</li><li>&#x6211;&#x7684;&#x6D88;&#x606F;</li></ul><p><strong>&#x5F85;&#x5F00;&#x53D1;&#x529F;&#x80FD;&#x5217;&#x8868;</strong></p><ul><li>&#x7535;&#x5F71;&#x8BE6;&#x60C5;&#x9875;</li><li>&#x4E2A;&#x4EBA;&#x8BBE;&#x7F6E;&#x9879;&#x5185;&#x5BB9;&#x9875;</li><li>&#x6211;&#x7684;&#x6D88;&#x606F;&#x9879;&#x5185;&#x5BB9;&#x9875;</li></ul><p><strong>&#x9875;&#x9762;&#x622A;&#x56FE;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbh8AB?w=316&amp;h=567" src="https://static.alili.tech/img/bVbh8AB?w=316&amp;h=567" alt="&#x6B63;&#x5728;&#x70ED;&#x6620;" title="&#x6B63;&#x5728;&#x70ED;&#x6620;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbh8Al?w=316&amp;h=563" src="https://static.alili.tech/img/bVbh8Al?w=316&amp;h=563" alt="&#x5373;&#x5C06;&#x4E0A;&#x6620;" title="&#x5373;&#x5C06;&#x4E0A;&#x6620;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbh8AD?w=318&amp;h=567" src="https://static.alili.tech/img/bVbh8AD?w=318&amp;h=567" alt="&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;" title="&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbh8AE?w=316&amp;h=564" src="https://static.alili.tech/img/bVbh8AE?w=316&amp;h=564" alt="&#x6211;&#x7684;&#x8D44;&#x6599;" title="&#x6211;&#x7684;&#x8D44;&#x6599;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbh8AF?w=317&amp;h=562" src="https://static.alili.tech/img/bVbh8AF?w=317&amp;h=562" alt="&#x4E2A;&#x4EBA;&#x8BBE;&#x7F6E;" title="&#x4E2A;&#x4EBA;&#x8BBE;&#x7F6E;" style="cursor:pointer;display:inline"></span></p><p><strong>&#x9879;&#x76EE;&#x5730;&#x5740;</strong></p><p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/calabash519/taro-mtime" rel="nofollow noreferrer" target="_blank">https://github.com/calabash51...</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x60A8;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x70B9;&#x53F3;&#x4E0A;&#x89D2; &quot;Star&quot; &#x652F;&#x6301;&#x4E00;&#x4E0B; &#x8C22;&#x8C22;&#xFF01; ^_^</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 taro 和 taro-ui 的仿时光网的小程序

## 原文链接
[https://segmentfault.com/a/1190000016676867](https://segmentfault.com/a/1190000016676867)


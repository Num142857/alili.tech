---
title: '使用webpack手动搭建一个基于vue的单页面应用' 
date: 2018-11-29 9:27:39
hidden: true
slug: yosfgxwfyop
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x5F53;&#x6211;&#x4EEC;&#x9762;&#x5BF9;vue-cli &#x590D;&#x6742;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x5404;&#x79CD;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x662F;&#x5426;&#x4F1A;&#x4E3A;&#x6B64;&#x611F;&#x5230;&#x5934;&#x75BC;&#xFF0C;&#x662F;&#x5426;&#x4F1A;&#x89C9;&#x5F97;&#x5FC3;&#x7D2F;&#xFF1F;&#x4ECA;&#x5929;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x8DDF;&#x7740;&#x6211;&#x4E00;&#x8D77;&#xFF0C;&#x81EA;&#x5DF1;&#x6765;&#x662F;&#x7528;webpack &#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;vue&#x5355;&#x9875;&#x9762;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#xFF0C;&#x7ACB;&#x5373;&#x5F00;&#x59CB;&#xFF1A;</p>
<p>1.&#x521B;&#x5EFA;&#x9879;&#x76EE;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init 
  " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init 
  </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbBQv?w=2010&amp;h=432" src="https://static.alili.tech/img/bVbbBQv?w=2010&amp;h=432" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>2.&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x9700;&#x8981;&#x7684;&#x57FA;&#x7840;&#x6587;&#x4EF6;&#x548C;&#x6587;&#x4EF6;&#x5939;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbB7U?w=1262&amp;h=548" src="https://static.alili.tech/img/bVbbB7U?w=1262&amp;h=548" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>3.&#x5B89;&#x88C5;webpack&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x4F9D;&#x8D56;&#x5305;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbCtB?w=1704&amp;h=814" src="https://static.alili.tech/img/bVbbCtB?w=1704&amp;h=814" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>4.&#x914D;&#x7F6E;webpack-base-config.js</p>
<p><span class="img-wrap"><img data-src="/img/bVbbD3o?w=2412&amp;h=686" src="https://static.alili.tech/img/bVbbD3o?w=2412&amp;h=686" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>5.&#x5728; package.json &#x91CC;&#x9762;&#x6DFB;&#x52A0; &#x6253;&#x5305;&#x547D;&#x4EE4;&#xFF0C;&#x6DFB;&#x52A0; --config &#x6307;&#x5411; webpack.base.config.js</p>
<p><span class="img-wrap"><img data-src="/img/bVbbD3I?w=2558&amp;h=426" src="https://static.alili.tech/img/bVbbD3I?w=2558&amp;h=426" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>--&#x5728;&#x547D;&#x4EE4;&#x9762;&#x677F;&#x4E2D;&#x8F93;&#x5165; npm run build<br>   --&#x4F1A;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x751F;&#x6210;&#x4E00;&#x4E2A; dist&#x6587;&#x4EF6;&#x5939;<br><span class="img-wrap"><img data-src="/img/bVbbCvN?w=4320&amp;h=1348" src="https://static.alili.tech/img/bVbbCvN?w=4320&amp;h=1348" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>--&#x5DF2;&#x7ECF;&#x751F;&#x6210;&#x597D;&#x6253;&#x5305;&#x6587;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x6709;js&#xFF0C;&#x6CA1;&#x6709;html&#xFF0C;</p>
<p>6.&#x5F15;&#x5165; html-webpack-plugin &#x63D2;&#x4EF6;&#xFF0C;&#x8BA9;webpack&#x628A;html&#x4E5F;&#x6253;&#x5305;&#x8FDB;&#x53BB;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbD4H?w=2204&amp;h=748" src="https://static.alili.tech/img/bVbbD4H?w=2204&amp;h=748" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x518D;&#x6B21;&#x6267;&#x884C; npm run build  &#x91CD;&#x65B0;&#x751F;&#x6210;dist&#x6587;&#x4EF6;&#x5939;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbCxV?w=2678&amp;h=742" src="https://static.alili.tech/img/bVbbCxV?w=2678&amp;h=742" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>html &#x548C; js &#x90FD;&#x6709;&#x4E86;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6253;&#x5F00;html</p>
<p><span class="img-wrap"><img data-src="/img/bVbbCyE?w=1177&amp;h=642" src="https://static.alili.tech/img/bVbbCyE?w=1177&amp;h=642" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>7.&#x5728;webpack.dev.config.js &#x4E2D;&#x914D;&#x7F6E; dev-server &#x6784;&#x5EFA;&#x672C;&#x5730;node&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6DFB;&#x52A0;&#x70ED;&#x90E8;&#x7F72;&#x529F;&#x80FD;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbCzG?w=2620&amp;h=1022" src="https://static.alili.tech/img/bVbbCzG?w=2620&amp;h=1022" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>8.package.json &#x4E2D;,&#x6DFB;&#x52A0; babel-loader babel-core babel-preset-env &#x4F9D;&#x8D56;&#x5305;&#xFF0C;&#x652F;&#x6301; es6,&#x6DFB;&#x52A0; server &#x6307;&#x4EE4;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbD52?w=2450&amp;h=954" src="https://static.alili.tech/img/bVbbD52?w=2450&amp;h=954" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>9.&#x914D;&#x7F6E; loader &#xFF0C;&#x6DFB;&#x52A0;css, js, vue loader&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;loader&#x52A0;&#x8F7D;&#x6709;&#x5148;&#x540E;&#x987A;&#x5E8F;&#xFF0C;&#x540E;&#x52A0;&#x8F7D;&#x7684;&#x653E;&#x5F00;&#x5934;&#xFF0C;&#x8981;&#x5148;&#x4E86;&#x89E3;&#x6BCF;&#x4E2A;loader&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbEs4?w=2820&amp;h=1434" src="https://static.alili.tech/img/bVbbEs4?w=2820&amp;h=1434" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>10.&#x5728;&#x4F60;&#x7684;index&#x4E0A;&#x6DFB;&#x52A0;&#x5185;&#x5BB9; &#xFF0C;&#x5728;&#x7EC8;&#x7AEF;&#x8F93;&#x5165; npm run server &#x6D4F;&#x89C8;&#x5668;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x9875;&#x9762;&#xFF0C;</p>
<p>-- &#x4FEE;&#x6539;main.js </p>
<p><span class="img-wrap"><img data-src="/img/bVbbEvd?w=2340&amp;h=1100" src="https://static.alili.tech/img/bVbbEvd?w=2340&amp;h=1100" alt="" title="" style="cursor: pointer;"></span><br>  --&#x5373;&#x53EF;&#x770B;&#x5230; &#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#x7684;&#x5185;&#x5BB9; </p>
<p><span class="img-wrap"><img data-src="/img/bVbbEvh?w=1052&amp;h=409" src="https://static.alili.tech/img/bVbbEvh?w=1052&amp;h=409" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>&#x81F3;&#x6B64;&#xFF0C;&#x5355;&#x9875;&#x9762;&#x5E94;&#x7528;&#x5DF2;&#x7ECF;&#x6784;&#x5EFA;&#x597D;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5F15;&#x5165;vue&#x76F8;&#x5173;</p>
<p>11.&#x5728; src&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x5EFA; App.vue </p>
<p><span class="img-wrap"><img data-src="/img/bVbbEv4?w=2064&amp;h=778" src="https://static.alili.tech/img/bVbbEv4?w=2064&amp;h=778" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>----&#x4FEE;&#x6539; main.js </p>
<p><span class="img-wrap"><img data-src="/img/bVbbEwq?w=2044&amp;h=772" src="https://static.alili.tech/img/bVbbEwq?w=2044&amp;h=772" alt="" title="" style="cursor: pointer; display: inline;"></span><br> ---- &#x67E5;&#x770B;&#x6D4F;&#x89C8;&#x5668;&#x62A5;&#x9519;&#x4E86;&#xFF0C;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbEws?w=642&amp;h=346" src="https://static.alili.tech/img/bVbbEws?w=642&amp;h=346" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8BC6;&#x522B;&#x4E0D;&#x4E86;vue&#xFF1F;&#xFF1F; &#x4E0D;&#x662F;&#x5F15;&#x7528;&#x4E86;vue-loader&#x561B;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">&#x8BC6;&#x522B;&#x4E0D;&#x4E86;vue&#xFF1F;&#xFF1F; &#x4E0D;&#x662F;&#x5F15;&#x7528;&#x4E86;vue-loader&#x561B;</code></pre>
<p>-- &#x522B;&#x6025;&#xFF0C;&#x539F;&#x56E0;&#x662F; webpack&#x6CA1;&#x6709;&#x8BC6;&#x522B;vue&#x6A21;&#x7248;&#xFF0C; &#x5728;package.json &#x4E2D;install vue&#x4F9D;&#x8D56;&#x76F8;&#x5173;&#x7684;package</p>
<p><span class="img-wrap"><img data-src="/img/bVbbEIl?w=2246&amp;h=598" src="https://static.alili.tech/img/bVbbEIl?w=2246&amp;h=598" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6700;&#x540E;&#xFF0C;&#x5728;webpack.dev.config.js &#x6DFB;&#x52A0; vueloaderplugin &#x63D2;&#x4EF6; </p>
<p><span class="img-wrap"><img data-src="/img/bVbbETD?w=2354&amp;h=1138" src="https://static.alili.tech/img/bVbbETD?w=2354&amp;h=1138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x91CD;&#x542F;&#x670D;&#x52A1;&#xFF0C;&#x5B8C;&#x4E8B;&#x4E86; </p>
<p><span class="img-wrap"><img data-src="/img/bVbbETT?w=1833&amp;h=563" src="https://static.alili.tech/img/bVbbETT?w=1833&amp;h=563" alt="" title="" style="cursor: pointer; display: inline;"></span><br>&#x8D34;&#x4E0A;git &#x5730;&#x5740;&#xFF0C; <a href="https://github.com/caojide/webpack-vue" rel="nofollow noreferrer" target="_blank">https://github.com/caojide/we...</a><br>&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用webpack手动搭建一个基于vue的单页面应用

## 原文链接
[https://segmentfault.com/a/1190000015132838](https://segmentfault.com/a/1190000015132838)


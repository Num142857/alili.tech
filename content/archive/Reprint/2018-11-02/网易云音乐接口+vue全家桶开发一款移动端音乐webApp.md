---
title: 网易云音乐接口+vue全家桶开发一款移动端音乐webApp
reprint: true
categories: reprint
abbrlink: 96e51c97
date: 2018-11-02 02:30:12
---

{{% raw %}}
<h3 id="articleHeader0">&#x9879;&#x76EE;&#x4ECB;&#x7ECD;</h3><blockquote>&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x63A5;&#x53E3;+vue&#x5168;&#x5BB6;&#x6876;&#x5F00;&#x53D1;&#x4E00;&#x6B3E;&#x79FB;&#x52A8;&#x7AEF;&#x97F3;&#x4E50;webApp<p>&#x9879;&#x76EE;&#x8FD8;&#x5728;develop&#x4E2D;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x60F3;&#x8981;&#x53C2;&#x4E0E;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x4EE5;&#x79C1;&#x6211;</p></blockquote><p>&#x6548;&#x679C;&#x56FE;&#xFF1A;</p><p>&#x9AA8;&#x67B6;&#x5C4F;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b42576e581340?w=472&amp;h=796&amp;f=png&amp;s=6692" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b42576e581340?w=472&amp;h=796&amp;f=png&amp;s=6692" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x9996;&#x9875;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b4260156ac9db?w=360&amp;h=640&amp;f=png&amp;s=864853" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b4260156ac9db?w=360&amp;h=640&amp;f=png&amp;s=864853" alt="" title="" style="cursor:pointer"></span></p><p>&#x4FA7;&#x8FB9;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b426683c922e3?w=360&amp;h=640&amp;f=png&amp;s=778065" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b426683c922e3?w=360&amp;h=640&amp;f=png&amp;s=778065" alt="" title="" style="cursor:pointer"></span></p><p>&#x6BCF;&#x65E5;&#x63A8;&#x8350;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b426d5299b651?w=360&amp;h=640&amp;f=png&amp;s=1462800" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b426d5299b651?w=360&amp;h=640&amp;f=png&amp;s=1462800" alt="" title="" style="cursor:pointer"></span></p><p>&#x6B4C;&#x5355;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b42730e971a30?w=360&amp;h=640&amp;f=png&amp;s=483580" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b42730e971a30?w=360&amp;h=640&amp;f=png&amp;s=483580" alt="" title="" style="cursor:pointer"></span></p><p>&#x64AD;&#x653E;&#x5668;&#xFF08;&#x5C0F;&#xFF09;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b42783c687001?w=360&amp;h=640&amp;f=png&amp;s=514620" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b42783c687001?w=360&amp;h=640&amp;f=png&amp;s=514620" alt="" title="" style="cursor:pointer"></span></p><p>&#x64AD;&#x653E;&#x5668;&#xFF08;&#x5927;&#xFF09;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/9/7/165b427ce993e34e?w=360&amp;h=640&amp;f=png&amp;s=1126397" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/9/7/165b427ce993e34e?w=360&amp;h=640&amp;f=png&amp;s=1126397" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader1">&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;</h3><blockquote><a href="http://u-to-world.com:8080/index.html#/" rel="nofollow noreferrer" target="_blank">&#x6D4B;&#x8BD5;&#x5730;&#x5740;</a></blockquote><h3 id="articleHeader2">&#x5F00;&#x53D1;&#x603B;&#x7ED3;</h3><h4>&#x9879;&#x76EE;&#x7ED3;&#x6784;</h4><p>vue-cli&#x642D;&#x5EFA;</p><p>&#x65B0;&#x589E;&#x76EE;&#x5F55;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ---src 
  ------api        // &#x653E;&#x7F6E;api&#x7684;&#x76EE;&#x5F55;
  ---------base.js // &#x653E;&#x7F6E;axios&#x7684;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#xFF0C;&#x63A5;&#x53E3;&#x57DF;&#x540D;&#x5730;&#x5740;&#xFF0C;&#x4EE5;&#x53CA;&#x516C;&#x5171;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#xFF0C;&#x4E0E;&#x540E;&#x53F0;&#x7EA6;&#x5B9A;&#x8DE8;&#x57DF;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5168;&#x5C40;loading&#x914D;&#x7F6E;&#x7B49;
  ---------urls.js // &#x653E;&#x7F6E;&#x63A5;&#x53E3;url 
  ---------api.js  // &#x653E;&#x7F6E;&#x5C01;&#x88C5;&#x7684;promise&#x8BF7;&#x6C42;
  ------base       // &#x653E;&#x7F6E;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x7EC4;&#x4EF6; 
  ------common  
  ---------js      // &#x516C;&#x5171;js 
  ---------sass    // &#x516C;&#x5171;&#x6837;&#x5F0F; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>  -<span class="ruby">--src 
</span>  -<span class="ruby">-----api        /<span class="hljs-regexp">/ &#x653E;&#x7F6E;api&#x7684;&#x76EE;&#x5F55;
</span></span>  -<span class="ruby"><span class="hljs-regexp">--------base.js /</span><span class="hljs-regexp">/ &#x653E;&#x7F6E;axios&#x7684;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#xFF0C;&#x63A5;&#x53E3;&#x57DF;&#x540D;&#x5730;&#x5740;&#xFF0C;&#x4EE5;&#x53CA;&#x516C;&#x5171;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#xFF0C;&#x4E0E;&#x540E;&#x53F0;&#x7EA6;&#x5B9A;&#x8DE8;&#x57DF;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5168;&#x5C40;loading&#x914D;&#x7F6E;&#x7B49;
</span></span>  -<span class="ruby"><span class="hljs-regexp">--------urls.js /</span><span class="hljs-regexp">/ &#x653E;&#x7F6E;&#x63A5;&#x53E3;url 
</span></span>  -<span class="ruby"><span class="hljs-regexp">--------api.js  /</span><span class="hljs-regexp">/ &#x653E;&#x7F6E;&#x5C01;&#x88C5;&#x7684;promise&#x8BF7;&#x6C42;
</span></span>  -<span class="ruby"><span class="hljs-regexp">-----base       /</span><span class="hljs-regexp">/ &#x653E;&#x7F6E;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x7EC4;&#x4EF6; 
</span></span>  -<span class="ruby"><span class="hljs-regexp">-----common  
</span></span>  -<span class="ruby"><span class="hljs-regexp">--------js      /</span><span class="hljs-regexp">/ &#x516C;&#x5171;js 
</span></span>  -<span class="ruby"><span class="hljs-regexp">--------sass    /</span><span class="hljs-regexp">/ &#x516C;&#x5171;&#x6837;&#x5F0F; </span></span></code></pre><h4>&#x7C7B;&#x5E93;&#x4F7F;&#x7528;</h4><ul><li>fastclick&#x89E3;&#x51B3;&#x79FB;&#x52A8;&#x7AEF;300ms&#x5EF6;&#x8FDF;</li><li>vux &#x5FEB;&#x901F;&#x6784;&#x5EFA;&#x4E00;&#x4E9B;&#x5E38;&#x89C4;&#x9875;&#x9762;</li><li>vue-lazyLoad &#x5BF9;&#x56FE;&#x7247;&#x8FDB;&#x884C;&#x61D2;&#x52A0;&#x8F7D;&#x5904;&#x7406;</li><li>better-scroll &#x8F6E;&#x64AD;&#x56FE;</li><li>NeteaseCloudMusicApi wy&#x97F3;&#x4E50;&#x63A5;&#x53E3;&#xFF0C;node&#x5C01;&#x88C5;&#x8F6C;&#x53D1;&#xFF0C;&#x90E8;&#x7F72;&#x5728;&#x81EA;&#x5DF1;&#x670D;&#x52A1;&#x5668;&#x4E0A;</li></ul><h4>&#x8DEF;&#x7531;&#x6309;&#x9700;&#x52A0;&#x8F7D;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const view = (path, name) =&gt; () =&gt; import(`@/components/${path}${name}`)// &#x8DEF;&#x7531;&#x6309;&#x9700;&#x52A0;&#x8F7D;
 //&#x8FD9;&#x8FB9;&#x7528;&#x7684;&#x662F;vue&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x7684;&#x6309;&#x9700;&#x52A0;&#x8F7D;
 new Vue({
   // ...
   components: {
     &apos;my-component&apos;: () =&gt; import(&apos;./my-async-component&apos;)
   }
 })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">const</span> view = <span class="hljs-function">(<span class="hljs-params">path, name</span>) =&gt;</span> () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">`@/components/<span class="hljs-subst">${path}</span><span class="hljs-subst">${name}</span>`</span>)<span class="hljs-comment">// &#x8DEF;&#x7531;&#x6309;&#x9700;&#x52A0;&#x8F7D;</span>
 <span class="hljs-comment">//&#x8FD9;&#x8FB9;&#x7528;&#x7684;&#x662F;vue&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x7684;&#x6309;&#x9700;&#x52A0;&#x8F7D;</span>
 <span class="hljs-keyword">new</span> Vue({
   <span class="hljs-comment">// ...</span>
   components: {
     <span class="hljs-string">&apos;my-component&apos;</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./my-async-component&apos;</span>)
   }
 })
</code></pre><ul><li>&#x8DEF;&#x7531;&#x52A0;&#x8F7D;&#x65F6;&#x7528;&#x4E86;transition&#x52A8;&#x753B;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x5207;&#x6362;&#x52A8;&#x753B;</li><li>&#x6CE8;&#x610F;&#x5982;&#x679C;&#x4F60;&#x5E0C;&#x671B;&#x5728; Vue Router &#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x4E0A;&#x8FF0;&#x8BED;&#x6CD5;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x4F7F;&#x7528; Vue Router 2.4.0+ &#x7248;&#x672C;&#x3002;</li></ul><h4>&#x64AD;&#x653E;&#x5668;&#x7EC4;&#x4EF6;</h4><p>&#x5927;&#x5C0F;&#x64AD;&#x653E;&#x5668;&#x5206;&#x522B;&#x5199;&#x4E86;<code>MiniPlayer.vue</code>&#x548C;<code>NormalPlayer.vue</code>&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;&#x60F3;&#x8981;&#x804C;&#x8D23;&#x5355;&#x4E00;&#xFF0C;&#x5C31;&#x6CA1;&#x6709;&#x653E;&#x5728;&#x4E00;&#x8D77;</p><ul><li>&#x9690;&#x85CF;&#x663E;&#x793A; &#x901A;&#x8FC7;vuex&#x8FDB;&#x884C;&#x7BA1;&#x7406;</li><li><p>&#x52A8;&#x753B;</p><ol><li><p>&#x5934;&#x90E8;&#x4E0B;&#x5760;&#x548C;&#x5E95;&#x90E8;&#x7684;&#x4E0A;&#x6D6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition name=&quot;example&quot;&gt;

&lt;/transition&gt;

/*css &#x6837;&#x5F0F;*/
// &#x7ED9; transition&#x4E0B;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x663E;&#x793A;&#x6216;&#x9690;&#x85CF;&#x65F6;&#x6DFB;&#x52A0;&#x7684;&#x6837;&#x5F0F;
 //&#x8FD9;&#x4E24;&#x4E2A;&#x7C7B;&#x540D;&#x90FD;&#x662F;&#x5B9A;&#x4E49;&#x5F00;&#x59CB;&#x5230;&#x7ED3;&#x675F;&#x7684;&#x6301;&#x7EED;&#x65F6;&#x95F4; &#x65B9;&#x5F0F; &#x4EE5;&#x53CA;&#x5EF6;&#x8FDF;
.example-enter-active{
  transition:all 0.4s linear  &#x5BF9;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x6267;&#x884C;0.4s&#x7684;&#x52A8;&#x753B; &#x5300;&#x901F;
}
.example-leave-active{
  transition:all 0.4s linear  &#x5BF9;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x6267;&#x884C;0.4s&#x7684;&#x52A8;&#x753B; &#x5300;&#x901F;
}
// &#x8FDB;&#x5165;&#x8FC7;&#x5EA6;&#x7684;&#x5F00;&#x59CB;&#x72B6;&#x6001; &#x89E6;&#x53D1;&#x65F6;&#x673A; &#x5143;&#x7D20;&#x88AB;&#x63D2;&#x5165;&#x524D; &#x63D2;&#x5165;&#x540E;&#x4E0B;&#x4E00;&#x5E27;&#x79FB;&#x9664;
.example-enter{
}
// &#x79BB;&#x5F00;&#x8FC7;&#x5EA6;&#x7684;&#x7ED3;&#x675F;&#x72B6;&#x6001; &#x89E6;&#x53D1;&#x65F6;&#x673A; example-leave&#x4E0B;&#x4E00;&#x5E27;  &#x52A8;&#x753B;&#x8FC7;&#x5EA6;&#x5B8C;&#x6210;&#x88AB;&#x79FB;&#x9664;
.example-leave-to{
}
  
 &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x789F;&#x4E2D;&#x8C0D;6&#x4E2D;&#x7684;halo&#x8DF3;&#x4F1E;&#x6765;&#x7406;&#x89E3;

 .example-enter-active&#x5C31;&#x662F;&#x4ECE;&#x98DE;&#x673A;&#x4E0A;&#x79BB;&#x5F00;&#x5230;&#x5F00;&#x4F1E;&#x7684;&#x65F6;&#x95F4;

 .example-enter &#x4E0B;&#x5760;&#x524D;&#x5728;&#x98DE;&#x673A;&#x4E0A;&#x7684;&#x6700;&#x540E;&#x4E00;&#x523B;

 .example-enter-to  &#x5F00;&#x59CB;&#x4E0B;&#x5760;&#xFF0C;&#x5177;&#x5907;&#x52A0;&#x901F;&#x5EA6;&#x7684;&#x90A3;&#x4E00;&#x523B; 

 .example-leave-active &#x5F00;&#x4F1E;&#x5230;&#x7740;&#x9646;&#x7684;&#x65F6;&#x95F4;

 .example-leave &#x5F00;&#x4F1E;&#x547D;&#x4EE4;&#x53D1;&#x51FA;&#x65F6;

 .example-leave-to &#x4F1E;&#x5F00;&#x4E0B;&#x4E00;&#x523B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-attribute">transition</span> name=<span class="hljs-string">&quot;example&quot;</span>&gt;

&lt;/<span class="hljs-attribute">transition</span>&gt;

<span class="hljs-comment">/*css &#x6837;&#x5F0F;*/</span>
<span class="hljs-comment">// &#x7ED9; transition&#x4E0B;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x663E;&#x793A;&#x6216;&#x9690;&#x85CF;&#x65F6;&#x6DFB;&#x52A0;&#x7684;&#x6837;&#x5F0F;</span>
 <span class="hljs-comment">//&#x8FD9;&#x4E24;&#x4E2A;&#x7C7B;&#x540D;&#x90FD;&#x662F;&#x5B9A;&#x4E49;&#x5F00;&#x59CB;&#x5230;&#x7ED3;&#x675F;&#x7684;&#x6301;&#x7EED;&#x65F6;&#x95F4; &#x65B9;&#x5F0F; &#x4EE5;&#x53CA;&#x5EF6;&#x8FDF;</span>
.example-enter-active{
  <span class="hljs-attribute">transition</span>:all <span class="hljs-number">0.4s</span> linear  &#x5BF9;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x6267;&#x884C;<span class="hljs-number">0.4s</span>&#x7684;&#x52A8;&#x753B; &#x5300;&#x901F;
}
.example-leave-active{
  <span class="hljs-attribute">transition</span>:all <span class="hljs-number">0.4s</span> linear  &#x5BF9;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x6267;&#x884C;<span class="hljs-number">0.4s</span>&#x7684;&#x52A8;&#x753B; &#x5300;&#x901F;
}
<span class="hljs-comment">// &#x8FDB;&#x5165;&#x8FC7;&#x5EA6;&#x7684;&#x5F00;&#x59CB;&#x72B6;&#x6001; &#x89E6;&#x53D1;&#x65F6;&#x673A; &#x5143;&#x7D20;&#x88AB;&#x63D2;&#x5165;&#x524D; &#x63D2;&#x5165;&#x540E;&#x4E0B;&#x4E00;&#x5E27;&#x79FB;&#x9664;</span>
.example-enter{
}
<span class="hljs-comment">// &#x79BB;&#x5F00;&#x8FC7;&#x5EA6;&#x7684;&#x7ED3;&#x675F;&#x72B6;&#x6001; &#x89E6;&#x53D1;&#x65F6;&#x673A; example-leave&#x4E0B;&#x4E00;&#x5E27;  &#x52A8;&#x753B;&#x8FC7;&#x5EA6;&#x5B8C;&#x6210;&#x88AB;&#x79FB;&#x9664;</span>
.example-leave-to{
}
  
 &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x789F;&#x4E2D;&#x8C0D;<span class="hljs-number">6</span>&#x4E2D;&#x7684;halo&#x8DF3;&#x4F1E;&#x6765;&#x7406;&#x89E3;

 .example-enter-active&#x5C31;&#x662F;&#x4ECE;&#x98DE;&#x673A;&#x4E0A;&#x79BB;&#x5F00;&#x5230;&#x5F00;&#x4F1E;&#x7684;&#x65F6;&#x95F4;

 <span class="hljs-selector-class">.example-enter</span> &#x4E0B;&#x5760;&#x524D;&#x5728;&#x98DE;&#x673A;&#x4E0A;&#x7684;&#x6700;&#x540E;&#x4E00;&#x523B;

 <span class="hljs-selector-class">.example-enter-to</span>  &#x5F00;&#x59CB;&#x4E0B;&#x5760;&#xFF0C;&#x5177;&#x5907;&#x52A0;&#x901F;&#x5EA6;&#x7684;&#x90A3;&#x4E00;&#x523B; 

 <span class="hljs-selector-class">.example-leave-active</span> &#x5F00;&#x4F1E;&#x5230;&#x7740;&#x9646;&#x7684;&#x65F6;&#x95F4;

 <span class="hljs-selector-class">.example-leave</span> &#x5F00;&#x4F1E;&#x547D;&#x4EE4;&#x53D1;&#x51FA;&#x65F6;

 <span class="hljs-selector-class">.example-leave-to</span> &#x4F1E;&#x5F00;&#x4E0B;&#x4E00;&#x523B;</code></pre></li><li>&#x64AD;&#x653E;&#x5668;&#x7684;cd&#x7684;&#x4F4D;&#x79FB;&#x53CA;&#x7F29;&#x653E;<p>&#x5148;&#x8BA1;&#x7B97;&#x51FA;&#x5C0F;&#x64AD;&#x653E;&#x5668;&#x56FE;&#x7247;&#x79BB;&#x6700;&#x7EC8;&#x5927;&#x64AD;&#x653E;&#x5668;cd&#x7684;x,y&#x8F74;&#x4E0A;&#x7684;&#x8DDD;&#x79BB;</p><p>&#x4F7F;&#x7528; <code>create-keyframe-animation</code> &#x8FDB;&#x884C;&#x4E00;&#x4E2A;<code>css3</code>&#x52A8;&#x753B;&#x72B6;&#x6001;&#x7684;&#x6CE8;&#x518C;</p><p>&#x518D;&#x5229;&#x7528;transition&#x7684;&#x52A8;&#x753B;&#x65B9;&#x6CD5;&#x94A9;&#x5B50;</p><p>&#x5728;<code>enter</code>&#x65F6;<code>run</code>&#x52A8;&#x753B;,<code>afterEnter</code>&#x65F6;&#x6E05;&#x9664;&#x52A8;&#x753B; <code>leave</code>&#x540C;&#x7406;</p></li><li>&#x64AD;&#x653E;&#x5668;&#x7684;&#x65CB;&#x8F6C;<p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x65CB;&#x8F6C;&#x7684;<code>css</code>&#x52A8;&#x753B;&#xFF0C;&#x5728;&#x4E00;&#x4E2A;<code>class</code>&#x4E2D;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x5728;<code>play</code>&#x7684;&#x72B6;&#x6001;&#x4E0B;&#x7ED9;&#x5B83;<code>addClss</code>,<code>pause</code>&#x65F6;&#x52A0;&#x4E0A;<code>animation-play-state: paused</code></p></li></ol></li></ul><h4>audio&#x7684;&#x4F7F;&#x7528;</h4><p>&#x4F7F;&#x7528;<code>html5</code>&#x7684; <code>audio</code>&#x7ED3;&#x5408;<code>vuex</code>&#x6765;&#x8FDB;&#x884C;&#x64AD;&#x653E;&#x5668;&#x529F;&#x80FD;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x5305;&#x62EC;&#x8FDB;&#x5EA6;&#x6761;&#xFF0C;&#x64AD;&#x653E;&#xFF0C;&#x6682;&#x505C;&#xFF0C;&#x4E0A;&#x4E00;&#x66F2;&#xFF0C;&#x4E0B;&#x4E00;&#x66F2;&#xFF0C;&#x64AD;&#x653E;&#x6A21;&#x5F0F;&#x7B49;</p><h4>&#x5E03;&#x5C40;</h4><ul><li>&#x7EDD;&#x5927;&#x591A;&#x6570;&#x4F7F;&#x7528;&#x4E86;flex webpack&#x4E2D;&#x914D;&#x7F6E;&#x4F4E;&#x7248;&#x672C;&#x5B89;&#x5353;&#xFF0C;ios&#x52A0;&#x524D;&#x7F00;</li><li>&#x8003;&#x8651;&#x5230;fixed&#x5143;&#x7D20;&#x7684;&#x79FB;&#x52A8;&#x7AEF;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x8FD9;&#x79CD;&#x573A;&#x666F;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528;100%&#x9AD8;&#x5EA6;+absolute&#x65B9;&#x6848;&#x66F4;&#x9002;&#x5408;</li><li>&#x4F7F;&#x7528;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF0C;&#x517C;&#x5BB9;&#x4E00;&#x4E0B;&#x67D0;&#x4E9B;&#x6837;&#x5F0F;&#x5728;768px&#x4EE5;&#x4E0A;&#x7684;&#x6837;&#x5F0F;&#x53D8;&#x5F62;</li><li>&#x4F7F;&#x7528;rem &#x5728;vue&#x5B9E;&#x4F8B;&#x7684;<code>mounted</code>&#x7684;&#x94A9;&#x5B50;&#x91CC;&#x6CE8;&#x518C;<code>resize</code>&#x548C;<code>onload</code>&#x76D1;&#x542C;&#xFF0C;&#x8FDB;&#x884C;&#x6700;&#x5916;&#x5C42;rem&#x57FA;&#x51C6;&#x7684;&#x8BA1;&#x7B97;</li><li>&#x4F7F;&#x7528;&#x9AA8;&#x67B6;&#x5C4F;&#x8FDB;&#x884C;&#x52A0;&#x8F7D;&#x8D44;&#x6E90;&#x767D;&#x5C4F;&#x65F6;&#x586B;&#x5145;&#xFF0C;&#x5F85;&#x4F18;&#x5316;&#x81F3;&#x5B8C;&#x5168;&#x7684;&#x4E3B;&#x9875;&#x9762;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;</li></ul><h3 id="articleHeader3">&#x611F;&#x8C22;</h3><ul><li>vue</li><li>vuex</li><li>vue-router</li><li>vux</li><li>vue-lazyLoad</li><li>NeteaseCloudMusicApi</li></ul><h3 id="articleHeader4">&#x8BF4;&#x660E;</h3><ul><li>&#x6709;&#x53CD;&#x9988;&#x8BF4;&#x9879;&#x76EE;clone&#x4E4B;&#x540E;&#x8FD0;&#x884C;&#xFF0C;&#x4F1A;&#x663E;&#x793A;&#x4E0D;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x63A5;&#x53E3;&#x7528;&#x7684;&#x6211;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x5730;&#x5740;&#xFF0C;node&#x7AEF;&#x7684;&#x662F;<code>Access-Control-Allow-Origin</code>&#x662F;&#x8BF7;&#x6C42;&#x5934;&#x91CC;&#x7684;<code>orgin</code>,&#x6240;&#x4EE5;&#x5EFA;&#x8BAE;<code>clone</code>&#x63A5;&#x53E3;&#x5E93;&#x5230;&#x672C;&#x5730;&#x8FD0;&#x884C;&#xFF0C;<code>github</code>&#x4E2D;&#x8FD0;&#x884C;&#x65B9;&#x5F0F;&#x5DF2;&#x4F5C;&#x4FEE;&#x6539;&#x3002;</li><li>&#x5F88;&#x591A;&#x529F;&#x80FD;&#x5C1A;&#x672A;&#x5B9E;&#x73B0;,&#x5F88;&#x591A;&#x5730;&#x65B9;&#x5F85;&#x4F18;&#x5316;&#xFF0C;&#x6B22;&#x8FCE;&#x63D0;issue&#x6216;&#x5EFA;&#x8BAE;&#xFF0C;&#x6709;&#x65F6;&#x95F4;&#x5C31;&#x5199;&#x70B9;&#x5427;.^-^</li></ul><h3 id="articleHeader5"><a href="https://github.com/godlikedeveloper/mobile-music" rel="nofollow noreferrer" target="_blank"><strong>github&#x5730;&#x5740;</strong></a>&#xFF0C;<strong>&#x6B22;&#x8FCE;star.</strong></h3>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
网易云音乐接口+vue全家桶开发一款移动端音乐webApp

## 原文链接
[https://segmentfault.com/a/1190000016315512](https://segmentfault.com/a/1190000016315512)


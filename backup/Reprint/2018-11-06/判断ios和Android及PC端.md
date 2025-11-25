---
title: 判断ios和Android及PC端
hidden: true
categories: [reprint]
slug: 3c0e25ac
date: 2018-11-06 15:28:31
---

{{< raw >}}
<blockquote>&#x5728;&#x505A;&#x79FB;&#x52A8;&#x7AEF;&#x65F6;&#xFF0C;&#x60F3;&#x8D77;&#x7528;navigator.userAgent&#x6765;&#x5BF9;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x67E5;&#x4E86;&#x70B9;&#x8D44;&#x6599;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x603B;&#x7ED3;&#x4E0B;<br>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x7F29;&#x653E;&#x95EE;&#x9898;&#xFF0C;&#x5728;meta&#x6807;&#x7B7E;&#x4E2D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#xFF0C;&#x5BF9;&#x90E8;&#x5206;&#x6D4F;&#x89C8;&#x5668;&#x8FDB;&#x884C;&#x5F3A;&#x5236;&#x6027;&#x7684;&#x9650;&#x5236;</blockquote><h1 id="articleHeader0">1.navigator&#x7684;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x5C5E;&#x6027;</h1><ul><li>navigator&#x4E3A;window&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6307;&#x5411;&#x4E86;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x6D4F;&#x89C8;&#x5668;&#x76F8;&#x5173;&#x4FE1;&#x606F;&#x7684;&#x5BF9;&#x8C61;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.appVersion &#x6D4F;&#x89C8;&#x5668;&#x7684;&#x7248;&#x672C;&#x53F7; 
navigator.language &#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00; 
navigator.userAgent &#x6D4F;&#x89C8;&#x5668;&#x7684;userAgent&#x4FE1;&#x606F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>navigator<span class="hljs-selector-class">.appVersion</span> &#x6D4F;&#x89C8;&#x5668;&#x7684;&#x7248;&#x672C;&#x53F7; 
navigator<span class="hljs-selector-class">.language</span> &#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00; 
navigator<span class="hljs-selector-class">.userAgent</span> &#x6D4F;&#x89C8;&#x5668;&#x7684;userAgent&#x4FE1;&#x606F;</code></pre><blockquote>&#x5176;&#x4E2D;userAgent &#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x53EA;&#x8BFB;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x58F0;&#x660E;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x7528;&#x4E8E; HTTP &#x8BF7;&#x6C42;&#x7684;&#x7528;&#x6237;&#x4EE3;&#x7406;&#x5934;&#x7684;&#x503C;&#x3002;</blockquote><h1 id="articleHeader1">2.&#x8F83;&#x5E38;&#x89C1;&#x7684;ios&#x7AEF;&#x3001;Android&#x7AEF;&#x53CA;PC&#x7AEF;&#x7684;&#x5224;&#x65AD;</h1><ul><li>&#x7B80;&#x5355;&#x70B9;&#x7684;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B; */
let userAgent = navigator.userAgent;
/* &#x5224;&#x65AD;&#x624B;&#x673A;&#x578B;&#x53F7; */
let app = navigator.appVersion;
/* Android &#x7EC8;&#x7AEF; */
let isAndroid = userAgent.indexOf(&apos;Android&apos;);
/* ios&#x7EC8;&#x7AEF; */
let isMac = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-comment">/* &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B; */</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">userAgent</span> = navigator.userAgent;
<span class="hljs-comment">/* &#x5224;&#x65AD;&#x624B;&#x673A;&#x578B;&#x53F7; */</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">app</span> = navigator.appVersion;
<span class="hljs-comment">/* Android &#x7EC8;&#x7AEF; */</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">isAndroid</span> = userAgent.indexOf(&apos;Android&apos;);
<span class="hljs-comment">/* ios&#x7EC8;&#x7AEF; */</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">isMac</span> = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);</code></pre><ul><li>&#x5C01;&#x88C5;&#x6027;&#x7684;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x5224;&#x65AD;&#x5404;&#x7C7B;&#x578B;&#x65B9;&#x6CD5; */
const browser = {
   version: function() {
       const userAgent = navigator.userAgent;
       return {
           /* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;ios */
           ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
           /* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;Android */
           android: userAgent.indexOf(&apos;Android&apos;) &gt; -1 || userAgent.indexOf(&apos;Adr&apos;) &gt; -1,

           /* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x79FB;&#x52A8;&#x7AEF; */
           mobilePhone: !!userAgent.match(/AppleWebKit.*Mobile.*/),

           /* IE&#x5185;&#x6838; */
           trident: userAgent.indexOf(&apos;Trident&apos;) &gt; -1,
           /* opera&#x5185;&#x6838; */
           presto: userAgent.indexOf(&apos;Presto&apos;) &gt; -1,
           /* &#x82F9;&#x679C;&#x3001;&#x8C37;&#x6B4C;&#x5185;&#x6838; */
           webkit: userAgent.indexOf(&apos;AppleWebKit&apos;) &gt; -1,
           /* &#x706B;&#x72D0;&#x5185;&#x6838; */
           gecko: userAgent.indexOf(&apos;Gecko&apos;) &gt; -1 &amp;&amp; userAgent.indexOf(&apos;KHTML&apos;) == -1,


           /* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;IPone&#x624B;&#x673A;&#x6216;&#x8005;QQHD&#x6D4F;&#x89C8;&#x5668; */
           iphone: userAgent.indexOf(&apos;iPhone&apos;) &gt; -1,
           /* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;iPad */
           iPad: userAgent.indexOf(&apos;iPad&apos;) &gt; -1,

           /* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;web&#x5E94;&#x7528;&#x7A0B;&#x5E8F;(&#x80FD;&#x591F;&#x8BA9;&#x7528;&#x6237;&#x5B8C;&#x6210;&#x67D0;&#x4E9B;&#x7279;&#x5B9A;&#x4EFB;&#x52A1;&#x7684;&#x7F51;&#x7AD9;)&#xFF0C;&#x6CA1;&#x6709;&#x5934;&#x90E8;&#x548C;&#x5E95;&#x90E8; */
           webApp: userAgent.indexOf(&apos;Safari&apos;),
           /* &#x662F;&#x5426;&#x662F;&#x5FAE;&#x4FE1; */
           weixin: userAgent.indexOf(&apos;MicroMessenger&apos;),
           /* QQ */
           QQ: userAgent.match(/\sQQ/i) == &apos; qq&apos;,
      }
   }(),
   /* &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00;:navigator.language&#x9664;IE&#x6D4F;&#x89C8;&#x5668;&#x5916;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00;&#xFF0C; 
    * navigator.browserLanguageIE&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00; 
    */
   browserLanguage: (navigator.language || navigator.browserLanguage).toLowerCase()
};
if(browser.version.ios || browser.version.android || browser.version.mobilePhone) {
  console.log(&apos;&#x662F;&#x79FB;&#x52A8;&#x7AEF;&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/* &#x5224;&#x65AD;&#x5404;&#x7C7B;&#x578B;&#x65B9;&#x6CD5; */</span>
<span class="hljs-keyword">const</span> browser = {
   <span class="hljs-attr">version</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">const</span> userAgent = navigator.userAgent;
       <span class="hljs-keyword">return</span> {
           <span class="hljs-comment">/* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;ios */</span>
           ios: !!userAgent.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>),
           <span class="hljs-comment">/* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;Android */</span>
           android: userAgent.indexOf(<span class="hljs-string">&apos;Android&apos;</span>) &gt; <span class="hljs-number">-1</span> || userAgent.indexOf(<span class="hljs-string">&apos;Adr&apos;</span>) &gt; <span class="hljs-number">-1</span>,

           <span class="hljs-comment">/* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x79FB;&#x52A8;&#x7AEF; */</span>
           mobilePhone: !!userAgent.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>),

           <span class="hljs-comment">/* IE&#x5185;&#x6838; */</span>
           trident: userAgent.indexOf(<span class="hljs-string">&apos;Trident&apos;</span>) &gt; <span class="hljs-number">-1</span>,
           <span class="hljs-comment">/* opera&#x5185;&#x6838; */</span>
           presto: userAgent.indexOf(<span class="hljs-string">&apos;Presto&apos;</span>) &gt; <span class="hljs-number">-1</span>,
           <span class="hljs-comment">/* &#x82F9;&#x679C;&#x3001;&#x8C37;&#x6B4C;&#x5185;&#x6838; */</span>
           webkit: userAgent.indexOf(<span class="hljs-string">&apos;AppleWebKit&apos;</span>) &gt; <span class="hljs-number">-1</span>,
           <span class="hljs-comment">/* &#x706B;&#x72D0;&#x5185;&#x6838; */</span>
           gecko: userAgent.indexOf(<span class="hljs-string">&apos;Gecko&apos;</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">&apos;KHTML&apos;</span>) == <span class="hljs-number">-1</span>,


           <span class="hljs-comment">/* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;IPone&#x624B;&#x673A;&#x6216;&#x8005;QQHD&#x6D4F;&#x89C8;&#x5668; */</span>
           iphone: userAgent.indexOf(<span class="hljs-string">&apos;iPhone&apos;</span>) &gt; <span class="hljs-number">-1</span>,
           <span class="hljs-comment">/* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;iPad */</span>
           iPad: userAgent.indexOf(<span class="hljs-string">&apos;iPad&apos;</span>) &gt; <span class="hljs-number">-1</span>,

           <span class="hljs-comment">/* &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;web&#x5E94;&#x7528;&#x7A0B;&#x5E8F;(&#x80FD;&#x591F;&#x8BA9;&#x7528;&#x6237;&#x5B8C;&#x6210;&#x67D0;&#x4E9B;&#x7279;&#x5B9A;&#x4EFB;&#x52A1;&#x7684;&#x7F51;&#x7AD9;)&#xFF0C;&#x6CA1;&#x6709;&#x5934;&#x90E8;&#x548C;&#x5E95;&#x90E8; */</span>
           webApp: userAgent.indexOf(<span class="hljs-string">&apos;Safari&apos;</span>),
           <span class="hljs-comment">/* &#x662F;&#x5426;&#x662F;&#x5FAE;&#x4FE1; */</span>
           weixin: userAgent.indexOf(<span class="hljs-string">&apos;MicroMessenger&apos;</span>),
           <span class="hljs-comment">/* QQ */</span>
           QQ: userAgent.match(<span class="hljs-regexp">/\sQQ/i</span>) == <span class="hljs-string">&apos; qq&apos;</span>,
      }
   }(),
   <span class="hljs-comment">/* &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00;:navigator.language&#x9664;IE&#x6D4F;&#x89C8;&#x5668;&#x5916;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00;&#xFF0C; 
    * navigator.browserLanguageIE&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x8BED;&#x8A00; 
    */</span>
   browserLanguage: (navigator.language || navigator.browserLanguage).toLowerCase()
};
<span class="hljs-keyword">if</span>(browser.version.ios || browser.version.android || browser.version.mobilePhone) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x662F;&#x79FB;&#x52A8;&#x7AEF;&apos;</span>);
}</code></pre><h1 id="articleHeader2">3.meta&#x6807;&#x7B7E;&#x8BBE;&#x7F6E;</h1><ul><li>&#x5982;&#x5BF9;&#x6D4F;&#x89C8;&#x5668;&#x8FDB;&#x884C;&#x5F3A;&#x5236;&#x5168;&#x5C4F;&#x7684;&#x8BBE;&#x7F6E;&#xFF08;UC&#x5168;&#x5C4F;&#xFF09;&#xFF0C;webapp&#x6A21;&#x5F0F;&#x7B49;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;meta charset=&quot;UTF-8&quot;&gt;
&lt;!-- &#x89C6;&#x56FE;&#x7A97;&#x53E3;&#xFF0C;&#x79FB;&#x52A8;&#x7AEF;&#x7279;&#x5C5E;&#x7684;&#x6807;&#x7B7E; --&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no&quot;&gt;
&lt;!-- &#x907F;&#x514D;IE&#x4F7F;&#x7528;&#x517C;&#x5BB9;&#x6A21;&#x5F0F; --&gt;
&lt;meta http-equiv=&quot;x-ua-compatible&quot; content=&quot;IE=edge&quot;&gt;
&lt;!-- uc&#x5F3A;&#x5236;&#x7AD6;&#x5C4F; --&gt;
&lt;meta name=&quot;screen-orientation&quot; content=&quot;portrait&quot;&gt;
&lt;!-- QQ&#x5F3A;&#x5236;&#x7AD6;&#x5C4F; --&gt;
&lt;meta name=&quot;x5-orientation&quot; content=&quot;portrait&quot;&gt;
&lt;!--&#xA0;UC&#x5F3A;&#x5236;&#x5168;&#x5C4F; --&gt;
&lt;meta name=&quot;full-screen&quot; content=&quot;yes&quot;&gt;
&lt;!--&#xA0;QQ&#x5F3A;&#x5236;&#x5168;&#x5C4F; --&gt;
&lt;meta name=&quot;x5-fullscreen&quot; content=&quot;true&quot;&gt;
&lt;!--&#xA0;UC&#x5E94;&#x7528;&#x6A21;&#x5F0F; --&gt;
&lt;meta name=&quot;browsermode&quot; content=&quot;application&quot;&gt;
&lt;!--&#xA0;QQ&#x5E94;&#x7528;&#x6A21;&#x5F0F; --&gt;
&lt;meta name=&quot;x5-page-mode&quot; content=&quot;app&quot;&gt;
&lt;!--&#xA0;&#x662F;&#x5426;&#x542F;&#x52A8;webapp&#x529F;&#x80FD;&#xFF0C;&#x4F1A;&#x5220;&#x9664;&#x9ED8;&#x8BA4;&#x7684;&#x82F9;&#x679C;&#x5DE5;&#x5177;&#x680F;&#x548C;&#x83DC;&#x5355;&#x680F; --&gt;
&lt;meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot;&gt;
&lt;!--&#xA0;&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x662F;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x7684;&#x9875;&#x9762;&#x8BBE;&#x8BA1;&#x7684;&#x4E3B;&#x4F53;&#x8272;&#x4E3A;&#x642D;&#x914D;&#x6765;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E; --&gt;
&lt;meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot;&gt;
&lt;!--&#xA0;&#x5FFD;&#x7565;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x6570;&#x5B57;&#x8BC6;&#x522B;&#x4E3A;&#x7535;&#x8BDD;&#x53F7;&#x7801;,email&#x8BC6;&#x522B; --&gt;
&lt;meta name=&quot;format-decoration&quot; content=&quot;telephone=no,email=no&quot;&gt;
&lt;!-- &#x542F;&#x7528;360&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6781;&#x901F;&#x6A21;&#x5F0F;(webkit) --&gt;
&lt;meta name=&quot;renderer&quot; content=&quot;webkit&quot;&gt;
&lt;!-- &#x9488;&#x5BF9;&#x624B;&#x6301;&#x8BBE;&#x5907;&#x4F18;&#x5316;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x8001;&#x7684;&#x4E0D;&#x8BC6;&#x522B;viewport&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6BD4;&#x5982;&#x9ED1;&#x8393; --&gt;
&lt;meta name=&quot;HandheldFriendly&quot; content=&quot;true&quot;&gt;
&lt;!--&#xA0;&#x5FAE;&#x8F6F;&#x7684;&#x8001;&#x5F0F;&#x6D4F;&#x89C8;&#x5668; --&gt;
&lt;meta name=&quot;MobileOptimized&quot; content=&quot;320&quot;&gt;
&lt;!-- windows phone &#x70B9;&#x51FB;&#x65E0;&#x9AD8;&#x5149; --&gt;
&lt;meta name=&quot;msapplication-tap-highlight&quot; content=&quot;no&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x89C6;&#x56FE;&#x7A97;&#x53E3;&#xFF0C;&#x79FB;&#x52A8;&#x7AEF;&#x7279;&#x5C5E;&#x7684;&#x6807;&#x7B7E; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x907F;&#x514D;IE&#x4F7F;&#x7528;&#x517C;&#x5BB9;&#x6A21;&#x5F0F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;x-ua-compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;IE=edge&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- uc&#x5F3A;&#x5236;&#x7AD6;&#x5C4F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;screen-orientation&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;portrait&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- QQ&#x5F3A;&#x5236;&#x7AD6;&#x5C4F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;x5-orientation&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;portrait&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;UC&#x5F3A;&#x5236;&#x5168;&#x5C4F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;full-screen&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;yes&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;QQ&#x5F3A;&#x5236;&#x5168;&#x5C4F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;x5-fullscreen&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;UC&#x5E94;&#x7528;&#x6A21;&#x5F0F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;browsermode&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;application&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;QQ&#x5E94;&#x7528;&#x6A21;&#x5F0F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;x5-page-mode&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;&#x662F;&#x5426;&#x542F;&#x52A8;webapp&#x529F;&#x80FD;&#xFF0C;&#x4F1A;&#x5220;&#x9664;&#x9ED8;&#x8BA4;&#x7684;&#x82F9;&#x679C;&#x5DE5;&#x5177;&#x680F;&#x548C;&#x83DC;&#x5355;&#x680F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;apple-mobile-web-app-capable&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;yes&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x662F;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x7684;&#x9875;&#x9762;&#x8BBE;&#x8BA1;&#x7684;&#x4E3B;&#x4F53;&#x8272;&#x4E3A;&#x642D;&#x914D;&#x6765;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;apple-mobile-web-app-status-bar-style&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;black&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;&#x5FFD;&#x7565;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x6570;&#x5B57;&#x8BC6;&#x522B;&#x4E3A;&#x7535;&#x8BDD;&#x53F7;&#x7801;,email&#x8BC6;&#x522B; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;format-decoration&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;telephone=no,email=no&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x542F;&#x7528;360&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6781;&#x901F;&#x6A21;&#x5F0F;(webkit) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;renderer&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;webkit&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x9488;&#x5BF9;&#x624B;&#x6301;&#x8BBE;&#x5907;&#x4F18;&#x5316;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x8001;&#x7684;&#x4E0D;&#x8BC6;&#x522B;viewport&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6BD4;&#x5982;&#x9ED1;&#x8393; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;HandheldFriendly&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#xA0;&#x5FAE;&#x8F6F;&#x7684;&#x8001;&#x5F0F;&#x6D4F;&#x89C8;&#x5668; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;MobileOptimized&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;320&quot;</span>&gt;</span>
<span class="hljs-comment">&lt;!-- windows phone &#x70B9;&#x51FB;&#x65E0;&#x9AD8;&#x5149; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;msapplication-tap-highlight&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;no&quot;</span>&gt;</span></code></pre><blockquote>&#x6B63;&#x5728;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x82E5;&#x5BF9;&#x4F60;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x5370;&#x8BB0;&#x5457;&#xFF08;&#x70B9;&#x4E2A;&#x8D5E;&#x54AF;^_^&#xFF09;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x597D;&#x6587;&#x63A8;&#x8350;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000016068450">webpack&#x6253;&#x5305;&#xFF08;&#x6709;&#x9762;&#x8BD5;&#x9898;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016255824" target="_blank">&#x7EAF;css&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#xFF08;multi-column&#x591A;&#x5217;&#x53CA;flex&#x5E03;&#x5C40;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016082968">&#x753B;&#x4E09;&#x89D2;&#x5F62;</a></li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
判断ios和Android及PC端

## 原文链接
[https://segmentfault.com/a/1190000016542821](https://segmentfault.com/a/1190000016542821)


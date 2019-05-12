---
title: 'JS基础入门篇（三十三）—正则表达式' 
date: 2018-11-26 2:30:09
hidden: true
slug: t72952s1rv
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;</h2><p><strong>&#x65B9;&#x6CD5;&#x4E00;&#xFF1A;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5B57;&#x9762;&#x91CF;&#xFF0C;&#x5176;&#x7531;&#x5305;&#x542B;&#x5728;&#x659C;&#x6760;&#x4E4B;&#x95F4;&#x7684;&#x6A21;&#x5F0F;&#x7EC4;&#x6210;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg1 = /a/;
var reg2 = /ab+c/;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg1 = <span class="hljs-regexp">/a/</span>;
<span class="hljs-keyword">var</span> reg2 = <span class="hljs-regexp">/ab+c/</span>;</code></pre><p>&#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;&#x8C03;&#x7528;RegExp&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg1 = new RegExp( &quot;a&quot; );
var reg2 = new RegExp( &quot;ab+c&quot; );" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> reg1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">&quot;a&quot;</span> );
<span class="hljs-keyword">var</span> reg2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">&quot;ab+c&quot;</span> );</code></pre><h2 id="articleHeader1">2.&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x7279;&#x6B8A;&#x5B57;&#x7B26;</h2><p><strong><code>1.&#x8F6C;&#x4E49;&#x5B57;&#x7B26;</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    \s: &#x7A7A;&#x683C;
    \S: &#x975E;&#x7A7A;&#x683C;
    \d: &#x6570;&#x5B57;
    \D: &#x975E;&#x6570;&#x5B57;
    \w: &#x5B57;&#x6BCD;&#xFF0C;&#x6570;&#x5B57;&#xFF0C;&#x4E0B;&#x5212;&#x7EBF;
    \W: &#x975E;&#x5B57;&#x6BCD;&#xFF0C;&#x975E;&#x6570;&#x5B57;&#xFF0C;&#x975E;&#x4E0B;&#x5212;&#x7EBF;&#x3002;
    \ &#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x3002;&#x6A21;&#x5F0F; /a*/ &#x4EE3;&#x8868;&#x4F1A;&#x5339;&#x914D; 0 &#x4E2A;&#x6216;&#x8005;&#x591A;&#x4E2A; a&#x3002;&#x76F8;&#x53CD;&#xFF0C;&#x6A21;&#x5F0F; /a\*/ &#x5C06; &apos;*&apos; &#x7684;&#x7279;&#x6B8A;&#x6027;&#x79FB;&#x9664;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x5339;&#x914D;&#x50CF; &quot;a*&quot; &#x8FD9;&#x6837;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;
    . : &#x4EE3;&#x8868; &#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;
    \b: &#x8D77;&#x59CB;,&#x7ED3;&#x675F;,&#x7A7A;&#x683C;&#x3002;eg&#xFF1A;/\bm/&#x5339;&#x914D;&#x201C;moon&#x201D;&#x4E2D;&#x5F97;&#x2018;m&#x2019;&#xFF1B;/oo\b/&#x5E76;&#x4E0D;&#x5339;&#x914D;&quot;moon&quot;&#x4E2D;&#x5F97;&apos;oo&apos;&#xFF0C;&#x56E0;&#x4E3A;&apos;oo&apos;&#x88AB;&#x4E00;&#x4E2A;&#x201C;&#x5B57;&#x201D;&#x5B57;&#x7B26;&apos;n&apos;&#x7D27;&#x8DDF;&#x7740;&#x3002;


var str = &quot;12 3123&quot;;
console.log( str.replace( /\b/g,&quot;|&quot; ) );//|12| |3123|
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code>    <span class="hljs-string">\s:</span> &#x7A7A;&#x683C;
    <span class="hljs-string">\S:</span> &#x975E;&#x7A7A;&#x683C;
    <span class="hljs-string">\d:</span> &#x6570;&#x5B57;
    <span class="hljs-string">\D:</span> &#x975E;&#x6570;&#x5B57;
    <span class="hljs-string">\w:</span> &#x5B57;&#x6BCD;&#xFF0C;&#x6570;&#x5B57;&#xFF0C;&#x4E0B;&#x5212;&#x7EBF;
    <span class="hljs-string">\W:</span> &#x975E;&#x5B57;&#x6BCD;&#xFF0C;&#x975E;&#x6570;&#x5B57;&#xFF0C;&#x975E;&#x4E0B;&#x5212;&#x7EBF;&#x3002;
    <span class="hljs-string">\</span> &#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x3002;&#x6A21;&#x5F0F; <span class="hljs-regexp">/a*/</span> &#x4EE3;&#x8868;&#x4F1A;&#x5339;&#x914D; <span class="hljs-number">0</span> &#x4E2A;&#x6216;&#x8005;&#x591A;&#x4E2A; a&#x3002;&#x76F8;&#x53CD;&#xFF0C;&#x6A21;&#x5F0F; <span class="hljs-regexp">/a\*/</span> &#x5C06; <span class="hljs-string">&apos;*&apos;</span> &#x7684;&#x7279;&#x6B8A;&#x6027;&#x79FB;&#x9664;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x5339;&#x914D;&#x50CF; <span class="hljs-string">&quot;a*&quot;</span> &#x8FD9;&#x6837;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;
    . : &#x4EE3;&#x8868; &#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;
    <span class="hljs-string">\b:</span> &#x8D77;&#x59CB;,&#x7ED3;&#x675F;,&#x7A7A;&#x683C;&#x3002;eg&#xFF1A;<span class="hljs-regexp">/\bm/</span>&#x5339;&#x914D;&#x201C;moon&#x201D;&#x4E2D;&#x5F97;&#x2018;m&#x2019;&#xFF1B;<span class="hljs-regexp">/oo\b/</span>&#x5E76;&#x4E0D;&#x5339;&#x914D;<span class="hljs-string">&quot;moon&quot;</span>&#x4E2D;&#x5F97;<span class="hljs-string">&apos;oo&apos;</span>&#xFF0C;&#x56E0;&#x4E3A;<span class="hljs-string">&apos;oo&apos;</span>&#x88AB;&#x4E00;&#x4E2A;&#x201C;&#x5B57;&#x201D;&#x5B57;&#x7B26;<span class="hljs-string">&apos;n&apos;</span>&#x7D27;&#x8DDF;&#x7740;&#x3002;


<span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;12 3123&quot;</span>;
<span class="hljs-built_in">console</span>.log( str.replace( <span class="hljs-regexp">/\b/g</span>,<span class="hljs-string">&quot;|&quot;</span> ) );<span class="hljs-regexp">//|12| |3123|
</span></code></pre><p><strong><code>2.&#x91CF;&#x8BCD;</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     {n,m}: n &#x548C; m &#x90FD;&#x662F;&#x6574;&#x6570;&#x3002;&#x5339;&#x914D;&#x524D;&#x9762;&#x7684;&#x5B57;&#x7B26;&#x81F3;&#x5C11;n&#x6B21;&#xFF0C;&#x6700;&#x591A;m&#x6B21;&#x3002;&#x5982;&#x679C; n &#x6216;&#x8005; m &#x7684;&#x503C;&#x662F;0&#xFF0C; &#x8FD9;&#x4E2A;&#x503C;&#x88AB;&#x5FFD;&#x7565;&#x3002;
     *: &#x5339;&#x914D;&#x524D;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;0&#x6B21;&#x6216;&#x591A;&#x6B21;&#x3002;&#x7B49;&#x4EF7;&#x4E8E; {0,}&#x3002;
     +: &#x5339;&#x914D;&#x524D;&#x9762;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;1&#x6B21;&#x6216;&#x8005;&#x591A;&#x6B21;&#x3002;&#x7B49;&#x4EF7;&#x4E8E;{1,}&#x3002;
     ?: &#x5339;&#x914D;&#x524D;&#x9762;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;0&#x6B21;&#x6216;&#x8005;1&#x6B21;&#x3002;{0,1}&#x3002;
     .: &#x5339;&#x914D;&#x9664;&#x6362;&#x884C;&#x7B26;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5355;&#x4E2A;&#x5B57;&#x7B26;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">     </span><span class="hljs-template-variable">{n,m}</span><span class="xml">: n &#x548C; m &#x90FD;&#x662F;&#x6574;&#x6570;&#x3002;&#x5339;&#x914D;&#x524D;&#x9762;&#x7684;&#x5B57;&#x7B26;&#x81F3;&#x5C11;n&#x6B21;&#xFF0C;&#x6700;&#x591A;m&#x6B21;&#x3002;&#x5982;&#x679C; n &#x6216;&#x8005; m &#x7684;&#x503C;&#x662F;0&#xFF0C; &#x8FD9;&#x4E2A;&#x503C;&#x88AB;&#x5FFD;&#x7565;&#x3002;
     *: &#x5339;&#x914D;&#x524D;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;0&#x6B21;&#x6216;&#x591A;&#x6B21;&#x3002;&#x7B49;&#x4EF7;&#x4E8E; </span><span class="hljs-template-variable">{0,}</span><span class="xml">&#x3002;
     +: &#x5339;&#x914D;&#x524D;&#x9762;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;1&#x6B21;&#x6216;&#x8005;&#x591A;&#x6B21;&#x3002;&#x7B49;&#x4EF7;&#x4E8E;</span><span class="hljs-template-variable">{1,}</span><span class="xml">&#x3002;
     ?: &#x5339;&#x914D;&#x524D;&#x9762;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;0&#x6B21;&#x6216;&#x8005;1&#x6B21;&#x3002;</span><span class="hljs-template-variable">{0,1}</span><span class="xml">&#x3002;
     .: &#x5339;&#x914D;&#x9664;&#x6362;&#x884C;&#x7B26;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5355;&#x4E2A;&#x5B57;&#x7B26;&#x3002;</span></code></pre><p><strong><code>&#x6CE8;&#x610F;</code></strong>&#xFF1A;&#x5982;&#x679C; <strong><code>?</code></strong> &#x7D27;&#x8DDF;&#x5728;<strong><code>&#x4EFB;&#x4F55;&#x91CF;&#x8BCD; *&#x3001; +&#x3001;? &#x6216; {} &#x7684;&#x540E;&#x9762;</code></strong>&#xFF0C;&#x5C06;&#x4F1A;&#x4F7F;&#x91CF;&#x8BCD;&#x53D8;&#x4E3A;<strong><code>&#x975E;&#x8D2A;&#x5A6A;&#x7684;&#xFF08;&#x5339;&#x914D;&#x5C3D;&#x91CF;&#x5C11;&#x7684;&#x5B57;&#x7B26;</code></strong>&#xFF09;&#xFF0C;&#x548C;<strong><code>&#x7F3A;&#x7701;&#x4F7F;&#x7528;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF08;&#x5339;&#x914D;&#x5C3D;&#x53EF;&#x80FD;&#x591A;&#x7684;&#x5B57;&#x7B26;&#xFF09;&#x6B63;&#x597D;&#x76F8;&#x53CD;</code></strong>&#x3002;</p><p><strong><code>3. &#x5B57;&#x7B26;&#x7C7B;</code></strong><br><strong>1.[ ]</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[]&#xFF1A;&#x5339;&#x914D;[]&#x4E2D;&#x5185;&#x5BB9;&#x7684;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;.&#x8FD9;&#x6307;&#x7684;&#x662F;&#x8303;&#x56F4;&#x5339;&#x914D;&#x3002;     
eg:/[a-zA-Z0-9]/:&#x53EA;&#x8981;&#x662F;&#x6570;&#x5B57;&#xFF0C;&#x5B57;&#x6BCD;&#x90FD;&#x80FD;&#x5339;&#x914D;&#x4E0A;&#x3002;
eg:/[abc]/:&#x53EA;&#x8981;&#x662F;a&#x6216;&#x8005;b&#x6216;&#x8005;c&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x90FD;&#x80FD;&#x5339;&#x914D;&#x7684;&#x4E0A;&#x3002;
eg:/[a-z.]+/:&#x90FD;&#x5339;&#x914D;&#x201C;test.i.ng&#x201D;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5B57;&#x7B26;&#x3002;
[]:&#x5185;&#x90E8;&#x4E0D;&#x9700;&#x8981;&#x52A0;|&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x5C31;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x8303;&#x56F4;&#xFF0C;&#x6709;&#x6216;&#x8005;&#x7684;&#x542B;&#x4E49;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code><span class="hljs-string">[]</span>&#xFF1A;&#x5339;&#x914D;<span class="hljs-string">[]</span>&#x4E2D;&#x5185;&#x5BB9;&#x7684;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;.&#x8FD9;&#x6307;&#x7684;&#x662F;&#x8303;&#x56F4;&#x5339;&#x914D;&#x3002;     
eg:/<span class="hljs-string">[a-zA-Z0-9]</span>/:&#x53EA;&#x8981;&#x662F;&#x6570;&#x5B57;&#xFF0C;&#x5B57;&#x6BCD;&#x90FD;&#x80FD;&#x5339;&#x914D;&#x4E0A;&#x3002;
eg:/<span class="hljs-string">[abc]</span>/:&#x53EA;&#x8981;&#x662F;a&#x6216;&#x8005;b&#x6216;&#x8005;c&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x90FD;&#x80FD;&#x5339;&#x914D;&#x7684;&#x4E0A;&#x3002;
eg:/<span class="hljs-string">[a-z.]</span>+/:&#x90FD;&#x5339;&#x914D;&#x201C;test.i.ng&#x201D;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5B57;&#x7B26;&#x3002;
<span class="hljs-string">[]</span>:&#x5185;&#x90E8;&#x4E0D;&#x9700;&#x8981;&#x52A0;|&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x5C31;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x8303;&#x56F4;&#xFF0C;&#x6709;&#x6216;&#x8005;&#x7684;&#x542B;&#x4E49;&#x3002;</code></pre><p><strong><code>&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;1</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            var re = /0|1|2/g;
            var re = /[012]/g;
            var re = /[0-2]/g;
            &#x4EE5;&#x4E0A;&#x4E09;&#x79CD;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x662F;&#x4E00;&#x4E2A;&#x610F;&#x601D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>            <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/0|1|2/g</span>;
            <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/[012]/g</span>;
            <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/[0-2]/g</span>;
            &#x4EE5;&#x4E0A;&#x4E09;&#x79CD;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x662F;&#x4E00;&#x4E2A;&#x610F;&#x601D;</code></pre><p><strong><code>&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;2</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          var re = /^([0-9]|1[0-9])$/g; // &#x5224;&#x65AD;&#x6570;&#x5B57;&#x8303;&#x56F4;&#x662F;&#x5426;&#x5728; 0-19 &#x4E4B;&#x95F4;
          console.log( re.test(20) );//false
          console.log( re.test(2) );//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>          var re = /^([<span class="hljs-number">0</span><span class="hljs-number">-9</span>]|<span class="hljs-number">1</span>[<span class="hljs-number">0</span><span class="hljs-number">-9</span>])$/g; <span class="hljs-comment">// &#x5224;&#x65AD;&#x6570;&#x5B57;&#x8303;&#x56F4;&#x662F;&#x5426;&#x5728; 0-19 &#x4E4B;&#x95F4;</span>
          console.log( re.test(<span class="hljs-number">20</span>) );<span class="hljs-comment">//false</span>
          console.log( re.test(<span class="hljs-number">2</span>) );<span class="hljs-comment">//true</span></code></pre><p><strong>2. ^</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="^ : &#x5339;&#x914D;&#x8F93;&#x5165;&#x7684;&#x5F00;&#x59CB;&#x3002;
eg: /^A/ &#x5E76;&#x4E0D;&#x4F1A;&#x5339;&#x914D; &quot;an A&quot; &#x4E2D;&#x7684; &apos;A&apos;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x5339;&#x914D; &quot;An E&quot; &#x4E2D;&#x7684; &apos;A&apos;&#x3002;^&#x8868;&#x793A;&#x5F00;&#x59CB;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>^ : &#x5339;&#x914D;&#x8F93;&#x5165;&#x7684;&#x5F00;&#x59CB;&#x3002;
<span class="hljs-string">eg:</span> <span class="hljs-regexp">/^A/</span> &#x5E76;&#x4E0D;&#x4F1A;&#x5339;&#x914D; <span class="hljs-string">&quot;an A&quot;</span> &#x4E2D;&#x7684; <span class="hljs-string">&apos;A&apos;</span>&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x5339;&#x914D; <span class="hljs-string">&quot;An E&quot;</span> &#x4E2D;&#x7684; <span class="hljs-string">&apos;A&apos;</span>&#x3002;^&#x8868;&#x793A;&#x5F00;&#x59CB;&#x3002;</code></pre><p><strong>&#x6CE8;&#x610F;</strong>&#xFF1A;<strong><code>^</code></strong>&#x653E;&#x5728;<strong><code>[]</code></strong>&#x4E2D;&#xFF0C;&#x8868;&#x793A;<strong><code>&#x975E;</code></strong>&#x7684;&#x610F;&#x601D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eg&#xFF1A; &#x4F8B;&#x5982;&#xFF0C;[^abc] &#x548C; [^a-c] &#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x4ED6;&#x4EEC;&#x5339;&#x914D;&quot;brisket&quot;&#x4E2D;&#x7684;&#x2018;r&#x2019;&#xFF0C;&#x4E5F;&#x5339;&#x914D;&#x201C;chop&#x201D;&#x4E2D;&#x7684;&#x2018;h&#x2019;&#x3002; &#x610F;&#x601D;&#x662F;&#xFF1A;&#x4E0D;&#x662F;a&#x4E0D;&#x662F;b&#x4E0D;&#x662F;c&#xFF0C;&#x5219;&#x5339;&#x914D;&#x6210;&#x529F;&#x3002;    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code style="word-break:break-word;white-space:initial">eg&#xFF1A; &#x4F8B;&#x5982;&#xFF0C;<span class="hljs-string">[^abc]</span> &#x548C; <span class="hljs-string">[^a-c]</span> &#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x4ED6;&#x4EEC;&#x5339;&#x914D;<span class="hljs-string">&quot;brisket&quot;</span>&#x4E2D;&#x7684;&#x2018;r&#x2019;&#xFF0C;&#x4E5F;&#x5339;&#x914D;&#x201C;chop&#x201D;&#x4E2D;&#x7684;&#x2018;h&#x2019;&#x3002; &#x610F;&#x601D;&#x662F;&#xFF1A;&#x4E0D;&#x662F;a&#x4E0D;&#x662F;b&#x4E0D;&#x662F;c&#xFF0C;&#x5219;&#x5339;&#x914D;&#x6210;&#x529F;&#x3002;    </code></pre><p><strong>3. $</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ : &#x5339;&#x914D;&#x8F93;&#x5165;&#x7684;&#x7ED3;&#x675F;&#x3002;
eg: /t$/ &#x5E76;&#x4E0D;&#x4F1A;&#x5339;&#x914D; &quot;eater&quot; &#x4E2D;&#x7684; &apos;t&apos;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x5339;&#x914D; &quot;eat&quot; &#x4E2D;&#x7684; &apos;t&apos;&#x3002;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-string">$ :</span> &#x5339;&#x914D;&#x8F93;&#x5165;&#x7684;&#x7ED3;&#x675F;&#x3002;
<span class="hljs-string">eg:</span> <span class="hljs-regexp">/t$/</span> &#x5E76;&#x4E0D;&#x4F1A;&#x5339;&#x914D; <span class="hljs-string">&quot;eater&quot;</span> &#x4E2D;&#x7684; <span class="hljs-string">&apos;t&apos;</span>&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x5339;&#x914D; <span class="hljs-string">&quot;eat&quot;</span> &#x4E2D;&#x7684; <span class="hljs-string">&apos;t&apos;</span>&#x3002;


</code></pre><h2 id="articleHeader2">3.&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x65B9;&#x6CD5;,&#x6B63;&#x5219;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x548C;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;</h2><ol><li><strong>test&#xFF1A;</strong>&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;,&#x5982;&#x679C;&#x5339;&#x914D; &#x8FD4;&#x56DE;true,&#x5426;&#x5219;false<br><strong>&#x4F7F;&#x7528;&#xFF1A;</strong>&#x6B63;&#x5219;.test(&#x5B57;&#x7B26;&#x4E32;);</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        //1.&#x662F;&#x5426;&#x5B58;&#x5728;&#x6570;&#x5B57;
        var re1=/\d/;
        console.log(re1.test(&quot;asbcc1&quot;));//true
        console.log(re1.test(&quot;asbcd&quot;));//false
        //2.&#x662F;&#x5426;&#x5168;&#x662F;&#x6570;&#x5B57;
        var re2=/\D/;
        console.log(!re2.test(&quot;asbcc1&quot;));//false
        console.log(!re2.test(&quot;123445&quot;));//true
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">//1.&#x662F;&#x5426;&#x5B58;&#x5728;&#x6570;&#x5B57;</span>
        <span class="hljs-keyword">var</span> re1=<span class="hljs-regexp">/\d/</span>;
        <span class="hljs-built_in">console</span>.log(re1.test(<span class="hljs-string">&quot;asbcc1&quot;</span>));<span class="hljs-comment">//true</span>
        <span class="hljs-built_in">console</span>.log(re1.test(<span class="hljs-string">&quot;asbcd&quot;</span>));<span class="hljs-comment">//false</span>
        <span class="hljs-comment">//2.&#x662F;&#x5426;&#x5168;&#x662F;&#x6570;&#x5B57;</span>
        <span class="hljs-keyword">var</span> re2=<span class="hljs-regexp">/\D/</span>;
        <span class="hljs-built_in">console</span>.log(!re2.test(<span class="hljs-string">&quot;asbcc1&quot;</span>));<span class="hljs-comment">//false</span>
        <span class="hljs-built_in">console</span>.log(!re2.test(<span class="hljs-string">&quot;123445&quot;</span>));<span class="hljs-comment">//true</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>2.<strong>search:</strong>&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;,&#x5982;&#x679C;<strong>&#x5339;&#x914D;</strong> &#x8FD4;&#x56DE;<strong>&#x5BF9;&#x5E94;&#x4F4D;&#x7F6E;</strong>,&#x5426;&#x5219;&#x8FD4;&#x56DE;<strong>-1</strong>&#x3002;<br><strong>&#x4F7F;&#x7528;&#xFF1A;</strong>&#x5B57;&#x7B26;&#x4E32;.search(&#x6B63;&#x5219;);<br><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>&#x6B63;&#x5219;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x6807;&#x8BC6;&#x7B26;<strong> i </strong>&#x3002;&#x5BF9;&#x4E8E;&#x4E24;&#x79CD;&#x521B;&#x5EFA;&#x6B63;&#x5219;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;<strong>i</strong> &#x6709;&#x4E24;&#x4E2D;&#x4E0D;&#x540C;&#x7684;&#x5199;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        var re=/Ao/;
        var str1=&quot;aobbbllll&quot;;
        console.log(str1.search(re));//-1

        //&#x7B80;&#x5199;&#x65B9;&#x6CD5; &#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;
        var re1=/Ao/i;
        console.log(str1.search(re1));//0


        //&#x8C03;&#x7528;RegExp&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570; &#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;
        var re2=new RegExp(&quot;Ao&quot;,&quot;i&quot;);
        console.log(str1.search(re2));//0
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/Ao/</span>;
        <span class="hljs-keyword">var</span> str1=<span class="hljs-string">&quot;aobbbllll&quot;</span>;
        <span class="hljs-built_in">console</span>.log(str1.search(re));<span class="hljs-comment">//-1</span>

        <span class="hljs-comment">//&#x7B80;&#x5199;&#x65B9;&#x6CD5; &#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;</span>
        <span class="hljs-keyword">var</span> re1=<span class="hljs-regexp">/Ao/i</span>;
        <span class="hljs-built_in">console</span>.log(str1.search(re1));<span class="hljs-comment">//0</span>


        <span class="hljs-comment">//&#x8C03;&#x7528;RegExp&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570; &#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;</span>
        <span class="hljs-keyword">var</span> re2=<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&quot;Ao&quot;</span>,<span class="hljs-string">&quot;i&quot;</span>);
        <span class="hljs-built_in">console</span>.log(str1.search(re2));<span class="hljs-comment">//0</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p>3.<strong>match:</strong> &#x4F7F;&#x7528;&#x6B63;&#x5219;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;,<strong>&#x5982;&#x679C;&#x5339;&#x914D;,&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;&#x5B57;&#x7B26;&#x4E32;,&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;,&#x5426;&#x5219; null&#x3002;</strong><br><strong>&#x4F7F;&#x7528;:</strong> &#x5B57;&#x7B26;&#x4E32;.match(&#x6B63;&#x5219;)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6CE8;&#x610F;:
    1. &#x8FD4;&#x56DE;&#x7684;&#x662F;&#x7C7B;&#x578B;&#x662F;&#x6570;&#x7EC4;
    2. &#x6B63;&#x5219;&#x9ED8;&#x8BA4;&#x5339;&#x914D;&#x6210;&#x529F;&#x5C31;&#x4F1A;&#x505C;&#x6B62;&#xFF0C;&#x4F7F;&#x7528;&#x6807;&#x8BC6;&#x7B26; g(&#x5168;&#x5C40;&#x5339;&#x914D;)&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code>&#x6CE8;&#x610F;:
    1. &#x8FD4;&#x56DE;&#x7684;&#x662F;&#x7C7B;&#x578B;&#x662F;&#x6570;&#x7EC4;
    2. &#x6B63;&#x5219;&#x9ED8;&#x8BA4;&#x5339;&#x914D;&#x6210;&#x529F;&#x5C31;&#x4F1A;&#x505C;&#x6B62;&#xFF0C;&#x4F7F;&#x7528;&#x6807;&#x8BC6;&#x7B26; g(&#x5168;&#x5C40;&#x5339;&#x914D;)&#x3002;

</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;123a456b7890&quot;;
    
    var re1 = /\d/;
    var re2 = /\d/g;
    var re3 = new RegExp(/\d/,&quot;g&quot;);
    var re4 = /\dA/ig;
    var re5 = new RegExp(/\dA/,&quot;ig&quot;);
    console.log( str.match( re1 ) );//[&quot;1&quot;, index: 0, input: &quot;123a456b7890&quot;, groups: undefined]
    console.log( str.match( re2 ) );//[&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;, &quot;7&quot;, &quot;8&quot;, &quot;9&quot;, &quot;0&quot;]
    console.log( str.match( re3 ) );//[&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;, &quot;7&quot;, &quot;8&quot;, &quot;9&quot;, &quot;0&quot;]
    console.log( str.match( re4 ) );//[&quot;3a&quot;]
    console.log( str.match( re5 ) );//[&quot;3a&quot;]
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>&lt;script&gt;
    var str = <span class="hljs-string">&quot;123a456b7890&quot;</span>;
    
    var re1 = <span class="hljs-regexp">/\d/</span>;
    var re2 = <span class="hljs-regexp">/\d/g</span>;
    var re3 = <span class="hljs-keyword">new</span> RegExp(<span class="hljs-regexp">/\d/</span>,<span class="hljs-string">&quot;g&quot;</span>);
    var re4 = <span class="hljs-regexp">/\dA/ig</span>;
    var re5 = <span class="hljs-keyword">new</span> RegExp(<span class="hljs-regexp">/\dA/</span>,<span class="hljs-string">&quot;ig&quot;</span>);
    <span class="hljs-built_in">console</span>.log( str.match( re1 ) );<span class="hljs-regexp">//</span>[<span class="hljs-string">&quot;1&quot;</span>, index: <span class="hljs-number">0</span>, input: <span class="hljs-string">&quot;123a456b7890&quot;</span>, groups: <span class="hljs-literal">undefined</span>]
    <span class="hljs-built_in">console</span>.log( str.match( re2 ) );<span class="hljs-regexp">//</span>[<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;6&quot;</span>, <span class="hljs-string">&quot;7&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>, <span class="hljs-string">&quot;9&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>]
    <span class="hljs-built_in">console</span>.log( str.match( re3 ) );<span class="hljs-regexp">//</span>[<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;6&quot;</span>, <span class="hljs-string">&quot;7&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>, <span class="hljs-string">&quot;9&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>]
    <span class="hljs-built_in">console</span>.log( str.match( re4 ) );<span class="hljs-regexp">//</span>[<span class="hljs-string">&quot;3a&quot;</span>]
    <span class="hljs-built_in">console</span>.log( str.match( re5 ) );<span class="hljs-regexp">//</span>[<span class="hljs-string">&quot;3a&quot;</span>]
&lt;/script&gt;</code></pre><p><strong>4.&#x6CE8;&#x610F;&#xFF1A;&#x6B63;&#x5219;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;</strong><br>&#x9996;&#x5148;&#x9700;&#x4E86;&#x89E3;&#xFF1A; <strong>+</strong>&#x7684;&#x542B;&#x4E49;&#x662F;&#xFF1A; &#x5339;&#x914D;&#x524D;&#x9762;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;1&#x6B21;&#x6216;&#x8005;&#x591A;&#x6B21;&#x3002;&#x7B49;&#x4EF7;&#x4E8E;{1,}&#x3002;</p><p><strong>&#x4EE5;&#x4E0B;&#x662F;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;6z123a456b7890&quot;;
    var re = /\d+/g;
    console.log( str.match( re ) );//[&quot;6&quot;, &quot;123&quot;, &quot;456&quot;, &quot;7890&quot;]    
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;6z123a456b7890&quot;</span>;
    <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/\d+/g</span>;
    <span class="hljs-built_in">console</span>.log( str.match( re ) );<span class="hljs-comment">//[&quot;6&quot;, &quot;123&quot;, &quot;456&quot;, &quot;7890&quot;]    </span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x89E3;&#x91CA;&#xFF1A;
1.&#x6B63;&#x5219;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x662F;&#x6307;&#x4F1A;&#x5339;&#x914D;&#x6700;&#x957F;&#x7684;&#xFF0C;&#x5F97;&#x5230;&#x6570;&#x76EE;&#x6700;&#x591A;&#x7684;&#x9879;&#x3002;
2.&#x5982;&#x679C; ? &#x7D27;&#x8DDF;&#x5728;&#x4EFB;&#x4F55;&#x91CF;&#x8BCD; *&#x3001; +&#x3001;? &#x6216; {} &#x7684;&#x540E;&#x9762;&#xFF0C;&#x5C06;&#x4F1A;&#x4F7F;&#x91CF;&#x8BCD;&#x53D8;&#x4E3A;&#x975E;&#x8D2A;&#x5A6A;&#x7684;&#xFF08;&#x5339;&#x914D;&#x5C3D;&#x91CF;&#x5C11;&#x7684;&#x5B57;&#x7B26;&#xFF09;&#xFF0C;&#x548C;&#x7F3A;&#x7701;&#x4F7F;&#x7528;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF08;&#x5339;&#x914D;&#x5C3D;&#x53EF;&#x80FD;&#x591A;&#x7684;&#x5B57;&#x7B26;&#xFF09;&#x6B63;&#x597D;&#x76F8;&#x53CD;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x89E3;&#x91CA;&#xFF1A;
<span class="hljs-number">1.</span>&#x6B63;&#x5219;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x662F;&#x6307;&#x4F1A;&#x5339;&#x914D;&#x6700;&#x957F;&#x7684;&#xFF0C;&#x5F97;&#x5230;&#x6570;&#x76EE;&#x6700;&#x591A;&#x7684;&#x9879;&#x3002;
<span class="hljs-number">2.</span>&#x5982;&#x679C; ? &#x7D27;&#x8DDF;&#x5728;&#x4EFB;&#x4F55;&#x91CF;&#x8BCD; *&#x3001; +&#x3001;? &#x6216; {} &#x7684;&#x540E;&#x9762;&#xFF0C;&#x5C06;&#x4F1A;&#x4F7F;&#x91CF;&#x8BCD;&#x53D8;&#x4E3A;&#x975E;&#x8D2A;&#x5A6A;&#x7684;&#xFF08;&#x5339;&#x914D;&#x5C3D;&#x91CF;&#x5C11;&#x7684;&#x5B57;&#x7B26;&#xFF09;&#xFF0C;&#x548C;&#x7F3A;&#x7701;&#x4F7F;&#x7528;&#x7684;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF08;&#x5339;&#x914D;&#x5C3D;&#x53EF;&#x80FD;&#x591A;&#x7684;&#x5B57;&#x7B26;&#xFF09;&#x6B63;&#x597D;&#x76F8;&#x53CD;&#x3002;
</code></pre><p><strong>&#x4EE5;&#x4E0B;&#x662F;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;6z123a456b7890&quot;;
    var re = /\d+?/g;
    console.log( str.match( re ) );//[&quot;6&quot;, &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;, &quot;7&quot;, &quot;8&quot;, &quot;9&quot;, &quot;0&quot;]
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs golo"><code>&lt;script&gt;
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;6z123a456b7890&quot;</span>;
    <span class="hljs-keyword">var</span> re = /\d+?/g;
    console.log( str.<span class="hljs-keyword">match</span>( re ) );//[<span class="hljs-string">&quot;6&quot;</span>, <span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;6&quot;</span>, <span class="hljs-string">&quot;7&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>, <span class="hljs-string">&quot;9&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>]
&lt;/script&gt;</code></pre><p>5.<strong>replace</strong>:&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;,<strong>&#x5982;&#x679C;&#x5339;&#x914D;&#x6210;&#x529F;,&#x66FF;&#x6362;&#x5BF9;&#x5E94;&#x5B57;&#x7B26;&#x4E32;,&#x8FD4;&#x56DE;&#x5339;&#x914D;&#x540E;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</strong><strong>&#x5982;&#x679C;&#x4E0D;&#x6210;&#x529F;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#x3002;</strong><br><strong>&#x4F7F;&#x7528;&#xFF1A;</strong> &#x5B57;&#x7B26;&#x4E32;.replace(&#x6B63;&#x5219;,&#x66FF;&#x6362;&#x5B57;&#x7B26;&#x4E32;);</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;miaovketang&quot;;
    var re1 = /a/;//&#x4E0D;&#x5168;&#x5C40;&#x5339;&#x914D;&#xFF0C;&#x610F;&#x601D;&#x4E3A;&#x5339;&#x914D;&#x6210;&#x529F;&#x5C31;&#x7ED3;&#x675F;
    var re2 = /a/g;//&#x5168;&#x5C40;&#x5339;&#x914D;&#xFF0C;&#x610F;&#x601D;&#x4E3A;&#x5339;&#x914D;&#x5230;&#x5B57;&#x7B26;&#x4E32;&#x7ED3;&#x675F;&#x4E3A;&#x6B62;&#x3002;
    console.log( str.replace( re1,&quot;b&quot; ) );//mibovketang
    console.log( str.replace( re2,&quot;b&quot; ) );//mibovketbng
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;miaovketang&quot;</span>;
    <span class="hljs-keyword">var</span> re1 = <span class="hljs-regexp">/a/</span>;<span class="hljs-comment">//&#x4E0D;&#x5168;&#x5C40;&#x5339;&#x914D;&#xFF0C;&#x610F;&#x601D;&#x4E3A;&#x5339;&#x914D;&#x6210;&#x529F;&#x5C31;&#x7ED3;&#x675F;</span>
    <span class="hljs-keyword">var</span> re2 = <span class="hljs-regexp">/a/g</span>;<span class="hljs-comment">//&#x5168;&#x5C40;&#x5339;&#x914D;&#xFF0C;&#x610F;&#x601D;&#x4E3A;&#x5339;&#x914D;&#x5230;&#x5B57;&#x7B26;&#x4E32;&#x7ED3;&#x675F;&#x4E3A;&#x6B62;&#x3002;</span>
    <span class="hljs-built_in">console</span>.log( str.replace( re1,<span class="hljs-string">&quot;b&quot;</span> ) );<span class="hljs-comment">//mibovketang</span>
    <span class="hljs-built_in">console</span>.log( str.replace( re2,<span class="hljs-string">&quot;b&quot;</span> ) );<span class="hljs-comment">//mibovketbng</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader3">4.&#x6B63;&#x5219;&#x7684;&#x4F7F;&#x7528;</h2><p><strong>1.&#x654F;&#x611F;&#x8BCD;&#x8FC7;&#x6EE4;</strong><br>&#x6BCF;&#x4E2A;&#x7F51;&#x7AD9;&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x654F;&#x611F;&#x8BCD;&#xFF0C;&#x4F8B;&#x5982;&#x8FD9;&#x6B21;&#x7684;&#x654F;&#x611F;&#x8BCD;&#x4E3A;&#xFF1A;&#x661F;&#x661F;&#xFF0C;&#x597D;&#xFF0C;&#x5929;&#x7A7A;&#xFF0C;&#x8FD9;&#x4E09;&#x4E2A;&#x8BCD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        var str=&quot;&#x661F;&#x661F;&#x6302;&#x5728;&#x5929;&#x7A7A;&#x4E0A;&#x597D;&#x6F02;&#x4EAE;&quot;;
        var re=/&#x661F;&#x661F;|&#x5929;&#x7A7A;|&#x597D;/g;
        var str2=str.replace(re,function ($0) {
            var temp=&quot;&quot;;
            console.log($0);//replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6BCF;&#x6B21;&#x5339;&#x914D;&#x5230;&#x7684; &#x5B57;&#x7B26;&#x3002;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C; &#x661F;&#x661F;&#xFF0C;&#x5929;&#x7A7A;&#xFF0C;&#x597D;
            for(var i=0;i&lt;$0.length;i++){
                temp+=&quot;*&quot;;
            }
            return temp;
        });

        console.log(str2);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> str=<span class="hljs-string">&quot;&#x661F;&#x661F;&#x6302;&#x5728;&#x5929;&#x7A7A;&#x4E0A;&#x597D;&#x6F02;&#x4EAE;&quot;</span>;
        <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/&#x661F;&#x661F;|&#x5929;&#x7A7A;|&#x597D;/g</span>;
        <span class="hljs-keyword">var</span> str2=str.replace(re,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$<span class="hljs-number">0</span></span>) </span>{
            <span class="hljs-keyword">var</span> temp=<span class="hljs-string">&quot;&quot;</span>;
            <span class="hljs-built_in">console</span>.log($<span class="hljs-number">0</span>);<span class="hljs-comment">//replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6BCF;&#x6B21;&#x5339;&#x914D;&#x5230;&#x7684; &#x5B57;&#x7B26;&#x3002;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C; &#x661F;&#x661F;&#xFF0C;&#x5929;&#x7A7A;&#xFF0C;&#x597D;</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;$<span class="hljs-number">0.</span>length;i++){
                temp+=<span class="hljs-string">&quot;*&quot;</span>;
            }
            <span class="hljs-keyword">return</span> temp;
        });

        <span class="hljs-built_in">console</span>.log(str2);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x89E3;&#x6790;&#xFF1A;
1.replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;,&#x6216;&#x8005;&#x51FD;&#x6570;
2.replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6BCF;&#x6B21;&#x5339;&#x914D;&#x5230;&#x7684; &#x5B57;&#x7B26;&#x3002;
3.&#x6211;&#x7ED9;&#x53C2;&#x6570;&#x7684;&#x547D;&#x540D;&#x4E3A;$0,&#x8FD9;&#x4E2A;&#x662F;&#x968F;&#x610F;&#x7684;&#xFF0C;&#x53EA;&#x8981;&#x4E0D;&#x662F;&#x5173;&#x952E;&#x5B57;&#x4FDD;&#x7559;&#x5B57;&#x90FD;&#x53EF;&#x4EE5;&#x3002;&#x4F8B;&#x5982;a&#xFF0C;b&#x90FD;&#x53EF;&#x4EE5;&#x7684;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x89E3;&#x6790;&#xFF1A;
<span class="hljs-number">1.</span>replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;,&#x6216;&#x8005;&#x51FD;&#x6570;
<span class="hljs-number">2.</span>replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6BCF;&#x6B21;&#x5339;&#x914D;&#x5230;&#x7684; &#x5B57;&#x7B26;&#x3002;
<span class="hljs-number">3.</span>&#x6211;&#x7ED9;&#x53C2;&#x6570;&#x7684;&#x547D;&#x540D;&#x4E3A;$<span class="hljs-number">0</span>,&#x8FD9;&#x4E2A;&#x662F;&#x968F;&#x610F;&#x7684;&#xFF0C;&#x53EA;&#x8981;&#x4E0D;&#x662F;&#x5173;&#x952E;&#x5B57;&#x4FDD;&#x7559;&#x5B57;&#x90FD;&#x53EF;&#x4EE5;&#x3002;&#x4F8B;&#x5982;a&#xFF0C;b&#x90FD;&#x53EF;&#x4EE5;&#x7684;&#x3002;</code></pre><p><strong>2.&#x683C;&#x5F0F;&#x5316;&#x65F6;&#x95F4;</strong><br>&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        var str = &quot;2018-6-25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25
//      var str = &quot;2018/6/25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25
//      var str = &quot;2018~6!25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25
//      var str = &quot;2018&#x5E74;6&#x6708;25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25

        var re=/\D/g;
        var str2=str.replace(re,&quot;.&quot;);

        console.log(str2);//2018.6.25
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;2018-6-25&quot;</span>; <span class="hljs-comment">//&#x8F6C;&#x5316;&#x6210; 2018.6.25</span>
<span class="hljs-comment">//      var str = &quot;2018/6/25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25</span>
<span class="hljs-comment">//      var str = &quot;2018~6!25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25</span>
<span class="hljs-comment">//      var str = &quot;2018&#x5E74;6&#x6708;25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25</span>

        <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/\D/g</span>;
        <span class="hljs-keyword">var</span> str2=str.replace(re,<span class="hljs-string">&quot;.&quot;</span>);

        <span class="hljs-built_in">console</span>.log(str2);<span class="hljs-comment">//2018.6.25</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        var str = &quot;2018-6-25&quot;; //&#x8F6C;&#x5316;&#x6210; 2018.6.25
        var re=/(\d+)\D/g;
        var str2=str.replace(re,function ($0,$1) {
            console.log($0,$1);
            return $1+&quot;.&quot;;
        });

        console.log(str2);//2018.6.25
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;2018-6-25&quot;</span>; <span class="hljs-comment">//&#x8F6C;&#x5316;&#x6210; 2018.6.25</span>
        <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/(\d+)\D/g</span>;
        <span class="hljs-keyword">var</span> str2=str.replace(re,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$<span class="hljs-number">0</span>,$<span class="hljs-number">1</span></span>) </span>{
            <span class="hljs-built_in">console</span>.log($<span class="hljs-number">0</span>,$<span class="hljs-number">1</span>);
            <span class="hljs-keyword">return</span> $<span class="hljs-number">1</span>+<span class="hljs-string">&quot;.&quot;</span>;
        });

        <span class="hljs-built_in">console</span>.log(str2);<span class="hljs-comment">//2018.6.25</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x65B9;&#x5F0F;&#x4E8C;&#x7684;&#x89E3;&#x6790;&#xFF1A;replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;
1.&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684; &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570; &#x662F;&#x6BCF;&#x6B21;&#x5339;&#x914D;&#x5230;&#x7684; &#x5B57;&#x7B26;&#x3002;
2.&#x4E4B;&#x540E;&#x7684;&#x53C2;&#x6570;&#x662F;&#x901A;&#x8FC7;&#xFF08;&#xFF09;&#x7684;&#x5206;&#x7EC4;&#xFF0C;&#x5B50;&#x9879;&#x6309;&#x7167; &quot;(&quot;&#x786E;&#x5B9A;&#x6B21;&#x5E8F;&#x3002;
3.&#x4F8B;&#x5982;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x662F;&#xFF08;\d+&#xFF09;&#x5339;&#x914D;&#x5230;&#x7684;&#x5185;&#x5BB9;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x65B9;&#x5F0F;&#x4E8C;&#x7684;&#x89E3;&#x6790;&#xFF1A;replace &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;
<span class="hljs-number">1.</span>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684; &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570; &#x662F;&#x6BCF;&#x6B21;&#x5339;&#x914D;&#x5230;&#x7684; &#x5B57;&#x7B26;&#x3002;
<span class="hljs-number">2.</span>&#x4E4B;&#x540E;&#x7684;&#x53C2;&#x6570;&#x662F;&#x901A;&#x8FC7;&#xFF08;&#xFF09;&#x7684;&#x5206;&#x7EC4;&#xFF0C;&#x5B50;&#x9879;&#x6309;&#x7167; <span class="hljs-string">&quot;(&quot;</span>&#x786E;&#x5B9A;&#x6B21;&#x5E8F;&#x3002;
<span class="hljs-number">3.</span>&#x4F8B;&#x5982;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x662F;&#xFF08;\d+&#xFF09;&#x5339;&#x914D;&#x5230;&#x7684;&#x5185;&#x5BB9;&#x3002;
</code></pre><p><strong>3.&#x5339;&#x914D;&#x6A21;&#x5F0F;&#x53C2;&#x6570;&#x7684;&#x8BF4;&#x660E;</strong><br>&#x4F7F;&#x7528;&#x60C5;&#x51B5;&#x4E3E;&#x4F8B;&#xFF1A;&#x5F53;&#x4F7F;&#x7528;replace&#xFF0C;&#x5E76;&#x4E14;replace&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x51FD;&#x6570;&#x3002;&#x5219;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x60C5;&#x51B5;&#xFF0C;<strong><code>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6B63;&#x5219;&#x5339;&#x914D;&#x5230;&#x7684;&#x503C;</code></strong>&#x3002;<strong><code>&#x4E4B;&#x540E;&#x7684;&#x53C2;&#x6570;&#x662F;&#x901A;&#x8FC7;&#xFF08; &#xFF09;&#x7684;&#x5206;&#x7EC4;&#xFF0C;&#x5B50;&#x9879;&#x6309;&#x7167; &quot;(&quot;&#x786E;&#x5B9A;&#x6B21;&#x5E8F;&#x3002;</code></strong></p><p><strong>&#x4E3E;&#x4F8B;&#x4E00;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
var str = &quot;2018-6-25&quot;; //2018.6.25
//        var re = /(\d+)\D/g;//&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6B63;&#x5219;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;2018.6.25
        var re = /(\d)+\D/g;//&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6B63;&#x5219;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;8.6.25
        console.log( str.replace( re,function($0,$1){
            console.log( $0,$1 );
            return $1+&quot;.&quot;;
        } ) );
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;2018-6-25&quot;</span>; <span class="hljs-comment">//2018.6.25</span>
<span class="hljs-comment">//        var re = /(\d+)\D/g;//&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6B63;&#x5219;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;2018.6.25</span>
        <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/(\d)+\D/g</span>;<span class="hljs-comment">//&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6B63;&#x5219;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;8.6.25</span>
        <span class="hljs-built_in">console</span>.log( str.replace( re,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$<span class="hljs-number">0</span>,$<span class="hljs-number">1</span></span>)</span>{
            <span class="hljs-built_in">console</span>.log( $<span class="hljs-number">0</span>,$<span class="hljs-number">1</span> );
            <span class="hljs-keyword">return</span> $<span class="hljs-number">1</span>+<span class="hljs-string">&quot;.&quot;</span>;
        } ) );
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong>&#x4E3E;&#x4F8B;&#x4E8C;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;2018-6-25&quot;; //2018.6.25
    var re = /(((\d)+)(\D))/g;
    str.replace(re, function ($0, $1, $2, $3, $4) {
        console.log($0, $1, $2, $3, $4);
        //&#x6253;&#x5370;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;
        //2018- 2018- 2018 8 -
        //6- 6- 6 6 -
    });
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>&lt;script&gt;
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;2018-6-25&quot;</span>; <span class="hljs-comment">//2018.6.25</span>
    <span class="hljs-keyword">var</span> re = /(((\<span class="hljs-keyword">d</span>)+)(\<span class="hljs-keyword">D</span>))/<span class="hljs-keyword">g</span>;
    str.<span class="hljs-keyword">replace</span>(re, function (<span class="hljs-variable">$0</span>, <span class="hljs-variable">$1</span>, <span class="hljs-variable">$2</span>, <span class="hljs-variable">$3</span>, <span class="hljs-variable">$4</span>) {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-variable">$0</span>, <span class="hljs-variable">$1</span>, <span class="hljs-variable">$2</span>, <span class="hljs-variable">$3</span>, <span class="hljs-variable">$4</span>);
        <span class="hljs-comment">//&#x6253;&#x5370;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</span>
        <span class="hljs-comment">//2018- 2018- 2018 8 -</span>
        <span class="hljs-comment">//6- 6- 6 6 -</span>
    });
&lt;/script&gt;
</code></pre><p><strong>4.&#x8FC7;&#x6EE4;&#x6807;&#x7B7E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;&lt;div&gt;&#x4F60;&#x597D;,&lt;/div&gt;&lt;&gt;&lt;a&gt;&#x7F8E;&#x4E3D;&#x7684;&lt;/a&gt;&#x4E0A;&#x6D77;&quot;;//&#x60F3;&#x8F6C;&#x5316;&#x6210; &#x4F60;&#x597D;&#xFF0C;&#x7F8E;&#x4E3D;&#x7684;&#x4E0A;&#x6D77;
    var re=/&lt;.*?&gt;/g; // &#x5982;&#x679C;&#x540E;&#x9762;&#x52A0;&#xFF1F;&#xFF0C;&#x5C31;&#x4F1A;&#x8FDB;&#x5165;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x3002;
    // var re=/&lt;.*&gt;/g; //&#x5982;&#x679C;&#x540E;&#x9762;&#x4E0D;&#x52A0;&#xFF1F;&#xFF0C;&#x5C31;&#x4F1A;&#x8FDB;&#x5165;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF0C;&#x7ED3;&#x679C;&#x4E3A; &#x4E0A;&#x6D77;&#x3002;
    str2=str.replace(re,&quot;&quot;);
    console.log(str2); //&#x4F60;&#x597D;,&#x7F8E;&#x4E3D;&#x7684;&#x4E0A;&#x6D77;&#x3002;
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;&lt;div&gt;&#x4F60;&#x597D;,&lt;/div&gt;&lt;&gt;&lt;a&gt;&#x7F8E;&#x4E3D;&#x7684;&lt;/a&gt;&#x4E0A;&#x6D77;&quot;</span>;<span class="hljs-comment">//&#x60F3;&#x8F6C;&#x5316;&#x6210; &#x4F60;&#x597D;&#xFF0C;&#x7F8E;&#x4E3D;&#x7684;&#x4E0A;&#x6D77;</span>
    <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/&lt;.*?&gt;/g</span>; <span class="hljs-comment">// &#x5982;&#x679C;&#x540E;&#x9762;&#x52A0;&#xFF1F;&#xFF0C;&#x5C31;&#x4F1A;&#x8FDB;&#x5165;&#x975E;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#x3002;</span>
    <span class="hljs-comment">// var re=/&lt;.*&gt;/g; //&#x5982;&#x679C;&#x540E;&#x9762;&#x4E0D;&#x52A0;&#xFF1F;&#xFF0C;&#x5C31;&#x4F1A;&#x8FDB;&#x5165;&#x8D2A;&#x5A6A;&#x6A21;&#x5F0F;&#xFF0C;&#x7ED3;&#x679C;&#x4E3A; &#x4E0A;&#x6D77;&#x3002;</span>
    str2=str.replace(re,<span class="hljs-string">&quot;&quot;</span>);
    <span class="hljs-built_in">console</span>.log(str2); <span class="hljs-comment">//&#x4F60;&#x597D;,&#x7F8E;&#x4E3D;&#x7684;&#x4E0A;&#x6D77;&#x3002;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong>5.&#x68C0;&#x67E5;&#x662F;&#x5426;&#x542B;&#x6709;class&#x540D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
    &lt;div id=&quot;box&quot; class=&quot;div box1 box2&quot;&gt;&lt;/div&gt;
    &lt;script&gt;
        function checkClass(el,val) {
            var re = new RegExp(&quot;\\b&quot;+val+&quot;\\b&quot;,&quot;g&quot;)
            return re.test(el.className);
        }

        var box=document.getElementById(&quot;box&quot;);
        console.log(checkClass(box,&quot;box2&quot;));//true
        console.log(checkClass(box,&quot;box&quot;));//false
    &lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;div box1 box2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkClass</span>(<span class="hljs-params">el,val</span>) </span>{
            <span class="hljs-keyword">var</span> re = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&quot;\\b&quot;</span>+val+<span class="hljs-string">&quot;\\b&quot;</span>,<span class="hljs-string">&quot;g&quot;</span>)
            <span class="hljs-keyword">return</span> re.test(el.className);
        }

        <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
        <span class="hljs-built_in">console</span>.log(checkClass(box,<span class="hljs-string">&quot;box2&quot;</span>));<span class="hljs-comment">//true</span>
        <span class="hljs-built_in">console</span>.log(checkClass(box,<span class="hljs-string">&quot;box&quot;</span>));<span class="hljs-comment">//false</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><strong>6.&#x627E;&#x51FA;&#x91CD;&#x590D;&#x6B21;&#x6570;&#x6700;&#x591A;&#x7684;&#x5B57;&#x7B26;</strong></p><p><strong><code>&#x65B9;&#x6CD5;&#x4E00;&#xFF1A;&#x4E0D;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x3002;</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;abcdabcaba&quot;;
    var obj={};
    var max=0;//&#x51FA;&#x73B0;&#x6B21;&#x6570;
    var maxValue = &quot;&quot;;//&#x51FA;&#x73B0;&#x7684;&#x5B57;&#x7B26;
    //&#x751F;&#x6210;&#x5BF9;&#x8C61;,&#x5B57;&#x7B26;&#x4E3A;&#x952E;&#x540D;&#xFF0C;&#x6B64;&#x65F6;&#x4E3A;&#x952E;&#x503C;&#x3002;
    for(var i=0;i&lt;str.length;i++){
        if(!obj[str[i]]){
            obj[str[i]]=1;
        }else{
            obj[str[i]]+=1;
        }
    }
    console.log(obj);
    //&#x904D;&#x5386;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x53D6;&#x51FA;&#x73B0;&#x7684;&#x6700;&#x5927;&#x6B21;&#x6570;&#x7684;&#x952E;&#x540D;&#x548C;&#x952E;&#x503C;
    //&#x5219;&#x4E3A;&#x51FA;&#x73B0;&#x6700;&#x591A;&#x7684;&#x5B57;&#x7B26;&#x548C;&#x51FA;&#x73B0;&#x6700;&#x591A;&#x7684;&#x6B21;&#x6570;&#x3002;
    for( var i in obj){
        if(max&lt; obj[i]){
            max=obj[i];
            maxValue=i;
        }
    }
    console.log(max,maxValue);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;abcdabcaba&quot;</span>;
    <span class="hljs-keyword">var</span> obj={};
    <span class="hljs-keyword">var</span> max=<span class="hljs-number">0</span>;<span class="hljs-comment">//&#x51FA;&#x73B0;&#x6B21;&#x6570;</span>
    <span class="hljs-keyword">var</span> maxValue = <span class="hljs-string">&quot;&quot;</span>;<span class="hljs-comment">//&#x51FA;&#x73B0;&#x7684;&#x5B57;&#x7B26;</span>
    <span class="hljs-comment">//&#x751F;&#x6210;&#x5BF9;&#x8C61;,&#x5B57;&#x7B26;&#x4E3A;&#x952E;&#x540D;&#xFF0C;&#x6B64;&#x65F6;&#x4E3A;&#x952E;&#x503C;&#x3002;</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;str.length;i++){
        <span class="hljs-keyword">if</span>(!obj[str[i]]){
            obj[str[i]]=<span class="hljs-number">1</span>;
        }<span class="hljs-keyword">else</span>{
            obj[str[i]]+=<span class="hljs-number">1</span>;
        }
    }
    <span class="hljs-built_in">console</span>.log(obj);
    <span class="hljs-comment">//&#x904D;&#x5386;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x53D6;&#x51FA;&#x73B0;&#x7684;&#x6700;&#x5927;&#x6B21;&#x6570;&#x7684;&#x952E;&#x540D;&#x548C;&#x952E;&#x503C;</span>
    <span class="hljs-comment">//&#x5219;&#x4E3A;&#x51FA;&#x73B0;&#x6700;&#x591A;&#x7684;&#x5B57;&#x7B26;&#x548C;&#x51FA;&#x73B0;&#x6700;&#x591A;&#x7684;&#x6B21;&#x6570;&#x3002;</span>
    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj){
        <span class="hljs-keyword">if</span>(max&lt; obj[i]){
            max=obj[i];
            maxValue=i;
        }
    }
    <span class="hljs-built_in">console</span>.log(max,maxValue);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong><code>&#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x3002;</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var str = &quot;abcdabcaba&quot;;
    str=str.split(&quot;&quot;).sort().join(&quot;&quot;);
    console.log( str );//aaaabbbccd
    var re=/(\w)\1*/g;
    var max=0;
    var maxValue=&quot;&quot;;
    str.replace(re,function ($0,$1) {
        if(max&lt;$0.length){
            max=$0.length;
            maxValue=$1;
        }
    });
    console.log(max,maxValue);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;abcdabcaba&quot;</span>;
    str=str.split(<span class="hljs-string">&quot;&quot;</span>).sort().join(<span class="hljs-string">&quot;&quot;</span>);
    <span class="hljs-built_in">console</span>.log( str );<span class="hljs-comment">//aaaabbbccd</span>
    <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/(\w)\1*/g</span>;
    <span class="hljs-keyword">var</span> max=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> maxValue=<span class="hljs-string">&quot;&quot;</span>;
    str.replace(re,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$<span class="hljs-number">0</span>,$<span class="hljs-number">1</span></span>) </span>{
        <span class="hljs-keyword">if</span>(max&lt;$<span class="hljs-number">0.</span>length){
            max=$<span class="hljs-number">0.</span>length;
            maxValue=$<span class="hljs-number">1</span>;
        }
    });
    <span class="hljs-built_in">console</span>.log(max,maxValue);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x89E3;&#x6790;&#xFF1A;\1, \&#x540E;&#x9762;&#x7684;&#x662F;&#x6570;&#x5B57;1&#xFF0C;&#x4E0D;&#x662F;&#x5B57;&#x6BCD;l&#x3002;
\1&#x662F;&#x4F5C;&#x7528;&#x662F;\1&#x524D;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x81F3;&#x5C11;&#x8981;&#x91CD;&#x590D;&#x4E00;&#x904D;&#x3002;&#x800C;&#x4E14;&#x524D;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x8981;&#x7528;&#xFF08; &#xFF09;&#x5305;&#x8D77;&#x6765;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x89E3;&#x6790;&#xFF1A;\<span class="hljs-number">1</span>, \&#x540E;&#x9762;&#x7684;&#x662F;&#x6570;&#x5B57;<span class="hljs-number">1</span>&#xFF0C;&#x4E0D;&#x662F;&#x5B57;&#x6BCD;l&#x3002;
\<span class="hljs-number">1</span>&#x662F;&#x4F5C;&#x7528;&#x662F;\<span class="hljs-number">1</span>&#x524D;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x81F3;&#x5C11;&#x8981;&#x91CD;&#x590D;&#x4E00;&#x904D;&#x3002;&#x800C;&#x4E14;&#x524D;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x8981;&#x7528;&#xFF08; &#xFF09;&#x5305;&#x8D77;&#x6765;&#x3002;
</code></pre><p><strong><code>\1&#x7684;&#x4F7F;&#x7528;&#x8BF4;&#x660E;</code></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var re = /(\d)\1+/g;
    console.log( re.test( &quot;a00&quot; ) );//true
    console.log( re.test( &quot;a01c&quot; ) );//false
    console.log( re.test( &quot;a012c&quot; ) );//false
    console.log( re.test( &quot;a0123131323c&quot; ) );//false
    console.log( re.test( &quot;a0000c&quot; ) );//true
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/(\d)\1+/g</span>;
    <span class="hljs-built_in">console</span>.log( re.test( <span class="hljs-string">&quot;a00&quot;</span> ) );<span class="hljs-comment">//true</span>
    <span class="hljs-built_in">console</span>.log( re.test( <span class="hljs-string">&quot;a01c&quot;</span> ) );<span class="hljs-comment">//false</span>
    <span class="hljs-built_in">console</span>.log( re.test( <span class="hljs-string">&quot;a012c&quot;</span> ) );<span class="hljs-comment">//false</span>
    <span class="hljs-built_in">console</span>.log( re.test( <span class="hljs-string">&quot;a0123131323c&quot;</span> ) );<span class="hljs-comment">//false</span>
    <span class="hljs-built_in">console</span>.log( re.test( <span class="hljs-string">&quot;a0000c&quot;</span> ) );<span class="hljs-comment">//true</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong>7.&#x68C0;&#x6D4B;qq&#x53F7;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
&lt;!--
   1. 6-12&#x4F4D; &#x7EAF;&#x6570;&#x5B57;
   2. &#x4E0D;&#x80FD;&#x4EE5;0&#x5F00;&#x5934;
--&gt;
    &lt;input type=&quot;text&quot; id=&quot;t&quot; /&gt;
    &lt;button id=&quot;btn&quot;&gt;click&lt;/button&gt;
    &lt;script&gt;
        var t = document.getElementById(&quot;t&quot;);
        var btn = document.getElementById(&quot;btn&quot;);
        btn.onclick=function () {
            var str=t.value;
            var re=/^([^0]\d{5,11})$/;
            if(re.test(str)){
                console.log(&quot;&#x901A;&#x8FC7;&#x9A8C;&#x8BC1;&quot;);
            }else{
                console.log(&quot;&#x4E0D;&#x901A;&#x8FC7;&#x9A8C;&#x8BC1;&quot;);
            }
        }
    &lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--
   1. 6-12&#x4F4D; &#x7EAF;&#x6570;&#x5B57;
   2. &#x4E0D;&#x80FD;&#x4EE5;0&#x5F00;&#x5934;
--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;t&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn&quot;</span>&gt;</span>click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> t = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;t&quot;</span>);
        <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btn&quot;</span>);
        btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> str=t.value;
            <span class="hljs-keyword">var</span> re=<span class="hljs-regexp">/^([^0]\d{5,11})$/</span>;
            <span class="hljs-keyword">if</span>(re.test(str)){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x901A;&#x8FC7;&#x9A8C;&#x8BC1;&quot;</span>);
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x4E0D;&#x901A;&#x8FC7;&#x9A8C;&#x8BC1;&quot;</span>);
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><strong>8.&#x53BB;&#x6389;&#x524D;&#x540E;&#x9762;&#x7684;&#x7A7A;&#x683C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        var str = &quot;  hel lo &quot;;
        console.log( &quot;|&quot;+ str +&quot;|&quot; );
        console.log( &quot;|&quot;+ str.trim() +&quot;|&quot; );//&#x91C7;&#x7528;trim()&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x3002;
        console.log( &quot;|&quot;+ trimFn(str) +&quot;|&quot; );
        
        function trimFn( s ){
            var re = /^\s+|\s+$/g;
            return s.replace( re,&quot;&quot; );
            //return re.test(s);
        }
        
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;  hel lo &quot;</span>;
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">&quot;|&quot;</span>+ str +<span class="hljs-string">&quot;|&quot;</span> );
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">&quot;|&quot;</span>+ str.trim() +<span class="hljs-string">&quot;|&quot;</span> );<span class="hljs-comment">//&#x91C7;&#x7528;trim()&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x3002;</span>
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">&quot;|&quot;</span>+ trimFn(str) +<span class="hljs-string">&quot;|&quot;</span> );
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trimFn</span>(<span class="hljs-params"> s </span>)</span>{
            <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/^\s+|\s+$/g</span>;
            <span class="hljs-keyword">return</span> s.replace( re,<span class="hljs-string">&quot;&quot;</span> );
            <span class="hljs-comment">//return re.test(s);</span>
        }
        
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础入门篇（三十三）—正则表达式

## 原文链接
[https://segmentfault.com/a/1190000015395455](https://segmentfault.com/a/1190000015395455)


---
title: 前端er怎样操作剪切复制以及禁止复制+破解等
hidden: true
categories: reprint
slug: ed6efc7d
date: 2018-10-25 09:08:15
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015942602?w=1280&amp;h=720" src="https://static.alili.tech/img/remote/1460000015942602?w=1280&amp;h=720" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x78B0;&#x5230;&#x8FD9;&#x4E9B;&#x573A;&#x666F;&#xFF1A;&#x73A9;&#x6398;&#x91D1;&#x3001;&#x77E5;&#x4E4E;&#x7684;&#x65F6;&#x5019;&#x590D;&#x5236;&#x4E00;&#x6BB5;&#x6587;&#x5B57;&#xFF0C;&#x603B;&#x662F;&#x4F1A;&#x5728;&#x5185;&#x5BB9;&#x540E;&#x9762;&#x52A0;&#x4E0A;&#x4E00;&#x4E9B;&#x7248;&#x6743;&#x4FE1;&#x606F;&#xFF0C;&#x4EE5;&#x53CA;&#x50CF;&#x5C0F;&#x8BF4;&#x7F51;&#x7AD9;&#x7B49;&#x90FD;&#x6709;&#x7981;&#x6B62;&#x9009;&#x4E2D;&#xFF0C;&#x7981;&#x6B62;&#x590D;&#x5236;&#x8FD9;&#x79CD;&#x529F;&#x80FD;&#xFF0C;&#x8FD8;&#x6709;&#x70B9;&#x51FB;&#x81EA;&#x52A8;&#x590D;&#x5236;&#x8D26;&#x53F7;&#x7684;&#x529F;&#x80FD;&#x3002;</p><p>&#x6211;&#x4E5F;&#x7ECF;&#x5E38;&#x9047;&#x5230;&#x8FD9;&#x4E9B;&#x573A;&#x666F;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x4F1A;&#x53BB;&#x60F3;&#x8FD9;&#x540E;&#x9762;&#x5230;&#x5E95;&#x662F;&#x600E;&#x4E48;&#x505A;&#xFF0C;&#x5468;&#x672B;&#x8D81;&#x7740;&#x6709;&#x7A7A;&#x53BB;&#x7814;&#x7A76;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x7136;&#x540E;&#x53D1;&#x73B0;&#x8FD9;&#x4E9B;&#x90FD;&#x8DDF;&#x64CD;&#x4F5C;&#x526A;&#x8D34;&#x677F;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x5E76;&#x4E14;&#x90FD;&#x4E0D;&#x96BE;&#xFF0C;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x57FA;&#x672C;&#x90FD;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x505A;&#x4E86;&#xFF0C;&#x6574;&#x7406;&#x5206;&#x4EAB;&#x4E00;&#x6CE2;&#x7ED9;&#x5927;&#x5BB6;&#x3002;</p><blockquote>&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF1A;<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a></blockquote><hr><h2 id="articleHeader1">&#x76EE;&#x5F55;&#xFF1A;</h2><ul><li>API&#x4ECB;&#x7ECD;</li><li>&#x5B9E;&#x73B0;&#x7C7B;&#x77E5;&#x4E4E;/&#x6398;&#x91D1;&#x590D;&#x5236;&#x5927;&#x6BB5;&#x6587;&#x672C;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F;</li><li>&#x5B9E;&#x73B0;&#x7C7B;&#x8D77;&#x70B9;&#x7F51;&#x7684;&#x9632;&#x590D;&#x5236;&#x529F;&#x80FD;</li><li>&#x7834;&#x89E3;&#x9632;&#x590D;&#x5236;</li><li>&#x70B9;&#x51FB;&#x590D;&#x5236;&#x529F;&#x80FD;</li></ul><hr><h3 id="articleHeader2">API&#x4ECB;&#x7ECD;:</h3><h4>&#x590D;&#x5236;&#x3001;&#x526A;&#x5207;&#x3001;&#x7C98;&#x8D34;&#x4E8B;&#x4EF6;&#xFF1A;</h4><ol><li><code>copy</code> &#x53D1;&#x751F;&#x590D;&#x5236;&#x64CD;&#x4F5C;&#x65F6;&#x89E6;&#x53D1;;</li><li><code>cut</code> &#x53D1;&#x751F;&#x526A;&#x5207;&#x64CD;&#x4F5C;&#x65F6;&#x89E6;&#x53D1;;</li><li><code>paste</code> &#x53D1;&#x751F;&#x7C98;&#x8D34;&#x64CD;&#x4F5C;&#x65F6;&#x89E6;&#x53D1;;</li><li>&#x6BCF;&#x4E2A;&#x4E8B;&#x4EF6;&#x90FD;&#x6709;&#x4E00;&#x4E2A;before&#x4E8B;&#x4EF6;&#x5BF9;&#x5E94;&#xFF1A;<code>beforecopy</code>&#x3001;<code>beforecut</code>&#x3001;<code>beforepaste</code>;</li></ol><p>&#x8FD9;&#x51E0;&#x4E2A;before&#x4E00;&#x822C;&#x4E0D;&#x600E;&#x4E48;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x628A;&#x6CE8;&#x610F;&#x529B;&#x653E;&#x5728;&#x53E6;&#x5916;&#x4E09;&#x4E2A;&#x4E8B;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p><strong>&#x89E6;&#x53D1;&#x6761;&#x4EF6;:</strong></p><ol><li>&#x9F20;&#x6807;&#x53F3;&#x952E;&#x83DC;&#x5355;&#x7684;<code>&#x590D;&#x5236;</code>&#x3001;<code>&#x7C98;&#x8D34;</code>&#x3001;<code>&#x526A;&#x5207;</code>;</li><li>&#x4F7F;&#x7528;&#x4E86;&#x76F8;&#x5E94;&#x7684;&#x952E;&#x76D8;&#x7EC4;&#x5408;&#x952E;&#xFF0C;&#x6BD4;&#x5982;:<code>command+c</code>&#x3001;<code>command+v</code>;<p><strong>&#x5C31;&#x7B97;&#x4F60;&#x662F;&#x968F;&#x4FBF;&#x6309;&#x7684;&#xFF0C;&#x4E5F;&#x4F1A;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;</strong>&#x3002;&#x9AD8;&#x7A0B;&#x4E2D;&#x4ECB;&#x7ECD;&#x5728;<code>Chorme</code>&#x3001;<code>Firefox</code>&#x548C;<code>Safari</code>&#x4E2D;&#xFF0C;&#x8FD9;&#x51E0;&#x4E2A;before&#x4E8B;&#x4EF6;&#x53EA;&#x4F1A;&#x5728;&#x771F;&#x5B9E;&#x4F1A;&#x53D1;&#x751F;&#x526A;&#x8D34;&#x677F;&#x4E8B;&#x4EF6;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x89E6;&#x53D1;&#xFF0C;IE&#x4E0A;&#x5219;&#x53EF;&#x4EE5;&#x89E6;&#x53D1;before&#x3002;&#x6211;&#x5B9E;&#x9645;&#x6D4B;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x6700;&#x65B0;&#x7248;<code>chorme</code>&#x4E5F;&#x4F1A;&#x4E71;&#x6309;&#x4E5F;&#x4F1A;&#x89E6;&#x53D1;&#xFF0C;&#x6240;&#x4EE5;&#x9650;&#x5236;&#x5E94;&#x8BE5;&#x662F;&#x5728;&#x65E9;&#x4E00;&#x70B9;&#x7684;&#x7248;&#x672C;&#x4E0A;&#x3002;</p><p>so &#x60F3;&#x8BF4;&#x7684;&#x662F;&#xFF1A;before&#x8FD9;&#x51E0;&#x4E2A;&#x4E8B;&#x4EF6;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x7528;,&#x6709;&#x5173;&#x4E8E;&#x526A;&#x5207;&#x677F;&#x7684;&#x5904;&#x7406;&#x6700;&#x597D;&#x653E;&#x5728;<code>copy</code>&#x3001;<code>cut</code>&#x3001;<code>paste</code>&#x4E0A;&#x9762;&#x3002;</p></li></ol><p><strong>&#x4F7F;&#x7528;&#x59FF;&#x52BF;&#xFF1A;</strong></p><p>&#x4EE5;copy&#x4E3A;&#x4F8B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    document.body.oncopy = e =&gt; {
        // &#x76D1;&#x542C;&#x5168;&#x5C40;&#x590D;&#x5236; &#x505A;&#x70B9;&#x4EC0;&#x4E48;
    }
    // &#x8FD8;&#x6709;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#xFF1A;
    document.addEventListener(&quot;copy&quot;, e =&gt; {
        // &#x76D1;&#x542C;&#x5168;&#x5C40;&#x590D;&#x5236; &#x505A;&#x70B9;&#x4EC0;&#x4E48;
    });
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>    <span class="hljs-built_in">document</span>.body.oncopy = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-comment">// &#x76D1;&#x542C;&#x5168;&#x5C40;&#x590D;&#x5236; &#x505A;&#x70B9;&#x4EC0;&#x4E48;</span>
    }
    <span class="hljs-comment">// &#x8FD8;&#x6709;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#xFF1A;</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&quot;copy&quot;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-comment">// &#x76D1;&#x542C;&#x5168;&#x5C40;&#x590D;&#x5236; &#x505A;&#x70B9;&#x4EC0;&#x4E48;</span>
    });
</code></pre><p>&#x4E0A;&#x9762;&#x662F;&#x5728;<code>document.body</code>&#x4E0A;&#x5168;&#x5C40;&#x76D1;&#x542C;&#x7684;&#xFF0C;&#x7136;&#x800C;&#x5F88;&#x591A;&#x4EBA;&#x4E0D;&#x77E5;&#x9053;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x4E3A;&#x67D0;&#x4E9B;dom&#x5355;&#x72EC;&#x6DFB;&#x52A0;&#x526A;&#x5207;&#x677F;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // html&#x7ED3;&#x6784;
    &lt;div id=&quot;test1&quot;&gt;&lt;/div&gt;
    &lt;div id=&quot;test2&quot;&gt;&lt;/div&gt;
    // &#x5199;&#x6CD5;&#x4E00;&#x6837;&#xFF1A;
    let test1 = document.querySelector(&apos;#test1&apos;);
    test1.oncopy = e =&gt; {
        // &#x76D1;&#x542C;test1&#x53D1;&#x751F;&#x7684;&#x590D;&#x5236;&#x4E8B;&#x4EF6; &#x505A;&#x70B9;&#x4EC0;&#x4E48;
        // test1&#x53D1;&#x751F;&#x7684;&#x590D;&#x5236;&#x4E8B;&#x4EF6;&#x4F1A;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#xFF0C;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x56DE;&#x8C03;
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// html&#x7ED3;&#x6784;</span>
    &lt;div id=<span class="hljs-string">&quot;test1&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div id=<span class="hljs-string">&quot;test2&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    <span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E00;&#x6837;&#xFF1A;</span>
    <span class="hljs-keyword">let</span> test1 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#test1&apos;</span>);
    test1.oncopy = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-comment">// &#x76D1;&#x542C;test1&#x53D1;&#x751F;&#x7684;&#x590D;&#x5236;&#x4E8B;&#x4EF6; &#x505A;&#x70B9;&#x4EC0;&#x4E48;</span>
        <span class="hljs-comment">// test1&#x53D1;&#x751F;&#x7684;&#x590D;&#x5236;&#x4E8B;&#x4EF6;&#x4F1A;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#xFF0C;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x56DE;&#x8C03;</span>
    }
</code></pre><p>&#x5176;&#x4ED6;&#x4E8B;&#x4EF6;&#x4E5F;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8D58;&#x8FF0;&#x4E86;&#x3002;</p><h4>clipboardData&#x5BF9;&#x8C61;:&#x7528;&#x4E8E;&#x8BBF;&#x95EE;&#x4EE5;&#x53CA;&#x4FEE;&#x6539;&#x526A;&#x8D34;&#x677F;&#x4E2D;&#x7684;&#x6570;&#x636E;</h4><p><strong>&#x517C;&#x5BB9;&#xFF1A;</strong></p><p><strong>&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6240;&#x5C5E;&#x7684;&#x5BF9;&#x8C61;&#x4E0D;&#x540C;</strong>&#xFF1A;&#x5728;IE&#x4E2D;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x662F;<code>window</code>&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5728;<code>Chrome</code>&#x3001;<code>Safari</code>&#x548C;<code>Firefox</code>&#x4E2D;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x662F;&#x76F8;&#x5E94;&#x7684;<code>event</code>&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E0B;&#x5982;&#x4E0B;&#x517C;&#x5BB9;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    document.body.oncopy = e =&gt; {
        let clipboardData = (e.clipboardData || window.clipboardData); 
        // &#x83B7;&#x53D6;clipboardData&#x5BF9;&#x8C61; + do something
    }

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-built_in">document</span>.body.oncopy = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> clipboardData = (e.clipboardData || <span class="hljs-built_in">window</span>.clipboardData); 
        <span class="hljs-comment">// &#x83B7;&#x53D6;clipboardData&#x5BF9;&#x8C61; + do something</span>
    }

</code></pre><p><strong>&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#xFF1A;</strong></p><p>&#x5BF9;&#x8C61;&#x6709;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;: <code>getData()</code>&#x3001;<code>setData()</code>&#x3001;<code>clearData()</code></p><ul><li><p><code>getData()</code> &#x8BBF;&#x95EE;&#x526A;&#x5207;&#x677F;&#x4E2D;&#x7684;&#x6570;&#x636E;</p><p>&#x53C2;&#x6570;&#xFF1A; <code>getData()</code>&#x63A5;&#x53D7;&#x4E00;&#x4E2A;<code>&apos;text&apos;</code>&#x53C2;&#x6570;&#xFF0C;&#x5373;&#x8981;&#x53D6;&#x5F97;&#x7684;&#x6570;&#x636E;&#x7684;&#x683C;&#x5F0F;&#x3002;</p><p><strong>&#x5728;&#x590D;&#x5236;&#x3001;&#x526A;&#x5207;&#x3001;&#x7C98;&#x8D34;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF1A;</strong></p><p>&#x5B9E;&#x9645;&#x4E0A;&#x5728;chorme&#x4E0A;&#x6D4B;&#x8BD5;&#x53EA;&#x6709;<code>paste</code>&#x7C98;&#x8D34;&#x7684;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x7528;<code>getData()</code>&#x8BBF;&#x95EE;&#x5230;&#x6570;&#x636E;&#xFF0C;&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong>&#x8981;&#x7C98;&#x8D34;&#x7684;&#x6570;&#x636E;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.body.onpaste = e =&gt; {
     let clipboardData = (e.clipboardData || window.clipboardData); // &#x517C;&#x5BB9;&#x5904;&#x7406;
     console.log(&apos;&#x8981;&#x7C98;&#x8D34;&#x7684;&#x6570;&#x636E;&apos;, clipboardData.getData(&apos;text&apos;));
 }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-built_in">document</span>.body.onpaste = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
     <span class="hljs-keyword">let</span> clipboardData = (e.clipboardData || <span class="hljs-built_in">window</span>.clipboardData); <span class="hljs-comment">// &#x517C;&#x5BB9;&#x5904;&#x7406;</span>
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8981;&#x7C98;&#x8D34;&#x7684;&#x6570;&#x636E;&apos;</span>, clipboardData.getData(<span class="hljs-string">&apos;text&apos;</span>));
 }
</code></pre><p><strong>&#x88AB;&#x590D;&#x5236;/&#x526A;&#x5207;&#x7684;&#x6570;&#x636E;&#xFF1A;</strong></p><p>&#x5728;&#x590D;&#x5236;&#x548C;&#x526A;&#x5207;&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;<code>window.getSelection(0).toString()</code>&#x6765;&#x8BBF;&#x95EE;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.body.oncopy = e =&gt; {
     console.log(&apos;&#x88AB;&#x590D;&#x5236;&#x7684;&#x6570;&#x636E;:&apos;, window.getSelection(0).toString());
 }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-built_in">document</span>.body.oncopy = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x88AB;&#x590D;&#x5236;&#x7684;&#x6570;&#x636E;:&apos;</span>, <span class="hljs-built_in">window</span>.getSelection(<span class="hljs-number">0</span>).toString());
 }
</code></pre></li><li><code>setData():</code> &#x4FEE;&#x6539;&#x526A;&#x5207;&#x677F;&#x4E2D;&#x7684;&#x6570;&#x636E;<p>&#x53C2;&#x6570;&#xFF1A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E5F;&#x662F;<code>&apos;text&apos;</code>&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8981;&#x653E;&#x5728;&#x526A;&#x5207;&#x677F;&#x4E2D;&#x7684;&#x6587;&#x672C;&#x3002;</p><p>&#x5269;&#x4E0B;&#x7684;&#x7559;&#x5728;&#x4E0B;&#x9762;&#x4EFF;&#x77E5;&#x4E4E;/&#x6398;&#x91D1;&#x590D;&#x5236;&#x5927;&#x6BB5;&#x6587;&#x672C;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F;&#x90A3;&#x91CC;&#x518D;&#x8BF4;&#x3002;</p></li><li><code>clearData()</code> :<p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C31;&#x4E0D;&#x592A;&#x77E5;&#x9053;&#x4E86;&#xFF0C;&#x8BD5;&#x4E86;&#x597D;&#x4E45;&#x4E0D;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x7528;(&#x5982;&#x679C;&#x6709;&#x5927;&#x4F6C;&#x77E5;&#x9053;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x6307;&#x70B9;&#x4E00;&#x4E0B;)&#x3002;</p><p>&#x5982;&#x679C;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x7981;&#x6B62;&#x590D;&#x5236;&#xFF0C;&#x6216;&#x8005;&#x7981;&#x6B62;&#x7C98;&#x8D34;&#xFF0C;&#x5728;&#x4E0B;&#x9762;&#x8FD8;&#x6709;&#x53E6;&#x5916;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x7EC6;&#x7C92;&#x5316;&#x64CD;&#x4F5C;&#x3002;</p></li></ul><hr><h2 id="articleHeader3">&#x5E94;&#x7528;:</h2><p>&#x5982;&#x679C;&#x5B66;&#x4E60;&#x4E0D;&#x662F;&#x4E3A;&#x4E86;&#x88C5;X&#xFF0C;&#x90A3;&#x4E48;&#x4E00;&#x5207;&#x5C06;&#x6BEB;&#x65E0;&#x610F;&#x4E49;&#xFF0C;&#x6765;&#x770B;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x53EF;&#x4EE5;&#x5728;&#x54EA;&#x4E9B;&#x573A;&#x666F;&#x4F7F;&#x7528;&#xFF1A;</p><h3 id="articleHeader4">&#x5B9E;&#x73B0;&#x7C7B;&#x77E5;&#x4E4E;/&#x6398;&#x91D1;&#x590D;&#x5236;&#x5927;&#x6BB5;&#x6587;&#x672C;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F;:</h3><p>&#x5B9E;&#x73B0;&#x5F88;&#x7B80;&#x5355;&#xFF1A;&#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x590D;&#x5236;&#x4E4B;&#x540E;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x5728;&#x88AB;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;&#x540E;&#x9762;&#x6DFB;&#x52A0;&#x4FE1;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;clipboardData&#x7684;setData()&#x65B9;&#x6CD5;&#x5C06;&#x4FE1;&#x606F;&#x5199;&#x5165;&#x526A;&#x8D34;&#x677F;&#x3002;</p><p>&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5230;&#x672C;&#x5730;&#x53BB;&#x8BD5;&#x8BD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x6398;&#x91D1;&#x8FD9;&#x91CC;&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x76D1;&#x542C;&#xFF0C;&#x5E94;&#x8BE5;&#x53EA;&#x662F;&#x76D1;&#x542C;&#x6587;&#x7AE0;&#x7684;dom&#x8303;&#x56F4;&#x5185;&#x3002;
    document.body.oncopy = event =&gt; {
        event.preventDefault(); // &#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x7684;&#x590D;&#x5236;&#x4E8B;&#x4EF6; 
        let textFont, copyFont = window.getSelection(0).toString(); // &#x88AB;&#x590D;&#x5236;&#x7684;&#x6587;&#x5B57; &#x7B49;&#x4E0B;&#x63D2;&#x5165;
        // &#x9632;&#x77E5;&#x4E4E;&#x6398;&#x91D1; &#x590D;&#x5236;&#x4E00;&#x4E24;&#x4E2A;&#x5B57;&#x5219;&#x4E0D;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F; &#x8D85;&#x8FC7;&#x4E00;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x6587;&#x5B57; &#x5C31;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F;
        if (copyFont.length &gt; 10) {
            textFont = copyFont + &apos;\n&apos;
                + &apos;&#x4F5C;&#x8005;&#xFF1A;OBKoro1\n&apos;
                + &apos;&#x94FE;&#x63A5;&#xFF1A;https://juejin.im/user/58714f0eb123db4a2eb95372/posts\n&apos;
                + &apos;&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;\n&apos;
                + &apos;&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;&apos;;
        } else {
            textFont = copyFont; // &#x6CA1;&#x8D85;&#x8FC7;&#x5341;&#x4E2A;&#x5B57; &#x5219;&#x91C7;&#x7528;&#x88AB;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;&#x3002;
        }
        if (event.clipboardData) {
            return event.clipboardData.setData(&apos;text&apos;, textFont); // &#x5C06;&#x4FE1;&#x606F;&#x5199;&#x5165;&#x7C98;&#x8D34;&#x677F;
        } else {
            // &#x517C;&#x5BB9;IE
            return window.clipboardData.setData(&quot;text&quot;, textFont);
        }
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// &#x6398;&#x91D1;&#x8FD9;&#x91CC;&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x76D1;&#x542C;&#xFF0C;&#x5E94;&#x8BE5;&#x53EA;&#x662F;&#x76D1;&#x542C;&#x6587;&#x7AE0;&#x7684;dom&#x8303;&#x56F4;&#x5185;&#x3002;</span>
    <span class="hljs-built_in">document</span>.body.oncopy = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
        event.preventDefault(); <span class="hljs-comment">// &#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x7684;&#x590D;&#x5236;&#x4E8B;&#x4EF6; </span>
        <span class="hljs-keyword">let</span> textFont, copyFont = <span class="hljs-built_in">window</span>.getSelection(<span class="hljs-number">0</span>).toString(); <span class="hljs-comment">// &#x88AB;&#x590D;&#x5236;&#x7684;&#x6587;&#x5B57; &#x7B49;&#x4E0B;&#x63D2;&#x5165;</span>
        <span class="hljs-comment">// &#x9632;&#x77E5;&#x4E4E;&#x6398;&#x91D1; &#x590D;&#x5236;&#x4E00;&#x4E24;&#x4E2A;&#x5B57;&#x5219;&#x4E0D;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F; &#x8D85;&#x8FC7;&#x4E00;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x6587;&#x5B57; &#x5C31;&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x4FE1;&#x606F;</span>
        <span class="hljs-keyword">if</span> (copyFont.length &gt; <span class="hljs-number">10</span>) {
            textFont = copyFont + <span class="hljs-string">&apos;\n&apos;</span>
                + <span class="hljs-string">&apos;&#x4F5C;&#x8005;&#xFF1A;OBKoro1\n&apos;</span>
                + <span class="hljs-string">&apos;&#x94FE;&#x63A5;&#xFF1A;https://juejin.im/user/58714f0eb123db4a2eb95372/posts\n&apos;</span>
                + <span class="hljs-string">&apos;&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;\n&apos;</span>
                + <span class="hljs-string">&apos;&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;&apos;</span>;
        } <span class="hljs-keyword">else</span> {
            textFont = copyFont; <span class="hljs-comment">// &#x6CA1;&#x8D85;&#x8FC7;&#x5341;&#x4E2A;&#x5B57; &#x5219;&#x91C7;&#x7528;&#x88AB;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;&#x3002;</span>
        }
        <span class="hljs-keyword">if</span> (event.clipboardData) {
            <span class="hljs-keyword">return</span> event.clipboardData.setData(<span class="hljs-string">&apos;text&apos;</span>, textFont); <span class="hljs-comment">// &#x5C06;&#x4FE1;&#x606F;&#x5199;&#x5165;&#x7C98;&#x8D34;&#x677F;</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// &#x517C;&#x5BB9;IE</span>
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.clipboardData.setData(<span class="hljs-string">&quot;text&quot;</span>, textFont);
        }
    }
</code></pre><p>&#x7136;&#x540E;command+c&#x3001;command+v&#xFF0C;&#x8F93;&#x51FA;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4F60;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;
&#x4F5C;&#x8005;&#xFF1A;OBKoro1
&#x94FE;&#x63A5;&#xFF1A;https://juejin.im/user/58714f0eb123db4a2eb95372/posts
&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;
&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code>&#x4F60;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;
&#x4F5C;&#x8005;&#xFF1A;OBKoro1
&#x94FE;&#x63A5;&#xFF1A;<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/juejin.im/user</span><span class="hljs-regexp">/58714f0eb123db4a2eb95372/posts</span>
&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;
&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;

</code></pre><h3 id="articleHeader5">&#x5B9E;&#x73B0;&#x7C7B;&#x8D77;&#x70B9;&#x7F51;&#x7684;&#x9632;&#x590D;&#x5236;&#x529F;&#x80FD;:</h3><ul><li>&#x7981;&#x6B62;&#x590D;&#x5236;+&#x526A;&#x5207;</li><li>&#x7981;&#x6B62;&#x53F3;&#x952E;&#xFF0C;&#x53F3;&#x952E;&#x67D0;&#x4E9B;&#x9009;&#x9879;:&#x5168;&#x9009;&#xFF0C;&#x590D;&#x5236;&#xFF0C;&#x7C98;&#x8D34;&#x7B49;&#x3002;</li><li>&#x7981;&#x7528;&#x6587;&#x5B57;&#x9009;&#x62E9;&#xFF0C;&#x80FD;&#x9009;&#x62E9;&#x5374;&#x4E0D;&#x80FD;&#x590D;&#x5236;&#xFF0C;&#x4F53;&#x9A8C;&#x5F88;&#x5DEE;&#x3002;</li><li>user-select &#x7528;css&#x7981;&#x6B62;&#x9009;&#x62E9;&#x6587;&#x672C;&#x3002;</li></ul><p>&#x53EF;&#x4EE5;&#x628A;&#x4EE3;&#x7801;&#x62F7;&#x5230;&#x672C;&#x5730;&#x73A9;&#x4E00;&#x73A9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x7981;&#x6B62;&#x53F3;&#x952E;&#x83DC;&#x5355;
    document.body.oncontextmenu = e =&gt; {
        console.log(e, &apos;&#x53F3;&#x952E;&apos;);
        return false;
        // e.preventDefault();
    };
    // &#x7981;&#x6B62;&#x6587;&#x5B57;&#x9009;&#x62E9;&#x3002;
    document.body.onselectstart = e =&gt; {
        console.log(e, &apos;&#x6587;&#x5B57;&#x9009;&#x62E9;&apos;);
        return false;
        // e.preventDefault();
    };
    // &#x7981;&#x6B62;&#x590D;&#x5236;
    document.body.oncopy = e =&gt; {
        console.log(e, &apos;copy&apos;);
        return false; 
        // e.preventDefault();
    }
    // &#x7981;&#x6B62;&#x526A;&#x5207;
    document.body.oncut = e =&gt; {
        console.log(e, &apos;cut&apos;);
        return false;
        // e.preventDefault();
    };
    // &#x7981;&#x6B62;&#x7C98;&#x8D34;
    document.body.onpaste = e =&gt; {
        console.log(e, &apos;paste&apos;);
        return false;
        // e.preventDefault();
    };
    // css &#x7981;&#x6B62;&#x6587;&#x672C;&#x9009;&#x62E9; &#x8FD9;&#x6837;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;js
    body {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// &#x7981;&#x6B62;&#x53F3;&#x952E;&#x83DC;&#x5355;</span>
    <span class="hljs-built_in">document</span>.body.oncontextmenu = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">&apos;&#x53F3;&#x952E;&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// e.preventDefault();</span>
    };
    <span class="hljs-comment">// &#x7981;&#x6B62;&#x6587;&#x5B57;&#x9009;&#x62E9;&#x3002;</span>
    <span class="hljs-built_in">document</span>.body.onselectstart = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">&apos;&#x6587;&#x5B57;&#x9009;&#x62E9;&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// e.preventDefault();</span>
    };
    <span class="hljs-comment">// &#x7981;&#x6B62;&#x590D;&#x5236;</span>
    <span class="hljs-built_in">document</span>.body.oncopy = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">&apos;copy&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
        <span class="hljs-comment">// e.preventDefault();</span>
    }
    <span class="hljs-comment">// &#x7981;&#x6B62;&#x526A;&#x5207;</span>
    <span class="hljs-built_in">document</span>.body.oncut = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">&apos;cut&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// e.preventDefault();</span>
    };
    <span class="hljs-comment">// &#x7981;&#x6B62;&#x7C98;&#x8D34;</span>
    <span class="hljs-built_in">document</span>.body.onpaste = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">&apos;paste&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// e.preventDefault();</span>
    };
    <span class="hljs-comment">// css &#x7981;&#x6B62;&#x6587;&#x672C;&#x9009;&#x62E9; &#x8FD9;&#x6837;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;js</span>
    body {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</code></pre><p>PS&#xFF1A;</p><ul><li>&#x4F7F;&#x7528;<code>e.preventDefault()</code>&#x4E5F;&#x53EF;&#x4EE5;&#x7981;&#x7528;&#xFF0C;&#x4F46;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;<code>return false</code>&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x7528;&#x53BB;&#x8BBF;&#x95EE;<code>e</code>&#x548C;<code>e</code>&#x7684;&#x65B9;&#x6CD5;&#x4E86;&#x3002;</li><li>&#x793A;&#x4F8B;&#x4E2D;<code>document.body</code>&#x5168;&#x5C40;&#x90FD;&#x7981;&#x7528;&#x4E86;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5BF9;dom(&#x67D0;&#x4E9B;&#x533A;&#x57DF;)&#x8FDB;&#x884C;&#x7981;&#x7528;&#x3002;</li></ul><p><strong>&#x7834;&#x89E3;&#x9632;&#x590D;&#x5236;</strong>&#xFF1A;</p><p>&#x4E0A;&#x9762;&#x7684;&#x9632;&#x590D;&#x5236;&#x65B9;&#x6CD5;&#x901A;&#x8FC7;<code>js</code>+<code>css</code>&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x6240;&#x4EE5;<strong>&#x601D;&#x8DEF;&#x5C31;&#x662F;</strong>&#xFF1A;&#x7981;&#x7528;<code>js</code>+&#x53D6;&#x6D88;<code>user-select</code>&#x6837;&#x5F0F;&#x3002;</p><p><code>Chrome</code>&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8BDD;&#xFF1A;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#x63A7;&#x5236;&#x53F0;&#xFF0C;&#x6309;<code>F1</code>&#x8FDB;&#x5165;<code>Setting</code>&#xFF0C;&#x52FE;&#x9009;<code>Disable JavaScript</code>(&#x7981;&#x6B62;js)&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015942603" src="https://static.alili.tech/img/remote/1460000015942603" alt="" title="" style="cursor:pointer"></span></p><p>&#x6B64;&#x65F6;&#x5982;&#x679C;&#x8FD8;&#x4E0D;&#x80FD;&#x590D;&#x5236;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x8981;&#x53BB;&#x627E;<code>user-select</code>&#x6837;&#x5F0F;,&#x53D6;&#x6D88;&#x8FD9;&#x4E2A;&#x6837;&#x5F0F;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015942604" src="https://static.alili.tech/img/remote/1460000015942604" alt="" title="" style="cursor:pointer"></span></p><p>&#x6240;&#x4EE5;&#x90A3;&#x4E9B;&#x76D7;&#x7248;&#x5C0F;&#x8BF4;&#x624B;&#x6253;&#x7684;&#xFF0C;&#x6211;&#x771F;&#x7684;&#x4E0D;&#x592A;&#x80FD;&#x7406;&#x89E3;&#xFF0C;Excuse me&#xFF1F;&#xFF1F;&#xFF1F;</p><h3 id="articleHeader6">&#x70B9;&#x51FB;&#x590D;&#x5236;&#x529F;&#x80FD;&#xFF1A;</h3><p><strong>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;clipboardData&#xFF1A;</strong></p><p>&#x5728;IE&#x4E2D;&#x53EF;&#x4EE5;&#x7528;<code>window.clipboardData.setData(&apos;text&apos;,&apos;&#x5185;&#x5BB9;&apos;)</code>&#x5B9E;&#x73B0;&#x3002;</p><p>&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x8FC7;&#xFF0C;&#x5728;IE&#x4E2D;<code>clipboardData</code>&#x662F;<code>window</code>&#x7684;&#x5C5E;&#x6027;&#x3002;</p><p>&#x800C;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#x5219;&#x662F;&#x76F8;&#x5E94;&#x7684;<code>event</code>&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4E00;&#x79CD;&#x5B89;&#x5168;&#x63AA;&#x65BD;&#xFF0C;&#x9632;&#x6B62;&#x672A;&#x7ECF;&#x6388;&#x6743;&#x7684;&#x8BBF;&#x95EE;,&#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;<code>clipboardData</code>&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x79CD;&#x64CD;&#x4F5C;&#x3002;</p><p><strong>&#x5177;&#x4F53;&#x505A;&#x6CD5;&#xFF1A;</strong></p><ul><li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9690;&#x85CF;&#x7684;<code>input</code>&#x6846;</li><li>&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x8981;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;&#x653E;&#x8FDB;<code>input</code>&#x6846;&#x4E2D;</li><li>&#x9009;&#x62E9;&#x6587;&#x672C;&#x5185;&#x5BB9;<code>input.select()</code><p>&#x8FD9;&#x91CC;&#x53EA;&#x80FD;&#x7528;<code>input</code>&#x6216;&#x8005;<code>textarea</code>&#x624D;&#x80FD;&#x9009;&#x62E9;&#x6587;&#x672C;&#x3002;</p></li><li><p>document.execCommand(&quot;copy&quot;)&#xFF0C;&#x6267;&#x884C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x590D;&#x5236;&#x547D;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function copyText() {
  var text = document.getElementById(&quot;text&quot;).innerText; // &#x83B7;&#x53D6;&#x8981;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x8FDB;&#x6765;
  var input = document.getElementById(&quot;input&quot;); // &#x83B7;&#x53D6;&#x9690;&#x85CF;input&#x7684;dom
  input.value = text; // &#x4FEE;&#x6539;&#x6587;&#x672C;&#x6846;&#x7684;&#x5185;&#x5BB9;
  input.select(); // &#x9009;&#x4E2D;&#x6587;&#x672C;
  document.execCommand(&quot;copy&quot;); // &#x6267;&#x884C;&#x6D4F;&#x89C8;&#x5668;&#x590D;&#x5236;&#x547D;&#x4EE4;
  alert(&quot;&#x590D;&#x5236;&#x6210;&#x529F;&quot;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyText</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> text = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;text&quot;</span>).innerText; <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8981;&#x590D;&#x5236;&#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x8FDB;&#x6765;</span>
  <span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;input&quot;</span>); <span class="hljs-comment">// &#x83B7;&#x53D6;&#x9690;&#x85CF;input&#x7684;dom</span>
  input.value = text; <span class="hljs-comment">// &#x4FEE;&#x6539;&#x6587;&#x672C;&#x6846;&#x7684;&#x5185;&#x5BB9;</span>
  input.select(); <span class="hljs-comment">// &#x9009;&#x4E2D;&#x6587;&#x672C;</span>
  <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">&quot;copy&quot;</span>); <span class="hljs-comment">// &#x6267;&#x884C;&#x6D4F;&#x89C8;&#x5668;&#x590D;&#x5236;&#x547D;&#x4EE4;</span>
  alert(<span class="hljs-string">&quot;&#x590D;&#x5236;&#x6210;&#x529F;&quot;</span>);
}
</code></pre></li></ul><p><a href="https://codepen.io/OBKoro1/pen/mjjEGa" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x590D;&#x5236;&#x5185;&#x5BB9;</a><button class="btn btn-xs btn-default ml10 preview" data-url="OBKoro1/pen/mjjEGa" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#x7684;demo&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x53EF;&#x4EE5;&#x70B9;&#x8FDB;&#x53BB;&#x770B;&#x770B;&#x3002;</p><hr><h2 id="articleHeader7">&#x7ED3;&#x8BED;</h2><p>&#x5DE5;&#x4F5C;&#x4E4B;&#x4F59;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x8FD9;&#x4E9B;&#x4E1C;&#x897F;&#x8FD8;&#x662F;&#x5F88;&#x6709;&#x8DA3;&#x7684;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x6269;&#x5BBD;&#x4F60;&#x7684;&#x77E5;&#x8BC6;&#x9762;&#x3002;</p><p>&#x4E8B;&#x5B9E;&#x4E0A;&#x53EA;&#x8981;&#x76D1;&#x542C;&#x4E86;&#x8FD9;&#x4E9B;&#x4E8B;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x8981;&#x526A;&#x5207;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;:&#x590D;&#x5236;&#x7684;&#x65F6;&#x5019;&#x66F4;&#x6362;&#x6587;&#x672C;&#xFF0C;&#x7C98;&#x8D34;&#x7684;&#x65F6;&#x5019;&#x67E5;&#x627E;&#x6709;&#x6CA1;&#x6709;&#x56FE;&#x7247;(&#x4E0A;&#x4F20;&#x56FE;&#x7247;)&#xFF0C;&#x6216;&#x8005;&#x6587;&#x672C;&#x7684;&#x957F;&#x5EA6;&#x8FDB;&#x884C;&#x526A;&#x5207;&#x7B49;&#x7B49;&#xFF0C;&#x552F;&#x4E00;&#x9650;&#x5236;&#x4F60;&#x7684;</p><h3 id="articleHeader8">&#x5E0C;&#x671B;&#x770B;&#x5B8C;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x70B9;&#x4E2A;&#x559C;&#x6B22;/&#x5173;&#x6CE8;&#xFF0C;&#x60A8;&#x7684;&#x652F;&#x6301;&#x662F;&#x5BF9;&#x6211;&#x6700;&#x5927;&#x7684;&#x9F13;&#x52B1;&#x3002;</h3><p><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;</a></strong>&#xFF0C;&#x5982;&#x9700;&#x8F6C;&#x8F7D;&#xFF0C;&#x8BF7;&#x653E;&#x4E0A;&#x539F;&#x6587;&#x94FE;&#x63A5;&#x5E76;&#x7F72;&#x540D;&#x3002;&#x7801;&#x5B57;&#x4E0D;&#x6613;&#xFF0C;<strong>&#x611F;&#x8C22;</strong>&#x652F;&#x6301;&#xFF01;</p><p>&#x5982;&#x679C;&#x559C;&#x6B22;&#x672C;&#x6587;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x8BA2;&#x9605;&#x53F7;&#xFF0C;&#x6F2B;&#x6F2B;&#x6280;&#x672F;&#x8DEF;&#xFF0C;&#x671F;&#x5F85;&#x672A;&#x6765;&#x5171;&#x540C;&#x5B66;&#x4E60;&#x6210;&#x957F;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014694068?w=344&amp;h=344" src="https://static.alili.tech/img/remote/1460000014694068?w=344&amp;h=344" alt="" title="" style="cursor:pointer"></span></p><p>&#x4EE5;&#x4E0A;2018.8.8</p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><p>js&#x9AD8;&#x7A0B; 14.2.2&#x64CD;&#x4F5C;&#x526A;&#x8D34;&#x677F;</p><p><a href="http://blog.haoji.me/disable-html-copy-and-paste.html?from=xa" rel="nofollow noreferrer" target="_blank">&#x7F51;&#x9875;&#x4E0A;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7981;&#x6B62;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x7834;&#x89E3;</a></p><p><a href="https://www.cnblogs.com/wisewrong/p/7473978.html" rel="nofollow noreferrer" target="_blank">&#x539F;&#x751F; js &#x5B9E;&#x73B0;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x590D;&#x5236;&#x6587;&#x672C;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端er怎样操作剪切复制以及禁止复制+破解等

## 原文链接
[https://segmentfault.com/a/1190000015942599](https://segmentfault.com/a/1190000015942599)


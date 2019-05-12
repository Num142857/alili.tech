---
title: '[浅析]特定场景下取代if-else和switch的方案'
hidden: true
categories: [reprint]
slug: 26c697c9
date: 2018-10-25 09:08:15
---

{{< raw >}}
<blockquote>&#x4E16;&#x754C;&#x90A3;&#x4E48;&#x5927;&#xFF0C;&#x666F;&#x70B9;&#x90A3;&#x4E48;&#x591A;&#x3002;&#x6709;&#x4E9B;&#x65F6;&#x5019;&#xFF0C;&#x6362;&#x4E2A;&#x65B9;&#x5F0F;&#xFF0C;&#x6362;&#x4E2A;&#x89D2;&#x5EA6;&#xFF0C;&#x6362;&#x4E2A;&#x966A;&#x540C;&#xFF0C;&#x90FD;&#x4F1A;&#x6709;&#x4E0D;&#x4E00;&#x6837;&#x611F;&#x89C9;&#x4E0E;&#x6536;&#x83B7;&#x3002;&#x5199;&#x4EE3;&#x7801;&#x4E5F;&#x4EA6;&#x5982;&#x6B64;&#x3002;</blockquote><h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x76F8;&#x4FE1;&#x5F88;&#x591A;&#x4EBA;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x7ECF;&#x5386;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x6BD4;&#x8F83;&#x5FD9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x662F;&#x5148;&#x8003;&#x8651;&#x5B9E;&#x73B0;&#xFF0C;&#x7528;&#x5F53;&#x65F6;&#x4EE5;&#x4E3A;&#x6700;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x5148;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x4E0D;&#x5FD9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x518D;&#x770B;&#x4E0B;&#x4EE5;&#x524D;&#x4EE3;&#x7801;&#xFF0C;&#x60F3;&#x4E0B;&#x6709;&#x4EC0;&#x4E48;&#x66F4;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#xFF0C;&#x6216;&#x8005;&#x4F18;&#x5316;&#x65B9;&#x6848;&#x3002;&#x7B14;&#x8005;&#x4E5F;&#x4E0D;&#x4F8B;&#x5916;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x548C;&#x8BFB;&#x8005;&#x4EEC;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x6700;&#x8FD1;&#x5728;&#x7279;&#x5B9A;&#x573A;&#x5408;&#x4E0B;&#xFF0C;&#x4EE3;&#x66FF;if-else&#xFF0C;switch&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x6709;&#x4EC0;&#x4E48;&#x60F3;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x5185;&#x7559;&#x8A00;&#xFF0C;&#x5927;&#x5BB6;&#x591A;&#x591A;&#x4EA4;&#x6D41;&#x3002;</p><h2 id="articleHeader1">2.look-up&#x8868;&#x4EE3;&#x66FF;if-else</h2><p>&#x6BD4;&#x5982;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x5230;&#x7C7B;&#x4F3C;&#x4E0B;&#x9762;&#x7684;&#x9700;&#x6C42;&#xFF1A;&#x6BD4;&#x5982;&#x67D0;&#x5E73;&#x53F0;&#x7684;&#x4FE1;&#x7528;&#x5206;&#x6570;&#x8BC4;&#x7EA7;&#xFF0C;&#x8D85;&#x8FC7;700-950&#xFF0C;&#x5C31;&#x662F;&#x4FE1;&#x7528;&#x6781;&#x597D;&#xFF0C;650-700&#x4FE1;&#x7528;&#x4F18;&#x79C0;&#xFF0C;600-650&#x4FE1;&#x7528;&#x826F;&#x597D;&#xFF0C;550-600&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&#xFF0C;350-550&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&#x3002;</p><p>&#x5B9E;&#x73B0;&#x5F88;&#x7B80;&#x5355;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showGrace(grace) {
    let _level=&apos;&apos;;
    if(grace&gt;=700){
        _level=&apos;&#x4FE1;&#x7528;&#x6781;&#x597D;&apos;
    }
    else if(grace&gt;=650){
        _level=&apos;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&apos;
    }
    else if(grace&gt;=600){
        _level=&apos;&#x4FE1;&#x7528;&#x826F;&#x597D;&apos;
    }
    else if(grace&gt;=550){
        _level=&apos;&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&apos;
    }
    else{
        _level=&apos;&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&apos;
    }
    return _level;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>function showGrace(grace) {
    let <span class="hljs-variable">_level</span>=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">if</span>(grace&gt;=<span class="hljs-number">700</span>){
        <span class="hljs-variable">_level</span>=<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x6781;&#x597D;&apos;</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(grace&gt;=<span class="hljs-number">650</span>){
        <span class="hljs-variable">_level</span>=<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&apos;</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(grace&gt;=<span class="hljs-number">600</span>){
        <span class="hljs-variable">_level</span>=<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x826F;&#x597D;&apos;</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(grace&gt;=<span class="hljs-number">550</span>){
        <span class="hljs-variable">_level</span>=<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&apos;</span>
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-variable">_level</span>=<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&apos;</span>
    }
    return <span class="hljs-variable">_level</span>;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbdNBf?w=239&amp;h=218" src="https://static.alili.tech/img/bVbdNBf?w=239&amp;h=218" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD0;&#x884C;&#x4E5F;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x95EE;&#x9898;&#x4E5F;&#x662F;&#x6709;</p><p>1.&#x4E07;&#x4E00;&#x4EE5;&#x540E;&#x9700;&#x6C42;&#xFF0C;&#x6539;&#x4E86;&#x6BD4;&#x5982;650-750&#x662F;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&#xFF0C;750-950&#x662F;&#x4FE1;&#x7528;&#x6781;&#x597D;&#x3002;&#x8FD9;&#x6837;&#x5C31;&#x6574;&#x4E2A;&#x65B9;&#x6CD5;&#x8981;&#x6539;&#x3002;</p><p>2.&#x65B9;&#x6CD5;&#x5B58;&#x5728;&#x5404;&#x79CD;&#x795E;&#x4ED9;&#x6570;&#x5B57;&#xFF1A;700&#xFF0C;650&#xFF0C;600&#xFF0C;550&#x3002;&#x65E5;&#x540E;&#x7684;&#x7EF4;&#x62A4;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x95EE;&#x9898;&#x3002;</p><p>3.if-else&#x592A;&#x591A;&#xFF0C;&#x770B;&#x7740;&#x6709;&#x70B9;&#x5F3A;&#x8FEB;&#x75C7;</p><p>&#x6240;&#x4EE5;&#x4E0B;&#x9762;&#x7528;look-up&#x8868;&#xFF0C;&#x628A;&#x914D;&#x6570;&#x636E;&#x7F6E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showGrace(grace) {
    let graceForLevel=[700,650,600,550];
    let levelText=[&apos;&#x4FE1;&#x7528;&#x6781;&#x597D;&apos;,&apos;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&apos;,&apos;&#x4FE1;&#x7528;&#x826F;&#x597D;&apos;,&apos;&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&apos;,&apos;&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&apos;];
    for(let i=0;i&lt;graceForLevel.length;i++){
        if(grace&gt;=graceForLevel[i]){
            return levelText[i];
        }
    }
    //&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x5206;&#x6570;&#x5F88;&#x4F4E;&#xFF0C;&#x8FD4;&#x56DE;&#x6700;&#x540E;&#x4E00;&#x4E2A;
    return levelText[levelText.length-1];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showGrace</span>(<span class="hljs-params">grace</span>) </span>{
    <span class="hljs-keyword">let</span> graceForLevel=[<span class="hljs-number">700</span>,<span class="hljs-number">650</span>,<span class="hljs-number">600</span>,<span class="hljs-number">550</span>];
    <span class="hljs-keyword">let</span> levelText=[<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x6781;&#x597D;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x826F;&#x597D;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&apos;</span>];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;graceForLevel.length;i++){
        <span class="hljs-keyword">if</span>(grace&gt;=graceForLevel[i]){
            <span class="hljs-keyword">return</span> levelText[i];
        }
    }
    <span class="hljs-comment">//&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x5206;&#x6570;&#x5F88;&#x4F4E;&#xFF0C;&#x8FD4;&#x56DE;&#x6700;&#x540E;&#x4E00;&#x4E2A;</span>
    <span class="hljs-keyword">return</span> levelText[levelText.length<span class="hljs-number">-1</span>];
}</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x4F18;&#x70B9;&#x5C31;&#x662F;&#x5982;&#x679C;&#x6709;&#x9700;&#x6C42;&#x4FEE;&#x6539;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4FEE;&#x6539;graceForLevel&#xFF0C;levelText&#x3002;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E0D;&#x9700;&#x8981;&#x6539;&#x3002;</p><blockquote>&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x914D;&#x6570;&#x636E;&#x7F6E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;<p>1.&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x6BD4;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4FEE;&#x6539;&#x6210;&#x672C;&#x66F4;&#x5C0F;&#xFF0C;&#x98CE;&#x9669;&#x66F4;&#x4F4E;</p><p>2.&#x914D;&#x7F6E;&#x6570;&#x636E;&#x6765;&#x6E90;&#x548C;&#x4FEE;&#x6539;&#x90FD;&#x53EF;&#x4EE5;&#x5F88;&#x7075;&#x6D3B;</p><p>3.&#x8350;&#x914D;&#x7F6E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#xFF0C;&#x53EF;&#x4EE5;&#x66F4;&#x5FEB;&#x7684;&#x627E;&#x5230;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x4EE3;&#x7801;</p></blockquote><p>&#x5982;&#x679C;&#x8FD8;&#x60F3;&#x7075;&#x6D3B;&#x4E00;&#x4E9B;&#xFF0C;&#x53EF;&#x4EE5;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x7A0D;&#x5FAE;&#x901A;&#x7528;&#x4E00;&#x70B9;&#x7684;look-up&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showGrace(grace,level,levelForGrace) {
    for(let i=0;i&lt;level.length;i++){
        if(grace&gt;=level[i]){
            return levelForGrace[i];
        }
    }
    //&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x5206;&#x6570;&#x5F88;&#x4F4E;&#xFF0C;&#x8FD4;&#x56DE;&#x6700;&#x540E;&#x4E00;&#x4E2A;
    return levelForGrace[levelForGrace.length-1];
}
let graceForLevel=[700,650,600,550];
let levelText=[&apos;&#x4FE1;&#x7528;&#x6781;&#x597D;&apos;,&apos;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&apos;,&apos;&#x4FE1;&#x7528;&#x826F;&#x597D;&apos;,&apos;&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&apos;,&apos;&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&apos;];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showGrace</span>(<span class="hljs-params">grace,level,levelForGrace</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;level.length;i++){
        <span class="hljs-keyword">if</span>(grace&gt;=level[i]){
            <span class="hljs-keyword">return</span> levelForGrace[i];
        }
    }
    <span class="hljs-comment">//&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x5206;&#x6570;&#x5F88;&#x4F4E;&#xFF0C;&#x8FD4;&#x56DE;&#x6700;&#x540E;&#x4E00;&#x4E2A;</span>
    <span class="hljs-keyword">return</span> levelForGrace[levelForGrace.length<span class="hljs-number">-1</span>];
}
<span class="hljs-keyword">let</span> graceForLevel=[<span class="hljs-number">700</span>,<span class="hljs-number">650</span>,<span class="hljs-number">600</span>,<span class="hljs-number">550</span>];
<span class="hljs-keyword">let</span> levelText=[<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x6781;&#x597D;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x4F18;&#x79C0;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x826F;&#x597D;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x4E2D;&#x7B49;&apos;</span>,<span class="hljs-string">&apos;&#x4FE1;&#x7528;&#x8F83;&#x5DEE;&apos;</span>];</code></pre><p><span class="img-wrap"><img data-src="/img/bVbdNBg?w=351&amp;h=152" src="https://static.alili.tech/img/bVbdNBg?w=351&amp;h=152" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4F7F;&#x7528;&#x63A8;&#x8350;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x5F62;&#x5F0F;&#x5F00;&#x53D1;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x597D;&#x5904;&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x6CA1;&#x4F53;&#x73B0;&#x51FA;&#x6765;&#xFF0C;&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x8BF4;&#x4E0B;&#x3002;&#x6BD4;&#x5982;&#x8F93;&#x5165;&#x4E00;&#x4E2A;&#x666F;&#x70B9;&#xFF0C;&#x7ED9;&#x51FA;&#x666F;&#x70B9;&#x6240;&#x5728;&#x7684;&#x57CE;&#x5E02;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCityForScenic(scenic) {
    let _city=&apos;&apos;
    if(scenic===&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;){
        _city=&apos;&#x5E7F;&#x5DDE;&apos;
    }
    else if(scenic===&apos;&#x897F;&#x6E56;&apos;){
        _city=&apos;&#x676D;&#x5DDE;&apos;
    }
    return _city;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCityForScenic</span>(<span class="hljs-params">scenic</span>) </span>{
    <span class="hljs-keyword">let</span> _city=<span class="hljs-string">&apos;&apos;</span>
    <span class="hljs-keyword">if</span>(scenic===<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;</span>){
        _city=<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(scenic===<span class="hljs-string">&apos;&#x897F;&#x6E56;&apos;</span>){
        _city=<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
    }
    <span class="hljs-keyword">return</span> _city;
}</code></pre><p>&#x8F93;&#x5165;&#x5E7F;&#x5DDE;&#x5854;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x5E7F;&#x5DDE;&#x3002;&#x8F93;&#x5165;&#x897F;&#x6E56;&#x5C31;&#x8FD4;&#x56DE;&#x676D;&#x5DDE;&#x3002;&#x4F46;&#x662F;&#x4E00;&#x4E2A;&#x57CE;&#x5E02;&#x4E0D;&#x6B62;&#x4E00;&#x4E2A;&#x666F;&#x70B9;&#xFF0C;&#x90A3;&#x4E48;&#x6709;&#x4EBA;&#x4E60;&#x60EF;&#x8FD9;&#x6837;&#x5199;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(scenic===&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;||scenic===&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;||scenic===&apos;&#x767D;&#x4E91;&#x5C71;&apos;){
    _city=&apos;&#x5E7F;&#x5DDE;&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ruby"><code><span class="hljs-keyword">if</span>(scenic===<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;</span><span class="hljs-params">||</span>scenic===<span class="hljs-string">&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;</span><span class="hljs-params">||</span>scenic===<span class="hljs-string">&apos;&#x767D;&#x4E91;&#x5C71;&apos;</span>){
    _city=<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>
}</code></pre><p>&#x5982;&#x679C;&#x666F;&#x70B9;&#x5F88;&#x591A;&#xFF0C;&#x6570;&#x636E;&#x5F88;&#x957F;&#xFF0C;&#x770B;&#x7740;&#x96BE;&#x53D7;&#xFF0C;&#x6709;&#x4E9B;&#x4EBA;&#x559C;&#x6B22;&#x8FD9;&#x6837;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let scenicOfHangZhou=[&apos;&#x897F;&#x6E56;&apos;,&apos;&#x6E58;&#x6E56;&apos;,&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;,&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;,&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;]
if(~scenicOfHangZhou.indexOf(scenic)){
    _city=&apos;&#x676D;&#x5DDE;&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>let scenicOfHangZhou=[<span class="hljs-string">&apos;&#x897F;&#x6E56;&apos;</span>,<span class="hljs-string">&apos;&#x6E58;&#x6E56;&apos;</span>,<span class="hljs-string">&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;</span>,<span class="hljs-string">&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;</span>,<span class="hljs-string">&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;</span>]
<span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(~scenicOfHangZhou.indexOf(scenic)</span></span>){
    _city=<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbdNBh?w=268&amp;h=140" src="https://static.alili.tech/img/bVbdNBh?w=268&amp;h=140" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#x6267;&#x884C;&#x6CA1;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x5199;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF0C;<strong>&#x98CE;&#x683C;&#x4E0D;&#x7EDF;&#x4E00;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCityForScenic(scenic) {
    let _city=&apos;&apos;;
    let scenicOfHangZhou=[&apos;&#x897F;&#x6E56;&apos;,&apos;&#x6E58;&#x6E56;&apos;,&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;,&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;,&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;];
    if(scenic===&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;||scenic===&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;||scenic===&apos;&#x767D;&#x4E91;&#x5C71;&apos;){
        _city=&apos;&#x5E7F;&#x5DDE;&apos;
    }
    else if(~scenicOfHangZhou.indexOf(scenic)){
        _city=&apos;&#x676D;&#x5DDE;&apos;
    }
    return _city;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCityForScenic</span>(<span class="hljs-params">scenic</span>) </span>{
    <span class="hljs-keyword">let</span> _city=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">let</span> scenicOfHangZhou=[<span class="hljs-string">&apos;&#x897F;&#x6E56;&apos;</span>,<span class="hljs-string">&apos;&#x6E58;&#x6E56;&apos;</span>,<span class="hljs-string">&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;</span>,<span class="hljs-string">&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;</span>,<span class="hljs-string">&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;</span>];
    <span class="hljs-keyword">if</span>(scenic===<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;</span>||scenic===<span class="hljs-string">&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;</span>||scenic===<span class="hljs-string">&apos;&#x767D;&#x4E91;&#x5C71;&apos;</span>){
        _city=<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(~scenicOfHangZhou.indexOf(scenic)){
        _city=<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
    }
    <span class="hljs-keyword">return</span> _city;
}</code></pre><p>&#x5373;&#x4F7F;&#x7528;switch&#xFF0C;&#x4E5F;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x60C5;&#x51B5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCityForScenic(scenic) {
    let _city=&apos;&apos;;
    let scenicOfHangZhou=[&apos;&#x897F;&#x6E56;&apos;,&apos;&#x6E58;&#x6E56;&apos;,&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;,&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;,&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;];
    switch(true){
        case (scenic===&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;||scenic===&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;||scenic===&apos;&#x767D;&#x4E91;&#x5C71;&apos;):_city=&apos;&#x5E7F;&#x5DDE;&apos;;break;
        case (!!~scenicOfHangZhou.indexOf(scenic)):return &apos;&#x676D;&#x5DDE;&apos;;   
    }
    return     _city;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCityForScenic</span>(<span class="hljs-params">scenic</span>) </span>{
    <span class="hljs-keyword">let</span> _city=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">let</span> scenicOfHangZhou=[<span class="hljs-string">&apos;&#x897F;&#x6E56;&apos;</span>,<span class="hljs-string">&apos;&#x6E58;&#x6E56;&apos;</span>,<span class="hljs-string">&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;</span>,<span class="hljs-string">&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;</span>,<span class="hljs-string">&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;</span>];
    <span class="hljs-keyword">switch</span>(<span class="hljs-literal">true</span>){
        <span class="hljs-keyword">case</span> (scenic===<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;</span>||scenic===<span class="hljs-string">&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;</span>||scenic===<span class="hljs-string">&apos;&#x767D;&#x4E91;&#x5C71;&apos;</span>):_city=<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>;<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> (!!~scenicOfHangZhou.indexOf(scenic)):<span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>;   
    }
    <span class="hljs-keyword">return</span>     _city;
}</code></pre><p>&#x867D;&#x7136;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x51FA;&#x73B0;&#x7684;&#x6982;&#x7387;&#x5F88;&#x5C0F;&#xFF0C;&#x4F46;&#x6BD5;&#x7ADF;&#x4F1A;&#x51FA;&#x73B0;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x4F1A;&#x9020;&#x6210;&#x65E5;&#x540E;&#x7EF4;&#x770B;&#x5F97;&#x773C;&#x82B1;&#x7F2D;&#x4E71;&#x3002;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E86;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#xFF0C;&#x90A3;&#x5C31;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCityForScenic(scenic) {
    let cityConfig={
        &apos;&#x5E7F;&#x5DDE;&#x5854;&apos;:&apos;&#x5E7F;&#x5DDE;&apos;,
        &apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;:&apos;&#x5E7F;&#x5DDE;&apos;,
        &apos;&#x767D;&#x4E91;&#x5C71;&apos;:&apos;&#x5E7F;&#x5DDE;&apos;,
        &apos;&#x897F;&#x6E56;&apos;:&apos;&#x676D;&#x5DDE;&apos;,
        &apos;&#x6E58;&#x6E56;&apos;:&apos;&#x676D;&#x5DDE;&apos;,
        &apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;:&apos;&#x676D;&#x5DDE;&apos;,
        &apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;:&apos;&#x676D;&#x5DDE;&apos;,
        &apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;:&apos;&#x676D;&#x5DDE;&apos;,
    }
    
    return cityConfig[scenic];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCityForScenic</span>(<span class="hljs-params">scenic</span>) </span>{
    <span class="hljs-keyword">let</span> cityConfig={
        <span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;</span>:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;</span>:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x767D;&#x4E91;&#x5C71;&apos;</span>:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x897F;&#x6E56;&apos;</span>:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x6E58;&#x6E56;&apos;</span>:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;</span>:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;</span>:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>,
        <span class="hljs-string">&apos;&#x5357;&#x5B8B;&#x5FA1;&#x8857;&apos;</span>:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>,
    }
    
    <span class="hljs-keyword">return</span> cityConfig[scenic];
}</code></pre><blockquote>&#x6709;&#x4E9B;&#x4EBA;&#x4E0D;&#x4E60;&#x60EF;&#x5BF9;&#x8C61;&#x7684; key &#x540D;&#x662F;&#x4E2D;&#x6587;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x7075;&#x6D3B;&#x5904;&#x7406;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCityForScenic(scenic) {
    let cityConfig=[
        {
            scenic:&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;,
            city:&apos;&#x5E7F;&#x5DDE;&apos;
        },
        {
            scenic:&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;,
            city:&apos;&#x5E7F;&#x5DDE;&apos;
        },
        {
            scenic:&apos;&#x767D;&#x4E91;&#x5C71;&apos;,
            city:&apos;&#x5E7F;&#x5DDE;&apos;
        },
        {
            scenic:&apos;&#x897F;&#x6E56;&apos;,
            city:&apos;&#x676D;&#x5DDE;&apos;
        },
        {
            scenic:&apos;&#x6E58;&#x6E56;&apos;,
            city:&apos;&#x676D;&#x5DDE;&apos;
        },
        {
            scenic:&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;,
            city:&apos;&#x676D;&#x5DDE;&apos;
        },
        {
            scenic:&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;,
            city:&apos;&#x676D;&#x5DDE;&apos;
        }
    ]
    for(let i=0;i&lt;cityConfig.length;i++){
        if(cityConfig[i].scenic===scenic){
            return cityConfig[i].city
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">function</span> getCityForScenic(scenic) {
    let cityConfig=[
        {
            scenic:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&#x5854;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>
        },
        {
            scenic:<span class="hljs-string">&apos;&#x82B1;&#x57CE;&#x5E7F;&#x573A;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>
        },
        {
            scenic:<span class="hljs-string">&apos;&#x767D;&#x4E91;&#x5C71;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>
        },
        {
            scenic:<span class="hljs-string">&apos;&#x897F;&#x6E56;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
        },
        {
            scenic:<span class="hljs-string">&apos;&#x6E58;&#x6E56;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
        },
        {
            scenic:<span class="hljs-string">&apos;&#x4EAC;&#x676D;&#x5927;&#x8FD0;&#x6CB3;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
        },
        {
            scenic:<span class="hljs-string">&apos;&#x7802;&#x4E4B;&#x8239;&#x751F;&#x6D3B;&#x5E7F;&#x573A;&apos;</span>,
            city:<span class="hljs-string">&apos;&#x676D;&#x5DDE;&apos;</span>
        }
    ]
    for(let i=<span class="hljs-number">0</span>;i&lt;cityConfig.length;i++){
        if(cityConfig[i].scenic===scenic){
            return cityConfig[i].city
        }
    }
}</code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;&#x5982;&#x679C;&#x4EE5;&#x540E;&#x8981;&#x52A0;&#x4EC0;&#x4E48;&#x666F;&#x70B9;&#xFF0C;&#x5BF9;&#x5E94;&#x4EC0;&#x4E48;&#x57CE;&#x5E02;&#xFF0C;&#x53EA;&#x80FD;&#x4FEE;&#x6539;&#x4E0A;&#x9762;&#x7684;cityConfig&#xFF0C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E0D;&#x9700;&#x8981;&#x6539;&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x6539;&#x3002;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#x4E0A;&#x9762;&#x5C31;&#x505A;&#x5230;&#x4E86;&#x7EDF;&#x4E00;&#x3002;</p><p><strong>&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x603B;&#x7ED3;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x597D;&#x5904;</strong></p><ol><li>&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x6BD4;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4FEE;&#x6539;&#x6210;&#x672C;&#x66F4;&#x5C0F;&#xFF0C;&#x98CE;&#x9669;&#x66F4;&#x4F4E;</li><li>&#x914D;&#x7F6E;&#x6570;&#x636E;&#x6765;&#x6E90;&#x548C;&#x4FEE;&#x6539;&#x90FD;&#x53EF;&#x4EE5;&#x5F88;&#x7075;&#x6D3B;</li><li>&#x914D;&#x7F6E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#xFF0C;&#x53EF;&#x4EE5;&#x66F4;&#x5FEB;&#x7684;&#x627E;&#x5230;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x4EE3;&#x7801;</li><li>&#x914D;&#x7F6E;&#x6570;&#x636E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x8BA9;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#x7EDF;&#x4E00;</li></ol><blockquote>&#x4F46;&#x662F;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;if-else&#x90FD;&#x5EFA;&#x8BAE;&#x8FD9;&#x6837;&#x6539;&#x9020;&#xFF0C;&#x6709;&#x4E9B;&#x9700;&#x6C42;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;look-up&#x6539;&#x9020;&#x3002;&#x6BD4;&#x5982;if-else&#x4E0D;&#x662F;&#x5F88;&#x591A;&#xFF0C;if&#x5224;&#x65AD;&#x7684;&#x903B;&#x8F91;&#x4E0D;&#x7EDF;&#x4E00;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;if-else&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x3002;&#x4F46;&#x662F;&#x795E;&#x4ED9;&#x6570;&#x5B57;&#xFF0C;&#x8981;&#x6E05;&#x9664;&#x3002;</blockquote><p>&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6839;&#x7EDD;&#x4F20;&#x5165;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x663E;&#x793A;&#x8BC4;&#x8BBA;&#x65F6;&#x95F4;&#x663E;&#x793A;&#x7684;&#x9700;&#x6C42;&#xFF0C;</p><p><strong>&#x53D1;&#x5E03;1&#x5C0F;&#x65F6;&#x4EE5;&#x5185;&#x7684;&#x8BC4;&#x8BBA;&#xFF1A;x&#x5206;&#x949F;&#x524D;</strong></p><p><strong>&#x53D1;&#x5E03;1&#x5C0F;&#x65F6;~24&#x5C0F;&#x65F6;&#x7684;&#x8BC4;&#x8BBA;&#xFF1A;x&#x5C0F;&#x65F6;&#x524D;</strong></p><p><strong>&#x53D1;&#x5E03;24&#x5C0F;&#x65F6;~30&#x5929;&#x7684;&#x8BC4;&#x8BBA;&#xFF1A;x&#x5929;&#x524D;</strong></p><p><strong>&#x53D1;&#x5E03;30&#x5929;&#x4EE5;&#x4E0A;&#x7684;&#x8BC4;&#x8BBA;&#xFF1A;&#x6708;/&#x65E5;</strong></p><p><strong>&#x53BB;&#x5E74;&#x53D1;&#x5E03;&#x5E76;&#x4E14;&#x8D85;&#x8FC7;30&#x5929;&#x7684;&#x8BC4;&#x8BBA;&#xFF1A;&#x5E74;/&#x6708;/&#x65E5;</strong></p><p>&#x5B9E;&#x73B0;&#x4E0D;&#x96BE;&#xFF0C;&#x51E0;&#x4E2A;if-else&#x5C31;&#x884C;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatDate(timeStr){
    //&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;
    let _now=+new Date();
    //&#x6C42;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x5DEE;
    let se=_now-timeStr;
    let _text=&apos;&apos;;
    //&#x53BB;&#x5E74;
    if(new Date(timeStr).getFullYear()!==new Date().getFullYear()&amp;&amp;se&gt;2592000000){
      _text=new Date(timeStr).getFullYear()+&apos;&#x5E74;&apos;+(new Date(timeStr).getMonth()+1)+&apos;&#x6708;&apos;+new Date(timeStr).getDate()+&apos;&#x65E5;&apos;;
    }
    //30&#x5929;&#x4EE5;&#x4E0A;
    else if(se&gt;2592000000){
      _text=(new Date(timeStr).getMonth()+1)+&apos;&#x6708;&apos;+new Date(timeStr).getDate()+&apos;&#x65E5;&apos;;
    }
    //&#x4E00;&#x5929;&#x4EE5;&#x4E0A;
    else if(se&gt;86400000){
      _text=Math.floor(se/86400000)+&apos;&#x5929;&#x524D;&apos;;
    }
    //&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x4E0A;
    else if(se&gt;3600000){
      _text=Math.floor(se/3600000)+&apos;&#x5C0F;&#x65F6;&#x524D;&apos;;
    }
    //&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x5185;
    else{
      //&#x5982;&#x679C;&#x5C0F;&#x4E8E;1&#x5206;&#x949F;&#xFF0C;&#x5C31;&#x663E;&#x793A;1&#x5206;&#x949F;&#x524D;
      if(se&lt;60000){se=60000}
      _text=Math.floor(se/60000)+&apos;&#x5206;&#x949F;&#x524D;&apos;;
    }
    return _text;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">timeStr</span>)</span>{
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;</span>
    <span class="hljs-keyword">let</span> _now=+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-comment">//&#x6C42;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x5DEE;</span>
    <span class="hljs-keyword">let</span> se=_now-timeStr;
    <span class="hljs-keyword">let</span> _text=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-comment">//&#x53BB;&#x5E74;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getFullYear()!==<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear()&amp;&amp;se&gt;<span class="hljs-number">2592000000</span>){
      _text=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getFullYear()+<span class="hljs-string">&apos;&#x5E74;&apos;</span>+(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">&apos;&#x6708;&apos;</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getDate()+<span class="hljs-string">&apos;&#x65E5;&apos;</span>;
    }
    <span class="hljs-comment">//30&#x5929;&#x4EE5;&#x4E0A;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(se&gt;<span class="hljs-number">2592000000</span>){
      _text=(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">&apos;&#x6708;&apos;</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getDate()+<span class="hljs-string">&apos;&#x65E5;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x5929;&#x4EE5;&#x4E0A;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(se&gt;<span class="hljs-number">86400000</span>){
      _text=<span class="hljs-built_in">Math</span>.floor(se/<span class="hljs-number">86400000</span>)+<span class="hljs-string">&apos;&#x5929;&#x524D;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x4E0A;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(se&gt;<span class="hljs-number">3600000</span>){
      _text=<span class="hljs-built_in">Math</span>.floor(se/<span class="hljs-number">3600000</span>)+<span class="hljs-string">&apos;&#x5C0F;&#x65F6;&#x524D;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x5185;</span>
    <span class="hljs-keyword">else</span>{
      <span class="hljs-comment">//&#x5982;&#x679C;&#x5C0F;&#x4E8E;1&#x5206;&#x949F;&#xFF0C;&#x5C31;&#x663E;&#x793A;1&#x5206;&#x949F;&#x524D;</span>
      <span class="hljs-keyword">if</span>(se&lt;<span class="hljs-number">60000</span>){se=<span class="hljs-number">60000</span>}
      _text=<span class="hljs-built_in">Math</span>.floor(se/<span class="hljs-number">60000</span>)+<span class="hljs-string">&apos;&#x5206;&#x949F;&#x524D;&apos;</span>;
    }
    <span class="hljs-keyword">return</span> _text;
}
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbdNBi?w=297&amp;h=256" src="https://static.alili.tech/img/bVbdNBi?w=297&amp;h=256" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x9700;&#x6C42;&#x6709;&#x795E;&#x4ED9;&#x6570;&#x5B57;&#xFF1A;2592000000&#xFF0C;86400000&#xFF0C;3600000&#xFF0C;60000&#x3002;&#x5BF9;&#x4E8E;&#x540E;&#x9762;&#x7EF4;&#x62A4;&#x800C;&#x8A00;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x6570;&#x5B57;&#x662F;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#x3002;</p><p>&#x6240;&#x4EE5;&#x4E0B;&#x9762;&#x5C31;&#x6D88;&#x706D;&#x795E;&#x4ED9;&#x6570;&#x5B57;&#xFF0C;&#x5E38;&#x91CF;&#x5316;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatDate(timeStr){
    //&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;
    let _now=+new Date();
    //&#x6C42;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x5DEE;
    let se=_now-timeStr;
    const DATE_LEVEL={
      month:2592000000,
      day:86400000,
      hour:3600000,
      minter:60000,
    }
    let _text=&apos;&apos;;
    //&#x53BB;&#x5E74;
    if(new Date(timeStr).getFullYear()!==new Date().getFullYear()&amp;&amp;se&gt;DATE_LEVEL.month){
      _text=new Date(timeStr).getFullYear()+&apos;&#x5E74;&apos;+(new Date(timeStr).getMonth()+1)+&apos;&#x6708;&apos;+new Date(timeStr).getDate()+&apos;&#x65E5;&apos;;
    }
    //&#x4E00;&#x4E2A;&#x6708;&#x4EE5;&#x4E0A;
    else if(se&gt;DATE_LEVEL.month){
      _text=(new Date(timeStr).getMonth()+1)+&apos;&#x6708;&apos;+new Date(timeStr).getDate()+&apos;&#x65E5;&apos;;
    }
    //&#x4E00;&#x5929;&#x4EE5;&#x4E0A;
    else if(se&gt;DATE_LEVEL.day){
      _text=Math.floor(se/DATE_LEVEL.day)+&apos;&#x5929;&#x524D;&apos;;
    }
    //&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x4E0A;
    else if(se&gt;DATE_LEVEL.hour){
      _text=Math.floor(se/DATE_LEVEL.hour)+&apos;&#x5C0F;&#x65F6;&#x524D;&apos;;
    }
    //&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x5185;
    else{
      //&#x5982;&#x679C;&#x5C0F;&#x4E8E;1&#x5206;&#x949F;&#xFF0C;&#x5C31;&#x663E;&#x793A;1&#x5206;&#x949F;&#x524D;
      if(se&lt;DATE_LEVEL.minter){se=DATE_LEVEL.minter}
      _text=Math.floor(se/DATE_LEVEL.minter)+&apos;&#x5206;&#x949F;&#x524D;&apos;;
    }
    return _text;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">timeStr</span>)</span>{
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;</span>
    <span class="hljs-keyword">let</span> _now=+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-comment">//&#x6C42;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x5DEE;</span>
    <span class="hljs-keyword">let</span> se=_now-timeStr;
    <span class="hljs-keyword">const</span> DATE_LEVEL={
      <span class="hljs-attr">month</span>:<span class="hljs-number">2592000000</span>,
      <span class="hljs-attr">day</span>:<span class="hljs-number">86400000</span>,
      <span class="hljs-attr">hour</span>:<span class="hljs-number">3600000</span>,
      <span class="hljs-attr">minter</span>:<span class="hljs-number">60000</span>,
    }
    <span class="hljs-keyword">let</span> _text=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-comment">//&#x53BB;&#x5E74;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getFullYear()!==<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear()&amp;&amp;se&gt;DATE_LEVEL.month){
      _text=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getFullYear()+<span class="hljs-string">&apos;&#x5E74;&apos;</span>+(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">&apos;&#x6708;&apos;</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getDate()+<span class="hljs-string">&apos;&#x65E5;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x6708;&#x4EE5;&#x4E0A;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(se&gt;DATE_LEVEL.month){
      _text=(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">&apos;&#x6708;&apos;</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getDate()+<span class="hljs-string">&apos;&#x65E5;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x5929;&#x4EE5;&#x4E0A;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(se&gt;DATE_LEVEL.day){
      _text=<span class="hljs-built_in">Math</span>.floor(se/DATE_LEVEL.day)+<span class="hljs-string">&apos;&#x5929;&#x524D;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x4E0A;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(se&gt;DATE_LEVEL.hour){
      _text=<span class="hljs-built_in">Math</span>.floor(se/DATE_LEVEL.hour)+<span class="hljs-string">&apos;&#x5C0F;&#x65F6;&#x524D;&apos;</span>;
    }
    <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#x4EE5;&#x5185;</span>
    <span class="hljs-keyword">else</span>{
      <span class="hljs-comment">//&#x5982;&#x679C;&#x5C0F;&#x4E8E;1&#x5206;&#x949F;&#xFF0C;&#x5C31;&#x663E;&#x793A;1&#x5206;&#x949F;&#x524D;</span>
      <span class="hljs-keyword">if</span>(se&lt;DATE_LEVEL.minter){se=DATE_LEVEL.minter}
      _text=<span class="hljs-built_in">Math</span>.floor(se/DATE_LEVEL.minter)+<span class="hljs-string">&apos;&#x5206;&#x949F;&#x524D;&apos;</span>;
    }
    <span class="hljs-keyword">return</span> _text;
}</code></pre><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x4E5F;&#x662F;&#x6B63;&#x786E;&#x7684;&#xFF0C;&#x4EE3;&#x7801;&#x591A;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x795E;&#x4ED9;&#x6570;&#x5B57;&#x6CA1;&#x4E86;&#x3002;&#x53EF;&#x8BFB;&#x6027;&#x4E5F;&#x4E0D;&#x5DEE;&#x3002;</p><blockquote>&#x8FD9;&#x91CC;&#x4E5F;&#x987A;&#x4FBF;&#x63D0;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x786C;&#x8981;&#x628A;&#x4E0A;&#x9762;&#x7684;&#x9700;&#x6C42;&#x6539;&#x6210;look-up&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x3002;&#x8FD9;&#x6837;&#x4EE3;&#x7801;&#x7684;&#x4FEE;&#x6539;&#x7684;&#x6269;&#x5C55;&#x6027;&#x4F1A;&#x5F3A;&#x4E00;&#x4E9B;&#xFF0C;&#x6210;&#x672C;&#x4F1A;&#x5C0F;&#x4E00;&#x4E9B;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x8BFB;&#x6027;&#x4E0D;&#x5982;&#x4E0A;&#x9762;&#x3002;&#x53D6;&#x820D;&#x5173;&#x7CFB;&#xFF0C;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#xFF0C;&#x5B9E;&#x9645;&#x5206;&#x6790;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatDate(timeStr){
    //&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;
    let _now=+new Date();
    //&#x6C42;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x5DEE;
    let se=_now-timeStr;
    let _text=&apos;&apos;;
    //&#x6C42;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;
    let lastYearTime=new Date(new Date().getFullYear()+&apos;-01-01 00:00:00&apos;)-1;
    //&#x628A;&#x65F6;&#x95F4;&#x5DEE;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#xFF08;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;&#x4E0E;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x5DEE;&#xFF09;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#xFF0C;&#x5982;&#x679C;&#x65F6;&#x95F4;&#x5DEE;&#xFF08;se&#xFF09;&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x5219;&#x4EE3;&#x8868;&#x4E86;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x662F;&#x4E0A;&#x4E00;&#x5E74;&#x7684;&#x65F6;&#x95F4;&#x3002;
    //DATE_LEVEL.unshift(_now-lastYearTime);
    const DATE_LEVEL={
      month:2592000000,
      day:86400000,
      hour:3600000,
      minter:60000,
    }
    let handleFn=[
        {
            time:DATE_LEVEL.month,
            fn:function(timeStr){
                return (new Date(timeStr).getMonth()+1)+&apos;&#x6708;&apos;+new Date(timeStr).getDate()+&apos;&#x65E5;&apos;;
            }
        },
        {
            time:DATE_LEVEL.day,
            fn:function(timeStr){
                return Math.floor(se/DATE_LEVEL.day)+&apos;&#x5929;&#x524D;&apos;;
            }
        },
        {
            time:DATE_LEVEL.hour,
            fn:function(timeStr){
                return Math.floor(se/DATE_LEVEL.hour)+&apos;&#x5C0F;&#x65F6;&#x524D;&apos;;
            }
        },
        {
            time:DATE_LEVEL.minter,
            fn:function(timeStr){
                return Math.ceil(se/DATE_LEVEL.minter)+&apos;&#x5206;&#x949F;&#x524D;&apos;;
            }
        } 
    ];
    //&#x6C42;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;
    let lastYearTime=new Date(new Date().getFullYear()+&apos;-01-01 00:00:00&apos;)-1;
    //&#x628A;&#x65F6;&#x95F4;&#x5DEE;&#xFF08;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;&#x4E0E;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x5DEE;&#xFF09;&#x548C;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#xFF0C;&#x5982;&#x679C;&#x65F6;&#x95F4;&#x5DEE;&#xFF08;se&#xFF09;&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x5219;&#x4EE3;&#x8868;&#x4E86;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x662F;&#x4E0A;&#x4E00;&#x5E74;&#x7684;&#x65F6;&#x95F4;&#x3002;
    handleFn.unshift({
        time:_now-lastYearTime,
        fn:function(timeStr){
            if(se&gt;DATE_LEVEL.month){
                return new Date(timeStr).getFullYear()+&apos;&#x5E74;&apos;+(new Date(timeStr).getMonth()+1)+&apos;&#x6708;&apos;+new Date(timeStr).getDate()+&apos;&#x65E5;&apos;;
                
            }
        },
    });
    let result=&apos;&apos;;
    for(let i=0;i&lt;handleFn.length;i++){
        if(se&gt;=handleFn[i].time){
            result=handleFn[i].fn(timeStr);
            if(result){
                return result;
            }
        }
    }
    //&#x5982;&#x679C;&#x53D1;&#x5E03;&#x65F6;&#x95F4;&#x5C0F;&#x4E8E;1&#x5206;&#x949F;&#xFF0C;&#x4E4B;&#x9645;&#x8FD4;&#x56DE;1&#x5206;&#x949F;
    return result=&apos;1&#x5206;&#x949F;&#x524D;&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">timeStr</span>)</span>{
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;</span>
    <span class="hljs-keyword">let</span> _now=+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-comment">//&#x6C42;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x5DEE;</span>
    <span class="hljs-keyword">let</span> se=_now-timeStr;
    <span class="hljs-keyword">let</span> _text=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-comment">//&#x6C42;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;</span>
    <span class="hljs-keyword">let</span> lastYearTime=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear()+<span class="hljs-string">&apos;-01-01 00:00:00&apos;</span>)<span class="hljs-number">-1</span>;
    <span class="hljs-comment">//&#x628A;&#x65F6;&#x95F4;&#x5DEE;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#xFF08;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;&#x4E0E;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x5DEE;&#xFF09;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#xFF0C;&#x5982;&#x679C;&#x65F6;&#x95F4;&#x5DEE;&#xFF08;se&#xFF09;&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x5219;&#x4EE3;&#x8868;&#x4E86;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x662F;&#x4E0A;&#x4E00;&#x5E74;&#x7684;&#x65F6;&#x95F4;&#x3002;</span>
    <span class="hljs-comment">//DATE_LEVEL.unshift(_now-lastYearTime);</span>
    <span class="hljs-keyword">const</span> DATE_LEVEL={
      <span class="hljs-attr">month</span>:<span class="hljs-number">2592000000</span>,
      <span class="hljs-attr">day</span>:<span class="hljs-number">86400000</span>,
      <span class="hljs-attr">hour</span>:<span class="hljs-number">3600000</span>,
      <span class="hljs-attr">minter</span>:<span class="hljs-number">60000</span>,
    }
    <span class="hljs-keyword">let</span> handleFn=[
        {
            <span class="hljs-attr">time</span>:DATE_LEVEL.month,
            <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">timeStr</span>)</span>{
                <span class="hljs-keyword">return</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">&apos;&#x6708;&apos;</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getDate()+<span class="hljs-string">&apos;&#x65E5;&apos;</span>;
            }
        },
        {
            <span class="hljs-attr">time</span>:DATE_LEVEL.day,
            <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">timeStr</span>)</span>{
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(se/DATE_LEVEL.day)+<span class="hljs-string">&apos;&#x5929;&#x524D;&apos;</span>;
            }
        },
        {
            <span class="hljs-attr">time</span>:DATE_LEVEL.hour,
            <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">timeStr</span>)</span>{
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(se/DATE_LEVEL.hour)+<span class="hljs-string">&apos;&#x5C0F;&#x65F6;&#x524D;&apos;</span>;
            }
        },
        {
            <span class="hljs-attr">time</span>:DATE_LEVEL.minter,
            <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">timeStr</span>)</span>{
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(se/DATE_LEVEL.minter)+<span class="hljs-string">&apos;&#x5206;&#x949F;&#x524D;&apos;</span>;
            }
        } 
    ];
    <span class="hljs-comment">//&#x6C42;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;</span>
    <span class="hljs-keyword">let</span> lastYearTime=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear()+<span class="hljs-string">&apos;-01-01 00:00:00&apos;</span>)<span class="hljs-number">-1</span>;
    <span class="hljs-comment">//&#x628A;&#x65F6;&#x95F4;&#x5DEE;&#xFF08;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;&#x4E0E;&#x4E0A;&#x4E00;&#x5E74;&#x6700;&#x540E;&#x4E00;&#x79D2;&#x7684;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x5DEE;&#xFF09;&#x548C;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#xFF0C;&#x5982;&#x679C;&#x65F6;&#x95F4;&#x5DEE;&#xFF08;se&#xFF09;&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x5219;&#x4EE3;&#x8868;&#x4E86;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x662F;&#x4E0A;&#x4E00;&#x5E74;&#x7684;&#x65F6;&#x95F4;&#x3002;</span>
    handleFn.unshift({
        <span class="hljs-attr">time</span>:_now-lastYearTime,
        <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">timeStr</span>)</span>{
            <span class="hljs-keyword">if</span>(se&gt;DATE_LEVEL.month){
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getFullYear()+<span class="hljs-string">&apos;&#x5E74;&apos;</span>+(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">&apos;&#x6708;&apos;</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeStr).getDate()+<span class="hljs-string">&apos;&#x65E5;&apos;</span>;
                
            }
        },
    });
    <span class="hljs-keyword">let</span> result=<span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;handleFn.length;i++){
        <span class="hljs-keyword">if</span>(se&gt;=handleFn[i].time){
            result=handleFn[i].fn(timeStr);
            <span class="hljs-keyword">if</span>(result){
                <span class="hljs-keyword">return</span> result;
            }
        }
    }
    <span class="hljs-comment">//&#x5982;&#x679C;&#x53D1;&#x5E03;&#x65F6;&#x95F4;&#x5C0F;&#x4E8E;1&#x5206;&#x949F;&#xFF0C;&#x4E4B;&#x9645;&#x8FD4;&#x56DE;1&#x5206;&#x949F;</span>
    <span class="hljs-keyword">return</span> result=<span class="hljs-string">&apos;1&#x5206;&#x949F;&#x524D;&apos;</span>
}</code></pre><h2 id="articleHeader2">3.&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x4EE3;&#x66FF;switch</h2><p>&#x6BD4;&#x5982;&#x6709;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF1A;&#x4F20;&#x5165;cash&#xFF0C;check&#xFF0C;draft&#xFF0C;zfb&#xFF0C;wx_pay&#xFF0C;&#x5BF9;&#x5E94;&#x8F93;&#x51FA;&#xFF1A;&#x73B0;&#x91D1;&#xFF0C;&#x652F;&#x7968;&#xFF0C;&#x6C47;&#x7968;&#xFF0C;&#x652F;&#x4ED8;&#x5B9D;&#xFF0C;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#x3002;</p><p>&#x9700;&#x6C42;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x4E00;&#x4E2A;switch&#x5C31;&#x641E;&#x5B9A;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPayChanne(tag){
    switch(tag){
        case &apos;cash&apos;:return &apos;&#x73B0;&#x91D1;&apos;;
        case &apos;check&apos;:return &apos;&#x652F;&#x7968;&apos;;
        case &apos;draft&apos;:return &apos;&#x6C47;&#x7968;&apos;;
        case &apos;zfb&apos;:return &apos;&#x652F;&#x4ED8;&#x5B9D;&apos;;
        case &apos;wx_pay&apos;:return &apos;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&apos;;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPayChanne</span><span class="hljs-params">(tag)</span></span>{
    <span class="hljs-keyword">switch</span>(tag){
        <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;cash&apos;</span>:<span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x73B0;&#x91D1;&apos;</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;check&apos;</span>:<span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x652F;&#x7968;&apos;</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;draft&apos;</span>:<span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x6C47;&#x7968;&apos;</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;zfb&apos;</span>:<span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x652F;&#x4ED8;&#x5B9D;&apos;</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;wx_pay&apos;</span>:<span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&apos;</span>;
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbdNBj?w=225&amp;h=120" src="https://static.alili.tech/img/bVbdNBj?w=225&amp;h=120" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x7684;&#x786C;&#x4F24;&#x8FD8;&#x662F;&#x548C;&#x4E0A;&#x9762;&#x4E00;&#x6837;&#xFF0C;&#x4E07;&#x4E00;&#x4E0B;&#x6B21;&#x53C8;&#x8981;&#x591A;&#x52A0;&#x4E00;&#x4E2A;&#x5982;&#xFF1A;bank_trans&#x5BF9;&#x5E94;&#x8F93;&#x51FA;&#x94F6;&#x884C;&#x8F6C;&#x8D26;&#x5462;&#xFF0C;&#x4EE3;&#x7801;&#x53C8;&#x8981;&#x6539;&#x3002;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPayChanne(tag){
    let payChanneForChinese = {
        &apos;cash&apos;: &apos;&#x73B0;&#x91D1;&apos;,
        &apos;check&apos;: &apos;&#x652F;&#x7968;&apos;,
        &apos;draft&apos;: &apos;&#x6C47;&#x7968;&apos;,
        &apos;zfb&apos;: &apos;&#x652F;&#x4ED8;&#x5B9D;&apos;,
        &apos;wx_pay&apos;: &apos;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&apos;,
    };
    return payChanneForChinese[tag];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPayChanne</span>(<span class="hljs-params">tag</span>)</span>{
    <span class="hljs-keyword">let</span> payChanneForChinese = {
        <span class="hljs-string">&apos;cash&apos;</span>: <span class="hljs-string">&apos;&#x73B0;&#x91D1;&apos;</span>,
        <span class="hljs-string">&apos;check&apos;</span>: <span class="hljs-string">&apos;&#x652F;&#x7968;&apos;</span>,
        <span class="hljs-string">&apos;draft&apos;</span>: <span class="hljs-string">&apos;&#x6C47;&#x7968;&apos;</span>,
        <span class="hljs-string">&apos;zfb&apos;</span>: <span class="hljs-string">&apos;&#x652F;&#x4ED8;&#x5B9D;&apos;</span>,
        <span class="hljs-string">&apos;wx_pay&apos;</span>: <span class="hljs-string">&apos;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&apos;</span>,
    };
    <span class="hljs-keyword">return</span> payChanneForChinese[tag];
}</code></pre><p>&#x540C;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let payChanneForChinese = {
    &apos;cash&apos;: &apos;&#x73B0;&#x91D1;&apos;,
    &apos;check&apos;: &apos;&#x652F;&#x7968;&apos;,
    &apos;draft&apos;: &apos;&#x6C47;&#x7968;&apos;,
    &apos;zfb&apos;: &apos;&#x652F;&#x4ED8;&#x5B9D;&apos;,
    &apos;wx_pay&apos;: &apos;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&apos;,
};
function getPayChanne(tag,chineseConfig){
    return chineseConfig[tag];
}
getPayChanne(&apos;cash&apos;,payChanneForChinese);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> payChanneForChinese = {
    <span class="hljs-string">&apos;cash&apos;</span>: <span class="hljs-string">&apos;&#x73B0;&#x91D1;&apos;</span>,
    <span class="hljs-string">&apos;check&apos;</span>: <span class="hljs-string">&apos;&#x652F;&#x7968;&apos;</span>,
    <span class="hljs-string">&apos;draft&apos;</span>: <span class="hljs-string">&apos;&#x6C47;&#x7968;&apos;</span>,
    <span class="hljs-string">&apos;zfb&apos;</span>: <span class="hljs-string">&apos;&#x652F;&#x4ED8;&#x5B9D;&apos;</span>,
    <span class="hljs-string">&apos;wx_pay&apos;</span>: <span class="hljs-string">&apos;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&apos;</span>,
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPayChanne</span>(<span class="hljs-params">tag,chineseConfig</span>)</span>{
    <span class="hljs-keyword">return</span> chineseConfig[tag];
}
getPayChanne(<span class="hljs-string">&apos;cash&apos;</span>,payChanneForChinese);</code></pre><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x4EE3;&#x66FF; switch &#x597D;&#x5904;&#x5C31;&#x5728;&#x4E8E;</p><ol><li>&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x4E0D;&#x9700;&#x8981; switch &#x9010;&#x4E2A; case &#x904D;&#x5386;&#x5224;&#x65AD;&#x3002;</li><li>&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#xFF0C;&#x7F16;&#x5199;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x53EF;&#x80FD;&#x66F4;&#x7075;&#x6D3B;</li><li>&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x914D;&#x7F6E;&#x6570;&#x636E;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x3002;&#x597D;&#x5904;&#x53C2;&#x8003;&#x4E0A;&#x4E00;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x3002;</li></ol><h2 id="articleHeader3">4.&#x5C0F;&#x7ED3;</h2><p>&#x6700;&#x8FD1;&#x5728;&#x7279;&#x5B9A;&#x573A;&#x5408;&#x4E0B;&#xFF0C;&#x4EE3;&#x66FF;if-else&#x548C;switch&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x591A;&#x4E86;&#x3002;if-else&#xFF0C;switch&#x672C;&#x8EAB;&#x6CA1;&#x9519;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x60F3;&#x7740;&#x600E;&#x4E48;&#x4F18;&#x5316;&#x4EE3;&#x7801;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x5177;&#x6709;&#x53EF;&#x8BFB;&#x6027;&#xFF0C;&#x6269;&#x5C55;&#x6027;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x4F18;&#x5316;&#x7684;&#x65B9;&#x6848;&#x6216;&#x8005;&#x5BF9;&#x65B9;&#x9762;&#x7684;&#x65B9;&#x6848;&#x6709;&#x66F4;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#x3002;&#x6B22;&#x8FCE;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x7559;&#x8A00;&#x3002;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------</p><p>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV55El?w=258&amp;h=258" src="https://static.alili.tech/img/bV55El?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[浅析]特定场景下取代if-else和switch的方案

## 原文链接
[https://segmentfault.com/a/1190000015643488](https://segmentfault.com/a/1190000015643488)


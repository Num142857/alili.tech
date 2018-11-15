---
title: css自定义属性和聚光灯效果
reprint: true
categories: reprint
abbrlink: 9f6a27f7
date: 2018-11-10 02:30:10
---

{{% raw %}}
<h2 id="articleHeader0">&#x51FA;&#x573A;&#x66F2;</h2><blockquote>&#x795E;&#x79D8;&#x5DE8;&#x661F;&#x6765;&#x4E86;&#x5417;&#xFF1F;&#x5FEB;&#xFF0C;&#x6253;&#x8FFD;&#x5149;&#xFF0C;&#x5FEB;&#xFF0C;&#x5FEB;&#x7ED9;&#x5979;&#x955C;&#x5934;&#x3002; ------&#x300A;&#x795E;&#x79D8;&#x5DE8;&#x661F;&#x300B;</blockquote><p>&#x795E;&#x79D8;&#x5DE8;&#x661F;&#x662F;&#x8C01;&#xFF1F;&#x5B83;&#x5C31;&#x662F;<code>CSS Variables</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016353069?w=838&amp;h=900" src="https://static.alili.tech/img/remote/1460000016353069?w=838&amp;h=900" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x7B80;&#x4ECB;</h2><p>CSS Variables&#xFF0C;&#x4E00;&#x4E2A;&#x5E76;&#x4E0D;&#x662F;&#x90A3;&#x4E48;&#x65B0;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4F46;&#x5BF9;css&#x6765;&#x8BF4;&#x7EDD;&#x5BF9;&#x662F;&#x4E00;&#x573A;&#x9769;&#x547D;&#x3002;</p><p>&#x4E4B;&#x524D;&#x4F7F;&#x7528;&#x53D8;&#x91CF;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x501F;&#x52A9;sass&#x3001;less&#x7B49;&#x9884;&#x5904;&#x7406;&#x5DE5;&#x5177;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;css&#x6765;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3002;</p><h2 id="articleHeader2">&#x517C;&#x5BB9;&#x6027;</h2><p>&#x8001;&#x89C4;&#x77E9;&#xFF0C;&#x5148;&#x6765;&#x770B;&#x4E0B;&#x517C;&#x5BB9;&#x6027;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016353070?w=1240&amp;h=539" src="https://static.alili.tech/img/remote/1460000016353070?w=1240&amp;h=539" alt="&#x517C;&#x5BB9;&#x6027;" title="&#x517C;&#x5BB9;&#x6027;" style="cursor:pointer"></span></p><p>&#x517C;&#x5BB9;&#x6027;&#x4E00;&#x7247;&#x7EFF;&#xFF0C;&#x7EA2;&#x7684;&#x90A3;&#x4E0D;&#x662F;&#x8FD8;&#x6709;&#x4E24;&#x4E2A;&#x5417;&#xFF1F;&#x505A;&#x5927;&#x4E8B;&#x600E;&#x4E48;&#x80FD;&#x62D8;&#x5C0F;&#x8282;&#x5462;&#xFF0C;&#x8BA9;&#x5B83;&#x5495;&#x565C;&#xFF08;gun&#xFF09;&#x4E00;&#x8FB9;&#x53BB;&#x5427;&#x3002;</p><h2 id="articleHeader3">&#x8BED;&#x6CD5;</h2><p>&#x8BED;&#x6CD5;&#x6709;&#x70B9;&#x96BE;&#x770B;&#x4F46;&#x5F88;&#x7B80;&#x5355;&#xFF0C;<code>--*</code>&#x6765;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x540D;&#xFF0C;<code>var(--*)</code>&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x4E5F;&#x8BB8;&#x4F60;&#x8981;&#x95EE;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4F7F;&#x7528;<code>--</code>&#x4E0D;&#x7528;<code>$</code>&#x4E00;&#x7C7B;&#x7684;&#x5462;&#xFF0C;&#x5509;&#xFF0C;&#x90A3;&#x4E0D;&#x662F;sass&#x3001;less&#x4E24;&#x4E2A;&#x8D27;&#x7528;&#x4E86;&#x5417;</p><p><strong>&#x58F0;&#x660E;&#x548C;&#x4F7F;&#x7528;&#x5FC5;&#x987B;&#x653E;&#x5728;{}&#x4EE3;&#x7801;&#x5757;&#x91CC;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    --bg-color: lightblue;
    background-color: var(--bg-color);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">--bg-color</span>: lightblue;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--bg-color);
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016353071?w=1240&amp;h=710" src="https://static.alili.tech/img/remote/1460000016353071?w=1240&amp;h=710" alt="&#x6548;&#x679C;" title="&#x6548;&#x679C;" style="cursor:pointer;display:inline"></span></p><p>&#x4EE3;&#x7801;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x770B;&#x6548;&#x679C;&#xFF0C;&#x5C31;&#x4E0D;&#x8D58;&#x8FF0;&#x4E86;&#x3002;</p><h2 id="articleHeader4">&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E0E;&#x53D8;&#x91CF;&#x8986;&#x76D6;</h2><p>&#x5728;<code>:root</code>&#x4EE3;&#x7801;&#x5757;&#x91CC;&#x9762;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x4E14;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x4F1A;&#x8986;&#x76D6;&#x5168;&#x5C40;&#x53D8;&#x91CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root{
    --bg-color: red;
}
body{
    --bg-color: lightblue;
    background-color: var(--bg-color);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-pseudo">:root</span>{
    <span class="hljs-attribute">--bg-color</span>: red;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">--bg-color</span>: lightblue;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--bg-color);
}</code></pre><p>&#x6700;&#x540E;&#x751F;&#x6548;&#x7684;&#x662F;<code>--bg-color: lightblue</code>&#xFF0C;<code>bg-color</code>&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4E5F;&#x5C31;&#x53D8;&#x6210;&#x4E86;<code>lightblue</code></p><h2 id="articleHeader5">&#x53D8;&#x91CF;&#x7684;&#x7F3A;&#x7701;&#x503C;</h2><p>&#x5B8C;&#x6574;&#x7684;&#x53D8;&#x91CF;&#x4F7F;&#x7528;&#x8BED;&#x6CD5; <code>var( [, ]? )</code>&#xFF0C;&#x5F53;&#x53D8;&#x91CF;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x4F7F;&#x7528;&#x540E;&#x9762;&#x7684;&#x503C;&#x3002;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
--1: red;
color:var(--2, blue);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">body</span>{
<span class="hljs-comment">--1: red;</span>
color:var(<span class="hljs-comment">--2, blue);</span>
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4F1A;&#x5728;<code>body</code>&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x91CC;&#x9762;&#x67E5;&#x627E;<code>--2</code>&#x53D8;&#x91CF;&#xFF0C;&#x6CA1;&#x6709;&#x7684;&#x8BDD;&#x5C31;&#x4F1A;&#x67E5;&#x627E;&#x5168;&#x5C40;&#xFF0C;&#x90FD;&#x6CA1;&#x6709;&#x7684;&#x8BDD;&#x5C31;&#x4F1A;&#x4F7F;&#x7528;&#x540E;&#x9762;&#x7684;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x540E;&#x751F;&#x6548;&#x7684;&#x989C;&#x8272;&#x5C31;&#x662F;blue</p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x7684;&#x53D8;&#x91CF;&#x540D;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x4E86;&#x6570;&#x5B57;&#x1F602;&#xFF0C;css&#x53D8;&#x91CF;&#x5F88;&#x53FC;&#x7684;&#xFF0C;&#x4E0D;&#x53EA;&#x662F;&#x6570;&#x5B57;&#xFF0C;&#x6C49;&#x5B57;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x3002;</p><h2 id="articleHeader6">&#x53C2;&#x4E0E;&#x8BA1;&#x7B97;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root{
    --bg-color: lightblue;
    --&#x6587;&#x5B57;&#x989C;&#x8272;: white;
    --fong-size: 30;
}
body{
    background-color: var(--bg-color);
}
div{
    color: var(--&#x6587;&#x5B57;&#x989C;&#x8272;);
    font-size: var(--fong-size)px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>:root{
    --bg-<span class="hljs-attribute">color</span>: lightblue;
    --&#x6587;&#x5B57;&#x989C;&#x8272;: white;
    --fong-size: <span class="hljs-number">30</span>;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">background-color</span>: var(--bg-color);
}
<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">color</span>: var(--&#x6587;&#x5B57;&#x989C;&#x8272;);
    <span class="hljs-attribute">font-size</span>: var(--fong-size)px;
}
</code></pre><p>&#x6B64;&#x65F6;div&#x91CC;&#x9762;&#x7684;&#x6587;&#x5B57;&#x7684;&#x5927;&#x5C0F;&#x662F;&#x591A;&#x5C11;&#x5462;&#xFF1F;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x662F;&#x54B1;&#x4EEC;&#x60F3;&#x8C61;&#x7684;30px&#x5462;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x53D8;&#x91CF;&#x8F6C;&#x6362;&#x7684;&#x65F6;&#x5019;&#x672B;&#x5C3E;&#x4F1A;&#x5E26;&#x4E0A;&#x7A7A;&#x683C;&#xFF0C;<code>var(--fong-size)px</code>&#x4F1A;&#x8F6C;&#x6362;&#x6210;<code>30 px</code></p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8001;&#x8001;&#x5B9E;&#x5B9E;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7684;&#x65F6;&#x5019;&#x5E26;&#x4E0A;&#x5355;&#x4F4D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--fong-size: 30px;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code style="word-break:break-word;white-space:initial"><span class="hljs-comment">--fong-size: 30px;</span></code></pre><p>&#x6216;&#x8005;&#x4F7F;&#x7528;<code>calc()</code>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" font-size: calc(var(--fong-size) * 1px);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code style="word-break:break-word;white-space:initial"> <span class="hljs-built_in">font</span>-<span class="hljs-attribute">size</span>: calc(<span class="hljs-built_in">var</span>(--fong-<span class="hljs-built_in">size</span>) * <span class="hljs-number">1</span>px);</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016353072?w=1240&amp;h=589" src="https://static.alili.tech/img/remote/1460000016353072?w=1240&amp;h=589" alt="&#x6B63;&#x786E;&#x663E;&#x793A;" title="&#x6B63;&#x786E;&#x663E;&#x793A;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader7">js&#x83B7;&#x53D6;&#x4E0E;&#x8D4B;&#x503C;</h2><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;js&#x6765;&#x83B7;&#x53D6;&#x548C;&#x8D4B;&#x503C;css&#x53D8;&#x91CF;&#xFF0C;&#x4F60;&#x770B;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x8001;&#x65B9;&#x4FBF;&#x4E86;&#xFF0C;&#x8001;&#x94C1;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root{
     --bg-color: lightblue;
}

 // &#x83B7;&#x53D6;
getComputedStyle(document.documentElement).getPropertyValue(&apos;--bg-color&apos;)  // lightblue
        
 // &#x8D4B;&#x503C;
document.documentElement.style.setProperty(&apos;--bg-color&apos;, &apos;yellowgreen&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>:root{
     --bg-<span class="hljs-attribute">color</span>: lightblue;
}

 <span class="hljs-comment">// &#x83B7;&#x53D6;</span>
<span class="hljs-function"><span class="hljs-title">getComputedStyle</span><span class="hljs-params">(document.documentElement)</span></span>.getPropertyValue(<span class="hljs-string">&apos;--bg-color&apos;</span>)  <span class="hljs-comment">// lightblue</span>
        
 <span class="hljs-comment">// &#x8D4B;&#x503C;</span>
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.setProperty</span>(<span class="hljs-string">&apos;--bg-color&apos;</span>, <span class="hljs-string">&apos;yellowgreen&apos;</span>)</code></pre><h2 id="articleHeader8">&#x7B80;&#x5355;&#x5E94;&#x7528;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;css&#x53D8;&#x91CF;&#x7684;&#x58F0;&#x660E;&#x4F7F;&#x7528;&#x4EE5;&#x53CA;&#x4F7F;&#x7528;js&#x6765;&#x8FDB;&#x884C;&#x83B7;&#x53D6;&#x548C;&#x8D4B;&#x503C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x4E2A;&#x805A;&#x5149;&#x706F;&#x7684;&#x6548;&#x679C;&#xFF08;&#x6211;&#x81EA;&#x5DF1;&#x778E;&#x8D77;&#x7684;&#xFF0C;&#x6211;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x5E94;&#x8BE5;&#x53EB;&#x4EC0;&#x4E48;&#xFF09;&#xFF0C;&#x8BFA;&#xFF0C;&#x5B83;&#x957F;&#x8FD9;&#x6837;&#x3002;GIF&#x56FE;&#x6709;&#x70B9;&#x5361;&#x987F;&#x1F620;&#xFF0C;&#x62C5;&#x5F85;&#x7740;&#x770B;&#x5427;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016353073" src="https://static.alili.tech/img/remote/1460000016353073" alt="&#x805A;&#x5149;&#x706F;" title="&#x805A;&#x5149;&#x706F;" style="cursor:pointer"></span></p><p>&#x5199;&#x4EE3;&#x7801;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x6765;&#x68B3;&#x7406;&#x4E0B;&#x601D;&#x8DEF;&#xFF0C;&#x600E;&#x4E48;&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#xFF0C;&#x4E3B;&#x8981;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x6B65;<br>1&#x3001;&#x58F0;&#x660E;&#x5168;&#x5C40;css&#x53D8;&#x91CF;<br>2&#x3001;&#x8BBE;&#x7F6E;body&#x4E3A;&#x7EAF;&#x9ED1;&#x80CC;&#x666F;&#xFF0C;&#x6DFB;&#x52A0;div&#x5E76;&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x56FE;<br>3&#x3001;&#x5C06;div&#x7684;&#x80CC;&#x666F;&#x56FE;&#x4F7F;&#x7528;<code>clip-path</code>&#x8FDB;&#x884C;&#x88C1;&#x526A;&#xFF0C;&#x4F7F;&#x7528;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x5706;&#x5FC3;&#x4F4D;&#x7F6E;<br>4&#x3001;&#x6DFB;&#x52A0;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#xFF0C;&#x52A8;&#x6001;&#x66F4;&#x6539;css&#x53D8;&#x91CF;&#x4E5F;&#x5C31;&#x662F;&#x5706;&#x5FC3;&#x4F4D;&#x7F6E;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x5F00;&#x59CB;&#x5199;&#x4EE3;&#x7801;</p><p>&#x5E03;&#x5C40;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;div,&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x8BF4;&#x4E0B;css&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root{
    --x: 40;
    --y: 40;
}
*{
    padding: 0;
    margin: 0;
}
body{
    width: 100vw;
    height: 100vh;
    background: #000;
}
div{
    width: 100%;
    height: 100%;
    background: url(&apos;../images/bg.png&apos;) 0 0 no-repeat;
    clip-path: circle(100px at calc(var(--x) * 1px ) calc(var(--y) * 1px));
    background-size: cover;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-pseudo">:root</span>{
    <span class="hljs-attribute">--x</span>: <span class="hljs-number">40</span>;
    <span class="hljs-attribute">--y</span>: <span class="hljs-number">40</span>;
}
*{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
}
<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;../images/bg.png&apos;</span>) <span class="hljs-number">0</span> <span class="hljs-number">0</span> no-repeat;
    <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">circle</span>(100px at calc(var(--x) * <span class="hljs-number">1px</span> ) <span class="hljs-built_in">calc</span>(var(--y) * <span class="hljs-number">1px</span>));
    <span class="hljs-attribute">background-size</span>: cover;
}</code></pre><p>&#x4F7F;&#x7528;<code>*</code>&#x901A;&#x914D;&#x7B26;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x5E72;&#x6389;&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x6837;&#x5F0F;&#xFF0C;body&#x8BBE;&#x7F6E;100%&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;<code>vw</code>&#x548C;<code>vh</code>&#x5355;&#x4F4D;&#xFF0C;&#x8868;&#x793A;&#x5C06;&#x89C6;&#x53E3;&#x7684;&#x7B49;&#x5206;&#x6210;100&#x4EFD;&#xFF0C;<code>100vw</code>&#x5C31;&#x662F;100&#x4EFD;&#x5BBD;&#x5C31;&#x662F;100%&#x7684;&#x5BBD;&#xFF0C;<code>vh</code>&#x540C;&#x7406;&#x3002;</p><p>&#x91CD;&#x70B9;&#x6765;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;css&#x58F0;&#x660E;&#x4E86;<code>--x</code>&#x3001;<code>--y</code>&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x7136;&#x540E;&#x5728;<code>div</code>&#x6837;&#x5F0F;&#x91CC;&#x88C1;&#x526A;&#x65F6;&#x4F7F;&#x7528;<code>clip-path: circle(100px at calc(var(--x) * 1px ) calc(var(--y) * 1px))</code>,&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>clip-path</code>&#x88C1;&#x526A;&#x4E86;&#x4E00;&#x4E2A;&#x5706;&#xFF0C;&#x5B83;&#x7684;&#x8BED;&#x6CD5;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clip-path: circle(&#x534A;&#x5F84; at &#x5706;&#x5FC3;X&#x8F74;&#x5750;&#x6807; &#x5706;&#x5FC3;Y&#x8F74;&#x5750;&#x6807; )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code style="word-break:break-word;white-space:initial">clip-<span class="hljs-built_in">path</span>: <span class="hljs-built_in">circle</span>(&#x534A;&#x5F84; <span class="hljs-built_in">at</span> &#x5706;&#x5FC3;X&#x8F74;&#x5750;&#x6807; &#x5706;&#x5FC3;Y&#x8F74;&#x5750;&#x6807; )</code></pre><p>&#x66F4;&#x591A;&#x5173;&#x4E8E;<code>clip-path</code>&#x7684;&#x77E5;&#x8BC6;&#x8BF7;&#x6233;&#x1F447;<a href="https://www.w3cplus.com/css3/using-making-sense-of-clip-path.html" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></p><p>&#x6B64;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x663E;&#x793A;&#x4E86;&#x4E00;&#x4E2A;&#x8FD9;&#x6837;&#x7684;&#x5706;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016353074?w=632&amp;h=439" src="https://static.alili.tech/img/remote/1460000016353074?w=632&amp;h=439" alt="image.png" title="image.png" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x6211;&#x4EEC;&#x6DFB;&#x52A0;&#x9F20;&#x6807;&#x8DDF;&#x968F;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x66F4;&#x6539;<code>--x</code>&#x548C; <code>--y</code>&#x7684;&#x503C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(&apos;mouseover&apos;, function(e){
     document.documentElement.style.setProperty(&apos;--x&apos;, e.clientX)
     document.documentElement.style.setProperty(&apos;--y&apos;, e.clientY)
 })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>document.addEventListener(<span class="hljs-string">&apos;mouseover&apos;</span>, function(e){
     document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.setProperty</span>(<span class="hljs-string">&apos;--x&apos;</span>, e.clientX)
     document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.setProperty</span>(<span class="hljs-string">&apos;--y&apos;</span>, e.clientY)
 })</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;css&#x53D8;&#x91CF;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6548;&#x679C;&#xFF0C;css&#x53D8;&#x91CF;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x8BF7;&#x5C3D;&#x60C5;&#x7684;&#x53D1;&#x6325;&#x5427;&#x3002;</p><p>&#x8BE6;&#x7EC6;&#x4EE3;&#x7801;&#xFF0C;&#x8BF7;&#x79FB;&#x9A7E;<a href="https://github.com/Ortonzhang/simple-code/tree/master/css/css-var" rel="nofollow noreferrer" target="_blank">github</a></p><h2 id="articleHeader9">&#x5C0F;&#x7ED3;</h2><p>1&#x3001;&#x53EF;&#x4EE5;&#x5D4C;&#x5957;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root{
    --green: green;
    --bgcolor: var(--green);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-pseudo">:root</span>{
    <span class="hljs-attribute">--green</span>: green;
    <span class="hljs-attribute">--bgcolor</span>: <span class="hljs-built_in">var</span>(--green);
}</code></pre><p>2&#x3001;&#x53D8;&#x91CF;&#x7684;&#x4E0D;&#x5408;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  --color: 10px;
  background-color: yellow;
  background-color: var(--color, green);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">--color</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">background-color</span>: yellow;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--color, green);
}</code></pre><p>&#x6B64;&#x65F6;div&#x7684;&#x80CC;&#x666F;&#x8272;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A rgba(0,0,0,0)  B 10px  C yellow  D green" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">A rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)  B <span class="hljs-number">10</span>px  C yellow  D green</code></pre><p>&#x7B54;&#x6848;&#x662F; A</p><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x662F;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x662F;&#x5408;&#x6CD5;&#x7684;&#xFF0C;&#x80CC;&#x666F;&#x8272;&#x663E;&#x7136;&#x4E0D;&#x80FD;&#x662F;<code>10px</code>&#xFF0C;&#x6240;&#x4EE5;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4F1A;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x8FD9;&#x4E2A;&#x9ED8;&#x8BA4;&#x503C;&#x5E76;&#x4E0D;&#x662F;&#x4F7F;&#x7528;&#x53D8;&#x91CF;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x81EA;&#x5DF1;&#x7684;&#x9ED8;&#x8BA4;&#x503C;<br><code>background-color: var(--color, green)</code>&#x5C31;&#x4F1A;&#x53D8;&#x6210;<code>background-color: rgba(0,0,0,0)</code></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css自定义属性和聚光灯效果

## 原文链接
[https://segmentfault.com/a/1190000016353066](https://segmentfault.com/a/1190000016353066)


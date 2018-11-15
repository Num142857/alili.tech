---
title: jquery选择器 （nth-of-type（） nth-child（）区别内容更新）
reprint: true
categories: reprint
abbrlink: 274cd12f
date: 2018-11-10 02:30:10
---

{{% raw %}}
<p>&#x5B98;&#x7F51;&#x4F20;&#x9001;&#x95E8;&#xFF1A; <a href="http://jquery.com/" rel="nofollow noreferrer" target="_blank">http://jquery.com/</a><br>&#x4E2D;&#x6587;API&#x6587;&#x6863;&#xFF1A; <a href="http://jquery.cuishifeng.cn/" rel="nofollow noreferrer" target="_blank">http://jquery.cuishifeng.cn/</a><br>jQuery&#x662F;&#x4E00;&#x4E2A;&#x5FEB;&#x901F;&#xFF0C;&#x5C0F;&#x5DE7;&#xFF0C;&#x529F;&#x80FD;&#x4E30;&#x5BCC;&#x7684;JavaScript&#x5E93;&#x3002;&#x5B83;&#x901A;&#x8FC7;&#x6613;&#x4E8E;&#x4F7F;&#x7528;&#x7684;API&#x5728;&#x5927;&#x91CF;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8FD0;&#x884C;&#xFF0C;&#x4F7F;&#x5F97;HTML&#x6587;&#x6863;&#x904D;&#x5386;&#x548C;&#x64CD;&#x4F5C;&#xFF0C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#xFF0C;&#x52A8;&#x753B;&#x548C;Ajax&#x66F4;&#x52A0;&#x7B80;&#x5355;&#x3002;&#x901A;&#x8FC7;&#x591A;&#x529F;&#x80FD;&#x6027;&#x548C;&#x53EF;&#x6269;&#x5C55;&#x6027;&#x7684;&#x7ED3;&#x5408;&#xFF0C;jQuery&#x6539;&#x53D8;&#x4E86;&#x6570;&#x767E;&#x4E07;&#x4EBA;&#x7F16;&#x5199;JavaScript&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><h1 id="articleHeader0">&#x5C0F;&#x4F8B;&#x5B50;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
1.&#x5F15;&#x5165;&#x6587;&#x4EF6;&lt;script src=&quot;jquery-3.3.1.js&quot;&gt;&lt;/script&gt;
&lt;div id=&quot;div1&quot;&gt;div1&lt;/div&gt;
$(&apos;#div1&apos;).css(&apos;background&apos;,&apos;red&apos;); //&#x8868;&#x793A;&#x7ED9;&#x524D;&#x9762;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x52A0;css&#x6837;&#x5F0F;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>    
<span class="hljs-number">1.</span>&#x5F15;&#x5165;&#x6587;&#x4EF6;&lt;<span class="hljs-keyword">script</span> src=<span class="hljs-string">&quot;jquery-3.3.1.js&quot;</span>&gt;&lt;/<span class="hljs-keyword">script</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;div1&quot;</span>&gt;div1&lt;/<span class="hljs-keyword">div</span>&gt;
$(&apos;<span class="hljs-comment">#div1&apos;).css(&apos;background&apos;,&apos;red&apos;); //&#x8868;&#x793A;&#x7ED9;&#x524D;&#x9762;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x52A0;css&#x6837;&#x5F0F;</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUoj?w=1321&amp;h=20" src="https://static.alili.tech/img/bVbgUoj?w=1321&amp;h=20" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
2.&lt;div class=&quot;aa&quot;&gt;div2&lt;/div&gt;
&lt;div class=&quot;aa&quot;&gt;div3&lt;/div&gt; 
$(&apos;.aa&apos;).css(&apos;background&apos;,&apos;green&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cal"><code>
<span class="hljs-number">2</span>.&lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">&quot;aa&quot;</span>&gt;div2&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">&quot;aa&quot;</span>&gt;div3&lt;/<span class="hljs-keyword">div</span>&gt; 
$(<span class="hljs-string">&apos;.aa&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUpu?w=1323&amp;h=41" src="https://static.alili.tech/img/bVbgUpu?w=1323&amp;h=41" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x5BF9;&#x8C61;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;div1&quot;&gt;div1&lt;/div&gt;
&#x539F;&#x751F;js&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#xFF1A;var oDiv1 = document.getElementById(&apos;div1&apos;);//&#x539F;&#x751F;&#x5BF9;&#x8C61;
jquery&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#xFF1A; var $div1 = $(&apos;#div1&apos;);//jq&#x5BF9;&#x8C61;
&#x5C06;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x5F97;&#x5230;&#x7684;&#x5BF9;&#x8C61;&#x6253;&#x5370;&#x51FA;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x533A;&#x522B;
console.log(oDiv1);
console.log($div1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>&lt;div id=<span class="hljs-string">&quot;div1&quot;</span>&gt;div1&lt;/div&gt;
&#x539F;&#x751F;js&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#xFF1A;<span class="hljs-built_in">var</span> oDiv1 = document.getElementById(<span class="hljs-string">&apos;div1&apos;</span>);<span class="hljs-comment">//&#x539F;&#x751F;&#x5BF9;&#x8C61;</span>
jquery&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#xFF1A; <span class="hljs-built_in">var</span> $div1 = $(<span class="hljs-string">&apos;#div1&apos;</span>);<span class="hljs-comment">//jq&#x5BF9;&#x8C61;</span>
&#x5C06;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x5F97;&#x5230;&#x7684;&#x5BF9;&#x8C61;&#x6253;&#x5370;&#x51FA;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x533A;&#x522B;
console.<span class="hljs-keyword">log</span>(oDiv1);
console.<span class="hljs-keyword">log</span>($div1);</code></pre><p>&#x8FD9;&#x91CC;jq&#x5BF9;&#x8C61;&#x662F;&#x6709;&#x957F;&#x5EA6;&#x7684;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x6570;&#x7EC4;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbgUrJ?w=392&amp;h=99" src="https://static.alili.tech/img/bVbgUrJ?w=392&amp;h=99" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5982;&#x679C;&#x60F3;&#x6253;&#x5370;&#x8F93;&#x51FA;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5BB9;&#x3002;
console.log(oDiv1.innerHTML);//obj.innerHTML&#x662F;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;
console.log($div1.get(0).innerHTML);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>&#x5982;&#x679C;&#x60F3;&#x6253;&#x5370;&#x8F93;&#x51FA;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5BB9;&#x3002;
console.<span class="hljs-built_in">log</span>(oDiv1.innerHTML);<span class="hljs-comment">//obj.innerHTML&#x662F;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-variable">$div1</span>.<span class="hljs-built_in">get</span>(0).innerHTML);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUtb?w=186&amp;h=83" src="https://static.alili.tech/img/bVbgUtb?w=186&amp;h=83" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x548C;jq&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x80FD;&#x6DF7;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x76F8;&#x4E92;&#x8F6C;&#x5316;&#x3002;
//&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x6210;jq&#x5BF9;&#x8C61;  $(obj)
//obj.css()&#x662F;jq&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5; &#x539F;&#x751F;&#x5BF9;&#x8C61;&#x4F7F;&#x7528;jq&#x5BF9;&#x8C61;&#x7684;&#x3002;css()&#x65B9;&#x6CD5;
$(oDiv1).css(&apos;background&apos;,&apos;red&apos;); 

//jq&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x6210;&#x539F;&#x751F;&#x5BF9;&#x8C61;   $obj.get(0)
//jq&#x5BF9;&#x8C61;&#x5C31;&#x60F3;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;.innerHTML&#x65B9;&#x6CD5;
console.log($div1.get(0).innerHTML);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code>
&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x548C;jq&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x80FD;&#x6DF7;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x76F8;&#x4E92;&#x8F6C;&#x5316;&#x3002;
<span class="hljs-comment">//&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x6210;jq&#x5BF9;&#x8C61;  $(obj)</span>
<span class="hljs-comment">//obj.css()&#x662F;jq&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5; &#x539F;&#x751F;&#x5BF9;&#x8C61;&#x4F7F;&#x7528;jq&#x5BF9;&#x8C61;&#x7684;&#x3002;css()&#x65B9;&#x6CD5;</span>
$(oDiv1).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>); 

<span class="hljs-comment">//jq&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x6210;&#x539F;&#x751F;&#x5BF9;&#x8C61;   $obj.get(0)</span>
<span class="hljs-comment">//jq&#x5BF9;&#x8C61;&#x5C31;&#x60F3;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;.innerHTML&#x65B9;&#x6CD5;</span>
console.<span class="hljs-keyword">log</span>($div1.get(<span class="hljs-number">0</span>).innerHTML);

</code></pre><h2 id="articleHeader2">&#x6587;&#x6863;&#x5C31;&#x7EEA;&#x51FD;&#x6570;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5728;&#x5199;jquery&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x5EFA;&#x8BAE;&#x5C06;&#x4EE3;&#x7801;&#x5199;&#x5728;&#x6587;&#x6863;&#x5C31;&#x7EEA;&#x51FD;&#x6570;&#x91CC;&#x9762;
//&#x5F53;dom&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D; &#x5E76;&#x4E14;&#x9875;&#x9762;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x5448;&#x73B0;&#x65F6; &#x4F1A;ready&#x4E8B;&#x4EF6;
//&#x56E0;&#x4E3A;ready()&#x6700;&#x540E;&#x6267;&#x884C; &#x6240;&#x4EE5;&#x5C06;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x4E8B;&#x4EF6;&#x653E;&#x5728;ready()&#x4E2D;
$(document).ready(function(){
    var a = 5;
});

//&#x662F;&#x4E0A;&#x9762;&#x7684;&#x7B80;&#x5199;&#x5F62;&#x5F0F;
$(function(){

});

$&#x548C;jquery&#x662F;&#x4E00;&#x4E2A;&#x610F;&#x601D;&#xFF0C;&#x6E90;&#x7801;&#x4E2D;&#x6709;&#x89E3;&#x91CA;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x5728;&#x5199;jquery&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x5EFA;&#x8BAE;&#x5C06;&#x4EE3;&#x7801;&#x5199;&#x5728;&#x6587;&#x6863;&#x5C31;&#x7EEA;&#x51FD;&#x6570;&#x91CC;&#x9762;
<span class="hljs-comment">//&#x5F53;dom&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D; &#x5E76;&#x4E14;&#x9875;&#x9762;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x5448;&#x73B0;&#x65F6; &#x4F1A;ready&#x4E8B;&#x4EF6;</span>
<span class="hljs-comment">//&#x56E0;&#x4E3A;ready()&#x6700;&#x540E;&#x6267;&#x884C; &#x6240;&#x4EE5;&#x5C06;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x4E8B;&#x4EF6;&#x653E;&#x5728;ready()&#x4E2D;</span>
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
});

<span class="hljs-comment">//&#x662F;&#x4E0A;&#x9762;&#x7684;&#x7B80;&#x5199;&#x5F62;&#x5F0F;</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

});

$&#x548C;jquery&#x662F;&#x4E00;&#x4E2A;&#x610F;&#x601D;&#xFF0C;&#x6E90;&#x7801;&#x4E2D;&#x6709;&#x89E3;&#x91CA;&#x3002;
</code></pre><p>![&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x4E2D;...]</p><h2 id="articleHeader3">&#x51E0;&#x79CD;&#x9009;&#x62E9;&#x5668;</h2><p>1 &#x7A7A;&#x683C;&#x8868;&#x793A;&#x540E;&#x4EE3;<br>2 &gt;&#x8868;&#x793A;&#x4EB2;&#x5B50;&#x4EE3;<br>3 +&#x8868;&#x793A;&#x7D27;&#x6328;&#x7740;&#x7684;&#x5144;&#x5F1F;<br>4 ~&#x8868;&#x793A;&#x6240;&#x6709;&#x5144;&#x5F1F;<br>5 &#xFF1A;eq()</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;ul id=&quot;ul1&quot;&gt;
     &lt;li&gt;001&lt;/li&gt;
     &lt;li&gt;002&lt;/li&gt;
     &lt;li&gt;003&lt;/li&gt;
     &lt;li&gt;004&lt;/li&gt;
     &lt;li&gt;005&lt;/li&gt;    
 &lt;/ul&gt;
$(&apos;#ul1 li&apos;).css(&apos;background&apos;,&apos;red&apos;);
5&#x9879;&#x5168;&#x662F;&#x7EA2;&#x8272;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;ul1&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>001<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>002<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>003<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>004<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>005<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>    
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
$(&apos;#ul1 li&apos;).css(&apos;background&apos;,&apos;red&apos;);
5&#x9879;&#x5168;&#x662F;&#x7EA2;&#x8272;
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUNh?w=1332&amp;h=129" src="https://static.alili.tech/img/bVbgUNh?w=1332&amp;h=129" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 //&#x9009;&#x4E2D;&#x7B2C;3&#x4E2A;&#x5143;&#x7D20; 003   &#x6B63;&#x503C;&#x4ECE;&#x524D;&#x5F80;&#x540E;&#x627E;
 $(&apos;#ul1 li:eq(2)&apos;).css(&apos;background&apos;,&apos;red&apos;);
 &#x7B2C;3&#x9879;&#x662F;&#x7EA2;&#x8272;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
 <span class="hljs-comment">//&#x9009;&#x4E2D;&#x7B2C;3&#x4E2A;&#x5143;&#x7D20; 003   &#x6B63;&#x503C;&#x4ECE;&#x524D;&#x5F80;&#x540E;&#x627E;</span>
 $(<span class="hljs-string">&apos;#ul1 li:eq(2)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
 &#x7B2C;<span class="hljs-number">3</span>&#x9879;&#x662F;&#x7EA2;&#x8272;</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUOa?w=1325&amp;h=125" src="https://static.alili.tech/img/bVbgUOa?w=1325&amp;h=125" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x9009;&#x4E2D;&#x7B2C;6&#x884C;&#xFF0C;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x4E5F;&#x6CA1;&#x6709;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;
$(&apos;#ul1 li:eq(5)&apos;).css(&apos;background&apos;,&apos;red&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x9009;&#x4E2D;&#x7B2C;6&#x884C;&#xFF0C;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x4E5F;&#x6CA1;&#x6709;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;</span>
$(<span class="hljs-string">&apos;#ul1 li:eq(5)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUO1?w=257&amp;h=123" src="https://static.alili.tech/img/bVbgUO1?w=257&amp;h=123" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //&#x5012;&#x6570;&#x7B2C;&#x4E00;&#x4E2A;   &#x8D1F;&#x503C;&#x4ECE;&#x540E;&#x5F80;&#x524D;&#x627E;
 $(&apos;#ul1 li:eq(-1)&apos;).css(&apos;background&apos;,&apos;red&apos;);
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-comment">//&#x5012;&#x6570;&#x7B2C;&#x4E00;&#x4E2A;   &#x8D1F;&#x503C;&#x4ECE;&#x540E;&#x5F80;&#x524D;&#x627E;</span>
 $(<span class="hljs-string">&apos;#ul1 li:eq(-1)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
 </code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUPq?w=1305&amp;h=117" src="https://static.alili.tech/img/bVbgUPq?w=1305&amp;h=117" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4EE5;&#x4E0B;&#x540C;&#x7406;
$(&apos;#ul1 li:even&apos;).css(&apos;background&apos;,&apos;red&apos;); //&#x5076;&#x6570;
$(&apos;#ul1 li:odd&apos;).css(&apos;background&apos;,&apos;green&apos;);//&#x5947;&#x6570;

$(&apos;#ul1 li:first&apos;).css(&apos;background&apos;,&apos;red&apos;);
$(&apos;#ul1 li:last&apos;).css(&apos;background&apos;,&apos;green&apos;);

$(&apos;#ul1 li:gt(1)&apos;).css(&apos;background&apos;,&apos;red&apos;); //&#x5927;&#x4E8E;1&#x7684;&#x4F1A;&#x88AB;&#x9009;&#x4E2D;
$(&apos;#ul1 li:lt(1)&apos;).css(&apos;background&apos;,&apos;green&apos;);

 &lt;ul id=&quot;ul1&quot;&gt;
        &lt;li&gt;001&lt;/li&gt;
        &lt;li&gt;002&lt;/li&gt;
        &lt;li class=&quot;aaa&quot;&gt;003&lt;/li&gt;
        &lt;li&gt;004&lt;/li&gt;
        &lt;li&gt;005&lt;/li&gt;
 &lt;/ul&gt;
 $(&apos;#ul1 li:not(.aaa)&apos;).css(&apos;background&apos;,&apos;green&apos;);
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x4EE5;&#x4E0B;&#x540C;&#x7406;
$(<span class="hljs-string">&apos;#ul1 li:even&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>); <span class="hljs-comment">//&#x5076;&#x6570;</span>
$(<span class="hljs-string">&apos;#ul1 li:odd&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);<span class="hljs-comment">//&#x5947;&#x6570;</span>

$(<span class="hljs-string">&apos;#ul1 li:first&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
$(<span class="hljs-string">&apos;#ul1 li:last&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);

$(<span class="hljs-string">&apos;#ul1 li:gt(1)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>); <span class="hljs-comment">//&#x5927;&#x4E8E;1&#x7684;&#x4F1A;&#x88AB;&#x9009;&#x4E2D;</span>
$(<span class="hljs-string">&apos;#ul1 li:lt(1)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);

 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;ul1&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>001<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>002<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;aaa&quot;</span>&gt;</span>003<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>004<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>005<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
 $(<span class="hljs-string">&apos;#ul1 li:not(.aaa)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);
 </code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUQU?w=1311&amp;h=121" src="https://static.alili.tech/img/bVbgUQU?w=1311&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;#ul1 li:contains(3)&apos;).css(&apos;background&apos;,&apos;red&apos;);//&#x5305;&#x542B;3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">&apos;#ul1 li:contains(3)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);<span class="hljs-regexp">//</span>&#x5305;&#x542B;<span class="hljs-number">3</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUQ6?w=1308&amp;h=116" src="https://static.alili.tech/img/bVbgUQ6?w=1308&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader4">&#xFF1A;target()&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;</h2><p>&#x5BFC;&#x822A;&#x680F;&#x4E2D;&#x6709;3&#x9879; &#x70B9;&#x51FB;&#x5176;&#x4E2D;&#x67D0;&#x4E00;&#x9879;&#xFF0C;&#x663E;&#x793A;&#x5BF9;&#x5E94;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    #nav{
        margin-bottom:800px;
       
    }
    #nav li{
        width: 100px;
        height: 30px;
        background: #cccccc;
        list-style:none;
        float:left;
        margin-right:5px;
        cursor:pointer;
        text-align:center;
        line-height:30px;
    }
    div{
        height: 400px;
    }
    #menu1{
         background: #ff0000;
     }
    #menu2{
        background: #00ff00;
    }
    #menu3{
        background: #0000ff;
    }
  /* #menu3:target{      /*target&#x662F;css&#x7684;&#x6807;&#x7B7E; &#x7528;css&#x6267;&#x884C;&#x4F1A;&#x66F4;&#x5FEB;*/
        background: #ffff00;;
    } */
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">&lt;style&gt;</span>
    <span class="hljs-comment">#nav{</span>
<span class="hljs-attr">        margin-bottom:</span><span class="hljs-number">800</span><span class="hljs-string">px;</span>
       
    <span class="hljs-string">}</span>
    <span class="hljs-comment">#nav li{</span>
<span class="hljs-attr">        width:</span> <span class="hljs-number">100</span><span class="hljs-string">px;</span>
<span class="hljs-attr">        height:</span> <span class="hljs-number">30</span><span class="hljs-string">px;</span>
<span class="hljs-attr">        background:</span> <span class="hljs-comment">#cccccc;</span>
<span class="hljs-attr">        list-style:</span><span class="hljs-string">none;</span>
<span class="hljs-attr">        float:</span><span class="hljs-string">left;</span>
<span class="hljs-attr">        margin-right:</span><span class="hljs-number">5</span><span class="hljs-string">px;</span>
<span class="hljs-attr">        cursor:</span><span class="hljs-string">pointer;</span>
<span class="hljs-attr">        text-align:</span><span class="hljs-string">center;</span>
<span class="hljs-attr">        line-height:</span><span class="hljs-number">30</span><span class="hljs-string">px;</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">div{</span>
<span class="hljs-attr">        height:</span> <span class="hljs-number">400</span><span class="hljs-string">px;</span>
    <span class="hljs-string">}</span>
    <span class="hljs-comment">#menu1{</span>
<span class="hljs-attr">         background:</span> <span class="hljs-comment">#ff0000;</span>
     <span class="hljs-string">}</span>
    <span class="hljs-comment">#menu2{</span>
<span class="hljs-attr">        background:</span> <span class="hljs-comment">#00ff00;</span>
    <span class="hljs-string">}</span>
    <span class="hljs-comment">#menu3{</span>
<span class="hljs-attr">        background:</span> <span class="hljs-comment">#0000ff;</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">/*</span> <span class="hljs-comment">#menu3:target{      /*target&#x662F;css&#x7684;&#x6807;&#x7B7E; &#x7528;css&#x6267;&#x884C;&#x4F1A;&#x66F4;&#x5FEB;*/</span>
<span class="hljs-attr">        background:</span> <span class="hljs-comment">#ffff00;;</span>
    <span class="hljs-string">}</span> <span class="hljs-string">*/</span>
<span class="hljs-string">&lt;/style&gt;</span></code></pre><p>&lt;/head&gt;<br>&lt;body&gt;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;ul id=&quot;nav&quot;&gt;
        &lt;li&gt;&lt;a href=&quot;#menu1&quot;&gt;&#x83DC;&#x5355;1&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;#menu2&quot;&gt;&#x83DC;&#x5355;2&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;#menu3&quot;&gt;&#x83DC;&#x5355;3&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;

    &lt;div id=&quot;menu1&quot;&gt;&lt;/div&gt;
    &lt;div id=&quot;menu2&quot;&gt;&lt;/div&gt;
    &lt;div id=&quot;menu3&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;nav&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#menu1&quot;</span>&gt;</span>&#x83DC;&#x5355;1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#menu2&quot;</span>&gt;</span>&#x83DC;&#x5355;2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#menu3&quot;</span>&gt;</span>&#x83DC;&#x5355;3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;menu1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;menu2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;menu3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&lt;/body&gt;</p><p><span class="img-wrap"><img data-src="/img/bVbgUWh?w=1338&amp;h=635" src="https://static.alili.tech/img/bVbgUWh?w=1338&amp;h=635" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x82E5;&#x60F3;&#x8BA9;&#x5BFC;&#x822A;&#x680F;&#x6D6E;&#x5728;&#x4E0A;&#x65B9;&#xFF0C;&#x8981;&#x7ED9;ul&#x52A0;&#x9AD8;&#x5EA6;
 #nav{
        margin-bottom:800px;
        height:30px;
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>&#x82E5;&#x60F3;&#x8BA9;&#x5BFC;&#x822A;&#x680F;&#x6D6E;&#x5728;&#x4E0A;&#x65B9;&#xFF0C;&#x8981;&#x7ED9;<span class="hljs-selector-tag">ul</span>&#x52A0;&#x9AD8;&#x5EA6;
 <span class="hljs-selector-id">#nav</span>{
        <span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">800px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">30px</span>;
    }
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgUXj?w=1338&amp;h=635" src="https://static.alili.tech/img/bVbgUXj?w=1338&amp;h=635" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jquery&#x6765;&#x5B9E;&#x73B0;
&lt;script src=&quot;jquery-3.3.1.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
             $(function(){
                 $(&apos;#nav li:last&apos;).on(&apos;click&apos;,function(){
                    alert(123);
                     setTimeout(function(){
                         $(&apos;#menu3:target&apos;).css(&apos;background&apos;,&apos;#ff0&apos;);
                         //&#x4E00;&#x70B9;&#x51FB; &#x51FD;&#x6570;&#x5C31;&#x6267;&#x884C; target&#x9700;&#x8981;&#x65F6;&#x95F4;
                     },1000);
                  });
             });
    &lt;/script&gt;

1000ms&#x540E;&#xFF0C;&#x84DD;&#x8272;&#x53D8;&#x6210;&#x9EC4;&#x8272;

&#x4E5F;&#x53EF;&#x4EE5;&#x7528;css&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x6548;&#x679C;
 #menu3:target{      /* target&#x662F;css&#x7684;&#x6807;&#x7B7E; &#x7528;css&#x6267;&#x884C;&#x4F1A;&#x66F4;&#x5FEB; */
        background: #ffff00;;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>jquery&#x6765;&#x5B9E;&#x73B0;
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery-3.3.1.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
             $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                 $(<span class="hljs-string">&apos;#nav li:last&apos;</span>).on(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    alert(<span class="hljs-number">123</span>);
                     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                         $(<span class="hljs-string">&apos;#menu3:target&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;#ff0&apos;</span>);
                         <span class="hljs-comment">//&#x4E00;&#x70B9;&#x51FB; &#x51FD;&#x6570;&#x5C31;&#x6267;&#x884C; target&#x9700;&#x8981;&#x65F6;&#x95F4;</span>
                     },<span class="hljs-number">1000</span>);
                  });
             });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

1000ms&#x540E;&#xFF0C;&#x84DD;&#x8272;&#x53D8;&#x6210;&#x9EC4;&#x8272;

&#x4E5F;&#x53EF;&#x4EE5;&#x7528;css&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x6548;&#x679C;
 #menu3:target{      /* target&#x662F;css&#x7684;&#x6807;&#x7B7E; &#x7528;css&#x6267;&#x884C;&#x4F1A;&#x66F4;&#x5FEB; */
        background: #ffff00;;
    }</code></pre><p>&#x70B9;&#x51FB;&#x83DC;&#x5355;3 &#x84DD;&#x8272;&#x53D8;&#x6210;&#x9EC4;&#x8272;</p><h2 id="articleHeader5">:input</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;      &#x8F93;&#x5165;&#x4EC0;&#x4E48;  &#x5217;&#x8868;&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x989C;&#x8272;&#x6539;&#x53D8;
 &lt;input type=&quot;text&quot; id=&quot;search&quot; value=&quot;123&quot;&gt;
    &lt;ul id=&quot;list&quot;&gt;
        &lt;li&gt;iphone8&lt;/li&gt;
        &lt;li&gt;iphoneX&lt;/li&gt;
        &lt;li&gt;huawei&lt;/li&gt;
        &lt;li&gt;xiaomi&lt;/li&gt;
    &lt;/ul&gt;
    &lt;script src=&quot;jquery-3.3.1.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        $(function(){
            var $Lis = $(&apos;#list li&apos;);
            $(&apos;#search&apos;).on(&apos;keyup&apos;,function(){//keyup&#x5F53;&#x524D;&#x503C;
             console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;
              
            });
        });
    &lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;      &#x8F93;&#x5165;&#x4EC0;&#x4E48;  &#x5217;&#x8868;&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x989C;&#x8272;&#x6539;&#x53D8;
 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;search&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;123&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;list&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>iphone8<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>iphoneX<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>huawei<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>xiaomi<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery-3.3.1.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> $Lis = $(<span class="hljs-string">&apos;#list li&apos;</span>);
            $(<span class="hljs-string">&apos;#search&apos;</span>).on(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//keyup&#x5F53;&#x524D;&#x503C;</span>
             <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);<span class="hljs-comment">//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;</span>
              
            });
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgU23?w=249&amp;h=607" src="https://static.alili.tech/img/bVbgU23?w=249&amp;h=607" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6253;&#x5370;&#x8F93;&#x51FA;&#x503C;&#xFF0C;keyup&#x53D6;&#x5F53;&#x524D;&#x503C;&#xFF0C;keydown&#x53D6;&#x524D;&#x4E00;&#x4E2A;&#x503C;

 console.log(this);    
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>&#x6253;&#x5370;&#x8F93;&#x51FA;&#x503C;&#xFF0C;keyup&#x53D6;&#x5F53;&#x524D;&#x503C;&#xFF0C;keydown&#x53D6;&#x524D;&#x4E00;&#x4E2A;&#x503C;

 console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">this</span>);    
 </code></pre><p><span class="img-wrap"><img data-src="/img/bVbgU3G?w=356&amp;h=552" src="https://static.alili.tech/img/bVbgU3G?w=356&amp;h=552" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8FD9;&#x91CC;&#x7684;this&#x6307;&#x7684;&#x662F;function&#x4E4B;&#x524D;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x7136;&#x4F1A;&#x8F93;&#x51FA;&#x90A3;&#x53E5;&#x8BDD;&#x3002;

&lt;input type=&quot;text&quot; id=&quot;search&quot; value=&quot;123&quot;&gt;
    &lt;ul id=&quot;list&quot;&gt;
        &lt;li&gt;iphone8&lt;/li&gt;
        &lt;li&gt;iphoneX&lt;/li&gt;
        &lt;li&gt;huawei&lt;/li&gt;
        &lt;li&gt;xiaomi&lt;/li&gt;
    &lt;/ul&gt;
    
 $(function(){
       var $Lis = $(&apos;#list li&apos;);
       $(&apos;#search&apos;).on(&apos;keyup&apos;,function(){//keyup&#x5F53;&#x524D;&#x503C;
       $(&apos;#list li:contains( this.value ).css(&apos;background&apos;,&apos;red&apos;);
         });
   });
&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x56E0;&#x4E3A;this.value&#x662F;js&#x4EE3;&#x7801;&#x653E;&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x91CC;&#x9762;&#x8BC6;&#x522B;&#x4E0D;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x7528;&#x5230;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#x3002;$(&apos;#list li:contains(&apos;+ this.value +&apos;)&apos;).css(&apos;background&apos;,&apos;red&apos;);

&#x52A0;&#x4E0A;else&#x5224;&#x65AD; &#x5982;&#x679C;&#x952E;&#x5165;&#x503C;&#x4E3A;&#x7A7A; &#x80CC;&#x666F;&#x900F;&#x660E; &#x5DF4;&#x7279; &#x8FD9;&#x6837;&#x4E0D;&#x597D;&#x4F7F;
 $(function(){
            var $Lis = $(&apos;#list li&apos;);
            $(&apos;#search&apos;).on(&apos;keyup&apos;,function(){//keyup&#x5F53;&#x524D;&#x503C;
              //console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;
              //  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;
                if(this.value != &apos;&apos;){
                    //this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;
                    $(&apos;#list li:contains(&apos;+ this.value +&apos;)&apos;).css(&apos;background&apos;,&apos;red&apos;);
                }else{
                    $(&apos;#list li&apos;).css(&apos;background&apos;,&apos;transparent&apos;);
                }
            });
        });

&#x628A;else&#x653E;&#x5728;&#x524D;&#x9762;
 $(function(){
            var $Lis = $(&apos;#list li&apos;);
            $(&apos;#search&apos;).on(&apos;keyup&apos;,function(){//keyup&#x5F53;&#x524D;&#x503C;
             //console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;
              //  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;
                $(&apos;#list li&apos;).css(&apos;background&apos;,&apos;transparent&apos;);
                if(this.value != &apos;&apos;){
                    //this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;
                    $(&apos;#list li:contains(&apos;+ this.value +&apos;)&apos;).css(&apos;background&apos;,&apos;red&apos;);
                }
            });
        });
        
$(function(){     
            $(&apos;#search&apos;).on(&apos;keyup&apos;,function(){//keyup&#x5F53;&#x524D;&#x503C;
             //console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;
              //  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;
                $(&apos;#list li&apos;).css(&apos;background&apos;,&apos;transparent&apos;);
                if(this.value != &apos;&apos;){
                    //this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;
                    $(&apos;#list li:contains(&apos;+ this.value +&apos;)&apos;).css(&apos;background&apos;,&apos;red&apos;);
                }
            });
        });
        " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>&#x8FD9;&#x91CC;&#x7684;this&#x6307;&#x7684;&#x662F;<span class="hljs-function"><span class="hljs-keyword">function</span>&#x4E4B;&#x524D;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x7136;&#x4F1A;&#x8F93;&#x51FA;&#x90A3;&#x53E5;&#x8BDD;&#x3002;</span>

&lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">&quot;text&quot;</span> id=<span class="hljs-string">&quot;search&quot;</span> value=<span class="hljs-string">&quot;123&quot;</span>&gt;
    &lt;ul id=<span class="hljs-string">&quot;list&quot;</span>&gt;
        &lt;li&gt;iphone8&lt;/li&gt;
        &lt;li&gt;iphoneX&lt;/li&gt;
        &lt;li&gt;huawei&lt;/li&gt;
        &lt;li&gt;xiaomi&lt;/li&gt;
    &lt;/ul&gt;
    
 $(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
       var $Lis = $(<span class="hljs-string">&apos;#list li&apos;</span>);
       $(<span class="hljs-string">&apos;#search&apos;</span>).on(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{//<span class="hljs-title">keyup</span>&#x5F53;&#x524D;&#x503C;</span>
       $(<span class="hljs-string">&apos;#list li:contains( this.value ).css(&apos;</span>background&apos;,<span class="hljs-string">&apos;red&apos;</span>);
         });
   });
&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x56E0;&#x4E3A;this.value&#x662F;js&#x4EE3;&#x7801;&#x653E;&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x91CC;&#x9762;&#x8BC6;&#x522B;&#x4E0D;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x7528;&#x5230;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#x3002;$(<span class="hljs-string">&apos;#list li:contains(&apos;</span>+ this.value +<span class="hljs-string">&apos;)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);

&#x52A0;&#x4E0A;<span class="hljs-keyword">else</span>&#x5224;&#x65AD; &#x5982;&#x679C;&#x952E;&#x5165;&#x503C;&#x4E3A;&#x7A7A; &#x80CC;&#x666F;&#x900F;&#x660E; &#x5DF4;&#x7279; &#x8FD9;&#x6837;&#x4E0D;&#x597D;&#x4F7F;
 $(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
            var $Lis = $(<span class="hljs-string">&apos;#list li&apos;</span>);
            $(<span class="hljs-string">&apos;#search&apos;</span>).on(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{//<span class="hljs-title">keyup</span>&#x5F53;&#x524D;&#x503C;</span>
              <span class="hljs-comment">//console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;</span>
              <span class="hljs-comment">//  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;</span>
                <span class="hljs-keyword">if</span>(this.value != <span class="hljs-string">&apos;&apos;</span>){
                    <span class="hljs-comment">//this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;</span>
                    $(<span class="hljs-string">&apos;#list li:contains(&apos;</span>+ this.value +<span class="hljs-string">&apos;)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
                }<span class="hljs-keyword">else</span>{
                    $(<span class="hljs-string">&apos;#list li&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;transparent&apos;</span>);
                }
            });
        });

&#x628A;<span class="hljs-keyword">else</span>&#x653E;&#x5728;&#x524D;&#x9762;
 $(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
            var $Lis = $(<span class="hljs-string">&apos;#list li&apos;</span>);
            $(<span class="hljs-string">&apos;#search&apos;</span>).on(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{//<span class="hljs-title">keyup</span>&#x5F53;&#x524D;&#x503C;</span>
             <span class="hljs-comment">//console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;</span>
              <span class="hljs-comment">//  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;</span>
                $(<span class="hljs-string">&apos;#list li&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;transparent&apos;</span>);
                <span class="hljs-keyword">if</span>(this.value != <span class="hljs-string">&apos;&apos;</span>){
                    <span class="hljs-comment">//this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;</span>
                    $(<span class="hljs-string">&apos;#list li:contains(&apos;</span>+ this.value +<span class="hljs-string">&apos;)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
                }
            });
        });
        
$(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{     </span>
            $(<span class="hljs-string">&apos;#search&apos;</span>).on(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{//<span class="hljs-title">keyup</span>&#x5F53;&#x524D;&#x503C;</span>
             <span class="hljs-comment">//console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;</span>
              <span class="hljs-comment">//  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;</span>
                $(<span class="hljs-string">&apos;#list li&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;transparent&apos;</span>);
                <span class="hljs-keyword">if</span>(this.value != <span class="hljs-string">&apos;&apos;</span>){
                    <span class="hljs-comment">//this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;</span>
                    $(<span class="hljs-string">&apos;#list li:contains(&apos;</span>+ this.value +<span class="hljs-string">&apos;)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
                }
            });
        });
        </code></pre><p>&#x73B0;&#x5728;&#x529F;&#x80FD;&#x4E0A;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6027;&#x80FD;&#x4E0A;&#x6709;&#x95EE;&#x9898;&#xFF0C;#list li&#x53D6;&#x4E86;2&#x6B21;&#xFF0C;&#x591A;&#x627E;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;#list li&#x5148;&#x5B58;&#x8D77;&#x6765;&#x8D4B;&#x7ED9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
            var $Lis = $(&apos;#list li&apos;);
            $(&apos;#search&apos;).on(&apos;keyup&apos;,function(){//keyup&#x5F53;&#x524D;&#x503C; &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7528;on
             //console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;
              //  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;
              $Lis.css(&apos;background&apos;,&apos;transparent&apos;);
                if(this.value != &apos;&apos;){
                    //this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;
                    $(&apos;#list li:contains(&apos;+ this.value +&apos;)&apos;).css(&apos;background&apos;,&apos;red&apos;);
                }
            });
        });
        
        console.log($Lis);
        " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> $Lis = $(<span class="hljs-string">&apos;#list li&apos;</span>);
            $(<span class="hljs-string">&apos;#search&apos;</span>).on(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//keyup&#x5F53;&#x524D;&#x503C; &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7528;on</span>
             <span class="hljs-comment">//console.log(this.value);//&#x539F;&#x751F;&#x65B9;&#x6CD5;  &#x6548;&#x7387;&#x9AD8;</span>
              <span class="hljs-comment">//  console.log($(this).val());//jq&#x65B9;&#x6CD5;&apos;</span>
              $Lis.css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;transparent&apos;</span>);
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.value != <span class="hljs-string">&apos;&apos;</span>){
                    <span class="hljs-comment">//this.value &#x8981;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5; $(&apos;#list li:contains(this.value)&apos;) &#x4E0D;&#x884C;&#x5F97;&#x628A;this.value&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;</span>
                    $(<span class="hljs-string">&apos;#list li:contains(&apos;</span>+ <span class="hljs-keyword">this</span>.value +<span class="hljs-string">&apos;)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
                }
            });
        });
        
        <span class="hljs-built_in">console</span>.log($Lis);
        </code></pre><p><span class="img-wrap"><img data-src="/img/bVbgVhi?w=506&amp;h=165" src="https://static.alili.tech/img/bVbgVhi?w=506&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jquery&#x5BF9;&#x8C61; &#x7C7B;&#x4F3C;&#x6570;&#x7EC4;

:empty &#x9009;&#x62E9;&#x5185;&#x5BB9;&#x4E3A;&#x7A7A;&#x7684;&#x8282;&#x70B9;
:parent &#x9009;&#x62E9;&#x6709;&#x5185;&#x5BB9;&#x7684;&#x8282;&#x70B9;
:has() &#x5339;&#x914D;&#x542B;&#x6709;&#x9009;&#x62E9;&#x5668;&#x6240;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x7684;&#x5143;&#x7D20;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">jquery</span>&#x5BF9;&#x8C61; &#x7C7B;&#x4F3C;&#x6570;&#x7EC4;

<span class="hljs-selector-pseudo">:empty</span> &#x9009;&#x62E9;&#x5185;&#x5BB9;&#x4E3A;&#x7A7A;&#x7684;&#x8282;&#x70B9;
<span class="hljs-selector-pseudo">:parent</span> &#x9009;&#x62E9;&#x6709;&#x5185;&#x5BB9;&#x7684;&#x8282;&#x70B9;
<span class="hljs-selector-pseudo">:has()</span> &#x5339;&#x914D;&#x542B;&#x6709;&#x9009;&#x62E9;&#x5668;&#x6240;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x7684;&#x5143;&#x7D20;


</code></pre><h2 id="articleHeader6">:hidden</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5143;&#x7D20;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x9690;&#x85CF;&#x7684;&#x51E0;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;
1.&#x4ED6;&#x4EEC;&#x7684;display:&#x662F;none.
2.&#x4ED6;&#x4EEC;&#x662F;type=&quot;hidden&quot;&#x7684;&#x8868;&#x5355;&#x5143;&#x7D20;&#x3002;
3.&#x4ED6;&#x4EEC;&#x7684;&#x5BBD;&#x9AD8;&#x90FD;&#x663E;&#x793A;&#x8BBE;&#x7F6E;&#x4E3A;0.
4.&#x4E00;&#x4E2A;&#x7956;&#x5148;&#x5143;&#x7D20;&#x662F;&#x9690;&#x85CF;&#x7684;&#x3002;
&#x5143;&#x7D20;visibility:hidden opacity:0&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x4ED6;&#x4EEC;&#x4ECD;&#x7136;&#x5360;&#x636E;&#x5E03;&#x5C40;&#x7A7A;&#x95F4;&#x3002;

input[type=&quot;text&quot;][name=&quot;userid&quot;]{
        background: red;
        }
 &lt;input type=&quot;text&quot; name=&quot;userid&quot;&gt;
 &lt;input type=&quot;text&quot; name=&quot;userid1111&quot;&gt;
 &#x4F1A;&#x9009;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x8F93;&#x5165;&#x6846;
 &#x7528;jquery&#x5199; $&#xFF08;&apos;input[type=&quot;text&quot;][name=&quot;userid&quot;]&apos;&#xFF09;;   
 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code>&#x5143;&#x7D20;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x9690;&#x85CF;&#x7684;&#x51E0;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;
1.&#x4ED6;&#x4EEC;&#x7684;display:&#x662F;none.
2.&#x4ED6;&#x4EEC;&#x662F;type=&quot;hidden&quot;&#x7684;&#x8868;&#x5355;&#x5143;&#x7D20;&#x3002;
3.&#x4ED6;&#x4EEC;&#x7684;&#x5BBD;&#x9AD8;&#x90FD;&#x663E;&#x793A;&#x8BBE;&#x7F6E;&#x4E3A;0.
4.&#x4E00;&#x4E2A;&#x7956;&#x5148;&#x5143;&#x7D20;&#x662F;&#x9690;&#x85CF;&#x7684;&#x3002;
&#x5143;&#x7D20;visibility:hidden opacity:0&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x4ED6;&#x4EEC;&#x4ECD;&#x7136;&#x5360;&#x636E;&#x5E03;&#x5C40;&#x7A7A;&#x95F4;&#x3002;

input[<span class="hljs-string">type=&quot;text&quot;</span>][<span class="hljs-symbol">name=&quot;userid&quot;</span>]{
<span class="hljs-code">        background: red;</span>
<span class="hljs-code">        }</span>
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;userid&quot;</span>&gt;</span></span>
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;userid1111&quot;</span>&gt;</span></span>
 &#x4F1A;&#x9009;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x8F93;&#x5165;&#x6846;
 &#x7528;jquery&#x5199; $&#xFF08;&apos;input[<span class="hljs-string">type=&quot;text&quot;</span>][<span class="hljs-symbol">name=&quot;userid&quot;</span>]&apos;&#xFF09;;   
 
</code></pre><h2 id="articleHeader7">nth-child</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nth-child(1) &#x4ECE;1&#x5F00;&#x59CB;
nth-child(2n) &#x4ECE;1&#x5F00;&#x59CB;
nth-child(2n+1) &#x4ECE;0&#x5F00;&#x59CB;

&lt;div class=&quot;test&quot;&gt;
    &lt;p&gt;A&#x5143;&#x7D20;&lt;/p&gt;
    &lt;div&gt;B&#x5143;&#x7D20;&lt;/div&gt;
    &lt;p&gt;C&#x5143;&#x7D20;&lt;/p&gt;
    &lt;p&gt;D&#x5143;&#x7D20;&lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">nth-child</span><span class="hljs-params">(<span class="hljs-number">1</span>)</span></span> &#x4ECE;<span class="hljs-number">1</span>&#x5F00;&#x59CB;
<span class="hljs-function"><span class="hljs-title">nth-child</span><span class="hljs-params">(<span class="hljs-number">2</span>n)</span></span> &#x4ECE;<span class="hljs-number">1</span>&#x5F00;&#x59CB;
<span class="hljs-function"><span class="hljs-title">nth-child</span><span class="hljs-params">(<span class="hljs-number">2</span>n+<span class="hljs-number">1</span>)</span></span> &#x4ECE;<span class="hljs-number">0</span>&#x5F00;&#x59CB;

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;test&quot;</span>&gt;
    &lt;p&gt;A&#x5143;&#x7D20;&lt;/p&gt;
    &lt;div&gt;B&#x5143;&#x7D20;&lt;/div&gt;
    &lt;p&gt;C&#x5143;&#x7D20;&lt;/p&gt;
    &lt;p&gt;D&#x5143;&#x7D20;&lt;/p&gt;
&lt;/div&gt;</code></pre><p>$(&apos;p:nth-of-type(2)&apos;);//C&#x5143;&#x7D20; &#x4ECE;&#x540E;&#x5F80;&#x524D;&#x770B; &#x7B2C;2&#x6B21;&#x51FA;&#x73B0;p&#x6807;&#x7B7E;&#x7684;&#x5143;&#x7D20;<br>$(&apos;p:nth-child(2)&apos;);//&#x4EC0;&#x4E48;&#x4E5F;&#x6CA1;&#x9009;&#x4E2D; &#x4ECE;&#x540E;&#x5F80;&#x524D;&#x770B; &#x7B2C;&#x4E8C;&#x4E2A;&#x5B69;&#x5B50;&#x4E0D;&#x662F;p &#x662F;div &#x4E0D;&#x9009;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &#x52A0;&#x4E0A;&#x989C;&#x8272;&#x770B;&#x6548;&#x679C;&#x66F4;&#x660E;&#x663E;
   &lt;div class=&quot;test&quot;&gt;
            &lt;p&gt;A&#x5143;&#x7D20;&lt;/p&gt;
            &lt;div&gt;B&#x5143;&#x7D20;&lt;/div&gt;
            &lt;p&gt;C&#x5143;&#x7D20;&lt;/p&gt;
            &lt;p&gt;D&#x5143;&#x7D20;&lt;/p&gt;
    &lt;/div&gt;
    &lt;script src=&quot;jquery-3.3.1.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        $(&apos;p:nth-of-type(2)&apos;).css(&apos;background&apos;,&apos;green&apos;);
        $(&apos;p:nth-child(2)&apos;).css(&apos;background&apos;,&apos;red&apos;);
    &lt;/script&gt;
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>   &#x52A0;&#x4E0A;&#x989C;&#x8272;&#x770B;&#x6548;&#x679C;&#x66F4;&#x660E;&#x663E;
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>A&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>C&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>D&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery-3.3.1.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">&apos;p:nth-of-type(2)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);
        $(<span class="hljs-string">&apos;p:nth-child(2)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    </code></pre><p><span class="img-wrap"><img data-src="/img/bVbgYhg?w=642&amp;h=176" src="https://static.alili.tech/img/bVbgYhg?w=642&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>p:nth-of-type(2) &#x60F3;&#x627E;&#x7B2C;2&#x6B21;&#x51FA;&#x73B0;p&#x6807;&#x7B7E;&#x7684;&#x5B69;&#x5B50; &#x9009;&#x4E2D;&#x7B2C;&#x4E09;&#x884C; C&#x5143;&#x7D20; &#x7B2C;&#x4E09;&#x884C;&#x80CC;&#x666F;&#x53D8;&#x6210;&#x7EFF;&#x8272;<br>p:nth-child(2) &#x60F3;&#x8981;&#x627E;&#x7B2C;2&#x4E2A;&#x5B69;&#x5B50; &#x5E76;&#x4E14;&#x8981;&#x662F;p&#x6807;&#x7B7E;&#x4E0B;&#x7684; &#x4F46;&#x662F;&#x73B0;&#x5728;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B69;&#x5B50;&#x662F;div&#x6807;&#x7B7E; &#x6240;&#x4EE5;&#x5E76;&#x6CA1;&#x6709;&#x9009;&#x4E2D;&#xFF0C;&#x6CA1;&#x6709;&#x5185;&#x5BB9;&#x53D8;&#x6210;&#x7EA2;&#x8272;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div class=&quot;test&quot;&gt;
            &lt;p&gt;A&#x5143;&#x7D20;&lt;/p&gt;
            &lt;div&gt;B&#x5143;&#x7D20;&lt;/div&gt;
            &lt;p&gt;C&#x5143;&#x7D20;&lt;/p&gt;
            &lt;p&gt;D&#x5143;&#x7D20;&lt;/p&gt;
    &lt;/div&gt;
    &lt;script src=&quot;jquery-3.3.1.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        $(&apos;p:nth-of-type(2)&apos;).css(&apos;background&apos;,&apos;green&apos;);
        $(&apos;div:nth-child(2)&apos;).css(&apos;background&apos;,&apos;red&apos;);
    &lt;/script&gt;
    
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>A&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>C&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>D&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery-3.3.1.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">&apos;p:nth-of-type(2)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;green&apos;</span>);
        $(<span class="hljs-string">&apos;div:nth-child(2)&apos;</span>).css(<span class="hljs-string">&apos;background&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbgYhF?w=416&amp;h=186" src="https://static.alili.tech/img/bVbgYhF?w=416&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div:nth-child(2)&#x8981;&#x627E;&#x7B2C;2&#x4E2A;&#x5B69;&#x5B50; &#x5E76;&#x4E14;&#x8981;&#x662F;div&#x6807;&#x7B7E;&#x4E0B;&#x7684;&#x5B69;&#x5B50;  &#x9009;&#x4E2D; &#x80CC;&#x666F;&#x53D8;&#x6210;&#x7EA2;&#x8272;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code><span class="hljs-keyword">div</span>:nth-child(<span class="hljs-number">2</span>)&#x8981;&#x627E;&#x7B2C;<span class="hljs-number">2</span>&#x4E2A;&#x5B69;&#x5B50; &#x5E76;&#x4E14;&#x8981;&#x662F;<span class="hljs-keyword">div</span>&#x6807;&#x7B7E;&#x4E0B;&#x7684;&#x5B69;&#x5B50;  &#x9009;&#x4E2D; &#x80CC;&#x666F;&#x53D8;&#x6210;&#x7EA2;&#x8272;

</code></pre><p>var n = $(&quot;input:checked&quot;).length; &#x53D6;&#x9009;&#x4E2D;&#x7684;&#x8F93;&#x5165;&#x6846;</p><p>inputtype=&quot;text&quot;&#xFF1A;focus{</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        background: red;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>        <span class="hljs-built_in">background</span>: <span class="hljs-built_in">red</span>;
        }</code></pre><p>inputtype=&quot;text&quot;{</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        background: yellow;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>        <span class="hljs-attribute">background</span>: yellow;
        }</code></pre><p>&#x9EC4;&#x8272;&#x8F93;&#x5165;&#x6846;&#xFF0C;&#x83B7;&#x53D6;&#x7126;&#x70B9;&#x4E4B;&#x540E;&#x53D8;&#x6210;&#x7EA2;&#x8272;</p><p>&lt;input type=&quot;file&quot;&gt;&#x81EA;&#x52A8;&#x4F1A;&#x8BA9;&#x4F60;&#x9009;&#x62E9;&#x6587;&#x4EF6;<br>&#xFF1A;selected &#x9009;&#x4E2D;&#x4E0B;&#x62C9;&#x83DC;&#x5355;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jquery选择器 （nth-of-type（） nth-child（）区别内容更新）

## 原文链接
[https://segmentfault.com/a/1190000016388005](https://segmentfault.com/a/1190000016388005)


---
title: 实例感受-es6的常用语法和优越性
hidden: true
categories: [reprint]
slug: f2548de
date: 2018-10-25 09:08:15
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x524D;&#x51E0;&#x5929;&#xFF0C;&#x7528;es6&#x7684;&#x8BED;&#x6CD5;&#x91CD;&#x5199;&#x4E86;&#x6211;&#x7684;&#x4E00;&#x4E2A;&#x4EE3;&#x7801;&#x5E93;&#xFF0C;&#x8BF4;&#x662F;&#x91CD;&#x5199;&#xFF0C;&#x5176;&#x5B9E;&#x6539;&#x52A8;&#x7684;&#x5E76;&#x4E0D;&#x591A;&#xFF0C;&#x5DE5;&#x4F5C;&#x91CF;&#x4E0D;&#x5927;&#x3002;&#x5728;&#x91CD;&#x5199;&#x5B8C;&#x4E86;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4E2A;&#x4EBA;&#x603B;&#x7ED3;&#x4E86;&#x4E00;&#x4E0B;es6&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x8BED;&#x6CD5;&#x548C;&#x6BD4;es5&#x4F18;&#x8D8A;&#x7684;&#x65B9;&#x9762;&#x3002;&#x4E0B;&#x9762;&#x63D0;&#x5230;&#x7684;&#x8BED;&#x6CD5;&#x53EF;&#x80FD;&#x4E5F;&#x5C31;&#x662F;es6&#x65B0;&#x7279;&#x6027;&#x7684;10%-20%&#xFF0C;&#x4F46;&#x662F;&#x5F00;&#x53D1;&#x4E0A;&#x5360;&#x4E86;80%&#x5DE6;&#x53F3;&#x7684;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x6309;&#x7167;es6&#x5E38;&#x7528;&#x65B0;&#x7279;&#x6027;&#x8FDB;&#x884C;&#x5206;&#x7C7B;&#xFF0C;&#x6587;&#x7AE0;&#x63D0;&#x53CA;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x6709;&#x4E9B;&#x662F;&#x6211;&#x4EE3;&#x7801;&#x5E93;&#x7684;&#x5C0F;&#x5B9E;&#x4F8B;&#xFF0C;&#x6709;&#x4E9B;&#x662F;&#x81EA;&#x5DF1;&#x968F;&#x4FBF;&#x7F16;&#x7684;&#xFF0C;&#x5927;&#x5BB6;&#x77E5;&#x9053;&#x5C31;&#x597D;&#xFF01;&#x5E0C;&#x671B;&#x53EF;&#x4EE5;&#x5E2E;&#x5230;&#x5927;&#x5BB6;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x6709;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x6216;&#x8005;&#x54EA;&#x91CC;&#x5199;&#x5F97;&#x4E0D;&#x5BF9;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF01;</p><blockquote>1.&#x53EF;&#x80FD;&#x8FD8;&#x6709;&#x4E9B;&#x4EBA;&#x4E0D;&#x77E5;&#x9053;&#x6211;&#x8BF4;&#x7684;&#x7684;&#x4EE3;&#x7801;&#x5E93;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x6253;&#x4E0B;&#x5E7F;&#x544A;&#xFF1A;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x5E93;&#x662F;&#x6211;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E9B;javascript&#x5E38;&#x7528;&#x7684;&#x5C0F;&#x5B9E;&#x4F8B;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;<strong>&#x6570;&#x7EC4;&#x53BB;&#x91CD;</strong>&#xFF0C;<strong>&#x5B57;&#x7B26;&#x66FF;&#x6362;</strong>&#xFF0C;<strong>&#x5E38;&#x7528;Dom&#x64CD;&#x4F5C;</strong>&#xFF0C;<strong>&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;</strong>&#x7B49;&#x7684;57&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#xFF08;<a href="https://github.com/chenhuiYj/ec-do" rel="nofollow noreferrer" target="_blank">&#x67E5;&#x770B;&#x8BF4;&#x660E;</a>&#xFF09;&#x3002;&#x4EE3;&#x7801;&#x4E5F;&#x4E0A;&#x4F20;&#x5230;github&#x4E0A;&#x9762;&#x4E86;&#xFF01;es5&#x7248;&#x672C;--<a href="https://github.com/chenhuiYj/ec-do/blob/master/src/ec-do-1.1.4.js" rel="nofollow noreferrer" target="_blank">ec-do-1.1.4</a>&#x3002;es6&#x7248;&#x672C;--<a href="https://github.com/chenhuiYj/ec-do/blob/master/src/ec-do-2.0.0.js" rel="nofollow noreferrer" target="_blank">ec-do-2.0.0</a>&#x3002;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;star&#x3002;&#x4E5F;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x591A;&#x7ED9;&#x610F;&#x89C1;&#xFF0C;&#x6216;&#x8005;&#x548C;&#x5927;&#x5BB6;&#x4E00;&#x8D77;&#x5B8C;&#x5584;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#xFF01;<br>2.&#x81F3;&#x4E8E;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x5E93;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x53BB;github&#x770B;&#x4E00;&#x4E0B;&#x5C31;&#x77E5;&#x9053;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x591A;&#x8BF4;&#xFF01;<br>3.es6&#x53D1;&#x5E03;&#x4E24;&#x5E74;&#x591A;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x90FD;&#x53D1;&#x5E03;&#x4E86;es7&#xFF0C;es8&#x4E86;&#xFF0C;&#x4F46;&#x662F;es7&#x548C;es8&#x66F4;&#x65B0;&#x7684;&#x4E1C;&#x897F;&#x4E0D;&#x591A;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#x94FE;&#x63A5;&#xFF01;<a href="https://segmentfault.com/a/1190000011017894">&#x804A;&#x804A;ES7&#x4E0E;ES8&#x7279;&#x6027;</a>&#xFF0C;<a href="http://www.cnblogs.com/zhuanzhuanfe/p/7493433.html" rel="nofollow noreferrer" target="_blank">10&#x5206;&#x949F;&#x5B66;&#x4F1A;ES7+ES8</a>&#x3002;</blockquote><h2 id="articleHeader1">2.let const</h2><p><code>let</code>&#x548C;<code>var</code>&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF0C;<code>let</code>&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x7684;&#x533A;&#x5206;&#x6982;&#x5FF5;&#x3002;</p><p>&#x5982;&#x4E0B;&#x5B9E;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x76F8;&#x5F53;&#x4E8E;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;i&#x53D8;&#x91CF;&#x3002;
for(var i=0;i&lt;10;i++){
    console.log(i)
}
console.log(&apos;&#x6700;&#x540E;&#x7684;&#x503C;&#xFF1A;&apos;+i)   
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x76F8;&#x5F53;&#x4E8E;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;i&#x53D8;&#x91CF;&#x3002;</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
    <span class="hljs-built_in">console</span>.log(i)
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6700;&#x540E;&#x7684;&#x503C;&#xFF1A;&apos;</span>+i)   
 </code></pre><p><span class="img-wrap"><img data-src="/img/bVX9E4?w=412&amp;h=203" src="https://static.alili.tech/img/bVX9E4?w=412&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//j&#x53EA;&#x5728;&#x8FD9;&#x4E2A;for&#x5FAA;&#x73AF;&#x6709;&#x6548;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x5FAA;&#x73AF;&#x5916;&#x8C03;&#x7528;&#x5C31;&#x4F1A;&#x62A5;&#x9519;
for(let j=0;j&lt;10;j++){
    console.log(j)
}
console.log(&apos;&#x6700;&#x540E;&#x7684;&#x503C;&#xFF1A;&apos;+j)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//j&#x53EA;&#x5728;&#x8FD9;&#x4E2A;for&#x5FAA;&#x73AF;&#x6709;&#x6548;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x5FAA;&#x73AF;&#x5916;&#x8C03;&#x7528;&#x5C31;&#x4F1A;&#x62A5;&#x9519;</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;<span class="hljs-number">10</span>;j++){
    <span class="hljs-built_in">console</span>.log(j)
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6700;&#x540E;&#x7684;&#x503C;&#xFF1A;&apos;</span>+j)</code></pre><p><span class="img-wrap"><img data-src="/img/bVX9Fr?w=482&amp;h=221" src="https://static.alili.tech/img/bVX9Fr?w=482&amp;h=221" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5E38;&#x89C1;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x662F;&#xFF1A;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x6709;5&#x4E2A;<code>li</code>&#xFF0C;&#x7D22;&#x5F15;&#x5F53;&#x7136;&#x5C31;&#x662F;0,1,2,3,4&#x3002;&#x70B9;&#x51FB;&#x67D0;&#x4E00;&#x4E2A;li&#xFF0C;&#x663E;&#x793A;&#x8BE5;li&#x7684;&#x7D22;&#x5F15;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oLi= document.querySelectorAll(&apos;li&apos;)
for (var i = 0,len = oLi.length; i &lt; len; i++){
    oLi[i].onclick = function(){
        console.log(i)
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oLi= <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>)
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len = oLi.length; i &lt; len; i++){
    oLi[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i)
    }
}
</code></pre><p>&#x8FD9;&#x6837;&#x5199;&#xFF0C;&#x5176;&#x5B9E;&#x65E0;&#x8BBA;&#x70B9;&#x51FB;&#x90A3;&#x4E2A;<code>li</code>&#xFF0C;&#x90FD;&#x662F;&#x663E;&#x793A;5&#x3002;&#x56E0;&#x4E3A;&#x5F53;&#x70B9;&#x51FB;<code>li</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x4E2A;<code>i</code>&#xFF0C;&#x5C31;&#x662F;&#x7B49;&#x4E8E;5&#xFF0C;&#x5C31;&#x663E;&#x793A;5&#x3002;</p><p>&#x7528;let&#x5C31;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oLi= document.querySelectorAll(&apos;li&apos;)
for (let i = 0,len = oLi.length; i &lt; len; i++){
    oLi[i].onclick = function(){
        console.log(i)
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oLi= <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>)
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>,len = oLi.length; i &lt; len; i++){
    oLi[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i)
    }
}
</code></pre><p>&#x7528;&#x4E86;let&#xFF0C;&#x5982;&#x679C;&#x70B9;&#x51FB;&#x7B2C;&#x4E00;&#x4E2A;<code>li</code>&#xFF0C;&#x5C31;&#x663E;&#x793A;0&#xFF0C;&#x70B9;&#x51FB;&#x7B2C;&#x4E09;&#x4E2A;<code>li</code>&#xFF0C;&#x5C31;&#x663E;&#x793A;2&#x3002;&#x8FD9;&#x4E2A;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x5C1D;&#x8BD5;&#x4E0B;&#xFF01;</p><p>&#x8BF4;&#x5B8C;&#x4E86;<code>let</code>&#xFF0C;&#x8BF4;&#x4E0B;<code>const</code>&#xFF0C;<code>const</code>&#x521D;&#x59CB;&#x5316;&#x8D4B;&#x503C;&#x4E4B;&#x540E;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x6539;&#x53D8;&#x8D4B;&#x503C;&#x3002;&#x5982;&#x4E0B;&#x56FE;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVX9Mc?w=518&amp;h=103" src="https://static.alili.tech/img/bVX9Mc?w=518&amp;h=103" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x4E2A;&#x6211;&#x76EE;&#x524D;&#x662F;&#x7528;&#x5728;&#x5F15;&#x7528;&#x63D2;&#x4EF6;&#xFF0C;&#x5E93;&#xFF0C;&#x6216;&#x8005;&#x6A21;&#x5757;&#x5316;&#x5F00;&#x53D1;&#x4E0A;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVX9MV?w=486&amp;h=50" src="https://static.alili.tech/img/bVX9MV?w=486&amp;h=50" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x4E0A;&#x53EF;&#x4EE5;&#x7531;&#x4E8E;&#x91CD;&#x540D;&#x800C;&#x5E26;&#x6765;&#x7684;&#x5F02;&#x5E38;&#xFF01;</p><h2 id="articleHeader2">3.arrow function</h2><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x9891;&#x7387;&#x975E;&#x5E38;&#x7684;&#x9AD8;&#xFF01;&#x5199;&#x6CD5;&#x4E5F;&#x662F;&#x975E;&#x5E38;&#x7684;&#x7B80;&#x6D01;&#x548C;&#x6E05;&#x6670;&#xFF01;</p><p>&#x5982;&#x4E0B;&#x7684;&#x6570;&#x7EC4;&#x6C42;&#x548C;&#x5B9E;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sumArr&#x90FD;&#x662F;ecDo&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x662F;&#x5927;&#x5BB6;&#x770B;&#x5230;es6&#x548C;es5&#x7684;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x662F;es6&#x7B80;&#x5199;&#x65B9;&#x5F0F;&#x3002;
//es6&#x5199;&#x6CD5;-&#x9690;&#x5F0F;&#x8FD4;&#x56DE;
sumArr(arr) {
    return arr.reduce((pre, cur) =&gt;pre + cur)
}
//es6&#x5199;&#x6CD5;-&#x663E;&#x5F0F;&#x8FD4;&#x56DE;
sumArr(arr) {
    return arr.reduce((pre, cur) =&gt;{return pre + cur})
}
//es5&#x5199;&#x6CD5;
sumArr: function (arr) {
    return arr.reduce(function (pre, cur) {
        return pre + cur
    })
},
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//sumArr&#x90FD;&#x662F;ecDo&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x662F;&#x5927;&#x5BB6;&#x770B;&#x5230;es6&#x548C;es5&#x7684;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x662F;es6&#x7B80;&#x5199;&#x65B9;&#x5F0F;&#x3002;</span>
<span class="hljs-comment">//es6&#x5199;&#x6CD5;-&#x9690;&#x5F0F;&#x8FD4;&#x56DE;</span>
sumArr(arr) {
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">pre, cur</span>) =&gt;</span>pre + cur)
}
<span class="hljs-comment">//es6&#x5199;&#x6CD5;-&#x663E;&#x5F0F;&#x8FD4;&#x56DE;</span>
sumArr(arr) {
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">pre, cur</span>) =&gt;</span>{<span class="hljs-keyword">return</span> pre + cur})
}
<span class="hljs-comment">//es5&#x5199;&#x6CD5;</span>
sumArr: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">pre, cur</span>) </span>{
        <span class="hljs-keyword">return</span> pre + cur
    })
},
</code></pre><p>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5E38;&#x7528;&#x7684;&#x573A;&#x666F;&#x662F;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x4E86;<code>setTimeout</code>&#x6216;&#x8005;<code>setInterval</code>&#x7684;&#x65F6;&#x5019;&#x3002;&#x5982;&#x4E0B;&#x2018;&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x5B9E;&#x4F8B;&#x2019;&#xFF08;&#x4EE3;&#x7801;&#x6682;&#x65F6;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x770B;&#x5F97;&#x592A;&#x7EC6;&#xFF0C;&#x770B;&#x56FE;&#x7247;&#x5C31;&#x597D;&#xFF0C;&#x8D34;&#x4EE3;&#x7801;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x5927;&#x5BB6;&#x770B;&#x5230;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x8BA9;&#x5927;&#x5BB6;&#x8499;&#xFF09;&#x3002;&#x8FC7;&#x7A0B;&#x4E0D;&#x8BE6;&#x7EC6;&#x8BF4;&#xFF0C;&#x770B;<code>es6</code>&#x548C;<code>es5</code>&#x7684;&#x4F7F;&#x7528;&#x533A;&#x522B;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es6&#x5199;&#x6CD5;&#xFF0C;&#xFF08;&#x5982;&#x679C;&#x770B;&#x5230;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x6709;&#x4E0D;&#x61C2;&#x7684;&#x4E0D;&#x7528;&#x6025;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x63D0;&#x5230;&#xFF01;&#xFF09;
loadImg(className = &apos;ec-load-img&apos;, num = 0, errorUrl = null) {
    let oImgLoad = document.getElementsByClassName(className);
    for (let i = 0, len = oImgLoad.length; i &lt; len; i++) {
        //&#x5982;&#x679C;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x6EDA;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x9AD8;&#x5EA6;
        if (document.documentElement.clientHeight + document.documentElement.scrollTop &gt; oImgLoad[i].offsetTop - num &amp;&amp; !oImgLoad[i].isLoad) {
            //&#x8BB0;&#x5F55;&#x56FE;&#x7247;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;
            oImgLoad[i].isLoad = true;
            //&#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#xFF0C;&#x5F53;&#x56FE;&#x7247;&#x4E0B;&#x6765;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x900F;&#x660E;&#x5EA6;&#x53D8;&#x5316;
            oImgLoad[i].style.cssText = &quot;transition: &apos;&apos;; opacity: 0;&quot;;
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, errorUrl, function (o) {
                    //&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;
                    setTimeout(()=&gt;{
                        if (o.isLoad) {
                            this.removeClass(o, className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(&quot;data-src&quot;), errorUrl, function (o) {
                    //&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;
                    setTimeout(()=&gt;{
                        if (o.isLoad) {
                            this.removeClass(o, className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(()=&gt;{
                    oImgLoad[i].style.cssText = &quot;transition:all 1s; opacity: 1;&quot;;
                }, 16)
            })(i);
        }
    }
}

//es5&#x5199;&#x6CD5;
loadImg: function (className, num, errorUrl) {
    var _className = className || &apos;ec-load-img&apos;, _num = num || 0, _this = this,_errorUrl=errorUrl||null;
    var oImgLoad = document.getElementsByClassName(_className);
    for (var i = 0, len = oImgLoad.length; i &lt; len; i++) {
        //&#x5982;&#x679C;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x6EDA;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x9AD8;&#x5EA6;
        if (document.documentElement.clientHeight + document.documentElement.scrollTop &gt; oImgLoad[i].offsetTop - _num &amp;&amp; !oImgLoad[i].isLoad) {
            //&#x8BB0;&#x5F55;&#x56FE;&#x7247;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;
            oImgLoad[i].isLoad = true;
            //&#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#xFF0C;&#x5F53;&#x56FE;&#x7247;&#x4E0B;&#x6765;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x900F;&#x660E;&#x5EA6;&#x53D8;&#x5316;
            oImgLoad[i].style.cssText = &quot;transition: &apos;&apos;; opacity: 0;&quot;
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {
                    //&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(&quot;data-src&quot;), _errorUrl, function (o) {
                    //&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(function () {
                    oImgLoad[i].style.cssText = &quot;transition:all 1s; opacity: 1;&quot;;
                }, 16)
            })(i);
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//es6&#x5199;&#x6CD5;&#xFF0C;&#xFF08;&#x5982;&#x679C;&#x770B;&#x5230;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x6709;&#x4E0D;&#x61C2;&#x7684;&#x4E0D;&#x7528;&#x6025;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x63D0;&#x5230;&#xFF01;&#xFF09;</span>
loadImg(className = <span class="hljs-string">&apos;ec-load-img&apos;</span>, num = <span class="hljs-number">0</span>, errorUrl = <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">let</span> oImgLoad = <span class="hljs-built_in">document</span>.getElementsByClassName(className);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = oImgLoad.length; i &lt; len; i++) {
        <span class="hljs-comment">//&#x5982;&#x679C;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x6EDA;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x9AD8;&#x5EA6;</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.documentElement.clientHeight + <span class="hljs-built_in">document</span>.documentElement.scrollTop &gt; oImgLoad[i].offsetTop - num &amp;&amp; !oImgLoad[i].isLoad) {
            <span class="hljs-comment">//&#x8BB0;&#x5F55;&#x56FE;&#x7247;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;</span>
            oImgLoad[i].isLoad = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#xFF0C;&#x5F53;&#x56FE;&#x7247;&#x4E0B;&#x6765;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x900F;&#x660E;&#x5EA6;&#x53D8;&#x5316;</span>
            oImgLoad[i].style.cssText = <span class="hljs-string">&quot;transition: &apos;&apos;; opacity: 0;&quot;</span>;
            <span class="hljs-keyword">if</span> (oImgLoad[i].dataset) {
                <span class="hljs-keyword">this</span>.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, errorUrl, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
                    <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                        <span class="hljs-keyword">if</span> (o.isLoad) {
                            <span class="hljs-keyword">this</span>.removeClass(o, className);
                            o.style.cssText = <span class="hljs-string">&quot;&quot;</span>;
                        }
                    }, <span class="hljs-number">1000</span>)
                });
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(<span class="hljs-string">&quot;data-src&quot;</span>), errorUrl, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
                    <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                        <span class="hljs-keyword">if</span> (o.isLoad) {
                            <span class="hljs-keyword">this</span>.removeClass(o, className);
                            o.style.cssText = <span class="hljs-string">&quot;&quot;</span>;
                        }
                    }, <span class="hljs-number">1000</span>)
                });
            }
            (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                    oImgLoad[i].style.cssText = <span class="hljs-string">&quot;transition:all 1s; opacity: 1;&quot;</span>;
                }, <span class="hljs-number">16</span>)
            })(i);
        }
    }
}

<span class="hljs-comment">//es5&#x5199;&#x6CD5;</span>
loadImg: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">className, num, errorUrl</span>) </span>{
    <span class="hljs-keyword">var</span> _className = className || <span class="hljs-string">&apos;ec-load-img&apos;</span>, _num = num || <span class="hljs-number">0</span>, _this = <span class="hljs-keyword">this</span>,_errorUrl=errorUrl||<span class="hljs-literal">null</span>;
    <span class="hljs-keyword">var</span> oImgLoad = <span class="hljs-built_in">document</span>.getElementsByClassName(_className);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = oImgLoad.length; i &lt; len; i++) {
        <span class="hljs-comment">//&#x5982;&#x679C;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x6EDA;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x9AD8;&#x5EA6;</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.documentElement.clientHeight + <span class="hljs-built_in">document</span>.documentElement.scrollTop &gt; oImgLoad[i].offsetTop - _num &amp;&amp; !oImgLoad[i].isLoad) {
            <span class="hljs-comment">//&#x8BB0;&#x5F55;&#x56FE;&#x7247;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;</span>
            oImgLoad[i].isLoad = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#xFF0C;&#x5F53;&#x56FE;&#x7247;&#x4E0B;&#x6765;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x900F;&#x660E;&#x5EA6;&#x53D8;&#x5316;</span>
            oImgLoad[i].style.cssText = <span class="hljs-string">&quot;transition: &apos;&apos;; opacity: 0;&quot;</span>
            <span class="hljs-keyword">if</span> (oImgLoad[i].dataset) {
                <span class="hljs-keyword">this</span>.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
                    <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-keyword">if</span> (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = <span class="hljs-string">&quot;&quot;</span>;
                        }
                    }, <span class="hljs-number">1000</span>)
                });
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(<span class="hljs-string">&quot;data-src&quot;</span>), _errorUrl, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
                    <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x786E;&#x4FDD;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x628A;&#x56FE;&#x7247;&#x6307;&#x5B9A;&#x7684;&#x7684;class&#xFF0C;&#x6E05;&#x6389;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x7F16;&#x8F91;</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-keyword">if</span> (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = <span class="hljs-string">&quot;&quot;</span>;
                        }
                    }, <span class="hljs-number">1000</span>)
                });
            }
            (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    oImgLoad[i].style.cssText = <span class="hljs-string">&quot;transition:all 1s; opacity: 1;&quot;</span>;
                }, <span class="hljs-number">16</span>)
            })(i);
        }
    }
}</code></pre><p>&#x4EE3;&#x7801;&#x8D34;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x5176;&#x5B9E;&#x533A;&#x522B;&#x5C31;&#x4E09;&#x5C0F;&#x5757;</p><p><span class="img-wrap"><img data-src="/img/bVX9Y5?w=1267&amp;h=434" src="https://static.alili.tech/img/bVX9Y5?w=1267&amp;h=434" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVX9YP?w=1102&amp;h=427" src="https://static.alili.tech/img/bVX9YP?w=1102&amp;h=427" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x7B80;&#x5355;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#xFF1A;&#x5F53;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x7684;this&#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x65F6;&#x6240;&#x5728;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4F7F;&#x7528;&#x65F6;&#x6240;&#x5728;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#xFF08;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;<code>setTimeout</code>&#x91CC;&#x9762;&#x7684;this&#xFF0C;&#x539F;&#x672C;&#x6307;&#x5411;window&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x6307;&#x5411;ecDo&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF09;<br>&#x539F;&#x56E0;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;this&#xFF0C;&#x5B83;&#x7684;this&#x662F;&#x7EE7;&#x627F;&#x5916;&#x9762;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5185;&#x90E8;&#x7684;this&#x5C31;&#x662F;&#x5916;&#x5C42;&#x4EE3;&#x7801;&#x5757;&#x7684;this&#x3002;</p><h2 id="articleHeader3">4.template string</h2><p>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x4E2A;&#x5E73;&#x5E38;&#x4F7F;&#x7528;&#x7684;&#x9891;&#x7387;&#x4E5F;&#x975E;&#x5E38;&#x9AD8;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x5F88;&#x5B9E;&#x7528;&#xFF01;</p><p>&#x5982;&#x4E0B;&#x5B9E;&#x4F8B;&#xFF1A;&#x5230;&#x67D0;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x7684;&#x5012;&#x8BA1;&#x65F6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es6&#x5199;&#x6CD5;
getEndTime(endTime) {
    let startDate = new Date(); //&#x5F00;&#x59CB;&#x65F6;&#x95F4;&#xFF0C;&#x5F53;&#x524D;&#x65F6;&#x95F4;
    let endDate = new Date(endTime); //&#x7ED3;&#x675F;&#x65F6;&#x95F4;&#xFF0C;&#x9700;&#x4F20;&#x5165;&#x65F6;&#x95F4;&#x53C2;&#x6570;
    let t = endDate.getTime() - startDate.getTime(); //&#x65F6;&#x95F4;&#x5DEE;&#x7684;&#x6BEB;&#x79D2;&#x6570;
    let d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t &gt;= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return `&#x5269;&#x4F59;&#x65F6;&#x95F4;${d}&#x5929;${h}&#x5C0F;&#x65F6;${m}&#x5206;&#x949F;${s}&#x79D2;&quot;`;
}
//es5&#x5199;&#x6CD5;
getEndTime: function (endTime) {
    var startDate = new Date(); //&#x5F00;&#x59CB;&#x65F6;&#x95F4;&#xFF0C;&#x5F53;&#x524D;&#x65F6;&#x95F4;
    var endDate = new Date(endTime); //&#x7ED3;&#x675F;&#x65F6;&#x95F4;&#xFF0C;&#x9700;&#x4F20;&#x5165;&#x65F6;&#x95F4;&#x53C2;&#x6570;
    var t = endDate.getTime() - startDate.getTime(); //&#x65F6;&#x95F4;&#x5DEE;&#x7684;&#x6BEB;&#x79D2;&#x6570;
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t &gt;= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return &quot;&#x5269;&#x4F59;&#x65F6;&#x95F4;&quot; + d + &quot;&#x5929; &quot; + h + &quot;&#x5C0F;&#x65F6; &quot; + m + &quot; &#x5206;&#x949F;&quot; + s + &quot; &#x79D2;&quot;;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//es6&#x5199;&#x6CD5;</span>
getEndTime(endTime) {
    <span class="hljs-keyword">let</span> startDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">//&#x5F00;&#x59CB;&#x65F6;&#x95F4;&#xFF0C;&#x5F53;&#x524D;&#x65F6;&#x95F4;</span>
    <span class="hljs-keyword">let</span> endDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(endTime); <span class="hljs-comment">//&#x7ED3;&#x675F;&#x65F6;&#x95F4;&#xFF0C;&#x9700;&#x4F20;&#x5165;&#x65F6;&#x95F4;&#x53C2;&#x6570;</span>
    <span class="hljs-keyword">let</span> t = endDate.getTime() - startDate.getTime(); <span class="hljs-comment">//&#x65F6;&#x95F4;&#x5DEE;&#x7684;&#x6BEB;&#x79D2;&#x6570;</span>
    <span class="hljs-keyword">let</span> d = <span class="hljs-number">0</span>,
        h = <span class="hljs-number">0</span>,
        m = <span class="hljs-number">0</span>,
        s = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (t &gt;= <span class="hljs-number">0</span>) {
        d = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> / <span class="hljs-number">3600</span> / <span class="hljs-number">24</span>);
        h = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> / <span class="hljs-number">60</span> / <span class="hljs-number">60</span> % <span class="hljs-number">24</span>);
        m = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> / <span class="hljs-number">60</span> % <span class="hljs-number">60</span>);
        s = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> % <span class="hljs-number">60</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">`&#x5269;&#x4F59;&#x65F6;&#x95F4;<span class="hljs-subst">${d}</span>&#x5929;<span class="hljs-subst">${h}</span>&#x5C0F;&#x65F6;<span class="hljs-subst">${m}</span>&#x5206;&#x949F;<span class="hljs-subst">${s}</span>&#x79D2;&quot;`</span>;
}
<span class="hljs-comment">//es5&#x5199;&#x6CD5;</span>
getEndTime: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">endTime</span>) </span>{
    <span class="hljs-keyword">var</span> startDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">//&#x5F00;&#x59CB;&#x65F6;&#x95F4;&#xFF0C;&#x5F53;&#x524D;&#x65F6;&#x95F4;</span>
    <span class="hljs-keyword">var</span> endDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(endTime); <span class="hljs-comment">//&#x7ED3;&#x675F;&#x65F6;&#x95F4;&#xFF0C;&#x9700;&#x4F20;&#x5165;&#x65F6;&#x95F4;&#x53C2;&#x6570;</span>
    <span class="hljs-keyword">var</span> t = endDate.getTime() - startDate.getTime(); <span class="hljs-comment">//&#x65F6;&#x95F4;&#x5DEE;&#x7684;&#x6BEB;&#x79D2;&#x6570;</span>
    <span class="hljs-keyword">var</span> d = <span class="hljs-number">0</span>,
        h = <span class="hljs-number">0</span>,
        m = <span class="hljs-number">0</span>,
        s = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (t &gt;= <span class="hljs-number">0</span>) {
        d = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> / <span class="hljs-number">3600</span> / <span class="hljs-number">24</span>);
        h = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> / <span class="hljs-number">60</span> / <span class="hljs-number">60</span> % <span class="hljs-number">24</span>);
        m = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> / <span class="hljs-number">60</span> % <span class="hljs-number">60</span>);
        s = <span class="hljs-built_in">Math</span>.floor(t / <span class="hljs-number">1000</span> % <span class="hljs-number">60</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&#x5269;&#x4F59;&#x65F6;&#x95F4;&quot;</span> + d + <span class="hljs-string">&quot;&#x5929; &quot;</span> + h + <span class="hljs-string">&quot;&#x5C0F;&#x65F6; &quot;</span> + m + <span class="hljs-string">&quot; &#x5206;&#x949F;&quot;</span> + s + <span class="hljs-string">&quot; &#x79D2;&quot;</span>;
}
</code></pre><p>&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x8FD8;&#x4E0D;&#x89C9;&#x5F97;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x600E;&#x4E48;&#x597D;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x63A5;&#x4E0B;&#x6765;&#x518D;&#x8BF4;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x6BD4;&#x5982;&#x5F80;&#x4E00;&#x4E2A;<code>div</code>&#x6DFB;&#x52A0;&#x4E00;&#x5927;&#x6BB5;&#x7684;<code>html</code>&#x5185;&#x5BB9;&#x65F6;&#x3002;es5&#x7684;&#x505A;&#x6CD5;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj={
    author:&apos;&#x5B88;&#x5019;&apos;,
    time:&apos;2017.11.8&apos;,
    thing:&apos;&#x770B;&#x4E0B;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x4FBF;&#x6027;&#x3002;&apos;
}
$(&quot;#test&quot;).append(
  &quot;&lt;p&gt;&#x8FD9;&#x662F;&lt;i&gt;&quot; + obj.author+ &quot;&lt;/i&gt; &quot; +
      &quot;&#x5199;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x662F;&#x4E3A;&#x4E86;&quot; +
      &quot;&lt;i&gt;&quot; + obj.thing +
      &quot;&lt;/i&gt;&quot;+&quot;&lt;span&gt;&#x5199;&#x4F5C;&#x65E5;&#x671F;&#x662F;&#xFF1A;&quot;+obj.time+
      &quot;&lt;/span&gt;&lt;/p&gt;&quot;
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>var obj={
    author:<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>,
    <span class="hljs-built_in">time</span>:<span class="hljs-string">&apos;2017.11.8&apos;</span>,
    thing:<span class="hljs-string">&apos;&#x770B;&#x4E0B;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x4FBF;&#x6027;&#x3002;&apos;</span>
}
$(<span class="hljs-string">&quot;#test&quot;</span>).<span class="hljs-built_in">append</span>(
  <span class="hljs-string">&quot;&lt;p&gt;&#x8FD9;&#x662F;&lt;i&gt;&quot;</span> + obj.author+ <span class="hljs-string">&quot;&lt;/i&gt; &quot;</span> +
      <span class="hljs-string">&quot;&#x5199;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x662F;&#x4E3A;&#x4E86;&quot;</span> +
      <span class="hljs-string">&quot;&lt;i&gt;&quot;</span> + obj.thing +
      <span class="hljs-string">&quot;&lt;/i&gt;&quot;</span>+<span class="hljs-string">&quot;&lt;span&gt;&#x5199;&#x4F5C;&#x65E5;&#x671F;&#x662F;&#xFF1A;&quot;</span>+obj.<span class="hljs-built_in">time</span>+
      <span class="hljs-string">&quot;&lt;/span&gt;&lt;/p&gt;&quot;</span>
);</code></pre><p>&#x800C;&#x4F7F;&#x7528;es6&#xFF0C;&#x5C31;&#x7B80;&#x5355;&#x591A;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj={
    author:&apos;&#x5B88;&#x5019;&apos;,
    time:&apos;2017.11.8&apos;,
    thing:&apos;&#x770B;&#x4E0B;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x4FBF;&#x6027;&#x3002;&apos;
}
$(&quot;#test&quot;).append(
  `&lt;p&gt;
      &#x8FD9;&#x662F;&lt;i&gt;${obj.author}&lt;/i&gt;
      &#x5199;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x662F;&#x4E3A;&#x4E86;
      &lt;i&gt; ${obj.thing}&lt;/i&gt;
      &lt;span&gt;&#x5199;&#x4F5C;&#x65E5;&#x671F;&#x662F;&#xFF1A;${obj.time}&lt;/span&gt;
   &lt;/p&gt;`
);    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">let obj=</span><span class="hljs-template-variable">{
    author:&apos;&#x5B88;&#x5019;&apos;,
    time:&apos;2017.11.8&apos;,
    thing:&apos;&#x770B;&#x4E0B;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x4FBF;&#x6027;&#x3002;&apos;
}</span><span class="xml">
$(&quot;#test&quot;).append(
  `<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      &#x8FD9;&#x662F;<span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>$</span><span class="hljs-template-variable">{obj.author}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
      &#x5199;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x662F;&#x4E3A;&#x4E86;
      <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span> $</span><span class="hljs-template-variable">{obj.thing}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&#x5199;&#x4F5C;&#x65E5;&#x671F;&#x662F;&#xFF1A;$</span><span class="hljs-template-variable">{obj.time}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>`
);    </span></code></pre><h2 id="articleHeader4">5.destructuring</h2><p>&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x8FD9;&#x4E2A;&#x7528;&#x5F97;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#xFF0C;&#x7B80;&#x5355;&#x660E;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5199;&#x65B9;&#x5F0F;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es5
var name=&apos;&#x5B88;&#x5019;&apos;
var sex=&apos;&#x7537;&apos;
var info= {name:name, sex: sex}
console.log(info)  //Object {name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;}

//es6
let name=&apos;&#x5B88;&#x5019;&apos;
let sex=&apos;&#x7537;&apos;
let info= {name, sex}
console.log(info)  //Object {name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;} 

//es6&#x4E5F;&#x53EF;&#x4EE5;&#x53CD;&#x8FC7;&#x6765; 
let info={name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;};
let {name,sex}=info;
console.log(name,sex)// &quot;&#x5B88;&#x5019;&quot; &quot;&#x7537;&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//es5</span>
<span class="hljs-keyword">var</span> name=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-keyword">var</span> sex=<span class="hljs-string">&apos;&#x7537;&apos;</span>
<span class="hljs-keyword">var</span> info= {<span class="hljs-attr">name</span>:name, <span class="hljs-attr">sex</span>: sex}
<span class="hljs-built_in">console</span>.log(info)  <span class="hljs-comment">//Object {name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;}</span>

<span class="hljs-comment">//es6</span>
<span class="hljs-keyword">let</span> name=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-keyword">let</span> sex=<span class="hljs-string">&apos;&#x7537;&apos;</span>
<span class="hljs-keyword">let</span> info= {name, sex}
<span class="hljs-built_in">console</span>.log(info)  <span class="hljs-comment">//Object {name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;} </span>

<span class="hljs-comment">//es6&#x4E5F;&#x53EF;&#x4EE5;&#x53CD;&#x8FC7;&#x6765; </span>
<span class="hljs-keyword">let</span> info={<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;&#x5B88;&#x5019;&quot;</span>, <span class="hljs-attr">sex</span>: <span class="hljs-string">&quot;&#x7537;&quot;</span>};
<span class="hljs-keyword">let</span> {name,sex}=info;
<span class="hljs-built_in">console</span>.log(name,sex)<span class="hljs-comment">// &quot;&#x5B88;&#x5019;&quot; &quot;&#x7537;&quot;</span>
</code></pre><h2 id="articleHeader5">6.default, rest</h2><p>default&#xFF0C;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5F88;&#x597D;&#x7406;&#x89E3;<br>&#x6BD4;&#x683C;&#x5F0F;&#x5316;&#x5904;&#x7406;&#x5B57;&#x7B26;&#x4E32;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es6&#x5199;&#x6CD5;
formatText(str, size = 3, delimiter = &apos;,&apos;) {
    let regText = &apos;\\B(?=(\\w{&apos; + size + &apos;})+(?!\\w))&apos;;
    let reg = new RegExp(regText, &apos;g&apos;);
    return str.replace(reg, delimiter);
}
//es5&#x5199;&#x6CD5;
formatText: function (str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || &apos;,&apos;;
    var regText = &apos;\\B(?=(\\w{&apos; + _size + &apos;})+(?!\\w))&apos;;
    var reg = new RegExp(regText, &apos;g&apos;);
    return str.replace(reg, _delimiter);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">//es6&#x5199;&#x6CD5;</span>
formatText(str, <span class="hljs-built_in">size</span> = <span class="hljs-number">3</span>, delimiter = <span class="hljs-string">&apos;,&apos;</span>) {
    <span class="hljs-keyword">let</span> regText = <span class="hljs-string">&apos;\\B(?=(\\w{&apos;</span> + <span class="hljs-built_in">size</span> + <span class="hljs-string">&apos;})+(?!\\w))&apos;</span>;
    <span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regText, <span class="hljs-string">&apos;g&apos;</span>);
    <span class="hljs-keyword">return</span> str.replace(reg, delimiter);
}
<span class="hljs-comment">//es5&#x5199;&#x6CD5;</span>
<span class="hljs-attribute">formatText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str, size, delimiter</span>) </span>{
    <span class="hljs-built_in">var</span> _size = <span class="hljs-built_in">size</span> || <span class="hljs-number">3</span>, _delimiter = delimiter || <span class="hljs-string">&apos;,&apos;</span>;
    <span class="hljs-built_in">var</span> regText = <span class="hljs-string">&apos;\\B(?=(\\w{&apos;</span> + _size + <span class="hljs-string">&apos;})+(?!\\w))&apos;</span>;
    <span class="hljs-built_in">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regText, <span class="hljs-string">&apos;g&apos;</span>);
    <span class="hljs-keyword">return</span> str.replace(reg, _delimiter);
}</code></pre><p>rest&#x8FD9;&#x4E2A;&#x6211;&#x4E0D;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x8BF4;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x5B9E;&#x4F8B;&#x5427;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function param(first,...all){
    console.log(first)
    console.log(all)
    console.log(Object.prototype.toString.call(all))
}
animals(&apos;&#x7B2C;&#x4E00;&#x4E2A;&apos;, &apos;&#x7B2C;&#x4E8C;&#x4E2A;&apos;, &apos;&#x7B2C;&#x4E09;&#x4E2A;&apos;)  
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">param</span><span class="hljs-params">(first,<span class="hljs-rest_arg">...all</span>)</span></span>{
    console.log(first)
    console.log(all)
    console.log(Object.prototype.toString.call(all))
}
animals(<span class="hljs-string">&apos;&#x7B2C;&#x4E00;&#x4E2A;&apos;</span>, <span class="hljs-string">&apos;&#x7B2C;&#x4E8C;&#x4E2A;&apos;</span>, <span class="hljs-string">&apos;&#x7B2C;&#x4E09;&#x4E2A;&apos;</span>)  
</code></pre><p><span class="img-wrap"><img data-src="/img/bVYac5?w=505&amp;h=137" src="https://static.alili.tech/img/bVYac5?w=505&amp;h=137" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#x5199;&#xFF0C;all&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x7528;&#x50CF;<code>arguments</code>&#x90A3;&#x6837;&#x8F6C;&#x6210;&#x6570;&#x7EC4;&#xFF01;</p><h2 id="articleHeader6">7.export &amp; import</h2><p>&#x8FD9;&#x4E24;&#x4E2A;&#x5BF9;&#x5E94;&#x7684;&#x5C31;&#x662F;&#x5BF9;&#x5E94;&#x7684;&#x7279;&#x6027;&#x5C31;&#x662F;&#xFF0C;&#x6A21;&#x5757;&#x5316;&#x5F00;&#x53D1;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x6700;&#x5B9E;&#x7528;&#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x7279;&#x6027;&#x4E86;&#xFF01;&#x529F;&#x80FD;&#x4E5F;&#x5F3A;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x5199;&#x8D77;&#x6765;&#x5C31;&#x5F88;&#x7B80;&#x5355;&#xFF01;&#x5C31;&#x51E0;&#x4E2A;&#x4EE3;&#x7801;&#xFF01;&#x770B;&#x56FE;&#x5427;&#xFF01;</p><p>&#x5C01;&#x88C5;&#x6A21;&#x5757;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7528;export&#x628A;&#x6A21;&#x5757;&#x66B4;&#x9732;&#x51FA;&#x53BB;</p><p><span class="img-wrap"><img data-src="/img/bVYadN?w=820&amp;h=363" src="https://static.alili.tech/img/bVYadN?w=820&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7528;import&#x5F15;&#x8FDB;&#x884C;&#x6765;&#xFF0C;&#x5B8C;&#x4E8B;</p><p><span class="img-wrap"><img data-src="/img/bVYadY?w=456&amp;h=31" src="https://static.alili.tech/img/bVYadY?w=456&amp;h=31" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x987A;&#x4FBF;&#x63D0;&#x4E00;&#x4E0B;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x6309;&#x9700;&#x5F15;&#x5165;&#x7684;&#x65B9;&#x6CD5;</p><p><span class="img-wrap"><img data-src="/img/bVYae2?w=786&amp;h=331" src="https://static.alili.tech/img/bVYae2?w=786&amp;h=331" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVYak6?w=373&amp;h=65" src="https://static.alili.tech/img/bVYak6?w=373&amp;h=65" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader7">8.API&#x63A8;&#x8350;</h2><h3 id="articleHeader8">8-1.&#x5B57;&#x7B26;&#x4E32;</h3><h4>repeat</h4><p>repeat&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8868;&#x793A;&#x5C06;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#x91CD;&#x590D;n&#x6B21;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;&#x5B88;&#x5019;&apos;.repeat(3)
//&quot;&#x5B88;&#x5019;&#x5B88;&#x5019;&#x5B88;&#x5019;&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code><span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>.<span class="hljs-keyword">repeat</span><span class="hljs-comment">(3)</span>
<span class="hljs-comment">//&quot;&#x5B88;&#x5019;&#x5B88;&#x5019;&#x5B88;&#x5019;&quot;</span></code></pre><h4>includes &amp; startsWith &amp; endsWith</h4><p><code>includes</code>&#xFF1A;&#x662F;&#x5426;&#x627E;&#x5230;&#x4E86;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;,&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#x3002;<br><code>startsWith</code>&#xFF1A;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5728;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5934;&#x90E8;,&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#x3002;<br><code>endsWith</code>&#xFF1A;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5728;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5C3E;&#x90E8;,&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#x3002;</p><p>&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F;&#x5F00;&#x59CB;&#x68C0;&#x7D22;&#x7684;&#x4F4D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&apos;&#x6211;&#x5C31;&#x662F;&#x5B88;&#x5019;&apos;
str.startsWith(&apos;&#x6211;&#x5C31;&#x662F;&apos;)//true
str.startsWith(&apos;&#x6211;&apos;)//true
str.startsWith(&apos;&#x6211;&apos;,2)//false
str.startsWith(&apos;&#x5B88;&#x5019;&apos;)//false
str.endsWith(&apos;&#x5B88;&#x5019;&apos;)//true
str.includes(&apos;&#x5B88;&#x5019;&apos;)//true
str.includes(&apos;&#x6211;&apos;,3)//false
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span>=<span class="hljs-string">&apos;&#x6211;&#x5C31;&#x662F;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-keyword">str</span>.startsWith(<span class="hljs-string">&apos;&#x6211;&#x5C31;&#x662F;&apos;</span>)<span class="hljs-comment">//true</span>
<span class="hljs-keyword">str</span>.startsWith(<span class="hljs-string">&apos;&#x6211;&apos;</span>)<span class="hljs-comment">//true</span>
<span class="hljs-keyword">str</span>.startsWith(<span class="hljs-string">&apos;&#x6211;&apos;</span>,<span class="hljs-number">2</span>)<span class="hljs-comment">//false</span>
<span class="hljs-keyword">str</span>.startsWith(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)<span class="hljs-comment">//false</span>
<span class="hljs-keyword">str</span>.endsWith(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)<span class="hljs-comment">//true</span>
<span class="hljs-keyword">str</span>.includes(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)<span class="hljs-comment">//true</span>
<span class="hljs-keyword">str</span>.includes(<span class="hljs-string">&apos;&#x6211;&apos;</span>,<span class="hljs-number">3</span>)<span class="hljs-comment">//false</span>
</code></pre><h4>padStart &amp; padEnd</h4><p><code>padStart</code>:&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x4E0D;&#x591F;&#x6307;&#x5B9A;&#x957F;&#x5EA6;&#xFF0C;&#x5728;&#x5934;&#x90E8;&#x8865;&#x5168;&#x6307;&#x5B9A;&#x5B57;&#x7B26;<br><code>padEnd</code>&#xFF1A;&#x5982;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x4E0D;&#x591F;&#x6307;&#x5B9A;&#x957F;&#x5EA6;&#xFF0C;&#x5728;&#x5C3E;&#x90E8;&#x8865;&#x5168;&#x6307;&#x5B9A;&#x5B57;&#x7B26;</p><p>&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6700;&#x5C0F;&#x957F;&#x5EA6;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x7528;&#x6765;&#x8865;&#x5168;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x5982;&#x679C;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x7B49;&#x4E8E;&#x6216;&#x5927;&#x4E8E;&#x6307;&#x5B9A;&#x7684;&#x6700;&#x5C0F;&#x957F;&#x5EA6;&#xFF08;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF09;&#x3002;&#x5C31;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5982;&#x679C;&#x5FFD;&#x7565;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x4F7F;&#x7528;&#x7A7A;&#x683C;&#x8865;&#x5168;&#x539F;&#x5B57;&#x7B26;&#x4E32;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&apos;&#x5B88;&#x5019;&apos;
str.padEnd(10,&apos;123&apos;)//&quot;&#x5B88;&#x5019;12312312&quot;
str.padStart(10,&apos;123&apos;)//&quot;12312312&#x5B88;&#x5019;&quot;
str.padEnd(10)//&quot;&#x5B88;&#x5019;        &quot;
str.padStart(10)//&quot;        &#x5B88;&#x5019;&quot;
str.padStart(1)//&quot;&#x5B88;&#x5019;&quot;
str.padEnd(1)//&quot;&#x5B88;&#x5019;&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span>=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-keyword">str</span>.padEnd(<span class="hljs-number">10</span>,<span class="hljs-string">&apos;123&apos;</span>)<span class="hljs-comment">//&quot;&#x5B88;&#x5019;12312312&quot;</span>
<span class="hljs-keyword">str</span>.padStart(<span class="hljs-number">10</span>,<span class="hljs-string">&apos;123&apos;</span>)<span class="hljs-comment">//&quot;12312312&#x5B88;&#x5019;&quot;</span>
<span class="hljs-keyword">str</span>.padEnd(<span class="hljs-number">10</span>)<span class="hljs-comment">//&quot;&#x5B88;&#x5019;        &quot;</span>
<span class="hljs-keyword">str</span>.padStart(<span class="hljs-number">10</span>)<span class="hljs-comment">//&quot;        &#x5B88;&#x5019;&quot;</span>
<span class="hljs-keyword">str</span>.padStart(<span class="hljs-number">1</span>)<span class="hljs-comment">//&quot;&#x5B88;&#x5019;&quot;</span>
<span class="hljs-keyword">str</span>.padEnd(<span class="hljs-number">1</span>)<span class="hljs-comment">//&quot;&#x5B88;&#x5019;&quot;</span></code></pre><h3 id="articleHeader9">8-2.&#x6570;&#x503C;</h3><h4>isNaN</h4><p>&#x68C0;&#x67E5;&#x4E00;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x4E3A;NaN</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isNaN(NaN)//true
Number.isNaN(15)//false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>)<span class="hljs-comment">//true</span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-number">15</span>)<span class="hljs-comment">//false</span></code></pre><h4>isInteger</h4><p>&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x4E3A;&#x6574;&#x6570;,&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x6BD4;&#x5982;1&#x548C;1.0&#x90FD;&#x662F;&#x6574;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isInteger(1)//true
Number.isInteger(1.0)//true
Number.isInteger(1.1)//false
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code><span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">1</span>)//<span class="hljs-literal">true</span>
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">1.0</span>)//<span class="hljs-literal">true</span>
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">1.1</span>)//<span class="hljs-literal">false</span>
</code></pre><h4>sign</h4><p>&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x6570;&#x5230;&#x5E95;&#x662F;&#x6B63;&#x6570;&#x3001;&#x8D1F;&#x6570;&#x3001;&#x8FD8;&#x662F;&#x96F6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.sign(-10)// -1
Math.sign(10)// +1
Math.sign(0)// +0
Math.sign(-0)// -0
Math.sign(NaN)// NaN
Math.sign(&apos;10&apos;)// +1
Math.sign(&apos;&#x5B88;&#x5019;&apos;)// NaN
Math.sign(&apos;&apos;)// 0
Math.sign(true)// +1
Math.sign(false)// 0
Math.sign(null)// 0
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-10</span>)<span class="hljs-comment">// -1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">10</span>)<span class="hljs-comment">// +1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">0</span>)<span class="hljs-comment">// +0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-0</span>)<span class="hljs-comment">// -0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-literal">NaN</span>)<span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-string">&apos;10&apos;</span>)<span class="hljs-comment">// +1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)<span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-string">&apos;&apos;</span>)<span class="hljs-comment">// 0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-literal">true</span>)<span class="hljs-comment">// +1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-literal">false</span>)<span class="hljs-comment">// 0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-literal">null</span>)<span class="hljs-comment">// 0</span>
</code></pre><h4>trunc</h4><p>&#x53BB;&#x9664;&#x4E00;&#x4E2A;&#x6570;&#x7684;&#x5C0F;&#x6570;&#x90E8;&#x5206;&#xFF0C;&#x8FD4;&#x56DE;&#x6574;&#x6570;&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.trunc(1.1)//1
Math.trunc(-1.1)//-1
Math.trunc(-0.1)//-0
Math.trunc(&apos;123.456&apos;)//123
Math.trunc(&apos;&#x5B88;&#x5019;&apos;)//NaN
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">1.1</span>)<span class="hljs-comment">//1</span>
<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">-1.1</span>)<span class="hljs-comment">//-1</span>
<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">-0.1</span>)<span class="hljs-comment">//-0</span>
<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-string">&apos;123.456&apos;</span>)<span class="hljs-comment">//123</span>
<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)<span class="hljs-comment">//NaN</span>
</code></pre><h3 id="articleHeader10">8-3.&#x5BF9;&#x8C61;</h3><h4>assign</h4><p>&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x7684;&#x5408;&#x5E76;&#xFF0C;&#x590D;&#x5236;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _name={name:&apos;&#x5B88;&#x5019;&apos;},sex={sex:&apos;&#x7537;&apos;},city={&apos;city&apos;:&apos;&#x5E7F;&#x5DDE;&apos;}
Object.assign(_name,sex,city)//{name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;, city: &quot;&#x5E7F;&#x5DDE;&quot;}

var info1={name:&apos;&#x5B88;&apos;,sex:&apos;&#x7537;&apos;},info2={name:&apos;&#x5019;&apos;,city:&apos;&#x5E7F;&#x5DDE;&apos;}
Object.assign(info1,info2)//{name: &quot;&#x5019;&quot;, sex: &quot;&#x7537;&quot;, city: &quot;&#x5E7F;&#x5DDE;&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>var _name={name:<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>},sex={sex:<span class="hljs-string">&apos;&#x7537;&apos;</span>},city={<span class="hljs-string">&apos;city&apos;</span>:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>}
Object.assign(_name,sex,city)//{name: <span class="hljs-string">&quot;&#x5B88;&#x5019;&quot;</span>, sex: <span class="hljs-string">&quot;&#x7537;&quot;</span>, city: <span class="hljs-string">&quot;&#x5E7F;&#x5DDE;&quot;</span>}

var info1={name:<span class="hljs-string">&apos;&#x5B88;&apos;</span>,sex:<span class="hljs-string">&apos;&#x7537;&apos;</span>},info2={name:<span class="hljs-string">&apos;&#x5019;&apos;</span>,city:<span class="hljs-string">&apos;&#x5E7F;&#x5DDE;&apos;</span>}
Object.assign(info1,info2)//{name: <span class="hljs-string">&quot;&#x5019;&quot;</span>, sex: <span class="hljs-string">&quot;&#x7537;&quot;</span>, city: <span class="hljs-string">&quot;&#x5E7F;&#x5DDE;&quot;</span>}</code></pre><p>&#x514B;&#x9686;&#x539F;&#x6765;&#x8FD9;&#x6837;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x6837;&#x514B;&#x9686;&#x5BF9;&#x8C61;&#xFF0C;&#x4FEE;&#x6539;&#x4E86;info1&#x6216;&#x8005;info3&#xFF0C;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;info3&#x6216;&#x8005;info1&#xFF0C;&#x4F46;&#x662F;Object.assign&#x5E76;&#x4E0D;&#x662F;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;&#x8BE6;&#x7EC6;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x4E4B;&#x524D;&#x7684;&#x6587;&#x7AE0;--<a href="https://segmentfault.com/a/1190000011031658#articleHeader2">&#x5BF9;&#x8C61;&#x6DF1;&#x6D45;&#x62F7;&#x8D1D;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var info1={name:&apos;&#x5B88;&apos;,sex:&apos;&#x7537;&apos;}
var info3=Object.assign(info1,{})//{name:&apos;&#x5B88;&apos;,sex:&apos;&#x7537;&apos;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> info1={name:<span class="hljs-string">&apos;&#x5B88;&apos;</span>,sex:<span class="hljs-string">&apos;&#x7537;&apos;</span>}
<span class="hljs-selector-tag">var</span> info3=Object.assign(info1,{})<span class="hljs-comment">//{name:&apos;&#x5B88;&apos;,sex:&apos;&#x7537;&apos;}</span></code></pre><h4>keys</h4><p>&#x6839;&#x636E;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x53EF;&#x904D;&#x5386;&#x7684;&#x952E;&#x540D;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var info={name: &quot;&#x5B88;&#x5019;&quot;, sex: &quot;&#x7537;&quot;, city: &quot;&#x5E7F;&#x5DDE;&quot;}
Object.keys(info)//[&quot;name&quot;, &quot;sex&quot;, &quot;city&quot;]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">info</span>={<span class="hljs-built_in">na</span><span class="hljs-symbol">me:</span> <span class="hljs-string">&quot;&#x5B88;&#x5019;&quot;</span>, s<span class="hljs-symbol">ex:</span> <span class="hljs-string">&quot;&#x7537;&quot;</span>, ci<span class="hljs-symbol">ty:</span> <span class="hljs-string">&quot;&#x5E7F;&#x5DDE;&quot;</span>}
Object.keys(<span class="hljs-built_in">info</span>)//[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;sex&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>]
</code></pre><h4>values</h4><p>&#x6839;&#x636E;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x53EF;&#x904D;&#x5386;&#x7684;&#x952E;&#x503C;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.values(info)//[&quot;&#x5B88;&#x5019;&quot;, &quot;&#x7537;&quot;, &quot;&#x5E7F;&#x5DDE;&quot;]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code><span class="hljs-symbol">Object.values</span>(<span class="hljs-meta">info</span>)//[<span class="hljs-string">&quot;&#x5B88;&#x5019;&quot;</span>, <span class="hljs-string">&quot;&#x7537;&quot;</span>, <span class="hljs-string">&quot;&#x5E7F;&#x5DDE;&quot;</span>]
</code></pre><h4>entries</h4><p>&#x6839;&#x636E;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x53EF;&#x904D;&#x5386;&#x7684;&#x952E;&#x503C;&#x5BF9;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.entries(info)//[[&quot;name&quot;, &quot;&#x5B88;&#x5019;&quot;],[&quot;sex&quot;, &quot;&#x7537;&quot;],[&quot;city&quot;, &quot;&#x5E7F;&#x5DDE;&quot;]]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code><span class="hljs-symbol">Object</span>.entries(info)//[[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;&#x5B88;&#x5019;&quot;</span>],[<span class="hljs-string">&quot;sex&quot;</span>, <span class="hljs-string">&quot;&#x7537;&quot;</span>],[<span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;&#x5E7F;&#x5DDE;&quot;</span>]]
</code></pre><h3 id="articleHeader11">8-4.&#x6570;&#x7EC4;</h3><h4>from</h4><p><code>from</code>&#x7528;&#x4E8E;&#x5C06;&#x4E24;&#x7C7B;&#x5BF9;&#x8C61;&#x8F6C;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#xFF1A;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;&#x5BF9;&#x8C61;&#x548C;&#x53EF;&#x904D;&#x5386;&#x7684;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.from(&apos;&#x5B88;&#x5019;&apos;)//[&quot;&#x5B88;&quot;, &quot;&#x5019;&quot;]
//&#x5E38;&#x89C1;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x8FD8;&#x6709;-&#x5C06;Dom&#x96C6;&#x5408;&#x548C;arguments&#x8F6C;&#x6210;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;
let oLi = document.querySelectorAll(&apos;li&apos;);
Array.from(oLi ).forEach(function (item) {
  console.log(item);
});

// arguments&#x5BF9;&#x8C61;
function fn() {
  let args = Array.from(arguments);
}
//&#x987A;&#x4FBF;&#x8BF4;&#x4E0B;Set
let newSet = new Set([&apos;a&apos;, &apos;b&apos;,&apos;a&apos;,&apos;c&apos;])
Array.from(newSet) // [&apos;a&apos;, &apos;b&apos;,&apos;c&apos;] 
//ES6 &#x65B0;&#x589E;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;--Set&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F;&#x6210;&#x5458;&#x7684;&#x503C;&#x90FD;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x4E0D;&#x91CD;&#x590D;&#x7684;&#x3002;
//&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5F88;&#x5BB9;&#x6613;&#x60F3;&#x5230;&#x600E;&#x4E48;&#x7528;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x7528;Set&#x5B9E;&#x73B0;&#x5C31;&#x7B80;&#x5355;&#x591A;&#x4E86;&#x3002;   
removeRepeatArray(arr) {
    //return [Array.from(arr)]
    return [...new Set(arr)]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.from(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)<span class="hljs-comment">//[&quot;&#x5B88;&quot;, &quot;&#x5019;&quot;]</span>
<span class="hljs-comment">//&#x5E38;&#x89C1;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x8FD8;&#x6709;-&#x5C06;Dom&#x96C6;&#x5408;&#x548C;arguments&#x8F6C;&#x6210;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">let</span> oLi = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>);
<span class="hljs-built_in">Array</span>.from(oLi ).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
  <span class="hljs-built_in">console</span>.log(item);
});

<span class="hljs-comment">// arguments&#x5BF9;&#x8C61;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> args = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>);
}
<span class="hljs-comment">//&#x987A;&#x4FBF;&#x8BF4;&#x4E0B;Set</span>
<span class="hljs-keyword">let</span> newSet = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>])
<span class="hljs-built_in">Array</span>.from(newSet) <span class="hljs-comment">// [&apos;a&apos;, &apos;b&apos;,&apos;c&apos;] </span>
<span class="hljs-comment">//ES6 &#x65B0;&#x589E;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;--Set&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F;&#x6210;&#x5458;&#x7684;&#x503C;&#x90FD;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x4E0D;&#x91CD;&#x590D;&#x7684;&#x3002;</span>
<span class="hljs-comment">//&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5F88;&#x5BB9;&#x6613;&#x60F3;&#x5230;&#x600E;&#x4E48;&#x7528;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x7528;Set&#x5B9E;&#x73B0;&#x5C31;&#x7B80;&#x5355;&#x591A;&#x4E86;&#x3002;   </span>
removeRepeatArray(arr) {
    <span class="hljs-comment">//return [Array.from(arr)]</span>
    <span class="hljs-keyword">return</span> [...new <span class="hljs-built_in">Set</span>(arr)]
}</code></pre><h4>find</h4><p><code>find</code>&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x627E;&#x51FA;&#x7B2C;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6570;&#x7EC4;&#x6210;&#x5458;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x627E;&#x5230;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6210;&#x5458;&#x5C31;&#x8FD4;&#x56DE;<code>underfind</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7B2C;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;2&#x7684;&#x6210;&#x5458;
[1, 2, 3, 4].find((n) =&gt; n &gt; 2)//3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">//&#x7B2C;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;2&#x7684;&#x6210;&#x5458;</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].find((n) =&gt; n &gt; <span class="hljs-number">2</span>)<span class="hljs-comment">//3</span></code></pre><h4>findIndex</h4><p><code>findIndex</code>&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x627E;&#x51FA;&#x7B2C;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6570;&#x7EC4;&#x6210;&#x5458;&#x7684;&#x7D22;&#x5F15;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7B2C;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;2&#x7684;&#x6210;&#x5458;&#x7684;&#x7D22;&#x5F15;
[1, 2, 3, 4].findIndex((n) =&gt; n &gt; 2)//2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">//&#x7B2C;&#x4E00;&#x4E2A;&#x5927;&#x4E8E;2&#x7684;&#x6210;&#x5458;&#x7684;&#x7D22;&#x5F15;</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].findIndex((n) =&gt; n &gt; <span class="hljs-number">2</span>)<span class="hljs-comment">//2</span></code></pre><h4>includes</h4><p><code>includes</code>&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x67D0;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5305;&#x542B;&#x7ED9;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x627E;&#x5230;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x6210;&#x5458;&#x5C31;&#x8FD4;&#x56DE;<code>underfind</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].includes(2)//true
[1, 2, 3].includes(5)//false
[1, 2, NaN].includes(NaN)//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">2</span>)<span class="hljs-comment">//true</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].includes(<span class="hljs-number">5</span>)<span class="hljs-comment">//false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, NaN].includes(NaN)<span class="hljs-comment">//true</span></code></pre><h2 id="articleHeader12">9.&#x5C0F;&#x7ED3;</h2><p>&#x597D;&#x4E86;&#xFF0C;&#x5173;&#x4E8E;es6&#x7684;&#x5E38;&#x7528;&#x8BED;&#x6CD5;&#x548C;&#x6BD4;es5&#x4F18;&#x8D8A;&#x7684;&#x65B9;&#x9762;&#x533A;&#x522B;&#xFF0C;&#x5C31;&#x8BF4;&#x5230;&#x8FD9;&#x91CC;&#x4E86;&#xFF0C;&#x8FD9;&#x4E9B;&#x662F;&#x6211;&#x5728;&#x5E73;&#x5E38;&#x5F00;&#x53D1;&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#x3002;&#x5982;&#x679C;&#x60F3;&#x8BE6;&#x7EC6;&#x5B66;&#x4E60;es6&#xFF0C;&#x79FB;&#x6B65;&#x5230;&#x962E;&#x4E00;&#x5CF0;&#x7684;-<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8;</a>&#x3002;&#x8FD9;&#x4E9B;&#x8BED;&#x6CD5;&#x76F8;&#x4FE1;&#x5728;&#x5F00;&#x53D1;&#x4E86;&#x5DF2;&#x7ECF;&#x5360;&#x4E86;&#x5F88;&#x5927;&#x7684;&#x4E00;&#x4E2A;&#x6BD4;&#x91CD;&#x4E86;&#xFF01;&#x5F53;&#x7136;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;API&#x63A8;&#x8350;&#xFF0C;&#x6216;&#x8005;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#xFF0C;&#x6B22;&#x8FCE;&#x7ED9;&#x51FA;&#x5B9D;&#x8D35;&#x7684;&#x610F;&#x89C1;&#xFF0C;&#x6307;&#x70B9;&#x4E0B;&#x8FF7;&#x6D25;&#x3002;&#x4E5F;&#x671F;&#x5F85;&#x5927;&#x5BB6;&#x76F8;&#x4E92;&#x5B66;&#x4E60;&#xFF0C;&#x4E00;&#x8D77;&#x8FDB;&#x6B65;&#xFF01;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实例感受-es6的常用语法和优越性

## 原文链接
[https://segmentfault.com/a/1190000011976770](https://segmentfault.com/a/1190000011976770)


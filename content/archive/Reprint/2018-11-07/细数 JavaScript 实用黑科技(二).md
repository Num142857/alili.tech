---
title: 细数 JavaScript 实用黑科技(二)
hidden: true
categories: reprint
slug: fb8c4939
date: 2018-11-07 02:30:13
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016507838" src="https://static.alili.tech/img/remote/1460000016507838" alt="JavaScript" title="JavaScript" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x4E66;&#x63A5;&#x4E0A;&#x6587;&#xFF1A;<a href="https://segmentfault.com/a/1190000016507835">&#x7EC6;&#x6570; JavaScript &#x5B9E;&#x7528;&#x9ED1;&#x79D1;&#x6280;(&#x4E00;)</a></p><p>&#x672C;&#x6587;&#x4ECB;&#x7ECD; &#x72EC;&#x5B64;&#x4E5D;&#x5251;&#x548C;&#x4E24;&#x7BC7;&#x6700;&#x9AD8;&#x5185;&#x529F;&#x5FC3;&#x6CD5;&#x3002;</p><h1 id="articleHeader1">&#x7B2C;&#x4E00;&#x5F0F;. !!</h1><p>!! &#x64CD;&#x4F5C;&#x7B26;&#xFF1A;!!variable &#x3002;<br>!! &#x53EF;&#x4EE5;&#x5C06;&#x53D8;&#x91CF;&#x8F6C;&#x6362;&#x4E3A;&#x5E03;&#x5C14;&#x503C;&#x3002;<br>!! &#x53EF;&#x4EE5;&#x628A;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x8F6C;&#x6362;&#x4E3A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x6709;&#x5F53;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4E3A; 0 / null / &quot;&quot; / NaN / undefined &#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x8FD4;&#x56DE; false&#xFF0C;&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x90FD;&#x8FD4;&#x56DE; true&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!!&apos;&apos; 
// false
!!&apos; &apos;
// true
!!0
// false
!!null
// false
!!undefined
// false
!!NaN
// false
!!123
// true
!![]
// true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs erlang-repl"><code>!!<span class="hljs-string">&apos;&apos;</span> 
// false
!!<span class="hljs-string">&apos; &apos;</span>
// true
!!<span class="hljs-number">0</span>
// false
!!null
// false
!!undefined
// false
!!NaN
// false
!!<span class="hljs-number">123</span>
// true
!![]
// true</code></pre><h1 id="articleHeader2">&#x7B2C;&#x4E8C;&#x5F0F;. +</h1><p>&#x5B83;&#x53EA;&#x80FD;&#x4F5C;&#x7528;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x4F1A;&#x8FD4;&#x56DE; NaN&#xFF08;&#x4E0D;&#x662F;&#x6570;&#x5B57;&#xFF09;&#x3002;<br>&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toNumber(strNumber) {
    return +strNumber;
}
console.log(toNumber(&quot;1234&quot;)); 
// 1234
console.log(toNumber(&quot;abc&quot;));
 // NaN" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toNumber</span>(<span class="hljs-params">strNumber</span>) </span>{
    <span class="hljs-keyword">return</span> +strNumber;
}
<span class="hljs-built_in">console</span>.log(toNumber(<span class="hljs-string">&quot;1234&quot;</span>)); 
<span class="hljs-comment">// 1234</span>
<span class="hljs-built_in">console</span>.log(toNumber(<span class="hljs-string">&quot;abc&quot;</span>));
 <span class="hljs-comment">// NaN</span></code></pre><p>&#x5E76;&#x4E14;&#x6B64;&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4F5C;&#x7528;&#x4E8E; Date &#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x662F;&#x5B83;&#x5C06;&#x8FD4;&#x56DE;&#x65F6;&#x95F4;&#x6233;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(+new Date()) 
// 1461288164385" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>console.<span class="hljs-built_in">log</span>(+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()) 
<span class="hljs-comment">// 1461288164385</span></code></pre><h1 id="articleHeader3">&#x7B2C;&#x4E09;&#x5F0F;. if (&#x6761;&#x4EF6;)</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (token) {
    getUser();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code><span class="hljs-keyword">if</span> <span class="hljs-comment">(token)</span> {
    getUser<span class="hljs-comment">()</span>;
}</code></pre><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F7F;&#x7528; &amp;&amp; &#x64CD;&#x4F5C;&#x7B26;&#x7EC4;&#x5408;&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#x6765;&#x7F29;&#x77ED;&#x5B83;&#x3002;</p><p>&#x6BD4;&#x5982;&#x524D;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x7F29;&#x77ED;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="token &amp;&amp; getUser();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code style="word-break:break-word;white-space:initial"><span class="hljs-function">token &amp;&amp; <span class="hljs-title">getUser</span><span class="hljs-params">()</span></span>;</code></pre><h1 id="articleHeader4">&#x7B2C;&#x56DB;&#x5F0F;. &#x77ED;&#x8DEF;&#x8868;&#x8FBE;&#x5F0F; ||</h1><p>&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x8FD4;&#x56DE; false&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x503C;&#x5C06;&#x88AB;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUser(token) {
    var token = token || &quot;XXXXXXXXXX&quot;;
    console.log(&apos;token&apos;,token)
    // &#x7528; token &#x6765;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x6570;&#x636E;
    // .......
}
getUser(666666);
// 666666
getUser();
// XXXXXXXXXX" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>function getUser(<span class="hljs-keyword">token</span>) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">token</span> = <span class="hljs-keyword">token</span> || <span class="hljs-string">&quot;XXXXXXXXXX&quot;</span>;
    console.<span class="hljs-built_in">log</span>(&apos;<span class="hljs-keyword">token</span>&apos;,<span class="hljs-keyword">token</span>)
    <span class="hljs-comment">// &#x7528; token &#x6765;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x6570;&#x636E;</span>
    <span class="hljs-comment">// .......</span>
}
getUser(666666);
<span class="hljs-comment">// 666666</span>
getUser();
<span class="hljs-comment">// XXXXXXXXXX</span></code></pre><p>&#x5F53;&#x7136;&#xFF0C;ES6 &#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x9ED8;&#x8BA4;&#x503C;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x4E86;&#x3002;<br>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x5B66;&#x5230;&#x66F4;&#x591A;&#x5DE5;&#x4F5C;&#x4E2D;&#x4F1A;&#x7528;&#x5230;&#x7684; ES6 &#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x8BF7;&#x770B;&#x5C0F;&#x6C6A;&#x5199;&#x8FC7;&#x7684;&#xFF1A;<a href="https://segmentfault.com/a/1190000016460779" target="_blank">&#x90A3;&#x4E9B;&#x5FC5;&#x4F1A;&#x7528;&#x5230;&#x7684; ES6 &#x7CBE;&#x7CB9;</a></p><h1 id="articleHeader5">&#x7B2C;&#x4E94;&#x5F0F;. &#x83B7;&#x53D6;&#x6570;&#x7EC4;&#x4E2D;&#x6700;&#x540E;&#x7684;&#x5143;&#x7D20;</h1><p>&#x5927;&#x591A;&#x6570;&#x4EBA;&#x7684;&#x505A;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [123, 456, 789];
var len = arr.length;
var end = arr[len-1]
console.log(&apos;end:&apos;, end)
// &apos;end:&apos; 789" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cal"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">123</span>, <span class="hljs-number">456</span>, <span class="hljs-number">789</span>];
<span class="hljs-keyword">var</span> len = arr.length;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">end</span> = arr[len-<span class="hljs-number">1</span>]
console.log(<span class="hljs-string">&apos;end:&apos;</span>, <span class="hljs-keyword">end</span>)
// <span class="hljs-string">&apos;end:&apos;</span> <span class="hljs-number">789</span></code></pre><p>&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1, 2, 3, 4, 5, 6];
console.log( array.slice(-1) ); // [6]
console.log( array.slice(-1)[0] ); // 6
console.log( array.slice(-2) ); // [5,6]
console.log( array.slice(-3) ); // [4,5,6]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];
console.log( array.slice(<span class="hljs-number">-1</span>) ); <span class="hljs-comment">// [6]</span>
console.log( array.slice(<span class="hljs-number">-1</span>)[<span class="hljs-number">0</span>] ); <span class="hljs-comment">// 6</span>
console.log( array.slice(<span class="hljs-number">-2</span>) ); <span class="hljs-comment">// [5,6]</span>
console.log( array.slice(<span class="hljs-number">-3</span>) ); <span class="hljs-comment">// [4,5,6]</span></code></pre><h1 id="articleHeader6">&#x7B2C;&#x516D;&#x5F0F;. &#x6253;&#x4E71;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;</h1><p>&#x4E0D;&#x9002;&#x7528; Lodash &#x7B49;&#x8FD9;&#x4E9B;&#x5E93;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x987A;&#x5E8F;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6280;&#x5DE7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var list = [1,2,3];
console.log( list.sort(function() { Math.random() - 0.5 }) ); // [2,1,3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">list</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">list</span>.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span> }) ); <span class="hljs-comment">// [2,1,3]</span></code></pre><h1 id="articleHeader7">&#x7B2C;&#x4E03;&#x5F0F;. &#x4F2A;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x771F;&#x6570;&#x7EC4;</h1><p>&#x6570;&#x7EC4;&#x7684; slice&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5C06;&#x201C;&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;&#x5BF9;&#x8C61;&#x201D;&#x53D8;&#x6210;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#x3002;<br>var arr = Array.prototype.slice.call(arrayLike);</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = document.querySelectorAll(&quot;p&quot;); 
 // NodeList &#x8282;&#x70B9;&#x5217;&#x8868;&#x5BF9;&#x8C61;&#x3002;&#x4F46;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5E76;&#x4E0D;&#x5177;&#x6709;&#x6570;&#x7EC4;&#x7684;&#x5168;&#x90E8;&#x65B9;&#x6CD5;&#xFF0C;&#x5982; sort(), reduce(), map(), filter()
var arrayElements = [].slice.call( elements ); 
// &#x73B0;&#x5728; NodeList &#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;
var arrayElements = Array.from( elements ); 
// &#x8FD9;&#x662F;&#x53E6;&#x4E00;&#x79CD;&#x8F6C;&#x6362; NodeList &#x5230; Array  &#x7684;&#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> elements = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">&quot;p&quot;</span>); 
 <span class="hljs-comment">// NodeList &#x8282;&#x70B9;&#x5217;&#x8868;&#x5BF9;&#x8C61;&#x3002;&#x4F46;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5E76;&#x4E0D;&#x5177;&#x6709;&#x6570;&#x7EC4;&#x7684;&#x5168;&#x90E8;&#x65B9;&#x6CD5;&#xFF0C;&#x5982; sort(), reduce(), map(), filter()</span>
<span class="hljs-keyword">var</span> arrayElements = [].slice.call( elements ); 
<span class="hljs-comment">// &#x73B0;&#x5728; NodeList &#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> arrayElements = Array.from( elements ); 
<span class="hljs-comment">// &#x8FD9;&#x662F;&#x53E6;&#x4E00;&#x79CD;&#x8F6C;&#x6362; NodeList &#x5230; Array  &#x7684;&#x65B9;&#x6CD5;</span></code></pre><h1 id="articleHeader8">&#x7B2C;&#x516B;&#x5F0F;. &#x622A;&#x65AD;&#x6570;&#x7EC4;</h1><p>&#x6BD4;&#x5982;&#xFF0C;&#x5F53;&#x6570;&#x7EC4;&#x4E2D;&#x6709; 10 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x4F60;&#x53EA;&#x60F3;&#x83B7;&#x53D6;&#x5176;&#x4E2D;&#x524D; 5 &#x4E2A;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x622A;&#x65AD;&#x6570;&#x7EC4;&#xFF0C;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E; array.length = 5 &#x4F7F;&#x5176;&#x66F4;&#x5C0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = [1,2,3,4,5,6];
console.log( array.length ); 
// 6
array.length = 3;
console.log( array.length );
 // 3
console.log( array ); 
// [1,2,3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smali"><code>var<span class="hljs-built_in"> array </span>= [1,2,3,4,5,6];
console.log( array.length ); 
// 6
array.length = 3;
console.log( array.length );
 // 3
console.log(<span class="hljs-built_in"> array </span>); 
// [1,2,3]</code></pre><h1 id="articleHeader9">&#x7B2C;&#x4E5D;&#x5F0F;. &#x5408;&#x5E76;&#x6570;&#x7EC4;</h1><p>&#x4E00;&#x822C;&#x4EBA;&#x5408;&#x5E76;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x8BDD;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x4F7F;&#x7528; Array.concat()&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.concat(array2)); // [1,2,3,4,5,6];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var array1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var array2 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
console.log(array1.concat(array2)); <span class="hljs-comment">// [1,2,3,4,5,6];</span></code></pre><p>&#x7136;&#x800C;&#xFF0C;<strong>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x9002;&#x7528;&#x4E8E;&#x5408;&#x5E76;&#x5927;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x8FD9;&#x4F1A;&#x6D88;&#x8017;&#x5F88;&#x591A;&#x5185;&#x5B58;</strong>&#x3002;</p><p>&#x8FD9;&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Array.push.apply( arr1, arr2 ) &#x6765;&#x4EE3;&#x66FF;&#x521B;&#x5EFA;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x628A;&#x7B2C;&#x4E8C;&#x4E2A;&#x6570;&#x7EC4;&#x5408;&#x5E76;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x4E2D;&#xFF0C;&#x4ECE;&#x800C;&#x8F83;&#x5C11;&#x5185;&#x5B58;&#x6D88;&#x8017;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array1 = [1,2,3];
var array2 = [4,5,6];
console.log( array1.push.apply(array1, array2) );  // [1,2,3,4,5,6];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var array1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
var array2 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
console.log( array1.push.apply(array1, array2) );  <span class="hljs-comment">// [1,2,3,4,5,6];</span></code></pre><h1 id="articleHeader10">&#x5185;&#x529F;&#x5FC3;&#x6CD5;. &#x6613;&#x6DF7;&#x6DC6;&#x70B9;</h1><h4>&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x7684;&#x4F5C;&#x7528;&#x57DF;</h4><p>&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x4E5F;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0E;&#x53D8;&#x91CF;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x5176;&#x58F0;&#x660E;&#x65F6;&#x6240;&#x5728;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4E0E;&#x5176;&#x8FD0;&#x884C;&#x65F6;&#x6240;&#x5728;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x65E0;&#x5173;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5148;&#x6765;&#x4E00;&#x9053;&#x9898;&#xFF0C;&#x770B;&#x770B;&#x8F93;&#x51FA;&#x4EC0;&#x4E48;
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-comment">// &#x5148;&#x6765;&#x4E00;&#x9053;&#x9898;&#xFF0C;&#x770B;&#x770B;&#x8F93;&#x51FA;&#x4EC0;&#x4E48;</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> x = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  console.log(a);
}</span>;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">()</span> <span class="hljs-comment">{
  var a = 2;
  x();
}</span>

<span class="hljs-title">f</span><span class="hljs-params">()</span> <span class="hljs-comment">// 1</span></span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570; x &#x662F;&#x5728;&#x51FD;&#x6570; f &#x7684;&#x5916;&#x90E8;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A;&#x5916;&#x5C42;&#xFF0C;&#x5185;&#x90E8;&#x53D8;&#x91CF; a &#x4E0D;&#x4F1A;&#x5230;&#x51FD;&#x6570; f &#x4F53;&#x5185;&#x53D6;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x8F93;&#x51FA; 1&#xFF0C;&#x800C;&#x4E0D;&#x662F; 2&#x3002;</p><p>&#x603B;&#x4E4B;&#xFF0C;<strong>&#x51FD;&#x6570;&#x6267;&#x884C;&#x65F6;&#x6240;&#x5728;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x662F;&#x5B9A;&#x4E49;&#x65F6;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8C03;&#x7528;&#x65F6;&#x6240;&#x5728;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x3002;</strong></p><p>&#x5F88;&#x5BB9;&#x6613;&#x72AF;&#x9519;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x51FD;&#x6570; A &#x8C03;&#x7528;&#x51FD;&#x6570; B&#xFF0C;&#x5374;&#x6CA1;&#x8003;&#x8651;&#x5230;&#x51FD;&#x6570; B <strong>&#x4E0D;&#x4F1A;</strong>&#x5F15;&#x7528;&#x51FD;&#x6570; A &#x7684;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x518D;&#x6765;&#x4E00;&#x9053;&#x9898;&#xFF0C;&#x770B;&#x770B;&#x8F93;&#x51FA;&#x4EC0;&#x4E48;
var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x)
// ReferenceError: a is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code><span class="hljs-comment">// &#x518D;&#x6765;&#x4E00;&#x9053;&#x9898;&#xFF0C;&#x770B;&#x770B;&#x8F93;&#x51FA;&#x4EC0;&#x4E48;</span>
<span class="hljs-keyword">var</span> x = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  console.log(a);
}</span>;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">y</span><span class="hljs-params">(f)</span> <span class="hljs-comment">{
  var a = 2;
  f();
}</span>

<span class="hljs-title">y</span><span class="hljs-params">(x)</span>
// <span class="hljs-title">ReferenceError</span>:</span> a <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5C06;&#x51FD;&#x6570; x &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x4F20;&#x5165;&#x51FD;&#x6570; y&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x51FD;&#x6570; x &#x662F;&#x5728;&#x51FD;&#x6570; y &#x4F53;&#x5916;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A;&#x5916;&#x5C42;&#xFF0C;&#x56E0;&#x6B64;&#x627E;&#x4E0D;&#x5230;&#x51FD;&#x6570; y &#x7684;&#x5185;&#x90E8;&#x53D8;&#x91CF; a&#xFF0C;&#x5BFC;&#x81F4;&#x62A5;&#x9519;&#x3002;</p><p>&#x540C;&#x6837;&#x7684;&#xFF0C;<strong>&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;&#x58F0;&#x660E;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var x = 1;
  function bar() {
    console.log(x);
  }
  return bar;
}

var x = 2;
var f = foo();
f() // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(x);
  }
  <span class="hljs-keyword">return</span> bar;
}

<span class="hljs-keyword">var</span> x = <span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> f = foo();
f() <span class="hljs-comment">// 1</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x51FD;&#x6570; foo &#x5185;&#x90E8;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570; bar&#xFF0C;bar &#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A; foo&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x5728; foo &#x5916;&#x90E8;&#x53D6;&#x51FA; bar &#x6267;&#x884C;&#x65F6;&#xFF0C;&#x53D8;&#x91CF; x &#x6307;&#x5411;&#x7684;&#x662F; foo &#x5185;&#x90E8;&#x7684; x&#xFF0C;&#x800C;&#x4E0D;&#x662F; foo &#x5916;&#x90E8;&#x7684; x&#x3002;&#x6B63;&#x662F;&#x8FD9;&#x79CD;&#x673A;&#x5236;&#xFF0C;&#x6784;&#x6210;&#x4E86; &#x201C;&#x95ED;&#x5305;&#x201D; &#x73B0;&#x8C61;&#x3002;</p><p>&#x95ED;&#x5305;&#x7B80;&#x5355;&#x7406;&#x89E3;&#xFF0C;&#x8BF7;&#x770B;&#x6211;&#x7684;&#x7B14;&#x8BB0;&#xFF1A; <a href="https://segmentfault.com/n/1330000016509210">&#x95ED;&#x5305;</a></p><h4>&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</h4><p>&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x201D;&#xFF08;Immediately-Invoked Function Expression&#xFF09;&#xFF0C;&#x7B80;&#x79F0; IIFE&#x3002;</p><p>&#x901A;&#x5E38;&#x5199;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){ /* code */ }());
// &#x6216;&#x8005;
(function(){ /* code */ })();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/* code */</span> }());
<span class="hljs-comment">// &#x6216;&#x8005;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/* code */</span> })();</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x4E0A;&#x9762;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#x6700;&#x540E;&#x7684;&#x5206;&#x53F7;&#x90FD;&#x662F;&#x5FC5;&#x987B;&#x7684;&#x3002;&#x5982;&#x679C;&#x7701;&#x7565;&#x5206;&#x53F7;&#xFF0C;&#x9047;&#x5230;&#x8FDE;&#x7740;&#x4E24;&#x4E2A; IIFE&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x62A5;&#x9519;
(function(){ /* code */ }())
(function(){ /* code */ }())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x62A5;&#x9519;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/* code */</span> }())
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">/* code */</span> }())</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7684;&#x4E24;&#x884C;&#x4E4B;&#x95F4;&#x6CA1;&#x6709;&#x5206;&#x53F7;&#xFF0C;JavaScript &#x4F1A;&#x5C06;&#x5B83;&#x4EEC;&#x8FDE;&#x5728;&#x4E00;&#x8D77;&#x89E3;&#x91CA;&#xFF0C;&#x5C06;&#x7B2C;&#x4E8C;&#x884C;&#x89E3;&#x91CA;&#x4E3A;&#x7B2C;&#x4E00;&#x884C;&#x7684;&#x53C2;&#x6570;&#x3002;</p><p>IIFE &#x7684;&#x76EE;&#x7684;&#x6709;&#x4E24;&#x4E2A;&#xFF1A;</p><ul><li>&#x4E00;&#x662F;&#x4E0D;&#x5FC5;&#x4E3A;&#x51FD;&#x6570;&#x547D;&#x540D;&#xFF0C;&#x907F;&#x514D;&#x4E86;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF1B;</li><li>&#x4E8C;&#x662F; IIFE &#x5185;&#x90E8;&#x5F62;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x53EF;&#x4EE5;&#x5C01;&#x88C5;&#x4E00;&#x4E9B;&#x5916;&#x90E8;&#x65E0;&#x6CD5;&#x8BFB;&#x53D6;&#x7684;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x3002;</li></ul><p>&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5199;&#x6CD5;&#x4E00;
var tmp = newData;
processData(tmp);
storeData(tmp);

// &#x5199;&#x6CD5;&#x4E8C;
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E00;</span>
<span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span><span class="hljs-type">Data</span>;
processData(tmp);
storeData(tmp);

<span class="hljs-comment">// &#x5199;&#x6CD5;&#x4E8C;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> </span>() {
  <span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span><span class="hljs-type">Data</span>;
  processData(tmp);
  storeData(tmp);
}());</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5199;&#x6CD5;&#x4E8C;&#x6BD4;&#x5199;&#x6CD5;&#x4E00;&#x66F4;&#x597D;&#xFF0C;&#x56E0;&#x4E3A;&#x5B8C;&#x5168;&#x907F;&#x514D;&#x4E86;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x3002;</p><h1 id="articleHeader11">&#x6700;&#x540E;</h1><p>&#x72EC;&#x5B64;&#x4E5D;&#x5251;&#x5171;&#x4E5D;&#x5F0F;&#x548C;&#x4E24;&#x7BC7;&#x6700;&#x9AD8;&#x5185;&#x529F;&#x5FC3;&#x6CD5;&#x90FD;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x4E86;&#xFF0C;&#x5927;&#x4FA0;&#x5B66;&#x4F1A;&#x540E;&#xFF0C;&#x9664;&#x6076;&#x60E9;&#x5978;&#xFF0C;&#x9068;&#x6E38;&#x6C5F;&#x6E56;&#x5427;&#xFF01;&#xFF01;&#xFF01;</p><p>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x8BE5;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5230;&#x6211;&#x7684; github&#xFF0C;star &#x4E00;&#x4E0B;&#xFF0C;&#x8C22;&#x8C22;&#x3002;</p><p><a href="https://github.com/biaochenxuying/blog" rel="nofollow noreferrer" target="_blank">github &#x5730;&#x5740;</a></p><p>&#x53C2;&#x8003;&#x6559;&#x7A0B;&#xFF1A; <a href="https://wangdoc.com/javascript/" rel="nofollow noreferrer" target="_blank">&#x300A;JavaScript &#x8BED;&#x8A00;&#x5165;&#x95E8;&#x6559;&#x7A0B;&#x300B;</a><br>&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;<a href="http://webres.wang/12-extremely-useful-hacks-for-javascript/" rel="nofollow noreferrer" target="_blank">12 &#x4E2A;&#x975E;&#x5E38;&#x6709;&#x7528;&#x7684; JavaScript Hacks</a></p><p>&#x4F60;&#x4EE5;&#x4E3A;&#x672C;&#x6587;&#x5C31;&#x8FD9;&#x4E48;&#x7ED3;&#x675F;&#x4E86; ? <strong>&#x7CBE;&#x5F69;&#x5728;&#x540E;&#x9762; &#xFF01;&#xFF01;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016512530" src="https://static.alili.tech/img/remote/1460000016512530" alt="" title="" style="cursor:pointer"></span></p><p>&#x5BF9; <strong>&#x5168;&#x6808;&#x5F00;&#x53D1;</strong> &#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x626B;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x6211;&#x4F1A;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x6709;&#x4EF7;&#x503C;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><blockquote>&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;<strong>BiaoChenXuYing</strong><br>&#x5206;&#x4EAB; &#x524D;&#x7AEF;&#x3001;&#x540E;&#x7AEF;&#x5F00;&#x53D1;&#x7B49;&#x76F8;&#x5173;&#x7684;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x70ED;&#x70B9;&#x8D44;&#x6E90;&#xFF0C;&#x5168;&#x6808;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x6210;&#x957F;&#x4E4B;&#x8DEF;&#x3002;</blockquote><p>&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#x5E76;&#x56DE;&#x590D; <strong>&#x798F;&#x5229;</strong> &#x4FBF;&#x514D;&#x8D39;&#x9001;&#x4F60;&#x89C6;&#x9891;&#x8D44;&#x6E90;&#xFF0C;&#x7EDD;&#x5BF9;&#x5E72;&#x8D27;&#x3002;</p><p>&#x798F;&#x5229;&#x8BE6;&#x60C5;&#x8BF7;&#x70B9;&#x51FB;&#xFF1A; <a href="https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&amp;mid=2247483711&amp;idx=1&amp;sn=1ffb576159805e92fc57f5f1120fce3a&amp;chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&amp;token=1560489745&amp;lang=zh_CN#rd" rel="nofollow noreferrer" target="_blank">&#x514D;&#x8D39;&#x8D44;&#x6E90;&#x5206;&#x4EAB;--Python&#x3001;Java&#x3001;Linux&#x3001;Go&#x3001;node&#x3001;vue&#x3001;react&#x3001;javaScript</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016505245" src="https://static.alili.tech/img/remote/1460000016505245" alt="BiaoChenXuYing" title="BiaoChenXuYing" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
细数 JavaScript 实用黑科技(二)

## 原文链接
[https://segmentfault.com/a/1190000016512527](https://segmentfault.com/a/1190000016512527)


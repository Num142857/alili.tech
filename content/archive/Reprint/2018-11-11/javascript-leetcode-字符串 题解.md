---
title: javascript-leetcode-字符串 题解
reprint: true
categories: reprint
abbrlink: 4c5d915e
date: 2018-11-11 02:30:07
---

{{% raw %}}
<p>&#x953B;&#x70BC;&#x81EA;&#x5DF1;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x8BA9;&#x81EA;&#x5DF1;&#x66F4;&#x52A0;&#x719F;&#x6089;&#x5404;&#x4E2A;api&#x7684;&#x4F7F;&#x7528;&#x3002;<br>&#x4E0B;&#x9762;&#x662F;<strong>javascript</strong>&#x7248;&#x672C;&#x7684;<strong>leetcode</strong>&#x9898;&#x76EE;&#xFF08;<em>&#x5B57;&#x7B26;&#x4E32;&#x5165;&#x95E8;&#x9898;&#x7EC4;</em>&#xFF09;&#x89E3;&#x6CD5;&#x3002;<a href="https://leetcode-cn.com" rel="nofollow noreferrer" target="_blank">leetCode&#x5730;&#x5740;</a>&#x3002;</p><h2 id="articleHeader0">1.&#x53CD;&#x8F6C;&#x5B57;&#x7B26;&#x4E32;</h2><h3 id="articleHeader1">&#x8BF4;&#x660E;</h3><p>&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x8F93;&#x5165;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x53CD;&#x8F6C;&#x8FC7;&#x6765;&#x3002;</p><h3 id="articleHeader2">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B;1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;hello&quot;
&#x8F93;&#x51FA;: &quot;olleh&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>&#x8F93;&#x5165;: <span class="hljs-string">&quot;hello&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-string">&quot;olleh&quot;</span></code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;A man, a plan, a canal: Panama&quot;
&#x8F93;&#x51FA;: &quot;amanaP :lanac a ,nalp a ,nam A&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smalltalk"><code>&#x8F93;&#x5165;: <span class="hljs-comment">&quot;A man, a plan, a canal: Panama&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-comment">&quot;amanaP :lanac a ,nalp a ,nam A&quot;</span></code></pre><h3 id="articleHeader3">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function(s) {
    return s.split(&apos;&apos;).reverse().join(&apos;&apos;)
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span> {string} s
 * <span class="hljs-doctag">@return</span> {string}
 */</span>
<span class="hljs-keyword">var</span> reverseString = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(s)</span> </span>{
    <span class="hljs-keyword">return</span> s.split(<span class="hljs-string">&apos;&apos;</span>).reverse().join(<span class="hljs-string">&apos;&apos;</span>)
};</code></pre><h3 id="articleHeader4">&#x70B9;&#x8BC4;</h3><p>&#x5E38;&#x89C1;&#x5199;&#x6CD5;&#xFF0C;&#x8F6C;&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x7FFB;&#x8F6C;&#xFF0C;&#x53D8;&#x56DE;&#x6765;&#x3002;</p><h2 id="articleHeader5">2.&#x98A0;&#x5012;&#x6574;&#x6570;</h2><h3 id="articleHeader6">&#x8BF4;&#x660E;</h3><p>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A; 32 &#x4F4D;&#x6709;&#x7B26;&#x53F7;&#x6574;&#x6570;&#xFF0C;&#x5C06;&#x6574;&#x6570;&#x4E2D;&#x7684;&#x6570;&#x5B57;&#x8FDB;&#x884C;&#x53CD;&#x8F6C;&#x3002;</p><p>&#x6CE8;&#x610F;:<br>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x7684;&#x73AF;&#x5883;&#x53EA;&#x80FD;&#x5B58;&#x50A8; 32 &#x4F4D;&#x6709;&#x7B26;&#x53F7;&#x6574;&#x6570;&#xFF0C;&#x5176;&#x6570;&#x503C;&#x8303;&#x56F4;&#x662F; [&#x2212;231, 231 &#x2212; 1]&#x3002;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x5047;&#x8BBE;&#xFF0C;&#x5982;&#x679C;&#x53CD;&#x8F6C;&#x540E;&#x7684;&#x6574;&#x6570;&#x6EA2;&#x51FA;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; 0&#x3002;</p><h3 id="articleHeader7">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: 123
&#x8F93;&#x51FA;: 321" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>&#x8F93;&#x5165;: 123
&#x8F93;&#x51FA;: 321</code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: -123
&#x8F93;&#x51FA;: -321" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs subunit"><code>&#x8F93;&#x5165;: <span class="hljs-string">-123</span>
&#x8F93;&#x51FA;: <span class="hljs-string">-321</span></code></pre><h4>&#x793A;&#x4F8B; 3:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: 120
&#x8F93;&#x51FA;: 21
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>&#x8F93;&#x5165;: 120
&#x8F93;&#x51FA;: 21
</code></pre><h3 id="articleHeader8">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {number} x
 * @return {number}
 */
var _min = Math.pow(-2,31)
var _max = Math.pow(2,31)
var reverse = function(x) {
    var _num = null;
    if(x&lt;0){
       _num =  Number(&apos;-&apos;+(Math.abs(x)+&apos;&apos;).split(&apos;&apos;).reverse().join(&apos;&apos;))
    }else{
       _num =  Number(((x)+&apos;&apos;).split(&apos;&apos;).reverse().join(&apos;&apos;))
    }
    if(_num&gt;_max || _num&lt;_min){
        return 0;   
    }else{
        return _num
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code><span class="hljs-comment">/**
 * @param {number} x
 * @return {number}
 */</span>
var <span class="hljs-variable">_min</span> = Math.pow(-<span class="hljs-number">2</span>,<span class="hljs-number">31</span>)
var <span class="hljs-variable">_max</span> = Math.pow(<span class="hljs-number">2</span>,<span class="hljs-number">31</span>)
var <span class="hljs-built_in">reverse</span> = function(x) {
    var <span class="hljs-variable">_num</span> = null;
    <span class="hljs-keyword">if</span>(x&lt;<span class="hljs-number">0</span>){
       <span class="hljs-variable">_num</span> =  Number(<span class="hljs-string">&apos;-&apos;</span>+(Math.<span class="hljs-built_in">abs</span>(x)+<span class="hljs-string">&apos;&apos;</span>).split(<span class="hljs-string">&apos;&apos;</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">&apos;&apos;</span>))
    }<span class="hljs-keyword">else</span>{
       <span class="hljs-variable">_num</span> =  Number(((x)+<span class="hljs-string">&apos;&apos;</span>).split(<span class="hljs-string">&apos;&apos;</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">&apos;&apos;</span>))
    }
    <span class="hljs-keyword">if</span>(<span class="hljs-variable">_num</span>&gt;<span class="hljs-variable">_max</span> || <span class="hljs-variable">_num</span>&lt;<span class="hljs-variable">_min</span>){
        return <span class="hljs-number">0</span>;   
    }<span class="hljs-keyword">else</span>{
        return <span class="hljs-variable">_num</span>
    }
};</code></pre><h3 id="articleHeader9">&#x70B9;&#x8BC4;</h3><p>&#x770B;&#x4E0A;&#x53BB;&#x548C;&#x7B2C;&#x4E00;&#x9898;&#x6CA1;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x3002;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7FFB;&#x8F6C;&#xFF0C;&#x53D8;&#x6210;&#x6570;&#x503C;&#x3002;&#x91CC;&#x9762;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x5C31;&#x662F;&#x8D8A;&#x754C;&#x4EE5;&#x53CA;&#x6B63;&#x8D1F;&#x6570;&#x7684;&#x95EE;&#x9898;</p><h2 id="articleHeader10">3.&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x5B57;&#x7B26;</h2><h3 id="articleHeader11">&#x8BF4;&#x660E;</h3><p>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x627E;&#x5230;&#x5B83;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x4E0D;&#x91CD;&#x590D;&#x7684;&#x5B57;&#x7B26;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x5B83;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; -1&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;<br>&#x60A8;&#x53EF;&#x4EE5;&#x5047;&#x5B9A;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x53EA;&#x5305;&#x542B;&#x5C0F;&#x5199;&#x5B57;&#x6BCD;&#x3002;</p><h3 id="articleHeader12">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B;1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s = &quot;leetcode&quot;
&#x8FD4;&#x56DE; 0." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code><span class="hljs-attribute">s</span> = <span class="hljs-string">&quot;leetcode&quot;</span>
&#x8FD4;&#x56DE; <span class="hljs-number">0</span>.</code></pre><h4>&#x793A;&#x4F8B;2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s = &quot;loveleetcode&quot;,
&#x8FD4;&#x56DE; 2." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">s</span> = <span class="hljs-string">&quot;loveleetcode&quot;</span>,
&#x8FD4;&#x56DE; 2.</code></pre><h3 id="articleHeader13">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    for(var i = 0 ; i &lt; s.length;i++){
        if(s.indexOf(s[i]) == s.lastIndexOf(s[i])){
           return i
        }
    }
    return -1
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span> {string} s
 * <span class="hljs-doctag">@return</span> {number}
 */</span>
<span class="hljs-keyword">var</span> firstUniqChar = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(s)</span> </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; s.length;i++){
        <span class="hljs-keyword">if</span>(s.indexOf(s[i]) == s.lastIndexOf(s[i])){
           <span class="hljs-keyword">return</span> i
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
};</code></pre><h3 id="articleHeader14">&#x70B9;&#x8BC4;</h3><p>&#x89E3;&#x6CD5;&#x4E0D;&#x662F;&#x5F88;&#x597D;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x904D;&#x5386;&#x5F88;&#x591A;&#x6B21;&#xFF0C;&#x60F3;&#x6CD5;&#x5C31;&#x662F;&#x524D;&#x540E;&#x627E;&#xFF0C;&#x5982;&#x679C;<code>index</code>&#x4E00;&#x81F4;&#x5C31;&#x8BC1;&#x660E;&#x6CA1;&#x91CD;&#x590D;<br>&#x6700;&#x5FEB;&#x7684;&#x65B9;&#x6CD5;&#x5F53;&#x7136;&#x662F;&#x628A;&#x5F53;&#x524D;&#x7684;&#x5B58;&#x5728;<code>map</code>&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x8BA1;&#x6570;&#xFF0C;&#x518D;&#x904D;&#x5386;&#x4E00;&#x904D;<code>map</code>&#x5C31;ok&#x3002;</p><h2 id="articleHeader15">4.&#x6709;&#x6548;&#x7684;&#x5B57;&#x6BCD;&#x5F02;&#x4F4D;&#x8BCD;</h2><h3 id="articleHeader16">&#x8BF4;&#x660E;</h3><p>&#x7ED9;&#x5B9A;&#x4E24;&#x4E2A;&#x5B57;&#x7B26;&#x4E32; s &#x548C; t &#xFF0C;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x5224;&#x65AD; t &#x662F;&#x5426;&#x662F; s &#x7684;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;&#x5F02;&#x4F4D;&#x8BCD;&#x3002;</p><p>&#x8BF4;&#x660E;:<br>&#x4F60;&#x53EF;&#x4EE5;&#x5047;&#x8BBE;&#x5B57;&#x7B26;&#x4E32;&#x53EA;&#x5305;&#x542B;&#x5C0F;&#x5199;&#x5B57;&#x6BCD;&#x3002;</p><p>&#x8FDB;&#x9636;:<br>&#x5982;&#x679C;&#x8F93;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#x5305;&#x542B; unicode &#x5B57;&#x7B26;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x4F60;&#x80FD;&#x5426;&#x8C03;&#x6574;&#x4F60;&#x7684;&#x89E3;&#x6CD5;&#x6765;&#x5E94;&#x5BF9;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF1F;</p><h3 id="articleHeader17">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: s = &quot;anagram&quot;, t = &quot;nagaram&quot;
&#x8F93;&#x51FA;: true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>&#x8F93;&#x5165;: <span class="hljs-attr">s</span> = <span class="hljs-string">&quot;anagram&quot;</span>, <span class="hljs-attr">t</span> = <span class="hljs-string">&quot;nagaram&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-literal">true</span></code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: s = &quot;rat&quot;, t = &quot;car&quot;
&#x8F93;&#x51FA;: false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>&#x8F93;&#x5165;: <span class="hljs-attr">s</span> = <span class="hljs-string">&quot;rat&quot;</span>, <span class="hljs-attr">t</span> = <span class="hljs-string">&quot;car&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-literal">false</span></code></pre><h3 id="articleHeader18">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    var _sArr = {};
    var _tArr = {};
    if(s.length != t.length) return false;
    for(var i = 0;i&lt;s.length;i++){
        if(!_sArr[s[i]]) _sArr[s[i]] = 0;
        _sArr[s[i]]++          
        if(!_tArr[t[i]]) _tArr[t[i]] = 0;
        _tArr[t[i]]++                       
    }
    for(var i in _sArr){
        if(_sArr[i]!=_tArr[i]){
            return false;
        }
    }
        return true;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span> {string} s
 * <span class="hljs-doctag">@param</span> {string} t
 * <span class="hljs-doctag">@return</span> {boolean}
 */</span>
<span class="hljs-keyword">var</span> isAnagram = function(s, t) {
    <span class="hljs-keyword">var</span> _sArr = {};
    <span class="hljs-keyword">var</span> _tArr = {};
    <span class="hljs-keyword">if</span>(s.length != t.length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt;s.length;i++){
        <span class="hljs-keyword">if</span>(!_sArr[s[i]]) _sArr[s[i]] = <span class="hljs-number">0</span>;
        _sArr[s[i]]++          
        <span class="hljs-keyword">if</span>(!_tArr[t[i]]) _tArr[t[i]] = <span class="hljs-number">0</span>;
        _tArr[t[i]]++                       
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> _sArr){
        <span class="hljs-keyword">if</span>(_sArr[i]!=_tArr[i]){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
};</code></pre><h3 id="articleHeader19">&#x70B9;&#x8BC4;</h3><p>&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x8BA1;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5143;&#x7D20;&#x90FD;&#x4E00;&#x6837;&#x591A;&#x3002;</p><h2 id="articleHeader20">5.&#x9A8C;&#x8BC1;&#x56DE;&#x6587;&#x5B57;&#x7B26;&#x4E32;</h2><h3 id="articleHeader21">&#x8BF4;&#x660E;</h3><p>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x9A8C;&#x8BC1;&#x5B83;&#x662F;&#x5426;&#x662F;&#x56DE;&#x6587;&#x4E32;&#xFF0C;&#x53EA;&#x8003;&#x8651;&#x5B57;&#x6BCD;&#x548C;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#xFF0C;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x5B57;&#x6BCD;&#x7684;&#x5927;&#x5C0F;&#x5199;&#x3002;</p><p>&#x8BF4;&#x660E;&#xFF1A;<br>&#x672C;&#x9898;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x5B9A;&#x4E49;&#x4E3A;&#x6709;&#x6548;&#x7684;&#x56DE;&#x6587;&#x4E32;&#x3002;</p><h3 id="articleHeader22">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;A man, a plan, a canal: Panama&quot;
&#x8F93;&#x51FA;: true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smalltalk"><code>&#x8F93;&#x5165;: <span class="hljs-comment">&quot;A man, a plan, a canal: Panama&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-keyword">true</span></code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;race a car&quot;
&#x8F93;&#x51FA;: false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smalltalk"><code>&#x8F93;&#x5165;: <span class="hljs-comment">&quot;race a car&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-keyword">false</span></code></pre><h3 id="articleHeader23">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    var _s = s.replace(/[^a-z0-9]/gi,&apos;&apos;).toLowerCase();
    return _s.split(&apos;&apos;).reverse().join(&apos;&apos;) == _s
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span> {string} s
 * <span class="hljs-doctag">@return</span> {boolean}
 */</span>
<span class="hljs-keyword">var</span> isPalindrome = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(s)</span> </span>{
    <span class="hljs-keyword">var</span> _s = s.replace(/[^a-z0<span class="hljs-number">-9</span>]/gi,<span class="hljs-string">&apos;&apos;</span>).toLowerCase();
    <span class="hljs-keyword">return</span> _s.split(<span class="hljs-string">&apos;&apos;</span>).reverse().join(<span class="hljs-string">&apos;&apos;</span>) == _s
};</code></pre><h3 id="articleHeader24">&#x70B9;&#x8BC4;</h3><p>&#x901A;&#x8FC7;&#x6B63;&#x5219;&#x628A;&#x4E0D;&#x8981;&#x7684;&#x5B57;&#x7B26;&#x90FD;&#x5220;&#x6389;&#xFF0C;&#x8F6C;&#x5316;&#x4E3A;&#x5C0F;&#x5199;&#xFF0C;&#x7FFB;&#x8F6C;&#x6BD4;&#x5BF9;&#x3002;</p><h2 id="articleHeader25">6.&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6574;&#x6570;&#xFF08;atoi&#xFF09;</h2><h3 id="articleHeader26">&#x8BF4;&#x660E;</h3><p>&#x5B9E;&#x73B0; atoi&#xFF0C;&#x5C06;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x4E3A;&#x6574;&#x6570;&#x3002;</p><p>&#x5728;&#x627E;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5B57;&#x7B26;&#x4E4B;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x79FB;&#x9664;&#x6389;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x7A7A;&#x683C;&#x5B57;&#x7B26;&#x3002;&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5B57;&#x7B26;&#x662F;&#x6B63;&#x53F7;&#x6216;&#x8D1F;&#x53F7;&#xFF0C;&#x9009;&#x53D6;&#x8BE5;&#x7B26;&#x53F7;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x4E0E;&#x540E;&#x9762;&#x5C3D;&#x53EF;&#x80FD;&#x591A;&#x7684;&#x8FDE;&#x7EED;&#x7684;&#x6570;&#x5B57;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x5B57;&#x7B26;&#x5373;&#x4E3A;&#x6574;&#x6570;&#x7684;&#x503C;&#x3002;&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5B57;&#x7B26;&#x662F;&#x6570;&#x5B57;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x5C06;&#x5176;&#x4E0E;&#x4E4B;&#x540E;&#x8FDE;&#x7EED;&#x7684;&#x6570;&#x5B57;&#x5B57;&#x7B26;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x5F62;&#x6210;&#x6574;&#x6570;&#x3002;</p><p>&#x5B57;&#x7B26;&#x4E32;&#x53EF;&#x4EE5;&#x5728;&#x5F62;&#x6210;&#x6574;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x540E;&#x9762;&#x5305;&#x62EC;&#x591A;&#x4F59;&#x7684;&#x5B57;&#x7B26;&#xFF0C;&#x8FD9;&#x4E9B;&#x5B57;&#x7B26;&#x53EF;&#x4EE5;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x5B83;&#x4EEC;&#x5BF9;&#x4E8E;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x5F71;&#x54CD;&#x3002;</p><p>&#x5F53;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5B57;&#x7B26;&#x5E8F;&#x5217;&#x4E0D;&#x662F;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x6574;&#x6570;&#xFF1B;&#x6216;&#x5B57;&#x7B26;&#x4E32;&#x4E3A;&#x7A7A;&#xFF1B;&#x6216;&#x5B57;&#x7B26;&#x4E32;&#x4EC5;&#x5305;&#x542B;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x65F6;&#xFF0C;&#x5219;&#x4E0D;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x3002;</p><p>&#x82E5;&#x51FD;&#x6570;&#x4E0D;&#x80FD;&#x6267;&#x884C;&#x6709;&#x6548;&#x7684;&#x8F6C;&#x6362;&#xFF0C;&#x8FD4;&#x56DE; 0&#x3002;</p><p>&#x8BF4;&#x660E;&#xFF1A;<br>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x7684;&#x73AF;&#x5883;&#x53EA;&#x80FD;&#x5B58;&#x50A8; 32 &#x4F4D;&#x6709;&#x7B26;&#x53F7;&#x6574;&#x6570;&#xFF0C;&#x5176;&#x6570;&#x503C;&#x8303;&#x56F4;&#x662F; [&#x2212;231, 231 &#x2212; 1]&#x3002;&#x5982;&#x679C;&#x6570;&#x503C;&#x8D85;&#x8FC7;&#x53EF;&#x8868;&#x793A;&#x7684;&#x8303;&#x56F4;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; INT_MAX (231 &#x2212; 1) &#x6216; INT_MIN (&#x2212;231) &#x3002;</p><h3 id="articleHeader27">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;42&quot;
&#x8F93;&#x51FA;: 42" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>&#x8F93;&#x5165;: <span class="hljs-string">&quot;42&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-number">42</span></code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;   -42&quot;
&#x8F93;&#x51FA;: -42
&#x89E3;&#x91CA;: &#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x4E3A; &apos;-&apos;, &#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x8D1F;&#x53F7;&#x3002;
     &#x6211;&#x4EEC;&#x5C3D;&#x53EF;&#x80FD;&#x5C06;&#x8D1F;&#x53F7;&#x4E0E;&#x540E;&#x9762;&#x6240;&#x6709;&#x8FDE;&#x7EED;&#x51FA;&#x73B0;&#x7684;&#x6570;&#x5B57;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x6700;&#x540E;&#x5F97;&#x5230; -42 &#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs subunit"><code>&#x8F93;&#x5165;: &quot;   <span class="hljs-string">-42</span>&quot;
&#x8F93;&#x51FA;: <span class="hljs-string">-42</span>
&#x89E3;&#x91CA;: &#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x4E3A; &apos;-&apos;, &#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x8D1F;&#x53F7;&#x3002;
     &#x6211;&#x4EEC;&#x5C3D;&#x53EF;&#x80FD;&#x5C06;&#x8D1F;&#x53F7;&#x4E0E;&#x540E;&#x9762;&#x6240;&#x6709;&#x8FDE;&#x7EED;&#x51FA;&#x73B0;&#x7684;&#x6570;&#x5B57;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x6700;&#x540E;&#x5F97;&#x5230; <span class="hljs-string">-42</span> &#x3002;</code></pre><h4>&#x793A;&#x4F8B; 3:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;4193 with words&quot;
&#x8F93;&#x51FA;: 4193
&#x89E3;&#x91CA;: &#x8F6C;&#x6362;&#x622A;&#x6B62;&#x4E8E;&#x6570;&#x5B57; &apos;3&apos; &#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E0D;&#x4E3A;&#x6570;&#x5B57;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&#x8F93;&#x5165;: <span class="hljs-string">&quot;4193 with words&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-number">4193</span>
&#x89E3;&#x91CA;: &#x8F6C;&#x6362;&#x622A;&#x6B62;&#x4E8E;&#x6570;&#x5B57; <span class="hljs-string">&apos;3&apos;</span> &#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E0D;&#x4E3A;&#x6570;&#x5B57;&#x3002;
</code></pre><h4>&#x793A;&#x4F8B; 4:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;words and 987&quot;
&#x8F93;&#x51FA;: 0
&#x89E3;&#x91CA;: &#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5B57;&#x7B26;&#x662F; &apos;w&apos;, &#x4F46;&#x5B83;&#x4E0D;&#x662F;&#x6570;&#x5B57;&#x6216;&#x6B63;&#x3001;&#x8D1F;&#x53F7;&#x3002;
     &#x56E0;&#x6B64;&#x65E0;&#x6CD5;&#x6267;&#x884C;&#x6709;&#x6548;&#x7684;&#x8F6C;&#x6362;&#x3002;
     " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&#x8F93;&#x5165;: <span class="hljs-string">&quot;words and 987&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-number">0</span>
&#x89E3;&#x91CA;: &#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5B57;&#x7B26;&#x662F; <span class="hljs-string">&apos;w&apos;</span>, &#x4F46;&#x5B83;&#x4E0D;&#x662F;&#x6570;&#x5B57;&#x6216;&#x6B63;&#x3001;&#x8D1F;&#x53F7;&#x3002;
     &#x56E0;&#x6B64;&#x65E0;&#x6CD5;&#x6267;&#x884C;&#x6709;&#x6548;&#x7684;&#x8F6C;&#x6362;&#x3002;
     </code></pre><h4>&#x793A;&#x4F8B; 5</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: &quot;-91283472332&quot;
&#x8F93;&#x51FA;: -2147483648
&#x89E3;&#x91CA;: &#x6570;&#x5B57; &quot;-91283472332&quot; &#x8D85;&#x8FC7; 32 &#x4F4D;&#x6709;&#x7B26;&#x53F7;&#x6574;&#x6570;&#x8303;&#x56F4;&#x3002; 
     &#x56E0;&#x6B64;&#x8FD4;&#x56DE; INT_MIN (&#x2212;231) &#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code>&#x8F93;&#x5165;: <span class="hljs-string">&quot;-91283472332&quot;</span>
&#x8F93;&#x51FA;: -2147483648
&#x89E3;&#x91CA;: &#x6570;&#x5B57; <span class="hljs-string">&quot;-91283472332&quot;</span> &#x8D85;&#x8FC7; 32 &#x4F4D;&#x6709;&#x7B26;&#x53F7;&#x6574;&#x6570;&#x8303;&#x56F4;&#x3002; 
     &#x56E0;&#x6B64;&#x8FD4;&#x56DE; INT_MIN (&#x2212;231) &#x3002;
</code></pre><h3 id="articleHeader28">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    var _num = parseInt(str) || 0
    if(_num &lt; (Math.pow(-2,31))){
       return (Math.pow(-2,31))
    }else if(_num &gt;= (Math.pow(2,31))){
       return (Math.pow(2,31)-1)
    }else{
        return _num
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @param {string} str
 * @return {number}
 */</span>
<span class="hljs-keyword">var</span> myAtoi = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">var</span> _num = <span class="hljs-built_in">parseInt</span>(str) || <span class="hljs-number">0</span>
    <span class="hljs-keyword">if</span>(_num &lt; (<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">-2</span>,<span class="hljs-number">31</span>))){
       <span class="hljs-keyword">return</span> (<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">-2</span>,<span class="hljs-number">31</span>))
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(_num &gt;= (<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">31</span>))){
       <span class="hljs-keyword">return</span> (<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">31</span>)<span class="hljs-number">-1</span>)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> _num
    }
};</code></pre><h3 id="articleHeader29">&#x70B9;&#x8BC4;</h3><p>&#x8FD9;&#x4E2A;&#x6CA1;&#x4EC0;&#x4E48;&#x597D;&#x8BF4;&#x7684;&#xFF0C;&#x5224;&#x65AD;&#x8FB9;&#x754C;&#xFF0C;&#x7136;&#x540E;<code>parseInt</code></p><h2 id="articleHeader30">7.&#x5B9E;&#x73B0;strStr()</h2><h3 id="articleHeader31">&#x8BF4;&#x660E;</h3><p>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A; haystack &#x5B57;&#x7B26;&#x4E32;&#x548C;&#x4E00;&#x4E2A; needle &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5728; haystack &#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x627E;&#x51FA; needle &#x5B57;&#x7B26;&#x4E32;&#x51FA;&#x73B0;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E; (&#x4ECE;0&#x5F00;&#x59CB;)&#x3002;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; -1&#x3002;</p><p>&#x8BF4;&#x660E;:<br>&#x5F53; needle &#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x5F53;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x503C;&#x5462;&#xFF1F;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5728;&#x9762;&#x8BD5;&#x4E2D;&#x5F88;&#x597D;&#x7684;&#x95EE;&#x9898;&#x3002;<br>&#x5BF9;&#x4E8E;&#x672C;&#x9898;&#x800C;&#x8A00;&#xFF0C;&#x5F53; needle &#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#x6211;&#x4EEC;&#x5E94;&#x5F53;&#x8FD4;&#x56DE; 0 &#x3002;&#x8FD9;&#x4E0E;C&#x8BED;&#x8A00;&#x7684; strstr() &#x4EE5;&#x53CA; Java&#x7684; indexOf() &#x5B9A;&#x4E49;&#x76F8;&#x7B26;&#x3002;</p><h3 id="articleHeader32">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: haystack = &quot;hello&quot;, needle = &quot;ll&quot;
&#x8F93;&#x51FA;: 2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>&#x8F93;&#x5165;: <span class="hljs-attr">haystack</span> = <span class="hljs-string">&quot;hello&quot;</span>, <span class="hljs-attr">needle</span> = <span class="hljs-string">&quot;ll&quot;</span>
&#x8F93;&#x51FA;: <span class="hljs-number">2</span>
</code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: haystack = &quot;aaaaa&quot;, needle = &quot;bba&quot;
&#x8F93;&#x51FA;: -1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>&#x8F93;&#x5165;: <span class="hljs-attr">haystack</span> = <span class="hljs-string">&quot;aaaaa&quot;</span>, <span class="hljs-attr">needle</span> = <span class="hljs-string">&quot;bba&quot;</span>
&#x8F93;&#x51FA;: -<span class="hljs-number">1</span></code></pre><h3 id="articleHeader33">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span> {string} haystack
 * <span class="hljs-doctag">@param</span> {string} needle
 * <span class="hljs-doctag">@return</span> {number}
 */</span>
<span class="hljs-keyword">var</span> strStr = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(haystack, needle)</span> </span>{
    <span class="hljs-keyword">return</span> haystack.indexOf(needle)
};</code></pre><h3 id="articleHeader34">&#x70B9;&#x8BC4;</h3><p>&#x4E5F;&#x6CA1;&#x4EC0;&#x4E48;&#x8BF4;&#x7684;&#x5427;&#xFF0C;&#x6B63;&#x5219;&#x6216;&#x8005;<code>indexOf</code>&#x90FD;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;</p><h2 id="articleHeader35">8.&#x6570;&#x6570;&#x5E76;&#x8BF4;</h2><h3 id="articleHeader36">&#x8BF4;&#x660E;</h3><p>&#x62A5;&#x6570;&#x5E8F;&#x5217;&#x662F;&#x6307;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x5E8F;&#x5217;&#xFF0C;&#x6309;&#x7167;&#x5176;&#x4E2D;&#x7684;&#x6574;&#x6570;&#x7684;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x62A5;&#x6570;&#xFF0C;&#x5F97;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x6570;&#x3002;&#x5176;&#x524D;&#x4E94;&#x9879;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.     1
2.     11
3.     21
4.     1211
5.     111221" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>     <span class="hljs-number">1</span>
<span class="hljs-number">2.</span>     <span class="hljs-number">11</span>
<span class="hljs-number">3.</span>     <span class="hljs-number">21</span>
<span class="hljs-number">4.</span>     <span class="hljs-number">1211</span>
<span class="hljs-number">5.</span>     <span class="hljs-number">111221</span></code></pre><p>1 &#x88AB;&#x8BFB;&#x4F5C; &quot;one 1&quot; (&quot;&#x4E00;&#x4E2A;&#x4E00;&quot;) , &#x5373; 11&#x3002;<br>11 &#x88AB;&#x8BFB;&#x4F5C; &quot;two 1s&quot; (&quot;&#x4E24;&#x4E2A;&#x4E00;&quot;&#xFF09;, &#x5373; 21&#x3002;<br>21 &#x88AB;&#x8BFB;&#x4F5C; &quot;one 2&quot;, &quot;one 1&quot; &#xFF08;&quot;&#x4E00;&#x4E2A;&#x4E8C;&quot; , &quot;&#x4E00;&#x4E2A;&#x4E00;&quot;) , &#x5373; 1211&#x3002;</p><p>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6B63;&#x6574;&#x6570; n &#xFF0C;&#x8F93;&#x51FA;&#x62A5;&#x6570;&#x5E8F;&#x5217;&#x7684;&#x7B2C; n &#x9879;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;&#x6574;&#x6570;&#x987A;&#x5E8F;&#x5C06;&#x8868;&#x793A;&#x4E3A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><h3 id="articleHeader37">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: 1
&#x8F93;&#x51FA;: &quot;1&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>&#x8F93;&#x5165;: <span class="hljs-number">1</span>
&#x8F93;&#x51FA;: <span class="hljs-string">&quot;1&quot;</span>
</code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: 4
&#x8F93;&#x51FA;: &quot;1211&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>&#x8F93;&#x5165;: <span class="hljs-number">4</span>
&#x8F93;&#x51FA;: <span class="hljs-string">&quot;1211&quot;</span>
</code></pre><h3 id="articleHeader38">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    var _str = &apos;1&apos;;
    for(var i=1;i&lt;n;i++){
        _str = _str.match(/1+|2+|3+|4+|5+|6+|7+|8+|9+/g).map(v=&gt;&apos;&apos;+v.length+v[0]).join(&apos;&apos;);
    }
    return _str
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @param {number} n
 * @return {string}
 */</span>
<span class="hljs-keyword">var</span> countAndSay = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">var</span> _str = <span class="hljs-string">&apos;1&apos;</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>;i&lt;n;i++){
        _str = _str.match(<span class="hljs-regexp">/1+|2+|3+|4+|5+|6+|7+|8+|9+/g</span>).map(<span class="hljs-function"><span class="hljs-params">v</span>=&gt;</span><span class="hljs-string">&apos;&apos;</span>+v.length+v[<span class="hljs-number">0</span>]).join(<span class="hljs-string">&apos;&apos;</span>);
    }
    <span class="hljs-keyword">return</span> _str
};</code></pre><h3 id="articleHeader39">&#x70B9;&#x8BC4;</h3><p>&#x6211;&#x7684;&#x60F3;&#x6CD5;&#x662F;&#x9009;&#x51FA;&#x8FDE;&#x7EED;&#x7684;&#x540C;&#x5B57;&#x7B26;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x53D8;&#x6210;<strong>&#x957F;&#x5EA6;&#x52A0;&#x5B57;&#x7B26;</strong>,&#x518D;&#x62FC;&#x56DE;&#x53BB;</p><h2 id="articleHeader40">9. &#x6700;&#x957F;&#x516C;&#x5171;&#x524D;&#x7F00;</h2><h3 id="articleHeader41">&#x8BF4;&#x660E;</h3><p>&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x67E5;&#x627E;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x957F;&#x516C;&#x5171;&#x524D;&#x7F00;&#x3002;<br>&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x516C;&#x5171;&#x524D;&#x7F00;&#xFF0C;&#x8FD4;&#x56DE;&#x7A7A;&#x5B57;&#x7B26;&#x4E32; &quot;&quot;&#x3002;</p><p>&#x8BF4;&#x660E;:<br>&#x6240;&#x6709;&#x8F93;&#x5165;&#x53EA;&#x5305;&#x542B;&#x5C0F;&#x5199;&#x5B57;&#x6BCD; a-z &#x3002;</p><h3 id="articleHeader42">&#x793A;&#x4F8B;</h3><h4>&#x793A;&#x4F8B; 1:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;]
&#x8F93;&#x51FA;: &quot;fl&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>&#x8F93;&#x5165;: [<span class="hljs-string">&quot;flower&quot;</span>,<span class="hljs-string">&quot;flow&quot;</span>,<span class="hljs-string">&quot;flight&quot;</span>]
&#x8F93;&#x51FA;: <span class="hljs-string">&quot;fl&quot;</span>
</code></pre><h4>&#x793A;&#x4F8B; 2:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8F93;&#x5165;: [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;]
&#x8F93;&#x51FA;: &quot;&quot;
&#x89E3;&#x91CA;: &#x8F93;&#x5165;&#x4E0D;&#x5B58;&#x5728;&#x516C;&#x5171;&#x524D;&#x7F00;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs prolog"><code>&#x8F93;&#x5165;: [<span class="hljs-string">&quot;dog&quot;</span>,<span class="hljs-string">&quot;racecar&quot;</span>,<span class="hljs-string">&quot;car&quot;</span>]
&#x8F93;&#x51FA;: <span class="hljs-string">&quot;&quot;</span>
&#x89E3;&#x91CA;: &#x8F93;&#x5165;&#x4E0D;&#x5B58;&#x5728;&#x516C;&#x5171;&#x524D;&#x7F00;&#x3002;</code></pre><h3 id="articleHeader43">&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    var _arr = (strs[0]||&apos;&apos;).split(&apos;&apos;).map((v,i)=&gt;strs[0].slice(0,i+1)).reverse();
    for(var i = 1;i&lt;strs.length;i++){
        // if(_arr.length == 0) break;
        while(_arr.length){
            var _index = strs[i].indexOf(_arr[0]);
            if(_index != 0){
               _arr.shift()
            }else{
                break;
            }
        }
    }
    return _arr[0] || &apos;&apos;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">/**
 * @param {string[]} strs
 * @return {string}
 */</span>
<span class="hljs-keyword">var</span> longestCommonPrefix = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">strs</span>) </span>{
    <span class="hljs-keyword">var</span> _arr = <span class="hljs-function">(<span class="hljs-params">strs[0]||&apos;&apos;</span>).<span class="hljs-params">split</span>(<span class="hljs-params">&apos;&apos;</span>).<span class="hljs-params">map</span>(<span class="hljs-params">(<span class="hljs-params">v,i</span>)=&gt;strs[0].slice(<span class="hljs-params">0,i+1</span>)</span>).<span class="hljs-params">reverse</span><span class="hljs-params">()</span>;
    <span class="hljs-params">for</span>(<span class="hljs-params"><span class="hljs-keyword">var</span> i = 1;i&lt;strs.length;i++</span>){
        // <span class="hljs-params">if</span>(<span class="hljs-params">_arr.length == 0</span>) <span class="hljs-params">break</span>;
        <span class="hljs-params">while</span>(<span class="hljs-params">_arr.length</span>){
            <span class="hljs-params">var</span> _<span class="hljs-params">index</span> = <span class="hljs-params">strs</span>[<span class="hljs-params">i</span>].<span class="hljs-params">indexOf</span>(<span class="hljs-params">_arr[0]</span>);
            <span class="hljs-params">if</span>(<span class="hljs-params">_index != 0</span>){
               _<span class="hljs-params">arr</span>.<span class="hljs-params">shift</span><span class="hljs-params">()</span>
            }<span class="hljs-params">else</span>{
                <span class="hljs-params">break</span>;
            }
        }
    }
    <span class="hljs-params">return</span> _<span class="hljs-params">arr</span>[0] || &apos;&apos;
};</span></code></pre><h3 id="articleHeader44">&#x70B9;&#x8BC4;</h3><p>&#x60F3;&#x6CD5;&#x662F;&#x505A;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x524D;&#x7F00;&#x6570;&#x7EC4;&#xFF0C;&#x904D;&#x5386;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x4E0D;&#x6EE1;&#x8DB3;&#x7684;&#xFF0C;&#x5C31;&#x64CD;&#x4F5C;&#x8FD9;&#x4E2A;&#x524D;&#x7F00;&#x6570;&#x7EC4;&#xFF0C;&#x76F4;&#x5230;&#x6700;&#x540E;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x662F;&#x6EE1;&#x8DB3;&#x7684;&#x3002;&#x53D6;&#x6700;&#x5927;&#x7684;&#x4E00;&#x4E2A;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript-leetcode-字符串 题解

## 原文链接
[https://segmentfault.com/a/1190000016310381](https://segmentfault.com/a/1190000016310381)


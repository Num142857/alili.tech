---
title: 打造自己的JavaScript武器库
reprint: true
categories: reprint
abbrlink: d15832d
date: 2018-10-24 08:17:54
---

{{% raw %}}

                    
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVYmF0?w=640&amp;h=442" del-src="https://static.alili.tech/img/bVYmF0?w=640&amp;h=442" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>&#x81EA;&#x5DF1;&#x6253;&#x9020;&#x4E00;&#x628A;&#x8D81;&#x624B;&#x7684;&#x6B66;&#x5668;&#xFF0C;&#x9AD8;&#x6548;&#x7387;&#x5B8C;&#x6210;&#x524D;&#x7AEF;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x3002;</p></blockquote>
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1>
<p>&#x4F5C;&#x4E3A;&#x6218;&#x6597;&#x5728;&#x4E1A;&#x52A1;&#x4E00;&#x7EBF;&#x7684;&#x524D;&#x7AEF;&#xFF0C;&#x8981;&#x60F3;&#x5C11;&#x52A0;&#x73ED;&#xFF0C;&#x5C31;&#x8981;&#x60F3;&#x529E;&#x6CD5;&#x63D0;&#x9AD8;&#x5DE5;&#x4F5C;&#x6548;&#x7387;&#x3002;&#x8FD9;&#x91CC;&#x63D0;&#x4E00;&#x4E2A;&#x5C0F;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x4E1A;&#x52A1;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x7ECF;&#x5E38;&#x4F1A;&#x91CD;&#x590D;&#x7528;&#x5230;<code>&#x65E5;&#x671F;&#x683C;&#x5F0F;&#x5316;</code>&#x3001;<code>url&#x53C2;&#x6570;&#x8F6C;&#x5BF9;&#x8C61;</code>&#x3001;<code>&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;&#x5224;&#x65AD;</code>&#x3001;<code>&#x8282;&#x6D41;&#x51FD;&#x6570;</code>&#x7B49;&#x4E00;&#x7C7B;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E9B;&#x5DE5;&#x5177;&#x7C7B;&#x51FD;&#x6570;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x5728;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x90FD;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x4E3A;&#x907F;&#x514D;&#x4E0D;&#x540C;&#x9879;&#x76EE;&#x591A;&#x6B21;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x7684;&#x9EBB;&#x70E6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7EDF;&#x4E00;&#x5C01;&#x88C5;&#xFF0C;&#x53D1;&#x5E03;&#x5230;<code>npm</code>&#xFF0C;&#x4EE5;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p>
<p>&#x8FD9;&#x91CC;&#xFF0C;&#x7B14;&#x8005;&#x5DF2;&#x7ECF;&#x5C01;&#x88C5;&#x5E76;&#x53D1;&#x5E03;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x6B66;&#x5668;&#x5E93; <a href="https://github.com/proYang/outils" rel="nofollow noreferrer" target="_blank">outils</a>&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x672C;&#x9879;&#x76EE;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x6B22;&#x8FCE;<a href="https://github.com/proYang/outils" rel="nofollow noreferrer" target="_blank"> star </a>&#x672C;&#x9879;&#x76EE;&#x3002;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x672C;&#x9879;&#x76EE;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x5C01;&#x88C5;&#x81EA;&#x5DF1;&#x7684;&#x6B66;&#x5668;&#x5E93;&#x3002;</p>
<h1 id="articleHeader1">&#x5E38;&#x7528;&#x51FD;&#x6570;&#x6C47;&#x603B;</h1>
<p>&#x8FD9;&#x91CC;&#x5148;&#x5206;&#x7C7B;&#x6574;&#x7406;&#x4E0B;&#xFF0C;&#x4E4B;&#x524D;&#x9879;&#x76EE;&#x4E2D;&#x591A;&#x6B21;&#x7528;&#x5230;&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x3002;</p>
<h2 id="articleHeader2">1.Array</h2>
<h3 id="articleHeader3">1.1 arrayEqual</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x76F8;&#x7B49;
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @return {Boolean}
 */
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i &lt; arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x76F8;&#x7B49;
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @return {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arrayEqual</span>(<span class="hljs-params">arr1, arr2</span>) </span>{
    <span class="hljs-keyword">if</span> (arr1 === arr2) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (arr1.length != arr2.length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr1.length; ++i) {
        <span class="hljs-keyword">if</span> (arr1[i] !== arr2[i]) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<h2 id="articleHeader4">2.Class</h2>
<h3 id="articleHeader5">2.1 addClass</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x4E3A;&#x5143;&#x7D20;&#x6DFB;&#x52A0;class
 * @param  {HTMLElement} ele 
 * @param  {String} cls 
 */

var hasClass = require(&apos;./hasClass&apos;);

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += &apos; &apos; + cls;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x4E3A;&#x5143;&#x7D20;&#x6DFB;&#x52A0;class
 * @param  {HTMLElement} ele 
 * @param  {String} cls 
 */</span>

<span class="hljs-keyword">var</span> hasClass = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./hasClass&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addClass</span>(<span class="hljs-params">ele, cls</span>) </span>{
    <span class="hljs-keyword">if</span> (!hasClass(ele, cls)) {
        ele.className += <span class="hljs-string">&apos; &apos;</span> + cls;
    }
}</code></pre>
<h3 id="articleHeader6">2.2 hasClass</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x6709;&#x67D0;&#x4E2A;class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 * @return {Boolean}
 */
function hasClass(ele, cls) {
    return (new RegExp(&apos;(\\s|^)&apos; + cls + &apos;(\\s|$)&apos;)).test(ele.className);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x6709;&#x67D0;&#x4E2A;class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 * @return {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasClass</span>(<span class="hljs-params">ele, cls</span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;(\\s|^)&apos;</span> + cls + <span class="hljs-string">&apos;(\\s|$)&apos;</span>)).test(ele.className);
}</code></pre>
<h3 id="articleHeader7">2.3 removeClass</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x4E3A;&#x5143;&#x7D20;&#x79FB;&#x9664;class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 */

var hasClass = require(&apos;./hasClass&apos;);

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp(&apos;(\\s|^)&apos; + cls + &apos;(\\s|$)&apos;);
        ele.className = ele.className.replace(reg, &apos; &apos;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x4E3A;&#x5143;&#x7D20;&#x79FB;&#x9664;class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 */</span>

<span class="hljs-keyword">var</span> hasClass = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./hasClass&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeClass</span>(<span class="hljs-params">ele, cls</span>) </span>{
    <span class="hljs-keyword">if</span> (hasClass(ele, cls)) {
        <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;(\\s|^)&apos;</span> + cls + <span class="hljs-string">&apos;(\\s|$)&apos;</span>);
        ele.className = ele.className.replace(reg, <span class="hljs-string">&apos; &apos;</span>);
    }
}</code></pre>
<h2 id="articleHeader8">3.Cookie</h2>
<h3 id="articleHeader9">3.1 getCookie</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x6839;&#x636E;name&#x8BFB;&#x53D6;cookie
 * @param  {String} name 
 * @return {String}
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, &quot;&quot;).split(&apos;;&apos;);
    for (var i = 0; i &lt; arr.length; i++) {
        var tempArr = arr[i].split(&apos;=&apos;);
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return &apos;&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x6839;&#x636E;name&#x8BFB;&#x53D6;cookie
 * @param  {String} name 
 * @return {String}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">document</span>.cookie.replace(<span class="hljs-regexp">/\s/g</span>, <span class="hljs-string">&quot;&quot;</span>).split(<span class="hljs-string">&apos;;&apos;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">var</span> tempArr = arr[i].split(<span class="hljs-string">&apos;=&apos;</span>);
        <span class="hljs-keyword">if</span> (tempArr[<span class="hljs-number">0</span>] == name) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">decodeURIComponent</span>(tempArr[<span class="hljs-number">1</span>]);
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&apos;</span>;
}</code></pre>
<h3 id="articleHeader10">3.2 removeCookie</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var setCookie = require(&apos;./setCookie&apos;);
/**
 * 
 * @desc &#x6839;&#x636E;name&#x5220;&#x9664;cookie
 * @param  {String} name 
 */
function removeCookie(name) {
    // &#x8BBE;&#x7F6E;&#x5DF2;&#x8FC7;&#x671F;&#xFF0C;&#x7CFB;&#x7EDF;&#x4F1A;&#x7ACB;&#x523B;&#x5220;&#x9664;cookie
    setCookie(name, &apos;1&apos;, -1);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> setCookie = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./setCookie&apos;</span>);
<span class="hljs-comment">/**
 * 
 * @desc &#x6839;&#x636E;name&#x5220;&#x9664;cookie
 * @param  {String} name 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeCookie</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5DF2;&#x8FC7;&#x671F;&#xFF0C;&#x7CFB;&#x7EDF;&#x4F1A;&#x7ACB;&#x523B;&#x5220;&#x9664;cookie</span>
    setCookie(name, <span class="hljs-string">&apos;1&apos;</span>, <span class="hljs-number">-1</span>);
}</code></pre>
<h3 id="articleHeader11">3.3 setCookie</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc  &#x8BBE;&#x7F6E;Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {Number} days 
 */
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + &apos;=&apos; + value + &apos;;expires=&apos; + date;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc  &#x8BBE;&#x7F6E;Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {Number} days 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span>(<span class="hljs-params">name, value, days</span>) </span>{
    <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    date.setDate(date.getDate() + days);
    <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">&apos;=&apos;</span> + value + <span class="hljs-string">&apos;;expires=&apos;</span> + date;
}</code></pre>
<h2 id="articleHeader12">4.Device</h2>
<h3 id="articleHeader13">4.1 getExplore</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x83B7;&#x53D6;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;&#x548C;&#x7248;&#x672C;
 * @return {String} 
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // &#x6839;&#x636E;&#x5173;&#x7CFB;&#x8FDB;&#x884C;&#x5224;&#x65AD;
    if (sys.ie) return (&apos;IE: &apos; + sys.ie)
    if (sys.edge) return (&apos;EDGE: &apos; + sys.edge)
    if (sys.firefox) return (&apos;Firefox: &apos; + sys.firefox)
    if (sys.chrome) return (&apos;Chrome: &apos; + sys.chrome)
    if (sys.opera) return (&apos;Opera: &apos; + sys.opera)
    if (sys.safari) return (&apos;Safari: &apos; + sys.safari)
    return &apos;Unkonwn&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x83B7;&#x53D6;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;&#x548C;&#x7248;&#x672C;
 * @return {String} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getExplore</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(<span class="hljs-regexp">/rv:([\d.]+)\) like gecko/</span>)) ? sys.ie = s[<span class="hljs-number">1</span>]:
        (s = ua.match(<span class="hljs-regexp">/msie ([\d\.]+)/</span>)) ? sys.ie = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/edge\/([\d\.]+)/</span>)) ? sys.edge = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/firefox\/([\d\.]+)/</span>)) ? sys.firefox = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/(?:opera|opr).([\d\.]+)/</span>)) ? sys.opera = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/chrome\/([\d\.]+)/</span>)) ? sys.chrome = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/version\/([\d\.]+).*safari/</span>)) ? sys.safari = s[<span class="hljs-number">1</span>] : <span class="hljs-number">0</span>;
    <span class="hljs-comment">// &#x6839;&#x636E;&#x5173;&#x7CFB;&#x8FDB;&#x884C;&#x5224;&#x65AD;</span>
    <span class="hljs-keyword">if</span> (sys.ie) <span class="hljs-keyword">return</span> (<span class="hljs-string">&apos;IE: &apos;</span> + sys.ie)
    <span class="hljs-keyword">if</span> (sys.edge) <span class="hljs-keyword">return</span> (<span class="hljs-string">&apos;EDGE: &apos;</span> + sys.edge)
    <span class="hljs-keyword">if</span> (sys.firefox) <span class="hljs-keyword">return</span> (<span class="hljs-string">&apos;Firefox: &apos;</span> + sys.firefox)
    <span class="hljs-keyword">if</span> (sys.chrome) <span class="hljs-keyword">return</span> (<span class="hljs-string">&apos;Chrome: &apos;</span> + sys.chrome)
    <span class="hljs-keyword">if</span> (sys.opera) <span class="hljs-keyword">return</span> (<span class="hljs-string">&apos;Opera: &apos;</span> + sys.opera)
    <span class="hljs-keyword">if</span> (sys.safari) <span class="hljs-keyword">return</span> (<span class="hljs-string">&apos;Safari: &apos;</span> + sys.safari)
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;Unkonwn&apos;</span>
}</code></pre>
<h3 id="articleHeader14">4.2 getOS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x83B7;&#x53D6;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x7C7B;&#x578B;
 * @return {String} 
 */
function getOS() {
    var userAgent = &apos;navigator&apos; in window &amp;&amp; &apos;userAgent&apos; in navigator &amp;&amp; navigator.userAgent.toLowerCase() || &apos;&apos;;
    var vendor = &apos;navigator&apos; in window &amp;&amp; &apos;vendor&apos; in navigator &amp;&amp; navigator.vendor.toLowerCase() || &apos;&apos;;
    var appVersion = &apos;navigator&apos; in window &amp;&amp; &apos;appVersion&apos; in navigator &amp;&amp; navigator.appVersion.toLowerCase() || &apos;&apos;;

    if (/mac/i.test(appVersion)) return &apos;MacOSX&apos;
    if (/win/i.test(appVersion)) return &apos;windows&apos;
    if (/linux/i.test(appVersion)) return &apos;linux&apos;
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) &apos;ios&apos;
    if (/android/i.test(userAgent)) return &apos;android&apos;
    if (/win/i.test(appVersion) &amp;&amp; /phone/i.test(userAgent)) return &apos;windowsPhone&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x83B7;&#x53D6;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x7C7B;&#x578B;
 * @return {String} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getOS</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> userAgent = <span class="hljs-string">&apos;navigator&apos;</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> &amp;&amp; <span class="hljs-string">&apos;userAgent&apos;</span> <span class="hljs-keyword">in</span> navigator &amp;&amp; navigator.userAgent.toLowerCase() || <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">var</span> vendor = <span class="hljs-string">&apos;navigator&apos;</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> &amp;&amp; <span class="hljs-string">&apos;vendor&apos;</span> <span class="hljs-keyword">in</span> navigator &amp;&amp; navigator.vendor.toLowerCase() || <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">var</span> appVersion = <span class="hljs-string">&apos;navigator&apos;</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> &amp;&amp; <span class="hljs-string">&apos;appVersion&apos;</span> <span class="hljs-keyword">in</span> navigator &amp;&amp; navigator.appVersion.toLowerCase() || <span class="hljs-string">&apos;&apos;</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/mac/i</span>.test(appVersion)) <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;MacOSX&apos;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/win/i</span>.test(appVersion)) <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;windows&apos;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/linux/i</span>.test(appVersion)) <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;linux&apos;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/iphone/i</span>.test(userAgent) || <span class="hljs-regexp">/ipad/i</span>.test(userAgent) || <span class="hljs-regexp">/ipod/i</span>.test(userAgent)) <span class="hljs-string">&apos;ios&apos;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/android/i</span>.test(userAgent)) <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;android&apos;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/win/i</span>.test(appVersion) &amp;&amp; <span class="hljs-regexp">/phone/i</span>.test(userAgent)) <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;windowsPhone&apos;</span>
}</code></pre>
<h2 id="articleHeader15">5.Dom</h2>
<h3 id="articleHeader16">5.1 getScrollTop</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x83B7;&#x53D6;&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
 */
function getScrollTop() {
    return (document.documentElement &amp;&amp; document.documentElement.scrollTop) || document.body.scrollTop;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x83B7;&#x53D6;&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-built_in">document</span>.documentElement &amp;&amp; <span class="hljs-built_in">document</span>.documentElement.scrollTop) || <span class="hljs-built_in">document</span>.body.scrollTop;
}</code></pre>
<h3 id="articleHeader17">5.2 offset</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc  &#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x8DDD;&#x79BB;&#x6587;&#x6863;(document)&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x7C7B;&#x4F3C;jQ&#x4E2D;&#x7684;offset()
 * @param {HTMLElement} ele 
 * @returns { {left: number, top: number} }
 */
function offset(ele) {
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    };
    return pos;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc  &#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x8DDD;&#x79BB;&#x6587;&#x6863;(document)&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x7C7B;&#x4F3C;jQ&#x4E2D;&#x7684;offset()
 * @param {HTMLElement} ele 
 * @returns { {left: number, top: number} }
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">offset</span>(<span class="hljs-params">ele</span>) </span>{
    <span class="hljs-keyword">var</span> pos = {
        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>
    };
    <span class="hljs-keyword">while</span> (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    };
    <span class="hljs-keyword">return</span> pos;
}</code></pre>
<h3 id="articleHeader18">5.3 scrollTo</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getScrollTop = require(&apos;./getScrollTop&apos;);
var setScrollTop = require(&apos;./setScrollTop&apos;);
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
/**
 * 
 * @desc  &#x5728;${duration}&#x65F6;&#x95F4;&#x5185;&#xFF0C;&#x6EDA;&#x52A8;&#x6761;&#x5E73;&#x6ED1;&#x6EDA;&#x52A8;&#x5230;${to}&#x6307;&#x5B9A;&#x4F4D;&#x7F6E;
 * @param {Number} to 
 * @param {Number} duration 
 */
function scrollTo(to, duration) {
    if (duration &lt; 0) {
        setScrollTop(to);
        return
    }
    var diff = to - getScrollTop();
    if (diff === 0) return
    var step = diff / duration * 10;
    requestAnimationFrame(
        function () {
            if (Math.abs(step) &gt; Math.abs(diff)) {
                setScrollTop(getScrollTop() + diff);
                return;
            }
            setScrollTop(getScrollTop() + step);
            if (diff &gt; 0 &amp;&amp; getScrollTop() &gt;= to || diff &lt; 0 &amp;&amp; getScrollTop() &lt;= to) {
                return;
            }
            scrollTo(to, duration - 16);
        });
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getScrollTop = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./getScrollTop&apos;</span>);
<span class="hljs-keyword">var</span> setScrollTop = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./setScrollTop&apos;</span>);
<span class="hljs-keyword">var</span> requestAnimFrame = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.requestAnimationFrame ||
        <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame ||
        <span class="hljs-built_in">window</span>.mozRequestAnimationFrame ||
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            <span class="hljs-built_in">window</span>.setTimeout(callback, <span class="hljs-number">1000</span> / <span class="hljs-number">60</span>);
        };
})();
<span class="hljs-comment">/**
 * 
 * @desc  &#x5728;${duration}&#x65F6;&#x95F4;&#x5185;&#xFF0C;&#x6EDA;&#x52A8;&#x6761;&#x5E73;&#x6ED1;&#x6EDA;&#x52A8;&#x5230;${to}&#x6307;&#x5B9A;&#x4F4D;&#x7F6E;
 * @param {Number} to 
 * @param {Number} duration 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scrollTo</span>(<span class="hljs-params">to, duration</span>) </span>{
    <span class="hljs-keyword">if</span> (duration &lt; <span class="hljs-number">0</span>) {
        setScrollTop(to);
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">var</span> diff = to - getScrollTop();
    <span class="hljs-keyword">if</span> (diff === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">var</span> step = diff / duration * <span class="hljs-number">10</span>;
    requestAnimationFrame(
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(step) &gt; <span class="hljs-built_in">Math</span>.abs(diff)) {
                setScrollTop(getScrollTop() + diff);
                <span class="hljs-keyword">return</span>;
            }
            setScrollTop(getScrollTop() + step);
            <span class="hljs-keyword">if</span> (diff &gt; <span class="hljs-number">0</span> &amp;&amp; getScrollTop() &gt;= to || diff &lt; <span class="hljs-number">0</span> &amp;&amp; getScrollTop() &lt;= to) {
                <span class="hljs-keyword">return</span>;
            }
            scrollTo(to, duration - <span class="hljs-number">16</span>);
        });
}</code></pre>
<h3 id="articleHeader19">5.4 setScrollTop</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x8BBE;&#x7F6E;&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
 */
function setScrollTop(value) {
    window.scrollTo(0, value);
    return value;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x8BBE;&#x7F6E;&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setScrollTop</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, value);
    <span class="hljs-keyword">return</span> value;
}</code></pre>
<h2 id="articleHeader20">6.Keycode</h2>
<h3 id="articleHeader21">6.1 getKeyName</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keyCodeMap = {
    8: &apos;Backspace&apos;,
    9: &apos;Tab&apos;,
    13: &apos;Enter&apos;,
    16: &apos;Shift&apos;,
    17: &apos;Ctrl&apos;,
    18: &apos;Alt&apos;,
    19: &apos;Pause&apos;,
    20: &apos;Caps Lock&apos;,
    27: &apos;Escape&apos;,
    32: &apos;Space&apos;,
    33: &apos;Page Up&apos;,
    34: &apos;Page Down&apos;,
    35: &apos;End&apos;,
    36: &apos;Home&apos;,
    37: &apos;Left&apos;,
    38: &apos;Up&apos;,
    39: &apos;Right&apos;,
    40: &apos;Down&apos;,
    42: &apos;Print Screen&apos;,
    45: &apos;Insert&apos;,
    46: &apos;Delete&apos;,

    48: &apos;0&apos;,
    49: &apos;1&apos;,
    50: &apos;2&apos;,
    51: &apos;3&apos;,
    52: &apos;4&apos;,
    53: &apos;5&apos;,
    54: &apos;6&apos;,
    55: &apos;7&apos;,
    56: &apos;8&apos;,
    57: &apos;9&apos;,

    65: &apos;A&apos;,
    66: &apos;B&apos;,
    67: &apos;C&apos;,
    68: &apos;D&apos;,
    69: &apos;E&apos;,
    70: &apos;F&apos;,
    71: &apos;G&apos;,
    72: &apos;H&apos;,
    73: &apos;I&apos;,
    74: &apos;J&apos;,
    75: &apos;K&apos;,
    76: &apos;L&apos;,
    77: &apos;M&apos;,
    78: &apos;N&apos;,
    79: &apos;O&apos;,
    80: &apos;P&apos;,
    81: &apos;Q&apos;,
    82: &apos;R&apos;,
    83: &apos;S&apos;,
    84: &apos;T&apos;,
    85: &apos;U&apos;,
    86: &apos;V&apos;,
    87: &apos;W&apos;,
    88: &apos;X&apos;,
    89: &apos;Y&apos;,
    90: &apos;Z&apos;,

    91: &apos;Windows&apos;,
    93: &apos;Right Click&apos;,

    96: &apos;Numpad 0&apos;,
    97: &apos;Numpad 1&apos;,
    98: &apos;Numpad 2&apos;,
    99: &apos;Numpad 3&apos;,
    100: &apos;Numpad 4&apos;,
    101: &apos;Numpad 5&apos;,
    102: &apos;Numpad 6&apos;,
    103: &apos;Numpad 7&apos;,
    104: &apos;Numpad 8&apos;,
    105: &apos;Numpad 9&apos;,
    106: &apos;Numpad *&apos;,
    107: &apos;Numpad +&apos;,
    109: &apos;Numpad -&apos;,
    110: &apos;Numpad .&apos;,
    111: &apos;Numpad /&apos;,

    112: &apos;F1&apos;,
    113: &apos;F2&apos;,
    114: &apos;F3&apos;,
    115: &apos;F4&apos;,
    116: &apos;F5&apos;,
    117: &apos;F6&apos;,
    118: &apos;F7&apos;,
    119: &apos;F8&apos;,
    120: &apos;F9&apos;,
    121: &apos;F10&apos;,
    122: &apos;F11&apos;,
    123: &apos;F12&apos;,

    144: &apos;Num Lock&apos;,
    145: &apos;Scroll Lock&apos;,
    182: &apos;My Computer&apos;,
    183: &apos;My Calculator&apos;,
    186: &apos;;&apos;,
    187: &apos;=&apos;,
    188: &apos;,&apos;,
    189: &apos;-&apos;,
    190: &apos;.&apos;,
    191: &apos;/&apos;,
    192: &apos;`&apos;,
    219: &apos;[&apos;,
    220: &apos;\\&apos;,
    221: &apos;]&apos;,
    222: &apos;\&apos;&apos;
};
/**
 * @desc &#x6839;&#x636E;keycode&#x83B7;&#x5F97;&#x952E;&#x540D;
 * @param  {Number} keycode 
 * @return {String}
 */
function getKeyName(keycode) {
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    } else {
        console.log(&apos;Unknow Key(Key Code:&apos; + keycode + &apos;)&apos;);
        return &apos;&apos;;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> keyCodeMap = {
    <span class="hljs-number">8</span>: <span class="hljs-string">&apos;Backspace&apos;</span>,
    <span class="hljs-number">9</span>: <span class="hljs-string">&apos;Tab&apos;</span>,
    <span class="hljs-number">13</span>: <span class="hljs-string">&apos;Enter&apos;</span>,
    <span class="hljs-number">16</span>: <span class="hljs-string">&apos;Shift&apos;</span>,
    <span class="hljs-number">17</span>: <span class="hljs-string">&apos;Ctrl&apos;</span>,
    <span class="hljs-number">18</span>: <span class="hljs-string">&apos;Alt&apos;</span>,
    <span class="hljs-number">19</span>: <span class="hljs-string">&apos;Pause&apos;</span>,
    <span class="hljs-number">20</span>: <span class="hljs-string">&apos;Caps Lock&apos;</span>,
    <span class="hljs-number">27</span>: <span class="hljs-string">&apos;Escape&apos;</span>,
    <span class="hljs-number">32</span>: <span class="hljs-string">&apos;Space&apos;</span>,
    <span class="hljs-number">33</span>: <span class="hljs-string">&apos;Page Up&apos;</span>,
    <span class="hljs-number">34</span>: <span class="hljs-string">&apos;Page Down&apos;</span>,
    <span class="hljs-number">35</span>: <span class="hljs-string">&apos;End&apos;</span>,
    <span class="hljs-number">36</span>: <span class="hljs-string">&apos;Home&apos;</span>,
    <span class="hljs-number">37</span>: <span class="hljs-string">&apos;Left&apos;</span>,
    <span class="hljs-number">38</span>: <span class="hljs-string">&apos;Up&apos;</span>,
    <span class="hljs-number">39</span>: <span class="hljs-string">&apos;Right&apos;</span>,
    <span class="hljs-number">40</span>: <span class="hljs-string">&apos;Down&apos;</span>,
    <span class="hljs-number">42</span>: <span class="hljs-string">&apos;Print Screen&apos;</span>,
    <span class="hljs-number">45</span>: <span class="hljs-string">&apos;Insert&apos;</span>,
    <span class="hljs-number">46</span>: <span class="hljs-string">&apos;Delete&apos;</span>,

    <span class="hljs-number">48</span>: <span class="hljs-string">&apos;0&apos;</span>,
    <span class="hljs-number">49</span>: <span class="hljs-string">&apos;1&apos;</span>,
    <span class="hljs-number">50</span>: <span class="hljs-string">&apos;2&apos;</span>,
    <span class="hljs-number">51</span>: <span class="hljs-string">&apos;3&apos;</span>,
    <span class="hljs-number">52</span>: <span class="hljs-string">&apos;4&apos;</span>,
    <span class="hljs-number">53</span>: <span class="hljs-string">&apos;5&apos;</span>,
    <span class="hljs-number">54</span>: <span class="hljs-string">&apos;6&apos;</span>,
    <span class="hljs-number">55</span>: <span class="hljs-string">&apos;7&apos;</span>,
    <span class="hljs-number">56</span>: <span class="hljs-string">&apos;8&apos;</span>,
    <span class="hljs-number">57</span>: <span class="hljs-string">&apos;9&apos;</span>,

    <span class="hljs-number">65</span>: <span class="hljs-string">&apos;A&apos;</span>,
    <span class="hljs-number">66</span>: <span class="hljs-string">&apos;B&apos;</span>,
    <span class="hljs-number">67</span>: <span class="hljs-string">&apos;C&apos;</span>,
    <span class="hljs-number">68</span>: <span class="hljs-string">&apos;D&apos;</span>,
    <span class="hljs-number">69</span>: <span class="hljs-string">&apos;E&apos;</span>,
    <span class="hljs-number">70</span>: <span class="hljs-string">&apos;F&apos;</span>,
    <span class="hljs-number">71</span>: <span class="hljs-string">&apos;G&apos;</span>,
    <span class="hljs-number">72</span>: <span class="hljs-string">&apos;H&apos;</span>,
    <span class="hljs-number">73</span>: <span class="hljs-string">&apos;I&apos;</span>,
    <span class="hljs-number">74</span>: <span class="hljs-string">&apos;J&apos;</span>,
    <span class="hljs-number">75</span>: <span class="hljs-string">&apos;K&apos;</span>,
    <span class="hljs-number">76</span>: <span class="hljs-string">&apos;L&apos;</span>,
    <span class="hljs-number">77</span>: <span class="hljs-string">&apos;M&apos;</span>,
    <span class="hljs-number">78</span>: <span class="hljs-string">&apos;N&apos;</span>,
    <span class="hljs-number">79</span>: <span class="hljs-string">&apos;O&apos;</span>,
    <span class="hljs-number">80</span>: <span class="hljs-string">&apos;P&apos;</span>,
    <span class="hljs-number">81</span>: <span class="hljs-string">&apos;Q&apos;</span>,
    <span class="hljs-number">82</span>: <span class="hljs-string">&apos;R&apos;</span>,
    <span class="hljs-number">83</span>: <span class="hljs-string">&apos;S&apos;</span>,
    <span class="hljs-number">84</span>: <span class="hljs-string">&apos;T&apos;</span>,
    <span class="hljs-number">85</span>: <span class="hljs-string">&apos;U&apos;</span>,
    <span class="hljs-number">86</span>: <span class="hljs-string">&apos;V&apos;</span>,
    <span class="hljs-number">87</span>: <span class="hljs-string">&apos;W&apos;</span>,
    <span class="hljs-number">88</span>: <span class="hljs-string">&apos;X&apos;</span>,
    <span class="hljs-number">89</span>: <span class="hljs-string">&apos;Y&apos;</span>,
    <span class="hljs-number">90</span>: <span class="hljs-string">&apos;Z&apos;</span>,

    <span class="hljs-number">91</span>: <span class="hljs-string">&apos;Windows&apos;</span>,
    <span class="hljs-number">93</span>: <span class="hljs-string">&apos;Right Click&apos;</span>,

    <span class="hljs-number">96</span>: <span class="hljs-string">&apos;Numpad 0&apos;</span>,
    <span class="hljs-number">97</span>: <span class="hljs-string">&apos;Numpad 1&apos;</span>,
    <span class="hljs-number">98</span>: <span class="hljs-string">&apos;Numpad 2&apos;</span>,
    <span class="hljs-number">99</span>: <span class="hljs-string">&apos;Numpad 3&apos;</span>,
    <span class="hljs-number">100</span>: <span class="hljs-string">&apos;Numpad 4&apos;</span>,
    <span class="hljs-number">101</span>: <span class="hljs-string">&apos;Numpad 5&apos;</span>,
    <span class="hljs-number">102</span>: <span class="hljs-string">&apos;Numpad 6&apos;</span>,
    <span class="hljs-number">103</span>: <span class="hljs-string">&apos;Numpad 7&apos;</span>,
    <span class="hljs-number">104</span>: <span class="hljs-string">&apos;Numpad 8&apos;</span>,
    <span class="hljs-number">105</span>: <span class="hljs-string">&apos;Numpad 9&apos;</span>,
    <span class="hljs-number">106</span>: <span class="hljs-string">&apos;Numpad *&apos;</span>,
    <span class="hljs-number">107</span>: <span class="hljs-string">&apos;Numpad +&apos;</span>,
    <span class="hljs-number">109</span>: <span class="hljs-string">&apos;Numpad -&apos;</span>,
    <span class="hljs-number">110</span>: <span class="hljs-string">&apos;Numpad .&apos;</span>,
    <span class="hljs-number">111</span>: <span class="hljs-string">&apos;Numpad /&apos;</span>,

    <span class="hljs-number">112</span>: <span class="hljs-string">&apos;F1&apos;</span>,
    <span class="hljs-number">113</span>: <span class="hljs-string">&apos;F2&apos;</span>,
    <span class="hljs-number">114</span>: <span class="hljs-string">&apos;F3&apos;</span>,
    <span class="hljs-number">115</span>: <span class="hljs-string">&apos;F4&apos;</span>,
    <span class="hljs-number">116</span>: <span class="hljs-string">&apos;F5&apos;</span>,
    <span class="hljs-number">117</span>: <span class="hljs-string">&apos;F6&apos;</span>,
    <span class="hljs-number">118</span>: <span class="hljs-string">&apos;F7&apos;</span>,
    <span class="hljs-number">119</span>: <span class="hljs-string">&apos;F8&apos;</span>,
    <span class="hljs-number">120</span>: <span class="hljs-string">&apos;F9&apos;</span>,
    <span class="hljs-number">121</span>: <span class="hljs-string">&apos;F10&apos;</span>,
    <span class="hljs-number">122</span>: <span class="hljs-string">&apos;F11&apos;</span>,
    <span class="hljs-number">123</span>: <span class="hljs-string">&apos;F12&apos;</span>,

    <span class="hljs-number">144</span>: <span class="hljs-string">&apos;Num Lock&apos;</span>,
    <span class="hljs-number">145</span>: <span class="hljs-string">&apos;Scroll Lock&apos;</span>,
    <span class="hljs-number">182</span>: <span class="hljs-string">&apos;My Computer&apos;</span>,
    <span class="hljs-number">183</span>: <span class="hljs-string">&apos;My Calculator&apos;</span>,
    <span class="hljs-number">186</span>: <span class="hljs-string">&apos;;&apos;</span>,
    <span class="hljs-number">187</span>: <span class="hljs-string">&apos;=&apos;</span>,
    <span class="hljs-number">188</span>: <span class="hljs-string">&apos;,&apos;</span>,
    <span class="hljs-number">189</span>: <span class="hljs-string">&apos;-&apos;</span>,
    <span class="hljs-number">190</span>: <span class="hljs-string">&apos;.&apos;</span>,
    <span class="hljs-number">191</span>: <span class="hljs-string">&apos;/&apos;</span>,
    <span class="hljs-number">192</span>: <span class="hljs-string">&apos;`&apos;</span>,
    <span class="hljs-number">219</span>: <span class="hljs-string">&apos;[&apos;</span>,
    <span class="hljs-number">220</span>: <span class="hljs-string">&apos;\\&apos;</span>,
    <span class="hljs-number">221</span>: <span class="hljs-string">&apos;]&apos;</span>,
    <span class="hljs-number">222</span>: <span class="hljs-string">&apos;\&apos;&apos;</span>
};
<span class="hljs-comment">/**
 * @desc &#x6839;&#x636E;keycode&#x83B7;&#x5F97;&#x952E;&#x540D;
 * @param  {Number} keycode 
 * @return {String}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getKeyName</span>(<span class="hljs-params">keycode</span>) </span>{
    <span class="hljs-keyword">if</span> (keyCodeMap[keycode]) {
        <span class="hljs-keyword">return</span> keyCodeMap[keycode];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Unknow Key(Key Code:&apos;</span> + keycode + <span class="hljs-string">&apos;)&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&apos;</span>;
    }
};</code></pre>
<h2 id="articleHeader22">7.Object</h2>
<h3 id="articleHeader23">7.1 deepClone</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc &#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x652F;&#x6301;&#x5E38;&#x89C1;&#x7C7B;&#x578B;
 * @param {Any} values
 */
function deepClone(values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || &quot;object&quot; != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i &lt; len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error(&quot;Unable to copy values! Its type isn&apos;t supported.&quot;);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @desc &#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;&#x652F;&#x6301;&#x5E38;&#x89C1;&#x7C7B;&#x578B;
 * @param {Any} values
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">values</span>) </span>{
    <span class="hljs-keyword">var</span> copy;

    <span class="hljs-comment">// Handle the 3 simple types, and null or undefined</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">null</span> == values || <span class="hljs-string">&quot;object&quot;</span> != <span class="hljs-keyword">typeof</span> values) <span class="hljs-keyword">return</span> values;

    <span class="hljs-comment">// Handle Date</span>
    <span class="hljs-keyword">if</span> (values <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
        copy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        copy.setTime(values.getTime());
        <span class="hljs-keyword">return</span> copy;
    }

    <span class="hljs-comment">// Handle Array</span>
    <span class="hljs-keyword">if</span> (values <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
        copy = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = values.length; i &lt; len; i++) {
            copy[i] = deepClone(values[i]);
        }
        <span class="hljs-keyword">return</span> copy;
    }

    <span class="hljs-comment">// Handle Object</span>
    <span class="hljs-keyword">if</span> (values <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>) {
        copy = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> values) {
            <span class="hljs-keyword">if</span> (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        <span class="hljs-keyword">return</span> copy;
    }

    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;Unable to copy values! Its type isn&apos;t supported.&quot;</span>);
}</code></pre>
<h3 id="articleHeader24">7.2 isEmptyObject</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x5224;&#x65AD;`obj`&#x662F;&#x5426;&#x4E3A;&#x7A7A;
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== &apos;object&apos; || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x5224;&#x65AD;`obj`&#x662F;&#x5426;&#x4E3A;&#x7A7A;
 * @param  {Object} obj
 * @return {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (!obj || <span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">&apos;object&apos;</span> || <span class="hljs-built_in">Array</span>.isArray(obj))
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    <span class="hljs-keyword">return</span> !<span class="hljs-built_in">Object</span>.keys(obj).length
}</code></pre>
<h2 id="articleHeader25">8.Random</h2>
<h3 id="articleHeader26">8.1 randomColor</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x968F;&#x673A;&#x751F;&#x6210;&#x989C;&#x8272;
 * @return {String} 
 */
function randomColor() {
    return &apos;#&apos; + (&apos;00000&apos; + (Math.random() * 0x1000000 &lt;&lt; 0).toString(16)).slice(-6);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x968F;&#x673A;&#x751F;&#x6210;&#x989C;&#x8272;
 * @return {String} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomColor</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;#&apos;</span> + (<span class="hljs-string">&apos;00000&apos;</span> + (<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">0x1000000</span> &lt;&lt; <span class="hljs-number">0</span>).toString(<span class="hljs-number">16</span>)).slice(<span class="hljs-number">-6</span>);
}</code></pre>
<h3 id="articleHeader27">8.2 randomNum&#x2003;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x751F;&#x6210;&#x6307;&#x5B9A;&#x8303;&#x56F4;&#x968F;&#x673A;&#x6570;
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {Number} 
 */
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x751F;&#x6210;&#x6307;&#x5B9A;&#x8303;&#x56F4;&#x968F;&#x673A;&#x6570;
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {Number} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomNum</span>(<span class="hljs-params">min, max</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(min + <span class="hljs-built_in">Math</span>.random() * (max - min));
}</code></pre>
<h2 id="articleHeader28">9.Regexp</h2>
<h3 id="articleHeader29">9.1 isEmail</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x90AE;&#x7BB1;&#x5730;&#x5740;
 * @param  {String}  str
 * @return {Boolean} 
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x90AE;&#x7BB1;&#x5730;&#x5740;
 * @param  {String}  str
 * @return {Boolean} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmail</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/</span>.test(str);
}</code></pre>
<h3 id="articleHeader30">9.2 isIdCard</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc  &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x8EAB;&#x4EFD;&#x8BC1;&#x53F7;
 * @param  {String|Number} str 
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc  &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x8EAB;&#x4EFD;&#x8BC1;&#x53F7;
 * @param  {String|Number} str 
 * @return {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isIdCard</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/</span>.test(str)
}</code></pre>
<h3 id="articleHeader31">9.3 isPhoneNum</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x624B;&#x673A;&#x53F7;
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x624B;&#x673A;&#x53F7;
 * @param  {String|Number} str 
 * @return {Boolean} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPhoneNum</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/</span>.test(str)
}</code></pre>
<h3 id="articleHeader32">9.4 isUrl</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;URL&#x5730;&#x5740;
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&amp;//=]*)/i.test(str);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;URL&#x5730;&#x5740;
 * @param  {String} str 
 * @return {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isUrl</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&amp;//=]*)/i</span>.test(str);
}</code></pre>
<h2 id="articleHeader33">10.String</h2>
<h3 id="articleHeader34">10.1 digitUppercase</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x73B0;&#x91D1;&#x989D;&#x8F6C;&#x5927;&#x5199;
 * @param  {Number} n 
 * @return {String}
 */
function digitUppercase(n) {
    var fraction = [&apos;&#x89D2;&apos;, &apos;&#x5206;&apos;];
    var digit = [
        &apos;&#x96F6;&apos;, &apos;&#x58F9;&apos;, &apos;&#x8D30;&apos;, &apos;&#x53C1;&apos;, &apos;&#x8086;&apos;,
        &apos;&#x4F0D;&apos;, &apos;&#x9646;&apos;, &apos;&#x67D2;&apos;, &apos;&#x634C;&apos;, &apos;&#x7396;&apos;
    ];
    var unit = [
        [&apos;&#x5143;&apos;, &apos;&#x4E07;&apos;, &apos;&#x4EBF;&apos;],
        [&apos;&apos;, &apos;&#x62FE;&apos;, &apos;&#x4F70;&apos;, &apos;&#x4EDF;&apos;]
    ];
    var head = n &lt; 0 ? &apos;&#x6B20;&apos; : &apos;&apos;;
    n = Math.abs(n);
    var s = &apos;&apos;;
    for (var i = 0; i &lt; fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/&#x96F6;./, &apos;&apos;);
    }
    s = s || &apos;&#x6574;&apos;;
    n = Math.floor(n);
    for (var i = 0; i &lt; unit[0].length &amp;&amp; n &gt; 0; i++) {
        var p = &apos;&apos;;
        for (var j = 0; j &lt; unit[1].length &amp;&amp; n &gt; 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(&#x96F6;.)*&#x96F6;$/, &apos;&apos;).replace(/^$/, &apos;&#x96F6;&apos;) + unit[0][i] + s;
    }
    return head + s.replace(/(&#x96F6;.)*&#x96F6;&#x5143;/, &apos;&#x5143;&apos;)
        .replace(/(&#x96F6;.)+/g, &apos;&#x96F6;&apos;)
        .replace(/^&#x6574;$/, &apos;&#x96F6;&#x5143;&#x6574;&apos;);
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x73B0;&#x91D1;&#x989D;&#x8F6C;&#x5927;&#x5199;
 * @param  {Number} n 
 * @return {String}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">digitUppercase</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">var</span> fraction = [<span class="hljs-string">&apos;&#x89D2;&apos;</span>, <span class="hljs-string">&apos;&#x5206;&apos;</span>];
    <span class="hljs-keyword">var</span> digit = [
        <span class="hljs-string">&apos;&#x96F6;&apos;</span>, <span class="hljs-string">&apos;&#x58F9;&apos;</span>, <span class="hljs-string">&apos;&#x8D30;&apos;</span>, <span class="hljs-string">&apos;&#x53C1;&apos;</span>, <span class="hljs-string">&apos;&#x8086;&apos;</span>,
        <span class="hljs-string">&apos;&#x4F0D;&apos;</span>, <span class="hljs-string">&apos;&#x9646;&apos;</span>, <span class="hljs-string">&apos;&#x67D2;&apos;</span>, <span class="hljs-string">&apos;&#x634C;&apos;</span>, <span class="hljs-string">&apos;&#x7396;&apos;</span>
    ];
    <span class="hljs-keyword">var</span> unit = [
        [<span class="hljs-string">&apos;&#x5143;&apos;</span>, <span class="hljs-string">&apos;&#x4E07;&apos;</span>, <span class="hljs-string">&apos;&#x4EBF;&apos;</span>],
        [<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-string">&apos;&#x62FE;&apos;</span>, <span class="hljs-string">&apos;&#x4F70;&apos;</span>, <span class="hljs-string">&apos;&#x4EDF;&apos;</span>]
    ];
    <span class="hljs-keyword">var</span> head = n &lt; <span class="hljs-number">0</span> ? <span class="hljs-string">&apos;&#x6B20;&apos;</span> : <span class="hljs-string">&apos;&apos;</span>;
    n = <span class="hljs-built_in">Math</span>.abs(n);
    <span class="hljs-keyword">var</span> s = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; fraction.length; i++) {
        s += (digit[<span class="hljs-built_in">Math</span>.floor(n * <span class="hljs-number">10</span> * <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, i)) % <span class="hljs-number">10</span>] + fraction[i]).replace(<span class="hljs-regexp">/&#x96F6;./</span>, <span class="hljs-string">&apos;&apos;</span>);
    }
    s = s || <span class="hljs-string">&apos;&#x6574;&apos;</span>;
    n = <span class="hljs-built_in">Math</span>.floor(n);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; unit[<span class="hljs-number">0</span>].length &amp;&amp; n &gt; <span class="hljs-number">0</span>; i++) {
        <span class="hljs-keyword">var</span> p = <span class="hljs-string">&apos;&apos;</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; unit[<span class="hljs-number">1</span>].length &amp;&amp; n &gt; <span class="hljs-number">0</span>; j++) {
            p = digit[n % <span class="hljs-number">10</span>] + unit[<span class="hljs-number">1</span>][j] + p;
            n = <span class="hljs-built_in">Math</span>.floor(n / <span class="hljs-number">10</span>);
        }
        s = p.replace(<span class="hljs-regexp">/(&#x96F6;.)*&#x96F6;$/</span>, <span class="hljs-string">&apos;&apos;</span>).replace(<span class="hljs-regexp">/^$/</span>, <span class="hljs-string">&apos;&#x96F6;&apos;</span>) + unit[<span class="hljs-number">0</span>][i] + s;
    }
    <span class="hljs-keyword">return</span> head + s.replace(<span class="hljs-regexp">/(&#x96F6;.)*&#x96F6;&#x5143;/</span>, <span class="hljs-string">&apos;&#x5143;&apos;</span>)
        .replace(<span class="hljs-regexp">/(&#x96F6;.)+/g</span>, <span class="hljs-string">&apos;&#x96F6;&apos;</span>)
        .replace(<span class="hljs-regexp">/^&#x6574;$/</span>, <span class="hljs-string">&apos;&#x96F6;&#x5143;&#x6574;&apos;</span>);
};</code></pre>
<h2 id="articleHeader35">11.Support</h2>
<h3 id="articleHeader36">11.1 isSupportWebP</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5426;&#x652F;&#x6301;webP&#x683C;&#x5F0F;&#x56FE;&#x7247;
 * @return {Boolean} 
 */
function isSupportWebP() {
    return !![].map &amp;&amp; document.createElement(&apos;canvas&apos;).toDataURL(&apos;image/webp&apos;).indexOf(&apos;data:image/webp&apos;) == 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5426;&#x652F;&#x6301;webP&#x683C;&#x5F0F;&#x56FE;&#x7247;
 * @return {Boolean} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isSupportWebP</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> !![].map &amp;&amp; <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;canvas&apos;</span>).toDataURL(<span class="hljs-string">&apos;image/webp&apos;</span>).indexOf(<span class="hljs-string">&apos;data:image/webp&apos;</span>) == <span class="hljs-number">0</span>;
}</code></pre>
<h2 id="articleHeader37">12.Time</h2>
<h3 id="articleHeader38">12.1 formatPassTime</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc   &#x683C;&#x5F0F;&#x5316;${startTime}&#x8DDD;&#x73B0;&#x5728;&#x7684;&#x5DF2;&#x8FC7;&#x65F6;&#x95F4;
 * @param  {Date} startTime 
 * @return {String}
 */
function formatPassTime(startTime) {
    var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + &quot;&#x5E74;&#x524D;&quot;
    if (month) return month + &quot;&#x4E2A;&#x6708;&#x524D;&quot;
    if (day) return day + &quot;&#x5929;&#x524D;&quot;
    if (hour) return hour + &quot;&#x5C0F;&#x65F6;&#x524D;&quot;
    if (min) return min + &quot;&#x5206;&#x949F;&#x524D;&quot;
    else return &apos;&#x521A;&#x521A;&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @desc   &#x683C;&#x5F0F;&#x5316;${startTime}&#x8DDD;&#x73B0;&#x5728;&#x7684;&#x5DF2;&#x8FC7;&#x65F6;&#x95F4;
 * @param  {Date} startTime 
 * @return {String}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatPassTime</span>(<span class="hljs-params">startTime</span>) </span>{
    <span class="hljs-keyword">var</span> currentTime = <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),
        time = currentTime - startTime,
        day = <span class="hljs-built_in">parseInt</span>(time / (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span>)),
        hour = <span class="hljs-built_in">parseInt</span>(time / (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)),
        min = <span class="hljs-built_in">parseInt</span>(time / (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span>)),
        month = <span class="hljs-built_in">parseInt</span>(day / <span class="hljs-number">30</span>),
        year = <span class="hljs-built_in">parseInt</span>(month / <span class="hljs-number">12</span>);
    <span class="hljs-keyword">if</span> (year) <span class="hljs-keyword">return</span> year + <span class="hljs-string">&quot;&#x5E74;&#x524D;&quot;</span>
    <span class="hljs-keyword">if</span> (month) <span class="hljs-keyword">return</span> month + <span class="hljs-string">&quot;&#x4E2A;&#x6708;&#x524D;&quot;</span>
    <span class="hljs-keyword">if</span> (day) <span class="hljs-keyword">return</span> day + <span class="hljs-string">&quot;&#x5929;&#x524D;&quot;</span>
    <span class="hljs-keyword">if</span> (hour) <span class="hljs-keyword">return</span> hour + <span class="hljs-string">&quot;&#x5C0F;&#x65F6;&#x524D;&quot;</span>
    <span class="hljs-keyword">if</span> (min) <span class="hljs-keyword">return</span> min + <span class="hljs-string">&quot;&#x5206;&#x949F;&#x524D;&quot;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x521A;&#x521A;&apos;</span>
}</code></pre>
<h3 id="articleHeader39">12.2 formatRemainTime</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x683C;&#x5F0F;&#x5316;&#x73B0;&#x5728;&#x8DDD;${endTime}&#x7684;&#x5269;&#x4F59;&#x65F6;&#x95F4;
 * @param  {Date} endTime  
 * @return {String}
 */
function formatRemainTime(endTime) {
    var startDate = new Date(); //&#x5F00;&#x59CB;&#x65F6;&#x95F4;
    var endDate = new Date(endTime); //&#x7ED3;&#x675F;&#x65F6;&#x95F4;
    var t = endDate.getTime() - startDate.getTime(); //&#x65F6;&#x95F4;&#x5DEE;
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
    return d + &quot;&#x5929; &quot; + h + &quot;&#x5C0F;&#x65F6; &quot; + m + &quot;&#x5206;&#x949F; &quot; + s + &quot;&#x79D2;&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x683C;&#x5F0F;&#x5316;&#x73B0;&#x5728;&#x8DDD;${endTime}&#x7684;&#x5269;&#x4F59;&#x65F6;&#x95F4;
 * @param  {Date} endTime  
 * @return {String}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatRemainTime</span>(<span class="hljs-params">endTime</span>) </span>{
    <span class="hljs-keyword">var</span> startDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">//&#x5F00;&#x59CB;&#x65F6;&#x95F4;</span>
    <span class="hljs-keyword">var</span> endDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(endTime); <span class="hljs-comment">//&#x7ED3;&#x675F;&#x65F6;&#x95F4;</span>
    <span class="hljs-keyword">var</span> t = endDate.getTime() - startDate.getTime(); <span class="hljs-comment">//&#x65F6;&#x95F4;&#x5DEE;</span>
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
    <span class="hljs-keyword">return</span> d + <span class="hljs-string">&quot;&#x5929; &quot;</span> + h + <span class="hljs-string">&quot;&#x5C0F;&#x65F6; &quot;</span> + m + <span class="hljs-string">&quot;&#x5206;&#x949F; &quot;</span> + s + <span class="hljs-string">&quot;&#x79D2;&quot;</span>;
}</code></pre>
<h2 id="articleHeader40">13.Url</h2>
<h3 id="articleHeader41">13.1 parseQueryString</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   url&#x53C2;&#x6570;&#x8F6C;&#x5BF9;&#x8C61;
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */
function parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf(&apos;?&apos;) + 1)
    if (!search) {
        return {}
    }
    return JSON.parse(&apos;{&quot;&apos; + decodeURIComponent(search).replace(/&quot;/g, &apos;\\&quot;&apos;).replace(/&amp;/g, &apos;&quot;,&quot;&apos;).replace(/=/g, &apos;&quot;:&quot;&apos;) + &apos;&quot;}&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   url&#x53C2;&#x6570;&#x8F6C;&#x5BF9;&#x8C61;
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseQueryString</span>(<span class="hljs-params">url</span>) </span>{
    url = url == <span class="hljs-literal">null</span> ? <span class="hljs-built_in">window</span>.location.href : url
    <span class="hljs-keyword">var</span> search = url.substring(url.lastIndexOf(<span class="hljs-string">&apos;?&apos;</span>) + <span class="hljs-number">1</span>)
    <span class="hljs-keyword">if</span> (!search) {
        <span class="hljs-keyword">return</span> {}
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-string">&apos;{&quot;&apos;</span> + <span class="hljs-built_in">decodeURIComponent</span>(search).replace(<span class="hljs-regexp">/&quot;/g</span>, <span class="hljs-string">&apos;\\&quot;&apos;</span>).replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">&apos;&quot;,&quot;&apos;</span>).replace(<span class="hljs-regexp">/=/g</span>, <span class="hljs-string">&apos;&quot;:&quot;&apos;</span>) + <span class="hljs-string">&apos;&quot;}&apos;</span>)
}</code></pre>
<h3 id="articleHeader42">13.2 stringfyQueryString</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x5BF9;&#x8C61;&#x5E8F;&#x5217;&#x5316;
 * @param  {Object} obj 
 * @return {String}
 */
function stringfyQueryString(obj) {
    if (!obj) return &apos;&apos;;
    var pairs = [];

    for (var key in obj) {
        var value = obj[key];

        if (value instanceof Array) {
            for (var i = 0; i &lt; value.length; ++i) {
                pairs.push(encodeURIComponent(key + &apos;[&apos; + i + &apos;]&apos;) + &apos;=&apos; + encodeURIComponent(value[i]));
            }
            continue;
        }

        pairs.push(encodeURIComponent(key) + &apos;=&apos; + encodeURIComponent(obj[key]));
    }

    return pairs.join(&apos;&amp;&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x5BF9;&#x8C61;&#x5E8F;&#x5217;&#x5316;
 * @param  {Object} obj 
 * @return {String}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stringfyQueryString</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (!obj) <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">var</span> pairs = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">var</span> value = obj[key];

        <span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; value.length; ++i) {
                pairs.push(<span class="hljs-built_in">encodeURIComponent</span>(key + <span class="hljs-string">&apos;[&apos;</span> + i + <span class="hljs-string">&apos;]&apos;</span>) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(value[i]));
            }
            <span class="hljs-keyword">continue</span>;
        }

        pairs.push(<span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(obj[key]));
    }

    <span class="hljs-keyword">return</span> pairs.join(<span class="hljs-string">&apos;&amp;&apos;</span>);
}</code></pre>
<h2 id="articleHeader43">14.Function</h2>
<h3 id="articleHeader44">14.1 throttle</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc   &#x51FD;&#x6570;&#x8282;&#x6D41;&#x3002;
 * &#x9002;&#x7528;&#x4E8E;&#x9650;&#x5236;`resize`&#x548C;`scroll`&#x7B49;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x9891;&#x7387;
 *
 * @param  {Number}    delay          0 &#x6216;&#x8005;&#x66F4;&#x5927;&#x7684;&#x6BEB;&#x79D2;&#x6570;&#x3002; &#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#xFF0C;&#x5927;&#x7EA6;100&#x6216;250&#x6BEB;&#x79D2;&#xFF08;&#x6216;&#x66F4;&#x9AD8;&#xFF09;&#x7684;&#x5EF6;&#x8FDF;&#x662F;&#x6700;&#x6709;&#x7528;&#x7684;&#x3002;
 * @param  {Boolean}   noTrailing     &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false&#x3002;
 *                                    &#x5982;&#x679C;noTrailing&#x4E3A;true&#xFF0C;&#x5F53;&#x8282;&#x6D41;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6BCF;&#x8FC7;`delay`&#x6BEB;&#x79D2;`callback`&#x4E5F;&#x5C06;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x3002;
 *                                    &#x5982;&#x679C;noTrailing&#x4E3A;false&#x6216;&#x8005;&#x672A;&#x4F20;&#x5165;&#xFF0C;`callback`&#x5C06;&#x5728;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x8282;&#x6D41;&#x51FD;&#x6570;&#x540E;&#x518D;&#x6267;&#x884C;&#x4E00;&#x6B21;.
 *                                    &#xFF08;&#x5EF6;&#x8FDF;`delay`&#x6BEB;&#x79D2;&#x4E4B;&#x540E;&#xFF0C;&#x8282;&#x6D41;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x88AB;&#x8C03;&#x7528;,&#x5185;&#x90E8;&#x8BA1;&#x6570;&#x5668;&#x4F1A;&#x590D;&#x4F4D;&#xFF09;
 * @param  {Function}  callback       &#x5EF6;&#x8FDF;&#x6BEB;&#x79D2;&#x540E;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;`this`&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x6240;&#x6709;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6309;&#x539F;&#x6837;&#x4F20;&#x9012;&#x7684;&#xFF0C;
 *                                    &#x6267;&#x884C;&#x53BB;&#x8282;&#x6D41;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#x8C03;&#x7528;`callback`&#x3002;
 * @param  {Boolean}   debounceMode   &#x5982;&#x679C;`debounceMode`&#x4E3A;true&#xFF0C;`clear`&#x5728;`delay`ms&#x540E;&#x6267;&#x884C;&#x3002;
 *                                    &#x5982;&#x679C;debounceMode&#x662F;false&#xFF0C;`callback`&#x5728;`delay` ms&#x4E4B;&#x540E;&#x6267;&#x884C;&#x3002;
 *
 * @return {Function}  &#x65B0;&#x7684;&#x8282;&#x6D41;&#x51FD;&#x6570;
 */
function throttle(delay, noTrailing, callback, debounceMode) {

    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // `noTrailing` defaults to falsy.
    if (typeof noTrailing !== &apos;boolean&apos;) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {

        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
            timeoutID = undefined;
        }

        if (debounceMode &amp;&amp; !timeoutID) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        }

        // Clear any existing timeout.
        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        if (debounceMode === undefined &amp;&amp; elapsed &gt; delay) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();

        } else if (noTrailing !== true) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }

    // Return the wrapper function.
    return wrapper;

};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @desc   &#x51FD;&#x6570;&#x8282;&#x6D41;&#x3002;
 * &#x9002;&#x7528;&#x4E8E;&#x9650;&#x5236;`resize`&#x548C;`scroll`&#x7B49;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x9891;&#x7387;
 *
 * @param  {Number}    delay          0 &#x6216;&#x8005;&#x66F4;&#x5927;&#x7684;&#x6BEB;&#x79D2;&#x6570;&#x3002; &#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#xFF0C;&#x5927;&#x7EA6;100&#x6216;250&#x6BEB;&#x79D2;&#xFF08;&#x6216;&#x66F4;&#x9AD8;&#xFF09;&#x7684;&#x5EF6;&#x8FDF;&#x662F;&#x6700;&#x6709;&#x7528;&#x7684;&#x3002;
 * @param  {Boolean}   noTrailing     &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false&#x3002;
 *                                    &#x5982;&#x679C;noTrailing&#x4E3A;true&#xFF0C;&#x5F53;&#x8282;&#x6D41;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6BCF;&#x8FC7;`delay`&#x6BEB;&#x79D2;`callback`&#x4E5F;&#x5C06;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x3002;
 *                                    &#x5982;&#x679C;noTrailing&#x4E3A;false&#x6216;&#x8005;&#x672A;&#x4F20;&#x5165;&#xFF0C;`callback`&#x5C06;&#x5728;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x8282;&#x6D41;&#x51FD;&#x6570;&#x540E;&#x518D;&#x6267;&#x884C;&#x4E00;&#x6B21;.
 *                                    &#xFF08;&#x5EF6;&#x8FDF;`delay`&#x6BEB;&#x79D2;&#x4E4B;&#x540E;&#xFF0C;&#x8282;&#x6D41;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x88AB;&#x8C03;&#x7528;,&#x5185;&#x90E8;&#x8BA1;&#x6570;&#x5668;&#x4F1A;&#x590D;&#x4F4D;&#xFF09;
 * @param  {Function}  callback       &#x5EF6;&#x8FDF;&#x6BEB;&#x79D2;&#x540E;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;`this`&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x6240;&#x6709;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6309;&#x539F;&#x6837;&#x4F20;&#x9012;&#x7684;&#xFF0C;
 *                                    &#x6267;&#x884C;&#x53BB;&#x8282;&#x6D41;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#x8C03;&#x7528;`callback`&#x3002;
 * @param  {Boolean}   debounceMode   &#x5982;&#x679C;`debounceMode`&#x4E3A;true&#xFF0C;`clear`&#x5728;`delay`ms&#x540E;&#x6267;&#x884C;&#x3002;
 *                                    &#x5982;&#x679C;debounceMode&#x662F;false&#xFF0C;`callback`&#x5728;`delay` ms&#x4E4B;&#x540E;&#x6267;&#x884C;&#x3002;
 *
 * @return {Function}  &#x65B0;&#x7684;&#x8282;&#x6D41;&#x51FD;&#x6570;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">delay, noTrailing, callback, debounceMode</span>) </span>{

    <span class="hljs-comment">// After wrapper has stopped being called, this timeout ensures that</span>
    <span class="hljs-comment">// `callback` is executed at the proper times in `throttle` and `end`</span>
    <span class="hljs-comment">// debounce modes.</span>
    <span class="hljs-keyword">var</span> timeoutID;

    <span class="hljs-comment">// Keep track of the last time `callback` was executed.</span>
    <span class="hljs-keyword">var</span> lastExec = <span class="hljs-number">0</span>;

    <span class="hljs-comment">// `noTrailing` defaults to falsy.</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> noTrailing !== <span class="hljs-string">&apos;boolean&apos;</span>) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = <span class="hljs-literal">undefined</span>;
    }

    <span class="hljs-comment">// The `wrapper` function encapsulates all of the throttling / debouncing</span>
    <span class="hljs-comment">// functionality and when executed will limit the rate at which `callback`</span>
    <span class="hljs-comment">// is executed.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapper</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> elapsed = <span class="hljs-built_in">Number</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()) - lastExec;
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;

        <span class="hljs-comment">// Execute `callback` and update the `lastExec` timestamp.</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exec</span>(<span class="hljs-params"></span>) </span>{
            lastExec = <span class="hljs-built_in">Number</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
            callback.apply(self, args);
        }

        <span class="hljs-comment">// If `debounceMode` is true (at begin) this is used to clear the flag</span>
        <span class="hljs-comment">// to allow future `callback` executions.</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clear</span>(<span class="hljs-params"></span>) </span>{
            timeoutID = <span class="hljs-literal">undefined</span>;
        }

        <span class="hljs-keyword">if</span> (debounceMode &amp;&amp; !timeoutID) {
            <span class="hljs-comment">// Since `wrapper` is being called for the first time and</span>
            <span class="hljs-comment">// `debounceMode` is true (at begin), execute `callback`.</span>
            exec();
        }

        <span class="hljs-comment">// Clear any existing timeout.</span>
        <span class="hljs-keyword">if</span> (timeoutID) {
            clearTimeout(timeoutID);
        }

        <span class="hljs-keyword">if</span> (debounceMode === <span class="hljs-literal">undefined</span> &amp;&amp; elapsed &gt; delay) {
            <span class="hljs-comment">// In throttle mode, if `delay` time has been exceeded, execute</span>
            <span class="hljs-comment">// `callback`.</span>
            exec();

        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (noTrailing !== <span class="hljs-literal">true</span>) {
            <span class="hljs-comment">// In trailing throttle mode, since `delay` time has not been</span>
            <span class="hljs-comment">// exceeded, schedule `callback` to execute `delay` ms after most</span>
            <span class="hljs-comment">// recent execution.</span>
            <span class="hljs-comment">//</span>
            <span class="hljs-comment">// If `debounceMode` is true (at begin), schedule `clear` to execute</span>
            <span class="hljs-comment">// after `delay` ms.</span>
            <span class="hljs-comment">//</span>
            <span class="hljs-comment">// If `debounceMode` is false (at end), schedule `callback` to</span>
            <span class="hljs-comment">// execute after `delay` ms.</span>
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === <span class="hljs-literal">undefined</span> ? delay - elapsed : delay);
        }

    }

    <span class="hljs-comment">// Return the wrapper function.</span>
    <span class="hljs-keyword">return</span> wrapper;

};</code></pre>
<h3 id="articleHeader45">14.2 debounce</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc &#x51FD;&#x6570;&#x9632;&#x6296; 
 * &#x4E0E;throttle&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;debounce&#x4FDD;&#x8BC1;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5728;&#x591A;&#x5C11;&#x6BEB;&#x79D2;&#x5185;&#x4E0D;&#x518D;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;
 * &#x8981;&#x4E48;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;return&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x65F6;&#x6267;&#x884C;&#xFF0C;&#x8981;&#x4E48;&#x5728;&#x5EF6;&#x8FDF;&#x6307;&#x5B9A;&#x6BEB;&#x79D2;&#x540E;&#x8C03;&#x7528;&#x3002;
 * @example &#x9002;&#x7528;&#x573A;&#x666F;&#xFF1A;&#x5982;&#x5728;&#x7EBF;&#x7F16;&#x8F91;&#x7684;&#x81EA;&#x52A8;&#x5B58;&#x50A8;&#x9632;&#x6296;&#x3002;
 * @param  {Number}   delay         0&#x6216;&#x8005;&#x66F4;&#x5927;&#x7684;&#x6BEB;&#x79D2;&#x6570;&#x3002; &#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#xFF0C;&#x5927;&#x7EA6;100&#x6216;250&#x6BEB;&#x79D2;&#xFF08;&#x6216;&#x66F4;&#x9AD8;&#xFF09;&#x7684;&#x5EF6;&#x8FDF;&#x662F;&#x6700;&#x6709;&#x7528;&#x7684;&#x3002;
 * @param  {Boolean}  atBegin       &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false&#x3002;
 *                                  &#x5982;&#x679C;`atBegin`&#x4E3A;false&#x6216;&#x672A;&#x4F20;&#x5165;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5219;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;return&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x540E;&#x5EF6;&#x8FDF;&#x6307;&#x5B9A;&#x6BEB;&#x79D2;&#x8C03;&#x7528;&#x3002;
                                    &#x5982;&#x679C;`atBegin`&#x4E3A;true&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5219;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;return&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x65F6;&#x76F4;&#x63A5;&#x6267;&#x884C;
 * @param  {Function} callback      &#x5EF6;&#x8FDF;&#x6BEB;&#x79D2;&#x540E;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;`this`&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x6240;&#x6709;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6309;&#x539F;&#x6837;&#x4F20;&#x9012;&#x7684;&#xFF0C;
 *                                  &#x6267;&#x884C;&#x53BB;&#x6296;&#x52A8;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#xFF0C;&#x8C03;&#x7528;`callback`&#x3002;
 *
 * @return {Function} &#x65B0;&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x3002;
 */
var throttle = require(&apos;./throttle&apos;);
function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @desc &#x51FD;&#x6570;&#x9632;&#x6296; 
 * &#x4E0E;throttle&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;debounce&#x4FDD;&#x8BC1;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5728;&#x591A;&#x5C11;&#x6BEB;&#x79D2;&#x5185;&#x4E0D;&#x518D;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;
 * &#x8981;&#x4E48;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;return&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x65F6;&#x6267;&#x884C;&#xFF0C;&#x8981;&#x4E48;&#x5728;&#x5EF6;&#x8FDF;&#x6307;&#x5B9A;&#x6BEB;&#x79D2;&#x540E;&#x8C03;&#x7528;&#x3002;
 * @example &#x9002;&#x7528;&#x573A;&#x666F;&#xFF1A;&#x5982;&#x5728;&#x7EBF;&#x7F16;&#x8F91;&#x7684;&#x81EA;&#x52A8;&#x5B58;&#x50A8;&#x9632;&#x6296;&#x3002;
 * @param  {Number}   delay         0&#x6216;&#x8005;&#x66F4;&#x5927;&#x7684;&#x6BEB;&#x79D2;&#x6570;&#x3002; &#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#xFF0C;&#x5927;&#x7EA6;100&#x6216;250&#x6BEB;&#x79D2;&#xFF08;&#x6216;&#x66F4;&#x9AD8;&#xFF09;&#x7684;&#x5EF6;&#x8FDF;&#x662F;&#x6700;&#x6709;&#x7528;&#x7684;&#x3002;
 * @param  {Boolean}  atBegin       &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false&#x3002;
 *                                  &#x5982;&#x679C;`atBegin`&#x4E3A;false&#x6216;&#x672A;&#x4F20;&#x5165;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5219;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;return&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x540E;&#x5EF6;&#x8FDF;&#x6307;&#x5B9A;&#x6BEB;&#x79D2;&#x8C03;&#x7528;&#x3002;
                                    &#x5982;&#x679C;`atBegin`&#x4E3A;true&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5219;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;return&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x65F6;&#x76F4;&#x63A5;&#x6267;&#x884C;
 * @param  {Function} callback      &#x5EF6;&#x8FDF;&#x6BEB;&#x79D2;&#x540E;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;`this`&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x6240;&#x6709;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6309;&#x539F;&#x6837;&#x4F20;&#x9012;&#x7684;&#xFF0C;
 *                                  &#x6267;&#x884C;&#x53BB;&#x6296;&#x52A8;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#xFF0C;&#x8C03;&#x7528;`callback`&#x3002;
 *
 * @return {Function} &#x65B0;&#x7684;&#x9632;&#x6296;&#x51FD;&#x6570;&#x3002;
 */</span>
<span class="hljs-keyword">var</span> throttle = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./throttle&apos;</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">delay, atBegin, callback</span>) </span>{
    <span class="hljs-keyword">return</span> callback === <span class="hljs-literal">undefined</span> ? throttle(delay, atBegin, <span class="hljs-literal">false</span>) : throttle(delay, callback, atBegin !== <span class="hljs-literal">false</span>);
};</code></pre>
<h1 id="articleHeader46">&#x5C01;&#x88C5;</h1>
<p>&#x9664;&#x4E86;&#x5BF9;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#x5E38;&#x7528;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#xFF0C; &#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#x652F;&#x6301;&#x5408;&#x7406;&#x5316;&#x7684;&#x5F15;&#x5165;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>webpack</code>&#x7EDF;&#x4E00;&#x6253;&#x5305;&#x6210;<code>UMD</code> &#x901A;&#x7528;&#x6A21;&#x5757;&#x89C4;&#x8303;&#xFF0C;&#x652F;&#x6301;<code>webpack</code>&#x3001;<code>RequireJS</code>&#x3001;<code>SeaJS</code>&#x7B49;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5668;&#xFF0C;&#x4EA6;&#x6216;&#x76F4;&#x63A5;&#x901A;&#x8FC7;<code>&lt;script&gt;</code>&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x3002;</p>
<p>&#x4F46;&#x8FD9;&#x6837;&#xFF0C;&#x8FD8;&#x662F;&#x4E0D;&#x80FD;&#x8BA9;&#x4EBA;&#x6EE1;&#x610F;&#x3002;&#x56E0;&#x4E3A;&#x5B8C;&#x6574;&#x5F15;&#x5165;&#x6574;&#x4E2A;&#x5E93;&#xFF0C;&#x7565;&#x663E;&#x6D6A;&#x8D39;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x53EF;&#x80FD;&#x7528;&#x5230;&#x6240;&#x6709;&#x7684;&#x51FD;&#x6570;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x5C31;&#x652F;&#x6301;<strong>&#x6309;&#x9700;&#x5F15;&#x5165;</strong>&#x5427;</p>
<h2 id="articleHeader47">1.&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x8BF4;&#x660E;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x2502;  .babelrc
&#x2502;  .gitignore
&#x2502;  .travis.yml
&#x2502;  LICENSE
&#x2502;  package.json
&#x2502;  README.md
&#x2502;  setCookie.js  // &#x62F7;&#x8D1D;&#x5230;&#x6839;&#x8DEF;&#x5F84;&#x7684;&#x51FD;&#x6570;&#x6A21;&#x5757;&#xFF0C;&#x65B9;&#x4FBF;&#x6309;&#x9700;&#x52A0;&#x8F7D;
&#x2502;  setScrollTop.js
&#x2502;  stringfyQueryString.js
&#x2502;   ...
&#x2502;   ...
&#x2502;  
&#x251C;&#x2500;min
&#x2502;      outils.min.js  // &#x6240;&#x6709;&#x51FD;&#x6570;&#x7EDF;&#x4E00;&#x6253;&#x5305;&#x751F;&#x6210;&#x7684;&#x5168;&#x91CF;&#x538B;&#x7F29;&#x5305;
&#x2502;      
&#x251C;&#x2500;script  // &#x672C;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x811A;&#x672C;&#x76EE;&#x5F55;
&#x2502;      build.js  // &#x6253;&#x5305;&#x6784;&#x5EFA;&#x811A;&#x672C;
&#x2502;      test.js  // &#x6D4B;&#x8BD5;&#x811A;&#x672C;
&#x2502;      webpack.conf.js  // webpack&#x6253;&#x5305;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;      
&#x251C;&#x2500;src // &#x6E90;&#x7801;&#x76EE;&#x5F55;
&#x2502;  &#x2502;  index.js  // webpack&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;  &#x2502;  
&#x2502;  &#x251C;&#x2500;array
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;class
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;cookie
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;device
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;dom
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;keycode
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;object
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;random
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;regexp
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;string
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;support
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;time
&#x2502;  &#x2502;      
&#x2502;  &#x2514;&#x2500;url
&#x2502;          
&#x2514;&#x2500;test // &#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x76EE;&#x5F55;
    &#x2502;  array.test.js
    &#x2502;  class.test.js
    &#x2502;  cookie.test.js
    &#x2502;  device.test.js
    &#x2502;  dom.test.js
    &#x2502;  index.html
    &#x2502;  keycode.test.js
    &#x2502;  object.test.js
    &#x2502;  random.test.js
    &#x2502;  regexp.test.js
    &#x2502;  string.test.js
    &#x2502;  support.test.js
    &#x2502;  time.test.js
    &#x2502;  url.test.js
    &#x2502;  
    &#x2514;&#x2500;_lib // &#x6D4B;&#x8BD5;&#x6240;&#x7528;&#x5230;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;
            mocha.css
            mocha.js
            power-assert.js " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&#x2502;  <span class="hljs-selector-class">.babelrc</span>
&#x2502;  <span class="hljs-selector-class">.gitignore</span>
&#x2502;  <span class="hljs-selector-class">.travis</span><span class="hljs-selector-class">.yml</span>
&#x2502;  LICENSE
&#x2502;  package<span class="hljs-selector-class">.json</span>
&#x2502;  README<span class="hljs-selector-class">.md</span>
&#x2502;  setCookie<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// &#x62F7;&#x8D1D;&#x5230;&#x6839;&#x8DEF;&#x5F84;&#x7684;&#x51FD;&#x6570;&#x6A21;&#x5757;&#xFF0C;&#x65B9;&#x4FBF;&#x6309;&#x9700;&#x52A0;&#x8F7D;</span>
&#x2502;  setScrollTop<span class="hljs-selector-class">.js</span>
&#x2502;  stringfyQueryString<span class="hljs-selector-class">.js</span>
&#x2502;   ...
&#x2502;   ...
&#x2502;  
&#x251C;&#x2500;min
&#x2502;      outils<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// &#x6240;&#x6709;&#x51FD;&#x6570;&#x7EDF;&#x4E00;&#x6253;&#x5305;&#x751F;&#x6210;&#x7684;&#x5168;&#x91CF;&#x538B;&#x7F29;&#x5305;</span>
&#x2502;      
&#x251C;&#x2500;script  <span class="hljs-comment">// &#x672C;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x811A;&#x672C;&#x76EE;&#x5F55;</span>
&#x2502;      build<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// &#x6253;&#x5305;&#x6784;&#x5EFA;&#x811A;&#x672C;</span>
&#x2502;      test<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// &#x6D4B;&#x8BD5;&#x811A;&#x672C;</span>
&#x2502;      webpack<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// webpack&#x6253;&#x5305;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
&#x2502;      
&#x251C;&#x2500;src <span class="hljs-comment">// &#x6E90;&#x7801;&#x76EE;&#x5F55;</span>
&#x2502;  &#x2502;  index<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// webpack&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  
&#x2502;  &#x251C;&#x2500;array
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;class
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;cookie
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;device
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;dom
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;keycode
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;<span class="hljs-selector-tag">object</span>
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;random
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;regexp
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;string
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;support
&#x2502;  &#x2502;      
&#x2502;  &#x251C;&#x2500;<span class="hljs-selector-tag">time</span>
&#x2502;  &#x2502;      
&#x2502;  &#x2514;&#x2500;url
&#x2502;          
&#x2514;&#x2500;test <span class="hljs-comment">// &#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x76EE;&#x5F55;</span>
    &#x2502;  array<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  class<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  cookie<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  device<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  dom<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  index<span class="hljs-selector-class">.html</span>
    &#x2502;  keycode<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  <span class="hljs-selector-tag">object</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  random<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  regexp<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  string<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  support<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  <span class="hljs-selector-tag">time</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  url<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    &#x2502;  
    &#x2514;&#x2500;_lib <span class="hljs-comment">// &#x6D4B;&#x8BD5;&#x6240;&#x7528;&#x5230;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</span>
            mocha<span class="hljs-selector-class">.css</span>
            mocha<span class="hljs-selector-class">.js</span>
            power-assert<span class="hljs-selector-class">.js</span> </code></pre>
<h2 id="articleHeader48">2.&#x6784;&#x5EFA;&#x811A;&#x672C;</h2>
<p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x9879;&#x76EE;&#x4E2D;<a href="https://github.com/proYang/outils/blob/master/script/build.js" rel="nofollow noreferrer" target="_blank"> build.js </a>&#x7684;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;<br>&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x6784;&#x5EFA;&#x5168;&#x91CF;&#x538B;&#x7F29;&#x5305;&#xFF0C;&#x5148;&#x5220;&#x9664;<code>min</code>&#x76EE;&#x5F55;&#x4E2D;&#x4E4B;&#x524D;&#x7684;<code>outils.min.js</code>&#xFF0C;&#x540E;&#x901A;&#x8FC7;<code>webpack</code>&#x6253;&#x5305;&#x5E76;&#x4FDD;&#x5B58;&#x65B0;&#x7684;&#x538B;&#x7F29;&#x5305;&#x81F3;<code>min</code>&#x76EE;&#x5F55;&#x4E2D;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ......
    ......
    // &#x5220;&#x9664;&#x65E7;&#x7684;&#x5168;&#x91CF;&#x538B;&#x7F29;&#x5305;
    rm(path.resolve(rootPath, &apos;min&apos;, `${pkg.name}.min.js`), err =&gt; {
        if (err) throw (err)
        webpack(config, function (err, stats) {
            if (err) throw (err)
            building.stop()
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + &apos;\n\n&apos;)
            resolve()
            console.log(chalk.cyan(&apos;  Build complete.\n&apos;))
        })
    })
    ......
    ......" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    ......
    ......
    <span class="hljs-comment">// &#x5220;&#x9664;&#x65E7;&#x7684;&#x5168;&#x91CF;&#x538B;&#x7F29;&#x5305;</span>
    rm(path.resolve(rootPath, <span class="hljs-string">&apos;min&apos;</span>, <span class="hljs-string">`<span class="hljs-subst">${pkg.name}</span>.min.js`</span>), err =&gt; {
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> (err)
        webpack(config, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> (err)
            building.stop()
            process.stdout.write(stats.toString({
                <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
            }) + <span class="hljs-string">&apos;\n\n&apos;</span>)
            resolve()
            <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">&apos;  Build complete.\n&apos;</span>))
        })
    })
    ......
    ......</code></pre>
<p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF0C;&#x62F7;&#x8D1D;&#x51FD;&#x6570;&#x6A21;&#x5757;&#x81F3;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x5148;&#x5220;&#x9664;&#x6839;&#x76EE;&#x5F55;&#x4E2D;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x6A21;&#x5757;&#xFF0C;&#x540E;&#x62F7;&#x8D1D;<code>src</code>&#x4E0B;&#x9762;&#x4E00;&#x5C42;&#x76EE;&#x5F55;&#x7684;&#x6240;&#x6709;<code>js</code>&#x6587;&#x4EF6;&#x81F3;&#x6839;&#x76EE;&#x5F55;&#x3002;&#x8FD9;&#x4E48;&#x505A;&#x7684;&#x76EE;&#x7684;&#x662F;&#xFF0C;&#x62F7;&#x8D1D;&#x5230;&#x6839;&#x8DEF;&#x5F84;&#xFF0C;&#x5728;&#x5F15;&#x5165;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F4;&#x63A5;<code>require(&apos;outils/&lt;&#x65B9;&#x6CD5;&#x540D;&gt;&apos;)</code>&#x5373;&#x53EF;&#xFF0C;&#x7F29;&#x77ED;&#x5F15;&#x5165;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x4E5F;&#x7B97;&#x662F;&#x63D0;&#x9AD8;&#x70B9;&#x6548;&#x7387;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x66FF;&#x6362;&#x6A21;&#x5757;&#x6587;&#x4EF6;
    ......
    ......
    // &#x5148;&#x5220;&#x9664;&#x6839;&#x76EE;&#x5F55;&#x4E2D;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x6A21;&#x5757;
    rm(&apos;*.js&apos;, err =&gt; {
        if (err) throw (err)
        let folderList = fs.readdirSync(path.resolve(rootPath, &apos;src&apos;))
        folderList.forEach((item, index) =&gt; {
            // &#x62F7;&#x8D1D;`src`&#x4E0B;&#x9762;&#x4E00;&#x5C42;&#x76EE;&#x5F55;&#x7684;&#x6240;&#x6709;`js`&#x6587;&#x4EF6;&#x81F3;&#x6839;&#x76EE;&#x5F55;
            copy(`src/${item}/*.js`, rootPath, function (err, files) {
                if (err) throw err;
                if (index === folderList.length - 1) {
                    console.log(chalk.cyan(&apos;  Copy complete.\n&apos;))
                    copying.stop()
                }
            })
        })
    })
    ......
    ......" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x66FF;&#x6362;&#x6A21;&#x5757;&#x6587;&#x4EF6;</span>
    ......
    ......
    <span class="hljs-comment">// &#x5148;&#x5220;&#x9664;&#x6839;&#x76EE;&#x5F55;&#x4E2D;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x6A21;&#x5757;</span>
    rm(<span class="hljs-string">&apos;*.js&apos;</span>, err =&gt; {
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> (err)
        <span class="hljs-keyword">let</span> folderList = fs.readdirSync(path.resolve(rootPath, <span class="hljs-string">&apos;src&apos;</span>))
        folderList.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
            <span class="hljs-comment">// &#x62F7;&#x8D1D;`src`&#x4E0B;&#x9762;&#x4E00;&#x5C42;&#x76EE;&#x5F55;&#x7684;&#x6240;&#x6709;`js`&#x6587;&#x4EF6;&#x81F3;&#x6839;&#x76EE;&#x5F55;</span>
            copy(<span class="hljs-string">`src/<span class="hljs-subst">${item}</span>/*.js`</span>, rootPath, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, files</span>) </span>{
                <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
                <span class="hljs-keyword">if</span> (index === folderList.length - <span class="hljs-number">1</span>) {
                    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">&apos;  Copy complete.\n&apos;</span>))
                    copying.stop()
                }
            })
        })
    })
    ......
    ......</code></pre>
<h2 id="articleHeader49">3.&#x4E66;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;</h2>
<p>&#x4FD7;&#x8BDD;&#x8BF4;&#xFF0C;&#x4E0D;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7684;&#x524D;&#x7AEF;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x597D;&#x7A0B;&#x5E8F;&#x5458;&#x3002;&#x90A3;&#x5C31;&#x4E0D;&#x80FD;&#x6002;&#xFF0C;&#x5C31;&#x662F;&#x5E72;&#x3002;</p>
<p>&#x4F46;&#x662F;&#x56E0;&#x4E3A;&#x65F6;&#x95F4;&#x5173;&#x7CFB;&#xFF0C;&#x672C;&#x9879;&#x76EE;&#x6682;&#x65F6;&#x901A;&#x8FC7;&#x9879;&#x76EE;&#x4E2D;&#x7684;<a href="https://github.com/proYang/outils/blob/master/script/test.js" rel="nofollow noreferrer" target="_blank"> test.js </a>&#xFF0C;&#x542F;&#x52A8;&#x4E86;&#x4E00;&#x4E2A;<code>koa</code>&#x9759;&#x6001;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6765;&#x52A0;&#x8F7D;<code>mocha</code>&#x7F51;&#x9875;&#x7AEF;&#x7684;&#x6D4B;&#x8BD5;&#x9875;&#x9762;&#xFF0C;&#x8BA9;&#x7B14;&#x8005;&#x4E66;&#x5199;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x672C;&#x5730;&#x5BF9;&#x51FD;&#x6570;&#x529F;&#x80FD;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#x3002;<br>&#x4F46;&#x662F;&#x540E;&#x7EED;&#x5C06;&#x4F7F;&#x7528;<code>travis-ci</code>&#x914D;&#x5408;<code>Github</code>&#x6765;&#x505A;&#x6301;&#x7EED;&#x5316;&#x6784;&#x5EFA;&#xFF0C;&#x81EA;&#x52A8;&#x53D1;&#x5E03;&#x5230;<code>npm</code>&#x3002;&#x6539;&#x7528;<code>karma</code>&#xFF0C;<code>mocha</code>&#xFF0C;<code>power-assert</code>&#x505A;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x4F7F;&#x7528;<code>Coverage</code>&#x6D4B;&#x8BD5;&#x8986;&#x76D6;&#x7387;&#x3002;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x540E;&#x7EED;&#x66F4;&#x65B0;&#x3002;</p>
<p>&#x8FD9;&#x91CC;&#x7ED9;&#x5927;&#x5BB6;&#x63A8;&#x8350;&#x4E00;&#x4E2A;&#x597D;&#x7528;&#x7684;&#x65AD;&#x8A00;&#x5E93;<a href="https://www.npmjs.com/package/power-assert" rel="nofollow noreferrer" target="_blank"> power-assert </a>&#xFF0C;&#x8FD9;&#x4E2A;&#x5E93;&#x8BB0;&#x4F4F;<code>assert(value, [message])</code>&#x4E00;&#x4E2A;API&#x5C31;&#x57FA;&#x672C;&#x65E0;&#x654C;&#xFF0C;&#x4ECE;&#x6B64;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x8BB0;&#x4E0D;&#x4F4F;&#x65AD;&#x8A00;&#x5E93;&#x7684;API&#x3002;</p>
<p>&#x672C;&#x9879;&#x76EE;&#x7684;&#x6240;&#x6709;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x90FD;&#x5728;<code>test</code>&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x4F5C;&#x4E00;&#x5B9A;&#x53C2;&#x8003;&#x3002;</p>
<blockquote><p>&#x66F4;&#x65B0;&#xFF1A;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x5DF2;&#x4F7F;&#x7528;<code>karma</code>&#xFF0C;<code>mocha</code>&#xFF0C;<code>power-assert</code>&#xFF0C;&#x4F7F;&#x7528;<code>Coverage</code>&#x6D4B;&#x8BD5;&#x8986;&#x76D6;&#x7387;&#xFF0C;&#x5E76;&#x96C6;&#x6210;<a href="https://travis-ci.org/" rel="nofollow noreferrer" target="_blank"> travis-ci </a>&#x914D;&#x5408;<code>Github</code>&#x6765;&#x505A;&#x6301;&#x7EED;&#x5316;&#x6784;&#x5EFA;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x672C;&#x9879;&#x76EE;&#x7684;<code>travis</code>&#x914D;&#x7F6E;&#x6587;&#x4EF6;<a href="https://github.com/proYang/outils/blob/master/.travis.yml" rel="nofollow noreferrer" target="_blank"> .travis.yml </a>&#x548C;<code>karma</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;<a href="https://github.com/proYang/outils/blob/master/script/karma.conf.js" rel="nofollow noreferrer" target="_blank"> karma.conf.js </a>&#x3002;</p></blockquote>
<h1 id="articleHeader50">&#x53D1;&#x5E03;</h1>
<p>&#x9996;&#x5148;&#x653E;&#x5230;<code>Github</code>&#x6258;&#x7BA1;&#x4E00;&#x4E0B;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;<a href="https://github.com/proYang/outils/" rel="nofollow noreferrer" target="_blank">fork</a>&#x672C;&#x9879;&#x76EE;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x52A0;&#x5165;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x51FD;&#x6570;&#x3002;<br>&#x4EE5;&#x7B14;&#x8005;&#x9879;&#x76EE;&#xFF0C;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;:</p>
<h3 id="articleHeader51">1.&#x6DFB;&#x52A0;&#x81EA;&#x5DF1;&#x7684;&#x51FD;&#x6570;</h3>
<p>&#x5728;<code>src</code>&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x65B0;&#x5EFA;&#x5206;&#x7C7B;&#x76EE;&#x5F55;&#x6216;&#x8005;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x5206;&#x7C7B;&#xFF0C;&#x5728;&#x5B50;&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x6DFB;&#x52A0;&#x51FD;&#x6570;&#x6A21;&#x5757;&#x6587;&#x4EF6;&#xFF08;&#x5EFA;&#x8BAE;&#x4E00;&#x4E2A;&#x5C0F;&#x529F;&#x80FD;&#x4FDD;&#x5B58;&#x4E3A;&#x4E00;&#x4E2A;JS&#x6587;&#x4EF6;&#xFF09;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;NaN
 * @param  {Any} value 
 * @return {Boolean}
 */
function isNaN(value) {    
    return value !== value;
};

modules.export = isNaN
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * @desc   &#x5224;&#x65AD;&#x662F;&#x5426;NaN
 * @param  {Any} value 
 * @return {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNaN</span>(<span class="hljs-params">value</span>) </span>{    
    <span class="hljs-keyword">return</span> value !== value;
};

modules.export = <span class="hljs-built_in">isNaN</span>
</code></pre>
<p>&#x7136;&#x540E;&#x8BB0;&#x5F97;&#x5728;<code>src/index.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x66B4;&#x9732;<code>isNaN</code>&#x51FD;&#x6570;</p>
<h3 id="articleHeader52">2.&#x5355;&#x5143;&#x6D4B;&#x8BD5;</h3>
<p>&#x5728;<code>test</code>&#x6587;&#x4EF6;&#x65B0;&#x5EFA;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe(&apos;#isNaN()&apos;, function () {
    it(`outils.isNaN(NaN) should return true`, function () {
        assert(outils.isNaN(NaN))
    })
    it(`outils.isNaN(&apos;value&apos;) should return false`, function () {
        assert.notEqual(outils.isNaN(NaN))
    })
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">&apos;#isNaN()&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">`outils.isNaN(NaN) should return true`</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        assert(outils.isNaN(<span class="hljs-literal">NaN</span>))
    })
    it(<span class="hljs-string">`outils.isNaN(&apos;value&apos;) should return false`</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        assert.notEqual(outils.isNaN(<span class="hljs-literal">NaN</span>))
    })
})</code></pre>
<p><del>&#x7136;&#x540E;&#x8BB0;&#x5F97;&#x5728;<code>test/index.html</code>&#x4E2D;&#x5F15;&#x5165;&#x4E4B;&#x524D;&#x521B;&#x5EFA;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x811A;&#x672C;&#x3002;</del></p>
<h3 id="articleHeader53">3.&#x6D4B;&#x8BD5;&#x5E76;&#x6253;&#x5305;</h3>
<p>&#x6267;&#x884C;<code>npm run test</code>&#xFF0C;&#x770B;&#x6240;&#x6709;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x662F;&#x5426;&#x901A;&#x8FC7;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x6267;&#x884C;<code>npm run build</code>&#x6784;&#x5EFA;&#xFF0C;&#x4E4B;&#x540E;&#x63D0;&#x4EA4;&#x5230;&#x4E2A;&#x4EBA;&#x7684; github &#x4ED3;&#x5E93;&#x5373;&#x53EF;&#x3002;</p>
<h3 id="articleHeader54">4.&#x53D1;&#x5E03;&#x5230;<code>npm</code>
</h3>
<p>&#x5728;<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank"> www.npmjs.com </a>&#x6CE8;&#x518C;&#x8D26;&#x53F7;&#xFF0C;&#x4FEE;&#x6539;&#x672C;&#x5730;<code>package.json</code>&#x4E2D;&#x7684;<code>name</code>&#x3001;<code>version</code>&#x3001;<code>author</code>&#x7B49;&#x4FE1;&#x606F;&#xFF0C;&#x6700;&#x540E;<code>npm publish</code>&#x5C31;&#x5927;&#x529F;&#x544A;&#x6210;&#x4E86;&#x3002;  <br>&#x6CE8;&#x610F;&#xFF1A;&#x5411;<code>npm</code>&#x53D1;&#x5305;&#xFF0C;&#x8981;&#x628A;&#x955C;&#x50CF;&#x6E90;&#x5207;&#x5230;<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank"> www.npmjs.com </a>&#xFF0C;&#x4F7F;&#x7528;<code>cnpm</code>&#x7B49;&#x7B2C;&#x4E09;&#x65B9;&#x955C;&#x50CF;&#x6E90;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p>
<h1 id="articleHeader55">&#x4F7F;&#x7528;</h1>
<h3 id="articleHeader56">1.&#x6D4F;&#x89C8;&#x5668;</h3>
<p>&#x76F4;&#x63A5;&#x4E0B;&#x8F7D;<code>min</code>&#x76EE;&#x5F55;&#x4E0B;&#x7684;<a href="https://github.com/proYang/outils/blob/master/min/outils.min.js" rel="nofollow noreferrer" target="_blank"> outils.min.js </a>&#xFF0C;&#x901A;&#x8FC7;<code>&lt;script&gt;</code>&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;script src=&quot;outils.min.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;
      var OS = outils.getOS()
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;outils.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
      <span class="hljs-keyword">var</span> OS = outils.getOS()
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>&#x6CE8;&#x610F;&#xFF1A; &#x672C;&#x4ED3;&#x5E93;&#x4EE3;&#x7801;&#x4F1A;&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x4E0D;&#x540C;&#x7248;&#x672C;&#x7684;&#x589E;&#x91CF;&#x538B;&#x7F29;&#x5305;&#x6216;&#x6E90;&#x7801;&#xFF0C;&#x8BF7;&#x5230;<a href="https://github.com/proYang/outils/releases" rel="nofollow noreferrer" target="_blank"> github Release </a>&#x9875;&#x9762;&#x4E0B;&#x8F7D;&#x5BF9;&#x5E94;&#x7248;&#x672C;&#x53F7;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<h3 id="articleHeader57">2.Webpack&#x3001;RequireJS&#x3001;SeaJS&#x7B49;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5668;</h3>
<p>&#x5148;&#x4F7F;&#x7528;<code>npm</code>&#x5B89;&#x88C5;<code>outils</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev outils" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install --save-dev outils</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B8C;&#x6574;&#x5F15;&#x5165;
const outils = require(&apos;outils&apos;)
const OS = outils.getOS()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B8C;&#x6574;&#x5F15;&#x5165;</span>
<span class="hljs-keyword">const</span> outils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;outils&apos;</span>)
<span class="hljs-keyword">const</span> OS = outils.getOS()</code></pre>
<p><strong>&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6309;&#x9700;&#x5F15;&#x5165;require(&apos;outils/&lt;&#x65B9;&#x6CD5;&#x540D;&gt;&apos;)
const getOS = require(&apos;outils/getOS&apos;)
const OS = getOS()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6309;&#x9700;&#x5F15;&#x5165;require(&apos;outils/&lt;&#x65B9;&#x6CD5;&#x540D;&gt;&apos;)</span>
<span class="hljs-keyword">const</span> getOS = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;outils/getOS&apos;</span>)
<span class="hljs-keyword">const</span> OS = getOS()</code></pre>
<p>&#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6709;<code>babel</code>&#x7F16;&#x8BD1;<code>ES6</code>&#x8BED;&#x6CD5;&#x7684;&#x8BDD;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x4F7F;&#x7528;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import getOS from &apos;outils/getOS&apos;
// &#x6216;
import { getOS } from &quot;outils&quot;;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> getOS <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;outils/getOS&apos;</span>
<span class="hljs-comment">// &#x6216;</span>
<span class="hljs-keyword">import</span> { getOS } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;outils&quot;</span>;
</code></pre>
<h1 id="articleHeader58">&#x603B;&#x7ED3;</h1>
<p>&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x5C01;&#x88C5;&#xFF0C;&#x53D1;&#x5E03;&#x5230;<code>npm</code>&#x4E0A;&#xFF0C;&#x7701;&#x53BB;&#x4E0B;&#x6B21;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x7684;&#x529F;&#x592B;&#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;Goole&#x7684;&#x65F6;&#x95F4;&#x3002;&#x5982;&#x679C;&#x7B14;&#x8005;&#x7684;&#x5E93;&#x4E2D;&#xFF0C;&#x6CA1;&#x6709;&#x4F60;&#x5E38;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6216;&#x8005;&#x4F60;&#x6709;&#x66F4;&#x597D;&#x7684;&#x5EFA;&#x8BAE;&#xFF0C;&#x6B22;&#x8FCE;&#x6765;&#x672C;&#x9879;&#x76EE;&#x7684;<a href="https://github.com/proYang/outils/issues" rel="nofollow noreferrer" target="_blank"> Github Issues </a>&#x4EA4;&#x6D41;&#xFF0C;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x4E0D;&#x9519;&#xFF0C;&#x6B22;&#x8FCE;<a href="https://github.com/proYang/outils" rel="nofollow noreferrer" target="_blank"> star </a>&#x672C;&#x9879;&#x76EE;&#x3002;</p>
<p>&#x5F53;&#x7136;&#xFF0C;&#x66F4;&#x597D;&#x7684;&#x5EFA;&#x8BAE;&#x662F;<a href="https://github.com/proYang/outils" rel="nofollow noreferrer" target="_blank"> fork </a>&#x672C;&#x9879;&#x76EE;&#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x65B0;&#x5EFA;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x6DFB;&#x52A0;&#x81EA;&#x5DF1; <strong>&#x60F3;&#x8981;&#x7684;</strong> &#x3001;<strong>&#x5E38;&#x7528;&#x7684;</strong> &#x3001;<strong>&#x8BB0;&#x4E0D;&#x4F4F;&#x7684;</strong> &#x51FD;&#x6570;&#xFF0C;&#x751A;&#x81F3;&#x662F;&#x53EF;&#x4EE5;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5C01;&#x88C5;&#x6210;&#x81EA;&#x5DF1;&#x987A;&#x624B;&#x3001;&#x719F;&#x6089;&#x7684;&#x5E93;&#x3002; &#x8FD9;&#x6837;&#x624D;&#x80FD;&#x6253;&#x9020;&#x51FA;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x6B66;&#x5668;&#x5E93;&#xFF0C;&#x77AC;&#x95F4;&#x63D0;&#x9AD8;&#x4F60;&#x7684;&#x5355;&#x5175;&#x4F5C;&#x6218;&#xFF08;&#x5F00;&#x53D1;&#xFF09;&#x80FD;&#x529B;&#x3002;</p>
<p>&#x5DE5;&#x6B32;&#x5584;&#x5176;&#x4E8B;&#x5FC5;&#x5148;&#x5229;&#x5176;&#x5668;&#x3002;&#x6709;&#x4E86;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x7684;&#x8FD9;&#x628A;&#x5229;&#x5668;&#xFF0C;&#x5E0C;&#x671B;&#x52A0;&#x73ED;&#x4E5F;&#x4F1A;&#x53D8;&#x6210;&#x5962;&#x671B;&#x3002;O(&#x2229;_&#x2229;)O&#x54C8;&#x54C8;~</p>

                
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
打造自己的JavaScript武器库

## 原文链接
[https://segmentfault.com/a/1190000011966867](https://segmentfault.com/a/1190000011966867)


---
title: 常用JS方法整理
hidden: true
categories: [reprint]
slug: 7f867ab0
date: 2018-10-26 02:30:12
---

{{< raw >}}
<p>&#x76EE;&#x5F55;&#xFF1A;</p><ol><li>&#x622A;&#x53D6;&#x6307;&#x5B9A;&#x5B57;&#x8282;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;</li><li>&#x5224;&#x65AD;&#x662F;&#x5426;&#x5FAE;&#x4FE1;</li><li>&#x83B7;&#x53D6;&#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x7684;&#x51E0;&#x4E2A;&#x4E3E;&#x4F8B;</li><li>&#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x5B57;&#x8282;&#x957F;&#x5EA6;</li><li>&#x5BF9;&#x8C61;&#x514B;&#x9686;&#x3001;&#x6DF1;&#x62F7;&#x8D1D;</li><li>&#x7EC4;&#x7EC7;&#x7ED3;&#x6784;&#x4EE3;&#x7801;&#x8BC1;&#x9A8C;&#x8BC1;</li><li>&#x8EAB;&#x4EFD;&#x8BC1;&#x53F7;&#x9A8C;&#x8BC1;</li><li>js&#x6B63;&#x5219;&#x4E3A;url&#x6DFB;&#x52A0;http&#x6807;&#x8BC6;</li><li>URL&#x6709;&#x6548;&#x6027;&#x6821;&#x9A8C;&#x65B9;&#x6CD5;</li><li>&#x81EA;&#x5B9A;&#x4E49;jsonp&#x65B9;&#x6CD5;</li><li>cookie&#x64CD;&#x4F5C;</li><li>&#x751F;&#x6210;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32; (&#x53EF;&#x6307;&#x5B9A;&#x957F;&#x5EA6;)</li><li>&#x6D4F;&#x89C8;&#x5668;&#x5224;&#x65AD;</li><li>Rem&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;</li><li>&#x83B7;&#x53D6;url&#x540E;&#x53C2;&#x6570;</li><li>&#x52A8;&#x6001;&#x52A0;&#x8F7D;JS</li><li>&#x751F;&#x6210;&#x968F;&#x673A;&#x989C;&#x8272;&#x503C;</li></ol><h1 id="articleHeader0">1.&#x622A;&#x53D6;&#x6307;&#x5B9A;&#x5B57;&#x8282;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x622A;&#x53D6;&#x6307;&#x5B9A;&#x5B57;&#x8282;&#x7684;&#x5B57;&#x7B26;&#x4E32;
 * @param str &#x8981;&#x622A;&#x53D6;&#x7684;&#x5B57;&#x7B26;&#x7A7F;
 * @param len &#x8981;&#x622A;&#x53D6;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x6839;&#x636E;&#x5B57;&#x8282;&#x8BA1;&#x7B97;
 * @param suffix &#x622A;&#x53D6;&#x524D;len&#x4E2A;&#x540E;&#xFF0C;&#x5176;&#x4F59;&#x7684;&#x5B57;&#x7B26;&#x7684;&#x66FF;&#x6362;&#x5B57;&#x7B26;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x201C;&#x2026;&#x201D;
 * @returns {*}
 */
function cutString(str, len, suffix) {
  if (!str) return &quot;&quot;;
  if (len &lt;= 0) return &quot;&quot;;
  if (!suffix) suffix = &quot;&quot;;
  var templen = 0;
  for (var i = 0; i &lt; str.length; i++) {
    if (str.charCodeAt(i) &gt; 255) {
      templen += 2;
    } else {
      templen++
    }
    if (templen == len) {
      return str.substring(0, i + 1) + suffix;
    } else if (templen &gt; len) {
      return str.substring(0, i) + suffix;
    }
  }
  return str;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * &#x622A;&#x53D6;&#x6307;&#x5B9A;&#x5B57;&#x8282;&#x7684;&#x5B57;&#x7B26;&#x4E32;
 * <span class="hljs-doctag">@param</span> str &#x8981;&#x622A;&#x53D6;&#x7684;&#x5B57;&#x7B26;&#x7A7F;
 * <span class="hljs-doctag">@param</span> len &#x8981;&#x622A;&#x53D6;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x6839;&#x636E;&#x5B57;&#x8282;&#x8BA1;&#x7B97;
 * <span class="hljs-doctag">@param</span> suffix &#x622A;&#x53D6;&#x524D;len&#x4E2A;&#x540E;&#xFF0C;&#x5176;&#x4F59;&#x7684;&#x5B57;&#x7B26;&#x7684;&#x66FF;&#x6362;&#x5B57;&#x7B26;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x201C;&#x2026;&#x201D;
 * <span class="hljs-doctag">@returns</span> {*}
 */</span>
function cutString(str, len, suffix) {
  <span class="hljs-keyword">if</span> (!str) <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">if</span> (len &lt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">if</span> (!suffix) suffix = <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">var</span> templen = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
    <span class="hljs-keyword">if</span> (str.charCodeAt(i) &gt; <span class="hljs-number">255</span>) {
      templen += <span class="hljs-number">2</span>;
    } <span class="hljs-keyword">else</span> {
      templen++
    }
    <span class="hljs-keyword">if</span> (templen == len) {
      <span class="hljs-keyword">return</span> str.substring(<span class="hljs-number">0</span>, i + <span class="hljs-number">1</span>) + suffix;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (templen &gt; len) {
      <span class="hljs-keyword">return</span> str.substring(<span class="hljs-number">0</span>, i) + suffix;
    }
  }
  <span class="hljs-keyword">return</span> str;
}
</code></pre><h1 id="articleHeader1">2.&#x5224;&#x65AD;&#x662F;&#x5426;&#x5FAE;&#x4FE1;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x5224;&#x65AD;&#x5FAE;&#x4FE1;&#x6D4F;&#x89C8;&#x5668;
 * @returns {Boolean}
 */
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == &apos;micromessenger&apos;) {
    return true;
  } else {
    return false;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * &#x5224;&#x65AD;&#x5FAE;&#x4FE1;&#x6D4F;&#x89C8;&#x5668;
 * @returns {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isWeiXin</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent.toLowerCase();
  <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/MicroMessenger/i</span>) == <span class="hljs-string">&apos;micromessenger&apos;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}
</code></pre><h1 id="articleHeader2">3.&#x83B7;&#x53D6;&#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x7684;&#x51E0;&#x4E2A;&#x4E3E;&#x4F8B;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getTimeFormat(time) {
  var date = new Date(parseInt(time) * 1000);
  var month, day, hour, min;
  parseInt(date.getMonth()) + 1 &lt; 10 ? month = &apos;0&apos; + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() &lt; 10 ? day = &apos;0&apos; + date.getDate() : day = date.getDate();
  date.getHours() &lt; 10 ? hour = &apos;0&apos; + date.getHours() : hour = date.getHours();
  date.getMinutes() &lt; 10 ? min = &apos;0&apos; + date.getMinutes() : min = date.getMinutes();
  return [month, day].join(&apos;-&apos;) + &apos;  &apos; + hour + &apos;:&apos; + min
}

function getTimeFormatYMD(time) {
  var date = new Date(parseInt(time) * 1000);
  var year, month, day;
  year = date.getFullYear();
  parseInt(date.getMonth()) + 1 &lt; 10 ? month = &apos;0&apos; + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() &lt; 10 ? day = &apos;0&apos; + date.getDate() : day = date.getDate();
  return [year, month, day].join(&apos;-&apos;)
}

function getTimeFormatAll(time) {
  var date = new Date(parseInt(time) * 1000);
  var year, month, day, hour, min, second;
  year = date.getFullYear();
  parseInt(date.getMonth()) + 1 &lt; 10 ? month = &apos;0&apos; + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() &lt; 10 ? day = &apos;0&apos; + date.getDate() : day = date.getDate();
  date.getHours() &lt; 10 ? hour = &apos;0&apos; + date.getHours() : hour = date.getHours();
  date.getMinutes() &lt; 10 ? min = &apos;0&apos; + date.getMinutes() : min = date.getMinutes();
  date.getSeconds() &lt; 10 ? second = &apos;0&apos; + date.getSeconds() : second = date.getSeconds();

  return [year, month, day].join(&apos;-&apos;) + &apos;  &apos; + hour + &apos;:&apos; + min + &apos;:&apos; + second
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTimeFormat</span>(<span class="hljs-params">time</span>) </span>{
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">parseInt</span>(time) * <span class="hljs-number">1000</span>);
  <span class="hljs-built_in">var</span> month, day, hour, min;
  <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span> ? month = <span class="hljs-string">&apos;0&apos;</span> + (<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span>) : month = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span>;
  <span class="hljs-built_in">date</span>.getDate() &lt; <span class="hljs-number">10</span> ? day = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getDate() : day = <span class="hljs-built_in">date</span>.getDate();
  <span class="hljs-built_in">date</span>.getHours() &lt; <span class="hljs-number">10</span> ? hour = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getHours() : hour = <span class="hljs-built_in">date</span>.getHours();
  <span class="hljs-built_in">date</span>.getMinutes() &lt; <span class="hljs-number">10</span> ? min = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getMinutes() : min = <span class="hljs-built_in">date</span>.getMinutes();
  <span class="hljs-keyword">return</span> [month, day].join(<span class="hljs-string">&apos;-&apos;</span>) + <span class="hljs-string">&apos;  &apos;</span> + hour + <span class="hljs-string">&apos;:&apos;</span> + min
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTimeFormatYMD</span>(<span class="hljs-params">time</span>) </span>{
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">parseInt</span>(time) * <span class="hljs-number">1000</span>);
  <span class="hljs-built_in">var</span> year, month, day;
  year = <span class="hljs-built_in">date</span>.getFullYear();
  <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span> ? month = <span class="hljs-string">&apos;0&apos;</span> + (<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span>) : month = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span>;
  <span class="hljs-built_in">date</span>.getDate() &lt; <span class="hljs-number">10</span> ? day = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getDate() : day = <span class="hljs-built_in">date</span>.getDate();
  <span class="hljs-keyword">return</span> [year, month, day].join(<span class="hljs-string">&apos;-&apos;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTimeFormatAll</span>(<span class="hljs-params">time</span>) </span>{
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">parseInt</span>(time) * <span class="hljs-number">1000</span>);
  <span class="hljs-built_in">var</span> year, month, day, hour, min, second;
  year = <span class="hljs-built_in">date</span>.getFullYear();
  <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span> ? month = <span class="hljs-string">&apos;0&apos;</span> + (<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span>) : month = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">date</span>.getMonth()) + <span class="hljs-number">1</span>;
  <span class="hljs-built_in">date</span>.getDate() &lt; <span class="hljs-number">10</span> ? day = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getDate() : day = <span class="hljs-built_in">date</span>.getDate();
  <span class="hljs-built_in">date</span>.getHours() &lt; <span class="hljs-number">10</span> ? hour = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getHours() : hour = <span class="hljs-built_in">date</span>.getHours();
  <span class="hljs-built_in">date</span>.getMinutes() &lt; <span class="hljs-number">10</span> ? min = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getMinutes() : min = <span class="hljs-built_in">date</span>.getMinutes();
  <span class="hljs-built_in">date</span>.getSeconds() &lt; <span class="hljs-number">10</span> ? second = <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-built_in">date</span>.getSeconds() : second = <span class="hljs-built_in">date</span>.getSeconds();

  <span class="hljs-keyword">return</span> [year, month, day].join(<span class="hljs-string">&apos;-&apos;</span>) + <span class="hljs-string">&apos;  &apos;</span> + hour + <span class="hljs-string">&apos;:&apos;</span> + min + <span class="hljs-string">&apos;:&apos;</span> + second
}
</code></pre><h1 id="articleHeader3">4.&#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x5B57;&#x8282;&#x957F;&#x5EA6;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x5B57;&#x8282;&#x957F;&#x5EA6;
 * @param {String}
 * @returns {Boolean}
 */
function checkLength(v) {
  var realLength = 0;
  var len = v.length;
  for (var i = 0; i &lt; len; i++) {
    var charCode = v.charCodeAt(i);
    if (charCode &gt;= 0 &amp;&amp; charCode &lt;= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * &#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x5B57;&#x8282;&#x957F;&#x5EA6;
 * <span class="hljs-doctag">@param</span> {String}
 * <span class="hljs-doctag">@returns</span> {Boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkLength</span><span class="hljs-params">(v)</span> </span>{
  <span class="hljs-keyword">var</span> realLength = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> len = v.length;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-keyword">var</span> charCode = v.charCodeAt(i);
    <span class="hljs-keyword">if</span> (charCode &gt;= <span class="hljs-number">0</span> &amp;&amp; charCode &lt;= <span class="hljs-number">128</span>) realLength += <span class="hljs-number">1</span>;
    <span class="hljs-keyword">else</span> realLength += <span class="hljs-number">2</span>;
  }
  <span class="hljs-keyword">return</span> realLength;
}
</code></pre><h1 id="articleHeader4">5.&#x5BF9;&#x8C61;&#x514B;&#x9686;&#x3001;&#x6DF1;&#x62F7;&#x8D1D;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x5BF9;&#x8C61;&#x514B;&#x9686;&amp;&#x6DF1;&#x62F7;&#x8D1D;
 * @param obj
 * @returns {{}}
 */
function cloneObj(obj) {
  var newO = {};
  if (obj instanceof Array) {
    newO = [];
  }
  for (var key in obj) {
    var val = obj[key];
    newO[key] = typeof val === &apos;object&apos; ? arguments.callee(val) : val;
  }
  return newO;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-comment">/**
 * &#x5BF9;&#x8C61;&#x514B;&#x9686;&amp;&#x6DF1;&#x62F7;&#x8D1D;
 * @param obj
 * @returns {{}}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cloneObj</span></span>(obj) {
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">O</span> = {};
  <span class="hljs-keyword">if</span> (obj instanceof <span class="hljs-keyword">Array</span>) {
    <span class="hljs-keyword">new</span><span class="hljs-type">O</span> = [];
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">var</span> val = obj[key];
    <span class="hljs-keyword">new</span><span class="hljs-type">O</span>[key] = typeof val === <span class="hljs-string">&apos;object&apos;</span> ? arguments.callee(val) : <span class="hljs-type">val</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">O</span>;
};
</code></pre><p>&#x514B;&#x9686;&#x62F7;&#x8D1D;&#x589E;&#x5F3A;&#x7248;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x5BF9;&#x8C61;&#x514B;&#x9686;&amp;&#x6DF1;&#x62F7;&#x8D1D;
 * @param obj
 * @returns {{}}
 */
function clone(obj) {
  // Handle the 3 simple types, and null or undefined
  if (null == obj || &quot;object&quot; != typeof obj) return obj;
  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0,
    len = obj.length; i &lt; len; ++i) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }
  throw new Error(&quot;Unable to copy obj! Its type isn&apos;t supported.&quot;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * &#x5BF9;&#x8C61;&#x514B;&#x9686;&amp;&#x6DF1;&#x62F7;&#x8D1D;
 * @param obj
 * @returns {{}}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clone</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-comment">// Handle the 3 simple types, and null or undefined</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">null</span> == obj || <span class="hljs-string">&quot;object&quot;</span> != <span class="hljs-keyword">typeof</span> obj) <span class="hljs-keyword">return</span> obj;
  <span class="hljs-comment">// Handle Date</span>
  <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
    <span class="hljs-keyword">var</span> copy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    copy.setTime(obj.getTime());
    <span class="hljs-keyword">return</span> copy;
  }
  <span class="hljs-comment">// Handle Array</span>
  <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
    <span class="hljs-keyword">var</span> copy = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,
    len = obj.length; i &lt; len; ++i) {
      copy[i] = clone(obj[i]);
    }
    <span class="hljs-keyword">return</span> copy;
  }
  <span class="hljs-comment">// Handle Object</span>
  <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>) {
    <span class="hljs-keyword">var</span> copy = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj) {
      <span class="hljs-keyword">if</span> (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    <span class="hljs-keyword">return</span> copy;
  }
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;Unable to copy obj! Its type isn&apos;t supported.&quot;</span>);
}
</code></pre><h1 id="articleHeader5">6.&#x7EC4;&#x7EC7;&#x7ED3;&#x6784;&#x4EE3;&#x7801;&#x8BC1;&#x9A8C;&#x8BC1;</h1><p>&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#xFF1A;<br>&#x7EC4;&#x7EC7;&#x673A;&#x6784;&#x4EE3;&#x7801;&#x662F;&#x6BCF;&#x4E00;&#x4E2A;&#x673A;&#x5173;&#x3001;&#x793E;&#x4F1A;&#x56E2;&#x4F53;&#x3001;&#x4F01;&#x4E8B;&#x4E1A;&#x5355;&#x4F4D;&#x5728;&#x5168;&#x56FD;&#x8303;&#x56F4;&#x5185;&#x552F;&#x4E00;&#x7684;&#x3001;&#x59CB;&#x7EC8;&#x4E0D;&#x53D8;&#x7684;&#x6CD5;&#x5B9A;&#x4EE3;&#x7801;&#x6807;&#x8BC6;&#x3002;&#x6700;&#x65B0;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x7EC7;&#x673A;&#x6784;&#x4EE3;&#x7801;&#x5728;1997&#x5E74;&#x9881;&#x5E03;&#x5B9E;&#x65BD;&#xFF0C;&#x7531;8&#x4F4D;&#x6570;&#x5B57;&#xFF08;&#x6216;&#x5927;&#x5199;&#x62C9;&#x4E01;&#x5B57;&#x6BCD;&#xFF09;&#x672C;&#x4F53;&#x4EE3;&#x7801;&#x548C;1&#x4F4D;&#x6570;&#x5B57;&#xFF08;&#x6216;&#x5927;&#x5199;&#x62C9;&#x4E01;&#x5B57;&#x6BCD;&#xFF09;&#x6821;&#x9A8C;&#x7801;&#x7EC4;&#x6210;&#x3002;&#x672C;&#x4F53;&#x4EE3;&#x7801;&#x91C7;&#x7528;&#x7CFB;&#x5217;&#xFF08;&#x5373;&#x5206;&#x533A;&#x6BB5;&#xFF09;&#x987A;&#x5E8F;&#x7F16;&#x7801;&#x65B9;&#x6CD5;&#x3002;&#x6821;&#x9A8C;&#x7801;&#x6309;&#x4E0B;&#x5217;&#x516C;&#x5F0F;&#x8BA1;&#x7B97;&#xFF1A;8 C9 = 11 - MOD(&#x2211;Ci * Wi&#xFF0C;11)&#x2026; (2) i = 1&#x5176;&#x4E2D;&#xFF1A;MOD&#x2014;&#x2014;&#x8868;&#x793A;&#x6C42;&#x4F59;&#x51FD;&#x6570;&#xFF1B;i&#x2014;&#x2014;&#x8868;&#x793A;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x4F4D;&#x7F6E;&#x5E8F;&#x53F7;&#xFF1B;Ci&#x2014;&#x2014;&#x8868;&#x793A;&#x7B2C;i&#x4F4D;&#x7F6E;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x7684;&#x503C;&#xFF0C;&#x91C7;&#x7528;&#x9644;&#x5F55;A&#x201C;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x96C6;&#x201D;&#x6240;&#x5217;&#x5B57;&#x7B26;&#xFF1B;C9&#x2014;&#x2014;&#x8868;&#x793A;&#x6821;&#x9A8C;&#x7801;&#xFF1B;Wi&#x2014;&#x2014;&#x8868;&#x793A;&#x7B2C;i&#x4F4D;&#x7F6E;&#x4E0A;&#x7684;&#x52A0;&#x6743;&#x56E0;&#x5B50;&#xFF0C;&#x5176;&#x6570;&#x503C;&#x5982;&#x4E0B;&#x8868;&#xFF1A;i 1 2 3 4 5 6 7 8 Wi 3 7 9 10 5 8 4 2&#x5F53;MOD&#x51FD;&#x6570;&#x503C;&#x4E3A;1&#xFF08;&#x5373;C9 = 10&#xFF09;&#x65F6;&#xFF0C;&#x6821;&#x9A8C;&#x7801;&#x7528;&#x5B57;&#x6BCD;X&#x8868;&#x793A;&#x3002;<br>&#x9A8C;&#x8BC1;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkOrgCodeValid: function(el) {
  var txtval = el.value;
  var values = txtval.split(&quot;-&quot;);
  var ws = [3, 7, 9, 10, 5, 8, 4, 2];
  var str = &apos;0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&apos;;
  var reg = /^([0-9A-Z]){8}$/;
  if (!reg.test(values[0])) {
    return false
  }
  var sum = 0;
  for (var i = 0; i &lt; 8; i++) {
    sum += str.indexOf(values[0].charAt(i)) * ws[i];
  }
  var C9 = 11 - (sum % 11);
  var YC9 = values[1] + &apos;&apos;;
  if (C9 == 11) {
    C9 = &apos;0&apos;;
  } else if (C9 == 10) {
    C9 = &apos;X&apos;;
  } else {
    C9 = C9 + &apos;&apos;;
  }
  return YC9 == C9;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>checkOrgCodeValid: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">var</span> txtval = el.value;
  <span class="hljs-keyword">var</span> values = txtval.split(<span class="hljs-string">&quot;-&quot;</span>);
  <span class="hljs-keyword">var</span> ws = [<span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>];
  <span class="hljs-keyword">var</span> str = <span class="hljs-string">&apos;0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&apos;</span>;
  <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/^([0-9A-Z]){8}$/</span>;
  <span class="hljs-keyword">if</span> (!reg.test(values[<span class="hljs-number">0</span>])) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
  <span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">8</span>; i++) {
    sum += str.indexOf(values[<span class="hljs-number">0</span>].charAt(i)) * ws[i];
  }
  <span class="hljs-keyword">var</span> C9 = <span class="hljs-number">11</span> - (sum % <span class="hljs-number">11</span>);
  <span class="hljs-keyword">var</span> YC9 = values[<span class="hljs-number">1</span>] + <span class="hljs-string">&apos;&apos;</span>;
  <span class="hljs-keyword">if</span> (C9 == <span class="hljs-number">11</span>) {
    C9 = <span class="hljs-string">&apos;0&apos;</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (C9 == <span class="hljs-number">10</span>) {
    C9 = <span class="hljs-string">&apos;X&apos;</span>;
  } <span class="hljs-keyword">else</span> {
    C9 = C9 + <span class="hljs-string">&apos;&apos;</span>;
  }
  <span class="hljs-keyword">return</span> YC9 == C9;
}
</code></pre><h1 id="articleHeader6">7.&#x8EAB;&#x4EFD;&#x8BC1;&#x53F7;&#x9A8C;&#x8BC1;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x9A8C;&#x8BC1;&#x8EAB;&#x4EFD;&#x8BC1;&#x53F7;
 * @param el &#x53F7;&#x7801;&#x8F93;&#x5165;input
 * @returns {boolean}
 */
function checkCardNo(el) {
  var txtval = el.value;
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(txtval)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * &#x9A8C;&#x8BC1;&#x8EAB;&#x4EFD;&#x8BC1;&#x53F7;
 * <span class="hljs-doctag">@param</span> el &#x53F7;&#x7801;&#x8F93;&#x5165;input
 * <span class="hljs-doctag">@returns</span> {boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkCardNo</span><span class="hljs-params">(el)</span> </span>{
  <span class="hljs-keyword">var</span> txtval = el.value;
  <span class="hljs-keyword">var</span> reg = /(^\d{<span class="hljs-number">15</span>}$)|(^\d{<span class="hljs-number">18</span>}$)|(^\d{<span class="hljs-number">17</span>}(\d|X|x)$)/;
  <span class="hljs-keyword">return</span> reg.test(txtval)
}
</code></pre><h1 id="articleHeader7">8.js&#x6B63;&#x5219;&#x4E3A;url&#x6DFB;&#x52A0;http&#x6807;&#x8BC6;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;meta name=&quot;renderer&quot; content=&quot;webkit&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;&gt;  
  &lt;title&gt;&lt;/title&gt;
  &lt;script&gt;
        var html = &apos;http:/ / www.google.com &apos;;
        html += &apos;\rwww.google.com &apos;;
        html += &apos;\rcode.google.com &apos;;
        html += &apos;\rhttp: //code.google.com/hosting/search?q=label%3aPython&apos;;
        var regex = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi;
        alert(&apos;before replace:&apos;);
        alert(html);
        html = html.replace(regex,
            function(match, capture) {
                if (capture) {
                    return match
                } else {
                    return &apos;http://&apos; + match;
                }
            });
        alert(&apos;after replace:&apos;);
        alert(html); 
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;  
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;renderer&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;webkit&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;IE=edge,chrome=1&quot;</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> html = <span class="hljs-string">&apos;http:/ / www.google.com &apos;</span>;
        html += <span class="hljs-string">&apos;\rwww.google.com &apos;</span>;
        html += <span class="hljs-string">&apos;\rcode.google.com &apos;</span>;
        html += <span class="hljs-string">&apos;\rhttp: //code.google.com/hosting/search?q=label%3aPython&apos;</span>;
        <span class="hljs-keyword">var</span> regex = <span class="hljs-regexp">/(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi</span>;
        alert(<span class="hljs-string">&apos;before replace:&apos;</span>);
        alert(html);
        html = html.replace(regex,
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match, capture</span>) </span>{
                <span class="hljs-keyword">if</span> (capture) {
                    <span class="hljs-keyword">return</span> match
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;http://&apos;</span> + match;
                }
            });
        alert(<span class="hljs-string">&apos;after replace:&apos;</span>);
        alert(html); 
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h1 id="articleHeader8">9.URL&#x6709;&#x6548;&#x6027;&#x6821;&#x9A8C;&#x65B9;&#x6CD5;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * URL&#x6709;&#x6548;&#x6027;&#x6821;&#x9A8C;
 * @param str_url
 * @returns {boolean}
 */
function isURL(str_url) { 
  // &#x9A8C;&#x8BC1;url
  var strRegex = &quot;^((https|http|ftp|rtsp|mms)?://)&quot; + &quot;?(([0-9a-z_!~*&apos;().&amp;=+$%-]+: )?[0-9a-z_!~*&apos;().&amp;=+$%-]+@)?&quot; //           
  ftp&#x7684;user@ + &quot;(([0-9]{1,3}\.){3}[0-9]{1,3}&quot; // IP&#x5F62;&#x5F0F;&#x7684;URL- 199.194.52.184
  + &quot;|&quot; // &#x5141;&#x8BB8;IP&#x548C;DOMAIN&#xFF08;&#x57DF;&#x540D;&#xFF09;
  + &quot;([0-9a-z_!~*&apos;()-]+\.)*&quot; // &#x57DF;&#x540D;- www.
  + &quot;([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.&quot; // &#x4E8C;&#x7EA7;&#x57DF;&#x540D;
  + &quot;[a-z]{2,6})&quot; // first level domain- .com or .museum
  + &quot;(:[0-9]{1,4})?&quot; // &#x7AEF;&#x53E3;- :80
  + &quot;((/?)|&quot; // a slash isn&apos;t required if there is no file name
  + &quot;(/[0-9a-z_!~*&apos;().;?:@&amp;=+$,%#-]+)+/?)$&quot;;
  var re = new RegExp(strRegex);
  return re.test(str_url);
}
// &#x5EFA;&#x8BAE;&#x7684;&#x6B63;&#x5219;
functionisURL(str) {
  return !! str.match(/(((^https?:(?:\/\/)?)(?:[-;:&amp;=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&amp;=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&amp;;%@.\w_]*)#?(?:[\w]*))?)$/g);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code><span class="hljs-comment">/**
 * URL&#x6709;&#x6548;&#x6027;&#x6821;&#x9A8C;
 * @param str_url
 * @returns {boolean}
 */</span>
function isURL(str_url) { 
  <span class="hljs-comment">// &#x9A8C;&#x8BC1;url</span>
  <span class="hljs-keyword">var</span> strRegex = <span class="hljs-string">&quot;^((https|http|ftp|rtsp|mms)?://)&quot;</span> + <span class="hljs-string">&quot;?(([0-9a-z_!~*&apos;().&amp;=+$%-]+: )?[0-9a-z_!~*&apos;().&amp;=+$%-]+@)?&quot;</span> <span class="hljs-comment">//           </span>
  ftp&#x7684;user@ + <span class="hljs-string">&quot;(([0-9]{1,3}\.){3}[0-9]{1,3}&quot;</span> <span class="hljs-comment">// IP&#x5F62;&#x5F0F;&#x7684;URL- 199.194.52.184</span>
  + <span class="hljs-string">&quot;|&quot;</span> <span class="hljs-comment">// &#x5141;&#x8BB8;IP&#x548C;DOMAIN&#xFF08;&#x57DF;&#x540D;&#xFF09;</span>
  + <span class="hljs-string">&quot;([0-9a-z_!~*&apos;()-]+\.)*&quot;</span> <span class="hljs-comment">// &#x57DF;&#x540D;- www.</span>
  + <span class="hljs-string">&quot;([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.&quot;</span> <span class="hljs-comment">// &#x4E8C;&#x7EA7;&#x57DF;&#x540D;</span>
  + <span class="hljs-string">&quot;[a-z]{2,6})&quot;</span> <span class="hljs-comment">// first level domain- .com or .museum</span>
  + <span class="hljs-string">&quot;(:[0-9]{1,4})?&quot;</span> <span class="hljs-comment">// &#x7AEF;&#x53E3;- :80</span>
  + <span class="hljs-string">&quot;((/?)|&quot;</span> <span class="hljs-comment">// a slash isn&apos;t required if there is no file name</span>
  + <span class="hljs-string">&quot;(/[0-9a-z_!~*&apos;().;?:@&amp;=+$,%#-]+)+/?)$&quot;</span>;
  <span class="hljs-keyword">var</span> re = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">RegExp</span>(strRegex);
  <span class="hljs-title">return</span> <span class="hljs-title">re</span>.<span class="hljs-title">test</span>(str_url);
}
<span class="hljs-comment">// &#x5EFA;&#x8BAE;&#x7684;&#x6B63;&#x5219;</span>
<span class="hljs-title">functionisURL</span>(str) {
  <span class="hljs-title">return</span> !! <span class="hljs-title">str</span>.<span class="hljs-title">match</span>(/(((^https?:(?:\/\/)?)(?:[-;:&amp;=\+\$,\w]+@)?[<span class="hljs-title">A</span>-<span class="hljs-title">Za</span>-<span class="hljs-title">z0</span>-9.-]+|(?:www.|[-;:&amp;=\+\$,\w]+@)[<span class="hljs-title">A</span>-<span class="hljs-title">Za</span>-<span class="hljs-title">z0</span>-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&amp;;%@.\w_]*)#?(?:[\w]*))?)$/<span class="hljs-title">g</span>);
}
</span></code></pre><h1 id="articleHeader9">10.&#x81EA;&#x5B9A;&#x4E49;jsonp&#x65B9;&#x6CD5;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x81EA;&#x5B9A;&#x4E49;&#x5C01;&#x88C5;jsonp&#x65B9;&#x6CD5;
 * @param options
 */
jsonp = function(options) {
  options = options || {};
  if (!options.url || !options.callback) {
    throw new Error(&quot;&#x53C2;&#x6570;&#x4E0D;&#x5408;&#x6CD5;&quot;);
  }
  //&#x521B;&#x5EFA; script &#x6807;&#x7B7E;&#x5E76;&#x52A0;&#x5165;&#x5230;&#x9875;&#x9762;&#x4E2D;
  var callbackName = (&apos;jsonp_&apos; + Math.random()).replace(&quot;.&quot;, &quot;&quot;);
  var oHead = document.getElementsByTagName(&apos;head&apos;)[0];
  options.data[options.callback] = callbackName;
  var params = formatParams(options.data);
  var oS = document.createElement(&apos;script&apos;);
  oHead.appendChild(oS);
  //&#x521B;&#x5EFA;jsonp&#x56DE;&#x8C03;&#x51FD;&#x6570;
  window[callbackName] = function(json) {
    oHead.removeChild(oS);
    clearTimeout(oS.timer);
    window[callbackName] = null;
    options.success &amp;&amp; options.success(json);
  };
  //&#x53D1;&#x9001;&#x8BF7;&#x6C42;
  oS.src = options.url + &apos;?&apos; + params;
  //&#x8D85;&#x65F6;&#x5904;&#x7406;
  if (options.time) {
    oS.timer = setTimeout(function() {
      window[callbackName] = null;
      oHead.removeChild(oS);
      options.fail &amp;&amp; options.fail({
        message: &quot;&#x8D85;&#x65F6;&quot;
      });
    },
    time);
  }
};
/**
 * &#x683C;&#x5F0F;&#x5316;&#x53C2;&#x6570;
 * @param data
 * @returns {string}
 */
formatParams = function(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + &apos;=&apos; + encodeURIComponent(data[name]));
  }
  return arr.join(&apos;&amp;&apos;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * &#x81EA;&#x5B9A;&#x4E49;&#x5C01;&#x88C5;jsonp&#x65B9;&#x6CD5;
 * @param options
 */</span>
jsonp = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
  options = options || {};
  <span class="hljs-keyword">if</span> (!options.url || !options.callback) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;&#x53C2;&#x6570;&#x4E0D;&#x5408;&#x6CD5;&quot;</span>);
  }
  <span class="hljs-comment">//&#x521B;&#x5EFA; script &#x6807;&#x7B7E;&#x5E76;&#x52A0;&#x5165;&#x5230;&#x9875;&#x9762;&#x4E2D;</span>
  <span class="hljs-keyword">var</span> callbackName = (<span class="hljs-string">&apos;jsonp_&apos;</span> + <span class="hljs-built_in">Math</span>.random()).replace(<span class="hljs-string">&quot;.&quot;</span>, <span class="hljs-string">&quot;&quot;</span>);
  <span class="hljs-keyword">var</span> oHead = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;head&apos;</span>)[<span class="hljs-number">0</span>];
  options.data[options.callback] = callbackName;
  <span class="hljs-keyword">var</span> params = formatParams(options.data);
  <span class="hljs-keyword">var</span> oS = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;script&apos;</span>);
  oHead.appendChild(oS);
  <span class="hljs-comment">//&#x521B;&#x5EFA;jsonp&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
  <span class="hljs-built_in">window</span>[callbackName] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">json</span>) </span>{
    oHead.removeChild(oS);
    clearTimeout(oS.timer);
    <span class="hljs-built_in">window</span>[callbackName] = <span class="hljs-literal">null</span>;
    options.success &amp;&amp; options.success(json);
  };
  <span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
  oS.src = options.url + <span class="hljs-string">&apos;?&apos;</span> + params;
  <span class="hljs-comment">//&#x8D85;&#x65F6;&#x5904;&#x7406;</span>
  <span class="hljs-keyword">if</span> (options.time) {
    oS.timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">window</span>[callbackName] = <span class="hljs-literal">null</span>;
      oHead.removeChild(oS);
      options.fail &amp;&amp; options.fail({
        <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;&#x8D85;&#x65F6;&quot;</span>
      });
    },
    time);
  }
};
<span class="hljs-comment">/**
 * &#x683C;&#x5F0F;&#x5316;&#x53C2;&#x6570;
 * @param data
 * @returns {string}
 */</span>
formatParams = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">var</span> arr = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> data) {
    arr.push(<span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[name]));
  }
  <span class="hljs-keyword">return</span> arr.join(<span class="hljs-string">&apos;&amp;&apos;</span>);
}
</code></pre><h1 id="articleHeader10">11.cookie&#x64CD;&#x4F5C;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5199;cookies
setCookie = function(name, value, time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + &quot;=&quot; + escape(value) + &quot;;expires=&quot; + exp.toGMTString();
}
//cookie&#x64CD;&#x4F5C;&#x8F85;&#x52A9;&#x51FD;&#x6570;
getsec = function(str) {
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == &quot;s&quot;) {
    return str1 * 1000;
  } else if (str2 == &quot;h&quot;) {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == &quot;d&quot;) {
    return str1 * 24 * 60 * 60 * 1000;
  }
}
//&#x8BFB;&#x53D6;cookies
getCookie = function(name) {
  var arr, reg = new RegExp(&quot;(^| )&quot; + name + &quot;=([^;]*)(;|$)&quot;);
  if (arr = document.cookie.match(reg)) return (arr[2]);
  else return null;
}

//&#x5220;&#x9664;cookies
delCookie = function(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + &quot;=&quot; + cval + &quot;;expires=&quot; + exp.toGMTString();
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5199;cookies</span>
setCookie = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, value, time</span>) </span>{
  <span class="hljs-keyword">var</span> strsec = getsec(time);
  <span class="hljs-keyword">var</span> exp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  exp.setTime(exp.getTime() + strsec * <span class="hljs-number">1</span>);
  <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">&quot;=&quot;</span> + <span class="hljs-built_in">escape</span>(value) + <span class="hljs-string">&quot;;expires=&quot;</span> + exp.toGMTString();
}
<span class="hljs-comment">//cookie&#x64CD;&#x4F5C;&#x8F85;&#x52A9;&#x51FD;&#x6570;</span>
getsec = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">var</span> str1 = str.substring(<span class="hljs-number">1</span>, str.length) * <span class="hljs-number">1</span>;
  <span class="hljs-keyword">var</span> str2 = str.substring(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">if</span> (str2 == <span class="hljs-string">&quot;s&quot;</span>) {
    <span class="hljs-keyword">return</span> str1 * <span class="hljs-number">1000</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (str2 == <span class="hljs-string">&quot;h&quot;</span>) {
    <span class="hljs-keyword">return</span> str1 * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (str2 == <span class="hljs-string">&quot;d&quot;</span>) {
    <span class="hljs-keyword">return</span> str1 * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>;
  }
}
<span class="hljs-comment">//&#x8BFB;&#x53D6;cookies</span>
getCookie = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> arr, reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&quot;(^| )&quot;</span> + name + <span class="hljs-string">&quot;=([^;]*)(;|$)&quot;</span>);
  <span class="hljs-keyword">if</span> (arr = <span class="hljs-built_in">document</span>.cookie.match(reg)) <span class="hljs-keyword">return</span> (arr[<span class="hljs-number">2</span>]);
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">//&#x5220;&#x9664;cookies</span>
delCookie = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> exp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  exp.setTime(exp.getTime() - <span class="hljs-number">1</span>);
  <span class="hljs-keyword">var</span> cval = getCookie(name);
  <span class="hljs-keyword">if</span> (cval != <span class="hljs-literal">null</span>) <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">&quot;=&quot;</span> + cval + <span class="hljs-string">&quot;;expires=&quot;</span> + exp.toGMTString();
}
</code></pre><h1 id="articleHeader11">12.&#x751F;&#x6210;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32; (&#x53EF;&#x6307;&#x5B9A;&#x957F;&#x5EA6;)</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x751F;&#x6210;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32;(&#x53EF;&#x6307;&#x5B9A;&#x957F;&#x5EA6;)
 * @param len
 * @returns {string}
 */
randomString = function(len) {
  len = len || 8;
  var $chars = &apos;ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678&apos;;
  /****&#x9ED8;&#x8BA4;&#x53BB;&#x6389;&#x4E86;&#x5BB9;&#x6613;&#x6DF7;&#x6DC6;&#x7684;&#x5B57;&#x7B26;oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = &apos;&apos;;
  for (var i = 0; i &lt; len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * &#x751F;&#x6210;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32;(&#x53EF;&#x6307;&#x5B9A;&#x957F;&#x5EA6;)
 * <span class="hljs-doctag">@param</span> len
 * <span class="hljs-doctag">@returns</span> {string}
 */</span>
randomString = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(len)</span> </span>{
  len = len || <span class="hljs-number">8</span>;
  <span class="hljs-keyword">var</span> $chars = <span class="hljs-string">&apos;ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678&apos;</span>;
  <span class="hljs-comment">/****&#x9ED8;&#x8BA4;&#x53BB;&#x6389;&#x4E86;&#x5BB9;&#x6613;&#x6DF7;&#x6DC6;&#x7684;&#x5B57;&#x7B26;oOLl,9gq,Vv,Uu,I1****/</span>
  <span class="hljs-keyword">var</span> maxPos = $chars.length;
  <span class="hljs-keyword">var</span> pwd = <span class="hljs-string">&apos;&apos;</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  <span class="hljs-keyword">return</span> pwd;
}
</code></pre><h1 id="articleHeader12">13.&#x6D4F;&#x89C8;&#x5668;&#x5224;&#x65AD;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parseUA() {
  var u = navigator.userAgent;
  var u2 = navigator.userAgent.toLowerCase();
  return { //&#x79FB;&#x52A8;&#x7EC8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x672C;&#x4FE1;&#x606F;
    trident: u.indexOf(&apos;Trident&apos;) &gt; -1,
    //IE&#x5185;&#x6838;
    presto: u.indexOf(&apos;Presto&apos;) &gt; -1,
    //opera&#x5185;&#x6838;
    webKit: u.indexOf(&apos;AppleWebKit&apos;) &gt; -1,
    //&#x82F9;&#x679C;&#x3001;&#x8C37;&#x6B4C;&#x5185;&#x6838;
    gecko: u.indexOf(&apos;Gecko&apos;) &gt; -1 &amp;&amp; u.indexOf(&apos;KHTML&apos;) == -1,
    //&#x706B;&#x72D0;&#x5185;&#x6838;
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    //&#x662F;&#x5426;&#x4E3A;&#x79FB;&#x52A8;&#x7EC8;&#x7AEF;
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //ios&#x7EC8;&#x7AEF;
    android: u.indexOf(&apos;Android&apos;) &gt; -1 || u.indexOf(&apos;Linux&apos;) &gt; -1,
    //android&#x7EC8;&#x7AEF;&#x6216;uc&#x6D4F;&#x89C8;&#x5668;
    iPhone: u.indexOf(&apos;iPhone&apos;) &gt; -1,
    //&#x662F;&#x5426;&#x4E3A;iPhone&#x6216;&#x8005;QQHD&#x6D4F;&#x89C8;&#x5668;
    iPad: u.indexOf(&apos;iPad&apos;) &gt; -1,
    //&#x662F;&#x5426;iPad
    webApp: u.indexOf(&apos;Safari&apos;) == -1,
    //&#x662F;&#x5426;web&#x5E94;&#x8BE5;&#x7A0B;&#x5E8F;&#xFF0C;&#x6CA1;&#x6709;&#x5934;&#x90E8;&#x4E0E;&#x5E95;&#x90E8;
    iosv: u.substr(u.indexOf(&apos;iPhone OS&apos;) + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == &quot;micromessenger&quot;,
    ali: u.indexOf(&apos;AliApp&apos;) &gt; -1,
  };
}
var ua = parseUA();
if (!ua.mobile) {
  location.href = &apos;./pc.html&apos;;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseUA</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> u = navigator.userAgent;
  <span class="hljs-keyword">var</span> u2 = navigator.userAgent.toLowerCase();
  <span class="hljs-keyword">return</span> { <span class="hljs-comment">//&#x79FB;&#x52A8;&#x7EC8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x672C;&#x4FE1;&#x606F;</span>
    trident: u.indexOf(<span class="hljs-string">&apos;Trident&apos;</span>) &gt; <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//IE&#x5185;&#x6838;</span>
    presto: u.indexOf(<span class="hljs-string">&apos;Presto&apos;</span>) &gt; <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//opera&#x5185;&#x6838;</span>
    webKit: u.indexOf(<span class="hljs-string">&apos;AppleWebKit&apos;</span>) &gt; <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//&#x82F9;&#x679C;&#x3001;&#x8C37;&#x6B4C;&#x5185;&#x6838;</span>
    gecko: u.indexOf(<span class="hljs-string">&apos;Gecko&apos;</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; u.indexOf(<span class="hljs-string">&apos;KHTML&apos;</span>) == <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//&#x706B;&#x72D0;&#x5185;&#x6838;</span>
    mobile: !!u.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>),
    <span class="hljs-comment">//&#x662F;&#x5426;&#x4E3A;&#x79FB;&#x52A8;&#x7EC8;&#x7AEF;</span>
    ios: !!u.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>),
    <span class="hljs-comment">//ios&#x7EC8;&#x7AEF;</span>
    android: u.indexOf(<span class="hljs-string">&apos;Android&apos;</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">&apos;Linux&apos;</span>) &gt; <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//android&#x7EC8;&#x7AEF;&#x6216;uc&#x6D4F;&#x89C8;&#x5668;</span>
    iPhone: u.indexOf(<span class="hljs-string">&apos;iPhone&apos;</span>) &gt; <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//&#x662F;&#x5426;&#x4E3A;iPhone&#x6216;&#x8005;QQHD&#x6D4F;&#x89C8;&#x5668;</span>
    iPad: u.indexOf(<span class="hljs-string">&apos;iPad&apos;</span>) &gt; <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//&#x662F;&#x5426;iPad</span>
    webApp: u.indexOf(<span class="hljs-string">&apos;Safari&apos;</span>) == <span class="hljs-number">-1</span>,
    <span class="hljs-comment">//&#x662F;&#x5426;web&#x5E94;&#x8BE5;&#x7A0B;&#x5E8F;&#xFF0C;&#x6CA1;&#x6709;&#x5934;&#x90E8;&#x4E0E;&#x5E95;&#x90E8;</span>
    iosv: u.substr(u.indexOf(<span class="hljs-string">&apos;iPhone OS&apos;</span>) + <span class="hljs-number">9</span>, <span class="hljs-number">3</span>),
    <span class="hljs-attr">weixin</span>: u2.match(<span class="hljs-regexp">/MicroMessenger/i</span>) == <span class="hljs-string">&quot;micromessenger&quot;</span>,
    <span class="hljs-attr">ali</span>: u.indexOf(<span class="hljs-string">&apos;AliApp&apos;</span>) &gt; <span class="hljs-number">-1</span>,
  };
}
<span class="hljs-keyword">var</span> ua = parseUA();
<span class="hljs-keyword">if</span> (!ua.mobile) {
  location.href = <span class="hljs-string">&apos;./pc.html&apos;</span>;
}
</code></pre><h1 id="articleHeader13">14.Rem&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rem = {
  baseRem: 40,
  // &#x57FA;&#x51C6;&#x5B57;&#x53F7;&#xFF0C;&#x6309;&#x7167;iphone6&#x5E94;&#x8BE5;&#x4E3A;20&#xFF0C;&#x6B64;&#x5904;&#x6269;&#x5927;2&#x500D;&#xFF0C;&#x4FBF;&#x4E8E;&#x8BA1;&#x7B97;
  baseWidth: 750,
  // &#x57FA;&#x51C6;&#x5C3A;&#x5BF8;&#x5BBD;&#xFF0C;&#x6B64;&#x5904;&#x662F;&#x6309;&#x7167;ihpone6&#x7684;&#x5C3A;&#x5BF8;
  rootEle: document.getElementsByTagName(&quot;html&quot;)[0],
  initHandle: function() {
    this.setRemHandle();
    this.resizeHandle();
  },
  setRemHandle: function() {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.rootEle.style.fontSize = clientWidth * this.baseRem / this.baseWidth + &quot;px&quot;;
  },
  resizeHandle: function() {
    var that = this;
    window.addEventListener(&quot;resize&quot;,
    function() {
      setTimeout(function() {
        that.setRemHandle();
      },
      300);
    });
  }
};
rem.initHandle();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> rem = {
  <span class="hljs-attr">baseRem</span>: <span class="hljs-number">40</span>,
  <span class="hljs-comment">// &#x57FA;&#x51C6;&#x5B57;&#x53F7;&#xFF0C;&#x6309;&#x7167;iphone6&#x5E94;&#x8BE5;&#x4E3A;20&#xFF0C;&#x6B64;&#x5904;&#x6269;&#x5927;2&#x500D;&#xFF0C;&#x4FBF;&#x4E8E;&#x8BA1;&#x7B97;</span>
  baseWidth: <span class="hljs-number">750</span>,
  <span class="hljs-comment">// &#x57FA;&#x51C6;&#x5C3A;&#x5BF8;&#x5BBD;&#xFF0C;&#x6B64;&#x5904;&#x662F;&#x6309;&#x7167;ihpone6&#x7684;&#x5C3A;&#x5BF8;</span>
  rootEle: <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&quot;html&quot;</span>)[<span class="hljs-number">0</span>],
  <span class="hljs-attr">initHandle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.setRemHandle();
    <span class="hljs-keyword">this</span>.resizeHandle();
  },
  <span class="hljs-attr">setRemHandle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> clientWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth;
    <span class="hljs-keyword">this</span>.rootEle.style.fontSize = clientWidth * <span class="hljs-keyword">this</span>.baseRem / <span class="hljs-keyword">this</span>.baseWidth + <span class="hljs-string">&quot;px&quot;</span>;
  },
  <span class="hljs-attr">resizeHandle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&quot;resize&quot;</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        that.setRemHandle();
      },
      <span class="hljs-number">300</span>);
    });
  }
};
rem.initHandle();
</code></pre><h1 id="articleHeader14">15.&#x83B7;&#x53D6;url&#x540E;&#x53C2;&#x6570;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GetRequest() {
  var url = location.search; //&#x83B7;&#x53D6;url&#x4E2D;&quot;?&quot;&#x7B26;&#x540E;&#x7684;&#x5B57;&#x4E32;
  var theRequest = new Object();
  if (url.indexOf(&quot;?&quot;) != -1) {
    var str = url.substr(1);
    strs = str.split(&quot;&amp;&quot;);
    for (var i = 0; i &lt; strs.length; i++) {
      theRequest[strs[i].split(&quot;=&quot;)[0]] = (strs[i].split(&quot;=&quot;)[1]);
    }
  }
  return theRequest;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetRequest</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = location.search; <span class="hljs-comment">//&#x83B7;&#x53D6;url&#x4E2D;&quot;?&quot;&#x7B26;&#x540E;&#x7684;&#x5B57;&#x4E32;</span>
  <span class="hljs-built_in">var</span> theRequest = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">&quot;?&quot;</span>) != <span class="hljs-number">-1</span>) {
    <span class="hljs-built_in">var</span> str = <span class="hljs-built_in">url</span>.substr(<span class="hljs-number">1</span>);
    strs = str.split(<span class="hljs-string">&quot;&amp;&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; strs.length; i++) {
      theRequest[strs[i].split(<span class="hljs-string">&quot;=&quot;</span>)[<span class="hljs-number">0</span>]] = (strs[i].split(<span class="hljs-string">&quot;=&quot;</span>)[<span class="hljs-number">1</span>]);
    }
  }
  <span class="hljs-keyword">return</span> theRequest;
}
</code></pre><h1 id="articleHeader15">16.&#x52A8;&#x6001;&#x52A0;&#x8F7D;JS</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadScript(url, callback) {
  var script = document.createElement(&quot;script&quot;);
  script.type = &quot;text/&quot;;
  if (typeof(callback) != &quot;undefined&quot;) {
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == &quot;loaded&quot; || script.readyState == &quot;complete&quot;) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function() {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadScript</span>(<span class="hljs-params">url, callback</span>) </span>{
  <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;script&quot;</span>);
  script.type = <span class="hljs-string">&quot;text/&quot;</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span>(callback) != <span class="hljs-string">&quot;undefined&quot;</span>) {
    <span class="hljs-keyword">if</span> (script.readyState) {
      script.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (script.readyState == <span class="hljs-string">&quot;loaded&quot;</span> || script.readyState == <span class="hljs-string">&quot;complete&quot;</span>) {
          script.onreadystatechange = <span class="hljs-literal">null</span>;
          callback();
        }
      };
    } <span class="hljs-keyword">else</span> {
      script.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        callback();
      };
    }
  }
  script.src = url;
  <span class="hljs-built_in">document</span>.body.appendChild(script);
}
</code></pre><h1 id="articleHeader16">17.&#x751F;&#x6210;&#x968F;&#x673A;&#x989C;&#x8272;&#x503C;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getRandomColor () {
  const rgb = []
  for (let i = 0 ; i &lt; 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? &apos;0&apos; + color : color
    rgb.push(color)
  }
  return &apos;#&apos; + rgb.join(&apos;&apos;)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRandomColor</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> rgb = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span> ; i &lt; <span class="hljs-number">3</span>; ++i){
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">color</span> = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">256</span>).toString(<span class="hljs-number">16</span>)
    <span class="hljs-built_in">color</span> = <span class="hljs-built_in">color</span>.length == <span class="hljs-number">1</span> ? <span class="hljs-string">&apos;0&apos;</span> + <span class="hljs-attribute">color</span> : <span class="hljs-built_in">color</span>
    rgb.push(<span class="hljs-built_in">color</span>)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;#&apos;</span> + rgb.join(<span class="hljs-string">&apos;&apos;</span>)
}
</code></pre><p>&#x539F;&#x6587;&#xFF1A;<a href="https://frontendjs.com/topic/230/%E5%B8%B8%E7%94%A8js%E6%96%B9%E6%B3%95%E6%95%B4%E7%90%86" rel="nofollow noreferrer" target="_blank">https://frontendjs.com/topic/...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常用JS方法整理

## 原文链接
[https://segmentfault.com/a/1190000015995951](https://segmentfault.com/a/1190000015995951)


---
title: js常用的时间戳互相转换方法，以及一些其它相关时间方法。
hidden: true
categories: [reprint]
slug: 1c0d1b79
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x505A;&#x9879;&#x76EE;&#x5176;&#x5B9E;&#x7ECF;&#x5E38;&#x9700;&#x8981;&#x4E0E;&#x65F6;&#x95F4;&#x63A5;&#x89E6;&#x3002;&#x65F6;&#x95F4;&#x6233;&#x4E0E;&#x65F6;&#x95F4;&#x7684;&#x8F6C;&#x6362;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x8FD9;&#x505A;&#x4E00;&#x4E2A;&#x8BB0;&#x5F55;&#x3002;</p><h3 id="articleHeader1">1.&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x7684;&#x65F6;&#x95F4;&#x6233;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF08;&#x7CBE;&#x786E;&#x5230;&#x79D2;&#xFF09;
 var timestamp = Date.parse(new Date());

 //&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#xFF08;&#x7CBE;&#x786E;&#x5230;&#x6BEB;&#x79D2;&#xFF09;
 var timestamp = (new Date()).valueOf();

 //&#x7B2C;&#x4E09;&#x79CD;&#x65B9;&#x6CD5;(&#x7CBE;&#x786E;&#x5230;&#x6BEB;&#x79D2;)
 var timestamp=new Date().getTime();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF08;&#x7CBE;&#x786E;&#x5230;&#x79D2;&#xFF09;</span>
 <span class="hljs-keyword">var</span> timestamp = <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());

 <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#xFF08;&#x7CBE;&#x786E;&#x5230;&#x6BEB;&#x79D2;&#xFF09;</span>
 <span class="hljs-keyword">var</span> timestamp = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).valueOf();

 <span class="hljs-comment">//&#x7B2C;&#x4E09;&#x79CD;&#x65B9;&#x6CD5;(&#x7CBE;&#x786E;&#x5230;&#x6BEB;&#x79D2;)</span>
 <span class="hljs-keyword">var</span> timestamp=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();</code></pre><h3 id="articleHeader2">2.&#x65F6;&#x95F4;&#x6233;&#x8F6C;&#x6307;&#x5B9A;&#x65E5;&#x671F;&#x683C;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //&#x7B2C;&#x4E00;&#x79CD;
  function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, &apos; &apos;);
  }
  var nowTime = getLocalTime(timestamp);  //  2018/10/15 &#x4E0B;&#x5348;9:45

  //&#x7B2C;&#x4E8C;&#x79CD;
  function getLocalTime1(nS) {
    return new Date(parseInt(nS)).toLocaleString().substr(0, 17)
  }
  var nowTime = getLocalTime1(timestamp); // 2018/10/15 &#x4E0B;&#x5348;9:53

  //&#x7B2C;&#x4E09;&#x79CD;
   function getLocalTime2(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/&#x5E74;|&#x6708;/g, &quot;-&quot;).replace(/&#x65E5;/g, &quot; &quot;);
  }
  let nowTime1 = getLocalTime2(timestamp); //    2018/10/15 &#x4E0B;&#x5348;9:53:10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x79CD;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLocalTime</span>(<span class="hljs-params">nS</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">parseInt</span>(nS)).toLocaleString().replace(<span class="hljs-regexp">/:\d{1,2}$/</span>, <span class="hljs-string">&apos; &apos;</span>);
  }
  <span class="hljs-keyword">var</span> nowTime = getLocalTime(timestamp);  <span class="hljs-comment">//  2018/10/15 &#x4E0B;&#x5348;9:45</span>

  <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x79CD;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLocalTime1</span>(<span class="hljs-params">nS</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">parseInt</span>(nS)).toLocaleString().substr(<span class="hljs-number">0</span>, <span class="hljs-number">17</span>)
  }
  <span class="hljs-keyword">var</span> nowTime = getLocalTime1(timestamp); <span class="hljs-comment">// 2018/10/15 &#x4E0B;&#x5348;9:53</span>

  <span class="hljs-comment">//&#x7B2C;&#x4E09;&#x79CD;</span>
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLocalTime2</span>(<span class="hljs-params">nS</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">parseInt</span>(nS)).toLocaleString().replace(<span class="hljs-regexp">/&#x5E74;|&#x6708;/g</span>, <span class="hljs-string">&quot;-&quot;</span>).replace(<span class="hljs-regexp">/&#x65E5;/g</span>, <span class="hljs-string">&quot; &quot;</span>);
  }
  <span class="hljs-keyword">let</span> nowTime1 = getLocalTime2(timestamp); <span class="hljs-comment">//    2018/10/15 &#x4E0B;&#x5348;9:53:10</span></code></pre><p>&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x8F83;&#x4E3A;&#x7E41;&#x7410;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getFormatData(getData) {
  let date = new Date(parseInt(getData));
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(&apos;-&apos;) + &apos; &apos; + [hour, minute, second].map(formatNumber).join(&apos;:&apos;)
}

const formatNumber = n =&gt; {
  n = n.toString()
  return n[1] ? n : &apos;0&apos; + n
}

let DateTime = getFormatData(timestamp);        //2018-10-17 15:31:30" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>function getFormatData(getData) {
  let date = <span class="hljs-keyword">new</span> Date(parseInt(getData));
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">year</span> = date.getFullYear()
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">month</span> = date.getMonth() + <span class="hljs-number">1</span>
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">day</span> = date.getDate()
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">hour</span> = date.getHours()
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">minute</span> = date.getMinutes()
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">second</span> = date.getSeconds()

  <span class="hljs-keyword">return</span> [<span class="hljs-built_in">year</span>, <span class="hljs-built_in">month</span>, <span class="hljs-built_in">day</span>].<span class="hljs-built_in">map</span>(formatNumber).<span class="hljs-built_in">join</span>(<span class="hljs-string">&apos;-&apos;</span>) + <span class="hljs-string">&apos; &apos;</span> + [<span class="hljs-built_in">hour</span>, <span class="hljs-built_in">minute</span>, <span class="hljs-built_in">second</span>].<span class="hljs-built_in">map</span>(formatNumber).<span class="hljs-built_in">join</span>(<span class="hljs-string">&apos;:&apos;</span>)
}

<span class="hljs-keyword">const</span> formatNumber = n =&gt; {
  n = n.toString()
  <span class="hljs-keyword">return</span> n[<span class="hljs-number">1</span>] ? n : <span class="hljs-string">&apos;0&apos;</span> + n
}

let DateTime = getFormatData(timestamp);        <span class="hljs-comment">//2018-10-17 15:31:30</span></code></pre><h3 id="articleHeader3">3.&#x83B7;&#x53D6;&#x4ECA;&#x5929;0&#x70B9;&#x7684;&#x65F6;&#x95F4;&#x6233;</h3><p>toLocaleDateString() &#x65B9;&#x6CD5;&#x53EF;&#x6839;&#x636E;&#x672C;&#x5730;&#x65F6;&#x95F4;&#x628A; Date &#x5BF9;&#x8C61;&#x7684;&#x65E5;&#x671F;&#x90E8;&#x5206;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;&#xFF08;&#x5C31;&#x662F;&#x8FD4;&#x56DE;&#x201C;2018/10/17&#x201D;&#x8FD9;&#x6837;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getZeroTimestamp = new Date(new Date().toLocaleDateString()).getTime();
//&#x6CE8;&#xFF1A;toLocaleDateString&#x5F97;&#x5230;&#x7684;&#x65E5;&#x671F;&#x5B57;&#x7B26;&#x4E32;&#x6700;&#x597D;&#x522B;&#x7528;&#x6765;&#x505A;&#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x7684;&#x5904;&#x7406;&#xFF08;&#x5C31;&#x662F;&#x522B;&#x76F4;&#x63A5;&#x62FF;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x505A;&#x4E00;&#x4E9B;&#x66FF;&#x6362;&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#xFF09;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x5728;&#x522B;&#x4EBA;&#x7684;&#x6587;&#x7AE0;&#x770B;&#x5230;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x6216;&#x8005;&#x4E0D;&#x540C;&#x7248;&#x672C;&#x4E0B;&#x3002;&#x8FD4;&#x56DE;&#x7684;&#x6837;&#x5F0F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x201C;2018-10-17&#x201D;&#x8FD9;&#x79CD;&#x683C;&#x5F0F;&#x3002;&#x6211;&#x81EA;&#x5DF1;&#x8BD5;&#x4E86;&#x6700;&#x65B0;&#x7248;&#x7684;Google&#xFF0C;Firefox&#xFF0C;Safari&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x6837;&#x7684;&#x201C;2018/10/17&#x201D;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> getZeroTimestamp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleDateString()).getTime();
<span class="hljs-comment">//&#x6CE8;&#xFF1A;toLocaleDateString&#x5F97;&#x5230;&#x7684;&#x65E5;&#x671F;&#x5B57;&#x7B26;&#x4E32;&#x6700;&#x597D;&#x522B;&#x7528;&#x6765;&#x505A;&#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x7684;&#x5904;&#x7406;&#xFF08;&#x5C31;&#x662F;&#x522B;&#x76F4;&#x63A5;&#x62FF;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x505A;&#x4E00;&#x4E9B;&#x66FF;&#x6362;&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#xFF09;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x5728;&#x522B;&#x4EBA;&#x7684;&#x6587;&#x7AE0;&#x770B;&#x5230;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x6216;&#x8005;&#x4E0D;&#x540C;&#x7248;&#x672C;&#x4E0B;&#x3002;&#x8FD4;&#x56DE;&#x7684;&#x6837;&#x5F0F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x201C;2018-10-17&#x201D;&#x8FD9;&#x79CD;&#x683C;&#x5F0F;&#x3002;&#x6211;&#x81EA;&#x5DF1;&#x8BD5;&#x4E86;&#x6700;&#x65B0;&#x7248;&#x7684;Google&#xFF0C;Firefox&#xFF0C;Safari&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x6837;&#x7684;&#x201C;2018/10/17&#x201D;&#x3002;</span></code></pre><p>&#x6682;&#x65F6;&#x5C31;&#x60F3;&#x8D77;&#x6765;&#x90A3;&#x4E48;&#x591A;&#xFF0C;&#x4EE5;&#x540E;&#x7528;&#x5230;&#x65B0;&#x7684;&#x4F1A;&#x7EE7;&#x7EED;&#x589E;&#x52A0;&#x7684;&#x3002;&#x6700;&#x540E;&#xFF0C;&#x9644;&#x4E0A;&#xFF0C;w3c&#x4E0A;Date()&#x5BF9;&#x8C61;&#x7684;<a href="http://www.w3school.com.cn/jsref/jsref_obj_date.asp" rel="nofollow noreferrer" target="_blank">&#x94FE;&#x63A5;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js常用的时间戳互相转换方法，以及一些其它相关时间方法。

## 原文链接
[https://segmentfault.com/a/1190000016697004](https://segmentfault.com/a/1190000016697004)


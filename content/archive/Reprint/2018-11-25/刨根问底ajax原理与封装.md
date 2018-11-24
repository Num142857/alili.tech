---
title: '刨根问底ajax原理与封装' 
date: 2018-11-25 2:30:07
hidden: true
slug: d8pklimpkrr
categories: [reprint]
---

{{< raw >}}
<p>&#x8BF4;&#x8D77;ajax&#xFF0C;&#x5927;&#x5BB6;&#x90FD;&#x4E0D;&#x964C;&#x751F;&#x3002;&#x4F46;&#x662F;&#x7531;&#x4E8E;&#x76EE;&#x524D;&#x5F88;&#x591A;&#x6846;&#x67B6;&#x6216;&#x8005;&#x5E93;&#x7B49;&#x90FD;&#x5BF9;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x505A;&#x4E86;&#x5C01;&#x88C5;&#xFF0C;&#x5BFC;&#x81F4;&#x4E86;&#x5F88;&#x591A;&#x521D;&#x5B66;&#x8005;&#x53EA;&#x77E5;&#x5176;&#x7136;&#x800C;&#x4E0D;&#x77E5;&#x5176;&#x6240;&#x4EE5;&#x7136;&#x3002;&#x6240;&#x4EE5;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x8BE6;&#x7EC6;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;ajax&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x548C;&#x5C01;&#x88C5;ajax&#x7684;&#x5173;&#x952E;&#x6B65;&#x9AA4;&#x3002;</p><p>ajax&#x7684;&#x6838;&#x5FC3;&#x662F;XMLHttpRequest&#x5BF9;&#x8C61;&#x3002;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5148;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;XMLHTTPRequest&#x5BF9;&#x8C61;<code>var xhr = new XMLHttpRequest();</code>&#x3002;</p><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x672C;&#x6587;&#x6240;&#x63D0;&#x53CA;&#x7684;&#x5185;&#x5BB9;&#x4E0D;&#x517C;&#x5BB9;&#x53E4;&#x8001;&#x7684;IE&#xFF0C;&#x6709;&#x60F3;&#x4E86;&#x89E3;&#x7684;&#x540C;&#x5B66;&#x81EA;&#x884C;&#x67E5;&#x9605;ActiveXObject&#x76F8;&#x5173;&#x5185;&#x5BB9;&#x3002;</blockquote><hr><h2 id="articleHeader0">XMLHttpRequest</h2><p>&#x5728;&#x4F7F;&#x7528;XMLHttpRequest&#x5BF9;&#x8C61;&#x7684;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x8981;&#x8C03;&#x7528;open&#x65B9;&#x6CD5;&#x6765;&#x521D;&#x59CB;&#x5316;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#xFF0C;<code>xhr.open(&apos;get&apos;,&apos;/test&apos;,true)</code>&#xFF0C;&#x867D;&#x7136;&#x540D;&#x5B57;&#x53EB;open&#xFF0C;&#x4F46;&#x662F;&#x6B64;&#x65F6;&#x8BF7;&#x6C42;&#x8FD8;&#x5E76;&#x6CA1;&#x6709;&#x53D1;&#x9001;&#x3002;</p><p><strong>open(method, url[, async, username, password])</strong></p><ul><li>method:&#x8BF7;&#x6C42;&#x7C7B;&#x578B;&#xFF0C;&#x4F8B;&#x5982;GET&#xFF0C;POST&#x7B49;</li><li>url:&#x8BF7;&#x6C42;&#x5730;&#x5740;&#xFF08;&#x8FD9;&#x91CC;&#x6709;&#x540C;&#x6E90;&#x9650;&#x5236;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x770B;&#x5230;&#x7684;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x5566;&#xFF09;</li><li>async:&#x662F;&#x5426;&#x53D1;&#x9001;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x3002;&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;true&#x3002;</li><li>username&amp;password:&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x6388;&#x6743;&#x9A8C;&#x8BC1;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4E0D;&#x8FD9;&#x4E48;&#x7528;,&#x4F7F;&#x7528;&#x540E;&#x8BF7;&#x6C42;&#x53D8;&#x6210;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x4E86;,http(s)://username:password@url&#x3002;</li></ul><blockquote>&#x5982;&#x679C;&#x8C03;&#x7528;&#x4E86;open&#x65B9;&#x6CD5;&#x540E;&#x518D;&#x6B21;&#x5BF9;&#x5B83;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x76F8;&#x5F53;&#x4E8E;&#x8C03;&#x7528;&#x4E86;abort&#x65B9;&#x6CD5;&#xFF0C;abort&#x65B9;&#x6CD5;&#x6211;&#x4EEC;&#x5728;&#x540E;&#x9762;&#x4ECB;&#x7ECD;&#x3002;</blockquote><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x4E3A;&#x4E3A;&#x8BF7;&#x6C42;&#x7ED1;&#x5B9A;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x5566;&#x3002;&#x5E38;&#x7528;&#x7684;&#x64CD;&#x4F5C;&#x6709;&#x5982;&#x4E0B;&#x51E0;&#x4E2A;&#xFF1A;</p><p><strong>setRequestHeader(key, value)</strong></p><p>&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x5934;&#x5185;&#x5BB9;&#x3002;</p><ul><li>key:&#x8981;&#x8BBE;&#x7F6E;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#x540D;&#x79F0;</li><li>value:&#x5BF9;&#x5E94;&#x8BF7;&#x6C42;&#x5934;&#x7684;&#x503C;</li></ul><p><strong>overrideMimeType(type)</strong></p><p>&#x91CD;&#x5199;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;MIME&#x7C7B;&#x578B;&#x3002;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x544A;&#x8BC9;&#x670D;&#x52A1;&#x5668;&#x4F60;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3002;</p><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x4EE5;&#x4E0A;&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;&#x5FC5;&#x987B;&#x5B9A;&#x4E49;&#x5728;send&#x65B9;&#x6CD5;&#x4E4B;&#x524D;&#x3002;&#x5426;&#x5219;&#xFF0C;&#x5C31;&#x62FF;setRequestHeader&#x6765;&#x8BF4;&#xFF0C;&#x4F60;&#x90FD;&#x628A;&#x8BF7;&#x6C42;&#x53D1;&#x51FA;&#x53BB;&#x4E86;&#x518D;&#x8BBE;&#x7F6E;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#xFF1F;</blockquote><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8C03;&#x7528;send &#x65B9;&#x6CD5;&#x6765;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x4E86;&#xFF0C;<code>xhr.send(null)</code>&#x3002;</p><p><strong>send(data)</strong></p><p>&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x540C;&#x6B65;&#x8BF7;&#x6C42;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x963B;&#x585E;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x76F4;&#x81F3;&#x6536;&#x5230;&#x670D;&#x52A1;&#x5668;&#x54CD;&#x5E94;&#x624D;&#x4F1A;&#x7EE7;&#x7EED;&#x3002;</p><ul><li>data:&#x53D1;&#x9001;&#x7ED9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x6570;&#x636E;&#x3002;&#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x4E0D;&#x540C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x5373;&#x4F7F;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x4F20;&#x6570;&#x636E;&#xFF0C;&#x4E5F;&#x9700;&#x8981;&#x4F20;&#x5165;&#x53C2;&#x6570;null&#x3002;</li></ul><p><strong>readyStateChanhe()</strong></p><p>&#x6BCF;&#x6B21;readyState&#x7684;&#x503C;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;</p><p><strong>getResponseHeader(name)</strong></p><p>&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x54CD;&#x5E94;&#x5934;&#x90E8;&#x7684;&#x503C;&#xFF0C;&#x53C2;&#x6570;&#x662F;&#x54CD;&#x5E94;&#x5934;&#x90E8;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#x3002;</p><p><strong>getAllResponseHeaders()</strong></p><p>&#x83B7;&#x53D6;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x7684;&#x6240;&#x6709;HTTP&#x54CD;&#x5E94;&#x7684;&#x5934;&#x90E8;&#x3002;</p><p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7A7F;&#x63D2;&#x51E0;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;readyState&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x8868;&#x660E;&#x4E86;&#x8BF7;&#x6C42;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x4F34;&#x968F;HTTP&#x8BF7;&#x6C42;&#x7684;&#x6574;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5B83;&#x7684;&#x503C;&#x8868;&#x660E;&#x6B64;&#x65F6;&#x8BF7;&#x6C42;&#x6240;&#x5904;&#x7684;&#x9636;&#x6BB5;&#xFF0C;&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong>readyState</strong></p><table><thead><tr><th>&#x6570;&#x503C;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>0</td><td>&#x521D;&#x59CB;&#x5316;,open()&#x5C1A;&#x672A;&#x8C03;&#x7528;</td></tr><tr><td>1</td><td>open()&#x5DF2;&#x7ECF;&#x8C03;&#x7528;&#xFF0C;&#x4F46;&#x662F;send&#x672A;&#x8C03;&#x7528;</td></tr><tr><td>2</td><td>&#x5DF2;&#x83B7;&#x53D6;&#x5230;&#x8FD4;&#x56DE;&#x5934;&#x4FE1;&#x606F;</td></tr><tr><td>3</td><td>&#x6B63;&#x5728;&#x4E0B;&#x8F7D;&#x8FD4;&#x56DE;&#x4F53;&#x4FE1;&#x606F;</td></tr><tr><td>4</td><td>&#x8BF7;&#x6C42;&#x5B8C;&#x6210;</td></tr></tbody></table><p>&#x8FD8;&#x6709;&#x51E0;&#x4E2A;&#x8F83;&#x4E3A;&#x5E38;&#x7528;&#x7684;&#x5C5E;&#x6027;</p><table><thead><tr><th>&#x540D;&#x79F0;</th><th>&#x542B;&#x4E49;</th></tr></thead><tbody><tr><td>responseText</td><td>&#x54CD;&#x5E94;&#x7684;&#x6587;&#x672C;</td></tr><tr><td>status</td><td>&#x54CD;&#x5E94;&#x7684;&#x72B6;&#x6001;&#x7801;</td></tr><tr><td>statusText</td><td>&#x54CD;&#x5E94;&#x7684;&#x72B6;&#x6001;&#x4FE1;&#x606F;</td></tr><tr><td>responseXML</td><td>&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x662F;&#x201C;text/xml&#x201D;&#x6216;&#x8005;&#x662F;&#x201C;application/xml&#x201D;&#x683C;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x7684;XMLDOM&#x6587;&#x6863;&#x3002;</td></tr></tbody></table><p>&#x6211;&#x4EEC;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x505A;&#x4E2A;&#x6D4B;&#x8BD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
console.log(xhr.readyState)
xhr.onreadystatechange = function(){
    console.log(&apos;------&apos;)
    console.log(&apos;readyState:&apos; + xhr.readyState)
    console.log(&apos;ResponseHeaders:&apos; + xhr.getAllResponseHeaders())
    console.log(&apos;ResponseText:&apos; + xhr.responseText.length)
    console.log(&apos;------&apos;)
}
xhr.open(&apos;get&apos;,&apos;/&apos;)
xhr.send(null)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-built_in">console</span>.log(xhr.readyState)
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;------&apos;</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;readyState:&apos;</span> + xhr.readyState)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ResponseHeaders:&apos;</span> + xhr.getAllResponseHeaders())
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ResponseText:&apos;</span> + xhr.responseText.length)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;------&apos;</span>)
}
xhr.open(<span class="hljs-string">&apos;get&apos;</span>,<span class="hljs-string">&apos;/&apos;</span>)
xhr.send(<span class="hljs-literal">null</span>)</code></pre><p>&#x4E0B;&#x56FE;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x89C2;&#x7684;&#x770B;&#x5230;&#x5728;&#x521B;&#x5EFA;&#x4E86;XMLHttpRequest&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;readyState&#x7684;&#x503C;&#x4E3A;0&#x3002;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/7/1/164568c3294df34f?w=1076&amp;h=100&amp;f=png&amp;s=23175" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/7/1/164568c3294df34f?w=1076&amp;h=100&amp;f=png&amp;s=23175" alt="image" title="image" style="cursor:pointer"></span><br>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E86;onreadystatechange&#x51FD;&#x6570;&#xFF0C;&#x8BA9;&#x5176;&#x6253;&#x5370;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x8C03;&#x7528;open&#x65B9;&#x6CD5;&#xFF0C;&#x6B64;&#x65F6;readyState&#x53D8;&#x4E3A;1&#x3002;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/7/1/164568c32ba2f06b?w=1208&amp;h=584&amp;f=png&amp;s=146147" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/7/1/164568c32ba2f06b?w=1208&amp;h=584&amp;f=png&amp;s=146147" alt="image" title="image" style="cursor:pointer"></span><br>&#x6700;&#x540E;&#x6211;&#x4EEC;&#x8C03;&#x7528;send&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7ECF;&#x5386;&#x4E86;&#x5982;&#x4E0B;&#x8FC7;&#x7A0B;&#xFF1A;</p><ol><li>send&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x4E4B;&#x540E;&#xFF0C;readyState&#x53D8;&#x4E3A;2&#xFF0C;&#x6B64;&#x65F6;responseHeader&#x5DF2;&#x7ECF;&#x83B7;&#x53D6;&#x5230;&#x4E86;&#xFF0C;responseText&#x4E3A;&#x7A7A;&#xFF1B;</li><li>&#x54CD;&#x5E94;&#x6570;&#x636E;&#x5F00;&#x59CB;&#x4E0B;&#x8F7D;&#xFF0C;readyState&#x53D8;&#x4E3A;3</li><li>&#x54CD;&#x5E94;&#x6570;&#x636E;&#x4E0B;&#x8F7D;&#x7ED3;&#x675F;&#xFF0C;readyState&#x53D8;&#x4E3A;4.&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x6B64;&#x65F6;responseText&#x7684;&#x957F;&#x5EA6;&#x6BD4;&#x4E4B;&#x524D;&#x957F;&#x3002;</li></ol><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/7/1/164568c33723e7c7?w=1404&amp;h=1312&amp;f=png&amp;s=302411" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/7/1/164568c33723e7c7?w=1404&amp;h=1312&amp;f=png&amp;s=302411" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p><strong>abort()</strong></p><p>&#x53D6;&#x6D88;&#x54CD;&#x5E94;&#xFF0C;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x7EC8;&#x6B62;&#x5DF2;&#x53D1;&#x9001;&#x7684;&#x8BF7;&#x6C42;&#x3002;&#x6211;&#x4EEC;&#x5C1D;&#x8BD5;&#x5728;&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x6700;&#x540E;&#x52A0;&#x4E00;&#x53E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.abort();
console.log(xhr.readyState)&#xFF1B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">xhr.abort();
<span class="hljs-built_in">console</span>.log(xhr.readyState)&#xFF1B;</code></pre><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/7/1/164568c32228eed3?w=2002&amp;h=148&amp;f=png&amp;s=31958" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/7/1/164568c32228eed3?w=2002&amp;h=148&amp;f=png&amp;s=31958" alt="image" title="image" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/7/1/164568c32a14efa7?w=880&amp;h=452&amp;f=png&amp;s=44447" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/7/1/164568c32a14efa7?w=880&amp;h=452&amp;f=png&amp;s=44447" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;send&#x6267;&#x884C;&#x4EE5;&#x540E;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x53BB;&#x5C1D;&#x8BD5;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x53D6;&#x6D88;&#x6389;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x6211;&#x4EEC;&#x53D1;&#x73B0;abort&#x4F1A;&#x5C06;readyState&#x7684;&#x503C;&#x7F6E;&#x4E3A;0&#x3002;</p><p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;XMLHttpRequest&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x5C5E;&#x6027;withCredentials&#xFF0C;cookie&#x5728;&#x540C;&#x57DF;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x643A;&#x5E26;&#x5728;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;&#xFF0C;&#x4F46;&#x662F;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x5219;&#x4E0D;&#x4F1A;&#xFF0C;&#x9664;&#x975E;&#x628A;withCredentials&#x7684;&#x503C;&#x8BBE;&#x4E3A;true&#xFF08;&#x9ED8;&#x8BA4;&#x4E3A;false&#xFF09;&#x3002;&#x540C;&#x65F6;&#x9700;&#x8981;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x54CD;&#x5E94;&#x5934;&#x90E8;&#x4E2D;&#x8BBE;&#x7F6E;Access-Control-Allow-Credentials:true&#x3002;&#x4E0D;&#x4EC5;&#x5982;&#x6B64;Access-Control-Allow-Origin&#x7684;&#x503C;&#x4E5F;&#x5FC5;&#x987B;&#x4E3A;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;&#x57DF;&#x540D;&#x3002;</p><hr><h2 id="articleHeader1">&#x5C01;&#x88C5;</h2><p>&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x7EC8;&#x4E8E;&#x8BB2;&#x5B8C;&#x4E86;XMLHttpRequest&#x7684;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x6982;&#x5FF5;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5C1D;&#x8BD5;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x652F;&#x6301;get&#x548C;post&#x7684;&#x7B80;&#x6613;jax&#x8BF7;&#x6C42;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(url, option){
    option = option || {};
    var method = (option.method || &apos;GET&apos;).toUpperCase(),
        async = option.async === undefined ? true : option.async,
        params = handleParams(option.data);
    var xhr = new XMLHttpRequest();
    if(async){
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
               callback(option,xhr);
            }
        };
    }
    if (method === &apos;GET&apos;){
        xhr.open(&quot;GET&quot;,url + &apos;?&apos; + params, async);
        xhr.send(null)
    }else if (method === &apos;POST&apos;){
        xhr.open(&apos;POST&apos;, url, async);
        xhr.setRequestHeader(&apos;Content-Type&apos;,&apos;application/x-www-form-urlencoded&apos;);
        xhr.send(params);
    }
    if(!async){
        callback(option,xhr);
    }
    function callback(opt,obj){
        var status = obj.status;
        if (status &gt;= 200 &amp;&amp; status &lt; 300 ){
            opt.success &amp;&amp; opt.success(obj.responseText,obj.responseXML);
        }else{
            opt.fail &amp;&amp; opt.fail(status);
        }
    }
    function handleParams(data) {  
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + &apos;=&apos; + encodeURIComponent(data[i]));
        }
        return arr.join(&apos;&amp;&apos;);
    }
}
//  &#x6D4B;&#x8BD5;&#x8C03;&#x7528;
ajax(&apos;/xxx&apos;,{
    method:&apos;POST&apos;,
    data:{
        key: &apos;test&apos;
    },
    success:function(){
        console.log(&apos;success&apos;)
    },
    fail:function(){
        console.log(&apos;fail&apos;)
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url, option</span>)</span>{
    option = option || {};
    <span class="hljs-keyword">var</span> method = (option.method || <span class="hljs-string">&apos;GET&apos;</span>).toUpperCase(),
        <span class="hljs-keyword">async</span> = option.async === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">true</span> : option.async,
        params = handleParams(option.data);
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">async</span>){
        xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>){
               callback(option,xhr);
            }
        };
    }
    <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&apos;GET&apos;</span>){
        xhr.open(<span class="hljs-string">&quot;GET&quot;</span>,url + <span class="hljs-string">&apos;?&apos;</span> + params, <span class="hljs-keyword">async</span>);
        xhr.send(<span class="hljs-literal">null</span>)
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&apos;POST&apos;</span>){
        xhr.open(<span class="hljs-string">&apos;POST&apos;</span>, url, <span class="hljs-keyword">async</span>);
        xhr.setRequestHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>,<span class="hljs-string">&apos;application/x-www-form-urlencoded&apos;</span>);
        xhr.send(params);
    }
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">async</span>){
        callback(option,xhr);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params">opt,obj</span>)</span>{
        <span class="hljs-keyword">var</span> status = obj.status;
        <span class="hljs-keyword">if</span> (status &gt;= <span class="hljs-number">200</span> &amp;&amp; status &lt; <span class="hljs-number">300</span> ){
            opt.success &amp;&amp; opt.success(obj.responseText,obj.responseXML);
        }<span class="hljs-keyword">else</span>{
            opt.fail &amp;&amp; opt.fail(status);
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleParams</span>(<span class="hljs-params">data</span>) </span>{  
        <span class="hljs-keyword">var</span> arr = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> data) {
            arr.push(<span class="hljs-built_in">encodeURIComponent</span>(i) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[i]));
        }
        <span class="hljs-keyword">return</span> arr.join(<span class="hljs-string">&apos;&amp;&apos;</span>);
    }
}
<span class="hljs-comment">//  &#x6D4B;&#x8BD5;&#x8C03;&#x7528;</span>
ajax(<span class="hljs-string">&apos;/xxx&apos;</span>,{
    <span class="hljs-attr">method</span>:<span class="hljs-string">&apos;POST&apos;</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">key</span>: <span class="hljs-string">&apos;test&apos;</span>
    },
    <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;success&apos;</span>)
    },
    <span class="hljs-attr">fail</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fail&apos;</span>)
    }
});</code></pre><h2 id="articleHeader2">&#x5C0F;&#x7ED3;</h2><p>&#x5176;&#x5B9E;ajax&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x5E76;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x590D;&#x6742;&#x7684;&#x662F;&#x5BB9;&#x9519;&#x3001;&#x517C;&#x5BB9;&#x6027;&#x7B49;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x5E93;&#x6216;&#x8005;&#x6846;&#x67B6;&#x63D0;&#x4F9B;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6F0F;&#x6D1E;&#x3002;</p><hr><h3 id="articleHeader3">&#x8865;&#x5145;</h3><p>&#x611F;&#x8C22;<a href="https://segmentfault.com/u/xiabibi">@&#x867E;&#x54D4;&#x54D4;</a>&#x7684;&#x63D0;&#x95EE;&#xFF0C;&#x8FD9;&#x91CC;&#x505A;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x8865;&#x5145;&#x8BF4;&#x660E;&#x3002;</p><blockquote>async&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x5E03;&#x5C14;&#x503C;&#x53C2;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;true,&#x610F;&#x5473;&#x7740;&#x662F;&#x5426;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x503C;&#x4E3A;false,&#x5219;send()&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x8FD4;&#x56DE;&#x4EFB;&#x4F55;&#x4E1C;&#x897F;&#xFF0C;&#x76F4;&#x5230;&#x63A5;&#x53D7;&#x5230;&#x4E86;&#x670D;&#x52A1;&#x5668;&#x7684;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x3002;&#x5982;&#x679C;&#x4E3A;&#x503C;&#x4E3A;true&#xFF0C;&#x4E00;&#x4E2A;&#x5BF9;&#x5F00;&#x53D1;&#x8005;&#x900F;&#x660E;&#x7684;&#x901A;&#x77E5;&#x4F1A;&#x53D1;&#x9001;&#x5230;&#x76F8;&#x5173;&#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x8005;&#x3002;&#x8FD9;&#x4E2A;&#x503C;&#x5FC5;&#x987B;&#x662F;true,&#x5982;&#x679C;multipart &#x5C5E;&#x6027;&#x662F;true&#xFF0C;&#x5426;&#x5219;&#x5C06;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x610F;&#x5916;&#x3002;</blockquote><p>&#x6839;&#x636E;&#x6211;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x5F53;async&#x4E3A;false&#x7684;&#x65F6;&#x5019;&#xFF0C;readyState&#x4F1A;&#x5728;send&#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x76F4;&#x63A5;&#x7531;1&#x53D8;&#x6210;4&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5F02;&#x6B65;&#x6A21;&#x5F0F;,send&#x65B9;&#x6CD5;&#x4F1A;&#x7ACB;&#x523B;&#x8FD4;&#x56DE;&#x3002;&#x540C;&#x6B65;&#x6A21;&#x5F0F;&#x4E0B;,&#x53EA;&#x6709;&#x54CD;&#x5E94;&#x5B8C;&#x5168;&#x63A5;&#x53D7;&#x540E;,send&#x624D;&#x4F1A;&#x8FD4;&#x56DE;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x7531;&#x4E8E;&#x540C;&#x6B65;&#x6A21;&#x5F0F;&#x4F1A;&#x963B;&#x585E;&#xFF0C;&#x8F83;&#x65B0;&#x7248;&#x672C;&#x7684;Chrome&#x5728;&#x4E3B;&#x7EBF;&#x7A0B;&#x4E0A;&#x7684;&#x540C;&#x6B65;&#x8BF7;&#x6C42;&#x5DF2;&#x88AB;&#x5F03;&#x7528;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
刨根问底ajax原理与封装

## 原文链接
[https://segmentfault.com/a/1190000015443721](https://segmentfault.com/a/1190000015443721)


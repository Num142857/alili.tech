---
title: 'JS传参技巧总结' 
date: 2018-11-17 2:30:12
hidden: true
slug: 1dmcx4slghq
categories: reprint
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x9690;&#x5F0F;&#x521B;&#x5EFA; html &#x6807;&#x7B7E;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;hidden&quot; name=&quot;tc_id&quot; value=&quot;"{{"tc_id"}}"&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">&lt;input type=<span class="hljs-string">&quot;hidden&quot;</span> name=<span class="hljs-string">&quot;tc_id&quot;</span> value=<span class="hljs-string">&quot;"{{"tc_id"}}"&quot;</span>&gt;</code></pre><blockquote>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4E00;&#x822C;&#x914D;&#x5408;ajax&#xFF0C;&#x4E0A;&#x9762;&#x7684;value&#x4F7F;&#x7528;&#x4E86;&#x6A21;&#x677F;&#x5F15;&#x64CE;</blockquote><h2 id="articleHeader1">2.window[&apos;data&apos;]</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window[&apos;name&apos;] = &quot;the window object&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">window</span>[<span class="hljs-string">&apos;name&apos;</span>] = <span class="hljs-string">&quot;the window object&quot;</span>;</code></pre><h2 id="articleHeader2">3.&#x4F7F;&#x7528;localStorage&#xFF0C;cookie&#x7B49;&#x5B58;&#x50A8;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.localStorage.setItem(&quot;name&quot;, &quot;xiaoyueyue&quot;);
window.localStorage.getItem(&quot;name&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;xiaoyueyue&quot;</span>);
<span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-string">&quot;name&quot;</span>)</code></pre><blockquote>&#x7279;&#x70B9;&#xFF1A;cookie&#xFF0C;localStorage&#xFF0C;sessionStorage&#xFF0C;indexDB</blockquote><table><thead><tr><th align="center">&#x7279;&#x6027;</th><th align="center">cookie</th><th align="center">localStorage</th><th align="center">sessionStorage</th><th align="center">indexDB</th></tr></thead><tbody><tr><td align="center">&#x6570;&#x636E;&#x751F;&#x547D;&#x5468;&#x671F;</td><td align="center">&#x4E00;&#x822C;&#x7531;&#x670D;&#x52A1;&#x5668;&#x751F;&#x6210;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x8FC7;&#x671F;&#x65F6;&#x95F4;</td><td align="center">&#x9664;&#x975E;&#x88AB;&#x6E05;&#x7406;&#xFF0C;&#x5426;&#x5219;&#x4E00;&#x76F4;&#x5B58;&#x5728;</td><td align="center">&#x9875;&#x9762;&#x5173;&#x95ED;&#x5C31;&#x6E05;&#x7406;</td><td align="center">&#x9664;&#x975E;&#x88AB;&#x6E05;&#x7406;&#xFF0C;&#x5426;&#x5219;&#x4E00;&#x76F4;&#x5B58;&#x5728;</td></tr><tr><td align="center">&#x6570;&#x636E;&#x5B58;&#x50A8;&#x5927;&#x5C0F;</td><td align="center">4K</td><td align="center">5M</td><td align="center">5M</td><td align="center">&#x65E0;&#x9650;</td></tr><tr><td align="center">&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x901A;&#x4FE1;</td><td align="center">&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x643A;&#x5E26;&#x5728; header &#x4E2D;&#xFF0C;&#x5BF9;&#x4E8E;&#x8BF7;&#x6C42;&#x6027;&#x80FD;&#x5F71;&#x54CD;</td><td align="center">&#x4E0D;&#x53C2;&#x4E0E;</td><td align="center">&#x4E0D;&#x53C2;&#x4E0E;</td><td align="center">&#x4E0D;&#x53C2;&#x4E0E;</td></tr></tbody></table><p>&#x4ECE;&#x4E0A;&#x8868;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>cookie</code> &#x5DF2;&#x7ECF;&#x4E0D;&#x5EFA;&#x8BAE;&#x7528;&#x4E8E;&#x5B58;&#x50A8;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5927;&#x91CF;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x9700;&#x6C42;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>localStorage</code> &#x548C; <code>sessionStorage</code> &#x3002;&#x5BF9;&#x4E8E;&#x4E0D;&#x600E;&#x4E48;&#x6539;&#x53D8;&#x7684;&#x6570;&#x636E;&#x5C3D;&#x91CF;&#x4F7F;&#x7528; <code>localStorage</code> &#x5B58;&#x50A8;&#xFF0C;&#x5426;&#x5219;&#x53EF;&#x4EE5;&#x7528; <code>sessionStorage</code> &#x5B58;&#x50A8;&#x3002;</p><blockquote>&#x6CE8;&#x610F;&#x70B9;:&#x5B58;&#x50A8;<code>object</code>&#x7C7B;&#x578B;&#x6570;&#x636E;&#xFF0C;&#x6B64;&#x6DF1;&#x62F7;&#x8D1D;&#x65B9;&#x6CD5;&#x4F1A;&#x5FFD;&#x7565;&#x6389;&#x51FD;&#x6570;&#x548C; <code>undefined</code></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var obj = {
    type: undefined,
    text: &apos;xiaoyueyue&apos;,
    methord: function () {
      alert(&quot;I am an methord&quot;)
    }
  }

  localStorage.setItem(&apos;data&apos;, JSON.stringify(obj));
  console.log(JSON.parse(localStorage.getItem(&apos;data&apos;))); // {text: &quot;xiaoyueyue&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">type</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;xiaoyueyue&apos;</span>,
    <span class="hljs-attr">methord</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      alert(<span class="hljs-string">&quot;I am an methord&quot;</span>)
    }
  }

  localStorage.setItem(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-built_in">JSON</span>.stringify(obj));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">&apos;data&apos;</span>))); <span class="hljs-comment">// {text: &quot;xiaoyueyue&quot;}</span></code></pre><h2 id="articleHeader3">4.&#x83B7;&#x53D6;&#x5730;&#x5740;&#x680F;&#x65B9;&#x6CD5;</h2><ol><li>&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7684;&#x65B9;&#x6CD5;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parseParam(url) {
  var paramArr = decodeURI(url).split(&quot;?&quot;)[1].split(&quot;&amp;&quot;),
    obj = {};
  for (var i = 0; i &lt; paramArr.length; i++) {
    var item = paramArr[i];
    if (item.indexOf(&quot;=&quot;) != -1) {
      var tmp = item.split(&quot;=&quot;);
      obj[tmp[0]] = tmp[1];
    } else {
      obj[item] = true;
    }
  }
  return obj;

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseParam</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">var</span> paramArr = <span class="hljs-built_in">decodeURI</span>(url).split(<span class="hljs-string">&quot;?&quot;</span>)[<span class="hljs-number">1</span>].split(<span class="hljs-string">&quot;&amp;&quot;</span>),
    obj = {};
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; paramArr.length; i++) {
    <span class="hljs-keyword">var</span> item = paramArr[i];
    <span class="hljs-keyword">if</span> (item.indexOf(<span class="hljs-string">&quot;=&quot;</span>) != <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">var</span> tmp = item.split(<span class="hljs-string">&quot;=&quot;</span>);
      obj[tmp[<span class="hljs-number">0</span>]] = tmp[<span class="hljs-number">1</span>];
    } <span class="hljs-keyword">else</span> {
      obj[item] = <span class="hljs-literal">true</span>;
    }
  }
  <span class="hljs-keyword">return</span> obj;

}</code></pre><p>2.&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GetQueryString(name) {
var reg = new RegExp(&quot;(^|&amp;)&quot; + name + &quot;=([^&amp;]*)(&amp;|$)&quot;);
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]); return null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetQueryString</span>(<span class="hljs-params">name</span>) </span>{
<span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&quot;(^|&amp;)&quot;</span> + name + <span class="hljs-string">&quot;=([^&amp;]*)(&amp;|$)&quot;</span>);
<span class="hljs-keyword">var</span> r = <span class="hljs-built_in">window</span>.location.search.substr(<span class="hljs-number">1</span>).match(reg);
<span class="hljs-keyword">if</span> (r != <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-built_in">unescape</span>(r[<span class="hljs-number">2</span>]); <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}</code></pre><h2 id="articleHeader4">5.&#x6807;&#x7B7E;&#x7ED1;&#x5B9A;&#x51FD;&#x6570;&#x4F20;&#x53C2;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--base--&gt;
 &lt;button id=&quot;test1&quot; onclick=&quot;alert(id)&quot;&gt;test1&lt;/button&gt;
 
&lt;!--&#x9AD8;&#x7EA7;--&gt;
&lt;button id=&quot;test&quot; name=&quot;123&quot; yue=&quot;xiaoyueyue&quot; friend=&quot;heizi&quot; onclick=&quot;console.log(this.getAttribute(&apos;yue&apos;),this.getAttribute(&apos;friend&apos;))&quot;&gt;test&lt;/button&gt;
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--base--&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test1&quot;</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;alert(id)&quot;</span>&gt;</span>test1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-comment">&lt;!--&#x9AD8;&#x7EA7;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;123&quot;</span> <span class="hljs-attr">yue</span>=<span class="hljs-string">&quot;xiaoyueyue&quot;</span> <span class="hljs-attr">friend</span>=<span class="hljs-string">&quot;heizi&quot;</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;console.log(this.getAttribute(&apos;yue&apos;),this.getAttribute(&apos;friend&apos;))&quot;</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 </code></pre><h3 id="articleHeader5">this&#x62D3;&#x5C55;</h3><p>&#x4F7F;&#x7528;this&#x4F20;&#x53C2;&#xFF0C;&#x5728;&#x4F7F;&#x7528;art-template&#x4E2D;&#x7422;&#x78E8;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x53EA;&#x4F20;&#x9012;&#x4E00;&#x4E2A;id&#x62FC;&#x63A5;&#x6210;&#x597D;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x4E86;&#xFF01;happy&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var box = document.createElement(&quot;div&quot;);
    box.innerHTML =
      &quot;&lt;button id=&apos;1&apos; data-name=&apos;xiaoyueyue&apos; data-age=&apos;25&apos; data-friend=&apos;heizi&apos; onclick=&apos;alertInfo(this.dataset)&apos;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&quot;;
    document.body.appendChild(box);

    // name,age,friend
    function alertInfo(data) {
      alert(&apos;&#x5927;&#x5BB6;&#x597D;,&#x6211;&#x662F;&apos; + data.name + &apos;, &#x6211;&#x4ECA;&#x5E74;&apos; + data.age + &apos;&#x5C81;&#x4E86;&#xFF0C;&#x6211;&#x7684;&#x597D;&#x670B;&#x53CB;&#x662F;&apos; + data.friend + &apos; !&apos;)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;div&quot;</span>);
    box.innerHTML =
      <span class="hljs-string">&quot;&lt;button id=&apos;1&apos; data-name=&apos;xiaoyueyue&apos; data-age=&apos;25&apos; data-friend=&apos;heizi&apos; onclick=&apos;alertInfo(this.dataset)&apos;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&quot;</span>;
    <span class="hljs-built_in">document</span>.body.appendChild(box);

    <span class="hljs-comment">// name,age,friend</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">alertInfo</span>(<span class="hljs-params">data</span>) </span>{
      alert(<span class="hljs-string">&apos;&#x5927;&#x5BB6;&#x597D;,&#x6211;&#x662F;&apos;</span> + data.name + <span class="hljs-string">&apos;, &#x6211;&#x4ECA;&#x5E74;&apos;</span> + data.age + <span class="hljs-string">&apos;&#x5C81;&#x4E86;&#xFF0C;&#x6211;&#x7684;&#x597D;&#x670B;&#x53CB;&#x662F;&apos;</span> + data.friend + <span class="hljs-string">&apos; !&apos;</span>)
    }</code></pre><blockquote>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF1A;&#x5B58;&#x50A8;&#x7684;data&#x2014;&#x542B;&#x6709;&#x5927;&#x5199;&#x7684;&#x5355;&#x8BCD; =&#x300B;&#x8FD9;&#x91CC;&#x4F1A;&#x7EDF;&#x4E00;&#x8F6C;&#x5316;&#x4E3A;&#x5C0F;&#x5199;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;data-orderId = &#x201C;2a34fb64a13211e8a0f00050568b2fdd&#x201D;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x53D6;&#x503C;&#x7684;&#x65F6;&#x5019;&#x4E3A;<code>this.dataset.orderid</code>;</blockquote><h3 id="articleHeader6">event</h3><p>&#x65E2;&#x7136;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;this&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x4E8B;&#x4EF6;&#x5F53;&#x4E2D;<code>event.target</code>&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF1A;</p><blockquote>&#x6839;&#x636E; class &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7684;&#x7D22;&#x5F15;&#x503C;&#xFF0C;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x4E3A; event&#x5BF9;&#x8C61;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var getIndexByClass =  function (param) {
    var element = param.classname ? param : param.target;
    var className = element.classname;
    var domArr = Array.prototype.slice.call(document.querySelectorAll(&apos;.&apos; + className));
    for (var index = 0; index &lt; domArr.length; index++) {
      if (domArr[index] === element) {
        return index;
      }
    }
    return -1;
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> getIndexByClass =  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param</span>) </span>{
    <span class="hljs-keyword">var</span> element = param.classname ? param : param.target;
    <span class="hljs-keyword">var</span> className = element.classname;
    <span class="hljs-keyword">var</span> domArr = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;.&apos;</span> + className));
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; domArr.length; index++) {
      <span class="hljs-keyword">if</span> (domArr[index] === element) {
        <span class="hljs-keyword">return</span> index;
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
  },</code></pre><h2 id="articleHeader7">6.HTML5 data-* &#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button data-name=&quot;xiaoyueyue&quot;&gt;&#x70B9;&#x51FB;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-name</span>=<span class="hljs-string">&quot;xiaoyueyue&quot;</span>&gt;</span>&#x70B9;&#x51FB;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var btn = document.querySelector(&quot;button&quot;)
    btn.onclick = function () {
      alert(this.dataset.name)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;button&quot;</span>)
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      alert(<span class="hljs-keyword">this</span>.dataset.name)
    }</code></pre><h2 id="articleHeader8">7.&#x5B57;&#x7B26;&#x4E32;&#x4F20;&#x53C2;</h2><h3 id="articleHeader9">&#x5355;&#x4E2A;&#x53C2;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &apos;xiaoyueyue&apos;,
  age = 25;

var box = document.createElement(&quot;div&quot;);
box.innerHTML = &apos;&lt;button onclick=&quot;alertInfo(\&apos;&apos; + name + &apos;\&apos;)&quot;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&apos;;
document.body.appendChild(box);


// name, age
function alertInfo(name, age, home, friend) {
  alert(&quot;&#x6211;&#x662F;&quot; + name)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;xiaoyueyue&apos;</span>,
  age = <span class="hljs-number">25</span>;

<span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;div&quot;</span>);
box.innerHTML = <span class="hljs-string">&apos;&lt;button onclick=&quot;alertInfo(\&apos;&apos;</span> + name + <span class="hljs-string">&apos;\&apos;)&quot;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&apos;</span>;
<span class="hljs-built_in">document</span>.body.appendChild(box);


<span class="hljs-comment">// name, age</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">alertInfo</span>(<span class="hljs-params">name, age, home, friend</span>) </span>{
  alert(<span class="hljs-string">&quot;&#x6211;&#x662F;&quot;</span> + name)
}</code></pre><h3 id="articleHeader10">&#x591A;&#x53C2;&#x4F20;&#x9012;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var name = &apos;xiaoyueyue&apos;,
      age = &apos;25&apos;,
      home = &apos;shanxi&apos;,
      friend = &apos;heizi&apos;,
      DQ = &quot;&amp;quot;&quot;; // &#x53CC;&#x5F15;&#x53F7;&#x7684;&#x8D85;&#x6587;&#x672C;&#x6807;&#x8BB0;&#x8BED;&#x8A00;

    var params = &quot;&amp;quot;&quot; + name + &quot;&amp;quot;,&amp;quot;&quot; + age + &quot;&amp;quot;,&amp;quot;&quot; + home + &quot;&amp;quot;,&amp;quot;&quot; + friend + &quot;&amp;quot;&quot;;
    var params2 = DQ + name + DQ + &apos;,&apos; + DQ + age + DQ + &apos;,&apos; + DQ + home + DQ + &apos;,&apos; + DQ + friend + DQ;
    var box = document.createElement(&quot;div&quot;);
    box.innerHTML = &quot;&lt;button onclick=&apos;alertInfo(&quot; + params + &quot;)&apos;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&quot;;
    console.log(box)
    document.body.appendChild(box);


    // name, age,home,friend
    function alertInfo(name, age, home, friend) {
      alert(&quot;&#x6211;&#x662F;&quot; + name + &apos;,&apos; + &quot;&#x6211;&#x4ECA;&#x5E74;&quot; + age + &quot;&#x5C81;&#x4E86;&#xFF01;&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;xiaoyueyue&apos;</span>,
      age = <span class="hljs-string">&apos;25&apos;</span>,
      home = <span class="hljs-string">&apos;shanxi&apos;</span>,
      friend = <span class="hljs-string">&apos;heizi&apos;</span>,
      DQ = <span class="hljs-string">&quot;&amp;quot;&quot;</span>; <span class="hljs-comment">// &#x53CC;&#x5F15;&#x53F7;&#x7684;&#x8D85;&#x6587;&#x672C;&#x6807;&#x8BB0;&#x8BED;&#x8A00;</span>

    <span class="hljs-keyword">var</span> params = <span class="hljs-string">&quot;&amp;quot;&quot;</span> + name + <span class="hljs-string">&quot;&amp;quot;,&amp;quot;&quot;</span> + age + <span class="hljs-string">&quot;&amp;quot;,&amp;quot;&quot;</span> + home + <span class="hljs-string">&quot;&amp;quot;,&amp;quot;&quot;</span> + friend + <span class="hljs-string">&quot;&amp;quot;&quot;</span>;
    <span class="hljs-keyword">var</span> params2 = DQ + name + DQ + <span class="hljs-string">&apos;,&apos;</span> + DQ + age + DQ + <span class="hljs-string">&apos;,&apos;</span> + DQ + home + DQ + <span class="hljs-string">&apos;,&apos;</span> + DQ + friend + DQ;
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;div&quot;</span>);
    box.innerHTML = <span class="hljs-string">&quot;&lt;button onclick=&apos;alertInfo(&quot;</span> + params + <span class="hljs-string">&quot;)&apos;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&quot;</span>;
    <span class="hljs-built_in">console</span>.log(box)
    <span class="hljs-built_in">document</span>.body.appendChild(box);


    <span class="hljs-comment">// name, age,home,friend</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">alertInfo</span>(<span class="hljs-params">name, age, home, friend</span>) </span>{
      alert(<span class="hljs-string">&quot;&#x6211;&#x662F;&quot;</span> + name + <span class="hljs-string">&apos;,&apos;</span> + <span class="hljs-string">&quot;&#x6211;&#x4ECA;&#x5E74;&quot;</span> + age + <span class="hljs-string">&quot;&#x5C81;&#x4E86;&#xFF01;&quot;</span>)</code></pre><h3 id="articleHeader11">&#x590D;&#x6742;&#x4F20;&#x53C2;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var data = [
      {
        &quot;name&quot;: &quot;xiaoyueyue&quot;,
        &quot;age&quot;: &quot;25&quot;,
        &quot;home&quot;: &quot;shanxi&quot;,
        &quot;friend&quot;: &quot;heizi&quot;
      }

    ]

    var box = document.createElement(&quot;div&quot;),html =&apos;&apos;;

    for (var i = 0; i &lt; data.length; i++) {
     html += &quot;&lt;button id=&apos;btn&apos;  onclick=&apos;alertInfo(id,\&quot;&quot; + data[i].name + &quot;\&quot;,\&quot;&quot; + data[i].age + &quot;\&quot;,\&quot;&quot; + data[i].home + &quot;\&quot;,\&quot;&quot; + data[i].friend + &quot;\&quot;)&apos;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&quot;;
    }
    box.innerHTML = html;
    document.body.appendChild(box);

    function alertInfo(id, name, age, home, friend) {
      alert(&quot;&#x6211;&#x662F; &quot; + name + &quot; , &quot; + friend + &quot; &#x662F;&#x6211;&#x7684;&#x597D;&#x670B;&#x53CB;&quot;)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">var</span> data = [
      {
        <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;xiaoyueyue&quot;</span>,
        <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-string">&quot;25&quot;</span>,
        <span class="hljs-string">&quot;home&quot;</span>: <span class="hljs-string">&quot;shanxi&quot;</span>,
        <span class="hljs-string">&quot;friend&quot;</span>: <span class="hljs-string">&quot;heizi&quot;</span>
      }

    ]

    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;div&quot;</span>),html =<span class="hljs-string">&apos;&apos;</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++) {
     html += <span class="hljs-string">&quot;&lt;button id=&apos;btn&apos;  onclick=&apos;alertInfo(id,\&quot;&quot;</span> + data[i].name + <span class="hljs-string">&quot;\&quot;,\&quot;&quot;</span> + data[i].age + <span class="hljs-string">&quot;\&quot;,\&quot;&quot;</span> + data[i].home + <span class="hljs-string">&quot;\&quot;,\&quot;&quot;</span> + data[i].friend + <span class="hljs-string">&quot;\&quot;)&apos;&gt;&#x70B9;&#x51FB;&lt;/button&gt;&quot;</span>;
    }
    box.innerHTML = html;
    <span class="hljs-built_in">document</span>.body.appendChild(box);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">alertInfo</span>(<span class="hljs-params">id, name, age, home, friend</span>) </span>{
      alert(<span class="hljs-string">&quot;&#x6211;&#x662F; &quot;</span> + name + <span class="hljs-string">&quot; , &quot;</span> + friend + <span class="hljs-string">&quot; &#x662F;&#x6211;&#x7684;&#x597D;&#x670B;&#x53CB;&quot;</span>)
    }</code></pre><h2 id="articleHeader12">8.arguments</h2><p><code>arguments</code>&#x5BF9;&#x8C61;&#x662F;&#x6240;&#x6709;&#xFF08;&#x975E;&#x7BAD;&#x5934;&#xFF09;&#x51FD;&#x6570;&#x4E2D;&#x90FD;&#x53EF;&#x7528;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;arguments&#x5BF9;&#x8C61;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x5F15;&#x7528;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x6570;&#x7EC4;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button onclick=&quot;fenpei(&apos;f233c7a290ae11e8a0f00050568b2fdd&apos;,&apos;100&apos;,&apos;0&#x53F7; &#x8F66;&#x7528;&#x67F4;&#x6CB9;(&#x2164;)&apos;)&quot;&gt;&#x5206;&#x914D;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;fenpei(&apos;f233c7a290ae11e8a0f00050568b2fdd&apos;,&apos;100&apos;,&apos;0&#x53F7; &#x8F66;&#x7528;&#x67F4;&#x6CB9;(&#x2164;)&apos;)&quot;</span>&gt;</span>&#x5206;&#x914D;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fenpei() {
    var args = Array.prototype.slice.call(arguments);
    alert(&quot;&#x6211;&#x662F;&quot; + args[2] + &quot;&#x6CB9;&#x54C1;&#xFF0C;&#x6570;&#x91CF;&#x4E3A; &quot; + args[1] + &quot; &#x5428;&#xFF0C; id&#x4E3A; &quot; + args[0])

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fenpei</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
    alert(<span class="hljs-string">&quot;&#x6211;&#x662F;&quot;</span> + args[<span class="hljs-number">2</span>] + <span class="hljs-string">&quot;&#x6CB9;&#x54C1;&#xFF0C;&#x6570;&#x91CF;&#x4E3A; &quot;</span> + args[<span class="hljs-number">1</span>] + <span class="hljs-string">&quot; &#x5428;&#xFF0C; id&#x4E3A; &quot;</span> + args[<span class="hljs-number">0</span>])

}</code></pre><h2 id="articleHeader13">9.form&#x8868;&#x5355;</h2><p>&#x501F;&#x52A9;<code>form</code>&#x8868;&#x5355;&#xFF0C;ajax&#x4F20;&#x9012;&#x5E8F;&#x5217;&#x5316;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// form&#x8868;&#x5355;&#x5E8F;&#x5217;&#x5316;&#xFF0C;&#x6458;&#x81EA;JS&#x9AD8;&#x7A0B;
function serialize(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;

    for (i = 0, len = form.elements.length; i &lt; len; i++) {
        field = form.elements[i];

        switch (field.type) {
            case &quot;select-one&quot;:
            case &quot;select-multiple&quot;:

                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j &lt; optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = &quot;&quot;;
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute(&quot;value&quot;) ? option.value : option.text);
                            } else {
                                optValue = (option.attributes[&quot;value&quot;].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + &quot;=&quot; + encodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined: //fieldset
            case &quot;file&quot;: //file input
            case &quot;submit&quot;: //submit button
            case &quot;reset&quot;: //reset button
            case &quot;button&quot;: //custom button
                break;

            case &quot;radio&quot;: //radio button
            case &quot;checkbox&quot;: //checkbox
                if (!field.checked) {
                    break;
                }
                /* falls through */

            default:
                //don&apos;t include form fields without names
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + &quot;=&quot; + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join(&quot;&amp;&quot;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// form&#x8868;&#x5355;&#x5E8F;&#x5217;&#x5316;&#xFF0C;&#x6458;&#x81EA;JS&#x9AD8;&#x7A0B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">serialize</span>(<span class="hljs-params">form</span>) </span>{
    <span class="hljs-keyword">var</span> parts = [],
        field = <span class="hljs-literal">null</span>,
        i,
        len,
        j,
        optLen,
        option,
        optValue;

    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, len = form.elements.length; i &lt; len; i++) {
        field = form.elements[i];

        <span class="hljs-keyword">switch</span> (field.type) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;select-one&quot;</span>:
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;select-multiple&quot;</span>:

                <span class="hljs-keyword">if</span> (field.name.length) {
                    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>, optLen = field.options.length; j &lt; optLen; j++) {
                        option = field.options[j];
                        <span class="hljs-keyword">if</span> (option.selected) {
                            optValue = <span class="hljs-string">&quot;&quot;</span>;
                            <span class="hljs-keyword">if</span> (option.hasAttribute) {
                                optValue = (option.hasAttribute(<span class="hljs-string">&quot;value&quot;</span>) ? option.value : option.text);
                            } <span class="hljs-keyword">else</span> {
                                optValue = (option.attributes[<span class="hljs-string">&quot;value&quot;</span>].specified ? option.value : option.text);
                            }
                            parts.push(<span class="hljs-built_in">encodeURIComponent</span>(field.name) + <span class="hljs-string">&quot;=&quot;</span> + <span class="hljs-built_in">encodeURIComponent</span>(optValue));
                        }
                    }
                }
                <span class="hljs-keyword">break</span>;

            <span class="hljs-keyword">case</span> <span class="hljs-literal">undefined</span>: <span class="hljs-comment">//fieldset</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;file&quot;</span>: <span class="hljs-comment">//file input</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;submit&quot;</span>: <span class="hljs-comment">//submit button</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;reset&quot;</span>: <span class="hljs-comment">//reset button</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;button&quot;</span>: <span class="hljs-comment">//custom button</span>
                <span class="hljs-keyword">break</span>;

            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;radio&quot;</span>: <span class="hljs-comment">//radio button</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;checkbox&quot;</span>: <span class="hljs-comment">//checkbox</span>
                <span class="hljs-keyword">if</span> (!field.checked) {
                    <span class="hljs-keyword">break</span>;
                }
                <span class="hljs-comment">/* falls through */</span>

            <span class="hljs-keyword">default</span>:
                <span class="hljs-comment">//don&apos;t include form fields without names</span>
                <span class="hljs-keyword">if</span> (field.name.length) {
                    parts.push(<span class="hljs-built_in">encodeURIComponent</span>(field.name) + <span class="hljs-string">&quot;=&quot;</span> + <span class="hljs-built_in">encodeURIComponent</span>(field.value));
                }
        }
    }
    <span class="hljs-keyword">return</span> parts.join(<span class="hljs-string">&quot;&amp;&quot;</span>);
}</code></pre><p>&#x6817;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;form id=&quot;formData&quot;&gt;
        &lt;div class=&quot;pop-info&quot;&gt;
            &lt;label for=&quot;ordersaleCode&quot;&gt;&#x8BA2;&#x5355;&#x7F16;&#x53F7;&#xFF1A;&lt;/label&gt;
            &lt;input type=&quot;text&quot; id=&quot;ordersaleCode&quot; name=&quot;ordersaleCode&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x8BA2;&#x5355;&#x7F16;&#x53F7;&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;pop-info&quot;&gt;
            &lt;label for=&quot;extractType&quot;&gt;&#x914D;&#x9001;&#x65B9;&#x5F0F;&#xFF1A;&lt;/label&gt;
            &lt;select id=&quot;extractType&quot; name=&quot;extractType&quot; class=&quot;mySelect&quot;&gt;
                &lt;option value=&quot;0&quot; selected&gt;&#x914D;&#x9001;&lt;/option&gt;
                &lt;option value=&quot;1&quot;&gt;&#x81EA;&#x63D0;&lt;/option&gt;
            &lt;/select&gt;

        &lt;/div&gt;
    &lt;/form&gt;
    &lt;button&gt;&#x83B7;&#x53D6;&#x53C2;&#x6570;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;formData&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pop-info&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;ordersaleCode&quot;</span>&gt;</span>&#x8BA2;&#x5355;&#x7F16;&#x53F7;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;ordersaleCode&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;ordersaleCode&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x8BA2;&#x5355;&#x7F16;&#x53F7;&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pop-info&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;extractType&quot;</span>&gt;</span>&#x914D;&#x9001;&#x65B9;&#x5F0F;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;extractType&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;extractType&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mySelect&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;0&quot;</span> <span class="hljs-attr">selected</span>&gt;</span>&#x914D;&#x9001;<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>&#x81EA;&#x63D0;<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x83B7;&#x53D6;&#x53C2;&#x6570;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.querySelector(&quot;button&quot;).onclick = function () {
        console.log(&apos;param: &apos;+serialize(document.getElementById(&quot;formData&quot;))); // param: ordersaleCode=&amp;extractType=0
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"> <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;button&quot;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;param: &apos;</span>+serialize(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;formData&quot;</span>))); <span class="hljs-comment">// param: ordersaleCode=&amp;extractType=0</span>
    }</code></pre><h2 id="articleHeader14">&#x62D3;&#x5C55;&#x9605;&#x8BFB;</h2><ul><li><a href="https://juejin.im/post/59be85735188256bd733cc10" rel="nofollow noreferrer" target="_blank">JavaScript&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7684;&#x6DF1;&#x5165;&#x7406;&#x89E3;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS传参技巧总结

## 原文链接
[https://segmentfault.com/a/1190000016005163](https://segmentfault.com/a/1190000016005163)


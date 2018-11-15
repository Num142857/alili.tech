---
title: js闭包探秘
hidden: true
categories: reprint
slug: c554210b
date: 2018-11-03 10:03:44
---

{{< raw >}}
<blockquote>&#x8BD1;&#x8005;&#xFF1A;&#x95ED;&#x5305;&#x90FD;&#x88AB;&#x8BA8;&#x8BBA;&#x70C2;&#x4E86;&#xFF0C;&#x4E0D;&#x7406;&#x89E3;&#x95ED;&#x5305;&#x90FD;&#x4E0D;&#x597D;&#x610F;&#x601D;&#x8BF4;&#x81EA;&#x5DF1;&#x4F1A;js&#xFF0C;&#x4F46;&#x6211;&#x770B;&#x5230;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x8FD8;&#x662F;&#x611F;&#x89C9;&#x773C;&#x524D;&#x4E00;&#x4EAE;&#xFF0C;&#x4E5F;&#x8BA9;&#x6211;&#x5BF9;&#x95ED;&#x5305;&#x6709;&#x4E86;&#x4E00;&#x4E9B;&#x65B0;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x5E76;&#x4E14;&#x6D89;&#x53CA;&#x4E86;&#x4E00;&#x4E9B;&#x7C7B;&#x548C;&#x539F;&#x578B;&#x94FE;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x7BC7;2012&#x5E74;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x7A0D;&#x5FAE;&#x6709;&#x70B9;&#x65E9;&#xFF0C;&#x5185;&#x5BB9;&#x4E5F;&#x7565;&#x5FAE;&#x57FA;&#x7840;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x660E;&#x6670;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x7ED9;&#x8BFB;&#x8005;&#x5E26;&#x6765;&#x65B0;&#x7684;&#x7406;&#x89E3;&#x3002;</blockquote><p>&#x95ED;&#x5305;(Closure) &#x662F;javascript&#x8FD9;&#x95E8;&#x8BED;&#x8A00;&#x4E2D;&#x6709;&#x4E9B;&#x590D;&#x6742;&#x5E76;&#x4E14;&#x5145;&#x6EE1;&#x8BEF;&#x89E3;&#x7684;&#x7279;&#x6027;&#x3002;&#x7B80;&#x8A00;&#x4E4B;&#xFF0C;&#x95ED;&#x5305;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF08;function&#xFF09;&#x548C;&#x8BE5;&#x65B9;&#x6CD5;&#x521B;&#x5EFA;&#x65F6;&#x73AF;&#x5883;&#x7684;&#x5F15;&#x7528;&#xFF08;reference to the enviroment&#xFF09;&#x3002;&#x4E3A;&#x4E86;&#x5B8C;&#x5168;&#x7406;&#x89E3;&#x95ED;&#x5305;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x7406;&#x89E3;&#x4E24;&#x4E2A;js&#x4E2D;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x4E00;&#x7EA7;&#x65B9;&#x6CD5;(first-class function)&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x5185;&#x90E8;&#x65B9;&#x6CD5;(inner function)&#x3002;</p><h2 id="articleHeader0">&#x4E00;&#x7EA7;&#x65B9;&#x6CD5;/First-Class Functions</h2><p>&#x5728;js&#x4E2D;&#xFF0C;&#x65B9;&#x6CD5;&#x662F;&#x5934;&#x7B49;&#x516C;&#x6C11;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x53EF;&#x4EE5;&#x88AB;&#x8F7B;&#x6613;&#x8F6C;&#x6362;&#x6210;&#x5176;&#x4ED6;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x4E00;&#x7EA7;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B9E;&#x65F6;&#x6784;&#x5EFA;&#x5E76;&#x4E14;&#x8D4B;&#x503C;&#x7ED9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x7ED9;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#xFF0C;&#x6216;&#x8005;&#x901A;&#x8FC7;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x3002;&#x9664;&#x4E86;&#x6EE1;&#x8DB3;&#x8FD9;&#x4E9B;&#x6807;&#x51C6;&#x4EE5;&#x5916;&#xFF0C;&#x65B9;&#x6CD5;&#x4E5F;&#x62E5;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;<br>&#x901A;&#x8FC7;&#x4E0B;&#x8FF0;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x4E00;&#x7EA7;&#x65B9;&#x6CD5;&#x7684;&#x80FD;&#x529B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function() {
  alert(&quot;Hello World!&quot;);
};

var bar = function(arg) {
  return arg;
};

bar(foo)();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  alert(<span class="hljs-string">&quot;Hello World!&quot;</span>);
};

<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(arg)</span> </span>{
  <span class="hljs-keyword">return</span> arg;
};

bar(foo)();</code></pre><blockquote>&#x8BD1;&#x8005;&#x6CE8;&#xFF1A;&#x7701;&#x7565;&#x539F;&#x6587;&#x5BF9;&#x4EE3;&#x7801;&#x7684;&#x6587;&#x5B57;&#x89E3;&#x91CA;&#xFF0C;&#x8FD9;&#x91CC;&#x4F53;&#x73B0;&#x7684;&#x662F;&#x4E00;&#x7EA7;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#xFF0C;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x4E00;&#x7EA7;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x8FD8;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x3002;</blockquote><h2 id="articleHeader1">&#x5185;&#x90E8;&#x65B9;&#x6CD5;/Inner Functions</h2><p>&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x6216;&#x8005;&#x8BF4;&#x5D4C;&#x5957;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x6307;&#x5B9A;&#x4E49;&#x5728;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6BCF;&#x5F53;&#x5916;&#x90E8;&#x65B9;&#x6CD5;&#x88AB;&#x5524;&#x8D77;&#xFF0C;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x4F8B;&#x5C31;&#x88AB;&#x521B;&#x5EFA;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x53CD;&#x5E94;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x7684;&#x4F7F;&#x7528;&#xFF0C;add&#x65B9;&#x6CD5;&#x662F;&#x5916;&#x90E8;&#x65B9;&#x6CD5;&#xFF0C;doAdd&#x662F;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(value1, value2) {
  function doAdd(operand1, operand2) {
    return operand1 + operand2;
  }

  return doAdd(value1, value2);
}

var foo = add(1, 2);
// foo equals 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(value1, value2)</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAdd</span><span class="hljs-params">(operand1, operand2)</span> </span>{
    <span class="hljs-keyword">return</span> operand1 + operand2;
  }

  <span class="hljs-keyword">return</span> doAdd(value1, value2);
}

<span class="hljs-keyword">var</span> foo = add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
<span class="hljs-comment">// foo equals 3</span></code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x7279;&#x6027;&#x662F;&#xFF0C;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x4E86;&#x5916;&#x90E8;&#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x80FD;&#x591F;&#x4F7F;&#x7528;&#x5916;&#x90E8;&#x65B9;&#x6CD5;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x53C2;&#x6570;&#x7B49;&#x3002;&#x4F8B;&#x5B50;&#x4E2D;add()&#x7684;&#x53C2;&#x6570;value1&#xFF0C;value2&#x4F20;&#x9012;&#x7ED9;doAdd()&#x7684;operand1&#xFF0C;operand2&#x53C2;&#x6570;&#x3002;&#x7136;&#x800C;&#x8FD9;&#x5E76;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#xFF0C;&#x56E0;&#x4E3A;doAdd&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x83B7;&#x53D6;value1&#xFF0C;value2&#x3002;&#x6240;&#x4EE5;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(value1, value2) {
  function doAdd() {
    return value1 + value2;
  }

  return doAdd();
}

var foo = add(1, 2);
// foo equals 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(value1, value2)</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAdd</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> value1 + value2;
  }

  <span class="hljs-keyword">return</span> doAdd();
}

<span class="hljs-keyword">var</span> foo = add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
<span class="hljs-comment">// foo equals 3</span></code></pre><h2 id="articleHeader2">&#x521B;&#x5EFA;&#x95ED;&#x5305;/Creating Closures</h2><p>&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5916;&#x90E8;&#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4FBF;&#x5F62;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x3002;&#x5178;&#x578B;&#x7684;&#x573A;&#x666F;&#x662F;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x5C06;&#x5176;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#xFF0C;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x4FDD;&#x6301;&#x4E86;&#x5916;&#x90E8;&#x73AF;&#x5883;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x5E76;&#x4FDD;&#x5B58;&#x4E86;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x53D8;&#x91CF;&#x3002;<br>&#x4E00;&#x4E0B;&#x4F8B;&#x5B50;&#x5C55;&#x793A;&#x95ED;&#x5305;&#x5982;&#x4F55;&#x521B;&#x5EFA;&#x5E76;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(value1) {
  return function doAdd(value2) {
    return value1 + value2;
  };
}

var increment = add(1);
var foo = increment(2);
// foo equals 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(value1)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAdd</span><span class="hljs-params">(value2)</span> </span>{
    <span class="hljs-keyword">return</span> value1 + value2;
  };
}

<span class="hljs-keyword">var</span> increment = add(<span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> foo = increment(<span class="hljs-number">2</span>);
<span class="hljs-comment">// foo equals 3</span></code></pre><p>&#x8BF4;&#x660E;&#xFF1A;</p><ul><li>add&#x8FD4;&#x56DE;&#x4E86;&#x5185;&#x90E8;&#x65B9;&#x6CD5;doAdd&#xFF0C;doAdd&#x8C03;&#x7528;&#x4E86;add&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x95ED;&#x5305;&#x521B;&#x5EFA;&#x3002;</li><li>value1&#x662F;add&#x65B9;&#x6CD5;&#x7684;&#x672C;&#x5730;&#x53D8;&#x91CF;&#xFF0C;&#x5BF9;doAdd&#x6765;&#x8BF4;&#x662F;&#x975E;&#x672C;&#x5730;&#x53D8;&#x91CF;&#xFF08;&#x975E;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x6307;&#x53D8;&#x91CF;&#x65E2;&#x4E0D;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x672C;&#x8EAB;&#xFF0C;&#x4E5F;&#x4E0D;&#x5728;&#x5168;&#x5C40;&#xFF09;&#xFF0C;value2&#x662F;doAdd&#x7684;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x3002;</li><li>&#x5F53;add(1)&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x88AB;&#x521B;&#x5EFA;&#x5E76;&#x50A8;&#x5B58;&#x5728;increment&#x4E2D;&#xFF0C;&#x5728;&#x8BE5;&#x95ED;&#x5305;&#x7684;&#x5F15;&#x7528;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;value1&#x7ED1;&#x5B9A;&#x4E86;1&#xFF0C;&#x88AB;&#x7ED1;&#x5B9A;&#x7684;1&#x76F8;&#x5F53;&#x4E8E;&#x201C;&#x5C01;&#x9501;&#x201D;&#x5728;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x201C;&#x95ED;&#x5305;&#x201D;&#x8FD9;&#x4E2A;&#x540D;&#x5B57;&#x7684;&#x7531;&#x6765;&#x3002;</li><li>&#x5F53;increment(2)&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x8FDB;&#x5165;&#x95ED;&#x5305;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x643A;&#x5E26;&#x7740;value1&#x4E3A;1&#x7684;doAdd&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x8BE5;&#x95ED;&#x5305;&#x672C;&#x8D28;&#x4E0A;&#x53EF;&#x4EE5;&#x5F53;&#x505A;&#x5982;&#x4E0B;&#x51FD;&#x6570;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function increment(value2) {
  return 1 + value2;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span>(value2) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">1</span> + value2;
}</code></pre><h2 id="articleHeader3">&#x4F55;&#x65F6;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#xFF1F;</h2><p>&#x95ED;&#x5305;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5F88;&#x591A;&#x529F;&#x80FD;&#x3002;&#x6BD4;&#x5982;&#x5C06;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#x6307;&#x5B9A;&#x53C2;&#x6570;&#x3002;&#x6211;&#x4EEC;&#x8BF4;&#x4E24;&#x4E2A;&#x8BA9;&#x4F60;&#x7684;&#x751F;&#x6D3B;&#x548C;&#x5F00;&#x53D1;&#x53D8;&#x5F97;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x573A;&#x666F;&#x3002;</p><ol><li>&#x914D;&#x5408;&#x5B9A;&#x65F6;&#x5668;</li></ol><p>&#x95ED;&#x5305;&#x7ED3;&#x5408;setTimeout&#x548C;setInterval&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x95ED;&#x5305;&#x5141;&#x8BB8;&#x4F60;&#x5411;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x6307;&#x5B9A;&#x53C2;&#x6570;&#xFF0C;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6BCF;&#x79D2;&#x949F;&#x5728;&#x7ED9;&#x6307;&#x5B9A;dom&#x63D2;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;title&gt;Closures&lt;/title&gt;
  &lt;meta charset=&quot;UTF-8&quot; /&gt;
  &lt;script&gt;
    window.addEventListener(&quot;load&quot;, function() {
      window.setInterval(showMessage, 1000, &quot;some message&lt;br /&gt;&quot;);
    });

    function showMessage(message) {
      document.getElementById(&quot;message&quot;).innerHTML += message;
    }
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;span id=&quot;message&quot;&gt;&lt;/span&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Closures<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">window</span>.setInterval(showMessage, <span class="hljs-number">1000</span>, <span class="hljs-string">&quot;some message&lt;br /&gt;&quot;</span>);
    });

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showMessage</span>(<span class="hljs-params">message</span>) </span>{
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;message&quot;</span>).innerHTML += message;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x9057;&#x61BE;&#x7684;&#x662F;&#xFF0C;IE&#x4E0D;&#x652F;&#x6301;&#x5411;setInterval&#x7684;&#x56DE;&#x8C03;&#x4F20;&#x53C2;&#xFF0C;IE&#x4E2D;&#x9875;&#x9762;&#x4E0D;&#x4F1A;&#x5C55;&#x73B0;&#x201C;some message&#x201D;&#x800C;&#x662F;&#x201C;undefined&#x201D;&#xFF08;&#x65E0;&#x503C;&#x4F20;&#x5165;showMessage()&#xFF09;,&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x5C06;&#x671F;&#x671B;&#x503C;&#x7ED1;&#x5B9A;&#x4E8E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6539;&#x5199;&#x5982;&#x4E0A;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;load&quot;, function() {
  var showMessage = getClosure(&quot;some message&lt;br /&gt;&quot;);

  window.setInterval(showMessage, 1000);
});

function getClosure(message) {
  function showMessage() {
    document.getElementById(&quot;message&quot;).innerHTML += message;
  }

  return showMessage;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> showMessage = getClosure(<span class="hljs-string">&quot;some message&lt;br /&gt;&quot;</span>);

  <span class="hljs-built_in">window</span>.setInterval(showMessage, <span class="hljs-number">1000</span>);
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClosure</span>(<span class="hljs-params">message</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showMessage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;message&quot;</span>).innerHTML += message;
  }

  <span class="hljs-keyword">return</span> showMessage;
}</code></pre><p>2.&#x6A21;&#x62DF;&#x79C1;&#x6709;&#x5C5E;&#x6027;<br>&#x7EDD;&#x5927;&#x591A;&#x6570;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x7A0B;&#x5E8F;&#x8BED;&#x8A00;&#x652F;&#x6301;&#x5BF9;&#x8C61;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x800C;js&#x4E0D;&#x662F;&#x7EAF;&#x6B63;&#x7684;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x6CA1;&#x6709;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x6982;&#x5FF5;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x6765;&#x6A21;&#x62DF;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x3002;&#x56DE;&#x60F3;&#x4E00;&#x4E0B;&#xFF0C;&#x95ED;&#x5305;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4EFD;&#x5176;&#x521B;&#x5EFA;&#x73AF;&#x5883;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x8FD9;&#x4EFD;&#x5F15;&#x7528;&#x5DF2;&#x7ECF;&#x4E0D;&#x5728;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x4E86;&#xFF0C;&#x56E0;&#x6B64;&#x8FD9;&#x4EFD;&#x5F15;&#x7528;&#x53EA;&#x80FD;&#x5728;&#x95ED;&#x5305;&#x4E2D;&#x8BBF;&#x95EE;&#xFF0C;&#x8FD9;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x3002;<br>&#x770B;&#x5982;&#x4E0B;&#x4F8B;&#x5B50;&#xFF08;&#x8BD1;&#x8005;&#xFF1A;&#x7701;&#x7565;&#x5BF9;&#x4EE3;&#x7801;&#x7684;&#x6587;&#x5B57;&#x63CF;&#x8FF0;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
  this._name = name;

  this.getName = function() {
    return this._name;
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span> </span>{
  <span class="hljs-keyword">this</span>._name = name;

  <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
  };
}</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x4E25;&#x91CD;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;js&#x4E0D;&#x652F;&#x6301;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x6CA1;&#x6CD5;&#x963B;&#x6B62;&#x522B;&#x4EBA;&#x4FEE;&#x6539;&#x5B9E;&#x4F8B;&#x7684;name&#x5B57;&#x6BB5;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Person&#x5B9E;&#x4F8B;&#x53EB;Colin&#xFF0C;&#x7136;&#x540E;&#x53EF;&#x4EE5;&#x5C06;&#x4ED6;&#x7684;&#x540D;&#x5B57;&#x6539;&#x6210;Tom&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = new Person(&quot;Colin&quot;);

person._name = &quot;Tom&quot;;
// person.getName() now returns &quot;Tom&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> <span class="hljs-type">Person</span>(<span class="hljs-string">&quot;Colin&quot;</span>);

person._name = <span class="hljs-string">&quot;Tom&quot;</span>;
<span class="hljs-comment">// person.getName() now returns &quot;Tom&quot;</span></code></pre><p>&#x6CA1;&#x6709;&#x4EBA;&#x613F;&#x610F;&#x4E0D;&#x7ECF;&#x540C;&#x610F;&#x5C31;&#x88AB;&#x522B;&#x4EBA;&#x6539;&#x540D;&#x5B57;&#xFF0C;&#x4E3A;&#x4E86;&#x963B;&#x6B62;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x53D1;&#x751F;&#xFF0C;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x8BA9;_name&#x5B57;&#x6BB5;&#x53D8;&#x6210;&#x79C1;&#x6709;&#x3002;&#x770B;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;_name&#x662F;Person&#x6784;&#x9020;&#x5668;&#x7684;&#x672C;&#x5730;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x95ED;&#x5305;&#x5F62;&#x6210;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x5916;&#x5C42;&#x65B9;&#x6CD5;Person&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x4E86;&#x4E00;&#x4E2A;&#x5185;&#x90E8;&#x65B9;&#x6CD5;getName&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
  var _name = name;// &#x6CE8;&#xFF1A;&#x533A;&#x522B;&#x5728;&#x8FD9;&#x91CC;

  this.getName = function() {
    return _name;
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span> </span>{
  <span class="hljs-keyword">var</span> _name = name;<span class="hljs-comment">// &#x6CE8;&#xFF1A;&#x533A;&#x522B;&#x5728;&#x8FD9;&#x91CC;</span>

  <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> _name;
  };
}</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x5F53;getName&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x6700;&#x521D;&#x4F20;&#x5165;&#x7C7B;&#x6784;&#x9020;&#x5668;&#x7684;&#x503C;&#x3002;&#x6211;&#x4EEC;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x65B0;&#x7684;_name&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x8FD9;&#x5E76;&#x4E0D;&#x5F71;&#x54CD;&#x95ED;&#x5305;getName&#x6700;&#x521D;&#x7ED1;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x8BC1;&#x660E;&#xFF0C;_name&#x5B57;&#x6BB5;&#xFF0C;&#x4E8B;&#x5B9E;&#x79C1;&#x6709;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = new Person(&quot;Colin&quot;);

person._name = &quot;Tom&quot;;
// person._name is &quot;Tom&quot; but person.getName() returns &quot;Colin&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> <span class="hljs-type">Person</span>(<span class="hljs-string">&quot;Colin&quot;</span>);

person._name = <span class="hljs-string">&quot;Tom&quot;</span>;
<span class="hljs-comment">// person._name is &quot;Tom&quot; but person.getName() returns &quot;Colin&quot;</span></code></pre><h2 id="articleHeader4">&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4E0D;&#x8981;&#x7528;&#x95ED;&#x5305;&#xFF1F;</h2><p>&#x6B63;&#x786E;&#x7406;&#x89E3;&#x95ED;&#x5305;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x4F55;&#x65F6;&#x4F7F;&#x7528;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x800C;&#x7406;&#x89E3;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4E0D;&#x5E94;&#x8BE5;&#x7528;&#x5B83;&#x4E5F;&#x540C;&#x6837;&#x91CD;&#x8981;&#x3002;&#x8FC7;&#x5EA6;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x4F1A;&#x5BFC;&#x81F4;&#x811A;&#x672C;&#x6267;&#x884C;&#x53D8;&#x6162;&#x5E76;&#x6D88;&#x8017;&#x989D;&#x5916;&#x5185;&#x5B58;&#x3002;&#x7531;&#x4E8E;&#x95ED;&#x5305;&#x592A;&#x5BB9;&#x6613;&#x521B;&#x5EFA;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x53D1;&#x751F;&#x4F60;&#x90FD;&#x4E0D;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x56DE;&#x4E8B;&#xFF0C;&#x5C31;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x4E86;&#x95ED;&#x5305;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x672C;&#x8282;&#x6211;&#x4EEC;&#x8BF4;&#x51E0;&#x79CD;&#x573A;&#x666F;&#x8981;&#x6CE8;&#x610F;&#x907F;&#x514D;&#x95ED;&#x5305;&#x7684;&#x4EA7;&#x751F;&#x3002;<br>1.&#x5FAA;&#x73AF;&#x4E2D;<br>&#x5FAA;&#x73AF;&#x4E2D;&#x521B;&#x5EFA;&#x51FA;&#x95ED;&#x5305;&#x4F1A;&#x5BFC;&#x81F4;&#x7ED3;&#x679C;&#x5F02;&#x5E38;&#x3002;&#x4E0B;&#x4F8B;&#x4E2D;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x6709;&#x4E09;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x5206;&#x522B;&#x70B9;&#x51FB;&#x5F39;&#x51FA;&#x4E0D;&#x540C;&#x7684;&#x8BDD;&#x672F;&#x3002;&#x7136;&#x800C;&#x5B9E;&#x9645;&#x8FD0;&#x884C;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x6309;&#x94AE;&#x90FD;&#x5F39;&#x51FA;button4&#x7684;&#x8BDD;&#x672F;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#xFF0C;&#x5F53;&#x6309;&#x94AE;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#xFF0C;&#x5FAA;&#x73AF;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x800C;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x53D8;&#x91CF;i&#x4E5F;&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x6700;&#x7EC8;&#x503C;4.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;title&gt;Closures&lt;/title&gt;
  &lt;meta charset=&quot;UTF-8&quot; /&gt;
  &lt;script&gt;
    window.addEventListener(&quot;load&quot;, function() {
      for (var i = 1; i &lt; 4; i++) {
        var button = document.getElementById(&quot;button&quot; + i);

        button.addEventListener(&quot;click&quot;, function() {
          alert(&quot;Clicked button &quot; + i);
        });
      }
    });
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;input type=&quot;button&quot; id=&quot;button1&quot; value=&quot;One&quot; /&gt;
  &lt;input type=&quot;button&quot; id=&quot;button2&quot; value=&quot;Two&quot; /&gt;
  &lt;input type=&quot;button&quot; id=&quot;button3&quot; value=&quot;Three&quot; /&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Closures<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">4</span>; i++) {
        <span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;button&quot;</span> + i);

        button.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          alert(<span class="hljs-string">&quot;Clicked button &quot;</span> + i);
        });
      }
    });
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button1&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;One&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button2&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Two&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button3&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Three&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x53BB;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5FC5;&#x987B;&#x5728;&#x5FAA;&#x73AF;&#x4E2D;&#x53BB;&#x6389;&#x95ED;&#x5305;&#xFF08;&#x8BD1;&#x8005;&#xFF1A;&#x8FD9;&#x91CC;&#x7684;&#x95ED;&#x5305;&#x6307;&#x7684;&#x662F;click&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#x4E86;&#x5916;&#x5C42;&#x5F15;&#x7528;i&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x65B0;&#x73AF;&#x5883;&#x7684;&#x51FD;&#x6570;&#x6765;&#x89E3;&#x51B3;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x4F20;&#x9012;&#x7ED9;getHandler&#x51FD;&#x6570;&#xFF0C;getHandler&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#xFF08;&#x8BD1;&#x8005;&#xFF1A;&#x8FD9;&#x4E2A;&#x95ED;&#x5305;&#x6307;&#x7684;&#x662F;getHandler&#x8FD4;&#x56DE;&#x7684;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x7ED1;&#x5B9A;&#x4F20;&#x5165;&#x7684;i&#x53C2;&#x6570;&#xFF09;&#xFF0C;&#x72EC;&#x7ACB;&#x4E8E;&#x539F;&#x6765;&#x7684;for&#x5FAA;&#x73AF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getHandler(i) {
  return function handler() {
    alert(&quot;Clicked button &quot; + i);
  };
}

window.addEventListener(&quot;load&quot;, function() {
  for (var i = 1; i &lt; 4; i++) {
    var button = document.getElementById(&quot;button&quot; + i);

    button.addEventListener(&quot;click&quot;, getHandler(i));
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHandler</span>(<span class="hljs-params">i</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">&quot;Clicked button &quot;</span> + i);
  };
}

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">4</span>; i++) {
    <span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;button&quot;</span> + i);

    button.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, getHandler(i));
  }
});</code></pre><p>2.&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x7684;&#x975E;&#x5FC5;&#x8981;&#x4F7F;&#x7528;<br>&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#xFF0C;&#x4E5F;&#x662F;&#x7ECF;&#x5E38;&#x4F1A;&#x4EA7;&#x751F;&#x95ED;&#x5305;&#x7684;&#x9519;&#x8BEF;&#x4F7F;&#x7528;&#x3002;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x5982;&#x4F55;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x8BBE;&#x7F6E;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x5F53;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0D;&#x9700;&#x8981;&#x8C03;&#x7528;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x9020;&#x6210;&#x7684;&#x95ED;&#x5305;&#x662F;&#x6D6A;&#x8D39;&#x7684;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;Person&#x7C7B;&#x589E;&#x52A0;&#x4E86;sayHello&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
  var _name = name;

  this.getName = function() {
    return _name;
  };

  this.sayHello = function() {
    alert(&quot;Hello!&quot;);
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span> </span>{
  <span class="hljs-keyword">var</span> _name = name;

  <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> _name;
  };

  <span class="hljs-keyword">this</span>.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    alert(<span class="hljs-string">&quot;Hello!&quot;</span>);
  };
}</code></pre><p>&#x6BCF;&#x5F53;Person&#x88AB;&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x521B;&#x5EFA;sayHello&#x90FD;&#x8981;&#x6D88;&#x8017;&#x65F6;&#x95F4;&#xFF0C;&#x60F3;&#x8C61;&#x4E00;&#x4E0B;&#x6709;&#x5927;&#x91CF;&#x7684;Person&#x88AB;&#x5B9E;&#x4F8B;&#x5316;&#x3002;&#x66F4;&#x597D;&#x7684;&#x5B9E;&#x8DF5;&#x662F;&#x5C06;sayHello&#x653E;&#x5165;Person&#x7684;&#x539F;&#x578B;&#x94FE;&#x91CC;&#xFF08;prototype&#xFF09;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#x91CC;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F1A;&#x88AB;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x5171;&#x4EAB;&#xFF0C;&#x56E0;&#x6B64;&#x8282;&#x7701;&#x4E86;&#x4E3A;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x53BB;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#xFF08;&#x8BD1;&#x8005;&#xFF1A;&#x6307;sayHello&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x6709;&#x5FC5;&#x8981;&#x505A;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
  var _name = name;

  this.getName = function() {
    return _name;
  };
}

Person.prototype.sayHello = function() {
  alert(&quot;Hello!&quot;);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span> </span>{
  <span class="hljs-keyword">var</span> _name = name;

  <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> _name;
  };
}

Person.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  alert(<span class="hljs-string">&quot;Hello!&quot;</span>);
};</code></pre><h2 id="articleHeader5">&#x9700;&#x8981;&#x8BB0;&#x5F97;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;</h2><ul><li>&#x95ED;&#x5305;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE5;&#x53CA;&#x521B;&#x5EFA;&#x5B83;&#x7684;&#x4EE3;&#x7801;&#x73AF;&#x5883;&#x5F15;&#x7528;</li><li>&#x95ED;&#x5305;&#x4F1A;&#x5728;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x5305;&#x542B;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x5F62;&#x6210;</li><li>&#x95ED;&#x5305;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x7684;&#x5E2E;&#x52A9;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x53C2;&#x6570;</li><li>&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x6A21;&#x62DF;</li><li>&#x7C7B;&#x7684;&#x6784;&#x9020;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x597D;&#x4E3B;&#x610F;&#xFF0C;&#x5C06;&#x5B83;&#x4EEC;&#x653E;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E2D;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js闭包探秘

## 原文链接
[https://segmentfault.com/a/1190000016724238](https://segmentfault.com/a/1190000016724238)


---
title: '深入理解 Javascript 之 闭包' 
date: 2018-11-17 14:34:54
hidden: true
slug: sz9nbug20ae
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x95ED;&#x5305;</h1><p><span class="img-wrap"><img data-src="/img/bVbe3nk?w=1335&amp;h=653" src="https://static.alili.tech/img/bVbe3nk?w=1335&amp;h=653" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x4E00;&#x3001;&#x8BA4;&#x8BC6;&#x95ED;&#x5305;</h2><blockquote><strong>&#x95ED;&#x5305;&#x662F;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5B83;&#x7531;&#x4E24;&#x90E8;&#x5206;&#x6784;&#x6210;&#xFF1A;&#x51FD;&#x6570;&#xFF0C;&#x4EE5;&#x53CA;&#x521B;&#x5EFA;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x73AF;&#x5883;(&#x5305;&#x542B;&#x81EA;&#x7531;&#x53D8;&#x91CF;)&#x3002;&#x73AF;&#x5883;&#x7531;&#x95ED;&#x5305;&#x521B;&#x5EFA;&#x65F6;&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7EC4;&#x6210;&#x3002;</strong></blockquote><h2 id="articleHeader2">&#x4E8C;&#x3001;&#x95ED;&#x5305;&#x7684;&#x4EA7;&#x751F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  var a = 2;
  var b = 3;
  function g(){
    console.log(a);
  }  
  g();
}
f();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">3</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(a);
  }  
  g();
}
f();</code></pre><p>&#x8FD9;&#x5C31;&#x5F62;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#xFF0C;&#x51FD;&#x6570;g&#x4EE5;&#x53CA;&#x5176;&#x6240;&#x5728;&#x7684;&#x73AF;&#x5883;&#x4EE5;&#x53CA;&#x5176;&#x4E2D;&#x7684;&#x81EA;&#x7531;&#x53D8;&#x91CF;&#x5C31;&#x7EC4;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x3002;</p><p><strong>&#x521B;&#x5EFA;&#x95ED;&#x5305;&#x6700;&#x5E38;&#x89C1;&#x65B9;&#x5F0F;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x521B;&#x5EFA;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x4E0B;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;&#x7684; closure &#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
  var a = 1,b = 2;
  
  function closure(){
    return a+b;
  }
  return closure;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>,b = <span class="hljs-number">2</span>;
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">closure</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> a+b;
  }
  <span class="hljs-keyword">return</span> closure;
}</code></pre><p><strong>&#x4E0B;&#x9762;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x95ED;&#x5305;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1() {
  var a = 10;
  var b = 20;
  return function g() {
    console.log(a);
  }
}

var result = f1;
result()(); // 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">20</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(a);
  }
}

<span class="hljs-keyword">var</span> result = f1;
result()(); <span class="hljs-comment">// 10</span></code></pre><h2 id="articleHeader3">&#x4E09;&#x3001;&#x95ED;&#x5305;&#x7684;&#x597D;&#x5904;</h2><p><strong>&#x5B9E;&#x4F8B; 1 &#x7D2F;&#x52A0; &#x3010;&#x51CF;&#x5C11;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E2A;&#x6570;&#x3011;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add () {
  var a  = 0;
  return function () {
    a++;
    alert(a);
  }
}

var result = add();
result(); // 1
result(); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a  = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    a++;
    alert(a);
  }
}

<span class="hljs-keyword">var</span> result = add();
result(); <span class="hljs-comment">// 1</span>
result(); <span class="hljs-comment">// 2</span></code></pre><p><strong>&#x5B9E;&#x4F8B; 2 &#x3010;&#x51CF;&#x5C11;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;&#x3011;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function callFac(base) {
  return function (max) {
    var total = 0;
    for(var i = 1; i &lt;= max; i++) {
      total+=i;
    }
    return total + base;
  }
}

var result = callFac(2);
result(3); // 8" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callFac</span>(<span class="hljs-params">base</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">max</span>) </span>{
    <span class="hljs-keyword">var</span> total = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= max; i++) {
      total+=i;
    }
    <span class="hljs-keyword">return</span> total + base;
  }
}

<span class="hljs-keyword">var</span> result = callFac(<span class="hljs-number">2</span>);
result(<span class="hljs-number">3</span>); <span class="hljs-comment">// 8</span></code></pre><p><strong>&#x5B9E;&#x4F8B; 2 &#x3010;&#x5C01;&#x88C5;&#x3011;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
  var a = 0;
  function getM() {
    rerurn a;
  }
  function setM(val) {
    a = val;
  }
  window.g = getM;
  window.s = setM;
})();

s(3);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getM</span>(<span class="hljs-params"></span>) </span>{
    rerurn a;
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setM</span>(<span class="hljs-params">val</span>) </span>{
    a = val;
  }
  <span class="hljs-built_in">window</span>.g = getM;
  <span class="hljs-built_in">window</span>.s = setM;
})();

s(<span class="hljs-number">3</span>);</code></pre><h2 id="articleHeader4">&#x4E09;&#x3001;&#x95ED;&#x5305;&#x7684;&#x6CE8;&#x610F;&#x70B9;</h2><p><strong>1&#x3001; &#x5BF9;&#x6355;&#x83B7;&#x7684;&#x53D8;&#x91CF;&#x53EA;&#x662F;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x4E0D;&#x662F;&#x590D;&#x5236;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  var num = 0;
  function g () {
    alert(num); // &#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x5F15;&#x7528;
  }
  num ++;
  g(); // &#x5728;&#x8C03;&#x7528;&#x6267;&#x884C;&#x4E4B;&#x524D;&#x5C31;&#x5DF2;&#x7ECF;&#x52A0; 1&#x4E86;
} 
f();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span> (<span class="hljs-params"></span>) </span>{
    alert(num); <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x5F15;&#x7528;</span>
  }
  num ++;
  g(); <span class="hljs-comment">// &#x5728;&#x8C03;&#x7528;&#x6267;&#x884C;&#x4E4B;&#x524D;&#x5C31;&#x5DF2;&#x7ECF;&#x52A0; 1&#x4E86;</span>
} 
f();</code></pre><p><strong>2&#x3001;&#x6BCF;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x7236;&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x95ED;&#x5305;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  var num = 1;
  return function () {
    num++;
    alert(num);
  }
}

var result1 = f();
result1(); // 2
result1(); // 3

var result2 = f();
result2(); // 2
result2(); // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> num = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    num++;
    alert(num);
  }
}

<span class="hljs-keyword">var</span> result1 = f();
result1(); <span class="hljs-comment">// 2</span>
result1(); <span class="hljs-comment">// 3</span>

<span class="hljs-keyword">var</span> result2 = f();
result2(); <span class="hljs-comment">// 2</span>
result2(); <span class="hljs-comment">// 3</span></code></pre><p><strong>3. &#x5FAA;&#x73AF;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul&gt;
    &lt;li id=&quot;1&quot;&gt;1&lt;/li&gt;
    &lt;li id=&quot;2&quot;&gt;2&lt;/li&gt;
    &lt;li id=&quot;3&quot;&gt;3&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script&gt;
    for(var i = 1 ; i &lt;= 3; i++) {
      var el = document.getElementById(i);
      el.onclick = function() {
        alert(i);
      }
    }
  &lt;/script&gt;

  // &#x7ED3;&#x679C;&#x662F;&#x65E0;&#x8BBA;&#x70B9;&#x51FB;&#x90A3;&#x4E2A;&#xFF0C;&#x90FD;&#x662F;&#x5F39;&#x51FA;4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;2&quot;</span>&gt;<span class="hljs-number">2</span>&lt;<span class="hljs-regexp">/li&gt;
    &lt;li id=&quot;3&quot;&gt;3&lt;/</span>li&gt;
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span> ; i &lt;= <span class="hljs-number">3</span>; i++) {
      <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(i);
      el.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(i);
      }
    }
  &lt;<span class="hljs-regexp">/script&gt;

  /</span><span class="hljs-regexp">/ &#x7ED3;&#x679C;&#x662F;&#x65E0;&#x8BBA;&#x70B9;&#x51FB;&#x90A3;&#x4E2A;&#xFF0C;&#x90FD;&#x662F;&#x5F39;&#x51FA;4</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x89E3;&#x51B3;&#x529E;&#x6CD5;
&lt;ul&gt;
    &lt;li id=&quot;1&quot;&gt;1&lt;/li&gt;
    &lt;li id=&quot;2&quot;&gt;2&lt;/li&gt;
    &lt;li id=&quot;3&quot;&gt;3&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script&gt;
    for(var i = 1 ; i &lt;= 3; i++) {
      var el = document.getElementById(i);
      el.onclick = (function(id) {
        return function () {
          alert(id);
        }
      })(i);;
    }
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x89E3;&#x51B3;&#x529E;&#x6CD5;</span>
&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;2&quot;</span>&gt;<span class="hljs-number">2</span>&lt;<span class="hljs-regexp">/li&gt;
    &lt;li id=&quot;3&quot;&gt;3&lt;/</span>li&gt;
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span> ; i &lt;= <span class="hljs-number">3</span>; i++) {
      <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(i);
      el.onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          alert(id);
        }
      })(i);;
    }
  &lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 闭包

## 原文链接
[https://segmentfault.com/a/1190000015941887](https://segmentfault.com/a/1190000015941887)


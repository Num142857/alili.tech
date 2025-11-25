---
title: '深入理解 Javascript 之 JS的深浅拷贝' 
date: 2018-11-17 14:34:54
hidden: true
slug: xcogklen1t
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x6DF1;&#x6D45;&#x62F7;&#x8D1D;</h1><h2 id="articleHeader1">&#x57FA;&#x672C;&#x7C7B;&#x578B; &amp; &#x5F15;&#x7528;&#x7C7B;&#x578B;</h2><p><strong>ECMAScript&#x4E2D;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x53EF;&#x5206;&#x4E3A;&#x4E24;&#x79CD;</strong>&#xFF1A;</p><p><strong>&#x57FA;&#x672C;&#x7C7B;&#x578B;</strong>&#xFF1A;undefined,null,Boolean,String,Number,Symbol<br><strong>&#x5F15;&#x7528;&#x7C7B;&#x578B;</strong>&#xFF1A;Object,Array,Date,Function,RegExp&#x7B49;</p><p><strong>&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x5B58;&#x50A8;&#x65B9;&#x5F0F;&#xFF1A;</strong></p><p><strong>&#x57FA;&#x672C;&#x7C7B;&#x578B;</strong>&#xFF1A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x5360;&#x636E;&#x56FA;&#x5B9A;&#x5927;&#x5C0F;&#xFF0C;&#x4FDD;&#x5B58;&#x5728;&#x6808;&#x5185;&#x5B58;&#x4E2D;<br><strong>&#x5F15;&#x7528;&#x7C7B;&#x578B;</strong>&#xFF1A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x4FDD;&#x5B58;&#x5728;&#x5806;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x800C;&#x6808;&#x5185;&#x5B58;&#x5B58;&#x50A8;&#x7684;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x53D8;&#x91CF;&#x6807;&#x8BC6;&#x7B26;&#x4EE5;&#x53CA;&#x5BF9;&#x8C61;&#x5728;&#x5806;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x5B58;&#x50A8;&#x5730;&#x5740;</p><p><strong>&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x590D;&#x5236;&#x65B9;&#x5F0F;&#xFF1A;</strong></p><p><strong>&#x57FA;&#x672C;&#x7C7B;&#x578B;</strong></p><ul><li>&#x57FA;&#x672C;&#x7C7B;&#x578B;&#xFF1A;&#x4ECE;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x5411;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x65B0;&#x53D8;&#x91CF;&#x590D;&#x5236;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x4F1A;&#x521B;&#x5EFA;&#x8FD9;&#x4E2A;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#xFF0C;&#x5E76;&#x5C06;&#x8BE5;&#x526F;&#x672C;&#x590D;&#x5236;&#x7ED9;&#x65B0;&#x53D8;&#x91CF;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = 1;
let bar = foo;
console.log(foo === bar); // -&gt; true

// &#x4FEE;&#x6539;foo&#x53D8;&#x91CF;&#x7684;&#x503C;&#x5E76;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;bar&#x53D8;&#x91CF;&#x7684;&#x503C;
let foo = 233;
console.log(foo); // -&gt; 233
console.log(bar); // -&gt; 1
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> <span class="hljs-built_in">bar</span> = foo;
console.<span class="hljs-built_in">log</span>(foo === <span class="hljs-built_in">bar</span>); <span class="hljs-comment">// -&gt; true</span>

<span class="hljs-comment">// &#x4FEE;&#x6539;foo&#x53D8;&#x91CF;&#x7684;&#x503C;&#x5E76;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;bar&#x53D8;&#x91CF;&#x7684;&#x503C;</span>
<span class="hljs-keyword">let</span> foo = <span class="hljs-number">233</span>;
console.<span class="hljs-built_in">log</span>(foo); <span class="hljs-comment">// -&gt; 233</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">bar</span>); <span class="hljs-comment">// -&gt; 1</span>
</code></pre><ul><li>&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF1A;&#x4ECE;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x5411;&#x53E6;&#x4E00;&#x4E2A;&#x65B0;&#x53D8;&#x91CF;&#x590D;&#x5236;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x5176;&#x5B9E;&#x590D;&#x5236;&#x7684;&#x662F;&#x6307;&#x9488;&#xFF0C;&#x6700;&#x7EC8;&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#x6700;&#x7EC8;&#x90FD;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = {
  name: &apos;leeper&apos;,
  age: 20
}
let bar = foo;
console.log(foo === bar); // -&gt; true

// &#x6539;&#x53D8;foo&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4F1A;&#x5F71;&#x54CD;bar&#x53D8;&#x91CF;&#x7684;&#x503C;
foo.age = 19;
console.log(foo); // -&gt; {name: &apos;leeper&apos;, age: 19}
console.log(bar); // -&gt; {name: &apos;leeper&apos;, age: 19}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>let foo = {
  <span class="hljs-keyword">name</span>: <span class="hljs-string">&apos;leeper&apos;</span>,
  age: <span class="hljs-number">20</span>
}
let bar = foo;
<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(foo === bar); // -&gt;</span> <span class="hljs-literal">true</span>

<span class="hljs-comment">// &#x6539;&#x53D8;foo&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4F1A;&#x5F71;&#x54CD;bar&#x53D8;&#x91CF;&#x7684;&#x503C;</span>
foo.age = <span class="hljs-number">19</span>;
<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(foo); // -&gt;</span> {<span class="hljs-keyword">name</span>: <span class="hljs-string">&apos;leeper&apos;</span>, age: <span class="hljs-number">19</span>}
<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(bar); // -&gt;</span> {<span class="hljs-keyword">name</span>: <span class="hljs-string">&apos;leeper&apos;</span>, age: <span class="hljs-number">19</span>}</code></pre><hr><h2 id="articleHeader2">&#x6DF1;&#x62F7;&#x8D1D; &amp; &#x6D45;&#x62F7;&#x8D1D;</h2><hr><ul><li><strong>&#x6D45;&#x62F7;&#x8D1D;</strong>&#xFF1A;&#x4EC5;&#x4EC5;&#x662F;&#x590D;&#x5236;&#x4E86;&#x5F15;&#x7528;&#xFF0C;&#x5F7C;&#x6B64;&#x4E4B;&#x95F4;&#x7684;&#x64CD;&#x4F5C;&#x4F1A;&#x4E92;&#x76F8;&#x5F71;&#x54CD;</li><li><strong>&#x6DF1;&#x62F7;&#x8D1D;</strong>&#xFF1A;&#x5728;&#x5806;&#x4E2D;&#x91CD;&#x65B0;&#x5206;&#x914D;&#x5185;&#x5B58;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x76F8;&#x540C;&#x7684;&#x503C;&#xFF0C;&#x4E92;&#x4E0D;&#x5F71;&#x54CD;</li></ul><h3 id="articleHeader3"><strong>&#x6D45;&#x62F7;&#x8D1D;</strong></h3><ul><li>&#x4E3E;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF08;&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var me = {
      name: &apos;zjj&apos;,
      age: 19,
      address: {
          home: &apos;tianjin&apos;
      }
  };
  
  var me_1 = {
      m_token: &apos;new&apos;
  };
  
  
  function extend(p, c){
      var c = c || {};
      
      for(var i in p) {
          c[i] = p[i];
      }
  }
  extend(me,me_1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  <span class="hljs-keyword">var</span> me = {
      name: <span class="hljs-string">&apos;zjj&apos;</span>,
      age: <span class="hljs-number">19</span>,
      address: {
          home: <span class="hljs-string">&apos;tianjin&apos;</span>
      }
  };
  
  <span class="hljs-keyword">var</span> me_1 = {
      m_token: <span class="hljs-string">&apos;new&apos;</span>
  };
  
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span><span class="hljs-params">(p, c)</span></span>{
      <span class="hljs-keyword">var</span> c = c || {};
      
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> p) {
          c[i] = p[i];
      }
  }
  extend(me,me_1);</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe7UL?w=677&amp;h=526" src="https://static.alili.tech/img/bVbe7UL?w=677&amp;h=526" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader4"><strong>&#x6DF1;&#x62F7;&#x8D1D;</strong></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var me = {
      name: &apos;zjj&apos;,
      age: 19,
      address: {
          home: &apos;tianjin&apos;
      }
  };
  
  var me_1 = {
      m_token: &apos;new&apos;
  };
  
  
  function extend(p, c){
      var c = c || {};
      
      for(var i in p) {
          c[i] = p[i];
      }
  }


  function extendDeeply(p, c) {
    var c = c || {};
      
      for(var i in p) {
        if(typeof p[i] === &apos;object&apos;) {
          // &#x5F15;&#x7528;&#x7C7B;&#x578B;&#x9700;&#x8981;&#x9012;&#x5F52;&#x5B9E;&#x73B0;&#x6DF1;&#x62F7;&#x8D1D;
          c[i] = (p[i].constructor === Array ) ? [] : {}
          extendDeeply(p[i], c[i]);
        } else {
          // &#x975E;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x5373;&#x53EF;
          c[i] = p[i];
        } 
      }
  }
  extendDeeply(me,me_1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> me = {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;zjj&apos;</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-number">19</span>,
      <span class="hljs-attr">address</span>: {
          <span class="hljs-attr">home</span>: <span class="hljs-string">&apos;tianjin&apos;</span>
      }
  };
  
  <span class="hljs-keyword">var</span> me_1 = {
      <span class="hljs-attr">m_token</span>: <span class="hljs-string">&apos;new&apos;</span>
  };
  
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">p, c</span>)</span>{
      <span class="hljs-keyword">var</span> c = c || {};
      
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> p) {
          c[i] = p[i];
      }
  }


  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extendDeeply</span>(<span class="hljs-params">p, c</span>) </span>{
    <span class="hljs-keyword">var</span> c = c || {};
      
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> p) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> p[i] === <span class="hljs-string">&apos;object&apos;</span>) {
          <span class="hljs-comment">// &#x5F15;&#x7528;&#x7C7B;&#x578B;&#x9700;&#x8981;&#x9012;&#x5F52;&#x5B9E;&#x73B0;&#x6DF1;&#x62F7;&#x8D1D;</span>
          c[i] = (p[i].constructor === <span class="hljs-built_in">Array</span> ) ? [] : {}
          extendDeeply(p[i], c[i]);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// &#x975E;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x5373;&#x53EF;</span>
          c[i] = p[i];
        } 
      }
  }
  extendDeeply(me,me_1);</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe73t?w=619&amp;h=286" src="https://static.alili.tech/img/bVbe73t?w=619&amp;h=286" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>JSON.parse()&#x548C;JSON.stringify()</li></ul><blockquote>JSON.stringify()&#xFF1A;&#x628A;&#x4E00;&#x4E2A;js&#x5BF9;&#x8C61;&#x5E8F;&#x5217;&#x5316;&#x4E3A;&#x4E00;&#x4E2A;JSON&#x5B57;&#x7B26;&#x4E32;<br>JSON.parse()&#xFF1A;&#x628A;JSON&#x5B57;&#x7B26;&#x4E32;&#x53CD;&#x5E8F;&#x5217;&#x5316;&#x4E3A;&#x4E00;&#x4E2A;js&#x5BF9;&#x8C61;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  name: &apos;leeper&apos;,
  age: 20,
  friend: {
    name: &apos;lee&apos;,
    age: 19
  }
};
let copyObj = JSON.parse(JSON.stringify(obj));
obj.name = &apos;Sandman&apos;;
obj.friend.name = &apos;Jerry&apos;;
console.log(obj);
// -&gt; {name: &quot;Sandman&quot;, age: 20, friend: {age: 19,name: &apos;Jerry&apos;"}}"
console.log(copyObj);
// -&gt; {name: &quot;leeper&quot;, age: 20, friend: {age: 19,name: &apos;lee&apos;"}}"" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj = {
  name: <span class="hljs-string">&apos;leeper&apos;</span>,
  age: <span class="hljs-number">20</span>,
  friend: {
    name: <span class="hljs-string">&apos;lee&apos;</span>,
    age: <span class="hljs-number">19</span>
  }
};
<span class="hljs-keyword">let</span> copyObj = JSON.parse(JSON.stringify(obj));
obj.name = <span class="hljs-string">&apos;Sandman&apos;</span>;
obj.friend.name = <span class="hljs-string">&apos;Jerry&apos;</span>;
console.log(obj);
// -&gt; {name: <span class="hljs-string">&quot;Sandman&quot;</span>, age: <span class="hljs-number">20</span>, friend: {age: <span class="hljs-number">19</span>,name: <span class="hljs-string">&apos;Jerry&apos;</span>"}}"
console.log(copyObj);
// -&gt; {name: <span class="hljs-string">&quot;leeper&quot;</span>, age: <span class="hljs-number">20</span>, friend: {age: <span class="hljs-number">19</span>,name: <span class="hljs-string">&apos;lee&apos;</span>"}}"</code></pre><p>&#x7EFC;&#x4E0A;&#xFF0C;JSON.parse()&#x548C;JSON.stringify()&#x662F;&#x5B8C;&#x5168;&#x7684;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;</p><p><strong>&#x52A8;&#x624B;&#x5B9E;&#x73B0;&#x6DF1;&#x62F7;&#x8D1D; &#x5229;&#x3010;&#x9012;&#x5F52;&#x3011;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x5BF9;&#x8C61;&#x6216;&#x6570;&#x7EC4;&#x7684;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;&#x9012;&#x5F52;&#x601D;&#x8DEF;&#xFF1A;&#x5BF9;&#x5C5E;&#x6027;&#x4E2D;&#x6240;&#x6709;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x76F4;&#x5230;&#x662F;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x503C;&#x4E3A;&#x6B62;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6DF1;&#x62F7;&#x8D1D;
function deepCopy(obj) {
  if (!obj &amp;&amp; typeof obj !== &apos;object&apos;) {
    throw new Error(&apos;error arguments&apos;);
  }
  // const targetObj = obj.constructor === Array ? [] : {};
  const targetObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    
    //&#x53EA;&#x5BF9;&#x5BF9;&#x8C61;&#x81EA;&#x6709;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x62F7;&#x8D1D;
    if (obj.hasOwnProperty(key)) {
      if (obj[key] &amp;&amp; typeof obj[key] === &apos;object&apos;) {
        targetObj[key] = deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  return targetObj;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x6DF1;&#x62F7;&#x8D1D;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepCopy</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">if</span> (!obj &amp;&amp; <span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">&apos;object&apos;</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;error arguments&apos;</span>);
  }
  <span class="hljs-comment">// const targetObj = obj.constructor === Array ? [] : {};</span>
  <span class="hljs-keyword">const</span> targetObj = <span class="hljs-built_in">Array</span>.isArray(obj) ? [] : {};
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
    
    <span class="hljs-comment">//&#x53EA;&#x5BF9;&#x5BF9;&#x8C61;&#x81EA;&#x6709;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x62F7;&#x8D1D;</span>
    <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
      <span class="hljs-keyword">if</span> (obj[key] &amp;&amp; <span class="hljs-keyword">typeof</span> obj[key] === <span class="hljs-string">&apos;object&apos;</span>) {
        targetObj[key] = deepCopy(obj[key]);
      } <span class="hljs-keyword">else</span> {
        targetObj[key] = obj[key];
      }
    }
  }
  <span class="hljs-keyword">return</span> targetObj;
}</code></pre><hr><blockquote>&#x62F7;&#x8D1D;&#x65B9;&#x5F0F;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x7EE7;&#x627F;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5F53;&#x7136;&#x7EE7;&#x627F;&#x8FD8;&#x662F;&#x6709;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x7684;&#xFF01;<br>&#xFF08;&#x611F;&#x8C22;&#x652F;&#x6301;&#xFF01;&#xFF01;&#xFF09;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 JS的深浅拷贝

## 原文链接
[https://segmentfault.com/a/1190000015960071](https://segmentfault.com/a/1190000015960071)


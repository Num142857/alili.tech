---
title: js浅拷贝与深拷贝方法
hidden: true
categories: [reprint]
slug: 2e32f070
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p>js&#x6709;&#x4E94;&#x79CD;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;string,number,boolean,null,undefind&#x3002;&#x8FD9;&#x4E94;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x8D4B;&#x503C;&#xFF0C;&#x5C31;&#x662F;&#x503C;&#x4F20;&#x9012;&#x3002;&#x7279;&#x6B8A;&#x7C7B;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x8D4B;&#x503C;&#x662F;&#x5C06;&#x5BF9;&#x8C61;&#x5730;&#x5740;&#x7684;&#x5F15;&#x7528;&#x8D4B;&#x503C;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#x4FEE;&#x6539;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x503C;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x6240;&#x6709;&#x5F15;&#x7528;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x6539;&#x53D8;&#x3002;&#x5982;&#x679C;&#x60F3;&#x8981;&#x771F;&#x7684;&#x590D;&#x5236;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x590D;&#x5236;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x5C31;&#x8981;&#x7528;&#x5230;&#x5BF9;&#x8C61;&#x7684;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;</p><h2 id="articleHeader0">&#x6D45;&#x62F7;&#x8D1D;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;</h2><h3 id="articleHeader1">1.&#x2018;=&#x2019;&#x8D4B;&#x503C;&#x3002;</h3><p>&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x6700;&#x57FA;&#x7840;&#x7684;&#x8D4B;&#x503C;&#x65B9;&#x5F0F;&#xFF0C;&#x53EA;&#x662F;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x8D4B;&#x503C;&#x3002;</p><h3 id="articleHeader2">2.Object.assign()</h3><p>Object.assign&#x662F;ES6&#x7684;&#x65B0;&#x51FD;&#x6570;&#x3002;Object.assign() &#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x628A;&#x4EFB;&#x610F;&#x591A;&#x4E2A;&#x7684;&#x6E90;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x62F7;&#x8D1D;&#x7ED9;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;&#x4F46;&#x662F; Object.assign() &#x8FDB;&#x884C;&#x7684;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x62F7;&#x8D1D;&#x7684;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(target, ...sources)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>(<span class="hljs-selector-tag">target</span>, ..<span class="hljs-selector-class">.sources</span>)</code></pre><p>&#x53C2;&#x6570;&#xFF1A;<br>target&#xFF1A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;<br>sources&#xFF1A;&#x4EFB;&#x610F;&#x591A;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x3002;<br>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x8FD4;&#x56DE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { a: {a: &quot;hello&quot;, b: 21} };
var initalObj = Object.assign({}, obj);

initalObj.a.a = &quot;changed&quot;;
console.log(obj.a.a); // &quot;changed&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">a</span>: {<span class="hljs-attr">a</span>: <span class="hljs-string">&quot;hello&quot;</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">21</span>} };
<span class="hljs-keyword">var</span> initalObj = <span class="hljs-built_in">Object</span>.assign({}, obj);

initalObj.a.a = <span class="hljs-string">&quot;changed&quot;</span>;
<span class="hljs-built_in">console</span>.log(obj.a.a); <span class="hljs-comment">// &quot;changed&quot;</span></code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF1A;<br>Object.assign()&#x53EF;&#x4EE5;&#x5904;&#x7406;&#x4E00;&#x5C42;&#x7684;&#x6DF1;&#x5EA6;&#x62F7;&#x8D1D;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = Object.assign({}, obj1);
obj2.b = 100;
console.log(obj1);
// { a: 10, b: 20, c: 30 } &lt;-- &#x6C92;&#x88AB;&#x6539;&#x5230;
console.log(obj2);
// { a: 10, b: 100, c: 30 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj1 = { <span class="hljs-attr">a</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">20</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">30</span> };
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">Object</span>.assign({}, obj1);
obj2.b = <span class="hljs-number">100</span>;
<span class="hljs-built_in">console</span>.log(obj1);
<span class="hljs-comment">// { a: 10, b: 20, c: 30 } &lt;-- &#x6C92;&#x88AB;&#x6539;&#x5230;</span>
<span class="hljs-built_in">console</span>.log(obj2);
<span class="hljs-comment">// { a: 10, b: 100, c: 30 }</span></code></pre><h2 id="articleHeader3">&#x6DF1;&#x62F7;&#x8D1D;</h2><h3 id="articleHeader4">1.&#x624B;&#x52A8;&#x590D;&#x5236;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
obj2.b = 100;
console.log(obj1);
// { a: 10, b: 20, c: 30 } &lt;-- &#x6C92;&#x88AB;&#x6539;&#x5230;
console.log(obj2);
// { a: 10, b: 100, c: 30 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj1</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span> <span class="hljs-attr">a:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span> <span class="hljs-attr">b:</span> <span class="hljs-number">20</span><span class="hljs-string">,</span> <span class="hljs-attr">c:</span> <span class="hljs-number">30</span> <span class="hljs-string">};</span>
<span class="hljs-string">var</span> <span class="hljs-string">obj2</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span> <span class="hljs-attr">a:</span> <span class="hljs-string">obj1.a,</span> <span class="hljs-attr">b:</span> <span class="hljs-string">obj1.b,</span> <span class="hljs-attr">c:</span> <span class="hljs-string">obj1.c</span> <span class="hljs-string">};</span>
<span class="hljs-string">obj2.b</span> <span class="hljs-string">=</span> <span class="hljs-number">100</span><span class="hljs-string">;</span>
<span class="hljs-string">console.log(obj1);</span>
<span class="hljs-string">//</span> <span class="hljs-string">{</span> <span class="hljs-attr">a:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span> <span class="hljs-attr">b:</span> <span class="hljs-number">20</span><span class="hljs-string">,</span> <span class="hljs-attr">c:</span> <span class="hljs-number">30</span> <span class="hljs-string">}</span> <span class="hljs-string">&lt;--</span> <span class="hljs-string">&#x6C92;&#x88AB;&#x6539;&#x5230;</span>
<span class="hljs-string">console.log(obj2);</span>
<span class="hljs-string">//</span> <span class="hljs-string">{</span> <span class="hljs-attr">a:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span> <span class="hljs-attr">b:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span> <span class="hljs-attr">c:</span> <span class="hljs-number">30</span> <span class="hljs-string">}</span></code></pre><h3 id="articleHeader5">2.JSON&#x505A;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;</h3><p>&#x7528;JSON.stringify&#x628A;&#x5BF9;&#x8C61;&#x8F6C;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x518D;&#x7528;JSON.parse&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6210;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = { body: { a: 10 } };
var obj2 = JSON.parse(JSON.stringify(obj1));
obj2.body.a = 20;
console.log(obj1);
// { body: { a: 10 } } &lt;-- &#x6C92;&#x88AB;&#x6539;&#x5230;
console.log(obj2);
// { body: { a: 20 } }
console.log(obj1 === obj2);
// false
console.log(obj1.body === obj2.body);
// false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj1 = { <span class="hljs-attr">body</span>: { <span class="hljs-attr">a</span>: <span class="hljs-number">10</span> } };
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj1));
obj2.body.a = <span class="hljs-number">20</span>;
<span class="hljs-built_in">console</span>.log(obj1);
<span class="hljs-comment">// { body: { a: 10 } } &lt;-- &#x6C92;&#x88AB;&#x6539;&#x5230;</span>
<span class="hljs-built_in">console</span>.log(obj2);
<span class="hljs-comment">// { body: { a: 20 } }</span>
<span class="hljs-built_in">console</span>.log(obj1 === obj2);
<span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(obj1.body === obj2.body);
<span class="hljs-comment">// false</span></code></pre><p>&#x8FD9;&#x6837;&#x505A;&#x662F;&#x771F;&#x6B63;&#x7684;Deep Copy&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x7B80;&#x5355;&#x6613;&#x7528;&#x3002;</p><p>&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4E5F;&#x6709;&#x4E0D;&#x5C11;&#x574F;&#x5904;&#xFF0C;&#x8B6C;&#x5982;&#x5B83;&#x4F1A;&#x629B;&#x5F03;&#x5BF9;&#x8C61;&#x7684;constructor&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x6DF1;&#x62F7;&#x8D1D;&#x4E4B;&#x540E;&#xFF0C;&#x4E0D;&#x7BA1;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x539F;&#x6765;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5728;&#x6DF1;&#x62F7;&#x8D1D;&#x4E4B;&#x540E;&#x90FD;&#x4F1A;&#x53D8;&#x6210;Object&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x80FD;&#x6B63;&#x786E;&#x5904;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#x53EA;&#x6709; Number, String, Boolean, Array, &#x6241;&#x5E73;&#x5BF9;&#x8C61;&#xFF0C;&#x5373;&#x90A3;&#x4E9B;&#x80FD;&#x591F;&#x88AB; json &#x76F4;&#x63A5;&#x8868;&#x793A;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;RegExp&#x5BF9;&#x8C61;&#x662F;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6DF1;&#x62F7;&#x8D1D;&#x3002;</p><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x53EA;&#x6709;&#x53EF;&#x4EE5;&#x8F6C;&#x6210;JSON&#x683C;&#x5F0F;&#x7684;&#x5BF9;&#x8C61;&#x624D;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x7528;&#xFF0C;&#x50CF;function&#x6CA1;&#x529E;&#x6CD5;&#x8F6C;&#x6210;JSON&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = { fun: function(){ console.log(123) } };
var obj2 = JSON.parse(JSON.stringify(obj1));
console.log(typeof obj1.fun);
// &apos;function&apos;
console.log(typeof obj2.fun);
// &apos;undefined&apos; &lt;-- &#x6CA1;&#x590D;&#x5236;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj1 = { <span class="hljs-attr">fun</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">123</span>) } };
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj1));
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> obj1.fun);
<span class="hljs-comment">// &apos;function&apos;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> obj2.fun);
<span class="hljs-comment">// &apos;undefined&apos; &lt;-- &#x6CA1;&#x590D;&#x5236;</span></code></pre><h3 id="articleHeader6">3.&#x9012;&#x5F52;&#x62F7;&#x8D1D;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // &#x907F;&#x514D;&#x76F8;&#x4E92;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x5BFC;&#x81F4;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x5982;initalObj.a = initalObj&#x7684;&#x60C5;&#x51B5;
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === &apos;object&apos;) {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
var str = {};
var obj = { a: {a: &quot;hello&quot;, b: 21} };
deepClone(obj, str);
console.log(str.a);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">initalObj, finalObj</span>) </span>{    
  <span class="hljs-keyword">var</span> obj = finalObj || {};    
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> initalObj) {        
    <span class="hljs-keyword">var</span> prop = initalObj[i];        <span class="hljs-comment">// &#x907F;&#x514D;&#x76F8;&#x4E92;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x5BFC;&#x81F4;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x5982;initalObj.a = initalObj&#x7684;&#x60C5;&#x51B5;</span>
    <span class="hljs-keyword">if</span>(prop === obj) {            
      <span class="hljs-keyword">continue</span>;
    }        
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> prop === <span class="hljs-string">&apos;object&apos;</span>) {
      obj[i] = (prop.constructor === <span class="hljs-built_in">Array</span>) ? [] : {};            
      <span class="hljs-built_in">arguments</span>.callee(prop, obj[i]);
    } <span class="hljs-keyword">else</span> {
      obj[i] = prop;
    }
  }    
  <span class="hljs-keyword">return</span> obj;
}
<span class="hljs-keyword">var</span> str = {};
<span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">a</span>: {<span class="hljs-attr">a</span>: <span class="hljs-string">&quot;hello&quot;</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">21</span>} };
deepClone(obj, str);
<span class="hljs-built_in">console</span>.log(str.a);</code></pre><h3 id="articleHeader7">4.&#x4F7F;&#x7528;Object.create()&#x65B9;&#x6CD5;</h3><p>&#x76F4;&#x63A5;&#x4F7F;&#x7528;var newObj = Object.create(oldObj)&#xFF0C;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x6DF1;&#x62F7;&#x8D1D;&#x7684;&#x6548;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // &#x907F;&#x514D;&#x76F8;&#x4E92;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x5BFC;&#x81F4;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x5982;initalObj.a = initalObj&#x7684;&#x60C5;&#x51B5;
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === &apos;object&apos;) {
      obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">initalObj, finalObj</span>) </span>{    
  <span class="hljs-keyword">var</span> obj = finalObj || {};    
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> initalObj) {        
    <span class="hljs-keyword">var</span> prop = initalObj[i];        <span class="hljs-comment">// &#x907F;&#x514D;&#x76F8;&#x4E92;&#x5F15;&#x7528;&#x5BF9;&#x8C61;&#x5BFC;&#x81F4;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x5982;initalObj.a = initalObj&#x7684;&#x60C5;&#x51B5;</span>
    <span class="hljs-keyword">if</span>(prop === obj) {            
      <span class="hljs-keyword">continue</span>;
    }        
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> prop === <span class="hljs-string">&apos;object&apos;</span>) {
      obj[i] = (prop.constructor === <span class="hljs-built_in">Array</span>) ? [] : <span class="hljs-built_in">Object</span>.create(prop);
    } <span class="hljs-keyword">else</span> {
      obj[i] = prop;
    }
  }    
  <span class="hljs-keyword">return</span> obj;
}</code></pre><h3 id="articleHeader8">5.jquery</h3><p>jquery &#x6709;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;$.extend&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x505A; Deep Copy&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = require(&apos;jquery&apos;);
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f);
// false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;jquery&apos;</span>);
<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: { <span class="hljs-attr">f</span>: { <span class="hljs-attr">g</span>: <span class="hljs-number">1</span> } },
    <span class="hljs-attr">c</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
};
<span class="hljs-keyword">var</span> obj2 = $.extend(<span class="hljs-literal">true</span>, {}, obj1);
<span class="hljs-built_in">console</span>.log(obj1.b.f === obj2.b.f);
<span class="hljs-comment">// false</span></code></pre><h3 id="articleHeader9">6.&#x7B2C;&#x4E09;&#x65B9;&#x51FD;&#x6570;</h3><p>&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x5176;&#x5B83;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x51FD;&#x6570;&#x5E93;&#x6709;&#x6DF1;&#x62F7;&#x8D1D;function&#xFF0C;&#x5982;lodash&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js浅拷贝与深拷贝方法

## 原文链接
[https://segmentfault.com/a/1190000016440069](https://segmentfault.com/a/1190000016440069)


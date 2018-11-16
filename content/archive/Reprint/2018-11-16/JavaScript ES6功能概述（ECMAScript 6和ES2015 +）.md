---
title: 'JavaScript ES6功能概述（ECMAScript 6和ES2015 +）' 
date: 2018-11-16 2:30:06
hidden: true
slug: 82gahy2bcol
categories: [reprint]
---

{{< raw >}}
<p>JavaScript&#x5728;&#x8FC7;&#x53BB;&#x51E0;&#x5E74;&#x4E2D;&#x53D1;&#x751F;&#x4E86;&#x5F88;&#x5927;&#x7684;&#x53D8;&#x5316;&#x3002;&#x8FD9;&#x4E9B;&#x662F;&#x60A8;&#x4ECA;&#x5929;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x7684;12&#x9879;&#x65B0;&#x529F;&#x80FD;&#xFF01;</p><p>&#x8BE5;&#x8BED;&#x8A00;&#x7684;&#x65B0;&#x589E;&#x5185;&#x5BB9;&#x79F0;&#x4E3A;ECMAScript 6.&#x5B83;&#x4E5F;&#x79F0;&#x4E3A;ES6&#x6216;ES2015 +&#x3002;</p><p>&#x81EA;1995&#x5E74;JavaScript&#x6784;&#x601D;&#x4EE5;&#x6765;&#xFF0C;&#x5B83;&#x4E00;&#x76F4;&#x5728;&#x7F13;&#x6162;&#x53D1;&#x5C55;&#x3002;&#x6BCF;&#x9694;&#x51E0;&#x5E74;&#x5C31;&#x4F1A;&#x53D1;&#x751F;&#x65B0;&#x589E;&#x4E8B;&#x4EF6;&#x3002; ECMAScript&#x4E8E;1997&#x5E74;&#x6210;&#x7ACB;&#xFF0C;&#x65E8;&#x5728;&#x6307;&#x5BFC;JavaScript&#x7684;&#x53D1;&#x5C55;&#x65B9;&#x5411;&#x3002;&#x5B83;&#x5DF2;&#x7ECF;&#x53D1;&#x5E03;&#x4E86;ES3&#xFF0C;ES5&#xFF0C;ES6&#x7B49;&#x7248;&#x672C;&#x3002;</p><p>&#x5982;&#x60A8;&#x6240;&#x89C1;&#xFF0C;ES3&#xFF0C;ES5&#x548C;ES6&#x4E4B;&#x95F4;&#x5B58;&#x5728;10&#x5E74;&#x548C;6&#x5E74;&#x7684;&#x5DEE;&#x8DDD;&#x3002;&#x6B64;&#x540E;&#x6BCF;&#x5E74;&#x200B;&#x200B;&#x8FDB;&#x884C;&#x5C0F;&#x5E45;&#x589E;&#x91CF;&#x53D8;&#x66F4;&#x3002;&#x800C;&#x4E0D;&#x662F;&#x50CF;ES6&#x90A3;&#x6837;&#x4E00;&#x6B21;&#x505A;&#x5927;&#x89C4;&#x6A21;&#x7684;&#x6539;&#x53D8;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfoBn?w=1097&amp;h=230" src="https://static.alili.tech/img/bVbfoBn?w=1097&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6240;&#x6709;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x548C;&#x73AF;&#x5883;&#x90FD;&#x652F;&#x6301;ES6&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVbfoBO?w=1086&amp;h=711" src="https://static.alili.tech/img/bVbfoBO?w=1086&amp;h=711" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>Chrome&#xFF0C;MS Edge&#xFF0C;Firefox&#xFF0C;Safari&#xFF0C;Node&#x7B49;&#x7B49;&#x90FD;&#x652F;&#x6301;JavaScript ES6&#x7684;&#x5927;&#x591A;&#x6570;&#x529F;&#x80FD;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x60A8;&#x5C06;&#x5728;&#x672C;&#x6559;&#x7A0B;&#x4E2D;&#x5B66;&#x4E60;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x90FD;&#x53EF;&#x4EE5;&#x7ACB;&#x5373;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x4F7F;&#x7528;ECMAScript 6&#xFF01;</p><p>&#x60A8;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x63A7;&#x5236;&#x53F0;&#x4E0A;&#x6D4B;&#x8BD5;&#x6240;&#x6709;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x6BB5;&#xFF01;</p><h2 id="articleHeader0">&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;</h2><p>&#x4F7F;&#x7528;ES6&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;&#x4F7F;&#x7528;var&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x5230;&#x4F7F;&#x7528;let / const&#x3002;</p><p>var&#x51FA;&#x4E86;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF1F;</p><p>var&#x7684;&#x95EE;&#x9898;&#x662F;&#x53D8;&#x91CF;&#x6CC4;&#x6F0F;&#x5230;&#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x5757;&#x4E2D;&#xFF0C;&#x4F8B;&#x5982;for&#x5FAA;&#x73AF;&#x6216;if&#x5757;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var x = &apos;outer&apos;;
function test(inner) {  
  if (inner) {    
    var x = &apos;inner&apos;;// scope whole function    
        return x;
  }  
      return x;// gets redefined because line 4 declaration is hoisted
    }
    test(false);// undefined &#x1F631;
    test(true);// inner" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ES5
<span class="hljs-keyword">var</span> x = <span class="hljs-string">&apos;outer&apos;</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">(inner)</span> </span>{  
  <span class="hljs-keyword">if</span> (inner) {    
    <span class="hljs-keyword">var</span> x = <span class="hljs-string">&apos;inner&apos;</span>;<span class="hljs-comment">// scope whole function    </span>
        <span class="hljs-keyword">return</span> x;
  }  
      <span class="hljs-keyword">return</span> x;<span class="hljs-comment">// gets redefined because line 4 declaration is hoisted</span>
    }
    test(<span class="hljs-literal">false</span>);<span class="hljs-comment">// undefined &#x1F631;</span>
    test(<span class="hljs-literal">true</span>);<span class="hljs-comment">// inner</span></code></pre><p>&#x5BF9;&#x4E8E;test&#xFF08;false&#xFF09;&#x4F60;&#x4F1A;&#x671F;&#x671B;&#x8FD4;&#x56DE;outer&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x5374;&#x5F97;&#x5230;undefined&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;?</p><p>&#x56E0;&#x4E3A;&#x5373;&#x4F7F;&#x6CA1;&#x6709;&#x6267;&#x884C;if-block&#xFF0C;&#x7B2C;4&#x884C;&#x4E2D;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x201C;var x&#x201D;&#x4E5F;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x3002;</p><p>var&#x662F;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x5B83;&#x751A;&#x81F3;&#x5728;&#x88AB;&#x58F0;&#x660E;&#x4E4B;&#x524D;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6574;&#x4E2A;&#x529F;&#x80FD;&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p><p>&#x58F0;&#x660E;&#x5DF2;&#x88AB;&#x6302;&#x8F7D;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x5728;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x4E4B;&#x524D;&#x4F7F;&#x7528;&#x5B83;&#x3002;</p><p>&#x521D;&#x59CB;&#x5316;&#x4E0D;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x3002;&#x5982;&#x679C;&#x60A8;&#x4F7F;&#x7528;var &#xFF0C;&#x90A3;&#x4E48;&#x603B;&#x4F1A;&#x5C06;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x5728;&#x9876;&#x90E8;&#x3002;</p><p>&#x5728;&#x5E94;&#x7528;&#x6302;&#x8F7D;&#x89C4;&#x5219;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x66F4;&#x597D;&#x5730;&#x4E86;&#x89E3;&#x53D1;&#x751F;&#x7684;&#x60C5;&#x51B5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var x = &apos;outer&apos;;
function test(inner) {  
  var x;// HOISTED DECLARATION  
  if (inner) {    
    x = &apos;inner&apos;;// INITIALIZATION NOT HOISTED    
    return x;
  }  
  return x;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ES5
<span class="hljs-keyword">var</span> x = <span class="hljs-string">&apos;outer&apos;</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">(inner)</span> </span>{  
  <span class="hljs-keyword">var</span> x;<span class="hljs-comment">// HOISTED DECLARATION  </span>
  <span class="hljs-keyword">if</span> (inner) {    
    x = <span class="hljs-string">&apos;inner&apos;</span>;<span class="hljs-comment">// INITIALIZATION NOT HOISTED    </span>
    <span class="hljs-keyword">return</span> x;
  }  
  <span class="hljs-keyword">return</span> x;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
let x = &apos;outer&apos;;
function test(inner) {  
  if (inner) {    
      let x = &apos;inner&apos;;
    return x;
  }  
      return x;// gets result from line 1 as expected
}
test(false);// outer
test(true);// inner" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES6
<span class="hljs-keyword">let</span> x = <span class="hljs-string">&apos;outer&apos;</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">inner</span>) </span>{  
  <span class="hljs-keyword">if</span> (inner) {    
      <span class="hljs-keyword">let</span> x = <span class="hljs-string">&apos;inner&apos;</span>;
    <span class="hljs-keyword">return</span> x;
  }  
      <span class="hljs-keyword">return</span> x;<span class="hljs-comment">// gets result from line 1 as expected</span>
}
test(<span class="hljs-literal">false</span>);<span class="hljs-comment">// outer</span>
test(<span class="hljs-literal">true</span>);<span class="hljs-comment">// inner</span></code></pre><p>&#x7528;let&#x4EE3;&#x66FF;var&#x4F1A;&#x4F7F;&#x4E8B;&#x60C5;&#x6309;&#x9884;&#x671F;&#x5DE5;&#x4F5C;&#x3002;&#x5982;&#x679C;&#x672A;&#x8C03;&#x7528;if&#x5757;&#xFF0C;&#x5219;&#x53D8;&#x91CF;x&#x4E0D;&#x4F1A;&#x4ECE;&#x5757;&#x4E2D;&#x63D0;&#x5347;&#x3002;</p><h3 id="articleHeader1">hoisting&#x548C; &#x201C;temporal dead zone&#xFF08;&#x6682;&#x65F6;&#x6027;&#x6B7B;&#x533A;&#xFF09;&#x201D;</h3><p>&#x5728;ES6&#x4E2D;&#xFF0C;let&#x5C06;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x5230;&#x5757;&#x7684;&#x9876;&#x90E8;&#xFF08;&#x4E0D;&#x662F;&#x50CF;ES5&#x90A3;&#x6837;&#x4F4D;&#x4E8E;&#x51FD;&#x6570;&#x7684;&#x9876;&#x90E8;&#xFF09;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x5728;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x4E4B;&#x524D;&#x5F15;&#x7528;&#x5757;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x5BFC;&#x81F4;&#x201C;ReferenceError&#xFF08;&#x7CFB;&#x7EDF;&#x62A5;&#x9519;&#xFF09;&#x201D;&#x3002;</p><p>let&#x88AB;&#x9650;&#x5236;&#x4E3A;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x5728;&#x58F0;&#x660E;&#x4E4B;&#x524D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x5B83;&#x3002;</p><p>&#x201C;Temporal dead zone&#x201D; &#x662F;&#x4ECE;&#x5757;&#x5F00;&#x59CB;&#x5230;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7684;&#x533A;&#x57DF;&#x3002;</p><p><strong>IIFE&#xFF08;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF09;</strong></p><p>&#x8BA9;&#x6211;&#x4EEC;&#x5728;&#x89E3;&#x91CA;IIFE&#x4E4B;&#x524D;&#x5C55;&#x793A;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x3002; &#x770B;&#x770B;&#x8FD9;&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
{  
  var private = 1;
}
console.log(private);// 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>ES5
{  
  <span class="hljs-built_in">var</span> <span class="hljs-keyword">private</span> = <span class="hljs-number">1</span>;
}
console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">private</span>);<span class="hljs-comment">// 1</span></code></pre><p>&#x5982;&#x4F60;&#x6240;&#x89C1;&#xFF0C;private&#x6F0F;&#x6389;&#x4E86;&#x3002; &#x60A8;&#x9700;&#x8981;&#x4F7F;&#x7528;IIFE&#xFF08;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#x6765;&#x5305;&#x542B;&#x5B83;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
(function(){  
  var private2 = 1;})();
console.log(private2);// Uncaught ReferenceError" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
  <span class="hljs-keyword">var</span> private2 = <span class="hljs-number">1</span>;})();
<span class="hljs-built_in">console</span>.log(private2);<span class="hljs-comment">// Uncaught ReferenceError</span></code></pre><p>&#x5982;&#x679C;&#x4F60;&#x770B;&#x8FC7;jQuery / lodash&#x6216;&#x5176;&#x4ED6;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x4ED6;&#x4EEC;&#x6709;IIFE&#x6765;&#x907F;&#x514D;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x73AF;&#x5883;&#xFF0C;&#x53EA;&#x662F;&#x5728;&#x5168;&#x5C40;&#x5B9A;&#x4E49;&#xFF0C;&#x5982;_&#xFF0C;$&#x6216;jQuery&#x3002;</p><p>&#x5728;ES6&#x4E0A;&#x66F4;&#x6E05;&#x6D01;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x53EA;&#x4F7F;&#x7528;&#x5757;&#x548C;let&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x4F7F;&#x7528;IIFE&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
{  
  let private3 = 1;
}
console.log(private3);// Uncaught ReferenceError" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>ES6
{  
  <span class="hljs-keyword">let</span> private3 = <span class="hljs-number">1</span>;
}
console.<span class="hljs-built_in">log</span>(private3);<span class="hljs-comment">// Uncaught ReferenceError</span></code></pre><p><strong>Const</strong></p><p>&#x5982;&#x679C;&#x4F60;&#x6839;&#x672C;&#x4E0D;&#x60F3;&#x6539;&#x53D8;&#x53D8;&#x91CF;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;const&#x3002;</p><p>&#x7528;&apos;let&#x548C;const&#x4EE3;&#x66FF;var`&#x3002;</p><p>&#x5BF9;&#x6240;&#x6709;&#x5F15;&#x7528;&#x4F7F;&#x7528;const;&#x907F;&#x514D;&#x4F7F;&#x7528;var&#x3002;</p><p>&#x5982;&#x679C;&#x5FC5;&#x987B;&#x91CD;&#x65B0;&#x5206;&#x914D;&#x5F15;&#x7528;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528;let&#x800C;&#x4E0D;&#x662F;const&#x3002;</p><h3 id="articleHeader2">&#x6A21;&#x677F;&#x6587;&#x5B57;&#xFF08;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#xFF09;</h3><p>&#x5F53;&#x6211;&#x4EEC;&#x6709;&#x6A21;&#x677F;&#x6587;&#x5B57;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x505A;&#x66F4;&#x591A;&#x7684;&#x5D4C;&#x5957;&#x8FDE;&#x63A5;&#x3002;&#x770B;&#x4E00;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var first = &apos;Adrian&apos;;
var last = &apos;Mejia&apos;;
console.log(&apos;Your name is &apos; + first + &apos; &apos; + last + &apos;.&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-keyword">var</span> first = <span class="hljs-string">&apos;Adrian&apos;</span>;
<span class="hljs-keyword">var</span> last = <span class="hljs-string">&apos;Mejia&apos;</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Your name is &apos;</span> + first + <span class="hljs-string">&apos; &apos;</span> + last + <span class="hljs-string">&apos;.&apos;</span>);</code></pre><p>&#x73B0;&#x5728;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x53CD;&#x5F15;&#x53F7;&#x548C;&#x5B57;&#x7B26;&#x4E32;&#x63D2;&#x503C;$ {}&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const first = &apos;Adrian&apos;;
const last = &apos;Mejia&apos;;
console.log(`Your name is ${first} ${last}.`);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> first = <span class="hljs-string">&apos;Adrian&apos;</span>;
<span class="hljs-keyword">const</span> last = <span class="hljs-string">&apos;Mejia&apos;</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Your name is <span class="hljs-subst">${first}</span> <span class="hljs-subst">${last}</span>.`</span>);</code></pre><h3 id="articleHeader3">&#x591A;&#x884C;&#x5B57;&#x7B26;&#x4E32;</h3><p>&#x6211;&#x4EEC;&#x4E0D;&#x5FC5;&#x518D;&#x8FDE;&#x63A5;&#x5B57;&#x7B26;&#x4E32;+ n&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var template = &apos;&lt;li *ngFor=&quot;let todo of todos&quot; [ngClass]=&quot;{completed: todo.isDone}&quot; &gt;\n&apos; +
&apos;  &lt;div class=&quot;view&quot;&gt;\n&apos; +
&apos;    &lt;input class=&quot;toggle&quot; type=&quot;checkbox&quot; [checked]=&quot;todo.isDone&quot;&gt;\n&apos; +
&apos;    &lt;label&gt;&lt;/label&gt;\n&apos; +
&apos;    &lt;button class=&quot;destroy&quot;&gt;&lt;/button&gt;\n&apos; +
&apos;  &lt;/div&gt;\n&apos; +
&apos;  &lt;input class=&quot;edit&quot; value=&quot;&quot;&gt;\n&apos; +
&apos;&lt;/li&gt;&apos;;
console.log(template);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> template = &apos;&lt;<span class="hljs-keyword">li</span> *ngFor=<span class="hljs-string">&quot;let todo of todos&quot;</span> [ngClass]=<span class="hljs-string">&quot;{completed: todo.isDone}&quot;</span> &gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;  &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;view&quot;</span>&gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;    &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;toggle&quot;</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> [checked]=<span class="hljs-string">&quot;todo.isDone&quot;</span>&gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;    &lt;<span class="hljs-keyword">label</span>&gt;&lt;/<span class="hljs-keyword">label</span>&gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;    &lt;button <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;destroy&quot;</span>&gt;&lt;/button&gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;  &lt;/div&gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;  &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;edit&quot;</span> value=<span class="hljs-string">&quot;&quot;</span>&gt;\<span class="hljs-keyword">n</span>&apos; +
&apos;&lt;/<span class="hljs-keyword">li</span>&gt;&apos;;
console.<span class="hljs-built_in">log</span>(template);</code></pre><p>&#x5728;ES6&#x4E0A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x518D;&#x6B21;&#x4F7F;&#x7528;&#x53CD;&#x5F15;&#x53F7;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = `&lt;li *ngFor=&quot;let todo of todos&quot; [ngClass]=&quot;{completed: todo.isDone}&quot; &gt;
  &lt;div class=&quot;view&quot;&gt;
    &lt;input class=&quot;toggle&quot; type=&quot;checkbox&quot; [checked]=&quot;todo.isDone&quot;&gt;
    &lt;label&gt;&lt;/label&gt;
    &lt;button class=&quot;destroy&quot;&gt;&lt;/button&gt;
  &lt;/div&gt;
  &lt;input class=&quot;edit&quot; value=&quot;&quot;&gt;
&lt;/li&gt;`;
console.log(template);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> template = `&lt;<span class="hljs-keyword">li</span> *ngFor=<span class="hljs-string">&quot;let todo of todos&quot;</span> [ngClass]=<span class="hljs-string">&quot;{completed: todo.isDone}&quot;</span> &gt;
  &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;view&quot;</span>&gt;
    &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;toggle&quot;</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> [checked]=<span class="hljs-string">&quot;todo.isDone&quot;</span>&gt;
    &lt;<span class="hljs-keyword">label</span>&gt;&lt;/<span class="hljs-keyword">label</span>&gt;
    &lt;button <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;destroy&quot;</span>&gt;&lt;/button&gt;
  &lt;/div&gt;
  &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;edit&quot;</span> value=<span class="hljs-string">&quot;&quot;</span>&gt;
&lt;/<span class="hljs-keyword">li</span>&gt;`;
console.<span class="hljs-built_in">log</span>(template);</code></pre><p>&#x4E24;&#x6BB5;&#x4EE3;&#x7801;&#x90FD;&#x4F1A;&#x6709;&#x5B8C;&#x5168;&#x76F8;&#x540C;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><h3 id="articleHeader4">&#x89E3;&#x6784;&#x5206;&#x914D;</h3><p>ES6&#x89E3;&#x6784;&#x975E;&#x5E38;&#x6709;&#x7528;&#x548C;&#x7B80;&#x6D01;&#x3002;&#x8BF7;&#x9075;&#x5FAA;&#x4EE5;&#x4E0B;&#x793A;&#x4F8B;&#xFF1A;</p><p>&#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x83B7;&#x53D6;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var array = [1, 2, 3, 4];
var first = array[0];
var third = array[2];
console.log(first, third);// 1 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>ES5
<span class="hljs-built_in">var</span> <span class="hljs-built_in">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-built_in">var</span> <span class="hljs-built_in">first</span> = <span class="hljs-built_in">array</span>[<span class="hljs-number">0</span>];
<span class="hljs-built_in">var</span> <span class="hljs-built_in">third</span> = <span class="hljs-built_in">array</span>[<span class="hljs-number">2</span>];
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">first</span>, <span class="hljs-built_in">third</span>);// <span class="hljs-number">1</span> <span class="hljs-number">3</span></code></pre><p>es6&#x7684;&#x5199;&#x6CD5;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
const array = [1, 2, 3, 4];
const [first,third] = array;
console.log(first, third);// 1 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>ES6
const <span class="hljs-built_in">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
const [<span class="hljs-built_in">first</span>,<span class="hljs-built_in">third</span>] = <span class="hljs-built_in">array</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">first</span>, <span class="hljs-built_in">third</span>);// <span class="hljs-number">1</span> <span class="hljs-number">3</span></code></pre><p>&#x4EA4;&#x6362; values</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var a = 1;
var b = 2;
var tmp = a;
a = b;
b = tmp;
console.log(a, b);// 2 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>ES5
var a = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
var <span class="hljs-keyword">b </span>= <span class="hljs-number">2</span><span class="hljs-comment">;</span>
var tmp = a<span class="hljs-comment">;</span>
a = <span class="hljs-keyword">b;
</span><span class="hljs-keyword">b </span>= tmp<span class="hljs-comment">;</span>
console.log(a, <span class="hljs-keyword">b);// </span><span class="hljs-number">2</span> <span class="hljs-number">1</span></code></pre><p>es6&#x7684;&#x5199;&#x6CD5;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);// 2 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>ES6
let a = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
let <span class="hljs-keyword">b </span>= <span class="hljs-number">2</span><span class="hljs-comment">;</span>
[a, <span class="hljs-keyword">b] </span>= [<span class="hljs-keyword">b, </span>a]<span class="hljs-comment">;</span>
console.log(a, <span class="hljs-keyword">b);// </span><span class="hljs-number">2</span> <span class="hljs-number">1</span></code></pre><h3 id="articleHeader5">&#x591A;&#x6B21;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x89E3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
function margin() {  
  var left=1, right=2, top=3, bottom=4;
  return { 
      left: left, right: right, top: top, bottom: bottom };
}
var data = margin();
var left = data.left;
var bottom = data.bottom;
console.log(left, bottom);// 1 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>ES5
function margin() {  
  var <span class="hljs-built_in">left</span>=<span class="hljs-number">1</span>, <span class="hljs-built_in">right</span>=<span class="hljs-number">2</span>, <span class="hljs-built_in">top</span>=<span class="hljs-number">3</span>, <span class="hljs-built_in">bottom</span>=<span class="hljs-number">4</span>;
  <span class="hljs-keyword">return</span> { 
      <span class="hljs-built_in">left</span>: <span class="hljs-built_in">left</span>, <span class="hljs-built_in">right</span>: <span class="hljs-built_in">right</span>, <span class="hljs-built_in">top</span>: <span class="hljs-built_in">top</span>, <span class="hljs-built_in">bottom</span>: <span class="hljs-built_in">bottom</span> };
}
var data = margin();
var <span class="hljs-built_in">left</span> = data.<span class="hljs-built_in">left</span>;
var <span class="hljs-built_in">bottom</span> = data.<span class="hljs-built_in">bottom</span>;
console.log(<span class="hljs-built_in">left</span>, <span class="hljs-built_in">bottom</span>);// <span class="hljs-number">1</span> <span class="hljs-number">4</span></code></pre><p>&#x5728;&#x7B2C;3&#x884C;&#x4E2D;&#xFF0C;&#x60A8;&#x8FD8;&#x53EF;&#x4EE5;&#x5C06;&#x5176;&#x8FD4;&#x56DE;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#xFF08;&#x5E76;&#x4FDD;&#x5B58;&#x4E00;&#x4E9B;&#x8F93;&#x5165;&#xFF09;&#xFF1A;</p><p><code>return [left, right, top, bottom];</code><br>&#x4F46;&#x662F;&#xFF0C;&#x8C03;&#x7528;&#x8005;&#x9700;&#x8981;&#x8003;&#x8651;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x7684;&#x987A;&#x5E8F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var left = data[0];
var bottom = data[3];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-attribute">left</span> = data[<span class="hljs-number">0</span>];
<span class="hljs-selector-tag">var</span> <span class="hljs-attribute">bottom</span> = data[<span class="hljs-number">3</span>];</code></pre><p>&#x4F7F;&#x7528;ES6&#xFF0C;&#x8C03;&#x7528;&#x8005;&#x53EA;&#x9009;&#x62E9;&#x4ED6;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#xFF08;&#x7B2C;6&#x884C;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
function margin() {  
  const left=1, right=2, top=3, bottom=4;
  return { left, right, top, bottom };
}
const { left, bottom } = margin();
console.log(left, bottom);// 1 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>ES6
function margin() {  
  const <span class="hljs-built_in">left</span>=<span class="hljs-number">1</span>, <span class="hljs-built_in">right</span>=<span class="hljs-number">2</span>, <span class="hljs-built_in">top</span>=<span class="hljs-number">3</span>, <span class="hljs-built_in">bottom</span>=<span class="hljs-number">4</span>;
  <span class="hljs-keyword">return</span> { <span class="hljs-built_in">left</span>, <span class="hljs-built_in">right</span>, <span class="hljs-built_in">top</span>, <span class="hljs-built_in">bottom</span> };
}
const { <span class="hljs-built_in">left</span>, <span class="hljs-built_in">bottom</span> } = margin();
console.log(<span class="hljs-built_in">left</span>, <span class="hljs-built_in">bottom</span>);// <span class="hljs-number">1</span> <span class="hljs-number">4</span></code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x7B2C;3&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x4E00;&#x4E9B;ES6&#x529F;&#x80FD;&#x6B63;&#x5728;&#x8FDB;&#x884C;&#x4E2D;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;{left&#xFF1A;left}&#x538B;&#x7F29;&#x4E3A;{left}&#x3002;&#x770B;&#x770B;&#x5B83;&#x4E0E;ES5&#x7248;&#x672C;&#x76F8;&#x6BD4;&#x6709;&#x591A;&#x7B80;&#x6D01;&#x3002;&#x90A3;&#x4E0D;&#x662F;&#x5F88;&#x9177;&#x5417;&#xFF1F;</blockquote><h3 id="articleHeader6">&#x53C2;&#x6570;&#x5339;&#x914D;&#x7684;&#x89E3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var user = {
  firstName: &apos;Adrian&apos;, lastName: &apos;Mejia&apos;
};
function getFullName(user) {  
  var firstName = user.firstName;
  var lastName = user.lastName;
  return firstName + &apos; &apos; + lastName;
}
console.log(getFullName(user));// Adrian Mejia" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-keyword">var</span> user = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Adrian&apos;</span>, <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Mejia&apos;</span>
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">user</span>) </span>{  
  <span class="hljs-keyword">var</span> firstName = user.firstName;
  <span class="hljs-keyword">var</span> lastName = user.lastName;
  <span class="hljs-keyword">return</span> firstName + <span class="hljs-string">&apos; &apos;</span> + lastName;
}
<span class="hljs-built_in">console</span>.log(getFullName(user));<span class="hljs-comment">// Adrian Mejia</span></code></pre><p>es6(&#x4F46;&#x66F4;&#x7B80;&#x6D01;&#xFF09;&#x76F8;&#x540C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
const user = {
  firstName: &apos;Adrian&apos;, lastName: &apos;Mejia&apos;
};
function getFullName({ 
  firstName, lastName 
}) {  return ${firstName} ${lastName};}
console.log(getFullName(user));// Adrian Mejia" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES6
<span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Adrian&apos;</span>, <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Mejia&apos;</span>
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">{ 
  firstName, lastName 
}</span>) </span>{  <span class="hljs-keyword">return</span> ${firstName} ${lastName};}
<span class="hljs-built_in">console</span>.log(getFullName(user));<span class="hljs-comment">// Adrian Mejia</span></code></pre><p>&#x6DF1;&#x62F7;&#x8D1D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
function settings() {  
  return { display: { color: &apos;red&apos; }, keyboard: { layout: &apos;querty&apos;} };}
var tmp = settings();
var displayColor = tmp.display.color;var keyboardLayout = tmp.keyboard.layout;
console.log(displayColor, keyboardLayout);// red querty" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">settings</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">display</span>: { <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;red&apos;</span> }, <span class="hljs-attr">keyboard</span>: { <span class="hljs-attr">layout</span>: <span class="hljs-string">&apos;querty&apos;</span>} };}
<span class="hljs-keyword">var</span> tmp = settings();
<span class="hljs-keyword">var</span> displayColor = tmp.display.color;<span class="hljs-keyword">var</span> keyboardLayout = tmp.keyboard.layout;
<span class="hljs-built_in">console</span>.log(displayColor, keyboardLayout);<span class="hljs-comment">// red querty</span></code></pre><p>&#x4E0E;es6&#xFF08;&#x4F46;&#x66F4;&#x7B80;&#x6D01;&#xFF09;&#x76F8;&#x540C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
function settings() {  
  return { display: { color: &apos;red&apos; }, keyboard: { layout: &apos;querty&apos;} };
}
const { 
  display: { color: displayColor }, keyboard: { layout: keyboardLayout }
} = settings();
console.log(displayColor, keyboardLayout);// red querty" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>ES6
function settings() {  
  <span class="hljs-keyword">return</span> { <span class="hljs-string">display:</span> { <span class="hljs-string">color:</span> <span class="hljs-string">&apos;red&apos;</span> }, <span class="hljs-string">keyboard:</span> { <span class="hljs-string">layout:</span> <span class="hljs-string">&apos;querty&apos;</span>} };
}
const { 
<span class="hljs-symbol">  display:</span> { <span class="hljs-string">color:</span> displayColor }, <span class="hljs-string">keyboard:</span> { <span class="hljs-string">layout:</span> keyboardLayout }
} = settings();
console.log(displayColor, keyboardLayout);<span class="hljs-comment">// red querty</span></code></pre><p>&#x8FD9;&#x4E5F;&#x79F0;&#x4E3A;&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#x3002;</p><p>&#x5982;&#x60A8;&#x6240;&#x89C1;&#xFF0C;&#x8FD9;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x5E76;&#x9F13;&#x52B1;&#x826F;&#x597D;&#x7684;&#x7F16;&#x7801;&#x98CE;&#x683C;&#x3002;</p><p>&#x6700;&#x4F73;&#x505A;&#x6CD5;&#xFF1A;</p><ul><li>&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x89E3;&#x6784;&#x6765;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x6216;&#x4EA4;&#x6362;&#x53D8;&#x91CF;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x60A8;&#x907F;&#x514D;&#x521B;&#x5EFA;&#x4E34;&#x65F6;&#x5F15;&#x7528;&#x3002;</li><li>&#x4E0D;&#x8981;&#x5BF9;&#x591A;&#x4E2A;&#x8FD4;&#x56DE;&#x503C;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x89E3;&#x6784;&#xFF0C;&#x800C;&#x662F;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x89E3;&#x6784;</li></ul><h3 id="articleHeader7">&#x7C7B;&#x548C;&#x5BF9;&#x8C61;</h3><p>&#x4F7F;&#x7528;ECMAScript 6&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;&#x201C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x201D;&#x5230;&#x201C;&#x7C7B;&#x3002;</p><p>&#x5728;JavaScript&#x4E2D;&#xFF0C;&#x6BCF;&#x4E2A;&#x5BF9;&#x8C61;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#xFF0C;&#x8FD9;&#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x6240;&#x6709;JavaScript&#x5BF9;&#x8C61;&#x90FD;&#x4ECE;&#x5176;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x5176;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x3002;</p><p>&#x5728;ES5&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x521B;&#x5EFA;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&#xFF08;OOP&#xFF09;&#xFF0C;&#x4EE5;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var Animal = (function () {  
  function MyConstructor(name) {    this.name = name;
}  
MyConstructor.prototype.speak = function speak() {    console.log(this.name + &apos; makes a noise.&apos;);
};
return MyConstructor;})();
var animal = new Animal(&apos;animal&apos;);
animal.speak();// animal makes a noise.
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-keyword">var</span> Animal = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyConstructor</span>(<span class="hljs-params">name</span>) </span>{    <span class="hljs-keyword">this</span>.name = name;
}  
MyConstructor.prototype.speak = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speak</span>(<span class="hljs-params"></span>) </span>{    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos; makes a noise.&apos;</span>);
};
<span class="hljs-keyword">return</span> MyConstructor;})();
<span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">&apos;animal&apos;</span>);
animal.speak();<span class="hljs-comment">// animal makes a noise.</span>
</code></pre><p>&#x5728;ES6&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E9B;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;&#x66F4;&#x5C11;&#x7684;&#x6837;&#x677F;&#x548C;&#x65B0;&#x7684;&#x5173;&#x952E;&#x5B57;&#x6765;&#x505A;&#x540C;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6BD4;&#x5982;class&#x548C;constructor&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x8BF7;&#x6CE8;&#x610F;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor.prototype.speak = function&#xFF08;&#xFF09;vsspeed&#xFF08;&#xFF09;&#xFF1A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code style="word-break:break-word;white-space:initial"><span class="hljs-function"><span class="hljs-keyword">constructor</span>.<span class="hljs-title">prototype</span>.<span class="hljs-title">speak</span> = <span class="hljs-title">function</span>&#xFF08;&#xFF09;<span class="hljs-title">vsspeed</span>&#xFF08;&#xFF09;&#xFF1A;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
class Animal {  
  constructor(name) {    this.name = name;}  
    speak() {    console.log(this.name + &apos; makes a noise.&apos;);
 }
}
const animal = new Animal(&apos;animal&apos;);
animal.speak();// animal makes a noise." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES6
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{  
  <span class="hljs-keyword">constructor</span>(name) {    <span class="hljs-keyword">this</span>.name = name;}  
    speak() {    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos; makes a noise.&apos;</span>);
 }
}
<span class="hljs-keyword">const</span> animal = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">&apos;animal&apos;</span>);
animal.speak();<span class="hljs-comment">// animal makes a noise.</span></code></pre><p>&#x6B63;&#x5982;&#x6211;&#x4EEC;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x4E24;&#x79CD;&#x98CE;&#x683C;&#xFF08;ES5 / 6&#xFF09;&#x5728;&#x5E55;&#x540E;&#x4EA7;&#x751F;&#x76F8;&#x540C;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5E76;&#x4EE5;&#x76F8;&#x540C;&#x7684;&#x65B9;&#x5F0F;&#x4F7F;&#x7528;&#x3002;</p><p>&#x6700;&#x4F73;&#x505A;&#x6CD5;&#xFF1A;</p><ul><li>&#x59CB;&#x7EC8;&#x4F7F;&#x7528;class&#x8BED;&#x6CD5;&#x5E76;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;prototype&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x56E0;&#x4E3A;&#x5B83;&#x4F7F;&#x4EE3;&#x7801;&#x66F4;&#x7B80;&#x6D01;&#xFF0C;&#x66F4;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x3002;</li><li>&#x907F;&#x514D;&#x4F7F;&#x7528;&#x7A7A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x672A;&#x6307;&#x5B9A;&#xFF0C;&#x5219;&#x7C7B;&#x5177;&#x6709;&#x9ED8;&#x8BA4;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</li></ul><h3 id="articleHeader8">&#x7EE7;&#x627F;</h3><p>&#x5EFA;&#x7ACB;&#x5728;&#x4E4B;&#x524D;&#x7684;Animal&#x7C7B;&#x4E0A;&#x3002;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x6269;&#x5C55;&#x5B83;&#x5E76;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x201C;Lion&#x201D;&#x7C7B;</p><p>&#x5728;ES5&#x4E2D;&#xFF0C;&#x5B83;&#x66F4;&#x591A;&#x5730;&#x6D89;&#x53CA;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var Lion = (function () {  
  function MyConstructor(name){    
      Animal.call(this, name);
}  
// prototypal inheritance  
MyConstructor.prototype = Object.create(Animal.prototype);
MyConstructor.prototype.constructor = Animal;
MyConstructor.prototype.speak = function speak() {    
  Animal.prototype.speak.call(this);
  console.log(this.name + &apos; roars &#x1F981;&apos;);
};
return MyConstructor;})();
var lion = new Lion(&apos;Simba&apos;);lion.speak();// Simba makes a noise.
// Simba roars." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-keyword">var</span> Lion = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyConstructor</span>(<span class="hljs-params">name</span>)</span>{    
      Animal.call(<span class="hljs-keyword">this</span>, name);
}  
<span class="hljs-comment">// prototypal inheritance  </span>
MyConstructor.prototype = <span class="hljs-built_in">Object</span>.create(Animal.prototype);
MyConstructor.prototype.constructor = Animal;
MyConstructor.prototype.speak = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speak</span>(<span class="hljs-params"></span>) </span>{    
  Animal.prototype.speak.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos; roars &#x1F981;&apos;</span>);
};
<span class="hljs-keyword">return</span> MyConstructor;})();
<span class="hljs-keyword">var</span> lion = <span class="hljs-keyword">new</span> Lion(<span class="hljs-string">&apos;Simba&apos;</span>);lion.speak();<span class="hljs-comment">// Simba makes a noise.</span>
<span class="hljs-comment">// Simba roars.</span></code></pre><p>&#x6211;&#x4E0D;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x6240;&#x6709;&#x7EC6;&#x8282;&#xFF0C;&#x4F46;&#x8BF7;&#x6CE8;&#x610F;&#xFF1A;</p><ul><li>&#x7B2C;3&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x53C2;&#x6570;&#x663E;&#x5F0F;&#x8C03;&#x7528;Animal&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</li><li>&#x7B2C;7-8&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;Lion&#x539F;&#x578B;&#x5206;&#x914D;&#x7ED9;Animal&#x7684;&#x539F;&#x578B;&#x3002;</li><li>&#x7B2C;11&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;&#x7236;&#x7C7B;Animal&#x4E2D;&#x8C03;&#x7528;speak&#x65B9;&#x6CD5;&#x3002;</li></ul><p>&#x5728;ES6&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5173;&#x952E;&#x5B57;extends&#x548C;super&#xFF01;[superman shield]&#xFF08;undefined&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lion extends Animal {  
  speak() {    super.speak();
  console.log(this.name + &apos; roars &#x1F981;&apos;);
"}}"
const lion = new Lion(&apos;Simba&apos;);
lion.speak();// Simba makes a noise.
// Simba roars.
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lion</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{  
  speak() {    <span class="hljs-keyword">super</span>.speak();
  console.log(<span class="hljs-keyword">this</span>.name + &apos; roars &#x1F981;&apos;);
"}}"
const lion = <span class="hljs-keyword">new</span> <span class="hljs-type">Lion</span>(<span class="hljs-symbol">&apos;Simb</span>a&apos;);
lion.speak();<span class="hljs-comment">// Simba makes a noise.</span>
<span class="hljs-comment">// Simba roars.</span>
</code></pre><p>&#x770B;&#x8D77;&#x6765;&#x8FD9;&#x4E2A;ES6&#x4EE3;&#x7801;&#x4E0E;ES5&#x76F8;&#x6BD4;&#x770B;&#x8D77;&#x6765;&#x6709;&#x591A;&#x6E05;&#x6670;&#xFF0C;&#x5B83;&#x4EEC;&#x5B8C;&#x5168;&#x76F8;&#x540C;&#x3002;</p><p>&#x6700;&#x4F73;&#x505A;&#x6CD5;&#xFF1A;</p><p>&#x4F7F;&#x7528;&#x5185;&#x7F6E;&#x7684;&#x65B9;&#x5F0F;&#x7EE7;&#x627F;extends&#x3002;</p><h3 id="articleHeader9">Promises</h3><p>&#x6211;&#x4EEC;&#x4ECE;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x1F479;&#x9003;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
function printAfterTimeout(string, timeout, done){  
  setTimeout(function(){    
      done(string);
}, timeout);}
printAfterTimeout(&apos;Hello &apos;, 2e3, function(result){  
  console.log(result);// nested callback  
  printAfterTimeout(result + &apos;Reader&apos;, 2e3, function(result){    
    console.log(result);
 });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>ES5
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printAfterTimeout</span>(<span class="hljs-params">string, timeout, done</span>)</span>{  
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
      done(<span class="hljs-built_in">string</span>);
}, timeout);}
printAfterTimeout(<span class="hljs-string">&apos;Hello &apos;</span>, <span class="hljs-number">2e3</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{  
  <span class="hljs-built_in">console</span>.log(result);<span class="hljs-comment">// nested callback  </span>
  printAfterTimeout(result + <span class="hljs-string">&apos;Reader&apos;</span>, <span class="hljs-number">2e3</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{    
    <span class="hljs-built_in">console</span>.log(result);
 });
});</code></pre><p>&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x56DE;&#x8C03;&#xFF0C;&#x5F53;done&#x65F6;&#x6267;&#x884C;&#x3002;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;&#x5730;&#x6267;&#x884C;&#x5B83;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5728;&#x56DE;&#x8C03;&#x4E2D;&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;&apos;printAfterTimeout`&#x7684;&#x539F;&#x56E0;&#x3002;</p><p>&#x5982;&#x679C;&#x60A8;&#x9700;&#x8981;&#x7B2C;3&#x6B21;&#x6216;&#x7B2C;4&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x8FD9;&#x53EF;&#x80FD;&#x4F1A;&#x5F88;&#x5FEB;&#x53D8;&#x5F97;&#x6DF7;&#x4E71;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x901A;&#x8FC7;Promises&#x6765;&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
function printAfterTimeout(string, timeout){  
  return new Promise((resolve, reject) =&gt; {    
      setTimeout(function(){      
      resolve(string);
}, timeout);
});}
printAfterTimeout(&apos;Hello &apos;, 2e3).then((result) =&gt; {  
  console.log(result);
  return printAfterTimeout(result + &apos;Reader&apos;, 2e3);
}).then((result) =&gt; {  
  console.log(result);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES6
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printAfterTimeout</span>(<span class="hljs-params">string, timeout</span>)</span>{  
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {    
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{      
      resolve(string);
}, timeout);
});}
printAfterTimeout(<span class="hljs-string">&apos;Hello &apos;</span>, <span class="hljs-number">2e3</span>).then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {  
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-keyword">return</span> printAfterTimeout(result + <span class="hljs-string">&apos;Reader&apos;</span>, <span class="hljs-number">2e3</span>);
}).then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {  
  <span class="hljs-built_in">console</span>.log(result);
});</code></pre><p>&#x6B63;&#x5982;&#x4F60;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x4F7F;&#x7528;promises&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;then&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5B8C;&#x6210;&#x540E;&#x6267;&#x884C;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#x3002; &#x4E0D;&#x518D;&#x9700;&#x8981;&#x4FDD;&#x6301;&#x5D4C;&#x5957;&#x529F;&#x80FD;&#x3002;</p><h3 id="articleHeader10">&#x7BAD;&#x5934;&#x51FD;&#x6570;</h3><p>ES6&#x6CA1;&#x6709;&#x5220;&#x9664;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4F46;&#x5B83;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x65B0;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p>&#x5728;ES5&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;this&#x6709;&#x4E00;&#x4E9B;&#x7591;&#x95EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var _this = this;// need to hold a reference
$(&apos;.btn&apos;).click(function(event){  
  _this.sendData();// reference outer this
});
$(&apos;.input&apos;).on(&apos;change&apos;,function(event){  
  this.sendData();// reference outer this
}.bind(this));// bind to outer this
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;<span class="hljs-comment">// need to hold a reference</span>
$(<span class="hljs-string">&apos;.btn&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{  
  _this.sendData();<span class="hljs-comment">// reference outer this</span>
});
$(<span class="hljs-string">&apos;.input&apos;</span>).on(<span class="hljs-string">&apos;change&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{  
  <span class="hljs-keyword">this</span>.sendData();<span class="hljs-comment">// reference outer this</span>
}.bind(<span class="hljs-keyword">this</span>));<span class="hljs-comment">// bind to outer this</span>
</code></pre><p>&#x4F60;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x7684;this&#x6765;&#x5F15;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6216;&#x4F7F;&#x7528;bind&#x3002;&#x5728;ES6&#x4E2D;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
// this will reference the outer one
$(&apos;.btn&apos;).click((event) =&gt;  this.sendData());
// implicit returns
const ids = [291, 288, 984];
const messages = ids.map(value =&gt; `ID is ${value}`);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES6
<span class="hljs-comment">// this will reference the outer one</span>
$(<span class="hljs-string">&apos;.btn&apos;</span>).click(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span>  <span class="hljs-keyword">this</span>.sendData());
<span class="hljs-comment">// implicit returns</span>
<span class="hljs-keyword">const</span> ids = [<span class="hljs-number">291</span>, <span class="hljs-number">288</span>, <span class="hljs-number">984</span>];
<span class="hljs-keyword">const</span> messages = ids.map(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-string">`ID is <span class="hljs-subst">${value}</span>`</span>);</code></pre><h2 id="articleHeader11">For&#x2026;of</h2><p>&#x6211;&#x4EEC;&#x4ECE;for&#x8F6C;&#x5230;forEach&#x7136;&#x540E;&#x8F6C;&#x5230;for ... of&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
// for
var array = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;];
for (var i = 0;i &lt; array.length;i++) {  
  var element = array[i];
  console.log(element);
}

// forEach
array.forEach(
  function (element) {  
    console.log(element);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code>ES5
<span class="hljs-comment">// for</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">array</span> = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-keyword">array</span>.length;i++) {  
  <span class="hljs-keyword">var</span> element = <span class="hljs-keyword">array</span>[i];
  console.log(element);
}

<span class="hljs-comment">// forEach</span>
<span class="hljs-keyword">array</span>.<span class="hljs-keyword">forEach</span>(
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element)</span> </span>{  
    console.log(element);
});</code></pre><p>ES6 for ...&#x4E5F;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x8FED;&#x4EE3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
// for ...of
const array = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;];
for (const element of array) {    
 console.log(element); // a,b,c,d
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>ES6
<span class="hljs-comment">// for ...of</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">array</span> = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> element of <span class="hljs-built_in">array</span>) {    
 console.<span class="hljs-built_in">log</span>(element); <span class="hljs-comment">// a,b,c,d</span>
}</code></pre><h3 id="articleHeader12">&#x9ED8;&#x8BA4;&#x53C2;&#x6570;</h3><p>&#x6211;&#x4EEC;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5B9A;&#x4E49;&#x4E86;&#x53D8;&#x91CF;&#x4EE5;&#x5C06;&#x503C;&#x8D4B;&#x7ED9;&#x201C;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x201D;&#x3002;&#x4F60;&#x4E4B;&#x524D;&#x505A;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x4E8B;&#x5417;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
function point(x, y, isFlag){
  x = x || 0;
  y = y || -1;
  isFlag = isFlag || true;
  console.log(x,y, isFlag);
}
point(0, 0) // 0 -1 true &#x1F631;
point(0, 0, false) // 0 -1 true &#x1F631;&#x1F631;
point(1) // 1 -1 true
point() // 0 -1 true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>ES5
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">point</span>(<span class="hljs-params">x, y, isFlag</span>)</span>{
  x = x || <span class="hljs-number">0</span>;
  y = y || <span class="hljs-number">-1</span>;
  isFlag = isFlag || <span class="hljs-literal">true</span>;
  <span class="hljs-built_in">console</span>.log(x,y, isFlag);
}
<span class="hljs-built_in">point</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// 0 -1 true &#x1F631;</span>
<span class="hljs-built_in">point</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>) <span class="hljs-comment">// 0 -1 true &#x1F631;&#x1F631;</span>
<span class="hljs-built_in">point</span>(<span class="hljs-number">1</span>) <span class="hljs-comment">// 1 -1 true</span>
<span class="hljs-built_in">point</span>() <span class="hljs-comment">// 0 -1 true</span></code></pre><p>&#x68C0;&#x67E5;&#x7684;&#x5E38;&#x89C1;&#x6A21;&#x5F0F;&#x662F;&#x53D8;&#x91CF;&#x5177;&#x6709;&#x503C;&#x6216;&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x8BF7;&#x6CE8;&#x610F;&#x6709;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF1A;</p><p>&#x7B2C;8&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x4F20;&#x9012;0,0&#x5E76;&#x5F97;&#x5230;&apos;0&#xFF0C;-1`</p><p>&#x7B2C;9&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x4F20;&#x9012;false&#x4F46;&#x5F97;&#x5230;&apos;true`&#x3002;</p><p>&#x5982;&#x679C;&#x60A8;&#x5C06;&#x5E03;&#x5C14;&#x503C;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x6216;&#x5C06;&#x503C;&#x8BBE;&#x7F6E;&#x4E3A;&#x96F6;&#xFF0C;&#x5219;&#x5B83;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x4F60;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x5417;&#xFF1F;&#xFF1F;&#xFF1F;&#x6211;&#x4F1A;&#x5728;ES6&#x4F8B;&#x5B50;&#x540E;&#x544A;&#x8BC9;&#x4F60;;&#xFF09;</p><p>&#x4F7F;&#x7528;ES6&#xFF0C;&#x73B0;&#x5728;&#x60A8;&#x53EF;&#x4EE5;&#x7528;&#x66F4;&#x5C11;&#x7684;&#x4EE3;&#x7801;&#x505A;&#x5F97;&#x66F4;&#x597D;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
function point(x = 0, y = -1, isFlag = true){
  console.log(x,y, isFlag);
}
point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>ES6
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">point</span>(<span class="hljs-params">x = 0, y = -1, isFlag = true</span>)</span>{
  <span class="hljs-built_in">console</span>.log(x,y, isFlag);
}
<span class="hljs-built_in">point</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// 0 0 true</span>
<span class="hljs-built_in">point</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>) <span class="hljs-comment">// 0 0 false</span>
<span class="hljs-built_in">point</span>(<span class="hljs-number">1</span>) <span class="hljs-comment">// 1 -1 true</span>
<span class="hljs-built_in">point</span>() <span class="hljs-comment">// 0 -1 true</span>
</code></pre><p>&#x6CE8;&#x610F;&#x7B2C;5&#x884C;&#x548C;&#x7B2C;6&#x884C;&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x4E86;&#x9884;&#x671F;&#x7684;&#x7ED3;&#x679C;&#x3002;ES5&#x793A;&#x4F8B;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x9996;&#x5148;&#x68C0;&#x67E5;undefined&#xFF0C;&#x56E0;&#x4E3A;false&#xFF0C;null&#xFF0C;undefined&#x548C;0&#x662F;&#x5047;&#x503C;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9003;&#x8131;&#x6570;&#x5B57;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
function point(x, y, isFlag){
  x = x || 0;
  y = typeof(y) === &apos;undefined&apos; ? -1 : y;
  isFlag = typeof(isFlag) === &apos;undefined&apos; ? true : isFlag;
  console.log(x,y, isFlag);
}
point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>ES5
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">point</span>(<span class="hljs-params">x, y, isFlag</span>)</span>{
  x = x || <span class="hljs-number">0</span>;
  y = <span class="hljs-keyword">typeof</span>(y) === <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-number">-1</span> : y;
  isFlag = <span class="hljs-keyword">typeof</span>(isFlag) === <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-attribute">true</span> : isFlag;
  <span class="hljs-built_in">console</span>.log(x,y, isFlag);
}
<span class="hljs-built_in">point</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// 0 0 true</span>
<span class="hljs-built_in">point</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>) <span class="hljs-comment">// 0 0 false</span>
<span class="hljs-built_in">point</span>(<span class="hljs-number">1</span>) <span class="hljs-comment">// 1 -1 true</span>
<span class="hljs-built_in">point</span>() <span class="hljs-comment">// 0 -1 true</span></code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x68C0;&#x67E5;undefined&#x65F6;&#xFF0C;&#x5B83;&#x6309;&#x9884;&#x671F;&#x5DE5;&#x4F5C;&#x3002;</p><h2 id="articleHeader13">Rest parameters</h2><p>&#x5728;ES5&#x4E0A;&#xFF0C;&#x83B7;&#x53D6;&#x4EFB;&#x610F;&#x6570;&#x91CF;&#x7684;&#x53C2;&#x6570;&#x662F;&#x6210;&#x719F;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
function printf(format) {
  var params = [].slice.call(arguments, 1);
  console.log(&apos;params: &apos;, params);
  console.log(&apos;format: &apos;, format);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printf</span>(<span class="hljs-params">format</span>) </span>{
  <span class="hljs-keyword">var</span> params = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;params: &apos;</span>, params);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;format: &apos;</span>, format);
}</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;rest&#x8FD0;&#x7B97;&#x7B26;...&#x6765;&#x505A;&#x540C;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
function printf(format, ...params) {
  console.log(&apos;params: &apos;, params);
  console.log(&apos;format: &apos;, format);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ES6
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printf</span><span class="hljs-params">(format, <span class="hljs-rest_arg">...params</span>)</span> </span>{
  console.log(<span class="hljs-string">&apos;params: &apos;</span>, params);
  console.log(<span class="hljs-string">&apos;format: &apos;</span>, format);
}</code></pre><h2 id="articleHeader14">&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;</h2><p>&#x6211;&#x4EEC;&#x4ECE;apply&#xFF08;&#xFF09;&#x8F6C;&#x5230;&#x4E86;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x3002;</p><p>&#x63D0;&#x9192;&#xFF1A;&#x6211;&#x4EEC;&#x4F7F;&#x7528;apply&#xFF08;&#xFF09;&#x5C06;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x53C2;&#x6570;&#x5217;&#x8868;&#x3002;&#x4F8B;&#x5982;&#xFF0C;Math.max&#xFF08;&#xFF09;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5217;&#x8868;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;apply&#x6765;&#x4F7F;&#x5B83;&#x5DE5;&#x4F5C;&#x3002;</p><p>&#x6B63;&#x5982;&#x6211;&#x4EEC;&#x5728;&#x524D;&#x9762;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;apply&#x6765;&#x4F20;&#x9012;&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x5217;&#x8868;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
Math.max.apply(Math, [2,100,1,6,43]) // 100" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>ES5
Math.max.apply(Math, [<span class="hljs-number">2</span>,<span class="hljs-number">100</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">43</span>]) <span class="hljs-comment">// 100</span></code></pre><p>&#x5728;ES6&#x4E2D;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
Math.max(...[2,100,1,6,43]) // 100" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>ES6
Math.max(...[<span class="hljs-number">2</span>,<span class="hljs-number">100</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">43</span>]) <span class="hljs-comment">// 100</span></code></pre><p>&#x53E6;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;concat&#x6570;&#x7EC4;&#x5F00;&#x59CB;&#x4F7F;&#x7528;spread&#xFF08;&#x5C55;&#x5F00;&#xFF09;&#x8FD0;&#x7B97;&#x7B26;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5
var array1 = [2,100,1,6,43];
var array2 = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;];
var array3 = [false, true, null, undefined];
console.log(array1.concat(array2, array3));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES5
<span class="hljs-keyword">var</span> array1 = [<span class="hljs-number">2</span>,<span class="hljs-number">100</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">43</span>];
<span class="hljs-keyword">var</span> array2 = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>];
<span class="hljs-keyword">var</span> array3 = [<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">undefined</span>];
<span class="hljs-built_in">console</span>.log(array1.concat(array2, array3));</code></pre><p>&#x5728;ES6&#x4E2D;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;spread&#x8FD0;&#x7B97;&#x7B26;&#x5C55;&#x5E73;&#x5D4C;&#x5957;&#x6570;&#x7EC4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES6
const array1 = [2,100,1,6,43];
const array2 = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, &apos;d&apos;];
const array3 = [false, true, null, undefined];
console.log([...array1, ...array2, ...array3]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>ES6
<span class="hljs-keyword">const</span> array1 = [<span class="hljs-number">2</span>,<span class="hljs-number">100</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">43</span>];
<span class="hljs-keyword">const</span> array2 = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>, <span class="hljs-string">&apos;d&apos;</span>];
<span class="hljs-keyword">const</span> array3 = [<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">undefined</span>];
<span class="hljs-built_in">console</span>.log([...array1, ...array2, ...array3]);</code></pre><p>JavaScript&#x7ECF;&#x5386;&#x4E86;&#x5F88;&#x591A;&#x53D8;&#x5316;&#x3002;&#x672C;&#x6587;&#x4ECB;&#x7ECD;&#x4E86;&#x6BCF;&#x4E2A;JavaScript&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x5E94;&#x8BE5;&#x4E86;&#x89E3;&#x7684;&#x5927;&#x591A;&#x6570;&#x6838;&#x5FC3;&#x529F;&#x80FD;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x4ECB;&#x7ECD;&#x4E86;&#x4E00;&#x4E9B;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x4EE5;&#x4F7F;&#x60A8;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x7B80;&#x6D01;&#xFF0C;&#x66F4;&#x5BB9;&#x6613;&#x63A8;&#x7406;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript ES6功能概述（ECMAScript 6和ES2015 +）

## 原文链接
[https://segmentfault.com/a/1190000016023769](https://segmentfault.com/a/1190000016023769)


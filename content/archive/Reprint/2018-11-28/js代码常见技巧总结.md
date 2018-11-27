---
title: 'js代码常见技巧总结' 
date: 2018-11-28 2:30:11
hidden: true
slug: 8vobqc6mmjd
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#xFF08;&#x96BE;&#x5F97;&#x4ECE;&#x7E41;&#x91CD;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x4E2D;&#x62BD;&#x8EAB;&#xFF0C;&#x66F4;&#x65B0;&#x4E00;&#x4E0B;&#x6587;&#x7AE0;&#xFF09;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x548C;&#x6280;&#x672F;&#x65E5;&#x76CA;&#x53D1;&#x5C55;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x7BA1;&#x600E;&#x4E48;&#x53D8;&#xFF0C;js&#x6C38;&#x8FDC;&#x90FD;&#x662F;&#x6700;&#x91CD;&#x8981;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x672C;&#x6587;&#x8BB0;&#x5F55;&#x548C;&#x603B;&#x7ED3;&#x4E00;&#x4E9B;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x5E38;&#x89C1;&#x7684;js&#x4EE3;&#x7801;&#x6280;&#x5DE7;&#x548C;&#x8BEF;&#x533A;&#xFF0C;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x3002;</p><h2 id="articleHeader1">&#x6B63;&#x6587;</h2><h3 id="articleHeader2">1. &#x907F;&#x514D;&#x94FE;&#x5F0F;&#x58F0;&#x660E;</h3><p>&#x540E;&#x679C;&#xFF1A;&#x53EF;&#x80FD;&#x5F15;&#x5165;&#x5168;&#x5C40;&#x53D8;&#x91CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //&#x9519;&#x8BEF;&#x7684;&#x5199;&#x6CD5;
    var a = b = 0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">//&#x9519;&#x8BEF;&#x7684;&#x5199;&#x6CD5;</span>
    <span class="hljs-keyword">var</span> a = b = <span class="hljs-number">0</span>;</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4E2D;,b&#x5B9E;&#x9645;&#x4E0A;&#x88AB;&#x58F0;&#x660E;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x3002;&#x56E0;&#x4E3A;&#x64CD;&#x4F5C;&#x7B26;&#x4F18;&#x5148;&#x7EA7;&#x662F;&#x662F;&#x4ECE;&#x53F3;&#x5F80;&#x5DE6;&#xFF0C;&#x6240;&#x4EE5;&#x8BE5;&#x8BED;&#x53E5;&#x76F8;&#x5F53;&#x4E8E;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = (b = 0)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">    <span class="hljs-keyword">var</span> a = (b = <span class="hljs-number">0</span>)</code></pre><p>&#x6B64;&#x65F6;<code>b</code>&#x672A;&#x58F0;&#x660E;&#x5C31;&#x88AB;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;<code>b</code>&#x6210;&#x4E86;&#x5168;&#x5C40;&#x53D8;&#x91CF;</p><h3 id="articleHeader3">2. &#x5355;&#x4E00;<code>var</code>&#x539F;&#x5219;</h3><p>&#x8FD9;&#x6761;&#x89C4;&#x5219;&#x7684;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x628A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x6240;&#x6709;&#x53D8;&#x91CF;&#xFF0C;&#x653E;&#x5230;&#x9876;&#x90E8;&#x58F0;&#x660E;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //&#x793A;&#x4F8B;
    function A(){
      var a = 1,
          b = 2,
          c = a + b ;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">//&#x793A;&#x4F8B;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>,
          b = <span class="hljs-number">2</span>,
          c = a + b ;
    }</code></pre><p>&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x4FBF;&#x4E8E;&#x67E5;&#x627E;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;</li><li>&#x9632;&#x6B62;&#x53D8;&#x91CF;&#x672A;&#x5B9A;&#x4E49;&#x65F6;&#x5C31;&#x88AB;&#x4F7F;&#x7528;</li><li>&#x9632;&#x6B62;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x63D0;&#x5347;&#x540E;&#x5F15;&#x53D1;&#x7684;&#x8BEF;&#x89E3;</li></ul><p>&#x5173;&#x4E8E;&#x7B2C;&#x4E09;&#x70B9;&#xFF0C;&#x8FD9;&#x91CC;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x8BF4;&#x660E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var x = 1;
  function A(){
    console.log(x);//&#x7B2C;&#x4E00;&#x5904;&#x8F93;&#x51FA; &#xFF0C;&#x6CE8;&#x610F;&#x7ED3;&#x679C;
    var x = 2;
    console.log(x);//&#x7B2C;&#x4E8C;&#x5904;&#x8F93;&#x51FA; 2&#xFF0C;&#x6CA1;&#x95EE;&#x9898;
  }  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(x);<span class="hljs-comment">//&#x7B2C;&#x4E00;&#x5904;&#x8F93;&#x51FA; &#xFF0C;&#x6CE8;&#x610F;&#x7ED3;&#x679C;</span>
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">2</span>;
    <span class="hljs-built_in">console</span>.log(x);<span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x5904;&#x8F93;&#x51FA; 2&#xFF0C;&#x6CA1;&#x95EE;&#x9898;</span>
  }  </code></pre><p>&#x4ECE;&#x4EE3;&#x7801;&#x4E0A;&#x770B;&#xFF0C;&#x7B2C;&#x4E8C;&#x5904;&#x8F93;&#x51FA;&#x80AF;&#x5B9A;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x4EBA;&#x8BA4;&#x4E3A;&#x7B2C;&#x4E00;&#x5904;&#x8F93;&#x51FA;&#x7684;&#x662F;1&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x8FD8;&#x6CA1;&#x58F0;&#x660E;&#x53D8;&#x91CF;x&#xFF0C;&#x6839;&#x636E;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#xFF0C;&#x5411;&#x5916;&#x5C42;&#x67E5;&#x627E;&#x7684;&#x8BDD;&#xFF0C;x&#x503C;&#x4E3A;1&#x3002;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x8F93;&#x51FA;&#x7684;&#x503C;&#x5E94;&#x8BE5;&#x662F;<code>undefined</code>&#xFF0C;&#x56E0;&#x4E3A;<strong>js&#x5141;&#x8BB8;&#x5728;&#x51FD;&#x6570;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x4E14;&#x65E0;&#x8BBA;&#x5728;&#x54EA;&#x91CC;&#x58F0;&#x660E;&#x90FD;&#x7B49;&#x540C;&#x4E8E;&#x5728;&#x9876;&#x90E8;&#x58F0;&#x660E;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x58F0;&#x660E;&#x63D0;&#x5347;&#x3002;</strong>&#x6240;&#x4EE5;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x76F8;&#x5F53;&#x4E8E;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var x = 1;
  function A(){
    var x;//&#x63D0;&#x5347;&#x5230;&#x9876;&#x90E8;
    console.log(x);//&#x6B64;&#x65F6;&#x5DF2;&#x58F0;&#x660E; &#x672A;&#x8D4B;&#x503C;
    x = 2;//&#x8D4B;&#x503C;
    console.log(x);
  }  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> x;<span class="hljs-comment">//&#x63D0;&#x5347;&#x5230;&#x9876;&#x90E8;</span>
    <span class="hljs-built_in">console</span>.log(x);<span class="hljs-comment">//&#x6B64;&#x65F6;&#x5DF2;&#x58F0;&#x660E; &#x672A;&#x8D4B;&#x503C;</span>
    x = <span class="hljs-number">2</span>;<span class="hljs-comment">//&#x8D4B;&#x503C;</span>
    <span class="hljs-built_in">console</span>.log(x);
  }  </code></pre><h3 id="articleHeader4">3. &#x4F7F;&#x7528;<code>for</code>&#x5FAA;&#x73AF;&#x65F6;&#xFF0C;&#x7F13;&#x5B58;&#x957F;&#x5EA6;&#x503C;</h3><p>&#x901A;&#x5E38;&#x7528;&#x4F7F;&#x7528;<code>for</code>&#x5FAA;&#x73AF;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x65F6;&#xFF0C;&#x4F1A;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;&#x5199;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0;i&lt;arr.length;i++){
 // &#x5177;&#x4F53;&#x64CD;&#x4F5C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt;arr.length;i++){
 <span class="hljs-comment">// &#x5177;&#x4F53;&#x64CD;&#x4F5C;</span>
}</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;&#x5728;&#x4E8E;&#xFF0C;<strong>&#x5728;&#x5FAA;&#x73AF;&#x7684;&#x6BCF;&#x4E2A;&#x8FED;&#x4EE3;&#x6B65;&#x9AA4;&#xFF0C;&#x90FD;&#x5FC5;&#x987B;&#x8BBF;&#x95EE;&#x4E00;&#x6B21;<code>arr</code>&#x7684;&#x957F;&#x5EA6;&#x3002;</strong>&#x5982;&#x679C;arr&#x662F;&#x9759;&#x6001;&#x6570;&#x503C;&#x8FD8;&#x597D;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5728;&#x4F7F;&#x7528;<code>js</code>&#x65F6;&#x53EF;&#x80FD;&#x4F1A;&#x78B0;&#x5230;<strong><code>arr</code>&#x662F;dom&#x5143;&#x7D20;&#x5BF9;&#x8C61;&#xFF0C;&#x7531;&#x4E8E;dom&#x5BF9;&#x8C61;&#x8F7D;&#x9875;&#x9762;&#x4E0B;&#x662F;&#x6D3B;&#x52A8;&#x7684;&#x67E5;&#x8BE2;&#xFF0C;&#x8FD9;&#x4E2A;&#x957F;&#x5EA6;&#x67E5;&#x8BE2;&#x5C31;&#x76F8;&#x5F53;&#x8017;&#x65F6;</strong>&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7528;len&#x7F13;&#x5B58;&#x957F;&#x5EA6;&#x503C;
for(var i = 0,len = arr.length;i&lt;len;i++){
 // &#x5177;&#x4F53;&#x64CD;&#x4F5C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//&#x7528;len&#x7F13;&#x5B58;&#x957F;&#x5EA6;&#x503C;</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len = arr.length;i&lt;len;i++){
 <span class="hljs-comment">// &#x5177;&#x4F53;&#x64CD;&#x4F5C;</span>
}</code></pre><p>&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x83B7;&#x53D6;&#x957F;&#x5EA6;&#x503C;&#x65F6;&#x5C31;&#x7F13;&#x5B58;&#x8FD9;&#x4E2A;&#x957F;&#x5EA6;&#x503C;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader5">4. &#x4F7F;&#x7528;<code>for-in</code>&#x65F6;&#xFF0C;&#x589E;&#x52A0;<code>hasOwnProperty()</code>&#x5224;&#x65AD;</h3><p><code>for-in</code>&#x901A;&#x5E38;&#x7528;&#x6765;&#x679A;&#x4E3E;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x679A;&#x4E3E;&#x8303;&#x56F4;&#x5305;&#x62EC;<strong>&#x5BF9;&#x8C61;&#x548C;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</strong>&#xFF08;&#x5BF9;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x6211;&#x4E4B;&#x524D;&#x5199;&#x7684;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000008739672#articleHeader3">&#x4F20;&#x9001;&#x95E8;</a>&#xFF09;&#x6B64;&#x65F6;&#xFF0C;&#x5229;&#x7528;<code>hasOwnProperty()</code>&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5E2E;&#x6211;&#x4EEC;&#x8FC7;&#x6EE4;&#x51FA;<strong>&#x53EA;&#x5728;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x6216;&#x8005;&#x53EA;&#x5728;&#x539F;&#x578B;&#x94FE;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var key in obj){
   if(obj.hasOwnProperty(key)){
     // &#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x65B9;&#x6CD5;
  }
  else{
     // &#x539F;&#x578B;&#x94FE;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
  }
}

/* &#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x4F8B;&#x5B50; */
 function A(name){
    this.type = &apos;A&#x7C7B;&apos;;
    this.name = name || &apos;&#x672A;&#x547D;&#x540D;&apos;
}

var a = new A(&apos;a&apos;);

function B(name){
  this.subtype = &apos;B&#x7C7B;&apos;;
}

// &#x5EFA;&#x7ACB;&#x539F;&#x578B;&#x94FE;
B.prototype = a;
B.prototype.sayHello = function(){}

var b = new B();

// &#x904D;&#x5386;&#x5C5E;&#x6027;
for(var key in b){
  //&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x5C5E;&#x6027;
  if(b.hasOwnProperty(key)){
    console.log(&apos;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;:&apos;+key) 
  }

  //&#x4E0A;&#x8FF0;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;
  if(Object.prototype.hasOwnProperty.call(b,key)){
    console.log(&apos;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;:&apos;+key)
  }
  else {
    console.log(&apos;&#x539F;&#x578B;&#x94FE;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;:&apos;+key)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj){
   <span class="hljs-keyword">if</span>(obj.hasOwnProperty(key)){
     <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x65B9;&#x6CD5;</span>
  }
  <span class="hljs-keyword">else</span>{
     <span class="hljs-comment">// &#x539F;&#x578B;&#x94FE;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</span>
  }
}

<span class="hljs-comment">/* &#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x4F8B;&#x5B50; */</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;A&#x7C7B;&apos;</span>;
    <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">&apos;&#x672A;&#x547D;&#x540D;&apos;</span>
}

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> A(<span class="hljs-string">&apos;a&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.subtype = <span class="hljs-string">&apos;B&#x7C7B;&apos;</span>;
}

<span class="hljs-comment">// &#x5EFA;&#x7ACB;&#x539F;&#x578B;&#x94FE;</span>
B.prototype = a;
B.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}

<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> B();

<span class="hljs-comment">// &#x904D;&#x5386;&#x5C5E;&#x6027;</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> b){
  <span class="hljs-comment">//&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x5C5E;&#x6027;</span>
  <span class="hljs-keyword">if</span>(b.hasOwnProperty(key)){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;:&apos;</span>+key) 
  }

  <span class="hljs-comment">//&#x4E0A;&#x8FF0;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(b,key)){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;:&apos;</span>+key)
  }
  <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x539F;&#x578B;&#x94FE;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;:&apos;</span>+key)
  }
}</code></pre><h3 id="articleHeader6">5. &#x4F7F;&#x7528;<code>===</code>&#x4EE3;&#x66FF;<code>==</code></h3><p>&#x8FD9;&#x4E2A;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x7684;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;js&#x5728;&#x505A;&#x6BD4;&#x8F83;&#x5224;&#x65AD;&#x65F6;&#xFF0C;&#x4F1A;&#x6267;&#x884C;<strong>&#x5F3A;&#x5236;&#x7C7B;&#x578B;&#x8F6C;&#x6362;</strong>&#xFF0C;&#x6BD4;&#x5982;<code>false == 0</code>&#x8FD4;&#x56DE;<code>true</code>&#x8FD9;&#x6837;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4F7F;&#x7528;<code>===</code>&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x4E25;&#x683C;&#x7684;&#x7B49;&#x4EF7;&#x6BD4;&#x8F83;&#xFF0C;&#x66F4;&#x6613;&#x4E8E;&#x9605;&#x8BFB;&#x4EE3;&#x7801;&#xFF08;&#x540E;&#x6765;&#x9605;&#x8BFB;&#x7684;&#x4EBA;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x5224;&#x65AD;&#x8FD9;&#x4E2A;&#x662F;&#x9057;&#x6F0F;&#x8FD8;&#x662F;&#x6545;&#x610F;&#x4F7F;&#x7528;&#x5F3A;&#x5236;&#x7C7B;&#x578B;&#x8F6C;&#x6362;&#x7B80;&#x5199;&#xFF09;</p><h3 id="articleHeader7">6. &#x4F7F;&#x7528;<code>parseInt()</code>&#x65F6;&#xFF0C;&#x5E26;&#x4E0A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x3002;</h3><p><code>parseInt()</code>&#x7528;&#x4E8E;&#x4ECE;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x83B7;&#x53D6;&#x6570;&#x503C;&#xFF0C;<strong>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4EE3;&#x8868;&#x8FDB;&#x5236;,&#x9ED8;&#x8BA4;&#x662F;10</strong>&#x3002;&#x6211;&#x4EEC;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x80FD;&#x4E60;&#x60EF;&#x6027;&#x5FFD;&#x7565;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4E00;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x6709;&#x95EE;&#x9898;&#xFF1A;<strong>&#x5F53;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5F00;&#x5934;&#x4E3A;0&#x65F6;&#xFF0C;&#x5728;es3&#x91CC;&#x4F1A;&#x88AB;&#x5F53;&#x505A;&#x662F;&#x516B;&#x8FDB;&#x5236;&#xFF0C;es5&#x91CC;&#x9762;&#x4ECD;&#x7136;&#x5F53;&#x505A;10&#x8FDB;&#x5236;</strong>&#xFF0C;&#x4E3A;&#x4E86;&#x4EE3;&#x7801;&#x7684;&#x4E00;&#x81F4;&#x6027;&#x4EE5;&#x53CA;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5931;&#x8BEF;&#xFF0C;&#x5E94;&#x8BE5;&#x6BCF;&#x6B21;&#x4F7F;&#x7528;&#x65F6;&#x90FD;&#x5E26;&#x4E0A;&#x53C2;&#x6570;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = parseInt(&apos;089&apos;,10);//&#x4F7F;&#x7528;&#x65F6;&#x90FD;&#x5E26;&#x4E0A;&#x8FDB;&#x5236;&#x53C2;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> x = <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&apos;089&apos;</span>,<span class="hljs-number">10</span>);<span class="hljs-comment">//&#x4F7F;&#x7528;&#x65F6;&#x90FD;&#x5E26;&#x4E0A;&#x8FDB;&#x5236;&#x53C2;&#x6570;</span></code></pre><h3 id="articleHeader8">7. &#x5927;&#x62EC;&#x53F7;&#x7684;&#x4F7F;&#x7528;</h3><p>&#x5927;&#x62EC;&#x53F7;&#x7684;&#x4F7F;&#x7528;&#x4E3B;&#x8981;&#x662F;2&#x4E2A;&#x65B9;&#x9762;&#xFF1A;</p><ul><li>&#x7B2C;1&#xFF0C;&#x4E0D;&#x8981;&#x7701;&#x7565;&#x5927;&#x62EC;&#x53F7;&#xFF0C;&#x5373;&#x4F7F;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;,&#x6BD4;&#x5982;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i =1;i&lt;10 ;i++)
    console.log(i) //&#x6B64;&#x5904;&#x539F;&#x5219;&#x4E0A;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x5927;&#x62EC;&#x53F7;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i =<span class="hljs-number">1</span>;i&lt;<span class="hljs-number">10</span> ;i++)
    <span class="hljs-built_in">console</span>.log(i) <span class="hljs-comment">//&#x6B64;&#x5904;&#x539F;&#x5219;&#x4E0A;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x5927;&#x62EC;&#x53F7;</span></code></pre><p>&#x4E0A;&#x8FF0;&#x8BED;&#x53E5;&#x5E76;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x540E;&#x671F;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x589E;&#x52A0;&#x4E86;&#x5176;&#x4ED6;&#x8BED;&#x53E5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x5FD8;&#x8BB0;&#x8865;&#x4E0A;&#x5927;&#x62EC;&#x53F7;&#xFF0C;&#x56E0;&#x6B64;&#x5EFA;&#x8BAE;&#x90FD;&#x5E26;&#x4E0A;&#x5927;&#x62EC;&#x53F7;&#xFF1B;</p><ul><li><strong>&#x7B2C;2&#xFF0C;&#x5927;&#x62EC;&#x53F7;&#x7684;&#x5FC5;&#x987B;&#x8DDF;&#x5728;&#x524D;&#x4E00;&#x4E2A;&#x8BED;&#x53E5;&#x7684;&#x540C;&#x4E00;&#x884C;</strong></li></ul><p>&#x8FD9;&#x4E2A;&#x5730;&#x65B9;&#x4E3A;&#x4EC0;&#x4E48;&#x52A0;&#x7C97;&#x4E86;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;<strong>&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x90FD;&#x89C9;&#x5F97;&#x5927;&#x62EC;&#x53F7;&#x662F;&#x8DDF;&#x5728;&#x8BED;&#x53E5;&#x7684;&#x540C;&#x4E00;&#x884C;&#x8FD8;&#x662F;&#x4E0B;&#x4E00;&#x884C;&#x53EA;&#x662F;&#x4E60;&#x60EF;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x4E0A;&#x4E0D;&#x662F;&#x7684;&#xFF01;</strong>&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
  return 
  {
    name:&apos;xxx&apos;
  }
}
var res = func()
console.log(res)//&#x8F93;&#x51FA;undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> 
  {
    <span class="hljs-attr">name</span>:<span class="hljs-string">&apos;xxx&apos;</span>
  }
}
<span class="hljs-keyword">var</span> res = func()
<span class="hljs-built_in">console</span>.log(res)<span class="hljs-comment">//&#x8F93;&#x51FA;undefined</span></code></pre><p>&#x662F;&#x4E0D;&#x662F;&#x89C9;&#x5F97;&#x5F88;&#x5947;&#x602A;&#xFF0C;&#x770B;&#x4EE3;&#x7801;&#x7B2C;&#x4E00;&#x611F;&#x89C9;&#x5E94;&#x8BE5;&#x662F;&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x5305;&#x542B;<code>name</code>&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x7531;&#x4E8E;js&#x7684;&#x5206;&#x53F7;&#x63D2;&#x5165;&#x673A;&#x5236;&#xFF1A;&#x5982;&#x679C;&#x8BED;&#x53E5;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x5206;&#x53F7;&#x7ED3;&#x675F;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x8865;&#x5145;&#x5206;&#x53F7;&#xFF0C;&#x56E0;&#x6B64;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5B9E;&#x9645;&#x76F8;&#x5F53;&#x4E8E;&#x5982;&#x4E0B;&#x5199;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
  return undefined;//&#x81EA;&#x52A8;&#x63D2;&#x5165;&#x5206;&#x53F7;
  {
    name:&apos;xxx&apos;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;<span class="hljs-comment">//&#x81EA;&#x52A8;&#x63D2;&#x5165;&#x5206;&#x53F7;</span>
  {
    <span class="hljs-attr">name</span>:<span class="hljs-string">&apos;xxx&apos;</span>
  }
}</code></pre><p>&#x6B63;&#x786E;&#x7684;&#x5199;&#x6CD5;&#x5E94;&#x8BE5;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
  return {
    name:&apos;xxx&apos;
  }
}
var res = func()
console.log(res)//&#x8F93;&#x51FA;{name:&apos;xxx&apos;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>:<span class="hljs-string">&apos;xxx&apos;</span>
  }
}
<span class="hljs-keyword">var</span> res = func()
<span class="hljs-built_in">console</span>.log(res)<span class="hljs-comment">//&#x8F93;&#x51FA;{name:&apos;xxx&apos;}</span></code></pre><p>&#xFF08;<em>----------------------06.15&#x66F4;&#x65B0;------------------------</em>&#xFF09;</p><h3 id="articleHeader9">8 . &#x5224;&#x65AD;&#x8BED;&#x53E5;&#x7684;&#x4F18;&#x5316;</h3><p>&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x7C7B;&#x4F3C;&#x5BF9;&#x8BF7;&#x6C42;&#x7ED3;&#x679C;&#x5224;&#x65AD;&#x540E;&#x8BFB;&#x53D6;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="requset().then(function(res){
    if(res){
        //&#x5BF9;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x7684;&#x4EE3;&#x7801;
    } else{
        
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>requset().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span>{</span>
    <span class="hljs-keyword">if</span>(res){
        <span class="hljs-comment">//&#x5BF9;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x7684;&#x4EE3;&#x7801;</span>
    } <span class="hljs-keyword">else</span>{
        
    }
})</code></pre><p>&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x65F6;&#x5019;&#x903B;&#x8F91;&#x6BD4;&#x8F83;&#x957F;&#xFF0C;&#x5D4C;&#x5957;&#x7684;&#x5927;&#x62EC;&#x53F7;&#x6BD4;&#x8F83;&#x591A;&#x3002;&#x6B64;&#x65F6;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="requset().then(function(res){
    // &#x5148;&#x5224;&#x65AD;!res
    if(!res){
        ///
    }
    //&#x5BF9;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x7684;&#x4EE3;&#x7801;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>requset().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span>{</span>
    <span class="hljs-comment">// &#x5148;&#x5224;&#x65AD;!res</span>
    <span class="hljs-keyword">if</span>(!res){
        <span class="hljs-comment">///</span>
    }
    <span class="hljs-comment">//&#x5BF9;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x7684;&#x4EE3;&#x7801;</span>
})</code></pre><p>&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x4E00;&#x6B21;&#x5D4C;&#x5957;&#xFF0C;&#x5728;&#x903B;&#x8F91;&#x5224;&#x65AD;&#x8F83;&#x591A;&#x65F6;&#xFF0C;&#x5D4C;&#x5957;&#x5C42;&#x6570;&#x51CF;&#x5C11;&#x53EF;&#x4EE5;&#x589E;&#x52A0;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x3002;</p><p>&#xFF08;<em>----------------------06.20&#x66F4;&#x65B0;------------------------</em>&#xFF09;</p><h3 id="articleHeader10">9 . &#x5BF9;url&#x8FDB;&#x884C;encode</h3><p>&#x6B64;&#x6761;&#x4E3B;&#x8981;&#x662F;&#x5728;&#x8FD9;&#x4E24;&#x5929;&#x4FEE;&#x590D;&#x4E00;&#x4E2A;&#x9057;&#x7559;bug&#x65F6;&#x5019;&#x53D1;&#x73B0;&#xFF0C;&#x4E00;&#x4E2A;&#x4E0A;&#x4F20;&#x7EC4;&#x4EF6;&#x5728;ie&#x4E0B;&#x5931;&#x6548;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x539F;&#x56E0;&#x662F;&#x4E0A;&#x4F20;&#x7684;&#x8BF7;&#x6C42;url&#x53C2;&#x6570;&#x4E2D;&#x5305;&#x542B;&#x4E2D;&#x6587;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x672A;&#x624B;&#x52A8;<code>encodeURI</code>,&#x539F;&#x5148;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x53EF;&#x80FD;&#x53EA;&#x8003;&#x8651;&#x4E86;chrome&#x4E0B;&#x7684;&#x60C5;&#x51B5;&#x3002;<strong>&#x7531;&#x4E8E;chrome&#x4F1A;&#x81EA;&#x52A8;&#x5BF9;url&#x8FDB;&#x884C;encode</strong>&#xFF0C;&#x6240;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x5FFD;&#x7565;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x6B64;&#x7C7B;&#x7684;&#x517C;&#x5BB9;&#x95EE;&#x9898;&#xFF0C;&#x5EFA;&#x8BAE;&#x603B;&#x662F;&#x624B;&#x52A8;&#x505A;&#x597D;&#x7F16;&#x7801;&#x5904;&#x7406;&#x3002;</p><p>&#xFF08;<em>----------------------08.16&#x66F4;&#x65B0;------------------------</em>&#xFF09;</p><h3 id="articleHeader11">10.&#x7A7A;&#x5BF9;&#x8C61;&#x5224;&#x65AD;&#xFF08;&#x8981;&#x8003;&#x8651;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#xFF09;</h3><p>&#x5148;&#x4E0A;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function X() {

  }
  //&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;
  X.prototype.age = &apos;22&apos;
  var x = new X()
  Object.defineProperty(x, &apos;name&apos;, {
    enumerable: false,
    value: &apos;&#x5F20;&#x4E09;&apos;
  })
  console.log(x)

  //&#x65B9;&#x6CD5;1 &#x4F7F;&#x7528;for...in&#x904D;&#x5386;
  function isEmptyObject1(obj) {
    for (var attr in obj) {
      return false
    }
    return true
  }

  //&#x65B9;&#x6CD5;2 &#x4F7F;&#x7528;JSON.stringify
  function isEmptyObject2(obj) {
    return (JSON.stringify(obj) === &apos;{}&apos;)
  }

  //&#x65B9;&#x6CD5;3 &#x4F7F;&#x7528;Object.keys
  function isEmptyObject3(obj) {
    return Object.keys(obj).length === 0
  }

  //&#x65B9;&#x6CD5;4 &#x4F7F;&#x7528;getOwnPropertyNames

  function isEmptyObject4(obj) {
    return Object.getOwnPropertyNames(obj).length === 0
  }
  console.log(isEmptyObject1(x)) //true
  console.log(isEmptyObject2(x)) //true
  console.log(isEmptyObject3(x)) //true
  console.log(isEmptyObject4(x)) //false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">X</span>(<span class="hljs-params"></span>) </span>{

  }
  <span class="hljs-comment">//&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;</span>
  X.prototype.age = <span class="hljs-string">&apos;22&apos;</span>
  <span class="hljs-keyword">var</span> x = <span class="hljs-keyword">new</span> X()
  <span class="hljs-built_in">Object</span>.defineProperty(x, <span class="hljs-string">&apos;name&apos;</span>, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>
  })
  <span class="hljs-built_in">console</span>.log(x)

  <span class="hljs-comment">//&#x65B9;&#x6CD5;1 &#x4F7F;&#x7528;for...in&#x904D;&#x5386;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject1</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }

  <span class="hljs-comment">//&#x65B9;&#x6CD5;2 &#x4F7F;&#x7528;JSON.stringify</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject2</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-built_in">JSON</span>.stringify(obj) === <span class="hljs-string">&apos;{}&apos;</span>)
  }

  <span class="hljs-comment">//&#x65B9;&#x6CD5;3 &#x4F7F;&#x7528;Object.keys</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject3</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(obj).length === <span class="hljs-number">0</span>
  }

  <span class="hljs-comment">//&#x65B9;&#x6CD5;4 &#x4F7F;&#x7528;getOwnPropertyNames</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject4</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.getOwnPropertyNames(obj).length === <span class="hljs-number">0</span>
  }
  <span class="hljs-built_in">console</span>.log(isEmptyObject1(x)) <span class="hljs-comment">//true</span>
  <span class="hljs-built_in">console</span>.log(isEmptyObject2(x)) <span class="hljs-comment">//true</span>
  <span class="hljs-built_in">console</span>.log(isEmptyObject3(x)) <span class="hljs-comment">//true</span>
  <span class="hljs-built_in">console</span>.log(isEmptyObject4(x)) <span class="hljs-comment">//false</span></code></pre><p><strong>&#x7ED3;&#x8BBA;</strong>&#xFF1A;&#x524D;&#x9762;&#x4E09;&#x79CD;&#x662F;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x90FD;&#x662F;&#x9047;&#x5230;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x65F6;&#x90FD;&#x4F1A;&#x5931;&#x6548;&#xFF0C;<code>Object.getOwnPropertyNames</code>&#x53EF;&#x4EE5;&#x5217;&#x51FA;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x5305;&#x62EC;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x65F6;&#x8BF7;&#x6839;&#x636E;&#x9700;&#x8981;&#x9009;&#x62E9;</p><h2 id="articleHeader12">&#x5C0F;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x4F1A;&#x957F;&#x671F;&#x66F4;&#x65B0;&#x548C;&#x8865;&#x5145;&#xFF08;&#x5982;&#x679C;&#x6211;&#x6CA1;&#x88AB;&#x6DF9;&#x6CA1;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x7684;&#x8BDD;&#xFF09;&#xFF0C;&#x6B22;&#x8FCE;&#x8BFB;&#x8005;&#x63D0;&#x51FA;&#x5EFA;&#x8BAE;&#x548C;&#x610F;&#x89C1;&#x3002;</p><p>&#x7136;&#x540E;&#x4F9D;&#x7136;&#x662F;&#x6BCF;&#x6B21;&#x90FD;&#x4E00;&#x6837;&#x7684;&#x7ED3;&#x5C3E;&#xFF0C;&#x5982;&#x679C;&#x5185;&#x5BB9;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF1B;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x8D5E;&#x548C;&#x6536;&#x85CF;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x5F81;&#x5F97;&#x540C;&#x610F;&#x540E;&#x8457;&#x660E;&#x51FA;&#x5904;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x4E5F;&#x6B22;&#x8FCE;&#x79C1;&#x4FE1;&#x4EA4;&#x6D41;&#xFF0C;&#x4E3B;&#x9875;&#x6DFB;&#x52A0;&#x4E86;&#x90AE;&#x7BB1;&#x5730;&#x5740;~&#x6E9C;&#x4E86;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js代码常见技巧总结

## 原文链接
[https://segmentfault.com/a/1190000015269270](https://segmentfault.com/a/1190000015269270)


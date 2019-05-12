---
title: 'js设计模式(一)-单例模式' 
date: 2018-11-26 2:30:09
hidden: true
slug: cvklrt4p6sa
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#xFF08;&#x5EA6;&#x8FC7;&#x4E00;&#x9635;&#x7684;&#x7E41;&#x5FD9;&#x671F;&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x7684;&#x5F00;&#x59CB;&#x5B66;&#x4E60;&#x65B0;&#x77E5;&#x8BC6;&#x4E86;&#xFF0C;&#x4E00;&#x5E74;&#x6765;&#x6280;&#x672F;&#x6808;&#x5207;&#x6765;&#x5207;&#x53BB;&#xFF0C;&#x5374;&#x603B;&#x89C9;&#x5F97;js&#x90FD;&#x8FD8;&#x6CA1;&#x5B66;&#x5B8C;-_-&#xFF09;</p><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x56F4;&#x7ED5;js&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x8FDB;&#x884C;&#x5C55;&#x5F00;&#xFF0C;&#x5BF9;&#x6BCF;&#x4E2A;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4ECE;&#x7279;&#x5F81;&#xFF0C;&#x539F;&#x7406;&#x548C;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x51E0;&#x4E2A;&#x65B9;&#x9762;&#x8FDB;&#x884C;&#x8BF4;&#x660E;&#x3002;&#x7531;&#x4E8E;&#x5185;&#x5BB9;&#x8F83;&#x957F;&#xFF0C;&#x6240;&#x4EE5;&#x62C6;&#x5206;&#x6210;&#x591A;&#x7BC7;&#x6587;&#x7AE0;&#x3002;&#x5982;&#x679C;&#x6709;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF0C;&#x9605;&#x8BFB;&#x524D;&#x8BF7;&#x6CE8;&#x610F;&#x51E0;&#x70B9;&#xFF1A;</p><ol><li><em>&#x5982;&#x679C;&#x5BF9;js&#x7684;&#x7C7B;&#x5F0F;&#x7EE7;&#x627F;&#x548C;&#x95ED;&#x5305;&#x4E0D;&#x592A;&#x719F;&#x7EC3;&#x7684;&#x5EFA;&#x8BAE;&#x5148;&#x9605;&#x8BFB;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x524D;&#x9762;&#x5199;&#x8FC7;&#x7684;<a href="https://segmentfault.com/a/1190000008739672">js&#x7EE7;&#x627F;</a>&#xFF08;&#x4E3B;&#x8981;&#x770B;&#x5230;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x90E8;&#x5206;&#x5C31;&#x597D;&#xFF09;</em>&#x548C;<a href="https://segmentfault.com/a/1190000007376061" target="_blank">js&#x95ED;&#x5305;</a>&#xFF0C;&#xFF0C;</li><li><em>&#x77E5;&#x8BC6;&#x5BC6;&#x5EA6;&#x8F83;&#x5927;&#xFF0C;&#x5EFA;&#x8BAE;&#x8FB9;&#x601D;&#x8003;&#xFF0C;&#x987A;&#x4FBF;&#x8DD1;&#x4EE5;&#x4E0B;&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#xFF08;&#x5982;&#x679C;&#x78B0;&#x5230;&#x4EE3;&#x7801;&#x6709;&#x95EE;&#x9898;&#x7684;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF09;&#xFF0C;&#x4E2D;&#x9014;&#x6CE8;&#x610F;&#x4F11;&#x606F;</em></li></ol><h2 id="articleHeader1">&#x6B63;&#x6587;</h2><h3 id="articleHeader2">&#x5B9A;&#x4E49;</h3><p>&#x4E5F;&#x53EB;&#x5355;&#x4F53;&#x6A21;&#x5F0F;&#xFF0C;&#x6838;&#x5FC3;&#x601D;&#x60F3;&#x662F;<strong>&#x786E;&#x4FDD;&#x4E00;&#x4E2A;&#x7C7B;&#x53EA;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</strong>&#x3002;<br>&#x867D;&#x7136;js&#x662F;&#x5F31;&#x7C7B;&#x578B;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x4F46;&#x662F;js&#x4E5F;&#x6709;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x5B9E;&#x4F8B;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;<strong>&#x786E;&#x4FDD;&#x591A;&#x6B21;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x90FD;&#x8FD4;&#x56DE;&#x540C;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</strong></p><h3 id="articleHeader3">&#x5B9E;&#x73B0;</h3><p>&#x6839;&#x636E;&#x5B9A;&#x4E49;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x6EE1;&#x8DB3;&#x4EE5;&#x4E0B;&#x6761;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(){
    //&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x51FD;&#x6570;&#x5185;&#x5BB9;
}
var a1 = new A() 
var b1 = new A()
a1 ==== b1 //true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span></span>(){
    <span class="hljs-comment">//&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x51FD;&#x6570;&#x5185;&#x5BB9;</span>
}
<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> <span class="hljs-type">A</span>() 
<span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> <span class="hljs-type">A</span>()
a1 ==== b1 <span class="hljs-comment">//true</span></code></pre><p>&#x5728;&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BF4;&#x5230;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4E14;&#x4E5F;&#x77E5;&#x9053;&#x4E86;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x8D4B;&#x503C;&#x7684;&#x65F6;&#x5019;&#x5B58;&#x653E;&#x7684;&#x5B9E;&#x9645;&#x662F;&#x53D8;&#x91CF;&#x7684;&#x5730;&#x5740;&#x6307;&#x9488;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6838;&#x5FC3;&#x601D;&#x8DEF;&#x662F;&#xFF1A;<strong>&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x6307;&#x9488;&#x3002;</strong> &#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;<strong>&#x53EA;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#x521B;&#x5EFA;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x4E4B;&#x540E;&#x8C03;&#x7528;&#x8FD4;&#x56DE;&#x65F6;&#x8FD4;&#x56DE;&#x8BE5;&#x5BF9;&#x8C61;</strong>&#x5373;&#x53EF;&#x3002;&#x6240;&#x4EE5;&#x91CD;&#x70B9;&#x53D8;&#x6210;&#x4E86;--&#x5982;&#x4F55;&#x7F13;&#x5B58;&#x521D;&#x6B21;&#x521B;&#x5EFA;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x9996;&#x5148;&#x5148;&#x6392;&#x9664;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x56E0;&#x4E3A;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x9700;&#x8981;&#x4FDD;&#x8BC1;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x7684;&#x7EAF;&#x51C0;&#xFF0C;&#x5176;&#x6B21;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x5BB9;&#x6613;&#x88AB;&#x6539;&#x5199;&#xFF0C;&#x51FA;&#x73B0;&#x610F;&#x5916;&#x60C5;&#x51B5;&#x3002;&#x6240;&#x4EE5;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;2&#x79CD;&#x65B9;&#x6848;&#x6765;&#x5B9E;&#x73B0;&#x7F13;&#x5B58;&#x3002;</p><h4>1. &#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;</h4><p>&#x56E0;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x4E5F;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x62E5;&#x6709;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x3002;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(name){
    // &#x5982;&#x679C;&#x5DF2;&#x5B58;&#x5728;&#x5BF9;&#x5E94;&#x7684;&#x5B9E;&#x4F8B;
   if(typeof A.instance === &apos;object&apos;){
       return A.instance
   }
   //&#x5426;&#x5219;&#x6B63;&#x5E38;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;
   this.name = name
   
   // &#x7F13;&#x5B58;
   A.instance =this
   return this
}
var a1 = new A() 
var a2= new A()
console.log(a1 === a2)//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-comment">// &#x5982;&#x679C;&#x5DF2;&#x5B58;&#x5728;&#x5BF9;&#x5E94;&#x7684;&#x5B9E;&#x4F8B;</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> A.instance === <span class="hljs-string">&apos;object&apos;</span>){
       <span class="hljs-keyword">return</span> A.instance
   }
   <span class="hljs-comment">//&#x5426;&#x5219;&#x6B63;&#x5E38;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;</span>
   <span class="hljs-keyword">this</span>.name = name
   
   <span class="hljs-comment">// &#x7F13;&#x5B58;</span>
   A.instance =<span class="hljs-keyword">this</span>
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> A() 
<span class="hljs-keyword">var</span> a2= <span class="hljs-keyword">new</span> A()
<span class="hljs-built_in">console</span>.log(a1 === a2)<span class="hljs-comment">//true</span></code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x7684;&#x7F3A;&#x70B9;&#x5728;&#x4E8E;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x662F;&#x80FD;&#x591F;&#x88AB;&#x4EBA;&#x4E3A;&#x91CD;&#x5199;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E0D;&#x4F1A;&#x50CF;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x90A3;&#x6837;&#x88AB;&#x65E0;&#x610F;&#x4FEE;&#x6539;&#x3002;</p><h4>2. &#x501F;&#x52A9;&#x95ED;&#x5305;</h4><p>&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#x6838;&#x5FC3;&#x601D;&#x8DEF;&#x662F;&#xFF0C;<strong>&#x5F53;&#x5BF9;&#x8C61;&#x7B2C;&#x4E00;&#x6B21;&#x88AB;&#x521B;&#x5EFA;&#x4EE5;&#x540E;&#xFF0C;&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x91CD;&#x5199;&#x540E;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x8BBF;&#x95EE;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(name){
  var instance = this
  this.name = name
  //&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;
  A = function (){
      return instance
  }
}
var a1 = new A() 
var a2= new A()
console.log(a1 === a2)//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-comment">//&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
  A = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> instance
  }
}
<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> A() 
<span class="hljs-keyword">var</span> a2= <span class="hljs-keyword">new</span> A()
<span class="hljs-built_in">console</span>.log(a1 === a2)<span class="hljs-comment">//true</span></code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x6B65;&#x9AA4;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x5B9E;&#x73B0;&#x5B58;&#x5728;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x770B;&#x8FC7;<strong>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</strong>&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x4F1A;&#x6CE8;&#x610F;&#x5230;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#x7531;&#x4E8E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x88AB;&#x91CD;&#x5199;&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x4E4B;&#x540E;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x5230;A&#x7684;&#x539F;&#x578B;&#x4E0A;&#xFF0C;&#x5C31;&#x4F1A;&#x4E22;&#x5931;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(name){
  var instance = this
  this.name = name
  //&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;
  A = function (){
      return instance
  }
}
A.prototype.pro1 = &quot;from protptype1&quot;

var a1 = new A() 
A.prototype.pro2 = &quot;from protptype2&quot;
var a2= new A()

console.log(a1.pro1)//from protptype1
console.log(a1.pro2)//underfined
console.log(a2.pro1)//from protptype1
console.log(a2.pro2)//underfined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-comment">//&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
  A = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> instance
  }
}
A.prototype.pro1 = <span class="hljs-string">&quot;from protptype1&quot;</span>

<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> A() 
A.prototype.pro2 = <span class="hljs-string">&quot;from protptype2&quot;</span>
<span class="hljs-keyword">var</span> a2= <span class="hljs-keyword">new</span> A()

<span class="hljs-built_in">console</span>.log(a1.pro1)<span class="hljs-comment">//from protptype1</span>
<span class="hljs-built_in">console</span>.log(a1.pro2)<span class="hljs-comment">//underfined</span>
<span class="hljs-built_in">console</span>.log(a2.pro1)<span class="hljs-comment">//from protptype1</span>
<span class="hljs-built_in">console</span>.log(a2.pro2)<span class="hljs-comment">//underfined</span></code></pre><p><strong>&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x539F;&#x5148;&#x7684;<code>A</code>&#x6307;&#x9488;&#x5BF9;&#x5E94;&#x7684;&#x51FD;&#x6570;&#x5B9E;&#x9645;&#x4E0A;&#x8FD8;&#x5728;&#x5185;&#x5B58;&#x4E2D;(&#x56E0;&#x4E3A;instance&#x53D8;&#x91CF;&#x8FD8;&#x5728;&#x88AB;&#x5F15;&#x7528;&#x7740;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x5185;&#x5BB9;&#x5982;&#x679C;&#x5FD8;&#x8BB0;&#x4E86;&#x8BF7;&#x770B;&#x95ED;&#x5305;)&#xFF0C;&#x4F46;&#x662F;&#x6B64;&#x65F6;<code>A</code>&#x6307;&#x9488;&#x5DF2;&#x7ECF;&#x6307;&#x5411;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;&#x4E86;</strong>&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x6D4B;&#x8BD5;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a1.constructor ==== A)//false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code style="word-break:break-word;white-space:initial">console.<span class="hljs-built_in">log</span>(a1.constructor ==== A)<span class="hljs-comment">//false</span></code></pre><p>&#x6240;&#x4EE5;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6839;&#x636E;&#x4E0A;&#x6587;&#x53EF;&#x77E5;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x91CD;&#x70B9;&#x662F;&#xFF0C;<strong>&#x8C03;&#x6574;&#x539F;&#x578B;&#x5B9E;&#x4F8B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;</strong>&#xFF0C;&#x6240;&#x4EE5;&#x5E94;&#x8BE5;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF08;&#x8FD9;&#x4E00;&#x5757;&#x5FD8;&#x8BB0;&#x7684;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x56DE;&#x5934;&#x770B;&#x770B;js&#x7EE7;&#x627F;&#x91CC;&#x9762;&#x7684;&#x90A3;&#x5F20;&#x51FD;&#x6570;&#x3001;&#x539F;&#x578B;&#x3001;&#x5B9E;&#x4F8B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x56FE;<a href="https://segmentfault.com/a/1190000008739672">&#x70B9;&#x51FB;&#x76F4;&#x8FBE;</a>&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(name){
  var instance = this
  this.name = name
 
  //&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;
  A = function (){
      return instance
  }
  
  // &#x7B2C;&#x4E00;&#x79CD;&#x5199;&#x6CD5;,&#x8FD9;&#x91CC;&#x5B9E;&#x9645;&#x4E0A;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x60F3;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x539F;&#x6765;&#x7684;&#x539F;&#x578B;
  A.prototype = this
  // &#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x65E7;&#x7684;&#x539F;&#x578B;
  A.prototype = this.constructor.prototype
  
  instance = new A()
  
  // &#x8C03;&#x6574;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x9488;&#xFF0C;&#x8FD9;&#x91CC;&#x5B9E;&#x9645;&#x4E0A;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x60F3;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x539F;&#x6765;&#x7684;&#x539F;&#x578B;
  instance.constructor = A
  
  return instance
}
A.prototype.pro1 = &quot;from protptype1&quot;

var a1 = new A() 
A.prototype.pro2 = &quot;from protptype2&quot;
var a2= new A()

console.log(a1.pro1)//from protptype1
console.log(a1.pro2)//from protptype2
console.log(a2.pro1)//from protptype1
console.log(a2.pro2)//from protptype2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>function A(name){
  <span class="hljs-selector-tag">var</span> instance = this
  this<span class="hljs-selector-class">.name</span> = name
 
  <span class="hljs-comment">//&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
  A = function (){
      return instance
  }
  
  <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x79CD;&#x5199;&#x6CD5;,&#x8FD9;&#x91CC;&#x5B9E;&#x9645;&#x4E0A;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x60F3;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x539F;&#x6765;&#x7684;&#x539F;&#x578B;</span>
  A<span class="hljs-selector-class">.prototype</span> = this
  <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x65E7;&#x7684;&#x539F;&#x578B;</span>
  A<span class="hljs-selector-class">.prototype</span> = this<span class="hljs-selector-class">.constructor</span><span class="hljs-selector-class">.prototype</span>
  
  instance = new A()
  
  <span class="hljs-comment">// &#x8C03;&#x6574;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x9488;&#xFF0C;&#x8FD9;&#x91CC;&#x5B9E;&#x9645;&#x4E0A;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x60F3;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x539F;&#x6765;&#x7684;&#x539F;&#x578B;</span>
  instance<span class="hljs-selector-class">.constructor</span> = A
  
  return instance
}
A<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.pro1</span> = <span class="hljs-string">&quot;from protptype1&quot;</span>

<span class="hljs-selector-tag">var</span> a1 = new A() 
A<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.pro2</span> = <span class="hljs-string">&quot;from protptype2&quot;</span>
<span class="hljs-selector-tag">var</span> a2= new A()

console.log(a1.pro1)<span class="hljs-comment">//from protptype1</span>
console.log(a1.pro2)<span class="hljs-comment">//from protptype2</span>
console.log(a2.pro1)<span class="hljs-comment">//from protptype1</span>
console.log(a2.pro2)<span class="hljs-comment">//from protptype2</span></code></pre><p>&#x73B0;&#x5728;&#x4E00;&#x5207;&#x5C31;&#x6B63;&#x5E38;&#x4E86;&#x3002;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x662F;&#x5229;&#x7528;<strong>&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x6765;&#x4FDD;&#x6301;&#x79C1;&#x6709;&#x53D8;&#x91CF;</strong>&#xFF0C;(&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x5185;&#x5BB9;&#x8BF7;&#x770B;&#x300A;&#x8BE6;&#x89E3;js&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x90E8;&#x5206;&#x300B;)&#x539F;&#x7406;&#x4E5F;&#x662F;&#x95ED;&#x5305;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var A;
(function(name){
    var instance;
    A = function(name){
        if(instance){
            return instance
        }
        
        //&#x8D4B;&#x503C;&#x7ED9;&#x79C1;&#x6709;&#x53D8;&#x91CF;
        instance = this
        
        //&#x81EA;&#x8EAB;&#x5C5E;&#x6027;
        this.name = name
    }
}());
A.prototype.pro1 = &quot;from protptype1&quot;

var a1 = new A(&apos;a1&apos;) 
A.prototype.pro2 = &quot;from protptype2&quot;
var a2 = new A(&apos;a2&apos;)

console.log(a1.name)
console.log(a1.pro1)//from protptype1
console.log(a1.pro2)//from protptype2
console.log(a2.pro1)//from protptype1
console.log(a2.pro2)//from protptype2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> A;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">var</span> instance;
    A = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
        <span class="hljs-keyword">if</span>(instance){
            <span class="hljs-keyword">return</span> instance
        }
        
        <span class="hljs-comment">//&#x8D4B;&#x503C;&#x7ED9;&#x79C1;&#x6709;&#x53D8;&#x91CF;</span>
        instance = <span class="hljs-keyword">this</span>
        
        <span class="hljs-comment">//&#x81EA;&#x8EAB;&#x5C5E;&#x6027;</span>
        <span class="hljs-keyword">this</span>.name = name
    }
}());
A.prototype.pro1 = <span class="hljs-string">&quot;from protptype1&quot;</span>

<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> A(<span class="hljs-string">&apos;a1&apos;</span>) 
A.prototype.pro2 = <span class="hljs-string">&quot;from protptype2&quot;</span>
<span class="hljs-keyword">var</span> a2 = <span class="hljs-keyword">new</span> A(<span class="hljs-string">&apos;a2&apos;</span>)

<span class="hljs-built_in">console</span>.log(a1.name)
<span class="hljs-built_in">console</span>.log(a1.pro1)<span class="hljs-comment">//from protptype1</span>
<span class="hljs-built_in">console</span>.log(a1.pro2)<span class="hljs-comment">//from protptype2</span>
<span class="hljs-built_in">console</span>.log(a2.pro1)<span class="hljs-comment">//from protptype1</span>
<span class="hljs-built_in">console</span>.log(a2.pro2)<span class="hljs-comment">//from protptype2</span></code></pre><p>&#x7B80;&#x5355;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x4E0A;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x9996;&#x5148;&#x5229;&#x7528;&#x5728;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4E2D;&#x4FDD;&#x5B58;&#x4E00;&#x4E2A;&#x79C1;&#x6709;&#x53D8;&#x91CF;<code>instance</code>&#xFF0C;&#x521D;&#x6B21;&#x6267;&#x884C;&#x4E4B;&#x540E;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;<code>new A()</code>&#x4E4B;&#x540E;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5E76;&#x8BA9;<code>instance</code>&#x6307;&#x5411;&#x8BE5;&#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;&#x7B2C;&#x4E8C;&#x6B21;&#x5F00;&#x59CB;&#xFF0C;&#x8C03;&#x7528;<code>new A()</code>&#xFF0C;&#x90FD;&#x53EA;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;</p><h3 id="articleHeader4">*&#x7279;&#x6B8A;&#x60C5;&#x51B5;</h3><p>&#x5F88;&#x591A;&#x5730;&#x65B9;&#x4F1A;&#x63D0;&#x5230;&#xFF0C;&#x4F7F;&#x7528;&#x5B57;&#x9762;&#x91CF;&#x76F4;&#x63A5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x8FD9;&#x4E2A;&#x8BF4;&#x6CD5;&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x5E76;&#x4E0D;&#x591F;&#x4E25;&#x683C;&#xFF0C;&#x548C;&#x540C;&#x4E8B;&#x63A2;&#x8BA8;&#x4E4B;&#x540E;&#x89C9;&#x5F97;&#x53EF;&#x80FD;&#x662F;&#x8FD9;&#x6837;&#xFF08;&#x5982;&#x679C;&#x6709;&#x6709;&#x5176;&#x4ED6;&#x89C1;&#x89E3;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF09;&#xFF1A;&#x4F7F;&#x7528;&#x5B57;&#x9762;&#x91CF;&#x5199;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x76F8;&#x5F53;&#x4E8E;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684;<code>Object</code>&#x51FD;&#x6570;new&#x4E86;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x5B58;&#x50A8;&#x5230;&#x5185;&#x5B58;&#x91CC;&#xFF0C;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x6BCF;&#x6B21;&#x4F7F;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x6307;&#x9488;&#x53BB;&#x8BFB;&#x53D6;&#x65F6;&#xFF0C;&#x8BFB;&#x5230;&#x7684;&#x90FD;&#x662F;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x800C;&#x6211;&#x4E0D;&#x8BA4;&#x4E3A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x7684;&#x539F;&#x56E0;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = new Object({
  name:111
})

var obj2 = new Object({
  name:111
})

console.log(obj1===obj2)//false 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>({
  <span class="hljs-attr">name</span>:<span class="hljs-number">111</span>
})

<span class="hljs-keyword">var</span> obj2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>({
  <span class="hljs-attr">name</span>:<span class="hljs-number">111</span>
})

<span class="hljs-built_in">console</span>.log(obj1===obj2)<span class="hljs-comment">//false </span>
</code></pre><p>&#x6211;&#x89C9;&#x5F97;&#x65E2;&#x7136;&#x4E24;&#x6B21;&#x8C03;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x4E0D;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E0D;&#x5C31;&#x4E0D;&#x80FD;&#x6210;&#x4E3A;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x3002;<strong>&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x6211;&#x4E2A;&#x4EBA;&#x7684;&#x770B;&#x6CD5;&#xFF0C;&#x8BFB;&#x8005;&#x670B;&#x53CB;&#x8FD8;&#x662F;&#x8981;&#x6CE8;&#x610F;&#x533A;&#x5206;&#x3002;</strong></p><h1 id="articleHeader5">&#x5C0F;&#x7ED3;</h1><p>&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x5148;&#x8BF4;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x9646;&#x7EED;&#x8865;&#x5145;&#x5176;&#x4ED6;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x3002;<br><strong>&#x611F;&#x8C22;&#x4E4B;&#x524D;&#x7684;&#x70ED;&#x5FC3;&#x8BFB;&#x8005;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x4E3A;&#x6211;&#x6307;&#x51FA;&#x9519;&#x8BEF;&#x7684;&#x5C0F;&#x4F19;&#x4F34;</strong>&#x3002;<br>&#x7136;&#x540E;&#x4F9D;&#x7136;&#x662F;&#x6BCF;&#x6B21;&#x90FD;&#x4E00;&#x6837;&#x7684;&#x7ED3;&#x5C3E;&#xFF0C;&#x5982;&#x679C;&#x5185;&#x5BB9;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF1B;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x8D5E;&#x548C;&#x6536;&#x85CF;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x5F81;&#x5F97;&#x540C;&#x610F;&#x540E;&#x8457;&#x660E;&#x51FA;&#x5904;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x4E5F;&#x6B22;&#x8FCE;&#x79C1;&#x4FE1;&#x4EA4;&#x6D41;&#xFF0C;&#x4E3B;&#x9875;&#x6DFB;&#x52A0;&#x4E86;&#x90AE;&#x7BB1;&#x5730;&#x5740;~&#x6E9C;&#x4E86;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js设计模式(一)-单例模式

## 原文链接
[https://segmentfault.com/a/1190000015384478](https://segmentfault.com/a/1190000015384478)


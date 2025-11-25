---
title: '「JavaScript」函数声明和函数表达式' 
date: 2018-11-23 2:30:10
hidden: true
slug: trslf27clz
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x5B9A;&#x4E49;</h2><p>&#x5728;javascript&#x4E2D;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x6709;&#x4EE5;&#x4E0B;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p><p><strong>&#x51FD;&#x6570;&#x58F0;&#x660E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function say(){
     console.log(&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;);
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;</span>);
  }</code></pre><p><strong>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var say = function(){
      console.log(&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;);
   }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   <span class="hljs-keyword">var</span> say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;</span>);
   }</code></pre><h2 id="articleHeader1">2.&#x5B9E;&#x4F8B;&#x89E3;&#x6790;</h2><p>&#x5728;&#x5E73;&#x65F6;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x5B83;&#x4EEC;&#x6709;&#x7740;&#x96BE;&#x4EE5;&#x5BDF;&#x89C9;&#x7684;&#x5DEE;&#x522B;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E0B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    say();
    var say = function(){
          console.log(&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;);
    }
    say();
    function say(){
     console.log(&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;);
    }
    say();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    say();
    <span class="hljs-keyword">var</span> say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;</span>);
    }
    say();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;</span>);
    }
    say();</code></pre><p>&#x53EF;&#x4EE5;&#x5148;&#x5728;&#x8111;&#x6D77;&#x4E2D;&#x60F3;&#x4E00;&#x4E0B;&#x7B54;&#x6848;&#xFF0C;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x51FD;&#x6570;&#x58F0;&#x660E;
&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;
&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>&#x51FD;&#x6570;&#x58F0;&#x660E;
&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;
&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</code></pre><p>&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x7ED3;&#x679C;&#xFF1A;</p><p>1.&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;say&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x51FD;&#x6570;&#x8FD8;&#x672A;&#x88AB;&#x5B9A;&#x4E49;&#xFF0C;&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x53EF;&#x4EE5;&#x6253;&#x5370;&#x51FA;&#x201C;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x201D;&#x8FD9;&#x4E2A;&#x503C;&#x5462;&#xFF1F;&#x539F;&#x56E0;&#x5728;&#x4E8E;</p><blockquote>javascript&#x89E3;&#x91CA;&#x5668;&#x4E2D;&#x5B58;&#x5728;&#x4E00;&#x79CD;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x88AB;&#x63D0;&#x5347;&#x7684;&#x673A;&#x5236;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<strong>&#x51FD;&#x6570;&#x58F0;&#x660E;</strong>&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x5230;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6700;&#x524D;&#x9762;&#xFF0C;&#x5373;&#x4F7F;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x662F;&#x5199;&#x5728;&#x6700;&#x540E;&#x9762;&#xFF0C;&#x4E5F;&#x8FD8;&#x662F;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x81F3;&#x6700;&#x524D;&#x9762;&#x3002;<br>&#x800C;&#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;&#x662F;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF0C;&#x4E14;&#x8981;&#x7B49;&#x5230;&#x8868;&#x8FBE;&#x5F0F;&#x8D4B;&#x503C;&#x5B8C;&#x6210;&#x540E;&#x624D;&#x80FD;&#x8C03;&#x7528;</blockquote><p>&#x56E0;&#x6B64;&#xFF0C;&#x5373;&#x4F7F;&#x51FD;&#x6570;&#x8FD8;&#x672A;&#x88AB;&#x5B9A;&#x4E49;&#xFF0C;&#x4F46;&#x662F;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x5DF2;&#x7ECF;&#x88AB;&#x63D0;&#x5347;&#x5230;&#x6700;&#x524D;&#x9762;&#x4E86;&#xFF0C;&#x4E0A;&#x9762;&#x90A3;&#x6BB5;&#x4EE3;&#x7801;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var say; //&#x53D8;&#x91CF;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x6B64;&#x65F6;&#x7684;&#x503C;&#x4E3A;undefined
    say();// &#x51FD;&#x6570;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x8F93;&#x51FA;&#x201C;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x201D;
    var say = function(){
          console.log(&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;);
    }
    say();
    function say(){
     console.log(&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;);
    }
    say();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> say; <span class="hljs-comment">//&#x53D8;&#x91CF;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x6B64;&#x65F6;&#x7684;&#x503C;&#x4E3A;undefined</span>
    say();<span class="hljs-comment">// &#x51FD;&#x6570;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x8F93;&#x51FA;&#x201C;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x201D;</span>
    <span class="hljs-keyword">var</span> say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;</span>);
    }
    say();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;</span>);
    }
    say();
</code></pre><p>&#x4ECE;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#x7684;&#x5BF9;&#x6BD4;&#xFF0C;&#x66F4;&#x80FD;&#x7406;&#x89E3;&#x201C;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347;&#x201D;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF1A;<br>1.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var say;
console.log(say);
say();
function say(){
   console.log(&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;);
}

&#x8F93;&#x51FA;&#xFF1A;
f say(){
   console.log(&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;);
}
&#x51FD;&#x6570;&#x58F0;&#x660E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>var <span class="hljs-built_in">say</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">say</span>);
<span class="hljs-built_in">say</span>();
function <span class="hljs-built_in">say</span>(){
   console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;</span>);
}

&#x8F93;&#x51FA;&#xFF1A;
f <span class="hljs-built_in">say</span>(){
   console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;</span>);
}
&#x51FD;&#x6570;&#x58F0;&#x660E;</code></pre><p>2.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var say;
console.log(say);
say();
var say = function(){
   console.log(&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;);
}

&#x8F93;&#x51FA;&#xFF1A;
undefined
Uncaught TypeError: say is not a function
    at &lt;anonymous&gt;:3:1
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> say;
<span class="hljs-built_in">console</span>.log(say);
say();
<span class="hljs-keyword">var</span> say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;</span>);
}

&#x8F93;&#x51FA;&#xFF1A;
<span class="hljs-literal">undefined</span>
Uncaught <span class="hljs-built_in">TypeError</span>: say is not a <span class="hljs-function"><span class="hljs-keyword">function</span>
    <span class="hljs-title">at</span> &lt;<span class="hljs-title">anonymous</span>&gt;:3:1
</span></code></pre><p>2.&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;say&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x4E3A;&#x6B64;&#x65F6;&#x7684;<code>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</code>&#x8986;&#x76D6;&#x4E86;<code>&#x51FD;&#x6570;&#x58F0;&#x660E;</code>&#xFF0C;&#x56E0;&#x6B64;&#x8F93;&#x51FA;&#x4E86;&#x2018;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x2019;&#xFF0C;&#x7136;&#x800C;&#x5230;&#x4E86;&#x7B2C;&#x4E09;&#x6B21;&#x8C03;&#x7528;say&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6B64;&#x65F6;&#x6253;&#x5370;&#x7684;&#x7ADF;&#x7136;&#x8FD8;&#x662F;&#x2018;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x2019;&#xFF1F;&#xFF1F;&#x4E3A;&#x4EC0;&#x4E48;&#x540E;&#x9762;&#x7684;<code>&#x51FD;&#x6570;&#x58F0;&#x660E;</code>&#x6CA1;&#x6709;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;<code>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</code>&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x7531;&#x4E8E;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x8FD0;&#x884C;&#x7684;&#x987A;&#x5E8F;&#x662F;&#x7C7B;&#x4F3C;&#x4E8E;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var say; //&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;var&#x63D0;&#x524D;&#xFF0C;&#x503C;&#x4E3A;undefined

function say() {
    console.log(&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;);
}//&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x6700;&#x524D;&#x9762;&#x8FD0;&#x884C;&#x4E86;

say(); //&#x51FD;&#x6570;&#x58F0;&#x660E;
say = function() { //&#x7ED9;say&#x8D4B;&#x503C;&#x51FD;&#x6570;
    console.log(&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;);
}
say();//&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;
say();//&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> say; <span class="hljs-comment">//&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;var&#x63D0;&#x524D;&#xFF0C;&#x503C;&#x4E3A;undefined</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x58F0;&#x660E;&apos;</span>);
}<span class="hljs-comment">//&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x6700;&#x524D;&#x9762;&#x8FD0;&#x884C;&#x4E86;</span>

say(); <span class="hljs-comment">//&#x51FD;&#x6570;&#x58F0;&#x660E;</span>
say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//&#x7ED9;say&#x8D4B;&#x503C;&#x51FD;&#x6570;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&apos;</span>);
}
say();<span class="hljs-comment">//&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</span>
say();<span class="hljs-comment">//&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</span>
</code></pre><h2 id="articleHeader2">3.&#x603B;&#x7ED3;</h2><p>1.&#x51FD;&#x6570;&#x58F0;&#x660E;&#x5728;JS&#x89E3;&#x6790;&#x65F6;&#x8FDB;&#x884C;&#x51FD;&#x6570;&#x63D0;&#x5347;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#xFF0C;&#x4E0D;&#x7BA1;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x5728;&#x54EA;&#x91CC;&#x5B9A;&#x4E49;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x90FD;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x3002;<br>2.&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x662F;&#x5728;JS&#x8FD0;&#x884C;&#x65F6;&#x786E;&#x5B9A;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x8D4B;&#x503C;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x624D;&#x80FD;&#x8C03;&#x7528;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「JavaScript」函数声明和函数表达式

## 原文链接
[https://segmentfault.com/a/1190000015635567](https://segmentfault.com/a/1190000015635567)


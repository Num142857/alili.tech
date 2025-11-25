---
title: '【前端工程师手册】JavaScript之this的笔记' 
date: 2018-11-29 9:33:05
hidden: true
slug: 4vgg31fgmhh
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x4ECA;&#x5929;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;this&#x3002;</p>
<h2 id="articleHeader0">&#x8BEF;&#x89E3;</h2>
<p>&#x719F;&#x6089;Java&#x6216;&#x8005;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x7684;&#x540C;&#x5B66;&#x770B;&#x5230;this&#x4F1A;&#x60F3;&#x5F53;&#x7136;&#x7684;&#x8BA4;&#x4E3A;this&#x6307;&#x5411;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#xFF0C;&#x7136;&#x800C;&#x5728;JavaScript&#x4E2D;&#x5E76;&#x4E0D;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
    console.log(this.index)
}
func.index  = 123
func() // undefined" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs autoit"><code>function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>{</span>
    console.<span class="hljs-built_in">log</span>(this.index)
}
<span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">index</span>  = 123</span>
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span> // <span class="hljs-title">undefined</span></span></code></pre>
<p>&#x7ED3;&#x679C;&#x5F88;&#x663E;&#x7136;&#xFF0C;this&#x5E76;&#x4E0D;&#x662F;&#x6307;&#x5411;&#x51FD;&#x6570;&#x81EA;&#x8EAB;&#x3002;</p>
<h2 id="articleHeader1">this&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;</h2>
<p>&#x90A3;&#x4E48;this&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;<br>&#x5F53;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6D3B;&#x52A8;&#x8BB0;&#x5F55;(&#x6709;&#x65F6;&#x5019;&#x4E5F;&#x79F0;&#x4E3A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;)&#x3002;&#x8FD9;&#x4E2A;&#x8BB0;&#x5F55;&#x4F1A;&#x5305; &#x542B;&#x51FD;&#x6570;&#x5728;&#x54EA;&#x91CC;&#x88AB;&#x8C03;&#x7528;(&#x8C03;&#x7528;&#x6808;)&#x3001;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x3001;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x7B49;&#x4FE1;&#x606F;&#x3002;this &#x5C31;&#x662F;&#x8BB0;&#x5F55;&#x7684; &#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4F1A;&#x5728;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7528;&#x5230;&#x3002;<br>&#x957F;&#x8BDD;&#x77ED;&#x8BF4;&#xFF1A;this&#x5C31;&#x662F;&#x51FD;&#x6570;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;<br>this &#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5728;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#x53D1;&#x751F;&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x5B83;&#x6307;&#x5411;&#x4EC0;&#x4E48;&#x5B8C;&#x5168;&#x53D6;&#x51B3;&#x4E8E;&#x51FD;&#x6570;&#x5728;&#x54EA;&#x91CC;&#x88AB;&#x8C03;&#x7528;&#x3002;</p>
<h2 id="articleHeader2">this&#x7684;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;</h2>
<ul>
<li>
<p><strong>&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;</strong><br>   &#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() {
       console.log( this.a );
   }
   var a = 2; 
   foo(); // 2" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
   }
   <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>; 
   foo(); <span class="hljs-comment">// 2</span></code></pre>
<p>&#x5F53;&#x8C03;&#x7528; foo() &#x65F6;&#xFF0C;this.a &#x88AB;&#x89E3;&#x6790;&#x6210;&#x4E86;&#x5168;&#x5C40;&#x53D8;&#x91CF; a&#x3002;&#x4E3A;&#x4EC0;&#x4E48;?&#x56E0;&#x4E3A;&#x5728;&#x672C;&#x4F8B;&#x4E2D;&#xFF0C;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#x5E94;&#x7528;&#x4E86; this &#x7684;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#xFF0C;&#x56E0;&#x6B64; this &#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x3002;<br>   &#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x600E;&#x4E48;&#x77E5;&#x9053;&#x8FD9;&#x91CC;&#x5E94;&#x7528;&#x4E86;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x5462;?&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5206;&#x6790;&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#x6765;&#x770B;&#x770B; foo() &#x662F;&#x5982;&#x4F55;&#x8C03; &#x7528;&#x7684;&#x3002;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;foo() &#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x4E0D;&#x5E26;&#x4EFB;&#x4F55;&#x4FEE;&#x9970;&#x7684;&#x51FD;&#x6570;&#x5F15;&#x7528;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x53EA;&#x80FD;&#x4F7F;&#x7528; &#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#xFF0C;&#x65E0;&#x6CD5;&#x5E94;&#x7528;&#x5176;&#x4ED6;&#x89C4;&#x5219;&#x3002;<br>   &#x4F46;&#x662F;&#x6B64;&#x65F6;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E86;&#x4E25;&#x683C;&#x6A21;&#x5F0F;(strict mode)&#xFF0C;&#x90A3;&#x4E48;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x5C06;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#xFF0C;&#x56E0;&#x6B64; this &#x4F1A;&#x7ED1;&#x5B9A; &#x5230; undefined&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() { 
       &quot;use strict&quot;;
        console.log( this.a );
    }

   var a = 2;
   foo(); // TypeError: this is undefined
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ 
<span class="hljs-meta">       &quot;use strict&quot;</span>;
        <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
    }

   <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
   foo(); <span class="hljs-comment">// TypeError: this is undefined</span>
</code></pre>
</li>
<li>
<p><strong>&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() { 
       console.log( this.a );
   }
   var obj = { 
       a: 2,
       foo: foo 
   };
   obj.foo(); // 2" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ 
       <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
   }
   <span class="hljs-keyword">var</span> obj = { 
       <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
       <span class="hljs-attr">foo</span>: foo 
   };
   obj.foo(); <span class="hljs-comment">// 2</span></code></pre>
<p>&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#x4F1A;&#x4F7F;&#x7528; obj &#x4E0A;&#x4E0B;&#x6587;&#x6765;&#x5F15;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x6B64;&#x4F60;&#x53EF;&#x4EE5;&#x8BF4;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6; obj &#x5BF9;&#x8C61;&#x201C;&#x62E5; &#x6709;&#x201D;&#x6216;&#x8005;&#x201C;&#x5305;&#x542B;&#x201D;&#x5B83;&#x3002;<br>   &#x5F53; foo() &#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x5B83;&#x7684;&#x843D;&#x811A;&#x70B9;&#x786E;&#x5B9E;&#x6307;&#x5411; obj &#x5BF9;&#x8C61;&#x3002;&#x5F53;&#x51FD;&#x6570;&#x5F15; &#x7528;&#x6709;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#x4F1A;&#x628A;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E2D;&#x7684; this &#x7ED1;&#x5B9A;&#x5230;&#x8FD9;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x3002;&#x56E0;&#x4E3A;&#x8C03; &#x7528; foo() &#x65F6; this &#x88AB;&#x7ED1;&#x5B9A;&#x5230; obj&#xFF0C;&#x56E0;&#x6B64; this.a &#x548C; obj.a &#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;<br>   &#x8FD9;&#x79CD;&#x7ED1;&#x5B9A;&#x65B9;&#x5F0F;&#x7684;&#x53CD;&#x9762;&#x5373;&#x662F;this&#x7684;<strong>&#x9690;&#x5F62;&#x4E22;&#x5931;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() { 
       console.log( this.a );
   }
   var obj = { 
       a: 2,
       foo: foo 
   };
   var bar = obj.foo; // &#x51FD;&#x6570;&#x522B;&#x540D;!
   var a = &quot;oops, global&quot;; // a &#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;
   bar(); // &quot;oops, global&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ 
       <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
   }
   <span class="hljs-keyword">var</span> obj = { 
       <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
       <span class="hljs-attr">foo</span>: foo 
   };
   <span class="hljs-keyword">var</span> bar = obj.foo; <span class="hljs-comment">// &#x51FD;&#x6570;&#x522B;&#x540D;!</span>
   <span class="hljs-keyword">var</span> a = <span class="hljs-string">&quot;oops, global&quot;</span>; <span class="hljs-comment">// a &#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;</span>
   bar(); <span class="hljs-comment">// &quot;oops, global&quot;</span>
</code></pre>
</li>
<li>
<p><strong>&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;</strong><br>   &#x4E00;&#x4E2A;&#x5C0F;&#x6817;&#x5B50;&#xFF1A;<br><strong>call&#x548C;apply</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() { 
       console.log( this.a );
   }
   var obj = { 
       a:2
   };
   foo.call( obj ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ 
       <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
   }
   <span class="hljs-keyword">var</span> obj = { 
       <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
   };
   foo.call( obj ); <span class="hljs-comment">// 2</span></code></pre>
<p>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x4EEC;&#x4F1A;&#x628A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7ED1;&#x5B9A;&#x5230; this&#xFF0C;&#x63A5;&#x7740;&#x5728;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#x6307;&#x5B9A;&#x8FD9;&#x4E2A; this&#x3002;&#x56E0;&#x4E3A;&#x4F60;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6307;&#x5B9A; this &#x7684;&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x6211; &#x4EEC;&#x79F0;&#x4E4B;&#x4E3A;&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;&#x3002;<br><strong>bind</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo(something) { 
       console.log( this.a, something ); 
       return this.a + something;
   }
   function bind(fn, obj) {
       return function() {
           return fn.apply( obj, arguments );
       };
   }
   var obj = { 
       a:2
   };
   var bar = bind( foo, obj );
   var b = bar( 3 ); // 2 3
   console.log( b ); // 5" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>) </span>{ 
       <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a, something ); 
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + something;
   }
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bind</span>(<span class="hljs-params">fn, obj</span>) </span>{
       <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
           <span class="hljs-keyword">return</span> fn.apply( obj, <span class="hljs-built_in">arguments</span> );
       };
   }
   <span class="hljs-keyword">var</span> obj = { 
       <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
   };
   <span class="hljs-keyword">var</span> bar = bind( foo, obj );
   <span class="hljs-keyword">var</span> b = bar( <span class="hljs-number">3</span> ); <span class="hljs-comment">// 2 3</span>
   <span class="hljs-built_in">console</span>.log( b ); <span class="hljs-comment">// 5</span></code></pre>
<p>&#x7531;&#x4E8E;&#x786C;&#x7ED1;&#x5B9A;&#x662F;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x5E38;&#x7528;&#x7684;&#x6A21;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x5728; ES5 &#x4E2D;&#x63D0;&#x4F9B;&#x4E86;&#x5185;&#x7F6E;&#x7684;&#x65B9;&#x6CD5; Function.prototype.bind<br>   bind(..) &#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x786C;&#x7F16;&#x7801;&#x7684;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x4F1A;&#x628A;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x4E3A; this &#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x5E76;&#x8C03;&#x7528;&#x539F;&#x59CB;&#x51FD;&#x6570;</p>
</li>
<li>
<p><strong>new&#x7ED1;&#x5B9A;</strong><br>   &#x4F7F;&#x7528; new &#x6765;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x53D1;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p>
<ol>
<li>&#x521B;&#x5EFA;(&#x6216;&#x8005;&#x8BF4;&#x6784;&#x9020;)&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x3002;</li>
<li>&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x6267;&#x884C;[[&#x539F;&#x578B;]]&#x8FDE;&#x63A5;&#x3002;</li>
<li>&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x4F1A;&#x7ED1;&#x5B9A;&#x5230;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;this&#x3002;</li>
<li>
<p>&#x5982;&#x679C;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;new&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4F1A;&#x81EA;&#x52A8;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x3002;<br>  &#x4F8B;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function foo(a) { 
      this.a = a;
  }
  var bar = new foo(2); 
  console.log( bar.a ); // 2
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{ 
      <span class="hljs-keyword">this</span>.a = a;
  }
  <span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> foo(<span class="hljs-number">2</span>); 
  <span class="hljs-built_in">console</span>.log( bar.a ); <span class="hljs-comment">// 2</span>
</code></pre>
</li>
</ol>
</li>
</ul>
<h2 id="articleHeader3">&#x56DB;&#x79CD;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#x7684;&#x4F18;&#x5148;&#x7EA7;</h2>
<p>&#x9996;&#x5148;&#xFF0C;<strong>&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x662F;&#x56DB;&#x6761;&#x89C4;&#x5219;&#x4E2D;&#x6700;&#x4F4E;&#x7684;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() { 
    console.log( this.a );
}
var obj1 = { 
    a: 2,
    foo: foo 
};
var obj2 = { 
    a: 3,
    foo: foo 
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{ 
    console.log( this.a );
}</span>
<span class="hljs-title">var</span> <span class="hljs-title">obj1</span> = <span class="hljs-comment">{ 
    a: 2,
    foo: foo 
}</span>;</span>
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-comment">{ 
    a: 3,
    foo: foo 
}</span>;
obj1.foo(); <span class="hljs-comment">// 2</span>
obj2.foo(); <span class="hljs-comment">// 3</span>
obj1.foo.call( obj2 ); <span class="hljs-comment">// 3</span>
obj2.foo.call( obj1 ); <span class="hljs-comment">// 2</span></code></pre>
<p>&#x7ED3;&#x8BBA;&#xFF1A;<strong>&#x663E;&#x5F0F;&#x7ED1;&#x5B9A; &gt; &#x9690;&#x5F0F;&#x7ED1;&#x5B9A;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(something) { 
    this.a = something;
}
var obj1 = { 
    foo: foo
};
var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2
obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2 
console.log( bar.a ); // 4" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>) </span>{ 
    <span class="hljs-keyword">this</span>.a = something;
}
<span class="hljs-keyword">var</span> obj1 = { 
    <span class="hljs-attr">foo</span>: foo
};
<span class="hljs-keyword">var</span> obj2 = {};
obj1.foo( <span class="hljs-number">2</span> );
<span class="hljs-built_in">console</span>.log( obj1.a ); <span class="hljs-comment">// 2</span>
obj1.foo.call( obj2, <span class="hljs-number">3</span> );
<span class="hljs-built_in">console</span>.log( obj2.a ); <span class="hljs-comment">// 3</span>

<span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> obj1.foo( <span class="hljs-number">4</span> );
<span class="hljs-built_in">console</span>.log( obj1.a ); <span class="hljs-comment">// 2 </span>
<span class="hljs-built_in">console</span>.log( bar.a ); <span class="hljs-comment">// 4</span></code></pre>
<p>&#x7ED3;&#x8BBA;&#xFF1A;<strong>new &#x7ED1;&#x5B9A;  &gt;  &#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4F18;&#x5148;&#x7EA7;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(something) { 
    this.a = something;
}
var obj1 = {};
var bar = foo.bind( obj1 ); 
bar( 2 );
console.log( obj1.a ); // 2
var baz = new bar(3);
console.log( obj1.a ); // 2 
console.log( baz.a ); // 3" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>) </span>{ 
    <span class="hljs-keyword">this</span>.a = something;
}
<span class="hljs-keyword">var</span> obj1 = {};
<span class="hljs-keyword">var</span> bar = foo.bind( obj1 ); 
bar( <span class="hljs-number">2</span> );
<span class="hljs-built_in">console</span>.log( obj1.a ); <span class="hljs-comment">// 2</span>
<span class="hljs-keyword">var</span> baz = <span class="hljs-keyword">new</span> bar(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log( obj1.a ); <span class="hljs-comment">// 2 </span>
<span class="hljs-built_in">console</span>.log( baz.a ); <span class="hljs-comment">// 3</span></code></pre>
<p>&#x7ED3;&#x8BBA;&#xFF1A;<strong>new&#x7ED1;&#x5B9A; &gt;  es&#x539F;&#x751F;bind&#x7ED1;&#x5B9A;</strong><br>&#x603B;&#x7ED3;&#x5224;&#x65AD;this&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p>
<ol>
<li>&#x51FD;&#x6570;&#x662F;&#x5426;&#x5728;new&#x4E2D;&#x8C03;&#x7528;(new&#x7ED1;&#x5B9A;)?&#x5982;&#x679C;&#x662F;&#x7684;&#x8BDD;this&#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x3002;var bar = new foo()</li>
<li>&#x51FD;&#x6570;&#x662F;&#x5426;&#x901A;&#x8FC7;call&#x3001;apply(&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;)&#x6216;&#x8005;&#x786C;&#x7ED1;&#x5B9A;&#x8C03;&#x7528;?&#x5982;&#x679C;&#x662F;&#x7684;&#x8BDD;&#xFF0C;this&#x7ED1;&#x5B9A;&#x7684;&#x662F; &#x6307;&#x5B9A;&#x7684;&#x5BF9;&#x8C61;&#x3002;var bar = foo.call(obj2)</li>
<li>&#x51FD;&#x6570;&#x662F;&#x5426;&#x5728;&#x67D0;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x4E2D;&#x8C03;&#x7528;(&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;)?&#x5982;&#x679C;&#x662F;&#x7684;&#x8BDD;&#xFF0C;this &#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x90A3;&#x4E2A;&#x4E0A; &#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x3002;var bar = obj1.foo()</li>
<li>&#x5982;&#x679C;&#x90FD;&#x4E0D;&#x662F;&#x7684;&#x8BDD;&#xFF0C;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x3002;&#x5982;&#x679C;&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5C31;&#x7ED1;&#x5B9A;&#x5230;undefined&#xFF0C;&#x5426;&#x5219;&#x7ED1;&#x5B9A;&#x5230; &#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x3002;var bar = foo()</li>
</ol>
<p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;<br><a href="https://book.douban.com/subject/26351021/" rel="nofollow noreferrer" target="_blank">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;JavaScript-&#x4E0A;&#x5377;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端工程师手册】JavaScript之this的笔记

## 原文链接
[https://segmentfault.com/a/1190000015036284](https://segmentfault.com/a/1190000015036284)


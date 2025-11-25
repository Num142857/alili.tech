---
title: '函数柯里化(curry)' 
date: 2018-11-18 2:30:10
hidden: true
slug: 5spyczfyb2q
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#xFF08;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x586B;&#x4E4B;&#x524D;&#x7684;&#x5751;&#xFF09;</p><h2 id="articleHeader1">&#x6B63;&#x6587;</h2><h3 id="articleHeader2">&#x5F15;&#x5B50;-&#x4ECE;apply&#x8BF4;&#x51FD;&#x6570;&#x5E94;&#x7528;</h3><p>&#x5728;js&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x4E8E;function&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x53EF;&#x80FD;&#x5927;&#x90E8;&#x5206;&#x60C5;&#x51B5;&#x4E0B;&#x90FD;&#x8FD8;&#x662F;&#x5904;&#x4E8E;<strong>&#x8C03;&#x7528;</strong>,&#x5F62;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x, y) {
    return x + y
}
console.log(add(1, 2)) //&#x51FD;&#x6570;&#x8C03;&#x7528; &#x8FD4;&#x56DE;3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x + y
}
<span class="hljs-built_in">console</span>.log(add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)) <span class="hljs-comment">//&#x51FD;&#x6570;&#x8C03;&#x7528; &#x8FD4;&#x56DE;3</span></code></pre><p>&#x4F46;&#x662F;&#x6709;&#x4E00;&#x4E2A;<code>apply()</code>&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x6211;&#x4EEC;&#x62E5;&#x6709;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x6765;<strong>&#x5E94;&#x7528;&#x51FD;&#x6570;</strong>,&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x, y) {
    return x + y
}
console.log(add.apply(null, [1, 2])) //&#x8FD4;&#x56DE;3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x + y
}
<span class="hljs-built_in">console</span>.log(add.apply(<span class="hljs-literal">null</span>, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>])) <span class="hljs-comment">//&#x8FD4;&#x56DE;3</span></code></pre><p><code>apply</code>&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;<code>null</code>&#x65F6;&#xFF0C;<code>this</code>&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF08;&#x5FD8;&#x8BB0;&#x8BF7;&#x81EA;&#x884C;&#x67E5;&#x9605;&#x67E5;mdn&#xFF09;,&#x5728;&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x91CC;&#xFF0C;&#x901A;&#x8FC7;<code>apply</code>&#x6765;&#x5E94;&#x7528;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6548;&#x679C;&#x548C;<strong>&#x8C03;&#x7528;&#x51FD;&#x6570;</strong>&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#x3002;</p><h3 id="articleHeader3">&#x90E8;&#x5206;&#x5E94;&#x7528;</h3><p>&#x4ECE;&#x524D;&#x6587;&#x53EF;&#x77E5;&#xFF0C;<strong>&#x51FD;&#x6570;&#x8C03;&#x7528;&#x5C31;&#x662F;&#x8BA9;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x96C6;&#x5408;(&#x524D;&#x9762;&#x7684;[1,2])&#x5E94;&#x7528;&#x5230;&#x51FD;&#x6570;(&#x524D;&#x6587;&#x7684;add&#x51FD;&#x6570;)&#x4E2D;</strong>&#xFF0C;&#x90A3;&#x90E8;&#x5206;&#x5E94;&#x7528;&#x5C31;&#x662F;<strong>&#x8003;&#x8651;&#x53EA;&#x4F20;&#x9012;&#x90E8;&#x5206;&#x53C2;&#x6570;&#xFF0C;&#x800C;&#x975E;&#x6240;&#x6709;&#x53C2;&#x6570;&#x3002;</strong> &#x8FD8;&#x662F;&#x4E0A;&#x9762;<code>add</code>&#x51FD;&#x6570;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;<strong>&#x5E0C;&#x671B;&#x5B9E;&#x73B0;</strong>&#x4E0B;&#x9762;&#x7684;&#x5F62;&#x5F0F;(&#x5728;&#x4E0B;&#x4E00;&#x8282;&#x5177;&#x4F53;&#x5B9E;&#x73B0;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newAdd = add.apply(null,[1])//&#x90E8;&#x5206;&#x5E94;&#x7528; &#x53EA;&#x4F20;&#x9012;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;
newAdd.apply(null,[2]) //3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Add</span> = add.apply(<span class="hljs-literal">null</span>,[<span class="hljs-number">1</span>])<span class="hljs-comment">//&#x90E8;&#x5206;&#x5E94;&#x7528; &#x53EA;&#x4F20;&#x9012;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;</span>
<span class="hljs-keyword">new</span><span class="hljs-type">Add</span>.apply(<span class="hljs-literal">null</span>,[<span class="hljs-number">2</span>]) <span class="hljs-comment">//3</span></code></pre><p>&#x5206;&#x6790;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x77E5;&#xFF0C;&#x5B9E;&#x73B0;&#x90E8;&#x5206;&#x5E94;&#x7528;&#x7684;&#x5173;&#x952E;&#x662F;&#xFF1A;<strong>&#x90E8;&#x5206;&#x5E94;&#x7528;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;,&#x8BE5;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x88AB;&#x4F20;&#x5165;&#x5176;&#x4ED6;&#x53C2;&#x6570;&#x518D;&#x6B21;&#x8C03;&#x7528;</strong></p><h3 id="articleHeader4">&#x67EF;&#x91CC;&#x5316;(curry)</h3><p>&#x73B0;&#x5728;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#xFF0C;&#x524D;&#x9762;&#x8BB2;&#x5B8C;&#x4E86;<code>&#x90E8;&#x5206;&#x5E94;&#x7528;</code>&#x3002;curry&#x5316;&#x7684;&#x542B;&#x4E49;&#xFF0C;&#x5C31;&#x662F;<strong>&#x4F7F;&#x51FD;&#x6570;&#x7406;&#x89E3;&#x5E76;&#x5904;&#x7406;&#x90E8;&#x5206;&#x5E94;&#x7528;&#x7684;&#x8FC7;&#x7A0B;</strong></p><p>&#x7EE7;&#x7EED;&#x6309;&#x7167;&#x4E0A;&#x6587;&#x7684;&#x601D;&#x8DEF;&#x5B9E;&#x73B0;<code>add</code>&#x51FD;&#x6570;&#x7684;curry&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x, y) {
    // &#x5982;&#x679C;&#x53EA;&#x4F20;&#x9012;&#x90E8;&#x5206;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x90E8;&#x5206;&#x5E94;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;
    if (y === undefined) {
      return function (y) {
        return x + y
      }
    }
    return x + y //&#x5982;&#x679C;&#x4F20;&#x9012;&#x6240;&#x6709;&#x53C2;&#x6570;&#xFF0C;&#x76F4;&#x63A5;&#x5B8C;&#x5168;&#x5E94;&#x7528;
}
//&#x8FD0;&#x884C;&#x524D;&#x4E00;&#x8282;&#x4EE3;&#x7801;
var newAdd = add.apply(null, [1])
console.log(newAdd.apply(null, [2])) //3
console.log(newAdd.apply(null, [5])) //6" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span></span>(x, y) {
    <span class="hljs-comment">// &#x5982;&#x679C;&#x53EA;&#x4F20;&#x9012;&#x90E8;&#x5206;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x90E8;&#x5206;&#x5E94;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">if</span> (y === undefined) {
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(y) {
        <span class="hljs-keyword">return</span> x + y
      }
    }
    <span class="hljs-keyword">return</span> x + y <span class="hljs-comment">//&#x5982;&#x679C;&#x4F20;&#x9012;&#x6240;&#x6709;&#x53C2;&#x6570;&#xFF0C;&#x76F4;&#x63A5;&#x5B8C;&#x5168;&#x5E94;&#x7528;</span>
}
<span class="hljs-comment">//&#x8FD0;&#x884C;&#x524D;&#x4E00;&#x8282;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Add</span> = add.apply(<span class="hljs-literal">null</span>, [<span class="hljs-number">1</span>])
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Add</span>.apply(<span class="hljs-literal">null</span>, [<span class="hljs-number">2</span>])) <span class="hljs-comment">//3</span>
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Add</span>.apply(<span class="hljs-literal">null</span>, [<span class="hljs-number">5</span>])) <span class="hljs-comment">//6</span></code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x524D;&#x4E00;&#x8282;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;curry&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#xFF1A;&#x7ECF;&#x8FC7;&#x4E00;&#x6B21;curry&#x7684;<code>newadd</code>&#x51FD;&#x6570;&#xFF0C;&#x53D8;&#x6210;&#x4E00;&#x4E2A;&#x4E0E;1&#x6C42;&#x548C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x5E94;&#x7528;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x90FD;&#x80FD;&#x5F97;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x8FD9;&#x4E2A;curry&#x592A;&#x5C40;&#x9650;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x8003;&#x8651;&#xFF0C;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x901A;&#x7528;&#x7684;curry&#x51FD;&#x6570;</p><h3 id="articleHeader5">&#x901A;&#x7528;curry&#x51FD;&#x6570;</h3><p>&#x5148;&#x56DE;&#x5FC6;&#x524D;&#x9762;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x6765;&#x601D;&#x8003;curry&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x73B0;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x4FDD;&#x5B58;&#x8C03;&#x7528;curry&#x51FD;&#x6570;&#x65F6;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#xFF08;&#x5373;&#x67EF;&#x91CC;&#x5316;&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF09;</li><li>&#x7ED3;&#x679C;&#x51FD;&#x6570;&#x5728;&#x88AB;&#x8C03;&#x7528;&#x540E;&#xFF0C;&#x8981;&#x8BA9;&#x65B0;&#x7684;&#x53C2;&#x6570;&#x548C;&#x65E7;&#x7684;&#x53C2;&#x6570;&#x4E00;&#x8D77;&#x5E94;&#x7528;&#x7684;&#x5165;&#x53C2;&#x51FD;&#x6570;&#x4E2D;</li></ol><p><em>&#x6CE8;&#xFF1A;&#x5165;&#x53C2;&#x51FD;&#x6570;-&#x8981;&#x88AB;curry&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x7ED3;&#x679C;&#x51FD;&#x6570;-&#x88AB;curry&#x4E4B;&#x540E;&#x7684;&#x51FD;&#x6570;</em>*</p><p>&#x6587;&#x5B57;&#x6BD4;&#x8F83;&#x62BD;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x770B;&#x5B9E;&#x73B0;&#x5728;&#x56DE;&#x6765;&#x770B;&#x8FC7;&#x7A0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function commonCurry(fn) {
    var slice = Array.prototype.slice,
      storedArgs = slice.call(arguments, 1) //&#x4F7F;&#x7528;slice&#x662F;&#x4E3A;&#x4E86;&#x628A;arguments&#x8F6C;&#x6362;&#x6210;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5265;&#x79BB;&#x6B64;&#x5904;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;fn
    return function () {
      var newArgs = slice.call(arguments), //&#x65B0;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;
        args = storedArgs.concat(newArgs)
      return fn.apply(null, args)
    }
  }

  //&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;
  function add(a, b) {
    return a + b
  }
  var newAdd = commonCurry(add, 10)
  console.log(newAdd(5))
  
  // &#x591A;&#x4E2A;&#x53C2;&#x6570;
  function add2(a, b, c, d) {
    return a + b + c + d
  }
  var newAdd2 = commonCurry(add2, 10, 10)
  console.log(newAdd2(5, 4))//29
  
  // &#x591A;&#x6B21;curry
  var newAdd3 = commonCurry(newAdd2, 10)
  console.log(newAdd3(10))//40
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commonCurry</span></span>(fn) {
    <span class="hljs-keyword">var</span> slice = <span class="hljs-keyword">Array</span>.prototype.slice,
      storedArgs = slice.call(arguments, <span class="hljs-number">1</span>) <span class="hljs-comment">//&#x4F7F;&#x7528;slice&#x662F;&#x4E3A;&#x4E86;&#x628A;arguments&#x8F6C;&#x6362;&#x6210;&#x771F;&#x6B63;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5265;&#x79BB;&#x6B64;&#x5904;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;fn</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> </span>() {
      <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Args</span> = slice.call(arguments), <span class="hljs-comment">//&#x65B0;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;</span>
        args = storedArgs.concat(<span class="hljs-keyword">new</span><span class="hljs-type">Args</span>)
      <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>, args)
    }
  }

  <span class="hljs-comment">//&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span></span>(a, b) {
    <span class="hljs-keyword">return</span> a + b
  }
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Add</span> = commonCurry(add, <span class="hljs-number">10</span>)
  console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Add</span>(<span class="hljs-number">5</span>))
  
  <span class="hljs-comment">// &#x591A;&#x4E2A;&#x53C2;&#x6570;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add2</span></span>(a, b, c, d) {
    <span class="hljs-keyword">return</span> a + b + c + d
  }
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Add2</span> = commonCurry(add2, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>)
  console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Add2</span>(<span class="hljs-number">5</span>, <span class="hljs-number">4</span>))<span class="hljs-comment">//29</span>
  
  <span class="hljs-comment">// &#x591A;&#x6B21;curry</span>
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Add3</span> = commonCurry(<span class="hljs-keyword">new</span><span class="hljs-type">Add2</span>, <span class="hljs-number">10</span>)
  console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Add3</span>(<span class="hljs-number">10</span>))<span class="hljs-comment">//40</span>
</code></pre><h2 id="articleHeader6">&#x5C0F;&#x7ED3;</h2><p>&#x4E4B;&#x540E;&#x4F1A;&#x5C1D;&#x8BD5;&#x4EE5;&#x66F4;&#x7B80;&#x6D01;&#x660E;&#x4E86;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5199;&#x6587;&#x7AE0;&#x3002;<strong>&#x5982;&#x679C;&#x5185;&#x5BB9;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF08;&#x89C9;&#x5F97;&#x770B;&#x7740;&#x4E0D;&#x7406;&#x89E3;&#x4E0D;&#x8212;&#x670D;&#x60F3;&#x5410;&#x69FD;&#x4E5F;&#x5B8C;&#x5168;&#x6CA1;&#x95EE;&#x9898;&#xFF09;</strong>&#xFF1B;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x8D5E;&#x548C;&#x6536;&#x85CF;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x5F81;&#x5F97;&#x540C;&#x610F;&#x540E;&#x8457;&#x660E;&#x51FA;&#x5904;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x4E5F;&#x6B22;&#x8FCE;&#x79C1;&#x4FE1;&#x4EA4;&#x6D41;&#xFF0C;&#x4E3B;&#x9875;&#x6DFB;&#x52A0;&#x4E86;&#x90AE;&#x7BB1;&#x5730;&#x5740;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
函数柯里化(curry)

## 原文链接
[https://segmentfault.com/a/1190000015929416](https://segmentfault.com/a/1190000015929416)


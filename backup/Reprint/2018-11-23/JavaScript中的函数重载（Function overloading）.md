---
title: 'JavaScript中的函数重载（Function overloading）' 
date: 2018-11-23 2:30:11
hidden: true
slug: do9h3glqxxo
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x8BF4;&#x660E;</h3><p>JavaScript &#x4E2D;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x8F7D;&#x3002;</p><h3 id="articleHeader1">&#x51FD;&#x6570;&#x91CD;&#x8F7D;</h3><p>&#x51FD;&#x6570;&#x540D;&#x76F8;&#x540C;&#xFF0C;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x5217;&#x8868;&#x4E0D;&#x540C;(&#x5305;&#x62EC;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x548C;&#x53C2;&#x6570;&#x7C7B;&#x578B;)&#xFF0C;&#x6839;&#x636E;&#x53C2;&#x6570;&#x7684;&#x4E0D;&#x540C;&#x53BB;&#x6267;&#x884C;&#x4E0D;&#x540C;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x6211;&#x4EEC;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x770B;&#x770B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function overload(a){
    console.log(&apos;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&apos;)
}

function overload(a,b){
    console.log(&apos;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&apos;)
}

// &#x5728;&#x652F;&#x6301;&#x91CD;&#x8F7D;&#x7684;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982; java
overload(1);         //&#x4E00;&#x4E2A;&#x53C2;&#x6570;
overload(1,2);    //&#x4E24;&#x4E2A;&#x53C2;&#x6570;


// &#x5728; JavaScript &#x4E2D;
overload(1);         //&#x4E24;&#x4E2A;&#x53C2;&#x6570;
overload(1,2);    //&#x4E24;&#x4E2A;&#x53C2;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">overload</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&apos;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">overload</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&apos;</span>)
}

<span class="hljs-comment">// &#x5728;&#x652F;&#x6301;&#x91CD;&#x8F7D;&#x7684;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982; java</span>
overload(<span class="hljs-number">1</span>);         <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x53C2;&#x6570;</span>
overload(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);    <span class="hljs-comment">//&#x4E24;&#x4E2A;&#x53C2;&#x6570;</span>


<span class="hljs-comment">// &#x5728; JavaScript &#x4E2D;</span>
overload(<span class="hljs-number">1</span>);         <span class="hljs-comment">//&#x4E24;&#x4E2A;&#x53C2;&#x6570;</span>
overload(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);    <span class="hljs-comment">//&#x4E24;&#x4E2A;&#x53C2;&#x6570;</span></code></pre><p>&#x5728;JavaScript&#x4E2D;&#xFF0C;&#x540C;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x51FA;&#x73B0;&#x4E24;&#x4E2A;&#x540D;&#x5B57;&#x4E00;&#x6837;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;&#xFF0C;&#x6240;&#x4EE5; JavaScript &#x6CA1;&#x6709;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x7684;&#x91CD;&#x8F7D;&#x3002;</p><p>&#x4F46;&#x662F;&#x6709;&#x5404;&#x79CD;&#x529E;&#x6CD5;&#xFF0C;&#x80FD;&#x5728; JavaScript &#x4E2D;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x91CD;&#x8F7D;&#x7684;&#x6548;&#x679C;&#x3002;</p><h3 id="articleHeader2">&#x5148;&#x770B;&#x7B2C;&#x4E00;&#x79CD;&#x529E;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7; <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">arguments &#x5BF9;&#x8C61;</a>&#x6765;&#x5B9E;&#x73B0;</h3><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments" rel="nofollow noreferrer" target="_blank">arguments &#x5BF9;&#x8C61;</a>&#xFF0C;&#x662F;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x4E00;&#x4E2A;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x91CC;&#x9762;&#x4FDD;&#x5B58;&#x7740;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x6240;&#x6709;&#x53C2;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function overload () {
  if (arguments.length === 1) {
    console.log(&apos;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&apos;)
  }
  if (arguments.length === 2) {
    console.log(&apos;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&apos;)
  }
}

overload(1);      //&#x4E00;&#x4E2A;&#x53C2;&#x6570;
overload(1, 2);  //&#x4E24;&#x4E2A;&#x53C2;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">overload</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">1</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&apos;</span>)
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">2</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&apos;</span>)
  }
}

overload(<span class="hljs-number">1</span>);      <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x53C2;&#x6570;</span>
overload(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);  <span class="hljs-comment">//&#x4E24;&#x4E2A;&#x53C2;&#x6570;</span></code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x5224;&#x65AD; arguments &#x5BF9;&#x8C61;&#x7684; length &#x5C5E;&#x6027;&#x6765;&#x786E;&#x5B9A;&#x6709;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;&#x4EC0;&#x4E48;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x4F46;&#x662F;&#x53C2;&#x6570;&#x5C11;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD8;&#x597D;&#xFF0C;&#x5982;&#x679C;&#x53C2;&#x6570;&#x591A;&#x4E00;&#x4E9B;&#xFF0C;if &#x5224;&#x65AD;&#x5C31;&#x9700;&#x8981;&#x5199;&#x597D;&#x591A;&#xFF0C;&#x5C31;&#x9EBB;&#x70E6;&#x4E86;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x7ECF;&#x5178;&#x7684;&#x4F8B;&#x5B50;<br>&#x5728;&#x770B;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A; users &#x5BF9;&#x8C61;&#xFF0C;users &#x5BF9;&#x8C61;&#x7684;values &#x5C5E;&#x6027;&#x4E2D;&#x5B58;&#x7740;&#x4E00;&#x4E9B;&#x540D;&#x5B57;&#x3002;<br>&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#x7531;&#x4E24;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF0C;&#x7A7A;&#x683C;&#x5DE6;&#x8FB9;&#x7684;&#x662F; first-name &#xFF0C;&#x7A7A;&#x683C;&#x53F3;&#x8FB9;&#x7684;&#x662F; last-name&#xFF0C;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = {
  values: [&quot;Dean Edwards&quot;, &quot;Alex Russell&quot;, &quot;Dean Tom&quot;]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> users = {
  <span class="hljs-attr">values</span>: [<span class="hljs-string">&quot;Dean Edwards&quot;</span>, <span class="hljs-string">&quot;Alex Russell&quot;</span>, <span class="hljs-string">&quot;Dean Tom&quot;</span>]
};</code></pre><p>&#x6211;&#x4EEC;&#x8981;&#x5728; users &#x5BF9;&#x8C61; &#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; find &#x65B9;&#x6CD5;&#xFF0C;</p><p>&#x5F53;&#x4E0D;&#x4F20;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#x65F6;&#xFF0C; &#x8FD4;&#x56DE;&#x6574;&#x4E2A;<code>users .values</code>&#xFF1B;<br>&#x5F53;&#x4F20;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x5C31;&#x628A; first-name &#x8DDF;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x8FD4;&#x56DE;&#xFF1B;<br>&#x5F53;&#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x5219;&#x628A; first-name &#x548C; last-name &#x90FD;&#x5339;&#x914D;&#x7684;&#x8FD4;&#x56DE;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x9700;&#x6C42;&#x4E2D; find&#x65B9;&#x6CD5; &#x9700;&#x8981;&#x6839;&#x636E;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;&#x4E0D;&#x540C;&#x800C;&#x6267;&#x884C;&#x4E0D;&#x540C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E00;&#x4E2A; addMethod &#x51FD;&#x6570;&#xFF0C;&#x6765;&#x5728; users &#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x8FD9;&#x4E2A; find &#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addMethod (object, name, fn) {
  // &#x5148;&#x628A;&#x539F;&#x6765;&#x7684;object[name] &#x65B9;&#x6CD5;&#xFF0C;&#x4FDD;&#x5B58;&#x5728;old&#x4E2D;
  var old = object[name];

  // &#x91CD;&#x65B0;&#x5B9A;&#x4E49; object[name] &#x65B9;&#x6CD5;
  object[name] = function () {
    // &#x5982;&#x679C;&#x51FD;&#x6570;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570; &#x548C; &#x5B9E;&#x9645;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570; &#x7684;&#x4E2A;&#x6570;&#x76F8;&#x540C;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x8C03;&#x7528;fn
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);

      // &#x5982;&#x679C;&#x4E0D;&#x76F8;&#x540C;,&#x5224;&#x65AD;old &#x662F;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;
      // &#x5982;&#x679C;&#x662F;&#x5C31;&#x8C03;&#x7528;old&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x521A;&#x624D;&#x4FDD;&#x5B58;&#x7684; object[name] &#x65B9;&#x6CD5;
    } else if (typeof old === &quot;function&quot;) {
      return old.apply(this, arguments);
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addMethod</span> (<span class="hljs-params">object, name, fn</span>) </span>{
  <span class="hljs-comment">// &#x5148;&#x628A;&#x539F;&#x6765;&#x7684;object[name] &#x65B9;&#x6CD5;&#xFF0C;&#x4FDD;&#x5B58;&#x5728;old&#x4E2D;</span>
  <span class="hljs-keyword">var</span> old = object[name];

  <span class="hljs-comment">// &#x91CD;&#x65B0;&#x5B9A;&#x4E49; object[name] &#x65B9;&#x6CD5;</span>
  object[name] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x5982;&#x679C;&#x51FD;&#x6570;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570; &#x548C; &#x5B9E;&#x9645;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570; &#x7684;&#x4E2A;&#x6570;&#x76F8;&#x540C;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x8C03;&#x7528;fn</span>
    <span class="hljs-keyword">if</span> (fn.length === <span class="hljs-built_in">arguments</span>.length) {
      <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);

      <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x76F8;&#x540C;,&#x5224;&#x65AD;old &#x662F;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;</span>
      <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x5C31;&#x8C03;&#x7528;old&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x521A;&#x624D;&#x4FDD;&#x5B58;&#x7684; object[name] &#x65B9;&#x6CD5;</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> old === <span class="hljs-string">&quot;function&quot;</span>) {
      <span class="hljs-keyword">return</span> old.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    }
  }
}</code></pre><p>addMethod &#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x63A5;&#x6536;3&#x4E2A;&#x53C2;&#x6570;<br>&#x7B2C;&#x4E00;&#x4E2A;&#xFF1A;&#x8981;&#x7ED1;&#x5B9A;&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;<br>&#x7B2C;&#x4E8C;&#x4E2A;&#xFF1A;&#x7ED1;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#x79F0;&#xFF0C;<br>&#x7B2C;&#x4E09;&#x4E2A;&#xFF1A;&#x9700;&#x8981;&#x7ED1;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;</p><p>&#x8FD9;&#x4E2A; addMethod &#x51FD;&#x6570;&#x5728;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9664;&#x4E86;&#x7528; arguments &#x5BF9;&#x8C61;&#xFF0C;&#x8FD8;&#x7528;&#x4E86;&#x51FD;&#x6570;&#x7684; length &#x5C5E;&#x6027;&#x3002;</p><p>&#x51FD;&#x6570;&#x7684; length &#x5C5E;&#x6027;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x65F6;&#x5F62;&#x53C2;&#x7684;&#x4E2A;&#x6570;&#x3002;</p><p>&#x7B80;&#x5355;&#x8BF4; &#x51FD;&#x6570;&#x7684; length &#x662F;&#xFF0C;&#x51FD;&#x6570;&#x9700;&#x8981;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x800C; <code>arguments.length</code> &#x662F;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x771F;&#x7684;&#x7ED9;&#x4E86;&#x51FD;&#x6570;&#x51E0;&#x4E2A;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn (a, b) {
  console.log(arguments.length)
}
console.log(fn.length);  // 2
fn(&apos;a&apos;);    // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>.length)
}
<span class="hljs-built_in">console</span>.log(fn.length);  <span class="hljs-comment">// 2</span>
fn(<span class="hljs-string">&apos;a&apos;</span>);    <span class="hljs-comment">// 1</span></code></pre><p>&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A; addMethod &#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x6574;&#x4E2A;values&#x6570;&#x7EC4;
function find0 () {
  return this.values;
}
// &#x4F20;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;firstName&#x5339;&#x914D;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;
function find1 (firstName) {
  var ret = [];
  for (var i = 0; i &lt; this.values.length; i++) {
    if (this.values[i].indexOf(firstName) === 0) {
      ret.push(this.values[i
      ]);
    }
  }
  return ret;
}
// &#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;firstName&#x548C;lastName&#x90FD;&#x5339;&#x914D;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;
function find2 (firstName, lastName) {
  var ret = [];
  for (var i = 0; i &lt; this.values.length; i++) {
    if (this.values[i
    ] === (firstName + &quot; &quot; + lastName)) {
      ret.push(this.values[i
      ]);
    }
  }
  return ret;
}
// &#x7ED9; users &#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5904;&#x7406; &#x6CA1;&#x6709;&#x53C2;&#x6570; &#x7684;&#x65B9;&#x6CD5;
addMethod(users, &quot;find&quot;, find0);

// &#x7ED9; users &#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5904;&#x7406; &#x4E00;&#x4E2A;&#x53C2;&#x6570; &#x7684;&#x65B9;&#x6CD5;
addMethod(users, &quot;find&quot;, find1);

// &#x7ED9; users &#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5904;&#x7406; &#x4E24;&#x4E2A;&#x53C2;&#x6570; &#x7684;&#x65B9;&#x6CD5;
addMethod(users, &quot;find&quot;, find2);

// &#x6D4B;&#x8BD5;&#xFF1A;
console.log(users.find()); //[&quot;Dean Edwards&quot;, &quot;Alex Russell&quot;, &quot;Dean Tom&quot;]
console.log(users.find(&quot;Dean&quot;)); //[&quot;Dean Edwards&quot;, &quot;Dean Tom&quot;]
console.log(users.find(&quot;Dean Edwards&quot;)); //[&quot;Dean Edwards&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x6574;&#x4E2A;values&#x6570;&#x7EC4;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">find0</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.values;
}
<span class="hljs-comment">// &#x4F20;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;firstName&#x5339;&#x914D;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">find1</span> (<span class="hljs-params">firstName</span>) </span>{
  <span class="hljs-keyword">var</span> ret = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.values.length; i++) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.values[i].indexOf(firstName) === <span class="hljs-number">0</span>) {
      ret.push(<span class="hljs-keyword">this</span>.values[i
      ]);
    }
  }
  <span class="hljs-keyword">return</span> ret;
}
<span class="hljs-comment">// &#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;firstName&#x548C;lastName&#x90FD;&#x5339;&#x914D;&#x7684;&#x6570;&#x7EC4;&#x5143;&#x7D20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">find2</span> (<span class="hljs-params">firstName, lastName</span>) </span>{
  <span class="hljs-keyword">var</span> ret = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.values.length; i++) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.values[i
    ] === (firstName + <span class="hljs-string">&quot; &quot;</span> + lastName)) {
      ret.push(<span class="hljs-keyword">this</span>.values[i
      ]);
    }
  }
  <span class="hljs-keyword">return</span> ret;
}
<span class="hljs-comment">// &#x7ED9; users &#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5904;&#x7406; &#x6CA1;&#x6709;&#x53C2;&#x6570; &#x7684;&#x65B9;&#x6CD5;</span>
addMethod(users, <span class="hljs-string">&quot;find&quot;</span>, find0);

<span class="hljs-comment">// &#x7ED9; users &#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5904;&#x7406; &#x4E00;&#x4E2A;&#x53C2;&#x6570; &#x7684;&#x65B9;&#x6CD5;</span>
addMethod(users, <span class="hljs-string">&quot;find&quot;</span>, find1);

<span class="hljs-comment">// &#x7ED9; users &#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5904;&#x7406; &#x4E24;&#x4E2A;&#x53C2;&#x6570; &#x7684;&#x65B9;&#x6CD5;</span>
addMethod(users, <span class="hljs-string">&quot;find&quot;</span>, find2);

<span class="hljs-comment">// &#x6D4B;&#x8BD5;&#xFF1A;</span>
<span class="hljs-built_in">console</span>.log(users.find()); <span class="hljs-comment">//[&quot;Dean Edwards&quot;, &quot;Alex Russell&quot;, &quot;Dean Tom&quot;]</span>
<span class="hljs-built_in">console</span>.log(users.find(<span class="hljs-string">&quot;Dean&quot;</span>)); <span class="hljs-comment">//[&quot;Dean Edwards&quot;, &quot;Dean Tom&quot;]</span>
<span class="hljs-built_in">console</span>.log(users.find(<span class="hljs-string">&quot;Dean Edwards&quot;</span>)); <span class="hljs-comment">//[&quot;Dean Edwards&quot;]</span></code></pre><p>addMethod &#x51FD;&#x6570;&#x662F;&#x5229;&#x7528;&#x4E86;&#x95ED;&#x5305;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x901A;&#x8FC7;&#x53D8;&#x91CF; old &#x5C06;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x8FDE;&#x63A5;&#x4E86;&#x8D77;&#x6765;&#xFF0C;&#x8BA9;&#x6240;&#x6709;&#x7684;&#x51FD;&#x6570;&#x90FD;&#x7559;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x3002;</p><p>&#x6BCF;&#x8C03;&#x7528;&#x4E00;&#x6B21; addMethod &#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A; old&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x3002;<br>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>console.dir(users.find)</code> &#xFF0C;&#x628A; find &#x65B9;&#x6CD5;&#x6253;&#x5370;&#x5230;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x770B;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbdDef?w=889&amp;h=560" src="https://static.alili.tech/img/bVbdDef?w=889&amp;h=560" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x662F; jQuery &#x4E4B;&#x7236; <a href="https://johnresig.com/about/" rel="nofollow noreferrer" target="_blank">John Resig</a> &#x5199;&#x7684;&#xFF0C;&#x4ED6;&#x5728;&#x4ED6;&#x7684;<a href="https://johnresig.com/blog/javascript-method-overloading/" rel="nofollow noreferrer" target="_blank">&#x535A;&#x5BA2;</a>&#x548C;&#x4ED6;&#x5199;&#x7684;&#x4E66; <a href="https://pan.baidu.com/s/1kpcqeVlBA9mRxzv6b1n6kQ" rel="nofollow noreferrer" target="_blank">&#x300A;secrets of the JavaScript ninja&#x300B;</a>&#x7B2C;&#x4E00;&#x7248;&#x4E2D;&#x90FD;&#x6709;&#x63D0;&#x5230;&#x8FC7;&#xFF0C;&#x5728;&#x4E66;&#x4E2D;&#x7684;&#x7B2C;4&#x7AE0;&#x4E2D;&#x4E5F;&#x6709;&#x8BB2;&#x89E3; Function overloading&#xFF0C;&#x6587;&#x4E2D;&#x7684; addMethod &#x51FD;&#x6570; &#x5C31;&#x662F;&#x4E66;&#x4E2D;&#x7684;&#x4F8B;&#x5B50; 4.15&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;&#x3002;</p><p>&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x672C;&#x8D28;&#x90FD;&#x662F;&#x5728;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;&#xFF0C;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x4E2A;&#x6570;&#xFF0C;&#x6267;&#x884C;&#x4E0D;&#x540C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x4E0B;&#x6765;&#x4E3E;&#x7684;&#x4F8B;&#x5B50;&#x662F;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x6765;&#x6267;&#x884C;&#x4E0D;&#x540C;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader3">&#x6211;&#x4EEC;&#x770B;&#x770B; jQuery &#x4E2D;&#x7684; <a href="http://www.w3school.com.cn/jquery/css_css.asp" rel="nofollow noreferrer" target="_blank">css( ) &#x65B9;&#x6CD5;</a>&#x3002;</h3><blockquote>css( ) &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6216;&#x8BBE;&#x7F6E;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6837;&#x5F0F;&#x5C5E;&#x6027;&#x3002;</blockquote><p><code>css(name|pro|[,val|fn])</code></p><p><span class="img-wrap"><img data-src="/img/bVbdDee?w=803&amp;h=352" src="https://static.alili.tech/img/bVbdDee?w=803&amp;h=352" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230; css( ) &#x65B9;&#x6CD5;&#xFF0C;&#x6709;5&#x79CD; &#x53C2;&#x6570;&#x60C5;&#x51B5;&#xFF0C;&#x5176;&#x4E2D;3&#x79CD;&#x662F;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x53E6;&#x5916;&#x4E24;&#x79CD;&#x662F;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x3002;<br>&#x800C;&#x5728;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x6570;&#x7EC4;&#x5C31;&#x662F;&#x83B7;&#x53D6;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x53C2;&#x6570;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x662F;&#x662F;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x503C;&#x3002;</p><p>jQuery &#x7684; <a href="http://www.w3school.com.cn/jquery/css_css.asp" rel="nofollow noreferrer" target="_blank">css( ) &#x65B9;&#x6CD5;</a>&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x6765;&#x786E;&#x5B9A;&#x6267;&#x884C;&#x4EC0;&#x4E48;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;jQuery 3.3.1&#x4E2D;&#x7684;<a href="https://github.com/jquery/jquery/blob/master/src/css.js#L435" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// name &#x8868;&#x793A;&#x5C5E;&#x6027;&#x540D;
// value &#x8868;&#x793A;&#x5C5E;&#x6027;&#x503C;
css: function( name, value ) {
    return access( this, function( elem, name, value ) {
        var styles, len,
            map = {},
            i = 0;

        // &#x5224;&#x65AD;&#x5C5E;&#x6027;&#x540D;&#x662F;&#x4E0D;&#x662F;&#x6570;&#x7EC4;
        // &#x662F;&#x6570;&#x7EC4;&#x5C31;&#x904D;&#x5386;&#xFF0C;&#x8C03;&#x7528;jQuery.css &#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x83B7;&#x53D6;&#x6837;&#x5F0F;
        if ( Array.isArray( name ) ) {
            styles = getStyles( elem );
            len = name.length;

            for ( ; i &lt; len; i++ ) {
                map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
            }

            return map;
        }

        // &#x5982;&#x679C;value &#x4E0D;&#x7B49;&#x4E8E; undefined &#x5C31;&#x8C03;&#x7528;jQuery.style &#x65B9;&#x6CD5;&#x8BBE;&#x7F6E;&#x6837;&#x5F0F;
        // &#x5982;&#x679C;value &#x7B49;&#x4E8E; undefined &#x5C31;&#x8C03;&#x7528;jQuery.css &#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6837;&#x5F0F;
        return value !== undefined ?
            jQuery.style( elem, name, value ) :
            jQuery.css( elem, name );
    }, name, value, arguments.length &gt; 1 );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// name &#x8868;&#x793A;&#x5C5E;&#x6027;&#x540D;</span>
<span class="hljs-comment">// value &#x8868;&#x793A;&#x5C5E;&#x6027;&#x503C;</span>
css: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> name, value </span>) </span>{
    <span class="hljs-keyword">return</span> access( <span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> elem, name, value </span>) </span>{
        <span class="hljs-keyword">var</span> styles, len,
            map = {},
            i = <span class="hljs-number">0</span>;

        <span class="hljs-comment">// &#x5224;&#x65AD;&#x5C5E;&#x6027;&#x540D;&#x662F;&#x4E0D;&#x662F;&#x6570;&#x7EC4;</span>
        <span class="hljs-comment">// &#x662F;&#x6570;&#x7EC4;&#x5C31;&#x904D;&#x5386;&#xFF0C;&#x8C03;&#x7528;jQuery.css &#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x83B7;&#x53D6;&#x6837;&#x5F0F;</span>
        <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">Array</span>.isArray( name ) ) {
            styles = getStyles( elem );
            len = name.length;

            <span class="hljs-keyword">for</span> ( ; i &lt; len; i++ ) {
                map[ name[ i ] ] = jQuery.css( elem, name[ i ], <span class="hljs-literal">false</span>, styles );
            }

            <span class="hljs-keyword">return</span> map;
        }

        <span class="hljs-comment">// &#x5982;&#x679C;value &#x4E0D;&#x7B49;&#x4E8E; undefined &#x5C31;&#x8C03;&#x7528;jQuery.style &#x65B9;&#x6CD5;&#x8BBE;&#x7F6E;&#x6837;&#x5F0F;</span>
        <span class="hljs-comment">// &#x5982;&#x679C;value &#x7B49;&#x4E8E; undefined &#x5C31;&#x8C03;&#x7528;jQuery.css &#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6837;&#x5F0F;</span>
        <span class="hljs-keyword">return</span> value !== <span class="hljs-literal">undefined</span> ?
            jQuery.style( elem, name, value ) :
            jQuery.css( elem, name );
    }, name, value, <span class="hljs-built_in">arguments</span>.length &gt; <span class="hljs-number">1</span> );
}</code></pre><p>css( ) &#x65B9;&#x6CD5;&#x4F9D;&#x8D56;&#x4E8E;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;</p><blockquote>1&#x3001;jQuery.access( ) &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x83B7;&#x53D6; &#x6216; &#x8BBE;&#x7F6E;&#xFF0C;&#x4E00;&#x4E2A;&#x6216;&#x8005;&#x591A;&#x4E2A;&#x5C5E;&#x6027;&#x503C;</blockquote><p><a href="https://github.com/jquery/jquery/blob/master/src/core/access.js#L11" rel="nofollow noreferrer" target="_blank">jQuery.access( )</a> &#x65B9;&#x6CD5;&#x91CC;&#x6709;&#x8FD9;&#x6837;&#x7684;<a href="https://github.com/jquery/jquery/blob/master/src/core/access.js#L11" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x7801;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BBE;&#x7F6E;&#x591A;&#x4E2A;&#x5C5E;&#x6027;&#x503C;
// &#x5982;&#x679C;&#x5C5E;&#x6027;&#x540D;&#xFF08;key&#xFF09;&#x7684;&#x7C7B;&#x578B;&#x662F; object&#xFF0C;&#x5C31;&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;
// &#x904D;&#x5386;&#x4E00;&#x6B21;&#x5C31;&#x8C03;&#x7528;&#x4E00;&#x6B21; access()&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x8FD9;&#x6B21;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x548C;&#x5C5E;&#x6027;&#x503C;
if ( jQuery.type( key ) === &quot;object&quot; ) {
    chainable = true;
    for ( i in key ) {
        jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
    }

// &#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x503C;
} else if ( value !== undefined ) {
    ......
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x591A;&#x4E2A;&#x5C5E;&#x6027;&#x503C;</span>
<span class="hljs-comment">// &#x5982;&#x679C;&#x5C5E;&#x6027;&#x540D;&#xFF08;key&#xFF09;&#x7684;&#x7C7B;&#x578B;&#x662F; object&#xFF0C;&#x5C31;&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;</span>
<span class="hljs-comment">// &#x904D;&#x5386;&#x4E00;&#x6B21;&#x5C31;&#x8C03;&#x7528;&#x4E00;&#x6B21; access()&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x8FD9;&#x6B21;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x548C;&#x5C5E;&#x6027;&#x503C;</span>
<span class="hljs-keyword">if</span> ( jQuery.type( key ) === <span class="hljs-string">&quot;object&quot;</span> ) {
    chainable = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span> ( i <span class="hljs-keyword">in</span> key ) {
        jQuery.access( elems, fn, i, key[i], <span class="hljs-literal">true</span>, emptyGet, raw );
    }

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x503C;</span>
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( value !== <span class="hljs-literal">undefined</span> ) {
    ......
}</code></pre><p>&#x4E5F;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x5E2E; css( ) &#x65B9;&#x6CD5;&#x5224;&#x65AD;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x8FD8;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x3002;</p><blockquote>2&#x3001;jQuery.style( ) &#x65B9;&#x6CD5;&#xFF1A;&#x5728;DOM&#x8282;&#x70B9;&#x4E0A;&#x8BFB;&#x53D6;&#x6216;&#x8BBE;&#x7F6E;&#x6837;&#x5F0F;&#x5C5E;&#x6027;</blockquote><p>&#x5728;css( )&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x4F20;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6709;&#x8981;&#x8BBE;&#x7F6E;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x65F6;&#xFF0C;&#x90A3;&#x5C31;&#x4F1A;&#x8C03;&#x7528; jQuery.style( ) &#x65B9;&#x6CD5;&#x8BBE;&#x7F6E;&#x6837;&#x5F0F;</p><blockquote>3&#x3001;jQuery.css( ) &#xFF1A;&#x5728;DOM&#x5143;&#x7D20;&#x4E0A;&#x8BFB;&#x53D6;DOM&#x6837;&#x5F0F;&#x503C;</blockquote><p>&#x8FD9;&#x91CC;&#x7684; <a href="https://github.com/jquery/jquery/blob/master/src/css.js#L288" rel="nofollow noreferrer" target="_blank">jQuery.css( )</a> &#x662F;&#x901A;&#x8FC7; <code>jQuery.extend( )</code> &#x6DFB;&#x52A0;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x6700;&#x5F00;&#x59CB;&#x63D0;&#x5230;&#x7684; <a href="https://github.com/jquery/jquery/blob/master/src/css.js#L435" rel="nofollow noreferrer" target="_blank">css( )&#x65B9;&#x6CD5;</a>&#xFF0C;&#x662F;&#x901A;&#x8FC7; <code>jQuery.fn.extend( )</code> &#x6DFB;&#x52A0;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4ED6;&#x4EEC;&#x4E0D;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;</p><p><strong>jQuery.extend( )&#x4E0E; jQuery.fn.extend( )&#x7684;&#x533A;&#x522B;</strong></p><blockquote>jQuery.extend( )&#x662F;&#x4E3A;jQuery&#x7C7B;&#x6DFB;&#x52A0;&#x7C7B;&#x65B9;&#x6CD5;&#xFF08;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;jQuery&#x7C7B;&#x6765;&#x8C03;&#x7528;&#xFF08;&#x76F4;&#x63A5;&#x4F7F;&#x7528; $.xxx &#x8C03;&#x7528;&#xFF09;&#xFF1B;<p>jQuery.fn.extend( )&#x662F;&#x4E3A;jQuery&#x7C7B;&#x6DFB;&#x52A0;&#x6210;&#x5458;&#x6570;&#xFF08;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x6240;&#x6709;jQuery&#x5B9E;&#x4F8B;&#x90FD;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#xFF08;&#x9700;&#x8981;&#x4F7F;&#x7528; $().xxx &#x8C03;&#x7528;&#xFF09;&#x3002;</p></blockquote><h3 id="articleHeader4">&#x91CD;&#x8F7D;&#x7684;&#x597D;&#x5904;</h3><p>&#x91CD;&#x8F7D;&#x5176;&#x5B9E;&#x662F;&#x628A;&#x591A;&#x4E2A;&#x529F;&#x80FD;&#x76F8;&#x8FD1;&#x7684;&#x51FD;&#x6570;&#x5408;&#x5E76;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x91CD;&#x590D;&#x5229;&#x7528;&#x4E86;&#x51FD;&#x6570;&#x540D;&#x3002;<br>&#x5047;&#x5982;jQuery&#x4E2D;&#x7684;css( )&#x65B9;&#x6CD5;&#x4E0D;&#x4F7F;&#x7528; &#x91CD;&#x8F7D;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x8981;&#x6709;5&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6765;&#x5B8C;&#x6210;&#x529F;&#x80FD;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x8BB0;&#x4F4F;5&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x548C;&#x5404;&#x4E2A;&#x51FD;&#x6570;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;&#x548C;&#x7C7B;&#x578B;&#xFF0C;&#x663E;&#x7136;&#x5C31;&#x9EBB;&#x70E6;&#x591A;&#x4E86;&#x3002;</p><h3 id="articleHeader5">&#x603B;&#x7ED3;</h3><p>&#x867D;&#x7136; JavaScript &#x5E76;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x91CD;&#x8F7D;&#xFF0C;&#x4F46;&#x662F;&#x91CD;&#x8F7D;&#x7684;&#x6548;&#x679C;&#x5728;JavaScript&#x4E2D;&#x5374;&#x975E;&#x5E38;&#x5E38;&#x89C1;&#xFF0C;&#x6BD4;&#x5982; &#x6570;&#x7EC4;&#x7684; <a href="http://www.runoob.com/jsref/jsref-splice.html" rel="nofollow noreferrer" target="_blank">splice( )&#x65B9;&#x6CD5;</a>&#xFF0C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x5220;&#x9664;&#xFF0C;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x5220;&#x9664;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x5220;&#x9664;&#x5B8C;&#x4E86;&#xFF0C;&#x518D;&#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#x3002;<br>&#x518D;&#x6BD4;&#x5982; <a href="http://www.w3school.com.cn/jsref/jsref_parseInt.asp" rel="nofollow noreferrer" target="_blank">parseInt( )&#x65B9;&#x6CD5;</a> &#xFF0C;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x5224;&#x65AD;&#x662F;&#x7528;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF0C;&#x8FD8;&#x662F;&#x7528;&#x5341;&#x8FDB;&#x5236;&#x89E3;&#x6790;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x7528;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x6570;&#x5B57;&#x7684;&#x57FA;&#x6570;&#xFF0C;&#x6765;&#x8FDB;&#x884C;&#x89E3;&#x6790;&#x3002;</p><p>&#x6587;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x5B9E;&#x73B0;&#x91CD;&#x8F7D;&#x6548;&#x679C;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x672C;&#x8D28;&#x90FD;&#x662F;&#x5BF9;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#xFF0C;&#x8FD8;&#x662F;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#xFF0C;&#x90FD;&#x662F;&#x6839;&#x636E;&#x53C2;&#x6570;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x6765;&#x51B3;&#x5B9A;&#x6267;&#x884C;&#x4EC0;&#x4E48;&#x64CD;&#x4F5C;&#x7684;&#x3002;</p><p>&#x867D;&#x7136;&#xFF0C;&#x91CD;&#x8F7D;&#x80FD;&#x4E3A;&#x6211;&#x4EEC;&#x5E26;&#x6765;&#x8BB8;&#x591A;&#x7684;&#x4FBF;&#x5229;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x80FD;&#x6EE5;&#x7528;&#xFF0C;&#x4E0D;&#x8981;&#x628A;&#x4E00;&#x4E9B;&#x6839;&#x672C;&#x4E0D;&#x76F8;&#x5173;&#x7684;&#x51FD;&#x6570;&#x5408;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x6837;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x610F;&#x4E49;&#x3002;</p><h3 id="articleHeader6">&#x53C2;&#x8003;</h3><p><a href="https://www.cnblogs.com/yugege/p/5539020.html" rel="nofollow noreferrer" target="_blank">&#x6D45;&#x8C08;JavaScript&#x51FD;&#x6570;&#x91CD;&#x8F7D;</a></p><p><a href="https://www.cnblogs.com/pianruijie/p/7997914.html" rel="nofollow noreferrer" target="_blank">js&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x91CD;&#x8F7D;</a></p><p><a href="https://segmentfault.com/a/1190000010425095">JavaScript&#x51FD;&#x6570;&#x91CD;&#x8F7D;</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="&#x524D;&#x7AEF;&#x7B80;&#x5355;&#x8BF4;" title="&#x524D;&#x7AEF;&#x7B80;&#x5355;&#x8BF4;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中的函数重载（Function overloading）

## 原文链接
[https://segmentfault.com/a/1190000015602959](https://segmentfault.com/a/1190000015602959)


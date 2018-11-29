---
title: '【前端工程师手册】this拾遗之关于箭头函数的种种' 
date: 2018-11-29 9:33:05
hidden: true
slug: 9ao6zrmczuh
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x4E4B;&#x524D;&#x603B;&#x7ED3;&#x4E86;this&#x7684;&#x4E00;&#x4E9B;&#x5E38;&#x89C1;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#xFF08;<a href="https://segmentfault.com/a/1190000015036284">&#x3010;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x624B;&#x518C;&#x3011;JavaScript&#x4E4B;this&#x7684;&#x7B14;&#x8BB0;</a>&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x6CA1;&#x6709;&#x8BF4;&#x5230;&#xFF0C;&#x4ECA;&#x5929;&#x7EE7;&#x7EED;&#x5B66;&#x4E60;&#x4E00;&#x4E0B;&#x3002;</p>
<h2 id="articleHeader0">es6&#x7BAD;&#x5934;&#x51FD;&#x6570;</h2>
<p>&#x5148;&#x8BF4;&#x7ED3;&#x8BBA;&#xFF1A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684;this&#xFF0C;&#x5B83;&#x662F;&#x6839;&#x636E;&#x5916;&#x5C42;(<strong>&#x51FD;&#x6570;&#x6216;&#x8005;&#x5168;&#x5C40;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BF4;&#x5230;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#x7684;&#x60C5;&#x51B5;</strong>)&#x4F5C;&#x7528;&#x57DF;&#x6765;&#x51B3;&#x5B9A;this&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x50CF; bind(..) &#x4E00;&#x6837;&#x786E;&#x4FDD;&#x51FD;&#x6570;&#x7684; this &#x88AB;&#x7ED1;&#x5B9A;&#x5230;&#x6307;&#x5B9A;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5B83;&#x5728;&#x8FD0;&#x884C;&#x4E2D;&#x4E0D;&#x4F1A;&#x4E22;&#x5931;this&#xFF0C;&#x5B83;&#x7684;this&#x662F;&#x5728;&#x58F0;&#x660E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x65F6;&#x5C31;&#x51B3;&#x5B9A;&#x4E86;&#x3002;</p>
<h2 id="articleHeader1">&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &apos;out&apos;
function  test(){
    this.name = &apos;in&apos;;
    setTimeout(function(){
        console.log(this.name)
    },1000)
}
new test() // 1&#x79D2;&#x540E;&#x6253;&#x5370;&apos;out&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;out&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;in&apos;</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    },<span class="hljs-number">1000</span>)
}
<span class="hljs-keyword">new</span> test() <span class="hljs-comment">// 1&#x79D2;&#x540E;&#x6253;&#x5370;&apos;out&apos;</span></code></pre>
<p>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x662F;es5&#x4E2D;&#x5E38;&#x89C1;&#x7684;this&#x95EE;&#x9898;&#xFF0C;&#x8BA1;&#x65F6;&#x5668;1s&#x540E;&#x8FD0;&#x884C;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;this&#x5DF2;&#x7ECF;&#x4E22;&#x5931;&#x4E86;&#xFF0C;&#x4E8E;&#x662F;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x5230;&#x4E86;window&#x4E0A;&#x3002;<br>&#x4E4B;&#x524D;&#x7684;&#x7ECF;&#x5178;&#x5904;&#x7406;&#x65B9;&#x6CD5;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &apos;out&apos;
function  test(){
    this.name = &apos;in&apos;;
    var self = this;
    setTimeout(function(){
        console.log(self.name)
    },1000)
}
new test() // 1&#x79D2;&#x540E;&#x6253;&#x5370;&apos;in&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;out&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;in&apos;</span>;
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(self.name)
    },<span class="hljs-number">1000</span>)
}
<span class="hljs-keyword">new</span> test() <span class="hljs-comment">// 1&#x79D2;&#x540E;&#x6253;&#x5370;&apos;in&apos;</span></code></pre>
<p>&#x663E;&#x5F0F;&#x7684;&#x4F7F;&#x7528;self&#x6765;&#x4FDD;&#x5B58;&#x4F4F;&#x6B63;&#x786E;&#x7684;this&#xFF0C;&#x9632;&#x6B62;this&#x4E22;&#x5931;&#x3002;<br>&#x5176;&#x5B9E;&#x8FD9;&#x4E9B;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &apos;out&apos;
function  test(){
    this.name = &apos;in&apos;;
    setTimeout(() =&gt; {
        console.log(this.name)
    },1000)
}
new test() // 1&#x79D2;&#x540E;&#x6253;&#x5370;&apos;in&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;out&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;in&apos;</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    },<span class="hljs-number">1000</span>)
}
<span class="hljs-keyword">new</span> test() <span class="hljs-comment">// 1&#x79D2;&#x540E;&#x6253;&#x5370;&apos;in&apos;</span></code></pre>
<p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E2D;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;this&#x5728;&#x58F0;&#x660E;&#x671F;&#x95F4;&#x5C31;&#x7ED1;&#x5B9A;&#x4E3A;&#x5916;&#x5C42;&#x51FD;&#x6570;&#x7684;this&#xFF0C;&#x4E14;&#x5728;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E0D;&#x4F1A;&#x88AB;&#x4FEE;&#x6539;&#x3002;</p>
<h2 id="articleHeader2">&#x4E0D;&#x80FD;&#x5F53;&#x505A;&#x6784;&#x9020;&#x51FD;&#x6570;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Agumon = () =&gt; {  this.name = &apos;agumon&apos; }

var agumon = new Agumon() // Uncaught TypeError: Agumon is not a constructor" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Agumon = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;agumon&apos;</span> }

<span class="hljs-keyword">var</span> agumon = <span class="hljs-keyword">new</span> Agumon() <span class="hljs-comment">// Uncaught TypeError: Agumon is not a constructor</span></code></pre>
<p>&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x53BB;&#x5F53;&#x505A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;new&#x5BF9;&#x8C61;&#x4F1A;&#x76F4;&#x63A5;&#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E2A;&#x4E5F;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684;this&#xFF0C;new&#x64CD;&#x4F5C;&#x4E2D;&#x6709;&#x7528;&#x5230;this&#x7684;&#x6B65;&#x9AA4;&#x5B83;&#x641E;&#x4E0D;&#x5B9A;&#x3002;</p>
<h2 id="articleHeader3">call&#x6216;apply&#x8C03;&#x7528;&#x65E0;&#x6548;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;
    return (a) =&gt; {
        console.log( this.a ); 
    };    
}
var obj1 = {
    a:2
};
var obj2 = { a:3};
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, &#x4E0D;&#x662F;3 " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a ); 
    };    
}
<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
};
<span class="hljs-keyword">var</span> obj2 = { <span class="hljs-attr">a</span>:<span class="hljs-number">3</span>};
<span class="hljs-keyword">var</span> bar = foo.call( obj1 );
bar.call( obj2 ); <span class="hljs-comment">// 2, &#x4E0D;&#x662F;3 </span></code></pre>
<p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x663E;&#x5F0F;&#x7684;&#x4F7F;&#x7528;call&#x6765;&#x60F3;&#x628A;foodethis&#x7ED1;&#x5B9A;&#x5230;obj1&#xFF0C;&#x7136;&#x800C;&#x5E76;&#x4E0D;&#x594F;&#x6548;&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x5E76;&#x4E0D;&#x4F1A;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x518D;&#x88AB;&#x6539;&#x53D8;&#x3002;</p>
<h2 id="articleHeader4">&#x6CA1;&#x6709;prototype</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Foo = () =&gt; {};
console.log(Foo.prototype); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var Foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};
<span class="hljs-built_in">console</span>.log(Foo.prototype); <span class="hljs-regexp">//</span> <span class="hljs-literal">undefined</span></code></pre>
<p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x662F;&#x6CA1;&#x6709;&#x539F;&#x578B;&#x7684;</p>
<h2 id="articleHeader5">&#x4E0D;&#x9002;&#x7528;&#x4E8E;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    i: 10,
    b: () =&gt; console.log(this.i, this),
    c: function() {
        console.log( this.i, this)
    }
}
obj.b(); 
// undefined
obj.c(); 
// 10, Object {...}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">i</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.i, <span class="hljs-keyword">this</span>),
    <span class="hljs-attr">c</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.i, <span class="hljs-keyword">this</span>)
    }
}
obj.b(); 
<span class="hljs-comment">// undefined</span>
obj.c(); 
<span class="hljs-comment">// 10, Object {...}</span></code></pre>
<p>&#x521A;&#x521A;&#x8BF4;&#x4E86;&#x6839;&#x636E;&#x5916;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x6765;&#x51B3;&#x5B9A;this&#xFF0C;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;obj&#x8FD8;&#x4E0D;&#x8DB3;&#x4EE5;&#x751F;&#x6210;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x518D;&#x5F80;&#x4E0A;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;this&#x88AB;&#x7ED1;&#x5B9A;&#x4E3A;window&#x3002;<br>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="nofollow noreferrer" target="_blank">MDN-&#x7BAD;&#x5934;&#x51FD;&#x6570;</a><br><a href="https://book.douban.com/subject/26351021/" rel="nofollow noreferrer" target="_blank">&#x300A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;JavaScript-&#x4E0A;&#x5377;&#x300B;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端工程师手册】this拾遗之关于箭头函数的种种

## 原文链接
[https://segmentfault.com/a/1190000015087728](https://segmentfault.com/a/1190000015087728)


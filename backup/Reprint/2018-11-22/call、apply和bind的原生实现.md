---
title: 'call、apply和bind的原生实现' 
date: 2018-11-22 2:30:10
hidden: true
slug: 2w5w2bxyyn
categories: [reprint]
---

{{< raw >}}
<p>&#x56E0;&#x4E3A;&#x5173;&#x4E4E;&#x5230;&#x4E86;this&#x6307;&#x5411;&#x7684;&#x95EE;&#x9898;&#xFF0C;call&#x3001;apply&#x548C;bind&#x7684;&#x7528;&#x6CD5;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x8001;&#x751F;&#x5E38;&#x8C08;&#x4E86;&#x3002;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x662F;&#x5229;&#x7528;js&#x539F;&#x751F;&#x65B9;&#x6CD5;&#x5BF9;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x5B9E;&#x73B0;&#xFF0C;&#x5347;&#x5165;&#x4E86;&#x89E3;&#x5176;&#x4E2D;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x5BF9;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#x70B9;&#x6709;&#x66F4;&#x597D;&#x7684;&#x638C;&#x63E1;&#x3002;github&#x5730;&#x5740;<a href="https://github.com/Abiel1024/blog/issues/16" rel="nofollow noreferrer" target="_blank">call&#x3001;apply&#x548C;bind&#x7684;&#x539F;&#x751F;&#x5B9E;&#x73B0;</a></p><h3 id="articleHeader0">call&#x4E0E;apply</h3><p>&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#xFF1A;call&#x548C;apply&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x7684;this&#x503C;&#x548C;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x524D;&#x63D0;&#x4E0B;&#x8C03;&#x7528;&#x67D0;&#x4E2A;&#x51FD;&#x6570;&#x6216;&#x65B9;&#x6CD5;&#x3002;&#x533A;&#x522B;&#x5219;&#x5728;&#x4E8E;call&#x662F;&#x901A;&#x8FC7;&#x4F20;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x800C;apply&#x5219;&#x662F;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;<br>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  name: &apos;linxin&apos;
}

function func(age, sex) {
  console.log(this.name,age,sex);
}

func.call(obj,12,&apos;&#x5973;&apos;);         // linxin 12 &#x5973;
func.apply(obj, [18, &apos;&#x5973;&apos;]);        //linxin 18 &#x5973;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>var obj = {
  name: <span class="hljs-string">&apos;linxin&apos;</span>
}

function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(age, sex)</span> {</span>
  console.<span class="hljs-built_in">log</span>(this.name,age,sex)<span class="hljs-comment">;</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(obj,<span class="hljs-number">12</span>,<span class="hljs-string">&apos;&#x5973;&apos;</span>)</span>;         // <span class="hljs-title">linxin</span> 12 &#x5973;</span>
<span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">apply</span><span class="hljs-params">(obj, [<span class="hljs-number">18</span>, <span class="hljs-string">&apos;&#x5973;&apos;</span>])</span>;        //<span class="hljs-title">linxin</span> 18 &#x5973;</span>
</code></pre><h3 id="articleHeader1">&#x6A21;&#x62DF;&#x5B9E;&#x73B0;</h3><p>&#x601D;&#x8DEF;&#xFF1A;&#x5728;<a href="https://github.com/Abiel1024/blog/issues/15" rel="nofollow noreferrer" target="_blank">JavaScript&#x4E2D;&#x7684;this&#x6307;&#x5411;</a>&#x8BF4;&#x5230;&#x4E86;&#xFF1A;&#x51FD;&#x6570;&#x8FD8;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x65F6;this&#x5C31;&#x6307;&#x8FD9;&#x4E2A;&#x4E0A;&#x7EA7;&#x5BF9;&#x8C61;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x8BF4;&#x7684;&#xFF0C;&#x8C01;&#x8C03;&#x7528;&#xFF0C;this&#x5C31;&#x6307;&#x5411;&#x8C01;&#x3002;&#x6240;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5728;&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53BB;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x4E3A;&#x4E86;&#x4FDD;&#x6301;&#x5BF9;&#x8C61;&#x4E00;&#x76F4;&#xFF0C;&#x5728;&#x6267;&#x884C;&#x5B8C;&#x4E4B;&#x540E;&#x518D;&#x628A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7ED9;&#x5220;&#x9664;&#x4E86;&#x3002;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x7B80;&#x5355;^-^&#x3002;<br><strong>&#x521D;&#x4F53;&#x9A8C;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.newCall = function(context) {
  context.fn = this;  // &#x901A;&#x8FC7;this&#x83B7;&#x53D6;call&#x7684;&#x51FD;&#x6570;
  context.fn();
  delete context.fn;
}
let foo = {
  value: 1
}
function bar() {
  console.log(this.value);
}
bar.newCall (foo); // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.newCall = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
  context.fn = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">// &#x901A;&#x8FC7;this&#x83B7;&#x53D6;call&#x7684;&#x51FD;&#x6570;</span>
  context.fn();
  <span class="hljs-keyword">delete</span> context.fn;
}
<span class="hljs-keyword">let</span> foo = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}
bar.newCall (foo); <span class="hljs-comment">// 1</span></code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x57FA;&#x7840;&#x7248;&#x672C;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x8BF4;&#x6709;&#x4F20;&#x53C2;&#x6570;&#x5462;&#xFF1F;<br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x4E00;&#x4E0B;&#xFF0C;&#x56E0;&#x4E3A;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x6570;&#x91CF;&#x662F;&#x4E0D;&#x786E;&#x5B9A;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;Arguments&#x5BF9;&#x8C61;&#x4E2D;&#x53BB;&#x83B7;&#x53D6;&#xFF0C;&#x8FD9;&#x4E2A;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x3002;&#x95EE;&#x9898;&#x662F;&#x53C2;&#x6570;&#x662F;&#x4E0D;&#x786E;&#x5B9A;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x4F20;&#x5165;&#x5230;&#x6211;&#x4EEC;&#x8981;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x53BB;&#x5462; &#xFF1F; &#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x6709;&#x4E24;&#x79CD;&#x9009;&#x62E9;&#xFF1A;&#x4E00;&#x79CD;&#x662F;&#x901A;&#x8FC7;eval&#x62FC;&#x63A5;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x53E6;&#x4E00;&#x79CD;&#x5C31;&#x8981;&#x7528;&#x5230;es6&#x4E86;&#x3002;<br><strong>&#x4F53;&#x9A8C;&#x5347;&#x7EA7;&#xFF08;eval&#x7248;&#x672C;&#xFF09;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.newCall = function(context) {
  context.fn = this;
  var args = [];
  for(var i = 1, len = arguments.length; i &lt; len; i++) {
    args.push(&apos;arguments[&apos; + i + &apos;]&apos;);
  }
  eval(&apos;context.fn(&apos; + args +&apos;)&apos;);
  delete context.fn;
}
let person = {
  name: &apos;Abiel&apos;
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall (person, 25, &apos;&#x7537;&apos;); // Abiel 25 &#x7537;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.newCall = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
  context.fn = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">var</span> args = [];
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>, len = <span class="hljs-built_in">arguments</span>.length; i &lt; len; i++) {
    args.push(<span class="hljs-string">&apos;arguments[&apos;</span> + i + <span class="hljs-string">&apos;]&apos;</span>);
  }
  <span class="hljs-built_in">eval</span>(<span class="hljs-string">&apos;context.fn(&apos;</span> + args +<span class="hljs-string">&apos;)&apos;</span>);
  <span class="hljs-keyword">delete</span> context.fn;
}
<span class="hljs-keyword">let</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Abiel&apos;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">age,sex</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name, age, sex);
}
sayHi.newCall (person, <span class="hljs-number">25</span>, <span class="hljs-string">&apos;&#x7537;&apos;</span>); <span class="hljs-comment">// Abiel 25 &#x7537;</span></code></pre><p><strong>&#x4F53;&#x9A8C;&#x5347;&#x7EA7;&#xFF08;ES6&#x7248;&#x672C;&#xFF09;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.newCall = function(context) {
  context.fn = this;  
  context.fn(...Array.from(arguments).slice(1));
  delete context.fn;
}
let person = {
  name: &apos;Abiel&apos;
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall (person, 25, &apos;&#x7537;&apos;); // Abiel 25 &#x7537;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.newCall = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
  context.fn = <span class="hljs-keyword">this</span>;  
  context.fn(...Array.from(<span class="hljs-built_in">arguments</span>).slice(<span class="hljs-number">1</span>));
  <span class="hljs-keyword">delete</span> context.fn;
}
<span class="hljs-keyword">let</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Abiel&apos;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">age,sex</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name, age, sex);
}
sayHi.newCall (person, <span class="hljs-number">25</span>, <span class="hljs-string">&apos;&#x7537;&apos;</span>); <span class="hljs-comment">// Abiel 25 &#x7537;</span></code></pre><p>&#x8BA9;&#x7136;ES6&#x7684;&#x65B9;&#x6CD5;&#x8FD8;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x5230;arguments&#x5C31;&#x80FD;&#x5B9E;&#x73B0;<br><strong>ES6&#x7248;&#x672C;&#x518D;&#x5347;&#x7EA7;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.newCall = function(context, ...parameter) {
  context.fn = this;  
  context.fn(...parameter);
  delete context.fn;
}
let person = {
  name: &apos;Abiel&apos;
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall (person, 25, &apos;&#x7537;&apos;); // Abiel 25 &#x7537;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>Function.prototype.newCall = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(context, <span class="hljs-rest_arg">...parameter</span>)</span> </span>{
  context.fn = <span class="hljs-keyword">this</span>;  
  context.fn(...parameter);
  <span class="hljs-keyword">delete</span> context.fn;
}
let person = {
  name: <span class="hljs-string">&apos;Abiel&apos;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span><span class="hljs-params">(age,sex)</span> </span>{
  console.log(<span class="hljs-keyword">this</span>.name, age, sex);
}
sayHi.newCall (person, <span class="hljs-number">25</span>, <span class="hljs-string">&apos;&#x7537;&apos;</span>); <span class="hljs-comment">// Abiel 25 &#x7537;</span>

</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x57FA;&#x672C;&#x4E0A;&#x5B9E;&#x73B0;&#x4E86;call&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x5B58;&#x5728;&#x4E00;&#x4E9B;&#x9690;&#x60A3;&#x548C;&#x533A;&#x522B;&#x3002;<br>&#x5F53;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x5C31;&#x6709;fn&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x6709;&#x5927;&#x95EE;&#x9898;&#x4E86;&#x3002;<br>&#x5F53;call&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#x662F;null&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6216;&#x8005;&#x5176;&#x4ED6;&#x4E00;&#x4E9B;&#x7C7B;&#x578B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x51FD;&#x6570;&#x4F1A;&#x62A5;&#x9519;&#x3002;<br><strong>&#x7EC8;&#x6781;&#x4F53;&#x9A8C;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.newCall = function(context, ...parameter) {
  if (typeof context === &apos;object&apos;) {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context[fn] = this
  context[fn](...parameter);
  delete context[fn]
}
let person = {
  name: &apos;Abiel&apos;
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall (person, 25, &apos;&#x7537;&apos;); // Abiel 25 &#x7537;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>Function.prototype.newCall = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(context, <span class="hljs-rest_arg">...parameter</span>)</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> context === <span class="hljs-string">&apos;object&apos;</span>) {
    context = context || window
  } <span class="hljs-keyword">else</span> {
    context = Object.create(<span class="hljs-literal">null</span>)
  }
  let fn = Symbol()
  context[fn] = <span class="hljs-keyword">this</span>
  context[fn](...parameter);
  <span class="hljs-keyword">delete</span> context[fn]
}
let person = {
  name: <span class="hljs-string">&apos;Abiel&apos;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span><span class="hljs-params">(age,sex)</span> </span>{
  console.log(<span class="hljs-keyword">this</span>.name, age, sex);
}
sayHi.newCall (person, <span class="hljs-number">25</span>, <span class="hljs-string">&apos;&#x7537;&apos;</span>); <span class="hljs-comment">// Abiel 25 &#x7537;</span>
</code></pre><p>&#x5B9E;&#x73B0;&#x4E86;call&#x4E4B;&#x540E;&#xFF0C;apply&#x4E5F;&#x662F;&#x540C;&#x6837;&#x7684;&#x601D;&#x8DEF;&#x3002;<br><strong>apply&#x5B9E;&#x73B0;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.newApply = function(context, parameter) {
  if (typeof context === &apos;object&apos;) {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context[fn] = this
  context[fn](parameter);
  delete context[fn]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs verilog"><code>Function<span class="hljs-variable">.prototype</span><span class="hljs-variable">.newApply</span> = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">context</span>, <span class="hljs-keyword">parameter</span>) {
  <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">context</span> === <span class="hljs-number">&apos;ob</span>ject&apos;) {
    <span class="hljs-keyword">context</span> = <span class="hljs-keyword">context</span> || window
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">context</span> = Object<span class="hljs-variable">.create</span>(<span class="hljs-literal">null</span>)
  }
  <span class="hljs-keyword">let</span> fn = Symbol()
  <span class="hljs-keyword">context</span>[fn] = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">context</span>[fn](<span class="hljs-keyword">parameter</span>);
  delete <span class="hljs-keyword">context</span>[fn]
}</code></pre><h3 id="articleHeader2">bind</h3><p>bind&#x4E5F;&#x662F;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F5C;&#x7528;&#x4E5F;&#x662F;&#x6539;&#x53D8;this&#x6267;&#x884C;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x662F;&#x80FD;&#x4F20;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x3002;&#x4E0E;call&#x548C;apply&#x4E0D;&#x540C;&#x7684;&#x662F;bind&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x800C;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6539;&#x53D8;&#x4E0A;&#x4E0B;&#x6587;this&#x6307;&#x5411;&#x540E;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x539F;&#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x88AB;&#x6539;&#x53D8;&#x3002;&#x5E76;&#x4E14;&#x5982;&#x679C;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;&#x7ED1;&#x5B9A;&#x4E86; this &#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x90A3; apply &#x548C; call &#x4E0D;&#x4F1A;&#x50CF;&#x9884;&#x671F;&#x90A3;&#x6837;&#x6267;&#x884C;&#x3002;<br><strong>&#x521D;&#x4F53;&#x9A8C;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.bind = function (context) {
  var me = this
  return function () { // bind&#x4E4B;&#x540E;&#x5F97;&#x5230;&#x7684;&#x51FD;&#x6570;
    return me.call(context)  // &#x6267;&#x884C;&#x662F;&#x6539;&#x53D8;this&#x6267;&#x884C;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">var</span> me = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// bind&#x4E4B;&#x540E;&#x5F97;&#x5230;&#x7684;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">return</span> me.call(context)  <span class="hljs-comment">// &#x6267;&#x884C;&#x662F;&#x6539;&#x53D8;this&#x6267;&#x884C;</span>
  }
}</code></pre><p><strong>&#x52A0;&#x5165;&#x53C2;&#x6570;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.bind = function (context,...innerArgs) {
  var me = this
  return function (...finnalyArgs) {
    return me.call(context,...innerArgs,...finnalyArgs)
  }
}
let person = {
  name: &apos;Abiel&apos;
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
let personSayHi = sayHi.bind(person, 25)
personSayHi(&apos;&#x7537;&apos;)

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>Function.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(context,<span class="hljs-rest_arg">...innerArgs</span>)</span> </span>{
  <span class="hljs-keyword">var</span> me = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...finnalyArgs</span>)</span> </span>{
    <span class="hljs-keyword">return</span> me.call(context,...innerArgs,...finnalyArgs)
  }
}
let person = {
  name: <span class="hljs-string">&apos;Abiel&apos;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span><span class="hljs-params">(age,sex)</span> </span>{
  console.log(<span class="hljs-keyword">this</span>.name, age, sex);
}
let personSayHi = sayHi.bind(person, <span class="hljs-number">25</span>)
personSayHi(<span class="hljs-string">&apos;&#x7537;&apos;</span>)

</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
call、apply和bind的原生实现

## 原文链接
[https://segmentfault.com/a/1190000015724112](https://segmentfault.com/a/1190000015724112)


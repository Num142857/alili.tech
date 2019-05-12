---
title: '你们真的了解JS的继承嘛？' 
date: 2018-11-18 2:30:09
hidden: true
slug: 50lpkba1y7l
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x6211;&#x4EEC;&#x5B66;JAVA&#x7684;&#x65F6;&#x5019;&#x8BF4;&#x5230;&#x7EE7;&#x627F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;extends ClassName&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x4F46;&#x662F;&#x5728;JS&#x7684;&#x4E16;&#x754C;&#x91CC;&#x7EE7;&#x627F;&#x548C;&#x6211;&#x4EEC;&#x5728;JAVA&#x6240;&#x8BA4;&#x8BC6;&#x7684;&#x7EE7;&#x627F;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x53C8;&#x6709;&#x4E00;&#x4E9B;&#x4E0D;&#x540C;&#xFF0C;&#x4F60;&#x4EEC;&#x771F;&#x7684;&#x4E86;&#x89E3;JS&#x7684;&#x7EE7;&#x627F;&#x5417;&#xFF1F;&#x5C31;&#x5F53;&#x4F60;&#x4EEC;&#x5F88;&#x4E86;&#x89E3;&#x4E86;&#xFF0C;&#x6BD5;&#x7ADF;&#x662F;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#xFF0C;&#x6211;&#x5C31;&#x7B80;&#x5355;&#x8BF4;&#x8BF4;</p><h3 id="articleHeader1">&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h3><p>&#x7B80;&#x8A00;&#x4E4B;&#x5C31;&#x662F;&#x628A;&#x88AB;&#x7EE7;&#x627F;&#x7684;&#x5BF9;&#x8C61;&#x8D4B;&#x503C;&#x7ED9;&#x7EE7;&#x627F;&#x8005;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super() {
    this.name = &apos;mirok&apos;;
}
Super.prototype.showName = function () {
    console.log(this.name);
}
function Sub() {
    this.name = &apos;july&apos;;
}
Sub.prototype = new Super();
const obj = new Sub();
obj.showName(); //&#x8F93;&#x51FA;july
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;mirok&apos;</span>;
}
Super.prototype.showName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;july&apos;</span>;
}
Sub.prototype = <span class="hljs-keyword">new</span> Super();
<span class="hljs-keyword">const</span> obj = <span class="hljs-keyword">new</span> Sub();
obj.showName(); <span class="hljs-comment">//&#x8F93;&#x51FA;july</span>
</code></pre><p>&#x539F;&#x578B;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x867D;&#x7136;&#x53EF;&#x4EE5;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x76F8;&#x5E94;&#x7684;&#x5F0A;&#x7AEF;&#xFF0C;&#x4F8B;&#x5982;new Super()&#x6784;&#x5EFA;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x7EE7;&#x627F;&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x88AB;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x91CD;&#x5199;&#xFF0C;&#x5C31;&#x4F1A;&#x5F71;&#x54CD;&#x5176;&#x4ED6;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x539F;&#x578B;&#x91CC;&#x7684;&#x662F;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x6240;&#x5171;&#x4EAB;&#x7684;&#xFF0C;&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x4E0D;&#x613F;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5C31;&#x6709;&#x4EE5;&#x4E0B;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader2">&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</h3><p>&#x7B80;&#x8A00;&#x4E4B;&#x5C31;&#x662F;&#x5728;&#x7EE7;&#x627F;&#x8005;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x53BB;&#x8C03;&#x7528;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;(&#x5373;&#x4F7F;&#x7528;apply()/call()&#x5B9E;&#x73B0;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super() {
    this.supername = &apos;mirok&apos;;
}
function Sub() {
    Super.call(this)
    this.name = &apos;july&apos;;
}
Sub.prototype = new Super();
const obj = new Sub();
obj.name; //july
obj.supername; //mirok" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.supername = <span class="hljs-string">&apos;mirok&apos;</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub</span><span class="hljs-params">()</span> </span>{
    Super.call(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;july&apos;</span>;
}
Sub.prototype = <span class="hljs-keyword">new</span> Super();
<span class="hljs-keyword">const</span> obj = <span class="hljs-keyword">new</span> Sub();
obj.name; <span class="hljs-comment">//july</span>
obj.supername; <span class="hljs-comment">//mirok</span></code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7684;&#x7EE7;&#x627F;&#x76F8;&#x5BF9;&#x4E8E;&#x4E4B;&#x524D;&#x7684;&#x6765;&#x8BF4;&#x4E0D;&#x4EC5;&#x89E3;&#x51B3;&#x4E86;&#x4E4B;&#x524D;&#x7684;&#x95EE;&#x9898;&#x8FD8;&#x80FD;&#x5411;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x4F20;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x5F0A;&#x7AEF;&#xFF0C;&#x5373;&#x5BB9;&#x6613;&#x8986;&#x76D6;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5728;&#x8C03;&#x7528;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x518D;&#x5BF9;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;,&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4E0A;&#x9762;&#x7684;Super.call&#x8981;&#x5728;this.name&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x4E4B;&#x524D;&#x3002;&#x53E6;&#x4E00;&#x4E2A;&#x5F0A;&#x7AEF;&#x5C31;&#x662F;&#x7EE7;&#x627F;&#x7684;&#x662F;&#x65E0;&#x6CD5;&#x5171;&#x4EAB;&#x7684;</p><h3 id="articleHeader3">&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><p>&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x7EC4;&#x5408;&#x524D;&#x9762;&#x7684;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x548C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x4E24;&#x8005;&#x4E4B;&#x957F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x65E2;&#x80FD;&#x5728;&#x7EE7;&#x627F;&#x540E;&#x7684;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x4E00;&#x4EFD;&#x5C5E;&#x6027;&#x53C8;&#x80FD;&#x5171;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Super() {
    this.name = &apos;mirok&apos;;
}
Super.prototype.showName = function () {
    console.log(this.name);
}
function Sub1() {
    Super.call(this);
    this.name = &apos;july&apos;;
}
function Sub2() {
    Super.call(this);
    this.name = &apos;deny&apos;;
}
Sub1.prototype = new Super();
Sub2.prototype = new Super();
const obj1 = new Sub1();
const obj2 = new Sub2();
obj1.showName(); // july
obj2.showName(); // deny
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;mirok&apos;</span>;
}
Super.prototype.showName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub1</span>(<span class="hljs-params"></span>) </span>{
    Super.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;july&apos;</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub2</span>(<span class="hljs-params"></span>) </span>{
    Super.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;deny&apos;</span>;
}
Sub1.prototype = <span class="hljs-keyword">new</span> Super();
Sub2.prototype = <span class="hljs-keyword">new</span> Super();
<span class="hljs-keyword">const</span> obj1 = <span class="hljs-keyword">new</span> Sub1();
<span class="hljs-keyword">const</span> obj2 = <span class="hljs-keyword">new</span> Sub2();
obj1.showName(); <span class="hljs-comment">// july</span>
obj2.showName(); <span class="hljs-comment">// deny</span>
</code></pre><h3 id="articleHeader4">&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x8FD9;&#x4E2A;&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#x4E00;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x91CC;&#x53BB;&#x505A;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x4E8B;&#x60C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(obj) {
    function fun() {};
    fun.prototype = obj;
    return new fun();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function <span class="hljs-keyword">object</span>(obj) {
    function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span> {};
    <span class="hljs-function"><span class="hljs-keyword">fun</span>.prototype = obj;</span>
    <span class="hljs-keyword">return</span> new <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;
}</code></pre><p>ES5&#x89C4;&#x8303;&#x4E86;&#x8FD9;&#x7C7B;&#x5199;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;Object.create(),&#x4F46;&#x662F;&#x5F0A;&#x7AEF;&#x548C;&#x7B2C;&#x4E00;&#x79CD;&#x7C7B;&#x4F3C;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x7406;&#x60F3;&#x7684;&#x7EE7;&#x627F;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;</p><h3 id="articleHeader5">&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x8FD9;&#x4E2A;&#x4E5F;&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#xFF0C;&#x5C31;&#x662F;&#x628A;&#x7EE7;&#x627F;&#x7684;&#x4E8B;&#x60C5;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x91CC;&#x53BB;&#x505A;&#xFF0C;&#x518D;&#x628A;&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(obj) {
    function fun() {};
    fun.prototype = obj;
    return new fun();
}
function factory() {
    const person = {name:&apos;mirok&apos;, age: 22};
    const obj = object(person);
    obj.show = function() {console.log(this.name)}
    return obj;
}
factory().show(); //&apos;mirok&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function <span class="hljs-keyword">object</span>(obj) {
    function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span> {};
    <span class="hljs-function"><span class="hljs-keyword">fun</span>.prototype = obj;</span>
    <span class="hljs-keyword">return</span> new <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;
}
function factory() {
    const person = {name:<span class="hljs-string">&apos;mirok&apos;</span>, age: <span class="hljs-number">22</span>};
    const obj = <span class="hljs-keyword">object</span>(person);
    obj.show = function() {console.log(<span class="hljs-keyword">this</span>.name)}
    <span class="hljs-keyword">return</span> obj;
}
factory().show(); <span class="hljs-comment">//&apos;mirok&apos;</span></code></pre><p>&#x81F3;&#x4E8E;&#x5F0A;&#x7AEF;&#x53EF;&#x89C1;&#x800C;&#x77E5;&#xFF0C;&#x4E0D;&#x80FD;&#x5B9E;&#x73B0;&#x5171;&#x4EAB;</p><h3 id="articleHeader6">&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x6709;&#x4E2A;&#x5F0A;&#x7AEF;&#x5C31;&#x662F;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x3002;&#x8FD9;&#x53C8;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x8FD9;&#x4E2A;&#x76F8;&#x5BF9;&#x4E4B;&#x524D;&#x7684;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x4F46;&#x662F;&#x9AD8;&#x6548;&#x7684;&#x4E00;&#x70B9;&#x662F;&#x53EA;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x6784;&#x9020;&#x51FD;&#x6570;,&#x539F;&#x7406;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x5BC4;&#x751F;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x7684;&#x526F;&#x672C;&#xFF0C;&#x526F;&#x672C;&#x548C;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x5171;&#x7528;&#x4E00;&#x4E2A;prototype,&#x8FD9;&#x6837;&#x5C31;&#x89E3;&#x51B3;&#x4E86;&#x4E4B;&#x524D;&#x7684;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(obj) {
    function fun() {};
    fun.prototype = obj;
    return new fun();
}
function factory(Sub, Super) {
    var proto = object(Super.prototype); //&#x8FD4;&#x56DE;Super&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;
    proto.constructer = Sub; //&#x8BBE;&#x7F6E;constructor&#x6307;&#x5411;, &#x56E0;&#x4E3A;&#x65B0;&#x526F;&#x672C;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x88AB;&#x91CD;&#x5199;
    Sub.prototype = proto; //&#x526F;&#x672C;&#x4F5C;&#x4E3A;sub&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;
}
function Super () {
    this.name = &apos;july&apos;;
}
Super.prototype.show = function () {
    console.log(this.name);
}
function Sub1 () {
    Super.call(this);
    this.name = &apos;mirok&apos;
}
function Sub2 () {
    Super.call(this);
    this.name = &apos;deny&apos;
}
factory(Sub1, Super);
factory(Sub2, Super);
var obj1 = new Sub1();
var obj2 = new Sub2();
obj1.show(); // mirok
obj2.show(); // deny" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>) </span>{};
    fun.prototype = obj;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> fun();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factory</span>(<span class="hljs-params">Sub, Super</span>) </span>{
    <span class="hljs-keyword">var</span> proto = object(Super.prototype); <span class="hljs-comment">//&#x8FD4;&#x56DE;Super&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;</span>
    proto.constructer = Sub; <span class="hljs-comment">//&#x8BBE;&#x7F6E;constructor&#x6307;&#x5411;, &#x56E0;&#x4E3A;&#x65B0;&#x526F;&#x672C;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x88AB;&#x91CD;&#x5199;</span>
    Sub.prototype = proto; <span class="hljs-comment">//&#x526F;&#x672C;&#x4F5C;&#x4E3A;sub&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Super</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;july&apos;</span>;
}
Super.prototype.show = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub1</span> (<span class="hljs-params"></span>) </span>{
    Super.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;mirok&apos;</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sub2</span> (<span class="hljs-params"></span>) </span>{
    Super.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;deny&apos;</span>
}
factory(Sub1, Super);
factory(Sub2, Super);
<span class="hljs-keyword">var</span> obj1 = <span class="hljs-keyword">new</span> Sub1();
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-keyword">new</span> Sub2();
obj1.show(); <span class="hljs-comment">// mirok</span>
obj2.show(); <span class="hljs-comment">// deny</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你们真的了解JS的继承嘛？

## 原文链接
[https://segmentfault.com/a/1190000015939442](https://segmentfault.com/a/1190000015939442)


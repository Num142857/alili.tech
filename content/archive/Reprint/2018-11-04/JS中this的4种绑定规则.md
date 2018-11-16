---
title: JS中this的4种绑定规则
hidden: true
categories: [reprint]
slug: c08a79c2
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">this</h2><ul><li>ES6&#x4E2D;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x91C7;&#x7528;&#x7684;&#x662F;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#x3002;</li><li>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;this&#xFF1A;&#x4F7F;API&#x8BBE;&#x8BA1;&#x5F97;&#x66F4;&#x7B80;&#x6D01;&#x4E14;&#x6613;&#x4E8E;&#x590D;&#x7528;&#x3002;</li><li>this&#x5373;&#x4E0D;&#x6307;&#x5411;&#x81EA;&#x8EAB;&#xFF0C;&#x4E5F;&#x4E0D;&#x6307;&#x5411;&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#x3002;</li><li>this&#x7684;&#x6307;&#x5411;&#x53EA;&#x53D6;&#x51B3;&#x4E8E;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;</li></ul><h2 id="articleHeader1">this&#x7ED1;&#x5B9A;&#x89C4;&#x5219;</h2><ul><li>new &gt; &#x663E;&#x793A;&#x7ED1;&#x5B9A; &gt; &#x9690;&#x5F0F;&#x7ED1;&#x5B9A; &gt; &#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;</li></ul><h3 id="articleHeader2">&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;</h3><ul><li>&#x5F53;&#x72EC;&#x7ACB;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x5426;&#x5728;&#x8C03;&#x7528;&#x6808;&#x4E2D;&#xFF0C;this&#x90FD;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF08;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4E3A;window&#xFF09;</li><li>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x4E0D;&#x80FD;&#x5C06;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7528;&#x4E8E;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 2;
function foo(){
    console.log(this.a);
}
function bar(){
    var a = 5;
    foo();
}
bar(); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
    foo();
}
bar(); <span class="hljs-comment">// 2</span></code></pre><h3 id="articleHeader3">&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;</h3><ul><li>&#x5F53;&#x51FD;&#x6570;&#x5F15;&#x7528;&#x6709;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#x4F1A;&#x628A;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E2D;&#x7684;this&#x7ED1;&#x5B9A;&#x5230;&#x8FD9;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x3002;</li><li>&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x5F15;&#x7528;&#x94FE;&#x4E2D;&#x53EA;&#x6709;&#x6700;&#x540E;&#x4E00;&#x5C42;&#x5728;&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#x4E2D;&#x8D77;&#x4F5C;&#x7528;&#x3002;</li><li>&#x8981;&#x6C42;&#xFF1A;&#x5BF9;&#x8C61;&#x5185;&#x90E8;&#x5FC5;&#x987B;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x51FD;&#x6570;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x53EF;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x95F4;&#x63A5;&#x5F15;&#x7528;&#x51FD;&#x6570;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    console.log( this.a );
}</span>

<span class="hljs-title">var</span> <span class="hljs-title">obj2</span> = <span class="hljs-comment">{
    a: 42,
    foo: foo
}</span>;</span>

<span class="hljs-keyword">var</span> obj1 = <span class="hljs-comment">{
    a: 2,
    obj2: obj2
}</span>;

obj1.obj2.foo(); <span class="hljs-comment">// 42</span></code></pre><ul><li><strong>&#x9690;&#x5F0F;&#x4E22;&#x5931;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // &#x8FD9;&#x91CC;bar&#x5C06;&#x5F15;&#x7528;foo&#x51FD;&#x6570;&#x672C;&#x8EAB;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5E26;&#x6709;&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x4E0A;&#x4E0B;&#x6587;

var a = &quot;oops, global&quot;; // a&#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;

bar(); // &quot;oops, global&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">foo</span>: foo
};

<span class="hljs-keyword">var</span> bar = obj.foo; <span class="hljs-comment">// &#x8FD9;&#x91CC;bar&#x5C06;&#x5F15;&#x7528;foo&#x51FD;&#x6570;&#x672C;&#x8EAB;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5E26;&#x6709;&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x4E0A;&#x4E0B;&#x6587;</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-string">&quot;oops, global&quot;</span>; <span class="hljs-comment">// a&#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;</span>

bar(); <span class="hljs-comment">// &quot;oops, global&quot;</span></code></pre><p>&#x548C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF08;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x65F6;&#x7684;&#x9690;&#x5F0F;&#x8D4B;&#x503C;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // &#x53C2;&#x6570;&#x4F20;&#x9012;&#x65F6;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;fn = obj.foo&#xFF0C;&#x5C31;&#x548C;&#x4E0A;&#x4E2A;&#x4F8B;&#x5B50;&#x4E00;&#x6837;&#x4E86;
    fn(); // &lt;-- call-site!
}

var obj = {
    a: 2,
    foo: foo
};

var a = &quot;oops, global&quot;; // `a` also property on global object

doFoo( obj.foo ); // &quot;oops, global&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doFoo</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// &#x53C2;&#x6570;&#x4F20;&#x9012;&#x65F6;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;fn = obj.foo&#xFF0C;&#x5C31;&#x548C;&#x4E0A;&#x4E2A;&#x4F8B;&#x5B50;&#x4E00;&#x6837;&#x4E86;</span>
    fn(); <span class="hljs-comment">// &lt;-- call-site!</span>
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">foo</span>: foo
};

<span class="hljs-keyword">var</span> a = <span class="hljs-string">&quot;oops, global&quot;</span>; <span class="hljs-comment">// `a` also property on global object</span>

doFoo( obj.foo ); <span class="hljs-comment">// &quot;oops, global&quot;</span></code></pre><h3 id="articleHeader4">&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;</h3><ul><li>&#x91C7;&#x7528;call()&#x548C;apply()&#xFF0C;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF08;&#x82E5;&#x4E3A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#xFF0C;&#x4F1A;&#x88AB;&#x5C01;&#x88C5;&#x51FD;&#x6570;&#x8F6C;&#x4E3A;&#x5BF9;&#x8C61;&#x2014;&#x88C5;&#x7BB1;&#xFF09;&#xFF0C;&#x5C06;this&#x7ED1;&#x5B9A;&#x5230;&#x8BE5;&#x5BF9;&#x8C61;&#x3002;</li><li><strong>&#x786C;&#x7ED1;&#x5B9A;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// &#x786C;&#x7ED1;&#x5B9A;&#x540E;bar&#x65E0;&#x8BBA;&#x600E;&#x4E48;&#x8C03;&#x7528;&#xFF0C;&#x90FD;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;foo&#x51FD;&#x6570;&#x7684;this&#x7ED1;&#x5B9A;
bar.call( window ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    foo.call( obj );
};

bar(); <span class="hljs-comment">// 2</span>
setTimeout( bar, <span class="hljs-number">100</span> ); <span class="hljs-comment">// 2</span>

<span class="hljs-comment">// &#x786C;&#x7ED1;&#x5B9A;&#x540E;bar&#x65E0;&#x8BBA;&#x600E;&#x4E48;&#x8C03;&#x7528;&#xFF0C;&#x90FD;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;foo&#x51FD;&#x6570;&#x7684;this&#x7ED1;&#x5B9A;</span>
bar.call( <span class="hljs-built_in">window</span> ); <span class="hljs-comment">// 2</span></code></pre><p>&#x786C;&#x7ED1;&#x5B9A;&#x7684;&#x5178;&#x578B;&#x5E94;&#x7528;&#x662F;&#x5982;&#x4E0B;&#x7684;&#x5305;&#x88F9;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments ); // &#x5C06;obj&#x5BF9;&#x8C61;&#x786C;&#x7F16;&#x7801;&#x8FDB;&#x53BB;
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a, something );
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + something;
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> foo.apply( obj, <span class="hljs-built_in">arguments</span> ); <span class="hljs-comment">// &#x5C06;obj&#x5BF9;&#x8C61;&#x786C;&#x7F16;&#x7801;&#x8FDB;&#x53BB;</span>
};

<span class="hljs-keyword">var</span> b = bar( <span class="hljs-number">3</span> ); <span class="hljs-comment">// 2 3</span>
<span class="hljs-built_in">console</span>.log( b ); <span class="hljs-comment">// 5</span></code></pre><p>&#x5373;&#x5C06;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x7528;apply&#x786C;&#x7ED1;&#x5B9A;&#x5230;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x65E0;&#x8BBA;&#x600E;&#x4E48;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x5305;&#x88F9;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x7684;this&#x3002;<br>bind&#x8F85;&#x52A9;&#x51FD;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments ); // &#x5229;&#x7528;&#x53C2;&#x6570;&#x5C06;obj&#x4F20;&#x5165;&#x8FDB;&#x53BB;
    };
}

var obj = {
    a: 2
};

var bar = bind( foo, obj ); // bind( foo, obj )&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5305;&#x88F9;&#x51FD;&#x6570;

var b = bar( 3 ); // 2 3
console.log( b ); // 5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a, something );
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + something;
}

<span class="hljs-comment">// simple `bind` helper</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bind</span>(<span class="hljs-params">fn, obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> fn.apply( obj, <span class="hljs-built_in">arguments</span> ); <span class="hljs-comment">// &#x5229;&#x7528;&#x53C2;&#x6570;&#x5C06;obj&#x4F20;&#x5165;&#x8FDB;&#x53BB;</span>
    };
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">var</span> bar = bind( foo, obj ); <span class="hljs-comment">// bind( foo, obj )&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5305;&#x88F9;&#x51FD;&#x6570;</span>

<span class="hljs-keyword">var</span> b = bar( <span class="hljs-number">3</span> ); <span class="hljs-comment">// 2 3</span>
<span class="hljs-built_in">console</span>.log( b ); <span class="hljs-comment">// 5</span></code></pre><p>&#x603B;&#x7ED3;&#xFF1A;&#x4E0A;&#x8FF0;&#x5305;&#x88F9;&#x51FD;&#x6570;&#xFF0C;&#x60F3;&#x8981;&#x5305;&#x88F9;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x80FD;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x91CD;&#x590D;&#x5199;&#xFF0C;&#x786C;&#x7F16;&#x7801;&#x7684;&#x65B9;&#x5F0F;&#x5BFC;&#x81F4;&#x4E0D;&#x80FD;&#x88AB;&#x91CD;&#x7528;&#xFF0C;&#x5F53;&#x67D0;&#x79CD;&#x529F;&#x80FD;&#x9700;&#x8981;&#x591A;&#x6B21;&#x91CD;&#x590D;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x5C06;&#x5176;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#xFF0C;&#x6210;&#x4E3A;&#x51FD;&#x6570;&#x3002;</p><h2 id="articleHeader5">new&#x7ED1;&#x5B9A;</h2><ul><li>&#x4EFB;&#x4F55;&#x51FD;&#x6570;&#x90FD;&#x53EF;&#x80FD;&#x88AB;&#x7528;&#x4F5C;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x51FD;&#x6570;&#x88AB;new&#x64CD;&#x4F5C;&#x7B26;&#x201C;&#x6784;&#x9020;&#x8C03;&#x7528;&#x201D;&#x65F6;&#xFF0C;&#x4F1A;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x64CD;&#x4F5C;&#xFF1A;</li></ul><p>1. &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF08;&#x82E5;&#x8BE5;&#x51FD;&#x6570;&#x4E0D;&#x662F;JS&#x5185;&#x7F6E;&#x7684;&#xFF0C;&#x5219;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Object&#x5BF9;&#x8C61;&#xFF09;&#xFF1B;<br>2. &#x5C06;this&#x7ED1;&#x5B9A;&#x5230;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF1B;<br>3. &#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#xFF08;&#x4E3A;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#xFF09;&#xFF1B;<br>4. &#x82E5;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x81EA;&#x52A8;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF1B;&#x82E5;&#x51FD;&#x6570;&#x6709;return&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x975E;&#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x8FD8;&#x662F;&#x81EA;&#x52A8;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5373;&#x8986;&#x76D6;&#x90A3;&#x4E2A;&#x975E;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a) {
    this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">this</span>.a = a;
}

<span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> foo( <span class="hljs-number">2</span> );
<span class="hljs-built_in">console</span>.log( bar.a ); <span class="hljs-comment">// 2</span></code></pre><h3 id="articleHeader6">&#x8865;&#x5145;&#x8BF4;&#x660E;</h3><ul><li>&#x95F4;&#x63A5;&#x5F15;&#x7528;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2&#xFF0C;&#x7531;&#x4E8E;p.foo = o.foo&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#x662F;foo()&#xFF0C;&#x800C;&#x4E0D;&#x662F;p.foo()&#x6216;o.foo()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    console.log( this.a );
}</span>

<span class="hljs-title">var</span> <span class="hljs-title">a</span> = 2;</span>
<span class="hljs-keyword">var</span> o = <span class="hljs-comment">{ a: 3, foo: foo }</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-comment">{ a: 4 }</span>;

o.foo(); <span class="hljs-comment">// 3</span>
(p.foo = o.foo)(); <span class="hljs-comment">// 2&#xFF0C;&#x7531;&#x4E8E;p.foo = o.foo&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#x662F;foo()&#xFF0C;&#x800C;&#x4E0D;&#x662F;p.foo()&#x6216;o.foo()</span></code></pre><ul><li>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF1A;&#x4E0D;&#x4F7F;&#x7528;&#x8FD9;&#x56DB;&#x4E2A;this&#x89C4;&#x5219;&#xFF0C;&#x6839;&#x636E;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#x6765;&#x51B3;&#x5B9A;this&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;
    return (a) =&gt; {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

// foo()&#x4E0D;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x4ED6;&#x7684;this&#x88AB;&#x7ED1;&#x5B9A;&#x5230;obj1
var bar = foo.call( obj1 ); // foo.call( obj1 )&#x8FD4;&#x56DE;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;bar&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;
bar.call( obj2 ); // 2! &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x65E0;&#x6CD5;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;new&#x4E5F;&#x4E0D;&#x884C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
        <span class="hljs-comment">// `this` here is lexically adopted from `foo()`</span>
        <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.a );
    };
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">3</span>
};

<span class="hljs-comment">// foo()&#x4E0D;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x4ED6;&#x7684;this&#x88AB;&#x7ED1;&#x5B9A;&#x5230;obj1</span>
<span class="hljs-keyword">var</span> bar = foo.call( obj1 ); <span class="hljs-comment">// foo.call( obj1 )&#x8FD4;&#x56DE;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;bar&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;</span>
bar.call( obj2 ); <span class="hljs-comment">// 2! &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x65E0;&#x6CD5;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;new&#x4E5F;&#x4E0D;&#x884C;</span></code></pre><p>&#x5982;&#x4E0B;&#x4E3A;&#x548C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E00;&#x6837;&#x7684;&#x6A21;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    var self = this; // lexical capture of `this`
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// lexical capture of `this`</span>
    setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log( self.a );
    }, <span class="hljs-number">100</span> );
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};

foo.call( obj ); <span class="hljs-comment">// 2</span></code></pre><h3 id="articleHeader7">this&#x7ED1;&#x5B9A;&#x7684;&#x8DA3;&#x9898;&#xFF1A;</h3><p><a href="https://www.zhihu.com/question/21466212" rel="nofollow noreferrer" target="_blank">&#x77E5;&#x4E4E;&#x94FE;&#x63A5;-arguments&#x5BF9;&#x8C61;&#x8C03;&#x7528;</a></p><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF1A;<a href="https://github.com/Lmagic16/blog" rel="nofollow noreferrer" target="_blank">https://github.com/Lmagic16/blog</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中this的4种绑定规则

## 原文链接
[https://segmentfault.com/a/1190000016678888](https://segmentfault.com/a/1190000016678888)


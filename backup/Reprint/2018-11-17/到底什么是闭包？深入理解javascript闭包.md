---
title: '到底什么是闭包？深入理解javascript闭包' 
date: 2018-11-17 02:30:13
hidden: true
slug: ray53l4gm
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x53E4;&#x8001;&#x5B9A;&#x4E49;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x95ED;&#x5305;(closure)&#xFF0C;&#x662F;&#x6307;&#x51FD;&#x6570;&#x53D8;&#x91CF;&#x53EF;&#x4EE5;&#x4FDD;&#x5B58;&#x5728;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#xFF0C;&#x56E0;&#x6B64;&#x770B;&#x8D77;&#x6765;&#x662F;&#x51FD;&#x6570;&#x5C06;&#x53D8;&#x91CF;&#x201C;&#x5305;&#x88F9;&#x201D;&#x4E86;&#x8D77;&#x6765;&#x3002;
//&#x6839;&#x636E;&#x5B9A;&#x4E49;&#xFF0C;&#x5305;&#x542B;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x95ED;&#x5305;
function foo() {
    var a = 0;
}
cosole.log(a) 
// Uncaught ReferenceError: a is not defined

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code>&#x95ED;&#x5305;(closure)&#xFF0C;&#x662F;&#x6307;&#x51FD;&#x6570;&#x53D8;&#x91CF;&#x53EF;&#x4EE5;&#x4FDD;&#x5B58;&#x5728;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#xFF0C;&#x56E0;&#x6B64;&#x770B;&#x8D77;&#x6765;&#x662F;&#x51FD;&#x6570;&#x5C06;&#x53D8;&#x91CF;&#x201C;&#x5305;&#x88F9;&#x201D;&#x4E86;&#x8D77;&#x6765;&#x3002;
<span class="hljs-comment">//&#x6839;&#x636E;&#x5B9A;&#x4E49;&#xFF0C;&#x5305;&#x542B;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x95ED;&#x5305;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    var a = 0;
}</span>
<span class="hljs-title">cosole</span>.<span class="hljs-title">log</span><span class="hljs-params">(a)</span> 
// <span class="hljs-title">Uncaught</span> <span class="hljs-title">ReferenceError</span>:</span> a <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined

</code></pre><h2 id="articleHeader1">&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#x5BF9;&#x95ED;&#x5305;&#x5B9A;&#x4E49;</h2><p>&#x95ED;&#x5305;&#x662F;&#x6307;&#x6709;&#x6743;&#x8BBF;&#x95EE;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //&#x6839;&#x636E;&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#xFF0C;&#x8BBF;&#x95EE;&#x4E0A;&#x5C42;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x5185;&#x5C42;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x95ED;&#x5305;
function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    bar();
}
foo();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-comment">//&#x6839;&#x636E;&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#xFF0C;&#x8BBF;&#x95EE;&#x4E0A;&#x5C42;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x5185;&#x5C42;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x95ED;&#x5305;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(a);
    }
    bar();
}
foo();
</code></pre><h2 id="articleHeader2">&#x300A;JavaScript&#x6743;&#x5A01;&#x6307;&#x5357;&#x300B;&#x5BF9;&#x95ED;&#x5305;&#x5B9A;&#x4E49;</h2><p>&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x76F8;&#x4E92;&#x5173;&#x8054;&#x8D77;&#x6765;&#xFF0C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x53EF;&#x4EE5;&#x4FDD;&#x5B58;&#x5728;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x95ED;&#x5305;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var global = &quot;global scope&quot;; //&#x5168;&#x5C40;&#x53D8;&#x91CF;
function checkscope() {
    var scope = &quot;local scope&quot;; //&#x5C40;&#x90E8;&#x53D8;&#x91CF;
    function f() {
        return scope; //&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x503C;
    };
    return f();
}
checkscope(); // &#x8FD4;&#x56DE; &quot;local scope&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code> <span class="hljs-keyword">var</span> <span class="hljs-keyword">global</span> = <span class="hljs-string">&quot;global scope&quot;</span>; <span class="hljs-comment">//&#x5168;&#x5C40;&#x53D8;&#x91CF;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">&quot;local scope&quot;</span>; <span class="hljs-comment">//&#x5C40;&#x90E8;&#x53D8;&#x91CF;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> scope; <span class="hljs-comment">//&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x503C;</span>
    };
    <span class="hljs-keyword">return</span> f();
}
checkscope(); <span class="hljs-comment">// &#x8FD4;&#x56DE; &quot;local scope&quot;</span></code></pre><hr><p>&#x4E25;&#x683C;&#x6765;&#x8BF4;&#xFF0C;&#x95ED;&#x5305;&#x9700;&#x8981;&#x6EE1;&#x8DB3;&#x4E09;&#x4E2A;&#x6761;&#x4EF6;&#xFF1A;&#x3010;1&#x3011;&#x8BBF;&#x95EE;&#x6240;&#x5728;&#x4F5C;&#x7528;&#x57DF;&#xFF1B;&#x3010;2&#x3011;&#x51FD;&#x6570;&#x5D4C;&#x5957;&#xFF1B;&#x3010;3&#x3011;&#x5728;&#x6240;&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x5916;&#x88AB;&#x8C03;&#x7528;<br>&#x3000;&#x3000;&#x6709;&#x4E9B;&#x4EBA;&#x89C9;&#x5F97;&#x53EA;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;1&#x5C31;&#x53EF;&#x4EE5;&#xFF0C;&#x6240;&#x4EE5;IIFE&#x662F;&#x95ED;&#x5305;&#xFF1B;&#x6709;&#x4E9B;&#x4EBA;&#x89C9;&#x5F97;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;1&#x548C;2&#x624D;&#x53EF;&#x4EE5;&#xFF0C;&#x6240;&#x4EE5;&#x88AB;&#x5D4C;&#x5957;&#x7684;&#x51FD;&#x6570;&#x624D;&#x662F;&#x95ED;&#x5305;&#xFF1B;&#x6709;&#x4E9B;&#x4EBA;&#x89C9;&#x5F97;3&#x4E2A;&#x6761;&#x4EF6;&#x90FD;&#x6EE1;&#x8DB3;&#x624D;&#x53EF;&#x4EE5;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x4EE5;&#x5916;&#x7684;&#x5730;&#x65B9;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x624D;&#x662F;&#x95ED;&#x5305;</p><hr><h2 id="articleHeader3">&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x95ED;&#x5305;</h2><p>&#x9996;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8BA1;&#x6570;&#x5668;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = 0;
function add() {
   return counter += 1;
}
add();
add();
add();// &#x8BA1;&#x6570;&#x5668;&#x73B0;&#x5728;&#x4E3A; 3 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>var counter = <span class="hljs-number">0</span>;
function <span class="hljs-keyword">add</span><span class="bash">() {
</span>   return counter += <span class="hljs-number">1</span>;
}
<span class="hljs-keyword">add</span><span class="bash">();
</span><span class="hljs-keyword">add</span><span class="bash">();
</span><span class="hljs-keyword">add</span><span class="bash">();// &#x8BA1;&#x6570;&#x5668;&#x73B0;&#x5728;&#x4E3A; 3 
</span></code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x8FBE;&#x5230;&#x4E86;&#x76EE;&#x7684;&#xFF0C;&#x53EF;&#x662F;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x6539;&#x53D8;counter&#x7684;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x8BA1;&#x6570;&#x5668;&#x5E76;&#x4E0D;&#x5B8C;&#x7F8E;&#x3002;&#x90A3;&#x6211;&#x4EEC;&#x628A;counter&#x653E;&#x5728;add&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4E0D;&#x5C31;&#x597D;&#x4E86;&#x4E48;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add() {
    var counter = 0;
    return counter += 1;
} 
add();
add();
add();// &#x672C;&#x610F;&#x662F;&#x60F3;&#x8F93;&#x51FA; 3, &#x4F46;&#x8F93;&#x51FA;&#x7684;&#x90FD;&#x662F; 1
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>function <span class="hljs-keyword">add</span><span class="bash">() {
</span>    var counter = <span class="hljs-number">0</span>;
    return counter += <span class="hljs-number">1</span>;
} 
<span class="hljs-keyword">add</span><span class="bash">();
</span><span class="hljs-keyword">add</span><span class="bash">();
</span><span class="hljs-keyword">add</span><span class="bash">();// &#x672C;&#x610F;&#x662F;&#x60F3;&#x8F93;&#x51FA; 3, &#x4F46;&#x8F93;&#x51FA;&#x7684;&#x90FD;&#x662F; 1
</span></code></pre><p>&#x6240;&#x4EE5;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x8BDD;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x7528;add&#x51FD;&#x6570;&#xFF0C;counter&#x7684;&#x503C;&#x90FD;&#x8981;&#x88AB;&#x521D;&#x59CB;&#x5316;&#x4E3A;0&#xFF0C;&#x8FD8;&#x662F;&#x8FBE;&#x4E0D;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x76EE;&#x7684;&#x3002;</p><h2 id="articleHeader4">&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x95ED;&#x5305;</h2><p>&#x6240;&#x4EE5;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x7528;&#x95ED;&#x5305;&#x53BB;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x5148;&#x770B;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
add();
add();
add();// &#x8BA1;&#x6570;&#x5668;&#x4E3A; 3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>var <span class="hljs-keyword">add</span><span class="bash"> = (<span class="hljs-function"><span class="hljs-title">function</span></span> () {
</span>    var counter = <span class="hljs-number">0</span>;
    return function () {return counter += <span class="hljs-number">1</span>;}
})();
<span class="hljs-keyword">add</span><span class="bash">();
</span><span class="hljs-keyword">add</span><span class="bash">();
</span><span class="hljs-keyword">add</span><span class="bash">();// &#x8BA1;&#x6570;&#x5668;&#x4E3A; 3
</span></code></pre><p>&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5B8C;&#x7F8E;&#x5B9E;&#x73B0;&#x4E86;&#x8BA1;&#x6570;&#x5668;&#x3002;&#x8FD9;&#x6BB5;&#x975E;&#x5E38;&#x7CBE;&#x7B80;&#xFF0C;&#x53EF;&#x4EE5;&#x62C6;&#x5206;&#x6210;&#x5982;&#x4E0B;&#x7B49;&#x4EF7;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function outerFunction () {
     var counter = 0;
     function innerFunction (){
         return counter += 1;
     }
     return innerFunction;
}
var add = outerFunction();
add();
add();
add();// &#x8BA1;&#x6570;&#x5668;&#x4E3A; 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outerFunction</span> <span class="hljs-params">()</span> </span>{
     <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFunction</span> <span class="hljs-params">()</span></span>{
         <span class="hljs-keyword">return</span> counter += <span class="hljs-number">1</span>;
     }
     <span class="hljs-keyword">return</span> innerFunction;
}
<span class="hljs-keyword">var</span> add = outerFunction();
add();
add();
add();<span class="hljs-comment">// &#x8BA1;&#x6570;&#x5668;&#x4E3A; 3</span></code></pre><p>&#x8FD9;&#x65F6;&#x5019;&#x7684;add&#x5C31;&#x5F62;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x3002;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x7531;&#x4E24;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF0C;&#x51FD;&#x6570;&#x548C;&#x521B;&#x5EFA;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x73AF;&#x5883;&#x3002;&#x73AF;&#x5883;&#x662F;&#x7531;&#x73AF;&#x5883;&#x4E2D;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7EC4;&#x6210;&#x7684;&#x3002;&#x5BF9;&#x4E8E;&#x95ED;&#x5305;add&#x6765;&#x8BF4;&#xFF0C;&#x5B83;&#x7531;&#x51FD;&#x6570;innerFunction&#x548C;&#x53D8;&#x91CF;counter&#x7EC4;&#x6210;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x65F6;&#x5019;add&#x662F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x53D8;&#x91CF;counter&#x7684;&#x3002;</p><h2 id="articleHeader5">&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x5E94;&#x6CE8;&#x610F;&#x7684;&#x95EE;&#x9898;</h2><p>&#x7531;&#x4E8E;&#x95ED;&#x5305;&#x4F1A;&#x643A;&#x5E26;&#x5305;&#x542B;&#x5B83;&#x7684;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x56E0;&#x6B64;&#x4F1A;&#x6BD4;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x5360;&#x7528;&#x66F4;&#x591A;&#x7684;&#x5185;&#x5B58;&#x3002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x89E3;&#x9664;&#x5BF9;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4EE5;&#x4FBF;&#x91CA;&#x653E;&#x5185;&#x5B58;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f2(){
    var n=22;
    var nAdd=function(){n++};
    return function(){
        return {
            n:n,
            nAdd:nAdd
        }
    }
}
//result2&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;
var result2=f2();
//&#x8C03;&#x7528;&#x51FD;&#x6570;
console.log(result2());
result2().nAdd();
console.log(result2());
//&#x89E3;&#x9664;&#x5BF9;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4EE5;&#x4FBF;&#x91CA;&#x653E;&#x5185;&#x5B58;
result2=null;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> n=<span class="hljs-number">22</span>;
    <span class="hljs-keyword">var</span> nAdd=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{n++};
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">n</span>:n,
            <span class="hljs-attr">nAdd</span>:nAdd
        }
    }
}
<span class="hljs-comment">//result2&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">var</span> result2=f2();
<span class="hljs-comment">//&#x8C03;&#x7528;&#x51FD;&#x6570;</span>
<span class="hljs-built_in">console</span>.log(result2());
result2().nAdd();
<span class="hljs-built_in">console</span>.log(result2());
<span class="hljs-comment">//&#x89E3;&#x9664;&#x5BF9;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4EE5;&#x4FBF;&#x91CA;&#x653E;&#x5185;&#x5B58;</span>
result2=<span class="hljs-literal">null</span>;
</code></pre><ol><li>1</li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
到底什么是闭包？深入理解javascript闭包

## 原文链接
[https://segmentfault.com/a/1190000015980718](https://segmentfault.com/a/1190000015980718)


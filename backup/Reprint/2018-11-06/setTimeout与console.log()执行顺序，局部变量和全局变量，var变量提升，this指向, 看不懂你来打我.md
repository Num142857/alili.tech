---
title: 'setTimeout与console.log()执行顺序，局部变量和全局变量，var变量提升，this指向, 看不懂你来打我'
hidden: true
categories: [reprint]
slug: d3df0457
date: 2018-11-06 02:30:12
---

{{< raw >}}
<p><strong>&#x4EE4;&#x4EBA;&#x5FC3;&#x75DB;&#x7684;&#x8840;&#x6DCB;&#x6DCB;&#x6559;&#x8BAD;&#xFF0C;&#x518D;&#x72AF;&#x8FD9;&#x4E9B;&#x9519;&#x8BEF;&#x6211;&#x4E0D;&#x662F;&#x4EBA;&#x3002;</strong></p><h2 id="articleHeader0">setTimeout&#x4E0E;console.log()&#x6267;&#x884C;&#x987A;&#x5E8F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout&#x5EF6;&#x65F6;&#x4E3A;0&#x65F6;&#xFF0C;
    setTimeout(function(){
        console.log(2);
    },0);
    console.log(1);
    //&#x8F93;&#x51FA;&#x987A;&#x5E8F;&#xFF1A;1&#xFF0C;2
    
     setTimeout(function(){
        console.log(4);
    },0);
    setTimeout(function(){
        console.log(5);
    },0);
    console.log(1);
    console.log(2);
    console.log(3);
    //&#x8F93;&#x51FA;&#x987A;&#x5E8F;&#xFF1A;1&#xFF0C;2&#xFF0C;3&#xFF0C;4&#xFF0C;5
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>setTimeout&#x5EF6;&#x65F6;&#x4E3A;<span class="hljs-number">0</span>&#x65F6;&#xFF0C;
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    },<span class="hljs-number">0</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-comment">//&#x8F93;&#x51FA;&#x987A;&#x5E8F;&#xFF1A;1&#xFF0C;2</span>
    
     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
    },<span class="hljs-number">0</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
    },<span class="hljs-number">0</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    <span class="hljs-comment">//&#x8F93;&#x51FA;&#x987A;&#x5E8F;&#xFF1A;1&#xFF0C;2&#xFF0C;3&#xFF0C;4&#xFF0C;5</span>
</code></pre><p><strong>&#x539F;&#x56E0;&#xFF1A;&#xFF08;&#x8BB0;&#x4F4F;&#x55BD;&#xFF0C;&#x8BB0;&#x4E0D;&#x4F4F;&#x6253;&#x6B7B;&#x4F60;&#xFF01;&#xFF01;&#xFF01;&#xFF09;</strong>&#xFF1A;&#x9875;&#x9762;&#x4E2D;&#x6240;&#x6709;&#x7531;setTimeout&#x5B9A;&#x4E49;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x90FD;&#x5C06;&#x653E;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x961F;&#x5217;&#x4E2D;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#x3002;&#x800C;&#x8FD9;&#x4E2A;&#x961F;&#x5217;&#x7684;&#x6267;&#x884C;&#x65F6;&#x95F4;&#x9700;&#x8981;&#x7B49;&#x5230;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6808;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x624D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x7B49;&#x5F85;&#x6240;&#x6709;&#x7684;&#x53EF;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x624D;&#x4F1A;&#x8F6E;&#x5230;setTimeout&#x6267;&#x884C;&#x5176;&#x5185;&#x90E8;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x4E14;&#x6309;&#x7167;&#x5176;&#x65F6;&#x5EF6;&#x65F6;&#x95F4;&#x957F;&#x77ED;&#x987A;&#x5E8F;&#x6267;&#x884C;&#x4EE3;&#x7801;&#xFF01;</p><p><strong>&#x518D;&#x6765;&#x4E2A;&#x9AD8;&#x6DF1;&#x7684;&#xFF1A;&#x7785;&#x7740;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){
        console.log(&quot;a:&quot;+a);
    },0);
    var a = 1;
    console.log(&quot;b:&quot;+b);
    var b = 2;
    var c = 3;
    var d = 4;
    var e = 5;
    function fx(c){
        console.log(&quot;c:&quot;+c);
    }
    function fn(e,d){
        console.log(&quot;d:&quot;+d);
        setTimeout(function(){
            console.log(&quot;e:&quot;+e);
        },10);
    }
    setTimeout(function(){
        console.log(&quot;b2:&quot;+b);
    },20);
    fn(e,d);
    fx(c);
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;a:&quot;</span>+a);
    },<span class="hljs-number">0</span>);
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;b:&quot;</span>+b);
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">var</span> c = <span class="hljs-number">3</span>;
    <span class="hljs-keyword">var</span> d = <span class="hljs-number">4</span>;
    <span class="hljs-keyword">var</span> e = <span class="hljs-number">5</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fx</span>(<span class="hljs-params">c</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;c:&quot;</span>+c);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">e,d</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;d:&quot;</span>+d);
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;e:&quot;</span>+e);
        },<span class="hljs-number">10</span>);
    }
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;b2:&quot;</span>+b);
    },<span class="hljs-number">20</span>);
    fn(e,d);
    fx(c);
    </code></pre><p>&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhRnV?w=161&amp;h=175" src="https://static.alili.tech/img/bVbhRnV?w=161&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x539F;&#x56E0;&#xFF1A;
1&#x3001;console.log()&#x51FD;&#x6570;&#x4F1A;&#x5728;setTimeout&#x51FD;&#x6570;&#x4E4B;&#x524D;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x4E14;b&#x5728;&#x8F93;&#x51FA;&#x4E4B;&#x524D;&#x672A;&#x88AB;&#x5B9A;&#x4E49;&#x6240;&#x4EE5;&#x6700;&#x5148;&#x8F93;&#x51FA;undefined&#xFF1B;
2&#x3001;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x6267;&#x884C;fn&#x51FD;&#x6570;&#x548C;fx&#x51FD;&#x6570;&#xFF0C;&#x800C;fn&#x51FD;&#x6570;&#x5185;&#x5B58;&#x5728;console.log&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x5C06;&#x4F1A;&#x5148;&#x8F93;&#x51FA;d&#x7684;&#x503C;4&#xFF1B;
3&#x3001;&#x7136;&#x540E;&#xFF0C;&#x5728;fx&#x51FD;&#x6570;&#x5185;&#x4E5F;&#x5B58;&#x5728;console.log&#x51FD;&#x6570;&#xFF0C;&#x540C;&#x6837;&#x4F1A;&#x5148;&#x8F93;&#x51FA;c&#x7684;&#x503C;3&#xFF1B;
4&#x3001;&#x518D;&#x6765;&#x6BD4;&#x8F83;setTimeout&#x51FD;&#x6570;&#x65F6;&#x5EF6;&#x957F;&#x77ED;&#xFF0C;&#x4F9D;&#x6B21;&#x8F93;&#x51FA;1&#xFF0C;5&#xFF0C;2&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x539F;&#x56E0;&#xFF1A;
<span class="hljs-number">1</span>&#x3001;console.log()&#x51FD;&#x6570;&#x4F1A;&#x5728;setTimeout&#x51FD;&#x6570;&#x4E4B;&#x524D;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x4E14;b&#x5728;&#x8F93;&#x51FA;&#x4E4B;&#x524D;&#x672A;&#x88AB;&#x5B9A;&#x4E49;&#x6240;&#x4EE5;&#x6700;&#x5148;&#x8F93;&#x51FA;undefined&#xFF1B;
<span class="hljs-number">2</span>&#x3001;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x6267;&#x884C;fn&#x51FD;&#x6570;&#x548C;fx&#x51FD;&#x6570;&#xFF0C;&#x800C;fn&#x51FD;&#x6570;&#x5185;&#x5B58;&#x5728;console.log&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x5C06;&#x4F1A;&#x5148;&#x8F93;&#x51FA;d&#x7684;&#x503C;<span class="hljs-number">4</span>&#xFF1B;
<span class="hljs-number">3</span>&#x3001;&#x7136;&#x540E;&#xFF0C;&#x5728;fx&#x51FD;&#x6570;&#x5185;&#x4E5F;&#x5B58;&#x5728;console.log&#x51FD;&#x6570;&#xFF0C;&#x540C;&#x6837;&#x4F1A;&#x5148;&#x8F93;&#x51FA;c&#x7684;&#x503C;<span class="hljs-number">3</span>&#xFF1B;
<span class="hljs-number">4</span>&#x3001;&#x518D;&#x6765;&#x6BD4;&#x8F83;setTimeout&#x51FD;&#x6570;&#x65F6;&#x5EF6;&#x957F;&#x77ED;&#xFF0C;&#x4F9D;&#x6B21;&#x8F93;&#x51FA;<span class="hljs-number">1</span>&#xFF0C;<span class="hljs-number">5</span>&#xFF0C;<span class="hljs-number">2</span>&#x3002;
</code></pre><p>3&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i &lt; 3; i++) {
setTimeout(function() {
    console.log(i);
}, 0);
console.log(i);
}
//0 1 2 3 3 3
&#x7528;&#x5230;&#x4E86;&#x95ED;&#x5305;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">//0 1 2 3 3 3</span>
&#x7528;&#x5230;&#x4E86;&#x95ED;&#x5305;
</code></pre><p>4&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i &lt; 3; i++) {}
console.log(i); 
//3&#xFF0C;&#x4E5F;&#x5C31;&#x8BF4;i&#x53EF;&#x4EE5;&#x5728;for&#x5FAA;&#x73AF;&#x4F53;&#x5916;&#x8BBF;&#x95EE;&#x5230;&#x3002;&#x6240;&#x4EE5;&#x662F;&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3002;    
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {}
<span class="hljs-built_in">console</span>.log(i); 
<span class="hljs-comment">//3&#xFF0C;&#x4E5F;&#x5C31;&#x8BF4;i&#x53EF;&#x4EE5;&#x5728;for&#x5FAA;&#x73AF;&#x4F53;&#x5916;&#x8BBF;&#x95EE;&#x5230;&#x3002;&#x6240;&#x4EE5;&#x662F;&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3002;    </span>
</code></pre><p>5&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 0;
setTimeout(function() {
    console.log(i);
}, 0);
console.log(i);
i++;
setTimeout(function() {
    console.log(i);
}, 0);
console.log(i);
i++;
setTimeout(function() {
    console.log(i);
}, 0);
console.log(i);
i++;    

&#x7B49;&#x4EF7;&#x4E8E;&#xFF1A;
var i = 0;
console.log(i);
i++;
console.log(i);
i++;
console.log(i);
i++;
setTimeout(function() {
    console.log(i);
}, 0);
setTimeout(function() {
    console.log(i);
}, 0);
setTimeout(function() {
    console.log(i);
}, 0);  //&#x5F39;&#x51FA; 0 1 2 3 3 3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(i);
i++;
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(i);
i++;
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(i);
i++;    

&#x7B49;&#x4EF7;&#x4E8E;&#xFF1A;
<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
<span class="hljs-built_in">console</span>.log(i);
i++;
<span class="hljs-built_in">console</span>.log(i);
i++;
<span class="hljs-built_in">console</span>.log(i);
i++;
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
}, <span class="hljs-number">0</span>);  <span class="hljs-comment">//&#x5F39;&#x51FA; 0 1 2 3 3 3</span>
</code></pre><h2 id="articleHeader1">&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x548C;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7684;&#x533A;&#x522B;</h2><p>1&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = &quot;Hello&quot;;
    function test(){
        var a;
        alert(a);
        a = &quot;World&quot;;
        alert(a);
    }
    test();//undefined world
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>    var a = <span class="hljs-string">&quot;Hello&quot;</span><span class="hljs-comment">;</span>
    function test(){
        var a<span class="hljs-comment">;</span>
        alert(a)<span class="hljs-comment">;</span>
        a = <span class="hljs-string">&quot;World&quot;</span><span class="hljs-comment">;</span>
        alert(a)<span class="hljs-comment">;</span>
    }
    test()<span class="hljs-comment">;//undefined world</span>
</code></pre><p>2&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     var a = &quot;Hello&quot;;
    function test(){
        alert(a);
        a = &quot;World&quot;;
        alert(a);
    }
    test();//Hello World
   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>     var a = <span class="hljs-string">&quot;Hello&quot;</span><span class="hljs-comment">;</span>
    function test(){
        alert(a)<span class="hljs-comment">;</span>
        a = <span class="hljs-string">&quot;World&quot;</span><span class="hljs-comment">;</span>
        alert(a)<span class="hljs-comment">;</span>
    }
    test()<span class="hljs-comment">;//Hello World</span>
   </code></pre><p>3)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a =1;
    function test(){
        alert(a);
        var a = 2;
        alert(a);
    }
    test();
    alert(a); //undefined 2 1        
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code>    <span class="hljs-keyword">var</span> a =<span class="hljs-number">1</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">()</span><span class="hljs-comment">{
        alert(a);
        var a = 2;
        alert(a);
    }</span>
    <span class="hljs-title">test</span><span class="hljs-params">()</span>;</span>
    alert(a); <span class="hljs-comment">//undefined 2 1        </span>
</code></pre><ul><li><p>Javascript&#x7684;&#x53D8;&#x91CF;&#x7684;scope&#x662F;&#x6839;&#x636E;<strong>&#x65B9;&#x6CD5;&#x5757;</strong>&#x6765;&#x5212;&#x5206;&#x7684;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4EE5;function&#x7684;&#x4E00;&#x5BF9;&#x5927;&#x62EC;&#x53F7;&#xFF5B; &#xFF5D;&#x6765;&#x5212;&#x5206;&#xFF09;&#x3002;&#x662F;function&#x5757;&#xFF0C;&#x800C;for&#x3001;while&#x3001;if&#x5757;&#x5E76;&#x4E0D;&#x662F;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x5212;&#x5206;&#x6807;&#x51C6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function&#xA0;test2(){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   alert&#xA0;(&quot;before&#xA0;for&#xA0;scope:&quot;+i);&#xA0;&#xA0;&#xA0;&#xA0;
      //&#xA0;i&#x672A;&#x8D4B;&#x503C;&#xFF08;&#x5E76;&#x4E0D;&#x662F;&#x672A;&#x58F0;&#x660E;&#xFF01;&#x4F7F;&#x7528;&#x672A;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#x5168;&#x629B;&#x51FA;&#x81F4;&#x547D;&#x9519;&#x8BEF;&#x800C;&#x4E2D;&#x65AD;&#x811A;&#x672C;&#x6267;&#x884C;&#xFF09;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;//&#xA0;&#x6B64;&#x65F6;i&#x7684;&#x503C;&#x662F;underfined&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   for(var&#xA0;i=0;i&lt;3;i++){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(&quot;in&#xA0;for&#xA0;scope:&quot;+i);&#xA0;&#xA0;//&#xA0;i&#x7684;&#x503C;&#x662F;&#xA0;0&#x3001;1&#x3001;2,&#xA0;&#x5F53;i&#x4E3A;3&#x65F6;&#x8DF3;&#x51FA;&#x5FAA;&#x73AF;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   alert(&quot;after&#xA0;for&#xA0;scope:&quot;+i);&#xA0;&#xA0;//&#xA0;i&#x7684;&#x503C;&#x662F;3&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x5728;for&#xA0;scope&#x4EE5;&#x5916;&#xFF0C;&#x4F46;i&#x7684;&#x503C;&#x4ECD;&#x7136;&#x4FDD;&#x7559;&#x4E3A;3&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   while(true){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       var&#xA0;j&#xA0;=&#xA0;1;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       break;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(j);&#xA0;&#xA0;&#xA0;&#xA0;
       //&#xA0;j&#x7684;&#x503C;&#x662F;1&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x5728;while&#xA0;scope&#x4EE5;&#x5916;&#xFF0C;&#x4F46;j&#x7684;&#x503C;&#x4ECD;&#x7136;&#x4FDD;&#x7559;&#x4E3A;1&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       if(true){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
           var&#xA0;k&#xA0;=&#xA0;2;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
           }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(k);&#xA0;&#xA0;//k&#x7684;&#x503C;&#x662F;1&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x5728;if&#xA0;scope&#x4EE5;&#x5916;&#xFF0C;&#x4F46;k&#x7684;&#x503C;&#x4ECD;&#x7136;&#x4FDD;&#x7559;&#x4E3A;1&#xA0;&#xA0;
   }&#xA0;&#xA0;
   test2();&#xA0;&#xA0;
   //&#x82E5;&#x5728;&#x6B64;&#x65F6;&#xFF08;function&#xA0;scope&#x4E4B;&#x5916;&#xFF09;&#x518D;&#x8F93;&#x51FA;&#x53EA;&#x5B58;&#x5728;&#x4E8E;test2&#xA0;&#x8FD9;&#x4E2A;function&#xA0;scope&#x91CC;&#x7684;&#xA0;i&#x3001;j&#x3001;k&#x53D8;&#x91CF;&#x4F1A;&#x53D1;&#x751F;&#x795E;&#x9A6C;&#x6548;&#x679C;&#x5462;&#xFF1F;&#xA0;&#xA0;
   alert(i);&#xA0;//error!&#xA0;&#x6CA1;&#x9519;&#xFF0C;&#x662F;error&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x53D8;&#x91CF;i&#x672A;&#x58F0;&#x660E;&#xFF08;&#x5E76;&#x4E0D;&#x662F;&#x672A;&#x8D4B;&#x503C;&#xFF0C;&#x533A;&#x5206;test2&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x884C;&#x8F93;&#x51FA;&#xFF09;&#xFF0C;&#x5BFC;&#x81F4;&#x811A;&#x672C;&#x9519;&#x8BEF;&#xFF0C;&#x7A0B;&#x5E8F;&#x5230;&#x6B64;&#x7ED3;&#x675F;&#xFF01;&#xA0;&#xA0;
   alert(&quot;&#x8FD9;&#x884C;&#x6253;&#x5370;&#x8FD8;&#x4F1A;&#x8F93;&#x51FA;&#x5417;&#xFF1F;&quot;+i);&#xA0;//&#x672A;&#x6267;&#x884C;&#xA0;&#xA0;
   alert(j);&#xA0;//&#x672A;&#x6267;&#x884C;&#xA0;&#xA0;
   alert(k);&#xA0;//&#x672A;&#x6267;&#x884C;
   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span>&#xA0;<span class="hljs-title">test2</span><span class="hljs-params">()</span></span>{&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   alert&#xA0;(<span class="hljs-string">&quot;before&#xA0;for&#xA0;scope:&quot;</span>+i);&#xA0;&#xA0;&#xA0;&#xA0;
      <span class="hljs-comment">//&#xA0;i&#x672A;&#x8D4B;&#x503C;&#xFF08;&#x5E76;&#x4E0D;&#x662F;&#x672A;&#x58F0;&#x660E;&#xFF01;&#x4F7F;&#x7528;&#x672A;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#x5168;&#x629B;&#x51FA;&#x81F4;&#x547D;&#x9519;&#x8BEF;&#x800C;&#x4E2D;&#x65AD;&#x811A;&#x672C;&#x6267;&#x884C;&#xFF09;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;//&#xA0;&#x6B64;&#x65F6;i&#x7684;&#x503C;&#x662F;underfined&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
   <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span>&#xA0;i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">3</span>;i++){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(<span class="hljs-string">&quot;in&#xA0;for&#xA0;scope:&quot;</span>+i);&#xA0;&#xA0;<span class="hljs-comment">//&#xA0;i&#x7684;&#x503C;&#x662F;&#xA0;0&#x3001;1&#x3001;2,&#xA0;&#x5F53;i&#x4E3A;3&#x65F6;&#x8DF3;&#x51FA;&#x5FAA;&#x73AF;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   alert(<span class="hljs-string">&quot;after&#xA0;for&#xA0;scope:&quot;</span>+i);&#xA0;&#xA0;<span class="hljs-comment">//&#xA0;i&#x7684;&#x503C;&#x662F;3&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x5728;for&#xA0;scope&#x4EE5;&#x5916;&#xFF0C;&#x4F46;i&#x7684;&#x503C;&#x4ECD;&#x7136;&#x4FDD;&#x7559;&#x4E3A;3&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
   <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       <span class="hljs-keyword">var</span>&#xA0;j&#xA0;=&#xA0;<span class="hljs-number">1</span>;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       <span class="hljs-keyword">break</span>;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(j);&#xA0;&#xA0;&#xA0;&#xA0;
       <span class="hljs-comment">//&#xA0;j&#x7684;&#x503C;&#x662F;1&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x5728;while&#xA0;scope&#x4EE5;&#x5916;&#xFF0C;&#x4F46;j&#x7684;&#x503C;&#x4ECD;&#x7136;&#x4FDD;&#x7559;&#x4E3A;1&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
           <span class="hljs-keyword">var</span>&#xA0;k&#xA0;=&#xA0;<span class="hljs-number">2</span>;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
           }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(k);&#xA0;&#xA0;<span class="hljs-comment">//k&#x7684;&#x503C;&#x662F;1&#xFF0C;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x5728;if&#xA0;scope&#x4EE5;&#x5916;&#xFF0C;&#x4F46;k&#x7684;&#x503C;&#x4ECD;&#x7136;&#x4FDD;&#x7559;&#x4E3A;1&#xA0;&#xA0;</span>
   }&#xA0;&#xA0;
   test2();&#xA0;&#xA0;
   <span class="hljs-comment">//&#x82E5;&#x5728;&#x6B64;&#x65F6;&#xFF08;function&#xA0;scope&#x4E4B;&#x5916;&#xFF09;&#x518D;&#x8F93;&#x51FA;&#x53EA;&#x5B58;&#x5728;&#x4E8E;test2&#xA0;&#x8FD9;&#x4E2A;function&#xA0;scope&#x91CC;&#x7684;&#xA0;i&#x3001;j&#x3001;k&#x53D8;&#x91CF;&#x4F1A;&#x53D1;&#x751F;&#x795E;&#x9A6C;&#x6548;&#x679C;&#x5462;&#xFF1F;&#xA0;&#xA0;</span>
   alert(i);&#xA0;<span class="hljs-comment">//error!&#xA0;&#x6CA1;&#x9519;&#xFF0C;&#x662F;error&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x53D8;&#x91CF;i&#x672A;&#x58F0;&#x660E;&#xFF08;&#x5E76;&#x4E0D;&#x662F;&#x672A;&#x8D4B;&#x503C;&#xFF0C;&#x533A;&#x5206;test2&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x884C;&#x8F93;&#x51FA;&#xFF09;&#xFF0C;&#x5BFC;&#x81F4;&#x811A;&#x672C;&#x9519;&#x8BEF;&#xFF0C;&#x7A0B;&#x5E8F;&#x5230;&#x6B64;&#x7ED3;&#x675F;&#xFF01;&#xA0;&#xA0;</span>
   alert(<span class="hljs-string">&quot;&#x8FD9;&#x884C;&#x6253;&#x5370;&#x8FD8;&#x4F1A;&#x8F93;&#x51FA;&#x5417;&#xFF1F;&quot;</span>+i);&#xA0;<span class="hljs-comment">//&#x672A;&#x6267;&#x884C;&#xA0;&#xA0;</span>
   alert(j);&#xA0;<span class="hljs-comment">//&#x672A;&#x6267;&#x884C;&#xA0;&#xA0;</span>
   alert(k);&#xA0;<span class="hljs-comment">//&#x672A;&#x6267;&#x884C;</span>
   </code></pre></li><li><p>Javascript&#x5728;&#x6267;&#x884C;&#x524D;&#x4F1A;&#x5BF9;&#x6574;&#x4E2A;&#x811A;&#x672C;&#x6587;&#x4EF6;&#x7684;&#x58F0;&#x660E;&#x90E8;&#x5206;&#x505A;&#x5B8C;&#x6574;&#x5206;&#x6790;(&#x5305;&#x62EC;&#x5C40;&#x90E8;&#x53D8;&#x91CF;)&#xFF0C;&#x4ECE;&#x800C;&#x786E;&#x5B9A;&#x5B9E;&#x53D8;&#x91CF;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x600E;&#x4E48;&#x7406;&#x89E3;&#x5462;&#xFF1F;&#x770B;&#x4E0B;&#x9762;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var&#xA0;a&#xA0;=1;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
 function&#xA0;test(){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
      alert(a);&#xA0;//a&#x4E3A;undefined!&#xA0;&#x8FD9;&#x4E2A;a&#x5E76;&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5728;function&#xA0;scope&#x91CC;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#x4E86;&#xFF08;&#x51FD;&#x6570;&#x4F53;&#x5012;&#x6570;&#x7B2C;4&#x884C;&#xFF09;&#x4E00;&#x4E2A;&#x91CD;&#x540D;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;,&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
      //&#x6240;&#x4EE5;&#x5168;&#x5C40;&#x53D8;&#x91CF;a&#x88AB;&#x8986;&#x76D6;&#x4E86;&#xFF0C;&#x8FD9;&#x8BF4;&#x660E;&#x4E86;Javascript&#x5728;&#x6267;&#x884C;&#x524D;&#x4F1A;&#x5BF9;&#x6574;&#x4E2A;&#x811A;&#x672C;&#x6587;&#x4EF6;&#x7684;&#x5B9A;&#x4E49;&#x90E8;&#x5206;&#x505A;&#x5B8C;&#x6574;&#x5206;&#x6790;,&#x6240;&#x4EE5;&#x5728;&#x51FD;&#x6570;test()&#x6267;&#x884C;&#x524D;,&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
      //&#x51FD;&#x6570;&#x4F53;&#x4E2D;&#x7684;&#x53D8;&#x91CF;a&#x5C31;&#x88AB;&#x6307;&#x5411;&#x5185;&#x90E8;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;.&#x800C;&#x4E0D;&#x662F;&#x6307;&#x5411;&#x5916;&#x90E8;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;.&#xA0;&#x4F46;&#x8FD9;&#x65F6;a&#x53EA;&#x6709;&#x58F0;&#x660E;&#xFF0C;&#x8FD8;&#x6CA1;&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x8F93;&#x51FA;undefined&#x3002;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
      a=4;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(a);&#xA0;&#xA0;//a&#x4E3A;4,&#x6CA1;&#x60AC;&#x5FF5;&#x4E86;&#x5427;&#xFF1F;&#xA0;&#x8FD9;&#x91CC;&#x7684;a&#x8FD8;&#x662F;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x54E6;&#xFF01;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       var&#xA0;a;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;//&#x5C40;&#x90E8;&#x53D8;&#x91CF;a&#x5728;&#x8FD9;&#x884C;&#x58F0;&#x660E;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(a);&#xA0;&#xA0;//a&#x8FD8;&#x662F;&#x4E3A;4,&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x4E4B;&#x524D;&#x5DF2;&#x628A;4&#x8D4B;&#x7ED9;a&#x4E86;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       test();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(a);&#xA0;//a&#x4E3A;1&#xFF0C;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x5728;function&#xA0;scope&#x5185;&#xFF0C;a&#x7684;&#x503C;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xA0;
       " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code> var&#xA0;<span class="hljs-keyword">a</span>&#xA0;=<span class="hljs-number">1</span>;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
 <span class="hljs-function"><span class="hljs-keyword">function</span>&#xA0;<span class="hljs-title">test</span>(){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
      alert(<span class="hljs-keyword">a</span>);<span class="hljs-comment">&#xA0;//a&#x4E3A;undefined!&#xA0;&#x8FD9;&#x4E2A;a&#x5E76;&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5728;function&#xA0;scope&#x91CC;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#x4E86;&#xFF08;&#x51FD;&#x6570;&#x4F53;&#x5012;&#x6570;&#x7B2C;4&#x884C;&#xFF09;&#x4E00;&#x4E2A;&#x91CD;&#x540D;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;,&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
     <span class="hljs-comment"> //&#x6240;&#x4EE5;&#x5168;&#x5C40;&#x53D8;&#x91CF;a&#x88AB;&#x8986;&#x76D6;&#x4E86;&#xFF0C;&#x8FD9;&#x8BF4;&#x660E;&#x4E86;Javascript&#x5728;&#x6267;&#x884C;&#x524D;&#x4F1A;&#x5BF9;&#x6574;&#x4E2A;&#x811A;&#x672C;&#x6587;&#x4EF6;&#x7684;&#x5B9A;&#x4E49;&#x90E8;&#x5206;&#x505A;&#x5B8C;&#x6574;&#x5206;&#x6790;,&#x6240;&#x4EE5;&#x5728;&#x51FD;&#x6570;test()&#x6267;&#x884C;&#x524D;,&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
     <span class="hljs-comment"> //&#x51FD;&#x6570;&#x4F53;&#x4E2D;&#x7684;&#x53D8;&#x91CF;a&#x5C31;&#x88AB;&#x6307;&#x5411;&#x5185;&#x90E8;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;.&#x800C;&#x4E0D;&#x662F;&#x6307;&#x5411;&#x5916;&#x90E8;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;.&#xA0;&#x4F46;&#x8FD9;&#x65F6;a&#x53EA;&#x6709;&#x58F0;&#x660E;&#xFF0C;&#x8FD8;&#x6CA1;&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x8F93;&#x51FA;undefined&#x3002;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
      <span class="hljs-keyword">a</span>=<span class="hljs-number">4</span>;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(<span class="hljs-keyword">a</span>);&#xA0;<span class="hljs-comment">&#xA0;//a&#x4E3A;4,&#x6CA1;&#x60AC;&#x5FF5;&#x4E86;&#x5427;&#xFF1F;&#xA0;&#x8FD9;&#x91CC;&#x7684;a&#x8FD8;&#x662F;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x54E6;&#xFF01;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       var&#xA0;<span class="hljs-keyword">a</span>;&#xA0;&#xA0;&#xA0;&#xA0;<span class="hljs-comment">&#xA0;//&#x5C40;&#x90E8;&#x53D8;&#x91CF;a&#x5728;&#x8FD9;&#x884C;&#x58F0;&#x660E;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       alert(<span class="hljs-keyword">a</span>);&#xA0;<span class="hljs-comment">&#xA0;//a&#x8FD8;&#x662F;&#x4E3A;4,&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x4E4B;&#x524D;&#x5DF2;&#x628A;4&#x8D4B;&#x7ED9;a&#x4E86;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       test();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(<span class="hljs-keyword">a</span>);<span class="hljs-comment">&#xA0;//a&#x4E3A;1&#xFF0C;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x5728;function&#xA0;scope&#x5185;&#xFF0C;a&#x7684;&#x503C;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xA0;</span>
       </code></pre></li><li><p>&#x5F53;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x8DDF;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x91CD;&#x540D;&#x65F6;&#xFF0C;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7684;scope&#x4F1A;&#x8986;&#x76D6;&#x6389;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;scope&#xFF0C;&#x5F53;&#x79BB;&#x5F00;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x7684;scope&#x540E;&#xFF0C;&#x53C8;&#x91CD;&#x56DE;&#x5230;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;scope&#xFF0C;&#x800C;&#x5F53;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x9047;&#x4E0A;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x65F6;&#xFF0C;&#x600E;&#x6837;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x5462;&#xFF1F;&#x7528;window.globalVariableName&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var&#xA0;a&#xA0;=1;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   function&#xA0;test(){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(window.a);&#xA0;&#xA0;//a&#x4E3A;1,&#x8FD9;&#x91CC;&#x7684;a&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x54E6;&#xFF01;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       var&#xA0;a=2;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;//&#x5C40;&#x90E8;&#x53D8;&#x91CF;a&#x5728;&#x8FD9;&#x884C;&#x5B9A;&#x4E49;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       alert(a);&#xA0;&#xA0;//a&#x4E3A;2,&#x8FD9;&#x91CC;&#x7684;a&#x662F;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x54E6;&#xFF01;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
  test();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
  alert(a);&#xA0;//a&#x4E3A;1&#xFF0C;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x5728;function&#xA0;scope&#x5185;&#xFF0C;a&#x7684;&#x503C;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x503C;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code>   var&#xA0;<span class="hljs-keyword">a</span>&#xA0;=<span class="hljs-number">1</span>;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
   <span class="hljs-function"><span class="hljs-keyword">function</span>&#xA0;<span class="hljs-title">test</span>(){&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       alert(window.<span class="hljs-keyword">a</span>);&#xA0;<span class="hljs-comment">&#xA0;//a&#x4E3A;1,&#x8FD9;&#x91CC;&#x7684;a&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x54E6;&#xFF01;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       var&#xA0;<span class="hljs-keyword">a</span>=<span class="hljs-number">2</span>;&#xA0;&#xA0;&#xA0;&#xA0;<span class="hljs-comment">&#xA0;//&#x5C40;&#x90E8;&#x53D8;&#x91CF;a&#x5728;&#x8FD9;&#x884C;&#x5B9A;&#x4E49;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       alert(<span class="hljs-keyword">a</span>);&#xA0;<span class="hljs-comment">&#xA0;//a&#x4E3A;2,&#x8FD9;&#x91CC;&#x7684;a&#x662F;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x54E6;&#xFF01;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span>
       }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
  test();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
  alert(<span class="hljs-keyword">a</span>);<span class="hljs-comment">&#xA0;//a&#x4E3A;1&#xFF0C;&#x8FD9;&#x91CC;&#x5E76;&#x4E0D;&#x5728;function&#xA0;scope&#x5185;&#xFF0C;a&#x7684;&#x503C;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x503C;</span>
</code></pre></li></ul><p>**&#x603B;&#x7ED3;&#xFF1A;&#xFF08;&#x6BCF;&#x4E2A;&#x4F8B;&#x5B50;&#x6162;&#x6162;&#x770B;&#xFF0C;&#x5C31;&#x5168;&#x61C2;&#x4E86;&#xFF09;<br>1&#x3001;js&#x6709;&#x4E24;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5168;&#x5C40;&#x548C;&#x5C40;&#x90E8;&#xFF0C;&#x5C40;&#x90E8;&#x4E5F;&#x53EB;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;<br>2&#x3001;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x53D8;&#x91CF;&#x5C40;&#x90E8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF0C;&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x53D8;&#x91CF;&#x53EA;&#x80FD;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x4F7F;&#x7528;<br>3&#x3001;var&#x548C;function&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x90FD;&#x58F0;&#x660E;&#x63D0;&#x524D;&#xFF0C;&#x8D4B;&#x503C;&#x7559;&#x5728;&#x539F;&#x5730;<br>4&#x3001;&#x5982;&#x679C;&#x5C40;&#x90E8;&#x548C;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x91CD;&#x540D;&#xFF0C;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x5C40;&#x90E8;&#x53D8;&#x91CF;<br>5&#x3001;&#x7B2C;3&#x6761;&#x548C;&#x7B2C;4&#x6761;&#xFF0C;&#x89E3;&#x91CA;&#x4E86;&#x5168;&#x5C40;&#x548C;&#x5C40;&#x90E8;&#x90FD;&#x6709;&#x76F8;&#x540C;&#x53D8;&#x91CF;&#x540D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x800C;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x6253;&#x5370;&#x7684;&#x53D8;&#x91CF;&#x662F;undefined**</p><h2 id="articleHeader2">var&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF08;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x6211;&#x4E00;&#x76F4;&#x4E00;&#x77E5;&#x534A;&#x89E3;&#xFF0C;&#x73B0;&#x5728;&#x61C2;&#x4E86;&#xFF09;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x7701;&#x7565;var&#x7684;&#xFF0C;&#x4F46;&#x6709;&#x4E24;&#x70B9;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#xFF1A;
1&#x3001;var a=1 &#x4E0E; a=1 &#xFF0C;&#x8FD9;&#x4E24;&#x6761;&#x8BED;&#x53E5;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x4F5C;&#x7528;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x4F46;&#x662F;&#x524D;&#x8005;&#x4E0D;&#x80FD;&#x7528;delete&#x5220;&#x9664;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x7EDD;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x79CD;&#x5DEE;&#x5F02;&#x662F;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x7684;&#x3002;
2&#x3001;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7528;var &#x8FDB;&#x884C;&#x7533;&#x660E;&#xFF0C;&#x5219;&#x521B;&#x5EFA;&#x7684;&#x53D8;&#x91CF;&#x662F;**&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5C40;&#x90E8;&#x53D8;&#x91CF;**&#x4E86;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5EFA;&#x8BAE;&#x53D8;&#x91CF;&#x7533;&#x660E;&#x52A0;&#x4E0A;var&#x5173;&#x952E;&#x5B57;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x7701;&#x7565;<span class="hljs-keyword">var</span>&#x7684;&#xFF0C;&#x4F46;&#x6709;&#x4E24;&#x70B9;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#xFF1A;
<span class="hljs-number">1</span>&#x3001;<span class="hljs-keyword">var</span> a=<span class="hljs-number">1</span> &#x4E0E; a=<span class="hljs-number">1</span> &#xFF0C;&#x8FD9;&#x4E24;&#x6761;&#x8BED;&#x53E5;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x4F5C;&#x7528;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x4F46;&#x662F;&#x524D;&#x8005;&#x4E0D;&#x80FD;&#x7528;<span class="hljs-keyword">delete</span>&#x5220;&#x9664;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x7EDD;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x79CD;&#x5DEE;&#x5F02;&#x662F;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x7684;&#x3002;
<span class="hljs-number">2</span>&#x3001;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7528;<span class="hljs-keyword">var</span> &#x8FDB;&#x884C;&#x7533;&#x660E;&#xFF0C;&#x5219;&#x521B;&#x5EFA;&#x7684;&#x53D8;&#x91CF;&#x662F;**&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5C40;&#x90E8;&#x53D8;&#x91CF;**&#x4E86;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5EFA;&#x8BAE;&#x53D8;&#x91CF;&#x7533;&#x660E;&#x52A0;&#x4E0A;<span class="hljs-keyword">var</span>&#x5173;&#x952E;&#x5B57;&#x3002;
</code></pre><p><strong>&#x7785;&#x7740;&#xFF1A;</strong><br>1)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var t = 1; 
    function a(){
        console.log(t);
        var t=2;
    }
    a();//undefined;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> t = <span class="hljs-number">1</span>; 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(t);
        <span class="hljs-keyword">var</span> t=<span class="hljs-number">2</span>;
    }
    a();<span class="hljs-comment">//undefined;</span></code></pre><p>&#x8F93;&#x51FA;undefined&#xFF0C;&#x539F;&#x56E0;&#xFF1A;function&#xFF08;&#xFF09;&#x4E2D;&#x76F8;&#x5F53;&#x4E8E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var t;
console.log(t);
t = 2;
&#x8868;&#x793A;&#x53D8;&#x91CF;t&#x5DF2;&#x58F0;&#x660E;&#xFF0C;&#x4F46;&#x8FD8;&#x672A;&#x8D4B;&#x503C;,&#x8F93;&#x51FA;undefined&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">t</span>;
console.log(<span class="hljs-built_in">t</span>);
<span class="hljs-built_in">t</span> = <span class="hljs-number">2</span>;
&#x8868;&#x793A;&#x53D8;&#x91CF;<span class="hljs-built_in">t</span>&#x5DF2;&#x58F0;&#x660E;&#xFF0C;&#x4F46;&#x8FD8;&#x672A;&#x8D4B;&#x503C;,&#x8F93;&#x51FA;undefined&#x3002;
</code></pre><p>2)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4F46;&#x662F;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x53EA;&#x5BF9;var&#x547D;&#x4EE4;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x6709;&#x6548;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x4E0D;&#x662F;&#x7528;var&#x547D;&#x4EE4;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x3002;
console.log(aa);
aa =1;
&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x5C06;&#x4F1A;&#x62A5;&#x9519;:ReferenceError: aa is not defined&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code>&#x4F46;&#x662F;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x53EA;&#x5BF9;<span class="hljs-keyword">var</span>&#x547D;&#x4EE4;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x6709;&#x6548;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x4E0D;&#x662F;&#x7528;<span class="hljs-keyword">var</span>&#x547D;&#x4EE4;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x3002;
<span class="hljs-built_in">console</span>.log(aa);
aa =<span class="hljs-number">1</span>;
&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x5C06;&#x4F1A;&#x62A5;&#x9519;:ReferenceError: aa <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined&#x3002;
</code></pre><p>3)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var t = 1;
    function a(){
        console.log(t);
        t=2;
    }
    a();//1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> t = <span class="hljs-number">1</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span><span class="hljs-comment">{
        console.log(t);
        t=2;
    }</span>
    <span class="hljs-title">a</span><span class="hljs-params">()</span>;</span><span class="hljs-comment">//1</span></code></pre><p>4&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x51FD;&#x6570;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x63D0;&#x5347;
foo();
function foo(){
    console.log(&quot;aaa&quot;);
}
//&#x8F93;&#x51FA;aaa

&#x539F;&#x56E0;&#xFF1A;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347; &#xFF08;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347;&#x76F4;&#x63A5;&#x628A;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#x63D0;&#x5230;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x6700;&#x9876;&#x7AEF;&#xFF09;
&#x5B83;&#x76F8;&#x5F53;&#x4E8E;
function foo(){
    console.log(&quot;aaa&quot;);
}
foo();
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x51FD;&#x6570;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x63D0;&#x5347;
foo();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;aaa&quot;</span>);
}
<span class="hljs-comment">//&#x8F93;&#x51FA;aaa</span>

&#x539F;&#x56E0;&#xFF1A;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347; &#xFF08;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x63D0;&#x5347;&#x76F4;&#x63A5;&#x628A;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#x63D0;&#x5230;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x6700;&#x9876;&#x7AEF;&#xFF09;
&#x5B83;&#x76F8;&#x5F53;&#x4E8E;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;aaa&quot;</span>);
}
foo();
    </code></pre><p>5)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();
var foo = function(){
    console.log(&quot;aaa&quot;);
} 
&#x5B83;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;
var foo;
foo(); //foo is not a function
foo = function(){
        console.log(&quot;aaa&quot;);
    }          
&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x8F93;&#x51FA;undefined &#x662F;&#x56E0;&#x4E3A;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x56E0;&#x6B64;&#x8F93;&#x51FA;undefined

&#x8F93;&#x51FA;foo is not a function &#x539F;&#x56E0;&#x662F;&#xFF1A;js&#x89E3;&#x6790;&#x9047;&#x5230; foo()&#x65F6;&#x4F1A;&#x9ED8;&#x8BA4;&#x5F53;&#x505A;&#x51FD;&#x6570;&#x6765;&#x89E3;&#x6790;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>foo();
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;aaa&quot;</span>);
} 
&#x5B83;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;
<span class="hljs-keyword">var</span> foo;
foo(); <span class="hljs-comment">//foo is not a function</span>
foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;aaa&quot;</span>);
    }          
&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x8F93;&#x51FA;<span class="hljs-literal">undefined</span> &#x662F;&#x56E0;&#x4E3A;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x56E0;&#x6B64;&#x8F93;&#x51FA;<span class="hljs-literal">undefined</span>

&#x8F93;&#x51FA;foo is not a <span class="hljs-function"><span class="hljs-keyword">function</span> &#x539F;&#x56E0;&#x662F;&#xFF1A;<span class="hljs-title">js</span>&#x89E3;&#x6790;&#x9047;&#x5230; <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)&#x65F6;&#x4F1A;&#x9ED8;&#x8BA4;&#x5F53;&#x505A;&#x51FD;&#x6570;&#x6765;&#x89E3;&#x6790;
</span></code></pre><p><strong>6&#xFF09;&#x6700;&#x5389;&#x5BB3;&#x7684;&#x4E00;&#x4E2A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
console.log(foo);
var foo=10;
console.log(foo);
function foo(){
    console.log(10);
}
console.log(foo);

&#x4ED6;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;
function foo(){
    console.log(10);
}
var foo&#xFF1B;
console.log(foo);
foo=10;
console.log(foo);
console.log(foo);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-built_in">console</span>.log(foo);
<span class="hljs-keyword">var</span> foo=<span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(foo);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">10</span>);
}
<span class="hljs-built_in">console</span>.log(foo);

&#x4ED6;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">10</span>);
}
<span class="hljs-keyword">var</span> foo&#xFF1B;
<span class="hljs-built_in">console</span>.log(foo);
foo=<span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(foo);
<span class="hljs-built_in">console</span>.log(foo);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhSxa?w=223&amp;h=106" src="https://static.alili.tech/img/bVbhSxa?w=223&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x51FD;&#x6570;&#x63D0;&#x5347;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x4E0A;&#x9762;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;console.log(foo);&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8F93;&#x51FA;&#x51FD;&#x6570;&#x9898;&#x5462;&#xFF0C;&#x539F;&#x56E0;&#x5728;&#x4E8E; var foo; &#x5E76;&#x672A;&#x6709;&#x8D4B;&#x503C;&#x53EA;&#x662F;&#x58F0;&#x660E;&#xFF0C;&#x56E0;&#x6B64;&#x4ED6;&#x4F1A;&#x8C03;&#x7528;&#x4E0A;&#x9762;&#x7684;&#x503C;.</p><h2 id="articleHeader3">this&#x6307;&#x5411;</h2><ol><li><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &#x5168;&#x5C40;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;this&#x6307;&#x5411;window
   console.log(this.document === document); // true
   
   // &#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E3A; window &#x5BF9;&#x8C61;&#xFF1A;
   console.log(this === window); // true
   
   this.a = 37;
   console.log(window.a); // 37
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>   &#x5168;&#x5C40;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;<span class="hljs-keyword">this</span>&#x6307;&#x5411;<span class="hljs-built_in">window</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.<span class="hljs-built_in">document</span> === <span class="hljs-built_in">document</span>); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span>
   
   <span class="hljs-regexp">//</span> &#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E3A; <span class="hljs-built_in">window</span> &#x5BF9;&#x8C61;&#xFF1A;
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span>
   
   <span class="hljs-keyword">this</span>.a = <span class="hljs-number">37</span>;
   <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a); <span class="hljs-regexp">//</span> <span class="hljs-number">37</span>
</code></pre></li><li><p>&#x51FD;&#x6570;&#x8C03;&#x7528;<br>&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;this &#x9ED8;&#x8BA4;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;window</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function f1(){
     return this
   f1() === window; // true

   &#x800C;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C; this&#x4E3A;undefined
   function f2(){
     &quot;use strict&quot;; // &#x8FD9;&#x91CC;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;
     return this;
   }    
   f2() === undefined; // true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
   f1() === <span class="hljs-built_in">window</span>; <span class="hljs-comment">// true</span>

   &#x800C;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C; <span class="hljs-keyword">this</span>&#x4E3A;<span class="hljs-literal">undefined</span>
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">     &quot;use strict&quot;</span>; <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;</span>
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
   }    
   f2() === <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// true</span>
</code></pre></li><li><p>1&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &#x5BF9;&#x8C61;&#x4E2D;&#x7684;this
     var o = {
     user:&quot;&#x674E;&#x94A2;&#x94C1;&quot;,
     fn:function(){
           console.log(this.user);  //&#x674E;&#x94A2;&#x94C1;
       }
   }
   o.fn();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   &#x5BF9;&#x8C61;&#x4E2D;&#x7684;<span class="hljs-keyword">this</span>
     <span class="hljs-keyword">var</span> o = {
     <span class="hljs-attr">user</span>:<span class="hljs-string">&quot;&#x674E;&#x94A2;&#x94C1;&quot;</span>,
     <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.user);  <span class="hljs-comment">//&#x674E;&#x94A2;&#x94C1;</span>
       }
   }
   o.fn();
</code></pre><p>&#x8FD9;&#x91CC;&#x7684;this&#x6307;&#x5411;&#x7684;&#x662F;&#x5BF9;&#x8C61;o&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;fn&#x662F;&#x901A;&#x8FC7;o.fn()&#x6267;&#x884C;&#x7684;&#xFF0C;&#x90A3;&#x81EA;&#x7136;&#x6307;&#x5411;&#x5C31;&#x662F;&#x5BF9;&#x8C61;o&#xFF0C;&#x8FD9;&#x91CC;&#x518D;&#x6B21;&#x5F3A;&#x8C03;&#x4E00;&#x70B9;&#xFF0C;this&#x7684;&#x6307;&#x5411;&#x5728;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x662F;&#x51B3;&#x5B9A;&#x4E0D;&#x4E86;&#x7684;&#xFF0C;&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x51B3;&#x5B9A;&#xFF0C;&#x8C01;&#x8C03;&#x7528;&#x7684;&#x5C31;&#x6307;&#x5411;&#x8C01;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x641E;&#x6E05;&#x695A;&#x8FD9;&#x4E2A;&#x3002;</p></li></ol><p>2&#xFF09;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {
user:&quot;&#x674E;&#x94A2;&#x94C1;&quot;,
fn:function(){
    console.log(this.user); //&#x674E;&#x94A2;&#x94C1;
}
}
window.o.fn();
this&#x6307;&#x5411;o
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {
<span class="hljs-attr">user</span>:<span class="hljs-string">&quot;&#x674E;&#x94A2;&#x94C1;&quot;</span>,
<span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.user); <span class="hljs-comment">//&#x674E;&#x94A2;&#x94C1;</span>
}
}
<span class="hljs-built_in">window</span>.o.fn();
<span class="hljs-keyword">this</span>&#x6307;&#x5411;o
</code></pre><p>3&#xFF09;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {
  a:10,
  b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
        }
    }
}
o.b.fn();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {
  <span class="hljs-attr">a</span>:<span class="hljs-number">10</span>,
  <span class="hljs-attr">b</span>:{
        <span class="hljs-attr">a</span>:<span class="hljs-number">12</span>,
        <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a); <span class="hljs-comment">//12</span>
        }
    }
}
o.b.fn();</code></pre><p><strong>&#x603B;&#x7ED3;&#xFF1A;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x6709;this&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6709;&#x88AB;&#x4E0A;&#x4E00;&#x7EA7;&#x7684;&#x5BF9;&#x8C61;&#x6240;&#x8C03;&#x7528;&#xFF0C;&#x90A3;&#x4E48;this&#x6307;&#x5411;&#x7684;&#x5C31;&#x662F;&#x4E0A;&#x4E00;&#x7EA7;&#x7684;&#x5BF9;&#x8C61;&#x3002;</strong></p><p>4&#xFF09;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var o = {
a:10,
b:{
    // a:12,
    fn:function(){
        console.log(this.a); //undefined
    }
   }
}
o.b.fn();
this&#x6307;&#x5411;b,&#x56E0;&#x4E3A;this&#x53EA;&#x4F1A;&#x6307;&#x5411;&#x5B83;&#x7684;&#x4E0A;&#x4E00;&#x7EA7;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x7BA1;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#x6709;&#x6CA1;&#x6709;this&#x8981;&#x7684;&#x4E1C;&#x897F;&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> o = {
<span class="hljs-attr">a</span>:<span class="hljs-number">10</span>,
<span class="hljs-attr">b</span>:{
    <span class="hljs-comment">// a:12,</span>
    fn:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a); <span class="hljs-comment">//undefined</span>
    }
   }
}
o.b.fn();
<span class="hljs-keyword">this</span>&#x6307;&#x5411;b,&#x56E0;&#x4E3A;<span class="hljs-keyword">this</span>&#x53EA;&#x4F1A;&#x6307;&#x5411;&#x5B83;&#x7684;&#x4E0A;&#x4E00;&#x7EA7;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x7BA1;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#x6709;&#x6CA1;&#x6709;<span class="hljs-keyword">this</span>&#x8981;&#x7684;&#x4E1C;&#x897F;&#x3002;

</code></pre><p>5&#xFF09;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7279;&#x6B8A;&#x60C5;&#x51B5;
var o = {
a:10,
b:{
    a:12,
    fn:function(){
        console.log(this.a); //undefined
        console.log(this); //window
    }
}
}
var j = o.b.fn;
j();

&#x8FD9;&#x91CC;this&#x6307;&#x5411;&#x7684;&#x662F;window&#xFF0C;&#xFF0C;this&#x6C38;&#x8FDC;&#x6307;&#x5411;&#x7684;&#x662F;&#x6700;&#x540E;&#x8C03;&#x7528;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x770B;&#x5B83;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x662F;&#x8C01;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x4F8B;&#x5B50;4&#x4E2D;&#x867D;&#x7136;&#x51FD;&#x6570;fn&#x662F;&#x88AB;&#x5BF9;&#x8C61;b&#x6240;&#x5F15;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5C06;fn&#x8D4B;&#x503C;&#x7ED9;&#x53D8;&#x91CF;j&#x7684;&#x65F6;&#x5019;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x6307;&#x5411;&#x7684;&#x662F;window&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x7279;&#x6B8A;&#x60C5;&#x51B5;
<span class="hljs-keyword">var</span> o = {
<span class="hljs-attr">a</span>:<span class="hljs-number">10</span>,
<span class="hljs-attr">b</span>:{
    <span class="hljs-attr">a</span>:<span class="hljs-number">12</span>,
    <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a); <span class="hljs-comment">//undefined</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//window</span>
    }
}
}
<span class="hljs-keyword">var</span> j = o.b.fn;
j();

&#x8FD9;&#x91CC;<span class="hljs-keyword">this</span>&#x6307;&#x5411;&#x7684;&#x662F;<span class="hljs-built_in">window</span>&#xFF0C;&#xFF0C;<span class="hljs-keyword">this</span>&#x6C38;&#x8FDC;&#x6307;&#x5411;&#x7684;&#x662F;&#x6700;&#x540E;&#x8C03;&#x7528;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x770B;&#x5B83;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x662F;&#x8C01;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x4F8B;&#x5B50;<span class="hljs-number">4</span>&#x4E2D;&#x867D;&#x7136;&#x51FD;&#x6570;fn&#x662F;&#x88AB;&#x5BF9;&#x8C61;b&#x6240;&#x5F15;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5C06;fn&#x8D4B;&#x503C;&#x7ED9;&#x53D8;&#x91CF;j&#x7684;&#x65F6;&#x5019;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x6307;&#x5411;&#x7684;&#x662F;<span class="hljs-built_in">window</span>&#x3002;
</code></pre><p>4.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;this
function Fn(){
this.user = &quot;&#x674E;&#x94A2;&#x94C1;&quot;;
    }
var a = new Fn();
console.log(a.user); //&#x674E;&#x94A2;&#x94C1;
&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;a
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;<span class="hljs-keyword">this</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">this</span>.user = <span class="hljs-string">&quot;&#x674E;&#x94A2;&#x94C1;&quot;</span>;
    }
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> Fn();
<span class="hljs-built_in">console</span>.log(a.user); <span class="hljs-comment">//&#x674E;&#x94A2;&#x94C1;</span>
&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;a
</code></pre><p>&#x5F53;this&#x9047;&#x5230;return&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;this&#x6307;&#x5411;&#x7684;&#x5C31;&#x662F;&#x90A3;&#x4E2A;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x679C;&#x8FD4;&#x56DE;&#x503C;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x90A3;&#x4E48;this&#x8FD8;&#x662F;&#x6307;&#x5411;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn()  
{  
    this.user = &apos;&#x674E;&#x94A2;&#x94C1;&apos;;  
    return undefined;
}
var a = new fn;  
console.log(a); 
//fn {user: &quot;&#x674E;&#x94A2;&#x94C1;&quot;}

    function fn()  
{  
    this.user = &apos;&#x674E;&#x94A2;&#x94C1;&apos;;  
    return 1;
}
var a = new fn;  
console.log(a.user); 
//&#x674E;&#x94A2;&#x94C1;

&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF1A;&#x867D;&#x7136;null&#x4E5F;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x8FD9;&#x91CC;this&#x8FD8;&#x662F;&#x6307;&#x5411;&#x90A3;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x4E3A;null&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#x3002;
function fn()  
{  
    this.user = &apos;&#x674E;&#x94A2;&#x94C1;&apos;;  
    return null;
}
var a = new fn;  
console.log(a.user); //&#x674E;&#x94A2;&#x94C1;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)  
</span>{  
    <span class="hljs-keyword">this</span>.user = <span class="hljs-string">&apos;&#x674E;&#x94A2;&#x94C1;&apos;</span>;  
    <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
}
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> fn;  
<span class="hljs-built_in">console</span>.log(a); 
<span class="hljs-comment">//fn {user: &quot;&#x674E;&#x94A2;&#x94C1;&quot;}</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)  
</span>{  
    <span class="hljs-keyword">this</span>.user = <span class="hljs-string">&apos;&#x674E;&#x94A2;&#x94C1;&apos;</span>;  
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> fn;  
<span class="hljs-built_in">console</span>.log(a.user); 
<span class="hljs-comment">//&#x674E;&#x94A2;&#x94C1;</span>

&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF1A;&#x867D;&#x7136;<span class="hljs-literal">null</span>&#x4E5F;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x8FD9;&#x91CC;<span class="hljs-keyword">this</span>&#x8FD8;&#x662F;&#x6307;&#x5411;&#x90A3;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x4E3A;<span class="hljs-literal">null</span>&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#x3002;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)  
</span>{  
    <span class="hljs-keyword">this</span>.user = <span class="hljs-string">&apos;&#x674E;&#x94A2;&#x94C1;&apos;</span>;  
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> fn;  
<span class="hljs-built_in">console</span>.log(a.user); <span class="hljs-comment">//&#x674E;&#x94A2;&#x94C1;</span>
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
setTimeout与console.log()执行顺序，局部变量和全局变量，var变量提升，this指向, 看不懂你来打我

## 原文链接
[https://segmentfault.com/a/1190000016615517](https://segmentfault.com/a/1190000016615517)


---
title: '关于VUE响应式数据的最佳解释' 
date: 2018-11-19 2:32:04
hidden: true
slug: tnvns4ov3m
categories: [reprint]
---

{{< raw >}}
<p>&#x8BB8;&#x591A;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF08;&#x5982;Angular,React,Vue&#xFF09;&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5F15;&#x64CE;&#x3002;&#x901A;&#x8FC7;&#x7406;&#x89E3;&#x5982;&#x4F55;&#x54CD;&#x5E94;&#xFF0C;&#x63D0;&#x8BAE;&#x63D0;&#x5347;&#x4F60;&#x7684;&#x5F00;&#x53D1;&#x80FD;&#x529B;&#x5E76;&#x80FD;&#x591F;&#x66F4;&#x9AD8;&#x6548;&#x5730;&#x4F7F;&#x7528;JS&#x6846;&#x67B6;&#x3002;&#x672C;&#x6587;&#x4E2D;&#x6784;&#x5EFA;&#x7684;&#x54CD;&#x5E94;&#x903B;&#x8F91;&#x4E0E;Vue&#x7684;&#x6E90;&#x7801;&#x662F;&#x4E00;&#x6BDB;&#x4E00;&#x6837;&#x7684;&#xFF01;</p><h1 id="articleHeader0">&#x54CD;&#x5E94;&#x7CFB;&#x7EDF;</h1><p>&#x521D;&#x89C1;&#x65F6;&#xFF0C;&#x4F60;&#x4F1A;&#x60CA;&#x8BB6;&#x4E0E;Vue&#x7684;&#x54CD;&#x5E94;&#x7CFB;&#x7EDF;&#x3002;&#x770B;&#x770B;&#x4EE5;&#x4E0B;&#x9762;&#x8FD9;&#x4E9B;&#x7B80;&#x5355;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;div&gt;Price:$"{{"price"}}"&lt;/div&gt;
    &lt;div&gt;Total:$"{{"price*quantity"}}"&lt;/div&gt;
    &lt;div&gt;Taxes:$"{{"totalPriceWithTax"}}"&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Price:$</span><span class="hljs-template-variable">"{{"price"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Total:$</span><span class="hljs-template-variable">"{{"price*quantity"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Taxes:$</span><span class="hljs-template-variable">"{{"totalPriceWithTax"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdn.jsdeliver.net/npm/vue&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    var vm = new Vue({
        el: &apos;#app&apos;,
        data: {
            price: 5.00,
            quantity: 2,
        },
        computed: {
            totalPriceWithTax(){
                return this.price * this.quantity * 1.03
            }
        }
    })
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdeliver.net/npm/vue&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">&apos;#app&apos;</span>,
        data: {
            price: <span class="hljs-number">5.00</span>,
            quantity: <span class="hljs-number">2</span>,
        },
        computed: {
            totalPriceWithTax(){
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.price * <span class="hljs-keyword">this</span>.quantity * <span class="hljs-number">1.03</span>
            }
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><ul><li>&#x66F4;&#x65B0;&#x9875;&#x9762;&#x4E0A;&#x7684;<code>price</code></li><li>&#x91CD;&#x65B0;&#x8BA1;&#x7B97;<code>price</code>&#x4E0E;<code>quantity</code>&#x7684;&#x4E58;&#x79EF;&#xFF0C;&#x66F4;&#x65B0;&#x9875;&#x9762;</li><li>&#x8C03;&#x7528;<code>totalPriceWithTax</code>&#x51FD;&#x6570;&#x5E76;&#x66F4;&#x65B0;&#x9875;&#x9762;</li></ul><p>&#x7B49;&#x7B49;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x7591;&#x60D1;&#x4E3A;&#x4F55;Vue&#x77E5;&#x9053;<code>price</code>&#x53D8;&#x5316;&#x4E86;&#xFF0C;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x8DDF;&#x8E2A;&#x6240;&#x6709;&#x7684;&#x53D8;&#x5316;&#xFF1F;</p><h2 id="articleHeader1">&#x8FD9;&#x5E76;&#x975E;&#x65E5;&#x5E38;&#x7684;JS&#x7F16;&#x7A0B;&#x4F1A;&#x7528;&#x5230;&#x7684;</h2><p>&#x5982;&#x679C;&#x4F60;&#x7591;&#x60D1;&#xFF0C;&#x90A3;&#x4E48;&#x6700;&#x5927;&#x7684;&#x95EE;&#x9898;&#x662F;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x901A;&#x5E38;&#x4E0D;&#x6D89;&#x53CA;&#x8FD9;&#x4E9B;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x8FD0;&#x884C;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbevKM?w=1376&amp;h=688" src="https://static.alili.tech/img/bVbevKM?w=1376&amp;h=688" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let price = 5
let quantity = 2
let total = price *quantity
price = 20
console.log(`total is ${total}`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">price</span> = <span class="hljs-number">5</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">quantity</span> = <span class="hljs-number">2</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">total</span> = price *quantity
<span class="hljs-attr">price</span> = <span class="hljs-number">20</span>
console.log(`total is ${total}`)</code></pre><p>&#x5373;&#x4FBF;&#x6211;&#x4EEC;&#x4ECE;&#x672A;&#x4F7F;&#x7528;&#x8FC7;Vue&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x80FD;&#x77E5;&#x9053;&#x4F1A;&#x8F93;&#x51FA;10&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt;&gt; total is 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ruby"><code style="word-break:break-word;white-space:initial"><span class="hljs-meta">&gt;&gt;</span> total is <span class="hljs-number">10</span></code></pre><p>&#x66F4;&#x8FDB;&#x4E00;&#x6B65;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x5728;price&#x548C;quantity&#x66F4;&#x65B0;&#x65F6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="total is 40" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code style="word-break:break-word;white-space:initial">total <span class="hljs-keyword">is</span> <span class="hljs-number">40</span></code></pre><p>&#x9057;&#x61BE;&#x7684;&#x662F;&#xFF0C;JS&#x662F;&#x4E00;&#x4E2A;&#x7A0B;&#x5E8F;&#xFF0C;&#x770B;&#x7740;&#x5B83;&#x5B83;&#x4E5F;&#x4E0D;&#x4F1A;&#x53D8;&#x6210;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x3002;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x9700;&#x8981;coding</p><h1 id="articleHeader2"><code>&#x96BE;&#x9898;</code></h1><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B58;&#x50A8;&#x8BA1;&#x7B97;&#x7684;<code>total</code>&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;<code>price</code>&#x6216;<code>quantity</code>&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8FD0;&#x884C;&#x3002;</p><h1 id="articleHeader3"><em>&#x89E3;&#x51B3;</em></h1><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x544A;&#x77E5;&#x5E94;&#x7528;&#x201C;&#x4E0B;&#x9762;&#x6211;&#x8981;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x5148;&#x4FDD;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x6211;&#x53EF;&#x80FD;&#x5728;&#x522B;&#x7684;&#x65F6;&#x95F4;&#x8FD8;&#x8981;&#x8FD0;&#x884C;&#xFF01;&#x201D;&#x4E4B;&#x540E;&#x4F46;&#x6211;&#x4EEC;&#x66F4;&#x65B0;&#x4EE3;&#x7801;&#x4E2D;<code>price</code>&#x6216;<code>quantity</code>&#x7684;&#x503C;&#x65F6;&#xFF0C;&#x4E4B;&#x524D;&#x5B58;&#x50A8;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x88AB;&#x518D;&#x6B21;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// save code

let total = price * quantity

// run code

// later on rung store code again" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code><span class="hljs-comment">// save code</span>

<span class="hljs-keyword">let</span> total = price * quantity

<span class="hljs-comment">// run code</span>

<span class="hljs-comment">// later on rung store code again</span></code></pre><p>&#x6240;&#x4EE5;&#x901A;&#x8FC7;&#x8BB0;&#x5F55;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x53D8;&#x91CF;&#x6539;&#x53D8;&#x65F6;&#x591A;&#x6B21;&#x8FD0;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let price = 5
let quantity = 2
let total = 0
let target = null
target = function(){
    total = price * quantity
}
record() // &#x7A0D;&#x540E;&#x6267;&#x884C;
target()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">price</span> = <span class="hljs-number">5</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">quantity</span> = <span class="hljs-number">2</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">total</span> = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">target</span> = <span class="hljs-literal">null</span>
<span class="hljs-attr">target</span> = function(){
    <span class="hljs-attr">total</span> = price * quantity
}
record() // &#x7A0D;&#x540E;&#x6267;&#x884C;
target()</code></pre><p>&#x6CE8;&#x610F;<code>target</code>&#x5B58;&#x50A8;&#x4E86;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x8FC7;&#x5982;&#x679C;&#x4F7F;&#x7528;ES6&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8BED;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target = () =&gt; {
    total = price * quantity
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-function"><span class="hljs-title">target</span> = <span class="hljs-params">()</span> =&gt;</span> {
    total = price * quantity
}</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x518D;&#x7B80;&#x5355;&#x6EF4;&#x5B9A;&#x4E49;&#x4E00;&#x4E0B;<code>record</code>&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let storage = [] //&#x5728;starage &#x4E2D;&#x5B58;&#x653E;target&#x51FD;&#x6570;
function record(){
    storage.push(target)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> storage = [] <span class="hljs-comment">//&#x5728;starage &#x4E2D;&#x5B58;&#x653E;target&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">record</span>(<span class="hljs-params"></span>)</span>{
    storage.push(target)
}</code></pre><p>&#x6211;&#x4EEC;&#x5B58;&#x50A8;&#x4E86;target&#xFF08;&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#x4E2D;&#x5C31;&#x662F;{ total = price * quantity }&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7A0D;&#x540E;&#x4F1A;&#x7528;&#x5230;&#x5B83;&#xFF0C;&#x90A3;&#x65F6;&#x4F7F;&#x7528;target&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#x6211;&#x4EEC;&#x8BB0;&#x5F55;&#x7684;&#x6240;&#x6709;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function target(){
    storage.forEach(run =&gt; run())
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">target</span>(<span class="hljs-params"></span>)</span>{
    storage.forEach(<span class="hljs-function"><span class="hljs-params">run</span> =&gt;</span> run())
}</code></pre><p>&#x904D;&#x5386;storage&#x6267;&#x884C;&#x5176;&#x4E2D;&#x5B58;&#x50A8;&#x7684;&#x6240;&#x6709;&#x7684;&#x533F;&#x540D;&#x51FD;&#x6570;&#x3002;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="price = 20
console.log(total)  //  =&gt; 10
replay()
console.log(total)  //  =&gt; 40
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>price = 20
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>)  <span class="hljs-comment">//  =&gt; 10</span>
<span class="hljs-built_in">replay</span>()
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>)  <span class="hljs-comment">//  =&gt; 40</span>
</code></pre><p>&#x8DB3;&#x591F;&#x7B80;&#x5355;&#x5427;&#xFF01;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x770B;&#x770B;&#x76EE;&#x524D;&#x9636;&#x6BB5;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8BF7;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let price = 5
let quantity = 2
let quantity = 0
let target = null
let storage = []
function record () {
    storage.push(target)
}
function replay() {
    storage.forEach(run =&gt; run())
}
target = () =&gt; {
    total = price * quantity
}
record()
target()


price = 20
console.log(total)  // =&gt; 10
replay()
console.log(total)  // =&gt; 40" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> price = <span class="hljs-number">5</span>
<span class="hljs-keyword">let</span> quantity = <span class="hljs-number">2</span>
<span class="hljs-keyword">let</span> quantity = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> target = <span class="hljs-literal">null</span>
<span class="hljs-keyword">let</span> storage = []
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">record</span> (<span class="hljs-params"></span>) </span>{
    storage.push(target)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replay</span>(<span class="hljs-params"></span>) </span>{
    storage.forEach(<span class="hljs-function"><span class="hljs-params">run</span> =&gt;</span> run())
}
target = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    total = price * quantity
}
record()
target()


price = <span class="hljs-number">20</span>
<span class="hljs-built_in">console</span>.log(total)  <span class="hljs-comment">// =&gt; 10</span>
replay()
<span class="hljs-built_in">console</span>.log(total)  <span class="hljs-comment">// =&gt; 40</span></code></pre><h1 id="articleHeader4"><code>&#x96BE;&#x9898;</code></h1><p>&#x529F;&#x80FD;&#x867D;&#x7136;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x4EE3;&#x7801;&#x4F3C;&#x4E4E;&#x4E0D;&#x591F;&#x5065;&#x58EE;&#x3002;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x6765;&#x7EF4;&#x62A4;&#x76EE;&#x6807;&#x5217;&#x8868;&#xFF0C;&#x5728;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x65F6;&#x6765;&#x901A;&#x77E5;&#x6267;&#x884C;&#x3002;</p><h1 id="articleHeader5"><em>&#x89E3;&#x51B3;</em></h1><p>&#x901A;&#x8FC7;&#x5C06;&#x6240;&#x9700;&#x8981;&#x7684;&#x65B9;&#x6CD5;&#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x4F9D;&#x8D56;&#x7C7B;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x7C7B;&#x5B9E;&#x73B0;&#x6807;&#x51C6;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x3002;<br>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7C7B;&#x6765;&#x7BA1;&#x7406;&#x76F8;&#x5173;&#x4F9D;&#x8D56;&#xFF0C;&#xFF08;&#x8FD9;&#x5F88;&#x63A5;&#x8FD1;VUE&#x7684;&#x8868;&#x73B0;&#x65B9;&#x5F0F;&#xFF09;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dep {
    constructor(){
        this.subscribers = []
    }
    depend() {
        if(target &amp;&amp; !this.subscribers.includes(target)){
            this.subscribers.push(target)
        }
    }
    notify() {
        this.subscribers.forEach(sub =&gt; sub())
    }
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.subscribers = []
    }
    depend() {
        <span class="hljs-keyword">if</span>(target &amp;&amp; !<span class="hljs-keyword">this</span>.subscribers.includes(target)){
            <span class="hljs-keyword">this</span>.subscribers.push(target)
        }
    }
    notify() {
        <span class="hljs-keyword">this</span>.subscribers.forEach(sub =&gt; sub())
    }
    
}</code></pre><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x73B0;&#x5728;&#x533F;&#x540D;&#x51FD;&#x6570;&#x88AB;&#x50A8;&#x5B58;&#x5728;<code>subscribers</code>&#x800C;&#x4E0D;&#x662F;&#x539F;&#x6765;&#x7684;<code>storage</code>&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x73B0;&#x5728;&#x7684;&#x8BB0;&#x5F55;&#x51FD;&#x6570;&#x53EB;&#x505A;<code>depend</code>&#x800C;&#x4E0D;&#x662F;<code>record</code>&#xFF0C;&#x901A;&#x77E5;&#x51FD;&#x6570;&#x662F;<code>notify</code>&#x800C;&#x975E;<code>replay</code>&#x3002;&#x770B;&#x770B;&#x4ED6;&#x4EEC;&#x6267;&#x884C;&#x60C5;&#x51B5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dep = new Dep()
let price = 5
let quantity = 2
let quantity = 0
let target = () =&gt; {
    total = price * quantity
}
dep.depend()  //&#x5C06;target&#x6DFB;&#x52A0;&#x8FDB;subscribers
target()      //&#x6267;&#x884C;&#x83B7;&#x53D6;total


price = 20
console.log(total)  // =&gt; 10
dep.notify()
console.log(total)  // =&gt; 40" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()
<span class="hljs-keyword">let</span> price = <span class="hljs-number">5</span>
<span class="hljs-keyword">let</span> quantity = <span class="hljs-number">2</span>
<span class="hljs-keyword">let</span> quantity = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> target = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    total = price * quantity
}
dep.depend()  <span class="hljs-comment">//&#x5C06;target&#x6DFB;&#x52A0;&#x8FDB;subscribers</span>
target()      <span class="hljs-comment">//&#x6267;&#x884C;&#x83B7;&#x53D6;total</span>


price = <span class="hljs-number">20</span>
<span class="hljs-built_in">console</span>.log(total)  <span class="hljs-comment">// =&gt; 10</span>
dep.notify()
<span class="hljs-built_in">console</span>.log(total)  <span class="hljs-comment">// =&gt; 40</span></code></pre><p>&#x73B0;&#x5728;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x7528;&#x6027;&#x5DF2;&#x7ECF;&#x521D;&#x89C1;&#x7AEF;&#x502A;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6709;&#x4E00;&#x4EF6;&#x522B;&#x626D;&#x7684;&#x4E8B;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E0E;&#x6267;&#x884C;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x3002;</p><h1 id="articleHeader6"><code>&#x96BE;&#x9898;</code></h1><p>&#x4EE5;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x4E3A;&#x6BCF;&#x4E2A;&#x53D8;&#x91CF;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Dep&#x7C7B;&#xFF0C;&#x5BF9;&#x6B64;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;watcher&#x51FD;&#x6570;&#x6765;&#x76D1;&#x542C;&#x5E76;&#x66F4;&#x65B0;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x975E;&#x4F7F;&#x7528;&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let target = () =&gt; {
    total = price * quantity
}
dep.depend()  
target()      " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let target = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    total = price * quantity
}
dep.depend()  
target()      </code></pre><p>&#x671F;&#x671B;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x5E94;&#x8BE5;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watcher(() =&gt; {
    total = price * quantity
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>watcher(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    total = price * quantity
})</code></pre><h1 id="articleHeader7"><em>&#x89E3;&#x51B3;</em> &#x5B9E;&#x73B0;watcher&#x51FD;&#x6570;</h1><p>&#x5728;watcher&#x51FD;&#x6570;&#x4E2D;&#x6211;&#x4EEC;&#x505A;&#x4E86;&#x4E0B;&#x9762;&#x8FD9;&#x4E9B;&#x4E8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function watcher(myFunc){
    target = myFunc
    dep.depend() 
    target()
    target = null 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code><span class="hljs-function">function <span class="hljs-title">watcher</span><span class="hljs-params">(myFunc)</span></span>{
    <span class="hljs-keyword">target</span> = myFunc
    dep.depend() 
    <span class="hljs-keyword">target</span>()
    <span class="hljs-keyword">target</span> = <span class="hljs-keyword">null</span> 
}</code></pre><p>&#x5982;&#x4F60;&#x6240;&#x89C1;&#xFF0C;watcher&#x63A5;&#x53D7;&#x4E00;&#x4E2A;myFunc&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5C06;&#x5176;&#x8D4B;&#x503C;&#x7ED9;&#x5168;&#x5C40;&#x53D8;&#x91CF;target&#xFF0C;&#x5E76;&#x5C06;&#x5B83;&#x6DFB;&#x52A0;&#x5FAE;&#x8BA2;&#x9605;&#x8005;&#x3002;&#x5728;&#x6267;&#x884C;target&#x540E;&#xFF0C;&#x91CD;&#x7F6E;target&#x4E3A;&#x4E0B;&#x4E00;&#x8F6E;&#x505A;&#x51C6;&#x5907;&#xFF01;<br>&#x73B0;&#x5728;&#x53EA;&#x9700;&#x8981;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="price = 20
console.log(total)  // =&gt; 10
dep.notify()
console.log(total)  // =&gt; 40
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>price = 20
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>)  <span class="hljs-comment">// =&gt; 10</span>
dep.notify()
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>)  <span class="hljs-comment">// =&gt; 40</span>
</code></pre><p>&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x7591;&#x60D1;&#x4E3A;&#x4EC0;&#x4E48;target&#x662F;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x800C;&#x975E;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x3002;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5728;&#x7ED3;&#x5C3E;&#x5904;&#x4F1A;&#x660E;&#x6717;&#x8D77;&#x6765;&#xFF01;</p><h1 id="articleHeader8"><code>&#x96BE;&#x9898;</code></h1><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x62E5;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Dep&#x7C7B;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x771F;&#x6B63;&#x60F3;&#x8981;&#x7684;&#x662F;&#x6BCF;&#x4E2A;&#x53D8;&#x91CF;&#x90FD;&#x80FD;&#x62E5;&#x6709;&#x4E00;&#x4E2A;&#x81EA;&#x5DF1;&#x7684;Dep&#x7C7B;&#x3002;&#x5148;&#x8BA9;&#x6211;&#x4EEC;&#x628A;&#x4E4B;&#x524D;&#x8BA8;&#x8BBA;&#x7684;&#x7279;&#x6027;&#x53D8;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5427;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = { price: 5,quantity: 2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haskell"><code style="word-break:break-word;white-space:initial"><span class="hljs-title">let</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = { <span class="hljs-title">price</span>: 5,<span class="hljs-title">quantity</span>: 2}</span></code></pre><p>&#x6211;&#x4EEC;&#x5148;&#x5047;&#x8BBE;&#xFF0C;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x7684;Dep&#x7C7B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbetkL?w=1368&amp;h=606" src="https://static.alili.tech/img/bVbetkL?w=1368&amp;h=606" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x8FD0;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watcher(() =&gt; {
    totla = data.price * data.quantity
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>watcher(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    totla = data.price * data.quantity
})</code></pre><p>&#x7531;&#x4E8E;total&#x9700;&#x8981;&#x4F9D;&#x8D56;price&#x548C;quantity&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x9700;&#x8981;&#x88AB;&#x5199;&#x5165;&#x4E24;&#x8005;&#x7684;subscriber&#x6570;&#x7EC4;&#x4E2D;&#xFF01;<br>&#x540C;&#x65F6;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x53C8;&#x6709;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x4F9D;&#x8D56;data.price&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x4EC5;&#x9700;&#x8981;&#x88AB;&#x6DFB;&#x52A0;&#x8FDB;price&#x7684;dep&#x7684;subscriber&#x6570;&#x7EC4;&#x4E2D;<br><span class="img-wrap"><img data-src="/img/bVbetlx?w=1376&amp;h=376" src="https://static.alili.tech/img/bVbetlx?w=1376&amp;h=376" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x4F46;&#x6211;&#x4EEC;&#x6539;&#x53D8;price&#x7684;&#x503C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x671F;&#x5F85;dep.notify()&#x88AB;&#x6267;&#x884C;&#x3002;&#x5728;&#x6587;&#x7AE0;&#x7684;&#x6700;&#x672B;&#xFF0C;&#x6211;&#x4EEC;&#x671F;&#x5F85;&#x80FD;&#x591F;&#x6709;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x7684;&#x8F93;&#x51FA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt;&gt; total
10
&gt;&gt; price =20
&gt;&gt; total
40
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ruby"><code><span class="hljs-meta">&gt;&gt;</span> total
<span class="hljs-number">10</span>
<span class="hljs-meta">&gt;&gt;</span> price =<span class="hljs-number">20</span>
<span class="hljs-meta">&gt;&gt;</span> total
<span class="hljs-number">40</span>
</code></pre><p>&#x6240;&#x4EE5;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x53BB;&#x6302;&#x8F7D;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#xFF08;&#x5982;quantity&#x548C;price&#xFF09;&#x3002;&#x8FD9;&#x6837;&#x5F53;&#x5176;&#x6539;&#x53D8;&#x65F6;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;subscriber&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x3002;</p><h1 id="articleHeader9"><em>&#x89E3;&#x51B3;</em> Object.defineProperty()</h1><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E86;&#x89E3;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty&#x51FD;&#x6570;</a><br>ES5&#x79CD;&#x63D0;&#x51FA;&#x7684;&#xFF0C;&#x4ED6;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x4E3A;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x5B9A;&#x4E49;getter&#x4E0E;setter&#x51FD;&#x6570;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x548C;Dep&#x7ED3;&#x5408;&#x524D;&#xFF0C;&#x6211;&#x5148;&#x4E3A;&#x4F60;&#x4EEC;&#x6F14;&#x793A;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x57FA;&#x7840;&#x7684;&#x7528;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = { price: 5,quantity: 2}
Object.defineProperty(data,&apos;price&apos;,{
    get(){
        console.log(`Getting price ${internalValue}`);
        return internalValue
    }
    set(newValue){
        console.log(`Setting price ${newValue}`);
        internalValue = newValue
    }
})
total = data.price * data.quantity  // &#x8C03;&#x7528;get
data.price = 20                      //  &#x8C03;&#x7528;set" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">data</span> = { price: <span class="hljs-number">5</span>,quantity: <span class="hljs-number">2</span>}
Object.defineProperty(<span class="hljs-built_in">data</span>,<span class="hljs-string">&apos;price&apos;</span>,{
    get(){
        console.<span class="hljs-keyword">log</span>(<span class="hljs-string">`Getting price ${internalValue}`</span>);
        <span class="hljs-keyword">return</span> internalValue
    }
    <span class="hljs-built_in">set</span>(newValue){
        console.<span class="hljs-keyword">log</span>(<span class="hljs-string">`Setting price ${newValue}`</span>);
        internalValue = newValue
    }
})
total = <span class="hljs-built_in">data</span>.price * <span class="hljs-built_in">data</span>.quantity  <span class="hljs-comment">// &#x8C03;&#x7528;get</span>
<span class="hljs-built_in">data</span>.price = <span class="hljs-number">20</span>                      <span class="hljs-comment">//  &#x8C03;&#x7528;set</span></code></pre><p>&#x73B0;&#x5728;&#x5F53;&#x6211;&#x4EEC;&#x83B7;&#x53D6;&#x5E76;&#x8BBE;&#x7F6E;&#x503C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x89E6;&#x53D1;&#x901A;&#x77E5;&#x3002;&#x901A;&#x8FC7;Object.keys(data)&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x952E;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x8FD0;&#x7528;&#x4E00;&#x4E9B;&#x9012;&#x5F52;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3A;&#x6570;&#x636E;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x9879;&#x8FD0;&#x884C;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = { price: 5,quantity: 2}
Object.keys(data).forEach((key) =&gt; {
    let internalValue = data[key]
    Object.defineProperty(data, key,{
        get(){
            console.log(`Getting ${key}:${internalValue}`);
            return internalValue
        }
        set(newValue){
            console.log(`Setting ${key} to ${newValue}`);
            internalValue = newValue
        }
    })
})
total = data.price * data.quantity  
data.price = 30     " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> data = { price: <span class="hljs-number">5</span>,quantity: <span class="hljs-number">2</span>}
<span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> internalValue = data[key]
    <span class="hljs-built_in">Object</span>.defineProperty(data, key,{
        <span class="hljs-keyword">get</span>(){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Getting <span class="hljs-subst">${key}</span>:<span class="hljs-subst">${internalValue}</span>`</span>);
            <span class="hljs-keyword">return</span> internalValue
        }
        <span class="hljs-keyword">set</span>(newValue){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Setting <span class="hljs-subst">${key}</span> to <span class="hljs-subst">${newValue}</span>`</span>);
            internalValue = newValue
        }
    })
})
total = data.price * data.quantity  
data.price = <span class="hljs-number">30</span>     </code></pre><p>&#x73B0;&#x5728;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x4E0A;&#x770B;&#x5230;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Getting price: 5
Getting quantity: 20
Setting price to 30" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>Getting <span class="hljs-string">price:</span> <span class="hljs-number">5</span>
Getting <span class="hljs-string">quantity:</span> <span class="hljs-number">20</span>
Setting price to <span class="hljs-number">30</span></code></pre><h1 id="articleHeader10">&#x6210;&#x4EB2;&#x4E86;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="total = data.price * data.quantity" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haskell"><code style="word-break:break-word;white-space:initial"><span class="hljs-title">total</span> = <span class="hljs-class"><span class="hljs-keyword">data</span>.price * <span class="hljs-keyword">data</span>.quantity</span></code></pre><p>&#x7C7B;&#x4F3C;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x540E;&#xFF0C;&#x83B7;&#x5F97;&#x4E86;price&#x7684;&#x503C;&#x3002;&#x6211;&#x4EEC;&#x8FD8;&#x671F;&#x671B;&#x80FD;&#x591F;&#x8BB0;&#x5F55;&#x8FD9;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x3002;&#x5F53;price&#x53D8;&#x5316;&#x6216;&#x4E8B;&#x88AB;&#x8D4B;&#x4E88;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x503C;&#xFF08;&#x8BD1;&#x8005;&#xFF1A;&#x611F;&#x89C9;&#x8FD9;&#x662F;&#x4E00;&#x56DE;&#x4E8B;&#xFF09;&#x8FD9;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x5C31;&#x4F1A;&#x88AB;&#x4FC3;&#x53D1;&#x3002;</p><p>Get =&gt; &#x8BB0;&#x4F4F;&#x8FD9;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x503C;&#x53D8;&#x5316;&#x65F6;&#x518D;&#x6B21;&#x6267;&#x884C;&#xFF01;<br>Set =&gt; &#x503C;&#x53D8;&#x4E86;&#xFF0C;&#x5FEB;&#x53BB;&#x6267;&#x884C;&#x521A;&#x624D;&#x8BB0;&#x4E0B;&#x7684;&#x533F;&#x540D;&#x51FD;&#x6570;</p><p>&#x5C31;Dep&#x800C;&#x8A00;&#xFF1A;<br>Price&#x88AB;&#x8BFB; =&gt; &#x8C03;&#x7528;dep.depend()&#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x76EE;&#x6807;&#x51FD;&#x6570;<br>Price&#x88AB;&#x5199; =&gt; &#x8C03;&#x7528;dep.notify()&#x53BB;&#x6267;&#x884C;&#x6240;&#x6709;&#x76EE;&#x6807;&#x51FD;&#x6570;</p><p>&#x597D;&#x7684;&#xFF0C;&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x5C06;&#x4ED6;&#x4EEC;&#x5408;&#x4F53;&#xFF0C;&#x5E76;&#x796D;&#x51FA;&#x6700;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = {price: 5,quantity: 2}
let target = null
class Dep {
    constructor(){
        this.subscribers = []
    }
    depend() {
        if(target &amp;&amp; !this.subscribers.includes(target)){
            this.subscribers.push(target)
        }
    }
    notify() {
        this.subscribers.forEach(sub =&gt; sub())
    }
}

Object.keys(data).forEach((key) =&gt; {
    let internalValue = data[key]
    const  dep = new Dep()
    Object.defineProperty(data, key,{
        get(){
            dep.depend()
            return internalValue
        }
        set(newValue){
            internalValue = newValue
            dep.notify()
        }
    })
})
function watcher(myFunc){
    target = myFunc
    target();
    target = null;
}
watch(() =&gt; {
    data.total = data.price * data.quantity
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> data = {price: <span class="hljs-number">5</span>,quantity: <span class="hljs-number">2</span>}
<span class="hljs-keyword">let</span> target = <span class="hljs-literal">null</span>
<span class="hljs-keyword">class</span> Dep {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>){
        <span class="hljs-keyword">this</span>.subscribers = []
    }
    depend() {
        <span class="hljs-keyword">if</span>(target &amp;&amp; !<span class="hljs-keyword">this</span>.subscribers.includes(target)){
            <span class="hljs-keyword">this</span>.subscribers.push(target)
        }
    }
    notify() {
        <span class="hljs-keyword">this</span>.subscribers.forEach(<span class="hljs-function"><span class="hljs-params">sub</span> =&gt;</span> sub())
    }
}

<span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> internalValue = data[key]
    <span class="hljs-keyword">const</span>  dep = <span class="hljs-keyword">new</span> Dep()
    <span class="hljs-built_in">Object</span>.defineProperty(data, key,{
        <span class="hljs-keyword">get</span>(){
            dep.depend()
            <span class="hljs-keyword">return</span> internalValue
        }
        <span class="hljs-keyword">set</span>(newValue){
            internalValue = newValue
            dep.notify()
        }
    })
})
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watcher</span>(<span class="hljs-params">myFunc</span>)</span>{
    target = myFunc
    target();
    target = <span class="hljs-literal">null</span>;
}
watch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    data.total = data.price * data.quantity
})</code></pre><p>&#x731C;&#x731C;&#x770B;&#x73B0;&#x5728;&#x4F1A;&#x53D1;&#x751F;&#x4EC0;&#x4E48;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt;&gt; data.total
10
&gt;&gt; data.price = 20
20
&gt;&gt; data.total
40
&gt;&gt; data.quantity = 3 
3
&gt;&gt; data.total
60" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ruby"><code><span class="hljs-meta">&gt;&gt;</span> data.total
<span class="hljs-number">10</span>
<span class="hljs-meta">&gt;&gt;</span> data.price = <span class="hljs-number">20</span>
<span class="hljs-number">20</span>
<span class="hljs-meta">&gt;&gt;</span> data.total
<span class="hljs-number">40</span>
<span class="hljs-meta">&gt;&gt;</span> data.quantity = <span class="hljs-number">3</span> 
<span class="hljs-number">3</span>
<span class="hljs-meta">&gt;&gt;</span> data.total
<span class="hljs-number">60</span></code></pre><p>&#x6B63;&#x5982;&#x6211;&#x4EEC;&#x6240;&#x671F;&#x5F85;&#x7684;&#x90A3;&#x6837;&#xFF0C;<code>price</code> &#x548C; <code>quantity</code>&#x73B0;&#x5728;&#x662F;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x4E86;&#xFF01;&#x5F53;<code>price</code> &#x548C; <code>quantity</code>&#x66F4;&#x8DDF;&#x65B0;&#x65F6;&#xFF0C;&#x88AB;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x6267;&#x884C;&#xFF01;<br>&#x73B0;&#x5728;&#x4F60;&#x5E94;&#x8BE5;&#x53EF;&#x4EE5;&#x7406;&#x89E3;Vue&#x6587;&#x6863;&#x4E2D;&#x7684;&#x8FD9;&#x5F20;&#x56FE;&#x7247;&#x4E86;&#x5427;&#xFF01;<br><span class="img-wrap"><img data-src="/img/bVbevJy?w=1372&amp;h=816" src="https://static.alili.tech/img/bVbevJy?w=1372&amp;h=816" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br>&#x770B;&#x5230;&#x56FE;&#x4E2D;&#x7D2B;&#x8272;&#x6570;&#x636E;&#x5708;<code>getter</code>&#x548C;<code>setter</code>&#x5417;&#xFF1F;&#x770B;&#x8D77;&#x6765;&#x5E94;&#x8BE5;&#x5F88;&#x719F;&#x6089;&#xFF01;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x4E00;&#x4E2A;watcher&#x5B9E;&#x4F8B;&#xFF08;&#x84DD;&#x8272;&#xFF09;&#xFF0C;&#x5B83;&#x4ECE;getter&#xFF08;&#x7EA2;&#x7EBF;&#xFF09;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#x9879;&#x3002;&#x7A0D;&#x540E;&#x8C03;&#x7528;setter&#x65F6;&#xFF0C;&#x5B83;&#x4F1A;&#x901A;&#x77E5;&#x89C2;&#x5BDF;&#x8005;&#x5BFC;&#x81F4;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x3002;&#x4E0B;&#x56FE;&#x662F;&#x4E00;&#x4E2A;&#x6211;&#x6CE8;&#x91CA;&#x540E;&#x7684;&#x7248;&#x672C;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbevKM?w=1376&amp;h=688" src="https://static.alili.tech/img/bVbevKM?w=1376&amp;h=688" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x867D;&#x7136;Vue&#x5B9E;&#x9645;&#x7684;&#x4EE3;&#x7801;&#x613F;&#x5F7C;&#x6B64;&#x590D;&#x6742;&#xFF0C;&#x4F46;&#x4F60;&#x73B0;&#x5728;&#x77E5;&#x9053;&#x4E86;&#x57FA;&#x672C;&#x7684;&#x5B9E;&#x73B0;&#x4E86;&#x3002;</p><h2 id="articleHeader11">&#x90A3;&#x4E48;&#x56DE;&#x987E;&#x4E00;&#x4E0B;</h2><ul><li>&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Dep&#x7C7B;&#x6765;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#x5E76;&#x91CD;&#x65B0;&#x8FD0;&#x884C;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#xFF08;notify&#xFF09;</li><li>watcher&#x51FD;&#x6570;&#x6765;&#x5C06;&#x9700;&#x8981;&#x76D1;&#x542C;&#x7684;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x6DFB;&#x52A0;&#x5230;<em>target</em></li><li>&#x4F7F;&#x7528;Object.defineProperty()&#x53BB;&#x521B;&#x5EFA;<code>getter</code>&#x548C;<code>setter</code></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于VUE响应式数据的最佳解释

## 原文链接
[https://segmentfault.com/a/1190000015812787](https://segmentfault.com/a/1190000015812787)


---
title: JavaScript：面试频繁出现的几个易错点
hidden: true
categories: [reprint]
slug: 140ddbed
date: 2018-10-25 09:08:15
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#xFF0C;&#x91D1;&#x4E09;&#x94F6;&#x56DB;&#xFF0C;&#x5F88;&#x591A;&#x4EBA;&#x9762;&#x8BD5;&#xFF0C;&#x5F88;&#x591A;&#x4EBA;&#x5206;&#x4EAB;&#x9762;&#x8BD5;&#x9898;&#x3002;&#x5728;&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#xFF0C;&#x6211;&#x4E5F;&#x4E34;&#x65F6;&#x62C5;&#x4EFB;&#x9762;&#x8BD5;&#x5B98;&#xFF0C;&#x4E3A;&#x4E86;&#x5927;&#x6982;&#x4E86;&#x89E3;&#x9762;&#x8BD5;&#x8005;&#x7684;&#x6C34;&#x5E73;&#xFF0C;&#x6211;&#x4E5F;&#x5199;&#x4E86;&#x4E00;&#x4EFD;&#x9898;&#x76EE;&#xFF0C;&#x9762;&#x8BD5;&#x4E86;&#x51E0;&#x4E2A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#x3002;&#x5728;&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#x91CC;&#x9762;&#xFF0C;&#x6211;&#x5728;&#x5B66;&#xFF0C;&#x5728;&#x5199;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x7684;&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#xFF0C;&#x60F3;&#x4E0D;&#x5230;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x7684;&#x8FD9;&#x4E9B;&#x77E5;&#x8BC6;&#xFF0C;&#x5C31;&#x662F;&#x9762;&#x8BD5;&#x9898;&#x91CC;&#x9762;&#xFF0C;&#x9891;&#x7E41;&#x8BA9;&#x4EBA;&#x6389;&#x5751;&#x7684;&#x8003;&#x70B9;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x4ECA;&#x5929;&#x5C31;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF0C;&#x90A3;&#x4E9B;&#x8BA9;&#x4EBA;&#x6389;&#x5751;&#x7684;&#x8003;&#x70B9;&#x3002;</p><h2 id="articleHeader1">2.&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;</h2><blockquote>&#x5173;&#x4E8E;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x548C;&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x4E24;&#x8005;&#x4E0D;&#x662F;&#x7EDD;&#x5BF9;&#x72EC;&#x7ACB;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x76F8;&#x4E92;&#x76F8;&#x6210;&#x7684;&#x5173;&#x7CFB;&#x3002;&#x81F3;&#x4E8E;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x7528;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x7528;&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#xFF0C;&#x5177;&#x4F53;&#x60C5;&#x51B5;&#xFF0C;&#x5177;&#x4F53;&#x5206;&#x6790;&#x3002;</blockquote><p>&#x9488;&#x5BF9;&#x4E8E;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&#x7684;&#x3002;&#x77E5;&#x4E4E;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x9AD8;&#x8D5E;&#x56DE;&#x7B54;&#xFF1A;</p><p>&#x9762;&#x5411;&#x5BF9;&#x8C61;&#xFF1A; &#x72D7;.&#x5403;(&#x5C4E;)<br>&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#xFF1A; &#x5403;.(&#x72D7;,&#x5C4E;)</p><p>&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x89C9;&#x5F97;&#x4E0D;&#x592A;&#x4F18;&#x96C5;&#xFF0C;&#x6211;&#x6539;&#x4E00;&#x4E0B;&#x4E86;&#xFF0C;&#x4E3E;&#x4E00;&#x4E2A;&#x4F18;&#x96C5;&#x4E9B;&#x7684;&#x5C0F;&#x4F8B;&#x5B50;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x548C;&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#x7684;&#x533A;&#x522B;&#x3002;</p><p>&#x9700;&#x6C42;&#xFF1A;&#x5B9A;&#x4E49;&#x2018;<strong>&#x5B88;&#x5019;&#x5403;&#x706B;&#x9505;</strong>&#x2019;</p><p>&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x601D;&#x60F3;&#x662F;&#xFF1A;<strong>&#x5B88;&#x5019;.&#x52A8;&#x4F5C;(&#x5403;&#x706B;&#x9505;)</strong></p><p>&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#x7684;&#x601D;&#x60F3;&#x662F;&#xFF1A;<strong>&#x52A8;&#x4F5C;(&#x5B88;&#x5019;,&#x5403;&#x706B;&#x9505;)</strong></p><p>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x65B9;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x9762;&#x5411;&#x5BF9;&#x8C61;
//&#x5B9A;&#x4E49;&#x4EBA;&#xFF08;&#x59D3;&#x540D;&#xFF09;
let People=function(name){
    this.name=name;
}
//&#x52A8;&#x4F5C;
People.prototype={
    eat:function(someThing){
        console.log(`${this.name}&#x5403;${someThing}`);
    }
}
//&#x5B88;&#x5019;&#x662F;&#x4E2A;&#x4EBA;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EBA;(new&#x4E00;&#x6B21;People)
let shouhou=new People(&apos;&#x5B88;&#x5019;&apos;,&apos;&#x7537;&apos;,24);
shouhou.eat(&apos;&#x706B;&#x9505;&apos;);

//&#x9762;&#x5411;&#x8FC7;&#x7A0B;
let eat=function(who,someThing){
    console.log(`${who}&#x5403;${someThing}`);
}
eat(&apos;&#x5B88;&#x5019;&apos;,&apos;&#x706B;&#x9505;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x9762;&#x5411;&#x5BF9;&#x8C61;</span>
<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x4EBA;&#xFF08;&#x59D3;&#x540D;&#xFF09;</span>
<span class="hljs-keyword">let</span> People=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name=name;
}
<span class="hljs-comment">//&#x52A8;&#x4F5C;</span>
People.prototype={
    <span class="hljs-attr">eat</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">someThing</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>&#x5403;<span class="hljs-subst">${someThing}</span>`</span>);
    }
}
<span class="hljs-comment">//&#x5B88;&#x5019;&#x662F;&#x4E2A;&#x4EBA;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EBA;(new&#x4E00;&#x6B21;People)</span>
<span class="hljs-keyword">let</span> shouhou=<span class="hljs-keyword">new</span> People(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>,<span class="hljs-string">&apos;&#x7537;&apos;</span>,<span class="hljs-number">24</span>);
shouhou.eat(<span class="hljs-string">&apos;&#x706B;&#x9505;&apos;</span>);

<span class="hljs-comment">//&#x9762;&#x5411;&#x8FC7;&#x7A0B;</span>
<span class="hljs-keyword">let</span> eat=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">who,someThing</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${who}</span>&#x5403;<span class="hljs-subst">${someThing}</span>`</span>);
}
eat(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>,<span class="hljs-string">&apos;&#x706B;&#x9505;&apos;</span>);</code></pre><p>&#x7ED3;&#x679C;&#x90FD;&#x4E00;&#x6837;&#xFF0C;&#x90FD;&#x662F;&#x8F93;&#x51FA;&#x2018;&#x5B88;&#x5019;&#x5403;&#x706B;&#x9505;&#x2019;&#x3002;&#x4F46;&#x662F;&#x4E07;&#x4E00;&#x6211;&#x73B0;&#x5728;&#x5403;&#x9971;&#x4E86;&#xFF0C;&#x51C6;&#x5907;&#x5199;&#x4EE3;&#x7801;&#x4E86;&#x3002;&#x8FD9;&#x4E0B;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x770B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x9762;&#x5411;&#x5BF9;&#x8C61;
shouhou.coding=function(){
    console.log(this.name+&apos;&#x5199;&#x4EE3;&#x7801;&apos;);
}
shouhou.coding();
//&#x9762;&#x5411;&#x8FC7;&#x7A0B;
let coding=function(who){
    console.log(who+&apos;&#x5199;&#x4EE3;&#x7801;&apos;);
}
coding(&apos;&#x5B88;&#x5019;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x9762;&#x5411;&#x5BF9;&#x8C61;</span>
shouhou.coding=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">&apos;&#x5199;&#x4EE3;&#x7801;&apos;</span>);
}
shouhou.coding();
<span class="hljs-comment">//&#x9762;&#x5411;&#x8FC7;&#x7A0B;</span>
<span class="hljs-keyword">let</span> coding=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">who</span>)</span>{
    <span class="hljs-built_in">console</span>.log(who+<span class="hljs-string">&apos;&#x5199;&#x4EE3;&#x7801;&apos;</span>);
}
coding(<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>);</code></pre><p>&#x7ED3;&#x679C;&#x4E5F;&#x4E00;&#x6837;&#xFF1A;&#x2018;&#x5B88;&#x5019;&#x5199;&#x4EE3;&#x7801;&#x2019;</p><p>&#x4F46;&#x662F;&#x4E0D;&#x96BE;&#x53D1;&#x73B0;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x66F4;&#x52A0;&#x7684;&#x7075;&#x6D3B;&#xFF0C;&#x590D;&#x7528;&#x6027;&#x548C;&#x6269;&#x5C55;&#x6027;&#x66F4;&#x52A0;&#x3002;&#x56E0;&#x4E3A;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x9488;&#x5BF9;&#x5BF9;&#x8C61;&#xFF08;&#x4F8B;&#x5B50;&#x4E2D;&#x7684;&#xFF1A;&#x2018;&#x5B88;&#x5019;&#x2019;&#xFF09;&#x6765;&#x8FDB;&#x884C;&#x6267;&#x884C;&#x67D0;&#x4E9B;&#x52A8;&#x4F5C;&#x3002;&#x8FD9;&#x4E9B;&#x52A8;&#x4F5C;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x6269;&#x5C55;&#x3002;<br>&#x800C;&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#x662F;&#x5B9A;&#x4E49;&#x5F88;&#x591A;&#x7684;&#x52A8;&#x4F5C;&#xFF0C;&#x6765;&#x6307;&#x5B9A;&#x8C01;&#x6765;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x52A8;&#x4F5C;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x7B80;&#x5355;&#x8BF4;&#x660E;&#x5C31;&#x5230;&#x8FD9;&#x91CC;&#x4E86;&#xFF0C;&#x81F3;&#x4E8E;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x4E09;&#x5927;&#x7279;&#x6027;&#xFF1A;&#x7EE7;&#x627F;&#xFF0C;&#x5C01;&#x88C5;&#xFF0C;&#x591A;&#x6001;&#x8FD9;&#x4E2A;&#x81EA;&#x884C;&#x4E0A;&#x7F51;&#x67E5;&#x627E;&#x8D44;&#x6599;&#x3002;</p><h2 id="articleHeader2">3.this</h2><p>&#x4F7F;&#x7528; JavaScript &#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F88;&#x591A;&#x5F00;&#x53D1;&#x8005;&#x591A;&#x591A;&#x5C11;&#x5C11;&#x4F1A;&#x88AB; <code>this</code> &#x7684;&#x6307;&#x5411;&#x641E;&#x8499;&#x5708;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x5173;&#x4E8E; <code>this</code> &#x7684;&#x6307;&#x5411;&#xFF0C;&#x8BB0;&#x4F4F;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x4E00;&#x53E5;&#x8BDD;&#xFF1A;<strong>&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x7684;this&#x6307;&#x5411;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</strong></p><p>&#x4E0B;&#x9762;&#x5206;&#x51E0;&#x79CD;&#x60C5;&#x51B5;&#x8C08;&#x8BBA;&#x4E0B;</p><h3 id="articleHeader3">3-1.&#x666E;&#x901A;&#x51FD;&#x6570;&#x8C03;&#x7528;</h3><p>&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#x6CA1;&#x7279;&#x6B8A;&#x610F;&#x5916;&#xFF0C;&#x5C31;&#x662F;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;-window&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let username=&apos;&#x5B88;&#x5019;&apos;
function fn(){
    alert(this.username);//undefined
}
fn();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> username=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.username);<span class="hljs-comment">//undefined</span>
}
fn();</code></pre><p>&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x4F1A;&#x56F0;&#x60D1;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x662F;&#x8F93;&#x51FA;<code>&#x5B88;&#x5019;</code>&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x7EC6;&#x770B;&#x4E00;&#x770B;&#xFF0C;&#x6211;&#x58F0;&#x660E;&#x7684;&#x65B9;&#x5F0F;&#x662F;<code>let</code>&#xFF0C;&#x4E0D;&#x4F1A;&#x662F;<code>window</code>&#x5BF9;&#x8C61;<br>&#x5982;&#x679C;&#x8F93;&#x51FA;&#x5B88;&#x5019;&#xFF0C;&#x8981;&#x8FD9;&#x6837;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var username=&apos;&#x5B88;&#x5019;&apos;
function fn(){
    alert(this.username);//&#x5B88;&#x5019;
}
fn();
//---------------
window.username=&apos;&#x5B88;&#x5019;&apos;
function fn(){
    alert(this.username);//&#x5B88;&#x5019;
}
fn();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> username=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.username);<span class="hljs-comment">//&#x5B88;&#x5019;</span>
}
fn();
<span class="hljs-comment">//---------------</span>
<span class="hljs-built_in">window</span>.username=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-keyword">this</span>.username);<span class="hljs-comment">//&#x5B88;&#x5019;</span>
}
fn();</code></pre><h3 id="articleHeader4">3-2.&#x5BF9;&#x8C61;&#x51FD;&#x6570;&#x8C03;&#x7528;</h3><p>&#x8FD9;&#x4E2A;&#x76F8;&#x4FE1;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x5C31;&#x662F;&#x90A3;&#x4E2A;&#x51FD;&#x6570;&#x8C03;&#x7528;&#xFF0C;this&#x6307;&#x5411;&#x54EA;&#x91CC;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.b=2222
let obj={
    a:111,
    fn:function(){
        alert(this.a);//111
        alert(this.b);//undefined
    }
}
obj.fn();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.b=<span class="hljs-number">2222</span>
<span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">a</span>:<span class="hljs-number">111</span>,
    <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.a);<span class="hljs-comment">//111</span>
        alert(<span class="hljs-keyword">this</span>.b);<span class="hljs-comment">//undefined</span>
    }
}
obj.fn();</code></pre><p>&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x5C31;&#x662F;&#x8F93;&#x51FA;<code>obj.a</code>&#xFF0C;&#x5C31;&#x662F;111&#x3002;&#x800C;&#x7B2C;&#x4E8C;&#x6B21;&#xFF0C;<code>obj</code>&#x6CA1;&#x6709;<code>b</code>&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x8F93;&#x51FA;<code>undefined</code>&#xFF0C;&#x56E0;&#x4E3A;<code>this</code>&#x6307;&#x5411;<code>obj</code>&#x3002;</p><p>&#x4F46;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#x5F97;&#x6CE8;&#x610F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj1.fn=obj2.fn;
obj1.fn();//222" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> obj1={
    a:<span class="hljs-number">222</span>
};
<span class="hljs-keyword">let</span> obj2={
    a:<span class="hljs-number">111</span>,
    <span class="hljs-function"><span class="hljs-keyword">fn</span>:function<span class="hljs-params">()</span>{
        alert<span class="hljs-params">(this.a)</span></span>;
    }
}
obj1.<span class="hljs-keyword">fn</span>=obj2.<span class="hljs-keyword">fn</span>;
obj1.<span class="hljs-keyword">fn</span>();<span class="hljs-comment">//222</span></code></pre><p>&#x8FD9;&#x4E2A;&#x76F8;&#x4FE1;&#x4E5F;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x867D;&#x7136;<code>obj1.fn</code>&#x662F;&#x4ECE;<code>obj2.fn</code>&#x8D4B;&#x503C;&#x800C;&#x6765;&#xFF0C;&#x4F46;&#x662F;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x662F;<code>obj1</code>&#xFF0C;&#x6240;&#x4EE5;<code>this</code>&#x6307;&#x5411;<code>obj1</code>&#x3002;</p><h3 id="articleHeader5">3-3.&#x6784;&#x9020;&#x51FD;&#x6570;&#x8C03;&#x7528;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let TestClass=function(){
    this.name=&apos;111&apos;;
}
let subClass=new TestClass();
subClass.name=&apos;&#x5B88;&#x5019;&apos;;
console.log(subClass.name);//&#x5B88;&#x5019;
let subClass1=new TestClass();
console.log(subClass1.name)//111" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> TestClass=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name=<span class="hljs-string">&apos;111&apos;</span>;
}
<span class="hljs-keyword">let</span> subClass=<span class="hljs-keyword">new</span> TestClass();
subClass.name=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>;
<span class="hljs-built_in">console</span>.log(subClass.name);<span class="hljs-comment">//&#x5B88;&#x5019;</span>
<span class="hljs-keyword">let</span> subClass1=<span class="hljs-keyword">new</span> TestClass();
<span class="hljs-built_in">console</span>.log(subClass1.name)<span class="hljs-comment">//111</span></code></pre><p>&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x56DE;&#x5FC6;&#x4E0B;<a href="https://www.cnblogs.com/faith3/p/6209741.html" rel="nofollow noreferrer" target="_blank">&#xFF08;new&#x7684;&#x56DB;&#x4E2A;&#x6B65;&#x9AA4;&#xFF09;</a>&#x5C31;&#x5DEE;&#x4E0D;&#x591A;&#x4E86;&#xFF01;</p><p>&#x4F46;&#x662F;&#x6709;&#x4E00;&#x4E2A;&#x5751;&#xFF0C;&#x867D;&#x7136;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x5FC5;&#x8981;&#x63D0;&#x4E00;&#x4E0B;&#x3002;</p><p>&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4F1A;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x540E;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013986036?w=325&amp;h=211" src="https://static.alili.tech/img/remote/1460000013986036?w=325&amp;h=211" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader6">3-4.apply&#x548C;call&#x8C03;&#x7528;</h3><p>apply&#x548C;call&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x5C31;&#x662F;&#x4F1A;&#x6539;&#x53D8;&#x4F20;&#x5165;&#x51FD;&#x6570;&#x7684;this&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj2.fn.call(obj1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> obj1={
    a:<span class="hljs-number">222</span>
};
<span class="hljs-keyword">let</span> obj2={
    a:<span class="hljs-number">111</span>,
    <span class="hljs-function"><span class="hljs-keyword">fn</span>:function<span class="hljs-params">()</span>{
        alert<span class="hljs-params">(this.a)</span></span>;
    }
}
obj2.<span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span>(obj1);</code></pre><p>&#x6B64;&#x65F6;&#x867D;&#x7136;&#x662F; <code>obj2</code> &#x8C03;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528; &#x4E86;<code>call</code>&#xFF0C;&#x52A8;&#x6001;&#x7684;&#x628A; <code>this</code> &#x6307;&#x5411;&#x5230; <code>obj1</code>&#x3002;&#x76F8;&#x5F53;&#x4E8E;&#x8FD9;&#x4E2A; <code>obj2.fn</code> &#x8FD9;&#x4E2A;&#x6267;&#x884C;&#x73AF;&#x5883;&#x662F; <code>obj1</code> &#x3002;<code>apply</code> &#x548C; <code>call</code> &#x8BE6;&#x7EC6;&#x5185;&#x5BB9;&#x5728;&#x4E0B;&#x9762;&#x63D0;&#x53CA;&#x3002;</p><h3 id="articleHeader7">3-5.&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8C03;&#x7528;</h3><p>&#x9996;&#x5148;&#x4E0D;&#x5F97;&#x4E0D;&#x8BF4;&#xFF0C;ES6 &#x63D0;&#x4F9B;&#x4E86;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x589E;&#x52A0;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x6CA1;&#x6709; <code>this</code> &#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x7684; <code>this</code> &#x662F;&#x7EE7;&#x627F;&#x5916;&#x9762;&#x7684;&#x73AF;&#x5883;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj={
    a:222,
    fn:function(){    
        setTimeout(function(){console.log(this.a)})
    }
};
obj.fn();//undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">a</span>:<span class="hljs-number">222</span>,
    <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)})
    }
};
obj.fn();<span class="hljs-comment">//undefined</span></code></pre><p>&#x4E0D;&#x96BE;&#x53D1;&#x73B0;&#xFF0C;&#x867D;&#x7136; <strong>fn()</strong> &#x91CC;&#x9762;&#x7684; <strong>this</strong> &#x662F;&#x6307;&#x5411; <strong>obj</strong> &#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x4F20;&#x7ED9; <strong>setTimeout</strong> &#x7684;&#x662F;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF0C; <strong>this</strong> &#x6307;&#x5411;&#x662F; <strong>window</strong> &#xFF0C; <strong>window</strong> &#x4E0B;&#x9762;&#x6CA1;&#x6709; <strong>a</strong> &#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8F93;&#x51FA; <strong>undefined</strong> &#x3002;</p><p>&#x6362;&#x6210;&#x7BAD;&#x5934;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj={
    a:222,
    fn:function(){    
        setTimeout(()=&gt;{console.log(this.a)});
    }
};
obj.fn();//222" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">a</span>:<span class="hljs-number">222</span>,
    <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)});
    }
};
obj.fn();<span class="hljs-comment">//222</span></code></pre><p>&#x8FD9;&#x6B21;&#x8F93;&#x51FA; <strong>222</strong> &#x662F;&#x56E0;&#x4E3A;&#xFF0C;&#x4F20;&#x7ED9; <strong>setTimeout</strong> &#x7684;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x6CA1;&#x6709; <strong>this</strong> &#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5411;&#x4E0A;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x67E5;&#x627E;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E0A;&#xFF0C; <strong>setTimeout</strong> &#x7684;&#x4E0A;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x662F; <strong>fn</strong>&#x3002;&#x800C; <strong>fn</strong> &#x91CC;&#x9762;&#x7684; <strong>this</strong> &#x6307;&#x5411; <strong>obj</strong> &#xFF0C;&#x6240;&#x4EE5; <strong>setTimeout</strong> &#x91CC;&#x9762;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684; <strong>this</strong> &#xFF0C;&#x6307;&#x5411; <strong>obj</strong> &#x3002;&#x6240;&#x4EE5;&#x8F93;&#x51FA; <strong>222</strong> &#x3002;</p><h2 id="articleHeader8">4.call&#x548C;apply</h2><p><code>call</code> &#x548C; <code>apply</code> &#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x5B8C;&#x5168;&#x4E00;&#x6837;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#x5C31;&#x662F;&#x5728;&#x53C2;&#x6570;&#x4E0A;&#x9762;&#x3002;<br><code>call</code> &#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x56FA;&#x5B9A;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x51FD;&#x6570;&#x4F53;&#x5185; <code>this</code> &#x7684;&#x6307;&#x5411;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4EE5;&#x4E0B;&#x662F;&#x4F9D;&#x6B21;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x3002;<br>apply&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E5F;&#x662F;&#x51FD;&#x6570;&#x4F53;&#x5185; <code>this</code> &#x7684;&#x6307;&#x5411;&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x96C6;&#x5408;&#x5BF9;&#x8C61;&#xFF08;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x7C7B;&#x6570;&#x7EC4;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fn=function(a,b,c){
console.log(a,b,c);
}
let arr=[1,2,3];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> fn=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,c</span>)</span>{
<span class="hljs-built_in">console</span>.log(a,b,c);
}
<span class="hljs-keyword">let</span> arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000013986037?w=502&amp;h=227" src="https://static.alili.tech/img/remote/1460000013986037?w=502&amp;h=227" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj2.fn.call(obj1);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> obj1={
    a:<span class="hljs-number">222</span>
};
<span class="hljs-keyword">let</span> obj2={
    a:<span class="hljs-number">111</span>,
    <span class="hljs-function"><span class="hljs-keyword">fn</span>:function<span class="hljs-params">()</span>{
        alert<span class="hljs-params">(this.a)</span></span>;
    }
}
obj2.<span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span>(obj1);</code></pre><p><code>call</code> &#x548C; <code>apply</code> &#x4E24;&#x4E2A;&#x4E3B;&#x8981;&#x7528;&#x9014;&#x5C31;&#x662F;</p><p>1.&#x6539;&#x53D8; <code>this</code> &#x7684;&#x6307;&#x5411;&#xFF08;&#x628A; <code>this</code> &#x4ECE; <code>obj2</code> &#x6307;&#x5411;&#x5230; <code>obj1</code> &#xFF09;</p><p>2.&#x65B9;&#x6CD5;&#x501F;&#x7528;&#xFF08; <code>obj1</code> &#x6CA1;&#x6709; <code>fn</code> &#xFF0C;&#x53EA;&#x662F;&#x501F;&#x7528; <code>obj2</code> &#x65B9;&#x6CD5;&#xFF09;</p><h2 id="articleHeader9">5.&#x95ED;&#x5305;</h2><p>&#x95ED;&#x5305;&#x8FD9;&#x4E2A;&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x662F;&#x8FF7;&#x7CCA;&#xFF0C;&#x4F46;&#x662F;&#x5FC5;&#x987B;&#x8981;&#x5F81;&#x670D;&#x7684;&#x6982;&#x5FF5;&#xFF01;&#x4E0B;&#x9762;&#x7528;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x7B80;&#x5355;&#x8BF4;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let add=(function(){
let now=0;
return {
 doAdd:function(){
    now++;
    console.log(now);
}
}
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> add=(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">let</span> now=<span class="hljs-number">0</span>;
<span class="hljs-keyword">return</span> {
 <span class="hljs-attr">doAdd</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    now++;
    <span class="hljs-built_in">console</span>.log(now);
}
}
})()</code></pre><p>&#x7136;&#x540E;&#x6267;&#x884C;&#x51E0;&#x6B21;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013986038?w=217&amp;h=152" src="https://static.alili.tech/img/remote/1460000013986038?w=217&amp;h=152" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x56FE;&#x7ED3;&#x679C;&#x770B;&#x5230;&#xFF0C;<code>now</code> &#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x968F;&#x7740;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x800C;&#x88AB;&#x56DE;&#x6536;&#xFF0C;&#x800C;&#x662F;&#x7EE7;&#x7EED;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x91CC;&#x9762;&#x3002;<br>&#x5177;&#x4F53;&#x539F;&#x56E0;&#x8BF4;&#x4E0B;&#xFF1A;&#x521A;&#x5F00;&#x59CB;&#x8FDB;&#x6765;&#xFF0C;&#x56E0;&#x4E3A;&#x662F;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x8FDB;&#x6765;&#x4F1A;&#x81EA;&#x52A8;&#x6267;&#x884C;&#xFF0C;&#x8FD9;&#x4E00;&#x5757;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013986039?w=425&amp;h=247" src="https://static.alili.tech/img/remote/1460000013986039?w=425&amp;h=247" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x7136;&#x540E;&#x628A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x8D4B;&#x503C;&#x7ED9; <code>add</code> &#x3002;&#x7531;&#x4E8E; <code>add</code> &#x91CC;&#x9762;&#x6709;&#x51FD;&#x6570;&#x662F;&#x4F9D;&#x8D56;&#x4E8E; <code>now</code>&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x3002;&#x6240;&#x4EE5; <code>now</code> &#x4E0D;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#xFF0C;&#x56DE;&#x6536;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x95ED;&#x5305;&#x7684;&#x7528;&#x9014;&#x4E4B;&#x4E00;&#xFF08;&#x5EF6;&#x7EED;&#x53D8;&#x91CF;&#x5468;&#x671F;&#xFF09;&#x3002;&#x7531;&#x4E8E; <code>now</code> &#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x95ED;&#x5305;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x7528;&#x9014;&#xFF08;&#x521B;&#x5EFA;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#xFF0C;&#x4FDD;&#x62A4;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x4E0D;&#x4F1A;&#x88AB;&#x8BBF;&#x95EE;&#x548C;&#x4FEE;&#x6539;&#xFF09;&#x3002;</p><blockquote>&#x53EF;&#x80FD;&#x6709;&#x4EBA;&#x4F1A;&#x6709;&#x7591;&#x95EE;&#xFF0C;&#x95ED;&#x5305;&#x4F1A;&#x9020;&#x6210;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x3002;&#x4F46;&#x662F;&#x5927;&#x5BB6;&#x60F3;&#x4E0B;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x7528;&#x95ED;&#x5305;&#xFF0C;&#x5C31;&#x8981;&#x7528;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x3002;&#x628A;&#x53D8;&#x91CF;&#x653E;&#x5728;&#x95ED;&#x5305;&#x91CC;&#x9762;&#x548C;&#x653E;&#x5728;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x91CC;&#x9762;&#xFF0C;&#x5F71;&#x54CD;&#x662F;&#x4E00;&#x81F4;&#x7684;&#x3002;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x53C8;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x6240;&#x4EE5;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x95ED;&#x5305;&#x66F4;&#x597D;&#xFF01;</blockquote><h2 id="articleHeader10">6.&#x5C0F;&#x7ED3;</h2><p>&#x5728;&#x5B66;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9047;&#x5230;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x5C31;&#x662F;&#x8FD9;&#x4E00;&#x4E9B;&#x4E86;&#xFF0C;&#x8FD9;&#x4E9B;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x4E5F;&#x662F;&#x6211;&#x5728;&#x7FA4;&#x804A;&#xFF0C;&#x793E;&#x533A;&#x91CC;&#x9762;&#xFF0C;&#x8BA9;&#x4EBA;&#x6389;&#x5751;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x8003;&#x70B9;&#x3002;&#x8FD9;&#x4E9B;&#x77E5;&#x8BC6;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x5F00;&#x53D1;&#x5E38;&#x7528;&#xFF0C;&#x9762;&#x8BD5;&#x5E38;&#x8003;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x6DF1;&#x5165;&#x4E9B;&#x5B66;&#x4E60;&#x3002;&#x4E0A;&#x9762;&#x90A3;&#x91CC;&#x4E5F;&#x662F;&#x7B80;&#x5355;&#x7684;&#x8FC7;&#x4E00;&#x4E0B;&#x800C;&#x5DF2;&#x3002;&#x4E0D;&#x7B97;&#x6DF1;&#x5165;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x5BF9;&#x6587;&#x7AE0;&#x6709;&#x4EC0;&#x4E48;&#x5EFA;&#x8BAE;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x70B9;&#x3002;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript：面试频繁出现的几个易错点

## 原文链接
[https://segmentfault.com/a/1190000013986031](https://segmentfault.com/a/1190000013986031)


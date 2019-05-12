---
title: '「JavaScript」js中的继承方法总结' 
date: 2018-11-27 2:30:13
hidden: true
slug: adgszz7e5pf
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">1.&#x524D;&#x8A00;</h3><p>&#x672C;&#x6587;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x6307;&#x8DEF;&#x6211;&#x7684;<a href="https://github.com/JChermy/Inheritance" rel="nofollow noreferrer" target="_blank">GitHub</a>&#xFF0C;&#x6B22;&#x8FCE;<strong>star</strong>&#x3002;js&#x4E2D;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x591A;&#x79CD;&#xFF0C;&#x4EE5;&#x4E0B;&#x4EC5;&#x5217;&#x51FA;&#x90E8;&#x5206;&#x3002;</p><h3 id="articleHeader1">2.&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h3><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
    this.name = &apos;jchermy&apos;;
}

Parent.prototype.getName =  function() {
    console.log(this.name);
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName()); //jchermy" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;jchermy&apos;</span>;
}

Parent.prototype.getName =  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params"></span>) </span>{

}

Child.prototype = <span class="hljs-keyword">new</span> Parent();

<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child();
<span class="hljs-built_in">console</span>.log(child1.getName()); <span class="hljs-comment">//jchermy</span></code></pre><p>&#x8FD9;&#x6837;&#x770B;&#x6765;&#x8C8C;&#x4F3C;&#x53EF;&#x4EE5;&#x5B8C;&#x7F8E;&#x5B8C;&#x6210;&#x7EE7;&#x627F;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x5C5E;&#x6027;&#x6362;&#x6210;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
    this.names = [&quot;aa&quot;, &quot;bb&quot;]; //&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();
child1.names.push(&quot;cc&quot;);
console.log(child1.names); //[&quot;aa&quot;,&quot;bb&quot;,&quot;cc&quot;]

var child2 = new Child();
console.log(child2.names); //[&quot;aa&quot;,&quot;bb&quot;,&quot;cc&quot;]

child2.names.push(&quot;dd&quot;);
console.log(child1.names) //[&quot;aa&quot;, &quot;bb&quot;, &quot;cc&quot;, &quot;dd&quot;]
console.log(child2.names);//[&quot;aa&quot;, &quot;bb&quot;, &quot;cc&quot;, &quot;dd&quot;]

var p = new Parent();
console.log(p.names); //[&quot;aa&quot;, &quot;bb&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>function Parent() {
    this.names = [<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>]; //&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;
}

function Child() {

}

Child.prototype = <span class="hljs-built_in">new</span> Parent();

<span class="hljs-built_in">var</span> child1 = <span class="hljs-built_in">new</span> Child();
child1.names.<span class="hljs-built_in">push</span>(<span class="hljs-string">&quot;cc&quot;</span>);
console.<span class="hljs-built_in">log</span>(child1.names); //[<span class="hljs-string">&quot;aa&quot;</span>,<span class="hljs-string">&quot;bb&quot;</span>,<span class="hljs-string">&quot;cc&quot;</span>]

<span class="hljs-built_in">var</span> child2 = <span class="hljs-built_in">new</span> Child();
console.<span class="hljs-built_in">log</span>(child2.names); //[<span class="hljs-string">&quot;aa&quot;</span>,<span class="hljs-string">&quot;bb&quot;</span>,<span class="hljs-string">&quot;cc&quot;</span>]

child2.names.<span class="hljs-built_in">push</span>(<span class="hljs-string">&quot;dd&quot;</span>);
console.<span class="hljs-built_in">log</span>(child1.names) //[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>, <span class="hljs-string">&quot;cc&quot;</span>, <span class="hljs-string">&quot;dd&quot;</span>]
console.<span class="hljs-built_in">log</span>(child2.names);//[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>, <span class="hljs-string">&quot;cc&quot;</span>, <span class="hljs-string">&quot;dd&quot;</span>]

<span class="hljs-built_in">var</span> p = <span class="hljs-built_in">new</span> Parent();
console.<span class="hljs-built_in">log</span>(p.names); //[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>]</code></pre><p>&#x7531;&#x6B64;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x7F3A;&#x70B9;&#xFF1A;</p><ol><li>&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x88AB;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;</li><li>&#x5728;&#x521B;&#x5EFA;Child&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x4E0D;&#x80FD;&#x5411;Parent&#x4F20;&#x53C2;</li></ol><h3 id="articleHeader2">2.&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
    this.names = [&quot;aa&quot;, &quot;bb&quot;];
}

function Child() {
    Parent.call(this);
}

var child1 = new Child();
child1.names.push(&quot;cc&quot;);
console.log(child1.names);//[&quot;aa&quot;, &quot;bb&quot;, &quot;cc&quot;]

var child2 = new Child();
console.log(child2.names);//[&quot;aa&quot;, &quot;bb&quot;]

child2.names.push(&quot;dd&quot;);
console.log(child1.names); //[&quot;aa&quot;, &quot;bb&quot;, &quot;cc&quot;]
console.log(child2.names); //[&quot;aa&quot;, &quot;bb&quot;, &quot;dd&quot;]

var p = new Parent();
p.names; //[&quot;aa&quot;, &quot;bb&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>function Parent() {
    this.names = [<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>];
}

function Child() {
    Parent.call(this);
}

<span class="hljs-built_in">var</span> child1 = <span class="hljs-built_in">new</span> Child();
child1.names.<span class="hljs-built_in">push</span>(<span class="hljs-string">&quot;cc&quot;</span>);
console.<span class="hljs-built_in">log</span>(child1.names);//[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>, <span class="hljs-string">&quot;cc&quot;</span>]

<span class="hljs-built_in">var</span> child2 = <span class="hljs-built_in">new</span> Child();
console.<span class="hljs-built_in">log</span>(child2.names);//[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>]

child2.names.<span class="hljs-built_in">push</span>(<span class="hljs-string">&quot;dd&quot;</span>);
console.<span class="hljs-built_in">log</span>(child1.names); //[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>, <span class="hljs-string">&quot;cc&quot;</span>]
console.<span class="hljs-built_in">log</span>(child2.names); //[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>, <span class="hljs-string">&quot;dd&quot;</span>]

<span class="hljs-built_in">var</span> p = <span class="hljs-built_in">new</span> Parent();
p.names; //[<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>]</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x907F;&#x514D;&#x4E86;&#x4E00;&#x4E0B;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4E3B;&#x8981;&#x4F53;&#x73B0;&#x5728;&#xFF1A;</p><ol><li>&#x907F;&#x514D;&#x4E86;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x88AB;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;</li><li>&#x53EF;&#x4EE5;&#x5728;Child&#x4E2D;&#x5411;Parent&#x4F20;&#x53C2;</li></ol><p>&#x7136;&#x800C;&#xFF0C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x4E5F;&#x6709;&#x7F3A;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
    this.name = &quot;parent &quot;+name;
}

function Child(name) {
    this.name = &quot;child&quot;+name;
    Parent.call(this, name);
}

var child1 = new Child(&apos;hemin&apos;);
console.log(chil1.name); //&quot;parent hemin&quot;

var child2 = new Child(&quot;aa&quot;);
console.log(child2.name); //&quot;parent aa&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;parent &quot;</span>+name;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;child&quot;</span>+name;
    Parent.call(<span class="hljs-keyword">this</span>, name);
}

<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;hemin&apos;</span>);
<span class="hljs-built_in">console</span>.log(chil1.name); <span class="hljs-comment">//&quot;parent hemin&quot;</span>

<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&quot;aa&quot;</span>);
<span class="hljs-built_in">console</span>.log(child2.name); <span class="hljs-comment">//&quot;parent aa&quot;</span></code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;&#x65B9;&#x6CD5;&#x90FD;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5B9A;&#x4E49;&#xFF0C;&#x6BCF;&#x6B21;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x904D;&#x65B9;&#x6CD5;</p><h3 id="articleHeader3">3.&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><p>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x878D;&#x5408;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x548C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F18;&#x70B9;&#xFF0C;&#x662F;JavaScript&#x4E2D;&#x6700;&#x5E38;&#x7528;&#x7684;&#x7EE7;&#x627F;&#x6A21;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
    this.name = name;
    this.colors = [&quot;red&quot;, &quot;blue&quot;];
}

Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name); 
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child(&quot;aa&quot;, 18);
child1.colors.push(&quot;black&quot;);

child1.name; //&quot;aa&quot;
child1.age; //18
child1.colors; //[&quot;red&quot;, &quot;blue&quot;,&quot;black&quot;]

var child2 = new Child(&quot;bb&quot;, 20);
child2.name; //&quot;bb&quot;
child2.age; //20
child2.colors; //[&quot;red&quot;, &quot;blue&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>];
}

Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name, age</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>, name); 
    <span class="hljs-keyword">this</span>.age = age;
}

Child.prototype = <span class="hljs-keyword">new</span> Parent();
Child.prototype.constructor = Child;

<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-number">18</span>);
child1.colors.push(<span class="hljs-string">&quot;black&quot;</span>);

child1.name; <span class="hljs-comment">//&quot;aa&quot;</span>
child1.age; <span class="hljs-comment">//18</span>
child1.colors; <span class="hljs-comment">//[&quot;red&quot;, &quot;blue&quot;,&quot;black&quot;]</span>

<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&quot;bb&quot;</span>, <span class="hljs-number">20</span>);
child2.name; <span class="hljs-comment">//&quot;bb&quot;</span>
child2.age; <span class="hljs-comment">//20</span>
child2.colors; <span class="hljs-comment">//[&quot;red&quot;, &quot;blue&quot;]</span></code></pre><p>&#x7136;&#x800C;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4E5F;&#x6709;&#x4E00;&#x4E2A;&#x7F3A;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x7236;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p><p>&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Child.prototype = new Parent(); 
var child1 = new Child(&apos;aa&apos;, &apos;18&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>Child.prototype = <span class="hljs-keyword">new</span> <span class="hljs-type">Parent</span>(); 
<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Child</span>(<span class="hljs-string">&apos;aa&apos;</span>, <span class="hljs-string">&apos;18&apos;</span>);
</code></pre><p>&#x6240;&#x4EE5;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6253;&#x5370; child1 &#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0; Child.prototype &#x548C; child1 &#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x4E3A;colors&#xFF0C;&#x5C5E;&#x6027;&#x503C;&#x4E3A;[&apos;red&apos;, &apos;blue&apos;]&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbcsHJ?w=427&amp;h=159" src="https://static.alili.tech/img/bVbcsHJ?w=427&amp;h=159" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x6211;&#x4EEC;&#x5728;&#x4E0B;&#x9762;&#x518D;&#x8BA8;&#x8BBA;&#x3002;</p><h3 id="articleHeader4">4.&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: &apos;jchermy&apos;,
    friends: [&quot;aa&quot;, &quot;bb&quot;]
}

var person1 = createObj(person);
var person2 = createObj(person);

//&#x6CE8;&#x610F;&#xFF1A;&#x4FEE;&#x6539;person1.name&#x7684;&#x503C;&#xFF0C;person2.name&#x7684;&#x503C;&#x5E76;&#x672A;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;
//&#x5E76;&#x4E0D;&#x662F;&#x56E0;&#x4E3A;person1&#x548C;person2&#x6709;&#x72EC;&#x7ACB;&#x7684; name &#x503C;&#xFF0C;&#x800C;&#x662F;&#x56E0;&#x4E3A;person1.name = &apos;person1&apos;&#xFF0C;&#x7ED9;person1&#x6DFB;&#x52A0;&#x4E86; name &#x503C;&#xFF0C;&#x5E76;&#x975E;&#x4FEE;&#x6539;&#x4E86;&#x539F;&#x578B;&#x4E0A;&#x7684; name &#x503C;&#x3002;
person1.name = &quot;xiaomi&quot;;
console.log(person2.name); //&quot;jchermy&quot;

person2.friends.push(&quot;cc&quot;);
console.log(person1.friends); //[&quot;aa&quot;, &quot;bb&quot;, &quot;cc&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createObj</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
    F.prototype = o;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}

<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;jchermy&apos;</span>,
    <span class="hljs-attr">friends</span>: [<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>]
}

<span class="hljs-keyword">var</span> person1 = createObj(person);
<span class="hljs-keyword">var</span> person2 = createObj(person);

<span class="hljs-comment">//&#x6CE8;&#x610F;&#xFF1A;&#x4FEE;&#x6539;person1.name&#x7684;&#x503C;&#xFF0C;person2.name&#x7684;&#x503C;&#x5E76;&#x672A;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;</span>
<span class="hljs-comment">//&#x5E76;&#x4E0D;&#x662F;&#x56E0;&#x4E3A;person1&#x548C;person2&#x6709;&#x72EC;&#x7ACB;&#x7684; name &#x503C;&#xFF0C;&#x800C;&#x662F;&#x56E0;&#x4E3A;person1.name = &apos;person1&apos;&#xFF0C;&#x7ED9;person1&#x6DFB;&#x52A0;&#x4E86; name &#x503C;&#xFF0C;&#x5E76;&#x975E;&#x4FEE;&#x6539;&#x4E86;&#x539F;&#x578B;&#x4E0A;&#x7684; name &#x503C;&#x3002;</span>
person1.name = <span class="hljs-string">&quot;xiaomi&quot;</span>;
<span class="hljs-built_in">console</span>.log(person2.name); <span class="hljs-comment">//&quot;jchermy&quot;</span>

person2.friends.push(<span class="hljs-string">&quot;cc&quot;</span>);
<span class="hljs-built_in">console</span>.log(person1.friends); <span class="hljs-comment">//[&quot;aa&quot;, &quot;bb&quot;, &quot;cc&quot;]</span></code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;&#x5305;&#x542B;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x59CB;&#x7EC8;&#x4F1A;&#x5171;&#x4EAB;&#x76F8;&#x5E94;&#x7684;&#x503C;&#xFF0C;&#x4E0E;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x4E00;&#x6837;</p><h3 id="articleHeader5">5.&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EC5;&#x7528;&#x4E8E;&#x5C01;&#x88C5;&#x7EE7;&#x627F;&#x8FC7;&#x7A0B;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x5728;&#x5185;&#x90E8;&#x4EE5;&#x67D0;&#x79CD;&#x5F62;&#x5F0F;&#x505A;&#x589E;&#x5F3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log(&quot;hi&quot;);
      }
      return clone;
}

var person = {
    name: &quot;jchermy&quot;,
    friends: [&quot;aa&quot;, &quot;bb&quot;]
};

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = &quot;xiaomi&quot;;
console.log(person1.name); //&quot;xiaomi&quot;
console.log(person2.name); //&quot;jchermy&quot;

person1.friends.push(&quot;xxx&quot;);
console.log(person1.friends); // [&quot;aa&quot;, &quot;bb&quot;, &quot;xxx&quot;]
console.log(person2.friends); // [&quot;aa&quot;, &quot;bb&quot;, &quot;xxx&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createObj</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-keyword">var</span> clone = <span class="hljs-built_in">Object</span>.create(o);
    clone.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hi&quot;</span>);
      }
      <span class="hljs-keyword">return</span> clone;
}

<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;jchermy&quot;</span>,
    <span class="hljs-attr">friends</span>: [<span class="hljs-string">&quot;aa&quot;</span>, <span class="hljs-string">&quot;bb&quot;</span>]
};

<span class="hljs-keyword">var</span> person1 = createObj(person);
<span class="hljs-keyword">var</span> person2 = createObj(person);

person1.name = <span class="hljs-string">&quot;xiaomi&quot;</span>;
<span class="hljs-built_in">console</span>.log(person1.name); <span class="hljs-comment">//&quot;xiaomi&quot;</span>
<span class="hljs-built_in">console</span>.log(person2.name); <span class="hljs-comment">//&quot;jchermy&quot;</span>

person1.friends.push(<span class="hljs-string">&quot;xxx&quot;</span>);
<span class="hljs-built_in">console</span>.log(person1.friends); <span class="hljs-comment">// [&quot;aa&quot;, &quot;bb&quot;, &quot;xxx&quot;]</span>
<span class="hljs-built_in">console</span>.log(person2.friends); <span class="hljs-comment">// [&quot;aa&quot;, &quot;bb&quot;, &quot;xxx&quot;]</span></code></pre><p>&#x7F3A;&#x70B9;:</p><ol><li>&#x8DDF;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x4E00;&#x6837;&#xFF0C;&#x6BCF;&#x6B21;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x904D;&#x65B9;&#x6CD5;</li><li>&#x5305;&#x542B;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x59CB;&#x7EC8;&#x4F1A;&#x5171;&#x4EAB;&#x76F8;&#x5E94;&#x7684;&#x503C;</li></ol><h3 id="articleHeader6">6.&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x8FD8;&#x8BB0;&#x5F97;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x90A3;&#x4E9B;&#x95EE;&#x9898;&#x5417;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x8BE5;&#x5982;&#x4F55;&#x7CBE;&#x76CA;&#x6C42;&#x7CBE;&#xFF0C;&#x907F;&#x514D;&#x8FD9;&#x4E00;&#x6B21;&#x91CD;&#x590D;&#x8C03;&#x7528;&#x5462;&#xFF1F;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E0D;&#x4F7F;&#x7528; Child.prototype = new Parent() &#xFF0C;&#x800C;&#x662F;&#x95F4;&#x63A5;&#x7684;&#x8BA9; Child.prototype &#x8BBF;&#x95EE;&#x5230; Parent.prototype &#x5462;&#xFF1F;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
   this.name = name;
   this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}

Parent.prototype.getName = function () {
    console.log(this.name);
  }

  function Child(name, age) {
      Parent.call(this, name);
      this.age = age;
  }

//&#x5173;&#x952E;&#x7684;&#x4E09;&#x6B65;
  var F = function(){};

  F.prototype = Parent.prototype;

  Child.prototype = new F();


  
  Child.prototype.constructor = Child;

  var child1 = new Child(&apos;xiaomi&apos;, 18);
  var child2 = new Child2(&apos;aa&apos;, 24);
  console.log(child1.name); //xiaomi
  console.log(child2.name); //aa

  child1.colors.push(&quot;black&quot;);
  child1.colors; //[&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;black&quot;]
  child2.colors; //[&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>) </span>{
   <span class="hljs-keyword">this</span>.name = name;
   <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>];
}

Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name, age</span>) </span>{
      Parent.call(<span class="hljs-keyword">this</span>, name);
      <span class="hljs-keyword">this</span>.age = age;
  }

<span class="hljs-comment">//&#x5173;&#x952E;&#x7684;&#x4E09;&#x6B65;</span>
  <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};

  F.prototype = Parent.prototype;

  Child.prototype = <span class="hljs-keyword">new</span> F();


  
  Child.prototype.constructor = Child;

  <span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;xiaomi&apos;</span>, <span class="hljs-number">18</span>);
  <span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> Child2(<span class="hljs-string">&apos;aa&apos;</span>, <span class="hljs-number">24</span>);
  <span class="hljs-built_in">console</span>.log(child1.name); <span class="hljs-comment">//xiaomi</span>
  <span class="hljs-built_in">console</span>.log(child2.name); <span class="hljs-comment">//aa</span>

  child1.colors.push(<span class="hljs-string">&quot;black&quot;</span>);
  child1.colors; <span class="hljs-comment">//[&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;black&quot;]</span>
  child2.colors; <span class="hljs-comment">//[&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];</span>
</code></pre><blockquote>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x9AD8;&#x6548;&#x7387;&#x4F53;&#x73B0;&#x5B83;&#x53EA;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x6B21; Parent &#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x56E0;&#x6B64;&#x907F;&#x514D;&#x4E86;&#x5728; Parent.prototype &#x4E0A;&#x9762;&#x521B;&#x5EFA;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x3001;&#x591A;&#x4F59;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x4E0E;&#x6B64;&#x540C;&#x65F6;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#x8FD8;&#x80FD;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#xFF1B;&#x56E0;&#x6B64;&#xFF0C;&#x8FD8;&#x80FD;&#x591F;&#x6B63;&#x5E38;&#x4F7F;&#x7528; instanceof &#x548C; isPrototypeOf&#x3002;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x666E;&#x904D;&#x8BA4;&#x4E3A;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x6700;&#x7406;&#x60F3;&#x7684;&#x7EE7;&#x627F;&#x8303;&#x5F0F;&#x3002;</blockquote><h3 id="articleHeader7">7.&#x7ED3;&#x8BED;</h3><p>&#x5982;&#x679C;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;<strong>&#x70B9;&#x8D5E;</strong>&#x548C;<strong>&#x6536;&#x85CF;</strong>&#xFF01;&#xFF01;&#x6709;&#x9519;&#x8BEF;&#x548C;&#x4E0D;&#x5408;&#x7406;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x6B63;&#xFF01;<a href="https://github.com/JChermy/Inheritance" rel="nofollow noreferrer" target="_blank">GitHub</a>&#x7ED9;&#x4E2A;star&#x5C31;&#x6700;&#x597D;&#x5566;&#xFF01;=&#xFF08;//&#x25BD;//&#xFF09;&#x611F;&#x8C22;&#x5927;&#x5BB6;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「JavaScript」js中的继承方法总结

## 原文链接
[https://segmentfault.com/a/1190000015324440](https://segmentfault.com/a/1190000015324440)


---
title: '一篇文章理解JS继承——原型链/构造函数/组合/原型式/寄生式/寄生组合/Class extends' 
date: 2018-11-22 2:30:09
hidden: true
slug: numznbld8q
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x8BF4;&#x5B9E;&#x5728;&#x8BDD;&#xFF0C;&#x4EE5;&#x524D;&#x6211;&#x53EA;&#x9700;&#x8981;&#x77E5;&#x9053;&#x201C;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x201D;&#x662F;&#x6700;&#x597D;&#x7684;&#xFF0C;&#x6709;&#x4E2A;&#x7956;&#x4F20;&#x4EE3;&#x7801;&#x6A21;&#x7248;&#x7528;&#x5C31;&#x884C;&#x3002;&#x6700;&#x8FD1;&#x56E0;&#x4E3A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x51E0;&#x4E2A;&#x661F;&#x671F;&#x4EE5;&#x6765;&#x4E00;&#x76F4;&#x5FC3;&#x5FC3;&#x5FF5;&#x5FF5;&#x60F3;&#x6574;&#x7406;&#x51FA;&#x6765;&#x3002;&#x672C;&#x6587;&#x4EE5;&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#x4E0A;&#x7684;&#x5185;&#x5BB9;&#x4E3A;&#x9AA8;&#x67B6;&#xFF0C;&#x8865;&#x5145;&#x4E86;ES6 Class&#x7684;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#xFF0C;&#x4ECE;&#x6211;&#x8BA4;&#x4E3A;&#x66F4;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x7684;&#x89D2;&#x5EA6;&#x5C06;&#x7EE7;&#x627F;&#x8FD9;&#x4EF6;&#x4E8B;&#x53D9;&#x8FF0;&#x51FA;&#x6765;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x80FD;&#x6709;&#x6240;&#x6536;&#x83B7;&#x3002;</blockquote><h2 id="articleHeader0">1. &#x7EE7;&#x627F;&#x5206;&#x7C7B;</h2><p>&#x5148;&#x6765;&#x4E2A;&#x6574;&#x4F53;&#x5370;&#x8C61;&#x3002;&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF0C;JS&#x4E2D;&#x7EE7;&#x627F;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x662F;&#x5426;&#x4F7F;&#x7528;object&#x51FD;&#x6570;&#xFF08;&#x5728;&#x4E0B;&#x6587;&#x4E2D;&#x4F1A;&#x63D0;&#x5230;&#xFF09;&#xFF0C;&#x5C06;&#x7EE7;&#x627F;&#x5206;&#x6210;&#x4E24;&#x90E8;&#x5206;&#xFF08;Object.create&#x662F;ES5&#x65B0;&#x589E;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x6765;&#x89C4;&#x8303;&#x5316;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF09;&#x3002;</p><p>&#x5176;&#x4E2D;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x548C;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x6709;&#x4E00;&#x6837;&#x7684;&#x4F18;&#x7F3A;&#x70B9;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x4E0E;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x4E5F;&#x76F8;&#x4E92;&#x5BF9;&#x5E94;&#x3002;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x57FA;&#x4E8E;Object.create, &#x540C;&#x65F6;&#x4F18;&#x5316;&#x4E86;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#xFF0C;&#x6210;&#x4E3A;&#x4E86;&#x5B8C;&#x7F8E;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x3002;ES6 Class Extends&#x7684;&#x7ED3;&#x679C;&#x4E0E;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x57FA;&#x672C;&#x4E00;&#x81F4;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#x53C8;&#x7565;&#x6709;&#x4E0D;&#x540C;&#x3002;</p><p>&#x4E0B;&#x9762;&#x9A6C;&#x4E0A;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbd9t9?w=2162&amp;h=990" src="https://static.alili.tech/img/bVbd9t9?w=2162&amp;h=990" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader1">2. &#x7EE7;&#x627F;&#x65B9;&#x5F0F;</h2><blockquote>&#x4E0A;&#x56FE;&#x4E0A;&#x534A;&#x533A;&#x7684;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#xFF0C;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#xFF0C;&#x7F51;&#x4E0A;&#x5185;&#x5BB9;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x672C;&#x6587;&#x4E0D;&#x4F5C;&#x8BE6;&#x7EC6;&#x63CF;&#x8FF0;&#xFF0C;&#x53EA;&#x6307;&#x51FA;&#x91CD;&#x70B9;&#x3002;&#x8FD9;&#x91CC;&#x7ED9;&#x51FA;&#x4E86;&#x6211;&#x8BA4;&#x4E3A;&#x6700;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x7684;&#x4E00;&#x7BC7;&#x300A;<a href="https://segmentfault.com/a/1190000014476341">JS&#x4E2D;&#x7684;&#x7EE7;&#x627F;&#xFF08;&#x4E0A;&#xFF09;</a>&#x300B;&#x3002;&#x5982;&#x679C;&#x5BF9;&#x4E0A;&#x534A;&#x533A;&#x7684;&#x5185;&#x5BB9;&#x4E0D;&#x719F;&#x6089;&#xFF0C;&#x53EF;&#x4EE5;&#x5148;&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x518D;&#x56DE;&#x6765;&#x7EE7;&#x7EED;&#x9605;&#x8BFB;&#xFF1B;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x6BD4;&#x8F83;&#x719F;&#x6089;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x7565;&#x8FC7;&#x3002;&#x53E6;&#xFF0C;&#x4E0A;&#x534A;&#x533A;&#x5927;&#x91CF;&#x501F;&#x7528;&#x4E86;yq&#x524D;&#x7AEF;&#x7684;&#x4E00;&#x7BC7;&#x7EE7;&#x627F;&#x6587;&#x7AE0;[1]&#x3002;</blockquote><h3 id="articleHeader2">2.1 &#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h3><p>&#x6838;&#x5FC3;&#xFF1A;&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SubType.prototype = new SuperType() 
// &#x6240;&#x6709;&#x6D89;&#x53CA;&#x5230;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x90FD;&#x8981;&#x4FEE;&#x6539;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#xFF0C;&#x5426;&#x5219;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F1A;&#x6307;&#x5411;SuperType&#x3002;
SubType.prototype.constructor = SubType;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-type">SubType</span>.proto<span class="hljs-keyword">type</span> = new <span class="hljs-type">SuperType</span>() 
// &#x6240;&#x6709;&#x6D89;&#x53CA;&#x5230;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x90FD;&#x8981;&#x4FEE;&#x6539;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#xFF0C;&#x5426;&#x5219;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F1A;&#x6307;&#x5411;<span class="hljs-type">SuperType</span>&#x3002;
<span class="hljs-type">SubType</span>.proto<span class="hljs-keyword">type</span>.constructor = <span class="hljs-type">SubType</span>;</code></pre><p>&#x4F18;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x590D;&#x7528;<br>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x4F1A;&#x88AB;&#x6240;&#x6709;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;</li><li>&#x5B50;&#x7C7B;&#x6784;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x4E0D;&#x80FD;&#x5411;&#x7236;&#x7C7B;&#x4F20;&#x9012;&#x53C2;&#x6570;</li></ul><h3 id="articleHeader3">2.2 &#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;</h3><p>&#x6838;&#x5FC3;&#xFF1A;&#x5C06;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5185;&#x5BB9;&#x590D;&#x5236;&#x7ED9;&#x4E86;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x8FD9;&#x662F;&#x6240;&#x6709;&#x7EE7;&#x627F;&#x4E2D;&#x552F;&#x4E00;&#x4E00;&#x4E2A;&#x4E0D;&#x6D89;&#x53CA;&#x5230;prototype&#x7684;&#x7EE7;&#x627F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SuperType.call(SubType);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code style="word-break:break-word;white-space:initial">SuperType.call(SubType)<span class="hljs-comment">;</span></code></pre><p>&#x4F18;&#x70B9;&#xFF1A;&#x548C;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x5B8C;&#x5168;&#x53CD;&#x8FC7;&#x6765;&#x3002;</p><ul><li>&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x4E0D;&#x4F1A;&#x88AB;&#x5171;&#x4EAB;</li><li>&#x5B50;&#x7C7B;&#x6784;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7C7B;&#x4F20;&#x9012;&#x53C2;&#x6570;</li></ul><p>&#x7F3A;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x590D;&#x7528;&#xFF0C;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x6CD5;&#x6BCF;&#x6B21;&#x90FD;&#x662F;&#x5355;&#x72EC;&#x521B;&#x5EFA;&#x7684;&#x3002;</p><h3 id="articleHeader4">2.3 &#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><p>&#x6838;&#x5FC3;&#xFF1A;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x548C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x7684;&#x7EC4;&#x5408;&#xFF0C;&#x517C;&#x5177;&#x4E86;&#x4E8C;&#x8005;&#x7684;&#x4F18;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SuperType() {
    this.name = &apos;parent&apos;;
    this.arr = [1, 2, 3];
}

SuperType.prototype.say = function() { 
    console.log(&apos;this is parent&apos;)
}

function SubType() {
    SuperType.call(this) // &#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;SuperType
}

SubType.prototype = new SuperType() // &#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;SuperType" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;parent&apos;</span>;
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
}

SuperType.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;this is parent&apos;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span>(<span class="hljs-params"></span>) </span>{
    SuperType.call(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;SuperType</span>
}

SubType.prototype = <span class="hljs-keyword">new</span> SuperType() <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;SuperType</span></code></pre><p>&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x88AB;&#x590D;&#x7528;</li><li>&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x4E0D;&#x4F1A;&#x88AB;&#x5171;&#x4EAB;</li><li>&#x5B50;&#x7C7B;&#x6784;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7C7B;&#x4F20;&#x9012;&#x53C2;&#x6570;</li></ul><p>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x8C03;&#x7528;&#x4E86;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x7ED9;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6DFB;&#x52A0;&#x4E86;&#x7236;&#x7C7B;&#x7684;name, arr&#x5C5E;&#x6027;&#xFF0C;&#x7B2C;&#x4E8C;&#x6B21;&#x53C8;&#x7ED9;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x4E86;&#x7236;&#x7C7B;&#x7684;name, arr&#x5C5E;&#x6027;&#xFF0C;&#x4ECE;&#x800C;&#x8986;&#x76D6;&#x4E86;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x540C;&#x540D;&#x53C2;&#x6570;&#x3002;&#x8FD9;&#x79CD;&#x88AB;&#x8986;&#x76D6;&#x7684;&#x60C5;&#x51B5;&#x9020;&#x6210;&#x4E86;&#x6027;&#x80FD;&#x4E0A;&#x7684;&#x6D6A;&#x8D39;&#x3002;</p><h3 id="articleHeader5">2.4 &#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x6838;&#x5FC3;&#xFF1A;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x7684;object&#x65B9;&#x6CD5;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x5BF9;&#x53C2;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x6D45;&#x590D;&#x5236;&#x3002;<br>&#x4F18;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x590D;&#x7528;<br>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x4F1A;&#x88AB;&#x6240;&#x6709;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;</li><li>&#x5B50;&#x7C7B;&#x6784;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x4E0D;&#x80FD;&#x5411;&#x7236;&#x7C7B;&#x4F20;&#x9012;&#x53C2;&#x6570;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

var person = {
    name: &quot;Nicholas&quot;,
    friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]
};

var anotherPerson = object(person);
anotherPerson.name = &quot;Greg&quot;;
anotherPerson.friends.push(&quot;Rob&quot;);

var yetAnotherPerson = object(person);
yetAnotherPerson.name = &quot;Linda&quot;;
yetAnotherPerson.friends.push(&quot;Barbie&quot;);
alert(person.friends);   //&quot;Shelby,Court,Van,Rob,Barbie&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span><span class="hljs-params">(o)</span></span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span><span class="hljs-params">()</span></span>{}
  F.prototype = o;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}

<span class="hljs-keyword">var</span> person = {
    name: <span class="hljs-string">&quot;Nicholas&quot;</span>,
    friends: [<span class="hljs-string">&quot;Shelby&quot;</span>, <span class="hljs-string">&quot;Court&quot;</span>, <span class="hljs-string">&quot;Van&quot;</span>]
};

<span class="hljs-keyword">var</span> anotherPerson = object(person);
anotherPerson.name = <span class="hljs-string">&quot;Greg&quot;</span>;
anotherPerson.friends.push(<span class="hljs-string">&quot;Rob&quot;</span>);

<span class="hljs-keyword">var</span> yetAnotherPerson = object(person);
yetAnotherPerson.name = <span class="hljs-string">&quot;Linda&quot;</span>;
yetAnotherPerson.friends.push(<span class="hljs-string">&quot;Barbie&quot;</span>);
alert(person.friends);   <span class="hljs-comment">//&quot;Shelby,Court,Van,Rob,Barbie&quot;</span>
</code></pre><blockquote>ECMAScript 5 &#x901A;&#x8FC7;&#x65B0;&#x589E; Object.create()&#x65B9;&#x6CD5;&#x89C4;&#x8303;&#x5316;&#x4E86;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;:&#x4E00; &#x4E2A;&#x7528;&#x4F5C;&#x65B0;&#x5BF9;&#x8C61;&#x539F;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#x548C;(&#x53EF;&#x9009;&#x7684;)&#x4E00;&#x4E2A;&#x4E3A;&#x65B0;&#x5BF9;&#x8C61;&#x5B9A;&#x4E49;&#x989D;&#x5916;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5728;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C; Object.create()&#x4E0E; object()&#x65B9;&#x6CD5;&#x7684;&#x884C;&#x4E3A;&#x76F8;&#x540C;&#x3002;&#x2014;&#x2014;&#x300A;JAVASCript&#x9AD8;&#x7EA7;&#x7F16;&#x7A0B;&#x300B;</blockquote><p>&#x6240;&#x4EE5;&#x4E0A;&#x6587;&#x4E2D;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x8F6C;&#x53D8;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var yetAnotherPerson = object(person); =&gt; var yetAnotherPerson = Object.create(person);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> yetAnotherPerson = object(person); =&gt; <span class="hljs-keyword">var</span> yetAnotherPerson = <span class="hljs-built_in">Object</span>.create(person);</code></pre><h3 id="articleHeader6">2.5 &#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x6838;&#x5FC3;&#xFF1A;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7684;&#x6D45;&#x590D;&#x5236;&#xFF0C;&#x7136;&#x540E;&#x589E;&#x5F3A;&#x8FD9;&#x4E2A;&#x6D45;&#x590D;&#x5236;&#x7684;&#x80FD;&#x529B;&#x3002;<br>&#x4F18;&#x7F3A;&#x70B9;&#xFF1A;&#x4EC5;&#x63D0;&#x4F9B;&#x4E00;&#x79CD;&#x601D;&#x8DEF;&#xFF0C;&#x6CA1;&#x4EC0;&#x4E48;&#x4F18;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createAnother(original){ 
    var clone=object(original);    //&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;
    clone.sayHi = function(){      //&#x4EE5;&#x67D0;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x589E;&#x5F3A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;
        alert(&quot;hi&quot;);
    };
    return clone;                  //&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;
}

var person = {
    name: &quot;Nicholas&quot;,
    friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //&quot;hi&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAnother</span><span class="hljs-params">(original)</span></span>{ 
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">clone</span>=object(original);    <span class="hljs-comment">//&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">clone</span>.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{      <span class="hljs-comment">//&#x4EE5;&#x67D0;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x589E;&#x5F3A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;</span>
        alert(<span class="hljs-string">&quot;hi&quot;</span>);
    };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">clone</span>;                  <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;</span>
}

<span class="hljs-keyword">var</span> person = {
    name: <span class="hljs-string">&quot;Nicholas&quot;</span>,
    friends: [<span class="hljs-string">&quot;Shelby&quot;</span>, <span class="hljs-string">&quot;Court&quot;</span>, <span class="hljs-string">&quot;Van&quot;</span>]
};

<span class="hljs-keyword">var</span> anotherPerson = createAnother(person);
anotherPerson.sayHi(); <span class="hljs-comment">//&quot;hi&quot;</span></code></pre><h3 id="articleHeader7">2.6 &#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><p>&#x521A;&#x624D;&#x8BF4;&#x5230;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x6709;&#x4E00;&#x4E2A;&#x4F1A;&#x4E24;&#x6B21;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x9020;&#x6210;&#x6D6A;&#x8D39;&#x7684;&#x7F3A;&#x70B9;&#xFF0C;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype); // &#x521B;&#x5EFA;&#x4E86;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x7684;&#x6D45;&#x590D;&#x5236;
    prototype.constructor = subType;             // &#x4FEE;&#x6B63;&#x539F;&#x578B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
    subType.prototype = prototype;               // &#x5C06;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x66FF;&#x6362;&#x4E3A;&#x8FD9;&#x4E2A;&#x539F;&#x578B;
}

function SuperType(name){
    this.name = name;
    this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
// &#x6838;&#x5FC3;&#xFF1A;&#x56E0;&#x4E3A;&#x662F;&#x5BF9;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x7684;&#x590D;&#x5236;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5305;&#x542B;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x9020;&#x6210;&#x6D6A;&#x8D39;
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritPrototype</span><span class="hljs-params">(subType, superType)</span></span>{
    <span class="hljs-keyword">var</span> prototype = object(superType.prototype); <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E86;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x7684;&#x6D45;&#x590D;&#x5236;</span>
    prototype.constructor = subType;             <span class="hljs-comment">// &#x4FEE;&#x6B63;&#x539F;&#x578B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
    subType.prototype = prototype;               <span class="hljs-comment">// &#x5C06;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x66FF;&#x6362;&#x4E3A;&#x8FD9;&#x4E2A;&#x539F;&#x578B;</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperType</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>];
}

SuperType.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubType</span><span class="hljs-params">(name, age)</span></span>{
    SuperType.call(<span class="hljs-keyword">this</span>, name);
    <span class="hljs-keyword">this</span>.age = age;
}
<span class="hljs-comment">// &#x6838;&#x5FC3;&#xFF1A;&#x56E0;&#x4E3A;&#x662F;&#x5BF9;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x7684;&#x590D;&#x5236;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5305;&#x542B;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x9020;&#x6210;&#x6D6A;&#x8D39;</span>
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.age);
}</code></pre><p>&#x4F18;&#x7F3A;&#x70B9;&#xFF1A;&#x8FD9;&#x662F;&#x4E00;&#x79CD;&#x5B8C;&#x7F8E;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x3002;</p><h3 id="articleHeader8">2.7 ES6 Class extends</h3><p>&#x6838;&#x5FC3;&#xFF1A; ES6&#x7EE7;&#x627F;&#x7684;&#x7ED3;&#x679C;&#x548C;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x76F8;&#x4F3C;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#xFF0C;ES6&#x7EE7;&#x627F;&#x662F;&#x4E00;&#x79CD;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x662F;&#x5148;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;this&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BF9;&#x5176;&#x589E;&#x5F3A;&#xFF1B;&#x800C;ES6&#x5148;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x52A0;&#x5230;this&#x4E0A;&#x9762;&#xFF08;&#x6240;&#x4EE5;&#x5FC5;&#x987B;&#x5148;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7528;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4FEE;&#x6539;this&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A {}

class B extends A {
  constructor() {
    super();
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
  }
}</code></pre><p>ES6&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#x5177;&#x4F53;&#x539F;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A {
}

class B {
}

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// B &#x7684;&#x5B9E;&#x4F8B;&#x7EE7;&#x627F; A &#x7684;&#x5B9E;&#x4F8B;
Object.setPrototypeOf(B.prototype, A.prototype);

// B &#x7EE7;&#x627F; A &#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;
Object.setPrototypeOf(B, A);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> </span>{
}

<span class="hljs-built_in">Object</span>.setPrototypeOf = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj, proto</span>) </span>{
  obj.__proto__ = proto;
  <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-comment">// B &#x7684;&#x5B9E;&#x4F8B;&#x7EE7;&#x627F; A &#x7684;&#x5B9E;&#x4F8B;</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(B.prototype, A.prototype);

<span class="hljs-comment">// B &#x7EE7;&#x627F; A &#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(B, A);
</code></pre><p>ES6&#x7EE7;&#x627F;&#x4E0E;ES5&#x7EE7;&#x627F;&#x7684;&#x5F02;&#x540C;&#xFF1A;<br>&#x76F8;&#x540C;&#x70B9;&#xFF1A;&#x672C;&#x8D28;&#x4E0A;ES6&#x7EE7;&#x627F;&#x662F;ES5&#x7EE7;&#x627F;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;<br>&#x4E0D;&#x540C;&#x70B9;&#xFF1A;</p><ul><li>ES6&#x7EE7;&#x627F;&#x4E2D;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x94FE;&#x6307;&#x5411;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;ES5&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x590D;&#x5236;&#xFF0C;&#x6CA1;&#x6709;&#x539F;&#x578B;&#x94FE;&#x6307;&#x5411;&#x3002;</li><li>ES6&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x5EFA;&#xFF0C;&#x57FA;&#x4E8E;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;ES5&#x4E2D;&#x4E0D;&#x662F;&#x3002;</li></ul><h2 id="articleHeader9">3. &#x603B;&#x7ED3;</h2><ul><li>ES6 Class extends&#x662F;ES5&#x7EE7;&#x627F;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;</li><li>JS&#x7684;&#x7EE7;&#x627F;&#x9664;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x4E4B;&#x5916;&#x90FD;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x94FE;&#x6784;&#x5EFA;&#x7684;</li><li>&#x53EF;&#x4EE5;&#x7528;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x5B9E;&#x73B0;ES6 Class extends&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x4F1A;&#x6709;&#x7EC6;&#x5FAE;&#x7684;&#x5DEE;&#x522B;</li></ul><h2 id="articleHeader10">&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;</h2><p>[1]&#x300A;<a href="https://segmentfault.com/a/1190000015216289" target="_blank">js&#x7EE7;&#x627F;&#x3001;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x3001;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x3001;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x3001;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4F18;&#x5316;&#x3001;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</a>&#x300B;<br>[2]&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7F16;&#x7A0B;&#x300B;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇文章理解JS继承——原型链/构造函数/组合/原型式/寄生式/寄生组合/Class extends

## 原文链接
[https://segmentfault.com/a/1190000015727237](https://segmentfault.com/a/1190000015727237)


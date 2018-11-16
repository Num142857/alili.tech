---
title: JavaScript常见的六种继承方式
hidden: true
categories: [reprint]
slug: 9eedb2f
date: 2018-11-03 10:03:44
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x65B9;&#x9762;&#xFF0C;&#x5C31;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x7EE7;&#x627F;&#x3002;<strong>A &#x5BF9;&#x8C61;&#x901A;&#x8FC7;&#x7EE7;&#x627F; B &#x5BF9;&#x8C61;&#xFF0C;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x62E5;&#x6709; B &#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</strong>&#x3002;&#x8FD9;&#x5BF9;&#x4E8E;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x7528;&#x662F;&#x975E;&#x5E38;&#x6709;&#x7528;&#x7684;&#x3002;</p><p>&#x5927;&#x90E8;&#x5206;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x90FD;&#x662F;&#x901A;&#x8FC7;&#x201C;&#x7C7B;&#x201D;&#xFF08;class&#xFF09;&#x5B9E;&#x73B0;&#x5BF9;&#x8C61;&#x7684;&#x7EE7;&#x627F;&#x3002;&#x4F20;&#x7EDF;&#x4E0A;&#xFF0C;JavaScript &#x8BED;&#x8A00;&#x7684;&#x7EE7;&#x627F;&#x4E0D;&#x901A;&#x8FC7; class(ES6 &#x5F15;&#x5165;&#x4E86;class &#x8BED;&#x6CD5;)&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;&#x201C;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x201D;&#xFF08;prototype&#xFF09;&#x5B9E;&#x73B0;&#x3002;&#x90A3;&#x4E48;&#x5728;JS&#x4E2D;&#x5E38;&#x89C1;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x6709;&#x51E0;&#x79CD;&#x5462;&#xFF1F;</p><p>&#x5982;&#x9700;&#x672C;&#x6587;&#x6E90;&#x7801;&#xFF0C;&#x8BF7;&#x731B;&#x6233; <strong><a href="https://github.com/ljianshu/Blog/blob/master/oop%E7%BB%A7%E6%89%BF%E5%85%AD%E7%A7%8D%E6%96%B9%E5%BC%8F.html" rel="nofollow noreferrer" target="_blank">&#x5E38;&#x89C1;&#x7684;&#x516D;&#x79CD;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;</a></strong></p><p><strong>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;GitHub&#x535A;&#x5BA2;</a>&#x70B9;&#x8D5E;&#x548C;&#x5173;&#x6CE8;&#xFF0C;&#x611F;&#x6FC0;&#x4E0D;&#x5C3D;&#xFF01;</strong></p><h2 id="articleHeader1">&#x65B9;&#x5F0F;&#x4E00;&#x3001;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h2><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5173;&#x952E;&#x5728;&#x4E8E;:<strong>&#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x4E3A;&#x7236;&#x7C7B;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       //&#x7236;&#x7C7B;&#x578B;
       function Person(name, age) {
           this.name = name,
           this.age = age,
           this.play = [1, 2, 3]
           this.setName = function () { }
       }
       Person.prototype.setAge = function () { }
       //&#x5B50;&#x7C7B;&#x578B;
       function Student(price) {
           this.price = price
           this.setScore = function () { }
       }
       Student.prototype = new Person() // &#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x4E3A;&#x7236;&#x7C7B;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;
       var s1 = new Student(15000)
       var s2 = new Student(14000)
       console.log(s1,s2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>       <span class="hljs-comment">//&#x7236;&#x7C7B;&#x578B;</span>
       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
           <span class="hljs-keyword">this</span>.name = name,
           <span class="hljs-keyword">this</span>.age = age,
           <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
           <span class="hljs-keyword">this</span>.setName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
       }
       Person.prototype.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
       <span class="hljs-comment">//&#x5B50;&#x7C7B;&#x578B;</span>
       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">price</span>) </span>{
           <span class="hljs-keyword">this</span>.price = price
           <span class="hljs-keyword">this</span>.setScore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
       }
       Student.prototype = <span class="hljs-keyword">new</span> Person() <span class="hljs-comment">// &#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x4E3A;&#x7236;&#x7C7B;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</span>
       <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-number">15000</span>)
       <span class="hljs-keyword">var</span> s2 = <span class="hljs-keyword">new</span> Student(<span class="hljs-number">14000</span>)
       <span class="hljs-built_in">console</span>.log(s1,s2)</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016708009" src="https://static.alili.tech/img/remote/1460000016708009" alt="image" title="image" style="cursor:pointer;display:inline"></span><br>&#x4F46;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7684;&#x672C;&#x8D28;&#x662F;&#x901A;&#x8FC7;&#x5C06;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x6240;&#x4EE5;<strong>&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;__proto__&#x8BBF;&#x95EE;&#x5230; Student.prototype &#x4E5F;&#x5C31;&#x662F;Person&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x7236;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x901A;&#x8FC7;__proto__&#x6307;&#x5411;&#x7236;&#x7C7B;&#x7684;prototype&#x5C31;&#x53EF;&#x4EE5;&#x83B7;&#x5F97;&#x5230;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;</strong>&#x3002;&#x4E8E;&#x662F;&#x505A;&#x5230;&#x4E86;&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x3001;&#x516C;&#x6709;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x90FD;&#x5F53;&#x505A;&#x5B50;&#x7C7B;&#x7684;&#x516C;&#x6709;&#x5C5E;&#x6027;</p><p><strong>&#x5B50;&#x7C7B;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x662F;&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x516C;&#x6709;&#x65B9;&#x6CD5;&#x90FD;&#x4F5C;&#x4E3A;&#x81EA;&#x5DF1;&#x7684;&#x516C;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</strong>&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#x5728;&#x64CD;&#x4F5C;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x65F6;&#x5019;&#x64CD;&#x4F5C;&#x7684;&#x662F;&#x503C;&#xFF0C;&#x5728;&#x64CD;&#x4F5C;&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x65F6;&#x5019;&#x64CD;&#x4F5C;&#x7684;&#x662F;&#x5730;&#x5740;&#xFF0C;&#x5982;&#x679C;&#x8BF4;&#x7236;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x4E2D;&#x6709;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x5B83;&#x88AB;&#x5B50;&#x7C7B;&#x7EE7;&#x627F;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x4F5C;&#x4E3A;&#x516C;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x6837;&#x5B50;&#x7C7B;1&#x64CD;&#x4F5C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x5B50;&#x7C7B;2&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       s1.play.push(4)
       console.log(s1.play, s2.play)
       console.log(s1.__proto__ === s2.__proto__)//true
       console.log(s1.__proto__.__proto__ === s2.__proto__.__proto__)//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>       s1.play.push(<span class="hljs-number">4</span>)
       console.<span class="hljs-built_in">log</span>(s1.play, s2.play)
       console.<span class="hljs-built_in">log</span>(s1.<span class="hljs-variable">__proto__</span> === s2.<span class="hljs-variable">__proto__</span>)<span class="hljs-comment">//true</span>
       console.<span class="hljs-built_in">log</span>(s1.<span class="hljs-variable">__proto__</span>.<span class="hljs-variable">__proto__</span> === s2.<span class="hljs-variable">__proto__</span>.<span class="hljs-variable">__proto__</span>)<span class="hljs-comment">//true</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016708010" src="https://static.alili.tech/img/remote/1460000016708010" alt="image" title="image" style="cursor:pointer"></span><br>s1&#x4E2D;play&#x5C5E;&#x6027;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x4E0E;&#x6B64;&#x540C;&#x65F6;&#xFF0C;s2&#x4E2D;play&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x53D8;&#x5316;&#x3002;</p><p>&#x53E6;&#x5916;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#x7684;&#x662F;&#xFF0C;<strong>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x65B9;&#x6CD5;&#x6216;&#x8005;&#x662F;&#x91CD;&#x5199;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#x5019;&#xFF0C;&#x5207;&#x8BB0;&#x4E00;&#x5B9A;&#x8981;&#x653E;&#x5230;&#x66FF;&#x6362;&#x539F;&#x578B;&#x7684;&#x8BED;&#x53E5;&#x4E4B;&#x540E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       function Person(name, age) {
           this.name = name,
           this.age = age
       }
       Person.prototype.setAge = function () {
           console.log(&quot;111&quot;)
       }
       function Student(price) {
           this.price = price
           this.setScore = function () { }
       }
       // Student.prototype.sayHello = function () { }//&#x5728;&#x8FD9;&#x91CC;&#x5199;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x662F;&#x65E0;&#x6548;&#x7684;&#xFF0C;
      //&#x56E0;&#x4E3A;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x578B;&#x7684;&#x6307;&#x5411;&#xFF0C;&#x6240;&#x4EE5;&#x5E94;&#x8BE5;&#x653E;&#x5230;&#x91CD;&#x65B0;&#x6307;&#x5B9A;&#x4E4B;&#x540E;
       Student.prototype = new Person()
       Student.prototype.sayHello = function () { }
       var s1 = new Student(15000)
       console.log(s1)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
           <span class="hljs-keyword">this</span>.name = name,
           <span class="hljs-keyword">this</span>.age = age
       }
       Person.prototype.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;111&quot;</span>)
       }
       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">price</span>) </span>{
           <span class="hljs-keyword">this</span>.price = price
           <span class="hljs-keyword">this</span>.setScore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
       }
       <span class="hljs-comment">// Student.prototype.sayHello = function () { }//&#x5728;&#x8FD9;&#x91CC;&#x5199;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x662F;&#x65E0;&#x6548;&#x7684;&#xFF0C;</span>
      <span class="hljs-comment">//&#x56E0;&#x4E3A;&#x4F1A;&#x6539;&#x53D8;&#x539F;&#x578B;&#x7684;&#x6307;&#x5411;&#xFF0C;&#x6240;&#x4EE5;&#x5E94;&#x8BE5;&#x653E;&#x5230;&#x91CD;&#x65B0;&#x6307;&#x5B9A;&#x4E4B;&#x540E;</span>
       Student.prototype = <span class="hljs-keyword">new</span> Person()
       Student.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
       <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-number">15000</span>)
       <span class="hljs-built_in">console</span>.log(s1)</code></pre><p><strong>&#x7279;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x7236;&#x7C7B;&#x65B0;&#x589E;&#x539F;&#x578B;&#x65B9;&#x6CD5;/&#x539F;&#x578B;&#x5C5E;&#x6027;&#xFF0C;&#x5B50;&#x7C7B;&#x90FD;&#x80FD;&#x8BBF;&#x95EE;&#x5230;</li><li>&#x7B80;&#x5355;&#xFF0C;&#x6613;&#x4E8E;&#x5B9E;&#x73B0;</li></ul><p><strong>&#x7F3A;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x591A;&#x7EE7;&#x627F;</li><li>&#x6765;&#x81EA;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x88AB;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;</li><li>&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5411;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x53C2;</li><li>&#x8981;&#x60F3;&#x4E3A;&#x5B50;&#x7C7B;&#x65B0;&#x589E;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5728;<code>Student.prototype = new Person()</code> &#x4E4B;&#x540E;&#x6267;&#x884C;&#xFF0C;&#x4E0D;&#x80FD;&#x653E;&#x5230;&#x6784;&#x9020;&#x5668;&#x4E2D;</li></ul><h2 id="articleHeader2">&#x65B9;&#x5F0F;&#x4E8C;: &#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;</h2><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5173;&#x952E;&#x5728;&#x4E8E;:<strong>&#x5728;&#x5B50;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x901A;&#x7528;call()&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/javascript&quot;&gt;
  function Person(name, age) {
    this.name = name,
    this.age = age,
    this.setName = function () {}
  }
  Person.prototype.setAge = function () {}
  function Student(name, age, price) {
    Person.call(this, name, age)  // &#x76F8;&#x5F53;&#x4E8E;: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    this.price = price
  }
  var s1 = new Student(&apos;Tom&apos;, 20, 15000)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="actionscript">
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name, age)</span> </span>{
    <span class="hljs-keyword">this</span>.name = name,
    <span class="hljs-keyword">this</span>.age = age,
    <span class="hljs-keyword">this</span>.setName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{}
  }
  Person.prototype.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{}
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span><span class="hljs-params">(name, age, price)</span> </span>{
    Person.call(<span class="hljs-keyword">this</span>, name, age)  <span class="hljs-comment">// &#x76F8;&#x5F53;&#x4E8E;: this.Person(name, age)</span>
    <span class="hljs-comment">/*this.name = name
    this.age = age*/</span>
    <span class="hljs-keyword">this</span>.price = price
  }
  <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">&apos;Tom&apos;</span>, <span class="hljs-number">20</span>, <span class="hljs-number">15000</span>)</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016708011" src="https://static.alili.tech/img/remote/1460000016708011" alt="image" title="image" style="cursor:pointer"></span><br>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x53EA;&#x662F;&#x5B9E;&#x73B0;&#x90E8;&#x5206;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x5982;&#x679C;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x8FD8;&#x6709;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#xFF0C;&#x5B50;&#x7C7B;&#x662F;&#x62FF;&#x4E0D;&#x5230;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(s1.setAge())//Uncaught TypeError: s1.setAge is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs monkey"><code style="word-break:break-word;white-space:initial">console.<span class="hljs-built_in">log</span>(s1.setAge())//Uncaught TypeError: s1.setAge is <span class="hljs-keyword">not</span> a <span class="hljs-function"><span class="hljs-keyword">function</span></span></code></pre><p><strong>&#x7279;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x89E3;&#x51B3;&#x4E86;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x4E2D;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x7684;&#x95EE;&#x9898;</li><li>&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7C7B;&#x4F20;&#x9012;&#x53C2;&#x6570;</li><li>&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x591A;&#x7EE7;&#x627F;(call&#x591A;&#x4E2A;&#x7236;&#x7C7B;&#x5BF9;&#x8C61;)</li></ul><p><strong>&#x7F3A;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x5B9E;&#x4F8B;&#x5E76;&#x4E0D;&#x662F;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x53EA;&#x662F;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;</li><li>&#x53EA;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</li><li>&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x590D;&#x7528;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B50;&#x7C7B;&#x90FD;&#x6709;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x51FD;&#x6570;&#x7684;&#x526F;&#x672C;&#xFF0C;&#x5F71;&#x54CD;&#x6027;&#x80FD;</li></ul><h2 id="articleHeader3">&#x65B9;&#x5F0F;&#x4E09;: &#x539F;&#x578B;&#x94FE;+&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h2><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5173;&#x952E;&#x5728;&#x4E8E;:<strong>&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x6784;&#x9020;&#xFF0C;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5E76;&#x4FDD;&#x7559;&#x4F20;&#x53C2;&#x7684;&#x4F18;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x590D;&#x7528;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function Person(name, age) {
            this.name = name,
            this.age = age,
            this.setAge = function () { }
        }
        Person.prototype.setAge = function () {
            console.log(&quot;111&quot;)
        }
        function Student(name, age, price) {
            Person.call(this,name,age)
            this.price = price
            this.setScore = function () { }
        }
        Student.prototype = new Person()
        Student.prototype.constructor = Student//&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4E5F;&#x662F;&#x9700;&#x8981;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;
        Student.prototype.sayHello = function () { }
        var s1 = new Student(&apos;Tom&apos;, 20, 15000)
        var s2 = new Student(&apos;Jack&apos;, 22, 14000)
        console.log(s1)
        console.log(s1.constructor) //Student
        console.log(p1.constructor) //Person" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name,
            <span class="hljs-keyword">this</span>.age = age,
            <span class="hljs-keyword">this</span>.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
        }
        Person.prototype.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;111&quot;</span>)
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name, age, price</span>) </span>{
            Person.call(<span class="hljs-keyword">this</span>,name,age)
            <span class="hljs-keyword">this</span>.price = price
            <span class="hljs-keyword">this</span>.setScore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
        }
        Student.prototype = <span class="hljs-keyword">new</span> Person()
        Student.prototype.constructor = Student<span class="hljs-comment">//&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4E5F;&#x662F;&#x9700;&#x8981;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;</span>
        Student.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
        <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">&apos;Tom&apos;</span>, <span class="hljs-number">20</span>, <span class="hljs-number">15000</span>)
        <span class="hljs-keyword">var</span> s2 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">&apos;Jack&apos;</span>, <span class="hljs-number">22</span>, <span class="hljs-number">14000</span>)
        <span class="hljs-built_in">console</span>.log(s1)
        <span class="hljs-built_in">console</span>.log(s1.constructor) <span class="hljs-comment">//Student</span>
        <span class="hljs-built_in">console</span>.log(p1.constructor) <span class="hljs-comment">//Person</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016708012" src="https://static.alili.tech/img/remote/1460000016708012" alt="image" title="image" style="cursor:pointer"></span><br>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x878D;&#x5408;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x548C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F18;&#x70B9;&#xFF0C;&#x662F; JavaScript &#x4E2D;&#x6700;&#x5E38;&#x7528;&#x7684;&#x7EE7;&#x627F;&#x6A21;&#x5F0F;&#x3002;&#x4E0D;&#x8FC7;&#x4E5F;&#x5B58;&#x5728;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x65E0;&#x8BBA;&#x5728;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1A;&#x4E00;&#x6B21;&#x662F;&#x5728;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x578B;&#x539F;&#x578B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53E6;&#x4E00;&#x6B21;&#x662F;&#x5728;&#x5B50;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#xFF0C;&#x5B50;&#x7C7B;&#x578B;&#x6700;&#x7EC8;&#x4F1A;&#x5305;&#x542B;&#x7236;&#x7C7B;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5168;&#x90E8;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x4E0D;&#x5F97;&#x4E0D;&#x5728;&#x8C03;&#x7528;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#x91CD;&#x5199;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x3002;</p><p><strong>&#x4F18;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x53EF;&#x4EE5;&#x7EE7;&#x627F;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7EE7;&#x627F;&#x539F;&#x578B;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;</li><li>&#x4E0D;&#x5B58;&#x5728;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x5171;&#x4EAB;&#x95EE;&#x9898;</li><li>&#x53EF;&#x4F20;&#x53C2;</li><li>&#x51FD;&#x6570;&#x53EF;&#x590D;&#x7528;</li></ul><p><strong>&#x7F3A;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x8C03;&#x7528;&#x4E86;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x751F;&#x6210;&#x4E86;&#x4E24;&#x4EFD;&#x5B9E;&#x4F8B;</li></ul><h2 id="articleHeader4">&#x65B9;&#x5F0F;&#x56DB;: &#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4F18;&#x5316;1</h2><p><strong>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x901A;&#x8FC7;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x548C;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#x6307;&#x5411;&#x540C;&#x4E00;&#x5BF9;&#x8C61;&#xFF0C;&#x5B50;&#x7C7B;&#x53EF;&#x4EE5;&#x7EE7;&#x627F;&#x5230;&#x7236;&#x7C7B;&#x7684;&#x516C;&#x6709;&#x65B9;&#x6CD5;&#x5F53;&#x505A;&#x81EA;&#x5DF1;&#x7684;&#x516C;&#x6709;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x4E14;&#x4E0D;&#x4F1A;&#x521D;&#x59CB;&#x5316;&#x4E24;&#x6B21;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;/&#x5C5E;&#x6027;&#xFF0C;&#x907F;&#x514D;&#x7684;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x7F3A;&#x70B9;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       function Person(name, age) {
            this.name = name,
                this.age = age,
                this.setAge = function () { }
        }
        Person.prototype.setAge = function () {
            console.log(&quot;111&quot;)
        }
        function Student(name, age, price) {
            Person.call(this, name, age)
            this.price = price
            this.setScore = function () { }
        }
        Student.prototype = Person.prototype
        Student.prototype.sayHello = function () { }
        var s1 = new Student(&apos;Tom&apos;, 20, 15000)
        console.log(s1)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name,
                <span class="hljs-keyword">this</span>.age = age,
                <span class="hljs-keyword">this</span>.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
        }
        Person.prototype.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;111&quot;</span>)
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name, age, price</span>) </span>{
            Person.call(<span class="hljs-keyword">this</span>, name, age)
            <span class="hljs-keyword">this</span>.price = price
            <span class="hljs-keyword">this</span>.setScore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
        }
        Student.prototype = Person.prototype
        Student.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ }
        <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">&apos;Tom&apos;</span>, <span class="hljs-number">20</span>, <span class="hljs-number">15000</span>)
        <span class="hljs-built_in">console</span>.log(s1)</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016708013" src="https://static.alili.tech/img/remote/1460000016708013" alt="image" title="image" style="cursor:pointer;display:inline"></span><br>&#x4F46;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6CA1;&#x529E;&#x6CD5;&#x8FA8;&#x522B;&#x662F;&#x5BF9;&#x8C61;&#x662F;&#x5B50;&#x7C7B;&#x8FD8;&#x662F;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(s1 instanceof Student, s1 instanceof Person)//true true
console.log(s1.constructor)//Person" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(s1 <span class="hljs-keyword">instanceof</span> Student, s1 <span class="hljs-keyword">instanceof</span> Person)<span class="hljs-regexp">//</span><span class="hljs-literal">true</span> <span class="hljs-literal">true</span>
<span class="hljs-built_in">console</span>.log(s1.constructor)<span class="hljs-regexp">//</span>Person</code></pre><p><strong>&#x4F18;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x4E0D;&#x4F1A;&#x521D;&#x59CB;&#x5316;&#x4E24;&#x6B21;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;/&#x5C5E;&#x6027;&#xFF0C;&#x907F;&#x514D;&#x7684;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x7F3A;&#x70B9;</li></ul><p><strong>&#x7F3A;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x6CA1;&#x529E;&#x6CD5;&#x8FA8;&#x522B;&#x662F;&#x5B9E;&#x4F8B;&#x662F;&#x5B50;&#x7C7B;&#x8FD8;&#x662F;&#x7236;&#x7C7B;&#x521B;&#x9020;&#x7684;&#xFF0C;&#x5B50;&#x7C7B;&#x548C;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x3002;</li></ul><h2 id="articleHeader5">&#x65B9;&#x5F0F;&#x4E94;: &#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4F18;&#x5316;2</h2><p><strong>&#x501F;&#x52A9;&#x539F;&#x578B;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E;&#x5DF2;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x6765;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#xFF0C;<code>var B = Object.create(A)</code>&#x4EE5;A&#x5BF9;&#x8C61;&#x4E3A;&#x539F;&#x578B;&#xFF0C;&#x751F;&#x6210;&#x4E86;B&#x5BF9;&#x8C61;&#x3002;B&#x7EE7;&#x627F;&#x4E86;A&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       function Person(name, age) {
            this.name = name,
            this.age = age
        }
        Person.prototype.setAge = function () {
            console.log(&quot;111&quot;)
        }
        function Student(name, age, price) {
            Person.call(this, name, age)
            this.price = price
            this.setScore = function () {}
        }
        Student.prototype = Object.create(Person.prototype)//&#x6838;&#x5FC3;&#x4EE3;&#x7801;
        Student.prototype.constructor = Student//&#x6838;&#x5FC3;&#x4EE3;&#x7801;
        var s1 = new Student(&apos;Tom&apos;, 20, 15000)
        console.log(s1 instanceof Student, s1 instanceof Person) // true true
        console.log(s1.constructor) //Student
        console.log(s1)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name,
            <span class="hljs-keyword">this</span>.age = age
        }
        Person.prototype.setAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;111&quot;</span>)
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name, age, price</span>) </span>{
            Person.call(<span class="hljs-keyword">this</span>, name, age)
            <span class="hljs-keyword">this</span>.price = price
            <span class="hljs-keyword">this</span>.setScore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
        }
        Student.prototype = <span class="hljs-built_in">Object</span>.create(Person.prototype)<span class="hljs-comment">//&#x6838;&#x5FC3;&#x4EE3;&#x7801;</span>
        Student.prototype.constructor = Student<span class="hljs-comment">//&#x6838;&#x5FC3;&#x4EE3;&#x7801;</span>
        <span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">&apos;Tom&apos;</span>, <span class="hljs-number">20</span>, <span class="hljs-number">15000</span>)
        <span class="hljs-built_in">console</span>.log(s1 <span class="hljs-keyword">instanceof</span> Student, s1 <span class="hljs-keyword">instanceof</span> Person) <span class="hljs-comment">// true true</span>
        <span class="hljs-built_in">console</span>.log(s1.constructor) <span class="hljs-comment">//Student</span>
        <span class="hljs-built_in">console</span>.log(s1)</code></pre><p>&#x540C;&#x6837;&#x7684;&#xFF0C;Student&#x7EE7;&#x627F;&#x4E86;&#x6240;&#x6709;&#x7684;Person&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;&#x76EE;&#x524D;&#x6765;&#x8BF4;&#xFF0C;&#x6700;&#x5B8C;&#x7F8E;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#xFF01;<br><span class="img-wrap"><img data-src="/img/remote/1460000016708014" src="https://static.alili.tech/img/remote/1460000016708014" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader6">&#x65B9;&#x5F0F;&#x516D;&#xFF1A;ES6&#x4E2D;class &#x7684;&#x7EE7;&#x627F;</h2><p>ES6&#x4E2D;&#x5F15;&#x5165;&#x4E86;class&#x5173;&#x952E;&#x5B57;&#xFF0C;class&#x53EF;&#x4EE5;&#x901A;&#x8FC7;extends&#x5173;&#x952E;&#x5B57;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;static&#x5173;&#x952E;&#x5B57;&#x5B9A;&#x4E49;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;,&#x8FD9;&#x6BD4; ES5 &#x7684;&#x901A;&#x8FC7;&#x4FEE;&#x6539;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x8981;&#x6E05;&#x6670;&#x548C;&#x65B9;&#x4FBF;&#x5F88;&#x591A;&#x3002;</p><p>ES5 &#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x5B9E;&#x8D28;&#x662F;&#x5148;&#x521B;&#x9020;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;this&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x5230;this&#x4E0A;&#x9762;&#xFF08;Parent.apply(this)&#xFF09;&#x3002;ES6 &#x7684;&#x7EE7;&#x627F;&#x673A;&#x5236;&#x5B8C;&#x5168;&#x4E0D;&#x540C;&#xFF0C;&#x5B9E;&#x8D28;&#x662F;&#x5148;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x52A0;&#x5230;this&#x4E0A;&#x9762;&#xFF08;&#x6240;&#x4EE5;&#x5FC5;&#x987B;&#x5148;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7528;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4FEE;&#x6539;this&#x3002;</p><p><strong>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;class&#x5173;&#x952E;&#x5B57;&#x53EA;&#x662F;&#x539F;&#x578B;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;JavaScript&#x7EE7;&#x627F;&#x4ECD;&#x7136;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x5B9E;&#x73B0;&#x7684;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       class Person {
            //&#x8C03;&#x7528;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;
            constructor(name, age) {
                this.name = name
                this.age = age
            }
            //&#x5B9A;&#x4E49;&#x4E00;&#x822C;&#x7684;&#x65B9;&#x6CD5;
            showName() {
                console.log(&quot;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&quot;)
                console.log(this.name, this.age);
            }
        }
        let p1 = new  Person(&apos;kobe&apos;, 39)
        console.log(p1)
        //&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5B50;&#x7C7B;
        class Student extends Person {
            constructor(name, age, salary) {
                super(name, age)//&#x901A;&#x8FC7;super&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;
                this.salary = salary
            }
            showName() {//&#x5728;&#x5B50;&#x7C7B;&#x81EA;&#x8EAB;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;
                console.log(&quot;&#x8C03;&#x7528;&#x5B50;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&quot;)
                console.log(this.name, this.age, this.salary);
            }
        }
        let s1 = new Student(&apos;wade&apos;, 38, 1000000000)
        console.log(s1)
        s1.showName()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>       <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
            <span class="hljs-comment">//&#x8C03;&#x7528;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;</span>
            <span class="hljs-keyword">constructor</span>(name, age) {
                <span class="hljs-keyword">this</span>.name = name
                <span class="hljs-keyword">this</span>.age = age
            }
            <span class="hljs-comment">//&#x5B9A;&#x4E49;&#x4E00;&#x822C;&#x7684;&#x65B9;&#x6CD5;</span>
            showName() {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&quot;</span>)
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name, <span class="hljs-keyword">this</span>.age);
            }
        }
        <span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span>  Person(<span class="hljs-string">&apos;kobe&apos;</span>, <span class="hljs-number">39</span>)
        <span class="hljs-built_in">console</span>.log(p1)
        <span class="hljs-comment">//&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5B50;&#x7C7B;</span>
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
            <span class="hljs-keyword">constructor</span>(name, age, salary) {
                <span class="hljs-keyword">super</span>(name, age)<span class="hljs-comment">//&#x901A;&#x8FC7;super&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;</span>
                <span class="hljs-keyword">this</span>.salary = salary
            }
            showName() {<span class="hljs-comment">//&#x5728;&#x5B50;&#x7C7B;&#x81EA;&#x8EAB;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8C03;&#x7528;&#x5B50;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&quot;</span>)
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name, <span class="hljs-keyword">this</span>.age, <span class="hljs-keyword">this</span>.salary);
            }
        }
        <span class="hljs-keyword">let</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">&apos;wade&apos;</span>, <span class="hljs-number">38</span>, <span class="hljs-number">1000000000</span>)
        <span class="hljs-built_in">console</span>.log(s1)
        s1.showName()</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016708015" src="https://static.alili.tech/img/remote/1460000016708015" alt="image" title="image" style="cursor:pointer;display:inline"></span><br><strong>&#x4F18;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x8BED;&#x6CD5;&#x7B80;&#x5355;&#x6613;&#x61C2;,&#x64CD;&#x4F5C;&#x66F4;&#x65B9;&#x4FBF;</li></ul><p><strong>&#x7F3A;&#x70B9;</strong>&#xFF1A;</p><ul><li>&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x652F;&#x6301;class&#x5173;&#x952E;&#x5B57;</li></ul><p><strong>&#x6587;&#x7AE0;&#x4E8E;2018.10.11&#x91CD;&#x65B0;&#x4FEE;&#x6539;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x4F60;&#x4EEC;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;!</strong></p><h2 id="articleHeader7">&#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><h3 id="articleHeader8"><a href="http://www.cnblogs.com/humin/p/4556820.html" rel="nofollow noreferrer" target="_blank">JS&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;</a></h3><h3 id="articleHeader9"><a href="https://github.com/mqyqingfeng/Blog/issues/16" rel="nofollow noreferrer" target="_blank">JavaScript&#x6DF1;&#x5165;&#x4E4B;&#x7EE7;&#x627F;&#x7684;&#x591A;&#x79CD;&#x65B9;&#x5F0F;&#x548C;&#x4F18;&#x7F3A;&#x70B9;</a></h3><h3 id="articleHeader10"><a href="https://juejin.im/entry/5993eeaa51882524382f3c0b" rel="nofollow noreferrer" target="_blank">JavaScript&#x5E38;&#x89C1;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;</a></h3><h3 id="articleHeader11"><a href="http://es6.ruanyifeng.com/#docs/class-extends" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;ES6&#x5165;&#x95E8;&#x4E4B;class&#x7684;&#x7EE7;&#x627F;</a></h3>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript常见的六种继承方式

## 原文链接
[https://segmentfault.com/a/1190000016708006](https://segmentfault.com/a/1190000016708006)


---
title: '用愚公移山说明Javascript创建对象的各种姿势' 
date: 2018-11-29 9:27:38
hidden: true
slug: 1hwbwm4nttg
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x2003;&#x2003;&#x592A;&#x884C;&#x3001;&#x738B;&#x5C4B;&#x4E8C;&#x5C71;,&#x65B9;&#x4E03;&#x767E;&#x91CC;,&#x9AD8;&#x4E07;&#x4EDE;&#x3002;&#x672C;&#x5728;&#x5180;&#x5DDE;&#x4E4B;&#x5357;,&#x6CB3;&#x9633;&#x4E4B;&#x5317;.......</p>
<p>&#x2003;&#x2003;&#x55EF;&#xFF0C;&#x6309;&#x7167;&#x60EF;&#x4F8B;&#xFF0C;&#x7B2C;&#x4E00;&#x53E5;&#x8BDD;&#x5C31;&#x662F;&#x9A97;&#x4F60;&#x4EEC;&#x70B9;&#x8FDB;&#x6765;&#x7684;&#x3002;&#x5728;&#x8BFB;&#x672C;&#x6587;&#x4E4B;&#x524D;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x5BF9;Javascript&#x7684;&#x539F;&#x578B;&#x548C;&#x539F;&#x578B;&#x94FE;&#x6709;&#x4E00;&#x5B9A;&#x4E86;&#x89E3;&#xFF0C;&#x8FD9;&#x6709;&#x52A9;&#x4E8E;&#x4F60;&#x66F4;&#x597D;&#x7684;&#x7406;&#x89E3;&#x672C;&#x6587;&#xFF0C;&#x4E4B;&#x524D;&#x6709;&#x5199;&#x8FC7;&#x4E00;&#x7BC7;&#x76F8;&#x5173;&#x6587;&#x7AE0;&#xFF0C;<a href="https://juejin.im/post/5af2a5a76fb9a07ab4589cd7" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x6B64;&#x9605;&#x8BFB;</a>&#x3002;&#x4F46;&#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;&#x3002;</p>
<p>&#x2003;&#x2003;&#x90FD;&#x9000;&#x540E;&#xFF0C;&#x6211;&#x8981;&#x7EE7;&#x7EED;&#x8BB2;&#x6545;&#x4E8B;&#x4E86;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015179073?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000015179073?w=200&amp;h=200" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x2003;&#x2003;&#x5317;&#x5C71;&#x611A;&#x516C;&#x8005;,&#x5E74;&#x4E14;&#x4E5D;&#x5341;,&#x9762;&#x5C71;&#x800C;&#x5C45;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    name : &apos;&#x611A;&#x516C;&apos;,
    age: 90,
    address: &apos;&#x5317;&#x5C71;&#x811A;&#x4E0B;&apos;,
    whereToLive: function () {
        alert(this.address)
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span> : <span class="hljs-string">&apos;&#x611A;&#x516C;&apos;</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">90</span>,
    <span class="hljs-attr">address</span>: <span class="hljs-string">&apos;&#x5317;&#x5C71;&#x811A;&#x4E0B;&apos;</span>,
    <span class="hljs-attr">whereToLive</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-keyword">this</span>.address)
    }
};</code></pre>
<p>&#x2003;&#x2003;......&#x5317;&#x5C71;&#x611A;&#x516C;&#x66F0;&#xFF1A;&#x201C;&#x867D;&#x6211;&#x4E4B;&#x6B7B;,&#x6709;&#x5B50;&#x5B58;&#x7109;&#xFF1B;&#x5B50;&#x53C8;&#x751F;&#x5B59;,&#x5B59;&#x53C8;&#x751F;&#x5B50;&#xFF1B;&#x5B50;&#x53C8;&#x6709;&#x5B50;,&#x5B50;&#x53C8;&#x6709;&#x5B59;&#xFF1B;&#x5B50;&#x5B50;&#x5B59;&#x5B59;&#x65E0;&#x7A77;&#x532E;&#x4E5F;&#x201D;&#x3002;</p>
<p>&#x2003;&#x2003;&#x770B;&#x5230;&#x8FD9;&#x513F;&#xFF0C;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x611A;&#x516C;&#x7684;&#x5B50;&#x5B50;&#x5B59;&#x5B59;&#x90A3;&#x4E48;&#x591A;&#xFF0C;&#x663E;&#x7136;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x53BB;&#x521B;&#x5EFA;&#x662F;&#x4E0D;&#x5408;&#x7406;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x7B2C;&#x4E00;&#x79CD;&#x521B;&#x5EFA;&#x65B9;&#x5F0F;&#x3002;</p>
<h3 id="articleHeader0">&#x5DE5;&#x5382;&#x6A21;&#x5F0F;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createPerson (name, age, address){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.address = address;
    o.whereToLive = function () {
        alert(this.address)
    };
    return o;
}

var son = createPerson(&apos;&#x611A;&#x5C0F;&#x516C;&apos;, 30, &apos;&#x5317;&#x5C71;&apos;);
var grandSon = createPerson(&apos;&#x611A;&#x5C0F;&#x5C0F;&#x516C;&apos;, 5, &apos;&#x5317;&#x5C71;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPerson</span> (<span class="hljs-params">name, age, address</span>)</span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    o.name = name;
    o.age = age;
    o.address = address;
    o.whereToLive = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-keyword">this</span>.address)
    };
    <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> son = createPerson(<span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x516C;&apos;</span>, <span class="hljs-number">30</span>, <span class="hljs-string">&apos;&#x5317;&#x5C71;&apos;</span>);
<span class="hljs-keyword">var</span> grandSon = createPerson(<span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x5C0F;&#x516C;&apos;</span>, <span class="hljs-number">5</span>, <span class="hljs-string">&apos;&#x5317;&#x5C71;&apos;</span>);</code></pre>
<p>&#x2003;&#x2003;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x6BD4;&#x8F83;&#x660E;&#x663E;&#x7684;&#x4E00;&#x4E2A;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x7531;&#x4E8E;&#x751F;&#x6210;&#x5E76;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x5224;&#x65AD;&#x5BF9;&#x8C61;&#x7684;&#x7C7B;&#x578B;&#x3002;</p>
<h3 id="articleHeader1">&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.whereToLive = function(){
            alert(this.address);
        }; 
}
var son = new Person(&apos;&#x611A;&#x5C0F;&#x516C;&apos;, 30, &apos;&#x5317;&#x5C71;&apos;);
var grandSon = new Person(&apos;&#x611A;&#x5C0F;&#x5C0F;&#x516C;&apos;, 5, &apos;&#x5317;&#x5C71;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age, address</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
        <span class="hljs-keyword">this</span>.address = address;
        <span class="hljs-keyword">this</span>.whereToLive = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            alert(<span class="hljs-keyword">this</span>.address);
        }; 
}
<span class="hljs-keyword">var</span> son = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x516C;&apos;</span>, <span class="hljs-number">30</span>, <span class="hljs-string">&apos;&#x5317;&#x5C71;&apos;</span>);
<span class="hljs-keyword">var</span> grandSon = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x5C0F;&#x516C;&apos;</span>, <span class="hljs-number">5</span>, <span class="hljs-string">&apos;&#x5317;&#x5C71;&apos;</span>);</code></pre>
<p>&#x2003;&#x2003;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0E;&#x666E;&#x901A;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x5F02;&#x5904;&#xFF0C;&#x6CA1;&#x6709;&#x8BED;&#x6CD5;&#x4E0A;&#x7684;&#x4EFB;&#x4F55;&#x5DEE;&#x522B;&#xFF0C;&#x53EA;&#x662F;&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;&#x4E86;new&#x5173;&#x952E;&#x5B57;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x6709;&#x5FC5;&#x8981;&#x8BF4;&#x4E00;&#x4E0B;new&#x5230;&#x5E95;&#x5E72;&#x4E86;&#x4EC0;&#x4E48;&#xFF1A;</p>
<ol>
<li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;</li>
<li>&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x4E8E;&#x8D4B;&#x7ED9;&#x8FD9;&#x4E2A;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;</li>
<li>&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x4EE3;&#x7801;</li>
<li>&#x8FD4;&#x56DE;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;</li>
</ol>
<p>&#x2003;&#x2003;&#x4EE5;&#x8FD9;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#x4E3A;&#x4F8B;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x7B2C;&#x4E8C;&#x6B65;&#x548C;&#x7B2C;&#x4E09;&#x6B65;&#x7684;&#x64CD;&#x4F5C;&#x53EF;&#x4EE5;&#x603B;&#x7ED3;&#x4E3A;<code>Person.apply(newObject,arguments)</code>&#xFF0C;&#x8FD9;&#x91CC;&#x987A;&#x4FBF;&#x8BF4;&#x4E00;&#x53E5;bind&#x4E0E;call/apply&#x7684;&#x4E00;&#x4E2A;&#x533A;&#x522B;&#xFF0C;bind&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;call/apply&#x662F;&#x987A;&#x5E26;&#x628A;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7ED9;&#x6267;&#x884C;&#x4E86;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x6267;&#x884C;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x3002;</p>
<p>&#x2003;&#x2003;&#x90A3;&#x4E48;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x5462;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x663E;&#x800C;&#x6613;&#x89C1;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x611A;&#x516C;&#x6709;&#x4E00;&#x5343;&#x4E2A;&#x5B50;&#x5B50;&#x5B59;&#x5B59;&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x4E2A;&#x5B50;&#x5B59;&#x90FD;&#x4F1A;&#x81EA;&#x5E26;&#x4E00;&#x4E2A;<code>whereToLive</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x663E;&#x7136;&#x8FD9;&#x79CD;&#x505A;&#x6CD5;&#x4E0D;&#x6587;&#x827A;&#x8303;&#x513F;</p>
<h3 id="articleHeader2">&#x539F;&#x578B;&#x6A21;&#x5F0F;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person () {
    
}

Person.prototype.name = &apos;&#x611A;&#x516C;&apos;;
Person.prototype.age = 90;
Person.prototype.address = &apos;&#x5317;&#x5C71;&apos;;
Person.prototype.whereToLive = function () {
    alert(this.address); 
};

var son = new Person();
var grandSon = new Person();
son.name = &apos;&#x611A;&#x5C0F;&#x516C;&apos;;
son.address = &apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;;


son.whereToLive();   //  &apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;
grandSon.whereToLive();   //  &apos;&#x5317;&#x5C71;&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params"></span>) </span>{
    
}

Person.prototype.name = <span class="hljs-string">&apos;&#x611A;&#x516C;&apos;</span>;
Person.prototype.age = <span class="hljs-number">90</span>;
Person.prototype.address = <span class="hljs-string">&apos;&#x5317;&#x5C71;&apos;</span>;
Person.prototype.whereToLive = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-keyword">this</span>.address); 
};

<span class="hljs-keyword">var</span> son = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> grandSon = <span class="hljs-keyword">new</span> Person();
son.name = <span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x516C;&apos;</span>;
son.address = <span class="hljs-string">&apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;</span>;


son.whereToLive();   <span class="hljs-comment">//  &apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;</span>
grandSon.whereToLive();   <span class="hljs-comment">//  &apos;&#x5317;&#x5C71;&apos;</span>
</code></pre>
<p>&#x2003;&#x2003;&#x6211;&#x4EEC;&#x5728;son&#x5BF9;&#x8C61;&#x4E0A;&#x8BD5;&#x56FE;&#x4FEE;&#x6539;address&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4E14;&#x4F3C;&#x4E4E;&#x770B;&#x8D77;&#x6765;&#x4E5F;&#x4FEE;&#x6539;&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x5F71;&#x54CD;&#x5230;grandSon&#x7684;&#x5C5E;&#x6027;&#x3002;&#x6240;&#x4EE5;&#x5176;&#x5B9E;&#x8FD9;&#x4E24;&#x4E2A;address&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x5728;&#x505A;&#x5982;&#x4E0B;&#x64CD;&#x4F5C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delete son.address;
son.whereToLive();   //  &apos;&#x5317;&#x5C71;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">delete</span> son.address;
son.whereToLive();   <span class="hljs-comment">//  &apos;&#x5317;&#x5C71;&apos;</span></code></pre>
<p>&#x2003;&#x2003;&#x6211;&#x4EEC;&#x5220;&#x6389;&#x4E86;son&#x7684;address&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;son&#x7684;address&#x53C8;&#x6210;&#x4E86;&#x539F;&#x578B;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x503C;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;&#x4FEE;&#x6539;address&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#x5E76;&#x6CA1;&#x6709;&#x52A8;&#x5230;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x503C;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#x65B0;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x3002;&#x5E76;&#x4E14;&#x5728;&#x8BD5;&#x56FE;&#x83B7;&#x53D6;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x4F18;&#x5148;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;&#x6211;&#x4EEC;&#x7BA1;&#x8FD9;&#x4E2A;&#x73B0;&#x8C61;&#x53EB;&#x5C5E;&#x6027;&#x5C4F;&#x853D;&#x3002;</p>
<p>&#x2003;&#x2003;&#x53E6;&#x5916;&#x591A;&#x63D0;&#x4E00;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x8BFB;&#x53D6;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9996;&#x5148;&#x4F1A;&#x67E5;&#x770B;&#x8BE5;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x6709;&#x6CA1;&#x6709;&#xFF0C;&#x6CA1;&#x6709;&#x7684;&#x8BDD;&#x4F1A;&#x987A;&#x7740;&#x539F;&#x578B;&#x94FE;&#x4E00;&#x76F4;&#x5411;&#x4E0A;&#x67E5;&#x627E;&#xFF0C;&#x5982;&#x679C;&#x8FBE;&#x5230;&#x539F;&#x578B;&#x94FE;&#x9876;&#x5C42;&#x90FD;&#x6CA1;&#x6709;&#x627E;&#x5230;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;undefined&#x3002;&#x8FD9;&#x91CC;&#x518D;&#x7A7F;&#x63D2;&#x4E00;&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#x3002;&#x5F88;&#x591A;&#x521A;&#x5165;&#x95E8;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x4F1A;&#x72AF;&#x8FD9;&#x6837;&#x7684;&#x9519;&#x8BEF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {};
console.log(a.b.c)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = {};
<span class="hljs-built_in">console</span>.log(a.b.c)</code></pre>
<p>&#x2003;&#x2003;&#x5728;&#x6CA1;&#x6709;&#x6821;&#x9A8C;b&#x5C5E;&#x6027;&#x662F;&#x5426;&#x5B58;&#x5728;&#x4FBF;&#x53BB;&#x8BD5;&#x56FE;&#x83B7;&#x53D6;c&#x5C5E;&#x6027;&#x3002;&#x5982;&#x679C;&#x5230;&#x4E86;&#x539F;&#x578B;&#x94FE;&#x7684;&#x9876;&#x7AEF;&#x90FD;&#x6CA1;&#x6709;&#x627E;&#x5230;b&#xFF0C;a.b&#x7684;&#x503C;&#x5219;&#x4E3A;undefined&#xFF0C;&#x6240;&#x4EE5;&#x83B7;&#x53D6;undefined&#x7684;c&#x5C5E;&#x6027;&#x4E00;&#x5B9A;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x6B63;&#x786E;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x5728;&#x4E0D;&#x786E;&#x5B9A;&#x662F;&#x5426;&#x5B58;&#x5728;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E94;&#x5F53;&#x5148;&#x505A;&#x5224;&#x65AD;&#x3002;</p>
<p>&#x2003;&#x2003;&#x4F46;&#x662F;&#x5728;&#x5199;&#x5165;<strong>&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x5C5E;&#x6027;</strong>&#x7684;&#x65F6;&#x5019;&#x6709;&#x6240;&#x4E0D;&#x540C;&#xFF0C;&#x5728;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x8981;&#x5199;&#x5165;&#x7684;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x5411;&#x4E0A;&#x67E5;&#x627E;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x91CC;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E48;&#x505A;&#x7684;&#x539F;&#x56E0;&#x662F;&#x9632;&#x6B62;&#x6C61;&#x67D3;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;&#x7EC6;&#x5FC3;&#x7684;&#x4F60;&#x53EF;&#x80FD;&#x53D1;&#x73B0;&#x4E86;&#x6211;&#x5728;&#x5F00;&#x5934;&#x7684;&#x65F6;&#x5019;&#x5F3A;&#x8C03;&#x4E86;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x5C5E;&#x6027;&#x3002;&#x5982;&#x679C;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x4F1A;&#x600E;&#x4E48;&#x6837;&#x5462;&#xFF1F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person () {
    
}

Person.prototype.name = &apos;&#x611A;&#x516C;&apos;;
Person.prototype.age = 90;
Person.prototype.address = [&apos;&#x5317;&#x5C71;&apos;];
Person.prototype.whereToLive = function () {
    alert(this.address); 
};

var son = new Person();
var grandSon = new Person();
son.address.push(&apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;);

grandSon.whereToLive();   //  &apos;&#x5317;&#x5C71;&apos;,&apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params"></span>) </span>{
    
}

Person.prototype.name = <span class="hljs-string">&apos;&#x611A;&#x516C;&apos;</span>;
Person.prototype.age = <span class="hljs-number">90</span>;
Person.prototype.address = [<span class="hljs-string">&apos;&#x5317;&#x5C71;&apos;</span>];
Person.prototype.whereToLive = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-keyword">this</span>.address); 
};

<span class="hljs-keyword">var</span> son = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> grandSon = <span class="hljs-keyword">new</span> Person();
son.address.push(<span class="hljs-string">&apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;</span>);

grandSon.whereToLive();   <span class="hljs-comment">//  &apos;&#x5317;&#x5C71;&apos;,&apos;&#x5C71;&#x7684;&#x90A3;&#x8FB9;&apos;</span>
</code></pre>
<p>&#x2003;&#x2003;&#x8FD9;&#x91CC;&#x53C8;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x662F;&#x5B58;&#x5728;&#x5806;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#xFF0C;&#x4E0D;&#x540C;&#x5730;&#x65B9;&#x7684;&#x5E94;&#x7528;&#x5176;&#x5B9E;&#x6307;&#x5411;&#x7684;&#x662F;&#x540C;&#x4E00;&#x5757;&#x5806;&#x5185;&#x5B58;&#x3002;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x8BD5;&#x56FE;&#x4FEE;&#x6539;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5E94;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x4F1A;&#x9020;&#x6210;&#x5168;&#x5C40;&#x6C61;&#x67D3;&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x662F;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x7684;&#x4E00;&#x4E2A;&#x81F4;&#x547D;&#x7F3A;&#x70B9;&#x3002;</p>
<h3 id="articleHeader3">&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x548C;&#x539F;&#x578B;&#x6A21;&#x5F0F;</h3>
<p>&#x2003;&#x2003;&#x5750;&#x7A33;&#xFF0C;&#x6211;&#x53C8;&#x8981;&#x7A7F;&#x63D2;&#x65B0;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x7B80;&#x5199;&#x7684;&#x65B9;&#x5F0F;&#x907F;&#x514D;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x8D4B;&#x4E88;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x65F6;&#x5570;&#x55E6;&#x7684;&#x95EE;&#x9898;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
}
Person.prototype = {
    constructor : Person,  // &#x624B;&#x52A8;&#x4FEE;&#x6539;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;
    whereToLive : function () {
        alert(this.address); 
    },
    howOld : function () {
        alert(this.age); 
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age, address</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
        <span class="hljs-keyword">this</span>.address = address;
}
Person.prototype = {
    <span class="hljs-attr">constructor</span> : Person,  <span class="hljs-comment">// &#x624B;&#x52A8;&#x4FEE;&#x6539;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;</span>
    whereToLive : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-keyword">this</span>.address); 
    },
    <span class="hljs-attr">howOld</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-keyword">this</span>.age); 
    }
}</code></pre>
<p>&#x2003;&#x2003;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x548C;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x4E0D;&#x662F;&#x540C;&#x65F6;&#x89C4;&#x907F;&#x6389;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x548C;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x7684;&#x95EE;&#x9898;&#x5462;&#xFF1F;&#x65E2;&#x53EF;&#x4EE5;&#x5171;&#x4EAB;&#x516C;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x8BA9;&#x6BCF;&#x4E2A;&#x5BF9;&#x8C61;&#x72EC;&#x4EAB;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x3002;</p>
<p>&#x2003;&#x2003;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x91CD;&#x5199;<code>Person.prototype</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F7F;&#x5F97;constructor&#x6307;&#x5411;&#x4E86;Object&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x4E86;&#x624B;&#x52A8;&#x4FEE;&#x6B63;&#x3002;</p>
<h3 id="articleHeader4">&#x5BC4;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function PersonList (name, age, address){
    var o = new Array();
    o.push.apply(o, arguments);
    o.consoleString = function () {
       return this.join(&quot;,&quot;);
    };
    return o;
}

var list = new PersonList(&apos;&#x611A;&#x5C0F;&#x516C;&apos;, &apos;&#x611A;&#x5C0F;&#x5C0F;&#x516C;&apos;);
alert(list.consoleString());" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PersonList</span> (<span class="hljs-params">name, age, address</span>)</span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    o.push.apply(o, <span class="hljs-built_in">arguments</span>);
    o.consoleString = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.join(<span class="hljs-string">&quot;,&quot;</span>);
    };
    <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> list = <span class="hljs-keyword">new</span> PersonList(<span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x516C;&apos;</span>, <span class="hljs-string">&apos;&#x611A;&#x5C0F;&#x5C0F;&#x516C;&apos;</span>);
alert(list.consoleString());</code></pre>
<p>&#x2003;&#x2003;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x773C;&#x719F;&#xFF0C;&#x8DDF;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;&#x4E86;new&#x5173;&#x952E;&#x5B57;&#x3002;&#x5229;&#x7528;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x989D;&#x5916;&#x7684;&#x80FD;&#x529B;&#x3002;&#x672C;&#x4F8B;&#x4E2D;&#xFF0C;&#x5C31;&#x662F;&#x7ED9;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x5176;&#x53EF;&#x4EE5;&#x62E5;&#x6709;&#x6211;&#x4EEC;&#x8D4B;&#x4E88;&#x7684;&#x65B0;&#x80FD;&#x529B;&#x3002;</p>
<h2 id="articleHeader5">&#x7ED3;&#x8BED;</h2>
<p>&#x2003;&#x2003;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x8FD8;&#x662F;&#x5F97;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x573A;&#x666F;&#x7075;&#x6D3B;&#x8FD0;&#x7528;&#xFF0C;&#x603B;&#x6709;&#x9002;&#x5408;&#x4F60;&#x7684;&#x90A3;&#x4E00;&#x6B3E;&#x3002;&#x4ECA;&#x5929;&#x5C31;&#x804A;&#x5230;&#x8FD9;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x8865;&#x5145;&#x548C;&#x6307;&#x6B63;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用愚公移山说明Javascript创建对象的各种姿势

## 原文链接
[https://segmentfault.com/a/1190000015179068](https://segmentfault.com/a/1190000015179068)


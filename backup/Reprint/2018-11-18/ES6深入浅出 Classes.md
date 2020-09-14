---
title: 'ES6深入浅出 Classes' 
date: 2018-11-18 2:30:10
hidden: true
slug: jhgltx5vwbk
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x4E00;&#x6B65;&#xFF0C;&#x4E00;&#x6B65;&#x524D;&#x9032;&#x306E;&#x4E00;&#x6B65;</blockquote><p>ES6&#x6DF1;&#x5165;&#x6D45;&#x51FA;&#x4E4B;Classes&#x3002;&#x7FFB;&#x8BD1;&#x7684;&#x540C;&#x65F6;&#x4E71;&#x52A0;&#x4E2A;&#x4EBA;&#x89C1;&#x89E3;&#xFF0C;&#x5F3A;&#x70C8;&#x63A8;&#x8350;&#x9605;&#x8BFB;&#x539F;&#x4F5C;&#x8005;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x8A00;&#x7B80;&#x610F;&#x8D45;&#x3002;<a href="https://ponyfoo.com/articles/es6-classes-in-depth" rel="nofollow noreferrer" target="_blank">es6-classes-in-depth</a></p><h2 id="articleHeader0"><code>&#x7C7B;</code>&#x8BED;&#x6CD5;&#x672C;&#x8D28;</h2><p>JS &#x662F;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x90A3;&#x4E48;ES6&#x91CC;&#x7684;<code>classes</code>&#x662F;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#xFF1F;classes &#x662F;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;------&#x4E3B;&#x8981;&#x662F;&#x7528;&#x6765;&#x52FE;&#x5F15;&#x4E0D;&#x592A;&#x7406;&#x89E3; JS &#x539F;&#x578B;&#x94FE;&#x8BED;&#x6CD5;&#x7684;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x4F7F;&#x7528;&#x8005;&#x3002;ES6&#x6709;&#x597D;&#x591A;&#x65B0;&#x7684;&#x7279;&#x6027;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;<code>&#x8BED;&#x6CD5;&#x7CD6;</code>&#xFF0C;classes&#x4E5F;&#x4E0D;&#x4F8B;&#x5916;&#x3002;&#x6211;&#x4F1A;&#x5411;&#x4F60;&#x8BC1;&#x660E; classes &#x662F;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x56E0;&#x4E3A;classes &#x7684;&#x8BED;&#x6CD5;&#x5F88;&#x5BB9;&#x6613;&#x4F7F;&#x7528; ES5&#x7684;&#x8BED;&#x6CD5;&#x5B9E;&#x73B0;&#x51FA;&#x6765;&#xFF0C;classes &#x5E76;&#x4E0D;&#x662F;JS &#x8BED;&#x6CD5;&#x7684;&#x4E00;&#x4E2A;&#x53D8;&#x9769;&#xFF0C;&#x5B83;&#x5B58;&#x5728;&#x7684;&#x76EE;&#x7684;&#x4EC5;&#x4EC5;&#x662F;&#x4F7F;<code>&#x539F;&#x578B;&#x7EE7;&#x627F;</code>&#x53D8;&#x5F97;&#x7B80;&#x5355;&#x3002;</p><h2 id="articleHeader1"><code>ES5</code>&#x548C; <code>ES6</code>&#x7684;&#x7C7B;&#x5B9E;&#x73B0;&#x5BF9;&#x6BD4;</h2><p>&#x90A3;&#x4E48;&#xFF0C;&#x6211;&#x5047;&#x8BBE;&#x4F60;&#x5DF2;&#x7ECF;&#x5F88;&#x597D;&#x7684;&#x7406;&#x89E3;&#x4E86;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x7684;&#x539F;&#x7406;,&#x6BD5;&#x7ADF;&#x4F60;&#x5DF2;&#x7ECF;&#x5728;&#x9605;&#x8BFB;ES6&#x8FD9;&#x4E48;&#x9AD8;&#x7EA7;&#x7684;&#x4E1C;&#x897F;&#x4E86;&#x3002;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x5B9A;&#x4E49;&#x8F66;&#x7684;&#x7C7B;&#xFF0C;&#x53EF;&#x88AB;&#x5B9E;&#x4F8B;&#x5316;,&#x52A0;&#x6CB9;,&#x79FB;&#x52A8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Car () {
  this.fuel = 0;
  this.distance = 0;
}

Car.prototype.move = function () {
  if (this.fuel &lt; 1) {
    throw new RangeError(&apos;Fuel tank is depleted&apos;)
  }
  this.fuel--
  this.distance += 2
}

Car.prototype.addFuel = function () {
  if (this.fuel &gt;= 60) {
    throw new RangeError(&apos;Fuel tank is full&apos;)
  }
  this.fuel++
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Car</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.fuel = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.distance = <span class="hljs-number">0</span>;
}

Car.prototype.move = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.fuel &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">&apos;Fuel tank is depleted&apos;</span>)
  }
  <span class="hljs-keyword">this</span>.fuel--
  <span class="hljs-keyword">this</span>.distance += <span class="hljs-number">2</span>
}

Car.prototype.addFuel = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.fuel &gt;= <span class="hljs-number">60</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">&apos;Fuel tank is full&apos;</span>)
  }
  <span class="hljs-keyword">this</span>.fuel++
}</code></pre><p>&#x4F7F;&#x7528;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4F7F;&#x8F66;&#x8DD1;&#x8D77;&#x6765;&#x5427;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var car = new Car()
car.addFuel()
car.move()
car.move()
// &lt;- RangeError: &apos;Fuel tank is depleted&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> car = <span class="hljs-keyword">new</span> Car()
car.addFuel()
car.move()
car.move()
<span class="hljs-comment">// &lt;- RangeError: &apos;Fuel tank is depleted&apos;</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x662F; ES5&#xFF0C;&#x90A3;&#x4E48; ES6&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x7C7B;&#x58F0;&#x660E;&#x7684;&#x4E66;&#x5199;&#x548C;&#x5BF9;&#x8C61;&#x7684;&#x5199;&#x6CD5;&#x5341;&#x5206;&#x76F8;&#x4F3C;&#xFF0C;&#x82B1;&#x62EC;&#x53F7;&#x524D;&#x9762;&#x53EA;&#x591A;&#x4E86; <code>class Name</code>,&#x7C7B;&#x65B9;&#x6CD5;&#x6211;&#x4EEC;&#x5C06;&#x91C7;&#x7528;&#x65B9;&#x6CD5;&#x540D;&#x7B80;&#x5199;&#x7684;&#x5F62;&#x5F0F;&#x3002;contrustor &#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x5728;&#x91CC;&#x9762;&#x521D;&#x59CB;&#x5316;&#x6211;&#x4EEC;&#x60F3;&#x521D;&#x59CB;&#x5316;&#x7684;&#x4E1C;&#x897F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Car {
  constructor () {
    this.fuel = 0
    this.distance = 0
  }
  move () {
    if (this.fuel &lt; 1) {
      throw new RangeError(&apos;Fuel tank is depleted&apos;)
    }
    this.fuel--
    this.distance += 2
  }
  addFuel () {
    if (this.fuel &gt;= 60) {
      throw new RangeError(&apos;Fuel tank is full&apos;)
    }
    this.fuel++
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.fuel = <span class="hljs-number">0</span>
    <span class="hljs-keyword">this</span>.distance = <span class="hljs-number">0</span>
  }
  move () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.fuel &lt; <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">&apos;Fuel tank is depleted&apos;</span>)
    }
    <span class="hljs-keyword">this</span>.fuel--
    <span class="hljs-keyword">this</span>.distance += <span class="hljs-number">2</span>
  }
  addFuel () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.fuel &gt;= <span class="hljs-number">60</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RangeError</span>(<span class="hljs-string">&apos;Fuel tank is full&apos;</span>)
    }
    <span class="hljs-keyword">this</span>.fuel++
  }
}</code></pre><p>&#x9700;&#x8981;&#x5F3A;&#x8C03;&#x7684;&#x662F;&#xFF1A;&#x7C7B;&#x548C;&#x5BF9;&#x8C61;&#x58F0;&#x660E;&#x5199;&#x8D77;&#x6765;&#x662F;&#x5F88;&#x50CF;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x7C7B;&#x4E2D;&#x5C5E;&#x6027;&#x53CA;&#x65B9;&#x6CD5;&#x95F4;&#x662F;&#x4E0D;&#x5141;&#x8BB8;&#x4F7F;&#x7528;<code>&#x9017;&#x53F7;</code>&#x5206;&#x9694;&#x7684;&#xFF0C;&#x5206;&#x53F7;&#x5012;&#x662F;&#x6CA1;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader2">&#x7C7B;&#x9759;&#x6001;&#x65B9;&#x6CD5;</h2><p>&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7C7B;&#x662F;&#x6709;<code>&#x9759;&#x6001;&#x65B9;&#x6CD5;</code>&#x7684;&#x3002;&#x56DE;&#x60F3;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x65E5;&#x5E38;&#x4F7F;&#x7528;&#x6700;&#x591A;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5E38;&#x89C1;&#x7684;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x6709;<code>.filter</code>&#x3001; <code>.reduce</code>&#x3001; <code>.map</code>,&#x7C7B;&#x65B9;&#x6CD5;&#x6709;<code>Array.isArray</code>&#x3002;ES5&#x4E2D;&#x6DFB;&#x52A0;&#x7C7B;&#x65B9;&#x6CD5;&#x5341;&#x5206;&#x5BB9;&#x6613;(&#x7C7B;&#x65B9;&#x6CD5;&#x548C;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es5
function Car () {
  this.topSpeed = Math.random()
}
Car.isFaster = function (left, right) {
  return left.topSpeed &gt; right.topSpeed
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// es5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Car</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.topSpeed = <span class="hljs-built_in">Math</span>.random()
}
Car.isFaster = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">left, right</span>) </span>{
  <span class="hljs-keyword">return</span> left.topSpeed &gt; right.topSpeed
}</code></pre><p>&#x5728; ES6&#x7684; class &#x8BED;&#x6CD5;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>static</code>&#x5173;&#x952E;&#x5B57;&#x4FEE;&#x9970;&#x65B9;&#x6CD5;&#xFF0C;&#x8FDB;&#x800C;&#x5F97;&#x5230;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Car {
  constructor () {
    this.topSpeed = Math.random()
  }
  static isFaster (left, right) {
    return left.topSpeed &gt; right.topSpeed
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.topSpeed = <span class="hljs-built_in">Math</span>.random()
  }
  <span class="hljs-keyword">static</span> isFaster (left, right) {
    <span class="hljs-keyword">return</span> left.topSpeed &gt; right.topSpeed
  }
}</code></pre><p>&#x90A3;&#x4E48;&#x65E2;&#x7136;&#x8BF4;<code>classes</code>&#x662F;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Car {
  constructor () {
    this.topSpeed = Math.random()
  }
}
Car.isFaster = (left, right) =&gt; {
    return left.topSpeed &gt; right.topSpeed;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.topSpeed = <span class="hljs-built_in">Math</span>.random()
  }
}
Car.isFaster = <span class="hljs-function">(<span class="hljs-params">left, right</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> left.topSpeed &gt; right.topSpeed;
}</code></pre><p>&#x76EE;&#x524D; ES6&#x8FD8;&#x4E0D;&#x652F;&#x6301;&#x4F7F;&#x7528; static &#x6765;&#x4FEE;&#x9970;&#x5C5E;&#x6027;&#xFF0C;&#x82E5;&#x60F3;&#x83B7;&#x5F97;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#xFF0C;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#xFF1F;&#x8BF7;&#x53C2;&#x8003;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#xFF0C;&#x7ED9;&#x51FA;&#x7B54;&#x6848;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x505A;&#x7B54;?<br>&#x63D0;&#x4F9B;&#x53E6;&#x4E00;&#x79CD;&#x601D;&#x8DEF;&#x4F7F;&#x7528; <code>get</code>&#x3001;<code>set</code>&#x5B9E;&#x73B0;&#x9759;&#x6001;&#x5C5E;&#x6027;&#xFF0C;try it.</p><h2 id="articleHeader3">&#x7C7B;&#x7EE7;&#x627F;</h2><p><code>classes</code>&#x4E0D;&#x4EC5;&#x4F7F;&#x7C7B;&#x58F0;&#x660E;&#x53D8;&#x5F97;&#x7B80;&#x5355;&#xFF0C;&#x5B83;&#x8BA9;&#x7EE7;&#x627F;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x53EF;&#x8BFB;&#xFF0C;&#x5BB9;&#x6613;&#x3002;ES6&#x4E2D;&#x7684; <code>extends</code>&#x652F;&#x6301;&#x4ECE;&#x57FA;&#x7C7B;&#x884D;&#x751F;&#x51FA;&#x66F4;&#x5177;&#x4E2A;&#x6027;&#x5316;&#x7684;&#x5B50;&#x7C7B;&#x3002;&#x4F17;&#x6240;&#x5468;&#x77E5;&#xFF0C;&#x7279;&#x65AF;&#x62C9;&#x8F83;&#x5176;&#x4ED6;&#x6C7D;&#x8F66;&#x6BD4;&#x8F83;&#x7701;&#x6CB9;,&#x7279;&#x65AF;&#x62C9;&#x662F;&#x5565;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x57FA;&#x4E8E;&#x4E0A;&#x9762;&#x7684; Car&#x6765;&#x5B9E;&#x73B0;<code>Tesla</code>&#x7C7B;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x610F;&#x601D;&#x662F; Tesla &#x7C7B;&#x7EE7;&#x627F; Car,&#x5E76;&#x590D;&#x5199;<code>Car &#x7238;&#x7238;</code>&#x7684; move &#x65B9;&#x6CD5;&#x8FDB;&#x800C;&#x884C;&#x9A76;&#x66F4;&#x8FDC;&#x7684;&#x8DDD;&#x79BB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Tesla extends Car {
  move () {
    super.move()
    this.distance += 4
  }
}

var car = new Tesla()
car.addFuel()
car.move()
console.log(car.distance)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tesla</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Car</span> </span>{
  move () {
    <span class="hljs-keyword">super</span>.move()
    <span class="hljs-keyword">this</span>.distance += <span class="hljs-number">4</span>
  }
}

<span class="hljs-keyword">var</span> car = <span class="hljs-keyword">new</span> Tesla()
car.addFuel()
car.move()
<span class="hljs-built_in">console</span>.log(car.distance)</code></pre><p>&#x5173;&#x4E8E;&#x7EE7;&#x627F;&#xFF0C;&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x7279;&#x522B;&#x6CE8;&#x610F;&#xFF0C;&#x5F53;&#x5B50;&#x7C7B;&#x60F3;&#x8981;&#x5B9E;&#x73B0;&#x7279;&#x6709;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570; constructor &#x65F6;&#xFF0C;&#x9996;&#x884C;&#x5FC5;&#x987B;&#x4F7F;&#x7528; super(...)&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5148;&#x5F97;&#x5230;&#x7236;&#x7C7B;&#x7684;this&#x4F5C;&#x4E3A;&#x81EA;&#x5DF1;&#x7684; this&#x3002;&#x6B64;&#x5904;&#x7684;&#x7406;&#x8BBA;&#x6709;&#x4E00;&#x70B9;&#x70B9;&#x6DF1;&#xFF0C;&#x6709;&#x673A;&#x4F1A;&#x518D;&#x8BB2;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Car {
  constructor (speed) {
    this.speed = speed
  }
}
class Tesla extends Car {
  constructor (speed) {
    // &#x4E0D;&#x8C03;&#x7528; super &#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;
    super(speed * 2)
    // &#x505A;&#x5176;&#x4ED6;&#x521D;&#x59CB;&#x5316;&#x5DE5;&#x4F5C; &#x3002;&#x3002;&#x3002;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span> (speed) {
    <span class="hljs-keyword">this</span>.speed = speed
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tesla</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span> (speed) {
    <span class="hljs-comment">// &#x4E0D;&#x8C03;&#x7528; super &#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;</span>
    <span class="hljs-keyword">super</span>(speed * <span class="hljs-number">2</span>)
    <span class="hljs-comment">// &#x505A;&#x5176;&#x4ED6;&#x521D;&#x59CB;&#x5316;&#x5DE5;&#x4F5C; &#x3002;&#x3002;&#x3002;</span>
  }
}</code></pre><h2 id="articleHeader4">&#x77E5;&#x8BC6;&#x70B9;&#x603B;&#x7ED3;</h2><ol><li>classes &#x53EA;&#x662F;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x4F7F;&#x7C7B;&#x58F0;&#x660E;&#x548C;&#x7EE7;&#x627F;&#x4E66;&#x5199;&#x53D8;&#x7684;&#x5BB9;&#x6613;</li><li>&#x5B50;&#x7C7B; constructor &#x8981;&#x4E48;&#x6709;&#xFF0C;&#x8981;&#x4E48;&#x9996;&#x884C;&#x8C03;&#x7528;super</li><li>&#x9759;&#x6001;&#x65B9;&#x6CD5;<code>static</code>&#x4FEE;&#x9970;</li><li>&#x5B50;&#x7C7B;&#x4F1A;&#x8986;&#x76D6;&#x7236;&#x7C7B;&#x7684;&#x540C;&#x540D;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; super.xxxx &#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#x3002;</li></ol><p>&#x4E00;&#x6B65;&#x672C;&#x4EBA;&#x4F5C;&#x4E86;&#x4E2A;&#x51B3;&#x5B9A;&#xFF0C;&#x628A;<a href="https://ponyfoo.com/articles/tagged/es6-in-depth" rel="nofollow noreferrer" target="_blank">Nicol&#xE1;s Bevacqua es6-in-depth</a>&#x90FD;&#x7ED9;&#x7FFB;&#x8BD1;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x4FB5;&#x6743;&#x4E86;&#x6211;&#x5C31;&#x7ACB;&#x523B;&#x5220;&#x9664;&#x1F91E;&#x3002;&#x4E0D;&#x77E5;&#x9053;&#x8BE5;&#x5982;&#x4F55;&#x5FEB;&#x901F;&#x63D0;&#x9AD8;&#x4E2A;&#x4EBA;&#x6280;&#x80FD;&#xFF0C;&#x4EBA;&#x8FD8;&#x61D2;&#x3002;&#x671B;&#x5927;&#x5BB6;&#x76D1;&#x7763;&#xFF0C;&#x5404;&#x4F4D;&#x524D;&#x8F88;&#x7ED9;&#x6307;&#x6761;&#x8FDB;&#x6B65;&#x660E;&#x8DEF;&#x4E5F;&#x53EF;&#x4EE5;&#x3002;</p><p><a href="https://ponyfoo.com/articles/es6-classes-in-depth" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;ES6 Classes in Depth</a></p><p>&#x1F31A; &#x524D;&#x7AEF;&#x5B66;&#x4E60;QQ&#x7FA4;: 538631558 &#x1F31A;</p><blockquote>&#x3010;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x63A8;&#x8350;&#x3011;<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> &#x662F;&#x57FA;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x96C6;&#x6210;&#x5F0F;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x652F;&#x6301;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x5305;&#x62EC; HTML5&#x3001;PHP&#x3001;Python&#x3001;Java&#x3001;Ruby&#x3001;C/C++&#x3001;.NET &#x5C0F;&#x7A0B;&#x5E8F;&#x7B49;&#x7B49;&#xFF0C;&#x65E0;&#x9700;&#x4E0B;&#x8F7D;&#x5B89;&#x88C5;&#x7A0B;&#x5E8F;&#xFF0C;&#x4E00;&#x952E;&#x5207;&#x6362;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x3002; Cloud Studio&#x63D0;&#x4F9B;&#x4E86;&#x5B8C;&#x6574;&#x7684; Linux &#x73AF;&#x5883;&#xFF0C;&#x5E76;&#x4E14;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x57DF;&#x540D;&#x6307;&#x5411;&#xFF0C;&#x52A8;&#x6001;&#x8BA1;&#x7B97;&#x8D44;&#x6E90;&#x8C03;&#x6574;&#xFF0C;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5404;&#x79CD;&#x5E94;&#x7528;&#x7684;&#x5F00;&#x53D1;&#x7F16;&#x8BD1;&#x4E0E;&#x90E8;&#x7F72;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6深入浅出 Classes

## 原文链接
[https://segmentfault.com/a/1190000015906873](https://segmentfault.com/a/1190000015906873)


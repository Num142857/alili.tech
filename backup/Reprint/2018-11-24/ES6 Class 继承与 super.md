---
title: 'ES6 Class 继承与 super' 
date: 2018-11-24 2:30:09
hidden: true
slug: rmgm9mkhg2o
categories: [reprint]
---

{{< raw >}}
<p>&#x539F;&#x6587; <a href="https://javascript.info/class-inheritance" rel="nofollow noreferrer" target="_blank">https://javascript.info/class...</a></p><h1 id="articleHeader0">Class &#x7EE7;&#x627F;&#x4E0E; super</h1><p>class &#x53EF;&#x4EE5; extends &#x81EA;&#x53E6;&#x4E00;&#x4E2A; class&#x3002;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x6280;&#x672F;&#x4E0A;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x3002;</p><p>&#x8981;&#x7EE7;&#x627F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x9700;&#x8981;&#x5728; <code>{..}</code> &#x524D;&#x6307;&#x5B9A; <code>extends</code> &#x548C;&#x7236;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x8FD9;&#x4E2A; <code>Rabbit</code> &#x7EE7;&#x627F;&#x81EA; <code>Animal</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }

}


// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}


let rabbit = new Rabbit(&quot;White Rabbit&quot;);

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{

  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.name = name;
  }

  run(speed) {
    <span class="hljs-keyword">this</span>.speed += speed;
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> runs with speed <span class="hljs-subst">${<span class="hljs-keyword">this</span>.speed}</span>.`</span>);
  }

  stop() {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> stopped.`</span>);
  }

}


<span class="hljs-comment">// Inherit from Animal</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  hide() {
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> hides!`</span>);
  }
}


<span class="hljs-keyword">let</span> rabbit = <span class="hljs-keyword">new</span> Rabbit(<span class="hljs-string">&quot;White Rabbit&quot;</span>);

rabbit.run(<span class="hljs-number">5</span>); <span class="hljs-comment">// White Rabbit runs with speed 5.</span>
rabbit.hide(); <span class="hljs-comment">// White Rabbit hides!</span></code></pre><p>&#x5982;&#x4F60;&#x6240;&#x89C1;&#xFF0C;&#x5982;&#x4F60;&#x6240;&#x60F3;&#xFF0C;<code>extend</code> &#x5173;&#x952E;&#x5B57;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5728; <code>Rabbit.prototype</code> &#x6DFB;&#x52A0; <code>[Prototype]]</code>&#xFF0C;&#x5F15;&#x7528;&#x5230; <code>Animal.prototype</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015565619?w=425&amp;h=302" src="https://static.alili.tech/img/remote/1460000015565619?w=425&amp;h=302" alt="" title="" style="cursor:pointer"></span></p><p>&#x6240;&#x4EE5;&#x73B0;&#x5728; <code>rabbit</code> &#x65E2;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; <code>Animal</code> &#x7684;&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader1"><code>extends</code> &#x540E;&#x53EF;&#x8DDF;&#x8868;&#x8FBE;&#x5F0F;</h3><p>Class &#x8BED;&#x6CD5;&#x7684; `extends&apos; &#x540E;&#x63A5;&#x7684;&#x4E0D;&#x9650;&#x4E8E;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x66F4;&#x53EF;&#x4EE5;&#x662F;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p>&#x4F8B;&#x5982;&#x4E00;&#x4E2A;&#x751F;&#x6210;&#x7236;&#x7C7B;&#x7684;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}


class User extends f(&quot;Hello&quot;) {}


new User().sayHi(); // Hello" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>function f(phrase) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
    sayHi() { alert(phrase) }
  }
}


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">f</span>(<span class="hljs-params">&quot;<span class="hljs-type">Hello</span>&quot;</span>) </span>{}


<span class="hljs-keyword">new</span> <span class="hljs-type">User</span>().sayHi(); <span class="hljs-comment">// Hello</span></code></pre><p>&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;<code>class User</code> &#x7EE7;&#x627F;&#x4E86; f(&apos;Hello&apos;)&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x9AD8;&#x7EA7;&#x7F16;&#x7A0B;&#x6A21;&#x5F0F;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x7C7B;&#x662F;&#x6839;&#x636E;&#x8BB8;&#x591A;&#x6761;&#x4EF6;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x6765;&#x751F;&#x6210;&#x65F6;&#xFF0C;&#x8FD9;&#x5C31;&#x5F88;&#x6709;&#x7528;&#x3002;</p><h2 id="articleHeader2">&#x91CD;&#x5199;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;</h2><p>&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x6B65;&#xFF0C;&#x91CD;&#x5199;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;<code>Rabbit</code> &#x4ECE; <code>Animal</code> &#x7EE7;&#x627F;&#x4E86; <code>stop</code> &#x65B9;&#x6CD5;&#xFF0C;<code>this.speed = 0</code>&#x3002;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728; <code>Rabbit</code> &#x4E2D;&#x6307;&#x5B9A;&#x4E86;&#x81EA;&#x5DF1;&#x7684; <code>stop</code>&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x88AB;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Rabbit extends Animal {
  stop() {
    // ...this will be used for rabbit.stop()
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  stop() {
    <span class="hljs-comment">// ...this will be used for rabbit.stop()</span>
  }
}</code></pre><p>......&#x4F46;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x4E0D;&#x60F3;&#x5B8C;&#x5168;&#x66FF;&#x4EE3;&#x7236;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x7236;&#x65B9;&#x6CD5;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x8C03;&#x6574;&#x6216;&#x6269;&#x5C55;&#x5176;&#x529F;&#x80FD;&#x3002;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x8BA9;&#x5B83;&#x4E4B;&#x524D;/&#x4E4B;&#x540E;&#x6216;&#x5728;&#x8FC7;&#x7A0B;&#x4E2D;&#x8C03;&#x7528;&#x7236;&#x65B9;&#x6CD5;&#x3002;</p><p>Class &#x4E3A;&#x6B64;&#x63D0;&#x4F9B; <code>super</code>&#x5173;&#x952E;&#x5B57;&#x3002;</p><ul><li>&#x4F7F;&#x7528; <code>super.method(...)</code> &#x8C03;&#x7528;&#x7236;&#x65B9;&#x6CD5;&#x3002;</li><li>&#x4F7F;&#x7528; <code>super(...)</code> &#x8C03;&#x7528;&#x7236;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF08;&#x4EC5;&#x5728; constructor &#x51FD;&#x6570;&#x4E2D;&#xFF09;&#x3002;</li></ul><p>&#x4F8B;&#x5982;&#xFF0C;&#x8BA9;&#x5154;&#x5B50;&#x5728; <code>stop</code> &#x65F6;&#x81EA;&#x52A8;&#x9690;&#x85CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }


  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }

}

let rabbit = new Rabbit(&quot;White Rabbit&quot;);

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stopped. White rabbit hides!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{

  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.name = name;
  }

  run(speed) {
    <span class="hljs-keyword">this</span>.speed += speed;
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> runs with speed <span class="hljs-subst">${<span class="hljs-keyword">this</span>.speed}</span>.`</span>);
  }

  stop() {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> stopped.`</span>);
  }

}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  hide() {
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> hides!`</span>);
  }


  stop() {
    <span class="hljs-keyword">super</span>.stop(); <span class="hljs-comment">// call parent stop</span>
    <span class="hljs-keyword">this</span>.hide(); <span class="hljs-comment">// and then hide</span>
  }

}

<span class="hljs-keyword">let</span> rabbit = <span class="hljs-keyword">new</span> Rabbit(<span class="hljs-string">&quot;White Rabbit&quot;</span>);

rabbit.run(<span class="hljs-number">5</span>); <span class="hljs-comment">// White Rabbit runs with speed 5.</span>
rabbit.stop(); <span class="hljs-comment">// White Rabbit stopped. White rabbit hides!</span></code></pre><p>&#x73B0;&#x5728;&#xFF0C;<code>Rabbit</code> &#x7684; <code>stop</code> &#x65B9;&#x6CD5;&#x901A;&#x8FC7; <code>super.stop()</code> &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader3">&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x65E0; <code>super</code></h3><p>&#x6B63;&#x5982;&#x5728; arrow-functions &#x4E00;&#x7AE0;&#x4E2D;&#x63D0;&#x5230;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709; <code>super</code>&#x3002;</p><p>&#x5B83;&#x4F1A;&#x4ECE;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x4E2D;&#x83B7;&#x53D6; <code>super</code>&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Rabbit extends Animal {
  stop() {
    setTimeout(() =&gt; super.stop(), 1000); // call parent stop after 1sec
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  stop() {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">super</span>.stop(), <span class="hljs-number">1000</span>); <span class="hljs-comment">// call parent stop after 1sec</span>
  }
}</code></pre><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x7684; <code>super</code> &#x4E0E; <code>stop()</code> &#x4E2D;&#x7684;&#x76F8;&#x540C;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x6309;&#x9884;&#x671F;&#x5DE5;&#x4F5C;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x7528;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF0C;&#x4FBF;&#x4F1A;&#x62A5;&#x9519;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Unexpected super
setTimeout(function() { super.stop() }, 1000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Unexpected super</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">super</span>.stop() }, <span class="hljs-number">1000</span>);</code></pre><h2 id="articleHeader4">&#x91CD;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;</h2><p>&#x5BF9;&#x4E8E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x6709;&#x70B9;&#x68D8;&#x624B; tricky&#x3002;</p><p>&#x76F4;&#x5230;&#x73B0;&#x5728;&#xFF0C;<code>Rabbit</code> &#x90FD;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684; <code>constructor</code>&#x3002;<br>Till now, <code>Rabbit</code> did not have its own <code>constructor</code>.</p><p>&#x6839;&#x636E;<a href="https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation" rel="nofollow noreferrer" target="_blank">&#x89C4;&#x8303;</a>&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x7C7B;&#x6269;&#x5C55;&#x4E86;&#x53E6;&#x4E00;&#x4E2A;&#x7C7B;&#x5E76;&#x4E14;&#x6CA1;&#x6709; <code>constructor</code> &#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x5982;&#x4E0B; <code>constructor</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Rabbit extends Animal {
  // generated for extending classes without own constructors

  constructor(...args) {
    super(...args);
  }

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-comment">// generated for extending classes without own constructors</span>

  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
  }

}</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5B83;&#x8C03;&#x7528;&#x4E86;&#x7236; <code>constructor</code> &#x4F20;&#x9012;&#x6240;&#x6709;&#x53C2;&#x6570;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E0D;&#x81EA;&#x5DF1;&#x5199;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x4F1A;&#x53D1;&#x751F;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C06;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x5230; <code>Rabbit</code> &#x4E2D;&#x3002;&#x9664;&#x4E86;<code>name</code>&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x4F1A;&#x8BBE;&#x7F6E; <code>earLength</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {


  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }


  // ...
}


// Doesn&apos;t work!
let rabbit = new Rabbit(&quot;White Rabbit&quot;, 10); // Error: this is not defined.
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  constructor(name) {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.name = name;
  }
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{


  constructor(name, earLength) {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.earLength = earLength;
  }


  <span class="hljs-comment">// ...</span>
}


<span class="hljs-comment">// Doesn&apos;t work!</span>
let rabbit = <span class="hljs-keyword">new</span> <span class="hljs-type">Rabbit</span>(<span class="hljs-string">&quot;White Rabbit&quot;</span>, <span class="hljs-number">10</span>); <span class="hljs-comment">// Error: this is not defined.</span>
</code></pre><p>&#x54CE;&#x5466;&#x51FA;&#x9519;&#x4E86;&#xFF01;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x751F;&#x6210;&#x5154;&#x5B50;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF1A;&#x7EE7;&#x627F;&#x7C7B;&#x4E2D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x8C03;&#x7528; <code>super&#xFF08;...&#xFF09;</code>&#xFF0C;(!)&#x5E76;&#x4E14;&#x5728;&#x4F7F;&#x7528; <code>this</code> &#x4E4B;&#x524D;&#x6267;&#x884C;&#x5B83;&#x3002;</p><p>...&#x4F46;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x8FD9;&#x662F;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#xFF1F;&#x55EF;...&#x8FD9;&#x4E2A;&#x8981;&#x6C42;&#x770B;&#x8D77;&#x6765;&#x786E;&#x5B9E;&#x5947;&#x602A;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x63A2;&#x8BA8;&#x7EC6;&#x8282;&#xFF0C;&#x8BA9;&#x4F60;&#x771F;&#x6B63;&#x7406;&#x89E3;&#x5176;&#x4E2D;&#x7F18;&#x7531; &#x2014;&#x2014;</p><p>&#x5728;JavaScript&#x4E2D;&#xFF0C;&#x7EE7;&#x627F;&#x4E86;&#x5176;&#x4ED6;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#x3002;&#x5728;&#x7EE7;&#x627F;&#x7C7B;&#x4E2D;&#xFF0C;&#x76F8;&#x5E94;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x88AB;&#x6807;&#x8BB0;&#x4E3A;&#x7279;&#x6B8A;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027; <code>[[ConstructorKind]]&#xFF1A;&#x201C;derived&#x201D;</code>&#x3002;</p><p>&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF1A;</p><ul><li>&#x5F53;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x5B83;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A; this&#xFF0C;&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x8FD0;&#x884C;&#x3002;</li><li>&#x4F46;&#x662F;&#x5F53;&#x6D3E;&#x751F;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x4E0E;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x5B83;&#x6307;&#x671B;&#x7236;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x5B8C;&#x6210;&#x8FD9;&#x9879;&#x5DE5;&#x4F5C;&#x3002;</li></ul><p>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6B63;&#x5728;&#x6784;&#x9020;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x8C03;&#x7528; <code>super</code>&#xFF0C;&#x5426;&#x5219;&#x5177;&#x6709; <code>this</code> &#x7684;&#x5BF9;&#x8C61;&#x5C06;&#x4E0D;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x5E76;&#x62A5;&#x9519;&#x3002;</p><p>&#x5BF9;&#x4E8E; <code>Rabbit</code> &#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x4F7F;&#x7528; <code>this</code> &#x4E4B;&#x524D;&#x8C03;&#x7528; <code>super()</code>&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {

    super(name);

    this.earLength = earLength;
  }

  // ...
}


// now fine
let rabbit = new Rabbit(&quot;White Rabbit&quot;, 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{

  constructor(name) {
    <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.name = name;
  }

  <span class="hljs-comment">// ...</span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{

  constructor(name, earLength) {

    <span class="hljs-keyword">super</span>(name);

    <span class="hljs-keyword">this</span>.earLength = earLength;
  }

  <span class="hljs-comment">// ...</span>
}


<span class="hljs-comment">// now fine</span>
let rabbit = <span class="hljs-keyword">new</span> <span class="hljs-type">Rabbit</span>(<span class="hljs-string">&quot;White Rabbit&quot;</span>, <span class="hljs-number">10</span>);
alert(rabbit.name); <span class="hljs-comment">// White Rabbit</span>
alert(rabbit.earLength); <span class="hljs-comment">// 10</span>
</code></pre><h2 id="articleHeader5">Super &#x7684;&#x5B9E;&#x73B0;&#x4E0E; [[HomeObject]]</h2><p>&#x8BA9;&#x6211;&#x4EEC;&#x518D;&#x6DF1;&#x5165;&#x7406;&#x89E3; <code>super</code> &#x7684;&#x5E95;&#x5C42;&#x5B9E;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x770B;&#x5230;&#x4E00;&#x4E9B;&#x6709;&#x8DA3;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>&#x9996;&#x5148;&#x8981;&#x8BF4;&#x7684;&#x662F;&#xFF0C;&#x4EE5;&#x6211;&#x4EEC;&#x8FC4;&#x4ECA;&#x4E3A;&#x6B62;&#x5B66;&#x5230;&#x7684;&#x77E5;&#x8BC6;&#x6765;&#x770B;&#xFF0C;&#x5B9E;&#x73B0; super &#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x7684;&#x3002;</p><p>&#x90A3;&#x4E48;&#x601D;&#x8003;&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x662F;&#x4EC0;&#x4E48;&#x539F;&#x7406;&#xFF1F;&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x5B83;&#x5C06;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A; <code>this</code>&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8C03;&#x7528; <code>super.method()</code>&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x68C0;&#x7D22; <code>method</code>&#xFF1F;&#x5F88;&#x5BB9;&#x6613;&#x60F3;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4ECE;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x4E2D;&#x53D6;&#x51FA; <code>method</code>&#x3002;&#x4ECE;&#x6280;&#x672F;&#x4E0A;&#x8BB2;&#xFF0C;&#x6211;&#x4EEC;&#xFF08;&#x6216;JavaScript&#x5F15;&#x64CE;&#xFF09;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#x5417;&#xFF1F;</p><p>&#x4E5F;&#x8BB8;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE; <code>this</code> &#x7684; [[Prototype]] &#x4E2D;&#x83B7;&#x5F97;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x50CF; <code>this .__ proto __.method</code> &#x4E00;&#x6837;&#xFF1F;&#x4E0D;&#x5E78;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x662F;&#x884C;&#x4E0D;&#x901A;&#x7684;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x8BD5;&#x4E00;&#x8BD5;&#xFF0C;&#x7B80;&#x5355;&#x8D77;&#x89C1;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x4F7F;&#x7528; class &#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;<code>rabbit.eat()</code> &#x8C03;&#x7528;&#x7236;&#x5BF9;&#x8C61;&#x7684; <code>animal.eat()</code> &#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animal = {
  name: &quot;Animal&quot;,
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: &quot;Rabbit&quot;,
  eat() {

    // that&apos;s how super.eat() could presumably work
    this.__proto__.eat.call(this); // (*)

  }
};

rabbit.eat(); // Rabbit eats." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> animal = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Animal&quot;</span>,
  eat() {
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> eats.`</span>);
  }
};

<span class="hljs-keyword">let</span> rabbit = {
  <span class="hljs-attr">__proto__</span>: animal,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Rabbit&quot;</span>,
  eat() {

    <span class="hljs-comment">// that&apos;s how super.eat() could presumably work</span>
    <span class="hljs-keyword">this</span>.__proto__.eat.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// (*)</span>

  }
};

rabbit.eat(); <span class="hljs-comment">// Rabbit eats.</span></code></pre><p>&#x5728; <code>(*)</code> &#x8FD9;&#x4E00;&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;&#x539F;&#x578B;&#xFF08;<code>animal</code>&#xFF09;&#x4E2D;&#x53D6;&#x51FA; <code>eat</code>&#xFF0C;&#x5E76;&#x4EE5;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x8C03;&#x7528;&#x5B83;&#x3002;&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;<code>.call&#xFF08;this&#xFF09;</code> &#x5728;&#x8FD9;&#x91CC;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x56E0;&#x4E3A;&#x53EA;&#x5199; <code>this .__ proto __.eat()</code> &#x7684;&#x8BDD; <code>eat</code> &#x7684;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x5C06;&#x4F1A;&#x662F; <code>animal</code>&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x7684; <code>alert</code> &#x662F;&#x6B63;&#x786E;&#x7684;&#x3002;</p><p>&#x4F46;&#x662F;&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E2D;&#xFF0C;&#x5C31;&#x8981;&#x51FA;&#x4E8B;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animal = {
  name: &quot;Animal&quot;,
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...bounce around rabbit-style and call parent (animal) method
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears and call parent (rabbit) method
    this.__proto__.eat.call(this); // (**)
  }
};


longEar.eat(); // Error: Maximum call stack size exceeded
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> animal = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Animal&quot;</span>,
  eat() {
    alert(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> eats.`</span>);
  }
};

<span class="hljs-keyword">let</span> rabbit = {
  <span class="hljs-attr">__proto__</span>: animal,
  eat() {
    <span class="hljs-comment">// ...bounce around rabbit-style and call parent (animal) method</span>
    <span class="hljs-keyword">this</span>.__proto__.eat.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// (*)</span>
  }
};

<span class="hljs-keyword">let</span> longEar = {
  <span class="hljs-attr">__proto__</span>: rabbit,
  eat() {
    <span class="hljs-comment">// ...do something with long ears and call parent (rabbit) method</span>
    <span class="hljs-keyword">this</span>.__proto__.eat.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// (**)</span>
  }
};


longEar.eat(); <span class="hljs-comment">// Error: Maximum call stack size exceeded</span>
</code></pre><p>&#x5662;&#xFF0C;&#x5B8C;&#x86CB;&#xFF01;&#x8C03;&#x7528; <code>longEar.eat()</code> &#x62A5;&#x9519;&#x4E86;&#xFF01;</p><p>&#x8FD9;&#x539F;&#x56E0;&#x4E00;&#x773C;&#x53EF;&#x80FD;&#x770B;&#x4E0D;&#x900F;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8DDF;&#x8E2A; <code>longEar.eat()</code> &#x8C03;&#x7528;&#xFF0C;&#x5927;&#x6982;&#x5C31;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x4E86;&#x3002;&#x5728; <code>(*)</code> &#x548C; <code>(**)</code> &#x4E24;&#x884C;&#x4E2D;&#xFF0C; <code>this</code> &#x7684;&#x503C;&#x662F;&#x5F53;&#x524D;&#x5BF9;&#x8C61;(<code>longEar</code>)&#x3002;&#x91CD;&#x70B9;&#x6765;&#x4E86;&#xFF1A;&#x6240;&#x6709;&#x65B9;&#x6CD5;&#x90FD;&#x5C06;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A; <code>this</code>&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x539F;&#x578B;&#x6216;&#x5176;&#x4ED6;&#x4E1C;&#x897F;&#x3002;</p><p>&#x56E0;&#x6B64;&#xFF0C;&#x5728;&#x4E24;&#x884C; <code>(*)</code> &#x548C; <code>(**)</code> &#x4E2D;&#xFF0C;<code>this.__ proto__</code> &#x7684;&#x503C;&#x90FD;&#x662F; <code>rabbit</code>&#x3002;&#x4ED6;&#x4EEC;&#x90FD;&#x8C03;&#x7528;&#x4E86; <code>rabbit.eat</code>&#xFF0C;&#x4E8E;&#x662F;&#x5C31;&#x8FD9;&#x4E48;&#x65E0;&#x9650;&#x5FAA;&#x73AF;&#x4E0B;&#x53BB;&#x3002;</p><p>&#x60C5;&#x51B5;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015565620?w=259&amp;h=217" src="https://static.alili.tech/img/remote/1460000015565620?w=259&amp;h=217" alt="" title="" style="cursor:pointer"></span></p><p>1.&#x5728; <code>longEar.eat()</code> &#x91CC;&#x9762;&#xFF0C;<code>(**)</code> &#x884C;&#x4E2D;&#x8C03;&#x7528;&#x4E86; <code>rabbit.eat</code>&#xFF0C;&#x5E76;&#x4E14;<code>this = longEar</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// inside longEar.eat() we have this = longEar
this.__proto__.eat.call(this) // (**)
// becomes
longEar.__proto__.eat.call(this)
// that is
rabbit.eat.call(this);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// inside longEar.eat() we have this = longEar</span>
<span class="hljs-keyword">this</span>.__proto__.eat.call(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// (**)</span>
<span class="hljs-comment">// becomes</span>
longEar.__proto__.eat.call(<span class="hljs-keyword">this</span>)
<span class="hljs-comment">// that is</span>
rabbit.eat.call(<span class="hljs-keyword">this</span>);</code></pre><p>2.&#x7136;&#x540E;&#x5728;<code>rabbit.eat</code>&#x7684; <code>(*)</code> &#x884C;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x4F20;&#x5230;&#x539F;&#x578B;&#x94FE;&#x7684;&#x4E0B;&#x4E00;&#x5C42;&#xFF0C;&#x4F46;&#x662F; <code>this = longEar</code>&#xFF0C;&#x6240;&#x4EE5; <code>this .__ proto __.eat</code>&#x53C8;&#x662F; <code>rabbit.eat</code>&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// inside rabbit.eat() we also have this = longEar
this.__proto__.eat.call(this) // (*)
// becomes
longEar.__proto__.eat.call(this)
// or (again)
rabbit.eat.call(this);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// inside rabbit.eat() we also have this = longEar</span>
<span class="hljs-keyword">this</span>.__proto__.eat.call(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// (*)</span>
<span class="hljs-comment">// becomes</span>
longEar.__proto__.eat.call(<span class="hljs-keyword">this</span>)
<span class="hljs-comment">// or (again)</span>
rabbit.eat.call(<span class="hljs-keyword">this</span>);</code></pre><ol><li>...&#x56E0;&#x6B64; <code>rabbit.eat</code> &#x5728;&#x65E0;&#x5C3D;&#x5FAA;&#x73AF;&#x8C03;&#x52A8;&#xFF0C;&#x65E0;&#x6CD5;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x5C42;&#x3002;</li></ol><p>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E0D;&#x80FD;&#x7B80;&#x5355;&#x4F7F;&#x7528; <code>this</code> &#x89E3;&#x51B3;&#x3002;</p><h3 id="articleHeader6"><code>[[HomeObject]]</code></h3><p>&#x4E3A;&#x4E86;&#x63D0;&#x4F9B;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;JavaScript &#x4E3A;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#xFF1A;<code>[[HomeObject]]</code>&#x3002;</p><p><strong>&#x5F53;&#x51FD;&#x6570;&#x88AB;&#x6307;&#x5B9A;&#x4E3A;&#x7C7B;&#x6216;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5176; <code>[[HomeObject]]</code> &#x5C5E;&#x6027;&#x4E3A;&#x8BE5;&#x5BF9;&#x8C61;&#x3002;</strong></p><p>&#x8FD9;&#x5B9E;&#x9645;&#x4E0A;&#x8FDD;&#x53CD;&#x4E86; unbind &#x51FD;&#x6570;&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x56E0;&#x4E3A;&#x65B9;&#x6CD5;&#x8BB0;&#x4F4F;&#x4E86;&#x5B83;&#x4EEC;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5E76;&#x4E14; <code>[[HomeObject]]</code> &#x4E0D;&#x80FD;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x662F;&#x6C38;&#x4E45; bind&#xFF08;&#x7ED1;&#x5B9A;&#xFF09;&#x3002;&#x6240;&#x4EE5;&#x5728; JavaScript &#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7684;&#x53D8;&#x5316;&#x3002;</p><p>&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x6539;&#x53D8;&#x662F;&#x5B89;&#x5168;&#x7684;&#x3002; <code>[[HomeObject]]</code> &#x4EC5;&#x7528;&#x4E8E;&#x5728; <code>super</code> &#x4E2D;&#x83B7;&#x53D6;&#x4E0B;&#x4E00;&#x5C42;&#x539F;&#x578B;&#x3002;&#x6240;&#x4EE5;&#x5B83;&#x4E0D;&#x4F1A;&#x7834;&#x574F;&#x517C;&#x5BB9;&#x6027;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x5728; <code>super</code> &#x4E2D;&#x8FD0;&#x4F5C;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animal = {
  name: &quot;Animal&quot;,
  eat() {         // [[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: &quot;Rabbit&quot;,
  eat() {         // [[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: &quot;Long Ear&quot;,
  eat() {         // [[HomeObject]] == longEar
    super.eat();
  }
};


longEar.eat();  // Long Ear eats.
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lua"><code>let animal = {
  name: <span class="hljs-string">&quot;Animal&quot;</span>,
  eat() {         // <span class="hljs-string">[[HomeObject]]</span> == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: <span class="hljs-string">&quot;Rabbit&quot;</span>,
  eat() {         // <span class="hljs-string">[[HomeObject]]</span> == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: <span class="hljs-string">&quot;Long Ear&quot;</span>,
  eat() {         // <span class="hljs-string">[[HomeObject]]</span> == longEar
    super.eat();
  }
};


longEar.eat();  // Long Ear eats.
</code></pre><p>&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x4F1A;&#x5728;&#x5185;&#x90E8; <code>[[HomeObject]]</code> &#x5C5E;&#x6027;&#x4E2D;&#x8BB0;&#x4F4F;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x7136;&#x540E; <code>super</code> &#x4F7F;&#x7528;&#x5B83;&#x6765;&#x89E3;&#x6790;&#x539F;&#x578B;&#x3002;</p><p>&#x5728;&#x7C7B;&#x548C;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#x90FD;&#x5B9A;&#x4E49;&#x4E86; <code>[[HomeObject]]</code>&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x5BF9;&#x8C61;&#xFF0C;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#xFF1A;<code>method()</code> &#x800C;&#x4E0D;&#x662F; <code>&quot;method: function()&quot;</code>&#x3002;</p><p>&#x5728;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x975E;&#x65B9;&#x6CD5;&#x8BED;&#x6CD5;&#xFF08;non-method syntax&#xFF09;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#x3002;&#x8FD9;&#x4E48;&#x505A;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E; <code>[[HomeObject]]</code> &#x5C5E;&#x6027;&#xFF0C;&#x7EE7;&#x627F;&#x4E5F;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animal = {
  eat: function() { // should be the short syntax: eat() {...}
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};


rabbit.eat();  // Error calling super (because there&apos;s no [[HomeObject]])
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> animal = {
  <span class="hljs-attr">eat</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// should be the short syntax: eat() {...}</span>
    <span class="hljs-comment">// ...</span>
  }
};

<span class="hljs-keyword">let</span> rabbit = {
  <span class="hljs-attr">__proto__</span>: animal,
  <span class="hljs-attr">eat</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">super</span>.eat();
  }
};


rabbit.eat();  <span class="hljs-comment">// Error calling super (because there&apos;s no [[HomeObject]])</span>
</code></pre><h2 id="articleHeader7">&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x548C;&#x7EE7;&#x627F;</h2><p><code>class</code> &#x8BED;&#x6CD5;&#x4E5F;&#x652F;&#x6301;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x7684;&#x7EE7;&#x627F;&#x3002;</p><p>&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }

}

// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit(&quot;White Rabbit&quot;, 10),
  new Rabbit(&quot;Black Rabbit&quot;, 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{

  constructor(name, speed) {
    <span class="hljs-keyword">this</span>.speed = speed;
    <span class="hljs-keyword">this</span>.name = name;
  }

  run(speed = <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">this</span>.speed += speed;
    alert(`${<span class="hljs-keyword">this</span>.name} runs <span class="hljs-keyword">with</span> speed ${<span class="hljs-keyword">this</span>.speed}.`);
  }

  static compare(animalA, animalB) {
    <span class="hljs-keyword">return</span> animalA.speed - animalB.speed;
  }

}

<span class="hljs-comment">// Inherit from Animal</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  hide() {
    alert(`${<span class="hljs-keyword">this</span>.name} hides!`);
  }
}

let rabbits = [
  <span class="hljs-keyword">new</span> <span class="hljs-type">Rabbit</span>(<span class="hljs-string">&quot;White Rabbit&quot;</span>, <span class="hljs-number">10</span>),
  <span class="hljs-keyword">new</span> <span class="hljs-type">Rabbit</span>(<span class="hljs-string">&quot;Black Rabbit&quot;</span>, <span class="hljs-number">5</span>)
];

rabbits.sort(<span class="hljs-type">Rabbit</span>.compare);

rabbits[<span class="hljs-number">0</span>].run(); <span class="hljs-comment">// Black Rabbit runs with speed 5.</span></code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8C03;&#x7528; <code>Rabbit.compare</code>&#xFF0C;&#x5047;&#x8BBE;&#x7EE7;&#x627F;&#x7684; <code>Animal.compare</code> &#x5C06;&#x88AB;&#x8C03;&#x7528;&#x3002;</p><p>&#x5B83;&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#xFF1F;&#x518D;&#x6B21;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x3002;&#x6B63;&#x5982;&#x4F60;&#x731C;&#x5230;&#x7684;&#x90A3;&#x6837;&#xFF0C;extends &#x540C;&#x6837;&#x7ED9; <code>Rabbit</code> &#x63D0;&#x4F9B;&#x4E86;&#x5F15;&#x7528;&#x5230; <code>Animal</code>&#x7684; <code>[Prototype]</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015565621?w=425&amp;h=302" src="https://static.alili.tech/img/remote/1460000015565621?w=425&amp;h=302" alt="" title="" style="cursor:pointer"></span></p><p>&#x6240;&#x4EE5;&#xFF0C;<code>Rabbit</code> &#x51FD;&#x6570;&#x73B0;&#x5728;&#x7EE7;&#x627F; <code>Animal</code> &#x51FD;&#x6570;&#x3002;<code>Animal</code> &#x81EA;&#x5E26;&#x5F15;&#x7528;&#x5230; <code>Function.prototype</code> &#x7684; <code>[[Prototype]]</code>&#xFF08;&#x56E0;&#x4E3A;&#x5B83;&#x4E0D; <code>extend</code> &#x5176;&#x4ED6;&#x7C7B;&#xFF09;&#x3002;</p><p>&#x770B;&#x770B;&#x8FD9;&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {}
class Rabbit extends Animal {}

// for static propertites and methods
alert(Rabbit.__proto__ === Animal); // true

// and the next step is Function.prototype
alert(Animal.__proto__ === Function.prototype); // true

// that&apos;s in addition to the &quot;normal&quot; prototype chain for object methods
alert(Rabbit.prototype.__proto__ === Animal.prototype);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rabbit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{}

<span class="hljs-comment">// for static propertites and methods</span>
alert(<span class="hljs-type">Rabbit</span>.__proto__ === <span class="hljs-type">Animal</span>); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// and the next step is Function.prototype</span>
alert(<span class="hljs-type">Animal</span>.__proto__ === <span class="hljs-type">Function</span>.prototype); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// that&apos;s in addition to the &quot;normal&quot; prototype chain for object methods</span>
alert(<span class="hljs-type">Rabbit</span>.prototype.__proto__ === <span class="hljs-type">Animal</span>.prototype);</code></pre><p>&#x8FD9;&#x6837; <code>Rabbit</code> &#x53EF;&#x4EE5;&#x8BBF;&#x95EE; <code>Animal</code> &#x7684;&#x6240;&#x6709;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader8">&#x5728;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#x4E2D;&#x6CA1;&#x6709;&#x9759;&#x6001;&#x7EE7;&#x627F;</h3><p>&#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x5185;&#x7F6E;&#x7C7B;&#x6CA1;&#x6709;&#x9759;&#x6001; <code>[[Prototype]]</code> &#x5F15;&#x7528;&#x3002;&#x4F8B;&#x5982;&#xFF0C;<code>Object</code> &#x5177;&#x6709; <code>Object.defineProperty</code>&#xFF0C;<code>Object.keys</code>&#x7B49;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46; <code>Array</code>&#xFF0C;<code>Date</code> &#x4E0D;&#x4F1A;&#x7EE7;&#x627F;&#x5B83;&#x4EEC;&#x3002;</p><p><code>Date</code> &#x548C; <code>Object</code> &#x7684;&#x7ED3;&#x6784;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015565622?w=457&amp;h=353" src="https://static.alili.tech/img/remote/1460000015565622?w=457&amp;h=353" alt="" title="" style="cursor:pointer"></span></p><p><code>Date</code> &#x548C; <code>Object</code> &#x4E4B;&#x95F4;&#x6BEB;&#x65E0;&#x5173;&#x8054;&#xFF0C;&#x4ED6;&#x4EEC;&#x72EC;&#x7ACB;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x8FC7; <code>Date.prototype</code> &#x7EE7;&#x627F;&#x4E8E; <code>Object.prototype</code>&#xFF0C;&#x4EC5;&#x6B64;&#x800C;&#x5DF2;&#x3002;</p><p>&#x9020;&#x6210;&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#x662F;&#x56E0;&#x4E3A; JavaScript &#x5728;&#x8BBE;&#x8BA1;&#x521D;&#x671F;&#x6CA1;&#x6709;&#x8003;&#x8651;&#x4F7F;&#x7528; class &#x8BED;&#x6CD5;&#x548C;&#x7EE7;&#x627F;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x3002;</p><h2 id="articleHeader9">&#x539F;&#x751F;&#x62D3;&#x5C55;</h2><p>Array&#xFF0C;Map &#x7B49;&#x5185;&#x7F6E;&#x7C7B;&#x4E5F;&#x53EF;&#x4EE5;&#x6269;&#x5C55;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;<code>PowerArray</code> &#x7EE7;&#x627F;&#x81EA;&#x539F;&#x751F; <code>Array</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item =&gt; item &gt;= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-comment">// add one more method to it (can do more)</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PowerArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  isEmpty() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length === <span class="hljs-number">0</span>;
  }
}

let arr = <span class="hljs-keyword">new</span> <span class="hljs-type">PowerArray</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>);
alert(arr.isEmpty()); <span class="hljs-comment">// false</span>

let filteredArr = arr.filter(item =&gt; item &gt;= <span class="hljs-number">10</span>);
alert(filteredArr); <span class="hljs-comment">// 10, 50</span>
alert(filteredArr.isEmpty()); <span class="hljs-comment">// false</span></code></pre><p>&#x8BF7;&#x6CE8;&#x610F;&#x4E00;&#x4EF6;&#x975E;&#x5E38;&#x6709;&#x8DA3;&#x7684;&#x4E8B;&#x60C5;&#x3002;&#x50CF; <code>filter</code>&#xFF0C;<code>map</code> &#x548C;&#x5176;&#x4ED6;&#x5185;&#x7F6E;&#x65B9;&#x6CD5; - &#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x7EE7;&#x627F;&#x7C7B;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x4ED6;&#x4EEC;&#x4F9D;&#x9760; <code>constructor</code> &#x5C5E;&#x6027;&#x6765;&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#x3002;</p><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.constructor === PowerArray" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">arr.constructor === PowerArray</code></pre><p>&#x6240;&#x4EE5;&#x5F53;&#x8C03;&#x7528; <code>arr.filter()</code> &#x65F6;&#xFF0C;&#x5B83;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x65B0;&#x7684;&#x7ED3;&#x679C;&#x6570;&#x7EC4;&#xFF0C;&#x5C31;&#x50CF; <code>new PowerArray</code> &#x4E00;&#x6837;&#xFF0C;&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x4F7F;&#x7528; PowerArray &#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x6211;&#x4EEC;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x8FD9;&#x79CD;&#x884C;&#x4E3A;&#x3002;&#x5982;&#x679C;&#x5B58;&#x5728;&#x9759;&#x6001; getter <code>Symbol.species</code>&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x5EFA;&#x5BF9;&#x8C61;&#x4F7F;&#x7528;&#x7684; constructor&#x3002;</p><p>&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x7531;&#x4E8E; <code>Symbol.species</code> &#x7684;&#x5B58;&#x5728;&#xFF0C;<code>map</code>&#xFF0C;<code>filter</code>&#x7B49;&#x5185;&#x7F6E;&#x65B9;&#x6CD5;&#x5C06;&#x8FD4;&#x56DE;&#x666E;&#x901A;&#x7684;&#x6570;&#x7EC4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }


  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }

}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item =&gt; item &gt;= 10);


// filteredArr is not PowerArray, but Array

alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PowerArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  isEmpty() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length === <span class="hljs-number">0</span>;
  }


  <span class="hljs-comment">// built-in methods will use this as the constructor</span>
  static get [<span class="hljs-type">Symbol</span>.species]() {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Array</span>;
  }

}

let arr = <span class="hljs-keyword">new</span> <span class="hljs-type">PowerArray</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>);
alert(arr.isEmpty()); <span class="hljs-comment">// false</span>

<span class="hljs-comment">// filter creates new array using arr.constructor[Symbol.species] as constructor</span>
let filteredArr = arr.filter(item =&gt; item &gt;= <span class="hljs-number">10</span>);


<span class="hljs-comment">// filteredArr is not PowerArray, but Array</span>

alert(filteredArr.isEmpty()); <span class="hljs-comment">// Error: filteredArr.isEmpty is not a function</span></code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x5176;&#x4ED6; key &#x4F7F;&#x7528; <code>Symbol.species</code>&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5265;&#x79BB;&#x7ED3;&#x679C;&#x503C;&#x4E2D;&#x7684;&#x65E0;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x6216;&#x662F;&#x589E;&#x52A0;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 Class 继承与 super

## 原文链接
[https://segmentfault.com/a/1190000015565616](https://segmentfault.com/a/1190000015565616)


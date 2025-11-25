---
title: 'JavaScript常用设计模式' 
date: 2018-11-25 2:30:07
hidden: true
slug: 03er0mag15sn
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A; <a href="https://github.com/HolyZheng/holyZheng-blog/issues/8" rel="nofollow noreferrer" target="_blank">JavaScript&#x5E38;&#x7528;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</a></blockquote><h2 id="articleHeader0">&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</h2><p>&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x662F;&#x4E00;&#x79CD;&#x5728;&#x957F;&#x65F6;&#x95F4;&#x7684;&#x7ECF;&#x9A8C;&#x4E0E;&#x9519;&#x8BEF;&#x4E2D;&#x603B;&#x7ED3;&#x51FA;&#x6765;&#x53EF;&#x670D;&#x7528;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p><h3 id="articleHeader1">&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E3B;&#x8981;&#x5206;&#x4E3A;3&#x7C7B;&#xFF1A;</h3><p><strong>&#x521B;&#x5EFA;&#x578B;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</strong>&#xFF1A;&#x4E13;&#x6CE8;&#x4E8E;&#x5904;&#x7406;&#x5BF9;&#x8C61;&#x7684;&#x521B;&#x5EFA;</p><blockquote>Constructor&#x6784;&#x9020;&#x5668;&#x6A21;&#x5F0F;&#xFF0C;Factory&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF0C;Singleton&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#xFF0C;builder&#x751F;&#x6210;&#x5668;&#x6A21;&#x5F0F;</blockquote><p><strong>&#x7ED3;&#x6784;&#x578B;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</strong>&#xFF1A;&#x5BF9;&#x8C61;&#x95F4;&#x7EC4;&#x5408;&#xFF0C;&#x5EFA;&#x7ACB;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;</p><blockquote>Decorator&#x88C5;&#x9970;&#x8005;&#x6A21;&#x5F0F;&#xFF0C;Facade&#x5916;&#x89C2;&#x6A21;&#x5F0F;&#xFF0C;Flyweight&#x4EAB;&#x5143;&#x6A21;&#x5F0F;&#xFF0C;Adapter&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#xFF0C;Proxy&#x4EE3;&#x7406;&#x6A21;&#x5F0F;</blockquote><p><strong>&#x884C;&#x4E3A;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</strong>&#xFF1A;&#x7B80;&#x5316;&#x548C;&#x6539;&#x5584;&#x5BF9;&#x8C61;&#x95F4;&#x7684;&#x901A;&#x4FE1;</p><blockquote>Mediator&#x4E2D;&#x4ECB;&#x8005;&#x6A21;&#x5F0F;&#xFF0C;Observer&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</blockquote><h2 id="articleHeader2">&#x5E38;&#x7528;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</h2><h3 id="articleHeader3">1. &#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</h3><p>&#x4E00;&#x4E2A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7EF4;&#x6301;&#x7740;&#x4E00;&#x7CFB;&#x5217;&#x4F9D;&#x8D56;&#x4E8E;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5C06;&#x6709;&#x5173;&#x72B6;&#x6001;&#x7684;&#x4EFB;&#x4F55;&#x53D8;&#x66F4;&#x81EA;&#x52A8;&#x901A;&#x77E5;&#x89C2;&#x5BDF;&#x8005;&#x4EEC;&#x3002;&#x5728;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x4E2D;&#xFF0C;&#x89C2;&#x5BDF;&#x8005;&#x9700;&#x8981;&#x76F4;&#x63A5;&#x8BA2;&#x9605;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x89C2;&#x5BDF;&#x8005;&#x4E0E;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x3002;<br>&#x6709;4&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x6982;&#x5FF5;</p><ul><li>&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF08;&#x88AB;&#x89C2;&#x5BDF;&#x8005;&#xFF09;&#xFF1A;&#x7EF4;&#x62A4;&#x4E00;&#x7EC4;&#x89C2;&#x5BDF;&#x60A3;&#x8005;&#xFF0C;&#x63D0;&#x4F9B;&#x7BA1;&#x7406;&#x89C2;&#x5BDF;&#x8005;&#x7684;&#x65B9;&#x6CD5;&#x3002;</li><li>&#x89C2;&#x5BDF;&#x8005;&#xFF1A; &#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x66F4;&#x65B0;&#x63A5;&#x53E3;&#xFF0C;&#x7528;&#x4E8E;&#x6536;&#x5230;&#x901A;&#x77E5;&#x65F6;&#xFF0C;&#x8FDB;&#x884C;&#x66F4;&#x65B0;</li><li>&#x5177;&#x4F53;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF1A;&#x4EE3;&#x8868;&#x5177;&#x4F53;&#x7684;&#x76EE;&#x6807;&#x5BF9;&#x8C61;</li><li>&#x5177;&#x4F53;&#x89C2;&#x5BDF;&#x8005;&#xFF1A;&#x4EE3;&#x8868;&#x5177;&#x4F53;&#x7684;&#x89C2;&#x5BDF;&#x8005;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x76EE;&#x6807;&#x5BF9;&#x8C61;
class Subject {
  constructor() {
    // &#x89C2;&#x5BDF;&#x8005;&#x5217;&#x8868;
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver() {
    this.observers.pop()
  }
  notify() {
    this.observers.forEach(observer =&gt; {
      observer.update()
    })
  }
}

// &#x89C2;&#x5BDF;&#x8005;
class Observer {
  constructor() {
    // &#x4F7F;&#x7528;&#x65F6;&#x4F1A;&#x88AB;&#x5177;&#x4F53;update&#x65B9;&#x6CD5;&#x8986;&#x76D6;
    this.update = function () {
        // ..
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x76EE;&#x6807;&#x5BF9;&#x8C61;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Subject</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// &#x89C2;&#x5BDF;&#x8005;&#x5217;&#x8868;</span>
    <span class="hljs-keyword">this</span>.observers = []
  }
  addObserver(observer) {
    <span class="hljs-keyword">this</span>.observers.push(observer)
  }
  removeObserver() {
    <span class="hljs-keyword">this</span>.observers.pop()
  }
  notify() {
    <span class="hljs-keyword">this</span>.observers.forEach(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> {
      observer.update()
    })
  }
}

<span class="hljs-comment">// &#x89C2;&#x5BDF;&#x8005;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x65F6;&#x4F1A;&#x88AB;&#x5177;&#x4F53;update&#x65B9;&#x6CD5;&#x8986;&#x76D6;</span>
    <span class="hljs-keyword">this</span>.update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// ..</span>
    }
  }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5177;&#x4F53;&#x76EE;&#x6807;&#x5BF9;&#x8C61;
class currentSubject extends Subject {
  constructor() {
    super()    
  }
  // &#x5176;&#x4ED6;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;
  dosomething() {
    console.log(&apos;currentSubject change&apos;)
    this.notify()
  }
}
// &#x5177;&#x4F53;&#x89C2;&#x5BDF;&#x8005;
class currentObserver extends Observer {
    constructor() {
        super()
    }
    // &#x91CD;&#x5199;update
    update() {
        console.log(&apos;change!&apos;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5177;&#x4F53;&#x76EE;&#x6807;&#x5BF9;&#x8C61;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">currentSubject</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Subject</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()    
  }
  <span class="hljs-comment">// &#x5176;&#x4ED6;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;</span>
  dosomething() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;currentSubject change&apos;</span>)
    <span class="hljs-keyword">this</span>.notify()
  }
}
<span class="hljs-comment">// &#x5177;&#x4F53;&#x89C2;&#x5BDF;&#x8005;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">currentObserver</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Observer</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>()
    }
    <span class="hljs-comment">// &#x91CD;&#x5199;update</span>
    update() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;change!&apos;</span>)
    }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BA2;&#x9605;
let curSubject = new currentSubject()
let curObserver = new currentObserver()
curSubject.addObserver(curObserver)
// &#x89E6;&#x53D1;
curSubject.dosomething()
// currentSubject change" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x8BA2;&#x9605;</span>
<span class="hljs-keyword">let</span> curSubject = <span class="hljs-keyword">new</span> currentSubject()
<span class="hljs-keyword">let</span> curObserver = <span class="hljs-keyword">new</span> currentObserver()
curSubject.addObserver(curObserver)
<span class="hljs-comment">// &#x89E6;&#x53D1;</span>
curSubject.dosomething()
<span class="hljs-comment">// currentSubject change</span></code></pre><h3 id="articleHeader4">2.&#x53D1;&#x5E03;/&#x8BA2;&#x9605;&#x6A21;&#x5F0F;</h3><p>&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x89C2;&#x5BDF;&#x8FD9;&#x6A21;&#x5F0F;&#x7684;&#x4E00;&#x79CD;&#x53D8;&#x4F53;&#xFF0C;&#x4E00;&#x79CD;&#x5B9E;&#x73B0;&#x3002;&#x5B83;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x4E3B;&#x9898;/&#x4E8B;&#x4EF6;&#x901A;&#x9053;&#xFF0C;&#x4ECB;&#x4E8E;&#x53D1;&#x5E03;&#x8005;&#x548C;&#x8BA2;&#x9605;&#x8005;&#x4E4B;&#x95F4;&#xFF0C;&#x907F;&#x514D;&#x4E86;&#x53D1;&#x5E03;&#x8005;&#x548C;&#x8BA2;&#x9605;&#x8005;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class PubSub {
  constructor() {
// &#x4E3B;&#x9898;/&#x4E8B;&#x4EF6;&#x901A;&#x9053;
    this.topics = {}
  }
  publish(topic, args) {
    if (!this.topics[topic]) {
      return
    }
    let subscribers = this.topics[topic]
    subscribers.forEach(subscriber =&gt; {
        subscriber.updata(args)
    })
  }
  subscribe(topic, subscriber ) {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }
    this.topics[topic].push(subscriber )
  }
}

let pubsub = new PubSub()

pubsub.subscribe(&apos;one&apos;, subscriber )

pubsub.publish(&apos;one&apos;, &apos;some args&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PubSub</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
<span class="hljs-comment">// &#x4E3B;&#x9898;/&#x4E8B;&#x4EF6;&#x901A;&#x9053;</span>
    <span class="hljs-keyword">this</span>.topics = {}
  }
  publish(topic, args) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.topics[topic]) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">let</span> subscribers = <span class="hljs-keyword">this</span>.topics[topic]
    subscribers.forEach(<span class="hljs-function"><span class="hljs-params">subscriber</span> =&gt;</span> {
        subscriber.updata(args)
    })
  }
  subscribe(topic, subscriber ) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.topics[topic]) {
      <span class="hljs-keyword">this</span>.topics[topic] = []
    }
    <span class="hljs-keyword">this</span>.topics[topic].push(subscriber )
  }
}

<span class="hljs-keyword">let</span> pubsub = <span class="hljs-keyword">new</span> PubSub()

pubsub.subscribe(<span class="hljs-string">&apos;one&apos;</span>, subscriber )

pubsub.publish(<span class="hljs-string">&apos;one&apos;</span>, <span class="hljs-string">&apos;some args&apos;</span>)
</code></pre><h3 id="articleHeader5">3. &#x5DE5;&#x5382;&#x6A21;&#x5F0F;</h3><p>&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x63A5;&#x53E3;&#x6765;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x77E5;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#x5E76;&#x63D0;&#x4F9B;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.state = options.state || &quot;brand new&quot;;
    this.color = options.color || &quot;silver&quot;;
  }
}

class Truck {
  constructor(options) {
    this.state = options.state || &quot;used&quot;;
    this.wheelSize = options.wheelSize || &quot;large&quot;;
    this.color = options.color || &quot;blue&quot;;
  }
}

function vehicleFactory (options) {
  if (options.type === &apos;car&apos;) {
    return new Car(options)  
  } else {
    return new Truck(options)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span>(options) {
    <span class="hljs-keyword">this</span>.doors = options.doors || <span class="hljs-number">4</span>;
    <span class="hljs-keyword">this</span>.state = options.state || <span class="hljs-string">&quot;brand new&quot;</span>;
    <span class="hljs-keyword">this</span>.color = options.color || <span class="hljs-string">&quot;silver&quot;</span>;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Truck</span> </span>{
  <span class="hljs-keyword">constructor</span>(options) {
    <span class="hljs-keyword">this</span>.state = options.state || <span class="hljs-string">&quot;used&quot;</span>;
    <span class="hljs-keyword">this</span>.wheelSize = options.wheelSize || <span class="hljs-string">&quot;large&quot;</span>;
    <span class="hljs-keyword">this</span>.color = options.color || <span class="hljs-string">&quot;blue&quot;</span>;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vehicleFactory</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">if</span> (options.type === <span class="hljs-string">&apos;car&apos;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Car(options)  
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Truck(options)
  }
}</code></pre><p><strong>&#x4F55;&#x65F6;&#x4F7F;&#x7528;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;</strong></p><ul><li>&#x5F53;&#x6211;&#x4EEC;&#x7684;&#x5BF9;&#x8C61;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#x7684;&#x65F6;&#x5019;&#x3002;</li><li>&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x60C5;&#x51B5;&#x521B;&#x5EFA;&#x4E0D;&#x540C;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x7684;&#x65F6;&#x5019;&#x3002;</li><li>&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x8BB8;&#x591A;&#x76F8;&#x4F3C;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#x3002;</li></ul><p><strong>&#x7F3A;&#x70B9;</strong></p><ul><li>&#x4F7F;&#x7528;&#x4E0D;&#x5F53;&#x4F1A;&#x589E;&#x52A0;&#x7A0B;&#x5E8F;&#x7684;&#x590D;&#x6742;&#x5EA6;</li></ul><h3 id="articleHeader6">4. &#x62BD;&#x8C61;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;</h3><p>&#x62BD;&#x8C61;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5B9E;&#x73B0;&#x7EC6;&#x8282;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x3002;&#x9002;&#x7528;&#x4E8E;&#x9700;&#x8981;&#x548C;&#x591A;&#x79CD;&#x5BF9;&#x8C61;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;&#x7684;&#x573A;&#x666F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Truck {
  constructor(options) {
    this.state = options.state || &quot;used&quot;;
    this.wheelSize = options.wheelSize || &quot;large&quot;;
    this.color = options.color || &quot;blue&quot;;
  }
}

class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.state = options.state || &quot;brand new&quot;;
    this.color = options.color || &quot;silver&quot;;
  }
}

class AbstractFactory {
  constructor() {
    this.types = {}
  }
  registerFactory(type, factory) {
    this.types[type] = factory
  }
  getInstance(type, args) {
    let factory = this.types[type]
    if (factory) {
      return new factory(args)
    }
  }
}

let abstractFactory = new AbortController()
abstractFactory.registerFactory(&apos;car&apos;, Car)
abstractFactory.registerFactory(&apos;truck&apos;, Truck)

abstractFactory.getInstance(&apos;car&apos;, options)
abstractFactory.getInstance(&apos;truck&apos;, options)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Truck</span> </span>{
  <span class="hljs-keyword">constructor</span>(options) {
    <span class="hljs-keyword">this</span>.state = options.state || <span class="hljs-string">&quot;used&quot;</span>;
    <span class="hljs-keyword">this</span>.wheelSize = options.wheelSize || <span class="hljs-string">&quot;large&quot;</span>;
    <span class="hljs-keyword">this</span>.color = options.color || <span class="hljs-string">&quot;blue&quot;</span>;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{
  <span class="hljs-keyword">constructor</span>(options) {
    <span class="hljs-keyword">this</span>.doors = options.doors || <span class="hljs-number">4</span>;
    <span class="hljs-keyword">this</span>.state = options.state || <span class="hljs-string">&quot;brand new&quot;</span>;
    <span class="hljs-keyword">this</span>.color = options.color || <span class="hljs-string">&quot;silver&quot;</span>;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AbstractFactory</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.types = {}
  }
  registerFactory(type, factory) {
    <span class="hljs-keyword">this</span>.types[type] = factory
  }
  getInstance(type, args) {
    <span class="hljs-keyword">let</span> factory = <span class="hljs-keyword">this</span>.types[type]
    <span class="hljs-keyword">if</span> (factory) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> factory(args)
    }
  }
}

<span class="hljs-keyword">let</span> abstractFactory = <span class="hljs-keyword">new</span> AbortController()
abstractFactory.registerFactory(<span class="hljs-string">&apos;car&apos;</span>, Car)
abstractFactory.registerFactory(<span class="hljs-string">&apos;truck&apos;</span>, Truck)

abstractFactory.getInstance(<span class="hljs-string">&apos;car&apos;</span>, options)
abstractFactory.getInstance(<span class="hljs-string">&apos;truck&apos;</span>, options)
</code></pre><h3 id="articleHeader7">5. &#x5355;&#x4F8B;&#x6A21;&#x5F0F;</h3><p>&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x9650;&#x5236;&#x4E00;&#x4E2A;&#x7C7B;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Obj(data) {
  // ....
}
// &#x5229;&#x7528;&#x95ED;&#x5305;&#x5B9E;&#x73B0;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#xFF0C;&#x786E;&#x4FDD;obj&#x7C7B;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;
function singleton (data) {
  var instance;
  return function () {
    if (!instance) {
      instance = new Obj(data)
    }
    return instance
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Obj</span>(<span class="hljs-title">data</span>) </span>{
  <span class="hljs-comment">// ....</span>
}
<span class="hljs-comment">// &#x5229;&#x7528;&#x95ED;&#x5305;&#x5B9E;&#x73B0;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#xFF0C;&#x786E;&#x4FDD;obj&#x7C7B;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">singleton</span> (<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">var</span> instance;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!instance) {
      instance = <span class="hljs-keyword">new</span> Obj(data)
    }
    <span class="hljs-keyword">return</span> instance
  }
}</code></pre><h3 id="articleHeader8">6. &#x4E2D;&#x4ECB;&#x8005;&#x6A21;&#x5F0F;</h3><p>&#x4E2D;&#x4ECB;&#x8005;&#x6A21;&#x5F0F;&#x5C31;&#x662F;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x4E2D;&#x5FC3;&#x70B9;&#x7ED9;&#x7CFB;&#x7EDF;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#xFF0C;&#x964D;&#x4F4E;&#x7CFB;&#x7EDF;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x8026;&#x5408;&#x7A0B;&#x5EA6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9E;&#x73B0;&#x4E0E;&#x53D1;&#x5E03;/&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x7C7B;&#x4F3C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-comment">// &#x5B9E;&#x73B0;&#x4E0E;&#x53D1;&#x5E03;/&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x7C7B;&#x4F3C;</span></code></pre><p>&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x548C;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x4E13;&#x6CE8;&#x4E8E;&#x7EF4;&#x62A4;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x548C;&#x89C2;&#x5BDF;&#x8005;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x5F53;&#x4E3B;&#x9898;&#x5BF9;&#x8C61;&#x53D1;&#x9001;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x901A;&#x77E5;&#x6240;&#x6709;&#x5BF9;&#x6539;&#x4E3B;&#x9898;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x3002;&#x800C;&#x4E2D;&#x4ECB;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x8BDD;&#xFF0C;&#x4E13;&#x6CE8;&#x4E8E;&#x9650;&#x5236;&#x5BF9;&#x8C61;&#x7684;&#x901A;&#x4FE1;&#x5FC5;&#x987B;&#x901A;&#x8FC7;&#x4E2D;&#x4ECB;&#x8005;&#x6765;&#x901A;&#x4FE1;&#x3002;&#x4E24;&#x8005;&#x90FD;&#x63D0;&#x5021;&#x677E;&#x8026;&#x5408;&#x3002;</p><h3 id="articleHeader9">7. &#x88C5;&#x9970;&#x8005;&#x6A21;&#x5F0F;</h3><p>&#x88C5;&#x9970;&#x8005;&#x6A21;&#x5F0F;&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x88C5;&#x9970;&#x7C7B;&#x5BF9;&#x73B0;&#x6709;&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x884C;&#x4E3A;&#xFF0C;&#x4EE5;&#x53CA;&#x5BF9;&#x539F;&#x6709;&#x884C;&#x4E3A;&#x8FDB;&#x884C;&#x88C5;&#x9970;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   // o&#x4E3A;&#x5DF2;&#x6709;&#x5BF9;&#x8C61;
    var M20 = function(o){    // &#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x88C5;&#x9970;&#x7C7B;
        var str = &apos;20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&apos;;
        // o&#x662F;&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x8C03;&#x7528;&#x4F20;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x52A0;&#x4EE5;&#x88C5;&#x9970;
        this.eat = function(){
            return str + o.eat()+&quot;,&#x80A5;&#x5F97;&#x5F88;&#xFF01;&quot;;
        };
        this.drink = function(){
            return str + o.drink()+&quot;,&#x5C31;&#x662F;&#x4E2A;&#x6C34;&#x6876;&#xFF01;&quot;;
        };
        this.coding = function(){
            return str + o.coding()+&quot;,&#x4EE3;&#x7801;&#x53C8;&#x5199;&#x5F97;&#x6487;&#xFF01;&quot;;
        };
    }
    alert(new M20(david).eat());    // 20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&#x5927;&#x536B;&#x662F;&#x4E2A;&#x5927;&#x80D6;&#x5B50;&#xFF0C;&#x4E00;&#x5929;&#x53EA;&#x6653;&#x5F97;&#x5403;,&#x80A5;&#x5F97;&#x5F88;&#xFF01;
    alert(new M20(david).drink());    // 20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&#x5927;&#x536B;&#x9664;&#x4E86;&#x5403;&#x5C31;&#x662F;&#x559D;,&#x5C31;&#x662F;&#x4E2A;&#x6C34;&#x6876;&#xFF01;
    alert(new M20(david).coding());    // 20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&#x5199;&#x4EE3;&#x7801;&#x5427;&#xFF0C;&#x5927;&#x536B;,&#x4EE3;&#x7801;&#x53C8;&#x5199;&#x5F97;&#x6487;&#xFF01;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">   <span class="hljs-comment">// o&#x4E3A;&#x5DF2;&#x6709;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">var</span> M20 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o</span>)</span>{    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x88C5;&#x9970;&#x7C7B;</span>
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">&apos;20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&apos;</span>;
        <span class="hljs-comment">// o&#x662F;&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x8C03;&#x7528;&#x4F20;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x52A0;&#x4EE5;&#x88C5;&#x9970;</span>
        <span class="hljs-keyword">this</span>.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> str + o.eat()+<span class="hljs-string">&quot;,&#x80A5;&#x5F97;&#x5F88;&#xFF01;&quot;</span>;
        };
        <span class="hljs-keyword">this</span>.drink = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> str + o.drink()+<span class="hljs-string">&quot;,&#x5C31;&#x662F;&#x4E2A;&#x6C34;&#x6876;&#xFF01;&quot;</span>;
        };
        <span class="hljs-keyword">this</span>.coding = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> str + o.coding()+<span class="hljs-string">&quot;,&#x4EE3;&#x7801;&#x53C8;&#x5199;&#x5F97;&#x6487;&#xFF01;&quot;</span>;
        };
    }
    alert(<span class="hljs-keyword">new</span> M20(david).eat());    <span class="hljs-comment">// 20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&#x5927;&#x536B;&#x662F;&#x4E2A;&#x5927;&#x80D6;&#x5B50;&#xFF0C;&#x4E00;&#x5929;&#x53EA;&#x6653;&#x5F97;&#x5403;,&#x80A5;&#x5F97;&#x5F88;&#xFF01;</span>
    alert(<span class="hljs-keyword">new</span> M20(david).drink());    <span class="hljs-comment">// 20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&#x5927;&#x536B;&#x9664;&#x4E86;&#x5403;&#x5C31;&#x662F;&#x559D;,&#x5C31;&#x662F;&#x4E2A;&#x6C34;&#x6876;&#xFF01;</span>
    alert(<span class="hljs-keyword">new</span> M20(david).coding());    <span class="hljs-comment">// 20&#x591A;&#x5C81;&#x7684;&#x65F6;&#x5019;,&#x5199;&#x4EE3;&#x7801;&#x5427;&#xFF0C;&#x5927;&#x536B;,&#x4EE3;&#x7801;&#x53C8;&#x5199;&#x5F97;&#x6487;&#xFF01;</span></code></pre><h3 id="articleHeader10">8. &#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;</h3><p>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x63A5;&#x53E3;&#x5BF9;&#x73B0;&#x6709;&#x7684;&#x63A5;&#x53E3;&#x8FDB;&#x884C;&#x5305;&#x88C5;&#xFF0C;&#x5904;&#x7406;&#x6570;&#x636E;&#x4E0E;&#x63A5;&#x53E3;&#x7684;&#x4E0D;&#x5339;&#x914D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function api (x1, x2, x3) {
  console.log(x1 + x2 + x3);  // &#x7528;console.log&#x6765;&#x6A21;&#x62DF;&#x63A5;&#x53E3;&#x7684;&#x76F8;&#x5173;&#x64CD;&#x4F5C;
}

var data = {
  a: &apos;&#x6211;&apos;,
  b: &apos;&#x5F88;&apos;,
  c: &apos;&#x5E05;&apos;
}

function adapterApi (o) {
  // &#x901A;&#x8FC7;&#x9002;&#x914D;&#x5668;&#x51FD;&#x6570;&#x6765;&#x8C03;&#x7528;&#x76EE;&#x7684;api
  api(o.a, o.b, o.c);
} 

adapterApi(data);
// &#x6211;&#x5F88;&#x5E05;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">api</span> (<span class="hljs-params">x1, x2, x3</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x1 + x2 + x3);  <span class="hljs-comment">// &#x7528;console.log&#x6765;&#x6A21;&#x62DF;&#x63A5;&#x53E3;&#x7684;&#x76F8;&#x5173;&#x64CD;&#x4F5C;</span>
}

<span class="hljs-keyword">var</span> data = {
  <span class="hljs-attr">a</span>: <span class="hljs-string">&apos;&#x6211;&apos;</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-string">&apos;&#x5F88;&apos;</span>,
  <span class="hljs-attr">c</span>: <span class="hljs-string">&apos;&#x5E05;&apos;</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">adapterApi</span> (<span class="hljs-params">o</span>) </span>{
  <span class="hljs-comment">// &#x901A;&#x8FC7;&#x9002;&#x914D;&#x5668;&#x51FD;&#x6570;&#x6765;&#x8C03;&#x7528;&#x76EE;&#x7684;api</span>
  api(o.a, o.b, o.c);
} 

adapterApi(data);
<span class="hljs-comment">// &#x6211;&#x5F88;&#x5E05;</span></code></pre><p>&#x5B66;&#x4E60;&#x8D44;&#x6599;&#xFF1A;<br><a href="https://segmentfault.com/blog/feihu">&#x542C;&#x98DE;&#x72D0;&#x804A;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x7CFB;&#x5217;</a><br><a href="https://book.douban.com/subject/24744217/" rel="nofollow noreferrer" target="_blank">javascript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</a><br><a href="http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html" rel="nofollow noreferrer" target="_blank">&#x6C64;&#x59C6;&#x5927;&#x53D4;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript常用设计模式

## 原文链接
[https://segmentfault.com/a/1190000015437592](https://segmentfault.com/a/1190000015437592)


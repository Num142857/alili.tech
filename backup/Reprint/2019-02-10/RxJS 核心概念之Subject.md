---
title: 'RxJS 核心概念之Subject' 
date: 2019-02-10 2:30:42
hidden: true
slug: fpd9yfbbfj5
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>什么是Subject？</strong> 在RxJS中，Subject是一类特殊的Observable，它可以向多个Observer多路推送数值。普通的Observable并不具备多路推送的能力（每一个Observer都有自己独立的执行环境），而Subject可以共享一个执行环境。</p>
<p><em>Subject是一种可以多路推送的可观察对象。与EventEmitter类似，Subject维护着自己的Observer。</em></p>
<p><strong>每一个Subject都是一个Observable（可观察对象）</strong> 对于一个Subject，你可以订阅（<code>subscribe</code>）它，Observer会和往常一样接收到数据。从Observer的视角看，它并不能区分自己的执行环境是普通Observable的单路推送还是基于Subject的多路推送。</p>
<p>Subject的内部实现中，并不会在被订阅（<code>subscribe</code>）后创建新的执行环境。它仅仅会把新的Observer注册在由它本身维护的Observer列表中，这和其他语言、库中的<code>addListener</code>机制类似。</p>
<p><strong>每一个Subject也可以作为Observer（观察者）</strong> Subject同样也是一个由<code>next(v)</code>，<code>error(e)</code>，和 <code>complete()</code>这些方法组成的对象。调用<code>next(theValue)</code>方法后，Subject会向所有已经在其上注册的Observer多路推送<code>theValue</code>。</p>
<p>下面的例子中，我们在Subject上注册了两个Observer，并且多路推送了一些数值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.Subject();

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.next(<span class="hljs-number">1</span>);
subject.next(<span class="hljs-number">2</span>);</code></pre>
<p>控制台输出结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA: 1
observerB: 1
observerA: 2
observerB: 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span></code></pre>
<p>既然Subject是一个Observer，你可以把它作为<code>subscribe</code>（订阅）普通Observable时的参数，如下面例子所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

var observable = Rx.Observable.from([1, 2, 3]);

observable.subscribe(subject); // 你可以传递Subject来订阅observable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.Subject();

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

<span class="hljs-keyword">var</span> observable = Rx.Observable.from([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

observable.subscribe(subject); <span class="hljs-comment">// 你可以传递Subject来订阅observable</span></code></pre>
<p>执行后结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA: 1
observerB: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span></code></pre>
<p>通过上面的实现：我们发现可以通过Subject将普通的Observable单路推送转换为多路推送。这说明了Subject的作用——作为单路Observable转变为多路Observable的桥梁。</p>
<p>还有几种特殊的<code>Subject</code> 类型，分别是<code>BehaviorSubject</code>，<code>ReplaySubject</code>，和 <code>AsyncSubject</code>。</p>
<h2 id="articleHeader0">多路推送的Observable</h2>
<p>在以后的语境中，每当提到“多路推送的Observable”，我们特指通过Subject构建的Observable执行环境。否则“普通的Observable”只是一个不会共享执行环境并且被订阅后才生效的一系列值。</p>
<p><em>通过使用Subject可以创建拥有相同执行环境的多路的Observable。</em></p>
<p>下面展示了<code>多路</code>的运作方式：Subject从普通的Observable订阅了数据，然后其他Observer又订阅了这个Subject，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// 通过`subject.subscribe({...})`订阅Subject的Observer：
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// 让Subject从数据源订阅开始生效：
multicasted.connect();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> source = Rx.Observable.from([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.Subject();
<span class="hljs-keyword">var</span> multicasted = source.multicast(subject);

<span class="hljs-comment">// 通过`subject.subscribe({...})`订阅Subject的Observer：</span>
multicasted.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
multicasted.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

<span class="hljs-comment">// 让Subject从数据源订阅开始生效：</span>
multicasted.connect();</code></pre>
<p><code>multicast</code>方法返回一个类似于Observable的可观察对象，但是在其被订阅后，它会表现Subject的特性。  <code>multicast</code> 返回的对象同时是<code>ConnectableObservable</code>类型的，拥有<code>connect()</code> 方法。</p>
<p><code>connect()</code>方法非常的重要，它决定Observable何时开始执行。由于调用<code>connect()</code>后，Observable开始执行，因此，<code>connect()</code>会返回一个<code>Subscription</code>供调用者来终止执行。</p>
<h3 id="articleHeader1">引用计数</h3>
<p>通过手动调用<code>connect()</code>返回的Subscription控制执行十分繁杂。通常，我们希望在有第一个Observer订阅Subject后<em>自动</em><code>connnect</code>，当所有Observer都取消订阅后终止这个Subject。</p>
<p>我们来分析一下下面例子中subscription的过程：</p>
<ol>
<li><p>第一个Observer 订阅了多路推送的 Observable</p></li>
<li><p><strong>多路Observable被连接</strong></p></li>
<li><p>向第一个Observer发送 值为<code>0</code>的<code>next</code>通知</p></li>
<li><p>第二个Observer订阅了多路推送的 Observable</p></li>
<li><p>向第一个Observer发送 值为<code>1</code>的<code>next</code>通知</p></li>
<li><p>向第二个Observer发送 值为<code>1</code>的<code>next</code>通知</p></li>
<li><p>第一个Observer取消了对多路推送的Observable的订阅</p></li>
<li><p>向第二个Observer发送 值为<code>2</code>的<code>next</code>通知</p></li>
<li><p>第二个Observer取消了对多路推送的Observable的订阅</p></li>
<li><p><strong>取消对多路推送的Observable的连接</strong></p></li>
</ol>
<p>通过显式地调用<code>connect()</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);
var subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); 
}, 2000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> source = Rx.Observable.interval(<span class="hljs-number">500</span>);
<span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.Subject();
<span class="hljs-keyword">var</span> multicasted = source.multicast(subject);
<span class="hljs-keyword">var</span> subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
subscriptionConnect = multicasted.connect();

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  subscription2 = multicasted.subscribe({
    <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
  });
}, <span class="hljs-number">600</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  subscription1.unsubscribe();
}, <span class="hljs-number">1200</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); 
}, <span class="hljs-number">2000</span>);</code></pre>
<p>如果你不想显式地调用<code>connect()</code>方法，可以在ConnectableObservable类型的Observable上调用<code>refCount()</code>方法。方法会进行引用计数：记录Observable被订阅的行为。当订阅数从 <code>0</code> 到 <code>1</code>时<code>refCount()</code> 会调用<code>connect()</code> 方法。到订阅数从<code>1</code> 到 <code>0</code>，他会终止整个执行过程。</p>
<p><em><code>refCount</code> 使得多路推送的Observable在被订阅后自动执行，在所有观察者取消订阅后，停止执行。</em></p>
<p>下面是示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> source = Rx.Observable.interval(<span class="hljs-number">500</span>);
<span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.Subject();
<span class="hljs-keyword">var</span> refCounted = source.multicast(subject).refCount();
<span class="hljs-keyword">var</span> subscription1, subscription2, subscriptionConnect;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA subscribed'</span>);
subscription1 = refCounted.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB subscribed'</span>);
  subscription2 = refCounted.subscribe({
    <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
  });
}, <span class="hljs-number">600</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA unsubscribed'</span>);
  subscription1.unsubscribe();
}, <span class="hljs-number">1200</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB unsubscribed'</span>);
  subscription2.unsubscribe();
}, <span class="hljs-number">2000</span>);</code></pre>
<p>执行输出结果如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA subscribed
observerA: 0
observerB subscribed
observerA: 1
observerB: 1
observerA unsubscribed
observerB: 2
observerB unsubscribed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
observerA subscribed
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">0</span>
observerB subscribed
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">1</span>
observerA unsubscribed
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
observerB unsubscribed</code></pre>
<p>只有ConnectableObservables拥有<code>refCount()</code>方法，调用后会返回一个<code>Observable</code>而不是新的ConnectableObservable。</p>
<h2 id="articleHeader2">BehaviorSubject</h2>
<p><code>BehaviorSubject</code>是Subject的一个衍生类，具有“最新的值”的概念。它总是保存最近向数据消费者发送的值，当一个Observer订阅后，它会即刻从<code>BehaviorSubject</code>收到“最新的值”。</p>
<p><em>BehaviorSubjects非常适于表示“随时间推移的值”。举一个形象的例子，Subject表示一个人的生日，而Behavior则表示一个人的岁数。（生日只是一天，一个人的岁数会保持到下一次生日之前。）</em></p>
<p>下面例子中，展示了如何用 <code>0</code>初始化BehaviorSubject，当Observer订阅它时，<code>0</code>是第一个被推送的值。紧接着，在第二个Observer订阅BehaviorSubject之前，它推送了<code>2</code>，虽然订阅在推送<code>2</code>之后，但是第二个Observer仍然能接受到<code>2</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.BehaviorSubject(0 /* 初始值 */);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.BehaviorSubject(<span class="hljs-number">0</span> <span class="hljs-comment">/* 初始值 */</span>);

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

subject.next(<span class="hljs-number">1</span>);
subject.next(<span class="hljs-number">2</span>);

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.next(<span class="hljs-number">3</span>);</code></pre>
<p>输出结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">0</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span></code></pre>
<h2 id="articleHeader3">ReplaySubject</h2>
<p><code>ReplaySubject</code> 如同于<code>BehaviorSubject</code>是 <code>Subject</code> 的子类。通过 <code>ReplaySubject</code>可以向新的订阅者推送旧数值，就像一个录像机<code>ReplaySubject</code>可以记录Observable的一部分状态（过去时间内推送的值）。</p>
<p><em>.一个<code>ReplaySubject</code>可以记录Observable执行过程中推送的多个值，并向新的订阅者回放它们。</em></p>
<p>你可以指定回放值的数量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.ReplaySubject(3 /* 回放数量 */);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.ReplaySubject(<span class="hljs-number">3</span> <span class="hljs-comment">/* 回放数量 */</span>);

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

subject.next(<span class="hljs-number">1</span>);
subject.next(<span class="hljs-number">2</span>);
subject.next(<span class="hljs-number">3</span>);
subject.next(<span class="hljs-number">4</span>);

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.next(<span class="hljs-number">5</span>);</code></pre>
<p>输出如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">5</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">5</span></code></pre>
<p>除了回放数量，你也可以以毫秒为单位去指定“窗口时间”，决定ReplaySubject记录多久以前Observable推送的数值。下面的例子中，我们把回放数量设置为<code>100</code>，把窗口时间设置为<code>500</code>毫秒：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

var i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.ReplaySubject(<span class="hljs-number">100</span>, <span class="hljs-number">500</span> <span class="hljs-comment">/* windowTime */</span>);

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;
setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> subject.next(i++), <span class="hljs-number">200</span>);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  subject.subscribe({
    <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
  });
}, <span class="hljs-number">1000</span>);</code></pre>
<p>第二个Observer接受到<code>3</code>（600ms）, <code>4</code>（800ms） 和 <code>5</code>（1000ms），这些值均在订阅之前的<code>500</code>毫秒内推送（窗口长度 1000ms - 600ms = 400ms &lt; 500ms）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerA: 5
observerB: 3
observerB: 4
observerB: 5
observerA: 6
observerB: 6
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">5</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">5</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">6</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">6</span>
...</code></pre>
<h2 id="articleHeader4">AsyncSubject</h2>
<p>AsyncSubject是Subject的另外一个衍生类，Observable仅会在执行完成后，推送执行环境中的最后一个值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);
subject.complete();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Rx.AsyncSubject();

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

subject.next(<span class="hljs-number">1</span>);
subject.next(<span class="hljs-number">2</span>);
subject.next(<span class="hljs-number">3</span>);
subject.next(<span class="hljs-number">4</span>);

subject.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.next(<span class="hljs-number">5</span>);
subject.complete();</code></pre>
<p>输出结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
observerA: 5
observerB: 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="none">
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">5</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">5</span></code></pre>
<p>AsyncSubject 与 <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last" rel="nofollow noreferrer" target="_blank"><code>last()</code></a> 操作符相似，等待完成通知后推送执行过程的最后一个值。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RxJS 核心概念之Subject

## 原文链接
[https://segmentfault.com/a/1190000005069851](https://segmentfault.com/a/1190000005069851)


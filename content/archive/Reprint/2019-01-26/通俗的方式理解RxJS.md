---
title: '通俗的方式理解RxJS' 
date: 2019-01-26 2:30:18
hidden: true
slug: yn4f1oq6n2
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">通俗的方式理解Rx.js</h2>
<h3 id="articleHeader1">序言</h3>
<p>今早看<a href="https://zhuanlan.zhihu.com/p/25383159" rel="nofollow noreferrer" target="_blank">民工叔</a>的文章的时候， 发现对Rxjs所知甚少， 于是去官方看了下教程， 整理出一些东西， 写成此文。<br>Rxjs据说会在2017年流行起来， 因为其处理异步逻辑，数据流， 事件非常擅长。 但是其学习曲线相比Promise， EventEmitter陡峭了不少。 而且民工叔也说:"由于RxJS的抽象程度很高，所以，可以用很简短代码表达很复杂的含义，这对开发人员的要求也会比较高，需要有比较强的归纳能力。" 本文就Rx.js的几个核心概念做出阐述。 尽可能以通俗易懂的方式解释这些概念。要是本文有误或不完善的地方，欢迎指出。</p>
<h3 id="articleHeader2">Observable到底是什么</h3>
<p>先上代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = Rx.Observable.create(observer => {
  console.log('Hello');
  observer.next(42);
});

foo.subscribe(x => console.log(x));
foo.subscribe(y => console.log(y));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> foo = Rx.Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  observer.next(<span class="hljs-number">42</span>);
});

foo.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));
foo.subscribe(<span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(y));</code></pre>
<p>输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Hello&quot;
42
&quot;Hello&quot;
42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span></code></pre>
<p>这里可以把foo想象成一个函数，<strong>这意味着你每次调用foo都会导致传入Rx.Observable.create里的回调函数重新执行一次</strong>, 调用的方式为foo.subscribe(callback), 相当于foo()。 接收函数返回值的方式也从var a = foo()改为通过传入回调函数的方式获取。第三行的observer.next表示返回一个值, 你可以调用多次，<strong>每次调用observer.next后， 会先将next里的值返回给foo.subcribe里的回调函数, 执行完后再返回</strong>。observer.complete, observer.error来控制流程。 具体看代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(observer => {
  try {
    observer.next(1);
    console.log('hello');
    observer.next(2);
    observer.next(3);
    observer.complete();
    observer.next(4);
  } catch (err) {
    observer.error(err); 
  }
});

let = subcription = observable.subscribe(value => {
  console.log(value)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> {
  <span class="hljs-keyword">try</span> {
    observer.next(<span class="hljs-number">1</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
    observer.next(<span class="hljs-number">2</span>);
    observer.next(<span class="hljs-number">3</span>);
    observer.complete();
    observer.next(<span class="hljs-number">4</span>);
  } <span class="hljs-keyword">catch</span> (err) {
    observer.error(err); 
  }
});

<span class="hljs-keyword">let</span> = subcription = observable.subscribe(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(value)
})</code></pre>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1
hello
2
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>
hello
<span class="hljs-number">2</span>
<span class="hljs-number">3</span></code></pre>
<p>如上的第一个回调函数里的结构是推荐的结构。 当observable的执行出现异常的时候，通过observer.error将错误返回, 然而observable.subscribe的回调函数无法接收到.因为observer.complete已经调用, 因此observer.next(4)的返回是无效的. <strong>Observable不是可以返回多个值的Promise</strong> 虽然获得Promise的值的方式也是通过then函数这种类似的方式, 但是new Promise(callback)里的callback回调永远只会执行一次！因为<strong>Promise的状态是不可逆的</strong>。</p>
<p>可以使用其他方式创建Observable， 看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var clicks = Rx.Observable.fromEvent(document, 'click');
clicks.subscribe(x => console.log(x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> clicks = Rx.Observable.fromEvent(<span class="hljs-built_in">document</span>, <span class="hljs-string">'click'</span>);
clicks.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));</code></pre>
<p>当用户对document产生一个click行为的时候， 就会打印事件对象到控制台上。</p>
<h3 id="articleHeader3">Observer是什么</h3>
<p>先看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = Rx.Observable.create(observer => {
  console.log('Hello');
  observer.next(42);
});

let observer = x => console.log(x);
foo.subscribe(observer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> foo = Rx.Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  observer.next(<span class="hljs-number">42</span>);
});

<span class="hljs-keyword">let</span> observer = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x);
foo.subscribe(observer);</code></pre>
<p>代码中的第二个变量就是observer. 没错， observer就是<strong>当Observable"返回"值的时候接受那个值的函数!</strong>第一行中的observer其实就是通过foo.subscribe传入的callback. 只不过稍加封装了。 怎么封装的？ 看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = Rx.Observable.create(observer => {
  try {
    console.log('Hello');
    observer.next(42);
    observer.complete();
    observer.next(10);
  } catch(e) { observer.error(e) }
  
});

let observer = {
  next(value) { console.log(value) },
  complete() { console.log('completed'),
  error(err) { console.error(err) }
}
foo.subscribe(observer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-keyword">let</span> foo = Rx.Observable.create(observer =&gt; {
  try {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-comment">'Hello');</span>
    observer.<span class="hljs-keyword">next</span>(<span class="hljs-number">42</span>);
    observer.complete();
    observer.<span class="hljs-keyword">next</span>(<span class="hljs-number">10</span>);
  } catch(e) { observer.<span class="hljs-keyword">error</span>(e) }
  
});

<span class="hljs-keyword">let</span> observer = {
  <span class="hljs-keyword">next</span>(value) { console.<span class="hljs-built_in">log</span>(value) },
  complete() { console.<span class="hljs-built_in">log</span>(<span class="hljs-comment">'completed'),</span>
  <span class="hljs-keyword">error</span>(<span class="hljs-built_in">err</span>) { console.<span class="hljs-keyword">error</span>(<span class="hljs-built_in">err</span>) }
}
foo.subscribe(observer);</code></pre>
<p>你看到observer被定义成了一个对象， 其实这才是完整的observer. 传入一个callback到observable.subcribe相当于传入了<code>{ next: callback }</code>。</p>
<h3 id="articleHeader4">Subcription里的陷阱</h3>
<p>Subscription是什么， 先上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.interval(1000);
var subscription = observable.subscribe(x => console.log(x));

setTimeout(() => {
  subscription.unsubscribe();
}, 3100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> observable = Rx.Observable.interval(<span class="hljs-number">1000</span>);
<span class="hljs-keyword">var</span> subscription = observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  subscription.unsubscribe();
}, <span class="hljs-number">3100</span>)</code></pre>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0
1
2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">0</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span></code></pre>
<p>Rx.Observable.interval可以返回<strong>一个能够发射(返回)0， 1， 2， 3...， n数字的Observable</strong>， 返回的时间间隔这里是1000ms。 第二行中的变量就是subscription。 subscription有一个unsubscribe方法, 这个方法可以让<strong>subscription订阅的observable发射的数据被observer忽略掉</strong>.通俗点说就是取消订阅。</p>
<p>unsubscribe存在一个陷阱。 先看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = Rx.Observable.create((observer) => {
  var i = 0
  setInterval(() => {
    observer.next(i++)
    console.log('hello')
  }, 1000)
})

const subcription = foo.subscribe((i) => console.log(i))
subcription.unsubscribe()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var foo = Rx.Observable.create(<span class="hljs-function"><span class="hljs-params">(observer)</span> =&gt;</span> {
  var i = <span class="hljs-number">0</span>
  setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(i++)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>)
  }, <span class="hljs-number">1000</span>)
})

const subcription = foo.subscribe(<span class="hljs-function"><span class="hljs-params">(i)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(i))
subcription.unsubscribe()</code></pre>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hello
hello
hello
......
hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>hello
hello
hello
......
hello</code></pre>
<p>unsubscribe只会让observer忽略掉observable发射的数据，但是setInterval依然会继续执行。 这看起来似乎是一个愚蠢的设计。 所以不建议这样写。</p>
<h3 id="articleHeader5">Subject</h3>
<p><strong>Subject是一种能够发射数据给多个observer的Observable</strong>, 这让Subject看起来就好像是EventEmitter。 先上代码：</p>
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
      </div><pre class="hljs coffeescript"><code>var subject = <span class="hljs-keyword">new</span> Rx.Subject();

subject.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
subject.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.next(<span class="hljs-number">1</span>);
subject.next(<span class="hljs-number">2</span>);</code></pre>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observerA: 1
observerB: 1
observerA: 2
observerB: 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span></code></pre>
<p>与Observable不同的是， Subject发射数据给多个observer。 其次， 定义subject的时候并没有传入callback， 这是因为subject自带next, complete, error等方法。从而可以发射数据给observer。 这和EventEmitter很类似。observer并不知道他subscribe的是Obervable还是Subject。 对observer来说是透明的。 而且Subject还有各种派生， 比如说：</p>
<blockquote><p>BehaviorSubject 能够保留最近的数据，使得当有subscribe的时候，立马发射出去。看代码：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

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
      </div><pre class="hljs coffeescript"><code>var subject = <span class="hljs-keyword">new</span> Rx.BehaviorSubject(<span class="hljs-number">0</span>); <span class="hljs-regexp">//</span> <span class="hljs-number">0</span> <span class="hljs-keyword">is</span> the initial value

subject.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

subject.next(<span class="hljs-number">1</span>);
subject.next(<span class="hljs-number">2</span>);

subject.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.next(<span class="hljs-number">3</span>);</code></pre>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">observerA:</span> <span class="hljs-number">0</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span></code></pre>
<blockquote><p>ReplaySubject 能够保留最近的一些数据， 使得当有subscribe的时候，将这些数据发射出去。看代码：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subject = new Rx.ReplaySubject(3); 

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
      </div><pre class="hljs moonscript"><code>var subject = new Rx.ReplaySubject(<span class="hljs-number">3</span>); 

subject.subscribe({
  <span class="hljs-name">next</span>: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> console.log(<span class="hljs-string">'observerA: '</span> + v)
});

subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">1</span>);
subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">2</span>);
subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">3</span>);
subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">4</span>);

subject.subscribe({
  <span class="hljs-name">next</span>: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> console.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">5</span>);</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">5</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">5</span>
</code></pre>
<p>第一行的声明表示ReplaySubject最大能够记录的数据的数量是3。</p>
<blockquote><p>AsyncSubject 只会发射结束前的一个数据。 看代码：</p></blockquote>
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
      </div><pre class="hljs moonscript"><code>var subject = new Rx.AsyncSubject();

subject.subscribe({
  <span class="hljs-name">next</span>: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> console.log(<span class="hljs-string">'observerA: '</span> + v)
});

subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">1</span>);
subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">2</span>);
subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">3</span>);
subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">4</span>);

subject.subscribe({
  <span class="hljs-name">next</span>: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> console.log(<span class="hljs-string">'observerB: '</span> + v)
});

subject.<span class="hljs-built_in">next</span>(<span class="hljs-number">5</span>);
subject.complete();</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observerA: 5
observerB: 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">observerA:</span> <span class="hljs-number">5</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">5</span></code></pre>
<p>既然subject有next, error, complete三种方法， 那subject就可以作为observer！ 看代码：</p>
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

observable.subscribe(subject);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var subject = <span class="hljs-keyword">new</span> Rx.Subject();

subject.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
subject.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

var observable = Rx.Observable.<span class="hljs-keyword">from</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

observable.subscribe(subject);</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observerA: 1
observerB: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">3</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">3</span></code></pre>
<p>也就是说， observable.subscribe可以传入一个subject来订阅其消息。 这就好像是Rxjs中的一颗语法糖， Rxjs有专门的实现。</p>
<blockquote><p>Multicasted Observables 是一种借助Subject来将数据发射给多个observer的Observable。 看代码：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

multicasted.connect();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var source = Rx.Observable.<span class="hljs-keyword">from</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
var subject = <span class="hljs-keyword">new</span> Rx.Subject();
var multicasted = source.multicast(subject);

multicasted.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});
multicasted.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
});

multicasted.connect();</code></pre>
<p>Rx.Observable.from能够逐一发射数组中的元素， 在multicasted.connect()调用之前的任何subscribe都不会导致source发射数据。multicasted.connect()相当于之前的observable.subscribe(subject)。因此不能将multicasted.connect()写在subscribe的前面。因为这会导致在执行multicasted.connect()的时候source发射数据， 但是subject又没保存数据， 导致两个subscribe无法接收到任何数据。 </p>
<p>最好是第一个subscribe的时候能够得到当前已有的数据， 最后一个unsubscribe的时候就<strong>停止Observable的执行</strong>， 相当于Observable发射的数据都被忽略。</p>
<blockquote><p>refCount就是能够返回这样的Observable的方法</p></blockquote>
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
      </div><pre class="hljs coffeescript"><code>var source = Rx.Observable.interval(<span class="hljs-number">500</span>);
var subject = <span class="hljs-keyword">new</span> Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA subscribed'</span>);
subscription1 = refCounted.subscribe({
  next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerA: '</span> + v)
});

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB subscribed'</span>);
  subscription2 = refCounted.subscribe({
    next: <span class="hljs-function"><span class="hljs-params">(v)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observerB: '</span> + v)
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
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observerA subscribed
observerA: 0
observerB subscribed
observerA: 1
observerB: 1
observerA unsubscribed
observerB: 2
observerB unsubscribed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>observerA subscribed
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">0</span>
observerB subscribed
<span class="hljs-symbol">observerA:</span> <span class="hljs-number">1</span>
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">1</span>
observerA unsubscribed
<span class="hljs-symbol">observerB:</span> <span class="hljs-number">2</span>
observerB unsubscribed</code></pre>
<h3 id="articleHeader6">What's Operators?</h3>
<p>Observable上有很多方法， 比如说map, filter, merge等等。 他们基于调用它们的observable，返回一个<strong>全新的observable</strong>。 而且他们都是纯方法。 operators分为两种， instance operators 和 static operators。 instance operators是存在于observable实例上的方法， 也就是实例方法； static operators是存在于Observable这个类型上的方法， 也就是静态方法。Rxjs拥有很多强大的<a href="http://reactivex.io/rxjs" rel="nofollow noreferrer" target="_blank">operators</a>。</p>
<p>自己实现一个operators：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function multiplyByTen(input) {
  var output = Rx.Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  return output;
}

var input = Rx.Observable.from([1, 2, 3, 4]);
var output = multiplyByTen(input);
output.subscribe(x => console.log(x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiplyByTen</span>(<span class="hljs-params">input</span>) </span>{
  <span class="hljs-keyword">var</span> output = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
    input.subscribe({
      <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> observer.next(<span class="hljs-number">10</span> * v),
      <span class="hljs-attr">error</span>: <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> observer.error(err),
      <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> observer.complete()
    });
  });
  <span class="hljs-keyword">return</span> output;
}

<span class="hljs-keyword">var</span> input = Rx.Observable.from([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]);
<span class="hljs-keyword">var</span> output = multiplyByTen(input);
output.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="10
20
30
40" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">10</span>
<span class="hljs-number">20</span>
<span class="hljs-number">30</span>
<span class="hljs-number">40</span></code></pre>
<h3 id="articleHeader7">Rx.js实践</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {count: 0};
  }

  // Click events are now observables! No more proactive approach.
  componentDidMount () {
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');

    const plus$ = Rx.Observable.fromEvent(plusBtn, 'click').map(e => 1);
    const minus$ = Rx.Observable.fromEvent(minusBtn, 'click').map(e => -1);

    Rx.Observable.merge(plus$, minus$).scan((acc, n) => acc + n)
      .subscribe(value => this.setState({count: value}));
  }

  render () {
    return (
        <div>
          <button id=&quot;plus&quot;>+</button>
          <button id=&quot;minus&quot;>-</button>
          <div>count: {this.state.count}</div>
        </div>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> Rx <span class="hljs-keyword">from</span> <span class="hljs-string">'rx'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Main</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span> (props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">0</span>};
  }

  <span class="hljs-comment">// Click events are now observables! No more proactive approach.</span>
  componentDidMount () {
    <span class="hljs-keyword">const</span> plusBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'plus'</span>);
    <span class="hljs-keyword">const</span> minusBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'minus'</span>);

    <span class="hljs-keyword">const</span> plus$ = Rx.Observable.fromEvent(plusBtn, <span class="hljs-string">'click'</span>).map(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-number">1</span>);
    <span class="hljs-keyword">const</span> minus$ = Rx.Observable.fromEvent(minusBtn, <span class="hljs-string">'click'</span>).map(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-number">-1</span>);

    Rx.Observable.merge(plus$, minus$).scan(<span class="hljs-function">(<span class="hljs-params">acc, n</span>) =&gt;</span> acc + n)
      .subscribe(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">count</span>: value}));
  }

  render () {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"plus"</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"minus"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>count: {this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Main</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));
</code></pre>
<p>merge用于合并两个observable产生一个新的observable。 scan类似于Array中的reduce。 <a href="https://github.com/belfz/fully-reactive-react-example" rel="nofollow noreferrer" target="_blank">这个例子</a>实现了点击plus的时候+1， 点击minus的时候-1。</p>
<h3 id="articleHeader8">Rx.js适用的场景</h3>
<ul>
<li>多个复杂的异步或事件组合在一起。</li>
<li>处理多个数据序列</li>
</ul>
<p>假如没有被复杂的异步，事件， 数据序列困扰， 如果promise已经足够的话， 就没必要适用Rx.js。</p>
<h3 id="articleHeader9">Summary</h3>
<ul>
<li>Observable， Observer， Subscription， Subscrib， Subject概念。</li>
<li>RxJS适用于解决复杂的异步，事件问题。</li>
</ul>
<h3 id="articleHeader10">文章参考</h3>
<ul>
<li><a href="https://fe.ele.me/let-us-learn-rxjs/" rel="nofollow noreferrer" target="_blank">让我们一起来学习 RxJS ---by 饿了么前端</a></li>
<li><a href="https://github.com/Reactive-Extensions/RxJS/blob/master/doc/designguidelines/readme.md#21-use-rxjs-for-orchestrating-asynchronous-and-event-based-computations" rel="nofollow noreferrer" target="_blank">21-use-rxjs-for-orchestrating-asynchronous-and-event-based-computations</a></li>
<li><a href="http://reactivex.io/rxjs/manual/overview.html" rel="nofollow noreferrer" target="_blank">RxJS文档</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/25383159" rel="nofollow noreferrer" target="_blank">RxJS 入门指引和初步应用 ---by 民工叔</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通俗的方式理解RxJS

## 原文链接
[https://segmentfault.com/a/1190000008464065](https://segmentfault.com/a/1190000008464065)


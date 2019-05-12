---
title: 'RxJs 核心概念之Observable' 
date: 2019-02-11 2:30:49
hidden: true
slug: gnukqsopvw
categories: [reprint]
---

{{< raw >}}

                    
<p>Observable（<strong>可观察对象</strong>）是基于推送（<strong>Push</strong>）运行时执行（<strong>lazy</strong>）的多值集合。下方表格对Observable进行了定位（<em>为解决基于推送的多值问题</em>）：</p>
<table>
<thead><tr>
<th>MagicQ</th>
<th>单值</th>
<th>多值</th>
</tr></thead>
<tbody>
<tr>
<td><strong>拉取(Pull)</strong></td>
<td><a href="https://developer.mozilla.org/en-US/docs/Glossary/Function" rel="nofollow noreferrer" target="_blank"><code>函数</code></a></td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols" rel="nofollow noreferrer" target="_blank">遍历器</a></td>
</tr>
<tr>
<td><strong>推送(Push)</strong></td>
<td><a href="https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise" rel="nofollow noreferrer" target="_blank"><code>Promise</code></a></td>
<td><a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html" rel="nofollow noreferrer" target="_blank"><code>Observable</code></a></td>
</tr>
</tbody>
</table>
<p><strong>例</strong>：当<code>observable</code>被订阅后，会立即（<em>同步地</em>）推送<code>1</code>， <code>2</code>， <code>3</code> 三个值；1秒之后，继续推送<code>4</code>这个值，最后结束（<em>推送结束通知</em>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">observer</span>) </span>{
  observer.next(<span class="hljs-number">1</span>);
  observer.next(<span class="hljs-number">2</span>);
  observer.next(<span class="hljs-number">3</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(<span class="hljs-number">4</span>);
    observer.complete();
  }, <span class="hljs-number">1000</span>);
});</code></pre>
<p>为得到<code>observable</code>推送的值，我们需要订阅（<em>subscribe</em>）这个Observable：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">observer</span>) </span>{
  observer.next(<span class="hljs-number">1</span>);
  observer.next(<span class="hljs-number">2</span>);
  observer.next(<span class="hljs-number">3</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(<span class="hljs-number">4</span>);
    observer.complete();
  }, <span class="hljs-number">1000</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'just before subscribe'</span>);
observable.subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'got value '</span> + x),
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'something wrong occurred: '</span> + err),
  <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'done'</span>),
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'just after subscribe'</span>);</code></pre>
<p>程序执行后，将在控制台输出如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code class="none">
just <span class="hljs-keyword">before</span> subscribe
got <span class="hljs-built_in">value</span> <span class="hljs-number">1</span>
got <span class="hljs-built_in">value</span> <span class="hljs-number">2</span>
got <span class="hljs-built_in">value</span> <span class="hljs-number">3</span>
just <span class="hljs-keyword">after</span> subscribe
got <span class="hljs-built_in">value</span> <span class="hljs-number">4</span>
done</code></pre>
<h2 id="articleHeader0">拉取(Pull)  V.S. 推送(Push)</h2>
<p><em>拉取</em>和<em>推送</em>是数据<em>生产者</em>和数据<em>消费者</em>之间通信的两种不同机制。</p>
<p><strong>何为拉取？</strong> 在拉取系统中，总是由消费者决定何时从生产者那里获得数据。生产者对数据传递给消费者的时间毫无感知（<em>被动的生产者，主动的消费者</em>）。</p>
<p>JavaScript函数是典型的拉取系统：函数是数据的生产者，对函数进行调用的代码（消费者）从函数调用后的返回值中拉取<em>单值</em>进行消费。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 函数是数据的生产者
let getLuckyNumber = function() {
    return 7;
};

/* let代码段是数据的消费者，
 * getLuckyNumber对调用时间毫无感知。 
 */
let luckNumber = getLuckyNumber();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 函数是数据的生产者</span>
<span class="hljs-keyword">let</span> getLuckyNumber = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">7</span>;
};

<span class="hljs-comment">/* let代码段是数据的消费者，
 * getLuckyNumber对调用时间毫无感知。 
 */</span>
<span class="hljs-keyword">let</span> luckNumber = getLuckyNumber();</code></pre>
<p>ES2015 引入了的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*" rel="nofollow noreferrer" target="_blank">生成器函数 | 遍历器</a> (<code>function*</code>)同样是基于拉取的系统： 调用 <code>iterator.next()</code>的代码段是消费者，它可以从生成器函数中拉取多个值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* getLessThanTen() {
  var i = 0;
  while(i < 11) {
    yield i++;
  }
}

// 生产者
let iterator = getLessThanTen();

// 消费者
iterator.next(); // Object {value: 0, done: false}
iterator.next(); // Object {value: 1, done: false}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getLessThanTen</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">while</span>(i &lt; <span class="hljs-number">11</span>) {
    <span class="hljs-keyword">yield</span> i++;
  }
}

<span class="hljs-comment">// 生产者</span>
<span class="hljs-keyword">let</span> iterator = getLessThanTen();

<span class="hljs-comment">// 消费者</span>
iterator.next(); <span class="hljs-comment">// Object {value: 0, done: false}</span>
iterator.next(); <span class="hljs-comment">// Object {value: 1, done: false}</span></code></pre>
<table>
<thead><tr>
<th>MagicQ</th>
<th>生产者</th>
<th>消费者</th>
</tr></thead>
<tbody>
<tr>
<td><strong>拉取</strong></td>
<td>
<strong>被动:</strong> 在被请求时产生数据</td>
<td>
<strong>主动:</strong> 决定何时请求数据</td>
</tr>
<tr>
<td><strong>推送</strong></td>
<td>
<strong>主动:</strong> 控制数据的产生逻辑</td>
<td>
<strong>被动:</strong> 获得数据后进行响应</td>
</tr>
</tbody>
</table>
<p><strong>何为推送？</strong> 在推送系统中生产者决定何时向消费者传递数据，消费者对何时收到数据毫无感知（被动的消费者）。</p>
<p>现代JavaScript中<strong>Promise</strong>是典型的推送系统。作为数据生产者的Promise通过<code>resolve()</code>向数据消费者——回调函数传递数据：与函数不同，Promise决定向回调函数推送值的时间。</p>
<p>RxJS在 JavaScript 中引入了Observable(可观察对象)这个新的推送系统。Observable是多数据值的生产者，向Observer(被动的消费者)推送数据。</p>
<ul>
<li><p><strong>函数</strong> 调用后同步计算并返回单一值</p></li>
<li><p><strong>生成器函数 | 遍历器 </strong> 遍历过程中同步计算并返回0个到无穷多个值</p></li>
<li><p><strong>Promise</strong> 异步执行中返回或者不返回单一值</p></li>
<li><p><strong>Observable</strong> 同步或者异步计算并返回0个到无穷多个值</p></li>
</ul>
<h2 id="articleHeader1">Observable 是函数概念的拓展</h2>
<p>Observable既不像EventEmitter，也不像是Promise。Observable 中的 Subject 进行多路推送时与 EventEmitter <strong>行为上</strong>有些类似，但是实际上Observable与EventEmitter并不相同。</p>
<p>Observable 更像是一个不需要传入参数的函数，它拓展了函数的概念使得它可以返回多个值。</p>
<p>看看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log('Hello');
  return 42;
}

var x = foo.call(); // same as foo()
console.log(x);
var y = foo.call(); // same as foo()
console.log(y);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-number">42</span>;
}

<span class="hljs-keyword">var</span> x = foo.call(); <span class="hljs-comment">// same as foo()</span>
<span class="hljs-built_in">console</span>.log(x);
<span class="hljs-keyword">var</span> y = foo.call(); <span class="hljs-comment">// same as foo()</span>
<span class="hljs-built_in">console</span>.log(y);</code></pre>
<p>输出结果如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;Hello&quot;
42
&quot;Hello&quot;
42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="none">
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span></code></pre>
<p>通过Observable可以实现同样的行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
});

foo.subscribe(function (x) {
  console.log(x);
});
foo.subscribe(function (y) {
  console.log(y);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  observer.next(<span class="hljs-number">42</span>);
});

foo.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
});
foo.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">y</span>) </span>{
  <span class="hljs-built_in">console</span>.log(y);
});</code></pre>
<p>输出结果相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;Hello&quot;
42
&quot;Hello&quot;
42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="none">
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span></code></pre>
<p>不论Observable还是函数都是在运行时进行求值计算的。如果不调用函数，<code>console.log('Hello')</code>就不会执行；如果如果不<code>subscribe</code>（订阅）Observable，<code>console.log('Hello')</code>也不会执行。此外，<strong>调用</strong>或者<strong>订阅</strong>都是独立的：两次调用产生两个独立的作用域，两次订阅同样会产生两个独立的作用域。EventEmitter总是在同一个作用域中，发射前也不会在意自己是否已经被订阅；Observable不会被共享而产生副作用，并且总是在被订阅时才执行。</p>
<p>订阅Observable与调用函数类似。</p>
<p>一些人认为Observable总是是异步的，这个观点并不正确，如果在控制台log函数中调用函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('before');
console.log(foo.call());
console.log('after');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before'</span>);
<span class="hljs-built_in">console</span>.log(foo.call());
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'after'</span>);</code></pre>
<p>显然可以看到以下输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;before&quot;
&quot;Hello&quot;
42
&quot;after&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="none">
<span class="hljs-string">"before"</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-string">"after"</span></code></pre>
<p>Observable的行为完全一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before'</span>);
foo.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'after'</span>);</code></pre>
<p>输出结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;before&quot;
&quot;Hello&quot;
42
&quot;after&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="none">
<span class="hljs-string">"before"</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-string">"after"</span></code></pre>
<p>订阅 <code>foo</code>完全是同步的，与函数的调用一样。</p>
<p>Observable可以异步或者同步地产生数据。</p>
<p>那Observable 与函数的不同之处在哪里？ <strong>Observable可以在一个时间过程中‘返回’多个值</strong>，而函数却不能。在函数中你不可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log('Hello');
  return 42;
  return 100; // 这个语句永远不会被执行。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-number">42</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-number">100</span>; <span class="hljs-comment">// 这个语句永远不会被执行。</span>
}</code></pre>
<p>虽然函数只能有一个返回值，但是在Observable中你完全可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100); // 返回另一个值
  observer.next(200); // 返回另一个值
});

console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  observer.next(<span class="hljs-number">42</span>);
  observer.next(<span class="hljs-number">100</span>); <span class="hljs-comment">// 返回另一个值</span>
  observer.next(<span class="hljs-number">200</span>); <span class="hljs-comment">// 返回另一个值</span>
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before'</span>);
foo.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'after'</span>);</code></pre>
<p>输出结果如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;before&quot;
&quot;Hello&quot;
42
100
200
&quot;after&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="none">
<span class="hljs-string">"before"</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-number">100</span>
<span class="hljs-number">200</span>
<span class="hljs-string">"after"</span></code></pre>
<p>你甚至可以异步地返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(() => {
    observer.next(300); // happens asynchronously
  }, 1000);
});

console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>);
  observer.next(<span class="hljs-number">42</span>);
  observer.next(<span class="hljs-number">100</span>);
  observer.next(<span class="hljs-number">200</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(<span class="hljs-number">300</span>); <span class="hljs-comment">// happens asynchronously</span>
  }, <span class="hljs-number">1000</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before'</span>);
foo.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'after'</span>);</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;before&quot;
&quot;Hello&quot;
42
100
200
&quot;after&quot;
300" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="none">
<span class="hljs-string">"before"</span>
<span class="hljs-string">"Hello"</span>
<span class="hljs-number">42</span>
<span class="hljs-number">100</span>
<span class="hljs-number">200</span>
<span class="hljs-string">"after"</span>
<span class="hljs-number">300</span></code></pre>
<p>结论：</p>
<ul>
<li><p><code>func.call()</code> 意味着“同步地给我一个值”</p></li>
<li><p><code>observable.subscribe()</code> 意味着“不管是同步或者异步，给我一些值”</p></li>
</ul>
<h2 id="articleHeader2">Observable 剖析</h2>
<p>通过使用 <code>Rx.Observable.create</code> 或者是<em>创建操作符</em>，<strong>创建</strong>一个Observable； Observable 被 Observer（观察者） <strong>订阅</strong>； 在<strong>执行</strong>时 向观察者发送<code>next</code> / <code>error</code> / <code>complete</code> 通知；同时执行过程可以被 <strong>终止</strong>。 <br>Observable 类型的实例具备了以上四个方面的特性，与其他类型如：Observer 和 Subscription 紧密相关。</p>
<p>我们重点关注以下四个方面：</p>
<ul>
<li><p><strong>创建</strong></p></li>
<li><p><strong>订阅</strong></p></li>
<li><p><strong>执行</strong></p></li>
<li><p><strong>终止</strong></p></li>
</ul>
<h3 id="articleHeader3">创建</h3>
<p><code>Rx.Observable.create</code> 是 <code>Observable</code> 构造函数的别名，接受一个参数： <code>subscribe</code>函数。</p>
<p>以下例子会创建一个Observable，每一秒钟向其订阅者发射一个<code>'hi'</code> 字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function subscribe(observer) {
  var id = setInterval(() => {
    observer.next('hi')
  }, 1000);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-keyword">var</span> id = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(<span class="hljs-string">'hi'</span>)
  }, <span class="hljs-number">1000</span>);
});</code></pre>
<p>除了使用<code>create</code>创建Observable，我们通常还使用<a>创建操作符</a>, 如 <code>of</code>，<code>from</code>， <code>interval</code>, 等来创建Observable。</p>
<p>上面例子中，<code>subscribe</code>函数是定义Observable最重要的部分。我们接下来了解订阅的含义。</p>
<h3 id="articleHeader4">订阅</h3>
<p>上面例子中的<code>observable</code> 可以以如下方式 <em>订阅</em> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observable.subscribe(x => console.log(x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));</code></pre>
<p><code>observable.subscribe</code> 和 <code>Observable.create(function subscribe(observer) {...})</code>中的<code>subscribe</code> 同名并非巧合。虽然在Rx中它们不是同一个对象，但是在工程中，我们可以在概念上视两者为等价物。</p>
<p>调用<code>subscribe</code>的观察者并不会共享同一个Observable。观察者调用<code>observable.subscribe</code> 时，<code>Observable.create(function subscribe(observer) {...})</code>中的<code>subscribe</code>会在调用它的观察者作用域中执行。每一次<code>observable.subscribe</code>的调用，都是彼此独立的。</p>
<p>订阅Observable如同调用函数，需要提供相应的回调方法。</p>
<p>订阅机制与处理事件的<code>addEventListener</code> / <code>removeEventListener</code>API完全不同。通过<code>observable.subscribe</code>，观察者并不需要在Observable中进行注册，Observable也不需要维护订阅者的列表。</p>
<p>订阅后便进入了Observable的执行阶段，在执行阶段值和事件将会被传递给观察者供其消费。</p>
<h3 id="articleHeader5">执行</h3>
<p>只有在被订阅之后Observable才会执行，执行的逻辑在<code>Observable.create(function subscribe(observer) {...})</code>中描述，执行后将会在特定时间段内，同步或者异步地成产多个数据值。</p>
<p>Observable在执行过程中，可以推送三种类型的值：</p>
<ul>
<li><p>"Next" 通知： 实际产生的数据，包括数字、字符串、对象等</p></li>
<li><p>"Error" 通知：一个JavaScript错误或者异常</p></li>
<li><p>"Complete" 通知：一个不带有值的事件</p></li>
</ul>
<p>“Next” 通知是最重要和常用的类型：表示事件传递给观察者的数据。错误和完成通知仅会在执行阶段推送其一，并不会同时推送错误和完成通知。</p>
<p>通过所谓的“Observable语法”或者“契约”可以最好地表达这个规则，“Observable语法”借助于正则表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="next*(error|complete)?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code class="none" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">next</span>*(<span class="hljs-built_in">error</span>|complete)?</code></pre>
<p>在Observable的执行过程中，0个或者多个“Next”通知会被推送。在错误或者完成通知被推送后，Observable不会再推送任何其他通知。</p>
<p>下面代码展示了Observable 在执行过程中推送3个“Next” 通知然后结束：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function subscribe(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
  observer.next(<span class="hljs-number">1</span>);
  observer.next(<span class="hljs-number">2</span>);
  observer.next(<span class="hljs-number">3</span>);
  observer.complete();
});</code></pre>
<p>Observable 严格遵守 Observable 契约，后面值为<code>4</code>的“Next” 通知永远不会被推送：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function subscribe(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  observer.next(4); // 由于违法契约，4不会被推送
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
  observer.next(<span class="hljs-number">1</span>);
  observer.next(<span class="hljs-number">2</span>);
  observer.next(<span class="hljs-number">3</span>);
  observer.complete();
  observer.next(<span class="hljs-number">4</span>); <span class="hljs-comment">// 由于违法契约，4不会被推送</span>
});</code></pre>
<p>使用<code>try</code>/<code>catch</code>块包裹 <code>subscribe</code> 代码是一个很赞的想法，如果捕获了异常，可以推送错误通知：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err); // 捕获异常后推送错误通知
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-keyword">try</span> {
    observer.next(<span class="hljs-number">1</span>);
    observer.next(<span class="hljs-number">2</span>);
    observer.next(<span class="hljs-number">3</span>);
    observer.complete();
  } <span class="hljs-keyword">catch</span> (err) {
    observer.error(err); <span class="hljs-comment">// 捕获异常后推送错误通知</span>
  }
});</code></pre>
<h3 id="articleHeader6">终止</h3>
<p>Observable的执行可能是无限的，作为观察者需要主动中断执行：我们需要特定的API去终止执行过程。因为特定的观察者都有特定的执行过程，一旦观察者获得想要的数据后就需要终止执行过程以免带来计算时对内存资源的浪费。</p>
<p>在<code>observable.subscribe</code>被调用时，观察者会与其执行作用域绑定，同时返回一个<code>Subscription</code>类型的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var subscription = observable.subscribe(x => console.log(x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> subscription = observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));</code></pre>
<p>Subscription对象表示执行过程，通过极简的API，你可以终止执行过程。详情请阅读<a><code>Subscription</code> 相关文档</a>。通过调用<code>subscription.unsubscribe()</code> 你可以终止执行过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.from([10, 20, 30]);
var subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.from([<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>]);
<span class="hljs-keyword">var</span> subscription = observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));
<span class="hljs-comment">// Later:</span>
subscription.unsubscribe();</code></pre>
<p>在Observable被订阅后，代表执行过程的Subscription 对象将被返回。对其调用<code>unsubscribe()</code>就可以终止执行。</p>
<p>每一个Observable都需要在 <code>create()</code>的创建过程中定义终止的逻辑。在<code>function subscribe()</code>中返回自定义的<code>unsubscribe</code>就可以实现。</p>
<p>下面的例子说明了如何在终止后释放<code>setInterval</code>的句柄：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.create(function subscribe(observer) {
  // 获得定时函数的句柄
  var intervalID = setInterval(() => {
    observer.next('hi');
  }, 1000);
  
  // 提供终止方法释放定时函数的句柄
  return function unsubscribe() {
    clearInterval(intervalID);
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.create(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-comment">// 获得定时函数的句柄</span>
  <span class="hljs-keyword">var</span> intervalID = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(<span class="hljs-string">'hi'</span>);
  }, <span class="hljs-number">1000</span>);
  
  <span class="hljs-comment">// 提供终止方法释放定时函数的句柄</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
    clearInterval(intervalID);
  };
});</code></pre>
<p>类似于<code>observable.subscribe</code> 和 <code>Observable.create(function subscribe() {...})</code>的关系，我们在<code>subscribe</code>中返回的 <code>unsubscribe</code> 也与<code>subscription.unsubscribe</code>在概念上等价。事实上，如果我们除去Rx的包装，纯粹的JavaScript代码简单清晰：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function subscribe(observer) {
  var intervalID = setInterval(() => {
    observer.next('hi');
  }, 1000);
  
  return function unsubscribe() {
    clearInterval(intervalID);
  };
}

var unsubscribe = subscribe({next: (x) => console.log(x)});

// 一段时间后:
unsubscribe(); // 终止" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">observer</span>) </span>{
  <span class="hljs-keyword">var</span> intervalID = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    observer.next(<span class="hljs-string">'hi'</span>);
  }, <span class="hljs-number">1000</span>);
  
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
    clearInterval(intervalID);
  };
}

<span class="hljs-keyword">var</span> unsubscribe = subscribe({<span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(x)});

<span class="hljs-comment">// 一段时间后:</span>
unsubscribe(); <span class="hljs-comment">// 终止</span></code></pre>
<p>使用Observable、 Observer 和 Subscription这些概念的原因是，我们可以在Observable 契约之下安全、兼容地调用操作符。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RxJs 核心概念之Observable

## 原文链接
[https://segmentfault.com/a/1190000005051034](https://segmentfault.com/a/1190000005051034)


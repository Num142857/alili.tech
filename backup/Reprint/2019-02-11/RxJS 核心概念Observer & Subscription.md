---
title: 'RxJS 核心概念Observer & Subscription' 
date: 2019-02-11 2:30:49
hidden: true
slug: zj8p6sg8rus
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Observer（观察者）</h3>
<p><strong>什么是Observer？</strong> Observer（观察者）是Observable（可观察对象）推送数据的消费者。在RxJS中，Observer是一个由回调函数组成的对象，键名分别为<code>next</code>、<code>error</code> 和 <code>complete</code>，以此接受Observable推送的不同类型的通知，下面的代码段是Observer的一个示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observer = {
  <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a next value: '</span> + x),
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Observer got an error: '</span> + err),
  <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a complete notification'</span>),
};</code></pre>
<p>调用Observer逻辑，只需在<code>subscribe</code>（订阅）Observable后将Observer传入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observable.subscribe(observer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">observable.subscribe(observer);</code></pre>
<p>在RxJS中，Observer是<em>可选的</em>。在<code>next</code>、<code>error</code> 和 <code>complete</code>处理逻辑部分缺失的情况下，Observable仍然能正常运行，为包含的特定通知类型的处理逻辑会被自动忽略。</p>
<p>下面例子中Observer并不包含<code>complete</code>类型通知的处理逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observer = {
  <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a next value: '</span> + x),
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Observer got an error: '</span> + err),
};</code></pre>
<p>在订阅Observable时，你甚至可以把回调函数作为参数传入，而不是传入完整的Observer对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observable.subscribe(x => console.log('Observer got a next value: ' + x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a next value: '</span> + x));</code></pre>
<p>在RxJS内部，调用<code>observable.subscribe</code>时，它会创建一个只有<code>next</code>处理逻辑的Observer。当然你也可以将<code>next</code>、<code>error</code> 和 <code>complete</code>的回调函数分别传入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">observable.subscribe(
  <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a next value: '</span> + x),
  err =&gt; <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Observer got an error: '</span> + err),
  () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a complete notification'</span>)
);</code></pre>
<h3 id="articleHeader1">Subscription</h3>
<p><strong>什么是Subscription？</strong> Subscription是一个代表可以终止资源的对象，表示一个Observable的执行过程。Subscription有一个重要的方法：<code>unsubscribe</code>。这个方法不需要传入参数，调用后便会终止相应的资源。在RxJS以前的版本中，Subscription被称为<em>"Disposable"</em>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.interval(1000);
var subscription = observable.subscribe(x => console.log(x));

subscription.unsubscribe(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable = Rx.Observable.interval(<span class="hljs-number">1000</span>);
<span class="hljs-keyword">var</span> subscription = observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));

subscription.unsubscribe(); </code></pre>
<p>Subscription能够通过<code>unsubscribe()</code> 函数终止Observable的执行过程并释放相应资源。</p>
<p>Subscription可以嵌套使用：你可以调用一个Subscription的<code>unsubscribe()</code>    方法来取消一系列嵌套的Subscription。通过<code>add</code>方法，便可以实现Subscription的嵌套：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable1 = Rx.Observable.interval(400);
var observable2 = Rx.Observable.interval(300);

var subscription = observable1.subscribe(x => console.log('first: ' + x));
var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // 终止所有嵌套的Subscription
  subscription.unsubscribe();
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> observable1 = Rx.Observable.interval(<span class="hljs-number">400</span>);
<span class="hljs-keyword">var</span> observable2 = Rx.Observable.interval(<span class="hljs-number">300</span>);

<span class="hljs-keyword">var</span> subscription = observable1.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'first: '</span> + x));
<span class="hljs-keyword">var</span> childSubscription = observable2.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'second: '</span> + x));

subscription.add(childSubscription);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 终止所有嵌套的Subscription</span>
  subscription.unsubscribe();
}, <span class="hljs-number">1000</span>);</code></pre>
<p>执行后，控制台会输出一下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
second: 0
first: 0
second: 1
first: 1
second: 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="none">
<span class="hljs-keyword">second</span>: <span class="hljs-number">0</span>
<span class="hljs-keyword">first</span>: <span class="hljs-number">0</span>
<span class="hljs-keyword">second</span>: <span class="hljs-number">1</span>
<span class="hljs-keyword">first</span>: <span class="hljs-number">1</span>
<span class="hljs-keyword">second</span>: <span class="hljs-number">2</span></code></pre>
<p>此外，Subscription提供了<code>remove(otherSubscription)</code>方法，可以删除一个Subscription嵌套的子Subscription。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RxJS 核心概念Observer & Subscription

## 原文链接
[https://segmentfault.com/a/1190000005059624](https://segmentfault.com/a/1190000005059624)


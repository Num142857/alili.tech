---
title: 'Promise介绍--异步篇' 
date: 2019-01-29 2:30:10
hidden: true
slug: 6zyet64jeml
categories: [reprint]
---

{{< raw >}}

                    
<p>这部分内容源于知乎上的一个<a href="https://www.zhihu.com/question/36972010" rel="nofollow noreferrer" target="_blank">提问</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){console.log(4)},0);
new Promise(function(resolve){
    console.log(1)
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 &amp;&amp; resolve()
    }
    console.log(2)
}).then(function(){
    console.log(5)
});
console.log(3);

// 1
// 2
// 3
// 5
// 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)},<span class="hljs-number">0</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span> ; i&lt;<span class="hljs-number">10000</span> ; i++ ){
        i==<span class="hljs-number">9999</span> &amp;&amp; resolve()
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>)
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);

<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// 5</span>
<span class="hljs-comment">// 4</span></code></pre>
<p>之前我们说过<code>then</code>方法添加的回调函数都是异步执行的，所以按照我们正常的认知，结果应该是<code>12345</code>，因为<code>4</code>是先添加到异步队列，而<code>5</code>在之后添加到异步队列。</p>
<p>知乎的问题也有何幻大神详细的讲解。这里我就简单的说一下吧。</p>
<p>我们都知道<code>javascript</code>是单线程的，也就是说，一个时间只能做一件事。所以，所有的任务都要按照一定的顺序排队，然后一个一个执行。如果所有的任务都是同步的，那就没有什么问题，代码按照从前到后的顺序依次执行就可以了，但我们实际工作过程中，难免会有一些操作需要异步执行——比如事件，比如ajax，比如<code>setTimeout</code>。</p>
<p>所以，浏览器会维护一个任务队列(<code>task queue</code>)，任务队列是先进先出的，也就是说，先进入任务队列的会先执行。当主线程任务执行完毕，就会查看任务队列中有没有新任务，如果有，则把第一个任务放到主线程中执行，以此循环往复，这个过程也就是<code>Event loops</code>。</p>
<p>我之前也一直都以为浏览器中只有一个任务队列，看到这个问题后才知道。原来浏览器中的任务队列不止一个，且优先级也不同。基本上可以分为如下两种：</p>
<p><strong><code>macro-task</code></strong>: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering<br><strong><code>micro-task</code></strong>: process.nextTick, 原生Promise, Object.observe, MutationObserver</p>
<p>我们看到原生<code>Promise</code>和<code>setTimeout</code>分别属于<code>micro-task</code>和<code>macro-task</code>。我们之前说的异步任务队列，指的是<code>macro-task</code>。而<code>micro-task</code>的执行顺序，与之不同。</p>
<p>在执行完主线程上的所有任务时，会先去查看<code>micro-task</code>队列中有没有任务，如果有，则依次执行<code>micro-task</code>队列中的所有任务，之后才去查看<code>macro-task</code>队列。每次拿到<code>macro-task</code>队列上任务并执行之后，都会去检查<code>micro-task</code>队列，以此循环。所以上面题目中结果是<code>12354</code>就很明了了。</p>
<p>我们看一个例子，并详细解释它的执行流程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('script1');

setTimeout(function() {
  console.log('setTimeout1');
}, 300);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script2');

setTimeout(function() {
  console.log('setTimeout2');
  Promise.resolve().then(function() {
    console.log('promise3');
  })
}, 0);

// script1
// script2
// promise1
// promise2
// setTimeout2
// promise3
// setTimeout1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'script1'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'setTimeout1'</span>);
}, <span class="hljs-number">300</span>);

Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'promise1'</span>);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'promise2'</span>);
});

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'script2'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'setTimeout2'</span>);
  Promise.resolve().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'promise3'</span>);
  })
}, <span class="hljs-number">0</span>);

<span class="hljs-comment">// script1</span>
<span class="hljs-comment">// script2</span>
<span class="hljs-comment">// promise1</span>
<span class="hljs-comment">// promise2</span>
<span class="hljs-comment">// setTimeout2</span>
<span class="hljs-comment">// promise3</span>
<span class="hljs-comment">// setTimeout1</span></code></pre>
<p>结果如代码中注释所示。具体执行步骤如下：</p>
<p>①代码从上到下执行，先打印出<code>script1</code>。</p>
<p>②执行到第一个<code>setTimeout</code>时，发现300ms后把函数添加到<code>macro-task</code>队列中。</p>
<p>③执行<code>Promise</code>时，依次把输出<code>promise1</code>和<code>promise2</code>的任务添加到<code>micro-task</code>队列。</p>
<p>④打印<code>script2</code>。</p>
<p>⑤执行第二个<code>setTimeout</code>时因为设置的是0ms，所以立即（其实浏览器有最少4ms的限制）添加到<code>macro-task</code>队列中。</p>
<p>⑥主线程执行完毕则检查<code>micro-task</code>队列并执行，输出<code>promise1</code>和<code>promise2</code>。</p>
<p>⑦然后检查<code>macro-task</code>队列，输出<code>setTimeout2</code>，并把输出<code>promise3</code>的任务添加到<code>micro-task</code>队列。</p>
<p>⑧再次检查<code>micro-task</code>队列并执行，输出<code>promise3</code>。</p>
<p>⑨最后检查<code>macro-task</code>队列，输出<code>setTimeout1</code>，因为它是300ms后添加到<code>macro-task</code>队列，所以后输出。</p>
<p>规范中的流程是这个样子，但是不同的浏览器中，实际输出的结果可能会不相同。以上是最新版本的chrome中测试结果。</p>
<p>最后，推荐一篇外国友人的博客，我就是看了<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">这篇文章</a>才完全弄清楚的，里面内容讲的特别详细。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise介绍--异步篇

## 原文链接
[https://segmentfault.com/a/1190000007936922](https://segmentfault.com/a/1190000007936922)


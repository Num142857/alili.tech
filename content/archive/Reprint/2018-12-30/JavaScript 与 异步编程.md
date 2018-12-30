---
title: 'JavaScript 与 异步编程' 
date: 2018-12-30 2:30:10
hidden: true
slug: 6x9uxm3m2l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是异步（Asynchrony）</h2>
<p>按照<a href="https://en.wikipedia.org/wiki/Asynchrony_(computer_programming%29" rel="nofollow noreferrer" target="_blank">维基百科</a>上的解释：独立于主控制流之外发生的事件就叫做异步。比如说有一段顺序执行的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void function main() {
  fA();
  fB();
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  fA();
  fB();
}();</code></pre>
<p>fA =&gt; fB 是顺序执行的，永远都是 <em>fA</em> 在 <em>fB</em> 的前面执行，他们就是 <strong>同步</strong> 的关系。加入这时使用 <code>setTimeout</code> 将 fA 延后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void function main() {
  setTimeout(fA, 1000);
  fB();
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(fA, <span class="hljs-number">1000</span>);
  fB();
}();</code></pre>
<p>这时，fA 相对于 fB 就是异步的。main 函数只是声明了要在一秒后执行一次 fA，而并没有立刻执行它。这时，fA 的控制流就独立于 main 之外。</p>
<h2 id="articleHeader1">JavaScript——天生异步的语言</h2>
<p>因为 <code>setTimeout</code> 的存在，至少在被 ECMA 标准化的那一刻起，JavaScript 就支持异步编程了。与其他语言的 <code>sleep</code> 不同，<code>setTimeout</code> 是异步的——它不会阻挡当前程序继续往下执行。</p>
<p>然而异步编程真正发展壮大，Ajax 的流行功不可没。Ajax 中的 A（Asynchronous）真正点到了异步的概念——这还是 IE5、IE6 的时代。</p>
<h2 id="articleHeader2">回调函数——异步编程之痛</h2>
<p>异步任务执行完毕之后怎样通知开发者呢？回调函数是最朴素的，容易想到的实现方式。于是从异步编程诞生的那一刻起，它就和回调函数绑在了一起。</p>
<p>例如 <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout" rel="nofollow noreferrer" target="_blank">setTimeout</a>。这个函数会起一个定时器，在超过指定时间后执行指定的函数。比如在一秒后输出数字 1，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
  console.log(1);
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
}, <span class="hljs-number">1000</span>);</code></pre>
<p>常规用法。如果需求有变，需要每秒输出一个数字（当然不是用 setInterval），JavaScript 的初学者可能会写出这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 1; i < 10; ++i) {
  setTimeout(() => { // 错误！
    console.log(i);
  }, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">10</span>; ++i) {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// 错误！</span>
    <span class="hljs-built_in">console</span>.log(i);
  }, <span class="hljs-number">1000</span>);
}</code></pre>
<p>执行结果是等待 1 秒后，一次性输出了所有结果。因为这里的循环是同时启了 10 个定时器，每个定时器都等待 1 秒，结果当然是所有定时器在 1 秒后同时超时，触发回调函数。</p>
<p>解法也简单，只需要在前一个定时器超时后再启动另一个定时器，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    setTimeout(() => {
      console.log(3);
      setTimeout(() => {
        console.log(4);
        setTimeout(() => {
          console.log(5);
          setTimeout(() => {
            // ...
          }, 1000);
        }, 1000);
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
          setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">// ...</span>
          }, <span class="hljs-number">1000</span>);
        }, <span class="hljs-number">1000</span>);
      }, <span class="hljs-number">1000</span>)
    }, <span class="hljs-number">1000</span>)
  }, <span class="hljs-number">1000</span>)
}, <span class="hljs-number">1000</span>);</code></pre>
<p>层层嵌套，结果就是这样的漏斗形代码。可能有人想到了新标准中的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">Promise</a>，可以改写如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

timeout(1000).then(() => {
  console.log(1);
  return timeout(1000);
}).then(() => {
  console.log(2);
  return timeout(1000);
}).then(() => {
  console.log(3);
  return timeout(1000);
}).then(() => {
  console.log(4);
  return timeout(1000);
}).then(() => {
  console.log(5);
  return timeout(1000);
}).then(() => {
  // ..
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, delay);
  });
}

timeout(<span class="hljs-number">1000</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> timeout(<span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  <span class="hljs-keyword">return</span> timeout(<span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
  <span class="hljs-keyword">return</span> timeout(<span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
  <span class="hljs-keyword">return</span> timeout(<span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
  <span class="hljs-keyword">return</span> timeout(<span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// ..</span>
});</code></pre>
<p>漏斗形代码是没了，但代码量本身并没减少多少。<code>Promise</code> 并没能干掉回调函数。</p>
<p>因为回调函数的存在，循环就无法使用。不能循环，那么只能考虑递归了，解法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let i = 1;
function next() {
  console.log(i);
  if (++i < 10) {
    setTimeout(next, 1000);
  }
}
setTimeout(next, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(i);
  <span class="hljs-keyword">if</span> (++i &lt; <span class="hljs-number">10</span>) {
    setTimeout(next, <span class="hljs-number">1000</span>);
  }
}
setTimeout(next, <span class="hljs-number">1000</span>);</code></pre>
<p>注意虽然写法是递归，但由于 <code>next</code> 函数都是由浏览器调用的，所以实际上并没有递归函数的调用栈结构。</p>
<h2 id="articleHeader3">Generator——JavaScript 中的半协程</h2>
<p>很多语言都引入了协程来简化异步编程，JavaScript 也有类似的概念，叫做 <a href="https://en.wikipedia.org/wiki/Generator_%28computer_programming%29" rel="nofollow noreferrer" target="_blank">Generator</a>。</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function" rel="nofollow noreferrer" target="_blank">MDN 上的解释</a>：Generator 是一种可以中途退出之后重入的函数。他们的函数上下文在每次重入后会被保持。简而言之，<code>Generator</code> 与普通 <code>Function</code> 最大的区别就是：<code>Generator</code> 自身保留上次调用的状态。</p>
<p>举个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *gen() {
  yield 1;
  yield 2;
  return 3;
}

void function main() {
  var iter = gen();
  console.log(iter.next().value);
  console.log(iter.next().value);
  console.log(iter.next().value);
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}

<span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> iter = gen();
  <span class="hljs-built_in">console</span>.log(iter.next().value);
  <span class="hljs-built_in">console</span>.log(iter.next().value);
  <span class="hljs-built_in">console</span>.log(iter.next().value);
}();</code></pre>
<p>代码的执行顺序是这样：</p>
<ol>
<li>请求 <code>gen</code>，得到一个迭代器 <code>iter</code>。注意此时并未真正执行 <code>gen</code> 的函数体。</li>
<li>调用 <code>iter.next()</code>，执行 <code>gen</code> 的函数体。</li>
<li>遇到 <code>yield 1</code>，将 1 返回，<code>iter.next()</code> 的返回值即为 { done: false, value: 1 }，输出 1</li>
<li>调用 <code>iter.next()</code>。从上次 <code>yield</code> 出去的地方继续往下执行 <code>gen</code>。</li>
<li>遇到 <code>yield 2</code>，将 2 返回，<code>iter.next()</code> 的返回值即为 { done: false, value: 2 }，输出 2</li>
<li>调用 <code>iter.next()</code>。从上次 <code>yield</code> 出去的地方继续往下执行 <code>gen</code>。</li>
<li>遇到 <code>return 3</code>，将 3 返回，<code>return</code> 表示整个函数已经执行完毕。<code>iter.next()</code> 的返回值即为 { done: true, value: 3 }，输出 3</li>
</ol>
<p>调用 Generator 函数只会返回一个迭代器，当用户主动调用了 <code>iter.next()</code> 后，这个 Generator 函数才会真正执行。</p>
<p>你可以使用 <code>for ... of</code> 遍历一个 iterator，例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i of gen()) {
  console.log(i);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">of</span> gen()) {
  <span class="hljs-built_in">console</span>.log(i);
}</code></pre>
<p>输出 <code>1 2</code>，最后 <code>return 3</code> 的结果不算在内。想用 <code>Generator</code> 的各项生成一个数组也很简单，<code>Array.from(gen())</code> 或直接用 <code>[...gen()]</code> 即可，生成 <code>[1, 2]</code> 同样不包含最后的 <code>return 3</code>。</p>
<h2 id="articleHeader4">Generator 是异步的吗</h2>
<p>Generator 也叫半协程（semicoroutine），自然与异步关系匪浅。那么 Generator 是异步的吗？</p>
<p>既是也不是。前面提到，异步是相对的，例如上面的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *gen() {
  yield 1;
  yield 2;
  return 3;
}

void function main() {
  var iter = gen();
  console.log(iter.next().value);
  console.log(iter.next().value);
  console.log(iter.next().value);
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}

<span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> iter = gen();
  <span class="hljs-built_in">console</span>.log(iter.next().value);
  <span class="hljs-built_in">console</span>.log(iter.next().value);
  <span class="hljs-built_in">console</span>.log(iter.next().value);
}();</code></pre>
<p>我们可以很直观的看到，gen 的方法体与 main 的方法体在交替执行，所以可以肯定的说，gen 相对于 main 是异步执行的。然而此段过程中，整个控制流都没有交回给浏览器，所以说 gen 和 main 相对于浏览器是同步执行的。</p>
<h2 id="articleHeader5">用 Generator 简化异步代码</h2>
<p>回到最初的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 10; ++i) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
  // 等待上面 setTimeout 执行完毕
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; ++i) {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(i);
  }, <span class="hljs-number">1000</span>);
  <span class="hljs-comment">// 等待上面 setTimeout 执行完毕</span>
}</code></pre>
<p>关键在于如何等待前面的 <code>setTimeout</code> 触发回调后再执行下一轮循环。如果使用 <code>Generator</code>，我们可以考虑在 <code>setTimeout</code> 后 <code>yield</code> 出去（控制流返还给浏览器），然后在 <code>setTimeout</code> 触发的回调函数中 <code>next</code>，将控制流交还回给代码，执行下一段循环。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let iter;

function* run() {
  for (let i = 1; i < 10; ++i) {
    setTimeout(() => iter.next(), 1000);
    yield; // 等待上面 setTimeout 执行完毕
    console.log(i);
  }
}

iter = run();
iter.next();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> iter;

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">run</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">10</span>; ++i) {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> iter.next(), <span class="hljs-number">1000</span>);
    <span class="hljs-keyword">yield</span>; <span class="hljs-comment">// 等待上面 setTimeout 执行完毕</span>
    <span class="hljs-built_in">console</span>.log(i);
  }
}

iter = run();
iter.next();</code></pre>
<p>代码的执行顺序是这样：</p>
<ol>
<li>请求 <code>run</code>，得到一个迭代器 <code>iter</code>。注意此时并未真正执行 <code>run</code> 的函数体。</li>
<li>调用 <code>iter.next()</code>，执行 <code>run</code> 的函数体。</li>
<li>循环开始，i 初始化为 1。</li>
<li>执行 <code>setTimeout</code>，启动一个定时器，回调函数延后 1 秒执行。</li>
<li>遇到 <code>yield</code>（即 <code>yield undefined</code>），控制流返回到最后的 <code>iter.next()</code> 之后。因为后面没有其他代码了，浏览器获得控制权，响应用户事件，执行其他异步代码等。</li>
<li>1 秒后，<code>setTimeout</code> 超时，执行回调函数 <code>() =&gt; iter.next()</code>。</li>
<li>调用 <code>iter.next()</code>。从上次 <code>yield</code> 出去的地方继续往下执行，即 <code>console.log(i)</code>，输出 i 的值。</li>
<li>一次循环结束，i 自增为 2，回到第 4 步继续执行</li>
<li>……</li>
</ol>
<p>这样即实现了类似同步 sleep 的要求。</p>
<h2 id="articleHeader6">async、await——用同步语法写异步代码</h2>
<p>上面的代码毕竟需要手工定义迭代器变量，还要手工 <code>next</code>；更重要的是与 <code>setTimeout</code> 紧耦合，无法通用。</p>
<p>我们知道 <code>Promise</code> 是异步编程的未来。能不能把 <code>Promise</code> 和 <code>Generator</code> 结合使用呢？这样考虑的结果就是 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow noreferrer" target="_blank">async 函数</a>。</p>
<p>用 <code>async</code> 得到代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function run() {
  for (let i = 1; i < 10; ++i) {
    await timeout(1000);
    console.log(i);
  }
}
run();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, delay);
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">10</span>; ++i) {
    <span class="hljs-keyword">await</span> timeout(<span class="hljs-number">1000</span>);
    <span class="hljs-built_in">console</span>.log(i);
  }
}
run();</code></pre>
<p>按照 <a href="https://docs.google.com/document/d/1K38ct2dsxG_9OfmgErvFld4MPDC4Wkr8tPuqmSWu_3Y/edit" rel="nofollow noreferrer" target="_blank">Chrome 的设计文档</a>，<code>async</code> 函数内部就是被编译为 <code>Generator</code> 执行的。<code>run</code> 函数本身会返回一个 <code>Promise</code>，用于使主调函数得知 <code>run</code> 函数什么时候执行完毕。所以 <code>run()</code> 后面也可以 <code>.then(xxx)</code>，甚至直接 <code>await run()</code>。</p>
<p>注意有时候我们的确需要几个异步事件并行执行（比如调用两个接口，等两个接口都返回后执行后续代码），这时就不要过度使用 <code>await</code>，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = await queryA(); // 等待 queryA 执行完毕后
const b = await queryB(); // 执行 queryB
doSomething(a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> a = <span class="hljs-keyword">await</span> queryA(); <span class="hljs-comment">// 等待 queryA 执行完毕后</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-keyword">await</span> queryB(); <span class="hljs-comment">// 执行 queryB</span>
doSomething(a, b);</code></pre>
<p>这时 <code>queryA</code> 和 <code>queryB</code> 就是串行执行的。可以略作修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promiseA = queryA(); // 执行 queryA
const b = await queryB(); // 执行 queryB 并等待其执行结束。这时同时 queryA 也在执行。
const a = await promiseA(); // 这时 queryB 已经执行结束。继续等待 queryA 执行结束
doSomething(a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promiseA = queryA(); <span class="hljs-comment">// 执行 queryA</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-keyword">await</span> queryB(); <span class="hljs-comment">// 执行 queryB 并等待其执行结束。这时同时 queryA 也在执行。</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-keyword">await</span> promiseA(); <span class="hljs-comment">// 这时 queryB 已经执行结束。继续等待 queryA 执行结束</span>
doSomething(a, b);</code></pre>
<p>我个人比较喜欢如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [ a, b ] = await Promise.all([ queryA(), queryB() ]);
doSomething(a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [ a, b ] = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([ queryA(), queryB() ]);
doSomething(a, b);</code></pre>
<p>将 <code>await</code> 和 <code>Promise</code> 结合使用，效果更佳！</p>
<h2 id="articleHeader7">结束语</h2>
<p>如今 <code>async</code> 函数已经被各大主流浏览器实现（除了 IE）。如果要兼容旧版浏览器，可以使用 <code>babel</code> 将其编译为 <code>Generator</code>。如果还要兼容只支持 ES5 的浏览器，还可以继续把 <code>Generator</code> 编译为 <code>ES5</code>。编译后的代码量比较大，小心代码膨胀。</p>
<p>如果是用 node 写 Server，那就不用纠结了直接用就是了。<a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">koa</a> 是用 <code>async</code> 是你的好帮手。</p>
<h2 id="articleHeader8">完</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 与 异步编程

## 原文链接
[https://segmentfault.com/a/1190000011296630](https://segmentfault.com/a/1190000011296630)


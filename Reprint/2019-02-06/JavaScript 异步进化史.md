---
title: 'JavaScript 异步进化史' 
date: 2019-02-06 2:30:09
hidden: true
slug: q4h57dcjowg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">同步与异步</h2>
<p>通常，代码是由上往下依次执行的。如果有多个任务，就必需排队，前一个任务完成，后一个任务才会执行。这种执行模式称之为： <strong>同步（synchronous）</strong> 。新手容易把计算机用语中的同步，和日常用语中的同步弄混淆。如，“把文件同步到云端”中的同步，指的是“使...保持一致”。而在计算机中，同步指的是任务从上往下依次执行的模式。比如：</p>
<p><strong> 例 1 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();
B();
C();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A();
B();
C();</code></pre>
<p>在上述代码中，A、B、C 是三个不同的函数，每个函数都是一个不相关的任务。在同步模式下，计算机会先执行 A 任务，再执行 B 任务，最后执行 C 任务。在大部分情况，同步模式都没问题。但是如果 B 任务是一个耗时很长网络的请求，而 C 任务恰好是展现新页面，B 与 C 没有依赖关系。这就会导致网页卡顿的现象。有一种解决方案，将 B 放在 C 后面去执行，但唯一有些不足的是，B 的网络请求会迟一些再发送。</p>
<p>还有另一种更完美解决方案，将 B 任务分成的两个部分。一部分是，立即执行网络请求的任务；另一部分是，在请求数据回来后执行的任务。这种一部分在立即执行，另一部分在未来执行的模式称为 <strong>异步（asynchronous）</strong> 。伪代码如下：</p>
<p><strong> 例 2 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();
// 在现在发送请求
ajax('url1',function B() {
  // 在未来某个时刻执行
})
C();
// 执行顺序 A => C => B" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A();
<span class="hljs-comment">// 在现在发送请求</span>
ajax(<span class="hljs-string">'url1'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 在未来某个时刻执行</span>
})
C();
<span class="hljs-comment">// 执行顺序 A =&gt; C =&gt; B</span></code></pre>
<p>实际上，JavaScript 引擎先执行了调用了浏览器的网络请求接口的任务（一部分任务），再由浏览器发送网络请求并监听请求返回（这个任务不由 JavaScript 引擎执行，而是浏览器）；等请求放回后，浏览器再通知 JavaScript 引擎，开始执行回调函数中的任务（另一部分）。JavaScript  异步能力的本质是浏览器或 Node 的多线程能力。</p>
<h2 id="articleHeader1">callback</h2>
<p>未来执行的函数通常也叫 callback。使用 callback 的异步模式，解决了阻塞的问题，但是也带了一些其他问题。在最开始，我们的函数是从上往下书写的，也是从上往下执行的，这非常符合我们的思维习惯，但是现在却被 callback 打断了！在上面一段代码中，它跳过 B 任务，先执行了 C任务！这种异步“非线性”的代码会比同步“线性”的代码，更难阅读，因此也更容易滋生 BUG。</p>
<p>试着判断下面这段代码的执行顺序，你会对“非线性”代码比“线性”代码更难以阅读，体会更深。</p>
<p><strong> 例 3 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();
ajax('url1', function(){
    B();
    ajax('url2', function(){
        C();
    }
    D();
});
E();

// 下面是答案，你猜对了吗？
// A => E => B => D => C" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A();
ajax(<span class="hljs-string">'url1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    B();
    ajax(<span class="hljs-string">'url2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        C();
    }
    D();
});
E();

<span class="hljs-comment">// 下面是答案，你猜对了吗？</span>
<span class="hljs-comment">// A =&gt; E =&gt; B =&gt; D =&gt; C</span></code></pre>
<p>在例 3 中，我们的阅读代码视线是 <code>A =&gt; B =&gt; C =&gt; D =&gt; E</code> ，但是执行顺序却是 <code>A =&gt; E =&gt; B =&gt; D =&gt; C</code> 。从上往下执行的顺序被 Callback 打乱了，这就是非线性代码带来的糟糕之处。</p>
<p>上面的例子中，我们可以通过将 <code>ajax</code> 后面执行的任务 <code>E</code> 和 任务 <code>D</code> 提前，来进行代码优化。这种技巧在写多重嵌套的代码时，是非常有用的。改进后，如下。</p>
<p><strong> 例 4 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();
E();
ajax('url1', function(){
    B();
    D();
    ajax('url2', function(){
        C();
    }
});
// 稍作优化，代码更容易看懂
// A => E => B => D => C" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A();
E();
ajax(<span class="hljs-string">'url1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    B();
    D();
    ajax(<span class="hljs-string">'url2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        C();
    }
});
<span class="hljs-comment">// 稍作优化，代码更容易看懂</span>
<span class="hljs-comment">// A =&gt; E =&gt; B =&gt; D =&gt; C</span></code></pre>
<p>在例 4 中，只有处理了成功回调，并没处理异常回调。接下来，把异常处理回调加上，再来讨论代码“线性”执行的问题。</p>
<p><strong> 例 5 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();

ajax('url1', function(){
    B();

    ajax('url2', function(){
        C();
    },function(){
        D();
    });

},function(){
    E();

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A();

ajax(<span class="hljs-string">'url1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    B();

    ajax(<span class="hljs-string">'url2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        C();
    },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        D();
    });

},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    E();

});</code></pre>
<p>例 5 中，加上异常处理回调后，<code>url1</code> 的成功回调函数 B 和异常回调函数 E，被分开了。这种“非线性”的情况又出现了。</p>
<p>在 node 中，为了解决的异常处理“非线性”的问题，制定了错误优先的策略。node 中 callback 的第一个参数，专门用于判断是否发生异常。</p>
<p><strong> 例 6 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();

get('url1', function(error){
    if(error){
        E();
    }else {
        B();

        get('url2', function(error){
            if(error){
                D();
            }else{
                C();
            }
        });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A();

get(<span class="hljs-string">'url1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-keyword">if</span>(error){
        E();
    }<span class="hljs-keyword">else</span> {
        B();

        get(<span class="hljs-string">'url2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
            <span class="hljs-keyword">if</span>(error){
                D();
            }<span class="hljs-keyword">else</span>{
                C();
            }
        });
    }
});</code></pre>
<p>到此，callback 引起的“非线性”问题基本得到解决。遗憾的是，一旦嵌套层数多起来，阅读起来还不是很方便。此外，callback 一旦出现异常，只能在当前回调内部处理异常，并没有一个整体的异常触底方案。</p>
<h2 id="articleHeader2">promise</h2>
<p>在 JavaScript 的异步进化史中，涌现出一系列解决 callback 弊端的库，而 Promise 成为了最终的胜者，并成功地被引入了 ES6 中。它将提供了一个更好的“线性”书写方式，并解决了异步异常只能在当前回调中捕获的问题。</p>
<p>Promise 就像一个中介，它承诺会将一个可信任的异步结果返回。签订协议的两方分别是异步接口和 callback。首先 Promise 和异步接口签订一个协议，成功时，调用 <code>resolve</code> 函数通知 Promise，异常时，调用 <code>reject</code> 通知 Promise。另一方面 Promise 和 callback 也签订一个协议，当异步接口的 <code>resolve</code> 或 <code>reject</code> 被调用时，由 Promise 返回可信任的值给 <code>then</code> 和 <code>catch</code> 中注册的 callback。</p>
<p>一个最简单的 promise 示例如下：</p>
<p><strong> 例 7 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个 Promise 实例（异步接口和 Promise 签订协议）
var promise = new Promise(function (resolve,reject) {
  ajax('url',resolve,reject);
});

// 调用实例的 then catch 方法 （成功回调、异常回调与 Promise 签订协议）
promise.then(function(value) {
  // success
}).catch(function (error) {
  // error
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建一个 Promise 实例（异步接口和 Promise 签订协议）</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve,reject</span>) </span>{
  ajax(<span class="hljs-string">'url'</span>,resolve,reject);
});

<span class="hljs-comment">// 调用实例的 then catch 方法 （成功回调、异常回调与 Promise 签订协议）</span>
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// success</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// error</span>
})</code></pre>
<p>Promise 是个非常不错的中介，它只返回可信的信息给 callback。怎么理解可信的概念呢？准确的讲，就是 callback 一定会被<strong>异步调用</strong>，且<strong>只会调用一次</strong>。比如在使用第三方库的时候，由于某些原因，（假的）“异步”接口不可靠，它执行了同步代码，而没有进入异步逻辑，如例 8。</p>
<p><strong> 例 8 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise1 = new Promise(function (resolve) {
  // 由于某些原因导致“异步”接口，被同步执行了
  if (true ){
    // 同步代码
    resolve('B');
  } else {
    // 异步代码
    setTimeout(function(){
      resolve('B');
    },0)
  }

});

// promise依旧会异步执行
promise1.then(function(value){
    console.log(value)
});

console.log('A');
// A => B （先 A 后 B）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
  <span class="hljs-comment">// 由于某些原因导致“异步”接口，被同步执行了</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span> ){
    <span class="hljs-comment">// 同步代码</span>
    resolve(<span class="hljs-string">'B'</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 异步代码</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      resolve(<span class="hljs-string">'B'</span>);
    },<span class="hljs-number">0</span>)
  }

});

<span class="hljs-comment">// promise依旧会异步执行</span>
promise1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value)
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A'</span>);
<span class="hljs-comment">// A =&gt; B （先 A 后 B）</span></code></pre>
<p>再比如，由于某些原因，异步接口不可靠，<code>resolve</code> 或 <code>reject</code> 被执行了两次。但 Promise 只会通知 callback ，第一次异步接口返回的结果。如例 9：</p>
<p><strong> 例 9 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var promise2 = new Promise(function (resolve) {
  // resolve 被执行了 2 次
  setTimeout(function(){
    resolve(&quot;第一次&quot;);
  },0)
  setTimeout(function(){
    resolve(&quot;第二次&quot;);
  },0)
});

// 但 callback 只会被调用一次，
promise2.then(function(msg){
    console.log(msg) // &quot;第一次&quot;
    console.log('A')
});
// A (只有一个)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
  <span class="hljs-comment">// resolve 被执行了 2 次</span>
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    resolve(<span class="hljs-string">"第一次"</span>);
  },<span class="hljs-number">0</span>)
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    resolve(<span class="hljs-string">"第二次"</span>);
  },<span class="hljs-number">0</span>)
});

<span class="hljs-comment">// 但 callback 只会被调用一次，</span>
promise2.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(msg) <span class="hljs-comment">// "第一次"</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A'</span>)
});
<span class="hljs-comment">// A (只有一个)</span></code></pre>
<p>介绍完 Promise 的特性后，来看看它如何利用链式调用，解决 callback 模式下，异步代码可读性的问题。链式调用指的是：函数 <code>return</code> 一个可以继续执行的对象，该对象可以继续调用，并且 <code>return</code> 另一个可以继续执行的对象，如此反复达到不断调用的结果。如例 10：</p>
<p><strong> 例 10 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// return 一个可以继续执行的 Promise 对象
var fetch = function(url){
    return new Promise(function (resolve,reject) {
        ajax(url,resolve,reject);
    });
}

A();
fetch('url1').then(function(){
    B();
    // 返回一个新的 Promise 实例
    return fetch('url2');
}).catch(function(){
    C();
    // 异常的时候也可以返回一个新的 Promise 实例
    return fetch('url2');
    // 使用链式写法调用这个新的 Promise 实例的 then 方法
}).then(function() {
    // 可以继续 return，也可以不继续 return，结束链式调用
    D();
})
// A B C D （顺序执行）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// return 一个可以继续执行的 Promise 对象</span>
<span class="hljs-keyword">var</span> fetch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve,reject</span>) </span>{
        ajax(url,resolve,reject);
    });
}

A();
fetch(<span class="hljs-string">'url1'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    B();
    <span class="hljs-comment">// 返回一个新的 Promise 实例</span>
    <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'url2'</span>);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    C();
    <span class="hljs-comment">// 异常的时候也可以返回一个新的 Promise 实例</span>
    <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'url2'</span>);
    <span class="hljs-comment">// 使用链式写法调用这个新的 Promise 实例的 then 方法</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 可以继续 return，也可以不继续 return，结束链式调用</span>
    D();
})
<span class="hljs-comment">// A B C D （顺序执行）</span></code></pre>
<p>如此反复，不断返回一个 Promise 对象，使 Promise 摆脱了 callback 层层嵌套的问题和异步代码“非线性”执行的问题。</p>
<p>另外，Promise 还解决了一个难点，callback 只能捕获当前错误异常。Promise 和 callback 不同，每个 callback 只能知道自己的报错情况，但 Promise 代理着所有的 callback，所有 callback 的报错，都可以由 Promise 统一处理。所以，可以通过在最后设置一个 <code>catch</code> 来捕获之前未捕获异常。</p>
<p>Promise 解决 callback 的异步调用问题，但 Promise 并没有摆脱 callback，它只是将 callback 放到一个可以信任的中间机构，这个中间机构去链接 callback 和异步接口。此外，链式调用的写法并不是非常优雅。接下来介绍的异步（async）函数方案，会给出一个更好的解决方案。</p>
<h2 id="articleHeader3">异步（async）函数</h2>
<p>异步（async）函数是 ES7 的一个新的特性，它结合了 Promise，让我们摆脱 callback 的束缚，直接用“同步”方式，写异步函数。注意，这里的同步指的是写法同步，但实际依旧是异步执行的。</p>
<p>声明异步函数，只需在普通函数前添加一个关键字 <code>async</code> 即可，如:</p>
<p><code>async function main(){}</code></p>
<p>在异步函数中，可以使用 <code>await</code> 关键字，表示等待后面表达式的执行结果，再往下继续执行。表达式一般都是 Promise 实例。如，例 11：</p>
<p><strong> 例 11 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var  timer = function (delay) {
  return new Promise(function create(resolve,reject) {
    if(typeof delay !== 'number'){
      reject(new Error('type error'));
    }
    setTimeout(resolve,delay,'done');
  });
}

async function main{
    var value = await timer(100);
    // 不会立刻执行，等待 100ms 后才开始执行
    console.log(value);  // done
}

main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span>  timer = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params">resolve,reject</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> delay !== <span class="hljs-string">'number'</span>){
      reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'type error'</span>));
    }
    setTimeout(resolve,delay,<span class="hljs-string">'done'</span>);
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span></span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">await</span> timer(<span class="hljs-number">100</span>);
    <span class="hljs-comment">// 不会立刻执行，等待 100ms 后才开始执行</span>
    <span class="hljs-built_in">console</span>.log(value);  <span class="hljs-comment">// done</span>
}

main();</code></pre>
<p>异步函数和普通函数的调用方式一样，最先执行 <code>main()</code> 函数。之后，会立即执行 <code>timer(100)</code> 函数。等到（ <code>await</code> ）后面的 promise 函数（ <code>timer(100)</code> ）返回结果后，程序才会执行下一行代码。</p>
<p>异步函数和普通函数写法基本类似，除了前面提到的声明方式类似和调用方式一样之外，它也可以使用 <code>try...catch</code> 来捕捉异常，也可以传入参数。但在异步函数中使用 <code>return</code> 是没有作用的，这和普通的 callback 函数 <code>return</code> 没有作用是一样原因。callback 或者异步函数是单独放在 JavaScript 栈（stack）中执行的，这时同步代码已经执行完毕。</p>
<p>在异步函数中，使用 <code>try...catch</code> 异常捕获的方案，代替了 Promise <code>catch</code> 的异常捕获的方案。示例如下：</p>
<p><strong> 例 12 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function main(delay){
  try{
    // timer 在例 11 中有过声明
    var value1 = await timer(delay);
    var value2 = await timer('');
    var value3 = await timer(delay);
  }catch(err){
    console.error(err);
      // Error: type error
      //   at create (<anonymous>:5:14)
      //   at timer (<anonymous>:3:10)
      //   at A (<anonymous>:12:10)
  }
}
main(0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params">delay</span>)</span>{
  <span class="hljs-keyword">try</span>{
    <span class="hljs-comment">// timer 在例 11 中有过声明</span>
    <span class="hljs-keyword">var</span> value1 = <span class="hljs-keyword">await</span> timer(delay);
    <span class="hljs-keyword">var</span> value2 = <span class="hljs-keyword">await</span> timer(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">var</span> value3 = <span class="hljs-keyword">await</span> timer(delay);
  }<span class="hljs-keyword">catch</span>(err){
    <span class="hljs-built_in">console</span>.error(err);
      <span class="hljs-comment">// Error: type error</span>
      <span class="hljs-comment">//   at create (&lt;anonymous&gt;:5:14)</span>
      <span class="hljs-comment">//   at timer (&lt;anonymous&gt;:3:10)</span>
      <span class="hljs-comment">//   at A (&lt;anonymous&gt;:12:10)</span>
  }
}
main(<span class="hljs-number">0</span>);</code></pre>
<p>更神奇的是，异步函数也遵循，“函数是第一公民”的准则。也可以当作值，传入普通函数和异步函数中执行。需要注意的是，在异步函数中使异步函数用时要使用 <code>await</code>，不然异步函会被同步执行。例子如下：</p>
<p><strong> 例 12 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function doAsync(delay){
    // timer 在例 11 中有过声明
    var value1 = await timer(delay);
    console.log('A')
}

async function main(main){
  doAsync(0);
  console.log('B')
}

main(main);
// B A" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAsync</span>(<span class="hljs-params">delay</span>)</span>{
    <span class="hljs-comment">// timer 在例 11 中有过声明</span>
    <span class="hljs-keyword">var</span> value1 = <span class="hljs-keyword">await</span> timer(delay);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A'</span>)
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params">main</span>)</span>{
  doAsync(<span class="hljs-number">0</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'B'</span>)
}

main(main);
<span class="hljs-comment">// B A</span></code></pre>
<p>这个时候打印出来的值是 <code>B A</code>。说明 <code>doAsync</code> 函数中的 <code>await timer(delay)</code> 并被同步执行了。如果要正确异步地执行 <code>doAsync</code> 函数，需要该函数之前添加 <code>await</code> 关键字，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function main(delay){
    var value1 = await timer(delay);
    console.log('A')
}

async function doAsync(main){
    await main(0);
    console.log('B')
}

doAsync(main);
// A B" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params">delay</span>)</span>{
    <span class="hljs-keyword">var</span> value1 = <span class="hljs-keyword">await</span> timer(delay);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A'</span>)
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doAsync</span>(<span class="hljs-params">main</span>)</span>{
    <span class="hljs-keyword">await</span> main(<span class="hljs-number">0</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'B'</span>)
}

doAsync(main);
<span class="hljs-comment">// A B</span></code></pre>
<p>由于异步函数采用类同步的书写方法，所以在处理多个并发请求，新手可能会像下面一样书写：</p>
<p><strong> 例 13 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fetch = function (url) {
  return new Promise(function (resolve,reject) {
    ajax(url,resolve,reject);
  });
}

async function main(){
  try{
    var value1 = await fetch('url1');
    var value2 = await fetch('url2');
    conosle.log(value1,value2);
  }catch(err){
    console.error(err)
  }
}

main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fetch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve,reject</span>) </span>{
    ajax(url,resolve,reject);
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">try</span>{
    <span class="hljs-keyword">var</span> value1 = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'url1'</span>);
    <span class="hljs-keyword">var</span> value2 = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'url2'</span>);
    conosle.log(value1,value2);
  }<span class="hljs-keyword">catch</span>(err){
    <span class="hljs-built_in">console</span>.error(err)
  }
}

main();</code></pre>
<p>但这样会导致 <code>url2</code> 的请求必需等到 <code>url1</code> 的请求回来后才会发送。如果 <code>url1</code> 与 <code>url2</code> 没有相互的依赖关系，将这两个请求同时发送实现的效果会更好。</p>
<p><code>Promise.all</code> 的方法，可以很好的处理并发请求。<code>Promise.all</code> 接受将多个 Promise 实例为参数，并将这些参数包装成一个新的 Promise 实例。这样，<code>Promise.all</code>  中所有的请求会第一时间发送出去；在所有的请求成功回来后才会触发 <code>Promise.all</code> 的 <code>resolve</code> 函数；当有一个请求失败，则立即调用 <code>Promise.all</code> 的 <code>reject</code> 函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fetch = function (url) {
  return new Promise(function (resolve, reject) {
    ajax(url, resolve, reject);
  });
}

async function main(){
  try{
    var arrValue = await Promise.all[fetch('url1'),fetch('url2')];
    conosle.log(arrValue[0], arrValue[1]);
  }catch(err){
    console.error(err)
  }
}

main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fetch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    ajax(url, resolve, reject);
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">try</span>{
    <span class="hljs-keyword">var</span> arrValue = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all[fetch(<span class="hljs-string">'url1'</span>),fetch(<span class="hljs-string">'url2'</span>)];
    conosle.log(arrValue[<span class="hljs-number">0</span>], arrValue[<span class="hljs-number">1</span>]);
  }<span class="hljs-keyword">catch</span>(err){
    <span class="hljs-built_in">console</span>.error(err)
  }
}

main();</code></pre>
<p>最后对异步函数的内容做个小结：</p>
<ul>
<li><p>声明： <code>async function main(){}</code></p></li>
<li><p>异步函数逻辑：可以使用  <code>await</code></p></li>
<li><p>调用： <code>main()</code></p></li>
<li><p>捕获异常： <code>try...catch</code></p></li>
<li><p>传入参数： <code>main('第一个参数')</code></p></li>
<li><p>return：不生效</p></li>
<li><p>异步函数作为参数传入其他函数：可以</p></li>
<li><p>处理并发逻辑：<code>Promise.all</code></p></li>
</ul>
<p>目前使用最新的 Chrome/node 已经支持 ES7 异步函数的写法了，另外也可以通过 Babel 以将异步函数转义为 ES5 的语法执行。大家可以自己动手试试，使用异步函数，用类同步的方式，书写异步代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 异步进化史

## 原文链接
[https://segmentfault.com/a/1190000006138882](https://segmentfault.com/a/1190000006138882)


---
title: '初探Promise' 
date: 2019-02-02 2:30:11
hidden: true
slug: w0mbf48205i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一 前言</h1>
<p>本文主要对ES6的<code>Promise</code>进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why、how。下面就跟着我一步步学习吧~</p>
<h1 id="articleHeader1">二 什么是Promise</h1>
<p>首先是what。那么什么是<code>Promise</code>呢？  <br>以下是MDN对<code>Promise</code>的定义</p>
<blockquote>The Promise object is used for asynchronous computations. A Promise represents a single asynchronous operation that hasn't completed yet, but is expected in the future.<p>译文：Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。</p>
</blockquote>
<p>那么什么是异步操作？在学习promise之前需要把这个概念搞明白，下面将抽离一章专门介绍。</p>
<h2 id="articleHeader2">2.1 同步与异步</h2>
<p>我们知道，JavaScript的执行环境是「单线程」。  <br>所谓单线程，是指JS引擎中负责解释和执行JavaScript代码的线程只有一个，也就是一次只能完成一项任务，这个任务执行完后才能执行下一个，它会「阻塞」其他任务。这个任务可称为主线程。  <br>但实际上还有其他线程，如事件触发线程、ajax请求线程等。 </p>
<p>这也就引发了同步和异步的问题。</p>
<h3 id="articleHeader3">2.1.1 同步</h3>
<p>同步模式，即上述所说的单线程模式，<strong>一次</strong>只能执行<strong>一个</strong>任务，函数调用后需等到函数执行结束，返回执行的结果，才能进行下一个任务。如果这个任务执行的时间较长，就会导致「<strong>线程阻塞</strong>」。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.1 */
var x = true;
while(x);
console.log(&quot;don't carry out&quot;);    //不会执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.1 */</span>
<span class="hljs-keyword">var</span> x = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">while</span>(x);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"don't carry out"</span>);    <span class="hljs-comment">//不会执行</span></code></pre>
<p>上面的例子即同步模式，其中的while是一个死循环，它会阻塞进程，因此第三句console不会执行。  <br>同步模式比较简单，也较容易编写。但问题也显而易见，如果请求的时间较长，而阻塞了后面代码的执行，体验是很不好的。因此对于一些耗时的操作，异步模式则是更好的选择。</p>
<h3 id="articleHeader4">2.1.2 异步</h3>
<p>下面就来看看异步模式。  <br>异步模式，即与同步模式相反，可以一起执行<strong>多个任务</strong>，函数调用后不会立即返回执行的结果，如果任务A需要等待，可先执行任务B，等到任务A结果返回后再继续回调。  <br>最常见的异步模式就数定时器了，我们来看看以下的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.2 */
setTimeout(function() {
    console.log('taskA, asynchronous');
}, 0);
console.log('taskB, synchronize');
//while(true);

-------ouput-------
taskB, synchronize
taskA, asynchronous" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.2 */</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'taskA, asynchronous'</span>);
}, <span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'taskB, synchronize'</span>);
<span class="hljs-comment">//while(true);</span>

-------ouput-------
taskB, synchronize
taskA, asynchronous</code></pre>
<p>我们可以看到，定时器延时的时间明明为0，但taskA还是晚于taskB执行。这是为什么呢？由于定时器是异步的，<strong>异步任务会在当前脚本的所有同步任务执行完才会执行</strong>。如果同步代码中含有死循环，即将上例的注释去掉，那么这个异步任务就不会执行，因为同步任务阻塞了进程。</p>
<h3 id="articleHeader5">2.1.3 回调函数</h3>
<p>提起异步，就不得不谈谈回调函数了。上例中，<code>setTimeout</code>里的<code>function</code>便是回调函数。可以简单理解为：（执行完）回（来）调（用）的函数。<br>以下是WikiPedia对于<code>callback</code>的定义。</p>
<blockquote>In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time.</blockquote>
<p>可以看出，回调函数是一段可执行的代码段，它以「参数」的形式传递给其他代码，在其合适的时间执行这段（回调函数）的代码。</p>
<p>WikiPedia同时提到</p>
<blockquote>The invocation may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback.</blockquote>
<p>也就是说，回调函数不仅可以用于异步调用，一般同步的场景也可以用回调。在同步调用下，回调函数一般是最后执行的。而异步调用下，可能一段时间后执行或不执行（未达到执行的条件）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.3 */
/******************同步回调******************/
var fun1 = function(callback) {
    //do something
    console.log(&quot;before callback&quot;);
    (callback &amp;&amp; typeof(callback) === 'function') &amp;&amp; callback();
    console.log(&quot;after callback&quot;);
}
var fun2 = function(param) {
    //do something
    var start = new Date();
    while((new Date() - start) < 3000) { //delay 3s
    }
    console.log(&quot;I'm callback&quot;);
}
fun1(fun2);

-------output--------
before callback
//after 3s
I’m callback
after callback" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.3 */</span>
<span class="hljs-comment">/******************同步回调******************/</span>
<span class="hljs-keyword">var</span> fun1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-comment">//do something</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"before callback"</span>);
    (callback &amp;&amp; <span class="hljs-keyword">typeof</span>(callback) === <span class="hljs-string">'function'</span>) &amp;&amp; callback();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"after callback"</span>);
}
<span class="hljs-keyword">var</span> fun2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">param</span>) </span>{
    <span class="hljs-comment">//do something</span>
    <span class="hljs-keyword">var</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">while</span>((<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - start) &lt; <span class="hljs-number">3000</span>) { <span class="hljs-comment">//delay 3s</span>
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm callback"</span>);
}
fun1(fun2);

-------output--------
before callback
<span class="hljs-comment">//after 3s</span>
I’m callback
after callback</code></pre>
<p>由于是同步回调，会阻塞后面的代码，如果fun2是个死循环，后面的代码就不执行了。</p>
<p>上一小节中<code>setTimeout</code>就是常见的异步回调，另外常见的异步回调即ajax请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.4 */
/******************异步回调******************/
function request(url, param, successFun, errorFun) {
    $.ajax({
        type: 'GET',
        url: url,
        param: param,
        async: true,    //默认为true,即异步请求；false为同步请求
        success: successFun,
        error: errorFun
    });
}
request('test.html', '', function(data) {
    //请求成功后的回调函数，通常是对请求回来的数据进行处理
    console.log('请求成功啦, 这是返回的数据:', data);
},function(error) {
    console.log('sorry, 请求失败了, 这是失败信息:', error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.4 */</span>
<span class="hljs-comment">/******************异步回调******************/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url, param, successFun, errorFun</span>) </span>{
    $.ajax({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'GET'</span>,
        <span class="hljs-attr">url</span>: url,
        <span class="hljs-attr">param</span>: param,
        <span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>,    <span class="hljs-comment">//默认为true,即异步请求；false为同步请求</span>
        success: successFun,
        <span class="hljs-attr">error</span>: errorFun
    });
}
request(<span class="hljs-string">'test.html'</span>, <span class="hljs-string">''</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">//请求成功后的回调函数，通常是对请求回来的数据进行处理</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求成功啦, 这是返回的数据:'</span>, data);
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'sorry, 请求失败了, 这是失败信息:'</span>, error);
});</code></pre>
<h2 id="articleHeader6">2.2 为什么使用Promise</h2>
<p>说完了以上基本概念，我们就可以继续学习<code>Promise</code>了。<br>上面提到，<code>Promise</code>对象是用于异步操作的。既然我们可以使用异步回调来进行异步操作，为什么还要引入一个<code>Promise</code>新概念，还要花时间学习它呢？不要着急，下面就来谈谈<code>Promise</code>的过人之处。<br>我们先看看下面的demo，利用<code>Promise</code>改写例2.4的异步回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.5 */
function sendRequest(url, param) {
    return new Promise(function (resolve, reject) {
        request(url, param, resolve, reject);
    });
}

sendRequest('test.html', '').then(function(data) {
    //异步操作成功后的回调
    console.log('请求成功啦, 这是返回的数据:', data);
}, function(error) {
    //异步操作失败后的回调
    console.log('sorry, 请求失败了, 这是失败信息:', error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.5 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendRequest</span>(<span class="hljs-params">url, param</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        request(url, param, resolve, reject);
    });
}

sendRequest(<span class="hljs-string">'test.html'</span>, <span class="hljs-string">''</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">//异步操作成功后的回调</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求成功啦, 这是返回的数据:'</span>, data);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">//异步操作失败后的回调</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'sorry, 请求失败了, 这是失败信息:'</span>, error);
});</code></pre>
<p>这么一看，并没有什么区别，还比上面的异步回调复杂，得先新建Promise再定义其回调。其实，<code>Promise</code>的真正强大之处在于它的多重链式调用，可以避免层层嵌套回调。如果我们在第一次ajax请求后，还要用它返回的结果再次请求呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.6 */
request('test1.html', '', function(data1) {
    console.log('第一次请求成功, 这是返回的数据:', data1);
    request('test2.html', data1, function (data2) {
        console.log('第二次请求成功, 这是返回的数据:', data2);
        request('test3.html', data2, function (data3) {
            console.log('第三次请求成功, 这是返回的数据:', data3);
            //request... 继续请求
        }, function(error3) {
            console.log('第三次请求失败, 这是失败信息:', error3);
        });
    }, function(error2) {
        console.log('第二次请求失败, 这是失败信息:', error2);
    });
}, function(error1) {
    console.log('第一次请求失败, 这是失败信息:', error1);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.6 */</span>
request(<span class="hljs-string">'test1.html'</span>, <span class="hljs-string">''</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data1</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一次请求成功, 这是返回的数据:'</span>, data1);
    request(<span class="hljs-string">'test2.html'</span>, data1, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data2</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二次请求成功, 这是返回的数据:'</span>, data2);
        request(<span class="hljs-string">'test3.html'</span>, data2, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data3</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三次请求成功, 这是返回的数据:'</span>, data3);
            <span class="hljs-comment">//request... 继续请求</span>
        }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error3</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三次请求失败, 这是失败信息:'</span>, error3);
        });
    }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error2</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二次请求失败, 这是失败信息:'</span>, error2);
    });
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error1</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一次请求失败, 这是失败信息:'</span>, error1);
});</code></pre>
<p>以上出现了多层回调嵌套，有种晕头转向的感觉。这也就是我们常说的厄运回调金字塔（Pyramid of Doom），编程体验十分不好。而使用<code>Promise</code>，我们就可以利用<code>then</code>进行「链式回调」，将异步操作以同步操作的流程表示出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例2.7 */
sendRequest('test1.html', '').then(function(data1) {
    console.log('第一次请求成功, 这是返回的数据:', data1);
}).then(function(data2) {
    console.log('第二次请求成功, 这是返回的数据:', data2);
}).then(function(data3) {
    console.log('第三次请求成功, 这是返回的数据:', data3);
}).catch(function(error) {
    //用catch捕捉前面的错误
    console.log('sorry, 请求失败了, 这是失败信息:', error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例2.7 */</span>
sendRequest(<span class="hljs-string">'test1.html'</span>, <span class="hljs-string">''</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data1</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一次请求成功, 这是返回的数据:'</span>, data1);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data2</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二次请求成功, 这是返回的数据:'</span>, data2);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data3</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三次请求成功, 这是返回的数据:'</span>, data3);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">//用catch捕捉前面的错误</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'sorry, 请求失败了, 这是失败信息:'</span>, error);
});</code></pre>
<p>是不是明显清晰很多？孰优孰略也无需多说了吧~下面就让我们真正进入<code>Promise</code>的学习。</p>
<h1 id="articleHeader7">三 Promise的基本用法</h1>
<h2 id="articleHeader8">3.1 基本用法</h2>
<p>上一小节我们认识了<code>promise</code>长什么样，但对它用到的<code>resolve</code>、<code>reject</code>、<code>then</code>、<code>catch</code>想必还不理解。下面我们一步步学习。</p>
<p><code>Promise</code>对象代表一个未完成、但预计将来会完成的操作。<br>它有以下三种状态：</p>
<ul>
<li>
<code>pending</code>：初始值，不是fulfilled，也不是rejected</li>
<li>
<code>fulfilled</code>：代表操作成功</li>
<li>
<code>rejected</code>：代表操作失败</li>
</ul>
<p><code>Promise</code>有两种状态改变的方式，既可以从<code>pending</code>转变为<code>fulfilled</code>，也可以从<code>pending</code>转变为<code>rejected</code>。一旦状态改变，就「凝固」了，会一直保持这个状态，不会再发生变化。当状态发生变化，<code>promise.then</code>绑定的函数就会被调用。<br>注意：<code>Promise</code>一旦新建就会「立即执行」，无法取消。这也是它的缺点之一。<br>下面就通过例子进一步讲解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.1 */
//构建Promise
var promise = new Promise(function (resolve, reject) {
    if (/* 异步操作成功 */) {
        resolve(data);
    } else {
        /* 异步操作失败 */
        reject(error);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.1 */</span>
<span class="hljs-comment">//构建Promise</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 异步操作成功 */</span>) {
        resolve(data);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">/* 异步操作失败 */</span>
        reject(error);
    }
});</code></pre>
<p>类似构建对象，我们使用<code>new</code>来构建一个<code>Promise</code>。<code>Promise</code>接受一个「函数」作为参数，该函数的两个参数分别是<code>resolve</code>和<code>reject</code>。这两个函数就是就是「回调函数」，由JavaScript引擎提供。</p>
<p><code>resolve</code>函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去； <br><code>reject</code>函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。</p>
<p>Promise实例生成以后，可以用<code>then</code>方法指定<code>resolved</code>状态和<code>reject</code>状态的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 接例3.1 */
promise.then(onFulfilled, onRejected);

promise.then(function(data) {
  // do something when success
}, function(error) {
  // do something when failure
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 接例3.1 */</span>
promise.then(onFulfilled, onRejected);

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-comment">// do something when success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// do something when failure</span>
});</code></pre>
<p><code>then</code>方法会返回一个Promise。它有两个参数，分别为Promise从<code>pending</code>变为<code>fulfilled</code>和<code>rejected</code>时的回调函数（第二个参数非必选）。这两个函数都<strong>接受Promise对象传出的值作为参数</strong>。<br>简单来说，<code>then</code>就是定义<code>resolve</code>和<code>reject</code>函数的，其<code>resolve</code>参数相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolveFun(data) {
    //data为promise传出的值
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolveFun</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">//data为promise传出的值</span>
}</code></pre>
<p>而新建Promise中的'resolve(data)'，则相当于执行resolveFun函数。<br>Promise新建后就会立即执行。而<code>then</code>方法中指定的回调函数，将<strong>在当前脚本所有同步任务执行完才会执行</strong>。如下例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.2 */
var promise = new Promise(function(resolve, reject) {
  console.log('before resolved');
  resolve();
  console.log('after resolved');
});

promise.then(function() {
  console.log('resolved');
});

console.log('outer');

-------output-------
before resolved
after resolved
outer
resolved" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.2 */</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before resolved'</span>);
  resolve();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'after resolved'</span>);
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolved'</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'outer'</span>);

-------output-------
before resolved
after resolved
outer
resolved</code></pre>
<p>由于<code>resolve</code>指定的是异步操作成功后的回调函数，它需要等所有同步代码执行后才会执行，因此最后打印'resolved'，这个和例2.2是一样的道理。</p>
<h2 id="articleHeader9">3.2 基本API</h2>
<h3 id="articleHeader10">.then()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：Promise.prototype.then(onFulfilled, onRejected)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>语法：<span class="hljs-type">Promise</span>.proto<span class="hljs-keyword">type</span>.then(onFulfilled, onRejected)
</code></pre>
<p>对promise添加<code>onFulfilled</code>和<code>onRejected</code>回调，并返回的是一个新的Promise实例（不是原来那个Promise实例），且返回值将作为参数传入这个新Promise的<code>resolve</code>函数。</p>
<p>因此，我们可以使用链式写法，如上文的例2.7。由于前一个回调函数，返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的<strong>状态发生变化</strong>，才会被调用。</p>
<h3 id="articleHeader11">.catch()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：Promise.prototype.catch(onRejected)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>语法：<span class="hljs-type">Promise</span>.proto<span class="hljs-keyword">type</span>.catch(onRejected)
</code></pre>
<p>该方法是<code>.then(undefined, onRejected)</code>的别名，用于指定发生错误时的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.3 */
promise.then(function(data) {
    console.log('success');
}).catch(function(error) {
    console.log('error', error);
});

/*******等同于*******/
promise.then(function(data) {
    console.log('success');
}).then(undefined, function(error) {
    console.log('error', error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.3 */</span>
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success'</span>);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, error);
});

<span class="hljs-comment">/*******等同于*******/</span>
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success'</span>);
}).then(<span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, error);
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.4 */
var promise = new Promise(function (resolve, reject) {
    throw new Error('test');
});
/*******等同于*******/
var promise = new Promise(function (resolve, reject) {
    reject(new Error('test'));
});

//用catch捕获
promise.catch(function (error) {
    console.log(error);
});
-------output-------
Error: test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.4 */</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'test'</span>);
});
<span class="hljs-comment">/*******等同于*******/</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'test'</span>));
});

<span class="hljs-comment">//用catch捕获</span>
promise.catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
});
-------output-------
<span class="hljs-built_in">Error</span>: test</code></pre>
<p>从上例可以看出，<code>reject</code>方法的作用，等同于抛错。</p>
<p>promise对象的错误，会一直向后传递，直到被捕获。即错误总会被下一个<code>catch</code>所捕获。<code>then</code>方法指定的回调函数，若抛出错误，也会被下一个<code>catch</code>捕获。<code>catch</code>中也能抛错，则需要后面的<code>catch</code>来捕获。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.5 */
sendRequest('test.html').then(function(data1) {
    //do something
}).then(function (data2) {
    //do something
}).catch(function (error) {
    //处理前面三个Promise产生的错误
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.5 */</span>
sendRequest(<span class="hljs-string">'test.html'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data1</span>) </span>{
    <span class="hljs-comment">//do something</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data2</span>) </span>{
    <span class="hljs-comment">//do something</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">//处理前面三个Promise产生的错误</span>
});</code></pre>
<p>上文提到过，promise状态一旦改变就会凝固，不会再改变。因此promise一旦<code>fulfilled</code>了，再抛错，也不会变为<code>rejected</code>，就不会被<code>catch</code>了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.6 */
var promise = new Promise(function(resolve, reject) {
  resolve();
  throw 'error';
});

promise.catch(function(e) {
   console.log(e);      //This is never called
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.6 */</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  resolve();
  <span class="hljs-keyword">throw</span> <span class="hljs-string">'error'</span>;
});

promise.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
   <span class="hljs-built_in">console</span>.log(e);      <span class="hljs-comment">//This is never called</span>
});</code></pre>
<p>如果没有使用<code>catch</code>方法指定处理错误的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应（Chrome会抛错），这是Promise的另一个缺点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.7 */
var promise = new Promise(function (resolve, reject) {
    resolve(x);
});
promise.then(function (data) {
    console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.7 */</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(x);
});
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVDEBJ?w=1466&amp;h=286" src="https://static.alili.tech/img/bVDEBJ?w=1466&amp;h=286" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVDEZp?w=530&amp;h=151" src="https://static.alili.tech/img/bVDEZp?w=530&amp;h=151" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVDE0o?w=388&amp;h=145" src="https://static.alili.tech/img/bVDE0o?w=388&amp;h=145" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如图所示，只有Chrome会抛错，且promise状态变为<code>rejected</code>，Firefox和Safari中错误不会被捕获，也不会传递到外层代码，最后没有任何输出，promise状态也变为<code>rejected</code>。</p>
<h3 id="articleHeader12">.all()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：Promise.all(iterable)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>语法：Promise.<span class="hljs-keyword">all</span>(iterable)
</code></pre>
<p>该方法用于将多个Promise实例，包装成一个新的Promise实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.all([p1, p2, p3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.all([p1, p2, p3]);</code></pre>
<p><code>Promise.all</code>方法接受一个数组（或具有Iterator接口）作参数，数组中的对象（p1、p2、p3）均为promise实例（如果不是一个promise，该项会被用<code>Promise.resolve</code>转换为一个promise)。它的状态由这三个promise实例决定。</p>
<ul>
<li>当p1, p2, p3状态都变为<code>fulfilled</code>，p的状态才会变为<code>fulfilled</code>，并将三个promise返回的结果，按参数的顺序（而不是 <code>resolved</code>的顺序）存入数组，传给p的回调函数，如例3.8。</li>
<li>当p1, p2, p3其中之一状态变为<code>rejected</code>，p的状态也会变为<code>rejected</code>，并把第一个被<code>reject</code>的promise的返回值，传给p的回调函数，如例3.9。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.8 */
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 3000, &quot;first&quot;);
});
var p2 = new Promise(function (resolve, reject) {
    resolve('second');
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, &quot;third&quot;);
}); 

Promise.all([p1, p2, p3]).then(function(values) { 
  console.log(values); 
});

-------output-------
//约 3s 后
[&quot;first&quot;, &quot;second&quot;, &quot;third&quot;] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.8 */</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(resolve, <span class="hljs-number">3000</span>, <span class="hljs-string">"first"</span>);
});
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-string">'second'</span>);
});
<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-string">"third"</span>);
}); 

<span class="hljs-built_in">Promise</span>.all([p1, p2, p3]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">values</span>) </span>{ 
  <span class="hljs-built_in">console</span>.log(values); 
});

-------output-------
<span class="hljs-comment">//约 3s 后</span>
[<span class="hljs-string">"first"</span>, <span class="hljs-string">"second"</span>, <span class="hljs-string">"third"</span>] </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.9 */
var p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 1000, &quot;one&quot;); 
}); 
var p2 = new Promise((resolve, reject) => { 
  setTimeout(reject, 2000, &quot;two&quot;); 
});
var p3 = new Promise((resolve, reject) => {
  reject(&quot;three&quot;);
});

Promise.all([p1, p2, p3]).then(function (value) {
    console.log('resolve', value);
}, function (error) {
    console.log('reject', error);    // => reject three
});

-------output-------
reject three" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.9 */</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> { 
  setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-string">"one"</span>); 
}); 
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> { 
  setTimeout(reject, <span class="hljs-number">2000</span>, <span class="hljs-string">"two"</span>); 
});
<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  reject(<span class="hljs-string">"three"</span>);
});

<span class="hljs-built_in">Promise</span>.all([p1, p2, p3]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolve'</span>, value);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, error);    <span class="hljs-comment">// =&gt; reject three</span>
});

-------output-------
reject three</code></pre>
<p>这多个 promise 是同时开始、并行执行的，而不是顺序执行。从下面例子可以看出。如果一个个执行，那至少需要 1+32+64+128</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.10 */
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
var startDate = Date.now();

Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (values) {
    console.log(Date.now() - startDate + 'ms');
    console.log(values);
});
-------output-------
133ms       //不一定，但大于128ms
[1,32,64,128]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.10 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timerPromisefy</span>(<span class="hljs-params">delay</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            resolve(delay);
        }, delay);
    });
}
<span class="hljs-keyword">var</span> startDate = <span class="hljs-built_in">Date</span>.now();

<span class="hljs-built_in">Promise</span>.all([
    timerPromisefy(<span class="hljs-number">1</span>),
    timerPromisefy(<span class="hljs-number">32</span>),
    timerPromisefy(<span class="hljs-number">64</span>),
    timerPromisefy(<span class="hljs-number">128</span>)
]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">values</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Date</span>.now() - startDate + <span class="hljs-string">'ms'</span>);
    <span class="hljs-built_in">console</span>.log(values);
});
-------output-------
<span class="hljs-number">133</span>ms       <span class="hljs-comment">//不一定，但大于128ms</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">32</span>,<span class="hljs-number">64</span>,<span class="hljs-number">128</span>]</code></pre>
<h3 id="articleHeader13">.race()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：Promise.race(iterable)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>语法：Promise.race(<span class="hljs-keyword">iterable)
</span></code></pre>
<p>该方法同样是将多个Promise实例，包装成一个新的Promise实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.race([p1, p2, p3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.race([p1, p2, p3]);</code></pre>
<p><code>Promise.race</code>方法同样接受一个数组（或具有Iterator接口）作参数。当p1, p2, p3中有一个实例的状态发生改变（变为<code>fulfilled</code>或<code>rejected</code>），p的状态就跟着改变。并把第一个改变状态的promise的返回值，传给p的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.11 */
var p1 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 500, &quot;one&quot;); 
});
var p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, &quot;two&quot;); 
});

Promise.race([p1, p2]).then(function(value) {
    console.log('resolve', value); 
}, function(error) {
    //not called
    console.log('reject', error); 
});
-------output-------
resolve two

var p3 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, &quot;three&quot;);
});
var p4 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 100, &quot;four&quot;); 
});

Promise.race([p3, p4]).then(function(value) {
    //not called
    console.log('resolve', value);              
}, function(error) {
    console.log('reject', error); 
});
-------output-------
reject four" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.11 */</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{ 
    setTimeout(reject, <span class="hljs-number">500</span>, <span class="hljs-string">"one"</span>); 
});
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{ 
    setTimeout(resolve, <span class="hljs-number">100</span>, <span class="hljs-string">"two"</span>); 
});

<span class="hljs-built_in">Promise</span>.race([p1, p2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolve'</span>, value); 
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">//not called</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, error); 
});
-------output-------
resolve two

<span class="hljs-keyword">var</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{ 
    setTimeout(resolve, <span class="hljs-number">500</span>, <span class="hljs-string">"three"</span>);
});
<span class="hljs-keyword">var</span> p4 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{ 
    setTimeout(reject, <span class="hljs-number">100</span>, <span class="hljs-string">"four"</span>); 
});

<span class="hljs-built_in">Promise</span>.race([p3, p4]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">//not called</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolve'</span>, value);              
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>, error); 
});
-------output-------
reject four</code></pre>
<p>在第一个promise对象变为resolve后，并不会取消其他promise对象的执行，如下例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.12 */
var fastPromise = new Promise(function (resolve) {
    setTimeout(function () {
        console.log('fastPromise');
        resolve('resolve fastPromise');
    }, 100);
});
var slowPromise = new Promise(function (resolve) {
    setTimeout(function () {
        console.log('slowPromise');
        resolve('resolve slowPromise');
    }, 1000);
});
// 第一个promise变为resolve后程序停止
Promise.race([fastPromise, slowPromise]).then(function (value) {
    console.log(value);    // => resolve fastPromise
});
-------output-------
fastPromise
resolve fastPromise
slowPromise     //仍会执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.12 */</span>
<span class="hljs-keyword">var</span> fastPromise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fastPromise'</span>);
        resolve(<span class="hljs-string">'resolve fastPromise'</span>);
    }, <span class="hljs-number">100</span>);
});
<span class="hljs-keyword">var</span> slowPromise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'slowPromise'</span>);
        resolve(<span class="hljs-string">'resolve slowPromise'</span>);
    }, <span class="hljs-number">1000</span>);
});
<span class="hljs-comment">// 第一个promise变为resolve后程序停止</span>
<span class="hljs-built_in">Promise</span>.race([fastPromise, slowPromise]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);    <span class="hljs-comment">// =&gt; resolve fastPromise</span>
});
-------output-------
fastPromise
resolve fastPromise
slowPromise     <span class="hljs-comment">//仍会执行</span></code></pre>
<h3 id="articleHeader14">.resolve()</h3>
<p>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(value);
Promise.resolve(promise);
Promise.resolve(thenable);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.resolve(value);
<span class="hljs-built_in">Promise</span>.resolve(promise);
<span class="hljs-built_in">Promise</span>.resolve(thenable);</code></pre>
<p>它可以看做<code>new Promise()</code>的快捷方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve('Success');

/*******等同于*******/
new Promise(function (resolve) {
    resolve('Success');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'Success'</span>);

<span class="hljs-comment">/*******等同于*******/</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    resolve(<span class="hljs-string">'Success'</span>);
});</code></pre>
<p>这段代码会让这个Promise对象立即进入<code>resolved</code>状态，并将结果<code>success</code>传递给<code>then</code>指定的<code>onFulfilled</code>回调函数。由于<code>Promise.resolve()</code>也是返回Promise对象，因此可以用<code>.then()</code>处理其返回值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.13 */
Promise.resolve('success').then(function (value) {
    console.log(value);
});
-------output-------
Success" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.13 */</span>
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'success'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);
});
-------output-------
Success</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.14 */
//Resolving an array
Promise.resolve([1,2,3]).then(function(value) {
  console.log(value[0]);    // => 1
});

//Resolving a Promise
var p1 = Promise.resolve('this is p1');
var p2 = Promise.resolve(p1);
p2.then(function (value) {
    console.log(value);     // => this is p1
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.14 */</span>
<span class="hljs-comment">//Resolving an array</span>
<span class="hljs-built_in">Promise</span>.resolve([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-built_in">console</span>.log(value[<span class="hljs-number">0</span>]);    <span class="hljs-comment">// =&gt; 1</span>
});

<span class="hljs-comment">//Resolving a Promise</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'this is p1'</span>);
<span class="hljs-keyword">var</span> p2 = <span class="hljs-built_in">Promise</span>.resolve(p1);
p2.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);     <span class="hljs-comment">// =&gt; this is p1</span>
});
</code></pre>
<p><code>Promise.resolve()</code>的另一个作用就是将<code>thenable</code>对象（即带有<code>then</code>方法的对象）转换为promise对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.15 */
var p1 = Promise.resolve({ 
    then: function (resolve, reject) { 
        resolve(&quot;this is an thenable object!&quot;);
    }
});
console.log(p1 instanceof Promise);     // => true

p1.then(function(value) {
    console.log(value);     // => this is an thenable object!
  }, function(e) {
    //not called
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.15 */</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">Promise</span>.resolve({ 
    <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{ 
        resolve(<span class="hljs-string">"this is an thenable object!"</span>);
    }
});
<span class="hljs-built_in">console</span>.log(p1 <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>);     <span class="hljs-comment">// =&gt; true</span>

p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);     <span class="hljs-comment">// =&gt; this is an thenable object!</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//not called</span>
});</code></pre>
<p>再看下面两个例子，无论是在什么时候抛异常，只要promise状态变成<code>resolved</code>或<code>rejected</code>，状态不会再改变，这和新建promise是一样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例3.16 */
//在回调函数前抛异常
var p1 = { 
    then: function(resolve) {
      throw new Error(&quot;error&quot;);
      resolve(&quot;Resolved&quot;);
    }
};

var p2 = Promise.resolve(p1);
p2.then(function(value) {
    //not called
}, function(error) {
    console.log(error);       // => Error: error
});

//在回调函数后抛异常
var p3 = { 
    then: function(resolve) {
        resolve(&quot;Resolved&quot;);
        throw new Error(&quot;error&quot;);
    }
};

var p4 = Promise.resolve(p3);
p4.then(function(value) {
    console.log(value);     // => Resolved
}, function(error) {
    //not called
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例3.16 */</span>
<span class="hljs-comment">//在回调函数前抛异常</span>
<span class="hljs-keyword">var</span> p1 = { 
    <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"error"</span>);
      resolve(<span class="hljs-string">"Resolved"</span>);
    }
};

<span class="hljs-keyword">var</span> p2 = <span class="hljs-built_in">Promise</span>.resolve(p1);
p2.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">//not called</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);       <span class="hljs-comment">// =&gt; Error: error</span>
});

<span class="hljs-comment">//在回调函数后抛异常</span>
<span class="hljs-keyword">var</span> p3 = { 
    <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        resolve(<span class="hljs-string">"Resolved"</span>);
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"error"</span>);
    }
};

<span class="hljs-keyword">var</span> p4 = <span class="hljs-built_in">Promise</span>.resolve(p3);
p4.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);     <span class="hljs-comment">// =&gt; Resolved</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">//not called</span>
});</code></pre>
<h3 id="articleHeader15">.reject()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：Promise.reject(reason)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>语法：<span class="hljs-selector-tag">Promise</span><span class="hljs-selector-class">.reject</span>(<span class="hljs-selector-tag">reason</span>)
</code></pre>
<p>这个方法和上述的<code>Promise.resolve()</code>类似，它也是<code>new Promise()</code>的快捷方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(new Error('error'));

/*******等同于*******/
new Promise(function (resolve, reject) {
    reject(new Error('error'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>));

<span class="hljs-comment">/*******等同于*******/</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>));
});</code></pre>
<p>这段代码会让这个Promise对象立即进入<code>rejected</code>状态，并将错误对象传递给<code>then</code>指定的<code>onRejected</code>回调函数。</p>
<h1 id="articleHeader16">四 Promise常见问题</h1>
<p>经过上一章的学习，相信大家已经学会使用<code>Promise</code>。<br>总结一下创建promise的流程：</p>
<ol>
<li>使用<code>new Promise(fn)</code>或者它的快捷方式<code>Promise.resolve()</code>、<code>Promise.reject()</code>，返回一个promise对象</li>
<li>在<code>fn</code>中指定异步的处理<br>   处理结果正常，调用<code>resolve</code><br>   处理结果错误，调用<code>reject</code>
</li>
</ol>
<p>如果使用ES6的箭头函数，将会使写法更加简单清晰。</p>
<p>这一章节，将会用例子的形式，以说明promise使用过程中的注意点及容易犯的错误。</p>
<p><strong>情景1：</strong>reject 和 catch 的区别</p>
<ul>
<li>promise.then(onFulfilled, onRejected)<br>   在<code>onFulfilled</code>中发生异常的话，在<code>onRejected</code>中是捕获不到这个异常的。</li>
<li>promise.then(onFulfilled).catch(onRejected)<br><code>.then</code>中产生的异常能在<code>.catch</code>中捕获</li>
</ul>
<p>一般情况，还是建议使用第二种，因为能捕获之前的所有异常。当然了，第二种的<code>.catch()</code>也可以使用<code>.then()</code>表示，它们本质上是没有区别的，<code>.catch === .then(null, onRejected)</code></p>
<hr>
<p><strong>情景2：</strong>如果在then中抛错，而没有对错误进行处理（即catch），那么会一直保持reject状态，直到catch了错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例4.1 */
function taskA() {
    console.log(x);
    console.log(&quot;Task A&quot;);
}
function taskB() {
    console.log(&quot;Task B&quot;);
}
function onRejected(error) {
    console.log(&quot;Catch Error: A or B&quot;, error);
}
function finalTask() {
    console.log(&quot;Final Task&quot;);
}
var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);
    
-------output-------
Catch Error: A or B,ReferenceError: x is not defined
Final Task" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例4.1 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">taskA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(x);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Task A"</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">taskB</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Task B"</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejected</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Catch Error: A or B"</span>, error);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">finalTask</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Final Task"</span>);
}
<span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);
    
-------output-------
Catch <span class="hljs-built_in">Error</span>: A or B,<span class="hljs-attr">ReferenceError</span>: x is not defined
Final Task</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVDE12?w=720&amp;h=460" src="https://static.alili.tech/img/bVDE12?w=720&amp;h=460" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>根据例4.1的输出结果及流程图，可以看出，A抛错时，会按照 taskA → onRejected → finalTask这个流程来处理。A抛错后，若没有对它进行处理，如例3.7，状态就会维持<code>rejected</code>，taskB不会执行，直到<code>catch</code>了错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例4.2 */
function taskA() {
    console.log(x);
    console.log(&quot;Task A&quot;);
}
function taskB() {
    console.log(&quot;Task B&quot;);
}
function onRejectedA(error) {
    console.log(&quot;Catch Error: A&quot;, error);
}
function onRejectedB(error) {
    console.log(&quot;Catch Error: B&quot;, error);
}
function finalTask() {
    console.log(&quot;Final Task&quot;);
}
var promise = Promise.resolve();
promise
    .then(taskA)
    .catch(onRejectedA)
    .then(taskB)
    .catch(onRejectedB)
    .then(finalTask);
    
-------output-------
Catch Error: A ReferenceError: x is not defined
Task B
Final Task" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例4.2 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">taskA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(x);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Task A"</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">taskB</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Task B"</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejectedA</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Catch Error: A"</span>, error);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejectedB</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Catch Error: B"</span>, error);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">finalTask</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Final Task"</span>);
}
<span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve();
promise
    .then(taskA)
    .catch(onRejectedA)
    .then(taskB)
    .catch(onRejectedB)
    .then(finalTask);
    
-------output-------
Catch <span class="hljs-built_in">Error</span>: A <span class="hljs-built_in">ReferenceError</span>: x is not defined
Task B
Final Task</code></pre>
<p>将例4.2与4.1对比，在taskA后多了对A的处理，因此，A抛错时，会按照A会按照 taskA → onRejectedA → taskB → finalTask这个流程来处理，此时taskB是正常执行的。</p>
<hr>
<p><strong>情景3：</strong>每次调用<code>then</code>都会返回一个新创建的promise对象，而<code>then</code>内部只是返回的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例4.3 */
//方法1：对同一个promise对象同时调用 then 方法
var p1 = new Promise(function (resolve) {
    resolve(100);
});
p1.then(function (value) {
    return value * 2;
});
p1.then(function (value) {
    return value * 2;
});
p1.then(function (value) {
    console.log(&quot;finally: &quot; + value);
});
-------output-------
finally: 100

//方法2：对 then 进行 promise chain 方式进行调用
var p2 = new Promise(function (resolve) {
    resolve(100);
});
p2.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log(&quot;finally: &quot; + value);
});
-------output-------
finally: 400" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例4.3 */</span>
<span class="hljs-comment">//方法1：对同一个promise对象同时调用 then 方法</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    resolve(<span class="hljs-number">100</span>);
});
p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
});
p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
});
p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"finally: "</span> + value);
});
-------output-------
<span class="hljs-keyword">finally</span>: <span class="hljs-number">100</span>

<span class="hljs-comment">//方法2：对 then 进行 promise chain 方式进行调用</span>
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    resolve(<span class="hljs-number">100</span>);
});
p2.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"finally: "</span> + value);
});
-------output-------
<span class="hljs-keyword">finally</span>: <span class="hljs-number">400</span></code></pre>
<p>第一种方法中，<code>then</code>的调用几乎是同时开始执行的，且传给每个then的value都是100，这种方法应当避免。方法二才是正确的链式调用。<br>因此容易出现下面的错误写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 例4.4 */
function badAsyncCall(data) {
    var promise = Promise.resolve(data);
    promise.then(function(value) {
        //do something
        return value + 1;
    });
    return promise;
}
badAsyncCall(10).then(function(value) {
   console.log(value);          //想要得到11，实际输出10
});
-------output-------
10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 例4.4 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">badAsyncCall</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(data);
    promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-comment">//do something</span>
        <span class="hljs-keyword">return</span> value + <span class="hljs-number">1</span>;
    });
    <span class="hljs-keyword">return</span> promise;
}
badAsyncCall(<span class="hljs-number">10</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
   <span class="hljs-built_in">console</span>.log(value);          <span class="hljs-comment">//想要得到11，实际输出10</span>
});
-------output-------
<span class="hljs-number">10</span></code></pre>
<p>正确的写法应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 改写例4.4 */
function goodAsyncCall(data) {
    var promise = Promise.resolve(data);
    return promise.then(function(value) {
        //do something
        return value + 1;
    });
}
goodAsyncCall(10).then(function(value) {
   console.log(value);
});
-------output-------
11" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 改写例4.4 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">goodAsyncCall</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(data);
    <span class="hljs-keyword">return</span> promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-comment">//do something</span>
        <span class="hljs-keyword">return</span> value + <span class="hljs-number">1</span>;
    });
}
goodAsyncCall(<span class="hljs-number">10</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
   <span class="hljs-built_in">console</span>.log(value);
});
-------output-------
<span class="hljs-number">11</span></code></pre>
<hr>
<p><strong>情景4：</strong>在异步回调中抛错，不会被<code>catch</code>到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Errors thrown inside asynchronous functions will act like uncaught errors
var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw 'Uncaught Exception!';
  }, 1000);
});

promise.catch(function(e) {
  console.log(e);       //This is never called
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Errors thrown inside asynchronous functions will act like uncaught errors</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-string">'Uncaught Exception!'</span>;
  }, <span class="hljs-number">1000</span>);
});

promise.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(e);       <span class="hljs-comment">//This is never called</span>
});</code></pre>
<hr>
<p><strong>情景5：</strong> promise状态变为<code>resove</code>或<code>reject</code>，就凝固了，不会再改变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);
new Promise(function (resolve, reject){
    reject();
    setTimeout(function (){
        resolve();            //not called
    }, 0);
}).then(function(){
    console.log(2);
}, function(){
    console.log(3);
});
console.log(4);

-------output-------
1
4
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>)</span>{
    reject();
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        resolve();            <span class="hljs-comment">//not called</span>
    }, <span class="hljs-number">0</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);

-------output-------
<span class="hljs-number">1</span>
<span class="hljs-number">4</span>
<span class="hljs-number">3</span></code></pre>
<h1 id="articleHeader17">五 结语</h1>
<p>关于<code>promise</code>就先介绍到这边了，比较基础，有不足的地方欢迎指出，有更好的也欢迎补充~</p>
<p>参考资料：</p>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></li>
<li><a href="http://liubin.org/promises-book/" rel="nofollow noreferrer" target="_blank">http://liubin.org/promises-book/</a></li>
<li><a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初探Promise

## 原文链接
[https://segmentfault.com/a/1190000007032448](https://segmentfault.com/a/1190000007032448)


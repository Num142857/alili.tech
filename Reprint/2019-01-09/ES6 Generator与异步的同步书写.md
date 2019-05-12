---
title: 'ES6 Generator与异步的同步书写' 
date: 2019-01-09 2:30:12
hidden: true
slug: ib3snep59h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">开始前</h2>
<p><strong>我们从来没有停止过对<code>javascript</code>语言异步调用方式的改造，我们一直都想用像<code>java</code>那样同步的方式去写异步，尽管<code>Promise</code>可以让我们将异步回调添加到<code>then</code>方法中，但是这种调用方式仍然不那么优雅，<code>es6</code> 中新增加了<code>generator</code>，我们可以通过他的特性来实现异步任务更加优雅的书写方式。</strong></p>
<h2 id="articleHeader1">协程介绍</h2>
<p><strong>协程其实和线程，进程是没有关系的，它不是操作系统为我们提供的<code>api</code>接口，而是通过编程语言或者汇编语言对程序上下文、程序栈来操作实现的。一个线程里面可以包含多个协程，线程的调度是由操作体统来决定的，协程的调度是由用户来决定的。操作系统对其一无所知，因为可以由用户来调度，所以用来执行协作式的任务特别方便。（注意这里是方便，因为能通过协程解决的问题，通过线程和进程也可以解决，但是复杂）</strong></p>
<h2 id="articleHeader2">
<code>Generator</code>介绍</h2>
<p><strong><code>Generator</code> 是协程在<code>es6</code>中的实现。它在<code>es6</code>中是一个函数，这个函数可以分阶段执行，也就是说我们可以在这个函数中的某个位置选择交出当前线程的执行权限，也可以在当前函数外面的某个位置选择将权限再交回这个函数，让它继续执行，这种调度完全由用户决定。在<code>es6</code>中协程函数是这样的</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(p) {
    var a = yield p + 1;  //1
    var b = yield p + 2;  //2
    return b;  //3
}

var g = gen(1);
g.next();  //{value: 2, done: false}
g.next();  //{value: 3, done: false}
g.next();  //{value: undefined, done: true}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>function* gen(p) {
    var a = <span class="hljs-keyword">yield</span> p + <span class="hljs-number">1</span>;  <span class="hljs-regexp">//</span><span class="hljs-number">1</span>
    var b = <span class="hljs-keyword">yield</span> p + <span class="hljs-number">2</span>;  <span class="hljs-regexp">//</span><span class="hljs-number">2</span>
    <span class="hljs-keyword">return</span> b;  <span class="hljs-regexp">//</span><span class="hljs-number">3</span>
}

var g = gen(<span class="hljs-number">1</span>);
g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-number">2</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-number">3</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> undefined, <span class="hljs-symbol">done:</span> <span class="hljs-literal">true</span>}
</code></pre>
<p>通过 <code>var g = gen(1);</code> 仅仅是创建了一个迭代器，函数 <code>gen</code> 里面的内容并没有执行函数体的执行时由第一个 <code>g.next();</code> 开始的 并且将 <code>yield</code> 所在那那条语句执行完后就会返回结果。而后面的语句并没有执行。返回值是一个对象，它的第一个属性是 yield 后面表达式的值 (<code>p+1</code>或者<code>p+2</code>的值);第二个属性表示Generator函数是否执行完成。这里我们通过 <code>yield</code> 执行权限交出去，通过 <code>next</code> 将权限返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(p) {
    var a = yield p + 1;  //1
    var b = yield a + 1;  //2 注意这里是用到了 a
    return b;
}
var g = gen(1);
g.next();  //{value: 2, done: false}
g.next();  //{value: NaN, done: false} 这里的值是 NaN
g.next();  //{value: undefined, done: true}

g.next();  //{value: 2, done: false}
g.next(2);  //{value: 3, done: false}
g.next(6);  //{value: 6, done: true}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>function* gen(p) {
    var a = <span class="hljs-keyword">yield</span> p + <span class="hljs-number">1</span>;  <span class="hljs-regexp">//</span><span class="hljs-number">1</span>
    var b = <span class="hljs-keyword">yield</span> a + <span class="hljs-number">1</span>;  <span class="hljs-regexp">//</span><span class="hljs-number">2</span> 注意这里是用到了 a
    <span class="hljs-keyword">return</span> b;
}
var g = gen(<span class="hljs-number">1</span>);
g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-number">2</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> NaN, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>} 这里的值是 NaN
g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> undefined, <span class="hljs-symbol">done:</span> <span class="hljs-literal">true</span>}

g.<span class="hljs-keyword">next</span>();  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-number">2</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
g.<span class="hljs-keyword">next</span>(<span class="hljs-number">2</span>);  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-number">3</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
g.<span class="hljs-keyword">next</span>(<span class="hljs-number">6</span>);  <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-number">6</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">true</span>}
</code></pre>
<p>注意这里 //1 处 //2 处  <code>var a = yield p + 1;</code>这条赋值语句中 <code>a</code> 的值并不是 <code>p + 1</code>的值。这条语句只是一种写法，这里 <code>a</code> 的值是我们在第二个 <code>next</code> 中传入的 <code>2</code> 这个很重要 <code>b</code> 的值也是我们在第三个 <code>next</code> 中传入的 <code>6</code></p>
<h2 id="articleHeader3">
<code>Generator</code> 的重要特性</h2>
<p><strong>由上面的内容我们总结 3 个关于 Generator 的重要特性</strong></p>
<p><strong>1 通过 <code>yield</code> 交出执行权限，通过 <code>next</code> 返回执行权限</strong><br><strong>2 调用 <code>next</code> 会得到一个返回值，这个值里面包含了 <code>yield</code> 后面的表达式的执行结果</strong><br><strong>3 我们可以通过给 <code>next</code> 传递参数，并且可以在 Generator 函数中通过上面所写的特殊方式来引用</strong></p>
<h2 id="articleHeader4">利用 <code>Generator</code> 的特性来实现异步代码的同步书写</h2>
<p><strong>我们来模拟一个异步函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function post(url, callback) {
    setTimeout(function() {
        var data = { //模拟异步处理结果
            url:url,
            value:10
        };
        callback(data);
    }, 1000);
}

post('http://_ivenj',function(data){
    console.log(data.url);  // http://_ivenj
    console.log(data.value);  //10
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> post(url, callback) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {
        var <span class="hljs-keyword">data</span> = { //模拟异步处理结果
            url:url,
            <span class="hljs-keyword">value</span>:<span class="hljs-number">10</span>
        };
        callback(<span class="hljs-keyword">data</span>);
    }, <span class="hljs-number">1000</span>);
}

post(<span class="hljs-string">'http://_ivenj'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>.url);  // http://_ivenj
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">value</span>);  //<span class="hljs-number">10</span>
});
</code></pre>
<p><strong>对应上面的这个异步函数我想通过 Generator 来这样用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(url) {
    var data = yield post(url);  //1
    console.log(data.url);
    console.log(data.value);
}
var g = gen('http://_ivenj');
var resultG = g.next();
g.next(resultG.value);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-built_in">var</span> data = <span class="hljs-keyword">yield</span> post(<span class="hljs-built_in">url</span>);  <span class="hljs-comment">//1</span>
    <span class="hljs-built_in">console</span>.log(data.url);
    <span class="hljs-built_in">console</span>.log(data.value);
}
<span class="hljs-built_in">var</span> g = gen(<span class="hljs-string">'http://_ivenj'</span>);
<span class="hljs-built_in">var</span> resultG = g.next();
g.next(resultG.value);
</code></pre>
<p>是的，这样写漂亮多了，很像 <code>java</code> 的同步写法。不同之处就是多了个 <code>yield</code> 和 <code>*</code> ，这个无伤大雅。当然以上这样用肯定是不行的。因为 <code>post</code> 毕竟是个异步方法。没有返回值.如果不能实现这样的写法我这半天就是在扯淡，所以通过包装是可以实现的。</p>
<p><strong>通过以下两点可以实现以上的书写方式</strong></p>
<p>(1)我有一篇文章 <a href="https://segmentfault.com/a/1190000008754562">react 实践之 redux applyMiddleware方法详解</a> 中介绍了柯里化（Currying）这篇文章虽然是写react的但是柯里化是独立的，这里就要利用柯里化的思想</p>
<p>(2)我们要在回调中调用 <code>next</code> 来继续执行，(这里有人会想不是不用回调了么，怎么还用，请继续看。。。)</p>
<p><strong>我们要对 <code>post</code> 的调用形式进行包装</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function kPost(url) {
    return function(callback) {
        post(url, callback);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">kPost</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
        post(<span class="hljs-built_in">url</span>, callback);
    }
}</code></pre>
<p><strong>通过这个包装，我们就能保证调用 <code>kPost</code> 就会同步的得到一个返回值</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(url) {
    var data = yield kPost(url);  //1
    console.log(data.url);
    console.log(data.value);
}
//这里执行方式会不同
var g = gen('http://_ivenj');
//启动任务
var resultG1 = g.next();
var value_resultG1 = resultG1.value; //resultG1.value 一定是一个函数，因为我们包装了
value_resultG1(function(data){
    g.next(data);  //通过在异步的回调中调用 next 并传递值来确保依赖异步结果的代码能正确执行
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-built_in">var</span> data = <span class="hljs-keyword">yield</span> kPost(<span class="hljs-built_in">url</span>);  <span class="hljs-comment">//1</span>
    <span class="hljs-built_in">console</span>.log(data.url);
    <span class="hljs-built_in">console</span>.log(data.value);
}
<span class="hljs-comment">//这里执行方式会不同</span>
<span class="hljs-built_in">var</span> g = gen(<span class="hljs-string">'http://_ivenj'</span>);
<span class="hljs-comment">//启动任务</span>
<span class="hljs-built_in">var</span> resultG1 = g.next();
<span class="hljs-built_in">var</span> value_resultG1 = resultG1.value; <span class="hljs-comment">//resultG1.value 一定是一个函数，因为我们包装了</span>
value_resultG1(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    g.next(data);  <span class="hljs-comment">//通过在异步的回调中调用 next 并传递值来确保依赖异步结果的代码能正确执行</span>
});</code></pre>
<p><strong>下面就是整体代码，是上面的片段组合，请你粘贴到浏览器控制台，或者用node运行，就会看到想要的结果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function post(url, callback) {
    setTimeout(function() {
        var data = { //模拟异步处理结果
            url:url,
            value:10
        };
        callback(data);
    }, 1000);
}
function kPost(url) {
    return function(callback) {
        post(url, callback);
    }
}
function* gen(url) {
    var data = yield kPost(url);  //1
    console.log(data.url);
    console.log(data.value);
}
//这里执行方式会不同
var g = gen('http://_ivenj');
//启动任务
var resultG1 = g.next();
var value_resultG1 = resultG1.value; //resultG1.value 一定是一个函数，因为我们包装了
value_resultG1(function(data){
    g.next(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url, callback</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">var</span> data = { <span class="hljs-comment">//模拟异步处理结果</span>
            <span class="hljs-attribute">url</span>:<span class="hljs-attribute">url,
            value</span>:<span class="hljs-number">10</span>
        };
        callback(data);
    }, <span class="hljs-number">1000</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">kPost</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
        post(<span class="hljs-built_in">url</span>, callback);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-built_in">var</span> data = <span class="hljs-keyword">yield</span> kPost(<span class="hljs-built_in">url</span>);  <span class="hljs-comment">//1</span>
    <span class="hljs-built_in">console</span>.log(data.url);
    <span class="hljs-built_in">console</span>.log(data.value);
}
<span class="hljs-comment">//这里执行方式会不同</span>
<span class="hljs-built_in">var</span> g = gen(<span class="hljs-string">'http://_ivenj'</span>);
<span class="hljs-comment">//启动任务</span>
<span class="hljs-built_in">var</span> resultG1 = g.next();
<span class="hljs-built_in">var</span> value_resultG1 = resultG1.value; <span class="hljs-comment">//resultG1.value 一定是一个函数，因为我们包装了</span>
value_resultG1(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    g.next(data);
});</code></pre>
<p><strong>有人会说，怎么不就是将异步回调转移出来了么，还要写回调。这说明你还没有真正体会个中之奥妙。我们会发现 我们写的异步</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="value_resultG1(function(data){
    g.next(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>value_resultG1(<span class="hljs-name">function</span>(<span class="hljs-name">data</span>){
    g.next(<span class="hljs-name">data</span>)<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span></code></pre>
<p><strong>仅仅是调用了 <code>next</code> 进行了结果的传递，这里面有共同之处，不管是哪一种异步，我们都只传递值。大家的处理都是一样的。真正的业务逻辑确实是用同步的方式写的。那么，我们可以将共同的地方提取出来，写一个通用的函数去执行这个传值操作，这样，我们完全就告别了异步，再也看不到了，好开心。<code>co.js</code>就是一个这种<code>generator</code>的执行库。使用它是我们只需要将我们的 gen 传递给它像这样 <code>co(gen)</code> 是的就这样。下面我们自己写一个 <code>co</code></strong></p>
<p><strong>Generator执行器</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function co(taskDef) {
    //获取迭代器  类似 java 中的外柄迭代子
    var task = taskDef();
    //开始任务
    var result = task.next();
    //调用next的递归函数
    function step() {
        if (!result.done) {  //如果generator没有执行完
            if (typeof result.value === &quot;function&quot;) {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);  //向后传递当前异步处理结果
                    step();  //递归执行
                });
            } else {
                result = task.next(result.value);  //如果执行完了就传递值
                step();  //递归执行
            }

        }
    }
    // 启动递归函数
    step();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>function co(taskDef) {
    <span class="hljs-comment">//获取迭代器  类似 java 中的外柄迭代子</span>
    var <span class="hljs-keyword">task</span> = taskDef();
    <span class="hljs-comment">//开始任务</span>
    var result = <span class="hljs-keyword">task</span>.<span class="hljs-keyword">next</span>();
    <span class="hljs-comment">//调用next的递归函数</span>
    function <span class="hljs-keyword">step</span>() {
        <span class="hljs-keyword">if</span> (!result.done) {  <span class="hljs-comment">//如果generator没有执行完</span>
            <span class="hljs-keyword">if</span> (typeof result.value === <span class="hljs-string">"function"</span>) {
                result.value(function(err, data) {
                    <span class="hljs-keyword">if</span> (err) {
                        result = <span class="hljs-keyword">task</span>.<span class="hljs-keyword">throw</span>(err);
                        <span class="hljs-keyword">return</span>;
                    }
                    result = <span class="hljs-keyword">task</span>.<span class="hljs-keyword">next</span>(data);  <span class="hljs-comment">//向后传递当前异步处理结果</span>
                    <span class="hljs-keyword">step</span>();  <span class="hljs-comment">//递归执行</span>
                });
            } <span class="hljs-keyword">else</span> {
                result = <span class="hljs-keyword">task</span>.<span class="hljs-keyword">next</span>(result.value);  <span class="hljs-comment">//如果执行完了就传递值</span>
                <span class="hljs-keyword">step</span>();  <span class="hljs-comment">//递归执行</span>
            }

        }
    }
    <span class="hljs-comment">// 启动递归函数</span>
    <span class="hljs-keyword">step</span>();
}</code></pre>
<p><strong>通过 co 执行的完整代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function post(url, callback) {
    setTimeout(function() {
        var data = { //模拟异步处理结果
            url:url,
            value:10
        };
        callback(data);
    }, 1000);
}
function kPost(url) {
    return function(callback) {
        post(url, callback);
    }
}
function gen(url) {
    return function* () {
        var data = yield kPost(url);  //1
        console.log(data.url);
        console.log(data.value);
    }
}
function co(taskDef) {
    var task = taskDef();
    //开始任务
    var result = task.next();
    // 调用next的递归函数
    function step() {
        if (!result.done) {  //如果generator没有执行完
            if (typeof result.value === &quot;function&quot;) {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);  //向后传递当前异步处理结果
                    step();  //递归执行
                });
            } else {
                result = task.next(result.value);  //如果执行完了就传递值
                step();  //递归执行
            }

        }
    }
    // 启动递归函数
    step();
}
    
co(gen('http://_ivenj')); //调用方式就是这么简单" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url, callback</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">var</span> data = { <span class="hljs-comment">//模拟异步处理结果</span>
            <span class="hljs-attribute">url</span>:<span class="hljs-attribute">url,
            value</span>:<span class="hljs-number">10</span>
        };
        callback(data);
    }, <span class="hljs-number">1000</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">kPost</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
        post(<span class="hljs-built_in">url</span>, callback);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gen</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">var</span> data = <span class="hljs-keyword">yield</span> kPost(<span class="hljs-built_in">url</span>);  <span class="hljs-comment">//1</span>
        <span class="hljs-built_in">console</span>.log(data.url);
        <span class="hljs-built_in">console</span>.log(data.value);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">taskDef</span>) </span>{
    <span class="hljs-built_in">var</span> task = taskDef();
    <span class="hljs-comment">//开始任务</span>
    <span class="hljs-built_in">var</span> result = task.next();
    <span class="hljs-comment">// 调用next的递归函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (!result.done) {  <span class="hljs-comment">//如果generator没有执行完</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> result.value === <span class="hljs-string">"function"</span>) {
                result.value(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
                    <span class="hljs-keyword">if</span> (err) {
                        result = task.throw(err);
                        <span class="hljs-keyword">return</span>;
                    }
                    result = task.next(data);  <span class="hljs-comment">//向后传递当前异步处理结果</span>
                    step();  <span class="hljs-comment">//递归执行</span>
                });
            } <span class="hljs-title">else</span> {
                result = task.next(result.value);  <span class="hljs-comment">//如果执行完了就传递值</span>
                step();  <span class="hljs-comment">//递归执行</span>
            }

        }
    }
    <span class="hljs-comment">// 启动递归函数</span>
    step();
}
    
co(gen(<span class="hljs-string">'http://_ivenj'</span>)); <span class="hljs-comment">//调用方式就是这么简单</span></code></pre>
<p><strong>以上代码执行 1s 后会抛出一个异常，并且正确打印{url: "http://_ivenj", value: 10}，聪明的你一定知道为什么会抛出异常!!!</strong></p>
<p><strong>到这里已经说明白了，并且也说完了，你会想是不是把异步包装成<code>Promise</code>也可以呢，答案是肯定的，柯里化的思想只是一种实现方式，<code>Promise</code> 也是一种，你可以自己去琢磨，<code>co.js</code> 就是将两种方式都实现了的一个执行器。<code>es7</code> 中从语言层面对 <code>Generator</code> 进行了包装，在<code>es7</code> 中我们可以使用 <code>async</code>和<code>await</code>更优雅的实现类似java的顺序书写方式，<code>async</code>和<code>await</code> 是<code>Generator</code>的语法糖，在<code>es7</code>中内置了执行器。别人都说是终极方案。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 Generator与异步的同步书写

## 原文链接
[https://segmentfault.com/a/1190000010106930](https://segmentfault.com/a/1190000010106930)


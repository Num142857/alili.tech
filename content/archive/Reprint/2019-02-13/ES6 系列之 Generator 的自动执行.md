---
title: 'ES6 系列之 Generator 的自动执行' 
date: 2019-02-13 2:31:22
hidden: true
slug: vn4a0ma8dba
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">单个异步任务</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fetch = require('node-fetch');

function* gen(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> url = <span class="hljs-string">'https://api.github.com/users/github'</span>;
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">yield</span> fetch(url);
    <span class="hljs-built_in">console</span>.log(result.bio);
}</code></pre>
<p>为了获得最终的执行结果，你需要这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var g = gen();
var result = g.next();

result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> g = gen();
<span class="hljs-keyword">var</span> result = g.next();

result.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> data.json();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    g.next(data);
});</code></pre>
<p>首先执行 Generator 函数，获取遍历器对象。</p>
<p>然后使用 next 方法，执行异步任务的第一阶段，即 fetch(url)。</p>
<p>注意，由于 fetch(url) 会返回一个 Promise 对象，所以 result 的值为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ value: Promise { <pending> }, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="jsx" style="word-break: break-word; white-space: initial;">{ <span class="hljs-attribute">value</span>: Promise { &lt;pending&gt; }, <span class="hljs-selector-tag">done</span>: <span class="hljs-selector-tag">false</span> }</code></pre>
<p>最后我们为这个 Promise 对象添加一个 then 方法，先将其返回的数据格式化(<code>data.json()</code>)，再调用 g.next，将获得的数据传进去，由此可以执行异步任务的第二阶段，代码执行完毕。</p>
<h2 id="articleHeader1">多个异步任务</h2>
<p>上节我们只调用了一个接口，那如果我们调用了多个接口，使用了多个 yield，我们岂不是要在 then 函数中不断的嵌套下去……</p>
<p>所以我们来看看执行多个异步任务的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fetch = require('node-fetch');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var r3 = yield fetch('https://api.github.com/users/github/repos');

    console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github/followers'</span>);
    <span class="hljs-keyword">var</span> r3 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github/repos'</span>);

    <span class="hljs-built_in">console</span>.log([r1.bio, r2[<span class="hljs-number">0</span>].login, r3[<span class="hljs-number">0</span>].full_name].join(<span class="hljs-string">'\n'</span>));
}</code></pre>
<p>为了获得最终的执行结果，你可能要写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var g = gen();
var result1 = g.next();

result1.value.then(function(data){
    return data.json();
})
.then(function(data){
    return g.next(data).value;
})
.then(function(data){
    return data.json();
})
.then(function(data){
    return g.next(data).value
})
.then(function(data){
    return data.json();
})
.then(function(data){
    g.next(data)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> g = gen();
<span class="hljs-keyword">var</span> result1 = g.next();

result1.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> data.json();
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> g.next(data).value;
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> data.json();
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> g.next(data).value
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> data.json();
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    g.next(data)
});</code></pre>
<p>但我知道你肯定不想写成这样……</p>
<p>其实，利用递归，我们可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);

        if (result.done) return;

        result.value.then(function(data) {
            return data.json();
        }).then(function(data) {
            next(data);
        });

    }

    next();
}

run(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">var</span> g = gen();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">var</span> result = g.next(data);

        <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span>;

        result.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
            <span class="hljs-keyword">return</span> data.json();
        }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
            next(data);
        });

    }

    next();
}

run(gen);</code></pre>
<p>其中的关键就是 yield 的时候返回一个 Promise 对象，给这个 Promise 对象添加 then 方法，当异步操作成功时执行 then 中的 onFullfilled 函数，onFullfilled 函数中又去执行 g.next，从而让 Generator 继续执行，然后再返回一个 Promise，再在成功时执行 g.next，然后再返回……</p>
<h2 id="articleHeader2">启动器函数</h2>
<p>在 run 这个启动器函数中，我们在 then 函数中将数据格式化 <code>data.json()</code>，但在更广泛的情况下，比如 yield 直接跟一个 Promise，而非一个 fetch 函数返回的 Promise，因为没有 json 方法，代码就会报错。所以为了更具备通用性，连同这个例子和启动器，我们修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fetch = require('node-fetch');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var json2 = yield r2.json();
    var r3 = yield fetch('https://api.github.com/users/github/repos');
    var json3 = yield r3.json();

    console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}

function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);

        if (result.done) return;

        result.value.then(function(data) {
            next(data);
        });

    }

    next();
}

run(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> json1 = <span class="hljs-keyword">yield</span> r1.json();
    <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github/followers'</span>);
    <span class="hljs-keyword">var</span> json2 = <span class="hljs-keyword">yield</span> r2.json();
    <span class="hljs-keyword">var</span> r3 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github/repos'</span>);
    <span class="hljs-keyword">var</span> json3 = <span class="hljs-keyword">yield</span> r3.json();

    <span class="hljs-built_in">console</span>.log([json1.bio, json2[<span class="hljs-number">0</span>].login, json3[<span class="hljs-number">0</span>].full_name].join(<span class="hljs-string">'\n'</span>));
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">var</span> g = gen();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">var</span> result = g.next(data);

        <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span>;

        result.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
            next(data);
        });

    }

    next();
}

run(gen);</code></pre>
<p>只要 yield 后跟着一个 Promise 对象，我们就可以利用这个 run 函数将 Generator 函数自动执行。</p>
<h2 id="articleHeader3">回调函数</h2>
<p>yield 后一定要跟着一个 Promise 对象才能保证 Generator 的自动执行吗？如果只是一个回调函数呢？我们来看个例子：</p>
<p>首先我们来模拟一个普通的异步请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchData(url, cb) {
    setTimeout(function(){
        cb({status: 200, data: url})
    }, 1000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span>(<span class="hljs-params">url, cb</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        cb({<span class="hljs-attr">status</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">data</span>: url})
    }, <span class="hljs-number">1000</span>)
}</code></pre>
<p>我们将这种函数改造成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchData(url) {
    return function(cb){
        setTimeout(function(){
            cb({status: 200, data: url})
        }, 1000)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            cb({<span class="hljs-attr">status</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">data</span>: url})
        }, <span class="hljs-number">1000</span>)
    }
}</code></pre>
<p>对于这样的 Generator 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen() {
    var r1 = yield fetchData('https://api.github.com/users/github');
    var r2 = yield fetchData('https://api.github.com/users/github/followers');

    console.log([r1.data, r2.data].join('\n'));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> fetchData(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">yield</span> fetchData(<span class="hljs-string">'https://api.github.com/users/github/followers'</span>);

    <span class="hljs-built_in">console</span>.log([r1.data, r2.data].join(<span class="hljs-string">'\n'</span>));
}</code></pre>
<p>如果要获得最终的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var g = gen();

var r1 = g.next();

r1.value(function(data) {
    var r2 = g.next(data);
    r2.value(function(data) {
        g.next(data);
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> g = gen();

<span class="hljs-keyword">var</span> r1 = g.next();

r1.value(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> r2 = g.next(data);
    r2.value(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        g.next(data);
    });
});</code></pre>
<p>如果写成这样的话，我们会面临跟第一节同样的问题，那就是当使用多个 yield 时，代码会循环嵌套起来……</p>
<p>同样利用递归，所以我们可以将其改造为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);

        if (result.done) return;

        result.value(next);
    }

    next();
}

run(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">var</span> g = gen();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">var</span> result = g.next(data);

        <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span>;

        result.value(next);
    }

    next();
}

run(gen);</code></pre>
<h2 id="articleHeader4">run</h2>
<p>由此可以看到 Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权。</p>
<p>而两种方法可以做到这一点。</p>
<p>（1）回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。</p>
<p>（2）Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。</p>
<p>在两种方法中，我们各写了一个 run 启动器函数，那我们能不能将这两种方式结合在一些，写一个通用的 run 函数呢？我们尝试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function run(gen) {
    var gen = gen();

    function next(data) {
        var result = gen.next(data);
        if (result.done) return;

        if (isPromise(result.value)) {
            result.value.then(function(data) {
                next(data);
            });
        } else {
            result.value(next)
        }
    }

    next()
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

module.exports = run;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">var</span> gen = gen();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">var</span> result = gen.next(data);
        <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">if</span> (isPromise(result.value)) {
            result.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                next(data);
            });
        } <span class="hljs-keyword">else</span> {
            result.value(next)
        }
    }

    next()
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPromise</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'function'</span> == <span class="hljs-keyword">typeof</span> obj.then;
}

<span class="hljs-built_in">module</span>.exports = run;</code></pre>
<p>其实实现的很简单，判断 result.value 是否是 Promise，是就添加 then 函数，不是就直接执行。</p>
<h2 id="articleHeader5">return Promise</h2>
<p>我们已经写了一个不错的启动器函数，支持 yield 后跟回调函数或者 Promise 对象。</p>
<p>现在有一个问题需要思考，就是我们如何获得 Generator 函数的返回值呢？又如果 Generator 函数中出现了错误，就比如 fetch 了一个不存在的接口，这个错误该如何捕获呢？</p>
<p>这很容易让人想到 Promise，如果这个启动器函数返回一个 Promise，我们就可以给这个 Promise 对象添加 then 函数，当所有的异步操作执行成功后，我们执行 onFullfilled 函数，如果有任何失败，就执行 onRejected 函数。</p>
<p>我们写一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function run(gen) {
    var gen = gen();

    return new Promise(function(resolve, reject) {

        function next(data) {
            try {
                var result = gen.next(data);
            } catch (e) {
                return reject(e);
            }

            if (result.done) {
                return resolve(result.value)
            };

            var value = toPromise(result.value);

            value.then(function(data) {
                next(data);
            }, function(e) {
                reject(e)
            });
        }

        next()
    })

}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (isPromise(obj)) return obj;
    if ('function' == typeof obj) return thunkToPromise(obj);
    return obj;
}

function thunkToPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = run;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">var</span> gen = gen();

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">data</span>) </span>{
            <span class="hljs-keyword">try</span> {
                <span class="hljs-keyword">var</span> result = gen.next(data);
            } <span class="hljs-keyword">catch</span> (e) {
                <span class="hljs-keyword">return</span> reject(e);
            }

            <span class="hljs-keyword">if</span> (result.done) {
                <span class="hljs-keyword">return</span> resolve(result.value)
            };

            <span class="hljs-keyword">var</span> value = toPromise(result.value);

            value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                next(data);
            }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                reject(e)
            });
        }

        next()
    })

}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPromise</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'function'</span> == <span class="hljs-keyword">typeof</span> obj.then;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toPromise</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (isPromise(obj)) <span class="hljs-keyword">return</span> obj;
    <span class="hljs-keyword">if</span> (<span class="hljs-string">'function'</span> == <span class="hljs-keyword">typeof</span> obj) <span class="hljs-keyword">return</span> thunkToPromise(obj);
    <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkToPromise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fn(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, res</span>) </span>{
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err);
            resolve(res);
        });
    });
}

<span class="hljs-built_in">module</span>.exports = run;</code></pre>
<p>与第一版有很大的不同：</p>
<p>首先，我们返回了一个 Promise，当 <code>result.done</code> 为 true 的时候，我们将该值 <code>resolve(result.value)</code>，如果执行的过程中出现错误，被 catch 住，我们会将原因 <code>reject(e)</code>。</p>
<p>其次，我们会使用 <code>thunkToPromise</code> 将回调函数包装成一个 Promise，然后统一的添加 then 函数。在这里值得注意的是，在 <code>thunkToPromise</code> 函数中，我们遵循了 error first 的原则，这意味着当我们处理回调函数的情况时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模拟数据请求
function fetchData(url) {
    return function(cb) {
        setTimeout(function() {
            cb(null, { status: 200, data: url })
        }, 1000)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 模拟数据请求</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            cb(<span class="hljs-literal">null</span>, { <span class="hljs-attr">status</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">data</span>: url })
        }, <span class="hljs-number">1000</span>)
    }
}</code></pre>
<p>在成功时，第一个参数应该返回 null，表示没有错误原因。</p>
<h2 id="articleHeader6">优化</h2>
<p>我们在第二版的基础上将代码写的更加简洁优雅一点，最终的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
function run(gen) {

    return new Promise(function(resolve, reject) {
        if (typeof gen == 'function') gen = gen();

        // 如果 gen 不是一个迭代器
        if (!gen || typeof gen.next !== 'function') return resolve(gen)

        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value);
            var value = toPromise(ret.value);
            if (value &amp;&amp; isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise ' +
                'but the following object was passed: &quot;' + String(ret.value) + '&quot;'));
        }
    })
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (isPromise(obj)) return obj;
    if ('function' == typeof obj) return thunkToPromise(obj);
    return obj;
}

function thunkToPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = run;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> gen == <span class="hljs-string">'function'</span>) gen = gen();

        <span class="hljs-comment">// 如果 gen 不是一个迭代器</span>
        <span class="hljs-keyword">if</span> (!gen || <span class="hljs-keyword">typeof</span> gen.next !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">return</span> resolve(gen)

        onFulfilled();

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFulfilled</span>(<span class="hljs-params">res</span>) </span>{
            <span class="hljs-keyword">var</span> ret;
            <span class="hljs-keyword">try</span> {
                ret = gen.next(res);
            } <span class="hljs-keyword">catch</span> (e) {
                <span class="hljs-keyword">return</span> reject(e);
            }
            next(ret);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejected</span>(<span class="hljs-params">err</span>) </span>{
            <span class="hljs-keyword">var</span> ret;
            <span class="hljs-keyword">try</span> {
                ret = gen.throw(err);
            } <span class="hljs-keyword">catch</span> (e) {
                <span class="hljs-keyword">return</span> reject(e);
            }
            next(ret);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">ret</span>) </span>{
            <span class="hljs-keyword">if</span> (ret.done) <span class="hljs-keyword">return</span> resolve(ret.value);
            <span class="hljs-keyword">var</span> value = toPromise(ret.value);
            <span class="hljs-keyword">if</span> (value &amp;&amp; isPromise(value)) <span class="hljs-keyword">return</span> value.then(onFulfilled, onRejected);
            <span class="hljs-keyword">return</span> onRejected(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'You may only yield a function, promise '</span> +
                <span class="hljs-string">'but the following object was passed: "'</span> + <span class="hljs-built_in">String</span>(ret.value) + <span class="hljs-string">'"'</span>));
        }
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPromise</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'function'</span> == <span class="hljs-keyword">typeof</span> obj.then;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toPromise</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (isPromise(obj)) <span class="hljs-keyword">return</span> obj;
    <span class="hljs-keyword">if</span> (<span class="hljs-string">'function'</span> == <span class="hljs-keyword">typeof</span> obj) <span class="hljs-keyword">return</span> thunkToPromise(obj);
    <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkToPromise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fn(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, res</span>) </span>{
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err);
            resolve(res);
        });
    });
}

<span class="hljs-built_in">module</span>.exports = run;</code></pre>
<h2 id="articleHeader7">co</h2>
<p>如果我们再将这个启动器函数写的完善一些，我们就相当于写了一个 co，实际上，上面的代码确实是来自于 co……</p>
<p>而 co 是什么？ co 是大神 TJ Holowaychuk 于 2013 年 6 月发布的一个小模块，用于 Generator 函数的自动执行。</p>
<p>如果直接使用 co 模块，这两种不同的例子可以简写为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// yield 后是一个 Promise
var fetch = require('node-fetch');
var co = require('co');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var json2 = yield r2.json();
    var r3 = yield fetch('https://api.github.com/users/github/repos');
    var json3 = yield r3.json();

    console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}

co(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// yield 后是一个 Promise</span>
<span class="hljs-keyword">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);
<span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> json1 = <span class="hljs-keyword">yield</span> r1.json();
    <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github/followers'</span>);
    <span class="hljs-keyword">var</span> json2 = <span class="hljs-keyword">yield</span> r2.json();
    <span class="hljs-keyword">var</span> r3 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github/repos'</span>);
    <span class="hljs-keyword">var</span> json3 = <span class="hljs-keyword">yield</span> r3.json();

    <span class="hljs-built_in">console</span>.log([json1.bio, json2[<span class="hljs-number">0</span>].login, json3[<span class="hljs-number">0</span>].full_name].join(<span class="hljs-string">'\n'</span>));
}

co(gen);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// yield 后是一个回调函数
var co = require('co');

function fetchData(url) {
    return function(cb) {
        setTimeout(function() {
            cb(null, { status: 200, data: url })
        }, 1000)
    }
}

function* gen() {
    var r1 = yield fetchData('https://api.github.com/users/github');
    var r2 = yield fetchData('https://api.github.com/users/github/followers');

    console.log([r1.data, r2.data].join('\n'));
}

co(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// yield 后是一个回调函数</span>
<span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            cb(<span class="hljs-literal">null</span>, { <span class="hljs-attr">status</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">data</span>: url })
        }, <span class="hljs-number">1000</span>)
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> fetchData(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">yield</span> fetchData(<span class="hljs-string">'https://api.github.com/users/github/followers'</span>);

    <span class="hljs-built_in">console</span>.log([r1.data, r2.data].join(<span class="hljs-string">'\n'</span>));
}

co(gen);</code></pre>
<p>是不是特别的好用？</p>
<h2 id="articleHeader8">ES6 系列</h2>
<p>ES6 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p>
<p>ES6 系列预计写二十篇左右，旨在加深 ES6 部分知识点的理解，重点讲解块级作用域、标签模板、箭头函数、Symbol、Set、Map 以及 Promise 的模拟实现、模块加载方案、异步处理等内容。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之 Generator 的自动执行

## 原文链接
[https://segmentfault.com/a/1190000016731734](https://segmentfault.com/a/1190000016731734)


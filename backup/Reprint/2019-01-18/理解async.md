---
title: '理解async' 
date: 2019-01-18 2:30:35
hidden: true
slug: bg0lveo07vu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>本文将要实现一个顺序读取文件的最优方法，实现方式从最古老的回调方式到目前的<code>async</code>，也会与大家分享下本人对于<code>thunk</code>库与<code>co</code>库的理解。实现的效果：顺序读取出<code>a.txt</code>与<code>b.txt</code>，将读出的内容拼接成为一个字符串。</p>
<h2 id="articleHeader1">同步读取</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const readTwoFile = () => {
    const f1 = fs.readFileSync('./a.txt'),
        f2 = fs.readFileSync('./b.txt');
    return Buffer.concat([f1, f2]).toString();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> readTwoFile = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> f1 = fs.readFileSync(<span class="hljs-string">'./a.txt'</span>),
        f2 = fs.readFileSync(<span class="hljs-string">'./b.txt'</span>);
    <span class="hljs-keyword">return</span> Buffer.concat([f1, f2]).toString();
};</code></pre>
<p>这种方式最利于我们理解，代码也很清楚，没有过多的嵌套，很好的维护，但是这种有着最大的问题，那就是性能，<code>node</code>所倡导的就是异步<code>i/o</code>来处理密集<code>i/o</code>，而同步的读取，很大的程度上浪费着服务器的<code>cpu</code>，这种方式的弊端明显的大于好处，所以直接pass掉。（<strong>其实<code>node</code>的任何异步编程的解决方案的目标都是要达到同步的语义，异步的执行。</strong>）</p>
<h2 id="articleHeader2">利用回调读取</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const readTwoFile = () => {
    let str = null;
    fs.readFile('./a.txt', (err, data) => {
        if (err) throw new Error(err);
        str = data;
        fs.readFile('./b.txt', (err, data) => {
            if (err) throw new Error(err);
            str = Buffer.concat([str, data]).toString();
        });
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> readTwoFile = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> str = <span class="hljs-literal">null</span>;
    fs.readFile(<span class="hljs-string">'./a.txt'</span>, <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err);
        str = data;
        fs.readFile(<span class="hljs-string">'./b.txt'</span>, <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err);
            str = Buffer.concat([str, data]).toString();
        });
    });
};</code></pre>
<p>利用回调的方式，实现起来很简单，直接的嵌套下去就好，但是这种情况下很容易造成的就是不易维护，难以读懂的情况，最为极致的情况的就是回调地狱。</p>
<h2 id="articleHeader3">Promise实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const readFile = file => 
    new Promise((reslove, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            reslove(data);
        });
    });
const readTwoFile = () => {
    let bf = null;
    readFile('./a.txt')
        .then(
            data => {
                bf = data;
                return readFile('./b.txt');
            }, 
            err => { throw new Error(err) }
        )
        .then(
            data => {
                console.log(Buffer.concat([bf, data]).toString())
            }, 
            err => { throw new Error(err) }
        );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> readFile = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> 
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
        fs.readFile(file, <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) reject(err);
            reslove(data);
        });
    });
<span class="hljs-keyword">const</span> readTwoFile = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> bf = <span class="hljs-literal">null</span>;
    readFile(<span class="hljs-string">'./a.txt'</span>)
        .then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                bf = data;
                <span class="hljs-keyword">return</span> readFile(<span class="hljs-string">'./b.txt'</span>);
            }, 
            <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err) }
        )
        .then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(Buffer.concat([bf, data]).toString())
            }, 
            <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err) }
        );
};</code></pre>
<p><code>Promise</code>可以将横向增长的回调转化为纵向增长，能解决一些问题，但是<code>Promise</code>造成的问题就是代码冗余，一眼看过去，全部是<code>then</code>，也不是很爽，但是相比于回调函数嵌套来说，已经有了很大的提升。</p>
<h2 id="articleHeader4">yield</h2>
<p><code>Generator</code>很多语言中都有，本质上是<strong>协程</strong>，下面就来看一下<strong>协程，线程，进程</strong>的区别与联系：</p>
<ul>
<li><p>进程：操作系统中分配资源的基本单位</p></li>
<li><p>线程：操作系统中调度资源的基本单位</p></li>
<li><p>协程：比线程更小的的执行单元，自带<code>cpu</code>上下文，一个协程一个栈</p></li>
</ul>
<p>一个进程中可能存在多个线程，一个线程中可能存在多个协程，进程、线程的切换由操作系统控制，而协程的切换由程序员自身控制。异步<code>i/o</code>利用回调的方式来应对<code>i/o</code>密集，同样的使用协程也可以来应对，协程的切换并没有很大的资源浪费，将一个<code>i/o</code>操作写成一个协程，这样进行<code>i/o</code>时可以吧<code>cpu</code>让给其他协程。<br><code>js</code>同样支持协程，那就是<code>yield</code>。使用<code>yield</code>给我们直观的感受就是，执行到了这个地方停了下来，其他的代码继续跑，到你想让他继续执行了，他就是会继续执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *readTwoFile() {
    const f1 = yield readFile('./a.txt');
    const f2 = yield readFile('./b.txt');  
    return Buffer.concat([f1, f2]).toString();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">readTwoFile</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> f1 = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'./a.txt'</span>);
    <span class="hljs-keyword">const</span> f2 = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'./b.txt'</span>);  
    <span class="hljs-keyword">return</span> Buffer.concat([f1, f2]).toString();
}</code></pre>
<p><code>yield</code>下的顺序读取呈现的也是一种顺序读取的方式，对于<code>readFile</code>来看有两种不同的实现方式，</p>
<ul><li><p>利用<code>thunkify</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const thunkify = (fn, ctx) => (...items) => (done) => {
    ctx = ctx || null;
    let called = false;
    items.push((...args) => {
        if (called) return void 0;
        called = true;
        done.apply(ctx, args);
    });
    try {
        fn.apply(ctx, items);    
    } catch(err) {
        done(err);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> thunkify = <span class="hljs-function">(<span class="hljs-params">fn, ctx</span>) =&gt;</span> (...items) =&gt; <span class="hljs-function">(<span class="hljs-params">done</span>) =&gt;</span> {
    ctx = ctx || <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">let</span> called = <span class="hljs-literal">false</span>;
    items.push(<span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span> <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
        called = <span class="hljs-literal">true</span>;
        done.apply(ctx, args);
    });
    <span class="hljs-keyword">try</span> {
        fn.apply(ctx, items);    
    } <span class="hljs-keyword">catch</span>(err) {
        done(err);
    }
};</code></pre>
<p><code>thunkify</code>函数就是一种柯里化得思想，最后的传入参数<code>done</code>就为回调函数，利用<code>thunkify</code>可以很轻松的实现<code>yield</code>函数的自动化流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const run = fn => {
    const gen = fn();
    let res;
    (function next(err, data) {
        let g = gen.next(data);
        if (g.done) return void 0;
        g.value(next);
    })();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> run = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> gen = fn();
    <span class="hljs-keyword">let</span> res;
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err, data</span>) </span>{
        <span class="hljs-keyword">let</span> g = gen.next(data);
        <span class="hljs-keyword">if</span> (g.done) <span class="hljs-keyword">return</span> <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
        g.value(next);
    })();
};</code></pre>
<ul><li><p>利用<code>Promise</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const readFile = file => 
    new Promise((reslove, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            reslove(data);
        });
    });
const run = fn => {
    const gen = fn();
    let str = null;
    (function next(err, data) {
        let res = gen.next(data);
        if (res.done) return void 0;
        res.value.then(
            data => {
                next(null, data);
            }, 
            err => { throw new Error(err); }
        );
    })();
};
run(readTwoFile);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> readFile = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> 
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
        fs.readFile(file, <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) reject(err);
            reslove(data);
        });
    });
<span class="hljs-keyword">const</span> run = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> gen = fn();
    <span class="hljs-keyword">let</span> str = <span class="hljs-literal">null</span>;
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err, data</span>) </span>{
        <span class="hljs-keyword">let</span> res = gen.next(data);
        <span class="hljs-keyword">if</span> (res.done) <span class="hljs-keyword">return</span> <span class="hljs-built_in">void</span> <span class="hljs-number">0</span>;
        res.value.then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                next(<span class="hljs-literal">null</span>, data);
            }, 
            <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err); }
        );
    })();
};
run(readTwoFile);</code></pre>
<p>上面两种方式都可以达到自动执行<code>yield</code>的过程，那么有没有一种方式，可以兼容这两种实现方式呢，tj大神又给出了一个库，那就是<code>co</code>库，先来看下用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// readTwoFile的实现与上面类似,readFile既可以利用Promise也可以利用thunkify
// co库返回一个Promise对象
co(readTwoFile).then(data => console.log(data));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-comment">// readTwoFile的实现与上面类似,readFile既可以利用Promise也可以利用thunkify</span>
<span class="hljs-comment">// co库返回一个Promise对象</span>
co(readTwoFile).<span class="hljs-keyword">then</span>(<span class="hljs-keyword">data</span> =&gt; console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>));</code></pre>
<p>来看下<code>co</code>库的实现，<code>co</code>库默认会返回一个<code>Promise</code>对象，对于<code>yield</code>之后的值（如上面的<code>res.value</code>），<code>co</code>库会将其转换为一个<code>Promise</code>。实现思想很简单，基本还是利用递归的方式，大体的思路如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const baseHandle = handle => res => {
    let ret;
    try {
        ret = gen[handle](res);
    } catch(e) {
        reject(e);
    }
    next(ret);
};
function co(gen) {
    const ctx = this,
        args = Array.prototype.slice.call(arguments, 1);
    return new Promise((reslove, reject) => {
        if (typeof gen === 'function') gen = gen.apply(ctx, args);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        const onFulfilled = baseHandle('next'),
            onRejected = baseHandle('throw');

        onFulfilled();

        function next(ret) {
            if (ret.done) reslove(ret.value);
            // 将yield的返回值转换为Proimse
            const value = toPromise.call(ctx, ret.value);
            if (value &amp;&amp; isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('yield type error'));
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> baseHandle = <span class="hljs-function"><span class="hljs-params">handle</span> =&gt;</span> res =&gt; {
    <span class="hljs-keyword">let</span> ret;
    <span class="hljs-keyword">try</span> {
        ret = gen[handle](res);
    } <span class="hljs-keyword">catch</span>(e) {
        reject(e);
    }
    next(ret);
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>,
        args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> gen === <span class="hljs-string">'function'</span>) gen = gen.apply(ctx, args);
        <span class="hljs-keyword">if</span> (!gen || <span class="hljs-keyword">typeof</span> gen.next !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">return</span> resolve(gen);

        <span class="hljs-keyword">const</span> onFulfilled = baseHandle(<span class="hljs-string">'next'</span>),
            onRejected = baseHandle(<span class="hljs-string">'throw'</span>);

        onFulfilled();

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">ret</span>) </span>{
            <span class="hljs-keyword">if</span> (ret.done) reslove(ret.value);
            <span class="hljs-comment">// 将yield的返回值转换为Proimse</span>
            <span class="hljs-keyword">const</span> value = toPromise.call(ctx, ret.value);
            <span class="hljs-keyword">if</span> (value &amp;&amp; isPromise(value)) <span class="hljs-keyword">return</span> value.then(onFulfilled, onRejected);
            <span class="hljs-keyword">return</span> onRejected(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'yield type error'</span>));
        }
    });
}</code></pre>
<p><code>toPromise</code>就是将一些类型转换为<code>Promise</code>，从这里我们可以看出的是可以将哪些类型放在<code>yield</code>后面，这里就来看一个常用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 把thunkify之后的函数转化为Promise的形式
function thunkToPromise(fn) {
    const ctx = this;
    return new Promise(function (resolve, reject) {
        fn.call(ctx, function (err, res) {
            if (err) return reject(err);
            if (arguments.length > 2) res = slice.call(arguments, 1);
            resolve(res);
        });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 把thunkify之后的函数转化为Promise的形式</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkToPromise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        fn.call(ctx, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, res</span>) </span>{
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err);
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length &gt; <span class="hljs-number">2</span>) res = slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
            resolve(res);
        });
    });
}</code></pre>
<p>最近<code>Node</code>已经支持了<code>async/await</code>，可以利用其来做异步操作：</p>
<h2 id="articleHeader5">终极解决</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const readFile = file => 
    new Promise((reslove, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            reslove(data);
        });
    });
const readTwoFile = async function() {
    const f1 = await readFile('./a.txt');
    const f2 = await readFile('./b.txt');    
    return Buffer.concat([f1, f2]).toString();
};
readTwoFile().then(data => {
    console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> readFile = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> 
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
        fs.readFile(file, <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) reject(err);
            reslove(data);
        });
    });
<span class="hljs-keyword">const</span> readTwoFile = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> f1 = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'./a.txt'</span>);
    <span class="hljs-keyword">const</span> f2 = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'./b.txt'</span>);    
    <span class="hljs-keyword">return</span> Buffer.concat([f1, f2]).toString();
};
readTwoFile().then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<p><code>async/await</code>做的就是将<code>Promise</code>对象给串联起来，避免了<code>then</code>的调用方式，代码非常的易读，就是一种同步的方式。不再需要借助其他外界类库（比如<code>co</code>库）就可以优雅的解决回调的问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解async

## 原文链接
[https://segmentfault.com/a/1190000008687414](https://segmentfault.com/a/1190000008687414)


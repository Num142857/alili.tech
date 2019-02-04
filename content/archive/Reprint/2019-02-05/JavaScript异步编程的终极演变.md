---
title: 'JavaScript异步编程的终极演变' 
date: 2019-02-05 2:30:09
hidden: true
slug: qtgce9g2usj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">写在前面</h1>
<p>有一个有趣的问题：</p>
<blockquote><p>为什么<code>Node.js</code>约定回调函数的第一个参数必须是错误对象<code>err</code>(如果没有错误，该参数就是<code>null</code>)?</p></blockquote>
<p>原因是执行回调函数对应的异步操作，它的执行分成两段，这两段之间抛出的错误程序无法捕获，所以只能作为参数传入第二段。大家知道，<code>JavaScript</code>只有一个线程，如果没有异步编辑，复杂的程序基本没法使用。在ES6诞生以前，异步编程的方式大概有下面四种：</p>
<ul>
<li><p>回调函数</p></li>
<li><p>事件监听</p></li>
<li><p>发布/订阅</p></li>
<li><p><code>Promise</code>对象</p></li>
</ul>
<p>ES6将<code>JavaScript</code>异步编程带入了一个全新的阶段，ES7中的<code>async</code>函数更是给出了异步编程的终极解决方案。下面将具体讲解异步编程的原理和值得注意的地方，待我细细道来～</p>
<h1 id="articleHeader1">异步编程的演变</h1>
<h2 id="articleHeader2">基本理解</h2>
<p>所谓<code>异步</code>，简单地说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好准备再回过头执行第二段。</p>
<p><strong>举个例子</strong><br>读取一个文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步。</p>
<p>相应地，连续的执行就叫作同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着。</p>
<h2 id="articleHeader3">回调函数</h2>
<p>所谓回调函数，就是把任务的第二段单独写在一个函数中，等到重新执行该任务时直接调用这个函数。其英文名字 <code>callback</code>  直译过来就是  "重新调用"的意思。</p>
<p>拿上面的例子讲，读取文件操作是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.readFile(fileA, (err, data) => {
    if (err) throw err;
    console.log(data)
})

fs.readFile(fileB, (err, data) => {
    if (err) throw err;
    console.log(data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">fs.readFile(fileA, (err, data) =&gt; {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
    <span class="hljs-built_in">console</span>.log(data)
})

fs.readFile(fileB, (err, data) =&gt; {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
    <span class="hljs-built_in">console</span>.log(data)
})</code></pre>
<blockquote><p>注意：上面两段代码彼此是异步的，虽然开始执行的顺序是从上到下，但是第二段并不会等到第一段结束才执行，而是并发执行。</p></blockquote>
<p>那么问题来了，如果想<code>fileB</code>等到<code>fileA</code>读取成功后再开始执行应该怎么处理呢？最简单的办法是通过 <strong>回调嵌套</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.readFile(fileA, (err, data) => {
    if (err) throw err;
    console.log(data)
    
    fs.readFile(fileB, (_err, _data) => { 
        if (_err) throw err;
        console.log(_data)
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">fs.readFile(fileA, (err, data) =&gt; {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
    <span class="hljs-built_in">console</span>.log(data)
    
    fs.readFile(fileB, (_err, _data) =&gt; { 
        <span class="hljs-keyword">if</span> (_err) <span class="hljs-keyword">throw</span> err;
        <span class="hljs-built_in">console</span>.log(_data)
    })
})</code></pre>
<p>这种方式我只能容忍个位数字的嵌套，而且它使得代码横向发展，实在是丑的一笔，次数多了根本是没法看。试想万一要同步执行100个异步操作呢？疯掉算了吧！有没有更好的办法呢？</p>
<h2 id="articleHeader4">使用<code>Promise</code>
</h2>
<p>要澄清一点，<code>Promise</code>的概念并不是<code>ES6</code>新出的，而是<code>ES6</code>整合了一套新的写法。同样继续上面的例子，使用<code>Promise</code>代码就变成这样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var readFile = require('fs-readfile-promise');

readFile(fileA)
.then((data)=>{console.log(data)})
.then(()=>{return readFile(fileB)})
.then((data)=>{console.log(data)})
// ... 读取n次
.catch((err)=>{console.log(err)})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> readFile = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs-readfile-promise'</span>);

readFile(fileA)
.then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)})
.then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-keyword">return</span> readFile(fileB)})
.then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)})
<span class="hljs-comment">// ... 读取n次</span>
.catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)})</code></pre>
<blockquote><p>注意：上面代码使用了<code>Node</code>封装好的<code>Promise</code>版本的<code>readFile</code>函数，它的原理其实就是返回一个<code>Promise</code>对象，咱也简单地写一个：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');

var readFile = function(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

module.export = readFile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> readFile = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fs.readFile(path, (err, data) =&gt; {
            <span class="hljs-keyword">if</span> (err) reject(err)
            resolve(data)
        })
    })
}

<span class="hljs-built_in">module</span>.export = readFile</code></pre>
<blockquote><p>但是，<code>Promise</code>的写法只是回调函数的改进，使用<code>then()</code>之后，异步任务的两段执行看得更清楚，除此之外并无新意。撇开优点，<code>Promise</code>的最大问题就是代码冗余，原来的任务被<code>Promise</code>包装一下，不管什么操作，一眼看上去都是一堆<code>then()</code>，原本的语意变得很不清楚。</p></blockquote>
<p>把酒问苍天，MD还有更好的办法吗？</p>
<h2 id="articleHeader5">使用<code>Generator</code>
</h2>
<p>在引入<code>generator</code>之前，先介绍一下什么叫 <strong>协程</strong></p>
<blockquote><p>"携程在手，说走就走"。哈哈，别混淆了， "<strong>协程</strong>" 非 "<strong>携程</strong>"</p></blockquote>
<h3 id="articleHeader6">协程</h3>
<p>所谓 "协程" ，就是多个线程相互协作，完成异步任务。协程有点像函数，又有点像线程。其运行流程大致如下：</p>
<ul>
<li><p>第一步： 协程A开始执行</p></li>
<li><p>第二步：协程A执行到一半，暂停，执行权转移到协程B</p></li>
<li><p>第三步：一段时间后，协程B交还执行权</p></li>
<li><p>第四步：协程A恢复执行</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncJob() {
    // ... 其他代码
    var f = yield readFile(fileA);
    // ... 其他代码 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncJob</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ... 其他代码</span>
    <span class="hljs-keyword">var</span> f = <span class="hljs-keyword">yield</span> readFile(fileA);
    <span class="hljs-comment">// ... 其他代码 </span>
}</code></pre>
<blockquote><p>上面的<code>asyncJob()</code>就是一个协程，它的奥妙就在于其中的<code>yield</code>命令。它表示执行到此处执行权交给其他协程，换而言之，<code>yield</code>就是异步两个阶段的分界线。</p></blockquote>
<p>协程遇到<code>yield</code>命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点就是代码的写法非常像同步操作，如果除去 <code>yield</code>命令，简直一模一样。</p>
<h3 id="articleHeader7">
<code>Generator</code>函数</h3>
<p><code>Generator</code>函数是协程在ES6中的实现，最大的特点就是可以交出函数的执行权（即暂停执行）。整个<code>Generator</code>函数就是一个封装的异步任务，或者说就是异步任务的容器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(x) {
    var y = yield x + 2;
    return y;
} 

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">var</span> y = <span class="hljs-keyword">yield</span> x + <span class="hljs-number">2</span>;
    <span class="hljs-keyword">return</span> y;
} 

<span class="hljs-keyword">var</span> g = gen(<span class="hljs-number">1</span>);
g.next() <span class="hljs-comment">// { value: 3, done: false }</span>
g.next() <span class="hljs-comment">// { value: undefined, done: true }</span></code></pre>
<p>上面的代码中，调用<code>Generator</code>函数，会返回一个内部指针（即遍历器）g，这是<code>Generator</code>函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的<code>next()</code>方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的<code>yield</code>语句。</p>
<p>换而言之，<code>next()</code>方法的作用是分阶段执行<code>Generator</code>函数。每次调用<code>next()</code>方法，会返回一个对象，表示当前阶段的信息（<code>value</code>属性和<code>done</code>属性）。<code>value</code>属性是<code>yield</code>语句后面表达式的值，表示当前阶段的值；<code>done</code>属性是一个布尔值，表示<code>Generator</code>函数是否执行完毕，即是否还有一个阶段。</p>
<h3 id="articleHeader8">
<code>Generator</code>函数的数据交换和错误处理</h3>
<p><code>Generator</code>函数可以暂停执行和恢复执行，这是它封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的解决方案：函数体内外的数据交换和错误处理机制。</p>
<p><code>next()</code>方法返回值的<code>value</code>属性，是<code>Generator</code>函数向外输出的数据；<code>next()</code>方法还可以接受参数，向<code>Generator</code>函数体内输入数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(x) {
    var y = yield x + 2;
    return y;
} 

var g = gen(1);
g.next()      // { value: 3, done: false }
g.next(2)     // { value: 2, done: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">var</span> y = <span class="hljs-keyword">yield</span> x + <span class="hljs-number">2</span>;
    <span class="hljs-keyword">return</span> y;
} 

<span class="hljs-keyword">var</span> g = gen(<span class="hljs-number">1</span>);
g.next()      <span class="hljs-comment">// { value: 3, done: false }</span>
g.next(<span class="hljs-number">2</span>)     <span class="hljs-comment">// { value: 2, done: true }</span></code></pre>
<blockquote><p>上面的代码中，第一个<code>next()</code>方法的<code>value</code>属性，返回表达式<code>x+2</code>的值（3）。第二个<code>next()</code>方法带有参数2，这个参数可以传入<code>Generator</code>函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收，因此这一步的<code>value</code>属性返回的就是2（变量y的值）。</p></blockquote>
<p><code>Generator</code>函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen(x) {
    try {
        var y = yield x + 2
    } catch(e) {
        console.log(e)
    }
    return y
}

var g = gen(1);
g.next();
g.throw('出错了');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> y = <span class="hljs-keyword">yield</span> x + <span class="hljs-number">2</span>
    } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-built_in">console</span>.log(e)
    }
    <span class="hljs-keyword">return</span> y
}

<span class="hljs-keyword">var</span> g = gen(<span class="hljs-number">1</span>);
g.next();
g.throw(<span class="hljs-string">'出错了'</span>);</code></pre>
<p>上面代码的最后一行，<code>Generator</code>函数体外，使用指针对象的<code>throw</code>方法抛出的错误，可以被函数体内的<code>try...catch</code> 代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。</p>
<h3 id="articleHeader9">异步任务的封装</h3>
<p>下面看看如何使用<code>Generator</code>函数，执行一个真实的异步任务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fetch = require('node-fetch')

function* gen() {
    var url = 'https://api.github.com/usrs/github';
    var result = yield fetch(url);
    console.log(result.bio);
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://api.github.com/usrs/github'</span>;
    <span class="hljs-built_in">var</span> result = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-built_in">url</span>);
    <span class="hljs-built_in">console</span>.log(result.bio);
} </code></pre>
<blockquote><p>上面代码中，<code>Generator</code>函数封装了一个异步操作，该操作先读取一个远程接口，然后从<code>JSON</code>格式的数据解析信息。就像前面说过的，这段代码非常像同步操作。除了加上<code>yield</code>命令。</p></blockquote>
<p>执行这段代码的方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var g = gen();
var result = g.next();

result.value.then(function(data) {
    return data.json()
}).then(function(data) {
    g.next(data)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var g = gen();
var result = g.next();

result.<span class="hljs-keyword">value</span>.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>.json()
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span> {
    g.next(<span class="hljs-keyword">data</span>)
});</code></pre>
<p>上面代码中，首先执行<code>Generator</code>函数，获取遍历器对象。然后使用<code>next()</code>方法，执行异步任务的第一阶段。由于<code>Fetch</code>模块返回的是一个<code>Promise</code>对象，因此需要用<code>then()</code>方法调用下一个<code>next()</code>方法。</p>
<p>可以看到，虽然<code>Generator</code>函数将异步操作表示得很简洁，但是流程管理却不方便（即合适执行第一阶段，何时执行第二阶段）</p>
<h2 id="articleHeader10">大Boss登场之 <code>async</code>函数</h2>
<p>所谓<code>async</code>函数，其实是<code>Generator</code>函数的语法糖。</p>
<p>继续我们异步读取文件的例子，使用<code>Generator</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');

var readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var gen = function* () {
    var f1 = yield readFile(fileA);
    var f2 = yield readFile(fileB);
    console.log(f1.toString());
    console.log(f2.toString());
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> readFile = <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fs.readFile(path, (err, data) =&gt; {
            <span class="hljs-keyword">if</span> (err) reject(err)
            resolve(data)
        })
    })
}

<span class="hljs-keyword">var</span> gen = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">yield</span> readFile(fileA);
    <span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">yield</span> readFile(fileB);
    <span class="hljs-built_in">console</span>.log(f1.toString());
    <span class="hljs-built_in">console</span>.log(f2.toString());
}</code></pre>
<p>写成<code>async</code>函数，就是下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var asyncReadFile = async function() {
    var f1 = await readFile(fileA);
    var f2 = await readFile(fileB);
    console.log(f1.toString())
    console.log(f2.toString())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> asyncReadFile = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">await</span> readFile(fileA);
    <span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">await</span> readFile(fileB);
    <span class="hljs-built_in">console</span>.log(f1.toString())
    <span class="hljs-built_in">console</span>.log(f2.toString())
}</code></pre>
<p>发现了吧，<code>async</code>函数就是将<code>Generator</code>函数的<code>*</code>替换成了<code>async</code>，将<code>yield</code>替换成<code>await</code>，除此之外，还对 <code>Generator</code>做了以下四点改进：</p>
<p>（1）内置执行器。<code>Generator</code>函数的执行比如靠执行器，所以才有了<code>co</code>模块等异步执行器，而<code>async</code>函数是自带执行器的。也就是说：<strong><code>async</code>函数的执行，与普通函数一模一样，只要一行：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = asyncReadFile();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> result = asyncReadFile();</code></pre>
<p>（2）上面的代码调用了<code>asyncReadFile()</code>，就会自动执行，输出最后结果。这完全不像<code>Generator</code>函数，需要调用<code>next()</code>方法，或者使用<code>co</code>模块，才能得到真正执行，从而得到最终结果。</p>
<p>（3）更好的语义。<code>async</code>和<code>await</code>比起星号和<code>yield</code>，语义更清楚。<code>async</code>表示函数里有异步操作，<code>await</code>表示紧跟在后面的表达式需要等待结果。</p>
<p>（4）更广的适用性。<code>async</code>函数的<code>await</code>命令后面可以是<code>Promise</code>对象和原始类型的值（数值、字符串和布尔值，而这是等同于同步操作）。</p>
<p>（5）返回值是<code>Promise</code>，这比<code>Generator</code>函数返回的是<code>Iterator</code>对象方便多了。你可以用<code>then()</code>指定下一步操作。</p>
<blockquote><p>进一步说，<code>async</code>函数完全可以看作由多个异步操作包装成的一个<code>Promise</code>对象，而<code>await</code>命令就是内部<code>then()</code>命令的语法糖。</p></blockquote>
<h3 id="articleHeader11">实现原理</h3>
<p><code>async</code>函数的实现就是将<code>Generator</code>函数和自动执行器包装在一个函数中。如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function fn(args) {
    // ...
}

// 等同于 
function fn(args) {
  return spawn(function*() {
    // ...
  })
}
// 自动执行器
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF()
      } catch(e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v) })
      },function(e) {
        step(function() { return gen.throw(e) })
      })
    }
    step(function() { return gen.next(undefined) })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">args</span>) </span>{
    <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// 等同于 </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">args</span>) </span>{
  <span class="hljs-keyword">return</span> spawn(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  })
}
<span class="hljs-comment">// 自动执行器</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spawn</span>(<span class="hljs-params">genF</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">var</span> gen = genF();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params">nextF</span>) </span>{
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> next = nextF()
      } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-keyword">return</span> reject(e)
      }
      <span class="hljs-keyword">if</span> (next.done) {
        <span class="hljs-keyword">return</span> resolve(next.value)
      }
      <span class="hljs-built_in">Promise</span>.resolve(next.value).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        step(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> gen.next(v) })
      },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        step(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> gen.throw(e) })
      })
    }
    step(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> gen.next(<span class="hljs-literal">undefined</span>) })
  })
}</code></pre>
<h3 id="articleHeader12">
<code>async</code>函数用法</h3>
<p>（1）<code>async</code>函数返回一个<code>Promise</code>对象，可以是<code>then()</code>方法添加回调函数。<br>（2）当函数执行时，一旦遇到<code>await()</code>就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。</p>
<p>下面是一个延迟输出结果的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms)
  console.log(value)
}

// 延迟500ms后输出 &quot;Hello World!&quot;
asyncPrint('Hello World!', 500)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">ms</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    setTimeout(resolve, ms)
  })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncPrint</span>(<span class="hljs-params">value, ms</span>) </span>{
  <span class="hljs-keyword">await</span> timeout(ms)
  <span class="hljs-built_in">console</span>.log(value)
}

<span class="hljs-comment">// 延迟500ms后输出 "Hello World!"</span>
asyncPrint(<span class="hljs-string">'Hello World!'</span>, <span class="hljs-number">500</span>)</code></pre>
<h3 id="articleHeader13">注意事项</h3>
<p>（1）<code>await</code>命令后面的<code>Promise</code>对象，运行结果可能是<code>reject</code>，所以最好把<code>await</code>命令放在<code>try...catch</code>代码块中。</p>
<p>（2）<code>await</code>命令只能用在<code>async</code>函数中，用在普通函数中会报错。</p>
<p>（3）<code>ES6</code>将<code>await</code>增加为保留字。如果使用这个词作为标识符，在<code>ES5</code>中是合法的，但是<code>ES6</code>会抛出 <code>SyntaxError</code>（语法错误）。</p>
<h1 id="articleHeader14">终极一战</h1>
<p>"倚天不出谁与争锋"，上面介绍了一大堆，最后还是让我们通过一个例子来看看 <code>async</code> 函数和<code>Promise</code>、<code>Generator</code>到底谁才是真正的老大吧！</p>
<blockquote><p>需求：假定某个DOM元素上部署了一系列的动画，前一个动画结束才能开始后一个。如果当中又一个动画出错就不再往下执行，返回上一个成功执行动画的返回值。</p></blockquote>
<h2 id="articleHeader15">用<code>Promise</code>实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function chainAnimationsPromise(ele, animations) {

  // 变量ret用来保存上一个动画的返回值 
  var ret = null;
  
  // 新建一个空的Promise 
  var p = Promise.resolve();

  // 使用then方法添加所有动画 
  for (var anim in animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(ele);
    })
  }
  
  // 返回一个部署了错误捕获机制的Promise 
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chainAnimationsPromise</span>(<span class="hljs-params">ele, animations</span>) </span>{

  <span class="hljs-comment">// 变量ret用来保存上一个动画的返回值 </span>
  <span class="hljs-keyword">var</span> ret = <span class="hljs-literal">null</span>;
  
  <span class="hljs-comment">// 新建一个空的Promise </span>
  <span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.resolve();

  <span class="hljs-comment">// 使用then方法添加所有动画 </span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> anim <span class="hljs-keyword">in</span> animations) {
    p = p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
      ret = val;
      <span class="hljs-keyword">return</span> anim(ele);
    })
  }
  
  <span class="hljs-comment">// 返回一个部署了错误捕获机制的Promise </span>
  <span class="hljs-keyword">return</span> p.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">/* 忽略错误，继续执行 */</span>
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> ret;
  })
}</code></pre>
<p>虽然<code>Promise</code>的写法比起回调函数的写法有很大的改进，但是操作本身的语义却变得不太明朗。</p>
<h3 id="articleHeader16">用<code>Generator</code>实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function chainAnimationsGenerator(ele, animations) {
  return spawn(function*() {
    var ret = null;
    try {
      for(var anim of animations) {
        ret = yield anim(ele)
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chainAnimationsGenerator</span>(<span class="hljs-params">ele, animations</span>) </span>{
  <span class="hljs-keyword">return</span> spawn(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> ret = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> anim <span class="hljs-keyword">of</span> animations) {
        ret = <span class="hljs-keyword">yield</span> anim(ele)
      }
    } <span class="hljs-keyword">catch</span>(e) {
      <span class="hljs-comment">/* 忽略错误，继续执行 */</span>
    }
    <span class="hljs-keyword">return</span> ret;
  })
}</code></pre>
<p>使用<code>Generator</code>虽然语义比<code>Promise</code>写法清晰不少，但是用户定义的操作全部出现在<code>spawn</code>函数的内部。这个写法的问题在于，必须有一个任务运行器自动执行<code>Generator</code>函数，它返回一个<code>Promise</code>对象，而且保证<code>yield</code>语句后的表达式返回的是一个<code>Promise</code>。上面的<code>spawn</code>就扮演了这一角色。它的实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF()
      } catch(e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v) })
      },function(e) {
        step(function() { return gen.throw(e) })
      })
    }
    step(function() { return gen.next(undefined) })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spawn</span>(<span class="hljs-params">genF</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">var</span> gen = genF();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params">nextF</span>) </span>{
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> next = nextF()
      } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-keyword">return</span> reject(e)
      }
      <span class="hljs-keyword">if</span> (next.done) {
        <span class="hljs-keyword">return</span> resolve(next.value)
      }
      <span class="hljs-built_in">Promise</span>.resolve(next.value).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        step(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> gen.next(v) })
      },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        step(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> gen.throw(e) })
      })
    }
    step(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> gen.next(<span class="hljs-literal">undefined</span>) })
  })
}</code></pre>
<h2 id="articleHeader17">使用<code>async</code>实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function chainAnimationAsync(ele, animations) {
  var ret = null;
  try {
    for(var anim of animations) {
      ret = await anim(ele)
    } 
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chainAnimationAsync</span>(<span class="hljs-params">ele, animations</span>) </span>{
  <span class="hljs-keyword">var</span> ret = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> anim <span class="hljs-keyword">of</span> animations) {
      ret = <span class="hljs-keyword">await</span> anim(ele)
    } 
  } <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-comment">/* 忽略错误，继续执行 */</span>
  }
  <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>好了，光从代码量上就看出优势了吧！简洁又符合语义，几乎没有不相关代码。完胜！</p>
<blockquote><p>注意一点：<code>async</code>属于ES7的提案，使用时请通过<code>babel</code>或者<code>regenerator</code>进行转码。</p></blockquote>
<h1 id="articleHeader18">参考</h1>
<p>阮一峰 《ES6标准入门》</p>
<hr>
<p>@欢迎关注我的 <a href="https://github.com/jafeney" rel="nofollow noreferrer" target="_blank">github</a> 和 <a href="http://jafeney.com" rel="nofollow noreferrer" target="_blank">个人博客 －Jafeney</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript异步编程的终极演变

## 原文链接
[https://segmentfault.com/a/1190000006510526](https://segmentfault.com/a/1190000006510526)


---
title: '一个浏览器和NodeJS通用的RPC框架' 
date: 2019-02-10 2:30:42
hidden: true
slug: chet2fs7ml5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>欢迎关注我的知乎专栏： <a href="https://zhuanlan.zhihu.com/starkwang" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/starkwang</a></p></blockquote>
<hr>
<p><a href="https://github.com/starkwang/Maus" rel="nofollow noreferrer" target="_blank">starkwang/Maus: A Simple JSON-RPC Framework running in NodeJS or Browser, based on websocket.</a></p>
<p>这几天写了个小型的RPC框架，最初只是想用 TCP-JSON 写个纯 NodeJS 平台的东西，后来无意中开了个脑洞，如果基于 Websocket 把浏览器当做 RPC Server ，那岂不是只要是能运行浏览器（或者nodejs）的设备，都可以作为分布式计算中的一个 Worker 了吗？</p>
<p>打开一张网页，就能成为分布式计算的一个节点，看起来还是挺酷炫的。</p>
<h2 id="articleHeader0">一、什么是RPC</h2>
<p>可以参考：<a href="https://www.zhihu.com/question/25536695" rel="nofollow noreferrer" target="_blank">谁能用通俗的语言解释一下什么是RPC框架？ - 知乎</a></p>
<p>简单地说就是你可以这样注册一个任意数量的<code>worker</code>（姑且叫这个名字好了），它里面声明了具体的方法实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rpcWorker = require('maus').worker;
rpcWorker.create({
    add: (x, y) => x + y
}, 'http://192.168.1.100:8124');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> rpcWorker = <span class="hljs-built_in">require</span>(<span class="hljs-string">'maus'</span>).worker;
rpcWorker.create({
    <span class="hljs-attr">add</span>: <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> x + y
}, <span class="hljs-string">'http://192.168.1.100:8124'</span>);
</code></pre>
<p>然后你可以在另一个node进程里这样调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rpcManager = require('maus').manager;
rpcManager.create(workers => {
    workers.add(1, 2, result => console.log(result));
}, 8124)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> rpcManager = <span class="hljs-built_in">require</span>(<span class="hljs-string">'maus'</span>).manager;
rpcManager.create(<span class="hljs-function"><span class="hljs-params">workers</span> =&gt;</span> {
    workers.add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, result =&gt; <span class="hljs-built_in">console</span>.log(result));
}, <span class="hljs-number">8124</span>)</code></pre>
<p>这里我们封装了底层的通信细节（可以是tcp、http、websocket等等）和任务分配，只需要用异步的方式去调用<code>worker</code>提供的方法即可，通过这个我们可以轻而易举地做到分布式计算的<code>map</code>和<code>reduce</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rpcManager.create(workers => {
    //首先定义一个promise化的add
    var add = function(x, y){
        return new Promise((resolve, reject)=>{
            workers.add(x, y, result => resolve(result));
        })
    }
    //map&amp;reduce
    Promise.all([add(1,2), add(3,4), add(4,5)])
        .then(result => result.reduce((x, y) => x + y))
        .then(sum => console.log(sum)) //19
}, 8124)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">rpcManager.create(<span class="hljs-function"><span class="hljs-params">workers</span> =&gt;</span> {
    <span class="hljs-comment">//首先定义一个promise化的add</span>
    <span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x, y</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
            workers.add(x, y, result =&gt; resolve(result));
        })
    }
    <span class="hljs-comment">//map&amp;reduce</span>
    <span class="hljs-built_in">Promise</span>.all([add(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>), add(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>), add(<span class="hljs-number">4</span>,<span class="hljs-number">5</span>)])
        .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.reduce(<span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> x + y))
        .then(<span class="hljs-function"><span class="hljs-params">sum</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(sum)) <span class="hljs-comment">//19</span>
}, <span class="hljs-number">8124</span>)</code></pre>
<p>如果我们有三个已经注册的<code>Worker</code>（可能是本地的另一个nodejs进程、某个设备上的浏览器、另一个机器上的nodejs），那么我们这里会分别在这三个机器上分别计算三个<code>add</code>，并且将三个结果在本地相加，得到最后的值，这就是分布式计算的基础。</p>
<h2 id="articleHeader1">二、Manager的实现</h2>
<h3 id="articleHeader2">0、通信标准</h3>
<p>要实现双向的通信，我们首先要定义这样一个“远程调用”的通信标准，在我的实现中比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    [id]: uuid          //在某些通信中需要唯一标识码
    message: '......'   //消息类别
    body: ......        //携带的数据
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    [id]: uuid          <span class="hljs-comment">//在某些通信中需要唯一标识码</span>
    message: <span class="hljs-string">'......'</span>   <span class="hljs-comment">//消息类别</span>
    body: ......        <span class="hljs-comment">//携带的数据</span>
}</code></pre>
<h3 id="articleHeader3">1、初始化</h3>
<p>首先我们要解决的问题是，如何让<code>Manager</code>知道<code>Worker</code>提供了哪些方法可供调用？</p>
<p>这个问题其实很简单，只要在 websocket 建立的时刻发送一个<code>init</code>消息就可以了，<code>init</code>消息大概长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    message: 'init',
    body: ['add', 'multiply'] //body是方法名组成的数组
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">message</span>: <span class="hljs-string">'init'</span>,
    <span class="hljs-attr">body</span>: [<span class="hljs-string">'add'</span>, <span class="hljs-string">'multiply'</span>] <span class="hljs-comment">//body是方法名组成的数组</span>
}</code></pre>
<p>同时，我们要将<code>Manager</code>传入的回调函数，记录到<code>Manager.__workersStaticCallback</code>中，以便延迟调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="manager.create(callback, port) //记录下这个callback

//一段时间后。。。。。。

manager.start() //任务开始" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">manager.create(callback, port) <span class="hljs-comment">//记录下这个callback</span>

<span class="hljs-comment">//一段时间后。。。。。。</span>

manager.start() <span class="hljs-comment">//任务开始</span></code></pre>
<h3 id="articleHeader4">2、生成workers实例</h3>
<p>现在我们的<code>Manager</code>收到了一个远程可调用的方法名组成的数组，我们接下来需要在<code>Manager</code>中生成一个<code>workers</code>实例，它应该包含所有这些方法名，但底层依然是调用一个webpack通信。这里我们可以用类似元编程的奇技淫巧，下面的是部分代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//收到worker发来的init消息之后
var workers = {
    __send: this.__send.bind(this), //这个this指向Manager，而不是自己
    __functionCall: this.__functionCall.bind(this) //同上
};
var funcNames = data.body; //比如['add', 'multiply']
funcNames.forEach(funcName => {
    //使用new Function的奇技淫巧
    rpc[funcName] = new Function(`
        //截取参数
        var params = Array.prototype.slice.call(arguments,0,arguments.length-1);
        var callback = arguments[arguments.length-1];
        
        //这个__functionCall调用了Manager底层的通信，具体在后面解释
        this.__functionCall('${funcName}',params,callback);
    `)
})
//将workers注册到Manager内部
this.__workers = workers;
//如果此时Manager已经在等待开始了，那么开始任务
if (this.__waitingForInit) {
    this.start();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//收到worker发来的init消息之后</span>
<span class="hljs-keyword">var</span> workers = {
    <span class="hljs-attr">__send</span>: <span class="hljs-keyword">this</span>.__send.bind(<span class="hljs-keyword">this</span>), <span class="hljs-comment">//这个this指向Manager，而不是自己</span>
    __functionCall: <span class="hljs-keyword">this</span>.__functionCall.bind(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//同上</span>
};
<span class="hljs-keyword">var</span> funcNames = data.body; <span class="hljs-comment">//比如['add', 'multiply']</span>
funcNames.forEach(<span class="hljs-function"><span class="hljs-params">funcName</span> =&gt;</span> {
    <span class="hljs-comment">//使用new Function的奇技淫巧</span>
    rpc[funcName] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">`
        //截取参数
        var params = Array.prototype.slice.call(arguments,0,arguments.length-1);
        var callback = arguments[arguments.length-1];
        
        //这个__functionCall调用了Manager底层的通信，具体在后面解释
        this.__functionCall('<span class="hljs-subst">${funcName}</span>',params,callback);
    `</span>)
})
<span class="hljs-comment">//将workers注册到Manager内部</span>
<span class="hljs-keyword">this</span>.__workers = workers;
<span class="hljs-comment">//如果此时Manager已经在等待开始了，那么开始任务</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.__waitingForInit) {
    <span class="hljs-keyword">this</span>.start();
}</code></pre>
<p>还记得上面我们有个<code>start</code>方法么？它是这样写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start: function() {
    if (this.__workers != undefined) {
        //如果初始化完毕，workers实例存在
        this.__workersStaticCallback(this.__workers);
        this.__waitingForInit = false;
    } else {
        //否则将等待初始化完毕
        this.__waitingForInit = true;
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">start: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.__workers != <span class="hljs-literal">undefined</span>) {
        <span class="hljs-comment">//如果初始化完毕，workers实例存在</span>
        <span class="hljs-keyword">this</span>.__workersStaticCallback(<span class="hljs-keyword">this</span>.__workers);
        <span class="hljs-keyword">this</span>.__waitingForInit = <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//否则将等待初始化完毕</span>
        <span class="hljs-keyword">this</span>.__waitingForInit = <span class="hljs-literal">true</span>;
    }
},</code></pre>
<h3 id="articleHeader5">3、序列化</h3>
<p>如果只是单个<code>Worker</code>和单个<code>Manager</code>，并且远程方法都是同步而非异步的，那么我们显然不需要考虑返回值顺序的问题：</p>
<p>比如我们的<code>Manager</code>调用了下面一堆方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="workers.add(1, 1, callback);
workers.add(2, 2, callback);
workers.add(3, 3, callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">workers.add(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, callback);
workers.add(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, callback);
workers.add(<span class="hljs-number">3</span>, <span class="hljs-number">3</span>, callback);</code></pre>
<p>由于<code>Worker</code>中<code>add</code>的是同步的方法，那么显然我们收到返回值的顺序是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2
4
6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">2</span>
<span class="hljs-number">4</span>
<span class="hljs-number">6</span></code></pre>
<p>但如果<code>Worker</code>中存在一个异步调用，那么这个顺序就会被打乱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="workers.readFile('xxx', callback);
workers.add(1, 1, callback);
workers.add(2, 2, callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>workers.readFile(<span class="hljs-string">'xxx'</span>, callback)<span class="hljs-comment">;</span>
workers.<span class="hljs-keyword">add(1, </span><span class="hljs-number">1</span>, callback)<span class="hljs-comment">;</span>
workers.<span class="hljs-keyword">add(2, </span><span class="hljs-number">2</span>, callback)<span class="hljs-comment">;</span></code></pre>
<p>显然我们收到的返回值顺序是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2
4
content of xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">2</span>
<span class="hljs-number">4</span>
content of xxx</code></pre>
<p>所以这里就需要对发出的函数调用做一个序列化，具体的方法就是对于每一个调用都给一个uuid（唯一标识码）。</p>
<p>比如我们调用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="workers.add(1, 1, stupid_callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">workers.add(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, stupid_callback);</code></pre>
<p>那么首先<code>Manager</code>会对这个调用生成一个 uuid ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9557881b-25d7-4c94-84c8-2463c53b67f4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">9557881</span>b<span class="hljs-number">-25</span>d7<span class="hljs-number">-4</span>c94<span class="hljs-number">-84</span>c8<span class="hljs-number">-2463</span>c53b67f4</code></pre>
<p>然后在<code>__callbackStore</code>中将这个 uuid 和<code>stupid_callback </code>绑定，然后向选中的某个<code>Worker</code>发送函数调用信息（具体怎么选<code>Worker</code>我们后面再说）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    id: '9557881b-25d7-4c94-84c8-2463c53b67f4',
    message: 'function call',
    body: { 
        funcName: 'add', 
        params: [1, 1] 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">id</span>: <span class="hljs-string">'9557881b-25d7-4c94-84c8-2463c53b67f4'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'function call'</span>,
    <span class="hljs-attr">body</span>: { 
        <span class="hljs-attr">funcName</span>: <span class="hljs-string">'add'</span>, 
        <span class="hljs-attr">params</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>] 
    }
}</code></pre>
<p><code>Worker</code>执行这个函数之后，发送回来一个函数返回值的信息体，大概是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    id: '9557881b-25d7-4c94-84c8-2463c53b67f4',
    message: 'function call',
    body: { 
        result: 2 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">id</span>: <span class="hljs-string">'9557881b-25d7-4c94-84c8-2463c53b67f4'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'function call'</span>,
    <span class="hljs-attr">body</span>: { 
        <span class="hljs-attr">result</span>: <span class="hljs-number">2</span> 
    }
}</code></pre>
<p>然后我们就可以在<code>__callbackStore</code>中找到这个 uuid 对应的 callback ，并且执行它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.__callbackStore[id](result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.__callbackStore[id](result);</code></pre>
<p>这就是<code>workers.add(1, 1, stupid_callback)</code>这行代码背后的原理。</p>
<h3 id="articleHeader6">4、任务分配</h3>
<p>如果存在多个<code>Worker</code>，显然我们不能把所有的调用都傻傻地发送到第一个<code>Worker</code>身上，所以这里就需要有一个任务分配机制，我的机制比较简单，大概说就是在一张表里对每个<code>Worker</code>记录下它是否繁忙的状态，每次当有调用需求的时候，先遍历这张表，</p>
<ol>
<li><p>如果找到有空闲的<code>Worker</code>，那么就将对它发送调用；</p></li>
<li><p>如果所有<code>Worker</code>都繁忙，那么先把这个调用暂存在一个队列之中；</p></li>
<li><p>当收到某个<code>Worker</code>的返回值后，会检查队列中是否有任务，有的话，那么就对这个<code>Worker</code>发送最前的函数调用，若没有，就把这个<code>Worker</code>设为空闲状态。</p></li>
</ol>
<p>具体任务分配的代码比较冗余，分散在各个方法内，所以只介绍方法，就不贴上来了/w\</p>
<p>全部的Manager代码在这里（抱歉还没时间补注释）：</p>
<p><a href="https://github.com/starkwang/Maus/blob/master/src/manager.js" rel="nofollow noreferrer" target="_blank">Maus/manager.js at master · starkwang/Maus</a></p>
<h2 id="articleHeader7">三、Worker的实现</h2>
<p>这里要再说一遍，我们的RPC框架是基于websocket的，所以<code>Worker</code>可以是一个PC浏览器！！！可以是一个手机浏览器！！！可以是一个平板浏览器！！！</p>
<p><code>Worker</code>的实现远比<code>Manager</code>简单，因为它只需要对唯一一个<code>Manager</code>通信，它的逻辑只有：</p>
<ol>
<li><p>接收<code>Manager</code>发来的数据；</p></li>
<li><p>根据数据做出相应的反应（函数调用、初始化等等）；</p></li>
<li><p>发送返回值</p></li>
</ol>
<p>所以我们也不放代码了，有兴趣的可以看这里：</p>
<p><a href="https://github.com/starkwang/Maus/blob/master/src/worker.js" rel="nofollow noreferrer" target="_blank">Maus/worker.js at master · starkwang/Maus</a></p>
<h2 id="articleHeader8">四、写一个分布式算法</h2>
<p>假设我们的加法是通过这个框架异步调用的，那么我们该怎么写算法呢？</p>
<p>在单机情况下，写个斐波拉契数列简直跟喝水一样简单（事实上这种暴力递归的写法非常非常傻逼且性能低下，只是作为范例演示用）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fib = x => x>1 ? fib(x-1)+fib(x-2) : x" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> fib = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x&gt;<span class="hljs-number">1</span> ? fib(x<span class="hljs-number">-1</span>)+fib(x<span class="hljs-number">-2</span>) : x</code></pre>
<p>但是在分布式环境下，我们要将<code>workers.add</code>方法封装成一个Promise化的<code>add</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这里的x, y可能是数字，也可能是个Promise，所以要先调用Promise.all
var add = function(x, y){
    return Promise.all([x, y])
        .then(arr => new Promise((resolve, reject) => {
            workers.add(arr[0], arr[1], result => resolve(result));
        }))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//这里的x, y可能是数字，也可能是个Promise，所以要先调用Promise.all</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x, y</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all([x, y])
        .then(<span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            workers.add(arr[<span class="hljs-number">0</span>], arr[<span class="hljs-number">1</span>], result =&gt; resolve(result));
        }))
}</code></pre>
<p>然后我们就可以用类似同步的递归方法这样写一个分布式的<code>fib</code>算法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fib = x => x>1 ? add(fib(x-1), fib(x-2)) : x;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> fib = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x&gt;<span class="hljs-number">1</span> ? add(fib(x<span class="hljs-number">-1</span>), fib(x<span class="hljs-number">-2</span>)) : x;</code></pre>
<p>然后你可以尝试用你的电脑里、树莓派里、服务器里的nodejs、手机平板上的浏览器作为一个<code>Worker</code>，总之集合所有的计算能力，一起来计算这个傻傻的算法（事实上相比于单机算法会慢很多很多，因为通信上的延迟远大于单机的加法计算，但只是为了演示啦）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//分布式计算fib(40)
fib(40).then(result => console.log(result));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//分布式计算fib(40)</span>
fib(<span class="hljs-number">40</span>).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(result));</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个浏览器和NodeJS通用的RPC框架

## 原文链接
[https://segmentfault.com/a/1190000005102984](https://segmentfault.com/a/1190000005102984)


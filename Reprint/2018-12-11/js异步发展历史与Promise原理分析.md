---
title: 'js异步发展历史与Promise原理分析' 
date: 2018-12-11 2:30:10
hidden: true
slug: 9yfpur7jjm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于异步</h2>
<p>所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。</p>
<p>比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步。</p>
<p>相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着。</p>
<p>简单的说同步就是大家排队工作，异步就是大家同时工作。如果你还不太明白异步与同步，多看看JS基础的文章。</p>
<h2 id="articleHeader1">异步的发展历史</h2>
<h3 id="articleHeader2">1.CallBack写法</h3>
<p>CallBack意为“回调函数”，即异步操作执行完后触发执行的函数，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get(&quot;http://api.xxxx.com/xxx&quot;,callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">$.<span class="hljs-keyword">get</span>(<span class="hljs-string">"http://api.xxxx.com/xxx"</span>,<span class="hljs-keyword">callback</span>);</code></pre>
<p>当请求完成时就会触发callback函数。</p>
<p>callback可以完成异步操作，但是经历过JQuery时代的人应该都对某一种需求折磨过，举个例子：项目要求前端ajax请求后端接口列表类型名称，然后在用类型名称ajax请求列表id，在用id请求列表具体内容，最后代码大概是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    url: &quot;type&quot;,
    data:1,
    success: function (a) {
        $.ajax({
            url: &quot;list&quot;,
            data:a,
            success: function (b) {
                $.ajax({
                    url: &quot;content&quot;,
                    data:b,
                    success: function (c) {
                        console.log(c)
                    }
                })
            }
        })
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>$.ajax({
    ur<span class="hljs-variable">l:</span> <span class="hljs-string">"type"</span>,
    dat<span class="hljs-variable">a:1</span>,
    succes<span class="hljs-variable">s:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a)</span> {</span>
        $.ajax({
            ur<span class="hljs-variable">l:</span> <span class="hljs-string">"list"</span>,
            dat<span class="hljs-variable">a:a</span>,
            succes<span class="hljs-variable">s:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(b)</span> {</span>
                $.ajax({
                    ur<span class="hljs-variable">l:</span> <span class="hljs-string">"content"</span>,
                    dat<span class="hljs-variable">a:b</span>,
                    succes<span class="hljs-variable">s:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(c)</span> {</span>
                        console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">c</span>)
                    }
                })
            }
        })
    }
})</code></pre>
<p>这是是单纯的嵌套代码，如若再加上业务代码，代码可读性可想而知，如果是开发起来还好，但是后期的维护和修改的难度足以让人疯掉。这就是那个JQuery时代的“回调地狱”问题。</p>
<h3 id="articleHeader3">2.Promise</h3>
<p>为了解决“回调地狱”问题，提出了Promise对象，并且后来加入了ES6标准，Promise对象简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-comment">// ... some code</span>

  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 异步操作成功 */</span>){
    resolve(value);
  } <span class="hljs-keyword">else</span> {
    reject(error);
  }
});</code></pre>
<p>Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。</p>
<p>resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。</p>
<p>Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then(function(value) {
  // success
}, function(error) {
  // failure
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> {</span>
  <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span> {</span>
  <span class="hljs-comment">// failure</span>
});</code></pre>
<p>then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。</p>
<p>这样采用 Promise，解决“回调地狱”问题，比如连续读取多个文件，写法如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>var readFile = require(<span class="hljs-string">'fs-readfile-promise'</span>);

readFile(fileA)
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
  console.<span class="hljs-built_in">log</span>(data.toString());
})
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
  <span class="hljs-keyword">return</span> readFile(fileB);
})
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
  console.<span class="hljs-built_in">log</span>(data.toString());
})
.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> {</span>
  console.<span class="hljs-built_in">log</span>(err);
});</code></pre>
<p>可见这种写法要比CallBack写法直观的多。但是，有没有更好的写法呢？</p>
<h3 id="articleHeader4">3.Generator 函数</h3>
<p>Genrator 函数要用* 来比标识，yield关键字表示暂停。将函数分割出好多个部分，调用一次next就会继续向下执行。返回结果是一个迭代器，迭代器有一个next方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* read() {
    console.log(1);
    let a = yield '123';
    console.log(a);
    let b = yield 9
    console.log(b);
    return b;
}
let it = read();
console.log(it.next('213')); // {value:'123',done:false}
console.log(it.next('100')); // {value:9,done:false}
console.log(it.next('200')); // {value:200,done:true}
console.log(it.next('200')); // {value:200,done:true}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">read</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">yield</span> <span class="hljs-string">'123'</span>;
    <span class="hljs-built_in">console</span>.log(a);
    <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">yield</span> <span class="hljs-number">9</span>
    <span class="hljs-built_in">console</span>.log(b);
    <span class="hljs-keyword">return</span> b;
}
<span class="hljs-keyword">let</span> it = read();
<span class="hljs-built_in">console</span>.log(it.next(<span class="hljs-string">'213'</span>)); <span class="hljs-comment">// {value:'123',done:false}</span>
<span class="hljs-built_in">console</span>.log(it.next(<span class="hljs-string">'100'</span>)); <span class="hljs-comment">// {value:9,done:false}</span>
<span class="hljs-built_in">console</span>.log(it.next(<span class="hljs-string">'200'</span>)); <span class="hljs-comment">// {value:200,done:true}</span>
<span class="hljs-built_in">console</span>.log(it.next(<span class="hljs-string">'200'</span>)); <span class="hljs-comment">// {value:200,done:true}</span></code></pre>
<p>yield后面跟着的是value的值，yield等号前面的是我们当前调用next传进来的值，并且第一次next传值是无效的。</p>
<p>处理异步的时候Generator和Promise搭配使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let bluebird = require('bluebird');
let fs = require('fs');
let read = bluebird.promisify(fs.readFile);//将readFile转为Promise对象的实例
function* r() {
    let content1 = yield read('./2.promise/1.txt', 'utf8');
    let content2 = yield read(content1, 'utf8');
    return content2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> bluebird = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bluebird'</span>);
<span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> read = bluebird.promisify(fs.readFile);<span class="hljs-comment">//将readFile转为Promise对象的实例</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">r</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> content1 = <span class="hljs-keyword">yield</span> read(<span class="hljs-string">'./2.promise/1.txt'</span>, <span class="hljs-string">'utf8'</span>);
    <span class="hljs-keyword">let</span> content2 = <span class="hljs-keyword">yield</span> read(content1, <span class="hljs-string">'utf8'</span>);
    <span class="hljs-keyword">return</span> content2;
}</code></pre>
<p>这样看起来是我们想要的样子,但是只写成这样还不行，想得到r()的结果还要对函数进行处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function co(it) {
    return new Promise(function (resolve, reject) {
        function next(d) {
            let { value, done } = it.next(d);
            if (!done) {
                value.then(function (data) { // 2,txt
                    next(data)
                }, reject)
            } else {
                resolve(value);
            }
        }
        next();
    });
}
co(r()).then(function (data) {
    console.log(data)//得到r()的执行结果
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">it</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">d</span>) </span>{
            <span class="hljs-keyword">let</span> { value, done } = it.next(d);
            <span class="hljs-keyword">if</span> (!done) {
                value.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{ <span class="hljs-comment">// 2,txt</span>
                    next(data)
                }, reject)
            } <span class="hljs-keyword">else</span> {
                resolve(value);
            }
        }
        next();
    });
}
co(r()).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data)<span class="hljs-comment">//得到r()的执行结果</span>
})</code></pre>
<p>这样的处理方式显然很麻烦，并不是我们想要，我们想要直观的写起来就就像同步函数，而且简便的方式处理异步。有这样的方法吗？</p>
<h3 id="articleHeader5">4.async-await函数</h3>
<p>ES2017 标准引入了 async 函数，使得异步操作变得更加方便。</p>
<p>async 函数是什么？一句话，它就是 Generator 函数的语法糖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let bluebird = require('bluebird');
let fs = require('fs');
let read = bluebird.promisify(fs.readFile);

async function r(){
    try{
        let content1 = await read('./2.promise/100.txt','utf8');
        let content2 = await read(content1,'utf8');
        return content2;
    }catch(e){ // 如果出错会catch
        console.log('err',e)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> bluebird = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bluebird'</span>);
<span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> read = bluebird.promisify(fs.readFile);

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">r</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">try</span>{
        <span class="hljs-keyword">let</span> content1 = <span class="hljs-keyword">await</span> read(<span class="hljs-string">'./2.promise/100.txt'</span>,<span class="hljs-string">'utf8'</span>);
        <span class="hljs-keyword">let</span> content2 = <span class="hljs-keyword">await</span> read(content1,<span class="hljs-string">'utf8'</span>);
        <span class="hljs-keyword">return</span> content2;
    }<span class="hljs-keyword">catch</span>(e){ <span class="hljs-comment">// 如果出错会catch</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err'</span>,e)
    }
}</code></pre>
<p>一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。</p>
<p>async函数返回的是promise</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="r().then(function(data){
    console.log(data);
},function(err){

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>r().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>);
},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span>{

})</code></pre>
<p>至此，async-await函数已经可以我们满意，以后会不会出现更优秀的方案？以我们广大程序群体的创造力，相信一定会有的。</p>
<h2 id="articleHeader6">Promise原理分析</h2>
<p>async-await函数其实只是Generator函数的语法糖，而Generator函数的实现方式也是要基于Promise，所以我们队Promise的实现原理进行分析。</p>
<p>Promise对象有以下几种状态:</p>
<ul>
<li>pending: 初始状态, 既不是 fulfilled 也不是 rejected.</li>
<li>fulfilled: 成功的操作.</li>
<li>rejected: 失败的操作.</li>
</ul>
<p>在上面了解了Promise的基本用法后，我们先将Promise的框架搭起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(executor) { // executor是一个执行函数
    let self = this;
    self.status = 'pending';
    self.value = undefined; // 默认成功的值
    self.reason = undefined; // 默认失败的原因
    self.onResolvedCallbacks = []; // 存放then成功的回调
    self.onRejectedCallbacks = []; // 存放then失败的回调
    function resolve(value) { // 成功状态
        
    }
    function reject(reason) { // 失败状态
        
    }
    try {
        executor(resolve, reject)
    } catch (e) { // 捕获的时候发生异常,就直接失败了
        reject(e);
    }
}

Promise.prototype.then = function (onFulfilled, onRjected) {
//then方法
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span><span class="hljs-params">(executor)</span> </span>{ <span class="hljs-comment">// executor是一个执行函数</span>
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">self</span>.status = <span class="hljs-string">'pending'</span>;
    <span class="hljs-keyword">self</span>.value = undefined; <span class="hljs-comment">// 默认成功的值</span>
    <span class="hljs-keyword">self</span>.reason = undefined; <span class="hljs-comment">// 默认失败的原因</span>
    <span class="hljs-keyword">self</span>.onResolvedCallbacks = []; <span class="hljs-comment">// 存放then成功的回调</span>
    <span class="hljs-keyword">self</span>.onRejectedCallbacks = []; <span class="hljs-comment">// 存放then失败的回调</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span><span class="hljs-params">(value)</span> </span>{ <span class="hljs-comment">// 成功状态</span>
        
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span><span class="hljs-params">(reason)</span> </span>{ <span class="hljs-comment">// 失败状态</span>
        
    }
    <span class="hljs-keyword">try</span> {
        executor(resolve, reject)
    } <span class="hljs-keyword">catch</span> (e) { <span class="hljs-comment">// 捕获的时候发生异常,就直接失败了</span>
        reject(e);
    }
}

Promise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(onFulfilled, onRjected)</span> </span>{
<span class="hljs-comment">//then方法</span>
})</code></pre>
<p>接下来当调用成功状态resolve的时候，会改变状态，执行回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(value) { // 成功状态
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
            self.onResolvedCallbacks.forEach(function (fn) {
                fn();
            });
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span><span class="hljs-params">(value)</span> </span>{ <span class="hljs-comment">// 成功状态</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'pending'</span>) {
            <span class="hljs-keyword">self</span>.status = <span class="hljs-string">'resolved'</span>;
            <span class="hljs-keyword">self</span>.value = value;
            <span class="hljs-keyword">self</span>.onResolvedCallbacks.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(fn)</span> </span>{
                fn();
            });
        }
    }</code></pre>
<p>reject函数同理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function reject(reason) { // 失败状态
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span><span class="hljs-params">(reason)</span> </span>{ <span class="hljs-comment">// 失败状态</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'pending'</span>) {
            <span class="hljs-keyword">self</span>.status = <span class="hljs-string">'rejected'</span>;
            <span class="hljs-keyword">self</span>.reason = reason;
            <span class="hljs-keyword">self</span>.onRejectedCallbacks.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(fn)</span> </span>{
                fn();
            })
        }
    }</code></pre>
<p>接下来我们完成then函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.then = function (onFulfilled, onRjected) {
    let self = this;
    let promise2; //返回的promise
    if (self.status === 'resolved') {
        promise2 = new Promise(function (resolve, reject) {
            
        })
    }
    if (self.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            
        })
    }
    // 当调用then时可能没成功 也没失败
    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {

        })
    }
    return promise2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled, onRjected</span>) </span>{
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> promise2; <span class="hljs-comment">//返回的promise</span>
    <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'resolved'</span>) {
        promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
            
        })
    }
    <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'rejected'</span>) {
        promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
            
        })
    }
    <span class="hljs-comment">// 当调用then时可能没成功 也没失败</span>
    <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
        promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{

        })
    }
    <span class="hljs-keyword">return</span> promise2;
}</code></pre>
<p>Promise允许链式调用，所以要返回一个新的Promise对象promise2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.then = function (onFulfilled, onRjected) {
    //成功和失败默认不穿给一个函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
    }
    onRjected = typeof onRjected === 'function' ? onRjected : function (err) {
        throw err;
    }
    let self = this;
    let promise2; //返回的promise
    if (self.status === 'resolved') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onFulfilled(self.value);
                    // x可能是别人promise，写一个方法统一处理
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }
    if (self.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRjected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    
                    reject(e);
                }
            })

        })
    }
    // 当调用then时可能没成功 也没失败
    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {
            // 此时没有resolve 也没有reject
            self.onResolvedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                })
            });
            self.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRjected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            });
        })
    }
    return promise2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code>Promise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(onFulfilled, onRjected)</span> </span>{
    <span class="hljs-comment">//成功和失败默认不穿给一个函数</span>
    onFulfilled = typeof onFulfilled === <span class="hljs-string">'function'</span> ? onFulfilled : <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
        <span class="hljs-keyword">return</span> value;
    }
    onRjected = typeof onRjected === <span class="hljs-string">'function'</span> ? onRjected : <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> </span>{
        <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">let</span> promise2; <span class="hljs-comment">//返回的promise</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'resolved'</span>) {
        promise2 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">let</span> x = onFulfilled(<span class="hljs-keyword">self</span>.value);
                    <span class="hljs-comment">// x可能是别人promise，写一个方法统一处理</span>
                    resolvePromise(promise2, x, resolve, reject);
                } <span class="hljs-keyword">catch</span> (e) {
                    reject(e);
                }
            })
        })
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'rejected'</span>) {
        promise2 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">let</span> x = onRjected(<span class="hljs-keyword">self</span>.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } <span class="hljs-keyword">catch</span> (e) {
                    
                    reject(e);
                }
            })

        })
    }
    <span class="hljs-comment">// 当调用then时可能没成功 也没失败</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'pending'</span>) {
        promise2 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
            <span class="hljs-comment">// 此时没有resolve 也没有reject</span>
            <span class="hljs-keyword">self</span>.onResolvedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">try</span> {
                        <span class="hljs-keyword">let</span> x = onFulfilled(<span class="hljs-keyword">self</span>.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } <span class="hljs-keyword">catch</span> (e) {
                        reject(e)
                    }
                })
            });
            <span class="hljs-keyword">self</span>.onRejectedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">try</span> {
                        <span class="hljs-keyword">let</span> x = onRjected(<span class="hljs-keyword">self</span>.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } <span class="hljs-keyword">catch</span> (e) {
                        reject(e);
                    }
                })
            });
        })
    }
    <span class="hljs-keyword">return</span> promise2;
}</code></pre>
<p>在promise2内部定义一个变量x为回调函数的返回值，由于返回值可能会有多种可能的情况，所以我们定义一个resolvePromise函数统一处理</p>
<p>返回值可以分为</p>
<ul>
<li>promise返回自己   （报错循环引用）</li>
<li>返回promise对象   （根据promise对象调用成功或失败回调函数）</li>
<li>返回普通值        （调用成功回调函数传入返回值）</li>
<li>报错              （调用失败回到传入错误）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { 
        return reject(new TypeError('循环引用了'))
    }
    // 判定x是不是一个promise,promise应该是一个对象
    let called; // 表示是否调用过成功或者失败
    if (x !== null &amp;&amp; (typeof x === 'object' || typeof x === 'function')) {
        try { // {then:1}
            let then = x.then;
            if (typeof then === 'function') {
                // 成功
                then.call(x, function (y) {
                    if (called) return
                    called = true
                    // y可能还是一个promise，在去解析直到返回的是一个普通值
                    resolvePromise(promise2, y, resolve, reject)
                }, function (err) { //失败
                    if (called) return
                    called = true
                    reject(err);
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true;
            reject(e);
        }
    } else { // 说明是一个普通值
        resolve(x); // 调用成功回调
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolvePromise</span>(<span class="hljs-params">promise2, x, resolve, reject</span>) </span>{
    <span class="hljs-keyword">if</span> (promise2 === x) { 
        <span class="hljs-keyword">return</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'循环引用了'</span>))
    }
    <span class="hljs-comment">// 判定x是不是一个promise,promise应该是一个对象</span>
    <span class="hljs-keyword">let</span> called; <span class="hljs-comment">// 表示是否调用过成功或者失败</span>
    <span class="hljs-keyword">if</span> (x !== <span class="hljs-literal">null</span> &amp;&amp; (<span class="hljs-keyword">typeof</span> x === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> x === <span class="hljs-string">'function'</span>)) {
        <span class="hljs-keyword">try</span> { <span class="hljs-comment">// {then:1}</span>
            <span class="hljs-keyword">let</span> then = x.then;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">'function'</span>) {
                <span class="hljs-comment">// 成功</span>
                then.call(x, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">y</span>) </span>{
                    <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>
                    called = <span class="hljs-literal">true</span>
                    <span class="hljs-comment">// y可能还是一个promise，在去解析直到返回的是一个普通值</span>
                    resolvePromise(promise2, y, resolve, reject)
                }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{ <span class="hljs-comment">//失败</span>
                    <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>
                    called = <span class="hljs-literal">true</span>
                    reject(err);
                })
            } <span class="hljs-keyword">else</span> {
                resolve(x)
            }
        } <span class="hljs-keyword">catch</span> (e) {
            <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>
            called = <span class="hljs-literal">true</span>;
            reject(e);
        }
    } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 说明是一个普通值</span>
        resolve(x); <span class="hljs-comment">// 调用成功回调</span>
    }
}</code></pre>
<p>如果返回值为对象或函数，且有then方法，那我们就认为是一个promise对象，去调用这个promise进行递归，直到返回普通值调用成功回调。</p>
<p>最后，再加上一个catch方法，很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.catch = function (callback) {
    return this.then(null, callback)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>Promise.prototype.<span class="hljs-keyword">catch</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(<span class="hljs-keyword">callback</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>.then(<span class="hljs-literal">null</span>, <span class="hljs-keyword">callback</span>)
}</code></pre>
<p>这些就是promise的主要功能的原理，附上完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(executor) { // executor是一个执行函数
    let self = this;
    self.status = 'pending';
    self.value = undefined; // 默认成功的值
    self.reason = undefined; // 默认失败的原因
    self.onResolvedCallbacks = []; // 存放then成功的回调
    self.onRejectedCallbacks = []; // 存放then失败的回调
    function resolve(value) { // 成功状态
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
            self.onResolvedCallbacks.forEach(function (fn) {
                fn();
            });
        }
    }
    function reject(reason) { // 失败状态
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }
    try {
        executor(resolve, reject)
    } catch (e) { 
        reject(e);
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { 
        return reject(new TypeError('循环引用了'))
    }
    let called; 
    if (x !== null &amp;&amp; (typeof x === 'object' || typeof x === 'function')) {
        try { 
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, function (err) { //失败
                    if (called) return
                    called = true
                    reject(err);
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true;
            reject(e);
        }
    } else { 
        resolve(x); 
    }
}
Promise.prototype.then = function (onFulfilled, onRjected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
    }
    onRjected = typeof onRjected === 'function' ? onRjected : function (err) {
        throw err;
    }
    let self = this;
    let promise2; 
    if (self.status === 'resolved') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }
    if (self.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRjected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    
                    reject(e);
                }
            })

        })
    }

    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                })
            });
            self.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRjected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            });
        })
    }
    return promise2;
}

Promise.prototype.catch = function (callback) {
    return this.then(null, callback)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span><span class="hljs-params">(executor)</span> </span>{ <span class="hljs-comment">// executor是一个执行函数</span>
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">self</span>.status = <span class="hljs-string">'pending'</span>;
    <span class="hljs-keyword">self</span>.value = undefined; <span class="hljs-comment">// 默认成功的值</span>
    <span class="hljs-keyword">self</span>.reason = undefined; <span class="hljs-comment">// 默认失败的原因</span>
    <span class="hljs-keyword">self</span>.onResolvedCallbacks = []; <span class="hljs-comment">// 存放then成功的回调</span>
    <span class="hljs-keyword">self</span>.onRejectedCallbacks = []; <span class="hljs-comment">// 存放then失败的回调</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span><span class="hljs-params">(value)</span> </span>{ <span class="hljs-comment">// 成功状态</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'pending'</span>) {
            <span class="hljs-keyword">self</span>.status = <span class="hljs-string">'resolved'</span>;
            <span class="hljs-keyword">self</span>.value = value;
            <span class="hljs-keyword">self</span>.onResolvedCallbacks.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(fn)</span> </span>{
                fn();
            });
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span><span class="hljs-params">(reason)</span> </span>{ <span class="hljs-comment">// 失败状态</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'pending'</span>) {
            <span class="hljs-keyword">self</span>.status = <span class="hljs-string">'rejected'</span>;
            <span class="hljs-keyword">self</span>.reason = reason;
            <span class="hljs-keyword">self</span>.onRejectedCallbacks.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(fn)</span> </span>{
                fn();
            })
        }
    }
    <span class="hljs-keyword">try</span> {
        executor(resolve, reject)
    } <span class="hljs-keyword">catch</span> (e) { 
        reject(e);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolvePromise</span><span class="hljs-params">(promise2, x, resolve, reject)</span> </span>{
    <span class="hljs-keyword">if</span> (promise2 === x) { 
        <span class="hljs-keyword">return</span> reject(<span class="hljs-keyword">new</span> TypeError(<span class="hljs-string">'循环引用了'</span>))
    }
    <span class="hljs-keyword">let</span> called; 
    <span class="hljs-keyword">if</span> (x !== <span class="hljs-keyword">null</span> &amp;&amp; (typeof x === <span class="hljs-string">'object'</span> || typeof x === <span class="hljs-string">'function'</span>)) {
        <span class="hljs-keyword">try</span> { 
            <span class="hljs-keyword">let</span> then = x.then;
            <span class="hljs-keyword">if</span> (typeof then === <span class="hljs-string">'function'</span>) {
                then.call(x, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(y)</span> </span>{
                    <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>
                    called = <span class="hljs-keyword">true</span>
                    resolvePromise(promise2, y, resolve, reject)
                }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> </span>{ <span class="hljs-comment">//失败</span>
                    <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>
                    called = <span class="hljs-keyword">true</span>
                    reject(err);
                })
            } <span class="hljs-keyword">else</span> {
                resolve(x)
            }
        } <span class="hljs-keyword">catch</span> (e) {
            <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>
            called = <span class="hljs-keyword">true</span>;
            reject(e);
        }
    } <span class="hljs-keyword">else</span> { 
        resolve(x); 
    }
}
Promise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(onFulfilled, onRjected)</span> </span>{
    onFulfilled = typeof onFulfilled === <span class="hljs-string">'function'</span> ? onFulfilled : <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
        <span class="hljs-keyword">return</span> value;
    }
    onRjected = typeof onRjected === <span class="hljs-string">'function'</span> ? onRjected : <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> </span>{
        <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">let</span> promise2; 
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'resolved'</span>) {
        promise2 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">let</span> x = onFulfilled(<span class="hljs-keyword">self</span>.value);
                    resolvePromise(promise2, x, resolve, reject);
                } <span class="hljs-keyword">catch</span> (e) {
                    reject(e);
                }
            })
        })
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'rejected'</span>) {
        promise2 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">let</span> x = onRjected(<span class="hljs-keyword">self</span>.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } <span class="hljs-keyword">catch</span> (e) {
                    
                    reject(e);
                }
            })

        })
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.status === <span class="hljs-string">'pending'</span>) {
        promise2 = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
            <span class="hljs-keyword">self</span>.onResolvedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">try</span> {
                        <span class="hljs-keyword">let</span> x = onFulfilled(<span class="hljs-keyword">self</span>.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } <span class="hljs-keyword">catch</span> (e) {
                        reject(e)
                    }
                })
            });
            <span class="hljs-keyword">self</span>.onRejectedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">try</span> {
                        <span class="hljs-keyword">let</span> x = onRjected(<span class="hljs-keyword">self</span>.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } <span class="hljs-keyword">catch</span> (e) {
                        reject(e);
                    }
                })
            });
        })
    }
    <span class="hljs-keyword">return</span> promise2;
}

Promise.prototype.<span class="hljs-keyword">catch</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(callback)</span> </span>{
    <span class="hljs-keyword">return</span> this.then(<span class="hljs-keyword">null</span>, callback)
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js异步发展历史与Promise原理分析

## 原文链接
[https://segmentfault.com/a/1190000013670772](https://segmentfault.com/a/1190000013670772)


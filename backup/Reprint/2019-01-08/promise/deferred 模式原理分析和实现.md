---
title: 'promise/deferred 模式原理分析和实现' 
date: 2019-01-08 2:30:11
hidden: true
slug: uw60vb68vyp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、什么是promise/deferred 模式</h2>
<p>promise/deferred 模式是，根据promise/A 或者它的增强修改版promise/A+ 规范 实现的promise异步操作的一种实现方式。</p>
<p>异步的广度使用使得回调，嵌套出现，但是一但出现深度的嵌套，就会让coding的体验变得相当不愉快，而且代码后期的维护也是相当吃力的。promise/deferred模式的出现，会在一定程度上缓解这个问题。接下来我会根据promise/a 规范来介绍promise/deferred模式。<br>（题外话：什么是规范,规范其实就相当于制定的规则，但却没有在代码层面上有默认的具体实现）</p>
<h2 id="articleHeader1">二、promise/a</h2>
<p>promise/a 提议对单个异步操作作出了这样的抽象定义：<br>1.promise操作只会在以下3种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。<br>2.promise的状态只会出现从等待状态向执行态或者拒绝态转化，不可以逆转。执行态和拒绝态之间不能相互转换<br>3.promise状态一旦被转换，就不能被更改。<br><span class="img-wrap"><img data-src="/img/bVQPjL?w=352&amp;h=335" src="https://static.alili.tech/img/bVQPjL?w=352&amp;h=335" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>4.在api上，规范定义比较简单，只要求promise 必修提供有一个then方法，以访问当前值、最终值和拒绝原因<br>then方法接受两个参数<br>promise.then(onFulfilled,onRejected)<br>5.then方法的onFulfilled,onRejected 方法都是可选参数，且不是function，都被忽略<br>6.then()方法返回promise对象，以实现链式写法。</p>
<h2 id="articleHeader2">三、promise/deferred模式</h2>
<p>promise/deferred 模式 其实包含两部分：Promise 和 Deferred。</p>
<ul>
<li><p>Deferred主要是用于内部，来维护异步模型的状态。</p></li>
<li><p>Promise只要用于外部，通过then()方法，暴露给外部调用，以添加业务逻辑和业务的组装。</p></li>
</ul>
<p>promise 和 deferred的关系图<br><span class="img-wrap"><img data-src="/img/bVQPkk?w=1083&amp;h=423" src="https://static.alili.tech/img/bVQPkk?w=1083&amp;h=423" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>从图中可以看到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.deferred对象通过resolve方法，改变自身状态为执行态，并触发then()方法的onfulfilled回调函数
 2.deferred对象通过reject方法，改变自身状态为拒绝态，并触发then()方法的onrejected回调函数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code> <span class="hljs-number">1.</span><span class="hljs-keyword">deferred</span>对象通过resolve方法，改变自身状态为执行态，并触发<span class="hljs-keyword">then</span>()方法的onfulfilled回调函数
 <span class="hljs-number">2.</span><span class="hljs-keyword">deferred</span>对象通过reject方法，改变自身状态为拒绝态，并触发<span class="hljs-keyword">then</span>()方法的onrejected回调函数
</code></pre>
<p>下面 我们就用代码来实现一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Promise 类
 * @constructor
 */
function Promise() {
    this.handler = {};
}

/**
 * promise 对象的then方法
 * @param onFulfilled  当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值，其调用次数不可超过一次
 * @param onRejected   当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因，其调用次数不可超过一次
 * @returns {Promise}  规范定义必修返回 primise对象
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
    var handler = {}
    if (typeof onFulfilled === 'function') {
        handler.resolve = onFulfilled
    }
    if (typeof onRejected === 'function') {
        handler.reject = onRejected
    }
    this.handler = handler
    return this
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * Promise 类
 * @constructor
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.handler = {};
}

<span class="hljs-comment">/**
 * promise 对象的then方法
 * @param onFulfilled  当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值，其调用次数不可超过一次
 * @param onRejected   当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因，其调用次数不可超过一次
 * @returns {Promise}  规范定义必修返回 primise对象
 */</span>
<span class="hljs-built_in">Promise</span>.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled, onRejected</span>) </span>{
    <span class="hljs-keyword">var</span> handler = {}
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onFulfilled === <span class="hljs-string">'function'</span>) {
        handler.resolve = onFulfilled
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">'function'</span>) {
        handler.reject = onRejected
    }
    <span class="hljs-keyword">this</span>.handler = handler
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
</code></pre>
<p>这里可以看到then方法所做的事情就是讲回调函数存放起来，为了完成整个流程，还需要触发执行这些回调函数的地方，而实现这些功能的对象就叫做deferred(延迟对象)。示范代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Deferred() {

    /* 状态：默认 等待态 pending */
    this.state = 'pending';

    this.promise = new Promise()
}

Deferred.prototype.resolve = function (obj) {
    this.state = 'fulfilled'
    var handler = this.promise.handler
    if (handler &amp;&amp; handler.resolve) {
        handler.resolve(obj)
    }
}

Deferred.prototype.reject = function (obj) {
    this.state = 'rejected'
    var handler = this.promise.handler
    if (handler &amp;&amp; handler.reject) {
        handler.reject(obj)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Deferred</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-comment">/* 状态：默认 等待态 pending */</span>
    <span class="hljs-keyword">this</span>.state = <span class="hljs-string">'pending'</span>;

    <span class="hljs-keyword">this</span>.promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>()
}

Deferred.prototype.resolve = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">this</span>.state = <span class="hljs-string">'fulfilled'</span>
    <span class="hljs-keyword">var</span> handler = <span class="hljs-keyword">this</span>.promise.handler
    <span class="hljs-keyword">if</span> (handler &amp;&amp; handler.resolve) {
        handler.resolve(obj)
    }
}

Deferred.prototype.reject = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">this</span>.state = <span class="hljs-string">'rejected'</span>
    <span class="hljs-keyword">var</span> handler = <span class="hljs-keyword">this</span>.promise.handler
    <span class="hljs-keyword">if</span> (handler &amp;&amp; handler.reject) {
        handler.reject(obj)
    }
}
</code></pre>
<p>以上已经定义好了Promies 和Deferred ,那我们怎么对一个异步操作函数进行封装呢？<br>假如我们有这样的异步函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncDoSomeing(flag, message) {
    setTimeout(function () {
        if (flag) {
            return message
        }
    }, 3000)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncDoSomeing</span><span class="hljs-params">(flag, message)</span> </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (flag) {
            <span class="hljs-keyword">return</span> message
        }
    }, <span class="hljs-number">3000</span>)
}
</code></pre>
<p>对其封装的代码就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncDoSomeing(flag, message) {
    var deferred = new Deferred()
    setTimeout(function () {
        if (flag) {
            deferred.resolve(message)
        } else {
            deferred.reject({code: 400, message: '拒绝'})
        }
    }, 3000)
    return deferred.promise
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncDoSomeing</span><span class="hljs-params">(flag, message)</span> </span>{
    <span class="hljs-keyword">var</span> deferred = <span class="hljs-keyword">new</span> Deferred()
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (flag) {
            deferred.resolve(message)
        } <span class="hljs-keyword">else</span> {
            deferred.reject({code: <span class="hljs-number">400</span>, message: <span class="hljs-string">'拒绝'</span>})
        }
    }, <span class="hljs-number">3000</span>)
    <span class="hljs-keyword">return</span> deferred.promise
}
</code></pre>
<p>最后我们就可以这么使用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncDoSomeing(true, '测试执行成功').then(function (message) {
    console.log(message)
}, function (err) {
    console.log(err)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>asyncDoSomeing(<span class="hljs-literal">true</span>, <span class="hljs-string">'测试执行成功'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">message</span>) </span>{
    <span class="hljs-built_in">console</span>.log(message)
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(err)
})
</code></pre>
<p>到这里只是单个promise对象的简单异步的操作控制，但是有熟悉node.js 和angular.js 的同学就会发现，这个写法跟node.js 里面的一个异步控制流程 q 模块（<a href="https://github.com/kriskowal/q" rel="nofollow noreferrer" target="_blank">https://github.com/kriskowal/q</a> ）写法是一样的。是的哦 它就是promise/deferred 模式。随便提一下 Angularjs的$q对象是q的精简版。</p>
<h2 id="articleHeader3">四、链式调用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 做到以上的简单实现，理想的coding方式，应该前一个调用结果作为下一个调用的输入，这就是链式调用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code> 做到以上的简单实现，理想的coding方式，应该前一个调用结果作为下一个调用的输入，这就是链式调用。
</code></pre>
<p>为了避免回调地狱，可以借鉴jquery的链式写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#tab').eq($(this).index()).show().siblings().hide();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>$(<span class="hljs-string">'#tab'</span>).e<span class="hljs-string">q($(this)</span>.index()).show().siblings().hide();
</code></pre>
<p>链式写法的核心在于，每个方法都返回 自身 this。</p>
<p>我们现在需要实现promise的链式调用，前一个调用结果作为下一个调用的输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" step1.then(step2).then(step3)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code> step1.then(step2).then(step3)
</code></pre>
<p>现在我们实现的then方法确实是返回this的，也就是promise本身，是可以实现链式的。<br>但是前一个调用的结果却做不到是下一个调用的输入<br>下面来改造一下上面的代码，让他实现这个要求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise() {
    this.handlerQueue = [];
    this.isPromise = true
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.handlerQueue = [];
    <span class="hljs-keyword">this</span>.isPromise = <span class="hljs-literal">true</span>
}
</code></pre>
<p>1.将原本的handler对象改为 一个数组，存放所有then方法的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.then = function (onFulfilled, onRejected) {
    var handler = {}
    if (typeof onFulfilled === 'function') {
        handler.resolve = onFulfilled
    }
    if (typeof onRejected === 'function') {
        handler.reject = onRejected
    }
    this.handlerQueue.push(handler)

    return this
}

function Deferred() {
    this.state = 'pending'
    this.promise = new Promise()
}

Deferred.prototype.resolve = function (obj) {
    this.state = 'fulfilled'
    var promise = this.promise
    var handler = {}
    while (handler = promise.handlerQueue.shift()) {
        if (handler &amp;&amp; handler.resolve) {
            var res = handler.resolve(obj)
            if (res &amp;&amp; res.isPromise) {
                res.handlerQueue = promise.handlerQueue
                this.promise = res
                return;
            } else {
                obj = res
            }
        }
    }
}

Deferred.prototype.reject = function (obj) {
    this.state = 'rejected'
    var promise = this.promise
    var handler = {}
    while (handler = promise.handlerQueue.shift()) {
        if (handler &amp;&amp; handler.reject) {
            var res = handler.reject(obj)
            if (res &amp;&amp; res.isPromise) {
                res.handlerQueue = promise.handlerQueue
                this.promise = res
                return;
            } else {
                obj = res
            }
        }
    }
}

//------ test-------//
function asyncDosomeing(flag, name) {
    const deferred = new Deferred()
    setTimeout(function () {
        if (flag) {
            deferred.resolve({code: 200, message: '成功', name: name})
        } else {
            deferred.reject({code: 400, message: '失败', name: name})
        }
    }, 2000)
    return deferred.promise
}
asyncDosomeing(true, 'asyncDosomeing1').then(result => {
    console.info(result)
    return asyncDosomeing(false, 'asyncDosomeing2')
}).then(result => {
    console.info(result)
    return 'dadds'
}).then(result => {
    console.info(result)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled, onRejected</span>) </span>{
    <span class="hljs-keyword">var</span> handler = {}
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onFulfilled === <span class="hljs-string">'function'</span>) {
        handler.resolve = onFulfilled
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">'function'</span>) {
        handler.reject = onRejected
    }
    <span class="hljs-keyword">this</span>.handlerQueue.push(handler)

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Deferred</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.state = <span class="hljs-string">'pending'</span>
    <span class="hljs-keyword">this</span>.promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>()
}

Deferred.prototype.resolve = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">this</span>.state = <span class="hljs-string">'fulfilled'</span>
    <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">this</span>.promise
    <span class="hljs-keyword">var</span> handler = {}
    <span class="hljs-keyword">while</span> (handler = promise.handlerQueue.shift()) {
        <span class="hljs-keyword">if</span> (handler &amp;&amp; handler.resolve) {
            <span class="hljs-keyword">var</span> res = handler.resolve(obj)
            <span class="hljs-keyword">if</span> (res &amp;&amp; res.isPromise) {
                res.handlerQueue = promise.handlerQueue
                <span class="hljs-keyword">this</span>.promise = res
                <span class="hljs-keyword">return</span>;
            } <span class="hljs-keyword">else</span> {
                obj = res
            }
        }
    }
}

Deferred.prototype.reject = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">this</span>.state = <span class="hljs-string">'rejected'</span>
    <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">this</span>.promise
    <span class="hljs-keyword">var</span> handler = {}
    <span class="hljs-keyword">while</span> (handler = promise.handlerQueue.shift()) {
        <span class="hljs-keyword">if</span> (handler &amp;&amp; handler.reject) {
            <span class="hljs-keyword">var</span> res = handler.reject(obj)
            <span class="hljs-keyword">if</span> (res &amp;&amp; res.isPromise) {
                res.handlerQueue = promise.handlerQueue
                <span class="hljs-keyword">this</span>.promise = res
                <span class="hljs-keyword">return</span>;
            } <span class="hljs-keyword">else</span> {
                obj = res
            }
        }
    }
}

<span class="hljs-comment">//------ test-------//</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncDosomeing</span>(<span class="hljs-params">flag, name</span>) </span>{
    <span class="hljs-keyword">const</span> deferred = <span class="hljs-keyword">new</span> Deferred()
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (flag) {
            deferred.resolve({<span class="hljs-attr">code</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'成功'</span>, <span class="hljs-attr">name</span>: name})
        } <span class="hljs-keyword">else</span> {
            deferred.reject({<span class="hljs-attr">code</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'失败'</span>, <span class="hljs-attr">name</span>: name})
        }
    }, <span class="hljs-number">2000</span>)
    <span class="hljs-keyword">return</span> deferred.promise
}
asyncDosomeing(<span class="hljs-literal">true</span>, <span class="hljs-string">'asyncDosomeing1'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result)
    <span class="hljs-keyword">return</span> asyncDosomeing(<span class="hljs-literal">false</span>, <span class="hljs-string">'asyncDosomeing2'</span>)
}).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result)
    <span class="hljs-keyword">return</span> <span class="hljs-string">'dadds'</span>
}).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result)
})
</code></pre>
<h2 id="articleHeader4">五、统一的异常处理（拒绝处理）</h2>
<p>那现在，我们有个需求，想实现所有的拒绝统一在一个地方处理。而不是每个then方法都传一个rejected 回调，只希望then()方法可以，安安心心的处理成功的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" step1().then(step2).then(step3).catch(function(err){
// do something when err
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code> step1().<span class="hljs-keyword">then</span>(step2).<span class="hljs-keyword">then</span>(step3).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span>{</span>
<span class="hljs-comment">// do something when err</span>
})
</code></pre>
<p>加一个catch err 的回调，当出现异常就直接到这个流程上处理。<br>那我们就在promise 的原型上架一个catch方法，如下</p>
<p>Promise.prototype.catch = function (onRejected) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var handler = {}
if (typeof onRejected === 'function') {
    handler.reject = onRejected
}
this.handlerQueue.push(handler)
return this
}

//------ test-------//
function asyncDosomeing(flag, name) {
    const deferred = new Deferred()
    setTimeout(function () {
        if (flag) {
            deferred.resolve({code: 200, message: '成功', name: name})
        } else {
            deferred.reject({code: 400, message: '失败', name: name})
        }
    }, 2000)
    return deferred.promise
}
asyncDosomeing(true, 'asyncDosomeing1').then(result => {
    console.info(result)
    return asyncDosomeing(false, 'asyncDosomeing2')
}).then(result => {
    console.info(result)
    return 'dadds'
}).then(result => {
    console.info(result)
}).catch(err => {
    console.info('catch')
    console.info(err)
    return asyncDosomeing(true, 'asyncDosomeing3----catch')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> handler = {}
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">'function'</span>) {
    handler.reject = onRejected
}
<span class="hljs-keyword">this</span>.handlerQueue.push(handler)
<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}

<span class="hljs-comment">//------ test-------//</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncDosomeing</span>(<span class="hljs-params">flag, name</span>) </span>{
    <span class="hljs-keyword">const</span> deferred = <span class="hljs-keyword">new</span> Deferred()
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (flag) {
            deferred.resolve({<span class="hljs-attr">code</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'成功'</span>, <span class="hljs-attr">name</span>: name})
        } <span class="hljs-keyword">else</span> {
            deferred.reject({<span class="hljs-attr">code</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'失败'</span>, <span class="hljs-attr">name</span>: name})
        }
    }, <span class="hljs-number">2000</span>)
    <span class="hljs-keyword">return</span> deferred.promise
}
asyncDosomeing(<span class="hljs-literal">true</span>, <span class="hljs-string">'asyncDosomeing1'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result)
    <span class="hljs-keyword">return</span> asyncDosomeing(<span class="hljs-literal">false</span>, <span class="hljs-string">'asyncDosomeing2'</span>)
}).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result)
    <span class="hljs-keyword">return</span> <span class="hljs-string">'dadds'</span>
}).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result)
}).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'catch'</span>)
    <span class="hljs-built_in">console</span>.info(err)
    <span class="hljs-keyword">return</span> asyncDosomeing(<span class="hljs-literal">true</span>, <span class="hljs-string">'asyncDosomeing3----catch'</span>)
})
</code></pre>
<p>这样就可以实现，只要异步操作流程中有一步被拒绝，下面流程就自然中断，直接到catch回调中处理异常。</p>
<h2 id="articleHeader5">六、API Promise化</h2>
<p>在编码的时候，想要用promise进行异步操作流程控制，就要将当前的异步回调函数封装成promise。在自己开发的时候，往往会去引用第三方的模块，然后发现这些模块的异步回调API 不支持promise写法。难道我们自己全部封装实现一遍？！这明显是不合理的。那我们就可以实现一个 方法可以批量将方法Promise化，相关代码如下：</p>
<p>1.在deferred原型上实现一个异步回调函数，回调执行后触发deferred resolve 和 reject的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Deferred.prototype.callBack = function () {
    var that = this
    return function (err, result) {
        if (err) {
            that.reject(err)
        } else {
            that.resolve(result)
        }
    }
}

2.定义一个Api Promise化 方法

/**
 * 将异步操作转换成promise
 */
var promisify = function (method) {
    if (typeof method !== 'function') {
        throw new TypeError('is not a function')
    }
    return function () {
        const defrred = new Deferred()
        var args = Array.prototype.slice.call(arguments, 0) // 克隆参数
        args.push(defrred.callBack())
        method.apply(this, args)
        return defrred.promise
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Deferred.prototype.callBack = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            that.reject(err)
        } <span class="hljs-keyword">else</span> {
            that.resolve(result)
        }
    }
}

<span class="hljs-number">2.</span>定义一个Api <span class="hljs-built_in">Promise</span>化 方法

<span class="hljs-comment">/**
 * 将异步操作转换成promise
 */</span>
<span class="hljs-keyword">var</span> promisify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> method !== <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'is not a function'</span>)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> defrred = <span class="hljs-keyword">new</span> Deferred()
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// 克隆参数</span>
        args.push(defrred.callBack())
        method.apply(<span class="hljs-keyword">this</span>, args)
        <span class="hljs-keyword">return</span> defrred.promise
    }
}
</code></pre>
<p>最后我们就可以简化代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var readFile = promisify(fs.readFile);
readFile('file.text').then(function(file){
    return readFile(file.trim())
}).then(function(file2){
    console.log(file2)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var readFile = promisify(fs.readFile);
readFile(<span class="hljs-string">'file.text'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(file)</span></span>{
    <span class="hljs-keyword">return</span> readFile(<span class="hljs-keyword">file</span>.<span class="hljs-built_in">trim</span>())
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(file2)</span></span>{
    console.<span class="hljs-built_in">log</span>(file2)
})
</code></pre>
<p>这里只是对promise/deferred 原理的简单实现，还有很多情况没有考虑。希望大家在做promise异步流程操作的时候，还是选择现在成熟的模块。比如 q模块、bulebird、when、或者 es6 的promise 去做。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
promise/deferred 模式原理分析和实现

## 原文链接
[https://segmentfault.com/a/1190000010167155](https://segmentfault.com/a/1190000010167155)


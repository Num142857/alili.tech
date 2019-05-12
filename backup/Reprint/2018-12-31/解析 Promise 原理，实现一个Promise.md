---
title: '解析 Promise 原理，实现一个Promise' 
date: 2018-12-31 2:30:29
hidden: true
slug: yedv97n5xzd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">解析 Promise 原理，实现一个Promise</h1>
<h3 id="articleHeader1">概述</h3>
<p>这篇文章旨在解析 Promise的异步实现原理，并且以 ES6中的 Promise 为蓝本实现一个简单的 Promise。</p>
<p>通过自己动手实现一个 Promise 对象，可以熟悉很多可能不知道的 Promise 细节，同时也能对异步的理解更提升一步。</p>
<p>本文假设读者对 Promise 规范有一定理解，并且熟悉 ES6 中的 Promise 基本操作。</p>
<h3 id="articleHeader2">Promise 核心</h3>
<ul>
<li>Promise 概括来说是对异步的执行结果的描述对象。（这句话的理解很重要）</li>
<li>
<p>Promise 规范中规定了，promise 的状态只有3种：</p>
<ol>
<li>pending</li>
<li>fulfilled</li>
<li>rejected</li>
</ol>
</li>
</ul>
<p>顾名思义，对上面3个状态的解释就不再赘述，Promise 的状态一旦改变则<strong>不会再改变</strong>。</p>
<ul><li>Promise 规范中还规定了 Promise 中必须有 then 方法，这个方法也是实现异步的链式操作的基本。</li></ul>
<p>具体的规范可以参见：<a href="https://promisesaplus.com" rel="nofollow noreferrer" target="_blank">https://promisesaplus.com</a></p>
<h3 id="articleHeader3">ES6 Promise细节</h3>
<ol>
<li>Promise 构造器中必须传入函数，否则会抛出错误。(没有执行器还怎么做异步操作。。。)</li>
<li>Promise.prototype上的 catch(onrejected) 方法是 then(null,onrejected) 的别名,并且会处理链之前的任何的reject。</li>
<li>Promise.prototype 上的 then和 catch 方法总会返回一个<strong>全新的 Promise 对象</strong>。</li>
<li>如果传入构造器的函数中抛出了错误,该 promise 对象的[[PromiseStatus]]会赋值为 rejected，并且[[PromiseValue]]赋值为 Error 对象。</li>
<li>then 中的回调如果抛出错误，返回的 promise 对象的[[PromiseStatus]]会赋值为 rejected，并且[[PromiseValue]]赋值为 Error 对象。</li>
<li>then 中的回调返回值会影响 then 返回的 promise 对象。(下文会具体分析)</li>
</ol>
<p>这部分内容参考: <a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a></p>
<h3 id="articleHeader4">动手实现</h3>
<p>做了上面的铺垫，实现一个 Promise 的思路就清晰很多了，本文使用 ES6 来进行实现，暂且把这个类取名为 GPromise吧(不覆盖原生的，便于和原生进行对比测试)。下文中 GPromise 代指将要实现的类，Promise 代指 ES6中的 Promise 类。</p>
<h4>内部属性</h4>
<p>在浏览器中打印出一个 Promise 实例会发现其中会包括两用"[[ ]]"包裹起来的属性，这是系统内部属性，只有JS 引擎能够访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[[PromiseStatus]]
[[PromiseValue]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-string">[[PromiseStatus]]</span>
<span class="hljs-string">[[PromiseValue]]</span></code></pre>
<p>以上两个属性分别是 Promise 对象的状态和最终值。</p>
<p>我们自己不能实现内部属性，JS中私有属性特性(#修饰符现在还是提案)暂时也没有支持，所以暂且用"_"前缀规定私有属性，这样就模拟了Promise 中的两个内部属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class GPromise {
        constructor(executor) {
            this._promiseStatus = GPromise.PENDING;
            this._promiseValue;
            this.execute(executor);
        }
        
        execute(executor){
            //...
        }
        
        then(onfulfilled, onrejected){
            //...
        }
    }

    GPromise.PENDING = 'pedding';
    GPromise.FULFILLED = 'resolved';
    GPromise.REJECTED = 'rejected';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">GPromise</span> </span>{
        <span class="hljs-keyword">constructor</span>(executor) {
            <span class="hljs-keyword">this</span>._promiseStatus = GPromise.PENDING;
            <span class="hljs-keyword">this</span>._promiseValue;
            <span class="hljs-keyword">this</span>.execute(executor);
        }
        
        execute(executor){
            <span class="hljs-comment">//...</span>
        }
        
        then(onfulfilled, onrejected){
            <span class="hljs-comment">//...</span>
        }
    }

    GPromise.PENDING = <span class="hljs-string">'pedding'</span>;
    GPromise.FULFILLED = <span class="hljs-string">'resolved'</span>;
    GPromise.REJECTED = <span class="hljs-string">'rejected'</span>;</code></pre>
<h4>执行器</h4>
<ol>
<li>传入构造器的executor为函数，并且在构造时就会执行。</li>
<li>我们给 executor 中传入 resolve 和 reject 参数，这两个参数都是函数，用于改变改变 _promiseStatus和 _promiseValue 的值。</li>
<li>并且内部做了捕获异常的操作，一旦传入的executor 函数执行抛出错误，GPromise 实例会变成 rejected状态，即 _promiseStatus赋值为'rejected'，并且 _promiseValue赋值为Error对象。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  execute(executor) {
            if (typeof executor != 'function') {
                throw new Error(` GPromise resolver ${executor} is not a function`);
            }
            //捕获错误
            try {
                executor(data => {
                    this.promiseStatus = GPromise.FULFILLED;
                    this.promiseValue = data;
                }, data => {
                    this.promiseStatus = GPromise.REJECTED;
                    this.promiseValue = data; 
                });
            } catch (e) {
                this.promiseStatus = GPromise.REJECTED;
                this.promiseValue = e;
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  execute(executor) {
            <span class="hljs-keyword">if</span> (typeof executor != <span class="hljs-string">'function'</span>) {
                <span class="hljs-keyword">throw</span> new Error(` GPromise resolver ${executor} <span class="hljs-keyword">is</span> not a function`);
            }
            <span class="hljs-comment">//捕获错误</span>
            <span class="hljs-keyword">try</span> {
                executor(<span class="hljs-keyword">data</span> =&gt; {
                    <span class="hljs-keyword">this</span>.promiseStatus = GPromise.FULFILLED;
                    <span class="hljs-keyword">this</span>.promiseValue = <span class="hljs-keyword">data</span>;
                }, <span class="hljs-keyword">data</span> =&gt; {
                    <span class="hljs-keyword">this</span>.promiseStatus = GPromise.REJECTED;
                    <span class="hljs-keyword">this</span>.promiseValue = <span class="hljs-keyword">data</span>; 
                });
            } <span class="hljs-keyword">catch</span> (e) {
                <span class="hljs-keyword">this</span>.promiseStatus = GPromise.REJECTED;
                <span class="hljs-keyword">this</span>.promiseValue = e;
            }
        }</code></pre>
<blockquote><p>注：Promise 对象在executor 发生错误或者reject 时，如果没有then<br>或者 catch 来处理，会把错误抛出到外部，也就是会报错。GPromise 实现的是没有向外部抛出错误，只能由then方法处理。</p></blockquote>
<h4>then方法</h4>
<h5>异步实现</h5>
<p>then 方法内部逻辑稍微复杂点，并且有一点<strong>一定一定一定</strong>要注意到: then 方法中的回调是<strong>异步执行</strong>的，思考下下段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);
new Promise((resolve,reject)=>{
    console.log(2);
    resolve();
})
.then(()=>console.log(3));
console.log(4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
<span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve,reject)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    resolve();
})
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);</code></pre>
<p>执行结果是什么呢？答案其实是:<strong>1 2 4 3</strong>。传入Promise 中的执行函数是立即执行完的啊，为什么不是立即执行 then 中的回调呢？因为then 中的回调是异步执行，表示该回调是插入事件队列末尾，在当前的同步任务结束之后，下次事件循环开始时执行队列中的任务。</p>
<p>then 方法中的难点就是处理异步,其中一个方案是通过 setInterval来监听GPromise 对象的状态改变，一旦改变则执行相应then 中相应的回调函数(onfulfilled和onrejected),这样回调函数就能够插入事件队列末尾，异步执行，实验证明可行，这种方案是最直观也最容易理解的。</p>
<h5>then 返回值</h5>
<p>then 方法的返回值是一个新的 GPromise 对象，并且这个对象的状态和 then 中的回调返回值相关，回调指代传入的 onfulfilled 和 rejected。</p>
<ol>
<li>如果 then 中的回调抛出了错误，返回的 GPromise 的 _promiseStatus 赋值为'rejected'， _promiseValue赋值为抛出的错误对象。</li>
<li>如果回调返回了一个非 GPromise 对象， then返回的 GPromise 的 _promiseStatus 赋值为'resolved'， _promiseValue赋值为回调的返回值。</li>
<li>如果回调返回了一个 GPromise 对象，then返回的GPromise对象 的_promiseStatus和 _promiseValue 和其保持同步。也就是 then 返回的GPromise记录了回调返回的状态和值，<strong>不是</strong>直接返回回调的返回值。</li>
</ol>
<h5>代码</h5>
<p>then 方法中的重点逻辑如上，其他参见代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  then(onfulfilled, onrejected) {
            let _ref = null,
                timer = null,
                result = new GPromise(() => {});

            //因为 promise 的 executor 是异步操作,需要监听 promise 对象状态变化，并且不能阻塞线程
            timer = setInterval(() => {
                if ((typeof onfulfilled == 'function' &amp;&amp; this._promiseStatus == GPromise.FULFILLED) ||
                    (typeof onrejected == 'function' &amp;&amp; this._promiseStatus == GPromise.REJECTED)) {
                    //状态发生变化，取消监听
                    clearInterval(timer);
                    //捕获传入 then 中的回调的错误，交给 then 返回的 promise 处理
                    try {
                        if (this._promiseStatus == GPromise.FULFILLED) {
                            _ref = onfulfilled(this._promiseValue);
                        } else {
                            _ref = onrejected(this._promiseValue);
                        }

                        //根据回调的返回值来决定 then 返回的 GPromise 实例的状态
                        if (_ref instanceof GPromise) {
                            //如果回调函数中返回的是 GPromise 实例，那么需要监听其状态变化，返回新实例的状态是根据其变化相应的
                            timer = setInterval(()=>{
                                if (_ref._promiseStatus == GPromise.FULFILLED ||
                                    _ref._promiseStatus == GPromise.REJECTED) {
                                    clearInterval(timer);
                                    result._promiseValue = _ref._promiseValue;
                                    result._promiseStatus = _ref._promiseStatus;
                                }
                            },0);
                            
                        } else {
                            //如果返回的是非 GPromise 实例
                            result._promiseValue = _ref;
                            result._promiseStatus = GPromise.FULFILLED;
                        }
                    } catch (e) {
                        //回调中抛出错误的情况
                        result._promiseStatus = GPromise.REJECTED;
                        result._promiseValue = e;
                    }
                }
            }, 0);
            //promise 之所以能够链式操作，因为返回了GPromise对象
            return result;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>  <span class="hljs-keyword">then</span>(onfulfilled, onrejected) {
            let <span class="hljs-variable">_ref</span> = null,
                timer = null,
                result = new GPromise(() =&gt; {});

            <span class="hljs-comment">//因为 promise 的 executor 是异步操作,需要监听 promise 对象状态变化，并且不能阻塞线程</span>
            timer = setInterval(() =&gt; {
                <span class="hljs-keyword">if</span> ((<span class="hljs-built_in">typeof</span> onfulfilled == <span class="hljs-string">'function'</span> &amp;&amp; this.<span class="hljs-variable">_promiseStatus</span> == GPromise.FULFILLED) ||
                    (<span class="hljs-built_in">typeof</span> onrejected == <span class="hljs-string">'function'</span> &amp;&amp; this.<span class="hljs-variable">_promiseStatus</span> == GPromise.REJECTED)) {
                    <span class="hljs-comment">//状态发生变化，取消监听</span>
                    clearInterval(timer);
                    <span class="hljs-comment">//捕获传入 then 中的回调的错误，交给 then 返回的 promise 处理</span>
                    <span class="hljs-keyword">try</span> {
                        <span class="hljs-keyword">if</span> (this.<span class="hljs-variable">_promiseStatus</span> == GPromise.FULFILLED) {
                            <span class="hljs-variable">_ref</span> = onfulfilled(this.<span class="hljs-variable">_promiseValue</span>);
                        } <span class="hljs-keyword">else</span> {
                            <span class="hljs-variable">_ref</span> = onrejected(this.<span class="hljs-variable">_promiseValue</span>);
                        }

                        <span class="hljs-comment">//根据回调的返回值来决定 then 返回的 GPromise 实例的状态</span>
                        <span class="hljs-keyword">if</span> (<span class="hljs-variable">_ref</span> instanceof GPromise) {
                            <span class="hljs-comment">//如果回调函数中返回的是 GPromise 实例，那么需要监听其状态变化，返回新实例的状态是根据其变化相应的</span>
                            timer = setInterval(()=&gt;{
                                <span class="hljs-keyword">if</span> (<span class="hljs-variable">_ref</span>.<span class="hljs-variable">_promiseStatus</span> == GPromise.FULFILLED ||
                                    <span class="hljs-variable">_ref</span>.<span class="hljs-variable">_promiseStatus</span> == GPromise.REJECTED) {
                                    clearInterval(timer);
                                    result.<span class="hljs-variable">_promiseValue</span> = <span class="hljs-variable">_ref</span>.<span class="hljs-variable">_promiseValue</span>;
                                    result.<span class="hljs-variable">_promiseStatus</span> = <span class="hljs-variable">_ref</span>.<span class="hljs-variable">_promiseStatus</span>;
                                }
                            },<span class="hljs-number">0</span>);
                            
                        } <span class="hljs-keyword">else</span> {
                            <span class="hljs-comment">//如果返回的是非 GPromise 实例</span>
                            result.<span class="hljs-variable">_promiseValue</span> = <span class="hljs-variable">_ref</span>;
                            result.<span class="hljs-variable">_promiseStatus</span> = GPromise.FULFILLED;
                        }
                    } <span class="hljs-keyword">catch</span> (e) {
                        <span class="hljs-comment">//回调中抛出错误的情况</span>
                        result.<span class="hljs-variable">_promiseStatus</span> = GPromise.REJECTED;
                        result.<span class="hljs-variable">_promiseValue</span> = e;
                    }
                }
            }, <span class="hljs-number">0</span>);
            <span class="hljs-comment">//promise 之所以能够链式操作，因为返回了GPromise对象</span>
            return result;
        }</code></pre>
<h3 id="articleHeader5">测试用例</h3>
<p>是骡子是马，拉出来溜溜。。</p>
<p>测试环境是macOS Sierra 10.12.6，Chrome 60.0.3112.113。</p>
<p>经过以下测试， 证明了GPromise 的基本的异步流程管理和原生 Promise 没有差别。以下测试用例参考了 MDN 中的[Promise<br>API](<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a> 中的 Advanced Example。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var promiseCount = 0;

    function test(isPromise) {
        let thisPromiseCount = ++promiseCount,
            executor = (resolve, reject) => {
                console.log(thisPromiseCount + ') Promise started (Async code started)');
                window.setTimeout(
                    function () {
                        resolve(thisPromiseCount);
                    }, Math.random() * 2000 + 1000);
            };

        console.log(thisPromiseCount + ') Started (Sync code started)');

        let p1 = isPromise ? new Promise(executor) : new GPromise(executor);

        p1.then(
            function (val) {
                console.log(val + ') Promise fulfilled (Async code terminated)');
            },
            function (reason) {
                console.log('Handle rejected promise (' + reason + ') here.');
            });

        console.log(thisPromiseCount + ') Promise made (Sync code terminated)');
    }

    test();
    test(true);
    test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> promiseCount = <span class="hljs-number">0</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">isPromise</span>) </span>{
        <span class="hljs-keyword">let</span> thisPromiseCount = ++promiseCount,
            executor = <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(thisPromiseCount + <span class="hljs-string">') Promise started (Async code started)'</span>);
                <span class="hljs-built_in">window</span>.setTimeout(
                    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        resolve(thisPromiseCount);
                    }, <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2000</span> + <span class="hljs-number">1000</span>);
            };

        <span class="hljs-built_in">console</span>.log(thisPromiseCount + <span class="hljs-string">') Started (Sync code started)'</span>);

        <span class="hljs-keyword">let</span> p1 = isPromise ? <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(executor) : <span class="hljs-keyword">new</span> GPromise(executor);

        p1.then(
            <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
                <span class="hljs-built_in">console</span>.log(val + <span class="hljs-string">') Promise fulfilled (Async code terminated)'</span>);
            },
            <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reason</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Handle rejected promise ('</span> + reason + <span class="hljs-string">') here.'</span>);
            });

        <span class="hljs-built_in">console</span>.log(thisPromiseCount + <span class="hljs-string">') Promise made (Sync code terminated)'</span>);
    }

    test();
    test(<span class="hljs-literal">true</span>);
    test();</code></pre>
<p>那么再来测试下链式操作（没有链式操作的 Promise 我要你有何用？），测试结果和 Promise 表现一致。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    function async1() {
        return new GPromise(
            (resolve, reject) => {
                console.log('async1 start');
                setTimeout(() => {
                    resolve('async1 finished')
                }, 1000);
            }
        );
    }

    function async2() {
        return new GPromise(
            (resolve, reject) => {
                console.log('async2 start');
                setTimeout(() => {
                    resolve('async2 finished')
                }, 1000);
            }
        );
    }

    function async3() {
        return new GPromise(
            (resolve, reject) => {
                console.log('async3 start');
                setTimeout(() => {
                    resolve('async3 finished');
                }, 1000);
            }
        );
    }

    async1()
        .then(
            data => {
                console.log(data);
                return async2();
            })
        .then(
            data => {
                console.log(data);
                return async3();
            }
        )
        .then(
            data => {
                console.log(data);
            }
        );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> GPromise(
            <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 start'</span>);
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    resolve(<span class="hljs-string">'async1 finished'</span>)
                }, <span class="hljs-number">1000</span>);
            }
        );
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> GPromise(
            <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async2 start'</span>);
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    resolve(<span class="hljs-string">'async2 finished'</span>)
                }, <span class="hljs-number">1000</span>);
            }
        );
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async3</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> GPromise(
            <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async3 start'</span>);
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    resolve(<span class="hljs-string">'async3 finished'</span>);
                }, <span class="hljs-number">1000</span>);
            }
        );
    }

    async1()
        .then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(data);
                <span class="hljs-keyword">return</span> async2();
            })
        .then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(data);
                <span class="hljs-keyword">return</span> async3();
            }
        )
        .then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(data);
            }
        );</code></pre>
<h3 id="articleHeader6">总结</h3>
<p>到此为止，一个高仿的 Promise 已经实现完成了，它很简单，因为只有一个 then 方法，异步的状态管理由内部完成。</p>
<p>这里并没有实现 catch方法，因为上文也提到了，catch方法就相当于 then(null,onrejected) 。而且 Promise 类上的 race,all，resolve，reject也没有实现，本文旨在理清 Promise 核心原理，篇幅受限（其实就是我懒），其他辅助类的方法等之后有时间再实现。</p>
<p>本文提供的只是一个思路，希望能帮助到你，欢迎大家批评指教。</p>
<p>代码地址:<a href="https://github.com/geekinpink/GPromise" rel="nofollow noreferrer" target="_blank">Github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解析 Promise 原理，实现一个Promise

## 原文链接
[https://segmentfault.com/a/1190000011241512](https://segmentfault.com/a/1190000011241512)


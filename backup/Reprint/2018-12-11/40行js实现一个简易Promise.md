---
title: '40行js实现一个简易Promise' 
date: 2018-12-11 2:30:10
hidden: true
slug: or7ovpy0vqo
categories: [reprint]
---

{{< raw >}}

                    
<p>最近面试有问到Promise的原理，以及实现的方法。所以自己动手实现了一个，发个文章记录下。<br>简单分析下，promise实例对象有两个属性，一个是status，一个是value。还有一个then方法。<br>status有3个状态，pending,resolved,rejected。value就是then回调的时候传的值。<br>下面是代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 
  原生js模拟promise
*/
const PromisePolyfill = (() => {
    //状态管理
    const promiseStatusSymbol = Symbol('PromiseStatus');
    const promiseValueSymbol = Symbol('PromiseValue');
    const STATUS = {
        PENDING: 'PENDING',
        FULFILLED: 'FULFILLED',
        REJECTED: 'REJECTED'
    };
    //resolve操作设置值和状态
    function resolve() {
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = STATUS['FULFILLED'];
    }
    //reject操作设置值和状态
    function reject() {
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = STATUS['REJECTED'];
    }

    class myPromise {
        constructor(resolver) {
            if (typeof resolver !== 'function') {
                throw new TypeError(`parameter 1 must be a function, but get a ${typeof func}`);
            }
            this[promiseStatusSymbol] = STATUS['PENDING'];//初始状态为pending
            resolver(
                resolve.bind(this),//绑定promise实例对象
                reject.bind(this)
            );
        }
        then(callback) {
            //开一个定时器监听状态变化，如果有变化则执行callback
            const interval = setInterval(() => {
                if (this[promiseStatusSymbol] === 'FULFILLED' || this[promiseStatusSymbol] === 'REJECTED') {
                    clearInterval(interval);
                    callback(this[promiseValueSymbol], resolve.bind(this), reject.bind(this));
                    this[promiseStatusSymbol] = 'PENDING';//执行完后把状态改回，方便下一个then方法进行定时轮询
                }
            });
            return this;
        }
    }
    return myPromise;
})();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* 
  原生js模拟promise
*/</span>
<span class="hljs-keyword">const</span> PromisePolyfill = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
    <span class="hljs-comment">//状态管理</span>
    <span class="hljs-keyword">const</span> promiseStatusSymbol = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'PromiseStatus'</span>);
    <span class="hljs-keyword">const</span> promiseValueSymbol = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'PromiseValue'</span>);
    <span class="hljs-keyword">const</span> STATUS = {
        <span class="hljs-attr">PENDING</span>: <span class="hljs-string">'PENDING'</span>,
        <span class="hljs-attr">FULFILLED</span>: <span class="hljs-string">'FULFILLED'</span>,
        <span class="hljs-attr">REJECTED</span>: <span class="hljs-string">'REJECTED'</span>
    };
    <span class="hljs-comment">//resolve操作设置值和状态</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>[promiseValueSymbol] = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">this</span>[promiseStatusSymbol] = STATUS[<span class="hljs-string">'FULFILLED'</span>];
    }
    <span class="hljs-comment">//reject操作设置值和状态</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>[promiseValueSymbol] = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">this</span>[promiseStatusSymbol] = STATUS[<span class="hljs-string">'REJECTED'</span>];
    }

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">myPromise</span> </span>{
        <span class="hljs-keyword">constructor</span>(resolver) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> resolver !== <span class="hljs-string">'function'</span>) {
                <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">`parameter 1 must be a function, but get a <span class="hljs-subst">${<span class="hljs-keyword">typeof</span> func}</span>`</span>);
            }
            <span class="hljs-keyword">this</span>[promiseStatusSymbol] = STATUS[<span class="hljs-string">'PENDING'</span>];<span class="hljs-comment">//初始状态为pending</span>
            resolver(
                resolve.bind(<span class="hljs-keyword">this</span>),<span class="hljs-comment">//绑定promise实例对象</span>
                reject.bind(<span class="hljs-keyword">this</span>)
            );
        }
        then(callback) {
            <span class="hljs-comment">//开一个定时器监听状态变化，如果有变化则执行callback</span>
            <span class="hljs-keyword">const</span> interval = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>[promiseStatusSymbol] === <span class="hljs-string">'FULFILLED'</span> || <span class="hljs-keyword">this</span>[promiseStatusSymbol] === <span class="hljs-string">'REJECTED'</span>) {
                    clearInterval(interval);
                    callback(<span class="hljs-keyword">this</span>[promiseValueSymbol], resolve.bind(<span class="hljs-keyword">this</span>), reject.bind(<span class="hljs-keyword">this</span>));
                    <span class="hljs-keyword">this</span>[promiseStatusSymbol] = <span class="hljs-string">'PENDING'</span>;<span class="hljs-comment">//执行完后把状态改回，方便下一个then方法进行定时轮询</span>
                }
            });
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
        }
    }
    <span class="hljs-keyword">return</span> myPromise;
})();
</code></pre>
<p>写完了丢到控制台测试，完美预期运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//测试，下面会先打印出111，再打印出222，333
new PromisePolyfill(function (resolve, reject) {
    setTimeout(() => {
        resolve(222);
        console.log(111)
    }, 1000);
}).then(function (res, resolve, reject) {
    setTimeout(() => {
        resolve(333);
        console.log(res)
    }, 3000);
}).then(function (res, resolve, reject) {
    console.log(res);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//测试，下面会先打印出111，再打印出222，333</span>
<span class="hljs-keyword">new</span> PromisePolyfill(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">222</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">111</span>)
    }, <span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res, resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-number">333</span>);
        <span class="hljs-built_in">console</span>.log(res)
    }, <span class="hljs-number">3000</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res, resolve, reject</span>) </span>{
    <span class="hljs-built_in">console</span>.log(res);
});</code></pre>
<p>代码github地址：<a href="https://github.com/leeseean/PromisePolyfill" rel="nofollow noreferrer" target="_blank">https://github.com/leeseean/P...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
40行js实现一个简易Promise

## 原文链接
[https://segmentfault.com/a/1190000013615320](https://segmentfault.com/a/1190000013615320)


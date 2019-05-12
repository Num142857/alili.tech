---
title: 'es6 promise源码实现' 
date: 2019-02-06 2:30:09
hidden: true
slug: b15836dxk8s
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">promise源码分析</h1>
<h2 id="articleHeader1">初级入门以及如何使用请看 <a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">阮一峰promise对象讲解</a>
</h2>
<h2 id="articleHeader2">先上一坨代码,后面我们要基于这坨代码来实现自定义promise</h2>
<h4>原始方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){
    var a=100;
    console.log(a);
    setTimeout(function () {
        var b=200;
        console.log(b)
        setTimeout(function () {
            var c=300;
            console.log(c)
        }, 1000);
    }, 1000);
},1000);   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a=<span class="hljs-number">100</span>;
    <span class="hljs-built_in">console</span>.log(a);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> b=<span class="hljs-number">200</span>;
        <span class="hljs-built_in">console</span>.log(b)
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> c=<span class="hljs-number">300</span>;
            <span class="hljs-built_in">console</span>.log(c)
        }, <span class="hljs-number">1000</span>);
    }, <span class="hljs-number">1000</span>);
},<span class="hljs-number">1000</span>);   </code></pre>
<h4>promise实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new Promise(function (resolve, reject) {
    setTimeout(function () {
        var a=100;
        resolve(a);
    }, 1000);
}).then(function (res) {
    console.log(res);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var b=200;
            resolve(b);
        }, 1000);
    })
}).then(function (res) {
    console.log(res);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var c=300
            resolve(c);
        }, 1000);
    })
}).then(function (res) {
        console.log(res);
    }
    )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a=<span class="hljs-number">100</span>;
        resolve(a);
    }, <span class="hljs-number">1000</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(res);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> b=<span class="hljs-number">200</span>;
            resolve(b);
        }, <span class="hljs-number">1000</span>);
    })
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(res);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> c=<span class="hljs-number">300</span>
            resolve(c);
        }, <span class="hljs-number">1000</span>);
    })
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
        <span class="hljs-built_in">console</span>.log(res);
    }
    )
</code></pre>
<h2 id="articleHeader3">如何让你的promise能有此魔力</h2>
<ul>
<li>让a,b,c的值能在then里面的回调接收到</li>
<li>在连续调用异步，如何确保异步函数的执行顺序</li>
</ul>
<h4>如何让异步的value在thenable函数中拿到</h4>
<ul><li>将resolve/reject函数和onfulfiled/onrejected放入同一个对象(promise对象)里面,resolve/reject的时候将value设置this.value=xxx。onfulfiled/onrejected执行的时候呢,onfulfiled(this.value)即可</li></ul>
<h4>如何处理链式的promise且保证顺序</h4>
<ul><li>每个promise后面链一个对象该对象包含onfulfiled,onfulfiled,子promise三个属性.</li></ul>
<p>当父promise 状态改变完毕,执行完相应的onfulfiled/onfulfiled的时候呢，拿到子promise,在等待这个子promise状态改变，在执行相应的onfulfiled/onfulfiled。依次循环直到当前promise没有子promise</p>
<h2 id="articleHeader4">最终代码(内涵注释)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            /*
            我们要满足状态只能三种状态：PENDING,FULFILLED,REJECTED三种状态，且状态只能由PENDING=>FULFILLED,或者PENDING=>REJECTED
            */
            var PENDING = 0;
            var FULFILLED = 1;
            var REJECTED = 2;
            /*
            value状态为执行成功事件的入参，deferreds保存着状态改变之后的需要处理的函数以及promise子节点，构造函数里面应该包含这三个属性的初始化
             */
            function Promise(callback) {
                this.status = PENDING;
                this.value = null;
                this.defferd = [];
                setTimeout(callback.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
            }
            
            Promise.prototype = {
                constructor: Promise,
                //触发改变promise状态到FULFILLED
                resolve: function (result) {
                    this.status = FULFILLED;
                    this.value = result;
                    this.done();
                },
                //触发改变promise状态到REJECTED
                reject: function (error) {
                    this.status = REJECTED;
                    this.value = error;
                },
                //处理defferd
                handle: function (fn) {
                    if (!fn) {
                        return;
                    }
                    var value = this.value;
                    var t = this.status;
                    var p;
                    if (t == PENDING) {
                         this.defferd.push(fn);
                    } else {
                        if (t == FULFILLED &amp;&amp; typeof fn.onfulfiled == 'function') {
                            p = fn.onfulfiled(value);
                        }
                        if (t == REJECTED &amp;&amp; typeof fn.onrejected == 'function') {
                            p = fn.onrejected(value);
                        }
                    var promise = fn.promise;
                    if (promise) {
                        if (p &amp;&amp; p.constructor == Promise) {
                            p.defferd = promise.defferd;
                        } else {
                            p = this;
                            p.defferd = promise.defferd;
                            this.done();
                        }
                    }
                    }
                },
                //触发promise defferd里面需要执行的函数
                done: function () {
                    var status = this.status;
                    if (status == PENDING) {
                        return;
                    }
                    var defferd = this.defferd;
                    for (var i = 0; i < defferd.length; i++) {
                        this.handle(defferd[i]);
                    }
                },
                /*储存then函数里面的事件
                返回promise对象
                defferd函数当前promise对象里面
                */
                then: function (success, fail) {
                   var o = {
                        onfulfiled: success,
                        onrejected: fail
                    };
                    var status = this.status;
                    o.promise = new this.constructor(function () {
            
                    });
                    if (status == PENDING) {
                        this.defferd.push(o);
                    } else if (status == FULFILLED || status == REJECTED) {
                        this.handle(o);
                    }
                    return o.promise;
                }
            };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>            <span class="hljs-comment">/*
            我们要满足状态只能三种状态：PENDING,FULFILLED,REJECTED三种状态，且状态只能由PENDING=&gt;FULFILLED,或者PENDING=&gt;REJECTED
            */</span>
            <span class="hljs-keyword">var</span> PENDING = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> FULFILLED = <span class="hljs-number">1</span>;
            <span class="hljs-keyword">var</span> REJECTED = <span class="hljs-number">2</span>;
            <span class="hljs-comment">/*
            value状态为执行成功事件的入参，deferreds保存着状态改变之后的需要处理的函数以及promise子节点，构造函数里面应该包含这三个属性的初始化
             */</span>
            function Promise(callback) {
                <span class="hljs-keyword">this</span>.status = PENDING;
                <span class="hljs-keyword">this</span>.value = <span class="hljs-literal">null</span>;
                <span class="hljs-keyword">this</span>.defferd = [];
                setTimeout(callback.bind(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>), <span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>)), <span class="hljs-number">0</span>);
            }
            
            Promise.prototype = {
                <span class="hljs-keyword">constructor</span>: Promise,
                <span class="hljs-comment">//触发改变promise状态到FULFILLED</span>
                resolve: function (result) {
                    <span class="hljs-keyword">this</span>.status = FULFILLED;
                    <span class="hljs-keyword">this</span>.value = result;
                    <span class="hljs-keyword">this</span>.done();
                },
                <span class="hljs-comment">//触发改变promise状态到REJECTED</span>
                reject: function (error) {
                    <span class="hljs-keyword">this</span>.status = REJECTED;
                    <span class="hljs-keyword">this</span>.value = error;
                },
                <span class="hljs-comment">//处理defferd</span>
                handle: function (fn) {
                    <span class="hljs-keyword">if</span> (!fn) {
                        <span class="hljs-keyword">return</span>;
                    }
                    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.value;
                    <span class="hljs-keyword">var</span> t = <span class="hljs-keyword">this</span>.status;
                    <span class="hljs-keyword">var</span> p;
                    <span class="hljs-keyword">if</span> (t == PENDING) {
                         <span class="hljs-keyword">this</span>.defferd.push(fn);
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-keyword">if</span> (t == FULFILLED &amp;&amp; typeof fn.onfulfiled == <span class="hljs-string">'function'</span>) {
                            p = fn.onfulfiled(value);
                        }
                        <span class="hljs-keyword">if</span> (t == REJECTED &amp;&amp; typeof fn.onrejected == <span class="hljs-string">'function'</span>) {
                            p = fn.onrejected(value);
                        }
                    <span class="hljs-keyword">var</span> promise = fn.promise;
                    <span class="hljs-keyword">if</span> (promise) {
                        <span class="hljs-keyword">if</span> (p &amp;&amp; p.<span class="hljs-keyword">constructor</span> == Promise) {
                            p.defferd = promise.defferd;
                        } <span class="hljs-keyword">else</span> {
                            p = <span class="hljs-keyword">this</span>;
                            p.defferd = promise.defferd;
                            <span class="hljs-keyword">this</span>.done();
                        }
                    }
                    }
                },
                <span class="hljs-comment">//触发promise defferd里面需要执行的函数</span>
                done: function () {
                    <span class="hljs-keyword">var</span> status = <span class="hljs-keyword">this</span>.status;
                    <span class="hljs-keyword">if</span> (status == PENDING) {
                        <span class="hljs-keyword">return</span>;
                    }
                    <span class="hljs-keyword">var</span> defferd = <span class="hljs-keyword">this</span>.defferd;
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; defferd.length; i++) {
                        <span class="hljs-keyword">this</span>.handle(defferd[i]);
                    }
                },
                <span class="hljs-comment">/*储存then函数里面的事件
                返回promise对象
                defferd函数当前promise对象里面
                */</span>
                then: function (success, fail) {
                   <span class="hljs-keyword">var</span> o = {
                        onfulfiled: success,
                        onrejected: fail
                    };
                    <span class="hljs-keyword">var</span> status = <span class="hljs-keyword">this</span>.status;
                    o.promise = new <span class="hljs-keyword">this</span>.<span class="hljs-keyword">constructor</span>(function () {
            
                    });
                    <span class="hljs-keyword">if</span> (status == PENDING) {
                        <span class="hljs-keyword">this</span>.defferd.push(o);
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (status == FULFILLED || status == REJECTED) {
                        <span class="hljs-keyword">this</span>.handle(o);
                    }
                    <span class="hljs-keyword">return</span> o.promise;
                }
            };
</code></pre>
<h2 id="articleHeader5">在附上一张手绘的流程图</h2>
<p><span class="img-wrap"><img data-src="/img/bVzLT4?w=716&amp;h=736" src="https://static.alili.tech/img/bVzLT4?w=716&amp;h=736" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">参考资料</h2>
<ul><li><a href="https://chromium.googlesource.com/v8/v8/+/3.29.45/src/promise.js?autodive=0/" rel="nofollow noreferrer" target="_blank">v8官方实现</a></li></ul>
<h2 id="articleHeader7">源码地址</h2>
<ul><li><a href="https://github.com/laughing-pic-zhu/yield-promise-Test" rel="nofollow noreferrer" target="_blank">github</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6 promise源码实现

## 原文链接
[https://segmentfault.com/a/1190000006103601](https://segmentfault.com/a/1190000006103601)


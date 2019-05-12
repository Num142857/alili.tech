---
title: '实现 JavaScript 异步方法 Promise.all' 
date: 2019-01-03 2:30:11
hidden: true
slug: 4lnepr5d5zl
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>本次的任务</strong></p>
<p>假如。。。。。</p>
<p><code>JavaScript</code> v8 引擎发生了重大故障，<code>Promise.all</code> 方法变成了 <code>undefined</code> ，为了拯救 <code>JavaScript</code> 世界，需要开发一个模块来解决此问题。</p>
<p>使用者需要在代码入口处引入我们开发的模块就可渡过此劫，但要求三个月后官方修改此版本，代码无修改就能自动切换到官方版本。实现 <code>Promise.all</code></p>
<h2 id="articleHeader0">首先要知道 <code>Promise</code> 是什么</h2>
<p><code>promise</code> 是对异步编程的一种抽象。它是一个代理对象，代表一个必须进行异步处理的函数返回的值或抛出的异常。</p>
<p><code>promise</code> 最早是在 <code>commonjs</code> 社区提出来的，当时提出了很多规范。比较接受的是 <code>promise/A</code> 规范。后来人们在这个基础上。提出了 <code>promise/A+</code>规范，也就是实际上的业内推行的规范。<code>ECMAScript 6.0</code> 也是采用的这种规范。</p>
<p>英文版：<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">https://promisesaplus.com/</a></p>
<p>中文版：<a href="http://link.zhihu.com/?target=http%3A//www.ituring.com.cn/article/66566" rel="nofollow noreferrer" target="_blank">【翻译】Promises/A+规范</a></p>
<p>上面的规范中主要定义的 <code>then</code> 的实现方式，也就是只规定了 <code>Promise</code> 的核心， <code>Promise.race</code>，<code>Promise.all</code> 等 <code>api</code> 没有规定。</p>
<p><a href="http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor" rel="nofollow noreferrer" target="_blank">ECMAScript 6.0 Promise.all 规范</a></p>
<p>Node.js 兼容性如下图 <a href="http://node.green/#ES2015-built-ins-Promise" rel="nofollow noreferrer" target="_blank">点击查看在线版</a></p>
<p><span class="img-wrap"><img data-src="/img/bVTkTi?w=2474&amp;h=530" src="https://static.alili.tech/img/bVTkTi?w=2474&amp;h=530" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">特点</h3>
<p><strong> <code>Promise</code> 不需要编译器/解释器的支持</strong></p>
<p>将来可能成为主流的 <code>async-await</code>，以及曾经火过一把的 <code>generator</code> + <code>co</code>，这些都是需要编译器或者解释器级别的支持才能使用。</p>
<p>而 <code>Promise</code>，是完全可以利用语言已有特性，作为一个库来实现！即使在非常原始的JS运行环境，你也可以自己实现一个 <code>Promise</code>，而不需要等待其他人的帮助。</p>
<p><strong> <code>Promise</code> 是语言无关的</strong></p>
<p><code>Promise</code> 还是独立于语言的，如果你要给另外一种编程语言实现 <code>Promise</code>，只要照葫芦画瓢就行了。</p>
<h2 id="articleHeader2">
<code>promise</code> 怎么用</h2>
<p>请看这里，阮一峰的 <a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门 Promise </a></p>
<h2 id="articleHeader3">实现 <code>Promise.all</code>
</h2>
<p><code>Promise.all</code> 接收一个 <code>promise</code> 对象的数组作为参数，当这个数组里的所有 <code>promise</code> 对象全部变为<code>resolve</code>或 有 <code>reject</code> 状态出现的时候，它才会去调用 <code>.then</code> 方法,它们是并发执行的。</p>
<h3 id="articleHeader4">Promise.all 简介</h3>
<p><code>Promise.all(promiseArray)</code> 方法是 <code>Promise</code> 对象上的静态方法，该方法的作用是将多个 <code>Promise</code> 对象实例包装，生成并返回一个新的 <code>Promise</code> 实例。</p>
<p>参数：<code>promiseArray</code>，是一个 <code>Promise</code> 实例数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>),
    p2 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>),
    p3 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>);
<span class="hljs-built_in">Promise</span>.all([p1, p2, p3]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">results</span>) </span>{
    <span class="hljs-built_in">console</span>.log(results);  <span class="hljs-comment">// [1, 2, 3]</span>
});</code></pre>
<p>在上面的方法中，<code>promise</code> 数组中所有的 <code>promise</code> 实例都变为<code>resolve</code> 的时候，该方法才会返回，并将所有结果传递 <code>results</code> 数组中。<code>promise</code> 数组中任何一个 <code>promise</code> 为 <code>reject</code> 的话，则整个 <code>Promise.all</code> 调用会立即终止，并返回一个 <code>reject</code> 的新的 <code>promise</code> 对象。<code>reject</code> 使用示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = Promise.resolve(1),
    p2 = Promise.reject(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    //then方法不会被执行
    console.log(results);
}).catch(function (e){
    //catch方法将会被执行，输出结果为：2
    console.log(2);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>),
    p2 = <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-number">2</span>),
    p3 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>);
<span class="hljs-built_in">Promise</span>.all([p1, p2, p3]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">results</span>) </span>{
    <span class="hljs-comment">//then方法不会被执行</span>
    <span class="hljs-built_in">console</span>.log(results);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>)</span>{
    <span class="hljs-comment">//catch方法将会被执行，输出结果为：2</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
});</code></pre>
<h3 id="articleHeader5">总结 <code>promise.all</code> 的特点</h3>
<p>1、接收一个 <code>Promise</code> 实例的数组或具有 <code>Iterator</code> 接口的对象，</p>
<p>2、如果元素不是 <code>Promise</code> 对象，则使用 <code>Promise.resolve</code> 转成 <code>Promise</code> 对象</p>
<p>3、如果全部成功，状态变为 <code>resolved</code>，返回值将组成一个数组传给回调</p>
<p>4、只要有一个失败，状态就变为 <code>rejected</code>，返回值将直接传递给回调<br><code>all()</code> 的返回值也是新的 <code>Promise</code> 对象</p>
<h3 id="articleHeader6">实现 <code>Promise.all</code> 方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promiseAll</span>(<span class="hljs-params">promises</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">if</span> (!isArray(promises)) {
      <span class="hljs-keyword">return</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'arguments must be an array'</span>));
    }
    <span class="hljs-keyword">var</span> resolvedCounter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> promiseNum = promises.length;
    <span class="hljs-keyword">var</span> resolvedValues = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(promiseNum);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; promiseNum; i++) {
      (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{
        <span class="hljs-built_in">Promise</span>.resolve(promises[i]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
          resolvedCounter++
          resolvedValues[i] = value
          <span class="hljs-keyword">if</span> (resolvedCounter == promiseNum) {
            <span class="hljs-keyword">return</span> resolve(resolvedValues)
          }
        }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
          <span class="hljs-keyword">return</span> reject(reason)
        })
      })(i)
    }
  })
}</code></pre>
<p>npms 地址 <a href="https://www.npmjs.com/package/promise-all-simple" rel="nofollow noreferrer" target="_blank">promise-all-simple</a></p>
<h2 id="articleHeader7">参考</h2>
<p><a href="http://www.jianshu.com/p/48e193c4662e" rel="nofollow noreferrer" target="_blank">自己动手实现ES6 Promise</a></p>
<p><a href="http://liubin.org/promises-book/#ch2-promise-all" rel="nofollow noreferrer" target="_blank">JavaScript Promise迷你书</a></p>
<p><a href="https://itbilu.com/javascript/js/41KMSZ9a.html" rel="nofollow noreferrer" target="_blank">Promise对象Promise.all()方法的使用</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/25178630" rel="nofollow noreferrer" target="_blank">深入 Promise(一)——Promise 实现详解</a></p>
<p><a href="http://coderlt.coding.me/2016/12/03/promise-in-depth-an-introduction-1/" rel="nofollow noreferrer" target="_blank">深入理解 Promise (上)</a></p>
<h2 id="articleHeader8">扩展阅读</h2>
<p><a href="https://i5ting.github.io/asynchronous-flow-control/#101" rel="nofollow noreferrer" target="_blank">深入浅出js（Node.js）异步流程控制</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现 JavaScript 异步方法 Promise.all

## 原文链接
[https://segmentfault.com/a/1190000010765655](https://segmentfault.com/a/1190000010765655)


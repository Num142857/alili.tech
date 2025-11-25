---
title: 'async/await 执行顺序详解' 
date: 2018-12-30 2:30:10
hidden: true
slug: ssp9cs0nrx9
categories: [reprint]
---

{{< raw >}}

                    
<p>随着async/await正式纳入ES7标准，越来越多的人开始研究据说是异步编程终级解决方案的 async/await。但是很多人对这个方法中内部怎么执行的还不是很了解，本文是我看了一遍技术博客<a href="https://segmentfault.com/a/1190000007535316">理解 JavaScript 的 async/await</a>（如果对async／await不熟悉可以先看下这篇文章）后拓展了一下，我理了一下await之后js的执行顺序，希望可以给别人解疑答惑，先简单介绍一下async／await。</p>
<ol>
<li>async/await 是一种编写异步代码的新方法。之前异步代码的方案是回调和 promise。</li>
<li>async/await 是建立在 promise 的基础上。</li>
<li>async/await 像 promise 一样，也是非阻塞的。</li>
<li>async/await 让异步代码看起来、表现起来更像同步代码。这正是其威力所在。</li>
</ol>
<h2 id="articleHeader0">async怎么处理返回值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testAsync() {
    return &quot;hello async&quot;;
}
let result = testAsync();
console.log(result)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"hello async"</span>;
}
<span class="hljs-keyword">let</span> result = testAsync();
<span class="hljs-built_in">console</span>.log(result)</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: &quot;hello async&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-string">"hello async"</span>}</code></pre>
<p>从结果中可以看到async函数返回的是一个promise对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。</p>
<p>如果asyn函数没有返回值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testAsync1() {
    console.log(&quot;hello async&quot;);
}
let result1 = testAsync1();
console.log(result1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hello async"</span>);
}
<span class="hljs-keyword">let</span> result1 = testAsync1();
<span class="hljs-built_in">console</span>.log(result1);</code></pre>
<p>结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hello async
Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>hello async
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: undefined}</code></pre>
<p>结果返回Promise.resolve(undefined)。</p>
<h2 id="articleHeader1">await做了什么处理</h2>
<p>从字面意思上看await就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个promise对象也可以是其他值。</p>
<blockquote><p>很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，<strong><em>实际上await是一个让出线程的标志</em></strong>。await后面的函数会先执行一遍，然后就会跳出整个async函数来执行后面js栈（后面会详述）的代码。等本轮事件循环执行完了之后又会跳回到async函数中等待await<br>后面表达式的返回值，如果返回值为非promise则继续执行async函数后面的代码，否则将返回的promise放入promise队列（Promise的Job Queue）</p></blockquote>
<h2 id="articleHeader2">async/await 执行顺序</h2>
<p>先看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testSometing() {
    console.log(&quot;执行testSometing&quot;);
    return &quot;testSometing&quot;;
}

async function testAsync() {
    console.log(&quot;执行testAsync&quot;);
    return Promise.resolve(&quot;hello async&quot;);
}

async function test() {
    console.log(&quot;test start...&quot;);
    const v1 = await testSometing();//关键点1
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

var promise = new Promise((resolve)=> { console.log(&quot;promise start..&quot;); resolve(&quot;promise&quot;);});//关键点2
promise.then((val)=> console.log(val));

console.log(&quot;test end...&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testSometing</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执行testSometing"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">"testSometing"</span>;
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执行testAsync"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"hello async"</span>);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test start..."</span>);
    <span class="hljs-keyword">const</span> v1 = <span class="hljs-keyword">await</span> testSometing();<span class="hljs-comment">//关键点1</span>
    <span class="hljs-built_in">console</span>.log(v1);
    <span class="hljs-keyword">const</span> v2 = <span class="hljs-keyword">await</span> testAsync();
    <span class="hljs-built_in">console</span>.log(v2);
    <span class="hljs-built_in">console</span>.log(v1, v2);
}

test();

<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise start.."</span>); resolve(<span class="hljs-string">"promise"</span>);});<span class="hljs-comment">//关键点2</span>
promise.then(<span class="hljs-function">(<span class="hljs-params">val</span>)=&gt;</span> <span class="hljs-built_in">console</span>.log(val));

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test end..."</span>)</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test start...
执行testSometing
promise start..
test end...
testSometing
执行testAsync
promise
hello async
testSometing hello async" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">test </span>start...
执行testSometing
promise start..
<span class="hljs-keyword">test </span>end...
testSometing
执行testAsync
promise
hello async
testSometing hello async</code></pre>
<p>当test函数执行到</p>
<blockquote><p>const v1 = await testSometing()；</p></blockquote>
<p>的时候，会先执行testSometing这个函数打印出<strong><em>“执行testSometing”</em></strong>的字符串，然后因为await会让出线程就会区执行后面的</p>
<blockquote><p>var promise = new Promise((resolve)=&gt; { console.log("promise<br>start.."); resolve("promise");});//关键点2</p></blockquote>
<p>然后打印出<strong><em>“promise start..”</em></strong>接下来会把返回的这promise放入promise队列（Promise的Job Queue），继续执行打印<strong><em>“test end...”</em></strong>，等本轮事件循环执行结束后，又会跳回到async函数中（test函数），等待之前await 后面表达式的返回值，因为testSometing 不是async函数，所以返回的是一个字符串<strong><em>“testSometing”</em></strong>，test函数继续执行，执行到</p>
<blockquote><p>const v2 = await testAsync();</p></blockquote>
<p>和之前一样又会跳出test函数，执行后续代码，此时事件循环就到了promise的队列，执行<code>promise.then((val)=&gt; console.log(val));</code>then后面的语句，之后和前面一样又跳回到test函数继续执行。</p>
<p>这个就是在async/await 函数之后js的执行顺序，我们再看一个列子把testSometing函数前面加上async</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testSometing() {
    console.log(&quot;执行testSometing&quot;);
    return &quot;testSometing&quot;;
}

async function testAsync() {
    console.log(&quot;执行testAsync&quot;);
    return Promise.resolve(&quot;hello async&quot;);
}

async function test() {
    console.log(&quot;test start...&quot;);
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

var promise = new Promise((resolve)=> { console.log(&quot;promise start..&quot;); resolve(&quot;promise&quot;);});//3
promise.then((val)=> console.log(val));

console.log(&quot;test end...&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testSometing</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执行testSometing"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">"testSometing"</span>;
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"执行testAsync"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"hello async"</span>);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test start..."</span>);
    <span class="hljs-keyword">const</span> v1 = <span class="hljs-keyword">await</span> testSometing();
    <span class="hljs-built_in">console</span>.log(v1);
    <span class="hljs-keyword">const</span> v2 = <span class="hljs-keyword">await</span> testAsync();
    <span class="hljs-built_in">console</span>.log(v2);
    <span class="hljs-built_in">console</span>.log(v1, v2);
}

test();

<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>)=&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise start.."</span>); resolve(<span class="hljs-string">"promise"</span>);});<span class="hljs-comment">//3</span>
promise.then(<span class="hljs-function">(<span class="hljs-params">val</span>)=&gt;</span> <span class="hljs-built_in">console</span>.log(val));

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test end..."</span>)</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test start...
执行testSometing
promise start..
test end...
promise
testSometing
执行testAsync
hello async
testSometing hello async" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">test </span>start...
执行testSometing
promise start..
<span class="hljs-keyword">test </span>end...
promise
testSometing
执行testAsync
hello async
testSometing hello async</code></pre>
<p>和上一个例子比较发现<code>promise.then((val)=&gt; console.log(val));</code>先与<code>console.log(v1);</code>执行了，原因是因为现在testSometing函数加了async，返回的是一个<code>Promise</code>对象要要等它<code>resolve</code>，所以将当前Promise推入队列，所以会继续跳出test函数执行后续代码。之后就开始执行promise的任务队列了，所以先执行了<code>promise.then((val)=&gt; console.log(val));</code>因为这个Promise对象先推入队列；</p>
<h2 id="articleHeader3">写在最后</h2>
<p>写到这里大家应该已经清楚了使用async/await进行异步操作时js的执行顺序，在研究过程中还发现了js的任务队列执行顺序的问题，就下次再述。如果大家对有什么意见或建议可以指出。本篇是我第一次发布文章，希望大家不吝赐教。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
async/await 执行顺序详解

## 原文链接
[https://segmentfault.com/a/1190000011296839](https://segmentfault.com/a/1190000011296839)


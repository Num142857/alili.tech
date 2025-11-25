---
title: '重构：从Promise到Async/Await' 
date: 2018-12-18 2:30:10
hidden: true
slug: lmxxzbwy7hr
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>摘要：</strong> 夸张点说，技术的发展与历史一样，顺之者昌，逆之者亡。JS开发者们，赶紧拥抱Async/Await吧！</p>
<ul><li>
<strong>GitHub仓库:</strong> <a href="https://github.com/Fundebug/promise-asyncawait" rel="nofollow noreferrer" target="_blank">Fundebug/promise-asyncawait</a>
</li></ul>
<p>早在半年多之前，我就在鼓吹<a href="https://blog.fundebug.com/2017/04/04/nodejs-async-await/" rel="nofollow noreferrer" target="_blank">Async/Await替代Promise的6个理由</a>，似乎还招致了一些<a href="https://cnodejs.org/topic/58e4914e43ee7e7106c13541" rel="nofollow noreferrer" target="_blank">批评</a>。然而，直到最近，我才真正开始进行代码重构，抛弃Promise，全面使用Async/Await。因为，<a href="https://nodejs.org/en/blog/release/v8.9.0/" rel="nofollow noreferrer" target="_blank">Node 8终于LTS了</a>！</p>
<h3 id="articleHeader0">Async/Await真的比Promise好吗？</h3>
<p><strong>是的是的。</strong></p>
<p>这些天，我大概重构了1000行代码，最大的感觉是代码简洁了很多：</p>
<ul>
<li>真正地用同步的方式写异步代码</li>
<li>不用写then及其回调函数，减少代码行数，也避免了代码嵌套</li>
<li>所有异步调用可以写在同一个代码块中，无需定义多余的中间变量</li>
<li>async函数会隐式地返回一个Promise，因此可以直接return变量，无需使用Promise.resolve进行转换</li>
</ul>
<p>下面，我们可以通过一个非常简单的示例来体验一下Async/Await的酸爽：</p>
<h4>示例1</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Promise = require(&quot;bluebird&quot;)
var readFile = Promise.promisify(require(&quot;fs&quot;).readFile)

// 使用Promise
function usePromise()
{
    let a
    readFile(&quot;a.txt&quot;, &quot;utf8&quot;)
        .then(tmp =>
        {
            a = tmp
            return readFile(&quot;b.txt&quot;, &quot;utf8&quot;)
        })
        .then(b =>
        {
            let result = a + b
            console.log(result) // 输出&quot;Hello, Fundebug!&quot;
        })

}

// 使用Async/Await
async function useAsyncAwait()
{
    let a = await readFile(&quot;a.txt&quot;, &quot;utf8&quot;)
    let b = await readFile(&quot;b.txt&quot;, &quot;utf8&quot;)
    let result = a + b
    console.log(result) // 输出&quot;Hello, Fundebug!&quot;
}

usePromise()
useAsyncAwait()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bluebird"</span>)
<span class="hljs-keyword">var</span> readFile = <span class="hljs-built_in">Promise</span>.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>).readFile)

<span class="hljs-comment">// 使用Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">usePromise</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> a
    readFile(<span class="hljs-string">"a.txt"</span>, <span class="hljs-string">"utf8"</span>)
        .then(<span class="hljs-function"><span class="hljs-params">tmp</span> =&gt;</span>
        {
            a = tmp
            <span class="hljs-keyword">return</span> readFile(<span class="hljs-string">"b.txt"</span>, <span class="hljs-string">"utf8"</span>)
        })
        .then(<span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span>
        {
            <span class="hljs-keyword">let</span> result = a + b
            <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 输出"Hello, Fundebug!"</span>
        })

}

<span class="hljs-comment">// 使用Async/Await</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useAsyncAwait</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">"a.txt"</span>, <span class="hljs-string">"utf8"</span>)
    <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">"b.txt"</span>, <span class="hljs-string">"utf8"</span>)
    <span class="hljs-keyword">let</span> result = a + b
    <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 输出"Hello, Fundebug!"</span>
}

usePromise()
useAsyncAwait()</code></pre>
<p>由示例可知，使用Async/Await极大地简化了代码，使得代码可读性提高了非常多。</p>
<h3 id="articleHeader1">Async/Await真的替代了Promise？</h3>
<p><strong>是的是的。</strong></p>
<p>对于<a href="https://blog.fundebug.com/2017/04/04/nodejs-async-await/" rel="nofollow noreferrer" target="_blank">Async/Await替代Promise的6个理由</a>，批评者执着于Async/Await是基于Promise实现的，因此<strong>替代</strong>这个词不准确，这就有点尴尬了。</p>
<p>一方面，这里替代的是<strong>异步代码的编写方式</strong>，并非完全抛弃大家心爱的<strong>Promise</strong>，地球人都知道Async/Await是基于Promise的，不用太伤心；另一方面，<strong>Promise</strong>是基于<strong>回调函数</strong>实现的，那<strong>Promise</strong>也没有替代<strong>回调函数</strong>咯？</p>
<p>重构代码之后，我仍然用到了Promise库<a href="http://bluebirdjs.com/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">bluebird</a>。"Talk is cheap, Show me the code!"，大家不妨看看两个示例。</p>
<h4>示例2：Promise.promisify</h4>
<p>使用<a href="http://bluebirdjs.com/docs/api/promise.promisify.html" rel="nofollow noreferrer" target="_blank">Promise.promisify</a>将不支持<strong>Promise</strong>的方法Promise化，调用异步接口的时候有两种方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Promise = require(&quot;bluebird&quot;)
var readFile = Promise.promisify(require(&quot;fs&quot;).readFile)

// 使用Promise
function usePromise()
{
    readFile(&quot;b.txt&quot;, &quot;utf8&quot;)
        .then(b =>
        {
            console.log(b)
        })
}

// 使用Async/Await
async function useAsyncAwait()
{
    var b = await readFile(&quot;b.txt&quot;, &quot;utf8&quot;)
    console.log(b) // 输出&quot;Fundebug!&quot;
}

usePromise()
useAsyncAwait()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bluebird"</span>)
<span class="hljs-keyword">var</span> readFile = <span class="hljs-built_in">Promise</span>.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>).readFile)

<span class="hljs-comment">// 使用Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">usePromise</span>(<span class="hljs-params"></span>)
</span>{
    readFile(<span class="hljs-string">"b.txt"</span>, <span class="hljs-string">"utf8"</span>)
        .then(<span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span>
        {
            <span class="hljs-built_in">console</span>.log(b)
        })
}

<span class="hljs-comment">// 使用Async/Await</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useAsyncAwait</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">var</span> b = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">"b.txt"</span>, <span class="hljs-string">"utf8"</span>)
    <span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// 输出"Fundebug!"</span>
}

usePromise()
useAsyncAwait()</code></pre>
<p><em><a href="https://fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>是全栈JavaScript错误监控平台，支持各种前端和后端框架，可以帮助您第一时间发现BUG！</em></p>
<h4>示例3：Promise.map</h4>
<p>使用<a href="http://bluebirdjs.com/docs/api/promise.map.html" rel="nofollow noreferrer" target="_blank">Promise.map</a>读取多个文件的数据，调用异步接口的时候有两种方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Promise = require(&quot;bluebird&quot;)
var readFile = Promise.promisify(require(&quot;fs&quot;).readFile)
var files = [&quot;a.txt&quot;, &quot;b.txt&quot;]

// 使用Promise
function usePromise()
{
    Promise.map(files, file =>
        {
            return readFile(file, &quot;utf8&quot;)
        })
        .then(results =>
        {
            console.log(results)
        })
}

// 使用Async/Await
async function useAsyncAwait()
{
    var results = await Promise.map(files, file =>
    {
        return readFile(file, &quot;utf8&quot;)
    })
    console.log(results)
}

usePromise()
useAsyncAwait()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bluebird"</span>)
<span class="hljs-keyword">var</span> readFile = <span class="hljs-built_in">Promise</span>.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>).readFile)
<span class="hljs-keyword">var</span> files = [<span class="hljs-string">"a.txt"</span>, <span class="hljs-string">"b.txt"</span>]

<span class="hljs-comment">// 使用Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">usePromise</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-built_in">Promise</span>.map(files, file =&gt;
        {
            <span class="hljs-keyword">return</span> readFile(file, <span class="hljs-string">"utf8"</span>)
        })
        .then(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span>
        {
            <span class="hljs-built_in">console</span>.log(results)
        })
}

<span class="hljs-comment">// 使用Async/Await</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useAsyncAwait</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.map(files, file =&gt;
    {
        <span class="hljs-keyword">return</span> readFile(file, <span class="hljs-string">"utf8"</span>)
    })
    <span class="hljs-built_in">console</span>.log(results)
}

usePromise()
useAsyncAwait()</code></pre>
<p>没错，我的确使用了Promise库，readFile与Promise.map都是Promise函数。但是，在调用readFile与Promise.map函数时，使用Async/Await与使用Promise是两种不同写法，它们是相互替代的关系。</p>
<h3 id="articleHeader2">Async/Await有什么问题吗？</h3>
<p><strong>有啊有啊。</strong></p>
<p>使用了<strong>await</strong>的函数定义时要加一个<strong>async</strong>，调用异步函数的时候需要加一个<strong>await</strong>，这玩意写多了也觉着烦，有时候还容易忘掉。不写<strong>async</strong>代码直接报错，不写<strong>await</strong>代码执行会出错。</p>
<h4>示例4</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Promise = require(&quot;bluebird&quot;)
var readFile = Promise.promisify(require(&quot;fs&quot;).readFile)

// 没有Async
function withoutAsync()
{
    let b = await readFile(&quot;b.txt&quot;, &quot;utf8&quot;) // 报错&quot;SyntaxError: Unexpected identifier&quot;
    console.log(b) 
}

// 没有await
async function withoutAwait()
{
    let b = readFile(&quot;b.txt&quot;, &quot;utf8&quot;)
    console.log(b) // 打印&quot;Promise...&quot;
}

withoutAsync()
withoutAwait()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bluebird"</span>)
<span class="hljs-keyword">var</span> readFile = <span class="hljs-built_in">Promise</span>.promisify(<span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>).readFile)

<span class="hljs-comment">// 没有Async</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withoutAsync</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">"b.txt"</span>, <span class="hljs-string">"utf8"</span>) <span class="hljs-comment">// 报错"SyntaxError: Unexpected identifier"</span>
    <span class="hljs-built_in">console</span>.log(b) 
}

<span class="hljs-comment">// 没有await</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withoutAwait</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> b = readFile(<span class="hljs-string">"b.txt"</span>, <span class="hljs-string">"utf8"</span>)
    <span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// 打印"Promise..."</span>
}

withoutAsync()
withoutAwait()</code></pre>
<p>既然Async/Await写着有点添乱，可不可以不写呢？我想以后应该是可以的，只要能够自动识别异步代码就行了，这应该也是未来的发展方向。至于说如何实现，那我就不知道了哎。</p>
<h3 id="articleHeader3">总结</h3>
<p>JavaScript的异步编写方式，从回调函数到Promise再到Async/Await，表面上只是写法的变化，本质上则是语言层的一次次抽象，让我们可以<strong>用更简单的方式实现同样的功能</strong>，而程序员不需要去考虑代码是如何执行的。在我看来，这样的进步应该不会停止，有一天我们也许不用写Async/Await了！</p>
<h3 id="articleHeader4">参考</h3>
<ul>
<li><a href="https://blog.fundebug.com/2017/04/04/nodejs-async-await/" rel="nofollow noreferrer" target="_blank">Async/Await替代Promise的6个理由</a></li>
<li><a href="https://blog.fundebug.com/2017/10/16/async-await-simplify-javascript/" rel="nofollow noreferrer" target="_blank">Async/Await是这样简化JavaScript代码的</a></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV00GN?w=270&amp;h=370" src="https://static.alili.tech/img/bV00GN?w=270&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2017/12/13/reconstruct-from-promise-to-async-await/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2017/12/13/reconstruct-from-promise-to-async-await/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重构：从Promise到Async/Await

## 原文链接
[https://segmentfault.com/a/1190000012821826](https://segmentfault.com/a/1190000012821826)


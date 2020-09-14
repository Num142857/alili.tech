---
title: '使用ES2017 async/await函数的注意点' 
date: 2019-01-19 2:30:10
hidden: true
slug: pp753xxfeq
categories: [reprint]
---

{{< raw >}}

                    
<p>随着node 7.6.0正式实装async/await函数，js的异步编程变的比以往更加容易。但是，在我们全面投入async/await的怀抱之前，有必要对这个特性做一些细致的了解。</p>
<h2 id="articleHeader0">书写形式</h2>
<p>基本上，任何一个函数都可以成为<code>async</code>函数，以下都是合法的书写形式：</p>
<ul>
<li><p>函数声明<br><code>async function foo () {}</code></p></li>
<li><p>函数表达式<br><code>const foo = async function () {}</code></p></li>
<li><p>方法定义<br><code>const obj = { async foo () {} }</code></p></li>
<li><p>箭头函数<br><code>async () =&gt; {}</code></p></li>
</ul>
<h2 id="articleHeader1">
<code>async</code>函数总是返回<code>Promise</code>
</h2>
<p>即使返回值只是一个primitive值，<code>async</code>函数也会通过<code>return</code>自动将返回值包装成一个<code>Promise</code>对象返回。<br>因此，下面两组函数是等价的。</p>
<h3 id="articleHeader2">正常 (Fulfill)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// async函数
async function foo () {
  return 'a'
}

// Promise
function foo () {
  return Promise.resolve('a')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// async函数</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'a'</span>
}

<span class="hljs-comment">// Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'a'</span>)
}</code></pre>
<h3 id="articleHeader3">异常 (Reject)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// async函数
async function foo () {
  throw new Error('error')
}

// Promise
function foo () {
  return Promise.reject(new Error('error'))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// async函数</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)
}

<span class="hljs-comment">// Promise</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>))
}</code></pre>
<blockquote><p><strong>注意：</strong>当返回值本身就是一个<code>Promise</code>对象时，<code>async</code>函数的<code>return</code>并不会对返回值进行二次包装。</p></blockquote>
<h2 id="articleHeader4">
<code>await</code>总是按顺序执行</h2>
<p>使用<code>async</code>函数之前，我们还得搞清楚它的运行机制。尤其是在执行顺序上，完全用同步的思维也许并不适用于<code>async</code>函数。</p>
<p>考虑下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncGet (x) {
  return new Promise(resolve => setTimeout(() => {
    console.log('a')
    resolve(x)
  }, 500))
}

async function test () {
  console.log('b')
  const x = 3 + 5
  console.log(x)

  const a = await asyncGet(1)
  console.log(a)

  const b = await asyncGet(2)
  console.log(b)

  console.log('c')  
  return a + b
}

const now = Date.now()
console.log('d')
test().then(x => {
  console.log(x)
  console.log(`elapsed: ${Date.now() - now}`)
})
console.log('f')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncGet</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>)
    resolve(x)
  }, <span class="hljs-number">500</span>))
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b'</span>)
  <span class="hljs-keyword">const</span> x = <span class="hljs-number">3</span> + <span class="hljs-number">5</span>
  <span class="hljs-built_in">console</span>.log(x)

  <span class="hljs-keyword">const</span> a = <span class="hljs-keyword">await</span> asyncGet(<span class="hljs-number">1</span>)
  <span class="hljs-built_in">console</span>.log(a)

  <span class="hljs-keyword">const</span> b = <span class="hljs-keyword">await</span> asyncGet(<span class="hljs-number">2</span>)
  <span class="hljs-built_in">console</span>.log(b)

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c'</span>)  
  <span class="hljs-keyword">return</span> a + b
}

<span class="hljs-keyword">const</span> now = <span class="hljs-built_in">Date</span>.now()
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'d'</span>)
test().then(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(x)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`elapsed: <span class="hljs-subst">${<span class="hljs-built_in">Date</span>.now() - now}</span>`</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'f'</span>)</code></pre>
<ol>
<li><p><code>async</code>函数和普通函数一样按顺序执行，同时，在执行到<code>await</code>语句时，返回一个<code>Promise</code>对象</p></li>
<li><p><code>await</code>可以理解为将<code>async</code>函数挂起，直到等待的<code>Promise</code>被fulfill或者reject，再继续执行之后的代码</p></li>
<li><p><code>async</code>函数的返回值和普通<code>Promise</code>没有区别</p></li>
</ol>
<p>因此，上面代码输出应该是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d
b
8
f
a
1
a
2
c
3
elapsed: 1010" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">d
b
8
f
a
1
a
2
c
3
elapsed: 1010</code></pre>
<blockquote><p>注意 d 和 f 中间的输出</p></blockquote>
<p>让我们再来看一个混合了Promise的版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncGet (x) {
  return new Promise(resolve => setTimeout(() => {
    console.log('a')
    resolve(x)
  }, 500))
}

async function test () {
  console.log('b')
  const x = 3 + 5
  console.log(x)

  const [a, b] = await Promise.all([
    asyncGet(1),
    asyncGet(2)
  ])

  console.log('c')  
  return a + b
}

const now = Date.now()
console.log('d')
test().then(x => {
  console.log(x)
  console.log(`elapsed: ${Date.now() - now}`)
})
console.log('f')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncGet</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>)
    resolve(x)
  }, <span class="hljs-number">500</span>))
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b'</span>)
  <span class="hljs-keyword">const</span> x = <span class="hljs-number">3</span> + <span class="hljs-number">5</span>
  <span class="hljs-built_in">console</span>.log(x)

  <span class="hljs-keyword">const</span> [a, b] = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([
    asyncGet(<span class="hljs-number">1</span>),
    asyncGet(<span class="hljs-number">2</span>)
  ])

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c'</span>)  
  <span class="hljs-keyword">return</span> a + b
}

<span class="hljs-keyword">const</span> now = <span class="hljs-built_in">Date</span>.now()
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'d'</span>)
test().then(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(x)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`elapsed: <span class="hljs-subst">${<span class="hljs-built_in">Date</span>.now() - now}</span>`</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'f'</span>)</code></pre>
<p>输出结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d
b
8
f
a
a
c
3
elapsed: 509" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">d
b
8
f
a
a
c
3
elapsed: 509</code></pre>
<p>注意到<code>elapsed</code>的差别了吗？这就是为什么我们说<code>await</code>总是顺序执行的。不同的await之间无法并行执行，想要真正的完全异步还得借助类似<code>Promise.all</code>这样的方法。</p>
<h2 id="articleHeader5">async函数和callback</h2>
<p><code>await</code>只能能影响直接包裹它的<code>async</code>函数。因此在callback函数中的<code>await</code>并不会挂起整个<code>async</code>函数的执行。</p>
<p>一种常见的错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getAll (vals) {
  return vals.map(v => await asyncGet(v))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAll</span> (<span class="hljs-params">vals</span>) </span>{
  <span class="hljs-keyword">return</span> vals.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-keyword">await</span> asyncGet(v))
}</code></pre>
<p>这段代码有语法错误，<code>await</code>并不在<code>async</code>函数内部。如果给<code>map</code>的callback加上<code>async</code>呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getAll (vals) {
  return vals.map(async v => await asyncGet(v))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAll</span> (<span class="hljs-params">vals</span>) </span>{
  <span class="hljs-keyword">return</span> vals.map(<span class="hljs-keyword">async</span> v =&gt; <span class="hljs-keyword">await</span> asyncGet(v))
}</code></pre>
<p>这段代码虽然能执行，但还有两个问题。</p>
<ol>
<li><p>返回一个<code>Promise</code>对象的数组，并不是我们期待的value数组</p></li>
<li><p><code>await</code>只会暂停<code>map</code>的callback，因此<code>map</code>完成时，不能保证<code>asyncGet</code>也全部完成</p></li>
</ol>
<p>正确的写法还得借助<code>Promise.all</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getAll (vals) {
  return Promise.all(vals.map(v => asyncGet(v)))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAll</span> (<span class="hljs-params">vals</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(vals.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> asyncGet(v)))
}</code></pre>
<h2 id="articleHeader6">总结</h2>
<p>从上我们可以看出，<code>Promise</code>是<code>async</code>函数的基础，想要愉快的使用<code>async</code>函数，必须对<code>Promise</code>有比较深入的理解。甚至一些常见的任务，仅仅依靠<code>async</code>函数无法实现。<br>希望大家看完本文后能对<code>async</code>函数有个更全面的认识，这样使用起来才会更加顺手。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用ES2017 async/await函数的注意点

## 原文链接
[https://segmentfault.com/a/1190000008617167](https://segmentfault.com/a/1190000008617167)


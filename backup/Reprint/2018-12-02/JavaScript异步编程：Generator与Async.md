---
title: 'JavaScript异步编程：Generator与Async' 
date: 2018-12-02 2:30:15
hidden: true
slug: e2be1eha10r
categories: [reprint]
---

{{< raw >}}

                    
<p>从<code>Promise</code>开始，JavaScript就在引入新功能，来帮助更简单的方法来处理异步编程，帮助我们远离回调地狱。  <br><code>Promise</code>是下边要讲的<code>Generator</code>/<code>yield</code>与<code>async</code>/<code>await</code>的基础，希望你已经提前了解了它。  </p>
<p>在大概<code>ES6</code>的时代，推出了<code>Generator</code>/<code>yield</code>两个关键字，使用<code>Generator</code>可以很方便的帮助我们建立一个处理<code>Promise</code>的解释器。</p>
<p>然后，在<code>ES7</code>左右，我们又得到了<code>async</code>/<code>await</code>这样的语法，可以让我们以接近编写同步代码的方式来编写异步代码（无需使用<code>.then()</code>或者回调函数）。</p>
<p>两者都能够帮助我们很方便的进行异步编程，但同样，这两者之间也是有不少区别的。</p>
<h2 id="articleHeader0">Generator</h2>
<p><code>Generator</code>是一个函数，可以在函数内部通过<code>yield</code>返回一个值（<strong>此时，<code>Generator</code>函数的执行会暂定，直到下次触发<code>.next()</code></strong>）  <br>创建一个<code>Generator</code>函数的方法是在<code>function</code>关键字后添加<code>*</code>标识。</p>
<p>在调用一个<code>Generator</code>函数后，并不会立即执行其中的代码，函数会返回一个<code>Generator</code>对象，通过调用对象的<code>next</code>函数，可以获得<code>yield</code>/<code>return</code>的返回值。  <br>无论是触发了<code>yield</code>还是<code>return</code>，<code>next()</code>函数总会返回一个带有<code>value</code>和<code>done</code>属性的对象。  <br><code>value</code>为返回值，<code>done</code>则是一个<code>Boolean</code>对象，用来标识<code>Generator</code>是否还能继续提供返回值。  <br><em>P.S. <code>Generator</code>函数的执行时惰性的，<code>yield</code>后的代码只在触发<code>next</code>时才会执行</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function * oddGenerator () {
  yield 1
  yield 3

  return 5
}

let iterator = oddGenerator()

let first = iterator.next()  // { value: 1, done: false }
let second = iterator.next() // { value: 3, done: false }
let third = iterator.next()  // { value: 5, done: true  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">oddGenerator</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">3</span>

  <span class="hljs-keyword">return</span> <span class="hljs-number">5</span>
}

<span class="hljs-keyword">let</span> iterator = oddGenerator()

<span class="hljs-keyword">let</span> first = iterator.next()  <span class="hljs-comment">// { value: 1, done: false }</span>
<span class="hljs-keyword">let</span> second = iterator.next() <span class="hljs-comment">// { value: 3, done: false }</span>
<span class="hljs-keyword">let</span> third = iterator.next()  <span class="hljs-comment">// { value: 5, done: true  }</span></code></pre>
<h3 id="articleHeader1">next的参数传递</h3>
<p>我们可以在调用<code>next()</code>的时候传递一个参数，可以在上次<code>yield</code>前接收到这个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function * outputGenerator () {
  let ret1 = yield 1
  console.log(`got ret1: ${ret1}`)
  let ret2 = yield 2
  console.log(`got ret2: ${ret2}`)
}

let iterator = outputGenerator()

iterator.next(1)
iterator.next(2) // got ret1: 2
iterator.next(3) // got ret2: 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">outputGenerator</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> ret1 = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`got ret1: <span class="hljs-subst">${ret1}</span>`</span>)
  <span class="hljs-keyword">let</span> ret2 = <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`got ret2: <span class="hljs-subst">${ret2}</span>`</span>)
}

<span class="hljs-keyword">let</span> iterator = outputGenerator()

iterator.next(<span class="hljs-number">1</span>)
iterator.next(<span class="hljs-number">2</span>) <span class="hljs-comment">// got ret1: 2</span>
iterator.next(<span class="hljs-number">3</span>) <span class="hljs-comment">// got ret2: 3</span></code></pre>
<p>第一眼看上去可能会有些诡异，为什么第一条<code>log</code>是在第二次调用<code>next</code>时才进行输出的  <br>这就又要说到上边的<code>Generator</code>的实现了，上边说到了，<code>yield</code>与<code>return</code>都是用来返回值的语法。  <br>函数在执行时遇到这两个关键字后就会暂停执行，等待下次激活。  <br>然后<code>let ret1 = yield 1</code>，这是一个赋值表达式，也就是说会先执行<code>=</code>右边的部分，在<code>=</code>右边执行的过程中遇到了<code>yield</code>关键字，函数也就在此处暂停了，在下次触发<code>next()</code>时才被激活，此时，我们继续进行上次未完成的赋值语句<code>let ret1 = XXX</code>，并在再次遇到<code>yield</code>时暂停。  <br>这也就解释了为什么<strong>第二次调用<code>next()</code>的参数</strong>会被<strong>第一次<code>yield</code>赋值的变量接收到</strong></p>
<h3 id="articleHeader2">用作迭代器使用</h3>
<p>因为<code>Generator</code>对象是一个迭代器，所以我们可以直接用于<code>for of</code>循环：</p>
<blockquote>但是要注意的是，用作迭代器中的使用，则只会作用于<code>yield</code>  <br><code>return</code>的返回值不计入迭代</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function * oddGenerator () {
  yield 1
  yield 3
  yield 5

  return 'won\'t be iterate'
}

for (let value of oddGenerator()) {
  console.log(value)
}
// > 1
// > 3
// > 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">oddGenerator</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">3</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">5</span>

  <span class="hljs-keyword">return</span> <span class="hljs-string">'won\'t be iterate'</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> oddGenerator()) {
  <span class="hljs-built_in">console</span>.log(value)
}
<span class="hljs-comment">// &gt; 1</span>
<span class="hljs-comment">// &gt; 3</span>
<span class="hljs-comment">// &gt; 5</span></code></pre>
<h3 id="articleHeader3">Generator函数内部的Generator</h3>
<p>除了<code>yield</code>语法以外，其实还有一个<code>yield*</code>语法，可以粗略的理解为是<code>Generator</code>函数版的<code>[...]</code>  <br>用来展开<code>Generator</code>迭代器的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function * gen1 () {
  yield 1
  yield* gen2()
  yield 5
}

function * gen2 () {
  yield 2
  yield 3
  yield 4
  return 'won\'t be iterate'
}

for (let value of gen1()) {
  console.log(value)
}
// > 1
// > 2
// > 3
// > 4
// > 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">gen1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
  <span class="hljs-keyword">yield</span>* gen2()
  <span class="hljs-keyword">yield</span> <span class="hljs-number">5</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">gen2</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">3</span>
  <span class="hljs-keyword">yield</span> <span class="hljs-number">4</span>
  <span class="hljs-keyword">return</span> <span class="hljs-string">'won\'t be iterate'</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> gen1()) {
  <span class="hljs-built_in">console</span>.log(value)
}
<span class="hljs-comment">// &gt; 1</span>
<span class="hljs-comment">// &gt; 2</span>
<span class="hljs-comment">// &gt; 3</span>
<span class="hljs-comment">// &gt; 4</span>
<span class="hljs-comment">// &gt; 5</span></code></pre>
<h3 id="articleHeader4">模拟实现Promise执行器</h3>
<p>然后我们结合着<code>Promise</code>，来实现一个简易的执行器。</p>
<blockquote>最受欢迎的类似的库是： <a href="https://www.npmjs.com/package/co" rel="nofollow noreferrer" target="_blank">co</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function run (gen) {
  gen = gen()
  return next(gen.next())

  function next ({done, value}) {
    return new Promise(resolve => {
     if (done) { // finish
       resolve(value)
     } else { // not yet
       value.then(data => {
         next(gen.next(data)).then(resolve)
       })
     }
   })
  }
}

function getRandom () {
  return new Promise(resolve => {
    setTimeout(_ => resolve(Math.random() * 10 | 0), 1000)
  })
}

function * main () {
  let num1 = yield getRandom()
  let num2 = yield getRandom()

  return num1 + num2
}

run(main).then(data => {
  console.log(`got data: ${data}`);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span> (<span class="hljs-params">gen</span>) </span>{
  gen = gen()
  <span class="hljs-keyword">return</span> next(gen.next())

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params">{done, value}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
     <span class="hljs-keyword">if</span> (done) { <span class="hljs-comment">// finish</span>
       resolve(value)
     } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// not yet</span>
       value.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
         next(gen.next(data)).then(resolve)
       })
     }
   })
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRandom</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> resolve(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">10</span> | <span class="hljs-number">0</span>), <span class="hljs-number">1000</span>)
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> num1 = <span class="hljs-keyword">yield</span> getRandom()
  <span class="hljs-keyword">let</span> num2 = <span class="hljs-keyword">yield</span> getRandom()

  <span class="hljs-keyword">return</span> num1 + num2
}

run(main).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`got data: <span class="hljs-subst">${data}</span>`</span>);
})</code></pre>
<blockquote>一个简单的解释器的模拟（仅作举例说明）</blockquote>
<p>在例子中，我们约定<code>yield</code>后边的必然是一个<code>Promise</code>函数  <br>我们只看<code>main()</code>函数的代码，使用<code>Generator</code>确实能够让我们让近似同步的方式来编写异步代码  <br>但是，这样写就意味着我们必须有一个外部函数负责帮我们执行<code>main()</code>函数这个<code>Generator</code>，并处理其中生成的<code>Promise</code>，然后在<code>then</code>回调中将结果返回到<code>Generator</code>函数，以便可以执行下边的代码。</p>
<h2 id="articleHeader5">Async</h2>
<p>我们使用<code>async</code>/<code>await</code>来重写上边的<code>Generator</code>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getRandom () {
  return new Promise(resolve => {
    setTimeout(_ => resolve(Math.random() * 10 | 0), 1000)
  })
}

async function main () {
  let num1 = await getRandom()
  let num2 = await getRandom()

  return num1 + num2
}

console.log(`got data: ${await main()}`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRandom</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> resolve(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">10</span> | <span class="hljs-number">0</span>), <span class="hljs-number">1000</span>)
  })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> num1 = <span class="hljs-keyword">await</span> getRandom()
  <span class="hljs-keyword">let</span> num2 = <span class="hljs-keyword">await</span> getRandom()

  <span class="hljs-keyword">return</span> num1 + num2
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`got data: <span class="hljs-subst">${<span class="hljs-keyword">await</span> main()}</span>`</span>)</code></pre>
<p>这样看上去，好像我们从<code>Generator</code>/<code>yield</code>换到<code>async</code>/<code>await</code>只需要把<code>*</code>都改为<code>async</code>，<code>yield</code>都改为<code>await</code>就可以了。<br>所以很多人都直接拿<code>Generator</code>/<code>yield</code>来解释<code>async</code>/<code>await</code>的行为，但这会带来如下几个问题：</p>
<ol>
<li>
<code>Generator</code>有其他的用途，而不仅仅是用来帮助你处理<code>Promise</code>
</li>
<li>这样的解释让那些不熟悉这两者的人理解起来更困难（因为你还要去解释那些类似<code>co</code>的库）</li>
</ol>
<blockquote>
<code>async</code>/<code>await</code>是处理<code>Promise</code>的一个极其方便的方法，但如果使用不当的话，也会造成一些令人头疼的问题</blockquote>
<h3 id="articleHeader6">Async函数始终返回一个Promise</h3>
<p>一个<code>async</code>函数，无论你<code>return 1</code>或者<code>throw new Error()</code>。  <br>在调用方来讲，接收到的始终是一个<code>Promise</code>对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function throwError () {
  throw new Error()
}
async function returnNumber () {
  return 1
}

console.log(returnNumber() instanceof Promise) // true
console.log(throwError() instanceof Promise)   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throwError</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>()
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">returnNumber</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
}

<span class="hljs-built_in">console</span>.log(returnNumber() <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(throwError() <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>)   <span class="hljs-comment">// true</span></code></pre>
<p>也就是说，无论函数是做什么用的，你都要按照<code>Promise</code>的方式来处理它。</p>
<h3 id="articleHeader7">Await是按照顺序执行的，并不能并行执行</h3>
<p><code>JavaScript</code>是单线程的，这就意味着<code>await</code>一只能一次处理一个，如果你有多个<code>Promise</code>需要处理，则就意味着，你要等到前一个<code>Promise</code>处理完成才能进行下一个的处理，这就意味着，如果我们同时发送大量的请求，这样处理就会非常慢，<code>one by one</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bannerImages = []

async function getImageInfo () {
  return bannerImages.map(async banner => await getImageInfo(banner))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> bannerImages = []

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImageInfo</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> bannerImages.map(<span class="hljs-keyword">async</span> banner =&gt; <span class="hljs-keyword">await</span> getImageInfo(banner))
}</code></pre>
<p>就像这样的四个定时器，我们需要等待<code>4s</code>才能执行完毕：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function delay () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

let tasks = [1, 2, 3, 4]

async function runner (tasks) {
  for (let task of tasks) {
    await delay()
  }
}

console.time('runner')
await runner(tasks)
console.timeEnd('runner')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delay</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>))
}

<span class="hljs-keyword">let</span> tasks = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runner</span> (<span class="hljs-params">tasks</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> task <span class="hljs-keyword">of</span> tasks) {
    <span class="hljs-keyword">await</span> delay()
  }
}

<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'runner'</span>)
<span class="hljs-keyword">await</span> runner(tasks)
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'runner'</span>)</code></pre>
<p>像这种情况，我们可以进行如下优化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function delay () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

let tasks = [1, 2, 3, 4]

async function runner (tasks) {
  tasks = tasks.map(delay)
  await Promise.all(tasks)
}

console.time('runner')
await runner(tasks)
console.timeEnd('runner')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delay</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>))
}

<span class="hljs-keyword">let</span> tasks = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runner</span> (<span class="hljs-params">tasks</span>) </span>{
  tasks = tasks.map(delay)
  <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(tasks)
}

<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'runner'</span>)
<span class="hljs-keyword">await</span> runner(tasks)
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'runner'</span>)</code></pre>
<blockquote>草案中提到过<code>await*</code>，但现在貌似还不是标准，所以还是采用<code>Promise.all</code>包裹一层的方法来实现</blockquote>
<p>我们知道，<code>Promise</code>对象在创建时就会执行函数内部的代码，也就意味着，在我们使用<code>map</code>创建这个数组时，所有的<code>Promise</code>代码都会执行，也就是说，所有的请求都会同时发出去，然后我们通过<code>await Promise.all</code>来监听所有<code>Promise</code>的响应。</p>
<h2 id="articleHeader8">结论</h2>
<p><code>Generator</code>与<code>async function</code>都是返回一个特定类型的对象：</p>
<ol>
<li>
<code>Generator</code>: 一个类似<code>{ value: XXX, done: true }</code>这样结构的<code>Object</code>
</li>
<li>
<code>Async</code>: 始终返回一个<code>Promise</code>，使用<code>await</code>或者<code>.then()</code>来获取返回值</li>
</ol>
<p><code>Generator</code>是属于生成器，一种特殊的迭代器，用来解决异步回调问题感觉有些不务正业了。。<br>而<code>async</code>则是为了更简洁的使用<code>Promise</code>而提出的语法，相比<code>Generator + co</code>这种的实现方式，更为专注，生来就是为了处理异步编程。</p>
<p>现在已经是<code>2018</code>年了，<code>async</code>也是用了好久，就让<code>Generator</code>去做他该做的事情吧。。</p>
<h2 id="articleHeader9">参考资料</h2>
<ul>
<li><a href="https://medium.com/front-end-hacking/modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await-550275cbe433" rel="nofollow noreferrer" target="_blank">modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await</a></li>
<li><a href="http://2ality.com/2016/10/async-function-tips.html" rel="nofollow noreferrer" target="_blank">async-function-tips</a></li>
</ul>
<p>示例代码：<a href="https://github.com/Jiasm/code-demo-resource/tree/master/generator-async" rel="nofollow noreferrer" target="_blank">code-resource</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript异步编程：Generator与Async

## 原文链接
[https://segmentfault.com/a/1190000014747477](https://segmentfault.com/a/1190000014747477)


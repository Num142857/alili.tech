---
title: '实现compose的五种思路' 
date: 2018-12-29 2:30:10
hidden: true
slug: cyf40cywhd
categories: [reprint]
---

{{< raw >}}

                    
<p>好久没有更新了，最近学习的过程中一直在用联想的思维来去看问题，<code>javascript</code>是一门非常灵活的语言，集合了好多语言的特性和多种编程模式，对于<code>compose</code>的实现，就有非常多的思路，每一种思路都有自己的特点，实现之后，有种殊途同归的快感。下面就是我总结的实现<code>compose</code>函数的五种思路。</p>
<ul>
<li>面向过程</li>
<li>函数组合（reduce）</li>
<li>函数交织（AOP编程）</li>
<li>Promise（sequence）</li>
<li>Generator（yield）</li>
</ul>
<h2 id="articleHeader0">什么是compose</h2>
<p>简单回顾一下<code>compose</code>，<code>compose</code>就是执行一系列的任务（函数），比如有以下任务队列，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let tasks = [step1, step2, step3, step4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code style="word-break: break-word; white-space: initial;">let tasks = [step1, step2, step3, step4]</code></pre>
<p>每一个<code>step</code>都是一个步骤，按照步骤一步一步的执行到结尾，这就是一个<code>compose</code><br><code>compose</code>在函数式编程中是一个很重要的工具函数，在这里实现的<code>compose</code>有三点说明</p>
<ul>
<li>第一个函数是多元的（接受多个参数），后面的函数都是单元的（接受一个参数）</li>
<li>执行顺序的自右向左的</li>
<li>所有函数的执行都是同步的（异步的后面文章会讲到）</li>
</ul>
<p>还是用一个例子来说，比如有以下几个函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let init = (...args) => args.reduce((ele1, ele2) => ele1 + ele2, 0)
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> init = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> args.reduce(<span class="hljs-function">(<span class="hljs-params">ele1, ele2</span>) =&gt;</span> ele1 + ele2, <span class="hljs-number">0</span>)
<span class="hljs-keyword">let</span> step2 = <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val + <span class="hljs-number">2</span>
<span class="hljs-keyword">let</span> step3 = <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val + <span class="hljs-number">3</span>
<span class="hljs-keyword">let</span> step4 = <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val + <span class="hljs-number">4</span></code></pre>
<p>这几个函数组成一个任务队列</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="steps = [step4, step3, step2, init]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>steps = [step4, step3, step2, init]
</code></pre>
<p>使用<code>compose</code>组合这个队列并执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let composeFunc = compose(...steps)

console.log(composeFunc(1, 2, 3))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> composeFunc = compose(<span class="hljs-params">...</span>steps)

console.<span class="hljs-keyword">log</span>(composeFunc(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>))</code></pre>
<p><strong>执行过程</strong><br><strong>6 -&gt; 6 + 2 = 8 -&gt; 8 + 3 = 11 -&gt; 11 + 4 = 15</strong><br>所以流程就是从<code>init</code>自右到左依次执行，下一个任务的参数是上一个任务的返回结果，并且任务都是同步的，这样就能保证任务可以按照有序的方向和有序的时间执行。</p>
<h2 id="articleHeader1">实现compose的五种思路</h2>
<p>所有思路的执行过程都是上面的例子，以下只讲<code>compose</code>实现</p>
<h3 id="articleHeader2">面向过程</h3>
<p>这个思路就是使用递归的过程思想，不断的检测队列中是否还有任务，如果有任务就执行，并把执行结果往后传递，这里是一个局部的思维，无法预知任务何时结束。直观上最容易结束和理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = function(...args) {
  let length = args.length
  let count = length - 1
  let result
  return function f1 (...arg1) {
    result = args[count].apply(this, arg1)
    if (count <= 0) {
      count = length - 1
      return result
    }
    count--
    return f1.call(null, result)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-keyword">let</span> length = args.length
  <span class="hljs-keyword">let</span> count = length - <span class="hljs-number">1</span>
  <span class="hljs-keyword">let</span> result
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span> (<span class="hljs-params">...arg1</span>) </span>{
    result = args[count].apply(<span class="hljs-keyword">this</span>, arg1)
    <span class="hljs-keyword">if</span> (count &lt;= <span class="hljs-number">0</span>) {
      count = length - <span class="hljs-number">1</span>
      <span class="hljs-keyword">return</span> result
    }
    count--
    <span class="hljs-keyword">return</span> f1.call(<span class="hljs-literal">null</span>, result)
  }
}</code></pre>
<p><a href="https://github.com/dongzhe3917875/compose/tree/master/basic" rel="nofollow noreferrer" target="_blank">代码地址</a></p>
<h3 id="articleHeader3">函数组合</h3>
<p>这个思路是一种函数组合的思想，将函数两两组合，不断的生成新的函数，生成的新函数挟裹了函数执行的逻辑信息，然后再两两组合，不断的传递下去，这种思路可以提前遍历所有任务，将任务组合成一个可以展开的组合结构，最后执行的时候就像推导多米诺骨牌一样。</p>
<p>函数的组合过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f1 = (...arg) => step2.call(null, init.apply(null, arg))
f2 = (...arg) => step3.call(null, f1.apply(null, arg))
f3 = (...arg) => step4.call(null, f2.apply(null, arg))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-function"><span class="hljs-title">f1</span> = <span class="hljs-params">(...arg)</span> =&gt;</span> step2.call(<span class="hljs-literal">null</span>, init.apply(<span class="hljs-literal">null</span>, arg))
<span class="hljs-function"><span class="hljs-title">f2</span> = <span class="hljs-params">(...arg)</span> =&gt;</span> step3.call(<span class="hljs-literal">null</span>, f1.apply(<span class="hljs-literal">null</span>, arg))
<span class="hljs-function"><span class="hljs-title">f3</span> = <span class="hljs-params">(...arg)</span> =&gt;</span> step4.call(<span class="hljs-literal">null</span>, f2.apply(<span class="hljs-literal">null</span>, arg))</code></pre>
<p><code>compose</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _pipe = (f, g) => (...arg) => g.call(null, f.apply(null, arg))
const compose = (...args) => args.reverse().reduce(_pipe, args.shift())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const _pipe = <span class="hljs-function"><span class="hljs-params">(f, g)</span> =&gt;</span> (...arg) =&gt; g.call(<span class="hljs-literal">null</span>, f.apply(<span class="hljs-literal">null</span>, arg))
const compose = <span class="hljs-function"><span class="hljs-params">(...args)</span> =&gt;</span> args.reverse().reduce(_pipe, args.shift())</code></pre>
<p><a href="https://github.com/dongzhe3917875/compose/tree/master/reduce" rel="nofollow noreferrer" target="_blank">代码地址</a></p>
<h3 id="articleHeader4">函数交织（AOP）</h3>
<p>这个实现的灵感来自<code>javascript</code>设计模式中的高阶函数，因为<code>compose</code>的任务在本质上就是函数执行，再加上顺序，所以可以把实现顺序执行放到函数本身，对函数的原型进行方法的绑定。方法的作用对象是函数，面向对象封装的数据，面向函数封装的是函数的行为。</p>
<p>需要对函数绑定两个行为 <code>before</code> 和 <code>after</code>，<code>before</code>执行函数多元部分（启动），<code>after</code>执行函数单元部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.before = function(fn) {
  const self = this
  return function(...args) {
    let result = fn.apply(null, args)
    return self.call(null, result)
  }
}

Function.prototype.after = function(fn) {
  const self = this
  return function(...args) {
    let result = self.apply(null, args)
    return fn.call(null, result)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Function.prototype.before = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
  <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    let result = fn.apply(<span class="hljs-literal">null</span>, args)
    <span class="hljs-keyword">return</span> self.call(<span class="hljs-literal">null</span>, result)
  }
}

Function.prototype.after = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span> </span>{
  <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    let result = self.apply(<span class="hljs-literal">null</span>, args)
    <span class="hljs-keyword">return</span> fn.call(<span class="hljs-literal">null</span>, result)
  }
}</code></pre>
<p>这里对函数进行方法的绑定，返回的是带着函数执行的规则的另外一个函数，在这里是次序的排列规则，对返回的函数依然可以进行链式调用。<br><code>compose</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = function(...args) {
  let before = args.pop()
  let start = args.pop()
  if (args.length) {
    return args.reduce(function(f1, f2) {
      return f1.after(f2)
    }, start.before(before))
  }
  return start.before(before)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
  let before = args.pop()
  let start = args.pop()
  <span class="hljs-keyword">if</span> (args.length) {
    <span class="hljs-keyword">return</span> args.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(f1, f2)</span> </span>{
      <span class="hljs-keyword">return</span> f1.after(f2)
    }, start.before(before))
  }
  <span class="hljs-keyword">return</span> start.before(before)
}</code></pre>
<p>函数执行过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="step2.before(init).after(step3).after(step4)
fn3.after(step4)
fn3 = fn2.after(step3)
fn2 = fn1.before(step1)
fn1 = init -> step2 -> step3 -> step4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>step2.<span class="hljs-built_in">before</span>(init).<span class="hljs-built_in">after</span>(step3).<span class="hljs-built_in">after</span>(step4)
fn3.<span class="hljs-built_in">after</span>(step4)
fn3 = fn2.<span class="hljs-built_in">after</span>(step3)
fn2 = fn1.<span class="hljs-built_in">before</span>(step1)
fn1 = init -&gt; step2 -&gt; step3 -&gt; step4</code></pre>
<p><a href="https://github.com/dongzhe3917875/compose/tree/master/aop" rel="nofollow noreferrer" target="_blank">代码地址</a></p>
<h3 id="articleHeader5">Promise</h3>
<p><code>ES6</code>引入了<code>Promise</code>，<code>Promise</code>可以指定一个<code>sequence</code>，来规定一个执行<code>then</code>的过程，<code>then</code>函数会等到执行完成后，再执行下一个<code>then</code>的处理。启动<code>sequence</code>可以使用<br><code>Promise.resolve()</code>这个函数。构建<code>sequence</code>可以使用<code>reduce</code><br><code>compose</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = function(...args) {
  let init = args.pop()
  return function(...arg) {
    return args.reverse().reduce(function(sequence, func) {
      return sequence.then(function(result) {
        return func.call(null, result)
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
  let init = args.pop()
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...arg</span>)</span> </span>{
    <span class="hljs-keyword">return</span> args.reverse().reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(sequence, func)</span> </span>{
      <span class="hljs-keyword">return</span> sequence.then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result)</span> </span>{
        <span class="hljs-keyword">return</span> func.call(<span class="hljs-literal">null</span>, result)
      })
    }, Promise.resolve(init.apply(<span class="hljs-literal">null</span>, arg)))
  }
}</code></pre>
<p><a href="https://github.com/dongzhe3917875/compose/tree/master/promise" rel="nofollow noreferrer" target="_blank">代码地址</a></p>
<h3 id="articleHeader6">Generator</h3>
<p><code>Generator</code>主要使用<code>yield</code>来构建协程，采用中断，处理，再中断的流程。可以事先规定好协程的执行顺序，然后再下次处理的时候进行参数（结果）交接，有一点要注意的是，由于执行的第一个<code>next</code>是不能传递参数的，所以第一个函数的执行需要手动调用，再空耗一个<code>next</code>，后面的就可以同步执行了。<br><code>generator</code>构建</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function* iterateSteps(steps) {
  let n
  for (let i = 0; i < steps.length; i++) {
    if (n) {
      n = yield steps[i].call(null, n)
    } else {
      n = yield
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">iterateSteps</span>(<span class="hljs-params">steps</span>) </span>{
  <span class="hljs-keyword">let</span> n
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; steps.length; i++) {
    <span class="hljs-keyword">if</span> (n) {
      n = <span class="hljs-keyword">yield</span> steps[i].call(<span class="hljs-literal">null</span>, n)
    } <span class="hljs-keyword">else</span> {
      n = <span class="hljs-keyword">yield</span>
    }
  }
}
</code></pre>
<p><code>compose</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = function(...steps) {
  let g = iterateSteps(steps)
  return function(...args) {
    let val = steps.pop().apply(null, args)
    // 这里是第一个值
    console.log(val)
    // 因为无法传参数 所以无所谓执行 就是空耗一个yield
    g.next()
    return steps.reverse.reduce((val, val1) => g.next(val).value, val)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...steps</span>)</span> </span>{
  let g = iterateSteps(steps)
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    let val = steps.pop().apply(<span class="hljs-literal">null</span>, args)
    <span class="hljs-comment">// 这里是第一个值</span>
    console.log(val)
    <span class="hljs-comment">// 因为无法传参数 所以无所谓执行 就是空耗一个yield</span>
    g.next()
    <span class="hljs-keyword">return</span> steps.reverse.reduce((val, val1) =&gt; g.next(val).value, val)
  }
}</code></pre>
<p><a href="https://github.com/dongzhe3917875/compose/tree/master/yield" rel="nofollow noreferrer" target="_blank">代码地址</a></p>
<h2 id="articleHeader7">总结</h2>
<p><a href="https://github.com/dongzhe3917875/compose" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<p><code>github</code>里面针对每一种实现包含了完成的<code>demo</code>案例，就在<code>test.js</code>里面，以上就是实现同步<code>compose</code>的五种思路，每一种思路的出发点都不一样，但是实现的目的都是一样的，可以看出<code>javascript</code>是非常灵活的,借助<code>es6</code>的<code>Promise</code>和<code>Generator</code>也可以很优雅的实现。后面会介绍<code>compose</code>的异步实现，在函数式编程来看，异步的本质应该就是<code>Monad</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现compose的五种思路

## 原文链接
[https://segmentfault.com/a/1190000011447164](https://segmentfault.com/a/1190000011447164)


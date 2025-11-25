---
title: 'JavaScript 优雅的实现方式包含你可能不知道的知识点' 
date: 2018-12-21 2:30:11
hidden: true
slug: ywip22uheb
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>有些东西很好用，但是你未必知道；有些东西你可能用过，但是你未必知道原理。</strong></p>
<p>实现一个目的有多种途径，俗话说，条条大路通罗马。很多内容来自平时的一些收集以及过往博客文章底下的精彩评论，收集整理拓展一波，发散一下大家的思维以及拓展一下知识面。</p>
<p><strong>茴字有四种写法，233333...， 文末有彩蛋有惊喜。</strong></p>
<h3 id="articleHeader0">1、简短优雅地实现 sleep 函数</h3>
<p>很多语言都有 <code>sleep</code> 函数，显然 <code>js</code> 没有，那么如何能简短优雅地实现这个方法？</p>
<h4>1.1 普通版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime;) {}
}
var t1 = +new Date()
sleep(3000)
var t2 = +new Date()
console.log(t2 - t1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">sleepTime</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> start = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>; +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - start &lt;= sleepTime;) {}
}
<span class="hljs-keyword">var</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
sleep(<span class="hljs-number">3000</span>)
<span class="hljs-keyword">var</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
<span class="hljs-built_in">console</span>.log(t2 - t1)</code></pre>
<p>优点：简单粗暴，通俗易懂。<br>缺点：这是最简单粗暴的实现，确实 sleep 了，也确实卡死了，CPU 会飙升，无论你的服务器 CPU 有多么 Niubility。</p>
<h4>1.2  Promise 版本</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const t1 = +new Date()
sleep(3000).then(() => {
  const t2 = +new Date()
  console.log(t2 - t1)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">time</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, time))
}

<span class="hljs-keyword">const</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
sleep(<span class="hljs-number">3000</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-built_in">console</span>.log(t2 - t1)
})</code></pre>
<p>优点：这种方式实际上是用了 setTimeout，没有形成进程阻塞，不会造成性能和负载问题。<br>缺点：虽然不像 callback 套那么多层，但仍不怎么美观，而且当我们需要在某过程中需要停止执行（或者在中途返回了错误的值），还必须得层层判断后跳出，非常麻烦，而且这种异步并不是那么彻底，还是看起来别扭。</p>
<h4>1.3 Generator 版本</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(delay) {
  return function(cb) {
    setTimeout(cb.bind(this), delay)
  };
}

function* genSleep() {
  const t1 = +new Date()
  yield sleep(3000)
  const t2 = +new Date()
  console.log(t2 - t1)
}

async(genSleep)

function async(gen) {
  const iter = gen()
  function nextStep(it) {
    if (it.done) return
    if (typeof it.value === &quot;function&quot;) {
      it.value(function(ret) {
        nextStep(iter.next(ret))
      })
    } else {
      nextStep(iter.next(it.value))
    }
  }
  nextStep(iter.next())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
    setTimeout(cb.bind(<span class="hljs-keyword">this</span>), delay)
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">genSleep</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-keyword">yield</span> sleep(<span class="hljs-number">3000</span>)
  <span class="hljs-keyword">const</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-built_in">console</span>.log(t2 - t1)
}

<span class="hljs-keyword">async</span>(genSleep)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async</span>(<span class="hljs-params">gen</span>) </span>{
  <span class="hljs-keyword">const</span> iter = gen()
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextStep</span>(<span class="hljs-params">it</span>) </span>{
    <span class="hljs-keyword">if</span> (it.done) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> it.value === <span class="hljs-string">"function"</span>) {
      it.value(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ret</span>) </span>{
        nextStep(iter.next(ret))
      })
    } <span class="hljs-keyword">else</span> {
      nextStep(iter.next(it.value))
    }
  }
  nextStep(iter.next())
}</code></pre>
<p>优点：同 Promise 优点，另外代码就变得非常简单干净，没有 then 那么生硬和恶心。<br>缺点：但不足也很明显，就是每次都要执行 next() 显得很麻烦，虽然有 <a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank"><strong>co</strong></a>（第三方包）可以解决，但就多包了一层，不好看，错误也必须按 <a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank"><strong>co</strong></a> 的逻辑来处理，不爽。</p>
<p><strong><a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank"><strong>co</strong></a> 之所以这么火并不是没有原因的，当然不是仅仅实现 <code>sleep</code> 这么无聊的事情，而是它活生生的借着<code>generator/yield</code> 实现了很类似 <code>async/await</code> 的效果！这一点真是让我三观尽毁刮目相看。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const co = require(&quot;co&quot;)
function sleep(delay) {
  return function(cb) {
    setTimeout(cb.bind(this), delay)
  }
}

co(function*() {
  const t1 = +new Date()
  yield sleep(3000)
  const t2 = +new Date()
  console.log(t2 - t1)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">"co"</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
    setTimeout(cb.bind(<span class="hljs-keyword">this</span>), delay)
  }
}

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-keyword">yield</span> sleep(<span class="hljs-number">3000</span>)
  <span class="hljs-keyword">const</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-built_in">console</span>.log(t2 - t1)
})</code></pre>
<h4>1.4 Async/Await 版本</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

!async function test() {
  const t1 = +new Date()
  await sleep(3000)
  const t2 = +new Date()
  console.log(t2 - t1)
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">reslove</span> =&gt;</span> {
    setTimeout(reslove, delay)
  })
}

!<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">3000</span>)
  <span class="hljs-keyword">const</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-built_in">console</span>.log(t2 - t1)
}()</code></pre>
<p>优点：同 Promise 和 Generator 优点。 Async/Await 可以看做是 Generator 的语法糖，Async 和 Await 相较于 * 和 yield 更加语义，另外各个函数都是扁平的，不会产生多余的嵌套，代码更加清爽易读。<br>缺点： ES7 语法存在兼容性问题，有 babel 一切兼容性都不是问题</p>
<p>至于 <code>Async/Await</code> 比 <code>Promise</code> 和 <code>Generator</code> 的好处可以参考这两篇文章：<br><a href="https://juejin.im/post/59f9ce7a51882554f666220f" rel="nofollow noreferrer" target="_blank">Async/Await 比 Generator 的四个改进点</a><br><a href="https://juejin.im/post/58ede4c1b123db43cc365551" rel="nofollow noreferrer" target="_blank">关于Async/Await替代Promise的6个理由</a></p>
<h4>1.5 不要忘了开源的力量</h4>
<p><strong>在 javascript 优雅的写 sleep 等于如何优雅的不优雅，2333</strong></p>
<blockquote>这里有 C++ 实现的模块：<a href="https://github.com/ErikDubbelboer/node-sleep" rel="nofollow noreferrer" target="_blank">https://github.com/ErikDubbel...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sleep = require(&quot;sleep&quot;)

const t1 = +new Date()
sleep.msleep(3000)
const t2 = +new Date()
console.log(t2 - t1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> sleep = <span class="hljs-built_in">require</span>(<span class="hljs-string">"sleep"</span>)

<span class="hljs-keyword">const</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
sleep.msleep(<span class="hljs-number">3000</span>)
<span class="hljs-keyword">const</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
<span class="hljs-built_in">console</span>.log(t2 - t1)</code></pre>
<p>优点：能够实现更加精细的时间精确度，而且看起来就是真的 sleep 函数，清晰直白。<br>缺点：缺点需要安装这个模块，<code>^_^</code>，这也许算不上什么缺点。</p>
<p><strong>从一个间简简单单的 sleep 函数我们就就可以管中窥豹，看见 JavaScript 近几年来不断快速的发展，不单单是异步编程这一块，还有各种各样的新技术和新框架，见证了 JavaScript 的繁荣。</strong></p>
<p><strong>你可能不知道的前端知识点：Async/Await是目前前端异步书写最优雅的一种方式</strong></p>
<h3 id="articleHeader1">2、获取时间戳</h3>
<p>上面第一个用多种方式实现 <code>sleep</code> 函数，我们可以发现代码有 <code>+new Date()</code>获取时间戳的用法，这只是其中的一种，下面就说一下其他两种以及 <code>+new Date()</code>的原理。</p>
<h4>2.1 普通版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timestamp=new Date().getTime()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> timestamp=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()</code></pre>
<p>优点：具有普遍性，大家都用这个<br>缺点：目前没有发现</p>
<h4>2.2 进阶版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timestamp = (new Date()).valueOf()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> timestamp = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).valueOf()</code></pre>
<blockquote>valueOf 方法返回对象的原始值(Primitive,'Null','Undefined','String','Boolean','Number'五种基本数据类型之一)，可能是字符串、数值或 bool 值等，看具体的对象。</blockquote>
<p>优点：说明开发者原始值有一个具体的认知，让人眼前一亮。<br>缺点: 目前没有发现</p>
<h4>2.3 终极版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timestamp = +new Date()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> timestamp = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()</code></pre>
<p>优点：对 JavaScript 隐式转换掌握的比较牢固的一个表现<br>缺点：目前没有发现</p>
<p>现在就简单分析一下为什么 <code>+new Date()</code> 拿到的是时间戳。</p>
<p><strong>一言以蔽之，这是隐式转换的玄学，实质还是调用了 valueOf() 的方法。</strong></p>
<p>我们先看看 <code>ECMAScript</code> 规范对一元运算符的规范：</p>
<p><strong>一元+ 运算符</strong></p>
<p>一元 <code>+</code> 运算符将其操作数转换为 <code>Number</code> 类型并反转其正负。注意负的 <code>+0</code> 产生 <code>-0</code>，负的 <code>-0</code> 产生 <code>+0</code>。产生式 <code>UnaryExpression : - UnaryExpression</code> 按照下面的过程执行。</p>
<blockquote><ol>
<li>令 expr 为解释执行 UnaryExpression 的结果 .</li>
<li>令 oldValue 为 ToNumber(GetValue(expr)).</li>
<li>如果 oldValue is NaN ，return NaN.</li>
<li>返回 oldValue 取负（即，算出一个数字相同但是符号相反的值）的结果。</li>
</ol></blockquote>
<p><strong>+new Date() 相当于 ToNumber(new Date())</strong></p>
<p>我们再来看看 <code>ECMAScript</code> 规范对 <code>ToNumber</code> 的定义：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012554826?w=720&amp;h=345" src="https://static.alili.tech/img/remote/1460000012554826?w=720&amp;h=345" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们知道 <code>new Date()</code> 是个对象，满足上面的 <code>ToPrimitive()</code>，所以进而成了 <code>ToPrimitive(new Date())</code>。</p>
<p>接着我们再来看看 <code>ECMAScript</code> 规范对 <code>ToPrimitive</code> 的定义，一层一层来，抽丝剥茧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012554827?w=720&amp;h=293" src="https://static.alili.tech/img/remote/1460000012554827?w=720&amp;h=293" alt="" title="" style="cursor: pointer;"></span></p>
<p>这个 <code>ToPrimitive</code> 刚开始可能不太好懂，我来大致解释一下吧：</p>
<p><strong>ToPrimitive(obj,preferredType)</strong></p>
<p><code>JavaScript</code> 引擎内部转换为原始值 <code>ToPrimitive(obj,preferredType)</code> 函数接受两个参数，第一个 <code>obj</code> 为被转换的对象，第二个<code>preferredType</code> 为希望转换成的类型（默认为空，接受的值为 <code>Number</code> 或 <code>String</code>）</p>
<p>在执行 <code>ToPrimitive(obj,preferredType)</code> 时如果第二个参数为空并且 <code>obj</code> 为 <code>Date</code> 的实例时，此时 <code>preferredType</code> 会被设置为 <code>String</code>，其他情况下 <code>preferredType</code> 都会被设置为<code>Number</code> 如果 <code>preferredType</code> 为 <code>Number</code>，<code>ToPrimitive</code> 执行过程如下：</p>
<blockquote><ol>
<li>如果obj为原始值，直接返回；</li>
<li>否则调用 obj.valueOf()，如果执行结果是原始值，返回之；</li>
<li>否则调用 obj.toString()，如果执行结果是原始值，返回之；</li>
<li>否则抛异常。</li>
</ol></blockquote>
<p>如果 <code>preferredType</code> 为 <code>String</code>，将上面的第2步和第3步调换，即：</p>
<blockquote><ol>
<li>如果obj为原始值，直接返回；</li>
<li>否则调用 obj.toString()，如果执行结果是原始值，返回之；</li>
<li>否则调用 obj.valueOf()，如果执行结果是原始值，返回之；</li>
<li>否则抛异常。</li>
</ol></blockquote>
<p>首先我们要明白 <code>obj.valueOf()</code> 和 <code>obj.toString()</code> 还有原始值分别是什么意思,这是弄懂上面描述的前提之一:</p>
<p><strong><code>toString</code> 用来返回对象的字符串表示。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
console.log(obj.toString());//[object Object]

var arr2 = [];
console.log(arr2.toString());//&quot;&quot;空字符串

var date = new Date();
console.log(date.toString());//Sun Feb 28 2016 13:40:36 GMT+0800 (中国标准时间)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-built_in">console</span>.log(obj.toString());<span class="hljs-comment">//[object Object]</span>

<span class="hljs-keyword">var</span> arr2 = [];
<span class="hljs-built_in">console</span>.log(arr2.toString());<span class="hljs-comment">//""空字符串</span>

<span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(date.toString());<span class="hljs-comment">//Sun Feb 28 2016 13:40:36 GMT+0800 (中国标准时间)</span></code></pre>
<p><strong><code>valueOf</code> 方法返回对象的原始值，可能是字符串、数值或 <code>bool</code> 值等，看具体的对象。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  name: &quot;obj&quot;
}
console.log(obj.valueOf()) //Object {name: &quot;obj&quot;}

var arr1 = [1]
console.log(arr1.valueOf()) //[1]

var date = new Date()
console.log(date.valueOf())//1456638436303
如代码所示，三个不同的对象实例调用valueOf返回不同的数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"obj"</span>
}
<span class="hljs-built_in">console</span>.log(obj.valueOf()) <span class="hljs-comment">//Object {name: "obj"}</span>

<span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">1</span>]
<span class="hljs-built_in">console</span>.log(arr1.valueOf()) <span class="hljs-comment">//[1]</span>

<span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
<span class="hljs-built_in">console</span>.log(date.valueOf())<span class="hljs-comment">//1456638436303</span>
如代码所示，三个不同的对象实例调用valueOf返回不同的数据</code></pre>
<p><strong>原始值指的是 <code>'Null','Undefined','String','Boolean','Number','Symbol'</code> 6种基本数据类型之一，上面已经提到过这个概念，这里再次申明一下。</strong></p>
<p>最后分解一下其中的过程：<code>+new Date():</code></p>
<blockquote>
<ol><li>运算符 <code>new</code> 的优先级高于一元运算符 <code>+</code>，所以过程可以分解为：</li></ol>
<p>var time=new Date();<br>+time</p>
<ol>
<li>根据上面提到的规则相当于：<code>ToNumber(time)</code>
</li>
<li>
<code>time</code> 是个日期对象，根据 <code>ToNumber</code> 的转换规则，所以相当于：<code>ToNumber(ToPrimitive(time))</code>
</li>
<li>根据 <code>ToPrimitive</code> 的转换规则：<code>ToNumber(time.valueOf())</code>，<code>time.valueOf()</code> 就是 原始值 得到的是个时间戳，假设 <code>time.valueOf()=1503479124652</code>
</li>
<li>所以 <code>ToNumber(1503479124652)</code> 返回值是 <code>1503479124652</code> 这个数字。</li>
<li>分析完毕</li>
</ol>
</blockquote>
<p><strong>你可能不知道的前端知识点：隐式转换的妙用</strong></p>
<h3 id="articleHeader2">3、数组去重</h3>
<p>注：暂不考虑<code>对象字面</code>量，<code>函数</code>等引用类型的去重，也不考虑 <code>NaN</code>, <code>undefined</code>, <code>null</code>等特殊类型情况。</p>
<blockquote>数组样本：[1, 1, '1', '2', 1]</blockquote>
<h5>3.1 普通版</h5>
<p><code>无需思考，我们可以得到 O(n^2) 复杂度的解法。定义一个变量数组 res 保存结果，遍历需要去重的数组，如果该元素已经存在在 res 中了，则说明是重复的元素，如果没有，则放入 res 中。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1, 1, '1', '2', 1]
function unique(arr) {
    var res = []
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i]
        for (var j = 0, len = res.length; j < jlen; j++) {
            if (item === res[j]) //arr数组的item在res已经存在,就跳出循环
                break
        }
        if (j === jlen) //循环完毕,arr数组的item在res找不到,就push到res数组中
            res.push(item)
    }
    return res
}
console.log(unique(a)) // [1, 2, &quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-number">1</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> res = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> item = arr[i]
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, len = res.length; j &lt; jlen; j++) {
            <span class="hljs-keyword">if</span> (item === res[j]) <span class="hljs-comment">//arr数组的item在res已经存在,就跳出循环</span>
                <span class="hljs-keyword">break</span>
        }
        <span class="hljs-keyword">if</span> (j === jlen) <span class="hljs-comment">//循环完毕,arr数组的item在res找不到,就push到res数组中</span>
            res.push(item)
    }
    <span class="hljs-keyword">return</span> res
}
<span class="hljs-built_in">console</span>.log(unique(a)) <span class="hljs-comment">// [1, 2, "1"]</span></code></pre>
<p>优点： 没有任何兼容性问题，通俗易懂，没有任何理解成本<br>缺点： 看起来比较臃肿比较繁琐，时间复杂度比较高<code>O(n^2)</code></p>
<h4>3.2 进阶版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a =  [1, 1, '1', '2', 1]
function unique(arr) {
    return arr.filter(function(ele,index,array){
        return array.indexOf(ele) === index//很巧妙,这样筛选一对一的,过滤掉重复的
    })
}
console.log(unique(a)) // [1, 2, &quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a =  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-number">1</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ele,index,array</span>)</span>{
        <span class="hljs-keyword">return</span> array.indexOf(ele) === index<span class="hljs-comment">//很巧妙,这样筛选一对一的,过滤掉重复的</span>
    })
}
<span class="hljs-built_in">console</span>.log(unique(a)) <span class="hljs-comment">// [1, 2, "1"]</span></code></pre>
<p>优点：很简洁，思维也比较巧妙，直观易懂。<br>缺点：不支持 <code>IE9</code> 以下的浏览器，时间复杂度还是<code>O(n^2)</code></p>
<h4>3.3 时间复杂度为O(n)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a =  [1, 1, '1', '2', 1]
function unique(arr) {
    var obj = {}
    return arr.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + item) ? 
        false : 
        (obj[typeof item + item] = true)
    })
}

console.log(unique(a)) // [1, 2, &quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a =  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-number">1</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> obj = {}
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, array</span>)</span>{
        <span class="hljs-keyword">return</span> obj.hasOwnProperty(<span class="hljs-keyword">typeof</span> item + item) ? 
        <span class="hljs-literal">false</span> : 
        (obj[<span class="hljs-keyword">typeof</span> item + item] = <span class="hljs-literal">true</span>)
    })
}

<span class="hljs-built_in">console</span>.log(unique(a)) <span class="hljs-comment">// [1, 2, "1"]</span></code></pre>
<p>优点：<code>hasOwnProperty</code> 是对象的属性(名称)存在性检查方法。对象的属性可以基于 <code>Hash</code> 表实现，因此对属性进行访问的时间复杂度可以达到<code>O(1)</code>;<br><code>filter</code> 是数组迭代的方法，内部还是一个 <code>for</code> 循环，所以时间复杂度是 <code>O(n)</code>。<br>缺点：不兼容 <code>IE9</code> 以下浏览器，其实也好解决，把 <code>filter</code> 方法用 <code>for</code> 循环代替或者自己模拟一个 filter 方法。</p>
<h4>3.4 终极版</h4>
<blockquote>以 Set 为例，ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const unique = a => [...new Set(a)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> unique = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> [...new <span class="hljs-built_in">Set</span>(a)]</code></pre>
<p>优点：<code>ES6</code> 语法，简洁高效，我们可以看到，去重方法从原始的 <code>14</code> 行代码到 <code>ES6</code> 的 <code>1</code> 行代码，其实也说明了 <code>JavaScript</code> 这门语言在不停的进步，相信以后的开发也会越来越高效。<br>缺点：兼容性问题，现代浏览器才支持，有 <code>babel</code> 这些都不是问题。</p>
<p><strong>你可能不知道的前端知识点：ES6 新的数据结构 Set 去重</strong></p>
<h3 id="articleHeader3">4、数字格式化 1234567890 --&gt; 1,234,567,890</h3>
<h4>4.1 普通版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatNumber(str) {
  let arr = [],
    count = str.length

  while (count >= 3) {
    arr.unshift(str.slice(count - 3, count))
    count -= 3
  }

  // 如果是不是3的倍数就另外追加到上去
  str.length % 3 &amp;&amp; arr.unshift(str.slice(0, str.length % 3))

  return arr.toString()

}
console.log(formatNumber(&quot;1234567890&quot;)) // 1,234,567,890" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNumber</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">let</span> arr = [],
    count = str.length

  <span class="hljs-keyword">while</span> (count &gt;= <span class="hljs-number">3</span>) {
    arr.unshift(str.slice(count - <span class="hljs-number">3</span>, count))
    count -= <span class="hljs-number">3</span>
  }

  <span class="hljs-comment">// 如果是不是3的倍数就另外追加到上去</span>
  str.length % <span class="hljs-number">3</span> &amp;&amp; arr.unshift(str.slice(<span class="hljs-number">0</span>, str.length % <span class="hljs-number">3</span>))

  <span class="hljs-keyword">return</span> arr.toString()

}
<span class="hljs-built_in">console</span>.log(formatNumber(<span class="hljs-string">"1234567890"</span>)) <span class="hljs-comment">// 1,234,567,890</span></code></pre>
<p>优点：自我感觉比网上写的一堆 for循环 还有 if-else 判断的逻辑更加清晰直白。<br>缺点：太普通</p>
<h4>4.2 进阶版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatNumber(str) {

  // [&quot;0&quot;, &quot;9&quot;, &quot;8&quot;, &quot;7&quot;, &quot;6&quot;, &quot;5&quot;, &quot;4&quot;, &quot;3&quot;, &quot;2&quot;, &quot;1&quot;]
  return str.split(&quot;&quot;).reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}

console.log(formatNumber(&quot;1234567890&quot;)) // 1,234,567,890" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNumber</span>(<span class="hljs-params">str</span>) </span>{

  <span class="hljs-comment">// ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"]</span>
  <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">""</span>).reverse().reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, index</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> ((index % <span class="hljs-number">3</span>) ? next : (next + <span class="hljs-string">','</span>)) + prev
  })
}

<span class="hljs-built_in">console</span>.log(formatNumber(<span class="hljs-string">"1234567890"</span>)) <span class="hljs-comment">// 1,234,567,890</span></code></pre>
<p>优点：把 JS 的 API 玩的了如指掌<br>缺点：可能没那么好懂，不过读懂之后就会发出我怎么没想到的感觉</p>
<h4>4.3 正则版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatNumber(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

console.log(formatNumber(&quot;123456789&quot;)) // 1,234,567,890" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNumber</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">return</span> str.replace(<span class="hljs-regexp">/\B(?=(\d{3})+(?!\d))/g</span>, <span class="hljs-string">','</span>)
}

<span class="hljs-built_in">console</span>.log(formatNumber(<span class="hljs-string">"123456789"</span>)) <span class="hljs-comment">// 1,234,567,890</span></code></pre>
<p>下面简单分析下正则<code>/\B(?=(\d{3})+(?!\d))/g</code>：</p>
<blockquote><ol>
<li>
<code>/\B(?=(\d{3})+(?!\d))/g</code>：正则匹配边界<code>\B</code>，边界后面必须跟着<code>(\d{3})+(?!\d)</code>;</li>
<li>
<code>(\d{3})+</code>：必须是1个或多个的3个连续数字;</li>
<li>
<code>(?!\d)</code>：第2步中的3个数字不允许后面跟着数字;</li>
<li>
<code>(\d{3})+(?!\d)</code>：所以匹配的边界后面必须跟着<code>3*n</code>（n&gt;=1）的数字。</li>
</ol></blockquote>
<p>最终把匹配到的所有边界换成<code>,</code>即可达成目标。</p>
<p>优点：代码少，浓缩的就是精华<br>缺点：需要对正则表达式的位置匹配有一个较深的认识，门槛大一点</p>
<h4>4.4 API版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(123456789).toLocaleString('en-US')  // 1,234,567,890" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">(<span class="hljs-number">123456789</span>).toLocaleString(<span class="hljs-string">'en-US'</span>)  <span class="hljs-comment">// 1,234,567,890</span></code></pre>
<p>如图，你可能还不知道 <code>JavaScript</code> 的 <code>toLocaleString</code> 还可以这么玩。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012554828?w=1194&amp;h=442" src="https://static.alili.tech/img/remote/1460000012554828?w=1194&amp;h=442" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>还可以使用</strong>&nbsp;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl" rel="nofollow noreferrer" target="_blank">Intl对象 - MDN</a></p>
<blockquote>Intl 对象是 ECMAScript 国际化 API 的一个命名空间，它提供了精确的字符串对比，数字格式化，日期和时间格式化。Collator，NumberFormat 和 DateTimeFormat 对象的构造函数是 Intl 对象的属性。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Intl.NumberFormat().format(1234567890) // 1,234,567,890" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.NumberFormat().format(<span class="hljs-number">1234567890</span>) <span class="hljs-comment">// 1,234,567,890</span></code></pre>
<p>优点：简单粗暴，直接调用 API<br>缺点：<a href="https://caniuse.com/#search=Intl" rel="nofollow noreferrer" target="_blank">Intl兼容性</a>不太好，不过 toLocaleString的话 IE6 都支持</p>
<p><strong>你可能不知道的前端知识点：Intl对象 和 toLocaleString的方法。</strong></p>
<h3 id="articleHeader4">5、交换两个整数</h3>
<p>let a = 3,b = 4 变成 a = 4, b = 3</p>
<h4>5.1 普通版</h4>
<p>首先最常规的办法，引入一个 temp 中间变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 3,b = 4
let temp = a
a = b
b = temp
console.log(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> a = <span class="hljs-number">3</span>,b = <span class="hljs-number">4</span>
<span class="hljs-keyword">let</span> temp = a
a = b
b = temp
<span class="hljs-built_in">console</span>.log(a, b)</code></pre>
<p>优点：一眼能看懂就是最好的优点<br>缺点：硬说缺点就是引入了一个多余的变量</p>
<h4>5.2 进阶版</h4>
<p>在不引入中间变量的情况下也能交互两个变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 3,b = 4
a += b
b = a - b
a -= b
console.log(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> a = <span class="hljs-number">3</span>,b = <span class="hljs-number">4</span>
a += b
b = a - b
a -= b
<span class="hljs-built_in">console</span>.log(a, b)</code></pre>
<p>优点：比起楼上那种没有引入多余的变量，比上面那一种稍微巧妙一点<br>缺点：当然缺点也很明显，整型数据溢出，比如说对于32位字符最大表示有符号数字是2147483647，也就是Math.pow(2,31)-1，如果是2147483645和2147483646交换就失败了。</p>
<h4>5.3 终极版</h4>
<p>利用一个数异或本身等于０和异或运算符合交换率。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 3,b = 4
  a ^= b
  b ^= a
  a ^= b
console.log(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> a = <span class="hljs-number">3</span>,b = <span class="hljs-number">4</span>
  a ^= b
  b ^= a
  a ^= b
<span class="hljs-built_in">console</span>.log(a, b)</code></pre>
<p>下面用竖式进行简单说明：(10进制化为二进制)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    a = 011
(^) b = 100
则  a = 111(a ^ b的结果赋值给a，a已变成了7)
(^) b = 100
则  b = 011(b^a的结果赋给b，b已经变成了3)
(^) a = 111
则  a = 100(a^b的结果赋给a，a已经变成了4)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    a = <span class="hljs-number">011</span>
(^) b = <span class="hljs-number">100</span>
则  a = <span class="hljs-number">111</span>(a ^ b的结果赋值给a，a已变成了<span class="hljs-number">7</span>)
(^) b = <span class="hljs-number">100</span>
则  b = <span class="hljs-number">011</span>(b^a的结果赋给b，b已经变成了<span class="hljs-number">3</span>)
(^) a = <span class="hljs-number">111</span>
则  a = <span class="hljs-number">100</span>(a^b的结果赋给a，a已经变成了<span class="hljs-number">4</span>)
</code></pre>
<p>从上面的竖式可以清楚的看到利用异或运算实现两个值交换的基本过程。</p>
<p>下面从深层次剖析一下：</p>
<blockquote>
<p>1.对于开始的两个赋值语句，a = a ^ b，b = b ^ a，相当于b = b ^ (a ^ b) = a  ^ b ^ b，而b ^ b 显然等于0。因此b = a ^ 0，显然结果为a。</p>
<ol><li>同理可以分析第三个赋值语句，a = a ^ b = (a ^ b) ^ a = b</li></ol>
</blockquote>
<p>注：</p>
<ol><li>^ 即”异或“运算符。</li></ol>
<blockquote>它的意思是判断两个相应的位值是否为”异“，为”异"(值不同)就取真（1）;否则为假（0）。</blockquote>
<ol><li>^ 运算符的特点是与0异或，保持原值；与本身异或，结果为0。</li></ol>
<p>优点：不存在引入中间变量，不存在整数溢出<br>缺点：前端对位操作这一块可能了解不深，不容易理解</p>
<h4>5.4 究极版</h4>
<p>熟悉 <code>ES6</code> 语法的人当然不会对解构陌生</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 3,b = 4;
[b, a] = [a, b]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>,b = <span class="hljs-number">4</span>;
[b, a] = [a, b]</code></pre>
<p>其中的解构的原理，我暂时还没读过 ES6的规范，不知道具体的细则，不过我们可以看看 <code>babel</code> 是自己编译的，我们可以看出点门路。</p>
<p>哈哈，简单粗暴，不知道有没有按照 ES 的规范，其实可以扒一扒 v8的源码，chrome 已经实现这种解构用法。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012554829?w=1932&amp;h=896" src="https://static.alili.tech/img/remote/1460000012554829?w=1932&amp;h=896" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>这个例子和前面的例子编写风格有何不同</strong>，你如果细心的话就会发现这两行代码多了一个<strong>分号</strong>，对于我这种编码不写分号的洁癖者，为什么加一个分号在这里，其实是有原因的，这里就简单普及一下，<strong>建议大家还是写代码写上分号</strong>。</p>
<h4>5.4 ECMAScript 自动分号;插入(作为补充，防止大家以后踩坑)</h4>
<p>尽管 JavaScript 有 C 的代码风格，但是它不强制要求在代码中使用分号，实际上可以省略它们。</p>
<p>JavaScript 不是一个没有分号的语言，恰恰相反上它需要分号来就解析源代码。 因此 JavaScript 解析器在遇到由于缺少分号导致的解析错误时，会自动在源代码中插入分号。</p>
<h5>5.4.1例子</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function() {
} // 解析错误，分号丢失
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
} <span class="hljs-comment">// 解析错误，分号丢失</span>
test()</code></pre>
<p>自动插入分号，解析器重新解析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function() {
}; // 没有错误，解析继续
test()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
}; <span class="hljs-comment">// 没有错误，解析继续</span>
test()</code></pre>
<h5>5.4.2工作原理</h5>
<p>下面的代码没有分号，因此解析器需要自己判断需要在哪些地方插入分号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(window, undefined) {
    function test(options) {
        log('testing!')

        (options.list || []).forEach(function(i) {

        })

        options.value.test(
            'long string to pass here',
            'and another long string to pass'
        )

        return
        {
            foo: function() {}
        }
    }
    window.test = test

})(window)

(function(window) {
    window.someLibrary = {}
})(window)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window, undefined</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">options</span>) </span>{
        log(<span class="hljs-string">'testing!'</span>)

        (options.list || []).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{

        })

        options.value.test(
            <span class="hljs-string">'long string to pass here'</span>,
            <span class="hljs-string">'and another long string to pass'</span>
        )

        <span class="hljs-keyword">return</span>
        {
            <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
        }
    }
    <span class="hljs-built_in">window</span>.test = test

})(<span class="hljs-built_in">window</span>)

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window</span>) </span>{
    <span class="hljs-built_in">window</span>.someLibrary = {}
})(<span class="hljs-built_in">window</span>)
</code></pre>
<p>下面是解析器"猜测"的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(window, undefined) {
    function test(options) {

        // 没有插入分号，两行被合并为一行
        log('testing!')(options.list || []).forEach(function(i) {

        }); // <- 插入分号

        options.value.test(
            'long string to pass here',
            'and another long string to pass'
        ); // <- 插入分号

        return; // <- 插入分号, 改变了 return 表达式的行为
        { // 作为一个代码段处理
            foo: function() {}
        }; // <- 插入分号
    }
    window.test = test; // <- 插入分号

// 两行又被合并了
})(window)(function(window) {
    window.someLibrary = {}; // <- 插入分号
})(window); //<- 插入分号
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window, undefined</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">options</span>) </span>{

        <span class="hljs-comment">// 没有插入分号，两行被合并为一行</span>
        log(<span class="hljs-string">'testing!'</span>)(options.list || []).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{

        }); <span class="hljs-comment">// &lt;- 插入分号</span>

        options.value.test(
            <span class="hljs-string">'long string to pass here'</span>,
            <span class="hljs-string">'and another long string to pass'</span>
        ); <span class="hljs-comment">// &lt;- 插入分号</span>

        <span class="hljs-keyword">return</span>; <span class="hljs-comment">// &lt;- 插入分号, 改变了 return 表达式的行为</span>
        { <span class="hljs-comment">// 作为一个代码段处理</span>
            foo: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
        }; <span class="hljs-comment">// &lt;- 插入分号</span>
    }
    <span class="hljs-built_in">window</span>.test = test; <span class="hljs-comment">// &lt;- 插入分号</span>

<span class="hljs-comment">// 两行又被合并了</span>
})(<span class="hljs-built_in">window</span>)(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window</span>) </span>{
    <span class="hljs-built_in">window</span>.someLibrary = {}; <span class="hljs-comment">// &lt;- 插入分号</span>
})(<span class="hljs-built_in">window</span>); <span class="hljs-comment">//&lt;- 插入分号</span>
</code></pre>
<p>解析器显著改变了上面代码的行为，在另外一些情况下也会做出错误的处理。</p>
<h5>5.4.3 ECMAScript对自动分号插入的规则</h5>
<p>我们翻到7.9章节，看看其中插入分号的机制和原理，清楚只写以后就可以尽量以后少踩坑</p>
<p><strong>必须用分号终止某些 ECMAScript 语句 ( 空语句 , 变量声明语句 , 表达式语句 , do-while 语句 , continue 语句 , break 语句 , return 语句 ,throw 语句 )。这些分号总是明确的显示在源文本里。然而，为了方便起见，某些情况下这些分号可以在源文本里省略。描述这种情况会说：这种情况下给源代码的 token 流自动插入分号。</strong>  <span class="img-wrap"><img data-src="/img/remote/1460000008572288?w=1968&amp;h=766" src="https://static.alili.tech/img/remote/1460000008572288?w=1968&amp;h=766" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000008572289?w=1796&amp;h=666" src="https://static.alili.tech/img/remote/1460000008572289?w=1796&amp;h=666" alt="" title="" style="cursor: pointer;"></span></p>
<p>还是比较抽象，看不太懂是不是，不要紧，我们看看实际例子，总结出几个规律就行，我们先不看抽象的，看着头晕，看看具体的总结说明， <strong>化抽象为具体</strong> 。</p>
<p>首先这些规则是基于两点：</p>
<ol>
<li>以换行为基础；</li>
<li>解析器会尽量将新行并入当前行，当且仅当符合ASI规则时才会将新行视为独立的语句。</li>
</ol>
<h6>5.4.3.1 ASI的规则</h6>
<p><strong>1. 新行并入当前行将构成非法语句，自动插入分号。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(1 < 10) a = 1
console.log(a)
// 等价于
if(1 < 10) a = 1;
console.log(a);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">if</span>(<span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span>) a = <span class="hljs-number">1</span>
<span class="hljs-built_in">console</span>.log(a)
<span class="hljs-comment">// 等价于</span>
<span class="hljs-keyword">if</span>(<span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span>) a = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(a);</code></pre>
<p><strong>2. 在continue,return,break,throw后自动插入分号</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return
{a: 1}
// 等价于
return;
{a: 1};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">return</span>
{<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
<span class="hljs-comment">// 等价于</span>
<span class="hljs-keyword">return</span>;
{<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>};</code></pre>
<p><strong>3. ++、--后缀表达式作为新行的开始，在行首自动插入分号</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a
++
c
// 等价于
a;
++c;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">a
++
c
<span class="hljs-comment">// 等价于</span>
a;
++c;</code></pre>
<p><strong>4. 代码块的最后一个语句会自动插入分号</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){ a = 1 }
// 等价于
function(){ a = 1; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ a = <span class="hljs-number">1</span> }
<span class="hljs-comment">// 等价于</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ a = <span class="hljs-number">1</span>; }</code></pre>
<h6>5.4.3.2 No ASI的规则</h6>
<p><strong>1. 新行以 ( 开始</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
var b = a
(a+b).toString()
// 会被解析为以a+b为入参调用函数a，然后调用函数返回值的toString函数
var a = 1
var b =a(a+b).toString()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> b = a
(a+b).toString()
<span class="hljs-comment">// 会被解析为以a+b为入参调用函数a，然后调用函数返回值的toString函数</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> b =a(a+b).toString()</code></pre>
<p><strong>2. 新行以 [ 开始</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = ['a1', 'a2']
var b = a
[0,1].slice(1)
// 会被解析先获取a[1]，然后调用a[1].slice(1)。
// 由于逗号位于[]内，且不被解析为数组字面量，而被解析为运算符，而逗号运算符会先执
行左侧表达式，然后执行右侧表达式并且以右侧表达式的计算结果作为返回值
var a = ['a1', 'a2']
var b = a[0,1].slice(1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = [<span class="hljs-string">'a1'</span>, <span class="hljs-string">'a2'</span>]
<span class="hljs-keyword">var</span> b = a
[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>].slice(<span class="hljs-number">1</span>)
<span class="hljs-comment">// 会被解析先获取a[1]，然后调用a[1].slice(1)。</span>
<span class="hljs-comment">// 由于逗号位于[]内，且不被解析为数组字面量，而被解析为运算符，而逗号运算符会先执</span>
行左侧表达式，然后执行右侧表达式并且以右侧表达式的计算结果作为返回值
<span class="hljs-keyword">var</span> a = [<span class="hljs-string">'a1'</span>, <span class="hljs-string">'a2'</span>]
<span class="hljs-keyword">var</span> b = a[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>].slice(<span class="hljs-number">1</span>)</code></pre>
<p><strong>3. 新行以 / 开始</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
var b = a
/test/.test(b)
// /会被解析为整除运算符，而不是正则表达式字面量的起始符号。浏览器中会报test前多了个.号
var a = 1
var b = a / test / .test(b)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> b = a
/test/.test(b)
<span class="hljs-comment">// /会被解析为整除运算符，而不是正则表达式字面量的起始符号。浏览器中会报test前多了个.号</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> b = a / test / .test(b)
</code></pre>
<p><strong>4. 新行以 + 、 - 、 % 和 * 开始</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 2
var b = a
+a
// 会解析如下格式
var a = 2
var b = a + a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>
<span class="hljs-keyword">var</span> b = a
+a
<span class="hljs-comment">// 会解析如下格式</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>
<span class="hljs-keyword">var</span> b = a + a</code></pre>
<p><strong>5. 新行以 , 或 . 开始</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 2
var b = a
.toString()
console.log(typeof b)
// 会解析为
var a = 2
var b = a.toString()
console.log(typeof b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>
<span class="hljs-keyword">var</span> b = a
.toString()
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> b)
<span class="hljs-comment">// 会解析为</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>
<span class="hljs-keyword">var</span> b = a.toString()
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> b)</code></pre>
<p>到这里我们已经对ASI的规则有一定的了解了，另外还有一样有趣的事情，就是“空语句”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三个空语句
;;;

// 只有if条件语句，语句块为空语句。
// 可实现unless条件语句的效果
if(1>2);else
  console.log('2 is greater than 1 always!');

// 只有while条件语句，循环体为空语句。
var a = 1
while(++a < 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 三个空语句</span>
;;;

<span class="hljs-comment">// 只有if条件语句，语句块为空语句。</span>
<span class="hljs-comment">// 可实现unless条件语句的效果</span>
<span class="hljs-keyword">if</span>(<span class="hljs-number">1</span>&gt;<span class="hljs-number">2</span>);<span class="hljs-keyword">else</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2 is greater than 1 always!'</span>);

<span class="hljs-comment">// 只有while条件语句，循环体为空语句。</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span>(++a &lt; <span class="hljs-number">100</span>);</code></pre>
<h5>5.4.4 结论</h5>
<p>建议绝对不要省略分号，同时也提倡将花括号和相应的表达式放在一行， 对于只有一行代码的 if 或者 else 表达式，也不应该省略花括号。 这些良好的编程习惯不仅可以提到代码的一致性，而且可以防止解析器改变代码行为的错误处理。<br> <a href="https://www.zhihu.com/question/20298345" rel="nofollow noreferrer" target="_blank">关于JavaScript 语句后应该加分号么？(点我查看)</a>我们可以看看知乎上大牛们对着个问题的看法。</p>
<p><strong>你可能不知道的前端知识点：原来 JavaScript 还有位操作以及分号的使用细则</strong></p>
<h3 id="articleHeader5">6、将 argruments 对象(类数组)转换成数组</h3>
<p><code>{0:1,1:2,2:3,length:3}</code>这种形式的就属于类数组，就是按照数组下标排序的对象，还有一个 <code>length </code>属性，有时候我们需要这种对象能调用数组下的一个方法，这时候就需要把把类数组转化成真正的数组。</p>
<h4>6.1 普通版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var makeArray = function(array) {
  var ret = []
  if (array != null) {
    var i = array.length
    if (i == null || typeof array === &quot;string&quot;) ret[0] = array
    else while (i) ret[--i] = array[i];
  }
  return ret
}
makeArray({0:1,1:2,2:3,length:3}) //[1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> makeArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array</span>) </span>{
  <span class="hljs-keyword">var</span> ret = []
  <span class="hljs-keyword">if</span> (array != <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">var</span> i = array.length
    <span class="hljs-keyword">if</span> (i == <span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> array === <span class="hljs-string">"string"</span>) ret[<span class="hljs-number">0</span>] = array
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">while</span> (i) ret[--i] = array[i];
  }
  <span class="hljs-keyword">return</span> ret
}
makeArray({<span class="hljs-number">0</span>:<span class="hljs-number">1</span>,<span class="hljs-number">1</span>:<span class="hljs-number">2</span>,<span class="hljs-number">2</span>:<span class="hljs-number">3</span>,<span class="hljs-attr">length</span>:<span class="hljs-number">3</span>}) <span class="hljs-comment">//[1,2,3]</span></code></pre>
<p>优点：通用版本，没有任何兼容性问题<br>缺点：太普通</p>
<h4>6.2 进阶版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = Array.prototype.slice.call(arguments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);</code></pre>
<p>这种应该是大家用过最常用的方法，至于为什么可以这么用，很多人估计也是一知半解，反正我看见大家这么用我也这么用，要搞清为什么里面的原因，我们还是从规范和源码说起。</p>
<p>照着规范的流程，自己看看推演一下就明白了：<br><a href="http://es5.github.io/#x15.4.4.10" rel="nofollow noreferrer" target="_blank">英文版15.4.4.10 Array.prototype.slice (start, end) </a><br><a href="http://yanhaijing.com/es5/#352" rel="nofollow noreferrer" target="_blank">中文版15.4.4.10 Array.prototype.slice (start, end) </a><br>如果你想知道 <code>JavaScript</code> 的 <code>sort</code> 排序的机制，到底是哪种排序好，用的哪种，也可以从规范看出端倪。</p>
<p>在官方的解释中，如<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" rel="nofollow noreferrer" target="_blank">[mdn</a>]</p>
<blockquote>The slice() method returns a shallow copy of a portion of an array into a new array object.</blockquote>
<p><strong>简单的说就是根据参数，返回数组的一部分的 <code>copy</code>。所以了解其内部实现才能确定它是如何工作的。所以查看 <code>V8</code> 源码中的 <code>Array.js</code>     可以看到如下的代码：</strong></p>
<p>方法  <code>ArraySlice</code>，<a href="https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js" rel="nofollow noreferrer" target="_blank">源码地址</a>，第 <code>660</code> 行,直接添加到 <code>Array.prototype</code> 上的“入口”，内部经过参数、类型等等的判断处理，分支为 <code>SparseSlice</code> 和 <code>SimpleSlice</code> 处理。</p>
<p><code>slice.call</code> 的作用原理就是，利用 <code>call</code>，将 <code>slice</code> 的方法作用于 <code>arrayLike</code>，<code>slice</code> 的两个参数为空，<code>slice</code> 内部解析使得 <code>arguments.lengt</code> 等于0的时候 相当于处理 <code>slice(0)</code> ： 即选择整个数组，<code>slice</code> 方法内部没有强制判断必须是 <code>Array</code> 类型，<code>slice</code> 返回的是新建的数组（使用循环取值）”，所以这样就实现了类数组到数组的转化，<code>call</code> 这个神奇的方法、<code>slice</code> 的处理缺一不可。</p>
<p>直接看 <code>slice</code> 怎么实现的吧。其实就是将 <code>array-like</code> 对象通过下标操作放进了新的 <code>Array</code> 里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// This will work for genuine arrays, array-like objects, 
    // NamedNodeMap (attributes, entities, notations),
    // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
    // and will not fail on other DOM objects (as do DOM elements in IE < 9)
    Array.prototype.slice = function(begin, end) {
      // IE < 9 gets unhappy with an undefined end argument
      end = (typeof end !== 'undefined') ? end : this.length;

      // For native Array objects, we use the native slice function
      if (Object.prototype.toString.call(this) === '[object Array]'){
        return _slice.call(this, begin, end); 
      }

      // For array like object we handle it ourselves.
      var i, cloned = [],
        size, len = this.length;

      // Handle negative value for &quot;begin&quot;
      var start = begin || 0;
      start = (start >= 0) ? start : Math.max(0, len + start);

      // Handle negative value for &quot;end&quot;
      var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
      if (end < 0) {
        upTo = len + end;
      }

      // Actual expected size of the slice
      size = upTo - start;

      if (size > 0) {
        cloned = new Array(size);
        if (this.charAt) {
          for (i = 0; i < size; i++) {
            cloned[i] = this.charAt(start + i);
          }
        } else {
          for (i = 0; i < size; i++) {
            cloned[i] = this[start + i];
          }
        }
      }

      return cloned;
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// This will work for genuine arrays, array-like objects, </span>
    <span class="hljs-comment">// NamedNodeMap (attributes, entities, notations),</span>
    <span class="hljs-comment">// NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),</span>
    <span class="hljs-comment">// and will not fail on other DOM objects (as do DOM elements in IE &lt; 9)</span>
    <span class="hljs-built_in">Array</span>.prototype.slice = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">begin, end</span>) </span>{
      <span class="hljs-comment">// IE &lt; 9 gets unhappy with an undefined end argument</span>
      end = (<span class="hljs-keyword">typeof</span> end !== <span class="hljs-string">'undefined'</span>) ? end : <span class="hljs-keyword">this</span>.length;

      <span class="hljs-comment">// For native Array objects, we use the native slice function</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-keyword">this</span>) === <span class="hljs-string">'[object Array]'</span>){
        <span class="hljs-keyword">return</span> _slice.call(<span class="hljs-keyword">this</span>, begin, end); 
      }

      <span class="hljs-comment">// For array like object we handle it ourselves.</span>
      <span class="hljs-keyword">var</span> i, cloned = [],
        size, len = <span class="hljs-keyword">this</span>.length;

      <span class="hljs-comment">// Handle negative value for "begin"</span>
      <span class="hljs-keyword">var</span> start = begin || <span class="hljs-number">0</span>;
      start = (start &gt;= <span class="hljs-number">0</span>) ? start : <span class="hljs-built_in">Math</span>.max(<span class="hljs-number">0</span>, len + start);

      <span class="hljs-comment">// Handle negative value for "end"</span>
      <span class="hljs-keyword">var</span> upTo = (<span class="hljs-keyword">typeof</span> end == <span class="hljs-string">'number'</span>) ? <span class="hljs-built_in">Math</span>.min(end, len) : len;
      <span class="hljs-keyword">if</span> (end &lt; <span class="hljs-number">0</span>) {
        upTo = len + end;
      }

      <span class="hljs-comment">// Actual expected size of the slice</span>
      size = upTo - start;

      <span class="hljs-keyword">if</span> (size &gt; <span class="hljs-number">0</span>) {
        cloned = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(size);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.charAt) {
          <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; size; i++) {
            cloned[i] = <span class="hljs-keyword">this</span>.charAt(start + i);
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; size; i++) {
            cloned[i] = <span class="hljs-keyword">this</span>[start + i];
          }
        }
      }

      <span class="hljs-keyword">return</span> cloned;
    };</code></pre>
<p>优点：最常用的版本，兼容性较强<br>缺点：ie 低版本，无法处理 dom 集合的 slice call 转数组。（虽然具有数值键值、length 符合ArrayLike 的定义，却报错）搜索资料得到 ：因为 ie 下的 dom 对象是以 com 对象的形式实现的，js 对象与com对象不能进行转换 。</p>
<h4>6.3 ES6 版本</h4>
<p>使用 <code>Array.from</code>, 值需要对象有 <code>length</code> 属性, 就可以转换成数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = Array.from(arguments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>);</code></pre>
<p>扩展运算符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var args = [...arguments];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> args = [...arguments];</code></pre>
<p><code>ES6</code> 中的扩展运算符...也能将某些数据结构转换成数组，这种数据结构必须有便利器接口。<br>优点：直接使用内置 API，简单易维护<br>缺点：兼容性，使用 babel 的 profill 转化可能使代码变多，文件包变大</p>
<p><strong>你可能不知道的前端知识点：slice 方法的具体原理</strong></p>
<h3 id="articleHeader6">7、数字取整 2.33333 =&gt; 2</h3>
<h4>7.1 普通版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = parseInt(2.33333)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> a = <span class="hljs-built_in">parseInt</span>(<span class="hljs-number">2.33333</span>)</code></pre>
<p><code>parseInt()</code> 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。这个估计是直接取整最常用的方法了。<br>更多关于 <code>parseInt()</code> 函数可以查看&nbsp;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt" rel="nofollow noreferrer" target="_blank">MDN 文档</a></p>
<h4>7.2 进阶版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = Math.trunc(2.33333)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> a = <span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">2.33333</span>)</code></pre>
<p><code>Math.trunc()</code> 方法会将数字的小数部分去掉，只保留整数部分。<br>特别要注意的是：<code>Internet Explorer</code> 不支持这个方法，不过写个 <code>Polyfill</code> 也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.trunc = Math.trunc || function(x) {
  if (isNaN(x)) {
    return NaN;
  }
  if (x > 0) {
    return Math.floor(x);
  }
  return Math.ceil(x);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">Math</span>.trunc = <span class="hljs-built_in">Math</span>.trunc || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(x)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">NaN</span>;
  }
  <span class="hljs-keyword">if</span> (x &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(x);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(x);
};</code></pre>
<p>数学的事情还是用数学方法来处理比较好。</p>
<h4>7.3 黑科技版</h4>
<h5>7.3.1 ~~number</h5>
<p>双波浪线 ~~ 操作符也被称为“双按位非”操作符。你通常可以使用它作为代替 Math.trunc() 的更快的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(~~47.11)  // -> 47
console.log(~~1.9999) // -> 1
console.log(~~3)      // -> 3
console.log(~~[])     // -> 0
console.log(~~NaN)    // -> 0
console.log(~~null)   // -> 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">console</span>.log(~~<span class="hljs-number">47.11</span>)  <span class="hljs-comment">// -&gt; 47</span>
<span class="hljs-built_in">console</span>.log(~~<span class="hljs-number">1.9999</span>) <span class="hljs-comment">// -&gt; 1</span>
<span class="hljs-built_in">console</span>.log(~~<span class="hljs-number">3</span>)      <span class="hljs-comment">// -&gt; 3</span>
<span class="hljs-built_in">console</span>.log(~~[])     <span class="hljs-comment">// -&gt; 0</span>
<span class="hljs-built_in">console</span>.log(~~<span class="hljs-literal">NaN</span>)    <span class="hljs-comment">// -&gt; 0</span>
<span class="hljs-built_in">console</span>.log(~~<span class="hljs-literal">null</span>)   <span class="hljs-comment">// -&gt; 0</span></code></pre>
<p>失败时返回0,这可能在解决 Math.trunc() 转换错误返回 NaN 时是一个很好的替代。<br>但是当数字范围超出 ±2^31−1 即：2147483647 时，异常就出现了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 异常情况
console.log(~~2147493647.123) // -> -2147473649 ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 异常情况</span>
<span class="hljs-built_in">console</span>.log(~~<span class="hljs-number">2147493647.123</span>) <span class="hljs-comment">// -&gt; -2147473649 ?</span></code></pre>
<h5>7.3.2 number | 0</h5>
<p>| (按位或) 对每一对比特位执行或（OR）操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(20.15|0);          // -> 20
console.log((-20.15)|0);       // -> -20
console.log(3000000000.15|0);  // -> -1294967296 ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">20.15</span>|<span class="hljs-number">0</span>);          <span class="hljs-comment">// -&gt; 20</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-number">-20.15</span>)|<span class="hljs-number">0</span>);       <span class="hljs-comment">// -&gt; -20</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3000000000.15</span>|<span class="hljs-number">0</span>);  <span class="hljs-comment">// -&gt; -1294967296 ?</span></code></pre>
<h5>7.3.3 number ^ 0</h5>
<p>^ (按位异或)，对每一对比特位执行异或（XOR）操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(20.15^0);          // -> 20
console.log((-20.15)^0);       // -> -20
console.log(3000000000.15^0);  // -> -1294967296 ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">20.15</span>^<span class="hljs-number">0</span>);          <span class="hljs-comment">// -&gt; 20</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-number">-20.15</span>)^<span class="hljs-number">0</span>);       <span class="hljs-comment">// -&gt; -20</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3000000000.15</span>^<span class="hljs-number">0</span>);  <span class="hljs-comment">// -&gt; -1294967296 ?</span></code></pre>
<h5>7.3.4 number &lt;&lt; 0</h5>
<p>&lt;&lt; (左移) 操作符会将第一个操作数向左移动指定的位数。向左被移出的位被丢弃，右侧用 0 补充。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(20.15 < < 0);     // -> 20
console.log((-20.15) < < 0);  //-20
console.log(3000000000.15 << 0);  // -> -1294967296 ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">20.15</span> &lt; <span class="xml"><span class="hljs-tag">&lt; <span class="hljs-attr">0</span>);     // <span class="hljs-attr">-</span>&gt;</span> 20
console.log((-20.15) <span class="hljs-tag">&lt; &lt; <span class="hljs-attr">0</span>);  //<span class="hljs-attr">-20</span>
<span class="hljs-attr">console.log</span>(<span class="hljs-attr">3000000000.15</span> &lt;&lt; <span class="hljs-attr">0</span>);  // <span class="hljs-attr">-</span>&gt;</span> -1294967296 ?</span></code></pre>
<p>上面这些按位运算符方法执行很快，当你执行数百万这样的操作非常适用，速度明显优于其他方法。但是代码的可读性比较差。还有一个特别要注意的地方，处理比较大的数字时（当数字范围超出 ±2^31−1 即：2147483647），会有一些异常情况。使用的时候明确的检查输入数值的范围。</p>
<h3 id="articleHeader7">8、数组求和</h3>
<h4>8.1 普通版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 3, 4, 5]
function sum(arr){
    let x = 0
    for(let i = 0; i < arr.length; i++){
        x += arr[i]
    }
    return x
}
sum(arr) // 15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
        x += arr[i]
    }
    <span class="hljs-keyword">return</span> x
}
sum(arr) <span class="hljs-comment">// 15</span></code></pre>
<p>优点：通俗易懂，简单粗暴<br>缺点：没有亮点，太通俗</p>
<h4>8.2 优雅版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 3, 4, 5]
function sum(arr) {
return arr.reduce((a, b) => a + b)
}
sum(arr) //15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">arr</span>) </span>{
<span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b)
}
sum(arr) <span class="hljs-comment">//15</span></code></pre>
<p>优点：简单明了，数组迭代器方式清晰直观<br>缺点：不兼容 IE 9以下浏览器</p>
<h4>8.3 终极版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 3, 4, 5]
function sum(arr) {
return eval(arr.join(&quot;+&quot;))
}
sum(arr) //15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">arr</span>) </span>{
<span class="hljs-keyword">return</span> <span class="hljs-built_in">eval</span>(arr.join(<span class="hljs-string">"+"</span>))
}
sum(arr) <span class="hljs-comment">//15</span></code></pre>
<p>优点：让人一时看不懂的就是"好方法"。<br>缺点：</p>
<blockquote>eval 不容易调试。用 chromeDev 等调试工具无法打断点调试，所以麻烦的东西也是不推荐使用的…<p>性能问题，在旧的浏览器中如果你使用了eval，性能会下降10倍。在现代浏览器中有两种编译模式：fast path和slow path。fast path是编译那些稳定和可预测（stable and predictable）的代码。而明显的，eval 不可预测，所以将会使用 slow path ，所以会慢。</p>
</blockquote>
<p>更多关于 <code>eval</code> 的探讨可以关注这篇文章: <a href="https://www.zhihu.com/question/20591877" rel="nofollow noreferrer" target="_blank">JavaScript 为什么不推荐使用 eval？</a></p>
<p><strong>你可能不知道的前端知识点：eval的使用细则</strong></p>
<h3 id="articleHeader8">最后</h3>
<p><strong>祝大家圣诞快乐?，欢迎补充和交流。</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012554830?w=846&amp;h=1030" src="https://static.alili.tech/img/remote/1460000012554830?w=846&amp;h=1030" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012554831?w=1116&amp;h=1078" src="https://static.alili.tech/img/remote/1460000012554831?w=1116&amp;h=1078" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012554832?w=500&amp;h=278" src="https://static.alili.tech/img/remote/1460000012554832?w=500&amp;h=278" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 优雅的实现方式包含你可能不知道的知识点

## 原文链接
[https://segmentfault.com/a/1190000012554823](https://segmentfault.com/a/1190000012554823)


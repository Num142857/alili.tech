---
title: '在 Node.js 中用 pipe 处理数组的实现' 
date: 2019-01-18 2:30:35
hidden: true
slug: cqc8t6lr81
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>TLDR;<br>这篇文章的风格是在致敬 Jim 老师；致敬，致敬，懂吗，不是抄袭，程序员的事怎么能叫抄袭。<br>当然我对 Node.js 的 stream 也是现学现卖，有使用不当的地方，敬请指出。<br><a href="https://github.com/zwhu/blog/issues/34" rel="nofollow noreferrer" target="_blank">原文链接</a> 欢迎 star。</p></blockquote>
<p>写这篇文章的初衷是年前看 SICP 的时候，第二章介绍构造数据抽象的时候有提到 Lisp 对序列的处理采用类似『信号流』的方式。所以很自然的就想到了 Node.js 中的 pipe 方式，于是就一直想用 pipe 的方式尝试一下。</p>
<p>同 Jim 老师的这篇 <a href="http://jimliu.net/2017/02/04/a-failed-attemption-to-js-linq/" rel="nofollow noreferrer" target="_blank">文章</a> 中描述的一样， 我也是懒癌发作，从年尾拖到今年年初，然后在年初又看到了 Jim 老师 的博客，深受启发，终于下定决心要开始码了...... 然后，嗯，又拖到昨天。促使我下定决心要写的主要原因是昨天部门的年会！反正年会跟我这种死肥宅也没多大关系，在大家 happy 的时候构思了下代码实现，回家用了一晚上的时候补上了代码。</p>
<p>Jim 老师在他的文章里面也说了，JS 的那些数组操作 (<code>map</code>/ <code>reduce</code>/<code>filter</code>) 啥的，每次调用的时候都会进行一次完整的遍历。试想一下如果有一个第一个数是1，长度是 1亿 的递增为 1 的数组，需要把所有的数组都乘 3，再排除其中的奇数，如果用 (<code>map</code>/<code>filter</code>) 的方法，只要也需要循环 一亿五千万次；那么如果有其他办法能只循环一亿次，是不是节省了大量的内存资源和循环消耗的时间。</p>
<p>废话不多说，直接上代码吧。</p>
<h3 id="articleHeader0">pipe</h3>
<blockquote><p>在编写代码时，我们应该有一些方法将程序像连接水管一样连接起来 -- 当我们需要获取一些数据时，可以去通过"拧"其他的部分来达到目的。这也应该是IO应有的方式。 -- Doug McIlroy. October 11, 1964</p></blockquote>
<p>关于 node 的 stream 可以看看这篇 <a href="https://github.com/jabez128/stream-handbook" rel="nofollow noreferrer" target="_blank">文章</a>。</p>
<p>下面是代码部分，整个代码我是在边学 pipe 边用一晚上的时间仓促写就的，懒癌发作，也不想再重构了，各位相公讲究看吧，求别喷代码。</p>
<h3 id="articleHeader1">入口</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const stream = require('stream')

const last = Symbol()

// 在 selfArray 中接收一个真正的数组
// 返回一个可读流
// 如果再做的精细点，可以做成可读可写流，这样就能通过控制流的大小，来控制内存的大小，别几亿条数据直接撑爆内存了
// 不过对后面 reduce 的处理就比较麻烦
function selfArray(a) {
  const rs = new stream.Readable({
    objectMode: true
  })

  a.forEach((v, index) => {
    rs.push(v)
  })
  rs.push(last)
  rs.push(null)
  return rs
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> stream = <span class="hljs-built_in">require</span>(<span class="hljs-string">'stream'</span>)

<span class="hljs-keyword">const</span> last = <span class="hljs-built_in">Symbol</span>()

<span class="hljs-comment">// 在 selfArray 中接收一个真正的数组</span>
<span class="hljs-comment">// 返回一个可读流</span>
<span class="hljs-comment">// 如果再做的精细点，可以做成可读可写流，这样就能通过控制流的大小，来控制内存的大小，别几亿条数据直接撑爆内存了</span>
<span class="hljs-comment">// 不过对后面 reduce 的处理就比较麻烦</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selfArray</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">const</span> rs = <span class="hljs-keyword">new</span> stream.Readable({
    <span class="hljs-attr">objectMode</span>: <span class="hljs-literal">true</span>
  })

  a.forEach(<span class="hljs-function">(<span class="hljs-params">v, index</span>) =&gt;</span> {
    rs.push(v)
  })
  rs.push(last)
  rs.push(<span class="hljs-literal">null</span>)
  <span class="hljs-keyword">return</span> rs
}
</code></pre>
<p>上面的 selfArray 在流的最后面 push 了一个 Symbol 对象来标志整个流的输入结束，留待为之后 reduce 的使用。</p>
<h3 id="articleHeader2">
<code>Map</code>/<code>Filter</code>/<code>Reduce</code> 的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function forEach(callback) {
  const ws = new stream.Writable({
    objectMode: true
  })
  let index = 0

  ws._write = function (chunk, enc, next) {
    if (chunk !== last) {
      callback(chunk, index++)
      next()
    }
  }

  return ws
}

function filter(callback) {
  const trans = new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true
  })

  let index = 0

  trans._transform = function (chunk, enc, next) {
    if (chunk === last) {
      next(null, last)
    } else {
      let condition = callback(chunk, index++)
      if (condition) {
        this.push(chunk)
      }
      next()
    }
  }
  return trans
}

function map(callback) {
  const trans = new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true
  })
  let index = 0
  trans._transform = function (chunk, enc, next) {
    if (chunk === last) {
      next(null, last)
    } else {
      next(null, callback(chunk, index++))
    }
  }
  return trans
}

function reduce(callback, initial) {
  const trans = new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true
  })

  let index = 0,
    current = initial,
    prev = initial


  trans._transform = function (chunk, enc, next) {

    if (chunk === last) {
      if (index > 1) {
        prev = callback(prev, current, index - 1)
      }
      this.push(prev)
      this.push(last)
      return next(null, last)
    }

    if (initial === void 0 &amp;&amp; index === 0) {
      prev = chunk
    }

    if (index > 0) {
      prev = callback(prev, current, index - 1)
    }

    current = chunk
    index++
    next()
  }

  return trans
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forEach</span>(<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> stream.Writable({
    <span class="hljs-attr">objectMode</span>: <span class="hljs-literal">true</span>
  })
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>

  ws._write = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk, enc, next</span>) </span>{
    <span class="hljs-keyword">if</span> (chunk !== last) {
      callback(chunk, index++)
      next()
    }
  }

  <span class="hljs-keyword">return</span> ws
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filter</span>(<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">const</span> trans = <span class="hljs-keyword">new</span> stream.Transform({
    <span class="hljs-attr">readableObjectMode</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">writableObjectMode</span>: <span class="hljs-literal">true</span>
  })

  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>

  trans._transform = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk, enc, next</span>) </span>{
    <span class="hljs-keyword">if</span> (chunk === last) {
      next(<span class="hljs-literal">null</span>, last)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">let</span> condition = callback(chunk, index++)
      <span class="hljs-keyword">if</span> (condition) {
        <span class="hljs-keyword">this</span>.push(chunk)
      }
      next()
    }
  }
  <span class="hljs-keyword">return</span> trans
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">map</span>(<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">const</span> trans = <span class="hljs-keyword">new</span> stream.Transform({
    <span class="hljs-attr">readableObjectMode</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">writableObjectMode</span>: <span class="hljs-literal">true</span>
  })
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>
  trans._transform = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk, enc, next</span>) </span>{
    <span class="hljs-keyword">if</span> (chunk === last) {
      next(<span class="hljs-literal">null</span>, last)
    } <span class="hljs-keyword">else</span> {
      next(<span class="hljs-literal">null</span>, callback(chunk, index++))
    }
  }
  <span class="hljs-keyword">return</span> trans
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reduce</span>(<span class="hljs-params">callback, initial</span>) </span>{
  <span class="hljs-keyword">const</span> trans = <span class="hljs-keyword">new</span> stream.Transform({
    <span class="hljs-attr">readableObjectMode</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">writableObjectMode</span>: <span class="hljs-literal">true</span>
  })

  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>,
    current = initial,
    prev = initial


  trans._transform = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk, enc, next</span>) </span>{

    <span class="hljs-keyword">if</span> (chunk === last) {
      <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">1</span>) {
        prev = callback(prev, current, index - <span class="hljs-number">1</span>)
      }
      <span class="hljs-keyword">this</span>.push(prev)
      <span class="hljs-keyword">this</span>.push(last)
      <span class="hljs-keyword">return</span> next(<span class="hljs-literal">null</span>, last)
    }

    <span class="hljs-keyword">if</span> (initial === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> &amp;&amp; index === <span class="hljs-number">0</span>) {
      prev = chunk
    }

    <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">0</span>) {
      prev = callback(prev, current, index - <span class="hljs-number">1</span>)
    }

    current = chunk
    index++
    next()
  }

  <span class="hljs-keyword">return</span> trans
}
</code></pre>
<p>上面的代码在 reduce 的实现稍微麻烦了一些，reduce 对没有初始值，原始数组为空的条件下有各种不同的处理情况，翻看了下 MDN 的解释又自己实现了下。</p>
<h3 id="articleHeader3">使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selfArray([9, 2, 6, 3, 5, 6, 7, 1, 4, 4])
  .pipe(map(v => v * 3))
  .pipe(filter(v => v % 2))
  .pipe(reduce((p, c) => p + c, 0))
  .pipe(forEach(v => {
    console.log('pipe 计算最后的结果是:', v)
  }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">selfArray([<span class="hljs-number">9</span>, <span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>])
  .pipe(map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v * <span class="hljs-number">3</span>))
  .pipe(filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v % <span class="hljs-number">2</span>))
  .pipe(reduce(<span class="hljs-function">(<span class="hljs-params">p, c</span>) =&gt;</span> p + c, <span class="hljs-number">0</span>))
  .pipe(forEach(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'pipe 计算最后的结果是:'</span>, v)
  }))</code></pre>
<p>为了好看我故意把各种括号都删掉了。嗯，看起来还挺完美，我们来测试下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selfArray([9, 2, 6, 3, 5, 6, 7, 1, 4, 4])
  .pipe(map(v => {
    console.log('map:', v)
    return v * 3
  }))
  .pipe(filter(v => {
    console.log('filter:', v)
    return v % 2
  }))
  .pipe(reduce((p, c) => {
    console.log('reduce:', p, c)
    return p + c
  }, 0))
  .pipe(forEach(v => {
    console.log('pipe 计算最后的结果是:', v)
  }))
  
  
加上 log 之后可以看到结算结果是:
  
map: 9
filter: 27
map: 2
filter: 6
map: 6
filter: 18
map: 3
filter: 9
reduce: 0 27
map: 5
filter: 15
reduce: 27 9
map: 6
filter: 18
map: 7
filter: 21
reduce: 36 15
map: 1
filter: 3
reduce: 51 21
map: 4
filter: 12
map: 4
filter: 12
reduce: 72 3
pipe 计算最后的结果是: 75
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>selfArray([<span class="hljs-number">9</span>, <span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>])
  .pipe(<span class="hljs-built_in">map</span>(v =&gt; {
    console.log('<span class="hljs-built_in">map</span>:', v)
    <span class="hljs-keyword">return</span> v * <span class="hljs-number">3</span>
  }))
  .pipe(<span class="hljs-built_in">filter</span>(v =&gt; {
    console.log('<span class="hljs-built_in">filter</span>:', v)
    <span class="hljs-keyword">return</span> v % <span class="hljs-number">2</span>
  }))
  .pipe(<span class="hljs-built_in">reduce</span>((p, <span class="hljs-built_in">c</span>) =&gt; {
    console.log('<span class="hljs-built_in">reduce</span>:', p, <span class="hljs-built_in">c</span>)
    <span class="hljs-keyword">return</span> p + <span class="hljs-built_in">c</span>
  }, <span class="hljs-number">0</span>))
  .pipe(forEach(v =&gt; {
    console.log('pipe 计算最后的结果是:', v)
  }))
  
  
加上 log 之后可以看到结算结果是:
  
<span class="hljs-built_in">map</span>: <span class="hljs-number">9</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">27</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">2</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">6</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">6</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">18</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">3</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">9</span>
<span class="hljs-built_in">reduce</span>: <span class="hljs-number">0</span> <span class="hljs-number">27</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">5</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">15</span>
<span class="hljs-built_in">reduce</span>: <span class="hljs-number">27</span> <span class="hljs-number">9</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">6</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">18</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">7</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">21</span>
<span class="hljs-built_in">reduce</span>: <span class="hljs-number">36</span> <span class="hljs-number">15</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">1</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">3</span>
<span class="hljs-built_in">reduce</span>: <span class="hljs-number">51</span> <span class="hljs-number">21</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">4</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">12</span>
<span class="hljs-built_in">map</span>: <span class="hljs-number">4</span>
<span class="hljs-built_in">filter</span>: <span class="hljs-number">12</span>
<span class="hljs-built_in">reduce</span>: <span class="hljs-number">72</span> <span class="hljs-number">3</span>
pipe 计算最后的结果是: <span class="hljs-number">75</span>
</code></pre>
<p>从上面的 log 可以看到， 第一个数 9 先执行了 <code>map</code>，然后在 <em> 3 之后就直接进入了 <code>filter</code>，此时第 2 个数 2 也开始被 <code>map</code> 处理，然后被 <code>filter</code> 处理，但是由于 </em> 3 之后是偶数不会被 <code>reduce</code> 接收， <code>reduce</code> 会一直等到第二个奇数，也就是 3 进入之后才会被处理... 嗯，直到最终的计算结果是 75， 被 <code>forEach</code> 消耗。</p>
<h3 id="articleHeader4">总结</h3>
<p>虽然我没有像 Jim 老师一样进行性能测试，但是猜测也知道 pipe 的方式在数量比较小的时候肯定要弱于正常方式，pipe 的好处在于数据量比较大的时候，可以使用比较小的内存，尽快的处理数组中前置的数据。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Node.js 中用 pipe 处理数组的实现

## 原文链接
[https://segmentfault.com/a/1190000008745440](https://segmentfault.com/a/1190000008745440)


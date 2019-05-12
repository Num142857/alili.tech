---
title: '聊聊lodash的debounce实现' 
date: 2018-12-25 2:30:11
hidden: true
slug: c6tj1ctbhc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文同步自我的<a href="https://github.com/ZhangFe/Blog/issues/8" rel="nofollow noreferrer" target="_blank">Blog</a></p></blockquote>
<p>前段时间团队内部搞了一个代码训练营，大家组织在一起实现 <code>lodash</code> 的 <code>throttle</code> 和 <code>debounce</code>，实现起来觉得并不麻烦，但是最后和官方的一对比，发现功能的实现上还是有差距的，为了寻找我的问题，把官方源码阅读了一遍，本文是我阅读完成后的一篇总结。</p>
<p>本文只会列出比较核心部分的代码和注释，如果对全部的源码有兴趣的欢迎直接看我的<a href="https://github.com/ZhangFe/source-code-learning" rel="nofollow noreferrer" target="_blank">repo</a>：</p>
<h2 id="articleHeader0">什么是throttle和debounce</h2>
<p><code>throttle</code>(又称节流)和<code>debounce</code>(又称防抖)其实都是函数调用频率的控制器，这里只做简单的介绍，如果想了解更多关于这两个定义的细节可以看下后文给出的一张图片，或者阅读一下<a href="https://lodash.com/docs/4.17.4" rel="nofollow noreferrer" target="_blank">lodash的文档</a>。</p>
<p><code>throttle</code>：将一个函数的调用频率限制在一定阈值内，例如 1s 内一个函数不能被调用两次。</p>
<p><code>debounce</code>：当调用函数n秒后，才会执行该动作，若在这n秒内又调用该函数则将取消前一次并重新计算执行时间，举个简单的例子，我们要根据用户输入做suggest，每当用户按下键盘的时候都可以取消前一次，并且只关心最后一次输入的时间就行了。</p>
<p><code>lodash</code> 对这两个函数又增加了一些参数，主要是以下三个：</p>
<ul>
<li><p>leading，函数在每个等待时延的开始被调用</p></li>
<li><p>trailing，函数在每个等待时延的结束被调用</p></li>
<li><p>maxwait(debounce才有的配置)，最大的等待时间，因为如果 <code>debounce</code> 的函数调用时间不满足条件，可能永远都无法触发，因此增加了这个配置，保证大于一段时间后一定能执行一次函数</p></li>
</ul>
<blockquote><p>这里直接剧透一下，其实 <code>throttle</code> 就是设置了 <code>maxwait</code> 的 <code>debounce</code>，所以我这里也只会介绍 <code>debounce</code> 的代码，聪明的读者们可以自己思考一下为什么。</p></blockquote>
<h2 id="articleHeader1">我的实现与lodash的区别</h2>
<p>我自己的代码实现放在我的<a href="https://github.com/ZhangFe/source-code-learning/blob/master/debounce-throttle/my-debounce.js" rel="nofollow noreferrer" target="_blank">repo</a>里，大家有兴趣的可以看下。之前说过我的实现和 <code>lodash</code> 有些区别，下面就用两张图来展示一下。</p>
<p>这是我的实现<br><span class="img-wrap"><img data-src="/img/remote/1460000012102377?w=318&amp;h=435" src="https://static.alili.tech/img/remote/1460000012102377?w=318&amp;h=435" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这是lodash的实现<br><span class="img-wrap"><img data-src="/img/remote/1460000012106233?w=451&amp;h=443" src="https://static.alili.tech/img/remote/1460000012106233?w=451&amp;h=443" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里看到，我的代码主要有两个问题：</p>
<ol>
<li><p><code>throttle</code> 的最后一次函数会执行两次，而且并非稳定复现。</p></li>
<li><p><code>throttle</code> 里函数执行的顺序不对，虽然我的功能实现了，但是对于每一次 <code>wait</code> 来说，我都是执行的 <code>leading</code> 那一次</p></li>
</ol>
<h2 id="articleHeader2">lodash 的实现解读</h2>
<p>下面，我就会带着这几个问题去看看 <code>lodasah</code> 的代码。</p>
<p>官方代码的实现也不是很复杂，这里我贴出一些核心部分代码和我阅读后的注释，后面会讲一下 lodash 的大概流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(func, wait, options) {
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime

    // 参数初始化
    let lastInvokeTime = 0 // func 上一次执行的时间
    let leading = false
    let maxing = false
    let trailing = true

    // 基本的类型判断和处理
    if (typeof func != 'function') {
        throw new TypeError('Expected a function')
    }
    wait = +wait || 0
    if (isObject(options)) {
        // 对配置的一些初始化
    }

    function invokeFunc(time) {
        const args = lastArgs
        const thisArg = lastThis

        lastArgs = lastThis = undefined
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        return result
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time
        // 为 trailing edge 触发函数调用设定定时器
        timerId = setTimeout(timerExpired, wait)
        // leading = true 执行函数
        return leading ? invokeFunc(time) : result
    }

   function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime // 距离上次debounced函数被调用的时间
        const timeSinceLastInvoke = time - lastInvokeTime // 距离上次函数被执行的时间
        const timeWaiting = wait - timeSinceLastCall // 用 wait 减去 timeSinceLastCall 计算出下一次trailing的位置

        // 两种情况
        // 有maxing:比较出下一次maxing和下一次trailing的最小值，作为下一次函数要执行的时间
        // 无maxing：在下一次trailing时执行 timerExpired
        return maxing
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting
    }

    // 根据时间判断 func 能否被执行
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime

        // 几种满足条件的情况
        return (lastCallTime === undefined //首次
            || (timeSinceLastCall >= wait) // 距离上次被调用已经超过 wait
            || (timeSinceLastCall < 0) //系统时间倒退
            || (maxing &amp;&amp; timeSinceLastInvoke >= maxWait)) //超过最大等待时间
    }

    function timerExpired() {
        const time = Date.now()
        // 在 trailing edge 且时间符合条件时，调用 trailingEdge函数，否则重启定时器
        if (shouldInvoke(time)) {
            return trailingEdge(time)
        }
        // 重启定时器，保证下一次时延的末尾触发
        timerId = setTimeout(timerExpired, remainingWait(time))
    }

    function trailingEdge(time) {
        timerId = undefined

        // 有lastArgs才执行，意味着只有 func 已经被 debounced 过一次以后才会在 trailing edge 执行
        if (trailing &amp;&amp; lastArgs) {
            return invokeFunc(time)
        }
        // 每次 trailingEdge 都会清除 lastArgs 和 lastThis，目的是避免最后一次函数被执行了两次
        // 举个例子：最后一次函数执行的时候，可能恰巧是前一次的 trailing edge，函数被调用，而这个函数又需要在自己时延的 trailing edge 触发，导致触发多次
        lastArgs = lastThis = undefined
        return result
    }

    function cancel() {}

    function flush() {}

    function pending() {}

    function debounced(...args) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time) //是否满足时间条件

        lastArgs = args
        lastThis = this
        lastCallTime = time  //函数被调用的时间

        if (isInvoking) {
            if (timerId === undefined) { // 无timerId的情况有两种：1.首次调用 2.trailingEdge执行过函数
                return leadingEdge(lastCallTime)
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait)
                return invokeFunc(lastCallTime)
            }
        }
        // 负责一种case：trailing 为 true 的情况下，在前一个 wait 的 trailingEdge 已经执行了函数；
        // 而这次函数被调用时 shouldInvoke 不满足条件，因此要设置定时器，在本次的 trailingEdge 保证函数被执行
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait)
        }
        return result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    debounced.pending = pending
    return debounced
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span><span class="hljs-params">(func, wait, options)</span> </span>{
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime

    <span class="hljs-comment">// 参数初始化</span>
    let lastInvokeTime = <span class="hljs-number">0</span> <span class="hljs-comment">// func 上一次执行的时间</span>
    let leading = <span class="hljs-literal">false</span>
    let maxing = <span class="hljs-literal">false</span>
    let trailing = <span class="hljs-literal">true</span>

    <span class="hljs-comment">// 基本的类型判断和处理</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> func != <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> TypeError(<span class="hljs-string">'Expected a function'</span>)
    }
    wait = +wait || <span class="hljs-number">0</span>
    <span class="hljs-keyword">if</span> (isObject(options)) {
        <span class="hljs-comment">// 对配置的一些初始化</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invokeFunc</span><span class="hljs-params">(time)</span> </span>{
        <span class="hljs-keyword">const</span> args = lastArgs
        <span class="hljs-keyword">const</span> thisArg = lastThis

        lastArgs = lastThis = <span class="hljs-literal">undefined</span>
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        <span class="hljs-keyword">return</span> result
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">leadingEdge</span><span class="hljs-params">(time)</span> </span>{
        <span class="hljs-comment">// Reset any `maxWait` timer.</span>
        lastInvokeTime = time
        <span class="hljs-comment">// 为 trailing edge 触发函数调用设定定时器</span>
        timerId = setTimeout(timerExpired, wait)
        <span class="hljs-comment">// leading = true 执行函数</span>
        <span class="hljs-keyword">return</span> leading ? invokeFunc(time) : result
    }

   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remainingWait</span><span class="hljs-params">(time)</span> </span>{
        <span class="hljs-keyword">const</span> timeSinceLastCall = time - lastCallTime <span class="hljs-comment">// 距离上次debounced函数被调用的时间</span>
        <span class="hljs-keyword">const</span> timeSinceLastInvoke = time - lastInvokeTime <span class="hljs-comment">// 距离上次函数被执行的时间</span>
        <span class="hljs-keyword">const</span> timeWaiting = wait - timeSinceLastCall <span class="hljs-comment">// 用 wait 减去 timeSinceLastCall 计算出下一次trailing的位置</span>

        <span class="hljs-comment">// 两种情况</span>
        <span class="hljs-comment">// 有maxing:比较出下一次maxing和下一次trailing的最小值，作为下一次函数要执行的时间</span>
        <span class="hljs-comment">// 无maxing：在下一次trailing时执行 timerExpired</span>
        <span class="hljs-keyword">return</span> maxing
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting
    }

    <span class="hljs-comment">// 根据时间判断 func 能否被执行</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shouldInvoke</span><span class="hljs-params">(time)</span> </span>{
        <span class="hljs-keyword">const</span> timeSinceLastCall = time - lastCallTime
        <span class="hljs-keyword">const</span> timeSinceLastInvoke = time - lastInvokeTime

        <span class="hljs-comment">// 几种满足条件的情况</span>
        <span class="hljs-keyword">return</span> (lastCallTime === <span class="hljs-literal">undefined</span> <span class="hljs-comment">//首次</span>
            || (timeSinceLastCall &gt;= wait) <span class="hljs-comment">// 距离上次被调用已经超过 wait</span>
            || (timeSinceLastCall &lt; <span class="hljs-number">0</span>) <span class="hljs-comment">//系统时间倒退</span>
            || (maxing &amp;&amp; timeSinceLastInvoke &gt;= maxWait)) <span class="hljs-comment">//超过最大等待时间</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timerExpired</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">const</span> time = Date.now()
        <span class="hljs-comment">// 在 trailing edge 且时间符合条件时，调用 trailingEdge函数，否则重启定时器</span>
        <span class="hljs-keyword">if</span> (shouldInvoke(time)) {
            <span class="hljs-keyword">return</span> trailingEdge(time)
        }
        <span class="hljs-comment">// 重启定时器，保证下一次时延的末尾触发</span>
        timerId = setTimeout(timerExpired, remainingWait(time))
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trailingEdge</span><span class="hljs-params">(time)</span> </span>{
        timerId = <span class="hljs-literal">undefined</span>

        <span class="hljs-comment">// 有lastArgs才执行，意味着只有 func 已经被 debounced 过一次以后才会在 trailing edge 执行</span>
        <span class="hljs-keyword">if</span> (trailing &amp;&amp; lastArgs) {
            <span class="hljs-keyword">return</span> invokeFunc(time)
        }
        <span class="hljs-comment">// 每次 trailingEdge 都会清除 lastArgs 和 lastThis，目的是避免最后一次函数被执行了两次</span>
        <span class="hljs-comment">// 举个例子：最后一次函数执行的时候，可能恰巧是前一次的 trailing edge，函数被调用，而这个函数又需要在自己时延的 trailing edge 触发，导致触发多次</span>
        lastArgs = lastThis = <span class="hljs-literal">undefined</span>
        <span class="hljs-keyword">return</span> result
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancel</span><span class="hljs-params">()</span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flush</span><span class="hljs-params">()</span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pending</span><span class="hljs-params">()</span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounced</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
        <span class="hljs-keyword">const</span> time = Date.now()
        <span class="hljs-keyword">const</span> isInvoking = shouldInvoke(time) <span class="hljs-comment">//是否满足时间条件</span>

        lastArgs = args
        lastThis = <span class="hljs-keyword">this</span>
        lastCallTime = time  <span class="hljs-comment">//函数被调用的时间</span>

        <span class="hljs-keyword">if</span> (isInvoking) {
            <span class="hljs-keyword">if</span> (timerId === <span class="hljs-literal">undefined</span>) { <span class="hljs-comment">// 无timerId的情况有两种：1.首次调用 2.trailingEdge执行过函数</span>
                <span class="hljs-keyword">return</span> leadingEdge(lastCallTime)
            }
            <span class="hljs-keyword">if</span> (maxing) {
                <span class="hljs-comment">// Handle invocations in a tight loop.</span>
                timerId = setTimeout(timerExpired, wait)
                <span class="hljs-keyword">return</span> invokeFunc(lastCallTime)
            }
        }
        <span class="hljs-comment">// 负责一种case：trailing 为 true 的情况下，在前一个 wait 的 trailingEdge 已经执行了函数；</span>
        <span class="hljs-comment">// 而这次函数被调用时 shouldInvoke 不满足条件，因此要设置定时器，在本次的 trailingEdge 保证函数被执行</span>
        <span class="hljs-keyword">if</span> (timerId === <span class="hljs-literal">undefined</span>) {
            timerId = setTimeout(timerExpired, wait)
        }
        <span class="hljs-keyword">return</span> result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    debounced.pending = pending
    <span class="hljs-keyword">return</span> debounced
}</code></pre>
<p>这里我用文字来简单描述一下流程：</p>
<p>首次进入函数时因为 lastCallTime === undefined 并且 timerId === undefined，所以会执行 leadingEdge，如果此时 leading 为 true 的话，就会执行 func。同时，这里会设置一个定时器，在等待 wait(s) 后会执行 timerExpired，timerExpired 的主要作用就是触发 trailing。</p>
<p>如果在还未到 wait 的时候就再次调用了函数的话,会更新 lastCallTime，并且因为此时 isInvoking 不满足条件，所以这次什么也不会执行。</p>
<p>时间到达 wait 时，就会执行我们一开始设定的定时器timerExpired，此时因为time-lastCallTime &lt; wait，所以不会执行 trailingEdge。</p>
<p>这时又会新增一个定时器，下一次执行的时间是 remainingWait，这里会根据是否有 maxwait 来作区分：</p>
<ul>
<li><p>如果没有 maxwait，定时器的时间是 wait - timeSinceLastCall，保证下一次 trailing 的执行。</p></li>
<li><p>如果有 maxing，会比较出下一次 maxing 和下一次 trailing 的最小值，作为下一次函数要执行的时间。</p></li>
</ul>
<p>最后，如果不再有函数调用，就会在定时器结束时执行 trailingEdge。</p>
<h2 id="articleHeader3">我的问题出在哪？</h2>
<p>那么，回到上面的两个问题，我的代码究竟是哪里出了问题呢？</p>
<h4>为什么顺序图不对</h4>
<p>研究了一下，lodash是比较稳定的在trailing时触发前一次函数调用的，而我的则是每次在 maxWait 时触发的下一次调用。问题就出在对于定时器的控制上。</p>
<p>因为在编码时考虑到定时器和 maxwait 会冲突的问题，在函数每次被调用的时候都会 <code>clearTimeout(timer)</code>，因此我的 <code>trailing</code> 判断其实只对整个执行流的最后一次有效，而非 lodash 所说的 <code>trailing</code> 控制的是函数在每个 <code>wait</code> 的最后执行。</p>
<p>而 lodash 并不会清除定时器，只是每次生成新的定时器的时候都会根据 lastCallTime 来计算下一次该执行的时间，不仅保证了定时器的准确性，也保证了对每次 <code>trailing</code> 的控制。</p>
<h4>为什么最后会触发两次</h4>
<p>通过打 log 我发现这种触发两次的情况非常凑巧，最后一次函数执行的时候，正好满足前一个时延的 trailing，然后自己这个 wait 的定时器也触发了，所以最后又触发了一次本次时延的 trailing，所以触发了两次。</p>
<p>理论上 lodash 也会出现这种情况，但是它在每次函数执行的时候都会删除 lastArgs 和 lastThis，而下次函数执行的时候都会判断这两个参数是否存在，因此避免了这种情况。</p>
<h2 id="articleHeader4">总结</h2>
<p>其实之前就知道 <code>debounce</code> 和 <code>throttle</code> 的用途和含义，但是每次用起来都得去看一眼文档，通过这次自己实现以及对源码的阅读，终于做到了了熟于心，也发现自己的代码设计能力还是有缺陷，一开始并没有想的很到位。</p>
<p>写代码的，还是要多写，多看；慢慢做到会写，会看；与大家共勉。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊lodash的debounce实现

## 原文链接
[https://segmentfault.com/a/1190000012102372](https://segmentfault.com/a/1190000012102372)


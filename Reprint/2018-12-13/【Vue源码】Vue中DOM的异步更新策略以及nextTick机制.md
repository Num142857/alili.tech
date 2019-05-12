---
title: '【Vue源码】Vue中DOM的异步更新策略以及nextTick机制' 
date: 2018-12-13 2:30:07
hidden: true
slug: mw3k1l3omtn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本篇文章主要是对<code>Vue</code>中的<code>DOM</code>异步更新策略和<code>nextTick</code>机制的解析，需要读者有一定的<code>Vue</code>使用经验并且熟悉掌握JavaScript事件循环模型。</blockquote>
<h3 id="articleHeader0">引入：DOM的异步更新</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <div ref=&quot;test&quot;>"{{"test"}}"</div>
    <button @click=&quot;handleClick&quot;>tet</button>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"test"</span>&gt;</span>"{{"test"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>tet<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data () {
        return {
            test: 'begin'
        };
    },
    methods () {
        handleClick () {
            this.test = 'end';
            console.log(this.$refs.test.innerText);//打印“begin”
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">test</span>: <span class="hljs-string">'begin'</span>
        };
    },
    methods () {
        handleClick () {
            <span class="hljs-keyword">this</span>.test = <span class="hljs-string">'end'</span>;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$refs.test.innerText);<span class="hljs-comment">//打印“begin”</span>
        }
    }
}</code></pre>
<p>打印的结果是<code>begin</code>而不是我们设置的<code>end</code>。这个结果足以说明<code>Vue</code>中<code>DOM</code>的更新并非同步。</p>
<p>在<code>Vue</code>官方文档中是这样说明的：</p>
<blockquote>可能你还没有注意到，<code>Vue</code>异步执行<code>DOM</code>更新。只要观察到数据变化，<code>Vue</code>将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个<code>watcher</code>被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和<code>DOM</code>操作上非常重要。然后，在下一个的事件循环“<code>tick</code>”中，<code>Vue</code>刷新队列并执行实际 (已去重的) 工作。</blockquote>
<p>简而言之，就是在一个事件循环中发生的所有数据改变都会在下一个事件循环的<code>Tick</code>中来触发视图更新，这也是一个“批处理”的过程。（注意下一个事件循环的<code>Tick</code>有可能是在当前的<code>Tick</code>微任务执行阶段执行，也可能是在下一个<code>Tick</code>执行，主要取决于<code>nextTick</code>函数到底是使用<code>Promise/MutationObserver</code>还是<code>setTimeout</code>）</p>
<h3 id="articleHeader1">Watcher队列</h3>
<p>在<code>Watcher</code>的源码中，我们发现<code>watcher</code>的<code>update</code>其实是异步的。（注：<code>sync</code>属性默认为<code>false</code>，也就是异步）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update () {
    /* istanbul ignore else */
    if (this.lazy) {
        this.dirty = true
    } else if (this.sync) {
        /*同步则执行run直接渲染视图*/
        this.run()
    } else {
        /*异步推送到观察者队列中，下一个tick时调用。*/
        queueWatcher(this)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">update () {
    <span class="hljs-comment">/* istanbul ignore else */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lazy) {
        <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {
        <span class="hljs-comment">/*同步则执行run直接渲染视图*/</span>
        <span class="hljs-keyword">this</span>.run()
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">/*异步推送到观察者队列中，下一个tick时调用。*/</span>
        queueWatcher(<span class="hljs-keyword">this</span>)
    }
}</code></pre>
<p><code>queueWatcher(this)</code>函数的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/
export function queueWatcher (watcher: Watcher) {
    /*获取watcher的id*/
    const id = watcher.id
    /*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/
    if (has[id] == null) {
        has[id] = true
        if (!flushing) {
            /*如果没有flush掉，直接push到队列中即可*/
            queue.push(watcher)
        } else {
        ...
        }
        // queue the flush
        if (!waiting) {
            waiting = true
            nextTick(flushSchedulerQueue)
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-comment">/*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueWatcher</span> (<span class="hljs-params">watcher: Watcher</span>) </span>{
    <span class="hljs-comment">/*获取watcher的id*/</span>
    <span class="hljs-keyword">const</span> id = watcher.id
    <span class="hljs-comment">/*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/</span>
    <span class="hljs-keyword">if</span> (has[id] == <span class="hljs-literal">null</span>) {
        has[id] = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">if</span> (!flushing) {
            <span class="hljs-comment">/*如果没有flush掉，直接push到队列中即可*/</span>
            queue.push(watcher)
        } <span class="hljs-keyword">else</span> {
        ...
        }
        <span class="hljs-comment">// queue the flush</span>
        <span class="hljs-keyword">if</span> (!waiting) {
            waiting = <span class="hljs-literal">true</span>
            nextTick(flushSchedulerQueue)
        }
    }
}</code></pre>
<p>这段源码有几个需要注意的地方：</p>
<ol>
<li>
<p>首先需要知道的是<code>watcher</code>执行<code>update</code>的时候，默认情况下肯定是异步的，它会做以下的两件事：</p>
<ul>
<li>判断<code>has</code>数组中是否有这个<code>watcher</code>的<code>id</code>
</li>
<li>如果有的话是不需要把<code>watcher</code>加入<code>queue</code>中的，否则不做任何处理。</li>
</ul>
</li>
<li>这里面的<code>nextTick(flushSchedulerQueue)</code>中，<code>flushScheduleQueue</code>函数的作用主要是执行视图更新的操作，它会把<code>queue</code>中所有的<code>watcher</code>取出来并执行相应的视图更新。</li>
<li>核心其实是<code>nextTick</code>函数了，下面我们具体看一下<code>nextTick</code>到底有什么用。</li>
</ol>
<h3 id="articleHeader2">nextTick</h3>
<p><code>nextTick</code>函数其实做了两件事情，一是生成一个<code>timerFunc</code>，把回调作为<code>microTask</code>或<code>macroTask</code>参与到事件循环中来。二是把回调函数放入一个<code>callbacks</code>队列，等待适当的时机执行。（这个时机和<code>timerFunc</code>不同的实现有关）</p>
<p>首先我们先来看它是怎么生成一个<code>timerFunc</code>把回调作为<code>microTask</code>或<code>macroTask</code>的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof Promise !== 'undefined' &amp;&amp; isNative(Promise)) {
    /*使用Promise*/
    var p = Promise.resolve()
    var logError = err => { console.error(err) }
    timerFunc = () => {
        p.then(nextTickHandler).catch(logError)
        // in problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microTask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // &quot;force&quot; the microTask queue to be flushed by adding an empty timer.
        if (isIOS) setTimeout(noop)
    }
} else if (typeof MutationObserver !== 'undefined' &amp;&amp; (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    /*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调*/
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
} else {
    // fallback to setTimeout
    /* istanbul ignore next */
    /*使用setTimeout将回调推入任务队列尾部*/
    timerFunc = () => {
        setTimeout(nextTickHandler, 0)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; isNative(<span class="hljs-built_in">Promise</span>)) {
    <span class="hljs-comment">/*使用Promise*/</span>
    <span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Promise</span>.resolve()
    <span class="hljs-keyword">var</span> logError = <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> { <span class="hljs-built_in">console</span>.error(err) }
    timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        p.then(nextTickHandler).catch(logError)
        <span class="hljs-comment">// in problematic UIWebViews, Promise.then doesn't completely break, but</span>
        <span class="hljs-comment">// it can get stuck in a weird state where callbacks are pushed into the</span>
        <span class="hljs-comment">// microTask queue but the queue isn't being flushed, until the browser</span>
        <span class="hljs-comment">// needs to do some other work, e.g. handle a timer. Therefore we can</span>
        <span class="hljs-comment">// "force" the microTask queue to be flushed by adding an empty timer.</span>
        <span class="hljs-keyword">if</span> (isIOS) setTimeout(noop)
    }
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> MutationObserver !== <span class="hljs-string">'undefined'</span> &amp;&amp; (
    isNative(MutationObserver) ||
    <span class="hljs-comment">// PhantomJS and iOS 7.x</span>
    MutationObserver.toString() === <span class="hljs-string">'[object MutationObserverConstructor]'</span>
    )) {
    <span class="hljs-comment">// use MutationObserver where native Promise is not available,</span>
    <span class="hljs-comment">// e.g. PhantomJS IE11, iOS7, Android 4.4</span>
    <span class="hljs-comment">/*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调*/</span>
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">1</span>
    <span class="hljs-keyword">var</span> observer = <span class="hljs-keyword">new</span> MutationObserver(nextTickHandler)
    <span class="hljs-keyword">var</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-built_in">String</span>(counter))
    observer.observe(textNode, {
        <span class="hljs-attr">characterData</span>: <span class="hljs-literal">true</span>
    })
    timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        counter = (counter + <span class="hljs-number">1</span>) % <span class="hljs-number">2</span>
        textNode.data = <span class="hljs-built_in">String</span>(counter)
    }
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// fallback to setTimeout</span>
    <span class="hljs-comment">/* istanbul ignore next */</span>
    <span class="hljs-comment">/*使用setTimeout将回调推入任务队列尾部*/</span>
    timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        setTimeout(nextTickHandler, <span class="hljs-number">0</span>)
    }
}</code></pre>
<p>值得注意的是，它会按照<code>Promise</code>、<code>MutationObserver</code>、<code>setTimeout</code>优先级去调用传入的回调函数。前两者会生成一个<code>microTask</code>任务，而后者会生成一个<code>macroTask</code>。（微任务和宏任务）</p>
<p>之所以会设置这样的优先级，主要是考虑到浏览器之间的兼容性（<code>IE</code>没有内置<code>Promise</code>）。另外，设置<code>Promise</code>最优先是因为<code>Promise.resolve().then</code>回调函数属于一个<strong>微任务</strong>，浏览器在一个<code>Tick</code>中执行完<code>macroTask</code>后会清空当前<code>Tick</code>所有的<code>microTask</code>再进行<code>UI</code>渲染，把<code>DOM</code>更新的操作放在<code>Tick</code>执行<code>microTask</code>的阶段来完成，相比使用<code>setTimeout</code>生成的一个<code>macroTask</code>会少一次<code>UI</code>的渲染。</p>
<p>而<code>nextTickHandler</code>函数，其实才是我们真正要执行的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function nextTickHandler () {
    pending = false
    /*执行所有callback*/
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextTickHandler</span> (<span class="hljs-params"></span>) </span>{
    pending = <span class="hljs-literal">false</span>
    <span class="hljs-comment">/*执行所有callback*/</span>
    <span class="hljs-keyword">const</span> copies = callbacks.slice(<span class="hljs-number">0</span>)
    callbacks.length = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; copies.length; i++) {
        copies[i]()
    }
}</code></pre>
<p>这里的<code>callbacks</code>变量供<code>nextTickHandler</code>消费。而前面我们所说的<code>nextTick</code>函数第二点功能中“等待适当的时机执行”，其实就是因为<code>timerFunc</code>的实现方式有差异，如果是<code>Promise\MutationObserver</code>则<code>nextTickHandler</code>回调是一个<code>microTask</code>，它会在当前<code>Tick</code>的末尾来执行。如果是<code>setTiemout</code>则<code>nextTickHandler</code>回调是一个<code>macroTask</code>，它会在下一个<code>Tick</code>来执行。</p>
<p>还有就是<code>callbacks</code>中的成员是如何被<code>push</code>进来的？从源码中我们可以知道，<code>nextTick</code>是一个自执行的函数，一旦执行是<code>return</code>了一个<code>queueNextTick</code>，所以我们在调用<code>nextTick</code>其实就是在调用<code>queueNextTick</code>这个函数。它的源代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function queueNextTick (cb?: Function, ctx?: Object) {
    let _resolve
    /*cb存到callbacks中*/
    callbacks.push(() => {
        if (cb) {
            try {
            cb.call(ctx)
            } catch (e) {
            handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })
    if (!pending) {
        pending = true
        timerFunc()
    }
    if (!cb &amp;&amp; typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
            _resolve = resolve
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueNextTick</span> (<span class="hljs-params">cb?: Function, ctx?: Object</span>) </span>{
    <span class="hljs-keyword">let</span> _resolve
    <span class="hljs-comment">/*cb存到callbacks中*/</span>
    callbacks.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (cb) {
            <span class="hljs-keyword">try</span> {
            cb.call(ctx)
            } <span class="hljs-keyword">catch</span> (e) {
            handleError(e, ctx, <span class="hljs-string">'nextTick'</span>)
            }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_resolve) {
            _resolve(ctx)
        }
    })
    <span class="hljs-keyword">if</span> (!pending) {
        pending = <span class="hljs-literal">true</span>
        timerFunc()
    }
    <span class="hljs-keyword">if</span> (!cb &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            _resolve = resolve
        })
    }
}</code></pre>
<p>可以看到，一旦调用<code>nextTick</code>函数时候，传入的<code>function</code>就会被存放到<code>callbacks</code>闭包中，然后这个<code>callbacks</code>由<code>nextTickHandler</code>消费，而<code>nextTickHandler</code>的执行时间又是由<code>timerFunc</code>来决定。</p>
<p>我们再回来看<code>Watcher</code>中的一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/
export function queueWatcher (watcher: Watcher) {
  /*获取watcher的id*/
  const id = watcher.id
  /*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
        /*如果没有flush掉，直接push到队列中即可*/
        queue.push(watcher)
    } else {
      ...
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-comment">/*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueWatcher</span> (<span class="hljs-params">watcher: Watcher</span>) </span>{
  <span class="hljs-comment">/*获取watcher的id*/</span>
  <span class="hljs-keyword">const</span> id = watcher.id
  <span class="hljs-comment">/*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/</span>
  <span class="hljs-keyword">if</span> (has[id] == <span class="hljs-literal">null</span>) {
    has[id] = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">if</span> (!flushing) {
        <span class="hljs-comment">/*如果没有flush掉，直接push到队列中即可*/</span>
        queue.push(watcher)
    } <span class="hljs-keyword">else</span> {
      ...
    }
    <span class="hljs-comment">// queue the flush</span>
    <span class="hljs-keyword">if</span> (!waiting) {
      waiting = <span class="hljs-literal">true</span>
      nextTick(flushSchedulerQueue)
    }
  }
}</code></pre>
<p>这里面的<code>nextTick(flushSchedulerQueue)</code>中的<code>flushSchedulerQueue</code>函数其实就是<code>watcher</code>的视图更新。调用的时候会把它<code>push</code>到<code>callbacks</code>中来异步执行。</p>
<p>另外，关于<code>waiting</code>变量，这是很重要的一个标志位，它保证<code>flushSchedulerQueue</code>回调只允许被置入<code>callbacks</code>一次。</p>
<p>也就是说，默认<code>waiting</code>变量为<code>false</code>，执行一次后<code>waiting</code>为<code>true</code>，后续的<code>this.xxx</code>不会再次触发<code>nextTick</code>的执行，而是把<code>this.xxx</code>相对应的<code>watcher</code>推入<code>flushSchedulerQueue</code>的<code>queue</code>队列中。</p>
<p><strong>所以，也就是说<code>DOM</code>确实是异步更新，但是具体是在下一个<code>Tick</code>更新还是在当前<code>Tick</code>执行<code>microTask</code>的时候更新，具体要看<code>nextTcik</code>的实现方式，也就是具体跑的是<code>Promise/MutationObserver</code>还是<code>setTimeout</code>。</strong></p>
<p>附：<a href="https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown#nexttick" rel="nofollow noreferrer" target="_blank"><code>nextTick</code>源码带注释</a>，有兴趣可以观摩一下。</p>
<p>这里面使用<code>Promise</code>和<code>setTimeout</code>来执行异步任务的方式都很好理解，比较巧妙的地方是利用<code>MutationObserver</code>执行异步任务。<code>MutationObserver</code>是<code>H5</code>的新特性，它能够监听指定范围内的<code>DOM</code>变化并执行其回调，它的回调会被当作<code>microTask</code>来执行，具体参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver" rel="nofollow noreferrer" target="_blank"><code>MDN</code></a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(String(counter))
observer.observe(textNode, {
    characterData: true
})
timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> counter = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> observer = <span class="hljs-keyword">new</span> MutationObserver(nextTickHandler)
<span class="hljs-keyword">var</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-built_in">String</span>(counter))
observer.observe(textNode, {
    <span class="hljs-attr">characterData</span>: <span class="hljs-literal">true</span>
})
timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    counter = (counter + <span class="hljs-number">1</span>) % <span class="hljs-number">2</span>
    textNode.data = <span class="hljs-built_in">String</span>(counter)
}</code></pre>
<p>可以看到，通过借用<code>MutationObserver</code>来创建一个<code>microTask</code>。<code>nextTickHandler</code>作为回调传入<code>MutationObserver</code>中。  <br>这里面创建了一个<code>textNode</code>作为观测的对象，当<code>timerFunc</code>执行的时候，<code>textNode.data</code>会发生改变，便会触发<code>MutatinObservers</code>的回调函数，而这个函数才是我们真正要执行的任务，它是一个<code>microTask</code>。</p>
<p>注：<code>2.5+</code>版本的<code>Vue</code>对<code>nextTick</code>进行了修改，具体参考下面“版本升级”一节。</p>
<h3 id="articleHeader3">关于Vue暴露的全局<code>nextTick</code>
</h3>
<p>继续来看下面的这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
    <div ref=&quot;test&quot;>"{{"test"}}"</div>
    <button @click=&quot;handleClick&quot;>tet</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"test"</span>&gt;</span>"{{"test"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>tet<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el: '#example',
    data: {
        test: 'begin',
    },
    methods: {
        handleClick() {
            this.test = 'end';
            console.log('1')
            setTimeout(() => { // macroTask
                console.log('3')
            }, 0);
            Promise.resolve().then(function() { //microTask
                console.log('promise!')
            })
            this.$nextTick(function () {
                console.log('2')
            })
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#example'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">test</span>: <span class="hljs-string">'begin'</span>,
    },
    <span class="hljs-attr">methods</span>: {
        handleClick() {
            <span class="hljs-keyword">this</span>.test = <span class="hljs-string">'end'</span>;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>)
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// macroTask</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>)
            }, <span class="hljs-number">0</span>);
            <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//microTask</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise!'</span>)
            })
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>)
            })
        }
    }
})</code></pre>
<p>在<code>Chrome</code>下，这段代码执行的顺序的<code>1、2、promise、3</code>。</p>
<p>可能有同学会以为这是<code>1、promise、2、3</code>，其实是忽略了一个标志位<code>pending</code>。</p>
<p>我们回到<code>nextTick</code>函数<code>return</code>的<code>queueNextTick</code>可以发现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function queueNextTick (cb?: Function, ctx?: Object) {
    let _resolve
    /*cb存到callbacks中*/
    callbacks.push(() => {
        if (cb) {
        try {
            cb.call(ctx)
        } catch (e) {
            handleError(e, ctx, 'nextTick')
        }
        } else if (_resolve) {
        _resolve(ctx)
        }
    })
    if (!pending) {
        pending = true
        timerFunc()
    }
    if (!cb &amp;&amp; typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
        _resolve = resolve
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueNextTick</span> (<span class="hljs-params">cb?: Function, ctx?: Object</span>) </span>{
    <span class="hljs-keyword">let</span> _resolve
    <span class="hljs-comment">/*cb存到callbacks中*/</span>
    callbacks.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (cb) {
        <span class="hljs-keyword">try</span> {
            cb.call(ctx)
        } <span class="hljs-keyword">catch</span> (e) {
            handleError(e, ctx, <span class="hljs-string">'nextTick'</span>)
        }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_resolve) {
        _resolve(ctx)
        }
    })
    <span class="hljs-keyword">if</span> (!pending) {
        pending = <span class="hljs-literal">true</span>
        timerFunc()
    }
    <span class="hljs-keyword">if</span> (!cb &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        _resolve = resolve
        })
    }
}</code></pre>
<p>这里面通过对<code>pending</code>的判断来检测是否已经有<code>timerFunc</code>这个函数在事件循环的任务队列等待被执行。如果存在的话，那么是不会再重复执行的。</p>
<p>最后异步执行<code>nextTickHandler</code>时又会把<code>pending</code>置为<code>false</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function nextTickHandler () {
    pending = false
    /*执行所有callback*/
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextTickHandler</span> (<span class="hljs-params"></span>) </span>{
    pending = <span class="hljs-literal">false</span>
    <span class="hljs-comment">/*执行所有callback*/</span>
    <span class="hljs-keyword">const</span> copies = callbacks.slice(<span class="hljs-number">0</span>)
    callbacks.length = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; copies.length; i++) {
        copies[i]()
    }
}</code></pre>
<p>所以回到我们的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleClick() {
    this.test = 'end';
    console.log('1')
    setTimeout(() => { // macroTask
        console.log('3')
    }, 0);
    Promise.resolve().then(function() { //microTask
        console.log('promise!')
    });
    this.$nextTick(function () {
        console.log('2')
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleClick() {
    <span class="hljs-keyword">this</span>.test = <span class="hljs-string">'end'</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>)
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// macroTask</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>)
    }, <span class="hljs-number">0</span>);
    <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//microTask</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise!'</span>)
    });
    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>)
    });
}</code></pre>
<p>代码中，<code>this.test = 'end'</code>必然会触发<code>watcher</code>进行视图的重新渲染，而我们在文章的<code>Watcher</code>一节中就已经有提到会调用<code>nextTick</code>函数，一开始<code>pending</code>变量肯定就是<code>false</code>，因此它会被修改为<code>true</code>并且执行<code>timerFunc</code>。之后执行<code>this.$nextTick</code>其实还是调用的<code>nextTick</code>函数，只不过此时的<code>pending</code>为<code>true</code>说明<code>timerFunc</code>已经被生成，所以<code>this.$nextTick(fn)</code>只是把传入的<code>fn</code>置入<code>callbacks</code>之中。此时的<code>callbacks</code>有两个<code>function</code>成员，一个是<code>flushSchedulerQueue</code>，另外一个就是<code>this.$nextTick()</code>的回调。</p>
<p>因此，上面这段代码中，在<code>Chrome</code>下，有一个<code>macroTask</code>和两个<code>microTask</code>。一个<code>macroTask</code>就是<code>setTimeout</code>，两个<code>microTask</code>：分别是<code>Vue</code>的<code>timerFunc</code>（其中先后执行<code>flushSchedulerQueue</code>和<code>function() {console.log('2')}</code>）、代码中的<code>Promise.resolve().then()</code>。</p>
<h3 id="articleHeader4">版本升级带来的变化</h3>
<p>上面讨论的<code>nextTick</code>实现是<code>2.4</code>版本以下的实现，<code>2.5</code>以上版本对于<code>nextTick</code>的内部实现进行了大量的修改。</p>
<h4>独立文件</h4>
<p>首先是从<code>Vue 2.5+</code>开始，抽出来了一个单独的文件<a href="https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js" rel="nofollow noreferrer" target="_blank"><code>next-tick.js</code></a>来执行它。</p>
<h4>microTask与macroTask</h4>
<p>在代码中，有这么一段注释：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013314898?w=857&amp;h=248" src="https://static.alili.tech/img/remote/1460000013314898?w=857&amp;h=248" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其大概的意思就是：在<code>Vue 2.4</code>之前的版本中，<code>nextTick</code>几乎都是基于<code>microTask</code>实现的（具体可以看文章<code>nextTick</code>一节），但是由于<code>microTask</code>的执行优先级非常高，在某些场景之下它甚至要比事件冒泡还要快，就会导致一些诡异的问题；但是如果全部都改成<code>macroTask</code>，对一些有重绘和动画的场景也会有性能的影响。<strong>所以最终<code>nextTick</code>采取的策略是默认走<code>microTask</code>，对于一些<code>DOM</code>的交互事件，如<code>v-on</code>绑定的事件回调处理函数的处理，会强制走<code>macroTask</code>。</strong></p>
<p>具体做法就是，在<code>Vue</code>执行绑定的<code>DOM</code>事件时，默认会给回调的<code>handler</code>函数调用<code>withMacroTask</code>方法做一层包装，它保证整个回调函数的执行过程中，遇到数据状态的改变，这些改变而导致的视图更新（<code>DOM</code>更新）的任务都会被推到<code>macroTask</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add$1 (event, handler, once$$1, capture, passive) {
    handler = withMacroTask(handler);
    if (once$$1) { handler = createOnceHandler(handler, event, capture); }
    target$1.addEventListener(
        event,
        handler,
        supportsPassive
        ? { capture: capture, passive: passive }
        : capture
    );
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
    return fn._withTask || (fn._withTask = function () {
        useMacroTask = true;
        var res = fn.apply(null, arguments);
        useMacroTask = false;
        return res
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add$1</span> (<span class="hljs-params">event, handler, once$$<span class="hljs-number">1</span>, capture, passive</span>) </span>{
    handler = withMacroTask(handler);
    <span class="hljs-keyword">if</span> (once$$<span class="hljs-number">1</span>) { handler = createOnceHandler(handler, event, capture); }
    target$<span class="hljs-number">1.</span>addEventListener(
        event,
        handler,
        supportsPassive
        ? { <span class="hljs-attr">capture</span>: capture, <span class="hljs-attr">passive</span>: passive }
        : capture
    );
}

<span class="hljs-comment">/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withMacroTask</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> fn._withTask || (fn._withTask = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        useMacroTask = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">var</span> res = fn.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
        useMacroTask = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">return</span> res
    })
}</code></pre>
<p>而对于<code>macroTask</code>的执行，<code>Vue</code>优先检测是否支持原生<code>setImmediate</code>（高版本IE和Edge支持），不支持的话再去检测是否支持原生<code>MessageChannel</code>，如果还不支持的话为<code>setTimeout(fn, 0)</code>。</p>
<p>最后，写一段demo来测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
    <span>"{{"test"}}"</span>
    <button @click=&quot;handleClick&quot;>change</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"test"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>change<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el: '#example',
    data: {
        test: 'begin',
    },
    methods: {
        handleClick: function() {
            this.test = end;
            console.log('script')
            this.$nextTick(function () { 
                console.log('nextTick')
            })
            Promise.resolve().then(function () {
                console.log('promise')
            })
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#example'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">test</span>: <span class="hljs-string">'begin'</span>,
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">handleClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.test = end;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script'</span>)
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick'</span>)
            })
            <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise'</span>)
            })
        }
    }
})</code></pre>
<p>在<code>Vue 2.5+</code>中，这段代码的输出顺序是<code>script</code>、<code>promise</code>、<code>nextTick</code>，而<code>Vue 2.4</code>输出<code>script</code>、<code>nextTick</code>、<code>promise</code>。<code>nextTick</code>执行顺序的差异正好说明了上面的改变。</p>
<h4>MessageChannel</h4>
<p>在<code>Vue 2.4</code>版本以前使用的<code>MutationObserver</code>来模拟异步任务。而<code>Vue 2.5</code>版本以后，由于兼容性弃用了<code>MutationObserver</code>。</p>
<p><code>Vue 2.5+</code>版本使用了<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel" rel="nofollow noreferrer" target="_blank"><code>MessageChannel</code></a>来模拟<code>macroTask</code>。除了<code>IE</code>以外，<code>messageChannel</code>的兼容性还是比较可观的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const channel = new MessageChannel()
const port = channel.port2
channel.port1.onmessage = flushCallbacks
macroTimerFunc = () => {
port.postMessage(1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> channel = <span class="hljs-keyword">new</span> MessageChannel()
<span class="hljs-keyword">const</span> port = channel.port2
channel.port1.onmessage = flushCallbacks
macroTimerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
port.postMessage(<span class="hljs-number">1</span>)
}</code></pre>
<p>可见，新建一个<code>MessageChannel</code>对象，该对象通过<code>port1</code>来检测信息，<code>port2</code>发送信息。通过<code>port2</code>的主动<code>postMessage</code>来触发<code>port1</code>的<code>onmessage</code>事件，进而把回调函数<code>flushCallbacks</code>作为<code>macroTask</code>参与事件循环。</p>
<h4>MessageChannel VS setTimeout</h4>
<p>为什么要优先<code>MessageChannel</code>创建<code>macroTask</code>而不是<code>setTimeout</code>？</p>
<p><code>HTML5</code>中规定<code>setTimeout</code>的最小时间延迟是<code>4ms</code>，也就是说理想环境下异步回调最快也是<code>4ms</code>才能触发。</p>
<p><code>Vue</code>使用这么多函数来模拟异步任务，其目的只有一个，就是<strong>让回调异步且尽早调用</strong>。而<code>MessageChannel</code>的延迟明显是小于<code>setTimeout</code>的。<a href="https://stackoverflow.com/questions/18826570/settimeout0-vs-window-postmessage-vs-messageport-postmessage" rel="nofollow noreferrer" target="_blank">对比传送门</a></p>
<h3 id="articleHeader5">为什么要异步更新视图</h3>
<p>看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <div>"{{"test"}}"</div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"test"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data () {
        return {
            test: 0
        };
    },
    mounted () {
      for(let i = 0; i < 1000; i++) {
        this.test++;
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">test</span>: <span class="hljs-number">0</span>
        };
    },
    mounted () {
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
        <span class="hljs-keyword">this</span>.test++;
      }
    }
}</code></pre>
<p>现在有这样的一种情况，<code>mounted</code>的时候<code>test</code>的值会被<code>++</code>循环执行<code>1000</code>次。 每次<code>++</code>时，都会根据响应式触发<code>setter-&gt;Dep-&gt;Watcher-&gt;update-&gt;run</code>。 如果这时候没有异步更新视图，那么每次<code>++</code>都会直接操作<code>DOM</code>更新视图，这是非常消耗性能的。 所以<code>Vue</code>实现了一个<code>queue</code>队列，在下一个<code>Tick</code>（或者是当前<code>Tick</code>的微任务阶段）的时候会统一执行<code>queue</code>中<code>Watcher</code>的<code>run</code>。同时，拥有相同<code>id</code>的<code>Watcher</code>不会被重复加入到该<code>queue</code>中去，所以不会执行<code>1000</code>次<code>Watcher</code>的<code>run</code>。最终更新视图只会直接将<code>test</code>对应的<code>DOM</code>的<code>0</code>变成<code>1000</code>。 保证更新视图操作<code>DOM</code>的动作是在当前栈执行完以后下一个<code>Tick</code>（或者是当前<code>Tick</code>的微任务阶段）的时候调用，大大优化了性能。</p>
<h3 id="articleHeader6">应用场景</h3>
<p>在操作<code>DOM</code>节点无效的时候，就要考虑操作的实际<code>DOM</code>节点是否存在，或者相应的<code>DOM</code>是否被更新完毕。</p>
<p>比如说，在<code>created</code>钩子中涉及<code>DOM</code>节点的操作肯定是无效的，因为此时还没有完成相关<code>DOM</code>的挂载。解决的方法就是在<code>nextTick</code>函数中去处理<code>DOM</code>，这样才能保证<code>DOM</code>被成功挂载而有效操作。</p>
<p>还有就是在数据变化之后要执行某个操作，而这个操作需要使用随数据改变而改变的<code>DOM</code>时，这个操作应该放进<code>Vue.nextTick</code>。</p>
<p>之前在做慕课网音乐<code>webApp</code>的时候关于播放器内核的开发就涉及到了这个问题。下面我把问题简化：</p>
<p>现在我们要实现一个需求是点击按钮变换<code>audio</code>标签的<code>src</code>属性来实现切换歌曲。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
    <audio ref=&quot;audio&quot;
           :src=&quot;url&quot;></audio>
    <span ref=&quot;url&quot;></span>
    <button @click=&quot;changeUrl&quot;>click me</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"audio"</span>
           <span class="hljs-attr">:src</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeUrl"</span>&gt;</span>click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const musicList = [
    'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112003137.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
    'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112002493.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
    'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112004168.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3'
];
var vm = new Vue({
    el: '#example',
    data: {
        index: 0,
        url: ''
    },
    methods: {
        changeUrl() {
            this.index = (this.index + 1) % musicList.length
            this.url = musicList[this.index];
            this.$refs.audio.play();
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> musicList = [
    <span class="hljs-string">'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112003137.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3'</span>,
    <span class="hljs-string">'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112002493.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3'</span>,
    <span class="hljs-string">'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112004168.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3'</span>
];
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#example'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">''</span>
    },
    <span class="hljs-attr">methods</span>: {
        changeUrl() {
            <span class="hljs-keyword">this</span>.index = (<span class="hljs-keyword">this</span>.index + <span class="hljs-number">1</span>) % musicList.length
            <span class="hljs-keyword">this</span>.url = musicList[<span class="hljs-keyword">this</span>.index];
            <span class="hljs-keyword">this</span>.$refs.audio.play();
        }
    }
});</code></pre>
<p>毫无悬念，这样肯定是会报错的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught (in promise) DOMException: The element has no supported sources." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Uncaught (<span class="hljs-keyword">in</span> promise) DOMException: The element has no supported sources.</code></pre>
<p>原因就在于<code>audio.play()</code>是同步的，而这个时候<code>DOM</code>更新是异步的，<code>src</code>属性还没有被更新，结果播放的时候<code>src</code>属性为空，就报错了。</p>
<p>解决办法就是在<code>play</code>的操作加上<code>this.$nextTick()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$nextTick(function() {
    this.$refs.audio.play();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$refs.audio.play();
});</code></pre>
<hr>
<p>参考链接</p>
<p><a href="https://github.com/youngwind/blog/issues/88" rel="nofollow noreferrer" target="_blank">https://github.com/youngwind/...</a></p>
<p><a href="https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown" rel="nofollow noreferrer" target="_blank">https://github.com/answershut...</a></p>
<p><a href="https://juejin.im/post/5a1af88f5188254a701ec230" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5a1af8...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Vue源码】Vue中DOM的异步更新策略以及nextTick机制

## 原文链接
[https://segmentfault.com/a/1190000013314893](https://segmentfault.com/a/1190000013314893)


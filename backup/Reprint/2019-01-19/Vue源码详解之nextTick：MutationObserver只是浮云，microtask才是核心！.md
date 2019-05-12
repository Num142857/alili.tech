---
title: 'Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！' 
date: 2019-01-19 2:30:10
hidden: true
slug: fllf57lykhr
categories: [reprint]
---

{{< raw >}}

                    
<p>原发于<a href="http://chuckliu.me/#!/posts/58bd08a2b5187d2fb51c04f9" rel="nofollow noreferrer" target="_blank">我的博客</a>。</p>
<p><a href="http://chuckliu.me/#!/posts/58aefe61820ad92fbbe9a4e0" rel="nofollow noreferrer" target="_blank">前一篇文章</a>已经详细记述了Vue的核心执行过程。相当于已经搞定了主线剧情。后续的文章都会对其中没有介绍的细节进行展开。</p>
<p>现在我们就来讲讲其他支线任务:nextTick和microtask。</p>
<p>Vue的nextTick api的实现部分是Vue里比较好理解的一部分，与其他部分的代码也非常的解耦，因此这一块的相关源码解析文章很多。我本来也不准备单独写博客细说这部分，但是最近偶然在别人的文章中了解到：<br>每轮次的event loop中，每次执行一个task，并执行完microtask队列中的所有microtask之后，就会进行UI的渲染。但是作者似乎对于这个结论也不是很肯定。而我第一反应就是Vue的$nextTick既然用到了MutationObserver（MO的回调放进的是microtask的任务队列中的），那么是不是也是出于这个考虑呢？于是我想研究了一遍Vue的$nextTick，就可以了解是不是出于这个目的，也同时看能不能佐证UI Render真的是在microtask队列清空后执行的。</p>
<p>研究之后的结论：我之前对于$nextTick源码的理解完全是错的，以及每轮事件循环执行完所有的microtask，是会执行UI Render的。</p>
<p><em>task/macrotask和microtask的概念自从去年<a href="https://www.zhihu.com/question/36972010" rel="nofollow noreferrer" target="_blank">知乎上有人提出这个问题</a>之后，task和microtask已经被很多同学了解了，我也是当时看到了microtask的内容，现在已经有非常多的中文介绍博客在介绍这部分的知识，最近<a href="https://zhuanlan.zhihu.com/p/25407758" rel="nofollow noreferrer" target="_blank">这篇火遍掘金、SF和知乎的文章</a>，最后也是考了microtask的概念。如果你没有看过task/microtask的内容的话，我还是推荐这篇<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">英文博客</a>，是绝大多数国内博客的内容来源。</em></p>
<h2 id="articleHeader0">先说nextTick的具体实现</h2>
<p>先用120秒介绍MutationObserver: MO是HTML5中的新API，是个用来监视DOM变动的接口。他能监听一个DOM对象上发生的子节点删除、属性修改、文本内容修改等等。<br>调用过程很简单，但是有点不太寻常：你需要先给他绑回调：<br><code>var mo = new MutationObserver(callback)</code><br>通过给MO的构造函数传入一个回调，能得到一个MO实例，这个回调就会在MO实例监听到变动时触发。</p>
<p>这个时候你只是给MO实例绑定好了回调，他具体监听哪个DOM、监听节点删除还是监听属性修改，你都还没有设置。而调用他的observer方法就可以完成这一步:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var domTarget = 你想要监听的dom节点
mo.observe(domTarget, {
      characterData: true //说明监听文本内容的修改。
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> domTarget = 你想要监听的dom节点
mo.observe(domTarget, {
      <span class="hljs-attr">characterData</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">//说明监听文本内容的修改。</span>
})</code></pre>
<p>一个需要先说的细节是，MutationObserver的回调是放在microtask中执行的。</p>
<p>ok了，现在这个domTarget上发生的文本内容修改就会被mo监听到，mo就会触发你在<code>new MutationObserver(callback)</code>中传入的callback。</p>
<p>现在我们来看Vue.nextTick的源码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const nextTick = (function () {
  var callbacks = []
  var pending = false
  var timerFunc
  function nextTickHandler () {
    pending = false
    // 之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容
    // 比如$nextTick的回调函数里又有$nextTick
    // 这些是应该放入到下一个轮次的nextTick去执行的,
    // 所以拷贝一份当前的,遍历执行完当前的即可,避免无休止的执行下去
    var copies = callbacks.slice(0)
    callbacks = []
    for (var i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  /* istanbul ignore if */
  // ios9.3以上的WebView的MutationObserver有bug，
  //所以在hasMutationObserverBug中存放了是否是这种情况
  if (typeof MutationObserver !== 'undefined' &amp;&amp; !hasMutationObserverBug) {
    var counter = 1
    // 创建一个MutationObserver,observer监听到dom改动之后后执行回调nextTickHandler
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(counter)
    // 调用MutationObserver的接口,观测文本节点的字符内容
    observer.observe(textNode, {
      characterData: true
    })
    // 每次执行timerFunc都会让文本节点的内容在0/1之间切换,
    // 不用true/false可能是有的浏览器对于文本节点设置内容为true/false有bug？
    // 切换之后将新值赋值到那个我们MutationObserver观测的文本节点上去
    timerFunc = function () {
      counter = (counter + 1) % 2
      textNode.data = counter
    }
  } else {
    // webpack attempts to inject a shim for setImmediate
    // if it is used as a global, so we have to work around that to
    // avoid bundling unnecessary code.
    // webpack默认会在代码中插入setImmediate的垫片
    // 没有MutationObserver就优先用setImmediate，不行再用setTimeout
    const context = inBrowser
      ? window
      : typeof global !== 'undefined' ? global : {}
    timerFunc = context.setImmediate || setTimeout
  }
  return function (cb, ctx) {
    var func = ctx
      ? function () { cb.call(ctx) }
      : cb
    callbacks.push(func)
    // 如果pending为true, 就其实表明本轮事件循环中已经执行过timerFunc(nextTickHandler, 0)
    if (pending) return
    pending = true
    timerFunc(nextTickHandler, 0)
  }
})()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> nextTick = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> callbacks = []
  <span class="hljs-keyword">var</span> pending = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">var</span> timerFunc
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextTickHandler</span> (<span class="hljs-params"></span>) </span>{
    pending = <span class="hljs-literal">false</span>
    <span class="hljs-comment">// 之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容</span>
    <span class="hljs-comment">// 比如$nextTick的回调函数里又有$nextTick</span>
    <span class="hljs-comment">// 这些是应该放入到下一个轮次的nextTick去执行的,</span>
    <span class="hljs-comment">// 所以拷贝一份当前的,遍历执行完当前的即可,避免无休止的执行下去</span>
    <span class="hljs-keyword">var</span> copies = callbacks.slice(<span class="hljs-number">0</span>)
    callbacks = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; copies.length; i++) {
      copies[i]()
    }
  }

  <span class="hljs-comment">/* istanbul ignore if */</span>
  <span class="hljs-comment">// ios9.3以上的WebView的MutationObserver有bug，</span>
  <span class="hljs-comment">//所以在hasMutationObserverBug中存放了是否是这种情况</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> MutationObserver !== <span class="hljs-string">'undefined'</span> &amp;&amp; !hasMutationObserverBug) {
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">1</span>
    <span class="hljs-comment">// 创建一个MutationObserver,observer监听到dom改动之后后执行回调nextTickHandler</span>
    <span class="hljs-keyword">var</span> observer = <span class="hljs-keyword">new</span> MutationObserver(nextTickHandler)
    <span class="hljs-keyword">var</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(counter)
    <span class="hljs-comment">// 调用MutationObserver的接口,观测文本节点的字符内容</span>
    observer.observe(textNode, {
      <span class="hljs-attr">characterData</span>: <span class="hljs-literal">true</span>
    })
    <span class="hljs-comment">// 每次执行timerFunc都会让文本节点的内容在0/1之间切换,</span>
    <span class="hljs-comment">// 不用true/false可能是有的浏览器对于文本节点设置内容为true/false有bug？</span>
    <span class="hljs-comment">// 切换之后将新值赋值到那个我们MutationObserver观测的文本节点上去</span>
    timerFunc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      counter = (counter + <span class="hljs-number">1</span>) % <span class="hljs-number">2</span>
      textNode.data = counter
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// webpack attempts to inject a shim for setImmediate</span>
    <span class="hljs-comment">// if it is used as a global, so we have to work around that to</span>
    <span class="hljs-comment">// avoid bundling unnecessary code.</span>
    <span class="hljs-comment">// webpack默认会在代码中插入setImmediate的垫片</span>
    <span class="hljs-comment">// 没有MutationObserver就优先用setImmediate，不行再用setTimeout</span>
    <span class="hljs-keyword">const</span> context = inBrowser
      ? <span class="hljs-built_in">window</span>
      : <span class="hljs-keyword">typeof</span> global !== <span class="hljs-string">'undefined'</span> ? global : {}
    timerFunc = context.setImmediate || setTimeout
  }
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb, ctx</span>) </span>{
    <span class="hljs-keyword">var</span> func = ctx
      ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ cb.call(ctx) }
      : cb
    callbacks.push(func)
    <span class="hljs-comment">// 如果pending为true, 就其实表明本轮事件循环中已经执行过timerFunc(nextTickHandler, 0)</span>
    <span class="hljs-keyword">if</span> (pending) <span class="hljs-keyword">return</span>
    pending = <span class="hljs-literal">true</span>
    timerFunc(nextTickHandler, <span class="hljs-number">0</span>)
  }
})()
</code></pre>
<p>上面这个函数执行过程后生成的那个函数才是nextTick。而这个函数的执行过程就是先初始化pending变量和cb变量，cb用来存放需要执行的回调，pending表示是否把清空回调的nextTickHandler函数加入到异步队列中。</p>
<p>然后就是创建了一个MO，这个MO监听了一个新创建的文本节点的文本内容变化，同时监听到变化时的回调就是nextTickHandler。nextTickHandler遍历cb数组，把需要执行的cb给拿出来一个个执行了。</p>
<p>而最后返回出去作为nextTick的那个函数就比较简单了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (cb, ctx) {
    var func = ctx
      ? function () { cb.call(ctx) }
      : cb
    callbacks.push(func)
    // 如果pending为true, 就其实表明本轮事件循环中已经执行过timerFunc(nextTickHandler, 0)
    if (pending) return
    pending = true
    timerFunc(nextTickHandler, 0)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb, ctx</span>) </span>{
    <span class="hljs-keyword">var</span> func = ctx
      ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ cb.call(ctx) }
      : cb
    callbacks.push(func)
    <span class="hljs-comment">// 如果pending为true, 就其实表明本轮事件循环中已经执行过timerFunc(nextTickHandler, 0)</span>
    <span class="hljs-keyword">if</span> (pending) <span class="hljs-keyword">return</span>
    pending = <span class="hljs-literal">true</span>
    timerFunc(nextTickHandler, <span class="hljs-number">0</span>)
  }
}</code></pre>
<p>也就是把传入的回调放入cb数组当中，然后执行<code>timerFunc(nextTickHandler, 0)</code>，其实是执行<code>timerFunc()</code>，后面传入的两参数没用，在浏览器不支持MO的情况timerFunc才回退到setTimeout，那俩参数才有效果。timerFunc就是把那个被MO监听的文本节点改一下它的内容，这样我改了文本内容，MO就会在当前的所有同步代码完成之后执行回调，从而执行数据更新到DOM上之后的任务。</p>
<p>我一开始在看这一段代码时忘记了MutationObserver的回调是在microtask里执行的。而且当时也还没有看过Vue的其他源码，当时的我大体看懂nextTick代码流程之后，形成了如下的理解，而且觉得似乎完美的解释了代码逻辑:<br>watcher监听到数据变化之后，会立马去修改dom，接着用户书写的代码里的nextTick被执行，而nextTick内部也是去修改DOM(textNode)，当这个最后修改的textNode修改完成了，触发了MutationObserver的回调，那就意味着，前面的DOM修改也已经完成了，所以nextTick向用户保证的<code>DOM更新之后再执行用户的回调</code>就得以实现了。</p>
<p>Damn，现在看了Batcher的代码和认真反思了以后，立马醒悟，上面的想法完完全全就是一坨狗屎，totally shit！</p>
<p>首先，一个普遍的常识是DOM Tree的修改是实时的，而修改的Render到DOM上才是异步的。根本不存在什么所谓的等待DOM修改完成，任何时候我在上一行代码里往DOM中添加了一个元素、修改了一个DOM的textContent，你在下一行代码里一定能立马就读取到新的DOM，我知道这个理。但是我还是搞不懂我怎么会产生用<code>nextTick来保证DOM修改的完成这样的怪念头</code>。可能那天屎吃得有点多了。</p>
<p>其次，我们来看看使用nextTick的真正原因：</p>
<p>Vue在两个地方用到了上述nextTick：</p>
<ul>
<li><p>Vue.nextTick和Vue.prototype.$nextTick都是直接使用了这个nextTick</p></li>
<li><p>在batcher中，也就是watcher观测到数据变化后执行的是<code>nextTick(flushBatcherQueue)</code>，<code>flushBatcherQueue</code>则负责执行完成所有的dom更新操作。</p></li>
</ul>
<p>Batcher的源码，我在<a href="http://chuckliu.me/#!/posts/58aefe61820ad92fbbe9a4e0" rel="nofollow noreferrer" target="_blank">上一篇文章</a>当中已经详细的分析了，在这里我用一张图来说明它和nextTick的详细处理过程吧。<br>假设此时Vue实例的模板为:<code>&lt;div id="a"&gt;"{{"a"}}"&lt;/div&gt;</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008589739?w=1646&amp;h=1150" src="https://static.alili.tech/img/remote/1460000008589739?w=1646&amp;h=1150" alt="" title="" style="cursor: pointer;"></span></p>
<p>仔细跟踪了代码执行过程我们会发现，真正的去遍历watcher，批处理更新是在microtask中执行的，而且用户在修改数据后自己执行的<code>nextTick(cb)</code>也会在此时执行cb，他们都是在同一个microtask中执行。根本就不是我最开始想的那样，把回调放在以后的事件循环中去执行。</p>
<p>同时，上面这个过程也深切的揭露出Vue nextTick的本质，我不是想要MO来帮我真正监听DOM更改，我只是想要一个异步API，用来在当前的同步代码执行完毕后，执行我想执行的异步回调。</p>
<p>之所以要这样，是因为用户的代码当中是可能多次修改数据的，而每次修改都会同步通知到所有订阅该数据的watcher，而立马执行将数据写到DOM上是肯定不行的，那就只是把watcher加入数组。等到当前task执行完毕，所有的同步代码已经完成，那么这一轮次的数据修改就已经结束了，这个时候我可以安安心心的去将对监听到依赖变动的watcher完成数据真正写入到DOM上的操作，这样即使你在之前的task里改了一个watcher的依赖100次，我最终只会计算一次value、改DOM一次。一方面省去了不必要的DOM修改，另一方面将DOM操作聚集，可以提升DOM Render效率。</p>
<p>那为什么一定要用MutationObserver呢？不，并没有一定要用MO，只要是microtask都可以。在最新版的Vue源码里，优先使用的就是<code>Promise.resolve().then(nextTickHandler)</code>来将异步回调放入到microtask中（MO在IOS9.3以上的WebView中有bug），没有原生Promise才用MO。</p>
<p>这充分说明了microtask才是nextTick的本质，MO什么的只是个备胎，要是有比MO优先级更高、浏览器兼容性更好的microtask，那可能就分分钟把MO拿下了。</p>
<p>那问题又来了，为什么一定要microtask？task可以吗？（macrotask和task是一回事哈，<a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model" rel="nofollow noreferrer" target="_blank">HTML5标准里</a>甚至都没有macrotask这个词）。</p>
<p>哈，现在刚好有个例子，Vue一开始曾经改过nextTick的实现。我们来看看这两个jsFiddle：<a href="https://jsfiddle.net/k6bgu2z6/4/" rel="nofollow noreferrer" target="_blank">jsfiddle1</a><button class="btn btn-xs btn-default ml10 preview" data-url="k6bgu2z6/4/" data-typeid="0">点击预览</button>和<a href="https://jsfiddle.net/v9q9L0hw/2/" rel="nofollow noreferrer" target="_blank">jsfiddle2</a><button class="btn btn-xs btn-default ml10 preview" data-url="v9q9L0hw/2/" data-typeid="0">点击预览</button>。</p>
<p>两个fiddle的实现一模一样，就是让那个绝对定位的黄色元素起到一个fixed定位的效果：绑定scroll事件，每次滚动的时候，计算当前滚动的位置并更改到那个绝对定位元素的top属性上去。大家自己试试滚动几下，对比下效果，你就会发现第一个fiddle中的黄元素是稳定不动的，fixed很好。而后一个fiddle中就有问题了，黄色元素上下晃动，似乎跟不上我们scroll的节奏，总要慢一点，虽然最后停下滚动时位置是对的。</p>
<p>上述两个例子其实是在这个<a href="https://github.com/vuejs/vue/issues/3771#issuecomment-249692588" rel="nofollow noreferrer" target="_blank">issue</a>中找到的，第一个jsfiddle使用的版本是Vue 2.0.0-rc.6，这个版本的nextTick实现是采用了MO，而后因为IOS9.3的WebView里的MO有bug，于是尤雨溪更改了实现，换成了<code>window.postMessage</code>，也就是后一个fiddle所使用的Vue 2.0.0-rc.7。后来尤雨溪了解到<code>window.postMessage</code>是将回调放入的macrotask 队列。这就是问题的根源了。</p>
<p>HTML中的UI事件、网络事件、HTML Parsing等都是使用的task来完成，因此每次scroll事件触发后，在当前的task里只是完成了把watcher加入队列和把清空watcher的flushBatcherQueue作为异步回调传入nextTick。 </p>
<p>如果nextTick使用的是microtask，那么在task执行完毕之后就会立即执行所有microtask，那么flushBatcherQueue（真正修改DOM）便得以在此时立即完成，而后，当前轮次的microtask全部清理完成时，执行UI rendering，把重排重绘等操作真正更新到DOM上（后文会细说）。（注意，页面的滚动效果并不需要重绘哈。重绘是当你修改了UI样式、DOM结构等等，页面将样式呈现出来，别晕了。）<br>如果nextTick使用的是task，那么会在当前的task和所有microtask执行完毕之后才在以后的某一次task执行过程中处理flushBatcherQueue，那个时候才真正执行各个指令的修改DOM操作，但那时为时已晚，错过了多次触发重绘、渲染UI的时机。而且浏览器内部为了更快的响应用户UI，内部可能是有多个task queue的：</p>
<blockquote><p>For example, a user agent could have one task queue for mouse and key events (the user interaction task source), and another for everything else. The user agent could then give keyboard and mouse events preference over other tasks three quarters of the time, keeping the interface responsive but not starving other task queues, and never processing events from any one task source out of order.</p></blockquote>
<p>而UI的task queue的优先级可能更高，因此对于尤雨溪采用的<code>window.postMessage</code>，甚至可能已经多次执行了UI的task，都没有执行<code>window.postMessage</code>的task，也就导致了我们更新DOM操作的延迟。在重CPU计算、UI渲染任务情况下，这一延迟达到issue观测到的100毫秒到1秒的级别是完全课可能的。因此，使用task来实现nextTick是不可行的，而尤雨溪也撤回了这一次的修改，后续的nextTick实现中，依然是使用的Promise.then和MO。</p>
<h2 id="articleHeader1">task microtask和每轮event loop之后的UI Render</h2>
<p>我最近认真阅读了一下HTML5规范，还是来说一说task和microtask处理完成之后的UI渲染过程，讲一下每次task执行和所有microtask执行完毕后使如何完成UI Render的。</p>
<p>先上<a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">HTML标准原文</a>：<br>比较典型的task有如下这些</p>
<blockquote><ul>
<li><p>Events<br>Dispatching an Event object at a particular EventTarget object is often done by a dedicated task. <em>Not all events are dispatched using the task queue, many are dispatched during other tasks.</em></p></li>
<li><p>Parsing<br> The HTML parser tokenizing one or more bytes, and then processing any resulting tokens, is typically a task.</p></li>
<li><p>Callbacks<br> Calling a callback is often done by a dedicated task.</p></li>
<li><p>Using a resource<br> When an algorithm fetches a resource, if the fetching occurs in a non-blocking fashion then the processing of the resource once some or all of the resource is available is performed by a task.</p></li>
<li><p>Reacting to DOM manipulation<br> Some elements have tasks that trigger in response to DOM manipulation, e.g. when that element is inserted into the document.</p></li>
</ul></blockquote>
<p>此外，还包括setTimeout, setInterval, setImmediate, window.postMessage等等。<br><em>上述Reacting to DOM manipulation并不是说你执行DOM操作时就会把这个DOM操作的执行当成一个task。是那些异步的reacting会被当做task。</em></p>
<p><a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model" rel="nofollow noreferrer" target="_blank">HTML5标准：task、microtask和UI render的具体执行过程如下</a>：</p>
<blockquote>
<p>An event loop must continually run through the following steps for as long as it exists:</p>
<p>1.Select the oldest task on one of the event loop's task queues, if any, ignoring, in the case of a browsing context event loop, tasks whose associated Documents are not fully active. The user agent may pick any task queue. If there is no task to select, then jump to the microtasks step below.</p>
<p>2.Set the event loop's currently running task to the task selected in the previous step.</p>
<p>3.Run: Run the selected task.</p>
<p>4.Set the event loop's currently running task back to null.</p>
<p>5.Remove the task that was run in the run step above from its task queue.</p>
<p>6.Microtasks: <a href="https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint" rel="nofollow noreferrer" target="_blank">Perform a microtask checkpoint.</a> //这里会执行所有的microtask</p>
<p>7.Update the rendering: If this event loop is a browsing context event loop (as opposed to a worker event loop), then run the following substeps.</p>
</blockquote>
<blockquote><p>7.1 Let now be the value that would be returned by the Performance object's now() method.   <br>7.2 Let docs be the list of Document objects associated with the event loop in question, sorted arbitrarily except that the following conditions must be met:<br> 7.3 If there are top-level browsing contexts B that the user agent believes would not benefit from having their rendering updated at this time, then remove from docs all Document objects whose browsing context's top-level browsing context is in B.<br>7.4 If there are a nested browsing contexts B that the user agent believes would not benefit from having their rendering updated at this time, then remove from docs all Document objects whose browsing context is in B.<br>7.5 For each fully active Document in docs, run the resize steps for that Document, passing in now as the timestamp. [CSSOMVIEW]<br>7.6 For each fully active Document in docs, run the scroll steps for that Document, passing in now as the timestamp. [CSSOMVIEW]<br>7.7 For each fully active Document in docs, evaluate media queries and report changes for that Document, passing in now as the timestamp. [CSSOMVIEW]<br>7.8 For each fully active Document in docs, run CSS animations and send events for that Document, passing in now as the timestamp. [CSSANIMATIONS]<br>7.9 For each fully active Document in docs, run the fullscreen rendering steps for that Document, passing in now as the timestamp. [FULLSCREEN]<br>7.10 For each fully active Document in docs, run the animation frame callbacks for that Document, passing in now as the timestamp.<br>7.11 For each fully active Document in docs, run the update intersection observations steps for that Document, passing in now as the timestamp. [INTERSECTIONOBSERVER]<br>7.12 For each fully active Document in docs, update the rendering or user interface of that Document and its browsing context to reflect the current state.</p></blockquote>
<blockquote><p>8.If this is a worker event loop (i.e. one running for a WorkerGlobalScope), but there are no tasks in the event loop's task queues and the WorkerGlobalScope object's closing flag is true, then destroy the event loop, aborting these steps, resuming the run a worker steps described in the Web workers section below.<br>9.Return to the first step of the event loop.</p></blockquote>
<p>解释一下：第一步，从多个task queue中的一个queue里，挑出一个最老的task。（因为有多个task queue的存在，使得浏览器可以完成我们前面说的，优先、高频率的执行某些task queue中的任务，比如UI的task queue）。<br>然后2到5步，执行这个task。<br>第六步， <a href="https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint" rel="nofollow noreferrer" target="_blank">Perform a microtask checkpoint.</a> ，这里会执行完microtask queue中的所有的microtask，如果microtask执行过程中又添加了microtask，那么仍然会执行新添加的microtask，当然，这个机制好像有限制，一轮microtask的执行总量似乎有限制(1000?)，数量太多就执行一部分留下的以后再执行？这里我不太确定。</p>
<p>第七步，Update the rendering：<br>7.2到7.4，当前轮次的event loop中关联到的document对象会保持某些特定顺序，这些document对象都会执行需要执行UI render的，但是并不是所有关联到的document都需要更新UI，浏览器会判断这个document是否会从UI Render中获益，因为浏览器只需要保持60Hz的刷新率即可，而每轮event loop都是非常快的，所以没必要每个document都Render UI。<br>7.5和7.6 run the resize steps/run the scroll steps不是说去执行resize和scroll。每次我们scoll的时候视口或者dom就已经立即scroll了，并把document或者dom加入到 pending scroll event targets中，而run the scroll steps具体做的则是遍历这些target，在target上触发scroll事件。run the resize steps也是相似的，这个步骤是触发resize事件。<br>7.8和7.9 后续的media query, run CSS animations and send events等等也是相似的，都是触发事件，第10步和第11步则是执行我们熟悉的requestAnimationFrame回调和<a href="http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">IntersectionObserver</a>回调（第十步还是挺关键的,raf就是在这执行的！）。<br>7.12 渲染UI，关键就在这了。</p>
<p>第九步 继续执行event loop，又去执行task，microtasks和UI render。</p>
<p>更新：找到一张图，不过着重说明的是整个event loop，没有细说UI render。<br><span class="img-wrap"><img data-src="/img/remote/1460000008589740?w=436&amp;h=529" src="https://static.alili.tech/img/remote/1460000008589740?w=436&amp;h=529" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！

## 原文链接
[https://segmentfault.com/a/1190000008589736](https://segmentfault.com/a/1190000008589736)


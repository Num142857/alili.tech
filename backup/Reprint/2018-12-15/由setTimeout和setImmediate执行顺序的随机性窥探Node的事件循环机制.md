---
title: '由setTimeout和setImmediate执行顺序的随机性窥探Node的事件循环机制' 
date: 2018-12-15 2:30:11
hidden: true
slug: ts253w4wak
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题引入</h2>
<p>接触过事件循环的同学大都会纠结一个点，就是在Node中<code>setTimeout</code>和<code>setImmediate</code>执行顺序的随机性。</p>
<p>比如说下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
    console.log('setTimeout');
}, 0);
setImmediate(() => {
    console.log('setImmediate');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>);
}, <span class="hljs-number">0</span>);
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setImmediate'</span>);
})</code></pre>
<p>执行的结果是这样子的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013102061?w=521&amp;h=287" src="https://static.alili.tech/img/remote/1460000013102061?w=521&amp;h=287" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>为什么会出现这种情况呢？别急，我们先往下看。</p>
<h2 id="articleHeader1">浏览器中事件循环模型</h2>
<p>我们都知道，JavaScript是单线程的语言，对<code>I/O</code>的控制是通过异步来实现的，具体是通过“事件循环”机制来实现。</p>
<p>对于JavaScript中的单线程，指的是JavaScript执行在单线程中，而内部<code>I/O</code>任务其实是另有线程池来完成的。</p>
<p>在浏览器中，我们讨论事件循环，是以“从宏任务队列中取一个任务执行，再取出微任务队列中的所有任务”来分析执行代码的。但是在Node环境中并不适用。具体的浏览器事件循环解析：<a href="http://www.yangzicong.com/article/3" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<p>在Node中，事件循环的模型和浏览器相比大致相同，而最大的不同点在于Node中事件循环分不同的阶段。具体我们下面会讨论到。本文核心也在这里。</p>
<h2 id="articleHeader2">Node中事件循环阶段解析</h2>
<p>下面是事件循环不同阶段的示意图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013681765?w=804&amp;h=388" src="https://static.alili.tech/img/remote/1460000013681765?w=804&amp;h=388" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>每个阶段都有一个先进先出的回调队列要执行。而每个阶段都有自己的特殊之处。简单来说，就是当事件循环进入某个阶段后，会执行该阶段特定的任意操作，然后才会执行这个阶段里的回调。当队列被执行完，或者执行的回调数量达到上限后，事件循环才会进入下一个阶段。</p>
<p>以下是各个阶段详情。</p>
<h3 id="articleHeader3">timers</h3>
<p>一个<code>timer</code>指定一个下限时间而不是准确时间，在达到这个下限时间后执行回调。在指定的时间过后，<code>timers</code>会尽早的执行回调，但是系统调度或者其他回调的执行可能会延迟它们。</p>
<blockquote>从技术上来说，<code>poll</code>阶段控制<code>timers</code>什么时候执行，而执行的具体位置在<code>timers</code>。</blockquote>
<p>下限的时间有一个范围：<code>[1, 2147483647]</code>，如果设定的时间不在这个范围，将被设置为1。</p>
<h3 id="articleHeader4">I/O callbacks</h3>
<p>这个阶段执行一些系统操作的回调，比如说TCP连接发生错误。</p>
<h3 id="articleHeader5">idle, prepare</h3>
<p>系统内部的一些调用。</p>
<h3 id="articleHeader6">poll</h3>
<p>这是最复杂的一个阶段。</p>
<p><code>poll</code>阶段有两个主要的功能：一是执行下限时间已经达到的<code>timers</code>的回调，一是处理<code>poll</code>队列里的<strong>事件</strong>。</p>
<p>注：Node很多API都是基于事件订阅完成的，这些API的回调应该都在<code>poll</code>阶段完成。</p>
<p>以下是Node官网的介绍：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013102062?w=998&amp;h=628" src="https://static.alili.tech/img/remote/1460000013102062?w=998&amp;h=628" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>笔者把官网陈述的情况以不同的条件分解，更加的清楚。（如果有误，师请改正。）</p>
<p>当事件循环进入<code>poll</code>阶段：</p>
<ul>
<li>
<code>poll</code>队列不为空的时候，事件循环肯定是先遍历队列并同步执行回调，直到队列清空或执行回调数达到系统上限。</li>
<li>
<p><code>poll</code>队列为空的时候，这里有两种情况。</p>
<ul>
<li>如果代码已经被<code>setImmediate()</code>设定了回调，那么事件循环直接结束<code>poll</code>阶段进入<code>check</code>阶段来执行<code>check</code>队列里的回调。</li>
<li>
<p>如果代码没有被设定<code>setImmediate()</code>设定回调：</p>
<ul>
<li>如果有被设定的<code>timers</code>，那么此时事件循环会检查<code>timers</code>，如果有一个或多个<code>timers</code>下限时间已经到达，那么事件循环将绕回<code>timers</code>阶段，并执行<code>timers</code>的有效回调队列。</li>
<li>如果没有被设定<code>timers</code>，这个时候事件循环是阻塞在<code>poll</code>阶段等待回调被加入<code>poll</code>队列。</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="articleHeader7">check</h3>
<p>这个阶段允许在<code>poll</code>阶段结束后立即执行回调。如果<code>poll</code>阶段空闲，并且有被<code>setImmediate()</code>设定的回调，那么事件循环直接跳到<code>check</code>执行而不是阻塞在<code>poll</code>阶段等待回调被加入。</p>
<p><code>setImmediate()</code>实际上是一个特殊的<code>timer</code>，跑在事件循环中的一个独立的阶段。它使用<code>libuv</code>的<code>API</code>来设定在<code>poll</code>阶段结束后立即执行回调。</p>
<p><strong>注：<code>setImmediate()</code>具有最高优先级，只要<code>poll</code>队列为空，代码被<code>setImmediate()</code>，无论是否有<code>timers</code>达到下限时间，<code>setImmediate()</code>的代码都先执行。</strong></p>
<h3 id="articleHeader8">close callbacks</h3>
<p>如果一个<code>socket</code>或<code>handle</code>被突然关掉（比如<code>socket.destroy()</code>），<code>close</code>事件将在这个阶段被触发，否则将通过<code>process.nextTick()</code>触发。</p>
<h2 id="articleHeader9">关于setTimeout和setImmediate</h2>
<p>代码重现，我们会发现<code>setTimeout</code>和<code>setImmediate</code>在Node环境下执行是靠“随缘法则”的。</p>
<p>比如说下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
    console.log('setTimeout');
}, 0);
setImmediate(() => {
    console.log('setImmediate');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>);
}, <span class="hljs-number">0</span>);
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setImmediate'</span>);
})</code></pre>
<p>执行的结果是这样子的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013102061?w=521&amp;h=287" src="https://static.alili.tech/img/remote/1460000013102061?w=521&amp;h=287" alt="" title="" style="cursor: pointer;"></span></p>
<p>为什么会这样子呢？</p>
<p>这里我们要根据前面的那个事件循环不同阶段的图解来说明一下：</p>
<p>首先进入的是<code>timers</code>阶段，如果我们的机器性能一般，那么进入<code>timers</code>阶段，一毫秒已经过去了（<code>setTimeout(fn, 0)</code>等价于<code>setTimeout(fn, 1)</code>），那么<code>setTimeout</code>的回调会首先执行。</p>
<p>如果没有到一毫秒，那么在<code>timers</code>阶段的时候，下限时间没到，<code>setTimeout</code>回调不执行，事件循环来到了<code>poll</code>阶段，这个时候队列为空，此时有代码被<code>setImmediate()</code>，于是先执行了<code>setImmediate()</code>的回调函数，之后在下一个事件循环再执行<code>setTimemout</code>的回调函数。</p>
<p>而我们在执行代码的时候，进入<code>timers</code>的时间延迟其实是随机的，并不是确定的，所以会出现两个函数执行顺序随机的情况。</p>
<p>那我们再来看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

fs.readFile(__filename, () =&gt; {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout'</span>);
    }, <span class="hljs-number">0</span>);
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'immediate'</span>);
    });
});</code></pre>
<p>这里我们就会发现，<code>setImmediate</code>永远先于<code>setTimeout</code>执行。</p>
<p>原因如下：</p>
<p><code>fs.readFile</code>的回调是在<code>poll</code>阶段执行的，当其回调执行完毕之后，<code>poll</code>队列为空，而<code>setTimeout</code>入了<code>timers</code>的队列，此时有代码被<code>setImmediate()</code>，于是事件循环先进入<code>check</code>阶段执行回调，之后在下一个事件循环再在<code>timers</code>阶段中执行有效回调。</p>
<p>同样的，这段代码也是一样的道理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
    setImmediate(() => {
        console.log('setImmediate');
    });
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
}, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setImmediate'</span>);
    });
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>);
    }, <span class="hljs-number">0</span>);
}, <span class="hljs-number">0</span>);</code></pre>
<p>以上的代码在<code>timers</code>阶段执行外部的<code>setTimeout</code>回调后，内层的<code>setTimeout</code>和<code>setImmediate</code>入队，之后事件循环继续往后面的阶段走，走到<code>poll</code>阶段的时候发现队列为空，此时有代码被<code>setImmedate()</code>，所以直接进入<code>check</code>阶段执行响应回调（注意这里没有去检测<code>timers</code>队列中是否有成员到达下限事件，因为<code>setImmediate()</code>优先）。之后在第二个事件循环的<code>timers</code>阶段中再去执行相应的回调。</p>
<p>综上，我们可以总结：</p>
<ul>
<li>如果两者都在主模块中调用，那么执行先后取决于进程性能，也就是随机。</li>
<li>如果两者都不在主模块调用（被一个异步操作包裹），那么<code>setImmediate</code>的回调永远先执行。</li>
</ul>
<h3 id="articleHeader10">process.nextTick() and Promise</h3>
<p>对于这两个，我们可以把它们理解成一个微任务。也就是说，它其实不属于事件循环的一部分。</p>
<p>那么他们是在什么时候执行呢？</p>
<p>不管在什么地方调用，他们都会在其所处的事件循环最后，事件循环进入下一个循环的阶段前执行。</p>
<p>举个?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
    console.log('timeout0');
    process.nextTick(() => {
        console.log('nextTick1');
        process.nextTick(() => {
            console.log('nextTick2');
        });
    });
    process.nextTick(() => {
        console.log('nextTick3');
    });
    console.log('sync');
    setTimeout(() => {
        console.log('timeout2');
    }, 0);
}, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout0'</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick1'</span>);
        process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick2'</span>);
        });
    });
    process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick3'</span>);
    });
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'sync'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout2'</span>);
    }, <span class="hljs-number">0</span>);
}, <span class="hljs-number">0</span>);</code></pre>
<p>结果是：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013102063?w=462&amp;h=261" src="https://static.alili.tech/img/remote/1460000013102063?w=462&amp;h=261" alt="" title="" style="cursor: pointer;"></span></p>
<p>再解释一下：</p>
<p><code>timers</code>阶段执行外层<code>setTimeout</code>的回调，遇到同步代码先执行，也就有<code>timeout0</code>、<code>sync</code>的输出。遇到<code>process.nextTick</code>后入微任务队列，依次<code>nextTick1</code>、<code>nextTick3</code>、<code>nextTick2</code>入队后出队输出。之后，在下一个事件循环的<code>timers</code>阶段，执行<code>setTimeout</code>回调输出<code>timeout2</code>。</p>
<h3 id="articleHeader11">最后</h3>
<p>下面给出两段代码，如果能够理解其执行顺序说明你已经理解透彻。</p>
<p>代码1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setImmediate(function(){
  console.log(&quot;setImmediate&quot;);
  setImmediate(function(){
    console.log(&quot;嵌套setImmediate&quot;);
  });
  process.nextTick(function(){
    console.log(&quot;nextTick&quot;);
  })
});

// setImmediate
// nextTick
// 嵌套setImmediate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setImmediate"</span>);
  setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"嵌套setImmediate"</span>);
  });
  process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"nextTick"</span>);
  })
});

<span class="hljs-comment">// setImmediate</span>
<span class="hljs-comment">// nextTick</span>
<span class="hljs-comment">// 嵌套setImmediate</span></code></pre>
<p>解析：事件循环<code>check</code>阶段执行回调函数输出<code>setImmediate</code>，之后输出<code>nextTick</code>。嵌套的<code>setImmediate</code>在下一个事件循环的<code>check</code>阶段执行回调输出嵌套的<code>setImmediate</code>。</p>
<p>代码2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');

function someAsyncOperation (callback) {
  // 假设这个任务要消耗 95ms
  fs.readFile('/path/to/file', callback);
}

var timeoutScheduled = Date.now();

setTimeout(function () {

  var delay = Date.now() - timeoutScheduled;

  console.log(delay + &quot;ms have passed since I was scheduled&quot;);
}, 100);


// someAsyncOperation要消耗 95 ms 才能完成
someAsyncOperation(function () {

  var startCallback = Date.now();

  // 消耗 10ms...
  while (Date.now() - startCallback < 10) {
    ; // do nothing
  }

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someAsyncOperation</span> (<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-comment">// 假设这个任务要消耗 95ms</span>
  fs.readFile(<span class="hljs-string">'/path/to/file'</span>, callback);
}

<span class="hljs-keyword">var</span> timeoutScheduled = <span class="hljs-built_in">Date</span>.now();

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">var</span> delay = <span class="hljs-built_in">Date</span>.now() - timeoutScheduled;

  <span class="hljs-built_in">console</span>.log(delay + <span class="hljs-string">"ms have passed since I was scheduled"</span>);
}, <span class="hljs-number">100</span>);


<span class="hljs-comment">// someAsyncOperation要消耗 95 ms 才能完成</span>
someAsyncOperation(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">var</span> startCallback = <span class="hljs-built_in">Date</span>.now();

  <span class="hljs-comment">// 消耗 10ms...</span>
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">Date</span>.now() - startCallback &lt; <span class="hljs-number">10</span>) {
    ; <span class="hljs-comment">// do nothing</span>
  }

});</code></pre>
<p>解析：事件循环进入<code>poll</code>阶段发现队列为空，并且没有代码被<code>setImmediate()</code>。于是在<code>poll</code>阶段等待<code>timers</code>下限时间到达。当等到<code>95ms</code>时，<code>fs.readFile</code>首先执行了，它的回调被添加进<code>poll</code>队列并同步执行，耗时<code>10ms</code>。此时总共时间累积<code>105ms</code>。等到<code>poll</code>队列为空的时候，事件循环会查看最近到达的<code>timer</code>的下限时间，发现已经到达，再回到<code>timers</code>阶段，执行<code>timer</code>的回调。</p>
<hr>
<p>如果有什么问题，欢迎留言交流探讨。</p>
<p>参考链接：</p>
<p><a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/docs/gu...</a>  </p>
<p><a href="https://github.com/creeperyang/blog/issues/26" rel="nofollow noreferrer" target="_blank">https://github.com/creeperyan...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
由setTimeout和setImmediate执行顺序的随机性窥探Node的事件循环机制

## 原文链接
[https://segmentfault.com/a/1190000013102056](https://segmentfault.com/a/1190000013102056)


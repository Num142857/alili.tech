---
title: '浅析javascript调用栈' 
date: 2019-01-07 2:30:10
hidden: true
slug: vwlcrt0bfqo
categories: [reprint]
---

{{< raw >}}

                    
<p>大家在进行javascript开发的时候，有没有想过，我们写的代码是怎么样运行的呢？下面我们就来剖析一下代码的执行过程。</p>
<h1 id="articleHeader0">一 什么是调用栈</h1>
<p>代码在运行过程中，会有一个叫做调用栈(call stack)的概念。调用栈是一种栈结构,它用来存储计算机程序执行时候其活跃子程序的信息。（比如什么函数正在执行，什么函数正在被这个函数调用等等信息）。调用栈是解析器的一种机制。<a href="https://en.wikipedia.org/wiki/Call_stack" rel="nofollow noreferrer" target="_blank">call stack</a></p>
<p>我们以一段简单代码为示例，来看一看到底什么是调用栈，它是一个怎么样的运行机制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function boo (a) {
    return a * 3
  }
  function foo (b) {
    return boo(4) * 2
  }
  console.log(foo(3))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boo</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">return</span> a * <span class="hljs-number">3</span>
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params">b</span>) </span>{
    <span class="hljs-keyword">return</span> boo(<span class="hljs-number">4</span>) * <span class="hljs-number">2</span>
  }
  <span class="hljs-built_in">console</span>.log(foo(<span class="hljs-number">3</span>))</code></pre>
<h1 id="articleHeader1">二 详解代码执行</h1>
<p>下面我们来分析一下上述代码的执行过程<br>（1）console.log(foo(3)) 执行，形成一个栈帧，调用foo函数，再形成另一个栈帧。<br>（2）新的栈帧压在上一个栈帧之上，继续执行代码，foo函数中又调用了boo函数，形成了另一个栈帧压在旧栈帧之上。然后执行boo。<br>（3）当执行完boo时候，返回值给foo函数之后,boo被推出调用栈,foo函数继续执行，然后foo函数执行完，返回值给console.log,foo函数被推出调用栈，console.log得到foo函数的返回值，运行，输出结果，最后console.log也被推出调用栈，该段程序执行完成。<br>图解代码运行过程：<br><span class="img-wrap"><img data-src="/img/bVRv9l?w=684&amp;h=500" src="https://static.alili.tech/img/bVRv9l?w=684&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">三 一个更复杂的例子</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 省略一部分html
<button>click</button>
$.on('button', 'click', function onClick() {
    setTimeout(function timer() {
        console.log('You clicked the button!');    
    }, 0);
});

console.log(&quot;Hi!&quot;);

setTimeout(function timeout() {
    console.log(&quot;Click the button!&quot;);
}, 5000);

console.log(&quot;My Name Is Chirs.&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// 省略一部分html</span>
&lt;button&gt;click&lt;/button&gt;
$.on(<span class="hljs-string">'button'</span>, <span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span><span class="hljs-params">()</span> {</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span><span class="hljs-params">()</span> {</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'You clicked the button!'</span>);    
    }, <span class="hljs-number">0</span>);
});

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"Hi!"</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"Click the button!"</span>);
}, <span class="hljs-number">5000</span>);

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"My Name Is Chirs."</span>)</code></pre>
<p>大家看看上叙的代码，结合一下前面的的分析，思考一下调用栈是怎么工作的？<br>（1）先运行绑定事件函数，把onClick事件绑定在button标签上。该函数没有没有调用其他函数。<br>（2）接下来运行console.log("hi"),该函数没有调用任何其他函数。<br>（3）然后继续执行下面的setTimeout，setTimeout是一个异步函数，经过5秒之后，在运行队列里面插入这个回调函数，然后如果该队列之前没有其他函数，就执行该队列，有则等待前面的函数执行完成，再执行。<br>（4）console.log("My Name Is Chirs")不会等待5s之后，再执行，因为settimeout并不会在调用栈中执行5秒，实际上它在调用栈中是立即执行完的。<br>（5)假设在这个时候，我们点击了按钮，按钮绑定的回调事件被添加到运行队列中。（运行队列中的代码要等调用栈被清空之后才会执行）由于调用栈中还有代码需要执行，所以会继续执行下面的console.log(）<br>（6）然后执行完console.log之后，由于时间还没有经过5s,所以点击的回调事件会被先压入栈中去执行，由于该回调事件里面又是一个settimeout事件，由于它的事件间隔只有0s，所以这个settimeout的回调会先被压入运行队列。先输出You clicked the button! 再过几秒之后，间隔为5s的settimeout把回调函数压入队列，这时候调用栈中没有代码在执行，所以会执行这个代码，输出"Click the button“。结束代码运行。</p>
<p>同样来看一个运行示意图：<br><span class="img-wrap"><img data-src="/img/bVRDfS?w=628&amp;h=500" src="https://static.alili.tech/img/bVRDfS?w=628&amp;h=500" alt="process3" title="process3" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">四 总结</h1>
<p>调用栈其实就是一种解析器去处理程序的机制，它是栈数据结构。它能追踪子程序的运行状态。<br>（1）当脚本要调用一个函数时，解析器把该函数添加到栈中并且执行这个函数。并形成一个栈帧<br>（2）任何被这个函数调用的函数会进一步添加到调用栈中，形成另一个栈帧,并且运行到它们被上个程序调用的位置。<br>（3）当执行完这个函数后，如果它没有调用其他函数，则它会从调用栈中推出。然后调用栈继续运行其他部门。<br>（4) 异步函数的回调函数一般都会被添加到运行队列里面，如settimeout会在响应的时间后把回调函数放入队列中，队列里的函数需要等栈为空时才会被推入栈中执行。如果队列中有其他函数，需要等队列前面的函数被堆入调用栈中之后才会运行。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析javascript调用栈

## 原文链接
[https://segmentfault.com/a/1190000010360316](https://segmentfault.com/a/1190000010360316)


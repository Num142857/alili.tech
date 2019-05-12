---
title: 'JavaScript 事件循环（译文JavaScript Event Loop）' 
date: 2019-02-04 2:30:58
hidden: true
slug: ivv1hitknh
categories: [reprint]
---

{{< raw >}}

                    
<p>听多了JavaScript单线程，异步，V8，便会很想去知道JavaScript是如何利用单线程来实现所谓的异步的。我参考了一些文章，了解到一个很重要的词汇：事件循环(Event Loop)。在这些文章中，有：</p>
<ul>
<li><p>阮一峰老师的<a>JavaScript 运行机制详解：再谈Event Loop</a></p></li>
<li><p>Philip Roberts的<a href="http://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html" rel="nofollow noreferrer" target="_blank">What the heck is the event loop anyway?</a></p></li>
<li><p>Erin Swenson-Healey的<a href="http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/" rel="nofollow noreferrer" target="_blank">The JavaScript Event Loop: Explained</a>等。</p></li>
</ul>
<p>这些文章都讲得非常好，让我对Event Loop的机制有了大概的了解。<br>异步在JavaScript的重要性，也意味着理解Event Loop的必要性，不然怎么敢轻易使用setTimeout和setInterval这些咧。<br>这里我还是通过翻译一篇文章来解释Event Loop，原文点这里<a href="http://altitudelabs.com/blog/what-is-the-javascript-event-loop/" rel="nofollow noreferrer" target="_blank">Willson Mock：What is the JavaScript Event Loop?</a>下边的图也都引用自这篇文章。</p>
<h2 id="articleHeader0">JavaScript Engine：JavaScript 引擎</h2>
<p>截止到目前（原文编写时间：5 July 2014），在各种JavaScript 引擎的实现里边，最出名的当属Google Chrome的V8引擎了，既能在浏览器中使用，也能通过NodeJS在服务器端使用。但究竟JavaScript引擎是干什么用的？其实很简单--它的任务就是遍历应用中的每一行JavaScript代码，并且一次执行一行，意味着JavaScript是单线程的。这里最大的影响是：如果在JavaScript代码中有地方会占用大量的时间，那后面的代码都会被block住。<br>那么JavaScript引擎怎么知道如何一次处理一行JavaScript代码？它使用的是一个调用栈call stack。你可以把调用栈比作电梯--第一个进电梯的会最后一个出电梯，最后进电梯的会最先出。<br>看个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Within main.js */

var firstFunction = function () {  
  console.log(&quot;I'm first!&quot;);
};

var secondFunction = function () {  
  firstFunction();
  console.log(&quot;I'm second!&quot;);
};

secondFunction();

/* Results:
 * => I'm first!
 * => I'm second!
 */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* Within main.js */</span>

<span class="hljs-keyword">var</span> firstFunction = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm first!"</span>);
};

<span class="hljs-keyword">var</span> secondFunction = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
  firstFunction();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm second!"</span>);
};

secondFunction();

<span class="hljs-comment">/* Results:
 * =&gt; I'm first!
 * =&gt; I'm second!
 */</span>
</code></pre>
<p>下边是调用栈的情况：</p>
<ol>
<li><p>Main.js 执行<br><span class="img-wrap"><img data-src="/img/bVCJG4" src="https://static.alili.tech/img/bVCJG4" alt="1-u51csgcFDi7SYoxnFljJ6w.png" title="1-u51csgcFDi7SYoxnFljJ6w.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>调用secondFunction<br><span class="img-wrap"><img data-src="/img/bVCJHc" src="https://static.alili.tech/img/bVCJHc" alt="1-QY4CM881bCmS908GSwlJiA.png" title="1-QY4CM881bCmS908GSwlJiA.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>调用secondFunction引起调用firstFunction<br><span class="img-wrap"><img data-src="/img/bVCJHd" src="https://static.alili.tech/img/bVCJHd" alt="1-pnI4YwJpXzt1mt1leOGl2Q.png" title="1-pnI4YwJpXzt1mt1leOGl2Q.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>执行firstFunction，输出“I'm first!”，接着由于firstFunction执行完毕，firstFunction会从调用栈中弹出。<br><span class="img-wrap"><img data-src="/img/bVCJHo" src="https://static.alili.tech/img/bVCJHo" alt="1-AKybdhXXHbkvL6Eg4pNxDQ.png" title="1-AKybdhXXHbkvL6Eg4pNxDQ.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>secondFunction继续执行，输出“I'm second!”。接着由于secondFunction执行完毕，secondFunction从调用栈中弹出。<br><span class="img-wrap"><img data-src="/img/bVCJHz" src="https://static.alili.tech/img/bVCJHz" alt="1-Wx7x-aKIq2o7DmWlejRpeQ.png" title="1-Wx7x-aKIq2o7DmWlejRpeQ.png" style="cursor: pointer;"></span></p></li>
<li><p>最后，main.js执行完毕，也从栈中弹出。<br><span class="img-wrap"><img data-src="/img/bVCJHA" src="https://static.alili.tech/img/bVCJHA" alt="1-iYM4rq0n0VqSptkCXaiesw.png" title="1-iYM4rq0n0VqSptkCXaiesw.png" style="cursor: pointer;"></span></p></li>
</ol>
<h2 id="articleHeader1">Event Loop：事件循环</h2>
<p>了解了call stack在JavaScript引擎中是如何工作了之后，来看下如何使用异步回调函数来避免blocking 代码。（译者注：回调函数有多种实现方式，最常见的有：在函数中使用函数作用参数etc。）setTimeout就是使用的回调函数。看个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Within main.js */

var firstFunction = function () {  
 console.log(&quot;I'm first!&quot;);
};

var secondFunction = function () {  
 setTimeout(firstFunction, 5000);
 console.log(&quot;I'm second!&quot;);
};

secondFunction();

/* Results:
 * => I'm second!
 * (And 5 seconds later)
 * => I'm first!
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* Within main.js */</span>

<span class="hljs-keyword">var</span> firstFunction = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm first!"</span>);
};

<span class="hljs-keyword">var</span> secondFunction = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
 setTimeout(firstFunction, <span class="hljs-number">5000</span>);
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm second!"</span>);
};

secondFunction();

<span class="hljs-comment">/* Results:
 * =&gt; I'm second!
 * (And 5 seconds later)
 * =&gt; I'm first!
 */</span></code></pre>
<p>下边模拟调用栈（在上个栗子的基础上我们这次推前点）</p>
<ol>
<li><p>...</p></li>
<li><p>secondFunction调用setTimeout，setTimeout入栈：<br><span class="img-wrap"><img data-src="/img/bVCJLc" src="https://static.alili.tech/img/bVCJLc" alt="1-s7d9UjolRGGjqFtfK0wZ8w.png" title="1-s7d9UjolRGGjqFtfK0wZ8w.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>setTimeout执行后，浏览器会把setTimeout的回调函数(在这个栗子中是firstFunction)放到Event Table中。<strong>Event Table</strong> 就是个注册站：调用栈让Event Table注册一个函数，该函数会在5秒之后被调用。当指定的事情发生时，Event Table会将这个函数移到Event Queue。<strong>Event Queue</strong>其实就是个缓冲区域，这里的函数等着被调用并移到调用栈。<br>问题来了，什么时候函数会从Event Queue移到调用栈咧？JavaScript引擎依据一条规则：有一个monitoring process（不知翻译成啥好）会持续不断地检查调用栈是否为空，一旦为空，它会检查Event Queue里边是否有等待被调用的函数。如果存在，它就会调用这个Queue中第一个函数并将其移到调用栈中。如果Event Queue为空，那么这个monitoring process会继续不定期的检查。这一整个过程就是<strong>Event Loop</strong>。<br><span class="img-wrap"><img data-src="/img/bVCJ2b" src="https://static.alili.tech/img/bVCJ2b" alt="1-XdKOatkDmsr-ft3nYs5wdQ.png" title="1-XdKOatkDmsr-ft3nYs5wdQ.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>一旦回调函数加入到Event表中，代码不会被block住，浏览器不会等待5秒之后再继续处理接下去的代码，相反，浏览器继续执行secondFunction的下一行代码，console.log。<br><span class="img-wrap"><img data-src="/img/bVCJ2c" src="https://static.alili.tech/img/bVCJ2c" alt="1-f2g4OgjfB7WXfWuOJUTY5Q.png" title="1-f2g4OgjfB7WXfWuOJUTY5Q.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>在background，Event Table会持续地监测是否有事件触发，将函数移到Event Queue中。在这个栗子中，secondFunction执行完毕，接着main.js也执行完毕。<br><span class="img-wrap"><img data-src="/img/bVCJ2J" src="https://static.alili.tech/img/bVCJ2J" alt="1-wLH1GZRlFvc0ZDawOB1XAQ.png" title="1-wLH1GZRlFvc0ZDawOB1XAQ.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>从回调函数被放入Event Table后5秒钟，Event Table把firstFucntion移到Event Queue中。<br><span class="img-wrap"><img data-src="/img/bVCJ2U" src="https://static.alili.tech/img/bVCJ2U" alt="1-0oy202Rt-94BDKOxKURVtw.png" title="1-0oy202Rt-94BDKOxKURVtw.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>由于事件循环持续地监测调用栈是否已空，此时它一注意到调用栈空了，就调用firstFunction并创建一个新的调用栈。<br><span class="img-wrap"><img data-src="/img/bVCJ21" src="https://static.alili.tech/img/bVCJ21" alt="1-9Vpvh23CJNmxHVbkwrNpyQ.png" title="1-9Vpvh23CJNmxHVbkwrNpyQ.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>一旦firstFunction执行完毕，调用栈空了，Event Table里也没有注册函数，Event Queue也为空。<br><span class="img-wrap"><img data-src="/img/bVCJ29" src="https://static.alili.tech/img/bVCJ29" alt="1-MmPtbaLvP54DuH-jHAjEXg.png" title="1-MmPtbaLvP54DuH-jHAjEXg.png" style="cursor: pointer; display: inline;"></span></p></li>
</ol>
<h2 id="articleHeader2">总结</h2>
<p>虽然这样的解释掩盖了实际JavaScript引擎、Event Table、Event Queue和Event Loop的具体实现细节，但是对于大部分人来说，我们只需要对JavaScript执行异步函数时会发生什么有个大概的了解即可。<br>（译到此）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 事件循环（译文JavaScript Event Loop）

## 原文链接
[https://segmentfault.com/a/1190000006811224](https://segmentfault.com/a/1190000006811224)


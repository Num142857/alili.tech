---
title: '你不知道的Javascript：有趣的setTimeout' 
date: 2018-12-15 2:30:11
hidden: true
slug: fj4itn3tct9
categories: [reprint]
---

{{< raw >}}

                    
<p>今天在回顾JavaScript进阶用法的时候，发现一个有趣的问题，话不多说，先上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var j=0;j<10;j++){
  setTimeout(function(){console.log(j)},5000)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>;j&lt;<span class="hljs-number">10</span>;j++){
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(j)},<span class="hljs-number">5000</span>)
}
</code></pre>
<p>看到这三行代码，也许你会不耐烦道：又要讲闭包？要吐了好么？别急，让我们先来思考一下，这段代码在浏览器中的执行结果是什么？</p>
<p>甲：顺序打印0到9？</p>
<p>乙：这题我见过，打印十个10！</p>
<p>哪个答案正确？我们继续上图：<br><span class="img-wrap"><img data-src="/img/bV2X07?w=644&amp;h=332" src="https://static.alili.tech/img/bV2X07?w=644&amp;h=332" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>执行结果显示，浏览器打印出了十个10（因为图片处理的原因，按下回车到打印之前其实间隔了5秒左右），貌似乙胜出了。但如果你足够细心，你会发现几个问题：</p>
<ol>
<li>为什么会循环打印十个10而不是0到9？</li>
<li>从结果来看，for循环执行完跳出之后，才开始执行setTimeout（所以j才等于10），为什么不是每次迭代都执行一次setTimeout呢？</li>
</ol>
<p>如果上述三个问题你都能回答上来，恭喜你，你已经开始掌握了JavaScript深层次的知识，如果不能，那就乖乖往下看吧！</p>
<p>为什么会循环打印十个10</p>
<p>许多人习惯用第二个问题中的执行结果来回答这个问题：“for循环执行完跳出之后，才开始执行setTimeout，所以才打印了十个10”。这样的答案，只能说是既应付了自己，又应付了别人。其实，要解答第一个问题，首先要解答的就是第二的问题。</p>
<h2 id="articleHeader0">为什么不是每次迭代都执行一次setTimeout</h2>
<p>大家都知道，JavaScript在ES6出现以前，是没有块状作用域的，这就意味着， 在for循环中用var定义的变量j，其实是属于全局的，即在全局范围内都可以被访问到，既然如此，那其实整个全局作用域中就只有一个j，每次for循环都i是在更新这个j。</p>
<p>那么现在关键的问题在于，为什么整个for循环会先于setTimeout执行，而不是我们正常理解的，一次迭代执行一次。</p>
<p>这就涉及到了JavaScript的核心特性：单线程。</p>
<p>JavaScript设计的初衷，是浏览器用来与用户进行交互和DOM操作的。这就决定了它必须是单线程的，设想JavaScript同事有两个线程，一个线程在DOM节点添加内容，一个线程删除该节点，浏览器就会出现混乱。所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。</p>
<p>单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。</p>
<p>为了优化单线程的性能，JavaScript将任务分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有主线程中的同步任务执行完毕，异步任务才会进入执行队列执行。只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。</p>
<p>而setTimeout，就被JavaScript定义为异步任务。每次for循环的迭代，都将setTimeout中的回调函数加入任务队列等待执行。也就是说，只有同步任务中的for循环完全结束，主线程中才会去任务队列中找到尚未执行的十个setTimeout（十次迭代）回调函数并顺序执行（先进先出）。而此时，i已经经过循环结束变成了10，所以，此时主线程执行的，是十个一摸一样的打印i的回调函数，即打印十个10。至此就完美回答了第一和第二个问题，文章开头的代码与下面的代码其实是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0;i<10;i++){}
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
setTimeout(console.log(i),5000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for(<span class="hljs-name">var</span> i=0<span class="hljs-comment">;i&lt;10;i++){}</span>
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
setTimeout(<span class="hljs-name">console</span>.log(<span class="hljs-name">i</span>),<span class="hljs-number">5000</span>)
</code></pre>
<p>小小的一个setTimeout，牵扯出了很多JavaScript的深层次问题，虽然总结成一篇文章只有区区数百字，但是我在成文的过程中查阅了大量的资料，也做了许多实验。</p>
<p>最后，给出一个很小但是仍然在困扰我的一个问题,希望有兴趣的小伙伴可以跟我一起研究：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function(){while(true){"}}",6000);
setTimeout(function(){console.log(1)},10000);
setTimeout(function(){console.log(2)},5000);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){"}}",<span class="hljs-number">6000</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)},<span class="hljs-number">10000</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)},<span class="hljs-number">5000</span>);
</code></pre>
<p>上述代码的执行顺序是怎样的？setTimeout的定时，是定时插入执行栈之后立即执行，还是立即插入执行栈定时执行？</p>
<p>期待大家的留言。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Javascript：有趣的setTimeout

## 原文链接
[https://segmentfault.com/a/1190000013060968](https://segmentfault.com/a/1190000013060968)


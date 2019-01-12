---
title: '和少妇白洁一起学JavaScript之Async/Await' 
date: 2019-01-13 2:30:11
hidden: true
slug: hu0a5q41g8j
categories: [reprint]
---

{{< raw >}}

                    
<p>能和微博上的 @响马 （fibjs作者）掰扯这个问题是我的荣幸。</p>
<p>事情缘起于知乎上的一个热贴，诸神都发表了意见：</p>
<p><a href="https://www.zhihu.com/question/59441623/answer/168675034" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p>
<p>这一篇不是要说明白什么是async/await，而是阐述为什么会在编程技术这么多年后出现和流行了这个东西，读懂这篇文章你需要对async/await有很透彻的机制理解。</p>
<p>如果是写系统程序，流行的编程范式是面向对象，这非常成熟不用多说；但如果是写微服务(restful api server)，情况不同。</p>
<p>写微服务的时候数据不是从文件或数据库读取、去串行化、构造对象然后在内存中维护对象；而是向数据库、cache、或者API提取数据，计算后尽快输出结果；</p>
<p>前者的数据对象生命周期较长，object-oriented范式很合适，它研究一个对象的状态机和如何响应外部事件；</p>
<p>后者的数据生命周期很短，而且更糟糕的，各种input数据的结构也不很稳定，经常变化，所以这个时候OO的模式就显得笨重和低效了，在这个时候对data的处理不是object-oriented范式，而是transformation-oriented范式。</p>
<p>后者导致了函数式编程的兴起，这里没法仔细讨论函数式编程的方方面面，我们仅仅说transformation的问题。</p>
<p>这种编程范式下一次api服务的生命周期在心理模型上一个函数的开始和结束，这个函数需要从很多地方pull数据，如果是从内存中直接pull，这个在fp里叫做state monad；如果是异步pull数据，包括文件、数据库、其他api，这个叫io monad。</p>
<p>OO的本质站在fp的角度看是如何维护state monad，如果程序中有stateful的部分，或多或少都会有，用oo建模不是问题；访问这些state都是同步的也不是问题；</p>
<p>async/await的出现是为了解决第二个问题，io monad。</p>
<p>在采用transformation和fp方式写微服务的时候，常见情况不是处理单一数据单元，而是数据集合，集合数据的变换是map/filter，聚合是reduce（广义）；这个过程可以有条件，可以是nested，其结构取决于你的业务逻辑和solution model，不是编程技术解决的。</p>
<p>所以你大体可以把这些逻辑先用同步的方式写出来，假定所有异步获得的数据都可以同步获得，然后把需要pull的数据改成用async/await去获取；这在结构上很清晰；</p>
<p>在这个时候开发者考虑的问题不是如何对付单一数据的异步获取问题，而是考虑这些异步过程之间如何去串行和并发的问题；换句话说，他们的执行序是你要program的逻辑的一部分。既然他们是programming逻辑的一部分，那么他们显示存在就理所应当。</p>
<blockquote><p>这里说的串行和并发仅指从io monad里pull数据的操作，不是指程序中其他部分的执行体之间的并发或并行。下同。</p></blockquote>
<p>这里有两个平衡：</p>
<p>第一：如果要追求service time越短越好，也就是提高响应时间，那么这些异步就会象project软件里的甘特图一样，能并发的尽早并发，service time取决于最长的路径。通常瓶颈都是io不是算力，除非设计有问题或者算法写得太烂。</p>
<p>这种优化很可能带来代码结构的不清晰，但是它是可以做而且容易做的，在async/await模式下，因为它在代码层面上基本上保留了这个甘特图关系。</p>
<p>它适应业务变化的能力也很好，在业务逻辑变化必须修改的时候，开发者总有一个比较清除的甘特图，如果你不在async子函数里封装太长的不必要逻辑的话；和OO建模时我们反复问一个对象是不是single responsibility一样，一个async函数的封装越原子化，越容易让开发者在上层组合顺序和并发。</p>
<p>这里我不去批判thread或者fiber或者goroutine或者coroutine的模型，只强调异步数据的pull逻辑的原子化，这是高并发微服务编程对开发者提出来的新问题，原则上任何一种开发语言和开发模型都可以做到对等的性能和可用性，但实践上大多数情况下，程序员不把program异步pull数据的顺序和并发当成是自己编程逻辑的一部分，去享受thread model下的编程逻辑简单，这是不对的；你可以有理由不急着去做service time优化，但是不意味着你根本不知道它的模型逻辑和如果要去优化，做法是什么。</p>
<p>第二：async函数对gc的压力很大，因为compiler很难去判断在运行时哪些域内变量可以回收，这不同于闭包变量，闭包变量的生命周期判断在源码级的词法域就可以分析出来；所以async函数的执行应该是短生命周期的。</p>
<h1 id="articleHeader0">例子</h1>
<p>贴一小段代码，实际项目代码，没什么特别的，Promise用了bluebird库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async storeDirAsync(dir) {

    let entries = await fs.readdirAsync(dir)
    let treeEntries = await Promise
      .map(entries, async entry => {
          
        let entryPath = path.join(dir, entry)
        let stat = await fs.lstatAync(entryPath)
            
        if (stat.isDirectory())
          return ['tree', entry, await this.storeDirAsync(entryPath)]
            
        if (stat.isFile())
          return ['blob', entry, await this.storeFileAsync(entryPath)]

        return null
      })  
      .filter(treeEntry => !!treeEntry)

    return await this.storeObject(treeEntries)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">async</span> storeDirAsync(dir) {

    <span class="hljs-keyword">let</span> entries = <span class="hljs-keyword">await</span> fs.readdirAsync(dir)
    <span class="hljs-keyword">let</span> treeEntries = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>
      .map(entries, <span class="hljs-keyword">async</span> entry =&gt; {
          
        <span class="hljs-keyword">let</span> entryPath = path.join(dir, entry)
        <span class="hljs-keyword">let</span> stat = <span class="hljs-keyword">await</span> fs.lstatAync(entryPath)
            
        <span class="hljs-keyword">if</span> (stat.isDirectory())
          <span class="hljs-keyword">return</span> [<span class="hljs-string">'tree'</span>, entry, <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.storeDirAsync(entryPath)]
            
        <span class="hljs-keyword">if</span> (stat.isFile())
          <span class="hljs-keyword">return</span> [<span class="hljs-string">'blob'</span>, entry, <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.storeFileAsync(entryPath)]

        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
      })  
      .filter(<span class="hljs-function"><span class="hljs-params">treeEntry</span> =&gt;</span> !!treeEntry)

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.storeObject(treeEntries)
  }</code></pre>
<p>这是一个class方法。</p>
<p>它的第一步是获取了一个文件夹内的<code>entries</code>，然后用Bluebird库提供的map方法应用了一个async函数上去，这是个匿名函数。</p>
<blockquote><p>匿名函数是我们喜欢fp的一个重要原因，functor chaining也是，它们分别消除了很多代码细节上需要命名变量名或函数名的需要。</p></blockquote>
<p>这个匿名函数内，有更多的await操作，根据fs.stat的结果针对目录和文件做了不同处理，而且有递归。async之内是顺序执行的，但async在map里是并发的，这些东西都显式摆在代码层面上。</p>
<p>如果任务范围更大，你可以把很多promise聚合在尽可能早的时候并发。</p>
<p>当然这个写法没有美好到可以直接写<code>entries.mapAsync()</code>的程度，但基本上做到了上述的要求：在源码层面上对顺序和并发有一览，有控制，容易变更。</p>
<p>说到底，async是让这种顺序和并发的书写和维护变得容易，而不是说我不要写并发，一切顺序走；但是反过来说它的效率不是最好的，在node里最好的效率目前和可见的未来都是裸写callback，那是最后的性能优化了。</p>
<p>最后我们说这个写法的一个有点麻烦的坑。</p>
<p>在class方法里写async有个this binding的问题，搞出来一个闭包变量并不是最好的办法，Bluebird库里有Promise.bind方法解决这个问题，上述代码中用arrow function的lexical scope bind this也是一个办法(也是推荐的办法)。</p>
<h1 id="articleHeader1">总结</h1>
<p>node.js是我写过的最好的纯粹event model模型的开发环境；远好过天生thread模型倒回来打很多non-blocking补丁的做法；</p>
<blockquote><p>javascript领域，和目前整个编程界，在使用asynchronous(异步)这个词来说我们在这篇文章里聊的问题，这是个错误，asynchronous在编程上有其他含义，无论是写系统程序(signal handler)还是写内核或者裸金属(isr)；这个问题的准确表述是：non-blocking。</p></blockquote>
<p>而对应non-blocking的solution模型是如何调度(schedule)执行体；再然后的问题转换成你需要显式调度还是隐式调度？</p>
<p>如果你认为：</p>
<ol>
<li><p>service time是需要追求的</p></li>
<li><p>调度逻辑是经常随着业务逻辑变化而变化的</p></li>
<li><p>完整的数据流变换逻辑和调度逻辑都应该在代码层面上呈现总览，是top-down的构建的</p></li>
</ol>
<p>你应该选择async/await；</p>
<p>反之，你希望编程极致简单，调度不在你的solution模型之内，你bottom-up构建逻辑，应该远离javascript，选择thread模型。</p>
<h1 id="articleHeader2">白洁</h1>
<p>“请把你的左手放在自己的大咪咪上，回答一个问题，调度执行体和调度io是一回事吗？”</p>
<p>白洁摇摇头。</p>
<p>“我也认为不是，但是很多runtime library并没有区分两者。” said I.</p>
<blockquote><p>JavaScript的event model并没有所谓的调度执行体的设计，它本质上只有调度io。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
和少妇白洁一起学JavaScript之Async/Await

## 原文链接
[https://segmentfault.com/a/1190000009586689](https://segmentfault.com/a/1190000009586689)


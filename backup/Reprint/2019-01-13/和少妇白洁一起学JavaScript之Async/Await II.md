---
title: '和少妇白洁一起学JavaScript之Async/Await II' 
date: 2019-01-13 2:30:11
hidden: true
slug: jr5filyytqe
categories: [reprint]
---

{{< raw >}}

                    
<p>前面写了一篇，写的很粗，这篇讲讲一些细节。实际上Fiber/Coroutine vs Async/Await之争不是一个简单的continuation如何实现的问题，而是两个完全不同的problem和solution domain。</p>
<h1 id="articleHeader0">Event Model</h1>
<p>我们回顾一下最纯粹的Event Model。这曾经在UI编程，和现在仍然在microcontroller(MCU)编程中占据主力地位，在系统编程上是thread model了。</p>
<p>用MCU编程来讲解最方便，在传统UI编程上是一样的。</p>
<p>单核的MCU具有硬件的Thread。</p>
<p>Main Thread是CPU的正常运行，Interrupt Thread(一般称为ISR，Interrupt Service Routine)是硬件上的比Main Thread优先级更高的Thread，即所谓的抢先(pre-emptive)。</p>
<p>如果Main Thread在运行，有Interrupt进来，CPU会立刻跳转到ISR入口执行，ISR原则上应该保存现场，运行，然后恢复现场，return。return之后Main Thread重新拿回CPU继续运行。这里压栈弹栈的细节不说了，这就是一个抢先CPU的过程。</p>
<p>在这种模式下编程，ISR里能访问的变量，和Main Thread里访问的变量，很明显存在race，需要锁机制。在系统级编程这种锁机制就是lock，但是上述情况里Main Thread和ISR不是对称的，所以做法略有区别：Main Thread里lock的办法是禁止interrupt，然后开始执行critical section的代码，完成后使能中断；ISR里，如果不考虑ISR之间的抢先的话，不需要这个过程，因为它天生比Main Thread优先级高。</p>
<blockquote><p>昨天我们说了业界都在把non-blocking叫做asynchronous；这里解释一下asynchronous，asynchronous的正确含义是你写了一个function，这个function在Main Thread和ISR里都能用，它叫做asynchronous function；如果是系统级编程，thread之间是对等的，它叫做thread-safe。</p></blockquote>
<p>上述的模型在逻辑上没问题，但是有两个实践上的麻烦：</p>
<ol>
<li><p>asynchronous function不好写，尤其是出现nested，在ISR有抢先的时候就更加麻烦；</p></li>
<li><p>禁止中断的时间不能太长，太长的话会丢失中断处理，逻辑上会出现问题；</p></li>
<li><p>ISR里的执行逻辑时间也不能太长，尤其不能等待什么，否则Main Thread会被block太久；</p></li>
</ol>
<p>所以聪明人就有一个one-for-all的办法：</p>
<ol>
<li><p>在全局构造一个event queue；</p></li>
<li><p>任何ISR进来的时候，不去做逻辑处理，只把当时和中断有关的状态保存下来，构造一个event，压入队列；</p></li>
<li><p>在Main Thread里一个一个的取event，调用相应的event handler处理。</p></li>
</ol>
<p>在这个模式下：</p>
<ol>
<li><p>只有event queue是需要lock的；唯一的race发生在存取event的时候，存不用lock，取的时候禁止和使能中断，这个时间不长，避免丢失中断。</p></li>
<li><p>中断的真正处理逻辑实际上发生在Main Thread，相当于deferred，它有延迟，但是不会乱序。</p></li>
<li><p>所有的代码段都运行在Main Thread，没有race，也就是人们最推崇event model的特性之一：run-to-completion。</p></li>
</ol>
<p>它对于硬件抢先的多线程是个非常好的简化。</p>
<h1 id="articleHeader1">Event / State Model</h1>
<p>那么有了Event，代码模块化的结果就是用State Machine建模。State Machine是一个理论上万能的模型，任何代码模块你都可以给出state/event行为矩阵，称为state transition table。它是对这个模块的完备定义，也极具可测试性，也应用非常广泛。OO编程的本质是State Machine建模，所有的method都可以看作是event，它可能引起Object的状态迁移。在良好设计下，State具有边界，即所谓的封装。每个State都有owner，不是owner不能修改它，避免side-effect。</p>
<p>在实践中，目前没有任何一个流行语言能直接写出简洁的状态机，尤其是状态机组合；所以它存在于Pattern层面而不是语言层面；客观的说这是计算工业的耻辱，但我们只能接受现状。</p>
<h1 id="articleHeader2">IO</h1>
<p>IO不是象中断一样的自发事件。在通讯编程领域大家发明了一对名词来描述这个问题：solicited和unsolicited；不算特别恰当但有总比没有好。</p>
<p>IO是solicited，即有request才会有response；不需要request的那种自发event，是unsolicited event。</p>
<p>Event Model在处理这个问题上没有理论上的障碍，你可以对调用函数对外界进行一个操作，然后得到结果时构造一个事件。</p>
<p>但是在实践上，即使不考虑效率问题，这里仍然有一个大麻烦：在代码层面上，执行request的地方在一个函数里，被某个event handler直接或间接调用，处理response的event handler在另一个地方。代码的可读性和可维护性都是完全没有保障的，代码质量取决于你的信仰、星座、美食爱好、或者性取向。</p>
<h1 id="articleHeader3">Continuation</h1>
<p>我们需要一些技术让代码看起来是人类的，不是AI或者外星人的，来对付IO问题。</p>
<p>更宽泛的说，Thread Model，Unix进程，Unix的一切皆IO哲学，Unix的open/read/write/close包打天下，就是我们在解决这类问题上的第一个大范围成功的案例。但是Thread Model这个话题太大了，它还包括系统资源的虚拟化和物理多CPU的并发，所以我们不用这种扩大化的概念来讨论。我们只讨论两个限定在单进程Event Model下的技术：coroutine和callback。</p>
<h1 id="articleHeader4">Coroutine</h1>
<p>Coroutine也是一个扩大化的概念。我们先讨论广的概念边界，再来说它对io问题的解决办法。</p>
<p>Coroutine的科学定义是stateful或者stackless function，它的标志性原语是yield。</p>
<blockquote><p>注意原语(primitive)是理解一种编程语言或者编程技术的最关键点。如果一种技术致力于解决某个特定问题，它最好的办法不是用pattern来解决，而是定义原语。OO语言有class，extends，implements；函数式语言允许function作为primitive value写入assignment expression；以解决并发为目标的Go语言把channel作为标志。</p></blockquote>
<p><code>yield</code>是什么意思呢？它说的不是io，它说的是cpu，交出cpu。从这个意义上说，coroutine第一解决的问题是调度。它解决其他问题，包括timer/sleep，包括io，包括把一个整体计算切碎成很多单元来实现，都是靠yield。所以正确的表述是：Coroutine不是为特别解决io问题的设计，它首先解决cpu调度，它可以用于解决io问题。</p>
<p>第二点，为什么我们需要coroutine？它最擅长解决的问题是什么？</p>
<p>coroutine本质上仍然是一个event / state model，是一个object，但是不同的是，你不需要把所有的state都显式表达出来，以对付continuation问题，coroutine允许开发者直接用语言提供的原始流程语句，来编码state信息，你运行到哪里，这个时候整个coroutine内的local variable的组合，就是当前的state，每运行一次，就是一次state transition；和对象一样它要从构造开始，到析构结束(return)。</p>
<p>coroutine能解决一类对OO语言的state pattern实现来说特别无力的状态机模型：流程即状态。如果你的状态机model的是一个复杂流程，充满条件分支、循环、和他们的嵌套，用coroutine写起来非常简单，而与之对应的状态机，都不用写代码，定义transition table的时候程序员就要进医院了。</p>
<p>coroutine对付io了吗？yes and no。它是标准的Thread Model，thread model下io什么样，它就什么样了，no more, no less。</p>
<h1 id="articleHeader5">Callback, Promise, Async/Await</h1>
<p>这几个货本质上是一样的，区别在形式上。当然很多时候形式很重要，但是我们先谈本质。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const myFunction = (dirpath, callback) => {
  // do something
  // first io operation
  if (err) 
    return callback(err)
  else
    return callback(null, entries)
}

// my code
myFunction('/home/hello', (err, entires) => {
  // blah blah blah
})

// do something else
console.log('blah, blah...')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> myFunction = <span class="hljs-function">(<span class="hljs-params">dirpath, callback</span>) =&gt;</span> {
  <span class="hljs-comment">// do something</span>
  <span class="hljs-comment">// first io operation</span>
  <span class="hljs-keyword">if</span> (err) 
    <span class="hljs-keyword">return</span> callback(err)
  <span class="hljs-keyword">else</span>
    <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, entries)
}

<span class="hljs-comment">// my code</span>
myFunction(<span class="hljs-string">'/home/hello'</span>, (err, entires) =&gt; {
  <span class="hljs-comment">// blah blah blah</span>
})

<span class="hljs-comment">// do something else</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'blah, blah...'</span>)</code></pre>
<p>我们首先说callback的本质是一个event handler。调用<code>myFunction</code>相当于在前面说的最淳朴的event model里enqueue一个event，这个event的handler会根据event里定义的dirpath执行某个操作，操作结束的时候会构造另一个event，里面包含error或result。</p>
<p>这个纯粹模型的写法会非常复杂，从这个意义上说，node.js callback是一种简单的continuation实现。</p>
<p>But wait! 两者不是完全一致的!</p>
<p><code>myFunction</code>函数里入口处do something部分的代码；如果是我们上述的淳朴event model，它会在当前代码结束之后执行，即console.log会先执行，等到全局的event manager开始层层dispatch event的时候，这个请求才可能landing到正确的handler，这段do something才开始执行，在console.log之后。</p>
<p>这是一个subtle，但是极为重要的区别。</p>
<blockquote><p>插个话：callback形式如果在入口处do something立刻返回的话，对外部调用者来说是一场灾难，因为它根本没办法确定它提供的callback在console.log之前还是之后执行。所以callback形式要guarantee它是异步的，用process.nextTick。promise和async/await在这个问题上是一大进步，它有异步保证，即使代码形式上看起来是同步返回。</p></blockquote>
<p>现在我们在自己脑袋上敲一锤子，昏过去，醒来的时候站在V8虚拟机的中控台上。V8激进的inline函数来提高执行效率，在源码层面上的myFunction函数调用，对V8编译的代码来说有一个call/return的边界吗？probably not！对编译代码来说，极大的可能性是执行函数边界在myFunction内部第一个io处，而不是函数入口。</p>
<p>如果仍然用淳朴Event Model来类比，enqueue的event是一个纯粹的io操作请求，而不是要执行myFunction函数！</p>
<p>所以写到这里，一个关键的概念问题阐述清楚了：</p>
<p><strong>coroutine is all about how to structure your control flow unit, while node callback is all about how to structure your io operation.</strong></p>
<p>他们的出发点完全不同。</p>
<h1 id="articleHeader6">FP vs OO</h1>
<p>在建模层面（而不是语言技术层面）Funtional Programming，FP，它不是OO的对立，而是OO的超集。</p>
<p>在FP模型下，程序分为三个部分：Pure Functions，OO (state monads)，和io (io monads)。</p>
<p>Pure的部分里，Pure Function只有输入输出（函数的输入输出，不是io输入输出），function和immutable数据结构是孪生姐妹。</p>
<p>OO的部分，如果程序需要state，OO至少在JavaScript里是绝对的最佳实践，只有少量场合可以用闭包代替。</p>
<p>io的部分，应该单独抽象出来，用callback、promise或者async/await做薄层封装。</p>
<p>站在Pure Function的角度看，state和io都是它的外部世界。</p>
<h1 id="articleHeader7">Side Effect</h1>
<p>Side Effect一词最广的使用上指的是一个函数是不是pure。io function毫无疑问不pure，但是访问state的呢？比如前面的代码里，如果myFunction修改了它的调用者域内的闭包变量呢？这也是side effect。</p>
<p>在OO里我们保障减少side effect的影响的办法，对于state（而不是io）范畴的变量来说，是用封装原则来保障的。</p>
<p>在FP里对这个问题的有效办法，则是immutable。</p>
<p>比如上面的代码，如果你传入myFunction的参数是一个对象，有深层次的结构，你会设计myFunction的函数约定是我要修改某个参数吗？或者你会防止其他程序员这样做吗？</p>
<p>简单的办法就是用immutable来处理在pure function domain的这类问题，大家都用immutable；即使你没有显式的包含某些immutable库，JavaScript里也有大量的集合类函数已经这样做了。</p>
<h1 id="articleHeader8">Lock</h1>
<p>Lock分为两类，atomic operation lock，和transactional lock。</p>
<p>transactional lock指的是一个操作的结果是all or none的，包括更新state，也包括执行output io操作。</p>
<p>容易实现transactional lock是需要fp和immutable的一个重要原因。因为它让这种lock容易书写。</p>
<h1 id="articleHeader9">Early Lock vs Opportunistic Lock</h1>
<p>你可以用一种锁对付两种情况。但是很难。用Big lock并发效率有问题，细粒度锁编程难度大；而且对于JavaScript的单进程Event Model来说，用细粒度锁对付transactional的数据完整性问题是overkill的。</p>
<p>另外一种锁机制是Opportunistic lock，它和数据库的事务操作是同样的逻辑：你不断的执行更新数据的操作，实际上是创建了一个副本，在最后commit的时候全部生效或失败。如果失败了可以重试这个过程。</p>
<p>在有immutable数据保证的情况下，如果有多步io操作导致更新过程分了几个步骤，这个不是问题，你一直在创建一个副本，在最后需要更新state monad的时候，用referential equality check检查input是否发生了变化（你也可以每一步都做，但几率上说意义不大）。</p>
<p>这样书写事务问题，即使对文科生改行来的程序员来说也不算太难。</p>
<h1 id="articleHeader10">IO Lock</h1>
<p>在某些情况下IO操作的原子锁无可替代；</p>
<p>比如你要更新一个文件，你可以用时间戳来替代上面说的immutable referential check，即先读入文件时间戳，写入前检查时间戳是否发生变化，这么做能大大减少race的几率，但不是解决了问题，因为读入时间戳本身和写入文件操作没有原子性，可以出现race。</p>
<p>那么这种时候封装原子操作是必要的，传统的early lock也必要，但这是最细粒度锁，它属于原子操作锁而不是事务锁。</p>
<p>事务锁本质上是big lock，即使要提高效率也只是每步操作检查input，没有逻辑难度，只有代码量。</p>
<p>文件系统io是有需要写原子操作锁的情况的，数据库和api操作应该由提供者保证rmw操作(read-modify-write)，如果需要的话。</p>
<h1 id="articleHeader11">Big Picture</h1>
<p>所以问题不是简单的fiber/coroutine vs async/await之争，而是要站在更大的problem domain去全局的看。程序员需要的是全局的和一致的解决方案。</p>
<p>在前面的讨论上说过了，fiber/coroutine完全是关于调度控制流程的，而callback/promise/async/await完全是关于结构化io操作的；两者没在同一个角度上谈问题。</p>
<p>fiber/coroutine不是完整的问题答案，除非你的problem domain里最重要的问题是如何并发计算任务，io无所谓；</p>
<p>async/await回答了如何结构化io操作的问题，结合fp/immutable回答了如何在维护state和更新外部世界时解决事务性竞争问题。它是一个一揽子解决办法，而且不难。</p>
<p>在针对state维护的问题上，state machine/event/state model是合格的，但是它与重io操作时的结构化io操作尤其是transactional更新问题没有直接答案。nodejs本身不是general purpose的系统级开发语言和环境，它是domain specific language (dsl)。</p>
<p>我们不能说coroutine或者csp/channel在JavaScript上完全没有意义，但是nodejs在io并发上已经做得很好，而如果还要在计算任务并发上做得很好，支持多核，目前看差距太大了，需要解决的问题很多很多。</p>
<h1 id="articleHeader12">未来</h1>
<p>JavaScript的未来肯定不在于目前worker引入的锁，这是个joke，属于monkey-patching。</p>
<p>在系统语言里不得不用的细粒度锁也不该在JavaScript里出现，也不该用于解决事务问题。</p>
<p>Opportunistic Lock是被数据库领域证实的和被广泛接受的solution，只是在语言一级去实现primitive支持上有困难。它需要：</p>
<ol>
<li><p>JS语言和JSVM真正支持immutable数据类型；</p></li>
<li><p>在JSVM里有Software Transactional Memory的实现；</p></li>
</ol>
<p>理论上STM支持多核是没问题的，系统语言的STM库有很多成熟的，但是JS的语言对象模型是list/hash table，在JIT层面上又要编译成类型对象，所以把对象模型扣在内存模型上并不简单。</p>
<h1 id="articleHeader13">Final</h1>
<p>你应该花上几周的时间了解一下Haskell。</p>
<blockquote><p>Haskell是静态语言，最纯粹的simple typed lambda实现；它有着匪夷所思的强大的代数类型系统，但是到底是静态的代数类型系统是未来，还是JIT的动态类型系统是未来，只有时间能回答了。</p></blockquote>
<p>它有个搞笑的do语法，async/await该做的是就是haskell里do该做的。do/io monad也是最能说明白nodejs callback的设计初衷和最恰当的应用场景的。</p>
<p>在pure function, state monad, 和io monad之间划分清楚的界限，是程序建模的巨大进步，而不是把io封装在OO对象的操作里，它等于没有区分state和io的不同。</p>
<p>无论用任何语言编程，这个建模方式和划分模块的办法都是极具借鉴意义的；除非你的程序真的和老式程序一样只需要封装简单的几个文件操作。</p>
<p>时代不同了，web和network改变了我们编程的问题域，相应的我们在解法域需要新思维也就理所应当。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
和少妇白洁一起学JavaScript之Async/Await II

## 原文链接
[https://segmentfault.com/a/1190000009596894](https://segmentfault.com/a/1190000009596894)


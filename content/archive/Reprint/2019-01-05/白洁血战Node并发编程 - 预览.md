---
title: '白洁血战Node并发编程 - 预览' 
date: 2019-01-05 2:30:10
hidden: true
slug: 58mqj1mncjg
categories: [reprint]
---

{{< raw >}}

                    
<p>预览。</p>
<p>先给出一个基础类代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EventEmitter = require('events')
const debug = require('debug')('transform')

class Transform extends EventEmitter {

  constructor (options) {
    super()
    this.concurrency = 1

    Object.assign(this, options)

    this.pending = []
    this.working = []
    this.finished = []
    this.failed = []

    this.ins = []
    this.outs = []
  }

  push (x) {
    this.pending.push(x)
    this.schedule()
  }

  pull () {
    let xs = this.finished
    this.finished = []
    this.schedule()
    return xs
  }

  isBlocked () {
    return !!this.failed.length ||              // blocked by failed
      !!this.finished.length ||                 // blocked by output buffer (lazy)
      this.outs.some(t => t.isBlocked())        // blocked by outputs transform
  }

  isStopped () {
    return !this.working.length &amp;&amp; this.outs.every(t => t.isStopped())
  }

  root () {
    return this.ins.length === 0 ? this : this.ins[0].root()
  }

  pipe (next) {
    this.outs.push(next)
    next.ins.push(this)
    return next
  }

  print () {
    debug(this.name,
      this.pending.map(x => x.name),
      this.working.map(x => x.name),
      this.finished.map(x => x.name),
      this.failed.map(x => x.name),
      this.isStopped())
    this.outs.forEach(t => t.print())
  }

  schedule () {
    // stop working if blocked
    if (this.isBlocked()) return

    this.pending = this.ins.reduce((acc, t) => [...acc, ...t.pull()], this.pending)

    while (this.working.length < this.concurrency &amp;&amp; this.pending.length) {
      let x = this.pending.shift()
      this.working.push(x)
      this.transform(x, (err, y) => {
        this.working.splice(this.working.indexOf(x), 1)
        if (err) {
          x.error = err
          this.failed.push(x)
        } else {
          if (this.outs.length) {
            this.outs.forEach(t => t.push(y))
          } else {
            if (this.root().listenerCount('data')) {
              this.root().emit('data', y)
            } else {
              this.finished.push(y)
            }
          }
        }

        this.schedule()
        this.root().emit('step', this.name, x.name)
      })
    }
  }

}

module.exports = Transform" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>)
<span class="hljs-keyword">const</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'transform'</span>)

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Transform</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">EventEmitter</span> </span>{

  <span class="hljs-keyword">constructor</span> (options) {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.concurrency = <span class="hljs-number">1</span>

    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>, options)

    <span class="hljs-keyword">this</span>.pending = []
    <span class="hljs-keyword">this</span>.working = []
    <span class="hljs-keyword">this</span>.finished = []
    <span class="hljs-keyword">this</span>.failed = []

    <span class="hljs-keyword">this</span>.ins = []
    <span class="hljs-keyword">this</span>.outs = []
  }

  push (x) {
    <span class="hljs-keyword">this</span>.pending.push(x)
    <span class="hljs-keyword">this</span>.schedule()
  }

  pull () {
    <span class="hljs-keyword">let</span> xs = <span class="hljs-keyword">this</span>.finished
    <span class="hljs-keyword">this</span>.finished = []
    <span class="hljs-keyword">this</span>.schedule()
    <span class="hljs-keyword">return</span> xs
  }

  isBlocked () {
    <span class="hljs-keyword">return</span> !!<span class="hljs-keyword">this</span>.failed.length ||              <span class="hljs-comment">// blocked by failed</span>
      !!<span class="hljs-keyword">this</span>.finished.length ||                 <span class="hljs-comment">// blocked by output buffer (lazy)</span>
      <span class="hljs-keyword">this</span>.outs.some(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.isBlocked())        <span class="hljs-comment">// blocked by outputs transform</span>
  }

  isStopped () {
    <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.working.length &amp;&amp; <span class="hljs-keyword">this</span>.outs.every(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.isStopped())
  }

  root () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ins.length === <span class="hljs-number">0</span> ? <span class="hljs-keyword">this</span> : <span class="hljs-keyword">this</span>.ins[<span class="hljs-number">0</span>].root()
  }

  pipe (next) {
    <span class="hljs-keyword">this</span>.outs.push(next)
    next.ins.push(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">return</span> next
  }

  print () {
    debug(<span class="hljs-keyword">this</span>.name,
      <span class="hljs-keyword">this</span>.pending.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.name),
      <span class="hljs-keyword">this</span>.working.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.name),
      <span class="hljs-keyword">this</span>.finished.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.name),
      <span class="hljs-keyword">this</span>.failed.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.name),
      <span class="hljs-keyword">this</span>.isStopped())
    <span class="hljs-keyword">this</span>.outs.forEach(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.print())
  }

  schedule () {
    <span class="hljs-comment">// stop working if blocked</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isBlocked()) <span class="hljs-keyword">return</span>

    <span class="hljs-keyword">this</span>.pending = <span class="hljs-keyword">this</span>.ins.reduce(<span class="hljs-function">(<span class="hljs-params">acc, t</span>) =&gt;</span> [...acc, ...t.pull()], <span class="hljs-keyword">this</span>.pending)

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">this</span>.working.length &lt; <span class="hljs-keyword">this</span>.concurrency &amp;&amp; <span class="hljs-keyword">this</span>.pending.length) {
      <span class="hljs-keyword">let</span> x = <span class="hljs-keyword">this</span>.pending.shift()
      <span class="hljs-keyword">this</span>.working.push(x)
      <span class="hljs-keyword">this</span>.transform(x, (err, y) =&gt; {
        <span class="hljs-keyword">this</span>.working.splice(<span class="hljs-keyword">this</span>.working.indexOf(x), <span class="hljs-number">1</span>)
        <span class="hljs-keyword">if</span> (err) {
          x.error = err
          <span class="hljs-keyword">this</span>.failed.push(x)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.outs.length) {
            <span class="hljs-keyword">this</span>.outs.forEach(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.push(y))
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.root().listenerCount(<span class="hljs-string">'data'</span>)) {
              <span class="hljs-keyword">this</span>.root().emit(<span class="hljs-string">'data'</span>, y)
            } <span class="hljs-keyword">else</span> {
              <span class="hljs-keyword">this</span>.finished.push(y)
            }
          }
        }

        <span class="hljs-keyword">this</span>.schedule()
        <span class="hljs-keyword">this</span>.root().emit(<span class="hljs-string">'step'</span>, <span class="hljs-keyword">this</span>.name, x.name)
      })
    }
  }

}

<span class="hljs-built_in">module</span>.exports = Transform</code></pre>
<p>这段代码目前还是雏形。</p>
<p><code>Transform</code>类的设计类似node里的<code>stream.Transform</code>，但是它的设计目的不是buffering或流性能，而是作为并发编程的基础模块。</p>
<p>如果你熟悉流式编程，<code>Transform</code>的设计就很容易理解；在内部，<code>Transform</code>维护四个队列：</p>
<ol>
<li><p><code>pending</code>是input buffer</p></li>
<li><p><code>working</code>是当前正在执行的任务</p></li>
<li><p><code>finished</code>是output buffer，它的目的不是为了buffer输出，而是在没有其他输出办法的时候作一下buffer。</p></li>
<li><p><code>failed</code>是失败的任务</p></li>
</ol>
<p><code>Transform</code>可以组合成DAG(Directed Acyclic Graph)使用，<code>ins</code>和<code>outs</code>用来存储前置和后置<code>Transform</code>的引用，<code>pipe</code>方法负责设置这种双向链接；最常见的情况是双向链表，即<code>ins</code>和<code>outs</code>都只有一个对象。但把他们设计成数组就可以允许fan-in, fan-out的结构。</p>
<p><code>push</code>和<code>pull</code>是write和read的等价物。</p>
<p><code>schedule</code>是核心函数，它的任务是填充<code>working</code>队列。在构造函数的参数里应该提供一个名字为<code>transform</code>的异步函数，<code>schedule</code>使用这个函数运行任务，在运行结束后，根据结果把任务推到<code>failed</code>队列、推到下一个<code>Transformer</code>、用root节点的emit输出、或者推到自己的<code>finished</code>队列里。</p>
<p><code>Transform</code>设计的核心思想，就是把并发任务的状态，不使用对象属性来编码，只使用队列位置来编码；任何一个子任务，在任何时刻，仅存在于一个<code>Transform</code>对象的某个队列中。换句话说，它等于把并发任务用资源来建模。如果你熟悉restful api对过程或状态的建模方式就很容易理解这一点。</p>
<blockquote><p>在<code>Transform</code>中，任何<code>transform</code>异步函数的返回，都是一个<code>step</code>；<code>step</code>是用<code>Transform</code>实现并发组合的最重要概念；</p></blockquote>
<p>每一次<code>transform</code>函数返回，都会发生改变自己的队列或向后续的<code>Transform</code>对象<code>push</code>任务的动作，这个<code>push</code>动作会触发后续<code>Transform</code>的<code>schedule</code>方法；<code>step</code>结束时自己的<code>schedule</code>方法也会被调用，它会重新填充任务。在这些动作结束后，所有<code>Transform</code>的队列变化，就是整个组合任务状态机的下一个状态。</p>
<p>这个状态是显式的，可以打印出来看，对debug非常有帮助；虽然异步i/o会让这种状态具有不确定性，但至少这里坚持了组合状态机模型在处理并发问题时的同步原则，每个<code>step</code>结束时整体做一次状态迁移，这个状态迁移可以良好定义和观察，这是Event模型下并发编程和Thread模型的重要区别。后者遇到并发逻辑引起的微妙错误时，很难捕捉现场分析，因为每一个Thread是黑盒。</p>
<p>从<code>transform</code>返回开始到<code>emit(step)</code>之间的一连串连锁动作都是中间过程，最终实现一次完整的状态迁移，<strong>这个过程必须是同步的</strong>。不应在这里出现异步、setImmediate或者process.nextTick等调用，这会带来额外的不确定因素和极难发现和修复的bug。</p>
<p>在前面很长一段时间的并发编程实践中，我指出过Promise的race/settle和错误处理逻辑在一些场景下的困难。Promise的过程逻辑不完备。我也花了很多力气试图在Process代数层面上把error, success, finish, race, settle, abort, pause, resume, 和他们的组合逻辑定义出来，但最终发现这很困难，因为实际编程中各种处理情况太多了。</p>
<p>所以在<code>Transform</code>的设计中，这些逻辑全部被抛弃了，因为事实上它们<strong>都不是真正的基础并发逻辑</strong>。</p>
<p><code>Transform</code>试图实现组合的基础并发逻辑只有一个：<code>stopped</code>。<code>stopped</code>的定义非常简单：在一次<code>step</code>结束时，所有的<code>Transform</code>的<code>working</code>队列为空，就是（整体的）<code>stopped</code>。这里要再次强调前述的<code>step</code>结束时同步方法的必要性，如果你在<code>schedule</code>里使用了异步方法调用，那么这个<code>stopped</code>的判断就可能是错的，因为<code>schedule</code>可能会在event loop里放置了一个马上就会产生新的<code>working</code>任务的动作，而<code>isStopped()</code>的判断就错了。</p>
<p><code>stopped</code>时，整体组合状态可能是success, error, paused, 等等，都不难判断，但目前代码尚未稳定，我不打算加入语法糖。</p>
<p>在blocking i/o和同步的编程模式下，因果链和代码书写形式是一致的，但是在异步编程下，因果是异步和并发的，你只能去改变因，然后去观察果，这是很多程序员不适应异步编程的根本原因，因为它要改变思维的习惯。</p>
<p>使用<code>Transform</code>来处理并发编程，仍然是在试图重建这个因果链，即使他们是并发的，但是我们要有一个办法把他们串起来；</p>
<p>前面说到的<code>isStopped()</code>是观察到的果，能够影响它的因，是<code>isBlocked()</code>函数，这个函数在<code>schedule</code>中被调用，如果估值为<code>true</code>，就会阻止<code>schedule</code>继续向<code>working</code>队列调度任务。</p>
<p>这里写的<code>isBlocked()</code>的代码实现只是一个例子；可以阻止<code>schedule</code>的原因可能有很多，比如出现错误，或者输出buffer满了，这些可以由实现者自己去定义。他们是policy，<code>isBlocked()</code>本身是mechanism。这个策略的粒度是每个<code>Transform</code>对象都可以有自己的策略。比如一个删除临时文件的操作，结果是无关痛痒的，那么它不该因为error就block。</p>
<p><code>isBlocked()</code>逻辑可以象示例代码里那样向下chain起来，即只要有后续任务block了，前置任务就该停下来；这在绝大多数情况下都是合理的逻辑。因为虽然我们写的是流式处理办法，但是我们不是在处理octet-stream，追求性能的buffering和flow control都没什么意义，如果前面任务在copy文件后面的任务要移动到目标文件夹，如果目标文件夹出了问题前面快速移动了大量文件最终也无法成功。</p>
<p>如果组合状态机停止了，向其中的任何一个<code>Transform</code>对象执行push或者pull操作都可以让整个状态机继续动起来。从root节点<code>push</code>是常见情况，从leaf节点<code>pull</code>也是，向中间节点<code>push</code>也是可能的；</p>
<p>资源建模的一个好处是你可以把状态呈现给用户，如果一个复制文件的任务因为文件名冲突而fail，你还可以让用户选择处理策略，例如覆盖或者重命名，在用户选择了操作之后，代码会从某个<code>Transform</code>对象的<code>failed</code>队列中取走一个对象，修改策略参数后重新push进去，那么这个状态机可以继续执行下去；这种可处理的错误不该成为block整个状态机工作（复制其他文件和文件夹）的原因，除非他们积累到可观的数量，在<code>Transform</code>模式下这些都非常容易实现，开发者可以很简单的编写<code>isBlocked()</code>的策略；</p>
<p>和node的stream一样，<code>Transform</code>是lazy的，纯粹的push machine可能会在中间节点buffer大量的任务，这对把任务作为流处理来说是不合适的；同时，Lazy对于停下来的组合状态机能继续run起来很重要，<code>pull</code>方法就是这个设计目的，它的<code>schedule</code>逻辑和<code>push</code>一样，只是方向相反；如果设置了Leaf节点会因为输出缓冲而block，它就可以block整个状态机（或者其中的一部分），这在某些情况下也是有用的功能，如果整个状态机的输出因为某种原因暂时无法被立刻消费掉。</p>
<p><code>abort</code>逻辑没有在代码中实现，但它很容易，可以遍历所有的<code>Transform</code>，如果<code>working</code>队列中的对象有<code>abort</code>方法，就调用它；这不是个立即的中止，该对象仍然要通过callback返回才能stop。如果要全局的block，可以把所有的Leaf Node都pipe到一个sink节点去，把这个sink节点强制设置成isBlocked，可以block全部。<code>pause</code>和<code>resume</code>也是非常类似的逻辑。</p>
<p>当然你可能会遇到类似finally的逻辑是必须去执行的，即使在发生错误的时候，它意味着这个<code>Transform</code>要向前传递<code>isBlocked</code>信息，但是它的Schedule方法不必停止工作。它可以一直运行到把所有队列任务都处理完为止。</p>
<p>重载<code>schedule</code>方法也是可能的；例如你的任务之间有前后依赖的逻辑，你就可以重载<code>schedule</code>方法实现自己的调度方式。另外这里的<code>schedule</code>代码只基于transform函数，很显然如果transform本身是一个<code>Transform</code>对象它也应该工作，实现组合过程，包括Sequencer，Parallel等等，这些都是需要实现的。</p>
<p>总而言之，<code>isBlocked</code>和<code>schedule</code>是分开的逻辑，它们有各自不同的设计目的和使命，你可以重载它们获得自己想要的结果。所以写在这里的代码，重要的不是他们的实现，而是其机制设计和界面设计，以及接口承诺；所有逻辑都是足够原子化的，每个函数只做一件事，<code>isBlocked</code>是因，可以根据需要选择策略，<code>isStopped</code>是果，通过step观察和实现后续逻辑。应该避免通过向基类添加新方法来扩展能力，因为<code>Transform</code>使用队列和任务描述状态，这个描述是完备的，机制也是完善的。</p>
<p>就像我在另一篇介绍JavaScript语言的文章里写的一样，如果针对问题的模型具有完备性，即使抽象，也可以通过组合基本操作和概念获得更多的特性，而不是在模型上增加概念，除非你认为模型不够完备。</p>
<hr>
<p>软件工程中不是什么地方都要上状态机（automaton）这么严格的模型工具，项目软件里写到bug数量足够低就可以了，但是如果你要写系统软件或者对正确性有苛刻要求的东西，如果你没有用状态机建模，那么实际上你没有完备设计。</p>
<p>当然有了完备设计也不意味着软件没bug了，但一个好的设计可以让你对问题的理解、遇到问题时找到原因，有极大的帮助。</p>
<p>在复杂系统中，上述的同步方法状态机组合，和Hierarchical的状态机组合，是我们目前已知的两种具有完备性的模型方法。但是两者不同。虽然<code>Transform</code>的组合看起来是一个Hierarchy，但是它就像你在纸上画一棵树，它仍然是二维的，每个<code>step</code>的整体状态联动的迁移只是在populate一次状态迁移的范围，并不是几何级数的增加状态组合；所以我们仍然可以构筑一个线性的因果链，每个<code>step</code>因果因果这样的继续下去，和没有并发的状态机是一样。</p>
<p>本质上这是数学归纳法：如果我们能证明如果n正确，那么n+1是正确的，这就可以证明chain下去的状态组合即使是无穷也是正确的。</p>
<hr>
<p>第二段代码是使用的一个示例，这个class没有必要，是为了保证和老代码接口兼容，因为有一些项目内其他代码的依赖性就不解释了，很容易看明白大概逻辑；列在这里只是展示一下<code>Transform</code>使用时pipe过程的代码样子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
const EventEmitter = require('events')
const debug = require('debug')('dircopy')
const rimraf = require('rimraf')

const Transform = require('../lib/transform')
const { forceXstat } = require('../lib/xstat')
const fileCopy = require('./filecopy')

class DirCopy extends EventEmitter {

  constructor (src, tmp, files, getDirPath) {
    super()

    let dst = getDirPath()
    let pipe = new Transform({
      name: 'copy',
      concurrency: 4,
      transform: (x, callback) =>
        (x.abort = fileCopy(path.join(src, x.name), path.join(tmp, x.name),
          (err, fingerprint) => {
            delete x.abort
            if (err) {
              callback(err)
            } else {
              callback(null, (x.fingerprint = fingerprint, x))
            }
          }))
    }).pipe(new Transform({
      name: 'stamp',
      transform: (x, callback) =>
        forceXstat(path.join(tmp, x.name), { hash: x.fingerprint },
          (err, xstat) => err
            ? callback(err)
            : callback(null, (x.uuid = xstat.uuid, x)))
    })).pipe(new Transform({
      name: 'move',
      transform: (x, callback) =>
        fs.link(path.join(tmp, x.name), path.join(dst, x.name), err => err
          ? callback(err)
          : callback(null, x))
    })).pipe(new Transform({
      name: 'remove',
      transform: (x, callback) => rimraf(path.join(tmp, x.name), () => callback(null))
    })).root()

    let count = 0

    // drain data
    pipe.on('data', data => this.emit('data', data))
    pipe.on('step', (tname, xname) => {
      debug('------------------------------------------')
      debug(`step ${count++}`, tname, xname)
      pipe.print()
      if (pipe.isStopped()) this.emit('stopped')
    })

    files.forEach(name => pipe.push({ name }))
    pipe.print()
    this.pipe = pipe
  }

}

module.exports = DirCopy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bluebird'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">Promise</span>.promisifyAll(<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>))
<span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>)
<span class="hljs-keyword">const</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'debug'</span>)(<span class="hljs-string">'dircopy'</span>)
<span class="hljs-keyword">const</span> rimraf = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)

<span class="hljs-keyword">const</span> Transform = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/transform'</span>)
<span class="hljs-keyword">const</span> { forceXstat } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/xstat'</span>)
<span class="hljs-keyword">const</span> fileCopy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./filecopy'</span>)

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DirCopy</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">EventEmitter</span> </span>{

  <span class="hljs-keyword">constructor</span> (src, tmp, files, getDirPath) {
    <span class="hljs-keyword">super</span>()

    <span class="hljs-keyword">let</span> dst = getDirPath()
    <span class="hljs-keyword">let</span> pipe = <span class="hljs-keyword">new</span> Transform({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'copy'</span>,
      <span class="hljs-attr">concurrency</span>: <span class="hljs-number">4</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-function">(<span class="hljs-params">x, callback</span>) =&gt;</span>
        (x.abort = fileCopy(path.join(src, x.name), path.join(tmp, x.name),
          (err, fingerprint) =&gt; {
            <span class="hljs-keyword">delete</span> x.abort
            <span class="hljs-keyword">if</span> (err) {
              callback(err)
            } <span class="hljs-keyword">else</span> {
              callback(<span class="hljs-literal">null</span>, (x.fingerprint = fingerprint, x))
            }
          }))
    }).pipe(<span class="hljs-keyword">new</span> Transform({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'stamp'</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-function">(<span class="hljs-params">x, callback</span>) =&gt;</span>
        forceXstat(path.join(tmp, x.name), { <span class="hljs-attr">hash</span>: x.fingerprint },
          (err, xstat) =&gt; err
            ? callback(err)
            : callback(<span class="hljs-literal">null</span>, (x.uuid = xstat.uuid, x)))
    })).pipe(<span class="hljs-keyword">new</span> Transform({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'move'</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-function">(<span class="hljs-params">x, callback</span>) =&gt;</span>
        fs.link(path.join(tmp, x.name), path.join(dst, x.name), err =&gt; err
          ? callback(err)
          : callback(<span class="hljs-literal">null</span>, x))
    })).pipe(<span class="hljs-keyword">new</span> Transform({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'remove'</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-function">(<span class="hljs-params">x, callback</span>) =&gt;</span> rimraf(path.join(tmp, x.name), () =&gt; callback(<span class="hljs-literal">null</span>))
    })).root()

    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>

    <span class="hljs-comment">// drain data</span>
    pipe.on(<span class="hljs-string">'data'</span>, data =&gt; <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'data'</span>, data))
    pipe.on(<span class="hljs-string">'step'</span>, (tname, xname) =&gt; {
      debug(<span class="hljs-string">'------------------------------------------'</span>)
      debug(<span class="hljs-string">`step <span class="hljs-subst">${count++}</span>`</span>, tname, xname)
      pipe.print()
      <span class="hljs-keyword">if</span> (pipe.isStopped()) <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'stopped'</span>)
    })

    files.forEach(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> pipe.push({ name }))
    pipe.print()
    <span class="hljs-keyword">this</span>.pipe = pipe
  }

}

<span class="hljs-built_in">module</span>.exports = DirCopy</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
白洁血战Node并发编程 - 预览

## 原文链接
[https://segmentfault.com/a/1190000010582383](https://segmentfault.com/a/1190000010582383)


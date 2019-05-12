---
title: '白洁血战Node.js并发编程 01 状态机' 
date: 2019-01-01 2:30:07
hidden: true
slug: f9s6dvrscro
categories: [reprint]
---

{{< raw >}}

                    
<p>这一篇是这个系列的开篇，没有任何高级内容，就讲讲状态机。</p>
<h1 id="articleHeader0">状态机</h1>
<p>状态机是模型层面的概念，与编程语言无关。它的目的是为对象行为建模，属于设计范畴。它的基础概念是状态（state）和事件（event）。</p>
<p>对象的内部结构描述为一组状态S1, S2, ... Sn，它的行为的trigger，包括内部的和外部的，描述成为一组事件E1, E2, ... En，在任何状态下，任何事件到来，对象状态的改变用Sx -&gt; Sy的状态迁移（State Transition）来描述，这个状态迁移就是对象的行为（behavior）。</p>
<p>对对象行为的完备定义就是{ S } x { E }的矩阵，如果存在(Sx, Ey)的组合未定义行为，这个对象行为模型在设计层面上就不完备，当然实际的代码不可能没有行为，这往往就是错误发生的地方。</p>
<p>状态机具有良好的可实现性和可测试性。完备定义的状态机很容易写出对应的代码，也很容易遍历全部的状态迁移过程完成测试，当然这只意味着代码实现和设计（模型）相符，并不意味着设计是正确的。</p>
<blockquote><p>设计的正确性是一个复杂的多的话题，严格的定义是设计符合Specification。什么是符合Specification？要去看Robin Milner, Tony Hoare, Leslie Lamport等人的书了，老实说我也不懂，所以就此打住。</p></blockquote>
<p>这篇文章不会详细介绍状态机，网上有非常多的资料，四人帮的书上有State Pattern - OO语言下的状态机实现，UML有State Diagram，是非常好的图示工具；这里只给出一个代码例子，对照这个实例帮助理解状态机模型的代码实现。</p>
<h1 id="articleHeader1">一个例子</h1>
<p>假定我们要解决这样一个任务：我们有一个模块是为了存储（save）一个文件，写状态机的目的是为了解决并发操作时排队存储的请求，因为请求是并发的，如果写入文件的io操作也是并发的话，这个文件可能被损坏。这是一个非常常见的应用场景。</p>
<p>这个模块定义有三种状态：</p>
<ul>
<li><p><code>Idle</code>， 这是不工作的状态；</p></li>
<li><p><code>Pending</code>，这是等待工作的状态，等待的目的是为了，如果在很短的时间内出现连续多次的写入请求，我们只写入最后一个，减少io操作的次数；</p></li>
<li><p><code>Working</code>，该状态下在执行写入操作，如果在执行io操作的时候收到写入请求，我们把请求内容保存在一个临时的位置；</p></li>
</ul>
<p><code>Idle</code>状态没有任何特殊资源，只有一个save请求事件；当有save请求时，它迁移到<code>Pending</code>状态。</p>
<p><code>Pending</code>状态具有的特殊资源是一个timer，它可能有两个事件：来自外部的save请求，和来自内部的timeout。在JavaScript代码里，这是一个callback，但是我们在状态机模型中要把他理解为事件。在<code>Pending</code>状态中如果有save请求，不发生状态迁移，新的请求数据会覆盖旧的版本，原来的timer会被清除，重新开始新的timer。在timeout发生时，迁移到<code>Working</code>状态。</p>
<p><code>Working</code>状态在进入时会启动存储文件的操作，它可能有两个事件：来自外部的save请求，和来自内部的保存文件操作的异步返回，同样的，它也被理解为一个（内部）事件。当外部的save请求到来时，该请求被保存在内部的<code>next</code>变量里；当文件操作返回时：</p>
<ul>
<li>
<p>如果操作成功</p>
<ul>
<li><p>如果存在<code>next</code>，向<code>Pending</code>状态迁移</p></li>
<li><p>如果不存在<code>next</code>，向<code>Idle</code>状态迁移</p></li>
</ul>
</li>
<li>
<p>如果操作失败</p>
<ul>
<li><p>如果存在<code>next</code>，向<code>Pending</code>状态迁移，用<code>next</code>作为数据</p></li>
<li><p>如果不存在<code>next</code>，也向<code>Pending</code>状态迁移，仍然使用当前数据，相当于等待后retry</p></li>
</ul>
</li>
</ul>
<p>我偷个懒，没给出图示，实际上这样的语言描述不如State Diagram来得直观。下面的表格是上述语言描述的归纳，史称状态迁移表（State Transition Table），有了State Diagram或者State Transition Table，任何人写出来的代码都一样。为了表述清晰，表中把<code>Working</code>状态的文件操作返回分成了两个事件：success和error。</p>
<table>
<thead><tr>
<th>StateEvent</th>
<th>Save</th>
<th>Timeout</th>
<th>Success</th>
<th>Error</th>
</tr></thead>
<tbody>
<tr>
<td>Idle</td>
<td>-&gt; Pending</td>
<td>n/a</td>
<td>n/a</td>
<td>n/a</td>
</tr>
<tr>
<td>Pending</td>
<td>overwrite data, restart timer</td>
<td>-&gt; Working</td>
<td>n/a</td>
<td>n/a</td>
</tr>
<tr>
<td>Working</td>
<td>set next</td>
<td>n/a</td>
<td>if next, -&gt; Pending; else -&gt; Idle</td>
<td>-&gt; Pending(next ? next : data)</td>
</tr>
</tbody>
</table>
<h1 id="articleHeader2">代码</h1>
<p>下面是代码，首先有个base class，三个状态都继承自这个base class：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class State {

  constructor(ctx) {
    this.ctx = ctx
  }

  setState(nextState, ...args) {
    this.exit()
    this.ctx.state = new nextState(this.ctx, ...args)
  }

  exit() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">State</span> </span>{

  <span class="hljs-keyword">constructor</span>(ctx) {
    <span class="hljs-keyword">this</span>.ctx = ctx
  }

  setState(nextState, ...args) {
    <span class="hljs-keyword">this</span>.exit()
    <span class="hljs-keyword">this</span>.ctx.state = <span class="hljs-keyword">new</span> nextState(<span class="hljs-keyword">this</span>.ctx, ...args)
  }

  exit() {}
}</code></pre>
<p>在状态机的代码实现上，标志性的方法名称是<code>setState</code>，它负责状态迁移；其次是<code>enter</code>和<code>exit</code>，分别对应进入该状态和离开该状态。</p>
<p>状态机模式（State Pattern）的一个显著的编程收益是：每个状态都有自己的资源，在迁入该状态的时候建立资源，在离开该状态的时候释放资源，这很容易保证资源的正确使用。</p>
<p>在上述代码中，<code>constructor</code>充当了<code>enter</code>逻辑的角色，所以没有提供独立的<code>enter</code>方法；JavaScript Class是一个语法糖，没有和constructor相对应的destructor，所以我们这里写一个<code>exit</code>函数，如果继承类里没有<code>exit</code>逻辑，这个基类上的方法就是一个fallback。</p>
<p><code>ctx</code>是一个外部容器，相当于所有状态对象的上下文（context），它同时具有一个叫做<code>state</code>的成员，该成员是一个<code>Idle</code>，<code>Pending</code>，或者<code>Working</code>类的实例；无论<code>ctx.state</code>是哪个状态，<code>ctx</code>都把<code>save</code>方法forward到<code>state</code>上，这样写是一个很标准的State Pattern。</p>
<p><code>setState</code>的实现有点tricky，是JavaScript的特色。它首先调用当前类的<code>exit</code>函数迁出状态，然后使用new来构造下一个类，这意味着第一个参数<code>nextState</code>是一个构造函数；后面的参数使用了spread operator，把这些参数传入了构造函数，同时把新对象安装到了<code>ctx</code>，即把自己替换了；这不是唯一的做法，是比较简洁的一种写法。</p>
<p><code>Idle</code>类的实现非常简单，在save的时候用data作为参数构造了<code>Pending</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Idle extends State{

  save(data) {
    this.setState(Pending, data)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Idle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State</span></span>{

  save(data) {
    <span class="hljs-keyword">this</span>.setState(Pending, data)
  }
}</code></pre>
<p><code>Pending</code>类的<code>save</code>方法里保存了<code>data</code>和启动timer。它的构造函数重用了<code>save</code>方法。因为JavaScript的clearTimeout方法是安全的，这样写没什么问题。</p>
<p><code>exit</code>函数实际上没有必要，但这样书写是推荐的，它确保资源清理，如果未来设计变更出现其他的状态迁出逻辑，这个代码就有用了。</p>
<p>timeout时<code>Pending</code>向<code>Working</code>状态迁移。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Pending extends State {

  constructor(ctx, data) {
    super(ctx)
    this.save(data)
  }

  save(data) {
    clearTimeout(this.timer)
    this.data = data 
    this.timer = setTimeout(() => {
      this.setState(Working, this.data) 
    }, this.ctx.delay)
  }

  exit() {
    clearTimeout(this.timer)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Pending</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State</span> </span>{

  <span class="hljs-keyword">constructor</span>(ctx, data) {
    <span class="hljs-keyword">super</span>(ctx)
    <span class="hljs-keyword">this</span>.save(data)
  }

  save(data) {
    clearTimeout(<span class="hljs-keyword">this</span>.timer)
    <span class="hljs-keyword">this</span>.data = data 
    <span class="hljs-keyword">this</span>.timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.setState(Working, <span class="hljs-keyword">this</span>.data) 
    }, <span class="hljs-keyword">this</span>.ctx.delay)
  }

  exit() {
    clearTimeout(<span class="hljs-keyword">this</span>.timer)
  }
}</code></pre>
<p><code>Working</code>代码稍微多点，但是对照状态迁移表很容易读懂。不赘述每个方法了。保存文件的操作采用了先写入临时文件然后重命名的做法，这是保证文件完整性的常规做法，系统即使断电也不会损坏磁盘文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Working extends State {

  constructor(ctx, data) { 
    super(ctx)
    this.data = data 

    // console.log('start saving data', data)
    let tmpfile = path.join(this.ctx.tmpdir, UUID.v4())
    fs.writeFile(tmpfile, JSON.stringify(this.data), err => {

      if (err) return this.error(err)
      fs.rename(tmpfile, this.ctx.target, err => {

        // console.log('finished saving data', data, err)
        if (err) return this.error(err)
        this.success()
      }) 
    })
  } 

  error(e) {
    // console.log('error writing persistent file', e)
    if (this.next)    
      this.setState(Pending, this.next)
    else
      this.setState(Pending, this.data)
  }

  success() {
    if (this.next)
      this.setState(Pending, this.next)
    else 
      this.setState(Idle)
  }

  save(data) {
    // console.log('Working save', data)
    this.next = data
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Working</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State</span> </span>{

  <span class="hljs-keyword">constructor</span>(ctx, data) { 
    <span class="hljs-keyword">super</span>(ctx)
    <span class="hljs-keyword">this</span>.data = data 

    <span class="hljs-comment">// console.log('start saving data', data)</span>
    <span class="hljs-keyword">let</span> tmpfile = path.join(<span class="hljs-keyword">this</span>.ctx.tmpdir, UUID.v4())
    fs.writeFile(tmpfile, <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.data), err =&gt; {

      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.error(err)
      fs.rename(tmpfile, <span class="hljs-keyword">this</span>.ctx.target, err =&gt; {

        <span class="hljs-comment">// console.log('finished saving data', data, err)</span>
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.error(err)
        <span class="hljs-keyword">this</span>.success()
      }) 
    })
  } 

  error(e) {
    <span class="hljs-comment">// console.log('error writing persistent file', e)</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.next)    
      <span class="hljs-keyword">this</span>.setState(Pending, <span class="hljs-keyword">this</span>.next)
    <span class="hljs-keyword">else</span>
      <span class="hljs-keyword">this</span>.setState(Pending, <span class="hljs-keyword">this</span>.data)
  }

  success() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.next)
      <span class="hljs-keyword">this</span>.setState(Pending, <span class="hljs-keyword">this</span>.next)
    <span class="hljs-keyword">else</span> 
      <span class="hljs-keyword">this</span>.setState(Idle)
  }

  save(data) {
    <span class="hljs-comment">// console.log('Working save', data)</span>
    <span class="hljs-keyword">this</span>.next = data
  }
}</code></pre>
<p>最后是<code>ctx</code>，我们在实际项目中称之为<code>Persistence</code>。它初始化时设置state为<code>Idle</code>状态；把所有的save操作都forward到内部对象<code>state</code>上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Persistence {

  constructor(target, tmpdir, delay) {
    this.target = target 
    this.tmpdir = tmpdir
    this.delay = delay || 500
    this.state = new Idle(this) 
  }

  save(data) {
    this.state.save(data)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Persistence</span> </span>{

  <span class="hljs-keyword">constructor</span>(target, tmpdir, delay) {
    <span class="hljs-keyword">this</span>.target = target 
    <span class="hljs-keyword">this</span>.tmpdir = tmpdir
    <span class="hljs-keyword">this</span>.delay = delay || <span class="hljs-number">500</span>
    <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">new</span> Idle(<span class="hljs-keyword">this</span>) 
  }

  save(data) {
    <span class="hljs-keyword">this</span>.state.save(data)
  }
}</code></pre>
<h1 id="articleHeader3">要点</h1>
<p>这一篇粗略的讲了两个问题：状态机模型和状态机模式（State Pattern）。他们两个不是一回事。</p>
<p>状态机模式是一种写法，上述写法不唯一；不使用Class，仅仅在<code>Persistence</code>类中使用（枚举）变量表示状态也是可以的，使用Class则相当于用变量类型来代表状态。</p>
<p>状态机模式的显著优点在于：</p>
<ul>
<li><p>不同状态的资源和行为逻辑分开</p></li>
<li><p>在<code>setState</code>, <code>enter</code>, <code>exit</code>等标志性方法中不需要使用if / then或switch语句</p></li>
<li><p>在对象行为定义发生变化时，修改容易，不易犯错误；感谢enter和exit的封装，它强制了资源回收逻辑</p></li>
</ul>
<p>状态机模型的意义对后面的内容更为重要。上面的例子具有这样几个特征：</p>
<ol>
<li><p>状态具有显式定义</p></li>
<li>
<p>事件内外有别</p>
<ol>
<li><p>外部事件对所有状态成立，因此<code>Persistence</code>类的使用非常简单，从外部其实看不到内部有什么状态定义，黑盒意义上说，<code>Persistence</code>是无态的，这对使用便利性来说极为重要；</p></li>
<li><p>内部事件仅仅对某些状态成立，所有异步函数的返回都理解为事件，而且是唯一的内部事件；</p></li>
</ol>
</li>
<li><p>从并发角度说，<code>Persistence</code>类是一个同步器（Synchronizer），即并发的save操作在这里被排序执行了；当然我们没有设计更复杂的逻辑，例如任务队列，但显然那不是很难；</p></li>
</ol>
<h1 id="articleHeader4">问题</h1>
<p>纯粹的状态机（automata）对于并发编程是无力的，这是一种共识，因为并发带来的状态组合会迅速爆炸状态空间，我们要找到办法对付这个问题，此其一。</p>
<p>其二，实际的程序模块组合时常见包含关系，用经典的状态机模型会产生组合状态机（Hierarchical State Machine），它的代码书写远比上述例子的Flat State Machine难写，除非在语言一级或者有类库支持，否则可读性和可维护性都很差，设计变更时代码改动幅度非常大，不是解决常见问题的好办法，虽然在一些特殊应用领域卓有建树，例如嵌入式设备的通讯协议栈。</p>
<p>事件(Event)和线程(Thread)是形式上对立，但是数学上对等，的两个编程方式。两者各有利弊，战争也是古老的，你在网络上很容易搜索到Why Event (Model) is Evil或者Why Thread (Model) is Evil的学术文章，都有大量的支持者。</p>
<p>Node.js的与众不同之处在于它的强制non-blocking i/o设计。这给习惯Thread编程的开发者制造了麻烦，所以在过去的几年里新的过程原语被发明出来解决这个问题，包括promise，generator，async/await。bluebird的使用者越来越多，而caolan的曾经很流行的async库用户越来越少。</p>
<p>但是众所周知JavaScript语言是事件模型的。在基础特性上寻求类thread编程形式去解决一切问题本身就是表里不一的，而且promise和async/await的实现本身也有很多不尽人意的地方。</p>
<p>这让我们倒回来思考两个问题：</p>
<ol>
<li><p>寻求各种CPS（Continuation Passing Style）是解决non-blocking i/o的必经之路吗？</p></li>
<li><p>事件和状态机模型真的没有办法写规模化的并发程序吗？</p></li>
</ol>
<blockquote><p>Node原作者Ryan Dahl最近在一次访谈里说了他对Node的看法。他说在最初的两三年中他是狂热的支持Node的强制non-blocking i/o设计的，达到那种认为“原来我们都做错了”的程度，但是慢慢的他的态度发生了转变，尤其是在接触了Go语言之后；现在他的看法是，最初他以为Node可以做到是end-all或者for-all的，但是现在他没那么有信心了，在并发编程上他认为Go可能是更好的设计。</p></blockquote>
<p>我的个人观点，谈Node必谈callback hell的开发者，并不熟悉在Event Model下的并发编程技术，promise和async/await本质上，绝大多数情况下是在serialize过程，如果只是serialize，那么结果和blocking i/o的编程并不会有区别。Promise对parallel的支持很有限，它只是在serial的过程序列上偶尔撒一点parallel的flavor。而且如果你喜欢的就是Thread Model，那么就应该选择对它有良好支持的编程语言或环境，例如Go或者fibjs。</p>
<p>如果你像我一样，喜欢JavaScript语言的简单，喜欢Event Model的简单，而不只是因为Node有良好的生态圈和海量的npm包可用而选择了Node——如果你只是因为这两点选择了Node，你肯定会后悔的——那么摆在我们面前的问题就是：事件模型，显式状态，non-blocking i/o，我们能不能找到一种办法，一种<strong>end-all</strong>和<strong>for-all</strong>的办法，最好能够直接体现在代码形式上，或者至少体现在一个简单、直觉、不易错、同时保持经典状态机模型的完备性的Mental Model上，能够为复杂的并发编程问题建模和书写代码？</p>
<p>在这里经典状态机模式可以给我们一个简单启迪：我们不仅可以用<strong>值</strong>来表示状态，我们也可以用<strong>对象类型</strong>表示状态，而且有明显的收益。同样的，在事件模型下解决并发问题的关键，就是把这个设计继续向前推进一步，我们还可以用<strong>结构</strong>来表示状态。具体怎么写和怎么思考建模，则是这个系列文章的主旨。</p>
<p>这在数学层面上非常容易理解：所谓并发编程，它<strong>就是在structure过程</strong>（Rob Pike）。函数或者类函数，包括promise，async function，generator，coroutine，他们是Thread Model下的（黑盒）原语和原语组合，对应的，我们要找到事件模型下的显式状态方法来应对这个问题，如果能做到这一点，我们就可以回到纯粹的事件模型下编写程序。</p>
<p>这个结果并不难，但是，它也确实有一段路要走，我们需要仔细梳理过程原语的优点缺点，梳理并发编程的本质，梳理常见问题的各种编程方式，最后回到我们的事件模型和状态机上来。等这个系列写完，你也读完，我向你保证，你再次看到callback函数时会觉得原来它那么简单且美。</p>
<p>下一篇我们开始谈并发编程，敬请期待。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
白洁血战Node.js并发编程 01 状态机

## 原文链接
[https://segmentfault.com/a/1190000011086405](https://segmentfault.com/a/1190000011086405)


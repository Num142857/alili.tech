---
title: 'React Component里的状态机Pattern' 
date: 2019-01-29 2:30:10
hidden: true
slug: mn938vwhal
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">State Machine in React Component</h2>
<p>React的工程实践中大多数团队都只关注了state该怎么存放的问题，没有意识到真正导致问题复杂的是组合状态机，后面这句话对于UI而言是放之四海皆准的；</p>
<p>一个React Component对象作为UI层元素，在很多情况下我们并不希望在状态迁移时创建新的实例替代旧的，这直接意味着UI组件和状态机之间是binding关系而不是composition，所以React提供了一个this.state用于解耦，这是它很聪明的一个设计；但是这个this.state只有值成员，没有方法成员；这意味着写在Component上的方法里面要switch/case状态，这非常不方便。</p>
<p>其次React Component的setState方法是merge逻辑而不是replace逻辑，它意味着state下一级props之间必须是平行子状态机而不是单一状态机互斥状态（除非你只有一个状态机，其他状态用值表示）；或者换句话说，如果你把不同的互斥状态下的资源和值都放在一个篮子里时，你每次自己去手动倒空旧的，这一点是个坑。</p>
<p>第三，那些early binding语言的状态机Pattern在js和immutable要求下并不适用，他们都是内部值状态的迁移而不是对象本身被替代，而对象本身被替代这个问题制造了一个问题，就是该对象的方法并不能用于UI的行为binding，因为状态迁移后这个旧状态机对象就废弃了，调用它的行为方法当然是不对的；</p>
<p>解决这个问题并不难，行为binding使用Component对象上的方法，它是稳定的，不会因为model的状态机更迭而变化，但它是一个proxy，需要把方法分发到子状态机上；这样我们就得到了状态机Pattern的最大优势：每个状态只关注属于自己的子状态，值，资源，和行为，不用在所有行为处理上都狂写switch/case。</p>
<p>熟悉状态机Pattern的开发者不难想像出满足上述要求的代码结构；Component是稳定的，它即使一个子状态机的容器，又是一个行为的Proxy层，向this.state下的子状态机（例如命名为this.state.stm1）分发行为；逻辑上是下图所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React Component

  this.state {
    stm1: // --------------------------------> stm1对象
  }

  this.handleToggleButton() {
    this.state.stm1.handleToggleButton() // -> stm1.handleToggleButton()
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React Component

  <span class="hljs-keyword">this</span>.state {
    <span class="hljs-attr">stm1</span>: <span class="hljs-comment">// --------------------------------&gt; stm1对象</span>
  }

  <span class="hljs-keyword">this</span>.handleToggleButton() {
    <span class="hljs-keyword">this</span>.state.stm1.handleToggleButton() <span class="hljs-comment">// -&gt; stm1.handleToggleButton()</span>
  }</code></pre>
<p>同时分发的行为必须返回一个新的状态机对象用于替代旧的，它可能导致一次状态迁移，例如方法调用之前this.state.stm1是一个ListViewState对象，而调用后变成了ListEditState对象；如果是这样，上述行为方法得加一个逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.handleToggleButton() {
    let newStm1 = this.state.stm1.handleToggleButton()
    if (newStm1)
      this.setState({ stm1: newStm1 })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">this</span>.handleToggleButton() {
    <span class="hljs-keyword">let</span> newStm1 = <span class="hljs-keyword">this</span>.state.stm1.handleToggleButton()
    <span class="hljs-keyword">if</span> (newStm1)
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">stm1</span>: newStm1 })
  }</code></pre>
<p>这个逻辑会反复使用，我们不妨把它抽象出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.dispatch = (name, method, ...args) => {
    if (this.state[name] &amp;&amp;
      typeof this.state[name] === 'object' &amp;&amp;
      typeof this.state[name][method] === 'function') {
      let next = this.state[name][method](...args)
      if (next) {
        let obj = {}
        obj[name] = next
        this.setState(obj)
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">this</span>.dispatch = <span class="hljs-function">(<span class="hljs-params">name, method, ...args</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state[name] &amp;&amp;
      <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.state[name] === <span class="hljs-string">'object'</span> &amp;&amp;
      <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.state[name][method] === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">let</span> next = <span class="hljs-keyword">this</span>.state[name][method](...args)
      <span class="hljs-keyword">if</span> (next) {
        <span class="hljs-keyword">let</span> obj = {}
        obj[name] = next
        <span class="hljs-keyword">this</span>.setState(obj)
      }
    }
  }</code></pre>
<p>这样在控件的JSX代码中使用时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  onToggle={e => this.dispatch('stm1', 'handleToggleButton')}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  onToggle={e =&gt; <span class="hljs-keyword">this</span>.dispatch(<span class="hljs-string">'stm1'</span>, <span class="hljs-string">'handleToggleButton'</span>)}</code></pre>
<p>这不是唯一的写法，也许你不喜欢这样把所有的fallback都处理掉连错误通知也没有；你可以自己添加，写成自己喜欢的方式。</p>
<h2 id="articleHeader1">Immutable State Machine in JavaScript</h2>
<p>剩下的问题回到如何在JS下书写一个immutable的状态机问题，基于Class仍然是直觉的方式，不同之处在于状态迁移时是用旧的Class对象作为参数传递给新的Class对象，新对象的构造函数第一件事情是复制旧对象的全部自有属性，这个行为可以写在原型类的构造函数里。</p>
<p>较为简洁的写法是状态机自己实现一个setState方法（setState是状态机Pattern的iconic方法，其次才是entry/exit）；该方法只是用于状态机自己的状态迁移，和它的容器对象（React Component对象）上的setState方法无关；不要搞混了。（当然你应该想想为什么React Component上有这个状态机Pattern里的标志性方法）</p>
<p>简明实现的关键点是setState接受两个参数，第一个是下一状态的Class名（即构造函数），第二个是...args用于传参；所有子状态机的constructor都是(obj, ...args)的形式，obj是上一状态机；这样写可以避免实现setState时写switch/case。</p>
<p>它的简单实现可以是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState(NextState, ...args) {
  // 当前状态机迁出
  this.exit()
  // 构造新对象，immutable，同时下一状态机迁入，
  return new NextState(this, ...args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setState(NextState, ...args) {
  <span class="hljs-comment">// 当前状态机迁出</span>
  <span class="hljs-keyword">this</span>.exit()
  <span class="hljs-comment">// 构造新对象，immutable，同时下一状态机迁入，</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> NextState(<span class="hljs-keyword">this</span>, ...args)
}</code></pre>
<p>原型类的构造函数可以看起来这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(obj) {
  Object.assign(this, obj)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span>(obj) {
  <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>, obj)
}</code></pre>
<p>用于复制上一状态的所有属性。</p>
<p>最后这个状态机的基类需要一个exit方法，如果子类不需要实现，这是个fallback。</p>
<p>综上所述这个基类看起来大概是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class STM {

  constructor(obj) {
    Object.assign(this, obj)
  }

  setState(NextState, ...args) {
    this.exit()
    return new NextState(this, ...args)
  }

  exit() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">STM</span> </span>{

  <span class="hljs-keyword">constructor</span>(obj) {
    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>, obj)
  }

  setState(NextState, ...args) {
    <span class="hljs-keyword">this</span>.exit()
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> NextState(<span class="hljs-keyword">this</span>, ...args)
  }

  exit() {}
}</code></pre>
<p>在实际使用的时候你可能需要自己的基类，因为</p>
<ul>
<li><p>你需要一些context，对所有状态都需要的值、属性、资源等</p></li>
<li><p>你需要一些共同的方法，如果对某个行为的处理大部分状态都是一样的，那么可以写在这个原型类里，具体某个状态的行为不同，它可以去重载；所以一个真正的原型类和继承类可能是这样的：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MySTM extends STM {

  constructor(obj) {
    super(obj)
  }

  this.handleToggleButton = () => {
    // ...
  }
}

class MySTMInitState extends MySTM {
  // ...
}

class MySTMAnotherState extends MySTM {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MySTM</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">STM</span> </span>{

  <span class="hljs-keyword">constructor</span>(obj) {
    <span class="hljs-keyword">super</span>(obj)
  }

  <span class="hljs-keyword">this</span>.handleToggleButton = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MySTMInitState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">MySTM</span> </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MySTMAnotherState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">MySTM</span> </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>需要注意的是不要在<code>MySTM</code>的构造函数里写其他逻辑，如果有其他逻辑，写在React Component的constructor里，相当于是这个状态机原型对象的工厂。</p>
<p>在React Component的构造函数里，可以这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  // 如果props和进入时的上下文有关，在这里处理
  let props = {
    ...
  }

  // 创建了一个原型
  let stm1 = new MySTMInitState(props)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
  <span class="hljs-comment">// 如果props和进入时的上下文有关，在这里处理</span>
  <span class="hljs-keyword">let</span> props = {
    ...
  }

  <span class="hljs-comment">// 创建了一个原型</span>
  <span class="hljs-keyword">let</span> stm1 = <span class="hljs-keyword">new</span> MySTMInitState(props)
</code></pre>
<p>这里有两个问题需要阐述一下。</p>
<p>第一，基于class语法构造对象的本质，其实只是在子类构造函数里把父类构造函数全部调一遍，保证对象属性完整，以及原型链正确；它是用起来最简洁的方式，但不是唯一的方式；</p>
<p>JavaScript提供了另一种方式来构造对象，即<code>Object.create()</code>方法，两者是有区别的。</p>
<p>基于class语法构造的对象，如果你尝试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = new MySTMInitState({})
let y = new MySTMAnotherState({})

console.log(x.__proto__ === y.__proto__)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x = <span class="hljs-keyword">new</span> MySTMInitState({})
<span class="hljs-keyword">let</span> y = <span class="hljs-keyword">new</span> MySTMAnotherState({})

<span class="hljs-built_in">console</span>.log(x.__proto__ === y.__proto__)</code></pre>
<p>你会得到一个<code>false</code>输出，即这两个状态机的原型对象并非同一个对象，他们只是同一个构造函数（MySTM）构造过，因此具有同样的properties（方法）。</p>
<p>但是如果你使用<code>Object.create()</code>来自己构造原型链，你可以有一个原型对象和React Component的生命周期一致，所有stm1状态机都以它为原型。这在某些情况下是有益的，例如：</p>
<ol>
<li><p>你可以在这个原型上放context，减少迁移时<code>Object.assign()</code>复制properties的性能负担；</p></li>
<li><p>如果某些context是需要被子类修改的，可以提供setter方法达到这个目的。</p></li>
</ol>
<p>事实上，这个方式更加符合JavaScript的原型化继承的设计初衷，但是语言是这样的一个东西，就是哪个语法简单，那个写法就被最广泛的使用，就像C++/Java里继承是最简单的语法，那么它就被用的最广泛，而写Pattern是复杂实现，他就被用的少，即使很多时候更应该写Pattern。</p>
<p>Anyway，这个区别在实践上的意义很小。</p>
<p>第二，是个对传统OO语言开发者来说比较难接受的地方，就是你可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = new MySTM()
let y = new MySTMInitState(x)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x = <span class="hljs-keyword">new</span> MySTM()
<span class="hljs-keyword">let</span> y = <span class="hljs-keyword">new</span> MySTMInitState(x)</code></pre>
<p>这件事情幽默的地方是你可以用基类对象去构造继承类对象，仿佛Class和Object的区别被抹平的，他们在平行世界之间穿越。</p>
<p>其实这正解释了JavaScript的所谓类，只是构造函数，所谓继承，就是把构造函数和原型对象串起来而已，类似Builder Pattern的思想；所以Build两步还是三步都是可能的。</p>
<p>这样写有一点实践上的意义，你可以先创建一个基类对象初始化所有的上下文，然后根据实际情况用它来构造继承类对象，这样能重用一下继承类对象的enter逻辑（即constructor），不用重写。</p>
<p>OK，这两个都是小问题，细节。move on。</p>
<p>在所有子类中，constructor等价于状态机Pattern的enter，用于创建所有资源，而exit中需要销毁所有资源，尤其是那些出发但尚未完成的请求，以及尚未fire的timer。对付这种问题，状态机是第一首选Pattern，简直太容易写出行为复杂且健壮的代码了。</p>
<p>事实上，任何其他形态的维护态的代码都可以看作是状态机Pattern的退化，所以对那些如果一开始就预见到未来会变得复杂的组件，应该一开始就写状态机；状态机牺牲的是代码量，但是对于行为定义的变化（迁移路径的增加，减少，改变，状态增减），它维护起来是无出其右的，是对付复杂多态行为的首选。</p>
<p>本质上，状态机帮你拿掉在所有方法里的第一层switch/case，代之以dispatch，或者是OO里说的多态；但是如果状态层叠呢？</p>
<p>通常我们不在状态机里套状态机，一般只有在写复杂协议栈的时候这么写；一般而言，状态机两层最多了，内层的状态用值来表示状态，而不是用类来表示状态，足够了。</p>
<p>举个例子看看你理解了没有：</p>
<p>你的UI里有一个行为是操作一个列表中的单一对象；如果有一个对象被选中，然后按钮被点击，这是一种行为，另一种是用户先创建一个新对象，这是另一种行为；那么需要把Editing和EditingNew作为两种互斥状态处理吗？</p>
<p>如果没有UI的颠覆性变化大多数情况不这样做，而是把Editing作为顶层状态机（superstate）处理，而New可以用一个props的值来表示，例如状态机对象里有一个叫做creating的prop，它是boolean类型。即顶层状态机用类对象表示，底层状态机回到土办法，用值表示。</p>
<p>这样设计的好处是：</p>
<ol>
<li><p>Editing和EditingNew有大量状态是重用的和persistent的，即从一个迁移到另一个，他们仍然是有效的，不应该被一个exit销毁，另一个enter重建。</p></li>
<li><p>他们作为父子状态设计可以共用大量方法，而不是每个都提供自己的副本；</p></li>
<li><p>如果从父状态迁出或者从外部状态向父状态迁入，销毁和构建资源的逻辑也大部分是相同的；</p></li>
</ol>
<p>实际上的状态图上往往是有superstate（父状态）迁出的事件逻辑；那么执行方式是</p>
<ol>
<li><p>直接调用父状态的exit</p></li>
<li><p>父状态的exit先dispatch子状态的exit</p></li>
<li><p>父状态的exit再调用自己的逻辑，即清理子状态的共享资源。</p></li>
</ol>
<p>如果是外部迁入父状态机，要有一个决策依据决定应该迁向那个子状态机作为初始状态，因为在runtime，组合状态机构成的tree结构，实际的状态机实例只能在leaf node上，superstate节点的存在是为了抽象子节点的共同行为，减少迁移路径和重用行为逻辑；</p>
<p>因此迁入父状态机时（enter）的逻辑和迁出（exit）刚好相反：</p>
<ol>
<li><p>直接调用父状态机的enter</p></li>
<li><p>父状态机先构造对所有子状态都适用的资源</p></li>
<li><p>调用具体某个子状态机的enter（就是一个if / then来区分子状态机即可）</p></li>
</ol>
<p>在OO领域，很多开发者信奉UML图；UML图对OO语言中最重要的类图，在JavaScript里毛用没有了，但是State Machine图，结合上述状态机设计，绝对是对付复杂UI的利器；尤其是对于初学者而言，在前端的状态逻辑上，你能掌握这一把刀就能砍倒所有的树；如果还不能砍倒，那其实问题本身不是UI构建域的，可能是其他问题，例如调度等等。</p>
<p>很多写JavaScript的朋友，为了向世人证明自己根骨奇佳、习得真传，到处宣扬OO里的种种不是，以各种言辞抨击OO实践的方方面面。</p>
<p>他们不懂OO。</p>
<p>OO里在语言层面可能有一些设计问题，但是OO里的封装思想是绝对正确的；</p>
<p>为什么会有对象这个概念被提出来？就是因为一些态的生命周期超过函数调用的执行时间，你需要一种方式来管理这些态。</p>
<p>封装的本质是：在内部有一个state space，在外部看，只看到内部的state space的superstate。物理学上称之为简并，degeneration。</p>
<p>这是我们对付所有复杂状态的唯一手段，不管态放在花盆里、银行里、还是藏在自己的内裤里，他们都是客观存在，你不可能去消灭态，你只能organize他们；而且你同时需要organize应用在态上过程（function）。</p>
<p>状态机把这个organization完完全全一览无遗的展露出来，无论你用class写，用闭包写，用c语言写，行为和状态的structure都不会变，想成为一个合格的程序员，尤其是写ui的程序员，state machine pattern是必修课。</p>
<p>～～～～～～～～～～～～～～～～～～～</p>
<p>先写这么多，我得按照上述逻辑扣代码去了。</p>
<p>祝大家圣诞节快乐。</p>
<p>欢迎探讨。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Component里的状态机Pattern

## 原文链接
[https://segmentfault.com/a/1190000007913083](https://segmentfault.com/a/1190000007913083)


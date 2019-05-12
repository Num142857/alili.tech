---
title: '在使用Redux前你需要知道关于React的8件事' 
date: 2018-12-10 2:30:07
hidden: true
slug: bdnkwwvv3xk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>译文,原文来自<a href="https://www.robinwieruch.de/learn-react-before-using-redux/" rel="nofollow noreferrer" target="_blank">https://www.robinwieruch.de/l...</a><br>译者前注: 翻译仅作为个人学习用途,因本人水平有限,译文中充斥着不少拙劣文法和表述,最好还是看英文原文.</blockquote>
<p>状态管理是很复杂的.视图层工具库,如React,允许我们在组件内部管理状态.但它只能扩展到具体某一个组件.React仅仅是一个视图层库.最终你决定(把状态管理)迁移到一个更为成熟的解决方案,如Redux.接下来我想在这篇文章中指出在跳上Redux的列车钱,你应该了解清楚的有关React的内容.</p>
<p>通常人们会同时学习React和Redux,但这有一些缺点:</p>
<ul>
<li>
<p>他们不会遇到在仅使用本地组件状态(this.state)时,扩展状态管理时出现的问题</p>
<ul>
<li>因此他们没法理解为什么需要Redux这一类状态管理工具</li>
<li>因此他们抱怨(使用Redux时)增加了太多的样板代码</li>
</ul>
</li>
<li>
<p>他们不会去学习在React中怎么进行本地组件的状态管理</p>
<ul>
<li>因此他们会把在Redux提供的状态容器(state container)中管理(以及塞入)全部状态</li>
<li>因此他们永远不会使用本地组件状态管理</li>
</ul>
</li>
</ul>
<p>因为上述原因,通常建议是先学习React,然后在稍后的时间选择加入Redux.但如果遇到扩展状态管理的问题,就选择加入Redux吧.一般那些扩展问题仅会在较大型的应用程序中存在,通常情况下<a href="https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" rel="nofollow noreferrer" target="_blank">你不需要Redux这样的状态管理库</a>.<a href="https://www.robinwieruch.de/the-road-to-learn-react/" rel="nofollow noreferrer" target="_blank">学习React之路</a>一书中演示了如何使用普通的React构建应用程序,而不需要用到Redux这样的外部依赖.</p>
<p>不管怎么样,现在你已经决定拥抱Redux了,因此这里我列出了在使用Redux之前,你应该了解的有关React的内容.</p>
<h2 id="articleHeader0">熟悉React本地状态管理</h2>
<p>上面已经提到了最好先学习React,因此你就不能避免使用<code>this.setState()</code>和<code>this.state</code>来操作本地状态来为你的组件注入生命.你应该要能游刃有余地使用它们.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    return (
      <div>
        Counter: {this.state.counter}

        <button
          type=&quot;button&quot;
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        />
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span> };
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        Counter: {this.state.counter}

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.setState({ counter: this.state.counter + 1 })}
        /&gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre>
<p>一个React组件可以在构造函数中定义初始状态.之后就可以通过<code>this.setState()</code>方法来更新状态.状态对象(state object)的更新过程是一次浅合并.因此你可以只更新本地状态中特定的某一部分状态,而其余的状态都不会受到影响.一旦状态更新完,组件就会重新渲染.在上面的例子中,应用会展示更新后的值:<code>this.state.counter</code>.基本上在React的单向数据流中只会存在一条闭环.</p>
<h2 id="articleHeader1">React's Functional Local State(译者注: 这里不知道该如何翻译)</h2>
<p><code>this.setState()</code>方法是异步更新本地状态的.因此你不能依赖状态更新的时机.状态最终都会更新的.这在大部分情况下也是没有什么问题的.</p>
<p>尽管如此,想象一下你的组件需要通过当前状态去计算下一状态.就如同上面的例子那样.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ counter: this.state.counter + 1 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-number">1</span> });</code></pre>
<p>用于计算的本地状态(this.state.counter)只是当前时间的一个快照而已.因此当你用<code>this.setState()</code>更新本地状态时,而本地状态又在异步执行更新完成之前改变了,这时你就操作了一个旧的状态.第一次遇到类似问题的时候或许会有点难以理解.所以用代码来代替千言万语的解释吧:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }

// 更新过后的state: { counter: 1 }
// 而不是: { counter: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-number">1</span> }); <span class="hljs-comment">// this.state: { counter: 0 }</span>
<span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-number">1</span> }); <span class="hljs-comment">// this.state: { counter: 0 }</span>
<span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-number">1</span> }); <span class="hljs-comment">// this.state: { counter: 0 }</span>

<span class="hljs-comment">// 更新过后的state: { counter: 1 }</span>
<span class="hljs-comment">// 而不是: { counter: 3 }</span></code></pre>
<p>就如你看到的那样,当根据本地状态更新状态时,本地状态作为更新状态.这会导致bug的.这也是为什么会有第二种更新React本地状态的方式.</p>
<p><code>this.setState()</code>函数可以接受一个函数作为参数而非对象.而这个回调函数的调用会传入在当下<code>this.setState()</code>异步执行后的本地状态作为参数.这个回调执行的时候就能获取到当前最新的,可信赖的本地状态.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(previousState => ({ counter: previousState.counter + 1 }));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">previousState</span> =&gt;</span> ({ <span class="hljs-attr">counter</span>: previousState.counter + <span class="hljs-number">1</span> }));</code></pre>
<p>那么当你需要根据之前的本地状态来更新时,就可以使用传入函数给<code>this.setState()</code>而非对象.</p>
<p>另外,这也适用于依赖props的更新.在异步执行更新之前,从父组件获取到的props也有可能被改变过.所以传入<code>this.setState()</code>的回调会被注入第二个参数props.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState((prevState, props) => ...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState, props</span>) =&gt;</span> ...);</code></pre>
<p>这样你就能保证更新状态时所依赖的state和props是正确的.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState((prevState, props) => ({ counter: prevState.counter + props.addition }));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState, props</span>) =&gt;</span> ({ <span class="hljs-attr">counter</span>: prevState.counter + props.addition }));</code></pre>
<p>使用回调函数时的另外一个好处是能单独对状态更新进行测试.简单地把<code>this.setState(fn)</code>中的回调函数提取出来并导出(export)即可.这个回调函数应该是一个纯函数,你可以根据输入进行简单的输出测试.</p>
<h2 id="articleHeader2">React的State和Props</h2>
<p>State是组件内部维护状态.可以作为其他组件的Props向下传递.那些接受Props的组件可以在内部使用Props,或者再进一步向下传递给它们的子组件.另外子组件接受的Props仲同样可以是来自父组件的回调函数.那些函数可以用于改变父组件State.基本上Props随着组件树往下传递,而State则由组件自己维护,此外通过往上层组件冒泡的函数可以改变组件中的State,而更新过后的State又以Props的形式往下传递.</p>
<p>组件可以管理很多State,这些State可以作为Props往下传递给子组件并且Props中可以传递函数给予子组件修改父组件的State.</p>
<p>但是,子组件并不知道Props中的函数的来源或功能.这些函数可以更新父组件的State,也可能是执行其他操作.同样的道理,子组件也不知道它所接收的Props是来自父组件的Props,State或其他派生属性,子组件只是单纯的使用它们而已.</p>
<p>掌握并理解State和Props非常重要,组件树中使用的所有属性都可以被分为State和Props(以及根据State和Props计算得出的派生属性).所有需要交互的部分都应作为State保存,而其他的一切都可以作为Props在组件树中传递.</p>
<p>在使用复杂的状态管理工具库之前,你应该已经试过在组件树中往下传递Props.当你传递Props给一些根本不使用它们的组件,而又需要这些组件把Props继续向下传递给最后一个使用它们的子组件时,你应该已经感觉到"需要一种更好的方式来做这件事".</p>
<h2 id="articleHeader3">提取React的State</h2>
<p>你是否已经提取出你的本地状态层?这是在React中扩展本地状态管理最重要的策略.状态层是可以上下提取的.</p>
<p>你可以向下提取的你的本地状态,使其他组件没法访问.假设你有一个组件A是组件B和组件C的父组件,B和C是A的子组件,并且B,C为兄弟组件.组件A是唯一维护本地状态(State)的组件,但是它会将State作为Props传递给子组件.另外也传递了必要的函数让B和C能够改变A中的State.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          +----------------+
          |                |
          |       A        |
          |                |
          |    Stateful    |
          |                |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |        C       |
|                |    |                |
|                |    |                |
+----------------+    +----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">          +----------------+
          |                |
          |       A        |
          |                |
          |    Stateful    |
          |                |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |        C       |
|                |    |                |
|                |    |                |
+----------------+    +----------------+</code></pre>
<p>现在组件A的State中有一半作为Props传递给C并为C所用,但B并不需要那些Props.另外,C使用其接收的Props中的函数来改变A中仅传递给了C的那部分State.如图所示,组件A在帮助组件C维护着State.在大多数情况下,只需要一个组件管理其子组件所有的State即可.但是想象一下,如果组件A和组件C中间还有其他组件,而组件A依然是在维护着组件C所需的状态,那由组件A往下传递的所有Props都需要遍历组件树才能最终到达组件C.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |        +       |
                      |        |Props  |
                      |        v       |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |        +       |
                      |        |Props  |
                      |        v       |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+</code></pre>
<p>这是展示提取React State的完美用例.当State仅仅用于组件C而组件A只是充当了维护的角色.这个时候对应的State片段就可以在在C中单独管理,是可以被独立出来的.将State状态管理提取出来到组件C后,就不会出现传递Props需要遍历整个组件树的情况了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |                |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |                |
                      |                |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |     Stateful   |
                      +----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |                |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |                |
                      |                |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |     Stateful   |
                      +----------------+</code></pre>
<p>此外,组件A中的State也应有所改变,它只管理自己以及其最接近的子组件的必要State.</p>
<p>提取State不仅可以往下,也可以反过来往上提取:提升状态.假设你有父组件A,组件B和C都为其子组件.A和B以及A和C之间又多少个组件并不重要,但是这次组件C已经管理了它所需的所有State.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |                |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |    Stateful    |
                      +----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |                |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |    Stateful    |
                      +----------------+</code></pre>
<p>如果组件B需要组件C中所管理的State呢?这个时候组件C中的State不能共享给组件B,因为State只能作为Props向下传递.这就是为什么你需要提升State.你可以把组件C中的State网上提取,直到B和C的共同父组件(A),如果组件B需要用到组件C中管理的所有状态,则组件C甚至应该变成无状态组件.而所有的State可以在A中管理,但在B和C之间共享.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+</code></pre>
<p>提取State让你能够仅仅通过React就能扩展你的状态管理.当更多的组件需要用到特定的State时,可以往上提取State,直到需要访问该State的组件的公共组件.此外,本地状态管理依然保持着可维护性,因为一个组件根据自身需求管理尽可能多的状态,换言之如果组件或其子组件不需要该State的话,则可以往下提取State放置在需要的地方.</p>
<p>你可以在<a href="https://facebook.github.io/react/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">官方文档</a>中阅读更多关于关于提取State的信息.</p>
<h2 id="articleHeader4">React高阶组件(HOC)</h2>
<p>高阶组件是React中一种高级设计模式.你可以使用它来抽象功能,并将其作为其他多个组件的可选功能重用.高阶组件接受一个组件和其他可选配置作为参数并返回一个增强版本的组件.它建立在Javascript的高阶函数(返回函数的函数)的原则之上.</p>
<p>如果你并不十分了解高阶组件的概念,我推荐你阅读一下<a href="https://www.robinwieruch.de/gentle-introduction-higher-order-components/" rel="nofollow noreferrer" target="_blank">高阶组件的简单介绍</a>.里面通过<a href="https://www.robinwieruch.de/conditional-rendering-react/" rel="nofollow noreferrer" target="_blank">React的条件渲染</a>用例来讲解高阶组件的概念.</p>
<p>高阶组件概念在后面会显得尤为重要,因为在使用像Redux这样的库的时候,你将会遇到很多高阶组件.当需要使用Redux这一类库将状态管理层和React的视图层"连接"起来时.你通常会使用一个高阶组件来处理这层关系(如<a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a>中的connect高阶组件).</p>
<p>这也同样适用于其他状态管理库,如MobX.在这些库中使用了高阶组件来处理状态管理层和视图层的连接.</p>
<h2 id="articleHeader5">React上下文(Context)</h2>
<p>React的Context上下文很少被使用,我不会建议去使用它,因为Context API并不稳定,而且使用它还UI增加应用程序的复杂性.不过尽管如此,还是很有必要理解它的功能的.</p>
<p>所以为什么你应该要了解Context呢?Content用于在组件树上隐式地传递属性.你可以在父组件的某个地方声明属性,并在组件树下的某个子组件中选择再次获取该属性.然而如果通过Props传递的话,所有不需要使用那些数据的组件都需要显式地往下传递.这些组件位于父组件的上下文和最终消费该Props的子组件的上下文之间.所以Context是一个无形的容器.你可以在组件树中找到它.所以,为什么你应该要了解Context呢?</p>
<p>通常在使用复杂的状态管理工具库时,例如Redux和MobX,你需要将状态管理层粘合到React的视图层上.这也是为什么你需要了解React高阶组件的原因.这其中的粘合层允许你访问State并进行修改,而State本身通常是在某种状态容器中进行管理的.</p>
<p>但是如何使这个状态容器能够被所有粘合上React组件所访问呢?这是由React Context来完成的.在最顶层的组件,一般是React应用的根组件,你应在React Context中声明状态容器,以便在组件树下的每个组件都能进行隐式访问.整个过程都是通过React的<a href="https://www.robinwieruch.de/react-provider-pattern-context/" rel="nofollow noreferrer" target="_blank">提供者模式(Provider Pattern)</a>完成的.</p>
<p>当然这也并不意味着在使用Redux一类的库时你需要自己处理React Context上下文.这类工具库已经为你提供了解决方案,使所有组件都可以访问状态容器.当你的状态可以在不同的组件中访问而不必担心状态容器来自哪里的时后,这个底层实现的机制是什么,为什么这样做的有效的,这都是很有必要去了解的事实.</p>
<h2 id="articleHeader6">React Stateful组件(带状态的组件)</h2>
<p>React中有两种声明组件的方式: ES6类组件和函数(不带状态)组件.一个不带状态的函数组件仅仅是一个接收Props并返回JSX的函数.其中不保持任何的State也不会触发任何React生命周期函数.顾名思义就是无状态的.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Counter({ counter }) {
  return (
    <div>
      {counter}
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Counter</span>(<span class="hljs-params">{ counter }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {counter}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<p>另一方面,即React类组件是可以保持State和能出发声明周期函数的.这些组件能访问<code>this.state</code>和调用<code>this.setState()</code>方法.这就说明了ES类组件是能带状态的组件.而如果他们不需要保持本地State的话,也可以是无状态组件.通常无状态的类组件也会需要使用声明周期函数.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class FocusedInputField extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <input
        type=&quot;text&quot;
        value={this.props.value}
        ref={node => this.input = node}
        onChange={event => this.props.onChange(event.target.value)}
      />
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FocusedInputField</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>.input.focus();
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{this.props.value}</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{node</span> =&gt;</span> this.input = node}
        onChange={event =&gt; this.props.onChange(event.target.value)}
      /&gt;
    );
  }
}</span></code></pre>
<p>结论是只有ES6类组件是可以带状态的,但是他们也可以是无状态的.而函数组件则是无状态的.</p>
<p>此外,还可以使用高阶组件来添加状态到React组件上.你可以编写自己的高阶组件来管理状态,或者使用像<a href="https://github.com/acdlite/recompose" rel="nofollow noreferrer" target="_blank">recompose</a>工具库中的<code>withState</code>高阶组件.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { withState } from `recompose`;

const enhance = withState('counter', 'setCounter', 0);

const Counter = enhance(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { withState } <span class="hljs-keyword">from</span> <span class="hljs-string">`recompose`</span>;

<span class="hljs-keyword">const</span> enhance = withState(<span class="hljs-string">'counter'</span>, <span class="hljs-string">'setCounter'</span>, <span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> Counter = enhance(<span class="hljs-function">(<span class="hljs-params">{ counter, setCounter }</span>) =&gt;</span>
  &lt;div&gt;
    Count: {counter}
    &lt;button onClick={() =&gt; setCounter(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n + <span class="hljs-number">1</span>)}&gt;Increment&lt;<span class="hljs-regexp">/button&gt;
    &lt;button onClick={() =&gt; setCounter(n =&gt; n - 1)}&gt;Decrement&lt;/</span>button&gt;
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<p>当使用高阶组件时,你可以选择传递任意局部状态到React组件中去.</p>
<h2 id="articleHeader7">容器与展示模式(容器组件与展示组件)</h2>
<p>因为Dan Abramov的<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" rel="nofollow noreferrer" target="_blank">博文</a>,容器和演示模式变得流行了起来.如果你对此并不十分了解,现在正是深入学习的时机.基本上它会将组件分为两类:容器组件和展示组件.容器组件负责描述组件是如何工作的,展示组件负责组件内容的展示.容器组件一般是一个类组件,因为容器组件是需要管理本地状态的.而展示组件是一个无状态函数组件,因为一般只用于展示Props和调用从父组件传递过来的函数.</p>
<p>在深入Redux之前,理解这种模式背后的原理是很有意义的.当你使用状态管理的工具库时,你会把组件和State连接起来.那些组件并不在意应该怎么去展示内容,而更多是描述如何起效的.因此那些组件就是容器组件.再具体一点,你应该会经常听到<code>连接组件(connected component)</code>当一个组件和状态管理层连接起来之后.</p>
<h2 id="articleHeader8">MobX还是Redux?</h2>
<p>纵观所有状态管理库,Redux是最流行的一个,但是MobX也是一个很有价值的替代品.这两个库都遵循不同的哲学和编程范式.</p>
<p>在你决定使用它们之前,请确保你清楚了解本文中解释的有关React的内容.你应该对能坦然面对在仅使用React的情况下进行本地状态管理,还能了解各种React的概念并扩展你的状态管理.此外,确保在你的应用在未来会变得更加庞大时,才需要去扩展状态管理的解决方案.也许提取State或使用React Context应用提供者模式(provider pattern)就可以解决你的问题了.</p>
<p>因此,如果决定迈上Redux和MobX的道路,可以阅读下面的文章以做出更好的决定:<a href="https://www.robinwieruch.de/redux-mobx-confusion/" rel="nofollow noreferrer" target="_blank">Redux or MobX: An attempt to dissolve the Confusion</a>.文章中有效的对比了两个库的差异,并提供了一些学习和应用他们的建议.或者看下<a href="https://www.robinwieruch.de/tips-to-learn-react-redux/" rel="nofollow noreferrer" target="_blank">Tips to learn React + Redux</a>来了解Redux吧.</p>
<h2 id="articleHeader9">后记</h2>
<p>希望这篇文章为你理清了再应用像Redux一类的库之前,你应该学习和了解的内容.目前,我正在写一个关于Redux和本地状态管理的书,内容包括Redux和MobX.如果不想错过的话,你可以<a href="https://www.getrevue.co/profile/rwieruch" rel="nofollow noreferrer" target="_blank">点这进行订阅</a>.</p>
<blockquote>译者后注: 希望我拙劣的翻译没有为你理解本文增加难度,再说一次最好还是看英文原文,如有改进建议请大方联系,我必虚心受教.</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在使用Redux前你需要知道关于React的8件事

## 原文链接
[https://segmentfault.com/a/1190000013725571](https://segmentfault.com/a/1190000013725571)


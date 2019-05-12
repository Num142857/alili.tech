---
title: 'React性能优化总结' 
date: 2019-01-29 2:30:10
hidden: true
slug: efgdmbjqz7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章同步于Github <a href="https://github.com/Pines-Cheng/blog/issues/13" rel="nofollow noreferrer" target="_blank">Pines-Cheng/blog</a></p></blockquote>
<p>初学者对React可能满怀期待，觉得React可能完爆其它一切框架，甚至不切实际地认为React可能连原生的渲染都能完爆——对框架的狂热确实会出现这样的不切实际的期待。让我们来看看React的官方是怎么说的。React官方文档在Advanced Performanec这一节，这样写道：</p>
<blockquote><p>One of the first questions people ask when considering React for a project is whether their application will be as fast and responsive as an equivalent non-React version</p></blockquote>
<p>显然React自己也其实只是想尽量达到跟非React版本相当的性能。</p>
<h2 id="articleHeader0">你所不知道的render</h2>
<p>react的组件渲染分为初始化渲染和更新渲染。<br>在初始化渲染的时候会调用根组件下的所有组件的render方法进行渲染，如下图（绿色表示已渲染，这一层是没有问题的）：</p>
<p><span class="img-wrap"><img data-src="/img/bVGUAs?w=864&amp;h=326" src="https://static.alili.tech/img/bVGUAs?w=864&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>但是当我们要更新某个子组件的时候，如下图的绿色组件（从根组件传递下来应用在绿色组件上的数据发生改变）：</p>
<p><span class="img-wrap"><img data-src="/img/bVGUAL?w=850&amp;h=316" src="https://static.alili.tech/img/bVGUAL?w=850&amp;h=316" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们的理想状态是只调用关键路径上组件的render，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVGUAR?w=843&amp;h=309" src="https://static.alili.tech/img/bVGUAR?w=843&amp;h=309" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>但是react的默认做法是<code>调用所有组件的render</code>，再对<code>生成的虚拟DOM进行对比</code>，如不变则不进行更新。这样的render和虚拟DOM的对比明显是在浪费，如下图（黄色表示浪费的render和虚拟DOM对比）</p>
<p><span class="img-wrap"><img data-src="/img/bVGUBc?w=846&amp;h=309" src="https://static.alili.tech/img/bVGUBc?w=846&amp;h=309" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>Tips:</p>
<ul>
<li><p>拆分组件是有利于复用和组件优化的。</p></li>
<li><p>生成虚拟DOM并进行比对发生在render()后，而不是render()前。</p></li>
</ul>
</blockquote>
<h3 id="articleHeader1">更新阶段的生命周期</h3>
<ul>
<li><p><code>componentWillReceiveProps(object nextProps)</code>：当挂载的组件接收到新的props时被调用。此方法应该被用于比较this.props 和 nextProps以用于使用this.setState()执行状态转换。（组件内部数据有变化，使用state，但是在更新阶段又要在props改变的时候改变state，则在这个生命周期里面）</p></li>
<li><p><code>shouldComponentUpdate(object nextProps, object nextState)</code>： -boolean 当组件决定任何改变是否要更新到DOM时被调用。作为一个<code>优化</code>实现比较this.props 和 nextProps 、this.state 和 nextState ，如果React应该跳过更新，返回false。</p></li>
<li><p><code>componentWillUpdate(object nextProps, object nextState)</code>：在更新发生前被立即调用。你不能在此调用<code>this.setState()</code>。</p></li>
<li><p><code>componentDidUpdate(object prevProps, object prevState)</code>： 在更新发生后被立即调用。（可以在DOM更新完之后，做一些收尾的工作）</p></li>
</ul>
<blockquote>
<p>Tips:</p>
<ul><li><p>React的优化是基于<code>shouldComponentUpdate</code>的，该生命周期默认返回true，所以一旦prop或state有任何变化，都会引起重新render。</p></li></ul>
</blockquote>
<h3 id="articleHeader2">shouldComponentUpdate</h3>
<p>react在每个组件生命周期更新的时候都会调用一个shouldComponentUpdate(nextProps, nextState)函数。它的职责就是返回true或false，true表示需要更新，false表示不需要，<code>默认返回为true</code>，即便你没有显示地定义 shouldComponentUpdate 函数。这就不难解释上面发生的资源浪费了。</p>
<p>为了进一步说明问题，我们再引用一张官网的图来解释，如下图（ SCU表示shouldComponentUpdate，绿色表示返回true(需要更新)，红色表示返回false(不需要更新)；vDOMEq表示虚拟DOM比对，绿色表示一致(不需要更新)，红色表示发生改变(需要更新)）：</p>
<p><span class="img-wrap"><img data-src="/img/bVGVzv?w=679&amp;h=389" src="https://static.alili.tech/img/bVGVzv?w=679&amp;h=389" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>根据渲染流程，首先会判断shouldComponentUpdate(SCU)是否需要更新。如果需要更新，则调用组件的render生成新的虚拟DOM，然后再与旧的虚拟DOM对比(vDOMEq)，如果对比一致就不更新，如果对比不同，则根据最小粒度改变去更新DOM；如果SCU不需要更新，则直接保持不变，同时其子元素也保持不变。</p>
<ul>
<li><p>C1根节点，绿色SCU (true)，表示需要更新，然后vDOMEq红色，表示虚拟DOM不一致，需要更新。</p></li>
<li><p>C2节点，红色SCU (false)，表示不需要更新，所以C4,C5均不再进行检查</p></li>
<li><p>C3节点同C1，需要更新</p></li>
<li><p>C6节点，绿色SCU (true)，表示需要更新，然后vDOMEq红色，表示虚拟DOM不一致，更新DOM。</p></li>
<li><p>C7节点同C2</p></li>
<li><p>C8节点，绿色SCU (true)，表示需要更新，然后vDOMEq绿色，表示虚拟DOM一致，不更新DOM。</p></li>
</ul>
<h2 id="articleHeader3">带坑的写法：</h2>
<ul>
<li><p><code>{...this.props}</code> (不要滥用，请只传递component需要的props，传得太多，或者层次传得太深，都会加重shouldComponentUpdate里面的数据比较负担，因此，请慎用spread attributes（&lt;Component {...props} /&gt;）)。</p></li>
<li><p><code>::this.handleChange()</code>。(请将方法的bind一律置于constructor)</p></li>
<li><p><code>this.handleChange.bind(this,id)</code></p></li>
<li><p>复杂的页面不要在一个组件里面写完。</p></li>
<li><p>请尽量使用<code>const element</code>。</p></li>
<li><p>map里面添加key，并且key不要使用index（可变的）。具体可参考<a href="http://levy.work/2016-08-31-debug-react-key-with-performance-tool/" rel="nofollow noreferrer" target="_blank">使用Perf工具研究React Key对渲染的影响</a></p></li>
<li><p>尽量少用<code>setTimeOut</code>或不可控的refs、DOM操作。</p></li>
<li><p><code>props</code>和<code>state</code>的数据尽可能简单明了，扁平化。</p></li>
<li><p>使用<code>return null</code>而不是CSS的<code>display:none</code>来控制节点的显示隐藏。保证同一时间页面的DOM节点尽可能的少。</p></li>
</ul>
<h2 id="articleHeader4">性能检测工具</h2>
<h3 id="articleHeader5">React官方提供的：React.addons.Perf</h3>
<p>react官方提供一个插件<code>React.addons.Perf</code>可以帮助我们分析组件的性能，以确定是否需要优化。<br>打开console面板，先输入<code>Perf.start()</code>执行一些组件操作，引起数据变动，组件更新，然后输入<code>Perf.stop()</code>。（建议一次只执行一个操作，好进行分析）<br>再输入<code>Perf.printInclusive</code>查看所有涉及到的组件render，如下图（官方图片）：<br><span class="img-wrap"><img data-src="/img/bVGVGJ?w=687&amp;h=62" src="https://static.alili.tech/img/bVGVGJ?w=687&amp;h=62" alt="Flfo-tdhVWQNu3Qou1bPgIlHFLln" title="Flfo-tdhVWQNu3Qou1bPgIlHFLln" style="cursor: pointer;"></span></p>
<p>或者输入Perf.printWasted()查看下不需要的的浪费组件render，如下图（官方图片）： <br><span class="img-wrap"><img data-src="/img/bVGVG7?w=687&amp;h=62" src="https://static.alili.tech/img/bVGVG7?w=687&amp;h=62" alt="Fpcch1iZkcJU9U-mlUxjnX9lcO9S" title="Fpcch1iZkcJU9U-mlUxjnX9lcO9S" style="cursor: pointer;"></span></p>
<p>优化前：<br><span class="img-wrap"><img data-src="/img/bVGVJo?w=1026&amp;h=332" src="https://static.alili.tech/img/bVGVJo?w=1026&amp;h=332" alt="FuX9A-2VfmgFMDycQYvtnR1ovBEb" title="FuX9A-2VfmgFMDycQYvtnR1ovBEb" style="cursor: pointer;"></span><br>优化后：<br><span class="img-wrap"><img data-src="/img/bVGVJv?w=535&amp;h=192" src="https://static.alili.tech/img/bVGVJv?w=535&amp;h=192" alt="Fi4w1W_Fq4A3eUdsv_0U67Z5WZ8N" title="Fi4w1W_Fq4A3eUdsv_0U67Z5WZ8N" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">其他的检测工具</h3>
<p><a href="https://github.com/RamonGebben/react-perf-tool" rel="nofollow noreferrer" target="_blank">react-perf-tool</a>为React应用提供了一种可视化的性能检测方案，该工程同样是基于React.addons，但是使用图表来显示结果，更加方便。<br><span class="img-wrap"><img data-src="/img/bVGVPq?w=895&amp;h=353" src="https://static.alili.tech/img/bVGVPq?w=895&amp;h=353" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">React官方的解决方案</h2>
<h3 id="articleHeader8">PureRenderMixin(es5)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var PureRenderMixin = require('react-addons-pure-render-mixin');
React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className={this.props.className}>foo</div>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> PureRenderMixin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-addons-pure-render-mixin'</span>);
React.createClass({
  <span class="hljs-attr">mixins</span>: [PureRenderMixin],

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{this.props.className}</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});</code></pre>
<h3 id="articleHeader9">Shallow Compare (es6)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowCompare = require('react-addons-shallow-compare');
export class SampleComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> shallowCompare = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-addons-shallow-compare'</span>);
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  shouldComponentUpdate(nextProps, nextState) {
    <span class="hljs-keyword">return</span> shallowCompare(<span class="hljs-keyword">this</span>, nextProps, nextState);
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{this.props.className}</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}</code></pre>
<p>es7装饰器的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import pureRender from &quot;pure-render-decorator&quot;
...

@pureRender
class Person  extends Component {
  render() {
    console.log(&quot;我re-render了&quot;);
    const {name,age} = this.props;

      return (
        <div>
          <span>姓名:</span>
          <span>{name}</span>
          <span> age:</span>
          <span>{age}</span>
        </div>
      )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> pureRender <span class="hljs-keyword">from</span> <span class="hljs-string">"pure-render-decorator"</span>
...

@pureRender
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span>  <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我re-render了"</span>);
    <span class="hljs-keyword">const</span> {name,age} = <span class="hljs-keyword">this</span>.props;

      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>姓名:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> age:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{age}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )
  }
}</code></pre>
<p>pureRender很简单，就是把传进来的component的shouldComponentUpdate给重写掉了，原来的shouldComponentUpdate，无论怎样都是return ture，现在不了，我要用shallowCompare比一比，shallowCompare代码及其简单，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">shallowCompare</span>(instance, nextProps, nextState) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">!shallowEqual(instance.props,</span> nextProps) || !shallowEqual(instance.state, nextState);
}</code></pre>
<h3 id="articleHeader10">缺点</h3>
<p>shallowEqual其实只比较props的<code>第一层</code>子属性是不是相同，如果props是如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  detail: {
    name: &quot;123&quot;,
    age: &quot;123&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">detail</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"123"</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-string">"123"</span>
  }
}</code></pre>
<p>他只会比较<code>props.detail ===nextProps.detail</code>，导致在传入复杂的数据的情况下，优化失效。</p>
<h3 id="articleHeader11">补充（4.25）</h3>
<p>React在<code>15.3.0</code>里面加入了了<code>React.PureComponent</code> - 一个可继承的新的基础类, 用来替换<code>react-addons-pure-render-mixin</code>。用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.<span class="hljs-keyword">state</span> = {count: <span class="hljs-number">1</span>};
  }

  render() {
    return (
      <span class="hljs-variable">&lt;button
        color={this.props.color}
        onClick={() =&gt;</span> this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({count: <span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>}))}&gt;
        Count: {this.<span class="hljs-keyword">state</span>.count}
      &lt;/button&gt;
    );
  }
}</code></pre>
<p>在ES6里面写起来简直爽歪歪，可惜一样只支持浅比较。</p>
<h2 id="articleHeader12">immutable.js</h2>
<p>我们也可以在 <code>shouldComponentUpdate()</code> 中使用使用 deepCopy 和 deepCompare 来避免无必要的 render()，但 deepCopy 和 deepCompare 一般都是非常耗性能的。</p>
<p>Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。</p>
<p>Immutable 实现的原理是 <code>Persistent Data Structure</code>（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 <code>Structural Sharing</code>（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。请看下面动画：</p>
<p><span class="img-wrap"><img data-src="/img/bVsXeZ" src="https://static.alili.tech/img/bVsXeZ" alt="FpPDekdncL-A9N69NnI3-O8CgGQ8" title="FpPDekdncL-A9N69NnI3-O8CgGQ8" style="cursor: pointer;"></span></p>
<p>Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 === 和 is 比较就能知道是否需要执行 render()，而这个操作几乎 0 成本，所以可以极大提高性能。修改后的 <code>shouldComponentUpdate</code> 是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { is } from 'immutable';

shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (!is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { is } <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>;

shouldComponentUpdate: <span class="hljs-function">(<span class="hljs-params">nextProps = {}, nextState = {}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> thisProps = <span class="hljs-keyword">this</span>.props || {}, thisState = <span class="hljs-keyword">this</span>.state || {};

  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(thisProps).length !== <span class="hljs-built_in">Object</span>.keys(nextProps).length ||
      <span class="hljs-built_in">Object</span>.keys(thisState).length !== <span class="hljs-built_in">Object</span>.keys(nextState).length) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> nextProps) {
    <span class="hljs-keyword">if</span> (!is(thisProps[key], nextProps[key])) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> nextState) {
    <span class="hljs-keyword">if</span> (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<h3 id="articleHeader13">react-immutable-render-mixin</h3>
<p>这是一个facebook/immutable-js的react pure render mixin 的库，可以简化很多写法。<br>使用<a href="https://github.com/jurassix/react-immutable-render-mixin" rel="nofollow noreferrer" target="_blank">react-immutable-render-mixin</a>可以实现装饰器的写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class Test extends React.Component {
  render() {
    return <div></div>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { immutableRenderDecorator } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-immutable-render-mixin'</span>;

@immutableRenderDecorator
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}</code></pre>
<p>这里可参考我的另一篇blog:<a href="https://segmentfault.com/a/1190000010438089">使用immutable优化React</a></p>
<h2 id="articleHeader14">无状态组件</h2>
<p>为了避免一定程度的浪费，react官方还在0.14版本中加入了<code>无状态组件</code>，<br>这种组件没有状态，没有生命周期，只是简单的接受 props 渲染生成 DOM 结构。无状态组件非常简单，开销很低，如果可能的话尽量使用无状态组件。比如使用箭头函数定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es6
const HelloMessage = (props) => <div> Hello {props.name}</div>;
render(<HelloMessage name=&quot;John&quot; />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> HelloMessage = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> &lt;div&gt; Hello {props.name}&lt;<span class="hljs-regexp">/div&gt;;
render(&lt;HelloMessage name="John" /</span>&gt;, mountNode);</code></pre>
<p>因为无状态组件只是函数，所以它没有实例返回，这点在想用 refs 获取无状态组件的时候要注意，参见DOM 操作。</p>
<h2 id="articleHeader15">高阶组件（接下来的方向）</h2>
<blockquote><p>大部分使用mixin和class extends的地方，高阶组件都是更好的方案——毕竟<code>组合优于继承</code>。</p></blockquote>
<h3 id="articleHeader16">参考文章</h3>
<p><a href="http://wwsun.github.io/posts/react-with-es6-part-4.html" rel="nofollow noreferrer" target="_blank">使用ES6编写React应用（4）：使用高阶组件替代Mixins</a><br><a href="http://efe.baidu.com/blog/mixins-are-dead-long-live-the-composition/" rel="nofollow noreferrer" target="_blank">Mixin 已死，Composition 万岁</a></p>
<h2 id="articleHeader17">React同构直出（接下来方向）</h2>
<blockquote><p>同构基于服务端渲染，却不止是服务端渲染。</p></blockquote>
<p>React在减少重复渲染方面确实是有一套独特的处理办法，那就是virtual DOM，但显示在首次渲染的时候React绝无可能超越原生的速度。因此，我们在做优化的时候，接下来可以做的事情就是：</p>
<ul><li><p>首屏时间可能会比较原生的慢一些，但可以尝试用React Server Render (又称Isomorphic)去提高效率</p></li></ul>
<h3 id="articleHeader18">参考文章</h3>
<p><a href="https://github.com/joeyguo/blog/issues/9" rel="nofollow noreferrer" target="_blank">React同构直出优化总结</a><br><a href="http://www.alloyteam.com/2016/06/tencent-news-react-isomorphic-straight-out-optimization/" rel="nofollow noreferrer" target="_blank">腾讯新闻React同构直出优化实践</a></p>
<h2 id="articleHeader19">参考文章</h2>
<p><a href="http://imweb.io/topic/577512fe732b4107576230b9" rel="nofollow noreferrer" target="_blank">react组件性能优化探索实践</a><br><a href="https://github.com/lcxfs1991/blog/issues/8" rel="nofollow noreferrer" target="_blank">React移动web极致优化</a><br><a href="https://zhuanlan.zhihu.com/p/20549104?columnSlug=FrontendMagazine" rel="nofollow noreferrer" target="_blank">React vs Angular 2：冰与火之歌</a></p>
<blockquote><p>时间仓促，难免有遗漏，如果觉得对你有帮助，请点<code>推荐</code>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React性能优化总结

## 原文链接
[https://segmentfault.com/a/1190000007811296](https://segmentfault.com/a/1190000007811296)


---
title: 'React性能优化' 
date: 2019-02-05 2:30:09
hidden: true
slug: zjb9v9zdgm
categories: [reprint]
---

{{< raw >}}

                    
<p>当大家考虑在项目中使用 React 的时候，第一个问题往往是他们的应用的速度和响应是否能和非 React 版一样，每当状态改变的时候就重新渲染组件的整个子树，让大家怀疑这会不会对性能造成负面影响。React 用了一些黑科技来减少 UI 更新需要的花费较大的 DOM 操作。</p>
<h2 id="articleHeader0">使用 production 版本</h2>
<p>如果你在你的 React app 中进行性能测试或在寻找性能问题，一定要确定你在使用 <a href="/react/downloads.html">minified production build</a>。开发者版本包括额外的警告信息，这对你在开发你的 app 的时候很有用，但是因为要进行额外的处理，所以它也会比较慢。</p>
<h2 id="articleHeader1">避免更新 DOM</h2>
<p>React 使用虚拟 DOM，它是在浏览器中的 DOM 子树的渲染描述，这个平行的描述让 React 避免创建和操作 DOM 节点，这些远比操作一个 JavaScript 对象慢。当一个组件的 props 或 state 改变，React 会构造一个新的虚拟 DOM 和旧的进行对比来决定真实 DOM 更新的必要性，只有在它们不相等的时候，React 才会使用尽量少的改动更新 DOM。</p>
<p>在此之上，React 提供了生命周期函数 <code>shouldComponentUpdate</code>，在重新渲染机制回路（虚拟 DOM 对比和 DOM 更新）之前会被触发，赋予开发者跳过这个过程的能力。这个函数默认返回 <code>true</code>，让 React 执行更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate: function(nextProps, nextState) {
  return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">shouldComponentUpdate: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>一定要记住，React 会非常频繁的调用这个函数，所以要确保它的执行速度够快。</p>
<p>假如你有个带有多个对话的消息应用，如果只有一个对话发生改变，如果我们在 <code>ChatThread</code> 组件执行 <code>shouldComponentUpdate</code>，React 可以跳过其他对话的重新渲染步骤。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate: function(nextProps, nextState) {
  // TODO: return whether or not current chat thread is
  // different to former one.
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">shouldComponentUpdate: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
  <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> return whether or not current chat thread is</span>
  <span class="hljs-comment">// different to former one.</span>
}</code></pre>
<p>因此，总的说，React 通过让用户使用 <code>shouldComponentUpdate</code> 减短重新渲染回路，避免进行昂贵的更新 DOM 子树的操作，而且这些必要的更新，需要对比虚拟 DOM。</p>
<h2 id="articleHeader2">shouldComponentUpdate 实战</h2>
<p>这里有个组件的子树，每一个都指明了 <code>shouldComponentUpdate</code> 返回值和虚拟 DOM 是否相等，最后，圆圈的颜色表示组件是否需要更新。</p>
<p><span class="img-wrap"><img data-src="/img/bVApam?w=555&amp;h=371" src="https://static.alili.tech/img/bVApam?w=555&amp;h=371" alt="should-component-update.png" title="should-component-update.png" style="cursor: pointer;"></span></p>
<p>在上面的示例中，因为 C2 的 <code>shouldComponentUpdate</code> 返回 false，React 就不需要生成新的虚拟 DOM，也就不需要更新 DOM，注意 React 甚至不需要调用 C4 和 C5 的 <code>shouldComponentUpdate</code>。</p>
<p>C1 和 C3 的 <code>shouldComponentUpdate</code> 返回 <code>true</code>，所以 React 需要向下到叶子节点检查它们，C6 返回 <code>true</code>，因为虚拟 DOM 不相等，需要更新 DOM。最后感兴趣的是 C8，对于这个节点，React 需要计算虚拟 DOM，但是因为它和旧的相等，所以不需要更新 DOM。</p>
<p>注意 React 只需要对 C6 进行 DOM 转换，这是必须的。对于 C8，通过虚拟 DOM 的对比确定它是不需要的，C2 的子树和 C7，它们甚至不需要计算虚拟 DOM，因为 <code>shouldComponentUpdate</code>。</p>
<p>那么，我们怎么实现 <code>shouldComponentUpdate</code> 呢？比如说你有一个组件仅仅渲染一个字符串:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },

  render: function() {
    return <div>{this.props.value}</div>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createClass({
  <span class="hljs-attr">propTypes</span>: {
    <span class="hljs-attr">value</span>: React.PropTypes.string.isRequired
  },

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.value}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});</code></pre>
<p>我们可以简单的实现 <code>shouldComponentUpdate</code> 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate: function(nextProps, nextState) {
  return this.props.value !== nextProps.value;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">shouldComponentUpdate: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.value !== nextProps.value;
}</code></pre>
<p>非常好！处理这样简单结构的 props／state 很简单，我门甚至可以归纳出一个基于浅对比的实现，然后把它 Mixin 到组件中。实际上 React 已经提供了这样的实现: <a href="/react/docs/pure-render-mixin.html">PureRenderMixin</a></p>
<p>但是如果你的组件的 props 或者 state 是可变的数据结构呢？比如说，组件接收的 prop 不是一个像 <code>'bar'</code> 这样的字符串，而是一个包涵字符串的 JavaScript 对象，比如 <code>{ foo: 'bar' }</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },

  render: function() {
    return <div>{this.props.value.foo}</div>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createClass({
  <span class="hljs-attr">propTypes</span>: {
    <span class="hljs-attr">value</span>: React.PropTypes.object.isRequired
  },

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.value.foo}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});</code></pre>
<p>前面的 <code>shouldComponentUpdate</code> 实现就不会一直和我们期望的一样工作:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// assume this.props.value is { foo: 'bar' }
// assume nextProps.value is { foo: 'bar' },
// but this reference is different to this.props.value
this.props.value !== nextProps.value; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// assume this.props.value is { foo: 'bar' }</span>
<span class="hljs-comment">// assume nextProps.value is { foo: 'bar' },</span>
<span class="hljs-comment">// but this reference is different to this.props.value</span>
<span class="hljs-keyword">this</span>.props.value !== nextProps.value; <span class="hljs-comment">// true</span></code></pre>
<p>这个问题是当 prop 没有改变的时候 <code>shouldComponentUpdate</code> 也会返回 <code>true</code>。为了解决这个问题，我们有了这个替代实现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate: function(nextProps, nextState) {
  return this.props.value.foo !== nextProps.value.foo;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">shouldComponentUpdate: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.value.foo !== nextProps.value.foo;
}</code></pre>
<p>基本上，我们结束了使用深度对比来确保改变的正确跟踪，这个方法在性能上的花费是很大的，因为我们需要为每个 model 写不同的深度对比代码。就算这样，如果我们没有处理好对象引用，它甚至不能工作，比如说这个父组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createClass({
  getInitialState: function() {
    return { value: { foo: 'bar' } };
  },

  onClick: function() {
    var value = this.state.value;
    value.foo += 'bar'; // ANTI-PATTERN!
    this.setState({ value: value });
  },

  render: function() {
    return (
      <div>
        <InnerComponent value={this.state.value} />
        <a onClick={this.onClick}>Click me</a>
      </div>
    );
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createClass({
  <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">value</span>: { <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span> } };
  },

  <span class="hljs-attr">onClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.state.value;
    value.foo += <span class="hljs-string">'bar'</span>; <span class="hljs-comment">// ANTI-PATTERN!</span>
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">value</span>: value });
  },

  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">InnerComponent</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.value}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
});</span></code></pre>
<p>内部组件第一次渲染的时候，它会获取 <code>{ foo: 'bar' }</code> 作为 value 的值。如果用户点击了 a 标签，父组件的 state 会更新成 <code>{ value: { foo: 'barbar' } }</code>，触发内部组件的重新渲染过程，内部组件会收到 <code>{ foo: 'barbar' }</code> 作为 value 的新的值。</p>
<p>这里的问题是因为父组件和内部组件共享同一个对象的引用，当对象在 <code>onClick</code> 函数的第二行发生改变的时候，内部组件的属性也发生了改变，所以当重新渲染过程开始，<code>shouldComponentUpdate</code> 被调用的时候，<code>this.props.value.foo</code> 和 <code>nextProps.value.foo</code> 是相等的，因为实际上 <code>this.props.value</code> 和 <code>nextProps.value</code> 是同一个对象的引用。</p>
<p>因此，我们会丢失 prop 的改变，缩短重新渲染过程，UI 也不会从 <code>'bar'</code> 更新到 <code>'barbar'</code></p>
<h2 id="articleHeader3">Immutable-js 来救赎</h2>
<p><a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">Immutable-js</a> 是 Lee Byron 写的 JavaScript 集合类型的库，最近被 Facebook 开源，它通过<em>结构共享</em>提供<em>不可变持久化</em>集合类型。一起看下这些特性的含义:</p>
<ul>
<li><p><em>Immutable</em>: 一旦创建，集合就不能再改变。</p></li>
<li><p><em>Persistent</em>: 新的集合类型可以通过之前的集合创建，比如 set 产生改变的集合。创建新的集合之后源集合仍然有效。</p></li>
<li><p><em>Structural Sharing</em>: 新的集合会使用尽量多的源集合的结构，减少复制来节省空间和性能友好。如果新的集合和源集合相等，一般会返回源结构。</p></li>
</ul>
<p>不可变让跟踪改变非常简单；每次改变都是产生新的对象，所以我们仅需要对象的引用是否改变，比如这段简单的 JavaScript 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = { foo: &quot;bar&quot; };
var y = x;
y.foo = &quot;baz&quot;;
x === y; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> x = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"bar"</span> };
<span class="hljs-keyword">var</span> y = x;
y.foo = <span class="hljs-string">"baz"</span>;
x === y; <span class="hljs-comment">// true</span></code></pre>
<p>尽管 <code>y</code> 被改变，因为它和 <code>x</code> 引用的是同一个对象，这个对比返回 <code>true</code>。然而，这个代码可以使用 immutable-js 改写如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SomeRecord = Immutable.Record({ foo: null });
var x = new SomeRecord({ foo: 'bar'  });
var y = x.set('foo', 'baz');
x === y; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> SomeRecord = Immutable.Record({ <span class="hljs-attr">foo</span>: <span class="hljs-literal">null</span> });
<span class="hljs-keyword">var</span> x = <span class="hljs-keyword">new</span> SomeRecord({ <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>  });
<span class="hljs-keyword">var</span> y = x.set(<span class="hljs-string">'foo'</span>, <span class="hljs-string">'baz'</span>);
x === y; <span class="hljs-comment">// false</span></code></pre>
<p>这个例子中，因为改变 <code>x</code> 的时候返回了新的引用，我们就可以安全的认为 <code>x</code> 已经改变。</p>
<p>脏检测可以作为另外的可行的方式追踪改变，给 setters 一个标示。这个方法的问题是，它强制你使用 setters，而且要写很多额外的代码，影响你的类。或者你可以在改变之前深拷贝对象，然后进行深对比来确定是不是发生了改变。这个方法的问题是，深拷贝和深对比都是很花性能的操作。</p>
<p>因此，不可变数据结构给你提供了一个高效、简洁的方式来跟踪对象的改变，而跟踪改变是实现 <code>shouldComponentUpdate</code> 的关键。所以，如果我们使用 immutable-js 提供的抽象创建 props 和 state 模型，我们就可以使用 <code>PureRenderMixin</code>，而且能够获得很好的性能增强。</p>
<h2 id="articleHeader4">Immutable-js 和 Flux</h2>
<p>如果你在使用 <a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">Flux</a>，你应该开始使用 immutable-js 写你的 stores，看一下 <a href="https://facebook.github.io/immutable-js/docs/#/" rel="nofollow noreferrer" target="_blank">full API</a>。</p>
<p>让我们看一个可行的方式，使用不可变数据结构来给消息示例创建数据结构。首先我们要给每个要建模的实体定义一个 <code>Record</code>。Records 仅仅是一个不可变容器，里面保存一系列具体数据:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var User = Immutable.Record({
  id: undefined,
  name: undefined,
  email: undefined
});

var Message = Immutable.Record({
  timestamp: new Date(),
  sender: undefined,
  text: ''
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> User = Immutable.Record({
  <span class="hljs-attr">id</span>: <span class="hljs-literal">undefined</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-literal">undefined</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-literal">undefined</span>
});

<span class="hljs-keyword">var</span> Message = Immutable.Record({
  <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
  <span class="hljs-attr">sender</span>: <span class="hljs-literal">undefined</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>
});</code></pre>
<p><code>Record</code> 方法接收一个对象，来定义字段和对应的默认数据。</p>
<p>消息的 <em>store</em> 可以使用两个 list 来跟踪 users 和 messages:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.users = Immutable.List();
this.messages = Immutable.List();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.users = Immutable.List();
<span class="hljs-keyword">this</span>.messages = Immutable.List();</code></pre>
<p>实现函数处理每个 <em>payload</em> 类型应该是比较简单的，比如，当 store 看到一个代表新消息的 payload 时，我们就创建一个新的 record，并放入消息列表:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.messages = this.messages.push(new Message({
  timestamp: payload.timestamp,
  sender: payload.sender,
  text: payload.text
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.messages = <span class="hljs-keyword">this</span>.messages.push(<span class="hljs-keyword">new</span> Message({
  <span class="hljs-attr">timestamp</span>: payload.timestamp,
  <span class="hljs-attr">sender</span>: payload.sender,
  <span class="hljs-attr">text</span>: payload.text
});</code></pre>
<p>注意：因为数据结构不可变，我们需要把 push 方法的结果赋给 <code>this.messages</code>。</p>
<p>在 React 里，如果我们也使用 immutable-js 数据结构来保存组件的 state，我门可以把 <code>PureRenderMixin</code> 混入到我门所有的组件来缩短重新渲染回路。</p>
<p><em>这篇文章是翻译React官方文档</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React性能优化

## 原文链接
[https://segmentfault.com/a/1190000006254212](https://segmentfault.com/a/1190000006254212)


---
title: 'React.js Components: 基础指南 '
reprint: true
categories: reprint
abbrlink: 67b05647
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>创建和管理React组件的各种方式，涌现的大量状态管理工具等等都是这些挑战的焦点。我们今天能做的就是在React（基于社区选择）中将最常用的做法引入桌面并讨论它们。</p>
<p>其中，我们将学习React中的一些有用的主题和术语。这些主题包括：</p>
<h3>目录</h3>
<ul>
<li>常规的Component</li>
<li>Props 验证</li>
<li>Component之间的交互</li>
<li>初始化Component</li>
<li>ES6+ Components (与正常组件有所不同)</li>
<li>无状态组件</li>
</ul>
<blockquote>
<p>这篇文章是很基础的，所以你可能会发现自己正在阅读你已经知道的东西。如果您正在寻找更高级的主题，您可以阅读我们的<a href="https://search.scotch.io/?query=react">其它关于React的文章</a>。</p>
</blockquote>
<h2>常规的 React Component</h2>
<p>按照常规，我的意思是常见的，你可能在大多数代码库和文章中看到过：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> Hello = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"World"</span> /&gt;</span>,
  document.getElementById('container')
);
</span></code></pre>
<blockquote>
<p>请记住，常规并不意味着最佳实践。 React官方文档推广它的原因，只是因为它很常见。</p>
</blockquote>
<p>React.createClass函数必须在Object类型的参数中传递。这个对象定义了一个react组件。 render属性是必需的，也是最重要的属性。它负责解析JavaScript，<a href="https://facebook.github.io/react/docs/jsx-in-depth.html">JSX</a>中的HTML。</p>
<p>Web应用程序只有在动态时才有意思。任何UI库都会提供一种方法来传递系统的数据，React的想法是通过props object来传递数据。所以当你看到下面的JSX时：</p>
<pre><code class="hljs applescript">&lt;h1&gt;My <span class="hljs-built_in">name</span> <span class="hljs-keyword">is</span> {<span class="hljs-built_in">name</span>}&lt;/h1&gt;
</code></pre>
<p>我们告诉React，当组件被调用时，带有值的name属性应该像上面例子中的render一样传递：</p>
<pre><code class="hljs applescript">&lt;Hello <span class="hljs-built_in">name</span>=<span class="hljs-string">"World"</span> /&gt;
</code></pre>
<p>渲染方法需要一个组件输出和DOM输出。这是一个React组件的基本解剖。</p>
<p>相关课程：<a href="https://bit.ly/2qktDOA">React入门</a></p>
<h2>States &amp; Props</h2>
<p>动态应用程序必须将数据传递给系统。在React中，数据移动主要发生在提供原始数据的组件和外部服务之间（例如HTTP，localStorage）。</p>
<p>Props是不可改变的，这意味着它们只能从父组件传递下来，不能改变。这提出了一个挑战，因为现代web程序不可能在页面加载的时候就准备好所有的数据。 Ajax或其它事件也有会可能发生都有可能引发数据的变更，当数据返回时，数据就需要更新。这就是引入React状态地方。</p>
<p>在初始化React时，我们定义一个初始状态并保持state与props同步。一旦state更新，props可以很容易地保持同步：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> Counter = React.createClass({
    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
    };
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            {this.state.counter}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">Counter</span>'} /&gt;</span>,
  document.getElementById('container')
);
</span></code></pre>
<h2>父组件</h2>
<p>这非常直截了当。如果组件在其render中渲染另一个组件，则渲染器是渲染的所有者（父级）。渲染器拥有渲染的组件并控制它。</p>
<p>我们来看看另一个例子：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> CounterDisplay = React.createClass({
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.counterProp}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
})

<span class="hljs-keyword">var</span> Counter = React.createClass({
    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
    };
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Child component rendered</span>
    <span class="hljs-comment">// React will throw an error if the the DOM doesn't have a single parent</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CounterDisplay</span> <span class="hljs-attr">counterProp</span>=<span class="hljs-string">{this.state.counter}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">CounterDisplay</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">Counter</span>'} /&gt;</span>,
  document.getElementById('container')
);
</span></code></pre>
<p>Counter现在呈现另一个组件CounterDisplay。 Counter负责管理和同步CounterDisplay的props。您可以看到我们如何通过props将state传递给子组件。这些props也可以像state一样命名为计数器，但这可能会让初学者感到困惑，所以我给了它一个不同的名字。</p>
<h2>组件交互</h2>
<p>如果我们在子组件中有一个按钮（或更多）来增加或减少在父组件中管理的整数（状态），该怎么办？我们做什么？</p>
<p>React组件交互有两种形式：<em>从父到子组件的数据流</em>以及从<em>子到父的数据流</em>。我们已经看到了如何通过使用<em>props</em>实现父组件对子组件的数据流动。</p>
<p>为了在React实现<strong>子组件对父组件</strong>之间的数据传递，我们使用通过父组件传递给子组件的处理程序作为props，
父组件知道这样的活动可能发生在子组件身上，因此它为发生变化时设置了一个处理程序。更像事件：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// 子组件</span>
<span class="hljs-keyword">var</span> CounterDisplay = React.createClass({
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// Calls the handler props once events are fired</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.counterProp}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.props.incrementCounter}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.props.decrementCounter}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
})
</code></pre>
<pre><code class="hljs javascript"><span class="hljs-comment">// 父组件</span>
<span class="hljs-keyword">var</span> Counter = React.createClass({
    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
    };
  },
  handleIncrement(){
    <span class="hljs-comment">// Update counter state</span>
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">counter</span> : <span class="hljs-keyword">this</span>.state.counter+<span class="hljs-number">1</span>});
  },
  handleDecrement(){
      <span class="hljs-comment">// Update counter state</span>
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">counter</span> : <span class="hljs-keyword">this</span>.state.counter<span class="hljs-number">-1</span>});
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Pass down handlers to CounterDisplay component</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CounterDisplay</span> 
            <span class="hljs-attr">counterProp</span>=<span class="hljs-string">{this.state.counter}</span>
          <span class="hljs-attr">incrementCounter</span>=<span class="hljs-string">{this.handleIncrement}</span>
          <span class="hljs-attr">decrementCounter</span>=<span class="hljs-string">{this.handleDecrement}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">CounterDisplay</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">Counter</span>'} /&gt;</span>,
  document.getElementById('container')
);
</span></code></pre><p>CounterDisplay 组件点击的时候，他们的处理function不在该组件的任何位置，相反，处理程序由父组件Counter处理。该处理程序反过来使用this.setState（）方法更新状态，并且计数器显示（子组件）props得到更新</p>
<h2>初始化Component</h2>
<p>不仅state有能力使用getInitialState方法重新设置初始值。如果需要，您还可以为将在组件负载上使用的props设置默认值。为了达到这个目的，你可以使用getDefaultProps方法：</p>
<pre><code class="hljs actionscript">getDefaultProps: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
     <span class="hljs-keyword">return</span> {
       name: <span class="hljs-string">'Counter'</span>
     };
},
</code></pre>
<p>这对于在应用程序中设置默认值非常有用。</p>
<h2>Prop 验证</h2>
<p>关于React组件的一个好消息是，我看到开发人员喜欢并且强调它的可用性。您可以将任何组件放在应用程序中，只要您遵守它的规则，就可以执行它旨在执行的操作。当制作我自己的可重用组件时，我该如何制定自己的规则？<em>Props验证</em>是你的问题的答案。</p>
<p>按名称进行验证有助于您确信流入组件的数据按照您期望的组织结构进行组织。用户不能将你设置为数组的数据，用字符串传进来。这就是用法</p>
<pre><code class="hljs stylus"><span class="hljs-selector-tag">var</span> CounterDisplay = React.createClass({
    render: function(){
    <span class="hljs-comment">// Calls the handler props once events are fired</span>
    return &lt;div&gt;
            &lt;div&gt;{this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.counterProp</span>}&lt;/div&gt;
        &lt;br /&gt;
        &lt;<span class="hljs-selector-tag">button</span> onClick={this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.incrementCounter</span>}&gt;+&lt;/button&gt;
        &lt;<span class="hljs-selector-tag">button</span> onClick={this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.decrementCounter</span>}&gt;-&lt;/button&gt;
        &lt;/div&gt;
  },
  <span class="hljs-comment">// Setup validation for each props</span>
  propTypes: {
    <span class="hljs-comment">// Must be a number</span>
    counterProp: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.number</span><span class="hljs-selector-class">.isRequired</span>,
    <span class="hljs-comment">// Must be functions</span>
    incrementCounter: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.func</span><span class="hljs-selector-class">.isRequired</span>,
    decrementCounter: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.func</span><span class="hljs-selector-class">.isRequired</span>
   }
})
</code></pre>
<p>如果您所需要的只是验证类型，而不是它是否存在，您可以忽略isRequired：</p>
<pre><code class="hljs stylus">propTypes: {
    <span class="hljs-comment">// Should be a number</span>
    counterProp: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.number</span>,
    <span class="hljs-comment">// Should be functions</span>
    incrementCounter: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.func</span>,
    decrementCounter: React<span class="hljs-selector-class">.PropTypes</span><span class="hljs-selector-class">.func</span>
   }
</code></pre>
<h2>Class Component (ES6)</h2>
<p>React.createClass并不是创建有效React 组件的唯一可能方法。使用ES6（这真的很酷），我们可以使用clsaa来创建react组件。</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Extends React.Compoent</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
 <span class="hljs-comment">// Render method now a class member rather than</span>
 <span class="hljs-comment">// object property</span>
  render(){
    <span class="hljs-keyword">return</span> &lt;h1&gt;{<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}

 <span class="hljs-type">React</span>.render(&lt;<span class="hljs-type">Comment</span> name={<span class="hljs-symbol">'Commen</span>t'}/&gt;, document.getElementById(<span class="hljs-symbol">'containe</span>r'));
</code></pre>
<p>组件的名称是类名，class继承React.Component的功能。</p>
<h3>在class里面设置state</h3>
<p>如果你使用ES6的方法来构造组件，那么设置state的方法也会有一些改变；</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
   constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            counter: <span class="hljs-number">0</span>
        };
  }
  render(){
    <span class="hljs-keyword">return</span> &lt;h1&gt;{<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}

 <span class="hljs-type">React</span>.render(&lt;<span class="hljs-type">Comment</span> name={<span class="hljs-symbol">'Commen</span>t'}/&gt;, document.getElementById(<span class="hljs-symbol">'containe</span>r'));
</code></pre>
<p>初始状态现在在class构造函数中设置，而不是使用getInitialState。</p>
<h3>在class中初始和验证props</h3>
<pre><code class="hljs roboconf">// Validation
Comment.propTypes = {
        <span class="hljs-attribute">counterProp</span>: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.number</span><span class="hljs-variable">.isRequired</span>,
    incrementCounter: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.func</span><span class="hljs-variable">.isRequired</span>,
    decrementCounter: React<span class="hljs-variable">.PropTypes</span><span class="hljs-variable">.func</span><span class="hljs-variable">.isRequired</span>
};
// <span class="hljs-attribute">Defaults
Comment.defaultProps = {
    name</span>: 'Counter'
};
</code></pre>
<p>还有一些细微的差异，但以上是你应该注意的。你可以<a href="https://toddmotto.com/react-create-class-versus-component/">阅读关于差异的文章</a> 。</p>
<h2>无状态组件</h2>
<p>当组件没有处理任何状态时，那么您可以使用这些功能：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CommentDisplay</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{props.counterProp}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.incrementCounter}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.decrementCounter}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}
</code></pre>
<p>就是这么简单！</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/reactjs-components-learning-the-basics](https://www.zcfy.cc/article/reactjs-components-learning-the-basics)
原文标题: React.js Components: 基础指南
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
